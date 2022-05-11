Dagaz.Controller.persistense = "none";

Dagaz.Model.WIDTH  = 9;
Dagaz.Model.HEIGHT = 9;

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
    design.checkVersion("advisor-wait", "25");

    design.addDirection("ne"); // 0
    design.addDirection("nw"); // 1
    design.addDirection("sw"); // 2
    design.addDirection("se"); // 3
    design.addDirection("e");  // 4
    design.addDirection("w");  // 5
    design.addDirection("n");  // 6
    design.addDirection("s");  // 7

    design.addPlayer("Red", [2, 3, 0, 1, 5, 4, 7, 6]);
    design.addPlayer("Blue", [3, 2, 1, 0, 4, 5, 7, 6]);

    design.addPosition("a9", [0, 0, 0, 10, 1, 0, 0, 9]);
    design.addPosition("b9", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("c9", [0, 0, 8, 10, 1, -1, 0, 9]);
    design.addPosition("d9", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("e9", [0, 0, 8, 10, 1, -1, 0, 9]);
    design.addPosition("f9", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("g9", [0, 0, 8, 10, 1, -1, 0, 9]);
    design.addPosition("h9", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("i9", [0, 0, 8, 0, 0, -1, 0, 9]);
    design.addPosition("a8", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("b8", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("c8", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("d8", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("e8", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("f8", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("g8", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("h8", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("i8", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("a7", [-8, 0, 0, 10, 1, 0, -9, 9]);
    design.addPosition("b7", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("c7", [-8, -10, 8, 10, 1, -1, -9, 9]);
    design.addPosition("d7", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("e7", [-8, -10, 8, 10, 1, -1, -9, 9]);
    design.addPosition("f7", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("g7", [-8, -10, 8, 10, 1, -1, -9, 9]);
    design.addPosition("h7", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("i7", [0, -10, 8, 0, 0, -1, -9, 9]);
    design.addPosition("a6", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("b6", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("c6", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("d6", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("e6", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("f6", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("g6", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("h6", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("i6", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("a5", [-8, 0, 0, 10, 1, 0, -9, 9]);
    design.addPosition("b5", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("c5", [-8, -10, 8, 10, 1, -1, -9, 9]);
    design.addPosition("d5", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("e5", [-8, -10, 8, 10, 1, -1, -9, 9]);
    design.addPosition("f5", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("g5", [-8, -10, 8, 10, 1, -1, -9, 9]);
    design.addPosition("h5", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("i5", [0, -10, 8, 0, 0, -1, -9, 9]);
    design.addPosition("a4", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("b4", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("c4", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("d4", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("e4", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("f4", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("g4", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("h4", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("i4", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("a3", [-8, 0, 0, 10, 1, 0, -9, 9]);
    design.addPosition("b3", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("c3", [-8, -10, 8, 10, 1, -1, -9, 9]);
    design.addPosition("d3", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("e3", [-8, -10, 8, 10, 1, -1, -9, 9]);
    design.addPosition("f3", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("g3", [-8, -10, 8, 10, 1, -1, -9, 9]);
    design.addPosition("h3", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("i3", [0, -10, 8, 0, 0, -1, -9, 9]);
    design.addPosition("a2", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("b2", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("c2", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("d2", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("e2", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("f2", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("g2", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("h2", [-8, -10, 8, 10, 0, 0, 0, 0]);
    design.addPosition("i2", [0, 0, 0, 0, 0, 0, -9, 9]);
    design.addPosition("a1", [-8, 0, 0, 0, 1, 0, -9, 0]);
    design.addPosition("b1", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("c1", [-8, -10, 0, 0, 1, -1, -9, 0]);
    design.addPosition("d1", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("e1", [-8, -10, 0, 0, 1, -1, -9, 0]);
    design.addPosition("f1", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("g1", [-8, -10, 0, 0, 1, -1, -9, 0]);
    design.addPosition("h1", [0, 0, 0, 0, 1, -1, 0, 0]);
    design.addPosition("i1", [0, -10, 0, 0, 0, -1, -9, 0]);

    design.addZone("promotion-zone", 1, [9, 10, 11, 12, 13, 14, 15, 16, 17]);
    design.addZone("promotion-zone", 2, [63, 64, 65, 66, 67, 68, 69, 70, 71]);
    design.addZone("second-rank", 1, [63, 64, 65, 66, 67, 68, 69, 70, 71]);
    design.addZone("second-rank", 2, [9, 10, 11, 12, 13, 14, 15, 16, 17]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// promotion-zone
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.PROMOTE,	1);	// Chariot
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.IN_ZONE,	1);	// second-rank
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FORK,	3);
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
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
    design.addCommand(2, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(3, ZRF.FUNCTION,	0);	// not
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addPiece("Soldier", 0);
    design.addMove(0, 0, [6], 0);
    design.addMove(0, 0, [0], 0);
    design.addMove(0, 0, [1], 0);
    design.addMove(0, 0, [4], 0);
    design.addMove(0, 0, [5], 0);
    design.addMove(0, 1, [6, 6], 0);
    design.addMove(0, 1, [0, 0], 0);
    design.addMove(0, 1, [1, 1], 0);

    design.addPiece("Chariot", 1);
    design.addMove(1, 2, [6, 6], 0);
    design.addMove(1, 2, [7, 7], 0);
    design.addMove(1, 2, [4, 4], 0);
    design.addMove(1, 2, [5, 5], 0);
    design.addMove(1, 2, [0, 0], 0);
    design.addMove(1, 2, [3, 3], 0);
    design.addMove(1, 2, [2, 2], 0);
    design.addMove(1, 2, [1, 1], 0);

    design.addPiece("King", 2);
    design.addMove(2, 3, [6], 0);
    design.addMove(2, 3, [7], 0);
    design.addMove(2, 3, [4], 0);
    design.addMove(2, 3, [5], 0);
    design.addMove(2, 3, [0], 0);
    design.addMove(2, 3, [3], 0);
    design.addMove(2, 3, [1], 0);
    design.addMove(2, 3, [2], 0);

    design.setup("Blue", "Soldier", 9);
    design.setup("Blue", "Soldier", 10);
    design.setup("Blue", "Soldier", 11);
    design.setup("Blue", "Soldier", 12);
    design.setup("Blue", "Soldier", 13);
    design.setup("Blue", "Soldier", 14);
    design.setup("Blue", "Soldier", 15);
    design.setup("Blue", "Soldier", 16);
    design.setup("Blue", "Soldier", 17);
    design.setup("Blue", "Chariot", 1);
    design.setup("Blue", "Chariot", 2);
    design.setup("Blue", "Chariot", 3);
    design.setup("Blue", "Chariot", 5);
    design.setup("Blue", "Chariot", 6);
    design.setup("Blue", "Chariot", 7);
    design.setup("Blue", "King", 4);
    design.setup("Red", "Soldier", 63);
    design.setup("Red", "Soldier", 64);
    design.setup("Red", "Soldier", 65);
    design.setup("Red", "Soldier", 66);
    design.setup("Red", "Soldier", 67);
    design.setup("Red", "Soldier", 68);
    design.setup("Red", "Soldier", 69);
    design.setup("Red", "Soldier", 70);
    design.setup("Red", "Soldier", 71);
    design.setup("Red", "Chariot", 73);
    design.setup("Red", "Chariot", 74);
    design.setup("Red", "Chariot", 75);
    design.setup("Red", "Chariot", 77);
    design.setup("Red", "Chariot", 78);
    design.setup("Red", "Chariot", 79);
    design.setup("Red", "King", 76);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("BlueSoldier", "Blue Soldier");
    view.defPiece("RedSoldier", "Red Soldier");
    view.defPiece("BlueChariot", "Blue Chariot");
    view.defPiece("RedChariot", "Red Chariot");
    view.defPiece("BlueKing", "Blue King");
    view.defPiece("RedKing", "Red King");
 
    view.defPosition("a9", 354, 354, 42, 42);
    view.defPosition("b9", 310, 354, 42, 42);
    view.defPosition("c9", 266, 354, 42, 42);
    view.defPosition("d9", 222, 354, 42, 42);
    view.defPosition("e9", 178, 354, 42, 42);
    view.defPosition("f9", 134, 354, 42, 42);
    view.defPosition("g9", 90, 354, 42, 42);
    view.defPosition("h9", 46, 354, 42, 42);
    view.defPosition("i9", 2, 354, 42, 42);
    view.defPosition("a8", 354, 310, 42, 42);
    view.defPosition("b8", 310, 310, 42, 42);
    view.defPosition("c8", 266, 310, 42, 42);
    view.defPosition("d8", 222, 310, 42, 42);
    view.defPosition("e8", 178, 310, 42, 42);
    view.defPosition("f8", 134, 310, 42, 42);
    view.defPosition("g8", 90, 310, 42, 42);
    view.defPosition("h8", 46, 310, 42, 42);
    view.defPosition("i8", 2, 310, 42, 42);
    view.defPosition("a7", 354, 266, 42, 42);
    view.defPosition("b7", 310, 266, 42, 42);
    view.defPosition("c7", 266, 266, 42, 42);
    view.defPosition("d7", 222, 266, 42, 42);
    view.defPosition("e7", 178, 266, 42, 42);
    view.defPosition("f7", 134, 266, 42, 42);
    view.defPosition("g7", 90, 266, 42, 42);
    view.defPosition("h7", 46, 266, 42, 42);
    view.defPosition("i7", 2, 266, 42, 42);
    view.defPosition("a6", 354, 222, 42, 42);
    view.defPosition("b6", 310, 222, 42, 42);
    view.defPosition("c6", 266, 222, 42, 42);
    view.defPosition("d6", 222, 222, 42, 42);
    view.defPosition("e6", 178, 222, 42, 42);
    view.defPosition("f6", 134, 222, 42, 42);
    view.defPosition("g6", 90, 222, 42, 42);
    view.defPosition("h6", 46, 222, 42, 42);
    view.defPosition("i6", 2, 222, 42, 42);
    view.defPosition("a5", 354, 178, 42, 42);
    view.defPosition("b5", 310, 178, 42, 42);
    view.defPosition("c5", 266, 178, 42, 42);
    view.defPosition("d5", 222, 178, 42, 42);
    view.defPosition("e5", 178, 178, 42, 42);
    view.defPosition("f5", 134, 178, 42, 42);
    view.defPosition("g5", 90, 178, 42, 42);
    view.defPosition("h5", 46, 178, 42, 42);
    view.defPosition("i5", 2, 178, 42, 42);
    view.defPosition("a4", 354, 134, 42, 42);
    view.defPosition("b4", 310, 134, 42, 42);
    view.defPosition("c4", 266, 134, 42, 42);
    view.defPosition("d4", 222, 134, 42, 42);
    view.defPosition("e4", 178, 134, 42, 42);
    view.defPosition("f4", 134, 134, 42, 42);
    view.defPosition("g4", 90, 134, 42, 42);
    view.defPosition("h4", 46, 134, 42, 42);
    view.defPosition("i4", 2, 134, 42, 42);
    view.defPosition("a3", 354, 90, 42, 42);
    view.defPosition("b3", 310, 90, 42, 42);
    view.defPosition("c3", 266, 90, 42, 42);
    view.defPosition("d3", 222, 90, 42, 42);
    view.defPosition("e3", 178, 90, 42, 42);
    view.defPosition("f3", 134, 90, 42, 42);
    view.defPosition("g3", 90, 90, 42, 42);
    view.defPosition("h3", 46, 90, 42, 42);
    view.defPosition("i3", 2, 90, 42, 42);
    view.defPosition("a2", 354, 46, 42, 42);
    view.defPosition("b2", 310, 46, 42, 42);
    view.defPosition("c2", 266, 46, 42, 42);
    view.defPosition("d2", 222, 46, 42, 42);
    view.defPosition("e2", 178, 46, 42, 42);
    view.defPosition("f2", 134, 46, 42, 42);
    view.defPosition("g2", 90, 46, 42, 42);
    view.defPosition("h2", 46, 46, 42, 42);
    view.defPosition("i2", 2, 46, 42, 42);
    view.defPosition("a1", 354, 2, 42, 42);
    view.defPosition("b1", 310, 2, 42, 42);
    view.defPosition("c1", 266, 2, 42, 42);
    view.defPosition("d1", 222, 2, 42, 42);
    view.defPosition("e1", 178, 2, 42, 42);
    view.defPosition("f1", 134, 2, 42, 42);
    view.defPosition("g1", 90, 2, 42, 42);
    view.defPosition("h1", 46, 2, 42, 42);
    view.defPosition("i1", 2, 2, 42, 42);
}
