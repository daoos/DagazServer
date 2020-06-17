import { Entity, PrimaryGeneratedColumn, Column, Check } from "typeorm";

@Entity()
@Check(`"is_admin" in (0, 1)`)
export class users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    is_admin: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", length: 20, unique: true })
    login: string;

    @Column({ type: "varchar", length: 20 })
    pass: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    email: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    newmail: string;

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    deleted: Date;

    @Column({default: () => "now()"})
    last_actived: Date;
}