/** Atmosphere at the top of every page: a masked grid and two restrained glows. */
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1000px] overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-[820px] bg-grid mask-fade-top" />
      <div className="absolute -top-64 left-1/2 h-[560px] w-[900px] -translate-x-[62%] rounded-full bg-[radial-gradient(closest-side,var(--glow-cyan),transparent)]" />
      <div className="absolute -top-44 left-1/2 h-[460px] w-[680px] translate-x-[6%] rounded-full bg-[radial-gradient(closest-side,var(--glow-violet),transparent)]" />
    </div>
  );
}
