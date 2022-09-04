import { useAppSelector } from 'hooks/redux';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUnloginReducer } from 'store/reducers/loginReducer';

type MenuProps = {
  closeSideBar: () => void;
};
// eslint-disable-next-line react/prop-types
const MenuLinks: React.FC<MenuProps> = ({ closeSideBar }) => {

  const dispatch = useDispatch();
  const { isLogin } = useAppSelector((state) => state.userLogin.userLogin);

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
      {isLogin ? (
        <NavLink to="/statistics" onClick={closeSideBar}>
          Статистика
        </NavLink>
      ) : (
        <NavLink to="/signin" onClick={closeSideBar}>
          Войти
        </NavLink>
      )}
      {isLogin && (
        <NavLink
          to="/"
          onClick={() => {
            localStorage.clear();
            dispatch(setUnloginReducer());
          }}
        >
          Выйти
        </NavLink>
      )}
    </>
  );
};
export default MenuLinks;

