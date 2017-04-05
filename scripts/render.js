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
      ctx.stroke();
      
      // name
      ctx.fillText(name, -width/2, texty);
      
      ctx.restore();
    };
    
    
    //! Draw water.
    function drawWater(ctx, x, y, width, height, level, temperature, ratio) {
      ctx.save();
      
      // setup
      ctx.translate(x, y);
      ctx.scale(1, ratio);
      ctx.strokeStyle = T2color(temperature, 1);
      ctx.fillStyle = T2color(temperature, 0.2);
      
      // top surface
      ctx.beginPath();
      ctx.arc(0, -(height*level)/ratio, width/2, Math.PI, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      
      // bottom surface
      ctx.beginPath();
      ctx.arc(0, 0, width/2, 0, 1 * Math.PI);
      ctx.closePath();
      ctx.fill();
      
      // middle
      ctx.fillRect(-width/2, 0, width, -height*level/ratio);
      
      // top solid
      ctx.setLineDash([1, 0]);
      ctx.beginPath();
      ctx.arc(0, -height*level/ratio, width/2, 0, 1 * Math.PI);
      ctx.stroke();
      
      // top dashed
      ctx.setLineDash([10, 15]);
      ctx.beginPath();
      ctx.arc(0, -height*level/ratio, width/2, Math.PI, 2 * Math.PI);
      ctx.stroke();
      
      ctx.restore();
    };
    
    
    //! Draw tank.
    function drawTank(ctx, x, y, width, height, ratio) {
      ctx.save();
      
      ctx.translate(x, y);
      ctx.scale(1, ratio);
      
      // bottom solid
      ctx.beginPath();
      ctx.arc(0, 0, width/2, 0, 1 * Math.PI);
      ctx.stroke();
      
      // bottom dashed
      ctx.setLineDash([10, 15]);
      ctx.beginPath();
      ctx.arc(0, 0, width/2, Math.PI, 2 * Math.PI);
      ctx.stroke();
      
      // top
      ctx.setLineDash([1, 0]);
      ctx.beginPath();
      ctx.arc(0, -height/ratio, width/2, 0, 2 * Math.PI);
      ctx.stroke();
      
      // sides
      ctx.scale(1, 1);
      ctx.beginPath();
      ctx.moveTo(-width/2, 0);
      ctx.lineTo(-width/2, -height/ratio);
      ctx.moveTo(width/2, 0);
      ctx.lineTo(width/2, -height/ratio);
      ctx.stroke();
      
      ctx.restore();
    };
    
    
    //! Draws flow.
    function drawFlow(ctx, x, y, width, height, q, temperature) {
      ctx.save();
      
      ctx.translate(x, y);
      
      ctx.fillStyle = T2color(temperature, 0.5);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(q*width/2, height);
      ctx.lineTo(-q*width/2, height);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };
    
    
    //! Renders the model
    this.render = function(tank) {
      // clear 
      ctx1.clearRect(0, 0, width, height);
      ctx2.clearRect(0, 0, width, height);
      
      
      /* draw water */
      ctx1.lineWidth = 3;
      drawWater(ctx1, width/2, height/2+120, 300, 250, tank.getLevel(), tank.getTemperature(), 0.67);   
      
      /* draw flows */
      drawFlow(ctx1, 200, 75, 10, 100, tank.getQ1(), 10);   
      drawFlow(ctx1, 400, 75, 10, 100, tank.getQ2(), 60);   
      
      /* copy layer 1 to layer 2 */
      ctx2.drawImage(layer1, 0, 0);
      ctx1.clearRect(0, 0, width, height);
      
      /* draw tank */
      ctx2.strokeStyle = 'rgb(0, 0, 0)';
      ctx2.lineWidth = 3;
      drawTank(ctx2, width/2, height/2+120, 300, 250, 0.67);
      
      /* draw valves */
      ctx2.font = '25px Sans';
      ctx2.strokeStyle = 'rgb(0, 0, 0)';
      ctx2.lineWidth = 3;
      
      valve(ctx2, 100, 50, 50, 30, tank.getZ1(), 'Z1', 40);
      valve(ctx2, 500, 50, 50, 30, tank.getZ2(), 'Z2', 40);
      valve(ctx2, 500, 420, 50, 30, tank.getZ3(), 'Z3', 40);
      
      /* draw pipes */
      
      // pipe 1
      ctx2.beginPath();
        ctx2.moveTo(25, 50);
        ctx2.lineTo(75, 50);
        ctx2.moveTo(125, 50);
        ctx2.lineTo(200, 50);
        ctx2.lineTo(200, 75);
      ctx2.stroke();
      
      // pipe 2
      ctx2.beginPath();
        ctx2.moveTo(575, 50);
        ctx2.lineTo(525, 50);
        ctx2.moveTo(475, 50);
        ctx2.lineTo(400, 50);
        ctx2.lineTo(400, 75);
      ctx2.stroke();
      
      // pipe 3
      ctx2.beginPath();
        ctx2.moveTo(450, 420);
        ctx2.lineTo(475, 420);
        ctx2.moveTo(525, 420);
        ctx2.lineTo(550, 420);
        ctx2.lineTo(550, 445);
      ctx2.stroke();
      
    };
  };
  
  
  return Render;
} ());
