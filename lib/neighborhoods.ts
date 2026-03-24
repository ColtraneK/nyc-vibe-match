export interface Neighborhood {
  id: string;
  n: string;
  b: string;
  ln: string;
  c: string;
  tg: string;
  quiet: number;
  food: number;
  nl: number;
  transit: number;
  green: number;
  safe: number;
  val: number;
  x: number;
  y: number;
  vb: string;
}

export const NEIGHBORHOODS: Neighborhood[] = [
  // MANHATTAN
  { id: "inwood", n: "Inwood", b: "Manhattan", ln: "A/1", c: "#C6D68F", tg: "Manhattan's last affordable secret", quiet: 7, food: 7, nl: 3, transit: 6, green: 10, safe: 5, val: 10, x: 345, y: 25, vb: "Inwood Hill Park is actual forest in Manhattan. Dominican food everywhere. Your rent allows you to save." },
  { id: "wahts", n: "Washington Heights", b: "Manhattan", ln: "A/1", c: "#9FBBCC", tg: "Best views in Manhattan", quiet: 6, food: 8, nl: 3, transit: 7, green: 9, safe: 5, val: 10, x: 355, y: 60, vb: "Fort Tryon Park at sunset is the best free thing in Manhattan. Rent is half of downtown." },
  { id: "harlem", n: "Harlem", b: "Manhattan", ln: "A/B/C", c: "#E8A87C", tg: "Where NYC culture was born", quiet: 5, food: 8, nl: 6, transit: 8, green: 7, safe: 5, val: 7, x: 390, y: 110, vb: "Jazz from an open window. Red beans and rice. History is the street you're standing on." },
  { id: "eastharlem", n: "East Harlem", b: "Manhattan", ln: "6", c: "#E8956A", tg: "El Barrio, loud and proud", quiet: 4, food: 8, nl: 5, transit: 8, green: 6, safe: 4, val: 8, x: 418, y: 125, vb: "Puerto Rican flags on every block. The best cheap eats north of 96th. Real NYC energy." },
  { id: "morningside", n: "Morningside Hts", b: "Manhattan", ln: "1", c: "#9FBBCC", tg: "Columbia's backyard", quiet: 7, food: 7, nl: 4, transit: 8, green: 8, safe: 6, val: 6, x: 378, y: 140, vb: "Riverside Church. Tom's Restaurant. A neighborhood that reads more books per capita than anywhere." },
  { id: "uws", n: "Upper West Side", b: "Manhattan", ln: "1/2/3", c: "#9FBBCC", tg: "Two parks, one perfect neighborhood", quiet: 8, food: 7, nl: 3, transit: 9, green: 10, safe: 9, val: 4, x: 370, y: 175, vb: "Central Park on one side. Riverside on the other. Zabar's forever." },
  { id: "ues", n: "Upper East Side", b: "Manhattan", ln: "4/5/6", c: "#D4A5A5", tg: "Museum Mile and quiet elegance", quiet: 8, food: 7, nl: 4, transit: 9, green: 9, safe: 9, val: 3, x: 420, y: 190, vb: "The Met on a Tuesday. Central Park at your door. Classic NYC that never goes out of style." },
  { id: "midtownw", n: "Hell's Kitchen", b: "Manhattan", ln: "A/C/E", c: "#F0B7A4", tg: "Theater district energy, neighborhood soul", quiet: 3, food: 8, nl: 8, transit: 10, green: 4, safe: 7, val: 4, x: 385, y: 240, vb: "Restaurant Row. Broadway on your doorstep. Loud, hectic, and completely alive." },
  { id: "chelsea", n: "Chelsea", b: "Manhattan", ln: "C/E", c: "#B5B8E8", tg: "Art galleries and the High Line", quiet: 5, food: 8, nl: 7, transit: 9, green: 7, safe: 8, val: 2, x: 400, y: 305, vb: "Gallery hopping on a Saturday, then the High Line, then a rooftop somewhere." },
  { id: "wvillage", n: "West Village", b: "Manhattan", ln: "1/A/C/E", c: "#85CDCA", tg: "The most charming streets in the city", quiet: 6, food: 9, nl: 8, transit: 9, green: 5, safe: 8, val: 1, x: 408, y: 335, vb: "Perry Street at twilight. The best date night restaurants. Winding streets that make no sense and all the sense." },
  { id: "ev", n: "East Village", b: "Manhattan", ln: "L/6", c: "#E8C170", tg: "The soul of downtown", quiet: 2, food: 10, nl: 10, transit: 9, green: 3, safe: 5, val: 2, x: 435, y: 350, vb: "Ramen at 2am. A punk show in a basement. More character per block than anywhere." },
  { id: "soho", n: "SoHo", b: "Manhattan", ln: "N/R", c: "#E8C170", tg: "Cast iron and cobblestones", quiet: 4, food: 8, nl: 7, transit: 9, green: 3, safe: 8, val: 1, x: 420, y: 360, vb: "Cobblestone streets, cast iron buildings, and the best window shopping in the world." },
  { id: "les", n: "Lower East Side", b: "Manhattan", ln: "F/J/M", c: "#E8C170", tg: "Grit and glamour, every block", quiet: 2, food: 9, nl: 10, transit: 8, green: 3, safe: 5, val: 3, x: 445, y: 368, vb: "Dumpling spot next to cocktail bar next to gallery. Layers on layers." },
  { id: "tribeca", n: "TriBeCa", b: "Manhattan", ln: "1/A/C/E", c: "#E8A87C", tg: "Quiet luxury below Canal", quiet: 7, food: 8, nl: 5, transit: 8, green: 5, safe: 9, val: 1, x: 415, y: 378, vb: "Cobblestones, converted lofts, and the kind of quiet that costs a fortune." },
  { id: "fidi", n: "Financial District", b: "Manhattan", ln: "2/3/4/5", c: "#B5B8E8", tg: "Wall Street's neighborhood glow-up", quiet: 5, food: 6, nl: 4, transit: 10, green: 5, safe: 8, val: 4, x: 425, y: 395, vb: "Stone Street on a Friday. The Oculus. Ferry access to everywhere. It's actually become livable." },
  { id: "gramercy", n: "Gramercy", b: "Manhattan", ln: "6/L", c: "#C6D68F", tg: "A private park and old-money calm", quiet: 7, food: 7, nl: 5, transit: 8, green: 7, safe: 9, val: 3, x: 425, y: 310, vb: "Gramercy Park with the key. Irving Plaza. Pete's Tavern. Quiet elegance with an edge of cool." },

  // BROOKLYN
  { id: "gpoint", n: "Greenpoint", b: "Brooklyn", ln: "G", c: "#85CDCA", tg: "The quiet cool of north Brooklyn", quiet: 7, food: 8, nl: 6, transit: 5, green: 7, safe: 7, val: 4, x: 515, y: 310, vb: "Polish bakeries next to third-wave coffee. The waterfront at golden hour." },
  { id: "wburg", n: "Williamsburg", b: "Brooklyn", ln: "L", c: "#85CDCA", tg: "Where culture gets invented", quiet: 4, food: 9, nl: 9, transit: 7, green: 6, safe: 6, val: 3, x: 530, y: 335, vb: "The waterfront at sunset. A DJ you've never heard of who's incredible. You'll complain about the rent and never leave." },
  { id: "dumbo", n: "DUMBO", b: "Brooklyn", ln: "F/A/C", c: "#E8A87C", tg: "Under the bridge, over the top", quiet: 6, food: 7, nl: 5, transit: 7, green: 7, safe: 8, val: 2, x: 478, y: 378, vb: "That bridge view. Brooklyn Bridge Park. Tech startups and the best pizza in the borough." },
  { id: "bkheights", n: "Brooklyn Heights", b: "Brooklyn", ln: "2/3", c: "#D4A5A5", tg: "The original brownstone neighborhood", quiet: 8, food: 7, nl: 3, transit: 8, green: 7, safe: 9, val: 2, x: 468, y: 392, vb: "The Promenade at sunset. Some of the most beautiful blocks in New York. Old money, old trees." },
  { id: "cobhill", n: "Cobble Hill", b: "Brooklyn", ln: "F/G", c: "#85CDCA", tg: "Charming with a village feel", quiet: 8, food: 8, nl: 4, transit: 7, green: 6, safe: 8, val: 2, x: 462, y: 405, vb: "Boutique shops, great restaurants, stroller-friendly. Brooklyn's answer to the West Village." },
  { id: "carrollgardens", n: "Carroll Gardens", b: "Brooklyn", ln: "F/G", c: "#E8C170", tg: "Old-school Italian Brooklyn, evolved", quiet: 7, food: 8, nl: 4, transit: 7, green: 5, safe: 8, val: 3, x: 455, y: 418, vb: "Smith Street restaurants. Italian bakeries that have been here for decades." },
  { id: "parkslope", n: "Park Slope", b: "Brooklyn", ln: "F/G", c: "#C6D68F", tg: "Brownstone Brooklyn at its finest", quiet: 8, food: 8, nl: 4, transit: 8, green: 10, safe: 9, val: 3, x: 468, y: 432, vb: "Prospect Park is your backyard. The farmers market is your grocery store." },
  { id: "prosph", n: "Prospect Heights", b: "Brooklyn", ln: "2/3", c: "#C6D68F", tg: "Brooklyn's sweet spot", quiet: 7, food: 8, nl: 5, transit: 8, green: 9, safe: 7, val: 5, x: 492, y: 418, vb: "Brooklyn Museum mornings. Prospect Park afternoons. Vanderbilt Ave dinners." },
  { id: "crownhts", n: "Crown Heights", b: "Brooklyn", ln: "2/3/4/5", c: "#E8C170", tg: "Brooklyn's cultural crossroads", quiet: 5, food: 8, nl: 6, transit: 7, green: 8, safe: 5, val: 6, x: 520, y: 430, vb: "The Botanic Garden. Franklin Ave's restaurant row. West Indian Day Parade." },
  { id: "bedsty", n: "Bed-Stuy", b: "Brooklyn", ln: "A/C", c: "#D4A5A5", tg: "History on every block", quiet: 6, food: 7, nl: 6, transit: 6, green: 5, safe: 5, val: 7, x: 548, y: 395, vb: "Brownstone stoops where conversations last hours. The block party is a civic institution." },
  { id: "bushwick", n: "Bushwick", b: "Brooklyn", ln: "M/J/L", c: "#E8956A", tg: "Where the artists actually live", quiet: 3, food: 8, nl: 9, transit: 6, green: 4, safe: 5, val: 7, x: 572, y: 370, vb: "Murals on every surface. Your neighbor is a painter or a DJ. The rent is the last honest thing in Brooklyn." },
  { id: "sunpark", n: "Sunset Park", b: "Brooklyn", ln: "D/N/R", c: "#C6D68F", tg: "NYC's best-kept Chinatown", quiet: 5, food: 9, nl: 3, transit: 6, green: 7, safe: 6, val: 9, x: 438, y: 472, vb: "The real Chinatown moved here years ago. Incredible views from the actual park." },
  { id: "kensington", n: "Kensington", b: "Brooklyn", ln: "F/G", c: "#B5B8E8", tg: "Quiet, diverse, and underrated", quiet: 8, food: 7, nl: 2, transit: 7, green: 8, safe: 7, val: 9, x: 475, y: 458, vb: "Prospect Park's less-crowded side. Bangladeshi food to die for. Nobody talks about it." },
  { id: "ditmaspark", n: "Ditmas Park", b: "Brooklyn", ln: "B/Q", c: "#F0B7A4", tg: "Victorian houses in Brooklyn", quiet: 8, food: 7, nl: 3, transit: 6, green: 7, safe: 6, val: 7, x: 492, y: 478, vb: "Actual Victorian mansions with porches. Cortelyou Road has the restaurants." },
  { id: "flatbush", n: "Flatbush", b: "Brooklyn", ln: "B/Q", c: "#F0B7A4", tg: "Caribbean soul in Brooklyn", quiet: 5, food: 8, nl: 4, transit: 7, green: 6, safe: 4, val: 8, x: 508, y: 468, vb: "Jerk chicken and doubles at 1am. Caribbean energy planted in Brooklyn." },
  { id: "bayridge", n: "Bay Ridge", b: "Brooklyn", ln: "R", c: "#9FBBCC", tg: "Old-school Brooklyn on the water", quiet: 8, food: 7, nl: 3, transit: 4, green: 7, safe: 8, val: 8, x: 418, y: 535, vb: "The Verrazzano at sunset. Middle Eastern food on 5th Ave. Real neighborhood." },
  { id: "bensonhurst", n: "Bensonhurst", b: "Brooklyn", ln: "D/N", c: "#D4A5A5", tg: "Authentic, affordable, no-frills", quiet: 7, food: 8, nl: 2, transit: 6, green: 5, safe: 7, val: 9, x: 445, y: 520, vb: "Chinese and Italian food on every block. Old-school Brooklyn that hasn't changed and doesn't want to." },
  { id: "williamsbg_s", n: "South Williamsburg", b: "Brooklyn", ln: "J/M/Z", c: "#E8A87C", tg: "A neighborhood within a neighborhood", quiet: 5, food: 7, nl: 5, transit: 6, green: 4, safe: 6, val: 6, x: 538, y: 358, vb: "Hasidic community meets new arrivals. Broadway's Dominican restaurants. A quieter side of the bridge." },

  // QUEENS
  { id: "astoria", n: "Astoria", b: "Queens", ln: "N/W", c: "#E8A87C", tg: "Everything you need, none of the pretense", quiet: 6, food: 8, nl: 5, transit: 7, green: 7, safe: 7, val: 7, x: 580, y: 200, vb: "Greek bakeries next to Egyptian spots next to Colombian joints. Your barber knows your name." },
  { id: "lic", n: "Long Island City", b: "Queens", ln: "7", c: "#B5B8E8", tg: "Manhattan views, Queens soul", quiet: 6, food: 6, nl: 5, transit: 8, green: 7, safe: 8, val: 5, x: 530, y: 270, vb: "The skyline from your window is better than most vacations. MoMA PS1 walking distance." },
  { id: "sunnyside", n: "Sunnyside", b: "Queens", ln: "7", c: "#C6D68F", tg: "The friendliest neighborhood in Queens", quiet: 7, food: 7, nl: 4, transit: 7, green: 7, safe: 7, val: 8, x: 590, y: 235, vb: "Community gardens everywhere. Irish pubs next to Turkish spots. Your neighbor waves every morning." },
  { id: "woodside", n: "Woodside", b: "Queens", ln: "7", c: "#D4A5A5", tg: "Queens' quiet middle ground", quiet: 7, food: 7, nl: 3, transit: 7, green: 6, safe: 7, val: 8, x: 612, y: 240, vb: "Filipino food, Irish pubs, Thai restaurants. Commuter-friendly and genuinely affordable." },
  { id: "jh", n: "Jackson Heights", b: "Queens", ln: "7/E/F", c: "#F0B7A4", tg: "The whole world in ten blocks", quiet: 5, food: 10, nl: 4, transit: 7, green: 5, safe: 5, val: 9, x: 635, y: 220, vb: "Tibetan momos, then Colombian empanadas, then Indian chaat. $12 eats better than $60 downtown." },
  { id: "elmhurst", n: "Elmhurst", b: "Queens", ln: "M/R", c: "#E8C170", tg: "The most diverse zip code in America", quiet: 5, food: 9, nl: 3, transit: 7, green: 5, safe: 6, val: 9, x: 650, y: 255, vb: "Thai, Chinese, Colombian, Nepali, all within three blocks. No hype, just incredibly good food." },
  { id: "foresthills", n: "Forest Hills", b: "Queens", ln: "E/F/M/R", c: "#B5B8E8", tg: "A real neighborhood in the big city", quiet: 8, food: 7, nl: 3, transit: 7, green: 8, safe: 8, val: 7, x: 680, y: 285, vb: "Tudor houses, Austin Street shops, quiet enough to hear birds. Queens at its most livable." },
  { id: "flushing", n: "Flushing", b: "Queens", ln: "7", c: "#F0B7A4", tg: "NYC's actual food capital", quiet: 4, food: 10, nl: 3, transit: 7, green: 6, safe: 7, val: 9, x: 722, y: 215, vb: "Hand-pulled noodles, soup dumplings, hot pot at midnight." },
  { id: "ridgewood", n: "Ridgewood", b: "Queens", ln: "M/L", c: "#D4A5A5", tg: "Bushwick's quieter, cheaper neighbor", quiet: 6, food: 7, nl: 6, transit: 6, green: 4, safe: 6, val: 8, x: 608, y: 350, vb: "Same creative energy as Bushwick, half the rent. Nobody's pretentious about it." },
  { id: "bayside", n: "Bayside", b: "Queens", ln: "LIRR/7", c: "#9FBBCC", tg: "Suburban pace, city address", quiet: 9, food: 7, nl: 2, transit: 5, green: 8, safe: 9, val: 7, x: 740, y: 175, vb: "Bell Boulevard restaurants. Actual yards. You can park your car. It's Queens' best-kept suburban secret." },
  { id: "dutchkills", n: "Dutch Kills", b: "Queens", ln: "N/W", c: "#C6D68F", tg: "Hidden along the creek", quiet: 5, food: 6, nl: 4, transit: 6, green: 5, safe: 6, val: 7, x: 555, y: 255, vb: "Cocktail bars tucked along the creek. A quieter slice of western Queens with easy access everywhere." },
  { id: "jamaica", n: "Jamaica", b: "Queens", ln: "E/J/Z", c: "#E8956A", tg: "Queens' downtown, no filter", quiet: 3, food: 8, nl: 4, transit: 8, green: 4, safe: 4, val: 9, x: 710, y: 310, vb: "The hub of southeastern Queens. Incredible Caribbean and South Asian food. AirTrain to JFK." },

  // BRONX
  { id: "riverdale", n: "Riverdale", b: "Bronx", ln: "1", c: "#C6D68F", tg: "The Bronx's hidden suburb", quiet: 9, food: 5, nl: 2, transit: 4, green: 9, safe: 8, val: 6, x: 348, y: 10, vb: "Hills, trees, Hudson River views. More Westchester energy than Bronx energy. Wave Hill is gorgeous." },
  { id: "fordham", n: "Fordham", b: "Bronx", ln: "B/D/4", c: "#E8956A", tg: "Fordham Road, always buzzing", quiet: 3, food: 7, nl: 4, transit: 7, green: 5, safe: 4, val: 9, x: 430, y: 28, vb: "Fordham Road is one of the busiest shopping streets in NYC. The Bronx Zoo is right there." },
  { id: "motthavensbx", n: "Mott Haven", b: "Bronx", ln: "6", c: "#E8C170", tg: "The South Bronx renaissance", quiet: 5, food: 7, nl: 5, transit: 7, green: 6, safe: 4, val: 8, x: 445, y: 75, vb: "Bruckner Bar. The new waterfront. Artists moving in. It's happening here, slowly and for real." },
  { id: "parkchester", n: "Parkchester", b: "Bronx", ln: "6", c: "#F0B7A4", tg: "A planned community with real community", quiet: 6, food: 7, nl: 3, transit: 7, green: 6, safe: 5, val: 9, x: 485, y: 50, vb: "Designed as a self-contained neighborhood. Big apartments, good transit, and prices that make sense." },
  { id: "belmont", n: "Belmont", b: "Bronx", ln: "B/D", c: "#E8A87C", tg: "NYC's real Little Italy", quiet: 5, food: 9, nl: 3, transit: 6, green: 6, safe: 5, val: 8, x: 458, y: 40, vb: "Arthur Avenue is the real Little Italy. Forget Mulberry Street. Fresh mozzarella, bread, and pasta made daily." },
  { id: "concourse", n: "Grand Concourse", b: "Bronx", ln: "B/D/4", c: "#B5B8E8", tg: "Art Deco boulevard, Bronx pride", quiet: 5, food: 7, nl: 4, transit: 7, green: 6, safe: 4, val: 9, x: 440, y: 55, vb: "Art Deco buildings that rival the Upper West Side. The Bronx Museum. Yankee Stadium around the corner." },

  // STATEN ISLAND
  { id: "stgeorge", n: "St. George", b: "Staten Island", ln: "SIF", c: "#85CDCA", tg: "The ferry and the views", quiet: 6, food: 6, nl: 3, transit: 5, green: 6, safe: 6, val: 8, x: 310, y: 465, vb: "That free ferry ride. Snug Harbor. The start of something on Staten Island's north shore." },
  { id: "tottenville", n: "Tottenville", b: "Staten Island", ln: "SIR", c: "#C6D68F", tg: "The end of the line, literally", quiet: 10, food: 4, nl: 1, transit: 2, green: 9, safe: 9, val: 8, x: 290, y: 545, vb: "Beach town energy at the southern tip of NYC. Conference House Park. You forget you're in the city." },
  { id: "snorthshore", n: "North Shore SI", b: "Staten Island", ln: "SIF", c: "#9FBBCC", tg: "Sri Lankan food and harbor views", quiet: 7, food: 7, nl: 2, transit: 4, green: 7, safe: 6, val: 8, x: 300, y: 490, vb: "The best Sri Lankan food in the Western Hemisphere. Victory Boulevard. Actually interesting." },
];
