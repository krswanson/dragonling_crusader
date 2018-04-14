// Give a root folder path, the path from there to the foreground images folder,
// and a path to the background images folder (for animagtion--can be the same).
// For instange: 'images/dragon', 'fore', 'back'

function Images (rootPath, fore, back) {
  rootPath = (rootPath && rootPath.length > 0 ? rootPath + '/' : '')
  this.foreground = rootPath + (fore && fore.length > 0 ? fore + '/' : '')
  this.background = rootPath + (back && back.length > 0 ? back + '/' : '')
  this.ext = '.png'

  this.getFore = function (name) {
    return this.foreground + name + this.ext
  }

  this.getBack = function (name) {
    return this.background + name + this.ext
  }
}

module.exports = Images
