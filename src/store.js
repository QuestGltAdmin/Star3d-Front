import * as THREE from "three";
import { GrannyKnot } from "three/examples/jsm/curves/CurveExtras";
import { addEffect } from "@react-three/fiber";
import { create } from "zustand";
import * as audio from "./assets/audio";
import gsap from "gsap";
import { io } from "socket.io-client";

let guid = 1;

const useStore = create((set, get) => {
  let spline = new GrannyKnot();
  let track = new THREE.TubeGeometry(spline, 250, 0.2, 10, true);
  let cancelLaserTO = undefined;
  let cancelExplosionTO = undefined;
  const box = new THREE.Box3();

  // const socket = io("http://localhost:3001/",{transports:["websocket","polling"]});
  const playersocket = io("http://localhost:3001/player", {
    transports: ["websocket", "polling"],
  });
  // const chatsocket = io("http://localhost:3001/chat",{transports:["websocket","polling"]});

  const socket = io("https://blockspace.donative.in:3001/",{transports:["websocket","polling"]});
  // const playersocket = io("https://blockspace.donative.in:3001/player",{transports:["websocket","polling"]});
  const chatsocket = io("https://blockspace.donative.in:3001/chat",{transports:["websocket","polling"]});

  // this is enough to connect all our server events
  // to our state managment system!
  playersocket
    .on("connect", () => {
      set({ ready: true });
      console.log({ message: "Connected to Player Socket Backend." });
    })
    .on("disconnect", () => {
      set({ ready: false});
      // set({players:[]})
      console.log({ message: "Disconnected from Player Socket Backend." });
    })
    .on("p:update",(res)=>{
      const idx = res.data.findIndex((item)=>item.socket_id===playersocket.id)
      res.data.splice(idx,1);
      set({players:res.data})
    })
    .on("p:remove", (res)=>{
      const { players } = get();
      const idx = players.findIndex((item)=>item.socket_id===res.data.socket_id)
      players.splice(idx,1);
      set({players})
    })
  // .on("state", (gameState) => {
  //   setState({ game: gameState });
  // });

  return {
    sound: false,
    sliderVal: 0,
    camera: undefined,
    points: 0,
    health: 100,
    lasers: [],
    explosions: [],
    rocks: randomData(100, track, 150, 8, () => 1 + Math.random() * 2.5),
    enemies: randomData(10, track, 20, 15, 1),
    clicked: { event: null, label: "", status: false },
    hovered: { event: null, label: "", status: false },
    players: [],
    name:"",

    //States for socket.io data
    ready: false,
    socket_id:null,

    mutation: {
      t: 0,
      position: new THREE.Vector3(),
      startTime: Date.now(),
      tl: gsap.timeline({ repeat: 100 }),
      track,
      scale: 15,
      fov: 70,
      hits: false,
      rings: randomRings(30, track),
      particles: randomData(
        1500,
        track,
        100,
        1,
        () => 0.5 + Math.random() * 0.8
      ),
      looptime: 40 * 1000,
      binormal: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      clock: new THREE.Clock(false),
      mouse: new THREE.Vector2(-250, 50),

      // Re-usable objects
      dummy: new THREE.Object3D(),
      ray: new THREE.Ray(),
      box: new THREE.Box3(),
    },

    actions: {
      init(camera) {
        console.log("init", camera);
        const { mutation, actions, players } = get();

        set({ camera });
        mutation.clock.start();
        actions.toggleSound(get().sound);

        playersocket.emit(
          "p:init",
          { position: camera.position, rotation: camera.rotation },
          (cb) => {
            console.log(cb);
            console.log({ players });

            set({ players: cb.data });
          }
        );
        console.log({ players: get().players });

        addEffect(() => {
          const { rocks, enemies } = get();

          const time = Date.now();
          const t = (mutation.t =
            ((time - mutation.startTime) % mutation.looptime) /
            mutation.looptime);
          mutation.position = track.parameters.path.getPointAt(t);
          mutation.position.multiplyScalar(mutation.scale);

          // test for wormhole/warp
          let warping = false;
          if (t > 0.3 && t < 0.4) {
            if (!warping) {
              warping = true;
              playAudio(audio.warp);
            }
          } else if (t > 0.5) warping = false;

          // test for hits
          const r = rocks.filter(actions.test);
          const e = enemies.filter(actions.test);
          const a = r.concat(e);
          const previous = mutation.hits;
          mutation.hits = a.length;
          if (previous === 0 && mutation.hits) playAudio(audio.click);
          const lasers = get().lasers;
          if (
            mutation.hits &&
            lasers.length &&
            time - lasers[lasers.length - 1] < 100
          ) {
            const updates = a.map((data) => ({ time: Date.now(), ...data }));
            set((state) => ({ explosions: [...state.explosions, ...updates] }));
            clearTimeout(cancelExplosionTO);
            cancelExplosionTO = setTimeout(
              () =>
                set((state) => ({
                  explosions: state.explosions.filter(
                    ({ time }) => Date.now() - time <= 1000
                  ),
                })),
              1000
            );
            set((state) => ({
              points: state.points + r.length * 100 + e.length * 200,
              rocks: state.rocks.filter(
                (rock) => !r.find((r) => r.guid === rock.guid)
              ),
              enemies: state.enemies.filter(
                (enemy) => !e.find((e) => e.guid === enemy.guid)
              ),
            }));
          }
          //if (a.some(data => data.distance < 15)) set(state => ({ health: state.health - 1 }))
        });
      },

      updatePlayer({position, rotation}) {
        const { camera,name } = get();

        // console.log({data},camera)
        const payload = {
          name,
          position: { 
            x: position.x, 
            y:position.y, 
            z:position.z, 
          },
          rotation:{
            _x:rotation._x,
            _y:rotation._y,
            _z:rotation._z,

          }
        };
        playersocket.emit(
          "p:update",
          payload,
          (cb) => {
            console.log(cb);
          }
        );
      },
      setUsername(name){
        set({name})
        // playersocket.emit("p:set:user:name",{name},(cb)=>{
        //   console.log(cb)
        // })
      },

      click(event, clicked, status = null) {
        // console.log(event,clicked, get().clicked.status);
        set({
          clicked: {
            event,
            label: clicked,
            status: status ?? !get().clicked.status,
          },
        });
      },
      hover(event, hovered, status = null) {
        set({
          hovered: {
            event,
            label: hovered,
            status: status ?? !get().hovered.status,
          },
        });
      },
      shoot() {
        console.log("shoot");
        set((state) => ({ lasers: [...state.lasers, Date.now()] }));
        clearTimeout(cancelLaserTO);
        cancelLaserTO = setTimeout(
          () =>
            set((state) => ({
              lasers: state.lasers.filter((t) => Date.now() - t <= 1000),
            })),
          1000
        );
        playAudio(audio.zap, 0.5);
      },
      toggleSound(sound = !get().sound) {
        set({ sound });
        playAudio(audio.engine, 1, true);
        playAudio(audio.engine2, 0.3, true);
        playAudio(audio.bg, 1, true);
      },
      updateSliderValue(sliderVal) {
        set({ sliderVal });
      },
      updateMouse({ clientX: x, clientY: y }) {
        get().mutation.mouse.set(
          x - window.innerWidth / 2,
          y - window.innerHeight / 2
        );
      },

      moveCamera(values, time) {
        console.log("movecamera", get().mutation.tl, get().camera.position);
        get().mutation.tl.to(
          get().camera.position,
          { duration: 3, ...values },
          time
        );
      },
      rotateCamera(values, time) {
        get().mutation.tl.to(
          get().camera.rotation,
          { duration: 3, ...values },
          time
        );
      },
      test(data) {
        box.min.copy(data.offset);
        box.max.copy(data.offset);
        box.expandByScalar(data.size * data.scale);
        data.hit.set(10000, 10000, 10000);
        const result = get().mutation.ray.intersectBox(box, data.hit);
        data.distance = get().mutation.ray.origin.distanceTo(data.hit);
        return result;
      },
    },
  };
});

function randomData(count, track, radius, size, scale) {
  return new Array(count).fill().map(() => {
    const t = Math.random();
    const pos = track.parameters.path.getPointAt(t);
    pos.multiplyScalar(15);
    const offset = pos
      .clone()
      .add(
        new THREE.Vector3(
          -radius + Math.random() * radius * 2,
          -radius + Math.random() * radius * 2,
          -radius + Math.random() * radius * 2
        )
      );
    const speed = 0.1 + Math.random();
    return {
      guid: guid++,
      scale: typeof scale === "function" ? scale() : scale,
      size,
      offset,
      pos,
      speed,
      radius,
      t,
      hit: new THREE.Vector3(),
      distance: 1000,
    };
  });
}

function randomRings(count, track) {
  let temp = [];
  let t = 0.4;
  for (let i = 0; i < count; i++) {
    t += 0.003;
    const pos = track.parameters.path.getPointAt(t);
    pos.multiplyScalar(15);
    const segments = track.tangents.length;
    const pickt = t * segments;
    const pick = Math.floor(pickt);
    const lookAt = track.parameters.path
      .getPointAt((t + 1 / track.parameters.path.getLength()) % 1)
      .multiplyScalar(15);
    const matrix = new THREE.Matrix4().lookAt(
      pos,
      lookAt,
      track.binormals[pick]
    );
    temp.push([pos.toArray(), matrix]);
  }
  return temp;
}

function playAudio(audio, volume = 1, loop = false) {
  if (useStore.getState().sound) {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.loop = loop;
    audio.play();
  } else audio.pause();
}

export default useStore;
export { audio, playAudio };
