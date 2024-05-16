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
    name: "master artist",
    level: 20,
    health: 300
  }
]
const textArray = [
  "Hello there!",
  "How are you today?",
  "What's your favorite color?",
  "Have a great day!",
  "Keep smiling!",
  "Coding is fun!",
  "Stay curious!",
  "Be kind to yourself!",
  "You're awesome!"
];

const randomIndex = Math.floor(Math.random() * textArray.length);

const locations = [
  {
    name: "town square",
    "button text": ["Go to Store", "Go to Cave", "Fight the Artist"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town Plaza. Lots of people walking around in a hypnotized daze. You want nothing to do with any of them. You are on a mission. Focus. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go outside"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store. You see a bunch of weird stuff for sale. There is only one thing that can help you fight evil, and thats weapons. You also see some CBD health potions."
  },
  {
    name: "cave",
    "button text": ["Fight Slime", "Fight Fanged Beast", "Run to Town"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. The walls are covered with paintings. You see some monsters. They are wild and have no morals. One looks like mutant jelly, the other one looks like the big bad wolf. You carefully decide what you are going to do next."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster. Sweat beads down your forehead as you consider what it means to fight wild beasts alone in nature. If you are injured, you will have to make it back to town without help. If you die, no one will ever know what happened to you."
  },
  {
    name: "kill monster",
    "button text": ["Go to Plaza", "Go to Plaza", "Go Skate"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Faaaaack!" as it dies. You gain experience points and find some gold in the air.'
    
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You died. &#x2620; You did not build up enough experience points to survive. The earth will move forward without you now. Death isn't the worst thing. You will reincarnate on a planet similar to earth 40 years from now, to give it another go."
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeated the Master Artist Zack Goulet! YOU WIN THE GAME! &#x1F389; YOU ARE GOATED" 
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
    case "store":
      document.getElementById('imageChanger').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJhZ2p6xMK9CE2QX4RQVdsCyrwJSEuHe3amVHMK96ix5h4mZZSyAWNr7vZAnGKn.png')";
      document.getElementById('imageChangerBottom').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/23tb68cYpUaoVjvcPL1x4LQPZ5jnL6J2DbVRNhYpsLFpBfged5RGmYWgtbYVQbyaRMQbt.gif')";
      playLocationSound("store-sound");
      break;
    case "cave":
      document.getElementById('imageChanger').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AK3ddr7TDkEw5tkauvtTFRH2u2egRwMcgMpspXicxBnVC1CMPDbZiNbnjcieKo5.png')";
      document.getElementById('imageChangerBottom').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/23t798T4WFLrv82yKH1BdxzEaAuV72AAigosbu1XYCR7na3zVcz9JYSkDWLaqd6LmkvPo.gif')";
      break;
    case "town square":
      document.getElementById('imageChanger').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJg6R757ydUTPwbdWaGwBSURS6pTkRKNFg8NLmXgt3fWi97qp1U1rCMEpLaiBFx.png')";
      document.getElementById('imageChangerBottom').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/23uFMbmuB7AgotzqFGV9P32WXXWaB9WZmABgZKeXz9bxW68geMB9bsmd2iaXkdBBqaAvu.gif')";
      playLocationSound("go-to-town");
      break;

      case "kill monster":
        document.getElementById('imageChanger').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AKKRrVKntmmY6QVsqU2GySGTDShDf3DKN5sbLrLP14wdHA2539UBj9VyZouDF71.gif')";
        document.getElementById('imageChangerBottom').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/23tkZTu2P3KA6qbLivLBfWNQAK4hA31RgE8YeRGfGBZ6BF7PMxb8meLXRFxgNjsjHFatJ.gif')";
        playLocationSound("kill-monster");
        break;

    case "lose":
      document.getElementById('imageChanger').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AKRADg7VcVgZKZwFZku43oxgJnkWPJSt5Q84MtSssMTMtPjuUVo3sQUs1YHGv21.gif')";
      document.getElementById('imageChangerBottom').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/Ep1QdYpk1E5WFJoYV2qANGAeHBagRegT9aoBTjE9h9BZymfs77Yy4KKTHDdi3nuBV7g.gif')";
      playLocationSound("lose");
      break;

      case "fight":
      // Update image based on the monster being fought
      switch (fighting) {
        case 0: // Slime
          document.getElementById('imageChanger').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AK3ZjQbGCoLK2oXdMJg3em6KMmgpaPcEwkPHkQzTGTf8LCdJasQNGZWyoD5avs8.PNG')";
          playLocationSound("fight-slime");
          break;
        case 1: // Leopard Fanged Beast
          document.getElementById('imageChanger').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJkLb5bwKCry1wc5BbXVkEMzjs1R2Z6aEy4cmZCT4tV2QwiT4hi4q5pNZmCcvon.PNG')";
          playLocationSound("fight-beast");
          break;
        case 2: // Dragon Master Artist
          document.getElementById('imageChanger').style.backgroundImage = "url('https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJYzse1c2uspWwJsvKccWuUdxwpkmJA7BQrEwZyn6Am5siTr9psbpWZop7goc6w.png')";
          playLocationSound("fight-artist");
          break;
        default:
         
          break;
      }
      break;

    default:
      // Set a default image or do nothing if the location doesn't require a specific image
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
  playLocationSound("go-to-town");
}

function goStore() {
  update(locations[1]);
  playLocationSound("go-to-store");
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
    playLocationSound("wiff"); 
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
      playLocationSound("buy-weapon");
      updateWeapon();
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
      playLocationSound("wiff"); 
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
    playLocationSound("coin");
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
    updateWeapon();
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
    playLocationSound("attack");   
  } else {
    text.innerText += " You hesitated and missed. The monster doubts your abilities. Now you are scared.";
    playLocationSound("wiff");   
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
    updateWeapon();
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
  playLocationSound("dodge");
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








function updateWeapon() {
  const weaponImagesDiv = document.getElementById('weaponImages');
  weaponImagesDiv.innerHTML = ''; // Clear previous images

  inventory.forEach(weapon => {
      const img = document.createElement('img');
      img.src = getWeaponImageUrl(weapon); // Function to get the URL based on weapon name
      img.alt = weapon;
      img.classList.add('weapon-image'); // Add a class for styling
      weaponImagesDiv.appendChild(img);
  });
}

// Function to get the URL of the weapon image based on its name
function getWeaponImageUrl(weaponName) {
  // Add logic to map weapon names to their corresponding image URLs
  switch (weaponName) {
      case 'stick':
          return 'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJd9jzVoQdKs4nqtcfR9VW1xQEDVGfV8ZZ47DLe5hWvhHmzMa8oswRPfmVsMKXW.PNG'; // Replace with the actual URL of the stick image
      case 'dagger':
          return 'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJd95u7RKRrwbDkg9fEeMwWRvgp4qGqJP1Fzb984qAeGb1RY5g6tL3AiTFVEa19.PNG'; // Replace with the actual URL of the dagger image
      case 'claw hammer':
          return 'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJhURRCfJwGCQqhQ8rD8fao9jPx2FwrZ3kRXGPTdVV29ZzPBxQvGqzEEEBM4TkR.PNG'; // Replace with the actual URL of the dagger image
      case 'sword':
          return 'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJmnWj1Yf1wf9oirhwTWLh5Q1HWkTVzrSPcZFo7bmoVNq9LvGoXjeTpsG1GfSYB.PNG'; // Replace with the actual URL of the dagger image
      // Add cases for other weapons as needed
      default:
          return 'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/web-gnar/AJd9SKiZ9Y1aekQ2CE6k73ACRFyAKWq7XefJ4H7ZfRxpW3txmvCYGHRt8gT51wP.GIF'; // Replace with a default image URL
  }
}

// Call updateWeapon() at the beginning of the game to initialize the inventory
updateWeapon();

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
    'https://opengameart.org/sites/default/files/jump_0.flac'
    
    
    
];

mouseOverSoundButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        const randomIndex = Math.floor(Math.random() * soundSources.length);
        const randomSound = soundSources[randomIndex];
        soundPlayer.src = randomSound;
        soundPlayer.play();
    });
});

//controls buttons
// Array containing URLs to the three sound files
const soundUrls = [
  'https://opengameart.org/sites/default/files/174.mp3',
  'https://opengameart.org/sites/default/files/285.mp3',
  'https://opengameart.org/sites/default/files/396.mp3',
  'https://opengameart.org/sites/default/files/417.mp3',
  'https://opengameart.org/sites/default/files/528.mp3'
];

// Loop through all elements with the class 'button' and add a mouseover event listener to each
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('mouseover', () => {
      // Choose a random index from 0 to 2 (inclusive) to select one of the sound URLs
      const randomIndex = Math.floor(Math.random() * soundUrls.length);
      // Create an Audio object for the randomly chosen sound
      const buttonSound = new Audio(soundUrls[randomIndex]);
      // Play the randomly chosen sound
      buttonSound.play();
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
let initialX, initialY;
let offsetX, offsetY;
let isDragging = false;

movableDiv.addEventListener('mousedown', startDrag);

function startDrag(e) {
  isDragging = true;
  initialX = e.clientX;
  initialY = e.clientY;
  offsetX = movableDiv.getBoundingClientRect().left;
  offsetY = movableDiv.getBoundingClientRect().top;
  movableDiv.style.cursor = 'grabbing';
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);
  e.preventDefault(); // Prevent default behavior during dragging
}

function drag(e) {
  if (!isDragging) return;
  
  let newX = e.clientX - initialX + offsetX;
  let newY = e.clientY - initialY + offsetY;
  
  // Set new position with respect to boundaries
  newX = Math.max(0, Math.min(newX, window.innerWidth - movableDiv.offsetWidth));
  newY = Math.max(0, Math.min(newY, window.innerHeight - movableDiv.offsetHeight));
  
  movableDiv.style.left = newX + 'px';
  movableDiv.style.top = newY + 'px';
}

function endDrag() {
  isDragging = false;
  movableDiv.style.cursor = 'grab';
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', endDrag);
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

function updatePepePrice() {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=pepe&vs_currencies=usd')
      .then(response => response.json())
      .then(data => {
          const pepePrice = data.pepe.usd.toFixed(10); // Set the number of decimal places
          document.getElementById('pepe-price').textContent = `$${pepePrice}`;
      })
      .catch(error => {
          console.error('Error fetching Pepe price:', error);
      });
}

// Initial update of the Pepe price
updatePepePrice();

// Update the Pepe price every 10 seconds
setInterval(updatePepePrice, 10000); // 10000 milliseconds = 10 seconds

            function updateTime() {
              const currentTime = new Date();
              const hours = currentTime.getHours().toString().padStart(2, '0');
              const minutes = currentTime.getMinutes().toString().padStart(2, '0');
              const seconds = currentTime.getSeconds().toString().padStart(2, '0');
              const formattedTime = `${hours}:${minutes}:${seconds}`;
              document.getElementById('current-time').textContent = formattedTime;
          }
          
          // Initial update of the current time
          updateTime();
          
          // Update the current time every second
          setInterval(updateTime, 1000);


          //grinder animation
    document.addEventListener('DOMContentLoaded', function() {
      var linepainting1 = document.querySelector('.linepainting1');
      var linepainting2 = document.querySelector('.linepainting2');
    
      // Function to animate images
      function animateImages() {
        linepainting1.style.transform = 'translate(-50%, -100%)'; // Move linepainting1 up
        linepainting2.style.transform = 'translate(-50%, -0%)'; // Move linepainting2 down
        setTimeout(function() {
          // Reverse the animation after 1 second
          linepainting1.style.transform = 'translate(-50%, -50%)'; // Reset linepainting1 position
          linepainting2.style.transform = 'translate(-50%, -50%)'; // Reset linepainting2 position
        }, 1000);
      }
    
      // Call the animateImages function periodically
      setInterval(animateImages, 2000); // Change the interval as needed
    });