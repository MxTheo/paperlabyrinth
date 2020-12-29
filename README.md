# paperlabyrinth
Also made with Mendix, see blog on Medium: https://medium.com/mendix/bfs-from-alice-to-mendix-e4d7376e0901?sk=461cc2846f67da9ac8886d592d9f4c33

See the app: https://alicelabyrinth-sandbox.mxapps.io/

https://www.codingame.com/training/medium/paper-labyrinth

GOAL
You are Alice and you must find the rabbit then go out of the Queen’s labyrinth of death as quickly as you can.
The labyrinth is made of thin walls, each wall is binary-coded in each cell: 1 is the the down wall, 2 the left wall, 4 the top wall and 8 the right wall. If the wall is present, add its number to the cell. For example, 10=8+2 in a cell where you stand means that there are walls on your left and on your right and that you can walk downwards and upwards.
This also means that one-way doors are not forbidden. Look for instance at 10 5, if you are on 5, you can go on 10 but you can’t go back.
In fact, the cells are coded in hexadecimal, 10 is a.
The first simple labyrinth is this one:

________
|S    R|
‾‾‾‾‾‾‾‾

7=4+2+1, it’s the start cell on the left, 0xd=13=8+4+1, it’s the rabbit cell on the right. The other cells are 5=4+1.


INPUT
Line 1: The coordinates xs ys of the start and exit (screen-style, (0,0) on top left)
Line 2: The coordinates xr yr of the rabbit
Line 3: The width and height of the labyrinth
Next h lines: The h lines of the labyrinth coded in hexadecimal


OUTPUT
The number of cells needed to reach the rabbit then to return.


CONSTRAINTS
1⩽w,h⩽7


EXAMPLE

Input             Output
0 0               5 5
5 0
6 1
75555d

