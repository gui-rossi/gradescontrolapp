import React from 'react';
import API from './api'

const cadastroService = {
    
    postCadastroProfessor: async (mail, nome, celular, senha) => {
        const url = "https://prod-01.brazilsouth.logic.azure.com:443/workflows/5218e47d2f2a4ec6aedb59e85513c40b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vRhKhFPvjG4rJ1TB9BUVnFfLcK1yigXqD4PBD7_b_ig";

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
        const url = "https://prod-17.brazilsouth.logic.azure.com:443/workflows/4ef4a81427b74c60a5ffc5e5196a0219/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mtX6VsVHSJPWB49OUTWT7JXsk5QjlTG_oXJho9fdon4";

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