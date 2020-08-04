import React from 'react';
import './EntryContent.css';

function EntryContent(props) {
    return (
        <span className="EntryContent">{props.content}</span>
    );
}

export default EntryContent;