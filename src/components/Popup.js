import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import React, { Component } from 'react';

import { closePopup, insertValue } from "../actions/index";

class Popup extends Component {

	constructor(props) {
  	super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(inputValue) {
		this.props.insertValue(inputValue);
		this.props.closePopup();
  }

  render() {
  	const { placeholder } = this.props;
		let varOfvalues = [1,2,3,4,5,6,7,8,9];
    return (
      <div className='popup'>
        <h1>{this.props.text}</h1>
					<table className = 'popup-table'>
						<tbody>
							<tr>
								<td onClick = {() => this.handleSubmit(1)}>1</td>
								<td onClick = {() => this.handleSubmit(2)}>2</td>
								<td onClick = {() => this.handleSubmit(3)}>3</td>
							</tr>
							<tr>
								<td onClick = {() => this.handleSubmit(4)}>4</td>
								<td onClick = {() => this.handleSubmit(5)}>5</td>
								<td onClick = {() => this.handleSubmit(6)}>6</td>
							</tr>
							<tr>
								<td onClick = {() => this.handleSubmit(7)}>7</td>
								<td onClick = {() => this.handleSubmit(8)}>8</td>
								<td onClick = {() => this.handleSubmit(9)}>9</td>
							</tr>
						</tbody>
					</table>
      </div>
    );
  }
}

function mapStateToProps({ statePopup }) {
  return { statePopup };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closePopup, insertValue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
