import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { games } from "./games";
import { game_statuses } from "./game_statuses";
import { game_variants } from "./game_variants";
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
    @Column({ nullable: true })
    variant_id: number;
    @ManyToOne(type => game_variants)
    @JoinColumn({ name: "variant_id" })
    variant: game_variants;

    @Column({ nullable: true })
    selector_value: number;

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
    last_turn: number;

    @Column({ type: "bigint", nullable: false })
    last_time: number;

    @Column({ nullable: true })
    last_user: number;

    @Column({ default: 0, nullable: false })
    is_protected: number;

    @Column({ nullable: true })
    next_player: number;

    @Column({ default: 1, nullable: false })
    branch_num: number;
}