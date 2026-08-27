const API_URL = "https://www.aira-lab.in/api/projects";

export async function getLiveProjects() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch live projects");

    const dbProjects = await res.json();

    if (!dbProjects || dbProjects.length === 0) {
      return getFallbackProjects();
    }

    const sortedProjects = dbProjects.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sortedProjects.map((p, idx) => ({
      id: p.id,
      code: idx === 0 ? "RECENT UPLOAD 🔥" : `FR ${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}`,
      title: p.title,
      subtitle: p.tagline || p.category || "AIRA LAB INNOVATION",
      category: p.category || "General",
      author: p.authorName || "AiRA Lab Member",
      desc: p.description,
      img: p.coverImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      cardImg: p.coverImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      techStack: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : ["ROS 2", "AI", "Python"],
      demoUrl: p.demoUrl || "https://aira-lab.in/projects",
      githubUrl: p.githubUrl || "https://github.com/MeetDave-25/AiRA",
      status: p.status || "DEPLOYED",
      featured: idx === 0
    }));
  } catch (err) {
    return getFallbackProjects();
  }
}

function getFallbackProjects() {
  return [
    {
      id: "prj-01",
      code: "RECENT UPLOAD 🔥",
      title: "AiRA Autonomous Rover Mk-IV",
      subtitle: "LiDAR SLAM & Jetson Orin Edge Odometry",
      category: "Autonomous Robotics",
      desc: "High-mobility 6WD planetary rover featuring real-time SLAM point cloud mapping and microsecond obstacle avoidance.",
      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      cardImg: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      techStack: ["ROS 2", "LiDAR", "Jetson Orin"],
      demoUrl: "https://aira-lab.in/projects",
      githubUrl: "https://github.com/MeetDave-25/AiRA"
    }
  ];
}