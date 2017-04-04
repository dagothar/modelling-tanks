$(document).ready(function() {
  
  var layer1 = $('#layer1').get(0);
  var layer2 = $('#layer2').get(0);
  
  var tank = undefined;
  var stepTimer = undefined;
  var running = false;
  
  console.log('!');
  
  
  function reset() {
    clearInterval(stepTimer);
    running = false;
        
    $('.button-start').show();
    $('.button-stop').hide();
    
    var params = {
      D:      0.1,
      hmax:   1.0,
      ro:     1000.0,
      Cp:     4190.0,
      Tmax:   100,
      p1:     200000,
      mu1:    0.05,
      k1:     0.001,
      T1:     10,
      p2:     200000,
      mu2:    0.05,
      k2:     0.001,
      T2:     60,
      mu3:    0.05,
      k3:     0.01,
      U:      230,
      R:      0.0001,
      pa:     100000,
      g:      9.81
    };
    
    var x0 = [0.5, 10.0];
    
    var solver = new Euler();
    
    tank = new Tank(params, x0, solver);
  };
  
  
  reset();
  
  
  //! Renders the model state
  function render() {
    $('#level').text(tank.getLevel().toFixed(3));
    $('#temperature').text(tank.getTemperature().toFixed(3));
  };
  
  
  //! Updates the model
  function step() {
    var z1 = 0.01 * $('.slider-z1').val();
    var z2 = 0.01 * $('.slider-z2').val();
    var z3 = 0.01 * $('.slider-z3').val();
    var u = 0.01 * $('.slider-heater').val();
    
    tank.step(0.0, [z1, z2, z3, u], 0.01);
    
    render();
  };  
  
  
  $('.button-start').click(function() {
    $(this).hide();
    $('.button-stop').show();
    if (!running) {
      stepTimer = setInterval(step, 10);
      running = true;
    }
  });
  
  
  $('.button-stop').click(function() {
    $(this).hide();
    $('.button-start').show();
    clearInterval(stepTimer);
    running = false;
  });
  
  
  $('.button-reset').click(function() {
    reset();
  });
  
  
  $('.slider-radius').on('input change', function() {
    
  });
  
});
