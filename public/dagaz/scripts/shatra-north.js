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
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");
    design.checkVersion("show-captures", "false");
    design.checkVersion("deferred-captures", "true");
    design.checkVersion("advisor-wait", "10");

    design.addDirection("w");  // 0
    design.addDirection("e");  // 1
    design.addDirection("s");  // 2
    design.addDirection("ne"); // 3
    design.addDirection("n");  // 4
    design.addDirection("se"); // 5
    design.addDirection("sw"); // 6
    design.addDirection("nw"); // 7
    design.addDirection("nx"); // 8

    design.addPlayer("White", [1, 0, 4, 6, 2, 7, 3, 5, 8]);
    design.addPlayer("Black", [1, 0, 4, 6, 2, 7, 3, 5, 8]);

    design.addPosition("a14", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("b14", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("c14", [0, 1, 7, 0, 0, 8, 0, 0, 32]);
    design.addPosition("d14", [-1, 1, 7, 0, 0, 8, 6, 0, 31]);
    design.addPosition("e14", [-1, 0, 7, 0, 0, 0, 6, 0, 30]);
    design.addPosition("f14", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("g14", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a13", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("b13", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("c13", [0, 1, 7, -6, -7, 8, 0, 0, 25]);
    design.addPosition("d13", [-1, 1, 7, -6, -7, 8, 6, -8, 24]);
    design.addPosition("e13", [-1, 0, 7, 0, -7, 0, 6, -8, 23]);
    design.addPosition("f13", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("g13", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a12", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("b12", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("c12", [0, 1, 0, -6, -7, 8, 0, 0, 18]);
    design.addPosition("d12", [-1, 1, 7, -6, -7, 0, 0, -8, 17]);
    design.addPosition("e12", [-1, 0, 0, 0, -7, 0, 6, -8, 16]);
    design.addPosition("f12", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("g12", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a11", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("b11", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("c11", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("d11", [0, 0, 7, -6, -7, 8, 6, -8, 0]);
    design.addPosition("e11", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("f11", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("g11", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a10", [0, 1, 7, 0, 0, 8, 0, 0, 7]);
    design.addPosition("b10", [-1, 1, 7, 0, 0, 8, 6, 0, 7]);
    design.addPosition("c10", [-1, 1, 7, -6, 0, 8, 6, 0, 7]);
    design.addPosition("d10", [-1, 1, 7, 0, -7, 8, 6, 0, 0]);
    design.addPosition("e10", [-1, 1, 7, 0, 0, 8, 6, -8, 7]);
    design.addPosition("f10", [-1, 1, 7, 0, 0, 8, 6, 0, 7]);
    design.addPosition("g10", [-1, 0, 7, 0, 0, 0, 6, 0, 7]);
    design.addPosition("a9", [0, 1, 7, -6, -7, 8, 0, 0, 7]);
    design.addPosition("b9", [-1, 1, 7, -6, -7, 8, 6, -8, 7]);
    design.addPosition("c9", [-1, 1, 7, -6, -7, 8, 6, -8, 7]);
    design.addPosition("d9", [-1, 1, 7, -6, -7, 8, 6, -8, 0]);
    design.addPosition("e9", [-1, 1, 7, -6, -7, 8, 6, -8, 7]);
    design.addPosition("f9", [-1, 1, 7, -6, -7, 8, 6, -8, 7]);
    design.addPosition("g9", [-1, 0, 7, 0, -7, 0, 6, -8, 7]);
    design.addPosition("a8", [0, 1, 7, -6, -7, 8, 0, 0, 0]);
    design.addPosition("b8", [-1, 1, 7, -6, -7, 8, 6, -8, -15]);
    design.addPosition("c8", [-1, 1, 7, -6, -7, 8, 6, -8, -15]);
    design.addPosition("d8", [-1, 1, 7, -6, -7, 8, 6, -8, 0]);
    design.addPosition("e8", [-1, 1, 7, -6, -7, 8, 6, -8, -16]);
    design.addPosition("f8", [-1, 1, 7, -6, -7, 8, 6, -8, -15]);
    design.addPosition("g8", [-1, 0, 7, 0, -7, 0, 6, -8, -15]);
    design.addPosition("a7", [0, 1, 7, -6, -7, 8, 0, 0, 15]);
    design.addPosition("b7", [-1, 1, 7, -6, -7, 8, 6, -8, 15]);
    design.addPosition("c7", [-1, 1, 7, -6, -7, 8, 6, -8, 16]);
    design.addPosition("d7", [-1, 1, 7, -6, -7, 8, 6, -8, 0]);
    design.addPosition("e7", [-1, 1, 7, -6, -7, 8, 6, -8, 15]);
    design.addPosition("f7", [-1, 1, 7, -6, -7, 8, 6, -8, 15]);
    design.addPosition("g7", [-1, 0, 7, 0, -7, 0, 6, -8, 0]);
    design.addPosition("a6", [0, 1, 7, -6, -7, 8, 0, 0, -7]);
    design.addPosition("b6", [-1, 1, 7, -6, -7, 8, 6, -8, -7]);
    design.addPosition("c6", [-1, 1, 7, -6, -7, 8, 6, -8, -7]);
    design.addPosition("d6", [-1, 1, 7, -6, -7, 8, 6, -8, 0]);
    design.addPosition("e6", [-1, 1, 7, -6, -7, 8, 6, -8, -7]);
    design.addPosition("f6", [-1, 1, 7, -6, -7, 8, 6, -8, -7]);
    design.addPosition("g6", [-1, 0, 7, 0, -7, 0, 6, -8, -7]);
    design.addPosition("a5", [0, 1, 0, -6, -7, 0, 0, 0, -7]);
    design.addPosition("b5", [-1, 1, 0, -6, -7, 0, 0, -8, -7]);
    design.addPosition("c5", [-1, 1, 0, -6, -7, 8, 0, -8, -7]);
    design.addPosition("d5", [-1, 1, 7, -6, -7, 0, 0, -8, 0]);
    design.addPosition("e5", [-1, 1, 0, -6, -7, 0, 6, -8, -7]);
    design.addPosition("f5", [-1, 1, 0, -6, -7, 0, 0, -8, -7]);
    design.addPosition("g5", [-1, 0, 0, 0, -7, 0, 0, -8, -7]);
    design.addPosition("a4", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("b4", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("c4", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("d4", [0, 0, 7, -6, -7, 8, 6, -8, 0]);
    design.addPosition("e4", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("f4", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("g4", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a3", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("b3", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("c3", [0, 1, 7, -6, 0, 8, 0, 0, -16]);
    design.addPosition("d3", [-1, 1, 7, 0, -7, 8, 6, 0, -17]);
    design.addPosition("e3", [-1, 0, 7, 0, 0, 0, 6, -8, -18]);
    design.addPosition("f3", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("g3", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a2", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("b2", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("c2", [0, 1, 7, -6, -7, 8, 0, 0, -23]);
    design.addPosition("d2", [-1, 1, 7, -6, -7, 8, 6, -8, -24]);
    design.addPosition("e2", [-1, 0, 7, 0, -7, 0, 6, -8, -25]);
    design.addPosition("f2", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("g2", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("a1", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("b1", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("c1", [0, 1, 0, -6, -7, 0, 0, 0, -30]);
    design.addPosition("d1", [-1, 1, 0, -6, -7, 0, 0, -8, -31]);
    design.addPosition("e1", [-1, 0, 0, 0, -7, 0, 0, -8, -32]);
    design.addPosition("f1", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    design.addPosition("g1", [0, 1, 2, 3, 4, 5, 6, 7, 8]);

    design.addZone("fortress", 1, [93, 86, 79, 94, 87, 80, 95, 88, 81, 16, 9, 2, 17, 10, 3, 18, 11, 4]);
    design.addZone("fortress", 2, [93, 86, 79, 94, 87, 80, 95, 88, 81, 16, 9, 2, 17, 10, 3, 18, 11, 4]);
    design.addZone("home", 1, [93, 86, 79, 94, 87, 80, 95, 88, 81, 73]);
    design.addZone("home", 2, [16, 9, 2, 17, 10, 3, 18, 11, 4, 24]);
    design.addZone("promotion", 1, [2, 3, 4]);
    design.addZone("promotion", 2, [93, 94, 95]);
    design.addZone("first-rank", 1, [63, 64, 65, 66, 67, 68, 69]);
    design.addZone("first-rank", 2, [28, 29, 30, 31, 32, 33, 34]);
    design.addZone("second-rank", 1, [49, 50, 51, 52, 53, 54, 55, 42, 43, 44, 45, 46, 47, 48, 35, 36, 37, 38, 39, 40, 41, 30, 32, 24, 16, 17, 18, 9, 10, 11]);
    design.addZone("second-rank", 2, [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 65, 67, 73, 79, 80, 81, 86, 87, 88]);
    design.addZone("third-rank", 1, [42, 43, 44, 45, 46, 47, 48, 35, 36, 37, 38, 39, 40, 41, 28, 29, 30, 31, 32, 33, 34, 24, 16, 17, 18, 9, 10, 11, 2, 3, 4]);
    design.addZone("third-rank", 2, [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 73, 79, 80, 81, 86, 87, 88, 93, 94, 95]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	26);	// capture
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	2);	// promotion
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	5);
    design.addCommand(0, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(0, ZRF.MODE,	1);	// continue-type
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	3);
    design.addCommand(0, ZRF.MODE,	1);	// continue-type
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	5);	// last-to?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.LITERAL,	0);	// Man
    design.addCommand(1, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	26);	// capture
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.PARAM,	2);	// $3
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PARAM,	3);	// $4
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.MODE,	1);	// continue-type
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.IN_ZONE,	2);	// promotion
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	4);
    design.addCommand(2, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.JUMP,	2);
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.IN_ZONE,	3);	// first-rank
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.IN_ZONE,	4);	// second-rank
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.IN_ZONE,	2);	// promotion
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	4);
    design.addCommand(4, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.JUMP,	2);
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.IN_ZONE,	5);	// third-rank
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.IN_ZONE,	2);	// promotion
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.IF,	4);
    design.addCommand(5, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.JUMP,	2);
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.IN_ZONE,	0);	// fortress
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.ON_BOARD_DIR,	8);	// name
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	10);
    design.addCommand(6, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.IF,	4);
    design.addCommand(6, ZRF.FORK,	3);
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end
    design.addCommand(6, ZRF.PARAM,	1);	// $2
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.JUMP,	-11);
    design.addCommand(6, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.PARAM,	0);	// $1
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.FUNCTION,	26);	// capture
    design.addCommand(7, ZRF.PARAM,	1);	// $2
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.MODE,	1);	// continue-type
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PARAM,	0);	// $1
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addCommand(9, ZRF.FUNCTION,	24);	// from
    design.addCommand(9, ZRF.PARAM,	0);	// $1
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(9, ZRF.FUNCTION,	0);	// not
    design.addCommand(9, ZRF.IF,	7);
    design.addCommand(9, ZRF.PARAM,	1);	// $2
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(9, ZRF.FUNCTION,	0);	// not
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.JUMP,	-8);
    design.addCommand(9, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.PARAM,	2);	// $3
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(9, ZRF.FUNCTION,	0);	// not
    design.addCommand(9, ZRF.IF,	18);
    design.addCommand(9, ZRF.FUNCTION,	6);	// mark
    design.addCommand(9, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(9, ZRF.FUNCTION,	0);	// not
    design.addCommand(9, ZRF.IF,	5);
    design.addCommand(9, ZRF.PARAM,	3);	// $4
    design.addCommand(9, ZRF.FUNCTION,	23);	// opposite
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.JUMP,	-6);
    design.addCommand(9, ZRF.FUNCTION,	26);	// capture
    design.addCommand(9, ZRF.FUNCTION,	7);	// back
    design.addCommand(9, ZRF.FORK,	4);
    design.addCommand(9, ZRF.MODE,	1);	// continue-type
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.FUNCTION,	28);	// end
    design.addCommand(9, ZRF.PARAM,	4);	// $5
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.JUMP,	-19);
    design.addCommand(9, ZRF.FUNCTION,	28);	// end

    design.addCommand(10, ZRF.FUNCTION,	24);	// from
    design.addCommand(10, ZRF.PARAM,	0);	// $1
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(10, ZRF.FUNCTION,	0);	// not
    design.addCommand(10, ZRF.IF,	4);
    design.addCommand(10, ZRF.PARAM,	1);	// $2
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.JUMP,	-5);
    design.addCommand(10, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(10, ZRF.FUNCTION,	20);	// verify
    design.addCommand(10, ZRF.PARAM,	2);	// $3
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(10, ZRF.FUNCTION,	0);	// not
    design.addCommand(10, ZRF.IF,	18);
    design.addCommand(10, ZRF.FUNCTION,	6);	// mark
    design.addCommand(10, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(10, ZRF.FUNCTION,	0);	// not
    design.addCommand(10, ZRF.IF,	5);
    design.addCommand(10, ZRF.PARAM,	3);	// $4
    design.addCommand(10, ZRF.FUNCTION,	23);	// opposite
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.JUMP,	-6);
    design.addCommand(10, ZRF.FUNCTION,	26);	// capture
    design.addCommand(10, ZRF.FUNCTION,	7);	// back
    design.addCommand(10, ZRF.FORK,	4);
    design.addCommand(10, ZRF.MODE,	1);	// continue-type
    design.addCommand(10, ZRF.FUNCTION,	25);	// to
    design.addCommand(10, ZRF.FUNCTION,	28);	// end
    design.addCommand(10, ZRF.PARAM,	4);	// $5
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.JUMP,	-19);
    design.addCommand(10, ZRF.FUNCTION,	28);	// end

    design.addCommand(11, ZRF.FUNCTION,	24);	// from
    design.addCommand(11, ZRF.PARAM,	0);	// $1
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(11, ZRF.FUNCTION,	0);	// not
    design.addCommand(11, ZRF.IF,	7);
    design.addCommand(11, ZRF.FORK,	3);
    design.addCommand(11, ZRF.FUNCTION,	25);	// to
    design.addCommand(11, ZRF.FUNCTION,	28);	// end
    design.addCommand(11, ZRF.PARAM,	1);	// $2
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.JUMP,	-8);
    design.addCommand(11, ZRF.FUNCTION,	28);	// end

    design.addCommand(12, ZRF.FUNCTION,	24);	// from
    design.addCommand(12, ZRF.IN_ZONE,	1);	// home
    design.addCommand(12, ZRF.FUNCTION,	0);	// not
    design.addCommand(12, ZRF.FUNCTION,	20);	// verify
    design.addCommand(12, ZRF.PARAM,	0);	// $1
    design.addCommand(12, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(12, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(12, ZRF.FUNCTION,	20);	// verify
    design.addCommand(12, ZRF.IN_ZONE,	3);	// promotion
    design.addCommand(12, ZRF.FUNCTION,	0);	// not
    design.addCommand(12, ZRF.IF,	4);
    design.addCommand(12, ZRF.PROMOTE,	2);	// Queen
    design.addCommand(12, ZRF.FUNCTION,	25);	// to
    design.addCommand(12, ZRF.JUMP,	2);
    design.addCommand(12, ZRF.FUNCTION,	25);	// to
    design.addCommand(12, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// normal-type

    design.setupSelector(2);

    design.addPiece("Man", 0, 2);
    design.addMove(0, 0, [4, 4], 1);
    design.addMove(0, 0, [1, 1], 1);
    design.addMove(0, 0, [0, 0], 1);
    design.addMove(0, 0, [2, 2], 1);
    design.addMove(0, 0, [7, 7], 1);
    design.addMove(0, 0, [3, 3], 1);
    design.addMove(0, 0, [6, 6], 1);
    design.addMove(0, 0, [5, 5], 1);
    design.addMove(0, 0, [4, 4], 0);
    design.addMove(0, 0, [1, 1], 0);
    design.addMove(0, 0, [0, 0], 0);
    design.addMove(0, 0, [2, 2], 0);
    design.addMove(0, 0, [7, 7], 0);
    design.addMove(0, 0, [3, 3], 0);
    design.addMove(0, 0, [6, 6], 0);
    design.addMove(0, 0, [5, 5], 0);
    design.addMove(0, 1, [0, 4, 4, 0], 0, 0, 1);
    design.addMove(0, 1, [1, 4, 4, 1], 0, 0, 1);
    design.addMove(0, 2, [4], 0, 0, 1);
    design.addMove(0, 3, [4, 4], 0, 0, 1);
    design.addMove(0, 4, [7], 0, 0, 1);
    design.addMove(0, 4, [3], 0, 0, 1);
    design.addMove(0, 5, [0], 0, 0, 1);
    design.addMove(0, 5, [1], 0, 0, 1);
    design.addMove(0, 6, [8, 8], 0);
    design.addMove(0, 12, [0], 0, 0, 2);
    design.addMove(0, 12, [1], 0, 0, 2);
    design.addMove(0, 12, [3], 0, 0, 2);
    design.addMove(0, 12, [4], 0, 0, 2);
    design.addMove(0, 12, [7], 0, 0, 2);

    design.addPiece("King", 1, 1000);
    design.addMove(1, 7, [4, 4], 1);
    design.addMove(1, 7, [1, 1], 1);
    design.addMove(1, 7, [0, 0], 1);
    design.addMove(1, 7, [2, 2], 1);
    design.addMove(1, 7, [7, 7], 1);
    design.addMove(1, 7, [3, 3], 1);
    design.addMove(1, 7, [6, 6], 1);
    design.addMove(1, 7, [5, 5], 1);
    design.addMove(1, 7, [4, 4], 0);
    design.addMove(1, 7, [1, 1], 0);
    design.addMove(1, 7, [0, 0], 0);
    design.addMove(1, 7, [2, 2], 0);
    design.addMove(1, 7, [7, 7], 0);
    design.addMove(1, 7, [3, 3], 0);
    design.addMove(1, 7, [6, 6], 0);
    design.addMove(1, 7, [5, 5], 0);
    design.addMove(1, 8, [4], 0);
    design.addMove(1, 8, [1], 0);
    design.addMove(1, 8, [0], 0);
    design.addMove(1, 8, [2], 0);
    design.addMove(1, 8, [7], 0);
    design.addMove(1, 8, [3], 0);
    design.addMove(1, 8, [6], 0);
    design.addMove(1, 8, [5], 0);

    design.addPiece("Bishop", 2, 20);
    design.addMove(2, 9, [7, 7, 7, 7, 7], 1);
    design.addMove(2, 9, [3, 3, 3, 3, 3], 1);
    design.addMove(2, 9, [6, 6, 6, 6, 6], 1);
    design.addMove(2, 9, [5, 5, 5, 5, 5], 1);
    design.addMove(2, 10, [7, 7, 7, 7, 7], 0);
    design.addMove(2, 10, [3, 3, 3, 3, 3], 0);
    design.addMove(2, 10, [6, 6, 6, 6, 6], 0);
    design.addMove(2, 10, [5, 5, 5, 5, 5], 0);
    design.addMove(2, 11, [7, 7], 0);
    design.addMove(2, 11, [3, 3], 0);
    design.addMove(2, 11, [6, 6], 0);
    design.addMove(2, 11, [5, 5], 0);
    design.addMove(2, 6, [8, 8], 0);

    design.addPiece("Rook", 3, 30);
    design.addMove(3, 9, [4, 4, 4, 4, 4], 1);
    design.addMove(3, 9, [1, 1, 1, 1, 1], 1);
    design.addMove(3, 9, [0, 0, 0, 0, 0], 1);
    design.addMove(3, 9, [2, 2, 2, 2, 2], 1);
    design.addMove(3, 10, [4, 4, 4, 4, 4], 0);
    design.addMove(3, 10, [1, 1, 1, 1, 1], 0);
    design.addMove(3, 10, [0, 0, 0, 0, 0], 0);
    design.addMove(3, 10, [2, 2, 2, 2, 2], 0);
    design.addMove(3, 11, [4, 4], 0);
    design.addMove(3, 11, [1, 1], 0);
    design.addMove(3, 11, [0, 0], 0);
    design.addMove(3, 11, [2, 2], 0);
    design.addMove(3, 6, [8, 8], 0);

    design.addPiece("Queen", 4, 50);
    design.addMove(4, 9, [4, 4, 4, 4, 4], 1);
    design.addMove(4, 9, [1, 1, 1, 1, 1], 1);
    design.addMove(4, 9, [0, 0, 0, 0, 0], 1);
    design.addMove(4, 9, [2, 2, 2, 2, 2], 1);
    design.addMove(4, 9, [7, 7, 7, 7, 7], 1);
    design.addMove(4, 9, [3, 3, 3, 3, 3], 1);
    design.addMove(4, 9, [6, 6, 6, 6, 6], 1);
    design.addMove(4, 9, [5, 5, 5, 5, 5], 1);
    design.addMove(4, 10, [4, 4, 4, 4, 4], 0);
    design.addMove(4, 10, [1, 1, 1, 1, 1], 0);
    design.addMove(4, 10, [0, 0, 0, 0, 0], 0);
    design.addMove(4, 10, [2, 2, 2, 2, 2], 0);
    design.addMove(4, 10, [7, 7, 7, 7, 7], 0);
    design.addMove(4, 10, [3, 3, 3, 3, 3], 0);
    design.addMove(4, 10, [6, 6, 6, 6, 6], 0);
    design.addMove(4, 10, [5, 5, 5, 5, 5], 0);
    design.addMove(4, 11, [4, 4], 0);
    design.addMove(4, 11, [1, 1], 0);
    design.addMove(4, 11, [0, 0], 0);
    design.addMove(4, 11, [2, 2], 0);
    design.addMove(4, 11, [7, 7], 0);
    design.addMove(4, 11, [3, 3], 0);
    design.addMove(4, 11, [6, 6], 0);
    design.addMove(4, 11, [5, 5], 0);
    design.addMove(4, 6, [8, 8], 0);

    design.setup("White", "Man", 63, 1);
    design.setup("White", "Man", 64, 1);
    design.setup("White", "Man", 65, 1);
    design.setup("White", "Man", 66, 1);
    design.setup("White", "Man", 67, 1);
    design.setup("White", "Man", 68, 1);
    design.setup("White", "Man", 69, 1);
    design.setup("White", "Man", 93, 1);
    design.setup("White", "Man", 86, 1);
    design.setup("White", "Man", 95, 1);
    design.setup("White", "Man", 88, 1);
    design.setup("White", "Bishop", 79, 1);
    design.setup("White", "Bishop", 81, 1);
    design.setup("White", "Rook", 87, 1);
    design.setup("White", "Rook", 80, 1);
    design.setup("White", "Queen", 94, 1);
    design.setup("White", "King", 73, 1);
    design.setup("Black", "Man", 28, 1);
    design.setup("Black", "Man", 29, 1);
    design.setup("Black", "Man", 30, 1);
    design.setup("Black", "Man", 31, 1);
    design.setup("Black", "Man", 32, 1);
    design.setup("Black", "Man", 33, 1);
    design.setup("Black", "Man", 34, 1);
    design.setup("Black", "Man", 2, 1);
    design.setup("Black", "Man", 9, 1);
    design.setup("Black", "Man", 4, 1);
    design.setup("Black", "Man", 11, 1);
    design.setup("Black", "Bishop", 16, 1);
    design.setup("Black", "Bishop", 18, 1);
    design.setup("Black", "Rook", 17, 1);
    design.setup("Black", "Rook", 10, 1);
    design.setup("Black", "Queen", 3, 1);
    design.setup("Black", "King", 24, 1);

    design.setup("White", "Man", 63, 2);
    design.setup("White", "Man", 64, 2);
    design.setup("White", "Man", 65, 2);
    design.setup("White", "Man", 66, 2);
    design.setup("White", "Man", 67, 2);
    design.setup("White", "Man", 68, 2);
    design.setup("White", "Man", 69, 2);
    design.setup("White", "Man", 56, 2);
    design.setup("White", "Man", 57, 2);
    design.setup("White", "Man", 58, 2);
    design.setup("White", "Man", 59, 2);
    design.setup("White", "Man", 60, 2);
    design.setup("White", "Man", 61, 2);
    design.setup("White", "Man", 62, 2);
    design.setup("White", "Man", 93, 2);
    design.setup("White", "Man", 86, 2);
    design.setup("White", "Man", 95, 2);
    design.setup("White", "Man", 88, 2);
    design.setup("White", "Man", 79, 2);
    design.setup("White", "Man", 81, 2);
    design.setup("White", "Man", 87, 2);
    design.setup("White", "Man", 80, 2);
    design.setup("White", "Man", 94, 2);
    design.setup("White", "King", 73, 2);
    design.setup("Black", "Man", 28, 2);
    design.setup("Black", "Man", 29, 2);
    design.setup("Black", "Man", 30, 2);
    design.setup("Black", "Man", 31, 2);
    design.setup("Black", "Man", 32, 2);
    design.setup("Black", "Man", 33, 2);
    design.setup("Black", "Man", 34, 2);
    design.setup("Black", "Man", 35, 2);
    design.setup("Black", "Man", 36, 2);
    design.setup("Black", "Man", 37, 2);
    design.setup("Black", "Man", 38, 2);
    design.setup("Black", "Man", 39, 2);
    design.setup("Black", "Man", 40, 2);
    design.setup("Black", "Man", 41, 2);
    design.setup("Black", "Man", 2, 2);
    design.setup("Black", "Man", 9, 2);
    design.setup("Black", "Man", 4, 2);
    design.setup("Black", "Man", 11, 2);
    design.setup("Black", "Man", 16, 2);
    design.setup("Black", "Man", 18, 2);
    design.setup("Black", "Man", 17, 2);
    design.setup("Black", "Man", 10, 2);
    design.setup("Black", "Man", 3, 2);
    design.setup("Black", "King", 24, 2);
}

Dagaz.View.configure = function(view) {
    view.defBoard("WhiteBoard", 0, 0, undefined, [0]);
    view.defBoard("BlackBoard", 0, 0, undefined, [1]);
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("WhiteBishop", "White Bishop");
    view.defPiece("BlackBishop", "Black Bishop");
    view.defPiece("WhiteRook", "White Rook");
    view.defPiece("BlackRook", "Black Rook");
    view.defPiece("WhiteQueen", "White Queen");
    view.defPiece("BlackQueen", "Black Queen");
 
    view.defPosition("a14", 302, 652, 50, 50);
    view.defPosition("b14", 252, 652, 50, 50);
    view.defPosition("c14", 202, 652, 50, 50);
    view.defPosition("d14", 152, 652, 50, 50);
    view.defPosition("e14", 102, 652, 50, 50);
    view.defPosition("f14", 52, 652, 50, 50);
    view.defPosition("g14", 2, 652, 50, 50);
    view.defPosition("a13", 302, 602, 50, 50);
    view.defPosition("b13", 252, 602, 50, 50);
    view.defPosition("c13", 202, 602, 50, 50);
    view.defPosition("d13", 152, 602, 50, 50);
    view.defPosition("e13", 102, 602, 50, 50);
    view.defPosition("f13", 52, 602, 50, 50);
    view.defPosition("g13", 2, 602, 50, 50);
    view.defPosition("a12", 302, 552, 50, 50);
    view.defPosition("b12", 252, 552, 50, 50);
    view.defPosition("c12", 202, 552, 50, 50);
    view.defPosition("d12", 152, 552, 50, 50);
    view.defPosition("e12", 102, 552, 50, 50);
    view.defPosition("f12", 52, 552, 50, 50);
    view.defPosition("g12", 2, 552, 50, 50);
    view.defPosition("a11", 302, 502, 50, 50);
    view.defPosition("b11", 252, 502, 50, 50);
    view.defPosition("c11", 202, 502, 50, 50);
    view.defPosition("d11", 152, 502, 50, 50);
    view.defPosition("e11", 102, 502, 50, 50);
    view.defPosition("f11", 52, 502, 50, 50);
    view.defPosition("g11", 2, 502, 50, 50);
    view.defPosition("a10", 302, 452, 50, 50);
    view.defPosition("b10", 252, 452, 50, 50);
    view.defPosition("c10", 202, 452, 50, 50);
    view.defPosition("d10", 152, 452, 50, 50);
    view.defPosition("e10", 102, 452, 50, 50);
    view.defPosition("f10", 52, 452, 50, 50);
    view.defPosition("g10", 2, 452, 50, 50);
    view.defPosition("a9", 302, 402, 50, 50);
    view.defPosition("b9", 252, 402, 50, 50);
    view.defPosition("c9", 202, 402, 50, 50);
    view.defPosition("d9", 152, 402, 50, 50);
    view.defPosition("e9", 102, 402, 50, 50);
    view.defPosition("f9", 52, 402, 50, 50);
    view.defPosition("g9", 2, 402, 50, 50);
    view.defPosition("a8", 302, 352, 50, 50);
    view.defPosition("b8", 252, 352, 50, 50);
    view.defPosition("c8", 202, 352, 50, 50);
    view.defPosition("d8", 152, 352, 50, 50);
    view.defPosition("e8", 102, 352, 50, 50);
    view.defPosition("f8", 52, 352, 50, 50);
    view.defPosition("g8", 2, 352, 50, 50);
    view.defPosition("a7", 302, 302, 50, 50);
    view.defPosition("b7", 252, 302, 50, 50);
    view.defPosition("c7", 202, 302, 50, 50);
    view.defPosition("d7", 152, 302, 50, 50);
    view.defPosition("e7", 102, 302, 50, 50);
    view.defPosition("f7", 52, 302, 50, 50);
    view.defPosition("g7", 2, 302, 50, 50);
    view.defPosition("a6", 302, 252, 50, 50);
    view.defPosition("b6", 252, 252, 50, 50);
    view.defPosition("c6", 202, 252, 50, 50);
    view.defPosition("d6", 152, 252, 50, 50);
    view.defPosition("e6", 102, 252, 50, 50);
    view.defPosition("f6", 52, 252, 50, 50);
    view.defPosition("g6", 2, 252, 50, 50);
    view.defPosition("a5", 302, 202, 50, 50);
    view.defPosition("b5", 252, 202, 50, 50);
    view.defPosition("c5", 202, 202, 50, 50);
    view.defPosition("d5", 152, 202, 50, 50);
    view.defPosition("e5", 102, 202, 50, 50);
    view.defPosition("f5", 52, 202, 50, 50);
    view.defPosition("g5", 2, 202, 50, 50);
    view.defPosition("a4", 302, 152, 50, 50);
    view.defPosition("b4", 252, 152, 50, 50);
    view.defPosition("c4", 202, 152, 50, 50);
    view.defPosition("d4", 152, 152, 50, 50);
    view.defPosition("e4", 102, 152, 50, 50);
    view.defPosition("f4", 52, 152, 50, 50);
    view.defPosition("g4", 2, 152, 50, 50);
    view.defPosition("a3", 302, 102, 50, 50);
    view.defPosition("b3", 252, 102, 50, 50);
    view.defPosition("c3", 202, 102, 50, 50);
    view.defPosition("d3", 152, 102, 50, 50);
    view.defPosition("e3", 102, 102, 50, 50);
    view.defPosition("f3", 52, 102, 50, 50);
    view.defPosition("g3", 2, 102, 50, 50);
    view.defPosition("a2", 302, 52, 50, 50);
    view.defPosition("b2", 252, 52, 50, 50);
    view.defPosition("c2", 202, 52, 50, 50);
    view.defPosition("d2", 152, 52, 50, 50);
    view.defPosition("e2", 102, 52, 50, 50);
    view.defPosition("f2", 52, 52, 50, 50);
    view.defPosition("g2", 2, 52, 50, 50);
    view.defPosition("a1", 302, 2, 50, 50);
    view.defPosition("b1", 252, 2, 50, 50);
    view.defPosition("c1", 202, 2, 50, 50);
    view.defPosition("d1", 152, 2, 50, 50);
    view.defPosition("e1", 102, 2, 50, 50);
    view.defPosition("f1", 52, 2, 50, 50);
    view.defPosition("g1", 2, 2, 50, 50);
}
