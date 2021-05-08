import React from 'react';
import API from './api'

const homeScreenService = {

    getScreenInfoProf: async (mail) => {
        const url = `https://prod-14.brazilsouth.logic.azure.com/workflows/a16c11b7a9e04d0780136a017bea9af1/triggers/manual/paths/invoke/${mail}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9_BjAmsmTPUwOlbH9PyDukS-eewXvXqr0DG1TKSOybA`;
        return API (url, {
            method: 'GET'
        });
    },
    getScreenInfoAluno: async (mail) => {
        const url = `https://prod-14.brazilsouth.logic.azure.com/workflows/a16c11b7a9e04d0780136a017bea9af1/triggers/manual/paths/invoke/${mail}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9_BjAmsmTPUwOlbH9PyDukS-eewXvXqr0DG1TKSOybA`;
        
        return API (url, {
            method: 'GET'
        });
    },
}

export default homeScreenService;