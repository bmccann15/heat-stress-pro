# Heat Stress Pro

A free, static, iPhone-friendly web app for calculating:

- Wet bulb temperature
- Heat index
- Relative humidity
- Dew point
- Basic heat-stress category

It works as a Progressive Web App when hosted on GitHub Pages.

## How to publish on GitHub Pages

1. Create a new GitHub repository, for example `heat-stress-pro`.
2. Upload all files in this folder to the repository root:
   - `index.html`
   - `style.css`
   - `app.js`
   - `manifest.webmanifest`
   - `service-worker.js`
   - `icons/`
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
5. Click **Save**.
6. After a minute or two, GitHub will show your site URL.

It will usually look like:

`https://YOUR-USERNAME.github.io/heat-stress-pro/`

## Install on iPhone

1. Open the GitHub Pages URL in Safari.
2. Tap the Share button.
3. Tap **Add to Home Screen**.
4. Name it `Heat Stress`.
5. Tap **Add**.

## Notes

- Wet bulb is calculated using the Stull approximation.
- Heat index uses the standard NOAA/NWS-style regression formula.
- This is for practical guidance, not medical diagnosis or official occupational safety decisions.
