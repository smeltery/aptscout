'use client';
import { useState } from 'react';
import { Copy } from 'lucide-react';

export function CopyButton({
  text,
  label = 'Copy',
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState('');
  return (
    <button
      className="copy-button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setStatus('Copied');
        } catch {
          setStatus('Unable to copy. Select the text manually.');
        }
      }}
    >
      <Copy size={14} />
      <span aria-live="polite">{status || label}</span>
    </button>
  );
}
