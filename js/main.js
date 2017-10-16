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
