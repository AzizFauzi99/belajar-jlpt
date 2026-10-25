'use client';

export default function SpeakButton({ text, label = '🔊' }: { text: string; label?: string }) {
  function speak() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }
  return (
    <button type="button" onClick={speak} className="rounded-lg border border-stone-300 px-2 py-1 text-sm dark:border-stone-700">
      {label}
    </button>
  );
}
