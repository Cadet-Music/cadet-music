# Corner Click Fix - Using Ref Instead of State

## Problem

The 4 corner clicks weren't working to open the admin panel. Users could click the corners but nothing would happen.

## Root Cause

The `SecretCornerListener` component was using React state (`useState`) to track the click sequence:

```typescript
const [sequence, setSequence] = useState<number[]>([]);
```

This caused a critical issue:

1. Every time `setSequence()` was called, React would re-render the component
2. The `useEffect` hook had `sequence` in its dependency array
3. This caused the event listener to be **removed and re-registered** on every click
4. The timing between removing the old listener and adding the new one could cause clicks to be missed
5. The sequence would get reset or corrupted

## Solution

Replace the state-based sequence tracking with a **ref-based approach**:

```typescript
const sequenceRef = useRef<number[]>([]);
```

### Why This Works

1. **Refs don't cause re-renders** - The component stays stable
2. **Event listener stays registered** - No removal/re-registration cycle
3. **Sequence persists correctly** - `sequenceRef.current` maintains its value
4. **No timing issues** - Clicks are processed immediately

### Code Changes

**Before (Broken):**
```typescript
const [sequence, setSequence] = useState<number[]>([]);

useEffect(() => {
  const handleClick = (e: MouseEvent) => {
    // ... uses sequence and setSequence
  };
  
  window.addEventListener('click', handleClick);
  return () => window.removeEventListener('click', handleClick);
}, [sequence, getCorner, unlockAdmin, adminUnlocked]);
// ↑ sequence in dependencies causes constant re-registration
```

**After (Fixed):**
```typescript
const sequenceRef = useRef<number[]>([]);

useEffect(() => {
  const handleClick = (e: MouseEvent) => {
    // ... uses sequenceRef.current
  };
  
  window.addEventListener('click', handleClick);
  return () => window.removeEventListener('click', handleClick);
}, [getCorner, unlockAdmin, adminUnlocked]);
// ↑ sequence NOT in dependencies, listener stays stable
```

## Testing

### Test the Fix

1. **Open the app**
2. **Click the corners in order:**
   - Bottom-Right
   - Top-Right
   - Top-Left
   - Bottom-Left
3. **Expected result:** Admin panel opens immediately

### Verify It Works

- Clicks should be responsive (no delay)
- Sequence should track correctly
- Admin panel should open on 4th click
- No console errors

## Technical Details

### When to Use State vs Ref

**Use State when:**
- You need the UI to update based on the value
- You need to trigger re-renders
- The value affects what's displayed

**Use Ref when:**
- You need to persist a value across renders
- You don't need the UI to update
- You're tracking something for event handlers
- You want to avoid re-renders for performance

### In This Case

The sequence is only used internally by the event handler. It doesn't affect the UI at all. Therefore, a ref is the correct choice.

## Files Modified

- `src/App.tsx`
  - Added `useRef` import
  - Changed `sequence` state to `sequenceRef` ref
  - Updated all `sequence` references to `sequenceRef.current`
  - Removed `sequence` from useEffect dependencies

## Performance Impact

**Before:**
- 4 clicks = 4 re-renders
- 4 event listener removals
- 4 event listener additions
- Potential for missed clicks

**After:**
- 4 clicks = 0 re-renders
- 1 event listener (stays registered)
- No missed clicks
- Better performance

## Related React Concepts

### Closure Problem

When using state in event handlers, you can run into "stale closure" issues where the handler captures an old version of the state. Using refs avoids this because refs are mutable and always point to the current value.

### Dependency Arrays

The dependency array in `useEffect` determines when the effect re-runs. By removing `sequence` from the dependencies, we prevent the effect from re-running on every click, which keeps the event listener stable.

### Event Listener Cleanup

The cleanup function (`return () => window.removeEventListener(...)`) is important to prevent memory leaks. With the ref approach, this cleanup only happens when the component unmounts or when `getCorner`, `unlockAdmin`, or `adminUnlocked` changes - not on every click.

## Summary

The fix was simple but important:
- Changed from `useState` to `useRef` for sequence tracking
- Removed `sequence` from useEffect dependencies
- Event listener now stays stable across clicks
- Corner clicks work reliably

This is a common React pattern for handling event sequences that don't need to trigger UI updates.
