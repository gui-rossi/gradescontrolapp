import React from 'react';
import API from './api'

const getAulas = {

    getAulasProf: async (id, mail) => {
        const url = `https://prod-05.brazilsouth.logic.azure.com/workflows/f716df5c411e4288985194b60a6fb62d/triggers/manual/paths/invoke/${id}/${mail}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2n61hi-NKEi8WE1nFIEyFuIOFIFBm_CGDfaWBcg_J1g`;
        return API (url, {
            method: 'GET'
        });
    },
    getAulasAluno: async (id, mail) => {
        const url = `https://prod-05.brazilsouth.logic.azure.com/workflows/f716df5c411e4288985194b60a6fb62d/triggers/manual/paths/invoke/${id}/${mail}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2n61hi-NKEi8WE1nFIEyFuIOFIFBm_CGDfaWBcg_J1g`;
        
        return API (url, {
            method: 'GET'
        });
    },
}

export default getAulas;