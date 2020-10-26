import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { games } from "./games";

@Entity()
export class game_variants {
    @PrimaryColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    game_id: number;
    @ManyToOne(type => games)
    @JoinColumn({ name: "game_id" })
    game: games;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "text", nullable: false})
    filename: string;

    @Column({ nullable: false })
    players_total: number;

    @Column({ default: 0, nullable: false })
    max_selector: number;
}