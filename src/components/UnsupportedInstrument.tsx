import { useStore } from '../store';
import { DEFAULT_INSTRUMENT_ID, instrumentDisplayName } from '../instruments/registry';

/**
 * Shown when the cadet's instrument has no content or requirement program.
 * Progress is kept. The cadet is offered a way back to a supported instrument.
 */
export default function UnsupportedInstrument() {
  const { user, setInstrument } = useStore();
  if (!user) return null;
  const name = instrumentDisplayName(user.instrumentId);
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card max-w-sm w-full text-center">
        <p className="text-lg font-semibold text-[#1a2332] dark:text-white">{name} is not available yet</p>
        <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-2">
          Cadet Music does not have the requirements for this instrument yet. Your saved progress is kept.
        </p>
        <button onClick={() => setInstrument('alto')} className="btn-accent w-full py-3 mt-6">
          Switch to Alto Saxophone
        </button>
      </div>
    </div>
  );
}
