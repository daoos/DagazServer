Dagaz.Controller.persistense = "none";

Dagaz.Model.WIDTH  = 7;
Dagaz.Model.HEIGHT = 13;

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
    design.checkVersion("smart-moves", "true");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");
    design.checkVersion("deferred-captures", "true");
    design.checkVersion("advisor-wait", "25");

    design.addDirection("se");
    design.addDirection("s");
    design.addDirection("sw");
    design.addDirection("ne");
    design.addDirection("nw");
    design.addDirection("n");

    design.addPlayer("White", [4, 5, 3, 2, 0, 1]);
    design.addPlayer("Black", [4, 5, 3, 2, 0, 1]);

    design.addPosition("a13", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b13", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c13", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d13", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e13", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f13", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g13", [7, 13, 6, 0, 0, 0]);
    design.addPosition("a12", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b12", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c12", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d12", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e12", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f12", [7, 13, 6, -6, 0, 0]);
    design.addPosition("g12", [7, 13, 6, 0, -7, 0]);
    design.addPosition("a11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d11", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e11", [7, 13, 6, -6, 0, 0]);
    design.addPosition("f11", [7, 13, 6, -6, -7, -13]);
    design.addPosition("g11", [7, 13, 6, 0, -7, 0]);
    design.addPosition("a10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c10", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d10", [7, 13, 0, -6, 0, 0]);
    design.addPosition("e10", [7, 13, 6, -6, -7, -13]);
    design.addPosition("f10", [7, 13, 6, -6, -7, -13]);
    design.addPosition("g10", [0, 13, 6, 0, -7, 0]);
    design.addPosition("a9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d9", [7, 13, 6, -6, -7, -13]);
    design.addPosition("e9", [7, 13, 6, -6, -7, -13]);
    design.addPosition("f9", [7, 13, 6, -6, -7, -13]);
    design.addPosition("g9", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c8", [7, 13, 0, -6, 0, -13]);
    design.addPosition("d8", [7, 13, 6, -6, -7, -13]);
    design.addPosition("e8", [7, 13, 6, -6, -7, -13]);
    design.addPosition("f8", [0, 13, 6, 0, -7, -13]);
    design.addPosition("g8", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c7", [7, 13, 6, -6, -7, -13]);
    design.addPosition("d7", [7, 13, 6, -6, -7, -13]);
    design.addPosition("e7", [7, 13, 6, -6, -7, -13]);
    design.addPosition("f7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g7", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b6", [7, 13, 0, -6, 0, -13]);
    design.addPosition("c6", [7, 13, 6, -6, -7, -13]);
    design.addPosition("d6", [7, 13, 6, -6, -7, -13]);
    design.addPosition("e6", [0, 13, 6, 0, -7, -13]);
    design.addPosition("f6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g6", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a5", [0, 0, 0, 0, 0, 0]);
    design.addPosition("b5", [7, 13, 6, -6, -7, -13]);
    design.addPosition("c5", [7, 13, 6, -6, -7, -13]);
    design.addPosition("d5", [7, 13, 6, -6, -7, -13]);
    design.addPosition("e5", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f5", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g5", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a4", [7, 0, 0, -6, 0, -13]);
    design.addPosition("b4", [7, 13, 6, -6, -7, -13]);
    design.addPosition("c4", [7, 13, 6, -6, -7, -13]);
    design.addPosition("d4", [0, 0, 6, 0, -7, -13]);
    design.addPosition("e4", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f4", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g4", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a3", [7, 0, 0, -6, -7, -13]);
    design.addPosition("b3", [7, 13, 6, -6, -7, -13]);
    design.addPosition("c3", [0, 0, 6, -6, -7, -13]);
    design.addPosition("d3", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e3", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f3", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g3", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a2", [7, 0, 0, -6, -7, -13]);
    design.addPosition("b2", [0, 0, 6, -6, -7, -13]);
    design.addPosition("c2", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d2", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e2", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f2", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g2", [0, 0, 0, 0, 0, 0]);
    design.addPosition("a1", [0, 0, 0, -6, -7, -13]);
    design.addPosition("b1", [0, 0, 0, 0, 0, 0]);
    design.addPosition("c1", [0, 0, 0, 0, 0, 0]);
    design.addPosition("d1", [0, 0, 0, 0, 0, 0]);
    design.addPosition("e1", [0, 0, 0, 0, 0, 0]);
    design.addPosition("f1", [0, 0, 0, 0, 0, 0]);
    design.addPosition("g1", [0, 0, 0, 0, 0, 0]);

    design.addZone("promotion", 1, [6]);
    design.addZone("promotion", 2, [84]);

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
    design.addCommand(0, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.MODE,	1);	// King
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	3);
    design.addCommand(0, ZRF.MODE,	0);	// jump-type
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.IF,	4);
    design.addCommand(1, ZRF.PROMOTE,	1);	// King
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.JUMP,	2);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	4);
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-5);
    design.addCommand(2, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	2);	// $3
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	18);
    design.addCommand(2, ZRF.FUNCTION,	6);	// mark
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	5);
    design.addCommand(2, ZRF.PARAM,	3);	// $4
    design.addCommand(2, ZRF.FUNCTION,	23);	// opposite
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-6);
    design.addCommand(2, ZRF.FUNCTION,	26);	// capture
    design.addCommand(2, ZRF.FUNCTION,	7);	// back
    design.addCommand(2, ZRF.FORK,	4);
    design.addCommand(2, ZRF.MODE,	2);	// cont-type
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end
    design.addCommand(2, ZRF.PARAM,	4);	// $5
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-19);
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	7);
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.JUMP,	-8);
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.PARAM,	2);	// $3
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	18);
    design.addCommand(3, ZRF.FUNCTION,	6);	// mark
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	5);
    design.addCommand(3, ZRF.PARAM,	3);	// $4
    design.addCommand(3, ZRF.FUNCTION,	23);	// opposite
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.JUMP,	-6);
    design.addCommand(3, ZRF.FUNCTION,	26);	// capture
    design.addCommand(3, ZRF.FUNCTION,	7);	// back
    design.addCommand(3, ZRF.FORK,	4);
    design.addCommand(3, ZRF.MODE,	2);	// cont-type
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end
    design.addCommand(3, ZRF.PARAM,	4);	// $5
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.JUMP,	-19);
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
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// jump-type
    design.addPriority(1);			// normal-type

    design.addPiece("Man", 0, 20);
    design.addMove(0, 0, [4, 4], 0);
    design.addMove(0, 0, [3, 3], 0);
    design.addMove(0, 0, [2, 2], 0);
    design.addMove(0, 0, [0, 0], 0);
    design.addMove(0, 0, [5, 5], 0);
    design.addMove(0, 0, [1, 1], 0);
    design.addMove(0, 1, [4], 1);
    design.addMove(0, 1, [3], 1);
    design.addMove(0, 1, [5], 1);

    design.addPiece("King", 1, 100);
    design.addMove(1, 2, [4, 4, 4, 4, 4], 0);
    design.addMove(1, 2, [3, 3, 3, 3, 3], 0);
    design.addMove(1, 2, [2, 2, 2, 2, 2], 0);
    design.addMove(1, 2, [0, 0, 0, 0, 0], 0);
    design.addMove(1, 2, [5, 5, 5, 5, 5], 0);
    design.addMove(1, 2, [1, 1, 1, 1, 1], 0);
    design.addMove(1, 3, [4, 4, 4, 4, 4], 2);
    design.addMove(1, 3, [3, 3, 3, 3, 3], 2);
    design.addMove(1, 3, [2, 2, 2, 2, 2], 2);
    design.addMove(1, 3, [0, 0, 0, 0, 0], 2);
    design.addMove(1, 3, [5, 5, 5, 5, 5], 2);
    design.addMove(1, 3, [1, 1, 1, 1, 1], 2);
    design.addMove(1, 4, [4, 4], 1);
    design.addMove(1, 4, [3, 3], 1);
    design.addMove(1, 4, [2, 2], 1);
    design.addMove(1, 4, [0, 0], 1);
    design.addMove(1, 4, [5, 5], 1);
    design.addMove(1, 4, [1, 1], 1);

    design.setup("White", "Man", 57);
    design.setup("White", "Man", 58);
    design.setup("White", "Man", 59);
    design.setup("White", "Man", 63);
    design.setup("White", "Man", 64);
    design.setup("White", "Man", 65);
    design.setup("White", "Man", 66);
    design.setup("White", "Man", 70);
    design.setup("White", "Man", 71);
    design.setup("White", "Man", 72);
    design.setup("White", "Man", 77);
    design.setup("White", "Man", 78);
    design.setup("White", "Man", 84);
    design.setup("Black", "Man", 31);
    design.setup("Black", "Man", 32);
    design.setup("Black", "Man", 33);
    design.setup("Black", "Man", 24);
    design.setup("Black", "Man", 25);
    design.setup("Black", "Man", 26);
    design.setup("Black", "Man", 27);
    design.setup("Black", "Man", 18);
    design.setup("Black", "Man", 19);
    design.setup("Black", "Man", 20);
    design.setup("Black", "Man", 12);
    design.setup("Black", "Man", 13);
    design.setup("Black", "Man", 6);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
 
    view.defPosition("a13", 734, 346, 42, 42);
    view.defPosition("b13", 638, 346, 42, 42);
    view.defPosition("c13", 542, 346, 42, 42);
    view.defPosition("d13", 446, 346, 42, 42);
    view.defPosition("e13", 350, 346, 42, 42);
    view.defPosition("f13", 254, 346, 42, 42);
    view.defPosition("g13", 158, 346, 42, 42);
    view.defPosition("a12", 686, 318, 42, 42);
    view.defPosition("b12", 590, 318, 42, 42);
    view.defPosition("c12", 494, 318, 42, 42);
    view.defPosition("d12", 398, 318, 42, 42);
    view.defPosition("e12", 302, 318, 42, 42);
    view.defPosition("f12", 206, 318, 42, 42);
    view.defPosition("g12", 110, 318, 42, 42);
    view.defPosition("a11", 638, 290, 42, 42);
    view.defPosition("b11", 542, 290, 42, 42);
    view.defPosition("c11", 446, 290, 42, 42);
    view.defPosition("d11", 350, 290, 42, 42);
    view.defPosition("e11", 254, 290, 42, 42);
    view.defPosition("f11", 158, 290, 42, 42);
    view.defPosition("g11", 62, 290, 42, 42);
    view.defPosition("a10", 590, 262, 42, 42);
    view.defPosition("b10", 494, 262, 42, 42);
    view.defPosition("c10", 398, 262, 42, 42);
    view.defPosition("d10", 302, 262, 42, 42);
    view.defPosition("e10", 206, 262, 42, 42);
    view.defPosition("f10", 110, 262, 42, 42);
    view.defPosition("g10", 14, 262, 42, 42);
    view.defPosition("a9", 542, 234, 42, 42);
    view.defPosition("b9", 446, 234, 42, 42);
    view.defPosition("c9", 350, 234, 42, 42);
    view.defPosition("d9", 254, 234, 42, 42);
    view.defPosition("e9", 158, 234, 42, 42);
    view.defPosition("f9", 62, 234, 42, 42);
    view.defPosition("g9", -34, 234, 42, 42);
    view.defPosition("a8", 494, 206, 42, 42);
    view.defPosition("b8", 398, 206, 42, 42);
    view.defPosition("c8", 302, 206, 42, 42);
    view.defPosition("d8", 206, 206, 42, 42);
    view.defPosition("e8", 110, 206, 42, 42);
    view.defPosition("f8", 14, 206, 42, 42);
    view.defPosition("g8", -82, 206, 42, 42);
    view.defPosition("a7", 446, 178, 42, 42);
    view.defPosition("b7", 350, 178, 42, 42);
    view.defPosition("c7", 254, 178, 42, 42);
    view.defPosition("d7", 158, 178, 42, 42);
    view.defPosition("e7", 62, 178, 42, 42);
    view.defPosition("f7", -34, 178, 42, 42);
    view.defPosition("g7", -130, 178, 42, 42);
    view.defPosition("a6", 398, 150, 42, 42);
    view.defPosition("b6", 302, 150, 42, 42);
    view.defPosition("c6", 206, 150, 42, 42);
    view.defPosition("d6", 110, 150, 42, 42);
    view.defPosition("e6", 14, 150, 42, 42);
    view.defPosition("f6", -82, 150, 42, 42);
    view.defPosition("g6", -178, 150, 42, 42);
    view.defPosition("a5", 350, 122, 42, 42);
    view.defPosition("b5", 254, 122, 42, 42);
    view.defPosition("c5", 158, 122, 42, 42);
    view.defPosition("d5", 62, 122, 42, 42);
    view.defPosition("e5", -34, 122, 42, 42);
    view.defPosition("f5", -130, 122, 42, 42);
    view.defPosition("g5", -226, 122, 42, 42);
    view.defPosition("a4", 302, 94, 42, 42);
    view.defPosition("b4", 206, 94, 42, 42);
    view.defPosition("c4", 110, 94, 42, 42);
    view.defPosition("d4", 14, 94, 42, 42);
    view.defPosition("e4", -82, 94, 42, 42);
    view.defPosition("f4", -178, 94, 42, 42);
    view.defPosition("g4", -274, 94, 42, 42);
    view.defPosition("a3", 254, 66, 42, 42);
    view.defPosition("b3", 158, 66, 42, 42);
    view.defPosition("c3", 62, 66, 42, 42);
    view.defPosition("d3", -34, 66, 42, 42);
    view.defPosition("e3", -130, 66, 42, 42);
    view.defPosition("f3", -226, 66, 42, 42);
    view.defPosition("g3", -322, 66, 42, 42);
    view.defPosition("a2", 206, 38, 42, 42);
    view.defPosition("b2", 110, 38, 42, 42);
    view.defPosition("c2", 14, 38, 42, 42);
    view.defPosition("d2", -82, 38, 42, 42);
    view.defPosition("e2", -178, 38, 42, 42);
    view.defPosition("f2", -274, 38, 42, 42);
    view.defPosition("g2", -370, 38, 42, 42);
    view.defPosition("a1", 158, 10, 42, 42);
    view.defPosition("b1", 62, 10, 42, 42);
    view.defPosition("c1", -34, 10, 42, 42);
    view.defPosition("d1", -130, 10, 42, 42);
    view.defPosition("e1", -226, 10, 42, 42);
    view.defPosition("f1", -322, 10, 42, 42);
    view.defPosition("g1", -418, 10, 42, 42);
}
