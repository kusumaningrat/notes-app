'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateNoteText, parseCorsOrigins } = require('../lib');

describe('validateNoteText', () => {
  test('accepts normal text and trims it', () => {
    const result = validateNoteText('  Buy milk  ');
    assert.deepEqual(result, { valid: true, value: 'Buy milk' });
  });

  test('rejects an empty string', () => {
    const result = validateNoteText('');
    assert.equal(result.valid, false);
    assert.equal(result.error, 'Note text cannot be blank');
  });

  test('rejects whitespace-only text', () => {
    assert.equal(validateNoteText('   \n\t ').valid, false);
  });

  test('rejects missing or non-string values', () => {
    assert.equal(validateNoteText(undefined).valid, false);
    assert.equal(validateNoteText(null).valid, false);
    assert.equal(validateNoteText(42).valid, false);
  });
});

describe('parseCorsOrigins', () => {
  test('defaults to a wildcard when unset', () => {
    assert.deepEqual(parseCorsOrigins(undefined), ['*']);
    assert.deepEqual(parseCorsOrigins(''), ['*']);
  });

  test('splits and trims a comma-separated list', () => {
    assert.deepEqual(
      parseCorsOrigins('http://localhost:5173, https://notes.example.com'),
      ['http://localhost:5173', 'https://notes.example.com']
    );
  });

  test('ignores empty entries', () => {
    assert.deepEqual(parseCorsOrigins('http://a.test,,'), ['http://a.test']);
  });
});
