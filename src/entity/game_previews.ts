import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class game_previews {
    @PrimaryColumn()
    id: number;

    @Column({ type: "text", nullable: false})
    filename: string;

    @Column({ nullable: true })
    selector_value: number;

    @Column({ type: "text", nullable: false})
    preview: string;
}