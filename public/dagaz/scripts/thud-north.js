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
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("thud-extension", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("ne");
    design.addDirection("n");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("Dwarfs", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("Trolls", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f15", [0, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("g15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("h15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("i15", [-1, 1, 15, 0, 0, 16, 14, 0]);
    design.addPosition("j15", [-1, 0, 15, 0, 0, 16, 14, 0]);
    design.addPosition("k15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("n15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o15", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a14", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b14", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c14", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d14", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e14", [0, 1, 15, -14, 0, 16, 14, 0]);
    design.addPosition("f14", [-1, 1, 15, -14, -15, 16, 14, 0]);
    design.addPosition("g14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i14", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j14", [-1, 1, 15, 0, -15, 16, 14, -16]);
    design.addPosition("k14", [-1, 0, 15, 0, 0, 16, 14, -16]);
    design.addPosition("l14", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m14", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("n14", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o14", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d13", [0, 1, 15, -14, 0, 16, 14, 0]);
    design.addPosition("e13", [-1, 1, 15, -14, -15, 16, 14, 0]);
    design.addPosition("f13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j13", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k13", [-1, 1, 15, 0, -15, 16, 14, -16]);
    design.addPosition("l13", [-1, 0, 15, 0, 0, 16, 14, -16]);
    design.addPosition("m13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("n13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c12", [0, 1, 15, -14, 0, 16, 14, 0]);
    design.addPosition("d12", [-1, 1, 15, -14, -15, 16, 14, 0]);
    design.addPosition("e12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k12", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l12", [-1, 1, 15, 0, -15, 16, 14, -16]);
    design.addPosition("m12", [-1, 0, 15, 0, 0, 16, 14, -16]);
    design.addPosition("n12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a11", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b11", [0, 1, 15, -14, 0, 16, 14, 0]);
    design.addPosition("c11", [-1, 1, 15, -14, -15, 16, 14, 0]);
    design.addPosition("d11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l11", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m11", [-1, 1, 15, 0, -15, 16, 14, -16]);
    design.addPosition("n11", [-1, 0, 15, 0, 0, 16, 14, -16]);
    design.addPosition("o11", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a10", [0, 1, 15, -14, 0, 16, 0, 0]);
    design.addPosition("b10", [-1, 1, 15, -14, -15, 16, 14, 0]);
    design.addPosition("c10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m10", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n10", [-1, 1, 15, 0, -15, 16, 14, -16]);
    design.addPosition("o10", [-1, 0, 15, 0, 0, 0, 14, -16]);
    design.addPosition("a9", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g9", [-1, 1, 15, -14, -15, 0, 14, -16]);
    design.addPosition("h9", [-1, 1, 0, -14, -15, 16, 14, -16]);
    design.addPosition("i9", [-1, 1, 15, -14, -15, 16, 0, -16]);
    design.addPosition("j9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n9", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o9", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a8", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g8", [-1, 0, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h8", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i8", [0, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n8", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o8", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a7", [0, 1, 15, -14, -15, 16, 0, 0]);
    design.addPosition("b7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("c7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g7", [-1, 1, 15, 0, -15, 16, 14, -16]);
    design.addPosition("h7", [-1, 1, 15, -14, 0, 16, 14, -16]);
    design.addPosition("i7", [-1, 1, 15, -14, -15, 16, 14, 0]);
    design.addPosition("j7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n7", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("o7", [-1, 0, 15, 0, -15, 0, 14, -16]);
    design.addPosition("a6", [0, 1, 0, -14, -15, 16, 0, 0]);
    design.addPosition("b6", [-1, 1, 15, -14, -15, 16, 0, -16]);
    design.addPosition("c6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("d6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m6", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("n6", [-1, 1, 15, -14, -15, 0, 14, -16]);
    design.addPosition("o6", [-1, 0, 0, 0, -15, 0, 14, -16]);
    design.addPosition("a5", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b5", [0, 1, 0, -14, -15, 16, 0, -16]);
    design.addPosition("c5", [-1, 1, 15, -14, -15, 16, 0, -16]);
    design.addPosition("d5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("e5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l5", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("m5", [-1, 1, 15, -14, -15, 0, 14, -16]);
    design.addPosition("n5", [-1, 0, 0, -14, -15, 0, 14, -16]);
    design.addPosition("o5", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c4", [0, 1, 0, -14, -15, 16, 0, -16]);
    design.addPosition("d4", [-1, 1, 15, -14, -15, 16, 0, -16]);
    design.addPosition("e4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("f4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k4", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("l4", [-1, 1, 15, -14, -15, 0, 14, -16]);
    design.addPosition("m4", [-1, 0, 0, -14, -15, 0, 14, -16]);
    design.addPosition("n4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d3", [0, 1, 0, -14, -15, 16, 0, -16]);
    design.addPosition("e3", [-1, 1, 15, -14, -15, 16, 0, -16]);
    design.addPosition("f3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("g3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j3", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("k3", [-1, 1, 15, -14, -15, 0, 14, -16]);
    design.addPosition("l3", [-1, 0, 0, -14, -15, 0, 14, -16]);
    design.addPosition("m3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("n3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e2", [0, 1, 0, -14, -15, 16, 0, -16]);
    design.addPosition("f2", [-1, 1, 15, -14, -15, 16, 0, -16]);
    design.addPosition("g2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("h2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("i2", [-1, 1, 15, -14, -15, 16, 14, -16]);
    design.addPosition("j2", [-1, 1, 15, -14, -15, 0, 14, -16]);
    design.addPosition("k2", [-1, 0, 0, -14, -15, 0, 14, -16]);
    design.addPosition("l2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("n2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f1", [0, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("g1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("h1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("i1", [-1, 1, 0, -14, -15, 0, 0, -16]);
    design.addPosition("j1", [-1, 0, 0, -14, -15, 0, 0, -16]);
    design.addPosition("k1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("n1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("o1", [0, 0, 0, 0, 0, 0, 0, 0]);

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
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addPiece("Dwarf", 0, 10);
    design.addMove(0, 0, [4, 4], 0);
    design.addMove(0, 0, [7, 7], 0);
    design.addMove(0, 0, [0, 0], 0);
    design.addMove(0, 0, [5, 5], 0);
    design.addMove(0, 0, [1, 1], 0);
    design.addMove(0, 0, [3, 3], 0);
    design.addMove(0, 0, [2, 2], 0);
    design.addMove(0, 0, [6, 6], 0);

    design.addPiece("Troll", 1, 40);
    design.addMove(1, 1, [4, 4], 0);
    design.addMove(1, 1, [7, 7], 0);
    design.addMove(1, 1, [0, 0], 0);
    design.addMove(1, 1, [5, 5], 0);
    design.addMove(1, 1, [1, 1], 0);
    design.addMove(1, 1, [3, 3], 0);
    design.addMove(1, 1, [2, 2], 0);
    design.addMove(1, 1, [6, 6], 0);

    design.setup("Dwarfs", "Dwarf", 215);
    design.setup("Dwarfs", "Dwarf", 216);
    design.setup("Dwarfs", "Dwarf", 218);
    design.setup("Dwarfs", "Dwarf", 219);
    design.setup("Dwarfs", "Dwarf", 199);
    design.setup("Dwarfs", "Dwarf", 205);
    design.setup("Dwarfs", "Dwarf", 183);
    design.setup("Dwarfs", "Dwarf", 191);
    design.setup("Dwarfs", "Dwarf", 167);
    design.setup("Dwarfs", "Dwarf", 177);
    design.setup("Dwarfs", "Dwarf", 151);
    design.setup("Dwarfs", "Dwarf", 163);
    design.setup("Dwarfs", "Dwarf", 135);
    design.setup("Dwarfs", "Dwarf", 149);
    design.setup("Dwarfs", "Dwarf", 120);
    design.setup("Dwarfs", "Dwarf", 134);
    design.setup("Dwarfs", "Dwarf", 90);
    design.setup("Dwarfs", "Dwarf", 104);
    design.setup("Dwarfs", "Dwarf", 75);
    design.setup("Dwarfs", "Dwarf", 89);
    design.setup("Dwarfs", "Dwarf", 61);
    design.setup("Dwarfs", "Dwarf", 73);
    design.setup("Dwarfs", "Dwarf", 47);
    design.setup("Dwarfs", "Dwarf", 57);
    design.setup("Dwarfs", "Dwarf", 33);
    design.setup("Dwarfs", "Dwarf", 41);
    design.setup("Dwarfs", "Dwarf", 19);
    design.setup("Dwarfs", "Dwarf", 25);
    design.setup("Dwarfs", "Dwarf", 5);
    design.setup("Dwarfs", "Dwarf", 6);
    design.setup("Dwarfs", "Dwarf", 8);
    design.setup("Dwarfs", "Dwarf", 9);
    design.setup("Trolls", "Troll", 126);
    design.setup("Trolls", "Troll", 127);
    design.setup("Trolls", "Troll", 128);
    design.setup("Trolls", "Troll", 111);
    design.setup("Trolls", "Troll", 113);
    design.setup("Trolls", "Troll", 96);
    design.setup("Trolls", "Troll", 97);
    design.setup("Trolls", "Troll", 98);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("DwarfsDwarf", "Dwarfs Dwarf");
    view.defPiece("TrollsTroll", "Trolls Troll");
 
    view.defPosition("a15", 524, 519, 35, 35);
    view.defPosition("b15", 489, 519, 35, 35);
    view.defPosition("c15", 454, 519, 35, 35);
    view.defPosition("d15", 419, 519, 35, 35);
    view.defPosition("e15", 384, 519, 35, 35);
    view.defPosition("f15", 349, 519, 35, 35);
    view.defPosition("g15", 314, 519, 35, 35);
    view.defPosition("h15", 279, 519, 35, 35);
    view.defPosition("i15", 244, 519, 35, 35);
    view.defPosition("j15", 209, 519, 35, 35);
    view.defPosition("k15", 174, 519, 35, 35);
    view.defPosition("l15", 139, 519, 35, 35);
    view.defPosition("m15", 104, 519, 35, 35);
    view.defPosition("n15", 69, 519, 35, 35);
    view.defPosition("o15", 34, 519, 35, 35);
    view.defPosition("a14", 524, 484, 35, 35);
    view.defPosition("b14", 489, 484, 35, 35);
    view.defPosition("c14", 454, 484, 35, 35);
    view.defPosition("d14", 419, 484, 35, 35);
    view.defPosition("e14", 384, 484, 35, 35);
    view.defPosition("f14", 349, 484, 35, 35);
    view.defPosition("g14", 314, 484, 35, 35);
    view.defPosition("h14", 279, 484, 35, 35);
    view.defPosition("i14", 244, 484, 35, 35);
    view.defPosition("j14", 209, 484, 35, 35);
    view.defPosition("k14", 174, 484, 35, 35);
    view.defPosition("l14", 139, 484, 35, 35);
    view.defPosition("m14", 104, 484, 35, 35);
    view.defPosition("n14", 69, 484, 35, 35);
    view.defPosition("o14", 34, 484, 35, 35);
    view.defPosition("a13", 524, 449, 35, 35);
    view.defPosition("b13", 489, 449, 35, 35);
    view.defPosition("c13", 454, 449, 35, 35);
    view.defPosition("d13", 419, 449, 35, 35);
    view.defPosition("e13", 384, 449, 35, 35);
    view.defPosition("f13", 349, 449, 35, 35);
    view.defPosition("g13", 314, 449, 35, 35);
    view.defPosition("h13", 279, 449, 35, 35);
    view.defPosition("i13", 244, 449, 35, 35);
    view.defPosition("j13", 209, 449, 35, 35);
    view.defPosition("k13", 174, 449, 35, 35);
    view.defPosition("l13", 139, 449, 35, 35);
    view.defPosition("m13", 104, 449, 35, 35);
    view.defPosition("n13", 69, 449, 35, 35);
    view.defPosition("o13", 34, 449, 35, 35);
    view.defPosition("a12", 524, 414, 35, 35);
    view.defPosition("b12", 489, 414, 35, 35);
    view.defPosition("c12", 454, 414, 35, 35);
    view.defPosition("d12", 419, 414, 35, 35);
    view.defPosition("e12", 384, 414, 35, 35);
    view.defPosition("f12", 349, 414, 35, 35);
    view.defPosition("g12", 314, 414, 35, 35);
    view.defPosition("h12", 279, 414, 35, 35);
    view.defPosition("i12", 244, 414, 35, 35);
    view.defPosition("j12", 209, 414, 35, 35);
    view.defPosition("k12", 174, 414, 35, 35);
    view.defPosition("l12", 139, 414, 35, 35);
    view.defPosition("m12", 104, 414, 35, 35);
    view.defPosition("n12", 69, 414, 35, 35);
    view.defPosition("o12", 34, 414, 35, 35);
    view.defPosition("a11", 524, 379, 35, 35);
    view.defPosition("b11", 489, 379, 35, 35);
    view.defPosition("c11", 454, 379, 35, 35);
    view.defPosition("d11", 419, 379, 35, 35);
    view.defPosition("e11", 384, 379, 35, 35);
    view.defPosition("f11", 349, 379, 35, 35);
    view.defPosition("g11", 314, 379, 35, 35);
    view.defPosition("h11", 279, 379, 35, 35);
    view.defPosition("i11", 244, 379, 35, 35);
    view.defPosition("j11", 209, 379, 35, 35);
    view.defPosition("k11", 174, 379, 35, 35);
    view.defPosition("l11", 139, 379, 35, 35);
    view.defPosition("m11", 104, 379, 35, 35);
    view.defPosition("n11", 69, 379, 35, 35);
    view.defPosition("o11", 34, 379, 35, 35);
    view.defPosition("a10", 524, 344, 35, 35);
    view.defPosition("b10", 489, 344, 35, 35);
    view.defPosition("c10", 454, 344, 35, 35);
    view.defPosition("d10", 419, 344, 35, 35);
    view.defPosition("e10", 384, 344, 35, 35);
    view.defPosition("f10", 349, 344, 35, 35);
    view.defPosition("g10", 314, 344, 35, 35);
    view.defPosition("h10", 279, 344, 35, 35);
    view.defPosition("i10", 244, 344, 35, 35);
    view.defPosition("j10", 209, 344, 35, 35);
    view.defPosition("k10", 174, 344, 35, 35);
    view.defPosition("l10", 139, 344, 35, 35);
    view.defPosition("m10", 104, 344, 35, 35);
    view.defPosition("n10", 69, 344, 35, 35);
    view.defPosition("o10", 34, 344, 35, 35);
    view.defPosition("a9", 524, 309, 35, 35);
    view.defPosition("b9", 489, 309, 35, 35);
    view.defPosition("c9", 454, 309, 35, 35);
    view.defPosition("d9", 419, 309, 35, 35);
    view.defPosition("e9", 384, 309, 35, 35);
    view.defPosition("f9", 349, 309, 35, 35);
    view.defPosition("g9", 314, 309, 35, 35);
    view.defPosition("h9", 279, 309, 35, 35);
    view.defPosition("i9", 244, 309, 35, 35);
    view.defPosition("j9", 209, 309, 35, 35);
    view.defPosition("k9", 174, 309, 35, 35);
    view.defPosition("l9", 139, 309, 35, 35);
    view.defPosition("m9", 104, 309, 35, 35);
    view.defPosition("n9", 69, 309, 35, 35);
    view.defPosition("o9", 34, 309, 35, 35);
    view.defPosition("a8", 524, 274, 35, 35);
    view.defPosition("b8", 489, 274, 35, 35);
    view.defPosition("c8", 454, 274, 35, 35);
    view.defPosition("d8", 419, 274, 35, 35);
    view.defPosition("e8", 384, 274, 35, 35);
    view.defPosition("f8", 349, 274, 35, 35);
    view.defPosition("g8", 314, 274, 35, 35);
    view.defPosition("h8", 279, 274, 35, 35);
    view.defPosition("i8", 244, 274, 35, 35);
    view.defPosition("j8", 209, 274, 35, 35);
    view.defPosition("k8", 174, 274, 35, 35);
    view.defPosition("l8", 139, 274, 35, 35);
    view.defPosition("m8", 104, 274, 35, 35);
    view.defPosition("n8", 69, 274, 35, 35);
    view.defPosition("o8", 34, 274, 35, 35);
    view.defPosition("a7", 524, 239, 35, 35);
    view.defPosition("b7", 489, 239, 35, 35);
    view.defPosition("c7", 454, 239, 35, 35);
    view.defPosition("d7", 419, 239, 35, 35);
    view.defPosition("e7", 384, 239, 35, 35);
    view.defPosition("f7", 349, 239, 35, 35);
    view.defPosition("g7", 314, 239, 35, 35);
    view.defPosition("h7", 279, 239, 35, 35);
    view.defPosition("i7", 244, 239, 35, 35);
    view.defPosition("j7", 209, 239, 35, 35);
    view.defPosition("k7", 174, 239, 35, 35);
    view.defPosition("l7", 139, 239, 35, 35);
    view.defPosition("m7", 104, 239, 35, 35);
    view.defPosition("n7", 69, 239, 35, 35);
    view.defPosition("o7", 34, 239, 35, 35);
    view.defPosition("a6", 524, 204, 35, 35);
    view.defPosition("b6", 489, 204, 35, 35);
    view.defPosition("c6", 454, 204, 35, 35);
    view.defPosition("d6", 419, 204, 35, 35);
    view.defPosition("e6", 384, 204, 35, 35);
    view.defPosition("f6", 349, 204, 35, 35);
    view.defPosition("g6", 314, 204, 35, 35);
    view.defPosition("h6", 279, 204, 35, 35);
    view.defPosition("i6", 244, 204, 35, 35);
    view.defPosition("j6", 209, 204, 35, 35);
    view.defPosition("k6", 174, 204, 35, 35);
    view.defPosition("l6", 139, 204, 35, 35);
    view.defPosition("m6", 104, 204, 35, 35);
    view.defPosition("n6", 69, 204, 35, 35);
    view.defPosition("o6", 34, 204, 35, 35);
    view.defPosition("a5", 524, 169, 35, 35);
    view.defPosition("b5", 489, 169, 35, 35);
    view.defPosition("c5", 454, 169, 35, 35);
    view.defPosition("d5", 419, 169, 35, 35);
    view.defPosition("e5", 384, 169, 35, 35);
    view.defPosition("f5", 349, 169, 35, 35);
    view.defPosition("g5", 314, 169, 35, 35);
    view.defPosition("h5", 279, 169, 35, 35);
    view.defPosition("i5", 244, 169, 35, 35);
    view.defPosition("j5", 209, 169, 35, 35);
    view.defPosition("k5", 174, 169, 35, 35);
    view.defPosition("l5", 139, 169, 35, 35);
    view.defPosition("m5", 104, 169, 35, 35);
    view.defPosition("n5", 69, 169, 35, 35);
    view.defPosition("o5", 34, 169, 35, 35);
    view.defPosition("a4", 524, 134, 35, 35);
    view.defPosition("b4", 489, 134, 35, 35);
    view.defPosition("c4", 454, 134, 35, 35);
    view.defPosition("d4", 419, 134, 35, 35);
    view.defPosition("e4", 384, 134, 35, 35);
    view.defPosition("f4", 349, 134, 35, 35);
    view.defPosition("g4", 314, 134, 35, 35);
    view.defPosition("h4", 279, 134, 35, 35);
    view.defPosition("i4", 244, 134, 35, 35);
    view.defPosition("j4", 209, 134, 35, 35);
    view.defPosition("k4", 174, 134, 35, 35);
    view.defPosition("l4", 139, 134, 35, 35);
    view.defPosition("m4", 104, 134, 35, 35);
    view.defPosition("n4", 69, 134, 35, 35);
    view.defPosition("o4", 34, 134, 35, 35);
    view.defPosition("a3", 524, 99, 35, 35);
    view.defPosition("b3", 489, 99, 35, 35);
    view.defPosition("c3", 454, 99, 35, 35);
    view.defPosition("d3", 419, 99, 35, 35);
    view.defPosition("e3", 384, 99, 35, 35);
    view.defPosition("f3", 349, 99, 35, 35);
    view.defPosition("g3", 314, 99, 35, 35);
    view.defPosition("h3", 279, 99, 35, 35);
    view.defPosition("i3", 244, 99, 35, 35);
    view.defPosition("j3", 209, 99, 35, 35);
    view.defPosition("k3", 174, 99, 35, 35);
    view.defPosition("l3", 139, 99, 35, 35);
    view.defPosition("m3", 104, 99, 35, 35);
    view.defPosition("n3", 69, 99, 35, 35);
    view.defPosition("o3", 34, 99, 35, 35);
    view.defPosition("a2", 524, 64, 35, 35);
    view.defPosition("b2", 489, 64, 35, 35);
    view.defPosition("c2", 454, 64, 35, 35);
    view.defPosition("d2", 419, 64, 35, 35);
    view.defPosition("e2", 384, 64, 35, 35);
    view.defPosition("f2", 349, 64, 35, 35);
    view.defPosition("g2", 314, 64, 35, 35);
    view.defPosition("h2", 279, 64, 35, 35);
    view.defPosition("i2", 244, 64, 35, 35);
    view.defPosition("j2", 209, 64, 35, 35);
    view.defPosition("k2", 174, 64, 35, 35);
    view.defPosition("l2", 139, 64, 35, 35);
    view.defPosition("m2", 104, 64, 35, 35);
    view.defPosition("n2", 69, 64, 35, 35);
    view.defPosition("o2", 34, 64, 35, 35);
    view.defPosition("a1", 524, 29, 35, 35);
    view.defPosition("b1", 489, 29, 35, 35);
    view.defPosition("c1", 454, 29, 35, 35);
    view.defPosition("d1", 419, 29, 35, 35);
    view.defPosition("e1", 384, 29, 35, 35);
    view.defPosition("f1", 349, 29, 35, 35);
    view.defPosition("g1", 314, 29, 35, 35);
    view.defPosition("h1", 279, 29, 35, 35);
    view.defPosition("i1", 244, 29, 35, 35);
    view.defPosition("j1", 209, 29, 35, 35);
    view.defPosition("k1", 174, 29, 35, 35);
    view.defPosition("l1", 139, 29, 35, 35);
    view.defPosition("m1", 104, 29, 35, 35);
    view.defPosition("n1", 69, 29, 35, 35);
    view.defPosition("o1", 34, 29, 35, 35);
}
