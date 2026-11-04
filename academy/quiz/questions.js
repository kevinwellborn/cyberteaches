// Questions for the live quiz battle, one set per lesson.
// Programs are written in classwork letters and drawn as blocks: F forward, L left, R right, C collect, X fire,
// "repeat 3 [ F C ]". Maps use the game legend (# rock, . sand, S rover, * crystal, G flag) with dir 0 up, 1 right, 2 down, 3 left.
(function(){
  const NAMES = {F: ['move', 'move forward'], L: ['move', 'turn left'], R: ['move', 'turn right'], C: ['act', 'collect crystal'], X: ['act', 'fire cannon']};
  // Parses "F C repeat 2 [ F C ]" into nested lists.
  function parse(src){
    const t = src.replace(/\[/g, ' [ ').replace(/\]/g, ' ] ').trim().split(/\s+/); let i = 0;
    function list(){ const out = [];
      while(i < t.length && t[i] !== ']'){
        const w = t[i++];
        if(w === 'repeat'){ const n = t[i++]; i++; const body = list(); i++; out.push({n, body}) }
        else if(w === 'until'){ const c = t[i++]; i++; const body = list(); i++; out.push({until: c, body}) }
        else out.push(w);
      }
      return out }
    return list();
  }
  const html = p => p.map(n => typeof n === 'string'
    ? `<span class="blk ${NAMES[n][0]}">${NAMES[n][1]}</span>`
    : `<div class="rep"><div class="head">${n.until ? 'repeat until ' + (n.until === 'flag' ? 'at flag' : 'no tanks left') : 'repeat ' + n.n + ' times'}</div><div class="inner">${html(n.body)}</div></div>`).join('');
  const P = src => `<div class="prog">${html(parse(src))}</div>`;
  const map = (rows, dir) => `<div class="board" data-map="${rows.join('|')}" data-dir="${dir}"></div>`;
  const blk = n => `<span class="blk ${NAMES[n][0]}">${NAMES[n][1]}</span>`;

  // A map question whose options are programs. The build check (tools/quiz-check.js) runs every option on the map
  // and makes sure only the right one wins.
  const MQ = (q, rows, dir, progs, a, time, extra) => ({ q, time: time || 30, pic: map(rows, dir) + (extra || ''), opts: progs.map(P), a, sim: {rows, dir, progs} });
  window.QUIZ = {P, map, blk, parse, MQ};
  window.QUIZZES = {
    1: { title: 'Repeat and collect', questions: [
      { q: 'Which block picks up a crystal?', time: 20,
        opts: [blk('F'), blk('L'), blk('C'), blk('R')], a: 2 },
      { q: 'What is a program?', time: 20,
        opts: ['A list of steps for a computer', 'A picture of a robot', 'A kind of crystal', 'A game score'], a: 0 },
      { q: 'How many "move forward" blocks does the rover need to reach the crystal?', time: 20,
        pic: map(['######', '#S..*#', '######'], 1), opts: ['2', '3', '4', '5'], a: 1 },
      { q: 'Which program collects the crystal?', time: 30,
        pic: map(['#####', '#S.*#', '#####'], 1), opts: [P('F C'), P('F F C'), P('F F'), P('C F F')], a: 1 },
      { q: 'What does a repeat block do?', time: 20,
        opts: ['Runs the blocks inside it again and again', 'Stops the rover', 'Turns the rover around', 'Deletes the program'], a: 0 },
      { q: 'Which program does the same thing as this one?', time: 30,
        pic: P('F C F C F C'), opts: [P('repeat 2 [ F C ]'), P('repeat 3 [ F C ]'), P('repeat 3 [ F ] C'), P('repeat 6 [ F C ]')], a: 1 },
      { q: 'How many blocks is this program? (The repeat block counts as 1.)', time: 20,
        pic: P('repeat 4 [ F C ]'), opts: ['2', '3', '4', '8'], a: 1 },
      { q: 'The rover faces right. It turns left. Which way does it face now?', time: 20,
        pic: map(['###', '#S#', '###'], 1), opts: ['Up ↑', 'Down ↓', 'Left ←', 'Right →'], a: 0 },
      { q: 'Which program collects all 4 crystals?', time: 30,
        pic: map(['#######', '#S****#', '#######'], 1), opts: [P('repeat 4 [ F ] C'), P('repeat 3 [ F C ]'), P('repeat 4 [ F C ]'), P('F repeat 4 [ C ]')], a: 2 },
      { q: 'This program has a pattern. What number goes in the repeat?', time: 30,
        pic: P('F F C F F C F F C') + '<p class="arrow">repeat ? times [ F F C ]</p>', opts: ['2', '3', '6', '9'], a: 1 },
    ] },
    2: { title: 'Repeat practice', questions: [
      { q: 'How many times does the rover move forward?', time: 20,
        pic: P('repeat 4 [ F ]'), opts: ['1', '3', '4', '5'], a: 2 },
      { q: 'Which program drives to the crystal and collects it?', time: 30,
        pic: map(['########', '#S....*#', '########'], 1), opts: [P('repeat 5 [ F ] C'), P('repeat 4 [ F ] C'), P('repeat 5 [ F C ]'), P('repeat 6 [ F ] C')], a: 0 },
      { q: 'The rover faces right and runs this program. Which way does it face now?', time: 20,
        pic: P('repeat 2 [ R ]'), opts: ['Up ↑', 'Down ↓', 'Left ←', 'Right →'], a: 2 },
      { q: 'What number goes in the repeat to collect every crystal?', time: 20,
        pic: map(['########', '#S*****#', '########'], 1) + '<p class="arrow">repeat ? times [ F C ]</p>', opts: ['3', '4', '5', '6'], a: 2 },
      { q: 'Which is the shortest program for F F F F F F?', time: 30,
        opts: [P('repeat 6 [ F ]'), P('repeat 3 [ F F ]'), P('repeat 2 [ F F F ]'), P('F F F F F F')], a: 0 },
      { q: 'How many blocks is this program? (The repeat block counts as 1.)', time: 20,
        pic: P('repeat 3 [ F F C ]'), opts: ['3', '4', '6', '9'], a: 1 },
      { q: 'The rover faces down. Which program collects all 3 crystals?', time: 30,
        pic: map(['###', '#S#', '#*#', '#*#', '#*#', '###'], 2), opts: [P('repeat 3 [ F C ]'), P('repeat 3 [ C F ]'), P('repeat 4 [ F C ]'), P('repeat 3 [ F ] C')], a: 0 },
      { q: 'Which sentence about the repeat block is true?', time: 20,
        opts: ['The blocks inside it run again each time', 'It can only hold one block', 'It makes the rover go faster', 'It runs forever'], a: 0 },
      { q: 'This program runs on the map. What goes wrong?', time: 30,
        pic: map(['#######', '#S...*#', '#######'], 1) + P('repeat 3 [ F ] C'), opts: ['It stops one square too early', 'It crashes into a rock', 'Nothing, it works', 'It turns the wrong way'], a: 0 },
      { q: 'The rover runs this program. Where does it end up?', time: 30,
        pic: map(['####', '#S.#', '#..#', '####'], 1) + P('repeat 4 [ F R ]'), opts: ['Back where it started', 'One square to the right', 'In the bottom corner', 'It crashes into a rock'], a: 0 },
    ] },
    3: { title: 'Repeat patterns', questions: [
      { q: 'Find the pattern. Which part repeats?', time: 20,
        pic: P('F C R F C R F C R'), opts: [P('F C R'), P('F C'), P('R F'), P('C R')], a: 0 },
      { q: 'How many times does F F C appear in this program?', time: 20,
        pic: '<p class="arrow">F F C F F C F F C F F C</p>', opts: ['2', '3', '4', '6'], a: 2 },
      { q: 'A repeat inside another repeat is called a…', time: 20,
        opts: ['nested loop', 'double block', 'broken loop', 'sequence'], a: 0 },
      { q: 'How many times does "move forward" run?', time: 20,
        pic: P('repeat 3 [ repeat 2 [ F ] ]'), opts: ['2', '3', '5', '6'], a: 3 },
      { q: 'How many blocks is this program? (Each repeat counts as 1.)', time: 30,
        pic: P('repeat 2 [ repeat 3 [ F C ] R ]'), opts: ['4', '5', '8', '14'], a: 1 },
      MQ('Which program collects all 4 crystals on the stairs?', ['#####', '#S*##', '##**#', '###*#', '#####'], 1,
        ['repeat 2 [ F C R F C L ]', 'repeat 4 [ F C R ]', 'repeat 2 [ F C L F C R ]', 'repeat 4 [ F C ]'], 0),
      { q: 'Which program does the same thing as this one?', time: 30,
        pic: P('F C F C R F C F C R'), opts: [P('repeat 2 [ repeat 2 [ F C ] R ]'), P('repeat 2 [ F C R ]'), P('repeat 4 [ F C ] R'), P('repeat 2 [ repeat 2 [ F C R ] ]')], a: 0 },
      { q: 'The rover drives around the square and comes back to the start. Which program does that?', time: 30,
        pic: map(['#####', '#S..#', '#...#', '#...#', '#####'], 1), opts: [P('repeat 4 [ repeat 2 [ F ] R ]'), P('repeat 4 [ F F ]'), P('repeat 2 [ F F R ]'), P('repeat 4 [ R ]')], a: 0 },
      { q: 'Why put a repeat inside a repeat?', time: 20,
        opts: ['To repeat a pattern that already has a repeat in it', 'To make the rover faster', 'Because a repeat can only run once', 'To stop the program'], a: 0 },
      { q: 'The rover faces right. After this program, which way does it face?', time: 20,
        pic: P('repeat 4 [ R ]'), opts: ['Up ↑', 'Down ↓', 'Left ←', 'Right →'], a: 3 },
    ] },
    4: { title: 'Repeat until', questions: [
      { q: 'When does "repeat until at flag" stop?', time: 20,
        opts: ['When the rover reaches the flag', 'After 10 times', 'When it collects a crystal', 'Never'], a: 0 },
      MQ('Which program reaches the flag?', ['########', '#S....G#', '########'], 1,
        ['until flag [ F ]', 'repeat 4 [ F ]', 'until flag [ R ]', 'F F F'], 0),
      { q: 'Why is "repeat until at flag" useful?', time: 20,
        opts: ["You don't have to count the steps", 'It uses more blocks', 'It only works once', 'It turns the rover'], a: 0 },
      { q: 'Which program works for ANY distance to the flag on a straight road?', time: 20,
        opts: [P('until flag [ F ]'), P('repeat 12 [ F ]'), P('F F F F'), P('repeat 3 [ F F ]')], a: 0 },
      MQ('Which program reaches the flag?', ['######', '#S..##', '###.##', '###G##', '######'], 1,
        ['repeat 2 [ F ] R until flag [ F ]', 'until flag [ F ]', 'R until flag [ F ]', 'repeat 2 [ F ] L until flag [ F ]'], 0),
      { q: 'The rover is not at the flag. What happens with this program?', time: 30,
        pic: P('until flag [ R ]'), opts: ['It turns in place forever', 'It reaches the flag', 'It crashes into a rock', 'It collects a crystal'], a: 0 },
      { q: 'A loop that never stops is called…', time: 20,
        opts: ['an infinite loop', 'a nested loop', 'a short loop', 'a flag loop'], a: 0 },
      { q: 'How many blocks is this program?', time: 20,
        pic: P('until flag [ F ]'), opts: ['1', '2', '3', 'It depends on the map'], a: 1 },
      { q: 'The rover faces LEFT. What goes wrong with this program?', time: 30,
        pic: map(['#######', '#S...G#', '#######'], 3) + P('until flag [ F ]'), opts: ['It drives the wrong way and crashes', 'It reaches the flag', 'It spins forever', 'It stops one square early'], a: 0,
        sim: {rows: ['#######', '#S...G#', '#######'], dir: 3, progs: ['until flag [ F ]'], fail: 'crashes'} },
      MQ('Which program climbs the stairs to the flag?', ['######', '#S.###', '##..##', '###G##', '######'], 1,
        ['until flag [ F R F L ]', 'until flag [ F L F R ]', 'until flag [ F F R ]', 'until flag [ R F ]'], 0),
    ] },
    5: { title: 'Repeat until practice', questions: [
      { q: 'Before each loop, what does "repeat until at flag" check?', time: 20,
        opts: ['Am I at the flag?', 'How many crystals are left?', 'Is there a rock?', 'Which way am I facing?'], a: 0 },
      MQ('The rover faces down. Which program reaches the flag?', ['###', '#S#', '#.#', '#.#', '#G#', '###'], 2,
        ['until flag [ F ]', 'until flag [ R ]', 'repeat 2 [ F ]', 'until flag [ L F ]'], 0),
      { q: "You don't know how far the flag is. Which block should you use?", time: 20,
        opts: ['repeat until at flag', 'repeat 5 times', 'move forward', 'turn left'], a: 0 },
      { q: 'How many times does the loop run before the rover stops?', time: 20,
        pic: map(['#######', '#S...G#', '#######'], 1) + P('until flag [ F ]'), opts: ['3', '4', '5', '6'], a: 1 },
      MQ('The rover faces up. Which program reaches the flag?', ['#####', '#..G#', '#.###', '#S###', '#####'], 0,
        ['repeat 2 [ F ] R until flag [ F ]', 'until flag [ F ]', 'repeat 2 [ F ] L until flag [ F ]', 'R until flag [ F ]'], 0),
      { q: 'The rover is already on the flag. What does this program do?', time: 20,
        pic: P('until flag [ F ]'), opts: ['Nothing, it stops right away', 'It moves once', 'It crashes', 'It spins forever'], a: 0 },
      { q: 'The rover is not on the flag. Which program is an infinite loop?', time: 30,
        opts: [P('until flag [ L ]'), P('until flag [ F ]'), P('repeat 3 [ F ]'), P('F F')], a: 0 },
      { q: '"Repeat until at flag" uses a yes or no question to decide when to stop. This is called a…', time: 20,
        opts: ['condition', 'crystal', 'pattern', 'sequence'], a: 0 },
      { q: 'What happens when the rover runs this program?', time: 30,
        pic: map(['#######', '#S.#.G#', '#######'], 1) + P('until flag [ F ]'), opts: ['It crashes into the rock', 'It jumps over the rock', 'It reaches the flag', 'It spins forever'], a: 0,
        sim: {rows: ['#######', '#S.#.G#', '#######'], dir: 1, progs: ['until flag [ F ]'], fail: 'crashes'} },
      MQ('Which program reaches the flag?', ['#######', '#S....#', '#####G#', '#######'], 1,
        ['repeat 4 [ F ] R F', 'until flag [ F ]', 'repeat 5 [ F ] R F', 'repeat 4 [ F ] L F'], 0),
    ] },
  };
  // Move the right answer around so it is not always the same colour. Options that are all numbers keep their order.
  const hash = str => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  Object.values(window.QUIZZES).forEach(set => set.questions.forEach(Q => {
    if(Q.sim && Q.sim.a == null && !Q.sim.fail) Q.sim.a = Q.a;
    if(Q.opts.every(o => /^\d+$/.test(o)) || Q.opts.length < 3) return;
    const r = hash(Q.q) % Q.opts.length; if(!r) return;
    Q.opts = Q.opts.slice(r).concat(Q.opts.slice(0, r)); Q.a = (Q.a - r + Q.opts.length) % Q.opts.length;
  }));
})();
