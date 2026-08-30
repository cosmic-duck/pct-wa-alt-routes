// Standalone points of interest, not tied to a specific alt route line.
// Rendered as their own marker layer in app.js.

const MONUMENTS = [
  {
    id: "monument-78",
    name: "Monument 78 (actual Northern Terminus)",
    lat: 49.00038032248316,
    lon: -120.8022546794561,
    status: "closed",
    note: "This is the real, official PCT Northern Terminus. It sits inside the Ptarmigan Fire closure and is not reachable this season. Shown here for orientation only, so you can see how far Monument 90 and Monument 47 sit from the actual trail-end.",
    sourceLine: "PCT centerline endpoint (Washington.gpx), cross-checked against a separately confirmed coordinate"
  },
  {
    id: "monument-makeshift",
    name: "Makeshift 2026 terminus & register",
    lat: 48.518231565675826,
    lon: -120.73281962348565,
    status: "unofficial",
    note: "Hiker-built, not a surveyed monument. Reported at the Cutthroat Pass Trailhead near Rainy Pass: \"There is now a make shift terminus and register at the Cutthroat Pass trailhead by Rainy Pass.\" Matches earlier reporting of hikers building homemade \"Rainy Pass to Mexico, 2650 miles\" markers rather than pushing toward the closed official terminus. This is informal and could move or disappear as the season goes on, unlike the permanent boundary monuments.",
    sourceLine: "Facebook (PCT Class of 2026 group)"
  }
];

// Monument 90 and Monument 47 already appear as route endpoints
// (ptarmigan-monument90 and ptarmigan-monument47/ptarmigan-lakeann in
// routes.js) with their own named end markers, so they aren't duplicated
// here to avoid two overlapping pins at the same spot.

const TOWNS = [
  {
    id: "town-cascadelocks",
    name: "Cascade Locks, OR",
    lat: 45.6725,
    lon: -121.87361,
    mileNote: "PCTA mile 2147 / WA mile 0",
    note: "Just east of the Bridge of the Gods, the southern edge of Washington. Decent-sized town, motels, grocery, USPS. Fastest PO route: get off the PCT under Highway 84, take SW Moody Ave three blocks to SW Regulator St, turn left.",
    sourceLine: "pctwashington.com/resupply"
  },
  {
    id: "town-troutlake",
    name: "Trout Lake, WA",
    lat: 45.99556,
    lon: -121.52056,
    mileNote: "PCTA mile 2230 / WA mile 83",
    note: "Trout Lake General Store, PO next door, Trout Lake Valley Inn 1 mile SE. Reached by shuttle from Forest Road 23 / Williams Mine Trailhead.",
    sourceLine: "pctwashington.com/resupply"
  },
  {
    id: "town-whitepass",
    name: "White Pass, WA",
    lat: 46.6383,
    lon: -121.3900,
    mileNote: "PCTA mile 2295 / WA mile 148",
    note: "Kracker Barrel store and gas station a half mile west of the PCT crossing. Laundry $10, showers $8 plus $2 towel. White Pass Village Inn next door. Basically nothing else open here in summer.",
    sourceLine: "pctwashington.com/resupply"
  },
  {
    id: "town-snoqualmie",
    name: "Snoqualmie Pass, WA",
    lat: 47.4235,
    lon: -121.4235,
    mileNote: "PCTA mile 2393 / WA mile 246",
    note: "Where the Three Queens / King Fire closure begins. Multiple dining, grocery, and hotel options: Pancake House, The Commonwealth, Dru Bru, Lee's Grocery, Laconia Market & Cafe, Chevron mini-mart. Not to be confused with the town of Snoqualmie, 26 miles away, label packages 'Snoqualmie Pass.'",
    sourceLine: "pctwashington.com/resupply"
  },
  {
    id: "town-stevenspass",
    name: "Stevens Pass, WA",
    lat: 47.7454,
    lon: -121.0890,
    mileNote: "PCTA mile 2464 / WA mile 317",
    note: "Where the Three Queens detours end (via a hitch from Skykomish). USPS will not deliver here, UPS/FedEx only. Sixteen miles further west, Skykomish has Sky Gas & Grocery and a few other amenities. Per the source: \"North of Stevens Pass, to Stehekin, there are limited options for exiting the PCT. Plan your exit options ahead.\"",
    sourceLine: "pctwashington.com/resupply"
  },
  {
    id: "town-stehekin",
    name: "Stehekin, WA",
    lat: 48.30763,
    lon: -120.65530,
    mileNote: "PCTA mile 2572 / WA mile 425",
    note: "Sits right in the Sisi Fire closure zone, this is the shuttle stop from High Bridge used by both the McAlester/Rainbow loop and the War Creek Pass alt. IMPORTANT 2026 UPDATE: North Cascades Lodge will not offer public services this season (no lodging, food, retail, fuel, laundry, or showers) due to flood damage from December 2025. Purple Point and Lakeview Campgrounds remain open, free, first-come first-served. Postal service and the shuttle/ferry still run. Don't plan on resupply here this year.",
    sourceLine: "pctwashington.com/resupply, NPS 2026 Stehekin services announcement"
  },
  {
    id: "town-mazama",
    name: "Mazama, WA",
    lat: 48.59222,
    lon: -120.40389,
    mileNote: "Nearest town to Rainy Pass (22 mi) and Harts Pass (19 mi)",
    note: "Starting point for both Monument 90 and Monument 47 routes. The Lion's Den (0.6 mi SW of Mazama, 6 Davelaar Dr) is the hiker haven, camping/showers/laundry, trail angels sometimes shuttle to Harts Pass or Rainy Pass. Goat's Beard Mountain Supplies holds packages for $10, right next to the Mazama Store (which has a bakery). Mobile service comes from a single tower near the Lion's Den.",
    sourceLine: "pctwashington.com/resupply, The Trek"
  }
];

const REFERENCE_POINTS = [
  {
    id: "ref-leavenworth",
    name: "Leavenworth, WA",
    lat: 47.5950,
    lon: -120.6628,
    note: "Reference marker only, not on any alt route on this map.",
    sourceLine: "Wikipedia"
  }
];
