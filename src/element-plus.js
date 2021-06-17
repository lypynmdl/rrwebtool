import {
  ElButton, 
  ElContainer, 
  ElHeader, 
  ElAside, 
  ElFooter, 
  ElMain,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus'
const components = [
  ElButton, 
  ElContainer, 
  ElHeader, 
  ElAside, 
  ElFooter,
  ElMain,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
]
export default function (app) { 
  components.forEach(component => {
    app.component(component.name, component)
  });
 }