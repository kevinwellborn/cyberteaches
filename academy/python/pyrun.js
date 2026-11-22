// A small Python interpreter for the Python Quest game. It runs a beginner subset of real Python
// (numbers, strings, True/False, variables, if/elif/else, while, for ... in range(...), def/return,
// break/continue, print) right in the browser, with nothing to download, and explains mistakes in kid-friendly words.
// PyRun.run(source, {globals, maxSteps, print}) runs the program; hero methods are plain JS functions in globals.
(function(root){
  class PyError extends Error { constructor(line, msg){ super(msg); this.line = line; this.py = true } }
  class Stop { constructor(reason){ this.reason = reason } }   // thrown by the game to end the program (win / lose)
  const err = (line, msg) => { throw new PyError(line, msg) };

  // ---------- spelling help ----------
  const dist = (a, b) => {
    const d = Array.from({length: a.length + 1}, (_, i) => [i]);
    for(let j = 1; j <= b.length; j++) d[0][j] = j;
    for(let i = 1; i <= a.length; i++) for(let j = 1; j <= b.length; j++)
    { d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
      if(i > 1 && j > 1 && a[i-1] === b[j-2] && a[i-2] === b[j-1]) d[i][j] = Math.min(d[i][j], d[i-2][j-2] + 1) }
    return d[a.length][b.length];
  };
  const closest = (w, list) => {
    let best = null, bd = 99;
    list.forEach(c => { const x = dist(w.toLowerCase(), c.toLowerCase()); if(x < bd){ bd = x; best = c } });
    return bd <= Math.max(1, Math.round(w.length / 3)) || (best && best.toLowerCase() === w.toLowerCase()) ? best : null;
  };

  // ---------- tokenizer ----------
  const KEYWORDS = new Set(['if','elif','else','while','for','in','def','return','pass','break','continue','and','or','not','True','False','None']);
  const BLOCK_WORDS = ['if','elif','else','while','for','def'];
  function tokenize(src){
    const toks = [], indents = [0];
    const lines = src.replace(/\r\n?/g, '\n').split('\n');
    let depth = 0, openLine = 0, lineStart = null;   // open brackets: lines inside ( ) continue
    for(let ln = 0; ln < lines.length; ln++){
      const line = lines[ln].replace(/\t/g, '    '), L = ln + 1;
      let i = 0;
      if(depth === 0){
        const m = line.match(/^ */); const ind = m[0].length; const rest = line.slice(ind);
        if(rest === '' || rest[0] === '#') continue;
        const top = indents[indents.length - 1];
        if(ind > top){
          const prev = toks.length ? toks[toks.length - 2] : null;   // token before the last NEWLINE
          if((!prev || prev.v !== ':') && lineStart && BLOCK_WORDS.includes(lineStart.v)) err(lineStart.line, 'Line ' + lineStart.line + ': add a colon : at the end of the ' + lineStart.v + ' line.');
          if(!prev || prev.v !== ':') err(L, 'This line is pushed in (indented), but the line above does not end with a colon :. Remove the spaces at the start of line ' + L + '.');
          indents.push(ind); toks.push({t: 'INDENT', line: L});
        } else {
          if(toks.length && toks[toks.length - 2] && toks[toks.length - 2].v === ':')
            err(L, 'The line above ends with a colon :, so line ' + L + ' must be pushed in (indented) 4 spaces.');
          while(ind < indents[indents.length - 1]){ indents.pop(); toks.push({t: 'DEDENT', line: L}) }
          if(ind !== indents[indents.length - 1]) err(L, 'The spaces at the start of line ' + L + ' do not line up with the lines above. Use 4 spaces for each step in.');
        }
        i = ind;
        lineStart = null;
      }
      while(i < line.length){
        const c = line[i];
        if(c === ' '){ i++; continue }
        if(c === '#') break;
        if(/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(line[i+1] || ''))){
          const m = line.slice(i).match(/^[0-9]*\.?[0-9]*/)[0];
          toks.push({t: 'NUM', v: Number(m), line: L}); i += m.length;
          if(/[A-Za-z_]/.test(line[i] || '')) err(L, 'A name can\'t start with a number on line ' + L + '.');
          continue;
        }
        if(/[A-Za-z_]/.test(c)){
          const m = line.slice(i).match(/^[A-Za-z_][A-Za-z_0-9]*/)[0];
          toks.push({t: KEYWORDS.has(m) ? 'KW' : 'NAME', v: m, line: L}); if(!lineStart) lineStart = toks[toks.length - 1]; i += m.length; continue;
        }
        if(c === '"' || c === "'"){
          let j = i + 1, s = '';
          while(j < line.length && line[j] !== c){ if(line[j] === '\\' && j + 1 < line.length){ j++; s += ({n: '\n', t: '\t'})[line[j]] || line[j] } else s += line[j]; j++ }
          if(j >= line.length) err(L, 'The text on line ' + L + ' is missing its closing quote ' + c + '.');
          toks.push({t: 'STR', v: s, line: L}); i = j + 1; continue;
        }
        const two = line.substr(i, 2);
        if(['==','!=','<=','>=','//','+=','-=','*=','**'].includes(two)){ toks.push({t: 'OP', v: two, line: L}); i += 2; continue }
        if('()[],:.+-*/%<>='.includes(c)){
          if('(['.includes(c)){ if(!depth) openLine = L; depth++ }
          if(')]'.includes(c)){ depth--; if(depth < 0) err(L, 'Line ' + L + ' has a closing ' + c + ' with no opening ' + (c === ')' ? '(' : '[') + ' before it.') }
          toks.push({t: 'OP', v: c, line: L}); i++; continue;
        }
        if(c === '!' ) err(L, 'Python writes "not equal" as != and "not" as the word not (line ' + L + ').');
        if(c === '{' || c === '}' || c === ';') err(L, 'Python doesn\'t use ' + c + ' here (line ' + L + '). Use a colon : and indent the lines inside instead.');
        err(L, 'Python doesn\'t understand the symbol ' + c + ' on line ' + L + '.');
      }
      if(depth > 0 && (ln === lines.length - 1 || /^\s*(hero\.|sword\.|shield\.|pickaxe\.|if |for |while |def |print\()/.test(lines[ln + 1] || ''))) err(openLine, 'A bracket ( on line ' + openLine + ' is never closed. Add the missing ).');
      if(depth === 0 && toks.length && toks[toks.length - 1].t !== 'NEWLINE' && toks[toks.length - 1].t !== 'INDENT' && toks[toks.length - 1].t !== 'DEDENT')
        toks.push({t: 'NEWLINE', line: L});
    }
    if(depth > 0) err(openLine, 'A bracket ( is never closed. Add the missing ).');
    const last = toks.length ? toks[toks.length - 1].line : 1;
    if(toks.length >= 2 && toks[toks.length - 2].v === ':') err(last, 'Line ' + last + ' ends with a colon :, so it needs at least one indented line under it.');
    while(indents.length > 1){ indents.pop(); toks.push({t: 'DEDENT', line: last}) }
    toks.push({t: 'EOF', line: last});
    return toks;
  }

  // ---------- parser ----------
  function parse(src){
    const toks = tokenize(src); let p = 0;
    const peek = (o = 0) => toks[p + o];
    const is = (t, v, o = 0) => { const k = toks[p + o]; return k.t === t && (v === undefined || k.v === v) };
    const isOp = (v, o) => is('OP', v, o), isKw = (v, o) => is('KW', v, o);
    const next = () => toks[p++];
    const show = k => k.t === 'NEWLINE' ? 'the end of the line' : k.t === 'EOF' ? 'the end of the program' : k.t === 'INDENT' || k.t === 'DEDENT' ? 'the indentation' : '"' + k.v + '"';
    const expectOp = (v, why) => { if(!isOp(v)) err(peek().line, why || ('Line ' + peek().line + ': expected ' + v + ' but found ' + show(peek()) + '.')); return next() };
    const colon = word => { if(!isOp(':')){ const L = peek().line; err(L, isOp('=') && ['if','elif','while'].includes(word) ? 'Line ' + L + ': to compare two things use == (two equal signs), not =.' : 'Line ' + L + ': add a colon : at the end of the ' + word + ' line.') } next() };

    function block(word){
      colon(word);
      if(!is('NEWLINE')){ const s = simple(); if(!is('NEWLINE') && !is('EOF')) err(peek().line, 'Line ' + peek().line + ': put each command on its own line.'); if(is('NEWLINE')) next(); return [s] }
      next();
      if(!is('INDENT')) err(peek().line, 'The lines inside the ' + word + ' must be pushed in (indented) 4 spaces.');
      next(); const body = [];
      while(!is('DEDENT') && !is('EOF')) body.push(statement());
      if(is('DEDENT')) next();
      return body;
    }
    function statement(){
      const k = peek(), L = k.line;
      if(k.t === 'INDENT') err(L, 'Line ' + L + ' is pushed in (indented) but should not be. Remove the spaces at the start.');
      if(isKw('if')){
        next(); const branches = [{test: expr(), body: block('if'), line: L}]; let orelse = null;
        while(isKw('elif')){ const l2 = next().line; branches.push({test: expr(), body: block('elif'), line: l2}) }
        if(isKw('else')){ next(); orelse = block('else') }
        return {k: 'if', branches, orelse, line: L};
      }
      if(isKw('elif') || isKw('else')) err(L, 'Line ' + L + ': ' + k.v + ' must come right after an if block, lined up with the if.');
      if(isKw('while')){ next(); const test = expr(); return {k: 'while', test, body: block('while'), line: L} }
      if(isKw('for')){
        next(); if(!is('NAME')) err(L, 'Line ' + L + ': write a loop like  for i in range(3):');
        const name = next().v;
        if(!isKw('in')) err(L, 'Line ' + L + ': a for loop needs the word in, like  for i in range(3):');
        next(); const iter = expr();
        return {k: 'for', name, iter, body: block('for'), line: L};
      }
      if(isKw('def')){
        next(); if(!is('NAME')) err(L, 'Line ' + L + ': give your function a name, like  def climb_twice():');
        const name = next().v; expectOp('(', 'Line ' + L + ': a function needs ( ) after its name, like  def ' + name + '():');
        const params = [];
        while(!isOp(')')){ if(!is('NAME')) err(L, 'Line ' + L + ': the things inside ( ) of def must be names.'); params.push(next().v); if(isOp(',')) next(); else break }
        expectOp(')', 'Line ' + L + ': close the ( with ) in the def line.');
        return {k: 'def', name, params, body: block('def'), line: L};
      }
      const s = simple();
      if(!is('NEWLINE') && !is('EOF') && !is('DEDENT')) err(L, 'Line ' + L + ': Python found ' + show(peek()) + ' where the line should end. Put each command on its own line.');
      if(is('NEWLINE')) next();
      return s;
    }
    function simple(){
      const k = peek(), L = k.line;
      if(isKw('pass')){ next(); return {k: 'pass', line: L} }
      if(isKw('break')){ next(); return {k: 'break', line: L} }
      if(isKw('continue')){ next(); return {k: 'continue', line: L} }
      if(isKw('return')){ next(); return {k: 'return', value: is('NEWLINE') || is('EOF') ? null : expr(), line: L} }
      if(is('NAME') && (isOp('=', 1) || isOp('+=', 1) || isOp('-=', 1) || isOp('*=', 1))){
        const name = next().v, op = next().v; return {k: 'assign', name, op, value: expr(), line: L};
      }
      const e = expr();
      if(isOp('=')) err(L, 'Line ' + L + ': you can only store a value in a plain name, like  steps = 3.');
      return {k: 'expr', e, line: L};
    }
    // expressions, lowest precedence first
    function expr(){ let a = andE(); while(isKw('or')){ const L = next().line; a = {k: 'or', a, b: andE(), line: L} } return a }
    function andE(){ let a = notE(); while(isKw('and')){ const L = next().line; a = {k: 'and', a, b: notE(), line: L} } return a }
    function notE(){ if(isKw('not')){ const L = next().line; return {k: 'not', a: notE(), line: L} } return cmp() }
    function cmp(){
      let a = add();
      while(['==','!=','<','>','<=','>='].some(o => isOp(o)) || isKw('in') || (isKw('not') && isKw('in', 1))){
        const L = peek().line; let op;
        if(isKw('not')){ next(); next(); op = 'not in' } else op = next().v;
        a = {k: 'cmp', op, a, b: add(), line: L};
      }
      return a;
    }
    function add(){ let a = mul(); while(isOp('+') || isOp('-')){ const t = next(); a = {k: 'bin', op: t.v, a, b: mul(), line: t.line} } return a }
    function mul(){ let a = unary(); while(isOp('*') || isOp('/') || isOp('//') || isOp('%')){ const t = next(); a = {k: 'bin', op: t.v, a, b: unary(), line: t.line} } return a }
    function unary(){ if(isOp('-')){ const L = next().line; return {k: 'neg', a: unary(), line: L} } if(isOp('+')){ next(); return unary() } return power() }
    function power(){ const a = postfix(); if(isOp('**')){ const L = next().line; return {k: 'bin', op: '**', a, b: unary(), line: L} } return a }
    function postfix(){
      let a = atom();
      for(;;){
        if(isOp('(')){
          const L = next().line, args = [];
          while(!isOp(')')){ args.push(expr()); if(isOp(',')) next(); else break }
          expectOp(')', 'Line ' + L + ': close the ( with a ).');
          a = {k: 'call', f: a, args, line: L};
        } else if(isOp('.')){
          const L = next().line; if(!is('NAME')) err(L, 'Line ' + L + ': write a name after the dot, like hero.run().');
          a = {k: 'attr', obj: a, name: next().v, line: L};
        } else if(isOp('[')){
          const L = next().line; const idx = expr(); expectOp(']', 'Line ' + L + ': close the [ with a ].');
          a = {k: 'index', obj: a, idx, line: L};
        } else return a;
      }
    }
    function atom(){
      const k = peek(), L = k.line;
      if(k.t === 'NUM'){ next(); return {k: 'const', v: k.v, line: L} }
      if(k.t === 'STR'){ next(); return {k: 'const', v: k.v, line: L} }
      if(isKw('True')){ next(); return {k: 'const', v: true, line: L} }
      if(isKw('False')){ next(); return {k: 'const', v: false, line: L} }
      if(isKw('None')){ next(); return {k: 'const', v: null, line: L} }
      if(k.t === 'NAME'){ next(); return {k: 'name', name: k.v, line: L} }
      if(isOp('(')){ next(); const e = expr(); expectOp(')', 'Line ' + L + ': close the ( with a ).'); return e }
      if(isOp('[')){
        next(); const items = [];
        while(!isOp(']')){ items.push(expr()); if(isOp(',')) next(); else break }
        expectOp(']', 'Line ' + L + ': close the [ with a ].'); return {k: 'list', items, line: L};
      }
      if(k.t === 'KW' && BLOCK_WORDS.includes(k.v)) err(L, 'Line ' + L + ': ' + k.v + ' must start its own line.');
      if(k.t === 'INDENT') err(L, 'Line ' + L + ' is pushed in (indented) but should not be.');
      err(L, 'Line ' + L + ': Python didn\'t expect ' + show(k) + ' here.');
    }
    const body = [];
    while(!is('EOF')){ if(is('NEWLINE')){ next(); continue } body.push(statement()) }
    return body;
  }

  // ---------- values ----------
  class Fn { constructor(name, params, body, line){ Object.assign(this, {name, params, body, line}) } }
  const typeName = v => v === null ? 'None' : typeof v === 'boolean' ? 'True/False' : typeof v === 'number' ? 'number' : typeof v === 'string' ? 'text' : Array.isArray(v) ? 'list' : 'function';
  const truthy = v => v === null ? false : Array.isArray(v) ? v.length > 0 : typeof v === 'string' ? v.length > 0 : !!v;
  const repr = (v, top) => v === null ? 'None' : v === true ? 'True' : v === false ? 'False'
    : typeof v === 'string' ? (top ? v : "'" + v + "'") : typeof v === 'number' ? (Number.isInteger(v) || !isFinite(v) ? String(v) : String(+v.toFixed(10)))
    : Array.isArray(v) ? '[' + v.map(x => repr(x)).join(', ') + ']' : '<function>';

  class BreakSig {} class ContinueSig {} class ReturnSig { constructor(v){ this.v = v } }

  function run(src, opts = {}){
    const ast = parse(src);
    const builtins = {
      range: (line, ...a) => {
        if(a.length < 1 || a.length > 3) err(line, 'Line ' + line + ': range needs 1 to 3 numbers, like range(5).');
        a.forEach(x => { if(typeof x !== 'number' || !Number.isInteger(x)) err(line, 'Line ' + line + ': range needs whole numbers, like range(5).') });
        let [s, e, st] = a.length === 1 ? [0, a[0], 1] : [a[0], a[1], a[2] || 1];
        if(st === 0) err(line, 'Line ' + line + ': the step in range can\'t be 0.');
        const out = []; for(let i = s; st > 0 ? i < e : i > e; i += st){ out.push(i); if(out.length > 10000) break } return out;
      },
      print: (line, ...a) => { (opts.print || (() => {}))(a.map(x => repr(x, true)).join(' '), line); return null },
      len: (line, x) => { if(typeof x !== 'string' && !Array.isArray(x)) err(line, 'Line ' + line + ': len() works on text or lists.'); return x.length },
      abs: (line, x) => Math.abs(num(x, line, 'abs')),
      min: (line, ...a) => Math.min(...(a.length === 1 && Array.isArray(a[0]) ? a[0] : a)),
      max: (line, ...a) => Math.max(...(a.length === 1 && Array.isArray(a[0]) ? a[0] : a)),
      str: (line, x) => repr(x, true),
      int: (line, x) => { const n = typeof x === 'string' ? Number(x) : x; if(typeof n !== 'number' || isNaN(n)) err(line, 'Line ' + line + ': int() needs a number.'); return Math.trunc(n) },
    };
    const globals = Object.assign({}, opts.globals || {});
    const maxSteps = opts.maxSteps || 20000; let steps = 0, depth = 0;
    const num = (v, line, what) => { if(typeof v !== 'number') err(line, 'Line ' + line + ': ' + what + ' needs a number, but got ' + typeName(v) + ' ' + repr(v) + '.'); return v };
    const knownNames = scope => [...Object.keys(globals), ...Object.keys(builtins), ...Object.keys(scope || {})];

    function lookup(name, scope, line){
      if(scope && name in scope) return scope[name];
      if(name in globals) return globals[name];
      if(name in builtins) return {builtin: builtins[name], name};
      if(name.toLowerCase() === 'hero' || closest(name, ['hero']) === 'hero') err(line, 'Line ' + line + ': Python doesn\'t know "' + name + '". Write hero in small letters: Python cares about spelling and capital letters.');
      const c = closest(name, knownNames(scope));
      if(c) err(line, 'Line ' + line + ': Python doesn\'t know "' + name + '". Did you mean ' + c + '?');
      if(scope === null && false) return;
      err(line, 'Line ' + line + ': Python doesn\'t know what "' + name + '" is. Check the spelling, or give it a value first (like ' + name + ' = 1).');
    }
    function evalE(n, sc){
      switch(n.k){
        case 'const': return n.v;
        case 'name': return lookup(n.name, sc, n.line);
        case 'list': return n.items.map(x => evalE(x, sc));
        case 'or': { const a = evalE(n.a, sc); return truthy(a) ? a : evalE(n.b, sc) }
        case 'and': { const a = evalE(n.a, sc); return truthy(a) ? evalE(n.b, sc) : a }
        case 'not': return !truthy(evalE(n.a, sc));
        case 'neg': return -num(evalE(n.a, sc), n.line, 'The minus sign');
        case 'cmp': {
          const a = evalE(n.a, sc), b = evalE(n.b, sc);
          if(n.op === 'in' || n.op === 'not in'){
            if(typeof b !== 'string' && !Array.isArray(b)) err(n.line, 'Line ' + n.line + ': in needs text or a list on its right.');
            const r = typeof b === 'string' ? b.includes(a) : b.some(x => x === a); return n.op === 'in' ? r : !r;
          }
          if(n.op === '==') return a === b; if(n.op === '!=') return a !== b;
          if(typeof a !== typeof b || (typeof a !== 'number' && typeof a !== 'string')) err(n.line, 'Line ' + n.line + ': can\'t compare ' + typeName(a) + ' and ' + typeName(b) + ' with ' + n.op + '.');
          return n.op === '<' ? a < b : n.op === '>' ? a > b : n.op === '<=' ? a <= b : a >= b;
        }
        case 'bin': {
          const a = evalE(n.a, sc), b = evalE(n.b, sc);
          if(n.op === '+'){
            if(typeof a === 'string' && typeof b === 'string') return a + b;
            if(Array.isArray(a) && Array.isArray(b)) return a.concat(b);
            if(typeof a === 'string' || typeof b === 'string') err(n.line, 'Line ' + n.line + ': can\'t add text and a number. Use str(), like "steps: " + str(3).');
          }
          if(n.op === '*' && typeof a === 'string' && typeof b === 'number') return a.repeat(Math.max(0, b));
          num(a, n.line, n.op); num(b, n.line, n.op);
          switch(n.op){
            case '+': return a + b; case '-': return a - b; case '*': return a * b; case '**': return Math.pow(a, b);
            case '/': if(b === 0) err(n.line, 'Line ' + n.line + ': you can\'t divide by zero.'); return a / b;
            case '//': if(b === 0) err(n.line, 'Line ' + n.line + ': you can\'t divide by zero.'); return Math.floor(a / b);
            case '%': if(b === 0) err(n.line, 'Line ' + n.line + ': you can\'t divide by zero.'); return ((a % b) + b) % b;
          }
        }
        case 'index': {
          const o = evalE(n.obj, sc), i = evalE(n.idx, sc);
          if(typeof o !== 'string' && !Array.isArray(o)) err(n.line, 'Line ' + n.line + ': only lists and text can use [ ].');
          num(i, n.line, '[ ]'); const j = i < 0 ? o.length + i : i;
          if(j < 0 || j >= o.length) err(n.line, 'Line ' + n.line + ': position ' + i + ' is past the end (there are ' + o.length + ' items, counting from 0).');
          return o[j];
        }
        case 'attr': {
          const o = evalE(n.obj, sc);
          if(o && typeof o === 'object' && !Array.isArray(o) && o.__methods){
            if(n.name in o) return o[n.name];
            const c = closest(n.name, Object.keys(o).filter(x => !x.startsWith('__')));
            const who = o.__name || 'hero';
            err(n.line, 'Line ' + n.line + ': the ' + who + ' doesn\'t know how to "' + n.name + '".' + (c ? ' Did you mean ' + who + '.' + c + '()?' : ' See the command list for what the ' + who + ' can do.'));
          }
          err(n.line, 'Line ' + n.line + ': ' + repr(o) + ' has nothing called .' + n.name + '.');
        }
        case 'call': {
          const f = evalE(n.f, sc), args = n.args.map(x => evalE(x, sc));
          return call(f, args, n);
        }
      }
      err(n.line, 'Line ' + n.line + ': something here is not supported yet.');
    }
    function call(f, args, n){
      if(++steps > maxSteps) err(n.line, 'Your program ran too long. Is there a loop that never stops?');
      if(f && f.builtin) return f.builtin(n.line, ...args);
      if(typeof f === 'function') return f(n.line, ...args);
      if(f instanceof Fn){
        if(args.length !== f.params.length) err(n.line, 'Line ' + n.line + ': ' + f.name + '() needs ' + f.params.length + ' value' + (f.params.length === 1 ? '' : 's') + ' inside ( ), but got ' + args.length + '.');
        if(++depth > 100) err(n.line, 'Line ' + n.line + ': ' + f.name + '() keeps calling itself and never stops.');
        const scope = {}; f.params.forEach((p, i) => scope[p] = args[i]);
        try { execBlock(f.body, scope) }
        catch(e){ if(e instanceof ReturnSig){ depth--; return e.v } depth--; throw e }
        depth--; return null;
      }
      err(n.line, 'Line ' + n.line + ': ' + repr(f) + ' is not something you can call with ( ).');
    }
    function execBlock(body, sc){ for(const s of body) exec(s, sc) }
    function exec(s, sc){
      if(++steps > maxSteps) err(s.line, 'Your program ran too long. Is there a loop that never stops?');
      switch(s.k){
        case 'expr': {
          const v = evalE(s.e, sc);
          if(typeof v === 'function' || v instanceof Fn || (v && v.builtin)){
            const what = s.e.k === 'attr' ? (s.e.obj && s.e.obj.k === 'name' ? s.e.obj.name : 'hero') + '.' + s.e.name : s.e.k === 'name' ? s.e.name : 'it';
            err(s.line, 'Line ' + s.line + ': add ( ) to run it: ' + what + '()');
          }
          return;
        }
        case 'assign': {
          const target = sc || globals;
          if(s.name === 'hero') err(s.line, 'Line ' + s.line + ': don\'t store something in hero, or you will lose your hero!');
          if(s.name === 'sword' || s.name === 'shield' || s.name === 'pickaxe') err(s.line, 'Line ' + s.line + ': don\'t store something in ' + s.name + ', or the explorer will lose it! Use ' + s.name + (s.name === 'sword' ? '.attack(3)' : s.name === 'pickaxe' ? '.mine()' : '.defend(2)') + '.');
          let v = evalE(s.value, sc);
          if(s.op !== '='){
            const old = lookup(s.name, sc, s.line);
            if(s.op === '+=') v = typeof old === 'string' && typeof v === 'string' ? old + v : num(old, s.line, '+=') + num(v, s.line, '+=');
            else if(s.op === '-=') v = num(old, s.line, '-=') - num(v, s.line, '-=');
            else v = num(old, s.line, '*=') * num(v, s.line, '*=');
          }
          target[s.name] = v; return;
        }
        case 'if': {
          for(const b of s.branches) if(truthy(evalE(b.test, sc))){ execBlock(b.body, sc); return }
          if(s.orelse) execBlock(s.orelse, sc); return;
        }
        case 'while': {
          while(truthy(evalE(s.test, sc))){
            try { execBlock(s.body, sc) } catch(e){ if(e instanceof BreakSig) break; if(e instanceof ContinueSig) continue; throw e }
          }
          return;
        }
        case 'for': {
          const it = evalE(s.iter, sc);
          if(typeof it === 'number') err(s.line, 'Line ' + s.line + ': to repeat ' + it + ' times write  for i in range(' + it + '):');
          if(!Array.isArray(it) && typeof it !== 'string') err(s.line, 'Line ' + s.line + ': a for loop needs range(...) or a list after in.');
          for(const v of it){
            (sc || globals)[s.name] = v;
            try { execBlock(s.body, sc) } catch(e){ if(e instanceof BreakSig) break; if(e instanceof ContinueSig) continue; throw e }
          }
          return;
        }
        case 'def': (sc || globals)[s.name] = new Fn(s.name, s.params, s.body, s.line); return;
        case 'return': if(!sc) err(s.line, 'Line ' + s.line + ': return can only be used inside a def function.'); throw new ReturnSig(s.value ? evalE(s.value, sc) : null);
        case 'break': throw new BreakSig();
        case 'continue': throw new ContinueSig();
        case 'pass': return;
      }
    }
    try { execBlock(ast, null) }
    catch(e){
      if(e instanceof BreakSig) err(1, 'break can only be used inside a loop.');
      if(e instanceof ContinueSig) err(1, 'continue can only be used inside a loop.');
      throw e;
    }
    return {steps};
  }

  // Count the lines of code (not blank lines or comments): used for stars.
  const countLines = src => src.split('\n').filter(l => l.trim() && !l.trim().startsWith('#')).length;
  const api = {run, parse, PyError, Stop, countLines, closest, repr};
  if(typeof module !== 'undefined') module.exports = api; else root.PyRun = api;
})(typeof window !== 'undefined' ? window : globalThis);
