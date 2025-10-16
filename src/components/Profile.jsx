import React from 'react';

export default function Profile({
  id = 1,
  name = 'Your Name',
  age = 30,
  picture = 'https://via.placeholder.com/120',
  bio = 'This is a short bio. Replace with up to 140 characters describing yourself concisely.'
}) {
  const max = 140;
  const truncated = bio.length > max ? bio.slice(0, max - 3) + '...' : bio;

  const styles = {
    container: {
      width: 300,
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
    meta: { marginTop: 8, fontSize: 12, color: '#999' }
  };

  return (
    <div style={styles.container}>
      <img src={picture} alt={`${name} avatar`} style={styles.img} />
      <h3 style={styles.name}>{name}</h3>
      <div style={styles.age}>Age: {age}</div>
      <div style={styles.bio} title={bio}>{truncated}</div>
      <div style={styles.meta}>{bio.length}/{max} chars</div>
    </div>
  );
}