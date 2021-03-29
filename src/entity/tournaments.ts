import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { games } from "./games";
import { game_variants } from "./game_variants";
import { users } from "./users";

@Entity()
export class tournaments {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    game_id: number;
    @ManyToOne(type => games)
    @JoinColumn({ name: "game_id" })
    game: games;

    @Index()
    @Column({ nullable: true })
    variant_id: number;
    @ManyToOne(type => game_variants)
    @JoinColumn({ name: "variant_id" })
    variant: game_variants;

    @Column({ nullable: true })
    selector_value: number;

    @Column({ nullable: true })
    main_time: number;

    @Column({ nullable: true })
    additional_time: number;

    @Column({ default: 0, nullable: false })
    is_hidden: number;

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    closed: Date;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;
}
