var Night = enchant.Class.create(enchant.Sprite, {
  initialize: function(game, x, y) {
    enchant.Sprite.call(this, 32, 32);
    this.x = x;
    this.y = y;
    this.image = game.assets["../chara5.png"];
    this.frame = 4;
  }
});
