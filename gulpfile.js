const GulpClient = require('gulp');
const { series, src,dest, task } = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 5 versions'] });
const cleanCSS = require('gulp-clean-css');
var hash = require('gulp-hash');
const template = require('gulp-template');
const { cairoVersion } = require('canvas');
const through = require('through2');
const fs = require('fs');
const del = require('del');
var concat = require('gulp-concat-util');
var uglify = require('gulp-uglify');

var styleName = '';

const alwaysScripts = [
    "public/games/vendor/underscore-min.js",
    "public/games/vendor/seedrandom.min.js",
    "public/games/vendor/jquery-3.5.1.min.js",
    "public/games/common-scripts/dagaz.js",
    "public/games/common-scripts/zrf-model.js",
    "public/games/common-scripts/zobrist.js",
    "public/games/autofit.js"
];

const games = [
    {
        id:'bagh-chal',
        title:'Тигры и козы',
        description:'Козы против Тигров! Вы играете за коз. Устанавливайте свои фигуры на любой свободный пункт.<br>\
        После того как все козы (их всего 20) расставлены, вы можете двигать их по линиям, на примыкающие пустые пункты.<br>\
        Тигры едят коз, перепрыгивая через них по линии на следующий пустой пункт и могут продолжать бой, если есть такая возможность.<br>\
        Ваша задача - лишить тигров возможности хода. Это не так сложно, как кажется.<br>',
        background:'blue',
        width:421,
        height:421,
        images:{
            "Board":"images/dablot/alquerque.png",
            "BlackGoat":"images/dablot/bking.png",
            "WhiteTiger":"images/dablot/wking.png"
        },
        scripts:[
            "public/games/common-scripts/ko.js",
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v3.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/common-scripts/heuristic-ai.js",
            "public/games/scripts/bagh-chal-extension.js",
            "public/games/scripts/bagh-chal.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'damone',
        title:'Italian Damone',
        description:'В этой старинной итальянской игре нет равенства. Обычные шашки не могут бить принцев и королей, а короли неуязвимы для принцев.<br>\
        Фигуры двигаются по направлению к лагерю противника. Короли и принцы могут перемещаться на одно соседнее поле по диагонали, в любом направлении.<br>\
        Атака вражеской фигуры осуществляется перепрыгиванием через неё на следующую за ней пустую клетку. Вы обязаны атаковать противника, если есть такая возможность.<br>\
        За один ход можно взять несколько фигур противника, перепрыгивая их друг за другом.<br>\
        В лагере противника расположены поля превращения. Обычные фигуры могут превратиться в принцев, а принц может превратиться в короля, заняв самый дальний угол доски.<br>\
        Обычная фигура не может превратиться в короля, после того как она превратилась в принца!<br>\
        Для победы, захватите всех королей противника, либо проведите своего короля на то место, которое занимал король противника в начале игры.<br>',
        background:'blue',
        width:404,
        height:404,
        images:{
            "Board":"images/damone/italian.png",
            "WhiteMan":"images/damone/wman.png",
            "BlackMan" :"images/damone/bman.png",
            "WhitePromotedMan" :"images/damone/wdragon.png",
            "BlackPromotedMan" :"images/damone/bdragon.png",
            "WhiteDama" :"images/damone/wdragon.png",
            "BlackDama" :"images/damone/bdragon.png",
            "WhitePromotedDama" :"images/damone/wqueen.png",
            "BlackPromotedDama" :"images/damone/bqueen.png",
            "WhiteDamone" :"images/damone/wqueen.png",
            "BlackDamone" :"images/damone/bqueen.png"
        },
        scripts:[
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v1.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/common-scripts/uct-ai-v4.js",
            "public/games/common-scripts/forced-ai.js",
            "public/games/scripts/damone-extension.js",
            "public/games/scripts/italian-damone.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'filler',
        title:'Filler',
        description:'Эта игра пришла к нам из 90-ых годов. Во времена MS DOS, Filler был популярным офисным убийцей времени.</p>\
        <p>Ваша задача - закрасить своим цветом как можно большую территорию. Но противник тоже не дремлет!</p>\
        <p>Выбирайте цвет одного из соседей, нажимая кнопки внизу. Вы не можете выбрать цвет, который выбрал противник!',
        background:'blue',
        width:640,
        height:393,
        images:{
            "Board":"images/filler/board.png",
            "WestBlue": "images/filler/bm.png",
            "EastBlue": "images/filler/bm.png",
            "NoneBlue": "images/filler/bm.png",
            "WestRed": "images/filler/rm.png",
            "EastRed": "images/filler/rm.png",
            "NoneRed": "images/filler/rm.png",
            "WestYellow": "images/filler/ym.png",
            "EastYellow": "images/filler/ym.png",
            "NoneYellow": "images/filler/ym.png",
            "WestGreen": "images/filler/gm.png",
            "EastGreen": "images/filler/gm.png",
            "NoneGreen": "images/filler/gm.png",
            "WestPurple": "images/filler/pm.png",
            "EastPurple": "images/filler/pm.png",
            "NonePurple": "images/filler/pm.png",
            "WestOrange": "images/filler/om.png",
            "EastOrange": "images/filler/om.png",
            "NoneOrange": "images/filler/om.png",
            "WestLight": "images/filler/lm.png",
            "EastLight": "images/filler/lm.png",
            "NoneLight": "images/filler/lm.png",
            "WestMark": "images/filler/w.png",
            "EastMark": "images/filler/e.png",
            "NoneWall": "images/filler/am.png",
            "NoneDark": "images/filler/dm.png",
            "NoneFire": "images/filler/fm.png",
            "NoneIce": "images/filler/im.png",
            "Ko": "images/filler/ko.png"
        },
        scripts:[
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v3.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/scripts/filler-ai.js",
            "public/games/scripts/filler-goal.js",
            "public/games/scripts/filler-setup.js",
            "public/games/scripts/filler-keyboard.js",
            "public/games/scripts/filler-fire.js",
            "public/games/scripts/filler-dark.js",
            "public/games/scripts/filler-extension.js",
            "public/games/scripts/filler-moves.js",
            "public/games/scripts/filler-40x20.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'foxnguse',
        title:'Лиса и гуси',
        description:'Лиса и гуси - средневековая игра из Европы. Вы играете за гусей. Ваша задача - окружить лису, лишив её хода.<br>\
        Двигаться можно в любом из 8 направлений, на соседнее пустое поле. Лиса ест гусей, перепрыгивая через них на следующий пустой пункт.<br>\
        Продолжая движение, лиса может брать по нескольку гусей за ход. Это игра на внимательность. Не упустите лису!<br>',
        background:'blue',
        width:360,
        height:360,
        images:{
            "Board":"images/asalto/british.png",
            "SoldiersSoldier":"images/asalto/soldier.png",
            "DefendersDefender":"images/asalto/defender.png"
        },
        scripts:[
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v3.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/common-scripts/aggressive-ai.js",
            "public/games/scripts/fox-and-geese-british.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'french-military',
        title:'Французская военная игра',
        description:'Эта игра была очень популярна среди французских солдат, во времена войны с Пруссией 1870 года.<br>\
        Вы играете за зелёных. Зажмите красную фишку наверху, лишив её возможности хода.<br>\
        Ваши фигуры не могут двигаться вниз и если противник прорвётся, вы не сможете его остановить!<br>',
        width:186,
        height:442,
        images:{
            "Board":"images/french-military/large.png",
            "RedRedPiece":"images/french-military/red.png",
            "GreenGreenPiece":"images/french-military/black.png"
        },
        scripts:[
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v3.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/scripts/french-military-large.js",
            "public/games/scripts/breakthrough-ai.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'horn-chess',
        title:'Китайские роговые шахматы',
        description:'Детская игра из Китая. Зажмите белый камень двумя чёрными камнями, лишив его хода.<br>\
        Перемещаться можно по начерченным линиям. Чёрные камни не могут двигаться вниз.',
        background:'blue',
        width:414,
        height:507,
        images:{
            "Board":"images/horn/board.png",
            "BlackBlackStone":"images/horn/black.png",
            "WhiteWhiteStone":"images/horn/white.png"

        },
        scripts:[
            "public/games/common-scripts/ko.js",
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v3.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/common-scripts/ab-ai-v2.js",
            "public/games/scripts/horn-chess-goal.js",
            "public/games/scripts/horn-chess.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'kharbaga',
        title:'Кабарга',
        description:'Игра из Северной Африки, очень напоминающая шашки. Двигаться можно по отмеченным линиям и только вперёд.<br>\
        Обычный ход может быть выполнен на соседний пункт, при условии, что он пуст. Взятие выполняется прыжком.<br>\
        Если на соседнем пункте расположилась фигура противника, а следующий пункт пуст, вы можете перепрыгнуть её.<br>\
        Продолжая прыжки, вы можете забрать больше фигур противника. Вы обязаны атаковать, если есть такая возможность.<br>\
        На последней линии, обычные фигуры превращаются в дамок. Дамки могут двигаться в любом направлении и на любое число шагов.<br>\
        Заберите все фигуры противника или лишите их возможности хода.<br>',
        background:'blue',
        width:423,
        height:423,
        images:{
            "Board":"images/dablot/5x5.png",
            "WhiteMan" :"images/dablot/wman.png",
            "BlackMan":"images/dablot/bman.png",
            "WhiteKing" :"images/dablot/wprince.png",
            "BlackKing" :"images/dablot/bprince.png"
        },
        scripts:[
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v1.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/common-scripts/uct-ai-v4.js",
            "public/games/common-scripts/forced-ai.js",
            "public/games/scripts/maximal-captures.js",
            "public/games/scripts/international-extension.js",
            "public/games/scripts/kharbaga-extension.js",
            "public/games/scripts/kharbaga.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'light-off',
        title:'Туши свет!',
        description:'Всё просто - нажимая на лампочку, вы включаете, либо выключаете её.<br>\
        При этом, по определённой схеме, включаются и выключаются её соседи.<br>\
        Ваша задача - погасить все лампочки!<br>',
        background:'blue',
        width:375,
        height:375,
        images:{
            "Board":"images/light-off/5x5.png",
            "Youlight":"images/light-off/on.png",
            "Youdark":"images/light-off/off.png"
        },
        scripts:[
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view.js",
            "public/games/common-scripts/move-list.js",
            "public/games/scripts/light-off-extension.js",
            "public/games/scripts/light-off-setup.js",
            "public/games/scripts/light-off.js",
            "public/games/common-scripts/app-net.js"
        ]
    },
    {
        id:'magyar-dama',
        title:'Мадьярские шашки',
        description:'Эта игра похожа на шашки, правда поле здесь шестиугольное. Вы можете двигаться на соседнее пустое поле или атаковать противника.<br>\
        Атака осуществляется прыжком через фигуру на следующее за ней пустое поле. Взятая фигура не убирается с доски, а помещается под побившую её фигуру.<br>\
        Пленников можно освободить, захватив верхнюю фигуру в стопке. Атаки обязательны и последовательность взятий должна продолжаться, пока есть такая возможность.<br>\
        У этой игры есть ещё одна особенность. После каждого своего хода, вы можете изменить конфигурацию доски.<br>\
        Просто выберите одно из отмеченных полей и переместите его на другое место.<br>\
        Захватите все фигуры противника в плен или лишите их возможности хода!<br>',
        background:'blue',
        width:1137,
        height:843,
        images:{
            "NTile":"images/magyar/tile.png",
            "RedStone":"images/magyar/red.png",
            "WhiteStone":"images/magyar/white.png"
        },
        scripts:[
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v1.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/common-scripts/aggressive-ai-v5.js",
            "public/games/scripts/magyar-setup.js",
            "public/games/scripts/magyar-view.js",
            "public/games/scripts/magyar-goal.js",
            "public/games/scripts/magyar-tiles.js",
            "public/games/scripts/magyar-extension.js",
            "public/games/scripts/magyar-invariant.js",
            "public/games/scripts/magyar-checkers.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'maharadja',
        title:'Магараджа',
        description:'Вы знакомы с Шахматами? В этой игре, всё почти также, но есть Махараджа - фигура совмещающая ходы Ферзя и Коня.<br>\
        Действуя согласованно, шахматные фигуры могут поймать Махараджу в ловушку. Но и Махараджа может поставить мат королю!<br>\
        Ещё один момент - в этой игре, пешки ни во что не превращаются!<br>',
        width:548,
        height:548,
        images:{
            "Board":"images/maharadja/board.png",
            "WhitePawn":"images/maharadja/wpawn.png",
            "WhiteRook":"images/maharadja/wrook.png",
            "WhiteKnight":"images/maharadja/wknight.png",
            "WhiteBishop":"images/maharadja/wbishop.png",
            "WhiteQueen":"images/maharadja/wqueen.png",
            "WhiteKing":"images/maharadja/wking.png",
            "BlackMaharadja":"images/maharadja/bqueen.png"
        },
        scripts:[
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v3.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/common-scripts/aggressive-ai.js",
            "public/games/scripts/maharadja-extension.js",
            "public/games/scripts/maharadja.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'netwalk',
        title:'Сеть',
        description:'Вся сеть перепуталась! Соедините её в единой целое, связав все куски между собой.<br>',
        width:450,
        height:450,
        images:{
            "Board":"images/netwalk/board.png",
            "Youb1":"images/netwalk/b1.png",
            "Youb2we":"images/netwalk/b2we.png",
            "Youb2ns":"images/netwalk/b2ns.png",
            "Youb2ew":"images/netwalk/b2ew.png",
            "Youb2sn":"images/netwalk/b2sn.png",
            "Youb2ne":"images/netwalk/b2ne.png",
            "Youb2se":"images/netwalk/b2se.png",
            "Youb2sw":"images/netwalk/b2sw.png",
            "Youb2nw":"images/netwalk/b2nw.png",
            "Youb3n":"images/netwalk/b3n.png",
            "Youb3e":"images/netwalk/b3e.png",
            "Youb3s":"images/netwalk/b3s.png",
            "Youb3w":"images/netwalk/b3w.png",
            "Youb4":"images/netwalk/b4.png",
            "Youb1n":"images/netwalk/b1n.png",
            "Youb1e":"images/netwalk/b1e.png",
            "Youb1s":"images/netwalk/b1s.png",
            "Youb1w":"images/netwalk/b1w.png",
            "Youg1":"images/netwalk/g1.png",
            "Youg2we":"images/netwalk/g2we.png",
            "Youg2ns":"images/netwalk/g2ns.png",
            "Youg2ew":"images/netwalk/g2ew.png",
            "Youg2sn":"images/netwalk/g2sn.png",
            "Youg2ne":"images/netwalk/g2ne.png",
            "Youg2se":"images/netwalk/g2se.png",
            "Youg2sw":"images/netwalk/g2sw.png",
            "Youg2nw":"images/netwalk/g2nw.png",
            "Youg3n":"images/netwalk/g3n.png",
            "Youg3e":"images/netwalk/g3e.png",
            "Youg3s":"images/netwalk/g3s.png",
            "Youg3w":"images/netwalk/g3w.png",
            "Youg4":"images/netwalk/g4.png",
            "Youg1n":"images/netwalk/g1n.png",
            "Youg1e":"images/netwalk/g1e.png",
            "Youg1s":"images/netwalk/g1s.png",
            "Youg1w":"images/netwalk/g1w.png"
        },
        scripts:[
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view.js",
            "public/games/common-scripts/move-list.js",
            "public/games/scripts/netwalk-setup.js",
            "public/games/scripts/netwalk.js",
            "public/games/common-scripts/app-net.js"
        ]
    },
    {
        id:'shisima',
        title:'Shisima',
        description:'Шизима - простая игра из Кении. Вы можете двигать свои камни по линиям, на соседнее пустое поле.<br>\
        Цель игры - выстроить камни своего цвета по одному из диаметров круга.<br>\
        Удастся ли вам победить?<br>',
        width:444,
        height:444,
        images:{
            "Board":"images/shisima/board.png",
            "GreenPiece":"images/shisima/green.png",
            "RedPiece":"images/shisima/red.png"
        },
        scripts:[
            "public/games/common-scripts/ko.js",
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v2.js",
            "public/games/common-scripts/move-list-v1.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/common-scripts/uct-ai.js",
            "public/games/scripts/shisima-goal.js",
            "public/games/scripts/shisima.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    },
    {
        id:'uxo',
        title:'Тактические крестики нолики',
        description:'Здесь 9 досок для игры в крестики нолики. Победив на любой из них, вы сможете поставить крестик на поле большой доски.<br>\
        Поставив 3 больших крестика в ряд, вы победите, но не всё так просто. Каждым своим ходом, вы определяете доску, на которой будет играть противник.<br>\
        Если игра на выбранной доске уже завершена, противник может выбрать любую доску, для ответного хода.<br>\
        Первый ход за вами! Сыграйте в "Тактические крестики-нолики" и победите!<br>',
        width:561,
        height:560,
        images:{
            "Board" :"images/uxo/board.png",
            "XB1" :"images/uxo/bigx1.png",
            "OB1" :"images/uxo/bigo1.png",
            "XB2" :"images/uxo/bigx2.png",
            "OB2" :"images/uxo/bigo2.png",
            "XB3" :"images/uxo/bigx3.png",
            "OB3" :"images/uxo/bigo3.png",
            "XS1" :"images/uxo/smallx1.png",
            "OS1" :"images/uxo/smallo1.png",
            "XS2" :"images/uxo/smallx2.png",
            "OS2" :"images/uxo/smallo2.png",
            "XS3" :"images/uxo/smallx3.png",
            "OS3" :"images/uxo/smallo3.png",
            "XNone" :"images/uxo/e.png",
            "ONone" :"images/uxo/e.png",
            "Ko" :"images/uxo/ko.png"
        },
        scripts:[
            "public/games/common-scripts/common-setup-v2.js",
            "public/games/common-scripts/2d-view-v4.js",
            "public/games/common-scripts/move-list-v2.js",
            "public/games/common-scripts/random-ai.js",
            "public/games/common-scripts/uct-ai.js",
            "public/games/scripts/qxo-goal.js",
            "public/games/scripts/uxo-extension.js",
            "public/games/scripts/uxo-restrictions.js",
            "public/games/scripts/uxo.js",
            "public/games/common-scripts/app-v2-net.js"
        ]
    }
];

function packTheGame(game) {
    return src('./public/games/templates/intro.html')
        .pipe(template(game))
        .pipe(dest('./dist'));  
}

function buildLess() {
    // place code for your default task here
    return src('./public/games/style.less')
    .pipe(hash())
    .pipe(less({
        plugins: [autoprefix]
      }))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(through.obj((chunk, enc, cb) => {
          styleName =  chunk.basename;
        cb(null, chunk)
      }))
      .pipe(dest('./dist/css'))
    
}

function render(template, data = {}) {
    var html = fs.readFileSync('./public/games/templates/'+template+'.html').toString();
    data.style = styleName;
    for(let [key,value] of Object.entries( data)) {
        html = html.split("%%"+key+"%%").join(value);
    }
    return html;
}

function writeTemplate(html,name) {
    fs.writeFileSync("./dist/"+name+".html",html);
}

async function buildGames(cba) {

    gamesNames = {};


  
    
    for(let game of games) {
       //make intro 
       gamesNames[game.id] = game.title;
       game.description = "<p>"+game.description.split("<br>").join("</p><p>")+"</p>";
       let intro = render('intro',game);
    
       writeTemplate(intro,game.id+"-intro");

       //prepare images and scripts
       var imgList = "";
       for(let [iKey,iVal] of Object.entries(game.images)) {
           imgList+='<img src="'+iVal+'" id="'+iKey+'" style="display:none;"/>';
       }
    

       game.imgList = imgList;

       var scripts = [...alwaysScripts];
       //bundle game scripts
       for(let script of game.scripts) {
           scripts.push(script);
       }
    
       await new Promise((resolve,reject)=>{
        src(scripts).pipe(concat(game.id+".js"))
                    .pipe(hash())
                    .pipe(through.obj((chunk, enc, cb) => {
                        game.allScripts =  chunk.basename;
                        cb(null, chunk)
                    }))
                    .pipe(uglify())
                    .pipe(dest('./dist/js'))
                    .pipe(through.obj((chunk, enc, cb) => {
                        resolve();
                        cb(null, chunk)
                    }));
       }); 

        let ghtml = render('game',game);
       writeTemplate(ghtml,game.id);
      console.log("Game ",game.id,game.allScripts);
    }
    let bonus = render('bonus',{bonusNames:JSON.stringify(gamesNames)});
    writeTemplate(bonus,'bonus');

    let lose = render("lose",{bonusNames:JSON.stringify(gamesNames)});
    writeTemplate(lose,'lose');

    var gamesList = [];
    for(let game of games) {
        gamesList.push('<li><a href="'+game.id+'-intro.html">'+game.title+'</a></li>');
    }

    gamesList = gamesList.join("");

    writeTemplate(render('index',{gamesList:gamesList}),'index');
    writeTemplate(render('privacy'),'privacy');

    cba();
}
function cleanDist(cb)  {
    del(['./dist/**', '!dist'], {force:true});
    cb();
}
  function copyDir() {
      return src("./public/games/images/**").pipe(dest("./dist/images"));
  }
  exports.default = series(cleanDist,buildLess,copyDir,buildGames);