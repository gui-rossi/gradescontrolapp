import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Recuperacao from './pages/Recuperacao'
import HomeProfessor from './pages/HomeProfessor'
import HomeAluno from './pages/HomeAluno'

const Stack = createStackNavigator();

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Recuperacao" component={Recuperacao} />
        <Stack.Screen name="HomeProfessor" component={HomeProfessor}/>
        <Stack.Screen name="HomeAluno" component={HomeAluno}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
