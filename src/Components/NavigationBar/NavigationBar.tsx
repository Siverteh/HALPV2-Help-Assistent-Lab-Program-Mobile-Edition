
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import CreateTicke from '../../features/CreateTicket'

// denne fjernes og byttes ut med de andre sidene
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
      <Tab.Navigator
        initialRouteName={"Helplist"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Helplist") {
              iconName = focused ? 'list' : 'list-outline';

            } else if (route.name === "Archive") {
              iconName = focused ? 'checkmark-done' : 'checkmark-done-outline';

            } else if (route.name === "Settings") {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName ?? ''} size={size} color={color} />;
          },
          activeTintColor: '#0070C0',
          inactiveTintColor: 'black',
          inactiveBackgroundColor: '#E0EEF7',
          activeBackgroundColor: '#E0EEF7'
        })}
        >

        <Tab.Screen name={"Helplist"} component={DetailsScreen} />
        <Tab.Screen name={"Archive"} component={DetailsScreen} />
        <Tab.Screen name={"Settings"} component={DetailsScreen} />

      </Tab.Navigator>
  );
};

export default NavigationBar;