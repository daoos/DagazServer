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
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(16, 31, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(17, 31, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(18, 31, null, 3, 0.5)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(19, 45, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(20, 45, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(21, 45, null, 3, 0.5)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(22, 29, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(23, 29, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(24, 29, null, 3, 0.5)`);

        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(1, 'Chess', 30, 31, 1, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(2, 'Chess (Mini)', 30, 125, 1, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(3, 'Russian Checkers', 22, 3, 1, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(4, 'International Checkers', 22, 4, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(5, 'Frisian Checkers', 22, 5, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(6, '80 Cells Checkers', 22, 6, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(7, 'Fighting Checkers', 22, 180, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(8, 'Fighting Chess', 30, 33, 1, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(9, 'Shatranj', 30, 38, 93, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(10, 'Sovereign Chess', 30, 193, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(11, 'Turnover', 30, 56, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(12, 'Shashki Adiyukh (8x8)', 24, 191, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(13, 'Shashki Adiyukh (8x10)', 24, 192, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(14, 'Reversi', 26, 83, 1, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(15, 'Chess Go', 23, 86, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(16, 'Alapo', 30, 134, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(17, 'Cyclic Checkers', 22, 205, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(18, 'Turkish Dama', 22, 46, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(19, 'Armenian Tama', 22, 70, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(20, 'Canadian Checkers', 22, 71, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(21, 'Column Checkers', 24, 35, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(22, 'Lasca', 24, 36, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(23, 'Stapeldammen', 24, 37, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(24, 'Constitutional Checkers', 22, 47, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(25, 'Dark Chess', 30, 64, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(27, 'Greek Checkers', 22, 72, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(28, 'Stavropol Checkers', 22, 48, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(29, 'Thai Checkers', 22, 69, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(30, 'Samoedy', 22, 213, null, 1, 1)`);
//      await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(31, 'Column Samoedy', 24, 214, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(32, 'Harzdame', 22, 215, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(33, 'Dameo', 22, 216, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(34, 'Oware', 31, 18, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(35, 'Toguz Kumalak', 31, 20, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(36, 'Grand Dice Chess', 45, 238, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(37, 'Hex', 29, 225, null, 1, 1)`);

        await queryRunner.query(`insert into time_controls(id, name, main_time, additional_time, order_num) values(1, '02:00:00+01:00', 7200, 60, 2)`);
        await queryRunner.query(`insert into time_controls(id, name, main_time, additional_time, order_num) values(2, '00:30:00+00:20', 1800, 20, 1)`);
        await queryRunner.query(`insert into time_controls(id, name, main_time, additional_time, order_num) values(3, '04:00:00+03:00', 14400, 180, 3)`);
        await queryRunner.query(`insert into time_controls(id, name, main_time, additional_time, is_sandglass, order_num) values(4, 'Sandglass 00:15:00', 900, 0, true, 4)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from time_controls`);
        await queryRunner.query(`delete from game_settings`);
        await queryRunner.query(`delete from game_scores`);
        await queryRunner.query(`delete from rating_types`);
        await queryRunner.query(`delete from tournament_types`);
    }
}
