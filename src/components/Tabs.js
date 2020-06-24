import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
// import Post from './pages/Post';
import Header from './Header';
import PostPreview from './PostPreview';
import DenemeComp from './denemeComp';
import Recently from '../pages/Recently';

import BackgroundJobs1 from '../methods/backgroundJobs1';
import backgroundJobs from '../methods/backgroundJobs';

const Tab = createBottomTabNavigator();

function Deneme() {
  return (
    <View>
      <Header title="Header Baslık" />
      {/* <PostPreview /> */}
      <Text>deneme</Text>
      {/* <DenemeComp /> */}
      <Icon name="bell" size={23} color="#eee" />
    </View>
  );
}
function Tabs() {
  // const head = <Header title="Header Baslık" />;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Recently') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Subscribe') {
            iconName = 'bell';
          } else if (route.name === 'Add') {
            iconName = 'plus-circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#FFF',
        activeBackgroundColor: '#2c7fda',
        inactiveTintColor: '#EEE',
        style: {backgroundColor: '#2E4E8C', borderTopWidth: 0},
      }}>
      <Tab.Screen
        name="Recently"
        component={Recently}
        options={{
          tabBarLabel: 'Son Eklenenler',
        }}
      />
      <Tab.Screen
        name="Search"
        component={BackgroundJobs1}
        options={{
          tabBarLabel: 'Arama',
        }}
      />
      <Tab.Screen
        name="Subscribe"
        component={Deneme}
        options={{
          tabBarLabel: 'Abonelik',
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
