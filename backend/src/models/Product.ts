import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage: string;
  description: string; // Nuevo campo
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  category: { 
    type: String, 
    required: true,
    trim: true 
  },
  image: { 
    type: String, 
    default: "" 
  },
  hoverImage: { 
    type: String, 
    default: "" 
  },
  description: { // Nuevo campo
    type: String,
    default: "",
    maxlength: 500 // Limita a 500 caracteres como mencionaste en el frontend
  }
}, {
  timestamps: true
});

// Índices para mejorar las consultas
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

export default mongoose.model<IProduct>("Product", productSchema);