# NPM Quaver

[![ styled with: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Note
Please achknowledge that this package is actively in progress. Endpoints / functionality may be missing for now.

## Progress
- `/users` -in progress
- `/mapsets` -not started
- `/maps` -not started
- `/scores` -not started
- `/leaderboard` -not started
- `/playlists` -not started
- `/multiplayer` -not started

## Usage

```js
const QuaverApi = require("quaver-game")
const quaver = new QuaverApi()

quaver.fetchUser("alphasucksat").then(data => {
    console.log(data)
})
```

## API

`username` parameters can be incomplete (alphasuc" > "AlphaSucksAt4K")

### fetchUsers()
- `user` username

### fetchUser()
- `user` username or id
- `strict` checks for exact username match (default: `false`)