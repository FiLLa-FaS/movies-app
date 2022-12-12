export default function cutString(str, length) {
  if (str.length <= length) return str
  const currentSym = str.lastIndexOf(' ', length)
  const currentString = str.slice(0, currentSym)
  return `${currentString}...`
}
