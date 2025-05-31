const db = require('../firebase/firestore')

module.exports = {

    async criarVoluntario(req, res){
        try{
            const [nome, RA, CPF, curso, telefone, departamento, email, funcao, situacao] = req.body;

            const novoVoluntario = {
                nome,
                RA,
                CPF,
                curso,
                telefone,
                departamento,
                email,
                funcao,
                situacao,
                criacao : new Date()
            }

            const documento = await db.collection('voluntarios').add(novoVoluntario);
            return res.status(201).json({id: documento.id, ...novoVoluntario});

        }
        catch(erro){
            return res.status(500).json({error : 'Erro ao criaqr voluntario ', msg: erro});
        }
    },

    async getAllVoluntarios(req,res){
        try{
            const snapshot = await db.collection('voluntarios').get();
            const voluntarios = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
            return res.json(voluntarios);
        }
        catch (erro){
            return res.status(500).json({error : 'Erro ao retornar todos os voluntarios ;p', msg: erro})
        }
    },

    async getVoluntario(req,res){

    },

    async deletaVoluntario(req,res){

    },

};