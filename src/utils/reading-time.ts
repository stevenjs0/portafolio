const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}