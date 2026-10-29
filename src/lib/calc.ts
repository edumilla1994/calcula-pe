export const UIT = 5500;
export const PRIMA_AFP = 0.0137;
export const TOPE_PRIMA = 12209.11;
export const COMISION_AFP = 0.0147;
export const ONP = 0.13;

export const MONTOS_EJEMPLO = [1000, 1500, 2000, 2500, 3000, 4000, 5000];
export const TIPOS_EJEMPLO = ['cts', 'sueldo-neto', 'gratificacion'] as const;
export type TipoEjemplo = (typeof TIPOS_EJEMPLO)[number];

const TRAMOS = [
  { hasta: 5 * UIT, tasa: 0.08 },
  { hasta: 20 * UIT, tasa: 0.14 },
  { hasta: 35 * UIT, tasa: 0.17 },
  { hasta: 45 * UIT, tasa: 0.2 },
  { hasta: Number.POSITIVE_INFINITY, tasa: 0.3 },
];

export function impuestoAnual(base: number): number {
  let restante = Math.max(0, base);
  let anterior = 0;
  let total = 0;
  for (const tramo of TRAMOS) {
    const monto = Math.min(restante, tramo.hasta - anterior);
    if (monto <= 0) break;
    total += monto * tramo.tasa;
    restante -= monto;
    anterior = tramo.hasta;
  }
  return total;
}

export function sueldoNeto(sueldo: number, sistema: 'onp' | 'afp' = 'onp') {
  const pension = sistema === 'onp'
    ? sueldo * ONP
    : sueldo * (0.10 + COMISION_AFP) + Math.min(sueldo, TOPE_PRIMA) * PRIMA_AFP;
  const anual = sueldo * 12 * (1 + 1 / 6);
  const renta = impuestoAnual(anual - 7 * UIT) / 12;
  return {
    bruto: sueldo,
    pension,
    renta,
    neto: Math.max(0, sueldo - pension - renta),
  };
}

export function ctsSemestre(sueldo: number, asignacion = 0, gratificacion = sueldo) {
  const rc = sueldo + asignacion + gratificacion / 6;
  return { rc, monto: rc / 2 };
}

export function gratificacionSemestre(
  sueldo: number,
  asignacion = 0,
  bono = 0.09,
  descuento = ONP,
) {
  const base = sueldo + asignacion;
  const bonoMonto = base * bono;
  const bruto = base + bonoMonto;
  const desc = base * descuento;
  return { base, bono: bonoMonto, bruto, desc, neto: bruto - desc };
}

export function soles(n: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function solesCorto(n: number): string {
  return 'S/ ' + new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 }).format(n);
}
