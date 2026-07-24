import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 },  // Ramp-up : montée à 20 VUs
    { duration: '30s', target: 100 }, // Charge forte : 100 VUs
    { duration: '10s', target: 0 },   // Redescente progressive
  ],
};

const BASE_URL = 'http://localhost:8000';

export default function () {
  // 1. Consultation du classement
  const resLeaderboard = http.get(`${BASE_URL}/leaderboard`);
  check(resLeaderboard, {
    'leaderboard status 200': (r) => r.status === 200,
  });

  // 2. Soumission d'un score
  const payload = JSON.stringify({
    player: `player_${__VU}`,
    score: Math.floor(Math.random() * 500) + 1,
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const resScore = http.post(`${BASE_URL}/scores`, payload, params);
  check(resScore, {
    'submit score ok': (r) => r.status === 200 || r.status === 400,
  });

  sleep(0.1);
}