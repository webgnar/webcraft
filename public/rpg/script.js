let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");



const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\".",
    imageUrl: "https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/23vho7jxcXZiQpdgJ6ukjFVFj6dC6QwJLRdLJmtTDyiHnT8PJmcoonnavPQpcSrnz6SBz.gif"
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go outside"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight leopard", "Go to town"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;

  switch (location.name) {
    case "town square":
      playLocationSound("go-to-town");
      break;
    case "store":
      playLocationSound("store-sound");
      break;
    case "lose":
      playLocationSound("game-over-sound");
      break;
    
    // Add cases for other locations as needed
    default:
      // If there's no specific sound for the current location
      // do nothing or play a default sound
  }
 
}

function playLocationSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
      sound.play();
    } else {
      console.error(`Sound with ID ${soundId} not found.`);
    }
  }

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
  playLocationSound("cave-sound");
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    playLocationSound("buy-health");
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

//sounds
//#region
const radioButtons = document.querySelectorAll('.playButton');

// Toggle play/pause for radio buttons
radioButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const radioPlayer = radioPlayers[index]; // Access the corresponding audio player using the index
        if (radioPlayer.paused) {
            radioPlayer.play();
            button.innerHTML = '<span class="material-symbols-outlined">pause_circle</span>';
            button.style.setProperty('--animation-duration', '0.5s'); // Set animation duration for the current button
        } else {
            radioPlayer.pause();
            button.innerHTML = '<span class="material-symbols-outlined">play_circle</span>';
            button.style.setProperty('--animation-duration', '2s'); // Reset animation duration for the current button
        }
    });
});
//#endregion

//#region



//sound effects on mouseover
const mouseOverSoundButtons = document.querySelectorAll('.playButton');
const soundPlayer = document.getElementById("random-sound-effect");

const soundSources = [
    'https://opengameart.org/sites/default/files/jumpland48000.mp3',
    'https://opengameart.org/sites/default/files/huh.wav',
    'https://opengameart.org/sites/default/files/bubbles-single1.wav',
    'https://opengameart.org/sites/default/files/flame_0.ogg',
    'https://opengameart.org/sites/default/files/thud2.wav',
    'https://opengameart.org/sites/default/files/hit01.wav',
    'https://opengameart.org/sites/default/files/slime_jump_0.mp3',
    'https://opengameart.org/sites/default/files/jump_0.flac',
    'https://github.com/webgnar/QFSHIVE/raw/main/sounds/snd_alert/snd_alert.mp3'
    
    
];

mouseOverSoundButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        const randomIndex = Math.floor(Math.random() * soundSources.length);
        const randomSound = soundSources[randomIndex];
        soundPlayer.src = randomSound;
        soundPlayer.play();
    });
});

//#endregion

//#region radio slider
const stationSlider = document.getElementById('station-slider');
const radioPlayers = [
  document.getElementById('radioPlayer1'),
  document.getElementById('radioPlayer2'),
  document.getElementById('radioPlayer3'),
  document.getElementById('radioPlayer4')
];

stationSlider.addEventListener('input', function() {
  const stationIndex = parseInt(this.value);
  pauseAllRadios(); // Pause all radios before changing the station
  playRadio(stationIndex); // Play the selected station
});

function playRadio(stationIndex) {
  radioPlayers[stationIndex].play();
}

function pauseAllRadios() {
  radioPlayers.forEach(player => {
    player.pause();
  });
}
//#endregion



//#region draggable controls
const movableDiv = document.getElementById('controls');
let offsetX, offsetY;
let isDragging = false;

movableDiv.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
  isDragging = true;
  offsetX = e.clientX - movableDiv.getBoundingClientRect().left;
  offsetY = e.clientY - movableDiv.getBoundingClientRect().top;
  movableDiv.style.cursor = 'grabbing';
}

function drag(e) {
  if (!isDragging) return;
  movableDiv.style.left = e.clientX - offsetX + 'px';
  movableDiv.style.top = e.clientY - offsetY + 'px';
}

function endDrag() {
  isDragging = false;
  movableDiv.style.cursor = 'grab';
}

//#endregion

document.addEventListener('mousemove', function(event) {
  createSpark(event.clientX, event.clientY);
});

function createSpark(x, y) {
  const spark = document.createElement('div');
  spark.classList.add('spark');
  spark.style.left = x + 'px';
  spark.style.top = y + 'px';
  document.getElementById('mousesparks').appendChild(spark);

  // Remove the spark element after the animation completes
  spark.addEventListener('animationend', function() {
    spark.remove();
  });
}

document.documentElement.style.setProperty('--bounce-bottom', getRandomBottom());

// Get the element
var bouncer = document.getElementById('bouncer');
// Set the initial value for bottom property
bouncer.style.setProperty('--bounce-bottom', getRandomBottom());

// Function to update the bottom property with a random value
function updateBottomProperty() {
  bouncer.style.setProperty('--bounce-bottom', getRandomBottom());
}

// Function to generate a random value for the bottom property
function getRandomBottom() {
  // Array of three possible values for bottom property
  var bottoms = ['100px', '200px', '280px'];
  // Randomly select one value from the array
  return bottoms[Math.floor(Math.random() * bottoms.length)];
}

// Trigger the update every time the animation iteration ends
bouncer.addEventListener('animationiteration', updateBottomProperty);



//balltrail
var ballTrail = document.getElementById('balltrail');
var intervalID;

document.getElementById('bouncer').addEventListener('animationstart', function() {
  intervalID = setInterval(createTrail, 100); // Adjust the interval duration as needed
});

document.getElementById('bouncer').addEventListener('animationend', function() {
  clearInterval(intervalID); // Clear the interval when the animation ends
});

function createTrail() {
  var bouncer = document.getElementById('bouncer');
  var bouncerRect = bouncer.getBoundingClientRect();

  var spark = document.createElement('div');
  spark.classList.add('spark', 'ball-trail-spark'); // Add both classes to the spark element
  spark.style.left = (bouncerRect.left + bouncerRect.width / 2) + 'px'; // Center spark horizontally
  spark.style.top = (bouncerRect.top + bouncerRect.height / 2) + 'px'; // Center spark vertically
  ballTrail.appendChild(spark);

  // Remove the spark element after a certain duration
  setTimeout(function() {
    spark.parentNode.removeChild(spark);
  }, 1000); // Adjust the duration as needed
}

