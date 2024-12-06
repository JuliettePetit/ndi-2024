import { BodyPropBack, MapPropBack, ResponseToChoiceEvent, Stats, SvgPropBack, UpdateResponse, ConsequenceSeuil, ZoneHuman, ZoneOcean } from "@/lib/types";
import { allEvents, human_stats, ocean_stats } from "./datas";
import HumanBody from "@/components/ui/humanBody";

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

const danger_color = "#FFFF00";

function buildMapProp() : SvgPropBack {
  const ocean_map: MapPropBack = {
    acidity:
    {
      color: ocean_stats['ph'] < 7.6 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "phd ou quoi",
        description: "feur"
      }
    },
    CO2:
    {
      color: ocean_stats['% CO2 absorbable par les mers'] < 40 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "co2",
        description: "absorc"
      }
    },
    coralBarrer:
    {
      color: ocean_stats['% substances toxiques'] > 16 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "bitch",
        description: "toxic"
      }
    },
    stream:
    {
      color: ocean_stats['delta température flux marins'] > 2.5 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "delta",
        description: "b^2 - 4ac"
      }
    },
  };

  const human_map: BodyPropBack = {
    vein:
    {
      color: (human_stats['ph sanguin'] < 7.2 || human_stats['ph_sanguin'] > 7.6) ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "Ph sanguin",
        description: "Le sang du ph mon reuf"
      }
    },
    lungs:
    {
      color: human_stats['oxymétrie'] < 94 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "No oxygen ?",
        description: "Just breath"
      }
    },
    bone:
    {
      color: human_stats['nb globules blancs par microlitre (de sang)'] < 5000 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "Ded",
        description: "Idk"
      }
    },
    heart:
    {
      color: human_stats['bpm'] < 70 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "Pov: rave",
        description: "wtf"
      }
    },
  };

  return {body: human_map, map: ocean_map};
}


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
  const res: UpdateResponse = { ocean_stats: ocean_stats, human_stats: human_stats, gameOver: isGameOver, svgs: buildMapProp()};

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
  res.consequenceSeuil = getCriticalState();
  return res;
}
