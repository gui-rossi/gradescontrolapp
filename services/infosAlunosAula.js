import React from 'react';
import API from './api'

const infosAlunosAula = {

    getStatusPresencaAlunos: async (id_aula) => {
        const url = `https://prod-29.brazilsouth.logic.azure.com/workflows/40f083c8a1b74cd290608160e52b4d8b/triggers/manual/paths/invoke/${id_aula}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-yg7UDDiP7XDQvuLDaSNb7R_wMzFu9zDubhWRbzA76g`;
        return API (url, {
            method: 'GET'
        });
    }
}

export default infosAlunosAula;