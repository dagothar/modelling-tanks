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
        ctx1.lineWidth = 2;
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
      ctx2.lineWidth = 3;
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
    };
  };
  
  
  return Render;
} ());
