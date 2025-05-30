#!/bin/bash

find . -name "*.html" | xargs prettier --write
