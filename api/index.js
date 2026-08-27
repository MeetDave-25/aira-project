import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_DqzBab15ldOT@ep-spring-sea-a7ldru29-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require";

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

app.use(cors());
app.use(express.json());

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

// 1. Health & Database Status Check
app.get('/api/db-status', async (req, res) => {
  const startTime = Date.now();
  try {
    const dbPool = getPool();
    const dbRes = await dbPool.query("SELECT NOW(), current_database();");
    const countRes = await dbPool.query("SELECT COUNT(*) FROM projects;");
    const latencyMs = Date.now() - startTime;
    
    res.json({
      status: "connected",
      database: dbRes.rows[0].current_database,
      serverTime: dbRes.rows[0].now,
      latencyMs,
      totalProjects: parseInt(countRes.rows[0].count, 10),
      provider: "Neon PostgreSQL (ap-southeast-2)"
    });
  } catch (err) {
    res.status(500).json({
      status: "disconnected",
      error: err.message,
      latencyMs: Date.now() - startTime
    });
  }
});

// 2. GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const dbPool = getPool();
    const { rows } = await dbPool.query("SELECT * FROM projects ORDER BY id ASC;");
    const projects = rows.map(mapRowToProject);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects", details: err.message });
  }
});

// 3. POST new project directly to Neon PostgreSQL (from this app OR aira-lab.in)
app.post('/api/projects', async (req, res) => {
  try {
    const dbPool = getPool();
    const { title, subtitle, category, author, desc, img, cardImg, techStack, metrics, demoUrl, githubUrl, paperUrl, status, featured } = req.body;

    const countRes = await dbPool.query("SELECT COUNT(*) FROM projects;");
    const nextNum = parseInt(countRes.rows[0].count, 10) + 1;
    const numStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;

    const id = req.body.id || `prj-${numStr}`;
    const code = req.body.code || `FR ${numStr}`;
    const categoryVal = category || "Autonomous Robotics";
    const authorVal = author || "AiRA Lab Innovators";
    const descVal = desc || "Detailed engineering breakdown and system implementation.";
    const imgVal = img || "/c/3d-circular-img-gallery/img1.jpg";
    const cardImgVal = cardImg || imgVal;
    
    const stackArr = Array.isArray(techStack) 
      ? techStack 
      : (typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()).filter(Boolean) : ["ROS 2", "Python"]);

    const metricsObj = metrics || {
      fps: req.body.fps || "60 FPS",
      latency: req.body.latency || "2.0 ms",
      accuracy: req.body.accuracy || "99.2%",
      precision: req.body.precision || "Sub-mm"
    };

    const insertQuery = `
      INSERT INTO projects 
      (id, code, title, subtitle, category, author, desc_text, img, card_img, tech_stack, metrics, demo_url, github_url, paper_url, status, featured)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *;
    `;

    const values = [
      id, code, title || "New AiRA Innovation", subtitle || "Real-World Engineering Project",
      categoryVal, authorVal, descVal, imgVal, cardImgVal,
      JSON.stringify(stackArr), JSON.stringify(metricsObj),
      demoUrl || "https://aira-lab.in/projects",
      githubUrl || "https://github.com/MeetDave-25/AiRA",
      paperUrl || "https://aira-lab.in/about",
      status || "DEPLOYED",
      Boolean(featured)
    ];

    const { rows } = await dbPool.query(insertQuery, values);
    const newProject = mapRowToProject(rows[0]);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to add project to PostgreSQL database", details: err.message });
  }
});

export default app;
