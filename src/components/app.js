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
    this.onButtonGenerateSudoku = this.onButtonGenerateSudoku.bind(this);
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

  findDuplicates(array) {
    let dup = [];
    array = array.sort();
    array.map((elem, i, a) => {
      if (a[i+1] == a[i] && a[i] !== ' ') {
        (dup.indexOf(a[i]) === -1) ? dup.push(a[i]) : []
      }
    });
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

    return this.findDuplicates(transArr)
  }

  checkBlocks(x, y) {
    let temp = this.props.state.slice();
    let flag = '';

    let storeOfCoord = {
      0: ['00', '01', '02', '03', '04', '05','06', '07', '08'],
      1: ['10', '11', '12', '13', '14', '15','16', '17', '18'],
      2: ['20', '21', '22', '23', '24', '25','26', '27', '28'],
      3: ['30', '31', '32', '33', '34', '35','36', '37', '38'],
      4: ['40', '41', '42', '43', '44', '45','46', '47', '48'],
      5: ['50', '51', '52', '53', '54', '55','56', '57', '58'],
      6: ['60', '61', '62', '63', '64', '65','66', '67', '68'],
      7: ['70', '71', '72', '73', '74', '75','76', '77', '78'],
      8: ['80', '81', '82', '83', '84', '85','86', '87', '88']
    }

    for (let key in storeOfCoord) {
      if (storeOfCoord[key].indexOf(x+''+y) !== -1) {
        flag = key;
      }
    }

    //0   0,1,2 slice 0,3
    //1   0,1,2 slice 3,6
    //2   0,1,2 slice 6,9

    //3   3,4,5 slice 0,3
    //4   3,4,5 slice 3,6
    //5   3,4,5 slice 6,9

    //6   6,7,8 slice 0,3
    //7   6,7,8 slice 3,6
    //8   6,7,8 slice 6,9

    console.log(temp[x].slice(0,3).concat(temp[x+1].slice(0,3).concat(temp[x+2].slice(0,3))));

    return
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
                  (item === ' ' || this.checkCollumn(j, i).indexOf(item) !== -1 || this.checkRow(i, j).indexOf(item) !== -1) ?
                    <td
                      style={{color:'red'}}
                      onClick={ () => { this.testMeth(i,j)}}>
                        { this.props.state[i][j] }
                    </td> :
                    <td> { item  } </td> )}
                </tr>})
            }
          </tbody>
        </table>
        { this.props.statePopup && <Popup /> }
        <button onClick={ this.onButtonGenerateSudoku }>Generate sudoku!</button>
        <button onClick={ () => this.checkBlocks(0,0) }>Start</button>
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
