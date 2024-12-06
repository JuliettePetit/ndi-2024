export type TypeOfChoice = 'YesNoChoice' | 'AcceptChoice';

export type YesNoChoice = 'yes' | 'no';
export type AcceptChoice = 'ok';
export type ResponseToChoiceEvent = YesNoChoice | AcceptChoice;
export type Statistics = "";

export interface UpdateResponse {
  event?: Event,
  stats: Statistics
  gameOver: boolean
}

export interface Event {
  id: number,
  name: string,
  description: string,
  consequence: Consequence,
  option: TypeOfChoice // what you may send
}

export interface Consequence {
  description: string;
  can_take: Stats,
  ocean_changes: Stats;
  human_changes: Stats;
}

export interface Stats {
  [id: string]: number;
}
