clc; clear all; close all;

%% Data

% Tank & fluid properties:
D = 0.1;        % tank diameter [m]
ro = 1000;      % fluid density [kg/m^3]
Cp = 4190;      % specific heat capacity [J/(kg*K)]

% Input & output properties:
p1 = 200000;    % pressure at valve #1 [Pa]
mu1 = 0.05;      % flow rate for valve #1 [1]
k1 = 0.001;      % coefficient of valve opening area to actuator position [m^2/m] 
T1 = 10;        % temperature of fluid at valve #1 [deg C]

p2 = 200000;    % pressure at valve #2 [Pa]
mu2 = 0.05;      % flow rate for valve #2 [1]
k2 = 0.001;      % coefficient of valve opening area to actuator position [m^2/m]
T2 = 60;        % temperature of fluid at valve #2 [deg C]

mu3 = 0.05;      % flow rate for valve #3 [1]
k3 = 0.01;       % coefficient of valve opening area to actuator position [m^2/m]

U = 230;        % voltage for the heater [V]
R = 0.0001;          % resistance of the heater [ohm]

% General properties:
pa = 100000;    % atmospheric pressure [Pa]
g = 9.81;       % gravitational acceleration [m/s^2]

% Simulation time:
t = [0 : 0.1 : 60]; % [s]

%% Initial conditions
x0 = [0.5 20];  % [ h T ]

%% Solution
options = odeset('AbsTol', 1e-3, 'RelTol', 1e-3);
[t, x] = ode23s(@tank_odefun, t, x0, options, [D ro Cp p1 mu1 k1 T1 p2 mu2 k2 T2 mu3 k3 U R pa g]);

%% Plot results
figure;
plotyy(t, x(:, 1), t, x(:, 2));
legend('h [m]', 'T [deg C]');
xlabel('t [s]');
ylabel('h [m], T [deg C]');