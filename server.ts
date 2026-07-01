import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing with a generous limit to support base64 images/logos if needed
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  const configPath = path.join(process.cwd(), "src", "data", "websiteConfig.json");

  // Ensure directory exists
  const dataDir = path.dirname(configPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // API to retrieve the current server-persisted configuration
  app.get("/api/config", (req, res) => {
    try {
      if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath, "utf-8");
        return res.json(JSON.parse(data));
      }
      return res.json({});
    } catch (error) {
      console.error("Error reading config:", error);
      return res.status(500).json({ error: "Failed to read configuration" });
    }
  });

  // API to save the configuration directly to the server filesystem
  app.post("/api/config", (req, res) => {
    try {
      const config = req.body;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error saving config:", error);
      return res.status(500).json({ error: "Failed to save configuration" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
