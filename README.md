# SpongeJS-Web
SpongeJS-Web is a web server for [SpongeJS](https://github.com/djxy/SpongeJS).

## Prerequisites
- Sponge API 5.X

## How to use SpongeJS-Web
1. Download [SpongeJS](https://github.com/djxy/SpongeJS) and start your Sponge server with it. Then close the server.
2. `cd config/spongejs`
3. Edit `spongejs.conf` with this.
```javascript
startingFile="SpongeJS-Web/bin/www"
port=3000
scripts={
    shutdownPort="server.close();"
}
```
4. Clone SpongeJS-Web `git clone https://github.com/djxy/SpongeJS-Web`
5. `cd SpongeJS-Web`
6. `npm install`
