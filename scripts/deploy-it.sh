#!/usr/bin/env bash

cd $(git rev-parse --show-toplevel)
./scripts/ship-it.sh && git push heroku master