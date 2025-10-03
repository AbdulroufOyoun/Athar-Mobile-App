import './global.css';

import 'react-native-gesture-handler';
import 'react-native-reanimated';

import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './Navigation/MainNavigator';
const Stack = createNativeStackNavigator();
import { preventScreenCaptureAsync } from 'expo-screen-capture';

export default function App() {
  preventScreenCaptureAsync();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SingUp" component={SignUpScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
