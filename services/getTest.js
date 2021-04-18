import React from 'react';
import API from './api'

const getTest = {

    getAluno: async (mail) => {
        const url = `https://prod-16.brazilsouth.logic.azure.com/workflows/1d8e1958b2574666a0e896199a2bd79e/triggers/manual/paths/invoke/${mail}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RT2iQLBklFvy_yvMblz59L5UICesiQwB0YXaIJuuOlA`;

        return API (url, {
            method: 'GET'
        });
    },
    getProf: async (mail) => {
        const url = ""

        return API (url, {
            method: 'GET',
            data: {
                "mail": mail
            }
        });
    },

}

export default getTest;