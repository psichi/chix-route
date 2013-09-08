require('should');
var fs = require("fs");
var Route = require('../main.js');
var json;

describe("Route test:", function () {

  it("Should route", function (done) {

    var data = {
      "0": ["1","2"],
      "1": ["2"],
      "2": []
    };

    var route = new Route(data);
    route.paths("0").should.eql([
        [ '0', '1', '2' ],
        [ '0', '2' ]
    ]);
    
    done(); 

  });

  it("Should route complex tree", function (done) {

    var data = {
      "0": ["1","2","3"] ,
      "1": ["4","5"] ,
      "2": ["5"] ,
      "3": ['5'] ,
      "4": ['5'] ,
      "5": []
    };

    var route = new Route(data);
    route.paths("0").should.eql([
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
      "1": ["4", "14"],
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

    var route = new Route(data);
    var paths = route.paths("0");

    route.posMap().should.eql({
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

  it("Should position", function (done) {

    var data = {
      "0": ["1", "2", "3"],
      "1": ["4", "14"],
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

    var route = new Route(data);
    var paths = route.paths("0");

    route.position().should.eql(
      [
        [ '0', '1', '4',  '7',  '8', '13', '14', '15', '16' ],
        [ '0', '1', '4',  '9', '10', '13', '14', '15', '16' ],
        [ '0', '1',null, null, null, null, '14', '15', '16' ],
        [ '0', '2', '5',  '9', '10', '13', '14', '15', '16' ],
        [ '0', '3', '6', '11', '12', '13', '14', '15', '16' ]
      ]  
    );

    done();

  });
  it("Should batch", function (done) {

    var data = {
      "0": ["1", "2", "3"],
      "1": ["4", "14"],
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

    var route = new Route(data);
    var paths = route.paths("0");

    route.batch().should.eql( [
        [ '0' ],
        [ '1', '2', '3' ],
        [ '4', '5', '6' ],
        [ '7', '9', '11' ],
        [ '8', '10', '12' ],
        [ '13' ],
        [ '14' ],
        [ '15' ],
        [ '16' ]
    ]);

    done();

  });

  it("Should make an input map", function (done) {

    var data = {
      "0": ["1", "2", "3"],
      "1": ["4", "14"],
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

    var route = new Route(data);
    var paths = route.paths("0");

    route.inputMap().should.eql({
       "0":  [],
       "1":  ["0"],    
       "2":  ["0"],          
       "3":  ["0"],          
       "4":  ["1"],     
       "5":  ["2"],          
       "6":  ["3"],         
       "7":  ["4"],          
       "8":  ["7"],         
       "9":  ["4","5"],         
       "10":  ["9"],         
       "11":  ["6"],         
       "12":  ["11"],         
       "13":  ["8", "10", "12"],         
       "14":  ["1", "13"],         
       "15":  ["14"],         
       "16":  ["15"]  
    });

    done();

  });

  it("Should be able to start somewhere in the middle (just for fun)", function (done) {

    var data = {
      "0": ["1", "2", "3"],
      "1": ["4", "14"],
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

    var route = new Route(data);
    var paths = route.branch("4");
    paths.should.eql([
      [ '4', '7', '8', '13', '14', '15', '16' ],
      [ '4', '9', '10', '13', '14', '15', '16' ]
    ]);

    done();

  });

  it("Should be able to provide a source target collection array", function (done) {

    var data = {
      "0": ["1", "2", "3"],
      "1": ["4", "14"],
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

    var data = {
      "0": { "source": "", "target": "1" },
      "0": ["1", "2", "3"],
      "1": ["4", "14"],
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

    var route = new Route(data);
    route.paths("4");
    route.objectMap().should.eql([
        {
          "0": {
            source: null,
            target: null,
          }
        }
    ]);

    done();

  });

  it("Should handle chix-flow example data", function (done) {

    // consumable by chix-route
    var outputMap = {

      // Provider nodes
      "connect": ['connect-helloworld'], 
      "mongo": ['mongo-collection'], 
      "mongo-collection": ["mongo-insert", "mongo-list"],
      // Data nodes
      "mongo-insert": ["mongo-close"],
      "mongo-list": ["input-logger", "mongo-close"],
      "input-logger": [],
      "connect-helloworld": [],
      // Provider Node
      "mongo-close": []
    };

    var route = new Route(outputMap);
    var res = route.paths();
    route.inputMap().should.eql({
      // Provider nodes
      "connect": [], 
      "connect-helloworld": ["connect"],
      "mongo-collection": ["mongo"],
      "mongo-insert": ["mongo-collection"],
      "mongo-list": ["mongo-collection"],
      "mongo-close": ["mongo-insert", "mongo-list"],
      "mongo": [], 
      // Data nodes
      "input-logger": ["mongo-list"]
      // Provider Node
    });

    done();

  });

  it("Should determine start nodes", function (done) {

    var data = {
      "0": ["1", "2"],
      "1": ["4", "14"],
      "2": ["5"],
      "3": ["6"],
      "4": ["9"],
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

    var route = new Route(data);
    var startNodes = route.startNodes();
    startNodes.should.eql(["0","3","7"]);

    done();

  });

  it("Should route multiple start points", function (done) {

    var data = {
      "0": ["2"],
      "1": ["4", "5"],
      "2": ["5"],
      "3": ["6"],
      "4": ["6"],
      "5": ["7"],
      "6": [],
      "7": []
    };

    var route = new Route(data);
    var paths = route.paths();
    paths.should.eql([
        [ '0', '2', '5', '7' ],
        [ '1', '4', '6' ],
        [ '1', '5', '7' ],
        [ '3', '6' ]
    ]);


    done();

  });


});
