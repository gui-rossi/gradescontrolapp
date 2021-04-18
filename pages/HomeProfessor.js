import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import MenuButton from "../components/MenuButton";

function HomeProfessor({props, navigation}) {

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
        <View style={styles.navbar}>
            <MenuButton>

            </MenuButton>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#00BFFF",
        padding: 20,
        borderRadius: 4
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      fontSize: 18,
      fontWeight: "bold"
    }
});

export default HomeProfessor;