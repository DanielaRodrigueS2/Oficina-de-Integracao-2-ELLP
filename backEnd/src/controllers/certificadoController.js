const db = require('../firebase/firestore')

module.exports = {

    async criarCertificado(req, res){
        try{
            const {idVoluntario} = req.params;
            const {semestre, dataEmissao} = req.body;
            const voluntarioDoc = await db.collection('voluntarios').doc(idVoluntario).get();

            if (!voluntarioDoc.exists){
                return res.status(404).json({erro : 'Voluntario nao enxontrado ou nao existe'})
            }

            const voluntarioDados = voluntarioDoc.data();

            const novoCertificado = {
                semestre,
                dataEmissao,
                criadoEm : new Date(),
                nomeVoluntario : voluntarioDados.nome,
                RA: voluntarioDados.RA,
                curso: voluntarioDados.curso,
                email: voluntarioDados.email,

            };

            const documento = await db
                .collection('voluntarios')
                .doc(idVoluntario)
                .collection('certificados')
                .add(novoCertificado);

            return res.status(201).json({id : documento.id, ...novoCertificado})
        }
        catch (erro){
            return res.status(500).json({error: 'Erro ao criar o certificado do voluntario', msg: erro})
        }
        
    },

    async listarCertificados(req, res){


    },

    async listarTodosCertificados(req, res){

    },

    async getCertificado(req,res){

    }


};