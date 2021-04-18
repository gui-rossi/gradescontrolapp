import React from 'react';
import API from './api'

const cadastroService = {

    postCadastroProfessor: async (mail, nome, celular, senha) => {
        const url = "https://prod-13.brazilsouth.logic.azure.com:443/workflows/af42a3174dc7484b8865718b48823027/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7GSsAgt7Z-mO3p2H6oI5QOBN8aV-_mApvp87DurtW8U";
        
        return API (url, {
            method: 'POST',
            data: {
                "mail": mail,
                "nome": nome,
                "cel": celular,
                "password": senha
            }
        });
    },
    postCadastroAluno: async (mail, nome, celular, senha) => {
        const url = "https://prod-13.brazilsouth.logic.azure.com:443/workflows/af42a3174dc7484b8865718b48823027/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7GSsAgt7Z-mO3p2H6oI5QOBN8aV-_mApvp87DurtW8U";
        
        return API (url, {
            method: 'POST',
            data: {
                "mail": mail,
                "nome": nome,
                "cel": celular,
                "password": senha
            }
        });
    },
}

export default cadastroService;