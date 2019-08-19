// Soldier
function Soldier(health, strength) {
  this.health = health;
  this.strength = strength;
}

Soldier.prototype.attack = function() {
  return this.strength;
};

Soldier.prototype.receiveDamage = function(damage) {
  this.health -= damage;
};

// Viking
function Viking(name, health, strength) {
  Soldier.call(this, health, strength);
  this.name = name;
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function(damage) {
  this.health -= damage;

  if (this.health > 0) {
    return this.name + " has received " + damage + " points of damage";
  } else {
    return this.name + " has died in act of combat";
  }
};

Viking.prototype.battleCry = function() {
  return "Odin Owns You All!";
};

// Saxon
function Saxon(health, strength) {
  Soldier.call(this, health, strength);
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function(damage) {
  this.health -= damage;

  if (this.health > 0) {
    return "A Saxon has received " + damage + " points of damage";
  } else {
    return "A Saxon has died in combat";
  }
};

// War
function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];
}

War.prototype.addViking = function(Viking) {
  this.vikingArmy.push(Viking);
};

War.prototype.addSaxon = function(Saxon) {
  this.saxonArmy.push(Saxon);
};

War.prototype.vikingAttack = function() {
  //find random saxon
  let randomSaxon = this.saxonArmy[
    Math.floor(Math.random() * this.saxonArmy.length)
  ];

  //find random viking
  let randomViking = this.vikingArmy[
    Math.floor(Math.random() * this.vikingArmy.length)
  ];
  let vikingAttack = randomSaxon.receiveDamage(randomViking.strength);

  //identifying the dead saxon
  if (randomSaxon.health <= 0) {
    let saxonNumber = this.saxonArmy.indexOf(randomSaxon);
    this.saxonArmy.splice(saxonNumber, 1); //Removing the dead saxon
  }
  return vikingAttack;
};

War.prototype.saxonAttack = function() {
  let randomSaxon = this.saxonArmy[
    Math.floor(Math.random() * this.saxonArmy.length)
  ];
  let randomViking = this.vikingArmy[
    Math.floor(Math.random() * this.vikingArmy.length)
  ];
  let saxonAttack = randomViking.receiveDamage(randomSaxon.strength);

  //identifying the dead viking

  if (randomViking.health <= 0) {
    let vikingNumber = this.vikingArmy.indexOf(randomViking);
    this.vikingArmy.splice(vikingNumber, 1); //Removing the dead viking
  }
  return saxonAttack;
};
War.prototype.showStatus = function() {
  if (this.saxonArmy.length === 0) {
    return "Vikings have won the war of the century!";
  } else if (this.vikingArmy.length === 0) {
    return "Saxons have fought for their lives and survive another day...";
  } else if (this.saxonArmy.length >= 1 && this.vikingArmy.length >= 1) {
    return "Vikings and Saxons are still in the thick of battle.";
  }
};
