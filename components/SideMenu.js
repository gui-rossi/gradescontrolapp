import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

import Picture from "../components/Picture";

function SideMenu(props) {

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={() => {
              props.setModalVisible(!props.modalVisible);
          }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View>
              <Picture
                uri = {'https://reactnative.dev/img/tiny_logo.png'}
              />
            </View>

            <View>
              <Text style={styles.olaFulano}>Olá, fulano</Text>
            </View>

            <View>
              <Text style={styles.minhaConta}>Minha conta</Text>
            </View>

            <View>

              <Text style={styles.options}>Meus Dados</Text>
              <View style={styles.separator}></View>

              <Text style={styles.options}>Gerenciar Notificações</Text>
              <View style={styles.separator}></View>

              <Text style={styles.options}>Alterar Senha</Text>
              <View style={styles.separator}></View>

              <Text style={styles.options}>Sair</Text>
              <View style={styles.separator}></View>

            </View>

            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

          </View>
        </View>

        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  options: {
    fontSize: 18,
    color: "#808080",
  },
  separator: {
    borderTopWidth: 3,
    borderColor: "#DCDCDC", 
    borderStyle: 'solid',
  },
  minhaConta: {
    color: "#111D5E",
    fontSize: 20,
  },
  olaFulano: {
    color: "#111D5E",
    fontWeight: "bold",
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    marginTop: "5%",
    alignItems: "flex-start"
  },
  modalView: {
    marginBottom: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "75%",
    height: "95%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 8,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#111D5E",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center"
  }
});

export default SideMenu;