/* Ad spots for the AP Networking pages.
   Any <div data-ad="strip"></div> on a page becomes one ad from CT_ADS, starting at a random entry each visit.
   For now the list holds only Kevin's own books and channel. To add a sponsor later, add an entry:
   title, text, cta (button text), url, and either img (an image path) or art (short cover text). */
window.CT_ADS = [
  { title: "AP® Cybersecurity Course Text & Study Guide", text: "By Kevin Wellborn. The sister AP course: all 5 units with practice questions.", cta: "Get it on Amazon", url: "https://www.amazon.com/dp/B0HMFKHXQ3", img: "/book-cover.jpg" },
  { title: "CompTIA Security+ SY0-801 Study Guide", text: "By Kevin Wellborn. Includes a 90-question practice exam.", cta: "Get it on Amazon", url: "https://www.amazon.com/dp/B0HNDS8HNL", img: "/securityplus/book-cover.jpg" },
  { title: "AP® Computer Science Principles Study Guide", text: "By Kevin Wellborn. All 5 Big Ideas.", cta: "Get it on Amazon", url: "https://www.amazon.com/dp/B0HN67PZWG", img: "/apcsp/book-cover.jpg" },
  { title: "Free video lessons", text: "Lab walkthroughs and lessons on YouTube @CyberTeaches.", cta: "Subscribe", url: "https://www.youtube.com/@cyberteaches?sub_confirmation=1", art: "▶" }
];
(function () {
  var ads = window.CT_ADS || [];
  if (!ads.length) return;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var i = Math.floor(Math.random() * ads.length);
  document.querySelectorAll('[data-ad]').forEach(function (slot) {
    var a = ads[i++ % ads.length];
    var art = a.img ? '<img class="ad-art" src="' + esc(a.img) + '" alt="">' : '<span class="ad-art" aria-hidden="true">' + esc(a.art || '') + '</span>';
    slot.outerHTML = '<a class="ad ad-' + slot.dataset.ad + '" href="' + esc(a.url) + '" target="_blank" rel="noopener sponsored"><span class="ad-tag">Ad</span>' + art +
      '<span class="ad-text"><b>' + esc(a.title) + '</b><span class="ad-sub">' + esc(a.text) + '</span></span><span class="ad-cta">' + esc(a.cta) + ' →</span></a>';
  });
})();
