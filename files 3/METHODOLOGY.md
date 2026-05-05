# KMY GROW — Методологія розробки

## Головне правило
**HTML = структура і контент**
**CSS = зовнішній вигляд**
**JS = поведінка**

Ніколи не змішувати. Якщо хочеться написати `style=""` в HTML — це сигнал що потрібен новий CSS-клас.

---

## Структура файлів

```
kmy-grow/
├── index.html              ← Головна сторінка
├── pages/
│   ├── foundation.html     ← Трек: Фундамент
│   ├── smm-course.html     ← Трек: Digital / SMM
│   ├── trade.html          ← Трек: Trade (копія foundation.html)
│   ├── product.html        ← Трек: Product (копія foundation.html)
│   └── brand.html          ← Трек: Brand (копія foundation.html)
├── css/
│   ├── main.css            ← Спільні стилі (всі сторінки)
│   ├── index.css           ← Тільки головна
│   ├── foundation.css      ← Тільки сторінки треків
│   └── smm-course.css      ← Тільки SMM курс
├── js/
│   ├── main.js             ← Спільні скрипти (всі сторінки)
│   ├── index.js            ← Тільки головна (quiz, donate)
│   └── course.js           ← Тільки сторінки курсів (accordion, flashcards)
├── admin/
│   ├── index.html          ← Decap CMS панель
│   └── config.yml          ← Конфігурація CMS
└── netlify.toml            ← Конфігурація Netlify
```

---

## Система класів — конвенція іменування

### Загальний принцип: BEM-light
```
.блок {}
.блок__елемент {}
.блок--модифікатор {}
```

### Кольори треків — через CSS-змінні і модифікатори
```css
/* Визначено в main.css */
--track-foundation: #7c6bff;
--track-digital:    #00d4aa;
--track-trade:      #ffd166;
--track-product:    #f97316;
--track-brand:      #ff6b6b;
```

```html
<!-- В HTML: тільки клас-модифікатор -->
<div class="roadmap-dot track--foundation"></div>
<span class="badge track-badge--digital">Активний</span>
<div class="track-title track-title--trade">🟡 Trade</div>
```

```css
/* В CSS: всі стилі за цим класом */
.track--foundation { color: var(--track-foundation); box-shadow: 0 0 12px rgba(124,107,255,0.4); }
.track--digital    { color: var(--track-digital);    box-shadow: 0 0 12px rgba(0,212,170,0.4); }
```

### Skill-теги — через модифікатори
```html
<span class="skill-tag skill-tag--green">Бізнес</span>
<span class="skill-tag skill-tag--yellow">Фінанси</span>
```

### Data-атрибути замість onclick
```html
<!-- НЕ так -->
<button onclick="myFunc(arg)">Кнопка</button>

<!-- А так -->
<button data-action="quiz-select" data-step="1" data-val="beginner">Кнопка</button>
```

---

## Як створити нову сторінку треку

### Крок 1 — Скопіюй foundation.html
```bash
cp pages/foundation.html pages/trade.html
```

### Крок 2 — Зміни в HTML тільки:
1. `<title>` — назва сторінки
2. Навігаційне посилання `← Всі треки`
3. `.page-hero-tag` — мітка треку
4. `<h1>` — заголовок
5. `.page-hero-desc` — опис
6. Метадані (кількість модулів, тощо)
7. ID і класи модулів (`.module--b1` → `.module--t1`)
8. Контент кожного модуля (терміни, схеми, кейси)

### Крок 3 — CSS не чіпаєш
Всі базові стилі вже є в `foundation.css`. Якщо потрібен унікальний стиль — додай в кінець `foundation.css` з коментарем:
```css
/* === TRADE MARKETING специфічні стилі === */
.trade-matrix { ... }
```

### Крок 4 — JS не чіпаєш
`course.js` підключається до всіх сторінок треків і вже має всю логіку.

---

## Правила написання HTML

```html
<!-- ✓ ПРАВИЛЬНО — тільки класи -->
<div class="track-info">
  <div class="track-title track-title--foundation">🔵 Фундамент маркетингу</div>
  <div class="track-sub">Базові знання · 6 модулів</div>
</div>

<!-- ✗ НЕПРАВИЛЬНО — inline стилі -->
<div style="flex:1">
  <div style="font-size:14px;color:var(--track-foundation)">🔵 Фундамент</div>
</div>
```

```html
<!-- ✓ ПРАВИЛЬНО — data атрибути -->
<div class="quiz-opt" data-step="1" data-val="beginner">
  <span class="quiz-opt__icon">🌱</span>
  Тільки починаю
</div>

<!-- ✗ НЕПРАВИЛЬНО — onclick -->
<div class="quiz-opt" onclick="selectOpt(1,'beginner')">
```

---

## Правила написання CSS

```css
/* ✓ ПРАВИЛЬНО — модифікатори через клас */
.skill-tag--green  { background: rgba(0,212,170,0.1); color: var(--green); }
.skill-tag--yellow { background: rgba(255,209,102,0.1); color: var(--yellow); }

/* ✗ НЕПРАВИЛЬНО — хардкод кольорів в HTML */
/* <span style="background:rgba(0,212,170,0.1);color:#00d4aa;"> */
```

```css
/* ✓ ПРАВИЛЬНО — CSS змінні для кольорів */
.donate-title { font-size: clamp(1.5rem, 3vw, 2.2rem); }

/* ✗ НЕПРАВИЛЬНО — style="" в HTML */
/* <h2 style="font-size:clamp(1.5rem,3vw,2.2rem)"> */
```

---

## Структура модуля (блоку) в HTML

Кожен навчальний модуль має однакову структуру. Копіюй і міняй тільки контент:

```html
<div class="roadmap-item module-item anim" id="m1">
  <!-- Крапка на лінії — тільки клас кольору -->
  <div class="roadmap-dot module-dot--1"></div>

  <div class="accordion">
    <!-- Заголовок — клік відкриває/закриває -->
    <div class="accordion-header">
      <span class="module-num">01</span>
      <div class="module-info">
        <div class="module-title module-title--1">← НАЗВА МОДУЛЯ</div>
        <div class="module-sub">← ПІДЗАГОЛОВОК З ТЕРМІНАМИ</div>
      </div>
      <span class="accordion-chevron">▼</span>
    </div>

    <!-- Тіло — контент модуля -->
    <div class="accordion-body">
      <div class="module-body">
        <p class="module-intro">← ВСТУПНИЙ ТЕКСТ</p>

        <!-- Теги тем -->
        <div class="topics">
          <span class="tag">Термін 1</span>
          <span class="tag">Термін 2</span>
        </div>

        <!-- Схема/формули -->
        <div class="schema schema--1">
          <div class="schema-title">← НАЗВА СХЕМИ</div>
          <!-- контент схеми -->
        </div>

        <!-- Кейс -->
        <div class="example-box">
          <div class="example-title">Кейс: ← НАЗВА</div>
          <div class="example-text">← ТЕКСТ КЕЙСУ</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Підключення файлів на кожній сторінці

### Головна (index.html)
```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/index.css">
...
<script src="js/main.js"></script>
<script src="js/index.js"></script>
```

### Сторінки треків (pages/*.html)
```html
<link rel="stylesheet" href="../css/main.css">
<link rel="stylesheet" href="../css/foundation.css">
...
<script src="../js/main.js"></script>
<script src="../js/course.js"></script>
```

### SMM курс (pages/smm-course.html)
```html
<link rel="stylesheet" href="../css/main.css">
<link rel="stylesheet" href="../css/smm-course.css">
...
<script src="../js/main.js"></script>
<script src="../js/course.js"></script>
```

---

## Чеклист перед комітом

- [ ] В HTML нема жодного `style=""`
- [ ] В HTML нема жодного `onclick=`
- [ ] Всі кольори через CSS-класи або змінні
- [ ] Нові класи додані в правильний CSS файл
- [ ] Нова логіка додана в правильний JS файл
- [ ] Перевірено на мобільному (DevTools → Toggle device)
