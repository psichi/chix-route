var Route = (function () {
    function Route(routes) {
        this.routes = routes;
        this._paths = [];
        this._inputMap = {};
        // create input map, before position() will modify the paths.
        this.__inputMap();
    }
    Route.prototype.nodes = function () {
        return Object.keys(this.routes);
    };

    Route.prototype.startNodes = function () {
        var nodes = this.nodes();
        var startNodes = nodes.slice(0);
        for (var key in this.routes) {
            for (var i = 0; i < nodes.length; i++) {
                if (this.routes[key].indexOf(nodes[i]) >= 0 && startNodes.indexOf(nodes[i]) >= 0) {
                    startNodes.splice(startNodes.indexOf(nodes[i]), 1);
                }
            }
        }

        return startNodes;
    };

    Route.prototype.paths = function () {
        var startNodes = this.startNodes(), i;
        for (i = 0; i < startNodes.length; i++) {
            this.branch(startNodes[i]);
        }

        return this._paths;
    };

    Route.prototype.branch = function (root) {
        var that = this;
        function __paths(id, ref) {
            if (that.routes[id].length > 0) {
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
    };

    Route.prototype.__inputMap = function () {
        var startNodes = this.startNodes(), key, i;

        for (i = 0; i < startNodes.length; i++) {
            this._inputMap[startNodes[i]] = [];
        }

        for (key in this.routes) {
            for (i = 0; i < this.routes[key].length; i++) {
                if (!this._inputMap[this.routes[key][i]])
                    this._inputMap[this.routes[key][i]] = [];

                this._inputMap[this.routes[key][i]].push(key);
            }
        }

        return this._inputMap;
    };

    Route.prototype.inputMap = function () {
        return this._inputMap;
    };

    Route.prototype.batch = function () {
        var pos = this.position(), i, j, column, batch = [];

        if (!pos.length)
            return [];

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
    };

    Route.prototype.position = function () {
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
    };

    /**
    *
    * Create a position map of the last occurence
    *
    */
    Route.prototype.posMap = function () {
        var m = {}, i, j;
        for (i = 0; i < this._paths.length; i++) {
            for (j = 0; j < this._paths[i].length; j++) {
                if (!m[this._paths[i][j]] || m[this._paths[i][j]] < j) {
                    m[this._paths[i][j]] = j;
                }
            }
        }
        return m;
    };

    Route.prototype.links = function (l, r) {
        if (typeof l === "undefined") { l = "source"; }
        if (typeof r === "undefined") { r = "target"; }
        var links = [], obj = {}, key, i;

        for (key in this.routes) {
            for (i = 0; i < this.routes[key].length; i++) {
                obj = {};
                obj[l] = key;
                obj[r] = this.routes[key][i];

                links.push(obj);
            }
        }

        return links;
    };
    return Route;
})();

module.exports = Route;
