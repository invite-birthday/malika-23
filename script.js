(function () {
  var cfg = window.INVITE;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  document.title = cfg.pageTitle;

  // ---------- Рисованный декор ----------
  var ICONS = {
    bow: '<svg viewBox="0 0 100 120" fill="none" stroke="#c4505c" stroke-width="2.6" stroke-linecap="round">' +
      '<path d="M50 30C32 4 4 8 8 27c3 15 28 11 42 3z"/><path d="M50 30C68 4 96 8 92 27c-3 15-28 11-42 3z"/>' +
      '<path d="M50 30c-6 26-9 50-14 82"/><path d="M50 30c8 24 12 48 21 74"/></svg>',
    spark: '<svg viewBox="-2 -2 24 24" fill="none" stroke="#6b5e55" stroke-width="1.4" stroke-linejoin="round">' +
      '<path d="M10 0c1 7 3 9 10 10-7 1-9 3-10 10-1-7-3-9-10-10 7-1 9-3 10-10z"/></svg>',
    hat: '<svg viewBox="0 0 100 110"><path d="M50 12L12 100h76z" fill="#c8201f"/>' +
      '<path d="M39 38l22 0M31 56l38 0M23 75l54 0M16 92l68 0" stroke="#8e1414" stroke-width="5"/>' +
      '<circle cx="50" cy="10" r="9" fill="#8e1414"/></svg>',
    cake: '<svg viewBox="0 0 220 215" fill="#f7f3ea" stroke="#222" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">' +
      '<path d="M15 180c0-9 190-9 190 0s-42 14-95 14-95-5-95-14z"/>' +
      '<path d="M25 118v58c0 8 38 13 85 13s85-5 85-13v-58z"/>' +
      '<path d="M25 120c0-9 38-15 85-15s85 6 85 15c0 14-10 18-14 8s-13-9-16 2-13 12-17 1-12-10-15 4-14 12-17-1-12-9-16 3-14 10-17-2-12-8-15 2-13 9-16-3-12-7-12-15z"/>' +
      '<path d="M50 72v40c0 7 27 11 60 11s60-4 60-11V72z"/>' +
      '<path d="M50 73c0-8 27-13 60-13s60 5 60 13c0 12-9 15-12 6s-11-7-14 3-12 9-15-2-11-8-14 4-12 9-15-3-11-6-14 2-12 8-14-2-12-6-12-11z"/>' +
      '<path d="M88 14l8 0 0 52-8 0zM126 10l8 0 0 54-8 0z"/>' +
      '<path d="M88 24l8-6M88 36l8-6M88 48l8-6M88 60l8-6M126 22l8-6M126 34l8-6M126 46l8-6M126 58l8-6" stroke-width="1.6"/>' +
      '<path d="M92 13c-5-6 0-10 0-13 3 4 5 8 0 13zM130 9c-5-6 0-10 0-13 3 4 5 8 0 13z"/>' +
      '<g fill="none" stroke="#c4505c" stroke-width="3"><path d="M110 132c-14-18-34-14-31-2 2 10 20 8 31 2z"/>' +
      '<path d="M110 132c14-18 34-14 31-2-2 10-20 8-31 2z"/><path d="M110 132c-4 18-6 32-9 52"/><path d="M110 132c6 16 9 30 15 46"/></g></svg>',
    disco: '<svg viewBox="0 0 120 130" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round">' +
      '<path d="M60 2v24"/><circle cx="60" cy="72" r="44" fill="#f7f3ea"/>' +
      '<path d="M20 54h80M16 72h88M20 90h80M32 106h56M30 40h60"/>' +
      '<path d="M60 28c-22 12-22 76 0 88M60 28c22 12 22 76 0 88M60 28v88M42 32c-34 20-28 70 0 80M78 32c34 20 28 70 0 80"/>' +
      '<path d="M8 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3zM108 100l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#222" stroke="none"/></svg>',
    ring: '<svg viewBox="0 0 100 100" fill="none" stroke="#6a1a1a" stroke-width="1"><ellipse cx="50" cy="50" rx="44" ry="42"/>' +
      '<ellipse cx="51" cy="49" rx="41" ry="45" transform="rotate(25 50 50)"/><ellipse cx="49" cy="51" rx="46" ry="40" transform="rotate(-20 50 50)"/></svg>',
  };
  Object.keys(ICONS).forEach(function (name) {
    $$('.deco.' + name).forEach(function (el) { el.innerHTML = ICONS[name]; });
  });

  // ---------- Тексты ----------
  $$('[data-text]').forEach(function (el) { el.textContent = cfg[el.dataset.text]; });
  $$('[data-lines]').forEach(function (el) {
    cfg[el.dataset.lines].forEach(function (line, i) {
      if (i) el.appendChild(document.createElement('br'));
      el.appendChild(document.createTextNode(line));
    });
  });
  $$('[data-paras]').forEach(function (el) {
    cfg[el.dataset.paras].forEach(function (t) {
      var p = document.createElement('p');
      p.textContent = t;
      el.appendChild(p);
    });
  });

  // ---------- Фото ----------
  // фото задаётся строкой или объектом { src, pos, zoom }
  function setPhoto(img, photo) {
    var src = photo.src || photo;
    if (photo.pos) { img.style.objectPosition = photo.pos; img.style.transformOrigin = photo.pos; }
    if (photo.zoom) img.style.transform = 'scale(' + photo.zoom + ')';
    img.onerror = function () {
      img.parentNode.classList.add('missing');
      img.parentNode.dataset.file = src;
    };
    img.src = src;
  }
  $$('[data-photo]').forEach(function (img) { setPhoto(img, cfg.photos[img.dataset.photo]); });
  $('#strip').parentNode.style.setProperty('--n', cfg.photos.strip.length);
  cfg.photos.strip.forEach(function (src) {
    var box = document.createElement('div');
    box.className = 'ph';
    var img = document.createElement('img');
    img.alt = '';
    box.appendChild(img);
    $('#strip').appendChild(box);
    setPhoto(img, src);
  });

  // ---------- Дата, календарь, отсчёт ----------
  var date = new Date(cfg.date);
  $('#dateLine').textContent = cap(date.toLocaleDateString(cfg.locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace(/\s*г\.$/, ''));
  $('#shortDate').textContent = date.getDate() + '.' + (date.getMonth() + 1) + '.' + String(date.getFullYear()).slice(2);

  [-1, 0, 1].forEach(function (shift) {
    var d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + shift);
    var cell = document.createElement('div');
    cell.innerHTML = '<div class="cal-day"></div><div class="cal-num"></div>';
    cell.firstChild.textContent = cap(d.toLocaleDateString(cfg.locale, { weekday: 'long' }));
    cell.lastChild.textContent = d.getDate();
    if (shift === 0) {
      cell.lastChild.insertAdjacentHTML('beforeend', '<span class="ring">' + ICONS.ring + '</span><span class="dday"></span>');
      cell.querySelector('.dday').textContent = cfg.dDay;
    }
    $('#calendar').appendChild(cell);
  });

  var cd = $('#countdown');
  cfg.countdownLabels.forEach(function (label, i) {
    if (i) cd.insertAdjacentHTML('beforeend', '<i>:</i>');
    var box = document.createElement('div');
    box.innerHTML = '<b>0</b><small></small>';
    box.lastChild.textContent = label;
    cd.appendChild(box);
  });
  var nums = cd.querySelectorAll('b');
  function tick() {
    var s = Math.max(0, Math.floor((date - Date.now()) / 1000));
    nums[0].textContent = Math.floor(s / 86400);
    nums[1].textContent = pad(Math.floor(s / 3600) % 24);
    nums[2].textContent = pad(Math.floor(s / 60) % 60);
    nums[3].textContent = pad(s % 60);
  }
  tick();
  setInterval(tick, 1000);

  // ---------- Карта и RSVP ----------
  $('#map').href = cfg.mapUrl;
  var rsvpLink = function (answer) {
    var text = encodeURIComponent(answer + ' — ' + cfg.name + ', ' + $('#dateLine').textContent);
    if (cfg.rsvp.whatsapp) return 'https://wa.me/' + cfg.rsvp.whatsapp + '?text=' + text;
    return 'https://t.me/' + cfg.rsvp.telegram + '?text=' + text;
  };
  if (cfg.rsvp.whatsapp || cfg.rsvp.telegram) {
    $('#rsvp').hidden = false;
    $('#rsvpDate').textContent = $('#dateLine').textContent + ', ' + cfg.timeNote;
    $('#rsvpYes').href = rsvpLink(cfg.rsvpYes);
    $('#rsvpNo').href = rsvpLink(cfg.rsvpNo);
  }

  // ---------- Музыка ----------
  var audio = $('#audio');
  var fmt = function (t) { return isFinite(t) ? pad(Math.floor(t / 60)) + ':' + pad(Math.floor(t % 60)) : '00:00'; };
  var setIcon = function () {
    $('#playIcon').setAttribute('d', audio.paused ? 'M6 4l15 8-15 8z' : 'M6 4h4v16H6zM14 4h4v16h-4z');
  };
  audio.addEventListener('error', function () { $('#musicHint').textContent = 'Добавьте файл ' + cfg.music; });
  audio.addEventListener('loadedmetadata', function () { $('#tDur').textContent = fmt(audio.duration); });
  audio.addEventListener('timeupdate', function () {
    $('#tCur').textContent = fmt(audio.currentTime);
    $('#barFill').style.width = (audio.currentTime / audio.duration * 100 || 0) + '%';
  });
  audio.addEventListener('play', setIcon);
  audio.addEventListener('pause', setIcon);
  audio.src = cfg.music;
  $('#play').onclick = function () { audio.paused ? audio.play().catch(function () {}) : audio.pause(); };
  $('#back').onclick = function () { audio.currentTime = Math.max(0, audio.currentTime - 10); };
  $('#fwd').onclick = function () { audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10); };
  $('#bar').onclick = function (e) {
    var r = this.getBoundingClientRect();
    if (audio.duration) audio.currentTime = (e.clientX - r.left) / r.width * audio.duration;
  };

  // ---------- Появление при прокрутке ----------
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });

  // ---------- Открытие приглашения ----------
  function openInvite() {
    $('#cover').classList.add('gone');
    document.body.classList.remove('locked');
    $$('.reveal').forEach(function (el) { io.observe(el); });
    audio.play().catch(function () {});
  }
  $('#open').onclick = openInvite;
  // ссылка вида index.html#open сразу показывает само приглашение
  if (location.hash === '#open') openInvite();
})();
