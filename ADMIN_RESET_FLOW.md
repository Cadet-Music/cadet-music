# Admin Reset Flow with Password Protection

## Overview

The admin panel now has a secure reset flow that requires password confirmation before wiping all data.

## Flow

### Step 1: Access Admin Panel
- Click corners in order: **Bottom-Right → Top-Right → Top-Left → Bottom-Left**
- Admin panel opens (no password required)
- You can now view all cadet data

### Step 2: Trigger Reset (Inside Admin)
- While in admin panel, click corners again: **Bottom-Right → Top-Right → Top-Left → Bottom-Left**
- Password dialog appears
- Enter admin password: `password`
- Click "Reset Everything" to confirm

### Step 3: Reset Confirmation
- System validates password
- If correct: All data is wiped
  - User accounts
  - Progress and XP
  - Stickers and achievements
  - Song selections
  - Banner customizations
- Returns to login screen
- Must sign up again to use the app

## Security Features

1. **Two-Step Process**
   - First corner sequence: Opens admin (view-only)
   - Second corner sequence: Triggers reset (requires password)

2. **Password Protection**
   - Admin password: `password`
   - Must enter correct password to reset
   - Wrong password shows error message
   - Cannot bypass or skip password

3. **No Visual Feedback**
   - Corner clicks are invisible
   - No indicators or animations
   - Only admins know the sequence

4. **Clear Warnings**
   - Dialog shows what will be deleted
   - Red warning styling
   - Cancel option available

## Testing

### Test 1: Access Admin
1. Click corners: BR → TR → TL → BL
2. **Result:** Admin panel opens
3. Can view cadet data
4. No password required

### Test 2: Trigger Reset
1. While in admin, click corners: BR → TR → TL → BL
2. **Result:** Password dialog appears
3. Enter wrong password: `wrongpass`
4. Click "Reset Everything"
5. **Result:** Error message "Incorrect password"
6. Data is NOT reset

### Test 3: Successful Reset
1. While in admin, click corners: BR → TR → TL → BL
2. Enter correct password: `password`
3. Click "Reset Everything"
4. **Result:** All data wiped, returns to login
5. Must sign up again

### Test 4: Cancel Reset
1. While in admin, click corners: BR → TR → TL → BL
2. Password dialog appears
3. Click "Cancel"
4. **Result:** Dialog closes, admin panel remains
5. No data is reset

## Code Location

**File:** `src/App.tsx`

**Key Constants:**
```typescript
const CORNER_THRESHOLD = 120;
const ADMIN_RESET_PASSWORD = 'password';
```

**Key Functions:**
- `getCorner()` - Detects which corner was clicked
- `handleReset()` - Validates password and performs reset
- `handleCancelReset()` - Closes dialog without resetting

## UI Components

### Password Dialog
- Lock icon (red)
- Title: "Admin Reset"
- Subtitle: "Enter password to confirm"
- Password input field
- Error message (if wrong password)
- Warning box (lists what will be deleted)
- Cancel button
- Reset Everything button (red)

### Warning Box
Shows what will be deleted:
- All user accounts
- All progress and XP
- All stickers and achievements
- All song selections
- All banner customizations

## Security Notes

### Current Implementation
- Password stored in plain text in code
- Suitable for demo/prototype
- NOT suitable for production

### Production Requirements
For production deployment, you should:
1. Store password hash in backend
2. Use bcrypt or similar hashing
3. Implement rate limiting
4. Add audit logging
5. Consider 2FA for admin actions
6. Use environment variables for password

### Example Production Flow
```typescript
// Backend endpoint
POST /api/admin/reset
{
  "password": "hashed_password",
  "adminId": "admin_user_id"
}

// Backend validates
- Check password hash
- Verify admin permissions
- Log the action
- Perform reset
- Return success/failure
```

## User Experience

### Before Reset
- User is logged in
- Has progress, XP, stickers
- Has selected songs
- Has customized banner

### After Reset
- Logged out
- All data gone
- Must sign up again
- Starts from scratch

### Recovery
- No way to recover deleted data
- Must re-create account
- Must re-do all lessons
- Must re-select songs
- Must re-customize banner

## Admin Workflow

### Typical Use Case
1. Instructor wants to reset demo account
2. Opens admin panel (corner sequence)
3. Reviews cadet data
4. Decides to reset
5. Triggers reset (corner sequence again)
6. Enters password
7. Confirms reset
8. All data wiped
9. Cadet must sign up again

### When to Use
- Demo events
- Testing new features
- Resetting demo accounts
- Clearing test data
- Starting fresh

### When NOT to Use
- Production data
- Real cadet accounts
- After important progress
- Without permission

## Troubleshooting

### Issue: Reset dialog doesn't appear
**Solution:** Make sure you're already in admin panel. First corner sequence opens admin, second triggers reset.

### Issue: Password not working
**Solution:** Password is `password` (lowercase, no spaces). Check for typos.

### Issue: Can't access admin
**Solution:** Click corners in exact order: BR → TR → TL → BL. Each click must be within 120px of corner.

### Issue: Reset didn't work
**Solution:** Check browser console for errors. Make sure localStorage is accessible. Try clearing browser data manually.

## Future Enhancements

### Potential Improvements
1. **Customizable password** - Set via environment variable
2. **Reset confirmation email** - Send email before reset
3. **Selective reset** - Reset specific cadets only
4. **Backup before reset** - Export data before wiping
5. **Undo reset** - Restore from backup
6. **Audit log** - Track who reset and when
7. **Time delay** - 10-second countdown before reset
8. **Double confirmation** - Type password twice

### Example: Selective Reset
```typescript
// Reset specific cadet only
function resetCadet(cadetId: string, password: string) {
  if (password !== ADMIN_RESET_PASSWORD) {
    throw new Error('Invalid password');
  }
  // Delete only this cadet's data
  deleteCadetData(cadetId);
}
```

### Example: Backup Before Reset
```typescript
// Export data before reset
function resetWithBackup(password: string) {
  if (password !== ADMIN_RESET_PASSWORD) {
    throw new Error('Invalid password');
  }
  // Export current data
  const backup = exportAllData();
  downloadJSON(backup, 'backup.json');
  // Then reset
  resetAll();
}
```

## Summary

The admin reset flow is now secure with password protection:
- ✅ Two-step process (admin access + reset trigger)
- ✅ Password required (`password`)
- ✅ Clear warnings about what will be deleted
- ✅ Cancel option available
- ✅ No visual feedback (secret)
- ✅ Returns to login after reset
- ✅ Must sign up again

This prevents accidental resets and ensures only authorized admins can wipe data.
