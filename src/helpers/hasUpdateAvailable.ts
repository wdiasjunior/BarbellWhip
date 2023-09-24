export function hasUpdateAvailable(installedVersion: string, lastestVersion: string): boolean {
  const installedVersionParts = installedVersion.split('.').map(Number);
  const lastestVersionParts = lastestVersion.split('.').map(Number);

  for(let i = 0; i < lastestVersionParts.length; i++) {
    const installedPart = installedVersionParts[i] || 0;
    const lastestPart = lastestVersionParts[i] || 0;

    if(installedPart < lastestPart) {
      return true;
    }
  }
  return false;
}
