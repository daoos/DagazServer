import {MigrationInterface, QueryRunner} from "typeorm";

export class game1596108130561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(1, 'Doubutsu Shogi', 'doubutsu-shogi', 2, 0, 1000)`);
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
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(16, 'Chess Go', 'chess-go', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(17, 'Go', 'go-19x19', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(21, 'Dual Go', 'dual-go', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(22, 'Checkers', 'russian-checkers', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(23, 'XiangQi', 'xiangqi', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(24, 'Column Checkers', 'column-checkers', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(25, 'Shogi', 'shogi', 2, 0, 1000)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time, max_selector) values(26, 'Reversi', 'reversi', 2, 0, 1000, 10)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total, main_time, additional_time) values(27, 'Stratego', 'stratego', 2, 0, 1000)`);

        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(1, 17, 'Go (9x9)', 'go-9x9', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(2, 17, 'Go (19x19)', 'go-19x19', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(3, 22, 'Russian Checkers', 'russian-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(4, 22, 'International Checkers', 'international-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(5, 22, 'Frisian Checkers', 'frisian-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(6, 22, '80 Cells Checkers', '80-cells-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(7, 23, 'XiangQi', 'xiangqi', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(8, 23, 'YitongQi', 'yitongqi', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(9, 23, 'Five Tigers', 'tigers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(10, 25, 'Shogi', 'shogi', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(11, 25, 'Mini Shogi', 'mini-shogi', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(12, 23, 'Dark XiangQi', 'dark-chinese-chess', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(13, 17, 'Paper Go', 'paper-go', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(14, 17, 'Atari Go', 'atari-go', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(15, 17, 'MarGo', 'margo', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(16, 27, 'Stratego', 'stratego', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(17, 27, 'Jungle', 'jungle', 2)`);

        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(1, 23, 'European', '', null)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(2, 23, 'Chinese', '-kanji', null)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(3, 23, 'Opposite', '-black', 2)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(4, 16, 'European', '', null)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(5, 16, 'Chinese', '-kanji', null)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(6, 25, 'European', '', null)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(7, 25, 'Japanese', '-kanji', null)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(8, 25, 'Opposite', '-north', 2)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(9, 27, 'Opposite', '-blue', 2)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(10, 22, 'Opposite', '-black', 2)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, players_num) values(11, 24, 'Opposite', '-black', 2)`);

        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(1, 'doubutsu-shogi', null, 'doubutsu-shogi')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(2, 'atari-go', null, 'atari-go')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(3, 'chess-go', null, 'chess-go')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(4, 'go-9x9', null, 'go-9x9')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(5, 'go-19x19', null, 'go-19x19')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(6, 'jungle', null, 'jungle')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(7, 'margo', null, 'margo')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(8, 'paper-go', null, 'paper-go')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(9, 'dual-go', null, 'dual-go')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(10, 'russian-checkers', null, 'russian-checkers')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(11, 'international-checkers', null, 'international-checkers')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(12, 'frisian-checkers', null, 'frisian-checkers')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(13, '80-cells-checkers', null, '80-cells-checkers')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(14, 'xiangqi', null, 'xiangqi')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(15, 'column-checkers', null, 'column-checkers')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(16, 'shogi', null, 'shogi')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(17, 'reversi', 1, 'reversi-1')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(18, 'reversi', 2, 'reversi-2')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(19, 'reversi', 3, 'reversi-3')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(20, 'reversi', 4, 'reversi-4')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(21, 'reversi', 5, 'reversi-5')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(22, 'reversi', 6, 'reversi-6')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(23, 'reversi', 7, 'reversi-7')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(24, 'reversi', 8, 'reversi-8')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(25, 'reversi', 9, 'reversi-9')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(26, 'reversi', 10, 'reversi-10')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(27, 'xiangqi-kanji', null, 'xiangqi-kanji')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(28, 'chess-go-kanji', null, 'chess-go-kanji')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(29, 'yitongqi', null, 'yitongqi')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(30, 'yitongqi-kanji', null, 'yitongqi-kanji')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(31, 'tigers', null, 'tigers')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(32, 'tigers-kanji', null, 'tigers-kanji')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(33, 'shogi-kanji', null, 'shogi-kanji')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(34, 'mini-shogi', null, 'mini-shogi')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(35, 'mini-shogi-kanji', null, 'mini-shogi-kanji')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(36, 'dark-chinese-chess', null, 'dark-chinese-chess')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(37, 'dark-chinese-chess-kanji', null, 'dark-chinese-chess-kanji')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(38, 'stratego', null, 'stratego')`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from game_previews`);
        await queryRunner.query(`delete from game_styles`);
        await queryRunner.query(`delete from game_variants`);
        await queryRunner.query(`delete from games`);
    }
}
