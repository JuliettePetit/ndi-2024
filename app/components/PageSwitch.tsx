"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import EarthIcon from "@/components/ui/earthIcon";
import UserIcon from '@/components/ui/userIcon';

import { cn } from "@/lib/utils"

const PageSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "group peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-200 data-[state=unchecked]:bg-red-200",
      className
    )}
    {...props}
    ref={ref}
  >
    <EarthIcon className="group-data-[state=unchecked]:hidden stroke-background fixed ml-0.5"></EarthIcon>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0"
      )}
    />
    <UserIcon className="group-data-[state=checked]:hidden ml-0.5"></UserIcon>
  </SwitchPrimitives.Root>
))
PageSwitch.displayName = SwitchPrimitives.Root.displayName

export { PageSwitch }
