const db = require('../firebase/firestore')

module.exports = {

    async criarVoluntario(req, res){
        try{
            const {nome, RA, CPF, curso, telefone, departamento, email, funcao, situacao} = req.body;

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
            return res.status(500).json({error : 'Erro ao criaqr voluntario ', msg: erro.message});
        }
    },

    async getAllVoluntarios(req,res){
        try{
            const snapshot = await db.collection('voluntarios').get();
            const voluntarios = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
            return res.json(voluntarios);
        }
        catch (erro){
            return res.status(500).json({error : 'Erro ao retornar todos os voluntarios ;p', msg: erro.message})
        }
    },

    async getVoluntario(req,res){
        try{
            const {idVoluntario} = req.params;

            const voluntario = await db
                .collection('voluntarios')
                .doc(idVoluntario)
                .get();

            if(!voluntario.exists){
                return res.status(404).json({error: 'Voluntaario nao exisste ou não foi encontrado'});
            }
            
            return res.json({id : voluntario.id, ...voluntario.data()})
        }
        catch(erro){
            return res.status(500).json({error : 'Erro ao buscar voluntario', msg: erro.message})
        }
    },

    async deletaVoluntario(req,res){
        try{
            const {idVoluntario} = req.params;

            await db
                .collection('voluntarios')
                .doc(idVoluntario)
                .delete()

            return res.status(204).send();
        }
        catch(erro){
            return res.status(500).json({error: 'Erro ao excluir voluntario', msg: erro.message})
        }
    },

};