import React from 'react';
import './birthday.css';

// Replace these paths with your own character/sticker images later.
export const classicStickers = [
  { src: '/stickers/cake.svg', label: 'Bánh sinh nhật', caption: 'make a wish', kind: 'cake' },
  { src: '/stickers/bear.svg', label: 'Gấu ôm trái tim', caption: 'a bear hug for you', kind: 'bear' },
  { src: '/stickers/hat.svg', label: 'Mũ sinh nhật', caption: 'party time!', kind: 'hat' },
  { src: '/stickers/heart.svg', label: 'Trái tim có cánh', caption: 'all the love', kind: 'heart' },
  { src: '/stickers/candles.svg', label: 'Những ngọn nến', caption: 'a little sparkle', kind: 'candles' },
  { src: '/stickers/bunny.svg', label: 'Thỏ và ngôi sao', caption: 'you are a star', kind: 'bunny' },
  { src: '/stickers/gift.svg', label: 'Hộp quà', caption: 'something sweet', kind: 'gift' },
  { src: '/stickers/cherries.svg', label: 'Đôi cherry', caption: 'sweetest day', kind: 'cherries' },
];

export const miyuStickers = [
 {src:'/stickers/miyu/peace.png',label:'Miyu Suzuki giơ hai dấu V',caption:'a little hello',kind:'miyu-peace',pack:'miyu'},
 {src:'/stickers/miyu/confused.png',label:'Miyu Suzuki ngơ ngác',caption:'huh?',kind:'miyu-confused',pack:'miyu'},
 {src:'/stickers/miyu/love.png',label:'Miyu Suzuki với đôi mắt trái tim',caption:'all heart eyes',kind:'miyu-love',pack:'miyu'},
 {src:'/stickers/miyu/flustered.png',label:'Miyu Suzuki bối rối',caption:'a little shy',kind:'miyu-flustered',pack:'miyu'},
 {src:'/stickers/miyu/cute.png',label:'Miyu Suzuki vui vẻ',caption:'so, so cute',kind:'miyu-cute',pack:'miyu'},
 {src:'/stickers/miyu/surprised.png',label:'Miyu Suzuki ngạc nhiên',caption:'surprise!',kind:'miyu-surprised',pack:'miyu'},
 {src:'/stickers/miyu/happy.png',label:'Miyu Suzuki reo mừng',caption:'yay, your day!',kind:'miyu-happy',pack:'miyu'},
 {src:'/stickers/miyu/pout.png',label:'Miyu Suzuki phụng phịu',caption:'just a little pout',kind:'miyu-pout',pack:'miyu'},
 {src:'/stickers/miyu/play.png',label:'Miyu Suzuki rủ đi chơi',caption:'let’s make memories',kind:'miyu-play',pack:'miyu'},
];
export const pusheenStickers = [
 {src:'/stickers/pusheen/birthday.png',label:'Pusheen bên bánh sinh nhật',caption:'a slice of happiness',kind:'pusheen-birthday',pack:'pusheen'},
 {src:'/stickers/pusheen/party.png',label:'Pusheen đội mũ tiệc',caption:'let’s celebrate',kind:'pusheen-party',pack:'pusheen'},
 {src:'/stickers/pusheen/heart.png',label:'Pusheen trong trái tim hồng',caption:'sending you love',kind:'pusheen-heart',pack:'pusheen'},
 {src:'/stickers/pusheen/sleep.png',label:'Pusheen ngủ ngon',caption:'sweet little dreams',kind:'pusheen-sleep',pack:'pusheen'},
 {src:'/stickers/pusheen/love.png',label:'Pusheen và trái tim nhỏ',caption:'a tiny bit of love',kind:'pusheen-love',pack:'pusheen'},
 {src:'/stickers/pusheen/knitting.gif',label:'Pusheen đan khăn len hồng',caption:'cozy little moments',kind:'pusheen-knitting',pack:'pusheen'},
 {src:'/stickers/pusheen/purple-blanket.png',label:'Pusheen trong chăn tím',caption:'so cozy',kind:'pusheen-purple-blanket',pack:'pusheen'},
 {src:'/stickers/pusheen/christmas-gifts.png',label:'Pusheen cạnh quà và cây thông',caption:'little holiday joy',kind:'pusheen-christmas-gifts',pack:'pusheen'},
 {src:'/stickers/pusheen/unicorn.png',label:'Pusheenicorn trắng',caption:'a little magic',kind:'pusheen-unicorn',pack:'pusheen'},
];
export const birthdayStickers = [...classicStickers,...miyuStickers,...pusheenStickers];
const stickerPacks=[{name:'(random stickers ming trang trí thui nhenn)',items:classicStickers},{name:'Miyu Suzuki',items:miyuStickers},{name:'Pusheen',items:pusheenStickers}];
// Alternate packs so every wave contains all three collections.
const burstStickers=Array.from({length:Math.max(...stickerPacks.map(pack=>pack.items.length))},(_,i)=>stickerPacks.flatMap(pack=>pack.items[i]?[pack.items[i]]:[])).flat();
const heroStickers=[classicStickers[0],classicStickers[2],classicStickers[3],classicStickers[4],{...miyuStickers[0],slot:'bear'},{...pusheenStickers[0],slot:'bunny'},{...miyuStickers[6],slot:'gift'},{...pusheenStickers[2],slot:'cherries'}];
export const photoStickers=[miyuStickers[2],pusheenStickers[0],classicStickers[5],miyuStickers[6]];
export const wishStickers=[miyuStickers[2],miyuStickers[0],pusheenStickers[2]];

export function StickerCollection(){
 return <section className="sticker-collection" aria-label="Bộ sưu tập sticker"><p className="handwritten">một vài random sticker ming nghĩ ngay tới ýn</p>{stickerPacks.map(pack=><div className="sticker-pack" key={pack.name}><h3>{pack.name}</h3><div className="sticker-pack-images">{pack.items.map(sticker=><img key={sticker.kind} src={sticker.src} alt={sticker.label} loading="lazy"/>)}</div></div>)}</section>
}

export function BirthdayBurst() {
 return <div className="birthday-burst" role="status">
  <span className="sr-only">Bất ngờ! Mở thiệp chúc mừng sinh nhật.</span>
  <div className="burst-halo" aria-hidden="true"/>
  <div className="burst-ring" aria-hidden="true"/>
  <div className="burst-ring ring-two" aria-hidden="true"/>
  <div className="burst-icons" aria-hidden="true">{Array.from({length:40},(_,i)=>{
   const angle=i*2.39996, distance=28+(i%4)*13;
   return <img key={i} src={burstStickers[i%burstStickers.length].src} alt="" className="burst-sticker" style={{'--x':`${Math.cos(angle)*distance}vw`,'--y':`${Math.sin(angle)*distance}vh`,'--spin':`${(i%2?1:-1)*(100+i*13)}deg`,'--delay':`${(i%10)*.075}s`,'--size':`${54+(i%4)*16}px`}}/>
  })}</div>
  <div className="confetti-cloud" aria-hidden="true">{Array.from({length:90},(_,i)=><i key={i} style={{'--left':`${(i*37)%101}%`,'--delay':`${(i%18)*.06}s`,'--color':['#e65078','#f6c754','#f78f72','#b6a1e4','#d23953','#fbe4aa'][i%6],'--spin':`${i*43}deg`,'--sway':`${(i%7-3)*28}px`}}/>)}</div>
 </div>
}

export function BirthdayHero({name,celebrating,onReplay}) {
 return <div className={`birthday-reveal ${celebrating?'is-revealing':''}`}>
  <div className="birthday-stickerboard">
   <div className="birthday-garland" aria-hidden="true">{Array.from({length:11},(_,i)=><i key={i}/>)}</div>
   <span className="party-spark spark-one" aria-hidden="true">✦</span><span className="party-spark spark-two" aria-hidden="true">✳</span><span className="party-spark spark-three" aria-hidden="true">✧</span>
   <div className="birthday-frame">
    <span className="frame-tape" aria-hidden="true"/>
    <span className="birthday-frame-note">a very special day, for a very special you</span>
    <h1><span>CHÚC MỪNG</span><span>SINH NHẬT</span><strong>{name}</strong></h1>
    <div className="birthday-flourish" aria-hidden="true"><span/>♡<span/></div>
    <p>Hôm nay là ngày đặc biệt của em đóa!!!</p>
    <span className="frame-kiss" aria-hidden="true">with love, always</span>
   </div>
   {heroStickers.map((sticker,i)=><figure key={sticker.kind} data-pack={sticker.pack||'classic'} className={`party-cutout cutout-${sticker.slot||sticker.kind}`} style={{'--order':i}}><img src={sticker.src} alt={sticker.label}/><figcaption>{sticker.caption}</figcaption></figure>)}
   <span className="birthday-seal" aria-hidden="true">100%<br/><b>made with love</b><br/>♡</span>
  </div>
  <button className="replay-surprise" disabled={celebrating} onClick={onReplay}>Bung quà lần nữa <span aria-hidden="true">↗</span></button>
 </div>
}
