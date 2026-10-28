// Course content shared by the student site and the teacher dashboard.
// video: a YouTube link for the lesson (shown in the lesson intro when set).
// Each lesson introduces new blocks (newBlocks). Puzzles in a lesson only offer that lesson's toolbox.
const UNITS = [
  {n:1, title:'Repeat and collect', color:'var(--b-loop)', newBlocks:['collect','repeat'], video:'',
   concept:'Collect every crystal on the map. When the same steps happen again and again, put them inside a repeat block instead of dragging them in over and over.',
   intro:['Your rover is on a crystal survey. Drive onto a crystal and use <b>collect crystal</b> to pick it up.',
          'Lots of crystals in a row? A <b>repeat</b> block runs the blocks inside it as many times as you choose.',
          'Try to match the block goal for 3 stars. Shorter programs are easier to read and fix.']},
  {n:2, title:'Repeat until', color:'var(--b-logic)', newBlocks:['until'], video:'',
   concept:'Sometimes you do not know how many times to repeat. "Repeat until at flag" keeps going until the rover arrives, however far away the flag is.',
   intro:['A plain repeat needs you to count. <b>Repeat until at flag</b> keeps repeating by itself and stops the moment the rover reaches the flag.',
          'Watch out: if the blocks inside never get the rover to the flag, it repeats forever and the rover gets stuck.',
          'You can still use repeat and collect crystal from Lesson 1.']}
];
const UPCOMING = [
  {title:'If', blurb:'Let the rover check the path ahead and decide what to do.'},
  {title:'If / else', blurb:'Pick between two plans, depending on what the rover sees.'},
  {title:'Destroy walls', blurb:'Blast cracked walls, collect charges, and find keys to locked gates.'}
];

// map legend: # rock, . sand, S start, G flag (optional), * crystal, % cracked wall, b charge, k key, D gate, $ coin
// dir: 0 up, 1 right, 2 down, 3 left. A map with no G is won by collecting every crystal.
const L1 = ['forward','left','right','collect','repeat'];
const L2 = ['forward','left','right','collect','repeat','until'];
const LEVELS = [
  {unit:1, title:'Pick it up', dir:1, ideal:3, blocks:L1,
   goal:'Drive onto the crystal and collect it.',
   hint:'Move forward twice so the rover is on top of the crystal, then use "collect crystal".',
   map:['#####','#S.*#','#####']},
  {unit:1, title:'Crystal row', dir:1, ideal:3, blocks:L1,
   goal:'Collect all 4 crystals using only 3 blocks.',
   hint:'Each crystal needs the same two steps: move forward, collect. Put those inside a repeat and set it to 4.',
   map:['#######','#S****#','#######']},
  {unit:1, title:'Every other square', dir:1, ideal:4, blocks:L1,
   goal:'The crystals are spaced out. Collect all 3 with 4 blocks.',
   hint:'Now the steps for each crystal are: forward, forward, collect.',
   map:['#########','#S.*.*.*#','#########']},
  {unit:1, title:'Around the corner', dir:2, ideal:7, blocks:L1,
   goal:'Collect the crystals down the side and along the bottom.',
   hint:'Use one repeat for the column, turn left, then another repeat for the row.',
   map:['######','#S####','#*####','#*####','#****#','######']},
  {unit:1, title:'Crystal stairs', dir:1, ideal:7, blocks:L1,
   goal:'Collect every crystal on the staircase with 7 blocks.',
   hint:'One step of the stairs is: forward, collect, turn right, forward, collect, turn left. Repeat it 3 times.',
   map:['#######','#S*####','##**###','###**##','####*##','#######']},
  {unit:1, title:'Loop inside a loop', dir:1, ideal:5, blocks:L1,
   goal:'Collect all 9 crystals around the rocks. Try putting a repeat inside another repeat.',
   hint:'Each side is "forward, collect" 3 times, then "turn right". Repeat that whole side 3 times.',
   map:['######','#S***#','####*#','####*#','#****#','######']},

  {unit:2, title:'Keep going', dir:1, ideal:2, blocks:L2,
   goal:'No counting needed. Keep moving until the rover reaches the flag.',
   hint:'Put one "move forward" inside "repeat until at flag".',
   map:['############','#S........G#','############']},
  {unit:2, title:'Collect on the way', dir:1, ideal:3, blocks:L2,
   goal:'Collect every crystal on the way to the flag, using 3 blocks.',
   hint:'Inside "repeat until at flag", put "move forward" and then "collect crystal".',
   map:['########','#S****G#','########']},
  {unit:2, title:'Count, then don\'t', dir:1, ideal:5, blocks:L2,
   goal:'Drive along the top, turn, and then keep going until the flag.',
   hint:'Use "repeat 4 times" for the top row, then "turn right", then "repeat until at flag" with "move forward" inside.',
   map:['#######','#S....#','#####.#','#####.#','#####G#','#######']},
  {unit:2, title:'Endless stairs', dir:1, ideal:5, blocks:L2,
   goal:'Climb down the staircase to the flag. You do not need to count the steps.',
   hint:'One step is: forward, turn right, forward, turn left. Put it inside "repeat until at flag".',
   map:['########','#S.#####','##..####','###..###','####..##','#####G##','########']},
  {unit:2, title:'Crystal staircase', dir:1, ideal:7, blocks:L2,
   goal:'Collect every crystal on the stairs, then reach the flag.',
   hint:'One step is: forward, collect, turn right, forward, collect, turn left. Repeat until at flag.',
   map:['########','#S*#####','##**####','###**###','####*G##','########']}
];
LEVELS.forEach((l,i)=>{ l.n=i+1; l.k=LEVELS.slice(0,i).filter(o=>o.unit===l.unit).length+1 });  // k: puzzle number inside its lesson
