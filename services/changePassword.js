import React from 'react';
import API from './api'

const changePassword = {

    postNewPassword: async (mail, password, novaSenha) => {
        const url = `https://prod-18.brazilsouth.logic.azure.com:443/workflows/d0dfd3eb8c844e08a8c4352bf0e7d2b6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NbPP-MCW6n7WI4kKEg4LUE_QN7GE7BrDiM6ohrhmTVY`;

        return API (url, {
            method: 'POST',
            data: {
                "mail": mail,
                "password": password,
                "newPassword": novaSenha
            }
        });
    },
}

export default changePassword;