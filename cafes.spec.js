const request = require('supertest');
const app = require('./index.js');

describe('Café API', () => {
  it('GET /cafes debería devolver un status code 200 y un arreglo de cafés', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(typeof response.body[0]).toBe('object');
    }
  });

  it('DELETE /cafes/:id debería devolver un código 404 si el id no existe', async () => {
    const nonExistentId = '1234567890abcdef'; 
    const response = await request(app).delete(`/cafes/${nonExistentId}`);
    expect(response.status).toBe(404); 
  });

  it('POST /cafes debería agregar un nuevo café y devolver un código 201', async () => {
    const newCafe = {
      cafe: 'Café de Prueba',
      preparacion: 'Método de Prueba',
    };
    const response = await request(app).post('/').send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Café creado correctamente');
    expect(response.body.cafe).toMatchObject(newCafe);
  });

  it('PUT /cafes/:id debería devolver un status code 400 si el id del payload no coincide con el id en los parámetros', async () => {
    const id = '1234567890abcdef';
    const invalidCafe = {
      id: 'differentId',
      cafe: 'Café de Prueba Modificado',
      preparacion: 'Método de Prueba Modificado',
    };
    const response = await request(app).put(`/${id}`).send(invalidCafe);
    expect(response.status).toBe(400);
  });
});
