#! /bin/bash
npm version '1.0.'$(date +%Y%m%d%H%M)
npm run build
npm publish --tag latest --access public
