import './Marquee.css';

const ITEMS = [
  'Embedded C','STM32','Drone Systems','FreeRTOS',
  'PCB Design','IoT','OpenCV','MAVLink',
  'KiCad','Python','TinyML','MQTT',
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
