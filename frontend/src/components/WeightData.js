import React, { useEffect, useState } from 'react';
import WeightEntryForm from './WeightEntryForm';
import WeightEntriesTable from './WeightEntriesTable';
import ChartComponent from './Chart';
import {
  getWeightEntries,
  createWeightEntry,
  updateWeightEntry,
  deleteWeightEntry
} from '../services/api';

/**
 * WeightData component encapsulates the CRUD operations for weight entries and visualizes them in a chart.
 */
const WeightData = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  // Fetch all entries from the API.
  const fetchEntries = async () => {
    try {
      const response = await getWeightEntries();
      setEntries(response.data);
    } catch (error) {
      console.error('Failed to fetch entries', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Handler for creating a new entry.
  const handleCreate = async (entry) => {
    try {
      await createWeightEntry(entry);
      fetchEntries();
    } catch (error) {
      console.error('Failed to create entry', error);
    }
  };

  // Handler for updating an existing entry.
  const handleUpdate = async (id, entry) => {
    try {
      await updateWeightEntry(id, entry);
      setEditingEntry(null);
      fetchEntries();
    } catch (error) {
      console.error('Failed to update entry', error);
    }
  };

  // Handler for deleting an entry.
  const handleDelete = async (id) => {
    try {
      await deleteWeightEntry(id);
      fetchEntries();
    } catch (error) {
      console.error('Failed to delete entry', error);
    }
  };

  return (
    <div className="weight-data-container">
      <h2>My Weight Data</h2>
      <WeightEntryForm onSubmit={handleCreate} />
      <WeightEntriesTable
        entries={entries}
        onEdit={(entry) => setEditingEntry(entry)}
        onDelete={handleDelete}
        editingEntry={editingEntry}
        onUpdate={handleUpdate}
      />
      {entries.length > 0 && <ChartComponent entries={entries} />}
    </div>
  );
};

export default WeightData;