// 1. Primeiro, definimos o formato de um Paciente
export interface Paciente {
  cpf: string;
  nomeCompleto: string;
  dataNascimento: string; // Datas vêm como string do JSON
  pacienteTelefone: string;
  familiaId: string;
  createdAt: string;
  updatedAt: string;
}

// 2. Agora, definimos o formato da Família
export interface Family {
  id: string;
  sobrenome: string;
  endereco: string;
  contatoTelefone: string;
  createdAt: string;
  updatedAt: string;
  pacientes: Paciente[]; // É um array de Pacientes
}

// 3. (BÔNUS) Definimos a resposta da API paginada
// Isso será SUPER útil no seu hook!
export interface PaginatedFamiliesResponse {
  data: Family[];
  total: number;
  page: number;
  totalPages: number;
}

export interface PacienteInfo {
  id: string;
  dataRegistro: string;
  pesoKg: number | null;
  pressaoArterial: string | null;
  glicemiaMgDl: number | null;
  alturaM: number | null;
  pacienteCpf: string;
  createdAt: string;
  updatedAt: string;
}