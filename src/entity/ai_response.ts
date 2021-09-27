import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ai_request } from "./ai_request";

@Entity()
export class ai_response {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    session_id: number;
    @ManyToOne(type => ai_request)
    @JoinColumn({ name: "session_id" })
    session: ai_request;

    @Column({ type: "text", nullable: false })
    move: string;

    @Column({type: "numeric", precision: 10, scale: 2, nullable: false})
    weight: number;
}