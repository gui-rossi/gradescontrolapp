import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import BlueButton from "../components/BlueButton";
import InputField from '../components/InputField';
import GenericModal from '../components/GenericModal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import recoverPassword from "../services/recoverPassword"

import { Formik } from 'formik'
import * as yup from 'yup'
import { TouchableOpacity } from 'react-native-gesture-handler';
import GoBack from '../components/GoBack';

function AdicionarAluno({ props, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("Aluno inexistente.");

    async function inserirAlunoNaTurma (values){
        // await recoverPassword.getPassword(values.email)
        //     .catch(e => {
        //         setMessage("Aluno inexistente."); 
        //         setModalVisible(!modalVisible);
        //     })
        //     .then((v) => {
        //         setMessage("Aluno adicionado a turma.");
        //         setModalVisible(!modalVisible);
        //     });
    };

    useEffect(() => {
        if (modalVisible == false && message == "Aluno adicionado a turma."){
            navigation.goBack();
        }
    }, [modalVisible])

    return (
        <>
        <GoBack 
            name={"Adicionar aluno"}
            navigation={navigation}
        />

        <View style={styles.page}>
            <Formik
                validationSchema={recoverSenhaValidation}
                initialValues={{ email: '' }}
                onSubmit={values => inserirAlunoNaTurma(values)}
            >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                dirty,
                touched
            }) => (
                <>
                <Text>
                    Digite o email do aluno a ser adicionado na turma:
                </Text>

                <TextInput
                    style={styles.input}
                    underlineColorAndroid={"black"}
                    name="email"
                    placeholder="usuario@email.br"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
                {(errors.email && touched.email) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                }

                <View style={styles.botao}>
                    <BlueButton
                        text={"Inserir aluno na turma"}
                        press={handleSubmit}
                        disabled={!(isValid && dirty)}
                    />
                </View>
                </>
            )}
            </Formik>

            <GenericModal 
                message={message}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />
        </View>
        </>
    );
}

const recoverSenhaValidation = yup.object().shape({
    email: yup
        .string()
        .email("Por favor insira um email válido.")
        .required('Email é obrigatório.')
  })

const styles = StyleSheet.create({
    page: {
        margin: 24,
    },
    botao: {
        marginTop: 40,
    },
    cont: {
        marginTop: 24,
        width: "100%",
    },
    input: {
        margin: 7,
    },
    
});

export default AdicionarAluno;