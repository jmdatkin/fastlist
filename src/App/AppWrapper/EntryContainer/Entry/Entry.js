import React from 'react';
import EntryRow from './EntryRow/EntryRow.js';
import './Entry.css';

const Entry = React.forwardRef((props, ref) => (
  <div 
  className={`Entry noselect 
  ${props.isFirst ? 'Entry-first-in-list'  : ''}
  ${props.isLast ? 'Entry-last-in-list ' : ''}
  ${props.checked ? 'Entry-checked ' : ''}`}>
    <EntryRow 
      entryMousemoveHandler={props.entryMousemoveHandler}
      entryMousedownHandler={props.entryMousedownHandler}
      checked={props.checked}
      content={props.content}
      idx={props.idx}
      ref={ref}
      >
    </EntryRow>
  </div>
  // <div className={`Entry noselect

  //   ref={ref}
  //   >
  //     <ToggleButton toggleHandler={props.entryToggleHandler} checked={props.checked} idx={props.idx}/>
  //     <EntryContent content={props.content} />
  //     <DragHandleIcon className="Entry-drag-handle"
  //       // onTouchStart={function(e) {e.stopPropagation();props.entryMousedownHandler(e,props.idx)}}
  //       onMouseDown={(e) => props.entryMousedownHandler(e,props.idx)}
  //       onTouchStart={(e) => props.entryMousedownHandler(e,props.idx)}
  //       ></DragHandleIcon>
  //       <ToggleExpandButton></ToggleExpandButton>
  // </div>
));

export default Entry;