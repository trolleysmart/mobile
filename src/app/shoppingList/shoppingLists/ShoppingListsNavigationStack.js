// @flow

import { StackNavigator } from 'react-navigation';
import ShoppingList from '../shoppingList/ShoppingList';
import ShoppingListsContainer from './ShoppingListsContainer';
import ShoppingListDetailContainer from '../shoppingListDetail/ShoppingListDetailContainer';

const ShoppingListsNavigationStack = StackNavigator(
  {
    ShoppingLists: {
      screen: ShoppingListsContainer,
    },
    ShoppingList: {
      screen: ShoppingList,
    },
    ShoppingListDetail: {
      screen: ShoppingListDetailContainer,
    },
  },
  {
    cardStyle: {
      backgroundColor: 'white',
    },
  },
);

export default ShoppingListsNavigationStack;
