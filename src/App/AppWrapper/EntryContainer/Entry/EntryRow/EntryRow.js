import React from 'react';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ToggleButton from './ToggleButton/ToggleButton.js';
import ToggleExpandButton from './ToggleExpandButton/ToggleExpandButton.js';
import EntryContent from './EntryContent/EntryContent.js';
import '../Entry.css';

const EntryRow = React.forwardRef((props, ref) => (
  <div className={`Entry noselect
    ${props.isFirst ? 'Entry-first-in-list' : ''}
    ${props.isLast ? 'Entry-last-in-list' : ''}
    ${props.checked ? 'Entry-checked' : ''}`}

    onTouchMove={(e) => props.entryMousemoveHandler(e,props.idx)}
    onMouseMove={(e) => props.entryMousemoveHandler(e,props.idx)}
    ref={ref}
    >
      <ToggleButton toggleHandler={props.entryToggleHandler} checked={props.checked} idx={props.idx}/>
      <EntryContent content={props.content} />
      <DragHandleIcon className="Entry-drag-handle"
        // onTouchStart={function(e) {e.stopPropagation();props.entryMousedownHandler(e,props.idx)}}
        onMouseDown={(e) => props.entryMousedownHandler(e,props.idx)}
        onTouchStart={(e) => props.entryMousedownHandler(e,props.idx)}
        ></DragHandleIcon>
        <ToggleExpandButton></ToggleExpandButton>
  </div>
));

export default EntryRow;