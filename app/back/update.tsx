import { ResponseToChoiceEvent, Statistics, Stats, GeoEvent, UpdateResponse } from "@/lib/types";

//todo: base stats
const human_stats: Stats = {
  "ph sanguin": 7.4,
  "% CO2 filtré par les poumons": 98,
  "nb globules blancs par microlitre (de sang)": 100,
  "bpm": 90,
};

const ocean_stats: Stats = {
  "ph" : 8.1,
  "% CO2 absorbable par les mers": 60,
  "% substances toxiques": 8,
  "delta température flux marins" : 0.0,
};



// const add_stats = (stat: Stats, other: Stats) => {
//   for (const key in other) {
//     stat[key] += other[key];
//   }
// }

// const enough_stat = (stat: Stats, other: Stats, key: string) => {
//   return stat[key] >= other[key];
// }

const resetTimeSecs = 3;
let curEventIndex = 0;
let numCalls = 0;
let isGameOver = false;
let answeredLastUpdate = true;




export function start() {}

function applyTransition(choice: ResponseToChoiceEvent) {
  // tree thingy for events
}

function computeStats(): Statistics {
  return "";
}

export function update(r: ResponseToChoiceEvent | null): UpdateResponse {
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
