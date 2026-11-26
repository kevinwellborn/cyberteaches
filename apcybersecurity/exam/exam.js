/* AP Cybersecurity practice exam engine (cyberteaches.com/apcybersecurity/exam/)
   Reads window.CYB_EXAM (data.js) and window.AP_UNITS (../content.js). Progress stays in this browser. */
(function(){
"use strict";
var E=window.CYB_EXAM, Q=E.questions, S=E.sets, F=E.frq, L="ABCD";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
var UNITS=window.AP_UNITS||[], TOPIC={}, UNIT={};
UNITS.forEach(function(u){UNIT[u.num]="Unit "+u.num+": "+u.title;u.topics.forEach(function(t){TOPIC[t.id]=t.title;});});
var KEY="ctcyb-"+E.id+"-v1", MCQ_SECS=80*60, FRQ_SECS=50*60;
var FRQ_MAX=F.parts.reduce(function(m,p){return m+p.pts.length;},0);
var app=document.getElementById("app"), st=null, tick=null;

function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch(e){}}
function load(){try{var s=localStorage.getItem(KEY);return s?JSON.parse(s):null;}catch(e){return null;}}
function clear(){try{localStorage.removeItem(KEY);}catch(e){}}
function fmt(s){s=Math.max(0,Math.floor(s));var h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+":"+(m<10?"0":""):"")+m+":"+(x<10?"0":"")+x;}
function unit(q){return q.topic.split(".")[0];}
function topicLink(t){return '<a href="../#/topic/'+t+'">Topic '+t+': '+esc(TOPIC[t]||"")+'</a>';}
function setIds(id){return Q.filter(function(q){return q.set===id;}).map(function(q){return q.id;});}
function setTitle(id){var r=setIds(id);return "Questions "+r[0]+"–"+r[r.length-1]+" refer to the following information.";}
function list(){return st.mode==="practice"?Q.filter(function(q){return st.units.indexOf(unit(q))>=0;}):Q;}
function picked(q){return st.ans[q.id]||"";}
function isRight(q){return picked(q)===q.ans;}
function isDone(q){return picked(q).length===1;}

/* ---------- intro ---------- */
function intro(){
  stopTick();
  var saved=load();
  var h='<div class="row">';
  h+='<button class="btn primary" id="startTimed">Start timed exam (Section I: 80 minutes)</button>';
  h+='<button class="btn" id="startUntimed">Start untimed</button></div>';
  if(saved&&saved.phase&&saved.phase!=="intro"){h+='<div class="box y"><b>You have an exam in progress in this browser.</b> <button class="btn small" id="resume">Resume</button> <button class="btn small" id="discard">Discard and start over</button></div>';}
  h+='<h3>Practice by unit (untimed, instant feedback)</h3><p>Choose the units you want, then check each answer right away. The free-response question is not included in this mode.</p><div class="row">';
  UNITS.forEach(function(u){h+='<label class="chk"><input type="checkbox" class="uchk" value="'+u.num+'" checked> Unit '+u.num+'</label>';});
  h+='<button class="btn" id="startPractice">Start practice</button></div>';
  document.getElementById("launch").innerHTML=h;
  document.getElementById("startTimed").onclick=function(){begin("exam",true);};
  document.getElementById("startUntimed").onclick=function(){begin("exam",false);};
  document.getElementById("startPractice").onclick=function(){
    var b=[].slice.call(document.querySelectorAll(".uchk:checked")).map(function(c){return c.value;});
    if(!b.length){alert("Choose at least one unit.");return;} begin("practice",false,b);};
  if(document.getElementById("resume")){
    document.getElementById("resume").onclick=function(){st=saved;route();};
    document.getElementById("discard").onclick=function(){if(confirm("Discard your saved answers?")){clear();intro();}};
  }
}
function begin(mode,timed,units){
  st={mode:mode,timed:timed,units:units||["1","2","3","4","5"],phase:"mcq",cur:0,ans:{},flag:{},checked:{},frq:{},pts:{},src:0,mcqLeft:MCQ_SECS,frqLeft:FRQ_SECS};
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
/* ---------- Section I ---------- */
function renderMCQ(){
  var qs=list(), q=qs[st.cur], practice=st.mode==="practice";
  var answered=qs.filter(isDone).length;
  var h='<div class="exam-bar"><div class="wrap"><div><b>'+(practice?"Practice: Unit "+st.units.join(", "):"Section I: Multiple Choice")+'</b> &middot; '+answered+' of '+qs.length+' answered</div>';
  h+='<div class="row">'+(st.timed?'<span class="timer" id="timer">'+fmt(st.mcqLeft)+'</span>':'<span class="muted">Untimed</span>')+'<button class="btn small" id="navToggle">Question list</button></div></div></div>';
  h+='<div id="navPanel" class="card hidden"><div class="navgrid">';
  qs.forEach(function(x,i){var c=[];if(isDone(x))c.push("ans");if(st.flag[x.id])c.push("flag");if(i===st.cur)c.push("cur");
    if(practice&&st.checked[x.id])c.push(isRight(x)?"ok":"no");
    h+='<button data-i="'+i+'" class="'+c.join(" ")+'">'+x.id+'</button>';});
  h+='</div><div class="muted small">Filled = answered &middot; red dot = marked for review</div></div>';
  h+='<div class="qlayout'+(q.set?"":" single")+'">';
  if(q.set)h+='<div class="stimulus"><div class="settitle">'+setTitle(q.set)+'</div>'+S[q.set].html+'</div>';
  h+='<div class="question"><div class="qnum">Question '+q.id+'</div><p>'+q.stem+'</p>';
  var showKey=practice&&st.checked[q.id], a=picked(q);
  h+='<div class="opts">';
  q.opts.forEach(function(o,i){var l=L[i],c="opt";if(a===l)c+=" sel";
    if(showKey){if(q.ans===l)c+=" correct";else if(a===l)c+=" wrong";}
    h+='<button class="'+c+'" data-l="'+l+'"'+(showKey?" disabled":"")+' aria-pressed="'+(a===l)+'"><span class="let">'+l+'</span><span>'+esc(o)+'</span></button>';});
  h+='</div>';
  if(showKey){h+='<div class="box '+(isRight(q)?"g":"r")+'"><b>'+(isRight(q)?"Correct.":"Not quite. The answer is "+q.ans+".")+'</b> '+q.expl+'<div class="muted small" style="margin-top:6px">'+topicLink(q.topic)+'</div></div>';}
  h+='<div class="row" style="justify-content:space-between;margin-top:14px"><label class="chk"><input type="checkbox" id="flag"'+(st.flag[q.id]?" checked":"")+'> Mark for review</label>';
  h+='<div class="row">'+(st.cur>0?'<button class="btn small" id="prev">Back</button>':'');
  if(practice&&!showKey)h+='<button class="btn small primary" id="check"'+(isDone(q)?"":" disabled")+'>Check answer</button>';
  h+=(st.cur<qs.length-1?'<button class="btn small primary" id="next">Next</button>':'<button class="btn small primary" id="finish">'+(practice?"Finish practice":"Review and submit Section I")+'</button>')+'</div></div></div></div>';
  app.innerHTML=h;
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
function sourcesHTML(all){
  if(all)return F.sources.map(function(s){return '<div class="src"><h3>'+esc(s.title)+'</h3>'+s.html+'</div>';}).join("");
  var h='<div class="srctabs" role="tablist">';
  F.sources.forEach(function(s,i){h+='<button role="tab" data-s="'+i+'" class="'+(i===st.src?"on":"")+'" aria-selected="'+(i===st.src)+'">Source '+(i+1)+'</button>';});
  return h+'</div><div class="src" id="srcBody"><h3>'+esc(F.sources[st.src].title)+'</h3>'+F.sources[st.src].html+'</div>';
}
function renderFRQIntro(){
  var h='<div class="eyebrow">Section II</div><h1>Free Response: '+esc(F.title)+'</h1><p>Section I is submitted. Section II has 1 question with '+F.parts.length+' parts, worth '+FRQ_MAX+' points. You have '+(st.timed?'50 minutes':'no time limit')+'.</p>'+F.intro;
  h+='<div class="box b">The five sources describe one device. Use the Source buttons to switch between them while you write. Cite specific evidence (a log line, a rule number, a permission string, a policy item) in every answer.</div>';
  h+='<button class="btn primary" id="go">Begin Section II</button>';
  app.innerHTML=h;document.getElementById("go").onclick=function(){st.phase="frq";save();route();};
}
function wireTabs(){
  [].forEach.call(app.querySelectorAll(".srctabs button"),function(b){b.onclick=function(){st.src=+b.dataset.s;save();
    [].forEach.call(app.querySelectorAll(".srctabs button"),function(x){x.classList.toggle("on",x===b);x.setAttribute("aria-selected",x===b);});
    document.getElementById("srcBody").innerHTML='<h3>'+esc(F.sources[st.src].title)+'</h3>'+F.sources[st.src].html;};});
}
function renderFRQ(){
  var h='<div class="exam-bar"><div class="wrap"><div><b>Section II: '+esc(F.title)+'</b></div><div>'+(st.timed?'<span class="timer" id="timer">'+fmt(st.frqLeft)+'</span>':'<span class="muted">Untimed</span>')+'</div></div></div>';
  h+='<div class="wrlayout"><div class="wrsrc">'+F.intro+sourcesHTML(false)+'</div><div>';
  F.parts.forEach(function(p,i){h+='<div class="card wrq"><div class="qnum">Part '+p.label+': '+esc(p.name)+' ('+p.pts.length+' point'+(p.pts.length>1?'s':'')+')</div><p>'+p.prompt+'</p><textarea data-i="'+i+'" aria-label="Your response to part '+esc(p.label)+'" placeholder="Type your response">'+esc(st.frq[i]||"")+'</textarea></div>';});
  h+='<button class="btn primary" id="submitFRQ">Submit Section II and see results</button></div></div>';
  app.innerHTML=h;
  wireTabs();
  [].forEach.call(app.querySelectorAll("textarea"),function(t){t.oninput=function(){st.frq[t.dataset.i]=t.value;save();};});
  document.getElementById("submitFRQ").onclick=function(){if(confirm("Submit Section II? You will then score your responses with the scoring guidelines."))endFRQ();};
  startTick("frqLeft",endFRQ);
}
function endFRQ(){stopTick();st.phase="results";save();route();}
/* ---------- results ---------- */
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
    h+='<div class="card"><div class="muted">Section II: free response (score yourself below)</div><div class="score-big" id="frqScore">0 / '+FRQ_MAX+'</div><div class="muted">1 point for each scoring point</div></div>';
    h+='<div class="card"><div class="muted">Weighted practice score</div><div class="score-big" id="wScore">0 / 100</div><div class="muted">Section I counts 70%, Section II 30%</div></div>';
  }
  h+='</div><p class="muted small">On the real exam, the multiple-choice section is 70% of the score and the free-response question is 30%. The College Board converts the combined score to a 1–5 AP score; this report does not predict that score and is for practice only.</p>';
  h+='<h2>Results by unit</h2>'+tally(qs);
  var miss={};qs.forEach(function(q){if(!isRight(q))miss[q.topic]=(miss[q.topic]||0)+1;});
  var ml=Object.keys(miss).sort(function(a,b){return miss[b]-miss[a]||(parseFloat(a)-parseFloat(b));});
  h+='<h2>Topics to review</h2>'+(ml.length?'<p>Topics with missed questions, most misses first. Each link opens the lesson in the course.</p><ul>'+ml.map(function(t){return '<li>'+topicLink(t)+': '+miss[t]+' missed</li>';}).join("")+'</ul>':'<p>No missed questions. Excellent work.</p>');
  if(!practice){
    h+='<h2>Section II: score your responses</h2><p>Compare each response with the scoring guidelines and the sample response. Check a box only if your response clearly does what that point describes.</p><details><summary>Show the five sources</summary><div class="stimulus static">'+sourcesHTML(true)+'</div></details>';
    F.parts.forEach(function(p,i){
      h+='<div class="card wrq"><div class="qnum">Part '+p.label+': '+esc(p.name)+'</div><p>'+p.prompt+'</p><h4>Your response</h4><div class="box b pre">'+(st.frq[i]?esc(st.frq[i]):"<i>No response</i>")+'</div><h4>Scoring guidelines ('+p.pts.length+' point'+(p.pts.length>1?'s':'')+')</h4>';
      p.pts.forEach(function(t,j){var k=i+"-"+j;h+='<label class="ptrow"><input type="checkbox" class="pt" data-k="'+k+'"'+(st.pts[k]?" checked":"")+'><span><b>1 point:</b> '+esc(t)+'</span></label>';});
      h+='<details><summary>Sample response that earns every point</summary><div class="box g">'+esc(p.sample)+'</div></details></div>';});
  }
  h+='<h2>Question-by-question review</h2><label class="chk"><input type="checkbox" id="onlyMissed"> Show only missed questions</label><div id="rev">';
  qs.forEach(function(q){var ok=isRight(q),a=picked(q);
    h+='<div class="card rq'+(ok?" okq":"")+'"><div class="qnum">Question '+q.id+' '+(ok?'<span class="tag g">Correct</span>':'<span class="tag r">'+(a?"Incorrect":"Unanswered")+'</span>')+'</div>';
    if(q.set)h+='<details><summary>Show the shared information</summary><div class="stimulus static">'+S[q.set].html+'</div></details>';
    h+='<p>'+q.stem+'</p><div class="opts">';
    q.opts.forEach(function(o,i){var l=L[i],cl="opt static";if(q.ans===l)cl+=" correct";else if(a===l)cl+=" wrong";h+='<div class="'+cl+'"><span class="let">'+l+'</span><span>'+esc(o)+'</span></div>';});
    h+='</div><div class="expl"><b>Answer: '+q.ans+'.</b> '+q.expl+'</div><div class="muted small">'+topicLink(q.topic)+'</div></div>';});
  h+='</div><div class="row"><button class="btn" onclick="window.print()">Print this report</button><button class="btn primary" id="restart">Start over</button></div>';
  app.innerHTML=h;
  function upd(){if(practice)return;var n=[].filter.call(app.querySelectorAll(".pt"),function(x){return x.checked;}).length;
    document.getElementById("frqScore").textContent=n+" / "+FRQ_MAX;
    document.getElementById("wScore").textContent=Math.round(70*c/qs.length+30*n/FRQ_MAX)+" / 100";}
  [].forEach.call(app.querySelectorAll(".pt"),function(x){x.onchange=function(){st.pts[x.dataset.k]=x.checked;save();upd();};});
  upd();
  document.getElementById("onlyMissed").onchange=function(e){[].forEach.call(app.querySelectorAll(".rq.okq"),function(d){d.classList.toggle("hidden",e.target.checked);});};
  document.getElementById("restart").onclick=function(){if(confirm("Clear this attempt and start over?")){clear();st=null;route();}};
}
route();
})();
