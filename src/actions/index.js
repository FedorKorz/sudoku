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

  var grid = new Grid([[ 5, 3, ' ', ' ', 7, ' ', ' ', ' ', ' ' ],
                       [ 6, ' ', ' ', 1, 9, 5, ' ', ' ', ' ' ],
                       [ ' ', 9, 8, ' ', ' ', ' ', ' ', 6, ' ' ],
                       [ 8, ' ', ' ', ' ', 6, ' ', ' ', ' ', 3 ],
                       [ 4, ' ', ' ', 8, ' ', 3, ' ', ' ', 1 ],
                       [ 7, ' ', ' ', ' ', 2, ' ', ' ', ' ', 6 ],
                       [ ' ', 6, ' ', ' ', ' ', ' ', 2, 8, ' ' ],
                       [ ' ', ' ', ' ', 4, 1, 9, ' ', ' ', 5 ],
                       [ ' ', ' ', ' ', ' ', 8, ' ', ' ', 7, 9 ]]);

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

  grid.randomize();
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

export function insertValue(value) {
  return {
    type: INSERT_VALUE,
    payload: value
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
