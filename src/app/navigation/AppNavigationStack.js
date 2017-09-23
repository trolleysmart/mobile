// @flow

import { StackNavigator } from 'react-navigation';
import HomeNavigationTab from './HomeNavigationTab';
import { StapleShoppingList } from '../stapleItems';
import { ProductsFilterContainer } from '../../sharedComponents/productsFilter';
import { CategoriesFilter } from '../../sharedComponents/categoriesFilter';
import { StoresFilter } from '../../sharedComponents/storesFilter';
import { FlyerContainer } from '../flyer';
import { Products } from '../products';

export default StackNavigator({
  Home: {
    screen: HomeNavigationTab,
  },
  StapleShoppingList: {
    screen: StapleShoppingList,
  },
  ProductsFilter: {
    screen: ProductsFilterContainer,
  },
  CategoriesFilter: {
    screen: CategoriesFilter,
  },
  StoresFilter: {
    screen: StoresFilter,
  },
  Flyer: {
    screen: FlyerContainer,
  },
  Products: {
    screen: Products,
  },
});
