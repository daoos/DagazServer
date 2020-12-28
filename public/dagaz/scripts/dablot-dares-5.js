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

    design.addPosition("a13", [0, 1, 7, 0, 0, 0, 0, 49]);
    design.addPosition("b13", [-1, 1, 7, 0, 0, 48, 0, 49]);
    design.addPosition("c13", [-1, 1, 7, 0, 0, 48, 0, 49]);
    design.addPosition("d13", [-1, 1, 7, 0, 0, 48, 0, 49]);
    design.addPosition("e13", [-1, 1, 7, 0, 0, 48, 0, 49]);
    design.addPosition("f13", [-1, 1, 7, 0, 0, 48, 0, 49]);
    design.addPosition("g13", [-1, 0, 7, 0, 0, 48, 0, 0]);
    design.addPosition("a11", [0, 1, 7, -7, 42, 0, 0, 48]);
    design.addPosition("b11", [-1, 1, 7, -7, 42, 47, 41, 48]);
    design.addPosition("c11", [-1, 1, 7, -7, 42, 47, 41, 48]);
    design.addPosition("d11", [-1, 1, 7, -7, 42, 47, 41, 48]);
    design.addPosition("e11", [-1, 1, 7, -7, 42, 47, 41, 48]);
    design.addPosition("f11", [-1, 1, 7, -7, 42, 47, 41, 48]);
    design.addPosition("g11", [-1, 0, 7, -7, 0, 47, 41, 0]);
    design.addPosition("a9", [0, 1, 7, -7, 41, 0, 0, 47]);
    design.addPosition("b9", [-1, 1, 7, -7, 41, 46, 40, 47]);
    design.addPosition("c9", [-1, 1, 7, -7, 41, 46, 40, 47]);
    design.addPosition("d9", [-1, 1, 7, -7, 41, 46, 40, 47]);
    design.addPosition("e9", [-1, 1, 7, -7, 41, 46, 40, 47]);
    design.addPosition("f9", [-1, 1, 7, -7, 41, 46, 40, 47]);
    design.addPosition("g9", [-1, 0, 7, -7, 0, 46, 40, 0]);
    design.addPosition("a7", [0, 1, 7, -7, 40, 0, 0, 46]);
    design.addPosition("b7", [-1, 1, 7, -7, 40, 45, 39, 46]);
    design.addPosition("c7", [-1, 1, 7, -7, 40, 45, 39, 46]);
    design.addPosition("d7", [-1, 1, 7, -7, 40, 45, 39, 46]);
    design.addPosition("e7", [-1, 1, 7, -7, 40, 45, 39, 46]);
    design.addPosition("f7", [-1, 1, 7, -7, 40, 45, 39, 46]);
    design.addPosition("g7", [-1, 0, 7, -7, 0, 45, 39, 0]);
    design.addPosition("a5", [0, 1, 7, -7, 39, 0, 0, 45]);
    design.addPosition("b5", [-1, 1, 7, -7, 39, 44, 38, 45]);
    design.addPosition("c5", [-1, 1, 7, -7, 39, 44, 38, 45]);
    design.addPosition("d5", [-1, 1, 7, -7, 39, 44, 38, 45]);
    design.addPosition("e5", [-1, 1, 7, -7, 39, 44, 38, 45]);
    design.addPosition("f5", [-1, 1, 7, -7, 39, 44, 38, 45]);
    design.addPosition("g5", [-1, 0, 7, -7, 0, 44, 38, 0]);
    design.addPosition("a3", [0, 1, 7, -7, 38, 0, 0, 44]);
    design.addPosition("b3", [-1, 1, 7, -7, 38, 43, 37, 44]);
    design.addPosition("c3", [-1, 1, 7, -7, 38, 43, 37, 44]);
    design.addPosition("d3", [-1, 1, 7, -7, 38, 43, 37, 44]);
    design.addPosition("e3", [-1, 1, 7, -7, 38, 43, 37, 44]);
    design.addPosition("f3", [-1, 1, 7, -7, 38, 43, 37, 44]);
    design.addPosition("g3", [-1, 0, 7, -7, 0, 43, 37, 0]);
    design.addPosition("a1", [0, 1, 0, -7, 37, 0, 0, 0]);
    design.addPosition("b1", [-1, 1, 0, -7, 37, 0, 36, 0]);
    design.addPosition("c1", [-1, 1, 0, -7, 37, 0, 36, 0]);
    design.addPosition("d1", [-1, 1, 0, -7, 37, 0, 36, 0]);
    design.addPosition("e1", [-1, 1, 0, -7, 37, 0, 36, 0]);
    design.addPosition("f1", [-1, 1, 0, -7, 37, 0, 36, 0]);
    design.addPosition("g1", [-1, 0, 0, -7, 0, 0, 36, 0]);
    design.addPosition("a12", [0, 0, 0, 0, -48, -42, -49, -41]);
    design.addPosition("b12", [0, 0, 0, 0, -48, -42, -49, -41]);
    design.addPosition("c12", [0, 0, 0, 0, -48, -42, -49, -41]);
    design.addPosition("d12", [0, 0, 0, 0, -48, -42, -49, -41]);
    design.addPosition("e12", [0, 0, 0, 0, -48, -42, -49, -41]);
    design.addPosition("f12", [0, 0, 0, 0, -48, -42, -49, -41]);
    design.addPosition("a10", [0, 0, 0, 0, -47, -41, -48, -40]);
    design.addPosition("b10", [0, 0, 0, 0, -47, -41, -48, -40]);
    design.addPosition("c10", [0, 0, 0, 0, -47, -41, -48, -40]);
    design.addPosition("d10", [0, 0, 0, 0, -47, -41, -48, -40]);
    design.addPosition("e10", [0, 0, 0, 0, -47, -41, -48, -40]);
    design.addPosition("f10", [0, 0, 0, 0, -47, -41, -48, -40]);
    design.addPosition("a8", [0, 0, 0, 0, -46, -40, -47, -39]);
    design.addPosition("b8", [0, 0, 0, 0, -46, -40, -47, -39]);
    design.addPosition("c8", [0, 0, 0, 0, -46, -40, -47, -39]);
    design.addPosition("d8", [0, 0, 0, 0, -46, -40, -47, -39]);
    design.addPosition("e8", [0, 0, 0, 0, -46, -40, -47, -39]);
    design.addPosition("f8", [0, 0, 0, 0, -46, -40, -47, -39]);
    design.addPosition("a6", [0, 0, 0, 0, -45, -39, -46, -38]);
    design.addPosition("b6", [0, 0, 0, 0, -45, -39, -46, -38]);
    design.addPosition("c6", [0, 0, 0, 0, -45, -39, -46, -38]);
    design.addPosition("d6", [0, 0, 0, 0, -45, -39, -46, -38]);
    design.addPosition("e6", [0, 0, 0, 0, -45, -39, -46, -38]);
    design.addPosition("f6", [0, 0, 0, 0, -45, -39, -46, -38]);
    design.addPosition("a4", [0, 0, 0, 0, -44, -38, -45, -37]);
    design.addPosition("b4", [0, 0, 0, 0, -44, -38, -45, -37]);
    design.addPosition("c4", [0, 0, 0, 0, -44, -38, -45, -37]);
    design.addPosition("d4", [0, 0, 0, 0, -44, -38, -45, -37]);
    design.addPosition("e4", [0, 0, 0, 0, -44, -38, -45, -37]);
    design.addPosition("f4", [0, 0, 0, 0, -44, -38, -45, -37]);
    design.addPosition("a2", [0, 0, 0, 0, -43, -37, -44, -36]);
    design.addPosition("b2", [0, 0, 0, 0, -43, -37, -44, -36]);
    design.addPosition("c2", [0, 0, 0, 0, -43, -37, -44, -36]);
    design.addPosition("d2", [0, 0, 0, 0, -43, -37, -44, -36]);
    design.addPosition("e2", [0, 0, 0, 0, -43, -37, -44, -36]);
    design.addPosition("f2", [0, 0, 0, 0, -43, -37, -44, -36]);

    design.addZone("minus-3", 2, [35, 28, 21, 14, 7, 41, 34, 27, 20, 13, 43, 44, 45, 46, 47, 1, 2, 3, 4, 5]);
    design.addZone("minus-3", 1, [35, 28, 21, 14, 7, 41, 34, 27, 20, 13, 43, 44, 45, 46, 47, 1, 2, 3, 4, 5]);
    design.addZone("minus-4", 2, [79, 80, 81, 82, 83, 84, 73, 74, 75, 76, 77, 78, 67, 68, 69, 70, 71, 72, 61, 62, 63, 64, 65, 66, 55, 56, 57, 58, 59, 60, 49, 50, 51, 52, 53, 54]);
    design.addZone("minus-4", 1, [79, 80, 81, 82, 83, 84, 73, 74, 75, 76, 77, 78, 67, 68, 69, 70, 71, 72, 61, 62, 63, 64, 65, 66, 55, 56, 57, 58, 59, 60, 49, 50, 51, 52, 53, 54]);
    design.addZone("minus-5", 2, [42, 0, 48, 6]);
    design.addZone("minus-5", 1, [42, 0, 48, 6]);

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

    design.setup("Black", "King", 72);
    design.setup("Black", "Man", 42);
    design.setup("Black", "Man", 43);
    design.setup("Black", "Man", 44);
    design.setup("Black", "Man", 45);
    design.setup("Black", "Man", 46);
    design.setup("Black", "Man", 47);
    design.setup("Black", "Man", 48);
    design.setup("Black", "Man", 79);
    design.setup("Black", "Man", 80);
    design.setup("Black", "Man", 81);
    design.setup("Black", "Man", 82);
    design.setup("Black", "Man", 83);
    design.setup("Black", "Man", 84);
    design.setup("Black", "Man", 35);
    design.setup("Black", "Man", 36);
    design.setup("Black", "Man", 37);
    design.setup("Black", "Man", 38);
    design.setup("Black", "Man", 39);
    design.setup("Black", "Man", 40);
    design.setup("Black", "Man", 41);
    design.setup("Black", "Man", 73);
    design.setup("Black", "Man", 74);
    design.setup("Black", "Man", 75);
    design.setup("Black", "Man", 76);
    design.setup("Black", "Man", 77);
    design.setup("Black", "Man", 78);
    design.setup("Black", "Man", 28);
    design.setup("Black", "Man", 29);
    design.setup("Black", "Man", 30);
    design.setup("Black", "Man", 31);
    design.setup("Black", "Man", 32);
    design.setup("Black", "Man", 33);
    design.setup("Black", "Man", 34);
    design.setup("White", "King", 61);
    design.setup("White", "Man", 0);
    design.setup("White", "Man", 1);
    design.setup("White", "Man", 2);
    design.setup("White", "Man", 3);
    design.setup("White", "Man", 4);
    design.setup("White", "Man", 5);
    design.setup("White", "Man", 6);
    design.setup("White", "Man", 49);
    design.setup("White", "Man", 50);
    design.setup("White", "Man", 51);
    design.setup("White", "Man", 52);
    design.setup("White", "Man", 53);
    design.setup("White", "Man", 54);
    design.setup("White", "Man", 7);
    design.setup("White", "Man", 8);
    design.setup("White", "Man", 9);
    design.setup("White", "Man", 10);
    design.setup("White", "Man", 11);
    design.setup("White", "Man", 12);
    design.setup("White", "Man", 13);
    design.setup("White", "Man", 55);
    design.setup("White", "Man", 56);
    design.setup("White", "Man", 57);
    design.setup("White", "Man", 58);
    design.setup("White", "Man", 59);
    design.setup("White", "Man", 60);
    design.setup("White", "Man", 14);
    design.setup("White", "Man", 15);
    design.setup("White", "Man", 16);
    design.setup("White", "Man", 17);
    design.setup("White", "Man", 18);
    design.setup("White", "Man", 19);
    design.setup("White", "Man", 20);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
 
    view.defPosition("a13", 5, 5, 59, 59);
    view.defPosition("b13", 93, 5, 59, 59);
    view.defPosition("c13", 181, 5, 59, 59);
    view.defPosition("d13", 269, 5, 59, 59);
    view.defPosition("e13", 357, 5, 59, 59);
    view.defPosition("f13", 445, 5, 59, 59);
    view.defPosition("g13", 533, 5, 59, 59);
    view.defPosition("a11", 5, 93, 59, 59);
    view.defPosition("b11", 93, 93, 59, 59);
    view.defPosition("c11", 181, 93, 59, 59);
    view.defPosition("d11", 269, 93, 59, 59);
    view.defPosition("e11", 357, 93, 59, 59);
    view.defPosition("f11", 445, 93, 59, 59);
    view.defPosition("g11", 533, 93, 59, 59);
    view.defPosition("a9", 5, 181, 59, 59);
    view.defPosition("b9", 93, 181, 59, 59);
    view.defPosition("c9", 181, 181, 59, 59);
    view.defPosition("d9", 269, 181, 59, 59);
    view.defPosition("e9", 357, 181, 59, 59);
    view.defPosition("f9", 445, 181, 59, 59);
    view.defPosition("g9", 533, 181, 59, 59);
    view.defPosition("a7", 5, 269, 59, 59);
    view.defPosition("b7", 93, 269, 59, 59);
    view.defPosition("c7", 181, 269, 59, 59);
    view.defPosition("d7", 269, 269, 59, 59);
    view.defPosition("e7", 357, 269, 59, 59);
    view.defPosition("f7", 445, 269, 59, 59);
    view.defPosition("g7", 533, 269, 59, 59);
    view.defPosition("a5", 5, 357, 59, 59);
    view.defPosition("b5", 93, 357, 59, 59);
    view.defPosition("c5", 181, 357, 59, 59);
    view.defPosition("d5", 269, 357, 59, 59);
    view.defPosition("e5", 357, 357, 59, 59);
    view.defPosition("f5", 445, 357, 59, 59);
    view.defPosition("g5", 533, 357, 59, 59);
    view.defPosition("a3", 5, 445, 59, 59);
    view.defPosition("b3", 93, 445, 59, 59);
    view.defPosition("c3", 181, 445, 59, 59);
    view.defPosition("d3", 269, 445, 59, 59);
    view.defPosition("e3", 357, 445, 59, 59);
    view.defPosition("f3", 445, 445, 59, 59);
    view.defPosition("g3", 533, 445, 59, 59);
    view.defPosition("a1", 5, 533, 59, 59);
    view.defPosition("b1", 93, 533, 59, 59);
    view.defPosition("c1", 181, 533, 59, 59);
    view.defPosition("d1", 269, 533, 59, 59);
    view.defPosition("e1", 357, 533, 59, 59);
    view.defPosition("f1", 445, 533, 59, 59);
    view.defPosition("g1", 533, 533, 59, 59);
    view.defPosition("a12", 48, 48, 59, 59);
    view.defPosition("b12", 136, 48, 59, 59);
    view.defPosition("c12", 224, 48, 59, 59);
    view.defPosition("d12", 312, 48, 59, 59);
    view.defPosition("e12", 400, 48, 59, 59);
    view.defPosition("f12", 488, 48, 59, 59);
    view.defPosition("a10", 48, 136, 59, 59);
    view.defPosition("b10", 136, 136, 59, 59);
    view.defPosition("c10", 224, 136, 59, 59);
    view.defPosition("d10", 312, 136, 59, 59);
    view.defPosition("e10", 400, 136, 59, 59);
    view.defPosition("f10", 488, 136, 59, 59);
    view.defPosition("a8", 48, 224, 59, 59);
    view.defPosition("b8", 136, 224, 59, 59);
    view.defPosition("c8", 224, 224, 59, 59);
    view.defPosition("d8", 312, 224, 59, 59);
    view.defPosition("e8", 400, 224, 59, 59);
    view.defPosition("f8", 488, 224, 59, 59);
    view.defPosition("a6", 48, 312, 59, 59);
    view.defPosition("b6", 136, 312, 59, 59);
    view.defPosition("c6", 224, 312, 59, 59);
    view.defPosition("d6", 312, 312, 59, 59);
    view.defPosition("e6", 400, 312, 59, 59);
    view.defPosition("f6", 488, 312, 59, 59);
    view.defPosition("a4", 48, 400, 59, 59);
    view.defPosition("b4", 136, 400, 59, 59);
    view.defPosition("c4", 224, 400, 59, 59);
    view.defPosition("d4", 312, 400, 59, 59);
    view.defPosition("e4", 400, 400, 59, 59);
    view.defPosition("f4", 488, 400, 59, 59);
    view.defPosition("a2", 48, 488, 59, 59);
    view.defPosition("b2", 136, 488, 59, 59);
    view.defPosition("c2", 224, 488, 59, 59);
    view.defPosition("d2", 312, 488, 59, 59);
    view.defPosition("e2", 400, 488, 59, 59);
    view.defPosition("f2", 488, 488, 59, 59);
}
