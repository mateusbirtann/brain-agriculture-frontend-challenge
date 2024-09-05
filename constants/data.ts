import { Crops, Farmer, NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Produtores Rurais',
    href: '/dashboard/farmer',
    icon: 'user',
    label: 'user'
  }
];

export const data: Farmer[] = [
  {
    id: '1',
    cpfCnpj: '123.456.789-00',
    name: 'João Silva',
    farmName: 'Fazenda Boa Vista',
    city: 'Ribeirão Preto',
    state: 'SP',
    totalArea: 150,
    arableArea: 100,
    vegetationArea: 50,
    crops: [Crops.Soja, Crops.Milho]
  },
  {
    id: '2',
    cpfCnpj: '987.654.321-00',
    name: 'Maria Oliveira',
    farmName: 'Sítio das Flores',
    city: 'Campinas',
    state: 'SP',
    totalArea: 200,
    arableArea: 150,
    vegetationArea: 50,
    crops: [Crops.Cafe, Crops.Algodao]
  },
  {
    id: '3',
    cpfCnpj: '111.222.333-44',
    name: 'Carlos Pereira',
    farmName: 'Fazenda Esperança',
    city: 'São Paulo',
    state: 'SP',
    totalArea: 300,
    arableArea: 200,
    vegetationArea: 100,
    crops: [Crops.Soja]
  },
  {
    id: '4',
    cpfCnpj: '555.666.777-88',
    name: 'Ana Costa',
    farmName: 'Sítio Verde',
    city: 'Sorocaba',
    state: 'SP',
    totalArea: 250,
    arableArea: 180,
    vegetationArea: 70,
    crops: [Crops.Milho, Crops.Cafe]
  },
  {
    id: '5',
    cpfCnpj: '999.888.777-66',
    name: 'Pedro Santos',
    farmName: 'Fazenda Alegre',
    city: 'Bauru',
    state: 'SP',
    totalArea: 400,
    arableArea: 300,
    vegetationArea: 100,
    crops: [Crops.Algodao]
  },
  {
    id: '6',
    cpfCnpj: '222.333.444-55',
    name: 'Lucas Almeida',
    farmName: 'Sítio do Sol',
    city: 'Jundiaí',
    state: 'SP',
    totalArea: 350,
    arableArea: 250,
    vegetationArea: 100,
    crops: [Crops.Soja, Crops.Cafe]
  },
  {
    id: '7',
    cpfCnpj: '444.555.666-77',
    name: 'Mariana Lima',
    farmName: 'Fazenda Nova',
    city: 'Piracicaba',
    state: 'SP',
    totalArea: 500,
    arableArea: 400,
    vegetationArea: 100,
    crops: [Crops.Milho, Crops.Algodao]
  },
  {
    id: '8',
    cpfCnpj: '666.777.888-99',
    name: 'Rafael Souza',
    farmName: 'Sítio das Palmeiras',
    city: 'São José do Rio Preto',
    state: 'SP',
    totalArea: 600,
    arableArea: 450,
    vegetationArea: 150,
    crops: [Crops.Cafe]
  },
  {
    id: '9',
    cpfCnpj: '888.999.000-11',
    name: 'Fernanda Rocha',
    farmName: 'Fazenda Bela Vista',
    city: 'Araraquara',
    state: 'SP',
    totalArea: 700,
    arableArea: 500,
    vegetationArea: 200,
    crops: [Crops.Soja, Crops.Milho]
  },
  {
    id: '10',
    cpfCnpj: '000.111.222-33',
    name: 'Gustavo Martins',
    farmName: 'Sítio do Pica-Pau',
    city: 'Franca',
    state: 'SP',
    totalArea: 800,
    arableArea: 600,
    vegetationArea: 200,
    crops: [Crops.Algodao, Crops.Cafe]
  },
  {
    id: '11',
    cpfCnpj: '333.444.555-66',
    name: 'Juliana Mendes',
    farmName: 'Fazenda Santa Maria',
    city: 'Limeira',
    state: 'SP',
    totalArea: 900,
    arableArea: 700,
    vegetationArea: 200,
    crops: [Crops.Soja]
  },
  {
    id: '12',
    cpfCnpj: '555.666.777-88',
    name: 'Thiago Barbosa',
    farmName: 'Sítio do Vovô',
    city: 'Marília',
    state: 'SP',
    totalArea: 1000,
    arableArea: 800,
    vegetationArea: 200,
    crops: [Crops.Milho, Crops.Cafe]
  },
  {
    id: '13',
    cpfCnpj: '777.888.999-00',
    name: 'Patrícia Ferreira',
    farmName: 'Fazenda Primavera',
    city: 'Presidente Prudente',
    state: 'SP',
    totalArea: 1100,
    arableArea: 850,
    vegetationArea: 250,
    crops: [Crops.Algodao]
  },
  {
    id: '14',
    cpfCnpj: '999.000.111-22',
    name: 'Ricardo Gomes',
    farmName: 'Sítio do Lago',
    city: 'São Carlos',
    state: 'SP',
    totalArea: 1200,
    arableArea: 900,
    vegetationArea: 300,
    crops: [Crops.Soja, Crops.Cafe]
  },
  {
    id: '15',
    cpfCnpj: '111.222.333-44',
    name: 'Beatriz Silva',
    farmName: 'Fazenda do Vale',
    city: 'Taubaté',
    state: 'SP',
    totalArea: 1300,
    arableArea: 950,
    vegetationArea: 350,
    crops: [Crops.Milho, Crops.Algodao]
  },
  {
    id: '16',
    cpfCnpj: '222.333.444-55',
    name: 'Eduardo Costa',
    farmName: 'Sítio da Serra',
    city: 'Barretos',
    state: 'SP',
    totalArea: 1400,
    arableArea: 1000,
    vegetationArea: 400,
    crops: [Crops.Cafe]
  },
  {
    id: '17',
    cpfCnpj: '333.444.555-66',
    name: 'Camila Souza',
    farmName: 'Fazenda do Sol',
    city: 'Itu',
    state: 'SP',
    totalArea: 1500,
    arableArea: 1100,
    vegetationArea: 400,
    crops: [Crops.Soja, Crops.Milho]
  }
];