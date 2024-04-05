### WP-API Frontend

> A Nuxt.js project

### Local setup

```bash
# install dependencies
yarn install # Or yarn install

# serve with hot reload at localhost:3000
yarn dev
``` 

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

### Production build
```bash
# Run build script on server (this will pull, install, build and restart application)
sh build.sh
```

Not that the applications runs as root, so when the build scripts restarts the app,
you will have to provide a password


### Styleguide 

```bash
# run styleguide dev-server
yarn styleguide

# build styleguide
styleguide:build
```

### Good to know
Clear api cache: [http://localhost:3000/api/cache/clear](http://localhost:3000/api/cache/clear)

Remember to start a redis server

If yarn dev throws error change npm version: 
```
nvm use 10
```

If using Apple silicon, install node-sass version 7.0.1 and nvm use 14, but keep ^4.7.2 in package.json as server runs on node 10.

redis-cli -> FLUSHALL -> exit *** Run this if you want to clear your cache

### Deploy
git pull
npm run build
sudo -u node pm2 restart www
