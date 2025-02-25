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
    design.checkVersion("animate-drops", "false");
    design.checkVersion("animate-captures", "false");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-blink", "false");
    design.checkVersion("show-captures", "false");
    design.checkVersion("show-lose", "false");

    design.addDirection("s"); // 0
    design.addDirection("e"); // 1
    design.addDirection("w"); // 2
    design.addDirection("n"); // 3

    design.addPlayer("Red", [3, 2, 1, 0]);
    design.addPlayer("Blue", [0, 1, 2, 3]);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(1);
    design.addTurn(2);
    design.addTurn(2);
    design.addTurn(2);
    design.addTurn(2);
    design.addTurn(2);
    design.addTurn(2);
    design.addTurn(2);
    design.addTurn(2);
    design.addTurn(2);
    design.addTurn(2);
    design.repeatMark();
    design.addTurn(1);
    design.addTurn(2);

    design.addPosition("a8", [8, 1, 0, 0]);
    design.addPosition("b8", [8, 1, -1, 0]);
    design.addPosition("c8", [8, 1, -1, 0]);
    design.addPosition("d8", [8, 1, -1, 0]);
    design.addPosition("e8", [8, 1, -1, 0]);
    design.addPosition("f8", [8, 1, -1, 0]);
    design.addPosition("g8", [8, 1, -1, 0]);
    design.addPosition("h8", [8, 0, -1, 0]);
    design.addPosition("a7", [8, 1, 0, -8]);
    design.addPosition("b7", [8, 1, -1, -8]);
    design.addPosition("c7", [8, 1, -1, -8]);
    design.addPosition("d7", [8, 1, -1, -8]);
    design.addPosition("e7", [8, 1, -1, -8]);
    design.addPosition("f7", [8, 1, -1, -8]);
    design.addPosition("g7", [8, 1, -1, -8]);
    design.addPosition("h7", [8, 0, -1, -8]);
    design.addPosition("a6", [8, 1, 0, -8]);
    design.addPosition("b6", [8, 1, -1, -8]);
    design.addPosition("c6", [0, 1, -1, -8]);
    design.addPosition("d6", [8, 1, -1, -8]);
    design.addPosition("e6", [8, 1, -1, -8]);
    design.addPosition("f6", [0, 1, -1, -8]);
    design.addPosition("g6", [8, 1, -1, -8]);
    design.addPosition("h6", [8, 0, -1, -8]);
    design.addPosition("a5", [8, 1, 0, -8]);
    design.addPosition("b5", [8, 0, -1, -8]);
    design.addPosition("c5", [0, 1, 2, 3]);
    design.addPosition("d5", [8, 1, 0, -8]);
    design.addPosition("e5", [8, 0, -1, -8]);
    design.addPosition("f5", [0, 1, 2, 3]);
    design.addPosition("g5", [8, 1, 0, -8]);
    design.addPosition("h5", [8, 0, -1, -8]);
    design.addPosition("a4", [8, 1, 0, -8]);
    design.addPosition("b4", [8, 0, -1, -8]);
    design.addPosition("c4", [0, 1, 2, 3]);
    design.addPosition("d4", [8, 1, 0, -8]);
    design.addPosition("e4", [8, 0, -1, -8]);
    design.addPosition("f4", [0, 1, 2, 3]);
    design.addPosition("g4", [8, 1, 0, -8]);
    design.addPosition("h4", [8, 0, -1, -8]);
    design.addPosition("a3", [8, 1, 0, -8]);
    design.addPosition("b3", [8, 1, -1, -8]);
    design.addPosition("c3", [8, 1, -1, 0]);
    design.addPosition("d3", [8, 1, -1, -8]);
    design.addPosition("e3", [8, 1, -1, -8]);
    design.addPosition("f3", [8, 1, -1, 0]);
    design.addPosition("g3", [8, 1, -1, -8]);
    design.addPosition("h3", [8, 0, -1, -8]);
    design.addPosition("a2", [8, 1, 0, -8]);
    design.addPosition("b2", [8, 1, -1, -8]);
    design.addPosition("c2", [8, 1, -1, -8]);
    design.addPosition("d2", [8, 1, -1, -8]);
    design.addPosition("e2", [8, 1, -1, -8]);
    design.addPosition("f2", [8, 1, -1, -8]);
    design.addPosition("g2", [8, 1, -1, -8]);
    design.addPosition("h2", [8, 0, -1, -8]);
    design.addPosition("a1", [0, 1, 0, -8]);
    design.addPosition("b1", [0, 1, -1, -8]);
    design.addPosition("c1", [0, 1, -1, -8]);
    design.addPosition("d1", [0, 1, -1, -8]);
    design.addPosition("e1", [0, 1, -1, -8]);
    design.addPosition("f1", [0, 1, -1, -8]);
    design.addPosition("g1", [0, 1, -1, -8]);
    design.addPosition("h1", [0, 0, -1, -8]);

    design.addZone("home-zone", 1, [56, 57, 58, 59, 60, 61, 62, 63, 48, 49, 50, 51, 52, 53, 54, 55, 40, 41, 42, 43, 44, 45, 46, 47]);
    design.addZone("home-zone", 2, [16, 17, 18, 19, 20, 21, 22, 23, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7]);

    design.addCommand(0, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.IN_ZONE,	0);	// home-zone
    design.addCommand(0, ZRF.FUNCTION,	20);	// verify
    design.addCommand(0, ZRF.FUNCTION,	25);	// to
    design.addCommand(0, ZRF.FUNCTION,	28);	// end

    design.addCommand(1, ZRF.FUNCTION,	24);	// from
    design.addCommand(1, ZRF.PARAM,	0);	// $1
    design.addCommand(1, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(1, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(1, ZRF.FUNCTION,	0);	// not
    design.addCommand(1, ZRF.FUNCTION,	20);	// verify
    design.addCommand(1, ZRF.FUNCTION,	25);	// to
    design.addCommand(1, ZRF.FUNCTION,	28);	// end

    design.addCommand(2, ZRF.FUNCTION,	24);	// from
    design.addCommand(2, ZRF.PARAM,	0);	// $1
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PARAM,	1);	// $2
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.IF,	8);
    design.addCommand(2, ZRF.FORK,	4);
    design.addCommand(2, ZRF.PROMOTE,	14);	// ScoutOpened
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end
    design.addCommand(2, ZRF.PARAM,	2);	// $3
    design.addCommand(2, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(2, ZRF.JUMP,	-9);
    design.addCommand(2, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(2, ZRF.FUNCTION,	0);	// not
    design.addCommand(2, ZRF.FUNCTION,	20);	// verify
    design.addCommand(2, ZRF.PROMOTE,	14);	// ScoutOpened
    design.addCommand(2, ZRF.FUNCTION,	25);	// to
    design.addCommand(2, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// priority-type
    design.addPriority(1);			// drop-type
    design.addPriority(2);			// normal-type

    design.addPiece("Flag", 0, 10000);
    design.addDrop(0, 0, [], 0);

    design.addPiece("Spy", 1, 100);
    design.addDrop(1, 0, [], 1);
    design.addMove(1, 1, [3], 2);
    design.addMove(1, 1, [1], 2);
    design.addMove(1, 1, [2], 2);
    design.addMove(1, 1, [0], 2);

    design.addPiece("Scout", 2, 50);
    design.addDrop(2, 0, [], 1);
    design.addMove(2, 1, [3], 2);
    design.addMove(2, 1, [1], 2);
    design.addMove(2, 1, [2], 2);
    design.addMove(2, 1, [0], 2);
    design.addMove(2, 2, [3, 3, 3], 2);
    design.addMove(2, 2, [1, 1, 1], 2);
    design.addMove(2, 2, [2, 2, 2], 2);
    design.addMove(2, 2, [0, 0, 0], 2);

    design.addPiece("Disarmer", 3, 200);
    design.addDrop(3, 0, [], 1);
    design.addMove(3, 1, [3], 2);
    design.addMove(3, 1, [1], 2);
    design.addMove(3, 1, [2], 2);
    design.addMove(3, 1, [0], 2);

    design.addPiece("Sergeant", 4, 40);
    design.addDrop(4, 0, [], 1);
    design.addMove(4, 1, [3], 2);
    design.addMove(4, 1, [1], 2);
    design.addMove(4, 1, [2], 2);
    design.addMove(4, 1, [0], 2);

    design.addPiece("Lieutenant", 5, 50);
    design.addDrop(5, 0, [], 1);
    design.addMove(5, 1, [3], 2);
    design.addMove(5, 1, [1], 2);
    design.addMove(5, 1, [2], 2);
    design.addMove(5, 1, [0], 2);

    design.addPiece("Captain", 6, 60);
    design.addDrop(6, 0, [], 1);
    design.addMove(6, 1, [3], 2);
    design.addMove(6, 1, [1], 2);
    design.addMove(6, 1, [2], 2);
    design.addMove(6, 1, [0], 2);

    design.addPiece("Major", 7, 70);
    design.addDrop(7, 0, [], 1);
    design.addMove(7, 1, [3], 2);
    design.addMove(7, 1, [1], 2);
    design.addMove(7, 1, [2], 2);
    design.addMove(7, 1, [0], 2);

    design.addPiece("Brigadier", 8, 80);
    design.addDrop(8, 0, [], 1);
    design.addMove(8, 1, [3], 2);
    design.addMove(8, 1, [1], 2);
    design.addMove(8, 1, [2], 2);
    design.addMove(8, 1, [0], 2);

    design.addPiece("General", 9, 90);
    design.addDrop(9, 0, [], 1);
    design.addMove(9, 1, [3], 2);
    design.addMove(9, 1, [1], 2);
    design.addMove(9, 1, [2], 2);
    design.addMove(9, 1, [0], 2);

    design.addPiece("Commandant", 10, 100);
    design.addDrop(10, 0, [], 1);
    design.addMove(10, 1, [3], 2);
    design.addMove(10, 1, [1], 2);
    design.addMove(10, 1, [2], 2);
    design.addMove(10, 1, [0], 2);

    design.addPiece("Bomb", 11, 2);
    design.addDrop(11, 0, [], 0);

    design.addPiece("FlagOpened", 12, 10000);

    design.addPiece("SpyOpened", 13, 100);
    design.addMove(13, 1, [3], 2);
    design.addMove(13, 1, [1], 2);
    design.addMove(13, 1, [2], 2);
    design.addMove(13, 1, [0], 2);

    design.addPiece("ScoutOpened", 14, 50);
    design.addMove(14, 1, [3], 2);
    design.addMove(14, 1, [1], 2);
    design.addMove(14, 1, [2], 2);
    design.addMove(14, 1, [0], 2);
    design.addMove(14, 2, [3, 3, 3], 2);
    design.addMove(14, 2, [1, 1, 1], 2);
    design.addMove(14, 2, [2, 2, 2], 2);
    design.addMove(14, 2, [0, 0, 0], 2);

    design.addPiece("DisarmerOpened", 15, 200);
    design.addMove(15, 1, [3], 2);
    design.addMove(15, 1, [1], 2);
    design.addMove(15, 1, [2], 2);
    design.addMove(15, 1, [0], 2);

    design.addPiece("SergeantOpened", 16, 40);
    design.addMove(16, 1, [3], 2);
    design.addMove(16, 1, [1], 2);
    design.addMove(16, 1, [2], 2);
    design.addMove(16, 1, [0], 2);

    design.addPiece("LieutenantOpened", 17, 50);
    design.addMove(17, 1, [3], 2);
    design.addMove(17, 1, [1], 2);
    design.addMove(17, 1, [2], 2);
    design.addMove(17, 1, [0], 2);

    design.addPiece("CaptainOpened", 18, 60);
    design.addMove(18, 1, [3], 2);
    design.addMove(18, 1, [1], 2);
    design.addMove(18, 1, [2], 2);
    design.addMove(18, 1, [0], 2);

    design.addPiece("MajorOpened", 19, 70);
    design.addMove(19, 1, [3], 2);
    design.addMove(19, 1, [1], 2);
    design.addMove(19, 1, [2], 2);
    design.addMove(19, 1, [0], 2);

    design.addPiece("BrigadierOpened", 20, 80);
    design.addMove(20, 1, [3], 2);
    design.addMove(20, 1, [1], 2);
    design.addMove(20, 1, [2], 2);
    design.addMove(20, 1, [0], 2);

    design.addPiece("GeneralOpened", 21, 90);
    design.addMove(21, 1, [3], 2);
    design.addMove(21, 1, [1], 2);
    design.addMove(21, 1, [2], 2);
    design.addMove(21, 1, [0], 2);

    design.addPiece("CommandantOpened", 22, 100);
    design.addMove(22, 1, [3], 2);
    design.addMove(22, 1, [1], 2);
    design.addMove(22, 1, [2], 2);
    design.addMove(22, 1, [0], 2);

    design.addPiece("BombOpened", 23, 2);

    design.reserve("Red", "Flag", 1);
    design.reserve("Red", "Spy", 1);
    design.reserve("Red", "Scout", 2);
    design.reserve("Red", "Disarmer", 2);
    design.reserve("Red", "Sergeant", 0);
    design.reserve("Red", "Lieutenant", 0);
    design.reserve("Red", "Captain", 0);
    design.reserve("Red", "Major", 0);
    design.reserve("Red", "Brigadier", 0);
    design.reserve("Red", "General", 1);
    design.reserve("Red", "Commandant", 1);
    design.reserve("Red", "Bomb", 2);
    design.reserve("Blue", "Flag", 1);
    design.reserve("Blue", "Spy", 1);
    design.reserve("Blue", "Scout", 2);
    design.reserve("Blue", "Disarmer", 2);
    design.reserve("Blue", "Sergeant", 0);
    design.reserve("Blue", "Lieutenant", 0);
    design.reserve("Blue", "Captain", 0);
    design.reserve("Blue", "Major", 0);
    design.reserve("Blue", "Brigadier", 0);
    design.reserve("Blue", "General", 1);
    design.reserve("Blue", "Commandant", 1);
    design.reserve("Blue", "Bomb", 2);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("RedFlag", "Red Flag");
    view.defPiece("BlueFlag", "Blue Flag");
    view.defPiece("RedSpy", "Red Spy");
    view.defPiece("BlueSpy", "Blue Spy");
    view.defPiece("RedScout", "Red Scout");
    view.defPiece("BlueScout", "Blue Scout");
    view.defPiece("RedDisarmer", "Red Disarmer");
    view.defPiece("BlueDisarmer", "Blue Disarmer");
    view.defPiece("RedSergeant", "Red Sergeant");
    view.defPiece("BlueSergeant", "Blue Sergeant");
    view.defPiece("RedLieutenant", "Red Lieutenant");
    view.defPiece("BlueLieutenant", "Blue Lieutenant");
    view.defPiece("RedCaptain", "Red Captain");
    view.defPiece("BlueCaptain", "Blue Captain");
    view.defPiece("RedMajor", "Red Major");
    view.defPiece("BlueMajor", "Blue Major");
    view.defPiece("RedBrigadier", "Red Brigadier");
    view.defPiece("BlueBrigadier", "Blue Brigadier");
    view.defPiece("RedGeneral", "Red General");
    view.defPiece("BlueGeneral", "Blue General");
    view.defPiece("RedCommandant", "Red Commandant");
    view.defPiece("BlueCommandant", "Blue Commandant");
    view.defPiece("RedBomb", "Red Bomb");
    view.defPiece("BlueBomb", "Blue Bomb");
    view.defPiece("RedFlagOpened", "Red FlagOpened");
    view.defPiece("BlueFlagOpened", "Blue FlagOpened");
    view.defPiece("RedSpyOpened", "Red SpyOpened");
    view.defPiece("BlueSpyOpened", "Blue SpyOpened");
    view.defPiece("RedScoutOpened", "Red ScoutOpened");
    view.defPiece("BlueScoutOpened", "Blue ScoutOpened");
    view.defPiece("RedDisarmerOpened", "Red DisarmerOpened");
    view.defPiece("BlueDisarmerOpened", "Blue DisarmerOpened");
    view.defPiece("RedSergeantOpened", "Red SergeantOpened");
    view.defPiece("BlueSergeantOpened", "Blue SergeantOpened");
    view.defPiece("RedLieutenantOpened", "Red LieutenantOpened");
    view.defPiece("BlueLieutenantOpened", "Blue LieutenantOpened");
    view.defPiece("RedCaptainOpened", "Red CaptainOpened");
    view.defPiece("BlueCaptainOpened", "Blue CaptainOpened");
    view.defPiece("RedMajorOpened", "Red MajorOpened");
    view.defPiece("BlueMajorOpened", "Blue MajorOpened");
    view.defPiece("RedBrigadierOpened", "Red BrigadierOpened");
    view.defPiece("BlueBrigadierOpened", "Blue BrigadierOpened");
    view.defPiece("RedGeneralOpened", "Red GeneralOpened");
    view.defPiece("BlueGeneralOpened", "Blue GeneralOpened");
    view.defPiece("RedCommandantOpened", "Red CommandantOpened");
    view.defPiece("BlueCommandantOpened", "Blue CommandantOpened");
    view.defPiece("RedBombOpened", "Red BombOpened");
    view.defPiece("BlueBombOpened", "Blue BombOpened");
    view.defPiece("Ko", "Ko");
 
    view.defPosition("a8", 281, 281, 40, 40);
    view.defPosition("b8", 241, 281, 40, 40);
    view.defPosition("c8", 201, 281, 40, 40);
    view.defPosition("d8", 161, 281, 40, 40);
    view.defPosition("e8", 121, 281, 40, 40);
    view.defPosition("f8", 81, 281, 40, 40);
    view.defPosition("g8", 41, 281, 40, 40);
    view.defPosition("h8", 1, 281, 40, 40);
    view.defPosition("a7", 281, 241, 40, 40);
    view.defPosition("b7", 241, 241, 40, 40);
    view.defPosition("c7", 201, 241, 40, 40);
    view.defPosition("d7", 161, 241, 40, 40);
    view.defPosition("e7", 121, 241, 40, 40);
    view.defPosition("f7", 81, 241, 40, 40);
    view.defPosition("g7", 41, 241, 40, 40);
    view.defPosition("h7", 1, 241, 40, 40);
    view.defPosition("a6", 281, 201, 40, 40);
    view.defPosition("b6", 241, 201, 40, 40);
    view.defPosition("c6", 201, 201, 40, 40);
    view.defPosition("d6", 161, 201, 40, 40);
    view.defPosition("e6", 121, 201, 40, 40);
    view.defPosition("f6", 81, 201, 40, 40);
    view.defPosition("g6", 41, 201, 40, 40);
    view.defPosition("h6", 1, 201, 40, 40);
    view.defPosition("a5", 281, 161, 40, 40);
    view.defPosition("b5", 241, 161, 40, 40);
    view.defPosition("c5", 201, 161, 40, 40);
    view.defPosition("d5", 161, 161, 40, 40);
    view.defPosition("e5", 121, 161, 40, 40);
    view.defPosition("f5", 81, 161, 40, 40);
    view.defPosition("g5", 41, 161, 40, 40);
    view.defPosition("h5", 1, 161, 40, 40);
    view.defPosition("a4", 281, 121, 40, 40);
    view.defPosition("b4", 241, 121, 40, 40);
    view.defPosition("c4", 201, 121, 40, 40);
    view.defPosition("d4", 161, 121, 40, 40);
    view.defPosition("e4", 121, 121, 40, 40);
    view.defPosition("f4", 81, 121, 40, 40);
    view.defPosition("g4", 41, 121, 40, 40);
    view.defPosition("h4", 1, 121, 40, 40);
    view.defPosition("a3", 281, 81, 40, 40);
    view.defPosition("b3", 241, 81, 40, 40);
    view.defPosition("c3", 201, 81, 40, 40);
    view.defPosition("d3", 161, 81, 40, 40);
    view.defPosition("e3", 121, 81, 40, 40);
    view.defPosition("f3", 81, 81, 40, 40);
    view.defPosition("g3", 41, 81, 40, 40);
    view.defPosition("h3", 1, 81, 40, 40);
    view.defPosition("a2", 281, 41, 40, 40);
    view.defPosition("b2", 241, 41, 40, 40);
    view.defPosition("c2", 201, 41, 40, 40);
    view.defPosition("d2", 161, 41, 40, 40);
    view.defPosition("e2", 121, 41, 40, 40);
    view.defPosition("f2", 81, 41, 40, 40);
    view.defPosition("g2", 41, 41, 40, 40);
    view.defPosition("h2", 1, 41, 40, 40);
    view.defPosition("a1", 281, 1, 40, 40);
    view.defPosition("b1", 241, 1, 40, 40);
    view.defPosition("c1", 201, 1, 40, 40);
    view.defPosition("d1", 161, 1, 40, 40);
    view.defPosition("e1", 121, 1, 40, 40);
    view.defPosition("f1", 81, 1, 40, 40);
    view.defPosition("g1", 41, 1, 40, 40);
    view.defPosition("h1", 1, 1, 40, 40);
}
