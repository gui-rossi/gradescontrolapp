import React from 'react';
import API from './api'

const getAulasTodas = {

    getAllAulas: async (mail_aluno) => {
        const url = `https://prod-09.brazilsouth.logic.azure.com/workflows/56d74cd6d37b48fc9e32afe52d9b5758/triggers/manual/paths/invoke/${mail_aluno}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TBQjiREbqikM5ytTIMMpoctv7CMUB3JKK9EKQ2eyw-E`;
        return API (url, {
            method: 'GET'
        });
    }
}

export default getAulasTodas;