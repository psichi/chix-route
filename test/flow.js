require('should');
var fs = require("fs");
var Flow = require('../flow.js');
var json;

describe("Flow test:", function () {

  it("Should flow", function (done) {

    var data = {
      "0": ["1","2"],
      "1": ["2"],
      "2": []
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
      "0": ["1","2","3"] ,
      "1": ["4","5"] ,
      "2": ["5"] ,
      "3": ['5'] ,
      "4": ['5'] ,
      "5": []
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

  it("Should create posMap", function (done) {

    var data = {
      "0": ["1", "2", "3"],
      "1": ["4"],
      "2": ["5"],
      "3": ["6"],
      "4": ["7", "9"],
      "5": ["9"],
      "6": ["11"],
      "7": ["8"],
      "8": ["13"],
      "9": ["10"],
      "10": ["13"],
      "11": ["12"],
      "12": ["13"],
      "13": ["14"],
      "14": ["15"],
      "15": ["16"],
      "16": []
    };

    var flow = new Flow(data);
    var paths = flow.paths("0");

    flow.posMap().should.eql({
        '0': 0,
        '1': 1,
        '2': 1,
        '3': 1,
        '4': 2,
        '5': 2,
        '6': 2,
        '7': 3,
        '8': 4,
        '9': 3,
        '10': 4,
        '11': 3,
        '12': 4,
        '13': 5,
        '14': 6,
        '15': 7,
        '16': 8
    });

    done();

  });

});
