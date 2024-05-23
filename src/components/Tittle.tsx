import { BookmarkSquareIcon } from "@heroicons/react/24/solid";

interface TitleProps {
  texto: string;
}

const Tittle: React.FC<TitleProps> = ({ texto }) => {
  return (
    <div className="flex items-center text-cyan-800">
      <BookmarkSquareIcon className="h-7 w-7 mr-3" aria-hidden="true" />
      <h1 className="text-2xl font-medium rounded-xl">{texto}</h1>
    </div>
  );
};

export default Tittle;
