FROM mysql:8.4.3

# copy initializing script for databse
COPY 00_database_starter.sql /docker-entrypoint-initdb.d/
COPY 01_database_functions.sql /docker-entrypoint-initdb.d/

EXPOSE 3306