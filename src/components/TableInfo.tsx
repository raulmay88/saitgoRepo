import { useParams } from 'react-router-dom';
import companies, { Company } from '../data/companyData';

const CompanyDetail: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();

  const company: Company | undefined = companies.find((c) => String(c.id) === companyId);

  if (!company) {
    return <div>No se encontró la empresa.</div>;
  }

  return (
    <div className='container mx-auto'>
      <div className='overflow-x-auto shadow-xl rounded-2xl m-4'>
        <table className="w-full text-center text-gray-500">
          <thead className="font-bold bg-orange-100 text-xs uppercase text-gray-500 tracking-wider">
            <tr>
              <th className='px-6 py-3'>Nombre</th>
              <th className='px-6 py-3'>Correo</th>
              <th className='px-6 py-3'>Teléfono</th>
              <th className='px-6 py-3'>Sucursales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='px-6 py-3'>{company.name}</td>
              <td className='px-6 py-3'>{company.correo}</td>
              <td className='px-6 py-3'>{company.phone}</td>
              <td className='px-6 py-3'>
                <ul className='flex list-inside px-2'>
                  {company.branches.map((branch) => (
                    <li key={branch.id}>
                      <p className='p-1'><strong>{branch.name}</strong></p>
                      <p className='p-1'>{branch.address}</p>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDetail;
