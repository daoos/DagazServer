import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class picture {
    @PrimaryColumn()
    internal_name: string;

    @Column()
    file_name: string;

    @Column()
    loaded: Date;
}