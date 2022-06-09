const SET_CONFERENCE = "SET_CONFERENCE"
const CONFERENCE_OUT = "CONFERENCE_OUT"

const defaultState = {
    currentConference: {}, 
    onConference: false
}

export default function conferenceReducer(state = defaultState, action){
    switch (action.type){
        case SET_CONFERENCE:
            return {
                ...state,
                currentConference: action.payload,
                onConference: true
            }
        case CONFERENCE_OUT: 
        return{
            ...state,
            currentConference: {},
            onConference: false
        }
        default : return state
    }
}

export const setConference = conference => 
    ({type: SET_CONFERENCE, payload: conference})
export const disconnectConference = () => ({type: CONFERENCE_OUT})