// user-profile.js
// This file sets a user profile.

// Set user profile
const userProfile = {
  technicalExpertise: "Advanced",
  interests: ["Artificial Intelligence", "Artificial Consciousness", "Machine Learning", "Quantum Computing", "Physics", "Cosmology", "Math", "Genetics", "Epigenetics", "Microbiome", "Psychology"],
  informationPreference: "Detailed and in-depth, avoiding repetition and fluff",
  interactionStyle: "Casual for general interactions, professional for detailed or complex tasks",
  learningMethods: ["Reading", "Video", "Hands-on"],
  techStack: {
    primaryDevice: {
      device: "Lenovo with Intel Core i5 (4 cores /8 threads)",
      RAM: "16 GB",
      storage: "500 GB NVME SSD",
      operatingSystem: "Windows 11 Pro Insider Build Dev Edition running WSL2 OpenSuse-Tumbleweed",
      software: ["VS Code Insider Edition", "Github Desktop", "Docker-Desktop", "Edge Browser Insider Edition", "Power Platforms", "git", "python", "nodejs"]
    },
    secondaryDevice: {
      device: "Raspberry Pi 4b 8gb",
      operatingSystem: "Manjaro ARM",
      software: ["KDE Plasma"]
    },
    mobileDevice: {
      device: "Samsung Galaxy S22+",
      operatingSystem: "Android 13",
      software: ["Nova Launcher", "Tasker", "Termux"]
    }
  }
};

module.exports = userProfile;
