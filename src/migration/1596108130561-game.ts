import {MigrationInterface, QueryRunner} from "typeorm";

export class game1596108130561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(1, 'Doubutsu Shogi', 'doubutsu-shogi', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(2, 'Atari Go', 'atari-go', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(3, 'Filler', 'filler', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(4, 'Bagh Chal', 'bagh-chal', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(5, 'Italian Damone', 'damone', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(6, 'Fox and Geese', 'foxnguse', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(7, 'French Military Game', 'french-military', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(8, 'Horn Chess', 'horn-chess', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(9, 'Kharbaga', 'kharbaga', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(10, 'Light Off', 'light-off', 1, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(11, 'Magyar Dama', 'magyar-dama', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(12, 'Maharadja', 'maharadja', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(13, 'NetWalk', 'netwalk', 1, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(14, 'Shisima', 'shisima', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(15, 'Tactical tic-tac-toe', 'uxo', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(16, 'Chess Go', 'chess-go-mobile', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(17, 'Go', 'go-19x19', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(18, 'Jungle', 'jungle', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(19, 'MarGo', 'margo', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(20, 'Paper Go', 'paper-go', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(21, 'Dual Go', 'dual-go', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(22, 'Checkers', 'russian-checkers', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(23, 'XiangQi', 'xiangqi', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(24, 'Column Checkers', 'column-checkers', 2, 0, 1000)`);

        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(1, 17, 'Go (9x9)', 'go-9x9', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(2, 17, 'Go (19x19)', 'go-19x19', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(3, 22, 'Russian Checkers', 'russian-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(4, 22, 'International Checkers', 'international-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(5, 22, 'Frisian Checkers', 'frisian-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(6, 22, '80 Cells Checkers', '80-cells-checkers', 2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from game_variants`);
        await queryRunner.query(`delete from games`);
    }
}
