! function (t) {
    function i(r) {
        if (e[r]) return e[r].exports;
        var o = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, i), o.l = !0, o.exports
    }
    var e = {};
    i.m = t, i.c = e, i.d = function (t, e, r) {
        i.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, i.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function (t, i) {
        return Object.prototype.hasOwnProperty.call(t, i)
    }, i.p = "", i(i.s = 4)
}([function (t, i, e) {
    "use strict";

    function r() {
        this.live2DModel = null, this.modelMatrix = null, this.eyeBlink = null, this.physics = null, this.pose = null, this.debugMode = !1, this.initialized = !1, this.updating = !1, this.alpha = 1, this.accAlpha = 0, this.lipSync = !1, this.lipSyncValue = 0, this.accelX = 0, this.accelY = 0, this.accelZ = 0, this.dragX = 0, this.dragY = 0, this.startTimeMSec = null, this.mainMotionManager = new h, this.expressionManager = new h, this.motions = {}, this.expressions = {}, this.isTexLoaded = !1
    }

    function o() {
        AMotion.prototype.constructor.call(this), this.paramList = new Array
    }

    function n() {
        this.id = "", this.type = -1, this.value = null
    }

    function s() {
        this.nextBlinkTime = null, this.stateStartTime = null, this.blinkIntervalMsec = null, this.eyeState = g.STATE_FIRST, this.blinkIntervalMsec = 4e3, this.closingMotionMsec = 100, this.closedMotionMsec = 50, this.openingMotionMsec = 150, this.closeIfZero = !0, this.eyeID_L = "PARAM_EYE_L_OPEN", this.eyeID_R = "PARAM_EYE_R_OPEN"
    }

    function _() {
        this.tr = new Float32Array(16), this.identity()
    }

    function a(t, i) {
        _.prototype.constructor.call(this), this.width = t, this.height = i
    }

    function h() {
        MotionQueueManager.prototype.constructor.call(this), this.currentPriority = null, this.reservePriority = null, this.super = MotionQueueManager.prototype
    }

    function l() {
        this.physicsList = new Array, this.startTimeMSec = UtSystem.getUserTimeMSec()
    }

    function $() {
        this.lastTime = 0, this.lastModel = null, this.partsGroups = new Array
    }

    function u(t) {
        this.paramIndex = -1, this.partsIndex = -1, this.link = null, this.id = t
    }

    function p() {
        this.EPSILON = .01, this.faceTargetX = 0, this.faceTargetY = 0, this.faceX = 0, this.faceY = 0, this.faceVX = 0, this.faceVY = 0, this.lastTimeSec = 0
    }

    function f() {
        _.prototype.constructor.call(this), this.screenLeft = null, this.screenRight = null, this.screenTop = null, this.screenBottom = null, this.maxLeft = null, this.maxRight = null, this.maxTop = null, this.maxBottom = null, this.max = Number.MAX_VALUE, this.min = 0
    }

    function c() { }
    var d = 0;
    r.prototype.getModelMatrix = function () {
        return this.modelMatrix
    }, r.prototype.setAlpha = function (t) {
        t > .999 && (t = 1), t < .001 && (t = 0), this.alpha = t
    }, r.prototype.getAlpha = function () {
        return this.alpha
    }, r.prototype.isInitialized = function () {
        return this.initialized
    }, r.prototype.setInitialized = function (t) {
        this.initialized = t
    }, r.prototype.isUpdating = function () {
        return this.updating
    }, r.prototype.setUpdating = function (t) {
        this.updating = t
    }, r.prototype.getLive2DModel = function () {
        return this.live2DModel
    }, r.prototype.setLipSync = function (t) {
        this.lipSync = t
    }, r.prototype.setLipSyncValue = function (t) {
        this.lipSyncValue = t
    }, r.prototype.setAccel = function (t, i, e) {
        this.accelX = t, this.accelY = i, this.accelZ = e
    }, r.prototype.setDrag = function (t, i) {
        this.dragX = t, this.dragY = i
    }, r.prototype.getMainMotionManager = function () {
        return this.mainMotionManager
    }, r.prototype.getExpressionManager = function () {
        return this.expressionManager
    }, r.prototype.loadModelData = function (t, i) {
        var e = c.getPlatformManager();
        this.debugMode && e.log("Load model : " + t);
        var r = this;
        e.loadLive2DModel(t, function (t) {
            if (r.live2DModel = t, r.live2DModel.saveParam(), 0 != Live2D.getError()) return void console.error("Error : Failed to loadModelData().");
            r.modelMatrix = new a(r.live2DModel.getCanvasWidth(), r.live2DModel.getCanvasHeight()), r.modelMatrix.setWidth(2), r.modelMatrix.setCenterPosition(0, 0), i(r.live2DModel)
        })
    }, r.prototype.loadTexture = function (t, i, e) {
        d++;
        var r = c.getPlatformManager();
        this.debugMode && r.log("Load Texture : " + i);
        var o = this;
        r.loadTexture(this.live2DModel, t, i, function () {
            d-- , 0 == d && (o.isTexLoaded = !0), "function" == typeof e && e()
        })
    }, r.prototype.loadMotion = function (t, i, e) {
        var r = c.getPlatformManager();
        this.debugMode && r.log("Load Motion : " + i);
        var o = null,
            n = this;
        r.loadBytes(i, function (i) {
            o = Live2DMotion.loadMotion(i), null != t && (n.motions[t] = o), e(o)
        })
    }, r.prototype.loadExpression = function (t, i, e) {
        var r = c.getPlatformManager();
        this.debugMode && r.log("Load Expression : " + i);
        var n = this;
        r.loadBytes(i, function (i) {
            null != t && (n.expressions[t] = o.loadJson(i)), "function" == typeof e && e()
        })
    }, r.prototype.loadPose = function (t, i) {
        var e = c.getPlatformManager();
        this.debugMode && e.log("Load Pose : " + t);
        var r = this;
        try {
            e.loadBytes(t, function (t) {
                r.pose = $.load(t), "function" == typeof i && i()
            })
        } catch (t) {
            console.warn(t)
        }
    }, r.prototype.loadPhysics = function (t) {
        var i = c.getPlatformManager();
        this.debugMode && i.log("Load Physics : " + t);
        var e = this;
        try {
            i.loadBytes(t, function (t) {
                e.physics = l.load(t)
            })
        } catch (t) {
            console.warn(t)
        }
    }, r.prototype.hitTestSimple = function (t, i, e) {
        if (null === this.live2DModel) return !1;
        var r = this.live2DModel.getDrawDataIndex(t);
        if (r < 0) return !1;
        for (var o = this.live2DModel.getTransformedPoints(r), n = this.live2DModel.getCanvasWidth(), s = 0, _ = this.live2DModel.getCanvasHeight(), a = 0, h = 0; h < o.length; h += 2) {
            var l = o[h],
                $ = o[h + 1];
            l < n && (n = l), l > s && (s = l), $ < _ && (_ = $), $ > a && (a = $)
        }
        var u = this.modelMatrix.invertTransformX(i),
            p = this.modelMatrix.invertTransformY(e);
        return n <= u="" &&="" <="s" _="" p="" },="" r.prototype.hittestsimplecustom="function" (t,="" i,="" e,="" r)="" {="" if="" (t="=" undefined)="" return="" false="" }="" else="" null="" !="=" this.live2dmodel="" (e="">= t[0] && e <= i[0]="" &&="" r="" <="t[1]">= i[1])
        }
    }, o.prototype = new AMotion, o.EXPRESSION_DEFAULT = "DEFAULT", o.TYPE_SET = 0, o.TYPE_ADD = 1, o.TYPE_MULT = 2, o.loadJson = function (t) {
        var i = new o,
            e = c.getPlatformManager(),
            r = e.jsonParseFromBytes(t);
        if (i.setFadeIn(parseInt(r.fade_in) > 0 ? parseInt(r.fade_in) : 1e3), i.setFadeOut(parseInt(r.fade_out) > 0 ? parseInt(r.fade_out) : 1e3), null == r.params) return i;
        var s = r.params,
            _ = s.length;
        i.paramList = [];
        for (var a = 0; a < _; a++) {
            var h = s[a],
                l = h.id.toString(),
                $ = parseFloat(h.val),
                u = o.TYPE_ADD,
                p = null != h.calc ? h.calc.toString() : "add";
            if ((u = "add" === p ? o.TYPE_ADD : "mult" === p ? o.TYPE_MULT : "set" === p ? o.TYPE_SET : o.TYPE_ADD) == o.TYPE_ADD) {
                var f = null == h.def ? 0 : parseFloat(h.def);
                $ -= f
            } else if (u == o.TYPE_MULT) {
                var f = null == h.def ? 1 : parseFloat(h.def);
                0 == f && (f = 1), $ /= f
            }
            var d = new n;
            d.id = l, d.type = u, d.value = $, i.paramList.push(d)
        }
        return i
    }, o.prototype.updateParamExe = function (t, i, e, r) {
        for (var n = this.paramList.length - 1; n >= 0; --n) {
            var s = this.paramList[n];
            s.type == o.TYPE_ADD ? t.addToParamFloat(s.id, s.value, e) : s.type == o.TYPE_MULT ? t.multParamFloat(s.id, s.value, e) : s.type == o.TYPE_SET && t.setParamFloat(s.id, s.value, e)
        }
    }, s.prototype.calcNextBlink = function () {
        return UtSystem.getUserTimeMSec() + Math.random() * (2 * this.blinkIntervalMsec - 1)
    }, s.prototype.setInterval = function (t) {
        this.blinkIntervalMsec = t
    }, s.prototype.setEyeMotion = function (t, i, e) {
        this.closingMotionMsec = t, this.closedMotionMsec = i, this.openingMotionMsec = e
    }, s.prototype.updateParam = function (t) {
        var i, e = UtSystem.getUserTimeMSec(),
            r = 0;
        switch (this.eyeState) {
            case g.STATE_CLOSING:
                r = (e - this.stateStartTime) / this.closingMotionMsec, r >= 1 && (r = 1, this.eyeState = g.STATE_CLOSED, this.stateStartTime = e), i = 1 - r;
                break;
            case g.STATE_CLOSED:
                r = (e - this.stateStartTime) / this.closedMotionMsec, r >= 1 && (this.eyeState = g.STATE_OPENING, this.stateStartTime = e), i = 0;
                break;
            case g.STATE_OPENING:
                r = (e - this.stateStartTime) / this.openingMotionMsec, r >= 1 && (r = 1, this.eyeState = g.STATE_INTERVAL, this.nextBlinkTime = this.calcNextBlink()), i = r;
                break;
            case g.STATE_INTERVAL:
                this.nextBlinkTime < e && (this.eyeState = g.STATE_CLOSING, this.stateStartTime = e), i = 1;
                break;
            case g.STATE_FIRST:
            default:
                this.eyeState = g.STATE_INTERVAL, this.nextBlinkTime = this.calcNextBlink(), i = 1
        }
        this.closeIfZero || (i = -i), t.setParamFloat(this.eyeID_L, i), t.setParamFloat(this.eyeID_R, i)
    };
    var g = function () { };
    g.STATE_FIRST = "STATE_FIRST", g.STATE_INTERVAL = "STATE_INTERVAL", g.STATE_CLOSING = "STATE_CLOSING", g.STATE_CLOSED = "STATE_CLOSED", g.STATE_OPENING = "STATE_OPENING", _.mul = function (t, i, e) {
        var r, o, n, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (r = 0; r < 4; r++)
            for (o = 0; o < 4; o++)
                for (n = 0; n < 4; n++) s[r + 4 * o] += t[r + 4 * n] * i[n + 4 * o];
        for (r = 0; r < 16; r++) e[r] = s[r]
    }, _.prototype.identity = function () {
        for (var t = 0; t < 16; t++) this.tr[t] = t % 5 == 0 ? 1 : 0
    }, _.prototype.getArray = function () {
        return this.tr
    }, _.prototype.getCopyMatrix = function () {
        return new Float32Array(this.tr)
    }, _.prototype.setMatrix = function (t) {
        if (null != this.tr && this.tr.length == this.tr.length)
            for (var i = 0; i < 16; i++) this.tr[i] = t[i]
    }, _.prototype.getScaleX = function () {
        return this.tr[0]
    }, _.prototype.getScaleY = function () {
        return this.tr[5]
    }, _.prototype.transformX = function (t) {
        return this.tr[0] * t + this.tr[12]
    }, _.prototype.transformY = function (t) {
        return this.tr[5] * t + this.tr[13]
    }, _.prototype.invertTransformX = function (t) {
        return (t - this.tr[12]) / this.tr[0]
    }, _.prototype.invertTransformY = function (t) {
        return (t - this.tr[13]) / this.tr[5]
    }, _.prototype.multTranslate = function (t, i) {
        var e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1];
        _.mul(e, this.tr, this.tr)
    }, _.prototype.translate = function (t, i) {
        this.tr[12] = t, this.tr[13] = i
    }, _.prototype.translateX = function (t) {
        this.tr[12] = t
    }, _.prototype.translateY = function (t) {
        this.tr[13] = t
    }, _.prototype.multScale = function (t, i) {
        var e = [t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        _.mul(e, this.tr, this.tr)
    }, _.prototype.scale = function (t, i) {
        this.tr[0] = t, this.tr[5] = i
    }, a.prototype = new _, a.prototype.setPosition = function (t, i) {
        this.translate(t, i)
    }, a.prototype.setCenterPosition = function (t, i) {
        var e = this.width * this.getScaleX(),
            r = this.height * this.getScaleY();
        this.translate(t - e / 2, i - r / 2)
    }, a.prototype.top = function (t) {
        this.setY(t)
    }, a.prototype.bottom = function (t) {
        var i = this.height * this.getScaleY();
        this.translateY(t - i)
    }, a.prototype.left = function (t) {
        this.setX(t)
    }, a.prototype.right = function (t) {
        var i = this.width * this.getScaleX();
        this.translateX(t - i)
    }, a.prototype.centerX = function (t) {
        var i = this.width * this.getScaleX();
        this.translateX(t - i / 2)
    }, a.prototype.centerY = function (t) {
        var i = this.height * this.getScaleY();
        this.translateY(t - i / 2)
    }, a.prototype.setX = function (t) {
        this.translateX(t)
    }, a.prototype.setY = function (t) {
        this.translateY(t)
    }, a.prototype.setHeight = function (t) {
        var i = t / this.height,
            e = -i;
        this.scale(i, e)
    }, a.prototype.setWidth = function (t) {
        var i = t / this.width,
            e = -i;
        this.scale(i, e)
    }, h.prototype = new MotionQueueManager, h.prototype.getCurrentPriority = function () {
        return this.currentPriority
    }, h.prototype.getReservePriority = function () {
        return this.reservePriority
    }, h.prototype.reserveMotion = function (t) {
        return !(this.reservePriority >= t) && (!(this.currentPriority >= t) && (this.reservePriority = t, !0))
    }, h.prototype.setReservePriority = function (t) {
        this.reservePriority = t
    }, h.prototype.updateParam = function (t) {
        var i = MotionQueueManager.prototype.updateParam.call(this, t);
        return this.isFinished() && (this.currentPriority = 0), i
    }, h.prototype.startMotionPrio = function (t, i) {
        return i == this.reservePriority && (this.reservePriority = 0), this.currentPriority = i, this.startMotion(t, !1)
    }, l.load = function (t) {
        for (var i = new l, e = c.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.physics_hair, n = o.length, s = 0; s < n; s++) {
            var _ = o[s],
                a = new PhysicsHair,
                h = _.setup,
                $ = parseFloat(h.length),
                u = parseFloat(h.regist),
                p = parseFloat(h.mass);
            a.setup($, u, p);
            for (var f = _.src, d = f.length, g = 0; g < d; g++) {
                var y = f[g],
                    m = y.id,
                    T = PhysicsHair.Src.SRC_TO_X,
                    P = y.ptype;
                "x" === P ? T = PhysicsHair.Src.SRC_TO_X : "y" === P ? T = PhysicsHair.Src.SRC_TO_Y : "angle" === P ? T = PhysicsHair.Src.SRC_TO_G_ANGLE : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Src");
                var S = parseFloat(y.scale),
                    v = parseFloat(y.weight);
                a.addSrcParam(T, m, S, v)
            }
            for (var L = _.targets, M = L.length, g = 0; g < M; g++) {
                var E = L[g],
                    m = E.id,
                    T = PhysicsHair.Target.TARGET_FROM_ANGLE,
                    P = E.ptype;
                "angle" === P ? T = PhysicsHair.Target.TARGET_FROM_ANGLE : "angle_v" === P ? T = PhysicsHair.Target.TARGET_FROM_ANGLE_V : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Target");
                var S = parseFloat(E.scale),
                    v = parseFloat(E.weight);
                a.addTargetParam(T, m, S, v)
            }
            i.physicsList.push(a)
        }
        return i
    }, l.prototype.updateParam = function (t) {
        for (var i = UtSystem.getUserTimeMSec() - this.startTimeMSec, e = 0; e < this.physicsList.length; e++) this.physicsList[e].update(t, i)
    }, $.load = function (t) {
        for (var i = new $, e = c.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.parts_visible, n = o.length, s = 0; s < n; s++) {
            for (var _ = o[s], a = _.group, h = a.length, l = new Array, p = 0; p < h; p++) {
                var f = a[p],
                    d = new u(f.id);
                if (l[p] = d, null != f.link) {
                    var g = f.link,
                        y = g.length;
                    d.link = new Array;
                    for (var m = 0; m < y; m++) {
                        var T = new u(g[m]);
                        d.link.push(T)
                    }
                }
            }
            i.partsGroups.push(l)
        }
        return i
    }, $.prototype.updateParam = function (t) {
        if (null != t) {
            t != this.lastModel && this.initParam(t), this.lastModel = t;
            var i = UtSystem.getUserTimeMSec(),
                e = 0 == this.lastTime ? 0 : (i - this.lastTime) / 1e3;
            this.lastTime = i, e < 0 && (e = 0);
            for (var r = 0; r < this.partsGroups.length; r++) this.normalizePartsOpacityGroup(t, this.partsGroups[r], e), this.copyOpacityOtherParts(t, this.partsGroups[r])
        }
    }, $.prototype.initParam = function (t) {
        if (null != t)
            for (var i = 0; i < this.partsGroups.length; i++)
                for (var e = this.partsGroups[i], r = 0; r < e.length; r++) {
                    e[r].initIndex(t);
                    var o = e[r].partsIndex,
                        n = e[r].paramIndex;
                    if (!(o < 0)) {
                        var s = 0 != t.getParamFloat(n);
                        if (t.setPartsOpacity(o, s ? 1 : 0), t.setParamFloat(n, s ? 1 : 0), null != e[r].link)
                            for (var _ = 0; _ < e[r].link.length; _++) e[r].link[_].initIndex(t)
                    }
                }
    }, $.prototype.normalizePartsOpacityGroup = function (t, i, e) {
        for (var r = -1, o = 1, n = 0; n < i.length; n++) {
            var s = i[n].partsIndex,
                _ = i[n].paramIndex;
            if (!(s < 0) && 0 != t.getParamFloat(_)) {
                if (r >= 0) break;
                r = n, o = t.getPartsOpacity(s), o += e / .5, o > 1 && (o = 1)
            }
        }
        r < 0 && (r = 0, o = 1);
        for (var n = 0; n < i.length; n++) {
            var s = i[n].partsIndex;
            if (!(s < 0))
                if (r == n) t.setPartsOpacity(s, o);
                else {
                    var a, h = t.getPartsOpacity(s);
                    a = o < .5 ? -.5 * o / .5 + 1 : .5 * (1 - o) / .5;
                    var l = (1 - a) * (1 - o);
                    l > .15 && (a = 1 - .15 / (1 - o)), h > a && (h = a), t.setPartsOpacity(s, h)
                }
        }
    }, $.prototype.copyOpacityOtherParts = function (t, i) {
        for (var e = 0; e < i.length; e++) {
            var r = i[e];
            if (null != r.link && !(r.partsIndex < 0))
                for (var o = t.getPartsOpacity(r.partsIndex), n = 0; n < r.link.length; n++) {
                    var s = r.link[n];
                    s.partsIndex < 0 || t.setPartsOpacity(s.partsIndex, o)
                }
        }
    }, u.prototype.initIndex = function (t) {
        this.paramIndex = t.getParamIndex("VISIBLE:" + this.id), this.partsIndex = t.getPartsDataIndex(PartsDataID.getID(this.id)), t.setParamFloat(this.paramIndex, 1)
    }, p.FRAME_RATE = 30, p.prototype.setPoint = function (t, i) {
        this.faceTargetX = t, this.faceTargetY = i
    }, p.prototype.getX = function () {
        return this.faceX
    }, p.prototype.getY = function () {
        return this.faceY
    }, p.prototype.update = function () {
        var t = 40 / 7.5 / p.FRAME_RATE;
        if (0 == this.lastTimeSec) return void (this.lastTimeSec = UtSystem.getUserTimeMSec());
        var i = UtSystem.getUserTimeMSec(),
            e = (i - this.lastTimeSec) * p.FRAME_RATE / 1e3;
        this.lastTimeSec = i;
        var r = .15 * p.FRAME_RATE,
            o = e * t / r,
            n = this.faceTargetX - this.faceX,
            s = this.faceTargetY - this.faceY;
        if (!(Math.abs(n) <= this.epsilon="" &&="" math.abs(s)="" <="this.EPSILON))" {="" var="" _="Math.sqrt(n" *="" n="" +="" s="" s),="" a="t" _,="" h="t" l="a" -="" this.facevx,="" $="h" this.facevy,="" u="Math.sqrt(l" $);="" (u="" -o="" ||=""> o) && (l *= o / u, $ *= o / u, u = o), this.faceVX += l, this.faceVY += $;
            var f = .5 * (Math.sqrt(o * o + 16 * o * _ - 8 * o * _) - o),
                c = Math.sqrt(this.faceVX * this.faceVX + this.faceVY * this.faceVY);
            c > f && (this.faceVX *= f / c, this.faceVY *= f / c), this.faceX += this.faceVX, this.faceY += this.faceVY
        }
    }, f.prototype = new _, f.prototype.getMaxScale = function () {
        return this.max
    }, f.prototype.getMinScale = function () {
        return this.min
    }, f.prototype.setMaxScale = function (t) {
        this.max = t
    }, f.prototype.setMinScale = function (t) {
        this.min = t
    }, f.prototype.isMaxScale = function () {
        return this.getScaleX() == this.max
    }, f.prototype.isMinScale = function () {
        return this.getScaleX() == this.min
    }, f.prototype.adjustTranslate = function (t, i) {
        this.tr[0] * this.maxLeft + (this.tr[12] + t) > this.screenLeft && (t = this.screenLeft - this.tr[0] * this.maxLeft - this.tr[12]), this.tr[0] * this.maxRight + (this.tr[12] + t) < this.screenRight && (t = this.screenRight - this.tr[0] * this.maxRight - this.tr[12]), this.tr[5] * this.maxTop + (this.tr[13] + i) < this.screenTop && (i = this.screenTop - this.tr[5] * this.maxTop - this.tr[13]), this.tr[5] * this.maxBottom + (this.tr[13] + i) > this.screenBottom && (i = this.screenBottom - this.tr[5] * this.maxBottom - this.tr[13]);
        var e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1];
        _.mul(e, this.tr, this.tr)
    }, f.prototype.adjustScale = function (t, i, e) {
        var r = e * this.tr[0];
        r < this.min ? this.tr[0] > 0 && (e = this.min / this.tr[0]) : r > this.max && this.tr[0] > 0 && (e = this.max / this.tr[0]);
        var o = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1],
            n = [e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            s = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -t, -i, 0, 1];
        _.mul(s, this.tr, this.tr), _.mul(n, this.tr, this.tr), _.mul(o, this.tr, this.tr)
    }, f.prototype.setScreenRect = function (t, i, e, r) {
        this.screenLeft = t, this.screenRight = i, this.screenTop = r, this.screenBottom = e
    }, f.prototype.setMaxScreenRect = function (t, i, e, r) {
        this.maxLeft = t, this.maxRight = i, this.maxTop = r, this.maxBottom = e
    }, f.prototype.getScreenLeft = function () {
        return this.screenLeft
    }, f.prototype.getScreenRight = function () {
        return this.screenRight
    }, f.prototype.getScreenBottom = function () {
        return this.screenBottom
    }, f.prototype.getScreenTop = function () {
        return this.screenTop
    }, f.prototype.getMaxLeft = function () {
        return this.maxLeft
    }, f.prototype.getMaxRight = function () {
        return this.maxRight
    }, f.prototype.getMaxBottom = function () {
        return this.maxBottom
    }, f.prototype.getMaxTop = function () {
        return this.maxTop
    }, c.platformManager = null, c.getPlatformManager = function () {
        return c.platformManager
    }, c.setPlatformManager = function (t) {
        c.platformManager = t
    }, t.exports = {
        L2DTargetPoint: p,
        Live2DFramework: c,
        L2DViewMatrix: f,
        L2DPose: $,
        L2DPartsParam: u,
        L2DPhysics: l,
        L2DMotionManager: h,
        L2DModelMatrix: a,
        L2DMatrix44: _,
        EYE_STATE: g,
        L2DEyeBlink: s,
        L2DExpressionParam: n,
        L2DExpressionMotion: o,
        L2DBaseModel: r
    }
}, function (t, i, e) {
    "use strict";
    var r = {
        DEBUG_LOG: !1,
        DEBUG_MOUSE_LOG: !1,
        DEBUG_DRAW_HIT_AREA: !1,
        DEBUG_DRAW_ALPHA_MODEL: !1,
        VIEW_MAX_SCALE: 2,
        VIEW_MIN_SCALE: .8,
        VIEW_LOGICAL_LEFT: -1,
        VIEW_LOGICAL_RIGHT: 1,
        VIEW_LOGICAL_MAX_LEFT: -2,
        VIEW_LOGICAL_MAX_RIGHT: 2,
        VIEW_LOGICAL_MAX_BOTTOM: -2,
        VIEW_LOGICAL_MAX_TOP: 2,
        PRIORITY_NONE: 0,
        PRIORITY_IDLE: 1,
        PRIORITY_SLEEPY: 2,
        PRIORITY_NORMAL: 3,
        PRIORITY_FORCE: 4,
        MOTION_GROUP_IDLE: "idle",
        MOTION_GROUP_SLEEPY: "sleepy",
        MOTION_GROUP_TAP_BODY: "tap_body",
        MOTION_GROUP_FLICK_HEAD: "flick_head",
        MOTION_GROUP_PINCH_IN: "pinch_in",
        MOTION_GROUP_PINCH_OUT: "pinch_out",
        MOTION_GROUP_SHAKE: "shake",
        HIT_AREA_HEAD: "head",
        HIT_AREA_BODY: "body"
    };
    t.exports = r
}, function (t, i, e) {
    "use strict";

    function r(t) {
        n = t
    }

    function o() {
        return n
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }), i.setContext = r, i.getContext = o;
    var n = void 0
}, function (t, i, e) {
    "use strict";

    function r() { }
    r.matrixStack = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], r.depth = 0, r.currentMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], r.tmp = new Array(16), r.reset = function () {
        this.depth = 0
    }, r.loadIdentity = function () {
        for (var t = 0; t < 16; t++) this.currentMatrix[t] = t % 5 == 0 ? 1 : 0
    }, r.push = function () {
        var t = (this.depth, 16 * (this.depth + 1));
        this.matrixStack.length < t + 16 && (this.matrixStack.length = t + 16);
        for (var i = 0; i < 16; i++) this.matrixStack[t + i] = this.currentMatrix[i];
        this.depth++
    }, r.pop = function () {
        --this.depth < 0 && (myError("Invalid matrix stack."), this.depth = 0);
        for (var t = 16 * this.depth, i = 0; i < 16; i++) this.currentMatrix[i] = this.matrixStack[t + i]
    }, r.getMatrix = function () {
        return this.currentMatrix
    }, r.multMatrix = function (t) {
        var i, e, r;
        for (i = 0; i < 16; i++) this.tmp[i] = 0;
        for (i = 0; i < 4; i++)
            for (e = 0; e < 4; e++)
                for (r = 0; r < 4; r++) this.tmp[i + 4 * e] += this.currentMatrix[i + 4 * r] * t[r + 4 * e];
        for (i = 0; i < 16; i++) this.currentMatrix[i] = this.tmp[i]
    }, t.exports = r
}, function (t, i, e) {
    t.exports = e(5)
}, function (t, i, e) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }

    function o(t) {
        C = document.getElementById(t), C.addEventListener && (window.addEventListener("click", g), window.addEventListener("mousedown", g), window.addEventListener("mousemove", g), window.addEventListener("mouseup", g), document.addEventListener("mouseout", g), window.addEventListener("touchstart", y), window.addEventListener("touchend", y), window.addEventListener("touchmove", y))
    }

    function n(t) {
        var i = C.width,
            e = C.height;
        N = new M.L2DTargetPoint;
        var r = e / i,
            o = w.default.VIEW_LOGICAL_LEFT,
            n = w.default.VIEW_LOGICAL_RIGHT,
            _ = -r,
            h = r;
        if (window.Live2D.captureFrame = !1, B = new M.L2DViewMatrix, B.setScreenRect(o, n, _, h), B.setMaxScreenRect(w.default.VIEW_LOGICAL_MAX_LEFT, w.default.VIEW_LOGICAL_MAX_RIGHT, w.default.VIEW_LOGICAL_MAX_BOTTOM, w.default.VIEW_LOGICAL_MAX_TOP), B.setMaxScale(w.default.VIEW_MAX_SCALE), B.setMinScale(w.default.VIEW_MIN_SCALE), U = new M.L2DMatrix44, U.multScale(1, i / e), G = new M.L2DMatrix44, G.multTranslate(-i / 2, -e / 2), G.multScale(2 / i, -2 / i), F = v(), (0, D.setContext)(F), !F) return console.error("Failed to create WebGL context."), void (window.WebGLRenderingContext && console.error("Your browser don't support WebGL, check https://get.webgl.org/ for futher information."));
        window.Live2D.setGL(F), F.clearColor(0, 0, 0, 0), a(t), s()
    }

    function s() {
        b || (b = !0, function t() {
            _();
            var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            if (window.Live2D.captureFrame) {
                window.Live2D.captureFrame = !1;
                var e = document.createElement("a");
                document.body.appendChild(e), e.setAttribute("type", "hidden"), e.href = C.toDataURL(), e.download = window.Live2D.captureName || "live2d.png", e.click()
            }
            i(t, C)
        }())
    }

    function _() {
        O.default.reset(), O.default.loadIdentity(), N.update(), R.setDrag(N.getX(), N.getY()), F.clear(F.COLOR_BUFFER_BIT), O.default.multMatrix(U.getArray()), O.default.multMatrix(B.getArray()), O.default.push();
        for (var t = 0; t < R.numModels(); t++) {
            var i = R.getModel(t);
            if (null == i) return;
            i.initialized && !i.updating && (i.update(), i.draw(F))
        }
        O.default.pop()
    }

    function a(t) {
        R.reloadFlg = !0, R.count++ , R.changeModel(F, t)
    }

    function h(t, i) {
        return t.x * i.x + t.y * i.y
    }

    function l(t, i) {
        var e = Math.sqrt(t * t + i * i);
        return {
            x: t / e,
            y: i / e
        }
    }

    function $(t, i, e) {
        function r(t, i) {
            return 180 * Math.acos(h({
                x: 0,
                y: 1
            }, l(t, i))) / Math.PI
        }
        if (i.x < e.left + e.width && i.y < e.top + e.height && i.x > e.left && i.y > e.top) return i;
        var o = t.x - i.x,
            n = t.y - i.y,
            s = r(o, n);
        i.x < t.x && (s = 360 - s);
        var _ = 360 - r(e.left - t.x, -1 * (e.top - t.y)),
            a = 360 - r(e.left - t.x, -1 * (e.top + e.height - t.y)),
            $ = r(e.left + e.width - t.x, -1 * (e.top - t.y)),
            u = r(e.left + e.width - t.x, -1 * (e.top + e.height - t.y)),
            p = n / o,
            f = {};
        if (s < $) {
            var c = e.top - t.y,
                d = c / p;
            f = {
                y: t.y + c,
                x: t.x + d
            }
        } else if (s < u) {
            var g = e.left + e.width - t.x,
                y = g * p;
            f = {
                y: t.y + y,
                x: t.x + g
            }
        } else if (s < a) {
            var m = e.top + e.height - t.y,
                T = m / p;
            f = {
                y: t.y + m,
                x: t.x + T
            }
        } else if (s < _) {
            var P = t.x - e.left,
                S = P * p;
            f = {
                y: t.y - S,
                x: t.x - P
            }
        } else {
            var v = e.top - t.y,
                L = v / p;
            f = {
                y: t.y + v,
                x: t.x + L
            }
        }
        return f
    }

    function u(t) {
        Y = !0;
        var i = C.getBoundingClientRect(),
            e = P(t.clientX - i.left),
            r = S(t.clientY - i.top),
            o = $({
                x: i.left + i.width / 2,
                y: i.top + i.height * X
            }, {
                    x: t.clientX,
                    y: t.clientY
                }, i),
            n = m(o.x - i.left),
            s = T(o.y - i.top);
        w.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), k = e, V = r, N.setPoint(n, s)
    }

    function p(t) {
        Y = !0;
        var i = C.getBoundingClientRect(),
            e = P(t.clientX - i.left),
            r = S(t.clientY - i.top),
            o = $({
                x: i.left + i.width / 2,
                y: i.top + i.height * X
            }, {
                    x: t.clientX,
                    y: t.clientY
                }, i),
            n = m(o.x - i.left),
            s = T(o.y - i.top);
        w.default.DEBUG_MOUSE_LOG && console.log("onMouseDown device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), k = e, V = r, R.tapEvent(n, s)
    }

    function f(t) {
        var i = C.getBoundingClientRect(),
            e = P(t.clientX - i.left),
            r = S(t.clientY - i.top),
            o = $({
                x: i.left + i.width / 2,
                y: i.top + i.height * X
            }, {
                    x: t.clientX,
                    y: t.clientY
                }, i),
            n = m(o.x - i.left),
            s = T(o.y - i.top);
        w.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), Y && (k = e, V = r, N.setPoint(n, s))
    }

    function c() {
        Y && (Y = !1), N.setPoint(0, 0)
    }

    function d() {
        w.default.DEBUG_LOG && console.log("Set Session Storage."), sessionStorage.setItem("Sleepy", "1")
    }

    function g(t) {
        if ("mousewheel" == t.type);
        else if ("mousedown" == t.type) p(t);
        else if ("mousemove" == t.type) {
            var i = sessionStorage.getItem("Sleepy");
            "1" === i && sessionStorage.setItem("Sleepy", "0"), u(t)
        } else if ("mouseup" == t.type) {
            if ("button" in t && 0 != t.button) return
        } else if ("mouseout" == t.type) {
            w.default.DEBUG_LOG && console.log("Mouse out Window."), c();
            var e = sessionStorage.getItem("SleepyTimer");
            window.clearTimeout(e), e = window.setTimeout(d, 5e4), sessionStorage.setItem("SleepyTimer", e)
        }
    }

    function y(t) {
        var i = t.touches[0];
        "touchstart" == t.type ? 1 == t.touches.length && u(i) : "touchmove" == t.type ? f(i) : "touchend" == t.type && c()
    }

    function m(t) {
        var i = G.transformX(t);
        return B.invertTransformX(i)
    }

    function T(t) {
        var i = G.transformY(t);
        return B.invertTransformY(i)
    }

    function P(t) {
        return G.transformX(t)
    }

    function S(t) {
        return G.transformY(t)
    }

    function v() {
        for (var t = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], i = 0; i < t.length; i++) try {
            var e = C.getContext(t[i], {
                premultipliedAlpha: !0
            });
            if (e) return e
        } catch (t) { }
        return null
    }

    function L(t, i, e) {
        X = void 0 === e ? .5 : e, o(t), n(i)
    }
    e(6);
    var M = e(0),
        E = e(8),
        A = r(E),
        I = e(1),
        w = r(I),
        x = e(3),
        O = r(x),
        D = e(2),
        R = (window.navigator.platform.toLowerCase(), new A.default),
        b = !1,
        F = null,
        C = null,
        N = null,
        B = null,
        U = null,
        G = null,
        Y = !1,
        k = 0,
        V = 0,
        X = .5;
    window.loadlive2d = L
}, function (t, i, e) {
    "use strict";
    (function (t) {
        ! function () {
            function i() {
                At || (this._$MT = null, this._$5S = null, this._$NP = 0, i._$42++ , this._$5S = new Y(this))
            }

            function e(t) {
                if (!At) {
                    this.clipContextList = new Array, this.glcontext = t.gl, this.dp_webgl = t, this.curFrameNo = 0, this.firstError_clipInNotUpdate = !0, this.colorBuffer = 0, this.isInitGLFBFunc = !1, this.tmpBoundsOnModel = new S, at.glContext.length > at.frameBuffers.length && (this.curFrameNo = this.getMaskRenderTexture()), this.tmpModelToViewMatrix = new R, this.tmpMatrix2 = new R, this.tmpMatrixForMask = new R, this.tmpMatrixForDraw = new R, this.CHANNEL_COLORS = new Array;
                    var i = new A;
                    i = new A, i.r = 0, i.g = 0, i.b = 0, i.a = 1, this.CHANNEL_COLORS.push(i), i = new A, i.r = 1, i.g = 0, i.b = 0, i.a = 0, this.CHANNEL_COLORS.push(i), i = new A, i.r = 0, i.g = 1, i.b = 0, i.a = 0, this.CHANNEL_COLORS.push(i), i = new A, i.r = 0, i.g = 0, i.b = 1, i.a = 0, this.CHANNEL_COLORS.push(i);
                    for (var e = 0; e < this.CHANNEL_COLORS.length; e++) this.dp_webgl.setChannelFlagAsColor(e, this.CHANNEL_COLORS[e])
                }
            }

            function r(t, i, e) {
                this.clipIDList = new Array, this.clipIDList = e, this.clippingMaskDrawIndexList = new Array;
                for (var r = 0; r < e.length; r++) this.clippingMaskDrawIndexList.push(i.getDrawDataIndex(e[r]));
                this.clippedDrawContextList = new Array, this.isUsing = !0, this.layoutChannelNo = 0, this.layoutBounds = new S, this.allClippedDrawRect = new S, this.matrixForMask = new Float32Array(16), this.matrixForDraw = new Float32Array(16), this.owner = t
            }

            function o(t, i) {
                this._$gP = t, this.drawDataIndex = i
            }

            function n() {
                At || (this.color = null)
            }

            function s() {
                At || (this._$dP = null, this._$eo = null, this._$V0 = null, this._$dP = 1e3, this._$eo = 1e3, this._$V0 = 1, this._$a0())
            }

            function _() { }

            function a() {
                this._$r = null, this._$0S = null
            }

            function h() {
                At || (this.x = null, this.y = null, this.width = null, this.height = null)
            }

            function l(t) {
                At || et.prototype.constructor.call(this, t)
            }

            function $() { }

            function u(t) {
                At || et.prototype.constructor.call(this, t)
            }

            function p() {
                At || (this._$vo = null, this._$F2 = null, this._$ao = 400, this._$1S = 400, p._$42++)
            }

            function f() {
                At || (this.p1 = new c, this.p2 = new c, this._$Fo = 0, this._$Db = 0, this._$L2 = 0, this._$M2 = 0, this._$ks = 0, this._$9b = 0, this._$iP = 0, this._$iT = 0, this._$lL = new Array, this._$qP = new Array, this.setup(.3, .5, .1))
            }

            function c() {
                this._$p = 1, this.x = 0, this.y = 0, this.vx = 0, this.vy = 0, this.ax = 0, this.ay = 0, this.fx = 0, this.fy = 0, this._$s0 = 0, this._$70 = 0, this._$7L = 0, this._$HL = 0
            }

            function d(t, i, e) {
                this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = t, this.scale = i, this._$V0 = e
            }

            function g(t, i, e, r) {
                d.prototype.constructor.call(this, i, e, r), this._$tL = null, this._$tL = t
            }

            function y(t, i, e) {
                this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = t, this.scale = i, this._$V0 = e
            }

            function T(t, i, e, r) {
                y.prototype.constructor.call(this, i, e, r), this._$YP = null, this._$YP = t
            }

            function P() {
                At || (this._$fL = 0, this._$gL = 0, this._$B0 = 1, this._$z0 = 1, this._$qT = 0, this.reflectX = !1, this.reflectY = !1)
            }

            function S() {
                At || (this.x = null, this.y = null, this.width = null, this.height = null)
            }

            function v() { }

            function L() {
                At || (this.x = null, this.y = null)
            }

            function M() {
                At || (this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null, this.clipID = null, this.clipIDList = new Array)
            }

            function E() {
                At || (this._$Eb = E._$ps, this._$lT = 1, this._$C0 = 1, this._$tT = 1, this._$WL = 1, this.culling = !1, this.matrix4x4 = new Float32Array(16), this.premultipliedAlpha = !1, this.anisotropy = 0, this.clippingProcess = E.CLIPPING_PROCESS_NONE, this.clipBufPre_clipContextMask = null, this.clipBufPre_clipContextDraw = null, this.CHANNEL_COLORS = new Array)
            }

            function A() {
                At || (this.a = 1, this.r = 1, this.g = 1, this.b = 1, this.scale = 1, this._$ho = 1, this.blendMode = at.L2D_COLOR_BLEND_MODE_MULT)
            }

            function I() {
                At || (this._$kP = null, this._$dr = null, this._$Ai = !0, this._$mS = null)
            }

            function w() { }

            function x() {
                At || (this._$VP = 0, this._$wL = null, this._$GP = null, this._$8o = x._$ds, this._$2r = -1, this._$O2 = 0, this._$ri = 0)
            }

            function O() { }

            function D() {
                At || (this._$Ob = null)
            }

            function R() {
                this.m = new Float32Array(16), this.identity()
            }

            function b(t) {
                At || et.prototype.constructor.call(this, t)
            }

            function F() {
                At || (this._$7 = 1, this._$f = 0, this._$H = 0, this._$g = 1, this._$k = 0, this._$w = 0, this._$hi = STATE_IDENTITY, this._$Z = _$pS)
            }

            function C() {
                At || (s.prototype.constructor.call(this), this.motions = new Array, this._$7r = null, this._$7r = C._$Co++ , this._$D0 = 30, this._$yT = 0, this._$E = !0, this.loopFadeIn = !0, this._$AS = -1, _$a0())
            }

            function N() {
                this._$P = new Float32Array(100), this.size = 0
            }

            function B() {
                this._$4P = null, this._$I0 = null, this._$RP = null
            }

            function U() { }

            function G() { }

            function Y(t) {
                At || (this._$QT = !0, this._$co = -1, this._$qo = 0, this._$pb = new Array(Y._$is), this._$_2 = new Float32Array(Y._$is), this._$vr = new Float32Array(Y._$is), this._$Rr = new Float32Array(Y._$is), this._$Or = new Float32Array(Y._$is), this._$fs = new Float32Array(Y._$is), this._$Js = new Array(Y._$is), this._$3S = new Array, this._$aS = new Array, this._$Bo = null, this._$F2 = new Array, this._$db = new Array, this._$8b = new Array, this._$Hr = new Array, this._$Ws = null, this._$Vs = null, this._$Er = null, this._$Es = new Int16Array(U._$Qb), this._$ZP = new Float32Array(2 * U._$1r), this._$Ri = t, this._$b0 = Y._$HP++ , this.clipManager = null, this.dp_webgl = null)
            }

            function k() { }

            function V() {
                At || (this._$12 = null, this._$bb = null, this._$_L = null, this._$jo = null, this._$iL = null, this._$0L = null, this._$Br = null, this._$Dr = null, this._$Cb = null, this._$mr = null, this._$_L = wt.STATE_FIRST, this._$Br = 4e3, this._$Dr = 100, this._$Cb = 50, this._$mr = 150, this._$jo = !0, this._$iL = "PARAM_EYE_L_OPEN", this._$0L = "PARAM_EYE_R_OPEN")
            }

            function X() {
                At || (E.prototype.constructor.call(this), this._$sb = new Int32Array(X._$As), this._$U2 = new Array, this.transform = null, this.gl = null, null == X._$NT && (X._$NT = X._$9r(256), X._$vS = X._$9r(256), X._$no = X._$vb(256)))
            }

            function z() {
                At || (I.prototype.constructor.call(this), this._$GS = null, this._$Y0 = null)
            }

            function H(t) {
                _t.prototype.constructor.call(this, t), this._$8r = I._$ur, this._$Yr = null, this._$Wr = null
            }

            function W() {
                At || (M.prototype.constructor.call(this), this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null)
            }

            function j() {
                At || (this._$NL = null, this._$3S = null, this._$aS = null, j._$42++)
            }

            function q() {
                At || (i.prototype.constructor.call(this), this._$zo = new X)
            }

            function J() {
                At || (s.prototype.constructor.call(this), this.motions = new Array, this._$o2 = null, this._$7r = J._$Co++ , this._$D0 = 30, this._$yT = 0, this._$E = !1, this.loopFadeIn = !0, this._$rr = -1, this._$eP = 0)
            }

            function Q(t, i) {
                return String.fromCharCode(t.getUint8(i))
            }

            function N() {
                this._$P = new Float32Array(100), this.size = 0
            }

            function B() {
                this._$4P = null, this._$I0 = null, this._$RP = null
            }

            function Z() {
                At || (I.prototype.constructor.call(this), this._$o = 0, this._$A = 0, this._$GS = null, this._$Eo = null)
            }

            function K(t) {
                _t.prototype.constructor.call(this, t), this._$8r = I._$ur, this._$Cr = null, this._$hr = null
            }

            function tt() {
                At || (this.visible = !0, this._$g0 = !1, this._$NL = null, this._$3S = null, this._$aS = null, tt._$42++)
            }

            function it(t) {
                this._$VS = null, this._$e0 = null, this._$e0 = t
            }

            function et(t) {
                At || (this.id = t)
            }

            function rt() { }

            function ot() {
                At || (this._$4S = null)
            }

            function nt(t, i) {
                this.canvas = t, this.context = i, this.viewport = new Array(0, 0, t.width, t.height), this._$6r = 1, this._$xP = 0, this._$3r = 1, this._$uP = 0, this._$Qo = -1, this.cacheImages = {}
            }

            function st() {
                At || (this._$TT = null, this._$LT = null, this._$FS = null, this._$wL = null)
            }

            function _t(t) {
                At || (this._$e0 = null, this._$IP = null, this._$JS = !1, this._$AT = !0, this._$e0 = t, this.totalScale = 1, this._$7s = 1, this.totalOpacity = 1)
            }

            function at() { }

            function ht() { }

            function lt(t) {
                At || (this._$ib = t)
            }

            function $t() {
                At || (W.prototype.constructor.call(this), this._$LP = -1, this._$d0 = 0, this._$Yo = 0, this._$JP = null, this._$5P = null, this._$BP = null, this._$Eo = null, this._$Qi = null, this._$6s = $t._$ms, this.culling = !0, this.gl_cacheImage = null, this.instanceNo = $t._$42++)
            }

            function ut(t) {
                Mt.prototype.constructor.call(this, t), this._$8r = W._$ur, this._$Cr = null, this._$hr = null
            }

            function pt() {
                At || (this.x = null, this.y = null)
            }

            function ft(t) {
                At || (i.prototype.constructor.call(this), this.drawParamWebGL = new mt(t), this.drawParamWebGL.setGL(at.getGL(t)))
            }

            function ct() {
                At || (this.motions = null, this._$eb = !1, this.motions = new Array)
            }

            function dt() {
                this._$w0 = null, this._$AT = !0, this._$9L = !1, this._$z2 = -1, this._$bs = -1, this._$Do = -1, this._$sr = null, this._$sr = dt._$Gs++
            }

            function gt() {
                this.m = new Array(1, 0, 0, 0, 1, 0, 0, 0, 1)
            }

            function yt(t) {
                At || et.prototype.constructor.call(this, t)
            }

            function mt(t) {
                At || (E.prototype.constructor.call(this), this.textures = new Array, this.transform = null, this.gl = null, this.glno = t, this.firstDraw = !0, this.anisotropyExt = null, this.maxAnisotropy = 0, this._$As = 32, this._$Gr = !1, this._$NT = null, this._$vS = null, this._$no = null, this.vertShader = null, this.fragShader = null, this.vertShaderOff = null, this.fragShaderOff = null)
            }

            function Tt(t, i, e) {
                return null == i && (i = t.createBuffer()), t.bindBuffer(t.ARRAY_BUFFER, i), t.bufferData(t.ARRAY_BUFFER, e, t.DYNAMIC_DRAW), i
            }

            function Pt(t, i, e) {
                return null == i && (i = t.createBuffer()), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, i), t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.DYNAMIC_DRAW), i
            }

            function St(t) {
                At || (this._$P = new Int8Array(8), this._$R0 = new DataView(this._$P.buffer), this._$3i = new Int8Array(1e3), this._$hL = 0, this._$v0 = 0, this._$S2 = 0, this._$Ko = new Array, this._$T = t, this._$F = 0)
            }

            function vt() { }

            function Lt() { }

            function Mt(t) {
                At || (this._$e0 = null, this._$IP = null, this._$Us = null, this._$7s = null, this._$IS = [!1], this._$VS = null, this._$AT = !0, this.baseOpacity = 1, this.clipBufPre_clipContext = null, this._$e0 = t)
            }

            function Et() { }
            var At = !0;
            i._$0s = 1, i._$4s = 2, i._$42 = 0, i._$62 = function (t, e) {
                try {
                    if (e instanceof ArrayBuffer && (e = new DataView(e)), !(e instanceof DataView)) throw new lt("_$SS#loadModel(b) / b _$x be DataView or ArrayBuffer");
                    var r, o = new St(e),
                        n = o._$ST(),
                        s = o._$ST(),
                        a = o._$ST();
                    if (109 != n || 111 != s || 99 != a) throw new lt("_$gi _$C _$li , _$Q0 _$P0.");
                    if (r = o._$ST(), o._$gr(r), r > G._$T7) {
                        t._$NP |= i._$4s;
                        throw new lt("_$gi _$C _$li , _$n0 _$_ version _$li ( SDK : " + G._$T7 + " < _$f0 : " + r + " )@_$SS#loadModel()\n")
                    }
                    var h = o._$nP();
                    if (r >= G._$s7) {
                        var l = o._$9T(),
                            $ = o._$9T();
                        if (-30584 != l || -30584 != $) throw t._$NP |= i._$0s, new lt("_$gi _$C _$li , _$0 _$6 _$Ui.")
                    }
                    t._$KS(h);
                    var u = t.getModelContext();
                    u.setDrawParam(t.getDrawParam()), u.init()
                } catch (t) {
                    _._$Rb(t)
                }
            }, i.prototype._$KS = function (t) {
                this._$MT = t
            }, i.prototype.getModelImpl = function () {
                return null == this._$MT && (this._$MT = new p, this._$MT._$zP()), this._$MT
            }, i.prototype.getCanvasWidth = function () {
                return null == this._$MT ? 0 : this._$MT.getCanvasWidth()
            }, i.prototype.getCanvasHeight = function () {
                return null == this._$MT ? 0 : this._$MT.getCanvasHeight()
            }, i.prototype.getParamFloat = function (t) {
                return "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), this._$5S.getParamFloat(t)
            }, i.prototype.setParamFloat = function (t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), arguments.length < 3 && (e = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 - e) + i * e)
            }, i.prototype.addToParamFloat = function (t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), arguments.length < 3 && (e = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) + i * e)
            }, i.prototype.multParamFloat = function (t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), arguments.length < 3 && (e = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 + (i - 1) * e))
            }, i.prototype.getParamIndex = function (t) {
                return this._$5S.getParamIndex(u.getID(t))
            }, i.prototype.loadParam = function () {
                this._$5S.loadParam()
            }, i.prototype.saveParam = function () {
                this._$5S.saveParam()
            }, i.prototype.init = function () {
                this._$5S.init()
            }, i.prototype.update = function () {
                this._$5S.update()
            }, i.prototype._$Rs = function () {
                return _._$li("_$60 _$PT _$Rs()"), -1
            }, i.prototype._$Ds = function (t) {
                _._$li("_$60 _$PT _$SS#_$Ds() \n")
            }, i.prototype._$K2 = function () { }, i.prototype.draw = function () { }, i.prototype.getModelContext = function () {
                return this._$5S
            }, i.prototype._$s2 = function () {
                return this._$NP
            }, i.prototype._$P7 = function (t, i, e, r) {
                var o = -1,
                    n = 0,
                    s = this;
                if (0 != e)
                    if (1 == t.length) {
                        var _ = t[0],
                            a = 0 != s.getParamFloat(_),
                            h = i[0],
                            l = s.getPartsOpacity(h),
                            $ = e / r;
                        a ? (l += $) > 1 && (l = 1) : (l -= $) < 0 && (l = 0), s.setPartsOpacity(h, l)
                    } else {
                        for (var u = 0; u < t.length; u++) {
                            var _ = t[u],
                                p = 0 != s.getParamFloat(_);
                            if (p) {
                                if (o >= 0) break;
                                o = u;
                                var h = i[u];
                                n = s.getPartsOpacity(h), n += e / r, n > 1 && (n = 1)
                            }
                        }
                        o < 0 && (console.log("No _$wi _$q0/ _$U default[%s]", t[0]), o = 0, n = 1, s.loadParam(), s.setParamFloat(t[o], n), s.saveParam());
                        for (var u = 0; u < t.length; u++) {
                            var h = i[u];
                            if (o == u) s.setPartsOpacity(h, n);
                            else {
                                var f, c = s.getPartsOpacity(h);
                                f = n < .5 ? -.5 * n / .5 + 1 : .5 * (1 - n) / .5;
                                var d = (1 - f) * (1 - n);
                                d > .15 && (f = 1 - .15 / (1 - n)), c > f && (c = f), s.setPartsOpacity(h, c)
                            }
                        }
                    }
                else
                    for (var u = 0; u < t.length; u++) {
                        var _ = t[u],
                            h = i[u],
                            p = 0 != s.getParamFloat(_);
                        s.setPartsOpacity(h, p ? 1 : 0)
                    }
            }, i.prototype.setPartsOpacity = function (t, i) {
                "number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))), this._$5S.setPartsOpacity(t, i)
            }, i.prototype.getPartsDataIndex = function (t) {
                return t instanceof l || (t = l.getID(t)), this._$5S.getPartsDataIndex(t)
            }, i.prototype.getPartsOpacity = function (t) {
                return "number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))), t < 0 ? 0 : this._$5S.getPartsOpacity(t)
            }, i.prototype.getDrawParam = function () { }, i.prototype.getDrawDataIndex = function (t) {
                return this._$5S.getDrawDataIndex(b.getID(t))
            }, i.prototype.getDrawData = function (t) {
                return this._$5S.getDrawData(t)
            }, i.prototype.getTransformedPoints = function (t) {
                var i = this._$5S._$C2(t);
                return i instanceof ut ? i.getTransformedPoints() : null
            }, i.prototype.getIndexArray = function (t) {
                if (t < 0 || t >= this._$5S._$aS.length) return null;
                var i = this._$5S._$aS[t];
                return null != i && i.getType() == W._$wb && i instanceof $t ? i.getIndexArray() : null
            }, e.CHANNEL_COUNT = 4, e.RENDER_TEXTURE_USE_MIPMAP = !1, e.NOT_USED_FRAME = -100, e.prototype._$L7 = function () {
                if (this.tmpModelToViewMatrix && (this.tmpModelToViewMatrix = null), this.tmpMatrix2 && (this.tmpMatrix2 = null), this.tmpMatrixForMask && (this.tmpMatrixForMask = null), this.tmpMatrixForDraw && (this.tmpMatrixForDraw = null), this.tmpBoundsOnModel && (this.tmpBoundsOnModel = null), this.CHANNEL_COLORS) {
                    for (var t = this.CHANNEL_COLORS.length - 1; t >= 0; --t) this.CHANNEL_COLORS.splice(t, 1);
                    this.CHANNEL_COLORS = []
                }
                this.releaseShader()
            }, e.prototype.releaseShader = function () {
                for (var t = at.frameBuffers.length, i = 0; i < t; i++) this.gl.deleteFramebuffer(at.frameBuffers[i].framebuffer);
                at.frameBuffers = [], at.glContext = []
            }, e.prototype.init = function (t, i, e) {
                for (var o = 0; o < i.length; o++) {
                    var n = i[o].getClipIDList();
                    if (null != n) {
                        var s = this.findSameClip(n);
                        null == s && (s = new r(this, t, n), this.clipContextList.push(s));
                        var _ = i[o].getDrawDataID(),
                            a = t.getDrawDataIndex(_);
                        s.addClippedDrawData(_, a);
                        e[o].clipBufPre_clipContext = s
                    }
                }
            }, e.prototype.getMaskRenderTexture = function () {
                var t = null;
                return t = this.dp_webgl.createFramebuffer(), at.frameBuffers[this.dp_webgl.glno] = t, this.dp_webgl.glno
            }, e.prototype.setupClip = function (t, i) {
                for (var e = 0, r = 0; r < this.clipContextList.length; r++) {
                    var o = this.clipContextList[r];
                    this.calcClippedDrawTotalBounds(t, o), o.isUsing && e++
                }
                if (e > 0) {
                    var n = i.gl.getParameter(i.gl.FRAMEBUFFER_BINDING),
                        s = new Array(4);
                    s[0] = 0, s[1] = 0, s[2] = i.gl.canvas.width, s[3] = i.gl.canvas.height, i.gl.viewport(0, 0, at.clippingMaskBufferSize, at.clippingMaskBufferSize), this.setupLayoutBounds(e), i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, at.frameBuffers[this.curFrameNo].framebuffer), i.gl.clearColor(0, 0, 0, 0), i.gl.clear(i.gl.COLOR_BUFFER_BIT);
                    for (var r = 0; r < this.clipContextList.length; r++) {
                        var o = this.clipContextList[r],
                            _ = o.allClippedDrawRect,
                            a = (o.layoutChannelNo, o.layoutBounds);
                        this.tmpBoundsOnModel._$jL(_), this.tmpBoundsOnModel.expand(.05 * _.width, .05 * _.height);
                        var h = a.width / this.tmpBoundsOnModel.width,
                            l = a.height / this.tmpBoundsOnModel.height;
                        this.tmpMatrix2.identity(), this.tmpMatrix2.translate(-1, -1, 0), this.tmpMatrix2.scale(2, 2, 1), this.tmpMatrix2.translate(a.x, a.y, 0), this.tmpMatrix2.scale(h, l, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForMask.setMatrix(this.tmpMatrix2.m), this.tmpMatrix2.identity(), this.tmpMatrix2.translate(a.x, a.y, 0), this.tmpMatrix2.scale(h, l, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForDraw.setMatrix(this.tmpMatrix2.m);
                        for (var $ = this.tmpMatrixForMask.getArray(), u = 0; u < 16; u++) o.matrixForMask[u] = $[u];
                        for (var p = this.tmpMatrixForDraw.getArray(), u = 0; u < 16; u++) o.matrixForDraw[u] = p[u];
                        for (var f = o.clippingMaskDrawIndexList.length, c = 0; c < f; c++) {
                            var d = o.clippingMaskDrawIndexList[c],
                                g = t.getDrawData(d),
                                y = t._$C2(d);
                            i.setClipBufPre_clipContextForMask(o), g.draw(i, t, y)
                        }
                    }
                    i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, n), i.setClipBufPre_clipContextForMask(null), i.gl.viewport(s[0], s[1], s[2], s[3])
                }
            }, e.prototype.getColorBuffer = function () {
                return this.colorBuffer
            }, e.prototype.findSameClip = function (t) {
                for (var i = 0; i < this.clipContextList.length; i++) {
                    var e = this.clipContextList[i],
                        r = e.clipIDList.length;
                    if (r == t.length) {
                        for (var o = 0, n = 0; n < r; n++)
                            for (var s = e.clipIDList[n], _ = 0; _ < r; _++)
                                if (t[_] == s) {
                                    o++;
                                    break
                                }
                        if (o == r) return e
                    }
                }
                return null
            }, e.prototype.calcClippedDrawTotalBounds = function (t, i) {
                for (var e = t._$Ri.getModelImpl().getCanvasWidth(), r = t._$Ri.getModelImpl().getCanvasHeight(), o = e > r ? e : r, n = o, s = o, _ = 0, a = 0, h = i.clippedDrawContextList.length, l = 0; l < h; l++) {
                    var $ = i.clippedDrawContextList[l],
                        u = $.drawDataIndex,
                        p = t._$C2(u);
                    if (p._$yo()) {
                        for (var f = p.getTransformedPoints(), c = f.length, d = [], g = [], y = 0, m = U._$i2; m < c; m += U._$No) d[y] = f[m], g[y] = f[m + 1], y++;
                        var T = Math.min.apply(null, d),
                            P = Math.min.apply(null, g),
                            S = Math.max.apply(null, d),
                            v = Math.max.apply(null, g);
                        T < n && (n = T), P < s && (s = P), S > _ && (_ = S), v > a && (a = v)
                    }
                }
                if (n == o) i.allClippedDrawRect.x = 0, i.allClippedDrawRect.y = 0, i.allClippedDrawRect.width = 0, i.allClippedDrawRect.height = 0, i.isUsing = !1;
                else {
                    var L = _ - n,
                        M = a - s;
                    i.allClippedDrawRect.x = n, i.allClippedDrawRect.y = s, i.allClippedDrawRect.width = L, i.allClippedDrawRect.height = M, i.isUsing = !0
                }
            }, e.prototype.setupLayoutBounds = function (t) {
                var i = t / e.CHANNEL_COUNT,
                    r = t % e.CHANNEL_COUNT;
                i = ~~i, r = ~~r;
                for (var o = 0, n = 0; n < e.CHANNEL_COUNT; n++) {
                    var s = i + (n < r ? 1 : 0);
                    if (0 == s);
                    else if (1 == s) {
                        var a = this.clipContextList[o++];
                        a.layoutChannelNo = n, a.layoutBounds.x = 0, a.layoutBounds.y = 0, a.layoutBounds.width = 1, a.layoutBounds.height = 1
                    } else if (2 == s)
                        for (var h = 0; h < s; h++) {
                            var l = h % 2,
                                $ = 0;
                            l = ~~l;
                            var a = this.clipContextList[o++];
                            a.layoutChannelNo = n, a.layoutBounds.x = .5 * l, a.layoutBounds.y = 0, a.layoutBounds.width = .5, a.layoutBounds.height = 1
                        } else if (s <= 1="" 2="" 3="" 6="" 4)="" for="" (var="" h="0;" <="" s;="" h++)="" {="" var="" l="h" %="" 2,="" $="h" 2;="" a="this.clipContextList[o++];" a.layoutchannelno="n," a.layoutbounds.x=".5" *="" l,="" a.layoutbounds.y=".5" $,="" a.layoutbounds.width=".5," a.layoutbounds.height=".5" }="" else="" if="" (s="" 3,="" 3;="" _._$li("_$6="" _$0p="" mask="" count="" :="" %d",="" s)="" },="" r.prototype.addclippeddrawdata="function" (t,="" i)="" e="new" o(t,="" i);="" this.clippeddrawcontextlist.push(e)="" s._$jt="function" i,="" e)="" r="t" o="e" n="o," s="1" -="" (1="" o)="" o),="" _="1" n)="" n),="" +="" (n="" (2="" 3)="" n))="" s),="" (o="" o))="" _),="" 0,="" u="3" 0;="" (r="" return="">= 1) return 1;
                var p = r,
                    f = p * p;
                return l * (p * f) + $ * f + u * p + 0
            }, s.prototype._$a0 = function () { }, s.prototype.setFadeIn = function (t) {
                this._$dP = t
            }, s.prototype.setFadeOut = function (t) {
                this._$eo = t
            }, s.prototype._$pT = function (t) {
                this._$V0 = t
            }, s.prototype.getFadeOut = function () {
                return this._$eo
            }, s.prototype._$4T = function () {
                return this._$eo
            }, s.prototype._$mT = function () {
                return this._$V0
            }, s.prototype.getDurationMSec = function () {
                return -1
            }, s.prototype.getLoopDurationMSec = function () {
                return -1
            }, s.prototype.updateParam = function (t, i) {
                if (i._$AT && !i._$9L) {
                    var e = w.getUserTimeMSec();
                    if (i._$z2 < 0) {
                        i._$z2 = e, i._$bs = e;
                        var r = this.getDurationMSec();
                        i._$Do < 0 && (i._$Do = r <= 0="" 1="" ?="" -1="" :="" i._$z2="" +="" r)="" }="" var="" o="this._$V0;" *="" (0="=" this._$dp="" ht._$r2((e="" -="" i._$bs)="" this._$dp))="" this._$eo="" ||="" i._$do="" <="" ht._$r2((i._$do="" e)="" this._$eo)),="" &&="" console.log("###="" assert!!="" ###="" "),="" this.updateparamexe(t,="" e,="" o,="" i),=""> 0 && i._$Do < e && (i._$9L = !0)
                }
            }, s.prototype.updateParamExe = function (t, i, e, r) { }, _._$8s = 0, _._$fT = new Object, _.start = function (t) {
                var i = _._$fT[t];
                null == i && (i = new a, i._$r = t, _._$fT[t] = i), i._$0S = w.getSystemTimeMSec()
            }, _.dump = function (t) {
                var i = _._$fT[t];
                if (null != i) {
                    var e = w.getSystemTimeMSec(),
                        r = e - i._$0S;
                    return console.log(t + " : " + r + "ms"), r
                }
                return -1
            }, _.end = function (t) {
                var i = _._$fT[t];
                if (null != i) {
                    return w.getSystemTimeMSec() - i._$0S
                }
                return -1
            }, _._$li = function (t, i) {
                console.log("_$li : " + t + "\n", i)
            }, _._$Ji = function (t, i) {
                console.log(t, i)
            }, _._$dL = function (t, i) {
                console.log(t, i), console.log("\n")
            }, _._$KL = function (t, i) {
                for (var e = 0; e < i; e++) e % 16 == 0 && e > 0 ? console.log("\n") : e % 8 == 0 && e > 0 && console.log("  "), console.log("%02X ", 255 & t[e]);
                console.log("\n")
            }, _._$nr = function (t, i, e) {
                console.log("%s\n", t);
                for (var r = i.length, o = 0; o < r; ++o) console.log("%5d", i[o]), console.log("%s\n", e), console.log(",");
                console.log("\n")
            }, _._$Rb = function (t) {
                console.log("dump exception : " + t), console.log("stack :: " + t.stack)
            }, h.prototype._$8P = function () {
                return .5 * (this.x + this.x + this.width)
            }, h.prototype._$6P = function () {
                return .5 * (this.y + this.y + this.height)
            }, h.prototype._$EL = function () {
                return this.x + this.width
            }, h.prototype._$5T = function () {
                return this.y + this.height
            }, h.prototype._$jL = function (t, i, e, r) {
                this.x = t, this.y = i, this.width = e, this.height = r
            }, h.prototype._$jL = function (t) {
                this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
            }, l.prototype = new et, l._$tP = new Object, l._$27 = function () {
                l._$tP.clear()
            }, l.getID = function (t) {
                var i = l._$tP[t];
                return null == i && (i = new l(t), l._$tP[t] = i), i
            }, l.prototype._$3s = function () {
                return new l
            }, u.prototype = new et, u._$tP = new Object, u._$27 = function () {
                u._$tP.clear()
            }, u.getID = function (t) {
                var i = u._$tP[t];
                return null == i && (i = new u(t), u._$tP[t] = i), i
            }, u.prototype._$3s = function () {
                return new u
            }, p._$42 = 0, p.prototype._$zP = function () {
                null == this._$vo && (this._$vo = new ot), null == this._$F2 && (this._$F2 = new Array)
            }, p.prototype.getCanvasWidth = function () {
                return this._$ao
            }, p.prototype.getCanvasHeight = function () {
                return this._$1S
            }, p.prototype._$F0 = function (t) {
                this._$vo = t._$nP(), this._$F2 = t._$nP(), this._$ao = t._$6L(), this._$1S = t._$6L()
            }, p.prototype._$6S = function (t) {
                this._$F2.push(t)
            }, p.prototype._$Xr = function () {
                return this._$F2
            }, p.prototype._$E2 = function () {
                return this._$vo
            }, f.prototype.setup = function (t, i, e) {
                this._$ks = this._$Yb(), this.p2._$xT(), 3 == arguments.length && (this._$Fo = t, this._$L2 = i, this.p1._$p = e, this.p2._$p = e, this.p2.y = t, this.setup())
            }, f.prototype.getPhysicsPoint1 = function () {
                return this.p1
            }, f.prototype.getPhysicsPoint2 = function () {
                return this.p2
            }, f.prototype._$qr = function () {
                return this._$Db
            }, f.prototype._$pr = function (t) {
                this._$Db = t
            }, f.prototype._$5r = function () {
                return this._$M2
            }, f.prototype._$Cs = function () {
                return this._$9b
            }, f.prototype._$Yb = function () {
                return -180 * Math.atan2(this.p1.x - this.p2.x, -(this.p1.y - this.p2.y)) / Math.PI
            }, f.prototype.addSrcParam = function (t, i, e, r) {
                var o = new g(t, i, e, r);
                this._$lL.push(o)
            }, f.prototype.addTargetParam = function (t, i, e, r) {
                var o = new T(t, i, e, r);
                this._$qP.push(o)
            }, f.prototype.update = function (t, i) {
                if (0 == this._$iP) return this._$iP = this._$iT = i, void (this._$Fo = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y)));
                var e = (i - this._$iT) / 1e3;
                if (0 != e) {
                    for (var r = this._$lL.length - 1; r >= 0; --r) {
                        this._$lL[r]._$oP(t, this)
                    }
                    this._$oo(t, e), this._$M2 = this._$Yb(), this._$9b = (this._$M2 - this._$ks) / e, this._$ks = this._$M2
                }
                for (var r = this._$qP.length - 1; r >= 0; --r) {
                    this._$qP[r]._$YS(t, this)
                }
                this._$iT = i
            }, f.prototype._$oo = function (t, i) {
                i < .033 && (i = .033);
                var e = 1 / i;
                this.p1.vx = (this.p1.x - this.p1._$s0) * e, this.p1.vy = (this.p1.y - this.p1._$70) * e, this.p1.ax = (this.p1.vx - this.p1._$7L) * e, this.p1.ay = (this.p1.vy - this.p1._$HL) * e, this.p1.fx = this.p1.ax * this.p1._$p, this.p1.fy = this.p1.ay * this.p1._$p, this.p1._$xT();
                var r, o, n = -Math.atan2(this.p1.y - this.p2.y, this.p1.x - this.p2.x),
                    s = Math.cos(n),
                    _ = Math.sin(n),
                    a = 9.8 * this.p2._$p,
                    h = this._$Db * Lt._$bS,
                    l = a * Math.cos(n - h);
                r = l * _, o = l * s;
                var $ = -this.p1.fx * _ * _,
                    u = -this.p1.fy * _ * s,
                    p = -this.p2.vx * this._$L2,
                    f = -this.p2.vy * this._$L2;
                this.p2.fx = r + $ + p, this.p2.fy = o + u + f, this.p2.ax = this.p2.fx / this.p2._$p, this.p2.ay = this.p2.fy / this.p2._$p, this.p2.vx += this.p2.ax * i, this.p2.vy += this.p2.ay * i, this.p2.x += this.p2.vx * i, this.p2.y += this.p2.vy * i;
                var c = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
                this.p2.x = this.p1.x + this._$Fo * (this.p2.x - this.p1.x) / c, this.p2.y = this.p1.y + this._$Fo * (this.p2.y - this.p1.y) / c, this.p2.vx = (this.p2.x - this.p2._$s0) * e, this.p2.vy = (this.p2.y - this.p2._$70) * e, this.p2._$xT()
            }, c.prototype._$xT = function () {
                this._$s0 = this.x, this._$70 = this.y, this._$7L = this.vx, this._$HL = this.vy
            }, d.prototype._$oP = function (t, i) { }, g.prototype = new d, g.prototype._$oP = function (t, i) {
                var e = this.scale * t.getParamFloat(this._$wL),
                    r = i.getPhysicsPoint1();
                switch (this._$tL) {
                    default:
                    case f.Src.SRC_TO_X:
                        r.x = r.x + (e - r.x) * this._$V0;
                        break;
                    case f.Src.SRC_TO_Y:
                        r.y = r.y + (e - r.y) * this._$V0;
                        break;
                    case f.Src.SRC_TO_G_ANGLE:
                        var o = i._$qr(); o += (e - o) * this._$V0,
                            i._$pr(o)
                }
            }, y.prototype._$YS = function (t, i) { }, T.prototype = new y, T.prototype._$YS = function (t, i) {
                switch (this._$YP) {
                    default:
                    case f.Target.TARGET_FROM_ANGLE:
                        t.setParamFloat(this._$wL, this.scale * i._$5r(), this._$V0);
                        break;
                    case f.Target.TARGET_FROM_ANGLE_V:
                        t.setParamFloat(this._$wL, this.scale * i._$Cs(), this._$V0)
                }
            }, f.Src = function () { }, f.Src.SRC_TO_X = "SRC_TO_X", f.Src.SRC_TO_Y = "SRC_TO_Y", f.Src.SRC_TO_G_ANGLE = "SRC_TO_G_ANGLE", f.Target = function () { }, f.Target.TARGET_FROM_ANGLE = "TARGET_FROM_ANGLE", f.Target.TARGET_FROM_ANGLE_V = "TARGET_FROM_ANGLE_V", P.prototype.init = function (t) {
                this._$fL = t._$fL, this._$gL = t._$gL, this._$B0 = t._$B0, this._$z0 = t._$z0, this._$qT = t._$qT, this.reflectX = t.reflectX, this.reflectY = t.reflectY
            }, P.prototype._$F0 = function (t) {
                this._$fL = t._$_T(), this._$gL = t._$_T(), this._$B0 = t._$_T(), this._$z0 = t._$_T(), this._$qT = t._$_T(), t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this.reflectX = t._$po(), this.reflectY = t._$po())
            }, P.prototype._$e = function () { };
            var It = function () { };
            It._$ni = function (t, i, e, r, o, n, s, _, a) {
                var h = s * n - _ * o;
                if (0 == h) return null;
                var l, $ = ((t - e) * n - (i - r) * o) / h;
                return l = 0 != o ? (t - e - $ * s) / o : (i - r - $ * _) / n, isNaN(l) && (l = (t - e - $ * s) / o, isNaN(l) && (l = (i - r - $ * _) / n), isNaN(l) && (console.log("a is NaN @UtVector#_$ni() "), console.log("v1x : " + o), console.log("v1x != 0 ? " + (0 != o)))), null == a ? new Array(l, $) : (a[0] = l, a[1] = $, a)
            }, S.prototype._$8P = function () {
                return this.x + .5 * this.width
            }, S.prototype._$6P = function () {
                return this.y + .5 * this.height
            }, S.prototype._$EL = function () {
                return this.x + this.width
            }, S.prototype._$5T = function () {
                return this.y + this.height
            }, S.prototype._$jL = function (t, i, e, r) {
                this.x = t, this.y = i, this.width = e, this.height = r
            }, S.prototype._$jL = function (t) {
                this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
            }, S.prototype.contains = function (t, i) {
                return this.x <= 0="" 1="" 2="=" this.x="" &&="" this.y="" <="this.y" +="" this.width="" this.height="" },="" s.prototype.expand="function" (t,="" i)="" {="" -="t," *="" t,="" i="" v._$z2="function" i,="" e,="" r)="" var="" o="i._$Q2(t," e),="" n="t._$vs()," s="t._$Tr();" if="" (i._$zr(n,="" s,="" o),="" return="" r[n[0]];="" (1="=" o)="" _="r[n[0]]," a="r[n[1]]," h="s[0];" (a="" _)="" |="" }="" (2="=" l="r[n[2]]," $="r[n[3]]," u="s[1]," p="_" 0,="" f="l" ($="" l)="" 0;="" (f="" p)="" (3="=" c="r[n[0]]," d="r[n[1]]," g="r[n[2]]," y="r[n[3]]," m="r[n[4]]," t="r[n[5]]," v="s[2]," (d="" c)="" (y="" g)="" (t="" m)="" (s="" (4="=" e="r[n[2]]," w="r[n[5]]," x="r[n[6]]," r="r[n[9]]," b="r[n[10]]," (m="" e)="" (w="" (o="" x)="" (r="" d)="" b)="" (n="" (u="" for="" (var="" <<="" o,="" k="new" float32array(y),="" y;="" v++)="" z="1," o;="" h++)="" %="" ?="" s[h]="" :="" s[h],="" =="" 2;="" k[v]="z" j="0;" j++)="" w[j]="r[n[j]];" q="0," w[j];="" .5="" v._$br="function" u)="" (_="" h)="" (l="" ((1="" (p="" (c="" h))="" (g="" (v="" s)="" (e="" (i="" h)))="" (x="" (b="" float32array(u),="" u;="" y++)="" x++)="" s[x]="" s[x],="" g[y]="V" z[h]="r[n[H]];" z[h];="" v._$vr="function" r,="" n,="" i._$zr(h,="" l,="" a);="" w._$jt(f,="" $);="" else="" $;)="" n[u]="f[c++]," n[u="" 1]="f[c++]," a)="" g,="" d[c]="" ++c,="" p,="" y,="" f[c]="" m[c]="" t[c],="" c,="" a[c]="" i[c]="" x[c]="" o[c]="" r[c]="" b[c]="" f[c],="" tt="o[h[8]]," it="o[h[9]]," et="o[h[10]]," rt="o[h[11]]," ot="o[h[12]]," nt="o[h[13]]," st="o[h[14]]," _t="o[h[15]]," at="l[3]," ht="1" at,="" lt="ht" $t="ht" ut="ht" pt="ht" ft="ht" ct="ht" dt="ht" gt="ht" yt="at" mt="at" vt="at" h[c]="" w[c]="" j[c]="" q[c]="" z[c]="" k[c]="" tt[c]="" it[c]="" et[c]="" rt[c]="" ot[c]="" nt[c]="" st[c]="" _t[c],="" a,="" float32array(et),="" et;="" it++)="" wt="It," xt="1," a;="" ot++)="" l[ot]="" l[ot],="" at[it]="xt" rt++)="" dt[rt]="o[h[Rt]];" bt="0," 1,="" dt[rt][c],="" dt[rt][ct];="" l.prototype._$ht="function" (t)="" m._$ur="-2," m._$es="500," m._$wb="2," m._$8s="3," m._$52="M._$ES," m._$r2="M._$ES," m._$or="function" ()="" m._$pr="function" m.prototype.convertclipidforv2_11="function" null="=" t.length="" ,="" .test(t)="" (i.push(t.id),="" m.prototype._$f0="function" this._$gp="t._$nP()," this._$dr="t._$nP()," this._$gs="t._$nP()," this._$qb="t._$6L()," this._$lb="t._$cS()," this._$ms="t._$Tb()," t.getformatversion()="">= G._$T7 ? (this.clipID = t._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = [], this._$MS(this._$Lb)
            }, M.prototype.getClipIDList = function () {
                return this.clipIDList
            }, M.prototype.init = function (t) { }, M.prototype._$Nr = function (t, i) {
                if (i._$IS[0] = !1, i._$Us = v._$Z2(t, this._$GS, i._$IS, this._$Lb), at._$Zs);
                else if (i._$IS[0]) return;
                i._$7s = v._$br(t, this._$GS, i._$IS, this._$mS)
            }, M.prototype._$2b = function (t, i) { }, M.prototype.getDrawDataID = function () {
                return this._$gP
            }, M.prototype._$j2 = function (t) {
                this._$gP = t
            }, M.prototype.getOpacity = function (t, i) {
                return i._$7s
            }, M.prototype._$zS = function (t, i) {
                return i._$Us
            }, M.prototype._$MS = function (t) {
                for (var i = t.length - 1; i >= 0; --i) {
                    var e = t[i];
                    e < M._$52 ? M._$52 = e : e > M._$R2 && (M._$R2 = e)
                }
            }, M.prototype.getTargetBaseDataID = function () {
                return this._$dr
            }, M.prototype._$gs = function (t) {
                this._$dr = t
            }, M.prototype._$32 = function () {
                return null != this._$dr && this._$dr != yt._$2o()
            }, M.prototype.preDraw = function (t, i, e) { }, M.prototype.draw = function (t, i, e) { }, M.prototype.getType = function () { }, M.prototype._$B2 = function (t, i, e) { }, E._$ps = 32, E.CLIPPING_PROCESS_NONE = 0, E.CLIPPING_PROCESS_OVERWRITE_ALPHA = 1, E.CLIPPING_PROCESS_MULTIPLY_ALPHA = 2, E.CLIPPING_PROCESS_DRAW = 3, E.CLIPPING_PROCESS_CLEAR_ALPHA = 4, E.prototype.setChannelFlagAsColor = function (t, i) {
                this.CHANNEL_COLORS[t] = i
            }, E.prototype.getChannelFlagAsColor = function (t) {
                return this.CHANNEL_COLORS[t]
            }, E.prototype._$ZT = function () { }, E.prototype._$Uo = function (t, i, e, r, o, n, s) { }, E.prototype._$Rs = function () {
                return -1
            }, E.prototype._$Ds = function (t) { }, E.prototype.setBaseColor = function (t, i, e, r) {
                t < 0 ? t = 0 : t > 1 && (t = 1), i < 0 ? i = 0 : i > 1 && (i = 1), e < 0 ? e = 0 : e > 1 && (e = 1), r < 0 ? r = 0 : r > 1 && (r = 1), this._$lT = t, this._$C0 = i, this._$tT = e, this._$WL = r
            }, E.prototype._$WP = function (t) {
                this.culling = t
            }, E.prototype.setMatrix = function (t) {
                for (var i = 0; i < 16; i++) this.matrix4x4[i] = t[i]
            }, E.prototype._$IT = function () {
                return this.matrix4x4
            }, E.prototype.setPremultipliedAlpha = function (t) {
                this.premultipliedAlpha = t
            }, E.prototype.isPremultipliedAlpha = function () {
                return this.premultipliedAlpha
            }, E.prototype.setAnisotropy = function (t) {
                this.anisotropy = t
            }, E.prototype.getAnisotropy = function () {
                return this.anisotropy
            }, E.prototype.getClippingProcess = function () {
                return this.clippingProcess
            }, E.prototype.setClippingProcess = function (t) {
                this.clippingProcess = t
            }, E.prototype.setClipBufPre_clipContextForMask = function (t) {
                this.clipBufPre_clipContextMask = t
            }, E.prototype.getClipBufPre_clipContextMask = function () {
                return this.clipBufPre_clipContextMask
            }, E.prototype.setClipBufPre_clipContextForDraw = function (t) {
                this.clipBufPre_clipContextDraw = t
            }, E.prototype.getClipBufPre_clipContextDraw = function () {
                return this.clipBufPre_clipContextDraw
            }, I._$ur = -2, I._$c2 = 1, I._$_b = 2, I.prototype._$F0 = function (t) {
                this._$kP = t._$nP(), this._$dr = t._$nP()
            }, I.prototype.readV2_opacity = function (t) {
                t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this._$mS = t._$Tb())
            }, I.prototype.init = function (t) { }, I.prototype._$Nr = function (t, i) { }, I.prototype.interpolateOpacity = function (t, i, e, r) {
                null == this._$mS ? e.setInterpolatedOpacity(1) : e.setInterpolatedOpacity(v._$br(t, i, r, this._$mS))
            }, I.prototype._$2b = function (t, i) { }, I.prototype._$nb = function (t, i, e, r, o, n, s) { }, I.prototype.getType = function () { }, I.prototype._$gs = function (t) {
                this._$dr = t
            }, I.prototype._$a2 = function (t) {
                this._$kP = t
            }, I.prototype.getTargetBaseDataID = function () {
                return this._$dr
            }, I.prototype.getBaseDataID = function () {
                return this._$kP
            }, I.prototype._$32 = function () {
                return null != this._$dr && this._$dr != yt._$2o()
            }, w._$W2 = 0, w._$CS = w._$W2, w._$Mo = function () {
                return !0
            }, w._$XP = function (t) {
                try {
                    for (var i = getTimeMSec(); getTimeMSec() - i < t;);
                } catch (t) {
                    t._$Rb()
                }
            }, w.getUserTimeMSec = function () {
                return w._$CS == w._$W2 ? w.getSystemTimeMSec() : w._$CS
            }, w.setUserTimeMSec = function (t) {
                w._$CS = t
            }, w.updateUserTimeMSec = function () {
                return w._$CS = w.getSystemTimeMSec()
            }, w.getTimeMSec = function () {
                return (new Date).getTime()
            }, w.getSystemTimeMSec = function () {
                return (new Date).getTime()
            }, w._$Q = function (t) { }, w._$jT = function (t, i, e, r, o) {
                for (var n = 0; n < o; n++) e[r + n] = t[i + n]
            }, x._$ds = -2, x.prototype._$F0 = function (t) {
                this._$wL = t._$nP(), this._$VP = t._$6L(), this._$GP = t._$nP()
            }, x.prototype.getParamIndex = function (t) {
                return this._$2r != t && (this._$8o = x._$ds), this._$8o
            }, x.prototype._$Pb = function (t, i) {
                this._$8o = t, this._$2r = i
            }, x.prototype.getParamID = function () {
                return this._$wL
            }, x.prototype._$yP = function (t) {
                this._$wL = t
            }, x.prototype._$N2 = function () {
                return this._$VP
            }, x.prototype._$d2 = function () {
                return this._$GP
            }, x.prototype._$t2 = function (t, i) {
                this._$VP = t, this._$GP = i
            }, x.prototype._$Lr = function () {
                return this._$O2
            }, x.prototype._$wr = function (t) {
                this._$O2 = t
            }, x.prototype._$SL = function () {
                return this._$ri
            }, x.prototype._$AL = function (t) {
                this._$ri = t
            }, O.startsWith = function (t, i, e) {
                var r = i + e.length;
                if (r >= t.length) return !1;
                for (var o = i; o < r; o++)
                    if (O.getChar(t, o) != e.charAt(o - i)) return !1;
                return !0
            }, O.getChar = function (t, i) {
                return String.fromCharCode(t.getUint8(i))
            }, O.createString = function (t, i, e) {
                for (var r = new ArrayBuffer(2 * e), o = new Uint16Array(r), n = 0; n < e; n++) o[n] = t.getUint8(i + n);
                return String.fromCharCode.apply(null, o)
            }, O._$LS = function (t, i, e, r) {
                t instanceof ArrayBuffer && (t = new DataView(t));
                var o = e,
                    n = !1,
                    s = !1,
                    _ = 0,
                    a = O.getChar(t, o);
                "-" == a && (n = !0, o++);
                for (var h = !1; o < i; o++) {
                    switch (a = O.getChar(t, o)) {
                        case "0":
                            _ *= 10;
                            break;
                        case "1":
                            _ = 10 * _ + 1;
                            break;
                        case "2":
                            _ = 10 * _ + 2;
                            break;
                        case "3":
                            _ = 10 * _ + 3;
                            break;
                        case "4":
                            _ = 10 * _ + 4;
                            break;
                        case "5":
                            _ = 10 * _ + 5;
                            break;
                        case "6":
                            _ = 10 * _ + 6;
                            break;
                        case "7":
                            _ = 10 * _ + 7;
                            break;
                        case "8":
                            _ = 10 * _ + 8;
                            break;
                        case "9":
                            _ = 10 * _ + 9;
                            break;
                        case ".":
                            s = !0, o++ , h = !0;
                            break;
                        default:
                            h = !0
                    }
                    if (h) break
                }
                if (s)
                    for (var l = .1, $ = !1; o < i; o++) {
                        switch (a = O.getChar(t, o)) {
                            case "0":
                                break;
                            case "1":
                                _ += 1 * l;
                                break;
                            case "2":
                                _ += 2 * l;
                                break;
                            case "3":
                                _ += 3 * l;
                                break;
                            case "4":
                                _ += 4 * l;
                                break;
                            case "5":
                                _ += 5 * l;
                                break;
                            case "6":
                                _ += 6 * l;
                                break;
                            case "7":
                                _ += 7 * l;
                                break;
                            case "8":
                                _ += 8 * l;
                                break;
                            case "9":
                                _ += 9 * l;
                                break;
                            default:
                                $ = !0
                        }
                        if (l *= .1, $) break
                    }
                return n && (_ = -_), r[0] = o, _
            }, D.prototype._$zP = function () {
                this._$Ob = new Array
            }, D.prototype._$F0 = function (t) {
                this._$Ob = t._$nP()
            }, D.prototype._$Ur = function (t) {
                if (t._$WS()) return !0;
                for (var i = t._$v2(), e = this._$Ob.length - 1; e >= 0; --e) {
                    var r = this._$Ob[e].getParamIndex(i);
                    if (r == x._$ds && (r = t.getParamIndex(this._$Ob[e].getParamID())), t._$Xb(r)) return !0
                }
                return !1
            }, D.prototype._$Q2 = function (t, i) {
                for (var e, r, o = this._$Ob.length, n = t._$v2(), s = 0, _ = 0; _ < o; _++) {
                    var a = this._$Ob[_];
                    if (e = a.getParamIndex(n), e == x._$ds && (e = t.getParamIndex(a.getParamID()), a._$Pb(e, n)), e < 0) throw new Exception("err 23242 : " + a.getParamID());
                    var h = e < 0 ? 0 : t.getParamFloat(e);
                    r = a._$N2();
                    var l, $, u = a._$d2(),
                        p = -1,
                        f = 0;
                    if (r < 1);
                    else if (1 == r) l = u[0], l - U._$J < h && h < l + U._$J ? (p = 0, f = 0) : (p = 0, i[0] = !0);
                    else if (l = u[0], h < l - U._$J) p = 0, i[0] = !0;
                    else if (h < l + U._$J) p = 0;
                    else {
                        for (var c = !1, d = 1; d < r; ++d) {
                            if ($ = u[d], h < $ + U._$J) {
                                $ - U._$J < h ? p = d : (p = d - 1, f = (h - l) / ($ - l), s++), c = !0;
                                break
                            }
                            l = $
                        }
                        c || (p = r - 1, f = 0, i[0] = !0)
                    }
                    a._$wr(p), a._$AL(f)
                }
                return s
            }, D.prototype._$zr = function (t, i, e) {
                var r = 1 << e;
                r + 1 > U._$Qb && console.log("err 23245\n");
                for (var o = this._$Ob.length, n = 1, s = 1, _ = 0, a = 0; a < r; ++a) t[a] = 0;
                for (var h = 0; h < o; ++h) {
                    var l = this._$Ob[h];
                    if (0 == l._$SL()) {
                        var $ = l._$Lr() * n;
                        if ($ < 0 && at._$3T) throw new Exception("err 23246");
                        for (var a = 0; a < r; ++a) t[a] += $
                    } else {
                        for (var $ = n * l._$Lr(), u = n * (l._$Lr() + 1), a = 0; a < r; ++a) t[a] += (a / s | 0) % 2 == 0 ? $ : u;
                        i[_++] = l._$SL(), s *= 2
                    }
                    n *= l._$N2()
                }
                t[r] = 65535, i[_] = -1
            }, D.prototype._$h2 = function (t, i, e) {
                for (var r = new Float32Array(i), o = 0; o < i; ++o) r[o] = e[o];
                var n = new x;
                n._$yP(t), n._$t2(i, r), this._$Ob.push(n)
            }, D.prototype._$J2 = function (t) {
                for (var i = t, e = this._$Ob.length, r = 0; r < e; ++r) {
                    var o = this._$Ob[r],
                        n = o._$N2(),
                        s = i % o._$N2(),
                        _ = o._$d2()[s];
                    console.log("%s[%d]=%7.2f / ", o.getParamID(), s, _), i /= n
                }
                console.log("\n")
            }, D.prototype.getParamCount = function () {
                return this._$Ob.length
            }, D.prototype._$zs = function () {
                return this._$Ob
            }, R.prototype.identity = function () {
                for (var t = 0; t < 16; t++) this.m[t] = t % 5 == 0 ? 1 : 0
            }, R.prototype.getArray = function () {
                return this.m
            }, R.prototype.getCopyMatrix = function () {
                return new Float32Array(this.m)
            }, R.prototype.setMatrix = function (t) {
                if (null != t && 16 == t.length)
                    for (var i = 0; i < 16; i++) this.m[i] = t[i]
            }, R.prototype.mult = function (t, i, e) {
                return null == i ? null : (this == i ? this.mult_safe(this.m, t.m, i.m, e) : this.mult_fast(this.m, t.m, i.m, e), i)
            }, R.prototype.mult_safe = function (t, i, e, r) {
                if (t == e) {
                    var o = new Array(16);
                    this.mult_fast(t, i, o, r);
                    for (var n = 15; n >= 0; --n) e[n] = o[n]
                } else this.mult_fast(t, i, e, r)
            }, R.prototype.mult_fast = function (t, i, e, r) {
                r ? (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2], e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6], e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10], e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12], e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2], e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6], e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10], e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13], e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2], e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6], e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10], e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14], e[3] = e[7] = e[11] = 0, e[15] = 1) : (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2] + t[12] * i[3], e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6] + t[12] * i[7], e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10] + t[12] * i[11], e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12] * i[15], e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2] + t[13] * i[3], e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6] + t[13] * i[7], e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10] + t[13] * i[11], e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13] * i[15], e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2] + t[14] * i[3], e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6] + t[14] * i[7], e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10] + t[14] * i[11], e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14] * i[15], e[3] = t[3] * i[0] + t[7] * i[1] + t[11] * i[2] + t[15] * i[3], e[7] = t[3] * i[4] + t[7] * i[5] + t[11] * i[6] + t[15] * i[7], e[11] = t[3] * i[8] + t[7] * i[9] + t[11] * i[10] + t[15] * i[11], e[15] = t[3] * i[12] + t[7] * i[13] + t[11] * i[14] + t[15] * i[15])
            }, R.prototype.translate = function (t, i, e) {
                this.m[12] = this.m[0] * t + this.m[4] * i + this.m[8] * e + this.m[12], this.m[13] = this.m[1] * t + this.m[5] * i + this.m[9] * e + this.m[13], this.m[14] = this.m[2] * t + this.m[6] * i + this.m[10] * e + this.m[14], this.m[15] = this.m[3] * t + this.m[7] * i + this.m[11] * e + this.m[15]
            }, R.prototype.scale = function (t, i, e) {
                this.m[0] *= t, this.m[4] *= i, this.m[8] *= e, this.m[1] *= t, this.m[5] *= i, this.m[9] *= e, this.m[2] *= t, this.m[6] *= i, this.m[10] *= e, this.m[3] *= t, this.m[7] *= i, this.m[11] *= e
            }, R.prototype.rotateX = function (t) {
                var i = Lt.fcos(t),
                    e = Lt._$9(t),
                    r = this.m[4];
                this.m[4] = r * i + this.m[8] * e, this.m[8] = r * -e + this.m[8] * i, r = this.m[5], this.m[5] = r * i + this.m[9] * e, this.m[9] = r * -e + this.m[9] * i, r = this.m[6], this.m[6] = r * i + this.m[10] * e, this.m[10] = r * -e + this.m[10] * i, r = this.m[7], this.m[7] = r * i + this.m[11] * e, this.m[11] = r * -e + this.m[11] * i
            }, R.prototype.rotateY = function (t) {
                var i = Lt.fcos(t),
                    e = Lt._$9(t),
                    r = this.m[0];
                this.m[0] = r * i + this.m[8] * -e, this.m[8] = r * e + this.m[8] * i, r = this.m[1], this.m[1] = r * i + this.m[9] * -e, this.m[9] = r * e + this.m[9] * i, r = m[2], this.m[2] = r * i + this.m[10] * -e, this.m[10] = r * e + this.m[10] * i, r = m[3], this.m[3] = r * i + this.m[11] * -e, this.m[11] = r * e + this.m[11] * i
            }, R.prototype.rotateZ = function (t) {
                var i = Lt.fcos(t),
                    e = Lt._$9(t),
                    r = this.m[0];
                this.m[0] = r * i + this.m[4] * e, this.m[4] = r * -e + this.m[4] * i, r = this.m[1], this.m[1] = r * i + this.m[5] * e, this.m[5] = r * -e + this.m[5] * i, r = this.m[2], this.m[2] = r * i + this.m[6] * e, this.m[6] = r * -e + this.m[6] * i, r = this.m[3], this.m[3] = r * i + this.m[7] * e, this.m[7] = r * -e + this.m[7] * i
            }, b.prototype = new et, b._$tP = new Object, b._$27 = function () {
                b._$tP.clear()
            }, b.getID = function (t) {
                var i = b._$tP[t];
                return null == i && (i = new b(t), b._$tP[t] = i), i
            }, b.prototype._$3s = function () {
                return new b
            }, F._$kS = -1, F._$pS = 0, F._$hb = 1, F.STATE_IDENTITY = 0, F._$gb = 1, F._$fo = 2, F._$go = 4, F.prototype.transform = function (t, i, e) {
                var r, o, n, s, _, a, h = 0,
                    l = 0;
                switch (this._$hi) {
                    default: return;
                    case F._$go | F._$fo | F._$gb:
                        for (r = this._$7, o = this._$H, n = this._$k, s = this._$f, _ = this._$g, a = this._$w; --e >= 0;) {
                            var $ = t[h++],
                                u = t[h++];
                            i[l++] = r * $ + o * u + n, i[l++] = s * $ + _ * u + a
                        }
                        return;
                    case F._$go | F._$fo:
                        for (r = this._$7, o = this._$H, s = this._$f, _ = this._$g; --e >= 0;) {
                            var $ = t[h++],
                                u = t[h++];
                            i[l++] = r * $ + o * u, i[l++] = s * $ + _ * u
                        }
                        return;
                    case F._$go | F._$gb:
                        for (o = this._$H, n = this._$k, s = this._$f, a = this._$w; --e >= 0;) {
                            var $ = t[h++];
                            i[l++] = o * t[h++] + n, i[l++] = s * $ + a
                        }
                        return;
                    case F._$go:
                        for (o = this._$H, s = this._$f; --e >= 0;) {
                            var $ = t[h++];
                            i[l++] = o * t[h++], i[l++] = s * $
                        }
                        return;
                    case F._$fo | F._$gb:
                        for (r = this._$7, n = this._$k, _ = this._$g, a = this._$w; --e >= 0;) i[l++] = r * t[h++] + n, i[l++] = _ * t[h++] + a;
                        return;
                    case F._$fo:
                        for (r = this._$7, _ = this._$g; --e >= 0;) i[l++] = r * t[h++], i[l++] = _ * t[h++];
                        return;
                    case F._$gb:
                        for (n = this._$k, a = this._$w; --e >= 0;) i[l++] = t[h++] + n, i[l++] = t[h++] + a;
                        return;
                    case F.STATE_IDENTITY:
                        return void (t == i && h == l || w._$jT(t, h, i, l, 2 * e))
                }
            }, F.prototype.update = function () {
                0 == this._$H && 0 == this._$f ? 1 == this._$7 && 1 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = F.STATE_IDENTITY, this._$Z = F._$pS) : (this._$hi = F._$gb, this._$Z = F._$hb) : 0 == this._$k && 0 == this._$w ? (this._$hi = F._$fo, this._$Z = F._$kS) : (this._$hi = F._$fo | F._$gb, this._$Z = F._$kS) : 0 == this._$7 && 0 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = F._$go, this._$Z = F._$kS) : (this._$hi = F._$go | F._$gb, this._$Z = F._$kS) : 0 == this._$k && 0 == this._$w ? (this._$hi = F._$go | F._$fo, this._$Z = F._$kS) : (this._$hi = F._$go | F._$fo | F._$gb, this._$Z = F._$kS)
            }, F.prototype._$RT = function (t) {
                this._$IT(t);
                var i = t[0],
                    e = t[2],
                    r = t[1],
                    o = t[3],
                    n = Math.sqrt(i * i + r * r),
                    s = i * o - e * r;
                0 == n ? at._$so && console.log("affine._$RT() / rt==0") : (t[0] = n, t[1] = s / n, t[2] = (r * o + i * e) / s, t[3] = Math.atan2(r, i))
            }, F.prototype._$ho = function (t, i, e, r) {
                var o = new Float32Array(6),
                    n = new Float32Array(6);
                t._$RT(o), i._$RT(n);
                var s = new Float32Array(6);
                s[0] = o[0] + (n[0] - o[0]) * e, s[1] = o[1] + (n[1] - o[1]) * e, s[2] = o[2] + (n[2] - o[2]) * e, s[3] = o[3] + (n[3] - o[3]) * e, s[4] = o[4] + (n[4] - o[4]) * e, s[5] = o[5] + (n[5] - o[5]) * e, r._$CT(s)
            }, F.prototype._$CT = function (t) {
                var i = Math.cos(t[3]),
                    e = Math.sin(t[3]);
                this._$7 = t[0] * i, this._$f = t[0] * e, this._$H = t[1] * (t[2] * i - e), this._$g = t[1] * (t[2] * e + i), this._$k = t[4], this._$w = t[5], this.update()
            }, F.prototype._$IT = function (t) {
                t[0] = this._$7, t[1] = this._$f, t[2] = this._$H, t[3] = this._$g, t[4] = this._$k, t[5] = this._$w
            }, C.prototype = new s, C._$cs = "VISIBLE:", C._$ar = "LAYOUT:", C._$Co = 0, C._$D2 = [], C._$1T = 1, C.loadMotion = function (t) {
                var i = new C,
                    e = [0],
                    r = t.length;
                i._$yT = 0;
                for (var o = 0; o < r; ++o) {
                    var n = 255 & t[o];
                    if ("\n" != n && "\r" != n)
                        if ("#" != n)
                            if ("$" != n) {
                                if ("a" <= 255="" n="" &&="" <="z" ||="" "a"="" "_"="=" n)="" {="" for="" (var="" s="o," _="-1;" o="" r="" ("\r"="" !="(n" =="" &="" t[o])="" "\n"="" ++o)="" if="" ("=" == n) {
                                            _ = o;
                                            break
                                        }
                                    if (_ >= 0) {
                                        var a = new B;
                                        O.startsWith(t, s, C._$cs) ? (a._$RP = B._$hs, a._$4P = new String(t, s, _ - s)) : O.startsWith(t, s, C._$ar) ? (a._$4P = new String(t, s + 7, _ - s - 7), O.startsWith(t, s + 7, " anchor_x")="" ?="" a._$rp="B._$xs" :="" o.startswith(t,="" +="" 7,="" "anchor_y")="" "scale_x")="" "scale_y")="" "x")="" "y")="" (a._$rp="B._$Ns))" a._$4p="new" string(t,="" s,="" -="" s)),="" i.motions.push(a);="" var="" h="0;" (c._$d2.clear(),="" 1;="" (","="" "="" "\t"="" l="O._$LS(t," r,="" o,="" e);="" (e[0]=""> 0) {
                                                    C._$D2.push(l), h++;
                                                    var $ = e[0];
                                                    if ($ < o) {
                                                        console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
                                                        break
                                                    }
                                                    o = $
                                                }
                                            }
                                        a._$I0 = C._$D2._$BL(), h > i._$yT && (i._$yT = h)
                                    }
                                }
                            } else {
                                for (var s = o, _ = -1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o)
                                    if ("=" == n) {
                                        _ = o;
                                        break
                                    }
                                var u = !1;
                                if (_ >= 0)
                                    for (_ == s + 4 && "f" == t[s + 1] && "p" == t[s + 2] && "s" == t[s + 3] && (u = !0), o = _ + 1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o)
                                        if ("," != n && " " != n && "\t" != n) {
                                            var l = O._$LS(t, r, o, e);
                                            e[0] > 0 && u && 5 < l && l < 121 && (i._$D0 = l), o = e[0]
                                        }
                                for (; o < r && ("\n" != t[o] && "\r" != t[o]); ++o);
                            }
                        else
                            for (; o < r && ("\n" != t[o] && "\r" != t[o]); ++o);
                }
                return i._$AS = 1e3 * i._$yT / i._$D0 | 0, i
            }, C.prototype.getDurationMSec = function () {
                return this._$AS
            }, C.prototype.dump = function () {
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t];
                    console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
                    for (var e = 0; e < i._$I0.length && e < 10; e++) console.log("%5.2f ,", i._$I0[e]);
                    console.log("\n")
                }
            }, C.prototype.updateParamExe = function (t, i, e, r) {
                for (var o = i - r._$z2, n = o * this._$D0 / 1e3, s = 0 | n, _ = n - s, a = 0; a < this.motions.length; a++) {
                    var h = this.motions[a],
                        l = h._$I0.length,
                        $ = h._$4P;
                    if (h._$RP == B._$hs) {
                        var u = h._$I0[s >= l ? l - 1 : s];
                        t.setParamFloat($, u)
                    } else if (B._$ws <= h._$rp="" &&="" <="B._$Ys);" else="" {="" var="" p="t.getParamFloat($)," f="h._$I0[s">= l ? l - 1 : s],
                            c = h._$I0[s + 1 >= l ? l - 1 : s + 1],
                            d = f + (c - f) * _,
                            g = p + (d - p) * e;
                        t.setParamFloat($, g)
                    }
                }
                s >= this._$yT && (this._$E ? (r._$z2 = i, this.loopFadeIn && (r._$bs = i)) : r._$9L = !0)
            }, C.prototype._$r0 = function () {
                return this._$E
            }, C.prototype._$aL = function (t) {
                this._$E = t
            }, C.prototype.isLoopFadeIn = function () {
                return this.loopFadeIn
            }, C.prototype.setLoopFadeIn = function (t) {
                this.loopFadeIn = t
            }, N.prototype.clear = function () {
                this.size = 0
            }, N.prototype.add = function (t) {
                if (this._$P.length <= this.size)="" {="" var="" i="new" float32array(2="" *="" this.size);="" w._$jt(this._$p,="" 0,="" i,="" this.size),="" this._$p="i" }="" this._$p[this.size++]="t" },="" n.prototype._$bl="function" ()="" t="new" float32array(this.size);="" return="" t,="" b._$fr="0," b._$hs="1," b._$ws="100," b._$ns="101," b._$xs="102," b._$us="103," b._$qs="104," b._$ys="105," u._$ms="1," u._$qs="2," u._$i2="0," u._$no="2," u._$do="U._$Ms," u._$ls="!0," u._$1r="5," u._$qb="65," u._$j="1e-4," u._$ft=".001," u._$ss="3," g._$o7="6," g._$s7="7," g._$77="9," g.live2d_format_version_v2_10_sdk2="10," g.live2d_format_version_v2_11_sdk2_1="11," g._$t7="G.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1," g._$is="-2004318072," g._$h0="0," g._$4l="23," g._$7p="33," g._$ut="function" (t)="" console.log("_$bo="" ::="" _$6="" _$mo="" _$e0="" :="" %d\n",="" t)="" g._$9o="function" if="" (t="" <="" 40)="" g._$ut(t),="" null;="" 50)="" 60)="" 100)="" switch="" case="" 65:="" new="" z;="" 66:="" d;="" 67:="" x;="" 68:="" 69:="" p;="" 70:="" $t;="" default:="" null="" else="" 150)="" 131:="" st;="" 133:="" tt;="" 136:="" 137:="" ot;="" 142:="" j="" y._$hp="0," y._$_0="!0;" y._$v2="-1," y._$w0="-1," y._$jr="!1," y._$zs="!0," y._$tr="-1e6," y._$lr="1e6," y._$is="32," y._$e="!1," y.prototype.getdrawdataindex="function" for="" (var="" -="" 1;="">= 0; --i)
                    if (null != this._$aS[i] && this._$aS[i].getDrawDataID() == t) return i;
                return -1
            }, Y.prototype.getDrawData = function (t) {
                if (t instanceof b) {
                    if (null == this._$Bo) {
                        this._$Bo = new Object;
                        for (var i = this._$aS.length, e = 0; e < i; e++) {
                            var r = this._$aS[e],
                                o = r.getDrawDataID();
                            null != o && (this._$Bo[o] = r)
                        }
                    }
                    return this._$Bo[id]
                }
                return t < this._$aS.length ? this._$aS[t] : null
            }, Y.prototype.release = function () {
                this._$3S.clear(), this._$aS.clear(), this._$F2.clear(), null != this._$Bo && this._$Bo.clear(), this._$db.clear(), this._$8b.clear(), this._$Hr.clear()
            }, Y.prototype.init = function () {
                this._$co++ , this._$F2.length > 0 && this.release();
                for (var t = this._$Ri.getModelImpl(), i = t._$Xr(), r = i.length, o = new Array, n = new Array, s = 0; s < r; ++s) {
                    var _ = i[s];
                    this._$F2.push(_), this._$Hr.push(_.init(this));
                    for (var a = _.getBaseData(), h = a.length, l = 0; l < h; ++l) o.push(a[l]);
                    for (var l = 0; l < h; ++l) {
                        var $ = a[l].init(this);
                        $._$l2(s), n.push($)
                    }
                    for (var u = _.getDrawData(), p = u.length, l = 0; l < p; ++l) {
                        var f = u[l],
                            c = f.init(this);
                        c._$IP = s, this._$aS.push(f), this._$8b.push(c)
                    }
                }
                for (var d = o.length, g = yt._$2o(); ;) {
                    for (var y = !1, s = 0; s < d; ++s) {
                        var m = o[s];
                        if (null != m) {
                            var T = m.getTargetBaseDataID();
                            (null == T || T == g || this.getBaseDataIndex(T) >= 0) && (this._$3S.push(m), this._$db.push(n[s]), o[s] = null, y = !0)
                        }
                    }
                    if (!y) break
                }
                var P = t._$E2();
                if (null != P) {
                    var S = P._$1s();
                    if (null != S)
                        for (var v = S.length, s = 0; s < v; ++s) {
                            var L = S[s];
                            null != L && this._$02(L.getParamID(), L.getDefaultValue(), L.getMinValue(), L.getMaxValue())
                        }
                }
                this.clipManager = new e(this.dp_webgl), this.clipManager.init(this, this._$aS, this._$8b), this._$QT = !0
            }, Y.prototype.update = function () {
                Y._$e && _.start("_$zL");
                for (var t = this._$_2.length, i = 0; i < t; i++) this._$_2[i] != this._$vr[i] && (this._$Js[i] = Y._$ZS, this._$vr[i] = this._$_2[i]);
                var e = this._$3S.length,
                    r = this._$aS.length,
                    o = W._$or(),
                    n = W._$Pr(),
                    s = n - o + 1;
                (null == this._$Ws || this._$Ws.length < s) && (this._$Ws = new Int16Array(s), this._$Vs = new Int16Array(s));
                for (var i = 0; i < s; i++) this._$Ws[i] = Y._$V2, this._$Vs[i] = Y._$V2;
                (null == this._$Er || this._$Er.length < r) && (this._$Er = new Int16Array(r));
                for (var i = 0; i < r; i++) this._$Er[i] = Y._$W0;
                Y._$e && _.dump("_$zL"), Y._$e && _.start("_$UL");
                for (var a = null, h = 0; h < e; ++h) {
                    var l = this._$3S[h],
                        $ = this._$db[h];
                    try {
                        l._$Nr(this, $), l._$2b(this, $)
                    } catch (t) {
                        null == a && (a = t)
                    }
                }
                null != a && Y._$_0 && _._$Rb(a), Y._$e && _.dump("_$UL"), Y._$e && _.start("_$DL");
                for (var u = null, p = 0; p < r; ++p) {
                    var f = this._$aS[p],
                        c = this._$8b[p];
                    try {
                        if (f._$Nr(this, c), c._$u2()) continue;
                        f._$2b(this, c);
                        var d, g = Math.floor(f._$zS(this, c) - o);
                        try {
                            d = this._$Vs[g]
                        } catch (t) {
                            console.log("_$li :: %s / %s \t\t\t\t@@_$fS\n", t.toString(), f.getDrawDataID().toString()), g = Math.floor(f._$zS(this, c) - o);
                            continue
                        }
                        d == Y._$V2 ? this._$Ws[g] = p : this._$Er[d] = p, this._$Vs[g] = p
                    } catch (t) {
                        null == u && (u = t, at._$sT(at._$H7))
                    }
                }
                null != u && Y._$_0 && _._$Rb(u), Y._$e && _.dump("_$DL"), Y._$e && _.start("_$eL");
                for (var i = this._$Js.length - 1; i >= 0; i--) this._$Js[i] = Y._$jr;
                return this._$QT = !1, Y._$e && _.dump("_$eL"), !1
            }, Y.prototype.preDraw = function (t) {
                null != this.clipManager && (t._$ZT(), this.clipManager.setupClip(this, t))
            }, Y.prototype.draw = function (t) {
                if (null == this._$Ws) return void _._$li("call _$Ri.update() before _$Ri.draw() ");
                var i = this._$Ws.length;
                t._$ZT();
                for (var e = 0; e < i; ++e) {
                    var r = this._$Ws[e];
                    if (r != Y._$V2)
                        for (; ;) {
                            var o = this._$aS[r],
                                n = this._$8b[r];
                            if (n._$yo()) {
                                var s = n._$IP,
                                    a = this._$Hr[s];
                                n._$VS = a.getPartsOpacity(), o.draw(t, this, n)
                            }
                            var h = this._$Er[r];
                            if (h <= r="" ||="" h="=" y._$w0)="" break;="" }="" },="" y.prototype.getparamindex="function" (t)="" {="" for="" (var="" i="this._$pb.length" -="" 1;="">= 0; --i)
                    if (this._$pb[i] == t) return i;
                return this._$02(t, 0, Y._$tr, Y._$lr)
            }, Y.prototype._$BS = function (t) {
                return this.getBaseDataIndex(t)
            }, Y.prototype.getBaseDataIndex = function (t) {
                for (var i = this._$3S.length - 1; i >= 0; --i)
                    if (null != this._$3S[i] && this._$3S[i].getBaseDataID() == t) return i;
                return -1
            }, Y.prototype._$UT = function (t, i) {
                var e = new Float32Array(i);
                return w._$jT(t, 0, e, 0, t.length), e
            }, Y.prototype._$02 = function (t, i, e, r) {
                if (this._$qo >= this._$pb.length) {
                    var o = this._$pb.length,
                        n = new Array(2 * o);
                    w._$jT(this._$pb, 0, n, 0, o), this._$pb = n, this._$_2 = this._$UT(this._$_2, 2 * o), this._$vr = this._$UT(this._$vr, 2 * o), this._$Rr = this._$UT(this._$Rr, 2 * o), this._$Or = this._$UT(this._$Or, 2 * o);
                    var s = new Array;
                    w._$jT(this._$Js, 0, s, 0, o), this._$Js = s
                }
                return this._$pb[this._$qo] = t, this._$_2[this._$qo] = i, this._$vr[this._$qo] = i, this._$Rr[this._$qo] = e, this._$Or[this._$qo] = r, this._$Js[this._$qo] = Y._$ZS, this._$qo++
            }, Y.prototype._$Zo = function (t, i) {
                this._$3S[t] = i
            }, Y.prototype.setParamFloat = function (t, i) {
                i < this._$Rr[t] && (i = this._$Rr[t]), i > this._$Or[t] && (i = this._$Or[t]), this._$_2[t] = i
            }, Y.prototype.loadParam = function () {
                var t = this._$_2.length;
                t > this._$fs.length && (t = this._$fs.length), w._$jT(this._$fs, 0, this._$_2, 0, t)
            }, Y.prototype.saveParam = function () {
                var t = this._$_2.length;
                t > this._$fs.length && (this._$fs = new Float32Array(t)), w._$jT(this._$_2, 0, this._$fs, 0, t)
            }, Y.prototype._$v2 = function () {
                return this._$co
            }, Y.prototype._$WS = function () {
                return this._$QT
            }, Y.prototype._$Xb = function (t) {
                return this._$Js[t] == Y._$ZS
            }, Y.prototype._$vs = function () {
                return this._$Es
            }, Y.prototype._$Tr = function () {
                return this._$ZP
            }, Y.prototype.getBaseData = function (t) {
                return this._$3S[t]
            }, Y.prototype.getParamFloat = function (t) {
                return this._$_2[t]
            }, Y.prototype.getParamMax = function (t) {
                return this._$Or[t]
            }, Y.prototype.getParamMin = function (t) {
                return this._$Rr[t]
            }, Y.prototype.setPartsOpacity = function (t, i) {
                this._$Hr[t].setPartsOpacity(i)
            }, Y.prototype.getPartsOpacity = function (t) {
                return this._$Hr[t].getPartsOpacity()
            }, Y.prototype.getPartsDataIndex = function (t) {
                for (var i = this._$F2.length - 1; i >= 0; --i)
                    if (null != this._$F2[i] && this._$F2[i]._$p2() == t) return i;
                return -1
            }, Y.prototype._$q2 = function (t) {
                return this._$db[t]
            }, Y.prototype._$C2 = function (t) {
                return this._$8b[t]
            }, Y.prototype._$Bb = function (t) {
                return this._$Hr[t]
            }, Y.prototype._$5s = function (t, i) {
                for (var e = this._$Ws.length, r = t, o = 0; o < e; ++o) {
                    var n = this._$Ws[o];
                    if (n != Y._$V2)
                        for (; ;) {
                            var s = this._$8b[n];
                            s._$yo() && (s._$GT()._$B2(this, s, r), r += i);
                            var _ = this._$Er[n];
                            if (_ <= n="" ||="" _="=" y._$w0)="" break;="" }="" },="" y.prototype.setdrawparam="function" (t)="" {="" this.dp_webgl="t" y.prototype.getdrawparam="function" ()="" return="" k._$0t="function" k._$0t(new="" _$5(t))="" if="" (!t.exists())="" throw="" new="" _$ls(t._$3b());="" for="" (var="" i,="" e="t.length()," r="new" int8array(e),="" o="new" _$xs(new="" _$kb(t),="" 8192),="" (i="o.read(r," n,="" -="" n))=""> 0;) n += i;
                return r
            }, k._$C = function (t) {
                var i = null,
                    e = null;
                try {
                    i = t instanceof Array ? t : new _$Xs(t, 8192), e = new _$js;
                    for (var r, o = new Int8Array(1e3);
                        (r = i.read(o)) > 0;) e.write(o, 0, r);
                    return e._$TS()
                } finally {
                    null != t && t.close(), null != e && (e.flush(), e.close())
                }
            }, V.prototype._$T2 = function () {
                return w.getUserTimeMSec() + Math._$10() * (2 * this._$Br - 1)
            }, V.prototype._$uo = function (t) {
                this._$Br = t
            }, V.prototype._$QS = function (t, i, e) {
                this._$Dr = t, this._$Cb = i, this._$mr = e
            }, V.prototype._$7T = function (t) {
                var i, e = w.getUserTimeMSec(),
                    r = 0;
                switch (this._$_L) {
                    case STATE_CLOSING:
                        r = (e - this._$bb) / this._$Dr, r >= 1 && (r = 1, this._$_L = wt.STATE_CLOSED, this._$bb = e), i = 1 - r;
                        break;
                    case STATE_CLOSED:
                        r = (e - this._$bb) / this._$Cb, r >= 1 && (this._$_L = wt.STATE_OPENING, this._$bb = e), i = 0;
                        break;
                    case STATE_OPENING:
                        r = (e - this._$bb) / this._$mr, r >= 1 && (r = 1, this._$_L = wt.STATE_INTERVAL, this._$12 = this._$T2()), i = r;
                        break;
                    case STATE_INTERVAL:
                        this._$12 < e && (this._$_L = wt.STATE_CLOSING, this._$bb = e), i = 1;
                        break;
                    case STATE_FIRST:
                    default:
                        this._$_L = wt.STATE_INTERVAL, this._$12 = this._$T2(), i = 1
                }
                this._$jo || (i = -i), t.setParamFloat(this._$iL, i), t.setParamFloat(this._$0L, i)
            };
            var wt = function () { };
            wt.STATE_FIRST = "STATE_FIRST", wt.STATE_INTERVAL = "STATE_INTERVAL", wt.STATE_CLOSING = "STATE_CLOSING", wt.STATE_CLOSED = "STATE_CLOSED", wt.STATE_OPENING = "STATE_OPENING", X.prototype = new E, X._$As = 32, X._$Gr = !1, X._$NT = null, X._$vS = null, X._$no = null, X._$9r = function (t) {
                return new Float32Array(t)
            }, X._$vb = function (t) {
                return new Int16Array(t)
            }, X._$cr = function (t, i) {
                return null == t || t._$yL() < i.length ? (t = X._$9r(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
            }, X._$mb = function (t, i) {
                return null == t || t._$yL() < i.length ? (t = X._$vb(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
            }, X._$Hs = function () {
                return X._$Gr
            }, X._$as = function (t) {
                X._$Gr = t
            }, X.prototype.setGL = function (t) {
                this.gl = t
            }, X.prototype.setTransform = function (t) {
                this.transform = t
            }, X.prototype._$ZT = function () { }, X.prototype._$Uo = function (t, i, e, r, o, n, s, _) {
                if (!(n < .01)) {
                    var a = this._$U2[t],
                        h = n > .9 ? at.EXPAND_W : 0;
                    this.gl.drawElements(a, e, r, o, n, h, this.transform, _)
                }
            }, X.prototype._$Rs = function () {
                throw new Error("_$Rs")
            }, X.prototype._$Ds = function (t) {
                throw new Error("_$Ds")
            }, X.prototype._$K2 = function () {
                for (var t = 0; t < this._$sb.length; t++) {
                    0 != this._$sb[t] && (this.gl._$Sr(1, this._$sb, t), this._$sb[t] = 0)
                }
            }, X.prototype.setTexture = function (t, i) {
                this._$sb.length < t + 1 && this._$nS(t), this._$sb[t] = i
            }, X.prototype.setTexture = function (t, i) {
                this._$sb.length < t + 1 && this._$nS(t), this._$U2[t] = i
            }, X.prototype._$nS = function (t) {
                var i = Math.max(2 * this._$sb.length, t + 1 + 10),
                    e = new Int32Array(i);
                w._$jT(this._$sb, 0, e, 0, this._$sb.length), this._$sb = e;
                var r = new Array;
                w._$jT(this._$U2, 0, r, 0, this._$U2.length), this._$U2 = r
            }, z.prototype = new I, z._$Xo = new Float32Array(2), z._$io = new Float32Array(2), z._$0o = new Float32Array(2), z._$Lo = new Float32Array(2), z._$To = new Float32Array(2), z._$Po = new Float32Array(2), z._$gT = new Array, z.prototype._$zP = function () {
                this._$GS = new D, this._$GS._$zP(), this._$Y0 = new Array
            }, z.prototype.getType = function () {
                return I._$c2
            }, z.prototype._$F0 = function (t) {
                I.prototype._$F0.call(this, t), this._$GS = t._$nP(), this._$Y0 = t._$nP(), I.prototype.readV2_opacity.call(this, t)
            }, z.prototype.init = function (t) {
                var i = new H(this);
                return i._$Yr = new P, this._$32() && (i._$Wr = new P), i
            }, z.prototype._$Nr = function (t, i) {
                this != i._$GT() && console.log("### assert!! ### ");
                var e = i;
                if (this._$GS._$Ur(t)) {
                    var r = z._$gT;
                    r[0] = !1;
                    var o = this._$GS._$Q2(t, r);
                    i._$Ib(r[0]), this.interpolateOpacity(t, this._$GS, i, r);
                    var n = t._$vs(),
                        s = t._$Tr();
                    if (this._$GS._$zr(n, s, o), o <= 0="" 1="" 2="=" 0)="" {="" var="" _="this._$Y0[n[0]];" e._$yr.init(_)="" }="" else="" if="" (1="=" o)="" a="this._$Y0[n[1]]," h="s[0];" e._$yr._$fl="_._$fL" +="" (a._$fl="" -="" _._$fl)="" *="" h,="" e._$yr._$gl="_._$gL" (a._$gl="" _._$gl)="" e._$yr._$b0="_._$B0" (a._$b0="" _._$b0)="" e._$yr._$z0="_._$z0" (a._$z0="" _._$z0)="" e._$yr._$qt="_._$qT" (a._$qt="" _._$qt)="" (2="=" l="this._$Y0[n[2]]," $="this._$Y0[n[3]]," u="s[1]," p="_._$fL" f="l._$fL" ($._$fl="" l._$fl)="" h;="" (f="" p)="" u,="" ($._$gl="" l._$gl)="" ($._$b0="" l._$b0)="" ($._$z0="" l._$z0)="" ($._$qt="" l._$qt)="" (3="=" c="this._$Y0[n[0]]," d="this._$Y0[n[1]]," g="this._$Y0[n[2]]," y="this._$Y0[n[3]]," m="this._$Y0[n[4]]," t="this._$Y0[n[5]]," s="this._$Y0[n[7]]," v="s[2]," (d._$fl="" c._$fl)="" (y._$fl="" g._$fl)="" (t._$fl="" m._$fl)="" (s._$fl="" p._$fl)="" v)="" (p="" u)="" (l="" (m="" l)="" u),="" (d._$gl="" c._$gl)="" (y._$gl="" g._$gl)="" (t._$gl="" m._$gl)="" (s._$gl="" p._$gl)="" (d._$b0="" c._$b0)="" (y._$b0="" g._$b0)="" (t._$b0="" m._$b0)="" (s._$b0="" p._$b0)="" (d._$z0="" c._$z0)="" (y._$z0="" g._$z0)="" (t._$z0="" m._$z0)="" (s._$z0="" p._$z0)="" (d._$qt="" c._$qt)="" (y._$qt="" g._$qt)="" (t._$qt="" m._$qt)="" (s._$qt="" p._$qt)="" (4="=" e="this._$Y0[n[0]]," i="this._$Y0[n[2]]," w="this._$Y0[n[3]]," x="this._$Y0[n[4]]," o="this._$Y0[n[5]]," r="this._$Y0[n[7]]," b="this._$Y0[n[8]]," n="this._$Y0[n[11]]," k="s[3]," e._$fl)="" (w._$fl="" i._$fl)="" (o._$fl="" x._$fl)="" (r._$fl="" d._$fl)="" (f._$fl="" b._$fl)="" (n._$fl="" (u._$fl="" k)="" ((1="" u))="" (v="" (x="" (h="" (w="" h)="" u)),="" e._$gl)="" (w._$gl="" i._$gl)="" (o._$gl="" x._$gl)="" (r._$gl="" d._$gl)="" (f._$gl="" b._$gl)="" (n._$gl="" (u._$gl="" e._$b0)="" (w._$b0="" i._$b0)="" (o._$b0="" x._$b0)="" (r._$b0="" d._$b0)="" (f._$b0="" b._$b0)="" (n._$b0="" (u._$b0="" e._$z0)="" (w._$z0="" i._$z0)="" (o._$z0="" x._$z0)="" (r._$z0="" d._$z0)="" (f._$z0="" b._$z0)="" (n._$z0="" (u._$z0="" e._$qt)="" (w._$qt="" i._$qt)="" (o._$qt="" x._$qt)="" (r._$qt="" d._$qt)="" (f._$qt="" b._$qt)="" (n._$qt="" (u._$qt="" for="" (var="" j="0" |="" math.pow(2,="" o),="" q="new" float32array(j),="" <="" j;="" j++)="" z="1," o;="" k++)="" %="" ?="" s[k]="" :="" s[k],="" =="" 2;="" q[j]="Z" tt="new" array,="" it="0;" it++)="" tt[it]="this._$Y0[n[it]];" et="0," rt="0," ot="0," nt="0," st="0," tt[it]._$fl,="" tt[it]._$gl,="" tt[it]._$b0,="" tt[it]._$z0,="" tt[it]._$qt;="" e._$yr.reflectx="_.reflectX," e._$yr.reflecty="_.reflectY" },="" z.prototype._$2b="function" (t,="" i)="" this="" !="i._$GT()" &&="" console.log("###="" assert!!="" ###="" ");="" (e._$hs(!0),="" this._$32())="" (e._$8r="=" i._$ur="" e._$8r="" at._$so="" _._$li("_$l="" _$0p="" _$g="" ::="" %s",="" r),="" e._$hs(!1);="" (null="" s[0]="e._$Yr._$fL," s[1]="e._$Yr._$gL;" a[0]="0," a[1]="-.1;" n._$gt().gettype()="=" i._$c2="" this._$jr(t,="" o,="" n,="" s,="" a,="" h);="" o._$nb(t,="" 1,="" 0,="" 2),="" e._$wr._$fl="s[0]," e._$wr._$gl="s[1]," e._$wr._$b0="e._$Yr._$B0," e._$wr._$z0="e._$Yr._$z0," e._$wr._$qt="e._$Yr._$qT" lt._$ns;="" e.settotalscale_notforclient($="" e._$wr._$b0);="" e.settotalopacity(u="" e.getinterpolatedopacity()),="" e._$wr.reflectx="e._$Yr.reflectX," e._$wr.reflecty="e._$Yr.reflectY," e._$hs(n._$yo())="" e._$hs(!1)="" e.settotalscale_notforclient(e._$yr._$b0),="" e.settotalopacity(e.getinterpolatedopacity())="" z.prototype._$nb="function" i,="" e,="" r,="" s)="" _,="" h._$wr="" h._$yr,="" l._$qt),="" -1="" f,="" c,="" s;="" 1],="" r[v]="d" t,="" r[v="" 1]="y" z.prototype._$jr="function" n)="" z._$lo[0]="r[0]," z._$lo[1]="r[1]," i._$nb(t,="" 2);="" 10;="" l++)="" (a[0]="r[0]" o[0],="" o[1],="" _[0]="" _[1]="" ||="" return="" n[0]="_[0]," void="" (n[1]="_[1]);" console.log("_$l0="" to="" transform="" _$sp\n")="" h.prototype="new" _t,="" w.prototype="new" m,="" w._$ur="-2," w._$es="500," w._$wb="2," w._$8s="3," w._$os="4," w._$52="W._$ES," w._$r2="W._$ES," w._$sb="function" (t)="" 1;="">= 0; --i) {
                    var e = t[i];
                    e < W._$52 ? W._$52 = e : e > W._$R2 && (W._$R2 = e)
                }
            }, W._$or = function () {
                return W._$52
            }, W._$Pr = function () {
                return W._$R2
            }, W.prototype._$F0 = function (t) {
                this._$gP = t._$nP(), this._$dr = t._$nP(), this._$GS = t._$nP(), this._$qb = t._$6L(), this._$Lb = t._$cS(), this._$mS = t._$Tb(), t.getFormatVersion() >= G._$T7 ? (this.clipID = t._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = null, W._$Sb(this._$Lb)
            }, W.prototype.getClipIDList = function () {
                return this.clipIDList
            }, W.prototype._$Nr = function (t, i) {
                if (i._$IS[0] = !1, i._$Us = v._$Z2(t, this._$GS, i._$IS, this._$Lb), at._$Zs);
                else if (i._$IS[0]) return;
                i._$7s = v._$br(t, this._$GS, i._$IS, this._$mS)
            }, W.prototype._$2b = function (t) { }, W.prototype.getDrawDataID = function () {
                return this._$gP
            }, W.prototype._$j2 = function (t) {
                this._$gP = t
            }, W.prototype.getOpacity = function (t, i) {
                return i._$7s
            }, W.prototype._$zS = function (t, i) {
                return i._$Us
            }, W.prototype.getTargetBaseDataID = function () {
                return this._$dr
            }, W.prototype._$gs = function (t) {
                this._$dr = t
            }, W.prototype._$32 = function () {
                return null != this._$dr && this._$dr != yt._$2o()
            }, W.prototype.getType = function () { }, j._$42 = 0, j.prototype._$1b = function () {
                return this._$3S
            }, j.prototype.getDrawDataList = function () {
                return this._$aS
            }, j.prototype._$F0 = function (t) {
                this._$NL = t._$nP(), this._$aS = t._$nP(), this._$3S = t._$nP()
            }, j.prototype._$kr = function (t) {
                t._$Zo(this._$3S), t._$xo(this._$aS), this._$3S = null, this._$aS = null
            }, q.prototype = new i, q.loadModel = function (t) {
                var e = new q;
                return i._$62(e, t), e
            }, q.loadModel = function (t) {
                var e = new q;
                return i._$62(e, t), e
            }, q._$to = function () {
                return new q
            }, q._$er = function (t) {
                var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
                if (0 == i.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
                for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = q.loadModel(i._$3b()), o = 0; o < e.length; o++) {
                    var n = new _$5(e[o]);
                    if (0 == n.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
                    r.setTexture(o, _$nL._$_o(t, n._$3b()))
                }
                return r
            }, q.prototype.setGL = function (t) {
                this._$zo.setGL(t)
            }, q.prototype.setTransform = function (t) {
                this._$zo.setTransform(t)
            }, q.prototype.draw = function () {
                this._$5S.draw(this._$zo)
            }, q.prototype._$K2 = function () {
                this._$zo._$K2()
            }, q.prototype.setTexture = function (t, i) {
                null == this._$zo && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(t, i)
            }, q.prototype.setTexture = function (t, i) {
                null == this._$zo && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(t, i)
            }, q.prototype._$Rs = function () {
                return this._$zo._$Rs()
            }, q.prototype._$Ds = function (t) {
                this._$zo._$Ds(t)
            }, q.prototype.getDrawParam = function () {
                return this._$zo
            }, J.prototype = new s, J._$cs = "VISIBLE:", J._$ar = "LAYOUT:", J.MTN_PREFIX_FADEIN = "FADEIN:", J.MTN_PREFIX_FADEOUT = "FADEOUT:", J._$Co = 0, J._$1T = 1, J.loadMotion = function (t) {
                var i = k._$C(t);
                return J.loadMotion(i)
            }, J.loadMotion = function (t) {
                t instanceof ArrayBuffer && (t = new DataView(t));
                var i = new J,
                    e = [0],
                    r = t.byteLength;
                i._$yT = 0;
                for (var o = 0; o < r; ++o) {
                    var n = Q(t, o),
                        s = n.charCodeAt(0);
                    if ("\n" != n && "\r" != n)
                        if ("#" != n)
                            if ("$" != n) {
                                if (97 <= 65="" s="" &&="" <="122" ||="" "_"="=" n)="" {="" for="" (var="" _="o," a="-1;" o="" r="" ("\r"="" !="(n" =="" q(t,="" o))="" "\n"="" ++o)="" if="" ("=" == n) {
                                            a = o;
                                            break
                                        }
                                    if (a >= 0) {
                                        var h = new B;
                                        O.startsWith(t, _, J._$cs) ? (h._$RP = B._$hs, h._$4P = O.createString(t, _, a - _)) : O.startsWith(t, _, J._$ar) ? (h._$4P = O.createString(t, _ + 7, a - _ - 7), O.startsWith(t, _ + 7, " anchor_x")="" ?="" h._$rp="B._$xs" :="" o.startswith(t,="" +="" 7,="" "anchor_y")="" "scale_x")="" "scale_y")="" "x")="" "y")="" (h._$rp="B._$Ns))" h._$4p="O.createString(t," _,="" -="" _)),="" i.motions.push(h);="" var="" l="0," $="[];" (o="a" 1;="" (","="" "="" "\t"="" u="O._$LS(t," r,="" o,="" e);="" (e[0]=""> 0) {
                                                    $.push(u), l++;
                                                    var p = e[0];
                                                    if (p < o) {
                                                        console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
                                                        break
                                                    }
                                                    o = p - 1
                                                }
                                            }
                                        h._$I0 = new Float32Array($), l > i._$yT && (i._$yT = l)
                                    }
                                }
                            } else {
                                for (var _ = o, a = -1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o)
                                    if ("=" == n) {
                                        a = o;
                                        break
                                    }
                                var f = !1;
                                if (a >= 0)
                                    for (a == _ + 4 && "f" == Q(t, _ + 1) && "p" == Q(t, _ + 2) && "s" == Q(t, _ + 3) && (f = !0), o = a + 1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o)
                                        if ("," != n && " " != n && "\t" != n) {
                                            var u = O._$LS(t, r, o, e);
                                            e[0] > 0 && f && 5 < u && u < 121 && (i._$D0 = u), o = e[0]
                                        }
                                for (; o < r && ("\n" != Q(t, o) && "\r" != Q(t, o)); ++o);
                            }
                        else
                            for (; o < r && ("\n" != Q(t, o) && "\r" != Q(t, o)); ++o);
                }
                return i._$rr = 1e3 * i._$yT / i._$D0 | 0, i
            }, J.prototype.getDurationMSec = function () {
                return this._$E ? -1 : this._$rr
            }, J.prototype.getLoopDurationMSec = function () {
                return this._$rr
            }, J.prototype.dump = function () {
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t];
                    console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
                    for (var e = 0; e < i._$I0.length && e < 10; e++) console.log("%5.2f ,", i._$I0[e]);
                    console.log("\n")
                }
            }, J.prototype.updateParamExe = function (t, i, e, r) {
                for (var o = i - r._$z2, n = o * this._$D0 / 1e3, s = 0 | n, _ = n - s, a = 0; a < this.motions.length; a++) {
                    var h = this.motions[a],
                        l = h._$I0.length,
                        $ = h._$4P;
                    if (h._$RP == B._$hs) {
                        var u = h._$I0[s >= l ? l - 1 : s];
                        t.setParamFloat($, u)
                    } else if (B._$ws <= h._$rp="" &&="" <="B._$Ys);" else="" {="" var="" p,="" f="t.getParamIndex($)," c="t.getModelContext()," d="c.getParamMax(f)," g="c.getParamMin(f)," y=".4" *="" (d="" -="" g),="" m="c.getParamFloat(f)," t="h._$I0[s">= l ? l - 1 : s],
                            P = h._$I0[s + 1 >= l ? l - 1 : s + 1];
                        p = T < P && P - T > y || T > P && T - P > y ? T : T + (P - T) * _;
                        var S = m + (p - m) * e;
                        t.setParamFloat($, S)
                    }
                }
                s >= this._$yT && (this._$E ? (r._$z2 = i, this.loopFadeIn && (r._$bs = i)) : r._$9L = !0), this._$eP = e
            }, J.prototype._$r0 = function () {
                return this._$E
            }, J.prototype._$aL = function (t) {
                this._$E = t
            }, J.prototype._$S0 = function () {
                return this._$D0
            }, J.prototype._$U0 = function (t) {
                this._$D0 = t
            }, J.prototype.isLoopFadeIn = function () {
                return this.loopFadeIn
            }, J.prototype.setLoopFadeIn = function (t) {
                this.loopFadeIn = t
            }, N.prototype.clear = function () {
                this.size = 0
            }, N.prototype.add = function (t) {
                if (this._$P.length <= 0="" 2="" 3="" this.size)="" {="" var="" i="new" float32array(2="" *="" this.size);="" w._$jt(this._$p,="" 0,="" i,="" this.size),="" this._$p="i" }="" this._$p[this.size++]="t" },="" n.prototype._$bl="function" ()="" t="new" float32array(this.size);="" return="" t,="" b._$fr="0," b._$hs="1," b._$ws="100," b._$ns="101," b._$xs="102," b._$us="103," b._$qs="104," b._$ys="105," z.prototype="new" z._$gt="new" array,="" z.prototype._$zp="function" this._$gs="new" d,="" this._$gs._$zp()="" z.prototype._$f0="function" (t)="" i.prototype._$f0.call(this,="" t),="" this._$a="t._$6L()," this._$o="t._$6L()," this._$eo="t._$nP()," i.prototype.readv2_opacity.call(this,="" t)="" z.prototype.init="function" k(this),="" e="(this._$o" +="" 1)="" (this._$a="" 1);="" null="" !="i._$Cr" &&="" (i._$cr="null)," i._$cr="new" e),="" (i._$hr="null)," this._$32()="" ?="" i._$hr="new" e)="" :="" z.prototype._$nr="function" (t,="" i)="" if="" (this._$gs._$ur(t))="" r="this._$VT()," o="Z._$gT;" o[0]="!1," v._$vr(t,="" this._$gs,="" o,="" r,="" this._$eo,="" e._$cr,="" 2),="" i._$ib(o[0]),="" this.interpolateopacity(t,="" o)="" z.prototype._$2b="function" (e._$hs(!0),="" this._$32())="" (e._$8r="=" i._$ur="" e._$8r="" <="" 0)="" at._$so="" _._$li("_$l="" _$0p="" _$g="" ::="" %s",="" r),="" e._$hs(!1);="" else="" n="t._$q2(e._$8r);" (null="" n._$yo())="" s="n.getTotalScale();" e.settotalscale_notforclient(s);="" a="n.getTotalOpacity();" e.settotalopacity(a="" e.getinterpolatedopacity()),="" o._$nb(t,="" n,="" e._$hr,="" this._$vt(),="" e._$hs(!0)="" e._$hs(!1)="" e.settotalopacity(e.getinterpolatedopacity())="" z.prototype._$nb="function" e,="" s)="" _="i," _._$hr="" _._$cr;="" z.transformpoints_sdk2(e,="" s,="" a,="" this._$o,="" this._$a)="" z.transformpoints_sdk2="function" (i,="" _,="" a)="" for="" (var="" h,="" l,="" $,="" u="r" p="0," f="0," c="0," d="0," g="0," y="0," m="!1," u;="" p,="" v,="" l;="" (v="i[T]," l="i[T" 1],="" ||="" 1;="" (!m)="" (s[2="" (0="" m)]="" s[2="" (_="" m)]),="" m)="" 1]="" 1]);="" -="" m)],="" w="s[2" 1];="" (e="" i),="" (a="" w),="" (c="" g),="" (d="" y)="" (-2="" v="" -2="" 3)="" (l="" x="s[2" c,="" b="p" g,="" y,="" -2),="" -2);="" (e[t]="C" (b="" c)="" u,="" e[t="" (f="" n)="" (r="" u)="" x)="" (1="" b)="" u),="" u))="">= 1) {
                                    var b = s[2 * (0 + a * M)],
                                        F = s[2 * (0 + a * M) + 1],
                                        C = p - 2 * c + 1 * g,
                                        N = f - 2 * d + 1 * y,
                                        x = p + 3 * g,
                                        O = f + 3 * y,
                                        D = p - 2 * c + 3 * g,
                                        R = f - 2 * d + 3 * y,
                                        B = .5 * (v - -2),
                                        U = .5 * (L - 1);
                                    B + U <= 0="" 1="" 2="" 3="" ?="" (e[t]="C" +="" (b="" -="" c)="" *="" b="" (d="" u,="" e[t="" 1]="N" (f="" n)="" (r="" u)="" :="" x)="" (1="" b)="" u),="" o)="" u))="" }="" else="" {="" var="" g="0" |="" s;="" a="" &&="" (g="a" 1);="" (v="" -2),="" u="S" g,="" y="G" a,="" k="(G" 1)="" (0="" m)],="" f="s[2" m)="" 1],="" x="s[2" o="s[2" c="p" n="f" d="" y,="" r="f" y;="" <="1" if="" (l="" (_="" c,="" d,="" 1),="" -2);="">= 1) {
                                    var C = s[2 * (_ + a * M)],
                                        N = s[2 * (_ + a * M) + 1],
                                        b = p + 3 * c + 1 * g,
                                        F = f + 3 * d + 1 * y,
                                        D = p + 1 * c + 3 * g,
                                        R = f + 1 * d + 3 * y,
                                        x = p + 3 * c + 3 * g,
                                        O = f + 3 * d + 3 * y,
                                        B = .5 * (v - 1),
                                        U = .5 * (L - 1);
                                    B + U <= 0="" 1="" 2="" 3="" ?="" (e[t]="C" +="" (b="" -="" c)="" *="" b="" (d="" u,="" e[t="" 1]="N" (f="" n)="" (r="" u)="" :="" x)="" (1="" b)="" u),="" o)="" u))="" }="" else="" {="" var="" g="0" |="" s;="" a="" &&="" (g="a" 1);="" (v="" 1),="" u="S" g,="" y="G" a,="" k="(G" 1)="" c="s[2" (_="" m)],="" n="s[2" m)="" 1],="" d="s[2" r="s[2" f="f" y,="" x="p" o="f" y;="" <="1" if="" (l="" v="0" p;="" _="" v,="" -2),="" _,="" z="(V">= 1) {
                                    var V = 0 | P;
                                    V == _ && (V = _ - 1);
                                    var B = P - V,
                                        U = .5 * (L - 1),
                                        X = V / _,
                                        z = (V + 1) / _,
                                        C = s[2 * (V + a * M)],
                                        N = s[2 * (V + a * M) + 1],
                                        b = s[2 * (V + 1 + a * M)],
                                        F = s[2 * (V + 1 + a * M) + 1],
                                        D = p + X * c + 3 * g,
                                        R = f + X * d + 3 * y,
                                        x = p + z * c + 3 * g,
                                        O = f + z * d + 3 * y;
                                    B + U <= 0="" 1="" 2="" ?="" (e[t]="C" +="" (b="" -="" c)="" *="" b="" (d="" u,="" e[t="" 1]="N" (f="" n)="" (r="" u)="" :="" x)="" (1="" b)="" u),="" o)="" u))="" }="" else="" t.err.printf("_$li="" calc="" %.4f="" ,="" %.4f\t\t\t\t\t@@bdboxgrid\n",="" v,="" l);="" e[t]="p" v="" c="" l="" g,="" d="" y="" (0="" |="" p),="" $="S" s),="" h="2" ((0="" p)="" s)="" (_="" 1)),="" <="" $)="" s[h="" 2]="" 1)]="" $,="" 3]="" 1)="" (l="" l)="" $),="" $))="" },="" z.prototype.transformpoints_sdk1="function" (t,="" i,="" e,="" r,="" o,="" n,="" {="" for="" (var="" _,="" a,="" h,="" l,="" p,="" f="i," g="o" s,="" !="f._$hr" f._$hr="" f._$cr,="" m="n;" g;="" at._$ts="" a="e[m" 1],="" _=""> 1 && (_ = 1), a < 0 ? a = 0 : a > 1 && (a = 1), _ *= c, a *= d, h = 0 | _, l = 0 | a, h > c - 1 && (h = c - 1), l > d - 1 && (l = d - 1), u = _ - h, p = a - l, $ = 2 * (h + l * (c + 1))) : (_ = e[m] * c, a = e[m + 1] * d, u = _ - (0 | _), p = a - (0 | a), $ = 2 * ((0 | _) + (0 | a) * (c + 1))), u + p < 1 ? (r[m] = y[$] * (1 - u - p) + y[$ + 2] * u + y[$ + 2 * (c + 1)] * p, r[m + 1] = y[$ + 1] * (1 - u - p) + y[$ + 3] * u + y[$ + 2 * (c + 1) + 1] * p) : (r[m] = y[$ + 2 * (c + 1) + 2] * (u - 1 + p) + y[$ + 2 * (c + 1)] * (1 - u) + y[$ + 2] * (1 - p), r[m + 1] = y[$ + 2 * (c + 1) + 3] * (u - 1 + p) + y[$ + 2 * (c + 1) + 1] * (1 - u) + y[$ + 3] * (1 - p))
            }, Z.prototype._$VT = function () {
                return (this._$o + 1) * (this._$A + 1)
            }, Z.prototype.getType = function () {
                return I._$_b
            }, K.prototype = new _t, tt._$42 = 0, tt.prototype._$zP = function () {
                this._$3S = new Array, this._$aS = new Array
            }, tt.prototype._$F0 = function (t) {
                this._$g0 = t._$8L(), this.visible = t._$8L(), this._$NL = t._$nP(), this._$3S = t._$nP(), this._$aS = t._$nP()
            }, tt.prototype.init = function (t) {
                var i = new it(this);
                return i.setPartsOpacity(this.isVisible() ? 1 : 0), i
            }, tt.prototype._$6o = function (t) {
                if (null == this._$3S) throw new Error("_$3S _$6 _$Wo@_$6o");
                this._$3S.push(t)
            }, tt.prototype._$3o = function (t) {
                if (null == this._$aS) throw new Error("_$aS _$6 _$Wo@_$3o");
                this._$aS.push(t)
            }, tt.prototype._$Zo = function (t) {
                this._$3S = t
            }, tt.prototype._$xo = function (t) {
                this._$aS = t
            }, tt.prototype.isVisible = function () {
                return this.visible
            }, tt.prototype._$uL = function () {
                return this._$g0
            }, tt.prototype._$KP = function (t) {
                this.visible = t
            }, tt.prototype._$ET = function (t) {
                this._$g0 = t
            }, tt.prototype.getBaseData = function () {
                return this._$3S
            }, tt.prototype.getDrawData = function () {
                return this._$aS
            }, tt.prototype._$p2 = function () {
                return this._$NL
            }, tt.prototype._$ob = function (t) {
                this._$NL = t
            }, tt.prototype.getPartsID = function () {
                return this._$NL
            }, tt.prototype._$MP = function (t) {
                this._$NL = t
            }, it.prototype = new $, it.prototype.getPartsOpacity = function () {
                return this._$VS
            }, it.prototype.setPartsOpacity = function (t) {
                this._$VS = t
            }, et._$L7 = function () {
                u._$27(), yt._$27(), b._$27(), l._$27()
            }, et.prototype.toString = function () {
                return this.id
            }, rt.prototype._$F0 = function (t) { }, ot.prototype._$1s = function () {
                return this._$4S
            }, ot.prototype._$zP = function () {
                this._$4S = new Array
            }, ot.prototype._$F0 = function (t) {
                this._$4S = t._$nP()
            }, ot.prototype._$Ks = function (t) {
                this._$4S.push(t)
            }, nt.tr = new gt, nt._$50 = new gt, nt._$Ti = new Array(0, 0), nt._$Pi = new Array(0, 0), nt._$B = new Array(0, 0), nt.prototype._$lP = function (t, i, e, r) {
                this.viewport = new Array(t, i, e, r)
            }, nt.prototype._$bL = function () {
                this.context.save();
                var t = this.viewport;
                null != t && (this.context.beginPath(), this.context._$Li(t[0], t[1], t[2], t[3]), this.context.clip())
            }, nt.prototype._$ei = function () {
                this.context.restore()
            }, nt.prototype.drawElements = function (t, i, e, r, o, n, s, a) {
                try {
                    o != this._$Qo && (this._$Qo = o, this.context.globalAlpha = o);
                    for (var h = i.length, l = t.width, $ = t.height, u = this.context, p = this._$xP, f = this._$uP, c = this._$6r, d = this._$3r, g = nt.tr, y = nt._$Ti, m = nt._$Pi, T = nt._$B, P = 0; P < h; P += 3) {
                        u.save();
                        var S = i[P],
                            v = i[P + 1],
                            L = i[P + 2],
                            M = p + c * e[2 * S],
                            E = f + d * e[2 * S + 1],
                            A = p + c * e[2 * v],
                            I = f + d * e[2 * v + 1],
                            w = p + c * e[2 * L],
                            x = f + d * e[2 * L + 1];
                        s && (s._$PS(M, E, T), M = T[0], E = T[1], s._$PS(A, I, T), A = T[0], I = T[1], s._$PS(w, x, T), w = T[0], x = T[1]);
                        var O = l * r[2 * S],
                            D = $ - $ * r[2 * S + 1],
                            R = l * r[2 * v],
                            b = $ - $ * r[2 * v + 1],
                            F = l * r[2 * L],
                            C = $ - $ * r[2 * L + 1],
                            N = Math.atan2(b - D, R - O),
                            B = Math.atan2(I - E, A - M),
                            U = A - M,
                            G = I - E,
                            Y = Math.sqrt(U * U + G * G),
                            k = R - O,
                            V = b - D,
                            X = Math.sqrt(k * k + V * V),
                            z = Y / X;
                        It._$ni(F, C, O, D, R - O, b - D, -(b - D), R - O, y), It._$ni(w, x, M, E, A - M, I - E, -(I - E), A - M, m);
                        var H = (m[0] - y[0]) / y[1],
                            W = Math.min(O, R, F),
                            j = Math.max(O, R, F),
                            q = Math.min(D, b, C),
                            J = Math.max(D, b, C),
                            Q = Math.floor(W),
                            Z = Math.floor(q),
                            K = Math.ceil(j),
                            tt = Math.ceil(J);
                        g.identity(), g.translate(M, E), g.rotate(B), g.scale(1, m[1] / y[1]), g.shear(H, 0), g.scale(z, z), g.rotate(-N), g.translate(-O, -D), g.setContext(u);
                        if (n || (n = 1.2), at.IGNORE_EXPAND && (n = 0), at.USE_CACHED_POLYGON_IMAGE) {
                            var it = a._$e0;
                            if (it.gl_cacheImage = it.gl_cacheImage || {}, !it.gl_cacheImage[P]) {
                                var et = nt.createCanvas(K - Q, tt - Z);
                                at.DEBUG_DATA.LDGL_CANVAS_MB = at.DEBUG_DATA.LDGL_CANVAS_MB || 0, at.DEBUG_DATA.LDGL_CANVAS_MB += (K - Q) * (tt - Z) * 4;
                                var rt = et.getContext("2d");
                                rt.translate(-Q, -Z), nt.clip(rt, g, n, Y, O, D, R, b, F, C, M, E, A, I, w, x), rt.drawImage(t, 0, 0), it.gl_cacheImage[P] = {
                                    cacheCanvas: et,
                                    cacheContext: rt
                                }
                            }
                            u.drawImage(it.gl_cacheImage[P].cacheCanvas, Q, Z)
                        } else at.IGNORE_CLIP || nt.clip(u, g, n, Y, O, D, R, b, F, C, M, E, A, I, w, x), at.USE_ADJUST_TRANSLATION && (W = 0, j = l, q = 0, J = $), u.drawImage(t, W, q, j - W, J - q, W, q, j - W, J - q);
                        u.restore()
                    }
                } catch (t) {
                    _._$Rb(t)
                }
            }, nt.clip = function (t, i, e, r, o, n, s, _, a, h, l, $, u, p, f, c) {
                e > .02 ? nt.expandClip(t, i, e, r, l, $, u, p, f, c) : nt.clipWithTransform(t, null, o, n, s, _, a, h)
            }, nt.expandClip = function (t, i, e, r, o, n, s, _, a, h) {
                var l = s - o,
                    $ = _ - n,
                    u = a - o,
                    p = h - n,
                    f = l * p - $ * u > 0 ? e : -e,
                    c = -$,
                    d = l,
                    g = a - s,
                    y = h - _,
                    m = -y,
                    T = g,
                    P = Math.sqrt(g * g + y * y),
                    S = -p,
                    v = u,
                    L = Math.sqrt(u * u + p * p),
                    M = o - f * c / r,
                    E = n - f * d / r,
                    A = s - f * c / r,
                    I = _ - f * d / r,
                    w = s - f * m / P,
                    x = _ - f * T / P,
                    O = a - f * m / P,
                    D = h - f * T / P,
                    R = o + f * S / L,
                    b = n + f * v / L,
                    F = a + f * S / L,
                    C = h + f * v / L,
                    N = nt._$50;
                return null != i._$P2(N) && (nt.clipWithTransform(t, N, M, E, A, I, w, x, O, D, F, C, R, b), !0)
            }, nt.clipWithTransform = function (t, i, e, r, o, n, s, a) {
                if (arguments.length < 7) return void _._$li("err : @LDGL.clip()");
                if (!(arguments[1] instanceof gt)) return void _._$li("err : a[0] is _$6 LDTransform @LDGL.clip()");
                var h = nt._$B,
                    l = i,
                    $ = arguments;
                if (t.beginPath(), l) {
                    l._$PS($[2], $[3], h), t.moveTo(h[0], h[1]);
                    for (var u = 4; u < $.length; u += 2) l._$PS($[u], $[u + 1], h), t.lineTo(h[0], h[1])
                } else {
                    t.moveTo($[2], $[3]);
                    for (var u = 4; u < $.length; u += 2) t.lineTo($[u], $[u + 1])
                }
                t.clip()
            }, nt.createCanvas = function (t, i) {
                var e = document.createElement("canvas");
                return e.setAttribute("width", t), e.setAttribute("height", i), e || _._$li("err : " + e), e
            }, nt.dumpValues = function () {
                for (var t = "", i = 0; i < arguments.length; i++) t += "[" + i + "]= " + arguments[i].toFixed(3) + " , ";
                console.log(t)
            }, st.prototype._$F0 = function (t) {
                this._$TT = t._$_T(), this._$LT = t._$_T(), this._$FS = t._$_T(), this._$wL = t._$nP()
            }, st.prototype.getMinValue = function () {
                return this._$TT
            }, st.prototype.getMaxValue = function () {
                return this._$LT
            }, st.prototype.getDefaultValue = function () {
                return this._$FS
            }, st.prototype.getParamID = function () {
                return this._$wL
            }, _t.prototype._$yo = function () {
                return this._$AT && !this._$JS
            }, _t.prototype._$hS = function (t) {
                this._$AT = t
            }, _t.prototype._$GT = function () {
                return this._$e0
            }, _t.prototype._$l2 = function (t) {
                this._$IP = t
            }, _t.prototype.getPartsIndex = function () {
                return this._$IP
            }, _t.prototype._$x2 = function () {
                return this._$JS
            }, _t.prototype._$Ib = function (t) {
                this._$JS = t
            }, _t.prototype.getTotalScale = function () {
                return this.totalScale
            }, _t.prototype.setTotalScale_notForClient = function (t) {
                this.totalScale = t
            }, _t.prototype.getInterpolatedOpacity = function () {
                return this._$7s
            }, _t.prototype.setInterpolatedOpacity = function (t) {
                this._$7s = t
            }, _t.prototype.getTotalOpacity = function (t) {
                return this.totalOpacity
            }, _t.prototype.setTotalOpacity = function (t) {
                this.totalOpacity = t
            }, at._$2s = "2.1.00_1", at._$Kr = 201001e3, at._$sP = !0, at._$so = !0, at._$cb = !1, at._$3T = !0, at._$Ts = !0, at._$fb = !0, at._$ts = !0, at.L2D_DEFORMER_EXTEND = !0, at._$Wb = !1;
            at._$yr = !1, at._$Zs = !1, at.L2D_NO_ERROR = 0, at._$i7 = 1e3, at._$9s = 1001, at._$es = 1100, at._$r7 = 2e3, at._$07 = 2001, at._$b7 = 2002, at._$H7 = 4e3, at.L2D_COLOR_BLEND_MODE_MULT = 0, at.L2D_COLOR_BLEND_MODE_ADD = 1, at.L2D_COLOR_BLEND_MODE_INTERPOLATE = 2, at._$6b = !0, at._$cT = 0, at.clippingMaskBufferSize = 256, at.glContext = new Array, at.frameBuffers = new Array, at.fTexture = new Array, at.IGNORE_CLIP = !1, at.IGNORE_EXPAND = !1, at.EXPAND_W = 2, at.USE_ADJUST_TRANSLATION = !0, at.USE_CANVAS_TRANSFORM = !0, at.USE_CACHED_POLYGON_IMAGE = !1, at.DEBUG_DATA = {}, at.PROFILE_IOS_SPEED = {
                PROFILE_NAME: "iOS Speed",
                USE_ADJUST_TRANSLATION: !0,
                USE_CACHED_POLYGON_IMAGE: !0,
                EXPAND_W: 4
            }, at.PROFILE_IOS_QUALITY = {
                PROFILE_NAME: "iOS HiQ",
                USE_ADJUST_TRANSLATION: !0,
                USE_CACHED_POLYGON_IMAGE: !1,
                EXPAND_W: 2
            }, at.PROFILE_IOS_DEFAULT = at.PROFILE_IOS_QUALITY, at.PROFILE_ANDROID = {
                PROFILE_NAME: "Android",
                USE_ADJUST_TRANSLATION: !1,
                USE_CACHED_POLYGON_IMAGE: !1,
                EXPAND_W: 2
            }, at.PROFILE_DESKTOP = {
                PROFILE_NAME: "Desktop",
                USE_ADJUST_TRANSLATION: !1,
                USE_CACHED_POLYGON_IMAGE: !1,
                EXPAND_W: 2
            }, at.initProfile = function () {
                Et.isIOS() ? at.setupProfile(at.PROFILE_IOS_DEFAULT) : Et.isAndroid() ? at.setupProfile(at.PROFILE_ANDROID) : at.setupProfile(at.PROFILE_DESKTOP)
            }, at.setupProfile = function (t, i) {
                if ("number" == typeof t) switch (t) {
                    case 9901:
                        t = at.PROFILE_IOS_SPEED;
                        break;
                    case 9902:
                        t = at.PROFILE_IOS_QUALITY;
                        break;
                    case 9903:
                        t = at.PROFILE_IOS_DEFAULT;
                        break;
                    case 9904:
                        t = at.PROFILE_ANDROID;
                        break;
                    case 9905:
                        t = at.PROFILE_DESKTOP;
                        break;
                    default:
                        alert("profile _$6 _$Ui : " + t)
                }
                arguments.length < 2 && (i = !0), i && console.log("profile : " + t.PROFILE_NAME);
                for (var e in t) at[e] = t[e], i && console.log("  [" + e + "] = " + t[e])
            }, at.init = function () {
                if (at._$6b) {
                    console.log("Live2D %s", at._$2s), at._$6b = !1;
                    !0, at.initProfile()
                }
            }, at.getVersionStr = function () {
                return at._$2s
            }, at.getVersionNo = function () {
                return at._$Kr
            }, at._$sT = function (t) {
                at._$cT = t
            }, at.getError = function () {
                var t = at._$cT;
                return at._$cT = 0, t
            }, at.dispose = function () {
                at.glContext = [], at.frameBuffers = [], at.fTexture = []
            }, at.setGL = function (t, i) {
                var e = i || 0;
                at.glContext[e] = t
            }, at.getGL = function (t) {
                return at.glContext[t]
            }, at.setClippingMaskBufferSize = function (t) {
                at.clippingMaskBufferSize = t
            }, at.getClippingMaskBufferSize = function () {
                return at.clippingMaskBufferSize
            }, at.deleteBuffer = function (t) {
                at.getGL(t).deleteFramebuffer(at.frameBuffers[t].framebuffer), delete at.frameBuffers[t], delete at.glContext[t]
            }, ht._$r2 = function (t) {
                return t < 0 ? 0 : t > 1 ? 1 : .5 - .5 * Math.cos(t * Lt.PI_F)
            }, lt._$fr = -1, lt.prototype.toString = function () {
                return this._$ib
            }, $t.prototype = new W, $t._$42 = 0, $t._$Os = 30, $t._$ms = 0, $t._$ns = 1, $t._$_s = 2, $t._$gT = new Array, $t.prototype._$_S = function (t) {
                this._$LP = t
            }, $t.prototype.getTextureNo = function () {
                return this._$LP
            }, $t.prototype._$ZL = function () {
                return this._$Qi
            }, $t.prototype._$H2 = function () {
                return this._$JP
            }, $t.prototype.getNumPoints = function () {
                return this._$d0
            }, $t.prototype.getType = function () {
                return W._$wb
            }, $t.prototype._$B2 = function (t, i, e) {
                var r = i,
                    o = null != r._$hr ? r._$hr : r._$Cr;
                switch (U._$do) {
                    default:
                    case U._$Ms:
                        throw new Error("_$L _$ro ");
                    case U._$Qs:
                        for (var n = this._$d0 - 1; n >= 0; --n) o[n * U._$No + 4] = e
                }
            }, $t.prototype._$zP = function () {
                this._$GS = new D, this._$GS._$zP()
            }, $t.prototype._$F0 = function (t) {
                W.prototype._$F0.call(this, t), this._$LP = t._$6L(), this._$d0 = t._$6L(), this._$Yo = t._$6L();
                var i = t._$nP();
                this._$BP = new Int16Array(3 * this._$Yo);
                for (var e = 3 * this._$Yo - 1; e >= 0; --e) this._$BP[e] = i[e];
                if (this._$Eo = t._$nP(), this._$Qi = t._$nP(), t.getFormatVersion() >= G._$s7) {
                    if (this._$JP = t._$6L(), 0 != this._$JP) {
                        if (0 != (1 & this._$JP)) {
                            var r = t._$6L();
                            null == this._$5P && (this._$5P = new Object), this._$5P._$Hb = parseInt(r)
                        }
                        0 != (this._$JP & $t._$Os) ? this._$6s = (this._$JP & $t._$Os) >> 1 : this._$6s = $t._$ms, 0 != (32 & this._$JP) && (this.culling = !1)
                    }
                } else this._$JP = 0
            }, $t.prototype.init = function (t) {
                var i = new ut(this),
                    e = this._$d0 * U._$No,
                    r = this._$32();
                switch (null != i._$Cr && (i._$Cr = null), i._$Cr = new Float32Array(e), null != i._$hr && (i._$hr = null), i._$hr = r ? new Float32Array(e) : null, U._$do) {
                    default:
                    case U._$Ms:
                        if (U._$Ls)
                            for (var o = this._$d0 - 1; o >= 0; --o) {
                                var n = o << 1;
                                this._$Qi[n + 1] = 1 - this._$Qi[n + 1]
                            }
                        break;
                    case U._$Qs:
                        for (var o = this._$d0 - 1; o >= 0; --o) {
                            var n = o << 1,
                                s = o * U._$No,
                                _ = this._$Qi[n],
                                a = this._$Qi[n + 1];
                            i._$Cr[s] = _, i._$Cr[s + 1] = a, i._$Cr[s + 4] = 0, r && (i._$hr[s] = _, i._$hr[s + 1] = a, i._$hr[s + 4] = 0)
                        }
                }
                return i
            }, $t.prototype._$Nr = function (t, i) {
                var e = i;
                if (this != e._$GT() && console.log("### assert!! ### "), this._$GS._$Ur(t) && (W.prototype._$Nr.call(this, t, e), !e._$IS[0])) {
                    var r = $t._$gT;
                    r[0] = !1, v._$Vr(t, this._$GS, r, this._$d0, this._$Eo, e._$Cr, U._$i2, U._$No)
                }
            }, $t.prototype._$2b = function (t, i) {
                try {
                    this != i._$GT() && console.log("### assert!! ### ");
                    var e = !1;
                    i._$IS[0] && (e = !0);
                    var r = i;
                    if (!e && (W.prototype._$2b.call(this, t), this._$32())) {
                        var o = this.getTargetBaseDataID();
                        if (r._$8r == W._$ur && (r._$8r = t.getBaseDataIndex(o)), r._$8r < 0) at._$so && _._$li("_$L _$0P _$G :: %s", o);
                        else {
                            var n = t.getBaseData(r._$8r),
                                s = t._$q2(r._$8r);
                            null == n || s._$x2() ? r._$AT = !1 : (n._$nb(t, s, r._$Cr, r._$hr, this._$d0, U._$i2, U._$No), r._$AT = !0), r.baseOpacity = s.getTotalOpacity()
                        }
                    }
                } catch (t) {
                    throw t
                }
            }, $t.prototype.draw = function (t, i, e) {
                if (this != e._$GT() && console.log("### assert!! ### "), !e._$IS[0]) {
                    var r = e,
                        o = this._$LP;
                    o < 0 && (o = 1);
                    var n = this.getOpacity(i, r) * e._$VS * e.baseOpacity,
                        s = null != r._$hr ? r._$hr : r._$Cr;
                    t.setClipBufPre_clipContextForDraw(e.clipBufPre_clipContext), t._$WP(this.culling), t._$Uo(o, 3 * this._$Yo, this._$BP, s, this._$Qi, n, this._$6s, r)
                }
            }, $t.prototype.dump = function () {
                console.log("  _$yi( %d ) , _$d0( %d ) , _$Yo( %d ) \n", this._$LP, this._$d0, this._$Yo), console.log("  _$Oi _$di = { ");
                for (var t = 0; t < this._$BP.length; t++) console.log("%5d ,", this._$BP[t]);
                console.log("\n  _$5i _$30");
                for (var t = 0; t < this._$Eo.length; t++) {
                    console.log("\n    _$30[%d] = ", t);
                    for (var i = this._$Eo[t], e = 0; e < i.length; e++) console.log("%6.2f, ", i[e])
                }
                console.log("\n")
            }, $t.prototype._$72 = function (t) {
                return null == this._$5P ? null : this._$5P[t]
            }, $t.prototype.getIndexArray = function () {
                return this._$BP
            }, ut.prototype = new Mt, ut.prototype.getTransformedPoints = function () {
                return null != this._$hr ? this._$hr : this._$Cr
            }, pt.prototype._$HT = function (t) {
                this.x = t.x, this.y = t.y
            }, pt.prototype._$HT = function (t, i) {
                this.x = t, this.y = i
            }, ft.prototype = new i, ft.loadModel = function (t) {
                var e = new ft;
                return i._$62(e, t), e
            }, ft.loadModel = function (t, e) {
                var r = e || 0,
                    o = new ft(r);
                return i._$62(o, t), o
            }, ft._$to = function () {
                return new ft
            }, ft._$er = function (t) {
                var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
                if (0 == i.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
                for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = ft.loadModel(i._$3b()), o = 0; o < e.length; o++) {
                    var n = new _$5(e[o]);
                    if (0 == n.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
                    r.setTexture(o, _$nL._$_o(t, n._$3b()))
                }
                return r
            }, ft.prototype.setGL = function (t) {
                at.setGL(t)
            }, ft.prototype.setTransform = function (t) {
                this.drawParamWebGL.setTransform(t)
            }, ft.prototype.update = function () {
                this._$5S.update(), this._$5S.preDraw(this.drawParamWebGL)
            }, ft.prototype.draw = function () {
                this._$5S.draw(this.drawParamWebGL)
            }, ft.prototype._$K2 = function () {
                this.drawParamWebGL._$K2()
            }, ft.prototype.setTexture = function (t, i) {
                null == this.drawParamWebGL && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(t, i)
            }, ft.prototype.setTexture = function (t, i) {
                null == this.drawParamWebGL && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(t, i)
            }, ft.prototype._$Rs = function () {
                return this.drawParamWebGL._$Rs()
            }, ft.prototype._$Ds = function (t) {
                this.drawParamWebGL._$Ds(t)
            }, ft.prototype.getDrawParam = function () {
                return this.drawParamWebGL
            }, ft.prototype.setMatrix = function (t) {
                this.drawParamWebGL.setMatrix(t)
            }, ft.prototype.setPremultipliedAlpha = function (t) {
                this.drawParamWebGL.setPremultipliedAlpha(t)
            }, ft.prototype.isPremultipliedAlpha = function () {
                return this.drawParamWebGL.isPremultipliedAlpha()
            }, ft.prototype.setAnisotropy = function (t) {
                this.drawParamWebGL.setAnisotropy(t)
            }, ft.prototype.getAnisotropy = function () {
                return this.drawParamWebGL.getAnisotropy()
            }, ct.prototype._$tb = function () {
                return this.motions
            }, ct.prototype.startMotion = function (t, i) {
                for (var e = null, r = this.motions.length, o = 0; o < r; ++o) null != (e = this.motions[o]) && (e._$qS(e._$w0.getFadeOut()), this._$eb && _._$Ji("MotionQueueManager[size:%2d]->startMotion() / start _$K _$3 (m%d)\n", r, e._$sr));
                if (null == t) return -1;
                e = new dt, e._$w0 = t, this.motions.push(e);
                var n = e._$sr;
                return this._$eb && _._$Ji("MotionQueueManager[size:%2d]->startMotion() / new _$w0 (m%d)\n", r, n), n
            }, ct.prototype.updateParam = function (t) {
                try {
                    for (var i = !1, e = 0; e < this.motions.length; e++) {
                        var r = this.motions[e];
                        if (null != r) {
                            var o = r._$w0;
                            null != o ? (o.updateParam(t, r), i = !0, r.isFinished() && (this._$eb && _._$Ji("MotionQueueManager[size:%2d]->updateParam() / _$T0 _$w0 (m%d)\n", this.motions.length - 1, r._$sr), this.motions.splice(e, 1), e--)) : (this.motions = this.motions.splice(e, 1), e--)
                        } else this.motions.splice(e, 1), e--
                    }
                    return i
                } catch (t) {
                    return _._$li(t), !0
                }
            }, ct.prototype.isFinished = function (t) {
                if (arguments.length >= 1) {
                    for (var i = 0; i < this.motions.length; i++) {
                        var e = this.motions[i];
                        if (null != e && (e._$sr == t && !e.isFinished())) return !1
                    }
                    return !0
                }
                for (var i = 0; i < this.motions.length; i++) {
                    var e = this.motions[i];
                    if (null != e) {
                        if (null != e._$w0) {
                            if (!e.isFinished()) return !1
                        } else this.motions.splice(i, 1), i--
                    } else this.motions.splice(i, 1), i--
                }
                return !0
            }, ct.prototype.stopAllMotions = function () {
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t];
                    if (null != i) {
                        i._$w0;
                        this.motions.splice(t, 1), t--
                    } else this.motions.splice(t, 1), t--
                }
            }, ct.prototype._$Zr = function (t) {
                this._$eb = t
            }, ct.prototype._$e = function () {
                console.log("-- _$R --\n");
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t],
                        e = i._$w0;
                    console.log("MotionQueueEnt[%d] :: %s\n", this.motions.length, e.toString())
                }
            }, dt._$Gs = 0, dt.prototype.isFinished = function () {
                return this._$9L
            }, dt.prototype._$qS = function (t) {
                var i = w.getUserTimeMSec(),
                    e = i + t;
                (this._$Do < 0 || e < this._$Do) && (this._$Do = e)
            }, dt.prototype._$Bs = function () {
                return this._$sr
            }, gt.prototype.setContext = function (t) {
                var i = this.m;
                t.transform(i[0], i[1], i[3], i[4], i[6], i[7])
            }, gt.prototype.toString = function () {
                for (var t = "LDTransform { ", i = 0; i < 9; i++) t += this.m[i].toFixed(2) + " ,";
                return t += " }"
            }, gt.prototype.identity = function () {
                var t = this.m;
                t[0] = t[4] = t[8] = 1, t[1] = t[2] = t[3] = t[5] = t[6] = t[7] = 0
            }, gt.prototype._$PS = function (t, i, e) {
                null == e && (e = new Array(0, 0));
                var r = this.m;
                return e[0] = r[0] * t + r[3] * i + r[6], e[1] = r[1] * t + r[4] * i + r[7], e
            }, gt.prototype._$P2 = function (t) {
                t || (t = new gt);
                var i = this.m,
                    e = i[0],
                    r = i[1],
                    o = i[2],
                    n = i[3],
                    s = i[4],
                    _ = i[5],
                    a = i[6],
                    h = i[7],
                    l = i[8],
                    $ = e * s * l + r * _ * a + o * n * h - e * _ * h - o * s * a - r * n * l;
                if (0 == $) return null;
                var u = 1 / $;
                return t.m[0] = u * (s * l - h * _), t.m[1] = u * (h * o - r * l), t.m[2] = u * (r * _ - s * o), t.m[3] = u * (a * _ - n * l), t.m[4] = u * (e * l - a * o), t.m[5] = u * (n * o - e * _), t.m[6] = u * (n * h - a * s), t.m[7] = u * (a * r - e * h), t.m[8] = u * (e * s - n * r), t
            }, gt.prototype.transform = function (t, i, e) {
                null == e && (e = new Array(0, 0));
                var r = this.m;
                return e[0] = r[0] * t + r[3] * i + r[6], e[1] = r[1] * t + r[4] * i + r[7], e
            }, gt.prototype.translate = function (t, i) {
                var e = this.m;
                e[6] = e[0] * t + e[3] * i + e[6], e[7] = e[1] * t + e[4] * i + e[7], e[8] = e[2] * t + e[5] * i + e[8]
            }, gt.prototype.scale = function (t, i) {
                var e = this.m;
                e[0] *= t, e[1] *= t, e[2] *= t, e[3] *= i, e[4] *= i, e[5] *= i
            }, gt.prototype.shear = function (t, i) {
                var e = this.m,
                    r = e[0] + e[3] * i,
                    o = e[1] + e[4] * i,
                    n = e[2] + e[5] * i;
                e[3] = e[0] * t + e[3], e[4] = e[1] * t + e[4], e[5] = e[2] * t + e[5], e[0] = r, e[1] = o, e[2] = n
            }, gt.prototype.rotate = function (t) {
                var i = this.m,
                    e = Math.cos(t),
                    r = Math.sin(t),
                    o = i[0] * e + i[3] * r,
                    n = i[1] * e + i[4] * r,
                    s = i[2] * e + i[5] * r;
                i[3] = -i[0] * r + i[3] * e, i[4] = -i[1] * r + i[4] * e, i[5] = -i[2] * r + i[5] * e, i[0] = o, i[1] = n, i[2] = s
            }, gt.prototype.concatenate = function (t) {
                var i = this.m,
                    e = t.m,
                    r = i[0] * e[0] + i[3] * e[1] + i[6] * e[2],
                    o = i[1] * e[0] + i[4] * e[1] + i[7] * e[2],
                    n = i[2] * e[0] + i[5] * e[1] + i[8] * e[2],
                    s = i[0] * e[3] + i[3] * e[4] + i[6] * e[5],
                    _ = i[1] * e[3] + i[4] * e[4] + i[7] * e[5],
                    a = i[2] * e[3] + i[5] * e[4] + i[8] * e[5],
                    h = i[0] * e[6] + i[3] * e[7] + i[6] * e[8],
                    l = i[1] * e[6] + i[4] * e[7] + i[7] * e[8],
                    $ = i[2] * e[6] + i[5] * e[7] + i[8] * e[8];
                m[0] = r, m[1] = o, m[2] = n, m[3] = s, m[4] = _, m[5] = a, m[6] = h, m[7] = l, m[8] = $
            }, yt.prototype = new et, yt._$eT = null, yt._$tP = new Object, yt._$2o = function () {
                return null == yt._$eT && (yt._$eT = yt.getID("DST_BASE")), yt._$eT
            }, yt._$27 = function () {
                yt._$tP.clear(), yt._$eT = null
            }, yt.getID = function (t) {
                var i = yt._$tP[t];
                return null == i && (i = new yt(t), yt._$tP[t] = i), i
            }, yt.prototype._$3s = function () {
                return new yt
            }, mt.prototype = new E, mt._$9r = function (t) {
                return new Float32Array(t)
            }, mt._$vb = function (t) {
                return new Int16Array(t)
            }, mt._$cr = function (t, i) {
                return null == t || t._$yL() < i.length ? (t = mt._$9r(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
            }, mt._$mb = function (t, i) {
                return null == t || t._$yL() < i.length ? (t = mt._$vb(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
            }, mt._$Hs = function () {
                return this._$Gr
            }, mt._$as = function (t) {
                this._$Gr = t
            }, mt.prototype.getGL = function () {
                return this.gl
            }, mt.prototype.setGL = function (t) {
                this.gl = t
            }, mt.prototype.setTransform = function (t) {
                this.transform = t
            }, mt.prototype._$ZT = function () {
                var t = this.gl;
                this.firstDraw && (this.initShader(), this.firstDraw = !1, this.anisotropyExt = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic"), this.anisotropyExt && (this.maxAnisotropy = t.getParameter(this.anisotropyExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT))), t.disable(t.SCISSOR_TEST), t.disable(t.STENCIL_TEST), t.disable(t.DEPTH_TEST), t.frontFace(t.CW), t.enable(t.BLEND), t.colorMask(1, 1, 1, 1), t.bindBuffer(t.ARRAY_BUFFER, null), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null)
            }, mt.prototype._$Uo = function (t, i, e, r, o, n, s, _) {
                if (!(n < .01 && null == this.clipBufPre_clipContextMask)) {
                    var a = (n > .9 && at.EXPAND_W, this.gl);
                    if (null == this.gl) throw new Error("gl is null");
                    var h = 1 * this._$C0 * n,
                        l = 1 * this._$tT * n,
                        $ = 1 * this._$WL * n,
                        u = this._$lT * n;
                    if (null != this.clipBufPre_clipContextMask) {
                        a.frontFace(a.CCW), a.useProgram(this.shaderProgram), this._$vS = Tt(a, this._$vS, r), this._$no = Pt(a, this._$no, e), a.enableVertexAttribArray(this.a_position_Loc), a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0), this._$NT = Tt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc, 1), a.enableVertexAttribArray(this.a_texCoord_Loc), a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.getClipBufPre_clipContextMask().matrixForMask);
                        var p = this.getClipBufPre_clipContextMask().layoutChannelNo,
                            f = this.getChannelFlagAsColor(p);
                        a.uniform4f(this.u_channelFlag, f.r, f.g, f.b, f.a);
                        var c = this.getClipBufPre_clipContextMask().layoutBounds;
                        a.uniform4f(this.u_baseColor_Loc, 2 * c.x - 1, 2 * c.y - 1, 2 * c._$EL() - 1, 2 * c._$5T() - 1), a.uniform1i(this.u_maskFlag_Loc, !0)
                    } else if (null != this.getClipBufPre_clipContextDraw()) {
                        a.useProgram(this.shaderProgramOff), this._$vS = Tt(a, this._$vS, r), this._$no = Pt(a, this._$no, e), a.enableVertexAttribArray(this.a_position_Loc_Off), a.vertexAttribPointer(this.a_position_Loc_Off, 2, a.FLOAT, !1, 0, 0), this._$NT = Tt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc_Off, 1), a.enableVertexAttribArray(this.a_texCoord_Loc_Off), a.vertexAttribPointer(this.a_texCoord_Loc_Off, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_clipMatrix_Loc_Off, !1, this.getClipBufPre_clipContextDraw().matrixForDraw), a.uniformMatrix4fv(this.u_matrix_Loc_Off, !1, this.matrix4x4), a.activeTexture(a.TEXTURE2), a.bindTexture(a.TEXTURE_2D, at.fTexture[this.glno]), a.uniform1i(this.s_texture1_Loc_Off, 2);
                        var p = this.getClipBufPre_clipContextDraw().layoutChannelNo,
                            f = this.getChannelFlagAsColor(p);
                        a.uniform4f(this.u_channelFlag_Loc_Off, f.r, f.g, f.b, f.a), a.uniform4f(this.u_baseColor_Loc_Off, h, l, $, u)
                    } else a.useProgram(this.shaderProgram), this._$vS = Tt(a, this._$vS, r), this._$no = Pt(a, this._$no, e), a.enableVertexAttribArray(this.a_position_Loc), a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0), this._$NT = Tt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc, 1), a.enableVertexAttribArray(this.a_texCoord_Loc), a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.matrix4x4), a.uniform4f(this.u_baseColor_Loc, h, l, $, u), a.uniform1i(this.u_maskFlag_Loc, !1);
                    this.culling ? this.gl.enable(a.CULL_FACE) : this.gl.disable(a.CULL_FACE), this.gl.enable(a.BLEND);
                    var d, g, y, m;
                    if (null != this.clipBufPre_clipContextMask) d = a.ONE, g = a.ONE_MINUS_SRC_ALPHA, y = a.ONE, m = a.ONE_MINUS_SRC_ALPHA;
                    else switch (s) {
                        case $t._$ms:
                            d = a.ONE, g = a.ONE_MINUS_SRC_ALPHA, y = a.ONE, m = a.ONE_MINUS_SRC_ALPHA;
                            break;
                        case $t._$ns:
                            d = a.ONE, g = a.ONE, y = a.ZERO, m = a.ONE;
                            break;
                        case $t._$_s:
                            d = a.DST_COLOR, g = a.ONE_MINUS_SRC_ALPHA, y = a.ZERO, m = a.ONE
                    }
                    a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(d, g, y, m), this.anisotropyExt && a.texParameteri(a.TEXTURE_2D, this.anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
                    var T = e.length;
                    a.drawElements(a.TRIANGLES, T, a.UNSIGNED_SHORT, 0), a.bindTexture(a.TEXTURE_2D, null)
                }
            }, mt.prototype._$Rs = function () {
                throw new Error("_$Rs")
            }, mt.prototype._$Ds = function (t) {
                throw new Error("_$Ds")
            }, mt.prototype._$K2 = function () {
                for (var t = 0; t < this.textures.length; t++) {
                    0 != this.textures[t] && (this.gl._$K2(1, this.textures, t), this.textures[t] = null)
                }
            }, mt.prototype.setTexture = function (t, i) {
                this.textures[t] = i
            }, mt.prototype.initShader = function () {
                var t = this.gl;
                this.loadShaders2(), this.a_position_Loc = t.getAttribLocation(this.shaderProgram, "a_position"), this.a_texCoord_Loc = t.getAttribLocation(this.shaderProgram, "a_texCoord"), this.u_matrix_Loc = t.getUniformLocation(this.shaderProgram, "u_mvpMatrix"), this.s_texture0_Loc = t.getUniformLocation(this.shaderProgram, "s_texture0"), this.u_channelFlag = t.getUniformLocation(this.shaderProgram, "u_channelFlag"), this.u_baseColor_Loc = t.getUniformLocation(this.shaderProgram, "u_baseColor"), this.u_maskFlag_Loc = t.getUniformLocation(this.shaderProgram, "u_maskFlag"), this.a_position_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_position"), this.a_texCoord_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_texCoord"), this.u_matrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_mvpMatrix"), this.u_clipMatrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_ClipMatrix"), this.s_texture0_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture0"), this.s_texture1_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture1"), this.u_channelFlag_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_channelFlag"), this.u_baseColor_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_baseColor")
            }, mt.prototype.disposeShader = function () {
                var t = this.gl;
                this.shaderProgram && (t.deleteProgram(this.shaderProgram), this.shaderProgram = null), this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = null)
            }, mt.prototype.compileShader = function (t, i) {
                var e = this.gl,
                    r = i,
                    o = e.createShader(t);
                if (null == o) return _._$Ji("_$L0 to create shader"), null;
                if (e.shaderSource(o, r), e.compileShader(o), !e.getShaderParameter(o, e.COMPILE_STATUS)) {
                    var n = e.getShaderInfoLog(o);
                    return _._$Ji("_$L0 to compile shader : " + n), e.deleteShader(o), null
                }
                return o
            }, mt.prototype.loadShaders2 = function () {
                var t = this.gl;
                if (this.shaderProgram = t.createProgram(), !this.shaderProgram) return !1;
                if (this.shaderProgramOff = t.createProgram(), !this.shaderProgramOff) return !1;
                if (this.vertShader = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_mvpMatrix * a_position;    v_texCoord = a_texCoord;}"), !this.vertShader) return _._$Ji("Vertex shader compile _$li!"), !1;
                if (this.vertShaderOff = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;uniform mat4       u_ClipMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_ClipMatrix * a_position;    v_texCoord = a_texCoord ;}"), !this.vertShaderOff) return _._$Ji("OffVertex shader compile _$li!"), !1;
                if (this.fragShader = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform vec4       u_channelFlag;uniform vec4       u_baseColor;uniform bool       u_maskFlag;void main(){    vec4 smpColor;     if(u_maskFlag){        float isInside =             step(u_baseColor.x, v_ClipPos.x/v_ClipPos.w)          * step(u_baseColor.y, v_ClipPos.y/v_ClipPos.w)          * step(v_ClipPos.x/v_ClipPos.w, u_baseColor.z)          * step(v_ClipPos.y/v_ClipPos.w, u_baseColor.w);        smpColor = u_channelFlag * texture2D(s_texture0 , v_texCoord).a * isInside;    }else{        smpColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;    }    gl_FragColor = smpColor;}"), !this.fragShader) return _._$Ji("Fragment shader compile _$li!"), !1;
                if (this.fragShaderOff = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float ;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_channelFlag;uniform vec4       u_baseColor ;void main(){    vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;    vec4 clipMask = texture2D(s_texture1, v_ClipPos.xy / v_ClipPos.w) * u_channelFlag;    float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;    col_formask = col_formask * maskVal;    gl_FragColor = col_formask;}"), !this.fragShaderOff) return _._$Ji("OffFragment shader compile _$li!"), !1;
                if (t.attachShader(this.shaderProgram, this.vertShader), t.attachShader(this.shaderProgram, this.fragShader), t.attachShader(this.shaderProgramOff, this.vertShaderOff), t.attachShader(this.shaderProgramOff, this.fragShaderOff), t.linkProgram(this.shaderProgram), t.linkProgram(this.shaderProgramOff), !t.getProgramParameter(this.shaderProgram, t.LINK_STATUS)) {
                    var i = t.getProgramInfoLog(this.shaderProgram);
                    return _._$Ji("_$L0 to link program: " + i), this.vertShader && (t.deleteShader(this.vertShader), this.vertShader = 0), this.fragShader && (t.deleteShader(this.fragShader), this.fragShader = 0), this.shaderProgram && (t.deleteProgram(this.shaderProgram), this.shaderProgram = 0), this.vertShaderOff && (t.deleteShader(this.vertShaderOff), this.vertShaderOff = 0), this.fragShaderOff && (t.deleteShader(this.fragShaderOff), this.fragShaderOff = 0), this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = 0), !1
                }
                return !0
            }, mt.prototype.createFramebuffer = function () {
                var t = this.gl,
                    i = at.clippingMaskBufferSize,
                    e = t.createFramebuffer();
                t.bindFramebuffer(t.FRAMEBUFFER, e);
                var r = t.createRenderbuffer();
                t.bindRenderbuffer(t.RENDERBUFFER, r), t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, i, i), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.RENDERBUFFER, r);
                var o = t.createTexture();
                return t.bindTexture(t.TEXTURE_2D, o), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, i, i, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, o, 0), t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), at.fTexture[this.glno] = o, {
                    framebuffer: e,
                    renderbuffer: r,
                    texture: at.fTexture[this.glno]
                }
            }, St.prototype._$fP = function () {
                var t, i, e, r = this._$ST();
                if (0 == (128 & r)) return 255 & r;
                if (0 == (128 & (t = this._$ST()))) return (127 & r) << 7 | 127 & t;
                if (0 == (128 & (i = this._$ST()))) return (127 & r) << 14 | (127 & t) << 7 | 255 & i;
                if (0 == (128 & (e = this._$ST()))) return (127 & r) << 21 | (127 & t) << 14 | (127 & i) << 7 | 255 & e;
                throw new lt("_$L _$0P  _")
            }, St.prototype.getFormatVersion = function () {
                return this._$S2
            }, St.prototype._$gr = function (t) {
                this._$S2 = t
            }, St.prototype._$3L = function () {
                return this._$fP()
            }, St.prototype._$mP = function () {
                return this._$zT(), this._$F += 8, this._$T.getFloat64(this._$F - 8)
            }, St.prototype._$_T = function () {
                return this._$zT(), this._$F += 4, this._$T.getFloat32(this._$F - 4)
            }, St.prototype._$6L = function () {
                return this._$zT(), this._$F += 4, this._$T.getInt32(this._$F - 4)
            }, St.prototype._$ST = function () {
                return this._$zT(), this._$T.getInt8(this._$F++)
            }, St.prototype._$9T = function () {
                return this._$zT(), this._$F += 2, this._$T.getInt16(this._$F - 2)
            }, St.prototype._$2T = function () {
                throw this._$zT(), this._$F += 8, new lt("_$L _$q read long")
            }, St.prototype._$po = function () {
                return this._$zT(), 0 != this._$T.getInt8(this._$F++)
            };
            var xt = !0;
            St.prototype._$bT = function () {
                this._$zT();
                var t = this._$3L(),
                    i = null;
                if (xt) try {
                    var e = new ArrayBuffer(2 * t);
                    i = new Uint16Array(e);
                    for (var r = 0; r < t; ++r) i[r] = this._$T.getUint8(this._$F++);
                    return String.fromCharCode.apply(null, i)
                } catch (t) {
                    xt = !1
                }
                try {
                    var o = new Array;
                    if (null == i)
                        for (var r = 0; r < t; ++r) o[r] = this._$T.getUint8(this._$F++);
                    else
                        for (var r = 0; r < t; ++r) o[r] = i[r];
                    return String.fromCharCode.apply(null, o)
                } catch (t) {
                    console.log("read utf8 / _$rT _$L0 !! : " + t)
                }
            }, St.prototype._$cS = function () {
                this._$zT();
                for (var t = this._$3L(), i = new Int32Array(t), e = 0; e < t; e++) i[e] = this._$T.getInt32(this._$F), this._$F += 4;
                return i
            }, St.prototype._$Tb = function () {
                this._$zT();
                for (var t = this._$3L(), i = new Float32Array(t), e = 0; e < t; e++) i[e] = this._$T.getFloat32(this._$F), this._$F += 4;
                return i
            }, St.prototype._$5b = function () {
                this._$zT();
                for (var t = this._$3L(), i = new Float64Array(t), e = 0; e < t; e++) i[e] = this._$T.getFloat64(this._$F), this._$F += 8;
                return i
            }, St.prototype._$nP = function () {
                return this._$Jb(-1)
            }, St.prototype._$Jb = function (t) {
                if (this._$zT(), t < 0 && (t = this._$3L()), t == G._$7P) {
                    var i = this._$6L();
                    if (0 <= i="" &&="" <="" this._$ko.length)="" return="" this._$ko[i];="" throw="" new="" lt("_$sl="" _$4i="" @_$m0")="" }="" var="" e="this._$4b(t);" this._$ko.push(e),="" },="" st.prototype._$4b="function" (t)="" {="" if="" (0="=" t)="" null;="" (50="=" (51="=" (134="=" (60="=" (t="">= 48) {
                    var r = G._$9o(t);
                    return null != r ? (r._$F0(this), r) : null
                }
                switch (t) {
                    case 1:
                        return this._$bT();
                    case 10:
                        return new n(this._$6L(), !0);
                    case 11:
                        return new S(this._$mP(), this._$mP(), this._$mP(), this._$mP());
                    case 12:
                        return new S(this._$_T(), this._$_T(), this._$_T(), this._$_T());
                    case 13:
                        return new L(this._$mP(), this._$mP());
                    case 14:
                        return new L(this._$_T(), this._$_T());
                    case 15:
                        for (var o = this._$3L(), e = new Array(o), s = 0; s < o; s++) e[s] = this._$nP();
                        return e;
                    case 17:
                        var e = new F(this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP());
                        return e;
                    case 21:
                        return new h(this._$6L(), this._$6L(), this._$6L(), this._$6L());
                    case 22:
                        return new pt(this._$6L(), this._$6L());
                    case 23:
                        throw new Error("_$L _$ro ");
                    case 16:
                    case 25:
                        return this._$cS();
                    case 26:
                        return this._$5b();
                    case 27:
                        return this._$Tb();
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 18:
                    case 19:
                    case 20:
                    case 24:
                    case 28:
                        throw new lt("_$6 _$q : _$nP() of 2-9 ,18,19,20,24,28 : " + t);
                    default:
                        throw new lt("_$6 _$q : _$nP() NO _$i : " + t)
                }
            }, St.prototype._$8L = function () {
                return 0 == this._$hL ? this._$v0 = this._$ST() : 8 == this._$hL && (this._$v0 = this._$ST(), this._$hL = 0), 1 == (this._$v0 >> 7 - this._$hL++ & 1)
            }, St.prototype._$zT = function () {
                0 != this._$hL && (this._$hL = 0)
            }, vt.prototype._$wP = function (t, i, e) {
                for (var r = 0; r < e; r++) {
                    for (var o = 0; o < i; o++) {
                        var n = 2 * (o + r * i);
                        console.log("(% 7.3f , % 7.3f) , ", t[n], t[n + 1])
                    }
                    console.log("\n")
                }
                console.log("\n")
            }, Lt._$2S = Math.PI / 180, Lt._$bS = Math.PI / 180, Lt._$wS = 180 / Math.PI, Lt._$NS = 180 / Math.PI, Lt.PI_F = Math.PI, Lt._$kT = [0, .012368, .024734, .037097, .049454, .061803, .074143, .086471, .098786, .111087, .12337, .135634, .147877, .160098, .172295, .184465, .196606, .208718, .220798, .232844, .244854, .256827, .268761, .280654, .292503, .304308, .316066, .327776, .339436, .351044, .362598, .374097, .385538, .396921, .408243, .419502, .430697, .441826, .452888, .463881, .474802, .485651, .496425, .507124, .517745, .528287, .538748, .549126, .559421, .56963, .579752, .589785, .599728, .609579, .619337, .629, .638567, .648036, .657406, .666676, .675843, .684908, .693867, .70272, .711466, .720103, .72863, .737045, .745348, .753536, .76161, .769566, .777405, .785125, .792725, .800204, .807561, .814793, .821901, .828884, .835739, .842467, .849066, .855535, .861873, .868079, .874153, .880093, .885898, .891567, .897101, .902497, .907754, .912873, .917853, .922692, .92739, .931946, .936359, .940629, .944755, .948737, .952574, .956265, .959809, .963207, .966457, .96956, .972514, .97532, .977976, .980482, .982839, .985045, .987101, .989006, .990759, .992361, .993811, .995109, .996254, .997248, .998088, .998776, .999312, .999694, .999924, 1], Lt._$92 = function (t, i) {
                var e = Math.atan2(t[1], t[0]),
                    r = Math.atan2(i[1], i[0]);
                return Lt._$tS(e, r)
            }, Lt._$tS = function (t, i) {
                for (var e = t - i; e < -Math.PI;) e += 2 * Math.PI;
                for (; e > Math.PI;) e -= 2 * Math.PI;
                return e
            }, Lt._$9 = function (t) {
                return Math.sin(t)
            }, Lt.fcos = function (t) {
                return Math.cos(t)
            }, Mt.prototype._$u2 = function () {
                return this._$IS[0]
            }, Mt.prototype._$yo = function () {
                return this._$AT && !this._$IS[0]
            }, Mt.prototype._$GT = function () {
                return this._$e0
            }, Et._$W2 = 0, Et.SYSTEM_INFO = null, Et.USER_AGENT = navigator.userAgent, Et.isIPhone = function () {
                return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isIPhone
            }, Et.isIOS = function () {
                return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isIPhone || Et.SYSTEM_INFO._isIPad
            }, Et.isAndroid = function () {
                return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isAndroid
            }, Et.getOSVersion = function () {
                return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO.version
            }, Et.getOS = function () {
                return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isIPhone || Et.SYSTEM_INFO._isIPad ? "iOS" : Et.SYSTEM_INFO._isAndroid ? "Android" : "_$Q0 OS"
            }, Et.setup = function () {
                function t(t, i) {
                    for (var e = t.substring(i).split(/[ _,;\.]/), r = 0, o = 0; o <= 0="" 2="" &&="" !isnan(e[o]);="" o++)="" {="" var="" n="parseInt(e[o]);" if="" (n="" <="" ||=""> 999) {
                            _._$li("err : " + n + " @UtHtml5.setup()"), r = 0;
                            break
                        }
                        r += n * Math.pow(1e3, 2 - o)
                    }
                    return r
                }
                var i, e = Et.USER_AGENT,
                    r = Et.SYSTEM_INFO = {
                        userAgent: e
                    };
                if ((i = e.indexOf("iPhone OS ")) >= 0) r.os = "iPhone", r._isIPhone = !0, r.version = t(e, i + "iPhone OS ".length);
                else if ((i = e.indexOf("iPad")) >= 0) {
                    if ((i = e.indexOf("CPU OS")) < 0) return void _._$li(" err : " + e + " @UtHtml5.setup()");
                    r.os = "iPad", r._isIPad = !0, r.version = t(e, i + "CPU OS ".length)
                } else (i = e.indexOf("Android")) >= 0 ? (r.os = "Android", r._isAndroid = !0, r.version = t(e, i + "Android ".length)) : (r.os = "-", r.version = -1)
            }, window.UtSystem = w, window.UtDebug = _, window.LDTransform = gt, window.LDGL = nt, window.Live2D = at, window.Live2DModelWebGL = ft, window.Live2DModelJS = q, window.Live2DMotion = J, window.MotionQueueManager = ct, window.PhysicsHair = f, window.AMotion = s, window.PartsDataID = l, window.DrawDataID = b, window.BaseDataID = yt, window.ParamID = u, at.init();
            var At = !1
        }()
    }).call(i, e(7))
}, function (t, i) {
    t.exports = {
        import: function () {
            throw new Error("System.import cannot be used indirectly")
        }
    }
}, function (t, i, e) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }

    function o() {
        this.models = [], this.count = -1, this.reloadFlg = !1, Live2D.init(), n.Live2DFramework.setPlatformManager(new _.default)
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }), i.default = o;
    var n = e(0),
        s = e(9),
        _ = r(s),
        a = e(10),
        h = r(a),
        l = e(1),
        $ = r(l);
    o.prototype.createModel = function () {
        var t = new h.default;
        return this.models.push(t), t
    }, o.prototype.changeModel = function (t, i) {
        if (this.reloadFlg) {
            this.reloadFlg = !1;
            this.releaseModel(0, t), this.createModel(), this.models[0].load(t, i)
        }
    }, o.prototype.getModel = function (t) {
        return t >= this.models.length ? null : this.models[t]
    }, o.prototype.releaseModel = function (t, i) {
        this.models.length <= 0="=" 187="=" 191="=" t="" ||="" (this.models[t].release(i),="" delete="" this.models[t],="" this.models.splice(t,="" 1))="" },="" o.prototype.nummodels="function" ()="" {="" return="" this.models.length="" o.prototype.setdrag="function" (t,="" i)="" for="" (var="" e="0;" <="" this.models.length;="" e++)="" this.models[e].setdrag(t,="" o.prototype.maxscaleevent="function" $.default.debug_log="" &&="" console.log("max="" scale="" event.");="" t++)="" this.models[t].startrandommotion($.default.motion_group_pinch_in,="" $.default.priority_normal)="" o.prototype.minscaleevent="function" console.log("min="" this.models[t].startrandommotion($.default.motion_group_pinch_out,="" o.prototype.tapevent="function" console.log("tapevent="" view="" x:"="" +="" "="" y:"="" i);="" this.models[e].hittest($.default.hit_area_head,="" t,="" ?="" ($.default.debug_log="" console.log("tap="" face."),="" this.models[e].setrandomexpression())="" :="" this.models[e].hittest($.default.hit_area_body,="" body.="" models["="" "]"),="" this.models[e].startrandommotion($.default.motion_group_tap_body,="" $.default.priority_normal))="" this.models[e].hittestcustom("head",="" this.models[e].startrandommotion($.default.motion_group_flick_head,="" this.models[e].hittestcustom("body",="" $.default.priority_normal));="" !0="" }="" function="" i,="" e)="" "use="" strict";="" r()="" object.defineproperty(i,="" "__esmodule",="" value:="" }),="" i.default="r;" var="" o="e(2);" r.prototype.loadbytes="function" xmlhttprequest;="" e.open("get",="" !0),="" e.responsetype="arraybuffer" ,="" e.onload="function" switch="" (e.status)="" case="" 200:="" i(e.response);="" break;="" default:="" console.error("failed="" to="" load="" ("="" e.status="" ")="" t)="" e.send(null)="" r.prototype.loadstring="function" (t)="" this.loadbytes(t,="" })="" r.prototype.loadlive2dmodel="function" i(e)="" r.prototype.loadtexture="function" e,="" r)="" n="new" image;="" n.crossorigin="Anonymous" n.src="e;" n.onload="function" o.getcontext)(),="" s="e.createTexture();" if="" (!s)="" generate="" gl="" texture="" name."),="" -1;="" t.ispremultipliedalpha()="" e.pixelstorei(e.unpack_premultiply_alpha_webgl,="" 1),="" e.pixelstorei(e.unpack_flip_y_webgl,="" e.activetexture(e.texture0),="" e.bindtexture(e.texture_2d,="" s),="" e.teximage2d(e.texture_2d,="" 0,="" e.rgba,="" e.unsigned_byte,="" n),="" e.texparameteri(e.texture_2d,="" e.texture_mag_filter,="" e.linear),="" e.texture_min_filter,="" e.linear_mipmap_nearest),="" e.generatemipmap(e.texture_2d),="" t.settexture(i,="" "function"="=" typeof="" r="" n.onerror="function" image="" r.prototype.jsonparsefrombytes="function" uint8array(t,="" 3);="" i="239" =="e[0]" e[1]="" e[2]="" string.fromcharcode.apply(null,="" new="" 3))="" uint8array(t)),="" json.parse(i)="" r.prototype.log="function" r(t)="" t.__esmodule="" o()="" n.l2dbasemodel.prototype.constructor.call(this),="" this.modelhomedir="" this.modelsetting="null," this.tmpmatrix="[]" _="r(s)," a="e(1)," h="r(a)," l="e(3)," $="r(l);" o.prototype="new" n.l2dbasemodel,="" o.prototype.load="function" this.setupdating(!0),="" this.setinitialized(!1),="" i.lastindexof("="" _.default;="" this.modelsetting.loadmodelsetting(i,="" r.modelsetting.getmodelfile();="" r.loadmodeldata(t,="" r.modelsetting.gettexturenum();="" i++)="" (="" ^https?:\="" \="" |^\="" i.test(r.modelsetting.gettexturefile(i)))="" else="" r.modelsetting.gettexturefile(i);="" r.loadtexture(i,="" o,="" (r.istexloaded)="" (r.modelsetting.getexpressionnum()=""> 0) {
                                r.expressions = {};
                                for (var t = 0; t < r.modelSetting.getExpressionNum(); t++) {
                                    var i = r.modelSetting.getExpressionName(t),
                                        o = r.modelHomeDir + r.modelSetting.getExpressionFile(t);
                                    r.loadExpression(i, o)
                                }
                            } else r.expressionManager = null, r.expressions = {};
                            if (r.eyeBlink, null != r.modelSetting.getPhysicsFile() ? r.loadPhysics(r.modelHomeDir + r.modelSetting.getPhysicsFile()) : r.physics = null, null != r.modelSetting.getPoseFile() ? r.loadPose(r.modelHomeDir + r.modelSetting.getPoseFile(), function () {
                                r.pose.updateParam(r.live2DModel)
                            }) : r.pose = null, null != r.modelSetting.getLayout()) {
                                var n = r.modelSetting.getLayout();
                                null != n.width && r.modelMatrix.setWidth(n.width), null != n.height && r.modelMatrix.setHeight(n.height), null != n.x && r.modelMatrix.setX(n.x), null != n.y && r.modelMatrix.setY(n.y), null != n.center_x && r.modelMatrix.centerX(n.center_x), null != n.center_y && r.modelMatrix.centerY(n.center_y), null != n.top && r.modelMatrix.top(n.top), null != n.bottom && r.modelMatrix.bottom(n.bottom), null != n.left && r.modelMatrix.left(n.left), null != n.right && r.modelMatrix.right(n.right)
                            }
                            if (null != r.modelSetting.getHitAreasCustom()) {
                                var s = r.modelSetting.getHitAreasCustom();
                                null != s.head_x && (h.default.hit_areas_custom_head_x = s.head_x), null != s.head_y && (h.default.hit_areas_custom_head_y = s.head_y), null != s.body_x && (h.default.hit_areas_custom_body_x = s.body_x), null != s.body_y && (h.default.hit_areas_custom_body_y = s.body_y)
                            }
                            for (var t = 0; t < r.modelSetting.getInitParamNum(); t++) r.live2DModel.setParamFloat(r.modelSetting.getInitParamID(t), r.modelSetting.getInitParamValue(t));
                            for (var t = 0; t < r.modelSetting.getInitPartsVisibleNum(); t++) r.live2DModel.setPartsOpacity(r.modelSetting.getInitPartsVisibleID(t), r.modelSetting.getInitPartsVisibleValue(t));
                            r.live2DModel.saveParam(), r.preloadMotionGroup(h.default.MOTION_GROUP_IDLE), r.preloadMotionGroup(h.default.MOTION_GROUP_SLEEPY), r.mainMotionManager.stopAllMotions(), r.setUpdating(!1), r.setInitialized(!0), "function" == typeof e && e()
                        }
                    })
                }
            })
        })
    }, o.prototype.release = function (t) {
        var i = n.Live2DFramework.getPlatformManager();
        t.deleteTexture(i.texture)
    }, o.prototype.preloadMotionGroup = function (t) {
        for (var i = this, e = 0; e < this.modelSetting.getMotionNum(t); e++) {
            var r = this.modelSetting.getMotionFile(t, e);
            this.loadMotion(r, this.modelHomeDir + r, function (r) {
                r.setFadeIn(i.modelSetting.getMotionFadeIn(t, e)), r.setFadeOut(i.modelSetting.getMotionFadeOut(t, e))
            })
        }
    }, o.prototype.update = function () {
        if (null == this.live2DModel) return void (h.default.DEBUG_LOG && console.error("Failed to update."));
        var t = UtSystem.getUserTimeMSec() - this.startTimeMSec,
            i = t / 1e3,
            e = 2 * i * Math.PI;
        if (this.mainMotionManager.isFinished()) {
            "1" === sessionStorage.getItem("Sleepy") ? this.startRandomMotion(h.default.MOTION_GROUP_SLEEPY, h.default.PRIORITY_SLEEPY) : this.startRandomMotion(h.default.MOTION_GROUP_IDLE, h.default.PRIORITY_IDLE)
        }
        this.live2DModel.loadParam(), this.mainMotionManager.updateParam(this.live2DModel) || null != this.eyeBlink && this.eyeBlink.updateParam(this.live2DModel), this.live2DModel.saveParam(), null == this.expressionManager || null == this.expressions || this.expressionManager.isFinished() || this.expressionManager.updateParam(this.live2DModel), this.live2DModel.addToParamFloat("PARAM_ANGLE_X", 30 * this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", 30 * this.dragY, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", this.dragX * this.dragY * -30, 1), this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", 10 * this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_X", Number(15 * Math.sin(e / 6.5345)), .5), this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", Number(8 * Math.sin(e / 3.5345)), .5), this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", Number(10 * Math.sin(e / 5.5345)), .5), this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", Number(4 * Math.sin(e / 15.5345)), .5), this.live2DModel.setParamFloat("PARAM_BREATH", Number(.5 + .5 * Math.sin(e / 3.2345)), 1), null != this.physics && this.physics.updateParam(this.live2DModel), null == this.lipSync && this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y", this.lipSyncValue), null != this.pose && this.pose.updateParam(this.live2DModel), this.live2DModel.update()
    }, o.prototype.setRandomExpression = function () {
        var t = [];
        for (var i in this.expressions) t.push(i);
        var e = parseInt(Math.random() * t.length);
        this.setExpression(t[e])
    }, o.prototype.startRandomMotion = function (t, i) {
        var e = this.modelSetting.getMotionNum(t),
            r = parseInt(Math.random() * e);
        this.startMotion(t, r, i)
    }, o.prototype.startMotion = function (t, i, e) {
        var r = this.modelSetting.getMotionFile(t, i);
        if (null == r || "" == r) return void (h.default.DEBUG_LOG && console.error("Failed to motion."));
        if (e == h.default.PRIORITY_FORCE) this.mainMotionManager.setReservePriority(e);
        else if (!this.mainMotionManager.reserveMotion(e)) return void (h.default.DEBUG_LOG && console.log("Motion is running."));
        var o, n = this;
        null == this.motions[t] ? this.loadMotion(null, this.modelHomeDir + r, function (r) {
            o = r, n.setFadeInFadeOut(t, i, e, o)
        }) : (o = this.motions[t], n.setFadeInFadeOut(t, i, e, o))
    }, o.prototype.setFadeInFadeOut = function (t, i, e, r) {
        var o = this.modelSetting.getMotionFile(t, i);
        if (r.setFadeIn(this.modelSetting.getMotionFadeIn(t, i)), r.setFadeOut(this.modelSetting.getMotionFadeOut(t, i)), h.default.DEBUG_LOG && console.log("Start motion : " + o), null == this.modelSetting.getMotionSound(t, i)) this.mainMotionManager.startMotionPrio(r, e);
        else {
            var n = this.modelSetting.getMotionSound(t, i),
                s = document.createElement("audio");
            s.src = this.modelHomeDir + n, h.default.DEBUG_LOG && console.log("Start sound : " + n), s.play(), this.mainMotionManager.startMotionPrio(r, e)
        }
    }, o.prototype.setExpression = function (t) {
        var i = this.expressions[t];
        h.default.DEBUG_LOG && console.log("Expression : " + t), this.expressionManager.startMotion(i, !1)
    }, o.prototype.draw = function (t) {
        $.default.push(), $.default.multMatrix(this.modelMatrix.getArray()), this.tmpMatrix = $.default.getMatrix(), this.live2DModel.setMatrix(this.tmpMatrix), this.live2DModel.draw(), $.default.pop()
    }, o.prototype.hitTest = function (t, i, e) {
        for (var r = this.modelSetting.getHitAreaNum(), o = 0; o < r; o++)
            if (t == this.modelSetting.getHitAreaName(o)) {
                var n = this.modelSetting.getHitAreaID(o);
                return this.hitTestSimple(n, i, e)
            }
        return !1
    }, o.prototype.hitTestCustom = function (t, i, e) {
        return "head" == t ? this.hitTestSimpleCustom(h.default.hit_areas_custom_head_x, h.default.hit_areas_custom_head_y, i, e) : "body" == t && this.hitTestSimpleCustom(h.default.hit_areas_custom_body_x, h.default.hit_areas_custom_body_y, i, e)
    }
}, function (t, i, e) {
    "use strict";

    function r() {
        this.NAME = "name", this.ID = "id", this.MODEL = "model", this.TEXTURES = "textures", this.HIT_AREAS = "hit_areas", this.PHYSICS = "physics", this.POSE = "pose", this.EXPRESSIONS = "expressions", this.MOTION_GROUPS = "motions", this.SOUND = "sound", this.FADE_IN = "fade_in", this.FADE_OUT = "fade_out", this.LAYOUT = "layout", this.HIT_AREAS_CUSTOM = "hit_areas_custom", this.INIT_PARAM = "init_param", this.INIT_PARTS_VISIBLE = "init_parts_visible", this.VALUE = "val", this.FILE = "file", this.json = {}
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }), i.default = r;
    var o = e(0);
    r.prototype.loadModelSetting = function (t, i) {
        var e = this;
        o.Live2DFramework.getPlatformManager().loadBytes(t, function (t) {
            var r = String.fromCharCode.apply(null, new Uint8Array(t));
            e.json = JSON.parse(r), i()
        })
    }, r.prototype.getTextureFile = function (t) {
        console.info('getTextureFile', t)
        return null == this.json[this.TEXTURES] || null == this.json[this.TEXTURES][t] ? null : this.json[this.TEXTURES][t]
    }, r.prototype.getModelFile = function () {
        return this.json[this.MODEL]
    }, r.prototype.getTextureNum = function () {
        return null == this.json[this.TEXTURES] ? 0 : this.json[this.TEXTURES].length
    }, r.prototype.getHitAreaNum = function () {
        return null == this.json[this.HIT_AREAS] ? 0 : this.json[this.HIT_AREAS].length
    }, r.prototype.getHitAreaID = function (t) {
        return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.ID]
    }, r.prototype.getHitAreaName = function (t) {
        return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.NAME]
    }, r.prototype.getPhysicsFile = function () {
        return this.json[this.PHYSICS]
    }, r.prototype.getPoseFile = function () {
        return this.json[this.POSE]
    }, r.prototype.getExpressionNum = function () {
        return null == this.json[this.EXPRESSIONS] ? 0 : this.json[this.EXPRESSIONS].length
    }, r.prototype.getExpressionFile = function (t) {
        return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.FILE]
    }, r.prototype.getExpressionName = function (t) {
        return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.NAME]
    }, r.prototype.getLayout = function () {
        return this.json[this.LAYOUT]
    }, r.prototype.getHitAreasCustom = function () {
        return this.json[this.HIT_AREAS_CUSTOM]
    }, r.prototype.getInitParamNum = function () {
        return null == this.json[this.INIT_PARAM] ? 0 : this.json[this.INIT_PARAM].length
    }, r.prototype.getMotionNum = function (t) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] ? 0 : this.json[this.MOTION_GROUPS][t].length
    }, r.prototype.getMotionFile = function (t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] ? null : this.json[this.MOTION_GROUPS][t][i][this.FILE]
    }, r.prototype.getMotionSound = function (t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.SOUND] ? null : this.json[this.MOTION_GROUPS][t][i][this.SOUND]
    }, r.prototype.getMotionFadeIn = function (t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_IN] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_IN]
    }, r.prototype.getMotionFadeOut = function (t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT]
    }, r.prototype.getInitParamID = function (t) {
        return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? null : this.json[this.INIT_PARAM][t][this.ID]
    }, r.prototype.getInitParamValue = function (t) {
        return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? NaN : this.json[this.INIT_PARAM][t][this.VALUE]
    }, r.prototype.getInitPartsVisibleNum = function () {
        return null == this.json[this.INIT_PARTS_VISIBLE] ? 0 : this.json[this.INIT_PARTS_VISIBLE].length
    }, r.prototype.getInitPartsVisibleID = function (t) {
        return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? null : this.json[this.INIT_PARTS_VISIBLE][t][this.ID]
    }, r.prototype.getInitPartsVisibleValue = function (t) {
        return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? NaN : this.json[this.INIT_PARTS_VISIBLE][t][this.VALUE]
    }
}]);</=></=></=></=></=></=></=></=></=></=></=></=></=></=></=></=></=></=></=></=></=>