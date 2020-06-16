import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class token_types {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}