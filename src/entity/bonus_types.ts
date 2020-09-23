import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class bonus_types {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", nullable: false })
    name: string;

    @Column({ nullable: true })
    expire_period: number;
}