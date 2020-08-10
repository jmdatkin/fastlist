import React from 'react';
import EntryRow from './EntryRow/EntryRow.js';
import EntrySubmenu from './EntrySubmenu/EntrySubmenu.js';
import './Entry.css';

class Entry extends React.Component {
  constructor(props,state) {
    super(props);
    this.state = {
      detailValue: ''
    }

    this.handleDetailInputChange = this.handleDetailInputChange.bind(this);
  }

  handleDetailInputChange(e) {
    console.log(e.target.value);
    this.setState({
      detailValue: e.target.value
    });
  }

  render() {
    return (
      <div 
      className={`Entry noselect 
      ${this.props.isFirst ? 'Entry-first-in-list'  : ''}
      ${this.props.isLast ? 'Entry-last-in-list ' : ''}
      ${this.props.isChecked ? 'Entry-checked ' : ''}
      ${this.props.isExpanded ? 'Entry-expanded ' : ''}`}
      ref={this.props.innerRef}>
        <EntryRow 
          entryMousemoveHandler={this.props.entryMousemoveHandler}
          entryMousedownHandler={this.props.entryMousedownHandler}
          entryExpandHandler={this.props.entryExpandHandler}
          entryToggleHandler={this.props.entryToggleHandler}
          detailInputChangeHandler={this.handleDetailInputChange}
          content={this.props.content}
          detail={this.state.detailValue}
          isChecked={this.props.isChecked}
          isExpanded={this.props.isExpanded}
          idx={this.props.idx}
          >
        </EntryRow>
        {/* {(this.props.isExpanded) ? <EntrySubmenu /> : ''} */}
      </div>
    );
  }
};

export default React.forwardRef((props,ref) =>
  <Entry innerRef={ref} {...props}></Entry>
);