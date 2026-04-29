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
