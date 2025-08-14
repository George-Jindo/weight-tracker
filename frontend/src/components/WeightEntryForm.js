import React, { useState } from 'react';

/**
 * Form component for creating a new weight entry. Calls onSubmit when the form is submitted.
 */
const WeightEntryForm = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !weight) {
      return;
    }
    onSubmit({ date: date, weight: parseFloat(weight) });
    setDate('');
    setWeight('');
  };

  return (
    <form onSubmit={handleSubmit} className="weight-entry-form">
      <h3>Add New Entry</h3>
      <div className="form-group">
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Weight (lbs)</label>
        <input
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default WeightEntryForm;