import React from 'react';
import API from './api'

const createAula = {

    postAulaNova: async (id_turma, mail, tema, data, hora) => {
        const url = `https://prod-18.brazilsouth.logic.azure.com:443/workflows/2237cddb916249d3864cec89fdeb2440/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=v8ohBJuztJwsXDg3EmMRO1OmwLk7_VEtWB7N6OSvThI`;
        
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

export default createAula;