type TypeOfChoice = 'YesNoChoice' | 'AcceptChoice';

type YesNoChoice = 'yes' | 'no';
type AcceptChoice = 'ok';
type ResponseToChoiceEvent = YesNoChoice | AcceptChoice;

interface Consequence {
  description: string;
  apply: Function;
}


interface Event {
  id: number,
  name: string,
  description: string,
  consequence: Consequence,
  option: TypeOfChoice // what you may send
}

interface EventResult {

}

const allEvents: Event[] = [
  {
    id: 1,
    name: "Bienvenue !!",
    description: "Différents événements vont se produire, vous devrez y répondre ou en subir les conséquences. Vous devrez faire attention à bien gérer votre argent tout en faisant attention votre pollution des océans",
    consequence : {
      description: "Vos décisions affecteront la composition chimiques et la biodiversité des océans"
    },
    () =>
    option: "AcceptChoice"
  },
  {
    id: 2,
    name: "Premiers pas",
    description: "Pour faire tourner ses data Center Microsoft aurait besoin de faire construire une vingtaine de centrale éléctrique tournant aux gaz naturelles. Acceptez vous ?",
    consesquence : {
      ocean_desc: "Le CO2 s'accumele encore dans les océans, acidifiant légérement les océeans."
    },
    option: "YesNoChoice"
  },
  {
    id: 3,
    name: "Énergies renouvelables ou traditionnelles",
    description: "Une entreprise propose de construire des éoliennes offshore. Elles sont coûteuses à installer, mais elles réduisent les émissions de CO2. Acceptez-vous de financer leur construction ?",
    consesquence: {
      ocean_desc: "Moins de CO2 dans l'air signifie une acidification plus lente des océans, préservant ainsi les récifs coralliens."
    },
    option: "YesNoChoice"
  },
  {
    id: 4,
    name: "Développer le tourisme côtier",
    description: "Une nouvelle station balnéaire pourrait stimuler l'économie locale, mais au prix d'un rejet accru de déchets et d'eaux usées dans les océans. Autorisez-vous ce projet ?",
    consesquence: {
      ocean_desc: "La pollution locale augmente, perturbant les écosystèmes côtiers et contribuant à l'accumulation de plastiques dans l'océan."
    },
    option: "YesNoChoice"
  },
  {
    id: 5,
    name: "Subventionner les industries polluantes",
    description: "Pour maintenir des emplois, le gouvernement propose de subventionner des industries utilisant des carburants fossiles. Voulez-vous allouer des fonds à ce projet ?",
    consesquence: {
      ocean_desc: "Une augmentation des émissions de CO2 accentue l'acidification des océans, mettant en danger des espèces sensibles comme les mollusques."
    },
    option: "YesNoChoice"
  },
  {
    id: 6,
    name: "Transport maritime propre ou économique",
    description: "Vous pouvez inciter les compagnies maritimes à adopter des carburants plus propres, ce qui coûtera plus cher au commerce international. Que choisissez-vous ?",
    consesquence: {
      ocean_desc: "Moins de polluants sont déversés dans l'océan, protégeant ainsi les écosystèmes marins côtiers et la vie aquatique."
    },
    option: "YesNoChoice"
  },
  {
    id: 7,
    name: "Pêcherie durable ou rendement maximal",
    description: "Les pêcheurs demandent d'exploiter davantage les ressources marines pour répondre à la demande croissante. Acceptez-vous d'autoriser la surpêche ?",
    consesquence: {
      ocean_desc: "La biodiversité marine diminue, et les déséquilibres dans les écosystèmes marins aggravent leur fragilité."
    },
    option: "YesNoChoice"
  },
  {
    id: 8,
    name: "Exploitation pétrolière offshore",
    description: "Une grande compagnie pétrolière propose un contrat lucratif pour exploiter un gisement sous-marin. Cela générera d'importants revenus fiscaux, mais au risque d'accidents environnementaux majeurs. Autorisez-vous l'exploitation ?",
    consesquence: {
      ocean_desc: "La pollution pétrolière menace les écosystèmes marins, réduit la biodiversité et cause des morts massives de poissons et d'oiseaux marins."
    },
    option: "YesNoChoice"
  },
  {
    id: 9,
    name: "Accélérer le transport international",
    description: "Pour stimuler le commerce, vous proposez d'augmenter le nombre de cargos et leur vitesse. Cette mesure réduit les délais commerciaux mais augmente la consommation de carburants lourds. L'autorisez-vous ?",
    consesquence: {
      ocean_desc: "Une consommation accrue de carburants lourds entraîne plus de déversements et de CO2 dans les océans, aggravant l'acidification et la pollution marine."
    },
    option: "YesNoChoice"
  },
  {
    id: 10,
    name: "Urbanisation côtière rapide",
    description: "Une multinationale propose d'investir dans des complexes touristiques sur une zone côtière sensible. Cela boostera votre économie locale, mais au détriment de l'écosystème marin. Acceptez-vous le projet ?",
    consesquence: {
      ocean_desc: "La destruction des mangroves et des récifs coralliens réduit leur capacité à absorber le CO2, tout en mettant en péril la faune locale."
    },
    option: "YesNoChoice"
  },
  {
    id: 11,
    name: "Exploitation minière sous-marine",
    description: "Une entreprise propose d'extraire des minéraux rares des fonds marins. Cela rapportera énormément d'argent, mais au détriment des habitats profonds. Autorisez-vous cette activité ?",
    consesquence: {
      ocean_desc: "Les activités minières détruisent les habitats benthiques et libèrent des sédiments toxiques qui affectent les organismes marins."
    },
    option: "YesNoChoice"
  },
  {
    id: 12,
    name: "Augmenter la production plastique",
    description: "Les industries pétrochimiques demandent de relancer massivement la production de plastique pour relancer l’économie. Cela entraînera des bénéfices immédiats, mais des impacts environnementaux accrus. Approuvez-vous ?",
    consesquence: {
      ocean_desc: "L'augmentation des plastiques finit par polluer davantage les océans, avec un impact direct sur la faune marine et les chaînes alimentaires."
    },
    option: "YesNoChoice"
  },
  {
    id: 13,
    name: "Lancement de plateformes gazières",
    description: "Un consortium pétrolier vous propose de développer des plateformes gazières offshore. Cela augmentera les revenus énergétiques de votre région mais pose des risques écologiques. Acceptez-vous ?",
    consesquence: {
      ocean_desc: "La construction et l’exploitation des plateformes perturbent les écosystèmes marins et libèrent des polluants dans les eaux."
    },
    option: "YesNoChoice"
  },
  {
    id: 14,
    name: "Élimination des déchets des plateformes",
    description: "Après avoir installé des plateformes, vous devez choisir comment gérer les déchets industriels. Optez-vous pour une gestion coûteuse mais écologique, ou une méthode bon marché rejetant des résidus dans l'océan ?",
    consesquence: {
      ocean_desc: "Les rejets toxiques dans l’océan menacent directement la biodiversité et provoquent une accumulation de contaminants chimiques."
    },
    option: "YesNoChoice"
  },
  {
    id: 15,
    name: "Conflit avec les pêcheurs",
    description: "Les pêcheurs locaux se plaignent de la baisse des stocks de poissons causée par vos décisions. Pour apaiser la situation, vous pouvez leur verser des subventions (coûteuses) ou ignorer leurs revendications. Que faites-vous ?",
    consesquence: {
      ocean_desc: "Les pêcheurs intensifient la surpêche pour compenser, aggravant le déclin des populations marines déjà fragilisées."
    },
    option: "YesNoChoice"
  },
  {
    id: 16,
    name: "Stockage de l'énergie gazière",
    description: "Pour stabiliser l'approvisionnement énergétique, vous pouvez construire des réservoirs souterrains de stockage. Ces infrastructures sont chères et controversées pour leur impact environnemental. Lancez-vous ce projet ?",
    consesquence: {
      ocean_desc: "Les fuites de méthane dans l'eau augmentent la saturation en gaz, perturbant les habitats marins sensibles."
    },
    option: "YesNoChoice"
  },
  {
    id: 17,
    name: "Fuite de méthane détectée",
    description: "Des fuites de méthane issues de vos installations sont détectées. Vous pouvez investir dans des réparations coûteuses ou ignorer la situation pour préserver vos finances. Que faites-vous ?",
    consesquence: {
      ocean_desc: "Les émissions de méthane accentuent l’acidification des océans et le réchauffement climatique, perturbant les écosystèmes marins."
    },
    option: "YesNoChoice"
  },
  {
    id: 18,
    name: "Pression économique sur le commerce maritime",
    description: "Les installations industrielles augmentent le trafic maritime, vital pour l’économie. Toutefois, cela accroît les risques de collisions, de rejets de carburants et de bruit sous-marin. Laissez-vous cette expansion se poursuivre sans restrictions ?",
    consesquence: {
      ocean_desc: "Le trafic intensif perturbe les mammifères marins, réduit leur capacité de communication et aggrave la pollution par les carburants lourds."
    },
    option: "YesNoChoice"
  },
  {
    id: 19,
    name: "Protestation internationale",
    description: "Face à la dégradation environnementale causée par vos politiques, des ONG dénoncent vos choix. Vous pouvez réduire vos activités industrielles pour restaurer votre image, ou ignorer la pression. Que décidez-vous ?",
    consesquence: {
      ocean_desc: "Ignorer les protestations accélère la destruction des écosystèmes marins et la disparition de nombreuses espèces."
    },
    option: "YesNoChoice"
  },
  {
    id: 20,
    name: "Tempête écologique",
    description: "Une forte tempête frappe vos installations côtières, dispersant des déchets plastiques et pétroliers dans l'océan. Les conséquences sur les écosystèmes marins sont catastrophiques.",
    consesquence: {
      ocean_desc: "Les plastiques et les produits chimiques toxiques s'accumulent, endommageant les récifs coralliens et empoisonnant la faune marine."
    },
    option: "AcceptChoice"
  },
  {
    id: 21,
    name: "Effondrement d’un écosystème",
    description: "La surpêche combinée à la pollution locale provoque un effondrement des populations de poissons dans une zone clé. Cela entraîne une perte massive de biodiversité et un déséquilibre écologique.",
    consesquence: {
      ocean_desc: "La disparition des espèces provoque une réaction en chaîne dans l'écosystème marin, affectant les prédateurs et les récifs coralliens."
    },
    option: "AcceptChoice"
  },
  {
    id: 22,
    name: "Réchauffement des eaux côtières",
    description: "Les activités industrielles intensives dans la région augmentent la température des eaux côtières. Cela perturbe gravement les habitats naturels des espèces marines locales.",
    consesquence: {
      ocean_desc: "Le réchauffement des eaux accélère la décoloration des coraux et provoque la migration forcée des espèces marines sensibles."
    },
    option: "AcceptChoice"
  },
  {
    id: 23,
    name: "Marée noire accidentelle",
    description: "Une fuite massive de pétrole se produit à proximité d'une plateforme offshore. Les efforts pour contenir la pollution sont insuffisants, et les conséquences à long terme sont désastreuses.",
    consesquence: {
      ocean_desc: "La marée noire détruit les habitats côtiers et tue des milliers d'animaux marins, des oiseaux aux poissons en passant par les mammifères."
    },
    option: "AcceptChoice"
  },
  {
    id: 24,
    name: "Hypoxie marine",
    description: "L'accumulation de nutriments et de polluants dans l'océan crée une zone morte où l'oxygène disparaît. La vie marine ne peut plus y prospérer.",
    consesquence: {
      ocean_desc: "Les zones mortes s’étendent, éliminant toute vie aquatique et aggravant les déséquilibres dans les écosystèmes environnants."
    },
    option: "AcceptChoice"
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
