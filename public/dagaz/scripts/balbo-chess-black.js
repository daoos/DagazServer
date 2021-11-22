Dagaz.Controller.persistense = "none";
Dagaz.Model.WIDTH  = 11;
Dagaz.Model.HEIGHT = 10;

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

    design.addDirection("sw");  // 0
    design.addDirection("nne"); // 1
    design.addDirection("sse"); // 2
    design.addDirection("e");   // 3
    design.addDirection("nw");  // 4
    design.addDirection("n");   // 5
    design.addDirection("een"); // 6
    design.addDirection("wwn"); // 7
    design.addDirection("se");  // 8
    design.addDirection("ees"); // 9
    design.addDirection("wws"); // 10
    design.addDirection("s");   // 11
    design.addDirection("nnw"); // 12
    design.addDirection("ssw"); // 13
    design.addDirection("w");   // 14
    design.addDirection("ne");  // 15
	
    design.addPlayer("White", [15, 13, 12, 14, 8, 11, 10, 9, 4, 7, 6, 5, 2, 1, 3, 0]);
    design.addPlayer("Black", [4, 2, 1, 3, 0, 11, 9, 10, 15, 6, 7, 5, 13, 12, 14, 8]);

    design.addPosition("a10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e10", [10, 0, 23, 1, 0, 0, 0, 0, 12, 13, 0, 11, 0, 21, 0, 0]);
    design.addPosition("f10", [10, 0, 23, 1, 0, 0, 0, 0, 12, 13, 9, 11, 0, 21, -1, 0]);
    design.addPosition("g10", [10, 0, 23, 0, 0, 0, 0, 0, 12, 0, 9, 11, 0, 21, -1, 0]);
    design.addPosition("h10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k10", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d9", [10, 0, 23, 1, 0, 0, -9, 0, 12, 13, 0, 11, 0, 21, 0, -10]);
    design.addPosition("e9", [10, 0, 23, 1, 0, -11, -9, 0, 12, 13, 9, 11, 0, 21, -1, -10]);
    design.addPosition("f9", [10, 0, 23, 1, -12, -11, 0, 0, 12, 13, 9, 11, 0, 21, -1, -10]);
    design.addPosition("g9", [10, 0, 23, 1, -12, -11, 0, -13, 12, 13, 9, 11, 0, 21, -1, 0]);
    design.addPosition("h9", [10, 0, 23, 0, -12, 0, 0, -13, 12, 0, 9, 11, 0, 21, -1, 0]);
    design.addPosition("i9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k9", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a8", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b8", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c8", [10, 0, 23, 1, 0, 0, -9, 0, 12, 13, 0, 11, 0, 21, 0, -10]);
    design.addPosition("d8", [10, -21, 23, 1, 0, -11, -9, 0, 12, 13, 9, 11, 0, 21, -1, -10]);
    design.addPosition("e8", [10, -21, 23, 1, -12, -11, -9, 0, 12, 13, 9, 11, 0, 21, -1, -10]);
    design.addPosition("f8", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("g8", [10, 0, 23, 1, -12, -11, 0, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("h8", [10, 0, 23, 1, -12, -11, 0, -13, 12, 13, 9, 11, -23, 21, -1, 0]);
    design.addPosition("i8", [10, 0, 23, 0, -12, 0, 0, -13, 12, 0, 9, 11, 0, 21, -1, 0]);
    design.addPosition("j8", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k8", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a7", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b7", [10, 0, 23, 1, 0, 0, -9, 0, 12, 13, 0, 11, 0, 21, 0, -10]);
    design.addPosition("c7", [10, -21, 23, 1, 0, -11, -9, 0, 12, 13, 9, 11, 0, 21, -1, -10]);
    design.addPosition("d7", [10, -21, 23, 1, -12, -11, -9, 0, 12, 13, 9, 11, 0, 21, -1, -10]);
    design.addPosition("e7", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("f7", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("g7", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("h7", [10, 0, 23, 1, -12, -11, 0, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("i7", [10, 0, 23, 1, -12, -11, 0, -13, 12, 13, 9, 11, -23, 21, -1, 0]);
    design.addPosition("j7", [10, 0, 23, 0, -12, 0, 0, -13, 12, 0, 9, 11, 0, 21, -1, 0]);
    design.addPosition("k7", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a6", [0, 0, 23, 1, 0, 0, -9, 0, 12, 13, 0, 11, 0, 0, 0, -10]);
    design.addPosition("b6", [10, -21, 23, 1, 0, -11, -9, 0, 12, 13, 0, 11, 0, 0, -1, -10]);
    design.addPosition("c6", [10, -21, 23, 1, -12, -11, -9, 0, 12, 13, 9, 11, 0, 21, -1, -10]);
    design.addPosition("d6", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("e6", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("f6", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("g6", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("h6", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("i6", [10, 0, 23, 1, -12, -11, 0, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("j6", [10, 0, 0, 1, -12, -11, 0, -13, 12, 0, 9, 11, -23, 21, -1, 0]);
    design.addPosition("k6", [10, 0, 0, 0, -12, 0, 0, -13, 0, 0, 9, 11, 0, 21, -1, 0]);
    design.addPosition("a5", [0, -21, 0, 1, 0, -11, -9, 0, 12, 13, 0, 0, 0, 0, 0, -10]);
    design.addPosition("b5", [0, -21, 23, 1, -12, -11, -9, 0, 12, 13, 0, 11, 0, 0, -1, -10]);
    design.addPosition("c5", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 0, 11, -23, 0, -1, -10]);
    design.addPosition("d5", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("e5", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("f5", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("g5", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("h5", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("i5", [10, -21, 0, 1, -12, -11, -9, -13, 12, 0, 9, 11, -23, 21, -1, -10]);
    design.addPosition("j5", [10, 0, 0, 1, -12, -11, 0, -13, 0, 0, 9, 11, -23, 21, -1, -10]);
    design.addPosition("k5", [10, 0, 0, 0, -12, -11, 0, -13, 0, 0, 9, 0, -23, 0, -1, 0]);
    design.addPosition("a4", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b4", [0, -21, 0, 1, -12, -11, -9, 0, 12, 13, 0, 0, -23, 0, 0, -10]);
    design.addPosition("c4", [0, -21, 23, 1, -12, -11, -9, -13, 12, 13, 0, 11, -23, 0, -1, -10]);
    design.addPosition("d4", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 0, 11, -23, 0, -1, -10]);
    design.addPosition("e4", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("f4", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("g4", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("h4", [10, -21, 0, 1, -12, -11, -9, -13, 12, 0, 9, 11, -23, 21, -1, -10]);
    design.addPosition("i4", [10, -21, 0, 1, -12, -11, -9, -13, 0, 0, 9, 11, -23, 21, -1, -10]);
    design.addPosition("j4", [10, -21, 0, 0, -12, -11, 0, -13, 0, 0, 9, 0, -23, 0, -1, -10]);
    design.addPosition("k4", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c3", [0, -21, 0, 1, -12, -11, -9, 0, 12, 13, 0, 0, -23, 0, 0, -10]);
    design.addPosition("d3", [0, -21, 23, 1, -12, -11, -9, -13, 12, 13, 0, 11, -23, 0, -1, -10]);
    design.addPosition("e3", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 0, 11, -23, 0, -1, -10]);
    design.addPosition("f3", [10, -21, 23, 1, -12, -11, -9, -13, 12, 13, 9, 11, -23, 21, -1, -10]);
    design.addPosition("g3", [10, -21, 0, 1, -12, -11, -9, -13, 12, 0, 9, 11, -23, 21, -1, -10]);
    design.addPosition("h3", [10, -21, 0, 1, -12, -11, -9, -13, 0, 0, 9, 11, -23, 21, -1, -10]);
    design.addPosition("i3", [10, -21, 0, 0, -12, -11, 0, -13, 0, 0, 9, 0, -23, 0, -1, -10]);
    design.addPosition("j3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d2", [0, -21, 0, 1, -12, -11, -9, 0, 12, 13, 0, 0, -23, 0, 0, -10]);
    design.addPosition("e2", [0, -21, 0, 1, -12, -11, -9, -13, 12, 13, 0, 11, -23, 0, -1, -10]);
    design.addPosition("f2", [10, -21, 0, 1, -12, -11, -9, -13, 12, 0, 0, 11, -23, 0, -1, -10]);
    design.addPosition("g2", [10, -21, 0, 1, -12, -11, -9, -13, 0, 0, 9, 11, -23, 0, -1, -10]);
    design.addPosition("h2", [10, -21, 0, 0, -12, -11, 0, -13, 0, 0, 9, 0, -23, 0, -1, -10]);
    design.addPosition("i2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e1", [0, -21, 0, 1, -12, -11, -9, 0, 0, 0, 0, 0, -23, 0, 0, -10]);
    design.addPosition("f1", [0, -21, 0, 1, -12, -11, -9, -13, 0, 0, 0, 0, -23, 0, -1, -10]);
    design.addPosition("g1", [0, -21, 0, 0, -12, -11, 0, -13, 0, 0, 0, 0, -23, 0, -1, -10]);
    design.addPosition("h1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X1", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X3", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X4", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    design.addZone("full-promotion", 1, [14, 4, 5, 6, 18]);
    design.addZone("full-promotion", 2, [91, 103, 104, 105, 95]);
    design.addZone("light-promotion", 1, [24, 30]);
    design.addZone("light-promotion", 2, [79, 85]);
    design.addZone("third-rank", 1, [68, 69, 70, 71, 72, 73, 74]);
    design.addZone("third-rank", 2, [35, 36, 37, 38, 39, 40, 41]);

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
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	2);	// third-rank
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.PARAM,	1);	// $2
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addCommand(3, ZRF.FUNCTION,	24);	// from
    design.addCommand(3, ZRF.PARAM,	0);	// $1
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	5);	// last-to?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.LITERAL,	0);	// Pawn
    design.addCommand(3, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	26);	// capture
    design.addCommand(3, ZRF.PARAM,	1);	// $2
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	6);	// mark
    design.addCommand(3, ZRF.PARAM,	2);	// $3
    design.addCommand(3, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(3, ZRF.FUNCTION,	4);	// last-from?
    design.addCommand(3, ZRF.FUNCTION,	20);	// verify
    design.addCommand(3, ZRF.FUNCTION,	7);	// back
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
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
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addPiece("Pawn", 0, 100);
    design.addMove(0, 0, [5], 0, 10);
    design.addMove(0, 1, [5, 5], 0, 10);
    design.addMove(0, 2, [4], 0, 10);
    design.addMove(0, 2, [15], 0, 10);
    design.addMove(0, 3, [3, 5, 5], 0, 10);
    design.addMove(0, 3, [14, 5, 5], 0, 10);

    design.addPiece("Rook", 1, 500);
    design.addMove(1, 4, [5, 5], 0, 11);
    design.addMove(1, 4, [11, 11], 0, 11);
    design.addMove(1, 4, [14, 14], 0, 11);
    design.addMove(1, 4, [3, 3], 0, 11);

    design.addPiece("Knight", 2, 320);
    design.addMove(2, 5, [1], 0, 12);
    design.addMove(2, 5, [12], 0, 12);
    design.addMove(2, 5, [2], 0, 12);
    design.addMove(2, 5, [13], 0, 12);
    design.addMove(2, 5, [6], 0, 12);
    design.addMove(2, 5, [9], 0, 12);
    design.addMove(2, 5, [7], 0, 12);
    design.addMove(2, 5, [10], 0, 12);

    design.addPiece("Bishop", 3, 330);
    design.addMove(3, 4, [4, 4], 0, 13);
    design.addMove(3, 4, [0, 0], 0, 13);
    design.addMove(3, 4, [15, 15], 0, 13);
    design.addMove(3, 4, [8, 8], 0, 13);

    design.addPiece("Queen", 4, 900);
    design.addMove(4, 4, [5, 5], 0, 14);
    design.addMove(4, 4, [11, 11], 0, 14);
    design.addMove(4, 4, [14, 14], 0, 14);
    design.addMove(4, 4, [3, 3], 0, 14);
    design.addMove(4, 4, [4, 4], 0, 14);
    design.addMove(4, 4, [0, 0], 0, 14);
    design.addMove(4, 4, [15, 15], 0, 14);
    design.addMove(4, 4, [8, 8], 0, 14);

    design.addPiece("King", 5, 20000);
    design.addMove(5, 5, [5], 0, 15);
    design.addMove(5, 5, [11], 0, 15);
    design.addMove(5, 5, [14], 0, 15);
    design.addMove(5, 5, [3], 0, 15);
    design.addMove(5, 5, [4], 0, 15);
    design.addMove(5, 5, [0], 0, 15);
    design.addMove(5, 5, [15], 0, 15);
    design.addMove(5, 5, [8], 0, 15);

    design.setup("White", "Pawn", 79);
    design.setup("White", "Pawn", 80);
    design.setup("White", "Pawn", 81);
    design.setup("White", "Pawn", 82);
    design.setup("White", "Pawn", 83);
    design.setup("White", "Pawn", 84);
    design.setup("White", "Pawn", 85);
    design.setup("White", "Rook", 91);
    design.setup("White", "Rook", 95);
    design.setup("White", "Knight", 92);
    design.setup("White", "Knight", 94);
    design.setup("White", "Bishop", 104);
    design.setup("White", "Bishop", 93);
    design.setup("White", "Queen", 105);
    design.setup("White", "King", 103);
    design.setup("Black", "Pawn", 24);
    design.setup("Black", "Pawn", 25);
    design.setup("Black", "Pawn", 26);
    design.setup("Black", "Pawn", 27);
    design.setup("Black", "Pawn", 28);
    design.setup("Black", "Pawn", 29);
    design.setup("Black", "Pawn", 30);
    design.setup("Black", "Rook", 14);
    design.setup("Black", "Rook", 18);
    design.setup("Black", "Knight", 15);
    design.setup("Black", "Knight", 17);
    design.setup("Black", "Bishop", 16);
    design.setup("Black", "Bishop", 5);
    design.setup("Black", "Queen", 6);
    design.setup("Black", "King", 4);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhitePawn", "White Pawn");
    view.defPiece("BlackPawn", "Black Pawn");
    view.defPiece("WhiteRook", "White Rook");
    view.defPiece("BlackRook", "Black Rook");
    view.defPiece("WhiteKnight", "White Knight");
    view.defPiece("BlackKnight", "Black Knight");
    view.defPiece("WhiteBishop", "White Bishop");
    view.defPiece("BlackBishop", "Black Bishop");
    view.defPiece("WhiteQueen", "White Queen");
    view.defPiece("BlackQueen", "Black Queen");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
 
    view.defPosition("a10", 502, 452, 50, 50);
    view.defPosition("b10", 452, 452, 50, 50);
    view.defPosition("c10", 402, 452, 50, 50);
    view.defPosition("d10", 352, 452, 50, 50);
    view.defPosition("e10", 302, 452, 50, 50);
    view.defPosition("f10", 252, 452, 50, 50);
    view.defPosition("g10", 202, 452, 50, 50);
    view.defPosition("h10", 152, 452, 50, 50);
    view.defPosition("i10", 102, 452, 50, 50);
    view.defPosition("j10", 52, 452, 50, 50);
    view.defPosition("k10", 2, 452, 50, 50);
    view.defPosition("a9", 502, 402, 50, 50);
    view.defPosition("b9", 452, 402, 50, 50);
    view.defPosition("c9", 402, 402, 50, 50);
    view.defPosition("d9", 352, 402, 50, 50);
    view.defPosition("e9", 302, 402, 50, 50);
    view.defPosition("f9", 252, 402, 50, 50);
    view.defPosition("g9", 202, 402, 50, 50);
    view.defPosition("h9", 152, 402, 50, 50);
    view.defPosition("i9", 102, 402, 50, 50);
    view.defPosition("j9", 52, 402, 50, 50);
    view.defPosition("k9", 2, 402, 50, 50);
    view.defPosition("a8", 502, 352, 50, 50);
    view.defPosition("b8", 452, 352, 50, 50);
    view.defPosition("c8", 402, 352, 50, 50);
    view.defPosition("d8", 352, 352, 50, 50);
    view.defPosition("e8", 302, 352, 50, 50);
    view.defPosition("f8", 252, 352, 50, 50);
    view.defPosition("g8", 202, 352, 50, 50);
    view.defPosition("h8", 152, 352, 50, 50);
    view.defPosition("i8", 102, 352, 50, 50);
    view.defPosition("j8", 52, 352, 50, 50);
    view.defPosition("k8", 2, 352, 50, 50);
    view.defPosition("a7", 502, 302, 50, 50);
    view.defPosition("b7", 452, 302, 50, 50);
    view.defPosition("c7", 402, 302, 50, 50);
    view.defPosition("d7", 352, 302, 50, 50);
    view.defPosition("e7", 302, 302, 50, 50);
    view.defPosition("f7", 252, 302, 50, 50);
    view.defPosition("g7", 202, 302, 50, 50);
    view.defPosition("h7", 152, 302, 50, 50);
    view.defPosition("i7", 102, 302, 50, 50);
    view.defPosition("j7", 52, 302, 50, 50);
    view.defPosition("k7", 2, 302, 50, 50);
    view.defPosition("a6", 502, 252, 50, 50);
    view.defPosition("b6", 452, 252, 50, 50);
    view.defPosition("c6", 402, 252, 50, 50);
    view.defPosition("d6", 352, 252, 50, 50);
    view.defPosition("e6", 302, 252, 50, 50);
    view.defPosition("f6", 252, 252, 50, 50);
    view.defPosition("g6", 202, 252, 50, 50);
    view.defPosition("h6", 152, 252, 50, 50);
    view.defPosition("i6", 102, 252, 50, 50);
    view.defPosition("j6", 52, 252, 50, 50);
    view.defPosition("k6", 2, 252, 50, 50);
    view.defPosition("a5", 502, 202, 50, 50);
    view.defPosition("b5", 452, 202, 50, 50);
    view.defPosition("c5", 402, 202, 50, 50);
    view.defPosition("d5", 352, 202, 50, 50);
    view.defPosition("e5", 302, 202, 50, 50);
    view.defPosition("f5", 252, 202, 50, 50);
    view.defPosition("g5", 202, 202, 50, 50);
    view.defPosition("h5", 152, 202, 50, 50);
    view.defPosition("i5", 102, 202, 50, 50);
    view.defPosition("j5", 52, 202, 50, 50);
    view.defPosition("k5", 2, 202, 50, 50);
    view.defPosition("a4", 502, 152, 50, 50);
    view.defPosition("b4", 452, 152, 50, 50);
    view.defPosition("c4", 402, 152, 50, 50);
    view.defPosition("d4", 352, 152, 50, 50);
    view.defPosition("e4", 302, 152, 50, 50);
    view.defPosition("f4", 252, 152, 50, 50);
    view.defPosition("g4", 202, 152, 50, 50);
    view.defPosition("h4", 152, 152, 50, 50);
    view.defPosition("i4", 102, 152, 50, 50);
    view.defPosition("j4", 52, 152, 50, 50);
    view.defPosition("k4", 2, 152, 50, 50);
    view.defPosition("a3", 502, 102, 50, 50);
    view.defPosition("b3", 452, 102, 50, 50);
    view.defPosition("c3", 402, 102, 50, 50);
    view.defPosition("d3", 352, 102, 50, 50);
    view.defPosition("e3", 302, 102, 50, 50);
    view.defPosition("f3", 252, 102, 50, 50);
    view.defPosition("g3", 202, 102, 50, 50);
    view.defPosition("h3", 152, 102, 50, 50);
    view.defPosition("i3", 102, 102, 50, 50);
    view.defPosition("j3", 52, 102, 50, 50);
    view.defPosition("k3", 2, 102, 50, 50);
    view.defPosition("a2", 502, 52, 50, 50);
    view.defPosition("b2", 452, 52, 50, 50);
    view.defPosition("c2", 402, 52, 50, 50);
    view.defPosition("d2", 352, 52, 50, 50);
    view.defPosition("e2", 302, 52, 50, 50);
    view.defPosition("f2", 252, 52, 50, 50);
    view.defPosition("g2", 202, 52, 50, 50);
    view.defPosition("h2", 152, 52, 50, 50);
    view.defPosition("i2", 102, 52, 50, 50);
    view.defPosition("j2", 52, 52, 50, 50);
    view.defPosition("k2", 2, 52, 50, 50);
    view.defPosition("a1", 502, 2, 50, 50);
    view.defPosition("b1", 452, 2, 50, 50);
    view.defPosition("c1", 402, 2, 50, 50);
    view.defPosition("d1", 352, 2, 50, 50);
    view.defPosition("e1", 302, 2, 50, 50);
    view.defPosition("f1", 252, 2, 50, 50);
    view.defPosition("g1", 202, 2, 50, 50);
    view.defPosition("h1", 152, 2, 50, 50);
    view.defPosition("i1", 102, 2, 50, 50);
    view.defPosition("j1", 52, 2, 50, 50);
    view.defPosition("k1", 2, 2, 50, 50);

    view.defPopup("Promote-4", 129, 112);
    view.defPopupPosition("X1", 10, 7, 68, 68);
    view.defPopupPosition("X2", 80, 7, 68, 68);
    view.defPopupPosition("X3", 150, 7, 68, 68);
    view.defPopupPosition("X4", 220, 7, 68, 68);

    view.defPopup("Promote-2", 201, 112);
    view.defPopupPosition("X1", 10, 7, 68, 68);
    view.defPopupPosition("X2", 80, 7, 68, 68);
}
