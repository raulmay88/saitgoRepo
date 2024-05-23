import DetailRoles from "../../../components/Personal/Roles/DetailRoles";
import Tittle from "../../../components/Tittle";

const Detail: React.FC = () => {

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline space-x-10 m-5">
        <Tittle texto="Detalle rol" />
      </div>
      <div>
        <DetailRoles />
      </div>
    </div>
  );
};

export default Detail;
