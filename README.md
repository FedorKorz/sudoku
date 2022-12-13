Sudoku
=====================

My implementation of a popular game. The playing field is an unfilled two-dimensional array.
When you click on the missing value, a window appears in which you are prompted to select a value.
If the value is repeated in a row, column or in a 3x3 field, the value is highlighted in red.
The playing field is randomly generated, the generation algorithm is taken from here
[habr](https://habr.com/post/192102/)
The playing field is located in state Redux.
***


Structure of the Project
-----------------------------------

File's name     | Info
----------------|----------------------
index.js        | Contains the project's actions. (Generate field, Insert value, Show window)
Popup.js        | The code of the popup window.
app.js          | The playing field along with the method of checking for duplicate values.
index.js        | Combines reducers. (Add value, check value).


Список использованных технологий
-----------------------------------
* React
* Redux

Todo
-----------------------------------
1. Reorganize the project structure.
2. Add animations.

How to Run
-----------------------------------
1. npm install
2. npm run
-----------------------------------
Live Demo

[![Watch the video](https://i.imgur.com/vKb2F1B.png)](https://www.loom.com/share/580fc2e643824d8eb4db9dc6a6137d61)

