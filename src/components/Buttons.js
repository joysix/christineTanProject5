import React from 'react';

const Buttons = (props) => {
    return (
        <div className="lists">
            <button className="random" onClick={() => props.loadRandomList()}>Random List</button>
            <button className="new" onClick={() => props.renderSelf('renderUserModal', true)}>New List</button>
        </div>
    )
}

export default Buttons;
