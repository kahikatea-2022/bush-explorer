const connection = require('./connection')

// This set of functions seems to relate to several DBs, rather than just one...

function addXp(userId, points, db = connection) {
  return db('users').where('id', userId).increment('xp', points)
}

function removeXp(userId, points, db = connection) {
  return db('users').where('id', userId).decrement('xp', points)
}

function getTrackById(id, db = connection) {
  // Not used?
  return db('track_data')
    .where('id', id)
    .select(
      'id',
      'asset_id as assetId',
      'name',
      'length',
      'days',
      'hours',
      'return',
      'points',
      'lon',
      'lat',
      'line',
      'difficulty'
    )
    .first()
}

function getUserTrackByUser(userId, db = connection) {
  const query = {
    user_id: userId,
  }
  return db('user_tracks')
    .join('track_data', 'track_data.id', 'user_tracks.track_id')
    .select(
      'track_data.id',
      'track_data.name',
      'user_tracks.saved',
      'user_tracks.completed',
      'track_data.length',
      'track_data.difficulty',
      'track_data.days',
      'track_data.hours',
      'track_data.lat',
      'track_data.lon',
      'track_data.line',
      'track_data.points',
      'track_data.return',
      'user_tracks.last_completion as lastCompletion',
      'user_tracks.total_completions as totalCompletions',
      'user_tracks.hiking'
    )
    .where(query)
}

function updateSavedStatus({ userId, trackId, status }, db = connection) {
  const savedTrack = { user_id: userId, track_id: trackId }
  return db('user_tracks').where(savedTrack).update('saved', status)
}

function updateHikingStatus({ userId, trackId, status }, db = connection) {
  const hikedTrack = { user_id: userId, track_id: trackId }
  return db('user_tracks').where(hikedTrack).update('hiking', status)
}

function updateCompletedStatus(
  { userId, trackId, status, lastCompletion },
  db = connection
) {
  const completedTrack = { user_id: userId, track_id: trackId }
  const updatedData = {
    completed: status,
    last_completion: lastCompletion,
    hiking: 0,
  }
  return db('user_tracks')
    .where(completedTrack)
    .update(updatedData)
    .increment('total_completions')
}

//
//** UNUSED **//

function listTracks(db = connection) {
  return db('track_data').select(
    'id',
    'asset_id as assetId',
    'name',
    'length',
    'days',
    'hours',
    'return',
    'lon',
    'lat',
    'line',
    'difficulty'
  )
} //test written

// possibly redundant
function getSavedTrackByUser(userId, db = connection) {
  const query = {
    user_id: userId,
    saved: 1,
  }
  return db('user_tracks')
    .join('track_data', 'track_data.id', 'user_tracks.track_id')
    .select('id')
    .where(query)
}

// possibly redundant
function getCompletedTrackByUser(userId, db = connection) {
  const query = {
    user_id: userId,
    completed: 1,
  }
  return db('user_tracks')
    .join('track_data', 'track_data.id', 'user_tracks.track_id')
    .select('id')
    .where(query)
}

function getOtherTrackByUser(userId, db = connection) {
  const query = {
    user_id: userId,
    completed: 0,
    saved: 0,
  }
  return db('user_tracks')
    .join('track_data', 'track_data.id', 'user_tracks.track_id')
    .select(
      'track_data.id',
      'track_data.name',
      'track_data.length',
      'track_data.difficulty',
      'track_data.days',
      'track_data.hours',
      'track_data.lat',
      'track_data.lon'
    )
    .where(query)
}

function getUserTrackDataOnly(userId, trackId, db = connection) {
  const query = {
    user_id: userId,
    track_id: trackId,
  }
  return db('user_tracks').select().where(query)
}

module.exports = {
  getTrackById,
  listTracks,
  updateSavedStatus,
  updateCompletedStatus,
  getSavedTrackByUser,
  getCompletedTrackByUser,
  getOtherTrackByUser,
  getUserTrackByUser,
  addXp,
  removeXp,
  getUserTrackDataOnly,
  updateHikingStatus,
}
