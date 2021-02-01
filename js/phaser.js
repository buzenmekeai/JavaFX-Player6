
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Phaser", [], factory);
	else if(typeof exports === 'object')
		exports["Phaser"] = factory();
	else
		root["Phaser"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1127);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

//  Taken from klasse by mattdesl https://github.com/mattdesl/klasse

function hasGetterOrSetter (def)
{
    return (!!def.get && typeof def.get === 'function') || (!!def.set && typeof def.set === 'function');
}

function getProperty (definition, k, isClassDescriptor)
{
    //  This may be a lightweight object, OR it might be a property that was defined previously.

    //  For simple class descriptors we can just assume its NOT previously defined.
    var def = (isClassDescriptor) ? definition[k] : Object.getOwnPropertyDescriptor(definition, k);

    if (!isClassDescriptor && def.value && typeof def.value === 'object')
    {
        def = def.value;
    }

    //  This might be a regular property, or it may be a getter/setter the user defined in a class.
    if (def && hasGetterOrSetter(def))
    {
        if (typeof def.enumerable === 'undefined')
        {
            def.enumerable = true;
        }

        if (typeof def.configurable === 'undefined')
        {
            def.configurable = true;
        }

        return def;
    }
    else
    {
        return false;
    }
}

function hasNonConfigurable (obj, k)
{
    var prop = Object.getOwnPropertyDescriptor(obj, k);

    if (!prop)
    {
        return false;
    }

    if (prop.value && typeof prop.value === 'object')
    {
        prop = prop.value;
    }

    if (prop.configurable === false)
    {
        return true;
    }

    return false;
}

function extend (ctor, definition, isClassDescriptor, extend)
{
    for (var k in definition)
    {
        if (!definition.hasOwnProperty(k))
        {
            continue;
        }

        var def = getProperty(definition, k, isClassDescriptor);

        if (def !== false)
        {
            //  If Extends is used, we will check its prototype to see if the final variable exists.

            var parent = extend || ctor;

            if (hasNonConfigurable(parent.prototype, k))
            {
                //  Just skip the final property
                if (Class.ignoreFinals)
                {
                    continue;
                }

                //  We cannot re-define a property that is configurable=false.
                //  So we will consider them final and throw an error. This is by
                //  default so it is clear to the developer what is happening.
                //  You can set ignoreFinals to true if you need to extend a class
                //  which has configurable=false; it will simply not re-define final properties.
                throw new Error('cannot override final property \'' + k + '\', set Class.ignoreFinals = true to skip');
            }

            Object.defineProperty(ctor.prototype, k, def);
        }
        else
        {
            ctor.prototype[k] = definition[k];
        }
    }
}

function mixin (myClass, mixins)
{
    if (!mixins)
    {
        return;
    }

    if (!Array.isArray(mixins))
    {
        mixins = [ mixins ];
    }

    for (var i = 0; i < mixins.length; i++)
    {
        extend(myClass, mixins[i].prototype || mixins[i]);
    }
}

/**
 * Creates a new class with the given descriptor.
 * The constructor, defined by the name `initialize`,
 * is an optional function. If unspecified, an anonymous
 * function will be used which calls the parent class (if
 * one exists).
 *
 * You can also use `Extends` and `Mixins` to provide subclassing
 * and inheritance.
 *
 * @class  Class
 * @constructor
 * @param {Object} definition a dictionary of functions for the class
 * @example
 *
 *      var MyClass = new Phaser.Class({
 *
 *          initialize: function() {
 *              this.foo = 2.0;
 *          },
 *
 *          bar: function() {
 *              return this.foo + 5;
 *          }
 *      });
 */
function Class (definition)
{
    if (!definition)
    {
        definition = {};
    }

    //  The variable name here dictates what we see in Chrome debugger
    var initialize;
    var Extends;

    if (definition.initialize)
    {
        if (typeof definition.initialize !== 'function')
        {
            throw new Error('initialize must be a function');
        }

        initialize = definition.initialize;

        //  Usually we should avoid 'delete' in V8 at all costs.
        //  However, its unlikely to make any performance difference
        //  here since we only call this on class creation (i.e. not object creation).
        delete definition.initialize;
    }
    else if (definition.Extends)
    {
        var base = definition.Extends;

        initialize = function ()
        {
            base.apply(this, arguments);
        };
    }
    else
    {
        initialize = function () {};
    }

    if (definition.Extends)
    {
        initialize.prototype = Object.create(definition.Extends.prototype);
        initialize.prototype.constructor = initialize;

        //  For getOwnPropertyDescriptor to work, we need to act directly on the Extends (or Mixin)

        Extends = definition.Extends;

        delete definition.Extends;
    }
    else
    {
        initialize.prototype.constructor = initialize;
    }

    //  Grab the mixins, if they are specified...
    var mixins = null;

    if (definition.Mixins)
    {
        mixins = definition.Mixins;
        delete definition.Mixins;
    }

    //  First, mixin if we can.
    mixin(initialize, mixins);

    //  Now we grab the actual definition which defines the overrides.
    extend(initialize, definition, true, Extends);

    return initialize;
}

Class.extend = extend;
Class.mixin = mixin;
Class.ignoreFinals = false;

module.exports = Class;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * A NOOP (No Operation) callback function.
 *
 * Used internally by Phaser when it's more expensive to determine if a callback exists
 * than it is to just invoke an empty function.
 *
 * @function Phaser.Utils.NOOP
 * @since 3.0.0
 */
var NOOP = function ()
{
    //  NOOP
};

module.exports = NOOP;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Finds the key within the top level of the {@link source} object, or returns {@link defaultValue}
 *
 * @function Phaser.Utils.Objects.GetFastValue
 * @since 3.0.0
 *
 * @param {object} source - The object to search
 * @param {string} key - The key for the property on source. Must exist at the top level of the source object (no periods)
 * @param {*} [defaultValue] - The default value to use if the key does not exist.
 *
 * @return {*} The value if found; otherwise, defaultValue (null if none provided)
 */
var GetFastValue = function (source, key, defaultValue)
{
    var t = typeof(source);

    if (!source || t === 'number' || t === 'string')
    {
        return defaultValue;
    }
    else if (source.hasOwnProperty(key) && source[key] !== undefined)
    {
        return source[key];
    }
    else
    {
        return defaultValue;
    }
};

module.exports = GetFastValue;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

//  Adapted from [gl-matrix](https://github.com/toji/gl-matrix) by toji
//  and [vecmath](https://github.com/mattdesl/vecmath) by mattdesl

var Class = __webpack_require__(0);

/**
 * @typedef {object} Vector2Like
 *
 * @property {number} x - The x component.
 * @property {number} y - The y component.
 */

/**
 * @classdesc
 * A representation of a vector in 2D space.
 *
 * A two-component vector.
 *
 * @class Vector2
 * @memberof Phaser.Math
 * @constructor
 * @since 3.0.0
 *
 * @param {number|Vector2Like} [x] - The x component, or an object with `x` and `y` properties.
 * @param {number} [y] - The y component.
 */
var Vector2 = new Class({

    initialize:

    function Vector2 (x, y)
    {
        /**
         * The x component of this Vector.
         *
         * @name Phaser.Math.Vector2#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = 0;

        /**
         * The y component of this Vector.
         *
         * @name Phaser.Math.Vector2#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = 0;

        if (typeof x === 'object')
        {
            this.x = x.x || 0;
            this.y = x.y || 0;
        }
        else
        {
            if (y === undefined) { y = x; }

            this.x = x || 0;
            this.y = y || 0;
        }
    },

    /**
     * Make a clone of this Vector2.
     *
     * @method Phaser.Math.Vector2#clone
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} A clone of this Vector2.
     */
    clone: function ()
    {
        return new Vector2(this.x, this.y);
    },

    /**
     * Copy the components of a given Vector into this Vector.
     *
     * @method Phaser.Math.Vector2#copy
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to copy the components from.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    copy: function (src)
    {
        this.x = src.x || 0;
        this.y = src.y || 0;

        return this;
    },

    /**
     * Set the component values of this Vector from a given Vector2Like object.
     *
     * @method Phaser.Math.Vector2#setFromObject
     * @since 3.0.0
     *
     * @param {Vector2Like} obj - The object containing the component values to set for this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setFromObject: function (obj)
    {
        this.x = obj.x || 0;
        this.y = obj.y || 0;

        return this;
    },

    /**
     * Set the `x` and `y` components of the this Vector to the given `x` and `y` values.
     *
     * @method Phaser.Math.Vector2#set
     * @since 3.0.0
     *
     * @param {number} x - The x value to set for this Vector.
     * @param {number} [y=x] - The y value to set for this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    set: function (x, y)
    {
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * This method is an alias for `Vector2.set`.
     *
     * @method Phaser.Math.Vector2#setTo
     * @since 3.4.0
     *
     * @param {number} x - The x value to set for this Vector.
     * @param {number} [y=x] - The y value to set for this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setTo: function (x, y)
    {
        return this.set(x, y);
    },

    /**
     * Sets the `x` and `y` values of this object from a given polar coordinate.
     *
     * @method Phaser.Math.Vector2#setToPolar
     * @since 3.0.0
     *
     * @param {number} azimuth - The angular coordinate, in radians.
     * @param {number} [radius=1] - The radial coordinate (length).
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setToPolar: function (azimuth, radius)
    {
        if (radius == null) { radius = 1; }

        this.x = Math.cos(azimuth) * radius;
        this.y = Math.sin(azimuth) * radius;

        return this;
    },

    /**
     * Check whether this Vector is equal to a given Vector.
     *
     * Performs a strict equality check against each Vector's components.
     *
     * @method Phaser.Math.Vector2#equals
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} v - The vector to compare with this Vector.
     *
     * @return {boolean} Whether the given Vector is equal to this Vector.
     */
    equals: function (v)
    {
        return ((this.x === v.x) && (this.y === v.y));
    },

    /**
     * Calculate the angle between this Vector and the positive x-axis, in radians.
     *
     * @method Phaser.Math.Vector2#angle
     * @since 3.0.0
     *
     * @return {number} The angle between this Vector, and the positive x-axis, given in radians.
     */
    angle: function ()
    {
        // computes the angle in radians with respect to the positive x-axis

        var angle = Math.atan2(this.y, this.x);

        if (angle < 0)
        {
            angle += 2 * Math.PI;
        }

        return angle;
    },

    /**
     * Add a given Vector to this Vector. Addition is component-wise.
     *
     * @method Phaser.Math.Vector2#add
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to add to this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    add: function (src)
    {
        this.x += src.x;
        this.y += src.y;

        return this;
    },

    /**
     * Subtract the given Vector from this Vector. Subtraction is component-wise.
     *
     * @method Phaser.Math.Vector2#subtract
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to subtract from this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    subtract: function (src)
    {
        this.x -= src.x;
        this.y -= src.y;

        return this;
    },

    /**
     * Perform a component-wise multiplication between this Vector and the given Vector.
     *
     * Multiplies this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector2#multiply
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to multiply this Vector by.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    multiply: function (src)
    {
        this.x *= src.x;
        this.y *= src.y;

        return this;
    },

    /**
     * Scale this Vector by the given value.
     *
     * @method Phaser.Math.Vector2#scale
     * @since 3.0.0
     *
     * @param {number} value - The value to scale this Vector by.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    scale: function (value)
    {
        if (isFinite(value))
        {
            this.x *= value;
            this.y *= value;
        }
        else
        {
            this.x = 0;
            this.y = 0;
        }

        return this;
    },

    /**
     * Perform a component-wise division between this Vector and the given Vector.
     *
     * Divides this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector2#divide
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to divide this Vector by.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    divide: function (src)
    {
        this.x /= src.x;
        this.y /= src.y;

        return this;
    },

    /**
     * Negate the `x` and `y` components of this Vector.
     *
     * @method Phaser.Math.Vector2#negate
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    negate: function ()
    {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    },

    /**
     * Calculate the distance between this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector2#distance
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector.
     */
    distance: function (src)
    {
        var dx = src.x - this.x;
        var dy = src.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    },

    /**
     * Calculate the distance between this Vector and the given Vector, squared.
     *
     * @method Phaser.Math.Vector2#distanceSq
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector, squared.
     */
    distanceSq: function (src)
    {
        var dx = src.x - this.x;
        var dy = src.y - this.y;

        return dx * dx + dy * dy;
    },

    /**
     * Calculate the length (or magnitude) of this Vector.
     *
     * @method Phaser.Math.Vector2#length
     * @since 3.0.0
     *
     * @return {number} The length of this Vector.
     */
    length: function ()
    {
        var x = this.x;
        var y = this.y;

        return Math.sqrt(x * x + y * y);
    },

    /**
     * Calculate the length of this Vector squared.
     *
     * @method Phaser.Math.Vector2#lengthSq
     * @since 3.0.0
     *
     * @return {number} The length of this Vector, squared.
     */
    lengthSq: function ()
    {
        var x = this.x;
        var y = this.y;

        return x * x + y * y;
    },

    /**
     * Normalize this Vector.
     *
     * Makes the vector a unit length vector (magnitude of 1) in the same direction.
     *
     * @method Phaser.Math.Vector2#normalize
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    normalize: function ()
    {
        var x = this.x;
        var y = this.y;
        var len = x * x + y * y;

        if (len > 0)
        {
            len = 1 / Math.sqrt(len);

            this.x = x * len;
            this.y = y * len;
        }

        return this;
    },

    /**
     * Right-hand normalize (make unit length) this Vector.
     *
     * @method Phaser.Math.Vector2#normalizeRightHand
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    normalizeRightHand: function ()
    {
        var x = this.x;

        this.x = this.y * -1;
        this.y = x;

        return this;
    },

    /**
     * Calculate the dot product of this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector2#dot
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector2 to dot product with this Vector2.
     *
     * @return {number} The dot product of this Vector and the given Vector.
     */
    dot: function (src)
    {
        return this.x * src.x + this.y * src.y;
    },

    /**
     * [description]
     *
     * @method Phaser.Math.Vector2#cross
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - [description]
     *
     * @return {number} [description]
     */
    cross: function (src)
    {
        return this.x * src.y - this.y * src.x;
    },

    /**
     * Linearly interpolate between this Vector and the given Vector.
     *
     * Interpolates this Vector towards the given Vector.
     *
     * @method Phaser.Math.Vector2#lerp
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector2 to interpolate towards.
     * @param {number} [t=0] - The interpolation percentage, between 0 and 1.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    lerp: function (src, t)
    {
        if (t === undefined) { t = 0; }

        var ax = this.x;
        var ay = this.y;

        this.x = ax + t * (src.x - ax);
        this.y = ay + t * (src.y - ay);

        return this;
    },

    /**
     * Transform this Vector with the given Matrix.
     *
     * @method Phaser.Math.Vector2#transformMat3
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix3} mat - The Matrix3 to transform this Vector2 with.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    transformMat3: function (mat)
    {
        var x = this.x;
        var y = this.y;
        var m = mat.val;

        this.x = m[0] * x + m[3] * y + m[6];
        this.y = m[1] * x + m[4] * y + m[7];

        return this;
    },

    /**
     * Transform this Vector with the given Matrix.
     *
     * @method Phaser.Math.Vector2#transformMat4
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix4} mat - The Matrix4 to transform this Vector2 with.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    transformMat4: function (mat)
    {
        var x = this.x;
        var y = this.y;
        var m = mat.val;

        this.x = m[0] * x + m[4] * y + m[12];
        this.y = m[1] * x + m[5] * y + m[13];

        return this;
    },

    /**
     * Make this Vector the zero vector (0, 0).
     *
     * @method Phaser.Math.Vector2#reset
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    reset: function ()
    {
        this.x = 0;
        this.y = 0;

        return this;
    }

});

/**
 * A static zero Vector2 for use by reference.
 *
 * @constant
 * @name Phaser.Math.Vector2.ZERO
 * @type {Vector2}
 * @since 3.1.0
 */
Vector2.ZERO = new Vector2();

module.exports = Vector2;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

//  Source object
//  The key as a string, or an array of keys, i.e. 'banner', or 'banner.hideBanner'
//  The default value to use if the key doesn't exist

/**
 * Retrieves a value from an object.
 *
 * @function Phaser.Utils.Objects.GetValue
 * @since 3.0.0
 *
 * @param {object} source - The object to retrieve the value from.
 * @param {string} key - The name of the property to retrieve from the object. If a property is nested, the names of its preceding properties should be separated by a dot (`.`) - `banner.hideBanner` would return the value of the `hideBanner` property from the object stored in the `banner` property of the `source` object.
 * @param {*} defaultValue - The value to return if the `key` isn't found in the `source` object.
 *
 * @return {*} The value of the requested key.
 */
var GetValue = function (source, key, defaultValue)
{
    if (!source || typeof source === 'number')
    {
        return defaultValue;
    }
    else if (source.hasOwnProperty(key))
    {
        return source[key];
    }
    else if (key.indexOf('.'))
    {
        var keys = key.split('.');
        var parent = source;
        var value = defaultValue;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++)
        {
            if (parent.hasOwnProperty(keys[i]))
            {
                //  Yes it has a key property, let's carry on down
                value = parent[keys[i]];

                parent = parent[keys[i]];
            }
            else
            {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;
    }
    else
    {
        return defaultValue;
    }
};

module.exports = GetValue;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var PluginCache = __webpack_require__(15);

/**
 * @classdesc
 * The Game Object Factory is a Scene plugin that allows you to quickly create many common
 * types of Game Objects and have them automatically registered with the Scene.
 *
 * Game Objects directly register themselves with the Factory and inject their own creation
 * methods into the class.
 *
 * @class GameObjectFactory
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object Factory belongs.
 */
var GameObjectFactory = new Class({

    initialize:

    function GameObjectFactory (scene)
    {
        /**
         * The Scene to which this Game Object Factory belongs.
         *
         * @name Phaser.GameObjects.GameObjectFactory#scene
         * @type {Phaser.Scene}
         * @protected
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * A reference to the Scene.Systems.
         *
         * @name Phaser.GameObjects.GameObjectFactory#systems
         * @type {Phaser.Scenes.Systems}
         * @protected
         * @since 3.0.0
         */
        this.systems = scene.sys;

        /**
         * A reference to the Scene Display List.
         *
         * @name Phaser.GameObjects.GameObjectFactory#displayList
         * @type {Phaser.GameObjects.DisplayList}
         * @protected
         * @since 3.0.0
         */
        this.displayList;

        /**
         * A reference to the Scene Update List.
         *
         * @name Phaser.GameObjects.GameObjectFactory#updateList;
         * @type {Phaser.GameObjects.UpdateList}
         * @protected
         * @since 3.0.0
         */
        this.updateList;

        scene.sys.events.once('boot', this.boot, this);
        scene.sys.events.on('start', this.start, this);
    },

    /**
     * This method is called automatically, only once, when the Scene is first created.
     * Do not invoke it directly.
     *
     * @method Phaser.GameObjects.GameObjectFactory#boot
     * @private
     * @since 3.5.1
     */
    boot: function ()
    {
        this.displayList = this.systems.displayList;
        this.updateList = this.systems.updateList;

        this.systems.events.once('destroy', this.destroy, this);
    },

    /**
     * This method is called automatically by the Scene when it is starting up.
     * It is responsible for creating local systems, properties and listening for Scene events.
     * Do not invoke it directly.
     *
     * @method Phaser.GameObjects.GameObjectFactory#start
     * @private
     * @since 3.5.0
     */
    start: function ()
    {
        this.systems.events.once('shutdown', this.shutdown, this);
    },

    /**
     * Adds an existing Game Object to this Scene.
     * 
     * If the Game Object renders, it will be added to the Display List.
     * If it has a `preUpdate` method, it will be added to the Update List.
     *
     * @method Phaser.GameObjects.GameObjectFactory#existing
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.GameObject} child - The child to be added to this Scene.
     *
     * @return {Phaser.GameObjects.GameObject} The Game Object that was added.
     */
    existing: function (child)
    {
        if (child.renderCanvas || child.renderWebGL)
        {
            this.displayList.add(child);
        }

        if (child.preUpdate)
        {
            this.updateList.add(child);
        }

        return child;
    },

    /**
     * The Scene that owns this plugin is shutting down.
     * We need to kill and reset all internal properties as well as stop listening to Scene events.
     *
     * @method Phaser.GameObjects.GameObjectFactory#shutdown
     * @private
     * @since 3.0.0
     */
    shutdown: function ()
    {
        this.systems.events.off('shutdown', this.shutdown, this);
    },

    /**
     * The Scene that owns this plugin is being destroyed.
     * We need to shutdown and then kill off all external references.
     *
     * @method Phaser.GameObjects.GameObjectFactory#destroy
     * @private
     * @since 3.0.0
     */
    destroy: function ()
    {
        this.shutdown();

        this.scene.sys.events.off('start', this.start, this);

        this.scene = null;
        this.systems = null;

        this.displayList = null;
        this.updateList = null;
    }

});

//  Static method called directly by the Game Object factory functions

GameObjectFactory.register = function (factoryType, factoryFunction)
{
    if (!GameObjectFactory.prototype.hasOwnProperty(factoryType))
    {
        GameObjectFactory.prototype[factoryType] = factoryFunction;
    }
};

PluginCache.register('GameObjectFactory', GameObjectFactory, 'add');

module.exports = GameObjectFactory;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);

/**
 * @classdesc
 * Defines a Point in 2D space, with an x and y component.
 *
 * @class Point
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x=0] - The x coordinate of this Point.
 * @param {number} [y=x] - The y coordinate of this Point.
 */
var Point = new Class({

    initialize:

    function Point (x, y)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = x; }

        /**
         * The x coordinate of this Point.
         *
         * @name Phaser.Geom.Point#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = x;

        /**
         * The y coordinate of this Point.
         *
         * @name Phaser.Geom.Point#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = y;
    },

    /**
     * Set the x and y coordinates of the point to the given values.
     *
     * @method Phaser.Geom.Point#setTo
     * @since 3.0.0
     *
     * @param {number} [x=0] - The x coordinate of this Point.
     * @param {number} [y=x] - The y coordinate of this Point.
     *
     * @return {Phaser.Geom.Point} This Point object.
     */
    setTo: function (x, y)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    }

});

module.exports = Point;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var types = {};

var FileTypesManager = {

    /**
     * Static method called when a LoaderPlugin is created.
     * 
     * Loops through the local types object and injects all of them as
     * properties into the LoaderPlugin instance.
     *
     * @method Phaser.Loader.FileTypesManager.register
     * @since 3.0.0
     * 
     * @param {Phaser.Loader.LoaderPlugin} loader - The LoaderPlugin to install the types into.
     */
    install: function (loader)
    {
        for (var key in types)
        {
            loader[key] = types[key];
        }
    },

    /**
     * Static method called directly by the File Types.
     * 
     * The key is a reference to the function used to load the files via the Loader, i.e. `image`.
     *
     * @method Phaser.Loader.FileTypesManager.register
     * @since 3.0.0
     * 
     * @param {string} key - The key that will be used as the method name in the LoaderPlugin.
     * @param {function} factoryFunction - The function that will be called when LoaderPlugin.key is invoked.
     */
    register: function (key, factoryFunction)
    {
        types[key] = factoryFunction;
    },

    /**
     * Removed all associated file types.
     *
     * @method Phaser.Loader.FileTypesManager.destroy
     * @since 3.0.0
     */
    destroy: function ()
    {
        types = {};
    }

};

module.exports = FileTypesManager;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * This is a slightly modified version of jQuery.isPlainObject.
 * A plain object is an object whose internal class property is [object Object].
 *
 * @function Phaser.Utils.Objects.IsPlainObject
 * @since 3.0.0
 *
 * @param {object} obj - The object to inspect.
 *
 * @return {boolean} `true` if the object is plain, otherwise `false`.
 */
var IsPlainObject = function (obj)
{
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (typeof(obj) !== 'object' || obj.nodeType || obj === obj.window)
    {
        return false;
    }

    // Support: Firefox <20
    // The try/catch suppresses exceptions thrown when attempting to access
    // the "constructor" property of certain host objects, ie. |window.location|
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try
    {
        if (obj.constructor && !({}).hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'))
        {
            return false;
        }
    }
    catch (e)
    {
        return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
};

module.exports = IsPlainObject;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var Contains = __webpack_require__(39);
var GetPoint = __webpack_require__(190);
var GetPoints = __webpack_require__(398);
var Line = __webpack_require__(54);
var Random = __webpack_require__(187);

/**
 * @classdesc
 * Encapsulates a 2D rectangle defined by its corner point in the top-left and its extends in x (width) and y (height)
 *
 * @class Rectangle
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x=0] - The X coordinate of the top left corner of the Rectangle.
 * @param {number} [y=0] - The Y coordinate of the top left corner of the Rectangle.
 * @param {number} [width=0] - The width of the Rectangle.
 * @param {number} [height=0] - The height of the Rectangle.
 */
var Rectangle = new Class({

    initialize:

    function Rectangle (x, y, width, height)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = 0; }

        /**
         * The X coordinate of the top left corner of the Rectangle.
         *
         * @name Phaser.Geom.Rectangle#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = x;

        /**
         * The Y coordinate of the top left corner of the Rectangle.
         *
         * @name Phaser.Geom.Rectangle#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = y;

        /**
         * The width of the Rectangle, i.e. the distance between its left side (defined by `x`) and its right side.
         *
         * @name Phaser.Geom.Rectangle#width
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.width = width;

        /**
         * The height of the Rectangle, i.e. the distance between its top side (defined by `y`) and its bottom side.
         *
         * @name Phaser.Geom.Rectangle#height
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.height = height;
    },

    /**
     * Checks if the given point is inside the Rectangle's bounds.
     *
     * @method Phaser.Geom.Rectangle#contains
     * @since 3.0.0
     *
     * @param {number} x - The X coordinate of the point to check.
     * @param {number} y - The Y coordinate of the point to check.
     *
     * @return {boolean} `true` if the point is within the Rectangle's bounds, otherwise `false`.
     */
    contains: function (x, y)
    {
        return Contains(this, x, y);
    },

    /**
     * Calculates the coordinates of a point at a certain `position` on the Rectangle's perimeter.
     * 
     * The `position` is a fraction between 0 and 1 which defines how far into the perimeter the point is.
     * 
     * A value of 0 or 1 returns the point at the top left corner of the rectangle, while a value of 0.5 returns the point at the bottom right corner of the rectangle. Values between 0 and 0.5 are on the top or the right side and values between 0.5 and 1 are on the bottom or the left side.
     *
     * @method Phaser.Geom.Rectangle#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [output,$return]
     *
     * @param {number} position - The normalized distance into the Rectangle's perimeter to return.
     * @param {(Phaser.Geom.Point|object)} [output] - An object to update with the `x` and `y` coordinates of the point.
     *
     * @return {(Phaser.Geom.Point|object)} The updated `output` object, or a new Point if no `output` object was given.
     */
    getPoint: function (position, output)
    {
        return GetPoint(this, position, output);
    },

    /**
     * Returns an array of points from the perimeter of the Rectangle, each spaced out based on the quantity or step required.
     *
     * @method Phaser.Geom.Rectangle#getPoints
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point[]} O - [output,$return]
     *
     * @param {integer} quantity - The number of points to return. Set to `false` or 0 to return an arbitrary number of points (`perimeter / stepRate`) evenly spaced around the Rectangle based on the `stepRate`.
     * @param {number} [stepRate] - If `quantity` is 0, determines the normalized distance between each returned point.
     * @param {(array|Phaser.Geom.Point[])} [output] - An array to which to append the points.
     *
     * @return {(array|Phaser.Geom.Point[])} The modified `output` array, or a new array if none was provided.
     */
    getPoints: function (quantity, stepRate, output)
    {
        return GetPoints(this, quantity, stepRate, output);
    },

    /**
     * Returns a random point within the Rectangle's bounds.
     *
     * @method Phaser.Geom.Rectangle#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {Phaser.Geom.Point} [point] - The object in which to store the `x` and `y` coordinates of the point.
     *
     * @return {Phaser.Geom.Point} The updated `point`, or a new Point if none was provided.
     */
    getRandomPoint: function (point)
    {
        return Random(this, point);
    },

    /**
     * Sets the position, width, and height of the Rectangle.
     *
     * @method Phaser.Geom.Rectangle#setTo
     * @since 3.0.0
     *
     * @param {number} x - The X coordinate of the top left corner of the Rectangle.
     * @param {number} y - The Y coordinate of the top left corner of the Rectangle.
     * @param {number} width - The width of the Rectangle.
     * @param {number} height - The height of the Rectangle.
     *
     * @return {Phaser.Geom.Rectangle} This Rectangle object.
     */
    setTo: function (x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;
    },

    /**
     * Resets the position, width, and height of the Rectangle to 0.
     *
     * @method Phaser.Geom.Rectangle#setEmpty
     * @since 3.0.0
     *
     * @return {Phaser.Geom.Rectangle} This Rectangle object.
     */
    setEmpty: function ()
    {
        return this.setTo(0, 0, 0, 0);
    },

    /**
     * Sets the position of the Rectangle.
     *
     * @method Phaser.Geom.Rectangle#setPosition
     * @since 3.0.0
     *
     * @param {number} x - The X coordinate of the top left corner of the Rectangle.
     * @param {number} [y=x] - The Y coordinate of the top left corner of the Rectangle.
     *
     * @return {Phaser.Geom.Rectangle} This Rectangle object.
     */
    setPosition: function (x, y)
    {
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * Sets the width and height of the Rectangle.
     *
     * @method Phaser.Geom.Rectangle#setSize
     * @since 3.0.0
     *
     * @param {number} width - The width to set the Rectangle to.
     * @param {number} [height=width] - The height to set the Rectangle to.
     *
     * @return {Phaser.Geom.Rectangle} This Rectangle object.
     */
    setSize: function (width, height)
    {
        if (height === undefined) { height = width; }

        this.width = width;
        this.height = height;

        return this;
    },

    /**
     * Determines if the Rectangle is empty. A Rectangle is empty if its width or height is less than or equal to 0.
     *
     * @method Phaser.Geom.Rectangle#isEmpty
     * @since 3.0.0
     *
     * @return {boolean} `true` if the Rectangle is empty. A Rectangle object is empty if its width or height is less than or equal to 0.
     */
    isEmpty: function ()
    {
        return (this.width <= 0 || this.height <= 0);
    },

    /**
     * Returns a Line object that corresponds to the top of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineA
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the top of this Rectangle.
     */
    getLineA: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.x, this.y, this.right, this.y);

        return line;
    },

    /**
     * Returns a Line object that corresponds to the right of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineB
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the right of this Rectangle.
     */
    getLineB: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.right, this.y, this.right, this.bottom);

        return line;
    },

    /**
     * Returns a Line object that corresponds to the bottom of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineC
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the bottom of this Rectangle.
     */
    getLineC: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.right, this.bottom, this.x, this.bottom);

        return line;
    },

    /**
     * Returns a Line object that corresponds to the left of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineD
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the left of this Rectangle.
     */
    getLineD: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.x, this.bottom, this.x, this.y);

        return line;
    },

    /**
     * The x coordinate of the left of the Rectangle.
     * Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
     *
     * @name Phaser.Geom.Rectangle#left
     * @type {number}
     * @since 3.0.0
     */
    left: {

        get: function ()
        {
            return this.x;
        },

        set: function (value)
        {
            if (value >= this.right)
            {
                this.width = 0;
            }
            else
            {
                this.width = this.right - value;
            }

            this.x = value;
        }

    },

    /**
     * The sum of the x and width properties.
     * Changing the right property of a Rectangle object has no effect on the x, y and height properties, however it does affect the width property.
     *
     * @name Phaser.Geom.Rectangle#right
     * @type {number}
     * @since 3.0.0
     */
    right: {

        get: function ()
        {
            return this.x + this.width;
        },

        set: function (value)
        {
            if (value <= this.x)
            {
                this.width = 0;
            }
            else
            {
                this.width = value - this.x;
            }
        }

    },

    /**
     * The y coordinate of the top of the Rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties.
     * However it does affect the height property, whereas changing the y value does not affect the height property.
     *
     * @name Phaser.Geom.Rectangle#top
     * @type {number}
     * @since 3.0.0
     */
    top: {

        get: function ()
        {
            return this.y;
        },

        set: function (value)
        {
            if (value >= this.bottom)
            {
                this.height = 0;
            }
            else
            {
                this.height = (this.bottom - value);
            }

            this.y = value;
        }

    },

    /**
     * The sum of the y and height properties.
     * Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
     *
     * @name Phaser.Geom.Rectangle#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {

        get: function ()
        {
            return this.y + this.height;
        },

        set: function (value)
        {
            if (value <= this.y)
            {
                this.height = 0;
            }
            else
            {
                this.height = value - this.y;
            }
        }

    },

    /**
     * The x coordinate of the center of the Rectangle.
     *
     * @name Phaser.Geom.Rectangle#centerX
     * @type {number}
     * @since 3.0.0
     */
    centerX: {

        get: function ()
        {
            return this.x + (this.width / 2);
        },

        set: function (value)
        {
            this.x = value - (this.width / 2);
        }

    },

    /**
     * The y coordinate of the center of the Rectangle.
     *
     * @name Phaser.Geom.Rectangle#centerY
     * @type {number}
     * @since 3.0.0
     */
    centerY: {

        get: function ()
        {
            return this.y + (this.height / 2);
        },

        set: function (value)
        {
            this.y = value - (this.height / 2);
        }

    }

});

module.exports = Rectangle;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Felipe Alfonso <@bitnenfer>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * @namespace Phaser.Renderer.WebGL.Utils
 * @since 3.0.0
 */
module.exports = {

    /**
     * Packs four floats on a range from 0.0 to 1.0 into a single Uint32
     *
     * @function Phaser.Renderer.WebGL.Utils.getTintFromFloats
     * @since 3.0.0
     * 
     * @param {number} r - Red component in a range from 0.0 to 1.0 
     * @param {number} g - [description]
     * @param {number} b - [description]
     * @param {number} a - Alpha component in a range from 0.0 to 1.0
     * 
     * @return {number} [description]
     */
    getTintFromFloats: function (r, g, b, a)
    {
        var ur = ((r * 255.0)|0) & 0xFF;
        var ug = ((g * 255.0)|0) & 0xFF;
        var ub = ((b * 255.0)|0) & 0xFF;
        var ua = ((a * 255.0)|0) & 0xFF;

        return ((ua << 24) | (ur << 16) | (ug << 8) | ub) >>> 0;
    },

    /**
     * Packs a Uint24, representing RGB components, with a Float32, representing
     * the alpha component, with a range between 0.0 and 1.0 and return a Uint32
     *
     * @function Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha
     * @since 3.0.0
     * 
     * @param {number} rgb - Uint24 representing RGB components
     * @param {number} a - Float32 representing Alpha component
     * 
     * @return {number} Packed RGBA as Uint32
     */
    getTintAppendFloatAlpha: function (rgb, a)
    {
        var ua = ((a * 255.0)|0) & 0xFF;
        return ((ua << 24) | rgb) >>> 0;
    },

    /**
     * Packs a Uint24, representing RGB components, with a Float32, representing
     * the alpha component, with a range between 0.0 and 1.0 and return a 
     * swizzled Uint32
     *
     * @function Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlphaAndSwap
     * @since 3.0.0
     * 
     * @param {number} rgb - Uint24 representing RGB components
     * @param {number} a - Float32 representing Alpha component
     * 
     * @return {number} Packed RGBA as Uint32
     */
    getTintAppendFloatAlphaAndSwap: function (rgb, a)
    {
        var ur = ((rgb >> 16)|0) & 0xff;
        var ug = ((rgb >> 8)|0) & 0xff;
        var ub = (rgb|0) & 0xff;
        var ua = ((a * 255.0)|0) & 0xFF;

        return ((ua << 24) | (ub << 16) | (ug << 8) | ur) >>> 0;
    },

    /**
     * Unpacks a Uint24 RGB into an array of floats of ranges of 0.0 and 1.0
     *
     * @function Phaser.Renderer.WebGL.Utils.getFloatsFromUintRGB
     * @since 3.0.0
     * 
     * @param {number} rgb - RGB packed as a Uint24
     * 
     * @return {array} Array of floats representing each component as a float 
     */
    getFloatsFromUintRGB: function (rgb)
    {
        var ur = ((rgb >> 16)|0) & 0xff;
        var ug = ((rgb >> 8)|0) & 0xff;
        var ub = (rgb|0) & 0xff;

        return [ ur / 255.0, ug / 255.0, ub / 255.0 ];
    },

    /**
     * Counts how many attributes of 32 bits a vertex has
     *
     * @function Phaser.Renderer.WebGL.Utils.getComponentCount
     * @since 3.0.0
     * 
     * @param {array} attributes - Array of attributes 
     * @param {WebGLRenderingContext} glContext - WebGLContext used for check types
     * 
     * @return {number} Count of 32 bit attributes in vertex
     */
    getComponentCount: function (attributes, glContext)
    {
        var count = 0;

        for (var index = 0; index < attributes.length; ++index)
        {
            var element = attributes[index];
            
            if (element.type === glContext.FLOAT)
            {
                count += element.size;
            }
            else
            {
                count += 1; // We'll force any other type to be 32 bit. for now
            }
        }

        return count;
    }

};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var MATH = __webpack_require__(16);
var GetValue = __webpack_require__(4);

//  Allowed types:

//  Implicit
//  {
//      x: 4
//  }
//
//  From function
//  {
//      x: function ()
//  }
//
//  Randomly pick one element from the array
//  {
//      x: [a, b, c, d, e, f]
//  }
//
//  Random integer between min and max:
//  {
//      x: { randInt: [min, max] }
//  }
//
//  Random float between min and max:
//  {
//      x: { randFloat: [min, max] }
//  }

/**
 * [description]
 *
 * @function Phaser.Utils.Objects.GetAdvancedValue
 * @since 3.0.0
 *
 * @param {object} source - [description]
 * @param {string} key - [description]
 * @param {*} defaultValue - [description]
 *
 * @return {*} [description]
 */
var GetAdvancedValue = function (source, key, defaultValue)
{
    var value = GetValue(source, key, null);

    if (value === null)
    {
        return defaultValue;
    }
    else if (Array.isArray(value))
    {
        return MATH.RND.pick(value);
    }
    else if (typeof value === 'object')
    {
        if (value.hasOwnProperty('randInt'))
        {
            return MATH.RND.integerInRange(value.randInt[0], value.randInt[1]);
        }
        else if (value.hasOwnProperty('randFloat'))
        {
            return MATH.RND.realInRange(value.randFloat[0], value.randFloat[1]);
        }
    }
    else if (typeof value === 'function')
    {
        return value(key);
    }

    return value;
};

module.exports = GetAdvancedValue;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var PluginCache = __webpack_require__(15);

/**
 * @classdesc
 * The Game Object Creator is a Scene plugin that allows you to quickly create many common
 * types of Game Objects and return them. Unlike the Game Object Factory, they are not automatically
 * added to the Scene.
 *
 * Game Objects directly register themselves with the Creator and inject their own creation
 * methods into the class.
 *
 * @class GameObjectCreator
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object Factory belongs.
 */
var GameObjectCreator = new Class({

    initialize:

    function GameObjectCreator (scene)
    {
        /**
         * The Scene to which this Game Object Creator belongs.
         *
         * @name Phaser.GameObjects.GameObjectCreator#scene
         * @type {Phaser.Scene}
         * @protected
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * A reference to the Scene.Systems.
         *
         * @name Phaser.GameObjects.GameObjectCreator#systems
         * @type {Phaser.Scenes.Systems}
         * @protected
         * @since 3.0.0
         */
        this.systems = scene.sys;

        /**
         * A reference to the Scene Display List.
         *
         * @name Phaser.GameObjects.GameObjectCreator#displayList
         * @type {Phaser.GameObjects.DisplayList}
         * @protected
         * @since 3.0.0
         */
        this.displayList;

        /**
         * A reference to the Scene Update List.
         *
         * @name Phaser.GameObjects.GameObjectCreator#updateList;
         * @type {Phaser.GameObjects.UpdateList}
         * @protected
         * @since 3.0.0
         */
        this.updateList;

        scene.sys.events.once('boot', this.boot, this);
        scene.sys.events.on('start', this.start, this);
    },

    /**
     * This method is called automatically, only once, when the Scene is first created.
     * Do not invoke it directly.
     *
     * @method Phaser.GameObjects.GameObjectCreator#boot
     * @private
     * @since 3.5.1
     */
    boot: function ()
    {
        this.displayList = this.systems.displayList;
        this.updateList = this.systems.updateList;

        this.systems.events.once('destroy', this.destroy, this);
    },

    /**
     * This method is called automatically by the Scene when it is starting up.
     * It is responsible for creating local systems, properties and listening for Scene events.
     * Do not invoke it directly.
     *
     * @method Phaser.GameObjects.GameObjectCreator#start
     * @private
     * @since 3.5.0
     */
    start: function ()
    {
        this.systems.events.once('shutdown', this.shutdown, this);
    },

    /**
     * The Scene that owns this plugin is shutting down.
     * We need to kill and reset all internal properties as well as stop listening to Scene events.
     *
     * @method Phaser.GameObjects.GameObjectCreator#shutdown
     * @private
     * @since 3.0.0
     */
    shutdown: function ()
    {
        this.systems.events.off('shutdown', this.shutdown, this);
    },

    /**
     * The Scene that owns this plugin is being destroyed.
     * We need to shutdown and then kill off all external references.
     *
     * @method Phaser.GameObjects.GameObjectCreator#destroy
     * @private
     * @since 3.0.0
     */
    destroy: function ()
    {
        this.shutdown();

        this.scene.sys.events.off('start', this.start, this);

        this.scene = null;
        this.systems = null;
        this.displayList = null;
        this.updateList = null;
    }

});

//  Static method called directly by the Game Object creator functions

GameObjectCreator.register = function (factoryType, factoryFunction)
{
    if (!GameObjectCreator.prototype.hasOwnProperty(factoryType))
    {
        GameObjectCreator.prototype[factoryType] = factoryFunction;
    }
};

PluginCache.register('GameObjectCreator', GameObjectCreator, 'make');

module.exports = GameObjectCreator;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * @namespace Phaser.GameObjects.Components
 */

module.exports = {

    Alpha: __webpack_require__(401),
    Animation: __webpack_require__(427),
    BlendMode: __webpack_require__(400),
    ComputedSize: __webpack_require__(1045),
    Crop: __webpack_require__(1044),
    Depth: __webpack_require__(399),
    Flip: __webpack_require__(1043),
    GetBounds: __webpack_require__(1042),
    Mask: __webpack_require__(395),
    Origin: __webpack_require__(1041),
    Pipeline: __webpack_require__(186),
    ScaleMode: __webpack_require__(1040),
    ScrollFactor: __webpack_require__(392),
    Size: __webpack_require__(1039),
    Texture: __webpack_require__(1038),
    TextureCrop: __webpack_require__(1037),
    Tint: __webpack_require__(1036),
    ToJSON: __webpack_require__(391),
    Transform: __webpack_require__(390),
    TransformMatrix: __webpack_require__(38),
    Visible: __webpack_require__(389)

};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

//  Contains the plugins that Phaser uses globally and locally.
//  These are the source objects, not instantiated.
var corePlugins = {};

//  Contains the plugins that the dev has loaded into their game
//  These are the source objects, not instantiated.
var customPlugins = {};

/**
 * @typedef {object} CorePluginContainer
 *
 * @property {string} key - The unique name of this plugin in the core plugin cache.
 * @property {function} plugin - The plugin to be stored. Should be the source object, not instantiated.
 * @property {string} [mapping] - If this plugin is to be injected into the Scene Systems, this is the property key map used.
 * @property {boolean} [custom=false] - Core Scene plugin or a Custom Scene plugin?
 */

/**
 * @typedef {object} CustomPluginContainer
 *
 * @property {string} key - The unique name of this plugin in the custom plugin cache.
 * @property {function} plugin - The plugin to be stored. Should be the source object, not instantiated.
 */

var PluginCache = {};

/**
 * Static method called directly by the Core internal Plugins.
 * Key is a reference used to get the plugin from the plugins object (i.e. InputPlugin)
 * Plugin is the object to instantiate to create the plugin
 * Mapping is what the plugin is injected into the Scene.Systems as (i.e. input)
 *
 * @method Phaser.Plugins.PluginCache.register
 * @since 3.8.0
 * 
 * @param {string} key - A reference used to get this plugin from the plugin cache.
 * @param {function} plugin - The plugin to be stored. Should be the core object, not instantiated.
 * @param {string} mapping - If this plugin is to be injected into the Scene Systems, this is the property key map used.
 * @param {boolean} [custom=false] - Core Scene plugin or a Custom Scene plugin?
 */
PluginCache.register = function (key, plugin, mapping, custom)
{
    if (custom === undefined) { custom = false; }

    corePlugins[key] = { plugin: plugin, mapping: mapping, custom: custom };
};

/**
 * Stores a custom plugin in the global plugin cache.
 * The key must be unique, within the scope of the cache.
 *
 * @method Phaser.Plugins.PluginCache.registerCustom
 * @since 3.8.0
 * 
 * @param {string} key - A reference used to get this plugin from the plugin cache.
 * @param {function} plugin - The plugin to be stored. Should be the core object, not instantiated.
 * @param {string} mapping - If this plugin is to be injected into the Scene Systems, this is the property key map used.
 * @param {?any} data - A value to be passed to the plugin's `init` method.
 */
PluginCache.registerCustom = function (key, plugin, mapping, data)
{
    customPlugins[key] = { plugin: plugin, mapping: mapping, data: data };
};

/**
 * Checks if the given key is already being used in the core plugin cache.
 *
 * @method Phaser.Plugins.PluginCache.hasCore
 * @since 3.8.0
 * 
 * @param {string} key - The key to check for.
 *
 * @return {boolean} `true` if the key is already in use in the core cache, otherwise `false`.
 */
PluginCache.hasCore = function (key)
{
    return corePlugins.hasOwnProperty(key);
};

/**
 * Checks if the given key is already being used in the custom plugin cache.
 *
 * @method Phaser.Plugins.PluginCache.hasCustom
 * @since 3.8.0
 * 
 * @param {string} key - The key to check for.
 *
 * @return {boolean} `true` if the key is already in use in the custom cache, otherwise `false`.
 */
PluginCache.hasCustom = function (key)
{
    return customPlugins.hasOwnProperty(key);
};

/**
 * Returns the core plugin object from the cache based on the given key.
 *
 * @method Phaser.Plugins.PluginCache.getCore
 * @since 3.8.0
 * 
 * @param {string} key - The key of the core plugin to get.
 *
 * @return {CorePluginContainer} The core plugin object.
 */
PluginCache.getCore = function (key)
{
    return corePlugins[key];
};

/**
 * Returns the custom plugin object from the cache based on the given key.
 *
 * @method Phaser.Plugins.PluginCache.getCustom
 * @since 3.8.0
 * 
 * @param {string} key - The key of the custom plugin to get.
 *
 * @return {CustomPluginContainer} The custom plugin object.
 */
PluginCache.getCustom = function (key)
{
    return customPlugins[key];
};

/**
 * Returns an object from the custom cache based on the given key that can be instantiated.
 *
 * @method Phaser.Plugins.PluginCache.getCustomClass
 * @since 3.8.0
 * 
 * @param {string} key - The key of the custom plugin to get.
 *
 * @return {function} The custom plugin object.
 */
PluginCache.getCustomClass = function (key)
{
    return (customPlugins.hasOwnProperty(key)) ? customPlugins[key].plugin : null;
};

/**
 * Removes a core plugin based on the given key.
 *
 * @method Phaser.Plugins.PluginCache.remove
 * @since 3.8.0
 * 
 * @param {string} key - The key of the core plugin to remove.
 */
PluginCache.remove = function (key)
{
    if (corePlugins.hasOwnProperty(key))
    {
        delete corePlugins[key];
    }
};

/**
 * Removes a custom plugin based on the given key.
 *
 * @method Phaser.Plugins.PluginCache.removeCustom
 * @since 3.8.0
 * 
 * @param {string} key - The key of the custom plugin to remove.
 */
PluginCache.removeCustom = function (key)
{
    if (customPlugins.hasOwnProperty(key))
    {
        delete customPlugins[key];
    }
};

/**
 * Removes all Core Plugins.
 * 
 * This includes all of the internal system plugins that Phaser needs, like the Input Plugin and Loader Plugin.
 * So be sure you only call this if you do not wish to run Phaser again.
 *
 * @method Phaser.Plugins.PluginCache.destroyCorePlugins
 * @since 3.12.0
 */
PluginCache.destroyCorePlugins = function ()
{
    for (var key in corePlugins)
    {
        if (corePlugins.hasOwnProperty(key))
        {
            delete corePlugins[key];
        }
    }
};

/**
 * Removes all Custom Plugins.
 *
 * @method Phaser.Plugins.PluginCache.destroyCustomPlugins
 * @since 3.12.0
 */
PluginCache.destroyCustomPlugins = function ()
{
    for (var key in customPlugins)
    {
        if (customPlugins.hasOwnProperty(key))
        {
            delete customPlugins[key];
        }
    }
};

module.exports = PluginCache;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var RND = __webpack_require__(404);

var MATH_CONST = {

    /**
     * The value of PI * 2.
     * 
     * @name Phaser.Math.PI2
     * @type {number}
     * @since 3.0.0
     */
    PI2: Math.PI * 2,

    /**
     * The value of PI * 0.5.
     * 
     * @name Phaser.Math.TAU
     * @type {number}
     * @since 3.0.0
     */
    TAU: Math.PI * 0.5,

    /**
     * An epsilon value (1.0e-6)
     * 
     * @name Phaser.Math.EPSILON
     * @type {number}
     * @since 3.0.0
     */
    EPSILON: 1.0e-6,

    /**
     * For converting degrees to radians (PI / 180)
     * 
     * @name Phaser.Math.DEG_TO_RAD
     * @type {number}
     * @since 3.0.0
     */
    DEG_TO_RAD: Math.PI / 180,

    /**
     * For converting radians to degrees (180 / PI)
     * 
     * @name Phaser.Math.RAD_TO_DEG
     * @type {number}
     * @since 3.0.0
     */
    RAD_TO_DEG: 180 / Math.PI,

    /**
     * An instance of the Random Number Generator.
     * 
     * @name Phaser.Math.RND
     * @type {Phaser.Math.RandomDataGenerator}
     * @since 3.0.0
     */
    RND: new RND()

};

module.exports = MATH_CONST;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var GetFastValue = __webpack_require__(2);

/**
 * @typedef {object} GetTilesWithinFilteringOptions
 *
 * @property {boolean} [isNotEmpty=false] - If true, only return tiles that don't have -1 for an index.
 * @property {boolean} [isColliding=false] - If true, only return tiles that collide on at least one side.
 * @property {boolean} [hasInterestingFace=false] - If true, only return tiles that have at least one interesting face.
 */

/**
 * Gets the tiles in the given rectangular area (in tile coordinates) of the layer.
 *
 * @function Phaser.Tilemaps.Components.GetTilesWithin
 * @private
 * @since 3.0.0
 *
 * @param {integer} tileX - The left most tile index (in tile coordinates) to use as the origin of the area.
 * @param {integer} tileY - The top most tile index (in tile coordinates) to use as the origin of the area.
 * @param {integer} width - How many tiles wide from the `tileX` index the area will be.
 * @param {integer} height - How many tiles tall from the `tileY` index the area will be.
 * @param {object} GetTilesWithinFilteringOptions - Optional filters to apply when getting the tiles.
 * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
 * 
 * @return {Phaser.Tilemaps.Tile[]} Array of Tile objects.
 */
var GetTilesWithin = function (tileX, tileY, width, height, filteringOptions, layer)
{
    if (tileX === undefined) { tileX = 0; }
    if (tileY === undefined) { tileY = 0; }
    if (width === undefined) { width = layer.width; }
    if (height === undefined) { height = layer.height; }

    var isNotEmpty = GetFastValue(filteringOptions, 'isNotEmpty', false);
    var isColliding = GetFastValue(filteringOptions, 'isColliding', false);
    var hasInterestingFace = GetFastValue(filteringOptions, 'hasInterestingFace', false);

    // Clip x, y to top left of map, while shrinking width/height to match.
    if (tileX < 0)
    {
        width += tileX;
        tileX = 0;
    }
    if (tileY < 0)
    {
        height += tileY;
        tileY = 0;
    }

    // Clip width and height to bottom right of map.
    if (tileX + width > layer.width)
    {
        width = Math.max(layer.width - tileX, 0);
    }
    if (tileY + height > layer.height)
    {
        height = Math.max(layer.height - tileY, 0);
    }

    var results = [];

    for (var ty = tileY; ty < tileY + height; ty++)
    {
        for (var tx = tileX; tx < tileX + width; tx++)
        {
            var tile = layer.data[ty][tx];
            if (tile !== null)
            {
                if (isNotEmpty && tile.index === -1) { continue; }
                if (isColliding && !tile.collides) { continue; }
                if (hasInterestingFace && !tile.hasInterestingFace) { continue; }
                results.push(tile);
            }
        }
    }

    return results;
};

module.exports = GetTilesWithin;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var FILE_CONST = {

    /**
     * The Loader is idle.
     * 
     * @name Phaser.Loader.LOADER_IDLE
     * @type {integer}
     * @since 3.0.0
     */
    LOADER_IDLE: 0,

    /**
     * The Loader is actively loading.
     * 
     * @name Phaser.Loader.LOADER_LOADING
     * @type {integer}
     * @since 3.0.0
     */
    LOADER_LOADING: 1,

    /**
     * The Loader is processing files is has loaded.
     * 
     * @name Phaser.Loader.LOADER_PROCESSING
     * @type {integer}
     * @since 3.0.0
     */
    LOADER_PROCESSING: 2,

    /**
     * The Loader has completed loading and processing.
     * 
     * @name Phaser.Loader.LOADER_COMPLETE
     * @type {integer}
     * @since 3.0.0
     */
    LOADER_COMPLETE: 3,

    /**
     * The Loader is shutting down.
     * 
     * @name Phaser.Loader.LOADER_SHUTDOWN
     * @type {integer}
     * @since 3.0.0
     */
    LOADER_SHUTDOWN: 4,

    /**
     * The Loader has been destroyed.
     * 
     * @name Phaser.Loader.LOADER_DESTROYED
     * @type {integer}
     * @since 3.0.0
     */
    LOADER_DESTROYED: 5,

    /**
     * File is in the load queue but not yet started
     * 
     * @name Phaser.Loader.FILE_PENDING
     * @type {integer}
     * @since 3.0.0
     */
    FILE_PENDING: 10,

    /**
     * File has been started to load by the loader (onLoad called)
     * 
     * @name Phaser.Loader.FILE_LOADING
     * @type {integer}
     * @since 3.0.0
     */
    FILE_LOADING: 11,

    /**
     * File has loaded successfully, awaiting processing    
     * 
     * @name Phaser.Loader.FILE_LOADED
     * @type {integer}
     * @since 3.0.0
     */
    FILE_LOADED: 12,

    /**
     * File failed to load
     * 
     * @name Phaser.Loader.FILE_FAILED
     * @type {integer}
     * @since 3.0.0
     */
    FILE_FAILED: 13,

    /**
     * File is being processed (onProcess callback)
     * 
     * @name Phaser.Loader.FILE_PROCESSING
     * @type {integer}
     * @since 3.0.0
     */
    FILE_PROCESSING: 14,

    /**
     * The File has errored somehow during processing.
     * 
     * @name Phaser.Loader.FILE_ERRORED
     * @type {integer}
     * @since 3.0.0
     */
    FILE_ERRORED: 16,

    /**
     * File has finished processing.
     * 
     * @name Phaser.Loader.FILE_COMPLETE
     * @type {integer}
     * @since 3.0.0
     */
    FILE_COMPLETE: 17,

    /**
     * File has been destroyed
     * 
     * @name Phaser.Loader.FILE_DESTROYED
     * @type {integer}
     * @since 3.0.0
     */
    FILE_DESTROYED: 18,

    /**
     * File was populated from local data and doesn't need an HTTP request
     * 
     * @name Phaser.Loader.FILE_POPULATED
     * @type {integer}
     * @since 3.0.0
     */
    FILE_POPULATED: 19

};

module.exports = FILE_CONST;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var ComponentsToJSON = __webpack_require__(391);
var DataManager = __webpack_require__(123);
var EventEmitter = __webpack_require__(11);

/**
 * @classdesc
 * The base class that all Game Objects extend.
 * You don't create GameObjects directly and they cannot be added to the display list.
 * Instead, use them as the base for your own custom classes.
 *
 * @class GameObject
 * @memberof Phaser.GameObjects
 * @extends Phaser.Events.EventEmitter
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object belongs.
 * @param {string} type - A textual representation of the type of Game Object, i.e. `sprite`.
 */
var GameObject = new Class({

    Extends: EventEmitter,

    initialize:

    function GameObject (scene, type)
    {
        EventEmitter.call(this);

        /**
         * The Scene to which this Game Object belongs.
         * Game Objects can only belong to one Scene.
         *
         * @name Phaser.GameObjects.GameObject#scene
         * @type {Phaser.Scene}
         * @protected
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * A textual representation of this Game Object, i.e. `sprite`.
         * Used internally by Phaser but is available for your own custom classes to populate.
         *
         * @name Phaser.GameObjects.GameObject#type
         * @type {string}
         * @since 3.0.0
         */
        this.type = type;

        /**
         * The parent Container of this Game Object, if it has one.
         *
         * @name Phaser.GameObjects.GameObject#parentContainer
         * @type {Phaser.GameObjects.Container}
         * @since 3.4.0
         */
        this.parentContainer = null;

        /**
         * The name of this Game Object.
         * Empty by default and never populated by Phaser, this is left for developers to use.
         *
         * @name Phaser.GameObjects.GameObject#name
         * @type {string}
         * @default ''
         * @since 3.0.0
         */
        this.name = '';

        /**
         * The active state of this Game Object.
         * A Game Object with an active state of `true` is processed by the Scenes UpdateList, if added to it.
         * An active object is one which is having its logic and internal systems updated.
         *
         * @name Phaser.GameObjects.GameObject#active
         * @type {boolean}
         * @default true
         * @since 3.0.0
         */
        this.active = true;

        /**
         * The Tab Index of the Game Object.
         * Reserved for future use by plugins and the Input Manager.
         *
         * @name Phaser.GameObjects.GameObject#tabIndex
         * @type {integer}
         * @default -1
         * @since 3.0.0
         */
        this.tabIndex = -1;

        /**
         * A Data Manager.
         * It allows you to store, query and get key/value paired information specific to this Game Object.
         * `null` by default. Automatically created if you use `getData` or `setData` or `setDataEnabled`.
         *
         * @name Phaser.GameObjects.GameObject#data
         * @type {Phaser.Data.DataManager}
         * @default null
         * @since 3.0.0
         */
        this.data = null;

        /**
         * The flags that are compared against `RENDER_MASK` to determine if this Game Object will render or not.
         * The bits are 0001 | 0010 | 0100 | 1000 set by the components Visible, Alpha, Transform and Texture respectively.
         * If those components are not used by your custom class then you can use this bitmask as you wish.
         *
         * @name Phaser.GameObjects.GameObject#renderFlags
         * @type {integer}
         * @default 15
         * @since 3.0.0
         */
        this.renderFlags = 15;

        /**
         * A bitmask that controls if this Game Object is drawn by a Camera or not.
         * Not usually set directly, instead call `Camera.ignore`, however you can
         * set this property directly using the Camera.id property:
         *
         * @example
         * this.cameraFilter |= camera.id
         *
         * @name Phaser.GameObjects.GameObject#cameraFilter
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.cameraFilter = 0;

        /**
         * If this Game Object is enabled for input then this property will contain an InteractiveObject instance.
         * Not usually set directly. Instead call `GameObject.setInteractive()`.
         *
         * @name Phaser.GameObjects.GameObject#input
         * @type {?Phaser.Input.InteractiveObject}
         * @default null
         * @since 3.0.0
         */
        this.input = null;

        /**
         * If this Game Object is enabled for physics then this property will contain a reference to a Physics Body.
         *
         * @name Phaser.GameObjects.GameObject#body
         * @type {?(object|Phaser.Physics.Arcade.Body|Phaser.Physics.Impact.Body)}
         * @default null
         * @since 3.0.0
         */
        this.body = null;

        /**
         * This Game Object will ignore all calls made to its destroy method if this flag is set to `true`.
         * This includes calls that may come from a Group, Container or the Scene itself.
         * While it allows you to persist a Game Object across Scenes, please understand you are entirely
         * responsible for managing references to and from this Game Object.
         *
         * @name Phaser.GameObjects.GameObject#ignoreDestroy
         * @type {boolean}
         * @default false
         * @since 3.5.0
         */
        this.ignoreDestroy = false;

        //  Tell the Scene to re-sort the children
        scene.sys.queueDepthSort();
    },

    /**
     * Sets the `active` property of this Game Object and returns this Game Object for further chaining.
     * A Game Object with its `active` property set to `true` will be updated by the Scenes UpdateList.
     *
     * @method Phaser.GameObjects.GameObject#setActive
     * @since 3.0.0
     *
     * @param {boolean} value - True if this Game Object should be set as active, false if not.
     *
     * @return {this} This GameObject.
     */
    setActive: function (value)
    {
        this.active = value;

        return this;
    },

    /**
     * Sets the `name` property of this Game Object and returns this Game Object for further chaining.
     * The `name` property is not populated by Phaser and is presented for your own use.
     *
     * @method Phaser.GameObjects.GameObject#setName
     * @since 3.0.0
     *
     * @param {string} value - The name to be given to this Game Object.
     *
     * @return {this} This GameObject.
     */
    setName: function (value)
    {
        this.name = value;

        return this;
    },

    /**
     * Adds a Data Manager component to this Game Object.
     *
     * @method Phaser.GameObjects.GameObject#setDataEnabled
     * @since 3.0.0
     * @see Phaser.Data.DataManager
     *
     * @return {this} This GameObject.
     */
    setDataEnabled: function ()
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        return this;
    },

    /**
     * Allows you to store a key value pair within this Game Objects Data Manager.
     *
     * If the Game Object has not been enabled for data (via `setDataEnabled`) then it will be enabled
     * before setting the value.
     *
     * If the key doesn't already exist in the Data Manager then it is created.
     *
     * ```javascript
     * sprite.setData('name', 'Red Gem Stone');
     * ```
     *
     * You can also pass in an object of key value pairs as the first argument:
     *
     * ```javascript
     * sprite.setData({ name: 'Red Gem Stone', level: 2, owner: 'Link', gold: 50 });
     * ```
     *
     * To get a value back again you can call `getData`:
     *
     * ```javascript
     * sprite.getData('gold');
     * ```
     *
     * Or you can access the value directly via the `values` property, where it works like any other variable:
     *
     * ```javascript
     * sprite.data.values.gold += 50;
     * ```
     *
     * When the value is first set, a `setdata` event is emitted from this Game Object.
     *
     * If the key already exists, a `changedata` event is emitted instead, along an event named after the key.
     * For example, if you updated an existing key called `PlayerLives` then it would emit the event `changedata_PlayerLives`.
     * These events will be emitted regardless if you use this method to set the value, or the direct `values` setter.
     *
     * Please note that the data keys are case-sensitive and must be valid JavaScript Object property strings.
     * This means the keys `gold` and `Gold` are treated as two unique values within the Data Manager.
     *
     * @method Phaser.GameObjects.GameObject#setData
     * @since 3.0.0
     *
     * @param {(string|object)} key - The key to set the value for. Or an object or key value pairs. If an object the `data` argument is ignored.
     * @param {*} data - The value to set for the given key. If an object is provided as the key this argument is ignored.
     *
     * @return {this} This GameObject.
     */
    setData: function (key, value)
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        this.data.set(key, value);

        return this;
    },

    /**
     * Retrieves the value for the given key in this Game Objects Data Manager, or undefined if it doesn't exist.
     *
     * You can also access values via the `values` object. For example, if you had a key called `gold` you can do either:
     *
     * ```javascript
     * sprite.getData('gold');
     * ```
     *
     * Or access the value directly:
     *
     * ```javascript
     * sprite.data.values.gold;
     * ```
     *
     * You can also pass in an array of keys, in which case an array of values will be returned:
     *
     * ```javascript
     * sprite.getData([ 'gold', 'armor', 'health' ]);
     * ```
     *
     * This approach is useful for destructuring arrays in ES6.
     *
     * @method Phaser.GameObjects.GameObject#getData
     * @since 3.0.0
     *
     * @param {(string|string[])} key - The key of the value to retrieve, or an array of keys.
     *
     * @return {*} The value belonging to the given key, or an array of values, the order of which will match the input array.
     */
    getData: function (key)
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        return this.data.get(key);
    },

    /**
     * Pass this Game Object to the Input Manager to enable it for Input.
     *
     * Input works by using hit areas, these are nearly always geometric shapes, such as rectangles or circles, that act as the hit area
     * for the Game Object. However, you can provide your own hit area shape and callback, should you wish to handle some more advanced
     * input detection.
     *
     * If no arguments are provided it will try and create a rectangle hit area based on the texture frame the Game Object is using. If
     * this isn't a texture-bound object, such as a Graphics or BitmapText object, this will fail, and you'll need to provide a specific
     * shape for it to use.
     *
     * You can also provide an Input Configuration Object as the only argument to this method.
     *
     * @method Phaser.GameObjects.GameObject#setInteractive
     * @since 3.0.0
     *
     * @param {(Phaser.Input.InputConfiguration|any)} [shape] - Either an input configuration object, or a geometric shape that defines the hit area for the Game Object. If not specified a Rectangle will be used.
     * @param {HitAreaCallback} [callback] - A callback to be invoked when the Game Object is interacted with. If you provide a shape you must also provide a callback.
     * @param {boolean} [dropZone=false] - Should this Game Object be treated as a drop zone target?
     *
     * @return {this} This GameObject.
     */
    setInteractive: function (shape, callback, dropZone)
    {
        this.scene.sys.input.enable(this, shape, callback, dropZone);

        return this;
    },

    /**
     * If this Game Object has previously been enabled for input, this will disable it.
     *
     * An object that is disabled for input stops processing or being considered for
     * input events, but can be turned back on again at any time by simply calling
     * `setInteractive()` with no arguments provided.
     *
     * If want to completely remove interaction from this Game Object then use `removeInteractive` instead.
     *
     * @method Phaser.GameObjects.GameObject#disableInteractive
     * @since 3.7.0
     *
     * @return {this} This GameObject.
     */
    disableInteractive: function ()
    {
        if (this.input)
        {
            this.input.enabled = false;
        }

        return this;
    },

    /**
     * If this Game Object has previously been enabled for input, this will queue it
     * for removal, causing it to no longer be interactive. The removal happens on
     * the next game step, it is not immediate.
     *
     * The Interactive Object that was assigned to this Game Object will be destroyed,
     * removed from the Input Manager and cleared from this Game Object.
     *
     * If you wish to re-enable this Game Object at a later date you will need to
     * re-create its InteractiveObject by calling `setInteractive` again.
     *
     * If you wish to only temporarily stop an object from receiving input then use
     * `disableInteractive` instead, as that toggles the interactive state, where-as
     * this erases it completely.
     * 
     * If you wish to resize a hit area, don't remove and then set it as being
     * interactive. Instead, access the hitarea object directly and resize the shape
     * being used. I.e.: `sprite.input.hitArea.setSize(width, height)` (assuming the
     * shape is a Rectangle, which it is by default.)
     *
     * @method Phaser.GameObjects.GameObject#removeInteractive
     * @since 3.7.0
     *
     * @return {this} This GameObject.
     */
    removeInteractive: function ()
    {
        this.scene.sys.input.clear(this);

        this.input = undefined;

        return this;
    },

    /**
     * To be overridden by custom GameObjects. Allows base objects to be used in a Pool.
     *
     * @method Phaser.GameObjects.GameObject#update
     * @since 3.0.0
     *
     * @param {...*} [args] - args
     */
    update: function ()
    {
    },

    /**
     * Returns a JSON representation of the Game Object.
     *
     * @method Phaser.GameObjects.GameObject#toJSON
     * @since 3.0.0
     *
     * @return {JSONGameObject} A JSON representation of the Game Object.
     */
    toJSON: function ()
    {
        return ComponentsToJSON(this);
    },

    /**
     * Compares the renderMask with the renderFlags to see if this Game Object will render or not.
     * Also checks the Game Object against the given Cameras exclusion list.
     *
     * @method Phaser.GameObjects.GameObject#willRender
     * @since 3.0.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera to check against this Game Object.
     *
     * @return {boolean} True if the Game Object should be rendered, otherwise false.
     */
    willRender: function (camera)
    {
        return !(GameObject.RENDER_MASK !== this.renderFlags || (this.cameraFilter > 0 && (this.cameraFilter & camera.id)));
    },

    /**
     * Returns an array containing the display list index of either this Game Object, or if it has one,
     * its parent Container. It then iterates up through all of the parent containers until it hits the
     * root of the display list (which is index 0 in the returned array).
     *
     * Used internally by the InputPlugin but also useful if you wish to find out the display depth of
     * this Game Object and all of its ancestors.
     *
     * @method Phaser.GameObjects.GameObject#getIndexList
     * @since 3.4.0
     *
     * @return {integer[]} An array of display list position indexes.
     */
    getIndexList: function ()
    {
        // eslint-disable-next-line consistent-this
        var child = this;
        var parent = this.parentContainer;

        var indexes = [];

        while (parent)
        {
            // indexes.unshift([parent.getIndex(child), parent.name]);
            indexes.unshift(parent.getIndex(child));

            child = parent;

            if (!parent.parentContainer)
            {
                break;
            }
            else
            {
                parent = parent.parentContainer;
            }
        }

        // indexes.unshift([this.scene.sys.displayList.getIndex(child), 'root']);
        indexes.unshift(this.scene.sys.displayList.getIndex(child));

        return indexes;
    },

    /**
     * Destroys this Game Object removing it from the Display List and Update List and
     * severing all ties to parent resources.
     *
     * Also removes itself from the Input Manager and Physics Manager if previously enabled.
     *
     * Use this to remove a Game Object from your game if you don't ever plan to use it again.
     * As long as no reference to it exists within your own code it should become free for
     * garbage collection by the browser.
     *
     * If you just want to temporarily disable an object then look at using the
     * Game Object Pool instead of destroying it, as destroyed objects cannot be resurrected.
     *
     * @method Phaser.GameObjects.GameObject#destroy
     * @since 3.0.0
     * 
     * @param {boolean} [fromScene=false] - Is this Game Object being destroyed as the result of a Scene shutdown?
     */
    destroy: function (fromScene)
    {
        if (fromScene === undefined) { fromScene = false; }

        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy)
        {
            return;
        }

        if (this.preDestroy)
        {
            this.preDestroy.call(this);
        }

        this.emit('destroy', this);

        var sys = this.scene.sys;

        if (!fromScene)
        {
            sys.displayList.remove(this);
            sys.updateList.remove(this);
        }

        if (this.input)
        {
            sys.input.clear(this);
            this.input = undefined;
        }

        if (this.data)
        {
            this.data.destroy();

            this.data = undefined;
        }

        if (this.body)
        {
            this.body.destroy();
            this.body = undefined;
        }

        //  Tell the Scene to re-sort the children
        if (!fromScene)
        {
            sys.queueDepthSort();
        }

        this.active = false;
        this.visible = false;

        this.scene = undefined;

        this.parentContainer = undefined;

        this.removeAllListeners();
    }

});

/**
 * The bitmask that `GameObject.renderFlags` is compared against to determine if the Game Object will render or not.
 *
 * @constant {integer} RENDER_MASK
 * @memberof Phaser.GameObjects.GameObject
 * @default
 */
GameObject.RENDER_MASK = 15;

module.exports = GameObject;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var IsPlainObject = __webpack_require__(8);

// @param {boolean} deep - Perform a deep copy?
// @param {object} target - The target object to copy to.
// @return {object} The extended object.

/**
 * This is a slightly modified version of http://api.jquery.com/jQuery.extend/
 *
 * @function Phaser.Utils.Objects.Extend
 * @since 3.0.0
 *
 * @return {object} [description]
 */
var Extend = function ()
{
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean')
    {
        deep = target;
        target = arguments[1] || {};

        // skip the boolean and the target
        i = 2;
    }

    // extend Phaser if only one argument is passed
    if (length === i)
    {
        target = this;
        --i;
    }

    for (; i < length; i++)
    {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null)
        {
            // Extend the base object
            for (name in options)
            {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy)
                {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (IsPlainObject(copy) || (copyIsArray = Array.isArray(copy))))
                {
                    if (copyIsArray)
                    {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else
                    {
                        clone = src && IsPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = Extend(deep, clone, copy);

                // Don't bring in undefined values
                }
                else if (copy !== undefined)
                {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

module.exports = Extend;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var CONST = __webpack_require__(18);
var GetFastValue = __webpack_require__(2);
var GetURL = __webpack_require__(141);
var MergeXHRSettings = __webpack_require__(140);
var XHRLoader = __webpack_require__(254);
var XHRSettings = __webpack_require__(105);

/**
 * @typedef {object} FileConfig
 *
 * @property {string} type - The file type string (image, json, etc) for sorting within the Loader.
 * @property {string} key - Unique cache key (unique within its file type)
 * @property {string} [url] - The URL of the file, not including baseURL.
 * @property {string} [path] - The path of the file, not including the baseURL.
 * @property {string} [extension] - The default extension this file uses.
 * @property {XMLHttpRequestResponseType} [responseType] - The responseType to be used by the XHR request.
 * @property {(XHRSettingsObject|false)} [xhrSettings=false] - Custom XHR Settings specific to this file and merged with the Loader defaults.
 * @property {any} [config] - A config object that can be used by file types to store transitional data.
 */

/**
 * @classdesc
 * The base File class used by all File Types that the Loader can support.
 * You shouldn't create an instance of a File directly, but should extend it with your own class, setting a custom type and processing methods.
 *
 * @class File
 * @memberof Phaser.Loader
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Loader.LoaderPlugin} loader - The Loader that is going to load this File.
 * @param {FileConfig} fileConfig - The file configuration object, as created by the file type.
 */
var File = new Class({

    initialize:

    function File (loader, fileConfig)
    {
        /**
         * A reference to the Loader that is going to load this file.
         *
         * @name Phaser.Loader.File#loader
         * @type {Phaser.Loader.LoaderPlugin}
         * @since 3.0.0
         */
        this.loader = loader;

        /**
         * A reference to the Cache, or Texture Manager, that is going to store this file if it loads.
         *
         * @name Phaser.Loader.File#cache
         * @type {(Phaser.Cache.BaseCache|Phaser.Textures.TextureManager)}
         * @since 3.7.0
         */
        this.cache = GetFastValue(fileConfig, 'cache', false);

        /**
         * The file type string (image, json, etc) for sorting within the Loader.
         *
         * @name Phaser.Loader.File#type
         * @type {string}
         * @since 3.0.0
         */
        this.type = GetFastValue(fileConfig, 'type', false);

        /**
         * Unique cache key (unique within its file type)
         *
         * @name Phaser.Loader.File#key
         * @type {string}
         * @since 3.0.0
         */
        this.key = GetFastValue(fileConfig, 'key', false);

        var loadKey = this.key;

        if (loader.prefix && loader.prefix !== '')
        {
            this.key = loader.prefix + loadKey;
        }

        if (!this.type || !this.key)
        {
            throw new Error('Error calling \'Loader.' + this.type + '\' invalid key provided.');
        }

        /**
         * The URL of the file, not including baseURL.
         * Automatically has Loader.path prepended to it.
         *
         * @name Phaser.Loader.File#url
         * @type {string}
         * @since 3.0.0
         */
        this.url = GetFastValue(fileConfig, 'url');

        if (this.url === undefined)
        {
            this.url = loader.path + loadKey + '.' + GetFastValue(fileConfig, 'extension', '');
        }
        else if (typeof(this.url) !== 'function')
        {
            this.url = loader.path + this.url;
        }

        /**
         * The final URL this file will load from, including baseURL and path.
         * Set automatically when the Loader calls 'load' on this file.
         *
         * @name Phaser.Loader.File#src
         * @type {string}
         * @since 3.0.0
         */
        this.src = '';

        /**
         * The merged XHRSettings for this file.
         *
         * @name Phaser.Loader.File#xhrSettings
         * @type {XHRSettingsObject}
         * @since 3.0.0
         */
        this.xhrSettings = XHRSettings(GetFastValue(fileConfig, 'responseType', undefined));

        if (GetFastValue(fileConfig, 'xhrSettings', false))
        {
            this.xhrSettings = MergeXHRSettings(this.xhrSettings, GetFastValue(fileConfig, 'xhrSettings', {}));
        }

        /**
         * The XMLHttpRequest instance (as created by XHR Loader) that is loading this File.
         *
         * @name Phaser.Loader.File#xhrLoader
         * @type {?XMLHttpRequest}
         * @since 3.0.0
         */
        this.xhrLoader = null;

        /**
         * The current state of the file. One of the FILE_CONST values.
         *
         * @name Phaser.Loader.File#state
         * @type {integer}
         * @since 3.0.0
         */
        this.state = (typeof(this.url) === 'function') ? CONST.FILE_POPULATED : CONST.FILE_PENDING;

        /**
         * The total size of this file.
         * Set by onProgress and only if loading via XHR.
         *
         * @name Phaser.Loader.File#bytesTotal
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.bytesTotal = 0;

        /**
         * Updated as the file loads.
         * Only set if loading via XHR.
         *
         * @name Phaser.Loader.File#bytesLoaded
         * @type {number}
         * @default -1
         * @since 3.0.0
         */
        this.bytesLoaded = -1;

        /**
         * A percentage value between 0 and 1 indicating how much of this file has loaded.
         * Only set if loading via XHR.
         *
         * @name Phaser.Loader.File#percentComplete
         * @type {number}
         * @default -1
         * @since 3.0.0
         */
        this.percentComplete = -1;

        /**
         * For CORs based loading.
         * If this is undefined then the File will check BaseLoader.crossOrigin and use that (if set)
         *
         * @name Phaser.Loader.File#crossOrigin
         * @type {(string|undefined)}
         * @since 3.0.0
         */
        this.crossOrigin = undefined;

        /**
         * The processed file data, stored here after the file has loaded.
         *
         * @name Phaser.Loader.File#data
         * @type {*}
         * @since 3.0.0
         */
        this.data = undefined;

        /**
         * A config object that can be used by file types to store transitional data.
         *
         * @name Phaser.Loader.File#config
         * @type {*}
         * @since 3.0.0
         */
        this.config = GetFastValue(fileConfig, 'config', {});

        /**
         * If this is a multipart file, i.e. an atlas and its json together, then this is a reference
         * to the parent MultiFile. Set and used internally by the Loader or specific file types.
         *
         * @name Phaser.Loader.File#multiFile
         * @type {?Phaser.Loader.MultiFile}
         * @since 3.7.0
         */
        this.multiFile;

        /**
         * Does this file have an associated linked file? Such as an image and a normal map.
         * Atlases and Bitmap Fonts use the multiFile, because those files need loading together but aren't
         * actually bound by data, where-as a linkFile is.
         *
         * @name Phaser.Loader.File#linkFile
         * @type {?Phaser.Loader.File}
         * @since 3.7.0
         */
        this.linkFile;
    },

    /**
     * Links this File with another, so they depend upon each other for loading and processing.
     *
     * @method Phaser.Loader.File#setLink
     * @since 3.7.0
     *
     * @param {Phaser.Loader.File} fileB - The file to link to this one.
     */
    setLink: function (fileB)
    {
        this.linkFile = fileB;

        fileB.linkFile = this;
    },

    /**
     * Resets the XHRLoader instance this file is using.
     *
     * @method Phaser.Loader.File#resetXHR
     * @since 3.0.0
     */
    resetXHR: function ()
    {
        if (this.xhrLoader)
        {
            this.xhrLoader.onload = undefined;
            this.xhrLoader.onerror = undefined;
            this.xhrLoader.onprogress = undefined;
        }
    },

    /**
     * Called by the Loader, starts the actual file downloading.
     * During the load the methods onLoad, onError and onProgress are called, based on the XHR events.
     * You shouldn't normally call this method directly, it's meant to be invoked by the Loader.
     *
     * @method Phaser.Loader.File#load
     * @since 3.0.0
     */
    load: function ()
    {
        if (this.state === CONST.FILE_POPULATED)
        {
            //  Can happen for example in a JSONFile if they've provided a JSON object instead of a URL
            this.loader.nextFile(this, true);
        }
        else
        {
            this.src = GetURL(this, this.loader.baseURL);

            if (this.src.indexOf('data:') === 0)
            {
                console.warn('Local data URIs are not supported: ' + this.key);
            }
            else
            {
                //  The creation of this XHRLoader starts the load process going.
                //  It will automatically call the following, based on the load outcome:
                //  
                // xhr.onload = this.onLoad
                // xhr.onerror = this.onError
                // xhr.onprogress = this.onProgress

                this.xhrLoader = XHRLoader(this, this.loader.xhr);
            }
        }
    },

    /**
     * Called when the file finishes loading, is sent a DOM ProgressEvent.
     *
     * @method Phaser.Loader.File#onLoad
     * @since 3.0.0
     *
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest that caused this onload event.
     * @param {ProgressEvent} event - The DOM ProgressEvent that resulted from this load.
     */
    onLoad: function (xhr, event)
    {
        var success = !(event.target && event.target.status !== 200);

        //  Handle HTTP status codes of 4xx and 5xx as errors, even if xhr.onerror was not called.
        if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599)
        {
            success = false;
        }

        this.resetXHR();

        this.loader.nextFile(this, success);
    },

    /**
     * Called if the file errors while loading, is sent a DOM ProgressEvent.
     *
     * @method Phaser.Loader.File#onError
     * @since 3.0.0
     *
     * @param {ProgressEvent} event - The DOM ProgressEvent that resulted from this error.
     */
    onError: function ()
    {
        this.resetXHR();

        this.loader.nextFile(this, false);
    },

    /**
     * Called during the file load progress. Is sent a DOM ProgressEvent.
     *
     * @method Phaser.Loader.File#onProgress
     * @since 3.0.0
     *
     * @param {ProgressEvent} event - The DOM ProgressEvent.
     */
    onProgress: function (event)
    {
        if (event.lengthComputable)
        {
            this.bytesLoaded = event.loaded;
            this.bytesTotal = event.total;

            this.percentComplete = Math.min((this.bytesLoaded / this.bytesTotal), 1);

            this.loader.emit('fileprogress', this, this.percentComplete);
        }
    },

    /**
     * Usually overridden by the FileTypes and is called by Loader.nextFile.
     * This method controls what extra work this File does with its loaded data, for example a JSON file will parse itself during this stage.
     *
     * @method Phaser.Loader.File#onProcess
     * @since 3.0.0
     */
    onProcess: function ()
    {
        this.state = CONST.FILE_PROCESSING;

        this.onProcessComplete();
    },

    /**
     * Called when the File has completed processing.
     * Checks on the state of its multifile, if set.
     *
     * @method Phaser.Loader.File#onProcessComplete
     * @since 3.7.0
     */
    onProcessComplete: function ()
    {
        this.state = CONST.FILE_COMPLETE;

        if (this.multiFile)
        {
            this.multiFile.onFileComplete(this);
        }

        this.loader.fileProcessComplete(this);
    },

    /**
     * Called when the File has completed processing but it generated an error.
     * Checks on the state of its multifile, if set.
     *
     * @method Phaser.Loader.File#onProcessError
     * @since 3.7.0
     */
    onProcessError: function ()
    {
        this.state = CONST.FILE_ERRORED;

        if (this.multiFile)
        {
            this.multiFile.onFileFailed(this);
        }

        this.loader.fileProcessComplete(this);
    },

    /**
     * Checks if a key matching the one used by this file exists in the target Cache or not.
     * This is called automatically by the LoaderPlugin to decide if the file can be safely
     * loaded or will conflict.
     *
     * @method Phaser.Loader.File#hasCacheConflict
     * @since 3.7.0
     *
     * @return {boolean} `true` if adding this file will cause a conflict, otherwise `false`.
     */
    hasCacheConflict: function ()
    {
        return (this.cache && this.cache.exists(this.key));
    },

    /**
     * Adds this file to its target cache upon successful loading and processing.
     * This method is often overridden by specific file types.
     *
     * @method Phaser.Loader.File#addToCache
     * @since 3.7.0
     */
    addToCache: function ()
    {
        if (this.cache)
        {
            this.cache.add(this.key, this.data);
        }

        this.pendingDestroy();
    },

    /**
     * You can listen for this event from the LoaderPlugin. It is dispatched _every time_
     * a file loads and is sent 3 arguments, which allow you to identify the file:
     *
     * ```javascript
     * this.load.on('filecomplete', function (key, type, data) {
     *     // Your handler code
     * });
     * ```
     * 
     * @event Phaser.Loader.File#fileCompleteEvent
     * @param {string} key - The key of the file that just loaded and finished processing.
     * @param {string} type - The type of the file that just loaded and finished processing.
     * @param {any} data - The data of the file.
     */

    /**
     * You can listen for this event from the LoaderPlugin. It is dispatched only once per
     * file and you have to use a special listener handle to pick it up.
     * 
     * The string of the event is based on the file type and the key you gave it, split up
     * using hyphens.
     * 
     * For example, if you have loaded an image with a key of `monster`, you can listen for it
     * using the following:
     *
     * ```javascript
     * this.load.on('filecomplete-image-monster', function (key, type, data) {
     *     // Your handler code
     * });
     * ```
     *
     * Or, if you have loaded a texture atlas with a key of `Level1`:
     * 
     * ```javascript
     * this.load.on('filecomplete-atlas-Level1', function (key, type, data) {
     *     // Your handler code
     * });
     * ```
     * 
     * Or, if you have loaded a sprite sheet with a key of `Explosion` and a prefix of `GAMEOVER`:
     * 
     * ```javascript
     * this.load.on('filecomplete-spritesheet-GAMEOVERExplosion', function (key, type, data) {
     *     // Your handler code
     * });
     * ```
     * 
     * @event Phaser.Loader.File#singleFileCompleteEvent
     * @param {any} data - The data of the file.
     */

    /**
     * Called once the file has been added to its cache and is now ready for deletion from the Loader.
     * It will emit a `filecomplete` event from the LoaderPlugin.
     *
     * @method Phaser.Loader.File#pendingDestroy
     * @fires Phaser.Loader.File#fileCompleteEvent
     * @fires Phaser.Loader.File#singleFileCompleteEvent
     * @since 3.7.0
     */
    pendingDestroy: function (data)
    {
        if (data === undefined) { data = this.data; }

        var key = this.key;
        var type = this.type;

        this.loader.emit('filecomplete', key, type, data);
        this.loader.emit('filecomplete-' + type + '-' + key, key, type, data);

        this.loader.flagForRemoval(this);
    },

    /**
     * Destroy this File and any references it holds.
     *
     * @method Phaser.Loader.File#destroy
     * @since 3.7.0
     */
    destroy: function ()
    {
        this.loader = null;
        this.cache = null;
        this.xhrSettings = null;
        this.multiFile = null;
        this.linkFile = null;
        this.data = null;
    }

});

/**
 * Static method for creating object URL using URL API and setting it as image 'src' attribute.
 * If URL API is not supported (usually on old browsers) it falls back to creating Base64 encoded url using FileReader.
 *
 * @method Phaser.Loader.File.createObjectURL
 * @static
 * @param {HTMLImageElement} image - Image object which 'src' attribute should be set to object URL.
 * @param {Blob} blob - A Blob object to create an object URL for.
 * @param {string} defaultType - Default mime type used if blob type is not available.
 */
File.createObjectURL = function (image, blob, defaultType)
{
    if (typeof URL === 'function')
    {
        image.src = URL.createObjectURL(blob);
    }
    else
    {
        var reader = new FileReader();

        reader.onload = function ()
        {
            image.removeAttribute('crossOrigin');
            image.src = 'data:' + (blob.type || defaultType) + ';base64,' + reader.result.split(',')[1];
        };

        reader.onerror = image.onerror;

        reader.readAsDataURL(blob);
    }
};

/**
 * Static method for releasing an existing object URL which was previously created
 * by calling {@link File#createObjectURL} method.
 *
 * @method Phaser.Loader.File.revokeObjectURL
 * @static
 * @param {HTMLImageElement} image - Image object which 'src' attribute should be revoked.
 */
File.revokeObjectURL = function (image)
{
    if (typeof URL === 'function')
    {
        URL.revokeObjectURL(image.src);
    }
};

module.exports = File;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Takes a reference to the Canvas Renderer, a Canvas Rendering Context, a Game Object, a Camera and a parent matrix
 * and then performs the following steps:
 * 
 * 1) Checks the alpha of the source combined with the Camera alpha. If 0 or less it aborts.
 * 2) Takes the Camera and Game Object matrix and multiplies them, combined with the parent matrix if given.
 * 3) Sets the blend mode of the context to be that used by the Game Object.
 * 4) Sets the alpha value of the context to be that used by the Game Object combined with the Camera.
 * 5) Saves the context state.
 * 6) Sets the final matrix values into the context via setTransform.
 * 
 * This function is only meant to be used internally. Most of the Canvas Renderer classes use it.
 *
 * @function Phaser.Renderer.Canvas.SetTransform
 * @since 3.12.0
 *
 * @param {Phaser.Renderer.Canvas.CanvasRenderer} renderer - A reference to the current active Canvas renderer.
 * @param {CanvasRenderingContext2D} ctx - The canvas context to set the transform on.
 * @param {Phaser.GameObjects.GameObject} src - The Game Object being rendered. Can be any type that extends the base class.
 * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
 * @param {Phaser.GameObjects.Components.TransformMatrix} [parentMatrix] - A parent transform matrix to apply to the Game Object before rendering.
 * 
 * @return {boolean} `true` if the Game Object context was set, otherwise `false`.
 */
var SetTransform = function (renderer, ctx, src, camera, parentMatrix)
{
    var alpha = camera.alpha * src.alpha;

    if (alpha <= 0)
    {
        //  Nothing to see, so don't waste time calculating stuff
        return false;
    }

    var camMatrix = renderer._tempMatrix1.copyFromArray(camera.matrix.matrix);
    var gameObjectMatrix = renderer._tempMatrix2.applyITRS(src.x, src.y, src.rotation, src.scaleX, src.scaleY);
    var calcMatrix = renderer._tempMatrix3;

    if (parentMatrix)
    {
        //  Multiply the camera by the parent matrix
        camMatrix.multiplyWithOffset(parentMatrix, -camera.scrollX * src.scrollFactorX, -camera.scrollY * src.scrollFactorY);

        //  Undo the camera scroll
        gameObjectMatrix.e = src.x;
        gameObjectMatrix.f = src.y;

        //  Multiply by the Sprite matrix, store result in calcMatrix
        camMatrix.multiply(gameObjectMatrix, calcMatrix);
    }
    else
    {
        gameObjectMatrix.e -= camera.scrollX * src.scrollFactorX;
        gameObjectMatrix.f -= camera.scrollY * src.scrollFactorY;

        //  Multiply by the Sprite matrix, store result in calcMatrix
        camMatrix.multiply(gameObjectMatrix, calcMatrix);
    }

    //  Blend Mode
    ctx.globalCompositeOperation = renderer.blendModes[src.blendMode];

    //  Alpha
    ctx.globalAlpha = alpha;

    ctx.save();

    calcMatrix.setToContext(ctx);

    return true;
};

module.exports = SetTransform;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Force a value within the boundaries by clamping it to the range `min`, `max`.
 *
 * @function Phaser.Math.Clamp
 * @since 3.0.0
 *
 * @param {number} value - The value to be clamped.
 * @param {number} min - The minimum bounds.
 * @param {number} max - The maximum bounds.
 *
 * @return {number} The clamped value.
 */
var Clamp = function (value, min, max)
{
    return Math.max(min, Math.min(max, value));
};

module.exports = Clamp;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var CONST = __webpack_require__(26);
var Smoothing = __webpack_require__(120);

// The pool into which the canvas elements are placed.
var pool = [];

//  Automatically apply smoothing(false) to created Canvas elements
var _disableContextSmoothing = false;

/**
 * The CanvasPool is a global static object, that allows Phaser to recycle and pool 2D Context Canvas DOM elements.
 * It does not pool WebGL Contexts, because once the context options are set they cannot be modified again, 
 * which is useless for some of the Phaser pipelines / renderer.
 *
 * This singleton is instantiated as soon as Phaser loads, before a Phaser.Game instance has even been created.
 * Which means all instances of Phaser Games on the same page can share the one single pool.
 *
 * @namespace Phaser.Display.Canvas.CanvasPool
 * @since 3.0.0
 */
var CanvasPool = function ()
{
    /**
     * Creates a new Canvas DOM element, or pulls one from the pool if free.
     *
     * @function Phaser.Display.Canvas.CanvasPool.create
     * @since 3.0.0
     *
     * @param {*} parent - The parent of the Canvas object.
     * @param {integer} [width=1] - The width of the Canvas.
     * @param {integer} [height=1] - The height of the Canvas.
     * @param {integer} [canvasType=Phaser.CANVAS] - The type of the Canvas. Either `Phaser.CANVAS` or `Phaser.WEBGL`.
     * @param {boolean} [selfParent=false] - Use the generated Canvas element as the parent?
     *
     * @return {HTMLCanvasElement} [description]
     */
    var create = function (parent, width, height, canvasType, selfParent)
    {
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = 1; }
        if (canvasType === undefined) { canvasType = CONST.CANVAS; }
        if (selfParent === undefined) { selfParent = false; }

        var canvas;
        var container = first(canvasType);

        if (container === null)
        {
            container = {
                parent: parent,
                canvas: document.createElement('canvas'),
                type: canvasType
            };

            if (canvasType === CONST.CANVAS)
            {
                pool.push(container);
            }

            canvas = container.canvas;
        }
        else
        {
            container.parent = parent;

            canvas = container.canvas;
        }

        if (selfParent)
        {
            container.parent = canvas;
        }

        canvas.width = width;
        canvas.height = height;

        if (_disableContextSmoothing && canvasType === CONST.CANVAS)
        {
            Smoothing.disable(canvas.getContext('2d'));
        }

        return canvas;
    };

    /**
     * Creates a new Canvas DOM element, or pulls one from the pool if free.
     *
     * @function Phaser.Display.Canvas.CanvasPool.create2D
     * @since 3.0.0
     *
     * @param {*} parent - The parent of the Canvas object.
     * @param {integer} [width=1] - The width of the Canvas.
     * @param {integer} [height=1] - The height of the Canvas.
     *
     * @return {HTMLCanvasElement} [description]
     */
    var create2D = function (parent, width, height)
    {
        return create(parent, width, height, CONST.CANVAS);
    };

    /**
     * Creates a new Canvas DOM element, or pulls one from the pool if free.
     *
     * @function Phaser.Display.Canvas.CanvasPool.createWebGL
     * @since 3.0.0
     *
     * @param {*} parent - The parent of the Canvas object.
     * @param {integer} [width=1] - The width of the Canvas.
     * @param {integer} [height=1] - The height of the Canvas.
     *
     * @return {HTMLCanvasElement} [description]
     */
    var createWebGL = function (parent, width, height)
    {
        return create(parent, width, height, CONST.WEBGL);
    };

    /**
     * Gets the first free canvas index from the pool.
     *
     * @function Phaser.Display.Canvas.CanvasPool.first
     * @since 3.0.0
     *
     * @param {integer} [canvasType=Phaser.CANVAS] - The type of the Canvas. Either `Phaser.CANVAS` or `Phaser.WEBGL`.
     *
     * @return {HTMLCanvasElement} [description]
     */
    var first = function (canvasType)
    {
        if (canvasType === undefined) { canvasType = CONST.CANVAS; }

        if (canvasType === CONST.WEBGL)
        {
            return null;
        }

        for (var i = 0; i < pool.length; i++)
        {
            var container = pool[i];

            if (!container.parent && container.type === canvasType)
            {
                return container;
            }
        }

        return null;
    };

    /**
     * Looks up a canvas based on its parent, and if found puts it back in the pool, freeing it up for re-use.
     * The canvas has its width and height set to 1, and its parent attribute nulled.
     *
     * @function Phaser.Display.Canvas.CanvasPool.remove
     * @since 3.0.0
     *
     * @param {*} parent - [description]
     */
    var remove = function (parent)
    {
        //  Check to see if the parent is a canvas object
        var isCanvas = parent instanceof HTMLCanvasElement;

        pool.forEach(function (container)
        {
            if ((isCanvas && container.canvas === parent) || (!isCanvas && container.parent === parent))
            {
                container.parent = null;
                container.canvas.width = 1;
                container.canvas.height = 1;
            }
        });
    };

    /**
     * Gets the total number of used canvas elements in the pool.
     *
     * @function Phaser.Display.Canvas.CanvasPool.total
     * @since 3.0.0
     *
     * @return {integer} [description]
     */
    var total = function ()
    {
        var c = 0;

        pool.forEach(function (container)
        {
            if (container.parent)
            {
                c++;
            }
        });

        return c;
    };

    /**
     * Gets the total number of free canvas elements in the pool.
     *
     * @function Phaser.Display.Canvas.CanvasPool.free
     * @since 3.0.0
     *
     * @return {integer} [description]
     */
    var free = function ()
    {
        return pool.length - total();
    };

    /**
     * Disable context smoothing on any new Canvas element created.
     *
     * @function Phaser.Display.Canvas.CanvasPool.disableSmoothing
     * @since 3.0.0
     */
    var disableSmoothing = function ()
    {
        _disableContextSmoothing = true;
    };

    /**
     * Enable context smoothing on any new Canvas element created.
     *
     * @function Phaser.Display.Canvas.CanvasPool.enableSmoothing
     * @since 3.0.0
     */
    var enableSmoothing = function ()
    {
        _disableContextSmoothing = false;
    };

    return {
        create2D: create2D,
        create: create,
        createWebGL: createWebGL,
        disableSmoothing: disableSmoothing,
        enableSmoothing: enableSmoothing,
        first: first,
        free: free,
        pool: pool,
        remove: remove,
        total: total
    };
};

//  If we export the called function here, it'll only be invoked once (not every time it's required).
module.exports = CanvasPool();


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Takes an array of Game Objects, or any objects that have a public property as defined in `key`,
 * and then sets it to the given value.
 *
 * The optional `step` property is applied incrementally, multiplied by each item in the array.
 *
 * To use this with a Group: `PropertyValueSet(group.getChildren(), key, value, step)`
 *
 * @function Phaser.Actions.PropertyValueSet
 * @since 3.3.0
 *
 * @generic {Phaser.GameObjects.GameObject[]} G - [items,$return]
 *
 * @param {(array|Phaser.GameObjects.GameObject[])} items - The array of items to be updated by this action.
 * @param {string} key - The property to be updated.
 * @param {number} value - The amount to set the property to.
 * @param {number} [step=0] - This is added to the `value` amount, multiplied by the iteration counter.
 * @param {integer} [index=0] - An optional offset to start searching from within the items array.
 * @param {integer} [direction=1] - The direction to iterate through the array. 1 is from beginning to end, -1 from end to beginning.
 *
 * @return {(array|Phaser.GameObjects.GameObject[])} The array of objects that were passed to this Action.
 */
var PropertyValueSet = function (items, key, value, step, index, direction)
{
    if (step === undefined) { step = 0; }
    if (index === undefined) { index = 0; }
    if (direction === undefined) { direction = 1; }

    var i;
    var t = 0;
    var end = items.length;

    if (direction === 1)
    {
        //  Start to End
        for (i = index; i < end; i++)
        {
            items[i][key] = value + (t * step);
            t++;
        }
    }
    else
    {
        //  End to Start
        for (i = index; i >= 0; i--)
        {
            items[i][key] = value + (t * step);
            t++;
        }
    }

    return items;
};

module.exports = PropertyValueSet;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Global consts.
 * 
 * @ignore
 */

var CONST = {

    /**
     * Phaser Release Version
     * 
     * @name Phaser.VERSION
     * @readonly
     * @type {string}
     * @since 3.0.0
     */
    VERSION: '3.15.1',

    BlendModes: __webpack_require__(66),

    ScaleModes: __webpack_require__(94),

    /**
     * AUTO Detect Renderer.
     * 
     * @name Phaser.AUTO
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    AUTO: 0,

    /**
     * Canvas Renderer.
     * 
     * @name Phaser.CANVAS
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    CANVAS: 1,

    /**
     * WebGL Renderer.
     * 
     * @name Phaser.WEBGL
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    WEBGL: 2,

    /**
     * Headless Renderer.
     * 
     * @name Phaser.HEADLESS
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    HEADLESS: 3,

    /**
     * In Phaser the value -1 means 'forever' in lots of cases, this const allows you to use it instead
     * to help you remember what the value is doing in your code.
     * 
     * @name Phaser.FOREVER
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    FOREVER: -1,

    /**
     * Direction constant.
     * 
     * @name Phaser.NONE
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    NONE: 4,

    /**
     * Direction constant.
     * 
     * @name Phaser.UP
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    UP: 5,

    /**
     * Direction constant.
     * 
     * @name Phaser.DOWN
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    DOWN: 6,

    /**
     * Direction constant.
     * 
     * @name Phaser.LEFT
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    LEFT: 7,

    /**
     * Direction constant.
     * 
     * @name Phaser.RIGHT
     * @readonly
     * @type {integer}
     * @since 3.0.0
     */
    RIGHT: 8

};

module.exports = CONST;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var Components = __webpack_require__(14);
var GameObject = __webpack_require__(19);
var Line = __webpack_require__(54);

/**
 * @classdesc
 * The Shape Game Object is a base class for the various different shapes, such as the Arc, Star or Polygon.
 * You cannot add a Shape directly to your Scene, it is meant as a base for your own custom Shape classes.
 *
 * @class Shape
 * @extends Phaser.GameObjects.GameObject
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.13.0
 *
 * @extends Phaser.GameObjects.Components.Alpha
 * @extends Phaser.GameObjects.Components.BlendMode
 * @extends Phaser.GameObjects.Components.ComputedSize
 * @extends Phaser.GameObjects.Components.Depth
 * @extends Phaser.GameObjects.Components.GetBounds
 * @extends Phaser.GameObjects.Components.Mask
 * @extends Phaser.GameObjects.Components.Origin
 * @extends Phaser.GameObjects.Components.Pipeline
 * @extends Phaser.GameObjects.Components.ScaleMode
 * @extends Phaser.GameObjects.Components.ScrollFactor
 * @extends Phaser.GameObjects.Components.Transform
 * @extends Phaser.GameObjects.Components.Visible
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object belongs. A Game Object can only belong to one Scene at a time.
 * @param {string} [type] - The internal type of the Shape.
 * @param {any} [data] - The data of the source shape geometry, if any.
 */
var Shape = new Class({

    Extends: GameObject,

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Depth,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.ScaleMode,
        Components.ScrollFactor,
        Components.Transform,
        Components.Visible
    ],

    initialize:

    function Shape (scene, type, data)
    {
        if (type === undefined) { type = 'Shape'; }

        GameObject.call(this, scene, type);

        /**
         * The source Shape data. Typically a geometry object.
         * You should not manipulate this directly.
         *
         * @name Phaser.GameObjects.Shape#data
         * @type {any}
         * @readonly
         * @since 3.13.0
         */
        this.geom = data;

        /**
         * Holds the polygon path data for filled rendering.
         *
         * @name Phaser.GameObjects.Shape#pathData
         * @type {number[]}
         * @readonly
         * @since 3.13.0
         */
        this.pathData = [];

        /**
         * Holds the earcut polygon path index data for filled rendering.
         *
         * @name Phaser.GameObjects.Shape#pathIndexes
         * @type {integer[]}
         * @readonly
         * @since 3.13.0
         */
        this.pathIndexes = [];

        /**
         * The fill color used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#fillColor
         * @type {number}
         * @since 3.13.0
         */
        this.fillColor = 0xffffff;

        /**
         * The fill alpha value used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#fillAlpha
         * @type {number}
         * @since 3.13.0
         */
        this.fillAlpha = 1;

        /**
         * The stroke color used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#strokeColor
         * @type {number}
         * @since 3.13.0
         */
        this.strokeColor = 0xffffff;

        /**
         * The stroke alpha value used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#strokeAlpha
         * @type {number}
         * @since 3.13.0
         */
        this.strokeAlpha = 1;

        /**
         * The stroke line width used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#lineWidth
         * @type {number}
         * @since 3.13.0
         */
        this.lineWidth = 1;

        /**
         * Controls if this Shape is filled or not.
         * Note that some Shapes do not support being filled (such as Line shapes)
         *
         * @name Phaser.GameObjects.Shape#isFilled
         * @type {boolean}
         * @since 3.13.0
         */
        this.isFilled = false;

        /**
         * Controls if this Shape is stroked or not.
         * Note that some Shapes do not support being stroked (such as Iso Box shapes)
         *
         * @name Phaser.GameObjects.Shape#isStroked
         * @type {boolean}
         * @since 3.13.0
         */
        this.isStroked = false;

        /**
         * Controls if this Shape path is closed during rendering when stroked.
         * Note that some Shapes are always closed when stroked (such as Ellipse shapes)
         *
         * @name Phaser.GameObjects.Shape#closePath
         * @type {boolean}
         * @since 3.13.0
         */
        this.closePath = true;

        /**
         * Private internal value.
         * A Line used when parsing internal path data to avoid constant object re-creation.
         *
         * @name Phaser.GameObjects.Curve#_tempLine
         * @type {Phaser.Geom.Line}
         * @private
         * @since 3.13.0
         */
        this._tempLine = new Line();

        this.initPipeline();
    },

    /**
     * Sets the fill color and alpha for this Shape.
     * 
     * If you wish for the Shape to not be filled then call this method with no arguments, or just set `isFilled` to `false`.
     * 
     * Note that some Shapes do not support fill colors, such as the Line shape.
     * 
     * This call can be chained.
     *
     * @method Phaser.GameObjects.Shape#setFillStyle
     * @since 3.13.0
     * 
     * @param {number} [color] - The color used to fill this shape. If not provided the Shape will not be filled.
     * @param {number} [alpha=1] - The alpha value used when filling this shape, if a fill color is given.
     *
     * @return {this} This Game Object instance.
     */
    setFillStyle: function (color, alpha)
    {
        if (alpha === undefined) { alpha = 1; }

        if (color === undefined)
        {
            this.isFilled = false;
        }
        else
        {
            this.fillColor = color;
            this.fillAlpha = alpha;
            this.isFilled = true;
        }

        return this;
    },

    /**
     * Sets the stroke color and alpha for this Shape.
     * 
     * If you wish for the Shape to not be stroked then call this method with no arguments, or just set `isStroked` to `false`.
     * 
     * Note that some Shapes do not support being stroked, such as the Iso Box shape.
     * 
     * This call can be chained.
     *
     * @method Phaser.GameObjects.Shape#setStrokeStyle
     * @since 3.13.0
     * 
     * @param {number} [color] - The color used to stroke this shape. If not provided the Shape will not be stroked.
     * @param {number} [alpha=1] - The alpha value used when stroking this shape, if a stroke color is given.
     *
     * @return {this} This Game Object instance.
     */
    setStrokeStyle: function (lineWidth, color, alpha)
    {
        if (alpha === undefined) { alpha = 1; }

        if (lineWidth === undefined)
        {
            this.isStroked = false;
        }
        else
        {
            this.lineWidth = lineWidth;
            this.strokeColor = color;
            this.strokeAlpha = alpha;
            this.isStroked = true;
        }

        return this;
    },

    /**
     * Sets if this Shape path is closed during rendering when stroked.
     * Note that some Shapes are always closed when stroked (such as Ellipse shapes)
     * 
     * This call can be chained.
     *
     * @method Phaser.GameObjects.Shape#setClosePath
     * @since 3.13.0
     * 
     * @param {boolean} value - Set to `true` if the Shape should be closed when stroked, otherwise `false`.
     *
     * @return {this} This Game Object instance.
     */
    setClosePath: function (value)
    {
        this.closePath = value;

        return this;
    },

    /**
     * Internal destroy handler, called as part of the destroy process.
     *
     * @method Phaser.GameObjects.Shape#preDestroy
     * @protected
     * @since 3.13.0
     */
    preDestroy: function ()
    {
        this.geom = null;
        this._tempLine = null;
        this.pathData = [];
        this.pathIndexes = [];
    }

});

module.exports = Shape;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var BlendModes = __webpack_require__(66);
var GetAdvancedValue = __webpack_require__(12);
var ScaleModes = __webpack_require__(94);

/**
 * @typedef {object} GameObjectConfig
 *
 * @property {number} [x=0] - The x position of the Game Object.
 * @property {number} [y=0] - The y position of the Game Object.
 * @property {number} [depth=0] - The depth of the GameObject.
 * @property {boolean} [flipX=false] - The horizontally flipped state of the Game Object.
 * @property {boolean} [flipY=false] - The vertically flipped state of the Game Object.
 * @property {?(number|object)} [scale=null] - The scale of the GameObject.
 * @property {?(number|object)} [scrollFactor=null] - The scroll factor of the GameObject.
 * @property {number} [rotation=0] - The rotation angle of the Game Object, in radians.
 * @property {?number} [angle=null] - The rotation angle of the Game Object, in degrees.
 * @property {number} [alpha=1] - The alpha (opacity) of the Game Object.
 * @property {?(number|object)} [origin=null] - The origin of the Game Object.
 * @property {number} [scaleMode=ScaleModes.DEFAULT] - The scale mode of the GameObject.
 * @property {number} [blendMode=BlendModes.DEFAULT] - The blend mode of the GameObject.
 * @property {boolean} [visible=true] - The visible state of the Game Object.
 * @property {boolean} [add=true] - Add the GameObject to the scene.
 */

/**
 * Builds a Game Object using the provided configuration object.
 *
 * @function Phaser.GameObjects.BuildGameObject
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - A reference to the Scene.
 * @param {Phaser.GameObjects.GameObject} gameObject - The initial GameObject.
 * @param {GameObjectConfig} config - The config to build the GameObject with.
 *
 * @return {Phaser.GameObjects.GameObject} The built Game Object.
 */
var BuildGameObject = function (scene, gameObject, config)
{
    //  Position

    gameObject.x = GetAdvancedValue(config, 'x', 0);
    gameObject.y = GetAdvancedValue(config, 'y', 0);
    gameObject.depth = GetAdvancedValue(config, 'depth', 0);

    //  Flip

    gameObject.flipX = GetAdvancedValue(config, 'flipX', false);
    gameObject.flipY = GetAdvancedValue(config, 'flipY', false);

    //  Scale
    //  Either: { scale: 2 } or { scale: { x: 2, y: 2 }}

    var scale = GetAdvancedValue(config, 'scale', null);

    if (typeof scale === 'number')
    {
        gameObject.setScale(scale);
    }
    else if (scale !== null)
    {
        gameObject.scaleX = GetAdvancedValue(scale, 'x', 1);
        gameObject.scaleY = GetAdvancedValue(scale, 'y', 1);
    }

    //  ScrollFactor
    //  Either: { scrollFactor: 2 } or { scrollFactor: { x: 2, y: 2 }}

    var scrollFactor = GetAdvancedValue(config, 'scrollFactor', null);

    if (typeof scrollFactor === 'number')
    {
        gameObject.setScrollFactor(scrollFactor);
    }
    else if (scrollFactor !== null)
    {
        gameObject.scrollFactorX = GetAdvancedValue(scrollFactor, 'x', 1);
        gameObject.scrollFactorY = GetAdvancedValue(scrollFactor, 'y', 1);
    }

    //  Rotation

    gameObject.rotation = GetAdvancedValue(config, 'rotation', 0);

    var angle = GetAdvancedValue(config, 'angle', null);

    if (angle !== null)
    {
        gameObject.angle = angle;
    }

    //  Alpha

    gameObject.alpha = GetAdvancedValue(config, 'alpha', 1);

    //  Origin
    //  Either: { origin: 0.5 } or { origin: { x: 0.5, y: 0.5 }}

    var origin = GetAdvancedValue(config, 'origin', null);

    if (typeof origin === 'number')
    {
        gameObject.setOrigin(origin);
    }
    else if (origin !== null)
    {
        var ox = GetAdvancedValue(origin, 'x', 0.5);
        var oy = GetAdvancedValue(origin, 'y', 0.5);

        gameObject.setOrigin(ox, oy);
    }

    //  ScaleMode

    gameObject.scaleMode = GetAdvancedValue(config, 'scaleMode', ScaleModes.DEFAULT);

    //  BlendMode

    gameObject.blendMode = GetAdvancedValue(config, 'blendMode', BlendModes.NORMAL);

    //  Visible

    gameObject.visible = GetAdvancedValue(config, 'visible', true);

    //  Add to Scene

    var add = GetAdvancedValue(config, 'add', true);

    if (add)
    {
        scene.sys.displayList.add(gameObject);
    }

    if (gameObject.preUpdate)
    {
        scene.sys.updateList.add(gameObject);
    }

    return gameObject;
};

module.exports = BuildGameObject;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * @namespace Phaser.Tilemaps.Formats
 */

module.exports = {

    /**
     * CSV Map Type
     * 
     * @name Phaser.Tilemaps.Formats.CSV
     * @type {number}
     * @since 3.0.0
     */
    CSV: 0,

    /**
     * Tiled JSON Map Type
     * 
     * @name Phaser.Tilemaps.Formats.TILED_JSON
     * @type {number}
     * @since 3.0.0
     */
    TILED_JSON: 1,

    /**
     * 2D Array Map Type
     * 
     * @name Phaser.Tilemaps.Formats.ARRAY_2D
     * @type {number}
     * @since 3.0.0
     */
    ARRAY_2D: 2,

    /**
     * Weltmeister (Impact.js) Map Type
     * 
     * @name Phaser.Tilemaps.Formats.WELTMEISTER
     * @type {number}
     * @since 3.0.0
     */
    WELTMEISTER: 3

};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Sets the fillStyle on the target context based on the given Shape.
 *
 * @method Phaser.GameObjects.Shape#FillStyleCanvas
 * @since 3.13.0
 * @private
 *
 * @param {CanvasRenderingContext2D} ctx - The context to set the fill style on.
 * @param {Phaser.GameObjects.Shape} src - The Game Object to set the fill style from.
 */
var FillStyleCanvas = function (ctx, src, altColor)
{
    var fillColor = (altColor) ? altColor : src.fillColor;
    var fillAlpha = src.fillAlpha;

    var red = ((fillColor & 0xFF0000) >>> 16);
    var green = ((fillColor & 0xFF00) >>> 8);
    var blue = (fillColor & 0xFF);

    ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
};

module.exports = FillStyleCanvas;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var CONST = __webpack_require__(16);

/**
 * Convert the given angle from degrees, to the equivalent angle in radians.
 *
 * @function Phaser.Math.DegToRad
 * @since 3.0.0
 *
 * @param {integer} degrees - The angle (in degrees) to convert to radians.
 *
 * @return {number} The given angle converted to radians.
 */
var DegToRad = function (degrees)
{
    return degrees * CONST.DEG_TO_RAD;
};

module.exports = DegToRad;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Takes an array of Game Objects, or any objects that have a public property as defined in `key`,
 * and then adds the given value to it.
 *
 * The optional `step` property is applied incrementally, multiplied by each item in the array.
 *
 * To use this with a Group: `PropertyValueInc(group.getChildren(), key, value, step)`
 *
 * @function Phaser.Actions.PropertyValueInc
 * @since 3.3.0
 *
 * @generic {Phaser.GameObjects.GameObject[]} G - [items,$return]
 *
 * @param {(array|Phaser.GameObjects.GameObject[])} items - The array of items to be updated by this action.
 * @param {string} key - The property to be updated.
 * @param {number} value - The amount to be added to the property.
 * @param {number} [step=0] - This is added to the `value` amount, multiplied by the iteration counter.
 * @param {integer} [index=0] - An optional offset to start searching from within the items array.
 * @param {integer} [direction=1] - The direction to iterate through the array. 1 is from beginning to end, -1 from end to beginning.
 *
 * @return {(array|Phaser.GameObjects.GameObject[])} The array of objects that were passed to this Action.
 */
var PropertyValueInc = function (items, key, value, step, index, direction)
{
    if (step === undefined) { step = 0; }
    if (index === undefined) { index = 0; }
    if (direction === undefined) { direction = 1; }

    var i;
    var t = 0;
    var end = items.length;

    if (direction === 1)
    {
        //  Start to End
        for (i = index; i < end; i++)
        {
            items[i][key] += value + (t * step);
            t++;
        }
    }
    else
    {
        //  End to Start
        for (i = index; i >= 0; i--)
        {
            items[i][key] += value + (t * step);
            t++;
        }
    }

    return items;
};

module.exports = PropertyValueInc;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
* The `Matter.Common` module contains utility functions that are common to all modules.
*
* @class Common
*/

var Common = {};

module.exports = Common;

(function() {

    Common._nextId = 0;
    Common._seed = 0;
    Common._nowStartTime = +(new Date());

    /**
     * Extends the object in the first argument using the object in the second argument.
     * @method extend
     * @param {} obj
     * @param {boolean} deep
     * @return {} obj extended
     */
    Common.extend = function(obj, deep) {
        var argsStart,
            args,
            deepClone;

        if (typeof deep === 'boolean') {
            argsStart = 2;
            deepClone = deep;
        } else {
            argsStart = 1;
            deepClone = true;
        }

        for (var i = argsStart; i < arguments.length; i++) {
            var source = arguments[i];

            if (source) {
                for (var prop in source) {
                    if (deepClone && source[prop] && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            Common.extend(obj[prop], deepClone, source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        }
        
        return obj;
    };

    /**
     * Creates a new clone of the object, if deep is true references will also be cloned.
     * @method clone
     * @param {} obj
     * @param {bool} deep
     * @return {} obj cloned
     */
    Common.clone = function(obj, deep) {
        return Common.extend({}, deep, obj);
    };

    /**
     * Returns the list of keys for the given object.
     * @method keys
     * @param {} obj
     * @return {string[]} keys
     */
    Common.keys = function(obj) {
        if (Object.keys)
            return Object.keys(obj);

        // avoid hasOwnProperty for performance
        var keys = [];
        for (var key in obj)
            keys.push(key);
        return keys;
    };

    /**
     * Returns the list of values for the given object.
     * @method values
     * @param {} obj
     * @return {array} Array of the objects property values
     */
    Common.values = function(obj) {
        var values = [];
        
        if (Object.keys) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        }
        
        // avoid hasOwnProperty for performance
        for (var key in obj)
            values.push(obj[key]);
        return values;
    };

    /**
     * Gets a value from `base` relative to the `path` string.
     * @method get
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} The object at the given path
     */
    Common.get = function(obj, path, begin, end) {
        path = path.split('.').slice(begin, end);

        for (var i = 0; i < path.length; i += 1) {
            obj = obj[path[i]];
        }

        return obj;
    };

    /**
     * Sets a value on `base` relative to the given `path` string.
     * @method set
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {} val The value to set
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} Pass through `val` for chaining
     */
    Common.set = function(obj, path, val, begin, end) {
        var parts = path.split('.').slice(begin, end);
        Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
        return val;
    };

    /**
     * Shuffles the given array in-place.
     * The function uses a seeded random generator.
     * @method shuffle
     * @param {array} array
     * @return {array} array shuffled randomly
     */
    Common.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Common.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    /**
     * Randomly chooses a value from a list with equal probability.
     * The function uses a seeded random generator.
     * @method choose
     * @param {array} choices
     * @return {object} A random choice object from the array
     */
    Common.choose = function(choices) {
        return choices[Math.floor(Common.random() * choices.length)];
    };

    /**
     * Returns true if the object is a HTMLElement, otherwise false.
     * @method isElement
     * @param {object} obj
     * @return {boolean} True if the object is a HTMLElement, otherwise false
     */
    Common.isElement = function(obj) {
        if (typeof HTMLElement !== 'undefined') {
            return obj instanceof HTMLElement;
        }

        return !!(obj && obj.nodeType && obj.nodeName);
    };

    /**
     * Returns true if the object is an array.
     * @method isArray
     * @param {object} obj
     * @return {boolean} True if the object is an array, otherwise false
     */
    Common.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Returns true if the object is a function.
     * @method isFunction
     * @param {object} obj
     * @return {boolean} True if the object is a function, otherwise false
     */
    Common.isFunction = function(obj) {
        return typeof obj === "function";
    };

    /**
     * Returns true if the object is a plain object.
     * @method isPlainObject
     * @param {object} obj
     * @return {boolean} True if the object is a plain object, otherwise false
     */
    Common.isPlainObject = function(obj) {
        return typeof obj === 'object' && obj.constructor === Object;
    };

    /**
     * Returns true if the object is a string.
     * @method isString
     * @param {object} obj
     * @return {boolean} True if the object is a string, otherwise false
     */
    Common.isString = function(obj) {
        return toString.call(obj) === '[object String]';
    };
    
    /**
     * Returns the given value clamped between a minimum and maximum value.
     * @method clamp
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @return {number} The value clamped between min and max inclusive
     */
    Common.clamp = function(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };
    
    /**
     * Returns the sign of the given value.
     * @method sign
     * @param {number} value
     * @return {number} -1 if negative, +1 if 0 or positive
     */
    Common.sign = function(value) {
        return value < 0 ? -1 : 1;
    };
    
    /**
     * Returns the current timestamp since the time origin (e.g. from page load).
     * The result will be high-resolution including decimal places if available.
     * @method now
     * @return {number} the current timestamp
     */
    Common.now = function() {
        if (window.performance) {
            if (window.performance.now) {
                return window.performance.now();
            } else if (window.performance.webkitNow) {
                return window.performance.webkitNow();
            }
        }

        return (new Date()) - Common._nowStartTime;
    };
    
    /**
     * Returns a random value between a minimum and a maximum value inclusive.
     * The function uses a seeded random generator.
     * @method random
     * @param {number} min
     * @param {number} max
     * @return {number} A random number between min and max inclusive
     */
    Common.random = function(min, max) {
        min = (typeof min !== "undefined") ? min : 0;
        max = (typeof max !== "undefined") ? max : 1;
        return min + _seededRandom() * (max - min);
    };

    var _seededRandom = function() {
        // https://en.wikipedia.org/wiki/Linear_congruential_generator
        Common._seed = (Common._seed * 9301 + 49297) % 233280;
        return Common._seed / 233280;
    };

    /**
     * Converts a CSS hex colour string into an integer.
     * @method colorToNumber
     * @param {string} colorString
     * @return {number} An integer representing the CSS hex string
     */
    Common.colorToNumber = function(colorString) {
        colorString = colorString.replace('#','');

        if (colorString.length == 3) {
            colorString = colorString.charAt(0) + colorString.charAt(0)
                        + colorString.charAt(1) + colorString.charAt(1)
                        + colorString.charAt(2) + colorString.charAt(2);
        }

        return parseInt(colorString, 16);
    };

    /**
     * The console logging level to use, where each level includes all levels above and excludes the levels below.
     * The default level is 'debug' which shows all console messages.  
     *
     * Possible level values are:
     * - 0 = None
     * - 1 = Debug
     * - 2 = Info
     * - 3 = Warn
     * - 4 = Error
     * @property Common.logLevel
     * @type {Number}
     * @default 1
     */
    Common.logLevel = 1;

    /**
     * Shows a `console.log` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method log
     * @param ...objs {} The objects to log.
     */
    Common.log = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.log.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.info` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method info
     * @param ...objs {} The objects to log.
     */
    Common.info = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
            console.info.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.warn` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method warn
     * @param ...objs {} The objects to log.
     */
    Common.warn = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.warn.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Returns the next unique sequential ID.
     * @method nextId
     * @return {Number} Unique sequential ID
     */
    Common.nextId = function() {
        return Common._nextId++;
    };

    /**
     * A cross browser compatible indexOf implementation.
     * @method indexOf
     * @param {array} haystack
     * @param {object} needle
     * @return {number} The position of needle in haystack, otherwise -1.
     */
    Common.indexOf = function(haystack, needle) {
        if (haystack.indexOf)
            return haystack.indexOf(needle);

        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle)
                return i;
        }

        return -1;
    };

    /**
     * A cross browser compatible array map implementation.
     * @method map
     * @param {array} list
     * @param {function} func
     * @return {array} Values from list transformed by func.
     */
    Common.map = function(list, func) {
        if (list.map) {
            return list.map(func);
        }

        var mapped = [];

        for (var i = 0; i < list.length; i += 1) {
            mapped.push(func(list[i]));
        }

        return mapped;
    };

    /**
     * Takes a directed graph and returns the partially ordered set of vertices in topological order.
     * Circular dependencies are allowed.
     * @method topologicalSort
     * @param {object} graph
     * @return {array} Partially ordered set of vertices in topological order.
     */
    Common.topologicalSort = function(graph) {
        // https://github.com/mgechev/javascript-algorithms
        // Copyright (c) Minko Gechev (MIT license)
        // Modifications: tidy formatting and naming
        var result = [],
            visited = [],
            temp = [];

        for (var node in graph) {
            if (!visited[node] && !temp[node]) {
                Common._topologicalSort(node, visited, temp, graph, result);
            }
        }

        return result;
    };

    Common._topologicalSort = function(node, visited, temp, graph, result) {
        var neighbors = graph[node] || [];
        temp[node] = true;

        for (var i = 0; i < neighbors.length; i += 1) {
            var neighbor = neighbors[i];

            if (temp[neighbor]) {
                // skip circular dependencies
                continue;
            }

            if (!visited[neighbor]) {
                Common._topologicalSort(neighbor, visited, temp, graph, result);
            }
        }

        temp[node] = false;
        visited[node] = true;

        result.push(node);
    };

    /**
     * Takes _n_ functions as arguments and returns a new function that calls them in order.
     * The arguments applied when calling the new function will also be applied to every function passed.
     * The value of `this` refers to the last value returned in the chain that was not `undefined`.
     * Therefore if a passed function does not return a value, the previously returned value is maintained.
     * After all passed functions have been called the new function returns the last returned value (if any).
     * If any of the passed functions are a chain, then the chain will be flattened.
     * @method chain
     * @param ...funcs {function} The functions to chain.
     * @return {function} A new function that calls the passed functions in order.
     */
    Common.chain = function() {
        var funcs = [];

        for (var i = 0; i < arguments.length; i += 1) {
            var func = arguments[i];

            if (func._chained) {
                // flatten already chained functions
                funcs.push.apply(funcs, func._chained);
            } else {
                funcs.push(func);
            }
        }

        var chain = function() {
            // https://github.com/GoogleChrome/devtools-docs/issues/53#issuecomment-51941358
            var lastResult,
                args = new Array(arguments.length);

            for (var i = 0, l = arguments.length; i < l; i++) {
                args[i] = arguments[i];
            }

            for (i = 0; i < funcs.length; i += 1) {
                var result = funcs[i].apply(lastResult, args);

                if (typeof result !== 'undefined') {
                    lastResult = result;
                }
            }

            return lastResult;
        };

        chain._chained = funcs;

        return chain;
    };

    /**
     * Chains a function to excute before the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathBefore
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathBefore = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            func,
            Common.get(base, path)
        ));
    };

    /**
     * Chains a function to excute after the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathAfter
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathAfter = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            Common.get(base, path),
            func
        ));
    };

    /**
     * Used to require external libraries outside of the bundle.
     * It first looks for the `globalName` on the environment's global namespace.
     * If the global is not found, it will fall back to using the standard `require` using the `moduleName`.
     * @private
     * @method _requireGlobal
     * @param {string} globalName The global module name
     * @param {string} moduleName The fallback CommonJS module name
     * @return {} The loaded module
     */
    Common._requireGlobal = function(globalName, moduleName) {
        var obj = (typeof window !== 'undefined' ? window[globalName] : typeof global !== 'undefined' ? global[globalName] : null);

        //  Breaks webpack :(
        // return obj || require(moduleName);

        return obj;
    };
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(200)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var GetTileAt = __webpack_require__(102);
var GetTilesWithin = __webpack_require__(17);

/**
 * Calculates interesting faces within the rectangular area specified (in tile coordinates) of the
 * layer. Interesting faces are used internally for optimizing collisions against tiles. This method
 * is mostly used internally.
 *
 * @function Phaser.Tilemaps.Components.CalculateFacesWithin
 * @private
 * @since 3.0.0
 *
 * @param {integer} tileX - The left most tile index (in tile coordinates) to use as the origin of the area.
 * @param {integer} tileY - The top most tile index (in tile coordinates) to use as the origin of the area.
 * @param {integer} width - How many tiles wide from the `tileX` index the area will be.
 * @param {integer} height - How many tiles tall from the `tileY` index the area will be.
 * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
 */
var CalculateFacesWithin = function (tileX, tileY, width, height, layer)
{
    var above = null;
    var below = null;
    var left = null;
    var right = null;

    var tiles = GetTilesWithin(tileX, tileY, width, height, null, layer);

    for (var i = 0; i < tiles.length; i++)
    {
        var tile = tiles[i];

        if (tile)
        {
            if (tile.collides)
            {
                above = GetTileAt(tile.x, tile.y - 1, true, layer);
                below = GetTileAt(tile.x, tile.y + 1, true, layer);
                left = GetTileAt(tile.x - 1, tile.y, true, layer);
                right = GetTileAt(tile.x + 1, tile.y, true, layer);

                tile.faceTop = (above && above.collides) ? false : true;
                tile.faceBottom = (below && below.collides) ? false : true;
                tile.faceLeft = (left && left.collides) ? false : true;
                tile.faceRight = (right && right.collides) ? false : true;
            }
            else
            {
                tile.resetFaces();
            }
        }
    }
};

module.exports = CalculateFacesWithin;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Arcade Physics consts.
 *
 * @ignore
 */

var CONST = {

    /**
     * Dynamic Body.
     *
     * @name Phaser.Physics.Arcade.DYNAMIC_BODY
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#physicsType
     * @see Phaser.Physics.Arcade.Group#physicsType
     */
    DYNAMIC_BODY: 0,

    /**
     * Static Body.
     *
     * @name Phaser.Physics.Arcade.STATIC_BODY
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#physicsType
     * @see Phaser.Physics.Arcade.StaticBody#physicsType
     */
    STATIC_BODY: 1,

    /**
     * [description]
     *
     * @name Phaser.Physics.Arcade.GROUP
     * @readonly
     * @type {number}
     * @since 3.0.0
     */
    GROUP: 2,

    /**
     * [description]
     *
     * @name Phaser.Physics.Arcade.TILEMAPLAYER
     * @readonly
     * @type {number}
     * @since 3.0.0
     */
    TILEMAPLAYER: 3,

    /**
     * Facing no direction (initial value).
     *
     * @name Phaser.Physics.Arcade.FACING_NONE
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_NONE: 10,

    /**
     * Facing up.
     *
     * @name Phaser.Physics.Arcade.FACING_UP
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_UP: 11,

    /**
     * Facing down.
     *
     * @name Phaser.Physics.Arcade.FACING_DOWN
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_DOWN: 12,

    /**
     * Facing left.
     *
     * @name Phaser.Physics.Arcade.FACING_LEFT
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_LEFT: 13,

    /**
     * Facing right.
     *
     * @name Phaser.Physics.Arcade.FACING_RIGHT
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_RIGHT: 14

};

module.exports = CONST;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Sets the strokeStyle and lineWidth on the target context based on the given Shape.
 *
 * @method Phaser.GameObjects.Shape#LineStyleCanvas
 * @since 3.13.0
 * @private
 *
 * @param {CanvasRenderingContext2D} ctx - The context to set the stroke style on.
 * @param {Phaser.GameObjects.Shape} src - The Game Object to set the stroke style from.
 */
var LineStyleCanvas = function (ctx, src)
{
    var strokeColor = src.strokeColor;
    var strokeAlpha = src.strokeAlpha;

    var red = ((strokeColor & 0xFF0000) >>> 16);
    var green = ((strokeColor & 0xFF00) >>> 8);
    var blue = (strokeColor & 0xFF);

    ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
    ctx.lineWidth = src.lineWidth;
};

module.exports = LineStyleCanvas;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var GetColor = __webpack_require__(177);
var GetColor32 = __webpack_require__(376);
var HSVToRGB = __webpack_require__(176);
var RGBToHSV = __webpack_require__(375);

/**
 * @classdesc
 * The Color class holds a single color value and allows for easy modification and reading of it.
 *
 * @class Color
 * @memberof Phaser.Display
 * @constructor
 * @since 3.0.0
 *
 * @param {integer} [red=0] - The red color value. A number between 0 and 255.
 * @param {integer} [green=0] - The green color value. A number between 0 and 255.
 * @param {integer} [blue=0] - The blue color value. A number between 0 and 255.
 * @param {integer} [alpha=255] - The alpha value. A number between 0 and 255.
 */
var Color = new Class({

    initialize:

    function Color (red, green, blue, alpha)
    {
        if (red === undefined) { red = 0; }
        if (green === undefined) { green = 0; }
        if (blue === undefined) { blue = 0; }
        if (alpha === undefined) { alpha = 255; }

        /**
         * The internal red color value.
         *
         * @name Phaser.Display.Color#r
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this.r = 0;

        /**
         * The internal green color value.
         *
         * @name Phaser.Display.Color#g
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this.g = 0;

        /**
         * The internal blue color value.
         *
         * @name Phaser.Display.Color#b
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this.b = 0;

        /**
         * The internal alpha color value.
         *
         * @name Phaser.Display.Color#a
         * @type {number}
         * @private
         * @default 255
         * @since 3.0.0
         */
        this.a = 255;

        /**
         * The hue color value. A number between 0 and 1.
         * This is the base color.
         *
         * @name Phaser.Display.Color#_h
         * @type {number}
         * @default 0
         * @private
         * @since 3.13.0
         */
        this._h = 0;

        /**
         * The saturation color value. A number between 0 and 1.
         * This controls how much of the hue will be in the final color, where 1 is fully saturated and 0 will give you white.
         *
         * @name Phaser.Display.Color#_s
         * @type {number}
         * @default 0
         * @private
         * @since 3.13.0
         */
        this._s = 0;

        /**
         * The lightness color value. A number between 0 and 1.
         * This controls how dark the color is. Where 1 is as bright as possible and 0 is black.
         *
         * @name Phaser.Display.Color#_v
         * @type {number}
         * @default 0
         * @private
         * @since 3.13.0
         */
        this._v = 0;

        /**
         * Is this color update locked?
         *
         * @name Phaser.Display.Color#_locked
         * @type {boolean}
         * @private
         * @since 3.13.0
         */
        this._locked = false;

        /**
         * An array containing the calculated color values for WebGL use.
         *
         * @name Phaser.Display.Color#gl
         * @type {number[]}
         * @since 3.0.0
         */
        this.gl = [ 0, 0, 0, 1 ];

        /**
         * Pre-calculated internal color value.
         *
         * @name Phaser.Display.Color#_color
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this._color = 0;

        /**
         * Pre-calculated internal color32 value.
         *
         * @name Phaser.Display.Color#_color32
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this._color32 = 0;

        /**
         * Pre-calculated internal color rgb string value.
         *
         * @name Phaser.Display.Color#_rgba
         * @type {string}
         * @private
         * @default ''
         * @since 3.0.0
         */
        this._rgba = '';

        this.setTo(red, green, blue, alpha);
    },

    /**
     * Sets this color to be transparent. Sets all values to zero.
     *
     * @method Phaser.Display.Color#transparent
     * @since 3.0.0
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    transparent: function ()
    {
        this._locked = true;

        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.alpha = 0;

        this._locked = false;

        return this.update(true);
    },

    /**
     * Sets the color of this Color component.
     *
     * @method Phaser.Display.Color#setTo
     * @since 3.0.0
     *
     * @param {integer} red - The red color value. A number between 0 and 255.
     * @param {integer} green - The green color value. A number between 0 and 255.
     * @param {integer} blue - The blue color value. A number between 0 and 255.
     * @param {integer} [alpha=255] - The alpha value. A number between 0 and 255.
     * @param {boolean} [updateHSV=true] - Update the HSV values after setting the RGB values?
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    setTo: function (red, green, blue, alpha, updateHSV)
    {
        if (alpha === undefined) { alpha = 255; }
        if (updateHSV === undefined) { updateHSV = true; }

        this._locked = true;

        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;

        this._locked = false;

        return this.update(updateHSV);
    },

    /**
     * Sets the red, green, blue and alpha GL values of this Color component.
     *
     * @method Phaser.Display.Color#setGLTo
     * @since 3.0.0
     *
     * @param {number} red - The red color value. A number between 0 and 1.
     * @param {number} green - The green color value. A number between 0 and 1.
     * @param {number} blue - The blue color value. A number between 0 and 1.
     * @param {number} [alpha=1] - The alpha value. A number between 0 and 1.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    setGLTo: function (red, green, blue, alpha)
    {
        if (alpha === undefined) { alpha = 1; }

        this._locked = true;

        this.redGL = red;
        this.greenGL = green;
        this.blueGL = blue;
        this.alphaGL = alpha;

        this._locked = false;

        return this.update(true);
    },

    /**
     * Sets the color based on the color object given.
     *
     * @method Phaser.Display.Color#setFromRGB
     * @since 3.0.0
     *
     * @param {InputColorObject} color - An object containing `r`, `g`, `b` and optionally `a` values in the range 0 to 255.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    setFromRGB: function (color)
    {
        this._locked = true;

        this.red = color.r;
        this.green = color.g;
        this.blue = color.b;

        if (color.hasOwnProperty('a'))
        {
            this.alpha = color.a;
        }

        this._locked = false;

        return this.update(true);
    },

    /**
     * Sets the color based on the hue, saturation and lightness values given.
     *
     * @method Phaser.Display.Color#setFromHSV
     * @since 3.13.0
     *
     * @param {number} h - The hue, in the range 0 - 1. This is the base color.
     * @param {number} s - The saturation, in the range 0 - 1. This controls how much of the hue will be in the final color, where 1 is fully saturated and 0 will give you white.
     * @param {number} v - The value, in the range 0 - 1. This controls how dark the color is. Where 1 is as bright as possible and 0 is black.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    setFromHSV: function (h, s, v)
    {
        return HSVToRGB(h, s, v, this);
    },

    /**
     * Updates the internal cache values.
     *
     * @method Phaser.Display.Color#update
     * @private
     * @since 3.0.0
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    update: function (updateHSV)
    {
        if (updateHSV === undefined) { updateHSV = false; }

        if (this._locked)
        {
            return this;
        }

        var r = this.r;
        var g = this.g;
        var b = this.b;
        var a = this.a;

        this._color = GetColor(r, g, b);
        this._color32 = GetColor32(r, g, b, a);
        this._rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')';

        if (updateHSV)
        {
            RGBToHSV(r, g, b, this);
        }

        return this;
    },

    /**
     * Updates the internal hsv cache values.
     *
     * @method Phaser.Display.Color#updateHSV
     * @private
     * @since 3.13.0
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    updateHSV: function ()
    {
        var r = this.r;
        var g = this.g;
        var b = this.b;

        RGBToHSV(r, g, b, this);

        return this;
    },

    /**
     * Returns a new Color component using the values from this one.
     *
     * @method Phaser.Display.Color#clone
     * @since 3.0.0
     *
     * @return {Phaser.Display.Color} A new Color object.
     */
    clone: function ()
    {
        return new Color(this.r, this.g, this.b, this.a);
    },

    /**
     * Sets this Color object to be grayscaled based on the shade value given.
     *
     * @method Phaser.Display.Color#gray
     * @since 3.13.0
     * 
     * @param {integer} shade - A value between 0 and 255.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    gray: function (shade)
    {
        return this.setTo(shade, shade, shade);
    },

    /**
     * Sets this Color object to be a random color between the `min` and `max` values given.
     *
     * @method Phaser.Display.Color#random
     * @since 3.13.0
     * 
     * @param {integer} [min=0] - The minimum random color value. Between 0 and 255.
     * @param {integer} [max=255] - The maximum random color value. Between 0 and 255.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    random: function (min, max)
    {
        if (min === undefined) { min = 0; }
        if (max === undefined) { max = 255; }

        var r = Math.floor(min + Math.random() * (max - min));
        var g = Math.floor(min + Math.random() * (max - min));
        var b = Math.floor(min + Math.random() * (max - min));

        return this.setTo(r, g, b);
    },

    /**
     * Sets this Color object to be a random grayscale color between the `min` and `max` values given.
     *
     * @method Phaser.Display.Color#randomGray
     * @since 3.13.0
     * 
     * @param {integer} [min=0] - The minimum random color value. Between 0 and 255.
     * @param {integer} [max=255] - The maximum random color value. Between 0 and 255.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    randomGray: function (min, max)
    {
        if (min === undefined) { min = 0; }
        if (max === undefined) { max = 255; }

        var s = Math.floor(min + Math.random() * (max - min));

        return this.setTo(s, s, s);
    },

    /**
     * Increase the saturation of this Color by the percentage amount given.
     * The saturation is the amount of the base color in the hue.
     *
     * @method Phaser.Display.Color#saturate
     * @since 3.13.0
     * 
     * @param {integer} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    saturate: function (amount)
    {
        this.s += amount / 100;

        return this;
    },

    /**
     * Decrease the saturation of this Color by the percentage amount given.
     * The saturation is the amount of the base color in the hue.
     *
     * @method Phaser.Display.Color#desaturate
     * @since 3.13.0
     * 
     * @param {integer} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    desaturate: function (amount)
    {
        this.s -= amount / 100;

        return this;
    },

    /**
     * Increase the lightness of this Color by the percentage amount given.
     *
     * @method Phaser.Display.Color#lighten
     * @since 3.13.0
     * 
     * @param {integer} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    lighten: function (amount)
    {
        this.v += amount / 100;

        return this;
    },

    /**
     * Decrease the lightness of this Color by the percentage amount given.
     *
     * @method Phaser.Display.Color#darken
     * @since 3.13.0
     * 
     * @param {integer} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    darken: function (amount)
    {
        this.v -= amount / 100;

        return this;
    },

    /**
     * Brighten this Color by the percentage amount given.
     *
     * @method Phaser.Display.Color#brighten
     * @since 3.13.0
     * 
     * @param {integer} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    brighten: function (amount)
    {
        var r = this.r;
        var g = this.g;
        var b = this.b;

        r = Math.max(0, Math.min(255, r - Math.round(255 * - (amount / 100))));
        g = Math.max(0, Math.min(255, g - Math.round(255 * - (amount / 100))));
        b = Math.max(0, Math.min(255, b - Math.round(255 * - (amount / 100))));

        return this.setTo(r, g, b);
    },

    /**
     * The color of this Color component, not including the alpha channel.
     *
     * @name Phaser.Display.Color#color
     * @type {number}
     * @readonly
     * @since 3.0.0
     */
    color: {

        get: function ()
        {
            return this._color;
        }

    },

    /**
     * The color of this Color component, including the alpha channel.
     *
     * @name Phaser.Display.Color#color32
     * @type {number}
     * @readonly
     * @since 3.0.0
     */
    color32: {

        get: function ()
        {
            return this._color32;
        }

    },

    /**
     * The color of this Color component as a string which can be used in CSS color values.
     *
     * @name Phaser.Display.Color#rgba
     * @type {string}
     * @readonly
     * @since 3.0.0
     */
    rgba: {

        get: function ()
        {
            return this._rgba;
        }

    },

    /**
     * The red color value, normalized to the range 0 to 1.
     *
     * @name Phaser.Display.Color#redGL
     * @type {number}
     * @since 3.0.0
     */
    redGL: {

        get: function ()
        {
            return this.gl[0];
        },

        set: function (value)
        {
            this.gl[0] = Math.min(Math.abs(value), 1);

            this.r = Math.floor(this.gl[0] * 255);

            this.update(true);
        }

    },

    /**
     * The green color value, normalized to the range 0 to 1.
     *
     * @name Phaser.Display.Color#greenGL
     * @type {number}
     * @since 3.0.0
     */
    greenGL: {

        get: function ()
        {
            return this.gl[1];
        },

        set: function (value)
        {
            this.gl[1] = Math.min(Math.abs(value), 1);

            this.g = Math.floor(this.gl[1] * 255);

            this.update(true);
        }

    },

    /**
     * The blue color value, normalized to the range 0 to 1.
     *
     * @name Phaser.Display.Color#blueGL
     * @type {number}
     * @since 3.0.0
     */
    blueGL: {

        get: function ()
        {
            return this.gl[2];
        },

        set: function (value)
        {
            this.gl[2] = Math.min(Math.abs(value), 1);

            this.b = Math.floor(this.gl[2] * 255);

            this.update(true);
        }

    },

    /**
     * The alpha color value, normalized to the range 0 to 1.
     *
     * @name Phaser.Display.Color#alphaGL
     * @type {number}
     * @since 3.0.0
     */
    alphaGL: {

        get: function ()
        {
            return this.gl[3];
        },

        set: function (value)
        {
            this.gl[3] = Math.min(Math.abs(value), 1);

            this.a = Math.floor(this.gl[3] * 255);

            this.update();
        }

    },

    /**
     * The red color value, normalized to the range 0 to 255.
     *
     * @name Phaser.Display.Color#red
     * @type {number}
     * @since 3.0.0
     */
    red: {

        get: function ()
        {
            return this.r;
        },

        set: function (value)
        {
            value = Math.floor(Math.abs(value));

            this.r = Math.min(value, 255);

            this.gl[0] = value / 255;

            this.update(true);
        }

    },

    /**
     * The green color value, normalized to the range 0 to 255.
     *
     * @name Phaser.Display.Color#green
     * @type {number}
     * @since 3.0.0
     */
    green: {

        get: function ()
        {
            return this.g;
        },

        set: function (value)
        {
            value = Math.floor(Math.abs(value));

            this.g = Math.min(value, 255);

            this.gl[1] = value / 255;

            this.update(true);
        }

    },

    /**
     * The blue color value, normalized to the range 0 to 255.
     *
     * @name Phaser.Display.Color#blue
     * @type {number}
     * @since 3.0.0
     */
    blue: {

        get: function ()
        {
            return this.b;
        },

        set: function (value)
        {
            value = Math.floor(Math.abs(value));

            this.b = Math.min(value, 255);

            this.gl[2] = value / 255;

            this.update(true);
        }

    },

    /**
     * The alpha color value, normalized to the range 0 to 255.
     *
     * @name Phaser.Display.Color#alpha
     * @type {number}
     * @since 3.0.0
     */
    alpha: {

        get: function ()
        {
            return this.a;
        },

        set: function (value)
        {
            value = Math.floor(Math.abs(value));

            this.a = Math.min(value, 255);

            this.gl[3] = value / 255;

            this.update();
        }

    },

    /**
     * The hue color value. A number between 0 and 1.
     * This is the base color.
     *
     * @name Phaser.Display.Color#h
     * @type {number}
     * @since 3.13.0
     */
    h: {

        get: function ()
        {
            return this._h;
        },

        set: function (value)
        {
            this._h = value;

            HSVToRGB(value, this._s, this._v, this);
        }

    },

    /**
     * The saturation color value. A number between 0 and 1.
     * This controls how much of the hue will be in the final color, where 1 is fully saturated and 0 will give you white.
     *
     * @name Phaser.Display.Color#s
     * @type {number}
     * @since 3.13.0
     */
    s: {

        get: function ()
        {
            return this._s;
        },

        set: function (value)
        {
            this._s = value;

            HSVToRGB(this._h, value, this._v, this);
        }

    },

    /**
     * The lightness color value. A number between 0 and 1.
     * This controls how dark the color is. Where 1 is as bright as possible and 0 is black.
     *
     * @name Phaser.Display.Color#v
     * @type {number}
     * @since 3.13.0
     */
    v: {

        get: function ()
        {
            return this._v;
        },

        set: function (value)
        {
            this._v = value;

            HSVToRGB(this._h, this._s, value, this);
        }

    }

});

module.exports = Color;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var Vector2 = __webpack_require__(3);

/**
 * @classdesc
 * A Matrix used for display transformations for rendering.
 *
 * It is represented like so:
 *
 * ```
 * | a | c | tx |
 * | b | d | ty |
 * | 0 | 0 | 1  |
 * ```
 *
 * @class TransformMatrix
 * @memberof Phaser.GameObjects.Components
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [a=1] - The Scale X value.
 * @param {number} [b=0] - The Shear Y value.
 * @param {number} [c=0] - The Shear X value.
 * @param {number} [d=1] - The Scale Y value.
 * @param {number} [tx=0] - The Translate X value.
 * @param {number} [ty=0] - The Translate Y value.
 */
var TransformMatrix = new Class({

    initialize:

    function TransformMatrix (a, b, c, d, tx, ty)
    {
        if (a === undefined) { a = 1; }
        if (b === undefined) { b = 0; }
        if (c === undefined) { c = 0; }
        if (d === undefined) { d = 1; }
        if (tx === undefined) { tx = 0; }
        if (ty === undefined) { ty = 0; }

        /**
         * The matrix values.
         *
         * @name Phaser.GameObjects.Components.TransformMatrix#matrix
         * @type {Float32Array}
         * @since 3.0.0
         */
        this.matrix = new Float32Array([ a, b, c, d, tx, ty, 0, 0, 1 ]);

        /**
         * The decomposed matrix.
         *
         * @name Phaser.GameObjects.Components.TransformMatrix#decomposedMatrix
         * @type {object}
         * @since 3.0.0
         */
        this.decomposedMatrix = {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotation: 0
        };
    },

    /**
     * The Scale X value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#a
     * @type {number}
     * @since 3.4.0
     */
    a: {

        get: function ()
        {
            return this.matrix[0];
        },

        set: function (value)
        {
            this.matrix[0] = value;
        }

    },

    /**
     * The Shear Y value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#b
     * @type {number}
     * @since 3.4.0
     */
    b: {

        get: function ()
        {
            return this.matrix[1];
        },

        set: function (value)
        {
            this.matrix[1] = value;
        }

    },

    /**
     * The Shear X value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#c
     * @type {number}
     * @since 3.4.0
     */
    c: {

        get: function ()
        {
            return this.matrix[2];
        },

        set: function (value)
        {
            this.matrix[2] = value;
        }

    },

    /**
     * The Scale Y value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#d
     * @type {number}
     * @since 3.4.0
     */
    d: {

        get: function ()
        {
            return this.matrix[3];
        },

        set: function (value)
        {
            this.matrix[3] = value;
        }

    },

    /**
     * The Translate X value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#e
     * @type {number}
     * @since 3.11.0
     */
    e: {

        get: function ()
        {
            return this.matrix[4];
        },

        set: function (value)
        {
            this.matrix[4] = value;
        }

    },

    /**
     * The Translate Y value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#f
     * @type {number}
     * @since 3.11.0
     */
    f: {

        get: function ()
        {
            return this.matrix[5];
        },

        set: function (value)
        {
            this.matrix[5] = value;
        }

    },

    /**
     * The Translate X value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#tx
     * @type {number}
     * @since 3.4.0
     */
    tx: {

        get: function ()
        {
            return this.matrix[4];
        },

        set: function (value)
        {
            this.matrix[4] = value;
        }

    },

    /**
     * The Translate Y value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#ty
     * @type {number}
     * @since 3.4.0
     */
    ty: {

        get: function ()
        {
            return this.matrix[5];
        },

        set: function (value)
        {
            this.matrix[5] = value;
        }

    },

    /**
     * The rotation of the Matrix.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#rotation
     * @type {number}
     * @readonly
     * @since 3.4.0
     */
    rotation: {

        get: function ()
        {
            return Math.acos(this.a / this.scaleX) * (Math.atan(-this.c / this.a) < 0 ? -1 : 1);
        }

    },

    /**
     * The horizontal scale of the Matrix.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#scaleX
     * @type {number}
     * @readonly
     * @since 3.4.0
     */
    scaleX: {

        get: function ()
        {
            return Math.sqrt((this.a * this.a) + (this.c * this.c));
        }

    },

    /**
     * The vertical scale of the Matrix.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#scaleY
     * @type {number}
     * @readonly
     * @since 3.4.0
     */
    scaleY: {

        get: function ()
        {
            return Math.sqrt((this.b * this.b) + (this.d * this.d));
        }

    },

    /**
     * Reset the Matrix to an identity matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#loadIdentity
     * @since 3.0.0
     *
     * @return {this} This TransformMatrix.
     */
    loadIdentity: function ()
    {
        var matrix = this.matrix;

        matrix[0] = 1;
        matrix[1] = 0;
        matrix[2] = 0;
        matrix[3] = 1;
        matrix[4] = 0;
        matrix[5] = 0;

        return this;
    },

    /**
     * Translate the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#translate
     * @since 3.0.0
     *
     * @param {number} x - The horizontal translation value.
     * @param {number} y - The vertical translation value.
     *
     * @return {this} This TransformMatrix.
     */
    translate: function (x, y)
    {
        var matrix = this.matrix;

        matrix[4] = matrix[0] * x + matrix[2] * y + matrix[4];
        matrix[5] = matrix[1] * x + matrix[3] * y + matrix[5];

        return this;
    },

    /**
     * Scale the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#scale
     * @since 3.0.0
     *
     * @param {number} x - The horizontal scale value.
     * @param {number} y - The vertical scale value.
     *
     * @return {this} This TransformMatrix.
     */
    scale: function (x, y)
    {
        var matrix = this.matrix;

        matrix[0] *= x;
        matrix[1] *= x;
        matrix[2] *= y;
        matrix[3] *= y;

        return this;
    },

    /**
     * Rotate the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#rotate
     * @since 3.0.0
     *
     * @param {number} angle - The angle of rotation in radians.
     *
     * @return {this} This TransformMatrix.
     */
    rotate: function (angle)
    {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        var matrix = this.matrix;

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];

        matrix[0] = a * cos + c * sin;
        matrix[1] = b * cos + d * sin;
        matrix[2] = a * -sin + c * cos;
        matrix[3] = b * -sin + d * cos;

        return this;
    },

    /**
     * Multiply this Matrix by the given Matrix.
     * 
     * If an `out` Matrix is given then the results will be stored in it.
     * If it is not given, this matrix will be updated in place instead.
     * Use an `out` Matrix if you do not wish to mutate this matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#multiply
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.Components.TransformMatrix} rhs - The Matrix to multiply by.
     * @param {Phaser.GameObjects.Components.TransformMatrix} [out] - An optional Matrix to store the results in.
     *
     * @return {Phaser.GameObjects.Components.TransformMatrix} Either this TransformMatrix, or the `out` Matrix, if given in the arguments.
     */
    multiply: function (rhs, out)
    {
        var matrix = this.matrix;
        var source = rhs.matrix;

        var localA = matrix[0];
        var localB = matrix[1];
        var localC = matrix[2];
        var localD = matrix[3];
        var localE = matrix[4];
        var localF = matrix[5];

        var sourceA = source[0];
        var sourceB = source[1];
        var sourceC = source[2];
        var sourceD = source[3];
        var sourceE = source[4];
        var sourceF = source[5];

        var destinationMatrix = (out === undefined) ? this : out;

        destinationMatrix.a = (sourceA * localA) + (sourceB * localC);
        destinationMatrix.b = (sourceA * localB) + (sourceB * localD);
        destinationMatrix.c = (sourceC * localA) + (sourceD * localC);
        destinationMatrix.d = (sourceC * localB) + (sourceD * localD);
        destinationMatrix.e = (sourceE * localA) + (sourceF * localC) + localE;
        destinationMatrix.f = (sourceE * localB) + (sourceF * localD) + localF;

        return destinationMatrix;
    },

    /**
     * Multiply this Matrix by the matrix given, including the offset.
     * 
     * The offsetX is added to the tx value: `offsetX * a + offsetY * c + tx`.
     * The offsetY is added to the ty value: `offsetY * b + offsetY * d + ty`.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#multiplyWithOffset
     * @since 3.11.0
     *
     * @param {Phaser.GameObjects.Components.TransformMatrix} src - The source Matrix to copy from.
     * @param {number} offsetX - Horizontal offset to factor in to the multiplication.
     * @param {number} offsetY - Vertical offset to factor in to the multiplication.
     *
     * @return {this} This TransformMatrix.
     */
    multiplyWithOffset: function (src, offsetX, offsetY)
    {
        var matrix = this.matrix;
        var otherMatrix = src.matrix;

        var a0 = matrix[0];
        var b0 = matrix[1];
        var c0 = matrix[2];
        var d0 = matrix[3];
        var tx0 = matrix[4];
        var ty0 = matrix[5];

        var pse = offsetX * a0 + offsetY * c0 + tx0;
        var psf = offsetX * b0 + offsetY * d0 + ty0;

        var a1 = otherMatrix[0];
        var b1 = otherMatrix[1];
        var c1 = otherMatrix[2];
        var d1 = otherMatrix[3];
        var tx1 = otherMatrix[4];
        var ty1 = otherMatrix[5];

        matrix[0] = a1 * a0 + b1 * c0;
        matrix[1] = a1 * b0 + b1 * d0;
        matrix[2] = c1 * a0 + d1 * c0;
        matrix[3] = c1 * b0 + d1 * d0;
        matrix[4] = tx1 * a0 + ty1 * c0 + pse;
        matrix[5] = tx1 * b0 + ty1 * d0 + psf;

        return this;
    },

    /**
     * Transform the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#transform
     * @since 3.0.0
     *
     * @param {number} a - The Scale X value.
     * @param {number} b - The Shear Y value.
     * @param {number} c - The Shear X value.
     * @param {number} d - The Scale Y value.
     * @param {number} tx - The Translate X value.
     * @param {number} ty - The Translate Y value.
     *
     * @return {this} This TransformMatrix.
     */
    transform: function (a, b, c, d, tx, ty)
    {
        var matrix = this.matrix;

        var a0 = matrix[0];
        var b0 = matrix[1];
        var c0 = matrix[2];
        var d0 = matrix[3];
        var tx0 = matrix[4];
        var ty0 = matrix[5];

        matrix[0] = a * a0 + b * c0;
        matrix[1] = a * b0 + b * d0;
        matrix[2] = c * a0 + d * c0;
        matrix[3] = c * b0 + d * d0;
        matrix[4] = tx * a0 + ty * c0 + tx0;
        matrix[5] = tx * b0 + ty * d0 + ty0;

        return this;
    },

    /**
     * Transform a point using this Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#transformPoint
     * @since 3.0.0
     *
     * @param {number} x - The x coordinate of the point to transform.
     * @param {number} y - The y coordinate of the point to transform.
     * @param {(Phaser.Geom.Point|Phaser.Math.Vector2|object)} point - The Point object to store the transformed coordinates.
     *
     * @return {(Phaser.Geom.Point|Phaser.Math.Vector2|object)} The Point containing the transformed coordinates.
     */
    transformPoint: function (x, y, point)
    {
        if (point === undefined) { point = { x: 0, y: 0 }; }

        var matrix = this.matrix;

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];
        var tx = matrix[4];
        var ty = matrix[5];

        point.x = x * a + y * c + tx;
        point.y = x * b + y * d + ty;

        return point;
    },

    /**
     * Invert the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#invert
     * @since 3.0.0
     *
     * @return {this} This TransformMatrix.
     */
    invert: function ()
    {
        var matrix = this.matrix;

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];
        var tx = matrix[4];
        var ty = matrix[5];

        var n = a * d - b * c;

        matrix[0] = d / n;
        matrix[1] = -b / n;
        matrix[2] = -c / n;
        matrix[3] = a / n;
        matrix[4] = (c * ty - d * tx) / n;
        matrix[5] = -(a * ty - b * tx) / n;

        return this;
    },

    /**
     * Set the values of this Matrix to copy those of the matrix given.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#copyFrom
     * @since 3.11.0
     *
     * @param {Phaser.GameObjects.Components.TransformMatrix} src - The source Matrix to copy from.
     *
     * @return {this} This TransformMatrix.
     */
    copyFrom: function (src)
    {
        var matrix = this.matrix;

        matrix[0] = src.a;
        matrix[1] = src.b;
        matrix[2] = src.c;
        matrix[3] = src.d;
        matrix[4] = src.e;
        matrix[5] = src.f;

        return this;
    },

    /**
     * Set the values of this Matrix to copy those of the array given.
     * Where array indexes 0, 1, 2, 3, 4 and 5 are mapped to a, b, c, d, e and f.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#copyFromArray
     * @since 3.11.0
     *
     * @param {array} src - The array of values to set into this matrix.
     *
     * @return {this} This TransformMatrix.
     */
    copyFromArray: function (src)
    {
        var matrix = this.matrix;

        matrix[0] = src[0];
        matrix[1] = src[1];
        matrix[2] = src[2];
        matrix[3] = src[3];
        matrix[4] = src[4];
        matrix[5] = src[5];

        return this;
    },

    /**
     * Copy the values from this Matrix to the given Canvas Rendering Context.
     * This will use the Context.transform method.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#copyToContext
     * @since 3.12.0
     *
     * @param {CanvasRenderingContext2D} ctx - The Canvas Rendering Context to copy the matrix values to.
     *
     * @return {CanvasRenderingContext2D} The Canvas Rendering Context.
     */
    copyToContext: function (ctx)
    {
        var matrix = this.matrix;

        ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

        return ctx;
    },

    /**
     * Copy the values from this Matrix to the given Canvas Rendering Context.
     * This will use the Context.setTransform method.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#setToContext
     * @since 3.12.0
     *
     * @param {CanvasRenderingContext2D} ctx - The Canvas Rendering Context to copy the matrix values to.
     *
     * @return {CanvasRenderingContext2D} The Canvas Rendering Context.
     */
    setToContext: function (ctx)
    {
        var matrix = this.matrix;

        ctx.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

        return ctx;
    },

    /**
     * Copy the values in this Matrix to the array given.
     * 
     * Where array indexes 0, 1, 2, 3, 4 and 5 are mapped to a, b, c, d, e and f.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#copyToArray
     * @since 3.12.0
     *
     * @param {array} [out] - The array to copy the matrix values in to.
     *
     * @return {array} An array where elements 0 to 5 contain the values from this matrix.
     */
    copyToArray: function (out)
    {
        var matrix = this.matrix;

        if (out === undefined)
        {
            out = [ matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5] ];
        }
        else
        {
            out[0] = matrix[0];
            out[1] = matrix[1];
            out[2] = matrix[2];
            out[3] = matrix[3];
            out[4] = matrix[4];
            out[5] = matrix[5];
        }

        return out;
    },

    /**
     * Set the values of this Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#setTransform
     * @since 3.0.0
     *
     * @param {number} a - The Scale X value.
     * @param {number} b - The Shear Y value.
     * @param {number} c - The Shear X value.
     * @param {number} d - The Scale Y value.
     * @param {number} tx - The Translate X value.
     * @param {number} ty - The Translate Y value.
     *
     * @return {this} This TransformMatrix.
     */
    setTransform: function (a, b, c, d, tx, ty)
    {
        var matrix = this.matrix;

        matrix[0] = a;
        matrix[1] = b;
        matrix[2] = c;
        matrix[3] = d;
        matrix[4] = tx;
        matrix[5] = ty;

        return this;
    },

    /**
     * Decompose this Matrix into its translation, scale and rotation values.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#decomposeMatrix
     * @since 3.0.0
     *
     * @return {object} The decomposed Matrix.
     */
    decomposeMatrix: function ()
    {
        var decomposedMatrix = this.decomposedMatrix;

        var matrix = this.matrix;

        //  a = scale X (1)
        //  b = shear Y (0)
        //  c = shear X (0)
        //  d = scale Y (1)

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];

        var a2 = a * a;
        var b2 = b * b;
        var c2 = c * c;
        var d2 = d * d;

        var sx = Math.sqrt(a2 + c2);
        var sy = Math.sqrt(b2 + d2);

        decomposedMatrix.translateX = matrix[4];
        decomposedMatrix.translateY = matrix[5];

        decomposedMatrix.scaleX = sx;
        decomposedMatrix.scaleY = sy;

        decomposedMatrix.rotation = Math.acos(a / sx) * (Math.atan(-c / a) < 0 ? -1 : 1);

        return decomposedMatrix;
    },

    /**
     * Apply the identity, translate, rotate and scale operations on the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#applyITRS
     * @since 3.0.0
     *
     * @param {number} x - The horizontal translation.
     * @param {number} y - The vertical translation.
     * @param {number} rotation - The angle of rotation in radians.
     * @param {number} scaleX - The horizontal scale.
     * @param {number} scaleY - The vertical scale.
     *
     * @return {this} This TransformMatrix.
     */
    applyITRS: function (x, y, rotation, scaleX, scaleY)
    {
        var matrix = this.matrix;

        var radianSin = Math.sin(rotation);
        var radianCos = Math.cos(rotation);

        // Translate
        matrix[4] = x;
        matrix[5] = y;

        // Rotate and Scale
        matrix[0] = radianCos * scaleX;
        matrix[1] = radianSin * scaleX;
        matrix[2] = -radianSin * scaleY;
        matrix[3] = radianCos * scaleY;

        return this;
    },

    /**
     * Takes the `x` and `y` values and returns a new position in the `output` vector that is the inverse of
     * the current matrix with its transformation applied.
     * 
     * Can be used to translate points from world to local space.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#applyInverse
     * @since 3.12.0
     *
     * @param {number} x - The x position to translate.
     * @param {number} y - The y position to translate.
     * @param {Phaser.Math.Vector2} [output] - A Vector2, or point-like object, to store the results in.
     *
     * @return {Phaser.Math.Vector2} The coordinates, inverse-transformed through this matrix.
     */
    applyInverse: function (x, y, output)
    {
        if (output === undefined) { output = new Vector2(); }

        var matrix = this.matrix;

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];
        var tx = matrix[4];
        var ty = matrix[5];

        var id = 1 / ((a * d) + (c * -b));

        output.x = (d * id * x) + (-c * id * y) + (((ty * c) - (tx * d)) * id);
        output.y = (a * id * y) + (-b * id * x) + (((-ty * a) + (tx * b)) * id);

        return output;
    },

    /**
     * Returns the X component of this matrix multiplied by the given values.
     * This is the same as `x * a + y * c + e`.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#getX
     * @since 3.12.0
     * 
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     *
     * @return {number} The calculated x value.
     */
    getX: function (x, y)
    {
        return x * this.a + y * this.c + this.e;
    },

    /**
     * Returns the Y component of this matrix multiplied by the given values.
     * This is the same as `x * b + y * d + f`.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#getY
     * @since 3.12.0
     * 
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     *
     * @return {number} The calculated y value.
     */
    getY: function (x, y)
    {
        return x * this.b + y * this.d + this.f;
    },

    /**
     * Returns a string that can be used in a CSS Transform call as a `matrix` property.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#getCSSMatrix
     * @since 3.12.0
     *
     * @return {string} A string containing the CSS Transform matrix values.
     */
    getCSSMatrix: function ()
    {
        var m = this.matrix;

        return 'matrix(' + m[0] + ',' + m[1] + ',' + m[2] + ',' + m[3] + ',' + m[4] + ',' + m[5] + ')';
    },

    /**
     * Destroys this Transform Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#destroy
     * @since 3.4.0
     */
    destroy: function ()
    {
        this.matrix = null;
        this.decomposedMatrix = null;
    }

});

module.exports = TransformMatrix;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * [description]
 *
 * @function Phaser.Geom.Rectangle.Contains
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Rectangle} rect - [description]
 * @param {number} x - [description]
 * @param {number} y - [description]
 *
 * @return {boolean} [description]
 */
var Contains = function (rect, x, y)
{
    if (rect.width <= 0 || rect.height <= 0)
    {
        return false;
    }

    return (rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y);
};

module.exports = Contains;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Check to see if the Circle contains the given x / y coordinates.
 *
 * @function Phaser.Geom.Circle.Contains
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Circle} circle - The Circle to check.
 * @param {number} x - The x coordinate to check within the circle.
 * @param {number} y - The y coordinate to check within the circle.
 *
 * @return {boolean} True if the coordinates are within the circle, otherwise false.
 */
var Contains = function (circle, x, y)
{
    //  Check if x/y are within the bounds first
    if (circle.radius > 0 && x >= circle.left && x <= circle.right && y >= circle.top && y <= circle.bottom)
    {
        var dx = (circle.x - x) * (circle.x - x);
        var dy = (circle.y - y) * (circle.y - y);

        return (dx + dy) <= (circle.radius * circle.radius);
    }
    else
    {
        return false;
    }
};

module.exports = Contains;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Positions the Game Object so that the top of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetTop
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} value - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetTop = function (gameObject, value)
{
    gameObject.y = value + (gameObject.height * gameObject.originY);

    return gameObject;
};

module.exports = SetTop;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Returns the top coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetTop
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The top coordinate of the bounds of the Game Object.
 */
var GetTop = function (gameObject)
{
    return gameObject.y - (gameObject.height * gameObject.originY);
};

module.exports = GetTop;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Positions the Game Object so that the left of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetRight
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} value - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetRight = function (gameObject, value)
{
    gameObject.x = (value - gameObject.width) + (gameObject.width * gameObject.originX);

    return gameObject;
};

module.exports = SetRight;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Returns the right coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetRight
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The right coordinate of the bounds of the Game Object.
 */
var GetRight = function (gameObject)
{
    return (gameObject.x + gameObject.width) - (gameObject.width * gameObject.originX);
};

module.exports = GetRight;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Positions the Game Object so that the left of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetLeft
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} value - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetLeft = function (gameObject, value)
{
    gameObject.x = value + (gameObject.width * gameObject.originX);

    return gameObject;
};

module.exports = SetLeft;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Returns the left coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetLeft
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The left coordinate of the bounds of the Game Object.
 */
var GetLeft = function (gameObject)
{
    return gameObject.x - (gameObject.width * gameObject.originX);
};

module.exports = GetLeft;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Positions the Game Object so that the bottom of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetBottom
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} value - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetBottom = function (gameObject, value)
{
    gameObject.y = (value - gameObject.height) + (gameObject.height * gameObject.originY);

    return gameObject;
};

module.exports = SetBottom;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Returns the bottom coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetBottom
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The bottom coordinate of the bounds of the Game Object.
 */
var GetBottom = function (gameObject)
{
    return (gameObject.y + gameObject.height) - (gameObject.height * gameObject.originY);
};

module.exports = GetBottom;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Converts from world Y coordinates (pixels) to tile Y coordinates (tile units), factoring in the
 * layer's position, scale and scroll.
 *
 * @function Phaser.Tilemaps.Components.WorldToTileY
 * @private
 * @since 3.0.0
 *
 * @param {number} worldY - The y coordinate to be converted, in pixels, not tiles.
 * @param {boolean} [snapToFloor=true] - Whether or not to round the tile coordinate down to the nearest integer.
 * @param {Phaser.Cameras.Scene2D.Camera} [camera=main camera] - The Camera to use when calculating the tile index from the world values.
 * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
 * 
 * @return {number} The Y location in tile units.
 */
var WorldToTileY = function (worldY, snapToFloor, camera, layer)
{
    if (snapToFloor === undefined) { snapToFloor = true; }

    var tileHeight = layer.baseTileHeight;
    var tilemapLayer = layer.tilemapLayer;

    if (tilemapLayer)
    {
        if (camera === undefined) { camera = tilemapLayer.scene.cameras.main; }

        // Find the world position relative to the static or dynamic layer's top left origin,
        // factoring in the camera's vertical scroll
        worldY = worldY - (tilemapLayer.y + camera.scrollY * (1 - tilemapLayer.scrollFactorY));

        tileHeight *= tilemapLayer.scaleY;
    }

    return snapToFloor
        ? Math.floor(worldY / tileHeight)
        : worldY / tileHeight;
};

module.exports = WorldToTileY;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Converts from world X coordinates (pixels) to tile X coordinates (tile units), factoring in the
 * layer's position, scale and scroll.
 *
 * @function Phaser.Tilemaps.Components.WorldToTileX
 * @private
 * @since 3.0.0
 *
 * @param {number} worldX - The x coordinate to be converted, in pixels, not tiles.
 * @param {boolean} [snapToFloor=true] - Whether or not to round the tile coordinate down to the nearest integer.
 * @param {Phaser.Cameras.Scene2D.Camera} [camera=main camera] - The Camera to use when calculating the tile index from the world values.
 * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
 * 
 * @return {number} The X location in tile units.
 */
var WorldToTileX = function (worldX, snapToFloor, camera, layer)
{
    if (snapToFloor === undefined) { snapToFloor = true; }

    var tileWidth = layer.baseTileWidth;
    var tilemapLayer = layer.tilemapLayer;

    if (tilemapLayer)
    {
        if (camera === undefined) { camera = tilemapLayer.scene.cameras.main; }

        // Find the world position relative to the static or dynamic layer's top left origin,
        // factoring in the camera's horizontal scroll
        worldX = worldX - (tilemapLayer.x + camera.scrollX * (1 - tilemapLayer.scrollFactorX));

        tileWidth *= tilemapLayer.scaleX;
    }

    return snapToFloor
        ? Math.floor(worldX / tileWidth)
        : worldX / tileWidth;
};

module.exports = WorldToTileX;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var CONST = __webpack_require__(18);
var File = __webpack_require__(21);
var FileTypesManager = __webpack_require__(7);
var GetFastValue = __webpack_require__(2);
var GetValue = __webpack_require__(4);
var IsPlainObject = __webpack_require__(8);

/**
 * @typedef {object} Phaser.Loader.FileTypes.JSONFileConfig
 *
 * @property {string} key - The key of the file. Must be unique within both the Loader and the JSON Cache.
 * @property {string|any} [url] - The absolute or relative URL to load the file from. Or can be a ready formed JSON object, in which case it will be directly added to the Cache.
 * @property {string} [extension='json'] - The default file extension to use if no url is provided.
 * @property {string} [dataKey] - If specified instead of the whole JSON file being parsed and added to the Cache, only the section corresponding to this property key will be added. If the property you want to extract is nested, use periods to divide it.
 * @property {XHRSettingsObject} [xhrSettings] - Extra XHR Settings specifically for this file.
 */

/**
 * @classdesc
 * A single JSON File suitable for loading by the Loader.
 *
 * These are created when you use the Phaser.Loader.LoaderPlugin#json method and are not typically created directly.
 * 
 * For documentation about what all the arguments and configuration options mean please see Phaser.Loader.LoaderPlugin#json.
 *
 * @class JSONFile
 * @extends Phaser.Loader.File
 * @memberof Phaser.Loader.FileTypes
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Loader.LoaderPlugin} loader - A reference to the Loader that is responsible for this file.
 * @param {(string|Phaser.Loader.FileTypes.JSONFileConfig)} key - The key to use for this file, or a file configuration object.
 * @param {string} [url] - The absolute or relative URL to load this file from. If undefined or `null` it will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json".
 * @param {XHRSettingsObject} [xhrSettings] - Extra XHR Settings specifically for this file.
 * @param {string} [dataKey] - When the JSON file loads only this property will be stored in the Cache.
 */
var JSONFile = new Class({

    Extends: File,

    initialize:

    //  url can either be a string, in which case it is treated like a proper url, or an object, in which case it is treated as a ready-made JS Object
    //  dataKey allows you to pluck a specific object out of the JSON and put just that into the cache, rather than the whole thing

    function JSONFile (loader, key, url, xhrSettings, dataKey)
    {
        var extension = 'json';

        if (IsPlainObject(key))
        {
            var config = key;

            key = GetFastValue(config, 'key');
            url = GetFastValue(config, 'url');
            xhrSettings = GetFastValue(config, 'xhrSettings');
            extension = GetFastValue(config, 'extension', extension);
            dataKey = GetFastValue(config, 'dataKey', dataKey);
        }

        var fileConfig = {
            type: 'json',
            cache: loader.cacheManager.json,
            extension: extension,
            responseType: 'text',
            key: key,
            url: url,
            xhrSettings: xhrSettings,
            config: dataKey
        };

        File.call(this, loader, fileConfig);

        if (IsPlainObject(url))
        {
            //  Object provided instead of a URL, so no need to actually load it (populate data with value)
            if (dataKey)
            {
                this.data = GetValue(url, dataKey);
            }
            else
            {
                this.data = url;
            }

            this.state = CONST.FILE_POPULATED;
        }
    },

    /**
     * Called automatically by Loader.nextFile.
     * This method controls what extra work this File does with its loaded data.
     *
     * @method Phaser.Loader.FileTypes.JSONFile#onProcess
     * @since 3.7.0
     */
    onProcess: function ()
    {
        if (this.state !== CONST.FILE_POPULATED)
        {
            this.state = CONST.FILE_PROCESSING;

            var json = JSON.parse(this.xhrLoader.responseText);

            var key = this.config;

            if (typeof key === 'string')
            {
                this.data = GetValue(json, key, json);
            }
            else
            {
                this.data = json;
            }
        }

        this.onProcessComplete();
    }

});

/**
 * Adds a JSON file, or array of JSON files, to the current load queue.
 *
 * You can call this method from within your Scene's `preload`, along with any other files you wish to load:
 * 
 * ```javascript
 * function preload ()
 * {
 *     this.load.json('wavedata', 'files/AlienWaveData.json');
 * }
 * ```
 *
 * The file is **not** loaded right away. It is added to a queue ready to be loaded either when the loader starts,
 * or if it's already running, when the next free load slot becomes available. This happens automatically if you
 * are calling this from within the Scene's `preload` method, or a related callback. Because the file is queued
 * it means you cannot use the file immediately after calling this method, but must wait for the file to complete.
 * The typical flow for a Phaser Scene is that you load assets in the Scene's `preload` method and then when the
 * Scene's `create` method is called you are guaranteed that all of those assets are ready for use and have been
 * loaded.
 * 
 * The key must be a unique String. It is used to add the file to the global JSON Cache upon a successful load.
 * The key should be unique both in terms of files being loaded and files already present in the JSON Cache.
 * Loading a file using a key that is already taken will result in a warning. If you wish to replace an existing file
 * then remove it from the JSON Cache first, before loading a new one.
 *
 * Instead of passing arguments you can pass a configuration object, such as:
 * 
 * ```javascript
 * this.load.json({
 *     key: 'wavedata',
 *     url: 'files/AlienWaveData.json'
 * });
 * ```
 *
 * See the documentation for `Phaser.Loader.FileTypes.JSONFileConfig` for more details.
 *
 * Once the file has finished loading you can access it from its Cache using its key:
 * 
 * ```javascript
 * this.load.json('wavedata', 'files/AlienWaveData.json');
 * // and later in your game ...
 * var data = this.cache.json.get('wavedata');
 * ```
 *
 * If you have specified a prefix in the loader, via `Loader.setPrefix` then this value will be prepended to this files
 * key. For example, if the prefix was `LEVEL1.` and the key was `Waves` the final key will be `LEVEL1.Waves` and
 * this is what you would use to retrieve the text from the JSON Cache.
 *
 * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
 *
 * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "data"
 * and no URL is given then the Loader will set the URL to be "data.json". It will always add `.json` as the extension, although
 * this can be overridden if using an object instead of method arguments. If you do not desire this action then provide a URL.
 *
 * You can also optionally provide a `dataKey` to use. This allows you to extract only a part of the JSON and store it in the Cache,
 * rather than the whole file. For example, if your JSON data had a structure like this:
 * 
 * ```json
 * {
 *     "level1": {
 *         "baddies": {
 *             "aliens": {},
 *             "boss": {}
 *         }
 *     },
 *     "level2": {},
 *     "level3": {}
 * }
 * ```
 *
 * And you only wanted to store the `boss` data in the Cache, then you could pass `level1.baddies.boss`as the `dataKey`.
 *
 * Note: The ability to load this type of file will only be available if the JSON File type has been built into Phaser.
 * It is available in the default build but can be excluded from custom builds.
 *
 * @method Phaser.Loader.LoaderPlugin#json
 * @fires Phaser.Loader.LoaderPlugin#addFileEvent
 * @since 3.0.0
 *
 * @param {(string|Phaser.Loader.FileTypes.JSONFileConfig|Phaser.Loader.FileTypes.JSONFileConfig[])} key - The key to use for this file, or a file configuration object, or array of them.
 * @param {string} [url] - The absolute or relative URL to load this file from. If undefined or `null` it will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json".
 * @param {string} [dataKey] - When the JSON file loads only this property will be stored in the Cache.
 * @param {XHRSettingsObject} [xhrSettings] - An XHR Settings configuration object. Used in replacement of the Loaders default XHR Settings.
 *
 * @return {Phaser.Loader.LoaderPlugin} The Loader instance.
 */
FileTypesManager.register('json', function (key, url, dataKey, xhrSettings)
{
    if (Array.isArray(key))
    {
        for (var i = 0; i < key.length; i++)
        {
            //  If it's an array it has to be an array of Objects, so we get everything out of the 'key' object
            this.addFile(new JSONFile(this, key[i]));
        }
    }
    else
    {
        this.addFile(new JSONFile(this, key, url, xhrSettings, dataKey));
    }

    return this;
});

module.exports = JSONFile;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Calculate the distance between two sets of coordinates (points).
 *
 * @function Phaser.Math.Distance.Between
 * @since 3.0.0
 *
 * @param {number} x1 - The x coordinate of the first point.
 * @param {number} y1 - The y coordinate of the first point.
 * @param {number} x2 - The x coordinate of the second point.
 * @param {number} y2 - The y coordinate of the second point.
 *
 * @return {number} The distance between each point.
 */
var DistanceBetween = function (x1, y1, x2, y2)
{
    var dx = x1 - x2;
    var dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
};

module.exports = DistanceBetween;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Wrap the given `value` between `min` and `max.
 *
 * @function Phaser.Math.Wrap
 * @since 3.0.0
 *
 * @param {number} value - The value to wrap.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 *
 * @return {number} The wrapped value.
 */
var Wrap = function (value, min, max)
{
    var range = max - min;

    return (min + ((((value - min) % range) + range) % range));
};

module.exports = Wrap;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var GetPoint = __webpack_require__(397);
var GetPoints = __webpack_require__(189);
var Random = __webpack_require__(188);
var Vector2 = __webpack_require__(3);

/**
 * @classdesc
 * Defines a Line segment, a part of a line between two endpoints.
 *
 * @class Line
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x1=0] - The x coordinate of the lines starting point.
 * @param {number} [y1=0] - The y coordinate of the lines starting point.
 * @param {number} [x2=0] - The x coordinate of the lines ending point.
 * @param {number} [y2=0] - The y coordinate of the lines ending point.
 */
var Line = new Class({

    initialize:

    function Line (x1, y1, x2, y2)
    {
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }

        /**
         * The x coordinate of the lines starting point.
         *
         * @name Phaser.Geom.Line#x1
         * @type {number}
         * @since 3.0.0
         */
        this.x1 = x1;

        /**
         * The y coordinate of the lines starting point.
         *
         * @name Phaser.Geom.Line#y1
         * @type {number}
         * @since 3.0.0
         */
        this.y1 = y1;

        /**
         * The x coordinate of the lines ending point.
         *
         * @name Phaser.Geom.Line#x2
         * @type {number}
         * @since 3.0.0
         */
        this.x2 = x2;

        /**
         * The y coordinate of the lines ending point.
         *
         * @name Phaser.Geom.Line#y2
         * @type {number}
         * @since 3.0.0
         */
        this.y2 = y2;
    },

    /**
     * Get a point on a line that's a given percentage along its length.
     *
     * @method Phaser.Geom.Line#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [output,$return]
     *
     * @param {number} position - A value between 0 and 1, where 0 is the start, 0.5 is the middle and 1 is the end of the line.
     * @param {(Phaser.Geom.Point|object)} [output] - An optional point, or point-like object, to store the coordinates of the point on the line.
     *
     * @return {(Phaser.Geom.Point|object)} A Point, or point-like object, containing the coordinates of the point on the line.
     */
    getPoint: function (position, output)
    {
        return GetPoint(this, position, output);
    },

    /**
     * Get a number of points along a line's length.
     *
     * Provide a `quantity` to get an exact number of points along the line.
     *
     * Provide a `stepRate` to ensure a specific distance between each point on the line. Set `quantity` to `0` when
     * providing a `stepRate`.
     *
     * @method Phaser.Geom.Line#getPoints
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [output,$return]
     *
     * @param {integer} quantity - The number of points to place on the line. Set to `0` to use `stepRate` instead.
     * @param {integer} [stepRate] - The distance between each point on the line. When set, `quantity` is implied and should be set to `0`.
     * @param {(array|Phaser.Geom.Point[])} [output] - An optional array of Points, or point-like objects, to store the coordinates of the points on the line.
     *
     * @return {(array|Phaser.Geom.Point[])} An array of Points, or point-like objects, containing the coordinates of the points on the line.
     */
    getPoints: function (quantity, stepRate, output)
    {
        return GetPoints(this, quantity, stepRate, output);
    },

    /**
     * Get a random Point on the Line.
     *
     * @method Phaser.Geom.Line#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {(Phaser.Geom.Point|object)} [point] - An instance of a Point to be modified.
     *
     * @return {Phaser.Geom.Point} A random Point on the Line.
     */
    getRandomPoint: function (point)
    {
        return Random(this, point);
    },

    /**
     * Set new coordinates for the line endpoints.
     *
     * @method Phaser.Geom.Line#setTo
     * @since 3.0.0
     *
     * @param {number} [x1=0] - The x coordinate of the lines starting point.
     * @param {number} [y1=0] - The y coordinate of the lines starting point.
     * @param {number} [x2=0] - The x coordinate of the lines ending point.
     * @param {number} [y2=0] - The y coordinate of the lines ending point.
     *
     * @return {Phaser.Geom.Line} This Line object.
     */
    setTo: function (x1, y1, x2, y2)
    {
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }

        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;

        return this;
    },

    /**
     * Returns a Vector2 object that corresponds to the start of this Line.
     *
     * @method Phaser.Geom.Line#getPointA
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [vec2,$return]
     *
     * @param {Phaser.Math.Vector2} [vec2] - A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
     *
     * @return {Phaser.Math.Vector2} A Vector2 object that corresponds to the start of this Line.
     */
    getPointA: function (vec2)
    {
        if (vec2 === undefined) { vec2 = new Vector2(); }

        vec2.set(this.x1, this.y1);

        return vec2;
    },

    /**
     * Returns a Vector2 object that corresponds to the end of this Line.
     *
     * @method Phaser.Geom.Line#getPointB
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [vec2,$return]
     *
     * @param {Phaser.Math.Vector2} [vec2] - A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
     *
     * @return {Phaser.Math.Vector2} A Vector2 object that corresponds to the end of this Line.
     */
    getPointB: function (vec2)
    {
        if (vec2 === undefined) { vec2 = new Vector2(); }

        vec2.set(this.x2, this.y2);

        return vec2;
    },

    /**
     * The left position of the Line.
     *
     * @name Phaser.Geom.Line#left
     * @type {number}
     * @since 3.0.0
     */
    left: {

        get: function ()
        {
            return Math.min(this.x1, this.x2);
        },

        set: function (value)
        {
            if (this.x1 <= this.x2)
            {
                this.x1 = value;
            }
            else
            {
                this.x2 = value;
            }
        }

    },

    /**
     * The right position of the Line.
     *
     * @name Phaser.Geom.Line#right
     * @type {number}
     * @since 3.0.0
     */
    right: {

        get: function ()
        {
            return Math.max(this.x1, this.x2);
        },

        set: function (value)
        {
            if (this.x1 > this.x2)
            {
                this.x1 = value;
            }
            else
            {
                this.x2 = value;
            }
        }

    },

    /**
     * The top position of the Line.
     *
     * @name Phaser.Geom.Line#top
     * @type {number}
     * @since 3.0.0
     */
    top: {

        get: function ()
        {
            return Math.min(this.y1, this.y2);
        },

        set: function (value)
        {
            if (this.y1 <= this.y2)
            {
                this.y1 = value;
            }
            else
            {
                this.y2 = value;
            }
        }

    },

    /**
     * The bottom position of the Line.
     *
     * @name Phaser.Geom.Line#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {

        get: function ()
        {
            return Math.max(this.y1, this.y2);
        },

        set: function (value)
        {
            if (this.y1 > this.y2)
            {
                this.y1 = value;
            }
            else
            {
                this.y2 = value;
            }
        }

    }

});

module.exports = Line;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var Components = __webpack_require__(14);
var Rectangle = __webpack_require__(265);

/**
 * @classdesc
 * A Tile is a representation of a single tile within the Tilemap. This is a lightweight data
 * representation, so its position information is stored without factoring in scroll, layer
 * scale or layer position.
 *
 * @class Tile
 * @memberof Phaser.Tilemaps
 * @constructor
 * @since 3.0.0
 *
 * @extends Phaser.GameObjects.Components.Alpha
 * @extends Phaser.GameObjects.Components.Flip
 * @extends Phaser.GameObjects.Components.Visible
 *
 * @param {Phaser.Tilemaps.LayerData} layer - The LayerData object in the Tilemap that this tile belongs to.
 * @param {integer} index - The unique index of this tile within the map.
 * @param {integer} x - The x coordinate of this tile in tile coordinates.
 * @param {integer} y - The y coordinate of this tile in tile coordinates.
 * @param {integer} width - Width of the tile in pixels.
 * @param {integer} height - Height of the tile in pixels.
 * @param {integer} baseWidth - The base width a tile in the map (in pixels). Tiled maps support
 * multiple tileset sizes within one map, but they are still placed at intervals of the base
 * tile width.
 * @param {integer} baseHeight - The base height of the tile in pixels (in pixels). Tiled maps
 * support multiple tileset sizes within one map, but they are still placed at intervals of the
 * base tile height.
 */
var Tile = new Class({

    Mixins: [
        Components.Alpha,
        Components.Flip,
        Components.Visible
    ],

    initialize:

    function Tile (layer, index, x, y, width, height, baseWidth, baseHeight)
    {
        /**
         * The LayerData in the Tilemap data that this tile belongs to.
         *
         * @name Phaser.Tilemaps.Tile#layer
         * @type {Phaser.Tilemaps.LayerData}
         * @since 3.0.0
         */
        this.layer = layer;

        /**
         * The index of this tile within the map data corresponding to the tileset, or -1 if this
         * represents a blank tile.
         *
         * @name Phaser.Tilemaps.Tile#index
         * @type {integer}
         * @since 3.0.0
         */
        this.index = index;

        /**
         * The x map coordinate of this tile in tile units.
         *
         * @name Phaser.Tilemaps.Tile#x
         * @type {integer}
         * @since 3.0.0
         */
        this.x = x;

        /**
         * The y map coordinate of this tile in tile units.
         *
         * @name Phaser.Tilemaps.Tile#y
         * @type {integer}
         * @since 3.0.0
         */
        this.y = y;

        /**
         * The width of the tile in pixels.
         *
         * @name Phaser.Tilemaps.Tile#width
         * @type {integer}
         * @since 3.0.0
         */
        this.width = width;

        /**
         * The height of the tile in pixels.
         *
         * @name Phaser.Tilemaps.Tile#height
         * @type {integer}
         * @since 3.0.0
         */
        this.height = height;

        /**
         * The map's base width of a tile in pixels. Tiled maps support multiple tileset sizes
         * within one map, but they are still placed at intervals of the base tile size.
         *
         * @name Phaser.Tilemaps.Tile#baseWidth
         * @type {integer}
         * @since 3.0.0
         */
        this.baseWidth = (baseWidth !== undefined) ? baseWidth : width;

        /**
         * The map's base height of a tile in pixels. Tiled maps support multiple tileset sizes
         * within one map, but they are still placed at intervals of the base tile size.
         *
         * @name Phaser.Tilemaps.Tile#baseHeight
         * @type {integer}
         * @since 3.0.0
         */
        this.baseHeight = (baseHeight !== undefined) ? baseHeight : height;

        /**
         * The x coordinate of the top left of this tile in pixels. This is relative to the top left
         * of the layer this tile is being rendered within. This property does NOT factor in camera
         * scroll, layer scale or layer position.
         *
         * @name Phaser.Tilemaps.Tile#pixelX
         * @type {number}
         * @since 3.0.0
         */
        this.pixelX = 0;

        /**
         * The y coordinate of the top left of this tile in pixels. This is relative to the top left
         * of the layer this tile is being rendered within. This property does NOT factor in camera
         * scroll, layer scale or layer position.
         *
         * @name Phaser.Tilemaps.Tile#pixelY
         * @type {number}
         * @since 3.0.0
         */
        this.pixelY = 0;

        this.updatePixelXY();

        /**
         * Tile specific properties. These usually come from Tiled.
         *
         * @name Phaser.Tilemaps.Tile#properties
         * @type {object}
         * @since 3.0.0
         */
        this.properties = {};

        /**
         * The rotation angle of this tile.
         *
         * @name Phaser.Tilemaps.Tile#rotation
         * @type {number}
         * @since 3.0.0
         */
        this.rotation = 0;

        /**
         * Whether the tile should collide with any object on the left side.
         *
         * @name Phaser.Tilemaps.Tile#collideLeft
         * @type {boolean}
         * @since 3.0.0
         */
        this.collideLeft = false;

        /**
         * Whether the tile should collide with any object on the right side.
         *
         * @name Phaser.Tilemaps.Tile#collideRight
         * @type {boolean}
         * @since 3.0.0
         */
        this.collideRight = false;

        /**
         * Whether the tile should collide with any object on the top side.
         *
         * @name Phaser.Tilemaps.Tile#collideUp
         * @type {boolean}
         * @since 3.0.0
         */
        this.collideUp = false;

        /**
         * Whether the tile should collide with any object on the bottom side.
         *
         * @name Phaser.Tilemaps.Tile#collideDown
         * @type {boolean}
         * @since 3.0.0
         */
        this.collideDown = false;

        /**
         * Whether the tile's left edge is interesting for collisions.
         *
         * @name Phaser.Tilemaps.Tile#faceLeft
         * @type {boolean}
         * @since 3.0.0
         */
        this.faceLeft = false;

        /**
         * Whether the tile's right edge is interesting for collisions.
         *
         * @name Phaser.Tilemaps.Tile#faceRight
         * @type {boolean}
         * @since 3.0.0
         */
        this.faceRight = false;

        /**
         * Whether the tile's top edge is interesting for collisions.
         *
         * @name Phaser.Tilemaps.Tile#faceTop
         * @type {boolean}
         * @since 3.0.0
         */
        this.faceTop = false;

        /**
         * Whether the tile's bottom edge is interesting for collisions.
         *
         * @name Phaser.Tilemaps.Tile#faceBottom
         * @type {boolean}
         * @since 3.0.0
         */
        this.faceBottom = false;

        /**
         * Tile collision callback.
         *
         * @name Phaser.Tilemaps.Tile#collisionCallback
         * @type {function}
         * @since 3.0.0
         */
        this.collisionCallback = null;

        /**
         * The context in which the collision callback will be called.
         *
         * @name Phaser.Tilemaps.Tile#collisionCallbackContext
         * @type {object}
         * @since 3.0.0
         */
        this.collisionCallbackContext = this;

        /**
         * The tint to apply to this tile. Note: tint is currently a single color value instead of
         * the 4 corner tint component on other GameObjects.
         *
         * @name Phaser.Tilemaps.Tile#tint
         * @type {number}
         * @default
         * @since 3.0.0
         */
        this.tint = 0xffffff;

        /**
         * An empty object where physics-engine specific information (e.g. bodies) may be stored.
         *
         * @name Phaser.Tilemaps.Tile#physics
         * @type {object}
         * @since 3.0.0
         */
        this.physics = {};
    },

    /**
     * Check if the given x and y world coordinates are within this Tile. This does not factor in
     * camera scroll, layer scale or layer position.
     *
     * @method Phaser.Tilemaps.Tile#containsPoint
     * @since 3.0.0
     *
     * @param {number} x - The x coordinate to test.
     * @param {number} y - The y coordinate to test.
     *
     * @return {boolean} True if the coordinates are within this Tile, otherwise false.
     */
    containsPoint: function (x, y)
    {
        return !(x < this.pixelX || y < this.pixelY || x > this.right || y > this.bottom);
    },

    /**
     * Copies the tile data & properties from the given tile to this tile. This copies everything
     * except for position and interesting faces.
     *
     * @method Phaser.Tilemaps.Tile#copy
     * @since 3.0.0
     *
     * @param {Phaser.Tilemaps.Tile} tile - The tile to copy from.
     *
     * @return {Phaser.Tilemaps.Tile} This Tile object.
     */
    copy: function (tile)
    {
        this.index = tile.index;
        this.alpha = tile.alpha;
        this.properties = tile.properties;
        this.visible = tile.visible;
        this.setFlip(tile.flipX, tile.flipY);
        this.tint = tile.tint;
        this.rotation = tile.rotation;
        this.collideUp = tile.collideUp;
        this.collideDown = tile.collideDown;
        this.collideLeft = tile.collideLeft;
        this.collideRight = tile.collideRight;
        this.collisionCallback = tile.collisionCallback;
        this.collisionCallbackContext = tile.collisionCallbackContext;

        return this;
    },

    /**
     * The collision group for this Tile, defined within the Tileset. This returns a reference to
     * the collision group stored within the Tileset, so any modification of the returned object
     * will impact all tiles that have the same index as this tile.
     *
     * @method Phaser.Tilemaps.Tile#getCollisionGroup
     * @since 3.0.0
     *
     * @return {?object} tileset
     */
    getCollisionGroup: function ()
    {
        return this.tileset ? this.tileset.getTileCollisionGroup(this.index) : null;
    },

    /**
     * The tile data for this Tile, defined within the Tileset. This typically contains Tiled
     * collision data, tile animations and terrain information. This returns a reference to the tile
     * data stored within the Tileset, so any modification of the returned object will impact all
     * tiles that have the same index as this tile.
     *
     * @method Phaser.Tilemaps.Tile#getTileData
     * @since 3.0.0
     *
     * @return {?object} tileset
     */
    getTileData: function ()
    {
        return this.tileset ? this.tileset.getTileData(this.index) : null;
    },

    /**
     * Gets the world X position of the left side of the tile, factoring in the layers position,
     * scale and scroll.
     *
     * @method Phaser.Tilemaps.Tile#getLeft
     * @since 3.0.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} [camera] - The Camera to use to perform the check.
     *
     * @return {number}
     */
    getLeft: function (camera)
    {
        var tilemapLayer = this.tilemapLayer;

        return (tilemapLayer) ? tilemapLayer.tileToWorldX(this.x, camera) : this.x * this.baseWidth;
    },

    /**
     * Gets the world X position of the right side of the tile, factoring in the layer's position,
     * scale and scroll.
     *
     * @method Phaser.Tilemaps.Tile#getRight
     * @since 3.0.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} [camera] - The Camera to use to perform the check.
     *
     * @return {number}
     */
    getRight: function (camera)
    {
        var tilemapLayer = this.tilemapLayer;

        return (tilemapLayer) ? this.getLeft(camera) + this.width * tilemapLayer.scaleX : this.getLeft(camera) + this.width;
    },

    /**
     * Gets the world Y position of the top side of the tile, factoring in the layer's position,
     * scale and scroll.
     *
     * @method Phaser.Tilemaps.Tile#getTop
     * @since 3.0.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} [camera] - The Camera to use to perform the check.
     *
     * @return {number}
     */
    getTop: function (camera)
    {
        var tilemapLayer = this.tilemapLayer;

        // Tiled places tiles on a grid of baseWidth x baseHeight. The origin for a tile in grid
        // units is the bottom left, so the y coordinate needs to be adjusted by the difference
        // between the base size and this tile's size.
        return tilemapLayer
            ? tilemapLayer.tileToWorldY(this.y, camera) - (this.height - this.baseHeight) * tilemapLayer.scaleY
            : this.y * this.baseHeight - (this.height - this.baseHeight);
    },

    /**
     * Gets the world Y position of the bottom side of the tile, factoring in the layer's position,
     * scale and scroll.

     * @method Phaser.Tilemaps.Tile#getBottom
     * @since 3.0.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} [camera] - The Camera to use to perform the check.
     *
     * @return {number}
     */
    getBottom: function (camera)
    {
        var tilemapLayer = this.tilemapLayer;
        return tilemapLayer
            ? this.getTop(camera) + this.height * tilemapLayer.scaleY
            : this.getTop(camera) + this.height;
    },


    /**
     * Gets the world rectangle bounding box for the tile, factoring in the layers position,
     * scale and scroll.
     *
     * @method Phaser.Tilemaps.Tile#getBounds
     * @since 3.0.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} [camera] - The Camera to use to perform the check.
     * @param {object} [output] - [description]
     *
     * @return {(Phaser.Geom.Rectangle|object)}
     */
    getBounds: function (camera, output)
    {
        if (output === undefined) { output = new Rectangle(); }

        output.x = this.getLeft();
        output.y = this.getTop();
        output.width = this.getRight() - output.x;
        output.height = this.getBottom() - output.y;

        return output;
    },

    /**
     * Gets the world X position of the center of the tile, factoring in the layer's position,
     * scale and scroll.
     *
     * @method Phaser.Tilemaps.Tile#getCenterX
     * @since 3.0.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} [camera] - The Camera to use to perform the check.
     *
     * @return {number}
     */
    getCenterX: function (camera)
    {
        return this.getLeft(camera) + this.width / 2;
    },

    /**
     * Gets the world Y position of the center of the tile, factoring in the layer's position,
     * scale and scroll.
     *
     * @method Phaser.Tilemaps.Tile#getCenterY
     * @since 3.0.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} [camera] - The Camera to use to perform the check.
     *
     * @return {number}
     */
    getCenterY: function (camera)
    {
        return this.getTop(camera) + this.height / 2;
    },

    /**
     * Clean up memory.
     *
     * @method Phaser.Tilemaps.Tile#destroy
     * @since 3.0.0
     */
    destroy: function ()
    {
        this.collisionCallback = undefined;
        this.collisionCallbackContext = undefined;
        this.properties = undefined;
    },

    /**
     * Check for intersection with this tile. This does not factor in camera scroll, layer scale or
     * layer position.
     *
     * @method Phaser.Tilemaps.Tile#intersects
     * @since 3.0.0
     *
     * @param {number} x - The x axis in pixels.
     * @param {number} y - The y axis in pixels.
     * @param {number} right - The right point.
     * @param {number} bottom - The bottom point.
     *
     * @return {boolean}
     */
    intersects: function (x, y, right, bottom)
    {
        return !(
            right <= this.pixelX || bottom <= this.pixelY ||
            x >= this.right || y >= this.bottom
        );
    },

    /**
     * Checks if the tile is interesting.
     *
     * @method Phaser.Tilemaps.Tile#isInteresting
     * @since 3.0.0
     *
     * @param {boolean} collides - If true, will consider the tile interesting if it collides on any side.
     * @param {boolean} faces - If true, will consider the tile interesting if it has an interesting face.
     *
     * @return {boolean} True if the Tile is interesting, otherwise false.
     */
    isInteresting: function (collides, faces)
    {
        if (collides && faces) { return (this.canCollide || this.hasInterestingFace); }
        else if (collides) { return this.collides; }
        else if (faces) { return this.hasInterestingFace; }
        return false;
    },

    /**
     * Reset collision status flags.
     *
     * @method Phaser.Tilemaps.Tile#resetCollision
     * @since 3.0.0
     *
     * @param {boolean} [recalculateFaces=true] - Whether or not to recalculate interesting faces for this tile and its neighbors.
     *
     * @return {Phaser.Tilemaps.Tile} This Tile object.
     */
    resetCollision: function (recalculateFaces)
    {
        if (recalculateFaces === undefined) { recalculateFaces = true; }

        this.collideLeft = false;
        this.collideRight = false;
        this.collideUp = false;
        this.collideDown = false;

        this.faceTop = false;
        this.faceBottom = false;
        this.faceLeft = false;
        this.faceRight = false;

        if (recalculateFaces)
        {
            var tilemapLayer = this.tilemapLayer;

            if (tilemapLayer)
            {
                this.tilemapLayer.calculateFacesAt(this.x, this.y);
            }
        }

        return this;
    },

    /**
     * Reset faces.
     *
     * @method Phaser.Tilemaps.Tile#resetFaces
     * @since 3.0.0
     *
     * @return {Phaser.Tilemaps.Tile} This Tile object.
     */
    resetFaces: function ()
    {
        this.faceTop = false;
        this.faceBottom = false;
        this.faceLeft = false;
        this.faceRight = false;

        return this;
    },

    /**
     * Sets the collision flags for each side of this tile and updates the interesting faces list.
     *
     * @method Phaser.Tilemaps.Tile#setCollision
     * @since 3.0.0
     *
     * @param {boolean} left - Indicating collide with any object on the left.
     * @param {boolean} [right] - Indicating collide with any object on the right.
     * @param {boolean} [up] - Indicating collide with any object on the top.
     * @param {boolean} [down] - Indicating collide with any object on the bottom.
     * @param {boolean} [recalculateFaces=true] - Whether or not to recalculate interesting faces
     * for this tile and its neighbors.
     *
     * @return {Phaser.Tilemaps.Tile} This Tile object.
     */
    setCollision: function (left, right, up, down, recalculateFaces)
    {
        if (right === undefined) { right = left; }
        if (up === undefined) { up = left; }
        if (down === undefined) { down = left; }
        if (recalculateFaces === undefined) { recalculateFaces = true; }

        this.collideLeft = left;
        this.collideRight = right;
        this.collideUp = up;
        this.collideDown = down;

        this.faceLeft = left;
        this.faceRight = right;
        this.faceTop = up;
        this.faceBottom = down;

        if (recalculateFaces)
        {
            var tilemapLayer = this.tilemapLayer;

            if (tilemapLayer)
            {
                this.tilemapLayer.calculateFacesAt(this.x, this.y);
            }
        }

        return this;
    },

    /**
     * Set a callback to be called when this tile is hit by an object. The callback must true for
     * collision processing to take place.
     *
     * @method Phaser.Tilemaps.Tile#setCollisionCallback
     * @since 3.0.0
     *
     * @param {function} callback - Callback function.
     * @param {object} context - Callback will be called within this context.
     *
     * @return {Phaser.Tilemaps.Tile} This Tile object.
     */
    setCollisionCallback: function (callback, context)
    {
        if (callback === null)
        {
            this.collisionCallback = undefined;
            this.collisionCallbackContext = undefined;
        }
        else
        {
            this.collisionCallback = callback;
            this.collisionCallbackContext = context;
        }

        return this;
    },

    /**
     * Sets the size of the tile and updates its pixelX and pixelY.
     *
     * @method Phaser.Tilemaps.Tile#setSize
     * @since 3.0.0
     *
     * @param {integer} tileWidth - The width of the tile in pixels.
     * @param {integer} tileHeight - The height of the tile in pixels.
     * @param {integer} baseWidth - The base width a tile in the map (in pixels).
     * @param {integer} baseHeight - The base height of the tile in pixels (in pixels).
     *
     * @return {Phaser.Tilemaps.Tile} This Tile object.
     */
    setSize: function (tileWidth, tileHeight, baseWidth, baseHeight)
    {
        if (tileWidth !== undefined) { this.width = tileWidth; }
        if (tileHeight !== undefined) { this.height = tileHeight; }
        if (baseWidth !== undefined) { this.baseWidth = baseWidth; }
        if (baseHeight !== undefined) { this.baseHeight = baseHeight; }

        this.updatePixelXY();

        return this;
    },

    /**
     * Used internally. Updates the tile's world XY position based on the current tile size.
     *
     * @method Phaser.Tilemaps.Tile#updatePixelXY
     * @since 3.0.0
     *
     * @return {Phaser.Tilemaps.Tile} This Tile object.
     */
    updatePixelXY: function ()
    {
        // Tiled places tiles on a grid of baseWidth x baseHeight. The origin for a tile is the
        // bottom left, while the Phaser renderer assumes the origin is the top left. The y
        // coordinate needs to be adjusted by the difference.
        this.pixelX = this.x * this.baseWidth;
        this.pixelY = this.y * this.baseHeight - (this.height - this.baseHeight);

        return this;
    },

    /**
     * True if this tile can collide on any of its faces or has a collision callback set.
     *
     * @name Phaser.Tilemaps.Tile#canCollide
     * @type {boolean}
     * @readonly
     * @since 3.0.0
     */
    canCollide: {
        get: function ()
        {
            return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown || this.collisionCallback);
        }
    },

    /**
     * True if this tile can collide on any of its faces.
     *
     * @name Phaser.Tilemaps.Tile#collides
     * @type {boolean}
     * @readonly
     * @since 3.0.0
     */
    collides: {
        get: function ()
        {
            return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown);
        }
    },

    /**
     * True if this tile has any interesting faces.
     *
     * @name Phaser.Tilemaps.Tile#hasInterestingFace
     * @type {boolean}
     * @readonly
     * @since 3.0.0
     */
    hasInterestingFace: {
        get: function ()
        {
            return (this.faceTop || this.faceBottom || this.faceLeft || this.faceRight);
        }
    },

    /**
     * The tileset that contains this Tile. This will only return null if accessed from a LayerData
     * instance before the tile is placed within a StaticTilemapLayer or DynamicTilemapLayer.
     *
     * @name Phaser.Tilemaps.Tile#tileset
     * @type {?Phaser.Tilemaps.Tileset}
     * @readonly
     * @since 3.0.0
     */
    tileset: {
        get: function ()
        {
            var tilemapLayer = this.tilemapLayer;
            return tilemapLayer ? tilemapLayer.tileset : null;
        }
    },

    /**
     * The tilemap layer that contains this Tile. This will only return null if accessed from a
     * LayerData instance before the tile is placed within a StaticTilemapLayer or
     * DynamicTilemapLayer.
     *
     * @name Phaser.Tilemaps.Tile#tilemapLayer
     * @type {?Phaser.Tilemaps.StaticTilemapLayer|Phaser.Tilemaps.DynamicTilemapLayer}
     * @readonly
     * @since 3.0.0
     */
    tilemapLayer: {
        get: function ()
        {
            return this.layer.tilemapLayer;
        }
    },

    /**
     * The tilemap that contains this Tile. This will only return null if accessed from a LayerData
     * instance before the tile is placed within a StaticTilemapLayer or DynamicTilemapLayer.
     *
     * @name Phaser.Tilemaps.Tile#tilemap
     * @type {?Phaser.Tilemaps.Tilemap}
     * @readonly
     * @since 3.0.0
     */
    tilemap: {
        get: function ()
        {
            var tilemapLayer = this.tilemapLayer;
            return tilemapLayer ? tilemapLayer.tilemap : null;
        }
    }

});

module.exports = Tile;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Internally used method to set the colliding state of a tile. This does not recalculate
 * interesting faces.
 *
 * @function Phaser.Tilemaps.Components.SetTileCollision
 * @private
 * @since 3.0.0
 *
 * @param {Phaser.Tilemaps.Tile} tile - The Tile to set the collision on.
 * @param {boolean} [collides=true] - Should the tile index collide or not?
 */
var SetTileCollision = function (tile, collides)
{
    if (collides)
    {
        tile.setCollision(true, true, true, true, false);
    }
    else
    {
        tile.resetCollision(false);
    }
};

module.exports = SetTileCollision;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);

/**
 * @classdesc
 * A MultiFile is a special kind of parent that contains two, or more, Files as children and looks after
 * the loading and processing of them all. It is commonly extended and used as a base class for file types such as AtlasJSON or BitmapFont.
 * 
 * You shouldn't create an instance of a MultiFile directly, but should extend it with your own class, setting a custom type and processing methods.
 *
 * @class MultiFile
 * @memberof Phaser.Loader
 * @constructor
 * @since 3.7.0
 *
 * @param {Phaser.Loader.LoaderPlugin} loader - The Loader that is going to load this File.
 * @param {string} type - The file type string for sorting within the Loader.
 * @param {string} key - The key of the file within the loader.
 * @param {Phaser.Loader.File[]} files - An array of Files that make-up this MultiFile.
 */
var MultiFile = new Class({

    initialize:

    function MultiFile (loader, type, key, files)
    {
        /**
         * A reference to the Loader that is going to load this file.
         *
         * @name Phaser.Loader.MultiFile#loader
         * @type {Phaser.Loader.LoaderPlugin}
         * @since 3.7.0
         */
        this.loader = loader;

        /**
         * The file type string for sorting within the Loader.
         *
         * @name Phaser.Loader.MultiFile#type
         * @type {string}
         * @since 3.7.0
         */
        this.type = type;

        /**
         * Unique cache key (unique within its file type)
         *
         * @name Phaser.Loader.MultiFile#key
         * @type {string}
         * @since 3.7.0
         */
        this.key = key;

        /**
         * Array of files that make up this MultiFile.
         *
         * @name Phaser.Loader.MultiFile#files
         * @type {Phaser.Loader.File[]}
         * @since 3.7.0
         */
        this.files = files;

        /**
         * The completion status of this MultiFile.
         *
         * @name Phaser.Loader.MultiFile#complete
         * @type {boolean}
         * @default false
         * @since 3.7.0
         */
        this.complete = false;

        /**
         * The number of files to load.
         *
         * @name Phaser.Loader.MultiFile#pending
         * @type {integer}
         * @since 3.7.0
         */

        this.pending = files.length;

        /**
         * The number of files that failed to load.
         *
         * @name Phaser.Loader.MultiFile#failed
         * @type {integer}
         * @default 0
         * @since 3.7.0
         */
        this.failed = 0;

        /**
         * A storage container for transient data that the loading files need.
         *
         * @name Phaser.Loader.MultiFile#config
         * @type {any}
         * @since 3.7.0
         */
        this.config = {};

        //  Link the files
        for (var i = 0; i < files.length; i++)
        {
            files[i].multiFile = this;
        }
    },

    /**
     * Checks if this MultiFile is ready to process its children or not.
     *
     * @method Phaser.Loader.MultiFile#isReadyToProcess
     * @since 3.7.0
     *
     * @return {boolean} `true` if all children of this MultiFile have loaded, otherwise `false`.
     */
    isReadyToProcess: function ()
    {
        return (this.pending === 0 && this.failed === 0 && !this.complete);
    },

    /**
     * Adds another child to this MultiFile, increases the pending count and resets the completion status.
     *
     * @method Phaser.Loader.MultiFile#addToMultiFile
     * @since 3.7.0
     *
     * @param {Phaser.Loader.File} files - The File to add to this MultiFile.
     *
     * @return {Phaser.Loader.MultiFile} This MultiFile instance.
     */
    addToMultiFile: function (file)
    {
        this.files.push(file);

        file.multiFile = this;

        this.pending++;

        this.complete = false;

        return this;
    },

    /**
     * Called by each File when it finishes loading.
     *
     * @method Phaser.Loader.MultiFile#onFileComplete
     * @since 3.7.0
     *
     * @param {Phaser.Loader.File} file - The File that has completed processing.
     */
    onFileComplete: function (file)
    {
        var index = this.files.indexOf(file);

        if (index !== -1)
        {
            this.pending--;
        }
    },

    /**
     * Called by each File that fails to load.
     *
     * @method Phaser.Loader.MultiFile#onFileFailed
     * @since 3.7.0
     *
     * @param {Phaser.Loader.File} file - The File that has failed to load.
     */
    onFileFailed: function (file)
    {
        var index = this.files.indexOf(file);

        if (index !== -1)
        {
            this.failed++;
        }
    }

});

module.exports = MultiFile;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var CONST = __webpack_require__(18);
var File = __webpack_require__(21);
var FileTypesManager = __webpack_require__(7);
var GetFastValue = __webpack_require__(2);
var IsPlainObject = __webpack_require__(8);

/**
 * @typedef {object} Phaser.Loader.FileTypes.ImageFrameConfig
 *
 * @property {integer} frameWidth - The width of the frame in pixels.
 * @property {integer} [frameHeight] - The height of the frame in pixels. Uses the `frameWidth` value if not provided.
 * @property {integer} [startFrame=0] - The first frame to start parsing from.
 * @property {integer} [endFrame] - The frame to stop parsing at. If not provided it will calculate the value based on the image and frame dimensions.
 * @property {integer} [margin=0] - The margin in the image. This is the space around the edge of the frames.
 * @property {integer} [spacing=0] - The spacing between each frame in the image.
 */

/**
 * @typedef {object} Phaser.Loader.FileTypes.ImageFileConfig
 *
 * @property {string} key - The key of the file. Must be unique within both the Loader and the Texture Manager.
 * @property {string} [url] - The absolute or relative URL to load the file from.
 * @property {string} [extension='png'] - The default file extension to use if no url is provided.
 * @property {string} [normalMap] - The filename of an associated normal map. It uses the same path and url to load as the image.
 * @property {Phaser.Loader.FileTypes.ImageFrameConfig} [frameConfig] - The frame configuration object. Only provided for, and used by, Sprite Sheets.
 * @property {XHRSettingsObject} [xhrSettings] - Extra XHR Settings specifically for this file.
 */

/**
 * @classdesc
 * A single Image File suitable for loading by the Loader.
 *
 * These are created when you use the Phaser.Loader.LoaderPlugin#image method and are not typically created directly.
 * 
 * For documentation about what all the arguments and configuration options mean please see Phaser.Loader.LoaderPlugin#image.
 *
 * @class ImageFile
 * @extends Phaser.Loader.File
 * @memberof Phaser.Loader.FileTypes
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Loader.LoaderPlugin} loader - A reference to the Loader that is responsible for this file.
 * @param {(string|Phaser.Loader.FileTypes.ImageFileConfig)} key - The key to use for this file, or a file configuration object.
 * @param {string|string[]} [url] - The absolute or relative URL to load this file from. If undefined or `null` it will be set to `<key>.png`, i.e. if `key` was "alien" then the URL will be "alien.png".
 * @param {XHRSettingsObject} [xhrSettings] - Extra XHR Settings specifically for this file.
 * @param {Phaser.Loader.FileTypes.ImageFrameConfig} [frameConfig] - The frame configuration object. Only provided for, and used by, Sprite Sheets.
 */
var ImageFile = new Class({

    Extends: File,

    initialize:

    function ImageFile (loader, key, url, xhrSettings, frameConfig)
    {
        var extension = 'png';
        var normalMapURL;

        if (IsPlainObject(key))
        {
            var config = key;

            key = GetFastValue(config, 'key');
            url = GetFastValue(config, 'url');
            normalMapURL = GetFastValue(config, 'normalMap');
            xhrSettings = GetFastValue(config, 'xhrSettings');
            extension = GetFastValue(config, 'extension', extension);
            frameConfig = GetFastValue(config, 'frameConfig');
        }

        if (Array.isArray(url))
        {
            normalMapURL = url[1];
            url = url[0];
        }

        var fileConfig = {
            type: 'image',
            cache: loader.textureManager,
            extension: extension,
            responseType: 'blob',
            key: key,
            url: url,
            xhrSettings: xhrSettings,
            config: frameConfig
        };

        File.call(this, loader, fileConfig);

        //  Do we have a normal map to load as well?
        if (normalMapURL)
        {
            var normalMap = new ImageFile(loader, this.key, normalMapURL, xhrSettings, frameConfig);

            normalMap.type = 'normalMap';

            this.setLink(normalMap);

            loader.addFile(normalMap);
        }
    },

    /**
     * Called automatically by Loader.nextFile.
     * This method controls what extra work this File does with its loaded data.
     *
     * @method Phaser.Loader.FileTypes.ImageFile#onProcess
     * @since 3.7.0
     */
    onProcess: function ()
    {
        this.state = CONST.FILE_PROCESSING;

        this.data = new Image();

        this.data.crossOrigin = this.crossOrigin;

        var _this = this;

        this.data.onload = function ()
        {
            File.revokeObjectURL(_this.data);

            _this.onProcessComplete();
        };

        this.data.onerror = function ()
        {
            File.revokeObjectURL(_this.data);

            _this.onProcessError();
        };

        File.createObjectURL(this.data, this.xhrLoader.response, 'image/png');
    },

    /**
     * Adds this file to its target cache upon successful loading and processing.
     *
     * @method Phaser.Loader.FileTypes.ImageFile#addToCache
     * @since 3.7.0
     */
    addToCache: function ()
    {
        var texture;
        var linkFile = this.linkFile;

        if (linkFile && linkFile.state === CONST.FILE_COMPLETE)
        {
            if (this.type === 'image')
            {
                texture = this.cache.addImage(this.key, this.data, linkFile.data);
            }
            else
            {
                texture = this.cache.addImage(linkFile.key, linkFile.data, this.data);
            }

            this.pendingDestroy(texture);

            linkFile.pendingDestroy(texture);
        }
        else if (!linkFile)
        {
            texture = this.cache.addImage(this.key, this.data);

            this.pendingDestroy(texture);
        }
    }

});

/**
 * Adds an Image, or array of Images, to the current load queue.
 *
 * You can call this method from within your Scene's `preload`, along with any other files you wish to load:
 * 
 * ```javascript
 * function preload ()
 * {
 *     this.load.image('logo', 'images/phaserLogo.png');
 * }
 * ```
 *
 * The file is **not** loaded right away. It is added to a queue ready to be loaded either when the loader starts,
 * or if it's already running, when the next free load slot becomes available. This happens automatically if you
 * are calling this from within the Scene's `preload` method, or a related callback. Because the file is queued
 * it means you cannot use the file immediately after calling this method, but must wait for the file to complete.
 * The typical flow for a Phaser Scene is that you load assets in the Scene's `preload` method and then when the
 * Scene's `create` method is called you are guaranteed that all of those assets are ready for use and have been
 * loaded.
 * 
 * Phaser can load all common image types: png, jpg, gif and any other format the browser can natively handle.
 * If you try to load an animated gif only the first frame will be rendered. Browsers do not natively support playback
 * of animated gifs to Canvas elements.
 *
 * The key must be a unique String. It is used to add the file to the global Texture Manager upon a successful load.
 * The key should be unique both in terms of files being loaded and files already present in the Texture Manager.
 * Loading a file using a key that is already taken will result in a warning. If you wish to replace an existing file
 * then remove it from the Texture Manager first, before loading a new one.
 *
 * Instead of passing arguments you can pass a configuration object, such as:
 * 
 * ```javascript
 * this.load.image({
 *     key: 'logo',
 *     url: 'images/AtariLogo.png'
 * });
 * ```
 *
 * See the documentation for `Phaser.Loader.FileTypes.ImageFileConfig` for more details.
 *
 * Once the file has finished loading you can use it as a texture for a Game Object by referencing its key:
 * 
 * ```javascript
 * this.load.image('logo', 'images/AtariLogo.png');
 * // and later in your game ...
 * this.add.image(x, y, 'logo');
 * ```
 *
 * If you have specified a prefix in the loader, via `Loader.setPrefix` then this value will be prepended to this files
 * key. For example, if the prefix was `MENU.` and the key was `Background` the final key will be `MENU.Background` and
 * this is what you would use to retrieve the image from the Texture Manager.
 *
 * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
 *
 * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
 * and no URL is given then the Loader will set the URL to be "alien.png". It will always add `.png` as the extension, although
 * this can be overridden if using an object instead of method arguments. If you do not desire this action then provide a URL.
 *
 * Phaser also supports the automatic loading of associated normal maps. If you have a normal map to go with this image,
 * then you can specify it by providing an array as the `url` where the second element is the normal map:
 * 
 * ```javascript
 * this.load.image('logo', [ 'images/AtariLogo.png', 'images/AtariLogo-n.png' ]);
 * ```
 *
 * Or, if you are using a config object use the `normalMap` property:
 * 
 * ```javascript
 * this.load.image({
 *     key: 'logo',
 *     url: 'images/AtariLogo.png',
 *     normalMap: 'images/AtariLogo-n.png'
 * });
 * ```
 *
 * The normal map file is subject to the same conditions as the image file with regard to the path, baseURL, CORs and XHR Settings.
 * Normal maps are a WebGL only feature.
 *
 * Note: The ability to load this type of file will only be available if the Image File type has been built into Phaser.
 * It is available in the default build but can be excluded from custom builds.
 *
 * @method Phaser.Loader.LoaderPlugin#image
 * @fires Phaser.Loader.LoaderPlugin#addFileEvent
 * @since 3.0.0
 *
 * @param {(string|Phaser.Loader.FileTypes.ImageFileConfig|Phaser.Loader.FileTypes.ImageFileConfig[])} key - The key to use for this file, or a file configuration object, or array of them.
 * @param {string|string[]} [url] - The absolute or relative URL to load this file from. If undefined or `null` it will be set to `<key>.png`, i.e. if `key` was "alien" then the URL will be "alien.png".
 * @param {XHRSettingsObject} [xhrSettings] - An XHR Settings configuration object. Used in replacement of the Loaders default XHR Settings.
 *
 * @return {Phaser.Loader.LoaderPlugin} The Loader instance.
 */
FileTypesManager.register('image', function (key, url, xhrSettings)
{
    if (Array.isArray(key))
    {
        for (var i = 0; i < key.length; i++)
        {
            //  If it's an array it has to be an array of Objects, so we get everything out of the 'key' object
            this.addFile(new ImageFile(this, key[i]));
        }
    }
    else
    {
        this.addFile(new ImageFile(this, key, url, xhrSettings));
    }

    return this;
});

module.exports = ImageFile;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var Contains = __webpack_require__(69);
var GetPoint = __webpack_require__(278);
var GetPoints = __webpack_require__(277);
var Line = __webpack_require__(54);
var Random = __webpack_require__(184);

/**
 * @classdesc
 * A triangle is a plane created by connecting three points.
 * The first two arguments specify the first point, the middle two arguments
 * specify the second point, and the last two arguments specify the third point.
 *
 * @class Triangle
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x1=0] - `x` coordinate of the first point.
 * @param {number} [y1=0] - `y` coordinate of the first point.
 * @param {number} [x2=0] - `x` coordinate of the second point.
 * @param {number} [y2=0] - `y` coordinate of the second point.
 * @param {number} [x3=0] - `x` coordinate of the third point.
 * @param {number} [y3=0] - `y` coordinate of the third point.
 */
var Triangle = new Class({

    initialize:

    function Triangle (x1, y1, x2, y2, x3, y3)
    {
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }
        if (x3 === undefined) { x3 = 0; }
        if (y3 === undefined) { y3 = 0; }

        /**
         * `x` coordinate of the first point.
         *
         * @name Phaser.Geom.Triangle#x1
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x1 = x1;

        /**
         * `y` coordinate of the first point.
         *
         * @name Phaser.Geom.Triangle#y1
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y1 = y1;

        /**
         * `x` coordinate of the second point.
         *
         * @name Phaser.Geom.Triangle#x2
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x2 = x2;

        /**
         * `y` coordinate of the second point.
         *
         * @name Phaser.Geom.Triangle#y2
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y2 = y2;

        /**
         * `x` coordinate of the third point.
         *
         * @name Phaser.Geom.Triangle#x3
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x3 = x3;

        /**
         * `y` coordinate of the third point.
         *
         * @name Phaser.Geom.Triangle#y3
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y3 = y3;
    },

    /**
     * Checks whether a given points lies within the triangle.
     *
     * @method Phaser.Geom.Triangle#contains
     * @since 3.0.0
     *
     * @param {number} x - The x coordinate of the point to check.
     * @param {number} y - The y coordinate of the point to check.
     *
     * @return {boolean} `true` if the coordinate pair is within the triangle, otherwise `false`.
     */
    contains: function (x, y)
    {
        return Contains(this, x, y);
    },

    /**
     * Returns a specific point  on the triangle.
     *
     * @method Phaser.Geom.Triangle#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [output,$return]
     *
     * @param {number} position - Position as float within `0` and `1`. `0` equals the first point.
     * @param {(Phaser.Geom.Point|object)} [output] - Optional Point, or point-like object, that the calculated point will be written to.
     *
     * @return {(Phaser.Geom.Point|object)} Calculated `Point` that represents the requested position. It is the same as `output` when this parameter has been given.
     */
    getPoint: function (position, output)
    {
        return GetPoint(this, position, output);
    },

    /**
     * Calculates a list of evenly distributed points on the triangle. It is either possible to pass an amount of points to be generated (`quantity`) or the distance between two points (`stepRate`).
     *
     * @method Phaser.Geom.Triangle#getPoints
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point[]} O - [output,$return]
     *
     * @param {integer} quantity - Number of points to be generated. Can be falsey when `stepRate` should be used. All points have the same distance along the triangle.
     * @param {number} [stepRate] - Distance between two points. Will only be used when `quantity` is falsey.
     * @param {(array|Phaser.Geom.Point[])} [output] - Optional Array for writing the calculated points into. Otherwise a new array will be created.
     *
     * @return {(array|Phaser.Geom.Point[])} Returns a list of calculated `Point` instances or the filled array passed as parameter `output`.
     */
    getPoints: function (quantity, stepRate, output)
    {
        return GetPoints(this, quantity, stepRate, output);
    },

    /**
     * Returns a random point along the triangle.
     *
     * @method Phaser.Geom.Triangle#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {Phaser.Geom.Point} [point] - Optional `Point` that should be modified. Otherwise a new one will be created.
     *
     * @return {Phaser.Geom.Point} Random `Point`. When parameter `point` has been provided it will be returned.
     */
    getRandomPoint: function (point)
    {
        return Random(this, point);
    },

    /**
     * Sets all three points of the triangle. Leaving out any coordinate sets it to be `0`.
     *
     * @method Phaser.Geom.Triangle#setTo
     * @since 3.0.0
     *
     * @param {number} [x1=0] - `x` coordinate of the first point.
     * @param {number} [y1=0] - `y` coordinate of the first point.
     * @param {number} [x2=0] - `x` coordinate of the second point.
     * @param {number} [y2=0] - `y` coordinate of the second point.
     * @param {number} [x3=0] - `x` coordinate of the third point.
     * @param {number} [y3=0] - `y` coordinate of the third point.
     *
     * @return {Phaser.Geom.Triangle} This Triangle object.
     */
    setTo: function (x1, y1, x2, y2, x3, y3)
    {
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }
        if (x3 === undefined) { x3 = 0; }
        if (y3 === undefined) { y3 = 0; }

        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;

        this.x3 = x3;
        this.y3 = y3;

        return this;
    },

    /**
     * Returns a Line object that corresponds to Line A of this Triangle.
     *
     * @method Phaser.Geom.Triangle#getLineA
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to line A of this Triangle.
     */
    getLineA: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.x1, this.y1, this.x2, this.y2);

        return line;
    },

    /**
     * Returns a Line object that corresponds to Line B of this Triangle.
     *
     * @method Phaser.Geom.Triangle#getLineB
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to line B of this Triangle.
     */
    getLineB: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.x2, this.y2, this.x3, this.y3);

        return line;
    },

    /**
     * Returns a Line object that corresponds to Line C of this Triangle.
     *
     * @method Phaser.Geom.Triangle#getLineC
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to line C of this Triangle.
     */
    getLineC: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.x3, this.y3, this.x1, this.y1);

        return line;
    },

    /**
     * Left most X coordinate of the triangle. Setting it moves the triangle on the X axis accordingly.
     *
     * @name Phaser.Geom.Triangle#left
     * @type {number}
     * @since 3.0.0
     */
    left: {

        get: function ()
        {
            return Math.min(this.x1, this.x2, this.x3);
        },

        set: function (value)
        {
            var diff = 0;

            if (this.x1 <= this.x2 && this.x1 <= this.x3)
            {
                diff = this.x1 - value;
            }
            else if (this.x2 <= this.x1 && this.x2 <= this.x3)
            {
                diff = this.x2 - value;
            }
            else
            {
                diff = this.x3 - value;
            }

            this.x1 -= diff;
            this.x2 -= diff;
            this.x3 -= diff;
        }

    },

    /**
     * Right most X coordinate of the triangle. Setting it moves the triangle on the X axis accordingly.
     *
     * @name Phaser.Geom.Triangle#right
     * @type {number}
     * @since 3.0.0
     */
    right: {

        get: function ()
        {
            return Math.max(this.x1, this.x2, this.x3);
        },

        set: function (value)
        {
            var diff = 0;

            if (this.x1 >= this.x2 && this.x1 >= this.x3)
            {
                diff = this.x1 - value;
            }
            else if (this.x2 >= this.x1 && this.x2 >= this.x3)
            {
                diff = this.x2 - value;
            }
            else
            {
                diff = this.x3 - value;
            }

            this.x1 -= diff;
            this.x2 -= diff;
            this.x3 -= diff;
        }

    },

    /**
     * Top most Y coordinate of the triangle. Setting it moves the triangle on the Y axis accordingly.
     *
     * @name Phaser.Geom.Triangle#top
     * @type {number}
     * @since 3.0.0
     */
    top: {

        get: function ()
        {
            return Math.min(this.y1, this.y2, this.y3);
        },

        set: function (value)
        {
            var diff = 0;

            if (this.y1 <= this.y2 && this.y1 <= this.y3)
            {
                diff = this.y1 - value;
            }
            else if (this.y2 <= this.y1 && this.y2 <= this.y3)
            {
                diff = this.y2 - value;
            }
            else
            {
                diff = this.y3 - value;
            }

            this.y1 -= diff;
            this.y2 -= diff;
            this.y3 -= diff;
        }

    },

    /**
     * Bottom most Y coordinate of the triangle. Setting it moves the triangle on the Y axis accordingly.
     *
     * @name Phaser.Geom.Triangle#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {

        get: function ()
        {
            return Math.max(this.y1, this.y2, this.y3);
        },

        set: function (value)
        {
            var diff = 0;

            if (this.y1 >= this.y2 && this.y1 >= this.y3)
            {
                diff = this.y1 - value;
            }
            else if (this.y2 >= this.y1 && this.y2 >= this.y3)
            {
                diff = this.y2 - value;
            }
            else
            {
                diff = this.y3 - value;
            }

            this.y1 -= diff;
            this.y2 -= diff;
            this.y3 -= diff;
        }

    }

});

module.exports = Triangle;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Utils = __webpack_require__(10);

/**
 * Renders a stroke outline around the given Shape.
 *
 * @method Phaser.GameObjects.Shape#StrokePathWebGL
 * @since 3.13.0
 * @private
 *
 * @param {Phaser.Renderer.WebGL.WebGLPipeline} pipeline - The WebGL Pipeline used to render this Shape.
 * @param {Phaser.GameObjects.Shape} src - The Game Object shape being rendered in this call.
 * @param {number} alpha - The base alpha value.
 * @param {number} dx - The source displayOriginX.
 * @param {number} dy - The source displayOriginY.
 */
var StrokePathWebGL = function (pipeline, src, alpha, dx, dy)
{
    var strokeTint = pipeline.strokeTint;
    var strokeTintColor = Utils.getTintAppendFloatAlphaAndSwap(src.strokeColor, src.strokeAlpha * alpha);

    strokeTint.TL = strokeTintColor;
    strokeTint.TR = strokeTintColor;
    strokeTint.BL = strokeTintColor;
    strokeTint.BR = strokeTintColor;

    var path = src.pathData;
    var pathLength = path.length - 1;
    var lineWidth = src.lineWidth;
    var halfLineWidth = lineWidth / 2;

    var px1 = path[0] - dx;
    var py1 = path[1] - dy;

    if (!src.closePath)
    {
        pathLength -= 2;
    }

    for (var i = 2; i < pathLength; i += 2)
    {
        var px2 = path[i] - dx;
        var py2 = path[i + 1] - dy;

        pipeline.setTexture2D();

        pipeline.batchLine(
            px1,
            py1,
            px2,
            py2,
            halfLineWidth,
            halfLineWidth,
            lineWidth,
            i - 2,
            (src.closePath) ? (i === pathLength - 1) : false
        );

        px1 = px2;
        py1 = py2;
    }
};

module.exports = StrokePathWebGL;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var Components = __webpack_require__(14);
var GameObject = __webpack_require__(19);
var SpriteRender = __webpack_require__(829);

/**
 * @classdesc
 * A Sprite Game Object.
 *
 * A Sprite Game Object is used for the display of both static and animated images in your game.
 * Sprites can have input events and physics bodies. They can also be tweened, tinted, scrolled
 * and animated.
 *
 * The main difference between a Sprite and an Image Game Object is that you cannot animate Images.
 * As such, Sprites take a fraction longer to process and have a larger API footprint due to the Animation
 * Component. If you do not require animation then you can safely use Images to replace Sprites in all cases.
 *
 * @class Sprite
 * @extends Phaser.GameObjects.GameObject
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.0.0
 *
 * @extends Phaser.GameObjects.Components.Alpha
 * @extends Phaser.GameObjects.Components.BlendMode
 * @extends Phaser.GameObjects.Components.Depth
 * @extends Phaser.GameObjects.Components.Flip
 * @extends Phaser.GameObjects.Components.GetBounds
 * @extends Phaser.GameObjects.Components.Mask
 * @extends Phaser.GameObjects.Components.Origin
 * @extends Phaser.GameObjects.Components.Pipeline
 * @extends Phaser.GameObjects.Components.ScaleMode
 * @extends Phaser.GameObjects.Components.ScrollFactor
 * @extends Phaser.GameObjects.Components.Size
 * @extends Phaser.GameObjects.Components.TextureCrop
 * @extends Phaser.GameObjects.Components.Tint
 * @extends Phaser.GameObjects.Components.Transform
 * @extends Phaser.GameObjects.Components.Visible
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object belongs. A Game Object can only belong to one Scene at a time.
 * @param {number} x - The horizontal position of this Game Object in the world.
 * @param {number} y - The vertical position of this Game Object in the world.
 * @param {string} texture - The key of the Texture this Game Object will use to render with, as stored in the Texture Manager.
 * @param {(string|integer)} [frame] - An optional frame from the Texture this Game Object is rendering with.
 */
var Sprite = new Class({

    Extends: GameObject,

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.ScaleMode,
        Components.ScrollFactor,
        Components.Size,
        Components.TextureCrop,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        SpriteRender
    ],

    initialize:

    function Sprite (scene, x, y, texture, frame)
    {
        GameObject.call(this, scene, 'Sprite');

        /**
         * The internal crop data object, as used by `setCrop` and passed to the `Frame.setCropUVs` method.
         *
         * @name Phaser.GameObjects.Sprite#_crop
         * @type {object}
         * @private
         * @since 3.11.0
         */
        this._crop = this.resetCropObject();

        /**
         * The Animation Controller of this Sprite.
         *
         * @name Phaser.GameObjects.Sprite#anims
         * @type {Phaser.GameObjects.Components.Animation}
         * @since 3.0.0
         */
        this.anims = new Components.Animation(this);

        this.setTexture(texture, frame);
        this.setPosition(x, y);
        this.setSizeToFrame();
        this.setOriginFromFrame();
        this.initPipeline();
    },

    /**
     * Update this Sprite's animations.
     *
     * @method Phaser.GameObjects.Sprite#preUpdate
     * @protected
     * @since 3.0.0
     *
     * @param {number} time - The current timestamp.
     * @param {number} delta - The delta time, in ms, elapsed since the last frame.
     */
    preUpdate: function (time, delta)
    {
        this.anims.update(time, delta);
    },

    /**
     * Start playing the given animation.
     *
     * @method Phaser.GameObjects.Sprite#play
     * @since 3.0.0
     *
     * @param {string} key - The string-based key of the animation to play.
     * @param {boolean} [ignoreIfPlaying=false] - If an animation is already playing then ignore this call.
     * @param {integer} [startFrame=0] - Optionally start the animation playing from this frame index.
     *
     * @return {Phaser.GameObjects.Sprite} This Game Object.
     */
    play: function (key, ignoreIfPlaying, startFrame)
    {
        this.anims.play(key, ignoreIfPlaying, startFrame);

        return this;
    },

    /**
     * Build a JSON representation of this Sprite.
     *
     * @method Phaser.GameObjects.Sprite#toJSON
     * @since 3.0.0
     *
     * @return {JSONGameObject} A JSON representation of the Game Object.
     */
    toJSON: function ()
    {
        var data = Components.ToJSON(this);

        //  Extra Sprite data is added here

        return data;
    },

    /**
     * Handles the pre-destroy step for the Sprite, which removes the Animation component.
     *
     * @method Phaser.GameObjects.Sprite#preDestroy
     * @private
     * @since 3.14.0
     */
    preDestroy: function ()
    {
        this.anims.destroy();

        this.anims = undefined;
    }

});

module.exports = Sprite;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Tests if the start and end indexes are a safe range for the given array.
 * 
 * @function Phaser.Utils.Array.SafeRange
 * @since 3.4.0
 *
 * @param {array} array - The array to check.
 * @param {integer} startIndex - The start index.
 * @param {integer} endIndex - The end index.
 * @param {boolean} [throwError=true] - Throw an error if the range is out of bounds.
 *
 * @return {boolean} True if the range is safe, otherwise false.
 */
var SafeRange = function (array, startIndex, endIndex, throwError)
{
    var len = array.length;

    if (startIndex < 0 ||
        startIndex > len ||
        startIndex >= endIndex ||
        endIndex > len ||
        startIndex + endIndex > len)
    {
        if (throwError)
        {
            throw new Error('Range Error: Values outside acceptable range');
        }

        return false;
    }
    else
    {
        return true;
    }
};

module.exports = SafeRange;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Shallow Object Clone. Will not clone nested objects.
 *
 * @function Phaser.Utils.Objects.Clone
 * @since 3.0.0
 *
 * @param {object} obj - the object from which to clone
 *
 * @return {object} a new object with the same properties as the input obj
 */
var Clone = function (obj)
{
    var clone = {};

    for (var key in obj)
    {
        if (Array.isArray(obj[key]))
        {
            clone[key] = obj[key].slice(0);
        }
        else
        {
            clone[key] = obj[key];
        }
    }

    return clone;
};

module.exports = Clone;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

//  2.1.1 (Mar 17, 2016)

/*
ISC License

Copyright (c) 2016, Mapbox

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
 */



module.exports = earcut;

/*
vertices is a flat array of vertice coordinates like [x0,y0, x1,y1, x2,y2, ...].
holes is an array of hole indices if any (e.g. [5, 8] for a 12-vertice input would mean one hole with vertices 5–7 and another with 8–11).
dimensions is the number of coordinates per vertice in the input array (2 by default).
Each group of three vertice indices in the resulting array forms a triangle.
 */

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode) return triangles;

    var minX, minY, maxX, maxY, x, y, size;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and size are later used to transform coords into integers for z-order calculation
        size = Math.max(maxX - minX, maxY - minY);
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, size);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) return null;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && size) indexCurve(ear, minX, minY, size);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertice leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(ear, triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, size, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, size);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, size) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, size),
        maxZ = zOrder(maxTX, maxTY, minX, minY, size);

    // first look for points inside the triangle in increasing z-order
    var p = ear.nextZ;

    while (p && p.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.nextZ;
    }

    // then look for points in decreasing z-order
    p = ear.prevZ;

    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return p;
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, size) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, size);
                earcutLinked(c, triangles, dim, minX, minY, size);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m.next;

    while (p !== stop) {
        if (hx >= p.x && p.x >= mx && hx !== p.x &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    }

    return m;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, size) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and size of the data bounding box
function zOrder(x, y, minX, minY, size) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) / size;
    y = 32767 * (y - minY) / size;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
           locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    if ((equals(p1, q1) && equals(p2, q2)) ||
        (equals(p1, q2) && equals(p2, q1))) return true;
    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&
           area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertice index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};

/***/ }),
/* 65 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Calculate the length of the given line.
 *
 * @function Phaser.Geom.Line.Length
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Line} line - The line to calculate the length of.
 *
 * @return {number} The length of the line.
 */
var Length = function (line)
{
    return Math.sqrt((line.x2 - line.x1) * (line.x2 - line.x1) + (line.y2 - line.y1) * (line.y2 - line.y1));
};

module.exports = Length;


/***/ }),
/* 66 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Phaser Blend Modes.
 * 
 * @name Phaser.BlendModes
 * @enum {integer}
 * @memberof Phaser
 * @readonly
 * @since 3.0.0
 */

module.exports = {

    /**
     * Skips the Blend Mode check in the renderer.
     * 
     * @name Phaser.BlendModes.SKIP_CHECK
     */
    SKIP_CHECK: -1,

    /**
     * Normal blend mode.
     * 
     * @name Phaser.BlendModes.NORMAL
     */
    NORMAL: 0,

    /**
     * Add blend mode.
     * 
     * @name Phaser.BlendModes.ADD
     */
    ADD: 1,

    /**
     * Multiply blend mode.
     * 
     * @name Phaser.BlendModes.MULTIPLY
     */
    MULTIPLY: 2,

    /**
     * Screen blend mode.
     * 
     * @name Phaser.BlendModes.SCREEN
     */
    SCREEN: 3,

    /**
     * Overlay blend mode.
     * 
     * @name Phaser.BlendModes.OVERLAY
     */
    OVERLAY: 4,

    /**
     * Darken blend mode.
     * 
     * @name Phaser.BlendModes.DARKEN
     */
    DARKEN: 5,

    /**
     * Lighten blend mode.
     * 
     * @name Phaser.BlendModes.LIGHTEN
     */
    LIGHTEN: 6,

    /**
     * Color Dodge blend mode.
     * 
     * @name Phaser.BlendModes.COLOR_DODGE
     */
    COLOR_DODGE: 7,

    /**
     * Color Burn blend mode.
     * 
     * @name Phaser.BlendModes.COLOR_BURN
     */
    COLOR_BURN: 8,

    /**
     * Hard Light blend mode.
     * 
     * @name Phaser.BlendModes.HARD_LIGHT
     */
    HARD_LIGHT: 9,

    /**
     * Soft Light blend mode.
     * 
     * @name Phaser.BlendModes.SOFT_LIGHT
     */
    SOFT_LIGHT: 10,

    /**
     * Difference blend mode.
     * 
     * @name Phaser.BlendModes.DIFFERENCE
     */
    DIFFERENCE: 11,

    /**
     * Exclusion blend mode.
     * 
     * @name Phaser.BlendModes.EXCLUSION
     */
    EXCLUSION: 12,

    /**
     * Hue blend mode.
     * 
     * @name Phaser.BlendModes.HUE
     */
    HUE: 13,

    /**
     * Saturation blend mode.
     * 
     * @name Phaser.BlendModes.SATURATION
     */
    SATURATION: 14,

    /**
     * Color blend mode.
     * 
     * @name Phaser.BlendModes.COLOR
     */
    COLOR: 15,

    /**
     * Luminosity blend mode.
     * 
     * @name Phaser.BlendModes.LUMINOSITY
     */
    LUMINOSITY: 16

};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Body` module contains methods for creating and manipulating body models.
* A `Matter.Body` is a rigid body that can be simulated by a `Matter.Engine`.
* Factories for commonly used body configurations (such as rectangles, circles and other polygons) can be found in the module `Matter.Bodies`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).

* @class Body
*/

var Body = {};

module.exports = Body;

var Vertices = __webpack_require__(76);
var Vector = __webpack_require__(81);
var Sleeping = __webpack_require__(222);
var Common = __webpack_require__(33);
var Bounds = __webpack_require__(80);
var Axes = __webpack_require__(505);

(function() {

    Body._inertiaScale = 4;
    Body._nextCollidingGroupId = 1;
    Body._nextNonCollidingGroupId = -1;
    Body._nextCategory = 0x0001;

    /**
     * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * Vertices must be specified in clockwise order.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {body} body
     */
    Body.create = function(options) {
        var defaults = {
            id: Common.nextId(),
            type: 'body',
            label: 'Body',
            gameObject: null,
            parts: [],
            plugin: {},
            angle: 0,
            vertices: Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40'),
            position: { x: 0, y: 0 },
            force: { x: 0, y: 0 },
            torque: 0,
            positionImpulse: { x: 0, y: 0 },
            previousPositionImpulse: { x: 0, y: 0 },
            constraintImpulse: { x: 0, y: 0, angle: 0 },
            totalContacts: 0,
            speed: 0,
            angularSpeed: 0,
            velocity: { x: 0, y: 0 },
            angularVelocity: 0,
            isSensor: false,
            isStatic: false,
            isSleeping: false,
            ignoreGravity: false,
            ignorePointer: false,
            motion: 0,
            sleepThreshold: 60,
            density: 0.001,
            restitution: 0,
            friction: 0.1,
            frictionStatic: 0.5,
            frictionAir: 0.01,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            },
            slop: 0.05,
            timeScale: 1,
            render: {
                visible: true,
                opacity: 1,
                sprite: {
                    xScale: 1,
                    yScale: 1,
                    xOffset: 0,
                    yOffset: 0
                },
                lineWidth: 0
            },

            events: null,
            bounds: null,
            chamfer: null,
            circleRadius: 0,
            positionPrev: null,
            anglePrev: 0,
            parent: null,

            axes: null,
            area: 0,
            mass: 0,
            inertia: 0,

            _original: null
        };

        var body = Common.extend(defaults, options);

        _initProperties(body, options);

        return body;
    };

    /**
     * Returns the next unique group index for which bodies will collide.
     * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
     * See `body.collisionFilter` for more information.
     * @method nextGroup
     * @param {bool} [isNonColliding=false]
     * @return {Number} Unique group index
     */
    Body.nextGroup = function(isNonColliding) {
        if (isNonColliding)
            return Body._nextNonCollidingGroupId--;

        return Body._nextCollidingGroupId++;
    };

    /**
     * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
     * There are 32 available. See `body.collisionFilter` for more information.
     * @method nextCategory
     * @return {Number} Unique category bitfield
     */
    Body.nextCategory = function() {
        Body._nextCategory = Body._nextCategory << 1;
        return Body._nextCategory;
    };

    /**
     * Initialises body properties.
     * @method _initProperties
     * @private
     * @param {body} body
     * @param {} [options]
     */
    var _initProperties = function(body, options) {
        options = options || {};

        // init required properties (order is important)
        Body.set(body, {
            bounds: body.bounds || Bounds.create(body.vertices),
            positionPrev: body.positionPrev || Vector.clone(body.position),
            anglePrev: body.anglePrev || body.angle,
            vertices: body.vertices,
            parts: body.parts || [body],
            isStatic: body.isStatic,
            isSleeping: body.isSleeping,
            parent: body.parent || body
        });

        Vertices.rotate(body.vertices, body.angle, body.position);
        Axes.rotate(body.axes, body.angle);
        Bounds.update(body.bounds, body.vertices, body.velocity);

        // allow options to override the automatically calculated properties
        Body.set(body, {
            axes: options.axes || body.axes,
            area: options.area || body.area,
            mass: options.mass || body.mass,
            inertia: options.inertia || body.inertia
        });

        // render properties
        var defaultFillStyle = (body.isStatic ? '#2e2b44' : Common.choose(['#006BA6', '#0496FF', '#FFBC42', '#D81159', '#8F2D56'])),
            defaultStrokeStyle = '#000';
        body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
        body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
        body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
        body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
    };

    /**
     * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
     * Prefer to use the actual setter functions in performance critical situations.
     * @method set
     * @param {body} body
     * @param {} settings A property name (or map of properties and values) to set on the body.
     * @param {} value The value to set if `settings` is a single property name.
     */
    Body.set = function(body, settings, value) {
        var property;

        if (typeof settings === 'string') {
            property = settings;
            settings = {};
            settings[property] = value;
        }

        for (property in settings) {

            if (!settings.hasOwnProperty(property))
                continue;

            value = settings[property];
            switch (property) {

            case 'isStatic':
                Body.setStatic(body, value);
                break;
            case 'isSleeping':
                Sleeping.set(body, value);
                break;
            case 'mass':
                Body.setMass(body, value);
                break;
            case 'density':
                Body.setDensity(body, value);
                break;
            case 'inertia':
                Body.setInertia(body, value);
                break;
            case 'vertices':
                Body.setVertices(body, value);
                break;
            case 'position':
                Body.setPosition(body, value);
                break;
            case 'angle':
                Body.setAngle(body, value);
                break;
            case 'velocity':
                Body.setVelocity(body, value);
                break;
            case 'angularVelocity':
                Body.setAngularVelocity(body, value);
                break;
            case 'parts':
                Body.setParts(body, value);
                break;
            default:
                body[property] = value;

            }
        }
    };

    /**
     * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
     * @method setStatic
     * @param {body} body
     * @param {bool} isStatic
     */
    Body.setStatic = function(body, isStatic) {
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.isStatic = isStatic;

            if (isStatic) {
                part._original = {
                    restitution: part.restitution,
                    friction: part.friction,
                    mass: part.mass,
                    inertia: part.inertia,
                    density: part.density,
                    inverseMass: part.inverseMass,
                    inverseInertia: part.inverseInertia
                };

                part.restitution = 0;
                part.friction = 1;
                part.mass = part.inertia = part.density = Infinity;
                part.inverseMass = part.inverseInertia = 0;

                part.positionPrev.x = part.position.x;
                part.positionPrev.y = part.position.y;
                part.anglePrev = part.angle;
                part.angularVelocity = 0;
                part.speed = 0;
                part.angularSpeed = 0;
                part.motion = 0;
            } else if (part._original) {
                part.restitution = part._original.restitution;
                part.friction = part._original.friction;
                part.mass = part._original.mass;
                part.inertia = part._original.inertia;
                part.density = part._original.density;
                part.inverseMass = part._original.inverseMass;
                part.inverseInertia = part._original.inverseInertia;

                part._original = null;
            }
        }
    };

    /**
     * Sets the mass of the body. Inverse mass, density and inertia are automatically updated to reflect the change.
     * @method setMass
     * @param {body} body
     * @param {number} mass
     */
    Body.setMass = function(body, mass) {
        var moment = body.inertia / (body.mass / 6);
        body.inertia = moment * (mass / 6);
        body.inverseInertia = 1 / body.inertia;

        body.mass = mass;
        body.inverseMass = 1 / body.mass;
        body.density = body.mass / body.area;
    };

    /**
     * Sets the density of the body. Mass and inertia are automatically updated to reflect the change.
     * @method setDensity
     * @param {body} body
     * @param {number} density
     */
    Body.setDensity = function(body, density) {
        Body.setMass(body, density * body.area);
        body.density = density;
    };

    /**
     * Sets the moment of inertia (i.e. second moment of area) of the body of the body. 
     * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
     * @method setInertia
     * @param {body} body
     * @param {number} inertia
     */
    Body.setInertia = function(body, inertia) {
        body.inertia = inertia;
        body.inverseInertia = 1 / body.inertia;
    };

    /**
     * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
     * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
     * They are then automatically translated to world space based on `body.position`.
     *
     * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
     * Vertices must form a convex hull, concave hulls are not supported.
     *
     * @method setVertices
     * @param {body} body
     * @param {vector[]} vertices
     */
    Body.setVertices = function(body, vertices) {
        // change vertices
        if (vertices[0].body === body) {
            body.vertices = vertices;
        } else {
            body.vertices = Vertices.create(vertices, body);
        }

        // update properties
        body.axes = Axes.fromVertices(body.vertices);
        body.area = Vertices.area(body.vertices);
        Body.setMass(body, body.density * body.area);

        // orient vertices around the centre of mass at origin (0, 0)
        var centre = Vertices.centre(body.vertices);
        Vertices.translate(body.vertices, centre, -1);

        // update inertia while vertices are at origin (0, 0)
        Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));

        // update geometry
        Vertices.translate(body.vertices, body.position);
        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Sets the parts of the `body` and updates mass, inertia and centroid.
     * Each part will have its parent set to `body`.
     * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
     * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
     * @method setParts
     * @param {body} body
     * @param [body] parts
     * @param {bool} [autoHull=true]
     */
    Body.setParts = function(body, parts, autoHull) {
        var i;

        // add all the parts, ensuring that the first part is always the parent body
        parts = parts.slice(0);
        body.parts.length = 0;
        body.parts.push(body);
        body.parent = body;

        for (i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part !== body) {
                part.parent = body;
                body.parts.push(part);
            }
        }

        if (body.parts.length === 1)
            return;

        autoHull = typeof autoHull !== 'undefined' ? autoHull : true;

        // find the convex hull of all parts to set on the parent body
        if (autoHull) {
            var vertices = [];
            for (i = 0; i < parts.length; i++) {
                vertices = vertices.concat(parts[i].vertices);
            }

            Vertices.clockwiseSort(vertices);

            var hull = Vertices.hull(vertices),
                hullCentre = Vertices.centre(hull);

            Body.setVertices(body, hull);
            Vertices.translate(body.vertices, hullCentre);
        }

        // sum the properties of all compound parts of the parent body
        var total = Body._totalProperties(body);

        body.area = total.area;
        body.parent = body;
        body.position.x = total.centre.x;
        body.position.y = total.centre.y;
        body.positionPrev.x = total.centre.x;
        body.positionPrev.y = total.centre.y;

        Body.setMass(body, total.mass);
        Body.setInertia(body, total.inertia);
        Body.setPosition(body, total.centre);
    };

    /**
     * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
     * @method setPosition
     * @param {body} body
     * @param {vector} position
     */
    Body.setPosition = function(body, position) {
        var delta = Vector.sub(position, body.position);
        body.positionPrev.x += delta.x;
        body.positionPrev.y += delta.y;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.position.x += delta.x;
            part.position.y += delta.y;
            Vertices.translate(part.vertices, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
     * @method setAngle
     * @param {body} body
     * @param {number} angle
     */
    Body.setAngle = function(body, angle) {
        var delta = angle - body.angle;
        body.anglePrev += delta;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.angle += delta;
            Vertices.rotate(part.vertices, delta, body.position);
            Axes.rotate(part.axes, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
            if (i > 0) {
                Vector.rotateAbout(part.position, delta, body.position, part.position);
            }
        }
    };

    /**
     * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setVelocity
     * @param {body} body
     * @param {vector} velocity
     */
    Body.setVelocity = function(body, velocity) {
        body.positionPrev.x = body.position.x - velocity.x;
        body.positionPrev.y = body.position.y - velocity.y;
        body.velocity.x = velocity.x;
        body.velocity.y = velocity.y;
        body.speed = Vector.magnitude(body.velocity);
    };

    /**
     * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setAngularVelocity
     * @param {body} body
     * @param {number} velocity
     */
    Body.setAngularVelocity = function(body, velocity) {
        body.anglePrev = body.angle - velocity;
        body.angularVelocity = velocity;
        body.angularSpeed = Math.abs(body.angularVelocity);
    };

    /**
     * Moves a body by a given vector relative to its current position, without imparting any velocity.
     * @method translate
     * @param {body} body
     * @param {vector} translation
     */
    Body.translate = function(body, translation) {
        Body.setPosition(body, Vector.add(body.position, translation));
    };

    /**
     * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
     * @method rotate
     * @param {body} body
     * @param {number} rotation
     * @param {vector} [point]
     */
    Body.rotate = function(body, rotation, point) {
        if (!point) {
            Body.setAngle(body, body.angle + rotation);
        } else {
            var cos = Math.cos(rotation),
                sin = Math.sin(rotation),
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
            });

            Body.setAngle(body, body.angle + rotation);
        }
    };

    /**
     * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
     * @method scale
     * @param {body} body
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} [point]
     */
    Body.scale = function(body, scaleX, scaleY, point) {
        var totalArea = 0,
            totalInertia = 0;

        point = point || body.position;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            // scale vertices
            Vertices.scale(part.vertices, scaleX, scaleY, point);

            // update properties
            part.axes = Axes.fromVertices(part.vertices);
            part.area = Vertices.area(part.vertices);
            Body.setMass(part, body.density * part.area);

            // update inertia (requires vertices to be at origin)
            Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
            Body.setInertia(part, Body._inertiaScale * Vertices.inertia(part.vertices, part.mass));
            Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });

            if (i > 0) {
                totalArea += part.area;
                totalInertia += part.inertia;
            }

            // scale position
            part.position.x = point.x + (part.position.x - point.x) * scaleX;
            part.position.y = point.y + (part.position.y - point.y) * scaleY;

            // update bounds
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }

        // handle parent body
        if (body.parts.length > 1) {
            body.area = totalArea;

            if (!body.isStatic) {
                Body.setMass(body, body.density * totalArea);
                Body.setInertia(body, totalInertia);
            }
        }

        // handle circles
        if (body.circleRadius) { 
            if (scaleX === scaleY) {
                body.circleRadius *= scaleX;
            } else {
                // body is no longer a circle
                body.circleRadius = null;
            }
        }
    };

    /**
     * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
     * @method update
     * @param {body} body
     * @param {number} deltaTime
     * @param {number} timeScale
     * @param {number} correction
     */
    Body.update = function(body, deltaTime, timeScale, correction) {
        var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);

        // from the previous step
        var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale,
            velocityPrevX = body.position.x - body.positionPrev.x,
            velocityPrevY = body.position.y - body.positionPrev.y;

        // update velocity with Verlet integration
        body.velocity.x = (velocityPrevX * frictionAir * correction) + (body.force.x / body.mass) * deltaTimeSquared;
        body.velocity.y = (velocityPrevY * frictionAir * correction) + (body.force.y / body.mass) * deltaTimeSquared;

        body.positionPrev.x = body.position.x;
        body.positionPrev.y = body.position.y;
        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;

        // update angular velocity with Verlet integration
        body.angularVelocity = ((body.angle - body.anglePrev) * frictionAir * correction) + (body.torque / body.inertia) * deltaTimeSquared;
        body.anglePrev = body.angle;
        body.angle += body.angularVelocity;

        // track speed and acceleration
        body.speed = Vector.magnitude(body.velocity);
        body.angularSpeed = Math.abs(body.angularVelocity);

        // transform the body geometry
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            Vertices.translate(part.vertices, body.velocity);
            
            if (i > 0) {
                part.position.x += body.velocity.x;
                part.position.y += body.velocity.y;
            }

            if (body.angularVelocity !== 0) {
                Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                Axes.rotate(part.axes, body.angularVelocity);
                if (i > 0) {
                    Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                }
            }

            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Applies a force to a body from a given world-space position, including resulting torque.
     * @method applyForce
     * @param {body} body
     * @param {vector} position
     * @param {vector} force
     */
    Body.applyForce = function(body, position, force) {
        body.force.x += force.x;
        body.force.y += force.y;
        var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
        body.torque += offset.x * force.y - offset.y * force.x;
    };

    /**
     * Returns the sums of the properties of all compound parts of the parent body.
     * @method _totalProperties
     * @private
     * @param {body} body
     * @return {}
     */
    Body._totalProperties = function(body) {
        // from equations at:
        // https://ecourses.ou.edu/cgi-bin/ebook.cgi?doc=&topic=st&chap_sec=07.2&page=theory
        // http://output.to/sideway/default.asp?qno=121100087

        var properties = {
            mass: 0,
            area: 0,
            inertia: 0,
            centre: { x: 0, y: 0 }
        };

        // sum the properties of all compound parts of the parent body
        for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
            var part = body.parts[i],
                mass = part.mass !== Infinity ? part.mass : 1;

            properties.mass += mass;
            properties.area += part.area;
            properties.inertia += part.inertia;
            properties.centre = Vector.add(properties.centre, Vector.mult(part.position, mass));
        }

        properties.centre = Vector.div(properties.centre, properties.mass);

        return properties;
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when a body starts sleeping (where `this` is the body).
    *
    * @event sleepStart
    * @this {body} The body that has started sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a body ends sleeping (where `this` is the body).
    *
    * @event sleepEnd
    * @this {body} The body that has ended sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "body"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Body"
     */

    /**
     * An array of bodies that make up this body. 
     * The first body in the array must always be a self reference to the current body instance.
     * All bodies in the `parts` array together form a single rigid compound body.
     * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
     * Parts themselves should never be added to a `World`, only the parent body should be.
     * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
     *
     * @property parts
     * @type body[]
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * A self reference if the body is _not_ a part of another body.
     * Otherwise this is a reference to the body that this is a part of.
     * See `body.parts`.
     *
     * @property parent
     * @type body
     */

    /**
     * A `Number` specifying the angle of the body, in radians.
     *
     * @property angle
     * @type number
     * @default 0
     */

    /**
     * An array of `Vector` objects that specify the convex hull of the rigid body.
     * These should be provided about the origin `(0, 0)`. E.g.
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * When passed via `Body.create`, the vertices are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
     * The `Vector` objects are also augmented with additional properties required for efficient collision detection. 
     *
     * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
     * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
     *
     * @property vertices
     * @type vector[]
     */

    /**
     * A `Vector` that specifies the current world-space position of the body.
     *
     * @property position
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
     *
     * @property force
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
     *
     * @property torque
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
     *
     * @readOnly
     * @property speed
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
     *
     * @readOnly
     * @property angularSpeed
     * @type number
     * @default 0
     */

    /**
     * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property velocity
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property angularVelocity
     * @type number
     * @default 0
     */

    /**
     * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
     * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
     *
     * @property isStatic
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
     *
     * @property isSensor
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
     * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
     *
     * @property isSleeping
     * @type boolean
     * @default false
     */

    /**
     * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
     * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
     *
     * @readOnly
     * @property motion
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
     *
     * @property sleepThreshold
     * @type number
     * @default 60
     */

    /**
     * A `Number` that defines the density of the body, that is its mass per unit area.
     * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
     * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
     *
     * @property density
     * @type number
     * @default 0.001
     */

    /**
     * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
     * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
     *
     * @property mass
     * @type number
     */

    /**
     * A `Number` that defines the inverse mass of the body (`1 / mass`).
     * If you modify this value, you must also modify the `body.mass` property.
     *
     * @property inverseMass
     * @type number
     */

    /**
     * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
     * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
     * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
     *
     * @property inertia
     * @type number
     */

    /**
     * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
     * If you modify this value, you must also modify the `body.inertia` property.
     *
     * @property inverseInertia
     * @type number
     */

    /**
     * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur. 
     * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
     * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
     *
     *     Math.max(bodyA.restitution, bodyB.restitution)
     *
     * @property restitution
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means that the body may slide indefinitely.
     * A value of `1` means the body may come to a stop almost instantly after a force is applied.
     *
     * The effects of the value may be non-linear. 
     * High values may be unstable depending on the body.
     * The engine uses a Coulomb friction model including static and kinetic friction.
     * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
     *
     *     Math.min(bodyA.friction, bodyB.friction)
     *
     * @property friction
     * @type number
     * @default 0.1
     */

    /**
     * A `Number` that defines the static friction of the body (in the Coulomb friction model). 
     * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
     * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
     * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
     *
     * @property frictionStatic
     * @type number
     * @default 0.5
     */

    /**
     * A `Number` that defines the air friction of the body (air resistance). 
     * A value of `0` means the body will never slow as it moves through space.
     * The higher the value, the faster a body slows when moving through space.
     * The effects of the value are non-linear. 
     *
     * @property frictionAir
     * @type number
     * @default 0.01
     */

    /**
     * An `Object` that specifies the collision filtering properties of this body.
     *
     * Collisions between two bodies will obey the following rules:
     * - If the two bodies have the same non-zero value of `collisionFilter.group`,
     *   they will always collide if the value is positive, and they will never collide
     *   if the value is negative.
     * - If the two bodies have different values of `collisionFilter.group` or if one
     *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
     *
     * Each body belongs to a collision category, given by `collisionFilter.category`. This
     * value is used as a bit field and the category should have only one bit set, meaning that
     * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
     * different collision categories available.
     *
     * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
     * the categories it collides with (the value is the bitwise AND value of all these categories).
     *
     * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
     * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
     * are both true.
     *
     * @property collisionFilter
     * @type object
     */

    /**
     * An Integer `Number`, that specifies the collision group this body belongs to.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.group
     * @type object
     * @default 0
     */

    /**
     * A bit field that specifies the collision category this body belongs to.
     * The category value should have only one bit set, for example `0x0001`.
     * This means there are up to 32 unique collision categories available.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.category
     * @type object
     * @default 1
     */

    /**
     * A bit mask that specifies the collision categories this body may collide with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.mask
     * @type object
     * @default -1
     */

    /**
     * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
     * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
     * The default should generally suffice, although very large bodies may require larger values for stable stacking.
     *
     * @property slop
     * @type number
     * @default 0.05
     */

    /**
     * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
     *
     * @property timeScale
     * @type number
     * @default 1
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the body should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * Sets the opacity to use when rendering.
     *
     * @property render.opacity
     * @type number
     * @default 1
    */

    /**
     * An `Object` that defines the sprite properties to use when rendering, if any.
     *
     * @property render.sprite
     * @type object
     */

    /**
     * An `String` that defines the path to the image to use as the sprite texture, if any.
     *
     * @property render.sprite.texture
     * @type string
     */
     
    /**
     * A `Number` that defines the scaling in the x-axis for the sprite, if any.
     *
     * @property render.sprite.xScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that defines the scaling in the y-axis for the sprite, if any.
     *
     * @property render.sprite.yScale
     * @type number
     * @default 1
     */

     /**
      * A `Number` that defines the offset in the x-axis for the sprite (normalised by texture width).
      *
      * @property render.sprite.xOffset
      * @type number
      * @default 0
      */

     /**
      * A `Number` that defines the offset in the y-axis for the sprite (normalised by texture height).
      *
      * @property render.sprite.yOffset
      * @type number
      * @default 0
      */

    /**
     * A `Number` that defines the line width to use when rendering the body outline (if a sprite is not defined).
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 0
     */

    /**
     * A `String` that defines the fill style to use when rendering the body (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.fillStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the stroke style to use when rendering the body outline (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * An array of unique axis vectors (edge normals) used for collision detection.
     * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
     * They are constantly updated by `Body.update` during the simulation.
     *
     * @property axes
     * @type vector[]
     */
     
    /**
     * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
     *
     * @property area
     * @type string
     * @default 
     */

    /**
     * A `Bounds` object that defines the AABB region for the body.
     * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
     *
     * @property bounds
     * @type bounds
     */

})();


/***/ }),
/* 68 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Calculate the angle of the line in radians.
 *
 * @function Phaser.Geom.Line.Angle
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Line} line - The line to calculate the angle of.
 *
 * @return {number} The angle of the line, in radians.
 */
var Angle = function (line)
{
    return Math.atan2(line.y2 - line.y1, line.x2 - line.x1);
};

module.exports = Angle;


/***/ }),
/* 69 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

//  http://www.blackpawn.com/texts/pointinpoly/

/**
 * [description]
 *
 * @function Phaser.Geom.Triangle.Contains
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Triangle} triangle - [description]
 * @param {number} x - [description]
 * @param {number} y - [description]
 *
 * @return {boolean} [description]
 */
var Contains = function (triangle, x, y)
{
    var v0x = triangle.x3 - triangle.x1;
    var v0y = triangle.y3 - triangle.y1;

    var v1x = triangle.x2 - triangle.x1;
    var v1y = triangle.y2 - triangle.y1;

    var v2x = x - triangle.x1;
    var v2y = y - triangle.y1;

    var dot00 = (v0x * v0x) + (v0y * v0y);
    var dot01 = (v0x * v1x) + (v0y * v1y);
    var dot02 = (v0x * v2x) + (v0y * v2y);
    var dot11 = (v1x * v1x) + (v1y * v1y);
    var dot12 = (v1x * v2x) + (v1y * v2y);

    // Compute barycentric coordinates
    var b = ((dot00 * dot11) - (dot01 * dot01));
    var inv = (b === 0) ? 0 : (1 / b);
    var u = ((dot11 * dot02) - (dot01 * dot12)) * inv;
    var v = ((dot00 * dot12) - (dot01 * dot02)) * inv;

    return (u >= 0 && v >= 0 && (u + v < 1));
};

module.exports = Contains;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var FromPoints = __webpack_require__(173);
var Rectangle = __webpack_require__(9);
var Vector2 = __webpack_require__(3);

/**
 * @classdesc
 * A Base Curve class, which all other curve types extend.
 *
 * Based on the three.js Curve classes created by [zz85](http://www.lab4games.net/zz85/blog)
 *
 * @class Curve
 * @memberof Phaser.Curves
 * @constructor
 * @since 3.0.0
 *
 * @param {string} type - [description]
 */
var Curve = new Class({

    initialize:

    function Curve (type)
    {
        /**
         * String based identifier for the type of curve.
         *
         * @name Phaser.Curves.Curve#type
         * @type {string}
         * @since 3.0.0
         */
        this.type = type;

        /**
         * The default number of divisions within the curve.
         *
         * @name Phaser.Curves.Curve#defaultDivisions
         * @type {integer}
         * @default 5
         * @since 3.0.0
         */
        this.defaultDivisions = 5;

        /**
         * The quantity of arc length divisions within the curve.
         *
         * @name Phaser.Curves.Curve#arcLengthDivisions
         * @type {integer}
         * @default 100
         * @since 3.0.0
         */
        this.arcLengthDivisions = 100;

        /**
         * An array of cached arc length values.
         *
         * @name Phaser.Curves.Curve#cacheArcLengths
         * @type {number[]}
         * @default []
         * @since 3.0.0
         */
        this.cacheArcLengths = [];

        /**
         * Does the data of this curve need updating?
         *
         * @name Phaser.Curves.Curve#needsUpdate
         * @type {boolean}
         * @default true
         * @since 3.0.0
         */
        this.needsUpdate = true;

        /**
         * [description]
         *
         * @name Phaser.Curves.Curve#active
         * @type {boolean}
         * @default true
         * @since 3.0.0
         */
        this.active = true;

        /**
         * A temporary calculation Vector.
         *
         * @name Phaser.Curves.Curve#_tmpVec2A
         * @type {Phaser.Math.Vector2}
         * @private
         * @since 3.0.0
         */
        this._tmpVec2A = new Vector2();

        /**
         * A temporary calculation Vector.
         *
         * @name Phaser.Curves.Curve#_tmpVec2B
         * @type {Phaser.Math.Vector2}
         * @private
         * @since 3.0.0
         */
        this._tmpVec2B = new Vector2();
    },

    /**
     * Draws this curve on the given Graphics object.
     *
     * The curve is drawn using `Graphics.strokePoints` so will be drawn at whatever the present Graphics stroke color is.
     * The Graphics object is not cleared before the draw, so the curve will appear on-top of anything else already rendered to it.
     *
     * @method Phaser.Curves.Curve#draw
     * @since 3.0.0
     *
     * @generic {Phaser.GameObjects.Graphics} G - [graphics,$return]
     *
     * @param {Phaser.GameObjects.Graphics} graphics - The Graphics instance onto which this curve will be drawn.
     * @param {integer} [pointsTotal=32] - The resolution of the curve. The higher the value the smoother it will render, at the cost of rendering performance.
     *
     * @return {Phaser.GameObjects.Graphics} The Graphics object to which the curve was drawn.
     */
    draw: function (graphics, pointsTotal)
    {
        if (pointsTotal === undefined) { pointsTotal = 32; }

        //  So you can chain graphics calls
        return graphics.strokePoints(this.getPoints(pointsTotal));
    },
    
    /**
     * Returns a Rectangle where the position and dimensions match the bounds of this Curve.
     *
     * You can control the accuracy of the bounds. The value given is used to work out how many points
     * to plot across the curve. Higher values are more accurate at the cost of calculation speed.
     *
     * @method Phaser.Curves.Curve#getBounds
     * @since 3.0.0
     *
     * @param {Phaser.Geom.Rectangle} [out] - The Rectangle to store the bounds in. If falsey a new object will be created.
     * @param {integer} [accuracy=16] - The accuracy of the bounds calculations.
     *
     * @return {Phaser.Geom.Rectangle} A Rectangle object holding the bounds of this curve. If `out` was given it will be this object.
     */
    getBounds: function (out, accuracy)
    {
        if (!out) { out = new Rectangle(); }
        if (accuracy === undefined) { accuracy = 16; }

        var len = this.getLength();

        if (accuracy > len)
        {
            accuracy = len / 2;
        }

        //  The length of the curve in pixels
        //  So we'll have 1 spaced point per 'accuracy' pixels

        var spaced = Math.max(1, Math.round(len / accuracy));

        return FromPoints(this.getSpacedPoints(spaced), out);
    },

    /**
     * Returns an array of points, spaced out X distance pixels apart.
     * The smaller the distance, the larger the array will be.
     *
     * @method Phaser.Curves.Curve#getDistancePoints
     * @since 3.0.0
     *
     * @param {integer} distance - The distance, in pixels, between each point along the curve.
     *
     * @return {Phaser.Geom.Point[]} An Array of Point objects.
     */
    getDistancePoints: function (distance)
    {
        var len = this.getLength();

        var spaced = Math.max(1, len / distance);

        return this.getSpacedPoints(spaced);
    },

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getEndPoint
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} [out] - Optional Vector object to store the result in.
     *
     * @return {Phaser.Math.Vector2} Vector2 containing the coordinates of the curves end point.
     */
    getEndPoint: function (out)
    {
        if (out === undefined) { out = new Vector2(); }

        return this.getPointAt(1, out);
    },

    // Get total curve arc length

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getLength
     * @since 3.0.0
     *
     * @return {number} [description]
     */
    getLength: function ()
    {
        var lengths = this.getLengths();

        return lengths[lengths.length - 1];
    },

    // Get list of cumulative segment lengths

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getLengths
     * @since 3.0.0
     *
     * @param {integer} [divisions] - [description]
     *
     * @return {number[]} [description]
     */
    getLengths: function (divisions)
    {
        if (divisions === undefined) { divisions = this.arcLengthDivisions; }

        if ((this.cacheArcLengths.length === divisions + 1) && !this.needsUpdate)
        {
            return this.cacheArcLengths;
        }

        this.needsUpdate = false;

        var cache = [];
        var current;
        var last = this.getPoint(0, this._tmpVec2A);
        var sum = 0;

        cache.push(0);

        for (var p = 1; p <= divisions; p++)
        {
            current = this.getPoint(p / divisions, this._tmpVec2B);

            sum += current.distance(last);

            cache.push(sum);

            last.copy(current);
        }

        this.cacheArcLengths = cache;

        return cache; // { sums: cache, sum:sum }; Sum is in the last element.
    },

    // Get point at relative position in curve according to arc length

    // - u [0 .. 1]

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getPointAt
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [out,$return]
     *
     * @param {number} u - [description]
     * @param {Phaser.Math.Vector2} [out] - [description]
     *
     * @return {Phaser.Math.Vector2} [description]
     */
    getPointAt: function (u, out)
    {
        var t = this.getUtoTmapping(u);

        return this.getPoint(t, out);
    },

    // Get sequence of points using getPoint( t )

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getPoints
     * @since 3.0.0
     *
     * @param {integer} [divisions] - [description]
     *
     * @return {Phaser.Math.Vector2[]} [description]
     */
    getPoints: function (divisions)
    {
        if (divisions === undefined) { divisions = this.defaultDivisions; }

        var points = [];

        for (var d = 0; d <= divisions; d++)
        {
            points.push(this.getPoint(d / divisions));
        }

        return points;
    },

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [out,$return]
     *
     * @param {Phaser.Math.Vector2} [out] - [description]
     *
     * @return {Phaser.Math.Vector2} [description]
     */
    getRandomPoint: function (out)
    {
        if (out === undefined) { out = new Vector2(); }

        return this.getPoint(Math.random(), out);
    },

    // Get sequence of points using getPointAt( u )

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getSpacedPoints
     * @since 3.0.0
     *
     * @param {integer} [divisions] - [description]
     *
     * @return {Phaser.Math.Vector2[]} [description]
     */
    getSpacedPoints: function (divisions)
    {
        if (divisions === undefined) { divisions = this.defaultDivisions; }

        var points = [];

        for (var d = 0; d <= divisions; d++)
        {
            var t = this.getUtoTmapping(d / divisions, null, divisions);

            points.push(this.getPoint(t));
        }

        return points;
    },

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getStartPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [out,$return]
     *
     * @param {Phaser.Math.Vector2} [out] - [description]
     *
     * @return {Phaser.Math.Vector2} [description]
     */
    getStartPoint: function (out)
    {
        if (out === undefined) { out = new Vector2(); }

        return this.getPointAt(0, out);
    },

    // Returns a unit vector tangent at t
    // In case any sub curve does not implement its tangent derivation,
    // 2 points a small delta apart will be used to find its gradient
    // which seems to give a reasonable approximation

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getTangent
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [out,$return]
     *
     * @param {number} t - [description]
     * @param {Phaser.Math.Vector2} [out] - [description]
     *
     * @return {Phaser.Math.Vector2} Vector approximating the tangent line at the point t (delta +/- 0.0001)
     */
    getTangent: function (t, out)
    {
        if (out === undefined) { out = new Vector2(); }

        var delta = 0.0001;
        var t1 = t - delta;
        var t2 = t + delta;

        // Capping in case of danger

        if (t1 < 0)
        {
            t1 = 0;
        }

        if (t2 > 1)
        {
            t2 = 1;
        }

        this.getPoint(t1, this._tmpVec2A);
        this.getPoint(t2, out);

        return out.subtract(this._tmpVec2A).normalize();
    },

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getTangentAt
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [out,$return]
     *
     * @param {number} u - [description]
     * @param {Phaser.Math.Vector2} [out] - [description]
     *
     * @return {Phaser.Math.Vector2} [description]
     */
    getTangentAt: function (u, out)
    {
        var t = this.getUtoTmapping(u);

        return this.getTangent(t, out);
    },

    //  Given a distance in pixels, get a t to find p.
    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getTFromDistance
     * @since 3.0.0
     *
     * @param {integer} distance - [description]
     * @param {integer} [divisions] - [description]
     *
     * @return {number} [description]
     */
    getTFromDistance: function (distance, divisions)
    {
        if (distance <= 0)
        {
            return 0;
        }

        return this.getUtoTmapping(0, distance, divisions);
    },

    // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#getUtoTmapping
     * @since 3.0.0
     *
     * @param {number} u - [description]
     * @param {integer} distance - [description]
     * @param {integer} [divisions] - [description]
     *
     * @return {number} [description]
     */
    getUtoTmapping: function (u, distance, divisions)
    {
        var arcLengths = this.getLengths(divisions);

        var i = 0;
        var il = arcLengths.length;

        var targetArcLength; // The targeted u distance value to get

        if (distance)
        {
            //  Cannot overshoot the curve
            targetArcLength = Math.min(distance, arcLengths[il - 1]);
        }
        else
        {
            targetArcLength = u * arcLengths[il - 1];
        }

        // binary search for the index with largest value smaller than target u distance

        var low = 0;
        var high = il - 1;
        var comparison;

        while (low <= high)
        {
            i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

            comparison = arcLengths[i] - targetArcLength;

            if (comparison < 0)
            {
                low = i + 1;
            }
            else if (comparison > 0)
            {
                high = i - 1;
            }
            else
            {
                high = i;
                break;
            }
        }

        i = high;

        if (arcLengths[i] === targetArcLength)
        {
            return i / (il - 1);
        }

        // we could get finer grain at lengths, or use simple interpolation between two points

        var lengthBefore = arcLengths[i];
        var lengthAfter = arcLengths[i + 1];

        var segmentLength = lengthAfter - lengthBefore;

        // determine where we are between the 'before' and 'after' points

        var segmentFraction = (targetArcLength - lengthBefore) / segmentLength;

        // add that fractional amount to t

        return (i + segmentFraction) / (il - 1);
    },

    /**
     * [description]
     *
     * @method Phaser.Curves.Curve#updateArcLengths
     * @since 3.0.0
     */
    updateArcLengths: function ()
    {
        this.needsUpdate = true;

        this.getLengths();
    }

});

module.exports = Curve;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var Contains = __webpack_require__(40);
var GetPoint = __webpack_require__(405);
var GetPoints = __webpack_require__(403);
var Random = __webpack_require__(191);

/**
 * @classdesc
 * A Circle object.
 *
 * This is a geometry object, containing numerical values and related methods to inspect and modify them.
 * It is not a Game Object, in that you cannot add it to the display list, and it has no texture.
 * To render a Circle you should look at the capabilities of the Graphics class.
 *
 * @class Circle
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x=0] - The x position of the center of the circle.
 * @param {number} [y=0] - The y position of the center of the circle.
 * @param {number} [radius=0] - The radius of the circle.
 */
var Circle = new Class({

    initialize:

    function Circle (x, y, radius)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (radius === undefined) { radius = 0; }

        /**
         * The x position of the center of the circle.
         *
         * @name Phaser.Geom.Circle#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = x;

        /**
         * The y position of the center of the circle.
         *
         * @name Phaser.Geom.Circle#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = y;

        /**
         * The internal radius of the circle.
         *
         * @name Phaser.Geom.Circle#_radius
         * @type {number}
         * @private
         * @since 3.0.0
         */
        this._radius = radius;

        /**
         * The internal diameter of the circle.
         *
         * @name Phaser.Geom.Circle#_diameter
         * @type {number}
         * @private
         * @since 3.0.0
         */
        this._diameter = radius * 2;
    },

    /**
     * Check to see if the Circle contains the given x / y coordinates.
     *
     * @method Phaser.Geom.Circle#contains
     * @since 3.0.0
     *
     * @param {number} x - The x coordinate to check within the circle.
     * @param {number} y - The y coordinate to check within the circle.
     *
     * @return {boolean} True if the coordinates are within the circle, otherwise false.
     */
    contains: function (x, y)
    {
        return Contains(this, x, y);
    },

    /**
     * Returns a Point object containing the coordinates of a point on the circumference of the Circle
     * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
     * at 180 degrees around the circle.
     *
     * @method Phaser.Geom.Circle#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [out,$return]
     *
     * @param {number} position - A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the circle.
     * @param {(Phaser.Geom.Point|object)} [out] - An object to store the return values in. If not given a Point object will be created.
     *
     * @return {(Phaser.Geom.Point|object)} A Point, or point-like object, containing the coordinates of the point around the circle.
     */
    getPoint: function (position, point)
    {
        return GetPoint(this, position, point);
    },

    /**
     * Returns an array of Point objects containing the coordinates of the points around the circumference of the Circle,
     * based on the given quantity or stepRate values.
     *
     * @method Phaser.Geom.Circle#getPoints
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point[]} O - [output,$return]
     *
     * @param {integer} quantity - The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param {number} [stepRate] - Sets the quantity by getting the circumference of the circle and dividing it by the stepRate.
     * @param {(array|Phaser.Geom.Point[])} [output] - An array to insert the points in to. If not provided a new array will be created.
     *
     * @return {(array|Phaser.Geom.Point[])} An array of Point objects pertaining to the points around the circumference of the circle.
     */
    getPoints: function (quantity, stepRate, output)
    {
        return GetPoints(this, quantity, stepRate, output);
    },

    /**
     * Returns a uniformly distributed random point from anywhere within the Circle.
     *
     * @method Phaser.Geom.Circle#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {(Phaser.Geom.Point|object)} [point] - A Point or point-like object to set the random `x` and `y` values in.
     *
     * @return {(Phaser.Geom.Point|object)} A Point object with the random values set in the `x` and `y` properties.
     */
    getRandomPoint: function (point)
    {
        return Random(this, point);
    },

    /**
     * Sets the x, y and radius of this circle.
     *
     * @method Phaser.Geom.Circle#setTo
     * @since 3.0.0
     *
     * @param {number} [x=0] - The x position of the center of the circle.
     * @param {number} [y=0] - The y position of the center of the circle.
     * @param {number} [radius=0] - The radius of the circle.
     *
     * @return {Phaser.Geom.Circle} This Circle object.
     */
    setTo: function (x, y, radius)
    {
        this.x = x;
        this.y = y;
        this._radius = radius;
        this._diameter = radius * 2;

        return this;
    },

    /**
     * Sets this Circle to be empty with a radius of zero.
     * Does not change its position.
     *
     * @method Phaser.Geom.Circle#setEmpty
     * @since 3.0.0
     *
     * @return {Phaser.Geom.Circle} This Circle object.
     */
    setEmpty: function ()
    {
        this._radius = 0;
        this._diameter = 0;

        return this;
    },

    /**
     * Sets the position of this Circle.
     *
     * @method Phaser.Geom.Circle#setPosition
     * @since 3.0.0
     *
     * @param {number} [x=0] - The x position of the center of the circle.
     * @param {number} [y=0] - The y position of the center of the circle.
     *
     * @return {Phaser.Geom.Circle} This Circle object.
     */
    setPosition: function (x, y)
    {
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * Checks to see if the Circle is empty: has a radius of zero.
     *
     * @method Phaser.Geom.Circle#isEmpty
     * @since 3.0.0
     *
     * @return {boolean} True if the Circle is empty, otherwise false.
     */
    isEmpty: function ()
    {
        return (this._radius <= 0);
    },

    /**
     * The radius of the Circle.
     *
     * @name Phaser.Geom.Circle#radius
     * @type {number}
     * @since 3.0.0
     */
    radius: {

        get: function ()
        {
            return this._radius;
        },

        set: function (value)
        {
            this._radius = value;
            this._diameter = value * 2;
        }

    },

    /**
     * The diameter of the Circle.
     *
     * @name Phaser.Geom.Circle#diameter
     * @type {number}
     * @since 3.0.0
     */
    diameter: {

        get: function ()
        {
            return this._diameter;
        },

        set: function (value)
        {
            this._diameter = value;
            this._radius = value * 0.5;
        }

    },

    /**
     * The left position of the Circle.
     *
     * @name Phaser.Geom.Circle#left
     * @type {number}
     * @since 3.0.0
     */
    left: {

        get: function ()
        {
            return this.x - this._radius;
        },

        set: function (value)
        {
            this.x = value + this._radius;
        }

    },

    /**
     * The right position of the Circle.
     *
     * @name Phaser.Geom.Circle#right
     * @type {number}
     * @since 3.0.0
     */
    right: {

        get: function ()
        {
            return this.x + this._radius;
        },

        set: function (value)
        {
            this.x = value - this._radius;
        }

    },

    /**
     * The top position of the Circle.
     *
     * @name Phaser.Geom.Circle#top
     * @type {number}
     * @since 3.0.0
     */
    top: {

        get: function ()
        {
            return this.y - this._radius;
        },

        set: function (value)
        {
            this.y = value + this._radius;
        }

    },

    /**
     * The bottom position of the Circle.
     *
     * @name Phaser.Geom.Circle#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {

        get: function ()
        {
            return this.y + this._radius;
        },

        set: function (value)
        {
            this.y = value - this._radius;
        }

    }

});

module.exports = Circle;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Returns the center y coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetCenterY
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The center y coordinate of the bounds of the Game Object.
 */
var GetCenterY = function (gameObject)
{
    return gameObject.y - (gameObject.height * gameObject.originY) + (gameObject.height * 0.5);
};

module.exports = GetCenterY;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Positions the Game Object so that the center top of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetCenterY
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} y - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetCenterY = function (gameObject, y)
{
    var offsetY = gameObject.height * gameObject.originY;

    gameObject.y = (y + offsetY) - (gameObject.height * 0.5);

    return gameObject;
};

module.exports = SetCenterY;


/***/ }),
/* 74 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Positions the Game Object so that the center top of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetCenterX
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} x - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetCenterX = function (gameObject, x)
{
    var offsetX = gameObject.width * gameObject.originX;

    gameObject.x = (x + offsetX) - (gameObject.width * 0.5);

    return gameObject;
};

module.exports = SetCenterX;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Returns the center x coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetCenterX
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The center x coordinate of the bounds of the Game Object.
 */
var GetCenterX = function (gameObject)
{
    return gameObject.x - (gameObject.width * gameObject.originX) + (gameObject.width * 0.5);
};

module.exports = GetCenterX;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
* A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
* A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vertices
*/

var Vertices = {};

module.exports = Vertices;

var Vector = __webpack_require__(81);
var Common = __webpack_require__(33);

(function() {

    /**
     * Creates a new set of `Matter.Body` compatible vertices.
     * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
     * but with some additional references required for efficient collision detection routines.
     *
     * Vertices must be specified in clockwise order.
     *
     * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
     *
     * @method create
     * @param {vector[]} points
     * @param {body} body
     */
    Vertices.create = function(points, body) {
        var vertices = [];

        for (var i = 0; i < points.length; i++) {
            var point = points[i],
                vertex = {
                    x: point.x,
                    y: point.y,
                    index: i,
                    body: body,
                    isInternal: false,
                    contact: null
                };

            vertex.contact = {
                vertex: vertex,
                normalImpulse: 0,
                tangentImpulse: 0
            };

            vertices.push(vertex);
        }

        return vertices;
    };

    /**
     * Parses a string containing ordered x y pairs separated by spaces (and optionally commas), 
     * into a `Matter.Vertices` object for the given `Matter.Body`.
     * For parsing SVG paths, see `Svg.pathToVertices`.
     * @method fromPath
     * @param {string} path
     * @param {body} body
     * @return {vertices} vertices
     */
    Vertices.fromPath = function(path, body) {
        var pathPattern = /L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/ig,
            points = [];

        path.replace(pathPattern, function(match, x, y) {
            points.push({ x: parseFloat(x), y: parseFloat(y) });
        });

        return Vertices.create(points, body);
    };

    /**
     * Returns the centre (centroid) of the set of vertices.
     * @method centre
     * @param {vertices} vertices
     * @return {vector} The centre point
     */
    Vertices.centre = function(vertices) {
        var area = Vertices.area(vertices, true),
            centre = { x: 0, y: 0 },
            cross,
            temp,
            j;

        for (var i = 0; i < vertices.length; i++) {
            j = (i + 1) % vertices.length;
            cross = Vector.cross(vertices[i], vertices[j]);
            temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
            centre = Vector.add(centre, temp);
        }

        return Vector.div(centre, 6 * area);
    };

    /**
     * Returns the average (mean) of the set of vertices.
     * @method mean
     * @param {vertices} vertices
     * @return {vector} The average point
     */
    Vertices.mean = function(vertices) {
        var average = { x: 0, y: 0 };

        for (var i = 0; i < vertices.length; i++) {
            average.x += vertices[i].x;
            average.y += vertices[i].y;
        }

        return Vector.div(average, vertices.length);
    };

    /**
     * Returns the area of the set of vertices.
     * @method area
     * @param {vertices} vertices
     * @param {bool} signed
     * @return {number} The area
     */
    Vertices.area = function(vertices, signed) {
        var area = 0,
            j = vertices.length - 1;

        for (var i = 0; i < vertices.length; i++) {
            area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
            j = i;
        }

        if (signed)
            return area / 2;

        return Math.abs(area) / 2;
    };

    /**
     * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
     * @method inertia
     * @param {vertices} vertices
     * @param {number} mass
     * @return {number} The polygon's moment of inertia
     */
    Vertices.inertia = function(vertices, mass) {
        var numerator = 0,
            denominator = 0,
            v = vertices,
            cross,
            j;

        // find the polygon's moment of inertia, using second moment of area
        // from equations at http://www.physicsforums.com/showthread.php?t=25293
        for (var n = 0; n < v.length; n++) {
            j = (n + 1) % v.length;
            cross = Math.abs(Vector.cross(v[j], v[n]));
            numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
            denominator += cross;
        }

        return (mass / 6) * (numerator / denominator);
    };

    /**
     * Translates the set of vertices in-place.
     * @method translate
     * @param {vertices} vertices
     * @param {vector} vector
     * @param {number} scalar
     */
    Vertices.translate = function(vertices, vector, scalar) {
        var i;
        if (scalar) {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x * scalar;
                vertices[i].y += vector.y * scalar;
            }
        } else {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x;
                vertices[i].y += vector.y;
            }
        }

        return vertices;
    };

    /**
     * Rotates the set of vertices in-place.
     * @method rotate
     * @param {vertices} vertices
     * @param {number} angle
     * @param {vector} point
     */
    Vertices.rotate = function(vertices, angle, point) {
        if (angle === 0)
            return;

        var cos = Math.cos(angle),
            sin = Math.sin(angle);

        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                dx = vertice.x - point.x,
                dy = vertice.y - point.y;
                
            vertice.x = point.x + (dx * cos - dy * sin);
            vertice.y = point.y + (dx * sin + dy * cos);
        }

        return vertices;
    };

    /**
     * Returns `true` if the `point` is inside the set of `vertices`.
     * @method contains
     * @param {vertices} vertices
     * @param {vector} point
     * @return {boolean} True if the vertices contains point, otherwise false
     */
    Vertices.contains = function(vertices, point) {
        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                nextVertice = vertices[(i + 1) % vertices.length];
            if ((point.x - vertice.x) * (nextVertice.y - vertice.y) + (point.y - vertice.y) * (vertice.x - nextVertice.x) > 0) {
                return false;
            }
        }

        return true;
    };

    /**
     * Scales the vertices from a point (default is centre) in-place.
     * @method scale
     * @param {vertices} vertices
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     */
    Vertices.scale = function(vertices, scaleX, scaleY, point) {
        if (scaleX === 1 && scaleY === 1)
            return vertices;

        point = point || Vertices.centre(vertices);

        var vertex,
            delta;

        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            delta = Vector.sub(vertex, point);
            vertices[i].x = point.x + delta.x * scaleX;
            vertices[i].y = point.y + delta.y * scaleY;
        }

        return vertices;
    };

    /**
     * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
     * The radius parameter is a single number or an array to specify the radius for each vertex.
     * @method chamfer
     * @param {vertices} vertices
     * @param {number[]} radius
     * @param {number} quality
     * @param {number} qualityMin
     * @param {number} qualityMax
     */
    Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
        if (typeof radius === 'number') {
            radius = [radius];
        } else {
            radius = radius || [8];
        }

        // quality defaults to -1, which is auto
        quality = (typeof quality !== 'undefined') ? quality : -1;
        qualityMin = qualityMin || 2;
        qualityMax = qualityMax || 14;

        var newVertices = [];

        for (var i = 0; i < vertices.length; i++) {
            var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1],
                vertex = vertices[i],
                nextVertex = vertices[(i + 1) % vertices.length],
                currentRadius = radius[i < radius.length ? i : radius.length - 1];

            if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
            }

            var prevNormal = Vector.normalise({ 
                x: vertex.y - prevVertex.y, 
                y: prevVertex.x - vertex.x
            });

            var nextNormal = Vector.normalise({ 
                x: nextVertex.y - vertex.y, 
                y: vertex.x - nextVertex.x
            });

            var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)),
                radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius),
                midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)),
                scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));

            var precision = quality;

            if (quality === -1) {
                // automatically decide precision
                precision = Math.pow(currentRadius, 0.32) * 1.75;
            }

            precision = Common.clamp(precision, qualityMin, qualityMax);

            // use an even value for precision, more likely to reduce axes by using symmetry
            if (precision % 2 === 1)
                precision += 1;

            var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)),
                theta = alpha / precision;

            for (var j = 0; j < precision; j++) {
                newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
            }
        }

        return newVertices;
    };

    /**
     * Sorts the input vertices into clockwise order in place.
     * @method clockwiseSort
     * @param {vertices} vertices
     * @return {vertices} vertices
     */
    Vertices.clockwiseSort = function(vertices) {
        var centre = Vertices.mean(vertices);

        vertices.sort(function(vertexA, vertexB) {
            return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
        });

        return vertices;
    };

    /**
     * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
     * @method isConvex
     * @param {vertices} vertices
     * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
     */
    Vertices.isConvex = function(vertices) {
        // http://paulbourke.net/geometry/polygonmesh/
        // Copyright (c) Paul Bourke (use permitted)

        var flag = 0,
            n = vertices.length,
            i,
            j,
            k,
            z;

        if (n < 3)
            return null;

        for (i = 0; i < n; i++) {
            j = (i + 1) % n;
            k = (i + 2) % n;
            z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
            z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);

            if (z < 0) {
                flag |= 1;
            } else if (z > 0) {
                flag |= 2;
            }

            if (flag === 3) {
                return false;
            }
        }

        if (flag !== 0){
            return true;
        } else {
            return null;
        }
    };

    /**
     * Returns the convex hull of the input vertices as a new array of points.
     * @method hull
     * @param {vertices} vertices
     * @return [vertex] vertices
     */
    Vertices.hull = function(vertices) {
        // http://geomalgorithms.com/a10-_hull-1.html

        var upper = [],
            lower = [], 
            vertex,
            i;

        // sort vertices on x-axis (y-axis for ties)
        vertices = vertices.slice(0);
        vertices.sort(function(vertexA, vertexB) {
            var dx = vertexA.x - vertexB.x;
            return dx !== 0 ? dx : vertexA.y - vertexB.y;
        });

        // build lower hull
        for (i = 0; i < vertices.length; i += 1) {
            vertex = vertices[i];

            while (lower.length >= 2 
                   && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                lower.pop();
            }

            lower.push(vertex);
        }

        // build upper hull
        for (i = vertices.length - 1; i >= 0; i -= 1) {
            vertex = vertices[i];

            while (upper.length >= 2 
                   && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                upper.pop();
            }

            upper.push(vertex);
        }

        // concatenation of the lower and upper hulls gives the convex hull
        // omit last points because they are repeated at the beginning of the other list
        upper.pop();
        lower.pop();

        return upper.concat(lower);
    };

})();


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var GetFastValue = __webpack_require__(2);

/**
 * @classdesc
 * A class for representing data about a map. Maps are parsed from CSV, Tiled, etc. into this
 * format. A Tilemap object get a copy of this data and then unpacks the needed properties into
 * itself.
 *
 * @class MapData
 * @memberof Phaser.Tilemaps
 * @constructor
 * @since 3.0.0
 *
 * @param {object} [config] - [description]
 */
var MapData = new Class({

    initialize:

    function MapData (config)
    {
        if (config === undefined) { config = {}; }

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#name
         * @type {string}
         * @since 3.0.0
         */
        this.name = GetFastValue(config, 'name', 'map');

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#width
         * @type {number}
         * @since 3.0.0
         */
        this.width = GetFastValue(config, 'width', 0);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#height
         * @type {number}
         * @since 3.0.0
         */
        this.height = GetFastValue(config, 'height', 0);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#tileWidth
         * @type {number}
         * @since 3.0.0
         */
        this.tileWidth = GetFastValue(config, 'tileWidth', 0);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#tileHeight
         * @type {number}
         * @since 3.0.0
         */
        this.tileHeight = GetFastValue(config, 'tileHeight', 0);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#widthInPixels
         * @type {number}
         * @since 3.0.0
         */
        this.widthInPixels = GetFastValue(config, 'widthInPixels', this.width * this.tileWidth);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#heightInPixels
         * @type {number}
         * @since 3.0.0
         */
        this.heightInPixels = GetFastValue(config, 'heightInPixels', this.height * this.tileHeight);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#format
         * @type {integer}
         * @since 3.0.0
         */
        this.format = GetFastValue(config, 'format', null);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#orientation
         * @type {string}
         * @since 3.0.0
         */
        this.orientation = GetFastValue(config, 'orientation', 'orthogonal');

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#renderOrder
         * @type {string}
         * @since 3.12.0
         */
        this.renderOrder = GetFastValue(config, 'renderOrder', 'right-down');

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#version
         * @type {string}
         * @since 3.0.0
         */
        this.version = GetFastValue(config, 'version', '1');

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#properties
         * @type {object}
         * @since 3.0.0
         */
        this.properties = GetFastValue(config, 'properties', {});

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#layers
         * @type {array}
         * @since 3.0.0
         */
        this.layers = GetFastValue(config, 'layers', []);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#images
         * @type {array}
         * @since 3.0.0
         */
        this.images = GetFastValue(config, 'images', []);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#objects
         * @type {object}
         * @since 3.0.0
         */
        this.objects = GetFastValue(config, 'objects', {});

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#collision
         * @type {object}
         * @since 3.0.0
         */
        this.collision = GetFastValue(config, 'collision', {});

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#tilesets
         * @type {array}
         * @since 3.0.0
         */
        this.tilesets = GetFastValue(config, 'tilesets', []);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#imageCollections
         * @type {array}
         * @since 3.0.0
         */
        this.imageCollections = GetFastValue(config, 'imageCollections', []);

        /**
         * [description]
         * 
         * @name Phaser.Tilemaps.MapData#tiles
         * @type {array}
         * @since 3.0.0
         */
        this.tiles = GetFastValue(config, 'tiles', []);
    }

});

module.exports = MapData;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var GetFastValue = __webpack_require__(2);

/**
 * @classdesc
 * A class for representing data about about a layer in a map. Maps are parsed from CSV, Tiled,
 * etc. into this format. Tilemap, StaticTilemapLayer and DynamicTilemapLayer have a reference
 * to this data and use it to look up and perform operations on tiles.
 *
 * @class LayerData
 * @memberof Phaser.Tilemaps
 * @constructor
 * @since 3.0.0
 *
 * @param {object} [config] - [description]
 */
var LayerData = new Class({

    initialize:

    function LayerData (config)
    {
        if (config === undefined) { config = {}; }

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#name
         * @type {string}
         * @since 3.0.0
         */
        this.name = GetFastValue(config, 'name', 'layer');

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#x
         * @type {number}
         * @since 3.0.0
         */
        this.x = GetFastValue(config, 'x', 0);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#y
         * @type {number}
         * @since 3.0.0
         */
        this.y = GetFastValue(config, 'y', 0);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#width
         * @type {number}
         * @since 3.0.0
         */
        this.width = GetFastValue(config, 'width', 0);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#height
         * @type {number}
         * @since 3.0.0
         */
        this.height = GetFastValue(config, 'height', 0);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#tileWidth
         * @type {number}
         * @since 3.0.0
         */
        this.tileWidth = GetFastValue(config, 'tileWidth', 0);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#tileHeight
         * @type {number}
         * @since 3.0.0
         */
        this.tileHeight = GetFastValue(config, 'tileHeight', 0);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#baseTileWidth
         * @type {number}
         * @since 3.0.0
         */
        this.baseTileWidth = GetFastValue(config, 'baseTileWidth', this.tileWidth);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#baseTileHeight
         * @type {number}
         * @since 3.0.0
         */
        this.baseTileHeight = GetFastValue(config, 'baseTileHeight', this.tileHeight);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#widthInPixels
         * @type {number}
         * @since 3.0.0
         */
        this.widthInPixels = GetFastValue(config, 'widthInPixels', this.width * this.baseTileWidth);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#heightInPixels
         * @type {number}
         * @since 3.0.0
         */
        this.heightInPixels = GetFastValue(config, 'heightInPixels', this.height * this.baseTileHeight);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#alpha
         * @type {number}
         * @since 3.0.0
         */
        this.alpha = GetFastValue(config, 'alpha', 1);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#visible
         * @type {boolean}
         * @since 3.0.0
         */
        this.visible = GetFastValue(config, 'visible', true);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#properties
         * @type {object}
         * @since 3.0.0
         */
        this.properties = GetFastValue(config, 'properties', {});

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#indexes
         * @type {array}
         * @since 3.0.0
         */
        this.indexes = GetFastValue(config, 'indexes', []);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#collideIndexes
         * @type {array}
         * @since 3.0.0
         */
        this.collideIndexes = GetFastValue(config, 'collideIndexes', []);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#callbacks
         * @type {array}
         * @since 3.0.0
         */
        this.callbacks = GetFastValue(config, 'callbacks', []);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#bodies
         * @type {array}
         * @since 3.0.0
         */
        this.bodies = GetFastValue(config, 'bodies', []);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#data
         * @type {array}
         * @since 3.0.0
         */
        this.data = GetFastValue(config, 'data', []);

        /**
         * [description]
         *
         * @name Phaser.Tilemaps.LayerData#tilemapLayer
         * @type {(Phaser.Tilemaps.DynamicTilemapLayer|Phaser.Tilemaps.StaticTilemapLayer)}
         * @since 3.0.0
         */
        this.tilemapLayer = GetFastValue(config, 'tilemapLayer', null);
    }

});

module.exports = LayerData;


/***/ }),
/* 79 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Checks if the given tile coordinates are within the bounds of the layer.
 *
 * @function Phaser.Tilemaps.Components.IsInLayerBounds
 * @private
 * @since 3.0.0
 *
 * @param {integer} tileX - The x coordinate, in tiles, not pixels.
 * @param {integer} tileY - The y coordinate, in tiles, not pixels.
 * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
 * 
 * @return {boolean} `true` if the tile coordinates are within the bounds of the layer, otherwise `false`.
 */
var IsInLayerBounds = function (tileX, tileY, layer)
{
    return (tileX >= 0 && tileX < layer.width && tileY >= 0 && tileY < layer.height);
};

module.exports = IsInLayerBounds;


/***/ }),
/* 80 */
/***/ (function(module, exports) {

/**
* The `Matter.Bounds` module contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
*
* @class Bounds
*/

var Bounds = {};

module.exports = Bounds;

(function() {

    /**
     * Creates a new axis-aligned bounding box (AABB) for the given vertices.
     * @method create
     * @param {vertices} vertices
     * @return {bounds} A new bounds object
     */
    Bounds.create = function(vertices) {
        var bounds = { 
            min: { x: 0, y: 0 }, 
            max: { x: 0, y: 0 }
        };

        if (vertices)
            Bounds.update(bounds, vertices);
        
        return bounds;
    };

    /**
     * Updates bounds using the given vertices and extends the bounds given a velocity.
     * @method update
     * @param {bounds} bounds
     * @param {vertices} vertices
     * @param {vector} velocity
     */
    Bounds.update = function(bounds, vertices, velocity) {
        bounds.min.x = Infinity;
        bounds.max.x = -Infinity;
        bounds.min.y = Infinity;
        bounds.max.y = -Infinity;

        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
            if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
            if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
            if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
        }
        
        if (velocity) {
            if (velocity.x > 0) {
                bounds.max.x += velocity.x;
            } else {
                bounds.min.x += velocity.x;
            }
            
            if (velocity.y > 0) {
                bounds.max.y += velocity.y;
            } else {
                bounds.min.y += velocity.y;
            }
        }
    };

    /**
     * Returns true if the bounds contains the given point.
     * @method contains
     * @param {bounds} bounds
     * @param {vector} point
     * @return {boolean} True if the bounds contain the point, otherwise false
     */
    Bounds.contains = function(bounds, point) {
        return point.x >= bounds.min.x && point.x <= bounds.max.x 
               && point.y >= bounds.min.y && point.y <= bounds.max.y;
    };

    /**
     * Returns true if the two bounds intersect.
     * @method overlaps
     * @param {bounds} boundsA
     * @param {bounds} boundsB
     * @return {boolean} True if the bounds overlap, otherwise false
     */
    Bounds.overlaps = function(boundsA, boundsB) {
        return (boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x
                && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y);
    };

    /**
     * Translates the bounds by the given vector.
     * @method translate
     * @param {bounds} bounds
     * @param {vector} vector
     */
    Bounds.translate = function(bounds, vector) {
        bounds.min.x += vector.x;
        bounds.max.x += vector.x;
        bounds.min.y += vector.y;
        bounds.max.y += vector.y;
    };

    /**
     * Shifts the bounds to the given position.
     * @method shift
     * @param {bounds} bounds
     * @param {vector} position
     */
    Bounds.shift = function(bounds, position) {
        var deltaX = bounds.max.x - bounds.min.x,
            deltaY = bounds.max.y - bounds.min.y;
            
        bounds.min.x = position.x;
        bounds.max.x = position.x + deltaX;
        bounds.min.y = position.y;
        bounds.max.y = position.y + deltaY;
    };
    
})();


/***/ }),
/* 81 */
/***/ (function(module, exports) {

/**
* The `Matter.Vector` module contains methods for creating and manipulating vectors.
* Vectors are the basis of all the geometry related operations in the engine.
* A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vector
*/

// TODO: consider params for reusing vector objects

var Vector = {};

module.exports = Vector;

(function() {

    /**
     * Creates a new vector.
     * @method create
     * @param {number} x
     * @param {number} y
     * @return {vector} A new vector
     */
    Vector.create = function(x, y) {
        return { x: x || 0, y: y || 0 };
    };

    /**
     * Returns a new vector with `x` and `y` copied from the given `vector`.
     * @method clone
     * @param {vector} vector
     * @return {vector} A new cloned vector
     */
    Vector.clone = function(vector) {
        return { x: vector.x, y: vector.y };
    };

    /**
     * Returns the magnitude (length) of a vector.
     * @method magnitude
     * @param {vector} vector
     * @return {number} The magnitude of the vector
     */
    Vector.magnitude = function(vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    };

    /**
     * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
     * @method magnitudeSquared
     * @param {vector} vector
     * @return {number} The squared magnitude of the vector
     */
    Vector.magnitudeSquared = function(vector) {
        return (vector.x * vector.x) + (vector.y * vector.y);
    };

    /**
     * Rotates the vector about (0, 0) by specified angle.
     * @method rotate
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} [output]
     * @return {vector} The vector rotated about (0, 0)
     */
    Vector.rotate = function(vector, angle, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = vector.x * cos - vector.y * sin;
        output.y = vector.x * sin + vector.y * cos;
        output.x = x;
        return output;
    };

    /**
     * Rotates the vector about a specified point by specified angle.
     * @method rotateAbout
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} point
     * @param {vector} [output]
     * @return {vector} A new vector rotated about the point
     */
    Vector.rotateAbout = function(vector, angle, point, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
        output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
        output.x = x;
        return output;
    };

    /**
     * Normalises a vector (such that its magnitude is `1`).
     * @method normalise
     * @param {vector} vector
     * @return {vector} A new vector normalised
     */
    Vector.normalise = function(vector) {
        var magnitude = Vector.magnitude(vector);
        if (magnitude === 0)
            return { x: 0, y: 0 };
        return { x: vector.x / magnitude, y: vector.y / magnitude };
    };

    /**
     * Returns the dot-product of two vectors.
     * @method dot
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The dot product of the two vectors
     */
    Vector.dot = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    };

    /**
     * Returns the cross-product of two vectors.
     * @method cross
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The cross product of the two vectors
     */
    Vector.cross = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
    };

    /**
     * Returns the cross-product of three vectors.
     * @method cross3
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} vectorC
     * @return {number} The cross product of the three vectors
     */
    Vector.cross3 = function(vectorA, vectorB, vectorC) {
        return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
    };

    /**
     * Adds the two vectors.
     * @method add
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB added
     */
    Vector.add = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x + vectorB.x;
        output.y = vectorA.y + vectorB.y;
        return output;
    };

    /**
     * Subtracts the two vectors.
     * @method sub
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB subtracted
     */
    Vector.sub = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x - vectorB.x;
        output.y = vectorA.y - vectorB.y;
        return output;
    };

    /**
     * Multiplies a vector and a scalar.
     * @method mult
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector multiplied by scalar
     */
    Vector.mult = function(vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar };
    };

    /**
     * Divides a vector and a scalar.
     * @method div
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector divided by scalar
     */
    Vector.div = function(vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar };
    };

    /**
     * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
     * @method perp
     * @param {vector} vector
     * @param {bool} [negate=false]
     * @return {vector} The perpendicular vector
     */
    Vector.perp = function(vector, negate) {
        negate = negate === true ? -1 : 1;
        return { x: negate * -vector.y, y: negate * vector.x };
    };

    /**
     * Negates both components of a vector such that it points in the opposite direction.
     * @method neg
     * @param {vector} vector
     * @return {vector} The negated vector
     */
    Vector.neg = function(vector) {
        return { x: -vector.x, y: -vector.y };
    };

    /**
     * Returns the angle between the vector `vectorB - vectorA` and the x-axis in radians.
     * @method angle
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The angle in radians
     */
    Vector.angle = function(vectorA, vectorB) {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    };

    /**
     * Temporary vector pool (not thread-safe).
     * @property _temp
     * @type {vector[]}
     * @private
     */
    Vector._temp = [
        Vector.create(), Vector.create(), 
        Vector.create(), Vector.create(), 
        Vector.create(), Vector.create()
    ];

})();

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Utils = __webpack_require__(10);

/**
 * Renders a filled path for the given Shape.
 *
 * @method Phaser.GameObjects.Shape#FillPathWebGL
 * @since 3.13.0
 * @private
 *
 * @param {Phaser.Renderer.WebGL.WebGLPipeline} pipeline - The WebGL Pipeline used to render this Shape.
 * @param {Phaser.GameObjects.Components.TransformMatrix} calcMatrix - The transform matrix used to get the position values.
 * @param {Phaser.GameObjects.Shape} src - The Game Object shape being rendered in this call.
 * @param {number} alpha - The base alpha value.
 * @param {number} dx - The source displayOriginX.
 * @param {number} dy - The source displayOriginY.
 */
var FillPathWebGL = function (pipeline, calcMatrix, src, alpha, dx, dy)
{
    var fillTintColor = Utils.getTintAppendFloatAlphaAndSwap(src.fillColor, src.fillAlpha * alpha);

    var path = src.pathData;
    var pathIndexes = src.pathIndexes;

    for (var i = 0; i < pathIndexes.length; i += 3)
    {
        var p0 = pathIndexes[i] * 2;
        var p1 = pathIndexes[i + 1] * 2;
        var p2 = pathIndexes[i + 2] * 2;

        var x0 = path[p0 + 0] - dx;
        var y0 = path[p0 + 1] - dy;
        var x1 = path[p1 + 0] - dx;
        var y1 = path[p1 + 1] - dy;
        var x2 = path[p2 + 0] - dx;
        var y2 = path[p2 + 1] - dy;

        var tx0 = calcMatrix.getX(x0, y0);
        var ty0 = calcMatrix.getY(x0, y0);

        var tx1 = calcMatrix.getX(x1, y1);
        var ty1 = calcMatrix.getY(x1, y1);

        var tx2 = calcMatrix.getX(x2, y2);
        var ty2 = calcMatrix.getY(x2, y2);
    
        pipeline.setTexture2D();

        pipeline.batchTri(tx0, ty0, tx1, ty1, tx2, ty2, 0, 0, 1, 1, fillTintColor, fillTintColor, fillTintColor, pipeline.tintEffect);
    }
};

module.exports = FillPathWebGL;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var TWEEN_CONST = {

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.CREATED
     * @type {integer}
     * @since 3.0.0
     */
    CREATED: 0,

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.INIT
     * @type {integer}
     * @since 3.0.0
     */
    INIT: 1,

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.DELAY
     * @type {integer}
     * @since 3.0.0
     */
    DELAY: 2,

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.OFFSET_DELAY
     * @type {integer}
     * @since 3.0.0
     */
    OFFSET_DELAY: 3,

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.PENDING_RENDER
     * @type {integer}
     * @since 3.0.0
     */
    PENDING_RENDER: 4,

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.PLAYING_FORWARD
     * @type {integer}
     * @since 3.0.0
     */
    PLAYING_FORWARD: 5,

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.PLAYING_BACKWARD
     * @type {integer}
     * @since 3.0.0
     */
    PLAYING_BACKWARD: 6,

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.HOLD_DELAY
     * @type {integer}
     * @since 3.0.0
     */
    HOLD_DELAY: 7,

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.REPEAT_DELAY
     * @type {integer}
     * @since 3.0.0
     */
    REPEAT_DELAY: 8,

    /**
     * TweenData state.
     * 
     * @name Phaser.Tweens.COMPLETE
     * @type {integer}
     * @since 3.0.0
     */
    COMPLETE: 9,

    //  Tween specific (starts from 20 to cleanly allow extra TweenData consts in the future)

    /**
     * Tween state.
     * 
     * @name Phaser.Tweens.PENDING_ADD
     * @type {integer}
     * @since 3.0.0
     */
    PENDING_ADD: 20,

    /**
     * Tween state.
     * 
     * @name Phaser.Tweens.PAUSED
     * @type {integer}
     * @since 3.0.0
     */
    PAUSED: 21,

    /**
     * Tween state.
     * 
     * @name Phaser.Tweens.LOOP_DELAY
     * @type {integer}
     * @since 3.0.0
     */
    LOOP_DELAY: 22,

    /**
     * Tween state.
     * 
     * @name Phaser.Tweens.ACTIVE
     * @type {integer}
     * @since 3.0.0
     */
    ACTIVE: 23,

    /**
     * Tween state.
     * 
     * @name Phaser.Tweens.COMPLETE_DELAY
     * @type {integer}
     * @since 3.0.0
     */
    COMPLETE_DELAY: 24,

    /**
     * Tween state.
     * 
     * @name Phaser.Tweens.PENDING_REMOVE
     * @type {integer}
     * @since 3.0.0
     */
    PENDING_REMOVE: 25,

    /**
     * Tween state.
     * 
     * @name Phaser.Tweens.REMOVED
     * @type {integer}
     * @since 3.0.0
     */
    REMOVED: 26

};

module.exports = TWEEN_CONST;


/***/ }),
/* 84 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Retrieves the value of the given key from an object.
 *
 * @function Phaser.Tweens.Builders.GetBoolean
 * @since 3.0.0
 *
 * @param {object} source - The object to retrieve the value from.
 * @param {string} key - The key to look for in the `source` object.
 * @param {*} defaultValue - The default value to return if the `key` doesn't exist or if no `source` object is provided.
 *
 * @return {*} The retrieved value.
 */
var GetBoolean = function (source, key, defaultValue)
{
    if (!source)
    {
        return defaultValue;
    }
    else if (source.hasOwnProperty(key))
    {
        return source[key];
    }
    else
    {
        return defaultValue;
    }
};

module.exports = GetBoolean;


/***/ }),
/* 85 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * [description]
 *
 * @function Phaser.Utils.Objects.HasValue
 * @since 3.0.0
 *
 * @param {object} source - [description]
 * @param {string} key - [description]
 *
 * @return {boolean} [description]
 */
var HasValue = function (source, key)
{
    return (source.hasOwnProperty(key));
};

module.exports = HasValue;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var EaseMap = __webpack_require__(174);

/**
 * [description]
 *
 * @function Phaser.Tweens.Builders.GetEaseFunction
 * @since 3.0.0
 *
 * @param {(string|function)} ease - [description]
 * @param {array} easeParams - [description]
 *
 * @return {function} [description]
 */
var GetEaseFunction = function (ease, easeParams)
{
    if (typeof ease === 'string' && EaseMap.hasOwnProperty(ease))
    {
        if (easeParams)
        {
            var cloneParams = easeParams.slice(0);

            cloneParams.unshift(0);

            return function (v)
            {
                cloneParams[0] = v;

                return EaseMap[ease].apply(this, cloneParams);
            };
        }
        else
        {
            //  String based look-up
            return EaseMap[ease];
        }
    }
    else if (typeof ease === 'function')
    {
        //  Custom function
        return ease;
    }
    else if (Array.isArray(ease) && ease.length === 4)
    {
        //  Bezier function (TODO)
    }

    return EaseMap.Power0;
};

module.exports = GetEaseFunction;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var Components = __webpack_require__(14);
var GameObject = __webpack_require__(19);
var ImageRender = __webpack_require__(826);

/**
 * @classdesc
 * An Image Game Object.
 *
 * An Image is a light-weight Game Object useful for the display of static images in your game,
 * such as logos, backgrounds, scenery or other non-animated elements. Images can have input
 * events and physics bodies, or be tweened, tinted or scrolled. The main difference between an
 * Image and a Sprite is that you cannot animate an Image as they do not have the Animation component.
 *
 * @class Image
 * @extends Phaser.GameObjects.GameObject
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.0.0
 *
 * @extends Phaser.GameObjects.Components.Alpha
 * @extends Phaser.GameObjects.Components.BlendMode
 * @extends Phaser.GameObjects.Components.Depth
 * @extends Phaser.GameObjects.Components.Flip
 * @extends Phaser.GameObjects.Components.GetBounds
 * @extends Phaser.GameObjects.Components.Mask
 * @extends Phaser.GameObjects.Components.Origin
 * @extends Phaser.GameObjects.Components.Pipeline
 * @extends Phaser.GameObjects.Components.ScaleMode
 * @extends Phaser.GameObjects.Components.ScrollFactor
 * @extends Phaser.GameObjects.Components.Size
 * @extends Phaser.GameObjects.Components.TextureCrop
 * @extends Phaser.GameObjects.Components.Tint
 * @extends Phaser.GameObjects.Components.Transform
 * @extends Phaser.GameObjects.Components.Visible
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object belongs. A Game Object can only belong to one Scene at a time.
 * @param {number} x - The horizontal position of this Game Object in the world.
 * @param {number} y - The vertical position of this Game Object in the world.
 * @param {string} texture - The key of the Texture this Game Object will use to render with, as stored in the Texture Manager.
 * @param {(string|integer)} [frame] - An optional frame from the Texture this Game Object is rendering with.
 */
var Image = new Class({

    Extends: GameObject,

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.ScaleMode,
        Components.ScrollFactor,
        Components.Size,
        Components.TextureCrop,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        ImageRender
    ],

    initialize:

    function Image (scene, x, y, texture, frame)
    {
        GameObject.call(this, scene, 'Image');

        /**
         * The internal crop data object, as used by `setCrop` and passed to the `Frame.setCropUVs` method.
         *
         * @name Phaser.GameObjects.Image#_crop
         * @type {object}
         * @private
         * @since 3.11.0
         */
        this._crop = this.resetCropObject();

        this.setTexture(texture, frame);
        this.setPosition(x, y);
        this.setSizeToFrame();
        this.setOriginFromFrame();
        this.initPipeline();
    }

});

module.exports = Image;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Actions = __webpack_require__(417);
var Class = __webpack_require__(0);
var GetFastValue = __webpack_require__(2);
var GetValue = __webpack_require__(4);
var IsPlainObject = __webpack_require__(8);
var Range = __webpack_require__(312);
var Set = __webpack_require__(95);
var Sprite = __webpack_require__(61);

/**
 * @callback GroupCallback
 *
 * @param {Phaser.GameObjects.GameObject} item - A group member
 */

/**
 * @callback GroupMultipleCreateCallback
 *
 * @param {Phaser.GameObjects.GameObject[]} items - The newly created group members
 */

/**
 * @typedef {object} GroupConfig
 *
 * @property {?object} [classType=Sprite] - Sets {@link Phaser.GameObjects.Group#classType}.
 * @property {?boolean} [active=true] - Sets {@link Phaser.GameObjects.Group#active}.
 * @property {?number} [maxSize=-1] - Sets {@link Phaser.GameObjects.Group#maxSize}.
 * @property {?string} [defaultKey=null] - Sets {@link Phaser.GameObjects.Group#defaultKey}.
 * @property {?(string|integer)} [defaultFrame=null] - Sets {@link Phaser.GameObjects.Group#defaultFrame}.
 * @property {?boolean} [runChildUpdate=false] - Sets {@link Phaser.GameObjects.Group#runChildUpdate}.
 * @property {?GroupCallback} [createCallback=null] - Sets {@link Phaser.GameObjects.Group#createCallback}.
 * @property {?GroupCallback} [removeCallback=null] - Sets {@link Phaser.GameObjects.Group#removeCallback}.
 * @property {?GroupMultipleCreateCallback} [createMultipleCallback=null] - Sets {@link Phaser.GameObjects.Group#createMultipleCallback}.
 */

/**
 * @typedef {object} GroupCreateConfig
 *
 * The total number of objects created will be
 *
 *     key.length * frame.length * frameQuantity * (yoyo ? 2 : 1) * (1 + repeat)
 *
 * In the simplest case, 1 + `repeat` objects will be created.
 *
 * If `max` is positive, then the total created will not exceed `max`.
 *
 * `key` is required. {@link Phaser.GameObjects.Group#defaultKey} is not used.
 *
 * @property {?object} [classType] - The class of each new Game Object.
 * @property {string} [key] - The texture key of each new Game Object.
 * @property {?(string|integer)} [frame=null] - The texture frame of each new Game Object.
 * @property {?boolean} [visible=true] - The visible state of each new Game Object.
 * @property {?boolean} [active=true] - The active state of each new Game Object.
 * @property {?number} [repeat=0] - The number of times each `key` × `frame` combination will be *repeated* (after the first combination).
 * @property {?boolean} [randomKey=false] - Select a `key` at random.
 * @property {?boolean} [randomFrame=false] - Select a `frame` at random.
 * @property {?boolean} [yoyo=false] - Select keys and frames by moving forward then backward through `key` and `frame`.
 * @property {?number} [frameQuantity=1] - The number of times each `frame` should be combined with one `key`.
 * @property {?number} [max=0] - The maximum number of new Game Objects to create. 0 is no maximum.
 * @property {?object} [setXY]
 * @property {?number} [setXY.x=0] - The horizontal position of each new Game Object.
 * @property {?number} [setXY.y=0] - The vertical position of each new Game Object.
 * @property {?number} [setXY.stepX=0] - Increment each Game Object's horizontal position from the previous by this amount, starting from `setXY.x`.
 * @property {?number} [setXY.stepY=0] - Increment each Game Object's vertical position from the previous by this amount, starting from `setXY.y`.
 * @property {?object} [setRotation]
 * @property {?number} [setRotation.value=0] - Rotation of each new Game Object.
 * @property {?number} [setRotation.step=0] - Increment each Game Object's rotation from the previous by this amount, starting at `setRotation.value`.
 * @property {?object} [setScale]
 * @property {?number} [setScale.x=0] - The horizontal scale of each new Game Object.
 * @property {?number} [setScale.y=0] - The vertical scale of each new Game Object.
 * @property {?number} [setScale.stepX=0] - Increment each Game Object's horizontal scale from the previous by this amount, starting from `setScale.x`.
 * @property {?number} [setScale.stepY=0] - Increment each Game object's vertical scale from the previous by this amount, starting from `setScale.y`.
 * @property {?object} [setAlpha]
 * @property {?number} [setAlpha.value=0] - The alpha value of each new Game Object.
 * @property {?number} [setAlpha.step=0] - Increment each Game Object's alpha from the previous by this amount, starting from `setAlpha.value`.
 * @property {?*} [hitArea] - A geometric shape that defines the hit area for the Game Object.
 * @property {?HitAreaCallback} [hitAreaCallback] - A callback to be invoked when the Game Object is interacted with.
 * @property {?(false|GridAlignConfig)} [gridAlign=false] - Align the new Game Objects in a grid using these settings.
 *
 * @see Phaser.Actions.GridAlign
 * @see Phaser.Actions.SetAlpha
 * @see Phaser.Actions.SetHitArea
 * @see Phaser.Actions.SetRotation
 * @see Phaser.Actions.SetScale
 * @see Phaser.Actions.SetXY
 * @see Phaser.GameObjects.Group#createFromConfig
 * @see Phaser.Utils.Array.Range
 */

/**
 * @classdesc A Group is a way for you to create, manipulate, or recycle similar Game Objects.
 *
 * Group membership is non-exclusive. A Game Object can belong to several groups, one group, or none.
 *
 * Groups themselves aren't displayable, and can't be positioned, rotated, scaled, or hidden.
 *
 * @class Group
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.0.0
 * @param {Phaser.Scene} scene - The scene this group belongs to.
 * @param {(Phaser.GameObjects.GameObject[]|GroupConfig|GroupCreateConfig)} [children] - Game Objects to add to this group; or the `config` argument.
 * @param {GroupConfig|GroupCreateConfig} [config] - Settings for this group. If `key` is set, Phaser.GameObjects.Group#createMultiple is also called with these settings.
 *
 * @see Phaser.Physics.Arcade.Group
 * @see Phaser.Physics.Arcade.StaticGroup
 */
var Group = new Class({

    initialize:

    function Group (scene, children, config)
    {
        //  They can pass in any of the following as the first argument:

        //  1) A single child
        //  2) An array of children
        //  3) A config object
        //  4) An array of config objects

        //  Or they can pass in a child, or array of children AND a config object

        if (config)
        {
            //  config has been set, are the children an array?

            if (children && !Array.isArray(children))
            {
                children = [ children ];
            }
        }
        else if (Array.isArray(children))
        {
            //  No config, so let's check the children argument

            if (IsPlainObject(children[0]))
            {
                //  It's an array of plain config objects
                config = children;
                children = null;
            }
        }
        else if (IsPlainObject(children))
        {
            //  Children isn't an array. Is it a config object though?
            config = children;
            children = null;
        }

        /**
         * This scene this group belongs to.
         *
         * @name Phaser.GameObjects.Group#scene
         * @type {Phaser.Scene}
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * Members of this group.
         *
         * @name Phaser.GameObjects.Group#children
         * @type {Phaser.Structs.Set.<Phaser.GameObjects.GameObject>}
         * @since 3.0.0
         */
        this.children = new Set(children);

        /**
         * A flag identifying this object as a group.
         *
         * @name Phaser.GameObjects.Group#isParent
         * @type {boolean}
         * @default true
         * @since 3.0.0
         */
        this.isParent = true;

        /**
         * The class to create new group members from.
         *
         * @name Phaser.GameObjects.Group#classType
         * @type {object}
         * @since 3.0.0
         * @default Phaser.GameObjects.Sprite
         */
        this.classType = GetFastValue(config, 'classType', Sprite);

        /**
         * Whether this group runs its {@link Phaser.GameObjects.Group#preUpdate} method
         * (which may update any members).
         *
         * @name Phaser.GameObjects.Group#active
         * @type {boolean}
         * @since 3.0.0
         */
        this.active = GetFastValue(config, 'active', true);

        /**
         * The maximum size of this group, if used as a pool. -1 is no limit.
         *
         * @name Phaser.GameObjects.Group#maxSize
         * @type {integer}
         * @since 3.0.0
         * @default -1
         */
        this.maxSize = GetFastValue(config, 'maxSize', -1);

        /**
         * A default texture key to use when creating new group members.
         *
         * This is used in {@link Phaser.GameObjects.Group#create}
         * but not in {@link Phaser.GameObjects.Group#createMultiple}.
         *
         * @name Phaser.GameObjects.Group#defaultKey
         * @type {string}
         * @since 3.0.0
         */
        this.defaultKey = GetFastValue(config, 'defaultKey', null);

        /**
         * A default texture frame to use when creating new group members.
         *
         * @name Phaser.GameObjects.Group#defaultFrame
         * @type {(string|integer)}
         * @since 3.0.0
         */
        this.defaultFrame = GetFastValue(config, 'defaultFrame', null);

        /**
         * Whether to call the update method of any members.
         *
         * @name Phaser.GameObjects.Group#runChildUpdate
         * @type {boolean}
         * @default false
         * @since 3.0.0
         * @see Phaser.GameObjects.Group#preUpdate
         */
        this.runChildUpdate = GetFastValue(config, 'runChildUpdate', false);

        /**
         * A function to be called when adding or creating group members.
         *
         * @name Phaser.GameObjects.Group#createCallback
         * @type {?GroupCallback}
         * @since 3.0.0
         */
        this.createCallback = GetFastValue(config, 'createCallback', null);

        /**
         * A function to be called when removing group members.
         *
         * @name Phaser.GameObjects.Group#removeCallback
         * @type {?GroupCallback}
         * @since 3.0.0
         */
        this.removeCallback = GetFastValue(config, 'removeCallback', null);

        /**
         * A function to be called when creating several group members at once.
         *
         * @name Phaser.GameObjects.Group#createMultipleCallback
         * @type {?GroupMultipleCreateCallback}
         * @since 3.0.0
         */
        this.createMultipleCallback = GetFastValue(config, 'createMultipleCallback', null);

        if (config)
        {
            this.createMultiple(config);
        }
    },

    /**
     * Creates a new Game Object and adds it to this group, unless the group {@link Phaser.GameObjects.Group#isFull is full}.
     *
     * Calls {@link Phaser.GameObjects.Group#createCallback}.
     *
     * @method Phaser.GameObjects.Group#create
     * @since 3.0.0
     *
     * @param {number} [x=0] - The horizontal position of the new Game Object in the world.
     * @param {number} [y=0] - The vertical position of the new Game Object in the world.
     * @param {string} [key=defaultKey] - The texture key of the new Game Object.
     * @param {(string|integer)} [frame=defaultFrame] - The texture frame of the new Game Object.
     * @param {boolean} [visible=true] - The {@link Phaser.GameObjects.Components.Visible#visible} state of the new Game Object.
     * @param {boolean} [active=true] - The {@link Phaser.GameObjects.GameObject#active} state of the new Game Object.
     *
     * @return {any} The new Game Object (usually a Sprite, etc.).
     */
    create: function (x, y, key, frame, visible, active)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (key === undefined) { key = this.defaultKey; }
        if (frame === undefined) { frame = this.defaultFrame; }
        if (visible === undefined) { visible = true; }
        if (active === undefined) { active = true; }

        //  Pool?
        if (this.isFull())
        {
            return null;
        }

        var child = new this.classType(this.scene, x, y, key, frame);

        this.scene.sys.displayList.add(child);

        if (child.preUpdate)
        {
            this.scene.sys.updateList.add(child);
        }

        child.visible = visible;
        child.setActive(active);

        this.add(child);

        return child;
    },

    /**
     * Creates several Game Objects and adds them to this group.
     *
     * If the group becomes {@link Phaser.GameObjects.Group#isFull}, no further Game Objects are created.
     *
     * Calls {@link Phaser.GameObjects.Group#createMultipleCallback} and {@link Phaser.GameObjects.Group#createCallback}.
     *
     * @method Phaser.GameObjects.Group#createMultiple
     * @since 3.0.0
     *
     * @param {GroupCreateConfig|GroupCreateConfig[]} config - Creation settings. This can be a single configuration object or an array of such objects, which will be applied in turn.
     *
     * @return {any[]} The newly created Game Objects.
     */
    createMultiple: function (config)
    {
        if (this.isFull())
        {
            return [];
        }

        if (!Array.isArray(config))
        {
            config = [ config ];
        }

        var output = [];

        if (config[0].key)
        {
            for (var i = 0; i < config.length; i++)
            {
                var entries = this.createFromConfig(config[i]);
    
                output = output.concat(entries);
            }
        }

        return output;
    },

    /**
     * A helper for {@link Phaser.GameObjects.Group#createMultiple}.
     *
     * @method Phaser.GameObjects.Group#createFromConfig
     * @since 3.0.0
     *
     * @param {GroupCreateConfig} options - Creation settings.
     *
     * @return {any[]} The newly created Game Objects.
     */
    createFromConfig: function (options)
    {
        if (this.isFull())
        {
            return [];
        }

        this.classType = GetFastValue(options, 'classType', this.classType);

        var key = GetFastValue(options, 'key', undefined);
        var frame = GetFastValue(options, 'frame', null);
        var visible = GetFastValue(options, 'visible', true);
        var active = GetFastValue(options, 'active', true);

        var entries = [];

        //  Can't do anything without at least a key
        if (key === undefined)
        {
            return entries;
        }
        else
        {
            if (!Array.isArray(key))
            {
                key = [ key ];
            }

            if (!Array.isArray(frame))
            {
                frame = [ frame ];
            }
        }

        //  Build an array of key frame pairs to loop through

        var repeat = GetFastValue(options, 'repeat', 0);
        var randomKey = GetFastValue(options, 'randomKey', false);
        var randomFrame = GetFastValue(options, 'randomFrame', false);
        var yoyo = GetFastValue(options, 'yoyo', false);
        var quantity = GetFastValue(options, 'frameQuantity', 1);
        var max = GetFastValue(options, 'max', 0);

        //  If a grid is set we use that to override the quantity?

        var range = Range(key, frame, {
            max: max,
            qty: quantity,
            random: randomKey,
            randomB: randomFrame,
            repeat: repeat,
            yoyo: yoyo
        });

        for (var c = 0; c < range.length; c++)
        {
            var created = this.create(0, 0, range[c].a, range[c].b, visible, active);

            if (!created)
            {
                break;
            }

            entries.push(created);
        }

        //  Post-creation options (applied only to those items created in this call):

        var x = GetValue(options, 'setXY.x', 0);
        var y = GetValue(options, 'setXY.y', 0);
        var stepX = GetValue(options, 'setXY.stepX', 0);
        var stepY = GetValue(options, 'setXY.stepY', 0);

        Actions.SetXY(entries, x, y, stepX, stepY);

        var rotation = GetValue(options, 'setRotation.value', 0);
        var stepRotation = GetValue(options, 'setRotation.step', 0);

        Actions.SetRotation(entries, rotation, stepRotation);

        var scaleX = GetValue(options, 'setScale.x', 1);
        var scaleY = GetValue(options, 'setScale.y', scaleX);
        var stepScaleX = GetValue(options, 'setScale.stepX', 0);
        var stepScaleY = GetValue(options, 'setScale.stepY', 0);

        Actions.SetScale(entries, scaleX, scaleY, stepScaleX, stepScaleY);

        var alpha = GetValue(options, 'setAlpha.value', 1);
        var stepAlpha = GetValue(options, 'setAlpha.step', 0);

        Actions.SetAlpha(entries, alpha, stepAlpha);

        var hitArea = GetFastValue(options, 'hitArea', null);
        var hitAreaCallback = GetFastValue(options, 'hitAreaCallback', null);

        if (hitArea)
        {
            Actions.SetHitArea(entries, hitArea, hitAreaCallback);
        }

        var grid = GetFastValue(options, 'gridAlign', false);

        if (grid)
        {
            Actions.GridAlign(entries, grid);
        }

        if (this.createMultipleCallback)
        {
            this.createMultipleCallback.call(this, entries);
        }

        return entries;
    },

    /**
     * Updates any group members, if {@link Phaser.GameObjects.Group#runChildUpdate} is enabled.
     *
     * @method Phaser.GameObjects.Group#preUpdate
     * @since 3.0.0
     *
     * @param {number} time - The current timestamp.
     * @param {number} delta - The delta time elapsed since the last frame.
     */
    preUpdate: function (time, delta)
    {
        if (!this.runChildUpdate || this.children.size === 0)
        {
            return;
        }

        //  Because a Group child may mess with the length of the Group during its update
        var temp = this.children.entries.slice();

        for (var i = 0; i < temp.length; i++)
        {
            var item = temp[i];

            if (item.active)
            {
                item.update(time, delta);
            }
        }
    },

    /**
     * Adds a Game Object to this group.
     *
     * Calls {@link Phaser.GameObjects.Group#createCallback}.
     *
     * @method Phaser.GameObjects.Group#add
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.GameObject} child - The Game Object to add.
     * @param {boolean} [addToScene=false] - Also add the Game Object to the scene.
     *
     * @return {Phaser.GameObjects.Group} This Group object.
     */
    add: function (child, addToScene)
    {
        if (addToScene === undefined) { addToScene = false; }

        if (this.isFull())
        {
            return this;
        }

        this.children.set(child);

        if (this.createCallback)
        {
            this.createCallback.call(this, child);
        }

        if (addToScene)
        {
            this.scene.sys.displayList.add(child);

            if (child.preUpdate)
            {
                this.scene.sys.updateList.add(child);
            }
        }

        child.on('destroy', this.remove, this);

        return this;
    },

    /**
     * Adds several Game Objects to this group.
     *
     * Calls {@link Phaser.GameObjects.Group#createCallback}.
     *
     * @method Phaser.GameObjects.Group#addMultiple
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.GameObject[]} children - The Game Objects to add.
     * @param {boolean} [addToScene=false] - Also add the Game Objects to the scene.
     *
     * @return {Phaser.GameObjects.Group} This group.
     */
    addMultiple: function (children, addToScene)
    {
        if (addToScene === undefined) { addToScene = false; }

        if (Array.isArray(children))
        {
            for (var i = 0; i < children.length; i++)
            {
                this.add(children[i], addToScene);
            }
        }

        return this;
    },

    /**
     * Removes a member of this Group and optionally removes it from the Scene and / or destroys it.
     *
     * Calls {@link Phaser.GameObjects.Group#removeCallback}.
     *
     * @method Phaser.GameObjects.Group#remove
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.GameObject} child - The Game Object to remove.
     * @param {boolean} [removeFromScene=false] - Optionally remove the Group member from the Scene it belongs to.
     * @param {boolean} [destroyChild=false] - Optionally call destroy on the removed Group member.
     *
     * @return {Phaser.GameObjects.Group} This Group object.
     */
    remove: function (child, removeFromScene, destroyChild)
    {
        if (removeFromScene === undefined) { removeFromScene = false; }
        if (destroyChild === undefined) { destroyChild = false; }

        if (!this.children.contains(child))
        {
            return this;
        }

        this.children.delete(child);

        if (this.removeCallback)
        {
            this.removeCallback.call(this, child);
        }

        child.off('destroy', this.remove, this);

        if (destroyChild)
        {
            child.destroy();
        }
        else if (removeFromScene)
        {
            child.scene.sys.displayList.remove(child);

            if (child.preUpdate)
            {
                child.scene.sys.updateList.remove(child);
            }
        }

        return this;
    },

    /**
     * Removes all members of this Group and optionally removes them from the Scene and / or destroys them.
     *
     * Does not call {@link Phaser.GameObjects.Group#removeCallback}.
     *
     * @method Phaser.GameObjects.Group#clear
     * @since 3.0.0
     *
     * @param {boolean} [removeFromScene=false] - Optionally remove each Group member from the Scene.
     * @param {boolean} [destroyChild=false] - Optionally call destroy on the removed Group members.
     *
     * @return {Phaser.GameObjects.Group} This group.
     */
    clear: function (removeFromScene, destroyChild)
    {
        if (removeFromScene === undefined) { removeFromScene = false; }
        if (destroyChild === undefined) { destroyChild = false; }

        var children = this.children;

        for (var i = 0; i < children.size; i++)
        {
            var gameObject = children.entries[i];

            gameObject.off('destroy', this.remove, this);

            if (destroyChild)
            {
                gameObject.destroy();
            }
            else if (removeFromScene)
            {
                gameObject.scene.sys.displayList.remove(gameObject);

                if (gameObject.preUpdate)
                {
                    gameObject.scene.sys.updateList.remove(gameObject);
                }
            }
        }

        this.children.clear();

        return this;
    },

    /**
     * Tests if a Game Object is a member of this group.
     *
     * @method Phaser.GameObjects.Group#contains
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.GameObject} child - A Game Object.
     *
     * @return {boolean} True if the Game Object is a member of this group.
     */
    contains: function (child)
    {
        return this.children.contains(child);
    },

    /**
     * All members of the group.
     *
     * @method Phaser.GameObjects.Group#getChildren
     * @since 3.0.0
     *
     * @return {Phaser.GameObjects.GameObject[]} The group members.
     */
    getChildren: function ()
    {
        return this.children.entries;
    },

    /**
     * The number of members of the group.
     *
     * @method Phaser.GameObjects.Group#getLength
     * @since 3.0.0
     *
     * @return {integer}
     */
    getLength: function ()
    {
        return this.children.size;
    },

    /**
     * Scans the Group, from top to bottom, for the first member that has an {@link Phaser.GameObjects.GameObject#active} state matching the argument,
     * assigns `x` and `y`, and returns the member.
     *
     * If no matching member is found and `createIfNull` is true and the group isn't full then it will create a new Game Object using `x`, `y`, `key`, `frame`, and `visible`.
     * Unless a new member is created, `key`, `frame`, and `visible` are ignored.
     *
     * @method Phaser.GameObjects.Group#getFirst
     * @since 3.0.0
     *
     * @param {boolean} [state=false] - The {@link Phaser.GameObjects.GameObject#active} value to match.
     * @param {boolean} [createIfNull=false] - Create a new Game Object if no matching members are found, using the following arguments.
     * @param {number} [x] - The horizontal position of the Game Object in the world.
     * @param {number} [y] - The vertical position of the Game Object in the world.
     * @param {string} [key=defaultKey] - The texture key assigned to a new Game Object (if one is created).
     * @param {(string|integer)} [frame=defaultFrame] - A texture frame assigned to a new Game Object (if one is created).
     * @param {boolean} [visible=true] - The {@link Phaser.GameObjects.Components.Visible#visible} state of a new Game Object (if one is created).
     *
     * @return {?any} The first matching group member, or a newly created member, or null.
     */
    getFirst: function (state, createIfNull, x, y, key, frame, visible)
    {
        return this.getHandler(true, 1, state, createIfNull, x, y, key, frame, visible);
    },

    /**
     * Scans the Group, from top to bottom, for the nth member that has an {@link Phaser.GameObjects.GameObject#active} state matching the argument,
     * assigns `x` and `y`, and returns the member.
     *
     * If no matching member is found and `createIfNull` is true and the group isn't full then it will create a new Game Object using `x`, `y`, `key`, `frame`, and `visible`.
     * Unless a new member is created, `key`, `frame`, and `visible` are ignored.
     *
     * @method Phaser.GameObjects.Group#getFirstNth
     * @since 3.6.0
     *
     * @param {integer} nth - The nth matching Group member to search for.
     * @param {boolean} [state=false] - The {@link Phaser.GameObjects.GameObject#active} value to match.
     * @param {boolean} [createIfNull=false] - Create a new Game Object if no matching members are found, using the following arguments.
     * @param {number} [x] - The horizontal position of the Game Object in the world.
     * @param {number} [y] - The vertical position of the Game Object in the world.
     * @param {string} [key=defaultKey] - The texture key assigned to a new Game Object (if one is created).
     * @param {(string|integer)} [frame=defaultFrame] - A texture frame assigned to a new Game Object (if one is created).
     * @param {boolean} [visible=true] - The {@link Phaser.GameObjects.Components.Visible#visible} state of a new Game Object (if one is created).
     *
     * @return {?any} The first matching group member, or a newly created member, or null.
     */
    getFirstNth: function (nth, state, createIfNull, x, y, key, frame, visible)
    {
        return this.getHandler(true, nth, state, createIfNull, x, y, key, frame, visible);
    },

    /**
     * Scans the Group for the last member that has an {@link Phaser.GameObjects.GameObject#active} state matching the argument,
     * assigns `x` and `y`, and returns the member.
     *
     * If no matching member is found and `createIfNull` is true and the group isn't full then it will create a new Game Object using `x`, `y`, `key`, `frame`, and `visible`.
     * Unless a new member is created, `key`, `frame`, and `visible` are ignored.
     *
     * @method Phaser.GameObjects.Group#getLast
     * @since 3.6.0
     *
     * @param {boolean} [state=false] - The {@link Phaser.GameObjects.GameObject#active} value to match.
     * @param {boolean} [createIfNull=false] - Create a new Game Object if no matching members are found, using the following arguments.
     * @param {number} [x] - The horizontal position of the Game Object in the world.
     * @param {number} [y] - The vertical position of the Game Object in the world.
     * @param {string} [key=defaultKey] - The texture key assigned to a new Game Object (if one is created).
     * @param {(string|integer)} [frame=defaultFrame] - A texture frame assigned to a new Game Object (if one is created).
     * @param {boolean} [visible=true] - The {@link Phaser.GameObjects.Components.Visible#visible} state of a new Game Object (if one is created).
     *
     * @return {?any} The first matching group member, or a newly created member, or null.
     */
    getLast: function (state, createIfNull, x, y, key, frame, visible)
    {
        return this.getHandler(false, 1, state, createIfNull, x, y, key, frame, visible);
    },

    /**
     * Scans the Group for the last nth member that has an {@link Phaser.GameObjects.GameObject#active} state matching the argument,
     * assigns `x` and `y`, and returns the member.
     *
     * If no matching member is found and `createIfNull` is true and the group isn't full then it will create a new Game Object using `x`, `y`, `key`, `frame`, and `visible`.
     * Unless a new member is created, `key`, `frame`, and `visible` are ignored.
     *
     * @method Phaser.GameObjects.Group#getLastNth
     * @since 3.6.0
     *
     * @param {integer} nth - The nth matching Group member to search for.
     * @param {boolean} [state=false] - The {@link Phaser.GameObjects.GameObject#active} value to match.
     * @param {boolean} [createIfNull=false] - Create a new Game Object if no matching members are found, using the following arguments.
     * @param {number} [x] - The horizontal position of the Game Object in the world.
     * @param {number} [y] - The vertical position of the Game Object in the world.
     * @param {string} [key=defaultKey] - The texture key assigned to a new Game Object (if one is created).
     * @param {(string|integer)} [frame=defaultFrame] - A texture frame assigned to a new Game Object (if one is created).
     * @param {boolean} [visible=true] - The {@link Phaser.GameObjects.Components.Visible#visible} state of a new Game Object (if one is created).
     *
     * @return {?any} The first matching group member, or a newly created member, or null.
     */
    getLastNth: function (nth, state, createIfNull, x, y, key, frame, visible)
    {
        return this.getHandler(false, nth, state, createIfNull, x, y, key, frame, visible);
    },

    /**
     * Scans the group for the last member that has an {@link Phaser.GameObjects.GameObject#active} state matching the argument,
     * assigns `x` and `y`, and returns the member.
     *
     * If no matching member is found and `createIfNull` is true and the group isn't full then it will create a new Game Object using `x`, `y`, `key`, `frame`, and `visible`.
     * Unless a new member is created, `key`, `frame`, and `visible` are ignored.
     *
     * @method Phaser.GameObjects.Group#getHandler
     * @private
     * @since 3.6.0
     *
     * @param {boolean} forwards - Search front to back or back to front?
     * @param {integer} nth - Stop matching after nth successful matches.
     * @param {boolean} [state=false] - The {@link Phaser.GameObjects.GameObject#active} value to match.
     * @param {boolean} [createIfNull=false] - Create a new Game Object if no matching members are found, using the following arguments.
     * @param {number} [x] - The horizontal position of the Game Object in the world.
     * @param {number} [y] - The vertical position of the Game Object in the world.
     * @param {string} [key=defaultKey] - The texture key assigned to a new Game Object (if one is created).
     * @param {(string|integer)} [frame=defaultFrame] - A texture frame assigned to a new Game Object (if one is created).
     * @param {boolean} [visible=true] - The {@link Phaser.GameObjects.Components.Visible#visible} state of a new Game Object (if one is created).
     *
     * @return {?any} The first matching group member, or a newly created member, or null.
     */
    getHandler: function (forwards, nth, state, createIfNull, x, y, key, frame, visible)
    {
        if (state === undefined) { state = false; }
        if (createIfNull === undefined) { createIfNull = false; }

        var gameObject;

        var i;
        var total = 0;
        var children = this.children.entries;

        if (forwards)
        {
            for (i = 0; i < children.length; i++)
            {
                gameObject = children[i];

                if (gameObject.active === state)
                {
                    total++;

                    if (total === nth)
                    {
                        break;
                    }
                }
                else
                {
                    gameObject = null;
                }
            }
        }
        else
        {
            for (i = children.length - 1; i >= 0; i--)
            {
                gameObject = children[i];

                if (gameObject.active === state)
                {
                    total++;

                    if (total === nth)
                    {
                        break;
                    }
                }
                else
                {
                    gameObject = null;
                }
            }
        }

        if (gameObject)
        {
            if (typeof(x) === 'number')
            {
                gameObject.x = x;
            }

            if (typeof(y) === 'number')
            {
                gameObject.y = y;
            }

            return gameObject;
        }

        //  Got this far? We need to create or bail
        if (createIfNull)
        {
            return this.create(x, y, key, frame, visible);
        }
        else
        {
            return null;
        }
    },

    /**
     * Scans the group for the first member that has an {@link Phaser.GameObjects.GameObject#active} state set to `false`,
     * assigns `x` and `y`, and returns the member.
     *
     * If no inactive member is found and the group isn't full then it will create a new Game Object using `x`, `y`, `key`, `frame`, and `visible`.
     * The new Game Object will have its active state set to `true`.
     * Unless a new member is created, `key`, `frame`, and `visible` are ignored.
     *
     * @method Phaser.GameObjects.Group#get
     * @since 3.0.0
     *
     * @param {number} [x] - The horizontal position of the Game Object in the world.
     * @param {number} [y] - The vertical position of the Game Object in the world.
     * @param {string} [key=defaultKey] - The texture key assigned to a new Game Object (if one is created).
     * @param {(string|integer)} [frame=defaultFrame] - A texture frame assigned to a new Game Object (if one is created).
     * @param {boolean} [visible=true] - The {@link Phaser.GameObjects.Components.Visible#visible} state of a new Game Object (if one is created).
     *
     * @return {?any} The first inactive group member, or a newly created member, or null.
     */
    get: function (x, y, key, frame, visible)
    {
        return this.getFirst(false, true, x, y, key, frame, visible);
    },

    /**
     * Scans the group for the first member that has an {@link Phaser.GameObjects.GameObject#active} state set to `true`,
     * assigns `x` and `y`, and returns the member.
     *
     * If no active member is found and `createIfNull` is `true` and the group isn't full then it will create a new one using `x`, `y`, `key`, `frame`, and `visible`.
     * Unless a new member is created, `key`, `frame`, and `visible` are ignored.
     *
     * @method Phaser.GameObjects.Group#getFirstAlive
     * @since 3.0.0
     *
     * @param {boolean} [createIfNull=false] - Create a new Game Object if no matching members are found, using the following arguments.
     * @param {number} [x] - The horizontal position of the Game Object in the world.
     * @param {number} [y] - The vertical position of the Game Object in the world.
     * @param {string} [key=defaultKey] - The texture key assigned to a new Game Object (if one is created).
     * @param {(string|integer)} [frame=defaultFrame] - A texture frame assigned to a new Game Object (if one is created).
     * @param {boolean} [visible=true] - The {@link Phaser.GameObjects.Components.Visible#visible} state of a new Game Object (if one is created).
     *
     * @return {any} The first active group member, or a newly created member, or null.
     */
    getFirstAlive: function (createIfNull, x, y, key, frame, visible)
    {
        return this.getFirst(true, createIfNull, x, y, key, frame, visible);
    },

    /**
     * Scans the group for the first member that has an {@link Phaser.GameObjects.GameObject#active} state set to `false`,
     * assigns `x` and `y`, and returns the member.
     *
     * If no inactive member is found and `createIfNull` is `true` and the group isn't full then it will create a new one using `x`, `y`, `key`, `frame`, and `visible`.
     * The new Game Object will have an active state set to `true`.
     * Unless a new member is created, `key`, `frame`, and `visible` are ignored.
     *
     * @method Phaser.GameObjects.Group#getFirstDead
     * @since 3.0.0
     *
     * @param {boolean} [createIfNull=false] - Create a new Game Object if no matching members are found, using the following arguments.
     * @param {number} [x] - The horizontal position of the Game Object in the world.
     * @param {number} [y] - The vertical position of the Game Object in the world.
     * @param {string} [key=defaultKey] - The texture key assigned to a new Game Object (if one is created).
     * @param {(string|integer)} [frame=defaultFrame] - A texture frame assigned to a new Game Object (if one is created).
     * @param {boolean} [visible=true] - The {@link Phaser.GameObjects.Components.Visible#visible} state of a new Game Object (if one is created).
     *
     * @return {any} The first inactive group member, or a newly created member, or null.
     */
    getFirstDead: function (createIfNull, x, y, key, frame, visible)
    {
        return this.getFirst(false, createIfNull, x, y, key, frame, visible);
    },

    /**
     * {@link Phaser.GameObjects.Components.Animation#play Plays} an animation for all members of this group.
     *
     * @method Phaser.GameObjects.Group#playAnimation
     * @since 3.0.0
     *
     * @param {string} key - The string-based key of the animation to play.
     * @param {string} [startFrame=0] - Optionally start the animation playing from this frame index.
     *
     * @return {Phaser.GameObjects.Group} This Group object.
     */
    playAnimation: function (key, startFrame)
    {
        Actions.PlayAnimation(this.children.entries, key, startFrame);

        return this;
    },

    /**
     * Whether this group's size at its {@link Phaser.GameObjects.Group#maxSize maximum}.
     *
     * @method Phaser.GameObjects.Group#isFull
     * @since 3.0.0
     *
     * @return {boolean} True if the number of members equals {@link Phaser.GameObjects.Group#maxSize}.
     */
    isFull: function ()
    {
        if (this.maxSize === -1)
        {
            return false;
        }
        else
        {
            return (this.children.size >= this.maxSize);
        }
    },

    /**
     * Counts the number of active (or inactive) group members.
     *
     * @method Phaser.GameObjects.Group#countActive
     * @since 3.0.0
     *
     * @param {boolean} [value=true] - Count active (true) or inactive (false) group members.
     *
     * @return {integer} The number of group members with an active state matching the `active` argument.
     */
    countActive: function (value)
    {
        if (value === undefined) { value = true; }

        var total = 0;

        for (var i = 0; i < this.children.size; i++)
        {
            if (this.children.entries[i].active === value)
            {
                total++;
            }
        }

        return total;
    },

    /**
     * Counts the number of in-use (active) group members.
     *
     * @method Phaser.GameObjects.Group#getTotalUsed
     * @since 3.0.0
     *
     * @return {integer} The number of group members with an active state of true.
     */
    getTotalUsed: function ()
    {
        return this.countActive();
    },

    /**
     * The difference of {@link Phaser.GameObjects.Group#maxSize} and the number of active group members.
     *
     * This represents the number of group members that could be created or reactivated before reaching the size limit.
     *
     * @method Phaser.GameObjects.Group#getTotalFree
     * @since 3.0.0
     *
     * @return {integer} maxSize minus the number of active group numbers; or a large number (if maxSize is -1).
     */
    getTotalFree: function ()
    {
        var used = this.getTotalUsed();
        var capacity = (this.maxSize === -1) ? 999999999999 : this.maxSize;

        return (capacity - used);
    },

    /**
     * Sets the depth of each group member.
     *
     * @method Phaser.GameObjects.Group#setDepth
     * @since 3.0.0
     *
     * @param {number} value - The amount to set the property to.
     * @param {number} step - This is added to the `value` amount, multiplied by the iteration counter.
     *
     * @return {Phaser.GameObjects.Group} This Group object.
     */
    setDepth: function (value, step)
    {
        Actions.SetDepth(this.children.entries, value, step);

        return this;
    },

    /**
     * Deactivates a member of this group.
     *
     * @method Phaser.GameObjects.Group#kill
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.GameObject} gameObject - A member of this group.
     */
    kill: function (gameObject)
    {
        if (this.children.contains(gameObject))
        {
            gameObject.setActive(false);
        }
    },

    /**
     * Deactivates and hides a member of this group.
     *
     * @method Phaser.GameObjects.Group#killAndHide
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.GameObject} gameObject - A member of this group.
     */
    killAndHide: function (gameObject)
    {
        if (this.children.contains(gameObject))
        {
            gameObject.setActive(false);
            gameObject.setVisible(false);
        }
    },

    /**
     * Toggles (flips) the visible state of each member of this group.
     *
     * @method Phaser.GameObjects.Group#toggleVisible
     * @since 3.0.0
     *
     * @return {Phaser.GameObjects.Group} This Group object.
     */
    toggleVisible: function ()
    {
        Actions.ToggleVisible(this.children.entries);

        return this;
    },

    /**
     * Empties this group and removes it from the Scene.
     *
     * Does not call {@link Phaser.GameObjects.Group#removeCallback}.
     *
     * @method Phaser.GameObjects.Group#destroy
     * @since 3.0.0
     *
     * @param {boolean} [destroyChildren=false] - Also {@link Phaser.GameObjects.GameObject#destroy} each group member.
     */
    destroy: function (destroyChildren)
    {
        if (destroyChildren === undefined) { destroyChildren = false; }

        //  This Game Object had already been destroyed
        if (!this.scene || this.ignoreDestroy)
        {
            return;
        }

        if (destroyChildren)
        {
            var children = this.children;

            for (var i = 0; i < children.size; i++)
            {
                var gameObject = children.entries[i];

                //  Remove the event hook first or it'll go all recursive hell on us
                gameObject.off('destroy', this.remove, this);

                gameObject.destroy();
            }
        }

        this.children.clear();

        this.scene = undefined;
        this.children = undefined;
    }

});

module.exports = Group;


/***/ }),
/* 89 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Check to see if the Ellipse contains the given x / y coordinates.
 *
 * @function Phaser.Geom.Ellipse.Contains
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Ellipse} ellipse - The Ellipse to check.
 * @param {number} x - The x coordinate to check within the ellipse.
 * @param {number} y - The y coordinate to check within the ellipse.
 *
 * @return {boolean} True if the coordinates are within the ellipse, otherwise false.
 */
var Contains = function (ellipse, x, y)
{
    if (ellipse.width <= 0 || ellipse.height <= 0)
    {
        return false;
    }

    //  Normalize the coords to an ellipse with center 0,0 and a radius of 0.5
    var normx = ((x - ellipse.x) / ellipse.width);
    var normy = ((y - ellipse.y) / ellipse.height);

    normx *= normx;
    normy *= normy;

    return (normx + normy < 0.25);
};

module.exports = Contains;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);
var Contains = __webpack_require__(89);
var GetPoint = __webpack_require__(308);
var GetPoints = __webpack_require__(307);
var Random = __webpack_require__(185);

/**
 * @classdesc
 * An Ellipse object.
 *
 * This is a geometry object, containing numerical values and related methods to inspect and modify them.
 * It is not a Game Object, in that you cannot add it to the display list, and it has no texture.
 * To render an Ellipse you should look at the capabilities of the Graphics class.
 *
 * @class Ellipse
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x=0] - The x position of the center of the ellipse.
 * @param {number} [y=0] - The y position of the center of the ellipse.
 * @param {number} [width=0] - The width of the ellipse.
 * @param {number} [height=0] - The height of the ellipse.
 */
var Ellipse = new Class({

    initialize:

    function Ellipse (x, y, width, height)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = 0; }

        /**
         * The x position of the center of the ellipse.
         *
         * @name Phaser.Geom.Ellipse#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = x;

        /**
         * The y position of the center of the ellipse.
         *
         * @name Phaser.Geom.Ellipse#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = y;

        /**
         * The width of the ellipse.
         *
         * @name Phaser.Geom.Ellipse#width
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.width = width;

        /**
         * The height of the ellipse.
         *
         * @name Phaser.Geom.Ellipse#height
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.height = height;
    },

    /**
     * Check to see if the Ellipse contains the given x / y coordinates.
     *
     * @method Phaser.Geom.Ellipse#contains
     * @since 3.0.0
     *
     * @param {number} x - The x coordinate to check within the ellipse.
     * @param {number} y - The y coordinate to check within the ellipse.
     *
     * @return {boolean} True if the coordinates are within the ellipse, otherwise false.
     */
    contains: function (x, y)
    {
        return Contains(this, x, y);
    },

    /**
     * Returns a Point object containing the coordinates of a point on the circumference of the Ellipse
     * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
     * at 180 degrees around the circle.
     *
     * @method Phaser.Geom.Ellipse#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [out,$return]
     *
     * @param {number} position - A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the ellipse.
     * @param {(Phaser.Geom.Point|object)} [out] - An object to store the return values in. If not given a Point object will be created.
     *
     * @return {(Phaser.Geom.Point|object)} A Point, or point-like object, containing the coordinates of the point around the ellipse.
     */
    getPoint: function (position, point)
    {
        return GetPoint(this, position, point);
    },

    /**
     * Returns an array of Point objects containing the coordinates of the points around the circumference of the Ellipse,
     * based on the given quantity or stepRate values.
     *
     * @method Phaser.Geom.Ellipse#getPoints
     * @since 3.0.0
     *
     * @param {integer} quantity - The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param {number} [stepRate] - Sets the quantity by getting the circumference of the ellipse and dividing it by the stepRate.
     * @param {array} [output] - An array to insert the points in to. If not provided a new array will be created.
     *
     * @return {Phaser.Geom.Point[]} An array of Point objects pertaining to the points around the circumference of the ellipse.
     */
    getPoints: function (quantity, stepRate, output)
    {
        return GetPoints(this, quantity, stepRate, output);
    },

    /**
     * Returns a uniformly distributed random point from anywhere within the given Ellipse.
     *
     * @method Phaser.Geom.Ellipse#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {(Phaser.Geom.Point|object)} [point] - A Point or point-like object to set the random `x` and `y` values in.
     *
     * @return {(Phaser.Geom.Point|object)} A Point object with the random values set in the `x` and `y` properties.
     */
    getRandomPoint: function (point)
    {
        return Random(this, point);
    },

    /**
     * Sets the x, y, width and height of this ellipse.
     *
     * @method Phaser.Geom.Ellipse#setTo
     * @since 3.0.0
     *
     * @param {number} x - The x position of the center of the ellipse.
     * @param {number} y - The y position of the center of the ellipse.
     * @param {number} width - The width of the ellipse.
     * @param {number} height - The height of the ellipse.
     *
     * @return {Phaser.Geom.Ellipse} This Ellipse object.
     */
    setTo: function (x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;
    },

    /**
     * Sets this Ellipse to be empty with a width and height of zero.
     * Does not change its position.
     *
     * @method Phaser.Geom.Ellipse#setEmpty
     * @since 3.0.0
     *
     * @return {Phaser.Geom.Ellipse} This Ellipse object.
     */
    setEmpty: function ()
    {
        this.width = 0;
        this.height = 0;

        return this;
    },

    /**
     * Sets the position of this Ellipse.
     *
     * @method Phaser.Geom.Ellipse#setPosition
     * @since 3.0.0
     *
     * @param {number} x - The x position of the center of the ellipse.
     * @param {number} y - The y position of the center of the ellipse.
     *
     * @return {Phaser.Geom.Ellipse} This Ellipse object.
     */
    setPosition: function (x, y)
    {
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * Sets the size of this Ellipse.
     * Does not change its position.
     *
     * @method Phaser.Geom.Ellipse#setSize
     * @since 3.0.0
     *
     * @param {number} width - The width of the ellipse.
     * @param {number} [height=width] - The height of the ellipse.
     *
     * @return {Phaser.Geom.Ellipse} This Ellipse object.
     */
    setSize: function (width, height)
    {
        if (height === undefined) { height = width; }

        this.width = width;
        this.height = height;

        return this;
    },

    /**
     * Checks to see if the Ellipse is empty: has a width or height equal to zero.
     *
     * @method Phaser.Geom.Ellipse#isEmpty
     * @since 3.0.0
     *
     * @return {boolean} True if the Ellipse is empty, otherwise false.
     */
    isEmpty: function ()
    {
        return (this.width <= 0 || this.height <= 0);
    },

    /**
     * Returns the minor radius of the ellipse. Also known as the Semi Minor Axis.
     *
     * @method Phaser.Geom.Ellipse#getMinorRadius
     * @since 3.0.0
     *
     * @return {number} The minor radius.
     */
    getMinorRadius: function ()
    {
        return Math.min(this.width, this.height) / 2;
    },

    /**
     * Returns the major radius of the ellipse. Also known as the Semi Major Axis.
     *
     * @method Phaser.Geom.Ellipse#getMajorRadius
     * @since 3.0.0
     *
     * @return {number} The major radius.
     */
    getMajorRadius: function ()
    {
        return Math.max(this.width, this.height) / 2;
    },

    /**
     * The left position of the Ellipse.
     *
     * @name Phaser.Geom.Ellipse#left
     * @type {number}
     * @since 3.0.0
     */
    left: {

        get: function ()
        {
            return this.x - (this.width / 2);
        },

        set: function (value)
        {
            this.x = value + (this.width / 2);
        }

    },

    /**
     * The right position of the Ellipse.
     *
     * @name Phaser.Geom.Ellipse#right
     * @type {number}
     * @since 3.0.0
     */
    right: {

        get: function ()
        {
            return this.x + (this.width / 2);
        },

        set: function (value)
        {
            this.x = value - (this.width / 2);
        }

    },

    /**
     * The top position of the Ellipse.
     *
     * @name Phaser.Geom.Ellipse#top
     * @type {number}
     * @since 3.0.0
     */
    top: {

        get: function ()
        {
            return this.y - (this.height / 2);
        },

        set: function (value)
        {
            this.y = value + (this.height / 2);
        }

    },

    /**
     * The bottom position of the Ellipse.
     *
     * @name Phaser.Geom.Ellipse#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {

        get: function ()
        {
            return this.y + (this.height / 2);
        },

        set: function (value)
        {
            this.y = value - (this.height / 2);
        }

    }

});

module.exports = Ellipse;


/***/ }),
/* 91 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Removes a single item from an array and returns it without creating gc, like the native splice does.
 * Based on code by Mike Reinstein.
 *
 * @function Phaser.Utils.Array.SpliceOne
 * @since 3.0.0
 *
 * @param {array} array - [description]
 * @param {integer} index - [description]
 *
 * @return {*} [description]
 */
var SpliceOne = function (array, index)
{
    if (index >= array.length)
    {
        return;
    }

    var len = array.length - 1;

    var item = array[index];

    for (var i = index; i < len; i++)
    {
        array[i] = array[i + 1];
    }

    array.length = len;

    return item;
};

module.exports = SpliceOne;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Determines the operating system of the device running this Phaser Game instance.
 * These values are read-only and populated during the boot sequence of the game.
 * They are then referenced by internal game systems and are available for you to access
 * via `this.sys.game.device.os` from within any Scene.
 *
 * @typedef {object} Phaser.Device.OS
 * @since 3.0.0
 *
 * @property {boolean} android - Is running on android?
 * @property {boolean} chromeOS - Is running on chromeOS?
 * @property {boolean} cocoonJS - Is the game running under CocoonJS?
 * @property {boolean} cocoonJSApp - Is this game running with CocoonJS.App?
 * @property {boolean} cordova - Is the game running under Apache Cordova?
 * @property {boolean} crosswalk - Is the game running under the Intel Crosswalk XDK?
 * @property {boolean} desktop - Is running on a desktop?
 * @property {boolean} ejecta - Is the game running under Ejecta?
 * @property {boolean} electron - Is the game running under GitHub Electron?
 * @property {boolean} iOS - Is running on iOS?
 * @property {boolean} iPad - Is running on iPad?
 * @property {boolean} iPhone - Is running on iPhone?
 * @property {boolean} kindle - Is running on an Amazon Kindle?
 * @property {boolean} linux - Is running on linux?
 * @property {boolean} macOS - Is running on macOS?
 * @property {boolean} node - Is the game running under Node.js?
 * @property {boolean} nodeWebkit - Is the game running under Node-Webkit?
 * @property {boolean} webApp - Set to true if running as a WebApp, i.e. within a WebView
 * @property {boolean} windows - Is running on windows?
 * @property {boolean} windowsPhone - Is running on a Windows Phone?
 * @property {number} iOSVersion - If running in iOS this will contain the major version number.
 * @property {number} pixelRatio - PixelRatio of the host device?
 */
var OS = {

    android: false,
    chromeOS: false,
    cocoonJS: false,
    cocoonJSApp: false,
    cordova: false,
    crosswalk: false,
    desktop: false,
    ejecta: false,
    electron: false,
    iOS: false,
    iOSVersion: 0,
    iPad: false,
    iPhone: false,
    kindle: false,
    linux: false,
    macOS: false,
    node: false,
    nodeWebkit: false,
    pixelRatio: 1,
    webApp: false,
    windows: false,
    windowsPhone: false

};

function init ()
{
    var ua = navigator.userAgent;

    if (/Windows/.test(ua))
    {
        OS.windows = true;
    }
    else if (/Mac OS/.test(ua) && !(/like Mac OS/.test(ua)))
    {
        OS.macOS = true;
    }
    else if (/Android/.test(ua))
    {
        OS.android = true;
    }
    else if (/Linux/.test(ua))
    {
        OS.linux = true;
    }
    else if (/iP[ao]d|iPhone/i.test(ua))
    {
        OS.iOS = true;

        (navigator.appVersion).match(/OS (\d+)/);

        OS.iOSVersion = parseInt(RegExp.$1, 10);

        OS.iPhone = ua.toLowerCase().indexOf('iphone') !== -1;
        OS.iPad = ua.toLowerCase().indexOf('ipad') !== -1;
    }
    else if (/Kindle/.test(ua) || (/\bKF[A-Z][A-Z]+/).test(ua) || (/Silk.*Mobile Safari/).test(ua))
    {
        OS.kindle = true;

        // This will NOT detect early generations of Kindle Fire, I think there is no reliable way...
        // E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true"
    }
    else if (/CrOS/.test(ua))
    {
        OS.chromeOS = true;
    }

    if (/Windows Phone/i.test(ua) || (/IEMobile/i).test(ua))
    {
        OS.android = false;
        OS.iOS = false;
        OS.macOS = false;
        OS.windows = true;
        OS.windowsPhone = true;
    }

    var silk = (/Silk/).test(ua);

    if (OS.windows || OS.macOS || (OS.linux && !silk) || OS.chromeOS)
    {
        OS.desktop = true;
    }

    //  Windows Phone / Table reset
    if (OS.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua))))
    {
        OS.desktop = false;
    }

    //  WebApp mode in iOS
    if (navigator.standalone)
    {
        OS.webApp = true;
    }

    if (window.cordova !== undefined)
    {
        OS.cordova = true;
    }

    if (typeof process !== 'undefined' && process.versions && process.versions.node)
    {
        OS.node = true;
    }

    if (OS.node && typeof process.versions === 'object')
    {
        OS.nodeWebkit = !!process.versions['node-webkit'];

        OS.electron = !!process.versions.electron;
    }

    if (navigator.isCocoonJS)
    {
        OS.cocoonJS = true;

        try
        {
            OS.cocoonJSApp = (typeof CocoonJS !== 'undefined');
        }
        catch (error)
        {
            OS.cocoonJSApp = false;
        }
    }

    if (window.ejecta !== undefined)
    {
        OS.ejecta = true;
    }

    if ((/Crosswalk/).test(ua))
    {
        OS.crosswalk = true;
    }

    OS.pixelRatio = window['devicePixelRatio'] || 1;

    return OS;
}

module.exports = init();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(907)))

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Clamp = __webpack_require__(23);

/**
 * Return a value based on the range between `min` and `max` and the percentage given.
 *
 * @function Phaser.Math.FromPercent
 * @since 3.0.0
 *
 * @param {number} percent - A value between 0 and 1 representing the percentage.
 * @param {number} min - The minimum value.
 * @param {number} [max] - The maximum value.
 *
 * @return {number} The value that is `percent` percent between `min` and `max`.
 */
var FromPercent = function (percent, min, max)
{
    percent = Clamp(percent, 0, 1);

    return (max - min) * percent;
};

module.exports = FromPercent;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Phaser Scale Modes.
 * 
 * @name Phaser.ScaleModes
 * @enum {integer}
 * @memberof Phaser
 * @readonly
 * @since 3.0.0
 */

module.exports = {

    /**
     * Default Scale Mode (Linear).
     * 
     * @name Phaser.ScaleModes.DEFAULT
     */
    DEFAULT: 0,

    /**
     * Linear Scale Mode.
     * 
     * @name Phaser.ScaleModes.LINEAR
     */
    LINEAR: 0,

    /**
     * Nearest Scale Mode.
     * 
     * @name Phaser.ScaleModes.NEAREST
     */
    NEAREST: 1

};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);

/**
 * @callback EachSetCallback
 * @generic E - [entry]
 *
 * @param {*} entry - [description]
 * @param {number} index - [description]
 *
 * @return {?boolean} [description]
 */

/**
 * @classdesc
 * A Set is a collection of unique elements.
 *
 * @class Set
 * @memberof Phaser.Structs
 * @constructor
 * @since 3.0.0
 *
 * @generic T
 * @genericUse {T[]} - [elements]
 *
 * @param {Array.<*>} [elements] - An optional array of elements to insert into this Set.
 */
var Set = new Class({

    initialize:

    function Set (elements)
    {
        /**
         * The entries of this Set. Stored internally as an array.
         *
         * @genericUse {T[]} - [$type]
         *
         * @name Phaser.Structs.Set#entries
         * @type {Array.<*>}
         * @default []
         * @since 3.0.0
         */
        this.entries = [];

        if (Array.isArray(elements))
        {
            for (var i = 0; i < elements.length; i++)
            {
                this.set(elements[i]);
            }
        }
    },

    /**
     * Inserts the provided value into this Set. If the value is already contained in this Set this method will have no effect.
     *
     * @method Phaser.Structs.Set#set
     * @since 3.0.0
     *
     * @genericUse {T} - [value]
     * @genericUse {Phaser.Structs.Set.<T>} - [$return]
     *
     * @param {*} value - The value to insert into this Set.
     *
     * @return {Phaser.Structs.Set} This Set object.
     */
    set: function (value)
    {
        if (this.entries.indexOf(value) === -1)
        {
            this.entries.push(value);
        }

        return this;
    },

    /**
     * Get an element of this Set which has a property of the specified name, if that property is equal to the specified value.
     * If no elements of this Set satisfy the condition then this method will return `null`.
     *
     * @method Phaser.Structs.Set#get
     * @since 3.0.0
     *
     * @genericUse {T} - [value,$return]
     *
     * @param {string} property - The property name to check on the elements of this Set.
     * @param {*} value - The value to check for.
     *
     * @return {*} The first element of this Set that meets the required condition, or `null` if this Set contains no elements that meet the condition.
     */
    get: function (property, value)
    {
        for (var i = 0; i < this.entries.length; i++)
        {
            var entry = this.entries[i];

            if (entry[property] === value)
            {
                return entry;
            }
        }
    },

    /**
     * Returns an array containing all the values in this Set.
     *
     * @method Phaser.Structs.Set#getArray
     * @since 3.0.0
     *
     * @genericUse {T[]} - [$return]
     *
     * @return {Array.<*>} An array containing all the values in this Set.
     */
    getArray: function ()
    {
        return this.entries.slice(0);
    },

    /**
     * Removes the given value from this Set if this Set contains that value.
     *
     * @method Phaser.Structs.Set#delete
     * @since 3.0.0
     *
     * @genericUse {T} - [value]
     * @genericUse {Phaser.Structs.Set.<T>} - [$return]
     *
     * @param {*} value - The value to remove from the Set.
     *
     * @return {Phaser.Structs.Set} This Set object.
     */
    delete: function (value)
    {
        var index = this.entries.indexOf(value);

        if (index > -1)
        {
            this.entries.splice(index, 1);
        }

        return this;
    },

    /**
     * Dumps the contents of this Set to the console via `console.group`.
     *
     * @method Phaser.Structs.Set#dump
     * @since 3.0.0
     */
    dump: function ()
    {
        // eslint-disable-next-line no-console
        console.group('Set');

        for (var i = 0; i < this.entries.length; i++)
        {
            var entry = this.entries[i];
            console.log(entry);
        }

        // eslint-disable-next-line no-console
        console.groupEnd();
    },

    /**
     * Passes each value in this Set to the given callback.
     * Use this function when you know this Set will be modified during the iteration, otherwise use `iterate`.
     *
     * @method Phaser.Structs.Set#each
     * @since 3.0.0
     *
     * @genericUse {EachSetCallback.<T>} - [callback]
     * @genericUse {Phaser.Structs.Set.<T>} - [$return]
     *
     * @param {EachSetCallback} callback - The callback to be invoked and passed each value this Set contains.
     * @param {*} callbackScope - The scope of the callback.
     *
     * @return {Phaser.Structs.Set} This Set object.
     */
    each: function (callback, callbackScope)
    {
        var i;
        var temp = this.entries.slice();
        var len = temp.length;

        if (callbackScope)
        {
            for (i = 0; i < len; i++)
            {
                if (callback.call(callbackScope, temp[i], i) === false)
                {
                    break;
                }
            }
        }
        else
        {
            for (i = 0; i < len; i++)
            {
                if (callback(temp[i], i) === false)
                {
                    break;
                }
            }
        }

        return this;
    },

    /**
     * Passes each value in this Set to the given callback.
     * For when you absolutely know this Set won't be modified during the iteration.
     *
     * @method Phaser.Structs.Set#iterate
     * @since 3.0.0
     *
     * @genericUse {EachSetCallback.<T>} - [callback]
     * @genericUse {Phaser.Structs.Set.<T>} - [$return]
     *
     * @param {EachSetCallback} callback - The callback to be invoked and passed each value this Set contains.
     * @param {*} callbackScope - The scope of the callback.
     *
     * @return {Phaser.Structs.Set} This Set object.
     */
    iterate: function (callback, callbackScope)
    {
        var i;
        var len = this.entries.length;

        if (callbackScope)
        {
            for (i = 0; i < len; i++)
            {
                if (callback.call(callbackScope, this.entries[i], i) === false)
                {
                    break;
                }
            }
        }
        else
        {
            for (i = 0; i < len; i++)
            {
                if (callback(this.entries[i], i) === false)
                {
                    break;
                }
            }
        }

        return this;
    },

    /**
     * Goes through each entry in this Set and invokes the given function on them, passing in the arguments.
     *
     * @method Phaser.Structs.Set#iterateLocal
     * @since 3.0.0
     *
     * @genericUse {Phaser.Structs.Set.<T>} - [$return]
     *
     * @param {string} callbackKey - The key of the function to be invoked on each Set entry.
     * @param {...*} [args] - Additional arguments that will be passed to the callback, after the child.
     *
     * @return {Phaser.Structs.Set} This Set object.
     */
    iterateLocal: function (callbackKey)
    {
        var i;
        var args = [];

        for (i = 1; i < arguments.length; i++)
        {
            args.push(arguments[i]);
        }

        var len = this.entries.length;

        for (i = 0; i < len; i++)
        {
            var entry = this.entries[i];

            entry[callbackKey].apply(entry, args);
        }

        return this;
    },

    /**
     * Clears this Set so that it no longer contains any values.
     *
     * @method Phaser.Structs.Set#clear
     * @since 3.0.0
     *
     * @genericUse {Phaser.Structs.Set.<T>} - [$return]
     *
     * @return {Phaser.Structs.Set} This Set object.
     */
    clear: function ()
    {
        this.entries.length = 0;

        return this;
    },

    /**
     * Returns `true` if this Set contains the given value, otherwise returns `false`.
     *
     * @method Phaser.Structs.Set#contains
     * @since 3.0.0
     *
     * @genericUse {T} - [value]
     *
     * @param {*} value - The value to check for in this Set.
     *
     * @return {boolean} `true` if the given value was found in this Set, otherwise `false`.
     */
    contains: function (value)
    {
        return (this.entries.indexOf(value) > -1);
    },

    /**
     * Returns a new Set containing all values that are either in this Set or in the Set provided as an argument.
     *
     * @method Phaser.Structs.Set#union
     * @since 3.0.0
     *
     * @genericUse {Phaser.Structs.Set.<T>} - [set,$return]
     *
     * @param {Phaser.Structs.Set} set - The Set to perform the union with.
     *
     * @return {Phaser.Structs.Set} A new Set containing all the values in this Set and the Set provided as an argument.
     */
    union: function (set)
    {
        var newSet = new Set();

        set.entries.forEach(function (value)
        {
            newSet.set(value);
        });

        this.entries.forEach(function (value)
        {
            newSet.set(value);
        });

        return newSet;
    },

    /**
     * Returns a new Set that contains only the values which are in this Set and that are also in the given Set.
     *
     * @method Phaser.Structs.Set#intersect
     * @since 3.0.0
     *
     * @genericUse {Phaser.Structs.Set.<T>} - [set,$return]
     *
     * @param {Phaser.Structs.Set} set - The Set to intersect this set with.
     *
     * @return {Phaser.Structs.Set} The result of the intersection, as a new Set.
     */
    intersect: function (set)
    {
        var newSet = new Set();

        this.entries.forEach(function (value)
        {
            if (set.contains(value))
            {
                newSet.set(value);
            }
        });

        return newSet;
    },

    /**
     * Returns a new Set containing all the values in this Set which are *not* also in the given Set.
     *
     * @method Phaser.Structs.Set#difference
     * @since 3.0.0
     *
     * @genericUse {Phaser.Structs.Set.<T>} - [set,$return]
     *
     * @param {Phaser.Structs.Set} set - The Set to perform the difference with.
     *
     * @return {Phaser.Structs.Set} A new Set containing all the values in this Set that are not also in the Set provided as an argument to this method.
     */
    difference: function (set)
    {
        var newSet = new Set();

        this.entries.forEach(function (value)
        {
            if (!set.contains(value))
            {
                newSet.set(value);
            }
        });

        return newSet;
    },

    /**
     * The size of this Set. This is the number of entries within it.
     * Changing the size will truncate the Set if the given value is smaller than the current size.
     * Increasing the size larger than the current size has no effect.
     *
     * @name Phaser.Structs.Set#size
     * @type {integer}
     * @since 3.0.0
     */
    size: {

        get: function ()
        {
            return this.entries.length;
        },

        set: function (value)
        {
            if (value < this.entries.length)
            {
                return this.entries.length = value;
            }
            else
            {
                return this.entries.length;
            }
        }

    }

});

module.exports = Set;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Clone = __webpack_require__(63);

/**
 * Creates a new Object using all values from obj1 and obj2.
 * If a value exists in both obj1 and obj2, the value in obj1 is used.
 *
 * @function Phaser.Utils.Objects.Merge
 * @since 3.0.0
 *
 * @param {object} obj1 - [description]
 * @param {object} obj2 - [description]
 *
 * @return {object} [description]
 */
var Merge = function (obj1, obj2)
{
    var clone = Clone(obj1);

    for (var key in obj2)
    {
        if (!clone.hasOwnProperty(key))
        {
            clone[key] = obj2[key];
        }
    }

    return clone;
};

module.exports = Merge;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Defaults = __webpack_require__(129);
var GetAdvancedValue = __webpack_require__(12);
var GetBoolean = __webpack_require__(84);
var GetEaseFunction = __webpack_require__(86);
var GetNewValue = __webpack_require__(98);
var GetProps = __webpack_require__(205);
var GetTargets = __webpack_require__(131);
var GetValue = __webpack_require__(4);
var GetValueOp = __webpack_require__(130);
var Tween = __webpack_require__(128);
var TweenData = __webpack_require__(127);

/**
 * [description]
 *
 * @function Phaser.Tweens.Builders.TweenBuilder
 * @since 3.0.0
 *
 * @param {(Phaser.Tweens.TweenManager|Phaser.Tweens.Timeline)} parent - [description]
 * @param {object} config - [description]
 * @param {Phaser.Tweens.TweenConfigDefaults} defaults - [description]
 *
 * @return {Phaser.Tweens.Tween} [description]
 */
var TweenBuilder = function (parent, config, defaults)
{
    if (defaults === undefined)
    {
        defaults = Defaults;
    }

    //  Create arrays of the Targets and the Properties
    var targets = (defaults.targets) ? defaults.targets : GetTargets(config);

    // var props = (defaults.props) ? defaults.props : GetProps(config);
    var props = GetProps(config);

    //  Default Tween values
    var delay = GetNewValue(config, 'delay', defaults.delay);
    var duration = GetNewValue(config, 'duration', defaults.duration);
    var easeParams = GetValue(config, 'easeParams', defaults.easeParams);
    var ease = GetEaseFunction(GetValue(config, 'ease', defaults.ease), easeParams);
    var hold = GetNewValue(config, 'hold', defaults.hold);
    var repeat = GetNewValue(config, 'repeat', defaults.repeat);
    var repeatDelay = GetNewValue(config, 'repeatDelay', defaults.repeatDelay);
    var yoyo = GetBoolean(config, 'yoyo', defaults.yoyo);
    var flipX = GetBoolean(config, 'flipX', defaults.flipX);
    var flipY = GetBoolean(config, 'flipY', defaults.flipY);

    var data = [];

    //  Loop through every property defined in the Tween, i.e.: props { x, y, alpha }
    for (var p = 0; p < props.length; p++)
    {
        var key = props[p].key;
        var value = props[p].value;

        //  Create 1 TweenData per target, per property
        for (var t = 0; t < targets.length; t++)
        {
            var ops = GetValueOp(key, value);

            var tweenData = TweenData(
                targets[t],
                key,
                ops.getEnd,
                ops.getStart,
                GetEaseFunction(GetValue(value, 'ease', ease), easeParams),
                GetNewValue(value, 'delay', delay),
                GetNewValue(value, 'duration', duration),
                GetBoolean(value, 'yoyo', yoyo),
                GetNewValue(value, 'hold', hold),
                GetNewValue(value, 'repeat', repeat),
                GetNewValue(value, 'repeatDelay', repeatDelay),
                GetBoolean(value, 'flipX', flipX),
                GetBoolean(value, 'flipY', flipY)
            );

            data.push(tweenData);
        }
    }

    var tween = new Tween(parent, data, targets);

    tween.offset = GetAdvancedValue(config, 'offset', null);
    tween.completeDelay = GetAdvancedValue(config, 'completeDelay', 0);
    tween.loop = Math.round(GetAdvancedValue(config, 'loop', 0));
    tween.loopDelay = Math.round(GetAdvancedValue(config, 'loopDelay', 0));
    tween.paused = GetBoolean(config, 'paused', false);
    tween.useFrames = GetBoolean(config, 'useFrames', false);

    //  Set the Callbacks
    var scope = GetValue(config, 'callbackScope', tween);

    //  Callback parameters: 0 = a reference to the Tween itself, 1 = the target/s of the Tween, ... your own params
    var tweenArray = [ tween, null ];

    var callbacks = Tween.TYPES;

    for (var i = 0; i < callbacks.length; i++)
    {
        var type = callbacks[i];

        var callback = GetValue(config, type, false);

        if (callback)
        {
            var callbackScope = GetValue(config, type + 'Scope', scope);
            var callbackParams = GetValue(config, type + 'Params', []);

            //  The null is reset to be the Tween target
            tween.setCallback(type, callback, tweenArray.concat(callbackParams), callbackScope);
        }
    }

    return tween;
};

module.exports = TweenBuilder;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * [description]
 *
 * @function Phaser.Tweens.Builders.GetNewValue
 * @since 3.0.0
 *
 * @param {object} source - [description]
 * @param {string} key - [description]
 * @param {*} defaultValue - [description]
 *
 * @return {function} [description]
 */
var GetNewValue = function (source, key, defaultValue)
{
    var valueCallback;

    if (source.hasOwnProperty(key))
    {
        var t = typeof(source[key]);

        if (t === 'function')
        {
            valueCallback = function (index, totalTargets, target)
            {
                return source[key](index, totalTargets, target);
            };
        }
        else
        {
            valueCallback = function ()
            {
                return source[key];
            };
        }
    }
    else if (typeof defaultValue === 'function')
    {
        valueCallback = defaultValue;
    }
    else
    {
        valueCallback = function ()
        {
            return defaultValue;
        };
    }

    return valueCallback;
};

module.exports = GetNewValue;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = __webpack_require__(0);

/**
 * @classdesc
 * A Tileset is a combination of an image containing the tiles and a container for data about
 * each tile.
 *
 * @class Tileset
 * @memberof Phaser.Tilemaps
 * @constructor
 * @since 3.0.0
 *
 * @param {string} name - The name of the tileset in the map data.
 * @param {integer} firstgid - The first tile index this tileset contains.
 * @param {integer} [tileWidth=32] - Width of each tile (in pixels).
 * @param {integer} [tileHeight=32] - Height of each tile (in pixels).
 * @param {integer} [tileMargin=0] - The margin around all tiles in the sheet (in pixels).
 * @param {integer} [tileSpacing=0] - The spacing between each tile in the sheet (in pixels).
 * @param {object} [tileProperties={}] - Custom properties defined per tile in the Tileset.
 * These typically are custom properties created in Tiled when editing a tileset.
 * @param {object} [tileData={}] - Data stored per tile. These typically are created in Tiled
 * when editing a tileset, e.g. from Tiled's tile collision editor or terrain editor.
 */
var Tileset = new Class({

    initialize:

    function Tileset (name, firstgid, tileWidth, tileHeight, tileMargin, tileSpacing, tileProperties, tileData)
    {
        if (tileWidth === undefined || tileWidth <= 0) { tileWidth = 32; }
        if (tileHeight === undefined || tileHeight <= 0) { tileHeight = 32; }
        if (tileMargin === undefined) { tileMargin = 0; }
        if (tileSpacing === undefined) { tileSpacing = 0; }
        if (tileProperties === undefined) { tileProperties = {}; }
        if (tileData === undefined) { tileData = {}; }

        /**
         * The name of the Tileset.
         *
         * @name Phaser.Tilemaps.Tileset#name
         * @type {string}
         * @since 3.0.0
         */
        this.name = name;

        /**
         * The starting index of the first tile index this Tileset contains.
         *
         * @name Phaser.Tilemaps.Tileset#firstgid
         * @type {integer}
         * @since 3.0.0
         */
        this.firstgid = firstgid;

        /**
         * The width of each tile (in pixels). Use setTileSize to change.
         *
         * @name Phaser.Tilemaps.Tileset#tileWidth
         * @type {integer}
         * @readonly
         * @since 3.0.0
         */
        this.tileWidth = tileWidth;

        /**
         * The height of each tile (in pixels). Use setTileSize to change.
         *
         * @name Phaser.Tilemaps.Tileset#tileHeight
         * @type {integer}
         * @readonly
         * @since 3.0.0
         */
        this.tileHeight = tileHeight;

        /**
         * The margin around the tiles in the sheet (in pixels). Use `setSpacing` to change.
         *
         * @name Phaser.Tilemaps.Tileset#tileMargin
         * @type {integer}
         * @readonly
         * @since 3.0.0
         */
        this.tileMargin = tileMargin;

        /**
         * The spacing between each the tile in the sheet (in pixels). Use `setSpacing` to change.
         *
         * @name Phaser.Tilemaps.Tileset#tileSpacing
         * @type {integer}
         * @readonly
         * @since 3.0.0
         */
        this.tileSpacing = tileSpacing;

        /**
         * Tileset-specific properties per tile that are typically defined in the Tiled editor in the
         * Tileset editor.
         *
         * @name Phaser.Tilemaps.Tileset#tileProperties
         * @type {object}
         * @since 3.0.0
         */
        this.tileProperties = tileProperties;

        /**
         * Tileset-specific data per tile that are typically defined in the Tiled editor, e.g. within
         * the Tileset collision editor. This is where collision objects and terrain are stored.
         *
         * @name Phaser.Tilemaps.Tileset#tileData
         * @type {object}
         * @since 3.0.0
         */
        this.tileData = tileData;

        /**
         * The cached image that contains the individual tiles. Use setImage to set.
         *
         * @name Phaser.Tilemaps.Tileset#image
         * @type {?Phaser.Textures.Texture}
         * @readonly
         * @since 3.0.0
         */
        this.image = null;

        /**
         * The gl texture used by the WebGL renderer.
         *
         * @name Phaser.Tilemaps.Tileset#glTexture
         * @type {?WebGLTexture}
         * @readonly
         * @since 3.11.0
         */
        this.glTexture = null;

        /**
         * The number of tile rows in the the tileset.
         *
         * @name Phaser.Tilemaps.Tileset#rows
         * @type {integer}
         * @readonly
         * @since 3.0.0
         */
        this.rows = 0;

        /**
         * The number of tile columns in the tileset.
         *
         * @name Phaser.Tilemaps.Tileset#columns
         * @type {integer}
         * @readonly
         * @since 3.0.0
         */
        this.columns = 0;

        /**
         * The total number of tiles in the tileset.
         *
         * @name Phaser.Tilemaps.Tileset#total
         * @type {integer}
         * @readonly
         * @since 3.0.0
         */
        this.total = 0;

        /**
         * The look-up table to specific tile image texture coordinates (UV in pixels). Each element
         * contains the coordinates for a tile in an object of the form {x, y}.
         *
         * @name Phaser.Tilemaps.Tileset#texCoordinates
         * @type {object[]}
         * @readonly
         * @since 3.0.0
        */
        this.texCoordinates = [];
    },

    /**
     * Get a tiles properties that are stored in the Tileset. Returns null if tile index is not
     * contained in this Tileset. This is typically defined in Tiled under the Tileset editor.
     *
     * @method Phaser.Tilemaps.Tileset#getTileProperties
     * @since 3.0.0
     *
     * @param {integer} tileIndex - The unique id of the tile across all tilesets in the map.
     *
     * @return {?(object|undefined)}
     */
    getTileProperties: function (tileIndex)
    {
        if (!this.containsTileIndex(tileIndex)) { return null; }

        return this.tileProperties[tileIndex - this.firstgid];
    },

    /**
     * Get a tile's data that is stored in the Tileset. Returns null if tile index is not contained
     * in this Tileset. This is typically defined in Tiled and will contain both Tileset collision
     * info and terrain mapping.
     *
     * @method Phaser.Tilemaps.Tileset#getTileData
     * @since 3.0.0
     *
     * @param {integer} tileIndex - The unique id of the tile across all tilesets in the map.
     *
     * @return {?object|undefined}
     */
    getTileData: function (tileIndex)
    {
        if (!this.containsTileIndex(tileIndex)) { return null; }

        return this.tileData[tileIndex - this.firstgid];
    },

    /**
     * Get a tile's collision group that is stored in the Tileset. Returns null if tile index is not
     * contained in this Tileset. This is typically defined within Tiled's tileset collision editor.
     *
     * @method Phaser.Tilemaps.Tileset#getTileCollisionGroup
     * @since 3.0.0
     *
     * @param {integer} tileIndex - The unique id of the tile across all tilesets in the map.
     *
     * @return {?object}
     */
    getTileCollisionGroup: function (tileIndex)
    {
        var data = this.getTileData(tileIndex);

        return (data && data.objectgroup) ? data.objectgroup : null;
    },

    /**
     * Returns true if and only if this Tileset contains the given tile index.
     *
     * @method Phaser.Tilemaps.Tileset#containsTileIndex
     * @since 3.0.0
     *
     * @param {integer} tileIndex - The unique id of the tile across all tilesets in the map.
     *
     * @return {boolean}
     */
    containsTileIndex: function (tileIndex)
    {
        return (
            tileIndex >= this.firstgid &&
            tileIndex < (this.firstgid + this.total)
        );
    },

    /**
     * Returns the texture coordinates (UV in pixels) in the Tileset image for the given tile index.
     * Returns null if tile index is not contained in this Tileset.
     *
     * @method Phaser.Tilemaps.Tileset#getTileTextureCoordinates
     * @since 3.0.0
     *
     * @param {integer} tileIndex - The unique id of the tile across all tilesets in the map.
     *
     * @return {?object} Object in the form { x, y } representing the top-left UV coordinate
     * within the Tileset image.
     */
    getTileTextureCoordinates: function (tileIndex)
    {
        if (!this.containsTileIndex(tileIndex)) { return null; }

        return this.texCoordinates[tileIndex - this.firstgid];
    },

    /**
     * Sets the image associated with this Tileset and updates the tile data (rows, columns, etc.).
     *
     * @method Phaser.Tilemaps.Tileset#setImage
     * @since 3.0.0
     *
     * @param {Phaser.Textures.Texture} texture - The image that contains the tiles.
     *
     * @return {Phaser.Tilemaps.Tileset} This Tileset object.
     */
    setImage: function (texture)
    {
        this.image = texture;

        this.glTexture = texture.get().source.glTexture;

        this.updateTileData(this.image.source[0].width, this.image.source[0].height);

        return this;
    },

    /**
     * Sets the tile width & height and updates the tile data (rows, columns, etc.).
     *
     * @method Phaser.Tilemaps.Tileset#setTileSize
     * @since 3.0.0
     *
     * @param {integer} [tileWidth] - The width of a tile in pixels.
     * @param {integer} [tileHeight] - The height of a tile in pixels.
     *
     * @return {Phaser.Tilemaps.Tileset} This Tileset object.
     */
    setTileSize: function (tileWidth, tileHeight)
    {
        if (tileWidth !== undefined) { this.tileWidth = tileWidth; }
        if (tileHeight !== undefined) { this.tileHeight = tileHeight; }

        if (this.image)
        {
            this.updateTileData(this.image.source[0].width, this.image.source[0].height);
        }

        return this;
    },

    /**
     * Sets the tile margin & spacing and updates the tile data (rows, columns, etc.).
     *
     * @method Phaser.Tilemaps.Tileset#setSpacing
     * @since 3.0.0
     *
     * @param {integer} [margin] - The margin around the tiles in the sheet (in pixels).
     * @param {integer} [spacing] - The spacing between the tiles in the sheet (in pixels).
     *
     * @return {Phaser.Tilemaps.Tileset} This Tileset object.
     */
    setSpacing: function (margin, spacing)
    {
        if (margin !== undefined) { this.tileMargin = margin; }
        if (spacing !== undefined) { this.tileSpacing = spacing; }

        if (this.image)
        {
            this.updateTileData(this.image.source[0].width, this.image.source[0].height);
        }

        return this;
    },

    /**
     * Updates tile texture coordinates and tileset data.
     *
     * @method Phaser.Tilemaps.Tileset#updateTileData
     * @since 3.0.0
     *
     * @param {integer} imageWidth - The (expected) width of the image to slice.
     * @param {integer} imageHeight - The (expected) height of the image to slice.
     *
     * @return {Phaser.Tilemaps.Tileset} This Tileset object.
     */
    updateTileData: function (imageWidth, imageHeight)
    {
        var rowCount = (imageHeight - this.tileMargin * 2 + this.tileSpacing) / (this.tileHeight + this.tileSpacing);
        var colCount = (imageWidth - this.tileMargin * 2 + this.tileSpacing) / (this.tileWidth + this.tileSpacing);

        if (rowCount % 1 !== 0 || colCount % 1 !== 0)
        {
            console.warn('Image tile area not tile size multiple in: ' + this.name);
        }

        // In Tiled a tileset image that is not an even multiple of the tile dimensions is truncated
        // - hence the floor when calculating the rows/columns.