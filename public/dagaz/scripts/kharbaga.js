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
    design.checkVersion("animate-captures", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");
    design.checkVersion("maximal-captures", "true");
    design.checkVersion("advisor-wait", "5");
    design.checkVersion("international-extension", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");
    design.addDirection("ne");
    design.addDirection("sw");
    design.addDirection("nw");
    design.addDirection("se");

    design.addPlayer("Black", [1, 0, 3, 2, 5, 4, 7, 6]);
    design.addPlayer("White", [1, 0, 3, 2, 5, 4, 7, 6]);

    design.addPosition("a9", [0, 1, 5, 0, 0, 0, 0, 25]);
    design.addPosition("b9", [-1, 1, 5, 0, 0, 24, 0, 25]);
    design.addPosition("c9", [-1, 1, 5, 0, 0, 24, 0, 25]);
    design.addPosition("d9", [-1, 1, 5, 0, 0, 24, 0, 25]);
    design.addPosition("e9", [-1, 0, 5, 0, 0, 24, 0, 0]);
    design.addPosition("a7", [0, 1, 5, -5, 20, 0, 0, 24]);
    design.addPosition("b7", [-1, 1, 5, -5, 20, 23, 19, 24]);
    design.addPosition("c7", [-1, 1, 5, -5, 20, 23, 19, 24]);
    design.addPosition("d7", [-1, 1, 5, -5, 20, 23, 19, 24]);
    design.addPosition("e7", [-1, 0, 5, -5, 0, 23, 19, 0]);
    design.addPosition("a5", [0, 1, 5, -5, 19, 0, 0, 23]);
    design.addPosition("b5", [-1, 1, 5, -5, 19, 22, 18, 23]);
    design.addPosition("c5", [-1, 1, 5, -5, 19, 22, 18, 23]);
    design.addPosition("d5", [-1, 1, 5, -5, 19, 22, 18, 23]);
    design.addPosition("e5", [-1, 0, 5, -5, 0, 22, 18, 0]);
    design.addPosition("a3", [0, 1, 5, -5, 18, 0, 0, 22]);
    design.addPosition("b3", [-1, 1, 5, -5, 18, 21, 17, 22]);
    design.addPosition("c3", [-1, 1, 5, -5, 18, 21, 17, 22]);
    design.addPosition("d3", [-1, 1, 5, -5, 18, 21, 17, 22]);
    design.addPosition("e3", [-1, 0, 5, -5, 0, 21, 17, 0]);
    design.addPosition("a1", [0, 1, 0, -5, 17, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -5, 17, 0, 16, 0]);
    design.addPosition("c1", [-1, 1, 0, -5, 17, 0, 16, 0]);
    design.addPosition("d1", [-1, 1, 0, -5, 17, 0, 16, 0]);
    design.addPosition("e1", [-1, 0, 0, -5, 0, 0, 16, 0]);
    design.addPosition("a8", [0, 0, 0, 0, -24, -20, -25, -19]);
    design.addPosition("b8", [0, 0, 0, 0, -24, -20, -25, -19]);
    design.addPosition("c8", [0, 0, 0, 0, -24, -20, -25, -19]);
    design.addPosition("d8", [0, 0, 0, 0, -24, -20, -25, -19]);
    design.addPosition("a6", [0, 0, 0, 0, -23, -19, -24, -18]);
    design.addPosition("b6", [0, 0, 0, 0, -23, -19, -24, -18]);
    design.addPosition("c6", [0, 0, 0, 0, -23, -19, -24, -18]);
    design.addPosition("d6", [0, 0, 0, 0, -23, -19, -24, -18]);
    design.addPosition("a4", [0, 0, 0, 0, -22, -18, -23, -17]);
    design.addPosition("b4", [0, 0, 0, 0, -22, -18, -23, -17]);
    design.addPosition("c4", [0, 0, 0, 0, -22, -18, -23, -17]);
    design.addPosition("d4", [0, 0, 0, 0, -22, -18, -23, -17]);
    design.addPosition("a2", [0, 0, 0, 0, -21, -17, -22, -16]);
    design.addPosition("b2", [0, 0, 0, 0, -21, -17, -22, -16]);
    design.addPosition("c2", [0, 0, 0, 0, -21, -17, -22, -16]);
    design.addPosition("d2", [0, 0, 0, 0, -21, -17, -22, -16]);

    design.addZone("promotion", 2, [20, 21, 22, 23, 24]);
    design.addZone("promotion", 1, [0, 1, 2, 3, 4]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.PROMOTE,	1);	// King
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	26);	// capture
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	0);	// promotion
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.IF,	4);
    design.addCommand(1, ZRF.PROMOTE,	1);	// King
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.JUMP,	3);
    design.addCommand(1, ZRF.MODE,	0);	// jump-type
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	7);
    design.addCommand(2, ZRF.FORK,	3);
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-8);
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.IF,	4);
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.JUMP,	-5);
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
    design.addCommand(3, ZRF.MODE,	2);	// continue-type
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
    design.addCommand(4, ZRF.PARAM,	1);	// $2
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.JUMP,	-8);
    design.addCommand(4, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.PARAM,	2);	// $3
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	18);
    design.addCommand(4, ZRF.FUNCTION,	6);	// mark
    design.addCommand(4, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.IF,	5);
    design.addCommand(4, ZRF.PARAM,	3);	// $4
    design.addCommand(4, ZRF.FUNCTION,	23);	// opposite
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-6);
    design.addCommand(4, ZRF.FUNCTION,	26);	// capture
    design.addCommand(4, ZRF.FUNCTION,	7);	// back
    design.addCommand(4, ZRF.FORK,	4);
    design.addCommand(4, ZRF.MODE,	2);	// continue-type
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end
    design.addCommand(4, ZRF.PARAM,	4);	// $5
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.JUMP,	-19);
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// jump-type
    design.addPriority(1);			// normal-type

    design.addPiece("Man", 0, 20);
    design.addMove(0, 0, [3], 1);
    design.addMove(0, 0, [0], 1);
    design.addMove(0, 0, [1], 1);
    design.addMove(0, 0, [6], 1);
    design.addMove(0, 0, [4], 1);
    design.addMove(0, 1, [3, 3], 0);
    design.addMove(0, 1, [0, 0], 0);
    design.addMove(0, 1, [2, 2], 0);
    design.addMove(0, 1, [1, 1], 0);
    design.addMove(0, 1, [6, 6], 0);
    design.addMove(0, 1, [5, 5], 0);
    design.addMove(0, 1, [7, 7], 0);
    design.addMove(0, 1, [4, 4], 0);

    design.addPiece("King", 1, 100);
    design.addMove(1, 2, [3, 3], 1);
    design.addMove(1, 2, [2, 2], 1);
    design.addMove(1, 2, [0, 0], 1);
    design.addMove(1, 2, [1, 1], 1);
    design.addMove(1, 2, [6, 6], 1);
    design.addMove(1, 2, [4, 4], 1);
    design.addMove(1, 2, [5, 5], 1);
    design.addMove(1, 2, [7, 7], 1);
    design.addMove(1, 3, [3, 3, 3, 3, 3], 0);
    design.addMove(1, 3, [0, 0, 0, 0, 0], 0);
    design.addMove(1, 3, [2, 2, 2, 2, 2], 0);
    design.addMove(1, 3, [1, 1, 1, 1, 1], 0);
    design.addMove(1, 3, [6, 6, 6, 6, 6], 0);
    design.addMove(1, 3, [5, 5, 5, 5, 5], 0);
    design.addMove(1, 3, [7, 7, 7, 7, 7], 0);
    design.addMove(1, 3, [4, 4, 4, 4, 4], 0);
    design.addMove(1, 4, [3, 3, 3, 3, 3], 2);
    design.addMove(1, 4, [0, 0, 0, 0, 0], 2);
    design.addMove(1, 4, [2, 2, 2, 2, 2], 2);
    design.addMove(1, 4, [1, 1, 1, 1, 1], 2);
    design.addMove(1, 4, [6, 6, 6, 6, 6], 2);
    design.addMove(1, 4, [5, 5, 5, 5, 5], 2);
    design.addMove(1, 4, [7, 7, 7, 7, 7], 2);
    design.addMove(1, 4, [4, 4, 4, 4, 4], 2);

    design.setup("Black", "Man", 20);
    design.setup("Black", "Man", 21);
    design.setup("Black", "Man", 22);
    design.setup("Black", "Man", 23);
    design.setup("Black", "Man", 24);
    design.setup("Black", "Man", 37);
    design.setup("Black", "Man", 38);
    design.setup("Black", "Man", 39);
    design.setup("Black", "Man", 40);
    design.setup("Black", "Man", 15);
    design.setup("Black", "Man", 16);
    design.setup("Black", "Man", 17);
    design.setup("Black", "Man", 18);
    design.setup("Black", "Man", 19);
    design.setup("Black", "Man", 33);
    design.setup("Black", "Man", 34);
    design.setup("Black", "Man", 35);
    design.setup("Black", "Man", 36);
    design.setup("Black", "Man", 13);
    design.setup("Black", "Man", 14);
    design.setup("White", "Man", 0);
    design.setup("White", "Man", 1);
    design.setup("White", "Man", 2);
    design.setup("White", "Man", 3);
    design.setup("White", "Man", 4);
    design.setup("White", "Man", 25);
    design.setup("White", "Man", 26);
    design.setup("White", "Man", 27);
    design.setup("White", "Man", 28);
    design.setup("White", "Man", 5);
    design.setup("White", "Man", 6);
    design.setup("White", "Man", 7);
    design.setup("White", "Man", 8);
    design.setup("White", "Man", 9);
    design.setup("White", "Man", 29);
    design.setup("White", "Man", 30);
    design.setup("White", "Man", 31);
    design.setup("White", "Man", 32);
    design.setup("White", "Man", 10);
    design.setup("White", "Man", 11);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
 
    view.defPosition("a9", 7, 7, 59, 59);
    view.defPosition("b9", 95, 7, 59, 59);
    view.defPosition("c9", 183, 7, 59, 59);
    view.defPosition("d9", 271, 7, 59, 59);
    view.defPosition("e9", 359, 7, 59, 59);
    view.defPosition("a7", 7, 95, 59, 59);
    view.defPosition("b7", 95, 95, 59, 59);
    view.defPosition("c7", 183, 95, 59, 59);
    view.defPosition("d7", 271, 95, 59, 59);
    view.defPosition("e7", 359, 95, 59, 59);
    view.defPosition("a5", 7, 183, 59, 59);
    view.defPosition("b5", 95, 183, 59, 59);
    view.defPosition("c5", 183, 183, 59, 59);
    view.defPosition("d5", 271, 183, 59, 59);
    view.defPosition("e5", 359, 183, 59, 59);
    view.defPosition("a3", 7, 271, 59, 59);
    view.defPosition("b3", 95, 271, 59, 59);
    view.defPosition("c3", 183, 271, 59, 59);
    view.defPosition("d3", 271, 271, 59, 59);
    view.defPosition("e3", 359, 271, 59, 59);
    view.defPosition("a1", 7, 359, 59, 59);
    view.defPosition("b1", 95, 359, 59, 59);
    view.defPosition("c1", 183, 359, 59, 59);
    view.defPosition("d1", 271, 359, 59, 59);
    view.defPosition("e1", 359, 359, 59, 59);
    view.defPosition("a8", 49, 49, 59, 59);
    view.defPosition("b8", 137, 49, 59, 59);
    view.defPosition("c8", 225, 49, 59, 59);
    view.defPosition("d8", 313, 49, 59, 59);
    view.defPosition("a6", 49, 137, 59, 59);
    view.defPosition("b6", 137, 137, 59, 59);
    view.defPosition("c6", 225, 137, 59, 59);
    view.defPosition("d6", 313, 137, 59, 59);
    view.defPosition("a4", 49, 225, 59, 59);
    view.defPosition("b4", 137, 225, 59, 59);
    view.defPosition("c4", 225, 225, 59, 59);
    view.defPosition("d4", 313, 225, 59, 59);
    view.defPosition("a2", 49, 313, 59, 59);
    view.defPosition("b2", 137, 313, 59, 59);
    view.defPosition("c2", 225, 313, 59, 59);
    view.defPosition("d2", 313, 313, 59, 59);
}
