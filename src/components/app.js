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
    console.log('find duplicates: ' + array);
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

  checkBlocks(x, y, item) {
    let temp = this.props.state.slice();
    let self = this;

    let storeOfCoord = {
      0: ['00','01','02','10','11','12','20','21','22'],
      1: ['03','04','05','13','14','15','23','24','25'],
      2: ['06','07','08','16','17','18','26','27','28'],
      3: ['30','31','32','40','41','42','50','51','52'],
      4: ['33','34','35','43','44','45','53','54','55'],
      5: ['36','37','38','46','47','48','56','57','58'],
      6: ['60','61','62','70','71','72','80','81','82'],
      7: ['63','64','65','73','74','75','83','84','85'],
      8: ['66','67','68','76','77','78','86','87','88']
    }

    for (let key in storeOfCoord) {
      if (storeOfCoord[key].includes(x+''+y)) {
        return detectRegion(key);
      }
    }

    function sliceConcat(i, from, to) {
      return self.findDuplicates(temp[i].slice(from,to).concat(temp[i+1].slice(from,to).concat(temp[i+2].slice(from,to))));
    };

    function detectRegion(flag) {
      switch(flag) {
       case '0':
           return sliceConcat(0, 0, 3);
           break;
       case '1':
           return sliceConcat(0, 3, 6);
           break;
       case '2':
           return sliceConcat(0, 6, 9);
           break;
       case '3':
           return sliceConcat(3, 0, 3);
           break;
       case '4':
           return sliceConcat(3, 3, 6);
           break;
       case '5':
           return sliceConcat(3, 6, 9);
           break;
       case '6':
           return sliceConcat(6, 0, 3);
           break;
       case '7':
           return sliceConcat(6, 3, 6);
           break;
       case '8':
           return sliceConcat(6, 6, 9);
           break;
       default:
           break;
      }
    };
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
                  (item === ' ' || this.checkBlocks(i, j).includes(item) || this.checkRow(i, j).includes(item) || this.checkCollumn(j, i).includes(item)) ?
                    <td
                      style={{color:'red'}}
                      onClick={ () => { this.testMeth(i,j)}}>
                        { this.props.state[i][j] }
                    </td> :
                    <td> { item } </td> )}
                </tr>})
            }
          </tbody>
        </table>
        { this.props.statePopup && <Popup /> }
        <button onClick={ this.onButtonGenerateSudoku }>Generate sudoku!</button>
        <button>Start</button>
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
