// Authentic AiRA Lab (aira-lab.in) Projects Repository

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

const STORAGE_KEY = "aira_lab_projects_v3";

export function getProjects() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("LocalStorage load error:", e);
  }
  return INITIAL_PROJECTS;
}

export function saveProjects(projectsArray) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsArray));
  } catch (e) {
    console.error("LocalStorage save error:", e);
  }
}

// 1. Fetch live projects from Neon PostgreSQL Database
export async function fetchProjectsFromDB() {
  try {
    const response = await fetch("/api/projects");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      saveProjects(data);
      return data;
    }
  } catch (err) {
    console.warn("Neon PostgreSQL fetch fallback to cache:", err.message);
  }
  return getProjects();
}

// 2. Add new project directly to Neon PostgreSQL Database
export async function addProjectToDB(newProjData) {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProjData)
    });

    if (response.ok) {
      const createdProj = await response.json();
      console.log("✅ Project created in Neon PostgreSQL:", createdProj);
      // Fetch latest projects list from DB
      return await fetchProjectsFromDB();
    }
  } catch (err) {
    console.error("Neon PostgreSQL POST error, using local fallback:", err.message);
  }

  // Fallback local save
  return addProjectLocal(newProjData);
}

// Local fallback save
export function addProjectLocal(newProjData) {
  const current = getProjects();
  const nextIdNum = current.length + 1;
  const newProj = {
    id: `prj-${nextIdNum < 10 ? '0' + nextIdNum : nextIdNum}`,
    code: `FR ${nextIdNum < 10 ? '0' + nextIdNum : nextIdNum}`,
    title: newProjData.title || "New AiRA Lab Innovation",
    subtitle: newProjData.subtitle || "Real-World Engineering Project",
    category: newProjData.category || "Autonomous Robotics",
    author: newProjData.author || "AiRA Lab Innovators",
    desc: newProjData.desc || "Detailed engineering breakdown and system implementation.",
    img: newProjData.img || "/c/3d-circular-img-gallery/img1.jpg",
    cardImg: newProjData.cardImg || newProjData.img || "/c/brandappart-sticky-cards/card-img-1.jpg",
    techStack: typeof newProjData.techStack === 'string' ? newProjData.techStack.split(",").map(s => s.trim()) : (newProjData.techStack || ["ROS 2", "Python"]),
    metrics: newProjData.metrics || {
      fps: newProjData.fps || "60 FPS",
      latency: newProjData.latency || "2.0 ms",
      accuracy: newProjData.accuracy || "99.2%",
      precision: newProjData.precision || "Sub-mm"
    },
    demoUrl: newProjData.demoUrl || "https://aira-lab.in/projects",
    githubUrl: newProjData.githubUrl || "https://github.com/MeetDave-25/AiRA",
    paperUrl: newProjData.paperUrl || "https://aira-lab.in/about",
    status: "DEPLOYED",
    featured: false
  };

  const updated = [newProj, ...current];
  saveProjects(updated);
  return updated;
}

// 3. Check Live Neon PostgreSQL Database Connection Status & Latency
export async function checkDBStatus() {
  try {
    const startTime = Date.now();
    const res = await fetch("/api/db-status");
    if (res.ok) {
      const data = await res.json();
      return {
        connected: true,
        latencyMs: data.latencyMs || (Date.now() - startTime),
        database: data.database || "neondb",
        totalProjects: data.totalProjects || 0,
        provider: data.provider || "Neon PostgreSQL"
      };
    }
  } catch (err) {
    console.warn("DB Health check failed:", err.message);
  }
  return { connected: false, latencyMs: 0, database: "neondb", totalProjects: 0, provider: "Offline" };
}

// AIRA-Labs Live API Endpoint (for production use: https://www.aira-lab.in/api/projects)
// (For local testing: http://localhost:3000/api/projects)
const API_URL = "https://www.aira-lab.in/api/projects";

// Fetch projects in real-time from the database
export async function getLiveProjects() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch live projects");
    const dbProjects = await res.json();
    if (!dbProjects || dbProjects.length === 0) {
      return getProjects(); // Fallback to local default array if database has no entries
    }
    // Map database fields to the 3D showcase card format
    return dbProjects.map((p, idx) => ({
      id: p.id || `prj-${idx + 1}`,
      code: p.code || `FR ${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}`,
      title: p.title,
      subtitle: p.subtitle || p.tagline || p.category || "AIRA LAB PROJECT",
      category: p.category || "General",
      author: p.authorName || p.author || "AiRA Lab Team",
      desc: p.description || p.desc || "Detailed engineering breakdown and system implementation.",
      img: p.coverImage || p.img || "/c/3d-circular-img-gallery/img1.jpg",
      cardImg: p.coverImage || p.cardImg || p.img || "/c/brandappart-sticky-cards/card-img-1.jpg",
      techStack: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : (Array.isArray(p.techStack) ? p.techStack : ["ROS 2", "AI", "Python"]),
      metrics: p.metrics || {
        fps: "60 FPS",
        latency: "2.0 ms",
        accuracy: "99.2%",
        precision: "Sub-mm"
      },
      demoUrl: p.demoUrl || "https://aira-lab.in/projects",
      githubUrl: p.githubUrl || "https://github.com/MeetDave-25/AiRA",
      paperUrl: p.paperUrl || "https://aira-lab.in/about",
      status: p.status || "DEPLOYED",
      featured: p.featured || false
    }));
  } catch (err) {
    console.warn("Using fallback local projects array due to fetch error:", err);
    return getProjects();
  }
}

export function resetProjects() {
  localStorage.removeItem(STORAGE_KEY);
  return INITIAL_PROJECTS;
}


