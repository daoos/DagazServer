import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class game_statuses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}