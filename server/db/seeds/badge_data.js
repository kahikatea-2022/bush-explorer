exports.seed = function (knex) {
  return knex('badge_data')
    .del()
    .then(function () {
      return knex('badge_data').insert([
        {
          id: 1,
          name: 'Stupid Baby Award',
          image: 'stupid-baby',
          criteria: 'Walk your first beginner track',
        },
        {
          id: 2,
          name: 'Baby Genius Award',
          image: 'baby-genius',
          criteria: 'Walk your first intermediate track',
        },
        {
          id: 3,
          name: "Hero's Journey",
          image: 'hero-journey',
          criteria: 'Walk your first expert track',
        },
        {
          id: 4,
          name: 'Renaissance Person',
          image: 'renaissance-person',
          criteria: 'Walk one track of each difficulty',
        },
        {
          id: 5,
          name: 'Truly a Mighty Bush',
          image: 'mighty-bush',
          criteria: 'Walk every track',
        },
        {
          id: 6,
          name: 'Overachiever',
          image: 'overachiever',
          criteria: 'Walk two tracks on one date',
        },
        {
          id: 7,
          name: "It's Not A Competition",
          image: 'its-not-a-comp',
          criteria: 'Walk three tracks on one date',
        },
        {
          id: 8,
          name: 'Here We Go Again',
          image: 'here-we-go',
          criteria: 'Walk a track a second time',
        },
        {
          id: 9,
          name: "Aren't You Bored?",
          image: 'arent-you-bored',
          criteria: 'Walk a track 10 times',
        },
        {
          id: 10,
          name: 'Tic-Tac-Toe',
          image: 'tic-tac-toe',
          criteria: 'Walk 3 tracks in 3 consecutive Days',
        },
        {
          id: 11,
          name: 'Daniel Birdman',
          image: 'birdman',
          criteria: 'Walk a particular well known birdwatching track',
        },
        {
          id: 12,
          name: 'The Behemoth',
          image: 'behemoth',
          criteria: 'Walk the mighty Aotea Track',
        },
        {
          id: 13,
          name: 'Island Time',
          image: 'island-time',
          criteria: 'Walk a track on an island',
        },
        {
          id: 14,
          name: 'Big Plans',
          image: 'big-plans',
          criteria: 'Put 10 tracks in your saved tracks',
        },
        {
          id: 15,
          name: 'Big Plans Paid Off',
          image: 'big-plans-paid-off',
          criteria: 'Mark 10 tracks as completed',
        },
        {
          id: 16,
          name: 'Big Fish, Little Pond',
          image: 'big-fish',
          criteria: 'Walk all easy tracks',
        },
        {
          id: 17,
          name: 'So You Think You Can Tramp?',
          image: 'think-you-can-tramp',
          criteria: 'Walk all intermediate tracks',
        },
        {
          id: 18,
          name: 'Calves Of Mithril',
          image: 'calves-of-mithril',
          criteria: 'Walk all expert tracks',
        },
      ])
    })
}
