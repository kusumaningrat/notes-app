'use strict';

/**
 * Validate the text of a new note.
 * Returns { valid: true, value } with the trimmed text, or { valid: false, error }.
 */
function validateNoteText(text) {
  if (typeof text !== 'string' || text.trim() === '') {
    return { valid: false, error: 'Note text cannot be blank' };
  }
  return { valid: true, value: text.trim() };
}

/**
 * Turn a comma-separated CORS_ORIGIN value into a list of origins.
 * Falls back to ['*'] when the value is empty or missing.
 */
function parseCorsOrigins(value) {
  if (!value) {
    return ['*'];
  }
  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  return origins.length > 0 ? origins : ['*'];
}

module.exports = { validateNoteText, parseCorsOrigins };
