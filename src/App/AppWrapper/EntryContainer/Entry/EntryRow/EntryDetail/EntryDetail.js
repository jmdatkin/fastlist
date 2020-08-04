import React from 'react';
import './EntryDetail.css';

function EntryDetail(props) {
    return (
        <span className="EntryDetail">{props.detail}</span>
    );
}

export default EntryDetail;