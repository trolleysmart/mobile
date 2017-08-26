// @flow

import {
  StackNavigator,
} from 'react-navigation';
import {
  HomeContainer,
} from '../home';
import {
  StapleShoppingList,
} from '../stapleShoppingList';
import {
  UserFeedbackContainer as StapleShoppingListUserFeedback,
} from '../stapleShoppingList/userFeedback';
import {
  SpecialsFilterContainer,
} from '../specialsFilter';
import {
  CategoriesFilter,
} from '../categoriesFilter';
import {
  StoresFilter,
} from '../storesFilter';
import {
  FlyerContainer,
} from '../flyer';

export default StackNavigator({
  Home: {
    screen: HomeContainer,
  },
  StapleShoppingList: {
    screen: StapleShoppingList,
  },
  StapleShoppingListUserFeedback: {
    screen: StapleShoppingListUserFeedback,
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
  Flyer: {
    screen: FlyerContainer,
  },
});
