import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    is_admin: number;

    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    pass: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    newmail: string;

    @Column()
    created: Date;

    @Column({ nullable: true })
    deleted: Date;

    @Column()
    last_actived: Date;
}