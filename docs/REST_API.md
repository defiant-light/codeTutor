Server REST API:

GET /api/getroom
Gets a video chatroom name (a random string of 256 base-64 digits)
params:
  'desired': STRING, the language user would like to practice
  'native': STRING, the user's native language
  'partnerPref': INT
    1: require native speaker of the desired language; want to trade conversation
    2: require non-native speaker of the desired language; don't want to trade languages - just want to practice the one language together
    3: don't care
      -in case 3, user gets placed on *two* queues. When dequeued from one, he gets cleaned out of the other.

GET /api/queue
Get information about a queue - most importantly, user's current position in his queue(s)
params: none - uses cookies to identify user and fetch information about relevant queue(s)
