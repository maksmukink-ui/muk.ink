/* ================================================
   INDEX.JS — Квіз та донат (тільки головна)
   ================================================ */

/* ── ДАНІ КВІЗУ ── */
const QUIZ_RESULTS = {
  digital: {
    icon: '📱',
    title: 'Твій шлях — Digital Marketing',
    desc: 'Починай з Фундаменту, потім одразу в Digital трек. SMM, реклама, SEO — це твій напрямок.',
    tracks: [
      { label: 'Фундамент',         color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Digital Marketing',  color: '#00d4aa', href: 'pages/smm-course.html' },
    ],
  },
  trade: {
    icon: '🏪',
    title: 'Твій шлях — Trade Marketing',
    desc: 'Фундамент + Trade Marketing. Додай скіл "Продажі та переговори" — він критичний для цього напрямку.',
    tracks: [
      { label: 'Фундамент',       color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Trade Marketing', color: '#ffd166', href: '#' },
      { label: 'Продажі',         color: '#00d4aa', href: '#' },
    ],
  },
  product: {
    icon: '🚀',
    title: 'Твій шлях — Product Marketing',
    desc: 'Фундамент + Product Marketing. Brand Marketing також рекомендуємо — вони добре доповнюють одне одного.',
    tracks: [
      { label: 'Фундамент',        color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Product Marketing', color: '#f97316', href: '#' },
      { label: 'Brand Marketing',   color: '#ff6b6b', href: '#' },
    ],
  },
  team: {
    icon: '👥',
    title: 'Твій шлях — Управління командою',
    desc: 'Фундамент обов\'язково, потім скіли: Організація команди, Навчання підлеглих, Економіка бізнесу.',
    tracks: [
      { label: 'Фундамент',           color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Організація команди',  color: '#06b6d4', href: '#' },
      { label: 'Економіка бізнесу',   color: '#ffd166', href: '#' },
    ],
  },
  full: {
    icon: '🎯',
    title: 'Твій шлях — Повний маркетолог',
    desc: 'Амбітно! Фундамент → Digital → Brand + бізнес-скіли паралельно. Кілька місяців якісного навчання.',
    tracks: [
      { label: 'Фундамент',    color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Digital',      color: '#00d4aa', href: 'pages/smm-course.html' },
      { label: 'Brand',        color: '#ff6b6b', href: '#' },
      { label: 'Бізнес-скіли', color: '#f97316', href: '#' },
    ],
  },
};

/* ── СТАН ── */
const answers = {};

/* ── QUIZ ── */
function goToStep(step) {
  document.querySelectorAll('.quiz-dot').forEach((dot, i) => {
    dot.classList.toggle('quiz-dot--active', i < step);
  });
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('quiz-step--active'));
  document.getElementById('quizResult').classList.remove('quiz-result--show');

  if (step <= 3) {
    document.getElementById(`step${step}`).classList.add('quiz-step--active');
  } else {
    showResult();
  }
}

function showResult() {
  const result = QUIZ_RESULTS[answers[2]] || QUIZ_RESULTS.full;

  document.getElementById('rIcon').textContent  = result.icon;
  document.getElementById('rTitle').textContent = result.title;
  document.getElementById('rDesc').textContent  = result.desc;

  document.getElementById('rTracks').innerHTML = result.tracks.map(t =>
    `<a href="${t.href}" class="result-track"
       style="border-color:${t.color}55;color:${t.color};background:${t.color}11"
     >${t.label}</a>`
  ).join('');

  const resultEl = document.getElementById('quizResult');
  resultEl.style.display = 'block';
  resultEl.classList.add('quiz-result--show');
}

function initQuiz() {
  /* Вибір опції */
  document.querySelectorAll('.quiz-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const step = Number(opt.dataset.step);
      const val  = opt.dataset.val;
      answers[step] = val;

      document.querySelectorAll(`#step${step} .quiz-opt`)
        .forEach(o => o.classList.remove('quiz-opt--selected'));
      opt.classList.add('quiz-opt--selected');

      setTimeout(() => goToStep(step + 1), 280);
    });
  });

  /* Кнопки "Назад" */
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(Number(btn.dataset.back) - 1));
  });

  /* Скинути квіз */
  document.getElementById('quizReset')?.addEventListener('click', () => {
    Object.keys(answers).forEach(k => delete answers[k]);
    document.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('quiz-opt--selected'));
    document.getElementById('quizResult').style.display = 'none';
    goToStep(1);
  });
}

/* ── DONATE ── */
function initDonate() {
  const input   = document.getElementById('donateAmt');
  const sendBtn = document.getElementById('donateSend');

  document.querySelectorAll('.donate-amt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.donate-amt').forEach(b => b.classList.remove('donate-amt--active'));
      btn.classList.add('donate-amt--active');
      if (input) input.value = btn.dataset.amount;
    });
  });

  sendBtn?.addEventListener('click', () => {
    const amount = input?.value;
    if (!amount || Number(amount) < 1) return;
    alert(`Дякуємо за підтримку ${amount}₴! 💙\nСистема оплати — незабаром.`);
  });
}

/* ── СТАРТ ── */
document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  initDonate();
});




/* ================================================
   ROLES-MAP.JS — Карта позицій маркетолога
   Підключати на сторінках де є #roleModal
   ================================================ */

function initRolesMap() {
  const modal        = document.getElementById('roleModal');
  const modalBody    = document.getElementById('roleModalBody');
  const modalClose   = document.getElementById('roleModalClose');
  const modalBackdrop = document.getElementById('roleModalBackdrop');

  if (!modal) return;

  /* ── Відкрити модальне і запитати Claude ── */
  document.querySelectorAll('.role-card[data-prompt]').forEach(card => {
    card.addEventListener('click', async () => {
      const prompt = card.dataset.prompt;
      if (!prompt) return;

      openModal();
      showLoading();

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                content: prompt + '\n\nДай структуровану відповідь українською: обов\'язки (5-7 пунктів), ключові навички, типові KPI, орієнтовна зарплата в Україні. Коротко і по суті.'
              }
            ]
          })
        });

        const data = await response.json();
        const text = data.content?.find(b => b.type === 'text')?.text || 'Помилка отримання відповіді.';
        showContent(text);

      } catch (err) {
        showContent('Помилка з\'єднання. Спробуй ще раз.');
        console.error(err);
      }
    });
  });

  /* ── Закрити ── */
  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ── Helpers ── */
  function openModal()  { modal.classList.add('role-modal--open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('role-modal--open'); document.body.style.overflow = ''; }

  function showLoading() {
    modalBody.innerHTML = `
      <div class="role-modal__loading">
        <div class="role-modal__spinner"></div>
        <span>Завантаження...</span>
      </div>`;
  }

  function showContent(text) {
    /* Базове форматування: ** жирний **, списки */
    const html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^[-•]\s(.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, (line) => line.startsWith('<') ? line : `<p>${line}</p>`);

    modalBody.innerHTML = html;
  }
}

/* ── Старт ── */
document.addEventListener('DOMContentLoaded', initRolesMap);




/* ================================================
   ROLES-POPUP.JS — Логіка попапів детальних ролей
   ================================================ */

function initRolesPopup() {

  /* ── Відкрити попап ── */
  document.querySelectorAll('[data-popup]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.popup;
      const popup = document.getElementById(`popup-${id}`);
      if (!popup) return;
      popup.classList.add('popup--open');
      document.body.style.overflow = 'hidden';
    });
  });

  /* ── Закрити попап ── */
  document.querySelectorAll('[data-close-popup]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.closePopup;
      const popup = document.getElementById(`popup-${id}`);
      if (!popup) return;
      popup.classList.remove('popup--open');
      document.body.style.overflow = '';
    });
  });

  /* ── Закрити по Escape ── */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.popup--open').forEach(popup => {
      popup.classList.remove('popup--open');
      document.body.style.overflow = '';
    });
  });

  /* ── KPI кнопки в попапах → Claude API ── */
  document.querySelectorAll('.popup .popup__ask-btn[data-prompt]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const prompt = btn.dataset.prompt;
      if (!prompt) return;

      const originalText = btn.textContent;
      btn.textContent = 'Завантаження...';
      btn.disabled = true;

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{
              role: 'user',
              content: prompt + '\n\nПоясни коротко і по суті, українською мовою. До 200 слів.'
            }]
          })
        });

        const data = await response.json();
        const text = data.content?.find(b => b.type === 'text')?.text || 'Помилка отримання відповіді.';

        showAnswer(btn, text);

      } catch (err) {
        showAnswer(btn, 'Помилка з\'єднання. Спробуй ще раз.');
        console.error(err);
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  });
}

/* ── Показати відповідь під кнопкою ── */
function showAnswer(btn, text) {
  const existing = btn.parentElement.querySelector('.popup-answer');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.className = 'popup-answer';
  div.style.cssText = [
    'background:var(--surface2)',
    'border:1px solid var(--border)',
    'border-radius:var(--r-md)',
    'padding:12px 14px',
    'font-size:13px',
    'color:var(--muted)',
    'line-height:1.65',
    'margin-top:8px',
    'white-space:pre-wrap'
  ].join(';');
  div.textContent = text;

  btn.parentElement.insertBefore(div, btn.nextSibling);
}

document.addEventListener('DOMContentLoaded', initRolesPopup);