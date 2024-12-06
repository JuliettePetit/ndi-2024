import { ResponseToChoiceEvent, Stats, UpdateResponse } from "@/lib/types";
import { allEvents, human_stats, ocean_stats } from "./datas";

const add_stats = (stat: Stats, other: Stats) => {
  for (const key in other) {
    stat[key] += other[key];
  }
}

const enough_stat = (stat: Stats, other: Stats, key: string) => {
  return stat[key] >= other[key];
}

function canMakeChoice(r: ResponseToChoiceEvent) {
  return true;
}


const resetTimeSecs = 3;
let curEventIndex = 0;
let numCalls = 0;
let isGameOver = false;
let answeredLastUpdate = true;

function applyTransition(choice: ResponseToChoiceEvent) {
  // tree thingy for events
}

export function update(r: ResponseToChoiceEvent | null): UpdateResponse {
  const res: UpdateResponse = { ocean_stats: ocean_stats, human_stats: human_stats, gameOver: isGameOver };

  // check to apply transition
  if (r !== null && curEventIndex > 0 && canMakeChoice(r)) {
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
  console.log("in update");
  console.log(answeredLastUpdate);
  console.log(numCalls);
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
