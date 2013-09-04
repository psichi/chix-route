declare var module;

class Flow {

  private _paths:Array = [];

  constructor (public flow:Object) {

  }

  public paths(root) {

    var that = this;
    function __paths(id, ref) {
      if(that.flow[id].length > 0) {
        for(var i = 0; i < that.flow[id].length; i++) {
          var d = ref.slice(0);
          d.push(that.flow[id][i]);
          __paths(that.flow[id][i], d);
        }
      } else {
        that._paths.push(ref);
      }
    }

    __paths(root, [root]);

    return this._paths;

  }

  public position() {

    var posMap = this.posMap();
    for(var i = 0; i < this._paths.length; i++) {
      for(var j = 0; j < this._paths[i].length; j++) {

        // func 1
        if(j < posMap[this._paths[i][j]]) {
           this._paths[i].splice(j, 0, null);
        }

      }
    }

    return this._paths;

  }

  /**
   *
   * Create a position map of the last occurence
   *
   */
  public posMap() {
    var m = {};
    for(var i = 0; i < this._paths.length; i++) {
      for(var j = 0; j < this._paths[i].length; j++) {

        // func 2 
        if(!m[this._paths[i][j]] || m[this._paths[i][j]] < j) {
          m[this._paths[i][j]] = j;
        }

      }
    }
    return m;
  }

}

module.exports = Flow
