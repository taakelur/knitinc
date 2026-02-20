# Knitting Stitch Calculator PWA - Development Plan

## Project Overview
A progressive web app for knitters to calculate stitch increases and distribution patterns. The app will be statically hosted with no backend required.

## Original Specification (`ideas.md`)
```
I want a progressive web app. It needs to be statically hosted, so that it doesn't need any backend. 
It needs 3 input fields:
	1. current_stitches 
	2. total_needed_stitches
	3. increase
Input number 1 is mandatory, the user must input either 2 or 3 and the program will calculate the one of the two the user didn't input, based on input 1 and 2 or 3. 
The formula for this calculation is total_needed_stitches = current_stitches + increase

1 increase is adding 1 stitch. the app should tell the user how many stitches the user should knit between each increase, to make the amount of stitches between each increase as even as possible. It is better to have varying amount of stitches between each increase, but this difference should be as small as possible.
```

## Technology Choices
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **CSS Framework**: Bootstrap (via CDN)
- **Hosting**: GitHub Pages
- **PWA Features**: Basic offline capability with service worker

## Development Tasks

### Phase 1: Core Functionality (High Priority)
1. **Set up project structure**
   - Create `index.html`, `style.css`, `script.js`, `manifest.json`, `service-worker.js`
2. **Add Bootstrap CSS and JS via CDN to `index.html`**
3. **Create HTML form with three input fields**
   - `current_stitches` (mandatory)
   - `total_needed_stitches` (optional)
   - `increase` (optional)
   - Calculate button
4. **Implement input validation**
   - `current_stitches` is mandatory
   - User must provide either `total_needed_stitches` OR `increase`
   - Validate numeric inputs
5. **Implement JavaScript calculation logic**
   - Compute missing value using formula: `total_needed_stitches = current_stitches + increase`
   - Handle both calculation directions
6. **Design algorithm to distribute increases evenly**
   - Input: `current_stitches`, `increase`
   - Output: Spacing pattern list (e.g., for 10 stitches + 3 increases → [3, 3, 4])
   - Algorithm goal: Distribute increases as evenly as possible, minimizing variation in spacing
   - Increases go between stitch groups: "knit 3, increase, knit 3, increase, knit 4, increase"

### Phase 2: UI & Styling (Medium Priority)
7. **Display results**
   - Show calculated missing value (total stitches or increase count)
   - Display spacing pattern list in user-friendly format
8. **Style the UI with Bootstrap responsive layout**
   - Mobile-first responsive design
   - Clear form layout with validation feedback
   - Results section with clear presentation

### Phase 3: PWA Features (Low Priority)
9. **Create web app manifest**
   - Icons, app name, theme colors, display mode
10. **Implement service worker**
    - Cache static assets for offline use
    - Basic caching strategy
11. **Test offline functionality and PWA installability**
    - Verify app works offline
    - Test "Add to Home Screen" functionality

### Phase 4: Deployment (Medium Priority)
12. **Deploy to GitHub Pages**
    - Configure repository for GitHub Pages deployment
    - Set up proper base paths
13. **Verify deployment and PWA capabilities**
    - Test deployed app functionality
    - Verify PWA features work in production

## Algorithm Details

### Calculation Logic
- **Case A**: Given `current_stitches` and `increase` → Calculate `total_needed_stitches`
  - `total = current + increase`
- **Case B**: Given `current_stitches` and `total_needed_stitches` → Calculate `increase`
  - `increase = total - current`

### Even Distribution Algorithm
Goal: Distribute `increase` increases across `current_stitches` stitches as evenly as possible.

Example: current_stitches = 10, increase = 3
- Divide 10 stitches among 3 increase intervals
- Base interval size: floor(10 / 3) = 3
- Remainder: 10 % 3 = 1
- Distribution: [3, 3, 4] (first 1 intervals get +1 stitch)
- Pattern: "Knit 3, increase, knit 3, increase, knit 4, increase"

### Edge Cases
- Zero increase → empty pattern
- Increase > current stitches → handle validation
- Non-integer inputs → round or validate
- Negative numbers → validate

## Success Criteria
- [x] App works offline after first visit
- [x] Can be installed as PWA on mobile/desktop
- [x] All calculations correct
- [x] Even distribution algorithm works for all valid inputs
- [x] Responsive design works on mobile/tablet/desktop
- [x] Deployed and accessible via GitHub Pages

## Next Steps
Begin implementation with Phase 1 tasks, starting with project structure and basic HTML form.