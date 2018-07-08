'use strict';

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
      'events': {
        'start-button': {
          'onclick': function(){
              core_escape();
              start();
          },
        },
      },
      'globals': {
        'color_empty': 'rgb(42, 42, 42)',
        'color_obstacle': 'rgb(0, 0, 0)',
        'player': {
          'movement_direction': 1,// 0==Up, 1==Right, 2==Down, 3==Left
          'x': 1,
          'y': 1,
        },
      },
      'info': '<input id=start-button type=button value=Restart>',
      'keybinds': {
        72: {
          'todo': function(){
              stop();
              start();
          },
        },
      },
      'menu': true,
      'storage': {
        'holes-at-start': 0,
        'holes-per-point': 1,
        'ms-per-move': 125,
        'oncollision': 1,
        'turn-angle': 0,
        'wrap': 0,
      },
      'storage-menu': '<table><tr><td><input id=holes-at-start><td>Holes at Start<tr><td><input id=holes-per-point><td>Holes/Point<tr><td><input id=ms-per-move><td>ms/Move<tr><td><select id=oncollision><option value=1>End Game</option><option value=0>Nothing</option><option value=2>Score-1</option></select><td>OnCollision<tr><td><select id=turn-angle><option value=0>90</option><option value=1>&lt;=180</option></select><td>° Turn Angle<tr><td><select id=wrap><option value=0>No</option><option value=1>X</option><option value=2>X&amp;Y</option><option value=3>Y</option></select><td>Wrap</table>',
      'title': 'Snakish.htm',
    });

    // Create buttons for game-div.
    let output = '';

    for(let loop_counter = 0; loop_counter < 400; loop_counter++){
        if(loop_counter % 20 === 0 && loop_counter !== 0){
            output += '<br>';
        }

        let color = color_empty;
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
}
