import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import BlueButton from "../components/BlueButton";
import InputField from '../components/InputField';
import GenericModal from '../components/GenericModal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import createAula from "../services/createAula"

import { Formik } from 'formik'
import * as yup from 'yup'

import { TouchableOpacity } from 'react-native-gesture-handler';
import GoBack from '../components/GoBack';

function AdicionarAula({ props, route, navigation }) {

    const { id_turma, mail } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("Aluno inexistente.");

    async function inserirAulaNaTurma (values){
        await createAula.postAulaNova(id_turma, mail, values.tema, values.dia, values.hora)
            .then((v) => {
                setMessage("Aula adicionada a turma.");
                setModalVisible(!modalVisible);
            })
            .catch(e => {
                setMessage("Aconteceu um erro."); 
                setModalVisible(!modalVisible);
            })
    };

    useEffect(() => {
        if (modalVisible == false && message == "Aula adicionada a turma."){
            //arranjar um jeito de fazer reload das infos da pagina...
            navigation.goBack();
        }
    }, [modalVisible])

    return (
        <>
        <GoBack 
            name={"Adicionar aula"}
            navigation={navigation}
        />

        <View style={styles.page}>
            <Formik
                validationSchema={adicionarAulaValidation}
                initialValues={{ tema: '', dia: '', hora: '' }}
                onSubmit={values => inserirAulaNaTurma(values)}
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
                    Preencha o tema, dia e hora:
                </Text>

                <TextInput
                    style={styles.input}
                    underlineColorAndroid={"black"}
                    name="tema"
                    placeholder="Algoritmos Gulosos*"
                    onChangeText={handleChange('tema')}
                    onBlur={handleBlur('tema')}
                    value={values.tema}
                />
                {(errors.tema && touched.tema) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.tema}</Text>
                }

                <TextInput
                    style={styles.input}
                    underlineColorAndroid={"black"}
                    name="dia"
                    placeholder="25/10/21*"
                    onChangeText={handleChange('dia')}
                    onBlur={handleBlur('dia')}
                    value={values.dia}
                />
                {(errors.dia && touched.dia) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.dia}</Text>
                }

                <TextInput
                    style={styles.input}
                    underlineColorAndroid={"black"}
                    name="hora"
                    placeholder="19:35*"
                    onChangeText={handleChange('hora')}
                    onBlur={handleBlur('hora')}
                    value={values.hora}
                />
                {(errors.hora && touched.hora) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.hora}</Text>
                }

                <View style={styles.botao}>
                    <BlueButton
                        text={"Inserir aula na turma"}
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

const hourReg = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const diaReg = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const adicionarAulaValidation = yup.object().shape({
    tema: yup
        .string()
        .required('Tema é obrigatório.'),
    dia: yup
        .string()
        .matches(diaReg, 'Data inválida.')
        .required('Dia é obrigatório.'),
    hora: yup
        .string()
        .matches(hourReg, 'Hora inválida.')
        .required('Hora é obrigatório.'),
});

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

export default AdicionarAula;