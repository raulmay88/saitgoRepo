import MenuUser from "../../components/User/Perfil/MenuUser";

const Header: React.FC = () => {
  return (
    <div className="flex w-full justify-end items-center p-5 space-x-8 bg-cyan-950">      
        <MenuUser/>
    </div>
  );
}

export default Header;
