function eat_purple_creature(){
    document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML, 10) + 1;

    // If there is no space available for more holes, stop.
    if(document.getElementById('score').innerHTML >=
      Math.floor(398 / (parseInt(document.getElementById('holes-per-point').value, 10) + 1)) + 1){
        stop();
        return;
    }

    // Pick a button with color_empty and make it the new purple creature.
    do{
        a = Math.floor(Math.random() * 400);
    }while(document.getElementById(a).style.backgroundColor != color_empty);
    document.getElementById(a).style.backgroundColor = color_purple;

    var loop_counter = document.getElementById('holes-per-point').value - 1;
    // If more than 0 holes should be created.
    if(loop_counter >= 0){
        // Add new holes.
        do{
            while(document.getElementById(a).style.backgroundColor != color_empty){
                a = Math.floor(Math.random() * 400);
            }
            document.getElementById(a).style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }
}

function move_player(){
    // Check if game is still running, based on game mode and if frames/score are over max.
    var end_game = document.getElementById('game-mode-select').value === 1
      ? parseFloat(document.getElementById('frames').innerHTML) <= 0
        && document.getElementById('max-frames').value > 0
      : document.getElementById('max-points').value != 0
        && parseInt(document.getElementById('score').innerHTML, 10) >= document.getElementById('max-points').value;

    // If game is not running, stop().
    if(end_game){
        stop();
        return;
    }

    // Add or subtract 1 from frames depending on game mode.
    document.getElementById('frames').innerHTML = ((parseFloat(document.getElementById('frames').innerHTML) +
        ((document.getElementById('game-mode-select').value === 1
      && document.getElementById('max-frames').value > 0) ? -1 : 1)));

    var check_color = 0;
    var dx = 0;
    var dy = 0;

    // If player is moving up.
    if(player['movement_direction'] === 0){
        // If player is not at the top of the screen.
        if(player['y'] - 1 >= 0){
            // Fetch color of space directly above the player.
            check_color = document.getElementById((player['y'] - 1) * 20 + player['x']).style.backgroundColor;

            // If the space is not an obstacle continue, else collision.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === color_purple){
                    eat_purple_creature();
                }

                // Decrease player Y position.
                player['y'] -= 1;
                dy += 1;

            // Collision!
            }else{
                end_game = 1;
            }

        // If player is at the top of the screen and can wrap in the Y-direction.
        }else if(document.getElementById('wrap-select').value == 2
          || document.getElementById('wrap-select').value == 3){
            // Fetch color of space at the bottom of the screen.
            check_color = document.getElementById((player['y'] + 19) * 20 + player['x']).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === color_purple){
                    eat_purple_creature()
                }

                // Set player Y position to bottom of the screen.
                player['y'] = 19;
                dy -= 19;

            // Collision!
            }else{
                end_game = 1;
            }

        // Collision!
        }else{
            end_game = 1;
        }

    // If player is moving right.
    }else if(player['movement_direction'] === 1){
        // If player is not at the right edge of the screen.
        if(player['x'] + 1 <= 19){
            // Fetch color of space to the right of the player.
            check_color = document.getElementById(player['y'] * 20 + player['x'] + 1).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === color_purple){
                    eat_purple_creature();
                }

                // Increase player X position.
                player['x'] += 1;
                dx -= 1;

            // Collision!
            }else{
                end_game = 1;
            }

        // If player is at the right edge of the screen and can wrap in the X-direction.
        }else if(document.getElementById('wrap-select').value == 1
          || document.getElementById('wrap-select').value == 2){
            // Fetch color of space at the left of the screen.
            check_color = document.getElementById(player['y'] * 20 + player['x'] - 19).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === color_purple){
                    eat_purple_creature();
                }

                // Set player X position to left side of the screen.
                player['x'] -= 19;
                dx += 19;

            // Collision!
            }else{
                end_game = 1;
            }

        // Collision!
        }else{
            end_game = 1;
        }

    // If player is moving down.
    }else if(player['movement_direction'] === 2){
        // If player is not at the bottom of the screen.
        if(player['y'] + 1 <= 19){
            // Fetch color of space directory below the player.
            check_color = document.getElementById((player['y'] + 1) * 20 + player['x']).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === color_purple){
                    eat_purple_creature();
                }

                // Increase player Y position.
                player['y'] += 1;
                dy -= 1;

            // Collision!
            }else{
                end_game = 1;
            }

        // If player is at the bottom edge of the screen and can wrap in the U-direction.
        }else if(document.getElementById('wrap-select').value == 2
          || document.getElementById('wrap-select').value == 3){
            // Fetch color of space at the top of the screen.
            check_color = document.getElementById((player['y'] - 19) * 20 + player['x']).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === color_purple){
                    eat_purple_creature();
                }

                // Set player Y position to top of the screen.
                player['y'] = 0;
                dy += 19;

            // Collision!
            }else{
                end_game = 1;
            }

        // Collision!
        }else{
            end_game = 1;
        }

    // If player is moving left.
    }else if(player['movement_direction'] === 3){
        if(player['x'] - 1 >= 0){
            // Fetch color of space to the left of the player.
            check_color = document.getElementById(player['y'] * 20 + player['x'] - 1).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === color_purple){
                    eat_purple_creature();
                }

                // Decrease player x position.
                player['x'] -= 1;
                dx += 1;

            // Collision!
            }else{
                end_game = 1;
            }

        // If player is at the left edge of the screen and can wrap in the X-direction.
        }else if(document.getElementById('wrap-select').value == 1
          || document.getElementById('wrap-select').value == 2){
            // Fetch color of space at the right side of the screen.
            check_color = document.getElementById(player['y'] * 20 + player['x'] + 19).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === color_purple){
                    eat_purple_creature();
                }

                // Set player x position to right side of the screen.
                player['x'] += 19;
                dx -= 19;

            // Collision!
            }else{
                end_game = 1;
            }

        // Collision!
        }else{
            end_game = 1;
        }
    }

    // If a collision with an obstacle or edge was detected.
    if(end_game){
        // If game ends oncollision...
        if(document.getElementById('oncollision-select').value == 1){
            stop();

        // ...else if score decreases.
        }else if(document.getElementById('oncollision-select').value === 2){
            document.getElementById('score').innerHTML = 
              parseInt(
                document.getElementById('score').innerHTML,
                10
              ) - 1;
        }
    }

    // If player x or y position has changed.
    if(dx !== 0
      || dy !== 0){
        // Reset old player position to an empty space.
        document.getElementById((player['y'] + dy) * 20 + player['x'] + dx).style.backgroundColor = color_empty;
    }

    // Set color of new player position to color_player.
    document.getElementById(player['y'] * 20 + player['x']).style.backgroundColor = color_player;
}

function play_audio(id){
    if(document.getElementById('audio-volume').value <= 0){
        return;
    }

    document.getElementById(id).volume = document.getElementById('audio-volume').value;
    document.getElementById(id).currentTime = 0;
    document.getElementById(id).play();
}

function reset(){
    if(!confirm('Reset settings?')){
        return;
    }

    stop();

    document.getElementById('audio-volume').value = 1;
    document.getElementById('game-mode-select').value = 1;
    document.getElementById('holes-at-start').value = 0;
    document.getElementById('holes-per-point').value = 1;
    document.getElementById('max-frames').value = 0;
    document.getElementById('max-points').value = 0;
    document.getElementById('movement-keys').value = 'WASD';
    document.getElementById('ms-per-move').value = 125;
    document.getElementById('oncollision-select').value = 1;
    document.getElementById('start-key').value = 'H';
    document.getElementById('turn-angle-select').value = 0;
    document.getElementById('wrap-select').value = 0;
    document.getElementById('y-margin').value = 0;

    save();
}

function save(){
    // Save settings into localStorage, if differ from default.
    var loop_counter = 12;
    do{
        var id = [
          'turn-angle-select',
          'ms-per-move',
          'holes-per-point',
          'holes-at-start',
          'oncollision-select',
          'audio-volume',
          'max-frames',
          'wrap-select',
          'y-margin',
          'game-mode-select',
          'max-points',
          'movement-keys',
          'start-key',
        ][loop_counter];

        if(document.getElementById(id).value ==
          [0, 125, 1, 0, 1, 1, 0, 0, 0, 1, 0, 'WASD', 'H',][loop_counter]){
            window.localStorage.removeItem('Snakish.htm-' + id);

        }else{
            window.localStorage.setItem(
              'Snakish.htm-' + id,
              document.getElementById(id).value
            );
        }
    }while(loop_counter--);
}

function set_settings_disable(state){
    document.getElementById('game-mode-select').disabled = state;
    document.getElementById('holes-per-point').disabled = state;
    document.getElementById('max-frames').disabled = state;
    document.getElementById('max-points').disabled = state;
    document.getElementById('ms-per-move').disabled = state;
    document.getElementById('oncollision-select').disabled = state;
    document.getElementById('reset-button').disabled = state;
    document.getElementById('turn-angle-select').disabled = state;
    document.getElementById('wrap-select').disabled = state;
}

function showhide_settings(){
    if(document.getElementById('showhide-button').value === '-'){
        document.getElementById('settings-span').style.display = 'none';
        document.getElementById('showhide-button').value = '+';

    }else{
        document.getElementById('settings-span').style.display = 'inline';
        document.getElementById('showhide-button').value = '-';
    }
}

function start(){
    var loop_counter = 5;
    do{
        var id = [
          'audio-volume',
          'holes-at-start',
          'holes-per-point',
          'max-frames',
          'max-points',
          'ms-per-move',
          'y-margin',
        ][loop_counter];

        if(isNaN(document.getElementById(id).value)
          || document.getElementById(id).value < 0){
            document.getElementById(id).value = [
              1,
              0,
              1,
              0,
              0,
              125,
              0,
            ][loop_counter];
        }
    }while(loop_counter--);

    if(document.getElementById('holes-per-point').value > 396){
        document.getElementById('holes-per-point').value = 396;
    }

    // Adjust margin-top of entire game.
    document.getElementById('table').style.marginTop = document.getElementById('y-margin').value + 'px';

    set_settings_disable(true);

    // Reset buttons to empty with player and purple creature in initial positions.
    loop_counter = 399;
    do{
        document.getElementById(loop_counter).style.backgroundColor = color_empty;
    }while(loop_counter--);
    document.getElementById(21).style.backgroundColor = color_player;
    document.getElementById(378).style.backgroundColor = color_purple;

    document.getElementById('start-button').value = 'End [ESC]';
    document.getElementById('start-button').onclick = function(){
        stop(0);
    };
    document.getElementById('score').innerHTML = '0';

    // Reset player
    player['movement_direction'] = 1; // 0==Up, 1==Right, 2==Down, 3==Left
    player['x'] = 1;
    player['y'] = 1;

    // Create initial holes, if any.
    if(document.getElementById('holes-at-start').value > 0){
        if(document.getElementById('holes-at-start').value > 398){
            document.getElementById('holes-at-start').value = 398;
        }

        a = -1;
        loop_counter = document.getElementById('holes-at-start').value - 1;
        do{
            do{
                a = Math.floor(Math.random() * 400);
            }while(document.getElementById(a).style.backgroundColor !== color_empty);
            document.getElementById(a).style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }

    // Setup display or not display of max frames or max points.
    if(document.getElementById('game-mode-select').value === 1){
        document.getElementById('frames').innerHTML = document.getElementById('max-frames').value;
        document.getElementById('frames-max').innerHTML = document.getElementById('max-frames').value;
        document.getElementById('score-max').innerHTML = '';
        document.getElementById('frames-max-span').style.display =
          document.getElementById('max-frames').value > 0
            ? 'inline'
            : 'none';

    }else{
        document.getElementById('frames').innerHTML = 0;
        document.getElementById('frames-max-span').style.display = 'none';
        document.getElementById('score-max').innerHTML = document.getElementById('max-points').value > 0
          ? ' out of <b>' + document.getElementById('max-points').value + '</b>'
          : '';
    }

    // Validate milliseconds per player movement and create interval.
    interval = window.setInterval(
      'move_player()',
      (document.getElementById('ms-per-move').value > 0)
        ? document.getElementById('ms-per-move').value
        : 125
    );

    // Save settings.
    save();
}

function stop(){
    window.clearInterval(interval);
    document.getElementById('start-button').value =
      'Start [' + document.getElementById('start-key').value + ']';
    document.getElementById('start-button').onclick = function(){
        start();
    };
    set_settings_disable(false);
}

var color_empty = 'rgb(42, 42, 42)';
var color_obstacle = 'rgb(0, 0, 0)';
var color_player = 'rgb(32, 102, 32)';
var color_purple = 'rgb(102, 51, 102)';
var interval = 0;
var player = {
  movement_direction: 1,// 0==Up, 1==Right, 2==Down, 3==Left.
  x: 1,
  y: 1,
};

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // ESC: stop current game.
    if(key === 27){
        stop();
        return;
    }

    key = String.fromCharCode(key);

    // If player wants to move up (if player is moving down then check if 180 degree turns are legal).
    if(key === document.getElementById('movement-keys').value[0]
      && (player['movement_direction'] !== 2 || document.getElementById('turn-angle-select').value == 1)){
        // Player move direction = up.
        player['movement_direction'] = 0;

    // If player wants to move right (if player is moving left then check if 180 degree turns are legal).
    }else if(key === document.getElementById('movement-keys').value[1]
      && (player['movement_direction'] !== 1 || document.getElementById('turn-angle-select').value == 1)){
        // Player move direction = left.
        player['movement_direction'] = 3;

    // If player wants to move down (if player is moving up then check if 180 degree turns are legal).
    }else if(key === document.getElementById('movement-keys').value[2]
      && (player['movement_direction'] !== 0 || document.getElementById('turn-angle-select').value == 1)){
        // Player move direction = down.
        player['movement_direction'] = 2;

    // If player wants to move left (if player is moving right then check if 180 degree turns are legal).
    }else if(key === document.getElementById('movement-keys').value[3]
      && (player['movement_direction'] !== 3 || document.getElementById('turn-angle-select').value == 1)){
        // Player move direction = right.
        player['movement_direction'] = 1;

    }else if(key === document.getElementById('start-key').value){
        stop();
        start();
    }
};

window.onload = function(){
    // Fetch settings from window.localStorage and update settings inputs.
    document.getElementById('audio-volume').value = window.localStorage.getItem('Snakish.htm-audio-volume') === null
      ? 1
      : parseFloat(window.localStorage.getItem('Snakish.htm-audio-volume'));
    document.getElementById('game-mode-select').value = window.localStorage.getItem('Snakish.htm-game-mode-select') === null
      ? 1
      : 0;
    document.getElementById('holes-at-start').value = window.localStorage.getItem('Snakish.htm-audio-holes-at-start') === null
      ? 0
      : parseInt(window.localStorage.getItem('Snakish.htm-holes-at-start'), 10);
    document.getElementById('holes-per-point').value = window.localStorage.getItem('Snakish.htm-holes-per-point') === null
      ? 1
      : parseInt(window.localStorage.getItem('Snakish.htm-holes-per-point'), 10);
    document.getElementById('max-frames').value = window.localStorage.getItem('Snakish.htm-max-frames') === null
      ? 0
      : parseInt(window.localStorage.getItem('Snakish.htm-max-frames'), 10);
    document.getElementById('max-points').value = window.localStorage.getItem('Snakish.htm-max-points') === null
      ? 0
      : parseInt(window.localStorage.getItem('Snakish.htm-max-points'), 10);
    document.getElementById('movement-keys').value = window.localStorage.getItem('Snakish.htm-movement-keys') === null
      ? 'WASD'
      : window.localStorage.getItem('Snakish.htm-movement-keys');
    document.getElementById('ms-per-move').value = window.localStorage.getItem('Snakish.htm-ms-per-move') === null
      ? 125
      : parseInt(window.localStorage.getItem('Snakish.htm-ms-per-move'), 10);
    document.getElementById('oncollision-select').value = window.localStorage.getItem('Snakish.htm-oncollision-select') === null
      ? 1
      : parseInt(window.localStorage.getItem('Snakish.htm-oncollision-select'), 10);
    document.getElementById('turn-angle-select').value = window.localStorage.getItem('Snakish.htm-turn-angle-select') === null
      ? 0
      : parseInt(window.localStorage.getItem('Snakish.htm-turn-angle-select'), 10);
    document.getElementById('wrap-select').value = window.localStorage.getItem('Snakish.htm-wrap-select') === null
      ? 0
      : parseInt(window.localStorage.getItem('Snakish.htm-wrap-select'), 10);
    document.getElementById('y-margin').value = window.localStorage.getItem('Snakish.htm-y-margin') === null
      ? 0
      : parseInt(window.localStorage.getItem('Snakish.htm-y-margin'), 10);

    if(window.localStorage.getItem('Snakish.htm-start-key') === null){
        document.getElementById('start-key').value = 'H';

    }else{
        document.getElementById('start-key').value = window.localStorage.getItem('Snakish.htm-start-key');
        document.getElementById('start-button').value =
          'Start [' + window.localStorage.getItem('Snakish.htm-start-key') + ']';
    }

    // Adjust margin-top of entire game.
    document.getElementById('table').style.marginTop = document.getElementById('y-margin').value + 'px';

    // Create buttons for game-area.
    var output = [''];

    for(var loop_counter = 0; loop_counter < 400; loop_counter++){
        if(loop_counter % 20 === 0 && loop_counter !== 0){
            output.push('<br>');
        }
        output.push(
          '<input class=buttons disabled id='
          + loop_counter
          + ' style="background:'
          + color_empty
          + '" type=button>'
        );
    }
    output[23] = '<input class=buttons disabled id=21 style="background:' + color_player + '" type=button>';
    output[397] = '<input class=buttons disabled id=378 style="background:' + color_purple + '" type=button>';
    document.getElementById('game-area').innerHTML = output.join('');
};
