// Python Quest: the side-view world. PQ.simulate(level, source) runs the student's Python against the level
// and returns a list of events (what the explorer did), which PQ.Player then acts out on a canvas.
// All art is drawn in code, so the game needs no image downloads.
(function(root){
  const PQ = root.PQ = {};

  // ---------- world ----------
  function load(level){
    const rows = level.map, H = rows.length, W = Math.max(...rows.map(r => r.length));
    const w = {W, H, solid: [], items: {}, gates: {}, guards: {}, spikes: {}, door: null, hero: null,
      hearts: level.hearts || 3, maxHearts: 5, keys: 0, gems: 0, gemsTotal: 0};
    for(let y = 0; y < H; y++){
      w.solid.push([]);
      for(let x = 0; x < W; x++){
        const c = rows[y][x] || '.', k = x + ',' + y;
        w.solid[y].push(c === '#');
        if(c === 'S' || c === 's') w.hero = {x, y, dir: c === 'S' ? 1 : -1};
        if(c === 'D') w.door = {x, y};
        if(c === '*'){ w.items[k] = 'gem'; w.gemsTotal++ }
        if(c === 'k') w.items[k] = 'key';
        if(c === 'p') w.items[k] = 'potion';
        if(c === '|') w.gates[k] = true;
        if(c === 'G') w.guards[k] = {hp: level.hp || 2, max: level.hp || 2};
        if(c === '^') w.spikes[k] = true;
      }
    }
    return w;
  }
  const snap = w => ({hero: {...w.hero}, items: {...w.items}, gates: {...w.gates}, guards: JSON.parse(JSON.stringify(w.guards)),
    hearts: w.hearts, keys: w.keys, gems: w.gems});
  PQ.load = load;

  // ---------- simulation ----------
  PQ.simulate = function(level, source, opts = {}){
    const w = load(level), events = [], prints = [];
    const S = (x, y) => y >= w.H ? false : y < 0 || x < 0 || x >= w.W ? true : w.solid[y][x];
    const key = (x, y) => x + ',' + y;
    let actions = 0;
    const ev = (a, line, extra) => { events.push({a, line, ...extra, s: snap(w)}); };
    const end = (result, msg, line) => { throw new PyRun.Stop({result, msg, line}) };
    const act = line => { if(++actions > 300) end('fail', 'The explorer is worn out: more than 300 moves! Is there a loop that never stops?', line) };
    const win = line => { ev('win', line); end('win', 'You made it through the door!', line) };
    const fall = line => {
      const h = w.hero; let n = 0;
      while(!S(h.x, h.y + 1) && h.y < w.H){ h.y++; n++ }
      if(n) ev('fall', line, {n});
      if(h.y >= w.H){ ev('die', line, {why: 'pit'}); end('lose', 'Aaah! The explorer fell into a pit. Stop at the edge and use hero.jump().', line) }
    };
    const arrive = line => {
      const h = w.hero, k = key(h.x, h.y);
      fall(line);
      if(w.spikes[key(h.x, h.y)]){ ev('die', line, {why: 'spikes'}); end('lose', 'Ouch, spikes! Stop before them and use hero.jump().', line) }
      if(w.door && h.x === w.door.x && h.y === w.door.y && w.gems === w.gemsTotal) win(line);
      return k;
    };
    const num = (v, line, def) => {
      if(v === undefined) return def;
      if(typeof v !== 'number' || !Number.isInteger(v)) end('error', 'Line ' + line + ': put a whole number inside ( ), like hero.run(3).', line);
      return v;
    };
    const hero = {
      __methods: true,
      run(line, n){
        n = num(n, line, 1);
        if(n < 0) end('error', 'Line ' + line + ': the explorer can\'t run a negative number of steps. Use hero.turn() to go the other way.', line);
        if(n > 50) end('error', 'Line ' + line + ': that\'s too many steps at once (50 is the most).', line);
        for(let i = 0; i < n; i++){
          act(line);
          const h = w.hero, nx = h.x + h.dir, k = key(nx, h.y);
          if(nx < 0 || nx >= w.W){ ev('bump', line, {what: 'edge'}); end('fail', 'Line ' + line + ': the explorer reached the edge of the map.', line) }
          if(S(nx, h.y)){ ev('bump', line, {what: 'wall'}); end('fail', 'Line ' + line + ': bonk! A stone block is in the way. Try hero.climb().', line) }
          if(w.guards[k]){ ev('bump', line, {what: 'guard'}); end('fail', 'Line ' + line + ': a stone guardian blocks the way. Use hero.attack() to defeat it.', line) }
          if(w.gates[k]){
            if(!w.keys){ ev('bump', line, {what: 'gate'}); end('fail', 'Line ' + line + ': the gate is locked. Take the key first with hero.take().', line) }
            w.keys--; delete w.gates[k]; ev('open', line, {x: nx, y: h.y});
          }
          const from = {x: h.x, y: h.y}; h.x = nx; ev('step', line, {from});
          arrive(line);
        }
        return null;
      },
      jump(line){
        act(line);
        const h = w.hero, mx = h.x + h.dir, nx = h.x + 2 * h.dir;
        if(S(mx, h.y) || w.gates[key(mx, h.y)] || w.guards[key(mx, h.y)]){
          ev('bump', line, {what: 'wall'}); end('fail', 'Line ' + line + ': something tall is in the way, so the explorer can\'t jump over it.', line);
        }
        if(nx < 0 || nx >= w.W){ ev('bump', line, {what: 'edge'}); end('fail', 'Line ' + line + ': can\'t jump off the edge of the map.', line) }
        if(S(nx, h.y) || w.gates[key(nx, h.y)] || w.guards[key(nx, h.y)]){ ev('bump', line, {what: 'wall'}); end('fail', 'Line ' + line + ': there is no room to land there. Get closer first.', line) }
        const from = {x: h.x, y: h.y}; h.x = nx; ev('jump', line, {from});
        arrive(line); return null;
      },
      climb(line){
        act(line);
        const h = w.hero, nx = h.x + h.dir;
        if(!S(nx, h.y)){ ev('shrug', line); end('fail', 'Line ' + line + ': there is no block right in front to climb. Run up to it first.', line) }
        if(S(nx, h.y - 1) || S(h.x, h.y - 1)){ ev('bump', line, {what: 'wall'}); end('fail', 'Line ' + line + ': that wall is too high. The explorer can climb only 1 block at a time.', line) }
        const from = {x: h.x, y: h.y}; h.x = nx; h.y--; ev('climb', line, {from});
        arrive(line); return null;
      },
      turn(line){ act(line); w.hero.dir *= -1; ev('turn', line); return null },
      take(line){
        act(line);
        const h = w.hero, k = key(h.x, h.y), it = w.items[k];
        if(it === 'gem' || it === 'key'){
          delete w.items[k]; if(it === 'gem') w.gems++; else w.keys++;
          ev('take', line, {item: it});
          if(w.door && h.x === w.door.x && h.y === w.door.y && w.gems === w.gemsTotal) win(line);
        } else ev('shrug', line, {say: it === 'potion' ? 'Drink potions with hero.drink()' : 'Nothing to take here'});
        return null;
      },
      drink(line){
        act(line);
        const h = w.hero, k = key(h.x, h.y);
        if(w.items[k] === 'potion'){ delete w.items[k]; w.hearts = Math.min(w.maxHearts, w.hearts + 1); ev('drink', line) }
        else ev('shrug', line, {say: 'No potion here'});
        return null;
      },
      attack(line){
        act(line);
        const h = w.hero, k = key(h.x + h.dir, h.y), g = w.guards[k];
        if(!g){ ev('attack', line, {miss: true}); return null }
        g.hp--;
        if(g.hp <= 0){ delete w.guards[k]; ev('attack', line, {hit: k, ko: true}); return null }
        ev('attack', line, {hit: k});
        w.hearts--; ev('hurt', line);
        if(w.hearts <= 0){ ev('die', line, {why: 'guard'}); end('lose', 'The guardian won this time. Drink a potion first to get more hearts.', line) }
        return null;
      },
      // Sensors for later lessons (if / while)
      ahead(line){
        const h = w.hero, nx = h.x + h.dir, k = key(nx, h.y);
        if(nx < 0 || nx >= w.W) return 'edge';
        if(S(nx, h.y)) return 'wall';
        if(w.guards[k]) return 'guardian';
        if(w.gates[k]) return 'gate';
        if(w.spikes[k]) return 'spikes';
        if(!S(nx, h.y + 1) && (h.y + 1 >= w.H || !S(nx, h.y + 2))) return h.y + 1 >= w.H || !anyBelow(nx, h.y) ? 'pit' : 'drop';
        if(w.door && w.door.x === nx && w.door.y === h.y) return 'door';
        return w.items[k] || 'floor';
      },
      here(line){ const it = w.items[key(w.hero.x, w.hero.y)]; return it || (w.door && w.door.x === w.hero.x && w.door.y === w.hero.y ? 'door' : 'floor') },
      health(line){ return w.hearts },
      has_key(line){ return w.keys > 0 },
      gems_left(line){ return w.gemsTotal - w.gems },
    };
    const anyBelow = (x, y) => { for(let yy = y + 1; yy < w.H; yy++) if(S(x, yy)) return true; return false };
    ev('start', 0);
    let result;
    try {
      PyRun.run(source, {globals: {hero}, maxSteps: 20000, print: (s, line) => { prints.push(s); ev('print', line, {text: s}) }});
      const h = w.hero;
      if(w.door && h.x === w.door.x && h.y === w.door.y && w.gems < w.gemsTotal)
        result = {result: 'fail', msg: 'The door is still shut: take every gem first (' + (w.gemsTotal - w.gems) + ' left).'};
      else result = {result: 'fail', msg: events.length <= 1 ? 'Write some commands, then press Run.' : 'The program ended before the explorer reached the door.'};
    } catch(e){
      if(e instanceof PyRun.Stop) result = e.reason;
      else if(e && e.py) result = {result: 'error', msg: e.message, line: e.line};
      else { console.error(e); result = {result: 'error', msg: 'Something went wrong: ' + e.message} }
    }
    if(result.result === 'error' && events.length > 1) result.partial = true;
    return {events, result, prints, lines: PyRun.countLines(source)};
  };

  PQ.starsFor = (level, lines) => lines <= level.par ? 3 : lines <= level.par + 2 ? 2 : 1;

  // ---------- drawing ----------
  const T = 48;   // tile size in canvas pixels (the canvas is scaled to fit)
  const C = {
    sky1: '#0E2A22', sky2: '#1F4B36', far: '#173A2B', far2: '#22513A',
    stone: '#7C8A78', stoneHi: '#9DAA93', stoneLo: '#566352', mortar: '#4A5547', moss: '#4E9A3A', moss2: '#6DBB4B',
    vine: '#3E8A2E', leaf: '#5FB043', pit: '#08140F', water: '#1E6A73', waterHi: '#4FB3BC',
    gold: '#F2C14A', goldLo: '#B8860B', jade: '#38C98A', jadeHi: '#B6F5D6', jadeLo: '#1D8A5B',
    wood: '#7A4E2A', woodLo: '#55341A', potion: '#E2445C', glass: '#CFE8F0',
    guard: '#8E8B7E', guardLo: '#5E5B50', eye: '#FF9F2E',
    hat: '#7B5530', hatLo: '#5A3C20', skin: '#C98B5B', scarf: '#F07F2D', shirt: '#2B8C8C', pants: '#C9B48A', boot: '#4A3020', blade: '#DDE6EA'
  };
  PQ.colors = C;

  function drawBackground(g, W, H, t){
    const gr = g.createLinearGradient(0, 0, 0, H * T); gr.addColorStop(0, C.sky1); gr.addColorStop(1, C.sky2);
    g.fillStyle = gr; g.fillRect(0, 0, W * T, H * T);
    // light shafts
    g.save(); g.globalAlpha = 0.07; g.fillStyle = '#E8F5C8';
    for(let i = 0; i < 3; i++){ const x = (i * 5 + 2) * T; g.beginPath(); g.moveTo(x, 0); g.lineTo(x + T * 1.2, 0); g.lineTo(x + T * 3, H * T); g.lineTo(x + T * 1.6, H * T); g.fill() }
    g.restore();
    // distant temple pillars and jungle leaves
    g.fillStyle = C.far;
    for(let x = 0; x < W * T; x += T * 3){ g.fillRect(x + T * 0.9, T * 0.4, T * 0.5, H * T) ; g.fillRect(x + T * 0.7, T * 0.4, T * 0.9, T * 0.18) }
    g.fillStyle = C.far2;
    for(let x = -T; x < W * T + T; x += T * 0.9){
      const y = T * 0.15 + Math.sin(x * 0.07) * 6;
      g.beginPath(); g.ellipse(x, y, T * 0.7, T * 0.35, Math.sin(x) * 0.4, 0, Math.PI * 2); g.fill();
    }
    // hanging vines from the top
    g.strokeStyle = C.vine; g.lineWidth = 2;
    for(let x = T * 0.5; x < W * T; x += T * 2.3){
      const len = T * (0.6 + ((x * 13) % 7) / 7), sway = Math.sin(t / 900 + x) * 3;
      g.beginPath(); g.moveTo(x, 0); g.quadraticCurveTo(x + sway, len / 2, x + sway * 1.5, len); g.stroke();
      g.fillStyle = C.leaf; g.beginPath(); g.ellipse(x + sway * 1.5, len, 4, 7, 0.5, 0, Math.PI * 2); g.fill();
    }
  }
  function drawStone(g, w, x, y){
    const px = x * T, py = y * T, top = y === 0 || !w.solid[y - 1][x];
    g.fillStyle = C.stone; g.fillRect(px, py, T, T);
    g.fillStyle = C.stoneLo; g.fillRect(px, py + T - 4, T, 4);
    g.fillStyle = C.stoneHi; g.fillRect(px, py, T, 3);
    g.strokeStyle = C.mortar; g.lineWidth = 2;
    g.beginPath(); g.moveTo(px, py + T / 2); g.lineTo(px + T, py + T / 2);
    const off = (x + y) % 2 ? T / 2 : T / 4;
    g.moveTo(px + off, py); g.lineTo(px + off, py + T / 2); g.moveTo(px + ((off + T / 2) % T), py + T / 2); g.lineTo(px + ((off + T / 2) % T), py + T); g.stroke();
    // carved spiral on some blocks
    if((x * 7 + y * 3) % 5 === 0){ g.strokeStyle = C.stoneLo; g.lineWidth = 1.5; g.beginPath(); g.arc(px + T * 0.7, py + T * 0.72, 5, 0, Math.PI * 1.6); g.stroke() }
    if(top){
      g.fillStyle = C.moss; g.fillRect(px, py, T, 6);
      g.fillStyle = C.moss2; for(let i = 0; i < 4; i++){ g.beginPath(); g.arc(px + 6 + i * 12, py + 4, 4, Math.PI, 0); g.fill() }
      // vines on a climbable side face (block 1 high with open air beside it and above)
      [-1, 1].forEach(d => {
        const nx = x + d;
        if(nx >= 0 && nx < w.W && !w.solid[y][nx] && y + 1 < w.H && w.solid[y + 1][nx]){
          const vx = d < 0 ? px + 3 : px + T - 3;
          g.strokeStyle = C.vine; g.lineWidth = 3; g.beginPath(); g.moveTo(vx, py + 4);
          for(let k = 1; k <= 4; k++) g.lineTo(vx + (k % 2 ? 3 : -3) * -d, py + k * T / 4);
          g.stroke();
          g.fillStyle = C.leaf; for(let k = 1; k < 4; k++){ g.beginPath(); g.ellipse(vx + 5 * -d, py + k * T / 4, 5, 3, 0.6 * d, 0, Math.PI * 2); g.fill() }
        }
      });
    }
  }
  function drawPit(g, w, x, t){
    const px = x * T, py = (w.H - 1) * T;
    g.fillStyle = C.pit; g.fillRect(px, py, T, T);
    g.fillStyle = C.water; g.fillRect(px, py + T * 0.62, T, T * 0.38);
    g.strokeStyle = C.waterHi; g.lineWidth = 2; g.beginPath();
    for(let i = 0; i <= T; i += 4) g.lineTo(px + i, py + T * 0.62 + Math.sin((i + t / 120) * 0.35) * 2);
    g.stroke();
  }
  function drawSpikes(g, x, y){
    const px = x * T, py = y * T + T;
    g.fillStyle = '#B9C2B4'; g.strokeStyle = '#5E665A'; g.lineWidth = 1.5;
    for(let i = 0; i < 4; i++){ g.beginPath(); g.moveTo(px + 3 + i * 11, py); g.lineTo(px + 8.5 + i * 11, py - 20); g.lineTo(px + 14 + i * 11, py); g.closePath(); g.fill(); g.stroke() }
  }
  function drawDoor(g, x, y, open, t){
    const px = x * T, py = y * T;
    g.fillStyle = C.stoneLo; g.fillRect(px - 6, py - T * 0.9, T + 12, T * 1.9);
    g.fillStyle = C.stoneHi; g.fillRect(px - 10, py - T * 1.0, T + 20, 10);
    const gl = g.createLinearGradient(0, py - T * 0.7, 0, py + T);
    gl.addColorStop(0, open ? '#FFE9A0' : '#2A3A30'); gl.addColorStop(1, open ? '#F2A93B' : '#16221B');
    g.fillStyle = gl; g.beginPath(); g.moveTo(px + 4, py + T); g.lineTo(px + 4, py - T * 0.35); g.arc(px + T / 2, py - T * 0.35, T / 2 - 4, Math.PI, 0); g.lineTo(px + T - 4, py + T); g.fill();
    if(open){ g.save(); g.globalAlpha = 0.25 + 0.15 * Math.sin(t / 300); g.fillStyle = '#FFE9A0'; g.beginPath(); g.arc(px + T / 2, py + T * 0.1, T * 0.9, 0, Math.PI * 2); g.fill(); g.restore() }
    else { g.fillStyle = C.jade; g.beginPath(); g.arc(px + T / 2, py + T * 0.15, 6, 0, Math.PI * 2); g.fill(); g.fillStyle = '#0B1A12'; g.fillRect(px + T / 2 - 1.5, py + T * 0.12, 3, 7) }
    // carved sun on the lintel
    g.fillStyle = C.gold; g.beginPath(); g.arc(px + T / 2, py - T * 0.95, 5, 0, Math.PI * 2); g.fill();
  }
  function drawItem(g, kind, x, y, t){
    const cx = x * T + T / 2, by = y * T + T - 6 + Math.sin(t / 250 + x) * 2;
    if(kind === 'gem'){
      g.fillStyle = C.jade; g.strokeStyle = C.jadeLo; g.lineWidth = 2;
      g.beginPath(); g.moveTo(cx, by - 26); g.lineTo(cx + 11, by - 15); g.lineTo(cx, by - 2); g.lineTo(cx - 11, by - 15); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = C.jadeHi; g.beginPath(); g.moveTo(cx - 3, by - 21); g.lineTo(cx + 3, by - 17); g.lineTo(cx - 4, by - 13); g.fill();
      if(Math.sin(t / 200 + x) > 0.7){ g.fillStyle = '#fff'; g.fillRect(cx + 7, by - 27, 2, 6); g.fillRect(cx + 5, by - 25, 6, 2) }
    } else if(kind === 'key'){
      g.strokeStyle = C.gold; g.lineWidth = 4; g.beginPath(); g.arc(cx - 7, by - 14, 6, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.moveTo(cx - 1, by - 14); g.lineTo(cx + 13, by - 14); g.moveTo(cx + 9, by - 14); g.lineTo(cx + 9, by - 8); g.moveTo(cx + 13, by - 14); g.lineTo(cx + 13, by - 9); g.stroke();
    } else if(kind === 'potion'){
      g.fillStyle = C.glass; g.fillRect(cx - 4, by - 30, 8, 8);
      g.fillStyle = C.wood; g.fillRect(cx - 5, by - 33, 10, 4);
      g.fillStyle = C.potion; g.beginPath(); g.arc(cx, by - 12, 11, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(255,255,255,.55)'; g.beginPath(); g.arc(cx - 4, by - 16, 3, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fff'; heart(g, cx, by - 11, 4);
    }
  }
  function heart(g, x, y, r){ g.beginPath(); g.moveTo(x, y + r); g.bezierCurveTo(x - r * 2, y - r * 0.5, x - r * 0.6, y - r * 1.8, x, y - r * 0.6); g.bezierCurveTo(x + r * 0.6, y - r * 1.8, x + r * 2, y - r * 0.5, x, y + r); g.fill() }
  PQ.heart = heart;
  function drawGate(g, x, y){
    const px = x * T, py = y * T;
    g.fillStyle = C.woodLo; g.fillRect(px + 4, py - 6, T - 8, 6);
    g.fillStyle = C.wood; for(let i = 0; i < 4; i++) g.fillRect(px + 7 + i * 10, py, 6, T);
    g.fillStyle = C.woodLo; g.fillRect(px + 4, py + T * 0.3, T - 8, 5); g.fillRect(px + 4, py + T * 0.7, T - 8, 5);
    g.fillStyle = C.gold; g.fillRect(px + T / 2 - 5, py + T * 0.42, 10, 10); g.fillStyle = '#3A2A10'; g.fillRect(px + T / 2 - 1, py + T * 0.45, 2, 5);
  }
  function drawGuard(g, x, y, gd, t, hitFlash){
    const px = x * T + T / 2, by = y * T + T;
    g.save(); if(hitFlash) g.translate(Math.sin(t / 20) * 3, 0);
    g.fillStyle = C.guardLo; g.fillRect(px - 15, by - 10, 12, 10); g.fillRect(px + 3, by - 10, 12, 10);
    g.fillStyle = hitFlash ? '#E9D9B0' : C.guard; g.fillRect(px - 17, by - 42, 34, 34);
    g.fillRect(px - 13, by - 58, 26, 18);
    g.fillStyle = C.moss; g.fillRect(px - 17, by - 42, 34, 4); g.fillRect(px - 13, by - 58, 26, 3);
    g.fillStyle = C.guardLo; g.fillRect(px - 17, by - 28, 34, 3);
    // carved face, glowing eyes facing left
    g.fillStyle = C.eye; g.fillRect(px - 10, by - 52, 6, 4); g.fillRect(px + 1, by - 52, 6, 4);
    g.fillStyle = C.guardLo; g.fillRect(px - 8, by - 45, 14, 2);
    // stone club
    g.fillStyle = C.woodLo; g.fillRect(px - 26, by - 46, 4, 26); g.fillStyle = C.guardLo; g.fillRect(px - 30, by - 54, 12, 12);
    g.restore();
    // strength pips
    for(let i = 0; i < gd.max; i++){ g.fillStyle = i < gd.hp ? C.eye : 'rgba(0,0,0,.35)'; g.fillRect(px - gd.max * 5 + i * 10, by - 70, 8, 5) }
  }

  // The explorer: wide-brim hat, orange scarf, teal shirt, short sword. pose: idle | run | jump | climb | attack | drink | hurt | win | fall
  function drawHero(g, x, y, dir, pose, ph, t){
    const cx = x * T + T / 2, by = y * T + T;
    g.save(); g.translate(cx, by); g.scale(dir, 1);
    const swing = pose === 'run' ? Math.sin(ph * Math.PI * 2) : 0;
    const bob = pose === 'run' ? Math.abs(Math.sin(ph * Math.PI * 2)) * 2 : pose === 'idle' ? Math.sin(t / 400) * 0.8 : 0;
    g.translate(0, -bob);
    if(pose === 'hurt'){ g.globalAlpha = 0.5 + 0.5 * Math.abs(Math.sin(t / 50)) }
    // legs
    g.strokeStyle = C.pants; g.lineWidth = 6; g.lineCap = 'round';
    const legA = pose === 'jump' ? -0.9 : pose === 'climb' ? -0.7 : swing * 0.6, legB = pose === 'jump' ? 0.5 : pose === 'climb' ? 0.3 : -swing * 0.6;
    [[legA, -3], [legB, 3]].forEach(([a, ox]) => {
      g.beginPath(); g.moveTo(ox * 0.6, -18); const fx = ox * 0.6 + Math.sin(a) * 14, fy = -18 + Math.cos(a) * 14; g.lineTo(fx, fy); g.stroke();
      g.fillStyle = C.boot; g.fillRect(fx - 3, fy - 2, 8, 5);
    });
    // body
    g.fillStyle = C.shirt; g.beginPath(); g.moveTo(-8, -19); g.lineTo(8, -19); g.lineTo(7, -36); g.lineTo(-7, -36); g.closePath(); g.fill();
    g.fillStyle = C.boot; g.fillRect(-8, -21, 16, 3);   // belt
    // back arm
    g.strokeStyle = C.skin; g.lineWidth = 4;
    const armBack = pose === 'climb' ? -2.6 : pose === 'jump' ? -2.2 : pose === 'win' ? -2.8 : -swing * 0.7;
    g.beginPath(); g.moveTo(-3, -33); g.lineTo(-3 + Math.sin(armBack) * 12, -33 + Math.cos(armBack) * 12); g.stroke();
    // head + scarf
    g.fillStyle = C.skin; g.beginPath(); g.arc(1, -42, 7, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#1C292C'; g.fillRect(4, -44, 2, 2);
    g.fillStyle = C.scarf; g.fillRect(-7, -37, 14, 4);
    const flap = Math.sin(t / 150) * 2 + (pose === 'run' ? 3 : 0);
    g.beginPath(); g.moveTo(-6, -36); g.lineTo(-15, -33 + flap * 0.3); g.lineTo(-14, -30 + flap * 0.4); g.lineTo(-6, -33); g.fill();
    // hat
    g.fillStyle = C.hat; g.beginPath(); g.ellipse(1, -47, 13, 3.2, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = C.hatLo; g.fillRect(-6, -55, 13, 8); g.fillStyle = C.hat; g.fillRect(-6, -55, 13, 3);
    // front arm + sword
    let armF = pose === 'attack' ? (-2.4 + ph * 3.4) : pose === 'climb' ? -2.9 : pose === 'drink' ? -2.4 : pose === 'win' ? -2.8 : swing * 0.7 + 0.2;
    if(pose === 'jump') armF = 1.6;
    const hx = 4 + Math.sin(armF) * 12, hy = -33 + Math.cos(armF) * 12;
    g.strokeStyle = C.skin; g.beginPath(); g.moveTo(4, -33); g.lineTo(hx, hy); g.stroke();
    if(pose === 'drink'){ g.fillStyle = C.potion; g.beginPath(); g.arc(hx, hy - 2, 4, 0, Math.PI * 2); g.fill() }
    else {
      const sa = pose === 'attack' ? armF + 0.3 : pose === 'climb' ? 0.4 : 0.9;
      g.strokeStyle = C.blade; g.lineWidth = 3; g.beginPath(); g.moveTo(hx, hy); g.lineTo(hx + Math.sin(sa) * 18, hy + Math.cos(sa) * -18 * -1 * -1 + (pose === 'attack' ? 0 : -14)); g.stroke();
      g.fillStyle = C.goldLo; g.fillRect(hx - 3, hy - 2, 6, 3);
    }
    if(pose === 'attack' && ph > 0.3 && ph < 0.8){ g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = 2; g.beginPath(); g.arc(4, -33, 26, -1.2, 0.6); g.stroke() }
    g.restore();
  }
  PQ.drawHero = drawHero;

  // ---------- player: animates the events ----------
  const DUR = {start: 200, step: 260, jump: 520, climb: 520, fall: 160, turn: 180, take: 380, drink: 600, attack: 420, hurt: 420, bump: 380, shrug: 600, open: 300, die: 900, win: 1200, print: 120};
  PQ.Player = class {
    constructor(canvas, hooks = {}){ this.cv = canvas; this.g = canvas.getContext('2d'); this.hooks = hooks; this.speed = 1; this.t0 = performance.now(); this.loop = this.loop.bind(this); requestAnimationFrame(this.loop) }
    setLevel(level){
      this.level = level; this.world = load(level); this.events = null; this.i = 0; this.state = snap(this.world); this.cur = null; this.say = null; this.done = null;
      this.cv.width = this.world.W * T; this.cv.height = this.world.H * T + 34;
      if(this.hooks.onState) this.hooks.onState(this.state, this.world);
    }
    reset(){ this.setLevel(this.level) }
    play(events, onDone){ this.events = events; this.i = 0; this.state = events[0].s; this.cur = null; this.done = onDone; this.say = null; this.next() }
    stop(){ this.events = null; this.cur = null }
    next(){
      if(!this.events) return;
      if(this.i >= this.events.length){ const d = this.done; this.done = null; this.events = null; if(d) d(); return }
      const e = this.events[this.i++], prev = this.state;
      this.cur = {e, prev, start: performance.now(), dur: (DUR[e.a] || 250) / this.speed};
      if(e.a === 'shrug' && e.say) this.say = {text: e.say, until: performance.now() + 1400 / this.speed, x: prev.hero.x, y: prev.hero.y};
      if(this.hooks.onEvent) this.hooks.onEvent(e);
    }
    loop(now){
      requestAnimationFrame(this.loop);
      if(this.cur && now - this.cur.start >= this.cur.dur){ this.state = this.cur.e.s; if(this.hooks.onState) this.hooks.onState(this.state, this.world); this.cur = null; this.next() }
      this.draw(now);
    }
    draw(t){
      const g = this.g, w = this.world; if(!w) return;
      const s = this.cur ? this.cur.prev : this.state;
      g.save(); g.translate(0, 34);
      drawBackground(g, w.W, w.H, t);
      for(let x = 0; x < w.W; x++) if(!w.solid[w.H - 1][x]) drawPit(g, w, x, t);
      for(let y = 0; y < w.H; y++) for(let x = 0; x < w.W; x++) if(w.solid[y][x]) drawStone(g, w, x, y);
      Object.keys(w.spikes).forEach(k => { const [x, y] = k.split(',').map(Number); drawSpikes(g, x, y) });
      if(w.door) drawDoor(g, w.door.x, w.door.y, s.gems === w.gemsTotal, t);
      Object.keys(s.gates).forEach(k => { const [x, y] = k.split(',').map(Number); drawGate(g, x, y) });
      Object.entries(s.items).forEach(([k, it]) => { const [x, y] = k.split(',').map(Number); drawItem(g, it, x, y, t) });
      const hitKey = this.cur && this.cur.e.a === 'attack' && this.cur.e.hit;
      Object.entries(s.guards).forEach(([k, gd]) => { const [x, y] = k.split(',').map(Number); drawGuard(g, x, y, gd, t, hitKey === k && (t - this.cur.start) > this.cur.dur * 0.4) });
      // hero position + pose
      let hx = s.hero.x, hy = s.hero.y, dir = s.hero.dir, pose = 'idle', ph = 0;
      if(this.cur){
        const e = this.cur.e, p = Math.min(1, (t - this.cur.start) / this.cur.dur), to = e.s.hero; ph = p;
        if(e.a === 'step'){ hx = s.hero.x + (to.x - s.hero.x) * p; pose = 'run' }
        else if(e.a === 'jump'){ hx = s.hero.x + (to.x - s.hero.x) * p; hy = s.hero.y - Math.sin(p * Math.PI) * 1.1; pose = 'jump' }
        else if(e.a === 'climb'){ const a = Math.min(1, p * 1.6), b = Math.max(0, p * 2 - 1); hy = s.hero.y - a; hx = s.hero.x + (to.x - s.hero.x) * b; pose = 'climb' }
        else if(e.a === 'fall'){ hy = s.hero.y + (to.y - s.hero.y) * p * p; pose = 'jump' }
        else if(e.a === 'attack') pose = 'attack';
        else if(e.a === 'drink') pose = 'drink';
        else if(e.a === 'hurt') pose = 'hurt';
        else if(e.a === 'win'){ pose = 'win'; hy = s.hero.y - Math.abs(Math.sin(p * Math.PI * 2)) * 0.25 }
        else if(e.a === 'turn'){ dir = p < 0.5 ? s.hero.dir : to.dir }
        else if(e.a === 'bump'){ hx = s.hero.x + Math.sin(p * Math.PI) * 0.18 * s.hero.dir; pose = p < 0.5 ? 'run' : 'hurt' }
        else if(e.a === 'die'){ if(e.why === 'pit'){ pose = 'jump' } else { pose = 'hurt' } }
        else if(e.a === 'take'){ pose = 'idle'; hy = s.hero.y + Math.sin(p * Math.PI) * 0.12 }
      } else if(this.events === null && this.lastPose) pose = this.lastPose;
      if(!(this.cur && this.cur.e.a === 'die' && this.cur.e.why === 'pit')) drawHero(g, hx, hy, dir, pose, ph, t);
      if(this.cur && (this.cur.e.a === 'take' || this.cur.e.a === 'drink')){
        const p = (t - this.cur.start) / this.cur.dur; g.fillStyle = this.cur.e.a === 'drink' ? C.potion : C.gold;
        for(let i = 0; i < 6; i++){ const a = i / 6 * Math.PI * 2 + p * 3; g.globalAlpha = 1 - p; g.beginPath(); g.arc(hx * T + T / 2 + Math.cos(a) * p * 24, hy * T + T / 2 + Math.sin(a) * p * 24 - 6, 3, 0, Math.PI * 2); g.fill() }
        g.globalAlpha = 1;
      }
      if(this.say && t < this.say.until){
        g.font = 'bold 13px system-ui, sans-serif'; const tw = g.measureText(this.say.text).width + 16;
        const bx = Math.max(4, Math.min(w.W * T - tw - 4, this.say.x * T + T / 2 - tw / 2)), byy = this.say.y * T - 72;
        g.fillStyle = 'rgba(255,255,255,.95)'; g.fillRect(bx, byy, tw, 24); g.fillStyle = '#1C292C'; g.fillText(this.say.text, bx + 8, byy + 16);
      }
      g.restore();
      // status bar: hearts, keys, gems
      const st = (this.cur && this.cur.e.a !== 'hurt' && this.cur.e.a !== 'drink') ? s : (this.cur ? this.cur.e.s : s);
      g.fillStyle = '#0B1A14'; g.fillRect(0, 0, w.W * T, 34);
      g.fillStyle = '#EF5B50';
      for(let i = 0; i < Math.max(st.hearts, 0); i++) heart(g, 18 + i * 22, 17, 6);
      g.fillStyle = 'rgba(255,255,255,.18)';
      for(let i = Math.max(st.hearts, 0); i < 3; i++) heart(g, 18 + i * 22, 17, 6);
      g.font = 'bold 15px system-ui, sans-serif'; g.fillStyle = '#E6EEEC'; g.textAlign = 'right';
      let rx = w.W * T - 12;
      if(w.gemsTotal){ g.fillText(st.gems + ' / ' + w.gemsTotal, rx, 23); rx -= g.measureText(st.gems + ' / ' + w.gemsTotal).width + 8; g.fillStyle = C.jade; g.beginPath(); g.moveTo(rx - 7, 8); g.lineTo(rx, 17); g.lineTo(rx - 7, 26); g.lineTo(rx - 14, 17); g.fill(); rx -= 28; g.fillStyle = '#E6EEEC' }
      if(st.keys){ g.fillText('key', rx, 23) }
      g.textAlign = 'left';
    }
  };
})(window);
