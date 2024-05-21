export default function ProfileUser(){
    const userEmail = localStorage.getItem('username');
    const userCompany = localStorage.getItem('selectedCompany');
    const userBranch = localStorage.getItem('selectedBranch');

    return (
            <div className="flex bg-white rounded-3xl h-auto mt-1 px-5 py-2 justify-center cursor-pointer uppercase outline-none duration-500 ring-1 ring-orange-300 hover:ring-orange-500">
                <div className="flex items-center font-bold">
                {userEmail && (
                    <p className="text-xs p-2">{userCompany}</p>
                )}
                {userEmail && (
                    <p className="text-xs p-2">{userBranch}</p>
                )}
                </div>
            </div>
    )
}