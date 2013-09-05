Chiχ route
=========

```

                input:                  posMap:
       / | \    "0":  ["1", "2", "3"],  '0': 0,
      1  2  3   "1":  ["4", "14"],      '2': 1,
    / |  |  |   "2":  ["5"],            '1': 1,
   |  4  5  6   "3":  ["6"],            '3': 1,
   |  |\ |  |   "4":  ["7", "9"],       '4': 2,
   |  7  9 11   "5":  ["9"],            '5': 2,
   |  |  |  |   "6":  ["11"],           '6': 2,
    \ 8 10 12   "7":  ["8"],            '7': 3,
     \ \ | /    "8":  ["13"],           '8': 4,
      \  13     "9":  ["10"],           '9': 3,
       \ |     "10":  ["13"],          '10': 4,
        14     "11":  ["12"],          '11': 3,
         |     "12":  ["13"],          '12': 4,
        15     "13":  ["14"],          '13': 5,
         |     "14":  ["15"],          '14': 6,
        16     "15":  ["16"],          '15': 7,
               "16":  []               '16': 8
              }                       }
```


paths:
------
```
[
  [ '0', '1', '4',  '7',  '8', '13', '14', '15', '16' ],
  [ '0', '1', '4',  '9', '10', '13', '14', '15', '16' ],
  [ '0', '1', '14', '15', '16' ],
  [ '0', '2', '5',  '9', '10', '13', '14', '15', '16' ],
  [ '0', '3', '6', '11', '12', '13', '14', '15', '16' ]
]
```

position:
---------
```
[
  [ '0', '1', '4',  '7',  '8', '13', '14', '15', '16' ],
  [ '0', '1', '4',  '9', '10', '13', '14', '15', '16' ],
  [ '0', '1',null, null, null, null, '14', '15', '16' ],
  [ '0', '2', '5',  '9', '10', '13', '14', '15', '16' ],
  [ '0', '3', '6', '11', '12', '13', '14', '15', '16' ]
]
```

`internal` strike:
------------------
```
[
  [ '0', '1', '4',  '7',  '8', '13', '14', '15', '16' ],
  [   x,   x,   x,  '9', '10',    x,    x,    x,    x ],
  [   x,   x,null, null, null, null,    x,    x,    x ],
  [   x, '2', '5',    x,    x,    x,    x,    x,    x ],
  [   x, '3', '6', '11', '12',    x,    x,    x,    x ]
]
```

batch:
------
```
[
  [
   ['0'],
   ['1','2','3'],
   ['4','5','6'],
   ['7','9','11'],
   ['8','10','12'],
   ['13'],
   ['14'],
   ['15'],
   ['16']
 ]
]
```

input map:
----------
```
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
10":  ["9"],         
11":  ["6"],         
12":  ["11"],         
13":  ["8", "10", "12"],         
14":  ["1", "13"],         
15":  ["14"],         
16":  ["15"]              
```
