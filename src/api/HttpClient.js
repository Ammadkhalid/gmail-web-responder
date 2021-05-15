import axios from "axios";

const HttpClient = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Intercept request and attach mail account id
 */
HttpClient.interceptors.request.use(
    config => {
        const mail_id = localStorage.getItem('user.id') || null;

        if (mail_id) {
            config.headers['X-Mail-Id'] = mail_id;
            config.headers['Access-Control-Allow-Origin'] = '*';
        }

        return config;
    },

    error => Promise.reject(error),
);

export default HttpClient;
