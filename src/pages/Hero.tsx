import UserExpenses from '../components/Hero/UserExpenses.tsx';
import UserHeader from '../components/Hero/Header/UserHeader.tsx';
import UserEditModal from '../components/Hero/Header/UserEditModal.tsx';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    password: '',
  });

  const { id } = useParams();

  const handlerClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do cliente');
        }
        const data = await response.json();
        setUserData({
          name: data.name,
          password: data.password,
        });
      } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
      }
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [id, isOpen]);

  return (
    <div className="main w-full h-full flex flex-col">
      <div className="user-header">
        <UserHeader userName={userData.name} handler={handlerClick} />
      </div>

      <div className="main-content w-full h-full flex items-center justify-around p-5 bg-cyan-200">
        <UserExpenses />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="absolute w-full h-full box-border flex justify-center items-center bg-opacity-50 bg-gray-700 text-white ">
          <UserEditModal name={userData.name} password={userData.password} handler={handlerClick} />
        </div>
      )}
    </div>
  );
};

export default Hero;
