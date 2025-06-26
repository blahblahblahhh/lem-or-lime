# Display Setup Instructions

## New Video Display Functionality

The app now supports a separate display route for playing videos full screen when users press the lemon or lime buttons.

### Routes:
- `/` - Main voting interface with lemon/lime buttons
- `/lemon` - Lemon voting screen (existing)
- `/lime` - Lime voting screen (existing)  
- `/display` - New full-screen video display route

### How it works:

1. **Kiosk / selection interface** (`/`): When users click Team Lem or Team Lime buttons, it:
   - Triggers a video on the `/display` route
   - Navigates to the respective `/lemon` or `/lime` voting screen

2. **Display Route** (`/display`): 
   - Loops `intro.mp4` continuously by default
   - Plays `lemon.mp4` or `lime.mp4` full screen when triggered
   - Returns to looping `intro.mp4` when lemon/lime videos end
   - Automatically resets voting screens back to main interface

3. **Video Flow**:
   - Display loops intro.mp4 → User clicks button → Lemon/lime video plays → Returns to intro.mp4 loop → All screens reset to home

### Setup:

**Development Mode:**
1. Install dependencies: `npm install`
2. Start both servers: `npm run dev` 
3. Open main interface: `http://localhost:5173`
4. Open display on separate device/screen: `http://localhost:5173/display`

**Production Mode:**
1. Install dependencies: `npm install`
2. Build and start: `npm start` (runs on port 3001)
3. Open main interface: `http://localhost:3001`
4. Open display on separate device/screen: `http://localhost:3001/display`

### Video Files:
- `intro.mp4` - Loops continuously on the display when no selection is active
- `lemon.mp4` - Plays when Team Lem is selected
- `lime.mp4` - Plays when Team Lime is selected