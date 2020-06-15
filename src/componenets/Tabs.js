import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
// import Post from './pages/Post';
import Header from './Header';
import PostPreview from './PostPreview';

const Tab = createBottomTabNavigator();

function Deneme() {
  return (
    <View>
      <Header title="Header Baslık" />
      <PostPreview />
      <Text>deneme</Text>
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
        component={Deneme}
        options={{
          tabBarLabel: 'Son Eklenenler',
        }}
      />
      <Tab.Screen
        name="Search"
        component={Deneme}
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
