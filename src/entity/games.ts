import { Entity, Column, Index, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { realms } from "./realms";

@Entity()
export class games {
    @PrimaryColumn()
    id: number;

    @Index()
    @Column({ default: 1, nullable: false })
    realm_id: number;
    @ManyToOne(type => realms)
    @JoinColumn({ name: "realm_id" })
    realm: realms;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "text", unique: true, nullable: false })
    filename: string;

    @Column({ nullable: false })
    players_total: number;

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    main_time: number;

    @Column({ nullable: true })
    additional_time: number;

    @Column({ default: 0, nullable: false })
    max_selector: number;
}