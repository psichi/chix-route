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

    Flow.prototype.setPaths = function (paths) {
        this._paths = paths;
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
