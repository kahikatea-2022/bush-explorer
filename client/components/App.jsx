import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { cacheUser } from '../auth0-utils'
import Registration from './Registration'
// COMPONENT IMPORTS
import UserProfile from './user/UserProfile'
import UserTracks from './user/UserTracks'
import UserBadges from './user/UserBadges'
// If you really wanted to go wild in tidying this up, you could import
// all the 'user' components to a single file in the components directory
// and export them from there. Then here, your import could look like:
// import { UserProfile, UserTracks, UserBadges } from './user'
import Track from './track/Track'
import Tracks from './tracks/TracksList'
import Nav from './nav/Nav'
import Landing from './Landing'
import MobileTopBar from './MobileTopBar'

function App() {
  cacheUser(useAuth0)

  return (
    <div className="mobile-container">
      <MobileTopBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/user/:id/usertracks" element={<UserTracks />} />
        <Route path="/user/:id/userbadges" element={<UserBadges />} />
        <Route path="/track/:id" element={<Track />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
      <Nav />
    </div>
  )
}

export default App
