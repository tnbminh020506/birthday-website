// Synthesized balloon-popper sounds: no downloads or third-party audio.
export function createPartyAudio() {
 const AudioContextClass=window.AudioContext||window.webkitAudioContext;
 if(!AudioContextClass)return null;
 try {
  const context=new AudioContextClass();
  const master=context.createGain();master.gain.value=.38;
  const compressor=context.createDynamicsCompressor();
  master.connect(compressor);compressor.connect(context.destination);
  return {context,master};
 } catch {return null}
}

export function playPartyPops(audio,delay=0,count=12) {
 if(!audio)return;
 const {context,master}=audio;
 // Resume during the actual tap, before waiting for the visual transition.
 context.resume().then(()=>{
  const start=context.currentTime+delay;
  for(let i=0;i<count;i++){
   const at=start+i*.135+(i%3)*.025;
   const buffer=context.createBuffer(1,Math.ceil(context.sampleRate*.12),context.sampleRate);
   const data=buffer.getChannelData(0);
   for(let j=0;j<data.length;j++)data[j]=(Math.random()*2-1)*Math.exp(-j/(context.sampleRate*.024));
   const noise=context.createBufferSource();noise.buffer=buffer;
   const filter=context.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1300+i%4*450;
   const gain=context.createGain();gain.gain.setValueAtTime(.001,at);gain.gain.exponentialRampToValueAtTime(.8,at+.003);gain.gain.exponentialRampToValueAtTime(.001,at+.12);
   noise.connect(filter);filter.connect(gain);gain.connect(master);noise.start(at);
   const thump=context.createOscillator();const envelope=context.createGain();
   thump.frequency.setValueAtTime(180+i%3*30,at);thump.frequency.exponentialRampToValueAtTime(45,at+.09);
   envelope.gain.setValueAtTime(.3,at);envelope.gain.exponentialRampToValueAtTime(.001,at+.1);
   thump.connect(envelope);envelope.connect(master);thump.start(at);thump.stop(at+.12);
   noise.onended=()=>{noise.disconnect();filter.disconnect();gain.disconnect()};
   thump.onended=()=>{thump.disconnect();envelope.disconnect()};
  }
 }).catch(()=>{});
}

// Keep both music channels behind the master mute control.
export function startBirthdayBeat(audio) {
 if(!audio)return;
 const {context,master}=audio;
 context.resume().catch(()=>{});
 if(audio.music)return;
 // Retire players created by an older preview version before starting this mix.
 audio.musicSource?.stop();audio.musicSource?.disconnect();audio.musicSource=null;
 if(audio.beatTimer){clearInterval(audio.beatTimer);audio.beatTimer=null}
 const beat=context.createGain(),box=context.createGain();
 beat.gain.value=.22;box.gain.value=0;beat.connect(master);box.connect(master);
 const music=audio.music={beat,box,target:'beat',buffer:null,source:null,disposed:false};
 const notes=[72,null,76,79,81,null,79,76,74,null,77,81,79,null,76,74,72,null,76,79,84,null,81,79,77,null,76,74,72,null,79,null];
 const length=60/104/2;let step=0,next=context.currentTime+.08;
 function tone(freq,at,duration,level,type='sine',end){
  const oscillator=context.createOscillator(),gain=context.createGain();oscillator.type=type;oscillator.frequency.setValueAtTime(freq,at);
  if(end)oscillator.frequency.exponentialRampToValueAtTime(end,at+duration);
  gain.gain.setValueAtTime(.001,at);gain.gain.exponentialRampToValueAtTime(level,at+.008);gain.gain.exponentialRampToValueAtTime(.001,at+duration);
  oscillator.connect(gain);gain.connect(beat);oscillator.start(at);oscillator.stop(at+duration+.01);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect()};
 }
 function schedule(){
  if(context.state!=='running')return;
  if(next<context.currentTime-.1){const missed=Math.ceil((context.currentTime+.04-next)/length);step+=missed;next+=missed*length}
  while(next<context.currentTime+.2){
   const position=step%32,note=notes[position];
   if(music.target==='beat'||beat.gain.value>.001){
    if(note)tone(440*2**((note-69)/12),next,.24,.25,'triangle');
    if(step%2===0)tone(130,next,.15,.7,'sine',42);
    if(step%4===2)tone(185,next,.075,.17,'triangle',95);
    tone(6500,next,.025,.025,'square');
    if(step%8===0)tone([130.81,174.61,146.83,196][Math.floor(position/8)],next,.45,.32);
   }
   next+=length;step++;
  }
 }
 context.resume().then(schedule).catch(()=>{});const interval=setInterval(schedule,70);
 audio.stopBeat=()=>{music.disposed=true;clearInterval(interval);music.source?.stop();beat.disconnect();box.disconnect()};
 fetch('/audio/happy-birthday-music-box.mp3').then(response=>{if(!response.ok)throw new Error('Music unavailable');return response.arrayBuffer()}).then(buffer=>context.decodeAudioData(buffer)).then(buffer=>{
  if(music.disposed)return;music.buffer=buffer;if(music.target==='card')transitionToCardMusic(audio);
 }).catch(()=>{audio.onMusicChange?.('error')});
}
function fadeChannel(context,gain,value){
 const now=context.currentTime;gain.cancelScheduledValues(now);gain.setValueAtTime(gain.value,now);gain.linearRampToValueAtTime(value,now+2);
}
export function transitionToCardMusic(audio){
 if(!audio)return;startBirthdayBeat(audio);const music=audio.music;music.target='card';
 // Keep the old beat audible until the new recording has loaded.
 if(!music.buffer||music.disposed)return;
 if(!music.source){const source=audio.context.createBufferSource();source.buffer=music.buffer;source.loop=true;source.connect(music.box);source.start();music.source=source}
 fadeChannel(audio.context,music.beat.gain,0);fadeChannel(audio.context,music.box.gain,.65);
 audio.onMusicChange?.('card');
}
export function transitionToBalloonMusic(audio){
 if(!audio)return;startBirthdayBeat(audio);const music=audio.music;music.target='beat';
 fadeChannel(audio.context,music.beat.gain,.22);fadeChannel(audio.context,music.box.gain,0);
 audio.onMusicChange?.('beat');
}
