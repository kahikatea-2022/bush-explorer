function generateUserTrackData(userId) {
  // each time a user is created we need to add a row for each combination of user_id and track_id with completed and saved set to zero (false)
  // e.g. if there are 3 tracks and user is user #3
  // [{user_id: 3, track_id: 1, ...}, {user_id: 3, track_id: 2, ...}, {user_id: 3, track_id: 3, ...}]
  // then if the user completes track 2 we can find the row fo user_id = 3 and track_id = 2 and set completed to 1 (true)
  const amountOfTracks = 20
  // Hmm, agree with Ahmad that potentially squillions of unused rows in
  // the DB for each user/track combination is not ideal. But can you
  // explain this limit?

  const userTracks = []

  for (let i = 1; i < amountOfTracks + 1; i++) {
    userTracks.push({
      user_id: userId,
      track_id: i,
      completed: 0,
      saved: 0,
      total_completions: 0,
      hiking: 0,
    })
  }

  return userTracks
}

function generateUserTrackDataSeed() {
  // creates the seed data for user_tracks
  // seed data is a row for each combination of user_id and track_id with completed and saved set to zero (false)
  // e.g. for 2 users and three tracks
  // [{user_id: 1, track_id: 1, ...}, {user_id: 1, track_id: 2, ...}, {user_id: 1, track_id: 3, ...},
  //  {user_id: 2, track_id: 1, ...}, {user_id: 2, track_id: 2, ...}, {user_id: 2, track_id: 3, ...}]

  const amountOfUsers = 2
  const amountOfTracks = 20

  const userTracks = []

  for (let i = 1; i < amountOfUsers + 1; i++) {
    for (let j = 1; j < amountOfTracks + 1; j++) {
      const randSaved = Math.random() < 0.2
      const randComplete = Math.random() < 0.2

      userTracks.push({
        user_id: i,
        track_id: j,
        completed: randComplete,
        saved: randSaved,
        total_completions: randComplete,
        hiking: 0,
      })
    }
  }

  return userTracks
}

module.exports = {
  generateUserTrackData,
  generateUserTrackDataSeed,
}
