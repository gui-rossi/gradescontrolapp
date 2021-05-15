import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import BlueButton from "../components/BlueButton";
import InputField from '../components/InputField';
import GoBack from '../components/GoBack';

import { Formik } from 'formik'
import * as yup from 'yup'

import cadastroService from "../services/cadastroService"
import GenericModal from '../components/GenericModal';

function Cadastro({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (modalVisible == false && message == "Usuário cadastrado com sucesso."){
            navigation.navigate('Login')
        }
    }, [modalVisible])

    async function cadastrarProfessor (values){
        await cadastroService.postCadastroProfessor(values.email, values.nome, values.celular, values.password)
            .then(() => {
                setMessage("Usuário cadastrado com sucesso."); 
                setModalVisible(!modalVisible);
            })
            .catch(e => {
                setMessage("Usuário já cadastrado."); 
                setModalVisible(!modalVisible);
            })
    }

    async function cadastrarAluno (values){
        await cadastroService.postCadastroAluno(values.email, values.nome, values.celular, values.password)
            .then(() => navigation.navigate('Login'))
            .catch(e => {setModalVisible(!modalVisible); throw e})
    }

    function onClickCadastrar (values) {
        if (values.email.split('@').pop().includes('utfpr'))
            cadastrarAluno(values);
        else if (values.email.split('@').pop().includes('gmail'))
            cadastrarProfessor(values);
    }

    return (
        <>
        <GoBack
            name={"Cadastro"}
            navigation={navigation}
        />
        <View style={styles.page}>
            <SafeAreaView>
                <ScrollView>
                    <Text>
                        Insira seus dados:
                    </Text>

                    <Formik
                        validationSchema={cadastroValidation}
                        initialValues={{ nome: '', email: '', celular: '', password: '', passwordConfirmation: '' }}
                        onSubmit={values => onClickCadastrar(values)}
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
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid={"black"}
                                name="nome"
                                placeholder="Nome*"
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}
                                value={values.nome}
                            />
                            {(errors.nome && touched.nome) &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.nome}</Text>
                            }

                            <TextInput
                                style={styles.input}
                                underlineColorAndroid={"black"}
                                name="email"
                                placeholder="Email Address*"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {(errors.email && touched.email) &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                            }
                            
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid={"black"}
                                name="celular"
                                placeholder="Celular"
                                onChangeText={handleChange('celular')}
                                onBlur={handleBlur('celular')}
                                value={values.celular}
                            />
                            {(errors.celular && touched.celular) &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.celular}</Text>
                            }

                            <TextInput
                                style={styles.input}
                                underlineColorAndroid={"black"}
                                name="password"
                                placeholder="Senha*"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                            />
                            {(errors.password && touched.password) &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }

                            <TextInput
                                style={styles.input}
                                underlineColorAndroid={"black"}
                                name="passwordConfirmation"
                                placeholder="Confirmação de senha*"
                                onChangeText={handleChange('passwordConfirmation')}
                                onBlur={handleBlur('passwordConfirmation')}
                                value={values.passwordConfirmation}
                                secureTextEntry
                            />
                            {(errors.passwordConfirmation && touched.passwordConfirmation) &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.passwordConfirmation}</Text>
                            }

                            <View style={styles.botao}>
                                <BlueButton
                                    text={"Cadastrar"}
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

                </ScrollView>
            </SafeAreaView>
        </View>
        </>
    );
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const cadastroValidation = yup.object().shape({
    nome: yup
        .string()
        .required('Nome é obrigatório.'),
    celular: yup
        .string().matches(phoneRegExp, 'Número de telefone inválido.'),
    email: yup
        .string()
        .email("Por favor insira um email válido.")
        .required('Email é obrigatório.'),
    password: yup
        .string()
        .min(8, ({ min }) => `Senhas precisam ter pelo menos ${min} caracteres.`)
        .required('Senha é obrigatório.'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Senhas precisam ser iguais.')
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

export default Cadastro;