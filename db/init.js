import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_DqzBab15ldOT@ep-spring-sea-a7ldru29-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require";

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const INITIAL_PROJECTS = [
  {
    id: "prj-01",
    code: "FR 01",
    title: "AiRA Autonomous Rover v4",
    subtitle: "6WD Rocker-Bogie Rover with SLAM & LiDAR Navigation",
    category: "Autonomous Robotics",
    author: "Meet Dave & AiRA Robotics Team",
    desc: "High-mobility autonomous planetary-style rover built at AiRA Lab using ROS 2, 2D LiDAR point clouds, and Jetson Nano visual odometry for real-time mapping and obstacle avoidance.",
    img: "/c/3d-circular-img-gallery/img1.jpg",
    cardImg: "/c/brandappart-sticky-cards/card-img-1.jpg",
    techStack: ["ROS 2", "Python", "LiDAR", "NVIDIA Jetson", "OpenCV"],
    metrics: { fps: "120 Hz SLAM", latency: "2.4 ms", accuracy: "99.2%", precision: "4.5 km Range" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "DEPLOYED",
    featured: true
  },
  {
    id: "prj-02",
    code: "FR 02",
    title: "Mevy AI Campus Assistant",
    subtitle: "Multimodal Voice & Vision Event Guide v4.2",
    category: "AI & Neural Models",
    author: "AiRA AI & Software Squad",
    desc: "Embedded multimodal AI agent trained on AiRA Lab documentation and event streams. Features real-time voice interaction, vision-based badge recognition, and automated attendee assistance.",
    img: "/c/3d-circular-img-gallery/img2.jpg",
    cardImg: "/c/brandappart-sticky-cards/card-img-2.jpg",
    techStack: ["PyTorch", "LLaMA-3", "Whisper", "FastAPI", "React"],
    metrics: { fps: "60 FPS Vision", latency: "180 ms", accuracy: "98.6%", precision: "100% Offline" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "DEPLOYED",
    featured: true
  },
  {
    id: "prj-03",
    code: "FR 03",
    title: "AiRA Smart Segregator Bot",
    subtitle: "Computer Vision Recycling & Automated Sorting Conveyor",
    category: "IoT & Hardware",
    author: "AiRA Green Tech Initiative",
    desc: "Award-winning hackathon project developed at LJCCA. Uses custom YOLO optical models with dual pneumatic servo arms to classify organic, plastic, and metal waste in real-time.",
    img: "/c/3d-circular-img-gallery/img3.jpg",
    cardImg: "/c/brandappart-sticky-cards/card-img-3.jpg",
    techStack: ["YOLOv10", "TensorFlow Lite", "Raspberry Pi 5", "Arduino Mega"],
    metrics: { fps: "60 FPS Sort", latency: "5.0 ms", accuracy: "99.4%", precision: "45 Items/min" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/achievements",
    status: "HACKATHON WINNER",
    featured: true
  },
  {
    id: "prj-04",
    code: "FR 04",
    title: "AiRA Quadcopter Swarm",
    subtitle: "Multi-Drone Tactical Swarm & Formation Flight",
    category: "Autonomous Robotics",
    author: "AiRA Aero Lab",
    desc: "Distributed multi-drone control architecture utilizing ultra-wideband (UWB) distance beacons and decentralised mesh nodes for tight indoor formation flight without GPS.",
    img: "/c/3d-circular-img-gallery/img4.jpg",
    cardImg: "/c/brandappart-sticky-cards/card-img-4.jpg",
    techStack: ["PX4 Autopilot", "C++20", "UWB Mesh", "MAVLink", "ROS 2"],
    metrics: { fps: "200 Hz Mesh", latency: "1.2 ms", accuracy: "99.8%", precision: "±2cm Gap" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "ACTIVE RESEARCH",
    featured: true
  },
  {
    id: "prj-05",
    code: "FR 05",
    title: "AiRA Portal & Lab Platform",
    subtitle: "Next.js 14 Digital Infrastructure for aira-lab.in",
    category: "Web & Platforms",
    author: "AiRA Web Dev Team",
    desc: "Full-stack digital infrastructure powering aira-lab.in. Includes member onboarding, automated project submissions, event ticketing, and leaderboard scoring systems.",
    img: "/c/3d-circular-img-gallery/img5.jpg",
    cardImg: "/c/3d-circular-img-gallery/img5.jpg",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    metrics: { fps: "100/100 Perf", latency: "42 ms TTFB", accuracy: "99.9%", precision: "1,200+ Members" },
    demoUrl: "https://aira-lab.in",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "PRODUCTION",
    featured: false
  },
  {
    id: "prj-06",
    code: "FR 06",
    title: "AiRA BCI Haptic Glove",
    subtitle: "Neural Motor Signal Decoder & Micro-Tactile Glove",
    category: "IoT & Hardware",
    author: "AiRA NeuroTech Team",
    desc: "Wearable haptic interface processing 8-channel forearm EMG signals to mimic robotic arm motions with force-feedback micro-vibration motors.",
    img: "/c/3d-circular-img-gallery/img6.jpg",
    cardImg: "/c/3d-circular-img-gallery/img6.jpg",
    techStack: ["EMG Signals", "ESP32", "BLE 5.0", "PyTorch", "C++"],
    metrics: { fps: "1,000 Hz", latency: "0.8 ms", accuracy: "96.5%", precision: "8 Haptic Nodes" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "PROTOTYPE",
    featured: false
  },
  {
    id: "prj-07",
    code: "FR 07",
    title: "AiRA VisionSLAM Engine",
    subtitle: "Monocular Depth Estimation & Real-Time Feature Matching",
    category: "AI & Neural Models",
    author: "AiRA Perception Lab",
    desc: "Lightweight neural SLAM system estimating 3D dense camera trajectories from a single camera feed without depth hardware, deployed on low-power edge compute.",
    img: "/c/3d-circular-img-gallery/img7.jpg",
    cardImg: "/c/3d-circular-img-gallery/img7.jpg",
    techStack: ["PyTorch", "TensorRT", "CUDA", "C++", "OpenCV"],
    metrics: { fps: "180 FPS", latency: "1.1 ms", accuracy: "98.9%", precision: "Sub-cm Reloc" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "ACTIVE RESEARCH",
    featured: false
  },
  {
    id: "prj-08",
    code: "FR 08",
    title: "AiRA Smart Agritech Sensor",
    subtitle: "Solar-Powered LoRaWAN Soil & Crop Health Monitor",
    category: "IoT & Hardware",
    author: "AiRA Sustainability Team",
    desc: "Long-range LoRaWAN sensor network collecting soil moisture, nitrogen levels, and multispectral plant health indices for automated precision irrigation.",
    img: "/c/3d-circular-img-gallery/img8.jpg",
    cardImg: "/c/3d-circular-img-gallery/img8.jpg",
    techStack: ["LoRaWAN", "MicroPython", "STM32", "Solar Power", "MQTT"],
    metrics: { fps: "15 km Range", latency: "5 Years Batt", accuracy: "99.7%", precision: "100+ Nodes" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "DEPLOYED",
    featured: false
  },
  {
    id: "prj-09",
    code: "FR 09",
    title: "AiRA NeRF 3D Studio",
    subtitle: "Instant Neural Radiance Field Artifact Reconstruction",
    category: "AI & Neural Models",
    author: "AiRA 3D Vision Lab",
    desc: "Web-based 3D reconstruction tool converting short video clips of physical artifacts into photorealistic 3D Gaussian splats and NeRF assets.",
    img: "/c/3d-circular-img-gallery/img9.jpg",
    cardImg: "/c/3d-circular-img-gallery/img9.jpg",
    techStack: ["Gaussian Splatting", "CUDA", "WebGPU", "Three.js", "Python"],
    metrics: { fps: "120 FPS WebGPU", latency: "15s Train", accuracy: "99.1%", precision: "Sub-mm Res" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "BETA",
    featured: false
  },
  {
    id: "prj-10",
    code: "FR 10",
    title: "AiRA Micro-Mouse Maze Robot",
    subtitle: "High-Speed Flood-Fill Algorithmic Maze Solver",
    category: "Hackathon Champions",
    author: "AiRA Robotics Freshers Group",
    desc: "National championship-winning micro-mouse robot using Flood-Fill algorithms and IR array sensors to solve complex 16x16 mazes in record time.",
    img: "/c/3d-circular-img-gallery/img10.jpg",
    cardImg: "/c/3d-circular-img-gallery/img10.jpg",
    techStack: ["C++", "STM32", "PID Controller", "IR Array", "EEPROM"],
    metrics: { fps: "3.2 m/s Speed", latency: "0.5 ms PID", accuracy: "100%", precision: "1st Place Win" },
    demoUrl: "https://aira-lab.in/achievements",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/achievements",
    status: "CHAMPION",
    featured: false
  },
  {
    id: "prj-11",
    code: "FR 11",
    title: "AiRA Gesture Robotic Arm",
    subtitle: "6-Axis Manipulator with Computer Vision Tracking",
    category: "Autonomous Robotics",
    author: "AiRA Mechatronics Unit",
    desc: "Interactive 6-DOF industrial manipulator arm controlled via hand gestures captured by overhead cameras and optical tracking units.",
    img: "/c/3d-circular-img-gallery/img11.jpg",
    cardImg: "/c/3d-circular-img-gallery/img11.jpg",
    techStack: ["MediaPipe", "Python", "Arduino", "Servo Kinematics", "C++"],
    metrics: { fps: "90 FPS", latency: "2.0 ms Servo", accuracy: "98.4%", precision: "6 DoF" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "DEPLOYED",
    featured: false
  },
  {
    id: "prj-12",
    code: "FR 12",
    title: "AiRA QR Event Check-in System",
    subtitle: "High-Throughput QR Scanner & Live Dashboard",
    category: "Web & Platforms",
    author: "AiRA App Team",
    desc: "Deployed web application used at AiRA Lab workshops and tech fests to scan QR tickets, track live headcount, and print participant badges instantly.",
    img: "/c/3d-circular-img-gallery/img12.jpg",
    cardImg: "/c/3d-circular-img-gallery/img12.jpg",
    techStack: ["React", "Node.js", "MongoDB", "WebSockets", "Zebra API"],
    metrics: { fps: "0.1s Scan", latency: "500+ Scans/m", accuracy: "100%", precision: "0 Crashes" },
    demoUrl: "https://aira-lab.in/events",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/events",
    status: "PRODUCTION",
    featured: false
  },
  {
    id: "prj-13",
    code: "FR 13",
    title: "AiRA Deep Audio Denoising",
    subtitle: "Real-Time Neural Noise Suppression for Microphones",
    category: "AI & Neural Models",
    author: "AiRA Audio AI Group",
    desc: "Low-latency neural audio filter removing heavy ambient noise and speech interference from microphone feeds in real-time streams.",
    img: "/c/3d-circular-img-gallery/img13.jpg",
    cardImg: "/c/3d-circular-img-gallery/img13.jpg",
    techStack: ["PyTorch", "ONNX Runtime", "C++", "WebAudio API", "Python"],
    metrics: { fps: "48 kHz", latency: "1.5 ms", accuracy: "-35 dB Cut", precision: "99.0% Clarity" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "DEPLOYED",
    featured: false
  },
  {
    id: "prj-14",
    code: "FR 14",
    title: "AiRA Campus Delivery Bot",
    subtitle: "Indoor Delivery Vehicle with Obstacle Avoidance",
    category: "Autonomous Robotics",
    author: "AiRA Campus Logistics Lab",
    desc: "Self-navigating indoor delivery vehicle transporting lab equipment and components across LJCCA campus corridors with pin-point arrival notices.",
    img: "/c/3d-circular-img-gallery/img14.jpg",
    cardImg: "/c/3d-circular-img-gallery/img14.jpg",
    techStack: ["ROS 2", "Stereo Camera", "Ultrasonic", "Python", "React Native"],
    metrics: { fps: "1.5 m/s", latency: "3.0 ms", accuracy: "99.3%", precision: "50kg Payload" },
    demoUrl: "https://aira-lab.in/projects",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in/about",
    status: "PROTOTYPE",
    featured: false
  },
  {
    id: "prj-15",
    code: "FR 15",
    title: "AiRA 3D Interactive Showcase",
    subtitle: "GSAP & CSS 3D Perspective Reel and Cards Deck",
    category: "Web & Platforms",
    author: "AiRA Frontend Engineering Unit",
    desc: "3D interactive project showcase engineered with Vanilla HTML/CSS/JS, GSAP ScrollTrigger, and Lenis smooth momentum scrolling.",
    img: "/c/3d-circular-img-gallery/img15.jpg",
    cardImg: "/c/3d-circular-img-gallery/img15.jpg",
    techStack: ["Vite", "GSAP", "Lenis", "CSS 3D", "JavaScript"],
    metrics: { fps: "60 FPS 3D", latency: "0.12 Lerp", accuracy: "100%", precision: "15 Models" },
    demoUrl: "https://aira-lab.in",
    githubUrl: "https://github.com/MeetDave-25/AiRA",
    paperUrl: "https://aira-lab.in",
    status: "PRODUCTION",
    featured: false
  }
];

export async function initDatabase() {
  console.log("⚡ Connecting to Neon PostgreSQL database...");
  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await pool.query(schemaSql);
    console.log("✅ Database schema initialized successfully!");

    const countRes = await pool.query("SELECT COUNT(*) FROM projects");
    const count = parseInt(countRes.rows[0].count, 10);
    console.log(`Current project count in DB: ${count}`);

    if (count === 0) {
      console.log("🌱 Seeding initial 15 AiRA Lab projects into PostgreSQL...");
      for (const p of INITIAL_PROJECTS) {
        await pool.query(
          `INSERT INTO projects 
          (id, code, title, subtitle, category, author, desc_text, img, card_img, tech_stack, metrics, demo_url, github_url, paper_url, status, featured)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
          ON CONFLICT (id) DO NOTHING;`,
          [
            p.id,
            p.code,
            p.title,
            p.subtitle,
            p.category,
            p.author,
            p.desc,
            p.img,
            p.cardImg,
            JSON.stringify(p.techStack),
            JSON.stringify(p.metrics),
            p.demoUrl,
            p.githubUrl,
            p.paperUrl,
            p.status,
            p.featured
          ]
        );
      }
      console.log("✅ Seeded 15 projects into Neon PostgreSQL successfully!");
    } else {
      console.log("ℹ️ Projects table already contains data, skipping initial seeding.");
    }
  } catch (err) {
    console.error("❌ Database initialization error:", err);
    throw err;
  } finally {
    await pool.end();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  initDatabase().catch(err => {
    console.error("Failed to run initDatabase:", err);
    process.exit(1);
  });
}
