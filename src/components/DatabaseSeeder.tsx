import { useState } from 'react';
import { seedFeaturedProjects } from '../utils/seedDatabase';

interface DatabaseSeederProps {
  onSeedComplete?: () => void;
}

export default function DatabaseSeeder({ onSeedComplete }: DatabaseSeederProps) {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSeed = async () => {
    setIsSeeding(true);
    setSeedStatus('idle');
    setErrorMessage('');

    try {
      await seedFeaturedProjects();
      setSeedStatus('success');
      onSeedComplete?.();
    } catch (error) {
      setSeedStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsSeeding(false);
    }
  };

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      maxWidth: '300px'
    }}>
      <div style={{ marginBottom: '8px' }}>
        <strong>Dev Tools - Database Seeder</strong>
      </div>
      
      <button
        onClick={handleSeed}
        disabled={isSeeding}
        style={{
          background: isSeeding ? '#666' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: isSeeding ? 'not-allowed' : 'pointer',
          fontSize: '11px',
          marginBottom: '8px'
        }}
      >
        {isSeeding ? 'Seeding...' : 'Seed Featured Projects'}
      </button>

      {seedStatus === 'success' && (
        <div style={{ color: '#28a745', fontSize: '11px' }}>
          ✅ Database seeded successfully!
        </div>
      )}

      {seedStatus === 'error' && (
        <div style={{ color: '#dc3545', fontSize: '11px' }}>
          ❌ Error: {errorMessage}
        </div>
      )}

      <div style={{ fontSize: '10px', marginTop: '8px', opacity: 0.7 }}>
        This tool only appears in development mode
      </div>
    </div>
  );
}
