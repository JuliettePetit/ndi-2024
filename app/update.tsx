type UserChoice = 'yes' | 'no' | 'ok';

interface EventDesc {
  human_desc: string,
  ocean_desc: string,
}

interface Event {
  id: number,
  name: string,
  description: EventDesc,
  option: undefined
}

const allEvents: Event[] = [];

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