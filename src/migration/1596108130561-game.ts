import {MigrationInterface, QueryRunner} from "typeorm";

export class game1596108130561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into games(name, filename, players_total, main_time, additional_time) values('Oware', 'mancala/oware.htm', 2, 300, 3)`);
        await queryRunner.query(`insert into games(name, filename, players_total, main_time, additional_time) values('Go', 'go/go-9x9.htm', 2, 300, 3)`);
        await queryRunner.query(`insert into games(name, filename, players_total, main_time, additional_time) values('Column Checkers', 'checkers/column-checkers.htm', 2, 300, 3)`);
        await queryRunner.query(`insert into games(name, filename, players_total, main_time, additional_time) values('Doubutsu Shogi', 'breakthrough/doubutsu-shogi.htm', 2, 300, 3)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from games`);
    }
}
