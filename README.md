# Heat Stress Pro v2.0

Static GitHub Pages app for wet bulb, heat index, dew point/RH conversion, and U.S. hourly forecasts.

## Upgrade steps

1. Extract `heat-stress-pro-v2.zip`.
2. Open your GitHub repo: https://github.com/bmccann15/heat-stress-pro
3. Click **Add file → Upload files**.
4. Drag these extracted files into the repo root:
   - `index.html`
   - `manifest.json`
   - `icon.svg`
   - `service-worker.js`
   - `README.md`
5. Commit changes.
6. Wait for GitHub Pages to redeploy.
7. Open https://bmccann15.github.io/heat-stress-pro/

## Forecast source

Forecast mode uses free public APIs:
- Zippopotam.us for U.S. ZIP code to lat/lon lookup
- National Weather Service API for hourly forecast data

NWS data only supports U.S. locations.
