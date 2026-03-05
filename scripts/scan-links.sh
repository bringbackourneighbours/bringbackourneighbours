#!/usr/bin/env bash

RAW_RESULT="$(npx --yes linkinator --format=json --redirects=warn https://bringbackourneighbours.de/internal-check-links/ )"

PASSED="$(echo "$RAW_RESULT" | jq '.passed')"
echo "PASSED $PASSED"

if $PASSED; then
    echo "All links are working fine."
    exit 0
else
    echo "Some links are broken. Please check the output for details."
    BROKEN="$(echo "$RAW_RESULT" | jq '.links[] | select(.state =="BROKEN")')"
    echo "$BROKEN"

    exit 1
fi
