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
    
    
    function valve(width, height) {
      ctx2.strokeStyle = 'rgb(0, 0, 0)';
      ctx2.lineWidth = W2;
      
      ctx2.beginPath();
        ctx2.moveTo(0, 0);
        ctx2.lineTo(0, height);
        ctx2.lineTo(width, 0);
        ctx2.lineTo(width, height);
        ctx2.lineTo(0, 0);
      ctx2.closePath();
      ctx2.stroke();
      
      ctx2.beginPath();
        ctx2.moveTo(width/2, height/2);
        ctx2.lineTo(width/2, -height);
      ctx2.stroke();
      
      ctx2.beginPath();
        ctx2.moveTo(0, -height);
        ctx2.lineTo(width, -height);
      ctx2.stroke();
    };
    
    
    //! Renders the tank
    this.render = function(tank) {
      // clear 
      ctx1.clearRect(0, 0, width, height);
      ctx2.clearRect(0, 0, width, height);
      
      // draw water
      ctx1.save();
      ctx1.scale(1, 0.67);
      
        // filled top surface
        ctx1.beginPath();
        ctx1.fillStyle = 'rgba(0, 0, 255, 0.2)';
        ctx1.arc(width/2, (height/2+120-250*tank.getLevel())/0.67, 150, 1 * Math.PI, 2 * Math.PI);
        ctx1.fill();
        ctx1.closePath();
        
        // filled bottom surface
        ctx1.beginPath();
        ctx1.fillStyle = 'rgba(0, 0, 255, 0.2)';
        ctx1.arc(width/2, (height/2+120)/0.67, 150, 0 * Math.PI, 1 * Math.PI);
        ctx1.fill();
        ctx1.closePath();
      ctx1.restore();
      
      // water
      ctx1.beginPath();
      ctx1.fillStyle = 'rgba(0, 0, 255, 0.2)';
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
      
      // draw tank
      ctx2.drawImage(layer1, 0, 0);
      ctx1.clearRect(0, 0, width, height);
      ctx2.save();
      ctx2.scale(1, 0.67);
      ctx2.strokeStyle = 'rgb(0, 0, 0)';
      ctx2.lineWidth = W2;
      ctx2.beginPath();
      ctx2.arc(width/2, (height/2+120)/0.67, 150, 0, 1 * Math.PI);
      //ctx2.setLineDash([5, 15]);
      ctx2.arc(width/2, (height/2+120)/0.67, 150, 1 * Math.PI, 2 * Math.PI);
      ctx2.stroke();
      ctx2.closePath();
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
      
      // draw valve 1
      ctx2.beginPath();
        ctx2.lineTo(10, 50);
        ctx2.lineTo(100, 50);
      ctx2.closePath();
      ctx2.stroke();
      
      ctx2.save();
        ctx2.translate(100, 35);
        valve(50, 30);
      ctx2.restore();
      
      ctx2.beginPath();
        ctx2.lineTo(150, 50);
        ctx2.lineTo(200, 50);
        ctx2.lineTo(200, 80);
      ctx2.stroke();
      
      // draw valve 2
      ctx2.beginPath();
        ctx2.lineTo(590, 50);
        ctx2.lineTo(500, 50);
      ctx2.closePath();
      ctx2.stroke();
      
      ctx2.save();
        ctx2.translate(450, 35);
        valve(50, 30);
      ctx2.restore();
      
      ctx2.beginPath();
        ctx2.lineTo(450, 50);
        ctx2.lineTo(400, 50);
        ctx2.lineTo(400, 80);
      ctx2.stroke();
      
      // draw valve 3
      ctx2.beginPath();
        ctx2.lineTo(450, 420);
        ctx2.lineTo(475, 420);
      ctx2.closePath();
      ctx2.stroke();
      
      ctx2.save();
        ctx2.translate(475, 405);
        valve(50, 30);
      ctx2.restore();
      
      ctx2.beginPath();
        ctx2.lineTo(525, 420);
        ctx2.lineTo(550, 420);
        ctx2.lineTo(550, 450);
      ctx2.stroke();
      
    };
  };
  
  
  return Render;
} ());
