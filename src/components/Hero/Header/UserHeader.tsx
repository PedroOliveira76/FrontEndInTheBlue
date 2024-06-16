import { useNavigate } from 'react-router-dom';
import img from '/logoITB.png';
import { useState } from 'react';

interface UserNavProps {
    handler: () => void;
    userName: string;
}

const UserHeader = ({ handler, userName }: UserNavProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handlerClick = () => {
        setIsOpen(!isOpen);
    };

    const handlerLogoff = () => {
        navigate('/login');
    };

    return (
        <div className="w-full h-18 max-sm:h-16 bg-cyan-600 p-4 flex flex-row justify-between text-white">
            <div className="flex items-center justify-evenly w-52 h-full font-semibold">
                <img src={img} alt="" className="w-12 h-12 rounded-xl max-sm:h-12 max-sm:w-12" />
                <h1>Olá {userName}</h1>
            </div>

            <div className="w-44 flex items-center justify-center text-center max-sm:w-56">
                <ul className="w-full flex justify-evenly items-center font-semibold">
                    <li className="hover:cursor-pointer hover:text-gray-300" onClick={handler}>
                        Perfil
                    </li>
                    <li className="hover:cursor-pointer hover:text-gray-300" onClick={handlerClick}>
                        Sair
                    </li>
                </ul>
            </div>

            {isOpen && (
                <div className="absolute  font-semibold left-10 w-52 h-24 box-border flex flex-col justify-around items-center  bg-black text-white rounded-2xl">
                    <div className="w-full font-semibold">Deseja realmente sair?</div>
                    <div className="w-full flex items-center justify-around">
                        <button className="bg-green-600 text-white w-20 rounded-xl hover:bg-green-800" onClick={handlerLogoff}>
                            Sim
                        </button>
                        <button className="bg-red-600 text-white w-20 rounded-xl hover:bg-red-800" onClick={handlerClick}>
                            Não
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserHeader;
