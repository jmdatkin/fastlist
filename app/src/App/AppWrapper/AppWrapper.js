import React from 'react';
import AppListContainer from './AppListContainer/AppListContainer.js';
import './AppWrapper.css';

function AppWrapper(props) {

    return (
        <div className="AppWrapper">
            <AppListContainer />
        </div>
    )
}

export default AppWrapper;