import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
  iterations:1
};

export default function () {
  const url = pegarBaseURL() + '/transferencias';
  const token = obterToken();
  
  const payload = JSON.stringify({
      contaOrigem: 1,
      contaDestino: 2,
      valor: 11,
      token: ""
    });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + token
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    'is status 201': (r) => r.status === 201,
  });

  sleep(1);
}
