let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let montsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons =[
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, goFight],
        text: "You are in the town square. Where do you want to go?"
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [BuyHealth, buyWeapon, goTown],
        text: "You enter the store"
    },
    {
        name: "cave",
        "button text": ["Fight Slime)", "Fight Beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "enter the cave and see monsters"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monstaaa"
    },
    {
        name:"kill monsta",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: "You killed the monstaaa you have experience and now gold"
    },
    {
        name:"lose",
        "button text": ["Replay", "Replay", "Replay"],
        "button functions": [start, start, start],
        text: "You died"
    },
    {
        name:"win",
        "button text": ["Replay", "Replay", "Replay"],
        "button functions": [start, start, start],
        text: "You win"
    }
    
]

const monsters = [
    {
        name: "slime",
        level: 2,
        health:15
    },
    {
        name: "beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
]
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = goFight;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location["text"];
}

function goTown() {
    update(locations[0])
}
function goStore() {
    update(locations[1])
}
function goCave() {
    update(locations[2])
}
function goFight() {
    console.log("Fighting the dragon warrior!")
}

function BuyHealth() {
    if(gold >=10)
    {
        gold = gold - 10;
        health = health + 10
        goldText.innerText = gold
        healthText.innerText = health
    }else
    {
        text.innerText = "You do not have enough gold"
    }

}
function buyWeapon() {
if (currentWeapon< weapons.length -1)
    {
        if(gold >= 30)
        {
            gold = gold - 30;
            currentWeapon = currentWeapon + 1;
            goldText.innerText = gold
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon +"."
            inventory.push[newWeapon]
            text.innerText += "In your inventory you have: " + inventory
        }else
        {
            text.innerText = "You do not have enough gold"
        }
    }else
    {
        text.innerText = "You already have the most powerful weapon"
        button2.innerText = "Sell weapon for 15 gold"
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if(inventory.length > 1)
    {
        gold = gold + 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + "."
        text.innerText += "In your inventory you have: " + inventory
    }else
    {
        text.innerText = "You cannot sell your only weapon"
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

function goFight()
{
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth
}
function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks"
    text.innerText += "You attack the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name
    health -= monsters[fighting].level
    monsterHealth = monsterHealth - weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if( health <= 0)
    {
        lose()
    }else if(monsterHealth <= 0){
        if(fighting === 2){
            winGame();
        }else{
            defeatMonster();
        }
  
    }

}

function winGame() {
    update(locations[6])
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7)
    xp += monsters[fighting].level
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose() {
    update(locations[5])
}

function start() {
 xp = 0;
 health = 100;
 gold = 50;
 currentWeapon = 0;
 goldText.innerText = gold;
 healthText.innerText = health;
 inventory = ["stick"];
 xpText.innerText = xp;
 goTown();
}