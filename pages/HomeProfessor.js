import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import { NavigationAction, useNavigationState } from "@react-navigation/native"
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

import MenuButton from "../components/MenuButton";
import SideMenu from "../components/SideMenu";
import TurmaCard from "../components/TurmaCard";

function HomeProfessor({props, navigation}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");

    const [menu, setMenu] = useState(false);

    function showModal () {
      setModalVisible(!modalVisible);
    }

    function goToLogin () {
      showModal();
      navigation.navigate('Login');
    }

    function goToModifyPassword () {
      showModal();
      navigation.navigate('ModifyPassword');
    }

    function goToCriarTurma () {
      //manda registro pra tabela
      showModal();
    }

    function goToMeusDados () {
      showModal();
      navigation.navigate('MeusDados', {name: "Guilherme Rossi", mail: "guilherme.rossi@exxonmobil.com", celular: "(16)997536554"});
    }

    function goToTurma () {
      navigation.navigate('Turma', {name: "Turma 1", aulas: ["Queda da bastilha", "Calculo 2"], status: [0, 1]});
    }

    useEffect(() => {
      const backAction = () => {
        if (navigation.isFocused())
        {
          Alert.alert("Espere!", "Você quer mesmo voltar para tela de início?", [
            {
              text: "Cancelar",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Sim", onPress: () => navigation.goBack() }
          ]);
          return true;

        }
      };
      const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
      );
  
    }, []);
    
    return (
        <>
        <View style={styles.navbar}>
            <MenuButton
              press={showModal}
            />
        </View>

        <SafeAreaView style={styles.scrollview}>
          <ScrollView>
            <TurmaCard
              onPress={goToTurma}
              numTurma={1}
              numAlunos={105}
              numAulas={25}
            />
            <TurmaCard 
              onPress={goToTurma}
              numTurma={2}
              numAlunos={69}
              numAulas={11}
            />
          </ScrollView>
        </SafeAreaView>

        <View style={modalVisible ? styles.pageWithMenu : styles.page}>
          <SideMenu
            meusDados={goToMeusDados}
            criarTurma={goToCriarTurma}
            isItCriarTurma={true}
            alterarSenha={goToModifyPassword}
            sair={goToLogin}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    scrollview: {
      margin: 12,
      height: '85%',
    },
    page: {
      width: "100%",
      height: "100%",
      backgroundColor: "#EEEEEE",
    },
    pageWithMenu: {
      width: "100%",
      height: "100%",
      backgroundColor: "#D3D3D3",
    },
    navbar: {
      backgroundColor: "#111D5E",
      padding: 24,
    },
});

export default HomeProfessor;