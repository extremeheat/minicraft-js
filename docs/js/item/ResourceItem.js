// package com.mojang.ld22.item;

// import com.mojang.ld22.entity.ItemEntity;
// import com.mojang.ld22.entity.Player;
// import com.mojang.ld22.gfx.Color;
// import com.mojang.ld22.gfx.Font;
// import com.mojang.ld22.gfx.Screen;
// import com.mojang.ld22.item.resource.Resource;
// import com.mojang.ld22.level.Level;
// import com.mojang.ld22.level.tile.Tile;


class ResourceItem extends Item {

  constructor(resource, count) {
    super()
    this.resource = resource
    this.count = count || 1
  }

  getColor() {
    return this.resource.color
  }

  getSprite() {
    return this.resource.sprite
  }

  getName() {
    return this.resource.name
  }

  renderIcon(screen, x, y) {
    screen.render(x, y, this.getSprite(), this.getColor(), 0)
  }

  renderInventory(screen, x, y) {
    screen.render(x, y, this.getSprite(), this.getColor(), 0)
    Font.draw(this.getName(), screen, x + 32, y, Color.get(-1, 555, 555, 555))
    const cc = Math.min(this.count, 999)
    Font.draw(`${cc}`, screen, x + 8, y, Color.get(-1, 444, 444, 444))
  }

  onTake(itemEntity) { }

  interactOn(tile, level, xt, yt, player, attackDir) {
    if (this.resource.interactOn(tile, level, xt, yt, player, attackDir)) {
      this.count--
      return true
    }
    return false
  }

  isDepleted() {
    return this.count <= 0
  }
}




// public class ResourceItem extends Item {
//  public Resource resource;
//  public int count = 1;

//  public ResourceItem(Resource resource) {
//    this.resource = resource;
//  }

//  public ResourceItem(Resource resource, int count) {
//    this.resource = resource;
//    this.count = count;
//  }

//  public int getColor() {
//    return resource.color;
//  }

//  public int getSprite() {
//    return resource.sprite;
//  }

//  public void renderIcon(Screen screen, int x, int y) {
//    screen.render(x, y, resource.sprite, resource.color, 0);
//  }

//  public void renderInventory(Screen screen, int x, int y) {
//    screen.render(x, y, resource.sprite, resource.color, 0);
//    Font.draw(resource.name, screen, x + 32, y, Color.get(-1, 555, 555, 555));
//    int cc = count;
//    if (cc > 999) cc = 999;
//    Font.draw("" + cc, screen, x + 8, y, Color.get(-1, 444, 444, 444));
//  }

//  public String getName() {
//    return resource.name;
//  }

//  public void onTake(ItemEntity itemEntity) {
//  }

//  public boolean interactOn(Tile tile, Level level, int xt, int yt, Player player, int attackDir) {
//    if (resource.interactOn(tile, level, xt, yt, player, attackDir)) {
//      count--;
//      return true;
//    }
//    return false;
//  }

//  public boolean isDepleted() {
//    return count <= 0;
//  }

// }