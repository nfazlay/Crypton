# Introduction

Crypton is a open source Discord bot made in JavaScript with Node.js and discord.js library

It has the following features out of the box:
* Mongo DB Database Integrated by default
* Event Handler
* Command Handler
* .env support

# Installation

**Requirements:**
* Node.js 12.0.0+
* npm 6.0.0+

You can install cypton easily by cloning it using git (or GitHub desktop)

```bash
git clone https://github.com/Crypton-Technologies/Crypton.git
cd Crypton
npm install
```
Make a new file called `.env` in the root of your project (where you have index.js file)
Use your preferred code editor to write the following in it (with your own values for the specific), this file is case-sensitive.
```env
token="your bot token"
prefix="any prefix"
mongodbtoken="mongodb compass connect url"
```
then finally run this command to start your bot
```bash
node index.js
```

Crypton is also available as a easy to use quick setup application that you can download [here](https://github.com/crypton-technologies/crypton-desktop) for all platforms

# Hosting

You can host on any platform, or server as of the code base it's compataible (can run) on the following:
• Heroku (with Procfile)
• Glitch 
• Repl.it
• Game panels using pterodactyl daemons (However this might change according to provider)

# Contributing
See [Contributing.md](https://github.com/crypton-technologies/crypton/contributing.md)
