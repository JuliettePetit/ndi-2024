export type TypeOfChoice = 'YesNoChoice' | 'AcceptChoice';

export type YesNoChoice = 'yes' | 'no';
export type AcceptChoice = 'ok';
export type ResponseToChoiceEvent = YesNoChoice | AcceptChoice;

export interface Consequence {
    description: string;
    apply: Function;
}


export interface Event {
    id: number,
    name: string,
    description: string,
    option: TypeOfChoice // what you may send
}

export interface response {
    event ?: Event}


export interface SliderData {
    data:number,
    left_color:string,
    right_color:string,
    name:string
}