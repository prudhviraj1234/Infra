# Infrastructure Issue Trend Tracker

A responsive React dashboard for monitoring infrastructure incidents across the OD and IMS teams.

The dashboard loads incident data from the handover APIs and derives summary cards, trend data, status distribution, and priority distribution from the returned incident records.

## Demo Overview

- Live incident data from the OD API
- Live incident data from the IMS API
- Combined OD + IMS data with the `ALL` team filter
- Date filtering based on the incident `created_at` / opened date
- KPI cards for total, open, resolved, and transferred incidents
- Incident trend chart grouped by opened date
- Status and priority donut charts
- Search, status, and priority filters in the incident table
- Excel export for filtered incident data
- Responsive layout for desktop, tablet, and mobile screens

## Requirements

- Node.js 20 or newer
- npm
- Network access to the internal incident API host
- API access and CORS permission from the browser origin

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

## Demo Flow

1. Start the app with `npm run dev`.
2. Open the dashboard from a machine connected to the internal network.
3. Select `OD` to load OD incidents.
4. Select `IMS` to load IMS incidents.
5. Select `ALL` to load and combine both responses.
6. Use From and To to filter by the incident opened date.
7. Search by incident ID, summary, team, or service.
8. Apply status and priority filters.
9. Export the filtered table to Excel.

## API Integration

| Team | Endpoint |
| --- | --- |
| OD | `http://pla-w@ligni02:3010/service/handover/incident/?group=MS%20SQL%20Database%20L2` |
| IMS | `http://pla-w@ligni02:3010/service/handover/incident/?group=IMS%20L2` |

When `ALL` is selected, both endpoints are requested and successful responses are merged into one incident list. Requests use `cache: "no-store"` and a refresh query parameter to request fresh data.

## API Field Mapping

| API field | Dashboard usage |
| --- | --- |
| `number` | Incident ID |
| `created_at` | Opened date and trend grouping |
| `resolved_at` | Resolved date |
| `group` | Team/service display |
| `title` | Incident summary |
| `description` | Summary fallback |
| `parent` | CI value |
| `priority` | Priority badge and chart |
| `assignee` | Device/owner display |
| `problem` | Cause display |
| `state` | Status badge and chart |

Expected response: an array of incident objects.

## Dashboard Behavior

- `OD` requests only the OD endpoint.
- `IMS` requests only the IMS endpoint.
- `ALL` requests both endpoints and combines their results.
- Date controls filter the loaded incidents using `created_at`, displayed as Opened.
- Cards, charts, and the table update from the filtered incident set.
- Loading appears during initial load, team changes, refreshes, and date changes.
- If one endpoint fails in `ALL`, successful data from the other endpoint remains available.

## Project Structure

```text
src/
	Components/
		Header.jsx          Team and date controls
		IncidentTable.jsx   Searchable, filterable incident table
		StatCard.jsx        KPI card component
		TrendChart.jsx      Opened-date trend chart
		DonutChart.jsx      Status and priority charts
	pages/
		Dashboard.jsx       API loading and data processing
	data/
		dashboard.json      Legacy local data file; not used as an API fallback
	index.css             Responsive dashboard and table styles
```

## Troubleshooting

### The dashboard is empty

Verify that the internal API host is reachable from the browser machine. DNS, VPN, network access, or CORS can prevent access to `ligni02`.

### `ALL` shows only one team

Verify both endpoint URLs independently. `ALL` can only display data from endpoints that respond successfully.

### The development server does not start

```bash
npm install
npm run dev
```

Use another port if necessary:

```bash
npm run dev -- --port 5174
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
