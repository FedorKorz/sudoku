import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from "react-redux";

import { generateSudoku, showPopup, markItem } from "../actions/index";
import Popup from "./Popup";

class App extends Component {

  constructor(props) {
    super(props);

    this.testMeth = this.testMeth.bind(this);
    this.checkRow = this.checkRow.bind(this);
    this.checkBlocks = this.checkBlocks.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.checkCollumn = this.checkCollumn.bind(this);
    this.findDuplicates = this.findDuplicates.bind(this);
    this.checkAllDirections = this.checkAllDirections.bind(this);
    this.onButtonGenerateSudoku = this.onButtonGenerateSudoku.bind(this);
  }

  onButtonGenerateSudoku() {
    this.props.generateSudoku();
  }

  togglePopup() {
    this.props.showPopup();
  }

  testMeth(x,y) {
    console.log('testMeth');
    this.togglePopup();
    this.props.markItem(x, y);
  }

  findDuplicates(array) {
    function compare(a, b) {
      if (a.value > b.value) {
        return 1;
      }
      return -1;
    }

    let dup = [];

    array = array.sort().sort(compare);
    array.map((elem, i, a) => {
      if (a[i+1] !== undefined) {
        if (a[i+1].value == a[i].value && a[i].value !== ' ') {
          (dup.indexOf(a[i].value) === -1) ? dup.push(a[i].value) : []
        }
      }
    });
    console.log(dup);
    return dup;
  }

  checkRow(row) {
    return this.findDuplicates(this.props.state[row].slice());
  }

  checkCollumn(i, j) {
    let transArr = this.props.state.map(
      (row, y, arr) => row.map(
        (cell, x, line) => arr[x][y]
      )
    )[i].sort();
    return this.findDuplicates(transArr);
  }

  checkBlocks(x, y) {
    let x0 = x  - (x % 3);
    let y0 = y  - (y % 3);
    let tempArr = [];

    for (let iy = y0; iy < y0 + 3; iy++) {
       for (let ix = x0; ix < x0 + 3; ix++) {
           tempArr.push(this.props.state[ix][iy]);
       }
    }
    return this.findDuplicates(tempArr);
  }

  checkAllDirections() {
    
  }

  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            {
              this.props.state.map((elem, i) => {
                return <tr>
                   {elem.map((item, j) =>
                       <td>
                          { item.freezed ? <span style ={{color:'blue'}}> { this.props.state[i][j].value } </span> : <span onClick={ () => this.testMeth(i, j) }> {this.checkBlocks(i, j).includes(item.value) || this.checkRow(i, j).includes(item.value) || this.checkBlocks(i, j).includes(item.value) ? <span style={{color:'red'}}>{ item.value }</span> : item.value } </span>}
                        </td>)}
                       </tr>})
            }
          </tbody>
        </table>
        { this.props.statePopup && <Popup /> }
        <button onClick={ this.onButtonGenerateSudoku }>Generate sudoku!</button>
        <button onClick={ this.getPropertyObj }>Start</button>
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

// {
//   this.props.state.map((elem, i) => {
//     return <tr>
//     { elem.map((item, j) =>
//         (item === ' ' || this.checkRow(i, j).includes(item.value) || this.checkCollumn(j, i).includes(item.value) || this.checkBlocks(i, j).includes(item.value)) ?
//         <td
//           style={{color:'pink'}}
//           onClick={ () => { this.testMeth(i,j)} }>
//             { this.props.state[i][j].value }
//         </td> :
//         <td> { item.value } </td> )}
//     </tr>})
// }
