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
    design.checkVersion("pass-partial", "true");
    design.checkVersion("smart-moves", "false");
    design.checkVersion("show-hints", "false");
    design.checkVersion("show-blink", "true");
    design.checkVersion("show-captures", "false");
    design.checkVersion("advisor-wait", "5");
    design.checkVersion("promote-dialog", "remap");
    design.checkVersion("tenjiku-shogi-extension", "true");
    design.checkVersion("tenjiku-shogi-promotion", "true");

    design.addDirection("w");
    design.addDirection("e");
    design.addDirection("s");
    design.addDirection("ne");
    design.addDirection("n");
    design.addDirection("se");
    design.addDirection("sw");
    design.addDirection("nw");

    design.addPlayer("Black", [1, 0, 4, 6, 2, 7, 3, 5]);
    design.addPlayer("White", [0, 1, 4, 5, 2, 3, 7, 6]);

    design.addPosition("16a", [0, 1, 16, 0, 0, 17, 0, 0]);
    design.addPosition("15a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("14a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("13a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("12a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("11a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("10a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("9a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("8a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("7a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("6a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("5a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("4a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("3a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("2a", [-1, 1, 16, 0, 0, 17, 15, 0]);
    design.addPosition("1a", [-1, 0, 16, 0, 0, 0, 15, 0]);
    design.addPosition("16b", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2b", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1b", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16c", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2c", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1c", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16d", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2d", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1d", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16e", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2e", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1e", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16f", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2f", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1f", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16g", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2g", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1g", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16h", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2h", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1h", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16i", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2i", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1i", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16j", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2j", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1j", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16k", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2k", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1k", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16l", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2l", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1l", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16m", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2m", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1m", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16n", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2n", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1n", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16o", [0, 1, 16, -15, -16, 17, 0, 0]);
    design.addPosition("15o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("14o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("13o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("12o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("11o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("10o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("9o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("8o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("7o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("6o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("5o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("4o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("3o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("2o", [-1, 1, 16, -15, -16, 17, 15, -17]);
    design.addPosition("1o", [-1, 0, 16, 0, -16, 0, 15, -17]);
    design.addPosition("16p", [0, 1, 0, -15, -16, 0, 0, 0]);
    design.addPosition("15p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("14p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("13p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("12p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("11p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("10p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("9p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("8p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("7p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("6p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("5p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("4p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("3p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("2p", [-1, 1, 0, -15, -16, 0, 0, -17]);
    design.addPosition("1p", [-1, 0, 0, 0, -16, 0, 0, -17]);

    design.addZone("promotion-zone", 2, [191, 190, 189, 188, 187, 186, 185, 184, 183, 182, 181, 180, 179, 178, 177, 176, 207, 206, 205, 204, 203, 202, 201, 200, 199, 198, 197, 196, 195, 194, 193, 192, 223, 222, 221, 220, 219, 218, 217, 216, 215, 214, 213, 212, 211, 210, 209, 208, 239, 238, 237, 236, 235, 234, 233, 232, 231, 230, 229, 228, 227, 226, 225, 224, 255, 254, 253, 252, 251, 250, 249, 248, 247, 246, 245, 244, 243, 242, 241, 240]);
    design.addZone("promotion-zone", 1, [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64]);

    design.addCommand(0, ZRF.FUNCTION,	24);	// from
    design.addCommand(0, ZRF.PARAM,	0);	// $1
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.PARAM,	1);	// $2
    design.addCommand(0, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(0, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(0, ZRF.FUNCTION,	0);	// not
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
    design.addCommand(3, ZRF.MODE,	1);	// left-1-type
    design.addCommand(3, ZRF.FUNCTION,	25);	// to
    design.addCommand(3, ZRF.FUNCTION,	28);	// end

    design.addCommand(4, ZRF.FUNCTION,	24);	// from
    design.addCommand(4, ZRF.PARAM,	0);	// $1
    design.addCommand(4, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(4, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(4, ZRF.FUNCTION,	0);	// not
    design.addCommand(4, ZRF.FUNCTION,	20);	// verify
    design.addCommand(4, ZRF.MODE,	2);	// left-nw-type
    design.addCommand(4, ZRF.FUNCTION,	25);	// to
    design.addCommand(4, ZRF.FUNCTION,	28);	// end

    design.addCommand(5, ZRF.FUNCTION,	24);	// from
    design.addCommand(5, ZRF.PARAM,	0);	// $1
    design.addCommand(5, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(5, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(5, ZRF.FUNCTION,	0);	// not
    design.addCommand(5, ZRF.FUNCTION,	20);	// verify
    design.addCommand(5, ZRF.MODE,	3);	// left-ne-type
    design.addCommand(5, ZRF.FUNCTION,	25);	// to
    design.addCommand(5, ZRF.FUNCTION,	28);	// end

    design.addCommand(6, ZRF.FUNCTION,	24);	// from
    design.addCommand(6, ZRF.PARAM,	0);	// $1
    design.addCommand(6, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(6, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(6, ZRF.FUNCTION,	20);	// verify
    design.addCommand(6, ZRF.PARAM,	1);	// $2
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
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	7);
    design.addCommand(7, ZRF.FORK,	3);
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end
    design.addCommand(7, ZRF.PARAM,	1);	// $2
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.JUMP,	-8);
    design.addCommand(7, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	14);
    design.addCommand(7, ZRF.LITERAL,	32);	// King
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.IF,	6);
    design.addCommand(7, ZRF.LITERAL,	33);	// Prince
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.IF,	3);
    design.addCommand(7, ZRF.LITERAL,	0);	// false
    design.addCommand(7, ZRF.JUMP,	2);
    design.addCommand(7, ZRF.LITERAL,	1);	// true
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	3);
    design.addCommand(7, ZRF.LITERAL,	1);	// true
    design.addCommand(7, ZRF.JUMP,	2);
    design.addCommand(7, ZRF.LITERAL,	0);	// false
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	3);
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.JUMP,	56);
    design.addCommand(7, ZRF.LITERAL,	32);	// King
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.IF,	53);
    design.addCommand(7, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	9);
    design.addCommand(7, ZRF.LITERAL,	32);	// King
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.IF,	6);
    design.addCommand(7, ZRF.LITERAL,	33);	// Prince
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.IF,	3);
    design.addCommand(7, ZRF.LITERAL,	1);	// true
    design.addCommand(7, ZRF.JUMP,	2);
    design.addCommand(7, ZRF.LITERAL,	0);	// false
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.IF,	4);
    design.addCommand(7, ZRF.FORK,	3);
    design.addCommand(7, ZRF.FUNCTION,	25);	// to
    design.addCommand(7, ZRF.FUNCTION,	28);	// end
    design.addCommand(7, ZRF.LITERAL,	32);	// King
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	33);	// Prince
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	49);	// Great-General
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	48);	// Vice-General
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	46);	// Rook-General
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	0);	// Rook-General!
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	44);	// Bishop-General
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.LITERAL,	1);	// Bishop-General!
    design.addCommand(7, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(7, ZRF.FUNCTION,	0);	// not
    design.addCommand(7, ZRF.FUNCTION,	20);	// verify
    design.addCommand(7, ZRF.PARAM,	2);	// $3
    design.addCommand(7, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(7, ZRF.JUMP,	-54);
    design.addCommand(7, ZRF.FUNCTION,	28);	// end

    design.addCommand(8, ZRF.FUNCTION,	24);	// from
    design.addCommand(8, ZRF.PARAM,	0);	// true
    design.addCommand(8, ZRF.SET_FLAG,	2);	// no-piece
    design.addCommand(8, ZRF.PARAM,	1);	// $2
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.PARAM,	2);	// false
    design.addCommand(8, ZRF.SET_FLAG,	2);	// no-piece
    design.addCommand(8, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	14);
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	6);
    design.addCommand(8, ZRF.LITERAL,	33);	// Prince
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.LITERAL,	0);	// false
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.LITERAL,	1);	// true
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.LITERAL,	1);	// true
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.LITERAL,	0);	// false
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	2);
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	33);	// Prince
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	49);	// Great-General
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	3);	// $4
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.PARAM,	4);	// false
    design.addCommand(8, ZRF.SET_FLAG,	2);	// no-piece
    design.addCommand(8, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	14);
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	6);
    design.addCommand(8, ZRF.LITERAL,	33);	// Prince
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.LITERAL,	0);	// false
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.LITERAL,	1);	// true
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.LITERAL,	1);	// true
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.LITERAL,	0);	// false
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	2);
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	33);	// Prince
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	49);	// Great-General
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	5);	// $6
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.PARAM,	6);	// false
    design.addCommand(8, ZRF.SET_FLAG,	2);	// no-piece
    design.addCommand(8, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	14);
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	6);
    design.addCommand(8, ZRF.LITERAL,	33);	// Prince
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.LITERAL,	0);	// false
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.LITERAL,	1);	// true
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.LITERAL,	1);	// true
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.LITERAL,	0);	// false
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	2);
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	33);	// Prince
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	49);	// Great-General
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.FLAG,	2);	// no-piece
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	12);
    design.addCommand(8, ZRF.PARAM,	7);	// $8
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	7);
    design.addCommand(8, ZRF.FORK,	3);
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end
    design.addCommand(8, ZRF.PARAM,	8);	// $9
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.JUMP,	-8);
    design.addCommand(8, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	14);
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	6);
    design.addCommand(8, ZRF.LITERAL,	33);	// Prince
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.LITERAL,	0);	// false
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.LITERAL,	1);	// true
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.LITERAL,	1);	// true
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.LITERAL,	0);	// false
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.JUMP,	40);
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	37);
    design.addCommand(8, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	9);
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	6);
    design.addCommand(8, ZRF.LITERAL,	33);	// Prince
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.IF,	3);
    design.addCommand(8, ZRF.LITERAL,	1);	// true
    design.addCommand(8, ZRF.JUMP,	2);
    design.addCommand(8, ZRF.LITERAL,	0);	// false
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.IF,	4);
    design.addCommand(8, ZRF.FORK,	3);
    design.addCommand(8, ZRF.FUNCTION,	25);	// to
    design.addCommand(8, ZRF.FUNCTION,	28);	// end
    design.addCommand(8, ZRF.LITERAL,	32);	// King
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	33);	// Prince
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	49);	// Great-General
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.LITERAL,	48);	// Vice-General
    design.addCommand(8, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(8, ZRF.FUNCTION,	0);	// not
    design.addCommand(8, ZRF.FUNCTION,	20);	// verify
    design.addCommand(8, ZRF.PARAM,	9);	// $10
    design.addCommand(8, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(8, ZRF.JUMP,	-38);
    design.addCommand(8, ZRF.FUNCTION,	28);	// end

    design.addCommand(9, ZRF.FUNCTION,	24);	// from
    design.addCommand(9, ZRF.PARAM,	0);	// $1
    design.addCommand(9, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(9, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(9, ZRF.FUNCTION,	0);	// not
    design.addCommand(9, ZRF.FUNCTION,	20);	// verify
    design.addCommand(9, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(9, ZRF.FUNCTION,	0);	// not
    design.addCommand(9, ZRF.IF,	4);
    design.addCommand(9, ZRF.MODE,	4);	// left-2-type
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.JUMP,	2);
    design.addCommand(9, ZRF.FUNCTION,	25);	// to
    design.addCommand(9, ZRF.FUNCTION,	28);	// end

    design.addCommand(10, ZRF.FUNCTION,	24);	// from
    design.addCommand(10, ZRF.PARAM,	0);	// $1
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(10, ZRF.FUNCTION,	20);	// verify
    design.addCommand(10, ZRF.PARAM,	1);	// $2
    design.addCommand(10, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(10, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(10, ZRF.FUNCTION,	0);	// not
    design.addCommand(10, ZRF.FUNCTION,	20);	// verify
    design.addCommand(10, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(10, ZRF.FUNCTION,	0);	// not
    design.addCommand(10, ZRF.IF,	4);
    design.addCommand(10, ZRF.MODE,	1);	// left-1-type
    design.addCommand(10, ZRF.FUNCTION,	25);	// to
    design.addCommand(10, ZRF.JUMP,	2);
    design.addCommand(10, ZRF.FUNCTION,	25);	// to
    design.addCommand(10, ZRF.FUNCTION,	28);	// end

    design.addCommand(11, ZRF.FUNCTION,	24);	// from
    design.addCommand(11, ZRF.PARAM,	0);	// $1
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(11, ZRF.FUNCTION,	20);	// verify
    design.addCommand(11, ZRF.PARAM,	1);	// $2
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(11, ZRF.FUNCTION,	20);	// verify
    design.addCommand(11, ZRF.PARAM,	2);	// $3
    design.addCommand(11, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(11, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(11, ZRF.FUNCTION,	0);	// not
    design.addCommand(11, ZRF.FUNCTION,	20);	// verify
    design.addCommand(11, ZRF.FUNCTION,	25);	// to
    design.addCommand(11, ZRF.FUNCTION,	28);	// end

    design.addCommand(12, ZRF.FUNCTION,	24);	// from
    design.addCommand(12, ZRF.PARAM,	0);	// $1
    design.addCommand(12, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(12, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(12, ZRF.FUNCTION,	20);	// verify
    design.addCommand(12, ZRF.PARAM,	1);	// $2
    design.addCommand(12, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(12, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(12, ZRF.FUNCTION,	20);	// verify
    design.addCommand(12, ZRF.PARAM,	2);	// $3
    design.addCommand(12, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(12, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(12, ZRF.FUNCTION,	20);	// verify
    design.addCommand(12, ZRF.FUNCTION,	25);	// to
    design.addCommand(12, ZRF.FUNCTION,	28);	// end

    design.addCommand(13, ZRF.FUNCTION,	24);	// from
    design.addCommand(13, ZRF.PARAM,	0);	// $1
    design.addCommand(13, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(13, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(13, ZRF.FUNCTION,	0);	// not
    design.addCommand(13, ZRF.FUNCTION,	20);	// verify
    design.addCommand(13, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(13, ZRF.FUNCTION,	0);	// not
    design.addCommand(13, ZRF.IF,	4);
    design.addCommand(13, ZRF.MODE,	1);	// left-1-type
    design.addCommand(13, ZRF.FUNCTION,	25);	// to
    design.addCommand(13, ZRF.JUMP,	2);
    design.addCommand(13, ZRF.FUNCTION,	25);	// to
    design.addCommand(13, ZRF.FUNCTION,	28);	// end

    design.addCommand(14, ZRF.FUNCTION,	24);	// from
    design.addCommand(14, ZRF.PARAM,	0);	// $1
    design.addCommand(14, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(14, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(14, ZRF.FUNCTION,	0);	// not
    design.addCommand(14, ZRF.IF,	7);
    design.addCommand(14, ZRF.FORK,	3);
    design.addCommand(14, ZRF.FUNCTION,	25);	// to
    design.addCommand(14, ZRF.FUNCTION,	28);	// end
    design.addCommand(14, ZRF.PARAM,	1);	// $2
    design.addCommand(14, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(14, ZRF.JUMP,	-8);
    design.addCommand(14, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(14, ZRF.FUNCTION,	0);	// not
    design.addCommand(14, ZRF.IF,	14);
    design.addCommand(14, ZRF.LITERAL,	32);	// King
    design.addCommand(14, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(14, ZRF.IF,	6);
    design.addCommand(14, ZRF.LITERAL,	33);	// Prince
    design.addCommand(14, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(14, ZRF.IF,	3);
    design.addCommand(14, ZRF.LITERAL,	0);	// false
    design.addCommand(14, ZRF.JUMP,	2);
    design.addCommand(14, ZRF.LITERAL,	1);	// true
    design.addCommand(14, ZRF.FUNCTION,	0);	// not
    design.addCommand(14, ZRF.IF,	3);
    design.addCommand(14, ZRF.LITERAL,	1);	// true
    design.addCommand(14, ZRF.JUMP,	2);
    design.addCommand(14, ZRF.LITERAL,	0);	// false
    design.addCommand(14, ZRF.FUNCTION,	0);	// not
    design.addCommand(14, ZRF.IF,	3);
    design.addCommand(14, ZRF.FUNCTION,	25);	// to
    design.addCommand(14, ZRF.JUMP,	36);
    design.addCommand(14, ZRF.LITERAL,	32);	// King
    design.addCommand(14, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(14, ZRF.IF,	33);
    design.addCommand(14, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(14, ZRF.FUNCTION,	0);	// not
    design.addCommand(14, ZRF.IF,	9);
    design.addCommand(14, ZRF.LITERAL,	32);	// King
    design.addCommand(14, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(14, ZRF.IF,	6);
    design.addCommand(14, ZRF.LITERAL,	33);	// Prince
    design.addCommand(14, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(14, ZRF.IF,	3);
    design.addCommand(14, ZRF.LITERAL,	1);	// true
    design.addCommand(14, ZRF.JUMP,	2);
    design.addCommand(14, ZRF.LITERAL,	0);	// false
    design.addCommand(14, ZRF.FUNCTION,	0);	// not
    design.addCommand(14, ZRF.IF,	4);
    design.addCommand(14, ZRF.FORK,	3);
    design.addCommand(14, ZRF.FUNCTION,	25);	// to
    design.addCommand(14, ZRF.FUNCTION,	28);	// end
    design.addCommand(14, ZRF.LITERAL,	32);	// King
    design.addCommand(14, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(14, ZRF.FUNCTION,	0);	// not
    design.addCommand(14, ZRF.FUNCTION,	20);	// verify
    design.addCommand(14, ZRF.LITERAL,	33);	// Prince
    design.addCommand(14, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(14, ZRF.FUNCTION,	0);	// not
    design.addCommand(14, ZRF.FUNCTION,	20);	// verify
    design.addCommand(14, ZRF.LITERAL,	49);	// Great-General
    design.addCommand(14, ZRF.FUNCTION,	10);	// piece?
    design.addCommand(14, ZRF.FUNCTION,	0);	// not
    design.addCommand(14, ZRF.FUNCTION,	20);	// verify
    design.addCommand(14, ZRF.PARAM,	2);	// $3
    design.addCommand(14, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(14, ZRF.JUMP,	-34);
    design.addCommand(14, ZRF.FUNCTION,	28);	// end

    design.addCommand(15, ZRF.FUNCTION,	24);	// from
    design.addCommand(15, ZRF.PARAM,	0);	// $1
    design.addCommand(15, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(15, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(15, ZRF.FUNCTION,	20);	// verify
    design.addCommand(15, ZRF.PARAM,	1);	// $2
    design.addCommand(15, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(15, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(15, ZRF.FUNCTION,	20);	// verify
    design.addCommand(15, ZRF.PARAM,	2);	// $3
    design.addCommand(15, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(15, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(15, ZRF.FUNCTION,	0);	// not
    design.addCommand(15, ZRF.IF,	7);
    design.addCommand(15, ZRF.FORK,	3);
    design.addCommand(15, ZRF.FUNCTION,	25);	// to
    design.addCommand(15, ZRF.FUNCTION,	28);	// end
    design.addCommand(15, ZRF.PARAM,	3);	// $4
    design.addCommand(15, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(15, ZRF.JUMP,	-8);
    design.addCommand(15, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(15, ZRF.FUNCTION,	0);	// not
    design.addCommand(15, ZRF.FUNCTION,	20);	// verify
    design.addCommand(15, ZRF.FUNCTION,	25);	// to
    design.addCommand(15, ZRF.FUNCTION,	28);	// end

    design.addCommand(16, ZRF.FUNCTION,	24);	// from
    design.addCommand(16, ZRF.PARAM,	0);	// $1
    design.addCommand(16, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(16, ZRF.PARAM,	1);	// $2
    design.addCommand(16, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(16, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(16, ZRF.FUNCTION,	0);	// not
    design.addCommand(16, ZRF.IF,	7);
    design.addCommand(16, ZRF.FORK,	3);
    design.addCommand(16, ZRF.FUNCTION,	25);	// to
    design.addCommand(16, ZRF.FUNCTION,	28);	// end
    design.addCommand(16, ZRF.PARAM,	2);	// $3
    design.addCommand(16, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(16, ZRF.JUMP,	-8);
    design.addCommand(16, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(16, ZRF.FUNCTION,	0);	// not
    design.addCommand(16, ZRF.FUNCTION,	20);	// verify
    design.addCommand(16, ZRF.FUNCTION,	25);	// to
    design.addCommand(16, ZRF.FUNCTION,	28);	// end

    design.addCommand(17, ZRF.FUNCTION,	24);	// from
    design.addCommand(17, ZRF.PARAM,	0);	// $1
    design.addCommand(17, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(17, ZRF.PARAM,	1);	// $2
    design.addCommand(17, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(17, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(17, ZRF.FUNCTION,	0);	// not
    design.addCommand(17, ZRF.FUNCTION,	20);	// verify
    design.addCommand(17, ZRF.FORK,	3);
    design.addCommand(17, ZRF.FUNCTION,	25);	// to
    design.addCommand(17, ZRF.FUNCTION,	28);	// end
    design.addCommand(17, ZRF.FUNCTION,	1);	// empty?
    design.addCommand(17, ZRF.FUNCTION,	20);	// verify
    design.addCommand(17, ZRF.PARAM,	2);	// $3
    design.addCommand(17, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(17, ZRF.FUNCTION,	3);	// friend?
    design.addCommand(17, ZRF.FUNCTION,	0);	// not
    design.addCommand(17, ZRF.FUNCTION,	20);	// verify
    design.addCommand(17, ZRF.FUNCTION,	25);	// to
    design.addCommand(17, ZRF.FUNCTION,	28);	// end

    design.addCommand(18, ZRF.FUNCTION,	24);	// from
    design.addCommand(18, ZRF.LITERAL,	59);	// Heavenly-Tetrarch
    design.addCommand(18, ZRF.FUNCTION,	11);	// create
    design.addCommand(18, ZRF.PARAM,	0);	// $1
    design.addCommand(18, ZRF.FUNCTION,	22);	// navigate
    design.addCommand(18, ZRF.FUNCTION,	2);	// enemy?
    design.addCommand(18, ZRF.FUNCTION,	20);	// verify
    design.addCommand(18, ZRF.FUNCTION,	26);	// capture
    design.addCommand(18, ZRF.PROMOTE,	61);	// None
    design.addCommand(18, ZRF.FUNCTION,	25);	// to
    design.addCommand(18, ZRF.FUNCTION,	28);	// end

    design.addPriority(0);			// normal-type

    design.addPiece("Knight", 0, 1);
    design.addMove(0, 0, [4, 7], 0);
    design.addMove(0, 0, [4, 3], 0);

    design.addPiece("Iron-General", 1, 2);
    design.addMove(1, 1, [4], 0);
    design.addMove(1, 1, [7], 0);
    design.addMove(1, 1, [3], 0);

    design.addPiece("Pawn", 2, 1);
    design.addMove(2, 1, [4], 0);

    design.addPiece("Bishop", 3, 10);
    design.addMove(3, 2, [7, 7], 0);
    design.addMove(3, 2, [6, 6], 0);
    design.addMove(3, 2, [3, 3], 0);
    design.addMove(3, 2, [5, 5], 0);

    design.addPiece("Bishop!", 4, 10);
    design.addMove(4, 2, [7, 7], 0);
    design.addMove(4, 2, [6, 6], 0);
    design.addMove(4, 2, [3, 3], 0);
    design.addMove(4, 2, [5, 5], 0);

    design.addPiece("Rook", 5, 12);
    design.addMove(5, 2, [4, 4], 0);
    design.addMove(5, 2, [2, 2], 0);
    design.addMove(5, 2, [0, 0], 0);
    design.addMove(5, 2, [1, 1], 0);

    design.addPiece("Rook!", 6, 12);
    design.addMove(6, 2, [4, 4], 0);
    design.addMove(6, 2, [2, 2], 0);
    design.addMove(6, 2, [0, 0], 0);
    design.addMove(6, 2, [1, 1], 0);

    design.addPiece("Queen", 7, 22);
    design.addMove(7, 2, [4, 4], 0);
    design.addMove(7, 2, [2, 2], 0);
    design.addMove(7, 2, [0, 0], 0);
    design.addMove(7, 2, [1, 1], 0);
    design.addMove(7, 2, [7, 7], 0);
    design.addMove(7, 2, [6, 6], 0);
    design.addMove(7, 2, [3, 3], 0);
    design.addMove(7, 2, [5, 5], 0);

    design.addPiece("Queen!", 8, 22);
    design.addMove(8, 2, [4, 4], 0);
    design.addMove(8, 2, [2, 2], 0);
    design.addMove(8, 2, [0, 0], 0);
    design.addMove(8, 2, [1, 1], 0);
    design.addMove(8, 2, [7, 7], 0);
    design.addMove(8, 2, [6, 6], 0);
    design.addMove(8, 2, [3, 3], 0);
    design.addMove(8, 2, [5, 5], 0);

    design.addPiece("Flying-Ox", 9, 16);
    design.addMove(9, 2, [4, 4], 0);
    design.addMove(9, 2, [2, 2], 0);
    design.addMove(9, 2, [7, 7], 0);
    design.addMove(9, 2, [6, 6], 0);
    design.addMove(9, 2, [3, 3], 0);
    design.addMove(9, 2, [5, 5], 0);

    design.addPiece("Free-Boar", 10, 16);
    design.addMove(10, 2, [0, 0], 0);
    design.addMove(10, 2, [1, 1], 0);
    design.addMove(10, 2, [7, 7], 0);
    design.addMove(10, 2, [6, 6], 0);
    design.addMove(10, 2, [3, 3], 0);
    design.addMove(10, 2, [5, 5], 0);

    design.addPiece("Horned-Falcon", 11, 19);
    design.addMove(11, 2, [2, 2], 0);
    design.addMove(11, 2, [0, 0], 0);
    design.addMove(11, 2, [1, 1], 0);
    design.addMove(11, 2, [7, 7], 0);
    design.addMove(11, 2, [6, 6], 0);
    design.addMove(11, 2, [3, 3], 0);
    design.addMove(11, 2, [5, 5], 0);
    design.addMove(11, 3, [4], 0);
    design.addMove(11, 0, [4, 4], 0);
    design.addMove(11, 1, [4], 1);
    design.addMove(11, 1, [2], 1);

    design.addPiece("Horned-Falcon!", 12, 19);
    design.addMove(12, 2, [2, 2], 0);
    design.addMove(12, 2, [0, 0], 0);
    design.addMove(12, 2, [1, 1], 0);
    design.addMove(12, 2, [7, 7], 0);
    design.addMove(12, 2, [6, 6], 0);
    design.addMove(12, 2, [3, 3], 0);
    design.addMove(12, 2, [5, 5], 0);
    design.addMove(12, 3, [4], 0);
    design.addMove(12, 0, [4, 4], 0);
    design.addMove(12, 1, [4], 1);
    design.addMove(12, 1, [2], 1);

    design.addPiece("Soaring-Eagle", 13, 18);
    design.addMove(13, 2, [4, 4], 0);
    design.addMove(13, 2, [2, 2], 0);
    design.addMove(13, 2, [0, 0], 0);
    design.addMove(13, 2, [1, 1], 0);
    design.addMove(13, 2, [6, 6], 0);
    design.addMove(13, 2, [5, 5], 0);
    design.addMove(13, 4, [7], 0);
    design.addMove(13, 0, [7, 7], 0);
    design.addMove(13, 5, [3], 0);
    design.addMove(13, 0, [3, 3], 0);
    design.addMove(13, 1, [7], 2);
    design.addMove(13, 1, [5], 2);
    design.addMove(13, 1, [3], 3);
    design.addMove(13, 1, [6], 3);

    design.addPiece("Soaring-Eagle!", 14, 18);
    design.addMove(14, 2, [4, 4], 0);
    design.addMove(14, 2, [2, 2], 0);
    design.addMove(14, 2, [0, 0], 0);
    design.addMove(14, 2, [1, 1], 0);
    design.addMove(14, 2, [6, 6], 0);
    design.addMove(14, 2, [5, 5], 0);
    design.addMove(14, 4, [7], 0);
    design.addMove(14, 0, [7, 7], 0);
    design.addMove(14, 5, [3], 0);
    design.addMove(14, 0, [3, 3], 0);
    design.addMove(14, 1, [7], 2);
    design.addMove(14, 1, [5], 2);
    design.addMove(14, 1, [3], 3);
    design.addMove(14, 1, [6], 3);

    design.addPiece("Whale", 15, 10);
    design.addMove(15, 2, [4, 4], 0);
    design.addMove(15, 2, [2, 2], 0);
    design.addMove(15, 2, [6, 6], 0);
    design.addMove(15, 2, [5, 5], 0);

    design.addPiece("White-Horse", 16, 14);
    design.addMove(16, 2, [4, 4], 0);
    design.addMove(16, 2, [2, 2], 0);
    design.addMove(16, 2, [7, 7], 0);
    design.addMove(16, 2, [3, 3], 0);

    design.addPiece("Lion", 17, 18);
    design.addMove(17, 3, [4], 0);
    design.addMove(17, 3, [2], 0);
    design.addMove(17, 3, [0], 0);
    design.addMove(17, 3, [1], 0);
    design.addMove(17, 3, [7], 0);
    design.addMove(17, 3, [5], 0);
    design.addMove(17, 3, [6], 0);
    design.addMove(17, 3, [3], 0);
    design.addMove(17, 0, [4, 4], 0);
    design.addMove(17, 0, [7, 7], 0);
    design.addMove(17, 0, [2, 2], 0);
    design.addMove(17, 0, [6, 6], 0);
    design.addMove(17, 0, [1, 1], 0);
    design.addMove(17, 0, [5, 5], 0);
    design.addMove(17, 0, [0, 0], 0);
    design.addMove(17, 0, [3, 3], 0);
    design.addMove(17, 0, [4, 3], 0);
    design.addMove(17, 0, [4, 7], 0);
    design.addMove(17, 0, [2, 5], 0);
    design.addMove(17, 0, [2, 6], 0);
    design.addMove(17, 0, [1, 3], 0);
    design.addMove(17, 0, [1, 5], 0);
    design.addMove(17, 0, [0, 7], 0);
    design.addMove(17, 0, [0, 6], 0);
    design.addMove(17, 1, [4], 1);
    design.addMove(17, 1, [2], 1);
    design.addMove(17, 1, [0], 1);
    design.addMove(17, 1, [1], 1);
    design.addMove(17, 1, [7], 1);
    design.addMove(17, 1, [5], 1);
    design.addMove(17, 1, [6], 1);
    design.addMove(17, 1, [3], 1);

    design.addPiece("Lion!", 18, 18);
    design.addMove(18, 3, [4], 0);
    design.addMove(18, 3, [2], 0);
    design.addMove(18, 3, [0], 0);
    design.addMove(18, 3, [1], 0);
    design.addMove(18, 3, [7], 0);
    design.addMove(18, 3, [5], 0);
    design.addMove(18, 3, [6], 0);
    design.addMove(18, 3, [3], 0);
    design.addMove(18, 0, [4, 4], 0);
    design.addMove(18, 0, [7, 7], 0);
    design.addMove(18, 0, [2, 2], 0);
    design.addMove(18, 0, [6, 6], 0);
    design.addMove(18, 0, [1, 1], 0);
    design.addMove(18, 0, [5, 5], 0);
    design.addMove(18, 0, [0, 0], 0);
    design.addMove(18, 0, [3, 3], 0);
    design.addMove(18, 0, [4, 3], 0);
    design.addMove(18, 0, [4, 7], 0);
    design.addMove(18, 0, [2, 5], 0);
    design.addMove(18, 0, [2, 6], 0);
    design.addMove(18, 0, [1, 3], 0);
    design.addMove(18, 0, [1, 5], 0);
    design.addMove(18, 0, [0, 7], 0);
    design.addMove(18, 0, [0, 6], 0);
    design.addMove(18, 1, [4], 1);
    design.addMove(18, 1, [2], 1);
    design.addMove(18, 1, [0], 1);
    design.addMove(18, 1, [1], 1);
    design.addMove(18, 1, [7], 1);
    design.addMove(18, 1, [5], 1);
    design.addMove(18, 1, [6], 1);
    design.addMove(18, 1, [3], 1);

    design.addPiece("Dragon-King", 19, 14);
    design.addMove(19, 2, [4, 4], 0);
    design.addMove(19, 2, [2, 2], 0);
    design.addMove(19, 2, [0, 0], 0);
    design.addMove(19, 2, [1, 1], 0);
    design.addMove(19, 1, [7], 0);
    design.addMove(19, 1, [6], 0);
    design.addMove(19, 1, [3], 0);
    design.addMove(19, 1, [5], 0);

    design.addPiece("Dragon-King!", 20, 17);
    design.addMove(20, 2, [4, 4], 0);
    design.addMove(20, 2, [2, 2], 0);
    design.addMove(20, 2, [0, 0], 0);
    design.addMove(20, 2, [1, 1], 0);
    design.addMove(20, 1, [7], 0);
    design.addMove(20, 1, [6], 0);
    design.addMove(20, 1, [3], 0);
    design.addMove(20, 1, [5], 0);

    design.addPiece("Dragon-Horse", 21, 12);
    design.addMove(21, 2, [7, 7], 0);
    design.addMove(21, 2, [6, 6], 0);
    design.addMove(21, 2, [3, 3], 0);
    design.addMove(21, 2, [5, 5], 0);
    design.addMove(21, 1, [4], 0);
    design.addMove(21, 1, [2], 0);
    design.addMove(21, 1, [0], 0);
    design.addMove(21, 1, [1], 0);

    design.addPiece("Dragon-Horse!", 22, 12);
    design.addMove(22, 2, [7, 7], 0);
    design.addMove(22, 2, [6, 6], 0);
    design.addMove(22, 2, [3, 3], 0);
    design.addMove(22, 2, [5, 5], 0);
    design.addMove(22, 1, [4], 0);
    design.addMove(22, 1, [2], 0);
    design.addMove(22, 1, [0], 0);
    design.addMove(22, 1, [1], 0);

    design.addPiece("Kylin", 23, 3);
    design.addMove(23, 0, [4, 4], 0);
    design.addMove(23, 0, [2, 2], 0);
    design.addMove(23, 0, [0, 0], 0);
    design.addMove(23, 0, [1, 1], 0);
    design.addMove(23, 1, [7], 0);
    design.addMove(23, 1, [6], 0);
    design.addMove(23, 1, [3], 0);
    design.addMove(23, 1, [5], 0);

    design.addPiece("Phoenix", 24, 3);
    design.addMove(24, 1, [4], 0);
    design.addMove(24, 1, [2], 0);
    design.addMove(24, 1, [0], 0);
    design.addMove(24, 1, [1], 0);
    design.addMove(24, 0, [7, 7], 0);
    design.addMove(24, 0, [6, 6], 0);
    design.addMove(24, 0, [3, 3], 0);
    design.addMove(24, 0, [5, 5], 0);

    design.addPiece("Reverse-Chariot", 25, 6);
    design.addMove(25, 2, [4, 4], 0);
    design.addMove(25, 2, [2, 2], 0);

    design.addPiece("Side-Mover", 26, 7);
    design.addMove(26, 1, [4], 0);
    design.addMove(26, 1, [2], 0);
    design.addMove(26, 2, [0, 0], 0);
    design.addMove(26, 2, [1, 1], 0);

    design.addPiece("Side-Mover!", 27, 7);
    design.addMove(27, 1, [4], 0);
    design.addMove(27, 1, [2], 0);
    design.addMove(27, 2, [0, 0], 0);
    design.addMove(27, 2, [1, 1], 0);

    design.addPiece("Vertical-Mover", 28, 7);
    design.addMove(28, 1, [0], 0);
    design.addMove(28, 1, [1], 0);
    design.addMove(28, 2, [4, 4], 0);
    design.addMove(28, 2, [2, 2], 0);

    design.addPiece("Vertical-Mover!", 29, 7);
    design.addMove(29, 1, [0], 0);
    design.addMove(29, 1, [1], 0);
    design.addMove(29, 2, [4, 4], 0);
    design.addMove(29, 2, [2, 2], 0);

    design.addPiece("Flying-Stag", 30, 9);
    design.addMove(30, 2, [4, 4], 0);
    design.addMove(30, 2, [2, 2], 0);
    design.addMove(30, 1, [0], 0);
    design.addMove(30, 1, [1], 0);
    design.addMove(30, 1, [7], 0);
    design.addMove(30, 1, [6], 0);
    design.addMove(30, 1, [3], 0);
    design.addMove(30, 1, [5], 0);

    design.addPiece("Lance", 31, 6);
    design.addMove(31, 2, [4, 4], 0);

    design.addPiece("King", 32, 10000);
    design.addMove(32, 1, [4], 0);
    design.addMove(32, 1, [2], 0);
    design.addMove(32, 1, [0], 0);
    design.addMove(32, 1, [1], 0);
    design.addMove(32, 1, [7], 0);
    design.addMove(32, 1, [6], 0);
    design.addMove(32, 1, [3], 0);
    design.addMove(32, 1, [5], 0);

    design.addPiece("Prince", 33, 10000);
    design.addMove(33, 1, [4], 0);
    design.addMove(33, 1, [2], 0);
    design.addMove(33, 1, [0], 0);
    design.addMove(33, 1, [1], 0);
    design.addMove(33, 1, [7], 0);
    design.addMove(33, 1, [6], 0);
    design.addMove(33, 1, [3], 0);
    design.addMove(33, 1, [5], 0);

    design.addPiece("Blind-Tiger", 34, 3);
    design.addMove(34, 1, [2], 0);
    design.addMove(34, 1, [0], 0);
    design.addMove(34, 1, [1], 0);
    design.addMove(34, 1, [7], 0);
    design.addMove(34, 1, [6], 0);
    design.addMove(34, 1, [3], 0);
    design.addMove(34, 1, [5], 0);

    design.addPiece("Drunk-Elephant", 35, 3);
    design.addMove(35, 1, [4], 0);
    design.addMove(35, 1, [0], 0);
    design.addMove(35, 1, [1], 0);
    design.addMove(35, 1, [7], 0);
    design.addMove(35, 1, [6], 0);
    design.addMove(35, 1, [3], 0);
    design.addMove(35, 1, [5], 0);

    design.addPiece("Ferocious-Leopard", 36, 3);
    design.addMove(36, 1, [4], 0);
    design.addMove(36, 1, [2], 0);
    design.addMove(36, 1, [7], 0);
    design.addMove(36, 1, [6], 0);
    design.addMove(36, 1, [3], 0);
    design.addMove(36, 1, [5], 0);

    design.addPiece("Gold-General", 37, 3);
    design.addMove(37, 1, [4], 0);
    design.addMove(37, 1, [2], 0);
    design.addMove(37, 1, [0], 0);
    design.addMove(37, 1, [1], 0);
    design.addMove(37, 1, [7], 0);
    design.addMove(37, 1, [3], 0);

    design.addPiece("Gold-General!", 38, 3);
    design.addMove(38, 1, [4], 0);
    design.addMove(38, 1, [2], 0);
    design.addMove(38, 1, [0], 0);
    design.addMove(38, 1, [1], 0);
    design.addMove(38, 1, [7], 0);
    design.addMove(38, 1, [3], 0);

    design.addPiece("Silver-General", 39, 2);
    design.addMove(39, 1, [4], 0);
    design.addMove(39, 1, [7], 0);
    design.addMove(39, 1, [6], 0);
    design.addMove(39, 1, [3], 0);
    design.addMove(39, 1, [5], 0);

    design.addPiece("Copper-General", 40, 2);
    design.addMove(40, 1, [4], 0);
    design.addMove(40, 1, [2], 0);
    design.addMove(40, 1, [7], 0);
    design.addMove(40, 1, [3], 0);

    design.addPiece("Chariot-Soldier", 41, 18);
    design.addMove(41, 2, [4, 4], 0);
    design.addMove(41, 2, [2, 2], 0);
    design.addMove(41, 2, [7, 7], 0);
    design.addMove(41, 2, [6, 6], 0);
    design.addMove(41, 2, [3, 3], 0);
    design.addMove(41, 2, [5, 5], 0);
    design.addMove(41, 1, [0], 0);
    design.addMove(41, 1, [1], 0);
    design.addMove(41, 6, [0, 0], 0);
    design.addMove(41, 6, [1, 1], 0);

    design.addPiece("Chariot-Soldier!", 42, 18);
    design.addMove(42, 2, [4, 4], 0);
    design.addMove(42, 2, [2, 2], 0);
    design.addMove(42, 2, [7, 7], 0);
    design.addMove(42, 2, [6, 6], 0);
    design.addMove(42, 2, [3, 3], 0);
    design.addMove(42, 2, [5, 5], 0);
    design.addMove(42, 1, [0], 0);
    design.addMove(42, 1, [1], 0);
    design.addMove(42, 6, [0, 0], 0);
    design.addMove(42, 6, [1, 1], 0);

    design.addPiece("Dog", 43, 1);
    design.addMove(43, 1, [4], 0);
    design.addMove(43, 1, [6], 0);
    design.addMove(43, 1, [5], 0);

    design.addPiece("Bishop-General", 44, 21);
    design.addMove(44, 7, [7, 7, 7], 0);
    design.addMove(44, 7, [5, 5, 5], 0);
    design.addMove(44, 7, [6, 6, 6], 0);
    design.addMove(44, 7, [3, 3, 3], 0);

    design.addPiece("Bishop-General!", 45, 21);
    design.addMove(45, 7, [7, 7, 7], 0);
    design.addMove(45, 7, [5, 5, 5], 0);
    design.addMove(45, 7, [6, 6, 6], 0);
    design.addMove(45, 7, [3, 3, 3], 0);

    design.addPiece("Rook-General", 46, 23);
    design.addMove(46, 7, [4, 4, 4], 0);
    design.addMove(46, 7, [2, 2, 2], 0);
    design.addMove(46, 7, [0, 0, 0], 0);
    design.addMove(46, 7, [1, 1, 1], 0);

    design.addPiece("Rook-General!", 47, 23);
    design.addMove(47, 7, [4, 4, 4], 0);
    design.addMove(47, 7, [2, 2, 2], 0);
    design.addMove(47, 7, [0, 0, 0], 0);
    design.addMove(47, 7, [1, 1, 1], 0);

    design.addPiece("Vice-General", 48, 39);
    design.addMove(48, 8, [1, 7, 0, 7, 0, 7, 0, 7, 7, 7], 0);
    design.addMove(48, 8, [1, 5, 0, 5, 0, 5, 0, 5, 5, 5], 0);
    design.addMove(48, 8, [1, 6, 0, 6, 0, 6, 0, 6, 6, 6], 0);
    design.addMove(48, 8, [1, 3, 0, 3, 0, 3, 0, 3, 3, 3], 0);
    design.addMove(48, 9, [4], 0);
    design.addMove(48, 9, [2], 0);
    design.addMove(48, 9, [0], 0);
    design.addMove(48, 9, [1], 0);
    design.addMove(48, 9, [7], 0);
    design.addMove(48, 9, [5], 0);
    design.addMove(48, 9, [6], 0);
    design.addMove(48, 9, [3], 0);
    design.addMove(48, 10, [4, 4], 0);
    design.addMove(48, 10, [7, 7], 0);
    design.addMove(48, 10, [2, 2], 0);
    design.addMove(48, 10, [6, 6], 0);
    design.addMove(48, 10, [1, 1], 0);
    design.addMove(48, 10, [5, 5], 0);
    design.addMove(48, 10, [0, 0], 0);
    design.addMove(48, 10, [3, 3], 0);
    design.addMove(48, 10, [4, 3], 0);
    design.addMove(48, 10, [4, 7], 0);
    design.addMove(48, 10, [2, 5], 0);
    design.addMove(48, 10, [2, 6], 0);
    design.addMove(48, 10, [1, 3], 0);
    design.addMove(48, 10, [1, 5], 0);
    design.addMove(48, 10, [0, 7], 0);
    design.addMove(48, 10, [0, 6], 0);
    design.addMove(48, 11, [4, 4, 4], 0);
    design.addMove(48, 11, [4, 4, 7], 0);
    design.addMove(48, 11, [4, 4, 3], 0);
    design.addMove(48, 11, [4, 7, 7], 0);
    design.addMove(48, 11, [4, 3, 3], 0);
    design.addMove(48, 11, [2, 2, 2], 0);
    design.addMove(48, 11, [2, 2, 6], 0);
    design.addMove(48, 11, [2, 2, 5], 0);
    design.addMove(48, 11, [2, 6, 6], 0);
    design.addMove(48, 11, [2, 5, 5], 0);
    design.addMove(48, 11, [0, 0, 0], 0);
    design.addMove(48, 11, [0, 0, 7], 0);
    design.addMove(48, 11, [0, 0, 6], 0);
    design.addMove(48, 11, [0, 7, 7], 0);
    design.addMove(48, 11, [0, 6, 6], 0);
    design.addMove(48, 11, [1, 1, 1], 0);
    design.addMove(48, 11, [1, 1, 3], 0);
    design.addMove(48, 11, [1, 1, 5], 0);
    design.addMove(48, 11, [1, 3, 3], 0);
    design.addMove(48, 11, [1, 5, 5], 0);
    design.addMove(48, 12, [7, 7, 7], 0);
    design.addMove(48, 12, [3, 3, 3], 0);
    design.addMove(48, 12, [6, 6, 6], 0);
    design.addMove(48, 12, [5, 5, 5], 0);
    design.addMove(48, 13, [4], 4);
    design.addMove(48, 13, [2], 4);
    design.addMove(48, 13, [0], 4);
    design.addMove(48, 13, [1], 4);
    design.addMove(48, 13, [7], 4);
    design.addMove(48, 13, [5], 4);
    design.addMove(48, 13, [6], 4);
    design.addMove(48, 13, [3], 4);
    design.addMove(48, 6, [4, 4], 4);
    design.addMove(48, 6, [7, 7], 4);
    design.addMove(48, 6, [2, 2], 4);
    design.addMove(48, 6, [6, 6], 4);
    design.addMove(48, 6, [1, 1], 4);
    design.addMove(48, 6, [5, 5], 4);
    design.addMove(48, 6, [0, 0], 4);
    design.addMove(48, 6, [3, 3], 4);
    design.addMove(48, 6, [4, 3], 4);
    design.addMove(48, 6, [4, 7], 4);
    design.addMove(48, 6, [2, 5], 4);
    design.addMove(48, 6, [2, 6], 4);
    design.addMove(48, 6, [1, 3], 4);
    design.addMove(48, 6, [1, 5], 4);
    design.addMove(48, 6, [0, 7], 4);
    design.addMove(48, 6, [0, 6], 4);
    design.addMove(48, 1, [4], 1);
    design.addMove(48, 1, [2], 1);
    design.addMove(48, 1, [0], 1);
    design.addMove(48, 1, [1], 1);
    design.addMove(48, 1, [7], 1);
    design.addMove(48, 1, [5], 1);
    design.addMove(48, 1, [6], 1);
    design.addMove(48, 1, [3], 1);

    design.addPiece("Great-General", 49, 45);
    design.addMove(49, 14, [4, 4, 4], 0);
    design.addMove(49, 14, [2, 2, 2], 0);
    design.addMove(49, 14, [0, 0, 0], 0);
    design.addMove(49, 14, [1, 1, 1], 0);
    design.addMove(49, 14, [7, 7, 7], 0);
    design.addMove(49, 14, [5, 5, 5], 0);
    design.addMove(49, 14, [6, 6, 6], 0);
    design.addMove(49, 14, [3, 3, 3], 0);

    design.addPiece("Side-Soldier", 50, 7);
    design.addMove(50, 2, [0, 0], 0);
    design.addMove(50, 2, [1, 1], 0);
    design.addMove(50, 1, [4], 0);
    design.addMove(50, 1, [2], 0);
    design.addMove(50, 6, [4, 4], 0);

    design.addPiece("Side-Soldier!", 51, 7);
    design.addMove(51, 2, [0, 0], 0);
    design.addMove(51, 2, [1, 1], 0);
    design.addMove(51, 1, [4], 0);
    design.addMove(51, 1, [2], 0);
    design.addMove(51, 6, [4, 4], 0);

    design.addPiece("Vertical-Soldier", 52, 8);
    design.addMove(52, 2, [4, 4], 0);
    design.addMove(52, 1, [2], 0);
    design.addMove(52, 1, [0], 0);
    design.addMove(52, 1, [1], 0);
    design.addMove(52, 6, [0, 0], 0);
    design.addMove(52, 6, [1, 1], 0);

    design.addPiece("Vertical-Soldier!", 53, 8);
    design.addMove(53, 2, [4, 4], 0);
    design.addMove(53, 1, [2], 0);
    design.addMove(53, 1, [0], 0);
    design.addMove(53, 1, [1], 0);
    design.addMove(53, 6, [0, 0], 0);
    design.addMove(53, 6, [1, 1], 0);

    design.addPiece("Water-Buffalo", 54, 17);
    design.addMove(54, 2, [0, 0], 0);
    design.addMove(54, 2, [1, 1], 0);
    design.addMove(54, 2, [7, 7], 0);
    design.addMove(54, 2, [6, 6], 0);
    design.addMove(54, 2, [3, 3], 0);
    design.addMove(54, 2, [5, 5], 0);
    design.addMove(54, 1, [4], 0);
    design.addMove(54, 1, [2], 0);
    design.addMove(54, 6, [4, 4], 0);
    design.addMove(54, 6, [2, 2], 0);

    design.addPiece("Water-Buffalo!", 55, 17);
    design.addMove(55, 2, [0, 0], 0);
    design.addMove(55, 2, [1, 1], 0);
    design.addMove(55, 2, [7, 7], 0);
    design.addMove(55, 2, [6, 6], 0);
    design.addMove(55, 2, [3, 3], 0);
    design.addMove(55, 2, [5, 5], 0);
    design.addMove(55, 1, [4], 0);
    design.addMove(55, 1, [2], 0);
    design.addMove(55, 6, [4, 4], 0);
    design.addMove(55, 6, [2, 2], 0);

    design.addPiece("Fire-Demon", 56, 83);
    design.addMove(56, 15, [0, 0, 0, 0], 0);
    design.addMove(56, 15, [1, 1, 1, 1], 0);
    design.addMove(56, 15, [7, 7, 7, 7], 0);
    design.addMove(56, 15, [6, 6, 6, 6], 0);
    design.addMove(56, 15, [3, 3, 3, 3], 0);
    design.addMove(56, 15, [5, 5, 5, 5], 0);
    design.addMove(56, 9, [4], 0);
    design.addMove(56, 9, [2], 0);
    design.addMove(56, 9, [0], 0);
    design.addMove(56, 9, [1], 0);
    design.addMove(56, 9, [7], 0);
    design.addMove(56, 9, [5], 0);
    design.addMove(56, 9, [6], 0);
    design.addMove(56, 9, [3], 0);
    design.addMove(56, 10, [4, 4], 0);
    design.addMove(56, 10, [2, 2], 0);
    design.addMove(56, 10, [1, 1], 0);
    design.addMove(56, 10, [0, 0], 0);
    design.addMove(56, 10, [4, 3], 0);
    design.addMove(56, 10, [4, 7], 0);
    design.addMove(56, 10, [2, 5], 0);
    design.addMove(56, 10, [2, 6], 0);
    design.addMove(56, 10, [1, 3], 0);
    design.addMove(56, 10, [1, 5], 0);
    design.addMove(56, 10, [0, 7], 0);
    design.addMove(56, 10, [0, 6], 0);
    design.addMove(56, 10, [7, 7], 0);
    design.addMove(56, 10, [3, 3], 0);
    design.addMove(56, 10, [6, 6], 0);
    design.addMove(56, 10, [5, 5], 0);
    design.addMove(56, 11, [4, 4, 4], 0);
    design.addMove(56, 11, [4, 4, 7], 0);
    design.addMove(56, 11, [4, 4, 3], 0);
    design.addMove(56, 11, [4, 7, 7], 0);
    design.addMove(56, 11, [4, 3, 3], 0);
    design.addMove(56, 11, [2, 2, 2], 0);
    design.addMove(56, 11, [2, 2, 6], 0);
    design.addMove(56, 11, [2, 2, 5], 0);
    design.addMove(56, 11, [2, 6, 6], 0);
    design.addMove(56, 11, [2, 5, 5], 0);
    design.addMove(56, 11, [0, 0, 0], 0);
    design.addMove(56, 11, [0, 0, 7], 0);
    design.addMove(56, 11, [0, 0, 6], 0);
    design.addMove(56, 11, [0, 7, 7], 0);
    design.addMove(56, 11, [0, 6, 6], 0);
    design.addMove(56, 11, [1, 1, 1], 0);
    design.addMove(56, 11, [1, 1, 3], 0);
    design.addMove(56, 11, [1, 1, 5], 0);
    design.addMove(56, 11, [1, 3, 3], 0);
    design.addMove(56, 11, [1, 5, 5], 0);
    design.addMove(56, 13, [4], 4);
    design.addMove(56, 13, [2], 4);
    design.addMove(56, 13, [0], 4);
    design.addMove(56, 13, [1], 4);
    design.addMove(56, 13, [7], 4);
    design.addMove(56, 13, [5], 4);
    design.addMove(56, 13, [6], 4);
    design.addMove(56, 13, [3], 4);
    design.addMove(56, 6, [4, 4], 4);
    design.addMove(56, 6, [7, 7], 4);
    design.addMove(56, 6, [2, 2], 4);
    design.addMove(56, 6, [6, 6], 4);
    design.addMove(56, 6, [1, 1], 4);
    design.addMove(56, 6, [5, 5], 4);
    design.addMove(56, 6, [0, 0], 4);
    design.addMove(56, 6, [3, 3], 4);
    design.addMove(56, 6, [4, 3], 4);
    design.addMove(56, 6, [4, 7], 4);
    design.addMove(56, 6, [2, 5], 4);
    design.addMove(56, 6, [2, 6], 4);
    design.addMove(56, 6, [1, 3], 4);
    design.addMove(56, 6, [1, 5], 4);
    design.addMove(56, 6, [0, 7], 4);
    design.addMove(56, 6, [0, 6], 4);
    design.addMove(56, 1, [4], 1);
    design.addMove(56, 1, [2], 1);
    design.addMove(56, 1, [0], 1);
    design.addMove(56, 1, [1], 1);
    design.addMove(56, 1, [7], 1);
    design.addMove(56, 1, [5], 1);
    design.addMove(56, 1, [6], 1);
    design.addMove(56, 1, [3], 1);

    design.addPiece("Free-Eagle", 57, 22);
    design.addMove(57, 15, [4, 4, 4, 4], 0);
    design.addMove(57, 15, [2, 2, 2, 2], 0);
    design.addMove(57, 15, [0, 0, 0, 0], 0);
    design.addMove(57, 15, [1, 1, 1, 1], 0);
    design.addMove(57, 15, [7, 7, 7, 7], 0);
    design.addMove(57, 15, [6, 6, 6, 6], 0);
    design.addMove(57, 15, [3, 3, 3, 3], 0);
    design.addMove(57, 15, [5, 5, 5, 5], 0);
    design.addMove(57, 1, [4], 0);
    design.addMove(57, 1, [2], 0);
    design.addMove(57, 1, [0], 0);
    design.addMove(57, 1, [1], 0);
    design.addMove(57, 3, [7], 0);
    design.addMove(57, 0, [7, 7], 0);
    design.addMove(57, 0, [4, 4], 0);
    design.addMove(57, 3, [5], 0);
    design.addMove(57, 0, [5, 5], 0);
    design.addMove(57, 0, [2, 2], 0);
    design.addMove(57, 3, [6], 0);
    design.addMove(57, 0, [6, 6], 0);
    design.addMove(57, 0, [0, 0], 0);
    design.addMove(57, 3, [3], 0);
    design.addMove(57, 0, [3, 3], 0);
    design.addMove(57, 0, [1, 1], 0);
    design.addMove(57, 1, [7], 1);
    design.addMove(57, 1, [6], 1);
    design.addMove(57, 1, [3], 1);
    design.addMove(57, 1, [5], 1);

    design.addPiece("Lion-Hawk", 58, 25);
    design.addMove(58, 15, [7, 7, 7, 7], 0);
    design.addMove(58, 15, [6, 6, 6, 6], 0);
    design.addMove(58, 15, [3, 3, 3, 3], 0);
    design.addMove(58, 15, [5, 5, 5, 5], 0);
    design.addMove(58, 3, [4], 0);
    design.addMove(58, 3, [2], 0);
    design.addMove(58, 3, [0], 0);
    design.addMove(58, 3, [1], 0);
    design.addMove(58, 3, [7], 0);
    design.addMove(58, 3, [5], 0);
    design.addMove(58, 3, [6], 0);
    design.addMove(58, 3, [3], 0);
    design.addMove(58, 0, [4, 4], 0);
    design.addMove(58, 0, [7, 7], 0);
    design.addMove(58, 0, [2, 2], 0);
    design.addMove(58, 0, [6, 6], 0);
    design.addMove(58, 0, [1, 1], 0);
    design.addMove(58, 0, [5, 5], 0);
    design.addMove(58, 0, [0, 0], 0);
    design.addMove(58, 0, [3, 3], 0);
    design.addMove(58, 0, [4, 3], 0);
    design.addMove(58, 0, [4, 7], 0);
    design.addMove(58, 0, [2, 5], 0);
    design.addMove(58, 0, [2, 6], 0);
    design.addMove(58, 0, [1, 3], 0);
    design.addMove(58, 0, [1, 5], 0);
    design.addMove(58, 0, [0, 7], 0);
    design.addMove(58, 0, [0, 6], 0);
    design.addMove(58, 1, [4], 1);
    design.addMove(58, 1, [2], 1);
    design.addMove(58, 1, [0], 1);
    design.addMove(58, 1, [1], 1);
    design.addMove(58, 1, [7], 1);
    design.addMove(58, 1, [5], 1);
    design.addMove(58, 1, [6], 1);
    design.addMove(58, 1, [3], 1);

    design.addPiece("Heavenly-Tetrarch", 59, 12);
    design.addMove(59, 16, [4, 4, 4], 0);
    design.addMove(59, 16, [2, 2, 2], 0);
    design.addMove(59, 17, [1, 1, 1], 0);
    design.addMove(59, 17, [0, 0, 0], 0);
    design.addMove(59, 16, [7, 7, 7], 0);
    design.addMove(59, 16, [3, 3, 3], 0);
    design.addMove(59, 16, [5, 5, 5], 0);
    design.addMove(59, 16, [6, 6, 6], 0);
    design.addMove(59, 18, [4], 0);
    design.addMove(59, 18, [2], 0);
    design.addMove(59, 18, [7], 0);
    design.addMove(59, 18, [3], 0);
    design.addMove(59, 18, [0], 0);
    design.addMove(59, 18, [1], 0);
    design.addMove(59, 18, [6], 0);
    design.addMove(59, 18, [5], 0);

    design.addPiece("Multi-General", 60, 6);
    design.addMove(60, 2, [4, 4], 0);
    design.addMove(60, 2, [6, 6], 0);
    design.addMove(60, 2, [5, 5], 0);

    design.addPiece("None", 61, 0);

    design.setup("White", "Dog", 91);
    design.setup("White", "Dog", 84);
    design.setup("White", "Pawn", 79);
    design.setup("White", "Pawn", 78);
    design.setup("White", "Pawn", 77);
    design.setup("White", "Pawn", 76);
    design.setup("White", "Pawn", 75);
    design.setup("White", "Pawn", 74);
    design.setup("White", "Pawn", 73);
    design.setup("White", "Pawn", 72);
    design.setup("White", "Pawn", 71);
    design.setup("White", "Pawn", 70);
    design.setup("White", "Pawn", 69);
    design.setup("White", "Pawn", 68);
    design.setup("White", "Pawn", 67);
    design.setup("White", "Pawn", 66);
    design.setup("White", "Pawn", 65);
    design.setup("White", "Pawn", 64); 
    design.setup("White", "Lance", 0);
    design.setup("White", "Lance", 15);
    design.setup("White", "Knight", 1);
    design.setup("White", "Knight", 14);
    design.setup("White", "Ferocious-Leopard", 2);
    design.setup("White", "Ferocious-Leopard", 13);
    design.setup("White", "Iron-General", 3);
    design.setup("White", "Iron-General", 12);
    design.setup("White", "Copper-General", 4);
    design.setup("White", "Copper-General", 11);
    design.setup("White", "Silver-General", 5);
    design.setup("White", "Silver-General", 10);
    design.setup("White", "Gold-General", 6);
    design.setup("White", "Gold-General", 9);
    design.setup("White", "King", 8);
    design.setup("White", "Drunk-Elephant", 7);
    design.setup("White", "Reverse-Chariot", 16);
    design.setup("White", "Reverse-Chariot", 31);
    design.setup("White", "Chariot-Soldier", 29);
    design.setup("White", "Chariot-Soldier", 28);
    design.setup("White", "Chariot-Soldier", 19);
    design.setup("White", "Chariot-Soldier", 18);
    design.setup("White", "Blind-Tiger", 26);
    design.setup("White", "Blind-Tiger", 21);
    design.setup("White", "Phoenix", 22);
    design.setup("White", "Queen", 23);
    design.setup("White", "Lion", 24);
    design.setup("White", "Kylin", 25);
    design.setup("White", "Side-Mover", 48);
    design.setup("White", "Side-Mover", 63);
    design.setup("White", "Vertical-Mover", 49);
    design.setup("White", "Vertical-Mover", 62);
    design.setup("White", "Rook", 50);
    design.setup("White", "Rook", 61);
    design.setup("White", "Horned-Falcon", 51);
    design.setup("White", "Horned-Falcon", 60);
    design.setup("White", "Soaring-Eagle", 52);
    design.setup("White", "Soaring-Eagle", 59);
    design.setup("White", "Bishop-General", 53);
    design.setup("White", "Bishop-General", 58);
    design.setup("White", "Rook-General", 54);
    design.setup("White", "Rook-General", 57);
    design.setup("White", "Vice-General", 55);
    design.setup("White", "Great-General", 56);
    design.setup("White", "Side-Soldier", 47);
    design.setup("White", "Side-Soldier", 32);
    design.setup("White", "Vertical-Soldier", 46);
    design.setup("White", "Vertical-Soldier", 33);
    design.setup("White", "Bishop", 34);
    design.setup("White", "Bishop", 45);
    design.setup("White", "Dragon-Horse", 35);
    design.setup("White", "Dragon-Horse", 44);
    design.setup("White", "Dragon-King", 36);
    design.setup("White", "Dragon-King", 43);
    design.setup("White", "Water-Buffalo", 37);
    design.setup("White", "Water-Buffalo", 42);
    design.setup("White", "Fire-Demon", 38);
    design.setup("White", "Fire-Demon", 41);
    design.setup("White", "Free-Eagle", 39);
    design.setup("White", "Lion-Hawk", 40);
    design.setup("Black", "Dog", 171);
    design.setup("Black", "Dog", 164);
    design.setup("Black", "Pawn", 191);
    design.setup("Black", "Pawn", 190);
    design.setup("Black", "Pawn", 189);
    design.setup("Black", "Pawn", 188);
    design.setup("Black", "Pawn", 187);
    design.setup("Black", "Pawn", 186);
    design.setup("Black", "Pawn", 185);
    design.setup("Black", "Pawn", 184);
    design.setup("Black", "Pawn", 183);
    design.setup("Black", "Pawn", 182);
    design.setup("Black", "Pawn", 181);
    design.setup("Black", "Pawn", 180);
    design.setup("Black", "Pawn", 179);
    design.setup("Black", "Pawn", 178);
    design.setup("Black", "Pawn", 177);
    design.setup("Black", "Pawn", 176);
    design.setup("Black", "Lance", 240);
    design.setup("Black", "Lance", 255);
    design.setup("Black", "Knight", 241);
    design.setup("Black", "Knight", 254);
    design.setup("Black", "Ferocious-Leopard", 242);
    design.setup("Black", "Ferocious-Leopard", 253);
    design.setup("Black", "Iron-General", 243);
    design.setup("Black", "Iron-General", 252);
    design.setup("Black", "Copper-General", 244);
    design.setup("Black", "Copper-General", 251);
    design.setup("Black", "Silver-General", 245);
    design.setup("Black", "Silver-General", 250);
    design.setup("Black", "Gold-General", 246);
    design.setup("Black", "Gold-General", 249);
    design.setup("Black", "King", 247);
    design.setup("Black", "Drunk-Elephant", 248);
    design.setup("Black", "Reverse-Chariot", 224);
    design.setup("Black", "Reverse-Chariot", 239);
    design.setup("Black", "Chariot-Soldier", 237);
    design.setup("Black", "Chariot-Soldier", 236);
    design.setup("Black", "Chariot-Soldier", 227);
    design.setup("Black", "Chariot-Soldier", 226);
    design.setup("Black", "Blind-Tiger", 234);
    design.setup("Black", "Blind-Tiger", 229);
    design.setup("Black", "Phoenix", 233);
    design.setup("Black", "Queen", 232);
    design.setup("Black", "Lion", 231);
    design.setup("Black", "Kylin", 230);
    design.setup("Black", "Side-Mover", 192);
    design.setup("Black", "Side-Mover", 207);
    design.setup("Black", "Vertical-Mover", 193);
    design.setup("Black", "Vertical-Mover", 206);
    design.setup("Black", "Rook", 194);
    design.setup("Black", "Rook", 205);
    design.setup("Black", "Horned-Falcon", 195);
    design.setup("Black", "Horned-Falcon", 204);
    design.setup("Black", "Soaring-Eagle", 196);
    design.setup("Black", "Soaring-Eagle", 203);
    design.setup("Black", "Bishop-General", 197);
    design.setup("Black", "Bishop-General", 202);
    design.setup("Black", "Rook-General", 198);
    design.setup("Black", "Rook-General", 201);
    design.setup("Black", "Vice-General", 200);
    design.setup("Black", "Great-General", 199);
    design.setup("Black", "Side-Soldier", 223);
    design.setup("Black", "Side-Soldier", 208);
    design.setup("Black", "Vertical-Soldier", 222);
    design.setup("Black", "Vertical-Soldier", 209);
    design.setup("Black", "Bishop", 210);
    design.setup("Black", "Bishop", 221);
    design.setup("Black", "Dragon-Horse", 211);
    design.setup("Black", "Dragon-Horse", 220);
    design.setup("Black", "Dragon-King", 212);
    design.setup("Black", "Dragon-King", 219);
    design.setup("Black", "Water-Buffalo", 213);
    design.setup("Black", "Water-Buffalo", 218);
    design.setup("Black", "Fire-Demon", 214);
    design.setup("Black", "Fire-Demon", 217);
    design.setup("Black", "Free-Eagle", 216);
    design.setup("Black", "Lion-Hawk", 215);
}

Dagaz.View.configure = function(view) {
    view.defBoard("Board");
    view.defPiece("WhiteKnight", "White Knight");
    view.defPiece("BlackKnight", "Black Knight");
    view.defPiece("WhiteIron-General", "White Iron-General");
    view.defPiece("BlackIron-General", "Black Iron-General");
    view.defPiece("WhitePawn", "White Pawn");
    view.defPiece("BlackPawn", "Black Pawn");
    view.defPiece("WhiteBishop", "White Bishop");
    view.defPiece("BlackBishop", "Black Bishop");
    view.defPiece("WhiteBishop!", "White Bishop!");
    view.defPiece("BlackBishop!", "Black Bishop!");
    view.defPiece("WhiteRook", "White Rook");
    view.defPiece("BlackRook", "Black Rook");
    view.defPiece("WhiteRook!", "White Rook!");
    view.defPiece("BlackRook!", "Black Rook!");
    view.defPiece("WhiteQueen", "White Queen");
    view.defPiece("BlackQueen", "Black Queen");
    view.defPiece("WhiteQueen!", "White Queen!");
    view.defPiece("BlackQueen!", "Black Queen!");
    view.defPiece("WhiteFlying-Ox", "White Flying-Ox");
    view.defPiece("BlackFlying-Ox", "Black Flying-Ox");
    view.defPiece("WhiteFree-Boar", "White Free-Boar");
    view.defPiece("BlackFree-Boar", "Black Free-Boar");
    view.defPiece("WhiteHorned-Falcon", "White Horned-Falcon");
    view.defPiece("BlackHorned-Falcon", "Black Horned-Falcon");
    view.defPiece("WhiteHorned-Falcon!", "White Horned-Falcon!");
    view.defPiece("BlackHorned-Falcon!", "Black Horned-Falcon!");
    view.defPiece("WhiteSoaring-Eagle", "White Soaring-Eagle");
    view.defPiece("BlackSoaring-Eagle", "Black Soaring-Eagle");
    view.defPiece("WhiteSoaring-Eagle!", "White Soaring-Eagle!");
    view.defPiece("BlackSoaring-Eagle!", "Black Soaring-Eagle!");
    view.defPiece("WhiteWhale", "White Whale");
    view.defPiece("BlackWhale", "Black Whale");
    view.defPiece("WhiteWhite-Horse", "White White-Horse");
    view.defPiece("BlackWhite-Horse", "Black White-Horse");
    view.defPiece("WhiteLion", "White Lion");
    view.defPiece("BlackLion", "Black Lion");
    view.defPiece("WhiteLion!", "White Lion!");
    view.defPiece("BlackLion!", "Black Lion!");
    view.defPiece("WhiteDragon-King", "White Dragon-King");
    view.defPiece("BlackDragon-King", "Black Dragon-King");
    view.defPiece("WhiteDragon-King!", "White Dragon-King!");
    view.defPiece("BlackDragon-King!", "Black Dragon-King!");
    view.defPiece("WhiteDragon-Horse", "White Dragon-Horse");
    view.defPiece("BlackDragon-Horse", "Black Dragon-Horse");
    view.defPiece("WhiteDragon-Horse!", "White Dragon-Horse!");
    view.defPiece("BlackDragon-Horse!", "Black Dragon-Horse!");
    view.defPiece("WhiteKylin", "White Kylin");
    view.defPiece("BlackKylin", "Black Kylin");
    view.defPiece("WhitePhoenix", "White Phoenix");
    view.defPiece("BlackPhoenix", "Black Phoenix");
    view.defPiece("WhiteReverse-Chariot", "White Reverse-Chariot");
    view.defPiece("BlackReverse-Chariot", "Black Reverse-Chariot");
    view.defPiece("WhiteSide-Mover", "White Side-Mover");
    view.defPiece("BlackSide-Mover", "Black Side-Mover");
    view.defPiece("WhiteSide-Mover!", "White Side-Mover!");
    view.defPiece("BlackSide-Mover!", "Black Side-Mover!");
    view.defPiece("WhiteVertical-Mover", "White Vertical-Mover");
    view.defPiece("BlackVertical-Mover", "Black Vertical-Mover");
    view.defPiece("WhiteVertical-Mover!", "White Vertical-Mover!");
    view.defPiece("BlackVertical-Mover!", "Black Vertical-Mover!");
    view.defPiece("WhiteFlying-Stag", "White Flying-Stag");
    view.defPiece("BlackFlying-Stag", "Black Flying-Stag");
    view.defPiece("WhiteLance", "White Lance");
    view.defPiece("BlackLance", "Black Lance");
    view.defPiece("WhiteKing", "White King");
    view.defPiece("BlackKing", "Black King");
    view.defPiece("WhitePrince", "White Prince");
    view.defPiece("BlackPrince", "Black Prince");
    view.defPiece("WhiteBlind-Tiger", "White Blind-Tiger");
    view.defPiece("BlackBlind-Tiger", "Black Blind-Tiger");
    view.defPiece("WhiteDrunk-Elephant", "White Drunk-Elephant");
    view.defPiece("BlackDrunk-Elephant", "Black Drunk-Elephant");
    view.defPiece("WhiteFerocious-Leopard", "White Ferocious-Leopard");
    view.defPiece("BlackFerocious-Leopard", "Black Ferocious-Leopard");
    view.defPiece("WhiteGold-General", "White Gold-General");
    view.defPiece("BlackGold-General", "Black Gold-General");
    view.defPiece("WhiteGold-General!", "White Gold-General!");
    view.defPiece("BlackGold-General!", "Black Gold-General!");
    view.defPiece("WhiteSilver-General", "White Silver-General");
    view.defPiece("BlackSilver-General", "Black Silver-General");
    view.defPiece("WhiteCopper-General", "White Copper-General");
    view.defPiece("BlackCopper-General", "Black Copper-General");
    view.defPiece("WhiteChariot-Soldier", "White Chariot-Soldier");
    view.defPiece("BlackChariot-Soldier", "Black Chariot-Soldier");
    view.defPiece("WhiteChariot-Soldier!", "White Chariot-Soldier!");
    view.defPiece("BlackChariot-Soldier!", "Black Chariot-Soldier!");
    view.defPiece("WhiteDog", "White Dog");
    view.defPiece("BlackDog", "Black Dog");
    view.defPiece("WhiteBishop-General", "White Bishop-General");
    view.defPiece("BlackBishop-General", "Black Bishop-General");
    view.defPiece("WhiteBishop-General!", "White Bishop-General!");
    view.defPiece("BlackBishop-General!", "Black Bishop-General!");
    view.defPiece("WhiteRook-General", "White Rook-General");
    view.defPiece("BlackRook-General", "Black Rook-General");
    view.defPiece("WhiteRook-General!", "White Rook-General!");
    view.defPiece("BlackRook-General!", "Black Rook-General!");
    view.defPiece("WhiteVice-General", "White Vice-General");
    view.defPiece("BlackVice-General", "Black Vice-General");
    view.defPiece("WhiteGreat-General", "White Great-General");
    view.defPiece("BlackGreat-General", "Black Great-General");
    view.defPiece("WhiteSide-Soldier", "White Side-Soldier");
    view.defPiece("BlackSide-Soldier", "Black Side-Soldier");
    view.defPiece("WhiteSide-Soldier!", "White Side-Soldier!");
    view.defPiece("BlackSide-Soldier!", "Black Side-Soldier!");
    view.defPiece("WhiteVertical-Soldier", "White Vertical-Soldier");
    view.defPiece("BlackVertical-Soldier", "Black Vertical-Soldier");
    view.defPiece("WhiteVertical-Soldier!", "White Vertical-Soldier!");
    view.defPiece("BlackVertical-Soldier!", "Black Vertical-Soldier!");
    view.defPiece("WhiteWater-Buffalo", "White Water-Buffalo");
    view.defPiece("BlackWater-Buffalo", "Black Water-Buffalo");
    view.defPiece("WhiteWater-Buffalo!", "White Water-Buffalo!");
    view.defPiece("BlackWater-Buffalo!", "Black Water-Buffalo!");
    view.defPiece("WhiteFire-Demon", "White Fire-Demon");
    view.defPiece("BlackFire-Demon", "Black Fire-Demon");
    view.defPiece("WhiteFree-Eagle", "White Free-Eagle");
    view.defPiece("BlackFree-Eagle", "Black Free-Eagle");
    view.defPiece("WhiteLion-Hawk", "White Lion-Hawk");
    view.defPiece("BlackLion-Hawk", "Black Lion-Hawk");
    view.defPiece("WhiteHeavenly-Tetrarch", "White Heavenly-Tetrarch");
    view.defPiece("BlackHeavenly-Tetrarch", "Black Heavenly-Tetrarch");
    view.defPiece("WhiteMulti-General", "White Multi-General");
    view.defPiece("BlackMulti-General", "Black Multi-General");
 
    view.defPosition("16a", 545, 545, 49, 49);
    view.defPosition("15a", 509, 545, 49, 49);
    view.defPosition("14a", 473, 545, 49, 49);
    view.defPosition("13a", 437, 545, 49, 49);
    view.defPosition("12a", 401, 545, 49, 49);
    view.defPosition("11a", 365, 545, 49, 49);
    view.defPosition("10a", 329, 545, 49, 49);
    view.defPosition("9a", 293, 545, 49, 49);
    view.defPosition("8a", 257, 545, 49, 49);
    view.defPosition("7a", 221, 545, 49, 49);
    view.defPosition("6a", 185, 545, 49, 49);
    view.defPosition("5a", 149, 545, 49, 49);
    view.defPosition("4a", 113, 545, 49, 49);
    view.defPosition("3a", 77, 545, 49, 49);
    view.defPosition("2a", 41, 545, 49, 49);
    view.defPosition("1a", 5, 545, 49, 49);
    view.defPosition("16b", 545, 509, 49, 49);
    view.defPosition("15b", 509, 509, 49, 49);
    view.defPosition("14b", 473, 509, 49, 49);
    view.defPosition("13b", 437, 509, 49, 49);
    view.defPosition("12b", 401, 509, 49, 49);
    view.defPosition("11b", 365, 509, 49, 49);
    view.defPosition("10b", 329, 509, 49, 49);
    view.defPosition("9b", 293, 509, 49, 49);
    view.defPosition("8b", 257, 509, 49, 49);
    view.defPosition("7b", 221, 509, 49, 49);
    view.defPosition("6b", 185, 509, 49, 49);
    view.defPosition("5b", 149, 509, 49, 49);
    view.defPosition("4b", 113, 509, 49, 49);
    view.defPosition("3b", 77, 509, 49, 49);
    view.defPosition("2b", 41, 509, 49, 49);
    view.defPosition("1b", 5, 509, 49, 49);
    view.defPosition("16c", 545, 473, 49, 49);
    view.defPosition("15c", 509, 473, 49, 49);
    view.defPosition("14c", 473, 473, 49, 49);
    view.defPosition("13c", 437, 473, 49, 49);
    view.defPosition("12c", 401, 473, 49, 49);
    view.defPosition("11c", 365, 473, 49, 49);
    view.defPosition("10c", 329, 473, 49, 49);
    view.defPosition("9c", 293, 473, 49, 49);
    view.defPosition("8c", 257, 473, 49, 49);
    view.defPosition("7c", 221, 473, 49, 49);
    view.defPosition("6c", 185, 473, 49, 49);
    view.defPosition("5c", 149, 473, 49, 49);
    view.defPosition("4c", 113, 473, 49, 49);
    view.defPosition("3c", 77, 473, 49, 49);
    view.defPosition("2c", 41, 473, 49, 49);
    view.defPosition("1c", 5, 473, 49, 49);
    view.defPosition("16d", 545, 437, 49, 49);
    view.defPosition("15d", 509, 437, 49, 49);
    view.defPosition("14d", 473, 437, 49, 49);
    view.defPosition("13d", 437, 437, 49, 49);
    view.defPosition("12d", 401, 437, 49, 49);
    view.defPosition("11d", 365, 437, 49, 49);
    view.defPosition("10d", 329, 437, 49, 49);
    view.defPosition("9d", 293, 437, 49, 49);
    view.defPosition("8d", 257, 437, 49, 49);
    view.defPosition("7d", 221, 437, 49, 49);
    view.defPosition("6d", 185, 437, 49, 49);
    view.defPosition("5d", 149, 437, 49, 49);
    view.defPosition("4d", 113, 437, 49, 49);
    view.defPosition("3d", 77, 437, 49, 49);
    view.defPosition("2d", 41, 437, 49, 49);
    view.defPosition("1d", 5, 437, 49, 49);
    view.defPosition("16e", 545, 401, 49, 49);
    view.defPosition("15e", 509, 401, 49, 49);
    view.defPosition("14e", 473, 401, 49, 49);
    view.defPosition("13e", 437, 401, 49, 49);
    view.defPosition("12e", 401, 401, 49, 49);
    view.defPosition("11e", 365, 401, 49, 49);
    view.defPosition("10e", 329, 401, 49, 49);
    view.defPosition("9e", 293, 401, 49, 49);
    view.defPosition("8e", 257, 401, 49, 49);
    view.defPosition("7e", 221, 401, 49, 49);
    view.defPosition("6e", 185, 401, 49, 49);
    view.defPosition("5e", 149, 401, 49, 49);
    view.defPosition("4e", 113, 401, 49, 49);
    view.defPosition("3e", 77, 401, 49, 49);
    view.defPosition("2e", 41, 401, 49, 49);
    view.defPosition("1e", 5, 401, 49, 49);
    view.defPosition("16f", 545, 365, 49, 49);
    view.defPosition("15f", 509, 365, 49, 49);
    view.defPosition("14f", 473, 365, 49, 49);
    view.defPosition("13f", 437, 365, 49, 49);
    view.defPosition("12f", 401, 365, 49, 49);
    view.defPosition("11f", 365, 365, 49, 49);
    view.defPosition("10f", 329, 365, 49, 49);
    view.defPosition("9f", 293, 365, 49, 49);
    view.defPosition("8f", 257, 365, 49, 49);
    view.defPosition("7f", 221, 365, 49, 49);
    view.defPosition("6f", 185, 365, 49, 49);
    view.defPosition("5f", 149, 365, 49, 49);
    view.defPosition("4f", 113, 365, 49, 49);
    view.defPosition("3f", 77, 365, 49, 49);
    view.defPosition("2f", 41, 365, 49, 49);
    view.defPosition("1f", 5, 365, 49, 49);
    view.defPosition("16g", 545, 329, 49, 49);
    view.defPosition("15g", 509, 329, 49, 49);
    view.defPosition("14g", 473, 329, 49, 49);
    view.defPosition("13g", 437, 329, 49, 49);
    view.defPosition("12g", 401, 329, 49, 49);
    view.defPosition("11g", 365, 329, 49, 49);
    view.defPosition("10g", 329, 329, 49, 49);
    view.defPosition("9g", 293, 329, 49, 49);
    view.defPosition("8g", 257, 329, 49, 49);
    view.defPosition("7g", 221, 329, 49, 49);
    view.defPosition("6g", 185, 329, 49, 49);
    view.defPosition("5g", 149, 329, 49, 49);
    view.defPosition("4g", 113, 329, 49, 49);
    view.defPosition("3g", 77, 329, 49, 49);
    view.defPosition("2g", 41, 329, 49, 49);
    view.defPosition("1g", 5, 329, 49, 49);
    view.defPosition("16h", 545, 293, 49, 49);
    view.defPosition("15h", 509, 293, 49, 49);
    view.defPosition("14h", 473, 293, 49, 49);
    view.defPosition("13h", 437, 293, 49, 49);
    view.defPosition("12h", 401, 293, 49, 49);
    view.defPosition("11h", 365, 293, 49, 49);
    view.defPosition("10h", 329, 293, 49, 49);
    view.defPosition("9h", 293, 293, 49, 49);
    view.defPosition("8h", 257, 293, 49, 49);
    view.defPosition("7h", 221, 293, 49, 49);
    view.defPosition("6h", 185, 293, 49, 49);
    view.defPosition("5h", 149, 293, 49, 49);
    view.defPosition("4h", 113, 293, 49, 49);
    view.defPosition("3h", 77, 293, 49, 49);
    view.defPosition("2h", 41, 293, 49, 49);
    view.defPosition("1h", 5, 293, 49, 49);
    view.defPosition("16i", 545, 257, 49, 49);
    view.defPosition("15i", 509, 257, 49, 49);
    view.defPosition("14i", 473, 257, 49, 49);
    view.defPosition("13i", 437, 257, 49, 49);
    view.defPosition("12i", 401, 257, 49, 49);
    view.defPosition("11i", 365, 257, 49, 49);
    view.defPosition("10i", 329, 257, 49, 49);
    view.defPosition("9i", 293, 257, 49, 49);
    view.defPosition("8i", 257, 257, 49, 49);
    view.defPosition("7i", 221, 257, 49, 49);
    view.defPosition("6i", 185, 257, 49, 49);
    view.defPosition("5i", 149, 257, 49, 49);
    view.defPosition("4i", 113, 257, 49, 49);
    view.defPosition("3i", 77, 257, 49, 49);
    view.defPosition("2i", 41, 257, 49, 49);
    view.defPosition("1i", 5, 257, 49, 49);
    view.defPosition("16j", 545, 221, 49, 49);
    view.defPosition("15j", 509, 221, 49, 49);
    view.defPosition("14j", 473, 221, 49, 49);
    view.defPosition("13j", 437, 221, 49, 49);
    view.defPosition("12j", 401, 221, 49, 49);
    view.defPosition("11j", 365, 221, 49, 49);
    view.defPosition("10j", 329, 221, 49, 49);
    view.defPosition("9j", 293, 221, 49, 49);
    view.defPosition("8j", 257, 221, 49, 49);
    view.defPosition("7j", 221, 221, 49, 49);
    view.defPosition("6j", 185, 221, 49, 49);
    view.defPosition("5j", 149, 221, 49, 49);
    view.defPosition("4j", 113, 221, 49, 49);
    view.defPosition("3j", 77, 221, 49, 49);
    view.defPosition("2j", 41, 221, 49, 49);
    view.defPosition("1j", 5, 221, 49, 49);
    view.defPosition("16k", 545, 185, 49, 49);
    view.defPosition("15k", 509, 185, 49, 49);
    view.defPosition("14k", 473, 185, 49, 49);
    view.defPosition("13k", 437, 185, 49, 49);
    view.defPosition("12k", 401, 185, 49, 49);
    view.defPosition("11k", 365, 185, 49, 49);
    view.defPosition("10k", 329, 185, 49, 49);
    view.defPosition("9k", 293, 185, 49, 49);
    view.defPosition("8k", 257, 185, 49, 49);
    view.defPosition("7k", 221, 185, 49, 49);
    view.defPosition("6k", 185, 185, 49, 49);
    view.defPosition("5k", 149, 185, 49, 49);
    view.defPosition("4k", 113, 185, 49, 49);
    view.defPosition("3k", 77, 185, 49, 49);
    view.defPosition("2k", 41, 185, 49, 49);
    view.defPosition("1k", 5, 185, 49, 49);
    view.defPosition("16l", 545, 149, 49, 49);
    view.defPosition("15l", 509, 149, 49, 49);
    view.defPosition("14l", 473, 149, 49, 49);
    view.defPosition("13l", 437, 149, 49, 49);
    view.defPosition("12l", 401, 149, 49, 49);
    view.defPosition("11l", 365, 149, 49, 49);
    view.defPosition("10l", 329, 149, 49, 49);
    view.defPosition("9l", 293, 149, 49, 49);
    view.defPosition("8l", 257, 149, 49, 49);
    view.defPosition("7l", 221, 149, 49, 49);
    view.defPosition("6l", 185, 149, 49, 49);
    view.defPosition("5l", 149, 149, 49, 49);
    view.defPosition("4l", 113, 149, 49, 49);
    view.defPosition("3l", 77, 149, 49, 49);
    view.defPosition("2l", 41, 149, 49, 49);
    view.defPosition("1l", 5, 149, 49, 49);
    view.defPosition("16m", 545, 113, 49, 49);
    view.defPosition("15m", 509, 113, 49, 49);
    view.defPosition("14m", 473, 113, 49, 49);
    view.defPosition("13m", 437, 113, 49, 49);
    view.defPosition("12m", 401, 113, 49, 49);
    view.defPosition("11m", 365, 113, 49, 49);
    view.defPosition("10m", 329, 113, 49, 49);
    view.defPosition("9m", 293, 113, 49, 49);
    view.defPosition("8m", 257, 113, 49, 49);
    view.defPosition("7m", 221, 113, 49, 49);
    view.defPosition("6m", 185, 113, 49, 49);
    view.defPosition("5m", 149, 113, 49, 49);
    view.defPosition("4m", 113, 113, 49, 49);
    view.defPosition("3m", 77, 113, 49, 49);
    view.defPosition("2m", 41, 113, 49, 49);
    view.defPosition("1m", 5, 113, 49, 49);
    view.defPosition("16n", 545, 77, 49, 49);
    view.defPosition("15n", 509, 77, 49, 49);
    view.defPosition("14n", 473, 77, 49, 49);
    view.defPosition("13n", 437, 77, 49, 49);
    view.defPosition("12n", 401, 77, 49, 49);
    view.defPosition("11n", 365, 77, 49, 49);
    view.defPosition("10n", 329, 77, 49, 49);
    view.defPosition("9n", 293, 77, 49, 49);
    view.defPosition("8n", 257, 77, 49, 49);
    view.defPosition("7n", 221, 77, 49, 49);
    view.defPosition("6n", 185, 77, 49, 49);
    view.defPosition("5n", 149, 77, 49, 49);
    view.defPosition("4n", 113, 77, 49, 49);
    view.defPosition("3n", 77, 77, 49, 49);
    view.defPosition("2n", 41, 77, 49, 49);
    view.defPosition("1n", 5, 77, 49, 49);
    view.defPosition("16o", 545, 41, 49, 49);
    view.defPosition("15o", 509, 41, 49, 49);
    view.defPosition("14o", 473, 41, 49, 49);
    view.defPosition("13o", 437, 41, 49, 49);
    view.defPosition("12o", 401, 41, 49, 49);
    view.defPosition("11o", 365, 41, 49, 49);
    view.defPosition("10o", 329, 41, 49, 49);
    view.defPosition("9o", 293, 41, 49, 49);
    view.defPosition("8o", 257, 41, 49, 49);
    view.defPosition("7o", 221, 41, 49, 49);
    view.defPosition("6o", 185, 41, 49, 49);
    view.defPosition("5o", 149, 41, 49, 49);
    view.defPosition("4o", 113, 41, 49, 49);
    view.defPosition("3o", 77, 41, 49, 49);
    view.defPosition("2o", 41, 41, 49, 49);
    view.defPosition("1o", 5, 41, 49, 49);
    view.defPosition("16p", 545, 5, 49, 49);
    view.defPosition("15p", 509, 5, 49, 49);
    view.defPosition("14p", 473, 5, 49, 49);
    view.defPosition("13p", 437, 5, 49, 49);
    view.defPosition("12p", 401, 5, 49, 49);
    view.defPosition("11p", 365, 5, 49, 49);
    view.defPosition("10p", 329, 5, 49, 49);
    view.defPosition("9p", 293, 5, 49, 49);
    view.defPosition("8p", 257, 5, 49, 49);
    view.defPosition("7p", 221, 5, 49, 49);
    view.defPosition("6p", 185, 5, 49, 49);
    view.defPosition("5p", 149, 5, 49, 49);
    view.defPosition("4p", 113, 5, 49, 49);
    view.defPosition("3p", 77, 5, 49, 49);
    view.defPosition("2p", 41, 5, 49, 49);
    view.defPosition("1p", 5, 5, 49, 49);
}
