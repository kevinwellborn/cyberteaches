/* CyberTeaches visitor counting (Google Analytics 4, Firebase project cyberteaches-c7316).
   Loaded with <script async src="/analytics.js?v=1"> on every page.
   - Never blocks the page: gtag.js loads in the background; if a network
     (e.g. school Cisco Umbrella) blocks it, the site works exactly the same.
   - No ad features: Google signals and ad personalization are turned off,
     and no names, emails or student ids are ever sent. */
(function () {
  var ID = 'G-FQGRZEZTGB';
  try {
    var h = location.hostname;
    // Only count the real site (not local testing or previews).
    if (!/(^|\.)cyberteaches\.com$/.test(h) && !/\.github\.io$/.test(h)) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    s.onerror = function () {}; // blocked? ignore quietly
    (document.head || document.documentElement).appendChild(s);
  } catch (e) { /* never break the page */ }
})();
