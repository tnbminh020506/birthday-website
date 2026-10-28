import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import './palette.css';
import { BirthdayBurst, BirthdayHero, StickerCollection, photoStickers, wishStickers } from './birthday.jsx';
import { createPartyAudio, playPartyPops, startBirthdayBeat, transitionToCardMusic, transitionToBalloonMusic } from './party-audio.js';
import BalloonFlow from './balloon-flow.jsx';
import Countdown from './countdown.jsx';
import myFavouritePlace from '../assets/my_favourite_place.jpg';
import youAndMe from '../assets/you_and_me.jpg';
import aLittleSunshine from '../assets/a_little_sunshine.jpg';
import moreDaysLikeThis from '../assets/more_days_like_this.jpg';

const BALLOON_FLIGHT_MS = 1200;
const LAUNCH_AT = Date.parse('2026-10-29T07:00:00+07:00');

// Thay tên, lời chúc và đường dẫn ảnh tại đây.
const gift = {
  name: 'PHẠM HẢI YẾN',
  photos: [myFavouritePlace, youAndMe, aLittleSunshine, moreDaysLikeThis],
  wishes: [
    { chapter: '01', title: 'Chúc Ýn luôn luôn mỉm cười', text: 'Ming chúc Ýn tuổi mới luôn có gặp được thêm nhiều điều vui vẻ trong cuộc sống, luôn nở một nụ cười thật tươi mỗi cuối ngày dài.', label: 'Wish you all the happiness', icon: '☀' },
    { chapter: '02', title: 'Ming chúc em sống thật ý nghĩa', text: 'Dù cho có gặp những khó khăn như nào, ming luôn ở bên cạnh em và luôn hỗ trợ và ủng hộ em đạt được những mục tiêu của bản thân trong cuộc sống. Mong em luôn giữ được những đam mê củatuổi trẻ nhen.', label: 'Always keep your spirit', icon: '✿' },
    { chapter: '03', title: 'Và luôn iu mingg', text: 'Ming cảm ơn Ýn vì đã đến với cuộc sống của mingg. Ming rất là vui và luôn trân trọng điều đóa. Tuổi mới vẫn iu ming nhén!! Hjhjhj', label: 'Love youuu', icon: '♡' },
  ],
};
const themes = [
 // Tên, nền, màu bóng, màu phối, màu trang trí, họa tiết.
 ['Rose confetti', '#ffe2e9', '#bf3056', '#fa8c91', '#f7c85c', '✿'],
 ['Blue sky', '#e0f1ff', '#347fc2', '#84c9f1', '#ffcf68', '☁'],
 ['Peach sunrise', '#fff0d7', '#e18032', '#ffbd7b', '#ef8d9c', '☀'],
 ['Lavender dream', '#eee4ff', '#8d55c0', '#c19bef', '#84cfc6', '❋'],
 ['Mint confetti', '#dff8ec', '#259b85', '#88dec3', '#ffc66a', '✧'],
 ['Apricot love', '#ffe2ce', '#dd674a', '#f6a78b', '#a6b6ef', '♡'],
 ['Raspberry ribbon', '#ffdeef', '#c14391', '#f393c7', '#91d5e0', '✷'],
 ['Moonlight', '#e2e6ff', '#6268be', '#a3b0ef', '#f5d77d', '☾'],
 ['Lemon garden', '#fff7ce', '#c09924', '#f3d66b', '#9ccfa4', '✿'],
 ['Ocean breeze', '#d9f6f5', '#228baf', '#72d5da', '#ffb996', '≈'],
 ['Candy hearts', '#ffe6ed', '#d44e75', '#ffabbc', '#c5b2f5', '♡'],
 ['Pistachio picnic', '#ecf4d8', '#7e9e40', '#c0d98b', '#ffc481', '❋'],
 ['Coral sunset', '#ffe1cf', '#db6259', '#ffa286', '#edc35c', '☀'],
 ['Violet sparkle', '#f0e0fc', '#a04bc0', '#d39aeb', '#83d7c8', '✧'],
 ['Melon kiss', '#e1f7e1', '#44a86e', '#a0dfac', '#f6bd7d', '♡'],
 ['Rainy afternoon', '#e2eff9', '#548aaf', '#9fc8df', '#bba0e3', '☂'],
 ['Amber sparkle', '#ffedce', '#cf8c26', '#f5c76f', '#f29da8', '✦'],
 ['Periwinkle petals', '#e7e5fc', '#7775ce', '#b7aff1', '#f8c192', '✿'],
 ['Scarlet promise', '#ffe4db', '#cd3c51', '#f78d9d', '#f0bd50', '♡'],
 ['Birthday bouquet', '#ffe4e9', '#bd2e52', '#ff9c83', '#f6c44f', '✧'],
];
function WavyMessage() {
 return <h1 className="wavy-message"><span className="sr-only">Hôm nay người bí ẩn có quà cho bạn</span>
  <svg className="wave-desktop" viewBox="0 0 1200 180" aria-hidden="true">
   <defs><path id="message-wave" d="M 30 100 Q 172 35 315 100 T 600 100 T 885 100 T 1170 100"/><linearGradient id="message-ink" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#ab214e"/><stop offset=".5" stopColor="#df4a50"/><stop offset="1" stopColor="#a52750"/></linearGradient></defs>
   <text fill="url(#message-ink)"><textPath href="#message-wave" startOffset="50%" textAnchor="middle" textLength="1100" lengthAdjust="spacing">Hôm nay người bí ẩn có quà cho bạn</textPath></text>
  </svg>
  <svg className="wave-mobile" viewBox="0 0 600 245" aria-hidden="true">
   <defs><path id="message-wave-top" d="M 20 92 Q 90 47 160 92 T 300 92 T 440 92 T 580 92"/><path id="message-wave-bottom" d="M 20 193 Q 90 148 160 193 T 300 193 T 440 193 T 580 193"/></defs>
   <text fill="#b52e54"><textPath href="#message-wave-top" startOffset="50%" textAnchor="middle" textLength="530" lengthAdjust="spacing">Hôm nay người bí ẩn</textPath></text>
   <text fill="#d7494d"><textPath href="#message-wave-bottom" startOffset="50%" textAnchor="middle" textLength="420" lengthAdjust="spacing">có quà cho bạn</textPath></text>
  </svg>
 </h1>
}
function Photo({index, className='', caption}) {
 const [src,setSrc]=useState(gift.photos[index]); const input=useRef();
 useEffect(()=>()=>{if(src?.startsWith('blob:')) URL.revokeObjectURL(src)},[src]);
 return <button className={`polaroid ${className}`} onClick={()=>input.current.click()} aria-label={`Chọn ảnh ${index+1}`}><div className={`photo-space photo-${index}`}>{src?<img src={src} alt={`Kỷ niệm ${index+1}`}/>:<div className="photo-placeholder"><img className="demo-photo" src={photoStickers[index].src} alt={photoStickers[index].label}/><small>chạm để thay ảnh</small><i>＋</i></div>}</div><span className="photo-caption">{caption}</span><input ref={input} type="file" accept="image/*" hidden onClick={e=>e.stopPropagation()} onChange={e=>{const file=e.target.files?.[0];if(file)setSrc(URL.createObjectURL(file))}}/></button>
}
function App(){
 const [step,setStep]=useState(0),[intro,setIntro]=useState(true),[moving,setMoving]=useState(false),[celebrating,setCelebrating]=useState(false);
 const [remaining,setRemaining]=useState(()=>Math.max(0,LAUNCH_AT-Date.now()));
 const unlocked=remaining===0;
 const timer=useRef(); const audio=useRef(null); const transitioning=useRef(false);
 const [muted,setMuted]=useState(false);
 const [musicStage,setMusicStage]=useState('beat');
 useEffect(()=>{
  if(unlocked)return;
  const update=()=>setRemaining(Math.max(0,LAUNCH_AT-Date.now()));
  const tick=setInterval(update,1000);
  const opening=setTimeout(update,Math.min(LAUNCH_AT-Date.now(),2147483647));
  document.addEventListener('visibilitychange',update);
  return ()=>{clearInterval(tick);clearTimeout(opening);document.removeEventListener('visibilitychange',update)};
 },[unlocked]);
 useEffect(()=>()=>{clearTimeout(timer.current);audio.current?.stopBeat?.();audio.current?.context.close().catch(()=>{});audio.current=null},[]);
 function ensureAudio(){
  if(!audio.current){
   audio.current=createPartyAudio();
   if(audio.current){
    audio.current.onMusicChange=setMusicStage;
    audio.current.master.gain.value=muted?0:.38;
    startBirthdayBeat(audio.current);
   }
  }
  return audio.current;
 }
 function toggleSound(){
  ensureAudio();
  if(audio.current)audio.current.master.gain.value=muted ? .38 : 0;
  setMuted(value=>!value);
 }
 useEffect(()=>{
  if(!celebrating)return;
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const revealTimer=setTimeout(()=>{setCelebrating(false);transitionToCardMusic(audio.current)},3500);
  return ()=>{clearTimeout(revealTimer);document.body.style.overflow=previousOverflow};
 },[celebrating]);
 function playSurprise(delay=0){
  ensureAudio();
  playPartyPops(audio.current,delay);
 }
 function replaySurprise(){if(celebrating)return;window.scrollTo(0,0);transitionToBalloonMusic(audio.current);playSurprise();setCelebrating(true)}
 function finishScene(){
  if(!transitioning.current)return;
  clearTimeout(timer.current);
  if(step===themes.length-1){playSurprise();setIntro(false);setCelebrating(true);window.scrollTo(0,0)}
  else setStep(previous=>previous+1);
  transitioning.current=false;
  setMoving(false);
 }
 function next(){
  if(transitioning.current)return;
  transitioning.current=true;
  setMoving(true);
  ensureAudio();
  playPartyPops(audio.current,0,1);
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  timer.current=setTimeout(finishScene,reducedMotion?0:BALLOON_FLIGHT_MS+120);
 }
 function replay(){transitionToBalloonMusic(audio.current);clearTimeout(timer.current);transitioning.current=false;setCelebrating(false);setMoving(false);setStep(0);setIntro(true);window.scrollTo(0,0)}
 return unlocked?<><button className="sound-toggle" data-music={musicStage} title={musicStage==="card"?"Đang phát: hộp nhạc OtoLogic":musicStage==="error"?"Không tải được hộp nhạc":"Đang phát: beat bóng bay"} onClick={toggleSound} aria-label={muted?"Bật âm thanh":"Tắt âm thanh"} aria-pressed={muted}>{muted?"♫ Bật âm":"♫ Tắt âm"}</button>{celebrating&&<BirthdayBurst/>}{intro?<BalloonFlow step={step} themes={themes} moving={moving} onNext={next} onFinish={finishScene} duration={BALLOON_FLIGHT_MS} Message={WavyMessage}/>:<main className="keepsake"><header className="site-header"><a className="brand" href="#home">a little love letter <span>♡</span></a><nav><a href="#memories">Kỷ niệm</a><a href="#wishes">Lời chúc</a><button onClick={replay}>Thả bóng lại ↗</button></nav></header>
 <section className="birthday-section" id="home"><BirthdayHero name={gift.name} celebrating={celebrating} onReplay={replaySurprise}/>
 <div className="scrapbook" id="memories"><span className="scribble scribble-left">một vài kỉ niệm<br/>của em nè</span><span className="tape tape-one"/><Photo index={0} className="main-photo" caption="my favorite place is next to you ♡"/><Photo index={1} className="side-photo left-photo" caption="you & me"/><Photo index={2} className="side-photo right-photo" caption="a little sunshine ☀"/><Photo index={3} className="side-photo bottom-photo" caption="more days like this"/><span className="sticker">made of<br/><b>little moments</b></span><span className="doodle-heart">♡</span><span className="scribble scribble-right">our little<br/>collection of happiness</span></div>
 <StickerCollection/></section>
 <section className="wishes-section" id="wishes"><div className="eyebrow">CHAPTER LOVE · FROM THE HEART</div><h2>New year,<br/><em>same you</em></h2><p className="section-note">Bước sang tuổi mới, ming chúc em hàng vạn điều tốt đẹp!</p><div className="timeline">{gift.wishes.map((w,i)=><article className={`wish ${i%2?'reverse':''}`} key={w.chapter}><div className="wish-copy"><span className="chapter">WISH {w.chapter} <span> / ♡</span></span><h3>{w.title}</h3><p>{w.text}</p><span className="signature">with all my love</span></div><div className="timeline-dot">{w.icon}</div><div className="anime-card character-card"><img src={wishStickers[i%wishStickers.length].src} alt={wishStickers[i%wishStickers.length].label} loading="lazy"/><span>{w.label}</span></div></article>)}</div></section>
 <section className="final-note"><span>♡</span><h2 className="long-message">(Trailer 5 tháng ít tuổi hơn <em>"anh ming"</em> đã hết kikiki giờ Ýn lại già bằng ming rùii nhénn)</h2><span className="handwritten">Wish you all the best from my heart!</span><a href="#home">Về đầu trang ↑</a></section><footer className="end-footer"><span>A LITTLE LOVE LETTER</span><span>Made just for you ♡ · <a href="https://otologic.jp/free/bgm/music_box-event-birthday01.html" target="_blank" rel="noreferrer">Music: OtoLogic</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a></span></footer>
 </main>}</>:<Countdown remaining={remaining} onPreview={()=>setRemaining(0)}/>;
}
createRoot(document.getElementById('root')).render(<App/>);




