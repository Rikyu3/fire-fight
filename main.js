enchant();

window.onload = function() {
  var game = new Game(320,320);
  game.fps = 20;
  var width = 320;
  var height = 320;
  var forward = 'right';
  var cell = 32;
  var labelX = 207;
  var knightInitHp = 9999;
  var kakusu = 360;
  var tairyoku = 20;
  var sound1;

  // 画像のpreload
  game.preload([
    "end.png",
    "map0.png",
    "map1.png",
    "map2.png",
    "icon0.png",
    "chara1.png",
    "chara5.png",
    "chara6.png",
    "chara7.png",
    "pad.png"
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
    'break2.mp3'
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
    map.image=game.assets["map0.png"];

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
        [3,3,3,0,0,0,0,0,0,0,0,0,18,18,18,18,18,18,18,18],
        [3,20,3,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,0,18],
        [3,3,3,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,0,18],
        [0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,0,18],
        [0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,0,18],
        [0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,18,18,18,18,18],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,6,22,6,0,0,0,0,0,0,21,0,21,0,21,0,21,0,0,0],
        [0,6,27,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,23,23,23,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,0,0,0,23,0,0,0,0,23,23,23,23,24,24,23,23,23,23,23],
        [23,0,0,0,23,0,0,0,0,23,18,18,18,18,18,18,18,18,18,23],
        [23,0,0,0,0,0,0,0,0,11,18,18,18,18,18,18,18,18,18,23],
        [23,0,0,0,0,0,0,0,0,11,18,18,18,18,18,18,18,18,18,23],
        [23,0,0,0,23,0,0,0,0,23,18,18,18,18,18,18,18,18,18,23],
        [23,23,23,23,23,0,0,0,0,23,18,25,18,25,18,25,18,25,18,23]
      ]

      map.loadData(premapArray,mapArray);

      map.collisionData =[
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0],
        [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,0,0,0,0,1,0,1,0,1,1,1,0,1,0,1]
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

      // バーチャルキーパッドを生成
	    var pad = new Pad();
	    pad.moveTo(0, 220);
	    game.rootScene.addChild(pad);
      //game.rootScene.addEventListener('enterframe', function(e) {
		  //});

      //ボタンの作成
      game.addButtons = function() {
        this.buttons = {
          a: new Button('A', 'light'),
        };
        this.buttons.a.x = 120;
        this.buttons.a.y = 280;
        this.rootScene.addChild(this.buttons.a);
        this.keybind( 'A'.charCodeAt(0), 'a' );
      }

      var pad = new Sprite(32, 16);
      pad.image = game.assets["pad.png"];
      pad.x = game.width/2;	// X座標
      pad.y = game.height - 40;	// Y座標
      game.rootScene.addChild(pad);


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
        if(this.hp == 0){
          this.visible = false;  //プレイヤーを非表示にする
          end.visible = true;  //ゲームオーバー
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
        if (game.input.enter){
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
      slime.x = 200;
      slime.y = 200;
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
      game.rootScene.addChild(kaidan)
      kaidan.addEventListener("enterframe", function() {
        if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
          sound1.stop();
          sound1 = game.assets['kowai.mp3'];
          sound1.play();
          map.collisionData = map2.collisionData
          game.rootScene.insertBefore(map2,knightHp);
          game.rootScene.removeChild(kaidan)
          game.rootScene.removeChild(map)
          game.rootScene.removeChild(aitem3)
          //game.rootScene.removeChild(slime4)
          //game.rootScene.removeChild(slime)
          //game.rootScene.removeChild(slime2)
          //game.rootScene.removeChild(darkknight)
          //game.rootScene.removeChild(slimehp)
          //game.rootScene.removeChild(slimeredhp)
          //game.rootScene.removeChild(darkknighthp)
          //game.rootScene.removeChild(aitem1)
          //game.rootScene.removeChild(aitem2)
          //game.rootScene.removeChild(aitem3)
          //game.rootScene.removeChild(aitem4)
          //game.rrotScene.removeChild(house)
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



      if(knightHp<9750){
        var kaidan2 = new Sprite(16,16);
        kaidan2.image = game.assets["map0.png"];
        kaidan2.frame = 14;
        kaidan2.x = 1;
        kaidan2.y = 1;
        game.rootScene.addChild(kaidan2)
        kaidan2.addEventListener("enterframe", function() {
          if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定          map.collisionData = map2.collisionData
            game.rootScene.insertBefore(map3,knightHp);
            game.rootScene.removeChild(map)
            game.rootScene.removeChild(aitem3)
            //game.rootScene.removeChild(slime4)
            //game.rootScene.removeChild(slime)
            //game.rootScene.removeChild(slime2)
            //game.rootScene.removeChild(darkknight)
            //game.rootScene.removeChild(slimehp)
            //game.rootScene.removeChild(slimeredhp)
            //game.rootScene.removeChild(darkknighthp)
            //game.rootScene.removeChild(aitem1)
            //game.rootScene.removeChild(aitem2)
            //game.rootScene.removeChild(aitem4)
            //game.rrotScene.removeChild(house)

          }
        });
      }



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
        darkknight.hp = 1;
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
        darkknight2.x = 216;
        darkknight2.y = 293;
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



        var aitem1 = new Sprite(16,16);
        aitem1.image = game.assets["icon0.png"];
        aitem1.x = 64;
        aitem1.y = 256;
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
             }
           }
        });

        var aitem2 = new Sprite(16,16);
        aitem2.image = game.assets["icon0.png"];
        aitem2.x = 64;
        aitem2.y = 274;
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
                   var sound3 = game.assets['beam.mp3'].clone();
                   sound3.play();
                   this.hp = this.hp -1;
          //         aitem1hp.text = "aitem1hp hp  " + aitem1hp.hp;
                    if(knight.hp>0){
                       knight.hp = knight.hp -1;
                       knightHp.text = "knight hp " + knight.hp;
                     }
             }
           }
        });

        var aitem3 = new Sprite(16,16);
        aitem3.image = game.assets["icon0.png"];
        aitem3.x = 15;
        aitem3.y = 211;
        aitem3.frame = 42;
        game.rootScene.addChild(aitem3);

        var aitem4 = new Sprite(16,16);
        aitem4.image = game.assets["icon0.png"];
        aitfghvcfgghem4.x = 50;
        aitem4.y = 252;
        aitem4.hp = 500;
        aitem4.frame = 11;
        game.rootScene.addChild(aitem4);
        aitem4.addEventListener("enterframe", function() {
          //  もし、いまいるブロックが19なら、再生する
           if(this.intersect(knight)) {  //プレイヤーが敵と衝突しているかを判定

                 if(this.hp == 0){
                   this.visible = false;  //プレイヤーを非表示にする
                 }
                 if(this.hp>0){
                    game.assets['beam.mp3'].play();
                   this.hp = this.hp -1;
                   //  aitem1hp.text = "aitem1hp hp  " + aitem1hp.hp;
                    if(knight.hp>0){
                       knight.hp = knight.hp -1;
                       knightHp.text = "knight hp " + knight.hp;
                     }
             }
           }
        });


       var house = new Sprite(16,16);
       house.image = game.assets["map0.png"];
       house.frame = 21;
       house.x = 20;
       house.y = 20;
       game.rootScene.addChild(house)
       kaidan.addEventListener("enterframe", function() {
         if(this.intersect(knight)){  //プレイヤーが敵と衝突しているかを判定
           sound1.stop();
           map.collisionData = map3.collisionData
           game.rootScene.insertBefore(map4,knightHp);
           game.rootScene.removeChild(map)
           game.rootScene.removeChild(house)
           //game.rootScene.removeChild(slime4)
           //game.rootScene.removeChild(slime)
           //game.rootScene.removeChild(slime2)
           //game.rootScene.removeChild(darkknight)
           //game.rootScene.removeChild(slimehp) //game.rootScene.removeChild(slimeredhp) //game.rootScene.removeChild(darkknighthp) //game.rootScene.removeChild(aitem1)
           //game.rootScene.removeChild(aitem2)
           //game.rootScene.removeChild(aitem3)
           //game.rootScene.removeChild(aitem4)
         }
       });

    };


    game.start();
};
