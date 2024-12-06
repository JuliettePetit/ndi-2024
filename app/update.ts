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

const resetTimeSecs = 1;
let curEventIndex = 0;
let numCalls = 0;
let isGameOver = false;
let answeredLastUpdate = true;

function start() {}

function applyTransition(choice: ResponseToChoiceEvent) {
  // tree thingy for events
}

type Statistics = "";

interface UpdateResponse {
  event?: Event,
  stats: Statistics
  gameOver: boolean
}

function computeStats(): Statistics {
  return "";
}

function update(r: ResponseToChoiceEvent | null): UpdateResponse {
  const stats = computeStats();
  const res: UpdateResponse = { stats: stats, gameOver: isGameOver };

  // check to apply transition
  if (r !== null && curEventIndex > 1) {
    answeredLastUpdate = true;
    const prevOpt = allEvents[curEventIndex - 1].option;
    if (prevOpt == "YesNoChoice" && (r == 'yes' || r == 'no'))
      applyTransition(r);
    else if (prevOpt == "AcceptChoice" && r == "ok")
      applyTransition(r);
    else {
      isGameOver = true;
      return res; // bro this is wrong state
    }
  }

  // should we send the next event ?
  if (numCalls >= resetTimeSecs && answeredLastUpdate) {
    answeredLastUpdate = false;
    numCalls = 0;
    res.event = allEvents[curEventIndex++];
    return res;
  } else {
    numCalls++;
  }

  isGameOver = curEventIndex >= allEvents.length;
  res.gameOver = isGameOver;
  return res;
}

export type {
  ResponseToChoiceEvent, YesNoChoice, AcceptChoice,
  TypeOfChoice
}

export {
  start,
  update
};