import http from 'k6/http';
import { sleep, check } from 'k6';
const post_login = JSON.parse(open('../fixtures/post_login.json'));


export const options = {
  stages: [
    {duration: '5s' ,target: 10},
    {duration: '20s' ,target: 10},
    {duration: 's' ,target: 0},
  ],
  //iterations: 1,
  thresholds: {
    http_req_duration: ['p(95)<=3000', 'max<5000'],
    http_req_failed: ['rate<0.1']
  },
};

export default function () {
  
    const url = 'http://localhost:3000/login';
  
    const payload = JSON.stringify(post_login);

    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);
      check(res, {
        'is status 200': (r) => r.status === 200,
        'Validar que o Token é string': (r) => typeof(r.json().token) === 'string',
    });

    sleep(1);
}