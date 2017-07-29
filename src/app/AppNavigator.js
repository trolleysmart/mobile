// @flow

import { StackNavigator } from 'react-navigation';
import { HomeContainer } from '../home';
import { StapleShoppingList } from '../stapleShoppingList';
import { SpecialsFilterContainer } from '../specialsFilter';
import { CategoriesFilter } from '../categoriesFilter';
import { StoresFilter } from '../storesFilter';

export default StackNavigator({
  Home: {
    screen: HomeContainer,
  },
  StapleShoppingList: {
    screen: StapleShoppingList,
  },
  SpecialsFilter: {
    screen: SpecialsFilterContainer,
  },
  CategoriesFilter: {
    screen: CategoriesFilter,
  },
  StoresFilter: {
    screen: StoresFilter,
  },
});
