const fs = require('fs');
const { resolve } = require('path');
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

const pathDb = resolve(__dirname, '..','..','src','database') + '/test.sqlite';

describe('ONG', () => {
  beforeEach(async () => {  
    fs.unlinkSync(pathDb);
    await connection.migrate.latest(); 
  });

  afterAll(async () => {    
    await connection.destroy();
  });

  it('Should be able to create a new ONG', async () => {    
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD2",
        email: "contato@teste.com.br",
        whatsapp: "81900000000",
        city: "Jaboatão dos Guararapes",
        uf: "PE"	
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});