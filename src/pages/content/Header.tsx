import Search from "../../components/Content/Search";
import SidebarUser from "../../components/User/SidebarUser";

export default function Header() {

  return (
    <div className="flex w-full justify-end items-center p-5 space-x-8 bg-cyan-950">       
        <Search/>
        <SidebarUser/>
    </div>
  );
}
