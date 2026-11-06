// Original AlphaPigs behavior, converted directly from the supplied source design.
const root = document.querySelector('#site-root');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let raf = 0;

function updateMotion() {
  raf = 0;
  if (!root) return;
  const scrollingElement = document.scrollingElement || document.documentElement;
  const y = scrollingElement.scrollTop;
  const still = motionPreference.matches;
  const multiplier = still ? 0 : 1;

  root.querySelectorAll('[data-speed]').forEach((element) => {
    const speed = parseFloat(element.getAttribute('data-speed')) * multiplier;
    const axis = element.getAttribute('data-axis');
    if (axis === 'rot') {
      element.style.transform = `rotate(${y * speed}deg)`;
    } else if (axis === 'loop') {
      const width = element.offsetWidth;
      const span = window.innerWidth + width;
      const x = still
        ? window.innerWidth * 0.08
        : (((y * speed) % span) + span) % span - width * 0.6;
      element.style.transform = `translate3d(${x}px,0,0)`;
    } else {
      element.style.transform = `translate3d(0,${y * speed}px,0)`;
    }
  });
}

function requestMotionUpdate() {
  if (!raf) raf = requestAnimationFrame(updateMotion);
}

window.addEventListener('scroll', requestMotionUpdate, { passive: true });
window.addEventListener('resize', requestMotionUpdate);
motionPreference.addEventListener('change', requestMotionUpdate);
updateMotion();

// Calculator — original materials, defaults, calculations and output formatting.
const MATERIALS = [['Cement', 94], ['Fly ash', 65], ['Lime', 60], ['Catalyst', 50], ['Barite', 130]];
const materialButtons = [...document.querySelectorAll('#calc [data-material-index]')];
const tonsInput = document.querySelector('#calc-tons');
const tonsRange = document.querySelector('#calc-tons-range');
let materialIndex = 0;
let tons = 600;

function renderCalculator() {
  const [materialName, density] = MATERIALS[materialIndex];
  const volumetricPerPig = 4100 * density / 2000;
  const perPig = materialName === 'Cement' ? 190 : Math.min(volumetricPerPig, 220);
  const pigs = Math.max(1, Math.ceil(tons / perPig));
  const pigsWord = pigs === 1 ? 'pig' : 'pigs';

  materialButtons.forEach((button, index) => {
    const active = index === materialIndex;
    button.setAttribute('aria-pressed', String(active));
    button.style.background = active ? '#9E1B1F' : 'transparent';
    button.style.color = active ? '#fff' : '#1A1A1A';
  });
  tonsInput.value = tons;
  tonsRange.value = tons;
  document.querySelector('#calc-pig-count').textContent = pigs;
  document.querySelector('#calc-pig-word').textContent = pigsWord;
  document.querySelector('#calc-per-pig').textContent = `${Math.round(perPig)} tons ${materialName.toLowerCase()}`;
  document.querySelector('#calc-total-ft').textContent = `${(pigs * 4100).toLocaleString('en-US')} ft³`;
  document.querySelector('#calc-quote-cta').textContent = `Quote ${pigs} ${pigsWord} →`;
  requestMotionUpdate();
}

function setTons(value) {
  const numeric = Number(value);
  if (numeric) tons = Math.max(50, Math.min(3000, numeric));
  renderCalculator();
}

materialButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    materialIndex = index;
    renderCalculator();
  });
});
tonsInput.addEventListener('input', (event) => setTons(event.target.value));
tonsInput.addEventListener('change', (event) => setTons(event.target.value));
tonsRange.addEventListener('input', (event) => setTons(event.target.value));
document.querySelector('#calc button[aria-label="Decrease by 50 tons"]').addEventListener('click', () => {
  tons = Math.max(50, tons - 50);
  renderCalculator();
});
document.querySelector('#calc button[aria-label="Increase by 50 tons"]').addEventListener('click', () => {
  tons = Math.min(3000, tons + 50);
  renderCalculator();
});
renderCalculator();

// Audience personalization — original titles, body copy, bullets and calls to action.
const SEGMENTS = {
  end: {
    title: 'Buy it. Put it to work.',
    body: "For contractors, plant operators and service companies who need storage on their own schedule. Own the pig outright and stop paying someone else's rental rate on every job.",
    points: ['Factory-direct pricing on one pig or several', 'Delivered to your yard or job site', 'Parts, filters and service support after the sale'],
    cta: 'Quote a pig'
  },
  dist: {
    title: 'Put AlphaPigs on your line card.',
    body: 'For equipment dealers and bulk-handling distributors who want a storage pig their customers ask for by name.',
    points: ['Dealer pricing for stocking and resale', 'Spec sheets, photos and co-branded literature', 'Stock units or drop-ship to your customer'],
    cta: 'Become a distributor'
  },
  fleet: {
    title: 'Stock your rental fleet.',
    body: 'For rental and leasing companies that buy pigs to rent out to their own customers. Built to be towed, set, filled and moved again — job after job.',
    points: ['Fleet pricing on multi-unit orders', 'Built for repeated moves and set-ups', 'Rental-ready documentation for your customers'],
    cta: 'Price a fleet'
  }
};
const BUYER_OPTIONS = [['end', 'End users'], ['dist', 'Distributors'], ['fleet', 'Rental & leasing companies']];
const BUYER_TO_DEAL = { end: 'End user', dist: 'Distributor', fleet: 'Rental company' };
const audienceTabs = [...document.querySelectorAll('#partners [data-buyer]')];
const darkBuyerButtons = [...document.querySelectorAll('#quote [data-buyer-dark]')];
const quoteForm = document.querySelector('#quote-form');
let buyer = 'end';
let deal = 'End user';

function renderBuyers() {
  audienceTabs.forEach((button, index) => {
    const active = button.dataset.buyer === buyer;
    button.setAttribute('aria-selected', String(active));
    button.style.background = active ? '#9E1B1F' : 'transparent';
    button.style.color = active ? '#fff' : '#1A1A1A';
    button.tabIndex = active ? 0 : -1;
    if (active) document.querySelector('#audience-panel').setAttribute('aria-labelledby', button.id);
  });
  darkBuyerButtons.forEach((button) => {
    const id = BUYER_OPTIONS.find(([, label]) => label === button.dataset.buyerDark)?.[0];
    const active = id === buyer;
    button.setAttribute('aria-pressed', String(active));
    button.style.background = active ? '#9E1B1F' : 'transparent';
    button.style.color = active ? '#fff' : '#f2f2f3';
  });
  const activeLabel = BUYER_OPTIONS.find(([id]) => id === buyer)[1];
  quoteForm.elements['Customer segment'].value = activeLabel;
}

function renderDeals() {
  quoteForm.elements['Request type'].value = deal;
}

function renderAudience() {
  const segment = SEGMENTS[buyer];
  document.querySelector('#audience-title').textContent = segment.title;
  document.querySelector('#audience-body').textContent = segment.body;
  const points = document.querySelectorAll('#audience-points li');
  points.forEach((item, index) => {
    item.innerHTML = '<span style="color:#9E1B1F;font-weight:700">+</span>';
    item.append(document.createTextNode(segment.points[index]));
  });
  document.querySelector('#audience-cta').textContent = `${segment.cta} →`;
  renderBuyers();
  renderDeals();
  requestMotionUpdate();
}

function setBuyer(id, focusTab = false) {
  buyer = id;
  deal = BUYER_TO_DEAL[id];
  renderAudience();
  if (focusTab) document.querySelector(`#tab-${id}`).focus();
}

audienceTabs.forEach((button, index) => {
  button.addEventListener('click', () => setBuyer(button.dataset.buyer));
  button.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % audienceTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + audienceTabs.length) % audienceTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = audienceTabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setBuyer(audienceTabs[next].dataset.buyer, true);
    }
  });
});
darkBuyerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const id = BUYER_OPTIONS.find(([, label]) => label === button.dataset.buyerDark)[0];
    setBuyer(id);
  });
});
renderAudience();

// Actual quote delivery with the original confirmation design retained.
const confirmation = document.querySelector('#quote-confirmation');
const submitButton = document.querySelector('#quote-submit');
const formError = document.querySelector('#form-error');
const originalSubmitContent = submitButton.innerHTML;

quoteForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!quoteForm.checkValidity()) {
    quoteForm.reportValidity();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  formError.hidden = true;

  try {
    const response = await fetch(quoteForm.action, {
      method: 'POST',
      body: new FormData(quoteForm),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json();
    const succeeded = response.ok && (result.success === true || result.success === 'true');
    if (!succeeded) throw new Error('Quote service rejected the request');

    const name = quoteForm.elements.name.value.trim();
    const firstName = name.split(/\s+/)[0];
    const dealLabel = { 'End user': 'purchase', Distributor: 'dealer', 'Rental company': 'fleet' }[deal];
    document.querySelector('#confirmation-thanks').textContent = firstName ? `Thanks, ${firstName}.` : 'Thanks.';
    document.querySelector('#confirmation-detail').textContent = `We've got your ${dealLabel} request. Expect a call or email within one business day with pricing and availability.`;
    quoteForm.hidden = true;
    confirmation.hidden = false;
    confirmation.focus();
  } catch {
    formError.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalSubmitContent;
  }
});

document.querySelector('#send-another').addEventListener('click', () => {
  quoteForm.elements.name.value = '';
  confirmation.hidden = true;
  quoteForm.hidden = false;
  formError.hidden = true;
  quoteForm.elements.name.focus();
});
