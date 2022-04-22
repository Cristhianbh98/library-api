// Trim if the value is a string; otherwise returns false

export function trimString (value: any) {
  return typeof value !== 'string' ? value : value.trim()
}

export default { trimString }
