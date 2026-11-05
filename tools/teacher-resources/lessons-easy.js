// Easy level overrides for the teacher resources (see build.js). Each entry replaces parts of the same lesson in
// lessons.js: the puzzle-based pieces (trace, write, together, exit, some Part C rows) and the plan text that names
// puzzles. Everything else (vocabulary, standards, warm-ups, concepts, ELL practice) is shared with the Hard level.
// Puzzle numbers (k) refer to the Easy puzzles in academy/course.js.
const B = t => ({ type: t });
const F = B('forward'), L = B('left'), R = B('right'), C = B('collect'), X = B('fire');
const Rp = (n, body) => ({ type: 'repeat', n, body }), U = body => ({ type: 'until', body }), UC = body => ({ type: 'untilclear', body });
const IT = body => ({ type: 'iftank', body }), IE = (cond, body, elseBody = []) => ({ type: 'ifelse', cond, body, elseBody });
const code = s => `<span class="code">${s}</span>`;

module.exports = {
1: {
  exit: { a: `${code('repeat 3 [ F C ]')} · 3 blocks` },
  trace: [
    { map: ['######', '#S**.#', '######'], dir: 1, prog: [F, C, F, F], q: 'How many crystals does the rover collect? Which crystal is left? Why?', answer: '1 crystal. The second crystal is left.', why: 'The rover drives onto the second crystal with F but never collects it.', expect: { left: 1, collected: 1 } },
    { map: ['#####', '#S.*#', '#####'], dir: 1, prog: [Rp(2, [F]), C], q: 'Does the rover collect the crystal? Where does it stop?', lines: 1, answer: 'Yes.', why: 'Repeat 2 [F] moves 2 squares onto the crystal, then C collects it. It stops on the crystal square.', expect: { won: true } },
  ],
  write: [
    { map: ['#####', '#S.*#', '#####'], dir: 1, sol: [F, F, C], q: 'Write the program.', alt: `(or ${code('repeat 2 [ F ] C')})` },
    { map: ['####', '#S##', '#*##', '#*##', '####'], dir: 2, sol: [Rp(2, [F, C])], q: 'The rover faces <b>down</b>. Collect both crystals with 3 blocks.' },
  ],
  partC: { rows: [
    { a: code('F C F C F C'), c: '6 → ____', key: `${code('repeat 3 [ F C ]')} · 6 → 3` },
    { a: code('F C F C F C F C F C'), c: '10 → ____', key: `${code('repeat 5 [ F C ]')} · 10 → 3` },
    { a: code('F F C F F C'), c: '6 → ____', key: `${code('repeat 2 [ F F C ]')} · 6 → 4` },
    { a: code('R F C F C F C'), c: '7 → ____', key: `${code('R repeat 3 [ F C ]')} · 7 → 4` },
  ] },
  plan: {
    direct: 'Define program and sequence. Introduce the map and blocks; stress that left and right are from the rover\'s point of view. Solve puzzle 1.1 together (F C). Show the 4-block program for puzzle 1.2, find the pattern, and replace it with <span class="code">repeat 2 [ F C ]</span> (3 blocks).',
    guided: 'Pairs find the pattern in puzzle 1.4 before the reveal: <span class="code">repeat 2 [ F F C ]</span>. Review the debugging tips.',
    closure: 'Students rewrite <span class="code">F C F C F C</span> with a repeat and count the blocks (answer: <span class="code">repeat 3 [ F C ]</span>, 3 blocks).',
    extension: 'aim for 3 stars on every puzzle; try puzzles 1.9 and 1.10 (a turn inside the pattern); swap Part D designs with a partner.',
  },
},
2: {
  together: [{ k: 1, ask: 'Count the crystals. What goes in the repeat?', note: 'Puzzle 2.1: four crystals, one repeat.' }, { k: 5, ask: 'There is a space before each crystal. What is the pattern now?', note: 'Puzzle 2.5: the pattern is F F C. Give pairs a minute first.' }],
  trace: [
    { map: ['#######', '#S****#', '#######'], dir: 1, prog: [Rp(2, [F, C])], q: 'How many crystals are left after the program runs?', lines: 1, answer: '2 crystals are left.', why: 'The repeat runs 2 times, so it collects only 2 of the 4 crystals.', expect: { left: 2 } },
    { map: ['###', '#S#', '#*#', '#*#', '###'], dir: 2, prog: [Rp(2, [F, C])], q: 'Does it collect every crystal? Where does it stop?', lines: 1, answer: 'Yes, both.', why: 'The rover faces down, so F C two times collects the whole column. It stops on the bottom crystal.', expect: { won: true } },
  ],
  write: [{ k: 2, q: 'The rover faces <b>up</b>. Write the shortest program.' }, { k: 7, q: 'The rover faces <b>down</b>. Turn first, then collect.' }],
  partC: { rows: [
    { a: code('F C F C'), c: '4 → ____', key: `${code('repeat 2 [ F C ]')} · 4 → 3` },
    { a: code('F C F C F C F C F C F C'), c: '12 → ____', key: `${code('repeat 6 [ F C ]')} · 12 → 3` },
    { a: code('F F C F F C F F C'), c: '9 → ____', key: `${code('repeat 3 [ F F C ]')} · 9 → 4` },
    { a: code('L F C F C F C'), c: '7 → ____', key: `${code('L repeat 3 [ F C ]')} · 7 → 4` },
  ] },
  exit: { q: 'There are 4 crystals in a row, right next to the rover. Write the shortest program.', a: `${code('repeat 4 [ F C ]')} · 3 blocks` },
  plan: {
    direct: 'Review the repeat block. Model counting crystals with your finger before setting the repeat number (4 crystals = <span class="code">repeat 4 [ F C ]</span>). Show a turn that happens once, before the repeat (puzzle 2.7).',
    guided: 'Solve puzzle 2.1 together, then pairs find the F F C pattern in puzzle 2.5 before the reveal. Review the debugging tips.',
    closure: 'Exit ticket: four crystals in a row. Answer: <span class="code">repeat 4 [ F C ]</span>, 3 blocks.',
  },
},
3: {
  together: [{ k: 1, ask: 'Crystal, gap, crystal, gap. What is one copy of the pattern?', note: 'Puzzle 3.1: the pattern is F C F.' }, { k: 8, ask: 'Two crystals, turn. Two crystals, turn. How can a repeat go inside a repeat?', note: 'Puzzle 3.8: outer repeat 4, inner repeat 2.' }],
  trace: [
    { map: ['#######', '#S*.*.#', '#######'], dir: 1, prog: [Rp(2, [F, C, F])], q: 'Does it collect both crystals? Where does it stop?', lines: 1, answer: 'Yes, both.', why: 'Each copy of F C F collects one crystal and moves past the gap. It stops on the last empty square.', expect: { won: true } },
    { map: ['#####', '#S.##', '##*.#', '###*#', '#####'], dir: 1, prog: [Rp(2, [F, R, F, C, L])], q: 'Follow the stairs. Does it collect both crystals?', lines: 1, answer: 'Yes, both.', why: 'Each repeat goes down one step of the stairs and collects one crystal.', expect: { won: true } },
  ],
  write: [{ k: 9, q: 'Climb the stairs and collect every crystal.' }, { k: 8, q: 'Collect the crystals around the rock. Challenge: use a repeat inside a repeat.' }],
  partC: { rows: [
    { a: code('F C F F C F F C F'), c: '9 → ____', key: `${code('repeat 3 [ F C F ]')} · 9 → 4` },
    { a: code('F R F C L F R F C L'), c: '10 → ____', key: `${code('repeat 2 [ F R F C L ]')} · 10 → 6` },
    { a: code('F C F C R F C F C R'), c: '10 → ____', key: `${code('repeat 2 [ F C F C R ]')} · 10 → 6` },
    { a: code('F F L F F L F F L') + '<br><small>Challenge: use a repeat inside a repeat.</small>', c: '9 → ____', key: `${code('repeat 3 [ repeat 2 [ F ] L ]')} · 9 → 4` },
  ] },
  exit: { q: `What does this program do? How many blocks is it?`, show: code('repeat 4 [ repeat 2 [ F C ] R ]'), a: 'The rover drives around a square, 2 crystals on each side · 5 blocks' },
  plan: {
    direct: 'Show a pattern with a turn in it using puzzle 3.2 (tiny stairs): trace one step with your finger, then repeat it. Introduce a repeat inside a repeat with puzzle 3.8 (small square): the inner repeat does one side, the outer repeat does all four sides.',
    guided: 'Solve puzzle 3.1 together (pattern F C F), then pairs work on puzzle 3.8 before the reveal. Review the debugging tips.',
    extension: 'solve puzzles 3.8 and 3.10 with a repeat inside a repeat and explain the two numbers to a partner.',
  },
},
4: {
  together: [{ k: 2, ask: 'Collect every crystal on the way to the flag.', note: 'Puzzle 4.2: repeat until at flag [F C].' }, { k: 7, ask: 'Stairs all the way down. What is one step?', note: 'Puzzle 4.7: one step is F R F L.' }],
  trace: [
    { map: ['#S..G#'], dir: 1, prog: [U([F])], q: 'How many times does the loop run before the rover stops?', lines: 1, answer: '3 times.', why: 'The flag is 3 squares away, and the loop stops the moment the rover is on the flag.', expect: { atFlag: true } },
    { map: ['#####', '#S.##', '##.G#', '#####'], dir: 1, prog: [U([F, R, F, L])], q: 'Follow the path down the step. Does it reach the flag?', lines: 1, answer: 'Yes.', why: 'F, turn right, F puts the rover on the flag, so the loop stops.', expect: { atFlag: true } },
  ],
  write: [{ k: 5, q: 'Collect every crystal on the way to the flag.' }, { k: 8, q: 'Collect the crystals first, then drive to the flag.' }],
  exit: { q: 'Why is repeat until at flag better than repeat 3 times when you don\'t know how far the flag is?', a: 'It stops by itself at the flag, so it works for any distance. You don\'t need to count.' },
  plan: {
    direct: 'Introduce repeat until at flag with puzzle 4.1. Show an infinite loop (only turning) and ask what is missing. Show "count first, then until" with puzzle 4.6.',
    guided: 'Solve puzzle 4.2 together, then pairs find one step of the stairs in puzzle 4.7 before the reveal.',
    extension: 'try puzzle 4.9 (up the stairs) and 4.10 (crystal stairs) and explain the pattern to a partner.',
  },
},
5: {
  together: [{ k: 4, ask: 'The rover faces left, but the flag is to the right. What first?', note: 'Puzzle 5.4: turn right twice, then repeat until at flag [F].' }, { k: 8, ask: 'One step down to the flag. What goes inside the loop?', note: 'Puzzle 5.8: F R F L inside the loop.' }],
  trace: [
    { map: ['#S..G#'], dir: 3, prog: [U([F])], q: 'The rover faces <b>left</b>. What happens?', lines: 1, answer: 'It crashes into the wall.', why: 'The rover faces away from the flag, so the first F hits the rock.', expectFail: true, expect: { fail: 'crashes' } },
    { map: ['#S**G#'], dir: 1, prog: [U([F, C])], q: 'How many crystals does it collect? Does it reach the flag?', lines: 1, answer: '2 crystals, and yes.', why: 'Each loop moves and collects. When F lands on the flag the loop stops.', expect: { won: true } },
  ],
  write: [{ k: 7, q: 'Drive down, turn, then keep going to the flag.' }, { k: 10, q: 'Collect the 2 crystals, then drive to the flag.' }],
  exit: { q: 'The rover faces up. The flag is 6 squares to its right. Write the program.', a: `${code('R until flag [ F ]')} · 3 blocks` },
  plan: {
    direct: 'Review repeat until at flag. Show that the direction matters (puzzle 5.3, facing left) and that you can turn first (puzzle 5.4). Show count, then until (puzzle 5.7).',
    guided: 'Solve puzzle 5.4 (turn around) together, then pairs find one step of the stairs in puzzle 5.8 before the reveal.',
  },
},
6: {
  together: [{ k: 1, ask: 'Two crystals, a gap, two crystals, a gap… What goes inside the loop?', note: 'Puzzle 6.1: F C F C F.' }, { k: 6, ask: 'Drive around the rock, 2 crystals on each side, and stop at the flag.', note: 'Puzzle 6.6: repeat until at flag [ repeat 2 [F C] R ].' }],
  trace: [
    { map: ['#S**.**G#'], dir: 1, prog: [U([F, C, F, C, F])], q: 'How many crystals does it collect? Does it reach the flag?', lines: 1, answer: 'All 4, and yes.', why: 'Each loop collects a pair and skips the gap. The second loop ends on the flag.', expect: { won: true } },
    { map: ['#####', '#S..#', '#.#.#', '#G..#', '#####'], dir: 1, prog: [U([Rp(2, [F]), R])], q: 'Follow the path. How many times does the rover turn right?', lines: 1, answer: '2 times.', why: 'It drives 2, turns, drives 2, turns, and reaches the flag on the third side.', expect: { atFlag: true } },
  ],
  write: [{ k: 3, q: 'Each step of the stairs is two squares wide. Drive to the flag.' }, { k: 2, q: 'Collect the crystals along the top, then down the side to the flag.' }],
  partC: { rows: [
    { a: code('F C F F C F F C F'), key: `${code('until flag [ F C F ]')}` },
    { a: code('F F R F L F F R F L'), key: `${code('until flag [ F F R F L ]')}` },
    { a: code('F F R F F R F F R'), key: `${code('until flag [ repeat 2 [ F ] R ]')}` },
    { a: code('F C F C R F F F'), key: `${code('repeat 2 [ F C ] R until flag [ F ]')}` },
  ] },
  exit: { q: 'What does this program do?', show: code('until flag [ repeat 2 [ F ] R ]'), a: 'It drives 2 squares and turns right, again and again, until it reaches the flag (a square path).' },
  plan: {
    direct: 'Show a pattern inside repeat until at flag with puzzle 6.1, and "count first, then until" with puzzle 6.2. Show a repeat inside the until loop with puzzle 6.4.',
    guided: 'Solve puzzle 6.1 together, then pairs solve puzzle 6.6 before the reveal.',
  },
},
7: {
  together: [{ k: 6, ask: 'Drive to the corner, face the tank, and fire.', note: 'Puzzle 7.6: repeat 2 [F], turn right, fire.' }, { k: 10, ask: 'Tanks are hidden above some squares. Patrol until no tanks are left.', note: 'Puzzle 7.10: until no tanks [ F L if tank [X] R ].' }],
  trace: [
    { map: ['#S.>.>#'], dir: 1, prog: [X], q: 'How many tanks are destroyed? Why not both?', answer: '1 tank.', why: 'A shell stops at the first tank it hits. The second tank needs a second shell.', expect: { destroyed: 1, tanksLeft: 1 } },
    { map: ['######', '#.^.^#', '#S...#', '######'], dir: 1, prog: [Rp(3, [F, L, IT([X]), R])], q: 'At which squares does the rover fire? How many shells does it use?', answer: 'At the 1st and 3rd squares, 2 shells.', why: '"If tank ahead" only fires when a tank is above the rover, so no shell is wasted on the middle square.', expect: { won: true } },
  ],
  write: [{ k: 5, q: 'Destroy all 3 tanks with 2 blocks.' }, { k: 7, q: 'Stop under each tank, look up, fire, and move on.' }],
  plan: {
    direct: 'Show drive mode (puzzle 7.1), then fire cannon (puzzle 7.2) and firing more than once (puzzle 7.3). Introduce if tank ahead (puzzle 7.8) and repeat until no tanks left (puzzle 7.9).',
    guided: 'Solve puzzle 7.6 together, then pairs solve puzzle 7.10 before the reveal.',
  },
},
8: {
  together: [{ k: 7, ask: 'Drive to the corner, then face the tank.', note: 'Puzzle 8.7: repeat 2 [F], turn right, fire.' }, { k: 10, ask: 'Stop under each tank and fire up. What is the pattern?', note: 'Puzzle 8.10: repeat 2 [ F L X R F ].' }],
  trace: [
    { map: ['#####', '##^##', '#.S.#', '#####'], dir: 1, prog: [R, X], q: 'Does the rover hit the tank? Which way does it face after R?', lines: 1, answer: 'No. It faces down.', why: 'The tank is above the rover. Turning right from facing right means facing down, so the shell flies away from the tank.', expect: { destroyed: 0 } },
    { map: ['#<.S.>#'], dir: 1, prog: [X, R, R, X], q: 'How many tanks are destroyed? Which way does the rover face at the end?', lines: 1, answer: 'Both. It faces left.', why: 'The first shell hits the tank on the right, two right turns face the rover left, and the second shell hits the other tank.', expect: { won: true } },
  ],
  write: [{ k: 4, q: 'The rover faces <b>right</b>. The tank is above. Destroy it.' }, { k: 7, q: 'Drive to the corner and destroy the tank down the hall.' }],
  plan: {
    direct: 'Model aiming: turn until the rover faces the tank, then fire. Show a turn-around (puzzle 8.3) and a drive-then-fire pattern (puzzle 8.7).',
    guided: 'Solve puzzle 8.7 together, then pairs solve puzzle 8.10 before the reveal.',
  },
},
9: {
  together: [{ k: 2, ask: 'The tanks are below the road this time. Which way does the rover look?', note: 'Puzzle 9.2: turn right to look down, then left to face the road again.' }, { k: 5, ask: 'Two tanks block the road to the flag. Clear them, then drive.', note: 'Puzzle 9.5: until no tanks [X], then until flag [F].' }],
  trace: [
    { map: ['#S.>.>#'], dir: 1, prog: [UC([X])], q: 'How many times does the loop run?', lines: 1, answer: '2 times.', why: 'Each shell destroys one tank. After the second shell no tanks are left, so the loop stops.', expect: { won: true } },
    { map: ['#####', '#.^^#', '#S..#', '#####'], dir: 1, prog: [Rp(2, [F, L, X, R])], q: 'Does this patrol destroy both tanks? How many shells does it use?', lines: 1, answer: 'Yes, 2 shells.', why: 'There is a tank above both squares, so firing at each stop is fine here.', expect: { won: true } },
  ],
  write: [{ k: 3, q: 'Patrol the road, checking below, until no tanks are left.' }, { k: 10, q: 'Patrol until the tanks are gone, then drive to the flag.' }],
  plan: {
    direct: 'Model a patrol with puzzle 9.2 and a spin with puzzle 9.4. Show clearing the road then driving on (puzzle 9.5).',
    guided: 'Solve puzzle 9.2 (tanks below) together, then pairs solve puzzle 9.5 before the reveal.',
  },
},
10: {
  together: [{ k: 3, ask: 'A tank above every square. 3 shells. Limit: 9 blocks.', note: 'Puzzle 10.3: repeat 3 [ F L X R ].' }, { k: 9, ask: 'Only some squares have a tank. One shell per tank. What do you need?', note: 'Puzzle 10.9: if tank ahead inside the patrol, so no shells are wasted.' }],
  trace: [
    { map: ['#S>>>#'], dir: 1, prog: [Rp(3, [X])], q: 'How many shells does this use? Does it fit a limit of 6 blocks?', lines: 1, answer: '3 shells, and yes (2 blocks).', why: 'Each shell destroys the next tank in line. A repeat with one block inside counts as 2 blocks.', expect: { won: true } },
    { map: ['######', '#.^^^#', '#S...#', '######'], dir: 1, prog: [F, L, X, R, F, L, X, R, F, L, X, R], q: 'Does this program work? Does it fit a limit of 9 blocks?', lines: 1, answer: 'It works but it does not fit (12 blocks).', why: 'The same 4 blocks happen 3 times. With a repeat it is 5 blocks.', expect: { won: true } },
  ],
  write: [{ k: 4, q: 'Tanks below every other square. Limit: 10 blocks.', goal: true }, { k: 10, q: 'Clear the top road, turn, clear the side road. Limit: 11 blocks.', goal: true }],
  partC: { rows: [
    { a: code('X X X X') + ' · limit 4', c: '____', key: `Fits (4). Shorter: ${code('repeat 4 [ X ]')} · 2` },
    { a: code('F L X R F L X R') + ' · limit 6', c: '____', key: `No (8). ${code('repeat 2 [ F L X R ]')} · 5` },
    { a: code('repeat 2 [ X R ]') + ' · limit 6', c: '____', key: 'Fits (3 blocks).' },
    { a: code('X X R X X') + ' · limit 5', c: '____', key: `Fits (5). Shorter: ${code('repeat 2 [ X ] R repeat 2 [ X ]')} · 5, or ${code('repeat 2 [ repeat 2 [ X ] R ]')} · 4` },
  ] },
  exit: { q: 'There are 6 tanks in a row and a limit of 4 blocks. Write a program that fits.', a: `${code('repeat 6 [ X ]')} · 2 blocks` },
  plan: {
    direct: 'Introduce the shell and block limits with puzzle 10.1, explain the star rules, and model a nested repeat with puzzle 10.5.',
    guided: 'Solve puzzle 10.3 together, then pairs plan puzzle 10.9 before the reveal.',
  },
},
11: {
  together: [{ k: 3, ask: 'Only some squares have a crystal. When should the rover collect?', note: 'Puzzle 11.3: move forward, then if crystal here, collect.' }, { k: 6, ask: 'The road turns right, then left. What should the rover check?', note: 'Puzzle 11.6: if path ahead [F] else [ if path left [L] else [R] ].' }],
  trace: [
    { map: ['#####', '#S..#', '###.#', '###G#', '#####'], dir: 1, prog: [U([IE('ahead', [F], [R])])], q: 'Follow the path. How many times does the rover turn right?', lines: 1, answer: '1 time.', why: 'It drives to the corner, finds a wall, turns right, and drives down to the flag.', expect: { atFlag: true } },
    { map: ['#S*.*G#'], dir: 1, prog: [U([F, IE('crystal', [C])])], q: 'How many crystals does it collect? What happens on the empty square?', lines: 1, answer: '2. Nothing, it just moves on.', why: 'The if block only collects when there is a crystal here; the else part is empty.', expect: { won: true } },
  ],
  write: [{ k: 4, q: 'If there is a crystal, collect it. Else, move forward.' }, { k: 8, q: 'Fire at tanks, move when the path is open, and turn right at walls.' }],
  plan: {
    direct: 'Introduce if / else with a road that turns (puzzle 11.1) and show a nested if / else for a road that turns both ways (puzzle 11.6).',
    guided: 'Solve puzzle 11.3 (crystal check) together, then pairs solve puzzle 11.6 before the reveal.',
  },
},
12: {
  together: [{ k: 2, ask: 'This road turns left. What goes in the else part?', note: 'Puzzle 12.2: if path ahead [F] else [L].' }, { k: 5, ask: 'Tanks on the road. Fire or move?', note: 'Puzzle 12.5: if tank ahead [X] else [F].' }],
  trace: [
    { map: ['#####', '###G#', '###.#', '#S..#', '#####'], dir: 1, prog: [U([IE('ahead', [F], [R])])], q: 'The road turns left, but the else part turns right. What happens?', lines: 1, answer: 'The rover gets stuck turning at the corner.', why: 'At the wall it turns right into another wall, and keeps turning. It never reaches the flag.', expectFail: true, expect: { fail: 'stuck in a loop' } },
    { map: ['#S.>.G#'], dir: 1, prog: [U([IE('tank', [X], [F])])], q: 'How many shells does it fire? Does it reach the flag?', lines: 1, answer: '1 shell, and yes.', why: 'The tank is ahead at the start, so it fires once. After that the path is clear and it moves to the flag.', expect: { won: true } },
  ],
  write: [{ k: 1, q: 'Turn right at the wall. Reach the flag.' }, { k: 8, q: 'Fire at the tank and turn right at the wall.' }],
  plan: {
    direct: 'Review if / else with one question at a time. Show the crystal check and the corner together (puzzle 12.7).',
    guided: 'Solve puzzle 12.2 (turn left) together, then pairs solve puzzle 12.5 before the reveal.',
  },
},
13: {
  together: [{ k: 1, ask: 'Follow the spiral all the way to the flag in the middle.', note: 'Puzzle 13.1: if path ahead [F] else [R], only 4 blocks.' }, { k: 9, ask: 'Crystals, tanks and walls. Which checks, in which order?', note: 'Puzzle 13.9: crystal check, then tank, then path.' }],
  trace: [
    { map: ['######', '#S...#', '####.#', '#.G#.#', '#.##.#', '#....#', '######'], dir: 1, prog: [U([IE('ahead', [F], [R])])], q: 'Follow the spiral. How many right turns does the rover make?', lines: 1, answer: '4 right turns.', why: 'It turns at each corner of the spiral and reaches the flag after the fourth turn.', expect: { atFlag: true } },
    { map: ['#S*.>.G#'], dir: 1, prog: [U([IE('tank', [X], [F])])], q: 'Does the rover reach the flag? Does it collect the crystal?', lines: 1, answer: 'It reaches the flag but never collects the crystal.', why: 'There is no crystal check in the program, so it drives over the crystal.', expect: { atFlag: true, left: 1 } },
  ],
  write: [{ k: 2, q: 'Keep your right hand on the wall all the way to the flag.' }, { k: 5, q: 'Fire at tanks on both roads and turn right at walls.' }],
  plan: {
    direct: 'Review if / else inside repeat until at flag. Show the right-hand rule (puzzle 13.2) and discuss ordering checks: tank, then crystal, then path (puzzle 13.9).',
    guided: 'Solve puzzle 13.1 (spiral) together, then pairs plan the checks for puzzle 13.9 before the reveal.',
  },
},
};
