import React from 'react';
import API from './api'

const addAlunoToTurma = {

    postNewAluno: async (id_turma, mail, tema, data, hora) => {
        const url = ``;
        
        return API (url, {
            method: 'POST',
            data: {
                "id_turma": id_turma,
                "mail": mail,
                "tema": tema,
                "dia": data,
                "hora": hora
            }
        });
    }
}

export default addAlunoToTurma;