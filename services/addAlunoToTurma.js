import React from 'react';
import API from './api'

const addAlunoToTurma = {

    postNewAluno: async (id_turma, mail) => {
        const url = `https://prod-21.brazilsouth.logic.azure.com:443/workflows/c9df3b8dc313432caa40d055573e024c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BJgQJGvgZZ-M_dDd-3347iyrChkBmedRMYo3aymi2pk`;
        
        return API (url, {
            method: 'POST',
            data: {
                "id_turma": id_turma,
                "mail": mail
            }
        });
    }
}

export default addAlunoToTurma;