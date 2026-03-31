import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoleSelectionScreen from './src/screens/Auth/RoleSelection';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="RoleSelection"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3cb371',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="RoleSelection" 
          component={RoleSelectionScreen} 
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={({route}) => ({ title: `Login as ${route.params?.role || 'User'}` })}
        />
        
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ title: 'Create Account' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
