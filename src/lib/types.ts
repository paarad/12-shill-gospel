export type Persona = "Insider Whale" | "Quant Wizard" | "Zen Master" | "Macro Prophet" | "DeFi Farmer" | "NFT Visionary";
export type Narrative = "AI" | "RWA" | "DePIN" | "L2" | "Next SOL" | "Undervalued GEM";
export type CopeLevel = 0|1|2|3|4|5|6|7|8|9|10|11;
export type Mode = "tweet" | "thread";

export interface PumpInput {
  mode: Mode;                 // NEW: default "thread"
  ticker: string;             // default "$COPE"
  persona: Persona;
  narrative: Narrative;
  intensity: CopeLevel;       // Cope Dial
  length: 5 | 8 | 12;         // used only when mode === "thread"
  redFlags: ("fake_partnerships"|"chart_zoom"|"audited_pending"|"team_doxxed")[];
  seed?: string;              // reproducible outputs
}

export interface Thread {
  tweets: string[];           // 1 item if tweet mode; N if thread mode
  disclaimer: string;         // appended
  cardMeta: { title: string; bullets: string[] };
}

export interface CopeKnobs {
  allowFakePartners: boolean;
  partnersSoundSigned: boolean;
  chartCrop: "1D" | "1H" | "5m";
  numbersMax: number;
  certainty: "hedged" | "confident" | "propulsive" | "prophetic";
  cta: "soft" | "normal" | "hard" | "max";
  disclaimerStyle: "plain" | "witty" | "loud";
}

export interface Libraries {
  hooks: string[];
  authority: Record<Persona, string[]>;
  chartLines: string[];
  tokenomicsCope: string[];
  catalysts: string[];
  ctas: Record<string, string[]>;
  disclaimers: Record<string, string[]>;
  narrativeFrames: Record<Narrative, string[]>;
}
