import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import { NavigationAction, useNavigationState } from "@react-navigation/native"
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

import getHomeScreenInfo from "../services/getHomeScreenInfo"

import MenuButton from "../components/MenuButton";
import SideMenu from "../components/SideMenu";
import TurmaCard from "../components/TurmaCard";

function HomeAluno({props, route, navigation}) {

    const { mail } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");

    const [menu, setMenu] = useState(false);
    const [infos, setInfos] = useState([]);

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

    function goToGerenciarNotificacoes () {
      showModal();
      navigation.navigate('GerenciarNotificacoes', {somBefore: true, notificacaoBefore: true});
    }

    function goToMeusDados () {
      showModal();
      navigation.navigate('MeusDados', {name: "Guilherme Rossi", mail: "guizo.rossi@gmail.com", celular: "(11)11223344"});
    }

    function goToTurmaViewAluno () {
      navigation.navigate('TurmaAluno', {name: "Turma 1", aulas: ["Queda da bastilha", "Calculo 2"], andamento: [1, 1], status: [0, 1]});
    }

    async function getInfos () {
      await getHomeScreenInfo.getScreenInfoAluno(mail)
        .catch((e) => {
          throw e;
        })
        .then((v) => {
          setInfos(v.data)
        });
    } 

    useEffect(() => {
      getInfos()
    }, [])

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
              onPress={goToTurmaViewAluno}
              numTurma={1}
              numAlunos={105}
              numAulas={25}
              nomeProf={"Natalia"}
            />
            <TurmaCard
              onPress={goToTurmaViewAluno}
              numTurma={2}
              numAlunos={69}
              numAulas={11}
              nomeProf={"Jakubiak"}
            />
          </ScrollView>
        </SafeAreaView>

        <View style={modalVisible ? styles.pageWithMenu : styles.page}>
          <SideMenu
            meusDados={goToMeusDados}
            gerenciarNotificacoes={goToGerenciarNotificacoes}
            isItGerenciarNotificacoes={true}
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

export default HomeAluno;