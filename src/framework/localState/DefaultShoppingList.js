// @flow

import { Map } from 'immutable';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import ActionTypes from './ActionTypes';
import * as Actions from './Actions';

function* getDefaultShoppingListAsync() {
  try {
    const value = yield call(AsyncStorage.getItem, 'defaultShoppingList:Id');

    yield put(Actions.defaultShoppingListChanged(Map({ defaultShoppingListId: value ? value : '' })));
  } catch (exception) {
    yield put(Actions.defaultShoppingListChanged(Map({ defaultShoppingListId: '' })));
  }
}

export function* watchGetDefaultShoppingList() {
  yield takeLatest(ActionTypes.LOCAL_STATE_GET_DEFAULT_SHOPPING_LIST, getDefaultShoppingListAsync);
}

function* setDefaultShoppingListAsync(action) {
  try {
    yield call(AsyncStorage.setItem, 'defaultShoppingList:Id', action.payload.get('defaultShoppingListId'));

    yield put(Actions.defaultShoppingListChanged(Map({ defaultShoppingListId: action.get('defaultShoppingListId') })));
  } catch (exception) {}
}

export function* watchSetDefaultShoppingList() {
  yield takeLatest(ActionTypes.LOCAL_STATE_SET_DEFAULT_SHOPPING_LIST, setDefaultShoppingListAsync);
}
