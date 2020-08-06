import React from 'react';
import AppListContainer from './AppListContainer/AppListContainer.js';
import './AppWrapper.css';

function AppWrapper(props) {

    return (
        <div className="AppWrapper">
            <AppListContainer
                entryList={props.entryList}
                modifyEntryList={props.modifyEntryList}
                addEntryAction={props.addEntryAction} />
        </div>
    )
}

export default AppWrapper;