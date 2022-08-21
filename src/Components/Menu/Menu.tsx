import { scaleDown as Menu } from 'react-burger-menu';
import { useState } from 'react';
import MenuLinks from './MenuLinks';

const SideMenu = () => {
    const [isOpen, setOpen] = useState(false);

    const handleIsOpen = () => {
        setOpen(!isOpen);
    };

    const closeSideBar = () => {
        setOpen(false);
    };

    return (
        <Menu
            width={320}
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
            isOpen={isOpen}
            onOpen={handleIsOpen}
            onClose={handleIsOpen}
        >
            <MenuLinks closeSideBar={closeSideBar} />
        </Menu>
    );
};
export default SideMenu;
