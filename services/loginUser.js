import React from 'react';
import API from './api'

const loginUser = {

    loginAlunoOrProf: async (mail, senha) => {
        const url = `https://prod-04.brazilsouth.logic.azure.com:443/workflows/11dae665c2384bb58c42eec68b17f829/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=y8JrqOB_KtoGH1PTCEmdKAGWrO_9-14N3YzUsApBdmM`;

        return API (url, {
            method: 'POST',
            data: {
                "mail": mail,
                "password": senha
            }
        });
    },
}

export default loginUser;