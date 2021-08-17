# MlogRuntime

MlogRuntime is an attempt to recreate mindustry logic outside of Mindustry, complete with a world and rudimentary unit controls.

**HOW TO USE IN THE TERMINAL:**
1. Make sure you are in the **[current directory](.)** _(the directory [this file](readme.md) is in)_.
2. Make sure you downloaded every node module listed in [package-lock.json](package-lock.json). If you are tired of scrolling down in each one, these are the commands used to import all of the modules used.
   ```
   npm install prompt-sync
   ```
3. If you want to test features, you can run one of the commands below:
   ```
   node ./Tests/testFeatures.js
   npm test
   ```
4. If you want to test out **Mindustry Logic** code yourself, you can use the provided [terminal interface](terminal-interface.js). You can use one of the commands below:
   ```
   node ./terminal-interface.js
   npm run emulation
   ```
