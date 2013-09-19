declare var module;

class Route {

  private _paths: Array = [];
  private _inputMap: Object = {};
  public routes: Object = {};

  constructor() { }

  public nodes() {

    return Object.keys(this.routes);

  }

  public startNodes() {

    var nodes = this.nodes();
    var startNodes = nodes.slice(0);
    for (var key in this.routes) {
      for (var i = 0; i < nodes.length; i++) {
        if (this.routes[key].indexOf(nodes[i]) >= 0 &&
          startNodes.indexOf(nodes[i]) >= 0
          ) {
          startNodes.splice(startNodes.indexOf(nodes[i]), 1);
        }
      }
    }

    return startNodes;

  }

  public paths() {

    var startNodes = this.startNodes(), i;
    for (i = 0; i < startNodes.length; i++) {
      this.branch(startNodes[i]);
    }

    return this._paths;

  }

  public branch(root) {

    var that = this;
    function __paths(id, ref) {
//      if (that.routes[id].length > 0) {
      if (that.routes[id] && that.routes[id].length > 0) {
        for (var i = 0; i < that.routes[id].length; i++) {
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

    var startNodes = this.startNodes(), key, i;

    for (i = 0; i < startNodes.length; i++) {
      this._inputMap[startNodes[i]] = [];
    }

    for (key in this.routes) {

      for (i = 0; i < this.routes[key].length; i++) {

        if (!this._inputMap[this.routes[key][i]]) this._inputMap[this.routes[key][i]] = [];

        this._inputMap[this.routes[key][i]].push(key);

      }

    }

    return this._inputMap;

  }

  public inputMap() {

    return this._inputMap;

  }

  public batch() {

    var pos = this.position(), i, j, column, batch = [];

    if (!pos.length) return [];

    for (i = 0; i < pos[0].length; i++) {

      column = [];
      for (j = 0; j < pos.length; j++) {

        if (column.indexOf(pos[j][i]) < 0 & null !== pos[j][i]) {
          column.push(pos[j][i]);
        }

      }

      batch.push(column);
    }

    return batch;

  }

  public position() {

    var posMap = this.posMap(), i, j;
    for (i = 0; i < this._paths.length; i++) {
      for (j = 0; j < this._paths[i].length; j++) {

        if (j < posMap[this._paths[i][j]]) {

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
    var m = {}, i, j;
    for (i = 0; i < this._paths.length; i++) {
      for (j = 0; j < this._paths[i].length; j++) {

        if (!m[this._paths[i][j]] || m[this._paths[i][j]] < j) {
          m[this._paths[i][j]] = j;
        }

      }
    }
    return m;
  }

  public load(routes) {

    this.routes = routes;

    // create input map, before position() will modify the paths.
    this.__inputMap();
  }
  
  public loadSourceTargetWithPorts(st, s = "source", t = "target") {
      
    
  }

  // will remove duplicates and thus port in formation
  public loadSourceTarget(st, s = "source", t = "target") {
    
    var i;

    this.routes = {};
    for (i = 0; i < st.length; i++) {
      if (!this.routes[st[i][s]]) this.routes[st[i][s]] = [];
      if(this.routes[st[i][s]].indexOf(st[i][t]) >= 0) {
        this.routes[st[i][s]].push(st[i][t]);
      }
    }
    
    // create input map, before position() will modify the paths.
    this.__inputMap();

  }

  public links(s = "source", t = "target") {

    var links = [], obj = {}, key, i;

    for (key in this.routes) {
      for (i = 0; i < this.routes[key].length; i++) {

        obj = {}
        obj[s] = key;
        obj[t] = this.routes[key][i];

        links.push(obj);
      }
    }

    return links;

  }

}

module.exports = Route 
