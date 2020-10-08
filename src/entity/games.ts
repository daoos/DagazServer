import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class games {
    @PrimaryGeneratedColumn()
    id: number;

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