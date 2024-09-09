import { CropType, Farmer } from '../types/index';

export const FarmerDataMock: Farmer[] = [
  {
    id: '1',
    cpfCnpj: '12345678900',
    name: 'João Silva',
    farmName: 'Fazenda Boa Vista',
    city: 'Sorriso',
    state: 'MT',
    totalArea: 2000,
    arableArea: 1400,
    vegetationArea: 600,
    crops: [CropType.Soja, CropType.Milho]
  },
  {
    id: '2',
    cpfCnpj: '98765432100000',
    name: 'Maria Oliveira',
    farmName: 'Sítio das Flores',
    city: 'Ribeirão Preto',
    state: 'SP',
    totalArea: 500,
    arableArea: 300,
    vegetationArea: 200,
    crops: [CropType.CanaDeAcucar]
  },
  {
    id: '3',
    cpfCnpj: '11122233344',
    name: 'Carlos Pereira',
    farmName: 'Fazenda Esperança',
    city: 'Uberaba',
    state: 'MG',
    totalArea: 1500,
    arableArea: 900,
    vegetationArea: 600,
    crops: [CropType.Soja, CropType.Milho]
  },
  {
    id: '4',
    cpfCnpj: '55566677788888',
    name: 'Ana Costa',
    farmName: 'Sítio Verde',
    city: 'Londrina',
    state: 'PR',
    totalArea: 800,
    arableArea: 500,
    vegetationArea: 300,
    crops: [CropType.Soja, CropType.Milho]
  },
  {
    id: '5',
    cpfCnpj: '99988877766',
    name: 'Pedro Santos',
    farmName: 'Fazenda Alegre',
    city: 'Cruz Alta',
    state: 'RS',
    totalArea: 1200,
    arableArea: 700,
    vegetationArea: 500,
    crops: [CropType.Soja, CropType.Milho]
  },
  {
    id: '6',
    cpfCnpj: '22233344455555',
    name: 'Lucas Almeida',
    farmName: 'Sítio do Sol',
    city: 'Luís Eduardo Magalhães',
    state: 'BA',
    totalArea: 3000,
    arableArea: 2000,
    vegetationArea: 1000,
    crops: [CropType.Soja, CropType.Algodao]
  },
  {
    id: '7',
    cpfCnpj: '44455566677',
    name: 'Mariana Lima',
    farmName: 'Fazenda Nova',
    city: 'Piracicaba',
    state: 'SP',
    totalArea: 400,
    arableArea: 250,
    vegetationArea: 150,
    crops: [CropType.CanaDeAcucar]
  },
  {
    id: '8',
    cpfCnpj: '66677788899999',
    name: 'Rafael Souza',
    farmName: 'Sítio das Palmeiras',
    city: 'Varginha',
    state: 'MG',
    totalArea: 200,
    arableArea: 120,
    vegetationArea: 80,
    crops: [CropType.Cafe]
  },
  {
    id: '9',
    cpfCnpj: '88899900011',
    name: 'Fernanda Rocha',
    farmName: 'Fazenda Bela Vista',
    city: 'Rio Verde',
    state: 'GO',
    totalArea: 2500,
    arableArea: 1700,
    vegetationArea: 800,
    crops: [CropType.Soja, CropType.Milho]
  },
  {
    id: '10',
    cpfCnpj: '00011122233333',
    name: 'Gustavo Martins',
    farmName: 'Sítio do Pica-Pau',
    city: 'Barreiras',
    state: 'BA',
    totalArea: 2800,
    arableArea: 1800,
    vegetationArea: 1000,
    crops: [CropType.Soja, CropType.Algodao]
  },
  {
    id: '11',
    cpfCnpj: '33344455566',
    name: 'Juliana Mendes',
    farmName: 'Fazenda Santa Maria',
    city: 'Rondonópolis',
    state: 'MT',
    totalArea: 3500,
    arableArea: 2300,
    vegetationArea: 1200,
    crops: [CropType.Soja, CropType.Algodao]
  },
  {
    id: '12',
    cpfCnpj: '55566677788888',
    name: 'Thiago Barbosa',
    farmName: 'Sítio do Vovô',
    city: 'Araçatuba',
    state: 'SP',
    totalArea: 600,
    arableArea: 400,
    vegetationArea: 200,
    crops: [CropType.CanaDeAcucar]
  }
];