
export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: string,
    controller: any
}
export const Routes: Route[] = [

];