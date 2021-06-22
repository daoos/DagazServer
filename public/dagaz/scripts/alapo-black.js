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

Dagaz.Controller.addSound(10, "sounds/pawn.wav", true);
Dagaz.Controller.addSound(11, "sounds/knight.wav", true);
Dagaz.Controller.addSound(12, "sounds/bishop.wav", true);
Dagaz.Controller.addSound(13, "sounds/queen.wav", true);
Dagaz.Controller.addSound(14, "sounds/rook.wav", true);
Dagaz.Controller.addSound(15, "sounds/castle.wav", true);

Dagaz.Model.BuildDesign = function(design) {
    design.checkVersion("z2j", "2");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("advisor-wait", "5");
    design.checkVersion("alapo-extension", "true");

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

    design.addPosition("a6", [0, 1, 6, 0, 0, 7, 0, 0]);
    design.addPosition("b6", [-1, 1, 6, 0, 0, 7, 5, 0]);
    design.addPosition("c6", [-1, 1, 6, 0, 0, 7, 5, 0]);
    design.addPosition("d6", [-1, 1, 6, 0, 0, 7, 5, 0]);
    design.addPosition("e6", [-1, 1, 6, 0, 0, 7, 5, 0]);
    design.addPosition("f6", [-1, 0, 6, 0, 0, 0, 5, 0]);
    design.addPosition("a5", [0, 1, 6, -5, -6, 7, 0, 0]);
    design.addPosition("b5", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("c5", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("d5", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("e5", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("f5", [-1, 0, 6, 0, -6, 0, 5, -7]);
    design.addPosition("a4", [0, 1, 6, -5, -6, 7, 0, 0]);
    design.addPosition("b4", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("c4", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("d4", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("e4", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("f4", [-1, 0, 6, 0, -6, 0, 5, -7]);
    design.addPosition("a3", [0, 1, 6, -5, -6, 7, 0, 0]);
    design.addPosition("b3", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("c3", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("d3", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("e3", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("f3", [-1, 0, 6, 0, -6, 0, 5, -7]);
    design.addPosition("a2", [0, 1, 6, -5, -6, 7, 0, 0]);
    design.addPosition("b2", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("c2", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("d2", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("e2", [-1, 1, 6, -5, -6, 7, 5, -7]);
    design.addPosition("f2", [-1, 0, 6, 0, -6, 0, 5, -7]);
    design.addPosition("a1", [0, 1, 0, -5, -6, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -5, -6, 0, 0, -7]);
    design.addPosition("c1", [-1, 1, 0, -5, -6, 0, 0, -7]);
    design.addPosition("d1", [-1, 1, 0, -5, -6, 0, 0, -7]);
    design.addPosition("e1", [-1, 1, 0, -5, -6, 0, 0, -7]);
    design.addPosition("f1", [-1, 0, 0, 0, -6, 0, 0, -7]);

    design.addZone("first-rank", 1, [30, 31, 32, 33, 34, 35]);
    design.addZone("first-rank", 2, [0, 1, 2, 3, 4, 5]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.IF,	7);
    design.addCommand(1, ZRF.FORK,	3);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.JUMP,	-8);
    design.addCommand(1, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addPiece("SmallSquare", 0, 4);
    design.addMove(0, 0, [4], 0, 10);
    design.addMove(0, 0, [2], 0, 10);
    design.addMove(0, 0, [0], 0, 10);
    design.addMove(0, 0, [1], 0, 10);

    design.addPiece("Square", 1, 16);
    design.addMove(1, 1, [4, 4], 0, 11);
    design.addMove(1, 1, [2, 2], 0, 11);
    design.addMove(1, 1, [0, 0], 0, 11);
    design.addMove(1, 1, [1, 1], 0, 11);

    design.addPiece("SmallTriangle", 2, 3);
    design.addMove(2, 0, [7], 0, 12);
    design.addMove(2, 0, [5], 0, 12);
    design.addMove(2, 0, [6], 0, 12);
    design.addMove(2, 0, [3], 0, 12);

    design.addPiece("Triangle", 3, 12);
    design.addMove(3, 1, [7, 7], 0, 13);
    design.addMove(3, 1, [5, 5], 0, 13);
    design.addMove(3, 1, [6, 6], 0, 13);
    design.addMove(3, 1, [3, 3], 0, 13);

    design.addPiece("SmallCircle", 4, 8);
    design.addMove(4, 0, [4], 0, 14);
    design.addMove(4, 0, [2], 0, 14);
    design.addMove(4, 0, [0], 0, 14);
    design.addMove(4, 0, [1], 0, 14);
    design.addMove(4, 0, [7], 0, 14);
    design.addMove(4, 0, [5], 0, 14);
    design.addMove(4, 0, [6], 0, 14);
    design.addMove(4, 0, [3], 0, 14);

    design.addPiece("Circle", 5, 32);
    design.addMove(5, 1, [4, 4], 0, 15);
    design.addMove(5, 1, [2, 2], 0, 15);
    design.addMove(5, 1, [0, 0], 0, 15);
    design.addMove(5, 1, [1, 1], 0, 15);
    design.addMove(5, 1, [7, 7], 0, 15);
    design.addMove(5, 1, [5, 5], 0, 15);
    design.addMove(5, 1, [6, 6], 0, 15);
    design.addMove(5, 1, [3, 3], 0, 15);

    design.setup("White", "SmallSquare", 24);
    design.setup("White", "SmallSquare", 29);
    design.setup("White", "Square", 30);
    design.setup("White", "Square", 35);
    design.setup("White", "SmallTriangle", 25);
    design.setup("White", "SmallTriangle", 28);
    design.setup("White", "Triangle", 31);
    design.setup("White", "Triangle", 34);
    design.setup("White", "SmallCircle", 26);
    design.setup("White", "SmallCircle", 27);
    design.setup("White", "Circle", 32);
    design.setup("White", "Circle", 33);
    design.setup("Black", "SmallSquare", 6);
    design.setup("Black", "SmallSquare", 11);
    design.setup("Black", "Square", 0);
    design.setup("Black", "Square", 5);
    design.setup("Black", "SmallTriangle", 7);
    design.setup("Black", "SmallTriangle", 10);
    design.setup("Black", "Triangle", 1);
    design.setup("Black", "Triangle", 4);
    design.setup("Black", "SmallCircle", 8);
    design.setup("Black", "SmallCircle", 9);
    design.setup("Black", "Circle", 2);
    design.setup("Black", "Circle", 3);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteSmallSquare", "White SmallSquare");
    view.defPiece("BlackSmallSquare", "Black SmallSquare");
    view.defPiece("WhiteSquare", "White Square");
    view.defPiece("BlackSquare", "Black Square");
    view.defPiece("WhiteSmallTriangle", "White SmallTriangle");
    view.defPiece("BlackSmallTriangle", "Black SmallTriangle");
    view.defPiece("WhiteTriangle", "White Triangle");
    view.defPiece("BlackTriangle", "Black Triangle");
    view.defPiece("WhiteSmallCircle", "White SmallCircle");
    view.defPiece("BlackSmallCircle", "Black SmallCircle");
    view.defPiece("WhiteCircle", "White Circle");
    view.defPiece("BlackCircle", "Black Circle");
 
    view.defPosition("a6", 342, 342, 68, 68);
    view.defPosition("b6", 274, 342, 68, 68);
    view.defPosition("c6", 206, 342, 68, 68);
    view.defPosition("d6", 138, 342, 68, 68);
    view.defPosition("e6", 70, 342, 68, 68);
    view.defPosition("f6", 2, 342, 68, 68);
    view.defPosition("a5", 342, 274, 68, 68);
    view.defPosition("b5", 274, 274, 68, 68);
    view.defPosition("c5", 206, 274, 68, 68);
    view.defPosition("d5", 138, 274, 68, 68);
    view.defPosition("e5", 70, 274, 68, 68);
    view.defPosition("f5", 2, 274, 68, 68);
    view.defPosition("a4", 342, 206, 68, 68);
    view.defPosition("b4", 274, 206, 68, 68);
    view.defPosition("c4", 206, 206, 68, 68);
    view.defPosition("d4", 138, 206, 68, 68);
    view.defPosition("e4", 70, 206, 68, 68);
    view.defPosition("f4", 2, 206, 68, 68);
    view.defPosition("a3", 342, 138, 68, 68);
    view.defPosition("b3", 274, 138, 68, 68);
    view.defPosition("c3", 206, 138, 68, 68);
    view.defPosition("d3", 138, 138, 68, 68);
    view.defPosition("e3", 70, 138, 68, 68);
    view.defPosition("f3", 2, 138, 68, 68);
    view.defPosition("a2", 342, 70, 68, 68);
    view.defPosition("b2", 274, 70, 68, 68);
    view.defPosition("c2", 206, 70, 68, 68);
    view.defPosition("d2", 138, 70, 68, 68);
    view.defPosition("e2", 70, 70, 68, 68);
    view.defPosition("f2", 2, 70, 68, 68);
    view.defPosition("a1", 342, 2, 68, 68);
    view.defPosition("b1", 274, 2, 68, 68);
    view.defPosition("c1", 206, 2, 68, 68);
    view.defPosition("d1", 138, 2, 68, 68);
    view.defPosition("e1", 70, 2, 68, 68);
    view.defPosition("f1", 2, 2, 68, 68);
}
