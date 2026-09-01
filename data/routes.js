// Route metadata for the PCT WA Alt Routes map.
// Each route references a track key from tracks.js (trackKey) if a real
// GPS track exists, or a list of manual waypoints (anchorPoints) if it's
// an approximate line built from confirmed junction coordinates rather
// than a recorded track. approxLine: true means it should render dashed.
//
// startLabel / endLabel: short names shown in a small native popup when the
// start/end marker itself is tapped, distinct from the full route panel
// (which opens when the line itself, or a "full details" link, is tapped).
//
// steps: optional ordered array of plain-text directions for routes where
// a real step-by-step breakdown makes sense. Routes without a steps array
// only show the "All Information" tab, no Step-by-Step tab is rendered.

const PCT_LINE_COLOR = "#1a5fb4"; // blue, per spec

const ROUTES = [

  {
    id: "3q-official",
    group: "Three Queens / King Fire",
    name: "Official PCTA reroute",
    color: "#e07b39",
    trackKey: "threeQueens",
    approxLine: false,
    status: "open",
    statusLabel: "Open, unverified this season",
    miles: 38.9,
    rejoinsPCT: true,
    startLabel: "Snow Lake Trailhead",
    endLabel: "Near Skykomish (Hwy 2)",
    rejoinNote: "Ends a few miles west of Skykomish. You have to hitch Hwy 2 east to get back to the actual PCT trailhead at Stevens Pass, this doesn't walk you straight back onto the trail.",
    summary: "PCTA's own posted detour around the closure between Snoqualmie Pass and Deception Pass. Snow Lake, Rock Creek, Middle Fork, Snoqualmie Lake, Dorothy Lake, then out to Hwy 2.",
    body: [
      "This is the one PCTA actually put their name on. Found it on their closures page for the King Fire and Three Queens Fire closure (PCT mile 2396.5 to 2446).",
      "quote::PCTA closure page::\"A potential 39-mile detour is available using the Snow Lake, Rock Creek, Middle Fork, Snoqualmie Lake, and Dorothy Lake trails that route around the closure, and gets hikers to Highway 2, but not all the way to Stevens Pass.\"",
      "They're upfront that nobody's confirmed it on the ground this year either. Same source: \"This reroute section also includes disclaimers, with a note that it has not been ground truthed by PCTA or USFS staff.\"",
      "One real scheduling snag: the Snow Lake Trail section of this is closed Sept 14 to 25 for planned trail work, so if you're passing through in that window this specific line won't work.",
      "Someone on r/PacificCrestTrail (u/numbershikes) built an actual GPX of this since PCTA only offers it in their own app. That's the track shown here."
    ],
    steps: [
      "Start at Snow Lake Trailhead, north side of Snoqualmie Pass.",
      "Hike the Snow Lake Trail (closed Sept 14-25 for planned work, check dates before you go).",
      "Continue onto Rock Creek Trail.",
      "Follow the Middle Fork Trail.",
      "Pass Snoqualmie Lake.",
      "Continue to Dorothy Lake.",
      "Exit to Highway 2, a few miles west of Skykomish, not at Stevens Pass itself.",
      "Hitch east on Hwy 2 to reach Stevens Pass and rejoin the PCT."
    ],
    sourceLine: "PCTA closures page (closures.pcta.org) + r/PacificCrestTrail post"
  },

  {
    id: "3q-labohn",
    group: "Three Queens / King Fire",
    name: "La Bohn Gap / Chain Lakes alt",
    color: "#b23a48",
    trackKey: "laBohnGap",
    approxLine: false,
    status: "caution",
    statusLabel: "Real trail, includes off-trail scrambling",
    miles: 67.3,
    rejoinsPCT: true,
    startLabel: "Washington Alpine Club Trailhead",
    endLabel: "Glacier Lake (back on the PCT)",
    rejoinNote: "Comes back onto the PCT directly at Deception Lake / Glacier Lake. No hitch needed, this is a proper reroute.",
    summary: "Harder and longer than the official reroute, but doesn't dump you on a highway. Goes through Goldmyer Hot Springs, Williams Lake, and a real off-trail scramble past an old mine before dropping into Necklace Valley.",
    body: [
      "Two trip reports on this one, both describing the same general line with slightly different names for the crux section (La Bohn Gap, Chain Lakes Route, La Bohme Lakes, depending who you ask, same terrain).",
      "quote::Reddit trip report, Aug 24 2026::\"Overall it was a lot of fun! Scrambling the boulder field in the rain was a little spicy... The Goldmyer hot springs are private, and cost $30.\"",
      "quote::Second trip report, r/PacificCrestTrail::\"Comparatively to the PCT this is a gravelroad whereas the PCT is an interstate... Part of it is a mountaineering trail/route which is some scrambling, there are clearly visible cairns to help you through.\"",
      "I pulled the actual GPX for this one and measured the off-trail stretch directly: 2.28 miles of genuine scrambling, no tread. That's the crux. Everything else is real trail or forest road.",
      "First report's route note worth repeating if you're doing Middle Fork: \"take the bridge after Goldmyer hot springs and take the Dutch Miller gap road to the Horse Camp. I took the trail but it's really overgrown here and was extremely wet.\""
    ],
    steps: [
      "Start at the Washington Alpine Club trailhead near Snoqualmie Pass.",
      "Climb to Snow Lake.",
      "Continue on Rock Creek Trail toward Dutch Miller Gap (no water on this stretch).",
      "Follow the Dutch Miller Gap Trail along the Middle Fork Snoqualmie River, it becomes a gravel road near Goldmyer.",
      "Pass Goldmyer Hot Springs ($30 day use, cash only, free camping just past the bridge).",
      "Turn onto Williams Lake Trail, camping available on the shore.",
      "Climb the Chain Lakes Trail/Route past an old mine, this is the 2.28-mile off-trail scramble, cairned but real scrambling.",
      "Descend the La Bohme Lakes Route to reach Necklace Valley Trail.",
      "Drop steeply past Jade Lake, then cross the Foss River (sketchy log crossing or a knee-deep ford).",
      "Follow the forest road for about 7 miles, roughly 2,000 ft of gain.",
      "Join Tonga Ridge Trail heading toward Deception Creek.",
      "Climb to Deception Lake, then Glacier Lake, you're back on the PCT."
    ],
    sourceLine: "Two independent trip reports, r/PacificCrestTrail, Aug 2026 + rider-submitted GPX"
  },

  {
    id: "tonga-ridge-ohv",
    group: "Three Queens / King Fire",
    name: "Tonga Ridge OHV Trail (reference)",
    color: "#a67c52",
    trackKey: "tongaRidgeOHV",
    approxLine: true,
    status: "unofficial",
    statusLabel: "Motorized trail, reference only",
    miles: 30.8,
    rejoinsPCT: null,
    startLabel: "Tonga Ridge OHV Trail",
    endLabel: "Tonga Ridge OHV Trail (loop closes here)",
    rejoinNote: null,
    summary: "A 30.8-mile OHV (off-highway-vehicle) loop in the Tonga Ridge area, near where the La Bohn Gap alt crosses this same general terrain on foot. This is a motorized trail network, not a hiking route, shown here for context on what else is in this corridor.",
    body: [
      "This is a separate dataset from the hiking-trail Tonga Ridge segment referenced in the La Bohn Gap alt's own step-by-step directions. That alt uses a forest road and a piece of Tonga Ridge Trail on foot. This OHV loop is the broader motorized trail network in the same general area.",
      "Shown here as reference/context rather than folded into the La Bohn Gap route data, since it's a distinct 30.8-mile loop rather than the specific corridor a hiker on that alt would actually walk. If it turns out this OHV network overlaps with a usable hiker shortcut or bail-out option, that's worth a closer look, but as uploaded this is motorized-trail data, not confirmed hiker-relevant routing."
    ],
    sourceLine: "User-submitted GPX, Tonga Ridge OHV Trail"
  },

  {
    id: "miners-gap",
    group: "Miner's Fire",
    name: "No confirmed alternate",
    color: "#888888",
    trackKey: null,
    approxLine: false,
    status: "unresolved",
    statusLabel: "Nothing confirmed",
    miles: null,
    rejoinsPCT: null,
    rejoinNote: null,
    summary: "Closes the PCT between Mica Lake (mm 2524) and Suiattle Pass (mm 2555). Nobody has a real way around this one yet.",
    body: [
      "This is the one gap on this whole map I couldn't close. A comment mentioned someone named Jay Go had posted an alternate in a Facebook comment, I looked, couldn't find it, and never got confirmation it exists.",
      "PCTA's own closure page doesn't offer a detour, it just says the obvious: \"This is a remote and rugged area with a limited trail system. Thru-travelers will likely look to skip the PCT between Stevens Pass and Stehekin.\" That's an admission there isn't one, not a route.",
      "The 2026 closure order I found only explicitly shuts the western approach, Suiattle Road FSR 2600, Downey Creek Trail, Sulphur Creek Campground and Suiattle Trailhead. That's different from the 2024 Miners Complex fire, which explicitly closed the whole trail network around this stretch including Miners Ridge Trail and Buck Creek Pass Trail from every direction. Whether that means an eastern approach via Buck Creek Pass is actually open this year, I don't know. I haven't verified it.",
      "If anyone finds something real for this stretch, this is the one to update first."
    ],
    sourceLine: "PCTA closures page + FS closure order text, no verified alternate found"
  },

  {
    id: "sisi-mcalester",
    group: "Sisi Fire",
    name: "Rainbow / McAlester Pass loop",
    color: "#2e8b6f",
    trackKey: "mcalesterLoop",
    approxLine: false,
    status: "caution",
    statusLabel: "Real, ground-truthed, this is now the only way into Stehekin",
    miles: 30.6,
    rejoinsPCT: true,
    startLabel: "Bridge Creek Trailhead",
    endLabel: "Bridge Creek Trailhead (loop closes here)",
    rejoinNote: "This is a full loop starting and ending at Bridge Creek Trailhead, near Rainy Pass. As of the expanded Aug 22, 2026 closure, the PCT itself is shut for the entire stretch this loop used to parallel, so you're not choosing this over walking the PCT anymore, walking the PCT here isn't an option at all. You'd get here by bypassing the closure on foot from Rainy Pass (north end, if you're continuing from Harts Pass/Mazama) or by the Darrington/SR-20 road bypass if you're coming from further south. From Bridge Creek Trailhead, this loop, specifically the Rainbow Creek Trail leg, is the real way to reach Stehekin without touching the closed PCT corridor at all.",
    summary: "The trail-based way into Stehekin now that the PCT itself is closed the whole way there. Bridge Creek Trailhead, Rainbow Lake Trail over a pass below Bowan Mountain, McAlester Pass, McAlester Lake, and Rainbow Creek Trail down toward Stehekin Road.",
    body: [
      "First flagged in a Reddit comment as a possible workaround back when the Sisi closure was just the narrow High Bridge stretch. It's since become the main way in, not just an alternative, now that the Aug 22, 2026 Forest Service order closes the PCT the entire length of the Chelan Ranger District, roughly Suiattle Pass to the Rainy Pass area.",
      "quote::AllTrails, McAlester Pass and Rainbow Lake Loop::\"Poorly maintained with fallen trees almost the entire way after mile 3, record setting mosquitoes, washed out bridge crossing from bench creek to rainbow with rapid waters.\"",
      "A Wilderness Permit is required to camp in the North Cascades backcountry portion, this isn't a walk-up-and-camp-anywhere situation.",
      "I found three different CalTopo maps of this exact loop, which tells me it's genuinely well traveled even outside of fire-closure years. Not some obscure workaround, a known route.",
      "The Lodge at Stehekin's own trail page fills in more detail on the pieces of this loop. Rainbow Creek Trail starts 2.5 miles up the Stehekin road from the landing and reaches McAlester Pass (6,017 ft) in 10 miles, with named camps along the way at Rainbow Bridge Camp (2 mi), Rainbow Ford Camp (4.4 mi, a creek crossing), Bench Creek Camp (5.4 mi, junction with Rainbow Lake Trail), Bowan Camp (~7 mi), a ford at 8 mi that's hazardous during early runoff, and McAlester Lake Camp (11 mi, a mile west of the pass). The Rainbow Lake Trail branch off Bench Creek Camp adds its own camps: Rainbow Meadows (8.4 mi), Rainbow Lake (9.9 mi), Dan's Camp (13.9 mi), and South Fork Camp (16.9 mi) where it rejoins Bridge Creek. That 2.5-mile stretch of Stehekin Road at the Rainbow Creek Trail end is the actual last leg into town.",
      "2026 UPDATE: North Cascades Lodge at Stehekin will not offer public services this season (no lodging, food, retail, fuel, laundry, or showers) due to flood damage to the wastewater treatment plant from December 2025. Purple Point and Lakeview Campgrounds remain open, free, first-come first-served. Postal and ferry/shuttle service continue, though mail already in Stehekin is currently delayed leaving town while the postmaster works out how to redirect hikers' resupply boxes. Don't plan on Stehekin as a normal resupply stop this year, plan on it as a free camping and shuttle stop only."
    ],
    steps: [
      "Get to Bridge Creek Trailhead on SR 20, near Rainy Pass. The PCT itself is closed south of here all the way past Stehekin, so this trailhead, not the PCT, is your actual way in.",
      "Follow Bridge Creek Trail south past North Fork, Six Mile, and South Fork camps.",
      "At South Fork Camp, pick up Rainbow Lake Trail.",
      "Climb past Rainbow Lake and over Bowan Pass.",
      "Continue down to Bench Creek Camp, junction with Rainbow Creek Trail.",
      "Follow Rainbow Creek Trail down toward Stehekin Road (this is the direction into town, reverse the McAlester Pass leg if you'd rather loop back to Bridge Creek instead).",
      "The last 2.5 miles are along Stehekin Road itself, into town."
    ],
    sourceLine: "NPS Rainbow Creek Trail page, AllTrails reviews, WTA, CalTopo maps, Lodge at Stehekin trail guide, NPS 2026 Stehekin services update, Aug 22 2026 FS closure order"
  },

  {
    id: "sisi-warcreek",
    group: "Sisi Fire",
    name: "Stehekin to Twisp via War Creek Pass, then bus to Mazama",
    color: "#8a5a00",
    trackKey: "warCreekPass",
    approxLine: true,
    status: "caution",
    statusLabel: "Breaks the footpath, still reaches Canada",
    miles: 17.2,
    rejoinsPCT: false,
    startLabel: "Stehekin",
    endLabel: "War Creek Trailhead",
    rejoinNote: "This doesn't put you back on the PCT on foot, and note it starts in Stehekin itself, not at a PCT junction, the PCT approach to Stehekin (High Bridge) is now unreachable, deep inside the expanded closure. You'd need to already be in Stehekin, most likely via the Rainbow/McAlester route on this map, to use this one. From Stehekin, go over War Creek Pass to Twisp, then TranGO bus north to Winthrop and Mazama. Mazama is the same trailhead town that Monument 90 and Monument 47 both start from, so this connects straight into the rest of the Ptarmigan-area alternates on this map. You lose a continuous footpath through this whole stretch, but you don't lose progress toward Canada.",
    summary: "From Stehekin (reached via the Rainbow/McAlester trail network, not the PCT), up over Purple Pass, past Lake Juanita, down War Creek Trail to a trailhead outside Twisp, then bus north to Mazama.",
    body: [
      "Original tip, r/PacificCrestTrail, posted by a hiker with NOBO PCT experience in both 2017 and 2022, on the thread about the Sisi Fire closure back when it was just the narrow High Bridge stretch:",
      "quote::Dan_85, r/PacificCrestTrail::\"Alternatively, you could go over War Creek Pass, drop down to Twisp River Road and make your way into the town of Twisp which btw has a great bakery. From Twisp you can hitch or take local bus transit north towards Winthrop and Mazama or south towards Pateros, Chelan and Wenatchee.\"",
      "The closure has grown substantially since that comment, an Aug 22, 2026 Forest Service order now closes the PCT the entire length of the Chelan Ranger District, so the original framing of \"get off at High Bridge\" no longer applies, High Bridge itself is deep inside the closed zone now. This route only makes sense once you're already in Stehekin by some other means.",
      "It's a big day even before you get to a bus. WTA's own trail page puts it at 8 miles and 5,700 ft of climbing just to reach Purple Pass out of Stehekin. Outdoor Project's account matches almost exactly.",
      "quote::Outdoor Project, Purple Pass Hiking Loop::\"The first day climbs about 6,000 feet over 8.1 miles of multiple switchbacks up to Purple Pass from Stehekin. Make sure you have plenty of water, as the next source is not until Juanita Lake, which is your campsite for the night.\"",
      "The Lodge at Stehekin's own trail page gives a slightly different number for the same climb, 7.4 miles starting from the Golden West Visitor Center at 1200 ft to Purple Pass at 6884 ft, close enough to the other two sources to trust the general shape of the day.",
      "Crossing the pass means leaving National Forest and entering North Cascades National Park, so an NPS backcountry permit is needed if you're overnighting past that point, not just wilderness self-registration.",
      "Once you're actually at the War Creek Trailhead, you're still not in town, it's up a forest road about 14 miles from Twisp River Road. From Twisp, TranGO (Transit for Greater Okanogan) runs a real bus north to Winthrop and Mazama, Monday through Saturday, $1 fare. A 2024 Methow Valley News piece on the route specifically mentions PCT hikers using it: \"Many recreationists use the bus to connect to ski trails or get to the Pacific Crest Trail and other hiking trails, according to TranGO.\"",
      "2026 UPDATE: Stehekin's North Cascades Lodge is closed all season for flood damage, no lodging, food, fuel, laundry, or showers there this year. Only free camping at Purple Point and Lakeview, plus the shuttle and post office, are actually running, and mail already in Stehekin is currently delayed leaving town. Don't count on resupply in Stehekin itself before you start this climb.",
      "The line on this map is a real connected route through five confirmed points (Stehekin, the Purple Point Ranger Station, Purple Pass summit, Lake Juanita, and the War Creek Trailhead), not just straight segments between them, so it should actually trace the trail's shape instead of cutting corners. The measured distance came out to 17.2 miles.",
      "Worth choosing over the McAlester/Rainbow trail loop alone if you want an actual town stop and a resupply, since that loop by itself gets you into Stehekin but not back out toward Canada by any means other than backtracking."
    ],
    steps: [
      "Get to Stehekin first, most likely via the Rainbow/McAlester route on this map, the PCT itself is closed the whole way there.",
      "From Stehekin, start up Purple Creek Trail, from the southeast side of the Golden West Visitor Center.",
      "Climb roughly 7.4 to 8.1 miles to Purple Pass (about 6,884 ft). Carry water, the next reliable source is Lake Juanita.",
      "Continue past Lake Juanita, a common first-night camp.",
      "Continue northeast on the Summit Trail toward War Creek Pass, in the Okanogan National Forest.",
      "Descend War Creek Trail to the War Creek Trailhead, about 14 miles up a forest road from Twisp River Road.",
      "Walk or hitch down the forest road to Twisp River Road, into the town of Twisp.",
      "Catch the TranGO bus north to Winthrop and Mazama."
    ],
    sourceLine: "r/PacificCrestTrail (Dan_85, NOBO 2017/2022), WTA, Outdoor Project, Lodge at Stehekin, Methow Valley News, TranGO schedules, NPS 2026 Stehekin services update, Aug 22 2026 FS closure order"
  },

  {
    id: "ptarmigan-monument90",
    group: "Ptarmigan Fire",
    name: "Mazama to Monument 90",
    color: "#c99a2e",
    trackKey: "monument90",
    approxLine: false,
    status: "open",
    statusLabel: "Confirmed open, best-documented route here",
    miles: 55.6,
    rejoinsPCT: false,
    startLabel: "Mazama",
    endLabel: "Monument 90",
    rejoinNote: "Ends at a Canadian border monument, not the PCT's official terminus at Monument 78. This is a different, legal-to-reach point on the border.",
    summary: "Mazama, Billy Goat Trailhead, Larch Creek Trail, Park Pass, then up to Monument 90. This was PCTA's own 2022 recommended detour, and it's held up as the go-to option in 2026 too.",
    body: [
      "The Trek published a full writeup on this one. Original author hiked it in 2022 when the terminus first closed, updated it live through August 2026 as this year's Ptarmigan Fire closure evolved.",
      "quote::The Trek::\"When the PCTA endorsed the route to Park Pass as their official alt in 2022, they did not include the border monument.\" The monument itself was found separately, an old hand-drawn map in a guidebook led the author to it.",
      "Status as of publication, confirmed by phone: \"At time of publication, both the Methow Valley Ranger District and the Ptarmigan Fire hotline have recently confirmed that the Billy Goat Trailhead and the Larch Creek Trail to Park Pass are open.\"",
      "More recent confirmation, Methow Valley News: \"The Ptarmigan Fire closure's eastern border begins at the Hidden Lakes Trail #477. For those still looking to explore the Pasayten, much of the Eastern Pasayten is open.\" This whole route sits east of that line.",
      "One correction worth logging: VickyHikesOn, a local commenter on r/PacificCrestTrail, initially said the PNT was closed starting right at Peeve Pass. She later clarified: \"Billy Goat takes you to Peeve Pass if you go straight north and the PNT is closed west of Peeve pass so you'd have to hike east from there.\" Going east from Peeve Pass toward Park Pass and the monument is the correct move, not blocked.",
      "2026 trip reports back this up. Rachel Pinsker, end of July: \"It's a good route still and not smoky.\" Etienne Talbot, a couple weeks later: \"The smoke was bad the first day, and blue sky the day I reached the monument. Overall: not so crazy.\"",
      "A separate Reddit post added real road numbers: pavement from Mazama for a couple miles, then ~30 miles of quiet dirt road to the singletrack. There's a dogleg in the road you can bushwhack downhill through for about a third of a mile to cut 3 to 4 miles off, with one easy water crossing right before you rejoin the road.",
      "No cell signal up there. If you're not walking all the way back to Winthrop, you need a Garmin or similar to arrange a shuttle. The Lion's Den in Mazama (trail angel Mary) has helped with this before and will probably remember the route, since it's the same one from 2022."
    ],
    steps: [
      "From Rainy Pass, continue north on the PCT to Harts Pass (this section reopened per the updated Ptarmigan closure).",
      "Roadwalk from Harts Pass down to Mazama.",
      "Resupply and rest in Mazama, the Lion's Den and Mazama Store are the usual hiker stops.",
      "Follow forest service roads from Mazama to the Billy Goat Trailhead, roughly 30 miles. Watch for a dogleg in the road where a 1/3-mile bushwhack shortcut saves 3 to 4 miles.",
      "Hike the Larch Creek Trail to Park Pass.",
      "From Park Pass, continue north. Stay east of Peeve Pass, the PNT is closed to the west.",
      "Find Monument 90 just up the hill from the Park Pass area.",
      "Arrange a shuttle out (bring a Garmin or satellite messenger, there's no cell signal) or hike back the way you came."
    ],
    sourceLine: "The Trek (thetrek.co), r/PacificCrestTrail (VickyHikesOn + original poster), Methow Valley News"
  },

  {
    id: "ptarmigan-monument47",
    group: "Ptarmigan Fire",
    name: "mm 2505.7 to Monument 47",
    color: "#7a4fa3",
    trackKey: "monument47",
    approxLine: false,
    status: "open",
    statusLabel: "Confirmed by two independent hikes",
    miles: 127.6,
    rejoinsPCT: false,
    startLabel: "PCT mm 2505.7 (North Fork Sauk)",
    endLabel: "Monument 47",
    rejoinNote: "This isn't really a Ptarmigan-specific detour. It leaves the PCT at mm 2505.7, well before Miner's Fire even starts, and walks a mostly separate, road-heavy path west to a different Canadian border monument entirely.",
    summary: "North Fork Sauk exit, through Darrington and Concrete, up through Mt. Baker Wilderness, to Monument 47. Two separate hiking parties did this and wrote it up in detail.",
    body: [
      "Both trip reports left the PCT at the same spot, mm 2505.7, using the North Fork Sauk River Trail, and both cite thick wildfire smoke in Section K as the actual reason, not the fire closures downstream.",
      "quote::Patches & Gumby::\"we left Section K earlier than planned because of the thick wildfire smoke... if Section K was smoke free, I think a better version of this alternate would leave west from Stehekin instead.\"",
      "Total distance to the border, per that same report: about 127 miles, with roughly 41 of those on highways or busy roads.",
      "The worst stretch by their own account is the Mt. Baker Highway roadwalk: \"this was probably the worst road we walked as there are a lot of sharp turns and narrow shoulders.\" They tried a shortcut around it.",
      "quote::Patches & Gumby::\"If you use Gaia to map this route, you'll see a trail marked 'Wells Creek'... We spent about an hour trying to find the trail near Mazama Lake and eventually had to hike back to walk the highway anyways.\" This one's confirmed unreliable on the ground, don't count on it.",
      "A second, independent party (Mercury and Ibex, reached the border Aug 8) took a different fork near Lake Ann, forest roads instead of the Canyon Ridge Trail: Lake Ann Trailhead, Mt. Baker Highway, Forest Road 31, Forest Road 3140, then National Forest Development Road 045, straight to the border.",
      "quote::Mercury & Ibex::\"We followed Early Bird's great instructions for this bit... The bushwhacking portion does have some old pink flagging tape that leads to Monument 47, so that was helpful as well during our treasure hunt.\"",
      "Monument 47 itself: 49.000089, -121.93545. A logbook for finishers was left at the monument by another hiking party (\"Early Bird's\" group)."
    ],
    steps: [
      "Leave the PCT at mm 2505.7 via the North Fork Sauk River Trail.",
      "Follow Road 49/Sloan Creek Road, then NF-20, toward Darrington, about 14 miles of gravel and dirt.",
      "Resupply in Darrington (motel, hardware store, grocery).",
      "Roadwalk the Mountain Loop Highway/Hwy 530 toward Rockport and Concrete, about 13 miles.",
      "Resupply in Concrete (5b's Bakery, grocery, free showers at the Community Center).",
      "Continue roadwalking toward the Mt. Baker Highway / Lake Ann area, joining the PNT-adjacent tread over Austin Pass.",
      "Take the High Divide Trail up to Welcome Pass to save miles and skip some roadwalk.",
      "Continue on Canyon Ridge Trail toward the border, watch for camps and water sources along the ridge.",
      "Follow the old pink flagging tape for the final bushwhack to Monument 47."
    ],
    sourceLine: "r/PacificCrestTrail / PCT Class of 2026 Facebook group, two independent trip reports"
  },

  {
    id: "ptarmigan-lakeann",
    group: "Ptarmigan Fire",
    name: "Lake Ann to Monument 47 (forest road fork)",
    color: "#3d7a9e",
    trackKey: "lakeAnnConnector",
    approxLine: true,
    status: "open",
    statusLabel: "Anchored to confirmed junctions, not a recorded track",
    miles: 35.7,
    rejoinsPCT: false,
    startLabel: "Lake Ann Trailhead",
    endLabel: "Monument 47",
    rejoinNote: "Same endpoint as the main Monument 47 route, just a different way through the Mt. Baker area avoiding Canyon Ridge Trail.",
    summary: "The fork Mercury and Ibex took instead of Canyon Ridge Trail: Lake Ann Trailhead, Mt. Baker Highway, FR 31, FR 3140, NFD 045, to the border.",
    body: [
      "This line is built from five real, separately confirmed coordinates rather than a single recorded GPS track, since neither trip report had a usable GPX for this specific fork.",
      "Junction points, confirmed one at a time: Lake Ann Trailhead (USFS/PNT.org), the FR 31 / FR 3140 junction at the Canyon Creek crossing exactly 7.1 miles up FR 31 (USFS Canyon Ridge Trail page, also confirmed by a dropped pin on OpenStreetMap), the Canyon Ridge Trail west trailhead at the end of FR 3140 (WTA), and the NFD 045 / Road 3140 junction right at the border (also confirmed by dropped pin, sits about 0.8 km south of Monument 47 itself, which tracks with it being the last road junction before the final bushwhack).",
      "quote::Mercury & Ibex::\"This road was paved and in good shape until you cross Canyon Creek, though it is only 1.5 lanes... FR 3140 is gravel and one lane and sees some dirt bike traffic as well.\"",
      "The math checks out as a sanity test: roughly 21 miles Lake Ann to FR 31, plus 7.1 to the FR 3140 junction, plus another 8.2 to the Canyon Ridge west trailhead, comes to about 36.3 miles. The measured line comes out to 35.7. Close enough that I trust this line is actually tracing the real road corridor."
    ],
    steps: [
      "From Lake Ann Trailhead, continue on Mt. Baker Highway toward FR 31.",
      "Turn onto FR 31 (Canyon Creek Road).",
      "At mile 7.1, cross Canyon Creek and turn onto FR 3140.",
      "Follow FR 3140 north to its end near the Canyon Ridge Trail west trailhead.",
      "Continue onto National Forest Development Road 045.",
      "Follow NFD 045 to its end near the border.",
      "Bushwhack the final stretch, following the old pink flagging tape, to Monument 47."
    ],
    sourceLine: "Mercury & Ibex trip report + USFS/WTA junction data, anchor points confirmed individually"
  },

  {
    id: "ross-lake-blocked",
    group: "Ruled out",
    name: "Ross Lake / Hozomeen",
    color: "#555555",
    trackKey: null,
    approxLine: false,
    status: "closed",
    statusLabel: "Currently closed, not usable",
    miles: null,
    rejoinsPCT: null,
    rejoinNote: null,
    summary: "The east side of Ross Lake up to Hozomeen was the obvious next idea, but it's blocked by a second, separate fire right at the border.",
    body: [
      "quote::u/numbershikes, r/PacificCrestTrail::\"The most obvious / common route is to take the PNT west right before mm 2,639, then up to the border via trails on the east side of Ross Lake, but 1) that's going to be in the closure, and 2) there's another wildfire (\"Border 2\") near the border there.\"",
      "A workaround was proposed, reaching the east bank of Ross Lake via North Cascades NP instead (Bridge Creek Camp, Upper Stehekin Valley Trail, Park Creek Trail, Thunder Creek Trail, Fourth of July Trail, Panther Creek Trail, across Hwy 20 to East Bank Trail), but it needs additional NPS permitting and doesn't solve the actual problem.",
      "quote::Dan_85, r/PacificCrestTrail::\"Ross Lake north of Silver Creek, and the entire Hozomeen area, are currently closed due to the Border 2 Fire.\" Confirmed against NPS's own fire closures page. This one's dead regardless of approach until that changes."
    ],
    sourceLine: "r/PacificCrestTrail thread + NPS fire closures page"
  },

  {
    id: "connector-rainypass-mazama",
    group: "Connector roads",
    name: "Rainy Pass to Mazama road walk / hitchhike",
    color: "#d68910",
    trackKey: "rainyPassToMazama",
    approxLine: false,
    status: "open",
    statusLabel: "Real traced route, 21.4 miles",
    miles: 21.4,
    rejoinsPCT: false,
    startLabel: "Bridge Creek Trailhead / SR-20",
    endLabel: "Mazama",
    rejoinNote: "This is the actual road connector between the Rainy Pass area and Mazama. With the Sisi Fire closure now extending all the way up to the Rainy Pass area (see the corrected Sisi Fire zone), this becomes the practical way to keep moving from that end of the closure to Mazama and the Ptarmigan-area routes (Monument 90, Monument 47), by road rather than trail.",
    summary: "A real, traced 21.4-mile road walk / hitchhike route along SR-20 (North Cascades Highway) connecting Bridge Creek Trailhead near Rainy Pass to the town of Mazama.",
    body: [
      "This line is a real traced route, not an approximation, covering the specific stretch of highway between Rainy Pass and Mazama.",
      "This matters more than it might have a few weeks ago: the Sisi Fire closure has grown to cover the PCT all the way up to the Rainy Pass area (see the Sisi Fire zone on this map, corrected as of an Aug 22, 2026 closure order). A hiker who reaches Rainy Pass now has no trail option continuing north on the PCT itself, this road is the way across to Mazama."
    ],
    steps: [
      "Start at Bridge Creek Trailhead, where SR-20 crosses near Rainy Pass.",
      "Follow SR-20 (North Cascades Highway) west and then north, road walking or hitchhiking.",
      "Continue to the town of Mazama.",
      "From Mazama, pick up the Billy Goat Trailhead approach used by both the Monument 90 and Monument 47 routes."
    ],
    sourceLine: "User-submitted GeoJSON, traced route"
  },

  {
    id: "connector-stehekin-valley-road",
    group: "Connector roads",
    name: "Stehekin Valley Road",
    color: "#8e6b23",
    trackKey: "stehekinValleyRoad",
    approxLine: false,
    status: "open",
    statusLabel: "Open, shuttle running normally",
    miles: 10.9,
    rejoinsPCT: false,
    startLabel: "SR-20 / Bridge Creek area",
    endLabel: "Stehekin",
    rejoinNote: "This is the actual shuttle road between the Bridge Creek/SR-20 area and Stehekin, real traced geometry, not an approximation. It intersects the PCT at High Bridge, mm 2575.1, and runs 11 miles between bus stops, matching the 10.9 miles measured on this traced line closely.",
    summary: "The real road into Stehekin from the PCT side, used by the shuttle bus. Confirmed open and running its normal schedule despite flood damage elsewhere in the valley.",
    body: [
      "quote::User-provided update::\"This road is open and the shuttle bus is running its normal schedule. December's rains caused Purple Creek to flood, washing out a section of Stehekin Valley Road and destroying the wastewater treatment plant that serves the Landing, North Cascades Lodge, and NPS facilities. The lodge will not open this year, but the Post Office is open. Government assistance is expected to prioritize this repair.\"",
      "There was also significant damage to Company Creek Road, on the opposite side of the Stehekin River, which doesn't directly affect PCT hikers, repair work there has already begun.",
      "This matches what we already had noted separately about Stehekin's 2026 season: no lodging, food, retail, fuel, laundry, or showers at North Cascades Lodge, but Purple Point and Lakeview Campgrounds remain open free, and now confirmed, the Post Office is specifically still operating."
    ],
    sourceLine: "User-provided update + traced route geometry"
  }
];
