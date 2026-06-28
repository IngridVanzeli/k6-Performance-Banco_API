import http from 'k6/http';
const post_login = JSON.parse(open('../fixtures/post_login.json'));
import { pegarBaseURL } from '../utils/variaveis.js';

export function obterToken() {

    const url = pegarBaseURL() + '/login';
    const payload = JSON.stringify(post_login);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    return res.json('token');
}