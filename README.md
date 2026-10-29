# Telugu temple wedding invitation

An original mobile-first React 18 / Vite invitation with Tailwind 3, React Router 6, Framer Motion, and Lucide UI icons. The design combines original inline SVG/CSS artwork with your supplied transparent PNG theme assets.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

Open `/invitation/vishal-darshana?to=Ramesh&demo=true`. The root redirects to the configured slug while preserving query parameters. `to` is plain text, trimmed and limited to 40 characters. `demo=true` enables the dismissible preview ribbon.

## Customize

Edit only `src/data/invitation.js` for names, Telugu names, parents, wedding ISO date including timezone, muhurtham, venue, event details and maps, feast dishes, photo paths, RSVP destination, music, and YouTube video. Put your own licensed assets in `public/` and reference them with `publicAsset('photos/groom.jpg')` (import `publicAsset` from `src/utils/publicAsset.js`). This prefixes public assets with Vite's configured base path for GitHub Pages. Photo dimensions are reserved and photos load lazily. `heroVideo` and `heroPoster` are optional; video is muted and omitted for data-saving connections. Your configured background track (`/audio/bgm.mp3`) starts after pressing Open Invitation when Background music is checked. Uncheck it to open silently. Replace `musicUrl` with your own MP3 to use a different track. An empty music or video URL hides its control/section. Metadata is regenerated from the same config before development and production builds.

The selected transparent PNGs provide Ganpati on entry and in the hero, brass hanging lamps, a golden temple with mirrored plantain foliage, kolam accents, a Sangeet dhol, and a small footer lotus. Original SVG peacock frames, ceremony icons, and detailed mandapam artwork in the Muhurtham panel complement them. Soft entry/name/scroll reveals and lamp glow respect reduced motion. CSS woven silk and thin gold borders decorate the maroon sections. Hanging lamps sway very gently from the tops of their chains with different left/right periods; reduced motion disables the sway. The supplied `public/audio/bgm.mp3` is the active looping background track. The original synthesized demo remains available in `public/audio/temple-prelude.wav`.

Entry and hero artwork use your supplied `public/images/toran.png` at the top and `public/images/hero_design.png` as the decorative background. Their URLs are in `artwork` in the invitation config. Additional theme assets use `src`, original pixel `size`, and visible artwork `crop` bounds; `ThemeImage` frames them using an SVG viewport without changing the supplied PNGs. `namalu.png`, `kalash.png`, and `dancer.png` are deferred and are not rendered. The toran is tiled horizontally and its transparent top margin is offset with CSS; the original image files are preserved.

The nine supplied gallery photos are in `public/images/gallery/`; their order, descriptive alt text, captions, and thumbnail focal positions are configured in `invitation.js`. Original photos are preserved, and the lightbox shows each complete photo without cropping.

Colors are in `tailwind.config.js` and `src/index.css`; the latter includes dark section tokens, safe-area placement, and reduced-motion rules. Artwork components are in `src/components/art/`. Body scroll is locked during entry and in the gallery lightbox. The gallery supports arrow keys, Escape, focus trapping, and swipe.

## Hero parrots

The selected flying and perched PNGs are in `public/images/parrot-flying.png` and `parrot-perched.png`. The other flying reference was not used. `artwork.parrots.enabled` controls visibility; `flightSeconds` sets the gentle arrival duration. Two mirrored birds enter once after opening with a slower, softly eased 3.6-second flight by default, crossfade into seated poses beside Ganpati, and then move only slightly at long intervals. Resize and scroll do not replay the flight. Reduced-motion guests see stationary perched birds without downloading the flying sprite. `node scripts/check-parrots.mjs` verifies this behavior, responsive placement beside Ganpati, and image controls.

## Guest details and calendar

Set `venue.photo` and `venue.photoAlt` to display your real venue photograph; until supplied, an explicitly labelled decorative placeholder appears. Directions use `venue.mapsUrl`. Change `guestDetails.dressCode` for the optional traditional attire suggestion. The Add to calendar button downloads an `.ics` file with the muhurtham, venue, and directions; ISO timezone offsets are converted to UTC correctly. `guestDetails.calendarDurationMinutes` sets the event duration (120 minutes by default). Dates, text escaping, and UTF-8 line folding are covered by `node scripts/check-premium.mjs`, which also checks the downloaded file, directions, ceremony highlight, lamps, BGM, reduced motion, and all five target widths.

## RSVP with Google Sheets

Create a Google Sheet and open Extensions > Apps Script. Use the script below, replacing the spreadsheet ID. Create a sheet named `RSVP` with columns Timestamp, Name, Guests, Response, Message, Invitation. Deploy > New deployment > Web app; execute as yourself and allow access to Anyone. Copy the `/exec` URL into `rsvp.endpoint`. After changing script code, update the deployment version. Apps Script ownership and access must permit anonymous guest submissions.

```js
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.name || String(d.name).length > 80 ||
        !['1','2','3','4','5+'].includes(String(d.guests)) ||
        !['yes','no'].includes(d.response)) throw new Error('Invalid response');
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getSheetByName('RSVP');
    // Prefix formula-like input so guest text is stored as text.
    const safe = v => /^[=+@-]/.test(String(v || '')) ? "'" + v : String(v || '');
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([new Date(), safe(d.name), d.guests, d.response,
        safe(String(d.message || '').slice(0,2000)), safe(d.invitation)]);
    } finally { lock.releaseLock(); }
    return ContentService.createTextOutput(JSON.stringify({success:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success:false}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

The request body is JSON with `text/plain` content type to avoid an unnecessary browser preflight. Your endpoint must return readable JSON `{ "success": true }`; do not use opaque `no-cors` responses because those cannot confirm delivery. Check the deployed web app from the actual hosting origin; if your Google workspace restricts access or CORS, use an endpoint/proxy with explicit CORS support. The app shows loading, inline validation, errors, retry, and prevents simultaneous submissions. A honeypot rejects basic bots. For a public production event, server-side rate limiting is recommended.

With an empty endpoint, RSVP opens a prefilled WhatsApp message to `rsvp.whatsappNumber` (international digits only). The guest must press Send in WhatsApp. It does not claim delivery. The supplied number is dummy data: replace it before sharing the site.

## Deploy

Vercel: import this repository; framework Vite; build `npm run build`; output `dist`. `vercel.json` rewrites invitation routes to the SPA.

Netlify: build `npm run build`; publish `dist`. `public/_redirects` provides the SPA fallback and is copied into the output. Other static hosts must serve `index.html` for `/invitation/*` routes.

GitHub Pages deploys automatically from `main` using `.github/workflows/deploy.yml`. The workflow builds the site and publishes `dist`; `public/CNAME` configures `www.darshanawedsvishal.online`. In the repository's Settings > Pages, select GitHub Actions as the build and deployment source if it is not already selected. Add a DNS CNAME record for `www` pointing to `Vishalkora-Mern.github.io` and A records for the bare domain pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`; GitHub Pages will redirect the bare domain to `www`. GitHub Pages serves the invitation route fallback through `public/404.html`.

For WhatsApp previews, metadata uses the config. Add a hosted absolute Open Graph image URL if desired, using artwork or photos you own. This implementation uses an emoji SVG favicon and no stock assets. Google Fonts are the only external visual resource.

## Verification

`node scripts/check-browser.mjs` runs local Chromium interaction checks while the dev server runs on port 5173. It checks 360px and 1440px overflow, guest personalization and HTML escaping, gallery keyboard controls, RSVP validation and WhatsApp fallback, reduced motion, and mocked endpoint failure/retry/success. It uses the installed Windows Chrome path; change that path for other systems. Browser screenshots are written to ignored `artifacts/`.

Placeholder content: all wedding/venue/parent/event details, individual portraits, WhatsApp number, empty RSVP endpoint, hero video, and optional wedding film. No guest RSVP is stored until you configure a real endpoint. Performance and accessibility Lighthouse targets are goals, not certified scores.

## Deployment builds

- GitHub Pages: run `npm run build:github` for `/wedding-invitation/`. The existing GitHub Actions workflow uses this command.
- Hostinger: run `npm run build:hostinger` and upload the contents of `dist/` (including `.htaccess`) to `public_html/`. The rewrite supports direct invitation links and page refreshes.
- `npm run build` uses Hostinger mode at the domain root. Set `VITE_BASE_PATH` to override the base for any build. The platform defaults are in `.env.github` and `.env.hostinger`.

All public assets use `publicAsset()`, HTML asset URLs are rewritten by Vite, and the router uses Vite's `BASE_URL`. The generated 404 page uses the same build base. Each build replaces `dist/`; upload the output from the build for your intended host.

### Hostinger upload checklist

Run `npm run build` (Hostinger root build). Its automatic postbuild check verifies the favicon, compiled JavaScript/CSS, public assets, and routing fallback. Upload **the contents of `dist/`** into the domain's `public_html/`, including `assets/`, `images/`, `audio/`, `favicon.svg`, and hidden `.htaccess`. Replace the deployed `index.html` with `dist/index.html`; do not upload the project-root `index.html` or `src/`. The source entry requires Vite transformation and cannot run directly on static hosting. After uploading the complete build, clear any hosting cache and refresh the browser.
