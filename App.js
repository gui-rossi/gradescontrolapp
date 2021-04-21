import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Recuperacao from './pages/Recuperacao'
import HomeProfessor from './pages/HomeProfessor'
import HomeAluno from './pages/HomeAluno'

import MeusDados from './pages/MeusDados'
import ModifyPassword from './pages/ModifyPassword'
import Turma from './pages/Turma'
import Aula from './pages/Aula'
import AdicionarAluno from './pages/AdicionarAluno'
import AdicionarAula from './pages/AdicionarAula'
import GerenciarNotificacoes from './pages/GerenciarNotificacoes'
import TurmaAluno from './pages/TurmaAluno'

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
        <Stack.Screen name="GerenciarNotificacoes" component={GerenciarNotificacoes}/>
        <Stack.Screen name="Turma" component={Turma}/>
        <Stack.Screen name="TurmaAluno" component={TurmaAluno}/>
        <Stack.Screen name="Aula" component={Aula}/>
        <Stack.Screen name="AdicionarAluno" component={AdicionarAluno}/>
        <Stack.Screen name="AdicionarAula" component={AdicionarAula}/>
        <Stack.Screen name="ModifyPassword" component={ModifyPassword}/>


      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
