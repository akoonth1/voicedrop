import React, { useState, useEffect } from 'react';

export default function Profile({
  id = 1,
  name = 'Your Name',
  age = 30,
  picture = 'https://via.placeholder.com/120',
  bio = 'This is a short bio. Replace with up to 140 characters describing yourself concisely.',
  onSave
}) {
  const max = 140;

  const [editing, setEditing] = useState(false);
  const [nameState, setNameState] = useState(name);
  const [ageState, setAgeState] = useState(age);
  const [pictureState, setPictureState] = useState(picture);
  const [bioState, setBioState] = useState(bio);

  useEffect(() => {
    setNameState(name);
    setAgeState(age);
    setPictureState(picture);
    setBioState(bio);
  }, [name, age, picture, bio]);

  const styles = {
    container: {
      width: 320,
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
    },
    img: {
      width: 120,
      height: 120,
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: 12,
      background: '#f6f6f6'
    },
    name: { margin: 0, fontSize: 20, fontWeight: 600 },
    age: { margin: '4px 0 12px', color: '#666' },
    bio: { textAlign: 'center', fontSize: 14, color: '#333', whiteSpace: 'pre-wrap' },
    meta: { marginTop: 8, fontSize: 12, color: '#999' },
    formRow: { width: '100%', marginBottom: 8, display: 'flex', flexDirection: 'column' },
    input: { width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' },
    textarea: { width: '100%', minHeight: 80, padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' },
    controls: { marginTop: 12, display: 'flex', gap: 8 }
  };

  const handleSave = () => {
    const payload = {
      id,
      name: nameState,
      age: Number(ageState) || 0,
      picture: pictureState,
      bio: bioState.slice(0, max)
    };
    if (typeof onSave === 'function') onSave(payload);
    setEditing(false);
  };

  const handleCancel = () => {
    setNameState(name);
    setAgeState(age);
    setPictureState(picture);
    setBioState(bio);
    setEditing(false);
  };

  if (editing) {
    return (
      <div style={styles.container}>
        <div style={styles.formRow}>
          <img src={pictureState || 'https://via.placeholder.com/120'} alt="avatar" style={styles.img} />
        </div>

        <div style={styles.formRow}>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Name</label>
          <input style={styles.input} value={nameState} onChange={(e) => setNameState(e.target.value)} />
        </div>

        <div style={styles.formRow}>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Age</label>
          <input style={styles.input} type="number" value={ageState} onChange={(e) => setAgeState(e.target.value)} />
        </div>

        <div style={styles.formRow}>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Profile picture (URL)</label>
          <input style={styles.input} value={pictureState} onChange={(e) => setPictureState(e.target.value)} placeholder="https://..." />
        </div>

        <div style={styles.formRow}>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Bio</label>
          <textarea
            style={styles.textarea}
            maxLength={max}
            value={bioState}
            onChange={(e) => setBioState(e.target.value)}
          />
          <div style={{ textAlign: 'right', fontSize: 12, color: '#666' }}>{bioState.length}/{max}</div>
        </div>

        <div style={styles.controls}>
          <button onClick={handleSave} style={{ padding: '8px 12px', borderRadius: 6 }}>Save</button>
          <button onClick={handleCancel} style={{ padding: '8px 12px', borderRadius: 6 }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <img src={picture} alt={`${name} avatar`} style={styles.img} />
      <h3 style={styles.name}>{name}</h3>
      <div style={styles.age}>Age: {age}</div>
      <div style={styles.bio} title={bio}>{bio.length > max ? bio.slice(0, max - 3) + '...' : bio}</div>
      <div style={styles.meta}>{bio.length}/{max} chars</div>

      <div style={styles.controls}>
        <button onClick={() => setEditing(true)} style={{ padding: '8px 12px', borderRadius: 6 }}>Edit</button>
      </div>
    </div>
  );
}