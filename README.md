# Heat Stress Pro v3.1.0

Clean GitHub Pages build for wet-bulb temperature, heat index, forecasts, favorites, regional comparison, alert thresholds, and activity guidance.

## What changed in v3.1.0

- Rebuilt from a clean source foundation.
- Removed all demo/sample buttons.
- Added cache-busting version tags to CSS/JS/manifest.
- Updated service worker cache name to force old v2/v3 caches to clear.
- Added visible version label in the app header.
- Added manual calculator, ZIP/current-location forecast, hourly chart, 5-day peak outlook, favorites, regional board, and activity guidance.

## Upload to GitHub

1. Extract this ZIP.
2. Open `https://github.com/bmccann15/heat-stress-pro`.
3. Click **Add file → Upload files**.
4. Drag every extracted file into the repo root.
5. Commit with message: `Clean rebuild to v3.1.0`.
6. Wait for **Actions** to show a green check.
7. Open `https://bmccann15.github.io/heat-stress-pro/?v=3.1.0`.

## iPhone cache fix

If the Home Screen app still shows an older version:

1. Delete the Home Screen icon.
2. Open Safari to `https://bmccann15.github.io/heat-stress-pro/?v=3.1.0`.
3. Refresh once.
4. Add it back to Home Screen.

If still stuck, clear website data for `bmccann15.github.io` in Settings → Safari → Advanced → Website Data.

## Data

Forecast mode uses the National Weather Service API for U.S. hourly forecast/grid data and zippopotam.us for ZIP code geocoding.
