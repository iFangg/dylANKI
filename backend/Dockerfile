FROM mariadb

COPY data.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD=root
ENV MARIADB_ROOT_PASSWORD=root

EXPOSE 3306
