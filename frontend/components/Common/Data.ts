// components/Data.ts

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
  // ... rest of the PROFILE data ...
  role: "Software Engineer",
  tagline: "Software Engineer with focus on AI-based image processing and Embedded Systems.",
  about: "Software Engineer focusing on AI-supported image processing, Embedded Systems, and Python/C++ development. Experience in conception, implementation, and integration of software on various hardware platforms, as well as in data preparation, analysis, and documentation. Familiar with agile software development and interdisciplinary teamwork.",
  experience: [
    { 
      company: "TUM Institute of Automotive Technology, Garching", 
      role: "Master Thesis: Multimodal Pseudo-Labeling for 3D Object Detection in Autonomous Driving (Note: 1.0)", 
      year: "11/2024 - 06/2025", 
      desc: "Development of a framework for sensor fusion of LiDAR and camera data to improve the 3D Pseudo-Labeling pipeline. (Tech: Python, PyTorch, OpenMMLab, Docker, Git)",
      logoPath: "/logos/tum-logo.svg" // ASSUMED PATH: Add your logo file path here
    },
    { 
      company: "HAT.tec GmbH, Neubiberg", 
      role: "Werkstudent - Perception & Sensor Systems", 
      year: "10/2022 - 10/2024", 
      desc: "Development of ROS2 applications for processing and analyzing various sensor data in an agile team. Training, evaluation, and optimization of an object detection model for aircraft. (Tech: C++, Python, ROS2, Qt, PyTorch, TensorRT)",
      logoPath: "/logos/hattec-logo.png" // ASSUMED PATH: Add your logo file path here
    },
    { 
      company: "HENSOLDT Optronics GmbH, Oberkochen", 
      role: "Praktikant / Werkstudent / Bachelor Thesis - Computer Vision & Image Processing", 
      year: "09/2020 - 09/2022", 
      desc: "Bachelor Thesis: Evaluation and optimization of Deep-Learning based object detection on embedded inference hardware (Note: 1.3). Setup of an Object-Detection-Demo with TensorRT, Deepstream, and Vitis AI. Implementation of hardware-accelerated image processing on FPGAs. (Tech: C++, CMake, Buildroot, TensorRT, Deepstream, GStreamer, Python)",
      logoPath: "/logos/hensoldt-logo.png" // ASSUMED PATH: Add your logo file path here
    },
  ],
  education: [
    { 
        school: "Technische Universität München", 
        degree: "Master of Science - Robotics, Cognition and Intelligence", 
        year: "10/2022 - 09/2025", 
        logoPath: "/logos/tum-logo.svg",
        programUrl: "https://www.tum.de/studium/studienangebot/detail/robotics-cognition-intelligence-master-of-science-msc"
    }, 
    { 
        school: "Hochschule Aalen", 
        degree: "Bachelor of Science - Informatik / Software Engineering", 
        year: "10/2018 - 09/2022", 
        logoPath: "/logos/hs-aalen-logo.png",
        programUrl: "https://www.hs-aalen.de/de/courses/48/info" // ADDED LINK
    }, 
  ],
  projects: [
    { 
      title: "Company Research Agent", 
      cat: "AI / Agents", 
      desc: "An automated research tool built with Google ADK. It performs web searches, summarizes findings, and generates detailed interview reports and tailored questions.",
      techStack: ["Google ADK", "Python", "LLMs", "Streamlit"], // NEW
      imagePath: "", // NEW: Add your image paths here
      url: "https://github.com/mischlox" // Update with actual link if available
    },
    { 
      title: "Face Touching Detector", 
      cat: "Computer Vision", 
      desc: "Desktop-App for real-time face touch detection using YOLOv5m (Libtorch C++) with QT5-GUI. Optimized for low-latency inference on standard CPU hardware.",
      techStack: ["C++", "Qt5", "Libtorch", "YOLOv5", "OpenCV"], // NEW
      imagePath: "", 
      url: "https://github.com/mischlox/face-touching-detector"
    },
    { 
      title: "AR Object Recognition", 
      cat: "Mobile / AI", 
      desc: "Android app for real-time object recognition and learning using the smartphone camera. Utilizes Continual Learning strategies with MobilenetV2 to learn new objects on the fly.",
      techStack: ["Android (Java)", "TensorFlow Lite", "Computer Vision", "Continual Learning"], // NEW
      imagePath: "",
      url: "https://github.com/mischlox/AR-App-Object-Recognition"
    },
    { 
      title: "Employee Time Tracking", 
      cat: "Software Engineering", 
      desc: "Full-stack desktop tool for employee time tracking, login systems, admin dashboard, and vacation management. Currently deployed and productive in 3 supermarket branches.",
      techStack: ["C#", ".NET", "WPF", "SQL", "MVVM"], // NEW
      imagePath: "", // Leave empty to test the placeholder
      url: "" 
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