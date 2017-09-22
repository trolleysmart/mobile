// @flow

import { StackNavigator } from 'react-navigation';
import ShoppingList from '../shoppingList/ShoppingList';
import ShoppingLists from './ShoppingLists';
import ShoppingListDetailContainer from '../shoppingListDetail/ShoppingListDetailContainer';

const ShoppingListsNavigationStack = StackNavigator(
  {
    ShoppingLists: {
      screen: ShoppingLists,
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
