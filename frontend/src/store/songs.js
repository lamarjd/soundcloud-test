
const LOAD_SONGS = 'songs/LOAD_SONGS'
const EDIT_SONG = 'songs/EDIT_SONG'
const ADD_SONG = ' songs/ADD_SONG'
const DELETE_SONG = 'songs/DELETE_SONG'


const load = (songs) => ({
    type: LOAD_SONGS,
    songs
});

const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}


// THUNK - get Songs
export const getSongs = () => async dispatch => {
    const response = await fetch(`api/songs`);
    
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list))
    }
};

export const getOneSong = (id) => async dispatch => {
    const response = await fetch(`api/songs/${id}`)
    if (response.ok) {
        const song = await response.json();
        dispatch(addSong(song));
        return song
    }
    return null
}

// THUNK - post a Song
export const uploadSong = (data) => async dispatch => {
    const response = await fetch('api/songs', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const upload = await response.json();
        dispatch(addSong(upload))
        return upload;
    }
    //error handling
    return null
}


const initialState = {}

// todo - add to root
const songReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_SONGS:
            // newState = Object.assign({}, state, {songs: action.songs});
            // return newState
            // console.log("action", action)
            const allSongs = {}
            action.songs.Songs.forEach((song) => (allSongs[song.id] = song))
            // console.log("Allsongs", allSongs)
            return allSongs
        case ADD_SONG:
            if (!state[action.song.id]) {
                const newState = {
                    ...state,
                    [action.song.id]: action.song
                }
                return newState                
            }
        return {
            ...state,
            [action.song.id]: {
                ...state[action.song.id],
                ...action.song
            }        
        };
        default:
            return state;
    }
}

export default songReducer;