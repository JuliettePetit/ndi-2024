import { Switch } from '@/components/ui/switch';
import StatComponent from './components/StatComponent';

export default function Home() {
  return (
    <div>
      <Switch></Switch>
      <StatComponent left_color='bg-[#32CD32]' right_color='bg-[#F699CD]' percent={10}/>
    </div>
  );
}
