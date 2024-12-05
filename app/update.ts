type TypeOfChoice = 'YesNoChoice' | 'AcceptChoice';

type YesNoChoice = 'yes' | 'no';
type AcceptChoice = 'ok';
type ResponseToChoiceEvent = YesNoChoice | AcceptChoice;

interface DescCons {
  human_desc: string,
  ocean_desc: string,
}

interface Event {
  id: number,
  name: string,
  description: string,
  consesquence: DescCons,
  option: TypeOfChoice // what you may send
}

const allEvents: Event[] = [
  {
    id: 1,
    name: "Bienvenue !!",
    description: "Différents choix vont vous être proposés, vous devrez y ",
    consesquence : { 
      human_desc: "",
      ocean_desc: ""
    },
    option: 'YesNoChoice'
  }
];

const resetTimeSecs = 10;
let lastChoiceTime: number;
let curEventIndex: number;

function start() {
  lastChoiceTime = Date.now();
  curEventIndex = 0;
}

function applyTransition(choice: ResponseToChoiceEvent) {
  // tree thingy for events
}

// if response, check if 'Ok', 'yes' or 'no'
// else, it's just a normal update
function update(r: ResponseToChoiceEvent | null): Event | null {
  if (r !== null) {
    const prevOpt = allEvents[curEventIndex - 1].option;
    if (prevOpt == "YesNoChoice" && (r == 'yes' || r == 'no'))
      applyTransition(r);
    else if (prevOpt == "AcceptChoice" && r == "ok")
      applyTransition(r);
    else
      return null; // bro this is wrong state
  }

  if (Date.now() - lastChoiceTime > resetTimeSecs * 1000) {
    return allEvents[curEventIndex++];
  } else { return null; }
}

export type {
  ResponseToChoiceEvent, YesNoChoice, AcceptChoice,
  TypeOfChoice
}

export {
  start,
  update
};