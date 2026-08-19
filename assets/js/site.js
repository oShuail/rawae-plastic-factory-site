/* ==========================================================================
   RAWAE AL INTAJ PLASTIC FACTORY — site behaviour
   Vanilla JS, no dependencies. Every effect degrades gracefully.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var isAR = root.lang === 'ar';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $  = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };

  /* ------------------------------------------------------------------
     Logo stroke draw-in — measure each path so the dash animation fits
     ------------------------------------------------------------------ */
  $$('.brand__mark path').forEach(function (p) {
    try {
      var len = Math.ceil(p.getTotalLength());
      p.style.setProperty('--len', len);
    } catch (e) { /* getTotalLength unsupported — path just shows */ }
  });

  /* ------------------------------------------------------------------
     Hero headline rise (after fonts settle, so lines don't reflow mid-animation)
     ------------------------------------------------------------------ */
  function markLoaded() { doc.body.classList.add('is-loaded'); }
  if (doc.fonts && doc.fonts.ready) {
    doc.fonts.ready.then(markLoaded);
    setTimeout(markLoaded, 1200); // safety net if the font promise stalls
  } else {
    markLoaded();
  }

  /* ------------------------------------------------------------------
     Hero film (optional)
     The <video> ships with preload="none" and no sources loaded until we
     ask for them, so a site with no video file costs nothing. It is only
     revealed on the first 'playing' event — every failure mode (missing
     file, blocked autoplay, reduced motion, save-data) just leaves the
     still image in place.
     ------------------------------------------------------------------ */
  var heroVideo = $('.hero__video');
  if (heroVideo) {
    var saveData = (navigator.connection || {}).saveData === true;

    if (reduced || saveData) {
      heroVideo.remove();
    } else {
      heroVideo.addEventListener('playing', function () {
        heroVideo.classList.add('is-playing');
      });

      // Calling play() alone is enough to trigger the resource-selection
      // algorithm on a preload="none" element — no separate .load() call.
      // Pairing an explicit .load() with an immediate .play() races the
      // browser's own fetch, sometimes aborting it (net::ERR_ABORTED) and
      // firing a spurious 'error' on the element before the real, successful
      // request lands. There's nothing to actively recover from on error:
      // the still image already covers the video (opacity:0 until
      // 'playing' fires), so a truly broken source just leaves it in place.
      // Pick the cut before anything is fetched: the light 960px encode on
      // phones and small tablets, the full 1920px one elsewhere. Assigning
      // .src is what kicks off the media load algorithm, so no .load() call
      // is needed (and adding one would race the fetch — see above).
      var narrow = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
      var src = (narrow && heroVideo.getAttribute('data-src-narrow')) || heroVideo.getAttribute('data-src');

      heroVideo.preload = 'auto';
      if (src) heroVideo.src = src;
      var attempt = heroVideo.play();
      if (attempt && attempt.catch) {
        attempt.catch(function () { /* autoplay refused — the still stands in */ });
      }
    }
  }

  /* ------------------------------------------------------------------
     Scroll progress + sticky header + floating actions
     ------------------------------------------------------------------ */
  var header   = $('.header');
  var progress = $('.progress');
  var fab      = $('.fab');
  var bar      = $('.action-bar');
  var ticking  = false;

  function onScroll() {
    var y   = window.scrollY || window.pageYOffset;
    var max = doc.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    if (header) header.classList.toggle('is-stuck', y > 24);

    var past = y > window.innerHeight * 0.55;
    if (fab) fab.classList.toggle('is-in', past);
    if (bar) bar.classList.toggle('is-in', past);

    runParallax();
    ticking = false;
  }
  function requestScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */
  var burger = $('.burger');
  var drawer = $('.mobile-nav');

  function setNav(open) {
    if (!burger || !drawer) return;
    burger.setAttribute('aria-expanded', String(open));
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    doc.body.classList.toggle('nav-open', open);
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      setNav(burger.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setNav(false);
    });
  }

  /* ------------------------------------------------------------------
     Scroll reveal — stagger siblings that share a parent
     ------------------------------------------------------------------ */
  var revealables = $$('.reveal, .media--reveal, .claim');

  if (!('IntersectionObserver' in window) || reduced) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -2% 0px' });

    revealables.forEach(function (el) {
      // auto-stagger: index within the group of revealables sharing a parent
      if (!el.style.getPropertyValue('--i')) {
        var group = Array.prototype.filter.call(el.parentNode.children, function (c) {
          return c.classList && c.classList.contains('reveal');
        });
        var i = group.indexOf(el);
        if (i > 0) el.style.setProperty('--i', Math.min(i, 6));
      }
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     Showcase — the sticky photo follows whichever step you are reading
     ------------------------------------------------------------------ */
  var showcase = $('.showcase');
  if (showcase) {
    var steps   = $$('.pstep', showcase);
    var shots   = $$('.shot', showcase);
    var counter = $('.showcase__counter', showcase);
    var current = -1;

    var activate = function (i) {
      if (i === current || i < 0 || i >= steps.length) return;
      current = i;
      steps.forEach(function (s, n) { s.classList.toggle('is-on', n === i); });
      shots.forEach(function (s, n) { s.classList.toggle('is-on', n === i); });
      if (counter) counter.textContent = pad(i + 1) + ' / ' + pad(steps.length);
    };
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };

    if ('IntersectionObserver' in window && !reduced) {
      // A thin band across the middle of the viewport picks the active step.
      var stepIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) activate(steps.indexOf(entry.target));
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
      steps.forEach(function (s) { stepIO.observe(s); });
    }
    activate(0);
  }

  /* ------------------------------------------------------------------
     Colour showcase — each card's stage auto-shuffles through its photo
     set; clicking a card opens the same set in a full-screen lightbox.
     ------------------------------------------------------------------ */
  var colorcards = $$('.colorcard');
  if (colorcards.length) {
    if (!reduced) {
      colorcards.forEach(function (card) {
        var imgs = $$('img', $('.colorcard__stage', card));
        if (imgs.length < 2) return;
        var i = 0;
        setInterval(function () {
          imgs[i].classList.remove('is-on');
          i = (i + 1) % imgs.length;
          imgs[i].classList.add('is-on');
        }, 2600 + Math.random() * 600);
      });
    }

    var lightbox = $('#color-lightbox');
    if (lightbox) {
      var lbImg    = $('.lightbox__img', lightbox);
      var lbCount  = $('.lightbox__count', lightbox);
      var lbPrev   = $('.lightbox__prev', lightbox);
      var lbNext   = $('.lightbox__next', lightbox);
      var lbClose  = $('.lightbox__close', lightbox);
      var lbImages = [];
      var lbIndex  = 0;
      var lastFocus = null;

      var showLb = function (index) {
        lbIndex = (index + lbImages.length) % lbImages.length;
        var src = lbImages[lbIndex].currentSrc || lbImages[lbIndex].src;
        lbImg.src = src;
        lbImg.alt = lbImages[lbIndex].alt || '';
        lbCount.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
      };
      var openLb = function (card) {
        lbImages = $$('img', $('.colorcard__stage', card));
        if (!lbImages.length) return;
        lastFocus = doc.activeElement;
        showLb(0);
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        doc.body.classList.add('nav-open');
        lbClose.focus();
      };
      var closeLb = function () {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        doc.body.classList.remove('nav-open');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      };

      colorcards.forEach(function (card) {
        card.addEventListener('click', function () { openLb(card); });
      });
      lbClose.addEventListener('click', closeLb);
      lbPrev.addEventListener('click', function () { showLb(lbIndex - 1); });
      lbNext.addEventListener('click', function () { showLb(lbIndex + 1); });
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLb();
      });
      doc.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLb();
        if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
        if (e.key === 'ArrowRight') showLb(lbIndex + 1);
      });
    }
  }

  /* ------------------------------------------------------------------
     Parallax on full-bleed band imagery
     ------------------------------------------------------------------ */
  var parallax = $$('.band__bg img');
  function runParallax() {
    // onScroll() fires once before this block initialises, hence the guard.
    if (reduced || !parallax || !parallax.length) return;
    var vh = window.innerHeight;
    parallax.forEach(function (img) {
      var band = img.closest('.band');
      if (!band) return;
      var r = band.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      // -1 above the fold … 1 below it
      var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      img.style.setProperty('--py', (progress * -7).toFixed(2) + '%');
    });
  }

  /* ------------------------------------------------------------------
     Active section in the nav
     ------------------------------------------------------------------ */
  var navLinks = $$('.nav__link[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

    var sectionIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(byId).forEach(function (id) {
      var sec = doc.getElementById(id);
      if (sec) sectionIO.observe(sec);
    });
  }

  /* ------------------------------------------------------------------
     Quote form → WhatsApp / e-mail
     The factory has no backend, so the form composes a complete, tidy
     enquiry and hands it to WhatsApp (default) or the mail client.
     ------------------------------------------------------------------ */
  var form = $('#quote-form');
  if (form) {
    var T = isAR ? {
      required: 'هذا الحقل مطلوب',
      phone: 'أدخل رقم جوال صحيح',
      title: 'طلب عرض سعر · مصنع روائع الإنتاج للبلاستيك',
      labels: {
        name: 'الاسم', company: 'الجهة / الشركة', phone: 'الجوال', email: 'البريد الإلكتروني',
        product: 'المنتج', size: 'المقاس', thickness: 'السماكة', qty: 'الكمية',
        printing: 'الطباعة', notes: 'ملاحظات'
      },
      none: 'غير محدد',
      sending: 'جارٍ الإرسال…',
      sent: 'وصلنا طلبك، ونتواصل معك قريبًا.',
      failed: 'تعذر إرسال البريد. جرّب مرة ثانية أو استخدم واتساب.'
    } : {
      required: 'This field is required',
      phone: 'Enter a valid phone number',
      title: 'Quote Request · RAWAE AL INTAJ Plastic Factory',
      labels: {
        name: 'Name', company: 'Company', phone: 'Phone', email: 'Email',
        product: 'Product', size: 'Size', thickness: 'Thickness', qty: 'Quantity',
        printing: 'Printing', notes: 'Notes'
      },
      none: 'Not specified',
      sending: 'Sending…',
      sent: 'Your request is in. We’ll get back to you soon.',
      failed: 'We couldn’t send the email. Try again or use WhatsApp.'
    };

    var setError = function (field, msg) {
      var wrap = field.closest('.field');
      if (!wrap) return;
      wrap.classList.toggle('is-invalid', !!msg);
      var err = $('.field__err', wrap);
      if (err) err.textContent = msg || '';
    };

    var validate = function () {
      var ok = true;
      $$('[required]', form).forEach(function (el) {
        var value = el.value.trim();
        if (!value) { setError(el, T.required); ok = false; return; }
        if (el.type === 'tel' && !/^[0-9+()\-\s]{8,20}$/.test(value)) {
          setError(el, T.phone); ok = false; return;
        }
        setError(el, '');
      });
      if (!ok) {
        var first = $('.field.is-invalid input, .field.is-invalid select, .field.is-invalid textarea', form);
        if (first) { first.focus(); }
      }
      return ok;
    };

    $$('input, select, textarea', form).forEach(function (el) {
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('is-invalid')) setError(el, '');
      });
    });

    var get = function (n) {
      var el = form.elements[n];
      if (!el) return '';
      if (el.tagName === 'SELECT') {
        return el.selectedIndex > -1 ? el.options[el.selectedIndex].text.trim() : '';
      }
      return el.value.trim();
    };

    /* Filled-in fields as [label, value] pairs — shared by the WhatsApp text
       and the email payload so both carry exactly the same enquiry. */
    var rows = function () {
      return [
        [T.labels.name,      get('name')],
        [T.labels.company,   get('company')],
        [T.labels.phone,     get('phone')],
        [T.labels.email,     get('email')],
        [T.labels.product,   get('product')],
        [T.labels.size,      get('size')],
        [T.labels.thickness, get('thickness')],
        [T.labels.qty,       get('qty')],
        [T.labels.printing,  get('printing')],
        [T.labels.notes,     get('notes')]
      ].filter(function (r) { return r[1]; });
    };

    var compose = function () {
      var body = rows()
        .map(function (r) { return r[0] + ': ' + r[1]; })
        .join('\n');
      return T.title + '\n\n' + body;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      var wa = form.getAttribute('data-whatsapp');
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(compose()), '_blank', 'noopener');
    });

    /* ---- Email: posted to Web3Forms, which relays it to data-email ---- */
    var mailBtn  = $('#quote-email');
    var statusEl = $('#quote-status');

    var setStatus = function (msg, state) {
      if (!statusEl) return;
      statusEl.textContent = msg || '';
      statusEl.className = 'form__status' + (state ? ' is-' + state : '');
    };

    if (mailBtn) {
      mailBtn.addEventListener('click', function () {
        if (!validate()) return;

        var key = form.getAttribute('data-w3f-key') || '';
        var to  = form.getAttribute('data-email');

        /* No access key pasted in yet — hand off to the visitor's mail app so
           the button still does something. Dead code once the key is set. */
        if (!key || key.indexOf('REPLACE_WITH') === 0) {
          window.location.href = 'mailto:' + to +
            '?subject=' + encodeURIComponent(T.title) +
            '&body=' + encodeURIComponent(compose());
          return;
        }

        var bot = form.elements.botcheck;
        var payload = {
          access_key: key,
          subject: T.title,
          from_name: get('name') || 'rawae-plastic.com',
          botcheck: !!(bot && bot.checked),
          message: compose()
        };
        if (get('email')) payload.replyto = get('email');
        rows().forEach(function (r) { payload[r[0]] = r[1]; });

        mailBtn.disabled = true;
        setStatus(T.sending, 'pending');

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (!data || !data.success) throw new Error(data && data.message);
            setStatus(T.sent, 'ok');
            form.reset();
            $$('.field.is-invalid', form).forEach(function (f) { f.classList.remove('is-invalid'); });
          })
          .catch(function () { setStatus(T.failed, 'err'); })
          .then(function () { mailBtn.disabled = false; });
      });
    }
  }

  /* ------------------------------------------------------------------
     Remember the visitor's language choice
     ------------------------------------------------------------------ */
  try {
    var switcher = $('.lang-switch');
    if (switcher) {
      switcher.addEventListener('click', function () {
        localStorage.setItem('rawae-lang', isAR ? 'en' : 'ar');
      });
    }
  } catch (e) { /* storage blocked — the switch still works as a plain link */ }
})();
