import React, { useState } from 'react';

/**
 * Renders a table of weight entries. Provides inline editing and deletion.
 */
const WeightEntriesTable = ({ entries, onEdit, onDelete, editingEntry, onUpdate }) => {
  const [editDate, setEditDate] = useState('');
  const [editWeight, setEditWeight] = useState('');

  const startEdit = (entry) => {
    onEdit(entry);
    // Prepopulate the edit fields with the existing values.
    setEditDate(entry.date.substring(0, 10));
    setEditWeight(entry.weight);
  };

  const handleUpdate = (id) => {
    onUpdate(id, { id, date: editDate, weight: parseFloat(editWeight) });
  };

  return (
    <table className="entries-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Weight (lbs)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            {editingEntry && editingEntry.id === entry.id ? (
              <>
                <td>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.1"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdate(entry.id)}>Save</button>
                  <button onClick={() => onEdit(null)}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.weight}</td>
                <td>
                  <button onClick={() => startEdit(entry)}>Edit</button>
                  <button onClick={() => onDelete(entry.id)}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeightEntriesTable;