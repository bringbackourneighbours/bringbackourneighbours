#!/usr/bin/env bash

URL="https://bringbackourneighbours.de/internal-check-links/"

echo "Scanning all links on $URL"
echo "This might take a minute or two."

RAW_RESULT="$(npx --yes linkinator --format=json --redirects=warn $URL )"
PASSED="$(echo "$RAW_RESULT" | jq '.passed')"

if $PASSED; then
    echo "All links are working fine."

    exit 0
else
    echo "Some links are broken."

    # status 0 usually means that they blocked our crawler
    BROKEN="$(echo "$RAW_RESULT" | jq '.links[] | select(.state =="BROKEN" and .status != 0)')"

    if [ -n "$BROKEN" ]; then
        echo "The following links are broken:"
        echo "-----------------------------"
        echo "$BROKEN"
        echo "-----------------------------"
        echo "Please check them again from your network."
        echo "If verified, please report the broken links to the team and we will fix them as soon as possible."
        echo "If you think this is a false positive then also report it to so we can exclude that link from the scan."
        echo "Anyways please report it here: https://github.com/bringbackourneighbours/bringbackourneighbours/issues/new?template=broken-link.yml"

        exit 1
    else
        BLOCKED="$(echo "$RAW_RESULT" | jq '.links[] | select(.state =="BROKEN")')"
        echo "The following links could not be reached:"
        echo "-----------------------------"
        echo "$BLOCKED"
        echo "-----------------------------"
        echo "But the reason is probably that they have blocked our crawler."
        echo "Please check them again from your network." 

        exit 0
    fi


fi
