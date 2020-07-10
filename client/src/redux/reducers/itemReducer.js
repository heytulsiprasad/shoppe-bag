import { v4 as uuid } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
  items: [
    { id: uuid(), name: 'Eggs' },
    { id: uuid(), name: 'Ice' },
    { id: uuid(), name: 'Bun' },
    { id: uuid(), name: 'Tomato' },
  ],
};

function itemReducer(state = initialState, action) {
  switch (action) {
    case GET_ITEMS:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default itemReducer;
