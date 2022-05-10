const connection = require('./connection')
// This set of functions affects both the badges and badge_data DBs,
// which could get rather confusing.

function getBadges(db = connection) {
  return db('badge_data').select()
} //test working

function getBadgesByUser(userId, db = connection) {
  return db('badges')
    .where('user_id', userId)
    .join('badge_data', 'badge_data.id', 'badges.badge_id')
    .select(
      'badge_data.id',
      'badge_data.name',
      'badge_data.image',
      'badge_data.criteria'
    )
} //test working

function addBadge(badge, db = connection) {
  const { userId, badgeId } = badge
  const newBadge = { user_id: userId, badge_id: badgeId }
  return db('badges').insert(newBadge)
}

module.exports = {
  getBadges,
  getBadgesByUser,
  addBadge,
}
