const VIDEOCHAT = "VIDEOCHAT"
const FILES = "FILES"

const defaultState = {
    currentPage: ''
}

export default function pageReducer(state = defaultState, action) {
    switch (action.type) {
        case VIDEOCHAT:
            return {
                ...state,
                currentPage: VIDEOCHAT
            }
        case FILES:
            return {
                ...state,
                currentPage: FILES
            }
        default:
            return {...state, currentPage: "NULL"}
    }
}


export const setPage = page => (
    {type: page})
