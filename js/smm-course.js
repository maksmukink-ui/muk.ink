/* ================================================
   SMM-COURSE.JS — Логіка SMM курсу
   Модулі, флеш-картки, словник
   ================================================ */

/* ================================================
   ДАНІ — ФЛЕШ-КАРТКИ
   ================================================ */
const FLASHCARDS = [
  { m:'1', c:'#7c6bff', q:'Що таке S.M.A.R.T. ціль?', a:'Specific, Measurable, Attainable, Relevant, Timely — конкретна, вимірювана, досяжна, релевантна, часова.' },
  { m:'1', c:'#7c6bff', q:'Як часто проводити соціальний аудит?', a:'Щоквартально або раз на рік. Раз на 2–3 роки — занадто рідко!' },
  { m:'1', c:'#7c6bff', q:'Скільки організаційних моделей SMM?', a:'П\'ять: Centralized, Distributed, Dandelion, Hub & Spoke. "Holistic" — НЕ є стандартним типом!' },
  { m:'1', c:'#7c6bff', q:'На яких етапах Inbound використовується контент?', a:'На ВСІХ трьох: Attract, Engage, Delight — а не лише на двох!' },
  { m:'1', c:'#7c6bff', q:'Яка перевага стратегії є хибною?', a:'"Надсилати кращі email" — соцмережі ніяк не впливають на якість email-розсилок.' },
  { m:'1', c:'#7c6bff', q:'Як часто переглядати KPI?', a:'Щоквартально або раз на рік. НЕ раз на 18 місяців!' },
  { m:'2', c:'#00d4aa', q:'Що означає правило 80/20?', a:'80% — корисний контент. 20% — рекламний. Аудиторія не приходить за рекламою!' },
  { m:'2', c:'#00d4aa', q:'Яка платформа має найдовший термін життя контенту?', a:'Pinterest — 3–4 місяці, бо працює як пошукова система.' },
  { m:'2', c:'#00d4aa', q:'Де публікувати найчастіше?', a:'Twitter/X — контент живе лише 18 хвилин.' },
  { m:'2', c:'#00d4aa', q:'Що таке ephemeral stories?', a:'Фото/відео з фільтрами та стікерами, що зникає через 24 години. Instagram, Snapchat.' },
  { m:'2', c:'#00d4aa', q:'Що таке Real-time marketing?', a:'Контент на ходу для подій — онлайн АБО офлайн. Не тільки онлайн!' },
  { m:'2', c:'#00d4aa', q:'Що таке curated content?', a:'Підбір ЧУЖОГО контенту з посиланням на джерело. НЕ плагіат.' },
  { m:'2', c:'#00d4aa', q:'Для чого хештеги?', a:'Пошук, відстеження кампаній, стимулювання UGC. Hijacking нерелевантних = СПАМ!' },
  { m:'3', c:'#ffd166', q:'Формула ROI?', a:'(Чистий дохід − Витрати) ÷ Витрати × 100. Враховуй ВСІ витрати!' },
  { m:'3', c:'#ffd166', q:'Що таке vanity metric?', a:'Метрика що виглядає добре але не = бізнес-результат. Приклад: лайки, підписники.' },
  { m:'3', c:'#ffd166', q:'Що цікавить топ-менеджерів?', a:'Sentiment, Competitive advantage, Customer satisfaction. НЕ CTR, НЕ кількість підписників.' },
  { m:'3', c:'#ffd166', q:'Для чого UTM-параметри?', a:'Відстеження ЗВІДКИ приходить трафік із соцмереж: source / medium / campaign.' },
  { m:'3', c:'#ffd166', q:'Які KPI демонструють engagement?', a:'Mentions, Sharing & Retweets, Likes/Favorites. НЕ прямий дохід.' },
  { m:'3', c:'#ffd166', q:'Різниця між Reach та Engagement?', a:'Reach = скільки ПОБАЧИЛИ. Engagement = скільки ВІДРЕАГУВАЛИ.' },
  { m:'4', c:'#ff6b6b', q:'Різниця між Listening та Monitoring?', a:'Monitoring = тактика (реагуємо на пости). Listening = стратегія (аналіз репутації).' },
  { m:'4', c:'#ff6b6b', q:'Як Listening допомагає знаходити ліди?', a:'Моніторинг скарг на конкурентів та питань у ніші — знаходимо зацікавлених людей.' },
  { m:'4', c:'#ff6b6b', q:'Як збільшити customer advocacy?', a:'Відповідати на ВСІ пости — і позитивні, і негативні.' },
  { m:'4', c:'#ff6b6b', q:'Чи варто надсилати шаблонні повідомлення?', a:'FALSE! Canned messages виглядають як спам і знижують довіру.' },
  { m:'5', c:'#06b6d4', q:'Три фактори впливу інфлюенсера (3R)?', a:'Reach, Relevance, Resonance. "Recognition" — НЕ входить!' },
  { m:'5', c:'#06b6d4', q:'Які типи інфлюенсерів існують?', a:'Industry, Content creator, Local, Celebrity. "Attorney" — НЕ тип інфлюенсера!' },
  { m:'5', c:'#06b6d4', q:'Що таке Social selling інбаунд-способом?', a:'Надавати цінність через корисний контент та відповіді на питання. НЕ холодні DM!' },
  { m:'5', c:'#06b6d4', q:'Коли робити pitch?', a:'Після достатнього rapport І коли клієнт сам шукає рішення.' },
  { m:'5', c:'#06b6d4', q:'Що каже Simon Sinek?', a:'"People don\'t buy WHAT you do — they buy WHY you do it."' },
  { m:'5', c:'#06b6d4', q:'Що таке Mirroring?', a:'Копіювання манери мовлення клієнта для побудови rapport та близькості.' },
  { m:'6', c:'#f97316', q:'4 етапи кризи в SMM?', a:'Preparation → Crisis → Response → Recovery.' },
  { m:'6', c:'#f97316', q:'На якому етапі створюються Message maps?', a:'PREPARATION — заздалегідь до кризи.' },
  { m:'6', c:'#f97316', q:'На якому етапі оцінюється команда та KPI?', a:'RECOVERY — після кризи. НЕ під час Response!' },
  { m:'6', c:'#f97316', q:'Що НЕ треба робити під час кризи?', a:'Надсилати рекламні пости. Виглядає безтактно і шкодить репутації.' },
  { m:'6', c:'#f97316', q:'Що робити якщо конкурент помилився публічно?', a:'Виявляти емпатію та відповідати вдумливо. Ніколи не атакуй публічно!' },
  { m:'7', c:'#a3e635', q:'Різниця між Voice та Tone?', a:'Voice = стабільна особистість (не змінюється). Tone = змінюється по ситуації та каналу.' },
  { m:'7', c:'#a3e635', q:'Що таке Earned media?', a:'Охоплення зароблене ОРГАНІЧНО: відгуки, репости, PR. НЕ те за що платиш!' },
  { m:'7', c:'#a3e635', q:'Facebook Ads vs Google Ads?', a:'Facebook = таргетинг за інтересами/демографією. Google = пошукові наміри.' },
  { m:'7', c:'#a3e635', q:'Яка фраза НЕ є активним CTA?', a:'"More here" — не є дієсловом. Правильні: Subscribe, Watch, Donate.' },
  { m:'7', c:'#a3e635', q:'Що спричиняє Ad Fatigue?', a:'Одна картинка >місяця, одна платформа, один оффер >2 місяців.' },
  { m:'7', c:'#a3e635', q:'Чому humanizing brand дає перевагу?', a:'Люди вкладають гроші в тих з ким себе ідентифікують.' },
];

/* ================================================
   ДАНІ — СЛОВНИК
   ================================================ */
const GLOSSARY = [
  {
    m:'1', title:'Стратегія та основи', color:'#7c6bff',
    terms: [
      { name:'S.M.A.R.T. цілі', def:'Specific, Measurable, Attainable, Relevant, Timely — фреймворк для постановки чітких цілей.', tag:'Планування' },
      { name:'Buyer Persona', def:'Детальний портрет ідеального клієнта: вік, болі, бажання, платформи.', tag:'Аудиторія' },
      { name:'Соціальний аудит', def:'Систематичний аналіз всіх соціальних акаунтів бренду. Проводити щоквартально.', tag:'Аналіз' },
      { name:'Inbound методологія', def:'Attract → Engage → Delight. Соцмережі задіяні на всіх трьох етапах.', tag:'Стратегія' },
      { name:'Social Media Policy', def:'Документ з правилами та найкращими практиками для співробітників у соцмережах.', tag:'Документ' },
    ]
  },
  {
    m:'2', title:'Контент та платформи', color:'#00d4aa',
    terms: [
      { name:'Правило 80/20', def:'80% контенту — корисний, 20% — рекламний. Золотий стандарт.', tag:'Контент' },
      { name:'Curated content', def:'Підбір ЧУЖОГО контенту з посиланням. НЕ плагіат — показує цінність аудиторії.', tag:'Контент' },
      { name:'Ephemeral content', def:'Контент що зникає через 1–24 години. Instagram Stories, Snapchat.', tag:'Формат' },
      { name:'Real-time marketing', def:'Контент на ходу у відповідь на поточні події — онлайн або офлайн.', tag:'Стратегія' },
      { name:'UGC', def:'User-Generated Content — контент від користувачів. Підвищує довіру, SEO, спільноту.', tag:'Контент' },
      { name:'Hashtag hijacking', def:'Неетичне використання нерелевантних хештегів для просування. Вважається спамом.', tag:'Помилки' },
    ]
  },
  {
    m:'3', title:'Аналітика та ROI', color:'#ffd166',
    terms: [
      { name:'ROI', def:'Return on Investment. Формула: (Дохід − Витрати) ÷ Витрати × 100.', tag:'Метрика' },
      { name:'Vanity metric', def:'Метрика що виглядає вражаюче але не відображає бізнес-результату. Лайки, підписники.', tag:'Метрика' },
      { name:'Reach', def:'Кількість унікальних людей що побачили контент.', tag:'Метрика' },
      { name:'Engagement Rate', def:'ER% = Engagement ÷ Reach × 100. Відсоток залученості.', tag:'Метрика' },
      { name:'UTM-параметри', def:'Теги в URL для відстеження джерел трафіку: utm_source, utm_medium, utm_campaign.', tag:'Інструмент' },
      { name:'KPI', def:'Key Performance Indicators. Ключові показники ефективності. Переглядати щоквартально.', tag:'Планування' },
    ]
  },
  {
    m:'4', title:'Соціальне прослуховування', color:'#ff6b6b',
    terms: [
      { name:'Social Listening', def:'Стратегічний аналіз репутації та трендів з вищого рівня.', tag:'Стратегія' },
      { name:'Social Monitoring', def:'Тактичне відстеження та реагування на конкретні згадки.', tag:'Тактика' },
      { name:'Customer Advocacy', def:'Коли клієнти самі рекомендують бренд. Будується відповіддю на ВСІ пости.', tag:'Лояльність' },
      { name:'Sentiment', def:'Загальний настрій аудиторії: позитивний, нейтральний, негативний.', tag:'Метрика' },
      { name:'Canned messages', def:'Шаблонні повідомлення що надсилаються масово. Виглядають як спам.', tag:'Помилки' },
    ]
  },
  {
    m:'5', title:'Інфлюенсери та продажі', color:'#06b6d4',
    terms: [
      { name:'3R інфлюенсера', def:'Reach, Relevance, Resonance — три фактори впливу на поведінку аудиторії.', tag:'Фреймворк' },
      { name:'Social Selling', def:'Продажі через соцмережі шляхом надання цінності та побудови стосунків.', tag:'Продажі' },
      { name:'Rapport', def:'Довірливі стосунки між продавцем та клієнтом. Основа для успішного pitch.', tag:'Продажі' },
      { name:'Mirroring', def:'Техніка копіювання манери мовлення клієнта для створення близькості.', tag:'Техніка' },
      { name:'Golden Circle', def:'Концепція Simon Sinek: WHY → HOW → WHAT. Люди купують WHY.', tag:'Концепція' },
    ]
  },
  {
    m:'6', title:'Кризовий менеджмент', color:'#f97316',
    terms: [
      { name:'Preparation', def:'Перший етап: Message maps, listening protocols, кризовий план — ДО кризи.', tag:'Етап' },
      { name:'Crisis', def:'Другий етап: виявлення та оцінка ситуації.', tag:'Етап' },
      { name:'Response', def:'Третій етап: активна комунікація та вирішення.', tag:'Етап' },
      { name:'Recovery', def:'Четвертий етап: аналіз KPI, оцінка команди, висновки.', tag:'Етап' },
      { name:'Message maps', def:'Заздалегідь підготовлені шаблони відповідей для кризових сценаріїв.', tag:'Інструмент' },
    ]
  },
  {
    m:'7', title:'Бренд, тон та реклама', color:'#a3e635',
    terms: [
      { name:'Voice', def:'Стабільна особистість бренду що НЕ змінюється. Хто ви є.', tag:'Бренд' },
      { name:'Tone', def:'Настрій конкретного контенту що ЗМІНЮЄТЬСЯ залежно від ситуації.', tag:'Бренд' },
      { name:'Paid media', def:'Охоплення за яке платиш: реклама, промоції, спонсорство.', tag:'Медіа' },
      { name:'Owned media', def:'Канали якими володієш: сайт, блог, офіційні сторінки.', tag:'Медіа' },
      { name:'Earned media', def:'Охоплення зароблене ОРГАНІЧНО: відгуки, репости, PR.', tag:'Медіа' },
      { name:'CTA', def:'Call-to-Action. Активні дієслова: Subscribe, Watch, Donate. "More here" — НЕ CTA!', tag:'Контент' },
      { name:'Ad Fatigue', def:'Рекламна втома від повторюваного контенту. Оновлюй креативи регулярно.', tag:'Реклама' },
    ]
  },
];

/* ================================================
   ФЛЕШ-КАРТКИ — ЛОГІКА
   ================================================ */
let currentCards = [...FLASHCARDS];

function renderCards(cards) {
  const grid = document.getElementById('fc-grid');
  if (!grid) return;

  const countEl = document.getElementById('fc-count');
  if (countEl) countEl.textContent = `Показано: ${cards.length} карток`;

  grid.innerHTML = '';
  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'fc-card';
    div.innerHTML = `
      <div class="fc-inner">
        <div class="fc-front">
          <div>
            <div class="fc-tag" style="color:${card.c}">Модуль ${card.m}</div>
            <div class="fc-q">${card.q}</div>
          </div>
          <div class="fc-hint">👆 Натисни щоб побачити відповідь</div>
        </div>
        <div class="fc-back">
          <div>
            <div class="fc-tag" style="color:${card.c}">Відповідь</div>
            <div class="fc-a">${card.a}</div>
          </div>
          <div class="fc-correct">✓ Перевір себе</div>
        </div>
      </div>`;
    div.addEventListener('click', () => div.classList.toggle('flipped'));
    grid.appendChild(div);
  });
}

function filterCards(mod, btn) {
  document.querySelectorAll('.fc-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  currentCards = mod === 'all' ? [...FLASHCARDS] : FLASHCARDS.filter(c => c.m === mod);
  renderCards(currentCards);
}

function shuffleCards() {
  currentCards = [...currentCards].sort(() => Math.random() - 0.5);
  renderCards(currentCards);
}

/* ================================================
   СЛОВНИК — ЛОГІКА
   ================================================ */
function buildGlossary() {
  const container = document.getElementById('glossary-list');
  if (!container) return;

  GLOSSARY.forEach(module => {
    const div = document.createElement('div');
    div.className = 'gl-module';
    div.innerHTML = `
      <div class="gl-header accordion-header">
        <div class="gl-dot" style="background:${module.color};box-shadow:0 0 8px ${module.color}66"></div>
        <div class="gl-title">Модуль ${module.m} — ${module.title}</div>
        <div class="gl-count">${module.terms.length} термінів</div>
        <div class="accordion-chevron gl-chevron">▼</div>
      </div>
      <div class="accordion-body gl-body">
        <div class="gl-grid">
          ${module.terms.map(t => `
            <div class="gl-term">
              <div class="gl-term-name">${t.name}</div>
              <div class="gl-term-def">${t.def}</div>
              <span class="gl-term-tag" style="background:${module.color}22;color:${module.color}">${t.tag}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
    container.appendChild(div);
  });
}

/* ================================================
   ІНІЦІАЛІЗАЦІЯ
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Флеш-картки
  if (document.getElementById('fc-grid')) {
    renderCards(currentCards);
  }

  // Словник
  if (document.getElementById('glossary-list')) {
    buildGlossary();
  }
});
