import React from 'react';
import API from './api'

const postNotificacoes = {

    putNotificacao: async (som, notificacao, mail) => {
        const url = `https://prod-06.brazilsouth.logic.azure.com:443/workflows/ea5fd51ed05744c486dab80408228c8c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=A7RoFdD4xLG11Mfox_40xwiYkXmfUcqhSYuK9QBaOUE`;
        return API (url, {
            method: 'PUT',
            data: {
                "som": som,
                "notificacao": notificacao,
                "mail": mail
            }
        });
    }
}

export default postNotificacoes;