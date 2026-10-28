import React from 'react';
import './balloon-flow.css';

function paletteVariables(palette) {
 return {'--scene':palette[1],'--accent':palette[2],'--secondary':palette[3],'--gold':palette[4]};
}

function ThemePanel({index,themes,current,moving,onNext,onFinish,Message}) {
 const isFinale=index===themes.length;
 const palette=isFinale?['Birthday reveal','#fff1ec','#bd2e52','#ff9c83','#f6c44f','✧']:themes[index];
 const symbol=palette[5];
 return <section className={`balloon-panel ${current?'panel-current':'panel-incoming'}`} style={paletteVariables(palette)} aria-hidden={!current} inert={!current} onTransitionEnd={event=>{if(current&&event.target===event.currentTarget&&event.propertyName==='transform')onFinish()}}>
  <div className="theme-paint" aria-hidden="true"/>
  {!isFinale&&<>
   <div className={`scene balloon-scene ${index===0?'scene-opening':'scene-balloon-only'}`}>
    <span className="floating-symbol s1" aria-hidden="true">{symbol}</span><span className="floating-symbol s2" aria-hidden="true">{symbol}</span><span className="floating-symbol s3" aria-hidden="true">✧</span>
    {index===0&&<div className="intro-copy"><Message/></div>}
    <div className="balloon-stage"><button className="balloon-button" onClick={onNext} disabled={moving||!current} tabIndex={current?0:-1} aria-label={`Thả bóng bay ${index+1} trên ${themes.length}`}>
     <span className="balloon-flight"><span className="balloon-idle"><span className="balloon"><span className="balloon-print" aria-hidden="true"><span className="balloon-number">{index+1}</span>{Array.from({length:index%3===0?3:4},(_,i)=><span key={i} className={`balloon-motif motif-${i+1}`}>{symbol}</span>)}</span><span className="shine"/></span><svg className="string" width="55" height="126" viewBox="0 0 55 126" aria-hidden="true"><path d="M27 0C0 35 55 56 27 88S29 112 23 126" fill="none" stroke="currentColor"/></svg></span></span>
     {index===0&&<span className="tap-label">chạm để thả bay ↑</span>}
    </button></div>
   </div>
   <footer className="intro-footer"><div className="progress" aria-label={`Bóng ${index+1} trên ${themes.length}`}>{themes.map((theme,i)=><span key={i} style={{background:i<=index?theme[2]:undefined}}/>)}</div></footer>
  </>}
 </section>
}

export default function BalloonFlow({step,themes,moving,onNext,onFinish,duration,Message}) {
 return <main className={`intro balloon-viewport ${moving?'is-moving':''}`} style={{'--flight-duration':`${duration}ms`,'--resting-scene':themes[step][1]}}>
   <ThemePanel key={`panel-${step}`} index={step} themes={themes} current moving={moving} onNext={onNext} onFinish={onFinish} Message={Message}/>
   <ThemePanel key={`panel-${step+1}`} index={step+1} themes={themes} current={false} moving={moving} onNext={onNext} onFinish={onFinish} Message={Message}/>
 </main>
}
