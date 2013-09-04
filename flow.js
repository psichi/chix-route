var Flow = (function () {
    function Flow(flow) {
        this.flow = flow;
        this._paths = [];
    }
    Flow.prototype.paths = function (root) {
        var that = this;
        function __paths(id, ref) {
            if (that.flow[id].length > 0) {
                for (var i = 0; i < that.flow[id].length; i++) {
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
    };

    Flow.prototype.batch = function () {
        var pos = this.position();

        if (!pos.length)
            return [];

        var batch = [];
        for (var i = 0; i < pos[0].length; i++) {
            var column = [];
            for (var j = 0; j < pos.length; j++) {
                if (column.indexOf(pos[j][i]) < 0 & pos[j][i] !== null) {
                    column.push(pos[j][i]);
                }
            }

            batch.push(column);
        }

        return batch;
    };

    Flow.prototype.position = function () {
        var posMap = this.posMap();
        for (var i = 0; i < this._paths.length; i++) {
            for (var j = 0; j < this._paths[i].length; j++) {
                if (j < posMap[this._paths[i][j]]) {
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
    Flow.prototype.posMap = function () {
        var m = {};
        for (var i = 0; i < this._paths.length; i++) {
            for (var j = 0; j < this._paths[i].length; j++) {
                if (!m[this._paths[i][j]] || m[this._paths[i][j]] < j) {
                    m[this._paths[i][j]] = j;
                }
            }
        }
        return m;
    };
    return Flow;
})();

module.exports = Flow;
