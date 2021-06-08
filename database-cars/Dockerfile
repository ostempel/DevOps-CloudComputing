FROM postgres:13

RUN set -x && \
    apt-get update && \
    apt-get install -y --no-install-recommends dos2unix

COPY ./db /db
COPY init.sh /docker-entrypoint-initdb.d/
RUN dos2unix /docker-entrypoint-initdb.d/init.sh
WORKDIR /db
