import React from 'react';
import './EntrySubmenu.css';
import TextField from '@material-ui/core/TextField';

class EntrySubmenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="EntrySubmenu">
                <TextField id="standard-basic" variant="standard" placeholder="Detail"
                    onChange={this.props.handleDetailInputChange}></TextField>
            </div>
        )
    }
}

export default EntrySubmenu;