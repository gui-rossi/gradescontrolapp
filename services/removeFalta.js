import React from 'react';
import API from './api'

const removeFalta = {

    postRemocaoFalta: async (id_aula, mail_aluno) => {
        const url = `https://prod-30.brazilsouth.logic.azure.com/workflows/a1de3ee77d854b9a9c944d6356edccba/triggers/manual/paths/invoke/${id_aula}/${mail_aluno}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AHS5Ksuy9lXiEouBdqM92qXg0eHmjY6F4Ei4vnIffKg`;
        return API (url, {
            method: 'PUT'
        });
    }
}

export default removeFalta;