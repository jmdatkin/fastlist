import React from 'react';
// import { TransitionGroup } from 'react-transition-group';
import './EntryContainer.css';
import Box from '@material-ui/core/Box';
import Entry from './Entry/Entry.js';


class EntryContainer extends React.Component {
    // constructor(props) {
    //   super(props);
    // }
    render() {
      return (
          <Box className="EntryContainer" height="sm">
            {this.props.content.map(function(val,idx) {
              return (<Entry
                entryMousedownHandler={this.props.entryMousedownHandler}
                entryMousemoveHandler={this.props.entryMousemoveHandler}
                entryToggleHandler={this.props.entryToggleHandler}
                entryExpandHandler={this.props.entryExpandHandler}
                
                content={val.content}
                isChecked={val.isChecked}
                isExpanded={val.isExpanded}
                idx={idx} key={idx}
                isFirst={idx===0} isLast={idx===this.props.content.length-1}
                ref={val.ref}
                ></Entry>);
            }.bind(this))}
          </Box>
      )
    }
}
  
export default EntryContainer;