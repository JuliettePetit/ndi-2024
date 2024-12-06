export type TypeOfChoice = 'YesNoChoice' | 'AcceptChoice';

export type YesNoChoice = 'yes' | 'no';
export type AcceptChoice = 'ok';
export type ResponseToChoiceEvent = YesNoChoice | AcceptChoice;

export interface UpdateResponse {
  event?: GeoEvent,
  ocean_stats: Stats
  human_stats: Stats
  gameOver: boolean
}

export interface GeoEvent {
  id: number;
  title: string;
  description: string;
  consequence: Consequence;
  option: TypeOfChoice; // what you may send
}

export interface Consequence {
  description: string;
  can_take: Stats;
  ocean_changes: Stats;
  human_changes: Stats;
}

export interface Stats {
  [id: string]: number;
}


export interface SliderData {
    data:number,
    left_color:string,
    right_color:string,
    name:string
}
