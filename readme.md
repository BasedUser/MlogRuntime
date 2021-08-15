# MlogRuntime

MlogRuntime is an attempt to recreate mindustry logic outside of Mindustry, complete with a world and rudimentary unit controls.

**HOW TO USE IN THE TERMINAL:**
1. Make sure you are in the **[current directory](.)** _(the directory [this file](readme.md) is in)_.
2. Make sure you downloaded every node module listed in [package-lock.json](package-lock.json). If you are tired of scrolling down in each one, these are the commands used to import all of the modules used.
   ```
   npm install prompt-sync
   ```
3. If you want to test features, you can run this:
   ```
   node ./Tests/testFeatures.js
   ```
   Or, you can use a shorthand, which is defined in [package.json](package.json):
   ```
   npm test
   ```
4. If you want to test out **Mindustry Logic** code yourself, unfortunately there is currently no interface to do it for you.
