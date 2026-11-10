# Drug Candidate Explorer

## Requirements

- Node.js 20.9+ (Node.js 22 LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. To verify the production build and tests:

```bash
npm run test
npm run lint
npm run build
npm run start
```

## Features

- Responsive listing with name, status, description and therapeutic area
- Debounced, case-insensitive name search (300 ms)
- Status filter and reset
- Paginated server-side API (default six items per page)
- Dedicated detail page with mechanism of action, side effects and phase
- Loading skeletons, empty/error states and retry button
- Semantic headings, form labels, focus indicators and accessible status updates
- Unit/component tests and typed API/repository boundary

## API

`GET /api/drugs?search=onc&status=In%20Development&page=1&pageSize=6`

Response: `{ items: Drug[], total: number, page: number, pageSize: number, totalPages: number }`.

`GET /api/drugs/1` returns one candidate or HTTP 404. Invalid page/pageSize/status returns HTTP 400. Page size is capped at 100.

## Architecture and scaling

`app/` holds pages and API handlers, `components/` holds reusable UI, `lib/types.ts` defines the contract, `lib/repository.ts` owns query logic, and `data/drugs.json` is the mock data store. The UI communicates with the API rather than importing JSON directly. The details page reads from the same repository server-side, avoiding an unnecessary self-HTTP request.

**Large-data strategy:** Search/filter/pagination are expressed as API parameters and only one page is transmitted. The current in-memory repository still scans the entire small JSON dataset (O(n)); it is **not** itself suitable for millions of records. In production replace the repository with a database implementation using indexed name/status search, stable ordering, cursor pagination for deep pages, and authorization/observability as required. This keeps the API and UI contracts stable. A virtualized list may be appropriate if large pages are ever needed.

The browser cancels stale requests with `AbortController` and debounces typing. Client-side API requests are uncached to keep filtering behavior predictable.

## Testing

`tests/repository.test.ts` covers name filtering, status filtering, pagination, missing IDs and empty results. `tests/status-badge.test.tsx` checks component rendering. Further production work would add MSW-powered integration tests, API route tests, keyboard/a11y audits, and Playwright end-to-end tests.

## Walkthrough outline

1. Demonstrate homepage and responsive cards.
2. Search `onc`, filter by status, reset and paginate.
3. Open a candidate detail and navigate back.
4. Show API response and 404 behavior.
5. Explain data contracts, server-side filtering/pagination, abortable fetch, test coverage and production scaling tradeoffs.
