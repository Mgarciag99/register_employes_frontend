export interface Submenu {
    id: string;
    name: string;
    route: string;
    icon: string;

}

export interface NavOptions {
    id: string;
    name: string;
    route: string;
    icon: string;
    submenus: Submenu[];
}
