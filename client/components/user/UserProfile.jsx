import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUser } from './userHelper'
import { getLogoutFn } from '../../auth0-utils'
import UserStats from './UserStats.jsx'

function UserProfile({ placeholderUser }) {
  const [user, setUser] = useState({})
  const { id } = useParams()
  const logout = getLogoutFn(useAuth0)
  const Navigate = useNavigate

  useEffect(() => {
    getUser(placeholderUser.auth0Id)
      .then((user) => {
        return setUser(user)
      })
      .catch((err) => console.log(err))
  }, [id])

  function handleLogout(event) {
    event.preventDefault()
    logout()
    Navigate('/')
  }

  return (
    <section className="page-container">
      <div>
        <h2 className="user-intro">Hello {user.name},</h2>
        <h3 className="user-intro-sub">ready to level up your walking?</h3>
      </div>
      <UserStats user={user} />
      <div className="user-links-container">
        <div className="link-one">
          <div className="link-container">
            <div className="link-text-container">
              <div className="link-text">Explore</div>
              <img src="/icons/arrow.svg" alt="" />
            </div>
            <Link to="/tracks">
              <img
                src="/images/explore-img.png"
                alt=""
                className="user-img-one"
              />
            </Link>
          </div>
        </div>
        <div className="link-two">
          <div className="link-container">
            <div className="link-text-container">
              <div className="link-text">My tracks</div>
              <img src="/icons/arrow.svg" alt="" />
            </div>
            <Link to={`/user/${id}/usertracks`}>
              <img src="/images/mybadges-img.png" alt="" className="user-img" />
            </Link>
          </div>
        </div>
        <div className="link-three">
          <div className="link-container">
            <div className="link-text-container">
              <div className="link-text">My badges</div>
              <img src="/icons/arrow.svg" alt="" />
            </div>
            <Link to={`/user/${id}/userbadges`}>
              <img src="/images/mytracks-img.png" alt="" className="user-img" />
            </Link>
          </div>
        </div>
      </div>
      <button onClick={handleLogout}>x</button>
    </section>
  )
}

export default UserProfile
