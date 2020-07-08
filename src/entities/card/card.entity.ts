import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class CardEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    number: number;
    @Column()
    expiration: Date;
    @Column()
    cryptogramme: number;
}