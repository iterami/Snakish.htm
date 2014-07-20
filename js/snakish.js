function eat_purple_creature(){
    document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML, 10) + 1;

    // if there will be additional spaces available for more holes
    if(document.getElementById('score').innerHTML <
      Math.floor(398 / (parseInt(document.getElementById('holes-per-point').value, 10) + 1)) + 1){

        // pick a button with color_empty and make it the new purple creature
        do{
            a = Math.floor(Math.random() * 400);
        }while(document.getElementById(a).style.backgroundColor != color_empty);
        document.getElementById(a).style.backgroundColor = color_purple;

        var loop_counter = document.getElementById('holes-per-point').value - 1;
        // if more than 0 holes should be created
        if(loop_counter >= 0){
            // add new holes
            do{
                while(document.getElementById(a).style.backgroundColor != color_empty){
                    a = Math.floor(Math.random() * 400);
                }
                document.getElementById(a).style.backgroundColor = color_obstacle;
            }while(loop_counter--);
        }

    // no space left for holes, end game
    }else{
        stop();
    }
}

function move_player(){
    // check if game is still running, based on game mode and if frames/score are over max
    var end_game = document.getElementById('game-mode-select').value === 1
      ? parseFloat(document.getElementById('frames').innerHTML) <= 0
        && document.getElementById('max-frames').value > 0
      : document.getElementById('max-points').value != 0
        && parseInt(document.getElementById('score').innerHTML, 10) >= document.getElementById('max-points').value;

    // if game running continue, else stop()
    if(!end_game){
        // add or subtract 1 from frames depending on game mode
        document.getElementById('frames').innerHTML = ((parseFloat(document.getElementById('frames').innerHTML) +
            ((document.getElementById('game-mode-select').value === 1
          && document.getElementById('max-frames').value > 0) ? -1 : 1)));

        var check_color = 0;
        var dx = 0;
        var dy = 0;

        // if player is moving up
        if(player[2] === 0){
            // if player is not at the top of the screen
            if(player[1] - 1 >= 0){
                // fetch color of space directly above the player
                check_color = document.getElementById((player[1] - 1) * 20 + player[0]).style.backgroundColor;

                // if the space is not an obstacle continue, else collision
                if(check_color !== color_obstacle){
                    // if color of space is purple, eat the creature
                    if(check_color === color_purple){
                        eat_purple_creature();
                    }

                    // decrease player y position
                    player[1] -= 1;
                    dy += 1;

                // collision!
                }else{
                    end_game = 1;
                }

            // if player is at the top of the screen and can wrap in the y-direction
            }else if(document.getElementById('wrap-select').value == 2
              || document.getElementById('wrap-select').value == 3){
                // fetch color of space at the bottom of the screen
                check_color = document.getElementById((player[1] + 19) * 20 + player[0]).style.backgroundColor;

                // if the space is not an obstacle continue
                if(check_color !== color_obstacle){
                    // if color of space is purple, eat the creature
                    if(check_color === color_purple){
                        eat_purple_creature()
                    }

                    // set player y position to bottom of the screen
                    player[1] = 19;
                    dy -= 19;

                // collision!
                }else{
                    end_game = 1;
                }

            // collision!
            }else{
                end_game = 1;
            }

        // if player is moving right
        }else if(player[2] === 1){
            // if player is not at the right edge of the screen
            if(player[0] + 1 <= 19){
                // fetch color of space to the right of the player
                check_color = document.getElementById(player[1] * 20 + player[0] + 1).style.backgroundColor;

                // if the space is not an obstacle continue
                if(check_color !== color_obstacle){
                    // if color of space is purple, eat the creature
                    if(check_color === color_purple){
                        eat_purple_creature();
                    }

                    // increase player x position
                    player[0] += 1;
                    dx -= 1;

                // collision!
                }else{
                    end_game = 1;
                }

            // if player is at the right edge of the screen and can wrap in the x-direction
            }else if(document.getElementById('wrap-select').value == 1
              || document.getElementById('wrap-select').value == 2){
                // fetch color of space at the left of the screen
                check_color = document.getElementById(player[1] * 20 + player[0] - 19).style.backgroundColor;

                // if the space is not an obstacle continue
                if(check_color !== color_obstacle){
                    // if color of space is purple, eat the creature
                    if(check_color === color_purple){
                        eat_purple_creature();
                    }

                    // set player x position to left side of the screen
                    player[0] -= 19;
                    dx += 19;

                // collision!
                }else{
                    end_game = 1;
                }

            // collision!
            }else{
                end_game = 1;
            }

        // if player is moving down
        }else if(player[2] === 2){
            // if player is not at the bottom of the screen
            if(player[1] + 1 <= 19){
                // fetch color of space directory below the player
                check_color = document.getElementById((player[1] + 1) * 20 + player[0]).style.backgroundColor;

                // if the space is not an obstacle continue
                if(check_color !== color_obstacle){
                    // if color of space is purple, eat the creature
                    if(check_color === color_purple){
                        eat_purple_creature();
                    }

                    // increase player y position
                    player[1] += 1;
                    dy -= 1;

                // collision!
                }else{
                    end_game = 1;
                }

            // if player is at the bottom edge of the screen and can wrap in the y-direction
            }else if(document.getElementById('wrap-select').value == 2
              || document.getElementById('wrap-select').value == 3){
                // fetch color of space at the top of the screen
                check_color = document.getElementById((player[1] - 19) * 20 + player[0]).style.backgroundColor;

                // if the space is not an obstacle continue
                if(check_color !== color_obstacle){
                    // if color of space is purple, eat the creature
                    if(check_color === color_purple){
                        eat_purple_creature();
                    }

                    // set player y position to top of the screen
                    player[1] = 0;
                    dy += 19;

                // collision!
                }else{
                    end_game = 1;
                }

            // collision!
            }else{
                end_game = 1;
            }

        // if player is moving left
        }else if(player[2] === 3){
            if(player[0] - 1 >= 0){
                // fetch color of space to the left of the player
                check_color = document.getElementById(player[1] * 20 + player[0] - 1).style.backgroundColor;

                // if the space is not an obstacle continue
                if(check_color !== color_obstacle){
                    // if color of space is purple, eat the creature
                    if(check_color === color_purple){
                        eat_purple_creature();
                    }

                    // decrease player x position
                    player[0] -= 1;
                    dx += 1;

                // collision!
                }else{
                    end_game = 1;
                }

            // if player is at the left edge of the screen and can wrap in the x-direction
            }else if(document.getElementById('wrap-select').value == 1
              || document.getElementById('wrap-select').value == 2){
                // fetch color of space at the right side of the screen
                check_color = document.getElementById(player[1] * 20 + player[0] + 19).style.backgroundColor;

                // if the space is not an obstacle continue
                if(check_color !== color_obstacle){
                    // if color of space is purple, eat the creature
                    if(check_color === color_purple){
                        eat_purple_creature();
                    }

                    // set player x position to right side of the screen
                    player[0] += 19;
                    dx -= 19;

                // collision!
                }else{
                    end_game = 1;
                }

            // collision!
            }else{
                end_game = 1;
            }
        }

        // if a collision with an obstacle or edge was detected
        if(end_game){
            // if game ends oncollision
            if(document.getElementById('oncollision-select').value == 1){
                stop();

            // else if score decreases
            }else if(document.getElementById('oncollision-select').value === 2){
                document.getElementById('score').innerHTML = 
                  parseInt(
                    document.getElementById('score').innerHTML,
                    10
                  ) - 1;
            }
        }

        // if player x or y position has changed
        if(dx !== 0
          || dy !== 0){
            // reset old player position to an empty space
            document.getElementById((player[1] + dy) * 20 + player[0] + dx).style.backgroundColor = color_empty;
        }

        // set color of new player position to color_player
        document.getElementById(player[1] * 20 + player[0]).style.backgroundColor = color_player;

    }else{
        stop();
    }
}

function play_audio(id){
    if(document.getElementById('audio-volume').value > 0){
        document.getElementById(id).volume = document.getElementById('audio-volume').value;
        document.getElementById(id).currentTime = 0;
        document.getElementById(id).play();
    }
}

function reset(){
    if(confirm('Reset settings?')){
        stop();

        document.getElementById('audio-volume').value = 1;
        document.getElementById('game-mode-select').value = 1;
        document.getElementById('holes-at-start').value = 0;
        document.getElementById('holes-per-point').value = 1;
        document.getElementById('max-frames').value = 0;
        document.getElementById('max-points').value = 50;
        document.getElementById('move-keys').value = 'WASD';
        document.getElementById('ms-per-move').value = 125;
        document.getElementById('oncollision-select').value = 1;
        document.getElementById('start-key').value = 'H';
        document.getElementById('turn-angle-select').value = 0;
        document.getElementById('wrap-select').value = 0;
        document.getElementById('y-margin').value = 0;

        save();
    }
}

function save(){
    // save settings into localStorage, if differ from default
    j = [
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
      'move-keys',
      'start-key'
    ];

    var loop_counter = 12;
    do{
        if(document.getElementById(j[loop_counter]).value ==
          [0, 125, 1, 0, 1, 1, 0, 0, 0, 1, 0, 'WASD', 'H'][loop_counter]){
            window.localStorage.removeItem('snakish-' + loop_counter);

        }else{
            window.localStorage.setItem(
              'snakish-' + loop_counter,
              document.getElementById(j[loop_counter]).value
            );
        }
    }while(loop_counter--);

    j = 0;
}

function set_settings_disable(i){
    document.getElementById('game-mode-select').disabled = i;
    document.getElementById('holes-per-point').disabled = i;
    document.getElementById('oncollision-select').disabled = i;
    document.getElementById('max-points').disabled = i;
    document.getElementById('reset-button').disabled = i;
    document.getElementById('turn-angle-select').disabled = i;
    document.getElementById('ms-per-move').disabled = i;
    document.getElementById('max-frames').disabled = i;
    document.getElementById('wrap-select').disabled = i;
}

function showhide_hack(){
    document.getElementById('hack-span').style.display =
      document.getElementById('hack-span').style.display === 'none'
        ? 'inline'
        : 'none';
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
    // validate settings
    j = [
      'holes-per-point',
      'max-points',
      'holes-at-start',
      'audio-volume',
      'ms-per-move',
      'max-frames',
      'y-margin'
    ];

    var loop_counter = 5;
    do{
        if(isNaN(document.getElementById(j[loop_counter]).value)
          || document.getElementById(j[loop_counter]).value < 0){
            document.getElementById(j[loop_counter]).value = [
              1,
              0,
              0,
              1,
              125,
              0,
              0
            ][loop_counter];
        }
    }while(loop_counter--);

    if(document.getElementById('holes-per-point').value > 396){
        document.getElementById('holes-per-point').value = 396;
    }

    // adjust margin-top of entire game
    document.getElementById('lol-a-table').style.marginTop = document.getElementById('y-margin').value + 'px';

    set_settings_disable(1);

    // reset buttons to empty with player and purple creature in initial positions
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

    // reset player
    player = [
      1,// x
      1,// y
      1// movement direction (0==Up, 1==Right, 2==Down, 3==Left)
    ];

    // create initial holes, if any
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

    // setup display or not display of max frames or max points
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

    // validate milliseconds per player movement and create interval
    interval = setInterval('move_player()', (document.getElementById('ms-per-move').value > 0)
      ? document.getElementById('ms-per-move').value
      : 125);

    // save settings
    save();
}

function stop(){
    clearInterval(interval);
    document.getElementById('start-button').value =
      'Start [' + document.getElementById('start-key').value + ']';
    document.getElementById('start-button').onclick = function(){
        start();
    };
    set_settings_disable(0);
}

var color_empty = 'rgb(200, 200, 200)';
var color_obstacle = 'rgb(255, 255, 255)';
var color_player = 'rgb(0, 100, 0)';
var color_purple = 'rgb(255, 0, 255)';
var interval = 0;
var j = [''];
var player = [
  1,// x
  1,// y
  1// movement direction (0==Up, 1==Right, 2==Down, 3==Left)
];

// create buttons for game-area
for(var loop_counter = 0; loop_counter < 400; loop_counter++){
    if(loop_counter % 20 === 0 && loop_counter !== 0){
        j.push('<br>');
    }
    j.push(
      '<input class=buttons disabled id='
      + loop_counter
      + ' style="background:'
      + color_empty
      + '" type=button>'
    );
}
j[23] = '<input class=buttons disabled id=21 style="background:' + color_player + '" type=button>';
j[397] = '<input class=buttons disabled id=378 style="background:' + color_purple + '" type=button>';
document.getElementById('game-area').innerHTML = j.join('');
j = 0;

// fetch settings from localStorage and update settings inputs
document.getElementById('audio-volume').value = window.localStorage.getItem('snakish-5') === null
  ? 1
  : parseFloat(window.localStorage.getItem('snakish-5'));
document.getElementById('game-mode-select').value = window.localStorage.getItem('snakish-9') === null
  ? 1
  : 0;
document.getElementById('holes-at-start').value = window.localStorage.getItem('snakish-3') === null
  ? 0
  : parseInt(window.localStorage.getItem('snakish-3'), 10);
document.getElementById('holes-per-point').value = window.localStorage.getItem('snakish-2') === null
  ? 1
  : parseInt(window.localStorage.getItem('snakish-2'), 10);
document.getElementById('max-frames').value = window.localStorage.getItem('snakish-6') === null
  ? 0
  : parseInt(window.localStorage.getItem('snakish-6'), 10);
document.getElementById('max-points').value = window.localStorage.getItem('snakish-10') === null
  ? 0
  : parseInt(window.localStorage.getItem('snakish-10'), 10);
document.getElementById('move-keys').value = window.localStorage.getItem('snakish-11') === null
  ? 'WASD'
  : window.localStorage.getItem('snakish-10');
document.getElementById('ms-per-move').value = window.localStorage.getItem('snakish-1') === null
  ? 125
  : parseInt(window.localStorage.getItem('snakish-1'), 10);
document.getElementById('oncollision-select').value = window.localStorage.getItem('snakish-4') === null
  ? 1
  : parseInt(window.localStorage.getItem('snakish-4'), 10);
document.getElementById('turn-angle-select').value = window.localStorage.getItem('snakish-0') === null
  ? 0
  : parseInt(window.localStorage.getItem('snakish-0'), 10);
document.getElementById('wrap-select').value = window.localStorage.getItem('snakish-7') === null
  ? 0
  : parseInt(window.localStorage.getItem('snakish-7'), 10);
document.getElementById('y-margin').value = window.localStorage.getItem('snakish-8') === null
  ? 0
  : parseInt(window.localStorage.getItem('snakish-8'), 10);

if(window.localStorage.getItem('snakish-12') === null){
    document.getElementById('start-key').value = 'H';

}else{
    document.getElementById('start-key').value = window.localStorage.getItem('snakish-12');
    document.getElementById('start-button').value =
      'Start [' + window.localStorage.getItem('snakish-12') + ']';
}

// adjust margin-top of entire game
document.getElementById('lol-a-table').style.marginTop = document.getElementById('y-margin').value + 'px';

window.onkeydown = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    if(key === 27){// ESC
        stop();

    }else{
        key = String.fromCharCode(key);

        // if player wants to move up (if player is moving down then check if 180 degree turns are legal)
        if(key === document.getElementById('move-keys').value[0]
          && (player[2] !== 2 || document.getElementById('turn-angle-select').value == 1)){
            // player move direction = up
            player[2] = 0;

        // if player wants to move right (if player is moving left then check if 180 degree turns are legal)
        }else if(key === document.getElementById('move-keys').value[1]
          && (player[2] !== 1 || document.getElementById('turn-angle-select').value == 1)){
            // player move direction = left
            player[2] = 3;

        // if player wants to move down (if player is moving up then check if 180 degree turns are legal)
        }else if(key === document.getElementById('move-keys').value[2]
          && (player[2] !== 0 || document.getElementById('turn-angle-select').value == 1)){
            // player move direction = down
            player[2] = 2;

        // if player wants to move left (if player is moving right then check if 180 degree turns are legal)
        }else if(key === document.getElementById('move-keys').value[3]
          && (player[2] !== 3 || document.getElementById('turn-angle-select').value == 1)){
            // player move direction = right
            player[2] = 1;

        }else if(key === document.getElementById('start-key').value){
            stop();
            start();
        }
    }
}
