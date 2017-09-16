// @flow

import { StackNavigator } from 'react-navigation';
import { ShoppingList } from '../shoppingList';
import ShoppingListsContainer from './ShoppingListsContainer';

const ShoppingListsNavigationStack = StackNavigator({
  ShoppingLists: {
    screen: ShoppingListsContainer,
  },
  ShoppingList: {
    screen: ShoppingList,
  },
});

export default ShoppingListsNavigationStack;
