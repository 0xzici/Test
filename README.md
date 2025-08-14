# LP Dashboard MVP

Minimal single-page Uniswap v3 LP dashboard built with Next.js 14, Tailwind CSS and Dexie. All data is mocked locally.

## Development

```bash
npm install
npm run dev
```

If npm packages are unavailable the project will not build, but the source code can be inspected.

## Features
- Add positions manually via token id
- Aggregate KPIs across positions
- Manual refresh with local snapshots
- Set manual cost per position
- Toggle reference currency (USD/ETH)

The data layer uses Dexie/IndexedDB; mocked API calls live in `lib/api.ts` and can be swapped with real chain calls.
