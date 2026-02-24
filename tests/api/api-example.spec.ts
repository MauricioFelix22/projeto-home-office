import { test, expect } from '@playwright/test';
import { apiEndpoints, testUsers } from '../support/fixtures/test-data';

/**
 * Testes de API
 */
test.describe('API Tests', () => {
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';

  test('@smoke Deve retornar status 200 para endpoint de health check', async ({ request }) => {
    const response = await request.get(`${baseURL}/health`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('status', 'ok');
  });

  test('Deve fazer login via API e retornar token', async ({ request }) => {
    const response = await request.post(`${baseURL}${apiEndpoints.login}`, {
      data: {
        email: testUsers.validUser.email,
        password: testUsers.validUser.password
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(body.token).toBeTruthy();
  });

  test('Deve retornar erro 401 para credenciais inválidas', async ({ request }) => {
    const response = await request.post(`${baseURL}${apiEndpoints.login}`, {
      data: {
        email: testUsers.invalidUser.email,
        password: testUsers.invalidUser.password
      }
    });

    expect(response.status()).toBe(401);
  });

  test('Deve validar schema da resposta de login', async ({ request }) => {
    const response = await request.post(`${baseURL}${apiEndpoints.login}`, {
      data: {
        email: testUsers.validUser.email,
        password: testUsers.validUser.password
      }
    });

    const body = await response.json();
    
    // Valida estrutura da resposta
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('user');
    expect(body.user).toHaveProperty('email');
    expect(body.user).toHaveProperty('name');
  });

  test('Deve listar usuários com autenticação', async ({ request }) => {
    // Primeiro faz login para obter token
    const loginResponse = await request.post(`${baseURL}${apiEndpoints.login}`, {
      data: {
        email: testUsers.validUser.email,
        password: testUsers.validUser.password
      }
    });

    const loginBody = await loginResponse.json();
    const token = loginBody.token;

    // Usa token para acessar endpoint protegido
    const usersResponse = await request.get(`${baseURL}${apiEndpoints.users}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    expect(usersResponse.status()).toBe(200);
    const users = await usersResponse.json();
    expect(Array.isArray(users)).toBeTruthy();
  });
});
