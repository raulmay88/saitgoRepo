import Login from '../../components/Login/Index';
import LoginImage from '../../../public/Login2.jpg';

export default function LoginMain() {
  return (
    <div className="relative flex h-screen">
      <div className="absolute inset-0 bg-cover bg-center xl:hidden opacity-80" style={{ backgroundImage: `url(${LoginImage})` }}></div>

      <div className="hidden xl:flex xl:w-1/2 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${LoginImage})` }}></div>

      <div className="flex justify-center items-center w-full xl:w-1/2 z-10">
        <Login />
      </div>
    </div>
  );
}
