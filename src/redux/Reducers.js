// @flow

import { combineReducers } from 'redux';
import { AppUpdaterReducer } from '../appUpdater';
import { MessageBarReducer } from '../messageBar';
import { SpecialsReducer } from '../specials';
import { ShoppingListReducer } from '../shoppingList';
import { StapleShoppingListReducer } from '../stapleShoppingList';
import { SpecialsFilterReducer } from '../specialsFilter';
import { UserAccessReducer } from 'micro-business-parse-server-common-react-native';

export default function getReducers(navigationReducer) {
  return combineReducers({
    navigation: navigationReducer,
    appUpdater: AppUpdaterReducer,
    messageBar: MessageBarReducer,
    userAccess: UserAccessReducer,
    specials: SpecialsReducer,
    shoppingList: ShoppingListReducer,
    stapleShoppingList: StapleShoppingListReducer,
    specialsFilter: SpecialsFilterReducer,
  });
}
