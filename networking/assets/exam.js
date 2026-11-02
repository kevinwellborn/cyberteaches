/* AP Networking practice exam engine (cyberteaches.com/networking)
   Reads window.EXAM (set by data.js). No server needed; progress is kept in this browser only. */
(function(){
"use strict";
var LESSONS={
"1.1":"Fixing What’s Slowing Me Down","1.2":"Getting the Most Out of My Network","1.3":"What Could Go Wrong","1.4":"Locking It Down",
"2.1":"Missed Connection","2.2":"Identification Needed","2.3":"Smart Moves","2.4":"Leveling Up","2.5":"Guarding My Network","2.6":"Applying Defense",
"3.1":"Planning a Network","3.2":"Creating a Network","3.3":"Making It Work","3.4":"Building the Boundaries","3.5":"Controlling the Traffic","3.6":"Restored Connections",
"4.1":"What Happens When Networks Break or Fail?","4.2":"The Language of the Network","4.3":"Tools of Network Analysts","4.4":"How Data Travel the Internet","4.5":"From the Inside Out","4.6":"Moving Forward"};
var UNITS={"1":"Unit 1: Managing My Connections","2":"Unit 2: Managing My Shared Connections","3":"Unit 3: Managing Many Connections","4":"Unit 4: Managing Our Global Connections"};
var SKILLS={"1":"Skill 1: Connect and Configure","2":"Skill 2: Secure","3":"Skill 3: Troubleshoot"};
var L="ABCD";
var E=window.EXAM, Q=E.questions, S=E.stimuli, F=E.frq;
var KEY="apnet-"+E.id+"-v1";
var MCQ_SECS=80*60, FRQ_SECS=50*60;
var app=document.getElementById("app");
var st=null, tick=null;

function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch(e){}}
function load(){try{var s=localStorage.getItem(KEY);return s?JSON.parse(s):null;}catch(e){return null;}}
function clear(){try{localStorage.removeItem(KEY);}catch(e){}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
function fmt(s){s=Math.max(0,Math.floor(s));var m=Math.floor(s/60),x=s%60;return m+":"+(x<10?"0":"")+x;}
function lessonOf(lo){return lo.split(".").slice(0,2).join(".");}
function reviewText(lo){var l=lessonOf(lo);return "Review Lesson "+l+": "+(LESSONS[l]||"");}
function setRange(id){var ids=Q.filter(function(q){return q.set===id;}).map(function(q){return q.id;});return ids;}
function setTitle(id){var r=setRange(id);return "Questions "+r[0]+"–"+r[r.length-1]+" refer to the following information.";}
function list(){return st.mode==="practice"?Q.filter(function(q){return st.units.indexOf(q.lo[0])>=0;}):Q;}

/* ---------- intro ---------- */
function intro(){
  stopTick();
  var saved=load();
  var h='<div class="row noprint" style="justify-content:flex-start">';
  h+='<button class="btn" id="startTimed">Start timed exam (Section I: 80 min)</button>';
  h+='<button class="btn secondary" id="startUntimed">Start untimed</button></div>';
  if(saved&&saved.phase&&saved.phase!=="intro"){h+='<div class="box y"><b>You have an exam in progress in this browser.</b> <button class="btn small" id="resume">Resume</button> <button class="btn small secondary" id="discard">Discard and start over</button></div>';}
  h+='<h3>Practice by unit (untimed, instant feedback)</h3><p>Choose the units you want, then answer each question and check it right away. The free-response question is not included in this mode.</p><div class="row" style="justify-content:flex-start">';
  ["1","2","3","4"].forEach(function(u){h+='<label style="margin-right:12px"><input type="checkbox" class="uchk" value="'+u+'" checked> Unit '+u+'</label>';});
  h+='<button class="btn secondary" id="startPractice">Start practice</button></div>';
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
  st={mode:mode,timed:timed,units:units||["1","2","3","4"],phase:"mcq",cur:0,ans:{},flag:{},checked:{},frq:{},frqPts:{},mcqLeft:MCQ_SECS,frqLeft:FRQ_SECS,started:Date.now()};
  save();route();
}
function route(){
  document.getElementById("introBlock").classList.toggle("hidden",st&&st.phase!=="intro");
  if(!st||st.phase==="intro"){document.getElementById("introBlock").classList.remove("hidden");app.innerHTML="";intro();return;}
  if(st.phase==="mcq")renderMCQ();else if(st.phase==="frqIntro")renderFRQIntro();else if(st.phase==="frq")renderFRQ();else if(st.phase==="results")renderResults();
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
  var answered=qs.filter(function(x){return st.ans[x.id]!=null;}).length;
  var h='<div class="exam-bar noprint"><div class="wrap"><div><b>'+(practice?"Practice: Units "+st.units.join(", "):"Section I: Multiple Choice")+'</b> &middot; '+answered+' of '+qs.length+' answered</div>';
  h+='<div>'+(st.timed?'<span class="timer" id="timer">'+fmt(st.mcqLeft)+'</span> remaining &nbsp;':'<span class="meta">Untimed</span> &nbsp;')+'<button class="btn small secondary" id="navToggle">Question list</button></div></div></div>';
  h+='<div class="wrap"><div id="navPanel" class="card hidden"><div class="navgrid">';
  qs.forEach(function(x,i){var c=[];if(st.ans[x.id]!=null)c.push("ans");if(st.flag[x.id])c.push("flag");if(i===st.cur)c.push("cur");
    if(practice&&st.checked[x.id])c.push(st.ans[x.id]===x.ans?"ok":"no");
    h+='<button data-i="'+i+'" class="'+c.join(" ")+'">'+x.id+'</button>';});
  h+='</div><div class="meta">Blue = answered &middot; red dot = marked for review</div></div>';
  h+='<div class="qlayout'+(q.set?"":" single")+'">';
  if(q.set){h+='<div class="stimulus"><div class="settitle">'+setTitle(q.set)+'</div>'+S[q.set].html+'</div>';}
  h+='<div class="question"><div class="qnum">Question '+q.id+'</div><p>'+q.stem+'</p>';
  var showKey=practice&&st.checked[q.id];
  q.opts.forEach(function(o,i){var c="opt";if(st.ans[q.id]===L[i])c+=" sel";
    if(showKey){if(L[i]===q.ans)c+=" correct";else if(st.ans[q.id]===L[i])c+=" wrong";}
    h+='<button class="'+c+'" data-l="'+L[i]+'"'+(showKey?" disabled":"")+'><span class="let">'+L[i]+'</span><span>'+esc(o)+'</span></button>';});
  if(showKey){h+='<div class="box '+(st.ans[q.id]===q.ans?"g":"r")+' expl"><b>'+(st.ans[q.id]===q.ans?"Correct.":"Not quite. The answer is "+q.ans+".")+'</b> '+q.expl+'<div class="meta" style="margin-top:6px">LO '+q.lo+' &middot; Skill '+q.skill+' &middot; '+reviewText(q.lo)+'</div></div>';}
  h+='<div class="row"><label><input type="checkbox" id="flag"'+(st.flag[q.id]?" checked":"")+'> Mark for review</label>';
  h+='<div>'+(st.cur>0?'<button class="btn small secondary" id="prev">Back</button> ':'');
  if(practice&&!showKey)h+='<button class="btn small" id="check"'+(st.ans[q.id]==null?" disabled":"")+'>Check answer</button> ';
  h+=(st.cur<qs.length-1?'<button class="btn small" id="next">Next</button>':'<button class="btn small" id="finish">'+(practice?"Finish practice":"Review and submit Section I")+'</button>')+'</div></div></div></div></div>';
  app.innerHTML=h;
  document.getElementById("navToggle").onclick=function(){document.getElementById("navPanel").classList.toggle("hidden");};
  [].forEach.call(app.querySelectorAll(".navgrid button"),function(b){b.onclick=function(){st.cur=+b.dataset.i;save();renderMCQ();};});
  [].forEach.call(app.querySelectorAll(".opt"),function(b){b.onclick=function(){st.ans[q.id]=b.dataset.l;save();renderMCQ();};});
  document.getElementById("flag").onchange=function(e){st.flag[q.id]=e.target.checked;save();renderMCQ();};
  if(document.getElementById("prev"))document.getElementById("prev").onclick=function(){st.cur--;save();renderMCQ();window.scrollTo(0,0);};
  if(document.getElementById("next"))document.getElementById("next").onclick=function(){st.cur++;save();renderMCQ();window.scrollTo(0,0);};
  if(document.getElementById("check"))document.getElementById("check").onclick=function(){st.checked[q.id]=true;save();renderMCQ();};
  if(document.getElementById("finish"))document.getElementById("finish").onclick=function(){
    var un=qs.filter(function(x){return st.ans[x.id]==null;}).length, fl=qs.filter(function(x){return st.flag[x.id];}).length;
    var msg=(practice?"Finish practice?":"Submit Section I?")+(un?"\n"+un+" question(s) are unanswered.":"")+(fl?"\n"+fl+" question(s) are marked for review.":"")+(practice?"":"\nYou cannot return to Section I after you submit.");
    if(confirm(msg))endMCQ();};
  if(!practice)startTick("mcqLeft",endMCQ);
}
function endMCQ(){stopTick();st.phase=st.mode==="practice"?"results":"frqIntro";save();route();}
/* ---------- Section II ---------- */
function renderFRQIntro(){
  var h='<div class="wrap"><div class="eyebrow">Section II</div><h1>Free Response</h1><p>Section I is submitted. Section II has 1 question with '+F.parts.length+' parts, worth '+F.parts.reduce(function(a,p){return a+p.pts;},0)+' points, and '+(st.timed?'a 50-minute time limit':'no time limit')+'. It is built on several sources from one network. Read every source before you answer, and answer each part in the box under it.</p>';
  h+='<div class="box b">Write in complete sentences. Name the specific evidence (a rule number, a log time, an address) that supports each answer. When a part asks you to configure something, write the configuration itself.</div>';
  h+='<button class="btn" id="go">Begin Section II</button></div>';
  app.innerHTML=h;document.getElementById("go").onclick=function(){st.phase="frq";save();route();};
}
function sourcesHTML(open){var h='<div class="frqsrc">';F.sources.forEach(function(s){h+='<details'+(open?" open":"")+'><summary>'+s[0]+'</summary><div class="tablewrap">'+s[1]+'</div></details>';});return h+'</div>';}
function renderFRQ(){
  var h='<div class="exam-bar noprint"><div class="wrap"><div><b>Section II: Free Response</b> &middot; '+esc(F.title)+'</div><div>'+(st.timed?'<span class="timer" id="timer">'+fmt(st.frqLeft)+'</span> remaining':'<span class="meta">Untimed</span>')+'</div></div></div>';
  h+='<div class="wrap"><h2 style="border:0">'+esc(F.title)+'</h2>'+F.intro+sourcesHTML(true);
  F.parts.forEach(function(p,i){h+='<div class="card" style="margin:12px 0"><b>'+p.label+'</b> '+p.prompt+' <span class="meta">('+p.pts+' point'+(p.pts>1?"s":"")+')</span><textarea data-i="'+i+'" placeholder="Type your response to part '+p.label+'">'+esc(st.frq[i]||"")+'</textarea></div>';});
  h+='<button class="btn" id="submitFRQ">Submit Section II and see results</button></div>';
  app.innerHTML=h;
  [].forEach.call(app.querySelectorAll("textarea"),function(t){t.oninput=function(){st.frq[t.dataset.i]=t.value;save();};});
  document.getElementById("submitFRQ").onclick=function(){if(confirm("Submit Section II? You will then score your free response against the scoring guidelines."))endFRQ();};
  startTick("frqLeft",endFRQ);
}
function endFRQ(){stopTick();st.phase="results";save();route();}
/* ---------- results ---------- */
function tally(keyFn,labels,qs){var t={};qs.forEach(function(q){var k=keyFn(q);t[k]=t[k]||{n:0,c:0};t[k].n++;if(st.ans[q.id]===q.ans)t[k].c++;});
  var h='<div class="tablewrap"><table><tr><th>Category</th><th>Correct</th><th style="width:40%">Percent</th></tr>';
  Object.keys(t).sort().forEach(function(k){var p=Math.round(100*t[k].c/t[k].n);h+='<tr><td>'+(labels[k]||k)+'</td><td>'+t[k].c+' / '+t[k].n+'</td><td><div class="bar"><span style="width:'+p+'%"></span></div> '+p+'%</td></tr>';});
  return h+'</table></div>';}
function renderResults(){
  stopTick();
  var qs=list(), practice=st.mode==="practice";
  var c=qs.filter(function(q){return st.ans[q.id]===q.ans;}).length;
  var frqMax=F.parts.reduce(function(a,p){return a+p.pts;},0);
  var h='<div class="wrap"><div class="eyebrow">Score report</div><h1>'+esc(E.name)+(practice?" (practice)":"")+'</h1>';
  h+='<div class="grid"><div class="card"><div class="meta">Section I multiple choice</div><div class="score-big">'+c+' / '+qs.length+'</div><div class="meta">'+Math.round(100*c/qs.length)+'% correct</div></div>';
  if(!practice){h+='<div class="card"><div class="meta">Section II free response (self-scored below)</div><div class="score-big" id="frqScore">0 / '+frqMax+'</div><div class="meta">Check each point your response earned.</div></div>';
    h+='<div class="card"><div class="meta">Weighted practice score (MCQ 70%, FRQ 30%)</div><div class="score-big" id="composite">–</div><div class="meta">For practice only. The College Board has not published an AP Networking score conversion.</div></div>';}
  h+='</div>';
  h+='<h2>Results by unit</h2>'+tally(function(q){return q.lo[0];},UNITS,qs);
  h+='<h2>Results by skill</h2>'+tally(function(q){return q.skill[0];},SKILLS,qs);
  var miss={};qs.forEach(function(q){if(st.ans[q.id]!==q.ans){var l=lessonOf(q.lo);miss[l]=(miss[l]||0)+1;}});
  var ml=Object.keys(miss).sort(function(a,b){return miss[b]-miss[a]||(a<b?-1:1);});
  h+='<h2>What to review in the book</h2>'+(ml.length?'<p>Lessons with missed questions, most misses first:</p><ul>'+ml.map(function(l){return '<li><b>Lesson '+l+': '+LESSONS[l]+'</b>: '+miss[l]+' missed</li>';}).join("")+'</ul>':'<p>No missed questions. Excellent work.</p>');
  if(!practice){
    h+='<h2>Section II: score your response</h2><p>Compare each of your answers with the scoring guidelines and the sample response, then check every point you earned. Be strict: a point needs the specific evidence or configuration the guideline names.</p>'+sourcesHTML(false);
    F.parts.forEach(function(p,i){h+='<div class="card" style="margin:12px 0"><b>'+p.label+'</b> '+p.prompt+'<div class="meta">LO '+p.lo+'</div><h4>Your response</h4><div class="box b" style="white-space:pre-wrap">'+(st.frq[i]?esc(st.frq[i]):"<i>No response</i>")+'</div><h4>Scoring guidelines</h4>';
      p.rubric.forEach(function(r,j){var k=i+"-"+j;h+='<label style="display:block;margin:6px 0"><input type="checkbox" class="pt" data-k="'+k+'"'+(st.frqPts[k]?" checked":"")+'> '+r+'</label>';});
      h+='<details><summary>Sample response</summary><div class="box g">'+p.sample+'</div></details></div>';});
  }
  h+='<h2>Question-by-question review</h2><div class="row noprint" style="justify-content:flex-start"><label><input type="checkbox" id="onlyMissed"> Show only missed questions</label></div><div id="rev">';
  qs.forEach(function(q){var ok=st.ans[q.id]===q.ans;
    h+='<div class="card rq'+(ok?" okq":"")+'" style="margin:10px 0"><div class="qnum">Question '+q.id+' '+(ok?'<span class="tag g">Correct</span>':'<span class="tag r">'+(st.ans[q.id]?"Incorrect":"Unanswered")+'</span>')+'</div>';
    if(q.set)h+='<details><summary>Show stimulus</summary><div class="stimulus" style="max-height:none">'+S[q.set].html+'</div></details>';
    h+='<p>'+q.stem+'</p>';
    q.opts.forEach(function(o,i){var c="opt";if(L[i]===q.ans)c+=" correct";else if(st.ans[q.id]===L[i])c+=" wrong";h+='<div class="'+c+'"><span class="let">'+L[i]+'</span><span>'+esc(o)+'</span></div>';});
    h+='<div class="expl"><b>Answer: '+q.ans+'.</b> '+q.expl+'</div><div class="meta">LO '+q.lo+' &middot; Skill '+q.skill+' &middot; '+reviewText(q.lo)+'</div></div>';});
  h+='</div><div class="row noprint"><button class="btn secondary" onclick="window.print()">Print this report</button><button class="btn" id="restart">Start over</button></div></div>';
  app.innerHTML=h;
  function upd(){if(practice)return;var n=[].filter.call(app.querySelectorAll(".pt"),function(x){return x.checked;}).length;
    document.getElementById("frqScore").textContent=n+" / "+frqMax;
    document.getElementById("composite").textContent=Math.round(70*c/qs.length+30*n/frqMax)+" / 100";}
  [].forEach.call(app.querySelectorAll(".pt"),function(x){x.onchange=function(){st.frqPts[x.dataset.k]=x.checked;save();upd();};});
  upd();
  document.getElementById("onlyMissed").onchange=function(e){[].forEach.call(app.querySelectorAll(".rq.okq"),function(d){d.classList.toggle("hidden",e.target.checked);});};
  document.getElementById("restart").onclick=function(){if(confirm("Clear this attempt and start over?")){clear();st=null;route();}};
}
st=null;route();
})();
