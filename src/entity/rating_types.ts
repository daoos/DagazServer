import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class rating_types {
    @PrimaryColumn()
    id: number;

    @Column({ type: "text", nullable: false })
    name: string;
}