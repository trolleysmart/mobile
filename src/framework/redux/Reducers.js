// @flow

import { combineReducers } from 'redux';
import { AppUpdaterReducer } from '../../app/navigation/appUpdater';
import { MessageBarReducer } from '../../sharedComponents/messageBar';
import { ShoppingListReducer, ShoppingListDetailReducer } from '../../app/shoppingList';
import { StapleItemsReducer } from '../../app/stapleItems';
import { ProductsFilterReducer } from '../../sharedComponents/productsFilter';
import { ProductReducer } from '../../app/products';
import { UserAccessReducer } from 'micro-business-parse-server-common-react-native';

export default function getReducers(navigationReducer) {
  return combineReducers({
    navigation: navigationReducer,
    appUpdater: AppUpdaterReducer,
    messageBar: MessageBarReducer,
    userAccess: UserAccessReducer,
    shoppingList: ShoppingListReducer,
    stapleItems: StapleItemsReducer,
    productsFilter: ProductsFilterReducer,
    products: ProductReducer,
    shoppingListDetail: ShoppingListDetailReducer,
  });
}
