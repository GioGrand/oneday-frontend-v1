import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../../components/ui/TabBarIcon';
import TabBarIconAdd from '../../components/ui/TabBarIconAdd';

// FEED
import Feed from '../../screens/Feed/Feed';
import DetailedDay from '../../screens/Feed/DetailedDay/DetailedDay';
import SaveDay from './../../screens/CreatePost/NewTrip/SaveDay';

// ADD
import AddPost from '../../screens/CreatePost/NewTrip/AddPost';
import AddLocation from '../../screens/CreatePost/NewTrip/AddLocation';
import CreatePostSwitch from '../../screens/CreatePost/CreatePostSwitch';

// ADD
import Profile from '../../screens/Profile/Profile';
import EditProfile from '../../screens/Profile/EditProfile';
import Settings from '../../screens/Profile/Settings';

import FavouritesScreen from '../../screens/Favourites/Favourites';

// SEARCH
import Search from '../../screens/Search/Search';
import SearchResult from '../../screens/Search/SearchResult';

const FeedStack = createStackNavigator({
  Feed: Feed,
  SaveDay: SaveDay,
  DetailedDay: DetailedDay,
});

// FeedStack.navigationOptions = {
//   tabBarLabel: 'Feed',
//   tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'home' : 'home'} />,
// };
FeedStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Feed',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'home' : 'home'} />,
  };
};

FeedStack.path = '';

const SearchStack = createStackNavigator({ Search, SearchResult });

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'search1' : 'search1'} />,
};

SearchStack.path = '';

const AddPostStack = createStackNavigator({
  CreatePostSwitch: CreatePostSwitch,
  AddPost: AddPost,
  AddLocation: AddLocation,
});

AddPostStack.navigationOptions = {
  mode: 'modal',
  tabBarVisible: false,
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused }) => <TabBarIconAdd focused={focused} name={Platform.OS === 'ios' ? 'pluscircleo' : 'pluscircleo'} />,
};

AddPostStack.path = '';

const FavouritesStack = createStackNavigator({ FavouritesScreen });

FavouritesStack.navigationOptions = {
  tabBarLabel: 'FavouritesStack',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'hearto' : 'hearto'} />,
};

FavouritesStack.path = '';

const ProfileStack = createStackNavigator({
  Profile,
  EditProfile,
  Settings,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'user' : 'user'} />,
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    FeedStack,
    SearchStack,
    AddPostStack,
    FavouritesStack,
    ProfileStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (navigation.state.key === 'AddPostStack') navigation.navigate('MyModal');
        else defaultHandler();
      },
    }),
    tabBarOptions: {
      showLabel: false,
      labelStyle: {
        fontSize: 12,
        fontFamily: 'sf-ui',
      },
      style: {
        borderTopColor: 'transparent',
        backgroundColor: '#000',
        height: 70,
      },
    },
  },
);

tabNavigator.path = '';

const Nav_RootStack = createStackNavigator(
  {
    Main: {
      screen: tabNavigator,
    },
    MyModal: {
      screen: AddPostStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default Nav_RootStack;
