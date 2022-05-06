import React, { useEffect , useState } from 'react'
import { Link , useParams } from 'react-router-dom'
import { getCompletedUserTracks } from './userHelper'

// TODO:
// --> .map to map out saved / completed tracks associated with user id
// --> that includes the names and if completed to have a 'date completed'

function UserTracks() {
  const [userTracks, setUserTracks] = useState([{track_id: 0}])
  const { id } = useParams()

  useEffect(() => {
    getCompletedUserTracks(id)
      .then((completed) => {
        return setUserTracks(completed)
      }).catch((err) => console.log(err.message))
  },[id])

  return (
    <section>
      <div className="page-image-container">
        <img
          src="images/placeholder-image.svg"
          alt="placeholder image of track"
        />
      </div>
      <div className="page-container">
        <h2 className="user-track-intro">Completed and Saved Tracks</h2>
        {userTracks.map((track) => {
          return (<div key={track.track_id}>
            <Link to="/track">
              <div className="user-track-link">
                <p>{track.track_id}</p>
                <img src="icons/arrow.svg" alt="" />
              </div>
            </Link>
          </div>)
        })}
      </div>
    </section>
  )
}

export default UserTracks
