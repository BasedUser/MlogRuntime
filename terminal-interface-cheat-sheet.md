# Cheat Sheet for Terminal Interface
A cheat sheet for all custom commands in [Terminal Interface](terminal-interface.js)

Sometimes you want to run mlog in the terminal pretty easily, but unfortunately it takes this cheat sheet to do that. This cheat sheet will list **all custom commands\*** in the Terminal Interface.

<sup>\*easter-egg commands will probably come later</sup>

Here is the list of almost all custom commands, with description, ranked by importance.

* `run`

   Runs the last mlog commands since the last `run` related execution.
* `run-limit`

   Same as `run`, but with a limit of how many mlog operations it can run. Prevents infinite loops.
* `run-all`

   Same as run, but instead of the last execution, it re-runs all mlog commands from the start.
* `exit`

   This is how you exit the session without <kbd>Ctrl+C</kbd>ing.
* `settings`

   Shows all display settings. These include:
   
   * total lines number
   * relative lines number (lines since the last `run` related command)
   * debug instructions (shows all tokens when doing any `run` related command)

* `full code`

  Displays the full code from the start. This is what `run-all` executes.
* `edit line`

  Edits lines within the full code.
* `blackhole`

  A new start. <span style="color:#ff2020">**Removes almost all data saved.**</span>
* `check printB`

  Displays what's in the print buffer.

All-in-one example (without color)
```
Welcome!
Format: total lines relative lines >
0 0 > print 1
1 1 > print 2
2 2 > print 3
3 3 > run
3 0 > check printB
123
3 0 > print "\n4"
4 1 > print "5"
5 2 > print 6
6 3 > run-limit
Limit (number of instructions): [2  ]
6 0 > check printB
123
45
6 0 > run-all
Instruction limit (leave blank for infinite limit): 4
6 0 > check printB
123
45123
4
6 0 > settings
What settings do you want to tick?
[0] (true) Total Lines
[1] (true) Relative Lines
[2] (false) Debug instructions
[1]
Successfully ticked relative lines.
6 > full code
print 1
print 2
print 3
print "\n4"
print "5"
print 6

6 > edit line
These are the lines of code avaliable.
0 | print 1
1 | print 2
2 | print 3
3 | print "\n4"
4 | print "5"
5 | print 6
6 |
What line of code do you want to edit? 2
2 >> print "\nHello World!"
What line of code do you want to edit?
6 > full code
print 1
print 2
print "\nHello World!"
print "\n4"
print "5"
print 6

6 > blackhole
THIS WILL DELETE ALMOST ALL OF YOUR DATA. ARE YOU SURE? (yes/other) yes
0 > full code

0 > exit
```