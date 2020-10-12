import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class queue_log {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: false })
    contact_id: number;
    
    @Column({ nullable: false })
    bonuse_id: number;

    @Column({nullable: false})
    scheduled: Date;

    @Column({default: () => "now()", nullable: false})
    executed: Date;
}