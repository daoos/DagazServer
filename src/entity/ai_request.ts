import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { game_variants } from "./game_variants";

@Entity()
export class ai_request {
    @PrimaryColumn()
    session_id: number;

    @Index()
    @Column({ nullable: false })
    variant_id: number;
    @ManyToOne(type => game_variants)
    @JoinColumn({ name: "variant_id" })
    variant: game_variants;

    @Column({ type: "text", nullable: false })
    setup: string;

    @Column({type: "numeric", precision: 10, scale: 2, nullable: true})
    coeff: number;

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    completed: Date;

    @Column({ nullable: true })
    requested: Date;
}