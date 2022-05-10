import requestor from '../../consume'

// Why would this functionality not be in apis/users ?

export function getUser(id, consume = requestor) {
  return consume(`/users/${id}`)
    .then((res) => {
      const user = res.body[0]
      return user
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export function getUserBadges(id, consume = requestor) {
  return consume(`/badges/${id}`)
    .then((res) => {
      const badges = res.body
      return badges
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export function getAllBadges(consume = requestor) {
  return consume(`/badges`)
    .then((res) => {
      const badges = res.body
      return badges
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export function getUserTracks(id, consume = requestor) {
  return consume(`/tracks/userTracks/${id}`)
    .then((res) => {
      const completed = res.body
      return completed
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export function getAmountOfTracksCompleted(tracks) {
  return tracks.filter((track) => track.completed).length
}

export function getDistanceHiked(tracks) {
  const completedTracks = tracks.filter((track) => track.completed)
  const distanceHiked = completedTracks.reduce((accumulator, track) => {
    return accumulator + track.length
  }, 0)
  return distanceHiked
}

export function getRanks(consume = requestor) {
  return consume(`/ranks`)
    .then((res) => {
      const ranks = res.body
      return ranks
    })
    .catch((error) => {
      console.log(error.message)
    })
}
