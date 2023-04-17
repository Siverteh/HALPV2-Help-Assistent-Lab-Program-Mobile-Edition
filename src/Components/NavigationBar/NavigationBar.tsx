import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { studassRoutes, userRoutes } from '../../App/routes';

type Props = {
  isStudass: boolean
}

const Tab = createBottomTabNavigator();

const NavigationBar = ({ isStudass }: Props) => {
  return (
      <Tab.Navigator
        initialRouteName={"Helplist"}
        screenOptions={{
          tabBarStyle: { backgroundColor: '#E0EEF7' },
          tabBarActiveTintColor: '#0070C0',
          tabBarInactiveTintColor: '#000000'
        }}
        >
          {isStudass ? 
            studassRoutes.map(({ name, component, icon}, i) => (
                <Tab.Screen
                key={i}
                name={name}
                component={component}
                options={{
                  headerShown: false,
                  tabBarLabel: name,
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name={icon} color={color} size={size} />
                  ),
                }}
                />
            )) : userRoutes.map(({ name, component, icon}, i) => (
              <Tab.Screen
                key={i}
                name={name}
                component={component}
                options={{
                  headerShown: false,
                  tabBarLabel: name,
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name={icon} color={color} size={size} />
                  ),
                }}
                />
            ))}

      </Tab.Navigator>
  );
};

export default NavigationBar;