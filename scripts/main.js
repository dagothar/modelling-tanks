function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}


$(document).ready(function() {
  
  var layer1 = $('#layer1').get(0);
  var layer2 = $('#layer2').get(0);
  
  var defaultParams = {
    h0:     0.5,
    T0:     20,
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
    R:      0.25,
    pa:     100000,
    g:      9.81
  };
  
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
  
  
  function getParameters() {
    var params = clone(defaultParams);
    
    params.h0 = parseFloat($('#parameter-h0').val());
    params.T0 = parseFloat($('#parameter-T0').val());
    params.D = $('#parameter-D').val();
    params.hmax = $('#parameter-hmax').val();
    params.ro = $('#parameter-ro').val();
    params.Cp = $('#parameter-Cp').val();
    params.Tmax = $('#parameter-Tmax').val();
    params.p1 = $('#parameter-p1').val();
    params.mu1 = $('#parameter-mu1').val();
    params.k1 = $('#parameter-k1').val();
    params.T1 = $('#parameter-T1').val();
    params.p2 = $('#parameter-p2').val();
    params.mu2 = $('#parameter-mu2').val();
    params.k2 = $('#parameter-k2').val();
    params.T2 = $('#parameter-T2').val();
    params.mu3 = $('#parameter-mu3').val();
    params.k3 = $('#parameter-k3').val();
    params.U = $('#parameter-U').val();
    params.R = $('#parameter-R').val();
    params.pa = $('#parameter-pa').val();
    params.g = $('#parameter-g').val();
    
    return params;
  };
  
  
  function reset() {
    clearInterval(stepTimer);
    running = false;
        
    $('.button-start').show();
    $('.button-stop').hide();
    $('.form-control').prop('disabled', false);
    
    $('.slider-z1').val(0);
    $('.slider-z2').val(0);
    $('.slider-z3').val(0);
    $('.slider-heater').val(0);
    
    t = 0.0;
    
    var params = getParameters();
    
    var x0 = [params.h0, params.T0];
    console.log(x0);
    
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
    $('.form-control').prop('disabled', true);
    
    var params = getParameters();
    tank.setParameters(params);
    
    if (!running) {
      stepTimer = setInterval(step, 10);
      running = true;
    }
  });
  
  
  $('.button-stop').click(function() {
    $(this).hide();
    $('.button-start').show();
    $('.form-control').prop('disabled', false);
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
  
  $('.button-params').click(function() {
    if (!running) {
      $('#parameter-h0').val(defaultParams.h0);
      $('#parameter-T0').val(defaultParams.T0);
      $('#parameter-D').val(defaultParams.D);
      $('#parameter-hmax').val(defaultParams.hmax);
      $('#parameter-ro').val(defaultParams.ro);
      $('#parameter-Cp').val(defaultParams.Cp);
      $('#parameter-Tmax').val(defaultParams.Tmax);
      $('#parameter-p1').val(defaultParams.p1);
      $('#parameter-mu1').val(defaultParams.mu1);
      $('#parameter-k1').val(defaultParams.k1);
      $('#parameter-T1').val(defaultParams.T1);
      $('#parameter-p2').val(defaultParams.p2);
      $('#parameter-mu2').val(defaultParams.mu2);
      $('#parameter-k2').val(defaultParams.k2);
      $('#parameter-T2').val(defaultParams.T2);
      $('#parameter-mu3').val(defaultParams.mu3);
      $('#parameter-k3').val(defaultParams.k3);
      $('#parameter-U').val(defaultParams.U);
      $('#parameter-R').val(defaultParams.R);
      $('#parameter-pa').val(defaultParams.pa);
      $('#parameter-g').val(defaultParams.g);
    }
  });
  
});
