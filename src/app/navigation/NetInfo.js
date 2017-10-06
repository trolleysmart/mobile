// @flow

import { Map } from 'immutable';
import { call, put, takeLatest } from 'redux-saga/effects';
import { NetInfo } from 'react-native';
import ActionTypes from './ActionTypes';
import * as Actions from './Actions';

function* refreshNetInfoStateAsync() {
  try {
    const connectionInfo = yield call(NetInfo.getConnectionInfo);
    const isConnectionExpensive = yield call(NetInfo.isConnectionExpensive);
    const isConnected = yield call(NetInfo.isConnected.fetch);

    yield put(
      Actions.netInfoStateChanged(
        Map({
          netInfoExists: true,
          connectionInfo: Map({
            type: connectionInfo.type,
            effectiveType: connectionInfo.effectiveType,
          }),
          isConnectionExpensive,
          isConnected,
        }),
      ),
    );
  } catch (exception) {
    yield put(Actions.netInfoStateChanged(Map({ netInfoExists: false })));
  }
}

export default function* watchRefreshNetInfoState() {
  yield takeLatest(ActionTypes.APP_REFRESH_NETINFO_STATE, refreshNetInfoStateAsync);
}
