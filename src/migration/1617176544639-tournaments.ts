import {MigrationInterface, QueryRunner} from "typeorm";

export class tournaments1617176544639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into tournament_types(id, name) values(1, 'Round')`);

        await queryRunner.query(`insert into rating_types(id, name) values(1, 'Elo')`);

        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(1, 30, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(2, 30, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(3, 30, null, 3, 0.5)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(4, 22, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(5, 22, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(6, 22, null, 3, 0.5)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(7, 24, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(8, 24, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(9, 24, null, 3, 0.5)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(10, 26, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(11, 26, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(12, 26, null, 3, 0.5)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(13, 23, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(14, 23, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(15, 23, null, 3, 0.5)`);

        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(1, 'Chess', 30, 31, 1, 1, 1, 7200, 0)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(2, 'Chess (Mini)', 30, 125, 1, 1, 1, 1800, 0)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(3, 'Russian Checkers', 22, 3, 1, 1, 1, 1800, 20)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(4, 'International Checkers', 22, null, 1, 1, 1, 3600, 20)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(5, 'Frisian Checkers', 22, 5, null, 1, 1, 3600, 20)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(6, '80 Cells Checkers', 22, 6, null, 1, 1, 1800, 20)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(7, 'Fighting Checkers', 22, 180, null, 1, 1, 3600, 20)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(8, 'Fighting Chess', 30, 33, 1, null, 1, 7200, 0)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(9, 'Shatranj', 30, 38, 93, 1, 1, 7200, 0)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(10, 'Sovereign Chess', 30, 193, null, 1, 1, 14400, 60)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(11, 'Turnover', 30, 56, null, 1, 1, 7200, 0)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(12, 'Shashki Adiyukh (8x8)', 24, 191, null, 1, 1, 1800, 20)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(13, 'Shashki Adiyukh (8x10)', 24, 192, null, 1, 1, 1800, 20)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(14, 'Reversi', 26, 83, 1, 1, 1, 1800, 20)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id, main_time, additional_time) values(15, 'Chess Go', 23, 86, null, 1, 1, 7200, 30)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from game_settings`);
        await queryRunner.query(`delete from game_scores`);
        await queryRunner.query(`delete from rating_types`);
        await queryRunner.query(`delete from tournament_types`);
    }
}
