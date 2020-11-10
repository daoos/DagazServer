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
    design.checkVersion("smart-moves", "true");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");
    design.checkVersion("advisor-wait", "10");
    design.checkVersion("dablot-extension", "true");
    design.checkVersion("dablot-invariant", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("n");
    design.addDirection("ne");
    design.addDirection("sw");
    design.addDirection("nw");
    design.addDirection("se");

    design.addPlayer("Black", [1, 0, 3, 2, 5, 4, 7, 6]);
    design.addPlayer("White", [0, 1, 2, 3, 4, 5, 6, 7]);

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

    design.addZone("minus-3", 2, [15, 10, 5, 19, 14, 9, 21, 22, 23, 1, 2, 3]);
    design.addZone("minus-3", 1, [15, 10, 5, 19, 14, 9, 21, 22, 23, 1, 2, 3]);
    design.addZone("minus-4", 2, [37, 38, 39, 40, 33, 34, 35, 36, 29, 30, 31, 32, 25, 26, 27, 28]);
    design.addZone("minus-4", 1, [37, 38, 39, 40, 33, 34, 35, 36, 29, 30, 31, 32, 25, 26, 27, 28]);
    design.addZone("minus-5", 2, [20, 0, 24, 4]);
    design.addZone("minus-5", 1, [20, 0, 24, 4]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
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
    design.addCommand(1, ZRF.MODE,	1);	// jump-type
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// normal-type

    design.addPiece("King", 0, 1000);
    design.addMove(0, 0, [3], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [2], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [5], 0);
    design.addMove(0, 0, [7], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 1, [3, 3], 0);
    design.addMove(0, 1, [0, 0], 0);
    design.addMove(0, 1, [2, 2], 0);
    design.addMove(0, 1, [1, 1], 0);
    design.addMove(0, 1, [6, 6], 0);
    design.addMove(0, 1, [5, 5], 0);
    design.addMove(0, 1, [7, 7], 0);
    design.addMove(0, 1, [4, 4], 0);
    design.addMove(0, 1, [3, 3], 1);
    design.addMove(0, 1, [0, 0], 1);
    design.addMove(0, 1, [2, 2], 1);
    design.addMove(0, 1, [1, 1], 1);
    design.addMove(0, 1, [6, 6], 1);
    design.addMove(0, 1, [5, 5], 1);
    design.addMove(0, 1, [7, 7], 1);
    design.addMove(0, 1, [4, 4], 1);

    design.addPiece("Man", 2, 20);
    design.addMove(2, 0, [3], 0);
    design.addMove(2, 0, [0], 0);
    design.addMove(2, 0, [2], 0);
    design.addMove(2, 0, [1], 0);
    design.addMove(2, 0, [6], 0);
    design.addMove(2, 0, [5], 0);
    design.addMove(2, 0, [7], 0);
    design.addMove(2, 0, [4], 0);
    design.addMove(2, 1, [3, 3], 0);
    design.addMove(2, 1, [0, 0], 0);
    design.addMove(2, 1, [2, 2], 0);
    design.addMove(2, 1, [1, 1], 0);
    design.addMove(2, 1, [6, 6], 0);
    design.addMove(2, 1, [5, 5], 0);
    design.addMove(2, 1, [7, 7], 0);
    design.addMove(2, 1, [4, 4], 0);
    design.addMove(2, 1, [3, 3], 1);
    design.addMove(2, 1, [0, 0], 1);
    design.addMove(2, 1, [2, 2], 1);
    design.addMove(2, 1, [1, 1], 1);
    design.addMove(2, 1, [6, 6], 1);
    design.addMove(2, 1, [5, 5], 1);
    design.addMove(2, 1, [7, 7], 1);
    design.addMove(2, 1, [4, 4], 1);

    design.setup("Black", "King", 14);
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
    design.setup("White", "King", 10);
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
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
 
    view.defPosition("a9", 358, 358, 59, 59);
    view.defPosition("b9", 270, 358, 59, 59);
    view.defPosition("c9", 182, 358, 59, 59);
    view.defPosition("d9", 94, 358, 59, 59);
    view.defPosition("e9", 6, 358, 59, 59);
    view.defPosition("a7", 358, 270, 59, 59);
    view.defPosition("b7", 270, 270, 59, 59);
    view.defPosition("c7", 182, 270, 59, 59);
    view.defPosition("d7", 94, 270, 59, 59);
    view.defPosition("e7", 6, 270, 59, 59);
    view.defPosition("a5", 358, 182, 59, 59);
    view.defPosition("b5", 270, 182, 59, 59);
    view.defPosition("c5", 182, 182, 59, 59);
    view.defPosition("d5", 94, 182, 59, 59);
    view.defPosition("e5", 6, 182, 59, 59);
    view.defPosition("a3", 358, 94, 59, 59);
    view.defPosition("b3", 270, 94, 59, 59);
    view.defPosition("c3", 182, 94, 59, 59);
    view.defPosition("d3", 94, 94, 59, 59);
    view.defPosition("e3", 6, 94, 59, 59);
    view.defPosition("a1", 358, 6, 59, 59);
    view.defPosition("b1", 270, 6, 59, 59);
    view.defPosition("c1", 182, 6, 59, 59);
    view.defPosition("d1", 94, 6, 59, 59);
    view.defPosition("e1", 6, 6, 59, 59);
    view.defPosition("a8", 312, 312, 59, 59);
    view.defPosition("b8", 224, 312, 59, 59);
    view.defPosition("c8", 136, 312, 59, 59);
    view.defPosition("d8", 48, 312, 59, 59);
    view.defPosition("a6", 312, 224, 59, 59);
    view.defPosition("b6", 224, 224, 59, 59);
    view.defPosition("c6", 136, 224, 59, 59);
    view.defPosition("d6", 48, 224, 59, 59);
    view.defPosition("a4", 312, 136, 59, 59);
    view.defPosition("b4", 224, 136, 59, 59);
    view.defPosition("c4", 136, 136, 59, 59);
    view.defPosition("d4", 48, 136, 59, 59);
    view.defPosition("a2", 312, 48, 59, 59);
    view.defPosition("b2", 224, 48, 59, 59);
    view.defPosition("c2", 136, 48, 59, 59);
    view.defPosition("d2", 48, 48, 59, 59);
}
