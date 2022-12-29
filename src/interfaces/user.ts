export interface User {
  id_user: number;
  first_name: string;
  last_name: string;
  email: string;
  id_role: number;
  uuid: string;
  role: Role;
}

interface Role {
  id_role: number;
  role: string;
}
