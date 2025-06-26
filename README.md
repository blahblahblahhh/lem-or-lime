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

1. Install dependencies: `npm install`
2. Start both servers: `npm run dev` 
3. Open main interface: `http://localhost:5173`
4. Open display on separate device/screen: `http://localhost:5173/display`
5. Your console will show your local and network accessible links. it will look like this:

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.0.204:5173/

Going to http://192.168.0.204:5173/display on another device will pull up the display wall