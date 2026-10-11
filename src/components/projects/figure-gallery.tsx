"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { Figure } from "@/data/types";

/**
 * Real notebook figures: a thumbnail grid that opens a native <dialog>
 * lightbox. Escape closes (native), arrow keys page, and focus returns to the
 * thumbnail that opened it.
 */
export function FigureGallery({ figures }: { figures: Figure[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? undefined : figures[index];

  function open(i: number) {
    setIndex(i);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function step(delta: number) {
    setIndex((i) => (i === null ? i : (i + delta + figures.length) % figures.length));
  }

  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {figures.map((figure, i) => (
          <li key={figure.src}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-raised transition-colors hover:border-line-strong"
            >
              <span className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
                <Image
                  src={figure.src}
                  width={figure.width}
                  height={figure.height}
                  alt={figure.alt}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-full border border-line bg-canvas/85 px-2 py-0.5 text-[11px] text-ink-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-3" aria-hidden />
                  Enlarge
                </span>
              </span>
              <span className="block px-4 py-3 text-[13px] leading-snug text-ink-2">{figure.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? current.caption : "Figure"}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        onClick={onBackdropClick}
        className="lightbox m-auto max-h-[94dvh] w-[min(94vw,1400px)] max-w-none overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-ink shadow-raised"
      >
        {current && index !== null && (
          <div className="flex max-h-[94dvh] flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <p className="min-w-0 text-sm text-ink-2">
                <span className="mr-2 font-mono text-xs text-faint">
                  {index + 1} / {figures.length}
                </span>
                {current.caption}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-fill-2 hover:text-ink"
              >
                <X className="size-4" aria-hidden />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto bg-surface-2 p-3 sm:p-5">
              <Image
                key={current.src}
                src={current.src}
                width={current.width}
                height={current.height}
                alt={current.alt}
                sizes="94vw"
                className="mx-auto h-auto max-h-[72dvh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
              <a
                href={current.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-ink"
              >
                Open the original in the repository
                <ArrowUpRight className="size-3" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {figures.length > 1 && (
                <span className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3 text-xs text-ink-2 transition-colors hover:border-line-hover hover:text-ink"
                  >
                    <ArrowLeft className="size-3.5" aria-hidden />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3 text-xs text-ink-2 transition-colors hover:border-line-hover hover:text-ink"
                  >
                    Next
                    <ArrowRight className="size-3.5" aria-hidden />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
