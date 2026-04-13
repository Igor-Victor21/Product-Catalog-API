import db from './config/firebase.js';
import express from 'express';
import productController from "./controllers/products.js"

const { Router } = express;
const routes = Router();

routes.get('/teste-firestore', async (req, res) => {
  try {
    const testRef = await db.collection('testes').add({timestamp: new Date()});
    res.json({success: true, id: testRef.id});
  } catch (error) {
    res.status(500).json({error});
  }
});

routes.get("/products", (req, res) => productController.read(req,res));
routes.get("/products/:id", (req, res) => productController.readOne(req,res));

export default routes;