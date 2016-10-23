enchant();

window.onload = function() {
  var game = new Game(320,320);
  game.fps = 20;
  var width = 320;
  var height = 320;
  var forward = 'right';
  var cell = 32;
  var labelX = 230;
  var bearInitHp = 9999;

  game.preload("chara5.png");
  game.preload("map0.png");
  game.preload("map1.png");
  game.preload("chara6.png");
  game.preload("chara7.png");
  game.preload("end.png");
  game.preload(['chara1.png','icon0.png','music.mp3','kowai.mp3','beam.mp3']);
  game.preload("icon0.png")

  game.onload = function() {
    var sound1 = game.assets['music.mp3'].clone();
    sound1.play();

    var map = new Map(16, 16);
    map.image=game.assets["map0.png"];
    mapArray = [
        [3,3,3,0,0,0,0,0,0,0,0,0,0,18,18,18,18,18,18,18],
        [3,20,3,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,18],
        [3,3,3,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,18],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,18],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,18],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,18,18,18,18],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,6,22,6,0,0,0,0,0,0,21,0,21,0,21,0,21,0,0,0],
        [0,6,27,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,23,23,23,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [23,23,23,23,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]

      map.loadData(mapArray);

      map.collisionData =[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0],
        [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
          [194,194,194,194,211,212,213,194,194,194,194,194,194,194,194,194,194,194,194,194],
          [194,194,194,194,227,228,229,194,194,194,194,194,194,194,194,194,194,194,195,194],
          [194,194,194,195,243,244,245,194,194,194,195,194,194,194,194,194,194,194,194,194],
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
          [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0]
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

      // 文字表示
      bearHp = new Label();
      bearHp.font = "10px gothic";
      bearHp.text = "bear hp " + bearInitHp;
      bearHp.x = labelX;
      bearHp.y = 20;
      game.rootScene.addChild(bearHp);

      bear = new Sprite(32, 32);
      bear.image = game.assets["chara5.png"];
      bear.x = 0;
      bear.y = 0;
      bear.frame = 18;
      bear.speed = 8;
      bear.hp = bearInitHp;
      game.rootScene.addChild(bear);
      game.keybind(13, 'enter');
      bear.addEventListener("enterframe", function(){
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
            if((map.hitTest(this.x + 8, this.y  - this.speed ) == false)&&
              (map.hitTest(this.x + cell / 2, this.y  - this.speed ) == false)){
              if(this.y > 0){
                this.y -= this.speed;
                this.frame = 30 + this.age %3;
                forward = 'up';
              }
            }
          }

        console.log(forward);
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
        }
      });

      // 文字表示
      slimeHp = new Label();
      slimeHp.font = "10px gothic";
      slimeHp.text = "slime hp 70";
      slimeHp.x = labelX;
      slimeHp.y = 35;
      game.rootScene.addChild(slimeHp);

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
        if(this.intersect(bear)){  //プレイヤーが敵と衝突しているかを判定
          if(game.input.enter){
            if(this.hp == 0){
              this.visible = false;  //プレイヤーを非表示にする
            }
            if(this.hp>0){
              this.hp = this.hp -1;
              slimeHp.text = "slime hp " + slime.hp;
              if(slime.hp % 7 == 0){
                if(bear.hp>0){
                  bear.hp = bear.hp -1;
                  bearHp.text = "bear hp " + bear.hp;
                }
              }
            }
          }
        }
      });
      var kaidan = new Sprite(16,16);
      var sound2 = game.assets['kowai.mp3'].clone();
      sound2.play();
      kaidan.image = game.assets["map0.png"];
      kaidan.frame = 14;
      kaidan.x = 32;
      kaidan.y = 212;
      game.rootScene.addChild(kaidan)
      kaidan.addEventListener("enterframe", function() {
        if(this.intersect(bear)){  //プレイヤーが敵と衝突しているかを判定
          sound1.stop();
          map.collisionData = map2.collisionData
          game.rootScene.insertBefore(map2,bearHp);
          game.rootScene.removeChild(map)
          //game.rootScene.removeChild(slime2)
          //game.rootScene.removeChild(slime)
          //game.rootScene.removeChild(slime3)
          game.rootScene.removeChild(slime4)
          //game.rootScene.removeChild(slimeHp)
          //game.rootScene.removeChild(slime2hp)
          //game.rootScene.removeChild(slime3hp)
          game.rootScene.removeChild(aitem3)
          //game.rootScene.removeChild(aitem1)
          //game.rootScene.removeChild(aitem2)
        }
      });
      // 文字表示
      slime2hp = new Label();
      slime2hp.font = "10px gothic";
      slime2hp.text = "slime2 hp 120";
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

          if(this.intersect(bear)){  //プレイヤーが敵と衝突しているかを判定
              if(game.input.enter){
                if(this.hp == 0){
                  this.visible = false;  //プレイヤーを非表示にする
                }
                if(this.hp>0){
                  this.hp = this.hp -1;
                  slime2hp.text = "slime2 hp  " + slime2.hp;
                  if(this.hp % 5 == 0){
                    if(bear.hp>0){
                      bear.hp = bear.hp -1;
                      bearHp.text = "bear hp " + bear.hp;
                    }
                }
              }
            }
          }
        });

        // 文字表示
        slime3hp = new Label();
        slime3hp.font = "10px gothic";
        slime3hp.text = "slime3 hp 200";
        slime3hp.x = labelX;
        slime3hp.y = 67;
        game.rootScene.addChild(slime3hp);

        var slime3 = new Sprite(32,32);
        slime3.image = game.assets["chara7.png"];
        slime3.x = 55;
        slime3.y = 55;
        slime3.hp = 200;
        game.rootScene.addChild(slime3);
        slime3.addEventListener("enterframe", function() {
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

          if(this.intersect(bear)){ 　//プレイヤーが敵と衝突しているかを判定
              if(game.input.enter){
                if(this.hp == 0){
                  this.visible = false;　//プレイヤーを非表示にする　
                }
                if(this.hp>0){
                  this.hp = this.hp -1;
                  slime3hp.text = "slime3 hp  " + slime3.hp;
                  if(this.hp % 5 == 0){
                    if(bear.hp>0){
                      bear.hp = bear.hp -1;
                      bearHp.text = "bear hp " + bear.hp;
                    }
                }
                }
              }
          }
        });

        var slime4 = new Sprite(32,32);
        slime4.image = game.assets["chara6.png"];
        slime4.x = 70;
        slime4.y = 60;
        slime4.hp = 100;
        game.rootScene.addChild(slime4);
        slime4.addEventListener("enterframe", function() {
        //   var dx = 0;
        //   var dy = 0;
        //   this.frame = 3 + this.age %3;
        //   if (this.age % 16 == 0) {
        //     var d = Math.floor(Math.random()*4 );
        //     if (d==0){
        //        dy = -16;
        //     }else if (d==1){
        //       dx = 16;
        //     }else if (d==2){
        //       dy = 16;
        //     }else if (d==3){
        //        dx = -16;
        //     }
        //
        //     var x = this.x + dx;
        //     var y = this.y + dy;
        //     var _x = this.x + (dx ? dx / Math.abs(dx) * (cell / 2) : 0) + (cell / 2);
        //     var _y = this.y + (dy ? dy / Math.abs(dy) * (cell / 2) : 0) + (cell / 2);
        //     if (x<(width-cell) && y<(height-cell) && x>0 && y>0 && !map.hitTest(_x,_y)){
        //       this.x = x;
        //       this.y = y;
        //     }
        //   }

           if(this.intersect(bear)){  //プレイヤーが敵と衝突しているかを判定
               if(game.input.enter){
                 if(this.hp == 0){
                   this.visible = false;  //プレイヤーを非表示にする
                 }
                 if(this.hp>0){
                   this.hp = this.hp -1;
          //         slime4hp.text = "slime4 hp  " + slime4.hp;
                   if(this.hp % 5 == 0){
                    if(bear.hp>0){
                       bear.hp = bear.hp -1;
                       bearHp.text = "bear hp " + bear.hp;
                     }
                 }
               }
             }
           }
        });

        end = new Sprite(189, 97);
        end.image = game.assets["end.png"];
        end.x = (game.width-end.width)/2;
        end.y = (game.height-end.height)/2;
        game.rootScene.addChild(end);
        end.visible = false;  //プレイヤーを非表示にする


        var aitem1 = new Sprite(16,16);
        aitem1.image = game.assets["icon0.png"];
        aitem1.x = 64;
        aitem1.y = 252;
        aitem1.hp = 45;
        aitem1.frame = 11;
        game.rootScene.addChild(aitem1);
        aitem1.addEventListener("enterframe", function() {
          //  もし、いまいるブロックが19なら、再生する
           if(this.intersect(bear)){  //プレイヤーが敵と衝突しているかを判定

             console.log(this.visible);
             console.log(this.hp);



                 if(this.hp == 0){
                   this.visible = false;  //プレイヤーを非表示にする
                 }
                 if(this.hp>0){
                    game.assets['beam.mp3'].play();
                   this.hp = this.hp -1;
          //         aitem1hp.text = "aitem1hp hp  " + aitem1hp.hp;
                    if(bear.hp>0){
                       bear.hp = bear.hp -1;
                       bearHp.text = "bear hp " + bear.hp;
                     }
             }
           }
        });

        var aitem2 = new Sprite(16,16);
        aitem2.image = game.assets["icon0.png"];
        aitem2.x = 64;
        aitem2.y = 271;
        aitem2.hp = 45;
        aitem2.frame = 11;
        game.rootScene.addChild(aitem2);
        aitem2.addEventListener("enterframe", function() {

           if(this.intersect(bear)){  //プレイヤーが敵と衝突しているかを判定

                 if(this.hp == 0){
                   this.visible = false;  //プレイヤーを非表示にする
                 }
                 if(this.hp>0){
                   var sound3 = game.assets['beam.mp3'].clone();
                   sound3.play();
                   this.hp = this.hp -1;
          //         aitem1hp.text = "aitem1hp hp  " + aitem1hp.hp;
                    if(bear.hp>0){
                       bear.hp = bear.hp -1;
                       bearHp.text = "bear hp " + bear.hp;
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

    };
    game.start();
};
