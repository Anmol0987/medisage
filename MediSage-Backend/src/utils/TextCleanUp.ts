
function cleanExtractedText(text: string): string {
  return text
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/[_~*|#^]/g, "")
    .trim();
}

export default cleanExtractedText