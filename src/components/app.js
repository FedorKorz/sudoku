import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from "react-redux";

import { generateSudoku, showPopup, markItem } from "../actions/index";
import Popup from "./Popup";

class App extends Component {

  constructor(props) {
    super(props);
    this.onButtonGenerateSudoku = this.onButtonGenerateSudoku.bind(this);
    this.checkCollumn = this.checkCollumn.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.testMeth = this.testMeth.bind(this);
    this.checkRow = this.checkRow.bind(this);
  }

  onButtonGenerateSudoku() {
    this.props.generateSudoku();
  }

  togglePopup() {
    this.props.showPopup();
  }

  testMeth(x,y) {
    this.togglePopup();
    this.props.markItem(x, y);
  }

  checkRow(x, y) {
    let sortedArr = this.props.state[x].slice().sort();
    let dup = [];
    sortedArr.map((elem, i, arr) => {
      if (arr[i+1] == arr[i] && arr[i] !== ' ') {
        (dup.indexOf(arr[i]) === -1) ? dup.push(arr[i]) : []
      }
    });
    return dup;
  }

  checkCollumn(i, j) {
    let dup = [];
    let transArr = this.props.state.map(
      (row, y, arr) => row.map(
        (cell, x, line) => arr[x][y]
      )
    );
    transArr = transArr[i].sort();
    transArr.map((elem, i, arr) => {
      if (arr[i+1] == arr[i] && arr[i] !== ' ') {
        (dup.indexOf(arr[i]) === -1) ? dup.push(arr[i]) : []
      }
    });
    console.log(dup);
    return dup
  }

  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            {
              this.props.state.map((elem, i) => {
                return <tr> {elem.map((item, j) => (item === ' ' || this.checkCollumn(j, i).indexOf(item) !== -1 || this.checkRow(i, j).indexOf(item) !== -1) ?  <td style={{color:'red'}} onClick={ () => { this.testMeth(i,j) }}> { this.props.state[i][j]  } </td> : <td> { item  } </td> )}</tr>})
            }
          </tbody>
        </table>
        { this.props.statePopup && <Popup /> }
        <button onClick={ this.onButtonGenerateSudoku }>Generate sudoku!</button>
      </div>
    );
  }
}

function mapStateToProps({ state, statePopup }) {
  return { state, statePopup };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ generateSudoku, showPopup, markItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// (function checkRow(x, y) {
//   for (let i = 1; i <= grid.field.length; i++) {
//     if (grid.field[x].indexOf(i) === -1 && checkCollumn(x, y, i) && checkRegion(x, y, i)) {
//       variants.push(i);
//     }
//   }
//
//   function checkCollumn(x, y, i) {
//     let flag = false;
//     grid.transposing();
//     (grid.field[y].indexOf(i) === -1) ? flag = true : [];
//     grid.transposing();
//     return flag;
//   };
// })
