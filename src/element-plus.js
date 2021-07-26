import {
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElFooter,
  ElMain,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElCol,
  ElRow,
  ElInput,
  ElTooltip
} from 'element-plus';
const components = [
  ElContainer,
  ElHeader,
  ElAside,
  ElFooter,
  ElMain,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElCol,
  ElRow,
  ElInput,
  ElButton,
  ElTooltip
];
export default function(app) {
  components.forEach(component => {
    app.component(component.name, component);
  });
}
