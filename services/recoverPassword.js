import React from 'react';
import API from './api'

const recoverPassword = {

    getPassword: async (mail) => {
        const url = `https://prod-29.brazilsouth.logic.azure.com/workflows/a4501c3d49594553bbc2507e28753f02/triggers/manual/paths/invoke/${mail}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sXcZOxXYb_1VS_g5Pds1uRib8HDuFwBX7V40AlNIZHc`;

        return API (url, {
            method: 'GET'
        });
    },
}

export default recoverPassword;