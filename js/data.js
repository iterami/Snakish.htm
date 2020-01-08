'use strict';

function eat_purple_creature(){
    audio_start({
      'id': 'boop',
    });

    let element = document.getElementById('score');
    element.textContent = Number.parseInt(
      element.textContent,
      10
    ) + 1;

    // If there is no space available for more holes, stop.
    if(element.textContent >= Math.floor(398 / (core_storage_data['holes-per-point'] + 1)) + 1){
        core_interval_pause_all();
        return;
    }

    // Pick a button with color_empty and make it the new purple creature.
    let id = -1;
    do{
        id = core_random_integer({
          'max': 400,
        });
    }while(document.getElementById(id).style.backgroundColor !== color_empty);

    element = document.getElementById(id);
    element.style.backgroundColor = core_storage_data['color-negative'];
    element.value = '+';

    let loop_counter = core_storage_data['holes-per-point'] - 1;
    // If more than 0 holes should be created.
    if(loop_counter >= 0){
        // Add new holes.
        do{
            while(document.getElementById(id).style.backgroundColor !== color_empty){
                id = core_random_integer({
                  'max': 400,
                });
            }
            document.getElementById(id).style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }
}

function move_player(){
    let check_color = 0;
    let dx = 0;
    let dy = 0;
    let end_game = false;

    // Player movement direction.
    if(core_keys[core_storage_data['move-←']]['state']){
        if(player['movement_direction'] !== 1 || core_storage_data['turn-angle'] === 1){
            player['movement_direction'] = 3;
        }

    }else if(core_keys[core_storage_data['move-→']]['state']){
        if(player['movement_direction'] !== 3 || core_storage_data['turn-angle'] === 1){
            player['movement_direction'] = 1;
        }

    }else if(core_keys[core_storage_data['move-↓']]['state']){
        if(player['movement_direction'] !== 0 || core_storage_data['turn-angle'] === 1){
            player['movement_direction'] = 2;
        }

    }else if(core_keys[core_storage_data['move-↑']]['state']){
        if(player['movement_direction'] !== 2 || core_storage_data['turn-angle'] === 1){
            player['movement_direction'] = 0;
        }
    }

    // If player is moving up.
    if(player['movement_direction'] === 0){
        // If player is not at the top of the screen.
        if(player['y'] - 1 >= 0){
            // Fetch color of space directly above the player.
            check_color = document.getElementById((player['y'] - 1) * 20 + player['x']).style.backgroundColor;

            // If the space is not an obstacle continue, else collision.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_hex_to_rgb({
                  'hex': core_storage_data['color-negative'],
                })){
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
        }else if(core_storage_data['wrap'] === 2
          || core_storage_data['wrap'] === 3){
            // Fetch color of space at the bottom of the screen.
            check_color = document.getElementById((player['y'] + 19) * 20 + player['x']).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_hex_to_rgb({
                  'hex': core_storage_data['color-negative'],
                })){
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
                if(check_color === core_hex_to_rgb({
                  'hex': core_storage_data['color-negative'],
                })){
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
        }else if(core_storage_data['wrap'] === 1
          || core_storage_data['wrap'] === 2){
            // Fetch color of space at the left of the screen.
            check_color = document.getElementById(player['y'] * 20 + player['x'] - 19).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_hex_to_rgb({
                  'hex': core_storage_data['color-negative'],
                })){
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
                if(check_color === core_hex_to_rgb({
                  'hex': core_storage_data['color-negative'],
                })){
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
        }else if(core_storage_data['wrap'] === 2
          || core_storage_data['wrap'] === 3){
            // Fetch color of space at the top of the screen.
            check_color = document.getElementById((player['y'] - 19) * 20 + player['x']).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_hex_to_rgb({
                  'hex': core_storage_data['color-negative'],
                })){
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
                if(check_color === core_hex_to_rgb({
                  'hex': core_storage_data['color-negative'],
                })){
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
        }else if(core_storage_data['wrap'] === 1
          || core_storage_data['wrap'] === 2){
            // Fetch color of space at the right side of the screen.
            check_color = document.getElementById(player['y'] * 20 + player['x'] + 19).style.backgroundColor;

            // If the space is not an obstacle continue.
            if(check_color !== color_obstacle){
                // If color of space is purple, eat the creature.
                if(check_color === core_hex_to_rgb({
                  'hex': core_storage_data['color-negative'],
                })){
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
        if(core_storage_data['oncollision'] === 1){
            core_interval_pause_all();

        // ...else if score decreases.
        }else if(core_storage_data['oncollision'] === 2){
            let element = document.getElementById('score');
            element.textContent = Number.parseInt(
              element.textContent,
              10
            ) - 1;
        }
    }

    // If player x or y position has changed.
    if(dx !== 0
      || dy !== 0){
        // Reset old player position to color_empty.
        let element = document.getElementById((player['y'] + dy) * 20 + player['x'] + dx);
        element.style.backgroundColor = color_empty;
        element.value = '';
    }

    // Set color of new player position to core_storage_data['color-positive'].
    let element = document.getElementById(player['y'] * 20 + player['x']);
    element.style.backgroundColor = core_storage_data['color-positive'];
    element.value = '•';
}

function start(){
    // Reset buttons to empty with player and purple creature in initial positions.
    let loop_counter = 399;
    do{
        let element = document.getElementById(loop_counter);

        element.style.backgroundColor = color_empty;
        element.style.height = core_storage_data['height'];
        element.style.width = core_storage_data['width'];
        element.value = '';
    }while(loop_counter--);
    let element = document.getElementById(21);
    element.style.backgroundColor = core_storage_data['color-positive'];
    element.value = '•';

    element = document.getElementById(378);
    element.style.backgroundColor = core_storage_data['color-negative'];
    element.value = '+';

    document.getElementById('score').textContent = '0';

    // Reset player
    player['movement_direction'] = 1; // 0=Up, 1=Right, 2=Down, 3=Left
    player['x'] = 1;
    player['y'] = 1;

    // Create initial holes, if any.
    if(core_storage_data['holes-at-start'] > 0){
        let id = -1;
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

    // Validate milliseconds per player movement and create interval.
    core_interval_modify({
      'id': 'interval',
      'interval': core_storage_data['ms-per-move'],
      'todo': move_player,
    });
}
