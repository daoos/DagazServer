Dagaz.Controller.persistense = "none";

Dagaz.AI.g_timeout      = 10000;

Dagaz.Model.WIDTH       = 13;
Dagaz.Model.HEIGHT      = 13;

Dagaz.AI.SPEC_POSITIONS = [
    0x22, 0x24, 0x26, 0x28, 0x2A, 0x2C, 0x2E,
    0x42, 0x44, 0x46, 0x48, 0x4A, 0x4C, 0x4E,
    0x62, 0x64, 0x66, 0x68, 0x6A, 0x6C, 0x6E,
    0x82, 0x84, 0x86, 0x88, 0x8A, 0x8C, 0x8E,
    0xA2, 0xA4, 0xA6, 0xA8, 0xAA, 0xAC, 0xAE,
    0xC2, 0xC4, 0xC6, 0xC8, 0xCA, 0xCC, 0xCE,
    0xE2, 0xE4, 0xE6, 0xE8, 0xEA, 0xEC, 0xEE
];

Dagaz.AI.pieceAdj = [
[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, // pieceEmpty
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0
], 
[ -20,   0, -10,   0, -10,   0, -10,   0, -10,   0, -10,   0, -20, // pieceMan
    0,  -5,   0,  -5,   0,  -5,   0,  -5,   0,  -5,   0,  -5,   0,
   -5,   0,  10,   0,  10,   0,  10,   0,  10,   0,  10,   0,  -5,
    0,  15,   0,  15,   0,  15,   0,  15,   0,  15,   0,  15,   0,
    0,   0,  20,   0,  20,   0,  20,   0,  20,   0,  20,   0,   0,
    0,  25,   0,  25,   0,  25,   0,  25,   0,  25,   0,  25,   0,
    0,   0,  20,   0,  20,   0,  20,   0,  20,   0,  20,   0,   0,
    0,  15,   0,  15,   0,  15,   0,  15,   0,  15,   0,  15,   0,
   -5,   0,  10,   0,  10,   0,  10,   0,  10,   0,  10,   0,  -5,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
  -10,   0,   5,   0,   5,   0,   5,   0,   5,   0,   5,   0, -10,
    0,  -5,   0,  -5,   0,  -5,   0,  -5,   0,  -5,   0,  -5,   0,
  -20,   0, -10,   0, -10,   0, -10,   0, -10,   0, -10,   0, -20
], 
[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, // pieceKing
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0
]];

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

    design.addDirection("n");
    design.addDirection("s");
    design.addDirection("e");
    design.addDirection("w");
    design.addDirection("ne");
    design.addDirection("sw");
    design.addDirection("nw");
    design.addDirection("se");

    design.addPlayer("Black", [1, 0, 3, 2, 5, 4, 7, 6]);
    design.addPlayer("White", [0, 1, 2, 3, 4, 5, 6, 7]);

    design.addPosition("a13", [0, 26, 2, 0, 0, 0, 0, 14]);
    design.addPosition("b13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c13", [0, 26, 2, -2, 0, 12, 0, 14]);
    design.addPosition("d13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e13", [0, 26, 2, -2, 0, 12, 0, 14]);
    design.addPosition("f13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g13", [0, 26, 2, -2, 0, 12, 0, 14]);
    design.addPosition("h13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i13", [0, 26, 2, -2, 0, 12, 0, 14]);
    design.addPosition("j13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k13", [0, 26, 2, -2, 0, 12, 0, 14]);
    design.addPosition("l13", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m13", [0, 26, 0, -2, 0, 12, 0, 0]);
    design.addPosition("a12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b12", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("c12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d12", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("e12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f12", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("g12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h12", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("i12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j12", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("k12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l12", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("m12", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a11", [-26, 26, 2, 0, -12, 0, 0, 14]);
    design.addPosition("b11", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c11", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("d11", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e11", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("f11", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g11", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("h11", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i11", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("j11", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k11", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("l11", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m11", [-26, 26, 0, -2, 0, 12, -14, 0]);
    design.addPosition("a10", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b10", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("c10", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d10", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("e10", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f10", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("g10", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h10", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("i10", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j10", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("k10", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l10", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("m10", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a9", [-26, 26, 2, 0, -12, 0, 0, 14]);
    design.addPosition("b9", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c9", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("d9", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e9", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("f9", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g9", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("h9", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i9", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("j9", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k9", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("l9", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m9", [-26, 26, 0, -2, 0, 12, -14, 0]);
    design.addPosition("a8", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b8", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("c8", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d8", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("e8", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f8", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("g8", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h8", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("i8", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j8", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("k8", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l8", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("m8", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a7", [-26, 26, 2, 0, -12, 0, 0, 14]);
    design.addPosition("b7", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c7", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("d7", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e7", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("f7", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g7", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("h7", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i7", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("j7", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k7", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("l7", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m7", [-26, 26, 0, -2, 0, 12, -14, 0]);
    design.addPosition("a6", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b6", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("c6", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d6", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("e6", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f6", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("g6", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h6", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("i6", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j6", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("k6", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l6", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("m6", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a5", [-26, 26, 2, 0, -12, 0, 0, 14]);
    design.addPosition("b5", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c5", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("d5", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e5", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("f5", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g5", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("h5", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i5", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("j5", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k5", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("l5", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m5", [-26, 26, 0, -2, 0, 12, -14, 0]);
    design.addPosition("a4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b4", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("c4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d4", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("e4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f4", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("g4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h4", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("i4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j4", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("k4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l4", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("m4", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a3", [-26, 26, 2, 0, -12, 0, 0, 14]);
    design.addPosition("b3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c3", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("d3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e3", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("f3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g3", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("h3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i3", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("j3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k3", [-26, 26, 2, -2, -12, 12, -14, 14]);
    design.addPosition("l3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m3", [-26, 26, 0, -2, 0, 12, -14, 0]);
    design.addPosition("a2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("b2", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("c2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("d2", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("e2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("f2", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("g2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("h2", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("i2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("j2", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("k2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("l2", [0, 0, 0, 0, -12, 12, -14, 14]);
    design.addPosition("m2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("a1", [-26, 0, 2, 0, -12, 0, 0, 0]);
    design.addPosition("b1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("c1", [-26, 0, 2, -2, -12, 0, -14, 0]);
    design.addPosition("d1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("e1", [-26, 0, 2, -2, -12, 0, -14, 0]);
    design.addPosition("f1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("g1", [-26, 0, 2, -2, -12, 0, -14, 0]);
    design.addPosition("h1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("i1", [-26, 0, 2, -2, -12, 0, -14, 0]);
    design.addPosition("j1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("k1", [-26, 0, 2, -2, -12, 0, -14, 0]);
    design.addPosition("l1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("m1", [-26, 0, 0, -2, 0, 0, -14, 0]);

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

    design.setup("Black", "King", 102);
    design.setup("Black", "Man", 156);
    design.setup("Black", "Man", 158);
    design.setup("Black", "Man", 160);
    design.setup("Black", "Man", 162);
    design.setup("Black", "Man", 164);
    design.setup("Black", "Man", 166);
    design.setup("Black", "Man", 168);
    design.setup("Black", "Man", 144);
    design.setup("Black", "Man", 146);
    design.setup("Black", "Man", 148);
    design.setup("Black", "Man", 150);
    design.setup("Black", "Man", 152);
    design.setup("Black", "Man", 154);
    design.setup("Black", "Man", 130);
    design.setup("Black", "Man", 132);
    design.setup("Black", "Man", 134);
    design.setup("Black", "Man", 136);
    design.setup("Black", "Man", 138);
    design.setup("Black", "Man", 140);
    design.setup("Black", "Man", 142);
    design.setup("Black", "Man", 118);
    design.setup("Black", "Man", 120);
    design.setup("Black", "Man", 122);
    design.setup("Black", "Man", 124);
    design.setup("Black", "Man", 126);
    design.setup("Black", "Man", 128);
    design.setup("Black", "Man", 104);
    design.setup("Black", "Man", 106);
    design.setup("Black", "Man", 108);
    design.setup("Black", "Man", 110);
    design.setup("Black", "Man", 112);
    design.setup("Black", "Man", 114);
    design.setup("Black", "Man", 116);
    design.setup("White", "King", 66);
    design.setup("White", "Man", 0);
    design.setup("White", "Man", 2);
    design.setup("White", "Man", 4);
    design.setup("White", "Man", 6);
    design.setup("White", "Man", 8);
    design.setup("White", "Man", 10);
    design.setup("White", "Man", 12);
    design.setup("White", "Man", 14);
    design.setup("White", "Man", 16);
    design.setup("White", "Man", 18);
    design.setup("White", "Man", 20);
    design.setup("White", "Man", 22);
    design.setup("White", "Man", 24);
    design.setup("White", "Man", 26);
    design.setup("White", "Man", 28);
    design.setup("White", "Man", 30);
    design.setup("White", "Man", 32);
    design.setup("White", "Man", 34);
    design.setup("White", "Man", 36);
    design.setup("White", "Man", 38);
    design.setup("White", "Man", 40);
    design.setup("White", "Man", 42);
    design.setup("White", "Man", 44);
    design.setup("White", "Man", 46);
    design.setup("White", "Man", 48);
    design.setup("White", "Man", 50);
    design.setup("White", "Man", 52);
    design.setup("White", "Man", 54);
    design.setup("White", "Man", 56);
    design.setup("White", "Man", 58);
    design.setup("White", "Man", 60);
    design.setup("White", "Man", 62);
    design.setup("White", "Man", 64);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("WhiteMan", "White Man");
    view.defPiece("BlackMan", "Black Man");
 
    view.defPosition("a13", 534, 534, 59, 59);
    view.defPosition("b13", 490, 534, 59, 59);
    view.defPosition("c13", 446, 534, 59, 59);
    view.defPosition("d13", 402, 534, 59, 59);
    view.defPosition("e13", 358, 534, 59, 59);
    view.defPosition("f13", 314, 534, 59, 59);
    view.defPosition("g13", 270, 534, 59, 59);
    view.defPosition("h13", 226, 534, 59, 59);
    view.defPosition("i13", 182, 534, 59, 59);
    view.defPosition("j13", 138, 534, 59, 59);
    view.defPosition("k13", 94, 534, 59, 59);
    view.defPosition("l13", 50, 534, 59, 59);
    view.defPosition("m13", 6, 534, 59, 59);
    view.defPosition("a12", 534, 490, 59, 59);
    view.defPosition("b12", 490, 490, 59, 59);
    view.defPosition("c12", 446, 490, 59, 59);
    view.defPosition("d12", 402, 490, 59, 59);
    view.defPosition("e12", 358, 490, 59, 59);
    view.defPosition("f12", 314, 490, 59, 59);
    view.defPosition("g12", 270, 490, 59, 59);
    view.defPosition("h12", 226, 490, 59, 59);
    view.defPosition("i12", 182, 490, 59, 59);
    view.defPosition("j12", 138, 490, 59, 59);
    view.defPosition("k12", 94, 490, 59, 59);
    view.defPosition("l12", 50, 490, 59, 59);
    view.defPosition("m12", 6, 490, 59, 59);
    view.defPosition("a11", 534, 446, 59, 59);
    view.defPosition("b11", 490, 446, 59, 59);
    view.defPosition("c11", 446, 446, 59, 59);
    view.defPosition("d11", 402, 446, 59, 59);
    view.defPosition("e11", 358, 446, 59, 59);
    view.defPosition("f11", 314, 446, 59, 59);
    view.defPosition("g11", 270, 446, 59, 59);
    view.defPosition("h11", 226, 446, 59, 59);
    view.defPosition("i11", 182, 446, 59, 59);
    view.defPosition("j11", 138, 446, 59, 59);
    view.defPosition("k11", 94, 446, 59, 59);
    view.defPosition("l11", 50, 446, 59, 59);
    view.defPosition("m11", 6, 446, 59, 59);
    view.defPosition("a10", 534, 402, 59, 59);
    view.defPosition("b10", 490, 402, 59, 59);
    view.defPosition("c10", 446, 402, 59, 59);
    view.defPosition("d10", 402, 402, 59, 59);
    view.defPosition("e10", 358, 402, 59, 59);
    view.defPosition("f10", 314, 402, 59, 59);
    view.defPosition("g10", 270, 402, 59, 59);
    view.defPosition("h10", 226, 402, 59, 59);
    view.defPosition("i10", 182, 402, 59, 59);
    view.defPosition("j10", 138, 402, 59, 59);
    view.defPosition("k10", 94, 402, 59, 59);
    view.defPosition("l10", 50, 402, 59, 59);
    view.defPosition("m10", 6, 402, 59, 59);
    view.defPosition("a9", 534, 358, 59, 59);
    view.defPosition("b9", 490, 358, 59, 59);
    view.defPosition("c9", 446, 358, 59, 59);
    view.defPosition("d9", 402, 358, 59, 59);
    view.defPosition("e9", 358, 358, 59, 59);
    view.defPosition("f9", 314, 358, 59, 59);
    view.defPosition("g9", 270, 358, 59, 59);
    view.defPosition("h9", 226, 358, 59, 59);
    view.defPosition("i9", 182, 358, 59, 59);
    view.defPosition("j9", 138, 358, 59, 59);
    view.defPosition("k9", 94, 358, 59, 59);
    view.defPosition("l9", 50, 358, 59, 59);
    view.defPosition("m9", 6, 358, 59, 59);
    view.defPosition("a8", 534, 314, 59, 59);
    view.defPosition("b8", 490, 314, 59, 59);
    view.defPosition("c8", 446, 314, 59, 59);
    view.defPosition("d8", 402, 314, 59, 59);
    view.defPosition("e8", 358, 314, 59, 59);
    view.defPosition("f8", 314, 314, 59, 59);
    view.defPosition("g8", 270, 314, 59, 59);
    view.defPosition("h8", 226, 314, 59, 59);
    view.defPosition("i8", 182, 314, 59, 59);
    view.defPosition("j8", 138, 314, 59, 59);
    view.defPosition("k8", 94, 314, 59, 59);
    view.defPosition("l8", 50, 314, 59, 59);
    view.defPosition("m8", 6, 314, 59, 59);
    view.defPosition("a7", 534, 270, 59, 59);
    view.defPosition("b7", 490, 270, 59, 59);
    view.defPosition("c7", 446, 270, 59, 59);
    view.defPosition("d7", 402, 270, 59, 59);
    view.defPosition("e7", 358, 270, 59, 59);
    view.defPosition("f7", 314, 270, 59, 59);
    view.defPosition("g7", 270, 270, 59, 59);
    view.defPosition("h7", 226, 270, 59, 59);
    view.defPosition("i7", 182, 270, 59, 59);
    view.defPosition("j7", 138, 270, 59, 59);
    view.defPosition("k7", 94, 270, 59, 59);
    view.defPosition("l7", 50, 270, 59, 59);
    view.defPosition("m7", 6, 270, 59, 59);
    view.defPosition("a6", 534, 226, 59, 59);
    view.defPosition("b6", 490, 226, 59, 59);
    view.defPosition("c6", 446, 226, 59, 59);
    view.defPosition("d6", 402, 226, 59, 59);
    view.defPosition("e6", 358, 226, 59, 59);
    view.defPosition("f6", 314, 226, 59, 59);
    view.defPosition("g6", 270, 226, 59, 59);
    view.defPosition("h6", 226, 226, 59, 59);
    view.defPosition("i6", 182, 226, 59, 59);
    view.defPosition("j6", 138, 226, 59, 59);
    view.defPosition("k6", 94, 226, 59, 59);
    view.defPosition("l6", 50, 226, 59, 59);
    view.defPosition("m6", 6, 226, 59, 59);
    view.defPosition("a5", 534, 182, 59, 59);
    view.defPosition("b5", 490, 182, 59, 59);
    view.defPosition("c5", 446, 182, 59, 59);
    view.defPosition("d5", 402, 182, 59, 59);
    view.defPosition("e5", 358, 182, 59, 59);
    view.defPosition("f5", 314, 182, 59, 59);
    view.defPosition("g5", 270, 182, 59, 59);
    view.defPosition("h5", 226, 182, 59, 59);
    view.defPosition("i5", 182, 182, 59, 59);
    view.defPosition("j5", 138, 182, 59, 59);
    view.defPosition("k5", 94, 182, 59, 59);
    view.defPosition("l5", 50, 182, 59, 59);
    view.defPosition("m5", 6, 182, 59, 59);
    view.defPosition("a4", 534, 138, 59, 59);
    view.defPosition("b4", 490, 138, 59, 59);
    view.defPosition("c4", 446, 138, 59, 59);
    view.defPosition("d4", 402, 138, 59, 59);
    view.defPosition("e4", 358, 138, 59, 59);
    view.defPosition("f4", 314, 138, 59, 59);
    view.defPosition("g4", 270, 138, 59, 59);
    view.defPosition("h4", 226, 138, 59, 59);
    view.defPosition("i4", 182, 138, 59, 59);
    view.defPosition("j4", 138, 138, 59, 59);
    view.defPosition("k4", 94, 138, 59, 59);
    view.defPosition("l4", 50, 138, 59, 59);
    view.defPosition("m4", 6, 138, 59, 59);
    view.defPosition("a3", 534, 94, 59, 59);
    view.defPosition("b3", 490, 94, 59, 59);
    view.defPosition("c3", 446, 94, 59, 59);
    view.defPosition("d3", 402, 94, 59, 59);
    view.defPosition("e3", 358, 94, 59, 59);
    view.defPosition("f3", 314, 94, 59, 59);
    view.defPosition("g3", 270, 94, 59, 59);
    view.defPosition("h3", 226, 94, 59, 59);
    view.defPosition("i3", 182, 94, 59, 59);
    view.defPosition("j3", 138, 94, 59, 59);
    view.defPosition("k3", 94, 94, 59, 59);
    view.defPosition("l3", 50, 94, 59, 59);
    view.defPosition("m3", 6, 94, 59, 59);
    view.defPosition("a2", 534, 50, 59, 59);
    view.defPosition("b2", 490, 50, 59, 59);
    view.defPosition("c2", 446, 50, 59, 59);
    view.defPosition("d2", 402, 50, 59, 59);
    view.defPosition("e2", 358, 50, 59, 59);
    view.defPosition("f2", 314, 50, 59, 59);
    view.defPosition("g2", 270, 50, 59, 59);
    view.defPosition("h2", 226, 50, 59, 59);
    view.defPosition("i2", 182, 50, 59, 59);
    view.defPosition("j2", 138, 50, 59, 59);
    view.defPosition("k2", 94, 50, 59, 59);
    view.defPosition("l2", 50, 50, 59, 59);
    view.defPosition("m2", 6, 50, 59, 59);
    view.defPosition("a1", 534, 6, 59, 59);
    view.defPosition("b1", 490, 6, 59, 59);
    view.defPosition("c1", 446, 6, 59, 59);
    view.defPosition("d1", 402, 6, 59, 59);
    view.defPosition("e1", 358, 6, 59, 59);
    view.defPosition("f1", 314, 6, 59, 59);
    view.defPosition("g1", 270, 6, 59, 59);
    view.defPosition("h1", 226, 6, 59, 59);
    view.defPosition("i1", 182, 6, 59, 59);
    view.defPosition("j1", 138, 6, 59, 59);
    view.defPosition("k1", 94, 6, 59, 59);
    view.defPosition("l1", 50, 6, 59, 59);
    view.defPosition("m1", 6, 6, 59, 59);
}
