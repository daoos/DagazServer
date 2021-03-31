import {MigrationInterface, QueryRunner} from "typeorm";

export class tournaments1617176544639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into tournament_types(id, name) values(1, 'Round')`);

        await queryRunner.query(`insert into rating_types(id, name) values(1, 'Elo')`);

        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(1, 30, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(2, 30, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(3, 30, null, 3, 0.5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from game_scores`);
        await queryRunner.query(`delete from rating_types`);
        await queryRunner.query(`delete from tournament_types`);
    }
}
