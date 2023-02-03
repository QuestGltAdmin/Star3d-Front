import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "../../utilities/classname"

export const Switch = React.forwardRef(({ className, ...props }, ref) => {
  const [checked, check] = React.useState(false);

  const handleChange= React.useCallback(
    (e) => {
      props.onCheckedChange(e)
    },
    [checked],
  )
  
  return(
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex items-center h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-transparent data-[state=checked]:bg-orange-200 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=unchecked]:bg-slate-700 dark:data-[state=checked]:bg-slate-400",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-10 w-10 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-10"
      )}
    />
  </SwitchPrimitives.Root>
)})
Switch.displayName = SwitchPrimitives.Root.displayName


