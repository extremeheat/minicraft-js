// package com.mojang.ld22.entity;

// import com.mojang.ld22.gfx.Color;
// import com.mojang.ld22.gfx.Screen;
// import com.mojang.ld22.item.ResourceItem;
// import com.mojang.ld22.item.resource.Resource;

function Zombie(lvl) {
  this.lvl = lvl;
  this.x = random.nextInt(64 * 16);
  this.y = random.nextInt(64 * 16);
  this.health = this.maxHealth = lvl * lvl * 10;

  this.xa = 0;
  this.ya = 0;
  this.randomWalkTime = 0;
}

Zombie.Super = Mob.prototype;
Zombie.prototype = extend({}, new Mob(), {

  tick: function() {
    Zombie.Super.tick.call(this);

    if (this.level.player != null && this.randomWalkTime == 0) {
      var xd = this.level.player.x - this.x;
      var yd = this.level.player.y - this.y;
      if (xd * xd + yd * yd < 50 * 50) {
        this.xa = 0;
        this.ya = 0;
        if (xd < 0) xa = -1;
        if (xd > 0) xa = +1;
        if (yd < 0) ya = -1;
        if (yd > 0) ya = +1;
      }
    }

    var speed = this.tickTime & 1;
    if (!this.move(this.xa * speed, this.ya * speed) || random.nextInt(200) == 0) {
      this.randomWalkTime = 60;
      this.xa = (random.nextInt(3) - 1) * random.nextInt(2);
      this.ya = (random.nextInt(3) - 1) * random.nextInt(2);
    }
    if (this.randomWalkTime > 0) this.randomWalkTime--;
  },

  render: function(screen) {
    var xt = 0;
    var yt = 14;

    var flip1 = (this.walkDist >> 3) & 1;
    var flip2 = (this.walkDist >> 3) & 1;

    if (this.dir == 1) {
      xt += 2;
    }
    if (this.dir > 1) {
      flip1 = 0;
      flip2 = ((this.walkDist >> 4) & 1);
      if (dir == 2) {
        flip1 = 1;
      }
      xt += 4 + ((this.walkDist >> 3) & 1) * 2;
    }

    var xo = this.x - 8;
    var yo = this.y - 11;

    var col = Color.get(-1, 10, 252, 50);
    if (this.lvl == 2) col = Color.get(-1, 100, 522, 50);
    if (this.lvl == 3) col = Color.get(-1, 111, 444, 50);
    if (this.lvl == 4) col = Color.get(-1, 0, 111, 20);
    if (this.hurtTime > 0) {
      col = Color.get(-1, 555, 555, 555);
    }

    screen.render(xo + 8 * flip1, yo + 0, xt + yt * 32, col, flip1);
    screen.render(xo + 8 - 8 * flip1, yo + 0, xt + 1 + yt * 32, col, flip1);
    screen.render(xo + 8 * flip2, yo + 8, xt + (yt + 1) * 32, col, flip2);
    screen.render(xo + 8 - 8 * flip2, yo + 8, xt + 1 + (yt + 1) * 32, col, flip2);
  },

  touchedBy: function(entity) {
    if (entity instanceof Player) {
      entity.hurt(this, this.lvl + 1, dir);
    }
  },

  die: function() {
    Zombie.Super.die.call(this);

    var count = random.nextInt(2) + 1;
    for (var i = 0; i < count; i++) {
      this.level.add(new ItemEntity(new ResourceItem(Resource.cloth), this.x + random.nextInt(11) - 5, this.y + random.nextInt(11) - 5));
    }

    if (this.level.player != null) {
      level.player.score += 50 * this.lvl;
    }
  }

});


// public class Zombie extends Mob {
//  private int xa, ya;
//  private int lvl;
//  private int randomWalkTime = 0;

//  public Zombie(int lvl) {
//    this.lvl = lvl;
//    x = random.nextInt(64 * 16);
//    y = random.nextInt(64 * 16);
//    health = maxHealth = lvl * lvl * 10;

//  }

//  public void tick() {
//    super.tick();

//    if (level.player != null && randomWalkTime == 0) {
//      int xd = level.player.x - x;
//      int yd = level.player.y - y;
//      if (xd * xd + yd * yd < 50 * 50) {
//        xa = 0;
//        ya = 0;
//        if (xd < 0) xa = -1;
//        if (xd > 0) xa = +1;
//        if (yd < 0) ya = -1;
//        if (yd > 0) ya = +1;
//      }
//    }

//    int speed = tickTime & 1;
//    if (!move(xa * speed, ya * speed) || random.nextInt(200) == 0) {
//      randomWalkTime = 60;
//      xa = (random.nextInt(3) - 1) * random.nextInt(2);
//      ya = (random.nextInt(3) - 1) * random.nextInt(2);
//    }
//    if (randomWalkTime > 0) randomWalkTime--;
//  }

//  public void render(Screen screen) {
//    int xt = 0;
//    int yt = 14;

//    int flip1 = (walkDist >> 3) & 1;
//    int flip2 = (walkDist >> 3) & 1;

//    if (dir == 1) {
//      xt += 2;
//    }
//    if (dir > 1) {

//      flip1 = 0;
//      flip2 = ((walkDist >> 4) & 1);
//      if (dir == 2) {
//        flip1 = 1;
//      }
//      xt += 4 + ((walkDist >> 3) & 1) * 2;
//    }

//    int xo = x - 8;
//    int yo = y - 11;

//    int col = Color.get(-1, 10, 252, 050);
//    if (lvl == 2) col = Color.get(-1, 100, 522, 050);
//    if (lvl == 3) col = Color.get(-1, 111, 444, 050);
//    if (lvl == 4) col = Color.get(-1, 000, 111, 020);
//    if (hurtTime > 0) {
//      col = Color.get(-1, 555, 555, 555);
//    }

//    screen.render(xo + 8 * flip1, yo + 0, xt + yt * 32, col, flip1);
//    screen.render(xo + 8 - 8 * flip1, yo + 0, xt + 1 + yt * 32, col, flip1);
//    screen.render(xo + 8 * flip2, yo + 8, xt + (yt + 1) * 32, col, flip2);
//    screen.render(xo + 8 - 8 * flip2, yo + 8, xt + 1 + (yt + 1) * 32, col, flip2);
//  }

//  protected void touchedBy(Entity entity) {
//    if (entity instanceof Player) {
//      entity.hurt(this, lvl + 1, dir);
//    }
//  }

//  protected void die() {
//    super.die();

//    int count = random.nextInt(2) + 1;
//    for (int i = 0; i < count; i++) {
//      level.add(new ItemEntity(new ResourceItem(Resource.cloth), x + random.nextInt(11) - 5, y + random.nextInt(11) - 5));
//    }

//    if (level.player != null) {
//      level.player.score += 50 * lvl;
//    }

//  }

// }