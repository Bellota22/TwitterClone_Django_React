#!/bin/bash

# run migrations
python manage.py makemigrations
python manage.py migrate

# start server
python manage.py runserver

exec "$@"