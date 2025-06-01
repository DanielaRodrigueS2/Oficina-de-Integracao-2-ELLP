const request = require('supertest')
const app = require('../app')

describe('Testes da voluntarios geral', () => {
  let idCriado;

  it('tenta criar voluntario', async () => {
    const novoVoluntario = {
      nome: "Daisy Abacaxi",
      RA: "111222",
      CPF: "000.000.000-00",
      curso: "Engenharia de Software",
      telefone: "(37) 88002-8922",
      departamento: "Aprendizagem",
      email: "daisy@gmailc.com",
      funcao: "Monitora",
      situacao: "Ativo"
    };

    const resposta = await request(app)
      .post('/voluntarios')
      .send(novoVoluntario);

    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id');
    expect(resposta.body.nome).toBe(novoVoluntario.nome);
    idCriado = resposta.body.id;
  });

  it('tenta retornar o voluntário criado pelo ID', async () => {
    const resposta = await request(app).get(`/voluntarios/${idCriado}`);
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveProperty('id');
    expect(resposta.body.id).toBe(idCriado);
  });

  it('tenta retornar tdos voluntários (array)', async () => {
    const resposta = await request(app).get('/voluntarios');
    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  it('tenta deletar o voluntário criado', async () => {
    const resposta = await request(app).delete(`/voluntarios/${idCriado}`);
    expect(resposta.status).toBe(204);
  });

  it('tenta retornar 404 para voluntário deletado', async () => {
    const resposta = await request(app).get(`/voluntarios/${idCriado}`);
    expect(resposta.status).toBe(404);
  });
});