#!/usr/bin/env node
const cli = require('./cli/index');
const [,, ...args] = process.argv;
cli[args[0]](args.slice(1));