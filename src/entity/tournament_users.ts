import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tournaments } from "./tournaments";
import { users } from "./users";

@Entity()
export class tournament_users {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    tournament_id: number;
    @ManyToOne(type => tournaments)
    @JoinColumn({ name: "tournament_id" })
    tournament: tournaments;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Column({ default: 0, nullable: false })
    score: number;
}