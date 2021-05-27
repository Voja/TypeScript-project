import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from 'typeorm-encrypted'
import { Predmet } from "./Predmet";

@Entity()
export class Profesor {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    ime: string;

    @Column()
    email: string;

    @Column()
    prezime: string;

    @Column({
        select: false, transformer: new EncryptionTransformer({
            key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: 'ff5ac19190424b1d88f9419ef949ae56'
        })
    })
    sifra: string


    @ManyToMany(type => Predmet, { eager: true })
    @JoinTable({ name: 'profesor_predmet' })
    predaje: Predmet[]
}