export const lightenColor = (hex: string, percent: number): string => {
  // Parse the hex color into RGB components
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculate new RGB values by increasing brightness
  const newR = Math.min(255, r + percent * 2.55);
  const newG = Math.min(255, g + percent * 2.55);
  const newB = Math.min(255, b + percent * 2.55);

  // Convert the new RGB values back to hexadecimal
  const lighterHex = `#${Math.round(newR).toString(16)}${Math.round(newG).toString(16)}${Math.round(
    newB
  ).toString(16)}`;

  return lighterHex;
};
