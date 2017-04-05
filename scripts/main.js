$(document).ready(function() {
  
  var layer1 = $('#layer1').get(0);
  var layer2 = $('#layer2').get(0);
  
  var t = 0.0;
  var tank = undefined;
  var render = undefined;
  var stepTimer = undefined;
  var running = false;
  
  
  //! Updates the model info
  function update() {
    $('#time').text(t.toFixed(2) + ' [s]');
    $('#level').text(tank.getLevel().toFixed(3) + ' [m]');
    $('#temperature').text(tank.getTemperature().toFixed(3) + ' [C]');
    $('#q1').text(tank.getQ1().toFixed(3) + ' [kg/s]');
    $('#q2').text(tank.getQ2().toFixed(3) + ' [kg/s]');
    $('#q3').text(tank.getQ3().toFixed(3) + ' [kg/s]');
    
    render.render(tank);
  };
  
  
  function reset() {
    clearInterval(stepTimer);
    running = false;
        
    $('.button-start').show();
    $('.button-stop').hide();
    
    t = 0.0;
    
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
      R:      0.1,
      pa:     100000,
      g:      9.81
    };
    
    var x0 = [0.5, 10.0];
    
    var solver = new RK4();
    
    tank = new Tank(params, x0, solver);
    render = new Render(layer1, layer2);
    update();
  };
  
  
  reset();
  
  
  
  
  
  //! Updates the model
  function step() {
    var z1 = 0.01 * $('.slider-z1').val();
    var z2 = 0.01 * $('.slider-z2').val();
    var z3 = 0.01 * $('.slider-z3').val();
    var u = 0.01 * $('.slider-heater').val();
    
    dt = 0.01;
    t += dt;
    tank.step(0.0, [z1, z2, z3, u], dt);
    
    update();
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
  
  
  $('.slider-z1').on('input change', function() {
    if (!running) {
      tank.setZ1(0.01 * $(this).val());
      update();
    }
  });
  
  $('.slider-z2').on('input change', function() {
    if (!running) {
      tank.setZ2(0.01 * $(this).val());
      update();
    }
  });
  
  $('.slider-z3').on('input change', function() {
    if (!running) {
      tank.setZ3(0.01 * $(this).val());
      update();
    }
  });
  
  $('.slider-heater').on('input change', function() {
    if (!running) {
      tank.setHeater(0.01 * $(this).val());
      update();
    }
  });
  
});
