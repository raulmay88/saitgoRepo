
export default function Search() {
    return (
        <div className="flex flex-1 justify-end">
            <input
                type="search"
                className=" w-1/5 h-10 px-4 py-1 bg-white border border-cyan-950 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-950 hover:border-cyan-800 focus:border-transparent"
                placeholder="Buscar"
            />
        </div>
    );
}
