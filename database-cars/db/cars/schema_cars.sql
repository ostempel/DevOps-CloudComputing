CREATE SCHEMA cars AUTHORIZATION projectwriter;

ALTER SCHEMA cars OWNER TO projectwriter;

\i ./cars/tb_car.sql