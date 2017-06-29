'use strict';

function eat_purple_creature(){
    core_audio_start({
      'id': 'boop',
    });

    document.getElementById('score').innerHTML = parseInt(
      document.getElementById('score').innerHTML,
      10
    ) + 1;

    // If there is no space available for more holes, stop.
    var holes_per_point = core_storage_data['holes-per-point'];
    if(document.getElementById('score').innerHTML >=
      Math.floor(398 / (parseInt(holes_per_point, 10) + 1)) + 1){
        stop();
        return;
    }

    // Pick a button with color_empty and make it the new purple creature.
    var id = -1;
    do{
        id = core_random_integer({
          'max': 400,
        });
    }while(document.getElementById(id).style.backgroundColor != color_empty);
    document.getElementById(id).style.backgroundColor = core_storage_data['color-negative'];

    var loop_counter = holes_per_point - 1;
    // If more than 0 holes should be created.
    if(loop_counter >= 0){
        // Add new holes.
        do{
            while(document.getElementById(id).style.backgroundColor != color_empty){
                id = core_random_integer({
                  'max': 400,
                });
            }
            document.getElementById(id).style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }
}

function move_player(){
    // Check if game is still running, based on game mode and if frames/score are over max.
    var frames = parseFloat(document.getElementById('frames').innerHTML);
    var end_game = core_storage_data['game-mode'] === 1
      ? frames <= 0
        && core_storage_data['max'] > 0
      : core_storage_data['max'] != 0
        && parseInt(document.getElementById('score').innerHTML, 10) >= core_storage_data['max'];

    // If game is not running, stop().
    if(end_game){
        stop();
        return;
    }

    // Add or subtract 1 from frames depending on game mode.
    document.getElementById('frames').innerHTML = (frames +
        ((core_storage_data['game-mode'] === 1
      && core_storage_data['max'] > 0) ? -1 : 1));

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
                if(check_color === core_storage_data['color-negative']){
                    eat_purple_creature();
                }

                // Decrease player Y position.
                player['y'] -= 1;
                dy += 1;

            // Collision!
            }else{
                end_game = true;
            }

        // If player is at the top of the screen and can wrap in the Y-direction.
        }else if(core_storage_data['wrap'] == 2
          || core_storage_data['wrap'] == 3){
            // Fetch color of space at the bottom of the screen.
            check_color = document.getElementById((player['y'] + 19) * 20 + player['x']).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_storage_data['color-negative']){
                    eat_purple_creature();
                }

                // Set player Y position to bottom of the screen.
                player['y'] = 19;
                dy -= 19;

            // Collision!
            }else{
                end_game = true;
            }

        // Collision!
        }else{
            end_game = true;
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
                if(check_color === core_storage_data['color-negative']){
                    eat_purple_creature();
                }

                // Increase player X position.
                player['x'] += 1;
                dx -= 1;

            // Collision!
            }else{
                end_game = true;
            }

        // If player is at the right edge of the screen and can wrap in the X-direction.
        }else if(core_storage_data['wrap'] == 1
          || core_storage_data['wrap'] == 2){
            // Fetch color of space at the left of the screen.
            check_color = document.getElementById(player['y'] * 20 + player['x'] - 19).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_storage_data['color-negative']){
                    eat_purple_creature();
                }

                // Set player X position to left side of the screen.
                player['x'] -= 19;
                dx += 19;

            // Collision!
            }else{
                end_game = true;
            }

        // Collision!
        }else{
            end_game = true;
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
                if(check_color === core_storage_data['color-negative']){
                    eat_purple_creature();
                }

                // Increase player Y position.
                player['y'] += 1;
                dy -= 1;

            // Collision!
            }else{
                end_game = true;
            }

        // If player is at the bottom edge of the screen and can wrap in the U-direction.
        }else if(core_storage_data['wrap'] == 2
          || core_storage_data['wrap'] == 3){
            // Fetch color of space at the top of the screen.
            check_color = document.getElementById((player['y'] - 19) * 20 + player['x']).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_storage_data['color-negative']){
                    eat_purple_creature();
                }

                // Set player Y position to top of the screen.
                player['y'] = 0;
                dy += 19;

            // Collision!
            }else{
                end_game = true;
            }

        // Collision!
        }else{
            end_game = true;
        }

    // If player is moving left.
    }else if(player['movement_direction'] === 3){
        if(player['x'] - 1 >= 0){
            // Fetch color of space to the left of the player.
            check_color = document.getElementById(player['y'] * 20 + player['x'] - 1).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_storage_data['color-negative']){
                    eat_purple_creature();
                }

                // Decrease player x position.
                player['x'] -= 1;
                dx += 1;

            // Collision!
            }else{
                end_game = true;
            }

        // If player is at the left edge of the screen and can wrap in the X-direction.
        }else if(core_storage_data['wrap'] == 1
          || core_storage_data['wrap'] == 2){
            // Fetch color of space at the right side of the screen.
            check_color = document.getElementById(player['y'] * 20 + player['x'] + 19).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_storage_data['color-negative']){
                    eat_purple_creature();
                }

                // Set player x position to right side of the screen.
                player['x'] += 19;
                dx -= 19;

            // Collision!
            }else{
                end_game = true;
            }

        // Collision!
        }else{
            end_game = true;
        }
    }

    // If a collision with an obstacle or edge was detected.
    if(end_game){
        // If game ends oncollision...
        if(core_storage_data['oncollision'] == 1){
            stop();

        // ...else if score decreases.
        }else if(core_storage_data['oncollision'] === 2){
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
        // Reset old player position to color_empty.
        document.getElementById((player['y'] + dy) * 20 + player['x'] + dx).style.backgroundColor = color_empty;
    }

    // Set color of new player position to core_storage_data['color-positive'].
    document.getElementById(player['y'] * 20 + player['x']).style.backgroundColor = core_storage_data['color-positive'];
}

function repo_escape(){
    stop();
}

function repo_init(){
    core_repo_init({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
      'keybinds': {
        65: {
          'todo': function(){
              if(player['movement_direction'] !== 1 || core_storage_data['turn-angle'] == 1){
                  player['movement_direction'] = 3;
              }
          },
        },
        68: {
          'todo': function(){
              if(player['movement_direction'] !== 3 || core_storage_data['turn-angle'] == 1){
                  player['movement_direction'] = 1;
              }
          },
        },
        72: {
          'todo': function(){
              stop();
              start();
          },
        },
        83: {
          'todo': function(){
              if(player['movement_direction'] !== 0 || core_storage_data['turn-angle'] == 1){
                  player['movement_direction'] = 2;
              }
          },
        },
        87: {
          'todo': function(){
              if(player['movement_direction'] !== 2 || core_storage_data['turn-angle'] == 1){
                  player['movement_direction'] = 0;
              }
          },
        },
      },
      'storage': {
        'game-mode': 0,
        'holes-at-start': 0,
        'holes-per-point': 1,
        'max': 0,
        'ms-per-move': 125,
        'oncollision': 1,
        'turn-angle': 0,
        'wrap': 0,
      },
      'storage-menu': '<table><tr><td><input id=holes-at-start><td>Holes at Start<tr><td><input id=holes-per-point><td>Holes/Point<tr><td><input id=max><td>Max <select id=game-mode><option value=1>Frames</option><option value=0>Points</option></select><tr><td><input id=ms-per-move><td>ms/Move<tr><td><select id=oncollision><option value=1>End Game</option><option value=0>Nothing</option><option value=2>Score-1</option></select><td>OnCollision<tr><td><select id=turn-angle><option value=0>90</option><option value=1>&lt;=180</option></select><td>° Turn Angle<tr><td><select id=wrap><option value=0>No</option><option value=1>X</option><option value=2>X&amp;Y</option><option value=3>Y</option></select><td>Wrap</table>',
      'title': 'Snakish.htm',
    });

    // Create buttons for game-div.
    var output = '';

    for(var loop_counter = 0; loop_counter < 400; loop_counter++){
        if(loop_counter % 20 === 0 && loop_counter !== 0){
            output += '<br>';
        }

        var color = color_empty;
        if(loop_counter == 21){
            color = core_storage_data['color-positive'];

        }else if(loop_counter == 378){
            color = core_storage_data['color-negative'];
        }

        output +=
          '<input class=gridbutton disabled id=' + loop_counter
          + ' style="background:' + color
          + '" type=button>';
    }
    document.getElementById('game-div').innerHTML = output;

    stop();

    document.getElementById('start-button').onclick = start;
}

function start(){
    core_storage_save();

    // Reset buttons to empty with player and purple creature in initial positions.
    var loop_counter = 399;
    do{
        document.getElementById(loop_counter).style.backgroundColor = color_empty;
    }while(loop_counter--);
    document.getElementById(21).style.backgroundColor = core_storage_data['color-positive'];
    document.getElementById(378).style.backgroundColor = core_storage_data['color-negative'];

    document.getElementById('start-button').value = 'End [ESC]';
    document.getElementById('start-button').onclick = stop;
    document.getElementById('score').innerHTML = '0';

    // Reset player
    player['movement_direction'] = 1; // 0==Up, 1==Right, 2==Down, 3==Left
    player['x'] = 1;
    player['y'] = 1;

    // Create initial holes, if any.
    if(core_storage_data['holes-at-start'] > 0){
        var id = -1;
        loop_counter = core_storage_data['holes-at-start'] - 1;
        do{
            do{
                id = core_random_integer({
                  'max': 400,
                });
            }while(document.getElementById(id).style.backgroundColor !== color_empty);
            document.getElementById(id).style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }

    // Setup display or not display of max frames or max points.
    if(core_storage_data['game-mode'] === 1){
        document.getElementById('frames').innerHTML = core_storage_data['max'];
        document.getElementById('frames-max').innerHTML = core_storage_data['max'];
        document.getElementById('score-max').innerHTML = '';
        document.getElementById('frames-max-span').style.display =
          document.getElementById('max').value > 0
            ? 'inline'
            : 'none';

    }else{
        document.getElementById('frames').innerHTML = 0;
        document.getElementById('frames-max-span').style.display = 'none';
        document.getElementById('score-max').innerHTML = core_storage_data['max'] > 0
          ? ' / ' + core_storage_data['max']
          : '';
    }

    // Validate milliseconds per player movement and create interval.
    interval = window.setInterval(
      move_player,
      core_storage_data['ms-per-move'] > 0
        ? core_storage_data['ms-per-move']
        : 125
    );
}

function stop(){
    window.clearInterval(interval);
    document.getElementById('start-button').value = 'Start [H]';
    document.getElementById('start-button').onclick = start;
}

var color_empty = 'rgb(42, 42, 42)';
var color_obstacle = 'rgb(0, 0, 0)';
var interval = 0;
var player = {
  'movement_direction': 1,// 0==Up, 1==Right, 2==Down, 3==Left
  'x': 1,
  'y': 1,
};
