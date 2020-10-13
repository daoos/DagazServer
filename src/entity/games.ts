import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { realms } from "./realms";

@Entity()
export class games {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    realm_id: number;
    @ManyToOne(type => realms)
    @JoinColumn({ name: "realm_id" })
    realm: realms;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "text", unique: true })
    filename: string;

    @Column({ nullable: false })
    players_total: number;

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    main_time: number;

    @Column({ nullable: true })
    additional_time: number;
}