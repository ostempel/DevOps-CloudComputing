#!/bin/bash
set -euo pipefail

INITIALIZE_DB=${INITIALIZE_DB:-false}

if [ "$INITIALIZE_DB" = "true" ]; then
    psql -d postgres -f start.sql -U $POSTGRES_USER
    echo "*** Database created! ***"
fi
