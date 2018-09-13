console.clear(); // optional

// regions must match expected valuEngine API endpoint regions
const region = {
  1: "America",
  2: "Canada"
};

// abbreviated exchange values must match Barchart API provided values
const exchange = {
  X: "TSE",
  T: "TSX",
  N: "NTSE",
  A: "AMEX",
  Q: "NAS"
};

// all symbols must be Barchart API metadata provided values
const data = [
  {
    region: 2,
    exchange: "X",
    label: "Toronto Venture",
    stocks: [
      { symbol: "A-X", expect: 200 },
      { symbol: "BTL-X", expect: 404 },
      { symbol: "CRON-X", expect: 200 },
      { symbol: "DLI-X", expect: 404 },
      { symbol: "HEMP-X", expect: 404 },
      { symbol: "HUT-X", expect: 404 },
      { symbol: "IPA-X", expect: 404 },
      { symbol: "KUU-X", expect: 404 },
      { symbol: "LRT-DB-G-X", expect: 404 },
      { symbol: "OGI-X", expect: 200 },
      { symbol: "SOG-X", expect: 200 },
      { symbol: "TBP-WT-X", expect: 404 },
      { symbol: "TBP-WT-X", expect: 404 },
      { symbol: "WMD-X", expect: 404 }
    ]
  },
  {
    region: 2,
    exchange: "T",
    label: "Toronto",
    stocks: [
      { symbol: "AX-UN-T", expect: 200 },
      { symbol: "BCE-T", expect: 200 },
      { symbol: "CRON-T", expect: 200 },
      { symbol: "CSU-T", expect: 200 },
      { symbol: "EMP-A-T", expect: 200 },
      { symbol: "ENB-PF-E-T", expect: 404 },
      { symbol: "ENB-T", expect: 200 },
      { symbol: "ENF-T", expect: 200 },
      { symbol: "MG-T", expect: 200 },
      { symbol: "RCI-B-T", expect: 200 },
      { symbol: "RY-T", expect: 200 },
      { symbol: "SU-T", expect: 200 },
      { symbol: "TECK-B-T", expect: 200 },
      { symbol: "WEED-T", expect: 404 }
    ]
  },
  {
    region: 1,
    exchange: "N",
    label: "New York Stock Exchange",
    stocks: [
      { symbol: "AGCO", expect: 200 },
      { symbol: "BA", expect: 200 },
      { symbol: "BABA", expect: 200 },
      { symbol: "BBY", expect: 200 },
      { symbol: "BRK-A-N", expect: 200 },
      { symbol: "CPLG", expect: 404 },
      { symbol: "FRO", expect: 200 },
      { symbol: "JNJ-N", expect: 200 },
      { symbol: "JWN", expect: 200 },
      { symbol: "NOAH", expect: 200 },
      { symbol: "NWHM", expect: 200 },
      { symbol: "TWX-N", expect: 404 },
      { symbol: "WMT", expect: 200 },
      { symbol: "ZOES", expect: 200 }
    ]
  },
  {
    region: 1,
    label: "American Stock Exchange",
    exchange: "A",
    stocks: [
      { symbol: "FSP", expect: 200 },
      { symbol: "GBR", expect: 404 },
      { symbol: "GORO", expect: 404 },
      { symbol: "IEC", expect: 200 },
      { symbol: "LEU", expect: 404 },
      { symbol: "MAG", expect: 200 },
      { symbol: "NOG", expect: 200 },
      { symbol: "SAND", expect: 200 },
      { symbol: "SNMP", expect: 200 },
      { symbol: "SVM", expect: 200 },
      { symbol: "TIK", expect: 404 },
      { symbol: "TMP-A", expect: 404 },
      { symbol: "TRXC", expect: 200 },
      { symbol: "USAS", expect: 200 }
    ]
  },
  {
    region: 1,
    label: "Nasdaq",
    exchange: "Q",
    stocks: [
      { symbol: "AAPL", expect: 200 },
      { symbol: "ADSK", expect: 200 },
      { symbol: "AMZN", expect: 200 },
      { symbol: "CSCO", expect: 200 },
      { symbol: "ESIO", expect: 200 },
      { symbol: "FOXA", expect: 200 },
      { symbol: "GOOG", expect: 404 },
      { symbol: "GOOGL", expect: 200 },
      { symbol: "MSFT", expect: 200 },
      { symbol: "NANO", expect: 200 },
      { symbol: "NFLX", expect: 200 },
      { symbol: "NVDA", expect: 200 },
      { symbol: "SRAX", expect: 200 }
    ]
  }
];

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

/**
 * @method mapSymbol
 * @description Convert Barchart symbol to valuEngine symbol.
 * This logic must matches what is done in PageBuilder valuEngine feature.
 * @param {String} ticker - of stock
 * @param {String} exchange - of stock
 * @return {String}
 */
function mapSymbol(ticker, exchange) {
  let tick = ticker;
  tick = tick.replace("-" + exchange, "");
  tick = tick.replace("-", ".");
  return tick;
}

data.forEach(item => {
  item.stocks.forEach(stock => {
    let row = [];

    // Convert Barchart symbol to valuEngine symbol
    let tick = mapSymbol(stock.symbol, item.exchange);

    // Region
    row.push(region[item.region]);

    // Exchange
    row.push(exchange[item.exchange]);

    // PDF success
    row.push(`${stock.expect === 200 ? success : failure}`);

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
    p = p.replace(SYMBOL, stock.symbol);
    p = link(p);
    row.push(p);

    // PageBuilder arc-dev
    let d = dev;
    d = d.replace(SYMBOL, stock.symbol);
    d = link(d);
    row.push(d);

    // PageBuilder arc-local
    let l = local;
    l = l.replace(SYMBOL, stock.symbol);
    l = link(l);
    row.push(l);

    // Seperate exchanges with an extra newline
    if (last !== item.exchange) {
      last = item.exchange;
      rows.push(`<br>${nl}`);
    }

    rows.push(`<div>${row.join(tab)}</div>`);
  });
});

document.getElementById("output").innerHTML = header + rows.join(nl);
