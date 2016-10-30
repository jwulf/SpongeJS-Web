# SpongeJS-Web
SpongeJS-Web is a web server for [SpongeJS](https://github.com/djxy/SpongeJS).

## How to use SpongeJS-Web
- Download [SpongeJS](https://github.com/djxy/SpongeJS) and start your Sponge server with it. Then close the server.
- `cd config/spongejs`
- Edit `spongejs.conf` with this.
```javascript
startingFile="SpongeJS-Web/bin/www"
port=3000
scripts={
    shutdownPort="server.close();"
}
```
- Clone SpongeJS-Web `git clone https://github.com/djxy/SpongeJS-Web`
- `cd SpongeJS-Web`
- `npm install`
