const express = require('express')
const db = require('../db/tracks')
const router = express.Router()

// Track routes start here

// GET /api/v1/tracks

// List all tracks

// get user_tracks data (saved / closed)
router.get('/userTracks/:userId', (req, res) => {
  const userId = Number(req.params.userId)
  db.getUserTrackByUser(userId)
    .then((tracks) => {
      const parsedTracks = tracks.map((track) => {
        const lineArray = JSON.parse(track.line) // convert array from string to arrays (beware of trailing commas)
        // Ha! Love this comment.
        return { ...track, line: lineArray }
      })
      res.json(parsedTracks)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

// Update status of whether a track is saved by user of not
router.patch('/saved', (req, res) => {
  const { userId, trackId } = req.body
  const savedTrack = {
    userId,
    trackId,
    status: 1,
  }
  db.updateSavedStatus(savedTrack)
    .then(() => {
      res.sendStatus(201)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Unable to update track' })
    })
})

router.patch('/unsaved', (req, res) => {
  const { userId, trackId } = req.body
  const savedTrack = {
    userId,
    trackId,
    status: 0,
  }
  db.updateSavedStatus(savedTrack)
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Unable to unsave track' })
    })
})

// Update status of whether a track is saved by user of not
router.patch('/hiking', (req, res) => {
  const { userId, trackId } = req.body
  const hikedTrack = {
    userId,
    trackId,
    status: 1,
  }
  db.updateHikingStatus(hikedTrack)
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Unable to mark track as being hiked' })
    })
})

router.patch('/hiked', (req, res) => {
  const { userId, trackId } = req.body
  const hikedTrack = {
    userId,
    trackId,
    status: 0,
  }
  db.updateHikingStatus(hikedTrack)
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch((err) => {
      console.error(err)
      res
        .status(500)
        .json({ message: 'Unable to mark track as no longer being hiked' })
    })
})

// update status of whether a track is completed by user of not
router.patch('/completed', (req, res) => {
  const { userId, trackId, points } = req.body
  const current = new Date()
  const lastCompletion = `${current.getMonth() + 1
    }/${current.getDate()}/${current.getFullYear()}`

  const completedTrack = {
    userId,
    trackId,
    status: 1,
    lastCompletion,
  }
  db.updateCompletedStatus(completedTrack)
    .then(() => {
      return db.addXp(userId, points)
    })
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Unable to update track' })
    })
})

router.patch('/uncompleted', (req, res) => {
  const { userId, trackId, points } = req.body
  const completedTrack = {
    userId,
    trackId,
    status: 0,
  }
  db.updateCompletedStatus(completedTrack)
    .then(() => {
      return db.removeXp(userId, points)
    })
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Unable to mark track as uncompleted' })
    })
})

// Get track by ID **POSSIBLY NOT USED **//
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getTrackById(id)
    .then((track) => {
      const lineArray = JSON.parse(track.line) // convert array from string to arrays (beware of trailing commas)
      res.json({ ...track, line: lineArray })
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

//
//** UNUSED **//

router.get('/', (req, res) => {
  db.listTracks()
    .then((tracks) => {
      const parsedTracks = tracks.map((track) => {
        const lineArray = JSON.parse(track.line) // convert array from string to arrays (beware of trailing commas)
        return { ...track, line: lineArray }
      })

      res.json(parsedTracks)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send(err.message)
    })
})

// Get completed tracks by user ID
router.get('/completed/:userId', (req, res) => {
  // Is there a consistent way you've decided when to pass IDs in the body vs params?
  const userId = Number(req.params.userId)
  db.getCompletedTrackByUser(userId)
    .then((tracks) => {
      res.json(tracks)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

// Get other tracks (not completed nor saved) by user ID
router.get('/other/:userId', (req, res) => {
  const userId = Number(req.params.userId)
  db.getOtherTrackByUser(userId)
    .then((tracks) => {
      res.json(tracks)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

// Get saved track by user ID
router.get('/saved/:userId', (req, res) => {
  const userId = Number(req.params.userId)
  db.getSavedTrackByUser(userId)
    .then((tracks) => {
      res.json(tracks)
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
