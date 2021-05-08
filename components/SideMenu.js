import { Button } from 'native-base';
import React, { useState, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Picture from "../components/Picture";
import TextLink from './TextLink';

function SideMenu(props) {

  return (

    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
            props.setModalVisible(!props.modalVisible);
        }}
      >

      <View style={styles.modalView}>

        <View style={ { alignItems: 'center'} }>
          <Picture
            uri = {'https://reactnative.dev/img/tiny_logo.png'}
          />

          <View style={styles.textoFoto}>
            <TextLink
              text={"Trocar de foto"}
              //function={}
            />
          </View>
        </View>

        <Text style={styles.olaFulano}>Olá, {props.hello}</Text>

        <View>
          <Text style={styles.minhaConta}>Minha conta</Text>

          <TouchableOpacity onPress={() => props.meusDados()}>
            <View style={styles.line}>
              <Text style={styles.options}>Meus Dados</Text>
              <Text style={{fontSize: 15, color: "#808080"}}>❯</Text>
              {/* <Icon name="chevron-right" size={15} color="#808080"/> */}
            </View>
          </TouchableOpacity>

          <View style={styles.separator}></View>

          {
            props.isItGerenciarNotificacoes &&
            <TouchableOpacity onPress={() => props.gerenciarNotificacoes()}>
              <View style={styles.line}>
                <Text style={styles.options}>Gerenciar Notificações</Text>
                <Text style={{fontSize: 15, color: "#808080"}}>❯</Text>
                {/* <Icon name="chevron-right" size={15} color="#808080"/> */}
              </View>
            </TouchableOpacity>
          }

          {
            props.isItCriarTurma &&
            <TouchableOpacity onPress={() => props.criarTurma()}>
              <View style={styles.line}>
                <Text style={styles.options}>Criar Turma</Text>
                <Text style={{fontSize: 15, color: "#808080"}}>❯</Text>
                {/* <Icon name="chevron-right" size={15} color="#808080"/> */}
              </View>
            </TouchableOpacity>
          }

          <View style={styles.separator}></View>

          <TouchableOpacity onPress={() => props.alterarSenha()}>
              <View style={styles.line}>
                <Text style={styles.options}>Alterar Senha</Text>
                <Text style={{fontSize: 15, color: "#808080"}}>❯</Text>
                {/* <Icon name="chevron-right" size={15} color="#808080"/> */}
              </View>
          </TouchableOpacity>

          <View style={styles.separator}></View>

            <TouchableOpacity onPress={() => props.sair()}>
              <View style={styles.line}>
                  <Text style={styles.options}>Sair</Text>
              </View>
            </TouchableOpacity>
          
          <View style={styles.separator}></View>
        </View>

        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.setModalVisible(!props.modalVisible)}
        >
          <Text style={styles.textStyle}>Voltar</Text>
        </Pressable>

      </View>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textoFoto: {
    marginTop: 10,
  },
  line: {
    marginTop: 24,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },  
  options: {
    flexDirection: 'column',
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
    marginTop: "0%",
    alignItems: "flex-start"
  },
  modalView: {
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: "white",
    width: "100%",
    height: "100%",
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
  buttonClose: {
    backgroundColor: "#111D5E",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default SideMenu;