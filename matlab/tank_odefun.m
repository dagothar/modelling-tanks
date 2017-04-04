function [ dx ] = tank_odefun( t, x, p )
%TANK_ODEFUN Calculates derivatives for the tank example

%% Parameters
D = p(1);
ro = p(2);
Cp = p(3);
p1 = p(4);
mu1 = p(5);
k1 = p(6);
T1 = p(7);
p2 = p(8);
mu2 = p(9);
k2 = p(10);
T2 = p(11);
mu3 = p(12); 
k3 = p(13);
U = p(14);
R = p(15);
pa = p(16);
g = p(17);

%% Inputs & state variables
z1 = 1 * heaviside(t-0);
z2 = 1 * heaviside(t-10) - 1 * heaviside(t-30);
z3 = 1 * heaviside(t-20);
U  = 1 * heaviside(t-0);

h = x(1);
T = x(2);

%% Calculate helper coefficients
A = pi*D^2/4;
q1 = mu1*k1*z1*sqrt(2*ro*(p1-pa));
q2 = mu2*k2*z2*sqrt(2*ro*(p2-pa));
q3 = (h>0)*mu3*k3*z3*ro*sqrt(2*g*h);

%% Calculate derivatives
dx(1, 1) = 1/(A*ro) * (q1 + q2 - q3);
dx(2, 1) = 1/(A*ro*h) * (q1*(T1-T) + q2*(T2-T) + U^2/(R*Cp));

end

