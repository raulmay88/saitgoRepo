export interface Company {
    id: number;
    name: string;
    correo: string;
    phone: string;
    branches: Branch[];
  }
  
  export interface Branch {
    id: number;
    name: string;
    address: string;
  }
  
  const companies: Company[] = [
    { 
      id: 1, 
      name: 'Dell',
      phone: '123123123',
      correo: 'correo@correo.com',
      branches: [
        { id: 1, name: 'Sucursal 1', address: 'Dirección 1' },
        { id: 2, name: 'Sucursal 2', address: 'Dirección 2' },
        { id: 3, name: 'Sucursal 3', address: 'Dirección 3' }
      ] 
    },
    { 
        id: 2, 
        name: 'HP',
        phone: '2313131',
        correo: 'correo2@correo.com',
        branches: [
          { id: 4, name: 'Sucursal 1', address: 'Dirección 4' },
          { id: 5, name: 'Sucursal 2', address: 'Dirección 5' }
        ] 
      },
      { 
        id: 3, 
        name: 'Steren',
        phone: '132311313',
        correo: 'correo3@correo.com',
        branches: [
          { id: 6, name: 'Sucursal 1', address: 'Dirección 6' },
          { id: 7, name: 'Sucursal 2', address: 'Dirección 7' },
          { id: 8, name: 'Sucursal 3', address: 'Dirección 8' },
          { id: 9, name: 'Sucursal 4', address: 'Dirección 9' }
        ] 
      },
  ];
  
  export default companies;
  