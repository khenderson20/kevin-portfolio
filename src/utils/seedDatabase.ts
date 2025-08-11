import { PortfolioService } from '../services/portfolioService';
import { Project } from '../types/portfolio';

// Sample featured projects data
const sampleFeaturedProjects: Omit<Project, 'id'>[] = [
  {
    title: "Kevin's Portfolio Website",
    tech: ["React", "TypeScript", "AWS Amplify", "GraphQL", "CSS3"],
    description: "A modern, responsive portfolio website built with React and AWS Amplify. Features a comprehensive design system, GraphQL API integration, and contemporary UI patterns with glass morphism effects.",
    metrics: "⭐ 15 stars • 🍴 3 forks",
    github: "https://github.com/khenderson20/kevin-portfolio",
    demo: "https://main.d2x8j9k4l5m3n7.amplifyapp.com",
    image: "/images/portfolio-preview.jpg",
    featured: true,
    category: "fullstack",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "React Task Management App",
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    description: "A full-stack task management application with user authentication, real-time updates, and drag-and-drop functionality. Built with modern React patterns and RESTful API design.",
    metrics: "⭐ 28 stars • 🍴 7 forks",
    github: "https://github.com/khenderson20/react-task-manager",
    demo: "https://react-task-manager-demo.netlify.app",
    image: "/images/task-manager-preview.jpg",
    featured: true,
    category: "fullstack",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    title: "Audio Visualizer Web App",
    tech: ["JavaScript", "Web Audio API", "Canvas", "CSS3", "HTML5"],
    description: "An interactive audio visualizer that creates stunning visual effects synchronized with music. Features multiple visualization modes, real-time frequency analysis, and customizable themes.",
    metrics: "⭐ 42 stars • 🍴 12 forks",
    github: "https://github.com/khenderson20/audio-visualizer",
    demo: "https://audio-visualizer-demo.vercel.app",
    image: "/images/audio-visualizer-preview.jpg",
    featured: true,
    category: "audio",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    title: "E-Commerce Dashboard",
    tech: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    description: "A comprehensive e-commerce dashboard with analytics, inventory management, and order tracking. Features real-time data visualization and responsive design for mobile and desktop.",
    metrics: "⭐ 35 stars • 🍴 8 forks",
    github: "https://github.com/khenderson20/ecommerce-dashboard",
    demo: "https://ecommerce-dashboard-demo.herokuapp.com",
    image: "/images/ecommerce-dashboard-preview.jpg",
    featured: true,
    category: "fullstack",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
  {
    title: "Mobile Weather App",
    tech: ["React Native", "TypeScript", "Redux", "OpenWeather API"],
    description: "A cross-platform mobile weather application with location-based forecasts, interactive maps, and weather alerts. Features offline caching and beautiful animations.",
    metrics: "⭐ 23 stars • 🍴 5 forks",
    github: "https://github.com/khenderson20/mobile-weather-app",
    image: "/images/weather-app-preview.jpg",
    featured: true,
    category: "mobile",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    title: "Machine Learning API",
    tech: ["Python", "TensorFlow", "Flask", "Docker", "AWS"],
    description: "A RESTful API for machine learning model inference with support for image classification and natural language processing. Deployed on AWS with auto-scaling capabilities.",
    metrics: "⭐ 31 stars • 🍴 9 forks",
    github: "https://github.com/khenderson20/ml-api",
    demo: "https://ml-api-demo.aws.com",
    image: "/images/ml-api-preview.jpg",
    featured: true,
    category: "backend",
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(), // 75 days ago
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
  }
];

export async function seedFeaturedProjects(): Promise<void> {
  // console.log removed
  
  try {
    // Check if projects already exist
    const existingProjects = await PortfolioService.getFeaturedProjects();
    
    if (existingProjects.length > 0) {
  // console.log removed
      return;
    }

    // Create each project
    const createdProjects = [];
    for (const projectData of sampleFeaturedProjects) {
  // console.log removed
      const project = await PortfolioService.createProject(projectData);
      if (project) {
        createdProjects.push(project);
  // console.log removed
      } else {
  // console.log removed
      }
    }

  // console.log removed
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Function to run seeding manually
export async function runSeed(): Promise<void> {
  try {
    await seedFeaturedProjects();
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}
