import express from "express";
import uploadMiddleware from "./middlewares/upload.middleware";
import uploadController from "./controllers/upload.controller";
import productsController from "./controllers/products.controller";
import categoriesController from "./controllers/categories.controller";
import authController from "./controllers/auth.controller";
import authMiddleware from "./middlewares/auth.middleware";
import aclMiddlware from "./middlewares/acl.middleware";
import OrderController from "./controllers/order.controller";

const router = express.Router();

// CRUD Products
router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

// CRUD Categories
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

// Upload
router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

// Authentication
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/me", authMiddleware, authController.me); // Autentikasi untuk mendapatkan info pengguna
router.put("/auth/profile", authMiddleware, authController.profile);

// CRUD Orders
router.get("/orders", authMiddleware, OrderController.getUserOrders); // Menampilkan riwayat order dengan autentikasi
router.post("/orders", authMiddleware, OrderController.createOrder); // Membuat order dengan autentikasi


export default router;
