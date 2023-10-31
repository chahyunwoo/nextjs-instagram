export interface Navlink {
  name: string;
  href: string;
  defaultIcon: () => React.ReactElement;
  active: () => React.ReactElement;
}
