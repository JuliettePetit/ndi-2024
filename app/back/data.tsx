import {GeoEvent} from "@/lib/types";

export const allEvents: GeoEvent[] = [
  {
    id: 1,
    title: "Bienvenue !!",
    description: "Différents événements vont se produire, vous devrez y répondre ou en subir les conséquences. Vous devrez faire attention à bien gérer votre argent tout en faisant attention votre pollution des océans",
    consequence : {
      description: "Vos décisions affecteront la composition chimiques et la biodiversité des océans",
      can_take: {"money" : 5000000000},
      ocean_changes: {},
      human_changes: {}
    },
    option: "AcceptChoice"
  },
  {
    id: 2,
    title: "Premiers pas",
    description: "Pour faire tourner ses data Center Microsoft aurait besoin de faire construire une vingtaine de centrale éléctrique tournant aux gaz naturelles. Acceptez vous ?",
    consequence : {
      description: "Le CO2 s'accumule encore dans les océans, acidifiant légérement les océeans.",
      can_take: {"money" : -3_000_000},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 3,
    title: "Énergies renouvelables ou traditionnelles",
    description: "Une entreprise propose de construire des éoliennes offshore. Elles sont coûteuses à installer, mais elles réduisent les émissions de CO2. Acceptez-vous de financer leur construction ?",
    consequence: {
      description: "Moins de CO2 dans l'air signifie une acidification plus lente des océans, préservant ainsi les récifs coralliens.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 4,
    title: "Développer le tourisme côtier",
    description: "Une nouvelle station balnéaire pourrait stimuler l'économie locale, mais au prix d'un rejet accru de déchets et d'eaux usées dans les océans. Autorisez-vous ce projet ?",
    consequence: {
      description: "La pollution locale augmente, perturbant les écosystèmes côtiers et contribuant à l'accumulation de plastiques dans l'océan.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 5,
    title: "Subventionner les industries polluantes",
    description: "Pour maintenir des emplois, le gouvernement propose de subventionner des industries utilisant des carburants fossiles. Voulez-vous allouer des fonds à ce projet ?",
    consequence: {
      description: "Une augmentation des émissions de CO2 accentue l'acidification des océans, mettant en danger des espèces sensibles comme les mollusques.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 6,
    title: "Transport maritime propre ou économique",
    description: "Vous pouvez inciter les compagnies maritimes à adopter des carburants plus propres, ce qui coûtera plus cher au commerce international. Que choisissez-vous ?",
    consequence: {
      description: "Moins de polluants sont déversés dans l'océan, protégeant ainsi les écosystèmes marins côtiers et la vie aquatique.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 7,
    title: "Pêcherie durable ou rendement maximal",
    description: "Les pêcheurs demandent d'exploiter davantage les ressources marines pour répondre à la demande croissante. Acceptez-vous d'autoriser la surpêche ?",
    consequence: {
      description: "La biodiversité marine diminue, et les déséquilibres dans les écosystèmes marins aggravent leur fragilité.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 8,
    title: "Exploitation pétrolière offshore",
    description: "Une grande compagnie pétrolière propose un contrat lucratif pour exploiter un gisement sous-marin. Cela générera d'importants revenus fiscaux, mais au risque d'accidents environnementaux majeurs. Autorisez-vous l'exploitation ?",
    consequence: {
      description: "La pollution pétrolière menace les écosystèmes marins, réduit la biodiversité et cause des morts massives de poissons et d'oiseaux marins.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 9,
    title: "Accélérer le transport international",
    description: "Pour stimuler le commerce, vous proposez d'augmenter le nombre de cargos et leur vitesse. Cette mesure réduit les délais commerciaux mais augmente la consommation de carburants lourds. L'autorisez-vous ?",
    consequence: {
      description: "Une consommation accrue de carburants lourds entraîne plus de déversements et de CO2 dans les océans, aggravant l'acidification et la pollution marine.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 10,
    title: "Urbanisation côtière rapide",
    description: "Une multinationale propose d'investir dans des complexes touristiques sur une zone côtière sensible. Cela boostera votre économie locale, mais au détriment de l'écosystème marin. Acceptez-vous le projet ?",
    consequence: {
      description: "La destruction des mangroves et des récifs coralliens réduit leur capacité à absorber le CO2, tout en mettant en péril la faune locale.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 11,
    title: "Exploitation minière sous-marine",
    description: "Une entreprise propose d'extraire des minéraux rares des fonds marins. Cela rapportera énormément d'argent, mais au détriment des habitats profonds. Autorisez-vous cette activité ?",
    consequence: {
      description: "Les activités minières détruisent les habitats benthiques et libèrent des sédiments toxiques qui affectent les organismes marins.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 12,
    title: "Augmenter la production plastique",
    description: "Les industries pétrochimiques demandent de relancer massivement la production de plastique pour relancer l’économie. Cela entraînera des bénéfices immédiats, mais des impacts environnementaux accrus. Approuvez-vous ?",
    consequence: {
      description: "L'augmentation des plastiques finit par polluer davantage les océans, avec un impact direct sur la faune marine et les chaînes alimentaires.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 13,
    title: "Lancement de plateformes gazières",
    description: "Un consortium pétrolier vous propose de développer des plateformes gazières offshore. Cela augmentera les revenus énergétiques de votre région mais pose des risques écologiques. Acceptez-vous ?",
    consequence: {
      description: "La construction et l’exploitation des plateformes perturbent les écosystèmes marins et libèrent des polluants dans les eaux.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 14,
    title: "Élimination des déchets des plateformes",
    description: "Après avoir installé des plateformes, vous devez choisir comment gérer les déchets industriels. Optez-vous pour une gestion coûteuse mais écologique, ou une méthode bon marché rejetant des résidus dans l'océan ?",
    consequence: {
      description: "Les rejets toxiques dans l’océan menacent directement la biodiversité et provoquent une accumulation de contaminants chimiques.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 15,
    title: "Conflit avec les pêcheurs",
    description: "Les pêcheurs locaux se plaignent de la baisse des stocks de poissons causée par vos décisions. Pour apaiser la situation, vous pouvez leur verser des subventions (coûteuses) ou ignorer leurs revendications. Que faites-vous ?",
    consequence: {
      description: "Les pêcheurs intensifient la surpêche pour compenser, aggravant le déclin des populations marines déjà fragilisées.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 16,
    title: "Stockage de l'énergie gazière",
    description: "Pour stabiliser l'approvisionnement énergétique, vous pouvez construire des réservoirs souterrains de stockage. Ces infrastructures sont chères et controversées pour leur impact environnemental. Lancez-vous ce projet ?",
    consequence: {
      description: "Les fuites de méthane dans l'eau augmentent la saturation en gaz, perturbant les habitats marins sensibles.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 17,
    title: "Fuite de méthane détectée",
    description: "Des fuites de méthane issues de vos installations sont détectées. Vous pouvez investir dans des réparations coûteuses ou ignorer la situation pour préserver vos finances. Que faites-vous ?",
    consequence: {
      description: "Les émissions de méthane accentuent l’acidification des océans et le réchauffement climatique, perturbant les écosystèmes marins.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 18,
    title: "Pression économique sur le commerce maritime",
    description: "Les installations industrielles augmentent le trafic maritime, vital pour l’économie. Toutefois, cela accroît les risques de collisions, de rejets de carburants et de bruit sous-marin. Laissez-vous cette expansion se poursuivre sans restrictions ?",
    consequence: {
      description: "Le trafic intensif perturbe les mammifères marins, réduit leur capacité de communication et aggrave la pollution par les carburants lourds.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 19,
    title: "Protestation internationale",
    description: "Face à la dégradation environnementale causée par vos politiques, des ONG dénoncent vos choix. Vous pouvez réduire vos activités industrielles pour restaurer votre image, ou ignorer la pression. Que décidez-vous ?",
    consequence: {
      description: "Ignorer les protestations accélère la destruction des écosystèmes marins et la disparition de nombreuses espèces.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "YesNoChoice"
  },
  {
    id: 20,
    title: "Tempête écologique",
    description: "Une forte tempête frappe vos installations côtières, dispersant des déchets plastiques et pétroliers dans l'océan. Les conséquences sur les écosystèmes marins sont catastrophiques.",
    consequence: {
      description: "Les plastiques et les produits chimiques toxiques s'accumulent, endommageant les récifs coralliens et empoisonnant la faune marine.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "AcceptChoice"
  },
  {
    id: 21,
    title: "Effondrement d’un écosystème",
    description: "La surpêche combinée à la pollution locale provoque un effondrement des populations de poissons dans une zone clé. Cela entraîne une perte massive de biodiversité et un déséquilibre écologique.",
    consequence: {
      description: "La disparition des espèces provoque une réaction en chaîne dans l'écosystème marin, affectant les prédateurs et les récifs coralliens.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "AcceptChoice"
  },
  {
    id: 22,
    title: "Réchauffement des eaux côtières",
    description: "Les activités industrielles intensives dans la région augmentent la température des eaux côtières. Cela perturbe gravement les habitats naturels des espèces marines locales.",
    consequence: {
      description: "Le réchauffement des eaux accélère la décoloration des coraux et provoque la migration forcée des espèces marines sensibles.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "AcceptChoice"
  },
  {
    id: 23,
    title: "Marée noire accidentelle",
    description: "Une fuite massive de pétrole se produit à proximité d'une plateforme offshore. Les efforts pour contenir la pollution sont insuffisants, et les conséquences à long terme sont désastreuses.",
    consequence: {
      description: "La marée noire détruit les habitats côtiers et tue des milliers d'animaux marins, des oiseaux aux poissons en passant par les mammifères.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "AcceptChoice"
  },
  {
    id: 24,
    title: "Hypoxie marine",
    description: "L'accumulation de nutriments et de polluants dans l'océan crée une zone morte où l'oxygène disparaît. La vie marine ne peut plus y prospérer.",
    consequence: {
      description: "Les zones mortes s’étendent, éliminant toute vie aquatique et aggravant les déséquilibres dans les écosystèmes environnants.",
      can_take: {"money" : 5},
      ocean_changes: ,
      human_changes: 
    },
    option: "AcceptChoice"
  }
];