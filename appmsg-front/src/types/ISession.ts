type User = {
  id: string;
  nome: string;
  email: string;
};

interface Session {
  token: string;
  user: User;
}
