import React from 'react';
import API from './api'

const deleteAula = {

    deleteAula: async (id_aula) => {
        const url = `https://prod-05.brazilsouth.logic.azure.com/workflows/699f8eaba6324352984fe86ef49bdded/triggers/manual/paths/invoke/${id_aula}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7RC7WuRr8l-be6CheS4ND0MUtphMq7y6PAMjH2VtWuc`;
        return API (url, {
            method: 'DELETE'
        });
    }
}

export default deleteAula;