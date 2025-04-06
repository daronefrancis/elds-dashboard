// frontend/components/DashboardView.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardView() {
  const [quotes, setQuotes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quoteRes = await axios.get('/api/quotes');
        const jobRes = await axios.get('/api/jobs');
        setQuotes(quoteRes.data);
        setJobs(jobRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Live Quote + Job Activity</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Quotes</h2>
        <ul className="mt-2 space-y-2">
          {quotes.map((quote) => (
            <li key={quote.id} className="p-4 border rounded shadow">
              <div className="font-semibold">{quote.fields['Quote ID']}</div>
              <div>Email: {quote.fields['Contact Email']}</div>
              <div>Value: ${quote.fields['Value']}</div>
              <div className="text-gray-500">{quote.fields['Notes']}</div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Jobs</h2>
        <ul className="mt-2 space-y-2">
          {jobs.map((job) => (
            <li key={job.id} className="p-4 border rounded shadow">
              <div className="font-semibold">{job.fields['Job ID']}</div>
              <div>Status: {job.fields['Status']}</div>
              <div>Assigned: {job.fields['Assigned Rep']}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
