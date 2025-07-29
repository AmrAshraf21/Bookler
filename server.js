import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import jsonServer from "json-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Create JSON server router
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Use JSON server middlewares
app.use(middlewares);

// API routes
app.use("/api", router);

// Serve static files from the dist directory
app.use(express.static(join(__dirname, "dist")));

// For all other routes, serve the React app
app.get("*", (req, res) => {
	res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`API available at http://localhost:${PORT}/api`);
	console.log(`React app available at http://localhost:${PORT}`);
});
