// Redactor for replacing real names/brands with placeholders
const REDACTION_MAP: Record<string, string> = {
  // Exchanges
  'binance': 'Tier-1 CEX',
  'coinbase': 'Tier-1 CEX',
  'kraken': 'Tier-1 CEX',
  'ftx': 'Tier-1 CEX',
  'bybit': 'Tier-1 CEX',
  'okx': 'Tier-1 CEX',
  'huobi': 'Tier-1 CEX',
  'kucoin': 'Tier-1 CEX',
  
  // Major brands/companies
  'blackrock': 'Tier-1 asset mgr',
  'fidelity': 'Tier-1 asset mgr',
  'vanguard': 'Tier-1 asset mgr',
  'microsoft': 'Big Tech',
  'google': 'Big Tech',
  'amazon': 'Big Tech',
  'apple': 'Big Tech',
  'meta': 'Big Tech',
  'tesla': 'Big Tech',
  'nvidia': 'Big Tech',
  
  // NFT platforms
  'opensea': 'Top NFT marketplace',
  'blur': 'Top NFT marketplace',
  'magiceden': 'Top NFT marketplace',
  
  // Common KOL names (placeholder)
  'vitalik': 'Unnamed Billionaire',
  'cz': 'Unnamed Billionaire',
  'sbf': 'Unnamed Billionaire',
  'do kwon': 'Unnamed Billionaire',
  'justin sun': 'Unnamed Billionaire',
  'roger ver': 'Unnamed Billionaire',
  'charlie lee': 'Unnamed Billionaire',
  'brian armstrong': 'Unnamed Billionaire',
  'jesse powell': 'Unnamed Billionaire',
  'michael saylor': 'Unnamed Billionaire',
  'cathie wood': 'Unnamed Billionaire',
  'ray dalio': 'Unnamed Billionaire',
  'warren buffett': 'Unnamed Billionaire',
  'elon musk': 'Unnamed Billionaire',
  'jack dorsey': 'Unnamed Billionaire',
  'chamath': 'Unnamed Billionaire',
  'naval': 'Unnamed Billionaire',
  'balaji': 'Unnamed Billionaire',
  'pomp': 'Unnamed Billionaire',
  'cobie': 'Unnamed Billionaire',
  'hsaka': 'Unnamed Billionaire',
  'dankrad': 'Unnamed Billionaire',
  'justin drake': 'Unnamed Billionaire',
  'hasu': 'Unnamed Billionaire',
  'su zhu': 'Unnamed Billionaire',
  'kyle davies': 'Unnamed Billionaire',
  'alex mashinsky': 'Unnamed Billionaire',
  'terra': 'Unnamed Protocol',
  'luna': 'Unnamed Token',
  'ust': 'Unnamed Stablecoin',
  'ftt': 'Unnamed Token',
  'sol': 'Unnamed Token',
  'eth': 'Unnamed Token',
  'btc': 'Unnamed Token',
  'bitcoin': 'Unnamed Token',
  'ethereum': 'Unnamed Protocol'
};

export function redact(text: string): string {
  let redacted = text;
  
  // Convert to lowercase for matching
  // Replace known entities
  for (const [entity, replacement] of Object.entries(REDACTION_MAP)) {
    const regex = new RegExp(`\\b${entity}\\b`, 'gi');
    redacted = redacted.replace(regex, replacement);
  }
  
  // Add satire markers for over-the-top claims
  if (redacted.includes('99%') || redacted.includes('100%') || redacted.includes('guaranteed')) {
    redacted = redacted.replace(/(\d+%)/g, '$1 🧪');
  }
  
  if (redacted.includes('signed') || redacted.includes('partnership') || redacted.includes('deal')) {
    redacted = redacted.replace(/(signed|partnership|deal)/gi, '$1 🧱');
  }
  
  return redacted;
}
