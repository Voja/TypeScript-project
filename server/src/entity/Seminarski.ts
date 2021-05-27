import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Predmet } from "./Predmet";
import { Profesor } from "./Profesor";


@Entity()
export class Seminarski {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    maksBrojPoena: number;


    @Column()
    naziv: string;

    @Column()
    opis: string;




    @ManyToOne(type => Profesor, { eager: true })
    mentor: Profesor;

    @ManyToOne(type => Predmet, { eager: true })
    predmet: Predmet;
}