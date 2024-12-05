type UserChoice = 'yes' | 'no' | 'ok';
const yesNoChoice = ['yes', 'no'];
const EventChoice = ['ok'];

interface DescCons {
  human_desc: string,
  ocean_desc: string,
}

interface Event {
  id: number,
  name: string,
  description: String,
  consesquence: DescCons,
  option: String[]
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
    option: yesNoChoice
  }
];

const resetTimeSecs = 10;
let curTime: number;

function start() {
  curTime = Date.now();
}

function update(): Event | null {
  if (Date.now() - curTime > resetTimeSecs) {
    return
  } else {
    return null;
  }
}

export {
  start,
  update
};