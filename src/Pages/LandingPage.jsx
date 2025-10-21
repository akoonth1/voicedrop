import React, { useState } from 'react';

export default function LandingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const styles = {
    container: { maxWidth: 480, margin: '40px auto', padding: 20, border: '1px solid #951d1dff', borderRadius: 8, background: '#752e2eff' },
    input: { width: '100%', padding: '8px 10px', marginTop: 8, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc' },
    label: { fontSize: 14, fontWeight: 600 },
    btn: { padding: '10px 14px', borderRadius: 6, border: 'none', background: '#007bff', color: '#0f0d0dff', cursor: 'pointer' },
    hint: { fontSize: 12, color: '#666' },
    msg: { marginTop: 12 }
  };

  const validate = () => {
    if (!name.trim() || !email.trim() || !password) {
      setError('Name, email and password are required.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        profilePicture: profilePicture?.trim() || null,
        // messages and createdAt typically set by server; include minimal data
      };

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Signup failed (${res.status})`);
      }

      const data = await res.json();
      setSuccess('Account created successfully.');
      setName('');
      setEmail('');
      setPassword('');
      setProfilePicture('');
      console.debug('Signup response:', data);
    } catch (err) {
      setError(err?.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit} aria-label="Signup form">
        <label style={styles.label}>
          Name
          <input style={styles.input} value={name} onChange={e => setName(e.target.value)} required />
        </label>

        <label style={styles.label}>
          Email
          <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>

        <label style={styles.label}>
          Password
          <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <div style={styles.hint}>Minimum 6 characters</div>
        </label>

        <label style={styles.label}>
          Profile picture (URL, optional)
          <input style={styles.input} value={profilePicture} onChange={e => setProfilePicture(e.target.value)} placeholder="https://..." />
        </label>

        <div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </div>
      </form>

      <div style={styles.msg}>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
      </div>
    </div>
  );
}