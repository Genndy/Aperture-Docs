const CHAT = "CHAT"
const FILES = "FILES"

const defaultState = {
    currentItem: 'NULL'
}

export default function pageReducer(state = defaultState, action) {
    switch (action.type) {
        case CHAT:
            return {
                ...state,
                currentItem: CHAT
            }
        case FILES:
            return {
                ...state,
                currentItem: FILES
            }
        default:
            return {...state, currentItem: 'NULL'}
    }
}


// export const setChatToSide = () => ({type: CHAT})

// export const setFilesToSide = () => ({type: FILES})

// export const setSideItem = item => (
//    {type: item})
