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

    design.addPosition("a9", [0, 1, 4, 0, 0, 0, 0, 20]);
    design.addPosition("b9", [-1, 1, 4, 0, 0, 19, 0, 20]);
    design.addPosition("c9", [-1, 1, 4, 0, 0, 19, 0, 20]);
    design.addPosition("d9", [-1, 0, 4, 0, 0, 19, 0, 0]);
    design.addPosition("a7", [0, 1, 4, -4, 16, 0, 0, 19]);
    design.addPosition("b7", [-1, 1, 4, -4, 16, 18, 15, 19]);
    design.addPosition("c7", [-1, 1, 4, -4, 16, 18, 15, 19]);
    design.addPosition("d7", [-1, 0, 4, -4, 0, 18, 15, 0]);
    design.addPosition("a5", [0, 1, 4, -4, 15, 0, 0, 18]);
    design.addPosition("b5", [-1, 1, 4, -4, 15, 17, 14, 18]);
    design.addPosition("c5", [-1, 1, 4, -4, 15, 17, 14, 18]);
    design.addPosition("d5", [-1, 0, 4, -4, 0, 17, 14, 0]);
    design.addPosition("a3", [0, 1, 4, -4, 14, 0, 0, 17]);
    design.addPosition("b3", [-1, 1, 4, -4, 14, 16, 13, 17]);
    design.addPosition("c3", [-1, 1, 4, -4, 14, 16, 13, 17]);
    design.addPosition("d3", [-1, 0, 4, -4, 0, 16, 13, 0]);
    design.addPosition("a1", [0, 1, 0, -4, 13, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -4, 13, 0, 12, 0]);
    design.addPosition("c1", [-1, 1, 0, -4, 13, 0, 12, 0]);
    design.addPosition("d1", [-1, 0, 0, -4, 0, 0, 12, 0]);
    design.addPosition("a8", [0, 0, 0, 0, -19, -16, -20, -15]);
    design.addPosition("b8", [0, 0, 0, 0, -19, -16, -20, -15]);
    design.addPosition("c8", [0, 0, 0, 0, -19, -16, -20, -15]);
    design.addPosition("a6", [0, 0, 0, 0, -18, -15, -19, -14]);
    design.addPosition("b6", [0, 0, 0, 0, -18, -15, -19, -14]);
    design.addPosition("c6", [0, 0, 0, 0, -18, -15, -19, -14]);
    design.addPosition("a4", [0, 0, 0, 0, -17, -14, -18, -13]);
    design.addPosition("b4", [0, 0, 0, 0, -17, -14, -18, -13]);
    design.addPosition("c4", [0, 0, 0, 0, -17, -14, -18, -13]);
    design.addPosition("a2", [0, 0, 0, 0, -16, -13, -17, -12]);
    design.addPosition("b2", [0, 0, 0, 0, -16, -13, -17, -12]);
    design.addPosition("c2", [0, 0, 0, 0, -16, -13, -17, -12]);

    design.addZone("minus-3", 2, [12, 8, 4, 17, 18, 1, 2, 15, 11, 7]);
    design.addZone("minus-3", 1, [12, 8, 4, 17, 18, 1, 2, 15, 11, 7]);
    design.addZone("minus-4", 2, [29, 30, 31, 26, 27, 28, 23, 24, 25, 20, 21, 22]);
    design.addZone("minus-4", 1, [29, 30, 31, 26, 27, 28, 23, 24, 25, 20, 21, 22]);
    design.addZone("minus-5", 2, [16, 0, 19, 3]);
    design.addZone("minus-5", 1, [16, 0, 19, 3]);

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

    design.addPiece("Prince", 1, 100);
    design.addMove(1, 0, [3], 0);
    design.addMove(1, 0, [0], 0);
    design.addMove(1, 0, [2], 0);
    design.addMove(1, 0, [1], 0);
    design.addMove(1, 0, [6], 0);
    design.addMove(1, 0, [5], 0);
    design.addMove(1, 0, [7], 0);
    design.addMove(1, 0, [4], 0);
    design.addMove(1, 1, [3, 3], 0);
    design.addMove(1, 1, [0, 0], 0);
    design.addMove(1, 1, [2, 2], 0);
    design.addMove(1, 1, [1, 1], 0);
    design.addMove(1, 1, [6, 6], 0);
    design.addMove(1, 1, [5, 5], 0);
    design.addMove(1, 1, [7, 7], 0);
    design.addMove(1, 1, [4, 4], 0);
    design.addMove(1, 1, [3, 3], 1);
    design.addMove(1, 1, [0, 0], 1);
    design.addMove(1, 1, [2, 2], 1);
    design.addMove(1, 1, [1, 1], 1);
    design.addMove(1, 1, [6, 6], 1);
    design.addMove(1, 1, [5, 5], 1);
    design.addMove(1, 1, [7, 7], 1);
    design.addMove(1, 1, [4, 4], 1);

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

    design.setup("Black", "King", 11);
    design.setup("Black", "Prince", 28);
    design.setup("Black", "Man", 16);
    design.setup("Black", "Man", 17);
    design.setup("Black", "Man", 18);
    design.setup("Black", "Man", 19);
    design.setup("Black", "Man", 29);
    design.setup("Black", "Man", 30);
    design.setup("Black", "Man", 31);
    design.setup("Black", "Man", 12);
    design.setup("Black", "Man", 13);
    design.setup("Black", "Man", 14);
    design.setup("Black", "Man", 15);
    design.setup("White", "King", 8);
    design.setup("White", "Prince", 23);
    design.setup("White", "Man", 0);
    design.setup("White", "Man", 1);
    design.setup("White", "Man", 2);
    design.setup("White", "Man", 3);
    design.setup("White", "Man", 20);
    design.setup("White", "Man", 21);
    design.setup("White", "Man", 22);
    design.setup("White", "Man", 4);
    design.setup("White", "Man", 5);
    design.setup("White", "Man", 6);
    design.setup("White", "Man", 7);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("WhitePrince", "White Prince");
    view.defPiece("BlackPrince", "Black Prince");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
 
    view.defPosition("a9", 5, 5, 59, 59);
    view.defPosition("b9", 93, 5, 59, 59);
    view.defPosition("c9", 181, 5, 59, 59);
    view.defPosition("d9", 269, 5, 59, 59);
    view.defPosition("a7", 5, 93, 59, 59);
    view.defPosition("b7", 93, 93, 59, 59);
    view.defPosition("c7", 181, 93, 59, 59);
    view.defPosition("d7", 269, 93, 59, 59);
    view.defPosition("a5", 5, 181, 59, 59);
    view.defPosition("b5", 93, 181, 59, 59);
    view.defPosition("c5", 181, 181, 59, 59);
    view.defPosition("d5", 269, 181, 59, 59);
    view.defPosition("a3", 5, 269, 59, 59);
    view.defPosition("b3", 93, 269, 59, 59);
    view.defPosition("c3", 181, 269, 59, 59);
    view.defPosition("d3", 269, 269, 59, 59);
    view.defPosition("a1", 5, 357, 59, 59);
    view.defPosition("b1", 93, 357, 59, 59);
    view.defPosition("c1", 181, 357, 59, 59);
    view.defPosition("d1", 269, 357, 59, 59);
    view.defPosition("a8", 48, 48, 59, 59);
    view.defPosition("b8", 136, 48, 59, 59);
    view.defPosition("c8", 224, 48, 59, 59);
    view.defPosition("a6", 48, 136, 59, 59);
    view.defPosition("b6", 136, 136, 59, 59);
    view.defPosition("c6", 224, 136, 59, 59);
    view.defPosition("a4", 48, 224, 59, 59);
    view.defPosition("b4", 136, 224, 59, 59);
    view.defPosition("c4", 224, 224, 59, 59);
    view.defPosition("a2", 48, 312, 59, 59);
    view.defPosition("b2", 136, 312, 59, 59);
    view.defPosition("c2", 224, 312, 59, 59);
}
