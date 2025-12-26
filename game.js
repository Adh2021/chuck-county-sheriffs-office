// --- STATE MANAGEMENT ---
let state = {
    trust: 50,
    stats: 50,
    safety: 50,
    budget: 50,
    turn: 1
};

// --- MEGA DATABASE (FULL CARD TEXT) ---

// TIER 1: THE DAILY GRIND (Traffic, Service Calls, Local Flavor)
const GRIND_CARDS = [
    // --- TRAFFIC ENFORCEMENT ---
    { text: "Squatted Chevy Tahoe (Carolina Squat) blinding oncoming traffic on I-526.", icon: "🛻", left: {t:"Ticket (Illegal)", e:{stats:5, trust:5}}, right: {t:"Warning", e:{trust:-5}} },
    { text: "BMW weaving through traffic on I-26 doing 95mph without blinkers.", icon: "🏎️", left: {t:"Reckless Ticket", e:{stats:10, trust:-5}}, right: {t:"PIT Maneuver", e:{safety:-20, trust:-20}} },
    { text: "Mattress fell off a truck in the middle lane of the Don Holt Bridge.", icon: "🛏️", left: {t:"Stop Traffic", e:{safety:5, trust:-10}}, right: {t:"Drag it solo", e:{safety:-10, trust:5}} },
    { text: "Tourist driving the wrong way down King Street (One Way).", icon: "🛑", left: {t:"Ticket", e:{stats:5}}, right: {t:"Turn Around", e:{trust:5}} },
    { text: "Boat trailer has a flat tire on the Ravenel Bridge. Traffic backed up to Mt P.", icon: "🛥️", left: {t:"Call Tow", e:{trust:-10, safety:5}}, right: {t:"Change it fast", e:{trust:10, safety:-5}} },
    { text: "Paper license plate expired 8 months ago. Driver says 'DMV is slow'.", icon: "📄", left: {t:"Tow Vehicle", e:{stats:5, trust:-5}}, right: {t:"Ticket", e:{stats:2}} },
    { text: "Landscaper truck losing palm fronds all over Savannah Hwy.", icon: "🌴", left: {t:"Secure Load", e:{safety:5}}, right: {t:"Ignore", e:{safety:-5}} },
    { text: "Moped ('Liquor Cycle') doing 30mph in the fast lane of Hwy 17.", icon: "🛵", left: {t:"Escort off", e:{safety:10, time:-5}}, right: {t:"Ticket Impeding", e:{stats:5}} },
    { text: "Uber driver stopped dead in the middle of Market St to check GPS.", icon: "📱", left: {t:"Ticket Blocking", e:{stats:5}}, right: {t:"Yell 'Move!'", e:{trust:-2}} },
    { text: "Lifted Jeep with no doors and leg hanging out. Driver not wearing belt.", icon: "🦵", left: {t:"Click it or Ticket", e:{stats:5}}, right: {t:"Thumbs up", e:{trust:2}} },
    { text: "Dump truck dropping gravel rocks on cars behind it.", icon: "🪨", left: {t:"Commercial Stop", e:{stats:10, budget:5}}, right: {t:"Radio Company", e:{safety:2}} },
    { text: "Car broken down in the 'Suicide Lane' on I-26.", icon: "⚠️", left: {t:"Push with Bumper", e:{trust:10, safety:-10}}, right: {t:"Block Lane", e:{trust:-10, safety:5}} },
    { text: "Driver eating a bowl of grits with a spoon while driving.", icon: "🥣", left: {t:"Distracted Driving", e:{stats:5}}, right: {t:"Respect the Grits", e:{trust:5}} },
    { text: "Tesla on Autopilot. Driver is asleep at the wheel.", icon: "💤", left: {t:"Wake Up Siren", e:{safety:5}}, right: {t:"Box in car", e:{safety:-5}} },
    { text: "Drunk driver in a golf cart on Folly Road.", icon: "🍺", left: {t:"DUI Arrest", e:{stats:10}}, right: {t:"Call Wife", e:{trust:5}} },
    { text: "Overloaded pickup truck. Lumber hanging 10ft off the back with no flag.", icon: "🪵", left: {t:"Stop immediately", e:{safety:5}}, right: {t:"Follow closely", e:{safety:-2}} },
    { text: "Motorcyclist doing a wheelie down Meeting Street.", icon: "🏍️", left: {t:"Reckless Op", e:{stats:10}}, right: {t:"Speaker Warning", e:{trust:2}} },
    { text: "Car smells like weed. Smoke pouring out window.", icon: "💨", left: {t:"Search Car", e:{stats:5, trust:-5}}, right: {t:"Confiscate/Release", e:{trust:5}} },
    { text: "Elderly driver going 35mph on I-526.", icon: "👵", left: {t:"Welfare Check", e:{trust:5}}, right: {t:"Ticket Impeding", e:{stats:5, trust:-10}} },
    { text: "Dog riding in the bed of a truck, barking at cars.", icon: "🐕", left: {t:"Warning", e:{safety:2}}, right: {t:"Pet dog", e:{trust:5}} },
    { text: "DUI Checkpoint. Driver refuses to roll down window.", icon: "🍷", left: {t:"Bust Window", e:{stats:5, trust:-10}}, right: {t:"Wave Through", e:{safety:-10, trust:5}} },
    { text: "Truck with 'Salt Life' sticker swerving. Driver eating boiled peanuts.", icon: "🥜", left: {t:"Stop", e:{stats:5}}, right: {t:"Ignore", e:{safety:-2}} },
    { text: "Broken taillight. Driver has the replacement bulb in hand.", icon: "💡", left: {t:"Fix-it Ticket", e:{stats:2}}, right: {t:"Let him fix it", e:{trust:5}} },
    { text: "Speed trap on the Connector. Everyone doing 15 over.", icon: "🚓", left: {t:"Ticket All", e:{stats:10, trust:-10}}, right: {t:"Only 85+", e:{trust:5}} },
    { text: "Car with dark window tint. Can't see driver.", icon: "🕶️", left: {t:"Tint Check", e:{stats:5, safety:-2}}, right: {t:"Ignore", e:{safety:2}} },
    { text: "Wappoo Cut Drawbridge is stuck in the 'Up' position. Traffic nightmare.", icon: "🌉", left: {t:"Traffic Control", e:{trust:5, safety:-5}}, right: {t:"Wait in car", e:{trust:-10, morale:-5}} },
    { text: "Truck carrying port-o-potties tipped over on I-26. Blue liquid everywhere.", icon: "🚽", left: {t:"Close Highway", e:{safety:10, trust:-10}}, right: {t:"Drive around", e:{trust:-5, safety:-5}} },
    { text: "Tourist parked a rental car on the beach at low tide. Now it's underwater.", icon: "🌊", left: {t:"Call Tow", e:{trust:5}}, right: {t:"Laugh", e:{trust:-5}} },
    { text: "Chicken truck lost a crate. Chickens running loose on Hwy 17.", icon: "🐔", left: {t:"Catch them", e:{trust:10, safety:-5}}, right: {t:"Call Animal Control", e:{safety:5}} },
    { text: "Cyclist on the Connector (Illegal). Says he's 'training for Ironman'.", icon: "🚴", left: {t:"Escort Off", e:{safety:10}}, right: {t:"Ticket", e:{stats:5, trust:-5}} },
    { text: "Car broke down in the Starbucks drive-thru line. People are honking.", icon: "☕", left: {t:"Push Car", e:{trust:10}}, right: {t:"Ticket Noise", e:{trust:-10}} },
    { text: "Sofa fell off a truck on the Cosgrove Bridge.", icon: "🛋️", left: {t:"Drag it", e:{safety:-5, trust:5}}, right: {t:"Radio DOT", e:{safety:5, trust:-5}} },
    { text: "Massive pothole on King St popped three tires in an hour.", icon: "🕳️", left: {t:"Place Cone", e:{safety:5}}, right: {t:"Ignore", e:{safety:-5, trust:-5}} },
    { text: "Speeding Tesla. Driver claims the car 'did it, not me'.", icon: "🤖", left: {t:"Ticket Driver", e:{stats:5}}, right: {t:"Ticket Car", e:{stats:-2}} },
    { text: "School bus broken down. Kids standing on the side of the road.", icon: "🚌", left: {t:"Stand guard", e:{safety:5, trust:10}}, right: {t:"Keep patrolling", e:{trust:-10}} },
    { text: "Funeral procession for a local legend. 50 cars long.", icon: "⚰️", left: {t:"Escort", e:{trust:10, time:-5}}, right: {t:"Salute", e:{trust:5}} },
    { text: "Tree trimming truck blocking two lanes without a permit.", icon: "🌳", left: {t:"Shut down", e:{stats:5}}, right: {t:"Let them finish", e:{trust:5}} },
    { text: "Vanity plate says 'NO COP'.", icon: "😐", left: {t:"Pull over", e:{stats:2, time:-5}}, right: {t:"Chuckle", e:{trust:2}} },
    { text: "Driver reading a paperback book on the steering wheel.", icon: "📖", left: {t:"Distracted Ticket", e:{stats:5}}, right: {t:"Horn Blast", e:{safety:2}} },
    { text: "Ladder in the middle of I-526.", icon: "🪜", left: {t:"Grab it", e:{safety:-10, trust:5}}, right: {t:"Call Dispatch", e:{safety:5}} },
    { text: "Semi-truck stuck under a low hanging oak tree.", icon: "🌳", left: {t:"Let air out tires", e:{trust:10}}, right: {t:"Wait for Tow", e:{time:-10}} },
    { text: "Convertible driving in rain with top down. Driver soaking wet.", icon: "🌧️", left: {t:"Safety Check", e:{trust:5}}, right: {t:"Laugh", e:{morale:2}} },
    { text: "Someone abandoned a boat on the side of the road.", icon: "🛥️", left: {t:"Tag for Tow", e:{stats:2}}, right: {t:"Check for bodies", e:{safety:-2}} },
    { text: "Driver using a megaphone to yell at pedestrians.", icon: "📢", left: {t:"Disturbing Peace", e:{stats:5}}, right: {t:"Ignore", e:{trust:-2}} },
    { text: "Smoke coming from under hood. Driver says 'It always does that'.", icon: "💨", left: {t:"Force Stop", e:{safety:5}}, right: {t:"Let go", e:{safety:-5}} },

    // --- SERVICE CALLS: WILDLIFE ---
    { text: "Alligator under a car in a West Ashley driveway.", icon: "🐊", left: {t:"Wrangle It", e:{trust:10, safety:-10}}, right: {t:"Call DNR", e:{safety:5}} },
    { text: "Snake in a toilet in Awendaw.", icon: "🐍", left: {t:"Remove it", e:{trust:5, safety:-2}}, right: {t:"Not my job", e:{trust:-5}} },
    { text: "Cow loose on the road near Johns Island.", icon: "🐄", left: {t:"Herd it", e:{trust:5, safety:-5}}, right: {t:"Call Animal Control", e:{safety:5}} },
    { text: "Raccoon stuck in a dumpster behind a restaurant.", icon: "🦝", left: {t:"Open lid", e:{trust:2}}, right: {t:"Leave it", e:{trust:-2}} },
    { text: "Report of a shark sighting near the swimming zone at Isle of Palms.", icon: "🦈", left: {t:"Clear Water", e:{safety:10, trust:-5}}, right: {t:"Monitor", e:{safety:-5}} },
    { text: "Opossum playing dead in the middle of a traffic circle.", icon: "🐀", left: {t:"Move it", e:{safety:2}}, right: {t:"Drive around", e:{trust:-2}} },
    { text: "Coyote spotted near a playground in Mt Pleasant.", icon: "🐺", left: {t:"Scare off", e:{safety:5}}, right: {t:"Monitor", e:{time:-2}} },
    { text: "Swarm of bees on a park bench.", icon: "🐝", left: {t:"Tape off area", e:{safety:5}}, right: {t:"Call Beekeeper", e:{trust:5}} },
    { text: "Drunk tourist trying to ride a carriage horse.", icon: "🐴", left: {t:"Arrest", e:{stats:5}}, right: {t:"Tackle him", e:{safety:-2, trust:5}} },
    { text: "Pelican with a fishing line wrapped around its wing.", icon: "🐦", left: {t:"Cut line", e:{trust:10, safety:-2}}, right: {t:"Call Rehabber", e:{time:-5}} },
    { text: "Dolphin stranded in shallow creek at low tide.", icon: "🐬", left: {t:"Bucket Water", e:{trust:10, safety:-5}}, right: {t:"Call NOAA", e:{safety:5}} },
    { text: "Wild boar tearing up a golf course.", icon: "🐗", left: {t:"Shoot", e:{trust:-5, safety:5}}, right: {t:"Chase", e:{trust:5, safety:-5}} },
    { text: "Report of a 'Monkey' in a tree. It's a large squirrel.", icon: "🐿️", left: {t:"Confirm", e:{time:-2}}, right: {t:"Ignore", e:{stats:2}} },
    { text: "Turtle crossing a 4-lane highway.", icon: "🐢", left: {t:"Stop Traffic", e:{trust:10, safety:-5}}, right: {t:"Drive by", e:{safety:5}} },
    { text: "Snake in the engine block of a Honda Civic.", icon: "🐍", left: {t:"Grab tail", e:{safety:-5, trust:5}}, right: {t:"Call Animal Ctrl", e:{safety:5}} },
    { text: "Dead deer on the shoulder of Rifle Range Rd.", icon: "🦌", left: {t:"Call cleanup", e:{trust:2}}, right: {t:"Leave it", e:{trust:-2}} },
    { text: "Tourist poked a jellyfish. Hand is stinging.", icon: "🎐", left: {t:"Vinegar", e:{trust:5}}, right: {t:"Not a Doctor", e:{trust:-5}} },
    { text: "Seagull stole a woman's purse. It's flying away.", icon: "🐦", left: {t:"Chase bird", e:{trust:5, stats:-2}}, right: {t:"File Report", e:{stats:2}} },
    { text: "Shark fisherman caught a hammerhead on the beach.", icon: "🦈", left: {t:"Make release", e:{trust:5}}, right: {t:"Take photo", e:{trust:-2}} },
    { text: "Bobcat spotted near a golf course.", icon: "😼", left: {t:"Warn golfers", e:{safety:5}}, right: {t:"It's nature", e:{trust:2}} },
    { text: "Dolphin begging for food at the marina.", icon: "🐬", left: {t:"Ticket feeders", e:{stats:5}}, right: {t:"Watch", e:{time:-2}} },
    { text: "Armadillo digging up a manicured lawn.", icon: "🐀", left: {t:"Shrug", e:{trust:-2}}, right: {t:"Advise owner", e:{trust:2}} },
    { text: "Red Wolf sighting (Rare).", icon: "🐺", left: {t:"Call DNR", e:{trust:5}}, right: {t:"Track it", e:{time:-5}} },
    { text: "Stingray barb in a surfer's foot.", icon: "🦶", left: {t:"First Aid", e:{trust:5}}, right: {t:"Call EMS", e:{safety:5}} },
    { text: "Wild turkey attacking a mailman.", icon: "🦃", left: {t:"Help Mailman", e:{trust:10}}, right: {t:"Film it", e:{morale:5, trust:-5}} },
    { text: "Report of 'Bigfoot' in Francis Marion Forest.", icon: "👣", left: {t:"Investigate", e:{time:-10}}, right: {t:"Close ticket", e:{stats:2}} },
    { text: "Swarm of lovebugs covering your windshield.", icon: "🪰", left: {t:"Clean it", e:{safety:2}}, right: {t:"Drive blind", e:{safety:-5}} },
    { text: "Pelican landed on a police cruiser and won't move.", icon: "🐦", left: {t:"Drive slowly", e:{morale:5}}, right: {t:"Shoo it", e:{trust:-2}} },
    { text: "Baby alligator in a swimming pool.", icon: "🏊", left: {t:"Net it", e:{safety:-5, trust:5}}, right: {t:"Call Pro", e:{safety:5}} },
    { text: "Marsh pony blocking the road on barrier island.", icon: "🐴", left: {t:"Honk", e:{trust:-5}}, right: {t:"Wait", e:{trust:5}} },
    { text: "Otters sliding on a dock.", icon: "🦦", left: {t:"Cute", e:{morale:2}}, right: {t:"Check damages", e:{stats:2}} },
    { text: "Bat flying around inside the station.", icon: "🦇", left: {t:"Broom", e:{safety:-2}}, right: {t:"Hide", e:{morale:-5}} },

    // --- SERVICE CALLS: PEOPLE & DISTURBANCES ---
    { text: "Wedding band playing too loud at a plantation venue.", icon: "💍", left: {t:"Shut down", e:{stats:5, trust:-10}}, right: {t:"Ask to lower", e:{trust:5}} },
    { text: "Two neighbors fighting over a property line fence.", icon: "🏡", left: {t:"Mediate", e:{trust:5, time:-5}}, right: {t:"Civil Matter (Leave)", e:{trust:-5}} },
    { text: "Kids throwing water balloons at cars on Halloween.", icon: "🎈", left: {t:"Scare them", e:{trust:-2}}, right: {t:"Talk to parents", e:{trust:5}} },
    { text: "Trespassers climbing the ruins at the old Navy Base.", icon: "🏗️", left: {t:"Arrest", e:{stats:5}}, right: {t:"Warning", e:{trust:5}} },
    { text: "Drunk guy passed out on a bench at The Battery.", icon: "🥴", left: {t:"Arrest PI", e:{stats:5}}, right: {t:"Call Taxi", e:{trust:5, budget:-2}} },
    { text: "Suspicious person walking in a neighborhood. It's just a delivery driver.", icon: "📦", left: {t:"Harass him", e:{trust:-10}}, right: {t:"Wave", e:{trust:5}} },
    { text: "Film crew for 'Outer Banks' blocking a sidewalk without permit.", icon: "🎬", left: {t:"Shut down shoot", e:{stats:5}}, right: {t:"Ask for Autograph", e:{trust:5}} },
    { text: "Report of shots fired. Turns out it's just fireworks.", icon: "🎆", left: {t:"Investigate", e:{safety:5}}, right: {t:"Ignore", e:{safety:-5}} },
    { text: "Ghost tour guide screaming too loud in a residential area.", icon: "👻", left: {t:"Quiet them", e:{trust:5}}, right: {t:"Ticket company", e:{stats:5}} },
    { text: "Sovereign Citizen filming inside the post office.", icon: "🎥", left: {t:"Trespass him", e:{stats:5, trust:-5}}, right: {t:"Ignore", e:{trust:2}} },
    { text: "Teenagers skateboarding on the Town Hall steps.", icon: "🛹", left: {t:"Chase off", e:{trust:-2}}, right: {t:"Connect with youth", e:{trust:5}} },
    { text: "Woman calling 911 because McDonald's is out of sweet tea.", icon: "🥤", left: {t:"Arrest Misuse", e:{stats:5}}, right: {t:"Lecture her", e:{trust:5}} },
    { text: "Man metal detecting on a protected historical site.", icon: "🪙", left: {t:"Confiscate", e:{stats:5, trust:-5}}, right: {t:"Warning", e:{trust:5}} },
    { text: "Bachelorette party lost and crying in an alley.", icon: "👯", left: {t:"Help them", e:{trust:5}}, right: {t:"Ignore", e:{trust:-2}} },
    { text: "Fight at a Waffle House at 3 AM.", icon: "🧇", left: {t:"Break it up", e:{safety:-5, stats:5}}, right: {t:"Wait for backup", e:{safety:5}} },
    { text: "Homeless regular asking tourists for money.", icon: "💵", left: {t:"Move along", e:{trust:-2}}, right: {t:"Buy lunch", e:{budget:-2, trust:5}} },
    { text: "Parents left child in car with windows down (It's 75 degrees).", icon: "🌡️", left: {t:"Call DSS", e:{stats:5, trust:-5}}, right: {t:"Wait for parents", e:{trust:5, time:-5}} },
    { text: "Shoplifter at Walmart fighting Loss Prevention.", icon: "🛒", left: {t:"Tase him", e:{stats:5, trust:-5}}, right: {t:"Tackle him", e:{safety:-5, stats:5}} },
    { text: "Report of a 'creepy clown' standing on a corner.", icon: "🤡", left: {t:"Investigate", e:{safety:-2}}, right: {t:"Ignore", e:{trust:-2}} },
    { text: "Granny on a mobility scooter blocking traffic.", icon: "👵", left: {t:"Escort", e:{trust:5}}, right: {t:"Ticket", e:{stats:5, trust:-10}} },
    { text: "Kids throwing eggs at houses.", icon: "🥚", left: {t:"Chase", e:{stats:2}}, right: {t:"Clean up", e:{trust:5}} },
    { text: "Alarm at a donut shop. Probably false.", icon: "🍩", left: {t:"Check it", e:{trust:2}}, right: {t:"Prioritize", e:{morale:5}} },
    { text: "Man yelling at a mailbox.", icon: "mailbox", left: {t:"Welfare Check", e:{trust:5}}, right: {t:"Drive by", e:{safety:2}} },
    { text: "Report of a drone peeping in windows.", icon: "🚁", left: {t:"Find Pilot", e:{stats:5}}, right: {t:"Shoot drone", e:{safety:-5, trust:-5}} },
    { text: "Teenagers climbing a water tower.", icon: "🗼", left: {t:"Megaphone", e:{safety:5}}, right: {t:"Climb up", e:{safety:-10}} },
    { text: "Dispute over a parking spot at Walmart.", icon: "🚗", left: {t:"Mediate", e:{trust:5}}, right: {t:"Trespass both", e:{stats:5}} },
    { text: "Construction noise complaint at 7 AM.", icon: "🔨", left: {t:"Check Permit", e:{stats:2}}, right: {t:"It's legal", e:{trust:-2}} },
    { text: "Person sleeping in an ATM vestibule.", icon: "🏧", left: {t:"Move along", e:{trust:-2}}, right: {t:"Check welfare", e:{trust:5}} },
    { text: "Lost child at the aquarium.", icon: "🐠", left: {t:"Search", e:{trust:10}}, right: {t:"PA System", e:{trust:5}} },
    { text: "Shop owner holding a shoplifter.", icon: "🏪", left: {t:"Arrest", e:{stats:5}}, right: {t:"Warning", e:{trust:5}} },
    { text: "Bartender refusing to serve intoxicated mayor.", icon: "🍺", left: {t:"Back Bartender", e:{trust:5, budget:-5}}, right: {t:"Drive Mayor", e:{budget:5, trust:-5}} },
    { text: "Report of unauthorized bonfire on beach.", icon: "🔥", left: {t:"Extinguish", e:{safety:5}}, right: {t:"Join them", e:{trust:5, stats:-5}} },
    { text: "Someone stole a street sign.", icon: "🛑", left: {t:"File Report", e:{stats:2}}, right: {t:"Search area", e:{time:-5}} },
    { text: "Dog locked in a car at the mall.", icon: "🐶", left: {t:"Break window", e:{trust:10, budget:-2}}, right: {t:"Page owner", e:{safety:-5}} },
    { text: "Musician playing bagpipes too loudly.", icon: "🎵", left: {t:"Ask to stop", e:{trust:-2}}, right: {t:"Enjoy music", e:{trust:5}} },
    { text: "Report of a 'Laser' pointed at a plane.", icon: "🟢", left: {t:"Find source", e:{stats:10, safety:5}}, right: {t:"Call Feds", e:{stats:-2}} },
    { text: "Someone dumping trash in the marsh.", icon: "🗑️", left: {t:"Litter Ticket", e:{stats:5, trust:5}}, right: {t:"Make them clean", e:{trust:10}} },
    { text: "911 Hangup call. Sounds like a pocket dial.", icon: "📞", left: {t:"Check location", e:{safety:5}}, right: {t:"Call back", e:{time:-2}} },

    // --- WEATHER & ENVIRONMENT ---
    { text: "Flash flooding on Crosstown. Car stalled in water.", icon: "🌊", left: {t:"Wade in/Push", e:{trust:10, safety:-5}}, right: {t:"Block Road", e:{safety:5, trust:-5}} },
    { text: "Tree down blocking River Road after a storm.", icon: "🌳", left: {t:"Use Chainsaw", e:{trust:10, safety:-5}}, right: {t:"Wait for DOT", e:{safety:5, trust:-5}} },
    { text: "High Tide flooding the Market. Tourists stuck.", icon: "👢", left: {t:"Carry them", e:{trust:10, safety:-2}}, right: {t:"Point and laugh", e:{trust:-10}} },
    { text: "Palmetto bug (cockroach) flying around inside your patrol car.", icon: "🪳", left: {t:"Crash Car", e:{budget:-10, safety:-5}}, right: {t:"Kill it", e:{safety:-2}} },
    { text: "Extreme Heat. AC broke in elderly woman's house.", icon: "☀️", left: {t:"Buy Fan", e:{budget:-2, trust:10}}, right: {t:"Call Social Svcs", e:{time:-5}} },
    { text: "Fog so thick on the bridge you can't see 10ft.", icon: "🌫️", left: {t:"Pace Traffic", e:{safety:10}}, right: {t:"Close Bridge", e:{trust:-10}} },
    { text: "King Tides. Water breaching the Battery wall.", icon: "🌊", left: {t:"Close Battery", e:{safety:5}}, right: {t:"Allow Walkers", e:{trust:5, safety:-5}} },
    { text: "Pollen Season. Windshield covered in yellow dust. Can't see.", icon: "🤧", left: {t:"Car Wash", e:{budget:-2}}, right: {t:"Drive Dirty", e:{safety:-2}} },
    { text: "Humidity is 100%. Uniform is soaked.", icon: "💧", left: {t:"Change shirt", e:{morale:2}}, right: {t:"Power through", e:{morale:-2}} },
    { text: "Mosquito truck spraying fog. Can't see.", icon: "🌫️", left: {t:"Stop car", e:{safety:5}}, right: {t:"Drive slow", e:{safety:-2}} },
    { text: "Sand gnats attacking you during a stop.", icon: "🦟", left: {t:"Hurry up", e:{trust:-2}}, right: {t:"Bug spray", e:{safety:2}} },
    { text: "Sudden afternoon thunderstorm. Visibility zero.", icon: "⚡", left: {t:"Pull over", e:{safety:5}}, right: {t:"Lights on", e:{safety:-5}} },
    { text: "Full Moon. The crazies are out.", icon: "🌕", left: {t:"Stay alert", e:{safety:5}}, right: {t:"Coffee", e:{morale:2}} },
    { text: "Dispatcher sounds sick.", icon: "🤒", left: {t:"Send soup", e:{morale:5}}, right: {t:"Ignore", e:{stats:0}} },
    { text: "Food truck offers free BBQ.", icon: "🍖", left: {t:"Accept", e:{budget:2, trust:5}}, right: {t:"Decline (Policy)", e:{stats:2}} },
    { text: "Found a wallet with $500 cash.", icon: "💵", left: {t:"Turn in", e:{trust:5}}, right: {t:"Pocket it", e:{budget:10, stats:-10}} },
    { text: "Rookie tripped over a curb.", icon: "🤕", left: {t:"Laugh", e:{morale:5}}, right: {t:"Help up", e:{trust:5}} },
    { text: "Radio dead spot near the swamp.", icon: "📻", left: {t:"Move car", e:{safety:5}}, right: {t:"Wait", e:{safety:-5}} },
    { text: "Coffee shop gives you the 'Cop Discount'.", icon: "☕", left: {t:"Tip well", e:{trust:5}}, right: {t:"Take it", e:{budget:2}} },
    { text: "Boater waving flag. Just saying hello.", icon: "👋", left: {t:"Wave back", e:{trust:5}}, right: {t:"Ignore", e:{trust:-2}} },
    { text: "Sunrise over the marsh is beautiful.", icon: "🌅", left: {t:"Take photo", e:{morale:5}}, right: {t:"Focus", e:{stats:2}} },
    { text: "Old timer telling war stories at the gas station.", icon: "🎖️", left: {t:"Listen", e:{trust:10, time:-5}}, right: {t:"Leave", e:{stats:2}} },
    { text: "Civil War reenactors walking down road with muskets.", icon: "💂", left: {t:"Safety check", e:{safety:2}}, right: {t:"Salute", e:{trust:5}} },
    { text: "Smell of pluff mud is overwhelming today.", icon: "👃", left: {t:"Windows up", e:{morale:-2}}, right: {t:"Love it", e:{morale:2}} },
    { text: "Kids opened a lemonade stand.", icon: "🍋", left: {t:"Buy cup", e:{trust:10}}, right: {t:"Check permit", e:{trust:-20}} },
    { text: "Found an old cannonball on the beach.", icon: "💣", left: {t:"Bomb Squad", e:{safety:10}}, right: {t:"Keep it", e:{safety:-10}} },
    { text: "Reporter wants a ride-along.", icon: "🎤", left: {t:"Accept", e:{trust:5, stats:-5}}, right: {t:"Refuse", e:{stats:5}} },
    { text: "Your favorite lunch spot is closed.", icon: "🥪", left: {t:"Gas station sushi", e:{safety:-5}}, right: {t:"Starve", e:{morale:-5}} },

    // --- LOCAL FLAVOR ---
    { text: "Bill Murray crashed a house party and is tending bar.", icon: "🍸", left: {t:"Party on", e:{trust:10}}, right: {t:"Shut it down", e:{trust:-20}} },
    { text: "Shrimper selling shrimp out of a cooler on the roadside.", icon: "🦐", left: {t:"Buy a bag", e:{trust:5, budget:-2}}, right: {t:"Check Permit", e:{stats:2, trust:-5}} },
    { text: "Sweetgrass basket weaver complains about a tourist lowballing her.", icon: "🧺", left: {t:"Defend Weaver", e:{trust:10}}, right: {t:"Civil Dispute", e:{trust:-2}} },
    { text: "Found a bag of boiled peanuts left on a bench.", icon: "🥜", left: {t:"Eat them", e:{safety:-2}}, right: {t:"Trash them", e:{safety:2}} },
    { text: "Report of a 'UFO' over the marsh. It's SpaceX.", icon: "🚀", left: {t:"Explain it", e:{trust:5}}, right: {t:"Investigate anyway", e:{time:-5}} },
    { text: "Polo match traffic jam at Kiawah.", icon: "🏇", left: {t:"Direct Traffic", e:{trust:5}}, right: {t:"Ticket limos", e:{stats:10, budget:10}} },
    { text: "Missing person reported. Found at a rooftop bar.", icon: "🍸", left: {t:"Scold them", e:{trust:-2}}, right: {t:"Reunite family", e:{trust:10}} },
    { text: "Kayaker stuck in Pluff Mud at low tide.", icon: "💩", left: {t:"Mud Rescue", e:{trust:10, safety:-5}}, right: {t:"Wait for tide", e:{safety:5}} },
    { text: "Carriage horse diaper bag is full and leaking.", icon: "💩", left: {t:"Fine Operator", e:{stats:5}}, right: {t:"Ignore smell", e:{trust:-2}} },
    { text: "Tourist asks where the 'Banks' (Outer Banks) are.", icon: "🗺️", left: {t:"Correct them", e:{trust:5}}, right: {t:"Send to NC", e:{trust:-5}} },
    { text: "Local complains that 'Charleston isn't what it used to be'.", icon: "👴", left: {t:"Agree", e:{trust:5}}, right: {t:"Ignore", e:{trust:-2}} },
    { text: "College of Charleston student jaywalking while texting.", icon: "📱", left: {t:"scare with siren", e:{trust:-2}}, right: {t:"Ticket", e:{stats:2, trust:-5}} },
    { text: "Food truck parked illegally but smells amazing.", icon: "🌮", left: {t:"Buy Taco", e:{budget:-2, trust:5}}, right: {t:"Ticket", e:{stats:5, trust:-5}} },
    { text: "Yacht docked illegally at the Mega-Dock.", icon: "⚓", left: {t:"Seize it", e:{stats:10, budget:10}}, right: {t:"Warning", e:{trust:5}} },
    { text: "Tourist asks 'What time do they turn off the waterfalls?' (Tides).", icon: "🌊", left: {t:"Explain tides", e:{trust:5}}, right: {t:"Stare blankly", e:{trust:-2}} },
    { text: "Man in speedo walking down King Street.", icon: "🩲", left: {t:"Indecent Exposure", e:{stats:5}}, right: {t:"Ask to cover", e:{trust:5}} },
    { text: "Family sunburned lobster-red asking for aloe.", icon: "🦞", left: {t:"Pharmacy directions", e:{trust:5}}, right: {t:"Ignore", e:{trust:-2}} },
    { text: "Tourist trying to pet a K-9 dog through the window.", icon: "🐕", left: {t:"Stop them", e:{safety:5}}, right: {t:"Scare them", e:{trust:-5}} },
    { text: "Ohio license plate lost in a roundabout.", icon: "🔄", left: {t:"Guide out", e:{trust:5}}, right: {t:"Watch them circle", e:{morale:5}} },
    { text: "Woman complaining the cobblestones hurt her heels.", icon: "👠", left: {t:"Apologize", e:{trust:2}}, right: {t:"'Buy flats'", e:{trust:-2}} },
    { text: "Tourist asks where to find 'The Notebook' house.", icon: "🏡", left: {t:"Give directions", e:{trust:5}}, right: {t:"'Wrong movie'", e:{trust:-2}} },
    { text: "Man using a metal detector on the golf course.", icon: "⛳", left: {t:"Kick off", e:{stats:2}}, right: {t:"Ask what he found", e:{trust:2}} },
    { text: "Couple fighting over directions to Bubba Gump.", icon: "🦐", left: {t:"Point way", e:{trust:5}}, right: {t:"Ignore", e:{stats:2}} },
    { text: "Tourist dropped phone in the marsh.", icon: "📱", left: {t:"Say 'It's gone'", e:{trust:2}}, right: {t:"Help look", e:{time:-5}} },
    { text: "Visitor complains the shrimp and grits is 'too gritty'.", icon: "🥣", left: {t:"Explain Grits", e:{trust:5}}, right: {t:"Walk away", e:{trust:-2}} },
    { text: "RV stuck in a parking garage entrance.", icon: "🚐", left: {t:"Deflate tires", e:{trust:5}}, right: {t:"Call Big Tow", e:{time:-10}} },
    { text: "Tourist trying to climb the sea wall.", icon: "🧱", left: {t:"Get down", e:{safety:5}}, right: {t:"Let them fall", e:{safety:-5}} },
    { text: "Group asking if there are vampires in Charleston.", icon: "🧛", left: {t:"'Only mosquitoes'", e:{trust:5}}, right: {t:"'Yes'", e:{trust:-2}} },
    { text: "Woman lost her hat in the wind on the bridge.", icon: "👒", left: {t:"Stop traffic", e:{safety:-5, trust:-5}}, right: {t:"It's gone", e:{safety:5}} },
    { text: "Tourist asking if he can open carry a sword.", icon: "⚔️", left: {t:"No", e:{stats:2}}, right: {t:"Check laws", e:{time:-2}} },
    { text: "Drunk guy trying to swim to Fort Sumter.", icon: "🏊", left: {t:"Boat Rescue", e:{safety:-5, trust:5}}, right: {t:"Yell 'Shark!'", e:{trust:5}} },
    { text: "Family feeding pizza to horses.", icon: "🍕", left: {t:"Stop them", e:{safety:5}}, right: {t:"Ignore", e:{trust:-5}} },
    { text: "Tourist asks 'Is that a real cannon?'", icon: "💣", left: {t:"'Yes, don't touch'", e:{safety:5}}, right: {t:"'It's fake'", e:{trust:-2}} },
    { text: "Visitor complaining about the smell of pluff mud.", icon: "👃", left: {t:"'Smells like money'", e:{trust:5}}, right: {t:"Agree", e:{trust:2}} },
    // --- BATCH 3: SEASONAL & RARE EVENTS (The "Cherry on Top") ---

    // SPRING (Pollen, SEWE, Bridge Run)
    { text: "The Cooper River Bridge Run. 40,000 runners needing security.", icon: "🏃", left: {t:"Close Bridge", e:{safety:10, trust:-10}}, right: {t:"High Five Runners", e:{trust:10, stats:-5}} },
    { text: "SEWE (Wildlife Expo) weekend. Retreivers loose downtown.", icon: "🐕", left: {t:"Pet Dogs", e:{morale:5}}, right: {t:"Direct Traffic", e:{safety:5}} },
    { text: "Pollening. Everything is covered in yellow dust. Cameras blocked.", icon: "🌼", left: {t:"Wash Fleet", e:{budget:-5}}, right: {t:"Drive Dirty", e:{safety:-5}} },
    { text: "Spring Breakers destroying a rental house on IOP.", icon: "🍻", left: {t:"Raid House", e:{stats:10, trust:-5}}, right: {t:"Warning", e:{trust:5}} },
    { text: "Easter Sunday traffic jam around the churches.", icon: "⛪", left: {t:"Direct Traffic", e:{trust:5}}, right: {t:"Ticket Parking", e:{stats:5, trust:-20}} },
    { text: "Azalea Festival parade blocking Summerville traffic.", icon: "🌺", left: {t:"Detour", e:{safety:5}}, right: {t:"Join Parade", e:{trust:10, stats:-5}} },
    { text: "Golf Tournament (PGA) in town. VIPs everywhere.", icon: "⛳", left: {t:"Security Detail", e:{budget:10, stats:-5}}, right: {t:"Regular Patrol", e:{trust:5}} },

    // SUMMER (Heat, Tourists, July 4th)
    { text: "July 4th. 500 calls about 'gunshots' that are just fireworks.", icon: "🎆", left: {t:"Ignore All", e:{safety:-5}}, right: {t:"Patrol Neighborhoods", e:{trust:5, morale:-5}} },
    { text: "Heat Index 110°F. Asphalt is melting.", icon: "🔥", left: {t:"Shorten Shifts", e:{morale:10, stats:-10}}, right: {t:"Hydrate", e:{safety:2}} },
    { text: "Tourist season peak. Traffic at standstill on Hwy 17.", icon: "🚗", left: {t:"Aggressive Control", e:{stats:5, trust:-10}}, right: {t:"Wait it out", e:{morale:-5}} },
    { text: "Mosquito truck fogging neighborhoods. People panic.", icon: "🦟", left: {t:"Explain it", e:{trust:5}}, right: {t:"Wear Mask", e:{safety:5}} },
    { text: "Beach traffic backed up for 5 miles.", icon: "🏖️", left: {t:"Turn cars away", e:{safety:5, trust:-10}}, right: {t:"Let them suffer", e:{trust:-5}} },
    { text: "Air Conditioning broke in the Dispatch center.", icon: "🌡️", left: {t:"Fix Immediately", e:{budget:-10}}, right: {t:"Fans", e:{morale:-20}} },
    { text: "Shark week hype. Everyone reporting 'fins' in the water.", icon: "🦈", left: {t:"Close Beaches", e:{trust:-5}}, right: {t:"Ignore Hype", e:{stats:2}} },

    // FALL (Hurricanes, Floods, Halloween)
    { text: "Halloween. Kids egging police cars.", icon: "🎃", left: {t:"Chase them", e:{stats:2}}, right: {t:"Clean it up", e:{trust:5}} },
    { text: "King Tides. Water breaching the Battery wall.", icon: "🌊", left: {t:"Close Road", e:{safety:5}}, right: {t:"Allow Wading", e:{trust:5, safety:-10}} },
    { text: "Hurricane Watch issued. Grocery stores empty.", icon: "🍞", left: {t:"Stockpile", e:{budget:-5}}, right: {t:"Patrol Stores", e:{safety:5}} },
    { text: "College football game day. Drunk tailgaters.", icon: "🏈", left: {t:"Enforce Laws", e:{stats:10, trust:-10}}, right: {t:"Designated Drivers", e:{trust:10}} },
    { text: "Thanksgiving. Turkeys fryer fire reported.", icon: "🦃", left: {t:"Fire Dept Assist", e:{safety:5}}, right: {t:"Traffic Control", e:{stats:2}} },
    { text: "Oyster Roast smoke blowing across the highway.", icon: "🦪", left: {t:"Slow Traffic", e:{safety:5}}, right: {t:"Stop Roast", e:{trust:-10}} },
    { text: "Ghost Tour guide scaring tourists too much.", icon: "👻", left: {t:"Laugh", e:{morale:5}}, right: {t:"Warning", e:{trust:2}} },

    // WINTER (Rare Snow, Christmas)
    { text: "Christmas Parade of Boats. Spectators falling off docks.", icon: "🎄", left: {t:"Marine Rescue", e:{trust:10, safety:-5}}, right: {t:"Crowd Control", e:{safety:5}} },
    { text: "Rare Snow Flurry (0.1 inches). Entire county shuts down.", icon: "❄️", left: {t:"Close Roads", e:{safety:10, trust:-5}}, right: {t:"It's just ice", e:{safety:-20}} },
    { text: "New Year's Eve. King Street is a zoo.", icon: "🥂", left: {t:"DUI Checkpoint", e:{stats:20, trust:-10}}, right: {t:"Foot Patrol", e:{trust:10, safety:-5}} },
    { text: "Heaters broke in the Jail. It's 30 degrees.", icon: "🥶", left: {t:"Blankets", e:{budget:-5}}, right: {t:"Huddle up", e:{morale:-10, trust:-10}} },
    { text: "Shopping Mall parking lot rage over spots.", icon: "🎁", left: {t:"Ticket Aggression", e:{stats:5}}, right: {t:"Stay away", e:{safety:5}} },
    { text: "Porch pirates stealing Amazon packages.", icon: "📦", left: {t:"Sting Op", e:{stats:10, time:-5}}, right: {t:"Community Warning", e:{trust:5}} },
    { text: "Drunk Santa Claus stumbling in the road.", icon: "🎅", left: {t:"Ride home", e:{trust:10}}, right: {t:"Arrest Santa", e:{stats:5, trust:-20}} },

    // RARE / WEIRD CHARLESTON LORE
    { text: "Stephen Colbert spotted eating at Waffle House.", icon: "🧇", left: {t:"Selfie", e:{trust:5}}, right: {t:"Leave him be", e:{trust:5}} },
    { text: "Darius Rucker is speeding. 'Hootie' detected.", icon: "🎸", left: {t:"Warning", e:{trust:10}}, right: {t:"Ticket Hootie", e:{stats:5, trust:-10}} },
    { text: "A Civil War cannonball washed up on Folly Beach.", icon: "💣", left: {t:"Bomb Squad", e:{safety:10, budget:-5}}, right: {t:"Put in trunk", e:{safety:-50}} }, // BOOM
    { text: "The 'Lizard Man' reported in the swamp.", icon: "🦎", left: {t:"Investigate", e:{time:-5}}, right: {t:"It's a hoax", e:{stats:2}} },
    { text: "Container ship stuck sideways (Evergiven style).", icon: "🚢", left: {t:"Panic", e:{safety:-5}}, right: {t:"Close Bridge", e:{safety:10}} },
    { text: "Gullah Geechee elder offers you a blessing.", icon: "🤲", left: {t:"Accept", e:{trust:10, morale:10}}, right: {t:"Decline", e:{trust:-5}} },
    { text: "Film crew blowing up a car for a movie.", icon: "💥", left: {t:"Watch", e:{morale:5}}, right: {t:"Safety Check", e:{safety:5}} },
    { text: "A submarine is being towed into the harbor.", icon: "⚓", left: {t:"Escort", e:{trust:5}}, right: {t:"Salute", e:{morale:5}} },
    { text: "Someone found gold coins on the beach.", icon: "🪙", left: {t:"Secure area", e:{safety:5}}, right: {t:"Start digging", e:{trust:-5, budget:5}} },
    { text: "Report of a ghost walking down Battery St.", icon: "👻", left: {t:"Shine spotlight", e:{trust:-2}}, right: {t:"Drive past", e:{morale:-2}} },
    { text: "Local mascot 'Charlie T. Riverdog' speeding to game.", icon: "🐶", left: {t:"Ticket", e:{stats:5}}, right: {t:"Escort", e:{trust:5}} },
    { text: "Confederate Submarine Hunley is being moved.", icon: "⚰️", left: {t:"Escort", e:{trust:5}}, right: {t:"Block Traffic", e:{safety:5}} },
    { text: "A massive swarm of dragonflies.", icon: "🐉", left: {t:"Wipers on", e:{safety:2}}, right: {t:"Stop car", e:{time:-2}} },
    { text: "SpaceX debris fell in a farmer's field.", icon: "🚀", left: {t:"Call NASA", e:{trust:5}}, right: {t:"Touch it", e:{safety:-5}} },
    { text: "Runaway bride on the Connector.", icon: "👰", left: {t:"Give ride", e:{trust:10}}, right: {t:"Walk her off", e:{safety:5}} },
    { text: "Food critic poisoning at fancy restaurant.", icon: "🤢", left: {t:"Secure Kitchen", e:{safety:5}}, right: {t:"Call EMS", e:{trust:5}} }
];

// TIER 2: THE HEAT (High Stakes & Dangerous Calls)
const HEAT_CARDS = [
    { text: "High Speed Chase on I-26! Suspect doing 130mph.", icon: "💨", left: {t:"PIT Maneuver", e:{safety:-20, stats:20, budget:-10}}, right: {t:"Call Air One", e:{safety:10, budget:-5}} },
    { text: "Felony Stop: Stolen car detected by LPR (License Plate Reader).", icon: "🚔", left: {t:"Gunpoint Stop", e:{safety:5, trust:-5}}, right: {t:"Wait for Backup", e:{safety:10, stats:-5}} },
    { text: "Active Shooter reported at a bar on Shem Creek.", icon: "🔫", left: {t:"Enter Solo", e:{safety:-40, trust:40, stats:20}}, right: {t:"Wait for SWAT", e:{safety:10, trust:-40}} },
    { text: "Traffic Stop turns violent. Driver reaching under seat.", icon: "✋", left: {t:"Draw Weapon", e:{safety:5, trust:-10}}, right: {t:"Retreat/Cover", e:{safety:-5, stats:-5}} },
    { text: "Boat sinking in the Harbor. Family in the water.", icon: "🆘", left: {t:"Marine Rescue", e:{budget:-10, trust:20}}, right: {t:"Call Coast Guard", e:{trust:-5}} },
    { text: "Hurricane Warning! Cat 3 hitting at high tide.", icon: "🌀", left: {t:"Forced Evac", e:{trust:-20, safety:10}}, right: {t:"Shelter in Place", e:{trust:10, safety:-20}} },
    { text: "Deputy accused of excessive force. Video is viral.", icon: "📹", left: {t:"Fire Him", e:{trust:20, stats:-10}}, right: {t:"Back Him", e:{trust:-30, stats:5}} },
    { text: "Meth lab explosion in a trailer park.", icon: "💥", left: {t:"Rush In", e:{safety:-20, stats:15}}, right: {t:"Perimeter", e:{safety:5, stats:-5}} },
    { text: "VIP Visit. The President is landing at CHS Airport.", icon: "🇺🇸", left: {t:"Shut down 526", e:{budget:10, trust:-20}}, right: {t:"Rolling Block", e:{trust:5, safety:-10}} },
    { text: "Civil Unrest downtown. Protesters blocking the bridge.", icon: "📢", left: {t:"Tear Gas", e:{trust:-40, stats:10}}, right: {t:"Negotiate", e:{trust:20, stats:-10}} },
    { text: "Opioid overdose at a gas station.", icon: "💊", left: {t:"Narcan/CPR", e:{trust:10, safety:-5}}, right: {t:"Secure Scene", e:{stats:5, trust:-10}} },
    { text: "Coroner needs help moving a body from a swamp.", icon: "💀", left: {t:"Do it yourself", e:{trust:5, safety:-5}}, right: {t:"Refuse", e:{stats:-5}} },
    { text: "Flash Flood! Nursing home flooding in West Ashley.", icon: "🚑", left: {t:"Send High Water Vehicles", e:{trust:30, budget:-10}}, right: {t:"Wait for Fire Dept", e:{trust:-20, safety:5}} },
    { text: "Sovereign Citizen refuses to exit vehicle. Has a gun.", icon: "🔫", left: {t:"SWAT Raid", e:{safety:-20, stats:20}}, right: {t:"Negotiate", e:{budget:-20, safety:10}} },
    { text: "K-9 Unit overheat! AC failed in the car.", icon: "🐕", left: {t:"Smash Window", e:{budget:-5, safety:5}}, right: {t:"Remote Unlock", e:{trust:-50, safety:-10}} },
    { text: "Wrong Way Driver on the Ravenel Bridge!", icon: "🌉", left: {t:"Intercept/Ram", e:{safety:-40, trust:30}}, right: {t:"Close Bridge", e:{trust:-10, safety:10}} },
    { text: "Bomb threat at the Spoleto Festival.", icon: "🎭", left: {t:"Evacuate All", e:{trust:5, stats:5}}, right: {t:"Search Quietly", e:{safety:-20, stats:10}} },
    { text: "Container ship lost power. Drifting toward bridge.", icon: "🚢", left: {t:"Evacuate Bridge", e:{trust:10, stats:-5}}, right: {t:"Watch/Pray", e:{safety:-50}} },
    { text: "Bank Robbery in progress on James Island.", icon: "💰", left: {t:"Breach", e:{safety:-30, stats:20}}, right: {t:"Containment", e:{safety:10, stats:-5}} },
    { text: "Officer Down call. It's your partner.", icon: "👮", left: {t:"Rush In", e:{safety:-50, trust:20}}, right: {t:"Wait for Backup", e:{safety:10, morale:-50}} },
    { text: "Child abduction alert (Amber Alert). Vehicle spotted.", icon: "🚨", left: {t:"Ram Vehicle", e:{safety:-20, trust:30}}, right: {t:"Follow", e:{safety:5, trust:-10}} },
    { text: "Suspect barricaded in house with hostages.", icon: "🏠", left: {t:"Breach", e:{safety:-30, stats:20}}, right: {t:"Negotiator", e:{safety:10, time:-20}} },
    // --- BATCH 2: NEW HEAT CARDS (High Risk Scenarios) ---

    { text: "ATV Gang (50+ bikes) taking over King Street, running red lights.", icon: "🏍️", left: {t:"Block Road", e:{safety:-10, trust:10}}, right: {t:"Let them pass", e:{safety:5, trust:-20}} },
    { text: "Train derailment in North Charleston. Hazmat leaking.", icon: "☣️", left: {t:"Evacuate 1 Mile", e:{trust:10, stats:-5}}, right: {t:"Contain Scene", e:{safety:-20, trust:5}} },
    { text: "Suspect pointed a gun at you during a traffic stop.", icon: "🔫", left: {t:"Fire Weapon", e:{safety:10, trust:-10}}, right: {t:"Take Cover", e:{safety:-5, stats:-5}} },
    { text: "Deputy trapped in a burning patrol car after a crash.", icon: "🔥", left: {t:"Pull him out", e:{safety:-30, trust:30}}, right: {t:"Wait for Fire", e:{safety:10, morale:-50}} },
    { text: "Human Trafficking suspected in a shipping container at the Port.", icon: "🚢", left: {t:"Open it", e:{stats:20, safety:-10}}, right: {t:"Call Feds", e:{stats:-10, budget:5}} },
    { text: "Sniper reported on a rooftop overlooking Marion Square.", icon: "🔭", left: {t:"Clear Square", e:{trust:10, stats:-5}}, right: {t:"Send SWAT", e:{safety:-10, stats:20}} },
    { text: "Fentanyl exposure during a search. You feel dizzy.", icon: "😵", left: {t:"Narcan Self", e:{safety:-10, stats:5}}, right: {t:"Call EMS", e:{safety:10, time:-10}} },
    { text: "Armed robbery at a jewelry store on King St. Hostages taken.", icon: "💎", left: {t:"Breach", e:{safety:-40, stats:30}}, right: {t:"Negotiate", e:{safety:10, time:-20}} },
    { text: "Drunk driver going 100mph the wrong way on I-526.", icon: "🚗", left: {t:"Ram him", e:{safety:-50, trust:40}}, right: {t:"Spike Strips", e:{safety:-10, stats:10}} },
    { text: "Rioters throwing bricks at the courthouse.", icon: "🧱", left: {t:"Rubber Bullets", e:{trust:-30, safety:10}}, right: {t:"Hold Line", e:{safety:-20, trust:10}} },
    { text: "Mental health crisis: Man threatening to jump off the Don Holt.", icon: "🌉", left: {t:"Grab him", e:{safety:-20, trust:20}}, right: {t:"Talk him down", e:{time:-10, trust:10}} },
    { text: "Boater fired a flare gun at a Marine Patrol deputy.", icon: "🧨", left: {t:"Return Fire", e:{trust:-20, safety:5}}, right: {t:"Ram Boat", e:{safety:-10, stats:10}} },
    { text: "Hurricane looting reported in evacuated zone.", icon: "📺", left: {t:"Arrest Looters", e:{stats:10, safety:-10}}, right: {t:"Ignore/Safety", e:{safety:10, trust:-10}} },
    { text: "Suspect fled into the deep swamp. It's getting dark.", icon: "🌲", left: {t:"Go in alone", e:{safety:-30, stats:20}}, right: {t:"Set Perimeter", e:{safety:10, stats:-10}} },
    { text: "Bomb reported under the Ravenel Bridge.", icon: "💣", left: {t:"Shut it down", e:{trust:-20, safety:20}}, right: {t:"Investigate", e:{safety:-50, trust:10}} },
    { text: "Gang shootout in a crowded park.", icon: "🔫", left: {t:"Engage", e:{safety:-30, trust:20}}, right: {t:"Wait Backup", e:{safety:10, trust:-30}} },
    { text: "Car crashed into a pond. Passengers trapped underwater.", icon: "💧", left: {t:"Dive in", e:{safety:-20, trust:20}}, right: {t:"Wait for Dive Team", e:{safety:10, trust:-40}} },
    { text: "Sovereign Citizens setting up a roadblock on a rural highway.", icon: "🚧", left: {t:"Force through", e:{safety:-10, stats:10}}, right: {t:"Standoff", e:{time:-10}} },
    { text: "Massive brawl (50+ people) at a nightclub letting out.", icon: "👊", left: {t:"Pepper Spray", e:{trust:-10, safety:5}}, right: {t:"Wade in", e:{safety:-20, stats:10}} },
    { text: "Officer took a bribe on bodycam. You saw it.", icon: "💵", left: {t:"Arrest him", e:{trust:20, morale:-20}}, right: {t:"Delete footage", e:{trust:-50, morale:10}} },
    { text: "Cyber attack shut down the 911 center. Systems offline.", icon: "💻", left: {t:"Radio Patrols", e:{safety:-10}}, right: {t:"Go to Station", e:{stats:-5}} },
    { text: "Suspect released a Pitbull on you during a warrant service.", icon: "🐕", left: {t:"Shoot Dog", e:{trust:-30, safety:10}}, right: {t:"Tase Dog", e:{safety:-10, trust:-5}} },
    { text: "School bus hijacked by a parent.", icon: "🚌", left: {t:"High Risk Stop", e:{safety:-20, trust:10}}, right: {t:"Negotiate", e:{safety:10, time:-10}} },
    { text: "Tornado touched down in Johns Island. Power lines down.", icon: "🌪️", left: {t:"Search & Rescue", e:{safety:-10, trust:10}}, right: {t:"Secure Area", e:{safety:5}} },
    { text: "Suspect threw a Molotov cocktail at your car.", icon: "🔥", left: {t:"Bail out", e:{safety:10, budget:-10}}, right: {t:"Drive through", e:{safety:-20, stats:10}} },
    { text: "Armed suspect ran into a church during service.", icon: "⛪", left: {t:"Enter immediately", e:{safety:-30, trust:20}}, right: {t:"Surround building", e:{safety:10, trust:-10}} },
    { text: "Meth lab dump site found. Toxic fumes.", icon: "☠️", left: {t:"Secure site", e:{safety:-10}}, right: {t:"Call Hazmat", e:{budget:-5, safety:10}} },
    { text: "Drone spotted dropping contraband into the Prison yard.", icon: "🛸", left: {t:"Shoot drone", e:{safety:-5, stats:5}}, right: {t:"Track Pilot", e:{stats:10}} },
    { text: "Deputy accused of planting evidence. Press is asking you.", icon: "🎤", left: {t:"Deny it", e:{trust:-10}}, right: {t:"Admit/Investigate", e:{trust:10, morale:-20}} },
    { text: "Armed suspect hiding in a marsh grass boat blind.", icon: "🌾", left: {t:"Flush him out", e:{safety:-10}}, right: {t:"Wait him out", e:{time:-10}} },
    { text: "High-value prisoner transport. Cartel might intercept.", icon: "🚐", left: {t:"Change Route", e:{safety:5}}, right: {t:"Call SWAT Escort", e:{budget:-10, safety:10}} },
    { text: "Active shooter at the Tanger Outlets.", icon: "🛍️", left: {t:"Solo Entry", e:{safety:-50, trust:50}}, right: {t:"Wait for Team", e:{safety:10, trust:-50}} },
    { text: "Bridge jumper holding a baby.", icon: "👶", left: {t:"Rush him", e:{safety:-20, trust:-20}}, right: {t:"Talk", e:{time:-10, trust:10}} },
    { text: "Chemical tanker truck leaking chlorine gas on I-26.", icon: "☣️", left: {t:"Drive into cloud", e:{safety:-50, trust:20}}, right: {t:"Block traffic", e:{safety:10}} },
    { text: "Suspect drove off the pier at the Battery.", icon: "🌊", left: {t:"Jump in", e:{safety:-20, trust:10}}, right: {t:"Call Divers", e:{safety:10, trust:-20}} },
    { text: "Mob surrounding a patrol car. Smashing windows.", icon: "✊", left: {t:"Drive away", e:{trust:-10, safety:10}}, right: {t:"Step out", e:{safety:-30, trust:10}} },
    { text: "Suspect claims he has a bomb in his vest.", icon: "💣", left: {t:"Shoot him", e:{trust:-40, safety:20}}, right: {t:"Back off", e:{safety:-10, trust:5}} },
    { text: "Alligator attacked a child near a lagoon.", icon: "🐊", left: {t:"Shoot gator", e:{trust:10, safety:5}}, right: {t:"First Aid", e:{trust:10, safety:-5}} },
    { text: "Stolen police cruiser with weapons inside.", icon: "🚓", left: {t:"PIT Maneuver", e:{safety:-20, stats:20}}, right: {t:"Track GPS", e:{safety:10}} },
    { text: "Flash bang grenade went off accidentally in the station.", icon: "💥", left: {t:"Medical check", e:{safety:5}}, right: {t:"Cover it up", e:{trust:-10}} },
    { text: "Judge's house swatted. False alarm?", icon: "⚖️", left: {t:"Treat as real", e:{safety:-10}}, right: {t:"Call first", e:{safety:-20}} }, // Risk if real
    { text: "Suspect bit a deputy. Claims he has HIV.", icon: "🧛", left: {t:"Hospital run", e:{safety:10}}, right: {t:"Bag head/Spit mask", e:{stats:5}} },
    { text: "Semi-truck hanging off the edge of the Ravenel Bridge.", icon: "🚛", left: {t:"Climb cab", e:{safety:-30, trust:20}}, right: {t:"Wait for heavy tow", e:{safety:10}} },
    { text: "Found a corrupt politician with a prostitute.", icon: "👔", left: {t:"Arrest both", e:{stats:10, budget:-20}}, right: {t:"Warning", e:{budget:20, stats:-10}} },
    { text: "Informant says a hit is out on you.", icon: "🎯", left: {t:"Go into hiding", e:{trust:-10, safety:10}}, right: {t:"Wear heavy armor", e:{safety:-5}} },
    { text: "Suspect lights himself on fire.", icon: "🔥", left: {t:"Extinguish", e:{safety:-10, trust:10}}, right: {t:"Stand back", e:{safety:5, trust:-20}} },
    { text: "Gunfight at a funeral.", icon: "⚰️", left: {t:"Engage", e:{safety:-20, stats:10}}, right: {t:"Take cover", e:{safety:10}} },
    { text: "Child locked in a bank vault (Time lock).", icon: "🏦", left: {t:"Drill it", e:{budget:-20, trust:10}}, right: {t:"Wait for timer", e:{trust:-20}} },
    { text: "Serial killer suspect spotted at a gas station.", icon: "🔪", left: {t:"Silent approach", e:{stats:20}}, right: {t:"Siren/Lights", e:{stats:-10}} },
    { text: "Partner admits he planted drugs on the last stop.", icon: "💊", left: {t:"Report him", e:{trust:20, morale:-30}}, right: {t:"Stay silent", e:{trust:-50, morale:10}} }
];

// TIER 3: THE BOSSES (Politics & Administration)
const BOSS_CARDS = [
    { text: "County Council cuts the budget. 'Do more with less'.", icon: "📉", left: {t:"Cut Marine Unit", e:{budget:20, safety:-10}}, right: {t:"Cut Training", e:{budget:20, safety:-30}} },
    { text: "Sheriff Election Year. Opponent says you are 'soft on crime'.", icon: "🗳️", left: {t:"Blitz Patrols", e:{stats:30, trust:-20}}, right: {t:"Community Days", e:{trust:20, stats:-10}} },
    { text: "Federal Lawsuit: Allegations of profiling on traffic stops.", icon: "⚖️", left: {t:"Reduce Stops", e:{trust:10, stats:-20}}, right: {t:"Fight in Court", e:{budget:-30, stats:5}} },
    { text: "Hurricane Hugo 2.0. Direct hit forecasted.", icon: "🌪️", left: {t:"Total Lane Reversal", e:{safety:-20, trust:20}}, right: {t:"Curfew Only", e:{safety:10, trust:-40}} },
    { text: "The Mob: Organized crime moving containers through the Port.", icon: "⚓", left: {t:"Raid Port", e:{safety:-50, stats:50}}, right: {t:"Look Away", e:{budget:50, trust:-50}} },
    { text: "Spoleto Festival gridlock. City demands Deputies.", icon: "🎭", left: {t:"Send Support", e:{trust:10, stats:-10}}, right: {t:"County First", e:{trust:-10, stats:5}} },
    { text: "Internal Affairs: A Sergeant is stealing drug money.", icon: "🕵️", left: {t:"Arrest Him", e:{trust:20, stats:-10}}, right: {t:"Cover it up", e:{stats:10, trust:-50}} },
    { text: "FBI wants to take over a major drug case.", icon: "🕴️", left: {t:"Grant Jurisdiction", e:{stats:-20, trust:10}}, right: {t:"Block Them", e:{stats:10, budget:-10}} },
    { text: "Budget Surplus! How do we spend it?", icon: "💰", left: {t:"New Dodge Chargers", e:{stats:10, safety:10}}, right: {t:"Pay Raises", e:{safety:20, budget:-20}} },
    { text: "Retirement Offer. Take the pension?", icon: "🏝️", left: {t:"Retire (Win)", e:{val:"WIN"}}, right: {t:"Stay", e:{stats:5}} },
    // --- BATCH 2: NEW BOSS CARDS (Politics & Admin) ---

    { text: "The Jail is at 150% capacity. Inmates sleeping on floors.", icon: "🏢", left: {t:"Release low-level", e:{trust:-20, safety:-10}}, right: {t:"Double Bunk", e:{safety:-30, budget:-10}} },
    { text: "Hollywood movie wants to shut down the Ravenel Bridge for filming.", icon: "🎬", left: {t:"Approve ($$$)", e:{budget:40, trust:-30}}, right: {t:"Deny", e:{trust:10, budget:-10}} },
    { text: "SLED (State Police) demands control of your high-profile murder case.", icon: "🕵️", left: {t:"Hand it over", e:{stats:-20, morale:-10}}, right: {t:"Refuse", e:{stats:10, budget:-20}} },
    { text: "Longshoremen Strike at the Port. Trucks blocking everything.", icon: "🚢", left: {t:"Break Strike", e:{trust:-30, safety:-20}}, right: {t:"Stand Down", e:{budget:-20, safety:5}} },
    { text: "A wealthy donor's son got a DUI. The donor calls you personally.", icon: "📱", left: {t:"Make it vanish", e:{budget:30, trust:-40}}, right: {t:"Book him", e:{trust:10, budget:-30}} },
    { text: "Cyber Attack! County servers held for Bitcoin ransom.", icon: "💻", left: {t:"Pay Ransom", e:{budget:-50, safety:10}}, right: {t:"Wipe Data", e:{stats:-50, safety:-20}} },
    { text: "The Cooper River Bridge Run needs 200 deputies for security.", icon: "🏃", left: {t:"Mandatory OT", e:{safety:10, morale:-30}}, right: {t:"Skeleton Crew", e:{budget:10, safety:-20}} },
    { text: "News exposes a 'Good Ol' Boys' club within the ranks.", icon: "📰", left: {t:"Purge Staff", e:{stats:-20, trust:20}}, right: {t:"Deny it", e:{trust:-30, morale:10}} },
    { text: "Private Prison company offers to buy the detention center.", icon: "💰", left: {t:"Sell it", e:{budget:50, trust:-40}}, right: {t:"Keep Public", e:{budget:-20, trust:10}} },
    { text: "Catastrophic Flooding. Downtown is under 4ft of water.", icon: "🌊", left: {t:"Martial Law", e:{safety:20, trust:-30}}, right: {t:"Help Only", e:{safety:-20, trust:20}} },
    { text: "The Lieutenant Governor was clocked doing 95mph.", icon: "👔", left: {t:"Ticket him", e:{trust:20, budget:-40}}, right: {t:"Warning", e:{trust:-20, budget:10}} },
    { text: "Body Camera storage is full. New servers cost $1M.", icon: "📹", left: {t:"Delete Old", e:{trust:-30, budget:10}}, right: {t:"Buy Servers", e:{budget:-30, trust:10}} },
    { text: "Deputies demanding to wear external vest carriers (Tactical look).", icon: "🦺", left: {t:"Approve", e:{morale:20, trust:-10}}, right: {t:"Traditional Only", e:{morale:-20, trust:10}} },
    { text: "Federal Consent Decree threatened due to jail deaths.", icon: "⚖️", left: {t:"Comply", e:{budget:-40, trust:10}}, right: {t:"Fight DOJ", e:{trust:-20, budget:-10}} },
    { text: "A famous rapper wants to do a 'Ride Along' livestream.", icon: "🎤", left: {t:"Allow it", e:{trust:-10, morale:10}}, right: {t:"Refuse", e:{trust:5}} },
    { text: "Gentrification Protest blocking King Street businesses.", icon: "📢", left: {t:"Mass Arrests", e:{trust:-30, safety:-10}}, right: {t:"Redirect Traffic", e:{trust:10, stats:-10}} },
    { text: "New 'Military Surplus' gear available: An armored tank.", icon: "🛡️", left: {t:"Take it", e:{safety:20, trust:-40}}, right: {t:"Don't need it", e:{trust:10, safety:-5}} },
    { text: "Evidence Locker audit reveals missing cash.", icon: "💸", left: {t:"Internal Probe", e:{morale:-30, trust:10}}, right: {t:"Quietly Replace", e:{budget:-10, trust:-50}} },
    { text: "Social Media Manager posted a controversial meme.", icon: "📱", left: {t:"Fire them", e:{trust:10, morale:-5}}, right: {t:"Claim 'Hacked'", e:{trust:-20}} },
    { text: "Developer wants to build a precinct on protected wetlands.", icon: "🏗️", left: {t:"Allow it", e:{budget:30, trust:-20}}, right: {t:"Protect land", e:{trust:20, budget:-10}} },
    { text: "The 'Blue Flu'. Deputies calling in sick to protest pay.", icon: "🤢", left: {t:"Fire Leaders", e:{stats:-30, trust:-10}}, right: {t:"Negotiate", e:{budget:-30, morale:20}} },
    { text: "Anonymous donor offers K-9 vests for a 'favor'.", icon: "🐕", left: {t:"Accept", e:{safety:10, trust:-20}}, right: {t:"Decline", e:{safety:-5, trust:5}} },
    { text: "State Law changes: Marijuana legalized.", icon: "🌿", left: {t:"Release Prisoners", e:{trust:10, stats:-20}}, right: {t:"Keep enforcing", e:{trust:-20, stats:10}} },
    { text: "Massive sinkhole swallows a patrol car downtown.", icon: "🕳️", left: {t:"Sue City", e:{budget:10, trust:-10}}, right: {t:"Pay repairs", e:{budget:-10}} },
    { text: "Historic Preservation Society sues over siren noise.", icon: "🔔", left: {t:"Silent Response", e:{safety:-20, trust:10}}, right: {t:"Ignore them", e:{trust:-10}} },
    { text: "Sheriff had a heart attack. You are Acting Sheriff.", icon: "⭐", left: {t:"Change Policies", e:{trust:10, morale:-20}}, right: {t:"Stay Course", e:{trust:-5}} },
    { text: "Local News runs a hit piece on your command style.", icon: "📺", left: {t:"Go on TV", e:{trust:-10, stats:5}}, right: {t:"Ignore", e:{trust:-5}} },
    { text: "Fuel shortage. Gas prices at $6.00/gallon.", icon: "⛽", left: {t:"Bike Patrols", e:{budget:10, stats:-10}}, right: {t:"Pay up", e:{budget:-40}} },
    { text: "You are offered a job at the FBI.", icon: "🕴️", left: {t:"Take it (Win)", e:{val:"WIN"}}, right: {t:"Stay CCSO", e:{trust:10, morale:10}} },
    { text: "Statue in Marion Square vandalized. Public outrage.", icon: "🗽", left: {t:"24/7 Guard", e:{budget:-20, trust:10}}, right: {t:"Let it happen", e:{trust:-30, safety:-10}} }

];

// --- GAME ENGINE ---

function initGame() {
    updateUI();
    nextCard();
}

function getNextCard() {
    if (state.turn === 100) return BOSS_CARDS[BOSS_CARDS.length - 1]; 

    const roll = Math.random() * 100;

    // 10% Chance for Boss
    if (roll > 90) return BOSS_CARDS[Math.floor(Math.random() * BOSS_CARDS.length)];
    // 25% Chance for Heat
    if (roll > 65) return HEAT_CARDS[Math.floor(Math.random() * HEAT_CARDS.length)];
    // 65% Chance for Grind
    return GRIND_CARDS[Math.floor(Math.random() * GRIND_CARDS.length)];
}

let currentCard = {};

function nextCard() {
    currentCard = getNextCard();
    
    const cardImg = document.getElementById('scenario-img');
    const cardText = document.getElementById('scenario-text');
    
    // Simple fade animation
    cardText.style.opacity = 0;
    setTimeout(() => {
        cardImg.innerText = currentCard.icon;
        cardText.innerText = currentCard.text; 
        
        document.getElementById('label-left').innerText = currentCard.left.t;
        document.getElementById('label-right').innerText = currentCard.right.t;
        
        // Removed Arrows as requested.

        cardText.style.opacity = 1;
    }, 150);
    
    document.getElementById('turn-counter').innerText = "SHIFT: " + state.turn;
}

function handleChoice(choice) {
    const effects = choice === 'left' ? currentCard.left.e : currentCard.right.e;
    
    // Win Condition
    if (effects.val === "WIN") {
        gameOver("RETIRED", "You served Charleston County with honor. Enjoy the pension.");
        return;
    }

    // Apply Effects
    for (let key in effects) {
        if (state[key] !== undefined) {
            state[key] += effects[key];
            // Clamp values between 0 and 100
            if (state[key] > 100) state[key] = 100;
            if (state[key] < 0) state[key] = 0;
        }
    }
    
    state.turn++;
    updateUI();
    
    if (!checkGameOver()) {
        nextCard();
    }
}

function updateUI() {
    setBar('trust', state.trust);
    setBar('stats', state.stats);
    setBar('safety', state.safety);
    setBar('budget', state.budget);
}

function setBar(id, value) {
    const bar = document.getElementById(`bar-${id}`);
    bar.style.width = value + '%';
    
    // Color Logic
    bar.style.backgroundColor = '#004d00'; // Default Green
    if (value < 20) bar.style.backgroundColor = '#b71c1c'; // Danger Red
    if (value > 80) bar.style.backgroundColor = '#FFD700'; // Gold Standard
}

function checkGameOver() {
    let title = "";
    let reason = "";
    
    if (state.trust <= 0) { title = "RECALLED"; reason = "The public voted the Sheriff out because of you."; }
    else if (state.trust >= 100) { title = "FIRED"; reason = "You are too soft on crime. The Sheriff replaced you."; }
    
    else if (state.stats <= 0) { title = "DEMOTED"; reason = "You aren't making arrests. Back to the Jail."; }
    else if (state.stats >= 100) { title = "INVESTIGATED"; reason = "The FBI arrested you for padding your stats."; }
    
    else if (state.safety <= 0) { title = "KILLED"; reason = "You died in the line of duty."; }
    else if (state.safety >= 100) { title = "PARALYZED"; reason = "The department is too scared to leave the station."; }
    
    else if (state.budget <= 0) { title = "BANKRUPT"; reason = "County Council shut down the department."; }
    else if (state.budget >= 100) { title = "ARRESTED"; reason = "Embezzlement. Where did that money come from?"; }

    if (title) {
        gameOver(title, reason);
        return true;
    }
    return false;
}

function gameOver(title, reason) {
    document.getElementById('death-title').innerText = title;
    document.getElementById('death-reason').innerText = reason;
    document.getElementById('game-over-modal').classList.remove('hidden');
}

// Event Listeners
document.getElementById('btn-left').addEventListener('click', () => handleChoice('left'));
document.getElementById('btn-right').addEventListener('click', () => handleChoice('right'));

// Boot
initGame();