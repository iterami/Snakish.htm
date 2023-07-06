'use strict';

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
        + '<tr><td><select id=collision><option value=1>End Game</option><option value=0>Nothing</option><option value=2>Score-1</option></select><td>Collision'
        + '<tr><td><input class=mini id=holes-point min=0 step=any type=number><td>Holes/Point'
        + '<tr><td><input class=mini id=holes-start min=0 step=any type=number><td>Holes/Start'
        + '<tr><td><input class=mini id=ms-per-move min=1 step=any type=number><td>ms/Move'
        + '<tr><td><select id=turn-angle><option value=0>90°</option><option value=1>any</option></select><td>Turn Angle'
        + '<tr><td><select id=wrap><option value=0>No</option><option value=1>X</option><option value=2>X&amp;Y</option><option value=3>Y</option></select><td>Wrap</table>',
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
