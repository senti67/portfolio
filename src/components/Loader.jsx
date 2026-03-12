import { useEffect, useRef, useState } from 'react';
import './Loader.css';
const BLIPS=[{angle:35,r:0.55},{angle:82,r:0.38},{angle:130,r:0.68},{angle:195,r:0.47},{angle:240,r:0.6},{angle:295,r:0.35},{angle:320,r:0.72},{angle:18,r:0.75}];
export default function Loader({onDone}){
  const canvasRef=useRef();
  const [label,setLabel]=useState('');
  const [labelVisible,setLabelVisible]=useState(false);
  const [exiting,setExiting]=useState(false);
  const rafRef=useRef();
  const startRef=useRef();
  const blipOp=useRef(BLIPS.map(()=>0));
  useEffect(()=>{
    const canvas=canvasRef.current;
    const ctx=canvas.getContext('2d');
    const S=canvas.width,cx=S/2,cy=S/2,R=S/2-10;
    const toRad=deg=>(deg-90)*Math.PI/180;
    const draw=(now)=>{
      if(!startRef.current)startRef.current=now;
      const elapsed=now-startRef.current;
      const sweep=((elapsed/3200)*Math.PI*2)%(Math.PI*2);
      ctx.clearRect(0,0,S,S); ctx.fillStyle='#000'; ctx.fillRect(0,0,S,S);
      [0.2,0.4,0.6,0.8,1].forEach(f=>{
        ctx.beginPath(); ctx.arc(cx,cy,R*f,0,Math.PI*2);
        ctx.strokeStyle=f===1?'rgba(255,176,0,0.35)':'rgba(255,176,0,0.1)';
        ctx.lineWidth=f===1?1.5:0.8; ctx.stroke();
      });
      for(let deg=0;deg<360;deg+=10){
        const a=toRad(deg),inner=deg%30===0?R-12:R-6;
        ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*inner,cy+Math.sin(a)*inner);
        ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);
        ctx.strokeStyle='rgba(255,176,0,0.25)'; ctx.lineWidth=deg%30===0?1.2:0.5; ctx.stroke();
      }
      [0,45,90,135].forEach(deg=>{
        const a=toRad(deg);
        ctx.beginPath(); ctx.moveTo(cx-Math.cos(a)*R,cy-Math.sin(a)*R);
        ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);
        ctx.strokeStyle='rgba(255,176,0,0.07)'; ctx.lineWidth=0.8; ctx.stroke();
      });
      const TRAIL=Math.PI*1.0;
      for(let i=0;i<48;i++){
        const frac=i/48;
        const a1=(sweep-TRAIL)+frac*TRAIL-Math.PI/2;
        const a2=(sweep-TRAIL)+(frac+1/48)*TRAIL-Math.PI/2;
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,R,a1,a2);
        ctx.closePath(); ctx.fillStyle=`rgba(255,176,0,${frac*0.14})`; ctx.fill();
      }
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.lineTo(cx+Math.cos(sweep-Math.PI/2)*R,cy+Math.sin(sweep-Math.PI/2)*R);
      ctx.strokeStyle='rgba(255,176,0,0.9)'; ctx.lineWidth=1.5;
      ctx.shadowColor='rgba(255,176,0,0.9)'; ctx.shadowBlur=10;
      ctx.stroke(); ctx.shadowBlur=0;
      ctx.beginPath(); ctx.arc(cx,cy,3,0,Math.PI*2);
      ctx.fillStyle='#ffb000'; ctx.shadowColor='#ffb000'; ctx.shadowBlur=12;
      ctx.fill(); ctx.shadowBlur=0;
      BLIPS.forEach((b,i)=>{
        const ba=toRad(b.angle)+Math.PI/2;
        let diff=sweep-ba;
        while(diff<0)diff+=Math.PI*2; while(diff>Math.PI*2)diff-=Math.PI*2;
        if(diff<0.12)blipOp.current[i]=1;
        else blipOp.current[i]=Math.max(0,blipOp.current[i]-0.006);
        const op=blipOp.current[i]; if(op<=0)return;
        const bx=cx+Math.cos(toRad(b.angle))*R*b.r;
        const by=cy+Math.sin(toRad(b.angle))*R*b.r;
        ctx.beginPath(); ctx.arc(bx,by,2.5,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,176,0,${op})`;
        ctx.shadowColor='#ffb000'; ctx.shadowBlur=op*10;
        ctx.fill(); ctx.shadowBlur=0;
      });
      if(elapsed<3600)rafRef.current=requestAnimationFrame(draw);
    };
    rafRef.current=requestAnimationFrame(draw);
    setTimeout(()=>{setLabel('SCANNING...');setLabelVisible(true);},500);
    setTimeout(()=>setLabelVisible(false),2200);
    setTimeout(()=>{setLabel('TARGET LOCATED.');setLabelVisible(true);},2700);
    setTimeout(()=>setLabelVisible(false),3400);
    setTimeout(()=>setExiting(true),3800);
    setTimeout(()=>onDone(),4600);
    return ()=>cancelAnimationFrame(rafRef.current);
  },[]);
  const isLocated=label==='TARGET LOCATED.';
  return(
    <div className={`loader ${exiting?'loader-exit':''}`}>
      <canvas ref={canvasRef} width="340" height="340" style={{width:'min(340px,85vw)',height:'min(340px,85vw)'}}/>
      <div className="loader-label" style={{color:isLocated?'#ffb000':'rgba(255,176,0,0.6)',opacity:labelVisible?1:0,textShadow:isLocated?'0 0 14px rgba(255,176,0,0.9)':'0 0 8px rgba(255,176,0,0.5)'}}>
        {label}
      </div>
    </div>
  );
}
