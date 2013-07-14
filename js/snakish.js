function eat_purple_creature(){
    get('score').innerHTML = parseInt(get('score').innerHTML, 10) + 1;

    // if there will be additional spaces available for more obstacles
    if(get('score').innerHTML < Math.floor(398 / (parseInt(get('obstacles-per-point').value, 10) + 1)) + 1){

        // pick a button with color_empty and make it the new purple creature
        do{
            a = random_number(400);
        }while(get(a).style.backgroundColor != color_empty);
        get(a).style.backgroundColor = color_purple;

        var i = get('obstacles-per-point').value - 1;
        // if more than 0 obstacles should be created
        if(i >= 0){
            // add new obstacles
            do{
                while(get(a).style.backgroundColor != color_empty){
                    a = random_number(400);
                }
                get(a).style.backgroundColor = color_obstacle;
            }while(i--);
        }
    }else{
        stop();
    }
}

function get(i){
    return document.getElementById(i);
}

function move_player(){
    // check if game is still running, based on game mode and if frames/score are over max
    i = get('game-mode-select').value === 1
      ? parseFloat(get('frames').innerHTML) <= 0 && get('max-frames').value > 0
      : get('max-points').value != 0 && parseInt(get('score').innerHTML, 10) >= get('max-points').value;

    // if game running continue, else stop()
    if(!i){
        // add or subtract 1 from frames depending on game mode
        get('frames').innerHTML = ((parseFloat(get('frames').innerHTML) +
            ((get('game-mode-select').value === 1 && get('max-frames').value > 0) ? -1 : 1)));

        var check_color = 0;
        var dx = 0;
        var dy = 0;

        // is player is moving up
        if(player[2] === 0){
            // if player is not at the top of the screen
            if(player[1] - 1 >= 0){
                // fetch color of space directly above the player
                check_color = get((player[1] - 1) * 20 + player[0]).style.backgroundColor;

                // if the space is not an obstacle continue, else i=1 to know of collision
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
                    i = 1;
                }

            // if player is at the top of the screen and can wrap in the y-direction
            }else if(get('wrap-select').value == 2 || get('wrap-select').value == 3){
                // fetch color of space at the bottom of the screen
                check_color = get((player[1] + 19) * 20 + player[0]).style.backgroundColor;

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
                    i = 1;
                }

            // collision!
            }else{
                i = 1;
            }

        // if player is moving right
        }else if(player[2] === 1){
            // if player is not at the right edge of the screen
            if(player[0] + 1 <= 19){
                // fetch color of space to the right of the player
                check_color = get(player[1] * 20 + player[0] + 1).style.backgroundColor;

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
                    i = 1;
                }

            // if player is at the right edge of the screen and can wrap in the x-direction
            }else if(get('wrap-select').value == 1 || get('wrap-select').value == 2){
                // fetch color of space at the left of the screen
                check_color = get(player[1] * 20 + player[0] - 19).style.backgroundColor;

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
                    i = 1;
                }

            // collision!
            }else{
                i = 1;
            }

        // if player is moving down
        }else if(player[2] === 2){
            // if player is not at the bottom of the screen
            if(player[1] + 1 <= 19){
                // fetch color of space directory below the player
                check_color = get((player[1] + 1) * 20 + player[0]).style.backgroundColor;

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
                    i = 1;
                }

            // if player is at the bottom edge of the screen and can wrap in the y-direction
            }else if(get('wrap-select').value == 2 || get('wrap-select').value == 3){
                // fetch color of space at the top of the screen
                check_color = get((player[1] - 19) * 20 + player[0]).style.backgroundColor;

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
                    i = 1;
                }

            // collision!
            }else{
                i = 1;
            }

        // if player is moving left
        }else if(player[2] === 3){
            if(player[0] - 1 >= 0){
                // fetch color of space to the left of the player
                check_color = get(player[1] * 20 + player[0] - 1).style.backgroundColor;

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
                    i = 1;
                }

            // if player is at the left edge of the screen and can wrap in the x-direction
            }else if(get('wrap-select').value == 1 || get('wrap-select').value == 2){
                // fetch color of space at the right side of the screen
                check_color = get(player[1] * 20 + player[0] + 19).style.backgroundColor;

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
                    i = 1;
                }

            // collision!
            }else{
                i = 1;
            }
        }

        // if a collision with an obstacle or edge was detected
        if(i){
            // if game ends oncollision
            if(get('oncollision-select').value == 1){
                stop();

            // else if score decreases
            }else if(get('oncollision-select').value === 2){
                get('score').innerHTML = parseInt(get('score').innerHTML, 10) - 1;
            }
        }

        // if player x or y position has changed
        if(dx !== 0 || dy !== 0){
            // reset old player position to an empty space
            get((player[1] + dy) * 20 + player[0] + dx).style.backgroundColor = color_empty;
        }

        // set color of new player position to color_player
        get(player[1] * 20 + player[0]).style.backgroundColor = color_player;

    }else{
        stop();
    }
}

function play_audio(i){
    if(get('audio-volume').value > 0){
        get(i).volume = get('audio-volume').value;
        get(i).currentTime = 0;
        get(i).play();
    }
}

function random_number(i){
    return Math.floor(Math.random() * i);
}

function reset(){
    if(confirm('Reset settings?')){
        stop();

        get('audio-volume').value = 1;
        get('game-mode-select').value = 1;
        get('max-frames').value = 0;
        get('max-points').value = 50;
        get('move-keys').value = 'WASD';
        get('ms-per-move').value = 125;
        get('obstacles-at-start').value = 0;
        get('obstacles-per-point').value = 1;
        get('oncollision-select').value = 1;
        get('start-key').value = 'H';
        get('turn-angle-select').value = 0;
        get('wrap-select').value = 0;
        get('y-margin').value = 0;

        save();
    }
}

function save(){
    // save settings into localStorage, if differ from default
    i = 12;
    j = [
        'turn-angle-select',
        'ms-per-move',
        'obstacles-per-point',
        'obstacles-at-start',
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
    do{
        if(get(j[i]).value == [0, 125, 1, 0, 1, 1, 0, 0, 0, 1, 0, 'WASD', 'H'][i]){
            ls.removeItem('snakish-' + i);
        }else{
            ls.setItem(
                'snakish-' + i,
                get(j[i]).value
            );
        }
    }while(i--);
    j = 0;
}

function set_settings_disable(i){
    get('game-mode-select').disabled = i;
    get('oncollision-select').disabled = i;
    get('obstacles-per-point').disabled = i;
    get('max-points').disabled = i;
    get('reset-button').disabled = i;
    get('turn-angle-select').disabled = i;
    get('ms-per-move').disabled = i;
    get('max-frames').disabled = i;
    get('wrap-select').disabled = i;
}

function showhide_hack(){
    get('hack-span').style.display = get('hack-span').style.display === 'none' ? 'inline' : 'none';
}

function showhide_settings(){
    i = get('showhide-button').value === '-' ? 1 : 0;
    get('settings-span').style.display = ['inline', 'none'][i];
    get('showhide-button').value = ['-', '+'][i];
}

function start(){
    // validate settings
    i = 5;
    j = [
        'obstacles-per-point',
        'max-points',
        'obstacles-at-start',
        'audio-volume',
        'ms-per-move',
        'max-frames',
        'y-margin'
    ];
    do{
        if(isNaN(get(j[i]).value) || get(j[i]).value < 0){
            get(j[i]).value = [
                1,
                0,
                0,
                1,
                125,
                0,
                0
            ][i];
        }
    }while(i--);
    if(get('obstacles-per-point').value > 396){
        get('obstacles-per-point').value = 396;
    }

    // adjust margin-top of entire game
    get('lol-a-table').style.marginTop = get('y-margin').value + 'px';

    set_settings_disable(1);

    // reset buttons to empty with player and purple creature in initial positions
    var a = 399;
    do{
        get(a).style.backgroundColor = color_empty;
    }while(a--);
    get(21).style.backgroundColor = color_player;
    get(378).style.backgroundColor = color_purple;

    get('start-button').value = 'End (ESC)';
    get('start-button').onclick = function(){
        stop(0);
    };
    get('score').innerHTML = '0';

    // reset player
    player = [
        1,// x
        1,// y
        1// movement direction (0N, 1E, 2S, 3W)
    ];

    // create initial obstacles, if any
    if(get('obstacles-at-start').value > 0){
        if(get('obstacles-at-start').value > 398){
            get('obstacles-at-start').value = 398;
        }
        i = get('obstacles-at-start').value - 1;
        a = -1;
        do{
            do{
                a = random_number(400);
            }while(get(a).style.backgroundColor !== color_empty);
            get(a).style.backgroundColor = color_obstacle;
        }while(i--);
    }

    // setup display or not display of max frames or max points
    if(get('game-mode-select').value === 1){
        get('frames').innerHTML = get('frames-max').innerHTML = get('max-frames').value;
        get('score-max').innerHTML = '';
        get('frames-max-span').style.display = get('max-frames').value > 0 ? 'inline' : 'none';
    }else{
        get('frames').innerHTML = 0;
        get('frames-max-span').style.display = 'none';
        get('score-max').innerHTML = get('max-points').value > 0 ? ' out of <b>' + get('max-points').value + '</b>' : '';
    }

    // validate milliseconds per player movement and create interval
    interval = setInterval('move_player()', (get('ms-per-move').value > 0) ? get('ms-per-move').value : 125);
    save();
}

function stop(){
    clearInterval(interval);
    get('start-button').value = 'Start (' + get('start-key').value + ')';
    get('start-button').onclick = function(){
        start();
    };
    set_settings_disable(0);
}

var color_empty = 'rgb(99, 99, 99)';
var color_obstacle = 'rgb(255, 255, 255)';
var color_player = 'rgb(0, 225, 0)';
var color_purple = 'rgb(255, 0, 255)';
var i = 0;
var interval = 0;
var j = [''];
var ls = window.localStorage;
var player = [
    1,
    1,
    1
];

// create buttons for game-area
for(i = 0; i < 400; i++){
    if(i % 20 === 0 && i !== 0){
        j.push('<br>');
    }
    j.push('<input class=buttons disabled id=' + i + ' style="background:' + color_empty + '" type=button>');
}
j[23] = '<input class=buttons disabled id=21 style="background:' + color_player + '" type=button>';
j[397] = '<input class=buttons disabled id=378 style="background:' + color_purple + '" type=button>';
get('game-area').innerHTML = j.join('');
j = 0;

// fetch settings from localStorage and update settings inputs
get('audio-volume').value = ls.getItem('snakish-5') === null ? 1 : parseFloat(ls.getItem('snakish-5'));
get('game-mode-select').value = ls.getItem('snakish-9') === null ? 1 : 0;
get('max-frames').value = ls.getItem('snakish-6') === null ? 0 : parseInt(ls.getItem('snakish-6'), 10);
get('max-points').value = ls.getItem('snakish-10') === null ? 0 : parseInt(ls.getItem('snakish-10'), 10);
get('move-keys').value = ls.getItem('snakish-11') === null ? 'WASD' : ls.getItem('snakish-10');
get('ms-per-move').value = ls.getItem('snakish-1') === null ? 125 : parseInt(ls.getItem('snakish-1'), 10);
get('obstacles-per-point').value = ls.getItem('snakish-2') === null ? 1 : parseInt(ls.getItem('snakish-2'), 10);
get('oncollision-select').value = ls.getItem('snakish-4') === null ? 1 : parseInt(ls.getItem('snakish-4'), 10);
get('obstacles-at-start').value = ls.getItem('snakish-3') === null ? 0 : parseInt(ls.getItem('snakish-3'), 10);
get('turn-angle-select').value = ls.getItem('snakish-0') === null ? 0 : parseInt(ls.getItem('snakish-0'), 10);
get('wrap-select').value = ls.getItem('snakish-7') === null ? 0 : parseInt(ls.getItem('snakish-7'), 10);
get('y-margin').value = ls.getItem('snakish-8') === null ? 0 : parseInt(ls.getItem('snakish-8'), 10);
if(ls.getItem('snakish-12') === null){
    get('start-key').value = 'H';
}else{
    get('start-key').value = ls.getItem('snakish-12');
    get('start-button').value = 'Start (' + ls.getItem('snakish-12') + ')';
}

// adjust margin-top of entire game
get('lol-a-table').style.marginTop = get('y-margin').value + 'px';

window.onkeydown = function(e){
    i = window.event ? event : e;
    i = i.charCode ? i.charCode : i.keyCode;

    if(String.fromCharCode(i) === get('move-keys').value[0] && (player[2] !== 2 || get('turn-angle-select').value == 1)){
        // player move direction = up
        player[2] = 0;

    }else if(String.fromCharCode(i) === get('move-keys').value[1] && (player[2] !== 1 || get('turn-angle-select').value == 1)){
        // player move direction = left
        player[2] = 3;

    }else if(String.fromCharCode(i) === get('move-keys').value[2] && (player[2] !== 0 || get('turn-angle-select').value == 1)){
        // player move direction = down
        player[2] = 2;

    }else if(String.fromCharCode(i) === get('move-keys').value[3] && (player[2] !== 3 || get('turn-angle-select').value == 1)){
        // player move direction = right
        player[2] = 1;

    }else if(String.fromCharCode(i) === get('start-key').value){
        stop();
        start();

    }else if(i === 27){// ESC
        stop();
    }
}
