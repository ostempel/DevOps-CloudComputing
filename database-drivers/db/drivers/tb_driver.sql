CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS drivers.driver (
    id                bigserial not null primary key,
    first_name        varchar(255) not null,
    last_name         varchar(255) not null,
    birth_date        date not null,
    country           varchar(255) not null,
    created_at        timestamp not null default NOW(),
    modified_at       timestamp not null default NOW()
)
WITH (
    OIDS= FALSE
)
TABLESPACE pg_default;

CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON drivers.driver
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

ALTER TABLE drivers.driver
    OWNER TO projectwriter;