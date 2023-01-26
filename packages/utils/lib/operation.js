// Remove leading and trailing spaces
export function trimSpace(s) {
  return s.toString().trimStart().trimEnd()
}

// Remove duplicates from array
export function arrayUnique(arr) {
  return Array.from(new Set(arr))
}

// Generate a contiguous array of numbers
export function arrayIntRange(max) {
  return Array.from(Array(max), (i, index) => index + 1)
}
