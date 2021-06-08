CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS racetracks.racetrack (
    id                bigserial not null primary key,
    name              varchar(255) not null,
    country           varchar(255) not null,
    length            varchar(255) not null,
    created_at        timestamp not null default NOW(),
    modified_at       timestamp not null default NOW()
)
WITH (
    OIDS= FALSE
)
TABLESPACE pg_default;

CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON racetracks.racetrack
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

ALTER TABLE racetracks.racetrack
    OWNER TO projectwriter;