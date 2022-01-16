//
//  CONTENT FOR PUZZLES AND OTHER THINGS
//
//  DEPENDS ON misc.js
//
//


/*
    CATERGORY LISTS
*/
function nameSomeList() {
  return [
    "Foods", "Animals", "Colors", "People", "Months",
    "Games", "Books", 'Sports', 'Boardgames', 'Card games',
    'School friends', 'Family', 'Pokemon', 'Furniture', 'Things that fly',
    'Things with wheels', 'Heavy things', 'Light things', 'Places', 'Football teams',
    'Holidays', 'Music Bands', 'Disney Movies', 'Songs', 'Desserts', 'Breakfast Foods',
    'Drinks', 'Short Words', 'Long Words', 'Words ending in a vowel',
    'Words starting with a vowel', 'Birds', 'Things in the sky', 'Things underground',
    'Things in the water', 'Things out at night'
  ];
}


function wordGroups() {
  return {
    'animals': {
      0: ['cat', 'dog', 'cow', 'pig', 'rat', 'bat', 'fox', 'yak'],
      1: ['bird', 'fish', 'owl', 'frog', 'horse', 'bear', 'deer', 'duck', 'ant', 'crab', 'fly', 'emu', 'goat', 'mole', 'seal', 'snake', 'swan', 'wolf'],
      2: ['wombat', 'zebra', 'tiger', 'jaguar', 'whale', 'moose', 'rabbit', 'eagle', 'camel', 'pelican', 'otter', 'dolphin', 'skunk', 'donkey', 'beaver', 'chicken', 'bobcat', 'shark', 'gorilla', 'goose', 'jackal', 'leopard', 'lizard', 'kudu'],
      3: ['ocelot', 'aardvark', 'penguin', 'cassowary', 'jellyfish', 'tortoise', 'lynx', 'stingray', 'vulture', 'walrus', 'weasel', 'octopus', 'parrot', 'barnacle', 'alligator', 'butterfly', 'elephant']
    },
    'colors': {
      0: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'white', 'gray'],
      1: ['tan', 'beige', 'magenta', 'aqua', 'cyan', 'turquoise', 'indigo', 'violet', 'silver', 'olive', 'maroon']
    },
    'vehicles': [
      'bike', 'bus', 'motorcycle', 'scooter', 'sled', 'snowmobile', 'tank', 'tram', 'train', 'tricycle', 'truck', 'unicycle', 'van', 'wagon',
      'boat', 'canoe', 'ship', 'submarine', 'sailboat', 'surfboard', 'yacht', 'blimp', 'plane', 'helicopter'
    ],
    'foods': [
      'almond', 'anchovy', 'artichoke', 'avocado', 'asparagus', 'apricot',
      'bacon', 'bagel', 'banana', 'bean', 'beef', 'berry', 'blueberry', 'blackberry', 'bread', 'broccoli', 'brownie', 'burrito', 'butter',
      'cake', 'candy', 'carrot', 'cashew', 'cauliflower', 'celery', 'cheese', 'cereal', 'cherry', 'chocolate', 'chip', 'cinnamon', 'clam', 'coconut', 'crackers', 'cucumber', 'cupcake',
      'donut','dumpling',
      'egg', 'eggplant',
      'fig', 'fish', 'flour', 'fries', 'fruit',
      'ginger', 'granola', 'grape', 'grapefruit', 'guacamole',
      'ham', 'hamburger', 'honey', 'horseradish', 'hummus',
      'ice', 'jam', 'jelly', 'juice', 'kale', 'kiwi',
      'lamb', 'lasagna', 'lemon', 'lentil', 'lettuce', 'licorice', 'lime',
      'macaroni', 'mango', 'marmalade', 'marshmallow', 'meat', 'melon', 'milk', 'milkshake', 'mozzarella', 'mustard',
      'noodles', 'nuts', 'oatmeal', 'olive', 'onion', 'orange',
      'pancake', 'papaya', 'parsley', 'pasta', 'pea', 'peanut', 'pecan', 'pepper', 'pepperoni', 'pickle', 'pilaf', 'pizza', 'plum',
      'pomegranate', 'pomelo', 'popcorn', 'popsicle', 'pork', 'potato', 'pretzel', 'prune', 'pudding', 'pumpkin',
      'quiche', 'quinoa',
      'radish', 'raisin', 'raspberry', 'ravioli', 'rosemary', 'ribs', 'rice', 'rhubarb',
      'salad', 'salmon', 'salt', 'sausage', 'soup', 'stew', 'strawberry', 'spaghetti', 'sushi', 'sugar', 'shallots', 'seaweed', 'squid', 'steak', 'sprouts', 'syrup',
      'taco', 'tamale', 'taro', 'tarragon', 'tea', 'thyme', 'toast', 'tofu', 'tomato', 'tuna', 'turkey',
      'vinegar', 'vegetable', 'waffle', 'walnut', 'water', 'wheat', 'watermelon', 'yam', 'yogurt', 'zucchini'
    ],
    'buildings': ['barn', 'garage', 'house', 'apartment', 'church', 'school', 'store', 'costco', 'library'],
    'body parts': ['eye', 'nose', 'hair', 'head', 'neck', 'finger', 'toe', 'knee', 'elbow', 'shouler',
      'arm', 'wrist', 'ankle', 'chin', 'ear', 'cheek', 'tooth', 'tongue', 'belly', 'shin'
    ],
    'number': ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
    'clothing': ['hat', 'sock', 'shoe', 'shirt', 'pants', 'sock', 'coat', 'glove', 'dress'],
    'birds': ['robin', 'crow', 'eagle', 'woodpecker', 'owl', 'chickadee', 'finch', 'jay', 'sparrow', 'junco',
      'hawk', 'nuthatch', 'cardinal'
    ],
    'months': ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'septmember', 'october', 'november', 'december'],
    'holidays': ['christmas', 'easter', 'halloween', 'thanksgiving'],
    'days': ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    'seasons': ['winter', 'spring', 'summer', 'fall'],
    'instruments': ['piano', 'drum', 'violin', 'cello', 'bass', 'horn', 'trumpet', 'tuba',
      'xylophone', 'accordion', 'bagpipes', 'banjo', 'bassoon', 'clarinet', 'cymbal',
      'flute', 'guitar', 'gong', 'harp', 'lute', 'oboe', 'organ', 'piccolo', 'recorder', 'sitar',
      'viola', 'zither'
    ],
    'pokemon': {
      1: ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"]
    },
    'dinosaurs': ['allosaurus', 'ankylosaurus', 'apatosaurus', 'archaeopteryx', 'brontosaurus', 'diplodocus', 'gallimimus', 'iguanodon', 'pachysaurus', 'protoceratops', 'spinosaurus', 'stegosaurus', 'triceratops', 'tyrannosaurus', 'velociraptor'],

    'airport words': ['airplane', 'plane', 'luggage', 'suitcase', 'ramp', 'tarmac', 'runway', 'baggage', 'ticket', 'boarding', 'pass', 'seat', 'delay', 'landing'],

    'house words': ['table', 'chair', 'bedroom', 'kitchen', 'fridge', 'food', 'mailbox', 'garage', 'yard', 'tree', 'bush', 'sidewalk', 'driveway',
      'dresser', 'bookshelf', 'toilet', 'sink', 'shower', 'tub', 'brush', 'clothes'
    ],

    'library words': [
      'book', 'bookshelf', 'borrow', 'computer', 'printer', 'puzzle', 'toy', 'drawing', 'crayons', 'librarian', 'library',
      'card', 'checkout', 'scan', 'return', 'story', 'reading', 'writing'
    ],

    'short vowel sounds': {
      'a': ['cat', 'hat', 'back', 'bag', 'ball', 'cart', 'dash'],
      'e': ['peg', 'get', 'bed', 'dent'],
      'i': ['kick', 'sip', 'bill', 'city', 'dish'],
      'o': ['box', 'pop', 'box', 'boss', 'cost', 'dots'],
      'u': ['up', 'bus', 'bulb', 'cuff', 'dust']
    },
    'long vowel sounds': {
      'a': ['cape', 'say', 'babe', 'base', 'cane', 'date'],
      'e': ['key', 'deep', 'beef', 'deed'],
      'i': ['hide', 'sigh', 'bite', 'cite', 'dire'],
      'o': ['hope', 'Joe', 'boat', 'bone', 'cozy', 'dose'],
      'u': ['puke', 'super', 'cube', 'dupe']
    },
    'chess words': ['pawn', 'rook', 'knight', 'bishop', 'king', 'queen',
      'square', 'board', 'check', 'attack', 'defend', 'capture', 'castle'
    ],
    'snow words': ['snow', 'shovel', 'sled'],
    'solar system words': ['sun', 'mercury', 'venus', 'earth', 'mars', 'asteroid',
      'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'star'
    ],
    'space words': ['gravity', 'giant', 'dwarf', 'constellation', 'astronaut', 'atmosphere'],
    'birthday words': ['present', 'hat', 'party', 'gift', 'cake', 'games', 'candles'],
    'camping words': ['tent', 'cabin', 'hiking', 'stream', 'flashlight', 'fire'],
    'swimming words': ['pool', 'water', 'wet', 'towel', 'swimsuit', 'locker', 'goggles', 'float', 'breath'],
    'thanksgiving': ['turkey','pie','pumpkin','harvest','pilgrim','feast','corn','november',
      'holiday','thursday','potatoes','stuffing','gravy','thanks','squash','beans','friends','family','celebrate']
  }
}

function vowelSounds() {
  return {
    'short': {
      'a': ['cat', 'hat', 'back', 'bag', 'ball', 'cart', 'dash'],
      'e': ['peg', 'get', 'bed', 'dent'],
      'i': ['kick', 'sip', 'bill', 'city', 'dish'],
      'o': ['box', 'pop', 'box', 'boss', 'cost', 'dots'],
      'u': ['up', 'bus', 'bulb', 'cuff', 'dust']
    },
    'long': {
      'a': ['cape', 'say', 'babe', 'base', 'cane', 'date'],
      'e': ['key', 'deep', 'beef', 'deed'],
      'i': ['hide', 'sigh', 'bite', 'cite', 'dire'],
      'o': ['hope', 'Joe', 'boat', 'bone', 'cozy', 'dose'],
      'u': ['puke', 'super', 'cube', 'dupe']
    }
  }
}



numberWordObject = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty'
}
denominatorWordObject = {
  true: {
    1: '',
    2: 'half',
    3: 'third',
    4: 'fourth',
    5: 'fifth',
    6: 'sixth',
    7: 'seventh',
    8: 'eighth',
    9: 'nineth',
    10: 'tenth'
  },
  false: {
    1: '',
    2: 'halves',
    3: 'thirds',
    4: 'fourths',
    5: 'fifths',
    6: 'sixths',
    7: 'sevenths',
    8: 'eighths',
    9: 'nineths',
    10: 'tenths'
  },
};

/* 3/4 ==> three fourths */
function fractionToWord([a, b]) {
  return `${numberWordObject[a]} ${denominatorWordObject[a===1][b]}`;
}

/* 3*4 ==> 3+3+3+3 or 4+4+4 */
function multiplicationToAddition([a, b]) {
  const first = Math.max(a, b)
  const second = Math.min(a, b)
  return constantVector(first, second).join('+');
}

function rhymingWordSets() {
  return {
    'ab': ['blab', 'cab', 'crab', 'dab', 'drab', 'fab', 'flab', 'gab', 'grab', 'jab', 'lab', 'nab', 'scab', 'slab', 'stab', 'tab'],
    'eb': ['web'],
    'ib': ['bib', 'crib', 'fib', 'jib', 'glib', 'nib', 'rib'],
    'ob': ['blob', 'bob', 'cob', 'dob', 'fob', 'glob', 'gob', 'hob', 'job', 'knob', 'lob', 'mob', 'nob', 'rob', 'slob', 'snob', 'sob', 'yob'],
    'ub': ['bub', 'chub', 'cub', 'drub', 'dub', 'flub', 'grub', 'hub', 'nub', 'pup', 'rub', 'snub', 'stub', 'sub', 'tub'],

    'ad': ['bad', 'brad', 'cad', 'chad', 'clad', 'dad', 'fad', 'gad', 'glad', 'grad', 'had', 'lad', 'mad', 'pad', 'sad', 'scad', 'shad', 'tad', 'trad', 'Vlad'],
    'ed': ['bed', 'bled', 'cred', 'fed', 'fled', 'led', 'ned', 'red', 'shed', 'sled', 'sped', 'ted', 'wed', 'zed'],
    'id': ['bid', 'did', 'grid', 'hid', 'kid', 'lid', 'mid', 'rid', 'sid', 'skid', 'slid', 'yid'],
    'od': ['bod', 'clod', 'cod', 'god', 'hod', 'mod', 'nod', 'plot', 'pod', 'rod', 'shod', 'trod'],
    'ud': ['bud', 'crud', 'cud', 'dud', 'mud', 'pud', 'scud', 'spud', 'stud', 'sud', 'thud'],

    'ag': ['bag', 'blag', 'brag', 'crag', 'dag', 'drag', 'flag', 'gag', 'hag', 'jag', 'lag', 'nag', 'rag', 'sag', 'shag', 'slag', 'snag', 'stag', 'swag', 'tag', 'wag'],
    'eg': ['beg', 'greg', 'keg', 'leg', 'meg', 'peg'],
    'ig': ['big', 'brig', 'dig', 'fig', 'frig', 'gig', 'jig', 'pig', 'prig', 'rig', 'swig', 'trig', 'twig', 'wig'],
    'og': ['bog', 'cog', 'dog', 'flog', 'frog', 'grog', 'hog', 'jog', 'log', 'slog', 'snog', 'tog', 'wog'],
    'ug': ['bug', 'chug', 'drug', 'dug', 'fug', 'hug', 'jug', 'lug', 'mug', 'plug', 'pug', 'rug', 'slug', 'smug', 'snug', 'thug', 'tug'],

    'ack': ['back', 'black', 'clack', 'crack', 'flack', 'hack', 'jack', 'knack', 'lack', 'pack', 'quack', 'rack', 'sack', 'shack', 'slack', 'smack', 'snack', 'stack', 'tack', 'track', 'whack', 'wrack'],
    'eck': ['beck', 'check', 'deck', 'fleck', 'heck', 'neck', 'peck', 'speck', 'wreck'],
    'ick': ['brick', 'chick', 'click', 'crick', 'flick', 'hick', 'kick', 'lick', 'nick', 'pick', 'prick', 'quick', 'rick', 'sick', 'slick', 'snick', 'stick', 'thick', 'tick', 'trick', 'wick'],
    'ock': ['block', 'clock', 'dock', 'flock', 'frock', 'hock', 'jock', 'knock', 'lock', 'mock', 'pock', 'rock', 'shock', 'smock', 'sock', 'stock'],
    'uck': ['buck', 'chuck', 'click', 'duck', 'luck', 'muck', 'pluck', 'puck', 'ruck', 'shuck', 'stuck', 'suck', 'truck', 'tuck', 'yuck'],

    'all': ['ball', 'call', 'fall', 'hall', 'mall', 'small', 'stall', 'tall', 'wall'],
    'ell': ['bell', 'cell', 'dell', 'dwell', 'fell', 'jell', 'knell', 'quell', 'sell', 'shell', 'smell', 'spell', 'swell', 'tell', 'well', 'yell'],
    'ill': ['bill', 'brill', 'chill', 'dill', 'drill', 'fill', 'drill', 'gill', 'grill', 'hill', 'kill', 'mill', 'pill', 'quill', 'rill', 'shill', 'sill', 'skill', 'spill', 'still', 'swill', 'till', 'trill', 'twill', 'will'],
    // 'oll': [],
    // 'ull': [],

    'am': ['ham', 'sam', 'tam', 'yam'],
    'em': ['gem', 'hem'],
    'im': ['him', 'tim', 'rim'],
    // 'om': [],
    'um': ['hum', 'bum', 'rum', 'sum', 'yum', 'gum'],

    'an': ['ban', 'bran', 'can', 'clan', 'dan', 'fan', 'flan', 'fran', 'gran', 'jan', 'man', 'nan', 'pan', 'ran', 'scan', 'span', 'stan', 'tan', 'than', 'van'],
    'en': ['ben', 'den', 'fen', 'jen', 'hen', 'men', 'ten', 'zen'],
    'in': ['bin', 'din', 'fin', 'gin', 'grin', 'kin', 'pin', 'quin', 'shin', 'sin', 'skin', 'spin', 'thin', 'tin', 'twin', 'win', 'yin'],
    'on': ['con', 'don', 'jon', 'ron'],
    'un': ['bun', 'fun', 'sun', 'run', 'gun'],

    'ap': ['cap', 'map', 'lap', 'nap', 'rap', 'flap'],
    'ep': ['step', 'prep'],
    'ip': ['hip', 'lip', 'zip', 'yip', 'rip', 'sip'],
    'op': ['hop', 'pop', 'top', 'drop'],
    'up': ['cup', 'pup', 'yup'],

    'eep': ['beep', 'deep', 'jeep', 'keep', 'peep', 'seep', 'steep', 'weep'],

    'ar': ['bar', 'car', 'far', 'tar'],
    // 'er': ['her'],
    'ir': ['sir', 'fir', 'stir', 'whir'],
    'or': ['for', 'thor', 'nor'],
    'ur': ['bur', 'fur', 'blur', 'spur'],

    // 'as': [],
    // 'es': [],
    // 'is': [],
    // 'os': [],
    'us': ['bus', 'gus', 'plus', 'thus'],

    'at': ['at', 'bat', 'cat', 'fat', 'hat', 'mat', 'pat', 'rat', 'sat', 'vat', 'brat', 'chat', 'drat', 'flat', 'frat', 'gnat', 'prat', 'scat', 'slat', 'spat'],
    'et': ['bet', 'fret', 'get', 'jet', 'let', 'met', 'net', 'pet', 'set', 'stet', 'vet', 'wet', 'yet'],
    'it': ['bit', 'chit', 'fit', 'flit', 'git', 'grit', 'hit', 'kit', 'knit', 'lit', 'nit', 'pit', 'quit', 'sit', 'skit', 'slit', 'snit', 'spit', 'twit', 'whit', 'wit', 'writ', 'zit'],
    'ot': ['blot', 'clot', 'cot', 'dot', 'got', 'hot', 'jot', 'knot', 'lot', 'mot', 'not', 'plot', 'pot', 'rot', 'shot', 'slot', 'snot', 'sot', 'spot', 'swot', 'tot', 'trot', 'wot'],
    'ut': ['but', 'cut', 'gut', 'hut', 'jut', 'nut', 'rut', 'shut', 'tut'],

    'aw': ['caw', 'paw', 'saw', 'maw', 'law'],
    'ew': ['few', 'mew', 'pew'],
    // 'iw': [],
    'ow': ['how', 'now', 'cow'],
    // 'uw': [],

    'ax': ['fax', 'max', 'sax'],
    'ex': ['rex', 'vex', 'hex'],
    'ix': ['fix', 'mix', 'nix', 'six', 'pix'],
    'ox': ['box', 'cox', 'fox', 'lox', 'pox'],
    'ux': ['crux', 'tux', 'flux'],

    'ay': ['say', 'day', 'hay', 'way', 'may', 'ray'],
    // 'ey': [],
    // 'iy': [],
    'oy': ['boy', 'coy', 'joy', 'toy', 'soy'],
    // 'uy': [],

    'oil': ['coil', 'boil', 'soil', 'toil', 'foil'],

    'ite': ['cite', 'kite', 'lite', 'mite', 'rite', 'site', 'smite', 'spite', 'trite', 'white', 'write'],
    'oat': ['boat', 'coat', 'goat', 'moat'],
    'ail': ['bail', 'fail', 'flail', 'frail', 'grail', 'hail', 'jail', 'mail', 'nail', 'pail', 'quail', 'rail', 'sail', 'snail', 'tail', 'trail', 'wail'],

    'eet': ['beet', 'feet', 'fleet', 'greet', 'meet', 'sheet', 'skeet', 'sleet', 'sweet', 'tweet'],

    'oot': ['boot', 'hoot', 'moot', 'root', 'scoot', 'shoot'],
    'ook': ['book', 'brook', 'cook', 'crook', 'hook', 'look', 'nook', 'rook', 'shook', 'took'],

    'ust': ['bust', 'crust', 'dust', 'gust', 'just', 'lust', 'must', 'rust', 'trust'],

    'eat': ['beat', 'bleat', 'cheat', 'cleat', 'feat', 'heat', 'meat', 'neat', 'peat', 'pleat', 'seat', 'treat', 'wheat'],

    'ain': ['brain', 'chain', 'drain', 'fain', 'gain', 'grain', 'main', 'pain', 'plain', 'rain', 'slain', 'Spain', 'stain', 'train', 'swain', 'twain', 'vain', 'wain'],
    'ait': ['wait', 'bait', 'gait'],
    // 'aid': ['paid', 'laid'],
    'ail': ['bail', 'pail', 'sail'],
    // 'aim': [],
    'ain': ['main', 'pain', 'rain'],
    'air': ['chair', 'blair', 'fair', 'flair', 'hair', 'pair', 'stair'],

    'ate': ['date', 'crate', 'fate', 'gate', 'hate', 'late', 'mate', 'rate', 'skate', 'slate', 'spate', 'state'],
    'ase': ['base', 'case', 'chase', 'vase'],
    'are': ['bare', 'care', 'dare', 'fare', 'flare', 'glare', 'hare', 'mare', 'pare', 'rare', 'scare', 'share', 'snare', 'spare', 'stare', 'tare', 'ware'],
    'ane': ['cane', 'bane', 'sane', 'vane'],

    'ace': ['brace', 'face', 'glace', 'grace', 'lace', 'mace', 'pace', 'place', 'race', 'space', 'trace'],
    // 'uce': [],
    'ice': ['dice', 'lice', 'mice', 'nice', 'price', 'rice', 'slice', 'spice', 'trice', 'twice', 'vice'],

    'old': ['bold', 'cold', 'fold', 'gold', 'hold', 'mold', 'scold', 'sold', 'told'],
    'ild': ['mild', 'wild', 'child'],
    // 'eld':[],
    'ole': ['cole', 'dole', 'hole', 'mole', 'pole', 'role', 'sole', 'stole', 'whole'],
    'ile': ['file', 'mile', 'nile', 'pile', 'rile', 'smile', 'tile', 'while'],
    'ale': ['bale', 'dale', 'gale', 'hale', 'kale', 'male', 'pale', 'sale', 'scale', 'shale', 'stale', 'tale', 'whale'],

  }
};

function synonymWords() {
  return [
    'big', 'small', 'fast', 'slow', 'good', 'bad', 'hot', 'cold',
    'loud', 'quiet', 'happy', 'sad', 'scared', 'tired',
    'dark', 'light', 'smart', 'easy', 'hard', 'strong', 'weak',
    'wet', 'dry', 'boring', 'fun'
  ];
}

function synonymSets() {
  return {
    'big': ['large', 'gigantic', 'huge'],
    'small': ['tiny', 'miniscule', 'miniature'],
    'fast': ['quick', 'rapid']
  }
}

/*
  WORD LISTS
*/

function allQuestions() {
  return [
    questionsFavorite,
    questionsColor,
    questionsColorInverse,
    questionsDay
  ];
};

function questionsDay() {
  var time = ['today', 'yesterday', 'this morning', 'last night'];
  var activity = ['eat', 'play', 'read', 'do', 'wear'];
  return `What did you ${randomSample(activity)} ${randomSample(time)}?`;
};

function questionsFavorite() {
  var things = ['food', 'animal', 'bird', 'color',
    'day of the week', 'toy', 'book', 'movie',
    'month', 'meal', 'game', 'sport', 'instrument',
    'month',
    "game", "book", 'sport', 'boardgames', 'card games',
    'Pokemon', 'furniture', 'thing that flies',
    'things with wheels', 'places', 'football team',
    'holiday', 'music band', 'disney movie', 'song', 'dessert',
    'breakfast Food',
    'drink'
  ];
  return `What is your favorite ${randomSample(things)}?`;
};

function questionsColor() {
  var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple',
    'pink', 'white', 'black', 'brown', 'silver', 'gold',
    'heavy', 'light', 'big', 'small'
  ];
  var things = ['animal', 'food', 'thing', 'character',
    'vehicle', 'thing with wings', 'thing with wheels'
  ];
  return `Name ${aOrAn(randomSample(things),true)} that is ${randomSample(colors)}.`;
}

function questionsColorInverse() {
  const thing = randomSample(
    flatten([getAllValues(wordGroups()['animals']), wordGroups()['foods']])
  );
  return `What color is ${aOrAn(thing,true)}?`;
}

function timeComparisonQuestion() {
  const [hour1, hour2] = randomIntegers(1, 12, 2)
  const [min1, min2] = randomIntegers(0, 59, 2)
  var [name1, name2] = randomSample(namesList(), 2)
  return `${name1} woke up at ${hour1+':'+min1.toString().padStart(2,'0')}.  ${name2} woke up at
  ${hour2+':'+min2.toString().padStart(2,'0')}.  Who woke up ${randomSample(['earlier','later'])}?`
}

function drawingInstruction() {
  const animals = getAllValues(wordGroups()['animals'])
  const food = getAllValues(wordGroups()['foods'])
  const num = randomInteger(1, 4)
  const drawMe = randomSample([
    `a thing you did yesterday`,
    `${pluralize(num,randomSample(animals),true)} eating ${pluralize(2,randomSample(food),false)}`
  ])
  return `Draw ${drawMe}`;
}

function aOrAn(word, includeWord) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var out;
  if (vowels.includes(word[0].toLowerCase())) {
    out = 'an';
  } else {
    out = 'a';
  };
  if (includeWord == true) {
    return out + ' ' + word;
  } else {
    return out;
  }
};

/*
  DRAWINGS
*/

function shapeImages() {
  var names = ['circle.png', 'diamond.png', 'triangle_1.png',
    'triangle_2.png', 'square.png',
    'rectangle_1.png', 'rectangle_2.png', 'hexagon.png', 'pentagon.png', 'star.png',
    'parallelogram.png', 'trapezoid.png', 'semicircle.png'
  ];
  return names;
};

function allSimpleDrawings() {
  var names = [
    "arrow.png", "bat.png", "car.png", "cat.png", "cup.png",
    "fish.png", "house.png",
    "pig.png", "plane.png", "rat.png",
    "tree.png",
  ];
  return names;
};

function allOpenClipart() {
  return [
    "airplane_8.png", "ant_3.png", "apple_5.png", "astronaut-31069_640.png", "baby-34412_640.png", "badger-37755_640.png", "bag_1.png", "bag_8.png", "ball_1.png", "balloons_1.png", "banana-1876159_640.png", "barrel_8.png", "bear-30787_640.png", "bear_6.png", "bear_8.png", "bed-41042_640.png", "bee_3.png", "bell-2027536_640.png", "bell_8.png", "bicycle-311002_640.png", "bike_4.png", "bird_1.png", "bird_4.png", "bobcat_1.png", "book-308767_640.png", "boot-29568_640.png", "bottle_1.png", "bow-304065_640.png", "bow-312586_640.png", "box-147574_640.png", "brain_1.png", "brain-312007_640.png", "bridge-2773440_640.png", "broom-3728645_640.png", "bull.png", "bunny.png", "bus_1.png", "butterfly_1.png", "butterfly_2.png", "butterfly-312188_640.png", "cake_1.png", "camel-312223_640.png", "car-311590_640.png", "carrot.png", "castle-2672317_640.png", "chainsaw-304333_640.png", "chair-42856_640.png", "chameleon-48011_640.png", "cheetah-48013_640.png", "chicken_8.png", "cloud-153992_640.png", "coat_1.png", "couch_3.png", "cow_7.png", "crib_3.png", "crown-303361_640.png", "Cup.png", "dinosaur-309638_640.png", "doctor-37707_640.png", "Dog-8.png", "door-1934757_640.png", "drum_8.png", "duck_1.png", "eagle_1.png", "eagle-311023_640.png", "ear-2029552_640.png", "eel-48311_640.png", "egg-312177_640.png", "elephant-1295085_640.png", "elephant-311596_640.png", "envelope-23692_640.png", "eye_1.png", "fairy.png", "fence.png", "fish-304888_640.png", "fish-312689_640.png", "Fish-6.png", "fish_8.png", "flower_1.png", "flute-31994_640.png", "fly_1.png", "Foot.png", "fork-149488_640.png", "fridge_1.png", "frog_1.png", "ghost-303301_640.png", "ghost-303596_640.png", "giraffe-47248_640.png", "glasses_1.png", "glasses_8.png", "goat-153826_640.png", "gorila.png", "guitar-159362_640.png", "hamburger-31792_640.png", "hand_1.png", "hand_8.png", "hat-310777_640.png", "hat-312220_640.png", "hat-312297_640.png", "headphones-159569_640.png", "Heart-5.png", "helicopter-310647_640.png", "horse-156496_640.png", "horse-312688_640.png", "house_1.png", "iguana_3.png", "jaguar-37042_640.png", "kangaroo-47642_640.png", "key_1.png", "key-303320_640.png", "king-1299046_640.png", "kite-305379_640.png", "Kite.png", "knife_8.png", "kudu-3546256_640.png", "lamp_1.png", "laptop-312391_640.png", "leaf-308591_640.png", "leaf_5.png", "lion_1.png", "lion.png", "llama-153025_640.png", "llama-312214_640.png", "mailbox-23696_640.png", "marlin_8.png", "maze-304913_640.png", "mole-153474_640.png", "mouse-303588_640.png", "muffin-31764_640.png", "mug_8.png", "nose-307159_640.png", "octopus_1.png", "ostrich-153485_640.png", "ostrich-312229_640.png", "outlet-303731_640.png", "paintbrush-312711_640.png", "pan_4.png", "panda_6.png", "pants-145584_640.png", "pear-1876160_640.png", "penguin-153492_640.png", "phone_1.png", "phone_8.png", "piano-312543_640.png", "piano-3575007_640.png", "pig-2022457_640.png", "Pig-2.png", "pig-311934_640.png", "pig-312212_640.png", "pizza-31799_640.png", "plane_1.png", "popsicle-25439_640.png", "pumpkin.png", "purse_1.png", "quail-310177_640.png", "queen.png", "rabbit_head.png", "racoon_3.png", "rake-304867_640.png", "rat-312173_640.png", "rat-312279_640.png", "ribs-309991_640.png", "robot-312208_640.png", "rocket_4.png", "rocket_8.png", "rooster-311959_640.png", "rose_5.png", "sailboat-310164_640.png", "sandals_3.png", "santa_1.png", "saturn_1.png", "saw-312426_640.png", "scissors-311690_640.png", "scissors.png", "scooter-1294892_640.png", "seahorse-32645_640.png", "seal-155628_640.png", "shark-30367_640.png", "shark_8.png", "sheep-31719_640.png", "shell_8.png", "shirt_1.png", "Shoe.png", "shoes_1.png", "shot_8.png", "shovel-312360_640.png", "slide_4.png", "sloth-1531577_640.png", "snake_1.png", "snowman-311151_640.png", "snowman_8.png", "soccer-ball-310065_640.png", "socks-24411_640.png", "soup_8.png", "spider-312206_640.png", "spider-3726881_640.png", "spoon-160549_640.png", "squid-153604_640.png", "squirrel-304082_640.png", "Star-7.png", "stethoscope.png", "stool-309589_640.png", "strawberry-32017_640.png", "submarine-2779025_640.png", "sun-303981_640.png", "sweater_1.png", "swing_3.png", "table-150408_640.png", "tent_1.png", "toilet-146604_640.png", "tooth-1501321_640.png", "train_3.png", "tree_8.png", "trees-310137_640.png", "triangle-31902_640.png", "truck-154896_640.png", "trumpet-312321_640.png", "turkey_1.png", "turtle_1.png", "turtle-305215_640.png", "umbrella_1.png", "unicycle-310173_640.png", "violin-306731_640.png", "wagon-310170_640.png", "walrus-2028029_640.png", "web.png", "whale_4.png", "witch.png", "wolf-153807_640.png", "wrench-310678_640.png", "zebra_1.png", "zebra-311287_640.png", "zipper-310163_640.png",
    'snowman-3835934_640.png', 'rice_1.png', 'pyramid_1.png', 'psyduck_1.png', 'pineapple-2881250_640.png', 'pikachu_1.png',
    'pancakes-31766_640.png', 'moth_1.png', 'igloo-48806_640.png', 'ice&cream-954569_640.png', 'grapes-32014_640.png', 'dragonfly_1.png',
    'corn-306949_640.png', 'chickadee-48019_640.png', 'cheese-307181_640.png', 'cardinal_3.png', 'camel_1.png', 'beetle_1.png',
    'beaver-147073_640.png', 'bacon-31754_640.png', 'acorn-2026989_640.png', 'alligator-3312851_640.png',
    'wagon_3.png', 'jump&rope.png', 'stairs.png', 'umbrella-2806690_640.png', 'ladder-29197_640.png', 'snail_2.png',
    'donkey-48287_640.png', 'dinosaur-3539663_640.png', 'telescope_3.png', 'binoculars-24235_640.png',
    'watch_5.png', 'hammer-35368_640.png', 'screwdriver_3.png', 'moose-894926_640.jpg'
  ];
};

function allClipart() {
  return allSimpleDrawings().map(x => [imagesPath + 'drawings', x]).concat(
    allOpenClipart().map(x => [imagesPath + 'open_clipart', x]).concat(
      shapeImages().map(x => [imagesPath + 'shapes', x])
    )
  );
}


function namesList() {
  return namesListGirl().concat(namesListBoy());
};

function namesListGirl() {
  return [
    "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Evelyn", "Abigail", "Harper", "Emily", "Elizabeth", "Avery", "Sofia", "Ella", "Madison", "Scarlett", "Victoria", "Aria", "Grace", "Chloe", "Camila", "Penelope", "Riley", "Layla", "Lillian", "Nora", "Zoey", "Mila", "Aubrey", "Hannah", "Lily", "Addison", "Eleanor", "Natalie", "Luna", "Savannah", "Brooklyn", "Leah", "Zoe", "Stella", "Hazel", "Ellie", "Paisley", "Audrey", "Skylar", "Violet", "Claire", "Bella", "Aurora", "Lucy", "Anna", "Samantha", "Caroline", "Genesis", "Aaliyah", "Kennedy", "Kinsley", "Allison", "Maya", "Sarah", "Madelyn", "Adeline", "Alexa", "Ariana", "Elena", "Gabriella", "Naomi", "Alice", "Sadie", "Hailey", "Eva", "Emilia", "Autumn", "Quinn", "Nevaeh", "Piper", "Ruby", "Serenity", "Willow", "Everly", "Cora", "Kaylee", "Lydia", "Aubree", "Arianna", "Eliana", "Peyton", "Melanie", "Gianna", "Isabelle", "Julia", "Valentina", "Nova", "Clara", "Vivian", "Reagan", "Mackenzie", "Madeline", "Brielle", "Delilah", "Isla", "Rylee", "Katherine", "Sophie", "Josephine", "Ivy", "Liliana", "Jade", "Maria", "Taylor", "Hadley", "Kylie", "Emery", "Adalynn", "Natalia", "Annabelle", "Faith", "Alexandra", "Ximena", "Ashley", "Brianna", "Raelynn", "Bailey", "Mary", "Athena", "Andrea", "Leilani", "Jasmine", "Lyla", "Margaret", "Alyssa", "Adalyn", "Arya", "Norah", "Khloe", "Kayla", "Eden", "Eliza", "Rose", "Ariel", "Melody", "Alexis", "Isabel", "Sydney", "Juliana", "Lauren", "Iris", "Emerson", "London", "Morgan", "Lilly", "Charlie", "Aliyah", "Valeria", "Arabella", "Sara", "Finley", "Trinity", "Ryleigh", "Jordyn", "Jocelyn", "Kimberly", "Esther", "Molly", "Valerie", "Cecilia", "Anastasia", "Daisy", "Reese", "Laila", "Mya", "Amy", "Teagan", "Amaya", "Elise", "Harmony", "Paige", "Adaline", "Fiona", "Alaina", "Nicole", "Genevieve", "Lucia", "Alina", "Mckenzie", "Callie", "Payton", "Eloise", "Brooke", "Londyn", "Mariah", "Julianna", "Rachel", "Daniela", "Gracie", "Catherine", "Angelina", "Presley", "Josie", "Harley", "Adelyn", "Vanessa", "Makayla", "Parker", "Juliette", "Amara", "Marley", "Lila", "Ana", "Rowan", "Alana", "Michelle", "Malia", "Rebecca", "Brooklynn", "Brynlee", "Summer", "Sloane", "Leila", "Sienna", "Adriana", "Sawyer", "Kendall", "Juliet", "Destiny", "Alayna", "Elliana", "Diana", "Hayden", "Ayla", "Dakota", "Angela", "Noelle", "Rosalie", "Joanna", "Jayla", "Alivia", "Lola", "Emersyn", "Georgia", "Selena", "June", "Daleyza", "Tessa", "Maggie", "Jessica", "Remi", "Delaney", "Camille", "Vivienne", "Hope", "Mckenna", "Gemma", "Olive", "Alexandria", "Blakely", "Izabella", "Catalina", "Raegan", "Journee", "Gabrielle", "Lucille", "Ruth", "Amiyah", "Evangeline", "Blake", "Thea", "Amina", "Giselle", "Lilah", "Melissa", "River", "Kate", "Adelaide", "Charlee", "Vera", "Leia", "Gabriela", "Zara", "Jane", "Journey", "Elaina", "Miriam", "Briella", "Stephanie", "Cali", "Ember", "Lilliana", "Aniyah", "Logan", "Kamila", "Brynn", "Ariella", "Makenzie", "Annie", "Mariana", "Kali", "Haven", "Elsie", "Nyla", "Paris", "Lena", "Freya", "Adelynn", "Lyric", "Camilla", "Sage", "Jennifer", "Paislee", "Talia", "Alessandra", "Juniper", "Fatima", "Raelyn", "Amira", "Arielle", "Phoebe", "Kinley", "Ada", "Nina", "Ariah", "Samara"
  ]
}

function namesListBoy() {
  return [
    "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah", "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel", "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian", "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke", "Gabriel", "Anthony", "Isaac", "Grayson", "Jack", "Julian", "Levi", "Christopher", "Joshua", "Andrew", "Lincoln", "Mateo", "Ryan", "Jaxon", "Nathan", "Aaron", "Isaiah", "Thomas", "Charles", "Caleb", "Josiah", "Christian", "Hunter", "Eli", "Jonathan", "Connor", "Landon", "Adrian", "Asher", "Cameron", "Leo", "Theodore", "Jeremiah", "Hudson", "Robert", "Easton", "Nolan", "Nicholas", "Ezra", "Colton", "Angel", "Brayden", "Jordan", "Dominic", "Austin", "Ian", "Adam", "Elias", "Jaxson", "Greyson", "Jose", "Ezekiel", "Carson", "Evan", "Maverick", "Bryson", "Jace", "Cooper", "Xavier", "Parker", "Roman", "Jason", "Santiago", "Chase", "Sawyer", "Gavin", "Leonardo", "Kayden", "Ayden", "Jameson", "Kevin", "Bentley", "Zachary", "Everett", "Axel", "Tyler", "Micah", "Vincent", "Weston", "Miles", "Wesley", "Nathaniel", "Harrison", "Brandon", "Cole", "Declan", "Luis", "Braxton", "Damian", "Silas", "Tristan", "Ryder", "Bennett", "George", "Emmett", "Justin", "Kai", "Max", "Diego", "Luca", "Ryker", "Carlos", "Maxwell", "Kingston", "Ivan", "Maddox", "Juan", "Ashton", "Jayce", "Rowan", "Kaiden", "Giovanni", "Eric", "Jesus", "Calvin", "Abel", "King", "Camden", "Amir", "Blake", "Alex", "Brody", "Malachi", "Emmanuel", "Jonah", "Beau", "Jude", "Antonio", "Alan", "Elliott", "Elliot", "Waylon", "Xander", "Timothy", "Victor", "Bryce", "Finn", "Brantley", "Edward", "Abraham", "Patrick", "Grant", "Karter", "Hayden", "Richard", "Miguel", "Joel", "Gael", "Tucker", "Rhett", "Avery", "Steven", "Graham", "Kaleb", "Jasper", "Jesse", "Matteo", "Dean", "Zayden", "Preston", "August", "Oscar", "Jeremy", "Alejandro", "Marcus", "Dawson", "Lorenzo", "Messiah", "Zion", "Maximus", "River", "Zane", "Mark", "Brooks", "Nicolas", "Paxton", "Judah", "Emiliano", "Kaden", "Bryan", "Kyle", "Myles", "Peter", "Charlie", "Kyrie", "Thiago", "Brian", "Kenneth", "Andres", "Lukas", "Aidan", "Jax", "Caden", "Milo", "Paul", "Beckett", "Brady", "Colin", "Omar", "Bradley", "Javier", "Knox", "Jaden", "Barrett", "Israel", "Matias", "Jorge", "Zander", "Derek", "Josue", "Cayden", "Holden", "Griffin", "Arthur", "Leon", "Felix", "Remington", "Jake", "Killian", "Clayton", "Sean", "Adriel", "Riley", "Archer", "Legend", "Erick", "Enzo", "Corbin", "Francisco", "Dallas", "Emilio", "Gunner", "Simon", "Andre", "Walter", "Damien", "Chance", "Phoenix", "Colt", "Tanner", "Stephen", "Kameron", "Tobias", "Manuel", "Amari", "Emerson", "Louis", "Cody", "Finley", "Iker", "Martin", "Rafael", "Nash", "Beckham", "Cash", "Karson", "Rylan", "Reid", "Theo", "Ace", "Eduardo", "Spencer", "Raymond", "Maximiliano", "Anderson", "Ronan", "Lane", "Cristian", "Titus", "Travis", "Jett", "Ricardo", "Bodhi", "Gideon", "Jaiden", "Fernando", "Mario", "Conor", "Keegan", "Ali", "Cesar", "Ellis", "Jayceon", "Walker", "Cohen", "Arlo", "Hector", "Dante", "Kyler", "Garrett", "Donovan", "Seth", "Jeffrey", "Tyson", "Jase", "Desmond", "Caiden", "Gage", "Atlas", "Major", "Devin", "Edwin", "Angelo", "Orion", "Conner", "Julius", "Marco"
  ]
}

function numberList() {
  return ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
}

function thingList() {
  return ['car', 'bike', 'hat', 'rock', 'dollar', 'toy', 'apple'];
};


function mathAdditionQuestion() {
  var names = randomSample(namesList(), 2);
  var numbers = randomSample(range(0, 11), 2);
  var thing = randomSample(thingList());
  var text = names[0] + ' has ' + pluralize(numbers[0], thing) +
    '.  ' + names[1] + ' has ' + pluralize(numbers[1], thing) +
    '.  How many ' + pluralize(2, thing, false) + ' are there total?';
  return text;
};

function mathSubtractionQuestion() {
  var names = randomSample(namesList(), 2);
  const num1 = randomInteger(5, 10)
  const num2 = randomInteger(1, num1 - 1)
  var thing = randomSample(thingList());
  return `${names[0]} has ${pluralize(num1, thing)}, and
    gives ${num2} away to ${names[1]}.  How many does ${names[0]}
    have left?`;
};

function makeTotalPlusQuestion() {
  const name = randomSample(namesList())
  const thing = randomSample(thingList())
  const num = randomInteger(1, 5)
  const total = randomInteger(num + 1, 10)
  return `${name} has ${pluralize(num,thing)}, but needs to have
   ${total}.  How many more ${pluralize(2,thing,false)} does ${name} need?`
}

// function makeTotalMinusQuestion() {
//   const [name1, name2] = randomSample(namesList(), 2)
//   const thing = randomSample(thingList())
//   const num1 = randomInteger(5, 10)
//   const num2 = randomInteger(1, num1 - 1)
//   return `${name1} has ${pluralize(num1,thing)}. ${name2} wants to
//   have ${pluralize(num2,thing)}.  How many ${pluralize(2,thing,false)} should
//   ${name1} give to ${name2}?`
// }

function oneComparativeProblem() {
  var names = randomSample(namesList(), 3);
  var quality = randomSample(['bigger', 'smaller', 'older', 'younger', 'taller', 'shorter']);
  // var namesLast = randomSample(names,2);
  var lastComp = randomSample(
    [
      ' Is ' + names[0] + ' ' + quality + ' than ' + names[2] + '?',
      ' Is ' + names[2] + ' ' + quality + ' than ' + names[0] + '?',
      ' Who is the ' + quality.slice(0, -1) + 'st?'
    ]
  );
  var text = names[0] + ' is ' + quality +
    ' than ' + names[1] + ', and ' + names[1] +
    ' is ' + quality + ' than ' + names[2] + '. ' +
    lastComp;
  return text;
};


function wordsToBeExtended() {
  return getAllValues({
    '3': ["ate", "are", "ear", "ill", "ope", "one", "ale", "ire", "ell", "ore", "all", "ole", "owe", "ink", "age", "ape", "ail", "ump", "ode", "ace",
      "art", "lea", "end", "our", "oil", "eat", "and", "row", "ice", "ran",
      "out", "old", "ram", "ark", "air", "rat", "owl", "low", "lam", "eek", "axe", "win", "use", "rim", "lop", "loo", "ewe", "ens", "ant", "amp", "wee", "war", "ray", "rap", "pin", "hew", "ere", "ash", "ans", "lot", "lie", "lee", "lac", "its", "hat", "eve", "awn", "tar", "raw", "ops", "oat", "oar", "imp", "eel", "car", "ass", "tea", "run", "rum", "rot", "rip", "pee", "par", "log", "kin", "ins", "how", "aye", "awe", "asp", "arm", "ads", "tor", "rue", "rag", "qua", "own", "nit", "lob", "lip"
    ].map(x => '_' + x + '_')
  });
}

function wordsToBeFilled() {
  return getAllValues({
    '3': ["a_e", "s_y", "o_e", "t_n", "p_t", "p_p", "f_r", "e_e", "b_g", "b_d", "a_t", "y_p", "w_n", "t_e", "s_t", "s_p", "p_n", "o_t", "n_t", "n_b", "m_s", "m_d", "l_g", "j_g", "i_s", "h_t", "h_p", "h_m", "g_t", "f_y", "f_n", "f_g", "d_n", "d_g", "d_e", "d_b", "b_y", "b_t", "a_s"],
    '4': ["b__s", "p__s", "t__s", "s__s", "a__s", "r__s", "l__s", "l__e", "s__t", "r__e", "h__s", "d__s", "o__s", "m__s", "m__e", "g__s", "c__s", "d__e", "t__e", "e__s", "c__e", "p__e", "f__s", "f__e", "s__e", "h__e", "b__e", "w__t", "w__e", "p__t", "w__s", "n__s", "s__d", "g__e", "b__t", "b__k", "t__t", "s__g", "m__t", "y__s", "s__p", "s__m", "j__s", "f__t", "s__n", "d__t", "c__t", "b__d", "p__y", "l__t", "i__s", "g__t", "f__l", "c__p", "s__k", "p__k", "n__e", "h__t", "h__k", "h__d", "a__e", "w__d", "s__w", "r__t", "m__k", "l__k", "l__d", "g__d", "d__k", "c__d", "v__e", "t__n", "t__k", "t__d", "s__r", "r__k", "p__l", "m__l", "l__n", "h__l", "f__d", "b__l", "a__y", "a__d", "w__p", "r__d", "p__p", "m__d", "b__y", "w__k", "v__s", "t__l", "s__b", "m__h", "k__s", "g__p", "d__y", "d__l", "c__l", "b__g", "w__y", "w__n", "t__y", "t__g", "s__y", "r__l", "p__r", "p__m", "p__a", "l__y", "l__o", "h__p", "f__m", "c__w", "b__r", "b__n", "w__l", "t__m", "s__l", "p__n", "p__d", "o__y", "n__t", "m__n", "l__p", "j__e", "h__r", "g__n", "g__l", "f__y", "d__r", "c__y", "c__n", "c__f", "c__b", "b__h", "b__b"]
  });
};


function findWordsSets() {
  return getAllValues({
    '3': ["aest", "opst", "ostw", "aprt", "alst", "ailr", "aels", "inps", "ikns", "hstu", "host", "gnsu", "ersu", "eors", "enst", "enos", "enop", "elos", "eimt", "eilv", "egor", "deit", "bstu", "arst", "apst", "apss", "aprs", "anps", "alps", "aers", "aepr", "aemt", "aemn", "aelv", "aelp", "adel", "acst", "abst", "abet"],
    '4': ["aeprs", "aprst", "aerst", "aelst", "aelps", "abest", "eoprs", "enost", "eirst", "einrs", "eimst", "eerst", "deist", "airst", "aepst", "aemst", "aemns", "aelsv", "aekst", "aehrs", "adert", "acert", "acder", "abers", "orstu", "loops", "eorsw", "eorsv", "enops", "eirsw", "eiprs", "einps", "eimrt", "eimrs", "eilst", "eilms", "ehirs", "egors", "efilr", "eersv", "depru", "deirw", "deils", "deers", "cinos", "certu", "cdeor", "arsty", "aorst", "ainst", "ailrs", "ahkns", "aeprt", "aenrs", "aenps", "aemrs", "aelpt", "aehls", "aegrs", "aeglr", "aders", "adepr", "ademn", "adels", "adehs", "acprs", "acost", "acers", "aceps", "acepr", "abels", "abelr", "abder"],
    '5': ["acerst", "aceprs", "aelpst", "adeprs", "adelst", "elrstu", "eiprst", "eimrst", "eilnst", "eginrs", "deorst", "deilst", "belstu", "aerstt", "aerrst", "aeprss", "aeprrs", "aderrw", "adeilr", "inopst", "eorsst", "eorrst", "ehlost", "eforst", "efirst", "efilrs", "eerstt", "eersst", "eeilrv", "deprsu", "deinnt", "degins", "deeirt", "ceorst", "cdeors", "berstu", "beirsu", "airstt", "aeprst", "aemrst", "aelsst", "aelrsv", "aelrst", "aelpry", "aelmnt", "aeglrs", "aeelrs", "aderst", "aderrt", "adeprt", "adeils", "adegnr", "adeerr", "acenst", "acenrt", "acehst", "acdert", "acders", "abesst", "abelst", "abelmr", "abdelm"]
  });
}

function patternValues() {
  return {
    'letters': {},
    'numbers': {}
  };
}


function letterPattern(length, diff) {
  var base;
  length = (length == undefined) ? randomInteger(2, 4) : length;
  if (diff == 'easy' || diff == undefined) {
    var pos = randomInteger(0, 25);
    base = allLetters().slice(pos, pos + length);
  } else if (diff == 'medium') {
    base = randomSample(allLetters(), length);
  } else {
    base = randomChoice(allLetters(), length);
  }
  return makePatternSequence(base);
}

function numberPattern(length, diff) {
  var base;
  length = (length == undefined) ? randomInteger(2, 4) : length;
  if (diff == 'easy' || diff == undefined) {
    var pos = randomInteger(0, 6);
    base = range(pos, pos + length);
  } else if (diff == 'medium') {
    base = randomSample(range(0, 6), length);
  } else {
    base = randomChoice(range(0, 99), length);
  }
  return makePatternSequence(base);
}

function makePatternSequence(array, numRepeats) {
  numRepeats = (numRepeats == undefined) ? 2 : numRepeats;
  var blanks = constantVector('_', array.length);
  var repeated = constantVector(array, numRepeats);
  return flatten(repeated).concat(blanks);
}

function xCanYsentences(n=1) {
  const thingActions = {
    'run':['dog','cat','man'],
    'fly':['bird'],
    'swim':['fish']
  }
}




function bigWordsForSubwords() {
  return ["microdensitometer", "chemotherapeutics", "transliterates", "transliterated", "propensities", "grantsmanship", "grandfathered", "chemotherapeutic", "centripetally", "transliterations", "stonewashed", "semitransparent", "hearthstones", "gravestones", "grandstanding", "grandmothers", "foreshadowing", "foreshadowed", "extraterrestrials", "disheartens", "crawlspaces", "cantilevered", "brownstones", "whitewashes", "weatherstrips", "weatherstripping", "weatherboarding", "triceratops", "transliteration", "transliterating", "transliterate", "thereabouts", "therapeutically", "temperamentally", "steppingstones", "standstills", "smartypants", "scapegraces", "scapegoating", "scapegoated", "reverberates", "reverberated", "reforesting", "protestantism", "protectorates", "proliferates", "proliferated", "preliterates", "patriarchates", "parenthetically", "parenthesized", "notwithstanding", "nontransparent", "nonparticipants", "noncooperation", "newspaperwomen", "motherboards", "motherboard", "materialistically", "martingales", "marksmanship", "landscapers", "kaleidoscopically", "kaleidoscopes", "illiterates", "hippopotamuses", "grindstones", "grandparents", "grandmotherly", "grandmother", "fundamentally", "forestalled", "extraterritoriality", "extraterrestrial", "disparagement", "discourages", "discouragements", "discouragement", "discouraged", "disafforesting", "directorates", "confraternities", "clothespins", "chickenhearted", "chairmanships", "cantilevering", "bridesmaids", "brainwashes", "asseverates", "asseverated", "alliterates", "alliterated", "wholesomeness", "wholeheartedness", "wholeheartedly", "wholehearted", "whitewashed", "whereabouts", "wheelchairs", "whatchamacallits", "unwholesomeness", "unrefrigerated", "unillustrated", "unilaterally", "underestimates", "underestimated", "unconsolidated", "unanticipated", "trendsetting", "trapshooting", "transparently", "transparent", "transcendentally", "thermostatically", "thermodynamically", "theatergoers", "tenderheartedness", "tenderheartedly", "tenderhearted", "superstores", "supersaturates", "supersaturated", "superintendents", "stouthearted", "stethoscopes", "statesmanship", "stablemates", "speakerphones", "sousaphones", "sledgehammered", "skyscrapers", "skateboarding", "shellackings", "salesmanship", "roustabouts", "romantically", "reverberations", "restartable", "refrigerates", "refrigerated", "refrigerants", "reforestation", "redecorates", "redecorated", "recuperates", "recuperated", "reconsecrates", "reconsecrated", "quadrillions", "psychotherapies", "protuberant", "prosecutable", "proletarians", "preponderates", "preponderated", "polysaccharides", "poikilothermic", "phototypesetting", "photographically", "photochemically", "phonetically", "phonemically", "penthousing", "participates", "participants", "parthenogenesis", "parenthesizes", "overdecorates", "overdecorated", "overcompensates", "overcompensated", "operationally", "operatically", "obliterates", "obliterated", "nonproliferation", "nonoperational", "nightingales", "newspaperwoman", "newspapermen", "newspaperman", "newspapered", "newsflashes", "mouthwashes", "motherlands", "monounsaturated", "moderateness", "misunderstandings", "microphones", "mathematically", "masochistically", "marketplaces", "lithographically", "inspectorates", "hyperventilates", "hyperventilated", "hierarchically", "heartrendingly", "heartrending", "hearthstone", "grandstands", "grandstanded", "grandparent", "grandnephews", "grandfathers", "grandfathering", "granddaddies", "grandaddies", "gramophones", "globetrotting", "gatecrashes", "fundamentalists", "fraternities", "frantically", "forestalling", "foreshortens", "foreknowledge", "flamethrowers", "flamethrower", "flabbergasting", "fainthearted", "extraterritorial", "exothermically", "earthenware", "draftsmanship", "distributorships", "dishonestly", "dishearteningly", "disheartening", "disheartened", "disfranchising", "disfranchisement", "disenfranchising", "disenfranchisement", "discombobulates", "discombobulated", "discographies", "directorships", "deforesting", "crystallographers", "cryptographically", "craftsmanship", "cooperators", "cooperation", "cooperating", "contrapuntally", "consolidates", "consolidated", "condensates", "chitchatting", "chemotherapy", "championships", "capitalistically", "cantilevers", "brandishing", "brainwashed", "boardinghouses", "blackcurrants", "backslashes", "apologetically", "anticyclones", "anticlimactically", "anticipates", "anthropologically", "alliterations", "afforesting", "withstanding", "wholesalers", "whippoorwills", "whimsically", "wheelbarrows", "whatchamacallit", "weatherstripped", "weatherstrip", "weatherboards", "weatherboard", "waterwheels", "watermarking", "washerwomen", "warmheartedness", "warmhearted", "wallpapered", "vibraphones", "valetudinarians", "valetudinarianism", "upperclasswomen", "unsophisticated", "unpreventable", "undomesticated", "undiscovered", "understandings", "underdeveloped", "undecorated", "uncontroversially", "unconsummated", "unconsecrated", "uncompensated", "uncelebrated", "uncalibrated", "typologically", "trusteeships", "transubstantiation", "transplanting", "transplanted", "transparency", "transparencies", "transmigrates", "transmigrated", "transcendentalists", "trampolines", "trampolined", "trainspotting", "touchstones", "tortoiseshells", "topologically", "toothbrushes", "timestamped", "thunderflashes", "thoroughfares", "theretofore", "therapeutics", "thenceforwards", "thematically", "theatergoer", "tautologically", "sycophantically", "swordsmanship", "sweethearts", "swallowtails", "superstates", "supersonically", "supermodels", "superintends", "superintending", "superintendent", "superimposition", "superheated", "studentships", "strumpeting", "stripteases", "stripteased", "storyboarding", "stonewalled", "stonemasons", "steppingstone", "stagecoaches", "sportsmanship", "spectrophotometer", "spearheading", "spearfishes", "spasmodically", "sparrowhawks", "spacecrafts", "southeastwards", "southeastern", "sophisticating", "sophisticates", "sophisticated", "softhearted", "snowboarding", "smallholdings", "showstopping", "shellacking", "sharpshooting", "shareholdings", "seventeenths", "seventeenth", "semiretired", "semantically", "scrimshawed", "satelliting", "sandpapered", "sailboarding", "sadomasochists", "sadomasochistic", "sadomasochism", "sacramenting", "reverberation", "reverberating", "reverberate", "reverberant", "restaurants", "reinvigorates", "reinvigorated", "rediscovery", "rediscovers", "rediscovering", "rediscovered", "redeveloped", "reconsideration", "reafforestation", "rapscallions", "quintillion", "quarantines", "quarantined", "quadratically", "psychotherapists", "psychotherapist", "psychopathology", "psychoneuroses", "proverbially", "provendered", "protestations", "protestants", "protectorate", "prosecutors", "prosecutions", "prosecuting", "proliferation", "proliferating", "proliferate", "proletariat", "proletarian", "preventable", "prestidigitatorial", "preparations", "preliterate", "prekindergartens", "postoperative", "pornographically", "polyunsaturates", "polyunsaturated", "polemically", "pointillists", "pleasantest", "plainclothesmen", "plainclothesman", "pilothouses", "pillowslips", "photosynthetically", "photosynthesized", "photometrically", "photoengravers", "philanthropically", "phenomenologically", "patriarchate", "pathologically", "passionflowers", "passionflower", "passageways", "particleboard", "participated", "parenthesizing", "parenthesize", "parenthesis", "parentheses", "parasympathetics", "parasitically", "parallelograms", "pantechnicons", "overshadowing", "overshadowed", "overestimates", "overestimated", "overdeveloped", "overcompensating", "outsmarting", "orthographically", "opportunistically", "openhearted", "nonparticipating", "nonparticipant", "newspapering", "multimillionaires", "multilaterally", "molestations", "misunderstanding", "mistranslates", "mistranslated", "millionairesses", "millionairess", "millionaires", "microscopically", "microscopes", "micromanagement", "methodologically", "metempsychoses", "metathesized", "melodramatically", "marshmallows", "marchionesses", "marchioness", "maidservants", "macroscopically", "mackintoshes", "loansharking", "legitimates", "legitimated", "legalistically", "landsliding", "landscaping", "lacerations", "kindergartens", "kaleidoscope", "isothermally", "interrelationships", "interpenetrates", "interpenetrated", "interoperable", "interoperability", "insubstantially", "instrumentally", "inconsiderateness", "incarcerates", "incarcerated", "imperialistically", "immoderately", "illiterately", "idealistically", "hyperventilating", "hyperventilate", "hypertension", "hypersensitivities", "hydrophones", "housemothers", "heartbreaking", "handmaidens", "hairstylists", "hairsplitting", "greathearted", "grandmasters", "grandmaster", "grandfatherly", "grandfather", "globetrotters", "globetrotter", "glassblowing", "gigantically", "gatecrashers", "gatecrashed", "gamesmanship", "gallivanting", "gallivanted", "fundamentalist", "fundamentalism", "frontierswomen", "frogmarching", "fraternally", "franchising", "franchisees", "foretasting", "forestation", "foresightedness", "foresighted", "foreshadows", "forensically", "foreknowing", "forefathers", "flameproofs", "flameproofing", "flameproofed", "flagellates", "flagellated", "fireproofing", "fireproofed", "firefighting", "fellowships", "featherbrained", "featherbedding", "fatalistically", "extragalactic", "experimentally", "executrices", "exasperates", "exasperatedly", "exasperated", "entryphones", "enfranchising", "enfranchisement", "endothermic", "electroencephalograms", "electrochemically", "electorates", "dramatically", "distillates", "dispassionately", "dispassionate", "disparately", "disparagingly", "disparaging", "disintegrates", "disintegrated", "dishwashers", "discreditable", "discoverable", "discoursing", "discouragingly", "discouraging", "discontenting", "disconsolately", "disconsolate", "discommodes", "discombobulating", "discombobulate", "discolorations", "disappeared", "disafforests", "disafforested", "directorate", "dillydallying", "dictatorships", "detrimentally", "deterministically", "departmentally", "deliberates", "deliberated", "deforestation", "curatorships", "crystallographic", "crystallographer", "creditworthiness", "crankshafts", "covenanting", "courthouses", "cornerstones", "corespondents", "convalescents", "controverting", "controversially", "consummates", "consummated", "consubstantiation", "constipates", "conspiratorially", "considerations", "considerateness", "consecrates", "consecrated", "confraternity", "confederates", "confederated", "concentrates", "concentrated", "compensates", "compensated", "collaborates", "collaborated", "coelenterates", "codependents", "cobblestones", "cloudscapes", "clapboarding", "chrysanthemums", "choreographically", "chitchatted", "chieftainships", "chanticleers", "chambermaids", "chairmanship", "centripetal", "cartwheeled", "cartographers", "carbohydrates", "calligraphists", "brotherhoods", "broomsticks", "brinkmanship", "botheration", "bootstrapping", "boardinghouse", "blockbusting", "blameworthiness", "beansprouts", "barefacedly", "barbiturates", "autobiographically", "asseveration", "asseverating", "aromatherapists", "aromatherapist", "architraves", "architecturally", "archipelagos", "archiepiscopal", "archbishops", "apprenticeships", "antithetically", "antispasmodics", "antispasmodic", "antislavery", "antipodeans", "antiperspirants", "anticyclone", "anticipations", "anticipated", "anglophones", "anarchically", "anagrammatically", "amphitheaters", "amphitheater", "ambassadorships", "alphabetically", "alliteration", "alliterating", "afforestation", "adolescents", "acknowledgement", "withdrawing", "winegrowers", "windcheaters", "windcheater", "wholesomely", "whitewashing", "whitefishes", "whiteboards", "wheelhouses", "wheelbarrow", "whatshername", "weatherproofs", "weatherproofing", "weatherproofed", "waterspouts", "washerwoman", "wallpapering", "wainscotings", "vociferates", "vociferated", "vituperates", "vituperated", "videophones", "vibrationally", "vertebrates", "valetudinarian", "valedictorians", "upperclasswoman", "unwholesome", "unwarranted", "unwarrantable", "untransportable", "untranslated", "unsympathetically", "unsubstantiated", "unsophistication", "unrepeatable", "unpreparedness", "unmarketable", "uninteresting", "unincorporated", "unilateralist", "unilateralism", "ungrammatically", "unforeseeable", "undeveloped", "understandingly", "understanding", "understandably", "understandable", "understandability", "underpowered", "underestimations", "underestimating", "underestimate", "undereducated", "uncorroborated", "uncooperative", "unauthenticated", "unapologetic", "unadulterated", "unacknowledged", "unabashedly", "ultramodern", "typographically", "trustworthiness", "trustworthiest", "trespassing", "trendsetters", "trendsetter", "travestying", "transshipping", "transportable", "transplantation", "transformations", "transcendentalist", "transcendentalism", "transatlantic", "transactors", "trainspotters", "trainspotter", "trademarking", "totalitarians", "totalitarianism", "topographically", "tiresomeness", "tintinnabulations", "thousandfold", "thermostats", "thermostatics", "thermoplastics", "thermometers", "thermometer", "thermochemical", "therapeutic", "thenceforward", "thenceforth", "testatrices", "terrestrially", "temperateness", "telegraphists", "telegraphically", "teargassing", "tattletales", "tarantellas", "sympathetically", "switchboards", "switchboard", "switchblades", "sweepstakes", "surfboarding", "supplanting", "supersaturation", "supersaturating", "supersaturate", "superpositions", "supermarkets", "supermarket", "superintendency", "superintendence", "superintended", "superimposing", "superimposes", "superimposed", "superheroes", "supergrasses", "superexponential", "superelliptic", "supercooled", "superconductors", "superconducting", "superannuating", "superannuates", "superannuated", "sugarcoating", "sugarcoated", "substantiations", "substantiating", "substantiates", "substantiated", "substantially", "sublieutenants", "subcontractors", "stylistically", "stroboscopes", "stripteasing", "stripteasers", "stripteaser", "stretchmarks", "storekeepers", "storekeeper", "storehouses", "storefronts", "stonewalling", "stethoscope", "stereoscopically", "stereoscopes", "stepmothers", "stepbrothers", "stegosauruses", "stateswomen", "starchiness", "stagestruck", "sportscasting", "spokeshaves", "spoilsports", "splashdowns", "spinsterhood", "speedometers", "speedometer", "spectroscopically", "spectroscopes", "spectrophotometry", "spearfished", "speakerphone", "sparrowhawk", "spacewalking", "southwestwards", "southwestern", "southerlies", "southeastward", "sophistication", "sophisticate", "solipsistic", "snowplowing", "smithereens", "smallholding", "slaughterhouses", "skateboards", "skateboarders", "skateboarder", "skateboarded", "sidesplitting", "showstoppers", "showstopper", "showmanship", "showboating", "shellfishes", "shareholding", "shamefacedly", "shallowness", "serendipity", "serendipitously", "sentimentally", "semiskilled", "semiconductors", "semiconducting", "sellotaping", "searchingly", "scrimshawing", "scoreboards", "scintillates", "scintillated", "schismatics", "scatterbrains", "sandpapering", "sandblasting", "salesladies", "sadomasochist", "sacramented", "saccharides", "roundabouts", "romanticizing", "romanticized", "romanticism", "roadsweepers", "rhinestones", "reverentially", "researching", "researchers", "reproductions", "reprimanding", "rephotographing", "reparations", "remunerates", "remunerated", "reintegrates", "reintegrated", "reinstatement", "reinstalled", "reincorporates", "reincorporated", "regenerates", "regenerated", "refrigerators", "refrigeration", "refrigerating", "refrigerate", "refrigerant", "referentially", "redistributable", "rediscoveries", "redcurrants", "recuperation", "recuperating", "reconsecrate", "reconfirmations", "reconfigurations", "rearrangements", "rearrangement", "rarefactions", "radiotherapists", "radiotherapist", "radiotelephones", "radiophones", "radarscopes", "quartermasters", "quartermaster", "quadripartite", "quadrillion", "psychotherapy", "psychoneurosis", "provendering", "protuberances", "protuberance", "protractors", "protestation", "prosecution", "proprietorially", "prophylaxes", "prophylactics", "propellants", "profiteroles", "professorships", "proclamations", "problematically", "probabilistically", "preventions", "prepubescents", "prepositionally", "preponderating", "preponderate", "preponderantly", "preponderant", "preparedness", "preparation", "preferentially", "prearrangement", "powerhouses", "pompadoured", "polypeptides", "polymorphisms", "polycrystalline"];
}
