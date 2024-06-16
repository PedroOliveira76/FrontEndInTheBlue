import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserProps {
    id: number;
    email: string;
    password: string;
}

const FormLogin = () => {
    const navigate = useNavigate();
    const [verifyUser, setVerifyUser] = useState<UserProps>({
        id: 0,
        email: "",
        password: "",
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setVerifyUser({
            ...verifyUser,
            [name]: value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (verifyUser.password.length < 5) {
                alert("A senha deve conter 5 caracteres ou mais");
                return;
            }

            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(verifyUser),
            });

            if (!response.ok) {
                throw new Error(`Erro ao fazer login: ${response.statusText}`);
            }

            const data: UserProps = await response.json();
            
            navigate(`/hero/${data.id}`);

            setVerifyUser({
                id: 0,
                email: "",
                password: "",
            });
        } catch (error) {
            alert("Erro ao fazer login");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-72 h-full max-w-sm text-start font-semibold justify-center max-sm:w-52"
            >
                <div className="flex flex-col gap-4">
                    <label htmlFor="email">Email: </label>
                    <input
                        className="border p-2 text-black border-zinc-200 shadow-sm rounded h-10"
                        type="email"
                        name="email"
                        value={verifyUser.email}
                        onChange={handleInputChange}
                        id="email"
                        required
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="password">Senha: </label>
                    <input
                        className="border p-2 text-black border-zinc-200 shadow-sm rounded h-10"
                        type="password"
                        name="password"
                        id="password"
                        value={verifyUser.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-cyan-800 hover:bg-cyan-950 h-12 rounded-xl"
                >
                    Login
                </button>
                <Link to={"/"} className="underline hover:text-gray-300">
                    Não possui login?
                </Link>
            </form>
        </>
    );
};

export default FormLogin;
