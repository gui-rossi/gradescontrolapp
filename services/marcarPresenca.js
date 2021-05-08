import React from 'react';
import API from './api'

const marcarPresenca = {

    postMarcarPresenca: async (id_aula, mail_aluno) => {
        const url = ``;
        return API (url, {
            method: 'PUT'
        });
    }
}

export default marcarPresenca;