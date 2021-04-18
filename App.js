import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Recuperacao from './pages/Recuperacao'

const Stack = createStackNavigator();

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Recuperacao" component={Recuperacao}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
