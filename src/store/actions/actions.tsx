

export function changeDifficulty(payload: string) {
  return { type:'CHANGE_DIFFICULTY', payload };
}

type Games = 'AUDIOGAME' | 'SPRINT';

export function selectAudiogame(payload: Games) {
  return { type: 'SELECT_AUDIOGAME', payload };
}

export function selectSprint(payload: Games) {
  return { type: 'SELECT_SPRINT', payload };
}