import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UserFormProps {
    name: string;
    password: string;
    handler: () => void;
}

const UserEditModal = ({ name, password, handler }: UserFormProps) => {
    const [formData, setFormData] = useState({ name, password });
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setFormData({ name, password });
    }, [name, password]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password.length < 5) {
            alert("A senha deve conter 5 caracteres ou mais");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar os dados do usuário');
            }

            const updatedUserData = await response.json();



            setFormData({
                name: updatedUserData.name,
                password: updatedUserData.password,
            });


            handler();
        } catch (error) {

            alert('Erro ao atualizar os dados do usuário. Verifique o console para mais detalhes.');
        }
    };

    const toggleDeleteModal = () => {
        setDeleteModalOpen(!isDeleteModalOpen);
    };

    const deleteAccount = async () => {
        try {
            const res = prompt('Digite exatamente "sim excluir conta" para confirmar a exclusão');
            if (res === 'sim excluir conta') {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Erro ao excluir a conta do usuário');
                }

                navigate('/');
            } else {
                alert('Digite "sim excluir conta" corretamente');
                setDeleteModalOpen(false);
            }
        } catch (error) {
            alert('Erro ao excluir a conta do usuário. Verifique o console para mais detalhes.');
        }
    };

    return (
        <>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4 w-[380px] h-[400px] text-start font-semibold justify-evenly items-center max-425:w-72 bg-cyan-600 rounded-xl p-4">

                <div className='w-full flex justify-between p-2'>
                    <h1>Editar usuário</h1>
                    <span className="hover:cursor-pointer" onClick={handler}><IoCloseSharp size={25} /></span>
                </div>

                <div className="flex flex-col gap-4 w-full ">
                    <label htmlFor="name">Nome:</label>
                    <input
                        className="border p-2 text-black border-zinc-200 shadow-sm rounded h-9 w-full flex justify-start"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        id="name"
                        required
                    />
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="password">Senha:</label>
                    <input
                        className="border p-2 text-black border-zinc-200 shadow-sm rounded h-9"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        id="password"
                        required
                    />
                </div>

                <button type="submit" className="bg-cyan-800 hover:bg-cyan-950 h-12 rounded-xl w-full">
                    Editar
                </button>
                <button type='button' className="bg-red-700 hover:bg-red-950 h-12 rounded-xl w-full" onClick={toggleDeleteModal}>
                    Excluir conta?
                </button>

            </form>

            {/* Modal de confirmação de exclusão */}
            {isDeleteModalOpen && (
                <div className="absolute w-full h-full z-30 flex items-center justify-center bg-black bg-opacity-50">
                    <div className='w-80 h-40 bg-white rounded-2xl flex flex-col justify-around items-center p-4 text-black'>
                        <div className='font-semibold text-center'>
                            Essa opção não tem volta! Você perderá tudo, deseja realmente excluir?
                        </div>
                        <div className='flex items-center justify-around w-full'>
                            <button className='bg-green-600 text-white w-20 rounded-xl hover:bg-green-800' onClick={deleteAccount}>Sim</button>
                            <button className='bg-red-600 text-white w-20 rounded-xl hover:bg-red-800' onClick={toggleDeleteModal}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserEditModal;
