import { Request, Response } from "express";
import { kreirajPrijavu, nadjiPrijavu, vratiSvePrijave } from "./actions/PrijavaActions";
import { kreirajSeminarski, nadjiSeminarski, obrisiSeminarski, vratiSveSeminarske } from "./actions/SeminarskiActions";

export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: ((req: Request, res: Response, next?: any) => Promise<void>)[],

}
export const Routes: Route[] = [{
    method: 'get',
    route: '/prijava',
    action: [vratiSvePrijave]
}, {
    method: 'post',
    route: '/prijava',
    action: [kreirajPrijavu]
}, {
    method: 'patch',
    route: '/prijava/:student/:seminarski',
    action: [nadjiPrijavu, kreirajPrijavu]
}, {
    method: 'delete',
    route: '/prijava/:student/:seminarski',
    action: [nadjiPrijavu, kreirajPrijavu]
}, {
    method: 'patch',
    route: '/prijava/:student/:seminarski/oceni',
    action: [nadjiPrijavu, kreirajPrijavu]
}, {
    method: 'get',
    route: '/seminarski',
    action: [vratiSveSeminarske]
}, {
    method: 'post',
    route: '/seminarski',
    action: [kreirajSeminarski]
}, {
    method: 'patch',
    route: '/seminarski/:id',
    action: [nadjiSeminarski, kreirajSeminarski]
}, {
    method: 'delete',
    route: '/seminarski/:id',
    action: [nadjiSeminarski, obrisiSeminarski]
}

];