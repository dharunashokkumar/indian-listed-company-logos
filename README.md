# Indian Listed Company Logos

A searchable static directory of NSE and BSE listed company logos, built for GitHub Pages.

Live page target: <https://dharunashokkumar.github.io/indian-listed-company-logos/>

## What Is Included

- `3156` SVG logos split into `nse/` and `bse/`
- `data/logos.json` for the browser search index
- `data/logo_metadata.full.json` with full metadata
- Search by ticker, company name, sector, industry, ISIN, or index name
- Filter by exchange, sector, and index membership
- Sort by relevance, market cap, ticker, company, or sector
- Download one logo or bulk ZIP files as SVG, PNG, or JPG
- Static API builder for copy-ready logo URLs and embed snippets

## Use As A Static Logo API

GitHub Pages cannot run a dynamic `/logo?ticker=TCS` backend, so the public API is static and cache-friendly.

Direct SVG URL pattern:

```text
https://dharunashokkumar.github.io/indian-listed-company-logos/nse/NSE_TCS.svg
https://dharunashokkumar.github.io/indian-listed-company-logos/bse/BSE_TCS.svg
```

When you know the exchange and ticker, use the direct SVG URL in an app:

```html
<img
  src="https://dharunashokkumar.github.io/indian-listed-company-logos/nse/NSE_TCS.svg"
  alt="TCS logo"
  loading="lazy"
/>
```

When you only know the ticker, fetch the manifest and resolve the logo file:

```js
const BASE = "https://dharunashokkumar.github.io/indian-listed-company-logos/";
const ticker = "TCS";

const data = await fetch(`${BASE}data/logos.json`).then((response) => response.json());
const logo = data.logos.find((item) => item.exchange === "NSE" && item.ticker === ticker);
const logoUrl = logo ? new URL(logo.file, BASE).href : null;
```

The homepage form can also generate the direct SVG URL, HTML snippet, and manifest URL for any available ticker.

## Analytics

GitHub repository traffic shows repository-level views and clones, but not page-level downloads.

For page analytics and download counts, create a Google Analytics 4 web stream and put the measurement ID in `analytics.js`:

```js
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

The page sends these GA4 events when configured:

- `logo_download`
- `bulk_download`
- `search_results`
- `format_change`

## Development

Serve locally from the repository root:

```bash
npm run serve
```

Rebuild browser data after refreshing metadata:

```bash
./tools/scrape_logo_metadata.py --refresh
npm run build:data
```

## Data Source

Metadata was built from TradingView's India scanner endpoint and the SVG filenames. The `oneLine` field is derived from scraped sector and industry metadata.

## Trademark Notice

Company logos and trademarks belong to their respective owners. This repository is an index for discovery and download convenience; review each company's brand usage rules before production use.
