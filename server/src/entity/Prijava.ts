import { Column, Entity, ManyToOne } from "typeorm";
import { Seminarski } from "./Seminarski";
import { Student } from "./Student";

@Entity()
export class Prijava {


    @Column()
    brojPoena: number;

    @ManyToOne(type => Student, { eager: true, primary: true })
    student: Student;

    @ManyToOne(type => Seminarski, { eager: true, primary: true })
    seminarski: Seminarski

    @Column()
    nazivTeme: string

    @Column()
    fajl: string

    @Column()
    status: 'kreiran' | 'ocenjen'

}