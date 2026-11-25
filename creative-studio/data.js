// Lumen Kids Creative Studio — local content: word banks, passages and pixel pictures.
window.STUDIO_DATA = (() => {
  // ---------- topic banks: [WORD, clue] ----------
  const banks = {
    'ocean animals': [
      ['SHARK','A big fish with rows of sharp teeth'],['WHALE','The largest animal in the sea'],['CRAB','It walks sideways on the sand'],
      ['OCTOPUS','It has eight arms'],['DOLPHIN','A smart, playful swimmer that clicks'],['SEAL','It barks and naps on rocks'],
      ['SQUID','A ten-armed swimmer that squirts ink'],['TURTLE','It carries its shell everywhere'],['CLAM','A shellfish that opens and closes'],
      ['CORAL','Tiny animals that build reefs'],['ORCA','A black-and-white whale'],['SHRIMP','A small, curved shellfish'],['EEL','A long fish shaped like a snake']],
    'chemistry': [
      ['ATOM','The tiny building block of everything'],['ACID','Lemon juice is a weak one'],['GAS','Air is one; it fills any container'],
      ['LIQUID','Water at room temperature'],['SOLID','Ice is water in this state'],['METAL','Iron, copper or gold'],
      ['OXYGEN','The gas we need to breathe'],['CARBON','Element found in diamonds and pencils'],['BEAKER','A glass cup used in labs'],
      ['FLASK','A lab bottle with a narrow neck'],['MIXTURE','Two or more things stirred together'],['ELEMENT','A pure substance on the periodic table']],
    'pirates': [
      ['SHIP','A pirate sails on one'],['MAP','X marks the spot on it'],['TREASURE','Gold and jewels in a chest'],['PARROT','A talking bird on a shoulder'],
      ['ANCHOR','It keeps the ship from drifting'],['CAPTAIN','The leader of the crew'],['ISLAND','Land with water all around'],['SAIL','Cloth that catches the wind'],
      ['CANNON','It goes BOOM on deck'],['FLAG','The Jolly Roger is one'],['PLANK','A board you might have to walk'],['COMPASS','It always points north']],
    'at the beach': [
      ['SAND','Tiny grains you build castles with'],['WAVE','Water rolling onto the shore'],['SHELL','A sea creature’s old home'],['TOWEL','Dry off with it after a swim'],
      ['BUCKET','Carry water or sand in it'],['SHOVEL','Dig a hole with it'],['SUN','It keeps the beach warm'],['CASTLE','You can build one from sand'],
      ['SEAGULL','A noisy bird by the sea'],['KITE','It flies on a string in the wind'],['TIDE','The sea coming in and going out'],['SWIM','Move through the water']],
    'in the kitchen': [
      ['SPOON','Use it to eat soup'],['FORK','It has prongs for picking up food'],['PLATE','Food goes on it'],['OVEN','Bake cookies in it'],
      ['BOWL','Cereal goes in it'],['PAN','Fry an egg in it'],['KETTLE','It whistles when water boils'],['WHISK','Use it to beat eggs'],
      ['APRON','Wear it to keep clean while cooking'],['SINK','Wash the dishes here'],['TOASTER','It makes bread crunchy'],['FRIDGE','It keeps food cold']],
    'winter fun': [
      ['SNOW','White flakes falling from the sky'],['SLED','Ride it down a snowy hill'],['SKATE','Glide on the ice'],['MITTEN','A glove with no fingers'],
      ['SCARF','Wrap it around your neck'],['COCOA','A warm chocolate drink'],['IGLOO','A house made of snow blocks'],['ICICLE','Frozen drip hanging from a roof'],
      ['SNOWMAN','A friend with a carrot nose'],['BOOTS','Keep your feet dry in the snow'],['FROST','Ice crystals on the window'],['SKI','Slide down a mountain on two of these']],
    'polar animals': [
      ['PENGUIN','A bird that swims but cannot fly'],['WALRUS','It has long tusks and whiskers'],['SEAL','It rests on the ice'],['BEAR','The polar one is white'],
      ['ORCA','A black-and-white hunter of the sea'],['FOX','The arctic one turns white in winter'],['OWL','The snowy one hunts by day'],['HARE','A rabbit-like animal with big feet'],
      ['REINDEER','It has antlers and pulls sleighs'],['NARWHAL','A whale with a long tusk'],['PUFFIN','A bird with a colorful beak'],['MOOSE','The biggest deer of all']],
    'ecosystems': [
      ['FOREST','A place full of trees'],['DESERT','A very dry place'],['OCEAN','The biggest body of salt water'],['POND','A small, still body of water'],
      ['TUNDRA','A cold, treeless land'],['SWAMP','Wet land with trees and mud'],['REEF','Coral city under the sea'],['PRAIRIE','Flat grassland'],
      ['HABITAT','The natural home of a living thing'],['PLANT','It makes food from sunlight'],['FOOD','Every animal needs it'],['WATER','All life needs it to live']],
    'volcanoes': [
      ['LAVA','Melted rock that flows outside'],['MAGMA','Melted rock under the ground'],['ASH','Gray dust that falls after an eruption'],['CRATER','The bowl at the top of a volcano'],
      ['ERUPT','To burst out suddenly'],['ROCK','Lava cools into it'],['VENT','An opening where lava escapes'],['CONE','The shape of many volcanoes'],
      ['SMOKE','Dark clouds rising up'],['HEAT','Lava has a lot of it'],['MOLTEN','Melted by great heat'],['STEAM','Hot water vapor']],
    'solar system': [
      ['SUN','The star at the center'],['MOON','It circles the Earth'],['EARTH','Our home planet'],['MARS','The red planet'],
      ['VENUS','The hottest planet'],['SATURN','The planet with bright rings'],['PLANET','Earth is one'],['COMET','An icy ball with a long tail'],
      ['ORBIT','The path around the Sun'],['STAR','A huge ball of glowing gas'],['JUPITER','The biggest planet'],['ROCKET','It carries astronauts to space']],
    'farm animals': [
      ['COW','It gives us milk'],['PIG','It loves to roll in mud'],['HORSE','You can ride it'],['SHEEP','Its wool keeps us warm'],
      ['GOAT','It has a beard and climbs'],['HEN','A mother chicken'],['DUCK','It quacks and swims'],['LAMB','A baby sheep'],
      ['ROOSTER','It crows in the morning'],['DONKEY','It says hee-haw'],['BARN','Where farm animals sleep'],['TURKEY','A big bird that gobbles']],
    'rainforest': [
      ['JAGUAR','A spotted big cat'],['SLOTH','The slowest animal in the trees'],['TOUCAN','A bird with a giant bright beak'],['MONKEY','It swings from branch to branch'],
      ['FROG','Some are tiny and brightly colored'],['VINE','A plant that climbs trees'],['CANOPY','The top layer of the forest'],['PARROT','A colorful talking bird'],
      ['ORCHID','A beautiful flower'],['RAIN','It falls almost every day here'],['SNAKE','It slithers along branches'],['ANT','A tiny insect that works in teams']],
  };
  const alias = { 'beach':'at the beach', 'kitchen':'in the kitchen', 'ocean':'ocean animals', 'sea':'ocean animals', 'space':'solar system',
    'planets':'solar system', 'farm':'farm animals', 'winter':'winter fun', 'snow':'winter fun', 'polar':'polar animals', 'arctic':'polar animals',
    'volcano':'volcanoes', 'pirate':'pirates', 'jungle':'rainforest', 'science':'chemistry' };

  function findBank(topic) {
    const t = topic.trim().toLowerCase();
    if (!t) return null;
    if (banks[t]) return { name: t, words: banks[t] };
    for (const k of Object.keys(banks)) if (t.includes(k) || k.includes(t)) return { name: k, words: banks[k] };
    for (const [a, k] of Object.entries(alias)) if (t.includes(a)) return { name: k, words: banks[k] };
    return null;
  }

  // ---------- idea chips ----------
  const ideas = {
    'color-by-number': [
      ['Garden gate','An open garden gate surrounded by sunflowers and a winding stone path'],
      ['Pizza party','A pizza on a round plate with big slices of tomato, mushrooms, and basil leaves'],
      ['Venice canal','A gondola floating beneath a stone bridge on a quiet Venice canal'],
      ['Woodland picnic','A friendly fox and a rabbit having a picnic in a woodland clearing'],
      ['Ocean friends','A sea turtle and two fish swimming beside broad coral shapes'],
      ['Tree house','A tree house in a big oak tree with a ladder and a tire swing'],
      ['Snowy village','A little village of snow-covered houses with a tall evergreen tree in the square'],
      ['Butterfly garden','Three butterflies flying around large tulips and daisies'],
      ['Moon explorer','An astronaut waving from the moon beside a rocket, with big planets in the sky'],
      ['Camping night','A tent beside a campfire under a crescent moon and large stars']],
    'word-search': [['Chemistry'],['Pirates'],['At the beach'],['In the kitchen'],['Solar system'],['Farm animals'],['Ocean animals'],['Rainforest']],
    'crossword': [['Winter fun'],['Polar animals'],['Ecosystems'],['Volcanoes'],['Solar system'],['Pirates'],['Ocean animals'],['Farm animals']],
    'reading-passage': [['Rainforest'],['Butterflies'],['Pyramids'],['Volcanoes'],['Ocean animals'],['Solar system']],
  };

  // ---------- grade levels ----------
  const puzzleGrades = ['Pre-K · ages 3–4','Kindergarten · ages 5–6','1st grade · ages 6–7','2nd grade · ages 7–8','3rd grade · ages 8–9',
    '4th grade · ages 9–10','5th grade · ages 10–11','6th grade · ages 11–12','7th grade · ages 12–13','8th grade · ages 13–14',
    '9th grade · ages 14–15','10th grade · ages 15–16','11th grade · ages 16–17','12th grade · ages 17–18','College · undergraduate','Graduate & expert · specialists'];
  const readingGrades = ['Kindergarten · 5–6','Grade 1 · 6–7','Grade 2 · 7–8','Grade 3 · 8–9','Grade 4 · 9–10','Grade 5 · 10–11','Grade 6 · 11–12',
    'Grade 7 · 12–13','Grade 8 · 13–14','Grade 9 · 14–15','Grade 10 · 15–16','Grade 11 · 16–17','Grade 12 · 17–18','College · undergraduate','Graduate & expert · specialists'];

  // ---------- reading passages ----------
  const passages = {
    'rainforest': { title: 'The Rainforest', body: [
      'A rainforest is a warm, wet forest where it rains almost every day. Tall trees grow close together, and their leaves make a green roof called the canopy.',
      'Many animals live in the rainforest. Toucans fly from branch to branch with their big, bright beaks. Sloths hang upside down and move very slowly. Tiny frogs with colorful skin hide on wide leaves.',
      'Rainforests are important for the whole world. Their plants make the oxygen we breathe, and many medicines come from rainforest plants. When we protect rainforests, we protect the animals and people who need them.'],
      questions: ['What is the canopy?','Name two animals that live in the rainforest.','Why are rainforests important for the whole world?'] },
    'butterflies': { title: 'From Egg to Butterfly', body: [
      'Every butterfly begins as a tiny egg on a leaf. When the egg hatches, a hungry caterpillar crawls out. It eats and eats and grows bigger every day.',
      'When the caterpillar is big enough, it makes a hard case around itself called a chrysalis. Inside, something amazing happens. The caterpillar slowly changes its whole body.',
      'After a few weeks, the chrysalis opens and a butterfly climbs out. It waits for its wings to dry, and then it flies away to drink sweet nectar from flowers. Soon it will lay eggs of its own.'],
      questions: ['Where does a butterfly lay its eggs?','What is a chrysalis?','What does a butterfly drink?'] },
    'pyramids': { title: 'The Pyramids of Egypt', body: [
      'Long ago, in the desert of Egypt, people built giant stone pyramids. Many were made as tombs for kings called pharaohs.',
      'Building a pyramid took many years. Workers cut huge blocks of stone and moved them on sleds. They used ramps to pull the blocks higher and higher, until the pyramid reached a sharp point at the top.',
      'The Great Pyramid is the biggest of all. It is more than four thousand years old, and it is still standing today. People from all over the world travel to see it and wonder how it was made.'],
      questions: ['Who were the pyramids built for?','How did workers move the heavy stones?','How old is the Great Pyramid?'] },
    'volcanoes': { title: 'Mountains of Fire', body: [
      'A volcano is an opening in the Earth’s crust. Deep underground, it is so hot that rock melts into a thick liquid called magma.',
      'Sometimes the magma pushes its way up and bursts out of the volcano. This is called an eruption. When the melted rock reaches the surface, we call it lava. Lava glows red and orange and slowly flows down the mountain.',
      'When lava cools, it turns into new rock. Over many years, eruptions can build a volcano taller and taller. Some islands, like Hawaii, were made by volcanoes!'],
      questions: ['What is the difference between magma and lava?','What happens to lava when it cools?','Name a place that was made by volcanoes.'] },
    'ocean animals': { title: 'Life in the Ocean', body: [
      'The ocean is home to more animals than anywhere else on Earth. Some are tiny, and some are giant.',
      'The blue whale is the largest animal that has ever lived. It eats tiny shrimp-like animals called krill. Octopuses are clever and can change color to hide. Sea turtles swim for thousands of miles and come back to the same beach to lay their eggs.',
      'Coral reefs are like busy underwater cities. Fish of every color live there and find food and shelter. Keeping the ocean clean helps all of these animals stay healthy.'],
      questions: ['What does the blue whale eat?','How does an octopus hide?','Why are coral reefs like cities?'] },
    'solar system': { title: 'Our Solar System', body: [
      'Our solar system is made of the Sun and everything that travels around it. Eight planets circle the Sun on paths called orbits.',
      'Mercury is closest to the Sun, and Neptune is the farthest away. Earth is the third planet, and it is the only one we know that has life. Jupiter is the biggest planet, and Saturn has beautiful rings made of ice and rock.',
      'The Sun is a star. It gives the planets light and warmth. Without the Sun, Earth would be a dark, frozen place.'],
      questions: ['What is an orbit?','Which planet is the biggest?','Why do we need the Sun?'] },
  };

  // ---------- color-by-number pictures (12×12 pixel art) ----------
  // Each colour: [name, hex, tier, foldInto]. Tier 1 = simple, 2 = standard, 3 = detailed;
  // colours above the chosen tier fold into `foldInto`.
  const pictures = {
    tree: { name: 'Evergreen tree', keys: ['tree','forest','pine','evergreen','christmas','village','woodland','camping','oak'],
      colors: { W:['White','#ffffff',1], G:['Dark green','#2f6b3a',1], B:['Brown','#7a4b2a',1], L:['Light green','#7fbf6a',2,'G'], R:['Red','#d8453b',2,'G'], Y:['Yellow','#f2c94c',3,'W'] },
      rows: ['WWWWWYYWWWWW','WWWWWGGWWWWW','WWWWGGLGWWWW','WWWGGRGGGWWW','WWGGGGGLGGWW','WWWGLGGGRWWW','WWGGGGRGGGWW','WGGRGGGGLGGW','WWWWWBBWWWWW','WWWWWBBWWWWW','WWWWBBBBWWWW','WWWWWWWWWWWW'] },
    house: { name: 'Little house', keys: ['house','home','cabin','cottage','gate','street','town','library'],
      colors: { S:['Light blue','#8ec5ea',1], R:['Red','#c9463d',1], Y:['Yellow','#f2c94c',1], B:['Brown','#7a4b2a',2,'R'], G:['Green','#4f9a48',2,'Y'], D:['Dark red','#7d221c',3,'R'] },
      rows: ['SSSSSSSSSSSS','SSSSSRRSSSSS','SSSSRRRRSSSS','SSSRRDDRRSSS','SSRRRRRRRRSS','SRRRRRRRRRRS','SSYYYYYYYYSS','SSYSSYYSSYSS','SSYSSYYSSYSS','SSYYYBBYYYSS','SSYYYBBYYYSS','GGGGGGGGGGGG'] },
    fish: { name: 'Happy fish', keys: ['fish','ocean','sea','turtle','whale','harbor','coral','water','boat','canal','gondola'],
      colors: { S:['Light blue','#8ec5ea',1], O:['Orange','#f08a3c',1], K:['Black','#2a2a2a',1], Y:['Yellow','#f2c94c',2,'O'], G:['Green','#4f9a48',3,'S'] },
      rows: ['SSSSSSSSSSSS','SSSSSSSSSSSS','SSSSOOOSSSSS','SSSOOOOOSSSO','SSOKOYOYOSOO','SOOOOYOYOOOO','SOOOOYOYOOOO','SSOOOYOYOSOO','SSSOOOOOSSSO','SSSSOOOSSSSS','GSSSSSSSSSGS','GGSGSSSGSGGS'] },
    flower: { name: 'Sunny flower', keys: ['flower','garden','butterfly','tulip','daisy','sunflower','spring','meadow','market'],
      colors: { W:['White','#ffffff',1], Y:['Yellow','#f2c94c',1], G:['Green','#4f9a48',1], O:['Orange','#f08a3c',2,'Y'], B:['Brown','#7a4b2a',2,'O'], P:['Pink','#ee8fb1',3,'W'] },
      rows: ['WWWWYYYYWWWW','WWWYYOOYYWWW','WWYYOBBOYYWW','WWYOBBBBOYWW','WWYOBBBBOYWW','WWYYOBBOYYWW','WWWYYOOYYWWW','WWWWYGGYWWWW','WGGWWGGWWGGW','WWGGWGGWGGWW','WWWGGGGGGWWW','PPPPPGGPPPPP'] },
    heart: { name: 'Heart', keys: ['heart','love','valentine','pizza','party','baking','cookie','fruit'],
      colors: { W:['White','#ffffff',1], R:['Red','#d8453b',1], P:['Pink','#ee8fb1',1], D:['Dark red','#8f2a24',2,'R'], L:['Light pink','#f6c9d6',3,'W'] },
      rows: ['WWWWWWWWWWWW','WWRRRWWRRRWW','WRPPRRRRRRRW','RRPRRRRRRRRR','RRRRRRRRRRDR','RRRRRRRRRRDR','WRRRRRRRRDDW','WWRRRRRRRDWW','WWWRRRRRDWWW','WWWWRRRRWWWW','WWWWWRRWWWWW','LLLLLLLLLLLL'] },
    rocket: { name: 'Rocket', keys: ['rocket','moon','space','astronaut','planet','star','explorer','robot','night'],
      colors: { K:['Dark blue','#1f2a4d',1], W:['White','#ffffff',1], R:['Red','#d8453b',1], Y:['Yellow','#f2c94c',2,'W'], O:['Orange','#f08a3c',2,'R'], B:['Light blue','#8ec5ea',3,'W'] },
      rows: ['KKKKKRRKKKKK','KYKKRRRRKKKK','KKKKWWWWKKYK','KKKKWBBWKKKK','KKKKWBBWKKKK','KKKKWWWWKKKK','KKKRWWWWRKKK','KKRRWWWWRRKK','KKRKWWWWKRKK','KKKKOYYOKKKK','KYKKKOOKKKKK','KKKKKKKKKKYK'] },
  };

  return { banks, findBank, ideas, puzzleGrades, readingGrades, passages, pictures };
})();
