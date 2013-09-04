declare var module;

class Flow {

  private _paths:Array = [];

  constructor (public flow:Object) {

  }

  public paths(root) {

    var that = this;
    function __paths(id, ref) {
      if(that.flow[id].target.length > 0) {
        for(var i = 0; i < that.flow[id].target.length; i++) {
          var d = ref.slice(0);
          d.push(that.flow[id].target[i]);
          __paths(that.flow[id].target[i], d);
        }
      } else {
        that._paths.push(ref);
      }
    }

    __paths(root, [root]);

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
        if(!m[this._paths[i][j]] || m[this._paths[i][j]] < j) {
          m[this._paths[i][j]] = j;
        }
      }
    }
    return m;
  }

}

module.exports = Flow
