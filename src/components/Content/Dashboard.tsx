
const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col bg-cyan-950 shadow-xl m-2 sm:w-2/5 rounded-3xl text-center border border-cyan-950">
            <div className="m-2 p-2">
                <h1 className="text-4xl font-bold text-cyan-600 text-center px-5">
                    Bienvenido a Sait
                    <span className="text-white opacity-90">Go</span>
                </h1>
            </div>
            <div className="flex flex-col items-center m-2 p-2">
                <img 
                    src="https://icei-formacion.com/wp-content/uploads/2019/11/3170-scaled.jpg" 
                    alt="Imagen de una calculadora" 
                    className="h-80 w-80 rounded-xl m-4"    
                />
                <p className="text-lg text-white m-4 p-2">Página de inicio</p>
            </div>
        </div>
    );
}

export default Dashboard;
