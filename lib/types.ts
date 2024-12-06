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
  svgs: SvgPropBack
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
  data: number,
  left_color: string,
  right_color: string,
  name: string
}

interface SvgPartBack{
    color?:string; // Hexcode - XXXXXX form, no #
    dialogInfo: DialogInfo;
}

export interface MapPropBack{
    acidity:SvgPartBack;
    CO2:SvgPartBack;
    coralBarrer:SvgPartBack;
    stream:SvgPartBack;
}

export interface BodyPropBack{
    bone:SvgPartBack;
    vein:SvgPartBack;
    lungs:SvgPartBack;
    heart:SvgPartBack;
}

export interface DialogInfo {
    title: string;
    description: string;
}

export interface SvgPropBack {
    body: BodyPropBack;
    map: MapPropBack;
}
