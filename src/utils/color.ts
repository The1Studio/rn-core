export function generateColor(text: string) {
  const newText = text || 'aicactus';

  let hash = 0;
  for (let i = 0; i < newText.length; i++) {
    hash = newText.charCodeAt(i) + ((hash << 5) - hash);
  }

  const red = Math.floor(((Math.sin(hash) + 1) / 2) * 256);
  const green = Math.floor(((Math.sin(hash + 2) + 1) / 2) * 256);
  const blue = Math.floor(((Math.sin(hash + 4) + 1) / 2) * 256);

  return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}
