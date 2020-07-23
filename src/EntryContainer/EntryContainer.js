import React from 'react';
import Box from '@material-ui/core/Box';
import Entry from '../Entry/Entry.js';


class EntryContainer extends React.Component {
    // constructor(props) {
    //   super(props);
    // }
    render() {
      return (
        <Box className="EntryContainer">
          {this.props.content.map(function(val,idx) {
            return (<Entry
              entryMousedownHandler={this.props.entryMousedownHandler}
              entryMousemoveHandler={this.props.entryMousemoveHandler}
              entryTouchcancelHandler={this.handlelEntryMouseup}
              entryToggleHandler={this.props.entryToggleHandler}
              
              content={val.content} checked={val.checked} idx={idx} key={idx} isFirst={idx===0} isLast={idx===this.props.content.length-1}
              ref={val.ref}
              ></Entry>);
          }.bind(this))}
        </Box>
      )
    }
}
  
export default EntryContainer;