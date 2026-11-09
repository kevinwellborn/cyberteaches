/* Shared helpers for the AP CSP practice exam and its printable booklet:
   the reference sheet, text and block code rendering, and robot grids. All text is original. */
(function(){
"use strict";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}

/* ---------- code: text form ---------- */
function codeText(src){return '<pre class="code">'+esc(src)+'</pre>';}

/* ---------- code: block form ---------- */
function parse(lines){
  var i=0;
  function seq(){
    var out=[];
    while(i<lines.length){
      var t=lines[i].trim();
      if(t==="}"){i++;return out;}
      if(t===""){i++;continue;}
      if(lines[i+1]&&lines[i+1].trim()==="{"){
        i+=2;var body=seq();
        if(t==="ELSE"&&out.length&&out[out.length-1].body&&!out[out.length-1].els){out[out.length-1].els=body;}
        else out.push({head:t,body:body});
      } else {out.push({head:t});i++;}
    }
    return out;
  }
  return seq();
}
function kind(h){
  if(/^(IF|ELSE|REPEAT|FOR EACH)\b/.test(h))return "ctl";
  if(/^PROCEDURE\b/.test(h))return "proc";
  if(/^(MOVE_FORWARD|ROTATE_LEFT|ROTATE_RIGHT)\b/.test(h))return "bot";
  if(/←/.test(h))return "set";
  return "call";
}
function label(h){
  var m;
  if((m=h.match(/^IF\s*\((.*)\)$/)))return '<b>IF</b> <span class="slot">'+esc(m[1])+'</span>';
  if((m=h.match(/^REPEAT UNTIL\s*\((.*)\)$/)))return '<b>REPEAT UNTIL</b> <span class="slot">'+esc(m[1])+'</span>';
  if((m=h.match(/^REPEAT (.*) TIMES$/)))return '<b>REPEAT</b> <span class="slot">'+esc(m[1])+'</span> <b>TIMES</b>';
  if((m=h.match(/^FOR EACH (\w+) IN (.*)$/)))return '<b>FOR EACH</b> <span class="slot">'+esc(m[1])+'</span> <b>IN</b> <span class="slot">'+esc(m[2])+'</span>';
  if((m=h.match(/^PROCEDURE (\w+)\s*\((.*)\)$/)))return '<b>PROCEDURE</b> '+esc(m[1])+' <span class="slot">'+esc(m[2])+'</span>';
  if((m=h.match(/^(\w+(?:\[[^\]]*\])?)\s*←\s*(.*)$/)))return esc(m[1])+' <b>←</b> <span class="slot">'+esc(m[2])+'</span>';
  return esc(h);
}
function blk(nodes){
  return nodes.map(function(n){
    var k=kind(n.head);
    if(!n.body)return '<div class="b b-'+k+'">'+label(n.head)+'</div>';
    var h='<div class="b b-'+k+' b-c"><div class="b-hd">'+label(n.head)+'</div><div class="b-body">'+(blk(n.body)||'<div class="b-empty"></div>')+'</div>';
    if(n.els)h+='<div class="b-hd"><b>ELSE</b></div><div class="b-body">'+blk(n.els)+'</div>';
    return h+'<div class="b-ft"></div></div>';
  }).join("");
}
function codeBlock(src){return '<div class="blocks" role="img" aria-label="Block-based code: '+esc(src.replace(/\s+/g," "))+'">'+blk(parse(src.split("\n")))+'</div>';}
function code(src,asBlock){return asBlock?codeBlock(src):codeText(src);}

/* ---------- robot grid ---------- */
function robot(g){
  var rows=g.rows, R=rows.length, C=rows[0].length, s=36, w=C*s, h=R*s, o='';
  for(var r=0;r<R;r++)for(var c=0;c<C;c++){
    var ch=rows[r][c], x=c*s, y=r*s;
    o+='<rect x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" class="'+(ch==="#"?"wall":ch==="G"?"goal":"cell")+'"/>';
    if(/[A-F]/.test(ch))o+='<text x="'+(x+s/2)+'" y="'+(y+s/2+6)+'" class="lbl">'+ch+'</text>';
  }
  var cx=g.c*s+s/2, cy=g.r*s+s/2, a={N:0,E:90,S:180,W:270}[g.dir];
  o+='<polygon class="bot" points="'+cx+','+(cy-12)+' '+(cx+10)+','+(cy+10)+' '+(cx-10)+','+(cy+10)+'" transform="rotate('+a+' '+cx+' '+cy+')"/>';
  return '<svg class="robot" viewBox="-1 -1 '+(w+2)+' '+(h+2)+'" width="'+Math.min(w+2,260)+'" role="img" aria-label="Robot grid, '+R+' rows by '+C+' columns">'+o+'</svg>';
}

/* ---------- reference sheet (original wording) ---------- */
function row(t,ex){return '<tr><td><pre class="code">'+esc(t)+'</pre></td><td>'+ex+'</td></tr>';}
var REF='<div class="ref"><p>AP CSP does not use one specific programming language. Exam questions use the text-based pseudocode below (some questions show the same instructions as blocks). There are four data types: numbers, Booleans, strings, and lists.</p>'+
'<h4>Assignment, display, and input</h4><table>'+
row("a ← expression","Evaluates <i>expression</i> and stores a copy of the result in the variable <code>a</code>.")+
row("DISPLAY(expression)","Shows the value of <i>expression</i>, followed by a space.")+
row("INPUT()","Gets a value from the user and returns it.")+'</table>'+
'<h4>Arithmetic</h4><table>'+
row("a + b\na - b\na * b\na / b","Add, subtract, multiply, and divide. Normal math order of operations applies. Example: 14 / 4 evaluates to 3.5.")+
row("a MOD b","The remainder when <code>a</code> is divided by <code>b</code> (a ≥ 0, b > 0). Example: 14 MOD 4 evaluates to 2. MOD has the same precedence as * and /.")+
row("RANDOM(a, b)","Returns a random integer from <code>a</code> to <code>b</code>, including both. Each integer is equally likely. Example: RANDOM(2, 4) can return 2, 3, or 4.")+'</table>'+
'<h4>Relational and Boolean operators</h4><table>'+
row("a = b    a ≠ b\na > b    a < b\na ≥ b    a ≤ b","Compare two values. The result is a Boolean: true or false.")+
row("NOT condition","true when <i>condition</i> is false, and false when it is true.")+
row("condition1 AND condition2","true only when both conditions are true.")+
row("condition1 OR condition2","true when at least one of the conditions is true.")+'</table>'+
'<h4>Selection</h4><table>'+
row("IF(condition)\n{\n  <block of statements>\n}","Runs the block only if <i>condition</i> is true.")+
row("IF(condition)\n{\n  <first block>\n}\nELSE\n{\n  <second block>\n}","Runs the first block if <i>condition</i> is true; otherwise runs the second block.")+'</table>'+
'<h4>Iteration</h4><table>'+
row("REPEAT n TIMES\n{\n  <block of statements>\n}","Runs the block <code>n</code> times.")+
row("REPEAT UNTIL(condition)\n{\n  <block of statements>\n}","Checks <i>condition</i> before each pass and keeps running the block until the condition is true.")+'</table>'+
'<h4>Lists</h4><p>List indexes start at 1. Using an index less than 1 or greater than the length of the list causes an error, and the program stops.</p><table>'+
row("aList ← [value1, value2, ...]","Creates a list holding the values in order (value1 at index 1, and so on).")+
row("aList ← []","Creates an empty list.")+
row("aList ← bList","Stores a copy of <code>bList</code> in <code>aList</code>.")+
row("aList[i]","The element at index <code>i</code>. Can be read (x ← aList[i]) or changed (aList[i] ← x).")+
row("INSERT(aList, i, value)","Moves the elements at index i and higher one place to the right, then puts <i>value</i> at index i. The length grows by 1.")+
row("APPEND(aList, value)","Adds <i>value</i> to the end of the list. The length grows by 1.")+
row("REMOVE(aList, i)","Removes the element at index i and moves later elements one place to the left. The length shrinks by 1.")+
row("LENGTH(aList)","The number of elements in the list.")+
row("FOR EACH item IN aList\n{\n  <block of statements>\n}","Runs the block once for each element, in order from first to last. Each time, <code>item</code> holds the current element.")+'</table>'+
'<h4>Procedures</h4><table>'+
row("PROCEDURE name(p1, p2, ...)\n{\n  <block of statements>\n}","Defines a procedure with zero or more parameters. Call it with name(arg1, arg2, ...); each argument is assigned to the matching parameter.")+
row("RETURN(expression)","Ends the procedure right away and sends the value of <i>expression</i> back to where the procedure was called, for example result ← name(arg1, arg2).")+'</table>'+
'<h4>Robot</h4><p>Some questions show a robot (a triangle) in a grid of squares. The robot faces the way the triangle points. If the robot would move into a black square or off the grid, it stays where it is and the program ends.</p><table>'+
row("MOVE_FORWARD()","Moves the robot one square in the direction it is facing.")+
row("ROTATE_LEFT()","Turns the robot 90 degrees to the left (counterclockwise) in place.")+
row("ROTATE_RIGHT()","Turns the robot 90 degrees to the right (clockwise) in place.")+
row("CAN_MOVE(direction)","true if there is an open square next to the robot in <i>direction</i> (left, right, forward, or backward, relative to the way the robot faces); otherwise false.")+'</table></div>';

window.CSP={esc:esc,code:code,robot:robot,REF:REF};
})();
