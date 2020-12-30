Dagaz.Controller.persistense = "none";

ZRF = {
    JUMP:          0,
    IF:            1,
    FORK:          2,
    FUNCTION:      3,
    IN_ZONE:       4,
    FLAG:          5,
    SET_FLAG:      6,
    POS_FLAG:      7,
    SET_POS_FLAG:  8,
    ATTR:          9,
    SET_ATTR:      10,
    PROMOTE:       11,
    MODE:          12,
    ON_BOARD_DIR:  13,
    ON_BOARD_POS:  14,
    PARAM:         15,
    LITERAL:       16,
    VERIFY:        20
};

Dagaz.Model.BuildDesign = function(design) {
    design.checkVersion("z2j", "2");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-hints", "false");

    design.addDirection("se");   // 0
    design.addDirection("s");    // 1
    design.addDirection("sw");   // 2
    design.addDirection("e");    // 3
    design.addDirection("w");    // 4
    design.addDirection("ne");   // 5
    design.addDirection("nw");   // 6
    design.addDirection("n");    // 7
    design.addDirection("up");   // 8
    design.addDirection("down"); // 9

    design.addPlayer("White", [6, 7, 5, 4, 3, 2, 0, 1, 9, 8]);
    design.addPlayer("Black", [5, 7, 6, 3, 4, 0, 2, 1, 8, 9]);

    design.addPosition("a8", [9, 8, 0, 1, 0, 0, 0, 0, 64, 0]);
    design.addPosition("b8", [9, 8, 7, 1, -1, 0, 0, 0, 64, 0]);
    design.addPosition("c8", [9, 8, 7, 1, -1, 0, 0, 0, 64, 0]);
    design.addPosition("d8", [9, 8, 7, 1, -1, 0, 0, 0, 64, 0]);
    design.addPosition("e8", [9, 8, 7, 1, -1, 0, 0, 0, 64, 0]);
    design.addPosition("f8", [9, 8, 7, 1, -1, 0, 0, 0, 64, 0]);
    design.addPosition("g8", [9, 8, 7, 1, -1, 0, 0, 0, 64, 0]);
    design.addPosition("h8", [0, 8, 7, 0, -1, 0, 0, 0, 64, 0]);
    design.addPosition("a7", [9, 8, 0, 1, 0, -7, 0, -8, 64, 0]);
    design.addPosition("b7", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("c7", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("d7", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("e7", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("f7", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("g7", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("h7", [0, 8, 7, 0, -1, 0, -9, -8, 64, 0]);
    design.addPosition("a6", [9, 8, 0, 1, 0, -7, 0, -8, 64, 0]);
    design.addPosition("b6", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("c6", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("d6", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("e6", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("f6", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("g6", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("h6", [0, 8, 7, 0, -1, 0, -9, -8, 64, 0]);
    design.addPosition("a5", [9, 8, 0, 1, 0, -7, 0, -8, 64, 0]);
    design.addPosition("b5", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("c5", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("d5", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("e5", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("f5", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("g5", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("h5", [0, 8, 7, 0, -1, 0, -9, -8, 64, 0]);
    design.addPosition("a4", [9, 8, 0, 1, 0, -7, 0, -8, 64, 0]);
    design.addPosition("b4", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("c4", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("d4", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("e4", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("f4", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("g4", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("h4", [0, 8, 7, 0, -1, 0, -9, -8, 64, 0]);
    design.addPosition("a3", [9, 8, 0, 1, 0, -7, 0, -8, 64, 0]);
    design.addPosition("b3", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("c3", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("d3", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("e3", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("f3", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("g3", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("h3", [0, 8, 7, 0, -1, 0, -9, -8, 64, 0]);
    design.addPosition("a2", [9, 8, 0, 1, 0, -7, 0, -8, 64, 0]);
    design.addPosition("b2", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("c2", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("d2", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("e2", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("f2", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("g2", [9, 8, 7, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("h2", [0, 8, 7, 0, -1, 0, -9, -8, 64, 0]);
    design.addPosition("a1", [0, 0, 0, 1, 0, -7, 0, -8, 64, 0]);
    design.addPosition("b1", [0, 0, 0, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("c1", [0, 0, 0, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("d1", [0, 0, 0, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("e1", [0, 0, 0, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("f1", [0, 0, 0, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("g1", [0, 0, 0, 1, -1, -7, -9, -8, 64, 0]);
    design.addPosition("h1", [0, 0, 0, 0, -1, 0, -9, -8, 64, 0]);
    design.addPosition("a16", [9, 8, 0, 1, 0, 0, 0, 0, 0, -64]);
    design.addPosition("b16", [9, 8, 7, 1, -1, 0, 0, 0, 0, -64]);
    design.addPosition("c16", [9, 8, 7, 1, -1, 0, 0, 0, 0, -64]);
    design.addPosition("d16", [9, 8, 7, 1, -1, 0, 0, 0, 0, -64]);
    design.addPosition("e16", [9, 8, 7, 1, -1, 0, 0, 0, 0, -64]);
    design.addPosition("f16", [9, 8, 7, 1, -1, 0, 0, 0, 0, -64]);
    design.addPosition("g16", [9, 8, 7, 1, -1, 0, 0, 0, 0, -64]);
    design.addPosition("h16", [0, 8, 7, 0, -1, 0, 0, 0, 0, -64]);
    design.addPosition("a15", [9, 8, 0, 1, 0, -7, 0, -8, 0, -64]);
    design.addPosition("b15", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("c15", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("d15", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("e15", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("f15", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("g15", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("h15", [0, 8, 7, 0, -1, 0, -9, -8, 0, -64]);
    design.addPosition("a14", [9, 8, 0, 1, 0, -7, 0, -8, 0, -64]);
    design.addPosition("b14", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("c14", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("d14", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("e14", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("f14", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("g14", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("h14", [0, 8, 7, 0, -1, 0, -9, -8, 0, -64]);
    design.addPosition("a13", [9, 8, 0, 1, 0, -7, 0, -8, 0, -64]);
    design.addPosition("b13", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("c13", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("d13", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("e13", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("f13", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("g13", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("h13", [0, 8, 7, 0, -1, 0, -9, -8, 0, -64]);
    design.addPosition("a12", [9, 8, 0, 1, 0, -7, 0, -8, 0, -64]);
    design.addPosition("b12", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("c12", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("d12", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("e12", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("f12", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("g12", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("h12", [0, 8, 7, 0, -1, 0, -9, -8, 0, -64]);
    design.addPosition("a11", [9, 8, 0, 1, 0, -7, 0, -8, 0, -64]);
    design.addPosition("b11", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("c11", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("d11", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("e11", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("f11", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("g11", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("h11", [0, 8, 7, 0, -1, 0, -9, -8, 0, -64]);
    design.addPosition("a10", [9, 8, 0, 1, 0, -7, 0, -8, 0, -64]);
    design.addPosition("b10", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("c10", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("d10", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("e10", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("f10", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("g10", [9, 8, 7, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("h10", [0, 8, 7, 0, -1, 0, -9, -8, 0, -64]);
    design.addPosition("a9", [0, 0, 0, 1, 0, -7, 0, -8, 0, -64]);
    design.addPosition("b9", [0, 0, 0, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("c9", [0, 0, 0, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("d9", [0, 0, 0, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("e9", [0, 0, 0, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("f9", [0, 0, 0, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("g9", [0, 0, 0, 1, -1, -7, -9, -8, 0, -64]);
    design.addPosition("h9", [0, 0, 0, 0, -1, 0, -9, -8, 0, -64]);
    design.addPosition("X1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X4", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addZone("last-rank", 2, [56, 57, 58, 59, 60, 61, 62, 63]);
    design.addZone("third-rank", 1, [40, 41, 42, 43, 44, 45, 46, 47]);
    design.addZone("third-rank", 2, [16, 17, 18, 19, 20, 21, 22, 23]);
    design.addZone("board-zone", 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]);
    design.addZone("board-zone", 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// last-rank
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	1);	// third-rank
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.IN_ZONE,	0);	// last-rank
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	4);
    design.addCommand(2, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.JUMP,	2);
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	5);	// last-to?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.LITERAL,	0);	// Pawn
    design.addCommand(3, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	26);	// capture
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	6);	// mark
    design.addCommand(3, ZRF.PARAM,	2);	// $3
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	7);	// back
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	9);
    design.addCommand(4, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FORK,	3);
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end
    design.addCommand(4, ZRF.PARAM,	1);	// $2
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-10);
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	1);	// $2
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.PARAM,	0);	// $1
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.PARAM,	1);	// $2
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.PARAM,	2);	// $3
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	1);	// Rook
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.PARAM,	3);	// $4
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.PARAM,	4);	// $5
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.IN_ZONE,	2);	// board-zone
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	0);	// $1
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	1);	// $2
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.PARAM,	2);	// $3
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	3);	// $4
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	1);	// Rook
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PARAM,	4);	// $5
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.PARAM,	5);	// $6
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.PARAM,	6);	// $7
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addPiece("Pawn", 0, 800);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 1, [7, 7], 0);
    design.addMove(0, 2, [6], 0);
    design.addMove(0, 2, [5], 0);
    design.addMove(0, 3, [3, 7, 7], 0);
    design.addMove(0, 3, [4, 7, 7], 0);

    design.addPiece("Rook", 1, 5000);
    design.addMove(1, 4, [7, 7], 0);
    design.addMove(1, 4, [1, 1], 0);
    design.addMove(1, 4, [4, 4], 0);
    design.addMove(1, 4, [3, 3], 0);

    design.addPiece("Knight", 2, 3350);
    design.addMove(2, 5, [7, 6], 0);
    design.addMove(2, 5, [7, 5], 0);
    design.addMove(2, 5, [1, 2], 0);
    design.addMove(2, 5, [1, 0], 0);
    design.addMove(2, 5, [4, 6], 0);
    design.addMove(2, 5, [4, 2], 0);
    design.addMove(2, 5, [3, 5], 0);
    design.addMove(2, 5, [3, 0], 0);

    design.addPiece("Bishop", 3, 10000);
    design.addMove(3, 4, [6, 6], 1);
    design.addMove(3, 4, [2, 2], 1);
    design.addMove(3, 4, [5, 5], 1);
    design.addMove(3, 4, [0, 0], 1);

    design.addPiece("Queen", 4, 9750);
    design.addMove(4, 4, [7, 7], 0);
    design.addMove(4, 4, [1, 1], 0);
    design.addMove(4, 4, [4, 4], 0);
    design.addMove(4, 4, [3, 3], 0);
    design.addMove(4, 4, [6, 6], 0);
    design.addMove(4, 4, [2, 2], 0);
    design.addMove(4, 4, [5, 5], 0);
    design.addMove(4, 4, [0, 0], 0);

    design.addPiece("King", 5, 600000);
    design.addMove(5, 6, [7], 0);
    design.addMove(5, 6, [1], 0);
    design.addMove(5, 6, [4], 0);
    design.addMove(5, 6, [3], 0);
    design.addMove(5, 6, [6], 0);
    design.addMove(5, 6, [2], 0);
    design.addMove(5, 6, [5], 0);
    design.addMove(5, 6, [0], 0);
    design.addMove(5, 7, [3, 3, 3, 4, 4], 0);
    design.addMove(5, 8, [4, 4, 4, 4, 3, 3, 3], 0);

    design.setupSelector(2);

    design.setup("White", "Pawn", 48, 1);
    design.setup("White", "Pawn", 49, 1);
    design.setup("White", "Pawn", 50, 1);
    design.setup("White", "Pawn", 51, 1);
    design.setup("White", "Pawn", 52, 1);
    design.setup("White", "Pawn", 53, 1);
    design.setup("White", "Pawn", 54, 1);
    design.setup("White", "Pawn", 55, 1);
    design.setup("White", "Rook", 56, 1);
    design.setup("White", "Rook", 63, 1);
    design.setup("White", "Knight", 57, 1);
    design.setup("White", "Knight", 62, 1);
    design.setup("White", "Bishop", 58, 1);
    design.setup("White", "Bishop", 61, 1);
    design.setup("White", "Queen", 59, 1);
    design.setup("White", "King", 60, 1);
    design.setup("Black", "Pawn", 8, 1);
    design.setup("Black", "Pawn", 9, 1);
    design.setup("Black", "Pawn", 10, 1);
    design.setup("Black", "Pawn", 11, 1);
    design.setup("Black", "Pawn", 12, 1);
    design.setup("Black", "Pawn", 13, 1);
    design.setup("Black", "Pawn", 14, 1);
    design.setup("Black", "Pawn", 15, 1);
    design.setup("Black", "Rook", 0, 1);
    design.setup("Black", "Rook", 7, 1);
    design.setup("Black", "Knight", 1, 1);
    design.setup("Black", "Knight", 6, 1);
    design.setup("Black", "Bishop", 2, 1);
    design.setup("Black", "Bishop", 5, 1);
    design.setup("Black", "Queen", 3, 1);
    design.setup("Black", "King", 4, 1);

    design.setup("White", "Pawn", 48, 2);
    design.setup("White", "Pawn", 49, 2);
    design.setup("White", "Pawn", 42, 2);
    design.setup("White", "Pawn", 35, 2);
    design.setup("White", "Pawn", 36, 2);
    design.setup("White", "Pawn", 45, 2);
    design.setup("White", "Pawn", 54, 2);
    design.setup("White", "Pawn", 55, 2);
    design.setup("White", "Bishop", 58, 2);
    design.setup("White", "Bishop", 61, 2);
    design.setup("White", "Knight", 107, 2);
    design.setup("White", "Knight", 108, 2);
    design.setup("White", "Rook", 104, 2);
    design.setup("White", "Rook", 111, 2);
    design.setup("White", "Queen", 83, 2);
    design.setup("White", "King", 59, 2);
    design.setup("Black", "Pawn", 8, 2);
    design.setup("Black", "Pawn", 9, 2);
    design.setup("Black", "Pawn", 10, 2);
    design.setup("Black", "Pawn", 11, 2);
    design.setup("Black", "Pawn", 12, 2);
    design.setup("Black", "Pawn", 13, 2);
    design.setup("Black", "Pawn", 14, 2);
    design.setup("Black", "Pawn", 15, 2);
    design.setup("Black", "Rook", 0, 2);
    design.setup("Black", "Rook", 7, 2);
    design.setup("Black", "Knight", 1, 2);
    design.setup("Black", "Knight", 6, 2);
    design.setup("Black", "Bishop", 2, 2);
    design.setup("Black", "Bishop", 5, 2);
    design.setup("Black", "King", 4, 2);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhitePawn", "White Pawn");
    view.defPiece("BlackPawn", "Black Pawn");
    view.defPiece("WhiteRook", "White Rook");
    view.defPiece("BlackRook", "Black Rook");
    view.defPiece("WhiteKnight", "White Knight");
    view.defPiece("BlackKnight", "Black Knight");
    view.defPiece("WhiteBishop", "White Bishop");
    view.defPiece("BlackBishop", "Black Bishop");
    view.defPiece("WhiteQueen", "White Queen");
    view.defPiece("BlackQueen", "Black Queen");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
 
    view.defPosition("a8", 478, 478, 68, 68);
    view.defPosition("b8", 410, 478, 68, 68);
    view.defPosition("c8", 342, 478, 68, 68);
    view.defPosition("d8", 274, 478, 68, 68);
    view.defPosition("e8", 206, 478, 68, 68);
    view.defPosition("f8", 138, 478, 68, 68);
    view.defPosition("g8", 70, 478, 68, 68);
    view.defPosition("h8", 2, 478, 68, 68);
    view.defPosition("a7", 478, 410, 68, 68);
    view.defPosition("b7", 410, 410, 68, 68);
    view.defPosition("c7", 342, 410, 68, 68);
    view.defPosition("d7", 274, 410, 68, 68);
    view.defPosition("e7", 206, 410, 68, 68);
    view.defPosition("f7", 138, 410, 68, 68);
    view.defPosition("g7", 70, 410, 68, 68);
    view.defPosition("h7", 2, 410, 68, 68);
    view.defPosition("a6", 478, 342, 68, 68);
    view.defPosition("b6", 410, 342, 68, 68);
    view.defPosition("c6", 342, 342, 68, 68);
    view.defPosition("d6", 274, 342, 68, 68);
    view.defPosition("e6", 206, 342, 68, 68);
    view.defPosition("f6", 138, 342, 68, 68);
    view.defPosition("g6", 70, 342, 68, 68);
    view.defPosition("h6", 2, 342, 68, 68);
    view.defPosition("a5", 478, 274, 68, 68);
    view.defPosition("b5", 410, 274, 68, 68);
    view.defPosition("c5", 342, 274, 68, 68);
    view.defPosition("d5", 274, 274, 68, 68);
    view.defPosition("e5", 206, 274, 68, 68);
    view.defPosition("f5", 138, 274, 68, 68);
    view.defPosition("g5", 70, 274, 68, 68);
    view.defPosition("h5", 2, 274, 68, 68);
    view.defPosition("a4", 478, 206, 68, 68);
    view.defPosition("b4", 410, 206, 68, 68);
    view.defPosition("c4", 342, 206, 68, 68);
    view.defPosition("d4", 274, 206, 68, 68);
    view.defPosition("e4", 206, 206, 68, 68);
    view.defPosition("f4", 138, 206, 68, 68);
    view.defPosition("g4", 70, 206, 68, 68);
    view.defPosition("h4", 2, 206, 68, 68);
    view.defPosition("a3", 478, 138, 68, 68);
    view.defPosition("b3", 410, 138, 68, 68);
    view.defPosition("c3", 342, 138, 68, 68);
    view.defPosition("d3", 274, 138, 68, 68);
    view.defPosition("e3", 206, 138, 68, 68);
    view.defPosition("f3", 138, 138, 68, 68);
    view.defPosition("g3", 70, 138, 68, 68);
    view.defPosition("h3", 2, 138, 68, 68);
    view.defPosition("a2", 478, 70, 68, 68);
    view.defPosition("b2", 410, 70, 68, 68);
    view.defPosition("c2", 342, 70, 68, 68);
    view.defPosition("d2", 274, 70, 68, 68);
    view.defPosition("e2", 206, 70, 68, 68);
    view.defPosition("f2", 138, 70, 68, 68);
    view.defPosition("g2", 70, 70, 68, 68);
    view.defPosition("h2", 2, 70, 68, 68);
    view.defPosition("a1", 478, 2, 68, 68);
    view.defPosition("b1", 410, 2, 68, 68);
    view.defPosition("c1", 342, 2, 68, 68);
    view.defPosition("d1", 274, 2, 68, 68);
    view.defPosition("e1", 206, 2, 68, 68);
    view.defPosition("f1", 138, 2, 68, 68);
    view.defPosition("g1", 70, 2, 68, 68);
    view.defPosition("h1", 2, 2, 68, 68);
    view.defPosition("a16", 478, 478, 68, 68);
    view.defPosition("b16", 410, 478, 68, 68);
    view.defPosition("c16", 342, 478, 68, 68);
    view.defPosition("d16", 274, 478, 68, 68);
    view.defPosition("e16", 206, 478, 68, 68);
    view.defPosition("f16", 138, 478, 68, 68);
    view.defPosition("g16", 70, 478, 68, 68);
    view.defPosition("h16", 2, 478, 68, 68);
    view.defPosition("a15", 478, 410, 68, 68);
    view.defPosition("b15", 410, 410, 68, 68);
    view.defPosition("c15", 342, 410, 68, 68);
    view.defPosition("d15", 274, 410, 68, 68);
    view.defPosition("e15", 206, 410, 68, 68);
    view.defPosition("f15", 138, 410, 68, 68);
    view.defPosition("g15", 70, 410, 68, 68);
    view.defPosition("h15", 2, 410, 68, 68);
    view.defPosition("a14", 478, 342, 68, 68);
    view.defPosition("b14", 410, 342, 68, 68);
    view.defPosition("c14", 342, 342, 68, 68);
    view.defPosition("d14", 274, 342, 68, 68);
    view.defPosition("e14", 206, 342, 68, 68);
    view.defPosition("f14", 138, 342, 68, 68);
    view.defPosition("g14", 70, 342, 68, 68);
    view.defPosition("h14", 2, 342, 68, 68);
    view.defPosition("a13", 478, 274, 68, 68);
    view.defPosition("b13", 410, 274, 68, 68);
    view.defPosition("c13", 342, 274, 68, 68);
    view.defPosition("d13", 274, 274, 68, 68);
    view.defPosition("e13", 206, 274, 68, 68);
    view.defPosition("f13", 138, 274, 68, 68);
    view.defPosition("g13", 70, 274, 68, 68);
    view.defPosition("h13", 2, 274, 68, 68);
    view.defPosition("a12", 478, 206, 68, 68);
    view.defPosition("b12", 410, 206, 68, 68);
    view.defPosition("c12", 342, 206, 68, 68);
    view.defPosition("d12", 274, 206, 68, 68);
    view.defPosition("e12", 206, 206, 68, 68);
    view.defPosition("f12", 138, 206, 68, 68);
    view.defPosition("g12", 70, 206, 68, 68);
    view.defPosition("h12", 2, 206, 68, 68);
    view.defPosition("a11", 478, 138, 68, 68);
    view.defPosition("b11", 410, 138, 68, 68);
    view.defPosition("c11", 342, 138, 68, 68);
    view.defPosition("d11", 274, 138, 68, 68);
    view.defPosition("e11", 206, 138, 68, 68);
    view.defPosition("f11", 138, 138, 68, 68);
    view.defPosition("g11", 70, 138, 68, 68);
    view.defPosition("h11", 2, 138, 68, 68);
    view.defPosition("a10", 478, 70, 68, 68);
    view.defPosition("b10", 410, 70, 68, 68);
    view.defPosition("c10", 342, 70, 68, 68);
    view.defPosition("d10", 274, 70, 68, 68);
    view.defPosition("e10", 206, 70, 68, 68);
    view.defPosition("f10", 138, 70, 68, 68);
    view.defPosition("g10", 70, 70, 68, 68);
    view.defPosition("h10", 2, 70, 68, 68);
    view.defPosition("a9", 478, 2, 68, 68);
    view.defPosition("b9", 410, 2, 68, 68);
    view.defPosition("c9", 342, 2, 68, 68);
    view.defPosition("d9", 274, 2, 68, 68);
    view.defPosition("e9", 206, 2, 68, 68);
    view.defPosition("f9", 138, 2, 68, 68);
    view.defPosition("g9", 70, 2, 68, 68);
    view.defPosition("h9", 2, 2, 68, 68);

    view.defPopup("Promote", 127, 100);
    view.defPopupPosition("X1", 10, 7, 68, 68);
    view.defPopupPosition("X2", 80, 7, 68, 68);
    view.defPopupPosition("X3", 150, 7, 68, 68);
    view.defPopupPosition("X4", 220, 7, 68, 68);
}
