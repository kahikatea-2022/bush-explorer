const request = require('supertest')

const server = require('../server')
const db = require('../db/badges')
const dbUsers = require('../db/users')
// const auth0 = require('../routes/auth')
const log = require('../logger')

jest.mock('../logger')
jest.mock('../db/badges')
jest.mock('../db/users')
// jest.mock('../routes/auth')

const mockBadges = [
  {
    user_id: 1,
    badge_id: 1,
  },
  {
    user_id: 2,
    badge_id: 2,
  },
]

describe('GET /api/v1/badges', () => {
  it('responds with badge_data on res body', () => {
    db.getBadges.mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          name: 'Honorary Busher',
          image: './images/bushwacker.jpg',
        },
        {
          id: 2,
          name: 'Mighty BushBaby',
          image: './images/bushbaby.jpg',
        },
      ])
    )
    return request(server)
      .get('/api/v1/badges')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(2)
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.getBadges.mockImplementation(() =>
      Promise.reject(new Error('mock getBadges error'))
    )
    return request(server)
      .get('/api/v1/badges')
      .expect('Content-Type', /json/)
      .expect(500)
      .then((res) => {
        expect(res.body.message).toBe('Unable to retrieve badges')
        return null
      })
  })
})

describe('GET /api/v1/badges/:userId', () => {
  it("responds with user's badges", () => {
    expect.assertions(1)
    db.getBadgesByUser.mockImplementation((userId) => {
      expect(userId).toBe(2)
      return Promise.resolve(mockBadges)
    })
    dbUsers.getUserById.mockImplementation(() => Promise.resolve({ id: 1 }))
    return request(server)
      .get('/api/v1/badges/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        console.log(res.body)
        expect(res.body).toHaveLength(1)
        return null
      })
  })

  // it('responds with 500 and correct error object on DB error', () => {
  //   db.getGardenById.mockImplementation(() =>
  //     Promise.reject(new Error('mock getGardenById error'))
  //   )
  //   return request(server)
  //     .get('/api/v1/gardens/999')
  //     .expect('Content-Type', /json/)
  //     .expect(500)
  //     .then((res) => {
  //       expect(log).toHaveBeenCalledWith('mock getGardenById error')
  //       expect(res.body.error.title).toBe('Unable to retrieve garden')
  //       return null
  //     })
  // })
})
