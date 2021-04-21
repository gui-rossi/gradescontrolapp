import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Recuperacao from './pages/Recuperacao'
import HomeProfessor from './pages/HomeProfessor'
import HomeAluno from './pages/HomeAluno'

import MeusDados from './pages/MeusDados'
// import GerenciarNotificacoes from './pages/GerenciarNotificacoes'
// import CriarTurma from './pages/CriarTurma'
import ModifyPassword from './pages/ModifyPassword'

const Stack = createStackNavigator();

function App () {
  return (
    <>
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
        <Stack.Screen name="HomeAluno" component={HomeAluno}/>
        <Stack.Screen name="HomeProfessor" component={HomeProfessor}/>
        <Stack.Screen name="MeusDados" component={MeusDados}/>
        {/* <Stack.Screen name="GerenciarNotificacoes" component={GerenciarNotificacoes}/>
        <Stack.Screen name="CriarTurma" component={CriarTurma}/> */}
        <Stack.Screen name="ModifyPassword" component={ModifyPassword}/>


      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
