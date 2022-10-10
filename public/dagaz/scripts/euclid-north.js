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
    design.checkVersion("show-blink", "false");
    design.checkVersion("advisor-wait", "5");
    design.checkVersion("euclid-extension", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("ne");
    design.addDirection("n");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("White", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("Black", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a8", [0, 1, 8, 0, 0, 9, 0, 0]);
    design.addPosition("b8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("c8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("d8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("e8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("f8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("g8", [-1, 1, 8, 0, 0, 9, 7, 0]);
    design.addPosition("h8", [-1, 0, 8, 0, 0, 0, 7, 0]);
    design.addPosition("a7", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g7", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h7", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a6", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g6", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h6", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a5", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g5", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h5", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a4", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g4", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h4", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a3", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g3", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h3", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a2", [0, 1, 8, -7, -8, 9, 0, 0]);
    design.addPosition("b2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("c2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("d2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("e2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("f2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("g2", [-1, 1, 8, -7, -8, 9, 7, -9]);
    design.addPosition("h2", [-1, 0, 8, 0, -8, 0, 7, -9]);
    design.addPosition("a1", [0, 1, 0, -7, -8, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("c1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("d1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("e1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("f1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("g1", [-1, 1, 0, -7, -8, 0, 0, -9]);
    design.addPosition("h1", [-1, 0, 0, 0, -8, 0, 0, -9]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	7);
    design.addCommand(0, ZRF.FORK,	3);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.JUMP,	-8);
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addPiece("Man", 0);
    design.addMove(0, 0, [4, 4], 0);
    design.addMove(0, 0, [2, 2], 0);
    design.addMove(0, 0, [0, 0], 0);
    design.addMove(0, 0, [1, 1], 0);

    design.addPiece("King", 1);
    design.addMove(1, 0, [4, 4], 0);
    design.addMove(1, 0, [2, 2], 0);
    design.addMove(1, 0, [0, 0], 0);
    design.addMove(1, 0, [1, 1], 0);
    design.addMove(1, 0, [7, 7], 0);
    design.addMove(1, 0, [5, 5], 0);
    design.addMove(1, 0, [6, 6], 0);
    design.addMove(1, 0, [3, 3], 0);

    design.setupSelector(2);

    design.setup("White", "King", 56, 1);
    design.setup("White", "Man", 57, 1);
    design.setup("White", "Man", 58, 1);
    design.setup("White", "Man", 59, 1);
    design.setup("White", "Man", 48, 1);
    design.setup("White", "Man", 49, 1);
    design.setup("White", "Man", 50, 1);
    design.setup("White", "Man", 51, 1);
    design.setup("White", "Man", 40, 1);
    design.setup("White", "Man", 41, 1);
    design.setup("White", "Man", 42, 1);
    design.setup("White", "Man", 43, 1);
    design.setup("White", "Man", 32, 1);
    design.setup("White", "Man", 33, 1);
    design.setup("White", "Man", 34, 1);
    design.setup("White", "Man", 35, 1);
    design.setup("Black", "King", 7, 1);
    design.setup("Black", "Man", 4, 1);
    design.setup("Black", "Man", 5, 1);
    design.setup("Black", "Man", 6, 1);
    design.setup("Black", "Man", 12, 1);
    design.setup("Black", "Man", 13, 1);
    design.setup("Black", "Man", 14, 1);
    design.setup("Black", "Man", 15, 1);
    design.setup("Black", "Man", 20, 1);
    design.setup("Black", "Man", 21, 1);
    design.setup("Black", "Man", 22, 1);
    design.setup("Black", "Man", 23, 1);
    design.setup("Black", "Man", 28, 1);
    design.setup("Black", "Man", 29, 1);
    design.setup("Black", "Man", 30, 1);
    design.setup("Black", "Man", 31, 1);

    design.setup("White", "King", 56, 2);
    design.setup("White", "Man", 48, 2);
    design.setup("White", "Man", 49, 2);
    design.setup("White", "Man", 50, 2);
    design.setup("White", "Man", 51, 2);
    design.setup("White", "Man", 52, 2);
    design.setup("White", "Man", 53, 2);
    design.setup("White", "Man", 54, 2);
    design.setup("White", "Man", 55, 2);
    design.setup("White", "Man", 57, 2);
    design.setup("White", "Man", 58, 2);
    design.setup("White", "Man", 59, 2);
    design.setup("White", "Man", 60, 2);
    design.setup("White", "Man", 61, 2);
    design.setup("White", "Man", 62, 2);
    design.setup("White", "Man", 63, 2);
    design.setup("Black", "King", 7, 2);
    design.setup("Black", "Man", 8, 2);
    design.setup("Black", "Man", 9, 2);
    design.setup("Black", "Man", 10, 2);
    design.setup("Black", "Man", 11, 2);
    design.setup("Black", "Man", 12, 2);
    design.setup("Black", "Man", 13, 2);
    design.setup("Black", "Man", 14, 2);
    design.setup("Black", "Man", 15, 2);
    design.setup("Black", "Man", 0, 2);
    design.setup("Black", "Man", 1, 2);
    design.setup("Black", "Man", 2, 2);
    design.setup("Black", "Man", 3, 2);
    design.setup("Black", "Man", 4, 2);
    design.setup("Black", "Man", 5, 2);
    design.setup("Black", "Man", 6, 2);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
 
    view.defPosition("a8", 352, 352, 50, 50);
    view.defPosition("b8", 302, 352, 50, 50);
    view.defPosition("c8", 252, 352, 50, 50);
    view.defPosition("d8", 202, 352, 50, 50);
    view.defPosition("e8", 152, 352, 50, 50);
    view.defPosition("f8", 102, 352, 50, 50);
    view.defPosition("g8", 52, 352, 50, 50);
    view.defPosition("h8", 2, 352, 50, 50);
    view.defPosition("a7", 352, 302, 50, 50);
    view.defPosition("b7", 302, 302, 50, 50);
    view.defPosition("c7", 252, 302, 50, 50);
    view.defPosition("d7", 202, 302, 50, 50);
    view.defPosition("e7", 152, 302, 50, 50);
    view.defPosition("f7", 102, 302, 50, 50);
    view.defPosition("g7", 52, 302, 50, 50);
    view.defPosition("h7", 2, 302, 50, 50);
    view.defPosition("a6", 352, 252, 50, 50);
    view.defPosition("b6", 302, 252, 50, 50);
    view.defPosition("c6", 252, 252, 50, 50);
    view.defPosition("d6", 202, 252, 50, 50);
    view.defPosition("e6", 152, 252, 50, 50);
    view.defPosition("f6", 102, 252, 50, 50);
    view.defPosition("g6", 52, 252, 50, 50);
    view.defPosition("h6", 2, 252, 50, 50);
    view.defPosition("a5", 352, 202, 50, 50);
    view.defPosition("b5", 302, 202, 50, 50);
    view.defPosition("c5", 252, 202, 50, 50);
    view.defPosition("d5", 202, 202, 50, 50);
    view.defPosition("e5", 152, 202, 50, 50);
    view.defPosition("f5", 102, 202, 50, 50);
    view.defPosition("g5", 52, 202, 50, 50);
    view.defPosition("h5", 2, 202, 50, 50);
    view.defPosition("a4", 352, 152, 50, 50);
    view.defPosition("b4", 302, 152, 50, 50);
    view.defPosition("c4", 252, 152, 50, 50);
    view.defPosition("d4", 202, 152, 50, 50);
    view.defPosition("e4", 152, 152, 50, 50);
    view.defPosition("f4", 102, 152, 50, 50);
    view.defPosition("g4", 52, 152, 50, 50);
    view.defPosition("h4", 2, 152, 50, 50);
    view.defPosition("a3", 352, 102, 50, 50);
    view.defPosition("b3", 302, 102, 50, 50);
    view.defPosition("c3", 252, 102, 50, 50);
    view.defPosition("d3", 202, 102, 50, 50);
    view.defPosition("e3", 152, 102, 50, 50);
    view.defPosition("f3", 102, 102, 50, 50);
    view.defPosition("g3", 52, 102, 50, 50);
    view.defPosition("h3", 2, 102, 50, 50);
    view.defPosition("a2", 352, 52, 50, 50);
    view.defPosition("b2", 302, 52, 50, 50);
    view.defPosition("c2", 252, 52, 50, 50);
    view.defPosition("d2", 202, 52, 50, 50);
    view.defPosition("e2", 152, 52, 50, 50);
    view.defPosition("f2", 102, 52, 50, 50);
    view.defPosition("g2", 52, 52, 50, 50);
    view.defPosition("h2", 2, 52, 50, 50);
    view.defPosition("a1", 352, 2, 50, 50);
    view.defPosition("b1", 302, 2, 50, 50);
    view.defPosition("c1", 252, 2, 50, 50);
    view.defPosition("d1", 202, 2, 50, 50);
    view.defPosition("e1", 152, 2, 50, 50);
    view.defPosition("f1", 102, 2, 50, 50);
    view.defPosition("g1", 52, 2, 50, 50);
    view.defPosition("h1", 2, 2, 50, 50);
}
