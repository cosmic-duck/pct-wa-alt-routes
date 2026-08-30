// Route metadata for the PCT WA Alt Routes map.
// Each route references a track key from tracks.js (trackKey) if a real
// GPS track exists, or a list of manual waypoints (anchorPoints) if it's
// an approximate line built from confirmed junction coordinates rather
// than a recorded track. approxLine: true means it should render dashed.

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
    rejoinNote: "Ends a few miles west of Skykomish. You have to hitch Hwy 2 east to get back to the actual PCT trailhead at Stevens Pass, this doesn't walk you straight back onto the trail.",
    summary: "PCTA's own posted detour around the closure between Snoqualmie Pass and Deception Pass. Snow Lake, Rock Creek, Middle Fork, Snoqualmie Lake, Dorothy Lake, then out to Hwy 2.",
    body: [
      "This is the one PCTA actually put their name on. Found it on their closures page for the King Fire and Three Queens Fire closure (PCT mile 2396.5 to 2446).",
      "quote::PCTA closure page::\"A potential 39-mile detour is available using the Snow Lake, Rock Creek, Middle Fork, Snoqualmie Lake, and Dorothy Lake trails that route around the closure, and gets hikers to Highway 2, but not all the way to Stevens Pass.\"",
      "They're upfront that nobody's confirmed it on the ground this year either. Same source: \"This reroute section also includes disclaimers, with a note that it has not been ground truthed by PCTA or USFS staff.\"",
      "One real scheduling snag: the Snow Lake Trail section of this is closed Sept 14 to 25 for planned trail work, so if you're passing through in that window this specific line won't work.",
      "Someone on r/PacificCrestTrail (u/numbershikes) built an actual GPX of this since PCTA only offers it in their own app. That's the track shown here."
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
    rejoinNote: "Comes back onto the PCT directly at Deception Lake / Glacier Lake. No hitch needed, this is a proper reroute.",
    summary: "Harder and longer than the official reroute, but doesn't dump you on a highway. Goes through Goldmyer Hot Springs, Williams Lake, and a real off-trail scramble past an old mine before dropping into Necklace Valley.",
    body: [
      "Two trip reports on this one, both describing the same general line with slightly different names for the crux section (La Bohn Gap, Chain Lakes Route, La Bohme Lakes, depending who you ask, same terrain).",
      "quote::Reddit trip report, Aug 24 2026::\"Overall it was a lot of fun! Scrambling the boulder field in the rain was a little spicy... The Goldmyer hot springs are private, and cost $30.\"",
      "quote::Second trip report, r/PacificCrestTrail::\"Comparatively to the PCT this is a gravelroad whereas the PCT is an interstate... Part of it is a mountaineering trail/route which is some scrambling, there are clearly visible cairns to help you through.\"",
      "I pulled the actual GPX for this one and measured the off-trail stretch directly: 2.28 miles of genuine scrambling, no tread. That's the crux. Everything else is real trail or forest road.",
      "First report's route note worth repeating if you're doing Middle Fork: \"take the bridge after Goldmyer hot springs and take the Dutch Miller gap road to the Horse Camp. I took the trail but it's really overgrown here and was extremely wet.\""
    ],
    sourceLine: "Two independent trip reports, r/PacificCrestTrail, Aug 2026 + rider-submitted GPX"
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
    statusLabel: "Real, ground-truthed, poorly maintained in spots",
    miles: 30.6,
    rejoinsPCT: true,
    rejoinNote: "This is a full loop starting and ending at Bridge Creek Trailhead, the PCT itself forms part of it. You'd only walk the Rainbow Lake / McAlester Lake portion as your actual detour, not the whole 30.6 miles.",
    summary: "The trail-based way around the Sisi Fire closure near Stehekin. Bridge Creek Trailhead, Rainbow Lake Trail over a pass below Bowan Mountain, McAlester Pass, McAlester Lake, back to the PCT.",
    body: [
      "First flagged in a Reddit comment as a possible workaround. NPS's own Rainbow Creek Trail page backs up the mileage: 18.5 miles one-way between SR 20 and Stehekin Valley Road via McAlester Pass.",
      "quote::AllTrails, McAlester Pass and Rainbow Lake Loop::\"Poorly maintained with fallen trees almost the entire way after mile 3, record setting mosquitoes, washed out bridge crossing from bench creek to rainbow with rapid waters.\"",
      "A Wilderness Permit is required to camp in the North Cascades backcountry portion, this isn't a walk-up-and-camp-anywhere situation.",
      "I found three different CalTopo maps of this exact loop, which tells me it's genuinely well traveled even outside of fire-closure years. Not some obscure workaround, a known route."
    ],
    sourceLine: "NPS Rainbow Creek Trail page, AllTrails reviews, WTA, CalTopo maps"
  },

  {
    id: "sisi-warcreek",
    group: "Sisi Fire",
    name: "War Creek Pass to Twisp, then bus to Mazama",
    color: "#8a5a00",
    trackKey: null,
    anchorPoints: [
      [-120.65528, 48.30944],
      [-120.65530, 48.30763],
      [-120.59871, 48.31708],
      [-120.41663, 48.35834]
    ],
    approxLine: true,
    status: "caution",
    statusLabel: "Breaks the footpath, still reaches Canada",
    miles: 21,
    rejoinsPCT: false,
    rejoinNote: "This doesn't put you back on the PCT on foot. But High Bridge is exactly where NOBO hikers already leave the trail to shuttle into Stehekin for resupply, so this isn't some special detour off your normal route, it's a fork at a stop you're already making. From Stehekin, instead of shuttling back up to the closed section at High Bridge, go over War Creek Pass to Twisp, then TranGO bus north to Winthrop and Mazama. Mazama is the same trailhead town that Monument 90 and Monument 47 both start from, so this connects straight into the rest of the Ptarmigan-area alternates on this map. You lose a continuous footpath through this section, but you don't lose progress toward Canada.",
    summary: "Out of Stehekin (the same stop NOBO hikers already shuttle into from High Bridge), up over Purple Pass, past Lake Juanita, down War Creek Trail to a trailhead outside Twisp, then bus north to Mazama.",
    body: [
      "Original tip, r/PacificCrestTrail, posted by a hiker with NOBO PCT experience in both 2017 and 2022, on the thread about this exact Sisi Fire closure (mm 2571 to 2573, High Bridge to the North Cascades NP boundary):",
      "quote::Dan_85, r/PacificCrestTrail::\"Alternatively, you could go over War Creek Pass, drop down to Twisp River Road and make your way into the town of Twisp which btw has a great bakery. From Twisp you can hitch or take local bus transit north towards Winthrop and Mazama or south towards Pateros, Chelan and Wenatchee.\"",
      "It's a big day even before you get to a bus. WTA's own trail page puts it at 8 miles and 5,700 ft of climbing just to reach Purple Pass out of Stehekin. Outdoor Project's account matches almost exactly.",
      "quote::Outdoor Project, Purple Pass Hiking Loop::\"The first day climbs about 6,000 feet over 8.1 miles of multiple switchbacks up to Purple Pass from Stehekin. Make sure you have plenty of water, as the next source is not until Juanita Lake, which is your campsite for the night.\"",
      "Crossing the pass means leaving National Forest and entering North Cascades National Park, so an NPS backcountry permit is needed if you're overnighting past that point, not just wilderness self-registration.",
      "Once you're actually at the War Creek Trailhead, you're still not in town, it's up a forest road about 14 miles from Twisp River Road. From Twisp, TranGO (Transit for Greater Okanogan) runs a real bus north to Winthrop and Mazama, Monday through Saturday, $1 fare. A 2024 Methow Valley News piece on the route specifically mentions PCT hikers using it: \"Many recreationists use the bus to connect to ski trails or get to the Pacific Crest Trail and other hiking trails, according to TranGO.\"",
      "Worth choosing over the McAlester/Rainbow trail alternate if you want an actual town stop, a resupply, and a shot at a hitch or bus instead of more remote backcountry trail. Worth choosing the McAlester/Rainbow alternate instead if keeping a connected footpath through this section matters more to you than a town stop."
    ],
    sourceLine: "r/PacificCrestTrail (Dan_85, NOBO 2017/2022), WTA, Outdoor Project, Methow Valley News, TranGO schedules"
  },

  {
    id: "ptarmigan-monument90",
    group: "Ptarmigan Fire",
    name: "Mazama to Monument 90",
    color: "#c1272d",
    trackKey: "monument90",
    approxLine: false,
    status: "open",
    statusLabel: "Confirmed open, best-documented route here",
    miles: 55.6,
    rejoinsPCT: false,
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
    rejoinNote: "Same endpoint as the main Monument 47 route, just a different way through the Mt. Baker area avoiding Canyon Ridge Trail.",
    summary: "The fork Mercury and Ibex took instead of Canyon Ridge Trail: Lake Ann Trailhead, Mt. Baker Highway, FR 31, FR 3140, NFD 045, to the border.",
    body: [
      "This line is built from five real, separately confirmed coordinates rather than a single recorded GPS track, since neither trip report had a usable GPX for this specific fork.",
      "Junction points, confirmed one at a time: Lake Ann Trailhead (USFS/PNT.org), the FR 31 / FR 3140 junction at the Canyon Creek crossing exactly 7.1 miles up FR 31 (USFS Canyon Ridge Trail page, also confirmed by a dropped pin on OpenStreetMap), the Canyon Ridge Trail west trailhead at the end of FR 3140 (WTA), and the NFD 045 / Road 3140 junction right at the border (also confirmed by dropped pin, sits about 0.8 km south of Monument 47 itself, which tracks with it being the last road junction before the final bushwhack).",
      "quote::Mercury & Ibex::\"This road was paved and in good shape until you cross Canyon Creek, though it is only 1.5 lanes... FR 3140 is gravel and one lane and sees some dirt bike traffic as well.\"",
      "The math checks out as a sanity test: roughly 21 miles Lake Ann to FR 31, plus 7.1 to the FR 3140 junction, plus another 8.2 to the Canyon Ridge west trailhead, comes to about 36.3 miles. The measured line comes out to 35.7. Close enough that I trust this line is actually tracing the real road corridor."
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
  }

];
