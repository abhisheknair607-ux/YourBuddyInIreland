export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white to-sky-50">
      <div className="glass-card rounded-[2rem] px-8 py-6 text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
          Loading
        </p>
      </div>
    </div>
  );
}
