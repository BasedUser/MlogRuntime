# Cheat Sheet for Terminal Interface
A cheat sheet for all custom commands in [Terminal Interface](terminal-interface.js)

Sometimes you want to run mlog in the terminal pretty easily, but unfortunately it takes this cheat sheet to do that. This cheat sheet will list **all custom commands\*** in the Terminal Interface.

<sup>\*easter-egg commands will probably come later</sup>

Here is the list of almost all custom commands, with description, with examples, ranked by importance.

* `run`

   Runs the last mlog commands since the last `run` related execution.
   
   Example:
   
   ![example](images/example1.png)
* `run-limit`

   Same as `run`, but with a limit of how many mlog operations it can run. Prevents infinite loops.
   
   Example:
   
   ![another example](images/example2.png)
* `run-all`

   Same as run, but instead of the last execution, it re-runs all mlog commands from the start.

   Example:
   
   ![also another example](images/example3.png)
* `exit`

   This is how you exit the session without <kbd>Ctrl+C</kbd>ing.

   Example:
   
   ![please forgive me for using powershell](images/example4.png)
* `clear`

   Clears the console.
   
   If you want to clear the console after executing a `run`-related command, go to `settings`.
   
   No example provided.
* `settings`

   Shows all display settings. These include:
   
   * total lines number
   * relative lines number (lines since the last `run` related command)
   * debug instructions (shows all tokens when doing any `run` related command)

   Example:
   
   ![do not question the Debug Instructions setting](images/example5.png)
* `full code`

  Displays the full code from the start. This is what `run-all` executes.

  Example:
  
  ![example](images/example6.png)
* `edit line`

  Edits lines within the full code.

  Example:
  
  ![connected example](images/example7.png)
* `blackhole`

  A new start. <span style="color:#ff2020">**Removes almost all data saved.**</span>

  Example:
  
  ![also another connected example](images/example8.png)
* `check printB`

  Displays what's in the print buffer.

  Example:
  
  ![print buffer demonstration](images/example9.png)
