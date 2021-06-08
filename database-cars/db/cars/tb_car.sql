CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS cars.car (
    id                bigserial not null primary key,
    brand             varchar(255) not null,
    model             varchar(255) not null,
    manufacture_year  date not null,
    ps                int not null,
    top_speed         int not null,
    created_at        timestamp not null default NOW(),
    modified_at       timestamp not null default NOW()
)
WITH (
    OIDS= FALSE
)
TABLESPACE pg_default;

CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON cars.car
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

ALTER TABLE cars.car
    OWNER TO projectwriter;