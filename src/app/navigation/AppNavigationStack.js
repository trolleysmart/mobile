// @flow

import { StackNavigator } from 'react-navigation';
import HomeNavigationTab from './HomeNavigationTab';
import { StapleItems } from '../stapleItems';
import { ProductsFilterContainer } from '../../sharedComponents/productsFilter';
import { CategoriesFilter } from '../../sharedComponents/categoriesFilter';
import { StoresFilter } from '../../sharedComponents/storesFilter';
import { FlyerContainer } from '../flyer';
import { Products } from '../products';
import ShoppingListDetailContainer from '../shoppingList/shoppingListDetail/ShoppingListDetailContainer';
import ProductDetail from '../products/productDetail/ProductDetail';

export default StackNavigator({
  Home: {
    screen: HomeNavigationTab,
  },
  StapleItems: {
    screen: StapleItems,
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
  ShoppingListDetail: {
    screen: ShoppingListDetailContainer,
  },
  ProductDetail: {
    screen: ProductDetail,
  },
});
