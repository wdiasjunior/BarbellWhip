export function updateChecker(installedVersion: string, lastestVersion: string): boolean {
  if(!installedVersion || !lastestVersion) {
    return false;
  }

  const installedVersionParts = installedVersion.split(".").map(Number);
  const lastestVersionParts = lastestVersion.split(".").map(Number);

  for(let i = 0; i < lastestVersionParts.length; i++) {
    const installedVersionPart = installedVersionParts[i] || 0;
    const lastestVersionPart = lastestVersionParts[i] || 0;

    if(installedVersionPart < lastestVersionPart) {
      return true;
    }
  }
  return false;
}
