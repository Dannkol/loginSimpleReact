import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const user = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      let headersList = {
        "Authorization": `Bearer ${user}`
      }

      try {
        let response = await fetch("http://localhost:5300/api/user", {
          method: "GET",
          headers: headersList
        });

        if (response.ok) {
          let data = await response.json();
          setUserData(data);
        } else {
          console.error(`Error en la solicitud: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error en la solicitud: ${error.message}`);
      }
    };

    if (user) {
      getUser();
    }
  }, [user]);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>{(user != 'undefined') ? (userData ? `Bienvenido ${userData.username}` : 'Cargando...') : 'Usuario no logeado'}</h3>
    </div>
  );
}

export default Dashboard;
