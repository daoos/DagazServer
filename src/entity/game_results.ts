import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class game_results {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}