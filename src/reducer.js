export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: null
}

const reducer = (state, action) => {
    //console.log(action)

    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token
            }
        case 'SET_PLAYLISTS':
            return{
                ...state,
                playlists: action.playlists
            }
        case 'SET_PLAYBACK':
            return{
                ...state,
                playback: action.playback
            }
        case 'SET_CURRENTTRACK':
            return{
                ...state,
                currentTrack: action.currentTrack
            }
        case 'SET_SHOWS':
            return{
                ...state,
                shows: action.shows
            }
        case 'SET_RECENTTRACKS':
            return{
                ...state,
                recentTracks: action.recentTracks
            }
        case 'SET_RECENTARTISTS':
        return{
            ...state,
            recentArtists: action.recentArtists
        }
        case 'SET_ARTISTS':
        return{
            ...state,
            artists: action.artists
        }
        case 'SET_TOPARTISTS':
        return{
            ...state,
            topArtists: action.topArtists
        }
        case 'SET_TOPTRACKS':
        return{
            ...state,
            topTracks: action.topTracks
        }
        case 'SET_GENRERECOMMENDATIONS':
            return{
                ...state,
                genreRec: action.genreRec
            }
        case 'SET_MORELIKE':
        return{
            ...state,
            moreLike: action.moreLike
        }
        case 'SET_FEATUREDPLAYLISTS':
        return{
            ...state,
            featuredP: action.featuredP
        }
        case 'SET_CATEGORIES':
        return{
            ...state,
            categories: action.categories
        }
        default:
            return state
    }
}

export default reducer;