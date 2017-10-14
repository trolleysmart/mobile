// @flow

import { Map } from 'immutable';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { MessageType } from 'micro-business-common-react-native';
import * as MessageBarActions from 'micro-business-common-react-native/src/messageBar/Actions';
import ActionTypes from './ActionTypes';
import * as Actions from './Actions';

function* getDefaultShoppingListAsync() {
  try {
    const id = yield call(AsyncStorage.getItem, 'defaultShoppingList:Id');
    const name = yield call(AsyncStorage.getItem, 'defaultShoppingList:Name');

    yield put(Actions.defaultShoppingListChanged(Map({ id: id ? id : '', name: name ? name : '' })));
  } catch (exception) {
    yield put(Actions.defaultShoppingListChanged(Map({ defaultShoppingListId: '' })));
    yield put(MessageBarActions.add(exception, MessageType.ERROR));
  }
}

export function* watchGetDefaultShoppingList() {
  yield takeLatest(ActionTypes.LOCAL_STATE_GET_DEFAULT_SHOPPING_LIST, getDefaultShoppingListAsync);
}

function* setDefaultShoppingListAsync(action) {
  try {
    yield call(AsyncStorage.setItem, 'defaultShoppingList:Id', action.payload.get('id'));
    yield call(AsyncStorage.setItem, 'defaultShoppingList:Name', action.payload.get('name'));

    yield put(Actions.defaultShoppingListChanged(Map({ id: action.payload.get('id'), name: action.payload.get('name') })));
  } catch (exception) {
    yield put(MessageBarActions.add(exception, MessageType.ERROR));
  }
}

export function* watchSetDefaultShoppingList() {
  yield takeLatest(ActionTypes.LOCAL_STATE_SET_DEFAULT_SHOPPING_LIST, setDefaultShoppingListAsync);
}
