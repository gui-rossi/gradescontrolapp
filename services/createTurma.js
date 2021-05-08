import React from 'react';
import API from './api'

const createTurma = {

    postTurmaNova: async (mail) => {
        const url = `https://prod-23.brazilsouth.logic.azure.com:443/workflows/4e41cb4675a24ae3932fc8b230eb3c8e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SFgDBaAfUUBmpaHQzM9rqj6-QbKACkVJm5Z1KE0wEQI`;
        
        return API (url, {
            method: 'POST',
            data: {
                "mail": mail
            }
        });
    }
}

export default createTurma;