import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    
  </Menu>
  )
}

/*

<Menu.Item key="mail">
      <a href="/">처음으로</a>
    </Menu.Item>
    

<SubMenu title={<span>판례 상세목록</span>}>
      <MenuItemGroup title="1단계 중요 단어">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="2단계 중요 문장">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
*/

export default LeftMenu