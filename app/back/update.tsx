import { BodyPropBack, MapPropBack, ResponseToChoiceEvent, SvgPropBack, UpdateResponse } from "@/lib/types";
import { allEvents, human_stats, ocean_stats } from "./datas";

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


function applyTransition() {
  // tree thingy for events
}

export function update(r: ResponseToChoiceEvent | null): UpdateResponse {
  const res: UpdateResponse = { ocean_stats: ocean_stats, human_stats: human_stats, gameOver: isGameOver, svgs: buildMapProp()};

  // check to apply transition
  if (r !== null && curEventIndex > 0) {
    answeredLastUpdate = true;
    const prevOpt = allEvents[curEventIndex - 1].option;
    if (prevOpt == "YesNoChoice" && (r == 'yes' || r == 'no'))
      applyTransition();
    else if (prevOpt == "AcceptChoice" && r == "ok")
      applyTransition();
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
