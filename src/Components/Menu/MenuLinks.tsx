import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

type MenuProps = {
  closeSideBar: () => void;
};
// eslint-disable-next-line react/prop-types
const MenuLinks: React.FC<MenuProps> = ({ closeSideBar }) => {
  const [isAuth, setIsAuth] = useState<Boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token') as string;
    const userId = localStorage.getItem('userId') as string;
    if (token !== null && userId !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  return (
    <>
      <NavLink to="/" onClick={closeSideBar}>
        Главная
      </NavLink>
      <NavLink to="/book" onClick={closeSideBar}>
        Учебник
      </NavLink>
      <NavLink to="/games" onClick={closeSideBar}>
        Игры
      </NavLink>
      {isAuth ? (
        <NavLink to="/statistics" onClick={closeSideBar}>
          Статистика
        </NavLink>
      ) : (
        <NavLink to="/signin" onClick={closeSideBar}>
          Войти
        </NavLink>
      )}
      {isAuth && (
        <NavLink
          to="/"
          onClick={() => {
            localStorage.clear();
            setIsAuth(false);
          }}
        >
          Выйти
        </NavLink>
      )}
    </>
  );
};
export default MenuLinks;
