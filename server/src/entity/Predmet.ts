import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seminarski } from "./Seminarski";

@Entity()
export class Predmet {


    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    naziv: string;

    @Column()
    opis: string;

    @Column()
    espb: number;

    @Column()
    semestar: number;


}