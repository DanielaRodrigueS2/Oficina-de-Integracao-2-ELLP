const db = require('../firebase/firestore')
const yup = require('yup')

const voluntarioSchema = yup.object().shape({





});


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
            return res.status(500).json({error: 'Erro ao criar o certificado do voluntario', msg: erro.message})
        }
        
    },

    // Lista certificados dependendo do voluntario (talvez não seja utilizado)
    async listarCertificados(req, res){
        try{
            const {idVoluntario} = req.params;

            const snapshot = await db
                .collection('voluntarios')
                .doc(idVoluntario)
                .collection('certificados')
                .get();
            
            const certificados = snapshot.docs.map(doc => ({
                id : doc.id,
                ...doc.data(),
            }))

            return res.json(certificados)


        }
        catch(erro){
            return res.status(500).json({error : 'erro ao buscar os certificados ddesse voluntaario', msg: erro.message})
        }

    },

    // Lista todos os certificados
    async listarTodosCertificados(req, res){
        try{
            const snapshot = await db.collectionGroup('certificados').get()

            const certificados = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()

            }))

            return res.json(certificados)
        }
        catch(erro){
            return res.status(500).json({error : 'Erro ao listar todooos os certificados ', msg: erro.message})
            
        }
    },

    async deletarCertificado(req, res){
        try{
            const {idVoluntario, idCertificado} = req.params;

            await db 
                .collection('voluntarios')
                .doc(idVoluntario)
                .collection('certificados')
                .doc(idCertificado)
                .delete();

            return res.status(204).send();
 
        }
        catch(erro){
            return res.status(500).json({error: 'Erro ao deletar certificado' , msg: erro.message})
        }
    },

    async getCertificado(req,res){
        try{
            const {idVoluntario, idCertificado} = req.params;

            const certificado = await db 
                .collection('voluntarios')
                .doc(idVoluntario)
                .collection('certificados')
                .doc(idCertificado)
                .get();

            if (!certificado.exists){
                return res.status(404).json({error : 'Certificado nao foi encontrado ou nao existe'})
            }

            return res.json({id: certificado.id, ...certificado.data()})

        }
        catch(erro){
            return res.status(500).json({error: 'Erro ao buscar certificado' , msg: erro.message})
            
        }
    },


};