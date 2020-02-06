#!/usr/bin/env bash

cd $(git rev-parse --show-toplevel)
npm run test:ci && git push origin master