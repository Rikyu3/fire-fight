enchant();

window.onload = function() {
  var game = new Game(320,320);
  game.fps = 20;
  var width = 320;
  var height = 320;
  var forward = 'right';
  var cell = 32;
  var labelX = 207;
  var knightInitHp = 100;
  var kakusu = 360;
  var tairyoku = 500;
  var sound1;

  // 画像のpreload
  game.preload([
    "end.png",
    "map0.png",
    "map1.png",
    "map1.gif",
    "map2.png",
    "icon0.png",
    "chara0.gif",
    "chara1.png",
    "chara5.png",
    "chara6.png",
    "chara7.png",
    "pad.png",
    "button.png",
    "Dragon.gif"
  ]);

　// SE,BGMのpreload
  game.preload([
    'beam.mp3',
    'kowai.mp3',
    'music.mp3',
    'music2.mp3',
    'sword.mp3',
    'sword2.mp3',
    'sword3.mp3',
    'break.mp3',
    'break2.mp3',
    'hikari.mp3',
    'rikyu.mp3',
    'bakuhatsu.mp3',
    'failed.mp3'
  ]);

  game.onload = function() {

    sound1 = game.assets['music2.mp3'];
    sound1.play();
    //console.log(location.protocol);
    if(location.protocol === "file:") {
        sound1._element.loop = true;
    } else {
        sound1.src.loop = true;
    }

    var map = new Map(16,16);
    map.image=game.assets["map1.gif"];

    premapArray= [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]

    mapArray = [
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
      [322,322,322,322,322,322,322,322,322,140,141,141,141,141,141,141,141,141,141,142],
      [322,322,322,322,322,322,322,322,322,143,184,185,185,185,185,185,185,185,186,143],
      [322,322,322,322,322,322,322,322,322,421,204,205,205,205,205,205,205,205,206,143],
      [322,322,322,322,322,322,322,322,322,421,204,205,205,205,205,205,205,205,206,143],
      [322,322,322,322,322,322,322,322,322,421,204,205,205,205,205,205,205,205,206,143],
      [322,322,322,322,322,322,322,322,322,143,224,225,225,225,225,225,225,225,226,143],
      [322,322,322,322,322,322,322,322,322,140,141,141,141,141,141,141,141,141,141,142],
      [322,322,322,322,322,322,322,322,322,322,322,322,139,140,140,140,140,140,141,142]

    ]

      map.loadData(premapArray,mapArray);

      map.collisionData =[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1]
      ]

      game.rootScene.addChild(map);

      var map2 = new Map(16, 16);

      map2.image=game.assets["map1.png"];

      mapArray2 = [
          [194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194],
          [194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194],
          [194,194,195,195,194,194,194,194,211,212,212,212,212,213,194,194,194,194,194,194],
          [194,194,194,194,194,194,194,194,227,228,228,228,228,229,194,194,194,194,194,194],
          [194,194,194,194,194,194,194,194,243,244,244,244,244,245,194,194,194,211,212,213],
          [194,194,211,212,213,194,194,194,194,194,194,194,194,194,194,194,194,227,228,229],
          [194,194,227,228,229,194,194,194,194,194,194,194,194,194,194,194,194,227,228,229],
          [194,194,227,228,229,194,194,194,194,194,194,194,194,194,194,194,194,227,228,229],
          [194,194,227,228,229,194,194,194,194,194,194,194,194,194,194,194,194,243,244,245],
          [194,194,243,244,245,194,194,194,194,194,194,211,212,213,194,194,194,194,194,194],
          [194,195,194,194,194,194,194,194,194,194,195,227,228,229,194,194,194,194,194,194,194],
          [194,194,194,194,194,194,194,194,194,194,194,227,228,229,194,194,195,194,194,194],
          [194,194,194,194,194,194,194,194,194,194,194,227,228,229,194,194,194,194,194,194,194],
          [194,194,194,211,212,213,194,194,194,194,194,227,228,229,194,194,194,194,194,194,194],
          [194,194,194,227,228,229,194,194,194,194,194,227,228,229,194,194,194,194,194,194,194],
          [194,194,194,243,244,245,194,194,194,194,194,243,244,245,194,194,194,194,194,194],
          [194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194],
          [194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194,194],
          [194,194,194,194,211,212,213,194,194,194,194,194,194,194,194,194,194,194,195,195],
          [194,194,194,194,227,228,229,194,194,194,194,194,194,194,194,194,194,194,195,195],
          [194,194,194,195,243,244,245,194,194,194,195,194,194,194,194,194,194,194,195,195],
        ]

        map2.loadData(mapArray2);
        map2.collisionData = [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1],
          [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
          [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
          [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
          [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
          [0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
          [0,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
          [0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
          [0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
          [0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
          [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1]
        ]

        mapArray3 = [

        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
      ]

      var map4 = new Map(16, 16);

      map4.image=game.assets["map1.png"];

      mapArray4 = [

        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]

      //game.rootScene.addChild(map);

      var map5 = new Map(16, 16);

      map5.image=game.assets["map1.gif"];

      mapArray5 = [

        [106,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],
        [146,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322]

      ]

      map5.loadData(mapArray5);
      map5.collisionData = [
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]

      // バーチャルキーパッドを生成
	    var pad = new Pad();
	    pad.moveTo(13, 248);
	    game.rootScene.addChild(pad);
      pad.scale(0.5,0.5);

      var button = new Sprite(50, 50);
      button.image = game.assets["button.png"];
      button.x = 95;
      button.y = 270;
      button.buttonMode = "A";
      game.rootScene.addChild(button);

      end = new Sprite(189, 97);
      end.image = game.assets["end.png"];
      end.x = (game.width-end.width)/2;
      end.y = (game.height-end.height)/2;
      game.rootScene.addChild(end);
      end.visible = false;  //プレイヤーを非表示にする




      // 文字表示
      knightHp = new Label();
      knightHp.font = "10px gothic";
      knightHp.text = "knight hp " + knightInitHp;
      knightHp.x = labelX;
      knightHp.y = 20;
      game.rootScene.addChild(knightHp);
      knightHp.color = "red";		// 色を変更

      knight = new Sprite(32, 32);
      knight.image = game.assets["chara5.png"];
      knight.x = 0;
      knight.y = 0;
      knight.frame = 18;
      knight.speed = 4;
      knight.hp = knightInitHp;
      game.rootScene.addChild(knight);
      game.keybind(13, 'enter');
      knight.addEventListener("enterframe", function(){
        var sword = 13;
          /**
          左はしは０、右はしはwidth
          上はしは０、下はしはheight
          */
        if(this.hp === 0){
          sound1 = game.assets['music2.mp3'];
          sound1.stop();
          this.visible = false;  //プレイヤーを非表示にする
          end.visible = true;  //ゲームオーバー
          sound7 = game.assets['failed.mp3'].play();
          sound7.play();
          end.backgroundColor = 'black';
          knight.x = 1;
          knight.y = 1;
          game.rootScene.removeChild(kaidan)
          game.rootScene.removeChild(yuka)
          game.rootScene.removeChild(aitem1)
          game.rootScene.removeChild(aitem2)
          game.rootScene.removeChild(darkknight)
          game.rootScene.removeChild(slime2)
          game.rootScene.removeChild(slime)
          game.rootScene.removeChild(darkknight2)
        }
        if (game.input.right) {
          this.frame = 22;
          if((map.hitTest(this.x + cell - 8 , this.y + cell - 8) == false)&&
              (map.hitTest(this.x + cell - 8 , this.y + cell - 25) == false)&&
              (map.hitTest(this.x + cell - 8 , this.y + cell - 16) == false)){
              if(this.x < height -32 ){
                this.x += this.speed;
                this.frame = 18 + this.age %3;
                forward = 'right';
              }
            }
          } else if (game.input.left) {
            this.frame = 11;
            if((map.hitTest(this.x - this.speed , this.y + cell - 8) == false)&&
              (map.hitTest(this.x - this.speed  , this.y + cell - 25) == false)&&
              (map.hitTest(this.x - this.speed  , this.y + cell - 16) == false)){
              if (this.x >= 0){
                this.x -= this.speed;
                this.frame = 9 + this.age %3;
                forward = 'left';
              }
            }
          }
          //else if( (game.input.down) &&
          //(map.hitTest(this.x + cell / 2, this.y + cell ) == false) ){}
          else if (game.input.down){
            this.frame = 0;
            //if(map.hitTest(this.x - cell / 2, this.y + cell ) == false){}
            if((map.hitTest(this.x + 8, this.y + cell ) == false)&&
               (map.hitTest(this.x + cell / 2, this.y + cell ) == false)){
              if(this.y < height -32 ){
                this.y += this.speed;
                this.frame = 0 + this.age %3;
                forward ='down';
              }
            }
          }
          else if (game.input.up) {
            this.frame = 28;
            if((map.hitTest(this.x + 8, this.y  - this.speed ) == false)&&
              (map.hitTest(this.x + cell / 2, this.y  - this.speed ) == false)){
              if(this.y > 0){
                this.y -= this.speed;
                this.frame = 30 + this.age %3;
                forward = 'up';
              }
            }
          }

        // 攻撃部分
        if (game.input.enter || game.input.A){
          if(forward == 'right'){
            this.frame = 23 + this.age %4;
          }else if(forward == 'left'){
            this.frame = 14 + this.age %4;
          }else if(forward == 'down'){
            this.frame = 5 + this.age %4;
          }else if (forward == 'up') {
           this.frame = 32 + this.age %4;
          }
          var sound3 = game.assets['sword2.mp3'].clone();
          sound3.play();
        }
      });

      // 文字表示
      slimehp = new Label();
      slimehp.font = "10px gothic";
      slimehp.text = "slime green hp 70";
      slimehp.x = labelX;
      slimehp.y = 35;
      game.rootScene.addChild(slimehp);
      slimehp.color = "red";		// 色を変更


      var slime = new Sprite(32,32);
      slime.image = game.assets["chara6.png"];
      slime.x = 1;
      slime.y = 290;
      slime.hp = 70;
      game.rootScene.addChild(slime);
      slime.addEventListener("enterframe", function() {
        var dx = 0;
        var dy = 0;
        this.frame = 0 + this.age %3;
        if (this.age % 18 == 0) {
          var d = Math.floor(Math.random()*4 );
          if (d==0){
           dy = -16;
         }else if (d==1){
            dx = 16;
          }else if (d==2){
            dy = 16;
          }else if (d==3){
             dx = -16;
          }
          var x = this.x + dx;
          var y = this.y + dy;
          var _x = this.x + (dx ? dx / Math.abs(dx) * (cell / 2) : 0) + (cell / 2);
          var _y = this.y + (dy ? dy / Math.abs(dy) * (cell / 2) : 0) + (cell / 2);
          if (x<(width-cell) && y<(height-cell) && x>0 && y>0 && !map.hitTest(_x,_y)){
            this.x = x;
            this.y = y;
          }
        }
        if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
            if(game.input.enter){
              var sound6 = game.assets['sword3.mp3'].clone();
              sound6.play();
              if(this.hp == 0){
                this.visible = false;  //プレイヤーを非表示にする
                this.x = kakusu;
                this.y = kakusu;
                var sound4 = game.assets['break.mp3'].clone();
                sound4.play();
              }
              if(this.hp>0){
                this.hp = this.hp -1;
                slimehp.text = "slime hp  " + slime.hp;
                if(this.hp % 5 == 0){
                  if(knight.hp>0){
                    knight.hp = knight.hp -1;
                    knightHp.text = "knighthp " + knight.hp;
                  }
              }
            }
          }
        }
      });
      var kaidan = new Sprite(16,16);
      kaidan.image = game.assets["map0.png"];
      kaidan.frame = 14;
      kaidan.x = 302;
      kaidan.y = 1;
      game.rootScene.addChild(kaidan);
      kaidan.addEventListener("enterframe", function() {
        if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
          sound1.stop();
          sound1 = game.assets['kowai.mp3'];
          sound1.play();
          map.collisionData = map2.collisionData
          game.rootScene.addChild(yuka)
          game.rootScene.addChild(pad);
          game.rootScene.addChild(button);
          game.rootScene.insertBefore(map2,knightHp);
          game.rootScene.removeChild(kaidan)
          game.rootScene.removeChild(map)
          game.rootScene.removeChild(mitchi)
          game.rootScene.removeChild(megami)
          //game.rootScene.removeChild(slime4)
          //game.rootScene.removeChild(slime)
          //game.rootScene.removeChild(slime2)
          //game.rootScene.removeChild(darkknight)
          //game.rootScene.removeChild(slimehp)
          //game.rootScene.removeChild(slimeredhp)
          //game.rootScene.removeChild(darkknighthp)
          //game.rootScene.removeChild(aitem1)
          //game.rootScene.removeChild(aitem2)
          //game.rootScene.removeChild(mitchi)
          //game.rootScene.removeChild(megami)
          //game.rrotScene.removeChild(yuka)
          //game.rootScene.removeChild(kaidan2)
          //game.rootScene.removeChild(pad.png)
          slime.x = 1;
          slime.y = 1;
          slime2.x = 1;
          slime2.y = 240;
          darkknight.x = 120;
          darkknight.y = 240;
        }
      });




      // 文字表示
      slime2hp = new Label();
      slime2hp.font = "10px gothic";
      slime2hp.text = "slime red hp 120";
      slime2hp.x = labelX;
      slime2hp.y = 51;
      game.rootScene.addChild(slime2hp);
      slime2hp.color = "red";		// 色を変更

        var slime2 = new Sprite(32,32);
        slime2.image = game.assets["chara6.png"];
        slime2.x = 80;
        slime2.y = 80;
        slime2.hp = 120;
        game.rootScene.addChild(slime2);
        slime2.addEventListener("enterframe", function() {
          var dx = 0;
          var dy = 0;
          this.frame = 3 + this.age %3;
          if (this.age % 16 == 0) {
            var d = Math.floor(Math.random()*4 );
            if (d==0){
               dy = -16;
            }else if (d==1){
              dx = 16;
            }else if (d==2){
              dy = 16;
            }else if (d==3){
               dx = -16;
            }

            var x = this.x + dx;
            var y = this.y + dy;
            var _x = this.x + (dx ? dx / Math.abs(dx) * (cell / 2) : 0) + (cell / 2);
            var _y = this.y + (dy ? dy / Math.abs(dy) * (cell / 2) : 0) + (cell / 2);
            if (x<(width-cell) && y<(height-cell) && x>0 && y>0 && !map.hitTest(_x,_y)){
              this.x = x;
              this.y = y;
            }
          }

          if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
              if(game.input.enter){
                var sound6 = game.assets['sword3.mp3'].clone();
                sound6.play();
                if(this.hp == 0){
                  this.visible = false;  //プレイヤーを非表示にする
                  this.x = kakusu;
                  this.y = kakusu;
                  var sound4 = game.assets['break.mp3'].clone();
                  sound4.play();
                }
                if(this.hp>0){
                  this.hp = this.hp -1;
                  slime2hp.text = "slime2 hp  " + slime2.hp;
                  if(this.hp % 5 == 0){
                    if(knight.hp>0){
                      knight.hp = knight.hp -1;
                      knightHp.text = "knight hp " + knight.hp;
                    }
                }
              }
            }
          }
        });

        // 文字表示
        darkknighthp = new Label();
        darkknighthp.font = "10px gothic";
        darkknighthp.text = "dark knight hp 200";
        darkknighthp.x = labelX;
        darkknighthp.y = 67;
        game.rootScene.addChild(darkknighthp);
        darkknighthp.color = "red";		// 色を変更


        var darkknight = new Sprite(32,32);
        darkknight.image = game.assets["chara7.png"];
        darkknight.x = 55;
        darkknight.y = 55;
        darkknight.hp = 200;
        game.rootScene.addChild(darkknight);
        darkknight.addEventListener("enterframe", function() {
          var dx = 0;
          var dy = 0;
          this.frame = 3 + this.age %3;
          if (this.age % 14 == 0) {
            var d = Math.floor(Math.random()*4 );
            if (d==0){
               dy = -16;
            }else if (d==1){
              dx = 16;
            }else if (d==2){
              dy = 16;
            }else if (d==3){
               dx = -16;
            }

            var x = this.x + dx;
            var y = this.y + dy;
            var _x = this.x + (dx ? dx / Math.abs(dx) * (cell / 2) : 0) + (cell / 2);
            var _y = this.y + (dy ? dy / Math.abs(dy) * (cell / 2) : 0) + (cell / 2);
            if (x<(width-cell) && y<(height-cell) && x>0 && y>0 && !map.hitTest(_x,_y)){
              this.x = x;
              this.y = y;
            }
          }

          if(this.intersect(knight)){ 　//プレイヤーが敵と衝突しているかを判定
              if(game.input.enter){
                var sound6 = game.assets['sword3.mp3'].clone();
                sound6.play();
                if(this.hp == 0){
                  this.visible = false;　//プレイヤーを非表示にする　
                  this.x = kakusu;
                  this.y = kakusu;
                  var sound5 = game.assets['break2.mp3'].clone();
                  sound5.play();
                }
                if(this.hp>0){
                  this.hp = this.hp -1;
                  darkknighthp.text = "darkknight hp  " + darkknight.hp;
                  if(this.hp % 5 == 0){
                    if(knight.hp>0){
                      knight.hp = knight.hp -1;
                      knightHp.text = "knight hp " + knight.hp;
                    }
                }
                }
              }
          }
        });


        var darkknight2 = new Sprite(32,32);
        darkknight2.image = game.assets["chara7.png"];
        darkknight2.x = 290;
        darkknight2.y = 156;
        darkknight2.hp = 250;
        game.rootScene.addChild(darkknight2);
        darkknight2.addEventListener("enterframe", function() {
          if(this.intersect(knight)){ 　//プレイヤーが敵と衝突しているかを判定
              if(game.input.enter){
                var sound6 = game.assets['sword3.mp3'].clone();
                sound6.play();
                if(this.hp == 0){
                  this.visible = false;　//プレイヤーを非表示にする　
                  this.x = kakusu;
                  this.y = kakusu;
                  var sound5 = game.assets['break2.mp3'].clone();
                  sound5.play();
                  kaidan.x = 32;
                  kaidan.y = 211;
                }
                if(this.hp>0){
                  this.hp = this.hp -1;
                  if(this.hp % 5 == 0){
                    if(knight.hp>0){
                      knight.hp = knight.hp -1;
                      knightHp.text = "knight hp " + knight.hp;
                    }
                }
                }
              }
          }
        });


        var Dragon = new Sprite(86,86);
        Dragon.image = game.assets["Dragon.gif"];
        Dragon.x = 20;
        Dragon.y = 200;
        Dragon.hp = 444;
        Dragon.frame = 15;
        game.rootScene.addChild(Dragon);
        Dragon.addEventListener("enterframe", function() {
          if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
              if(game.input.enter){
                if(this.hp == 0){
                  this.visible = false;  //プレイヤーを非表示にする
                  this.x = kakusu;
                  this.y = kakusu;
                }
                if(this.hp>0){
                  this.hp = this.hp -1;
                  Dragon.hp.text = "Dragon hp " + Dragon.hp;
                  if(Dragon.hp % 5 == 0){
                    if(knight.hp>0){
                      knight.hp = knight.hp -1;
                      knightHp.text = "knighthp " + knight.hp;
                    }
                }
              }
            }
          }
        });


        var aitem1 = new Sprite(16,16);
        aitem1.image = game.assets["icon0.png"];
        aitem1.x = 100;
        aitem1.y = 100;
        aitem1.hp = tairyoku;
        aitem1.frame = 11;
        game.rootScene.addChild(aitem1);
        aitem1.addEventListener("enterframe", function() {
          //  もし、いまいるブロックが19なら、再生する
           if(this.intersect(knight)) {  //プレイヤーが敵と衝突しているかを判定
                 if(this.hp == 0){
                   game.assets['beam.mp3'].stop();
                   sound1 = game.assets['bakuhatsu.mp3'];
                   sound1.play();
                   this.visible = false;  //プレイヤーを非表示にする
                   this.x = kakusu;
                   this.y = kakusu;
                 }
                 if(this.hp>0){
                    game.assets['beam.mp3'].play();
                   this.hp = this.hp -1;
          //         aitem1hp.text = "aitem1hp hp  " + aitem1hp.hp;
                    if(knight.hp>0){
                       knight.hp = knight.hp -1;
                       knightHp.text = "knight hp " + knight.hp;
                     }
                     if(this.hp === 0){
                       aitem1.visible = false;  //プレイヤーを非表示にする
                       sound1.stop();
                     }
             }
           }
        });

        var aitem2 = new Sprite(16,16);
        aitem2.image = game.assets["icon0.png"];
        aitem2.x = 64;
        aitem2.y = 85;
        aitem2.hp = tairyoku;
        aitem2.frame = 11;
        game.rootScene.addChild(aitem2);
        aitem2.addEventListener("enterframe", function() {
           if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
                 if(this.hp == 0){
                   sound1 = game.assets['bakuhatsu.mp3'];
                   sound1.play();
                   this.visible = false;  //プレイヤーを非表示にする
                   this.x = kakusu;
                   this.y = kakusu;
                 }
                 if(this.hp>0){
                   var sound3 = game.assets['beam.mp3'].play();
                   this.hp = this.hp -1;
          //         aitem1hp.text = "aitem1hp hp  " + aitem1hp.hp;
                    if(knight.hp>0){
                       knight.hp = knight.hp -1;
                       knightHp.text = "knight hp " + knight.hp;
                     }
                     if(this.hp === 0){
                       aitem2.visible = false;  //プレイヤーを非表示にする
                       sound1.stop();
                     }
             }
           }
        });

        var mitchi = new Sprite(16,16);
        mitchi.image = game.assets["map1.gif"];
        mitchi.x = 160;
        mitchi.y = 260;
        mitchi.frame = 204;
        game.rootScene.addChild(mitchi);
        mitchi.addEventListener("enterframe", function() {
          if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
            sound1.stop();
            sound2 = game.assets['hikari.mp3'];
            sound2.play();
            game.rootScene.addChild(megami);
            knight.image = game.assets["chara1.png"];
            knight.frame = 0;
            if(knight.hp == 0){
              knight.visible = false;  //プレイヤーを非表示にする
              end.visible = true;  //ゲームオーバー
            }
            if (game.input.right) {
              knight.frame = 0;
              if((map.hitTest(knight.x + cell - 8 , knight.y + cell - 8) == false)&&
                  (map.hitTest(knight.x + cell - 8 , knight.y + cell - 25) == false)&&
                  (map.hitTest(knight.x + cell - 8 , knight.y + cell - 16) == false)){
                  if(knight.x < height -32 ){
                    knight.x += knight.speed;
                    knight.frame = 0 + knight.age %3;
                    forward = 'right';
                  }
                }
              } else if (game.input.left) {
                knight.frame = 0;
                if((map.hitTest(knight.x - knight.speed , knight.y + cell - 8) == false)&&
                  (map.hitTest(knight.x - knight.speed  , knight.y + cell - 25) == false)&&
                  (map.hitTest(knight.x - knight.speed  , knight.y + cell - 16) == false)){
                  if (knight.x >= 0){
                    knight.x -= knight.speed;
                    knight.frame = 0 + knight.age %3;
                    forward = 'left';
                  }
                }
              }
              //else if( (game.input.down) &&
              //(map.hitTest(this.x + cell / 2, this.y + cell ) == false) ){}
              else if (game.input.down){
                knight.frame = 0;
                //if(map.hitTest(this.x - cell / 2, this.y + cell ) == false){}
                if((map.hitTest(knight.x + 8, knight.y + cell ) == false)&&
                   (map.hitTest(knight.x + cell / 2, knight.y + cell ) == false)){
                  if(knight.y < height -32 ){
                    knight.y += knight.speed;
                    knight.frame = 0 + knight.age %3;
                    forward ='down';
                  }
                }
              }
              else if (game.input.up) {
                knight.frame = 0;
                if((map.hitTest(knight.x + 8, knight.y  - knight.speed ) == false)&&
                  (map.hitTest(knight.x + cell / 2, knight.y  - knight.speed ) == false)){
                  if(knight.y > 0){
                    knight.y -= knight.speed;
                    knight.frame = 30 + knight.age %3;
                    forward = 'up';
                  }
                }
              }
          }
        });

        var megami = new Sprite(32,32);
        megami.image = game.assets["chara0.gif"];
        megami.x = 260;
        megami.y = 245;
        megami.frame = 16;

       var yuka = new Sprite(16,16);
       yuka.image = game.assets["map1.gif"];
       yuka.frame = 501;
       yuka.x = 2;
       yuka.y = 300;
       game.rootScene.addChild(yuka)
       yuka.addEventListener("enterframe", function() {
         if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
           sound1.stop();
           sound1 = game.assets['rikyu.mp3'];
           sound1.play();
           map.collisionData = map5.collisionData
           game.rootScene.addChild(kaidan)
           game.rootScene.addChild(pad);
           game.rootScene.addChild(button);
           game.rootScene.insertBefore(map5,knightHp);
           game.rootScene.removeChild(yuka)
           //game.rootScene.removeChild(kaidan)
           game.rootScene.removeChild(map)
           game.rootScene.removeChild(mitchi)
           game.rootScene.removeChild(megami)
           //game.rootScene.removeChild(slime4)
           //game.rootScene.removeChild(slime)
           //game.rootScene.removeChild(slime2)
           //game.rootScene.removeChild(darkknight)
           //game.rootScene.removeChild(slimehp)
           //game.rootScene.removeChild(slimeredhp)
           //game.rootScene.removeChild(darkknighthp)
           game.rootScene.removeChild(aitem1)
           game.rootScene.removeChild(aitem2)
           //game.rootScene.removeChild(mitchi)
           //game.rootScene.removeChild(megami)
           //game.rrotScene.removeChild(yuka)
           //game.rootScene.removeChild(kaidan2)
           //game.rootScene.removeChild(pad.png)
           kaidan.x = 300;
           kaidan.y = 300;
           knight.x = 10;
           knight.y = 280;
         }
       });


    };
    game.start();
};
