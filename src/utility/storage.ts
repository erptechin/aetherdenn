export function darkenColor(hex: any, percent: any) {
  // Remove the '#' character from the beginning of the hex string
  hex = hex.replace(/^#/, '');

  // Parse the hex string as an integer
  const num = parseInt(hex, 16);

  // Calculate the amount to darken the color
  const amt = Math.round(2.55 * percent);

  // Calculate the new red, green, and blue components
  const r = (num >> 16) - amt;
  const g = ((num >> 8) & 0x00ff) - amt;
  const b = (num & 0x0000ff) - amt;

  // Ensure the values are within the valid range (0-255)
  const newR = Math.min(255, Math.max(0, r));
  const newG = Math.min(255, Math.max(0, g));
  const newB = Math.min(255, Math.max(0, b));

  // Convert the new values back to a hex string and pad with zeros if needed
  const darkenedHex =
    '#' +
    [newR, newG, newB]
      .map((value:any) => {
        const hexValue = value.toString(16);
        return hexValue.length === 1 ? '0' + hexValue : hexValue;
      })
      .join('');

  return darkenedHex;
}