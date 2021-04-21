import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import MenuButton from "../components/MenuButton";
import SideMenu from "../components/SideMenu";
import { NavigationAction, useNavigationState } from "@react-navigation/native"

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
      showModal();
      navigation.navigate('CriarTurma');
    }

    function goToMeusDados () {
      showModal();
      navigation.navigate('MeusDados', {name: "Guilherme Rossi", mail: "guilherme.rossi@exxonmobil.com", celular: "(16)997536554"});
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
      backgroundColor: "#00BFFF",
      padding: 24,
    },
});

export default HomeProfessor;