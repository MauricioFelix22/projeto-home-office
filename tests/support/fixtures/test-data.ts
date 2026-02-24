/**
 * Dados de teste reutilizáveis
 */

export const testUsers = {
  validUser: {
    email: 'usuario@teste.com',
    password: 'senha123',
    name: 'Usuário Teste'
  },
  invalidUser: {
    email: 'invalido@teste.com',
    password: 'senhaerrada'
  },
  adminUser: {
    email: 'admin@teste.com',
    password: 'admin123',
    name: 'Administrador'
  }
};

export const testProducts = {
  validProduct: {
    name: 'Produto Teste',
    price: '99.99',
    description: 'Descrição do produto teste'
  }
};

export const apiEndpoints = {
  login: '/api/login',
  users: '/api/users',
  products: '/api/products'
};
