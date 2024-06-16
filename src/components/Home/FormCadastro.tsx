import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserProps {
    name: string;
    email: string;
    password: string;
}

const FormCadastro = () => {
    const [signInUser, setSignInUser] = useState<UserProps>({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignInUser({
            ...signInUser,
            [name]: value
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (signInUser.password.length < 5) {
            alert('A senha deve conter 5 caracteres ou mais');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInUser),
            });

            if (!response.ok) {
                throw new Error(`Erro ao cadastrar usuário: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Usuário cadastrado com sucesso:', data);

            // Redireciona para a página de login ou outra página desejada
            navigate('/login');

            // Limpa os campos do formulário após o cadastro
            setSignInUser({
                name: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário. Verifique o console para mais detalhes.');
        }
    };

    useEffect(() => {
        const resetForm = () => {
            setSignInUser({
                name: '',
                email: '',
                password: ''
            });
        };

        resetForm();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72 h-full max-w-sm text-start font-semibold justify-center max-sm:w-52">
                <div className="flex flex-col gap-4">
                    <label htmlFor="name">Nome: </label>
                    <input
                        className="border p-2 text-black border-zinc-200 shadow-sm rounded h-10 w-full flex justify-start"
                        type="text"
                        name="name"
                        id="name"
                        value={signInUser.name}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="email">Email: </label>
                    <input
                        className="border p-2 text-black border-zinc-200 shadow-sm rounded h-10"
                        type="email"
                        name="email"
                        id="email"
                        value={signInUser.email}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="password">Senha: </label>
                    <input
                        className="border p-2 text-black border-zinc-200 shadow-sm rounded h-10"
                        type="password"
                        name="password"
                        id="password"
                        value={signInUser.password}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="bg-cyan-800 hover:bg-cyan-950 h-12 rounded-xl">
                    Cadastrar
                </button>
                <Link to={'/login'} className="underline hover:text-gray-300">Já possui cadastro?</Link>
            </form>
        </>
    );
};

export default FormCadastro;
