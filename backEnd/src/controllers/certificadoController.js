const db = require('../firebase/firestore')
const yup = require('yup')
const PDFDocument = require("pdfkit");

const certificadoSchema = yup.object().shape({
    oficina: yup.string().required(),
    cargaHoraria: yup.number().required(),
    inicio: yup.date().required(),
    fim: yup.date().required(),
    dataEmissao: yup.date().required(),
});


module.exports = {

    async criarCertificado(req, res) {
        try {
            await certificadoSchema.validate(req.body);

            const { idVoluntario } = req.params;
            const { oficina, cargaHoraria, inicio, fim, dataEmissao } = req.body;

            const voluntarioDoc = await db.collection("voluntarios").doc(idVoluntario).get();
            if (!voluntarioDoc.exists) {
                return res.status(404).json({ error: "Voluntário não encontrado" });
            }
            const voluntario = voluntarioDoc.data();

            const novoCertificado = {
                oficina,
                cargaHoraria,
                inicio: inicio.toString(),
                fim: fim.toString(),
                dataEmissao: dataEmissao.toString(),
                nomeVoluntario: voluntario.nome,
                RA: voluntario.RA,
                curso: voluntario.curso,
                criadoEm: new Date(),
            };
            const certRef = await db
                .collection("voluntarios")
                .doc(idVoluntario)
                .collection("certificados")
                .add(novoCertificado);

            const doc = new PDFDocument();

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=certificado-${idVoluntario}-${certRef.id}.pdf`);

            doc.pipe(res);

            doc.fontSize(22).text("Certificado de Participação", { align: "center" });
            doc.moveDown();
            doc.fontSize(12).text(
                `Certificamos que ${voluntario.nome} (RA: ${voluntario.RA}), do curso de ${voluntario.curso}, ` +
                `participou da oficina "${oficina}" com carga horária de ${cargaHoraria} horas, ` +
                `no período de ${inicio} a ${fim}.`
            );
            doc.moveDown(2);
            doc.text(`Data de Emissão: ${dataEmissao}`, { align: "right" });
            doc.text("Coordenação de Extensão - UTFPR", { align: "right" });

            doc.end();

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ error: "Erro ao gerar certificado", msg: erro.message });
        }
    },

    // Lista certificados dependendo do voluntario (talvez não seja utilizado)
    async listarCertificados(req, res) {
        try {
            const { idVoluntario } = req.params;

            const snapshot = await db
                .collection('voluntarios')
                .doc(idVoluntario)
                .collection('certificados')
                .get();

            const certificados = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))

            return res.json(certificados)


        }
        catch (erro) {
            return res.status(500).json({ error: 'erro ao buscar os certificados ddesse voluntaario', msg: erro.message })
        }

    },

    // Lista todos os certificados
    async listarTodosCertificados(req, res) {
        try {
            const snapshot = await db.collectionGroup('certificados').get()

            const certificados = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()

            }))

            return res.json(certificados)
        }
        catch (erro) {
            return res.status(500).json({ error: 'Erro ao listar todooos os certificados ', msg: erro.message })

        }
    },

    async deletarCertificado(req, res) {
        try {
            const { idVoluntario, idCertificado } = req.params;

            await db
                .collection('voluntarios')
                .doc(idVoluntario)
                .collection('certificados')
                .doc(idCertificado)
                .delete();

            return res.status(204).send();

        }
        catch (erro) {
            return res.status(500).json({ error: 'Erro ao deletar certificado', msg: erro.message })
        }
    },

    async getCertificado(req, res) {
        try {
            const { idVoluntario, idCertificado } = req.params;

            const certificado = await db
                .collection('voluntarios')
                .doc(idVoluntario)
                .collection('certificados')
                .doc(idCertificado)
                .get();

            if (!certificado.exists) {
                return res.status(404).json({ error: 'Certificado nao foi encontrado ou nao existe' })
            }

            return res.json({ id: certificado.id, ...certificado.data() })

        }
        catch (erro) {
            return res.status(500).json({ error: 'Erro ao buscar certificado', msg: erro.message })

        }
    },


};