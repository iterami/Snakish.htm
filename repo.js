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

    if(element.textContent >= Math.floor(398 / (core_storage_data['holes-point'] + 1)) + 1){
        core_interval_pause_all();
        return;
    }

    let id = -1;
    do{
        id = core_random_integer({
          'max': 400,
        });
    }while(document.getElementById(id).style.backgroundColor !== color_empty);

    element = document.getElementById(id);
    element.style.backgroundColor = core_storage_data['color-negative'];
    element.value = '+';

    let loop_counter = core_storage_data['holes-point'] - 1;
    if(loop_counter >= 0){
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

    const rgb = core_hex_to_rgb({
      'hex': core_storage_data['color-negative'],
    });
    const rgb_negative = 'rgb(' + rgb['red'] + ', ' + rgb['green'] + ', ' + rgb['blue'] + ')';

    if(player['movement_direction'] === 0){
        if(player['y'] - 1 >= 0){
            check_color = document.getElementById((player['y'] - 1) * 20 + player['x']).style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === rgb_negative){
                    eat_purple_creature();
                }

                player['y'] -= 1;
                dy += 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data['wrap'] === 2
          || core_storage_data['wrap'] === 3){
            check_color = document.getElementById((player['y'] + 19) * 20 + player['x']).style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === rgb_negative){
                    eat_purple_creature();
                }

                player['y'] = 19;
                dy -= 19;

            }else{
                end_game = true;
            }

        }else{
            end_game = true;
        }

    }else if(player['movement_direction'] === 1){
        if(player['x'] + 1 <= 19){
            check_color = document.getElementById(player['y'] * 20 + player['x'] + 1).style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === rgb_negative){
                    eat_purple_creature();
                }

                player['x'] += 1;
                dx -= 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data['wrap'] === 1
          || core_storage_data['wrap'] === 2){
            check_color = document.getElementById(player['y'] * 20 + player['x'] - 19).style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === rgb_negative){
                    eat_purple_creature();
                }

                player['x'] -= 19;
                dx += 19;

            }else{
                end_game = true;
            }

        }else{
            end_game = true;
        }

    }else if(player['movement_direction'] === 2){
        if(player['y'] + 1 <= 19){
            check_color = document.getElementById((player['y'] + 1) * 20 + player['x']).style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === rgb_negative){
                    eat_purple_creature();
                }

                player['y'] += 1;
                dy -= 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data['wrap'] === 2
          || core_storage_data['wrap'] === 3){
            check_color = document.getElementById((player['y'] - 19) * 20 + player['x']).style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === rgb_negative){
                    eat_purple_creature();
                }

                player['y'] = 0;
                dy += 19;

            }else{
                end_game = true;
            }

        }else{
            end_game = true;
        }

    }else if(player['movement_direction'] === 3){
        if(player['x'] - 1 >= 0){
            check_color = document.getElementById(player['y'] * 20 + player['x'] - 1).style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === rgb_negative){
                    eat_purple_creature();
                }

                player['x'] -= 1;
                dx += 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data['wrap'] === 1
          || core_storage_data['wrap'] === 2){
            check_color = document.getElementById(player['y'] * 20 + player['x'] + 19).style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === rgb_negative){
                    eat_purple_creature();
                }

                player['x'] += 19;
                dx -= 19;

            }else{
                end_game = true;
            }

        }else{
            end_game = true;
        }
    }

    if(end_game){
        if(core_storage_data['collision'] === 1){
            core_interval_pause_all();

        }else if(core_storage_data['collision'] === 2){
            const element = document.getElementById('score');
            element.textContent = Number.parseInt(
              element.textContent,
              10
            ) - 1;
        }
    }

    if(dx !== 0
      || dy !== 0){
        const element = document.getElementById((player['y'] + dy) * 20 + player['x'] + dx);
        element.style.backgroundColor = color_empty;
        element.value = '';
    }

    const element = document.getElementById(player['y'] * 20 + player['x']);
    element.style.backgroundColor = core_storage_data['color-positive'];
    element.value = '•';
}

function repo_escape(){
    if(!core_intervals['interval']
      && !core_menu_open){
        core_repo_reset();
    }
}

function repo_init(){
    core_repo_init({
      'events': {
        'start-button': {
          'onclick': core_repo_reset,
        },
      },
      'globals': {
        'color_empty': 'rgb(42, 42, 42)',
        'color_obstacle': 'rgb(0, 0, 0)',
        'player': {
          'movement_direction': 1,// 0=Up, 1=Right, 2=Down, 3=Left
          'x': 1,
          'y': 1,
        },
      },
      'info': '<input id=start-button type=button value=Restart>',
      'menu': true,
      'reset': function(){
          stop();
          if(core_menu_open){
              core_escape();
          }
          start();
      },
      'storage': {
        'collision': 1,
        'height': '25px',
        'holes-point': 1,
        'holes-start': 0,
        'ms-per-move': 125,
        'turn-angle': 0,
        'width': '25px',
        'wrap': 0,
      },
      'storage-menu': '<table><tr><td><input class=mini id=height type=text><td>Button Height'
        + '<tr><td><input class=mini id=width type=text><td>Button Width'
        + '<tr><td><select id=collision><option value=1>End Game<option value=0>Nothing<option value=2>Score-1</select><td>Collision'
        + '<tr><td><input class=mini id=holes-point min=0 step=any type=number><td>Holes/Point'
        + '<tr><td><input class=mini id=holes-start min=0 step=any type=number><td>Holes/Start'
        + '<tr><td><input class=mini id=ms-per-move min=1 step=any type=number><td>ms/Move'
        + '<tr><td><select id=turn-angle><option value=0>90°<option value=1>any</select><td>Turn Angle'
        + '<tr><td><select id=wrap><option value=0>No<option value=1>X<option value=2>X+Y<option value=3>Y</select><td>Wrap</table>',
      'title': 'Snakish.htm',
    });
    audio_create({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
    });

    let output = '';
    const gamediv = document.getElementById('game-div');
    gamediv.style.minWidth = '560px';

    for(let loop_counter = 0; loop_counter < 400; loop_counter++){
        if(loop_counter % 20 === 0 && loop_counter !== 0){
            output += '<br>';
        }

        let color = color_empty;
        let value = '';

        if(loop_counter === 21){
            color = core_storage_data['color-positive'];
            value = '•';

        }else if(loop_counter === 378){
            color = core_storage_data['color-negative'];
            value = '+';
        }

        output +=
          '<input class=gridbutton disabled id=' + loop_counter
          + ' style="background-color:' + color
          + '" type=button'
          + (value.length ? ' value=' + value : '')
          + '>';
    }
    gamediv.innerHTML = output;
}

function start(){
    let loop_counter = 399;
    do{
        const element = document.getElementById(loop_counter);

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

    player['movement_direction'] = 1; // 0=Up, 1=Right, 2=Down, 3=Left
    player['x'] = 1;
    player['y'] = 1;

    if(core_storage_data['holes-start'] > 0){
        let id = -1;
        loop_counter = core_storage_data['holes-start'] - 1;
        do{
            do{
                id = core_random_integer({
                  'max': 400,
                });
            }while(document.getElementById(id).style.backgroundColor !== color_empty);
            document.getElementById(id).style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }

    core_interval_modify({
      'id': 'interval',
      'interval': core_storage_data['ms-per-move'],
      'todo': move_player,
    });
}
