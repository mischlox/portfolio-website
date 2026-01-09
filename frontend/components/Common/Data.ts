// components/Data.ts

import tum_desc from "./tum-desc.md"
import hsaalen_desc from "./hs-aalen-desc.md"
import thesis_desc from "./thesis-desc.md"
import hattec_desc from "./hattec-desc.md"

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
  about: "Software Engineer focusing on AI-supported image processing, Embedded Systems, and Python/C++ development. Experience in conception, implementation, and integration of software on various hardware platforms, as well as in data preparation, analysis, and documentation. Familiar with agile software development and interdisciplinary teamwork.",
  experience: [
    { 
      company: "TUM Institute of Automotive Technology, Garching", 
      role: "Master Thesis (Grade: 1.0): Multimodal Pseudo-Labeling for 3D Object Detection in Autonomous Driving", 
      year: "11/2024 - 06/2025", 
      desc: thesis_desc,
      techStack: ["Python", "PyTorch", "OpenMMLab", "OpenCV", "Docker", "Git", "Linux"],
      logoPath: "/logos/tum-logo.svg"
    },
    { 
      company: "HAT.tec GmbH, Neubiberg", 
      role: "Werkstudent - Perception & Sensor Systems", 
      year: "10/2022 - 10/2024", 
      desc: hattec_desc,
      techStack: ["C++", "Python", "ROS2", "Qt", "OpenCV", "PyTorch", "TensorRT", "CMake", "Conan", "GoogleTest", "Linux", "Docker", "Git"],
      logoPath: "/logos/hattec-logo.png"
    },
    { 
      company: "HENSOLDT Optronics GmbH, Oberkochen", 
      role: "Praktikant / Werkstudent / Bachelor Thesis - Computer Vision & Image Processing", 
      year: "09/2020 - 09/2022", 
      desc: "Bachelor Thesis: Evaluation and optimization of Deep-Learning based object detection on embedded inference hardware (Note: 1.3). Setup of an Object-Detection-Demo with TensorRT, Deepstream, and Vitis AI. Implementation of hardware-accelerated image processing on FPGAs.",
      techStack: ["C++", "CMake", "Buildroot", "TensorRT", "Deepstream", "GStreamer", "Python"],
      logoPath: "/logos/hensoldt-logo.png"
    },
  ],
  education: [
    { 
        school: "Technische Universität München", 
        degree: "Master of Science - Robotics, Cognition and Intelligence", 
        year: "10/2022 - 09/2025",
        desc: tum_desc,
        logoPath: "/logos/tum-logo.svg",
        programUrl: "https://www.tum.de/studium/studienangebot/detail/robotics-cognition-intelligence-master-of-science-msc",
    }, 
    { 
        school: "Hochschule Aalen", 
        degree: "Bachelor of Science - Informatik / Software Engineering", 
        year: "10/2018 - 09/2022", 
        desc: hsaalen_desc,
        logoPath: "/logos/hs-aalen-logo.png",
        programUrl: "https://www.hs-aalen.de/de/courses/48/info" // ADDED LINK
    }, 
  ],
  projects: [
    { 
      title: "Company Research Agent", 
      cat: "AI / Agents", 
      desc: "An automated research tool built with Google ADK. It performs web searches, summarizes findings, and generates detailed interview reports and tailored questions.",
      techStack: ["Google ADK", "Python", "LLMs", "Streamlit"],
      titleImage: "/images/company-research-agent-main.jpg", 
      url: "https://github.com/mischlox",
      galleryImages: [
        { path: "/images/agent/workflow-diagram.png", desc: "Conceptual workflow diagram of the research agent." },
        { path: "/images/agent/streamlit-ui.png", desc: "Screenshot of the Streamlit user interface." },
        { path: "/images/agent/report-snippet.jpg", desc: "A snippet from a generated interview report." },
      ]
    },
    { 
      title: "Face Touching Detector", 
      cat: "Computer Vision", 
      desc: "Desktop-App for real-time face touch detection using YOLOv5m (Libtorch C++) with QT5-GUI. Optimized for low-latency inference on standard CPU hardware.",      techStack: ["C++", "Qt5", "Libtorch", "YOLOv5", "OpenCV"],
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
      techStack: ["Android (Java)", "TensorFlow Lite", "Computer Vision", "Continual Learning"],
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
      techStack: ["C#", ".NET", "WPF", "SQL", "MVVM"],
      titleImage: "/images/time-tracking-main.jpg", // Renamed from imagePath
      url: "", 
      galleryImages: [
        { path: "/images/time-tracker/admin-dashboard.png", desc: "The administrative dashboard for managing users and data." },
        { path: "/images/time-tracker/login-screen.png", desc: "The employee login and clock-in interface." },
        { path: "/images/time-tracker/mvvm-architecture.png", desc: "Diagram illustrating the MVVM pattern structure." },
      ]
    },
  ],
  skills: {
    "Programming Languages": ["C++", "Python", "TypeScript"],
    "AI/ML & Vision": ["PyTorch", "Deep Learning", "(3D) Computer Vision", "OpenCV", "TensorRT"],
    "Robotics & Embedded": ["ROS2", "Embedded Systems", "Linux", "Docker", "Buildroot"],
    "Tools & Workflow": ["Git", "FastAPI", "Next.js", "Agile Development", "CMake"]
  },
  social: {
    linkedin: "https://de.linkedin.com/in/michael-schlosser-dev",
    github: "https://github.com/mischlox",
    resumePDF: "/Lebenslauf.pdf"
  },
};