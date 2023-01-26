#!/usr/bin/env node
'use strict'

import importLocal from 'import-local'
import entry from '../lib/index.js'
import { filename } from 'dirname-filename-esm'
import { log } from '@sys-cli/utils'

const __filename = filename(import.meta)

// Use import-local to load the local scaffold version first
if (importLocal(__filename)) {
  log.info('cli', 'Use local scaffolding tools version')
} else {
  entry(process.argv.slice(2))
}
