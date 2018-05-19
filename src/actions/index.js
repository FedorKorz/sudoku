import createFragment from 'react-addons-create-fragment';

export const GENERATE_SUDOKU_ARRAY = "GENERATE_SUDOKU_ARRAY";
export const INSERT_VALUE = "INSERT_VALUE";
export const СLOSE_POPUP = "СLOSE_POPUP";
export const SHOW_POPUP = "SHOW_POPUP";
export const MARK_ITEM = "MARK_ITEM";

export function generateSudoku() {

  function Grid(field) {
    this.field = field;
    this.swap = function(rowOne, rowTwo) {
      var tempArr = [];
      tempArr = this.field[rowOne];
      this.field[rowOne] = this.field[rowTwo];
      this.field[rowTwo] = tempArr;
    }
    this.show = function() {
      return this.field;
    }
  };

  let constValue1 = {
    value: 1,
    freezed: true
  };

  let constValue2 = {
    value: 2,
    freezed: true
  };

  let constValue3 = {
    value: 3,
    freezed: true
  };

  let constValue4 = {
    value: 4,
    freezed: true
  };

  let constValue5 = {
    value: 5,
    freezed: true
  };

  let constValue6 = {
    value: 6,
    freezed: true
  };

  let constValue7 = {
    value: 7,
    freezed: true
  };

  let constValue8 = {
    value: 8,
    freezed: true
  };

  let constValue9 = {
    value: 9,
    freezed: true
  };

  let freeSpace = {
    value: '___',
    freezed: false
  };

  var grid = new Grid([[ constValue5, constValue3, freeSpace, freeSpace, constValue7, freeSpace, freeSpace, freeSpace, freeSpace ],
                       [ constValue6, freeSpace, freeSpace, constValue1, constValue9, constValue5, freeSpace, freeSpace, freeSpace ],
                       [ freeSpace, constValue9, constValue8, freeSpace, freeSpace, freeSpace, freeSpace, constValue6, freeSpace ],
                       [ constValue8, freeSpace, freeSpace, freeSpace, constValue6, freeSpace, freeSpace, freeSpace, constValue3 ],
                       [ constValue4, freeSpace, freeSpace, constValue8, freeSpace, constValue3, freeSpace, freeSpace, constValue1 ],
                       [ constValue7, freeSpace, freeSpace, freeSpace, constValue2, freeSpace, freeSpace, freeSpace, constValue6 ],
                       [ freeSpace, constValue6, freeSpace, freeSpace, freeSpace, freeSpace, constValue2, constValue8, freeSpace ],
                       [ freeSpace, freeSpace, freeSpace, constValue4, constValue1, constValue9, freeSpace, freeSpace, constValue5 ],
                       [ freeSpace, freeSpace, freeSpace, freeSpace, constValue8, freeSpace, freeSpace, constValue7, constValue9 ]]);

 // var grid = new Grid([[ 5, 3, ' ', ' ', 7, ' ', ' ', ' ', ' ' ],
 //                      [ 6, ' ', ' ', 1, 9, 5, ' ', ' ', ' ' ],
 //                      [ ' ', 9, 8, ' ', ' ', ' ', ' ', 6, ' ' ],
 //                      [ 8, ' ', ' ', ' ', 6, ' ', ' ', ' ', 3 ],
 //                      [ 4, ' ', ' ', 8, ' ', 3, ' ', ' ', 1 ],
 //                      [ 7, ' ', ' ', ' ', 2, ' ', ' ', ' ', 6 ],
 //                      [ ' ', 6, ' ', ' ', ' ', ' ', 2, 8, ' ' ],
 //                      [ ' ', ' ', ' ', 4, 1, 9, ' ', ' ', 5 ],
 //                      [ ' ', ' ', ' ', ' ', 8, ' ', ' ', 7, 9 ]]);

  Grid.prototype.transposing = function() {
    this.field = this.field.map(
      (row, y, arr) => row.map(
        (cell, x, line) => arr[x][y]
      )
    );
  };

  Grid.prototype.swapRowsSmall = function() {
    this.changeRows(this.field, 1);
  };

  Grid.prototype.swapRowsBig = function() {
    this.changeRows(this.field, 2);
  };

  Grid.prototype.swapColsSmall = function() {
    this.transposing();
    this.changeRows(this.field, 1);
    this.transposing();
  };

  Grid.prototype.swapColsBig = function() {
    this.transposing();
    this.changeRows(this.field, 2);
    this.transposing();
  };

  Grid.prototype.swapAreaVertSmall = function() {
    this.changeAreas(this.field, 3);
  };

  Grid.prototype.swapAreaHorzSmall = function() {
    this.transposing();
    this.changeAreas(this.field, 3);
    this.transposing();
  };

  Grid.prototype.swapAreaVertBig = function() {
    this.transposing();
    this.changeAreas(this.field, 6);
    this.transposing();
  };

  Grid.prototype.changeRows = function(field, indexOfChangingRow) {
    for (let row = 0; row < field.length; row = row + 3) {
      let nearRow = row + indexOfChangingRow;
      this.swap(row, nearRow);
    }
  };

  Grid.prototype.changeAreas = function(field, indexOfChangingRow) {
    for (let row = 0; row < 3; row++) {
      let furtherRow = row + indexOfChangingRow;
      this.swap(row, furtherRow);
    }
  };

  Grid.prototype.resolve = function(x, y, solution) {
    this.field[x][y] = solution;
  }

  Grid.prototype.randomize = function() {
    let arrOfswaps = [
      'this.transposing()',
      'this.swapRowsSmall()',
      'this.swapRowsBig()',
      'this.swapColsSmall()',
      'this.swapColsBig()',
      'this.swapRowsSmall()',
      'this.swapAreaVertSmall()',
      'this.swapAreaVertBig()',
      'this.swapColsSmall()',
      'this.swapAreaVertSmall()'
    ];
    for (let i = 0; i < 50; i++) {
      let rnd = Math.floor(Math.random() * (10));
      eval(arrOfswaps[rnd]);
    }
  }

  Grid.prototype.generateEmptyCells = function() {
    for (let i = 0; i < 10; i++) {
      let rnd = Math.floor(Math.random() * (10));
    }
  }

  // grid.randomize();
  grid.generateEmptyCells();

  function getRandom(min, max) {
    this.min = 0;
    this.max = max || grid.field.length-1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    type: GENERATE_SUDOKU_ARRAY,
    payload: grid.field
  };
}

export function insertValue(val) {
  return {
    type: INSERT_VALUE,
    payload: {
      value:val,
      freezed: false
    }
  };
}

export function showPopup() {
  return {
    type: SHOW_POPUP
  };
}

export function closePopup() {
  return {
    type: СLOSE_POPUP
  };
}

export function markItem(x, y) {
  return {
    type: MARK_ITEM,
    coord_x: x,
    coord_y: y
  };
}
