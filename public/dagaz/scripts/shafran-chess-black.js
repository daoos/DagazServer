Dagaz.Controller.persistense = "none";

Dagaz.View.SHIFT_X = 1;
Dagaz.View.SHIFT_Y = 4;

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

    design.addDirection("se");  // 0
    design.addDirection("s");   // 1
    design.addDirection("sw");  // 2
    design.addDirection("sse"); // 3
    design.addDirection("nne"); // 4
    design.addDirection("e");   // 5
    design.addDirection("nnw"); // 6 
    design.addDirection("ssw"); // 7
    design.addDirection("w");   // 8
    design.addDirection("ne");  // 9
    design.addDirection("nw");  // 10
    design.addDirection("n");   // 11

    design.addPlayer("White", [10, 11, 9, 6, 7, 8, 3, 4, 5, 2, 0, 1]);
    design.addPlayer("Black", [10, 11, 9, 6, 7, 8, 3, 4, 5, 2, 0, 1]);

    design.addPosition("a10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e10", [1, 9, 8, 10, 0, 0, 0, 17, 0, 0, 0, 0]);
    design.addPosition("f10", [1, 9, 8, 10, 0, 0, 0, 17, 7, 0, -1, 0]);
    design.addPosition("g10", [1, 9, 8, 10, 0, 0, 0, 17, 7, 0, -1, 0]);
    design.addPosition("h10", [1, 9, 8, 10, 0, 0, 0, 17, 7, 0, -1, 0]);
    design.addPosition("i10", [0, 9, 8, 0, 0, 0, 0, 17, 7, 0, -1, 0]);
    design.addPosition("a9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d9", [1, 9, 8, 10, 0, -7, 0, 17, 0, -8, 0, 0]);
    design.addPosition("e9", [1, 9, 8, 10, 0, -7, 0, 17, 7, -8, -1, -9]);
    design.addPosition("f9", [1, 9, 8, 10, 0, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("g9", [1, 9, 8, 10, 0, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("h9", [1, 9, 8, 10, 0, 0, -10, 17, 7, -8, -1, -9]);
    design.addPosition("i9", [0, 9, 8, 0, 0, 0, -10, 17, 7, 0, -1, -9]);
    design.addPosition("a8", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b8", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c8", [1, 9, 8, 10, 0, -7, 0, 17, 0, -8, 0, 0]);
    design.addPosition("d8", [1, 9, 8, 10, -17, -7, 0, 17, 7, -8, -1, -9]);
    design.addPosition("e8", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("f8", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("g8", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("h8", [1, 9, 8, 10, -17, 0, -10, 17, 7, -8, -1, -9]);
    design.addPosition("i8", [0, 9, 8, 0, 0, 0, -10, 17, 7, 0, -1, -9]);
    design.addPosition("a7", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b7", [1, 9, 8, 10, 0, -7, 0, 17, 0, -8, 0, 0]);
    design.addPosition("c7", [1, 9, 8, 10, -17, -7, 0, 17, 7, -8, -1, -9]);
    design.addPosition("d7", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("e7", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("f7", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("g7", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("h7", [1, 9, 8, 10, -17, 0, -10, 17, 7, -8, -1, -9]);
    design.addPosition("i7", [0, 9, 8, 0, 0, 0, -10, 17, 7, 0, -1, -9]);
    design.addPosition("a6", [1, 9, 0, 10, 0, -7, 0, 0, 0, -8, 0, 0]);
    design.addPosition("b6", [1, 9, 8, 10, -17, -7, 0, 17, 0, -8, -1, -9]);
    design.addPosition("c6", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("d6", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("e6", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("f6", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("g6", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("h6", [1, 9, 8, 10, -17, 0, -10, 17, 7, -8, -1, -9]);
    design.addPosition("i6", [0, 9, 8, 0, 0, 0, -10, 17, 7, 0, -1, -9]);
    design.addPosition("a5", [1, 9, 0, 10, -17, -7, 0, 0, 0, -8, 0, -9]);
    design.addPosition("b5", [1, 9, 8, 10, -17, -7, -10, 17, 0, -8, -1, -9]);
    design.addPosition("c5", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("d5", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("e5", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("f5", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("g5", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("h5", [1, 9, 8, 0, -17, 0, -10, 17, 7, -8, -1, -9]);
    design.addPosition("i5", [0, 0, 8, 0, 0, 0, -10, 0, 7, 0, -1, -9]);
    design.addPosition("a4", [1, 9, 0, 10, -17, -7, 0, 0, 0, -8, 0, -9]);
    design.addPosition("b4", [1, 9, 8, 10, -17, -7, -10, 17, 0, -8, -1, -9]);
    design.addPosition("c4", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("d4", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("e4", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("f4", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("g4", [1, 9, 8, 0, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("h4", [0, 0, 8, 0, -17, 0, -10, 0, 7, -8, -1, -9]);
    design.addPosition("i4", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a3", [1, 9, 0, 10, -17, -7, 0, 0, 0, -8, 0, -9]);
    design.addPosition("b3", [1, 9, 8, 10, -17, -7, -10, 17, 0, -8, -1, -9]);
    design.addPosition("c3", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("d3", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("e3", [1, 9, 8, 10, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("f3", [1, 9, 8, 0, -17, -7, -10, 17, 7, -8, -1, -9]);
    design.addPosition("g3", [0, 0, 8, 0, -17, 0, -10, 0, 7, -8, -1, -9]);
    design.addPosition("h3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a2", [1, 9, 0, 10, -17, -7, 0, 0, 0, -8, 0, -9]);
    design.addPosition("b2", [1, 9, 8, 10, -17, -7, -10, 0, 0, -8, -1, -9]);
    design.addPosition("c2", [1, 9, 8, 10, -17, -7, -10, 0, 7, -8, -1, -9]);
    design.addPosition("d2", [1, 9, 8, 10, -17, -7, -10, 0, 7, -8, -1, -9]);
    design.addPosition("e2", [1, 9, 8, 0, -17, -7, -10, 0, 7, -8, -1, -9]);
    design.addPosition("f2", [0, 0, 8, 0, -17, 0, -10, 0, 7, -8, -1, -9]);
    design.addPosition("g2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a1", [1, 0, 0, 0, -17, -7, 0, 0, 0, -8, 0, -9]);
    design.addPosition("b1", [1, 0, 0, 0, -17, -7, -10, 0, 0, -8, -1, -9]);
    design.addPosition("c1", [1, 0, 0, 0, -17, -7, -10, 0, 0, -8, -1, -9]);
    design.addPosition("d1", [1, 0, 0, 0, -17, -7, -10, 0, 0, -8, -1, -9]);
    design.addPosition("e1", [0, 0, 0, 0, -17, 0, -10, 0, 0, -8, -1, -9]);
    design.addPosition("f1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X4", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    design.addZone("last-rank", 1, [36, 28, 20, 12, 4, 5, 6, 7, 8]);
    design.addZone("last-rank", 2, [81, 82, 83, 84, 85, 77, 69, 61, 53]);
    design.addZone("third-rank", 1, [64, 65, 66, 67, 59, 51, 43]);
    design.addZone("third-rank", 2, [46, 38, 30, 22, 23, 24, 25]);
    design.addZone("fourth-rank", 1, [57, 58, 50]);
    design.addZone("fourth-rank", 2, [39, 31, 32]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
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
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.IN_ZONE,	1);	// third-rank
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.IN_ZONE,	2);	// fourth-rank
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	2);	// $3
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.IN_ZONE,	0);	// last-rank
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	4);
    design.addCommand(3, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.JUMP,	2);
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	5);	// last-to?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.LITERAL,	0);	// Pawn
    design.addCommand(4, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	26);	// capture
    design.addCommand(4, ZRF.PARAM,	1);	// $2
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	6);	// mark
    design.addCommand(4, ZRF.PARAM,	2);	// $3
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	7);	// back
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	5);	// last-to?
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.LITERAL,	0);	// Pawn
    design.addCommand(5, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	26);	// capture
    design.addCommand(5, ZRF.PARAM,	1);	// $2
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	6);	// mark
    design.addCommand(5, ZRF.PARAM,	2);	// $3
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	3);	// $4
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	7);	// back
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	7);
    design.addCommand(6, ZRF.FORK,	3);
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end
    design.addCommand(6, ZRF.PARAM,	1);	// $2
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.JUMP,	-8);
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.PARAM,	0);	// $1
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.PARAM,	1);	// $2
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PARAM,	0);	// $1
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addCommand(9, ZRF.FUNCTION,	24);	// from
    design.addCommand(9, ZRF.PARAM,	0);	// $1
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.PARAM,	1);	// $2
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.PARAM,	2);	// $3
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.PARAM,	3);	// $4
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.LITERAL,	1);	// Rook
    design.addCommand(9, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.FUNCTION,	24);	// from
    design.addCommand(9, ZRF.PARAM,	4);	// $5
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.PARAM,	5);	// $6
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.PARAM,	6);	// $7
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.FUNCTION,	28);	// end

    design.addCommand(10, ZRF.FUNCTION,	24);	// from
    design.addCommand(10, ZRF.PARAM,	0);	// $1
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(10, ZRF.FUNCTION,	20);	// verify
    design.addCommand(10, ZRF.PARAM,	1);	// $2
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(10, ZRF.FUNCTION,	20);	// verify
    design.addCommand(10, ZRF.PARAM,	2);	// $3
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(10, ZRF.FUNCTION,	20);	// verify
    design.addCommand(10, ZRF.FUNCTION,	25);	// to
    design.addCommand(10, ZRF.PARAM,	3);	// $4
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(10, ZRF.FUNCTION,	20);	// verify
    design.addCommand(10, ZRF.LITERAL,	1);	// Rook
    design.addCommand(10, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(10, ZRF.FUNCTION,	20);	// verify
    design.addCommand(10, ZRF.FUNCTION,	24);	// from
    design.addCommand(10, ZRF.PARAM,	4);	// $5
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.PARAM,	5);	// $6
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	25);	// to
    design.addCommand(10, ZRF.FUNCTION,	28);	// end

    design.addPiece("Pawn", 0, 100);
    design.addMove(0, 0, [11], 0);
    design.addMove(0, 1, [11, 11], 0);
    design.addMove(0, 2, [11, 11, 11], 0);
    design.addMove(0, 3, [6], 0);
    design.addMove(0, 3, [4], 0);
    design.addMove(0, 4, [9, 11, 11], 0);
    design.addMove(0, 4, [10, 11, 11], 0);
    design.addMove(0, 5, [9, 11, 11, 11], 0);
    design.addMove(0, 5, [10, 11, 11, 11], 0);

    design.addPiece("Rook", 1, 500);
    design.addMove(1, 6, [11, 11], 0);
    design.addMove(1, 6, [1, 1], 0);
    design.addMove(1, 6, [10, 10], 0);
    design.addMove(1, 6, [9, 9], 0);
    design.addMove(1, 6, [2, 2], 0);
    design.addMove(1, 6, [0, 0], 0);

    design.addPiece("Knight", 2, 320);
    design.addMove(2, 7, [5, 9], 0);
    design.addMove(2, 7, [5, 0], 0);
    design.addMove(2, 7, [8, 10], 0);
    design.addMove(2, 7, [8, 2], 0);
    design.addMove(2, 7, [6, 11], 0);
    design.addMove(2, 7, [6, 10], 0);
    design.addMove(2, 7, [4, 11], 0);
    design.addMove(2, 7, [4, 9], 0);
    design.addMove(2, 7, [7, 1], 0);
    design.addMove(2, 7, [7, 2], 0);
    design.addMove(2, 7, [3, 1], 0);
    design.addMove(2, 7, [3, 0], 0);

    design.addPiece("Bishop", 3, 330);
    design.addMove(3, 6, [6, 6], 0);
    design.addMove(3, 6, [7, 7], 0);
    design.addMove(3, 6, [4, 4], 0);
    design.addMove(3, 6, [3, 3], 0);
    design.addMove(3, 6, [5, 5], 0);
    design.addMove(3, 6, [8, 8], 0);

    design.addPiece("Queen", 4, 900);
    design.addMove(4, 6, [11, 11], 0);
    design.addMove(4, 6, [1, 1], 0);
    design.addMove(4, 6, [8, 8], 0);
    design.addMove(4, 6, [5, 5], 0);
    design.addMove(4, 6, [10, 10], 0);
    design.addMove(4, 6, [0, 0], 0);
    design.addMove(4, 6, [2, 2], 0);
    design.addMove(4, 6, [9, 9], 0);
    design.addMove(4, 6, [6, 6], 0);
    design.addMove(4, 6, [3, 3], 0);
    design.addMove(4, 6, [7, 7], 0);
    design.addMove(4, 6, [4, 4], 0);

    design.addPiece("King", 5, 20000);
    design.addMove(5, 8, [11], 0);
    design.addMove(5, 8, [1], 0);
    design.addMove(5, 8, [8], 0);
    design.addMove(5, 8, [5], 0);
    design.addMove(5, 8, [10], 0);
    design.addMove(5, 8, [0], 0);
    design.addMove(5, 8, [2], 0);
    design.addMove(5, 8, [9], 0);
    design.addMove(5, 8, [6], 0);
    design.addMove(5, 8, [3], 0);
    design.addMove(5, 8, [7], 0);
    design.addMove(5, 8, [4], 0);
    design.addMove(5, 9, [9, 9, 9, 9, 2, 2, 2], 0);
    design.addMove(5, 9, [10, 10, 10, 10, 0, 0, 0], 0);
    design.addMove(5, 10, [9, 9, 9, 9, 2, 2], 0);
    design.addMove(5, 10, [10, 10, 10, 10, 0, 0], 0);

    design.setup("White", "Pawn", 72);
    design.setup("White", "Pawn", 73);
    design.setup("White", "Pawn", 74);
    design.setup("White", "Pawn", 75);
    design.setup("White", "Pawn", 76);
    design.setup("White", "Pawn", 68);
    design.setup("White", "Pawn", 60);
    design.setup("White", "Pawn", 52);
    design.setup("White", "Pawn", 44);
    design.setup("White", "Rook", 81);
    design.setup("White", "Rook", 53);
    design.setup("White", "Knight", 82);
    design.setup("White", "Knight", 69);
    design.setup("White", "Bishop", 83);
    design.setup("White", "Bishop", 77);
    design.setup("White", "Bishop", 61);
    design.setup("White", "Queen", 84);
    design.setup("White", "King", 85);
    design.setup("Black", "Pawn", 45);
    design.setup("Black", "Pawn", 37);
    design.setup("Black", "Pawn", 29);
    design.setup("Black", "Pawn", 21);
    design.setup("Black", "Pawn", 13);
    design.setup("Black", "Pawn", 14);
    design.setup("Black", "Pawn", 15);
    design.setup("Black", "Pawn", 16);
    design.setup("Black", "Pawn", 17);
    design.setup("Black", "Rook", 36);
    design.setup("Black", "Rook", 8);
    design.setup("Black", "Knight", 20);
    design.setup("Black", "Knight", 7);
    design.setup("Black", "Bishop", 28);
    design.setup("Black", "Bishop", 12);
    design.setup("Black", "Bishop", 6);
    design.setup("Black", "Queen", 5);
    design.setup("Black", "King", 4);
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
 
    view.defPosition("a10", 533, 838, 49, 49);
    view.defPosition("b10", 473, 803, 49, 49);
    view.defPosition("c10", 413, 768, 49, 49);
    view.defPosition("d10", 353, 733, 49, 49);
    view.defPosition("e10", 293, 698, 49, 49);
    view.defPosition("f10", 233, 663, 49, 49);
    view.defPosition("g10", 173, 628, 49, 49);
    view.defPosition("h10", 113, 593, 49, 49);
    view.defPosition("i10", 53, 558, 49, 49);
    view.defPosition("a9", 533, 768, 49, 49);
    view.defPosition("b9", 473, 733, 49, 49);
    view.defPosition("c9", 413, 698, 49, 49);
    view.defPosition("d9", 353, 663, 49, 49);
    view.defPosition("e9", 293, 628, 49, 49);
    view.defPosition("f9", 233, 593, 49, 49);
    view.defPosition("g9", 173, 558, 49, 49);
    view.defPosition("h9", 113, 523, 49, 49);
    view.defPosition("i9", 53, 488, 49, 49);
    view.defPosition("a8", 533, 698, 49, 49);
    view.defPosition("b8", 473, 663, 49, 49);
    view.defPosition("c8", 413, 628, 49, 49);
    view.defPosition("d8", 353, 593, 49, 49);
    view.defPosition("e8", 293, 558, 49, 49);
    view.defPosition("f8", 233, 523, 49, 49);
    view.defPosition("g8", 173, 488, 49, 49);
    view.defPosition("h8", 113, 453, 49, 49);
    view.defPosition("i8", 53, 418, 49, 49);
    view.defPosition("a7", 533, 628, 49, 49);
    view.defPosition("b7", 473, 593, 49, 49);
    view.defPosition("c7", 413, 558, 49, 49);
    view.defPosition("d7", 353, 523, 49, 49);
    view.defPosition("e7", 293, 488, 49, 49);
    view.defPosition("f7", 233, 453, 49, 49);
    view.defPosition("g7", 173, 418, 49, 49);
    view.defPosition("h7", 113, 383, 49, 49);
    view.defPosition("i7", 53, 348, 49, 49);
    view.defPosition("a6", 533, 558, 49, 49);
    view.defPosition("b6", 473, 523, 49, 49);
    view.defPosition("c6", 413, 488, 49, 49);
    view.defPosition("d6", 353, 453, 49, 49);
    view.defPosition("e6", 293, 418, 49, 49);
    view.defPosition("f6", 233, 383, 49, 49);
    view.defPosition("g6", 173, 348, 49, 49);
    view.defPosition("h6", 113, 313, 49, 49);
    view.defPosition("i6", 53, 278, 49, 49);
    view.defPosition("a5", 533, 488, 49, 49);
    view.defPosition("b5", 473, 453, 49, 49);
    view.defPosition("c5", 413, 418, 49, 49);
    view.defPosition("d5", 353, 383, 49, 49);
    view.defPosition("e5", 293, 348, 49, 49);
    view.defPosition("f5", 233, 313, 49, 49);
    view.defPosition("g5", 173, 278, 49, 49);
    view.defPosition("h5", 113, 243, 49, 49);
    view.defPosition("i5", 53, 208, 49, 49);
    view.defPosition("a4", 533, 418, 49, 49);
    view.defPosition("b4", 473, 383, 49, 49);
    view.defPosition("c4", 413, 348, 49, 49);
    view.defPosition("d4", 353, 313, 49, 49);
    view.defPosition("e4", 293, 278, 49, 49);
    view.defPosition("f4", 233, 243, 49, 49);
    view.defPosition("g4", 173, 208, 49, 49);
    view.defPosition("h4", 113, 173, 49, 49);
    view.defPosition("i4", 53, 138, 49, 49);
    view.defPosition("a3", 533, 348, 49, 49);
    view.defPosition("b3", 473, 313, 49, 49);
    view.defPosition("c3", 413, 278, 49, 49);
    view.defPosition("d3", 353, 243, 49, 49);
    view.defPosition("e3", 293, 208, 49, 49);
    view.defPosition("f3", 233, 173, 49, 49);
    view.defPosition("g3", 173, 138, 49, 49);
    view.defPosition("h3", 113, 103, 49, 49);
    view.defPosition("i3", 53, 68, 49, 49);
    view.defPosition("a2", 533, 278, 49, 49);
    view.defPosition("b2", 473, 243, 49, 49);
    view.defPosition("c2", 413, 208, 49, 49);
    view.defPosition("d2", 353, 173, 49, 49);
    view.defPosition("e2", 293, 138, 49, 49);
    view.defPosition("f2", 233, 103, 49, 49);
    view.defPosition("g2", 173, 68, 49, 49);
    view.defPosition("h2", 113, 33, 49, 49);
    view.defPosition("i2", 53, -2, 49, 49);
    view.defPosition("a1", 533, 208, 49, 49);
    view.defPosition("b1", 473, 173, 49, 49);
    view.defPosition("c1", 413, 138, 49, 49);
    view.defPosition("d1", 353, 103, 49, 49);
    view.defPosition("e1", 293, 68, 49, 49);
    view.defPosition("f1", 233, 33, 49, 49);
    view.defPosition("g1", 173, -2, 49, 49);
    view.defPosition("h1", 113, -37, 49, 49);
    view.defPosition("i1", 53, -72, 49, 49);

    view.defPopup("Promote", 167, 200);
    view.defPopupPosition("X1", 10, 7, 68, 68);
    view.defPopupPosition("X2", 80, 7, 68, 68);
    view.defPopupPosition("X3", 150, 7, 68, 68);
    view.defPopupPosition("X4", 220, 7, 68, 68);
}
