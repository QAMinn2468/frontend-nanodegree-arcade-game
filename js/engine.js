var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    life = 3;                                                                   // WORKS!  life starts at 3.
    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;
        win.requestAnimationFrame(main);
    }

    function init() {                                   // TODO:  fix this.
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();

  }                                                                             // WORKS Collision!!

    function checkCollisions() {
      allEnemies.forEach(enemy => {
        if(enemy.checkCollisions(player) || player.checkCollisions(enemy)) {    // WORKS Collision!
          life = life - 1;                                                      // WORKS Life decreased by one!
          updateLifeCounter();                                                  // WORKS lifeCounter is reduced
          player.x = 2;
          player.y = 5;
        }
      })
      if (player.checkCollisions(heart)) {
        life = life + 1;
        updateLifeCounter();                                                    // life increases by 1.
        heart.x = -1;                                                           // heart disappears.
      }
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {                                    // WORKS - Ladybugs move FAST!
            enemy.update(dt*2.5);
        });
        player.update();
        winNow = false;
    }

    function render() {
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 4 of stone
                'images/stone-block.png',   // Row 2 of 4 of stone
                'images/stone-block.png',   // Row 3 of 4 of stone
                'images/stone-block.png',   // Row 4 of 4 of stone              // WORKS - changed row of grass to row of stone and added bug.
                'images/grass-block.png'    // Row 1 of 1 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect( 0, 0, canvas.width, canvas.height)
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 81);    // WORKS! - do not touch!
            }
        }
        renderEntities();
        if ((player.y === 0) && (winNow === false)) {                           // WORKS - single win alert,  // TODO: adjust so shows after player shown in water.
          wonAlert();
        }
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();                                                     // WORKS! - Ladybugs shown on screen
        });
        player.render();                                                        // WORKS! - player shows on screen
        heart.render();

    }


    function reset() {
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy-hat.png',
        'images/Heart.png',
        'images/Gem Blue.png'
    ]);
    Resources.onReady(init);


    global.ctx = ctx;
})(this);
