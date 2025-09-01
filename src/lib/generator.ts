import seedrandom from 'seedrandom';
import { PumpInput, Thread, CopeKnobs, Libraries } from './types';
import { hooks } from './templates/hooks';
import { authority } from './templates/authority';
import { chartLines } from './templates/chartLines';
import { tokenomicsCope } from './templates/tokenomics';
import { catalysts } from './templates/catalysts';
import { ctas } from './templates/ctas';
import { disclaimers } from './templates/disclaimers';
import { narrativeFrames } from './templates/narrativeFrames';

// Cope Dial mapping function
export function knobs(cope: number): CopeKnobs {
  return {
    allowFakePartners: cope >= 6,
    partnersSoundSigned: cope >= 11,
    chartCrop: cope >= 9 ? "5m" : cope >= 6 ? "1H" : "1D",
    numbersMax: cope <= 2 ? 0 : cope <= 5 ? 1 : cope <= 8 ? 3 : 4,
    certainty: cope <= 2 ? "hedged" : cope <= 5 ? "confident" : cope <= 8 ? "propulsive" : "prophetic",
    cta: cope <= 2 ? "soft" : cope <= 5 ? "normal" : cope <= 8 ? "hard" : "max",
    disclaimerStyle: cope >= 9 ? "loud" : cope >= 6 ? "witty" : "plain",
  };
}

// Template filling function
function fill(template: string, input: PumpInput): string {
  return template
    .replace(/{ticker}/g, input.ticker)
    .replace(/{narrative}/g, input.narrative)
    .replace(/{persona}/g, input.persona);
}

// Compress multiple parts into a single tweet
function compressToOneLiner(parts: string[], ctx: { k: CopeKnobs; input: PumpInput }): string {
  const hook = parts[0]?.replace(/^\d+\/\s*/, "") ?? "";
  const payload = parts.find(p => /rotation|reclaim|partner|rev share|airdrop|listing|float|vacuum/i.test(p)) ?? parts[1] ?? "";
  const cta = ctx.k.cta === "soft" ? "" : " • Like + RT 🔔";
  return `${hook} ${payload}${cta}`.trim();
}

// Main generator function
export function generateThread(input: PumpInput): Thread {
  const rng = seedrandom(input.seed ?? Date.now().toString());
  const pick = <T>(arr: T[]) => arr[Math.floor(rng() * arr.length)];
  const k = knobs(input.intensity);

  const base: string[] = [];
  
  // Add hook
  base.push(fill(pick(hooks), input));
  
  // Add authority based on persona
  base.push(fill(pick(authority[input.persona]), input));
  
  // Add narrative frame
  base.push(fill(pick(narrativeFrames[input.narrative]), input));
  
  // Add chart lines if red flag is set
  if (input.redFlags.includes("chart_zoom")) {
    base.push(fill(pick(chartLines), input));
  }
  
  // Add fake partnerships if allowed and red flag is set
  if (k.allowFakePartners && input.redFlags.includes("fake_partnerships")) {
    const partnerText = k.partnersSoundSigned 
      ? "Three tier-1s signed, top-3 auditor passed them without reading (alpha)."
      : "Undisclosed partner under NDA.";
    base.push(partnerText);
  }
  
  // Add tokenomics
  base.push(fill(pick(tokenomicsCope), input));
  
  // Add catalysts
  base.push(fill(pick(catalysts), input));
  
  // Add CTA
  base.push(fill(pick(ctas[k.cta]), input));

  const disclaimer = pick(disclaimers[k.disclaimerStyle]);

  if (input.mode === "tweet") {
    const one = compressToOneLiner(base, { k, input });
    return {
      tweets: [one],
      disclaimer: `${disclaimer} — SATIRE / PARODY / NFA / DYOR`,
      cardMeta: { 
        title: `${input.ticker} — ${input.narrative} Play`, 
        bullets: [
          pick(catalysts).replace(/{ticker}/g, input.ticker),
          pick(chartLines).replace(/{ticker}/g, input.ticker),
          "Float tight • Squeeze setup"
        ] 
      }
    };
  }

  // Thread mode
  const trimmed = base.slice(0, input.length);
  return {
    tweets: trimmed.map((t, i) => `${i+1}/ ${t}`),
    disclaimer: `${disclaimer} — SATIRE / PARODY / NFA / DYOR`,
    cardMeta: { 
      title: `${input.ticker} — ${input.narrative} Play`, 
      bullets: [
        pick(catalysts).replace(/{ticker}/g, input.ticker),
        pick(chartLines).replace(/{ticker}/g, input.ticker),
        "Float tight • Squeeze setup"
      ] 
    }
  };
}
