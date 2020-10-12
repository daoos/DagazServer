import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { bonuses } from "./bonuses";
import { contacts } from "./contacts";

@Entity()
export class queue {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    contact_id: number;
    @ManyToOne(type => contacts)
    @JoinColumn({ name: "contact_id" })
    contact: contacts;

    @Index()
    @Column({ nullable: false })
    bonuse_id: number;
    @ManyToOne(type => bonuses)
    @JoinColumn({ name: "bonuse_id" })
    bonuse: bonuses;

    @Column({default: () => "now()", nullable: false})
    scheduled: Date;
}