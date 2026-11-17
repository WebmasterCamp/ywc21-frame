/* @ds-bundle: {"format":4,"namespace":"YWC21","components":[{"name":"SectionHeading"},{"name":"Button"},{"name":"ParchmentCard"},{"name":"MajorTile"},{"name":"ScriptMarquee"},{"name":"DiamondDots"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  function SectionHeading(p) {
    return h('header', { className: cx('ywc-heading', p.align === 'start' && 'ywc-heading--start', p.className) },
      h('h2', { className: 'ywc-heading__th' }, p.th),
      p.en ? h('span', { className: 'ywc-heading__en' }, p.en) : null,
      p.description ? h('p', { className: 'ywc-heading__desc' }, p.description) : null);
  }

  function Button(p) {
    var variant = p.variant || 'primary';
    return h('button', { type: p.type || 'button', className: cx('ywc-btn', 'ywc-btn--' + variant, p.className), disabled: p.disabled, onClick: p.onClick }, p.children);
  }

  function ParchmentCard(p) {
    var raw = React.useId ? React.useId() : String(Math.random());
    var id = 'ywc-torn-' + raw.replace(/[^A-Za-z0-9_-]/g, '');
    var seed = p.seed != null ? p.seed : 7;
    return h('article', { className: cx('ywc-parchment', p.className), style: p.width ? { width: p.width } : undefined },
      h('svg', { width: 0, height: 0, style: { position: 'absolute' }, 'aria-hidden': true },
        h('filter', { id: id },
          h('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.045', numOctaves: 2, seed: seed, result: 'noise' }),
          h('feDisplacementMap', { in: 'SourceGraphic', in2: 'noise', scale: 7 }))),
      h('div', { className: 'ywc-parchment__paper', style: { filter: 'url(#' + id + ')' } }),
      h('div', { className: 'ywc-parchment__body' },
        p.number != null ? h('div', { className: 'ywc-parchment__num' }, p.number) : null,
        p.title ? h('h3', { className: 'ywc-parchment__title' }, p.title) : null,
        typeof p.children === 'string' ? h('p', { className: 'ywc-parchment__text' }, p.children) : p.children));
  }

  function MajorTile(p) {
    return h('button', { type: 'button', className: cx('ywc-major', p.className), 'aria-pressed': p.selected ? 'true' : 'false', onClick: p.onClick },
      h('span', { className: 'ywc-major__th' }, p.th),
      p.en ? h('span', { className: 'ywc-major__en' }, p.en) : null);
  }

  var DEFAULT_WORDS = ['HOMO', '人間', '사람', 'ἄνθρωπος', 'انسان', 'Human', '人類', 'มนุษย์'];
  function ScriptMarquee(p) {
    var words = p.words || DEFAULT_WORDS;
    var loop = words.concat(words, words, words);
    var style = p.duration ? { '--ywc-marquee-dur': p.duration + 's' } : undefined;
    return h('div', { className: cx('ywc-marquee', p.reverse && 'ywc-marquee--reverse', p.className), style: style, 'aria-label': p.label || 'มนุษย์ในหลายภาษา', role: 'marquee' },
      h('div', { className: 'ywc-marquee__track', 'aria-hidden': true },
        loop.map(function (w, i) { return h('span', { key: i, className: 'ywc-marquee__word' }, w); })));
  }

  function DiamondDots(p) {
    var count = p.count || 5;
    var items = [];
    for (var i = 0; i < count; i++) {
      (function (i) {
        items.push(h('button', { key: i, type: 'button', className: 'ywc-dots__dot', 'aria-label': 'สไลด์ ' + (i + 1), 'aria-current': i === p.active ? 'true' : undefined, onClick: function () { if (p.onChange) p.onChange(i); } }));
      })(i);
    }
    return h('nav', { className: cx('ywc-dots', p.className), 'aria-label': p.label || 'เลือกสไลด์' }, items);
  }

  window.YWC21 = { SectionHeading: SectionHeading, Button: Button, ParchmentCard: ParchmentCard, MajorTile: MajorTile, ScriptMarquee: ScriptMarquee, DiamondDots: DiamondDots };
})();
