/* ================================================
   INDEX.JS — Логіка квізу на головній сторінці
   ================================================ */

const answers = {};

const results = {
  digital: {
    icon: '📱',
    title: 'Твій шлях — Digital Marketing',
    desc: 'Починай з Фундаменту, потім одразу в Digital трек. SMM, реклама, SEO — це твій напрямок.',
    tracks: [
      { label: 'Фундамент', color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Digital Marketing', color: '#00d4aa', href: 'pages/smm-course.html' },
    ]
  },
  trade: {
    icon: '🏪',
    title: 'Твій шлях — Trade Marketing',
    desc: 'Фундамент + Trade Marketing трек. Додай скіл "Продажі та переговори" — він критичний для цього напрямку.',
    tracks: [
      { label: 'Фундамент', color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Trade Marketing', color: '#ffd166', href: '#' },
      { label: 'Продажі', color: '#00d4aa', href: '#' },
    ]
  },
  product: {
    icon: '🚀',
    title: 'Твій шлях — Product Marketing',
    desc: 'Фундамент + Product Marketing. Також рекомендуємо Brand Marketing — вони добре доповнюють одне одного.',
    tracks: [
      { label: 'Фундамент', color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Product Marketing', color: '#f97316', href: '#' },
      { label: 'Brand Marketing', color: '#ff6b6b', href: '#' },
    ]
  },
  team: {
    icon: '👥',
    title: 'Твій шлях — Управління командою',
    desc: 'Фундамент обов\'язково, потім скіли: Організація команди, Навчання, Економіка бізнесу.',
    tracks: [
      { label: 'Фундамент', color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Організація команди', color: '#06b6d4', href: '#' },
      { label: 'Економіка бізнесу', color: '#ffd166', href: '#' },
    ]
  },
  full: {
    icon: '🎯',
    title: 'Твій шлях — Повний маркетолог',
    desc: 'Амбітно! Фундамент → Digital → Brand + бізнес-скіли паралельно. Кілька місяців якісного навчання.',
    tracks: [
      { label: 'Фундамент', color: '#7c6bff', href: 'pages/foundation.html' },
      { label: 'Digital', color: '#00d4aa', href: 'pages/smm-course.html' },
      { label: 'Brand', color: '#ff6b6b', href: '#' },
      { label: 'Бізнес-скіли', color: '#f97316', href: '#' },
    ]
  },
};

/* --- Вибір опції --- */
function selectOpt(step, value) {
  answers[step] = value;

  // Підсвічуємо вибрану опцію
  document.querySelectorAll(`#step${step} .quiz-opt`).forEach(o => o.classList.remove('selected'));
  event.currentTarget.classList.add('selected');

  // Переходимо далі з затримкою
  setTimeout(() => goToStep(step + 1), 280);
}

/* --- Перехід між кроками --- */
function goToStep(step) {
  // Оновлюємо прогрес-бар
  document.querySelectorAll('.quiz-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i < step);
  });

  // Ховаємо всі кроки
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('quizResult').style.display = 'none';

  if (step <= 3) {
    document.getElementById(`step${step}`).classList.add('active');
  } else {
    showResult();
  }
}

/* --- Назад --- */
function goBack(currentStep) {
  goToStep(currentStep - 1);
}

/* --- Показати результат --- */
function showResult() {
  const need   = answers[2] || 'full';
  const result = results[need] || results.full;

  document.getElementById('rIcon').textContent  = result.icon;
  document.getElementById('rTitle').textContent = result.title;
  document.getElementById('rDesc').textContent  = result.desc;

  const tracksEl = document.getElementById('rTracks');
  tracksEl.innerHTML = result.tracks.map(t =>
    `<a href="${t.href}" class="result-track" style="border-color:${t.color}44;color:${t.color};background:${t.color}11;text-decoration:none">${t.label}</a>`
  ).join('');

  document.getElementById('quizResult').style.display = 'block';
}

/* --- Скинути квіз --- */
function resetQuiz() {
  Object.keys(answers).forEach(k => delete answers[k]);
  document.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
  document.getElementById('quizResult').style.display = 'none';
  goToStep(1);
}

/* ================================================
   ДОНАТ — ЛОГІКА
   ================================================ */
function setAmt(btn, amount) {
  document.getElementById('donateAmt').value = amount;
  document.querySelectorAll('.donate-amt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function handleDonate() {
  const amount = document.getElementById('donateAmt').value;
  if (!amount || amount < 1) return;
  // Тут буде підключення платіжної системи
  alert(`Дякуємо за підтримку ${amount}₴! 💙\nСистема оплати — незабаром.`);
}
