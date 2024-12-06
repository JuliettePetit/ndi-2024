export type TypeOfChoice = 'YesNoChoice' | 'AcceptChoice';

export type YesNoChoice = 'yes' | 'no';
export type AcceptChoice = 'ok';
export type ResponseToChoiceEvent = YesNoChoice | AcceptChoice;
export type Statistics = "";

export interface UpdateResponse {
  event?: GeoEvent,
  stats: Statistics
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
