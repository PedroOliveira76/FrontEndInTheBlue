import FormCadastro from "../components/Home/FormCadastro.tsx"
import FormLogin from "../components/Home/FormLogin.tsx"
import { useLocation } from "react-router-dom"
import img from '/teste002.jpg'
const Home = () => {
    const location = useLocation();
    return (
        <div className="w-full h-svh flex flex-col items-center justify-evenly">

            <div className="w-96 h-20 flex items-center justify-center bg-cyan-600 rounded-xl max-sm:w-72">
                <h1 className="text-white font-semibold text-2xl">Entre já e fique no Azul</h1>
            </div>

            <div className="flex items-center justify-around w-full ">

                <div className="wrapperFrom w-96 h-[410px] bg-cyan-600 
                text-white rounded-xl flex justify-center items-center max-sm:w-72 max-sm:h-[400px]">
                    {location.pathname === '/' ? (
                        <FormCadastro />
                    ) : (
                        <FormLogin />
                    )}
                </div>

            </div>

            <div className="absolute -z-10 w-full h-full flex items-center justify-center ">
                <img src={img} alt="backgroundimg" className="w-full h-full" />
            </div>

        </div>
    )
}

export default Home