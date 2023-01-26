/**
 * Write automated test cases using jest
 */
import path from 'node:path'
import { execa } from 'execa'

const CLI = path.join(__dirname, '../bin/sys-cli.js')
const bin =
  () =>
  (...args) =>
    execa(CLI, args)

// test command
test('run error command', async () => {
  const { stderr } = await bin()('abc')
  expect(stderr).toContain('unknown command: abc')
})

// Test help
test('should not throw error when use --help', async () => {
  let error = null
  try {
    await bin()('--help')
  } catch (e) {
    error = e
  }
  expect(error).toBe(null)
})

// Test version
test('show correct version', async () => {
  const { stdout } = await bin()('-V')
  expect(stdout).toContain(require('../package.json').version)
})

// Test debug
test('open debug mode', async () => {
  let error = null
  try {
    await bin()('--debug')
  } catch (e) {
    error = e
  }
  expect(error.message).toContain('launch debug mode')
})
