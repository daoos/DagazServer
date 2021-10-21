import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ai_stat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    batch_size: number;

    @Column({ nullable: false })
    epoch_count: number;

    @Column({ type: "numeric", nullable: false })
    validation_split: number;

    @Column({ nullable: false })
    time_delta: number;

    @Column({ nullable: false })
    result: string;

    @Column({ nullable: true })
    model: string;

    @Column({ default: "now()", nullable: false })
    created: Date;
}