import { ColoredSlider } from "./ColoredSlider";

interface Props {
  left_color: string;
  right_color: string;
  percent: number;
}

export default function StatComponent({left_color, right_color, percent}: Props) {
  return <ColoredSlider disabled hideThumb left_color={left_color} right_color={right_color} defaultValue={[percent]} max={100} step={1}/>
}
