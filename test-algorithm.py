#!/usr/bin/env python3

import math

def distribute_increases(current_stitches, increase):
    if increase == 0:
        return []
    
    # Calculate base interval and remainder
    base_interval = math.floor(current_stitches / increase)
    remainder = current_stitches % increase
    
    # Create pattern array
    pattern = [base_interval] * increase
    
    # Distribute remainder by adding 1 to the first 'remainder' intervals
    for i in range(remainder):
        pattern[i] += 1
    
    return pattern

# Test case 1: From specification (updated expectation)
print("Test Case 1:")
print("Current stitches: 10, Increase: 3")
print("Algorithm pattern:", distribute_increases(10, 3))
print("Pattern interpretation: Knit 4, increase, knit 3, increase, knit 3")

# Test case 2: Zero increase
print("\nTest Case 2:")
print("Current stitches: 10, Increase: 0")
print("Algorithm pattern:", distribute_increases(10, 0))
print("Pattern interpretation: No increases needed")

# Test case 3: Increase equals current stitches
print("\nTest Case 3:")
print("Current stitches: 5, Increase: 5")
print("Algorithm pattern:", distribute_increases(5, 5))
print("Pattern interpretation: Increase after every stitch")

# Test case 4: Larger numbers
print("\nTest Case 4:")
print("Current stitches: 20, Increase: 4")
print("Algorithm pattern:", distribute_increases(20, 4))
print("Pattern interpretation: Knit 5, increase, knit 5, increase, knit 5, increase, knit 5")

# Test case 5: Uneven distribution
print("\nTest Case 5:")
print("Current stitches: 17, Increase: 5")
print("Algorithm pattern:", distribute_increases(17, 5))
print("Pattern interpretation: Knit 4, increase, knit 4, increase, knit 3, increase, knit 3, increase, knit 3")