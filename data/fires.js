// Fire closure zones.
//
// Four of these (threequeens, miners, sisi, ptarmigan) are now plotted as
// precise segments of the REAL PCT centerline (from the Washington.gpx track),
// clipped between the actual coordinates of the nearest confirmed PCT mile
// markers (from Washington_Mile_Marker.gpx) to each closure boundary. These
// are shown as a thick red highlight directly on the trail, not a box.
//
// segmentTrackKey points to an entry in TRACKS (see tracks.js) named
// "<id>-segment". Border 2 Fire has no PCT mile markers since it's off-trail
// near Ross Lake, so it stays a rough approximate box.

const FIRES = [
  {
    id: "fire-threequeens",
    name: "Three Queens / King Fire",
    mileRange: "PCT mm 2396.5 to 2446",
    note: "Snoqualmie Pass to Deception Pass. Alt routes exist, see the orange and red lines nearby.",
    segmentTrackKey: "fire-threequeens-segment",
    bounds: [[47.40, -121.55], [47.75, -121.25]]
  },
  {
    id: "fire-miners",
    name: "Miner's Fire",
    mileRange: "PCT mm 2524 to 2555",
    note: "Mica Lake to Suiattle Pass, Glacier Peak Wilderness. No confirmed alternate exists for this stretch.",
    segmentTrackKey: "fire-miners-segment",
    bounds: [[48.05, -121.25], [48.20, -121.05]]
  },
  {
    id: "fire-sisi",
    name: "Sisi Fire",
    mileRange: "PCT mm 2571 to 2573 (High Bridge to the North Cascades NP boundary)",
    note: "A short closure right where NOBO hikers already leave the trail to shuttle into Stehekin from High Bridge. See the McAlester Pass loop and the War Creek Pass exit nearby, both of which work with the existing High Bridge / Stehekin shuttle stop rather than around it.",
    segmentTrackKey: "fire-sisi-segment",
    bounds: [[48.20, -120.95], [48.35, -120.70]]
  },
  {
    id: "fire-ptarmigan",
    name: "Ptarmigan Fire",
    mileRange: "PCT mm 2626.2 to the Northern Terminus",
    note: "Closes the PCT from Harts Pass to Canada. Eastern edge of the current closure sits at Hidden Lakes Trail #477, per Methow Valley News, meaning the Mazama/Billy Goat corridor to the east is reported open.",
    segmentTrackKey: "fire-ptarmigan-segment",
    bounds: [[48.75, -120.75], [49.00, -120.35]]
  },
  {
    id: "fire-border2",
    name: "Border 2 Fire",
    mileRange: "Ross Lake, north of Silver Creek, Hozomeen area (off the PCT corridor)",
    note: "Confirmed closed via NPS fire closures page. Rules out any Ross Lake / Hozomeen approach to the border regardless of trail used to get there. No PCT mile markers fall inside this one since it's off-trail, so this stays a rough approximate box rather than a trail segment.",
    segmentTrackKey: null,
    bounds: [[48.85, -121.15], [49.00, -120.95]]
  }
];
