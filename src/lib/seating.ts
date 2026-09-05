/**
 * Shared seat-number sorting + per-table color logic, used by both the
 * public "Check Seat Number" directory and the admin dashboard, so a table
 * always gets the same accent color in both places.
 *
 * Seat codes look like "G-01", "H-16", "LG-24", "T07-05". Everything before
 * the LAST hyphen is the table ("T07"); everything after is the seat within
 * that table ("05"). A code with no hyphen (e.g. "Reserved") is its own
 * single-seat "table".
 */

export function seatTable(seatNumber: string | null | undefined): string {
  if (!seatNumber) return "";
  const trimmed = seatNumber.trim();
  const idx = trimmed.lastIndexOf("-");
  return idx === -1 ? trimmed : trimmed.slice(0, idx);
}

// Natural sort: compares runs of digits numerically and runs of non-digits
// as text, so "T2-05" sorts before "T10-01" (unlike plain string sort, which
// would put "T10" first because "1" < "2" as characters).
export function compareSeatNumbers(
  a: string | null | undefined,
  b: string | null | undefined
): number {
  if (!a && !b) return 0;
  if (!a) return 1; // unassigned seats sort last
  if (!b) return -1;

  const chunk = (s: string) => s.match(/\d+|\D+/g) ?? [];
  const ca = chunk(a);
  const cb = chunk(b);
  const len = Math.max(ca.length, cb.length);

  for (let i = 0; i < len; i++) {
    const x = ca[i] ?? "";
    const y = cb[i] ?? "";
    const xNum = /^\d+$/.test(x);
    const yNum = /^\d+$/.test(y);
    if (xNum && yNum) {
      const diff = parseInt(x, 10) - parseInt(y, 10);
      if (diff !== 0) return diff;
    } else {
      const cmp = x.localeCompare(y);
      if (cmp !== 0) return cmp;
    }
  }
  return 0;
}

/**
 * Builds a table -> color map from a list of seat numbers. Colors are
 * evenly spaced around the hue wheel (so neighboring tables never look
 * alike), offset away from gold (~45°) so the site's base color stays
 * visually distinct from every table accent. Deterministic — same input
 * seats always produce the same colors, independently, wherever it's called.
 */
export function buildTableColorMap(seatNumbers: (string | null | undefined)[]): Map<string, string> {
  const tables = Array.from(
    new Set(seatNumbers.map(seatTable).filter((t): t is string => Boolean(t)))
  ).sort((a, b) => compareSeatNumbers(a, b));

  const map = new Map<string, string>();
  const total = tables.length || 1;
  tables.forEach((table, i) => {
    const hue = (200 + (360 / total) * i) % 360;
    map.set(table, `hsl(${hue.toFixed(0)}, 58%, 58%)`);
  });
  return map;
}
