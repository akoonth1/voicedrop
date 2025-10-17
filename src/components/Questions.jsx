import React, { useState, useEffect } from 'react';

export default function Questions({ id = 1 }) {
  const [currentId, setCurrentId] = useState(id);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const styles = {
    container: {
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '12px',
      marginBottom: '12px'
    },
    title: { margin: 0, fontSize: 16, fontWeight: 600 },
    body: { marginTop: 8, color: '#333' },
    meta: { marginTop: 6, fontSize: 12, color: '#666' },
    controls: { marginTop: 10, display: 'flex', gap: 8 }
  };

  // keep currentId in sync if parent changes id prop
  useEffect(() => {
    setCurrentId(id);
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    const fetchQuestion = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `http://localhost:3000/api/questions/questions/${currentId}`;
        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed with status ${res.status}`);
        }
        const data = await res.json();
        console.debug('Questions fetch result:', data);

        // support server returning either an object or an array
        let payload = data;
        if (Array.isArray(payload)) {
          payload = payload.find(item => {
            return (
              // try matching multiple id fields
              item.id === currentId ||
              item.qid === currentId ||
              item._id === currentId ||
              String(item.id) === String(currentId) ||
              String(item.qid) === String(currentId) ||
              String(item._id) === String(currentId)
            );
          }) || payload[0];
        }
        if (!cancelled) setQuestion(payload);
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to load question');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchQuestion();

    return () => { cancelled = true; };
  }, [currentId]);

  const handleNext = () => setCurrentId(prev => prev + 1);

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (error) return (
    <div style={styles.container}>
      <div style={styles.title}>Error</div>
      <div style={styles.body}>{error}</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.meta}>
        {question?.qid ? `qid: ${question.qid}` : question?.id ? `id: ${question.id}` : question?._id ? `_id: ${question._id}` : null}
      </div>
      <h3 style={styles.title}>{question?.question ?? 'Question not found'}</h3>
      {question?.set && <div style={styles.body}>Set: {question.set}</div>}

      <div style={styles.controls}>
        <button onClick={handleNext} disabled={loading}>Next</button>
      </div>
    </div>
  );
}