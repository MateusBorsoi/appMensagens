export function gerarChatId(userId1: string, userId2: string): string {
  const ids = [userId1, userId2].sort();
  return ids.join("_");
}
