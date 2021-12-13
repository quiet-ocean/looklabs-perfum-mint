"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Token = void 0;
var react_1 = require("react");
var ethers_1 = require("ethers");
var swr_1 = require("swr");
var state_1 = require("../../state");
var fetchers_1 = require("../../utils/fetchers");
var utils_1 = require("../../utils");
var react_player_1 = require("react-player");
var react_visibility_sensor_1 = require("react-visibility-sensor");
var react_spring_1 = require("react-spring");
var __1 = require("..");
var config = require("./config");
var react_text_spinners_1 = require("react-text-spinners");
var Token = function (_a) {
    var token = _a.token, isOnSale = _a.isOnSale, onTransfer = _a.onTransfer, onBuy = _a.onBuy, onSale = _a.onSale;
    var _b = react_1.useState(false), transfer = _b[0], setTransfer = _b[1];
    var _c = react_1.useState(false), onSaleActive = _c[0], setOnSale = _c[1];
    var _d = react_1.useState(''), address = _d[0], setAddress = _d[1];
    var _e = react_1.useState(''), price = _e[0], setPrice = _e[1];
    var _f = state_1.useAppState(), user = _f.user, ethPrice = _f.ethPrice, contractDetails = _f.contractDetails, transferToken = _f.transferToken, buyToken = _f.buyToken, setTokenSale = _f.setTokenSale;
    var tokenPrice = Number(ethers_1.utils.formatEther(token.price));
    var _g = react_1.useState({
        qty: 1,
        productPrice: tokenPrice
    }), order = _g[0], setOrder = _g[1];
    var _h = react_1.useState(0), faqIdx = _h[0], setFaqIdx = _h[1];
    var _j = react_1.useState({
        width: '100%',
        height: '100%'
    }), dimensions = _j[0], setDimensions = _j[1];
    var onTransferClick = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            if (onTransfer && ethers_1.utils.isAddress(address)) {
                transferToken(token.id, address);
                setTransfer(false);
            }
            return [2 /*return*/];
        });
    }); };
    var terminal = react_1.useRef(null);
    var onBuyClick = function (e) {
        e.preventDefault();
        if (terminal.current) {
            var current = terminal.current;
            var boundingRect = current.getBoundingClientRect();
            var width = boundingRect.width, height = boundingRect.height;
            setDimensions({ width: width, height: height });
        }
        onBuy && buyToken(token.id, token.price, order.qty);
    };
    var onGoBack = function (e) {
        e.preventDefault();
        setTransactionDone(false); // reset transaction
        setLoading(false); // reset screen
    };
    var onSaleClick = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!onSale)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, setTokenSale(token.id, ethers_1.utils.parseEther(price), true)];
                case 2:
                    _a.sent();
                    setOnSale(false);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    throw new Error(e_1);
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var minQty = function (e) {
        e.preventDefault();
        var newVal = order.qty - 1;
        var newPrice = tokenPrice * newVal;
        if (newVal >= 1) {
            setOrder(__assign(__assign({}, order), { qty: newVal, productPrice: newPrice }));
        }
    };
    var plusQty = function (e) {
        e.preventDefault();
        var newVal = order.qty + 1;
        var newPrice = tokenPrice * newVal;
        if (newVal <= 10) {
            setOrder(__assign(__assign({}, order), { qty: newVal, productPrice: newPrice }));
        }
    };
    var owner = swr_1["default"](token.id, fetchers_1.fetchOwner).data;
    // const { data } = useSWR(`${METADATA_API}/token/${token.id}`, fetcherMetadata)
    var data = swr_1["default"](utils_1.METADATA_API + "/token/0000000000000000000000000000000000000000000000000000000000000001", fetchers_1.fetcherMetadata).data;
    // transaction
    var _k = state_1.useAppState(react_1.useCallback(function (_a) {
        var setTransaction = _a.setTransaction, setUser = _a.setUser, updateTokensOnSale = _a.updateTokensOnSale;
        return ({
            setTransaction: setTransaction,
            setUser: setUser,
            updateTokensOnSale: updateTokensOnSale
        });
    }, [])), setTransaction = _k.setTransaction, setUser = _k.setUser, updateTokensOnSale = _k.updateTokensOnSale;
    var transactionRef = react_1.useRef(state_1.useAppState.getState().transaction);
    var _l = react_1.useState(false), loading = _l[0], setLoading = _l[1];
    var _m = react_1.useState(false), transactionDone = _m[0], setTransactionDone = _m[1];
    var updateTransaction = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setUser()];
                case 1:
                    _a.sent();
                    setTransaction(undefined);
                    updateTokensOnSale();
                    return [2 /*return*/];
            }
        });
    }); }, [setTransaction, setUser, updateTokensOnSale]);
    react_1.useEffect(function () {
        state_1.useAppState.subscribe(function (_a) {
            var transaction = _a.transaction;
            return __awaiter(void 0, void 0, void 0, function () {
                var receipt, e_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            transactionRef.current = transaction;
                            if (!transaction)
                                return [2 /*return*/];
                            setLoading(true);
                            return [4 /*yield*/, transaction.wait()];
                        case 1:
                            receipt = _b.sent();
                            if (receipt.confirmations >= 1) {
                                updateTransaction();
                                setTransactionDone(true);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_2 = _b.sent();
                            console.log('transaction', e_2);
                            setLoading(false);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        return function () {
            state_1.useAppState.destroy();
        };
    }, [updateTransaction]);
    if (!data)
        return (React.createElement("div", null));
    if (!data.name)
        return null;
    console.log('dimensions', dimensions);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "columns" },
                React.createElement("div", { className: "column is-full" },
                    React.createElement(react_player_1["default"], { url: '/static/cyber_nft.mp4', loop: true, playing: true, muted: true, width: "100%", height: "100%" }))),
            React.createElement("div", { className: "columns", id: "", ref: terminal, style: { minHeight: dimensions.height } },
                React.createElement("div", { className: "column is-12 goMobile " },
                    React.createElement("div", { className: "text-align-center" },
                        React.createElement("div", { className: "headerBlock", style: { display: 'flex', alignItems: 'center' } },
                            React.createElement("div", { style: { width: '100%  ' } },
                                React.createElement("h2", { className: "text-black", style: {
                                        lineHeight: '0', fontFamily: 'Cyber Console'
                                    } },
                                    data.name,
                                    "\u00A0(NFT + Physical)")),
                            React.createElement("div", { className: 'osLink' },
                                React.createElement("a", { target: "_blank", href: "https://testnets.opensea.io/assets/" + (contractDetails === null || contractDetails === void 0 ? void 0 : contractDetails.address) + "/" + token.id, className: "text-cyber" },
                                    React.createElement("img", { src: '/static/os.svg' })))),
                        !loading ?
                            React.createElement("div", null,
                                React.createElement("div", { className: "columns" },
                                    React.createElement("div", { className: "column is-6" },
                                        React.createElement("div", { style: { maxWidth: '58%', margin: '0 auto', marginTop: '6rem', marginBottom: '3rem' } },
                                            React.createElement("img", { className: "cyberAnime", src: "/static/art.png" })),
                                        React.createElement("p", { className: "text-cyber" }),
                                        React.createElement("div", { style: { alignItems: 'center', textAlign: 'center', width: '100%', flexDirection: 'row' } },
                                            React.createElement("p", { className: "text-cyber", style: { display: 'block', fontSize: "2rem", fontWeight: "bold", textTransform: "uppercase", lineHeight: '0', color: 'var(--cyber-color)' } }, "Total supply: 888/888"))),
                                    React.createElement("div", { className: "column is-6 middleContent" },
                                        React.createElement("div", { className: "props" },
                                            config.faqList['en'].map(function (qa, i) { return React.createElement(__1.FAQ, { question: qa.q, answer: qa.a, key: i, index: i, setFaqIdx: setFaqIdx, getFaqIdx: faqIdx }); }),
                                            React.createElement("p", { className: "text-cyber" }, "Loading props\u2026\u2026."),
                                            React.createElement("p", { className: "text-cw" }, ">\u00A0100ml / 3.4oz"),
                                            React.createElement("p", { className: "text-cw" }, ">\u00A0Made in Grasse, France"),
                                            React.createElement("p", { className: "text-cw" }, ">\u00A0Worldwide shipping"),
                                            React.createElement("p", { className: "text-cw" }, ">\u00A0Physical redeemable"),
                                            React.createElement("p", { className: "text-cw" }, ">\u00A0Printed electronics label"),
                                            React.createElement("p", { className: "text-cw" }, ">\u00A0Refillable"),
                                            React.createElement("p", { className: "text-cw" }, ">\u00A0ERC721"),
                                            React.createElement("p", { className: "text-cw" }),
                                            React.createElement("p", { className: "text-cyber" }, "q: How many units to mint?")),
                                        React.createElement("div", { className: "text-align-left" },
                                            React.createElement("div", { className: "checkoutBlock" },
                                                React.createElement("div", { className: "checkoutBlockValue" },
                                                    React.createElement("div", { className: "checkoutQty" },
                                                        React.createElement("a", { href: "#", className: "checkoutQtyMin", onClick: minQty })),
                                                    React.createElement("div", { className: "checkoutQtyVal" },
                                                        React.createElement("input", { readOnly: true, className: "qtyInput", type: "number", value: order.qty, min: "1", max: "10" })),
                                                    React.createElement("div", { className: "checkoutQty " },
                                                        React.createElement("a", { className: "checkoutQtyMax", href: "#", onClick: plusQty })),
                                                    order.qty === 10
                                                        ? React.createElement("div", { className: "checkoutBlockMsg " }, "// Max 10 items per order")
                                                        : null)),
                                            React.createElement("div", null,
                                                React.createElement("span", { style: { color: 'black', fontSize: '12px', fontWeight: 'bold' }, className: "text-black" }, "Price"),
                                                React.createElement("h5", { className: "text-cyber", style: { fontSize: '2rem' } },
                                                    "Total: ",
                                                    ethers_1.constants.EtherSymbol,
                                                    " ",
                                                    order.productPrice.toFixed(2),
                                                    ' ',
                                                    " + gas")),
                                            React.createElement("a", { href: "", className: "btn-preorder btn-preorder--buy", onClick: onBuyClick, style: {} },
                                                React.createElement("span", { className: "btn-preorder__text", "data-text": "MINT NOW" }, "MINT"),
                                                React.createElement("span", { className: "btn-preorder--glitch" })))))) // here
                            :
                                React.createElement("div", { className: "progress columns" },
                                    React.createElement("div", { className: "column is-12 middleContent" },
                                        React.createElement("img", { src: '/static/mint1.png', style: { maxWidth: '500px', margin: '0 auto' } }),
                                        React.createElement("div", { className: "props" },
                                            React.createElement("p", { className: "text-cyber" }, ">\u00A0Minting your scent on the Metaverse "),
                                            React.createElement("p", { className: "text-cyber" },
                                                ">\u00A0Waiting for the transaction to complete ",
                                                transactionDone ? React.createElement("span", { className: "text-cyber" }, "...\u2713") : React.createElement(react_text_spinners_1["default"], { theme: "", className: "text-cyber", backgroundColor: "none", size: '2rem', color: '#0AD469' }),
                                                " "),
                                            transactionDone ?
                                                React.createElement("div", null,
                                                    React.createElement("p", { className: "text-cyber" },
                                                        ">\u00A0MINTED ",
                                                        order.qty,
                                                        " x CYBER EDPs"),
                                                    React.createElement("div", { className: "succesfulMint" },
                                                        React.createElement("p", { className: "text-cyber", style: { textAlign: 'center', marginTop: '3rem', color: '#EFEFC1' } },
                                                            "!\u00A0Succesfully minted ",
                                                            order.qty,
                                                            " x CYBER EDP. Choose next:"),
                                                        React.createElement("div", { className: "columns" },
                                                            React.createElement("div", { className: "column col-6" },
                                                                React.createElement("a", { style: { margin: '0 auto' }, href: "", className: "btn-preorder white btn-preorder--buy", onClick: onGoBack },
                                                                    React.createElement("span", { className: "btn-preorder__text", "data-text": "MINT MORE" }, "MINT MORE"),
                                                                    React.createElement("span", { className: "btn-preorder--glitch" }))),
                                                            React.createElement("div", { className: "column col-6" },
                                                                React.createElement("a", { style: { margin: '0 auto' }, className: "btn-preorder blue btn-preorder--buy", target: "_blank", href: "https://testnets.opensea.io/assets/" + (contractDetails === null || contractDetails === void 0 ? void 0 : contractDetails.address) + "/" + token.id },
                                                                    React.createElement("span", { className: "btn-preorder__text", "data-text": "VIEW ON OPENSEA" }, "VIEW ON OPENSEA"),
                                                                    React.createElement("span", { className: "btn-preorder--glitch" })))))) : ''))))))),
        React.createElement("div", { className: "container cyber-content" },
            React.createElement("div", { className: "columns" },
                React.createElement("div", { className: "column is-full main-title margin-3" },
                    React.createElement("h1", { className: "text-white text-align-center" }, "CYBER EAU DE PARFUM"),
                    React.createElement("h2", { className: "text-align-center text-white" }, "THE SCENT OF THE METAVERSE"),
                    React.createElement("h3", { className: "text-white text-align-center" }, "NFT + Physical 100ML")))),
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12 " },
                    React.createElement("img", { src: '/static/main.jpg' })))),
        React.createElement("div", { className: "container cyber-content margin-3 text-align-center" },
            React.createElement("div", { className: "columns is-mobile is-variable is-3" },
                React.createElement("div", { className: "column is-3 " },
                    React.createElement("img", { className: "logoImg", src: '/static/dezeen.svg' })),
                React.createElement("div", { className: "column is-3 " },
                    React.createElement("img", { className: "logoImg", src: '/static/hs.svg' })),
                React.createElement("div", { className: "column is-3 " },
                    React.createElement("img", { className: "logoImg", src: '/static/th.png' })),
                React.createElement("div", { className: "column is-3 " },
                    React.createElement("img", { className: "logoImg", src: '/static/tmwr.svg' })))),
        React.createElement("div", { className: "block container cyber-content" },
            React.createElement("div", { className: "margin-3" },
                React.createElement("div", { id: "youtube-wrapper" },
                    React.createElement("div", { className: "video", style: {
                            position: "relative",
                            paddingBottom: "56.25%" /* 16:9 */,
                            paddingTop: 25,
                            height: 0
                        } },
                        React.createElement("iframe", { style: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }, src: "https://www.youtube.com/embed/8elAoqrn_ZY", frameBorder: "0" }))))),
        React.createElement("div", { className: "block container cyber-content" },
            React.createElement("h2", { className: "text-align-left text-white" }, "BLINKING IN RED LABEL"),
            React.createElement("div", { className: "columns is-variable is-4" },
                React.createElement("div", { className: "column is-6" },
                    React.createElement("img", { src: "/static/slide7.gif" })),
                React.createElement("div", { className: "column is-6 slideCenterLeft" },
                    React.createElement("p", { className: "text-white textBlockDesc" }, "The scent combines gender-less, metallic, retro, and futuristic elements all in one. CYBER EDP captures the idea of a futurist urban environment. Designed with energy in mind, cyber provides consistent stamina and the feeling of the underground music scene and the intensive gaming experience."),
                    React.createElement("p", { className: "text-white textBlockDesc" }, "CYBER was inspired by sci-fi movies and a world in which technology, AI and advanced scientific innovations are integral part of our daily live."),
                    React.createElement("p", { className: "text-white text-align-left textBlockDesc" }, "Woody notes of cedarwood and sandalwood evoke the fever of a zestful, active lifestyle and the perpetual motion of city life. At its heart it has top signature notes from Grasse, France.")))),
        React.createElement("div", { className: "block container cyber-content" },
            React.createElement("h2", { className: "text-align-left text-white" }, "Scent extracted using NIRS and encoded to live on the blockchain"),
            React.createElement("div", { className: "columns is-variable is-4" },
                React.createElement("div", { className: "column is-6" },
                    React.createElement("img", { src: "/static/nir.gif" })),
                React.createElement("div", { className: "column is-6 slideCenterLeft" },
                    React.createElement("p", { className: "text-white textBlockDesc" }, "The scent combines gender-less, metallic, retro, and futuristic elements all in one. CYBER EDP captures the idea of a futurist urban environment. Designed with energy in mind, cyber provides consistent stamina and the feeling of the underground music scene and the intensive gaming experience."),
                    React.createElement("p", { className: "text-white textBlockDesc" }, "CYBER was inspired by sci-fi movies and a world in which technology, AI and advanced scientific innovations are integral part of our daily live."),
                    React.createElement("p", { className: "text-white text-align-left textBlockDesc" }, "Woody notes of cedarwood and sandalwood evoke the fever of a zestful, active lifestyle and the perpetual motion of city life. At its heart it has top signature notes from Grasse, France.")))),
        React.createElement("div", { className: "block container" },
            React.createElement("div", { className: "cyber-content" },
                React.createElement("h2", { className: "text-white text-align-left" }, "THE FIRST INTERACTIVE FRAGRANCE"),
                React.createElement("h3", { className: "text-grey text-align-left" }, "WITH SUSTAINABLE PRINTED ELECTRONICS")),
            React.createElement("div", { className: "columns" },
                React.createElement("div", { className: "column is-12" },
                    React.createElement(react_player_1["default"], { url: '/static/cyber_expand_desktop.mp4', loop: true, playing: true, muted: true, width: "100%", height: "100%" }))),
            React.createElement("div", { className: "columns is-variable is-1" },
                React.createElement("div", { className: "column is-4" },
                    React.createElement("div", { className: "cyberHolder" },
                        React.createElement("div", { className: 'cyberHolderIcon' },
                            React.createElement("img", { className: "innerIcon", src: "/static/battery.svg" })),
                        React.createElement("div", { className: 'cyberHolderText' },
                            React.createElement("h4", { className: "text-white text-align-left" }, "SELF-POWERED"),
                            React.createElement("p", { className: "textBlockDesc text-grey" }, "The label lasts for 500 interactions")))),
                React.createElement("div", { className: "column is-4" },
                    React.createElement("div", { className: "cyberHolder" },
                        React.createElement("div", { className: 'cyberHolderIcon' },
                            React.createElement("img", { className: "innerIcon", src: "/static/electronics.svg" })),
                        React.createElement("div", { className: 'cyberHolderText' },
                            React.createElement("h4", { className: "text-white text-align-left" }, "PRINTED ELECTRONICS"),
                            React.createElement("p", { className: "textBlockDesc text-grey" }, "Fully printed battery and sensor")))),
                React.createElement("div", { className: "column is-4" },
                    React.createElement("div", { className: "cyberHolder" },
                        React.createElement("div", { className: 'cyberHolderIcon' },
                            React.createElement("img", { className: "innerIcon", src: "/static/recy.svg" })),
                        React.createElement("div", { className: 'cyberHolderText' },
                            React.createElement("h4", { className: "text-white text-align-left" }, "SUSTAINABLE"),
                            React.createElement("p", { className: "textBlockDesc text-grey" }, "Organic and earth disposable OLED lights")))))),
        React.createElement("div", { className: "block container cyber-content" },
            React.createElement("div", { className: "columns margin-6" },
                React.createElement("div", { className: "column is-5" },
                    React.createElement("div", { className: "oflactivePyramid" },
                        React.createElement(react_visibility_sensor_1["default"], { partialVisibility: true }, function (_a) {
                            var isVisible = _a.isVisible;
                            return React.createElement(react_spring_1.Spring, { delay: 0, to: {
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? "translateY(0)" : "translateY(200px)"
                                } }, function (props) {
                                return React.createElement("div", { className: "pyramidPart1" },
                                    React.createElement("img", { className: "pyramidImg", src: "/static/pyramid1.svg" }),
                                    React.createElement("div", { className: "pyramidInnerText" },
                                        React.createElement("div", { className: "pyramidTextHeader" }, "T\u00EAte")));
                            });
                        }),
                        React.createElement(react_visibility_sensor_1["default"], { partialVisibility: true }, function (_a) {
                            var isVisible = _a.isVisible;
                            return React.createElement(react_spring_1.Spring, { delay: 50, to: {
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? "translateY(0)" : "translateY(200px)"
                                } }, function (props) {
                                return React.createElement("div", { className: "pyramidPart2" },
                                    React.createElement("img", { className: "pyramidImg", src: "/static/pyramid2.svg" }),
                                    React.createElement("div", { className: "pyramidInnerText" },
                                        React.createElement("div", { className: "pyramidTextHeader" }, "C\u0153ur")));
                            });
                        }),
                        React.createElement(react_visibility_sensor_1["default"], { partialVisibility: true }, function (_a) {
                            var isVisible = _a.isVisible;
                            return React.createElement(react_spring_1.Spring, { delay: 100, to: {
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? "translateY(0)" : "translateY(200px)"
                                } }, function (props) {
                                return React.createElement("div", { className: "pyramidPart3" },
                                    React.createElement("img", { className: "pyramidImg", src: "/static/pyramid2.svg" }),
                                    React.createElement("div", { className: "pyramidInnerText" },
                                        React.createElement("div", { className: "pyramidTextHeader" }, "Fond")));
                            });
                        }))),
                React.createElement("div", { className: "column keyHoldersPyramide is-7 margin-3" },
                    React.createElement("div", { className: "" },
                        React.createElement(react_visibility_sensor_1["default"], { partialVisibility: true }, function (_a) {
                            var isVisible = _a.isVisible;
                            return React.createElement(react_spring_1.Spring, { delay: 0, to: {
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? "translateY(0)" : "translateY(200px)"
                                } }, function (props) {
                                return React.createElement("div", null,
                                    React.createElement("div", null,
                                        React.createElement("h4", { className: "text-grey text-align-left" }, "HEAD NOTES"),
                                        React.createElement("p", { className: "text-align-left text-white textBlockDesc" }, "Juniper berry, Lemon, Bergamot, Pepper")),
                                    React.createElement("div", null,
                                        React.createElement("h4", { className: "text-grey text-align-left" }, "HEART NOTES"),
                                        React.createElement("p", { className: "text-align-left textBlockDesc text-white " }, "Incense, Iris, Pine Needles")),
                                    React.createElement("div", null,
                                        React.createElement("h4", { className: "text-grey text-align-left" }, "BASE NOTES"),
                                        React.createElement("p", { className: "text-align-left textBlockDesc text-white " }, "Sandalwood, Cedarwood, Amber")));
                            });
                        }))))),
        React.createElement("div", { className: "block container" },
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12 " },
                    React.createElement("img", { src: "/static/2.jpg" })))),
        React.createElement("div", { className: "block container cyber-content" },
            React.createElement("h2", { className: "text-align-left text-white" }, "150 OLD STORY INTO THE METAVERSE"),
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12 padding-1" },
                    React.createElement(react_player_1["default"], { url: '/static/charrier_desktop.mp4', playing: false, width: "100%", height: "100%" })))),
        React.createElement("div", { className: "block container cyber-content smallBlock" },
            React.createElement("h2", { className: "text-align-left text-white" }, "DAO PROJECT TEAM"),
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12 " },
                    React.createElement("div", { style: { maxWidth: '150px', margin: '0 auto' } },
                        React.createElement("img", { src: "/static/j8.png", style: { display: 'block', borderRadius: '100%' } })),
                    React.createElement("h5", { className: "text-grey text-align-center margin-1" }, "Jordan \"J8\""),
                    "className=\"text-grey text-align-left\"            ",
                    React.createElement("p", { className: "textBlockDesc text-white" }, "Award-winning product designer & software engineer with over 15 years of experience in working from crypto startups to managing R&D teams in Forbes 500 companies.Career achievements:"),
                    React.createElement("ul", null,
                        React.createElement("li", { className: "text-grey" }, "German Brand of The Year Award"),
                        React.createElement("li", { className: "text-grey" }, "German Design Award"),
                        React.createElement("li", { className: "text-grey" }, "2 x CES Innovation Awards"),
                        React.createElement("li", { className: "text-grey" }, "2018 Fritz Henkel Innovation Award"),
                        React.createElement("li", { className: "text-grey" }, "Deloitte Most Innovate Project of the Year")))),
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12 " },
                    React.createElement("p", { className: "quote text-align-left text-white" }, "\"We designed an astonishing product in terms of quality and components. We wanted our customers to completely re-discover the perfume experience.\" - Jordan Katzarov, founder"))),
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12 " },
                    React.createElement("div", { style: { maxWidth: '150px', margin: '0 auto' } },
                        React.createElement("img", { src: "/static/sc.svisions.png", style: { display: 'block', borderRadius: '100%' } })),
                    React.createElement("h5", { className: "text-grey text-align-center margin-1" }, "sc.visions"),
                    React.createElement("p", { className: "textBlockDesc text-white" }, "Sean Caruso (SCVisions) creates across the spectrum of digital arts mainly as a 3D artist.His works have been presented internationally at established festivals with notable projects:"),
                    React.createElement("ul", null,
                        React.createElement("li", { className: "text-grey" }, "360\u00B0 remix of Beeple\u2019s film \u201CTransparent Machines\u201D"),
                        React.createElement("li", { className: "text-grey" }, "\u201CCernunnos\u201D, an award winning immersive film exploring CERN\u2019s Large Hadron Collider")))),
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12 " },
                    React.createElement("p", { className: "quote text-align-left text-white" }, "\u201CI was curious about the merging of the physical and digital worlds through blockchain and NFT artwork. I wanted a photorealistic render of the bottle with the illuminated label and the NIR data represented as a colorful spectrogram, contrast to the Gigeresque styled platter.\u201D - Sean Caruso")))),
        React.createElement("div", { className: "block container cyber-content text-align-center" },
            React.createElement("img", { className: "cyberIcons margin-3", src: "/static/sustainability.svg" }),
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12" },
                    React.createElement("div", { className: "smallBlock" },
                        React.createElement("p", { className: "quote text-align-left text-white" }, "The recycle and earth symbols on the label don't come without a purpose. The symbols light up as a reminder to protect our environment and pay attention to dispose responsibly."))))),
        React.createElement("div", { className: "block container cyber-content" },
            React.createElement("h2", { className: "text-align-left text-white" }, "BOTTLE TECHNOLOGY"),
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-6 padding-1" },
                    React.createElement("img", { className: "bottle", src: "/static/bottle.svg" })),
                React.createElement("div", { className: "column is-6 slideCenterLeft" },
                    React.createElement("div", { className: "keyHolders" },
                        React.createElement("h5", { className: "text-grey text-align-left" }, "LIGHT DESIGN"),
                        React.createElement("p", { className: "textBlockDesc text-white" }, "Ultra-light glass packaging is produced with an innovative glass forming technique."),
                        React.createElement("h5", { className: "text-grey text-align-left" }, "REFILLABLE"),
                        React.createElement("p", { className: "textBlockDesc text-white" }, "The bottle is refillable and completely recyclable by waste separation. The mechanical resistance of the bottle is validated according to the most demanding protocols for glass packaging."),
                        React.createElement("h5", { className: "text-grey text-align-left" }, "REDUCED CO2 EMISSIONS"),
                        React.createElement("p", { className: "textBlockDesc text-white" }, "The shape of the bottles is specifically created to minimize glass weight and external volume, making the packaging light, easy to use, and carry in handbags or luggage."))))),
        React.createElement("div", { className: "block container cyber-content" },
            React.createElement("h2", { className: "text-align-center text-white" }, "FAQ"),
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12 " }, config.faqList['en'].map(function (qa, i) { return React.createElement(__1.FAQ, { question: qa.q, answer: qa.a, key: i, index: i, setFaqIdx: setFaqIdx, getFaqIdx: faqIdx }); })))),
        React.createElement("div", { className: "block container cyber-content" },
            React.createElement("div", { className: "columns margin-3" },
                React.createElement("div", { className: "column is-12 " }))),
        React.createElement("style", { jsx: true }, "\n\n.call-to-action-heading {\n    display: -ms-grid;\n    display: grid;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    grid-auto-columns: 1fr;\n    grid-column-gap: 18px;\n    grid-row-gap: 16px;\n    -ms-grid-columns: auto 1fr;\n    grid-template-columns: auto 1fr;\n    -ms-grid-rows: auto;\n    grid-template-rows: auto;\n}\n\n.centered-call-to-action {\n  display: -ms-grid;\n    display: grid;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    grid-auto-columns: 1fr;\n    grid-column-gap: 48px;\n    grid-row-gap: 16px;\n    -ms-grid-columns: auto auto;\n    grid-template-columns: auto auto;\n    -ms-grid-rows: auto;\n    grid-template-rows: auto;\n}\n\n.discord-button {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    /* display: flex; */\n    padding: 14px 32px;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    border-style: solid;\n    border-width: 1px;\n    border-color: #fff;\n    border-radius: 100px;\n    color: #fff;\n    font-size: 12px;\n    font-weight: 400;\n    text-align: center;\n    letter-spacing: 2px;\n    text-decoration: none;\n    text-transform: uppercase;\n}\n\n.spTitle {\n      border-bottom: 1px solid rgb(183, 183, 183);\n    padding-bottom: 16px;\n}\n\n.checkoutBlockValue {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    max-width: 300px;\n    flex: 1;\n}\n\n.checkoutBlockDivider {\n    display: block;\n    height: 1px;\n    // border: 1px solid black;\n    width: 100%;\n    margin-bottom: 2rem;\n}\n\n\n.checkoutText {\n    flex: 1;\n    color: #EFEFC1;\n    text-align: left;\n}\n\n.checkoutQty {\n    // border: 1px solid  #EFEFC1;\n    width: 50px;\n    height: 38px;\n    position: relative;\n}\n\n.checkoutQtyVal {\n    // border-top: 1px solid  #EFEFC1;\n    // border-bottom: 1px solid  #EFEFC1;\n    height: 38px;\n}\n\n.checkoutQtyVal .qtyInput {\n    width: 100%;\n    height: 100%;\n    color: #EFEFC1;\n    background: transparent;\n    outline: 0;\n    border: 0;\n    text-align: center;\n    font-size: 3rem;\n    -webkit-appearance: none;\n    margin: 0;\n    cursor: default;\n    font-family: 'Cyber Console'\n}\n\ninput[type='number'] {\n    -moz-appearance:textfield;\n}\n\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\n\n.checkoutBlockMsg {\n    font-size: 1rem;\n    text-align: left;\n    letter-spacing: 0.2px;\n    margin-top: 1rem;\n        color: white;\n    font-family: 'Cyber Console';\n    text-transform: uppercase;\n}\n\n.checkoutQtyMax::before {\n    content: '+';\n    align-items: center;\n    color: #EFEFC1;\n    position: relative;\n    margin: 0 auto;\n    display: flex;\n    font-size: 4rem;\n    font-family: 'Cyber Console'\n\n}\n\n.checkoutQtyMin, .checkoutQtyMax {\n    display: flex;\n    text-align: center;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n}\n\n.checkoutQtyMin:hover {\n    text-decoration: none;\n}\n\n.checkoutQtyMax:hover {\n    text-decoration: none;\n}\n\n\n.checkoutQtyMin::before {\n    content: '-';\n    align-items: center;\n    color:  #EFEFC1;\n    position: relative;\n    margin: 0 auto;\n    display: block;\n    font-size: 4rem;\n    font-family: 'Cyber Console'\n}\n\n.checkoutBlockText {\n    display: flex;\n    width: 100%;\n    color: var(--cyber-color);\n    align-items: center;\n    justify-content: center;\n    flex-wrap: wrap;\n    text-align: left;\n}\n\n.checkoutBlock {\n    display: flex;\n    width: 100%;\n    flex-wrap: wrap;\n    margin-top: 1rem;\n    margin-bottom: 2rem;\n    align-items: left;\n    justify-content: left;\n}\n\n.checkoutForm headShot {\n    width: 100%;\n}\n\n.logoImg {\n  max-width: 150px;\n  text-align: center;\n  margin: 0 auto;\n}\n\n\n.map {\n    max-width: 45%;\n}\n\n.absolut-title {\n    width: 100%;\n    background: rgb(0,0,0);\n    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);\n    height: 100%;\n    bottom: 10px;\n    position: absolute;\n}\n\n.relativeHolder {\n    position: relative;\n}\n\n.slideCenterLeft {\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n    flex-flow: column;\n}\n\n.imgSmall {\n    max-width: 100%;\n    display: block;\n}\n\n.smallBlock {\n    max-width: 680px;\n    margin:0 auto;\n}\n\n.bgGrey {\n    background-color: #191919;\n}\n\n.layoutBlock {\n    max-width: 940px;\n    margin: 0 auto;\n}\n\n.textBigHolder {\n}\n\n.main-title-white {\n    font-size: 5rem;\n    color: white;\n    text-transform: uppercase;\n    font-weight: 500;\n}\n\n.impressum {\n    font-size: 12px;\n    font-weight: normal;\n    text-tranform: none;\n}\n\n.stateText {\n    display: block;\n    position: relative;\n    bottom:0;\n    left: 0;\n    color: #b7b7b7;\n    font-size: 1.2rem;\n    font-weight: 600 !important;;\n    padding: 1rem;\n    text-align: left;\n    padding-left: 1rem;\n    text-transform: uppercase;\n}\n\n.pointer {\n    cursor: pointer;\n}\n\n.oflactivePyramid {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align; center;\n    position: relative;\n}\n\n.pyrT {\n    display: none;\n}\n\n.title-center {\n    position: absolute;\n    bottom: 0;\n    margin-left: auto;\n    margin-right: auto;\n    left: 0;\n    right: 0;\n}\n\n.pyramidPart1 {\n    width: 48.5%;\n    text-align: center;\n    margin:0 auto;\n    margin-bottom: 0.5rem;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    text-align: center;\n    position: relative;\n}\n\n.pyramidPart2 {\n    width: 69%;\n    margin:0 auto;\n    text-align: center;\n    margin-bottom: 0.5rem;\n    position: relative;\n}\n\n.pyramidPart3 {\n    width: 97.7%;\n    margin:0 auto;\n    text-align: center;\n    position: relative;\n}\n\n.pyramidTextHeader {\n    position: relative;\n    text-align: center;\n    color: #fff\n}\n\n.pyramidTextSubHeader {\n    position: relative;\n    text-align: center;\n    color: #fff;\n}\n\n.pyramidInnerText {\n    height: 110px;\n    width: 110px;\n\n}\n\n.videoPlay {\n    opacity: 1;\n    transition-property: opacity;\n\ttransition-duration: 0.3s;\n\ttransition-timing-function: linear;\n}\n\n\n.hideCover {\n    opacity: 0;\n}\n\n.pyramidPart1 .pyramidInnerText {\n    position: absolute;\n    left: 50%;\n    margin-left: -55px;\n    top: 90%;\n    margin-top: -55px;\n}\n\n.pyramidPart2 .pyramidInnerText {\n    position: absolute;\n    left: 50%;\n    margin-left: -55px;\n    top: 100%;\n    margin-top: -55px;\n}\n\n.pyramidPart3 .pyramidInnerText {\n    position: absolute;\n    left: 50%;\n    margin-left: -55px;\n    top: 80%;\n    margin-top: -55px;\n}\n\n.pyramidImg {\n    position: relative;\n    display: block;\n    height: 100%;\n}\n\n@-webkit-keyframes rotating /* Safari and Chrome */ {\n    from {\n      -webkit-transform: rotate(0deg);\n      -o-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    to {\n      -webkit-transform: rotate(360deg);\n      -o-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @keyframes rotating {\n    from {\n      -ms-transform: rotate(0deg);\n      -moz-transform: rotate(0deg);\n      -webkit-transform: rotate(0deg);\n      -o-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    to {\n      -ms-transform: rotate(360deg);\n      -moz-transform: rotate(360deg);\n      -webkit-transform: rotate(360deg);\n      -o-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  .rotating {\n    -webkit-animation: rotating 50s linear infinite;\n    -moz-animation: rotating 50s linear infinite;\n    -ms-animation: rotating 50s linear infinite;\n    -o-animation: rotating 50s linear infinite;\n    animation: rotating 50s linear infinite;\n  }\n\n.cyberHolder {\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    margin-top: 1rem;\n}\n\n.keyHoldersPyramide {\n    displey: flex;\n    align-items: center;\n    justify-content: left;\n}\n\n\n.cyber-inner-content {\n    margin:0 auto;\n    padding: 1rem;\n}\n\n.signupFormHolder {\n}\n\n@media screen and (max-width: 1000px) {\n    .goMobileColumns {\n        display: block !important;\n    }\n\n    .goMobile {\n        width: 100% !important;\n    }\n}\n\n\n@media screen and (max-width: 768px) {\n\n    .signupFormHolder {\n        position: relative;\n        top: 0;\n        left: 0;\n    }\n\n    .slideCenterLeft {\n        margin-top: 3rem;\n    }\n\n    .cyber-content {\n        width: 87.5%;\n    }\n\n    .cyber-inner-content {\n        width: 87.5%;\n        margin:0 auto;\n        padding: 0;\n        padding-top: 1rem;\n        padding-bottom: 1rem;\n    }\n\n    .stateText {\n        font-size: 1.1rem !important;\n        position: relative;\n        text-align: center;\n        background-color: white;\n    }\n\n    .cyberHolder {\n        // border: 1px solid #666;\n        margin-top: 2rem;\n    }\n\n    .pyramidInnerText {\n        height: 33px;\n        width: 65px;\n    }\n\n    .pyramidPart1 .pyramidInnerText {\n        position: absolute;\n        left: 50%;\n        margin-left: -32.5px;\n        top: auto;\n        bottom: 10%;\n        margin-left: -32.5px;\n    }\n    \n    .pyramidPart2 .pyramidInnerText {\n        position: absolute;\n        left: 50%;\n        margin-left: -55px;\n        top: auto;\n        margin-left: -32.5px;\n        bottom: 10%;\n    }\n    \n    .pyramidPart3 .pyramidInnerText {\n        position: absolute;\n        left: 50%;\n        margin-left: -55px;\n        top: auto;\n        bottom: 10%;\n        margin-left: -32.5px;\n    }\n\n    .pyramidTextHeader {\n        font-size: 1rem;\n    }\n\n    .pyramidTextSubHeader {\n        font-size: 0.5rem;\n    }\n\n    .pyramide-text-holders {\n    }\n\n    .smallTextBlocksTitle {\n        font-size: 1.2rem !important;\n        margin-top: 0.8rem;\n    }\n\n    .main-title-white {\n        font-size: 3rem;\n        color: white;\n        font-weight: 500;\n    }\n\n    .borderDivider-left {\n        border: 0;\n    }\n\n    .blockSubHeader {\n        font-size: 1.5rem !important;\n        line-height: 1.1 !important;\n    }\n    \n    .borderDivider-right {\n        border-right: 0;\n    }\n\n\n    .quote {\n        padding: 0 !important;\n        font-size: 1rem !important;\n    }\n\n    .bottle-claims {\n        text-align: center;\n        font-size: 1.8rem !important;\n    }\n\n}\n\n.borderDivider-top {\n    border-top: 2px solid #666;\n\n}\n\n.borderDivider-left {\n    border-left: 1px solid #191919;\n    position: relative;\n\n}\n\n.borderDivider-right {\n    border-right: 1px solid #191919;\n    position: relative;\n}\n\n.cyberHolderIcon {\n    border-right: 2px solid #666;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 50%;\n}\n\n.cyberHolderTitle {\n    font-size: 1.5rem;\n    color: white;\n    font-weight: 300;\n    display: block;\n}\n\n.cyberHolderSmallText {\n    color: #b7b7b7;\n    display: block;\n    margin-top: 1rem;\n}\n\n.cyberHolderText {\n    text-align: left;\n    padding: 1rem;\n    width: 100%;\n}\n\n.innerIcon {\n    max-width: 33%;\n    display: block;\n    text-align: center;\n    margin: 0 auto;\n}\n\n.bottle-claims {\n    color: #b7b7b7;\n    font-size: 1.2rem;\n    font-weight: 600 !important;;\n    text-align: left;\n    text-transform: uppercase;\n}\n\n.bottle {\n    max-width: 65%;\n}\n\n.textHolder {\n}\n\n\n.button-red {\n    background-color: red;\n    color: black;\n    max-width: 182px;\n    background-color: #ff0000;\n    padding: 1rem;\n    display: block;\n    text-align: center;\n    font-family: 'Gotham';\n    font-size: 14px;\n    font-weight: bold;\n    font-stretch: normal;\n    font-style: normal;\n    line-height: normal;\n    letter-spacing: 2px;\n    text-align: center;\n    color: #000000;\n    margin: 0 auto;\n    margin-top: 1rem;\n}\n\n.popupShow {\n    position: relative;\n    display: none;\n    position: fixed;\n    z-index: 3;\n    width: 100%;\n    height: 100%;\n    right:0;\n    top: 0;\n}\n\n.preorderBar {\n    flex-flow: column;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: black;\n    color: white;\n    font-size: 33px;\n    text-align: center;\n    height: 100%;\n    width: 100%;\n}\n\n.closeBtn {\n    position: relative;\n    top: 0;\n    right: 0;\n    display: block;\n    cursor: pointer;\n    width: 45px;\n    margin: 1rem;\n}\n\n\n                    .main-title {\n                        color: #B7B7B7;\n                    }\n\n                    .padding-right-1 {\n                        padding-right: 1rem !important;\n                    }\n\n                    .padding-1 {\n                        padding: 1rem;\n                    }\n\n                    .outsideText {\n                            font-weight: 900;\n                            font-size: 2rem;\n                            color: #B7B7B7;\n                            display: block;\n                            word-break:break-all;\n                            text-align: left;\n                            margin-bottom: 1rem;\n                    }\n\n\n                    .button-red {\n                        background-color: red;\n                        color: black;\n                        max-width: 200px;\n                        padding: 1rem;\n                        display: block;\n                        text-align: center;\n                        // border: 1px dotted white;\n                    }\n\n                    .headImg {\n                        max-width: 50%;\n                    }\n\n                    .cyberImg {\n                        max-width: 100%;\n                    }\n\n            .main {\n                position: relative;\n                margin-top: 80px;\n            }\n\n            .text {\n                position: absolute;\n                top: -1rem;\n                left: 3rem;\n                text-align: left;\n                z-index: 1;\n            }\n\n            .text h1 {\n                color: white;\n                padding-top: 1rem;\n            }\n           \n            a.button-discover {\n                display: block;\n                margin-top: 3rem;\n                font-size: 2rem;\n                f\u00A7ont-weight: 400;\n            }\n\n "),
        React.createElement("svg", { style: { position: 'absolute', width: '0', height: '0' } },
            React.createElement("defs", null,
                React.createElement("clipPath", { id: "small-image-clip", clipPathUnits: "objectBoundingBox", transform: "scale(0.0027472 0.0064102)" },
                    React.createElement("path", { fillRule: "evenodd", fill: "rgb(99, 255, 203)", d: "M347.014,0.001 L363.999,16.987 L363.999,155.999 L-0.000,155.999 L-0.000,-0.001 L347.014,-0.001 L347.014,0.001 Z" }))))));
};
exports.Token = Token;
