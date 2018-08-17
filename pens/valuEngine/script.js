console.clear(); // optional

const data = [
  // Canada - Toronto Venture
  { ticker: "A-X", success: true, region: 2, exchange: "X" },
  { ticker: "BTL-X", success: false, region: 2, exchange: "X" },
  { ticker: "CRON-X", success: false, region: 2, exchange: "X" },
  { ticker: "DLI-X", success: false, region: 2, exchange: "X" },
  { ticker: "HEMP-X", success: false, region: 2, exchange: "X" },
  { ticker: "HUT-X", success: false, region: 2, exchange: "X" },
  { ticker: "IPA-X", success: false, region: 2, exchange: "X" },
  { ticker: "KUU-X", success: false, region: 2, exchange: "X" },
  { ticker: "LRT-DB-G-X", success: false, region: 2, exchange: "X" },
  { ticker: "OGI-X", success: true, region: 2, exchange: "X" },
  { ticker: "SOG-X", success: true, region: 2, exchange: "X" },
  { ticker: "TBP-WT-X", success: false, region: 2, exchange: "X" },
  { ticker: "TBP-WT-X", success: false, region: 2, exchange: "X" },
  { ticker: "WMD-X", success: false, region: 2, exchange: "X" },
  // Canada - Toronto (TSX)
  { ticker: "AX-UN-T", success: false, region: 2, exchange: "T" },
  { ticker: "BCE-T", success: true, region: 2, exchange: "T" },
  { ticker: "CRON-T", success: false, region: 2, exchange: "T" },
  { ticker: "CSU-T", success: true, region: 2, exchange: "T" },
  { ticker: "EMP-A-T", success: false, region: 2, exchange: "T" },
  { ticker: "ENB-PF-E-T", success: false, region: 2, exchange: "T" },
  { ticker: "ENB-T", success: true, region: 2, exchange: "T" },
  { ticker: "ENF-T", success: true, region: 2, exchange: "T" },
  { ticker: "MG-T", success: true, region: 2, exchange: "T" },
  { ticker: "RCI-B-T", success: false, region: 2, exchange: "T" },
  { ticker: "RY-T", success: true, region: 2, exchange: "T" },
  { ticker: "SU-T", success: true, region: 2, exchange: "T" },
  { ticker: "TECK-B-T", success: false, region: 2, exchange: "T" },
  { ticker: "WEED-T", success: false, region: 2, exchange: "T" },
  // America - NYSE - New York Stock Exchange
  { ticker: "AGCO", success: true, region: 1, exchange: "N" },
  { ticker: "BA", success: true, region: 1, exchange: "N" },
  { ticker: "BABA", success: true, region: 1, exchange: "N" },
  { ticker: "BBY", success: true, region: 1, exchange: "N" },
  { ticker: "BRK-A-N", success: true, region: 1, exchange: "N" },
  { ticker: "CPLG", success: false, region: 1, exchange: "N" },
  { ticker: "FRO", success: true, region: 1, exchange: "N" },
  { ticker: "JNJ-N", success: true, region: 1, exchange: "N" },
  { ticker: "JWN", success: true, region: 1, exchange: "N" },
  { ticker: "NOAH", success: true, region: 1, exchange: "N" },
  { ticker: "NWHM", success: true, region: 1, exchange: "N" },
  { ticker: "TWX-N", success: false, region: 1, exchange: "N" },
  { ticker: "WMT", success: true, region: 1, exchange: "N" },
  { ticker: "ZOES", success: true, region: 1, exchange: "N" },
  // America - AMEX = American Stock Exchange
  { ticker: "FSP", success: true, region: 1, exchange: "A" },
  { ticker: "GBR", success: false, region: 1, exchange: "A" },
  { ticker: "GORO", success: false, region: 1, exchange: "A" },
  { ticker: "IEC", success: true, region: 1, exchange: "A" },
  { ticker: "LEU", success: false, region: 1, exchange: "A" },
  { ticker: "MAG", success: true, region: 1, exchange: "A" },
  { ticker: "NOG", success: true, region: 1, exchange: "A" },
  { ticker: "SAND", success: true, region: 1, exchange: "A" },
  { ticker: "SNMP", success: true, region: 1, exchange: "A" },
  { ticker: "SVM", success: true, region: 1, exchange: "A" },
  { ticker: "TIK", success: false, region: 1, exchange: "A" },
  { ticker: "TMP-A", success: false, region: 1, exchange: "A" },
  { ticker: "TRXC", success: true, region: 1, exchange: "A" },
  { ticker: "USAS", success: true, region: 1, exchange: "A" },
  // America - Nasdaq
  { ticker: "AAPL", success: true, region: 1, exchange: "Q" },
  { ticker: "ADSK", success: true, region: 1, exchange: "Q" },
  { ticker: "AMZN", success: true, region: 1, exchange: "Q" },
  { ticker: "CSCO", success: true, region: 1, exchange: "Q" },
  { ticker: "ESIO", success: true, region: 1, exchange: "Q" },
  { ticker: "FOXA", success: true, region: 1, exchange: "Q" },
  { ticker: "GOOG", success: true, region: 1, exchange: "Q" },
  { ticker: "GOOGL", success: true, region: 1, exchange: "Q" },
  { ticker: "MSFT", success: true, region: 1, exchange: "Q" },
  { ticker: "NANO", success: true, region: 1, exchange: "Q" },
  { ticker: "NFLX", success: true, region: 1, exchange: "Q" },
  { ticker: "NVDA", success: true, region: 1, exchange: "Q" },
  { ticker: "SRAX", success: true, region: 1, exchange: "Q" }
];

const region = {
  1: "1 / America",
  2: "2 / Canada"
};

const exchange = {
  X: "TSE",
  T: "TSX",
  N: "NTSE",
  A: "AMEX",
  Q: "NAS"
};

const success = "✅"; // PDF url displays successfully.
const failure = "❌"; // PDF url results in 404 page.

const tab = ","; // comma seperated values
const nl = "\n";

const SYMBOL = "{SYMBOL}";
const REGION = "{REGION}";

// valuEngine unique identifiers
const uid = "1234567";
const client = "75";

// pagebulider page
const local = "http://arc-local.theglobeandmail.com:8888/pb/investing/markets/stocks/{SYMBOL}/";
const dev = "https://arc-dev.theglobeandmail.com/investing/markets/stocks/{SYMBOL}/";
const prod = "https://www.theglobeandmail.com/investing/markets/stocks/{SYMBOL}/";

// amazon web services API
const amazon = "https://tg4b1hf6m1.execute-api.ca-central-1.amazonaws.com/pb/valuengine-report.pdf?symbol={SYMBOL}&amp;region={REGION}&amp;uid=" + uid;

// valuEngine API
const engine = `https://www.valuengine.com/api/report/{REGION}/{SYMBOL}/${client}/${uid}`;

// output the header
let header = [
  "Region",
  "Exchange",
  "PDF success",
  "valuEngine API",
  "AWS Proxy API",
  "PageBuilder production",
  "PageBuilder arc-dev",
  "PageBuilder arc-local"
];
header = `<strong>${header.join(tab)}</strong>${nl}`;

let last = data[0].exchange;
let rows = [];

const link = (href) => `<a href="${href}">${href}</a>`;

data.forEach(item => {
  let row = [];

  // Convert Barchart symbol to valuEngine symbol
  let tick = item.ticker;
  tick = tick.replace("-" + item.exchange, "");
  tick = tick.replace("-", ".");

  // Region
  row.push(region[item.region]);

  // Exchange
  row.push(exchange[item.exchange]);

  // PDF success
  row.push(`${item.success ? success : failure}`);

  // valuEngine API (don't link)
  let ve = engine;
  ve = ve.replace(SYMBOL, tick);
  ve = ve.replace(REGION, item.region);
  row.push(ve);

  // AWS Proxy API
  let aws = amazon;
  aws = aws.replace(SYMBOL, tick);
  aws = aws.replace(REGION, item.region);
  aws = link(aws);
  row.push(aws);

  // PageBuilder production
  let p = prod;
  p = p.replace(SYMBOL, item.ticker);
  p = link(p);
  row.push(p);

  // PageBuilder arc-dev
  let d = dev;
  d = d.replace(SYMBOL, item.ticker);
  d = link(d);
  row.push(d);

  // PageBuilder arc-local
  let l = local;
  l = l.replace(SYMBOL, item.ticker);
  l = link(l);
  row.push(l);

  // Seperate exchanges with an extra newline
  if (last !== item.exchange) {
    last = item.exchange;
    rows.push(`<br>${nl}`);
  }

  rows.push(`<div>${row.join(tab)}</div>`);
});

document.getElementById("output").innerHTML = header + rows.join(nl);
