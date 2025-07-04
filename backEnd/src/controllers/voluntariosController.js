const db = require('../firebase/firestore')
const yup = require('yup')

// Adicionar validacoes para RA, CPF, etc
const voluntarioSchema = yup.object().shape({
    nome: yup.string().required(),
    RA: yup.string().required(),
    CPF: yup.string().required(),
    curso: yup.string().required() ,
    telefone: yup.string().required(),
    departamento: yup.string().required(),
    email: yup.string().email().required(),
    funcao: yup.string().required(),
    situacao: yup.string().required(),

});

module.exports = {

    async criarVoluntario(req, res){
        try{
            
            await voluntarioSchema.validate(req.body)

            const {nome, RA, CPF, curso, telefone, departamento, email, funcao, situacao} = req.body;

            const cpfExiste = await db.collection('voluntarios').where('CPF', '==', CPF).get()

            if (!cpfExiste.empty){
                return res.status(409).json({error: 'Cpf já está cadastrado no ssitema'})
            }

            const raExiste = await db.collection('voluntarios').where('RA', '==', RA).get()
            
            if (!raExiste.empty){
                return res.status(409).json({error: 'RA já está cadastrado no ssitema'})
            }

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

    async editarVoluntario(req,res){
        try{
            const {idVoluntario} = req.params;
            
            const docRef = db.collection('voluntarios').doc(idVoluntario);
            const doc = await docRef.get();

            if(!doc.exists) return res.status(404).json({error: 'Voluntário não foi encontrado'});

            await voluntarioSchema.validate(req.body);

            const {nome, RA, CPF, curso, telefone, departamento, email, funcao, situacao} = req.body;

            const cpfExiste = await db.collection('voluntarios')
            .where('CPF', '==', CPF)
            .where('__name__', '!=', idVoluntario)
            .get();

            if(!cpfExiste.empty) return res.status(409).json({error: 'CPF já cadastrado em outro voluntário'})

            const raExiste = await db.collection('voluntarios')
            .where('RA', '==', RA)
            .where('__name__', '!=', idVoluntario)
            .get()
            
            if (!raExiste.empty){
                return res.status(409).json({error: 'RA já está cadastrado no ssitema'})
            }

            const dadosAtualizados = {
                nome,
                RA,
                CPF,
                curso,
                telefone,
                departamento,
                email,
                funcao,
                situacao,
                atualizacao: new Date()
            };

            await docRef.update(dadosAtualizados);
            return res.json({id: idVoluntario, ...dadosAtualizados})

        }
        catch(error){
            return res.status(500).json({error: 'Erro ao editar esse voluntário', msg: error.message})
        }
    }

};