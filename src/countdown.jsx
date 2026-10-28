import React from 'react';
import './countdown.css';

function partsFromMilliseconds(milliseconds) {
 const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
 return [
  Math.floor(seconds / 86400),
  Math.floor(seconds / 3600) % 24,
  Math.floor(seconds / 60) % 60,
  seconds % 60,
 ];
}

export default function Countdown({remaining,onPreview}) {
 const values = partsFromMilliseconds(remaining);
 const labels = ['ngày', 'giờ', 'phút', 'giây'];
 return <main className="countdown-page">
  <span className="countdown-star countdown-star-one" aria-hidden="true">✦</span>
  <span className="countdown-star countdown-star-two" aria-hidden="true">✧</span>
  <div className="countdown-balloon countdown-balloon-one" aria-hidden="true" />
  <div className="countdown-balloon countdown-balloon-two" aria-hidden="true" />
  <section className="countdown-card" aria-label="Đếm ngược đến lúc mở quà">
   <p className="countdown-kicker">a little surprise is coming ♡</p>
   <h1>Chờ một chút nữa nhé...</h1>
   <p className="countdown-message">Món quà bí mật sẽ mở vào<br/><strong>07:00 sáng · 29/10/2026</strong></p>
   <div className="countdown-clock" role="timer" aria-label={`${values[0]} ngày ${values[1]} giờ ${values[2]} phút ${values[3]} giây còn lại`}>
    {values.map((value,index)=><div className="countdown-unit" key={labels[index]}><span>{String(value).padStart(2,'0')}</span><small>{labels[index]}</small></div>)}
   </div>
   <p className="countdown-footer">Một điều dễ thương đang đợi em ở đây ✿</p>
   {import.meta.env.DEV&&<button className="countdown-preview" type="button" onClick={onPreview}>Xem trước 20 bóng bay <span aria-hidden="true">↗</span></button>}
  </section>
 </main>;
}
