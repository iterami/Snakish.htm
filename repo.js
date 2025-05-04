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
      core_storage_data['holes-point'] - 1,
      397
    ));
    const player_xy = player['y'] * 20 + player['x'];
    if(loop_counter >= 0){
        do{
            do{
                id = core_random_integer({
                  'max': empty.length,
                });
            }while(empty[id] === player_xy);
            core_elements[empty.splice(id, 1)].style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }

    do{
        id = core_random_integer({
          'max': empty.length,
        });
    }while(empty[id] === player_xy);
    core_elements[empty[id]].style.backgroundColor = color_negative;
    core_elements[empty[id]].textContent = '+';
}

function move_player(){
    let check_color = 0;
    let dx = 0;
    let dy = 0;
    let end_game = false;

    let move_down = false;
    let move_left = false;
    let move_right = false;
    let move_up = false;
    if(core_mobile){
        if(core_mouse['down-0']){
            const x = core_mouse['x'] / globalThis.innerWidth;
            const y = core_mouse['y'] / globalThis.innerHeight;
            if(x < .5){
                 if(y < x){
                     move_up = true;

                 }else if(y > 1 - x){
                     move_down = true;

                 }else{
                     move_left = true;
                 }

            }else if(x < y){
                 move_down = true;

            }else if(x < 1 - y){
                 move_up = true;

            }else{
                 move_right = true;
            }
        }

    }else{
        move_down = core_keys[core_storage_data['move-↓']]['state'];
        move_left = core_keys[core_storage_data['move-←']]['state'];
        move_right = core_keys[core_storage_data['move-→']]['state'];
        move_up = core_keys[core_storage_data['move-↑']]['state'];
    }

    if(move_left){
        if(player['movement_direction'] !== 1 || core_storage_data['turn-angle'] === 1){
            player['movement_direction'] = 3;
        }

    }else if(move_right){
        if(player['movement_direction'] !== 3 || core_storage_data['turn-angle'] === 1){
            player['movement_direction'] = 1;
        }

    }else if(move_down){
        if(player['movement_direction'] !== 0 || core_storage_data['turn-angle'] === 1){
            player['movement_direction'] = 2;
        }

    }else if(move_up){
        if(player['movement_direction'] !== 2 || core_storage_data['turn-angle'] === 1){
            player['movement_direction'] = 0;
        }
    }

    if(player['movement_direction'] === 0){
        if(player['y'] - 1 >= 0){
            check_color = core_elements[(player['y'] - 1) * 20 + player['x']].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player['y'] -= 1;
                dy += 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data['wrap'] === 2
          || core_storage_data['wrap'] === 3){
            check_color = core_elements[(player['y'] + 19) * 20 + player['x']].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
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
            check_color = core_elements[player['y'] * 20 + player['x'] + 1].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player['x'] += 1;
                dx -= 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data['wrap'] === 1
          || core_storage_data['wrap'] === 2){
            check_color = core_elements[player['y'] * 20 + player['x'] - 19].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
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
            check_color = core_elements[(player['y'] + 1) * 20 + player['x']].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player['y'] += 1;
                dy -= 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data['wrap'] === 2
          || core_storage_data['wrap'] === 3){
            check_color = core_elements[(player['y'] - 19) * 20 + player['x']].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
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
            check_color = core_elements[player['y'] * 20 + player['x'] - 1].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
                    eat_purple_creature();
                }

                player['x'] -= 1;
                dx += 1;

            }else{
                end_game = true;
            }

        }else if(core_storage_data['wrap'] === 1
          || core_storage_data['wrap'] === 2){
            check_color = core_elements[player['y'] * 20 + player['x'] + 19].style.backgroundColor;

            if(check_color !== color_obstacle){
                if(check_color === color_negative){
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
            core_ui_update({
              'ids': {
                'score': --score,
              },
            });
        }
    }

    if(dx !== 0
      || dy !== 0){
        const element = core_elements[(player['y'] + dy) * 20 + player['x'] + dx];
        element.style.backgroundColor = '';
        element.textContent = '';
    }

    const element = core_elements[player['y'] * 20 + player['x']];
    element.style.backgroundColor = color_positive;
    element.textContent = '•';
}

function repo_escape(){
    if(!core_intervals['interval']
      && !core_menu_open){
        start();
    }
}

function repo_init(){
    core_repo_init({
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
      'mousebinds': core_mobile
        ? {}
        : void 0,
      'storage': {
        'collision': 1,
        'height': 25,
        'holes-point': 1,
        'holes-start': 0,
        'ms-per-move': 125,
        'turn-angle': 0,
        'width': 25,
        'wrap': 0,
      },
      'storage-controls': true,
      'storage-menu': '<table><tr><td><input class=mini id=height min=1 step=any type=number><td>Button Height'
        + '<tr><td><input class=mini id=width min=1 step=any type=number><td>Button Width'
        + '<tr><td><select id=collision><option value=1>End Game<option value=0>Nothing<option value=2>Score-1</select><td>Collision'
        + '<tr><td><input class=mini id=holes-point min=0 step=1 type=number><td>Holes/Point'
        + '<tr><td><input class=mini id=holes-start min=0 step=1 type=number><td>Holes/Start'
        + '<tr><td><input class=mini id=ms-per-move min=1 step=any type=number><td>ms/Move'
        + '<tr><td><select id=turn-angle><option value=0>90°<option value=1>any</select><td>Turn Angle'
        + '<tr><td><select id=wrap><option value=0>No<option value=1>X<option value=2>X+Y<option value=3>Y</select><td>Wrap</table>',
      'title': 'Snakish.htm',
      'ui-elements': [
        'game-div',
      ],
    });

    let output = '';
    core_elements['game-div'].style.minWidth = '560px';

    for(let loop_counter = 0; loop_counter < 400; loop_counter++){
        if(loop_counter % 20 === 0 && loop_counter !== 0){
            output += '<br>';
        }

        output += '<button class=gridbutton disabled id=' + loop_counter + ' type=button></button>';
    }
    core_elements['game-div'].innerHTML = output + '<br>';
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
        style.fontSize = Math.ceil(core_storage_data['height'] / 2) + 'px';
        style.height = core_storage_data['height'] + 'px';
        style.lineHeight = Math.ceil(core_storage_data['height'] / 2) + 'px';
        style.width = core_storage_data['width'] + 'px';
        core_elements[loop_counter].textContent = '';
    }while(loop_counter--);

    core_elements[21].style.backgroundColor = color_positive;
    core_elements[21].textContent = '•';
    core_elements[378].style.backgroundColor = color_negative;
    core_elements[378].textContent = '+';

    core_elements['game-div'].style.lineHeight = core_storage_data['height'] + 'px';
    score = 0;

    player['movement_direction'] = 1; // 0=Up, 1=Right, 2=Down, 3=Left
    player['x'] = 1;
    player['y'] = 1;
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

    if(core_storage_data['holes-start'] > 0){
        let loop_counter = Math.floor(Math.min(
          core_storage_data['holes-start'] - 1,
          396
        ));
        do{
            const id = empty.splice(
              core_random_integer({
                'max': empty.length,
              }),
              1
            );
            core_elements[id].style.backgroundColor = color_obstacle;
        }while(loop_counter--);
    }

    core_interval_modify({
      'id': 'interval',
      'interval': core_storage_data['ms-per-move'],
      'todo': move_player,
    });
}
