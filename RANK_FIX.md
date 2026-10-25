# Rank Dropdown Fix - Full Names

## Issue

The rank dropdown was showing abbreviations (AC, LAC, CPL, etc.) instead of full rank names. The user corrected this to show the proper full names for air cadet ranks.

## Correction

Updated the dropdown to display full rank names:

**Before (Incorrect):**
- AC
- LAC
- CPL
- FCPL
- SGT
- FSGT
- WO2
- WO1

**After (Correct):**
- Air Cadet
- Leading Air Cadet
- Corporal
- Flight Corporal
- Sergeant
- Flight Sergeant
- Warrant Officer 2nd Class
- Warrant Officer 1st Class

## Changes Made

### File: `src/components/Login.tsx`

Updated the rank dropdown options to use full names:

```tsx
<select
  value={rank}
  onChange={(e) => { setRank(e.target.value); setError(''); }}
  className="input-field"
>
  <option value="">Select rank</option>
  <option value="Air Cadet">Air Cadet</option>
  <option value="Leading Air Cadet">Leading Air Cadet</option>
  <option value="Corporal">Corporal</option>
  <option value="Flight Corporal">Flight Corporal</option>
  <option value="Sergeant">Sergeant</option>
  <option value="Flight Sergeant">Flight Sergeant</option>
  <option value="Warrant Officer 2nd Class">Warrant Officer 2nd Class</option>
  <option value="Warrant Officer 1st Class">Warrant Officer 1st Class</option>
</select>
```

## Rank Hierarchy (Air Cadets)

The ranks are listed in proper order from lowest to highest:

1. **Air Cadet** - Entry level cadet
2. **Leading Air Cadet** - Senior air cadet
3. **Corporal** - First NCO rank
4. **Flight Corporal** - Senior corporal
5. **Sergeant** - Senior NCO
6. **Flight Sergeant** - Senior sergeant
7. **Warrant Officer 2nd Class** - Junior warrant officer
8. **Warrant Officer 1st Class** - Senior warrant officer (Chief - only one person can hold this rank)

## Benefits

1. **Professional appearance**: Full rank names look more official
2. **Clarity**: No confusion about what abbreviations mean
3. **Consistency**: Matches official air cadet terminology
4. **User-friendly**: Cadets immediately recognize their rank
5. **Proper hierarchy**: Shows the clear progression path

## Testing

1. Open the app
2. Click "Sign up" or "Sign in"
3. Select "Rank + Name" login method
4. Click the rank dropdown
5. Verify all 8 ranks are listed with full names
6. Select a rank (e.g., "Flight Sergeant")
7. Enter last name and password
8. Complete signup/signin
9. Verify the rank displays correctly in the username (e.g., "Flight Sergeant Smith")

## Notes

- Warrant Officer 1st Class is the Chief position - only one person can hold this rank
- All ranks are displayed in title case for consistency
- The full names are stored in the user data for display purposes
- Abbreviations could be added as secondary text in the future if needed

## Future Enhancements

- Add abbreviations as secondary text: "Sergeant (SGT)"
- Add rank insignia icons next to each rank
- Add tooltips explaining each rank's responsibilities
- Restrict WO1 to a single user (admin only)
- Add rank-based permissions and features
