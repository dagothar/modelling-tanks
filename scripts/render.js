var Render = (function() {
  
  function Render(layer1, layer2) {
    
    var layer1 = layer1;
    var layer2 = layer2;
    var ctx1 = layer1.getContext('2d');
    var ctx2 = layer2.getContext('2d');
    
    var width = layer1.width;
    var height = layer1.height;
    
    var cx = width / 2;
    var cy = height / 2;
    
    var W1 = 2;
    var W2 = 3;
    
    
    //! Calculates the color of the heated water.
    function T2color(t, alpha) {
      r = 255 * t / 100;
      g = 0;
      b = 255;
      
      return 'rgba(' + Math.floor(r) + ', ' + Math.floor(g) + ', ' + Math.floor(b) + ', ' + alpha.toFixed(2) + ')';
    };
    
    
    //! Draw a valve.
    function valve(ctx, x, y, width, height, opening, name, texty) {
      ctx.save();
      
      ctx.translate(x, y);
      
      // setup
      var d = opening * height / 2.0;
      
      // valve shape
      ctx.beginPath();
        ctx.moveTo(-width/2, -height/2);
        ctx.lineTo(0, -d);
        ctx.lineTo(width/2, -height/2);
        ctx.lineTo(width/2, height/2);
        ctx.lineTo(0, d);
        ctx.lineTo(-width/2, height/2);
        ctx.lineTo(-width/2, -height/2);
      ctx.closePath();
      ctx.stroke();
      
      // actuator
      ctx.beginPath();
        ctx.moveTo(0, -d);
        ctx.lineTo(0, -d-height);
        ctx.moveTo(-width/4, -d-height);
        ctx.lineTo(width/4, -d-height);
      ctx.closePath();
      ctx.stroke();
      
      // name
      ctx.fillText(name, -width/2, texty);
      
      ctx.restore();
    };
    
    
    //! Draw tank.
    
    
    
    //! Renders the model
    this.render = function(tank) {
      // clear 
      ctx1.clearRect(0, 0, width, height);
      ctx2.clearRect(0, 0, width, height);
      
      // find water color
      var color = T2color(tank.getTemperature(), 0.2);
      
      // draw water
      ctx1.save();
      ctx1.scale(1, 0.67);
      
        // filled top surface
        ctx1.beginPath();
        ctx1.fillStyle = color;
        ctx1.arc(width/2, (height/2+120-250*tank.getLevel())/0.67, 150, 1 * Math.PI, 2 * Math.PI);
        ctx1.fill();
        ctx1.closePath();
        
        // filled bottom surface
        ctx1.beginPath();
        ctx1.fillStyle = color;
        ctx1.arc(width/2, (height/2+120)/0.67, 150, 0 * Math.PI, 1 * Math.PI);
        ctx1.fill();
        ctx1.closePath();
      ctx1.restore();
      
      // water
      ctx1.beginPath();
      ctx1.fillStyle = color;
      ctx1.fillRect(width/2-150, height/2+120-250*tank.getLevel(), 300, 250*tank.getLevel());
      //ctx1.fill();
      ctx1.closePath();
      ctx1.fillStyle = 'rgba(255, 255, 255, 1)';
      
      ctx1.save();
      ctx1.scale(1, 0.67);
        // water surface
        ctx1.beginPath();
        ctx1.strokeStyle = 'rgb(0, 0, 255)';
        ctx1.lineWidth = W1;
        ctx1.arc(width/2, (height/2+120-250*tank.getLevel())/0.67, 150, 0, 2 * Math.PI);
        ctx1.stroke();
        ctx1.closePath();
      ctx1.restore();
      
      // draw flow 1
      
      // draw tank
      ctx2.drawImage(layer1, 0, 0);
      ctx1.clearRect(0, 0, width, height);
      ctx2.save();
      ctx2.scale(1, 0.67);
      ctx2.strokeStyle = 'rgb(0, 0, 0)';
      ctx2.lineWidth = W2;
      ctx2.beginPath();
      ctx2.arc(width/2, (height/2+120)/0.67, 150, 0, 1 * Math.PI);
      ctx2.stroke();
      ctx2.closePath();
      
      ctx2.beginPath();
        ctx2.setLineDash([5, 15]);
        ctx2.arc(width/2, (height/2+120)/0.67, 150, 1 * Math.PI, 2 * Math.PI);
        ctx2.stroke();
      ctx2.restore();
      
      ctx2.save();
      ctx2.scale(1, 0.67);
      ctx2.strokeStyle = 'rgb(0, 0, 0)';
      ctx2.lineWidth = W2;
      ctx2.beginPath();
      ctx2.arc(width/2, (height/2+120-250)/0.67, 150, 0, 2 * Math.PI);
      ctx2.stroke();
      ctx2.beginPath();
      ctx2.lineTo(width/2-150, (height/2+120)/0.67);
      ctx2.lineTo(width/2-150, (height/2+120-250)/0.67);
      ctx2.stroke();
      ctx2.beginPath();
      ctx2.lineTo(width/2+150, (height/2+120)/0.67);
      ctx2.lineTo(width/2+150, (height/2+120-250)/0.67);
      ctx2.stroke();
      ctx2.closePath();
      ctx2.restore();
      
      ctx2.strokeStyle = 'rgb(0, 0, 0)';
      ctx2.lineWidth = W2;
      
      /* draw valves */
      ctx2.font = '25px Sans';
      ctx2.strokeStyle = 'rgb(0, 0, 0)';
      ctx2.lineWidth = 3;
      
      valve(ctx2, 100, 100, 50, 30, tank.getZ1(), 'Z1', 40);
      valve(ctx2, 500, 100, 50, 30, tank.getZ2(), 'Z2', 40);
      valve(ctx2, 500, 420, 50, 30, tank.getZ3(), 'Z3', 40);
      
      /* draw pipes */
      
      
    };
  };
  
  
  return Render;
} ());
