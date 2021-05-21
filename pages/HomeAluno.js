import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import { NavigationAction, useIsFocused, useNavigationState } from "@react-navigation/native"
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

import getHomeScreenInfo from "../services/getHomeScreenInfo"
import { showScheduledNotificationWithoutSound, showScheduledNotificationWithSound, cancelAllNotifications, showNotification } from './../notifications'

import MenuButton from "../components/MenuButton";
import SideMenu from "../components/SideMenu";
import TurmaCard from "../components/TurmaCard";
import PushNotification from "react-native-push-notification";
import getAulasTodas from "../services/getAulasTodas"

function HomeAluno({props, route, navigation}) {

    const isFocused = useIsFocused()

    const { mail } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [foto, setFoto] = useState (null);

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
      navigation.navigate('ModifyPassword', {mail: infos[0].mail_aluno});
    }

    function goToGerenciarNotificacoes () {
      showModal();
      navigation.navigate('GerenciarNotificacoes', {somBefore: infos[0].SomNotificacao, notificacaoBefore: infos[0].NotificacaoAviso, mail_aluno: infos[0].mail_aluno});
    }

    function goToMeusDados () {
      showModal();
      navigation.navigate('MeusDados', {name: infos[0].nome_aluno, mail: infos[0].mail_aluno, celular: infos[0].cel});
    }

    function goToTurmaViewAluno (id_turma, mail_aluno, i) {
      navigation.navigate('TurmaAluno', {id_turma: id_turma, mail_aluno: mail_aluno, index: i});
    }

    async function getInfos () {
      await getHomeScreenInfo.getScreenInfoAluno(mail)
        .then((v) => {
          setInfos(v.data)
          
          if (v.data[0].picture_url)
            setFoto(v.data[0].picture_url)
        })
        .catch((e) => {
          throw e;
        })
    } 

    function calculaSegundos(data, hora){
      let dataAula = new Date (data.split('/')[2] + "-" + data.split('/')[1] + "-" + data.split('/')[0] + "T" + hora.split(':')[0] + ":" + hora.split(':')[1]);
      let now = new Date();
      now = now.setHours(now.getHours() - 3);
      let nowAux = new Date(now);

      let secondsBetween = dataAula - nowAux;
      return (secondsBetween/1000) //milisegundos
    }

    function recreateAllNotifications(aulas, somNot, notification){
      cancelAllNotifications();
      
      if (notification && !somNot){ //selecionei so notificacao sem som
          for (let i = 0; i < aulas.length; i++){
              let segundos = calculaSegundos(aulas[i].data, aulas[i].hora);
              
              if (segundos > 0)
                  showScheduledNotificationWithoutSound(aulas[i].id_aula, 'notifications', 'Sua aula começou!', `Acompanhe a aula de ${aulas[i].tema}`, segundos)
          }
      }
      else if (notification && somNot){ //selecionei notificacao com som
          for (let i = 0; i < aulas.length; i++){
              let segundos = calculaSegundos(aulas[i].data, aulas[i].hora);
              
              if (segundos > 0)
                  showScheduledNotificationWithSound(aulas[i].id_aula, 'notifications', 'Sua aula começou!', `Acompanhe a aula de ${aulas[i].tema}`, segundos)
          }
      }
    }

    async function editNotifications(somNot, notification){
      await getAulasTodas.getAllAulas(mail)
      .then((v) => {
          recreateAllNotifications(v.data, somNot, notification)
      })
      .catch((e) => {
          throw e;
      })  
    }

    useEffect(() => {
        PushNotification.createChannel({
            channelId: "notifications", // (required)
            channelName: "Control Grades Notifications", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        });
    }, [])

    //CHAMADO QUANDO O USUARIO RETORNA A TELA 
    useEffect(() => {
      if (isFocused){
        getInfos();
      }
    }, [isFocused])

    useEffect(() => {
      if (infos[0]){
        editNotifications(infos[0].SomNotificacao, infos[0].NotificacaoAviso);
      }
    }, [infos])

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
            
            {
              infos.map((v, i) => {
                if (v.id_turma)
                  return(
                  <TurmaCard
                    key={i}
                    onPress={() => goToTurmaViewAluno(v.id_turma, v.mail_aluno, i+1)}
                    numTurma={i + 1}
                    numAlunos={v.num_alunos}
                    numAulas={v.num_aulas}
                    nomeProf={v.nome_prof}
                />)
              })
            }

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
            hello={infos[0] ? infos[0].nome_aluno : ''}
            mail={infos[0] ? infos[0].mail_aluno : ''}
            foto={foto ? foto : null}
            set_foto={setFoto}
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