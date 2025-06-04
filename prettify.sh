#!/bin/bash

find . -name "*.html" | xargs prettier --html-whitespace-sensitivity strict --write
