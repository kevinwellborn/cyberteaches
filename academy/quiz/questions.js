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
        else out.push(w);
      }
      return out }
    return list();
  }
  const html = p => p.map(n => typeof n === 'string'
    ? `<span class="blk ${NAMES[n][0]}">${NAMES[n][1]}</span>`
    : `<div class="rep"><div class="head">repeat ${n.n} times</div><div class="inner">${html(n.body)}</div></div>`).join('');
  const P = src => `<div class="prog">${html(parse(src))}</div>`;
  const map = (rows, dir) => `<div class="board" data-map="${rows.join('|')}" data-dir="${dir}"></div>`;
  const blk = n => `<span class="blk ${NAMES[n][0]}">${NAMES[n][1]}</span>`;

  window.QUIZ = {P, map, blk};
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
  };
})();
