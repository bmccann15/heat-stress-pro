const $ = (id) => document.getElementById(id);
const temp = $('temp');
const humidityValue = $('humidityValue');
const modeDew = $('modeDew');
const modeRh = $('modeRh');
const humidityLabel = $('humidityLabel');
const humidityUnit = $('humidityUnit');
let mode = localStorage.getItem('hs_mode') || 'dew';

function cFromF(f) { return (f - 32) / 1.8; }
function fFromC(c) { return c * 1.8 + 32; }
function saturationVaporPressureC(t) { return Math.exp((17.67 * t) / (t + 243.5)); }
function rhFromTempDewF(tempF, dewF) {
  const T = cFromF(tempF), Td = cFromF(dewF);
  return 100 * saturationVaporPressureC(Td) / saturationVaporPressureC(T);
}
function dewFromTempRhF(tempF, rh) {
  const T = cFromF(tempF);
  const alpha = Math.log(rh / 100) + (17.67 * T) / (T + 243.5);
  return fFromC((243.5 * alpha) / (17.67 - alpha));
}
function wetBulbStullF(tempF, rh) {
  const T = cFromF(tempF);
  const RH = Math.max(1, Math.min(100, rh));
  const Tw = T * Math.atan(0.151977 * Math.sqrt(RH + 8.313659)) +
    Math.atan(T + RH) - Math.atan(RH - 1.676331) +
    0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) - 4.686035;
  return fFromC(Tw);
}
function heatIndexF(T, RH) {
  if (T < 80) return T;
  const c1=-42.379,c2=2.04901523,c3=10.14333127,c4=-0.22475541,c5=-0.00683783,c6=-0.05481717,c7=0.00122874,c8=0.00085282,c9=-0.00000199;
  let HI = c1 + c2*T + c3*RH + c4*T*RH + c5*T*T + c6*RH*RH + c7*T*T*RH + c8*T*RH*RH + c9*T*T*RH*RH;
  if (RH < 13 && T >= 80 && T <= 112) HI -= ((13-RH)/4) * Math.sqrt((17-Math.abs(T-95))/17);
  if (RH > 85 && T >= 80 && T <= 87) HI += ((RH-85)/10) * ((87-T)/5);
  return HI;
}
function riskForWetBulb(wb) {
  if (wb >= 85) return ['Extreme', '#a855f7', 'Dangerous wet-bulb level. Avoid strenuous outdoor activity.'];
  if (wb >= 80) return ['High', '#ef4444', 'High heat-stress risk with exertion. Use shade, cooling, and frequent breaks.'];
  if (wb >= 75) return ['Elevated', '#f97316', 'Uncomfortable and taxing. Hydrate and reduce intensity.'];
  if (wb >= 70) return ['Humid', '#eab308', 'Humid but generally manageable for light activity.'];
  return ['Lower', '#22c55e', 'Lower wet-bulb stress, though sun and exertion still matter.'];
}
function comfortFromDew(dp) {
  if (dp >= 75) return 'Tropical';
  if (dp >= 70) return 'Oppressive';
  if (dp >= 65) return 'Humid';
  if (dp >= 60) return 'Sticky';
  return 'Comfortable';
}
function setMode(next) {
  mode = next;
  localStorage.setItem('hs_mode', mode);
  modeDew.classList.toggle('selected', mode === 'dew');
  modeRh.classList.toggle('selected', mode === 'rh');
  humidityLabel.childNodes[0].nodeValue = mode === 'dew' ? 'Dew point' : 'Relative humidity';
  humidityUnit.textContent = mode === 'dew' ? '°F' : '%';
  humidityValue.placeholder = mode === 'dew' ? '74' : '50';
  calculate();
}
function calculate() {
  const T = parseFloat(temp.value);
  const H = parseFloat(humidityValue.value);
  localStorage.setItem('hs_temp', temp.value);
  localStorage.setItem('hs_humidity', humidityValue.value);
  if (!Number.isFinite(T) || !Number.isFinite(H)) return renderEmpty();
  let RH = mode === 'dew' ? rhFromTempDewF(T, H) : H;
  if (mode === 'dew' && H > T) return renderMessage('Dew point cannot exceed temperature.');
  if (RH < 0 || RH > 100) return renderMessage('Relative humidity must be 0–100%.');
  RH = Math.max(1, Math.min(100, RH));
  const DP = mode === 'dew' ? H : dewFromTempRhF(T, RH);
  const WB = wetBulbStullF(T, RH);
  const HI = heatIndexF(T, RH);
  const [risk, color, msg] = riskForWetBulb(WB);
  document.documentElement.style.setProperty('--risk', color);
  $('wetBulb').textContent = WB.toFixed(1);
  $('riskText').textContent = `${risk}: ${msg}`;
  $('heatIndex').textContent = `${HI.toFixed(0)}°F`;
  $('rhOut').textContent = `${RH.toFixed(0)}%`;
  $('dewOut').textContent = `${DP.toFixed(1)}°F`;
  $('comfortOut').textContent = comfortFromDew(DP);
}
function renderEmpty() {
  $('wetBulb').textContent = '--';
  $('riskText').textContent = 'Enter temperature and dew point or RH.';
  $('heatIndex').textContent = '--'; $('rhOut').textContent = '--'; $('dewOut').textContent = '--'; $('comfortOut').textContent = '--';
  document.documentElement.style.setProperty('--risk', '#22c55e');
}
function renderMessage(msg) { renderEmpty(); $('riskText').textContent = msg; }

document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active'); $(btn.dataset.tab).classList.add('active');
}));
modeDew.addEventListener('click', () => setMode('dew'));
modeRh.addEventListener('click', () => setMode('rh'));
[temp, humidityValue].forEach(el => el.addEventListener('input', calculate));
$('sampleBtn').addEventListener('click', () => { temp.value = 95; humidityValue.value = mode === 'dew' ? 74 : 50; calculate(); });
$('resetBtn').addEventListener('click', () => { temp.value=''; humidityValue.value=''; calculate(); });

temp.value = localStorage.getItem('hs_temp') || '';
humidityValue.value = localStorage.getItem('hs_humidity') || '';
setMode(mode);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
}
