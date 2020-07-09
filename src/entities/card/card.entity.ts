import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CardEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    cardNumber: number;
    @Column()
    expiration: Date;
    @Column()
    cryptogramme: number;
    @Column()
    solde: number;
}