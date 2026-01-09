// components/Data.ts

import tum_desc from "./tum-desc.md"
import hsaalen_desc from "./hs-aalen-desc.md"
import thesis_desc from "./thesis-desc.md"
import hattec_desc from "./hattec-desc.md"
import hensoldt_desc from "./hensoldt-desc.md"

export type View = 'chat' | 'about' | 'projects' | 'contact';

// The NavItems now only use string identifiers for icons
export const NavItems: { label: string; view: View; iconName: string }[] = [
  { label: 'Assistant', view: 'chat', iconName: 'Sparkles' },
  { label: 'About Me', view: 'about', iconName: 'User' },
  { label: 'Portfolio', view: 'projects', iconName: 'Code' },
  { label: 'Contact', view: 'contact', iconName: 'Mail' },
];


export const PROFILE = {
  first_name: "Michael",
  last_name: "Schlosser",
  full_name: "Michael Schlosser",
  email: "mschlosser.se@gmail.com",
  role: "Software Engineer",
  tagline: "Software Engineer with focus on AI-based image processing and Embedded Systems.",
  about: "Software Engineer specializing in Computer Vision, AI Perception and Real-Time Embedded Systems. I design and deploy high-performance, real-time solutions using C++ and Python, with expertise in deep learning, computer vision, robotics, hardware optimization and embedded Linux. My background includes an M.Sc. from TUM with a focus on perception for autonomous driving and four years of industry experience building robust, scalable systems on edge devices.",
  experience: [
    { 
      company: "TUM Institute of Automotive Technology, Garching", 
      role: "Master Thesis (Grade: 1.0) - Multimodal Pseudo-Labeling for 3D Object Detection in Autonomous Driving", 
      year: "11/2024 - 06/2025", 
      desc: thesis_desc,
      techStack: ["Python", "PyTorch", "OpenMMLab", "OpenCV", "Docker", "Git", "Linux"],
      logoPath: "/logos/tum-logo.svg"
    },
    { 
      company: "HAT.tec GmbH, Neubiberg", 
      role: "Working Student - Perception & Sensor Systems", 
      year: "10/2022 - 10/2024", 
      desc: hattec_desc,
      techStack: ["C++", "Python", "ROS2", "Qt", "OpenCV", "PyTorch", "TensorRT", "CMake", "Conan", "GoogleTest", "Linux", "Docker", "Git"],
      logoPath: "/logos/hattec-logo.png"
    },
    { 
      company: "HENSOLDT Optronics GmbH, Oberkochen", 
      role: "Internship / Working Student / Bachelor Thesis - Computer Vision & Image Processing", 
      year: "09/2020 - 09/2022", 
      desc: hensoldt_desc,
      techStack: ["C++", "CMake", "Buildroot", "Python", "Docker", "OpenCV", "OpenVino", "Qt", "Linux", "TensorRT", "Vitis AI", "GStreamer", "MQTT"],
      logoPath: "/logos/hensoldt-logo.png"
    },
  ],
  education: [
    { 
        school: "Technical University of Munich", 
        degree: "Master of Science - Robotics, Cognition and Intelligence", 
        year: "10/2022 - 09/2025",
        desc: tum_desc,
        logoPath: "/logos/tum-logo.svg",
        programUrl: "https://www.tum.de/studium/studienangebot/detail/robotics-cognition-intelligence-master-of-science-msc",
    }, 
    { 
        school: "Aalen University", 
        degree: "Bachelor of Science - Informatics / Software Engineering", 
        year: "10/2018 - 09/2022", 
        desc: hsaalen_desc,
        logoPath: "/logos/hs-aalen-logo.png",
        programUrl: "https://www.hs-aalen.de/de/courses/48/info" // ADDED LINK
    }, 
  ],
  projects: [
    {
      "title": "Portfolio Chat API (RAG Assistant)",
      "cat": "Agentic AI / Full-Stack",
      "desc": "An API powering the AI assistant currently running on this website. It uses a **LangGraph** state machine for complex, stateful conversation flow, performing Retrieval-Augmented Generation (RAG) against a private knowledge base to answer questions about Michael's professional career and integrates a FastMail contact service.",
      "techStack": [
        "FastAPI",
        "LangGraph",
        "LangChain",
        "Chroma DB",
        "Python",
        "RAG"
      ],
      "titleImage": "",
      "url": "https://github.com/mischlox/portfolio-website/tree/master/backend",
      "huggingfaceUrl": "",
      "galleryImages": [
      ]
    },
    { 
      title: "Company Research Agent", 
      cat: "AI / Agents", 
      desc: "An automated research tool built with Google ADK. It performs web searches, summarizes findings, and generates detailed interview reports and tailored questions.",
      techStack: ["Google ADK", "Agentic AI", "Python", "LLMs"],
      titleImage: "", 
      url: "https://github.com/mischlox",
      huggingfaceUrl: "https://huggingface.co/spaces/mischlox/company-researcher",
      galleryImages: [
      ]
    },
    { 
      title: "Face Touching Detector", 
      cat: "Computer Vision", 
      desc: "Desktop-App for real-time face touch detection using YOLOv5m (Libtorch C++) with QT5-GUI. Optimized for low-latency inference on standard CPU hardware.",
      techStack: ["C++", "Qt5", "Libtorch", "YOLOv5", "OpenCV"],
      titleImage: "/project_screenshots/ft-detector/screenshot.png", 
      youtubeUrl: "https://www.youtube.com/watch?v=ZcUlyH9H7Ng",
      url: "https://github.com/mischlox/face-touching-detector",
      galleryImages: [
        { path: "/project_screenshots/ft-detector/screenshot.png", desc: "Real-time face and hand detection visualization." },
      ]
    },
    { 
      title: "AR Object Recognition", 
      cat: "Mobile / AI", 
      desc: "Android app for real-time object recognition and learning using the smartphone camera. Utilizes Continual Learning strategies with MobilenetV2 to learn new objects on the fly.",
      techStack: ["Android SDK", "Java", "TensorFlow Lite", "Computer Vision", "Continual Learning"],
      titleImage: "/project_screenshots/arora/detecting.png",
      url: "https://github.com/mischlox/AR-App-Object-Recognition",
      galleryImages: [
        { path: "/project_screenshots/arora/detecting.png", desc: "Screenshot of the AR overlay on recognized objects." },
        { path: "/project_screenshots/arora/main-screen.png", desc: "The flow for on-device incremental model updates." },
        { path: "/project_screenshots/arora/object-overview.png", desc: "Details on the MobilenetV2 architecture used for TFLite inference." },
        { path: "/project_screenshots/arora/settings.png", desc: "Details on the MobilenetV2 architecture used for TFLite inference." },
      ]
    },
    { 
      title: "Employee Time Tracking", 
      cat: "Software Engineering", 
      desc: "Full-stack desktop tool for employee time tracking, login systems, admin dashboard, and vacation management. Currently deployed and productive in 3 supermarket branches.",
      techStack: ["Python", "Eel", "SQLite", "Javascript", "HTML", "CSS"],
      // titleImage: "/images/time-tracking-main.jpg", // Renamed from imagePath
      url: "", 
      galleryImages: [
        // { path: "/images/time-tracker/admin-dashboard.png", desc: "The administrative dashboard for managing users and data." },
        // { path: "/images/time-tracker/login-screen.png", desc: "The employee login and clock-in interface." },
        // { path: "/images/time-tracker/mvvm-architecture.png", desc: "Diagram illustrating the MVVM pattern structure." },
      ]
    },
  ],
  skills: {
    "Programming Languages": { iconName: "SquareCode", skills: ["C++", "Python", "Java", "Bash", "C", "JavaScript"] },
    "AI/ML & Vision": { iconName: "Brain", skills: ["PyTorch", "Deep Learning", "(3D) Computer Vision", "OpenCV", "TensorRT"] },
    "Robotics & Embedded": { iconName: "Cpu", skills: ["ROS2", "Embedded Systems", "Linux", "Docker", "Buildroot"] },
    "Tools & Workflow": { iconName: "Wrench", skills: ["Git", "GoogleTest / PyTest", "Qt", "Agile Development", "CMake"] }
  },
  social: {
    linkedin: "https://de.linkedin.com/in/michael-schlosser-dev",
    github: "https://github.com/mischlox",
    resumePDF: "/Lebenslauf.pdf"
  },
};