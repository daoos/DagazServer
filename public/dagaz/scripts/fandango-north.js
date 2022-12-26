Dagaz.Controller.persistense = "none";

Dagaz.Model.WIDTH  = 8;
Dagaz.Model.HEIGHT = 8;

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
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");
    design.checkVersion("pass-partial", "false");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("advisor-wait", "25");

    design.addDirection("se"); // 0
    design.addDirection("s");  // 1
    design.addDirection("sw"); // 2
    design.addDirection("e");  // 3
    design.addDirection("w");  // 4
    design.addDirection("ne"); // 5
    design.addDirection("nw"); // 6
    design.addDirection("n");  // 7

    design.addPlayer("Black", [6, 7, 5, 4, 3, 2, 0, 1]);
    design.addPlayer("White", [6, 7, 5, 4, 3, 2, 0, 1]);

    design.addPosition("a8", [9, 8, 0, 1, 0, 0, 0, 0]);
    design.addPosition("b8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("c8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("d8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("e8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("f8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("g8", [9, 8, 7, 1, -1, 0, 0, 0]);
    design.addPosition("h8", [0, 8, 7, 0, -1, 0, 0, 0]);
    design.addPosition("a7", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g7", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h7", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a6", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g6", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h6", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a5", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g5", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h5", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a4", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g4", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h4", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a3", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g3", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h3", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a2", [9, 8, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("c2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("d2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("e2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("f2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("g2", [9, 8, 7, 1, -1, -7, -9, -8]);
    design.addPosition("h2", [0, 8, 7, 0, -1, 0, -9, -8]);
    design.addPosition("a1", [0, 0, 0, 1, 0, -7, 0, -8]);
    design.addPosition("b1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("c1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("d1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("e1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("f1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("g1", [0, 0, 0, 1, -1, -7, -9, -8]);
    design.addPosition("h1", [0, 0, 0, 0, -1, 0, -9, -8]);

    design.addZone("promotion", 2, [56, 57, 58, 59, 60, 61, 62, 63]);
    design.addZone("promotion", 1, [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPiece("Man", 0, 20);

    design.addPiece("King", 1, 100);

    design.setup("White", "Man", 8);
    design.setup("White", "Man", 9);
    design.setup("White", "Man", 10);
    design.setup("White", "Man", 11);
    design.setup("White", "Man", 12);
    design.setup("White", "Man", 13);
    design.setup("White", "Man", 14);
    design.setup("White", "Man", 15);
    design.setup("White", "Man", 0);
    design.setup("White", "Man", 1);
    design.setup("White", "Man", 2);
    design.setup("White", "Man", 3);
    design.setup("White", "Man", 4);
    design.setup("White", "Man", 5);
    design.setup("White", "Man", 6);
    design.setup("White", "Man", 7);
    design.setup("Black", "Man", 56);
    design.setup("Black", "Man", 57);
    design.setup("Black", "Man", 58);
    design.setup("Black", "Man", 59);
    design.setup("Black", "Man", 60);
    design.setup("Black", "Man", 61);
    design.setup("Black", "Man", 62);
    design.setup("Black", "Man", 63);
    design.setup("Black", "Man", 48);
    design.setup("Black", "Man", 49);
    design.setup("Black", "Man", 50);
    design.setup("Black", "Man", 51);
    design.setup("Black", "Man", 52);
    design.setup("Black", "Man", 53);
    design.setup("Black", "Man", 54);
    design.setup("Black", "Man", 55);

    design.setupSelector(2);
    design.setup("White", "Man", 16, 2);
    design.setup("White", "Man", 17, 2);
    design.setup("White", "Man", 18, 2);
    design.setup("White", "Man", 19, 2);
    design.setup("White", "Man", 20, 2);
    design.setup("White", "Man", 21, 2);
    design.setup("White", "Man", 22, 2);
    design.setup("White", "Man", 23, 2);
    design.setup("Black", "Man", 40, 2);
    design.setup("Black", "Man", 41, 2);
    design.setup("Black", "Man", 42, 2);
    design.setup("Black", "Man", 43, 2);
    design.setup("Black", "Man", 44, 2);
    design.setup("Black", "Man", 45, 2);
    design.setup("Black", "Man", 46, 2);
    design.setup("Black", "Man", 47, 2);
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
