const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const badges = require('./badges')

// Prevent Jest from timing out (5s often isn't enough)
jest.setTimeout(10000)
// Yay for tests! However, correcting for slow tests in this fashion is
// a bit worrying. Do you have any idea why these are taking so long?

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

test('getBadges returns a list of all badges', () => {
  return badges.getBadges(testDb).then((badge_data) => {
    expect(badge_data).toHaveLength(1)
    return null
  })
})

test('getBadgesByUser returns badges earnt by user', () => {
  return badges.getBadgesByUser('1', testDb).then((badge_data) => {
    console.log(badge_data[0].name)
    expect(badge_data[0].id).toBe(1)
    expect(badge_data[0].name).toBe('Honorary Busher')
    expect(badge_data[0].image).toBe('./images/bushwacker.jpg')
    return null
  })
})

// describe('getEventById', () => {
//   it('returns the chosen Event', () => {
//     return db.getEventById(3, testDb).then((event) => {
//       expect(event.id).toBe(3)
//       expect(event.gardenId).toBe(2)
//       expect(event.gardenName).toMatch('Kingsland')
//       expect(event.gardenAddress).toMatch('Bond Street')
//       expect(event.title).toBe('Sowing potatoes')
//       expect(event.volunteersNeeded).toBe(14)
//       expect(event).toHaveProperty('date')
//       expect(event).toHaveProperty('description')
//       expect(event.volunteers).toHaveLength(3)
//       expect(event.extraVolunteers).toHaveLength(0)
//       expect(event.volunteers[0].attended).toBeFalsy()
//       expect(event.lat).toBe(-36.86983345249252)
//       expect(event.lon).toBe(174.74701843955708)
//       return null
//     })
//   })
// })

// describe('addEvent', () => {
//   it('inserts event correctly', () => {
//     const newEvent = {
//       gardenId: 2,
//       title: 'Gardens of Testers',
//       date: '2020-12-25',
//       description: 'Christmas test gardening',
//       volunteersNeeded: 6,
//     }
//     return db.addEvent(newEvent, testDb).then((event) => {
//       expect(event.title).toBe('Gardens of Testers')
//       expect(event.volunteersNeeded).toBe(6)
//       expect(event.gardenId).toBe(2)
//       expect(event.description).toMatch('Christmas')
//       expect(event.date).toMatch('12-25')
//       return null
//     })
//   })
// })

// describe('updateEvent', () => {
//   it('returns the updatedEvent', () => {
//     const updatedEvent = {
//       id: 1,
//       title: 'gardening at daves',
//       date: '2020-12-01',
//       description: 'Leshgoooooo!',
//       volunteersNeeded: 10,
//     }

//     return db.updateEvent(updatedEvent, testDb).then((event) => {
//       expect(event.title).toBe('gardening at daves')
//       expect(event.date).toBe('2020-12-01')
//       expect(event.description).toBe('Leshgoooooo!')
//       expect(event.volunteersNeeded).toBe(10)
//       return null
//     })
//   })
// })

// describe('Cancel Event', () => {
//   it('event should be cancelled', () => {
//     return db.cancelEvent(1, testDb).then((event) => {
//       expect(event.status).toBe('Cancelled')
//       return null
//     })
//   })
// })
