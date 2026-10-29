import { chromium } from "playwright-core";

const exe = "C:/Users/edumi/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe";
const base = "https://edumilla1994.github.io/calcula-pe/";
const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));

async function run(name, path, fillFn, readSel) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await fillFn(page);
  await page.click("button[type=submit]");
  await page.waitForTimeout(300);
  const value = (await page.textContent(readSel))?.trim();
  console.log(`${name}: ${value}`);
  return value;
}

const r1 = await run("CTS", "cts/", async (p) => {
  await p.fill("#sueldo", "2000");
  await p.fill("#gratificacion", "2000");
  await p.fill("#meses", "6");
  await p.fill("#dias", "0");
}, "#cts-total");

const r2 = await run("Gratificación", "gratificacion/", async (p) => {
  await p.fill("#sueldo", "2000");
  await p.fill("#meses", "6");
  await p.selectOption("#regimen", "0.09");
  await p.selectOption("#descuento", "0.13");
}, "#grat-neto");

const r3 = await run("Indemnización", "indemnizacion/", async (p) => {
  await p.fill("#sueldo", "2000");
  await p.fill("#anios", "3");
  await p.fill("#meses", "6");
  await p.fill("#dias", "0");
}, "#ind-total");

const r4 = await run("IGV", "igv/", async (p) => {
  await p.fill("#monto", "100");
  await p.selectOption("#modo", "agregar");
}, "#igv-total");

const r5 = await run("Préstamo", "prestamo/", async (p) => {
  await p.fill("#monto", "10000");
  await p.fill("#tea", "35");
  await p.fill("#meses", "24");
}, "#pres-cuota");

console.log("\nRESULTADOS:");
console.log({ cts: r1, gratificacion: r2, indemnizacion: r3, igv: r4, prestamo: r5 });
console.log("Errores JS:", errors.length ? errors : "ninguno");

await browser.close();
