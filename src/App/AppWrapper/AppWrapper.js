import React from 'react';
import './AppWrapper.css';
import Container from '@material-ui/core/Container';
import EntryContainer from './EntryContainer/EntryContainer.js';
import InputComponent from './InputComponent/InputComponent.js';


function coordsInRect(x,y,x1,y1,w,h) {
  let x2 = x1+w;
  let y2 = y1+h;
  return (
    (x1 <= x && x2 >= x) &&
    (y1 <= y && y2 >= y)
  );
}

class AppWrapper extends React.Component {
    constructor() {
      super();
      this.state = {
        value: '',
        entryList: [],
        mouseDownIndex: null
      };
      this.handleEntryMousedown = this.handleEntryMousedown.bind(this);
      this.handleEntryMousemove = this.handleEntryMousemove.bind(this);
      this.handleEntryMouseup = this.handleEntryMouseup.bind(this);
      this.handleEntryToggle = this.handleEntryToggle.bind(this);
      this.handleEntryExpand = this.handleEntryExpand.bind(this);
      this.handleFieldInputChange = this.handleFieldInputChange.bind(this);

      //Input
      this.doSubmit = this.doSubmit.bind(this);
    }


    //Content Events
    handleEntryMousedown(e,idx) {
      this.setState({
        mouseDownIndex: idx
      });
    }

    handleEntryMousemove(e,idx) {
      //Due to the nature of touch events, the target of touchmove will only ever refer to the target of the preceding touchstart.
      //If event is coming from a mobile context, redefine idx by computing target element based on touch position
      if (e.type === "touchmove") {
        e.preventDefault();
        //Iterate through each element and test if touch position is contained within its bounding rect.
        this.state.entryList.forEach(function(val,elIdx) {
          var boundingRect = val.ref.current.getBoundingClientRect();
          if (coordsInRect(
            e.touches[0].pageX,
            e.touches[0].pageY,
            boundingRect.left,
            boundingRect.top,
            boundingRect.width,
            boundingRect.height)) {
              //If touch is over an element, update idx to reflect this element.
              idx = elIdx;
            }
        });
      }
      
      var mouseDownIndex = this.state.mouseDownIndex;
      if (mouseDownIndex !== null) {
        if (idx !== mouseDownIndex) {
          var temp = this.state.entryList;
          [temp[mouseDownIndex], temp[idx]] = [temp[idx], temp[mouseDownIndex]];
          this.setState({
            entryList: temp,
            mouseDownIndex: idx
          });
        }
        else {
          return false;
        }
      }
    }

    handleEntryMouseup(e) {
      if (e.type==="touchcancel")
        console.log("touch canceled");
      this.setState({
        mouseDownIndex: null
      });
    }

    
    handleEntryToggle(e,idx,checked) {
      var temp = this.state.entryList;
      temp[idx].isChecked = !checked;
      this.setState({
        entryList: temp
      });
    }

    handleEntryExpand(e,idx,expanded) {
      console.log("called");
      var temp = this.state.entryList;
      temp[idx].isExpanded = !expanded;
      this.setState({
        entryList: temp
      });
    }
  

    //Input Events
    handleFieldInputChange(e) {
      this.setState({
        value: e.target.value
      });
    }
  
    doSubmit(e) {
      //Enter pressed
      if (e.which === 13 && this.state.value !== '') {
        this.setState({
          entryList: this.state.entryList.concat({
            content: this.state.value,
            isChecked: false,
            isExpanded: false,
            ref: React.createRef()
          }),
          value: ''
        });
        //Clear input
        e.target.value = '';
      }
    }
  
    render() {
      return (
        <Container className="AppWrapper"  style={{padding: "15px"}} maxWidth="sm"
          onMouseUp={this.handleEntryMouseup}
          onTouchEnd={this.handleEntryMouseup}>
          <EntryContainer
            entryMousedownHandler={this.handleEntryMousedown}
            entryMousemoveHandler={this.handleEntryMousemove}
            entryExpandHandler={this.handleEntryExpand}
            entryToggleHandler={this.handleEntryToggle}
            content={this.state.entryList}>
          </EntryContainer>
          <InputComponent
            onChangeHandler={this.handleFieldInputChange}
            onKeyPressHandler={this.doSubmit}>
          </InputComponent>
        </Container>
      );
    }
  }

  export default AppWrapper;