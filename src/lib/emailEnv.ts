export function cleanEmailEnv(value: string | undefined) {
  if (!value) return undefined;

  const trimmed = value.trim();
  const quote = trimmed[0];

  if (
    (quote === '"' || quote === "'") &&
    trimmed.length > 1 &&
    trimmed.at(-1) === quote
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}
