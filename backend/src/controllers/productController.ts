import Product from "../models/Product";
import mongoose from "mongoose";
import { Request, Response } from "express";

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// En tu controlador de productos (products.controller.ts)

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, category, image, hoverImage, description } = req.body;
    
    // Validation
    if (!name || !price || !category) {
      res.status(400).json({ error: "Nombre, precio y categoría son requeridos" });
      return;
    }
    
    const newProduct = new Product({
      name,
      price,
      category,
      image: image || "",
      hoverImage: hoverImage || image || "",
      description: description || ""
    });
    
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, category, image, hoverImage, description } = req.body;
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { 
        name, 
        price, 
        category, 
        image, 
        hoverImage: hoverImage || image || "",
        description: description || ""
      },
      { new: true }
    );
    
    if (!updatedProduct) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Verifica que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "ID de producto no válido" });
      return;
    }

    const product = await Product.findById(id);
    
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    
    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
};