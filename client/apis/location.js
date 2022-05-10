export function getUserLat() {
  navigator.geolocation.getCurrentPosition(function (position) {
    // Very nice use of the geo APIs!
    const lat = position.coords.latitude
    return lat
  })
}

export function getUserLon() {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lon = position.coords.longitude
    return lon
  })
}
