export var DisconnectType;
(function (h4) {
    h4[h4["ACTIVE"] = 1] = "ACTIVE";
    h4[h4["KICKED"] = 2] = "KICKED";
    h4[h4["OFFLINE"] = 3] = "OFFLINE";
})(DisconnectType || (DisconnectType = {}));
export var LoginTraceStep;
(function (g4) {
    g4[g4["loginStart"] = 0] = "loginStart";
    g4[g4["linkStart"] = 1] = "linkStart";
    g4[g4["linkSuccess"] = 2] = "linkSuccess";
    g4[g4["linkFailed"] = 3] = "linkFailed";
    g4[g4["loginSucceed"] = 4] = "loginSucceed";
    g4[g4["loginFailed"] = 5] = "loginFailed";
    g4[g4["loginTimeout"] = 6] = "loginTimeout";
    g4[g4["autoLoginStart"] = 7] = "autoLoginStart";
    g4[g4["autoLoginSucceed"] = 8] = "autoLoginSucceed";
    g4[g4["autoLoginFailed"] = 9] = "autoLoginFailed";
})(LoginTraceStep || (LoginTraceStep = {}));
