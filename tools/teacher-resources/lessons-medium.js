// Medium level overrides for the teacher resources (see build.js). Same shape as lessons-easy.js: each entry replaces the
// puzzle-based pieces of a lesson (together, write, exit, plan text that names puzzles). Traces, Part C, vocabulary,
// standards, warm-ups, concepts and ELL practice are shared with the Hard level.
// Puzzle numbers (k) refer to the Medium puzzles in academy/course.js.
const code = s => `<span class="code">${s}</span>`;

module.exports = {
1: {
  together: [{ k: 2, ask: 'Count the crystals. What goes in the repeat?', note: 'Puzzle 1.2: four crystals, so repeat 4 [ F C ].' }, { k: 6, ask: 'Two crystals, turn right. Two crystals, turn right. Can a repeat go inside a repeat?', note: 'Puzzle 1.6: the inside repeat collects 2 crystals, the outside repeat does that 3 times with a turn.' }],
  write: [{ k: 3, q: 'The rover faces <b>down</b>. There is an empty square before each crystal. Write the shortest program.' }, { k: 4, q: 'Collect the top row, turn right, and collect the 2 crystals going down.' }],
  exit: { q: 'There are 5 crystals in a row, right next to the rover. Write the shortest program.', a: `${code('repeat 5 [ F C ]')} · 3 blocks` },
  plan: {
    direct: 'Define program and sequence. Introduce the map and blocks; stress that left and right are from the rover\'s point of view. Solve puzzle 1.1 together (F F F C). Show the 8-block program for puzzle 1.2, find the pattern, and replace it with <span class="code">repeat 4 [ F C ]</span> (3 blocks).',
    guided: 'Pairs find the pattern in puzzle 1.3 before the reveal (<span class="code">repeat 2 [ F F C ]</span>), then try a repeat inside a repeat in puzzle 1.6. Review the debugging tips.',
    closure: 'Exit ticket: five crystals in a row. Answer: <span class="code">repeat 5 [ F C ]</span>, 3 blocks.',
    extension: 'aim for 3 stars on every puzzle; try puzzles 1.8 (big steps) and 1.9 (crystal star) and explain the pattern to a partner; swap Part D designs with a partner.',
  },
},
2: {
  together: [{ k: 1, ask: 'Count the crystals. What goes in the repeat?', note: 'Puzzle 2.1: five crystals, one repeat.' }, { k: 5, ask: 'There is a space before each crystal. What is the pattern now?', note: 'Puzzle 2.5: the pattern is F F C. Give pairs a minute first.' }],
  write: [{ k: 6, q: 'The rover faces <b>up</b>. Turn first, then collect the row.' }, { k: 9, q: 'Walk past the empty squares, then collect the 3 crystals. Use two repeats.' }],
  exit: { q: 'There are 6 crystals in a row, right next to the rover. Write the shortest program.', a: `${code('repeat 6 [ F C ]')} · 3 blocks` },
  plan: {
    direct: 'Review the repeat block. Model counting crystals with your finger before setting the repeat number (5 crystals = <span class="code">repeat 5 [ F C ]</span>). Show a turn that happens once, before the repeat (puzzle 2.6), and the crystals that are 3 squares apart (puzzle 2.7).',
    guided: 'Solve puzzle 2.1 together, then pairs find the F F C pattern in puzzle 2.5 before the reveal. Review the debugging tips.',
    closure: 'Exit ticket: six crystals in a row. Answer: <span class="code">repeat 6 [ F C ]</span>, 3 blocks.',
    extension: 'solve puzzles 2.8 and 2.10 (a turn between two repeats) and compare programs with a partner.',
  },
},
3: {
  together: [{ k: 1, ask: 'Crystal, gap, crystal, gap. What is one copy of the pattern?', note: 'Puzzle 3.1: the pattern is F C F.' }, { k: 4, ask: 'Three crystals, turn. Three crystals, turn. How can a repeat go inside a repeat?', note: 'Puzzle 3.4: outer repeat 4, inner repeat 3.' }],
  write: [{ k: 2, q: 'Climb the little steps and collect the crystal on each step.' }, { k: 9, q: 'Collect the bottom row and the column going up. Challenge: use a repeat inside a repeat.' }],
  exit: { q: 'What does this program do? How many blocks is it?', show: code('repeat 4 [ repeat 3 [ F C ] R ]'), a: 'The rover drives around a square, 3 crystals on each side · 5 blocks' },
  plan: {
    direct: 'Show a pattern with a turn in it using puzzle 3.2 (little steps): trace one step with your finger, then repeat it. Introduce a repeat inside a repeat with puzzle 3.4 (small square): the inner repeat does one side, the outer repeat does all four sides.',
    guided: 'Solve puzzle 3.1 together (pattern F C F), then pairs work on puzzle 3.4 before the reveal. Review the debugging tips.',
    extension: 'solve puzzles 3.8 (rectangle) and 3.10 (climbing stairs) and explain the two numbers of a nested repeat to a partner.',
  },
},
4: {
  together: [{ k: 2, ask: 'Collect every crystal on the way to the flag.', note: 'Puzzle 4.2: repeat until at flag [F C].' }, { k: 4, ask: 'Stairs all the way down. What is one step?', note: 'Puzzle 4.4: one step is F R F L.' }],
  write: [{ k: 3, q: 'Drive 3 squares, turn right, then keep going to the flag.' }, { k: 8, q: 'Collect the crystals first, then drive to the flag.' }],
  exit: { q: 'Why is repeat until at flag better than repeat 3 times when you don\'t know how far the flag is?', a: 'It stops by itself at the flag, so it works for any distance. You don\'t need to count.' },
  plan: {
    direct: 'Introduce repeat until at flag with puzzle 4.1. Show an infinite loop (only turning) and ask what is missing. Show "count first, then until" with puzzle 4.3 and a repeat inside the until loop with puzzle 4.7.',
    guided: 'Solve puzzle 4.2 together, then pairs find one step of the stairs in puzzle 4.4 before the reveal.',
    extension: 'try puzzle 4.9 (back and forth) and 4.10 (climb, then dash) and explain the pattern to a partner.',
  },
},
5: {
  together: [{ k: 4, ask: 'The rover faces up, but the flag is to the right. What first?', note: 'Puzzle 5.4: turn right, then repeat until at flag [F].' }, { k: 8, ask: 'Steps down to the flag. What goes inside the loop?', note: 'Puzzle 5.8: F R F L inside the loop.' }],
  write: [{ k: 7, q: 'Drive 2 squares, turn, then keep going to the flag.' }, { k: 10, q: 'Collect the 2 crystals, turn left, then drive to the flag.' }],
  exit: { q: 'The rover faces up. The flag is 8 squares to its right. Write the program.', a: `${code('R until flag [ F ]')} · 3 blocks` },
  plan: {
    direct: 'Review repeat until at flag. Show that the direction matters (puzzles 5.2 and 5.3) and that you can turn first (puzzle 5.4). Show count, then until (puzzle 5.7).',
    guided: 'Solve puzzle 5.4 (turn, then go) together, then pairs find one step of the stairs in puzzle 5.8 before the reveal.',
    extension: 'try puzzle 5.9 (up the stairs) and 5.10 (corner then dash) for 3 stars.',
  },
},
6: {
  together: [{ k: 3, ask: 'Two crystals, a gap, two crystals, a gap… What goes inside the loop?', note: 'Puzzle 6.3: F C F C F.' }, { k: 7, ask: 'Drive around the rock, 3 crystals on each side, and stop at the flag.', note: 'Puzzle 6.7: repeat until at flag [ repeat 3 [F C] R ].' }],
  write: [{ k: 2, q: 'Each step of the stairs is two squares wide. Drive to the flag.' }, { k: 5, q: 'Collect the crystals along the top, then turn and collect down to the flag.' }],
  exit: { q: 'What does this program do?', show: code('until flag [ repeat 3 [ F ] R ]'), a: 'It drives 3 squares and turns right, again and again, until it reaches the flag (a square path).' },
  plan: {
    direct: 'Show a pattern inside repeat until at flag with puzzle 6.3, and "count first, then until" with puzzle 6.5. Show a repeat inside the until loop with puzzle 6.1.',
    guided: 'Solve puzzle 6.3 together, then pairs solve puzzle 6.7 before the reveal.',
    extension: 'try puzzle 6.9 (crystal U-turn) and 6.10 (rectangle to flag) and explain the two repeats to a partner.',
  },
},
7: {
  together: [{ k: 5, ask: 'Some squares have a tank above them, some don\'t. When should the rover fire?', note: 'Puzzle 7.5: repeat 4 [ F L if tank [X] R ]. Firing with no tank wastes a shell.' }, { k: 9, ask: 'Tanks are hidden above some squares. Patrol until no tanks are left.', note: 'Puzzle 7.9: until no tanks [ F L if tank [X] R ].' }],
  write: [{ k: 3, q: 'Drive to the corner, face the tank, and fire. Use a repeat.' }, { k: 4, q: 'Drive along the road, turn twice, and destroy the tank at the end.' }],
  plan: {
    direct: 'Show drive mode (puzzle 7.1), then fire cannon (puzzle 7.2) and driving before firing (puzzle 7.3). Introduce if tank ahead (puzzle 7.5) and repeat until no tanks left (puzzle 7.9).',
    guided: 'Solve puzzle 7.5 together, then pairs solve puzzle 7.9 before the reveal.',
    extension: 'try puzzle 7.6 (auto-pilot) and 7.10 (fortress) and explain to a partner why the rover must keep moving.',
  },
},
8: {
  together: [{ k: 5, ask: 'Drive to the corner, then face the tank.', note: 'Puzzle 8.5: repeat 3 [F], turn left, fire.' }, { k: 10, ask: 'Stop under each tank and fire up. What is the pattern?', note: 'Puzzle 8.10: repeat 3 [ F F L X R ].' }],
  write: [{ k: 4, q: 'The tank is behind the rover. Turn around and fire.' }, { k: 6, q: 'One tank above, one below. Destroy both with 5 blocks.' }],
  plan: {
    direct: 'Model aiming: turn until the rover faces the tank, then fire. Show a turn-around (puzzle 8.4), a drive-then-fire pattern (puzzle 8.5), and tanks in three directions (puzzle 8.7).',
    guided: 'Solve puzzle 8.5 together, then pairs solve puzzle 8.10 before the reveal.',
    extension: 'try puzzle 8.7 (three directions) with a repeat and explain why repeat 3 [ X R ] works.',
  },
},
9: {
  together: [{ k: 2, ask: 'The tanks are below the road this time. Which way does the rover look?', note: 'Puzzle 9.2: turn right to look down, then left to face the road again.' }, { k: 7, ask: 'Two tanks block the road to the flag. Clear them, then drive.', note: 'Puzzle 9.7: until no tanks [X], then until flag [F].' }],
  write: [{ k: 3, q: 'Patrol the road, checking above, until no tanks are left.' }, { k: 10, q: 'Patrol the road, checking below, until no tanks are left.' }],
  plan: {
    direct: 'Model a patrol with puzzle 9.2 and a spin with puzzle 9.5. Show clearing the road then driving on (puzzle 9.7) and checking both sides (puzzle 9.6).',
    guided: 'Solve puzzle 9.2 (tanks below) together, then pairs solve puzzle 9.7 before the reveal.',
    extension: 'try puzzle 9.8 (patrol the corner) with a repeat inside a repeat.',
  },
},
10: {
  together: [{ k: 3, ask: 'A tank above every square. 4 shells. Limit: 9 blocks.', note: 'Puzzle 10.3: repeat 4 [ F L X R ].' }, { k: 9, ask: 'Only some squares have a tank. One shell per tank. What do you need?', note: 'Puzzle 10.9: if tank ahead inside the patrol, so no shells are wasted.' }],
  write: [{ k: 4, q: 'Tanks below every other square. 3 shells. Limit: 10 blocks.', goal: true }, { k: 10, q: 'Clear the top road, turn, clear the side road. 4 shells. Limit: 12 blocks.', goal: true }],
  exit: { q: 'There are 8 tanks in a row and a limit of 4 blocks. Write a program that fits.', a: `${code('repeat 8 [ X ]')} · 2 blocks` },
  plan: {
    direct: 'Introduce the shell and block limits with puzzle 10.1, explain the star rules, and model a nested repeat with puzzle 10.5.',
    guided: 'Solve puzzle 10.3 together, then pairs plan puzzle 10.9 before the reveal.',
    extension: 'try puzzle 10.8 (stop and spin) and 10.10 (final mission) within the block limit.',
  },
},
11: {
  together: [{ k: 3, ask: 'Only some squares have a crystal. When should the rover collect?', note: 'Puzzle 11.3: move forward, then if crystal here, collect.' }, { k: 2, ask: 'The road turns right, then left. What should the rover check?', note: 'Puzzle 11.2: if path ahead [F] else [ if path left [L] else [R] ].' }],
  write: [{ k: 7, q: 'If there is a crystal, collect it. Else, move forward.' }, { k: 4, q: 'Fire at tanks, move when the path is open, and turn right at walls.' }],
  plan: {
    direct: 'Introduce if / else with a road that turns (puzzle 11.1) and show a nested if / else for a road that turns both ways (puzzle 11.2).',
    guided: 'Solve puzzle 11.3 (crystal check) together, then pairs solve puzzle 11.2 before the reveal.',
    extension: 'try puzzle 11.9 (right-hand rule) and 11.10 (grand finale) and explain the order of the checks.',
  },
},
12: {
  together: [{ k: 2, ask: 'This road turns left. What goes in the else part?', note: 'Puzzle 12.2: if path ahead [F] else [L].' }, { k: 5, ask: 'Tanks on the road. Fire or move?', note: 'Puzzle 12.5: if tank ahead [X] else [F].' }],
  write: [{ k: 1, q: 'Turn right at the wall. Reach the flag.' }, { k: 8, q: 'Fire at the tank and turn right at the wall.' }],
  plan: {
    direct: 'Review if / else with one question at a time. Show the crystal check and the corner together (puzzle 12.7) and a road that turns both ways (puzzle 12.6).',
    guided: 'Solve puzzle 12.2 (turn left) together, then pairs solve puzzle 12.5 before the reveal.',
    extension: 'try puzzle 12.9 (zigzag maze) and 12.10 (crystal maze) for 3 stars.',
  },
},
13: {
  together: [{ k: 2, ask: 'Follow the spiral all the way to the flag in the middle.', note: 'Puzzle 13.2: if path ahead [F] else [R], only 4 blocks.' }, { k: 9, ask: 'Crystals, tanks and walls. Which checks, in which order?', note: 'Puzzle 13.9: crystal check, then tank, then path.' }],
  write: [{ k: 3, q: 'Keep your right hand on the wall all the way to the flag.' }, { k: 6, q: 'Fire at tanks on both roads and turn right at walls.' }],
  plan: {
    direct: 'Review if / else inside repeat until at flag. Show the right-hand rule (puzzle 13.3) and discuss ordering checks: crystal, then tank, then path (puzzle 13.9).',
    guided: 'Solve puzzle 13.2 (spiral) together, then pairs plan the checks for puzzle 13.9 before the reveal.',
    extension: 'try puzzle 13.8 (right turns and crystals) and 13.10 (final maze) and explain every check to a partner.',
  },
},
};
