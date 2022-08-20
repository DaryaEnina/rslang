import { NavLink } from 'react-router-dom';
import { scaleDown as Menu } from 'react-burger-menu';

const SideMenu = () => {
    return (
        <Menu width={320} pageWrapId="page-wrap" outerContainerId="outer-container">
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/book">Учебник</NavLink>
            <NavLink to="/games">Игры</NavLink>
            <NavLink to="/signin">Войти</NavLink>
        </Menu>
    );
};
export default SideMenu;
