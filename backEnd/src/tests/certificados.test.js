const request = require('supertest');
const app = require('../app');

describe('Testes da API de Certificados', () => {
  let idVoluntario;
  let idCertificado;

  // Criar um voluntario antes de realizar os testes pq é necessário existir um voluntário para que exista um certificado
  beforeAll(async () => {
    const novoVoluntario = {
      nome: "Daniela Rodrigues",
      RA: "2454297",
      CPF: "123.456.123-12",
      curso: "Software",
      telefone: "(37) 8922-4002",
      departamento: "Gestão de Pessoas",
      email: "dani@teste.com",
      funcao: "Professora de Game Dev",
      situacao: "Desligada"
    };

    const res = await request(app).post('/voluntarios').send(novoVoluntario);
    idVoluntario = res.body.id;
  });

  it('tenta criar um certificado para a voluntaria dani', async () => {
    const novoCertificado = {
      oficina: "Oficina de Lógica de Programação",
      cargaHoraria: 10,
      inicio: "2024-12-10",
      fim: "2024-12-12",
      dataEmissao: "2024-12-20"
    };

    const res = await request(app)
      .post(`/voluntarios/${idVoluntario}/certificados`)
      .send(novoCertificado);

    expect(res.status).toBe(200);

    const lista = await request(app)
      .get(`/voluntarios/${idVoluntario}/certificados`);

    expect(res.headers['content-type']).toBe('application/pdf');
    expect(res.body).toBeInstanceOf(Buffer);
    expect(res.body.length).toBeGreaterThan(0);

    idCertificado = lista.body[lista.body.length - 1].id;

  });

  it('tenta buscar o certificado pelo ID', async () => {
    const res = await request(app)
      .get(`/certificados/${idVoluntario}/${idCertificado}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(idCertificado);
  });

  it('tenta listar os certificados da voluntariqa exixte', async () => {
    const res = await request(app)
      .get(`/voluntarios/${idVoluntario}/certificados`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('tenta excluir o certificado', async () => {
    const res = await request(app)
      .delete(`/certificados/${idVoluntario}/${idCertificado}`);

    expect(res.status).toBe(204);
  });

  // Apaga a voluntária no final para evitar problemas (talvez o certificado não apague junto por problemas que ainda vão ser resolvidos)
  afterAll(async () => {
    await request(app).delete(`/voluntarios/${idVoluntario}`);
  });
});