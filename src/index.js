let nextFlashMessageId = 1;

const noop = () => {};

function addFlashMessage(flashMessage) {
    return { type: "ADD_MESSAGE", flashMessage: flashMessage };
}

function removeFlashMessage(flashMessageId) {
    return { type: "REMOVE_MESSAGE", flashMessageId: flashMessageId };
}

export function publishFlashMessage(dispatch, text, duration, onClick = noop, data = {}) {
    const id = nextFlashMessageId;
    const flashMessage = { id, duration, text, onClick, data, onDismiss: () => dispatch(removeFlashMessage(id))};

    dispatch(addFlashMessage(flashMessage));

    if (duration !== false) {
        setTimeout(() => {
            dispatch(removeFlashMessage(id));
        }, duration);
    }

    nextFlashMessageId += 1;
}

export const flashMessageReducer = (state = {messages: []}, action) => {
    switch (action.type) {
        case "ADD_MESSAGE": {
            const messages = [...state.messages, action.flashMessage];

            return { ...state, messages };
        }

        case "REMOVE_MESSAGE": {
            const flashMessageId = action.flashMessageId;

            const messages = state.messages.filter(f => flashMessageId !== f.id);

            return { ...state, messages };
        }

        default: {
            return state;
        }
    }
};