const WeightEntryService = require('../src/services/weightEntryService');

describe('WeightEntryService', () => {
  let service;

  beforeEach(() => {
    service = new WeightEntryService();
  });

  test('can add entry', () => {
    const entry = { date: '2025-08-10', weight: 150 };
    const result = service.add(entry);
    expect(result.id).toBeDefined();
    expect(service.getAll().length).toBe(1);
  });

  test('can update entry', () => {
    const entry = service.add({ date: '2025-08-10', weight: 150 });
    const updated = service.update(entry.id, { date: '2025-08-11', weight: 149 });
    expect(updated).toBe(true);
    const fromService = service.getById(entry.id);
    expect(fromService.weight).toBe(149);
  });

  test('can delete entry', () => {
    const entry = service.add({ date: '2025-08-10', weight: 150 });
    const deleted = service.delete(entry.id);
    expect(deleted).toBe(true);
    expect(service.getAll().length).toBe(0);
  });

  test('update returns false when not found', () => {
    const result = service.update(999, { date: '2025-08-11', weight: 150 });
    expect(result).toBe(false);
  });

  test('delete returns false when not found', () => {
    const result = service.delete(999);
    expect(result).toBe(false);
  });
});