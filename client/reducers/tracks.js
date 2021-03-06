import {
  FETCH_MAP_TRACKS_SUCCESS,
  SET_TRACK_AS_COMPLETED,
  SET_TRACK_AS_INCOMPLETE,
  SET_TRACK_AS_SAVED,
  SET_TRACK_AS_UNSAVED,
  SET_TRACK_AS_HIKING,
  SET_TRACK_AS_NOT_HIKING,
} from '../actions/tracks'

function tracks(state = [], action) {
  switch (action.type) {
    case FETCH_MAP_TRACKS_SUCCESS:
      return action.tracks
    case SET_TRACK_AS_COMPLETED:
      return state.map((track) =>
        track.id === action.trackId
          ? {
              ...track,
              completed: 1,
              lastCompletion: action.lastCompletion,
              hiking: 0,
            }
          : { ...track, hiking: 0 }
      )
    case SET_TRACK_AS_INCOMPLETE:
      return state.map((track) =>
        track.id === action.trackId ? { ...track, completed: 0 } : track
      )
    case SET_TRACK_AS_SAVED:
      return state.map((track) =>
        track.id === action.trackId ? { ...track, saved: 1 } : track
      )
    case SET_TRACK_AS_UNSAVED:
      return state.map((track) =>
        track.id === action.trackId ? { ...track, saved: 0 } : track
      )
    case SET_TRACK_AS_HIKING:
      return state.map((track) =>
        track.id === action.trackId ? { ...track, hiking: 1 } : track
      )
    case SET_TRACK_AS_NOT_HIKING:
      return state.map((track) =>
        track.id === action.trackId ? { ...track, hiking: 0 } : track
      )
    default:
      return state
  }
}

export default tracks
