/* AP CSA practice exam engine (cyberteaches.com/apcsa/exam/1/ and /2/)
   Reads window.CSA_EXAM (exam1.js or exam2.js) and window.AP_UNITS (../../content.js). Progress stays in this browser. */
(function(){
"use strict";
var E=window.CSA_EXAM, Q=E.questions, F=E.frq, X=window.CSA, esc=X.esc, L="ABCD";
var UNITS=window.AP_UNITS||[], TOPIC={}, UNIT={};
UNITS.forEach(function(u){UNIT[u.num]="Unit "+u.num+": "+u.title;u.topics.forEach(function(t){TOPIC[t.id]=t.title;});});
var KEY="ctcsa-"+E.id+"-v1", MCQ_SECS=90*60, FRQ_SECS=90*60;
var app=document.getElementById("app"), st=null, tick=null;
var FRQ_MAX=F.reduce(function(n,f){return n+f.parts.reduce(function(m,p){return m+p.pts.length;},0);},0);

function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch(e){}}
function load(){try{var s=localStorage.getItem(KEY);return s?JSON.parse(s):null;}catch(e){return null;}}
function clear(){try{localStorage.removeItem(KEY);}catch(e){}}
function fmt(s){s=Math.max(0,Math.floor(s));var h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+":"+(m<10?"0":""):"")+m+":"+(x<10?"0":"")+x;}
function unit(q){return q.topic.split(".")[0];}
function topicLink(t){return '<a href="../../#/topic/'+t+'">Topic '+t+': '+esc(TOPIC[t]||"")+'</a>';}
function list(){return st.mode==="practice"?Q.filter(function(q){return st.units.indexOf(unit(q))>=0;}):Q;}
function picked(q){return st.ans[q.id]||"";}
function isRight(q){return picked(q)===q.ans;}
function isDone(q){return picked(q).length===1;}
function optHTML(o){return X.looksCode(o)?'<span class="optcode"><code>'+esc(o)+'</code></span>':'<span>'+esc(o)+'</span>';}
function figures(q){var h="";if(q.code)h+=X.code(q.code);if(q.stemAfter)h+='<p>'+q.stemAfter+'</p>';return h;}
function frqPts(){var n=0;Object.keys(st.pts||{}).forEach(function(k){if(st.pts[k])n++;});return n;}

/* ---------- intro ---------- */
function intro(){
  stopTick();
  var saved=load();
  var h='<div class="row">';
  h+='<button class="btn primary" id="startTimed">Start timed exam (Section I: 90 minutes)</button>';
  h+='<button class="btn" id="startUntimed">Start untimed</button></div>';
  if(saved&&saved.phase&&saved.phase!=="intro"){h+='<div class="box y"><b>You have an exam in progress in this browser.</b> <button class="btn small" id="resume">Resume</button> <button class="btn small" id="discard">Discard and start over</button></div>';}
  h+='<h3>Practice by unit (untimed, instant feedback)</h3><p>Choose the units you want, then check each answer right away. The free-response section is not included in this mode.</p><div class="row">';
  UNITS.forEach(function(u){h+='<label class="chk"><input type="checkbox" class="uchk" value="'+u.num+'" checked> Unit '+u.num+'</label>';});
  h+='<button class="btn" id="startPractice">Start practice</button></div>';
  document.getElementById("launch").innerHTML=h;
  document.getElementById("startTimed").onclick=function(){begin("exam",true);};
  document.getElementById("startUntimed").onclick=function(){begin("exam",false);};
  document.getElementById("startPractice").onclick=function(){
    var u=[].slice.call(document.querySelectorAll(".uchk:checked")).map(function(c){return c.value;});
    if(!u.length){alert("Choose at least one unit.");return;} begin("practice",false,u);};
  if(document.getElementById("resume")){
    document.getElementById("resume").onclick=function(){st=saved;route();};
    document.getElementById("discard").onclick=function(){if(confirm("Discard your saved answers?")){clear();intro();}};
  }
}
function begin(mode,timed,units){
  st={mode:mode,timed:timed,units:units||["1","2","3","4"],phase:"mcq",cur:0,ans:{},flag:{},checked:{},frq:{},pts:{},fcur:0,mcqLeft:MCQ_SECS,frqLeft:FRQ_SECS};
  save();route();
}
function route(){
  var ib=document.getElementById("introBlock");
  if(!st||st.phase==="intro"){ib.classList.remove("hidden");app.innerHTML="";intro();return;}
  ib.classList.add("hidden");
  if(st.phase==="mcq")renderMCQ();else if(st.phase==="frqIntro")renderFRQIntro();else if(st.phase==="frq")renderFRQ();else renderResults();
  window.scrollTo(0,0);
}
/* ---------- timer ---------- */
function stopTick(){if(tick){clearInterval(tick);tick=null;}}
function startTick(field,onEnd){
  stopTick(); if(!st.timed)return;
  var last=Date.now();
  tick=setInterval(function(){
    var now=Date.now();st[field]-=(now-last)/1000;last=now;
    var el=document.getElementById("timer");
    if(el){el.textContent=fmt(st[field]);el.classList.toggle("low",st[field]<300);}
    if(Math.floor(st[field])%10===0)save();
    if(st[field]<=0){stopTick();alert("Time is up for this section. Your answers have been submitted.");onEnd();}
  },500);
}
function refPanel(){return '<div id="refPanel" class="card refpanel hidden"><div class="row" style="justify-content:space-between"><h3>Java quick reference</h3><button class="btn small" id="refClose">Close</button></div>'+X.REF+'</div>';}
function wireRef(){
  var p=document.getElementById("refPanel");
  document.getElementById("refToggle").onclick=function(){p.classList.toggle("hidden");if(!p.classList.contains("hidden"))p.scrollIntoView({block:"start"});};
  document.getElementById("refClose").onclick=function(){p.classList.add("hidden");};
}
/* ---------- Section I ---------- */
function renderMCQ(){
  var qs=list(), q=qs[st.cur], practice=st.mode==="practice";
  var answered=qs.filter(isDone).length;
  var h='<div class="exam-bar"><div class="wrap"><div><b>'+(practice?"Practice: Unit "+st.units.join(", "):"Section I: Multiple Choice")+'</b> &middot; '+answered+' of '+qs.length+' answered</div>';
  h+='<div class="row">'+(st.timed?'<span class="timer" id="timer">'+fmt(st.mcqLeft)+'</span>':'<span class="muted">Untimed</span>')+'<button class="btn small" id="refToggle">Reference</button><button class="btn small" id="navToggle">Question list</button></div></div></div>';
  h+=refPanel()+'<div id="navPanel" class="card hidden"><div class="navgrid">';
  qs.forEach(function(x,i){var c=[];if(isDone(x))c.push("ans");if(st.flag[x.id])c.push("flag");if(i===st.cur)c.push("cur");
    if(practice&&st.checked[x.id])c.push(isRight(x)?"ok":"no");
    h+='<button data-i="'+i+'" class="'+c.join(" ")+'">'+x.id+'</button>';});
  h+='</div><div class="muted small">Filled = answered &middot; red dot = marked for review</div></div>';
  h+='<div class="qlayout single"><div class="question"><div class="qnum">Question '+q.id+'</div><p>'+q.stem+'</p>'+figures(q);
  var showKey=practice&&st.checked[q.id], a=picked(q);
  h+='<div class="opts">';
  q.opts.forEach(function(o,i){var l=L[i],c="opt";if(a===l)c+=" sel";
    if(showKey){if(q.ans===l)c+=" correct";else if(a===l)c+=" wrong";}
    h+='<button class="'+c+'" data-l="'+l+'"'+(showKey?" disabled":"")+' aria-pressed="'+(a===l)+'"><span class="let">'+l+'</span>'+optHTML(o)+'</button>';});
  h+='</div>';
  if(showKey){h+='<div class="box '+(isRight(q)?"g":"r")+'"><b>'+(isRight(q)?"Correct.":"Not quite. The answer is "+q.ans+".")+'</b> '+esc(q.expl)+'<div class="muted small" style="margin-top:6px">'+topicLink(q.topic)+'</div></div>';}
  h+='<div class="row" style="justify-content:space-between;margin-top:14px"><label class="chk"><input type="checkbox" id="flag"'+(st.flag[q.id]?" checked":"")+'> Mark for review</label>';
  h+='<div class="row">'+(st.cur>0?'<button class="btn small" id="prev">Back</button>':'');
  if(practice&&!showKey)h+='<button class="btn small primary" id="check"'+(isDone(q)?"":" disabled")+'>Check answer</button>';
  h+=(st.cur<qs.length-1?'<button class="btn small primary" id="next">Next</button>':'<button class="btn small primary" id="finish">'+(practice?"Finish practice":"Review and submit Section I")+'</button>')+'</div></div></div></div>';
  app.innerHTML=h;
  wireRef();
  document.getElementById("navToggle").onclick=function(){document.getElementById("navPanel").classList.toggle("hidden");};
  [].forEach.call(app.querySelectorAll(".navgrid button"),function(b){b.onclick=function(){st.cur=+b.dataset.i;save();renderMCQ();};});
  [].forEach.call(app.querySelectorAll(".opt"),function(b){b.onclick=function(){st.ans[q.id]=b.dataset.l;save();renderMCQ();};});
  document.getElementById("flag").onchange=function(e){st.flag[q.id]=e.target.checked;save();renderMCQ();};
  if(document.getElementById("prev"))document.getElementById("prev").onclick=function(){st.cur--;save();renderMCQ();window.scrollTo(0,0);};
  if(document.getElementById("next"))document.getElementById("next").onclick=function(){st.cur++;save();renderMCQ();window.scrollTo(0,0);};
  if(document.getElementById("check"))document.getElementById("check").onclick=function(){st.checked[q.id]=true;save();renderMCQ();};
  if(document.getElementById("finish"))document.getElementById("finish").onclick=function(){
    var un=qs.filter(function(x){return !isDone(x);}).length, fl=qs.filter(function(x){return st.flag[x.id];}).length;
    var msg=(practice?"Finish practice?":"Submit Section I?")+(un?"\n"+un+" question(s) are not answered.":"")+(fl?"\n"+fl+" question(s) are marked for review.":"")+(practice?"":"\nYou cannot return to Section I after you submit.");
    if(confirm(msg))endMCQ();};
  if(!practice)startTick("mcqLeft",endMCQ);
}
function endMCQ(){stopTick();st.phase=st.mode==="practice"?"results":"frqIntro";save();route();}
/* ---------- Section II ---------- */
function frqSource(f){return '<div class="qnum">'+f.q+': '+esc(f.label)+'</div>'+f.intro+(f.code?X.code(f.code):'');}
function renderFRQIntro(){
  var h='<div class="eyebrow">Section II</div><h1>Free Response</h1><p>Section I is submitted. Section II has 4 questions: Methods and Control Structures, Class Design, Data Analysis with ArrayList, and 2D Array. You have '+(st.timed?'90 minutes':'no time limit')+' for all four.</p>';
  h+='<div class="box b">Write your answers in Java. Nothing here compiles or runs your code, just like on exam day, so check your braces, semicolons and return statements yourself. Use the method headers exactly as given. If a later part calls a method from an earlier part, call it as if it works correctly.</div>';
  h+='<button class="btn primary" id="go">Begin Section II</button>';
  app.innerHTML=h;document.getElementById("go").onclick=function(){st.phase="frq";save();route();};
}
function renderFRQ(){
  var f=F[st.fcur];
  var h='<div class="exam-bar"><div class="wrap"><div><b>Section II: Free Response</b></div><div class="row">'+(st.timed?'<span class="timer" id="timer">'+fmt(st.frqLeft)+'</span>':'<span class="muted">Untimed</span>')+'<button class="btn small" id="refToggle">Reference</button></div></div></div>'+refPanel();
  h+='<div class="frqtabs">'+F.map(function(x,i){return '<button data-i="'+i+'" class="'+(i===st.fcur?'on':'')+'">'+x.q+'</button>';}).join('')+'</div>';
  h+='<div class="frqlayout"><div class="wrsrc">'+frqSource(f)+'</div><div>';
  f.parts.forEach(function(p,i){var k=st.fcur+"-"+i;h+='<div class="card wrq"><div class="qnum">'+(p.label?'Part '+p.label:'Your answer')+'</div><p>'+p.prompt+'</p><textarea class="codebox" spellcheck="false" data-k="'+k+'" aria-label="Your answer to '+esc(f.q+' '+p.label)+'" placeholder="Type your Java code">'+esc(st.frq[k]||"")+'</textarea></div>';});
  h+='<div class="row">'+(st.fcur>0?'<button class="btn" id="fprev">Previous question</button>':'')+(st.fcur<F.length-1?'<button class="btn primary" id="fnext">Next question</button>':'<button class="btn primary" id="submitFRQ">Submit Section II and see results</button>')+'</div></div></div>';
  app.innerHTML=h;
  wireRef();
  [].forEach.call(app.querySelectorAll("textarea"),function(t){
    t.oninput=function(){st.frq[t.dataset.k]=t.value;save();};
    t.onkeydown=function(e){if(e.key==="Tab"&&!e.shiftKey){e.preventDefault();var s=t.selectionStart;t.value=t.value.slice(0,s)+"    "+t.value.slice(t.selectionEnd);t.selectionStart=t.selectionEnd=s+4;st.frq[t.dataset.k]=t.value;save();}};
  });
  [].forEach.call(app.querySelectorAll(".frqtabs button"),function(b){b.onclick=function(){st.fcur=+b.dataset.i;save();renderFRQ();window.scrollTo(0,0);};});
  if(document.getElementById("fprev"))document.getElementById("fprev").onclick=function(){st.fcur--;save();renderFRQ();window.scrollTo(0,0);};
  if(document.getElementById("fnext"))document.getElementById("fnext").onclick=function(){st.fcur++;save();renderFRQ();window.scrollTo(0,0);};
  if(document.getElementById("submitFRQ"))document.getElementById("submitFRQ").onclick=function(){if(confirm("Submit Section II? You will then score your answers with the scoring guidelines."))endFRQ();};
  if(!tick)startTick("frqLeft",endFRQ);
}
function endFRQ(){stopTick();st.phase="results";save();route();}
/* ---------- results ---------- */
function estimate(composite){return composite>=73?5:composite>=60?4:composite>=47?3:composite>=35?2:1;}
function tally(qs){var t={};qs.forEach(function(q){var k=unit(q);t[k]=t[k]||{n:0,c:0};t[k].n++;if(isRight(q))t[k].c++;});
  var h='<div class="tablewrap"><table><tr><th>Unit</th><th>Correct</th><th style="width:38%">Percent</th></tr>';
  Object.keys(t).sort().forEach(function(k){var p=Math.round(100*t[k].c/t[k].n);h+='<tr><td>'+esc(UNIT[k]||k)+'</td><td>'+t[k].c+' / '+t[k].n+'</td><td><div class="bar"><span style="width:'+p+'%"></span></div> '+p+'%</td></tr>';});
  return h+'</table></div>';}
function renderResults(){
  stopTick();
  var qs=list(), practice=st.mode==="practice";
  var c=qs.filter(isRight).length;
  var h='<div class="eyebrow">Score report</div><h1>'+esc(E.name)+(practice?" (practice)":"")+'</h1>';
  h+='<div class="grid3"><div class="card"><div class="muted">Section I: multiple choice</div><div class="score-big">'+c+' / '+qs.length+'</div><div class="muted">'+Math.round(100*c/qs.length)+'% correct</div></div>';
  if(!practice){
    h+='<div class="card"><div class="muted">Section II: free response (score yourself below)</div><div class="score-big" id="frqScore">0 / '+FRQ_MAX+'</div><div class="muted">points</div></div>';
    h+='<div class="card"><div class="muted">Estimated AP score</div><div class="score-big" id="apScore">–</div><div class="muted" id="compo"></div></div>';
  }
  h+='</div>';
  if(!practice)h+='<p class="muted small">Multiple choice counts for 55% of the score and free response for 45%. The estimate uses this rough conversion of the weighted percent: 73% or more = 5, 60–72% = 4, 47–59% = 3, 35–46% = 2, below 35% = 1. Real cutoffs change every year, so treat it as a guide only.</p>';
  h+='<h2>Results by unit</h2>'+tally(qs);
  var miss={};qs.forEach(function(q){if(!isRight(q))miss[q.topic]=(miss[q.topic]||0)+1;});
  var ml=Object.keys(miss).sort(function(a,b){return miss[b]-miss[a]||(parseFloat(a)-parseFloat(b));});
  h+='<h2>Topics to review</h2>'+(ml.length?'<p>Topics with missed questions, most misses first. Each link opens the lesson in the course.</p><ul>'+ml.map(function(t){return '<li>'+topicLink(t)+': '+miss[t]+' missed</li>';}).join("")+'</ul>':'<p>No missed questions. Excellent work.</p>');
  if(!practice){
    h+='<h2>Section II: score your answers</h2><p>Compare your code with each scoring point. Check a point only if your code does everything it describes. Small slips such as a missing semicolon usually do not lose points, but wrong logic does.</p>';
    F.forEach(function(f,fi){
      var max=f.parts.reduce(function(m,p){return m+p.pts.length;},0);
      h+='<div class="card wrq"><details><summary>Show the question</summary>'+frqSource(f)+'</details><div class="qnum">'+f.q+': '+esc(f.label)+' ('+max+' points)</div>';
      f.parts.forEach(function(p,pi){var k=fi+"-"+pi;
        h+=(p.label?'<h4>Part '+p.label+'</h4>':'')+'<p>'+p.prompt+'</p><h4>Your answer</h4><pre class="code">'+(st.frq[k]?esc(st.frq[k]):"<i>No answer</i>")+'</pre><h4>Scoring points</h4><div class="ptlist">';
        p.pts.forEach(function(pt,ti){var id=k+"-"+ti;h+='<label class="chk block"><input type="checkbox" class="pt" data-k="'+id+'"'+(st.pts[id]?" checked":"")+'> '+esc(pt)+'</label>';});
        h+='</div><details><summary>Sample solution</summary>'+X.code(p.sample)+'</details>';});
      h+='</div>';});
  }
  h+='<h2>Question-by-question review</h2><label class="chk"><input type="checkbox" id="onlyMissed"> Show only missed questions</label><div id="rev">';
  qs.forEach(function(q){var ok=isRight(q),a=picked(q);
    h+='<div class="card rq'+(ok?" okq":"")+'"><div class="qnum">Question '+q.id+' '+(ok?'<span class="tag g">Correct</span>':'<span class="tag r">'+(a?"Incorrect":"Unanswered")+'</span>')+'</div>';
    h+='<p>'+q.stem+'</p>'+figures(q)+'<div class="opts">';
    q.opts.forEach(function(o,i){var l=L[i],cl="opt static";if(q.ans===l)cl+=" correct";else if(a===l)cl+=" wrong";h+='<div class="'+cl+'"><span class="let">'+l+'</span>'+optHTML(o)+'</div>';});
    h+='</div><div class="expl"><b>Answer: '+q.ans+'.</b> '+esc(q.expl)+'</div><div class="muted small">'+topicLink(q.topic)+'</div></div>';});
  h+='</div><div class="row"><button class="btn" onclick="window.print()">Print this report</button><button class="btn primary" id="restart">Start over</button></div>';
  app.innerHTML=h;
  function upd(){if(practice)return;var n=frqPts();document.getElementById("frqScore").textContent=n+" / "+FRQ_MAX;
    var comp=Math.round(55*c/qs.length+45*n/FRQ_MAX);document.getElementById("apScore").textContent=estimate(comp);document.getElementById("compo").textContent="Weighted percent: "+comp+"%";}
  [].forEach.call(app.querySelectorAll(".pt"),function(x){x.onchange=function(){st.pts[x.dataset.k]=x.checked;save();upd();};});
  upd();
  document.getElementById("onlyMissed").onchange=function(e){[].forEach.call(app.querySelectorAll(".rq.okq"),function(d){d.classList.toggle("hidden",e.target.checked);});};
  document.getElementById("restart").onclick=function(){if(confirm("Clear this attempt and start over?")){clear();st=null;route();}};
}
route();
})();
