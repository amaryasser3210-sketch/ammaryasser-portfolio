/* ============================================================
   main.js — renders the page from js/site.config.js
   Content lives in site.config.js; this file only draws it.
   ============================================================ */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) return;

  /* ---------------- helpers ---------------- */
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function set(id, html) { var el = $(id); if (el) el.innerHTML = html; }
  function svg(paths, extra) {
    return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
      'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (extra || "") + ">" + paths + "</svg>";
  }
  var ICON = {
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7.5 8.5 6 8.5-6"/>'),
    phone: svg('<path d="M6.6 3h3l1.5 4-2 1.4a12.4 12.4 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6.6 3Z"/>'),
    pin: svg('<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>'),
    link: svg('<path d="M10 13.5a4 4 0 0 0 5.7.3l2.6-2.6a4 4 0 0 0-5.6-5.7L11.5 6.8"/><path d="M14 10.5a4 4 0 0 0-5.7-.3l-2.6 2.6a4 4 0 0 0 5.6 5.7l1.1-1.2"/>'),
    linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V24h-4.5V8.25zM8.5 8.25h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.5c0-1.79-.03-4.09-2.49-4.09-2.49 0-2.87 1.95-2.87 3.96V24H8.5V8.25z"/></svg>',
    dl: svg('<path d="M12 4v11"/><path d="m7.5 11 4.5 4.5L16.5 11"/><path d="M5 19.5h14"/>')
  };

  var siteUrl = (S.meta.siteUrl || "").replace(/\/+$/, "");
  var shareUrl = encodeURIComponent(siteUrl + "/");
  var shareHref = "https://www.linkedin.com/sharing/share-offsite/?url=" + shareUrl;

  var placeholderSvg = function (label) {
    var txt = (label || "?").slice(0, 1);
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">' +
      '<rect width="800" height="500" fill="#eef2f6"/>' +
      '<circle cx="620" cy="90" r="180" fill="#2563eb" opacity=".07"/>' +
      '<circle cx="120" cy="430" r="150" fill="#2563eb" opacity=".05"/>' +
      '<text x="400" y="300" font-family="Arial,sans-serif" font-size="260" font-weight="700" ' +
      'fill="#2563eb" opacity=".22" text-anchor="middle">' + esc(txt) + "</text>" +
      '<text x="400" y="440" font-family="Arial,sans-serif" font-size="24" fill="#94a3b8" ' +
      'text-anchor="middle">image coming soon</text></svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
  };

  /* cover image with graceful fallbacks (drop photo.jpg etc. next to cover later) */
  function coverImg(project) {
    var exts = ["webp", "jpg", "jpeg", "png"];
    var alts = exts.map(function (e) { return "assets/projects/" + project.id + "/photo." + e; });
    var chain = [project.cover].concat(alts);
    return '<img src="' + esc(chain[0]) + '" alt="' + esc(project.title) + '" loading="lazy" decoding="async" ' +
      'data-chain="' + esc(JSON.stringify(chain.slice(1))) + '" ' +
      'data-fallback="' + esc(placeholderSvg(project.title)) + '">';
  }

  function bindImageFallbacks(scope) {
    (scope || document).querySelectorAll("img[data-chain]").forEach(function (img) {
      var fail = function () {
        var chain;
        try { chain = JSON.parse(img.getAttribute("data-chain") || "[]"); } catch (e) { chain = []; }
        if (chain.length) {
          img.setAttribute("data-chain", JSON.stringify(chain.slice(1)));
          img.src = chain[0];
        } else {
          img.onerror = null;
          img.src = img.getAttribute("data-fallback");
        }
      };
      img.addEventListener("error", fail);
      if (img.complete && img.naturalWidth === 0) fail();
    });
  }

  /* ---------------- hero ---------------- */
  function renderHero() {
    var h = S.hero || {};
    var html = "";
    html += '<div class="hero-photo">';
    html += '<img src="' + esc(h.avatar) + '" alt="Portrait of ' + esc(S.meta.name) + '" width="220" height="220">';
    html += '<div class="hero-status">Open to R&amp;D collaborations</div>';
    html += "</div>";
    html += '<div class="hero-copy">';
    html += '<span class="eyebrow">' + esc(h.eyebrow) + "</span>";
    html += "<h1>" + esc(h.title) + "</h1>";
    html += '<p class="hero-headline">' + esc(h.headline) + "</p>";
    html += '<p class="hero-intro">' + esc(h.intro) + "</p>";

    if (h.facts && h.facts.length) {
      html += '<ul class="hero-facts">';
      h.facts.forEach(function (f) {
        html += "<li><span>" + esc(f.label) + "</span><strong>" + esc(f.value) + "</strong></li>";
      });
      html += "</ul>";
    }

    html += '<div class="cta-row">';
    (h.ctas || []).forEach(function (c) {
      if (c.external) {
        html += '<a class="btn btn-ghost" href="' + esc(c.href) + '" target="_blank" rel="noopener noreferrer">' + esc(c.label) + "</a>";
      } else if (c.download) {
        html += '<a class="btn btn-ghost" href="' + esc(c.href) + '" download>' + ICON.dl + esc(c.label) + "</a>";
      } else {
        html += '<a class="btn ' + (c.primary ? "btn-primary" : "btn-ghost") + '" href="' + esc(c.href) + '">' + esc(c.label) + "</a>";
      }
    });
    html += '<a class="btn btn-soft" href="' + esc(S.links.linkedin) + '" target="_blank" rel="noopener noreferrer">' + ICON.linkedin + "LinkedIn</a>";
    html += "</div></div>";

    set("heroBody", html);
  }

  /* ---------------- about ---------------- */
  function renderAbout() {
    var a = S.about;
    if (!a) return;
    var html = '<div class="about-grid"><div class="about-text">';
    (a.paragraphs || []).forEach(function (p) { html += "<p>" + esc(p) + "</p>"; });
    html += "</div>";
    if (a.facts && a.facts.length) {
      html += '<dl class="about-facts">';
      a.facts.forEach(function (f) {
        html += "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>";
      });
      html += "</dl>";
    }
    html += "</div>";
    set("aboutBody", html);
  }

  /* ---------------- projects ---------------- */
  var activeFilter = "All";

  function allTags() {
    var seen = {}, out = [];
    (S.projects.items || []).forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        if (!seen[t]) { seen[t] = 1; out.push(t); }
      });
    });
    return out;
  }

  function renderFilters() {
    var tags = ["All"].concat(allTags());
    var html = "";
    tags.forEach(function (t) {
      html += '<button class="filter-btn" type="button" data-filter="' + esc(t) + '" aria-pressed="' +
        (t === activeFilter) + '">' + esc(t) + "</button>";
    });
    set("projectFilters", html);

    var bar = $("projectFilters");
    if (bar && !bar.dataset.bound) {
      bar.dataset.bound = "1";
      bar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (!btn) return;
        activeFilter = btn.getAttribute("data-filter");
        renderFilters();
        renderProjects();
      });
    }
  }

  function renderProjects() {
    var p = S.projects;
    set("projectsIntro", esc(p.intro || ""));
    var items = (p.items || []).filter(function (it) {
      return activeFilter === "All" || (it.tags || []).indexOf(activeFilter) !== -1;
    });

    if (!items.length) {
      set("projectGrid", '<div class="empty-state">No projects in this category yet.</div>');
      return;
    }

    var html = "";
    items.forEach(function (it) {
      html += '<article class="project-card">';
      html += '<div class="project-cover">' + coverImg(it) + "</div>";
      html += '<div class="project-body">';
      html += '<div class="project-meta"><span>' + esc(it.year) + '</span><span class="dot"></span><span>' + esc(it.role) + "</span></div>";
      html += '<h3 class="project-title">' + esc(it.title) + "</h3>";
      html += '<div class="project-org">' + esc(it.org) + "</div>";
      html += '<p class="project-summary">' + esc(it.summary) + "</p>";
      if (it.highlights && it.highlights.length) {
        html += '<ul class="project-highlights">';
        it.highlights.forEach(function (hl) { html += "<li>" + esc(hl) + "</li>"; });
        html += "</ul>";
      }
      html += '<div class="chip-row">';
      (it.tags || []).forEach(function (t) { html += '<span class="chip">' + esc(t) + "</span>"; });
      html += "</div>";
      if (it.links && it.links.length) {
        html += '<div class="project-links">';
        it.links.forEach(function (l) {
          html += '<a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + " →</a>";
        });
        html += "</div>";
      }
      html += "</div></article>";
    });
    set("projectGrid", html);
    bindImageFallbacks($("projectGrid"));
  }

  /* ---------------- skills ---------------- */
  function renderSkills() {
    var s = S.skills;
    if (!s) return;
    var html = '<p class="section-intro">' + esc(s.intro || "") + '</p><div class="skills-grid">';
    (s.groups || []).forEach(function (g) {
      html += '<div class="skill-card"><h3>' + esc(g.name) + '</h3><div class="chip-row">';
      (g.items || []).forEach(function (i) { html += '<span class="chip">' + esc(i) + "</span>"; });
      html += "</div></div>";
    });
    html += "</div>";
    set("skillsBody", html);
  }

  /* ---------------- timeline ---------------- */
  function renderTimeline() {
    var t = S.timeline;
    if (!t) return;
    var html = "";
    (t.items || []).forEach(function (i) {
      html += "<li>";
      html += '<div class="tl-top"><span class="tl-title">' + esc(i.title) + '</span><span class="tl-period">' + esc(i.period) + "</span></div>";
      html += '<div class="tl-org">' + esc(i.org) + "</div>";
      html += '<p class="tl-detail">' + esc(i.detail) + "</p>";
      html += "</li>";
    });
    set("timelineBody", html);
  }

  /* ---------------- credentials ---------------- */
  function renderBadges() {
    var html = "";
    (S.badges || []).forEach(function (b) {
      html += '<div class="badge-card"><h3>' + esc(b.title) + "</h3>";
      (b.items || []).forEach(function (it) {
        html += '<div class="badge-item"><strong>' + esc(it.name) + "</strong><span>" + esc(it.detail) + "</span></div>";
      });
      html += "</div>";
    });
    set("badgesBody", html);
  }

  /* ---------------- contact + share ---------------- */
  function renderContact() {
    var c = S.contact || {};
    var L = S.links;
    var html = '<div class="contact-wrap">';

    html += '<div class="contact-card">';
    html += '<p>' + esc(c.intro || "") + "</p>";
    if (c.note) html += '<span class="contact-note">' + esc(c.note) + "</span>";
    html += '<ul class="contact-list">';
    html += '<li><span class="ico">' + ICON.mail + '</span><span><strong>' +
      '<a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a></strong><small>Email</small></span></li>";
    html += '<li><span class="ico">' + ICON.phone + '</span><span><strong>' +
      '<a href="tel:' + esc(L.phone) + '">' + esc(L.phoneDisplay || L.phone) + "</a></strong><small>Phone</small></span></li>";
    html += '<li><span class="ico">' + ICON.pin + "</span><span><strong>" + esc(L.location) + "</strong><small>Location</small></span></li>";
    html += '<li><span class="ico">' + ICON.linkedin + '</span><span><strong><a href="' + esc(L.linkedin) +
      '" target="_blank" rel="noopener noreferrer">Ammar Yasser</a></strong><small>LinkedIn profile</small></span></li>';
    html += "</ul>";
    html += '<div class="cta-row"><a class="btn btn-primary" href="mailto:' + esc(L.email) + '">Send an email</a>';
    html += '<a class="btn btn-ghost" href="' + esc(L.cv) + '" download>' + ICON.dl + "Download CV</a></div>";
    html += "</div>";

    html += '<div class="contact-card share-box"><h4>Share this portfolio</h4>';
    html += "<p>Know someone who needs a mechatronics engineer? Share the page — it renders a proper preview on LinkedIn thanks to its metadata.</p>";
    html += '<div class="share-row">';
    html += '<a class="btn btn-soft" href="' + shareHref + '" target="_blank" rel="noopener noreferrer" id="shareLinkedin">' + ICON.linkedin + "Share on LinkedIn</a>";
    html += '<button class="btn btn-ghost" type="button" id="copyLink">' + ICON.link + "Copy link</button>";
    html += "</div>";
    html += '<p style="margin:16px 0 0;font-size:.85rem;color:var(--muted)">' + esc(siteUrl) + "</p>";
    html += "</div></div>";

    set("contactBody", html);

    var copy = $("copyLink");
    if (copy) copy.addEventListener("click", function () { copyText(siteUrl + "/"); });
  }

  function toast(msg) {
    var t = $("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._h);
    toast._h = setTimeout(function () { t.classList.remove("show"); }, 2400);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        function () { toast("Link copied ✓"); },
        function () { fallbackCopy(text); }
      );
    } else fallbackCopy(text);
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:-999px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast("Link copied ✓"); }
    catch (e) { toast("Copy failed — select the URL manually"); }
    document.body.removeChild(ta);
  }

  /* ---------------- footer ---------------- */
  function renderFooter() {
    set("footerName", S.meta.fullName || S.meta.name);
    set("footerYear", String(new Date().getFullYear()));
    var li = $("footerLinkedin"), em = $("footerEmail"), cv = $("footerCv");
    if (li) li.href = S.links.linkedin;
    if (em) em.href = "mailto:" + S.links.email;
    if (cv) cv.href = S.links.cv;
  }

  /* ---------------- navigation ---------------- */
  function initNav() {
    var toggle = $("navToggle"), nav = $("siteNav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      sections.forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------------- boot ---------------- */
  renderHero();
  renderAbout();
  renderFilters();
  renderProjects();
  renderSkills();
  renderTimeline();
  renderBadges();
  renderContact();
  renderFooter();
  initNav();
  bindImageFallbacks(document);
})();
