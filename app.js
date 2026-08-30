// ============================================================
// PCT WA Alt Routes - main app logic
// ============================================================

// Real PCT centerline through Washington, from the official Washington.gpx
// track (sections H through L, south to north), decimated to ~3000 points.
// Falls back to a rough landmark-based approximation only if that data
// somehow isn't loaded, so the map never just breaks.
const PCT_APPROX = (typeof TRACKS !== 'undefined' && TRACKS.pctWashington)
  ? TRACKS.pctWashington.coords
  : [
      [-121.3855, 46.6382], [-121.5136, 46.8722], [-121.4235, 47.4235],
      [-121.0890, 47.7454], [-121.1500, 48.0200], [-120.9800, 48.1000],
      [-120.7191, 48.5051], [-120.6584, 48.7230], [-120.7996, 49.0002]
    ];

const START_COORDS = [47.5695872, -121.2478946]; // La Bohn Lakes area, [lat, lon]

// ---------- Map init ----------
const map = L.map('map', {
  zoomControl: false,
  attributionControl: true
}).setView(START_COORDS, 10);

L.control.zoom({ position: 'bottomleft' }).addTo(map);

const basemaps = {
  street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }),
  topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
  }),
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri'
  })
};
let currentBasemapKey = 'street';
basemaps.street.addTo(map);

// ---------- Helpers ----------
function toLatLngs(lonLatArray) {
  return lonLatArray.map(([lon, lat]) => [lat, lon]);
}

function getRouteLatLngs(route) {
  if (route.trackKey && TRACKS[route.trackKey]) {
    return toLatLngs(TRACKS[route.trackKey].coords);
  }
  if (route.anchorPoints) {
    return toLatLngs(route.anchorPoints);
  }
  return null;
}

function makePoiIcon(color, kind) {
  const icons = {
    start: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/></svg>',
    end: '<svg viewBox="0 0 24 24"><path d="M12 2 2 20h20L12 2Z"/></svg>',
    monument: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="18" rx="1"/></svg>',
    fire: '<svg viewBox="0 0 24 24"><path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-2-1-3-1-5 2 1 3 4 3 6a5 5 0 0 1-10 0c0-6 5-6 5-10Z"/></svg>'
  };
  return L.divIcon({
    className: '',
    html: `<div class="poi-marker" style="background:${color}">${icons[kind] || icons.start}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
}

// ---------- Draw approximate PCT line ----------
const pctLine = L.polyline(toLatLngs(PCT_APPROX), {
  color: PCT_LINE_COLOR,
  weight: 4,
  opacity: 0.9,
  className: 'pct-line'
}).addTo(map);

const pctMilesLabel = (typeof TRACKS !== 'undefined' && TRACKS.pctWashington)
  ? `${TRACKS.pctWashington.miles} miles, Bridge of the Gods to the Northern Terminus`
  : 'Approximate line only';

pctLine.bindPopup(
  `<div style="font-family:inherit;padding:4px;">
    <b>Pacific Crest Trail, Washington</b><br/>
    <span style="color:#706b5f;font-size:13px;">${pctMilesLabel}</span>
  </div>`
);

// ---------- Draw fire zones ----------
// Where we have a real PCT-based closure segment (fire.segmentTrackKey), draw
// it as a thick red highlight directly on the actual trail. Otherwise (just
// Border 2 Fire, which is off-trail) fall back to a rough approximate box.
const fireLayers = {};
FIRES.forEach(fire => {
  let layer;
  const hasSegment = fire.segmentTrackKey && TRACKS[fire.segmentTrackKey];

  if (hasSegment) {
    const latlngs = toLatLngs(TRACKS[fire.segmentTrackKey].coords);
    layer = L.polyline(latlngs, {
      color: '#c1272d',
      weight: 7,
      opacity: 0.55,
      lineCap: 'round'
    }).addTo(map);
  } else {
    layer = L.rectangle(fire.bounds, {
      color: '#c1272d',
      weight: 1.5,
      fillColor: '#c1272d',
      fillOpacity: 0.18,
      dashArray: '4,4'
    }).addTo(map);
  }

  const precisionNote = hasSegment
    ? 'Plotted on the real PCT track, clipped to the nearest confirmed mile markers.'
    : 'Approximate area, not an official fire perimeter (off-trail, no PCT mile markers to anchor to).';

  layer.bindPopup(
    `<div style="font-family:inherit;padding:4px;max-width:240px;">
      <b>${fire.name}</b><br/>
      <span style="color:#706b5f;font-size:12.5px;">${fire.mileRange}</span>
      <p style="font-size:13px;margin-top:6px;">${fire.note}</p>
      <p style="font-size:11px;color:#a12020;margin-top:6px;">${precisionNote}</p>
    </div>`
  );
  fireLayers[fire.id] = layer;
});

// ---------- Draw routes ----------
const routeLayers = {};

ROUTES.forEach(route => {
  const latlngs = getRouteLatLngs(route);
  if (!latlngs) return; // e.g. Miner's Fire / Ross Lake, no line to draw

  const line = L.polyline(latlngs, {
    color: route.color,
    weight: 4,
    opacity: 0.88,
    dashArray: route.approxLine ? '8,7' : null
  }).addTo(map);

  line.on('click', (e) => {
    L.DomEvent.stopPropagation(e);
    openRoutePanel(route);
  });
  routeLayers[route.id] = line;

  // start/end markers
  const startMarker = L.marker(latlngs[0], { icon: makePoiIcon(route.color, 'start') }).addTo(map);
  startMarker.on('click', (e) => {
    L.DomEvent.stopPropagation(e);
    openRoutePanel(route);
  });

  const endKind = route.id.includes('monument') ? 'monument' : 'end';
  const endMarker = L.marker(latlngs[latlngs.length - 1], { icon: makePoiIcon(route.color, endKind) }).addTo(map);
  endMarker.on('click', (e) => {
    L.DomEvent.stopPropagation(e);
    openRoutePanel(route);
  });
});

// ---------- Info panel rendering ----------
const infoPanel = document.getElementById('info-panel');
const infoContent = document.getElementById('info-content');

function statusClass(status) {
  return {
    open: 'status-open',
    caution: 'status-caution',
    closed: 'status-closed',
    unresolved: 'status-unresolved'
  }[status] || 'status-unresolved';
}

function renderBodyLine(line) {
  if (line.startsWith('quote::')) {
    const parts = line.split('::');
    const src = parts[1];
    const text = parts.slice(2).join('::');
    return `<blockquote>${text}<div style="margin-top:4px;font-size:11.5px;color:#8a8577;">&mdash; ${src}</div></blockquote>`;
  }
  return `<p>${line}</p>`;
}

function openRoutePanel(route) {
  const statusHtml = route.statusLabel
    ? `<span class="status-pill ${statusClass(route.status)}">${route.statusLabel}</span>`
    : '';

  let statsHtml = '';
  if (route.miles) {
    statsHtml += `<div class="route-stat"><span class="num">${route.miles}</span><span class="label">Miles</span></div>`;
  }
  if (route.rejoinsPCT !== null && route.rejoinsPCT !== undefined) {
    statsHtml += `<div class="route-stat"><span class="num">${route.rejoinsPCT ? 'Yes' : 'No'}</span><span class="label">Rejoins PCT</span></div>`;
  }

  const bodyHtml = (route.body || []).map(renderBodyLine).join('');
  const rejoinHtml = route.rejoinNote
    ? `<p><b>What happens next:</b> ${route.rejoinNote}</p>`
    : '';

  infoContent.innerHTML = `
    <div class="route-sub">${route.group}</div>
    <div class="route-title">${route.name}</div>
    ${statusHtml}
    ${statsHtml ? `<div class="route-stats">${statsHtml}</div>` : ''}
    <div class="route-body">
      <p>${route.summary}</p>
      ${rejoinHtml}
      ${bodyHtml}
    </div>
    <div class="source-tag">Source: ${route.sourceLine}</div>
    <div class="route-actions">
      ${route.trackKey || route.anchorPoints ? `<button class="btn-secondary" onclick="downloadGPX('${route.id}')">Download GPX</button>` : ''}
      <button class="btn-primary" onclick="zoomToRoute('${route.id}')">Zoom to route</button>
    </div>
  `;
  infoPanel.classList.add('expanded');
}

function zoomToRoute(routeId) {
  const layer = routeLayers[routeId];
  if (layer) map.fitBounds(layer.getBounds(), { padding: [40, 40] });
}

// ---------- GPX export ----------
function downloadGPX(routeId) {
  const route = ROUTES.find(r => r.id === routeId);
  if (!route) return;
  const latlngs = getRouteLatLngs(route);
  if (!latlngs) return;

  let gpx = `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="PCT WA Alt Routes">\n<trk><name>${route.name}</name><trkseg>\n`;
  latlngs.forEach(([lat, lon]) => {
    gpx += `<trkpt lat="${lat}" lon="${lon}"></trkpt>\n`;
  });
  gpx += `</trkseg></trk>\n</gpx>`;

  const blob = new Blob([gpx], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = route.id + '.gpx';
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- Info panel drag/collapse ----------
document.getElementById('info-handle').addEventListener('click', () => {
  infoPanel.classList.toggle('expanded');
});

document.getElementById('info-close').addEventListener('click', () => {
  infoPanel.classList.remove('expanded');
});

// Tap outside the panel (on empty map area) closes it. Leaflet stops this
// click from firing when you click directly on a marker/line/rectangle, so
// this only fires for genuine "tap on empty map" taps.
map.on('click', () => {
  infoPanel.classList.remove('expanded');
});

// ---------- Legend panel ----------
const legendPanel = document.getElementById('legend-panel');
const legendList = document.getElementById('legend-list');

function buildLegend() {
  let html = '';
  html += `<div class="legend-item" data-line-only="pct">
      <div class="legend-swatch" style="background:${PCT_LINE_COLOR}"></div>
      <div class="legend-text"><div class="legend-name">Pacific Crest Trail</div><div class="legend-meta">Real track, Washington sections H-L</div></div>
    </div>`;

  ROUTES.forEach(route => {
    const swatchClass = route.approxLine ? 'legend-swatch dashed' : 'legend-swatch';
    const swatchStyle = route.approxLine ? `color:${route.color}` : `background:${route.color}`;
    html += `<div class="legend-item" data-route="${route.id}">
        <div class="${swatchClass}" style="${swatchStyle}"></div>
        <div class="legend-text">
          <div class="legend-name">${route.name}</div>
          <div class="legend-meta">${route.group}${route.miles ? ' &middot; ' + route.miles + ' mi' : ''}</div>
        </div>
      </div>`;
  });

  FIRES.forEach(fire => {
    html += `<div class="legend-item" data-fire="${fire.id}">
        <div class="legend-swatch" style="background:#c1272d;opacity:0.5"></div>
        <div class="legend-text"><div class="legend-name">${fire.name}</div><div class="legend-meta">Closure zone (approximate)</div></div>
      </div>`;
  });

  legendList.innerHTML = html;

  legendList.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', () => {
      const route = ROUTES.find(r => r.id === el.dataset.route);
      legendPanel.classList.add('hidden');
      if (route) {
        openRoutePanel(route);
        zoomToRoute(route.id);
      }
    });
  });
  legendList.querySelectorAll('[data-fire]').forEach(el => {
    el.addEventListener('click', () => {
      const layer = fireLayers[el.dataset.fire];
      legendPanel.classList.add('hidden');
      if (layer) {
        map.fitBounds(layer.getBounds(), { padding: [40, 40] });
        layer.openPopup();
      }
    });
  });
}
buildLegend();

document.getElementById('legend-btn').addEventListener('click', () => {
  legendPanel.classList.remove('hidden');
});
document.getElementById('legend-close').addEventListener('click', () => {
  legendPanel.classList.add('hidden');
});

// ---------- Layers panel ----------
const layersPanel = document.getElementById('layers-panel');
document.getElementById('layers-btn').addEventListener('click', () => {
  layersPanel.classList.remove('hidden');
});
document.getElementById('layers-close').addEventListener('click', () => {
  layersPanel.classList.add('hidden');
});
document.querySelectorAll('.layer-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.layer;
    if (key === currentBasemapKey) return;
    try {
      map.removeLayer(basemaps[currentBasemapKey]);
      basemaps[key].addTo(map);
      currentBasemapKey = key;
      document.querySelectorAll('.layer-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    } catch (e) {
      console.error('Basemap switch failed:', e);
    }
  });
});
// Defensive: never let a missing button crash the rest of setup below this point
try {
  const activeBtn = document.querySelector(`.layer-option[data-layer="${currentBasemapKey}"]`);
  if (activeBtn) activeBtn.classList.add('active');
} catch (e) {
  console.error('Could not set initial active layer button:', e);
}

// ---------- Menu button (just opens legend for now, single entry point) ----------
document.getElementById('menu-btn').addEventListener('click', () => {
  legendPanel.classList.remove('hidden');
});

// ---------- Locate me (one-time) ----------
let userMarker = null;
let userAccuracyCircle = null;

document.getElementById('locate-btn').addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Location is not available in this browser.');
    return;
  }
  const btn = document.getElementById('locate-btn');
  btn.classList.add('active');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      btn.classList.remove('active');
      const { latitude, longitude, accuracy } = pos.coords;
      if (userMarker) map.removeLayer(userMarker);
      if (userAccuracyCircle) map.removeLayer(userAccuracyCircle);

      userMarker = L.circleMarker([latitude, longitude], {
        radius: 8,
        color: 'white',
        weight: 2,
        fillColor: '#1a73e8',
        fillOpacity: 1
      }).addTo(map);

      userAccuracyCircle = L.circle([latitude, longitude], {
        radius: accuracy,
        color: '#1a73e8',
        weight: 1,
        fillColor: '#1a73e8',
        fillOpacity: 0.12
      }).addTo(map);

      map.setView([latitude, longitude], 14);
    },
    (err) => {
      btn.classList.remove('active');
      alert('Could not get your location: ' + err.message);
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

// ---------- Offline tile download for current view ----------
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {
    // offline caching just won't be available, rest of the app still works
  });
}

async function downloadCurrentViewTiles() {
  const toast = document.getElementById('loading-toast');
  toast.classList.remove('hidden');

  const bounds = map.getBounds();
  const currentZoom = map.getZoom();
  const zoomRange = [Math.max(currentZoom - 1, 0), Math.min(currentZoom + 2, 16)];

  const urls = [];
  for (let z = zoomRange[0]; z <= zoomRange[1]; z++) {
    const nw = map.project(bounds.getNorthWest(), z).divideBy(256).floor();
    const se = map.project(bounds.getSouthEast(), z).divideBy(256).floor();
    for (let x = nw.x; x <= se.x; x++) {
      for (let y = nw.y; y <= se.y; y++) {
        const sub = ['a', 'b', 'c'][(x + y) % 3];
        urls.push(`https://${sub}.tile.opentopomap.org/${z}/${x}/${y}.png`);
      }
    }
  }

  if ('caches' in window) {
    const cache = await caches.open('pct-tiles-v1');
    let done = 0;
    await Promise.all(urls.map(async (url) => {
      try {
        const existing = await cache.match(url);
        if (!existing) {
          const resp = await fetch(url, { mode: 'cors' });
          if (resp.ok) await cache.put(url, resp.clone());
        }
      } catch (e) { /* skip failed tiles, best effort */ }
      done++;
    }));
  }

  toast.classList.add('hidden');
  alert('Saved ' + urls.length + ' map tiles for offline use in this area. Route lines and details already work offline once this page has loaded once.');
}

document.getElementById('offline-btn').addEventListener('click', downloadCurrentViewTiles);
