/**
 * Simple in‑memory service for managing weight entries. Used for unit tests.
 */
class WeightEntryService {
  constructor() {
    this.entries = [];
    this.nextId = 1;
  }

  /**
   * Returns all entries sorted by date ascending.
   */
  getAll() {
    return this.entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  /**
   * Returns an entry by its id, or null if not found.
   */
  getById(id) {
    return this.entries.find((e) => e.id === id) || null;
  }

  /**
   * Adds a new entry and assigns a unique identifier.
   */
  add(entry) {
    const newEntry = { id: this.nextId++, date: entry.date, weight: entry.weight };
    this.entries.push(newEntry);
    return newEntry;
  }

  /**
   * Updates an existing entry. Returns true if successful, false if not found.
   */
  update(id, entry) {
    const index = this.entries.findIndex((e) => e.id === id);
    if (index < 0) return false;
    this.entries[index] = { id, date: entry.date, weight: entry.weight };
    return true;
  }

  /**
   * Deletes an entry. Returns true if successful, false if not found.
   */
  delete(id) {
    const index = this.entries.findIndex((e) => e.id === id);
    if (index < 0) return false;
    this.entries.splice(index, 1);
    return true;
  }
}

module.exports = WeightEntryService;