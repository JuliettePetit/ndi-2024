import {
  BodyPropBack,
  MapPropBack,
  ResponseToChoiceEvent,
  Stats,
  SvgPropBack,
  UpdateResponse,
  ConsequenceSeuil,
  ZoneHuman,
  ZoneOcean,
  GeoEvent
} from "@/lib/types";
import { allEvents, human_stats, ocean_stats } from "./datas";

const add_stats = (stat: Stats, other: Stats) => {
  for (const key in other) {
    stat[key] += other[key];
  }
}

const enough_stat = (stat: Stats, other: Stats, key: string) => {
  return stat[key] >= other[key];
}

// function canMakeChoice(r: ResponseToChoiceEvent) {
//   return true;
// }

const alreadyOutput: ConsequenceSeuil[] = [];

let balance = 50_000_000_000

const limit_stats : Stats = { // temp
  "ph": 1,
  "% CO2 absorbable par les mers": 10,
  "% substances toxiques": 90,
  "delta température flux marins": 1
}

const resetTimeSecs = 15;
let curEventIndex = 0;
let numCalls = resetTimeSecs;
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


function applyTransition(r: ResponseToChoiceEvent, pE: GeoEvent) {
  // tree thingy for events
  if (r == "yes") {
    add_stats(human_stats, pE.consequence.human_changes);
    add_stats(ocean_stats, pE.consequence.ocean_changes);
  }
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
            oceanProblem: 'Des études montrent progressivement que l\'acidification des océans a un très mauvais impact sur les écosystèmes marins, avec certains animaux marins à squelette qui présentent des anomalies.',
            humanProblemAnalogy: 'Le corps aussi possède un équilibre acido-basique qui doit rester équilibré. Problème d\'acidose, peut créer de grandes fatigues, voire même des problèmes cardiaques.'
          };
          break;
        }
        case "% CO2 absorbable par les mers": {
          cs = {
            oceanOrigin: ZoneOcean.CO2,
            humanOrigin: ZoneHuman.LUNGS,
            oceanProblem: 'Les phytoplanctons par la photosynthèse permettent la transformation du CO2 en matière organique et en dioxygène, qui sont tout deux nécessaires à la vie marine. Ce sont les poumons de l\'océan. Sans eux la vie n\'est possible ni sous l\'eau ni sur Terre. La saturtion en CO2 de l\'ocean l\'empêche d\'absorber plus de CO2 qui est rejeté dans l\'atmosphère mais empêche aussi l\'absorbtion d\'autres gazes nécessaires à la vie sous marine.',
            humanProblemAnalogy: 'Dans le corps humain, si les poumons ne sont plus suffisant pour réguler le CO2 et le dioxygène présent dans le corps, la fatigue est amplifié et l\'attention baisse jusqu\'à l\'évanouissement et le malaise causé par le manque de dioxygènes dans les organes vitaux.'
          };
          break;
        }
        case "% substances toxiques": {
          cs = {
            oceanOrigin: ZoneOcean.CORAL_BARRER,
            humanOrigin: ZoneHuman.BONE,
            oceanProblem: '+ de catastrophe (impact des mouvements maritimes moins retenus) + destruction écosystème (refuge pour de nombreux poissons) + grosse source d\'O2 réduite, ...',
            humanProblemAnalogy: 'Protection Immunitaire - Maladies'
          };
          break;
        }
        case "delta température flux marins" : {
          cs = {
            oceanOrigin: ZoneOcean.STREAM,
            humanOrigin: ZoneHuman.HEART,
            oceanProblem: 'circulation océanique impacte la régulation du climat. A cause du réchauffement climatique, les calottes glaciaires augmentent la quantité d\'eau douce dans l\'océan. Cela ralentit la circulation globale des flux maritimes en empêchant la formation d\'eau profonde.\n' +
              '\n' +
              'De plus,\n' +
              '\n' +
              'Les conséquences son très mauvaises, car cela diminuerait le carbone et la chaleur absorbés par les océans, et donc accélérer le réchauffement climatique. De plus, Une boucle sans fin.',
            humanProblemAnalogy: 'On peut comparer les flux maritimes avec les flux sanguins du corps. Si le débit de circulation sanguine du corps est réduit, cela peut entraîner des problèmes cardiaques et des complications.'
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
  console.log(human_stats);
  const res: UpdateResponse = {
    consequenceSeuil: null,
    event: undefined,
    ocean_stats: ocean_stats, human_stats: human_stats, gameOver: isGameOver, svgs: buildMapProp(),
    balance: balance
  };

  // check to apply transition
  if (r !== null && curEventIndex > 0) {
    answeredLastUpdate = true;
    const prevEvent = allEvents[curEventIndex - 1];
    const prevOpt = allEvents[curEventIndex - 1].option;
    if (prevOpt == "YesNoChoice" && (r == 'yes' || r == 'no')){
      if (r == 'yes') {
        balance += allEvents[curEventIndex - 1].consequence.can_take["money"];
        res.balance = balance;
      }
      applyTransition(r, prevEvent);
    }
    else if (prevOpt == "AcceptChoice" && r == "ok")
      applyTransition(r, prevEvent);
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
  console.log(res);
  return res;
}
