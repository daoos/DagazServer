Dagaz.Controller.persistense = "none";

Dagaz.View.SHIFT_X      = 1;
Dagaz.View.SHIFT_Y      = 3;

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

    design.addPosition("a11", [12, 11, 0, 23, 0, 13, 0, 0, 0, 1, 0, 0]);
    design.addPosition("b11", [12, 11, -1, 23, 0, 13, 0, 10, 0, 1, 0, 0]);
    design.addPosition("c11", [12, 11, -1, 23, 0, 13, 0, 10, 0, 1, 0, 0]);
    design.addPosition("d11", [12, 11, -1, 23, 0, 13, 0, 10, 0, 1, 0, 0]);
    design.addPosition("e11", [12, 11, -1, 23, 0, 13, 0, 10, 0, 1, 0, 0]);
    design.addPosition("f11", [12, 11, -1, 23, 0, 0, 0, 10, 0, 0, 0, 0]);
    design.addPosition("g11", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h11", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i11", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k11", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l11", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a10", [12, 11, 0, 23, -10, 13, 0, 0, 0, 1, 0, -11]);
    design.addPosition("b10", [12, 11, -1, 23, -10, 13, 0, 10, 0, 1, -12, -11]);
    design.addPosition("c10", [12, 11, -1, 23, -10, 13, 0, 10, -13, 1, -12, -11]);
    design.addPosition("d10", [12, 11, -1, 23, -10, 13, 0, 10, -13, 1, -12, -11]);
    design.addPosition("e10", [12, 11, -1, 23, -10, 13, 0, 10, -13, 1, -12, -11]);
    design.addPosition("f10", [12, 11, -1, 23, 0, 13, 0, 10, -13, 1, -12, -11]);
    design.addPosition("g10", [12, 11, -1, 23, 0, 0, 0, 10, -13, 0, -12, 0]);
    design.addPosition("h10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a9", [12, 11, 0, 23, -10, 13, 0, 0, 0, 1, 0, -11]);
    design.addPosition("b9", [12, 11, -1, 23, -10, 13, -23, 10, 0, 1, -12, -11]);
    design.addPosition("c9", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("d9", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("e9", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("f9", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("g9", [12, 11, -1, 23, 0, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("h9", [12, 11, -1, 23, 0, 0, 0, 10, -13, 0, -12, 0]);
    design.addPosition("i9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a8", [12, 11, 0, 23, -10, 13, 0, 0, 0, 1, 0, -11]);
    design.addPosition("b8", [12, 11, -1, 23, -10, 13, -23, 10, 0, 1, -12, -11]);
    design.addPosition("c8", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("d8", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("e8", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("f8", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("g8", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("h8", [12, 11, -1, 23, 0, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("i8", [12, 11, -1, 23, 0, 0, 0, 10, -13, 0, -12, 0]);
    design.addPosition("k8", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l8", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a7", [12, 11, 0, 23, -10, 13, 0, 0, 0, 1, 0, -11]);
    design.addPosition("b7", [12, 11, -1, 23, -10, 13, -23, 10, 0, 1, -12, -11]);
    design.addPosition("c7", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("d7", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("e7", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("f7", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("g7", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("h7", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("i7", [12, 11, -1, 23, 0, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("k7", [12, 11, -1, 23, 0, 0, 0, 10, -13, 0, -12, 0]);
    design.addPosition("l7", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a6", [12, 0, 0, 0, -10, 13, 0, 0, 0, 1, 0, -11]);
    design.addPosition("b6", [12, 11, -1, 23, -10, 13, -23, 0, 0, 1, -12, -11]);
    design.addPosition("c6", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("d6", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("e6", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("f6", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("g6", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("h6", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("i6", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("k6", [12, 11, -1, 23, 0, 0, -23, 10, -13, 1, -12, -11]);
    design.addPosition("l6", [0, 11, -1, 0, 0, 0, 0, 10, -13, 0, -12, 0]);
    design.addPosition("a5", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b5", [12, 0, 0, 0, -10, 13, -23, 0, 0, 1, -12, -11]);
    design.addPosition("c5", [12, 11, -1, 23, -10, 13, -23, 0, -13, 1, -12, -11]);
    design.addPosition("d5", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("e5", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("f5", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("g5", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("h5", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("i5", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("k5", [12, 11, -1, 23, -10, 0, -23, 10, -13, 1, -12, -11]);
    design.addPosition("l5", [0, 11, -1, 0, 0, 0, -23, 10, -13, 0, -12, -11]);
    design.addPosition("a4", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b4", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c4", [12, 0, 0, 0, -10, 13, -23, 0, 0, 1, -12, -11]);
    design.addPosition("d4", [12, 11, -1, 23, -10, 13, -23, 0, -13, 1, -12, -11]);
    design.addPosition("e4", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("f4", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("g4", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("h4", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("i4", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("k4", [12, 11, -1, 23, -10, 0, -23, 10, -13, 1, -12, -11]);
    design.addPosition("l4", [0, 11, -1, 0, 0, 0, -23, 10, -13, 0, -12, -11]);
    design.addPosition("a3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d3", [12, 0, 0, 0, -10, 13, -23, 0, 0, 1, -12, -11]);
    design.addPosition("e3", [12, 11, -1, 23, -10, 13, -23, 0, -13, 1, -12, -11]);
    design.addPosition("f3", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("g3", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("h3", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("i3", [12, 11, -1, 23, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("k3", [12, 11, -1, 23, -10, 0, -23, 10, -13, 1, -12, -11]);
    design.addPosition("l3", [0, 11, -1, 0, 0, 0, -23, 10, -13, 0, -12, -11]);
    design.addPosition("a2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e2", [12, 0, 0, 0, -10, 13, -23, 0, 0, 1, -12, -11]);
    design.addPosition("f2", [12, 11, -1, 0, -10, 13, -23, 0, -13, 1, -12, -11]);
    design.addPosition("g2", [12, 11, -1, 0, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("h2", [12, 11, -1, 0, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("i2", [12, 11, -1, 0, -10, 13, -23, 10, -13, 1, -12, -11]);
    design.addPosition("k2", [12, 11, -1, 0, -10, 0, -23, 10, -13, 1, -12, -11]);
    design.addPosition("l2", [0, 11, -1, 0, 0, 0, -23, 10, -13, 0, -12, -11]);
    design.addPosition("a1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f1", [0, 0, 0, 0, -10, 0, -23, 0, 0, 1, -12, -11]);
    design.addPosition("g1", [0, 0, -1, 0, -10, 0, -23, 0, -13, 1, -12, -11]);
    design.addPosition("h1", [0, 0, -1, 0, -10, 0, -23, 0, -13, 1, -12, -11]);
    design.addPosition("i1", [0, 0, -1, 0, -10, 0, -23, 0, -13, 1, -12, -11]);
    design.addPosition("k1", [0, 0, -1, 0, -10, 0, -23, 0, -13, 1, -12, -11]);
    design.addPosition("l1", [0, 0, -1, 0, 0, 0, -23, 0, -13, 0, -12, -11]);
    design.addPosition("X1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X4", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5, 17, 29, 41, 53, 65]);
    design.addZone("last-rank", 2, [55, 67, 79, 91, 103, 115, 116, 117, 118, 119, 120]);
    design.addZone("third-rank", 1, [44, 56, 57, 69, 70, 82, 83, 95, 96, 108, 109]);
    design.addZone("third-rank", 2, [11, 12, 24, 25, 37, 38, 50, 51, 63, 64, 76]);

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
    design.addCommand(2, ZRF.FUNCTION,	2);	// enemy?
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
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	7);
    design.addCommand(4, ZRF.FORK,	3);
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end
    design.addCommand(4, ZRF.PARAM,	1);	// $2
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-8);
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.PARAM,	1);	// $2
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addPiece("Pawn", 0, 100);
    design.addMove(0, 0, [11], 0);
    design.addMove(0, 1, [11, 11], 0);
    design.addMove(0, 2, [6], 0);
    design.addMove(0, 2, [4], 0);
    design.addMove(0, 3, [9, 11, 11], 0);
    design.addMove(0, 3, [10, 11, 11], 0);

    design.addPiece("Rook", 1, 500);
    design.addMove(1, 4, [11, 11], 0);
    design.addMove(1, 4, [1, 1], 0);
    design.addMove(1, 4, [10, 10], 0);
    design.addMove(1, 4, [9, 9], 0);
    design.addMove(1, 4, [2, 2], 0);
    design.addMove(1, 4, [0, 0], 0);

    design.addPiece("Knight", 2, 320);
    design.addMove(2, 5, [5, 9], 0);
    design.addMove(2, 5, [5, 0], 0);
    design.addMove(2, 5, [8, 10], 0);
    design.addMove(2, 5, [8, 2], 0);
    design.addMove(2, 5, [6, 11], 0);
    design.addMove(2, 5, [6, 10], 0);
    design.addMove(2, 5, [4, 11], 0);
    design.addMove(2, 5, [4, 9], 0);
    design.addMove(2, 5, [7, 1], 0);
    design.addMove(2, 5, [7, 2], 0);
    design.addMove(2, 5, [3, 1], 0);
    design.addMove(2, 5, [3, 0], 0);

    design.addPiece("Bishop", 3, 330);
    design.addMove(3, 4, [6, 6], 0);
    design.addMove(3, 4, [7, 7], 0);
    design.addMove(3, 4, [4, 4], 0);
    design.addMove(3, 4, [3, 3], 0);
    design.addMove(3, 4, [5, 5], 0);
    design.addMove(3, 4, [8, 8], 0);

    design.addPiece("Queen", 4, 900);
    design.addMove(4, 4, [11, 11], 0);
    design.addMove(4, 4, [1, 1], 0);
    design.addMove(4, 4, [8, 8], 0);
    design.addMove(4, 4, [5, 5], 0);
    design.addMove(4, 4, [10, 10], 0);
    design.addMove(4, 4, [0, 0], 0);
    design.addMove(4, 4, [2, 2], 0);
    design.addMove(4, 4, [9, 9], 0);
    design.addMove(4, 4, [6, 6], 0);
    design.addMove(4, 4, [3, 3], 0);
    design.addMove(4, 4, [7, 7], 0);
    design.addMove(4, 4, [4, 4], 0);

    design.addPiece("King", 5, 20000);
    design.addMove(5, 6, [11], 0);
    design.addMove(5, 6, [1], 0);
    design.addMove(5, 6, [8], 0);
    design.addMove(5, 6, [5], 0);
    design.addMove(5, 6, [10], 0);
    design.addMove(5, 6, [0], 0);
    design.addMove(5, 6, [2], 0);
    design.addMove(5, 6, [9], 0);
    design.addMove(5, 6, [6], 0);
    design.addMove(5, 6, [3], 0);
    design.addMove(5, 6, [7], 0);
    design.addMove(5, 6, [4], 0);

    design.setup("White", "Pawn", 55);
    design.setup("White", "Pawn", 67);
    design.setup("White", "Pawn", 68);
    design.setup("White", "Pawn", 80);
    design.setup("White", "Pawn", 81);
    design.setup("White", "Pawn", 93);
    design.setup("White", "Pawn", 94);
    design.setup("White", "Pawn", 106);
    design.setup("White", "Pawn", 107);
    design.setup("White", "Pawn", 119);
    design.setup("White", "Pawn", 120);
    design.setup("White", "Rook", 91);
    design.setup("White", "Rook", 117);
    design.setup("White", "Knight", 79);
    design.setup("White", "Knight", 92);
    design.setup("White", "Knight", 105);
    design.setup("White", "Bishop", 103);
    design.setup("White", "Bishop", 104);
    design.setup("White", "Bishop", 118);
    design.setup("White", "Queen", 116);
    design.setup("White", "King", 115);
    design.setup("Black", "Pawn", 0);
    design.setup("Black", "Pawn", 1);
    design.setup("Black", "Pawn", 13);
    design.setup("Black", "Pawn", 14);
    design.setup("Black", "Pawn", 26);
    design.setup("Black", "Pawn", 27);
    design.setup("Black", "Pawn", 39);
    design.setup("Black", "Pawn", 40);
    design.setup("Black", "Pawn", 52);
    design.setup("Black", "Pawn", 53);
    design.setup("Black", "Pawn", 65);
    design.setup("Black", "Rook", 3);
    design.setup("Black", "Rook", 29);
    design.setup("Black", "Knight", 15);
    design.setup("Black", "Knight", 28);
    design.setup("Black", "Knight", 41);
    design.setup("Black", "Bishop", 2);
    design.setup("Black", "Bishop", 16);
    design.setup("Black", "Bishop", 17);
    design.setup("Black", "Queen", 4);
    design.setup("Black", "King", 5);
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
 
    view.defPosition("a11", 648, 587, 49, 49);
    view.defPosition("b11", 588, 622, 49, 49);
    view.defPosition("c11", 528, 657, 49, 49);
    view.defPosition("d11", 468, 692, 49, 49);
    view.defPosition("e11", 408, 727, 49, 49);
    view.defPosition("f11", 348, 762, 49, 49);
    view.defPosition("g11", 288, 797, 49, 49);
    view.defPosition("h11", 228, 832, 49, 49);
    view.defPosition("i11", 168, 867, 49, 49);
    view.defPosition("k11", 108, 902, 49, 49);
    view.defPosition("l11", 48, 937, 49, 49);
    view.defPosition("a10", 648, 517, 49, 49);
    view.defPosition("b10", 588, 552, 49, 49);
    view.defPosition("c10", 528, 587, 49, 49);
    view.defPosition("d10", 468, 622, 49, 49);
    view.defPosition("e10", 408, 657, 49, 49);
    view.defPosition("f10", 348, 692, 49, 49);
    view.defPosition("g10", 288, 727, 49, 49);
    view.defPosition("h10", 228, 762, 49, 49);
    view.defPosition("i10", 168, 797, 49, 49);
    view.defPosition("k10", 108, 832, 49, 49);
    view.defPosition("l10", 48, 867, 49, 49);
    view.defPosition("a9", 648, 447, 49, 49);
    view.defPosition("b9", 588, 482, 49, 49);
    view.defPosition("c9", 528, 517, 49, 49);
    view.defPosition("d9", 468, 552, 49, 49);
    view.defPosition("e9", 408, 587, 49, 49);
    view.defPosition("f9", 348, 622, 49, 49);
    view.defPosition("g9", 288, 657, 49, 49);
    view.defPosition("h9", 228, 692, 49, 49);
    view.defPosition("i9", 168, 727, 49, 49);
    view.defPosition("k9", 108, 762, 49, 49);
    view.defPosition("l9", 48, 797, 49, 49);
    view.defPosition("a8", 648, 377, 49, 49);
    view.defPosition("b8", 588, 412, 49, 49);
    view.defPosition("c8", 528, 447, 49, 49);
    view.defPosition("d8", 468, 482, 49, 49);
    view.defPosition("e8", 408, 517, 49, 49);
    view.defPosition("f8", 348, 552, 49, 49);
    view.defPosition("g8", 288, 587, 49, 49);
    view.defPosition("h8", 228, 622, 49, 49);
    view.defPosition("i8", 168, 657, 49, 49);
    view.defPosition("k8", 108, 692, 49, 49);
    view.defPosition("l8", 48, 727, 49, 49);
    view.defPosition("a7", 648, 307, 49, 49);
    view.defPosition("b7", 588, 342, 49, 49);
    view.defPosition("c7", 528, 377, 49, 49);
    view.defPosition("d7", 468, 412, 49, 49);
    view.defPosition("e7", 408, 447, 49, 49);
    view.defPosition("f7", 348, 482, 49, 49);
    view.defPosition("g7", 288, 517, 49, 49);
    view.defPosition("h7", 228, 552, 49, 49);
    view.defPosition("i7", 168, 587, 49, 49);
    view.defPosition("k7", 108, 622, 49, 49);
    view.defPosition("l7", 48, 657, 49, 49);
    view.defPosition("a6", 648, 237, 49, 49);
    view.defPosition("b6", 588, 272, 49, 49);
    view.defPosition("c6", 528, 307, 49, 49);
    view.defPosition("d6", 468, 342, 49, 49);
    view.defPosition("e6", 408, 377, 49, 49);
    view.defPosition("f6", 348, 412, 49, 49);
    view.defPosition("g6", 288, 447, 49, 49);
    view.defPosition("h6", 228, 482, 49, 49);
    view.defPosition("i6", 168, 517, 49, 49);
    view.defPosition("k6", 108, 552, 49, 49);
    view.defPosition("l6", 48, 587, 49, 49);
    view.defPosition("a5", 648, 167, 49, 49);
    view.defPosition("b5", 588, 202, 49, 49);
    view.defPosition("c5", 528, 237, 49, 49);
    view.defPosition("d5", 468, 272, 49, 49);
    view.defPosition("e5", 408, 307, 49, 49);
    view.defPosition("f5", 348, 342, 49, 49);
    view.defPosition("g5", 288, 377, 49, 49);
    view.defPosition("h5", 228, 412, 49, 49);
    view.defPosition("i5", 168, 447, 49, 49);
    view.defPosition("k5", 108, 482, 49, 49);
    view.defPosition("l5", 48, 517, 49, 49);
    view.defPosition("a4", 648, 97, 49, 49);
    view.defPosition("b4", 588, 132, 49, 49);
    view.defPosition("c4", 528, 167, 49, 49);
    view.defPosition("d4", 468, 202, 49, 49);
    view.defPosition("e4", 408, 237, 49, 49);
    view.defPosition("f4", 348, 272, 49, 49);
    view.defPosition("g4", 288, 307, 49, 49);
    view.defPosition("h4", 228, 342, 49, 49);
    view.defPosition("i4", 168, 377, 49, 49);
    view.defPosition("k4", 108, 412, 49, 49);
    view.defPosition("l4", 48, 447, 49, 49);
    view.defPosition("a3", 648, 27, 49, 49);
    view.defPosition("b3", 588, 62, 49, 49);
    view.defPosition("c3", 528, 97, 49, 49);
    view.defPosition("d3", 468, 132, 49, 49);
    view.defPosition("e3", 408, 167, 49, 49);
    view.defPosition("f3", 348, 202, 49, 49);
    view.defPosition("g3", 288, 237, 49, 49);
    view.defPosition("h3", 228, 272, 49, 49);
    view.defPosition("i3", 168, 307, 49, 49);
    view.defPosition("k3", 108, 342, 49, 49);
    view.defPosition("l3", 48, 377, 49, 49);
    view.defPosition("a2", 648, -43, 49, 49);
    view.defPosition("b2", 588, -8, 49, 49);
    view.defPosition("c2", 528, 27, 49, 49);
    view.defPosition("d2", 468, 62, 49, 49);
    view.defPosition("e2", 408, 97, 49, 49);
    view.defPosition("f2", 348, 132, 49, 49);
    view.defPosition("g2", 288, 167, 49, 49);
    view.defPosition("h2", 228, 202, 49, 49);
    view.defPosition("i2", 168, 237, 49, 49);
    view.defPosition("k2", 108, 272, 49, 49);
    view.defPosition("l2", 48, 307, 49, 49);
    view.defPosition("a1", 648, -113, 49, 49);
    view.defPosition("b1", 588, -78, 49, 49);
    view.defPosition("c1", 528, -43, 49, 49);
    view.defPosition("d1", 468, -8, 49, 49);
    view.defPosition("e1", 408, 27, 49, 49);
    view.defPosition("f1", 348, 62, 49, 49);
    view.defPosition("g1", 288, 97, 49, 49);
    view.defPosition("h1", 228, 132, 49, 49);
    view.defPosition("i1", 168, 167, 49, 49);
    view.defPosition("k1", 108, 202, 49, 49);
    view.defPosition("l1", 48, 237, 49, 49);

    view.defPopup("Promote", 226, 200);
    view.defPopupPosition("X1", 10, 7, 68, 68);
    view.defPopupPosition("X2", 80, 7, 68, 68);
    view.defPopupPosition("X3", 150, 7, 68, 68);
    view.defPopupPosition("X4", 220, 7, 68, 68);
}
