// Python Quest review pages: draws each temple picture (.pqpic data-lv = a level like in levels.js) with the game's own art,
// as a still picture. Needs pyrun.js, levels.js and game.js on the page.
window.PQR = {
  draw(root){
    (root || document).querySelectorAll('.pqpic:not(.drawn)').forEach(box => {
      box.classList.add('drawn');
      let lv; try { lv = JSON.parse(box.dataset.lv) } catch (e) { return }
      const cv = document.createElement('canvas'); cv.setAttribute('role', 'img');
      cv.setAttribute('aria-label', 'Temple map: ' + lv.map.join(' / '));
      box.append(cv);
      const p = new PQ.Player(cv); p.setLevel({par: 99, ...lv});
      // A few frames to draw, then stop the animation loop so a page with many pictures stays light.
      setTimeout(() => p.destroy(), 400);
    });
  }
};
