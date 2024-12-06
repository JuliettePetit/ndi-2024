import { ConsequenceSeuil, ResponseToChoiceEvent, Stats, UpdateResponse, ZoneHuman, ZoneOcean } from "@/lib/types";
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

let alreadyOutput: ConsequenceSeuil[] = [];

const limit_stats : Stats = { // temp
  "ph": 1,
  "% CO2 absorbable par les mers": 10,
  "% substances toxiques": 90,
  "delta température flux marins": 1
}

const resetTimeSecs = 3;
let curEventIndex = 0;
let numCalls = 0;
let isGameOver = false;
let answeredLastUpdate = true;

function applyTransition(choice: ResponseToChoiceEvent) {
  // tree thingy for events
}

function getCriticalState(): ConsequenceSeuil | null {
  let allConsSeq: ConsequenceSeuil[] = [];
  Object.keys(ocean_stats).forEach((key )=> {
    if (!enough_stat(limit_stats, ocean_stats, key)) {
      let cs: ConsequenceSeuil | null = null;
      switch(key) {
        case "ph" : { 
          cs = {
            oceanOrigin: ZoneOcean.ACIDITY,
            humanOrigin: ZoneHuman.VEIN,
            oceanProblem: '',
            humanProblemAnalogy: ''
          };
          break;
        }
        case "% CO2 absorbable par les mers": { 
          cs = {
            oceanOrigin: ZoneOcean.CO2,
            humanOrigin: ZoneHuman.LUNGS,
            oceanProblem: '',
            humanProblemAnalogy: ''
          };
          break;
        }
        case "% substances toxiques": { 
          cs = {
            oceanOrigin: ZoneOcean.CORAL_BARRER,
            humanOrigin: ZoneHuman.BONE,
            oceanProblem: '',
            humanProblemAnalogy: ''
          };
          break;
        }
        case "delta température flux marins" : { 
          cs = {
            oceanOrigin: ZoneOcean.STREAM,
            humanOrigin: ZoneHuman.HEART,
            oceanProblem: '',
            humanProblemAnalogy: ''
          };
          break;
        }
      }
      if (cs != null) allConsSeq.push(cs);
    }
  });

  // filter some stuff using already output stuff
  allConsSeq = allConsSeq.filter(
    (consSeq) => {
      let alreadyInside = false;
      alreadyOutput.forEach((alOutputCS) => {
        if (alOutputCS.humanOrigin === consSeq.humanOrigin
          && alOutputCS.oceanOrigin === consSeq.oceanOrigin
        ) {
          alreadyInside = true;
        }
        return alreadyInside;
      });
    }
  );

  if (allConsSeq.length != 0) {
    alreadyOutput.push(allConsSeq[0]);
    return allConsSeq[0]; // edge case not met but whatever
  }
  else {
    return null;
  }
}

export function update(r: ResponseToChoiceEvent | null): UpdateResponse {
  const res: UpdateResponse = { ocean_stats: ocean_stats, human_stats: human_stats, gameOver: isGameOver };

  // check to apply transition
  if (r !== null && curEventIndex > 1 && canMakeChoice(r)) {
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
  res.consequenceSeuil = getCriticalState();
  return res;
}
