"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

interface Props extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>{
  left_color: string;
  right_color: string;
  hide_thumb : string;
}

const thumb = (hide: boolean) => {
  if (!hide) {
    return <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />;
  }
}


const ColoredSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  Props
>(({ className, ...props }, ref) => (

  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className={`relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20 ${props.left_color}`}>
      <SliderPrimitive.Range className={`absolute h-full bg-primary ${props.right_color}`} />
    </SliderPrimitive.Track>
    {thumb(props.hide_thumb == "true")}
    </SliderPrimitive.Root>
))
ColoredSlider.displayName = SliderPrimitive.Root.displayName

export { ColoredSlider }
