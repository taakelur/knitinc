// Test the distribution algorithm with example cases
function distributeIncreases(currentStitches, increase) {
    if (increase === 0) {
        return [];
    }
    
    // Calculate base interval and remainder
    const baseInterval = Math.floor(currentStitches / increase);
    const remainder = currentStitches % increase;
    
    // Create pattern array
    const pattern = Array(increase).fill(baseInterval);
    
    // Distribute remainder by adding 1 to the first 'remainder' intervals
    for (let i = 0; i < remainder; i++) {
        pattern[i] += 1;
    }
    
    return pattern;
}

// Test case 1: From specification
console.log("Test Case 1:");
console.log("Current stitches: 10, Increase: 3");
console.log("Expected pattern: [3, 3, 4]");
console.log("Actual pattern:", distributeIncreases(10, 3));

// Test case 2: Zero increase
console.log("\nTest Case 2:");
console.log("Current stitches: 10, Increase: 0");
console.log("Expected pattern: []");
console.log("Actual pattern:", distributeIncreases(10, 0));

// Test case 3: Increase equals current stitches
console.log("\nTest Case 3:");
console.log("Current stitches: 5, Increase: 5");
console.log("Expected pattern: [1, 1, 1, 1, 1]");
console.log("Actual pattern:", distributeIncreases(5, 5));

// Test case 4: Larger numbers
console.log("\nTest Case 4:");
console.log("Current stitches: 20, Increase: 4");
console.log("Expected pattern: [5, 5, 5, 5]");
console.log("Actual pattern:", distributeIncreases(20, 4));

// Test case 5: Uneven distribution
console.log("\nTest Case 5:");
console.log("Current stitches: 17, Increase: 5");
console.log("Expected pattern: [4, 4, 3, 3, 3]");
console.log("Actual pattern:", distributeIncreases(17, 5));