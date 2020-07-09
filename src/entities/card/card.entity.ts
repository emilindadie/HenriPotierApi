import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CardEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    number: number;
    @Column()
    expiration: Date;
    @Column()
    cryptogramme: number;
}