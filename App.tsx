import React, { JSX } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Northernrts from './WingsSrcWay/Northernback/Northernrts';
import { RootStackParamList } from './WingsSrcWay/Northernconst/types';

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {

  return (
      <NavigationContainer>
          <Stack.Navigator
            initialRouteName="NorthernLDR"
            screenOptions={{ headerShown: false }}
          >
              <Stack.Screen
                  name="NorthernADDRT"
                  component={Northernrts.NorthernADDRTroute}
              />
              <Stack.Screen
                  name="NorthernBRD"
                  component={Northernrts.NorthernBRDroute}
              />
              <Stack.Screen
                  name="NorthernHM"
                  component={Northernrts.NorthernHMroute}
              />
              <Stack.Screen
                  name="NorthernLDR"
                  component={Northernrts.NorthernLDRroute}
              />
              <Stack.Screen
                  name="NorthernMP"
                  component={Northernrts.NorthernMProute}
              />
              <Stack.Screen
                  name="NorthernRP"
                  component={Northernrts.NorthernRProute}
              />
              <Stack.Screen
                  name="NorthernRT"
                  component={Northernrts.NorthernRTroute}
              />
              <Stack.Screen
                  name="NorthernSVD"
                  component={Northernrts.NorthernSVDroute}
              />
              <Stack.Screen
                  name="Northerninformation"
                  component={Northernrts.Northerninformationroute}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
