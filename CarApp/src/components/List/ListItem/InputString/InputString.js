import React from 'react';
import { Row, Col } from '../../../';
import InputAutocomplete from './InputAutocomplete/InputAutocomplete';
import classes from './InputString.module.scss';

class InputString extends React.Component{

  state = {
    isAutoOpen: false,
  }

  componentDidMount(){
    this.INPUT = document.getElementById(this.props.name);
    this.INPUT.value = this.props.default ? this.props.default : '';
  }

  getAutocomplete = () => {
    if(this.props.autocomplete === undefined) return;
    if(typeof this.props.autocomplete === 'string'){
      return this.props.autocomplete;
    } else {
      return 'off';
    }
  }

  setInputValue = (value) => {
    this.INPUT.value = value;
  }

  openAutoComplete = (state) => {
    this.setState({ isAutoOpen: state });
  }

   render(){
      return(
        <div className={classes.Container}>
          <Row>
            <Col>
              <label htmlFor={this.props.name} className={classes.InputLabel}>{this.props.name}</label>
            </Col>
            <Col>
              <div className={classes.InputContainer} onFocus={() => this.openAutoComplete(true)} onBlur={() => this.openAutoComplete(false)}>
                <input id={this.props.name} type="text" placeholder={this.props.placeholder ? this.props.placeholder : 'Enter value for: ' + this.props.name} onChange={(e) => this.props.callback(e.target.value)} className={classes.InputString} autoComplete={this.getAutocomplete()}/>
                <InputAutocomplete selectFn={this.setInputValue} active={this.state.isAutoOpen} autocomplete={this.props.autocomplete} autocompleteProp={this.props.autocompleteProp} callback={this.props.callback}/>
              </div>
            </Col>
          </Row>
        </div>
      );
   }
}

export default InputString
