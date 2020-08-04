import React from 'react';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ToggleButton from './ToggleButton/ToggleButton.js';
import ToggleExpandButton from './ToggleExpandButton/ToggleExpandButton.js';
import EntryContent from './EntryContent/EntryContent.js';
import EntryDetail from './EntryDetail/EntryDetail.js';
import TextField from '@material-ui/core/TextField';
import './EntryRow.css';

const EntryRow = (props) => (//React.forwardRef((props, ref) => (
  <div
    className={`EntryRow
    ${props.isExpanded ? 'EntryRow-expanded' : ''}`}
    
    onTouchMove={(e) => props.entryMousemoveHandler(e,props.idx)}
    onMouseMove={(e) => props.entryMousemoveHandler(e,props.idx)}>
      <ToggleButton entryToggleHandler={props.entryToggleHandler}
      isChecked={props.isChecked} idx={props.idx}/>
      <EntryContent content={props.content} />

      {(props.isExpanded)
      ? <TextField onChange={props.detailInputChangeHandler} id="standard-basic" variant="standard"
        value={props.detail}>
      </TextField>
      : <EntryDetail detail={props.detail}></EntryDetail>}

      <DragHandleIcon className="Entry-drag-handle"
        onMouseDown={(e) => props.entryMousedownHandler(e,props.idx)}
        onTouchStart={(e) => props.entryMousedownHandler(e,props.idx)}
        ></DragHandleIcon>
        <ToggleExpandButton
        entryExpandHandler={props.entryExpandHandler}
        isExpanded={props.isExpanded}
        idx={props.idx}></ToggleExpandButton>
  </div>
);

export default EntryRow;