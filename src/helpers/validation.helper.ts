// Trim if the value is a string; otherwise returns false

export function trimString (value: any) {
  return typeof value !== 'string' ? value : value.trim()
}

const validationHelper = {
  trimString
}

export default validationHelper
