import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class tournament_types {
    @PrimaryColumn()
    id: number;

    @Column({ type: "text", nullable: false })
    name: string;
}