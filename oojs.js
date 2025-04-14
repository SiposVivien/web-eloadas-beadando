/// ez a class ugyanaz, mint a obj.js-nél
class Image {
    constructor(src, x, y, width, height) {
    this.image = document.createElement("img");
    this.image.src = src;
    this.image.style.position = "absolute";
    this.image.style.left = x+"px";
    this.image.style.top = y+"px";
    this.image.width = width;
    this.image.height = height;
    document.body.appendChild(this.image);
    }
    show() {
    this.image.style.visibility = "visible";
    }
    hide() {
    this.image.style.visibility = "hidden";
    }
    putAt(x, y) {
    this.image.style.left = x+"px";
    this.image.style.top = y+"px";
    }
    resize(width, height) {
    this.image.width = width;
    this.image.height = height;
    }
    }
    class SubtitledImage extends Image {
    constructor(src, x, y, width, height, subtitle) {
    // az ősosztály (Image) default konstruktorát hívja meg
    // Elkészíti és elhelyezi az oldalon a kép objektumot a példányosításkor
    super(src, x, y, width, height);
    this.subtitle = document.createElement("div");
    this.subtitle.innerHTML = subtitle;
    this.subtitle.style.position = "absolute";
    this.subtitle.style.left = x+"px";
    this.subtitle.style.top = (y+height)+"px";
    document.body.appendChild(this.subtitle);
    }
    show() {
    // Az ősosztály (Image) show() metódusát hívja meg
    super.show();
    this.subtitle.style.visibility = "visible";
    }
    hide() {
    super.hide();
    this.subtitle.style.visibility = "hidden";
    }
    putAt(x, y) {
    super.putAt(x, y);
    this.subtitle.style.left = x+"px";
    this.subtitle.style.top = (parseInt(y)+parseInt(this.image.height))+"px";
    }
    resize(width, height) {
    super.resize(width, height);
    this.subtitle.style.top = (parseInt(this.image.style.top)+parseInt(height))+"px";
    }
    }