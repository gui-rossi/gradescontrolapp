import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import { NavigationAction, useNavigationState } from "@react-navigation/native"
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

import getHomeScreenInfo from "../services/getHomeScreenInfo"
import createTurma from "../services/createTurma"

import { showScheduledNotificationWithoutSound, showScheduledNotificationWithSound, cancelAllNotifications, showNotification } from './../notifications'

import MenuButton from "../components/MenuButton";
import SideMenu from "../components/SideMenu";
import TurmaCard from "../components/TurmaCard";
import BlueButton from "../components/BlueButton";

function HomeProfessor({props, route, navigation}) {

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
      navigation.navigate('ModifyPassword', {mail: infos[0].mail, password: infos[0].password});
    }

    async function goToCriarTurma () {
      await createTurma.postTurmaNova(mail)
        .then((v) => {
          getInfos();
          showModal();
        })
        .catch((e) => {
          throw e;
        })
    }

    function goToMeusDados () {
      showModal();
      navigation.navigate('MeusDados', {name: infos[0].nome_prof, mail: infos[0].mail, celular: infos[0].cel});
    }

    function goToTurma () {
      navigation.navigate('Turma', {name: "Turma 1", aulas: ["Queda da bastilha", "Calculo 2"], status: [0, 1]});
    }

    async function getInfos () {
      await getHomeScreenInfo.getScreenInfoProf(mail)
        .then((v) => {
          setInfos(v.data)
        })
        .catch((e) => {
          throw e;
        })
    } 

    useEffect(() => {
      getInfos()
    }, [])

    // useEffect(() => {
    //   PushNotification.deleteChannel('canalteste1');
    //   PushNotification.createChannel({
    //       channelId: "canalteste1", // (required)
    //       channelName: "teste1", // (required)
    //       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    //       soundName: 'default',
    //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
    //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    //   },
    //   //(created) => console.warn(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    //   );
    // }, [])

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

        {/* <BlueButton
            text={"Send notification"}
            press={() => showNotification('canalteste1', 'title', 'message')}
            disabled={false}
        /> */}

        <SafeAreaView style={styles.scrollview}>
          <ScrollView>
            {
              infos.map((v, i) => {
                return(
                <TurmaCard
                  key={i}
                  onPress={goToTurma}
                  numTurma={i + 1}
                  idTurma={v.id_turma}
                  numAlunos={v.num_alunos}
                  numAulas={v.num_aulas}
              />)
              })
            }
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
            hello={infos[0] ? infos[0].nome_prof : ''}
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