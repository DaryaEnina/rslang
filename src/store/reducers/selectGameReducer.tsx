import { AnyAction } from "redux";


const initialState = {
  selectedGame: localStorage.getItem('selectedGame') || 'AUDIOGAME'
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function selectGameReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case 'AUDIOGAME':
    case 'SPRINT':
      return { ...state, selectGame: action.payload };
    default:
      return state;
  }
}