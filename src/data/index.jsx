import { Radio, Monitor, Zap, Code, Microchip, Layers, Wifi, Activity, Terminal } from "lucide-react";

export const projects = [
  {
    title: "Drone Battery Digital Twin",
    description: "Hybrid digital twin system for real-time monitoring and predictive maintenance of drone battery health.",
    tech: ["ROS", "MAVROS", "Pixhawk", "Raspberry Pi"],
    icon: <Radio className="text-cyan-600 mb-2" size={28} />,
    status: "ONLINE",
    github: "#",
  },
  {
    title: "RP2040 OLED Interface",
    description: "High-speed SPI OLED telemetry dashboard providing live sensor data visualization using RP2040 microcontroller.",
    tech: ["RP2040", "SPI", "MicroPython", "C++"],
    icon: <Monitor className="text-purple-600 mb-2" size={28} />,
    status: "DEPLOYED",
    github: "#",
  },
  {
    title: "High-Performance FPV Drone",
    description: "Custom FPV quadcopter with embedded flight control, real-time telemetry, and high-performance brushless propulsion.",
    tech: ["Embedded C", "I2C/SPI", "IoT", "Sensors"],
    icon: <Zap className="text-cyan-600 mb-2" size={28} />,
    status: "ACTIVE",
    github: "#",
  },
];

export const skills = [
  { name: "Embedded C/C++", icon: <Code size={20} /> },
  { name: "Microcontrollers", icon: <Microchip size={20} /> },
  { name: "ROS / MAVROS", icon: <Layers size={20} /> },
  { name: "IoT Architecture", icon: <Wifi size={20} /> },
  { name: "Sensor Fusion", icon: <Activity size={20} /> },
  { name: "Linux Systems", icon: <Terminal size={20} /> },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/senti67' },
  { name: 'LinkedIn', url: 'www.linkedin.com/in/rajdweep-borah-33839832a' },
];