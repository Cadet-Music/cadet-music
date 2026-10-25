# Rank Dropdown Implementation

## Overview

Changed the rank input field from a free-text input to a dropdown select menu with predefined cadet ranks.

## Changes Made

### 1. Updated Login Component (`src/components/Login.tsx`)

**Before:**
```tsx
<input
  type="text"
  value={rank}
  onChange={(e) => { setRank(e.target.value); setError(''); }}
  placeholder="Cpl"
  className="input-field"
/>
```

**After:**
```tsx
<select
  value={rank}
  onChange={(e) => { setRank(e.target.value); setError(''); }}
  className="input-field"
>
  <option value="">Select rank</option>
  <option value="AC">AC</option>
  <option value="LAC">LAC</option>
  <option value="CPL">CPL</option>
  <option value="FCPL">FCPL</option>
  <option value="SGT">SGT</option>
  <option value="FSGT">FSGT</option>
  <option value="WO2">WO2</option>
  <option value="WO1">WO1</option>
</select>
```

### 2. Updated Validation Logic

**Before:**
```tsx
if (rank.trim().length < 1) {
  setError('Please enter your rank');
  return;
}
```

**After:**
```tsx
if (!rank) {
  setError('Please select your rank');
  return;
}
```

### 3. Updated Identifier Creation

Removed `.trim()` calls on rank since dropdown values are already clean:

**Before:**
```tsx
const identifier = `${rank.trim()}.${lastName.trim()}`.toLowerCase();
const displayName = `${rank.trim()} ${lastName.trim()}`;
```

**After:**
```tsx
const identifier = `${rank}.${lastName.trim()}`.toLowerCase();
const displayName = `${rank} ${lastName.trim()}`;
```

## Rank Hierarchy

The ranks are listed in order from lowest to highest:

1. **AC** - Acting Corporal
2. **LAC** - Lance Corporal
3. **CPL** - Corporal
4. **FCPL** - Flight Corporal
5. **SGT** - Sergeant
6. **FSGT** - Flight Sergeant
7. **WO2** - Warrant Officer 2
8. **WO1** - Warrant Officer 1 (Chief - only one person can hold this rank)

## Benefits

1. **Consistency**: All ranks are properly capitalized and formatted
2. **No typos**: Users can't misspell their rank
3. **Validation**: Easier to validate - just check if a value is selected
4. **User-friendly**: Dropdown is clearer than free-text input
5. **Data integrity**: Ensures only valid ranks are stored

## Testing

1. Open the app
2. Click "Sign up" or "Sign in"
3. Select "Rank + Name" login method
4. Click the rank dropdown
5. Verify all 8 ranks are listed
6. Select a rank
7. Enter last name and password
8. Complete signup/signin
9. Verify the rank displays correctly in the username

## Future Enhancements

- Add rank descriptions/tooltips
- Add rank insignia icons
- Restrict WO1 to a single user (admin only)
- Add rank-based permissions
- Show rank progression path
