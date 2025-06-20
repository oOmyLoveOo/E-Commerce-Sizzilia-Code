// server.ts
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas API
app.use("/api", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Ruta de salud
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use("/api/*", (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.path} not found` });
});

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`🛍️ Rutas disponibles:`);
      console.log(`   - POST /api/orders/process-order`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar con MongoDB:", error);
  });