import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// To send along the token use `tokenConfig` helper function
// make sure to pass the `getState` method as an argument

// Using Thunk to get items through async requests
// by () => dispatch => { `whatever here`, dispatch({type: "DOTHIS"})}
// else we can just do return { type: "DOTHIS"}

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};

export const addItem = (item) => (dispatch, getState) => {
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
