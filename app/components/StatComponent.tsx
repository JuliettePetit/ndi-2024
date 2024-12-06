import { ColoredSlider } from "./ColoredSlider";

interface Prop {
  left_color: string;
  right_color: string;
  percent: number;
}

export default function StatComponent({left_color, right_color, percent}: Prop) {
  return <ColoredSlider disabled hide_thumb="true" left_color={left_color} right_color={right_color} defaultValue={[percent]} max={100} step={1}/>
}
