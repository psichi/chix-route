require('should');
var fs = require("fs");
var Flow = require('../flow.js');
var json;

describe("Flow test:", function () {

  before(function(done) {

    json = JSON.parse(fs.readFileSync(__dirname + '/fixtures/flow.json'));
    done();

  });

  it("Should flow", function (done) {

    var data = {
      "0": {
        "target": ["1","2"]
      },
      "1": {
        "target": ["2"]
      },
      "2": {
        "target": []
      }
    };

    var flow = new Flow(data);
    flow.paths("0").should.eql([
        [ '0', '1', '2' ],
        [ '0', '2' ]
    ]);
    
    done(); 

  });

  it("Should flow complex tree", function (done) {

    var data = {
      "0": {
        "target": ["1","2","3"]
      },
      "1": {
        "target": ["4","5"]
      },
      "2": {
        "target": ["5"]
      },
      "3": {
        "target": ['5']
      },
      "4": {
        "target": ['5']
      },
      "5": {
        "target": []
      }
    };

    var flow = new Flow(data);
    flow.paths("0").should.eql([
        [ '0', '1', '4', '5' ],
        [ '0', '1', '5' ],
        [ '0', '2', '5' ],
        [ '0', '3', '5' ]
    ]);
    
    done(); 

  });

  it("Should be able to provide a position map", function (done) {

    var data = {
      "0": {
        "target": ["1","2","3"]
      },
      "1": {
        "target": ["4","5"]
      },
      "2": {
        "target": ["5"]
      },
      "3": {
        "target": ['5']
      },
      "4": {
        "target": ['5']
      },
      "5": {
        "target": []
      }
    };

    var flow = new Flow(data);
    var paths = flow.paths("0");

    flow.posMap().should.eql({
      '0': 0,
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 2,
      '5': 3
    });

    done();

  });

});
