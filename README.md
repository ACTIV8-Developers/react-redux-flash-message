# About

This is UI agnostic library that makes easy to create flash messages and to store them in a Redux store. This library does not render the FlashMessages for you it only stores them!

# Installation

`npm install simple-redux-flash-message --save`

# Getting started.
First add the following dependencies in the package.json (if present skip this step):

- "react-redux": "^6.0.1"
- "redux": "^4.0.4"

Now add the flash-message-reducer to your rootReducer, for example:

```javascript
import { combineReducers } from 'redux';
import { flashMessageReducer } from 'simple-redux-flash-message';

const rootReducer = combineReducers({
    flashMessage: flashMessageReducer
});

export default rootReducer;
```

# Sending flash messages

Now that we can see the flash messages we can use the following convenience methods to send flash messages:

```javascript
import { publishFlashMessage } from 'simple-redux-flash-message';

const {dispatch} = this.props;

// Redux dispatch method
// Message text
// Number of miliseconds messages will be displayed
// On click callback
// Custom data passed to message
publishFlashMessage(dispatch, "This is message content", 5000, () => console.log("Message clicked!"), {"message-type": "warning"})

```

# Rendering flash messages

Put following component somewhere in app root and pass messages prop from redux store.

```javascript
import React, { Component } from 'react';

export class FlashMessage extends Component {

    renderMessage(message) {
        return (
            <div
                key={message.id}
                className={`flash-message`}
                onClick={() => message.onClick()}
            >
                <button type="button" onClick={message.onDismiss}>
                    Close
                </button>
                <div onClick={() => message.onClick()}>
                    <p>{message.text}</p>
                </div>
            </div>
        );
    }

    render() {
        const { messages } = this.props;

        return (
            <div>
                {messages.map((message) => this.renderMessage(message))}
            </div>
        );
    }
}

export default FlashMessage;
```