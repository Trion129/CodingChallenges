"use strict";

var weapons = ["Stick", "Axe", "Sword", "Thunder Sword", "Elite Sword"],
    height = 600,
    width = 600,
    vHeight = 5,
    vWidth = 5,
    playerX = height / 2,
    playerY = width / 2,
    i = 0,
    j = 0,
    gen = 0,
    View = [],
    curHold = 0,
    gameArea = [],
    lowerboundY = 0,
    upperboundY = 0,
    upperboundX = 0,
    lowerboundX = 0,
    temp = 0,
    temp2,
    stone = function stone() {
  this.id = "stone";
},
    tile = function tile() {
  this.id = "tile";
},
    player = function player() {
  this.id = "player";
  this.health = 100;
  this.weapon = 0;
  this.xp = 0;
  this.lvl = 1;
},
    easyEnemy = function easyEnemy() {
  this.id = "easy";
  this.health = 100;
  this.attack = 5;
  this.inHealth = 100;
},
    hardEnemy = function hardEnemy() {
  this.id = "hard";
  this.health = 300;
  this.attack = 20;
  this.inHealth = 300;
},
    upgrade = function upgrade() {
  this.id = "upgrade";
},
    gener = 0;

function genGame() {
  gameArea = [];
  for (i = 0; i <= height; i++) {
    gameArea.push([]);
    for (j = 0; j <= width; j++) {
      gener = Math.floor(Math.random() * (300 + 1)) + 0;
      if (gener < 200) {
        gameArea[i].push(new stone());
      } else if (gener <= 280) {
        gameArea[i].push(new tile());
      } else if (gener <= 290) {
        gameArea[i].push(new easyEnemy());
      } else if (gener <= 299) {
        gameArea[i].push(new hardEnemy());
      } else {
        gameArea[i].push(new upgrade());
      }
    }
  }
}

genGame();
temp = new stone();
gameArea[playerY][playerX] = new player();

function wonGame() {
  $(".message.win").show().delay(3000).fadeOut();
  genGame();
  temp = new stone();
  gameArea[playerY][playerX] = new player();
  updatePlayer();
  updateView();
}

function lostGame() {
  $(".message.lose").show().delay(3000).fadeOut();
  genGame();
  temp = new stone();
  gameArea[playerY][playerX] = new player();
  updatePlayer();
  updateView();
}

function updateView() {
  View = [];
  lowerboundY = playerY - vHeight < 0 ? 0 : playerY - vHeight;
  upperboundY = playerY + vHeight > height ? height : playerY + vHeight;
  lowerboundX = playerX - vWidth < 0 ? 0 : playerX - vWidth;
  upperboundX = playerX + vWidth > width ? width : playerX + vWidth;
  for (i = lowerboundY, curHold = 0; i <= upperboundY; i++, curHold++) {
    View.push([]);
    for (j = lowerboundX; j <= upperboundX; j++) {
      View[curHold].push(gameArea[i][j]);
    }
  }
  ReactDOM.render(React.createElement(ViewArea, { view: View }), document.getElementById("app"));
}

var PlayerInfo = React.createClass({
  displayName: "PlayerInfo",

  render: function render() {
    if (weapons[this.props.player.weapon] == undefined) {
      curHold = "Dank Memes";
    } else {
      curHold = weapons[this.props.player.weapon];
    }
    return React.createElement(
      "div",
      { className: "playerinfo" },
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          { className: "text-inline" },
          "Health:",
          React.createElement(
            "span",
            { id: "health" },
            this.props.player.health
          )
        ),
        React.createElement(
          "li",
          { className: "text-inline" },
          "Weapon:",
          React.createElement(
            "span",
            { id: "weapon" },
            curHold
          )
        ),
        React.createElement(
          "li",
          { className: "text-inline" },
          "XP:",
          React.createElement(
            "span",
            { id: "xp" },
            this.props.player.xp
          )
        ),
        React.createElement(
          "li",
          { className: "text-inline" },
          "Level:",
          React.createElement(
            "span",
            { id: "level" },
            this.props.player.lvl
          )
        )
      )
    );
  }
});
var ViewArea = React.createClass({
  displayName: "ViewArea",

  render: function render() {
    var rows = this.props.view.map(function (row, temp) {
      return React.createElement(Row, { key: temp, rowNo: temp, data: row });
    });
    return React.createElement(
      "div",
      null,
      rows
    );
  }
});
var Row = React.createClass({
  displayName: "Row",

  render: function render() {
    var cells = this.props.data.map(function (cell, temp) {
      return React.createElement(Cell, {
        key: temp,
        rowNo: this.props.rowNo,
        cellNo: temp,
        data: cell
      });
    }.bind(this));
    return React.createElement(
      "div",
      null,
      cells
    );
  }
});
var Cell = React.createClass({
  displayName: "Cell",

  render: function render() {
    if (this.props.data.id == "stone") {
      return React.createElement("div", { className: "cell stone" });
    } else if (this.props.data.id == "tile") {
      return React.createElement("div", { className: "cell tile" });
    } else if (this.props.data.id == "easy") {
      return React.createElement("div", { className: "cell easyEnemy" });
    } else if (this.props.data.id == "upgrade") {
      return React.createElement("div", { className: "cell upgrade" });
    } else if (this.props.data.id == "hard") {
      return React.createElement("div", { className: "cell hardEnemy" });
    } else if (this.props.data.id == "player") {
      return React.createElement("div", { className: "cell player" });
    } else {
      return React.createElement("div", { className: "cell void" });
    }
  }
});

function makeMove(l) {
  switch (l) {
    case "up":
      temp2 = gameArea[playerY][playerX];
      gameArea[playerY][playerX] = temp;
      playerY = playerY - 1;
      temp = gameArea[playerY][playerX];
      gameArea[playerY][playerX] = temp2;
      updateView();
      break;
    case "down":
      temp2 = gameArea[playerY][playerX];
      gameArea[playerY][playerX] = temp;
      playerY = playerY + 1;
      temp = gameArea[playerY][playerX];
      gameArea[playerY][playerX] = temp2;
      updateView();
      break;
    case "left":
      temp2 = gameArea[playerY][playerX];
      gameArea[playerY][playerX] = temp;
      playerX = playerX - 1;
      temp = gameArea[playerY][playerX];
      gameArea[playerY][playerX] = temp2;
      updateView();
      break;
    case "right":
      temp2 = gameArea[playerY][playerX];
      gameArea[playerY][playerX] = temp;
      playerX = playerX + 1;
      temp = gameArea[playerY][playerX];
      gameArea[playerY][playerX] = temp2;
      updateView();
      break;
  }
}

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  e.preventDefault();
  if (e.keyCode == '38') {
    if (gameArea[playerY - 1] !== undefined) {
      if (gameArea[playerY - 1][playerX].id == "stone") {
        makeMove("up");
      } else if (gameArea[playerY - 1][playerX].id == "easy" || gameArea[playerY - 1][playerX].id == "hard") {
        gameArea[playerY - 1][playerX].health -= (20 + gameArea[playerY][playerX].weapon * 20) * gameArea[playerY][playerX].lvl + Math.floor(gameArea[playerY][playerX].xp / 100);
        gameArea[playerY][playerX].xp += gameArea[playerY - 1][playerX].inHealth / 2;
        gameArea[playerY][playerX].health -= gameArea[playerY - 1][playerX].attack;
        updatePlayer();
        if (gameArea[playerY - 1][playerX].health <= 0) {
          gameArea[playerY - 1][playerX] = new stone();
          updateView();
        }

        if (gameArea[playerY][playerX].health <= 0) {
          lostGame();
        }
      } else if (gameArea[playerY - 1][playerX].id == "upgrade") {
        gameArea[playerY][playerX].lvl += 1;
        gameArea[playerY][playerX].weapon += 1;
        gameArea[playerY][playerX].health = 100;
        gameArea[playerY - 1][playerX] = new stone();
        makeMove("up");
        updatePlayer();
      }
    }
  } else if (e.keyCode == '40') {
    if (gameArea[playerY + 1] !== undefined) {
      if (gameArea[playerY + 1][playerX].id == "stone") {
        makeMove("down");
      } else if (gameArea[playerY + 1][playerX].id == "easy" || gameArea[playerY + 1][playerX].id == "hard") {
        gameArea[playerY + 1][playerX].health -= (20 + gameArea[playerY][playerX].weapon * 20) * gameArea[playerY][playerX].lvl + Math.floor(gameArea[playerY][playerX].xp / 100);
        gameArea[playerY][playerX].xp += gameArea[playerY + 1][playerX].inHealth / 2;
        gameArea[playerY][playerX].health -= gameArea[playerY + 1][playerX].attack;
        updatePlayer();
        if (gameArea[playerY + 1][playerX].health <= 0) {
          gameArea[playerY + 1][playerX] = new stone();
          updateView();
        }

        if (gameArea[playerY][playerX].health <= 0) {
          lostGame();
        }
      } else if (gameArea[playerY + 1][playerX].id == "upgrade") {
        gameArea[playerY][playerX].lvl += 1;
        gameArea[playerY][playerX].weapon += 1;
        gameArea[playerY][playerX].health = 100;
        gameArea[playerY + 1][playerX] = new stone();
        makeMove("down");
        updatePlayer();
      }
    }
  } else if (e.keyCode == '37') {
    if (gameArea[playerY][playerX - 1] !== undefined) {
      if (gameArea[playerY][playerX - 1].id == "stone") {
        makeMove("left");
      } else if (gameArea[playerY][playerX - 1].id == "easy" || gameArea[playerY][playerX - 1].id == "hard") {
        gameArea[playerY][playerX - 1].health -= (20 + gameArea[playerY][playerX].weapon * 20) * gameArea[playerY][playerX].lvl + Math.floor(gameArea[playerY][playerX].xp / 100);
        gameArea[playerY][playerX].xp += gameArea[playerY][playerX - 1].inHealth / 2;
        gameArea[playerY][playerX].health -= gameArea[playerY][playerX - 1].attack;
        updatePlayer();
        if (gameArea[playerY][playerX - 1].health <= 0) {
          gameArea[playerY][playerX - 1] = new stone();
          updateView();
        }

        if (gameArea[playerY][playerX].health <= 0) {
          lostGame();
        }
      } else if (gameArea[playerY][playerX - 1].id == "upgrade") {
        gameArea[playerY][playerX].lvl += 1;
        gameArea[playerY][playerX].weapon += 1;
        gameArea[playerY][playerX].health = 100;
        gameArea[playerY][playerX - 1] = new stone();
        makeMove("left");
        updatePlayer();
      }
    }
  } else if (e.keyCode == '39') {
    if (gameArea[playerY][playerX + 1] !== undefined) {
      if (gameArea[playerY][playerX + 1].id == "stone") {
        makeMove("right");
      } else if (gameArea[playerY][playerX + 1].id == "easy" || gameArea[playerY][playerX + 1].id == "hard") {
        gameArea[playerY][playerX + 1].health -= (20 + gameArea[playerY][playerX].weapon * 20) * gameArea[playerY][playerX].lvl + Math.floor(gameArea[playerY][playerX].xp / 100);
        gameArea[playerY][playerX].xp += gameArea[playerY][playerX + 1].inHealth / 2;
        gameArea[playerY][playerX].health -= gameArea[playerY][playerX + 1].attack;
        updatePlayer();
        if (gameArea[playerY][playerX + 1].health <= 0) {
          gameArea[playerY][playerX + 1] = new stone();
          updateView();
        }

        if (gameArea[playerY][playerX].health <= 0) {
          lostGame();
        }
      } else if (gameArea[playerY][playerX + 1].id == "upgrade") {
        gameArea[playerY][playerX].lvl += 1;
        gameArea[playerY][playerX].weapon += 1;
        gameArea[playerY][playerX].health = 100;
        gameArea[playerY][playerX + 1] = new stone();
        makeMove("right");
        updatePlayer();
      }
    }
  }
}

function updatePlayer() {

  if (gameArea[playerY][playerX].xp >= 3000) {
    wonGame();
  }
  ReactDOM.render(React.createElement(PlayerInfo, { player: gameArea[playerY][playerX] }), document.getElementById("player-info"));
}
updatePlayer();

updateView();