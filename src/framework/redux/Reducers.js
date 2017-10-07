// @flow

import { combineReducers } from 'redux';
import { UserAccessReducer } from 'micro-business-parse-server-common-react-native';
import { NetInfoReducer } from 'micro-business-common-react-native';
import { AppUpdaterReducer } from '../../app/navigation/appUpdater';
import { MessageBarReducer } from '../../sharedComponents/messageBar';
import { ShoppingListReducer, ShoppingListDetailReducer } from '../../app/shoppingList';
import { StapleItemsReducer } from '../../app/stapleItems';
import { ProductsFilterReducer } from '../../sharedComponents/productsFilter';
import { ProductReducer } from '../../app/products';
import { LocalStateReducer } from '../localState';

export default function getReducers(navigationReducer) {
  return combineReducers({
    userAccess: UserAccessReducer,
    navigation: navigationReducer,
    netInfo: NetInfoReducer,
    appUpdater: AppUpdaterReducer,
    messageBar: MessageBarReducer,
    shoppingList: ShoppingListReducer,
    stapleItems: StapleItemsReducer,
    productsFilter: ProductsFilterReducer,
    products: ProductReducer,
    shoppingListDetail: ShoppingListDetailReducer,
    localState: LocalStateReducer,
  });
}
