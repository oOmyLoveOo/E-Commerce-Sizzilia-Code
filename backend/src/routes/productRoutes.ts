import express from "express";
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getProductById // Asegúrate de importarlo
} from "../controllers/productController";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById); // Esta es la ruta clave

export default router;