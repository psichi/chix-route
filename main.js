var Route = (function () {
    function Route() {
        this._paths = [];
        this._inputMap = {};
        this.routes = {};
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
            if (that.routes[id] && that.routes[id].length > 0) {
                for (var i = 0; i < that.routes[id].length; i++) {
                    var d = ref.slice(0);
                    console.log('%s: pushing:', id, that.routes[id][i]);
                    d.push(that.routes[id][i]);
                    __paths(that.routes[id][i], d);
                }
            } else {
                console.log('%s: pushing:', id, ref);
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
                    this._paths[i].splice(j, 0, null);
                }
            }
        }

        return this._paths;
    };

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

    Route.prototype.load = function (routes) {
        this.routes = routes;

        this.__inputMap();
    };

    Route.prototype.loadSourceTargetWithPorts = function (st, s, t) {
        if (typeof s === "undefined") { s = "source"; }
        if (typeof t === "undefined") { t = "target"; }
    };

    Route.prototype.loadSourceTarget = function (st, s, t) {
        if (typeof s === "undefined") { s = "source"; }
        if (typeof t === "undefined") { t = "target"; }
        var i;

        this.routes = {};

        for (i = 0; i < st.length; i++) {
            if (!this.routes[st[i][s]])
                this.routes[st[i][s]] = [];
            if (this.routes[st[i][s]].indexOf(st[i][t]) === -1) {
                this.routes[st[i][s]].push(st[i][t]);
            }
        }

        console.log('routes:', this.routes);

        this.__inputMap();
    };

    Route.prototype.links = function (s, t) {
        if (typeof s === "undefined") { s = "source"; }
        if (typeof t === "undefined") { t = "target"; }
        var links = [], obj = {}, key, i;

        for (key in this.routes) {
            for (i = 0; i < this.routes[key].length; i++) {
                obj = {};
                obj[s] = key;
                obj[t] = this.routes[key][i];

                links.push(obj);
            }
        }

        return links;
    };
    return Route;
})();

module.exports = Route;
