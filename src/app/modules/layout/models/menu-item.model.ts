export interface MenuItem {
  id?: string;
  label?: string;
  icon?: string;
  routerLink?: string;
  items?: MenuItem[];
  separator?: boolean;
  styleClass?: string;
}
