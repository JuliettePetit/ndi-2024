export type TypeOfChoice = 'YesNoChoice' | 'AcceptChoice';

export type YesNoChoice = 'yes' | 'no';
export type AcceptChoice = 'ok';
export type ResponseToChoiceEvent = YesNoChoice | AcceptChoice;


export type ConsequenceSeuil = {
  oceanOrigin: ZoneOcean,
  humanOrigin: ZoneHuman,
  oceanProblem: string,
  humanProblemAnalogy: string
}

export enum ZoneOcean {
  ACIDITY,
  CO2,
  CORAL_BARRER,
  STREAM
}

export enum ZoneHuman {
  VEIN,
  LUNGS,
  BONE,
  HEART
}

export interface UpdateResponse {
  event?: GeoEvent,
  ocean_stats: Stats
  human_stats: Stats
  gameOver: boolean
  consequenceSeuil?: ConsequenceSeuil
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
