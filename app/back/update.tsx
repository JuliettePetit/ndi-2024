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
        title: "Acidité de l'océan",
        description: ocean_stats['ph'] < 7.6 ? "Acidité critique de l'océan !" : "L'acidité de l'océan est normale."
      }
    },
    CO2:
    {
      color: ocean_stats['% CO2 absorbable par les mers'] < 40 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "CO2 absorbable par les mers",
        description: ocean_stats['% CO2 absorbable par les mers'] < 40 ? "L'océan n'absorbe pas assez de CO2, l'oxygène va se faire manquer ! Résolvez rapidement ce problème !" : "L'absorption en carbone de l'océan est normale."
      }
    },
    coralBarrer:
    {
      color: ocean_stats['% substances toxiques'] > 16 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "Substances toxiques dans l'océan",
        description: ocean_stats['% substances toxiques'] > 16 ? "L'océan est gravement pollué ! Vous devez y remédier !" : "L'océan est propre, rien à signaler."
      }
    },
    stream:
    {
      color: ocean_stats['delta température flux marins'] > 2.5 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "delta",
        description: ocean_stats['delta température flux marins'] > 2.5 ? "La température des flux marins est bien trop instable !" : "L'eau est bien calme, dis capitaine Haddock !"
      }
    },
  };

  const human_map: BodyPropBack = {
    vein:
    {
      color: (human_stats['ph sanguin'] < 7.2 || human_stats['ph_sanguin'] > 7.6) ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "PH Sanguin",
        description: human_stats['ph sanguin'] < 7.2 ? "Le sang s'acidifie ! L'humain est en danger !" : human_stats['ph_sanguin'] > 7.6 ? "Le sang est trop basique ! L'humain est en danger !" : "Le sang de l'humain fonctionne normalement."
      }
    },
    lungs:
    {
      color: human_stats['oxymétrie'] < 94 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "Apport en oxygène de l'humain",
        description: human_stats['oxymétrie'] < 94 ? "Les poumons de l'humain sont blessés, celui-ci reçoit trop peu d'oxygène !" : "Les poumons de l'humain fonctionnent normalement."
      }
    },
    bone:
    {
      color: human_stats['nb globules blancs par microlitre (de sang)'] < 5000 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "Nombre de globules blancs (/microlitre de sang)",
        description: human_stats['nb globules blancs par microlitre (de sang)'] < 5000 ? "Le système immunitaire de l'humain est inefficient ! Il est en danger de maladies dangereuses !" : "Le système immunitaire de l'humain est prêt à combattre les maladies !"
      }
    },
    heart:
    {
      color: human_stats['bpm'] < 70 ? danger_color : "#FFFFFF" ,
      dialogInfo: {
        title: "Battements de coeur par minute",
        description: human_stats['bpm'] < 70 ? "Le coeur de l'humain bat trop lentement !" : "Le coeur de l'humain fonctionne correctement."
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
