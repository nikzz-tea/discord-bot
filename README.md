# Discord Bot

## src/config.json

Since the Bot was not intended to be public it depends on the config file that is filled manually 

```json
{
  "prefix": "!",
  "name": "",
  "logChannelId": "",
  "ownerId": "",
  "saveFromChannels": [""],
  // Generate message per N messages
  "genPerMessage": 0,
  "mainChannels": {
    "guildId": "channelId"
  },
  // When N emotes is reacted to message in X guild, post to Y channel
  "platina": {
    "emoteId": {
      "guild": "",
      "channel": "",
      "req": 0
    }
  },
  // When X emote is reacted to Y message, give user a role
  "roles": {
    "guildId": {
      "message": "",
      "sheet": {
        "emoteId": "roleId"
      }
    }
  },
  // Get N random images, paste in the template to specified coordinates
  "memes": {
    "0": {
      "url": "https://...",
      "size": [680, 538],
      "boxes": [{ "size": [680, 538], "leftCorner": [0, 0] }]
    // ...
  }
}
```
