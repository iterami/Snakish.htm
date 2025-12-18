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

    player.movement_direction = player.requested_direction;

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
            core_mode = 0;
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
    update_arrow(player.movement_direction);
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
            if(score !== 0){
                core_escape(true);
                event.preventDefault();
            }
        },
      },
      'events': {
        'start': {
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
          'requested_direciton': 1,
          'x': 1,
          'y': 1,
        },
        'score': 0,
      },
      'info': '<button id=start type=button>Start New Game</button>',
      'menu': true,
      'pointerbinds': {
        'pointermove': {
          'todo': function(){
              if(!core_mode
                || !core_pointer.down_0){
                  return;
              }

              const element = core_elements[player.y * 20 + player.x];
              const x = core_pointer.x - element.offsetLeft;
              const y = core_pointer.y - element.offsetTop;

              let direction = player.requested_direction;
              if(x < 0){
                  if(y < x){
                      direction = 0;

                  }else if(y > 0 && -y < x){
                      direction = 2;

                  }else{
                      direction = 3;
                  }

              }else if(x < y){
                  direction = 2;

              }else if(y < 0 && -y > x){
                  direction = 0;

              }else{
                  direction = 1;
              }
              update_arrow(direction);
          },
        },
      },
      'storage': {
        'collision': 1,
        'height': '25px',
        'holes_point': 1,
        'holes_start': 0,
        'ms_per_move': 125,
        'turn_angle': 0,
        'width': '25px',
        'wrap': 0,
      },
      'storage_controls': {
        'move_down': {
          'todo': update_direction,
        },
        'move_left': {
          'todo': update_direction,
        },
        'move_right': {
          'todo': update_direction,
        },
        'move_up': {
          'todo': update_direction,
        },
      },
      'storage_menu': '<table><tr><td><input class=mini id=height type=text><td>Button Height'
        + '<tr><td><input class=mini id=width type=text><td>Button Width'
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
    score = 0;
    core_ui_update({
      'ids': {
        'score': score,
      },
    });
    player.movement_direction = 1; // 0=Up, 1=Right, 2=Down, 3=Left
    player.requested_direction = 1;
    player.x = 1;
    player.y = 1;

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
        style.height = core_storage_data.height;
        style.width = core_storage_data.width;
        core_elements[loop_counter].textContent = '';

        const half = Math.ceil(core_elements[loop_counter].offsetWidth / 2) + 'px';
        style.fontSize = half;
        style.lineHeight = half;
    }while(loop_counter--);
    core_elements[21].style.backgroundColor = color_positive;
    core_elements[21].textContent = '→';
    core_elements[378].style.backgroundColor = color_negative;
    core_elements[378].textContent = '+';

    core_elements.game.style.lineHeight = core_storage_data.height;
    core_elements.game.style.minWidth = (core_elements[0].offsetWidth * 20 + 40) + 'px';

    core_mode = 1;
}

function start(){
    if(score !== 0
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

function update_arrow(direction){
    if(direction === 0){
        if(player.movement_direction !== 2 || core_storage_data.turn_angle === 1){
            player.requested_direction = 0;
        }

    }else if(direction === 1){
        if(player.movement_direction !== 3 || core_storage_data.turn_angle === 1){
            player.requested_direction = 1;
        }

    }else if(direction === 2){
        if(player.movement_direction !== 0 || core_storage_data.turn_angle === 1){
            player.requested_direction = 2;
        }

    }else if(direction === 3){
        if(player.movement_direction !== 1 || core_storage_data.turn_angle === 1){
            player.requested_direction = 3;
        }
    }
    core_elements[player.y * 20 + player.x].textContent = ['↑', '→', '↓', '←',][player.requested_direction];
}

function update_direction(event){
    if(!core_mode){
        return;
    }

    let direction = player.requested_direction;
    if(event.code === core_storage_data.move_up){
        direction = 0;

    }else if(event.code === core_storage_data.move_right){
        direction = 1;

    }else if(event.code === core_storage_data.move_down){
        direction = 2;

    }else if(event.code === core_storage_data.move_left){
        direction = 3;
    }
    update_arrow(direction);
}
