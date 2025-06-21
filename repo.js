'use strict';

function eat_purple_creature(){
    audio_start('boop');

    core_ui_update({
      'ids': {
        'score': ++score,
      },
    });

    let id = -1;
    let loop_counter = Math.floor(Math.min(
      core_storage_data.holes_point - 1,
      397
    ));
    const player_xy = player.y * 20 + player.x;
    if(loop_counter >= 0){
        do{
            do{
                id = core_random_integer(empty.length);
            }while(empty[id] === player_xy);
            core_elements[empty.splice(id, 1)].style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }

    do{
        id = core_random_integer(empty.length);
    }while(empty[id] === player_xy);
    core_elements[empty[id]].style.backgroundColor = color_negative;
    core_elements[empty[id]].textContent = '+';
}

function move_player(){
    let check_color = 0;
    let dx = 0;
    let dy = 0;
    let end_game = false;

    let move_down = core_keys[core_storage_data['move-↓']].state;
    let move_left = core_keys[core_storage_data['move-←']].state;
    let move_right = core_keys[core_storage_data['move-→']].state;
    let move_up = core_keys[core_storage_data['move-↑']].state;
    if(core_pointer['down-0']){
        const element = core_elements[player.y * 20 + player.x];
        const x = core_pointer.x - element.offsetLeft;
        const y = core_pointer.y - element.offsetTop;
        if(x < 0){
            if(y < x){
                move_up = true;

            }else if(y > 0 && -y < x){
                move_down = true;

            }else{
                move_left = true;
            }

        }else if(x < y){
            move_down = true;

        }else if(y < 0 && -y > x){
            move_up = true;

        }else{
            move_right = true;
        }
    }

    if(move_left){
        if(player.movement_direction !== 1 || core_storage_data.turn_angle === 1){
            player.movement_direction = 3;
        }

    }else if(move_right){
        if(player.movement_direction !== 3 || core_storage_data.turn_angle === 1){
            player.movement_direction = 1;
        }

    }else if(move_down){
        if(player.movement_direction !== 0 || core_storage_data.turn_angle === 1){
            player.movement_direction = 2;
        }

    }else if(move_up){
        if(player.movement_direction !== 2 || core_storage_data.turn_angle === 1){
            player.movement_direction = 0;
        }
    }

    if(player.movement_direction === 0){
        if(player.y - 1 >= 0){
            check_color = core_elements[(player.y - 1) * 20 + player.x].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player.y -= 1;
                dy += 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data.wrap === 2
          || core_storage_data.wrap === 3){
            check_color = core_elements[(player.y + 19) * 20 + player.x].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player.y = 19;
                dy -= 19;

            }else{
                end_game = true;
            }

        }else{
            end_game = true;
        }

    }else if(player.movement_direction === 1){
        if(player.x + 1 <= 19){
            check_color = core_elements[player.y * 20 + player.x + 1].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player.x += 1;
                dx -= 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data.wrap === 1
          || core_storage_data.wrap === 2){
            check_color = core_elements[player.y * 20 + player.x - 19].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player.x -= 19;
                dx += 19;

            }else{
                end_game = true;
            }

        }else{
            end_game = true;
        }

    }else if(player.movement_direction === 2){
        if(player.y + 1 <= 19){
            check_color = core_elements[(player.y + 1) * 20 + player.x].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player.y += 1;
                dy -= 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data.wrap === 2
          || core_storage_data.wrap === 3){
            check_color = core_elements[(player.y - 19) * 20 + player.x].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player.y = 0;
                dy += 19;

            }else{
                end_game = true;
            }

        }else{
            end_game = true;
        }

    }else if(player.movement_direction === 3){
        if(player.x - 1 >= 0){
            check_color = core_elements[player.y * 20 + player.x - 1].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player.x -= 1;
                dx += 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data.wrap === 1
          || core_storage_data.wrap === 2){
            check_color = core_elements[player.y * 20 + player.x + 19].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player.x += 19;
                dx -= 19;

            }else{
                end_game = true;
            }

        }else{
            end_game = true;
        }
    }

    if(end_game){
        if(core_storage_data.collision === 1){
            core_interval_pause_all();

        }else if(core_storage_data.collision === 2){
            core_ui_update({
              'ids': {
                'score': --score,
              },
            });
        }
    }

    if(dx !== 0
      || dy !== 0){
        const element = core_elements[(player.y + dy) * 20 + player.x + dx];
        element.style.backgroundColor = '';
        element.textContent = '';
    }

    const element = core_elements[player.y * 20 + player.x];
    element.style.backgroundColor = color_positive;
    element.textContent = '•';
}

function repo_escape(){
    if(!core_intervals.interval
      && !core_menu_open){
        start();
    }
}

function repo_init(){
    core_repo_init({
      'beforeunload': {
        'todo': function(event){
            if(score > 0){
                event.preventDefault();
            }
        },
      },
      'events': {
        'start-button': {
          'onclick': start,
        },
      },
      'globals': {
        'color_negative': 'rgb(102, 51, 102)',
        'color_obstacle': 'rgb(0, 0, 0)',
        'color_positive': '#206620',
        'empty': [],
        'player': {
          'movement_direction': 1,// 0=Up, 1=Right, 2=Down, 3=Left
          'x': 1,
          'y': 1,
        },
        'score': 0,
      },
      'info': '<button id=start-button type=button>Restart</button>',
      'menu': true,
      'pointerbinds': {},
      'storage': {
        'collision': 1,
        'height': 25,
        'holes_point': 1,
        'holes_start': 0,
        'ms_per_move': 125,
        'turn_angle': 0,
        'width': 25,
        'wrap': 0,
      },
      'storage_controls': true,
      'storage_menu': '<table><tr><td><input class=mini id=height min=1 step=any type=number><td>Button Height'
        + '<tr><td><input class=mini id=width min=1 step=any type=number><td>Button Width'
        + '<tr><td><select id=collision><option value=1>End Game<option value=0>Nothing<option value=2>Score-1</select><td>Collision'
        + '<tr><td><input class=mini id=holes_point min=0 step=1 type=number><td>Holes/Point'
        + '<tr><td><input class=mini id=holes_start min=0 step=1 type=number><td>Holes/Start'
        + '<tr><td><input class=mini id=ms_per_move min=1 step=any type=number><td>ms/Move'
        + '<tr><td><select id=turn_angle><option value=0>90°<option value=1>any</select><td>Turn Angle'
        + '<tr><td><select id=wrap><option value=0>No<option value=1>X<option value=2>X+Y<option value=3>Y</select><td>Wrap</table>',
      'title': 'Snakish.htm',
      'ui_elements': [
        'game',
      ],
    });

    let output = '';
    core_elements.game.style.minWidth = '560px';

    for(let loop_counter = 0; loop_counter < 400; loop_counter++){
        if(loop_counter % 20 === 0 && loop_counter !== 0){
            output += '<br>';
        }

        output += '<button class=gridbutton disabled id=' + loop_counter + ' type=button></button>';
    }
    core_elements.game.innerHTML = output + '<br>';
    reset();
}

function reset(){
    core_object_reset(empty);
    let loop_counter = 399;
    do{
        if(loop_counter !== 21 && loop_counter !== 378){
            empty.push(loop_counter);
        }
        if(!core_elements[loop_counter]){
            core_elements[loop_counter] = document.getElementById(loop_counter);
        }
        const style = core_elements[loop_counter].style;
        style.backgroundColor = '';
        style.fontSize = Math.ceil(core_storage_data.height / 2) + 'px';
        style.height = core_storage_data.height + 'px';
        style.lineHeight = Math.ceil(core_storage_data.height / 2) + 'px';
        style.width = core_storage_data.width + 'px';
        core_elements[loop_counter].textContent = '';
    }while(loop_counter--);

    core_elements[21].style.backgroundColor = color_positive;
    core_elements[21].textContent = '•';
    core_elements[378].style.backgroundColor = color_negative;
    core_elements[378].textContent = '+';

    core_elements.game.style.lineHeight = core_storage_data.height + 'px';
    score = 0;

    player.movement_direction = 1; // 0=Up, 1=Right, 2=Down, 3=Left
    player.x = 1;
    player.y = 1;
}

function start(){
    if(score > 0
      && !globalThis.confirm('Start new game?')){
        return;
    }
    if(core_menu_open){
        core_escape();
    }
    reset();

    if(core_storage_data.holes_start > 0){
        let loop_counter = Math.floor(Math.min(
          core_storage_data.holes_start - 1,
          396
        ));
        do{
            const id = empty.splice(
              core_random_integer(empty.length),
              1
            );
            core_elements[id].style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }

    core_interval_modify({
      'id': 'interval',
      'interval': core_storage_data.ms_per_move,
      'todo': move_player,
    });
}
