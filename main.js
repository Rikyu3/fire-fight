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
    'failed.mp3',
    'hakai2.mp3',
    'door.mp3'
  ]);

  game.onload = function() {

    sound1 = game.assets['music2.mp3'];
    sound1.play();
    sound1.volume = 0.5;
    //console.log(location.protocol);
    if(location.protocol === "file:") {
        sound1._element.loop = true;
    } else {
        sound1.src.loop = true;
    }

    game.rootScene.removeChild(darkknight2);
    game.rootScene.removeChild(darkknight3);
    game.rootScene.removeChild(darkknight4);
    game.rootScene.removeChild(darkknight5);
    game.rootScene.removeChild(darkknight6);
    game.rootScene.removeChild(darkknight7);
    game.rootScene.removeChild(darkknight8);
    game.rootScene.removeChild(darkknight9);
    game.rootScene.removeChild(darkknight10);
    game.rootScene.removeChild(darkknight11);
    game.rootScene.removeChild(darkknight12);
    game.rootScene.removeChild(darkknight13);

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
        [140,141,141,141,141,142,322,322,322,322,104,105,105,106,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,124,125,125,126,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,124,125,125,126,322,322,322,322,322,322],
        [126,322,322,143,143,143,143,143,322,322,124,125,125,126,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,124,125,125,126,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,124,125,125,126,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,124,125,125,126,322,322,322,322,322,322],
        [126,322,322,322,322,322,322,322,322,322,144,145,145,146,322,322,322,322,322,322],
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
        [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
        [1,0,0,1,1,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]

      var map6 = new Map(16, 16);

      map6.image=game.assets["map0.png"];

      mapArray6 = [

        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0]
      ]

      map6.loadData(mapArray6);
      map6.collisionData = [
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
                this.frame = 27 + this.age %3;
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
          //game.rootScene.removeChild(megami)
          game.rootScene.removeChild(Dragon)
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
          game.rootScene.removeChild(darkknight2)
          game.rootScene.removeChild(darkknight3)
          game.rootScene.removeChild(darkknight4)
          game.rootScene.removeChild(darkknight5)
          game.rootScene.removeChild(darkknight6)
          game.rootScene.removeChild(darkknight7)
          game.rootScene.removeChild(darkknight8)
          game.rootScene.removeChild(darkknight9)
          game.rootScene.removeChild(darkknight10)
          game.rootScene.removeChild(darkknight11)
          game.rootScene.removeChild(darkknight12)
          game.rootScene.removeChild(darkknight13)
          game.rootScene.removeChild(darkknight14)
          game.rootScene.removeChild(darkknight15)
          game.rootScene.removeChild(darkknight16)
          game.rootScene.removeChild(darkknight17)
          game.rootScene.removeChild(darkknight18)
          game.rootScene.removeChild(castle)
          game.rootScene.removeChild(castle2)
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
        darkknight2.x = 146;
        darkknight2.y = 100;

        var darkknight3 = new Sprite(32,32);
        darkknight3.image = game.assets["chara7.png"];
        darkknight3.x = 100;
        darkknight3.y = 100;

        var darkknight4 = new Sprite(32,32);
        darkknight4.image = game.assets["chara5.png"];
        darkknight4.frame = 4;
        darkknight4.x = 178;
        darkknight4.y = 100;

        var darkknight5 = new Sprite(32,32);
        darkknight5.image = game.assets["chara5.png"];
        darkknight5.frame = 4;
        darkknight5.x = 162;
        darkknight5.y = 100;

        var darkknight6 = new Sprite(32,32);
        darkknight6.image = game.assets["chara5.png"];
        darkknight6.frame = 4;
        darkknight6.x = 195;
        darkknight6.y = 100;

        var darkknight7 = new Sprite(32,32);
        darkknight7.image = game.assets["chara5.png"];
        darkknight7.frame = 4;
        darkknight7.x = 84;
        darkknight7.y = 100;

        var darkknight8 = new Sprite(32,32);
        darkknight8.image = game.assets["chara5.png"];
        darkknight8.frame = 4;
        darkknight8.x = 211;
        darkknight8.y = 100;

        var darkknight9 = new Sprite(32,32);
        darkknight9.image = game.assets["chara5.png"];
        darkknight9.frame = 4;
        darkknight9.x = 227;
        darkknight9.y = 100;

        var darkknight10 = new Sprite(32,32);
        darkknight10.image = game.assets["chara5.png"];
        darkknight10.frame = 4;
        darkknight10.x = 243;
        darkknight10.y = 100;

        var darkknight11 = new Sprite(32,32);
        darkknight11.image = game.assets["chara5.png"];
        darkknight11.frame = 4;
        darkknight11.x = 259;
        darkknight11.y = 100;

        var darkknight12 = new Sprite(32,32);
        darkknight12.image = game.assets["chara5.png"];
        darkknight12.frame = 4;
        darkknight12.x = 275;
        darkknight12.y = 100;

        var darkknight13 = new Sprite(32,32);
        darkknight13.image = game.assets["chara5.png"];
        darkknight13.frame = 4;
        darkknight13.x = 291;
        darkknight13.y = 100;

        var darkknight14 = new Sprite(32,32);
        darkknight14.image = game.assets["chara5.png"];
        darkknight14.frame = 4;
        darkknight14.x = 68;
        darkknight14.y = 100;

        var darkknight15 = new Sprite(32,32);
        darkknight15.image = game.assets["chara5.png"];
        darkknight15.frame = 4;
        darkknight15.x = 52;
        darkknight15.y = 100;

        var darkknight16 = new Sprite(32,32);
        darkknight16.image = game.assets["chara5.png"];
        darkknight16.frame = 4;
        darkknight16.x = 36;
        darkknight16.y = 100;

        var darkknight17 = new Sprite(32,32);
        darkknight17.image = game.assets["chara5.png"];
        darkknight17.frame = 4;
        darkknight17.x = 20;
        darkknight17.y = 100;

        var darkknight18 = new Sprite(32,32);
        darkknight18.image = game.assets["chara5.png"];
        darkknight18.frame = 4;
        darkknight18.x = 4;
        darkknight18.y = 100;

        var hito1 = new Sprite(32,32);
        hito1.image = game.assets["chara0.gif"];
        hito1.frame = 19;
        hito1.x = 16;
        hito1.y = 50;

        var hito2 = new Sprite(32,32);
        hito2.image = game.assets["chara0.gif"];
        hito2.frame = 10;
        hito2.x = 38;
        hito2.y = 50;

        var hito3 = new Sprite(32,32);
        hito3.image = game.assets["chara0.gif"];
        hito3.frame = 19;
        hito3.x = 230;
        hito3.y = 230;

        var hito4 = new Sprite(32,32);
        hito4.image = game.assets["chara0.gif"];
        hito4.frame = 10;
        hito4.x = 252;
        hito4.y = 230;


        // 文字表示
        Dragonhp = new Label();
        Dragonhp.font = "10px gothic";
        Dragonhp.text = "Dragonhp hp 444";
        Dragonhp.x = labelX;
        Dragonhp.y = 82;
        //game.rootScene.addChild(Dragonhp);
        Dragonhp.color = "red";		// 色を変更

        var Dragon = new Sprite(80,80);
        Dragon.image = game.assets["Dragon.gif"];
        Dragon.x = 100;
        Dragon.y = 1;
        Dragon.hp = 444;
        //Dragon.frame = 3;
        //Dragon.scale(0.5,0.5);
        Dragon.addEventListener("enterframe", function() {
          var dx = 0;
          var dy = 0;
          this.frame = 2;
          if (this.age % 30 == 0) {
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
                  Dragonhp.text = "Dragon hp " + Dragon.hp;
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
           //game.rootScene.addChild(Dragon);
           game.rootScene.addChild(darkknight2);
           game.rootScene.addChild(darkknight3);
           game.rootScene.addChild(darkknight4);
           game.rootScene.addChild(darkknight5);
           game.rootScene.addChild(darkknight6);
           game.rootScene.addChild(darkknight7);
           game.rootScene.addChild(darkknight8);
           game.rootScene.addChild(darkknight9);
           game.rootScene.addChild(darkknight10);
           game.rootScene.addChild(darkknight11);
           game.rootScene.addChild(darkknight12);
           game.rootScene.addChild(darkknight13);
           game.rootScene.addChild(darkknight14);
           game.rootScene.addChild(darkknight15);
           game.rootScene.addChild(darkknight16);
           game.rootScene.addChild(darkknight17);
           game.rootScene.addChild(darkknight18);
           game.rootScene.addChild(castle);
           game.rootScene.addChild(castle2);
           game.rootScene.insertBefore(map5,knightHp);
           game.rootScene.removeChild(yuka)
           //game.rootScene.removeChild(kaidan)
           game.rootScene.removeChild(map)
           //game.rootScene.removeChild(megami)
           //game.rootScene.removeChild(slime4)
           //game.rootScene.removeChild(slime)
           //game.rootScene.removeChild(slime2)
           game.rootScene.removeChild(darkknight)

           //game.rootScene.removeChild(slimehp)
           //game.rootScene.removeChild(slimeredhp)
           //game.rootScene.removeChild(darkknighthp)
           game.rootScene.removeChild(aitem1)
           game.rootScene.removeChild(aitem2)
           //game.rootScene.removeChild(mitchi)
           //game.rootScene.removeChild(megami)
           //game.rrotScene.removeChild(yuka)SSSSSSS
           //game.rootScene.removeChild(kaidan2)
           //game.rootScene.removeChild(pad.png)
           kaidan.x = 300;
           kaidan.y = 300;
           knight.x = 10;
           knight.y = 280;
         }
       });

       var　castle = new Sprite(16,16);
       castle.image = game.assets["map1.gif"];
       castle.x = 138;
       castle.y = 108;
       castle.frame = 500;
       castle.addEventListener("enterframe", function() {
         if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
           knight.x = 120;
           knight.y = 76;
         }
       });

       var　castle2 = new Sprite(16,16);
       castle2.image = game.assets["map1.gif"];
       castle2.x = 123;
       castle2.y = 108;
       castle2.frame = 500;
       castle.addEventListener("enterframe", function() {
         if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
           knight.x = 120;
           knight.y = 76;
           var sound8 = game.assets['door.mp3'].play();
           map.collisionData = map6.collisionData
           game.rootScene.removeChild(yuka)
           game.rootScene.addChild(pad);
           game.rootScene.addChild(button);
           game.rootScene.addChild(hito1);
           game.rootScene.addChild(hito2);
           game.rootScene.addChild(hito3);
           game.rootScene.addChild(hito4);
           game.rootScene.insertBefore(map6,knightHp);
           game.rootScene.removeChild(map)
           game.rootScene.removeChild(Dragon)
           game.rootScene.removeChild(darkknight2)
           game.rootScene.removeChild(darkknight3)
           game.rootScene.removeChild(darkknight4)
           game.rootScene.removeChild(darkknight5)
           game.rootScene.removeChild(darkknight6)
           game.rootScene.removeChild(darkknight7)
           game.rootScene.removeChild(darkknight8)
           game.rootScene.removeChild(darkknight9)
           game.rootScene.removeChild(darkknight10)
           game.rootScene.removeChild(darkknight11)
           game.rootScene.removeChild(darkknight12)
           game.rootScene.removeChild(darkknight13)
           game.rootScene.removeChild(darkknight14)
           game.rootScene.removeChild(darkknight15)
           game.rootScene.removeChild(darkknight16)
           game.rootScene.removeChild(darkknight17)
           game.rootScene.removeChild(darkknight18)
           game.rootScene.removeChild(castle)
           game.rootScene.removeChild(castle2)
           game.rootScene.removeChild(kaidan)
           game.rootScene.removeChild(slime)
           game.rootScene.removeChild(slime2)
           yuka.x = 1;
           yuka.y = 1;
           knight.x = 135;
           knight.y = 290;

         }
       });

    };
    game.start();
};
