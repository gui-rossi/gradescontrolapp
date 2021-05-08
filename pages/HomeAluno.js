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
      navigation.navigate('GerenciarNotificacoes', {somBefore: infos[0].SomNotificacao, notificacaoBefore: infos[0].NotificacaoAviso});
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
          setFoto(v.data[0].picture_url)
        })
        .catch((e) => {
          throw e;
        })
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
            
            {
              infos.map((v, i) => {
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