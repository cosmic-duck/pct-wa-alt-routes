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
  },
  {
    id: "town-twisp",
    name: "Twisp, WA",
    lat: 48.36333,
    lon: -120.12306,
    mileNote: "Exit point for the War Creek Pass route, up a forest road from the War Creek Trailhead",
    note: "The town at the bottom of the War Creek Pass alt, not directly on the PCT corridor, reached by trail from Stehekin and then a forest road from the War Creek Trailhead. Has a real bakery (per the original trip report that flagged this route), and is the pickup point for TranGO (Transit for Greater Okanogan), which runs a real bus north to Winthrop and Mazama Monday through Saturday, $1 fare, connecting straight into the Monument 90 and Monument 47 routes. A 2024 Methow Valley News piece specifically notes PCT hikers using this bus.",
    sourceLine: "r/PacificCrestTrail (Dan_85), TranGO schedules, Methow Valley News"
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
  },
  {
    id: "ref-unnamed-47-40-35",
    name: "Reference point (47\u00b040'35.3\"N 121\u00b015'46.1\"W)",
    lat: 47.676472,
    lon: -121.262806,
    note: "Added from a raw coordinate with no accompanying label. Sits in the general Alpine Lakes Wilderness area, close to where the La Bohn Gap / Chain Lakes alt and the Tonga Ridge corridor pass through. Not yet tied to a specific meaning, waiting on confirmation of what this point actually marks (a camp, junction, water source, etc.) before writing real popup content.",
    sourceLine: "User-provided coordinate, context not yet confirmed"
  }
];


// Access roads: every PCT-intersecting road in Washington, from
// pctwashington.com/access (current as of the 2026 season), with real
// coordinates computed from the actual PCT centerline using a multi-point
// mile-marker calibration (not a single fixed offset, verified against
// Snoqualmie Pass, Stevens Pass, and Rainy Pass independently). Status
// values: open, partial (open only part way), closed, or
// open-only-access (the sole current access point to a section).

const ACCESS_ROADS = [
  {
    name: "FR-65 (Panther Creek Campground)",
    lat: 45.81921,
    lon: -121.85993,
    mile: 2185.2,
    status: "open",
    note: "Open, paved."
  },
  {
    name: "FR-23 (Williams Mine, from Trout Lake)",
    lat: 46.18403,
    lon: -121.61179,
    mile: 2232.1,
    status: "open",
    note: "Open, main road up to Mt Adams area."
  },
  {
    name: "FR 5603 (Potato Hill)",
    lat: 46.35819,
    lon: -121.5165,
    mile: 2254.3,
    status: "open",
    note: "Open."
  },
  {
    name: "FR-2329 (Midway)",
    lat: 46.37694,
    lon: -121.49716,
    mile: 2256.2,
    status: "open",
    note: "Open."
  },
  {
    name: "FR-21 (Walupt Lake Rd)",
    lat: 46.44017,
    lon: -121.41116,
    mile: 2268.0,
    status: "open",
    note: "Open, freshly graded."
  },
  {
    name: "Chambers Lake Rd (Snowgrass Trailhead)",
    lat: 46.51303,
    lon: -121.46396,
    mile: 2277.0,
    status: "open",
    note: "Open."
  },
  {
    name: "SR-12 (White Pass)",
    lat: 46.65906,
    lon: -121.41328,
    mile: 2298.1,
    status: "open",
    note: "Open year-round, no winter closure at this crossing."
  },
  {
    name: "SR-410 (Chinook Pass)",
    lat: 46.89766,
    lon: -121.49885,
    mile: 2326.8,
    status: "open",
    note: "Open, reopened for the season May 22."
  },
  {
    name: "NF-7000 (Naches Pass, from SR-410)",
    lat: 47.10995,
    lon: -121.40989,
    mile: 2350.1,
    status: "open",
    note: "Open."
  },
  {
    name: "FR-54 (Stampede/Tacoma Pass)",
    lat: 47.28756,
    lon: -121.37685,
    mile: 2378.1,
    status: "open",
    note: "Open."
  },
  {
    name: "I-90 (Snoqualmie Pass)",
    lat: 47.43494,
    lon: -121.4009,
    mile: 2396.4,
    status: "open",
    note: "Open, the interstate itself, always open barring winter storm closures."
  },
  {
    name: "Cooper Rd (Pete Lake Trailhead)",
    lat: 47.4883,
    lon: -121.25228,
    mile: 2417.0,
    status: "open",
    note: "Open."
  },
  {
    name: "Salmon La Sac Trailhead (Waptus Lake)",
    lat: 47.5239,
    lon: -121.13696,
    mile: 2434.0,
    status: "open",
    note: "Open."
  },
  {
    name: "Cle Elum Valley Rd (Cathedral Pass)",
    lat: 47.56951,
    lon: -121.13465,
    mile: 2441.0,
    status: "open",
    note: "Open."
  },
  {
    name: "Cle Elum Valley Rd (Tucquala Meadows)",
    lat: 47.62149,
    lon: -121.1419,
    mile: 2446.0,
    status: "open",
    note: "Open."
  },
  {
    name: "FR-840 (Surprise Creek)",
    lat: 47.68323,
    lon: -121.11793,
    mile: 2453.8,
    status: "open",
    note: "Open."
  },
  {
    name: "FR-6095 (Tunnel Creek/Hope Lake)",
    lat: 47.7141,
    lon: -121.05963,
    mile: 2459.2,
    status: "open",
    note: "Open."
  },
  {
    name: "US-2 (Stevens Pass)",
    lat: 47.77282,
    lon: -121.09549,
    mile: 2467.3,
    status: "open",
    note: "Open, the highway itself. Where the Three Queens/King Fire detours end, a hitch east from Skykomish gets you back here."
  },
  {
    name: "FR-67 (Rainy Creek Rd, Smithbrook/Union Gap)",
    lat: 47.82588,
    lon: -121.10765,
    mile: 2475.0,
    status: "partial",
    note: "Open only as far as Smithbrook, closed beyond that point. Per pctwashington.com/access: north of Stevens Pass, exit options get thin, plan ahead."
  },
  {
    name: "FR-49 (Sloan Creek Rd, North Fork Sauk)",
    lat: 48.04858,
    lon: -121.16116,
    mile: 2505.7,
    status: "open-only-access",
    note: "Open but rough. Per pctwashington.com/access, this is currently the ONLY option for accessing the middle of Section K from the west. This is the trailhead our mm 2505.7 to Monument 47 route and the Miner's/Sisi Darrington bypass both use."
  },
  {
    name: "FR-26 (Suiattle River Trailhead)",
    lat: 48.1916,
    lon: -121.04011,
    mile: 2544.0,
    status: "closed",
    note: "CLOSED at milepost 4, 20 miles short of the trailhead, six major washouts, no repair underway. This closes off the western approach to the Miner's Fire area entirely, on top of the fire closure itself."
  },
  {
    name: "Railroad Creek/Lucerne/Holden Village",
    lat: 48.2329,
    lon: -120.95087,
    mile: 2556.0,
    status: "closed",
    note: "CLOSED, likely for all of the 2026 season. More than 11 landslides on Railroad Creek Road have shut down both Lucerne and Holden. This rules out the Cloudy Pass/Holden Village/Lucerne ferry bypass as a live option this year."
  },
  {
    name: "Stehekin Valley Rd (High Bridge)",
    lat: 48.40832,
    lon: -120.85244,
    mile: 2575.1,
    status: "open",
    note: "Open, shuttle bus running on its normal schedule. This is the road into Stehekin itself, though note Stehekin's own services are separately limited this year (see the Stehekin town marker)."
  },
  {
    name: "SR-20 (Rainy Pass)",
    lat: 48.54297,
    lon: -120.7235,
    mile: 2594.4,
    status: "open",
    note: "Reopened June 14 after repairs. This is the highway that connects Darrington to Mazama in one continuous drive, the only practical way across the Miner's/Sisi closure gap."
  },
  {
    name: "Harts Pass Rd",
    lat: 48.73192,
    lon: -120.67764,
    mile: 2625.3,
    status: "open",
    note: "Reopened June 24. Leads to the Billy Goat Trailhead approach used by both Monument 90 and Monument 47 routes."
  },
];
