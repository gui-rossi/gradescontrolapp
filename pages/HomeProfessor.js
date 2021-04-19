import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import MenuButton from "../components/MenuButton";
import SideMenu from "../components/SideMenu";


function HomeProfessor({props, navigation}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");

    const [menu, setMenu] = useState(false);

    function showModal () {
      setModalVisible(!modalVisible);
    }

    useEffect(() => {
        const backAction = () => {
          Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();
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