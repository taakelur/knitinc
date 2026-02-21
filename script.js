// Service worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(error => console.log('Service Worker registration failed:', error));
    });
}

document.getElementById('stitchCalculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateStitchPattern();
});

function calculateStitchPattern() {
    // Get input values
    const currentStitches = parseInt(document.getElementById('currentStitches').value);
    const totalNeededStitches = document.getElementById('totalNeededStitches').value ? 
        parseInt(document.getElementById('totalNeededStitches').value) : null;
    const increase = document.getElementById('increase').value ? 
        parseInt(document.getElementById('increase').value) : null;
    
    // Validation
    const errorMessage = validateInputs(currentStitches, totalNeededStitches, increase);
    if (errorMessage) {
        alert(errorMessage);
        return;
    }
    
    // Calculate missing value
    let calculatedTotal, calculatedIncrease;
    if (totalNeededStitches === null || totalNeededStitches === "") {
        calculatedIncrease = increase;
        calculatedTotal = currentStitches + calculatedIncrease;
    } else {
        calculatedTotal = totalNeededStitches;
        calculatedIncrease = totalNeededStitches - currentStitches;
    }
    
    // Calculate distribution pattern
    const pattern = distributeIncreases(currentStitches, calculatedIncrease);
    
    // Display results
    displayResults(calculatedTotal, calculatedIncrease, pattern);
}

function validateInputs(current, total, increase) {
    // Check if current stitches is provided
    if (!current || current <= 0) {
        return "Please enter a valid number for current stitches.";
    }
    
    // Check if either total or increase is provided
    if ((total === null || total === "") && (increase === null || increase === "")) {
        return "Please enter either Total Needed Stitches or Increase.";
    }
    
    // Validate that only one of total or increase is provided
    if (total !== null && total !== "" && increase !== null && increase !== "") {
        return "Please enter only one of Total Needed Stitches or Increase, not both.";
    }
    
    // Validate positive numbers
    if (total !== null && total !== "" && total <= 0) {
        return "Total Needed Stitches must be a positive number.";
    }
    
    if (increase !== null && increase !== "" && increase <= 0) {
        return "Increase must be a positive number.";
    }
    
    // Check if increase is not greater than current stitches
    if (increase !== null && increase !== "" && increase > current) {
        return "Increase cannot be greater than current stitches.";
    }
    
    return null;
}

function distributeIncreases(currentStitches, increase) {
    if (increase === 0) {
        return [];
    }
    
    // Calculate base interval and remainder
    const baseInterval = Math.floor(currentStitches / increase);
    const remainder = currentStitches % increase;
    
    // Create pattern array
    const pattern = Array(increase).fill(baseInterval);
    
    // Distribute remainder more evenly across the pattern
    if (remainder > 0) {
        const step = Math.ceil(increase / remainder);
        for (let i = 0; i < remainder; i++) {
            const index = Math.floor(i * step);
            // Make sure we don't go out of bounds
            if (index < pattern.length) {
                pattern[index] += 1;
            }
        }
    }
    
    return pattern;
}

function displayResults(total, increase, pattern) {
    const resultsDiv = document.getElementById('results');
    const calculationResultDiv = document.getElementById('calculationResult');
    const distributionPatternDiv = document.getElementById('distributionPattern');
    
    // Show results section
    resultsDiv.classList.remove('d-none');
    
    // Display calculated values
    calculationResultDiv.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="alert alert-info">
                    <h5>Total Needed Stitches</h5>
                    <p class="mb-0 fs-4">${total}</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="alert alert-success">
                    <h5>Increase Amount</h5>
                    <p class="mb-0 fs-4">${increase}</p>
                </div>
            </div>
        </div>
    `;
    
    // Display distribution pattern
    if (pattern.length === 0) {
        distributionPatternDiv.innerHTML = `
            <div class="pattern-container">
                <h4>Distribution Pattern</h4>
                <p class="fs-5">No increases needed for your pattern.</p>
            </div>
        `;
    } else {
        const patternText = pattern.map((interval, index) => {
            if (index === pattern.length - 1) {
                return `knit ${interval}`;
            } else {
                return `knit ${interval}, increase`;
            }
        }).join(', ');
        
        // Create visual pattern items
        let patternItems = '';
        pattern.forEach((interval, index) => {
            if (index === pattern.length - 1) {
                patternItems += `<span class="pattern-item">Knit ${interval}</span>`;
            } else {
                patternItems += `<span class="pattern-item">Knit ${interval}</span><span class="mx-2">→</span><span class="pattern-item">Inc</span><span class="mx-2">→</span>`;
            }
        });
        
        distributionPatternDiv.innerHTML = `
            <div class="pattern-container">
                <h4>Distribution Pattern</h4>
                <p class="fs-5">${patternText}</p>
                <div class="pattern-list">
                    ${patternItems}
                </div>
                <div class="mt-3">
                    <p class="mb-1"><strong>Numeric Pattern:</strong></p>
                    <p class="mb-0">[${pattern.join(', ')}]</p>
                </div>
            </div>
        `;
    }
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}