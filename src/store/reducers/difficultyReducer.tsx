import { AnyAction } from "redux";

const initialState = {
  gameDifficulty: localStorage.getItem('gameDifficulty') || 'A1',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function gameDifficultyReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case 'CHANGE_DIFFICULTY':
      return { ...state, gameDifficulty: action.payload };
    default:
      return state;
  }
}