var Tank = (function() {
  
  function Tank(params, x0, solver) {
    var D;
    var hmax;
    var ro;
    var Cp;
    var Tmax;
    var p1;
    var mu1;
    var k1;
    var T1;
    var p2;
    var mu2;
    var k2;
    var T2;
    var mu3;
    var k3;
    var U;
    var R;
    var pa;
    var g;
    
    var A = Math.PI * D*D / 4.0;
    var Aro = 1.0/(A * ro);
    
    // parameters
    this.setParameters = function(params) {
      D = params.D;
      hmax = params.hmax;
      ro = params.ro;
      Cp = params.Cp;
      Tmax = params.Tmax;
      p1 = params.p1;
      mu1 = params.mu1;
      k1 = params.k1;
      T1 = params.T1;
      p2 = params.p2;
      mu2 = params.mu2;
      k2 = params.k2;
      T2 = params.T2;
      mu3 = params.mu3; 
      k3 = params.k3;
      U = params.U;
      R = params.R;
      pa = params.pa;
      g = params.g;
      
      A = Math.PI * D*D / 4.0;
      Aro = 1.0/(A * ro);
    };
    
    this.setParameters(params);
    
    // state
    var x = x0;
    var z1 = 0.0, z2 = 0.0, z3 = 0.0, heater = 0.0;
    var q1 = 0.0, q2 = 0.0, q3 = 0.0;
    
    // solver
    var solver = solver;
    
    
    this.getState = function() { return x; };
    this.setState = function(nx) { x - nx; };
    this.getLevel = function() { return x[0]; };
    this.getTemperature = function() { return x[1]; };
    this.getQ1 = function() { return q1; };
    this.getQ2 = function() { return q2; };
    this.getQ3 = function() { return q3; };
    this.getZ1 = function() { return z1; };
    this.setZ1 = function(z) { z1 = z; };
    this.getZ2 = function() { return z2; };
    this.setZ2 = function(z) { z2 = z; };
    this.getZ3 = function() { return z3; };
    this.setZ3 = function(z) { z3 = z; };
    this.getHeater = function() { return heater; };
    this.setHeater = function(z) { heater = z; };
    this.getT1 = function() { return T1; };
    this.getT2 = function() { return T2; };
    
    
    //! Calculate derivatives of the state variables
    this.dxfun = function(t, u, x) {
      var dx = [0, 0];
      
      // state variables and inputs
      var h = x[0];
      var T = x[1];
      
      z1 = u[0];
      z2 = u[1];
      z3 = u[2];
      heater = u[3];
      var H  = heater * U;
      
      // calculate flows
      q1 = mu1*k1*z1*Math.sqrt(2*ro*(p1-pa));
      q2 = mu2*k2*z2*Math.sqrt(2*ro*(p2-pa));
      q3 = (h > 0.0) ? mu3*k3*z3*ro*Math.sqrt(2*g*h) : 0.0;
      
      dx[0] = Aro * (q1 + q2 - q3);
      dx[1] = Aro/h * (q1*(T1-T) + q2*(T2-T) + 1.0*H*H/(R*Cp));
      
      return dx;
    };
    
    
    //! Calculates next step state variables
    this.step = function(t, u, dt) {
      // solve for new x state
      x = solver.solve(this.dxfun, t, u, x, dt);

      // take care of bounds
      if (x[0] < 0.0) x[0] = 0.0;
      if (x[0] > hmax) x[0] = hmax;
      if (x[1] > Tmax) x[1] = Tmax;
      if (isNaN(x[1])) x[1] = 0.0;
      
      return x;
    };
  };
  
  
  return Tank;
} ());
