# Knitting Stitch Calculator PWA

A progressive web app for knitters to calculate stitch increases and distribution patterns.

## Features

- Calculate missing values using the formula: `total_needed_stitches = current_stitches + increase`
- Evenly distribute increases across your knitting pattern
- Works offline after first visit
- Installable as a PWA on mobile and desktop
- Responsive design that works on all devices

## How to Use

1. Enter your current stitch count
2. Enter either your total needed stitches OR increase amount
3. Click "Calculate Stitch Pattern"
4. View the calculated missing value and distribution pattern

## Technical Details

### Calculation Logic
- **Case A**: Given `current_stitches` and `increase` → Calculate `total_needed_stitches`
  - `total = current + increase`
- **Case B**: Given `current_stitches` and `total_needed_stitches` → Calculate `increase`
  - `increase = total - current`

### Even Distribution Algorithm
The algorithm distributes increases as evenly as possible across stitches:
1. Calculate base interval: `floor(current_stitches / increase)`
2. Calculate remainder: `current_stitches % increase`
3. Create pattern array filled with base intervals
4. Add 1 to the first `remainder` intervals

### Example
Current stitches: 10, Increase: 3
- Base interval: floor(10/3) = 3
- Remainder: 10%3 = 1
- Pattern: [4, 3, 3] (first interval gets +1)
- Instructions: "Knit 4, increase, knit 3, increase, knit 3"

## Files

- `index.html` - Main application interface
- `style.css` - Custom styling
- `script.js` - Application logic
- `manifest.json` - PWA configuration
- `service-worker.js` - Offline functionality

## Deployment

Simply host all files on a static hosting service like GitHub Pages.