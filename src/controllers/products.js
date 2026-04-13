import db from "../config/firebase.js";

export default {
    // Retornar os produtos (com filtro por seção opcional)
    read: async (req, res) => {
        try {
            const section = req.query.section?.toString(); // ?section=Promoção

            // Inicia a coleção de produtos
            let query = db.collection('products'); // Usando Query aqui

            // Se a seção for fornecida, aplica o filtro
            if (section) {
                query = query.where('section', 'array-contains', section);
            }

            // Executando a consulta
            const querySnapshot = await query.get();
            const products = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return res.status(200).json(products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    },

    // Retornar informações de um produto
    readOne: async (req, res) => {
        try {
            const id = req.params.id;

            const productDoc = await db.collection('products').doc(id).get();

            if (!productDoc.exists) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            return res.status(200).json({ id: productDoc.id, ...productDoc.data() });
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    },
}