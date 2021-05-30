import { Request, Response } from "express";
import { handleUpload, izmeniPrijavu, kreirajPrijavu, nadjiPrijavu, obrisiPrijavu, vratiSvePrijave } from "./actions/PrijavaActions";
import { kreirajSeminarski, nadjiSeminarski, obrisiSeminarski, vratiSveSeminarske } from "./actions/SeminarskiActions";

import * as multer from 'multer';
import * as path from 'path';
import { getFile } from "./actions/FajlActions";

const upload = multer({ dest: path.resolve('img/') })
export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: any[],

}
export const Routes: Route[] = [{
    method: 'get',
    route: '/prijava',
    action: [vratiSvePrijave]
}, {
    method: 'post',
    route: '/prijava',
    action: [upload.single('file'), handleUpload, kreirajPrijavu]
}, {
    method: 'patch',
    route: '/prijava/:student/:seminarski',
    action: [nadjiPrijavu, upload.single('file'), handleUpload, izmeniPrijavu]
}, {
    method: 'delete',
    route: '/prijava/:student/:seminarski',
    action: [nadjiPrijavu, obrisiPrijavu]
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
}, {
    method: 'get',
    route: '/fajl/:filename',
    action: [getFile]
}

];