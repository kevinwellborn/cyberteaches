/* AP CSP practice exam engine (cyberteaches.com/apcsp/exam/)
   Reads window.CSP_EXAM (data.js) and window.AP_UNITS (../content.js). Progress stays in this browser. */
(function(){
"use strict";
var E=window.CSP_EXAM, Q=E.questions, S=E.sets, W=E.wr, X=window.CSP, esc=X.esc, L="ABCD";
var UNITS=window.AP_UNITS||[], TOPIC={}, BIG={};
UNITS.forEach(function(u){BIG[u.num]="Big Idea "+u.num+": "+u.title;u.topics.forEach(function(t){TOPIC[t.id]=t.title;});});
var KEY="ctcsp-"+E.id+"-v1", MCQ_SECS=120*60, WR_SECS=60*60;
var app=document.getElementById("app"), st=null, tick=null;

function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch(e){}}
function load(){try{var s=localStorage.getItem(KEY);return s?JSON.parse(s):null;}catch(e){return null;}}
function clear(){try{localStorage.removeItem(KEY);}catch(e){}}
function fmt(s){s=Math.max(0,Math.floor(s));var h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+":"+(m<10?"0":""):"")+m+":"+(x<10?"0":"")+x;}
function big(q){return q.topic.split(".")[0];}
function topicLink(t){return '<a href="../#/topic/'+t+'">Topic '+t+': '+esc(TOPIC[t]||"")+'</a>';}
function setIds(id){return Q.filter(function(q){return q.set===id;}).map(function(q){return q.id;});}
function setTitle(id){var r=setIds(id);return "Questions "+r[0]+"–"+r[r.length-1]+" refer to the following information.";}
function list(){return st.mode==="practice"?Q.filter(function(q){return st.bigs.indexOf(big(q))>=0;}):Q;}
function picked(q){return st.ans[q.id]||"";}
function isRight(q){return picked(q)===q.ans;}
function isDone(q){var a=picked(q);return q.multi?a.length===2:a.length===1;}
function optHTML(q,o){return typeof o==="string"?'<span>'+esc(o)+'</span>':'<span class="optcode">'+X.code(o.code,q.block)+'</span>';}
function figures(q){var h="";if(q.robot)h+='<div class="fig">'+X.robot(q.robot)+'</div>';if(q.code)h+=X.code(q.code,q.block);if(q.stemAfter)h+='<p>'+q.stemAfter+'</p>';return h;}

/* ---------- intro ---------- */
function intro(){
  stopTick();
  var saved=load();
  var h='<div class="row">';
  h+='<button class="btn primary" id="startTimed">Start timed exam (Section I: 2 hours)</button>';
  h+='<button class="btn" id="startUntimed">Start untimed</button></div>';
  if(saved&&saved.phase&&saved.phase!=="intro"){h+='<div class="box y"><b>You have an exam in progress in this browser.</b> <button class="btn small" id="resume">Resume</button> <button class="btn small" id="discard">Discard and start over</button></div>';}
  h+='<h3>Practice by Big Idea (untimed, instant feedback)</h3><p>Choose the Big Ideas you want, then check each answer right away. The written response section is not included in this mode.</p><div class="row">';
  UNITS.forEach(function(u){h+='<label class="chk"><input type="checkbox" class="bchk" value="'+u.num+'" checked> Big Idea '+u.num+'</label>';});
  h+='<button class="btn" id="startPractice">Start practice</button></div>';
  document.getElementById("launch").innerHTML=h;
  document.getElementById("startTimed").onclick=function(){begin("exam",true);};
  document.getElementById("startUntimed").onclick=function(){begin("exam",false);};
  document.getElementById("startPractice").onclick=function(){
    var b=[].slice.call(document.querySelectorAll(".bchk:checked")).map(function(c){return c.value;});
    if(!b.length){alert("Choose at least one Big Idea.");return;} begin("practice",false,b);};
  if(document.getElementById("resume")){
    document.getElementById("resume").onclick=function(){st=saved;route();};
    document.getElementById("discard").onclick=function(){if(confirm("Discard your saved answers?")){clear();intro();}};
  }
}
function begin(mode,timed,bigs){
  st={mode:mode,timed:timed,bigs:bigs||["1","2","3","4","5"],phase:"mcq",cur:0,ans:{},flag:{},checked:{},wr:{},wrPts:{},mcqLeft:MCQ_SECS,wrLeft:WR_SECS};
  save();route();
}
function route(){
  var ib=document.getElementById("introBlock");
  if(!st||st.phase==="intro"){ib.classList.remove("hidden");app.innerHTML="";intro();return;}
  ib.classList.add("hidden");
  if(st.phase==="mcq")renderMCQ();else if(st.phase==="wrIntro")renderWRIntro();else if(st.phase==="wr")renderWR();else renderResults();
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
function refPanel(){return '<div id="refPanel" class="card refpanel hidden"><div class="row" style="justify-content:space-between"><h3>Exam reference sheet</h3><button class="btn small" id="refClose">Close</button></div>'+X.REF+'</div>';}
function wireRef(){
  var p=document.getElementById("refPanel");
  document.getElementById("refToggle").onclick=function(){p.classList.toggle("hidden");if(!p.classList.contains("hidden"))p.scrollIntoView({block:"start"});};
  document.getElementById("refClose").onclick=function(){p.classList.add("hidden");};
}
/* ---------- Section I ---------- */
function renderMCQ(){
  var qs=list(), q=qs[st.cur], practice=st.mode==="practice";
  var answered=qs.filter(isDone).length;
  var h='<div class="exam-bar"><div class="wrap"><div><b>'+(practice?"Practice: Big Idea "+st.bigs.join(", "):"Section I: Multiple Choice")+'</b> &middot; '+answered+' of '+qs.length+' answered</div>';
  h+='<div class="row">'+(st.timed?'<span class="timer" id="timer">'+fmt(st.mcqLeft)+'</span>':'<span class="muted">Untimed</span>')+'<button class="btn small" id="refToggle">Reference</button><button class="btn small" id="navToggle">Question list</button></div></div></div>';
  h+=refPanel()+'<div id="navPanel" class="card hidden"><div class="navgrid">';
  qs.forEach(function(x,i){var c=[];if(isDone(x))c.push("ans");if(st.flag[x.id])c.push("flag");if(i===st.cur)c.push("cur");
    if(practice&&st.checked[x.id])c.push(isRight(x)?"ok":"no");
    h+='<button data-i="'+i+'" class="'+c.join(" ")+'">'+x.id+'</button>';});
  h+='</div><div class="muted small">Filled = answered &middot; red dot = marked for review</div></div>';
  if(q.id===131&&!practice)h+='<div class="box b"><b>Directions for questions 131–138:</b> For each of these questions, select the <b>two</b> best answer choices.</div>';
  h+='<div class="qlayout'+(q.set?"":" single")+'">';
  if(q.set)h+='<div class="stimulus"><div class="settitle">'+setTitle(q.set)+'</div>'+S[q.set].html+'</div>';
  h+='<div class="question"><div class="qnum">Question '+q.id+(q.multi?' <span class="tag">Select two answers</span>':'')+'</div><p>'+q.stem+'</p>'+figures(q);
  var showKey=practice&&st.checked[q.id], a=picked(q);
  h+='<div class="opts'+(q.opts.some(function(o){return typeof o!=="string";})?" grid2":"")+'">';
  q.opts.forEach(function(o,i){var l=L[i],c="opt"+(q.multi?" multi":"");if(a.indexOf(l)>=0)c+=" sel";
    if(showKey){if(q.ans.indexOf(l)>=0)c+=" correct";else if(a.indexOf(l)>=0)c+=" wrong";}
    h+='<button class="'+c+'" data-l="'+l+'"'+(showKey?" disabled":"")+' aria-pressed="'+(a.indexOf(l)>=0)+'"><span class="let">'+l+'</span>'+optHTML(q,o)+'</button>';});
  h+='</div>';
  if(showKey){h+='<div class="box '+(isRight(q)?"g":"r")+'"><b>'+(isRight(q)?"Correct.":"Not quite. The answer is "+q.ans.split("").join(" and ")+".")+'</b> '+q.expl+'<div class="muted small" style="margin-top:6px">'+topicLink(q.topic)+'</div></div>';}
  h+='<div class="row" style="justify-content:space-between;margin-top:14px"><label class="chk"><input type="checkbox" id="flag"'+(st.flag[q.id]?" checked":"")+'> Mark for review</label>';
  h+='<div class="row">'+(st.cur>0?'<button class="btn small" id="prev">Back</button>':'');
  if(practice&&!showKey)h+='<button class="btn small primary" id="check"'+(isDone(q)?"":" disabled")+'>Check answer</button>';
  h+=(st.cur<qs.length-1?'<button class="btn small primary" id="next">Next</button>':'<button class="btn small primary" id="finish">'+(practice?"Finish practice":"Review and submit Section I")+'</button>')+'</div></div></div></div>';
  app.innerHTML=h;
  wireRef();
  document.getElementById("navToggle").onclick=function(){document.getElementById("navPanel").classList.toggle("hidden");};
  [].forEach.call(app.querySelectorAll(".navgrid button"),function(b){b.onclick=function(){st.cur=+b.dataset.i;save();renderMCQ();};});
  [].forEach.call(app.querySelectorAll(".opt"),function(b){b.onclick=function(){
    var l=b.dataset.l, cur=picked(q);
    if(q.multi){
      if(cur.indexOf(l)>=0)cur=cur.replace(l,"");else{if(cur.length>=2)cur=cur.slice(1);cur+=l;}
      st.ans[q.id]=cur.split("").sort().join("");
    } else st.ans[q.id]=l;
    save();renderMCQ();};});
  document.getElementById("flag").onchange=function(e){st.flag[q.id]=e.target.checked;save();renderMCQ();};
  if(document.getElementById("prev"))document.getElementById("prev").onclick=function(){st.cur--;save();renderMCQ();window.scrollTo(0,0);};
  if(document.getElementById("next"))document.getElementById("next").onclick=function(){st.cur++;save();renderMCQ();window.scrollTo(0,0);};
  if(document.getElementById("check"))document.getElementById("check").onclick=function(){st.checked[q.id]=true;save();renderMCQ();};
  if(document.getElementById("finish"))document.getElementById("finish").onclick=function(){
    var un=qs.filter(function(x){return !isDone(x);}).length, fl=qs.filter(function(x){return st.flag[x.id];}).length;
    var msg=(practice?"Finish practice?":"Submit Section I?")+(un?"\n"+un+" question(s) are not fully answered.":"")+(fl?"\n"+fl+" question(s) are marked for review.":"")+(practice?"":"\nYou cannot return to Section I after you submit.");
    if(confirm(msg))endMCQ();};
  if(!practice)startTick("mcqLeft",endMCQ);
}
function endMCQ(){stopTick();st.phase=st.mode==="practice"?"results":"wrIntro";save();route();}
/* ---------- Section II ---------- */
function pprHTML(){
  var h='<div class="ppr"><div class="ppr-h">Personalized Project Reference (sample program): '+esc(W.title)+'</div>';
  W.ppr.forEach(function(p){h+='<div class="ppr-part"><div class="ppr-lbl">'+p[0]+' part ('+p[1]+'): '+esc(p[2])+'</div>'+X.code(p[3],false)+'</div>';});
  return h+'</div>';
}
function renderWRIntro(){
  var h='<div class="eyebrow">Section II</div><h1>Written Response</h1><p>Section I is submitted. Section II has 2 questions with 4 prompts in all: Written Response 1, and Written Response 2 parts (a), (b), and (c). You have '+(st.timed?'60 minutes':'no time limit')+'.</p>'+W.intro;
  h+='<div class="box b">Answer in complete sentences, and point to specific parts of the code (a variable, a condition, a line) in every answer. You can scroll between the program and the prompts at any time.</div>';
  h+='<button class="btn primary" id="go">Begin Section II</button>';
  app.innerHTML=h;document.getElementById("go").onclick=function(){st.phase="wr";save();route();};
}
function renderWR(){
  var h='<div class="exam-bar"><div class="wrap"><div><b>Section II: Written Response</b></div><div>'+(st.timed?'<span class="timer" id="timer">'+fmt(st.wrLeft)+'</span>':'<span class="muted">Untimed</span>')+'</div></div></div>';
  h+='<div class="wrlayout"><div class="wrsrc">'+W.intro+pprHTML()+'</div><div>';
  W.parts.forEach(function(p,i){h+='<div class="card wrq"><div class="qnum">'+p.q+': '+p.label+'</div><p>'+p.prompt+'</p><textarea data-i="'+i+'" aria-label="Your response to '+esc(p.q)+'" placeholder="Type your response">'+esc(st.wr[i]||"")+'</textarea></div>';});
  h+='<button class="btn primary" id="submitWR">Submit Section II and see results</button></div></div>';
  app.innerHTML=h;
  [].forEach.call(app.querySelectorAll("textarea"),function(t){t.oninput=function(){st.wr[t.dataset.i]=t.value;save();};});
  document.getElementById("submitWR").onclick=function(){if(confirm("Submit Section II? You will then score your responses with the scoring guidelines."))endWR();};
  startTick("wrLeft",endWR);
}
function endWR(){stopTick();st.phase="results";save();route();}
/* ---------- results ---------- */
function tally(qs){var t={};qs.forEach(function(q){var k=big(q);t[k]=t[k]||{n:0,c:0};t[k].n++;if(isRight(q))t[k].c++;});
  var h='<div class="tablewrap"><table><tr><th>Big Idea</th><th>Correct</th><th style="width:38%">Percent</th></tr>';
  Object.keys(t).sort().forEach(function(k){var p=Math.round(100*t[k].c/t[k].n);h+='<tr><td>'+esc(BIG[k]||k)+'</td><td>'+t[k].c+' / '+t[k].n+'</td><td><div class="bar"><span style="width:'+p+'%"></span></div> '+p+'%</td></tr>';});
  return h+'</table></div>';}
function renderResults(){
  stopTick();
  var qs=list(), practice=st.mode==="practice";
  var c=qs.filter(isRight).length, wrMax=W.parts.length;
  var h='<div class="eyebrow">Score report</div><h1>'+esc(E.name)+(practice?" (practice)":"")+'</h1>';
  h+='<div class="grid3"><div class="card"><div class="muted">Section I: multiple choice</div><div class="score-big">'+c+' / '+qs.length+'</div><div class="muted">'+Math.round(100*c/qs.length)+'% correct</div></div>';
  if(!practice)h+='<div class="card"><div class="muted">Section II: written response (score yourself below)</div><div class="score-big" id="wrScore">0 / '+wrMax+'</div><div class="muted">1 point for each prompt</div></div>';
  h+='</div><p class="muted small">On the real exam, multiple choice is 70% of the AP score. The other 30% combines your Create performance task (program code and video) with the written responses, and the College Board converts the total to a 1–5 score. This report is for practice only.</p>';
  h+='<h2>Results by Big Idea</h2>'+tally(qs);
  var miss={};qs.forEach(function(q){if(!isRight(q))miss[q.topic]=(miss[q.topic]||0)+1;});
  var ml=Object.keys(miss).sort(function(a,b){return miss[b]-miss[a]||(parseFloat(a)-parseFloat(b));});
  h+='<h2>Topics to review</h2>'+(ml.length?'<p>Topics with missed questions, most misses first. Each link opens the lesson in the course.</p><ul>'+ml.map(function(t){return '<li>'+topicLink(t)+': '+miss[t]+' missed</li>';}).join("")+'</ul>':'<p>No missed questions. Excellent work.</p>');
  if(!practice){
    h+='<h2>Section II: score your responses</h2><p>Compare each response with the scoring guideline and the sample response. Check the box only if your response does everything the guideline asks.</p><details><summary>Show the sample program</summary>'+pprHTML()+'</details>';
    W.parts.forEach(function(p,i){h+='<div class="card wrq"><div class="qnum">'+p.q+': '+p.label+'</div><p>'+p.prompt+'</p><h4>Your response</h4><div class="box b pre">'+(st.wr[i]?esc(st.wr[i]):"<i>No response</i>")+'</div><h4>Scoring guideline (1 point)</h4><label class="chk block"><input type="checkbox" class="pt" data-k="'+i+'"'+(st.wrPts[i]?" checked":"")+'> '+p.rubric+'</label><details><summary>Sample response that earns the point</summary><div class="box g">'+esc(p.sample)+'</div></details></div>';});
  }
  h+='<h2>Question-by-question review</h2><label class="chk"><input type="checkbox" id="onlyMissed"> Show only missed questions</label><div id="rev">';
  qs.forEach(function(q){var ok=isRight(q),a=picked(q);
    h+='<div class="card rq'+(ok?" okq":"")+'"><div class="qnum">Question '+q.id+' '+(ok?'<span class="tag g">Correct</span>':'<span class="tag r">'+(a?"Incorrect":"Unanswered")+'</span>')+'</div>';
    if(q.set)h+='<details><summary>Show the shared information</summary><div class="stimulus static">'+S[q.set].html+'</div></details>';
    h+='<p>'+q.stem+'</p>'+figures(q)+'<div class="opts'+(q.opts.some(function(o){return typeof o!=="string";})?" grid2":"")+'">';
    q.opts.forEach(function(o,i){var l=L[i],cl="opt static";if(q.ans.indexOf(l)>=0)cl+=" correct";else if(a.indexOf(l)>=0)cl+=" wrong";h+='<div class="'+cl+'"><span class="let">'+l+'</span>'+optHTML(q,o)+'</div>';});
    h+='</div><div class="expl"><b>Answer: '+q.ans.split("").join(" and ")+'.</b> '+q.expl+'</div><div class="muted small">'+topicLink(q.topic)+'</div></div>';});
  h+='</div><div class="row"><button class="btn" onclick="window.print()">Print this report</button><button class="btn primary" id="restart">Start over</button></div>';
  app.innerHTML=h;
  function upd(){if(practice)return;var n=[].filter.call(app.querySelectorAll(".pt"),function(x){return x.checked;}).length;document.getElementById("wrScore").textContent=n+" / "+wrMax;}
  [].forEach.call(app.querySelectorAll(".pt"),function(x){x.onchange=function(){st.wrPts[x.dataset.k]=x.checked;save();upd();};});
  upd();
  document.getElementById("onlyMissed").onchange=function(e){[].forEach.call(app.querySelectorAll(".rq.okq"),function(d){d.classList.toggle("hidden",e.target.checked);});};
  document.getElementById("restart").onclick=function(){if(confirm("Clear this attempt and start over?")){clear();st=null;route();}};
}
route();
})();
