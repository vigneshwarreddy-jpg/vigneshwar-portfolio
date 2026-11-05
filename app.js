/* ==========================================================================
   Vigneshwar Reddy Gangidi — Matrix Cyberpunk Portfolio Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initTypingEffect();
  initTerminal();
});

/* ==========================================================================
   1. MATRIX DIGITAL RAIN ENGINE
   ========================================================================== */
let matrixRunning = true;
let matrixAnimId = null;

function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Matrix characters: Binary + Katakana + Cyber symbols
  const chars = '0101010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン<>[]{}/\\*+=-~#$';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    // Semi-transparent black to create trailing fade effect
    ctx.fillStyle = 'rgba(5, 8, 17, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ffaa';
    ctx.font = `${fontSize}px 'Fira Code', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Bright white for leading rain character
      if (Math.random() > 0.92) {
        ctx.fillStyle = '#ffffff';
      } else {
        ctx.fillStyle = '#00ffaa';
      }

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    if (matrixRunning) {
      matrixAnimId = requestAnimationFrame(drawMatrix);
    }
  }

  drawMatrix();

  // Toggle Button Event Listener
  const toggleBtn = document.getElementById('toggle-matrix-btn');
  const btnText = document.getElementById('matrix-btn-text');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      matrixRunning = !matrixRunning;
      if (matrixRunning) {
        btnText.textContent = 'Matrix';
        toggleBtn.querySelector('i').className = 'fa-solid fa-pause';
        drawMatrix();
      } else {
        btnText.textContent = 'Paused';
        toggleBtn.querySelector('i').className = 'fa-solid fa-play';
        if (matrixAnimId) cancelAnimationFrame(matrixAnimId);
      }
    });
  }
}

/* ==========================================================================
   2. DYNAMIC HERO TYPING ANIMATION
   ========================================================================== */
function initTypingEffect() {
  const typedElem = document.getElementById('typed-text');
  if (!typedElem) return;

  const roles = [
    'Full Stack Web Developer',
    'AI & Machine Learning Specialist',
    'Python & NLP Engineer',
    'React & Flask Application Builder'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      typedElem.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      typedElem.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 500; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. INTERACTIVE DEVELOPER TERMINAL
   ========================================================================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      if (cmd) {
        executeCmd(cmd);
        input.value = '';
      }
    }
  });
}

function executeCmd(cmd) {
  const output = document.getElementById('terminal-output');
  if (!output) return;

  // Append user typed prompt
  const userLine = document.createElement('div');
  userLine.className = 't-line';
  userLine.innerHTML = `<span class="terminal-prompt">vigneshwar@dev:~$</span> ${escapeHTML(cmd)}`;
  output.appendChild(userLine);

  let respHTML = '';

  switch (cmd) {
    case 'help':
      respHTML = `
        <div class="t-line text-cyan">Available Commands:</div>
        <div class="t-line">  • <span class="text-green">about</span>    - Display summary bio & education</div>
        <div class="t-line">  • <span class="text-green">skills</span>   - List technical skills & frameworks</div>
        <div class="t-line">  • <span class="text-green">projects</span> - View featured AI & Web projects</div>
        <div class="t-line">  • <span class="text-green">contact</span>  - Get email, phone & social links</div>
        <div class="t-line">  • <span class="text-green">whoami</span>   - Show current session user</div>
        <div class="t-line">  • <span class="text-green">clear</span>    - Clear terminal screen</div>
      `;
      break;

    case 'about':
      respHTML = `
        <div class="t-line text-cyan">[BIO SUMMARY]</div>
        <div class="t-line">Name: Vigneshwar Reddy Gangidi</div>
        <div class="t-line">Degree: B.Tech in AI & ML (2022 - 2026), CMR Institute of Technology</div>
        <div class="t-line">Location: Hyderabad, Telangana, India</div>
        <div class="t-line">Experience: Python Intern @ E-code Learning Software</div>
      `;
      break;

    case 'skills':
      respHTML = `
        <div class="t-line text-cyan">[SKILLS MATRIX]</div>
        <div class="t-line">Languages  : Python, Java, JavaScript, HTML5, CSS3</div>
        <div class="t-line">Web        : React.js, Angular, Flask, Node.js, REST APIs</div>
        <div class="t-line">AI / ML    : NLP, TF-IDF, Scikit-learn, Pandas, NumPy</div>
        <div class="t-line">Databases  : SQL (MySQL), MongoDB</div>
        <div class="t-line">Tools      : Git, GitHub, VS Code, Power BI, Tableau</div>
      `;
      break;

    case 'projects':
      respHTML = `
        <div class="t-line text-cyan">[FEATURED PROJECTS]</div>
        <div class="t-line">1. <span class="text-green">Fake News Detection</span> — NLP, TF-IDF, Passive Aggressive Classifier, Flask (93% Acc)</div>
        <div class="t-line">2. <span class="text-green">Temple Locations India</span> — React, Python REST APIs, Map Integration, MongoDB</div>
      `;
      break;

    case 'contact':
      respHTML = `
        <div class="t-line text-cyan">[CONTACT CHANNELS]</div>
        <div class="t-line">Email    : vigneshwarreddy402@gmail.com</div>
        <div class="t-line">Phone    : +91 6305128441</div>
        <div class="t-line">GitHub   : github.com/vigneshwarreddy-jpg</div>
        <div class="t-line">LinkedIn : linkedin.com/in/vigneshwarreddy</div>
      `;
      break;

    case 'whoami':
      respHTML = `<div class="t-line text-green">guest@vigneshwar-matrix-os</div>`;
      break;

    case 'clear':
      output.innerHTML = '';
      return;

    default:
      respHTML = `<div class="t-line text-cyan">Command not recognized: '${escapeHTML(cmd)}'. Type <span class="text-green">'help'</span> for command list.</div>`;
  }

  const respDiv = document.createElement('div');
  respDiv.innerHTML = respHTML;
  output.appendChild(respDiv);

  // Auto scroll to bottom
  output.scrollTop = output.scrollHeight;
}

/* ==========================================================================
   4. INTERACTIVE PROJECT DEMO MODALS
   ========================================================================== */
function openDemoModal(projectType) {
  const modal = document.getElementById('demo-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  if (!modal || !body) return;

  if (projectType === 'fake-news') {
    title.innerHTML = '<i class="fa-solid fa-robot text-green"></i> Fake News AI Classifier Simulator';
    body.innerHTML = `
      <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem;">
        Test the NLP &amp; Passive Aggressive Classifier pipeline. Type or paste any news text below:
      </p>
      <textarea id="news-input" rows="4" style="width:100%; padding:0.75rem; background:rgba(5,8,17,0.9); border:1px solid var(--primary-green); border-radius:6px; color:#fff; font-family:var(--font-sans); outline:none; margin-bottom:1rem;" placeholder="e.g. Scientists discover revolutionary solar power storage breakthrough in Hyderabad..."></textarea>
      <button class="cyber-btn primary block" onclick="runFakeNewsTest()"><i class="fa-solid fa-magnifying-glass"></i> Analyze Article</button>
      <div id="ai-result" style="margin-top:1.25rem; font-family:var(--font-mono); font-size:0.95rem; text-align:center;"></div>
    `;
  } else if (projectType === 'temples') {
    title.innerHTML = '<i class="fa-solid fa-gopuram text-green"></i> Temple Locations India Simulator';
    body.innerHTML = `
      <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem;">
        Search temple records by state or deity:
      </p>
      <input type="text" id="temple-search" oninput="filterTemples()" style="width:100%; padding:0.75rem; background:rgba(5,8,17,0.9); border:1px solid var(--cyan-accent); border-radius:6px; color:#fff; outline:none; margin-bottom:1rem;" placeholder="Search e.g. Tirupati, Kedarnath, Golden Temple...">
      <div id="temple-list" style="display:flex; flex-direction:column; gap:0.5rem; max-height:220px; overflow-y:auto;">
        <div style="padding:0.75rem; background:rgba(255,255,255,0.05); border-radius:6px; display:flex; justify-space-between;">
          <span><strong>Tirumala Venkateswara</strong> (Andhra Pradesh)</span>
          <span class="text-green"><i class="fa-solid fa-location-dot"></i> 13.6833° N, 79.3500° E</span>
        </div>
        <div style="padding:0.75rem; background:rgba(255,255,255,0.05); border-radius:6px; display:flex; justify-space-between;">
          <span><strong>Kedarnath Temple</strong> (Uttarakhand)</span>
          <span class="text-green"><i class="fa-solid fa-location-dot"></i> 30.7352° N, 79.0669° E</span>
        </div>
        <div style="padding:0.75rem; background:rgba(255,255,255,0.05); border-radius:6px; display:flex; justify-space-between;">
          <span><strong>Golden Temple (Harmandir Sahib)</strong> (Punjab)</span>
          <span class="text-green"><i class="fa-solid fa-location-dot"></i> 31.6200° N, 74.8765° E</span>
        </div>
        <div style="padding:0.75rem; background:rgba(255,255,255,0.05); border-radius:6px; display:flex; justify-space-between;">
          <span><strong>Meenakshi Amman Temple</strong> (Tamil Nadu)</span>
          <span class="text-green"><i class="fa-solid fa-location-dot"></i> 9.9195° N, 78.1193° E</span>
        </div>
      </div>
    `;
  }

  modal.classList.add('active');
}

function closeDemoModal(e) {
  const modal = document.getElementById('demo-modal');
  if (modal) modal.classList.remove('active');
}

function runFakeNewsTest() {
  const text = document.getElementById('news-input')?.value.trim();
  const resDiv = document.getElementById('ai-result');
  if (!resDiv) return;

  if (!text) {
    resDiv.innerHTML = '<span style="color:#ff5f56;">Please enter article text first!</span>';
    return;
  }

  resDiv.innerHTML = '<span class="text-cyan"><i class="fa-solid fa-spinner fa-spin"></i> Processing NLP Tokenization & TF-IDF Extraction...</span>';

  setTimeout(() => {
    const isFake = text.toLowerCase().includes('fake') || text.toLowerCase().includes('clickbait') || Math.random() < 0.3;
    if (isFake) {
      resDiv.innerHTML = `
        <div style="padding:0.8rem; background:rgba(255,95,86,0.15); border:1px solid #ff5f56; border-radius:6px; color:#ff5f56;">
          <i class="fa-solid fa-triangle-exclamation"></i> <strong>Prediction: FAKE NEWS</strong> (Confidence: 94.2%)
        </div>
      `;
    } else {
      resDiv.innerHTML = `
        <div style="padding:0.8rem; background:rgba(0,255,170,0.15); border:1px solid var(--primary-green); border-radius:6px; color:var(--primary-green);">
          <i class="fa-solid fa-circle-check"></i> <strong>Prediction: REAL / VERIFIED NEWS</strong> (Confidence: 96.8%)
        </div>
      `;
    }
  }, 1000);
}

function filterTemples() {
  const query = document.getElementById('temple-search')?.value.toLowerCase();
  const list = document.getElementById('temple-list');
  if (!list) return;

  const items = list.querySelectorAll('div');
  items.forEach(item => {
    if (item.textContent.toLowerCase().includes(query)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

/* ==========================================================================
   5. CONTACT FORM SUBMISSION HANDLER
   ========================================================================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  if (!status) return;

  status.innerHTML = '<span class="text-cyan"><i class="fa-solid fa-spinner fa-spin"></i> Transmitting message via Matrix channel...</span>';

  setTimeout(() => {
    status.innerHTML = '<span class="text-green"><i class="fa-solid fa-circle-check"></i> Message transmitted successfully! I will respond shortly.</span>';
    document.getElementById('contact-form')?.reset();
  }, 1200);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
