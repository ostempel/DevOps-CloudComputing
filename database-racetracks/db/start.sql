DO $$
BEGIN
    CREATE ROLE projectreader WITH NOLOGIN;
    EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'not creating role projectreader -- it already exists';
END
$$;

DO $$
BEGIN
    CREATE ROLE projectwriter WITH NOLOGIN;
    EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'not creating role projectwriter -- it already exists';
END
$$;

\set ON_ERROR_STOP on 

CREATE DATABASE database
    WITH 
    OWNER = projectwriter
    ENCODING = 'UTF-8'
    CONNECTION LIMIT = -1;

\c database

CREATE EXTENSION "uuid-ossp";

SET log_min_messages TO INFO;
SET client_min_messages TO INFO;

-- SCHEMAS

\i ./racetracks/schema_racetracks.sql

\q