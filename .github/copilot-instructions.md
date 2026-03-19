# Cofinet Offer List

Next.js app for Cofinet specialty coffee offer list. Users upload a CSV file and the app displays lots by category (Microlots, Exotics, Upcoming Coffee, Regional, Regional Plus, Single Estate) with filtering by destination country.

## Stack
- Next.js 15 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- PapaParse (CSV parsing)

## CSV Format
Columns: `producer, farm, origin, varietal, process, score, flavor_profile, bags, kg_per_bag, price, currency, category, country`

Categories: `microlots | exotics | upcoming-coffee | regional | regional-plus | single-estate`

## Dev
```
npm run dev
```
