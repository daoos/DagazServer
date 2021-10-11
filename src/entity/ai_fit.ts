import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ai_fit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", nullable: false })
    setup: string;

    @Column({ nullable: false })
    move: number;
}