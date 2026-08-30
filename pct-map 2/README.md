# PCT WA Alt Routes

A map for navigating PCT Washington fire-closure alternate routes, styled after FarOut.

## What's in here

- `index.html` — the page itself
- `style.css` — all the visual styling
- `app.js` — the map logic
- `sw.js` — service worker, makes offline map tiles work
- `data/routes.js` — every alt route's name, color, status, and sourced writeup. Edit this file to update route info.
- `data/tracks.js` — the actual GPS coordinate data for routes with real tracks
- `data/fires.js` — fire closure zone boxes (approximate, edit as better data comes in)

## How to put this online (no coding required)

1. Go to github.com and log into your account.
2. Click the **+** in the top right, then **New repository**.
3. Name it `PCT-WA-alt-routes` (matches what we planned). Make sure **Public** is selected. Don't check any of the "initialize with" boxes. Click **Create repository**.
4. On the new empty repo page, click **uploading an existing file** (it's a link in the middle of the page).
5. Drag all the files and the `data` folder from this download into the upload box. GitHub will keep the folder structure automatically.
6. Scroll down, click **Commit changes**.
7. Go to the repo's **Settings** tab, then **Pages** in the left sidebar.
8. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**. Click **Save**.
9. Wait a minute or two, then refresh that Pages settings page. It'll show you a live URL, something like `https://yourusername.github.io/PCT-WA-alt-routes/`.

That URL is your live map. Bookmark it, share it, open it on your phone before a hike.

## Updating route info later

Open `data/routes.js` on GitHub directly (click the file, then the pencil/edit icon), find the route you want to change, edit the text, and commit. The site updates automatically within a minute or two, no rebuild step needed.

Each route entry has a `body` array of strings. Regular strings show as plain paragraphs. Strings formatted like `quote::Source Name::"the actual quote text"` render as a styled blockquote with attribution. Keep that format if you add more sourced quotes.

## Known gaps as of this build

- **Miner's Fire (mm 2524–2555)**: no alternate route found yet. Shows on the map as a closure zone with no route line.
- **Scheelite Pass / Little Cathedral Lake**: named as possible border-touch points near Route 4A, never independently confirmed or pinned. Not yet on the map.
- **War Creek Pass**: built from confirmed anchor points, not a recorded GPS track, so the line is a rough approximation between Stehekin, Purple Pass, and the War Creek Trailhead.
- **Fire zones**: all five are rough rectangles based on mile-marker ranges and nearby landmarks, not real fire perimeter polygons. Treat them as "closure is somewhere around here," not exact boundaries.

## Offline use

Tap the download icon (right side toolbar) while viewing an area to cache those map tiles for offline use. This works best if you're on wifi/data when you do it. Once cached, that same view will keep showing tiles even without signal, as long as you're using the same browser and haven't cleared its site data.

The "locate me" button uses your phone's GPS directly and works offline. Only the map tiles themselves need to have been pre-downloaded.
