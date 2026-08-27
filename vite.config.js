import { defineConfig } from "vite";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_DqzBab15ldOT@ep-spring-sea-a7ldru29-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require";

// Embedded Vite plugin for PostgreSQL API endpoints during dev
function neonPostgresApiPlugin() {
  let pool;

  function getPool() {
    if (!pool) {
      pool = new pg.Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
      });
    }
    return pool;
  }

  function mapRowToProject(row) {
    return {
      id: row.id,
      code: row.code,
      title: row.title,
      subtitle: row.subtitle || '',
      category: row.category,
      author: row.author,
      desc: row.desc_text,
      img: row.img,
      cardImg: row.card_img || row.img,
      techStack: Array.isArray(row.tech_stack) 
        ? row.tech_stack 
        : (typeof row.tech_stack === 'string' ? JSON.parse(row.tech_stack) : []),
      metrics: typeof row.metrics === 'object' && row.metrics !== null 
        ? row.metrics 
        : (typeof row.metrics === 'string' ? JSON.parse(row.metrics) : {}),
      demoUrl: row.demo_url || '',
      githubUrl: row.github_url || '',
      paperUrl: row.paper_url || '',
      status: row.status || 'DEPLOYED',
      featured: Boolean(row.featured)
    };
  }

  return {
    name: "neon-postgres-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith("/api/")) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          return res.end();
        }

        try {
          const dbPool = getPool();

          if (pathname === "/api/db-status") {
            const startTime = Date.now();
            const dbRes = await dbPool.query("SELECT NOW(), current_database();");
            const countRes = await dbPool.query("SELECT COUNT(*) FROM projects;");
            const latencyMs = Date.now() - startTime;
            
            res.statusCode = 200;
            return res.end(JSON.stringify({
              status: "connected",
              database: dbRes.rows[0].current_database,
              serverTime: dbRes.rows[0].now,
              latencyMs,
              totalProjects: parseInt(countRes.rows[0].count, 10),
              provider: "Neon PostgreSQL (ap-southeast-2)"
            }));
          }

          if (pathname === "/api/projects" && req.method === "GET") {
            const { rows } = await dbPool.query("SELECT * FROM projects ORDER BY id ASC;");
            const projects = rows.map(mapRowToProject);
            res.statusCode = 200;
            return res.end(JSON.stringify(projects));
          }

          if (pathname === "/api/projects" && req.method === "POST") {
            let bodyStr = "";
            req.on("data", chunk => { bodyStr += chunk; });
            req.on("end", async () => {
              try {
                const body = JSON.parse(bodyStr || "{}");
                const countRes = await dbPool.query("SELECT COUNT(*) FROM projects;");
                const nextNum = parseInt(countRes.rows[0].count, 10) + 1;
                const numStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;

                const id = body.id || `prj-${numStr}`;
                const code = body.code || `FR ${numStr}`;
                const title = body.title || "New AiRA Innovation";
                const subtitle = body.subtitle || "Real-World Engineering Project";
                const category = body.category || "Autonomous Robotics";
                const author = body.author || "AiRA Lab Innovators";
                const desc = body.desc || "Detailed engineering breakdown and system implementation.";
                const img = body.img || "/c/3d-circular-img-gallery/img1.jpg";
                const cardImg = body.cardImg || img;
                const techStack = Array.isArray(body.techStack) 
                  ? body.techStack 
                  : (typeof body.techStack === "string" ? body.techStack.split(",").map(s => s.trim()) : ["ROS 2", "Python"]);

                const metrics = body.metrics || {
                  fps: body.fps || "60 FPS",
                  latency: body.latency || "2.0 ms",
                  accuracy: body.accuracy || "99.2%",
                  precision: body.precision || "Sub-mm"
                };

                const insertQuery = `
                  INSERT INTO projects 
                  (id, code, title, subtitle, category, author, desc_text, img, card_img, tech_stack, metrics, demo_url, github_url, paper_url, status, featured)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                  RETURNING *;
                `;

                const values = [
                  id, code, title, subtitle, category, author, desc, img, cardImg,
                  JSON.stringify(techStack), JSON.stringify(metrics),
                  body.demoUrl || "https://aira-lab.in/projects",
                  body.githubUrl || "https://github.com/MeetDave-25/AiRA",
                  body.paperUrl || "https://aira-lab.in/about",
                  body.status || "DEPLOYED",
                  Boolean(body.featured)
                ];

                const { rows } = await dbPool.query(insertQuery, values);
                res.statusCode = 201;
                return res.end(JSON.stringify(mapRowToProject(rows[0])));
              } catch (e) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }

          next();
        } catch (err) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [neonPostgresApiPlugin()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        bypass(req) {
          // If standalone server.js is not running, fallback to Vite plugin
          return false;
        }
      }
    }
  }
});
