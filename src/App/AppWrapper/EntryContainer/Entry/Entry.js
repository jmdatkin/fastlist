import React from 'react';
import EntryRow from './EntryRow/EntryRow.js';
import EntrySubmenu from './EntrySubmenu/EntrySubmenu.js';
import './Entry.css';

const Entry = React.forwardRef((props, ref) => (
  <div 
  className={`Entry noselect 
  ${props.isFirst ? 'Entry-first-in-list'  : ''}
  ${props.isLast ? 'Entry-last-in-list ' : ''}
  ${props.isChecked ? 'Entry-checked ' : ''}
  ${props.isExpanded ? 'Entry-expanded ' : ''}`}
  ref={ref}>
    <EntryRow 
      entryMousemoveHandler={props.entryMousemoveHandler}
      entryMousedownHandler={props.entryMousedownHandler}
      entryExpandHandler={props.entryExpandHandler}
      entryToggleHandler={props.entryToggleHandler}
      content={props.content}
      isChecked={props.isChecked}
      isExpanded={props.isExpanded}
      idx={props.idx}
      >
    </EntryRow>
    {(props.isExpanded) ? <EntrySubmenu /> : ''}
  </div>
));

export default Entry;