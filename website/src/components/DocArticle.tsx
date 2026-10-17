'use client';
import { useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';

export function DocArticle({ html }: { html: string }) {
  const article = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [diagram, setDiagram] = useState('');
  const [scale, setScale] = useState(1);
  return (
    <>
      <article
        ref={article}
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={async (event) => {
          const button = (event.target as HTMLElement).closest('button');
          if (!button) return;
          if (button.dataset.diagram) {
            setDiagram(button.dataset.diagram);
            setScale(1);
            dialog.current?.showModal();
          } else if (button.dataset.copy !== undefined) {
            const text = button
              .closest('.docs-code')
              ?.querySelector('code')?.textContent;
            if (!text) return;
            try {
              await navigator.clipboard.writeText(text);
              button.textContent = 'Copied';
            } catch {
              button.textContent = 'Select code to copy';
            }
          }
        }}
      />
      <dialog
        ref={dialog}
        className="diagram-dialog"
        aria-labelledby="diagram-title"
        onClose={() =>
          article.current
            ?.querySelector<HTMLButtonElement>(
              `button[data-diagram="${diagram}"]`,
            )
            ?.focus()
        }
      >
        <div className="overlay-heading">
          <h2 id="diagram-title">Workflow diagram</h2>
          <button
            className="close-overlay"
            onClick={() => dialog.current?.close()}
            aria-label="Close diagram"
          >
            <X />
          </button>
        </div>
        <div className="diagram-controls">
          <button
            aria-label="Zoom out"
            onClick={() => setScale((value) => Math.max(0.5, value - 0.25))}
          >
            <ZoomOut />
          </button>
          <output>{Math.round(scale * 100)}%</output>
          <button
            aria-label="Zoom in"
            onClick={() => setScale((value) => Math.min(3, value + 0.25))}
          >
            <ZoomIn />
          </button>
          <button onClick={() => setScale(1)}>Reset</button>
        </div>
        <div className="diagram-expanded">
          {diagram && (
            <Image
              unoptimized
              src={diagram}
              alt="Expanded workflow diagram"
              width={1200}
              height={500}
              style={{
                width: `${scale * 100}%`,
                maxWidth: 'none',
                height: 'auto',
              }}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
