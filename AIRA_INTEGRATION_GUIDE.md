# aira-lab.in Website Database Integration Guide

This guide explains how to connect your main website **`aira-lab.in`** to this central **Neon PostgreSQL database** (`neondb`), so that whenever a user submits or creates a project on `aira-lab.in`, it **instantly saves to PostgreSQL and shows up live on the 3D Showcase site** (and vice versa)!

---

## 🔑 1. Shared Database Credentials

Use this exact connection string in your `aira-lab.in` environment configuration (`.env` or server config):

```env
DATABASE_URL=postgresql://neondb_owner:npg_DqzBab15ldOT@ep-spring-sea-a7ldru29-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require
```

---

## ⚡ 2. How to Insert a Project from aira-lab.in

### Method 1: Direct SQL Insert (Node.js / Next.js / Express / Server)

If `aira-lab.in` is built with Node.js, Next.js, or Express, install `pg` (`npm i pg`) and run:

```javascript
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Function to call whenever a user submits a project on aira-lab.in
export async function createProjectOnAiraLab(projectData) {
  const { title, subtitle, category, author, desc, img, techStack } = projectData;

  const countRes = await pool.query("SELECT COUNT(*) FROM projects;");
  const nextNum = parseInt(countRes.rows[0].count, 10) + 1;
  const numStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;

  const query = `
    INSERT INTO projects 
    (id, code, title, subtitle, category, author, desc_text, img, card_img, tech_stack, metrics, status, featured)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;
  `;

  const values = [
    `prj-${numStr}`,
    `FR ${numStr}`,
    title,
    subtitle || 'AiRA Lab Project',
    category || 'Autonomous Robotics',
    author || 'AiRA Lab Contributor',
    desc,
    img || '/c/3d-circular-img-gallery/img1.jpg',
    img || '/c/3d-circular-img-gallery/img1.jpg',
    JSON.stringify(Array.isArray(techStack) ? techStack : techStack.split(',').map(s => s.trim())),
    JSON.stringify({ fps: "120 FPS", latency: "2.0 ms", accuracy: "99.0%", precision: "Sub-mm" }),
    'DEPLOYED',
    false
  ];

  const { rows } = await pool.query(query, values);
  console.log("✅ Project inserted into Neon DB from aira-lab.in:", rows[0]);
  return rows[0];
}
```

---

### Method 2: REST API Call (From any website or frontend)

Once you host this 3D showcase app (e.g. at `https://aira-showcase.vercel.app`), `aira-lab.in` can submit new projects by simply sending an HTTP POST request to your API:

```javascript
// JavaScript snippet on aira-lab.in form submit:
async function submitProjectToShowcase(formData) {
  const response = await fetch('https://YOUR-HOSTED-APP-URL.vercel.app/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: formData.title,
      subtitle: formData.subtitle,
      category: formData.category,
      author: formData.author,
      desc: formData.description,
      techStack: formData.techStack, // e.g. "ROS 2, PyTorch, OpenCV"
      img: formData.imageUrl
    })
  });

  const newProject = await response.json();
  console.log("Project live on database:", newProject);
}
```

---

## 🚀 3. How to Host This 3D Showcase App

### Option A: Host on Vercel (Free & Instant)
1. Push this project code (`d:\AiRA-project`) to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Add Environment Variable:
   - Name: `DATABASE_URL`
   - Value: `postgresql://neondb_owner:npg_DqzBab15ldOT@ep-spring-sea-a7ldru29-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require`
5. Click **Deploy**! Done in 60 seconds!

### Option B: Host on Render / Railway / DigitalOcean / VPS
1. Run `npm run start` or `node server.js`.
2. Set Environment Variable `DATABASE_URL`.

---

## 🎯 Verification Test

Whenever a project is added via `POST /api/projects` or direct database insert:
1. Refresh the 3D Showcase site (or observe auto sync).
2. The navbar status pill will reflect the updated total count (`🟢 NEON POSTGRES (38 ms)`).
3. The new project card will appear in both the **Sticky Deck** and the **Project Archive Grid**!
