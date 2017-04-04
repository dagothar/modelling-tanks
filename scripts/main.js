$(document).ready(function() {
  
  var canvas = $('#board').get(0);
  var overlay = $('#overlay').get(0);
  
  var game = undefined;
  var stepTimer = undefined;
  var running = false;
  
  
  function reset() {
    clearInterval(stepTimer);
    running = false;
        
    $('.button-start').show();
    $('.button-stop').hide();
  };
  
  
  reset();
  
  
  function step() {
    
  };  
  
  
  $('.button-start').click(function() {
    $(this).hide();
    $('.button-stop').show();
    if (!running) {
      stepTimer = setInterval(step, 1);
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
