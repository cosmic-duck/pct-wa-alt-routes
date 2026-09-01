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
    flag: '<svg viewBox="0 0 24 24"><path d="M6 2v20M6 3h12l-3 4 3 4H6"/></svg>',
    town: '<svg viewBox="0 0 24 24"><path d="M4 21V9l8-6 8 6v12H4Z"/><path d="M9 21v-6h6v6"/></svg>',
    ref: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>',
    road: '<svg viewBox="0 0 24 24"><path d="M5 21 9 3h6l4 18"/><path d="M12 3v18" stroke-dasharray="2,2"/></svg>'
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
// Each fire draws two layers when data allows:
// 1. The real perimeter polygon (fetched from NIFC), a filled shape showing
//    the fire's actual mapped footprint.
// 2. A bright highlighted segment of the real PCT track, showing exactly
//    which stretch of trail is closed. These don't have to align exactly
//    with the polygon edge, so both are shown.
const fireLayers = {};
FIRES.forEach(fire => {
  const layers = [];

  const perimeter = fire.perimeterKey && typeof PERIMETERS !== 'undefined' ? PERIMETERS[fire.perimeterKey] : null;
  if (perimeter && perimeter.geometry) {
    const polyLayer = L.geoJSON(perimeter.geometry, {
      style: {
        color: '#8b0000',
        weight: 2,
        fillColor: '#c1272d',
        fillOpacity: 0.35
      }
    }).addTo(map);
    layers.push(polyLayer);
  }

  const hasSegment = fire.segmentTrackKey && TRACKS[fire.segmentTrackKey];
  let primaryLayer = layers[0]; // popup anchor, prefer the polygon if it exists

  if (hasSegment) {
    const latlngs = toLatLngs(TRACKS[fire.segmentTrackKey].coords);
    L.polyline(latlngs, {
      color: '#5a1010',
      weight: 14,
      opacity: 0.55,
      lineCap: 'round'
    }).addTo(map);
    const segLine = L.polyline(latlngs, {
      color: '#ff2d2d',
      weight: 8,
      opacity: 0.95,
      lineCap: 'round'
    }).addTo(map);
    layers.push(segLine);
    if (!primaryLayer) primaryLayer = segLine;

    const midIdx = Math.floor(latlngs.length / 2);
    const midMarker = L.marker(latlngs[midIdx], { icon: makePoiIcon('#c1272d', 'fire') }).addTo(map);
    midMarker.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      primaryLayer.openPopup(latlngs[midIdx]);
    });
  }

  if (!perimeter && !hasSegment) {
    // last-resort fallback: rough approximate box, only used if we truly
    // have neither a real perimeter nor a trail segment for this fire
    primaryLayer = L.rectangle(fire.bounds, {
      color: '#c1272d',
      weight: 1.5,
      fillColor: '#c1272d',
      fillOpacity: 0.18,
      dashArray: '4,4'
    }).addTo(map);
    layers.push(primaryLayer);
  }

  const acresLine = fire.acresNote ? `<br/><span style="color:#a12020;font-size:12px;font-weight:600;">${fire.acresNote}</span>` : '';
  const precisionNote = perimeter
    ? 'Red shaded shape is the real, current fire perimeter (NIFC WFIGS, pulled 2026-08-30). Bright red line is the exact closed stretch of PCT.'
    : (hasSegment
      ? 'Plotted on the real PCT track, clipped to the nearest confirmed mile markers. No separate mapped fire perimeter for this one yet.'
      : 'Approximate area, not an official fire perimeter (off-trail, no PCT mile markers to anchor to).');

  const popupHtml = `<div style="font-family:inherit;padding:4px;max-width:240px;">
      <b>${fire.name}</b>${acresLine}<br/>
      <span style="color:#706b5f;font-size:12.5px;">${fire.mileRange}</span>
      <p style="font-size:13px;margin-top:6px;">${fire.note}</p>
      <p style="font-size:11px;color:#a12020;margin-top:6px;">${precisionNote}</p>
    </div>`;

  layers.forEach(l => l.bindPopup(popupHtml));
  fireLayers[fire.id] = primaryLayer;
});

// ---------- Info panel core (shared by routes and standalone POIs) ----------
const infoPanel = document.getElementById('info-panel');
const infoContent = document.getElementById('info-content');
let currentRoute = null;
let currentTab = 'info';

function statusClass(status) {
  return {
    open: 'status-open',
    caution: 'status-caution',
    closed: 'status-closed',
    unresolved: 'status-unresolved',
    unofficial: 'status-caution'
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

function renderTabs(route) {
  if (!route.steps || !route.steps.length) return '';
  return `
    <div class="info-tabs">
      <button class="info-tab ${currentTab === 'info' ? 'active' : ''}" onclick="switchTab('info')">All Information</button>
      <button class="info-tab ${currentTab === 'steps' ? 'active' : ''}" onclick="switchTab('steps')">Step-by-Step</button>
    </div>`;
}

function renderStepsList(route) {
  if (!route.steps || !route.steps.length) return '';
  const items = route.steps.map((s, i) => `<li><span class="step-num">${i + 1}</span><span class="step-text">${s}</span></li>`).join('');
  return `<ol class="step-list">${items}</ol>`;
}

function renderRouteBody(route) {
  if (currentTab === 'steps' && route.steps && route.steps.length) {
    return `<div class="route-body">${renderStepsList(route)}</div>`;
  }
  const bodyHtml = (route.body || []).map(renderBodyLine).join('');
  const rejoinHtml = route.rejoinNote
    ? `<p><b>What happens next:</b> ${route.rejoinNote}</p>`
    : '';
  return `<div class="route-body"><p>${route.summary}</p>${rejoinHtml}${bodyHtml}</div>`;
}

function openRoutePanel(route) {
  currentRoute = route;
  currentTab = 'info';
  renderCurrentPanel();
}

function switchTab(tab) {
  currentTab = tab;
  renderCurrentPanel();
}

function renderCurrentPanel() {
  const route = currentRoute;
  if (!route) return;

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

  infoContent.innerHTML = `
    <div class="route-sub">${route.group}</div>
    <div class="route-title">${route.name}</div>
    ${statusHtml}
    ${statsHtml ? `<div class="route-stats">${statsHtml}</div>` : ''}
    ${renderTabs(route)}
    ${renderRouteBody(route)}
    <div class="source-tag">Source: ${route.sourceLine}</div>
    <div class="route-actions">
      ${route.trackKey || route.anchorPoints ? `<button class="btn-secondary" onclick="downloadGPX('${route.id}')">Download GPX</button>` : ''}
      <button class="btn-primary" onclick="zoomToRoute('${route.id}')">Zoom to route</button>
    </div>
  `;
  infoPanel.classList.add('expanded');
}

function openRoutePanelById(routeId) {
  const route = ROUTES.find(r => r.id === routeId);
  if (route) openRoutePanel(route);
}

// ---------- Simple POI panel (monuments, towns, reference points) ----------
function openPoiPanel(poi, kindLabel) {
  currentRoute = null;
  const statusHtml = poi.status
    ? `<span class="status-pill ${statusClass(poi.status)}">${poi.status}</span>`
    : '';
  infoContent.innerHTML = `
    <div class="route-sub">${kindLabel}</div>
    <div class="route-title">${poi.name}</div>
    ${statusHtml}
    ${poi.mileNote ? `<div class="route-stats"><div class="route-stat"><span class="num" style="font-size:13px;">${poi.mileNote}</span></div></div>` : ''}
    <div class="route-body"><p>${poi.note}</p></div>
    <div class="source-tag">Source: ${poi.sourceLine}</div>
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

  // Start/end markers get their own small named popup, not the full route
  // panel, since both ends of a route describing itself twice isn't useful.
  // A button inside the popup opens the full route panel if wanted.
  const startMarker = L.marker(latlngs[0], { icon: makePoiIcon(route.color, 'start') }).addTo(map);
  const startName = route.startLabel || route.name;
  startMarker.bindPopup(
    `<div style="font-family:inherit;padding:2px;">
      <b>${startName}</b><br/>
      <span style="color:#706b5f;font-size:12px;">Start of: ${route.name}</span><br/>
      <button style="margin-top:6px;padding:5px 10px;border:none;border-radius:6px;background:#2f6b3a;color:white;font-size:12px;cursor:pointer;" onclick="openRoutePanelById('${route.id}')">Full route details</button>
    </div>`
  );
  startMarker.on('click', (e) => L.DomEvent.stopPropagation(e));

  const endKind = route.id.includes('monument') ? 'monument' : 'end';
  const endMarker = L.marker(latlngs[latlngs.length - 1], { icon: makePoiIcon(route.color, endKind) }).addTo(map);
  const endName = route.endLabel || route.name;
  endMarker.bindPopup(
    `<div style="font-family:inherit;padding:2px;">
      <b>${endName}</b><br/>
      <span style="color:#706b5f;font-size:12px;">End of: ${route.name}</span><br/>
      <button style="margin-top:6px;padding:5px 10px;border:none;border-radius:6px;background:#2f6b3a;color:white;font-size:12px;cursor:pointer;" onclick="openRoutePanelById('${route.id}')">Full route details</button>
    </div>`
  );
  endMarker.on('click', (e) => L.DomEvent.stopPropagation(e));
});

// ---------- Draw standalone POIs: monuments, towns, reference points ----------
const poiLayers = { monuments: [], towns: [], reference: [], roads: [] };

if (typeof MONUMENTS !== 'undefined') {
  MONUMENTS.forEach(m => {
    const icon = m.id.includes('makeshift') ? 'flag' : 'monument';
    const color = m.status === 'closed' ? '#555555' : '#c1272d';
    const marker = L.marker([m.lat, m.lon], { icon: makePoiIcon(color, icon) }).addTo(map);
    marker.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      openPoiPanel(m, 'Monument');
    });
    poiLayers.monuments.push({ id: m.id, marker, data: m });
  });
}

if (typeof TOWNS !== 'undefined') {
  TOWNS.forEach(t => {
    const marker = L.marker([t.lat, t.lon], { icon: makePoiIcon('#3d7a9e', 'town') }).addTo(map);
    marker.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      openPoiPanel(t, 'Town / Resupply');
    });
    poiLayers.towns.push({ id: t.id, marker, data: t });
  });
}

if (typeof REFERENCE_POINTS !== 'undefined') {
  REFERENCE_POINTS.forEach(r => {
    const marker = L.marker([r.lat, r.lon], { icon: makePoiIcon('#999999', 'ref') }).addTo(map);
    marker.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      openPoiPanel(r, 'Reference');
    });
    poiLayers.reference.push({ id: r.id, marker, data: r });
  });
}

// Access roads: small, lightweight native popups rather than the full
// bottom panel, since these are simple point facts, not full route stories.
// Colored by status so open/closed/partial is visible at a glance.
if (typeof ACCESS_ROADS !== 'undefined') {
  const roadColors = {
    open: '#3d7a9e',
    'open-only-access': '#c99a2e',
    partial: '#b8860b',
    closed: '#555555'
  };
  ACCESS_ROADS.forEach(r => {
    const color = roadColors[r.status] || '#3d7a9e';
    const marker = L.marker([r.lat, r.lon], { icon: makePoiIcon(color, 'road') }).addTo(map);
    const statusLabel = {
      open: 'Open',
      'open-only-access': 'Open, only current access to this section',
      partial: 'Open partway only',
      closed: 'Closed'
    }[r.status] || r.status;
    marker.bindPopup(
      `<div style="font-family:inherit;padding:2px;max-width:230px;">
        <b>${r.name}</b><br/>
        <span style="color:#706b5f;font-size:12px;">PCT mile ${r.mile} &middot; <b style="color:${color === '#555555' ? '#a12020' : '#2f6b3a'}">${statusLabel}</b></span>
        <p style="font-size:12.5px;margin-top:6px;">${r.note}</p>
      </div>`
    );
    marker.on('click', (e) => L.DomEvent.stopPropagation(e));
    poiLayers.roads.push({ id: r.name, marker, data: r });
  });
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

  if (typeof MONUMENTS !== 'undefined') {
    MONUMENTS.forEach(m => {
      html += `<div class="legend-item" data-poi="monuments" data-poi-id="${m.id}">
          <div class="legend-swatch" style="background:#c1272d"></div>
          <div class="legend-text"><div class="legend-name">${m.name}</div><div class="legend-meta">Monument</div></div>
        </div>`;
    });
  }

  if (typeof TOWNS !== 'undefined') {
    TOWNS.forEach(t => {
      html += `<div class="legend-item" data-poi="towns" data-poi-id="${t.id}">
          <div class="legend-swatch" style="background:#3d7a9e"></div>
          <div class="legend-text"><div class="legend-name">${t.name}</div><div class="legend-meta">Town / resupply</div></div>
        </div>`;
    });
  }

  if (typeof ACCESS_ROADS !== 'undefined') {
    const openCount = ACCESS_ROADS.filter(r => r.status === 'open' || r.status === 'open-only-access').length;
    const closedCount = ACCESS_ROADS.filter(r => r.status === 'closed').length;
    html += `<div class="legend-item" data-fit-all-roads="1">
        <div class="legend-swatch" style="background:#3d7a9e"></div>
        <div class="legend-text"><div class="legend-name">Access Roads (${ACCESS_ROADS.length})</div><div class="legend-meta">${openCount} open, ${closedCount} closed &middot; tap any road marker on the map for details</div></div>
      </div>`;
  }

  legendList.innerHTML = html;

  legendList.querySelectorAll('[data-fit-all-roads]').forEach(el => {
    el.addEventListener('click', () => {
      legendPanel.classList.add('hidden');
      if (poiLayers.roads.length) {
        const group = L.featureGroup(poiLayers.roads.map(r => r.marker));
        map.fitBounds(group.getBounds(), { padding: [40, 40] });
      }
    });
  });

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
  legendList.querySelectorAll('[data-poi]').forEach(el => {
    el.addEventListener('click', () => {
      const group = poiLayers[el.dataset.poi] || [];
      const found = group.find(p => p.id === el.dataset.poiId);
      legendPanel.classList.add('hidden');
      if (found) {
        map.setView(found.marker.getLatLng(), 13);
        found.marker.fire('click');
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

// ---------- Search bar ----------
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const searchResultsEl = document.getElementById('search-results');
const searchClearBtn = document.getElementById('search-clear');
const searchCollapseBtn = document.getElementById('search-collapse-btn');
const searchExpandBtn = document.getElementById('search-expand-btn');
const mapDiv = document.getElementById('map');
const toolStackDiv = document.getElementById('tool-stack');

let tempSearchPin = null;

function collapseSearchBar() {
  searchBar.classList.add('hidden-bar');
  searchExpandBtn.style.display = 'flex';
  mapDiv.classList.add('search-collapsed');
  toolStackDiv.classList.add('search-collapsed');
  map.invalidateSize();
}
function expandSearchBar() {
  searchBar.classList.remove('hidden-bar');
  searchExpandBtn.style.display = 'none';
  mapDiv.classList.remove('search-collapsed');
  toolStackDiv.classList.remove('search-collapsed');
  map.invalidateSize();
  searchInput.focus();
}
searchCollapseBtn.addEventListener('click', collapseSearchBar);
searchExpandBtn.addEventListener('click', expandSearchBar);

// Build a flat searchable index from everything already on the map.
function buildSearchIndex() {
  const index = [];
  ROUTES.forEach(r => {
    const latlngs = getRouteLatLngs(r);
    if (latlngs) index.push({ name: r.name, meta: r.group, lat: latlngs[0][0], lon: latlngs[0][1], action: () => { openRoutePanel(r); zoomToRoute(r.id); } });
  });
  FIRES.forEach(f => {
    index.push({ name: f.name, meta: 'Fire closure', lat: (f.bounds[0][0]+f.bounds[1][0])/2, lon: (f.bounds[0][1]+f.bounds[1][1])/2, action: () => {
      const layer = fireLayers[f.id];
      if (layer) { map.fitBounds(layer.getBounds(), { padding: [40,40] }); layer.openPopup(); }
    }});
  });
  if (typeof MONUMENTS !== 'undefined') MONUMENTS.forEach(m => {
    index.push({ name: m.name, meta: 'Monument', lat: m.lat, lon: m.lon, action: () => { map.setView([m.lat, m.lon], 14); openPoiPanel(m, 'Monument'); } });
  });
  if (typeof TOWNS !== 'undefined') TOWNS.forEach(t => {
    index.push({ name: t.name, meta: 'Town / resupply', lat: t.lat, lon: t.lon, action: () => { map.setView([t.lat, t.lon], 13); openPoiPanel(t, 'Town / Resupply'); } });
  });
  if (typeof REFERENCE_POINTS !== 'undefined') REFERENCE_POINTS.forEach(r => {
    index.push({ name: r.name, meta: 'Reference', lat: r.lat, lon: r.lon, action: () => { map.setView([r.lat, r.lon], 14); openPoiPanel(r, 'Reference'); } });
  });
  if (typeof ACCESS_ROADS !== 'undefined') ACCESS_ROADS.forEach(rd => {
    index.push({ name: rd.name, meta: 'Access road', lat: rd.lat, lon: rd.lon, action: () => { map.setView([rd.lat, rd.lon], 13); } });
  });
  return index;
}
const searchIndex = buildSearchIndex();

// ---------- Coordinate parsing ----------
function parseCoordinateInput(text) {
  const t = text.trim();

  // Decimal degrees: "47.676, -121.263" or "47.676 -121.263"
  const decMatch = t.match(/^(-?\d{1,3}(?:\.\d+)?)\s*[, ]\s*(-?\d{1,3}(?:\.\d+)?)$/);
  if (decMatch) {
    const lat = parseFloat(decMatch[1]);
    const lon = parseFloat(decMatch[2]);
    if (Math.abs(lat) <= 90 && Math.abs(lon) <= 180) return { lat, lon };
  }

  // DMS: 47°40'35.3"N 121°15'46.1"W  (also accepts ′ ″ and comma between parts)
  const dmsMatch = t.match(
    /(\d{1,3})\s*[°]\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*["″]?\s*([NSns])[,\s]+(\d{1,3})\s*[°]\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*["″]?\s*([EWew])/
  );
  if (dmsMatch) {
    const latDeg = parseFloat(dmsMatch[1]), latMin = parseFloat(dmsMatch[2]), latSec = parseFloat(dmsMatch[3]);
    const latDir = dmsMatch[4].toUpperCase();
    const lonDeg = parseFloat(dmsMatch[5]), lonMin = parseFloat(dmsMatch[6]), lonSec = parseFloat(dmsMatch[7]);
    const lonDir = dmsMatch[8].toUpperCase();
    let lat = latDeg + latMin / 60 + latSec / 3600;
    let lon = lonDeg + lonMin / 60 + lonSec / 3600;
    if (latDir === 'S') lat = -lat;
    if (lonDir === 'W') lon = -lon;
    return { lat, lon };
  }

  return null;
}

function dropCoordinatePin(lat, lon) {
  if (tempSearchPin) map.removeLayer(tempSearchPin);
  tempSearchPin = L.marker([lat, lon], { icon: makePoiIcon('#d64545', 'ref') }).addTo(map);
  tempSearchPin.bindPopup(
    `<div style="font-family:inherit;padding:2px;">
      <b>${lat.toFixed(5)}, ${lon.toFixed(5)}</b><br/>
      <span style="color:#706b5f;font-size:12px;">Tap this pin again to remove it.</span>
    </div>`
  );
  tempSearchPin.on('click', (e) => {
    L.DomEvent.stopPropagation(e);
    map.removeLayer(tempSearchPin);
    tempSearchPin = null;
  });
  map.setView([lat, lon], 14);
  tempSearchPin.openPopup();
}

// ---------- Nominatim fallback (only for things not already on our map) ----------
async function searchNominatim(query) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&viewbox=-125,49.1,-116.9,45.4&bounded=0&limit=5`;
    const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!resp.ok) return [];
    const data = await resp.json();
    return data.map(d => ({
      name: d.display_name.split(',')[0],
      meta: d.display_name.split(',').slice(1, 3).join(',').trim(),
      lat: parseFloat(d.lat),
      lon: parseFloat(d.lon),
      action: () => map.setView([parseFloat(d.lat), parseFloat(d.lon)], 13)
    }));
  } catch (e) {
    return [];
  }
}

function renderSearchResults(results) {
  if (!results.length) {
    searchResultsEl.innerHTML = `<div class="search-result-item" style="color:var(--muted);">No matches found.</div>`;
    searchResultsEl.classList.remove('hidden');
    return;
  }
  searchResultsEl.innerHTML = results.map((r, i) =>
    `<div class="search-result-item" data-idx="${i}">
      <div class="sr-name">${r.name}</div>
      <div class="sr-meta">${r.meta || ''}</div>
    </div>`
  ).join('');
  searchResultsEl.classList.remove('hidden');
  searchResultsEl.querySelectorAll('.search-result-item[data-idx]').forEach(el => {
    el.addEventListener('click', () => {
      const r = results[parseInt(el.dataset.idx)];
      r.action();
      searchResultsEl.classList.add('hidden');
      searchInput.value = r.name;
      searchClearBtn.style.display = 'block';
    });
  });
}

let searchDebounce = null;
searchInput.addEventListener('input', () => {
  const q = searchInput.value;
  searchClearBtn.style.display = q ? 'block' : 'none';
  clearTimeout(searchDebounce);

  if (!q.trim()) {
    searchResultsEl.classList.add('hidden');
    return;
  }

  // Coordinates take priority and skip search entirely
  const coord = parseCoordinateInput(q);
  if (coord) {
    searchResultsEl.classList.add('hidden');
    return;
  }

  searchDebounce = setTimeout(async () => {
    const qLower = q.toLowerCase();
    const localMatches = searchIndex.filter(item => item.name.toLowerCase().includes(qLower)).slice(0, 8);
    if (localMatches.length) {
      renderSearchResults(localMatches);
    } else if (q.trim().length >= 3) {
      const remote = await searchNominatim(q + ', Washington');
      renderSearchResults(remote);
    } else {
      searchResultsEl.classList.add('hidden');
    }
  }, 350);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const coord = parseCoordinateInput(searchInput.value);
    if (coord) {
      dropCoordinatePin(coord.lat, coord.lon);
      searchResultsEl.classList.add('hidden');
    }
  }
});

searchClearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchClearBtn.style.display = 'none';
  searchResultsEl.classList.add('hidden');
  searchInput.focus();
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
    await Promise.all(urls.map(async (url) => {
      try {
        const existing = await cache.match(url);
        if (!existing) {
          const resp = await fetch(url, { mode: 'cors' });
          if (resp.ok) await cache.put(url, resp.clone());
        }
      } catch (e) { /* skip failed tiles, best effort */ }
    }));
  }

  toast.classList.add('hidden');
  alert('Saved ' + urls.length + ' map tiles for offline use in this area. Route lines and details already work offline once this page has loaded once.');
}

document.getElementById('offline-btn').addEventListener('click', downloadCurrentViewTiles);
