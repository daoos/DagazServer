import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { game_variants } from "./game_variants";

@Entity()
export class ai_fit_log {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    variant_id: number;
    @ManyToOne(type => game_variants)
    @JoinColumn({ name: "variant_id" })
    variant: game_variants;

    @Column({ type: "text", nullable: false })
    setup: string;

    @Column({ nullable: false })
    move: number;
}