declare var module;

class Route {

  private _paths:Array = [];
  private _inputMap:Object = {};

  constructor (public routes:Object) {

    // create input map, before position() will modify the paths.
    this.__inputMap();

  }

  public nodes() {

    return Object.keys(this.routes);

  }

  public startNodes() {

    var nodes = this.nodes();
    var startNodes = nodes.slice(0);
    for(var key in this.routes) {
       for(var i = 0; i < nodes.length; i++ ) {
         if(this.routes[key].indexOf(nodes[i]) >= 0 &&
            startNodes.indexOf(nodes[i]) >= 0
           ) {
           startNodes.splice(startNodes.indexOf(nodes[i]), 1);
         }
       }
    }

    return startNodes;

  }

  public paths() {

    var startNodes = this.startNodes();
    console.log(startNodes);
    for(var i = 0; i < startNodes.length; i++) {
      console.log(startNodes[i]);
       this.branch(startNodes[i]);
    }

    return this._paths;

  }

  //public paths(root) {
  public branch(root) {

    var that = this;
    function __paths(id, ref) {
      if(that.routes[id].length > 0) {
        for(var i = 0; i < that.routes[id].length; i++) {
          var d = ref.slice(0);
          d.push(that.routes[id][i]);
          __paths(that.routes[id][i], d);
        }
      } else {
        that._paths.push(ref);
      }
    }

    __paths(root, [root]);

    return this._paths;

  }

  private __inputMap() {

    var startNodes = this.startNodes();
    for(var i = 0; i < startNodes.length; i++) {
        this._inputMap[startNodes[i]] = [];
    }

    for(var key in this.routes) {

      for(var i = 0; i < this.routes[key].length; i++) {

        if(!this._inputMap[this.routes[key][i]]) this._inputMap[this.routes[key][i]] = [];

        this._inputMap[this.routes[key][i]].push(key);

      }

    }

    return this._inputMap;

  }

  public inputMap() {

    return this._inputMap;

  }

  public batch() {

    var pos = this.position();

    if(!pos.length) return [];

    var batch = [];
    for(var i = 0; i < pos[0].length; i++) {

      var column = [];
      for(var j = 0; j < pos.length; j++) {

        if(column.indexOf(pos[j][i]) < 0 & null !== pos[j][i]) {
          column.push(pos[j][i]);
        }

      }

      batch.push(column);
    }

    return batch;

  }

  public position() {

    var posMap = this.posMap();
    for(var i = 0; i < this._paths.length; i++) {
      for(var j = 0; j < this._paths[i].length; j++) {

        if(j < posMap[this._paths[i][j]]) {

           // Alert! modifies this._paths in place.
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

  public objectMap() {

    var objectMap = {};

    return objectMap;

  }

}

module.exports = Route 
