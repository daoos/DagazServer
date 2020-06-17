import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { games } from "./games";
import { game_statuses } from "./game_statuses";
import { users } from "./users";

@Entity()
export class game_sessions {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Index()
    @Column({ nullable: false })
    game_id: number;
    @ManyToOne(type => games)
    @JoinColumn({ name: "game_id" })
    game: games;

    @Index()
    @Column({ nullable: false })
    status_id: number;
    @ManyToOne(type => game_statuses)
    @JoinColumn({ name: "status_id" })
    status: game_statuses;

    @Column({default: () => "now()"})
    created: Date;

    @Column({default: () => "now()"})
    changed: Date;

    @Column({ nullable: true })
    closed: Date;

    @Column({ type: "text", nullable: true })
    last_setup: string;

    @Column({ nullable: true })
    last_turn: string;

    @Column({ nullable: true })
    last_player: string;
}