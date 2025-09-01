import { z } from 'zod';

export const PumpInputSchema = z.object({
  mode: z.enum(["tweet","thread"]).default("thread"),
  ticker: z.string().trim().regex(/^\$?[A-Z0-9]{2,10}$/).default("$COPE"),
  persona: z.enum(["Insider Whale","Quant Wizard","Zen Master","Macro Prophet","DeFi Farmer","NFT Visionary"]),
  narrative: z.enum(["AI","RWA","DePIN","L2","Next SOL","Undervalued GEM"]),
  intensity: z.number().int().min(0).max(11),
  length: z.union([z.literal(5), z.literal(8), z.literal(12)]).default(8),
  redFlags: z.array(z.enum(["fake_partnerships","chart_zoom","audited_pending","team_doxxed"]))
}).superRefine((v) => {
  if (v.mode === "tweet" && typeof v.length !== "undefined") {
    // length is ignored in tweet mode; keep for compatibility
  }
});

export type PumpInput = z.infer<typeof PumpInputSchema>;
