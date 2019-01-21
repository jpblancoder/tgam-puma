console.clear(); // optional


// regions must match expected valuEngine API endpoint regions
const region = {
  1: "America",
  2: "Canada"
};

// abbreviated exchange values, used for display and stockCalc url
const exchange = {
  X: "TSX", // Toronto Venture
  T: "TSE", // Toronto Stock Exchange
  N: "NYS", // New York Stock Exchange
  A: "ASE", // American Stock Exchange
  Q: "NAS"  // Nasdaq
};

// all metadata was taken from Barchart stock details API:
// e.g. https://globeandmail.pl.barchart.com/page/stockDetail?symbol=A-X
const stocks = [
  {
    region: 2,
    exchange_abbr: "X",
    label: "Toronto Venture",
    stocks: [
      {
        symbol: "A.VN",
        symbolName: "Armor Minerals Inc",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "A-X",
        ve: 404, // valuEngine - expected result
        sc: 200, // stockCalc - expected result
        bc: 200 // Barchart - expected result
      },
      {
        symbol: "BTL.VN",
        symbolName: "Btl Group Ltd",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "BTL-X",
        ve: 404,
        sc: 404,
        bc: 200
      },
      {
        symbol: "DLI.VN",
        symbolName: "Desert Lion Energy Inc.",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "DLI-X",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "HEMP.VN",
        symbolName: "Hempco Food and Fiber Inc",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "HEMP-X",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "HUT.VN",
        symbolName: "Hut 8 Mining Corp",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "HUT-X",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "IPA.VN",
        symbolName: "Immunoprecise Antibodies Ltd",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "IPA-X",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "KUU.VN",
        symbolName: "Kuuhubb Inc",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "KUU-X",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "LRT-DB-G.VN",
        symbolName: "Lanesborough REIT 5.0 Pct Ser G Debs",
        assetType: "UIT",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "LRT-DB-G-X",
        ve: 404,
        sc: 404,
        bc: 200
      },
      {
        symbol: "OGI.VN",
        symbolName: "Organigram Holdings Inc",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "OGI-X",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "SOG.VN",
        symbolName: "Strategic Oil and Gas Ltd",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "SOG-X",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "TBP-WT.VN",
        symbolName: "Tetra Bio Pharma Inc Wts",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "TBP-WT-X",
        ve: 404,
        sc: 404,
        bc: 200
      },
      {
        symbol: "WMD.VN",
        symbolName: "Weedmd Inc",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "WMD-X",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "SXL.VN",
        symbolName: "Slam Exploration Inc",
        assetType: "STK",
        exchange: "TSX Venture",
        exchange_abbr: "X",
        fundFamily: "N/A",
        region: "US",
        ticker: "SXL-X",
        ve: 404,
        sc: 200,
        bc: 200
      }
    ]
  },
  {
    region: 2,
    exchange_abbr: "T",
    label: "Toronto Stock Exchange",
    stocks: [
      {
        symbol: "AX-UN.TO",
        symbolName: "Artis Real Estate Investment Trust Units",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "AX-UN-T",
        exchange_abbr: "T",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "BCE.TO",
        symbolName: "BCE Inc",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "BCE-T",
        exchange_abbr: "T",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "CRON.TO",
        symbolName: "Cronos Group Inc",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "CRON-T",
        exchange_abbr: "T",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "CSU.TO",
        symbolName: "Constellation Software Inc",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "CSU-T",
        exchange_abbr: "T",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "EMP-A.TO",
        symbolName: "Empire Company Limited",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "EMP-A-T",
        exchange_abbr: "T",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "ENB-PF-E.TO",
        symbolName: "Enbridge Inc Pref Ser 13",
        assetType: "UIT",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "ENB-PF-E-T",
        exchange_abbr: "T",
        ve: 404,
        sc: 404,
        bc: 200
      },
      {
        symbol: "ENB.TO",
        symbolName: "Enbridge Inc",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "ENB-T",
        exchange_abbr: "T",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "ENF.TO",
        symbolName: "Enbridge Income Fund Holdings Inc",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "ENF-T",
        exchange_abbr: "T",
        ve: 404,
        sc: 404,
        bc: 200
      },
      {
        symbol: "MG.TO",
        symbolName: "Magna International Inc",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "MG-T",
        exchange_abbr: "T",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "RCI-B.TO",
        symbolName: "Rogers Communications Inc Cl.B Nv",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "RCI-B-T",
        exchange_abbr: "T",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "RY.TO",
        symbolName: "Royal Bank of Canada",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "RY-T",
        exchange_abbr: "T",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "SU.TO",
        symbolName: "Suncor Energy Inc",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "SU-T",
        exchange_abbr: "T",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "TECK-B.TO",
        symbolName: "Teck Resources Limited Cl B",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "TECK-B-T",
        exchange_abbr: "T",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "WEED.TO",
        symbolName: "Canopy Growth Corp",
        assetType: "STK",
        exchange: "TSX",
        fundFamily: "N/A",
        region: "CA",
        ticker: "WEED-T",
        exchange_abbr: "T",
        ve: 404,
        sc: 200,
        bc: 200
      }
    ]
  },
  {
    region: 1,
    exchange_abbr: "N",
    label: "New York Stock Exchange",
    stocks: [
      {
        symbol: "AGCO",
        symbolName: "Agco Corp",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "AGCO-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "BA",
        symbolName: "Boeing Company",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "BA-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "BABA",
        symbolName: "Alibaba Group Holding Ltd",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "BABA-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "BBY",
        symbolName: "Best Buy Co",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "BBY-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "BRK.A",
        symbolName: "Berkshire Hath Hld Cl A",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "BRK-A-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 404,
        bc: 200
      },
      {
        symbol: "CPLG",
        symbolName: "Corepoint Lodging Inc",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "CPLG-N",
        exchange_abbr: "N",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "FRO",
        symbolName: "Frontline Ltd",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "FRO-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "JNJ",
        symbolName: "Johnson & Johnson",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "JNJ-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "JWN",
        symbolName: "Nordstrom",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "JWN-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "NOAH",
        symbolName: "Noah Holdings Ltd",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "NOAH-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "NWHM",
        symbolName: "New Home Co Llc",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "NWHM-N",
        exchange_abbr: "N",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "TWX",
        symbolName: "Time Warner Inc",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "TWX-N",
        exchange_abbr: "N",
        ve: 404,
        sc: 404,
        bc: 404
      },
      {
        symbol: "WMT",
        symbolName: "Wal-Mart Stores",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "WMT-N",
        exchange_abbr: "N",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "ZOES",
        symbolName: "Zoe's Kitchen Inc",
        assetType: "STK",
        exchange: "NYSE",
        fundFamily: "N/A",
        region: "US",
        ticker: "ZOES-N",
        exchange_abbr: "N",
        ve: 404,
        sc: 404,
        bc: 200
      }
    ]
  },
  {
    region: 1,
    label: "American Stock Exchange",
    exchange_abbr: "A",
    stocks: [
      {
        symbol: "FSP",
        symbolName: "Franklin Street Properties",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "FSP",
        exchange_abbr: "A",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "GBR",
        symbolName: "New Concept Energy Inc",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "GBR",
        exchange_abbr: "A",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "GORO",
        symbolName: "Gold Resource Corp",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "GORO",
        exchange_abbr: "A",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "IEC",
        symbolName: "IEC Electronics",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "IEC",
        exchange_abbr: "A",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "LEU",
        symbolName: "Centrus Energy Corp",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "LEU",
        exchange_abbr: "A",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "MAG",
        symbolName: "MAG Silver Corp",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "MAG",
        exchange_abbr: "A",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "NOG",
        symbolName: "Northern Oil and Gas",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "NOG",
        exchange_abbr: "A",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "SAND",
        symbolName: "Sandstorm Gold Ltd",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "SAND",
        exchange_abbr: "A",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "SNMP",
        symbolName: "Sanchez Midstream Partners LP",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "SNMP",
        exchange_abbr: "A",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "SVM",
        symbolName: "Silvercorp Metals Inc",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "SVM",
        exchange_abbr: "A",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "TIK",
        symbolName: "Tel-Instrument Electronics",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "TIK",
        exchange_abbr: "A",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "TMP",
        symbolName: "Tompkinstrustco",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "TMP",
        exchange_abbr: "A",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "TRXC",
        symbolName: "Transenterix Inc",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "TRXC",
        exchange_abbr: "A",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "USAS",
        symbolName: "Americas Silver Corp",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "USAS",
        exchange_abbr: "A",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "CCF",
        symbolName: "Chase Corp",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "CCF",
        exchange_abbr: "A",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "TGB",
        symbolName: "Taseko Mines Ltd",
        assetType: "STK",
        exchange: "NYSE Arca",
        fundFamily: "N/A",
        region: "US",
        ticker: "TGB",
        exchange_abbr: "A",
        ve: 200,
        sc: 200,
        bc: 200
      }
    ]
  },
  {
    region: 1,
    label: "Nasdaq",
    exchange_abbr: "Q",
    stocks: [
      {
        symbol: "AAPL",
        symbolName: "Apple Inc",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "AAPL-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "ADSK",
        symbolName: "Autodesk Inc",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "ADSK-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "AMZN",
        symbolName: "Amazon.Com Inc",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "AMZN-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "CSCO",
        symbolName: "Cisco Systems Inc",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "CSCO-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "ESIO",
        symbolName: "Electro Sci Inds",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "ESIO-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "FOXA",
        symbolName: "21st Centry Fox Class A",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "FOXA-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "GOOG",
        symbolName: "Alphabet Class C",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "GOOG-Q",
        exchange_abbr: "Q",
        ve: 404,
        sc: 200,
        bc: 200
      },
      {
        symbol: "GOOGL",
        symbolName: "Alphabet Class A",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "GOOGL-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "MSFT",
        symbolName: "Microsoft Corp",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "MSFT-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "NANO",
        symbolName: "Nanometrics Inc",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "NANO-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "NFLX",
        symbolName: "Netflix Inc",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "NFLX-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "NVDA",
        symbolName: "Nvidia Corp",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "NVDA-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      },
      {
        symbol: "SRAX",
        symbolName: "Social Reality Inc",
        assetType: "STK",
        exchange: "NASDAQ",
        fundFamily: "N/A",
        region: "US",
        ticker: "SRAX-Q",
        exchange_abbr: "Q",
        ve: 200,
        sc: 200,
        bc: 200
      }
    ]
  }
];

// status of exchange_abbr
const success = "✅ present"; // 200 and property present
const failure = "❌ no response"; // 404 for entire request
const missing = "❓ missing"; // 200 but property missing

const tab = ","; // comma seperated values
const nl = "\n";

const TICKER = "{TICKER}";

// pagebulider page
const local = "http://arc-local.theglobeandmail.com:8888/pb/investing/markets/stocks/{TICKER}/";
const dev = "https://arc-dev.theglobeandmail.com/investing/markets/stocks/{TICKER}/";
const prod = "https://www.theglobeandmail.com/investing/markets/stocks/{TICKER}/";

// Barchart APIs
const bcStockDetail = "https://globeandmail.pl.barchart.com/page/stockDetail?symbol={TICKER}";

// output the header
let header = [
  "Region",
  "Exchange",
  "meta.exchange_abbr",
  "Barchart API",
  "PageBuilder production",
  "PageBuilder arc-dev",
  "PageBuilder arc-local"
];
header = `<strong>${header.join(tab)}</strong>${nl}`;

let last = exchange[stocks[0].exchange_abbr];
let rows = [];

const link = (href) => `<a href="${href}">${href}</a>`;

stocks.forEach(item => {
  item.stocks.forEach(stock => {
    let row = [];

    // Region
    row.push(region[item.region]);

    // Exchange
    row.push(exchange[item.exchange_abbr]);

    // meta.exchange_abbr
    row.push(`${stock.bc === 200 ? success : (stock.bc === 500 ? missing : failure)}`);

    // Barchart API link
    let bcSD = bcStockDetail;
    bcSD = bcSD.replace(TICKER, stock.ticker);
    bcSD = link(bcSD);
    row.push(bcSD);

    // PageBuilder production
    let p = prod;
    p = p.replace(TICKER, stock.ticker);
    p = link(p);
    row.push(p);

    // PageBuilder arc-dev
    let d = dev;
    d = d.replace(TICKER, stock.ticker);
    d = link(d);
    row.push(d);

    // PageBuilder arc-local
    let l = local;
    l = l.replace(TICKER, stock.ticker);
    l = link(l);
    row.push(l);

    // Seperate exchanges with an extra newline
    if (last !== item.exchange_abbr) {
      last = item.exchange_abbr;
      rows.push(`<br>${nl}`);
    }

    rows.push(`<div>${row.join(tab)}</div>`);
  });
});

const out = document.getElementById("output");
if (out) {
  out.innerHTML = header + rows.join(nl);
}
