#!/usr/bin/env bash

# Remove the ## comments with phrases from the mootivator.sh file
sed -i.bak '/^## /d' mootivator.sh

# Remove the backup file
rm -f mootivator.sh.bak

# Add the ## comments with phrases back to the mootivator.sh file
cat data/*.txt | sed 's/^/## /' >> mootivator.sh
