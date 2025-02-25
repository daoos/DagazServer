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
    design.checkVersion("chess-invariant", "true");

    design.addDirection("w");  // 0
    design.addDirection("e");  // 1
    design.addDirection("s");  // 2
    design.addDirection("ne"); // 3
    design.addDirection("n");  // 4
    design.addDirection("se"); // 5
    design.addDirection("sw"); // 6
    design.addDirection("nw"); // 7

    design.addPlayer("White", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("Black", [0, 1, 4, 5, 2, 3, 7, 6]);

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
    design.addPosition("X1", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X2", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X3", [0, 0, 0, 0, 0, 0, 0, 0]);
    design.addPosition("X4", [0, 0, 0, 0, 0, 0, 0, 0]);

    design.addZone("last-rank", 1, [0, 1, 2, 3, 4, 5, 6, 7]);
    design.addZone("last-rank", 2, [56, 57, 58, 59, 60, 61, 62, 63]);
    design.addZone("third-rank", 1, [40, 41, 42, 43, 44, 45, 46, 47]);
    design.addZone("third-rank", 2, [16, 17, 18, 19, 20, 21, 22, 23]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// last-rank
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
    design.addCommand(0, ZRF.IF,	4);
    design.addCommand(0, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.JUMP,	2);
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.IN_ZONE,	1);	// third-rank
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
    design.addCommand(2, ZRF.IN_ZONE,	0);	// last-rank
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	4);
    design.addCommand(2, ZRF.PROMOTE,	4);	// Queen
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.JUMP,	2);
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
    design.addCommand(5, ZRF.PARAM,	1);	// $2
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(6, ZRF.FUNCTION,	0);	// not
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.FUNCTION,	25);	// to
    design.addCommand(6, ZRF.FUNCTION,	28);	// end

    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.PARAM,	0);	// $1
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.PARAM,	1);	// $2
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.PARAM,	2);	// $3
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	1);	// Rook
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.FUNCTION,	24);	// from
    design.addCommand(7, ZRF.PARAM,	3);	// $4
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.PARAM,	4);	// $5
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PARAM,	0);	// $1
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	1);	// $2
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.PARAM,	2);	// $3
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	3);	// $4
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	1);	// Rook
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PARAM,	4);	// $5
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.PARAM,	5);	// $6
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.PARAM,	6);	// $7
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addPiece("Pawn", 0, 800);
    design.addMove(0, 0, [4], 1, 10);
    design.addMove(0, 1, [4, 4], 1, 10);
    design.addMove(0, 2, [7], 1, 10);
    design.addMove(0, 2, [3], 1, 10);
    design.addMove(0, 3, [1, 4, 4], 1, 10);
    design.addMove(0, 3, [0, 4, 4], 1, 10);

    design.addPiece("Rook", 1, 5000);
    design.addMove(1, 4, [4, 4], 1, 11);
    design.addMove(1, 4, [2, 2], 1, 11);
    design.addMove(1, 4, [0, 0], 1, 11);
    design.addMove(1, 4, [1, 1], 1, 11);

    design.addPiece("Knight", 2, 3350);
    design.addMove(2, 5, [4, 7], 1, 12);
    design.addMove(2, 5, [4, 3], 1, 12);
    design.addMove(2, 5, [2, 6], 1, 12);
    design.addMove(2, 5, [2, 5], 1, 12);
    design.addMove(2, 5, [0, 7], 1, 12);
    design.addMove(2, 5, [0, 6], 1, 12);
    design.addMove(2, 5, [1, 3], 1, 12);
    design.addMove(2, 5, [1, 5], 1, 12);

    design.addPiece("Bishop", 3, 3450);
    design.addMove(3, 4, [7, 7], 1, 13);
    design.addMove(3, 4, [6, 6], 1, 13);
    design.addMove(3, 4, [3, 3], 1, 13);
    design.addMove(3, 4, [5, 5], 1, 13);

    design.addPiece("Queen", 4, 9750);
    design.addMove(4, 4, [4, 4], 1, 14);
    design.addMove(4, 4, [2, 2], 1, 14);
    design.addMove(4, 4, [0, 0], 1, 14);
    design.addMove(4, 4, [1, 1], 1, 14);
    design.addMove(4, 4, [7, 7], 1, 14);
    design.addMove(4, 4, [6, 6], 1, 14);
    design.addMove(4, 4, [3, 3], 1, 14);
    design.addMove(4, 4, [5, 5], 1, 14);

    design.addPiece("King", 5, 600000);
    design.addMove(5, 6, [4], 0, 15);
    design.addMove(5, 6, [2], 0, 15);
    design.addMove(5, 6, [0], 0, 15);
    design.addMove(5, 6, [1], 0, 15);
    design.addMove(5, 6, [7], 0, 15);
    design.addMove(5, 6, [6], 0, 15);
    design.addMove(5, 6, [3], 0, 15);
    design.addMove(5, 6, [5], 0, 15);
    design.addMove(5, 7, [1, 1, 1, 0, 0], 0, 15);
    design.addMove(5, 8, [0, 0, 0, 0, 1, 1, 1], 0, 15);

    design.setupSelector(9);

    design.setup("White", "Pawn", 48, 1);
    design.setup("White", "Pawn", 49, 1);
    design.setup("White", "Pawn", 50, 1);
    design.setup("White", "Pawn", 51, 1);
    design.setup("White", "Pawn", 52, 1);
    design.setup("White", "Pawn", 53, 1);
    design.setup("White", "Pawn", 54, 1);
    design.setup("White", "Pawn", 55, 1);
    design.setup("White", "Rook", 56, 1);
    design.setup("White", "Rook", 63, 1);
    design.setup("White", "Knight", 57, 1);
    design.setup("White", "Knight", 62, 1);
    design.setup("White", "Bishop", 58, 1);
    design.setup("White", "Bishop", 61, 1);
    design.setup("White", "Queen", 59, 1);
    design.setup("White", "King", 60, 1);
    design.setup("Black", "Pawn", 8, 1);
    design.setup("Black", "Pawn", 9, 1);
    design.setup("Black", "Pawn", 10, 1);
    design.setup("Black", "Pawn", 11, 1);
    design.setup("Black", "Pawn", 12, 1);
    design.setup("Black", "Pawn", 13, 1);
    design.setup("Black", "Pawn", 14, 1);
    design.setup("Black", "Pawn", 15, 1);
    design.setup("Black", "Rook", 0, 1);
    design.setup("Black", "Rook", 7, 1);
    design.setup("Black", "Knight", 1, 1);
    design.setup("Black", "Knight", 6, 1);
    design.setup("Black", "Bishop", 2, 1);
    design.setup("Black", "Bishop", 5, 1);
    design.setup("Black", "Queen", 3, 1);
    design.setup("Black", "King", 4, 1);

    design.reserve("White", "Bishop", 1, 2);
    design.reserve("White", "Knight", 1, 2);
    design.reserve("White", "King", 1, 2);
    design.reserve("Black", "King", 1, 2);

    design.setup("White", "Pawn", 48, 3);
    design.setup("White", "Pawn", 49, 3);
    design.setup("White", "Pawn", 50, 3);
    design.setup("White", "Pawn", 51, 3);
    design.setup("White", "Pawn", 52, 3);
    design.setup("White", "Pawn", 53, 3);
    design.setup("White", "Pawn", 54, 3);
    design.setup("White", "Pawn", 55, 3);
    design.setup("White", "Queen", 57, 3);
    design.setup("White", "Queen", 59, 3);
    design.setup("White", "Queen", 62, 3);
    design.setup("White", "King", 60, 3);
    design.setup("Black", "Pawn", 8, 3);
    design.setup("Black", "Pawn", 9, 3);
    design.setup("Black", "Pawn", 10, 3);
    design.setup("Black", "Pawn", 11, 3);
    design.setup("Black", "Pawn", 12, 3);
    design.setup("Black", "Pawn", 13, 3);
    design.setup("Black", "Pawn", 14, 3);
    design.setup("Black", "Pawn", 15, 3);
    design.setup("Black", "Knight", 0, 3);
    design.setup("Black", "Knight", 1, 3);
    design.setup("Black", "Knight", 2, 3);
    design.setup("Black", "Knight", 3, 3);
    design.setup("Black", "Knight", 5, 3);
    design.setup("Black", "Knight", 6, 3);
    design.setup("Black", "Knight", 7, 3);
    design.setup("Black", "King", 4, 3);

    design.setup("White", "Pawn", 48, 4);
    design.setup("White", "Pawn", 49, 4);
    design.setup("White", "Pawn", 50, 4);
    design.setup("White", "Pawn", 51, 4);
    design.setup("White", "Pawn", 52, 4);
    design.setup("White", "Pawn", 53, 4);
    design.setup("White", "Pawn", 54, 4);
    design.setup("White", "Pawn", 55, 4);
    design.setup("White", "Rook", 56, 4);
    design.setup("White", "Rook", 63, 4);
    design.setup("White", "Knight", 57, 4);
    design.setup("White", "Knight", 62, 4);
    design.setup("White", "Bishop", 58, 4);
    design.setup("White", "Bishop", 61, 4);
    design.setup("White", "Queen", 59, 4);
    design.setup("White", "King", 60, 4);
    design.setup("Black", "Pawn", 8, 4);
    design.setup("Black", "Pawn", 9, 4);
    design.setup("Black", "Pawn", 10, 4);
    design.setup("Black", "Pawn", 11, 4);
    design.setup("Black", "Pawn", 12, 4);
    design.setup("Black", "Pawn", 13, 4);
    design.setup("Black", "Pawn", 14, 4);
    design.setup("Black", "Pawn", 15, 4);
    design.setup("Black", "Pawn", 18, 4);
    design.setup("Black", "Pawn", 21, 4);
    design.setup("Black", "Pawn", 25, 4);
    design.setup("Black", "Pawn", 26, 4);
    design.setup("Black", "Pawn", 27, 4);
    design.setup("Black", "Pawn", 28, 4);
    design.setup("Black", "Pawn", 29, 4);
    design.setup("Black", "Pawn", 30, 4);
    design.setup("Black", "Knight", 0, 4);
    design.setup("Black", "Knight", 1, 4);
    design.setup("Black", "Knight", 2, 4);
    design.setup("Black", "Knight", 3, 4);
    design.setup("Black", "Knight", 5, 4);
    design.setup("Black", "Knight", 6, 4);
    design.setup("Black", "Knight", 7, 4);
    design.setup("Black", "King", 4, 4);

    design.setup("White", "Pawn", 52, 5);
    design.setup("White", "Knight", 57, 5);
    design.setup("White", "Knight", 58, 5);
    design.setup("White", "Knight", 61, 5);
    design.setup("White", "Knight", 62, 5);
    design.setup("White", "Knight", 62, 5);
    design.setup("White", "King", 60, 5);
    design.setup("Black", "King", 4, 5);
    design.setup("Black", "Pawn", 8, 5);
    design.setup("Black", "Pawn", 9, 5);
    design.setup("Black", "Pawn", 10, 5);
    design.setup("Black", "Pawn", 11, 5);
    design.setup("Black", "Pawn", 12, 5);
    design.setup("Black", "Pawn", 13, 5);
    design.setup("Black", "Pawn", 14, 5);
    design.setup("Black", "Pawn", 15, 5);

    design.setup("White", "Pawn", 56, 6);
    design.setup("White", "Pawn", 57, 6);
    design.setup("White", "Pawn", 58, 6);
    design.setup("White", "Pawn", 59, 6);
    design.setup("White", "Pawn", 60, 6);
    design.setup("White", "Pawn", 61, 6);
    design.setup("White", "Pawn", 62, 6);
    design.setup("White", "Pawn", 63, 6);
    design.setup("White", "Pawn", 48, 6);
    design.setup("White", "Pawn", 49, 6);
    design.setup("White", "Pawn", 50, 6);
    design.setup("White", "Pawn", 51, 6);
    design.setup("White", "Pawn", 52, 6);
    design.setup("White", "Pawn", 53, 6);
    design.setup("White", "Pawn", 54, 6);
    design.setup("White", "Pawn", 55, 6);
    design.setup("White", "Pawn", 40, 6);
    design.setup("White", "Pawn", 41, 6);
    design.setup("White", "Pawn", 42, 6);
    design.setup("White", "Pawn", 43, 6);
    design.setup("White", "Pawn", 44, 6);
    design.setup("White", "Pawn", 45, 6);
    design.setup("White", "Pawn", 46, 6);
    design.setup("White", "Pawn", 47, 6);
    design.setup("White", "Pawn", 32, 6);
    design.setup("White", "Pawn", 33, 6);
    design.setup("White", "Pawn", 34, 6);
    design.setup("White", "Pawn", 35, 6);
    design.setup("White", "Pawn", 36, 6);
    design.setup("White", "Pawn", 37, 6);
    design.setup("White", "Pawn", 38, 6);
    design.setup("White", "Pawn", 39, 6);
    design.setup("Black", "Pawn", 8, 6);
    design.setup("Black", "Pawn", 9, 6);
    design.setup("Black", "Pawn", 10, 6);
    design.setup("Black", "Pawn", 11, 6);
    design.setup("Black", "Pawn", 12, 6);
    design.setup("Black", "Pawn", 13, 6);
    design.setup("Black", "Pawn", 14, 6);
    design.setup("Black", "Pawn", 15, 6);
    design.setup("Black", "Rook", 0, 6);
    design.setup("Black", "Rook", 7, 6);
    design.setup("Black", "Knight", 1, 6);
    design.setup("Black", "Knight", 6, 6);
    design.setup("Black", "Bishop", 2, 6);
    design.setup("Black", "Bishop", 5, 6);
    design.setup("Black", "Queen", 3, 6);
    design.setup("Black", "King", 4, 6);

    design.setup("White", "Pawn", 48, 7);
    design.setup("White", "Pawn", 49, 7);
    design.setup("White", "Pawn", 50, 7);
    design.setup("White", "Pawn", 51, 7);
    design.setup("White", "Pawn", 52, 7);
    design.setup("White", "Pawn", 53, 7);
    design.setup("White", "Pawn", 54, 7);
    design.setup("White", "Pawn", 55, 7);
    design.setup("White", "Rook", 56, 7);
    design.setup("White", "Rook", 63, 7);
    design.setup("White", "Knight", 57, 7);
    design.setup("White", "Knight", 62, 7);
    design.setup("White", "Bishop", 58, 7);
    design.setup("White", "Bishop", 61, 7);
    design.setup("White", "Queen", 59, 7);
    design.setup("White", "King", 60, 7);
    design.setup("Black", "Pawn", 0, 7);
    design.setup("Black", "Pawn", 1, 7);
    design.setup("Black", "Pawn", 2, 7);
    design.setup("Black", "Pawn", 5, 7);
    design.setup("Black", "Pawn", 6, 7);
    design.setup("Black", "Pawn", 7, 7);
    design.setup("Black", "Pawn", 8, 7);
    design.setup("Black", "Pawn", 9, 7);
    design.setup("Black", "Pawn", 10, 7);
    design.setup("Black", "Pawn", 11, 7);
    design.setup("Black", "Pawn", 12, 7);
    design.setup("Black", "Pawn", 13, 7);
    design.setup("Black", "Pawn", 14, 7);
    design.setup("Black", "Pawn", 15, 7);
    design.setup("Black", "Pawn", 16, 7);
    design.setup("Black", "Pawn", 17, 7);
    design.setup("Black", "Pawn", 18, 7);
    design.setup("Black", "Pawn", 19, 7);
    design.setup("Black", "Pawn", 20, 7);
    design.setup("Black", "Pawn", 21, 7);
    design.setup("Black", "Pawn", 22, 7);
    design.setup("Black", "Pawn", 23, 7);
    design.setup("Black", "Pawn", 24, 7);
    design.setup("Black", "Pawn", 25, 7);
    design.setup("Black", "Pawn", 26, 7);
    design.setup("Black", "Pawn", 27, 7);
    design.setup("Black", "Pawn", 28, 7);
    design.setup("Black", "Pawn", 29, 7);
    design.setup("Black", "Pawn", 30, 7);
    design.setup("Black", "Pawn", 31, 7);
    design.setup("Black", "Pawn", 35, 7);
    design.setup("Black", "Pawn", 36, 7);

    design.setup("White", "Pawn", 48, 8);
    design.setup("White", "Pawn", 49, 8);
    design.setup("White", "Pawn", 50, 8);
    design.setup("White", "Pawn", 51, 8);
    design.setup("White", "Pawn", 52, 8);
    design.setup("White", "Pawn", 53, 8);
    design.setup("White", "Pawn", 54, 8);
    design.setup("White", "Pawn", 55, 8);
    design.setup("White", "Rook", 56, 8);
    design.setup("White", "Rook", 63, 8);
    design.setup("White", "Knight", 57, 8);
    design.setup("White", "Knight", 62, 8);
    design.setup("White", "Bishop", 58, 8);
    design.setup("White", "Bishop", 61, 8);
    design.setup("White", "Queen", 59, 8);
    design.setup("White", "King", 60, 8);
    design.setup("Black", "Pawn", 0, 8);
    design.setup("Black", "Pawn", 1, 8);
    design.setup("Black", "Pawn", 2, 8);
    design.setup("Black", "Pawn", 3, 8);
    design.setup("Black", "Pawn", 4, 8);
    design.setup("Black", "Pawn", 5, 8);
    design.setup("Black", "Pawn", 6, 8);
    design.setup("Black", "Pawn", 7, 8);
    design.setup("Black", "Pawn", 8, 8);
    design.setup("Black", "Pawn", 9, 8);
    design.setup("Black", "Pawn", 10, 8);
    design.setup("Black", "Pawn", 11, 8);
    design.setup("Black", "Pawn", 12, 8);
    design.setup("Black", "Pawn", 13, 8);
    design.setup("Black", "Pawn", 14, 8);
    design.setup("Black", "Pawn", 15, 8);
    design.setup("Black", "Pawn", 16, 8);
    design.setup("Black", "Pawn", 17, 8);
    design.setup("Black", "Pawn", 18, 8);
    design.setup("Black", "Pawn", 19, 8);
    design.setup("Black", "Pawn", 20, 8);
    design.setup("Black", "Pawn", 21, 8);
    design.setup("Black", "Pawn", 22, 8);
    design.setup("Black", "Pawn", 23, 8);
    design.setup("Black", "Pawn", 24, 8);
    design.setup("Black", "Pawn", 25, 8);
    design.setup("Black", "Pawn", 26, 8);
    design.setup("Black", "Pawn", 27, 8);
    design.setup("Black", "Pawn", 28, 8);
    design.setup("Black", "Pawn", 29, 8);
    design.setup("Black", "Pawn", 30, 8);
    design.setup("Black", "Pawn", 31, 8);
    design.setup("Black", "Pawn", 33, 8);
    design.setup("Black", "Pawn", 34, 8);
    design.setup("Black", "Pawn", 37, 8);
    design.setup("Black", "Pawn", 38, 8);

    design.setup("White", "Pawn", 48, 9);
    design.setup("White", "Pawn", 49, 9);
    design.setup("White", "Pawn", 50, 9);
    design.setup("White", "Pawn", 51, 9);
    design.setup("White", "Pawn", 52, 9);
    design.setup("White", "Pawn", 53, 9);
    design.setup("White", "Pawn", 54, 9);
    design.setup("White", "Pawn", 55, 9);
    design.setup("White", "Rook", 56, 9);
    design.setup("White", "Rook", 63, 9);
    design.setup("White", "Knight", 57, 9);
    design.setup("White", "Knight", 62, 9);
    design.setup("White", "Bishop", 58, 9);
    design.setup("White", "Bishop", 61, 9);
    design.setup("White", "Queen", 59, 9);
    design.setup("White", "King", 60, 9);
    design.setup("Black", "Knight", 8, 9);
    design.setup("Black", "Knight", 9, 9);
    design.setup("Black", "Knight", 10, 9);
    design.setup("Black", "Knight", 11, 9);
    design.setup("Black", "Knight", 12, 9);
    design.setup("Black", "Knight", 13, 9);
    design.setup("Black", "Knight", 14, 9);
    design.setup("Black", "Knight", 15, 9);
    design.setup("Black", "Knight", 0, 9);
    design.setup("Black", "Knight", 7, 9);
    design.setup("Black", "Knight", 1, 9);
    design.setup("Black", "Knight", 6, 9);
    design.setup("Black", "Knight", 2, 9);
    design.setup("Black", "Knight", 5, 9);
    design.setup("Black", "Knight", 3, 9);
    design.setup("Black", "King", 4, 9);
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
 
    view.defPosition("a8", 478, 478, 68, 68);
    view.defPosition("b8", 410, 478, 68, 68);
    view.defPosition("c8", 342, 478, 68, 68);
    view.defPosition("d8", 274, 478, 68, 68);
    view.defPosition("e8", 206, 478, 68, 68);
    view.defPosition("f8", 138, 478, 68, 68);
    view.defPosition("g8", 70, 478, 68, 68);
    view.defPosition("h8", 2, 478, 68, 68);
    view.defPosition("a7", 478, 410, 68, 68);
    view.defPosition("b7", 410, 410, 68, 68);
    view.defPosition("c7", 342, 410, 68, 68);
    view.defPosition("d7", 274, 410, 68, 68);
    view.defPosition("e7", 206, 410, 68, 68);
    view.defPosition("f7", 138, 410, 68, 68);
    view.defPosition("g7", 70, 410, 68, 68);
    view.defPosition("h7", 2, 410, 68, 68);
    view.defPosition("a6", 478, 342, 68, 68);
    view.defPosition("b6", 410, 342, 68, 68);
    view.defPosition("c6", 342, 342, 68, 68);
    view.defPosition("d6", 274, 342, 68, 68);
    view.defPosition("e6", 206, 342, 68, 68);
    view.defPosition("f6", 138, 342, 68, 68);
    view.defPosition("g6", 70, 342, 68, 68);
    view.defPosition("h6", 2, 342, 68, 68);
    view.defPosition("a5", 478, 274, 68, 68);
    view.defPosition("b5", 410, 274, 68, 68);
    view.defPosition("c5", 342, 274, 68, 68);
    view.defPosition("d5", 274, 274, 68, 68);
    view.defPosition("e5", 206, 274, 68, 68);
    view.defPosition("f5", 138, 274, 68, 68);
    view.defPosition("g5", 70, 274, 68, 68);
    view.defPosition("h5", 2, 274, 68, 68);
    view.defPosition("a4", 478, 206, 68, 68);
    view.defPosition("b4", 410, 206, 68, 68);
    view.defPosition("c4", 342, 206, 68, 68);
    view.defPosition("d4", 274, 206, 68, 68);
    view.defPosition("e4", 206, 206, 68, 68);
    view.defPosition("f4", 138, 206, 68, 68);
    view.defPosition("g4", 70, 206, 68, 68);
    view.defPosition("h4", 2, 206, 68, 68);
    view.defPosition("a3", 478, 138, 68, 68);
    view.defPosition("b3", 410, 138, 68, 68);
    view.defPosition("c3", 342, 138, 68, 68);
    view.defPosition("d3", 274, 138, 68, 68);
    view.defPosition("e3", 206, 138, 68, 68);
    view.defPosition("f3", 138, 138, 68, 68);
    view.defPosition("g3", 70, 138, 68, 68);
    view.defPosition("h3", 2, 138, 68, 68);
    view.defPosition("a2", 478, 70, 68, 68);
    view.defPosition("b2", 410, 70, 68, 68);
    view.defPosition("c2", 342, 70, 68, 68);
    view.defPosition("d2", 274, 70, 68, 68);
    view.defPosition("e2", 206, 70, 68, 68);
    view.defPosition("f2", 138, 70, 68, 68);
    view.defPosition("g2", 70, 70, 68, 68);
    view.defPosition("h2", 2, 70, 68, 68);
    view.defPosition("a1", 478, 2, 68, 68);
    view.defPosition("b1", 410, 2, 68, 68);
    view.defPosition("c1", 342, 2, 68, 68);
    view.defPosition("d1", 274, 2, 68, 68);
    view.defPosition("e1", 206, 2, 68, 68);
    view.defPosition("f1", 138, 2, 68, 68);
    view.defPosition("g1", 70, 2, 68, 68);
    view.defPosition("h1", 2, 2, 68, 68);

    view.defPopup("Promote", 127, 100);
    view.defPopupPosition("X1", 10, 7, 68, 68);
    view.defPopupPosition("X2", 80, 7, 68, 68);
    view.defPopupPosition("X3", 150, 7, 68, 68);
    view.defPopupPosition("X4", 220, 7, 68, 68);
}
