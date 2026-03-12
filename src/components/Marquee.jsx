import './Marquee.css';
const ITEMS=['Embedded Systems','Drone Engineering','ROS / MAVLink','Flight Controllers','IoT Firmware','PCB Design','React & Vite','Python & C++','Autonomous Systems','Sensor Fusion','Digital Twins','FPV Systems'];
export default function Marquee(){
  const d=[...ITEMS,...ITEMS];
  return(
    <div className="marquee-wrap">
      <div className="marquee-track">
        {d.map((item,i)=>(
          <div key={i} className="marquee-item"><span className="marquee-sep">◆</span>{item}</div>
        ))}
      </div>
    </div>
  );
}
