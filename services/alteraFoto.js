import React from 'react';
import API from './api'

const alteraFoto = {

    postNewPicture: async (mail, picture) => {
        const url = `https://prod-01.brazilsouth.logic.azure.com/workflows/418c6480c19d463a9762554576d47016/triggers/manual/paths/invoke/${mail}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BfcOvTce6tOCkcReUhTC1ruhVYBa8qEP0tO2JYh96Rc`;
        return API (url, {
            method: 'PUT',
            data: {
                "picture": picture,
            }
        });
    }
}

export default alteraFoto;