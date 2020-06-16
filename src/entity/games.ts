import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class games {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    parent_id: number;
    @ManyToOne(type => games)
    @JoinColumn({ name: "parent_id" })
    parent: games;

    @Column()
    name: string;

    @Column()
    filename: string;

    @Column()
    players_total: number;
}