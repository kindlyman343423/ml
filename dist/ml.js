(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["ML"] = factory();
	else
		root["ML"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Root packages
	exports.ArrayUtils = exports.AU = __webpack_require__(1);
	exports.BitArray = __webpack_require__(17);
	exports.Matrix = __webpack_require__(19);


	var Math = exports.Math = {};

	Math.Distance = __webpack_require__(28);
	Math.SG = __webpack_require__(84);


	var Stat = exports.Stat = {};

	Stat.array = __webpack_require__(6);
	Stat.matrix = __webpack_require__(7);
	Stat.PCA = __webpack_require__(86);


	// Random number generation
	var RNG = exports.RNG = {};
	RNG.XSadd = __webpack_require__(97);


	// Supervised learning
	var SL = exports.SL = {};

	SL.SVM = __webpack_require__(98);
	SL.KNN = __webpack_require__(101);
	SL.NaiveBayes = __webpack_require__(104);
	SL.PLS = __webpack_require__(115);


	// Clustering
	var Clust = exports.Clust = {};

	Clust.kmeans = __webpack_require__(128);
	Clust.hclust = __webpack_require__(130);


	// Neural networks
	var NN = exports.NN = exports.nn = {};

	NN.SOM = __webpack_require__(140);
	NN.FNN = __webpack_require__(143);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(2);
	exports.getEquallySpacedData = __webpack_require__(3).getEquallySpacedData;
	exports.SNV = __webpack_require__(4).SNV;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Function that returns an array of points given 1D array as follows:
	 *
	 * [x1, y1, .. , x2, y2, ..]
	 *
	 * And receive the number of dimensions of each point.
	 * @param array
	 * @param dimensions
	 * @returns {Array} - Array of points.
	 */
	function coordArrayToPoints(array, dimensions) {
	    if(array.length % dimensions !== 0) {
	        throw new RangeError('Dimensions number must be accordance with the size of the array.');
	    }

	    var length = array.length / dimensions;
	    var pointsArr = new Array(length);

	    var k = 0;
	    for(var i = 0; i < array.length; i += dimensions) {
	        var point = new Array(dimensions);
	        for(var j = 0; j < dimensions; ++j) {
	            point[j] = array[i + j];
	        }

	        pointsArr[k] = point;
	        k++;
	    }

	    return pointsArr;
	}


	/**
	 * Function that given an array as follows:
	 * [x1, y1, .. , x2, y2, ..]
	 *
	 * Returns an array as follows:
	 * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
	 *
	 * And receives the number of dimensions of each coordinate.
	 * @param array
	 * @param dimensions
	 * @returns {Array} - Matrix of coordinates
	 */
	function coordArrayToCoordMatrix(array, dimensions) {
	    if(array.length % dimensions !== 0) {
	        throw new RangeError('Dimensions number must be accordance with the size of the array.');
	    }

	    var coordinatesArray = new Array(dimensions);
	    var points = array.length / dimensions;
	    for (var i = 0; i < coordinatesArray.length; i++) {
	        coordinatesArray[i] = new Array(points);
	    }

	    for(i = 0; i < array.length; i += dimensions) {
	        for(var j = 0; j < dimensions; ++j) {
	            var currentPoint = Math.floor(i / dimensions);
	            coordinatesArray[j][currentPoint] = array[i + j];
	        }
	    }

	    return coordinatesArray;
	}

	/**
	 * Function that receives a coordinate matrix as follows:
	 * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
	 *
	 * Returns an array of coordinates as follows:
	 * [x1, y1, .. , x2, y2, ..]
	 *
	 * @param coordMatrix
	 * @returns {Array}
	 */
	function coordMatrixToCoordArray(coordMatrix) {
	    var coodinatesArray = new Array(coordMatrix.length * coordMatrix[0].length);
	    var k = 0;
	    for(var i = 0; i < coordMatrix[0].length; ++i) {
	        for(var j = 0; j < coordMatrix.length; ++j) {
	            coodinatesArray[k] = coordMatrix[j][i];
	            ++k;
	        }
	    }

	    return coodinatesArray;
	}

	/**
	 * Tranpose a matrix, this method is for coordMatrixToPoints and
	 * pointsToCoordMatrix, that because only transposing the matrix
	 * you can change your representation.
	 *
	 * @param matrix
	 * @returns {Array}
	 */
	function transpose(matrix) {
	    var resultMatrix = new Array(matrix[0].length);
	    for(var i = 0; i < resultMatrix.length; ++i) {
	        resultMatrix[i] = new Array(matrix.length);
	    }

	    for (i = 0; i < matrix.length; ++i) {
	        for(var j = 0; j < matrix[0].length; ++j) {
	            resultMatrix[j][i] = matrix[i][j];
	        }
	    }

	    return resultMatrix;
	}

	/**
	 * Function that transform an array of points into a coordinates array
	 * as follows:
	 * [x1, y1, .. , x2, y2, ..]
	 *
	 * @param points
	 * @returns {Array}
	 */
	function pointsToCoordArray(points) {
	    var coodinatesArray = new Array(points.length * points[0].length);
	    var k = 0;
	    for(var i = 0; i < points.length; ++i) {
	        for(var j = 0; j < points[0].length; ++j) {
	            coodinatesArray[k] = points[i][j];
	            ++k;
	        }
	    }

	    return coodinatesArray;
	}

	/**
	 * Apply the dot product between the smaller vector and a subsets of the
	 * largest one.
	 *
	 * @param firstVector
	 * @param secondVector
	 * @returns {Array} each dot product of size of the difference between the
	 *                  larger and the smallest one.
	 */
	function applyDotProduct(firstVector, secondVector) {
	    var largestVector, smallestVector;
	    if(firstVector.length <= secondVector.length) {
	        smallestVector = firstVector;
	        largestVector = secondVector;
	    } else {
	        smallestVector = secondVector;
	        largestVector = firstVector;
	    }

	    var difference = largestVector.length - smallestVector.length + 1;
	    var dotProductApplied = new Array(difference);

	    for (var i = 0; i < difference; ++i) {
	        var sum = 0;
	        for (var j = 0; j < smallestVector.length; ++j) {
	            sum += smallestVector[j] * largestVector[i + j];
	        }
	        dotProductApplied[i] = sum;
	    }

	    return dotProductApplied;
	}

	module.exports = {
	    coordArrayToPoints: coordArrayToPoints,
	    coordArrayToCoordMatrix: coordArrayToCoordMatrix,
	    coordMatrixToCoordArray: coordMatrixToCoordArray,
	    coordMatrixToPoints: transpose,
	    pointsToCoordArray: pointsToCoordArray,
	    pointsToCoordMatrix: transpose,
	    applyDotProduct: applyDotProduct
	};



/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 *
	 * Function that returns a Number array of equally spaced numberOfPoints
	 * containing a representation of intensities of the spectra arguments x
	 * and y.
	 *
	 * The options parameter contains an object in the following form:
	 * from: starting point
	 * to: last point
	 * numberOfPoints: number of points between from and to
	 * variant: "slot" or "smooth" - smooth is the default option
	 *
	 * The slot variant consist that each point in the new array is calculated
	 * averaging the existing points between the slot that belongs to the current
	 * value. The smooth variant is the same but takes the integral of the range
	 * of the slot and divide by the step size between two points in the new array.
	 *
	 * @param x
	 * @param y
	 * @param options
	 * @returns {Array} new array with the equally spaced data.
	 *
	 */
	function getEquallySpacedData(x, y, options) {

	    var xLength = x.length;
	    if(xLength !== y.length)
	        throw new RangeError("the x and y vector doesn't have the same size.");

	    if (options === undefined) options = {};

	    var from = options.from === undefined ? x[0] : options.from
	    if (isNaN(from) || !isFinite(from)) {
	        throw new RangeError("'From' value must be a number");
	    }
	    var to = options.to === undefined ? x[x.length - 1] : options.to;
	    if (isNaN(to) || !isFinite(to)) {
	        throw new RangeError("'To' value must be a number");
	    }

	    var reverse = from > to;
	    if(reverse) {
	        var temp = from;
	        from = to;
	        to = temp;
	    }

	    var numberOfPoints = options.numberOfPoints === undefined ? 100 : options.numberOfPoints;
	    if (isNaN(numberOfPoints) || !isFinite(numberOfPoints)) {
	        throw new RangeError("'Number of points' value must be a number");
	    }
	    if(numberOfPoints < 1)
	        throw new RangeError("the number of point must be higher than 1");

	    var algorithm = options.variant === "slot" ? "slot" : "smooth"; // default value: smooth

	    var output = algorithm === "slot" ? getEquallySpacedSlot(x, y, from, to, numberOfPoints) : getEquallySpacedSmooth(x, y, from, to, numberOfPoints);

	    return reverse ? output.reverse() : output;
	}

	/**
	 * function that retrieves the getEquallySpacedData with the variant "smooth"
	 *
	 * @param x
	 * @param y
	 * @param from - Initial point
	 * @param to - Final point
	 * @param numberOfPoints
	 * @returns {Array} - Array of y's equally spaced with the variant "smooth"
	 */
	function getEquallySpacedSmooth(x, y, from, to, numberOfPoints) {
	    var xLength = x.length;

	    var step = (to - from) / (numberOfPoints - 1);
	    var halfStep = step / 2;

	    var start = from - halfStep;
	    var output = new Array(numberOfPoints);

	    var initialOriginalStep = x[1] - x[0];
	    var lastOriginalStep = x[x.length - 1] - x[x.length - 2];

	    // Init main variables
	    var min = start;
	    var max = start + step;

	    var previousX = -Number.MAX_VALUE;
	    var previousY = 0;
	    var nextX = x[0] - initialOriginalStep;
	    var nextY = 0;

	    var currentValue = 0;
	    var slope = 0;
	    var intercept = 0;
	    var sumAtMin = 0;
	    var sumAtMax = 0;

	    var i = 0; // index of input
	    var j = 0; // index of output

	    function getSlope(x0, y0, x1, y1) {
	        return (y1 - y0) / (x1 - x0);
	    }

	    main: while(true) {
	        while (nextX - max >= 0) {
	            // no overlap with original point, just consume current value
	            var add = integral(0, max - previousX, slope, previousY);
	            sumAtMax = currentValue + add;

	            output[j] = (sumAtMax - sumAtMin) / step;
	            j++;

	            if (j === numberOfPoints)
	                break main;

	            min = max;
	            max += step;
	            sumAtMin = sumAtMax;
	        }

	        if(previousX <= min && min <= nextX) {
	            add = integral(0, min - previousX, slope, previousY);
	            sumAtMin = currentValue + add;
	        }

	        currentValue += integral(previousX, nextX, slope, intercept);

	        previousX = nextX;
	        previousY = nextY;

	        if (i < xLength) {
	            nextX = x[i];
	            nextY = y[i];
	            i++;
	        } else if (i === xLength) {
	            nextX += lastOriginalStep;
	            nextY = 0;
	        }
	        // updating parameters
	        slope = getSlope(previousX, previousY, nextX, nextY);
	        intercept = -slope*previousX + previousY;
	    }

	    return output;
	}

	/**
	 * function that retrieves the getEquallySpacedData with the variant "slot"
	 *
	 * @param x
	 * @param y
	 * @param from - Initial point
	 * @param to - Final point
	 * @param numberOfPoints
	 * @returns {Array} - Array of y's equally spaced with the variant "slot"
	 */
	function getEquallySpacedSlot(x, y, from, to, numberOfPoints) {
	    var xLength = x.length;

	    var step = (to - from) / (numberOfPoints - 1);
	    var halfStep = step / 2;
	    var lastStep = x[x.length - 1] - x[x.length - 2];

	    var start = from - halfStep;
	    var output = new Array(numberOfPoints);

	    // Init main variables
	    var min = start;
	    var max = start + step;

	    var previousX = -Number.MAX_VALUE;
	    var previousY = 0;
	    var nextX = x[0];
	    var nextY = y[0];
	    var frontOutsideSpectra = 0;
	    var backOutsideSpectra = true;

	    var currentValue = 0;

	    // for slot algorithm
	    var currentPoints = 0;

	    var i = 1; // index of input
	    var j = 0; // index of output

	    main: while(true) {
	        while (previousX - max > 0) {
	            // no overlap with original point, just consume current value
	            if(backOutsideSpectra) {
	                currentPoints++;
	                backOutsideSpectra = false;
	            }

	            output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
	            j++;

	            if (j === numberOfPoints)
	                break main;

	            min = max;
	            max += step;
	            currentValue = 0;
	            currentPoints = 0;
	        }

	        if(previousX > min) {
	            currentValue += previousY;
	            currentPoints++;
	        }

	        if(previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1)
	            currentPoints--;

	        previousX = nextX;
	        previousY = nextY;

	        if (i < xLength) {
	            nextX = x[i];
	            nextY = y[i];
	            i++;
	        } else {
	            nextX += lastStep;
	            nextY = 0;
	            frontOutsideSpectra++;
	        }
	    }

	    return output;
	}
	/**
	 * Function that calculates the integral of the line between two
	 * x-coordinates, given the slope and intercept of the line.
	 *
	 * @param x0
	 * @param x1
	 * @param slope
	 * @param intercept
	 * @returns {number} integral value.
	 */
	function integral(x0, x1, slope, intercept) {
	    return (0.5 * slope * x1 * x1 + intercept * x1) - (0.5 * slope * x0 * x0 + intercept * x0);
	}

	exports.getEquallySpacedData = getEquallySpacedData;
	exports.integral = integral;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.SNV = SNV;
	var Stat = __webpack_require__(5);
	var Matrix = __webpack_require__(8);

	/**
	 * Function that applies the standard normal variate (SNV) to an array of values.
	 *
	 * @param data - Array of values.
	 * @returns {Array} - applied the SNV.
	 */
	function SNV(data) {
	    var mean = Stat.array.mean(data);
	    var std = Stat.array.standardDeviation(data);

	    return new Matrix([data]).clone().sub(mean).div(std).getRow(0);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	exports.array = __webpack_require__(6);
	exports.matrix = __webpack_require__(7);


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	// https://github.com/accord-net/framework/blob/development/Sources/Accord.Statistics/Tools.cs

	function max(values) {
	    var max = -Infinity, l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] > max) max = values[i];
	    }
	    return max;
	}

	function min(values) {
	    var min = Infinity, l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] < min) min = values[i];
	    }
	    return min;
	}

	function minMax(values) {
	    var min = Infinity,
	        max = -Infinity,
	        l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] < min) min = values[i];
	        if (values[i] > max) max = values[i];
	    }
	    return {
	        min: min,
	        max: max
	    };
	}

	function mean(values) {
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum += values[i];
	    return sum / l;
	}

	function geometricMean(values) {
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum *= values[i];
	    return Math.pow(sum, 1 / l);
	}

	function logGeometricMean(values) {
	    var lnsum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        lnsum += Math.log(values[i]);
	    return lnsum / l;
	}

	function grandMean(means, samples) {
	    var sum = 0, n = 0, l = means.length;
	    for (var i = 0; i < l; i++) {
	        sum += samples[i] * means[i];
	        n += samples[i];
	    }
	    return sum / n;
	}

	function truncatedMean(values, percent, inPlace) {
	    if (typeof(inPlace) === 'undefined') inPlace = false;

	    values = inPlace ? values : values.slice();
	    values.sort();

	    var l = values.length;
	    var k = Math.floor(l * percent);

	    var sum = 0;
	    for (var i = k; i < l - k; i++)
	        sum += values[i];

	    return sum / (l - 2 * k);
	}

	function contraHarmonicMean(values, order) {
	    if (typeof(order) === 'undefined') order = 1;
	    var r1 = 0, r2 = 0, l = values.length;
	    for (var i = 0; i < l; i++) {
	        r1 += Math.pow(values[i], order + 1);
	        r2 += Math.pow(values[i], order);
	    }
	    return r1 / r2;
	}

	function standardDeviation(values, unbiased) {
	    return Math.sqrt(variance(values, unbiased));
	}

	function standardError(values) {
	    return standardDeviation(values) / Math.sqrt(values.length);
	}

	function median(values, alreadySorted) {
	    if (typeof(alreadySorted) === 'undefined') alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice();
	        values.sort();
	    }

	    var l = values.length;
	    var half = Math.floor(l / 2);
	    if (l % 2 === 0)
	        return (values[half - 1] + values[half]) * 0.5;
	    return values[half];
	}

	function quartiles(values, alreadySorted) {
	    if (typeof(alreadySorted) === 'undefined') alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice();
	        values.sort();
	    }

	    var quart = values.length / 4;
	    var q1 = values[Math.ceil(quart) - 1];
	    var q2 = median(values, true);
	    var q3 = values[Math.ceil(quart * 3) - 1];

	    return {q1: q1, q2: q2, q3: q3};
	}

	function variance(values, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var theMean = mean(values);
	    var theVariance = 0, l = values.length;

	    for (var i = 0; i < l; i++) {
	        var x = values[i] - theMean;
	        theVariance += x * x;
	    }

	    if (unbiased)
	        return theVariance / (l - 1);
	    else
	        return theVariance / l;
	}

	function pooledStandardDeviation(samples, unbiased) {
	    return Math.sqrt(pooledVariance(samples, unbiased));
	}

	function pooledVariance(samples, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var sum = 0;
	    var length = 0, l = samples.length;
	    for (var i = 0; i < l; i++) {
	        var values = samples[i];
	        var vari = variance(values);

	        sum += (values.length - 1) * vari;

	        if (unbiased)
	            length += values.length - 1;
	        else
	            length += values.length;
	    }
	    return sum / length;
	}

	function mode(values) {
	    var l = values.length,
	        itemCount = new Array(l),
	        i;
	    for (i = 0; i < l; i++) {
	        itemCount[i] = 0;
	    }
	    var itemArray = new Array(l);
	    var count = 0;

	    for (i = 0; i < l; i++) {
	        var index = itemArray.indexOf(values[i]);
	        if (index >= 0)
	            itemCount[index]++;
	        else {
	            itemArray[count] = values[i];
	            itemCount[count] = 1;
	            count++;
	        }
	    }

	    var maxValue = 0, maxIndex = 0;
	    for (i = 0; i < count; i++) {
	        if (itemCount[i] > maxValue) {
	            maxValue = itemCount[i];
	            maxIndex = i;
	        }
	    }

	    return itemArray[maxIndex];
	}

	function covariance(vector1, vector2, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var mean1 = mean(vector1);
	    var mean2 = mean(vector2);

	    if (vector1.length !== vector2.length)
	        throw "Vectors do not have the same dimensions";

	    var cov = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        var x = vector1[i] - mean1;
	        var y = vector2[i] - mean2;
	        cov += x * y;
	    }

	    if (unbiased)
	        return cov / (l - 1);
	    else
	        return cov / l;
	}

	function skewness(values, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var theMean = mean(values);

	    var s2 = 0, s3 = 0, l = values.length;
	    for (var i = 0; i < l; i++) {
	        var dev = values[i] - theMean;
	        s2 += dev * dev;
	        s3 += dev * dev * dev;
	    }
	    var m2 = s2 / l;
	    var m3 = s3 / l;

	    var g = m3 / (Math.pow(m2, 3 / 2.0));
	    if (unbiased) {
	        var a = Math.sqrt(l * (l - 1));
	        var b = l - 2;
	        return (a / b) * g;
	    }
	    else {
	        return g;
	    }
	}

	function kurtosis(values, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var theMean = mean(values);
	    var n = values.length, s2 = 0, s4 = 0;

	    for (var i = 0; i < n; i++) {
	        var dev = values[i] - theMean;
	        s2 += dev * dev;
	        s4 += dev * dev * dev * dev;
	    }
	    var m2 = s2 / n;
	    var m4 = s4 / n;

	    if (unbiased) {
	        var v = s2 / (n - 1);
	        var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
	        var b = s4 / (v * v);
	        var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));

	        return a * b - 3 * c;
	    }
	    else {
	        return m4 / (m2 * m2) - 3;
	    }
	}

	function entropy(values, eps) {
	    if (typeof(eps) === 'undefined') eps = 0;
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum += values[i] * Math.log(values[i] + eps);
	    return -sum;
	}

	function weightedMean(values, weights) {
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum += values[i] * weights[i];
	    return sum;
	}

	function weightedStandardDeviation(values, weights) {
	    return Math.sqrt(weightedVariance(values, weights));
	}

	function weightedVariance(values, weights) {
	    var theMean = weightedMean(values, weights);
	    var vari = 0, l = values.length;
	    var a = 0, b = 0;

	    for (var i = 0; i < l; i++) {
	        var z = values[i] - theMean;
	        var w = weights[i];

	        vari += w * (z * z);
	        b += w;
	        a += w * w;
	    }

	    return vari * (b / (b * b - a));
	}

	function center(values, inPlace) {
	    if (typeof(inPlace) === 'undefined') inPlace = false;

	    var result = values;
	    if (!inPlace)
	        result = values.slice();

	    var theMean = mean(result), l = result.length;
	    for (var i = 0; i < l; i++)
	        result[i] -= theMean;
	}

	function standardize(values, standardDev, inPlace) {
	    if (typeof(standardDev) === 'undefined') standardDev = standardDeviation(values);
	    if (typeof(inPlace) === 'undefined') inPlace = false;
	    var l = values.length;
	    var result = inPlace ? values : new Array(l);
	    for (var i = 0; i < l; i++)
	        result[i] = values[i] / standardDev;
	    return result;
	}

	function cumulativeSum(array) {
	    var l = array.length;
	    var result = new Array(l);
	    result[0] = array[0];
	    for (var i = 1; i < l; i++)
	        result[i] = result[i - 1] + array[i];
	    return result;
	}

	module.exports = {
	    min: min,
	    max: max,
	    minMax: minMax,
	    mean: mean,
	    geometricMean: geometricMean,
	    logGeometricMean: logGeometricMean,
	    grandMean: grandMean,
	    truncatedMean: truncatedMean,
	    contraHarmonicMean: contraHarmonicMean,
	    standardDeviation: standardDeviation,
	    standardError: standardError,
	    median: median,
	    quartiles: quartiles,
	    variance: variance,
	    pooledStandardDeviation: pooledStandardDeviation,
	    pooledVariance: pooledVariance,
	    mode: mode,
	    covariance: covariance,
	    skewness: skewness,
	    kurtosis: kurtosis,
	    entropy: entropy,
	    weightedMean: weightedMean,
	    weightedStandardDeviation: weightedStandardDeviation,
	    weightedVariance: weightedVariance,
	    center: center,
	    standardize: standardize,
	    cumulativeSum: cumulativeSum
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	// https://github.com/accord-net/framework/blob/development/Sources/Accord.Statistics/Tools.cs

	function entropy(matrix, eps) {
	    if (typeof(eps) === 'undefined') {
	        eps = 0;
	    }
	    var sum = 0,
	        l1 = matrix.length,
	        l2 = matrix[0].length;
	    for (var i = 0; i < l1; i++) {
	        for (var j = 0; j < l2; j++) {
	            sum += matrix[i][j] * Math.log(matrix[i][j] + eps);
	        }
	    }
	    return -sum;
	}

	function mean(matrix, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    var rows = matrix.length,
	        cols = matrix[0].length,
	        theMean, N, i, j;

	    if (dimension === -1) {
	        theMean = [0];
	        N = rows * cols;
	        for (i = 0; i < rows; i++) {
	            for (j = 0; j < cols; j++) {
	                theMean[0] += matrix[i][j];
	            }
	        }
	        theMean[0] /= N;
	    } else if (dimension === 0) {
	        theMean = new Array(cols);
	        N = rows;
	        for (j = 0; j < cols; j++) {
	            theMean[j] = 0;
	            for (i = 0; i < rows; i++) {
	                theMean[j] += matrix[i][j];
	            }
	            theMean[j] /= N;
	        }
	    } else if (dimension === 1) {
	        theMean = new Array(rows);
	        N = cols;
	        for (j = 0; j < rows; j++) {
	            theMean[j] = 0;
	            for (i = 0; i < cols; i++) {
	                theMean[j] += matrix[j][i];
	            }
	            theMean[j] /= N;
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }
	    return theMean;
	}

	function standardDeviation(matrix, means, unbiased) {
	    var vari = variance(matrix, means, unbiased), l = vari.length;
	    for (var i = 0; i < l; i++) {
	        vari[i] = Math.sqrt(vari[i]);
	    }
	    return vari;
	}

	function variance(matrix, means, unbiased) {
	    if (typeof(unbiased) === 'undefined') {
	        unbiased = true;
	    }
	    means = means || mean(matrix);
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length;
	    var vari = new Array(cols);

	    for (var j = 0; j < cols; j++) {
	        var sum1 = 0, sum2 = 0, x = 0;
	        for (var i = 0; i < rows; i++) {
	            x = matrix[i][j] - means[j];
	            sum1 += x;
	            sum2 += x * x;
	        }
	        if (unbiased) {
	            vari[j] = (sum2 - ((sum1 * sum1) / rows)) / (rows - 1);
	        } else {
	            vari[j] = (sum2 - ((sum1 * sum1) / rows)) / rows;
	        }
	    }
	    return vari;
	}

	function median(matrix) {
	    var rows = matrix.length, cols = matrix[0].length;
	    var medians = new Array(cols);

	    for (var i = 0; i < cols; i++) {
	        var data = new Array(rows);
	        for (var j = 0; j < rows; j++) {
	            data[j] = matrix[j][i];
	        }
	        data.sort();
	        var N = data.length;
	        if (N % 2 === 0) {
	            medians[i] = (data[N / 2] + data[(N / 2) - 1]) * 0.5;
	        } else {
	            medians[i] = data[Math.floor(N / 2)];
	        }
	    }
	    return medians;
	}

	function mode(matrix) {
	    var rows = matrix.length,
	        cols = matrix[0].length,
	        modes = new Array(cols),
	        i, j;
	    for (i = 0; i < cols; i++) {
	        var itemCount = new Array(rows);
	        for (var k = 0; k < rows; k++) {
	            itemCount[k] = 0;
	        }
	        var itemArray = new Array(rows);
	        var count = 0;

	        for (j = 0; j < rows; j++) {
	            var index = itemArray.indexOf(matrix[j][i]);
	            if (index >= 0) {
	                itemCount[index]++;
	            } else {
	                itemArray[count] = matrix[j][i];
	                itemCount[count] = 1;
	                count++;
	            }
	        }

	        var maxValue = 0, maxIndex = 0;
	        for (j = 0; j < count; j++) {
	            if (itemCount[j] > maxValue) {
	                maxValue = itemCount[j];
	                maxIndex = j;
	            }
	        }

	        modes[i] = itemArray[maxIndex];
	    }
	    return modes;
	}

	function skewness(matrix, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var means = mean(matrix);
	    var n = matrix.length, l = means.length;
	    var skew = new Array(l);

	    for (var j = 0; j < l; j++) {
	        var s2 = 0, s3 = 0;
	        for (var i = 0; i < n; i++) {
	            var dev = matrix[i][j] - means[j];
	            s2 += dev * dev;
	            s3 += dev * dev * dev;
	        }

	        var m2 = s2 / n;
	        var m3 = s3 / n;
	        var g = m3 / Math.pow(m2, 3 / 2);

	        if (unbiased) {
	            var a = Math.sqrt(n * (n - 1));
	            var b = n - 2;
	            skew[j] = (a / b) * g;
	        } else {
	            skew[j] = g;
	        }
	    }
	    return skew;
	}

	function kurtosis(matrix, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var means = mean(matrix);
	    var n = matrix.length, m = matrix[0].length;
	    var kurt = new Array(m);

	    for (var j = 0; j < m; j++) {
	        var s2 = 0, s4 = 0;
	        for (var i = 0; i < n; i++) {
	            var dev = matrix[i][j] - means[j];
	            s2 += dev * dev;
	            s4 += dev * dev * dev * dev;
	        }
	        var m2 = s2 / n;
	        var m4 = s4 / n;

	        if (unbiased) {
	            var v = s2 / (n - 1);
	            var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
	            var b = s4 / (v * v);
	            var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));
	            kurt[j] = a * b - 3 * c;
	        } else {
	            kurt[j] = m4 / (m2 * m2) - 3;
	        }
	    }
	    return kurt;
	}

	function standardError(matrix) {
	    var samples = matrix.length;
	    var standardDeviations = standardDeviation(matrix), l = standardDeviations.length;
	    var standardErrors = new Array(l);
	    var sqrtN = Math.sqrt(samples);

	    for (var i = 0; i < l; i++) {
	        standardErrors[i] = standardDeviations[i] / sqrtN;
	    }
	    return standardErrors;
	}

	function covariance(matrix, dimension) {
	    return scatter(matrix, undefined, dimension);
	}

	function scatter(matrix, divisor, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    if (typeof(divisor) === 'undefined') {
	        if (dimension === 0) {
	            divisor = matrix.length - 1;
	        } else if (dimension === 1) {
	            divisor = matrix[0].length - 1;
	        }
	    }
	    var means = mean(matrix, dimension),
	        rows = matrix.length;
	    if (rows === 0) {
	        return [[]];
	    }
	    var cols = matrix[0].length,
	        cov, i, j, s, k;

	    if (dimension === 0) {
	        cov = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            cov[i] = new Array(cols);
	        }
	        for (i = 0; i < cols; i++) {
	            for (j = i; j < cols; j++) {
	                s = 0;
	                for (k = 0; k < rows; k++) {
	                    s += (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
	                }
	                s /= divisor;
	                cov[i][j] = s;
	                cov[j][i] = s;
	            }
	        }
	    } else if (dimension === 1) {
	        cov = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            cov[i] = new Array(rows);
	        }
	        for (i = 0; i < rows; i++) {
	            for (j = i; j < rows; j++) {
	                s = 0;
	                for (k = 0; k < cols; k++) {
	                    s += (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
	                }
	                s /= divisor;
	                cov[i][j] = s;
	                cov[j][i] = s;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    return cov;
	}

	function correlation(matrix) {
	    var means = mean(matrix),
	        standardDeviations = standardDeviation(matrix, true, means),
	        scores = zScores(matrix, means, standardDeviations),
	        rows = matrix.length,
	        cols = matrix[0].length,
	        i, j;

	    var cor = new Array(cols);
	    for (i = 0; i < cols; i++) {
	        cor[i] = new Array(cols);
	    }
	    for (i = 0; i < cols; i++) {
	        for (j = i; j < cols; j++) {
	            var c = 0;
	            for (var k = 0, l = scores.length; k < l; k++) {
	                c += scores[k][j] * scores[k][i];
	            }
	            c /= rows - 1;
	            cor[i][j] = c;
	            cor[j][i] = c;
	        }
	    }
	    return cor;
	}

	function zScores(matrix, means, standardDeviations) {
	    means = means || mean(matrix);
	    if (typeof(standardDeviations) === 'undefined') standardDeviations = standardDeviation(matrix, true, means);
	    return standardize(center(matrix, means, false), standardDeviations, true);
	}

	function center(matrix, means, inPlace) {
	    means = means || mean(matrix);
	    var result = matrix,
	        l = matrix.length,
	        i, j, jj;

	    if (!inPlace) {
	        result = new Array(l);
	        for (i = 0; i < l; i++) {
	            result[i] = new Array(matrix[i].length);
	        }
	    }

	    for (i = 0; i < l; i++) {
	        var row = result[i];
	        for (j = 0, jj = row.length; j < jj; j++) {
	            row[j] = matrix[i][j] - means[j];
	        }
	    }
	    return result;
	}

	function standardize(matrix, standardDeviations, inPlace) {
	    if (typeof(standardDeviations) === 'undefined') standardDeviations = standardDeviation(matrix);
	    var result = matrix,
	        l = matrix.length,
	        i, j, jj;

	    if (!inPlace) {
	        result = new Array(l);
	        for (i = 0; i < l; i++) {
	            result[i] = new Array(matrix[i].length);
	        }
	    }

	    for (i = 0; i < l; i++) {
	        var resultRow = result[i];
	        var sourceRow = matrix[i];
	        for (j = 0, jj = resultRow.length; j < jj; j++) {
	            if (standardDeviations[j] !== 0 && !isNaN(standardDeviations[j])) {
	                resultRow[j] = sourceRow[j] / standardDeviations[j];
	            }
	        }
	    }
	    return result;
	}

	function weightedVariance(matrix, weights) {
	    var means = mean(matrix);
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length;
	    var vari = new Array(cols);

	    for (var j = 0; j < cols; j++) {
	        var sum = 0;
	        var a = 0, b = 0;

	        for (var i = 0; i < rows; i++) {
	            var z = matrix[i][j] - means[j];
	            var w = weights[i];

	            sum += w * (z * z);
	            b += w;
	            a += w * w;
	        }

	        vari[j] = sum * (b / (b * b - a));
	    }

	    return vari;
	}

	function weightedMean(matrix, weights, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length,
	        means, i, ii, j, w, row;

	    if (dimension === 0) {
	        means = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            means[i] = 0;
	        }
	        for (i = 0; i < rows; i++) {
	            row = matrix[i];
	            w = weights[i];
	            for (j = 0; j < cols; j++) {
	                means[j] += row[j] * w;
	            }
	        }
	    } else if (dimension === 1) {
	        means = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            means[i] = 0;
	        }
	        for (j = 0; j < rows; j++) {
	            row = matrix[j];
	            w = weights[j];
	            for (i = 0; i < cols; i++) {
	                means[j] += row[i] * w;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    var weightSum = sum(weights);
	    if (weightSum !== 0) {
	        for (i = 0, ii = means.length; i < ii; i++) {
	            means[i] /= weightSum;
	        }
	    }
	    return means;
	}

	function weightedCovariance(matrix, weights, means, dimension) {
	    dimension = dimension || 0;
	    means = means || weightedMean(matrix, weights, dimension);
	    var s1 = 0, s2 = 0;
	    for (var i = 0, ii = weights.length; i < ii; i++) {
	        s1 += weights[i];
	        s2 += weights[i] * weights[i];
	    }
	    var factor = s1 / (s1 * s1 - s2);
	    return weightedScatter(matrix, weights, means, factor, dimension);
	}

	function weightedScatter(matrix, weights, means, factor, dimension) {
	    dimension = dimension || 0;
	    means = means || weightedMean(matrix, weights, dimension);
	    if (typeof(factor) === 'undefined') {
	        factor = 1;
	    }
	    var rows = matrix.length;
	    if (rows === 0) {
	        return [[]];
	    }
	    var cols = matrix[0].length,
	        cov, i, j, k, s;

	    if (dimension === 0) {
	        cov = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            cov[i] = new Array(cols);
	        }
	        for (i = 0; i < cols; i++) {
	            for (j = i; j < cols; j++) {
	                s = 0;
	                for (k = 0; k < rows; k++) {
	                    s += weights[k] * (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
	                }
	                cov[i][j] = s * factor;
	                cov[j][i] = s * factor;
	            }
	        }
	    } else if (dimension === 1) {
	        cov = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            cov[i] = new Array(rows);
	        }
	        for (i = 0; i < rows; i++) {
	            for (j = i; j < rows; j++) {
	                s = 0;
	                for (k = 0; k < cols; k++) {
	                    s += weights[k] * (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
	                }
	                cov[i][j] = s * factor;
	                cov[j][i] = s * factor;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    return cov;
	}

	// private
	function sum(vector) {
	    var sum = 0, l = vector.length;
	    for (var i = 0; i < l; i++) {
	        sum += vector[i];
	    }
	    return sum;
	}

	module.exports = {
	    entropy: entropy,
	    mean: mean,
	    standardDeviation: standardDeviation,
	    variance: variance,
	    median: median,
	    mode: mode,
	    skewness: skewness,
	    kurtosis: kurtosis,
	    standardError: standardError,
	    covariance: covariance,
	    scatter: scatter,
	    correlation: correlation,
	    zScores: zScores,
	    center: center,
	    standardize: standardize,
	    weightedVariance: weightedVariance,
	    weightedMean: weightedMean,
	    weightedCovariance: weightedCovariance,
	    weightedScatter: weightedScatter
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(9);
	module.exports.Decompositions = module.exports.DC = __webpack_require__(10);


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var Asplice = Array.prototype.splice,
	    Aconcat = Array.prototype.concat;

	// For performance : http://jsperf.com/clone-array-slice-vs-while-vs-for
	function slice(arr) {
	    var i = 0,
	        ii = arr.length,
	        result = new Array(ii);
	    for (; i < ii; i++) {
	        result[i] = arr[i];
	    }
	    return result;
	}

	/**
	 * Real matrix.
	 * @constructor
	 * @param {number|Array} nRows - Number of rows of the new matrix or a 2D array containing the data.
	 * @param {number|boolean} [nColumns] - Number of columns of the new matrix or a boolean specifying if the input array should be cloned
	 */
	function Matrix(nRows, nColumns) {
	    var i = 0, rows, columns, matrix, newInstance;
	    if (Array.isArray(nRows)) {
	        newInstance = nColumns;
	        matrix = newInstance ? slice(nRows) : nRows;
	        nRows = matrix.length;
	        nColumns = matrix[0].length;
	        if (typeof nColumns === 'undefined') {
	            throw new TypeError('Data must be a 2D array');
	        }
	        if (nRows > 0 && nColumns > 0) {
	            for (; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                } else if (newInstance) {
	                    matrix[i] = slice(matrix[i]);
	                }
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else if (typeof nRows === 'number') { // Create empty matrix
	        if (nRows > 0 && nColumns > 0) {
	            matrix = new Array(nRows);
	            for (; i < nRows; i++) {
	                matrix[i] = new Array(nColumns);
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else {
	        throw new TypeError('Invalid arguments');
	    }

	    Object.defineProperty(matrix, 'rows', {writable: true, value: nRows});
	    Object.defineProperty(matrix, 'columns', {writable: true, value: nColumns});

	    matrix.__proto__ = Matrix.prototype;

	    return matrix;
	}

	/**
	 * Constructs a Matrix with the chosen dimensions from a 1D array.
	 * @param {number} newRows - Number of rows
	 * @param {number} newColumns - Number of columns
	 * @param {Array} newData - A 1D array containing data for the matrix
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.from1DArray = function from1DArray(newRows, newColumns, newData) {
	    var length, data, i = 0;

	    length = newRows * newColumns;
	    if (length !== newData.length)
	        throw new RangeError('Data length does not match given dimensions');

	    data = new Array(newRows);
	    for (; i < newRows; i++) {
	        data[i] = newData.slice(i * newColumns, (i + 1) * newColumns);
	    }
	    return new Matrix(data);
	};

	/**
	 * Creates a row vector, a matrix with only one row.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.rowVector = function rowVector(newData) {
	    return new Matrix([newData]);
	};

	/**
	 * Creates a column vector, a matrix with only one column.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.columnVector = function columnVector(newData) {
	    var l = newData.length, vector = new Array(l);
	    for (var i = 0; i < l; i++)
	        vector[i] = [newData[i]];
	    return new Matrix(vector);
	};

	/**
	 * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.empty = function empty(rows, columns) {
	    return new Matrix(rows, columns);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to zero.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.zeros = function zeros(rows, columns) {
	    return Matrix.empty(rows, columns).fill(0);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to one.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.ones = function ones(rows, columns) {
	    return Matrix.empty(rows, columns).fill(1);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be randomly set using Math.random().
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} The new matrix
	 */
	Matrix.rand = function rand(rows, columns) {
	    var matrix = Matrix.empty(rows, columns);
	    for (var i = 0, ii = matrix.rows; i < ii; i++) {
	        for (var j = 0, jj = matrix.columns; j < jj; j++) {
	            matrix[i][j] = Math.random();
	        }
	    }
	    return matrix;
	};

	/**
	 * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and other will be 0.
	 * @param {number} n - Number of rows and columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.eye = function eye(n) {
	    var matrix = Matrix.zeros(n, n), l = matrix.rows;
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = 1;
	    }
	    return matrix;
	};

	/**
	 * Creates a diagonal matrix based on the given array.
	 * @param {Array} data - Array containing the data for the diagonal
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.diag = function diag(data) {
	    var l = data.length, matrix = Matrix.zeros(l, l);
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = data[i];
	    }
	    return matrix;
	};

	/**
	 * Creates an array of indices between two values
	 * @param {number} from
	 * @param {number} to
	 * @returns {Array}
	 */
	Matrix.indices = function indices(from, to) {
	    var vector = new Array(to - from);
	    for (var i = 0; i < vector.length; i++)
	        vector[i] = from++;
	    return vector;
	};

	// TODO DOC
	Matrix.stack = function stack(arg1) {
	    var i, j, k;
	    if (Matrix.isMatrix(arg1)) {
	        var rows = 0,
	            cols = 0;
	        for (i = 0; i < arguments.length; i++) {
	            rows += arguments[i].rows;
	            if (arguments[i].columns > cols)
	                cols = arguments[i].columns;
	        }

	        var r = Matrix.zeros(rows, cols);
	        var c = 0;
	        for (i = 0; i < arguments.length; i++) {
	            var current = arguments[i];
	            for (j = 0; j < current.rows; j++) {
	                for (k = 0; k < current.columns; k++)
	                    r[c][k] = current[j][k];
	                c++;
	            }
	        }
	        return r;
	    }
	    else if (Array.isArray(arg1)) {
	        var matrix = Matrix.empty(arguments.length, arg1.length);
	        for (i = 0; i < arguments.length; i++)
	            matrix.setRow(i, arguments[i]);
	        return matrix;
	    }
	};

	// TODO DOC
	Matrix.expand = function expand(base, count) {
	    var expansion = [];
	    for (var i = 0; i < count.length; i++)
	        for (var j = 0; j < count[i]; j++)
	            expansion.push(base[i]);
	    return new Matrix(expansion);
	};

	/**
	 * Check that the provided value is a Matrix and tries to instantiate one if not
	 * @param value - The value to check
	 * @returns {Matrix}
	 * @throws {TypeError}
	 */
	Matrix.checkMatrix = function checkMatrix(value) {
	    if (!value) {
	        throw new TypeError('Argument has to be a matrix');
	    }
	    if (value.klass !== 'Matrix') {
	        value = new Matrix(value);
	    }
	    return value;
	};

	/**
	 * Returns true if the argument is a Matrix, false otherwise
	 * @param value - The value to check
	 * @returns {boolean}
	 */
	Matrix.isMatrix = function isMatrix(value) {
	    return value ? value.klass === 'Matrix' : false;
	};

	/**
	 * @property {string} - The name of this class.
	 */
	Object.defineProperty(Matrix.prototype, 'klass', {
	    get: function klass() {
	        return 'Matrix';
	    }
	});

	/**
	 * @property {number} - The number of elements in the matrix.
	 */
	Object.defineProperty(Matrix.prototype, 'size', {
	    get: function size() {
	        return this.rows * this.columns;
	    }
	});

	/**
	 * @private
	 * Internal check that a row index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkRowIndex = function checkRowIndex(index) {
	    if (index < 0 || index > this.rows - 1)
	        throw new RangeError('Row index out of range.');
	};

	/**
	 * @private
	 * Internal check that a column index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkColumnIndex = function checkColumnIndex(index) {
	    if (index < 0 || index > this.columns - 1)
	        throw new RangeError('Column index out of range.');
	};

	/**
	 * @private
	 * Internal check that two matrices have the same dimensions
	 * @param {Matrix} otherMatrix
	 */
	Matrix.prototype.checkDimensions = function checkDimensions(otherMatrix) {
	    if ((this.rows !== otherMatrix.rows) || (this.columns !== otherMatrix.columns))
	        throw new RangeError('Matrices dimensions must be equal.');
	};

	/**
	 * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	 * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.apply = function apply(callback) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            callback.call(this, i, j);
	        }
	    }
	    return this;
	};

	/**
	 * Creates an exact and independent copy of the matrix
	 * @returns {Matrix}
	 */
	Matrix.prototype.clone = function clone() {
	    return new Matrix(this.to2DArray());
	};

	/**
	 * Returns a new 1D array filled row by row with the matrix values
	 * @returns {Array}
	 */
	Matrix.prototype.to1DArray = function to1DArray() {
	    return Aconcat.apply([], this);
	};

	/**
	 * Returns a 2D array containing a copy of the data
	 * @returns {Array}
	 */
	Matrix.prototype.to2DArray = function to2DArray() {
	    var l = this.rows, copy = new Array(l);
	    for (var i = 0; i < l; i++) {
	        copy[i] = slice(this[i]);
	    }
	    return copy;
	};

	/**
	 * @returns {boolean} true if the matrix has one row
	 */
	Matrix.prototype.isRowVector = function isRowVector() {
	    return this.rows === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one column
	 */
	Matrix.prototype.isColumnVector = function isColumnVector() {
	    return this.columns === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one row or one column
	 */
	Matrix.prototype.isVector = function isVector() {
	    return (this.rows === 1) || (this.columns === 1);
	};

	/**
	 * @returns {boolean} true if the matrix has the same number of rows and columns
	 */
	Matrix.prototype.isSquare = function isSquare() {
	    return this.rows === this.columns;
	};

	/**
	 * @returns {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	 */
	Matrix.prototype.isSymmetric = function isSymmetric() {
	    if (this.isSquare()) {
	        var l = this.rows;
	        for (var i = 0; i < l; i++) {
	            for (var j = 0; j <= i; j++) {
	                if (this[i][j] !== this[j][i]) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    }
	    return false;
	};

	/**
	 * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @param {number} value - The new value for the element
	 * @returns {Matrix} this
	 */
	Matrix.prototype.set = function set(rowIndex, columnIndex, value) {
	    this[rowIndex][columnIndex] = value;
	    return this;
	};

	/**
	 * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @returns {number}
	 */
	Matrix.prototype.get = function get(rowIndex, columnIndex) {
	    return this[rowIndex][columnIndex];
	};

	/**
	 * Fills the matrix with a given value. All elements will be set to this value.
	 * @param {number} value - New value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.fill = function fill(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = value;
	        }
	    }
	    return this;
	};

	/**
	 * Negates the matrix. All elements will be multiplied by (-1)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.neg = function neg() {
	    return this.mulS(-1);
	};

	/**
	 * Adds a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.add = function add(value) {
	    if (typeof value === 'number')
	        return this.addS(value);
	    value = Matrix.checkMatrix(value);
	        return this.addM(value);
	};

	/**
	 * Adds a scalar to each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addS = function addS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += value;
	        }
	    }
	    return this;
	};

	/**
	 * Adds the value of each element of matrix to the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addM = function addM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sub = function sub(value) {
	    if (typeof value === 'number')
	        return this.subS(value);
	    value = Matrix.checkMatrix(value);
	        return this.subM(value);
	};

	/**
	 * Subtracts a scalar from each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subS = function subS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= value;
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the value of each element of matrix from the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subM = function subM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mul = function mul(value) {
	    if (typeof value === 'number')
	        return this.mulS(value);
	    value = Matrix.checkMatrix(value);
	        return this.mulM(value);
	};

	/**
	 * Multiplies a scalar with each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulS = function mulS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= value;
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the value of each element of matrix with the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulM = function mulM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides by a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.div = function div(value) {
	    if (typeof value === 'number')
	        return this.divS(value);
	    value = Matrix.checkMatrix(value);
	        return this.divM(value);
	};

	/**
	 * Divides each element of the matrix by a scalar
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divS = function divS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= value;
	        }
	    }
	    return this;
	};

	/**
	 * Divides each element of this by the corresponding element of matrix
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divM = function divM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Returns a new array from the given row index
	 * @param {number} index - Row index
	 * @returns {Array}
	 */
	Matrix.prototype.getRow = function getRow(index) {
	    this.checkRowIndex(index);
	    return slice(this[index]);
	};

	/**
	 * Returns a new row vector from the given row index
	 * @param {number} index - Row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getRowVector = function getRowVector(index) {
	    return Matrix.rowVector(this.getRow(index));
	};

	/**
	 * Sets a row at the given index
	 * @param {number} index - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setRow = function setRow(index, array) {
	    this.checkRowIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    this[index] = slice(array);
	    return this;
	};

	/**
	 * Removes a row from the given index
	 * @param {number} index - Row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeRow = function removeRow(index) {
	    this.checkRowIndex(index);
	    if (this.rows === 1)
	        throw new RangeError('A matrix cannot have less than one row');
	    Asplice.call(this, index, 1);
	    this.rows -= 1;
	    return this;
	};

	/**
	 * Adds a row at the given index
	 * @param {number} [index = this.rows] - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRow = function addRow(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.rows;
	    }
	    if (index < 0 || index > this.rows)
	        throw new RangeError('Row index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    Asplice.call(this, index, 0, slice(array));
	    this.rows += 1;
	    return this;
	};

	/**
	 * Swaps two rows
	 * @param {number} row1 - First row index
	 * @param {number} row2 - Second row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapRows = function swapRows(row1, row2) {
	    this.checkRowIndex(row1);
	    this.checkRowIndex(row2);
	    var temp = this[row1];
	    this[row1] = this[row2];
	    this[row2] = temp;
	    return this;
	};

	/**
	 * Returns a new array from the given column index
	 * @param {number} index - Column index
	 * @returns {Array}
	 */
	Matrix.prototype.getColumn = function getColumn(index) {
	    this.checkColumnIndex(index);
	    var l = this.rows, column = new Array(l);
	    for (var i = 0; i < l; i++) {
	        column[i] = this[i][index];
	    }
	    return column;
	};

	/**
	 * Returns a new column vector from the given column index
	 * @param {number} index - Column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getColumnVector = function getColumnVector(index) {
	    return Matrix.columnVector(this.getColumn(index));
	};

	/**
	 * Sets a column at the given index
	 * @param {number} index - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setColumn = function setColumn(index, array) {
	    this.checkColumnIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i][index] = array[i];
	    }
	    return this;
	};

	/**
	 * Removes a column from the given index
	 * @param {number} index - Column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeColumn = function removeColumn(index) {
	    this.checkColumnIndex(index);
	    if (this.columns === 1)
	        throw new RangeError('A matrix cannot have less than one column');
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].splice(index, 1);
	    }
	    this.columns -= 1;
	    return this;
	};

	/**
	 * Adds a column at the given index
	 * @param {number} [index = this.columns] - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumn = function addColumn(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.columns;
	    }
	    if (index < 0 || index > this.columns)
	        throw new RangeError('Column index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i].splice(index, 0, array[i]);
	    }
	    this.columns += 1;
	    return this;
	};

	/**
	 * Swaps two columns
	 * @param {number} column1 - First column index
	 * @param {number} column2 - Second column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapColumns = function swapColumns(column1, column2) {
	    this.checkRowIndex(column1);
	    this.checkRowIndex(column2);
	    var l = this.rows, temp, row;
	    for (var i = 0; i < l; i++) {
	        row = this[i];
	        temp = row[column1];
	        row[column1] = row[column2];
	        row[column2] = temp;
	    }
	    return this;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkRowVector = function checkRowVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.columns)
	        throw new RangeError('vector size must be the same as the number of columns');
	    return vector;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkColumnVector = function checkColumnVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.rows)
	        throw new RangeError('vector size must be the same as the number of rows');
	    return vector;
	};

	/**
	 * Adds the values of a vector to each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRowVector = function addRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subRowVector = function subRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRowVector = function mulRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each row by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divRowVector = function divRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Adds the values of a vector to each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumnVector = function addColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subColumnVector = function subColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumnVector = function mulColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each column by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divColumnVector = function divColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a row with a scalar
	 * @param {number} index - Row index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRow = function mulRow(index, value) {
	    this.checkRowIndex(index);
	    var i = 0, l = this.columns;
	    for (; i < l; i++) {
	        this[index][i] *= value;
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a column with a scalar
	 * @param {number} index - Column index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumn = function mulColumn(index, value) {
	    this.checkColumnIndex(index);
	    var i = 0, l = this.rows;
	    for (; i < l; i++) {
	        this[i][index] *= value;
	    }
	};

	/**
	 * A matrix index
	 * @typedef {Object} MatrixIndex
	 * @property {number} row
	 * @property {number} column
	 */

	/**
	 * Returns the maximum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.max = function max() {
	    var v = -Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxIndex = function maxIndex() {
	    var v = -Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.min = function min() {
	    var v = Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minIndex = function minIndex() {
	    var v = Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.maxRow = function maxRow(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxRowIndex = function maxRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    var idx = {
	            row: index
	        };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.minRow = function minRow(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minRowIndex = function minRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: index,
	        column: 0
	    };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.maxColumn = function maxColumn(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxColumnIndex = function maxColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.minColumn = function minColumn(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minColumnIndex = function minColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns an array containing the diagonal values of the matrix
	 * @returns {Array}
	 */
	Matrix.prototype.diag = function diag() {
	    if (!this.isSquare())
	        throw new TypeError('Only square matrices have a diagonal.');
	    var diag = new Array(this.rows);
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        diag[i] = this[i][i];
	    }
	    return diag;
	};

	/**
	 * Returns the sum of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.sum = function sum() {
	    var v = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            v += this[i][j];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the mean of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.mean = function mean() {
	    return this.sum() / this.size;
	};

	/**
	 * Returns the product of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.prod = function prod() {
	    var prod = 1;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            prod *= this[i][j];
	        }
	    }
	    return prod;
	};

	/**
	 * Computes the cumulative sum of the matrix elements (in place, row by row)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.cumulativeSum = function cumulativeSum() {
	    var sum = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            sum += this[i][j];
	            this[i][j] = sum;
	        }
	    }
	    return this;
	};

	/**
	 * Computes the dot (scalar) product between the matrix and another
	 * @param {Matrix} other vector
	 * @returns {number}
	 */
	Matrix.prototype.dot = function dot(other) {
	    if (this.size !== other.size)
	        throw new RangeError('vectors do not have the same size');
	    var vector1 = this.to1DArray();
	    var vector2 = other.to1DArray();
	    var dot = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        dot += vector1[i] * vector2[i];
	    }
	    return dot;
	};

	/**
	 * Returns the matrix product between this and other
	 * @returns {Matrix}
	 */
	Matrix.prototype.mmul = function mmul(other) {
	    if (!Matrix.isMatrix(other))
	        throw new TypeError('parameter "other" must be a matrix');
	    if (this.columns !== other.rows)
	        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

	    var m = this.rows, n = this.columns, p = other.columns;
	    var result = new Matrix(m, p);

	    var Bcolj = new Array(n);
	    var i, j, k;
	    for (j = 0; j < p; j++) {
	        for (k = 0; k < n; k++)
	            Bcolj[k] = other[k][j];

	        for (i = 0; i < m; i++) {
	            var Arowi = this[i];

	            var s = 0;
	            for (k = 0; k < n; k++)
	                s += Arowi[k] * Bcolj[k];

	            result[i][j] = s;
	        }
	    }
	    return result;
	};

	/**
	 * Sorts the rows (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortRows = function sortRows(compareFunction) {
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].sort(compareFunction);
	    }
	    return this;
	};

	/**
	 * Sorts the columns (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortColumns = function sortColumns(compareFunction) {
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        this.setColumn(i, this.getColumn(i).sort(compareFunction));
	    }
	    return this;
	};

	/**
	 * Transposes the matrix and returns a new one containing the result
	 * @returns {Matrix}
	 */
	Matrix.prototype.transpose = function transpose() {
	    var result = new Matrix(this.columns, this.rows);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[j][i] = this[i][j];
	        }
	    }
	    return result;
	};

	/**
	 * Returns a subset of the matrix
	 * @param {number} startRow - First row index
	 * @param {number} endRow - Last row index
	 * @param {number} startColumn - First column index
	 * @param {number} endColumn - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrix = function subMatrix(startRow, endRow, startColumn, endColumn) {
	    if ((startRow > endRow) || (startColumn > endColumn) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range');
	    var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
	    for (var i = startRow; i <= endRow; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            newMatrix[i - startRow][j - startColumn] = this[i][j];
	        }
	    }
	    return newMatrix;
	};

	/**
	 * Returns a subset of the matrix based on an array of row indices
	 * @param {Array} indices - Array containing the row indices
	 * @param {number} [startColumn = 0] - First column index
	 * @param {number} [endColumn = this.columns-1] - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixRow = function subMatrixRow(indices, startColumn, endColumn) {
	    if (typeof startColumn === 'undefined') {
	        startColumn = 0;
	        endColumn = this.columns - 1;
	    } else if (typeof endColumn === 'undefined') {
	        endColumn = this.columns - 1;
	    }
	    if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, rows = this.rows,
	        X = new Matrix(l, endColumn - startColumn + 1);
	    for (var i = 0; i < l; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            if ((indices[i] < 0) || (indices[i] >= rows))
	                throw new RangeError('Argument out of range.');
	            X[i][j - startColumn] = this[indices[i]][j];
	        }
	    }
	    return X;
	};

	/**
	 * Returns a subset of the matrix based on an array of column indices
	 * @param {Array} indices - Array containing the column indices
	 * @param {number} [startRow = 0] - First row index
	 * @param {number} [endRow = this.rows-1] - Last row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixColumn = function subMatrixColumn(indices, startRow, endRow) {
	    if (typeof startRow === 'undefined') {
	        startRow = 0;
	        endRow = this.rows - 1;
	    } else if (typeof endRow === 'undefined') {
	        endRow = this.rows - 1;
	    }
	    if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, columns = this.columns,
	        X = new Matrix(endRow - startRow + 1, l);
	    for (var i = 0; i < l; i++) {
	        for (var j = startRow; j <= endRow; j++) {
	            if ((indices[i] < 0) || (indices[i] >= columns))
	                throw new RangeError('Argument out of range.');
	            X[j - startRow][i] = this[j][indices[i]];
	        }
	    }
	    return X;
	};

	/**
	 * Returns the trace of the matrix (sum of the diagonal elements)
	 * @returns {number}
	 */
	Matrix.prototype.trace = function trace() {
	    if (!this.isSquare())
	        throw new TypeError('The matrix is not square');
	    var trace = 0, i = 0, l = this.rows;
	    for (; i < l; i++) {
	        trace += this[i][i];
	    }
	    return trace;
	};

	/**
	 * Sets each element of the matrix to its absolute value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.abs = function abs() {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = Math.abs(this[i][j]);
	        }
	    }
	};

	module.exports = Matrix;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(9);

	var SingularValueDecomposition = __webpack_require__(11);
	var EigenvalueDecomposition = __webpack_require__(13);
	var LuDecomposition = __webpack_require__(14);
	var QrDecomposition = __webpack_require__(15);
	var CholeskyDecomposition = __webpack_require__(16);

	function inverse(matrix) {
	    return solve(matrix, Matrix.eye(matrix.rows));
	}

	Matrix.prototype.inverse = function () {
	    return inverse(this);
	};

	function solve(leftHandSide, rightHandSide) {
	    return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
	}

	Matrix.prototype.solve = function (other) {
	    return solve(this, other);
	};

	module.exports = {
	    SingularValueDecomposition: SingularValueDecomposition,
	    SVD: SingularValueDecomposition,
	    EigenvalueDecomposition: EigenvalueDecomposition,
	    EVD: EigenvalueDecomposition,
	    LuDecomposition: LuDecomposition,
	    LU: LuDecomposition,
	    QrDecomposition: QrDecomposition,
	    QR: QrDecomposition,
	    CholeskyDecomposition: CholeskyDecomposition,
	    CHO: CholeskyDecomposition,
	    inverse: inverse,
	    solve: solve
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(9);
	var hypotenuse = __webpack_require__(12).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	function SingularValueDecomposition(value, options) {
	    if (!(this instanceof SingularValueDecomposition)) {
	        return new SingularValueDecomposition(value, options);
	    }
	    value = Matrix.checkMatrix(value);

	    options = options || {};

	    var a = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        nu = Math.min(m, n);

	    var wantu = true, wantv = true;
	    if (options.computeLeftSingularVectors === false)
	        wantu = false;
	    if (options.computeRightSingularVectors === false)
	        wantv = false;
	    var autoTranspose = options.autoTranspose === true;

	    var swapped = false;
	    if (m < n) {
	        if (!autoTranspose) {
	            console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	        } else {
	            a = a.transpose();
	            m = a.rows;
	            n = a.columns;
	            swapped = true;
	            var aux = wantu;
	            wantu = wantv;
	            wantv = aux;
	        }
	    }

	    var s = new Array(Math.min(m + 1, n)),
	        U = Matrix.zeros(m, nu),
	        V = Matrix.zeros(n, n),
	        e = new Array(n),
	        work = new Array(m);

	    var nct = Math.min(m - 1, n);
	    var nrt = Math.max(0, Math.min(n - 2, m));

	    var i, j, k, p, t, ks, f, cs, sn, max, kase,
	        scale, sp, spm1, epm1, sk, ek, b, c, shift, g;

	    for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	        if (k < nct) {
	            s[k] = 0;
	            for (i = k; i < m; i++) {
	                s[k] = hypotenuse(s[k], a[i][k]);
	            }
	            if (s[k] !== 0) {
	                if (a[k][k] < 0) {
	                    s[k] = -s[k];
	                }
	                for (i = k; i < m; i++) {
	                    a[i][k] /= s[k];
	                }
	                a[k][k] += 1;
	            }
	            s[k] = -s[k];
	        }

	        for (j = k + 1; j < n; j++) {
	            if ((k < nct) && (s[k] !== 0)) {
	                t = 0;
	                for (i = k; i < m; i++) {
	                    t += a[i][k] * a[i][j];
	                }
	                t = -t / a[k][k];
	                for (i = k; i < m; i++) {
	                    a[i][j] += t * a[i][k];
	                }
	            }
	            e[j] = a[k][j];
	        }

	        if (wantu && (k < nct)) {
	            for (i = k; i < m; i++) {
	                U[i][k] = a[i][k];
	            }
	        }

	        if (k < nrt) {
	            e[k] = 0;
	            for (i = k + 1; i < n; i++) {
	                e[k] = hypotenuse(e[k], e[i]);
	            }
	            if (e[k] !== 0) {
	                if (e[k + 1] < 0)
	                    e[k] = -e[k];
	                for (i = k + 1; i < n; i++) {
	                    e[i] /= e[k];
	                }
	                e[k + 1] += 1;
	            }
	            e[k] = -e[k];
	            if ((k + 1 < m) && (e[k] !== 0)) {
	                for (i = k + 1; i < m; i++) {
	                    work[i] = 0;
	                }
	                for (j = k + 1; j < n; j++) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] += e[j] * a[i][j];
	                    }
	                }
	                for (j = k + 1; j < n; j++) {
	                    t = -e[j] / e[k + 1];
	                    for (i = k + 1; i < m; i++) {
	                        a[i][j] += t * work[i];
	                    }
	                }
	            }
	            if (wantv) {
	                for (i = k + 1; i < n; i++) {
	                    V[i][k] = e[i];
	                }
	            }
	        }
	    }

	    p = Math.min(n, m + 1);
	    if (nct < n) {
	        s[nct] = a[nct][nct];
	    }
	    if (m < p) {
	        s[p - 1] = 0;
	    }
	    if (nrt + 1 < p) {
	        e[nrt] = a[nrt][p - 1];
	    }
	    e[p - 1] = 0;

	    if (wantu) {
	        for (j = nct; j < nu; j++) {
	            for (i = 0; i < m; i++) {
	                U[i][j] = 0;
	            }
	            U[j][j] = 1;
	        }
	        for (k = nct - 1; k >= 0; k--) {
	            if (s[k] !== 0) {
	                for (j = k + 1; j < nu; j++) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += U[i][k] * U[i][j];
	                    }
	                    t = -t / U[k][k];
	                    for (i = k; i < m; i++) {
	                        U[i][j] += t * U[i][k];
	                    }
	                }
	                for (i = k; i < m; i++) {
	                    U[i][k] = -U[i][k];
	                }
	                U[k][k] = 1 + U[k][k];
	                for (i = 0; i < k - 1; i++) {
	                    U[i][k] = 0;
	                }
	            } else {
	                for (i = 0; i < m; i++) {
	                    U[i][k] = 0;
	                }
	                U[k][k] = 1;
	            }
	        }
	    }

	    if (wantv) {
	        for (k = n - 1; k >= 0; k--) {
	            if ((k < nrt) && (e[k] !== 0)) {
	                for (j = k + 1; j < n; j++) {
	                    t = 0;
	                    for (i = k + 1; i < n; i++) {
	                        t += V[i][k] * V[i][j];
	                    }
	                    t = -t / V[k + 1][k];
	                    for (i = k + 1; i < n; i++) {
	                        V[i][j] += t * V[i][k];
	                    }
	                }
	            }
	            for (i = 0; i < n; i++) {
	                V[i][k] = 0;
	            }
	            V[k][k] = 1;
	        }
	    }

	    var pp = p - 1,
	        iter = 0,
	        eps = Math.pow(2, -52);
	    while (p > 0) {
	        for (k = p - 2; k >= -1; k--) {
	            if (k === -1) {
	                break;
	            }
	            if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                e[k] = 0;
	                break;
	            }
	        }
	        if (k === p - 2) {
	            kase = 4;
	        } else {
	            for (ks = p - 1; ks >= k; ks--) {
	                if (ks === k) {
	                    break;
	                }
	                t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                if (Math.abs(s[ks]) <= eps * t) {
	                    s[ks] = 0;
	                    break;
	                }
	            }
	            if (ks === k) {
	                kase = 3;
	            } else if (ks === p - 1) {
	                kase = 1;
	            } else {
	                kase = 2;
	                k = ks;
	            }
	        }

	        k++;

	        switch (kase) {
	            case 1: {
	                f = e[p - 2];
	                e[p - 2] = 0;
	                for (j = p - 2; j >= k; j--) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    if (j !== k) {
	                        f = -sn * e[j - 1];
	                        e[j - 1] = cs * e[j - 1];
	                    }
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][p - 1];
	                            V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                            V[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 2 : {
	                f = e[k - 1];
	                e[k - 1] = 0;
	                for (j = k; j < p; j++) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    f = -sn * e[j];
	                    e[j] = cs * e[j];
	                    if (wantu) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][k - 1];
	                            U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 3 : {
	                scale = Math.max(Math.max(Math.max(Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2])), Math.abs(e[p - 2])), Math.abs(s[k])), Math.abs(e[k]));
	                sp = s[p - 1] / scale;
	                spm1 = s[p - 2] / scale;
	                epm1 = e[p - 2] / scale;
	                sk = s[k] / scale;
	                ek = e[k] / scale;
	                b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                c = (sp * epm1) * (sp * epm1);
	                shift = 0;
	                if ((b !== 0) || (c !== 0)) {
	                    shift = Math.sqrt(b * b + c);
	                    if (b < 0) {
	                        shift = -shift;
	                    }
	                    shift = c / (b + shift);
	                }
	                f = (sk + sp) * (sk - sp) + shift;
	                g = sk * ek;
	                for (j = k; j < p - 1; j++) {
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    if (j !== k) {
	                        e[j - 1] = t;
	                    }
	                    f = cs * s[j] + sn * e[j];
	                    e[j] = cs * e[j] - sn * s[j];
	                    g = sn * s[j + 1];
	                    s[j + 1] = cs * s[j + 1];
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][j + 1];
	                            V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                            V[i][j] = t;
	                        }
	                    }
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    s[j] = t;
	                    f = cs * e[j] + sn * s[j + 1];
	                    s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                    g = sn * e[j + 1];
	                    e[j + 1] = cs * e[j + 1];
	                    if (wantu && (j < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][j + 1];
	                            U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                e[p - 2] = f;
	                iter = iter + 1;
	                break;
	            }
	            case 4: {
	                if (s[k] <= 0) {
	                    s[k] = (s[k] < 0 ? -s[k] : 0);
	                    if (wantv) {
	                        for (i = 0; i <= pp; i++) {
	                            V[i][k] = -V[i][k];
	                        }
	                    }
	                }
	                while (k < pp) {
	                    if (s[k] >= s[k + 1]) {
	                        break;
	                    }
	                    t = s[k];
	                    s[k] = s[k + 1];
	                    s[k + 1] = t;
	                    if (wantv && (k < n - 1)) {
	                        for (i = 0; i < n; i++) {
	                            t = V[i][k + 1];
	                            V[i][k + 1] = V[i][k];
	                            V[i][k] = t;
	                        }
	                    }
	                    if (wantu && (k < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = U[i][k + 1];
	                            U[i][k + 1] = U[i][k];
	                            U[i][k] = t;
	                        }
	                    }
	                    k++;
	                }
	                iter = 0;
	                p--;
	                break;
	            }
	        }
	    }

	    if (swapped) {
	        var tmp = V;
	        V = U;
	        U = tmp;
	    }

	    this.m = m;
	    this.n = n;
	    this.s = s;
	    this.U = U;
	    this.V = V;
	}

	SingularValueDecomposition.prototype = {
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    },
	    get norm2() {
	        return this.s[0];
	    },
	    get rank() {
	        var eps = Math.pow(2, -52),
	            tol = Math.max(this.m, this.n) * this.s[0] * eps,
	            r = 0,
	            s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    },
	    get diagonal() {
	        return this.s;
	    },
	    // https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
	    get threshold() {
	        return (Math.pow(2, -52) / 2) * Math.max(this.m, this.n) * this.s[0];
	    },
	    get leftSingularVectors() {
	        return this.U;
	    },
	    get rightSingularVectors() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    },
	    solve: function (value) {

	        var Y = value,
	            e = this.threshold,
	            scols = this.s.length,
	            Ls = Matrix.zeros(scols, scols),
	            i;

	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }


	        var VL = this.V.mmul(Ls),
	            vrows = this.V.rows,
	            urows = this.U.rows,
	            VLU = Matrix.zeros(vrows, urows),
	            j, k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * this.U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }

	        return VLU.mmul(Y);
	    },
	    solveForDiagonal: function (value) {
	        return this.solve(Matrix.diag(value));
	    },
	    inverse: function () {
	        var e = this.threshold,
	            vrows = this.V.rows,
	            vcols = this.V.columns,
	            X = new Matrix(vrows, this.s.length),
	            i, j;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = this.V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }

	        var urows = this.U.rows,
	            ucols = this.U.columns,
	            Y = new Matrix(vrows, urows),
	            k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * this.U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }

	        return Y;
	    }
	};

	module.exports = SingularValueDecomposition;


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	exports.hypotenuse = function hypotenuse(a, b) {
	    var r;
	    if (Math.abs(a) > Math.abs(b)) {
	        r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(9);
	var hypotenuse = __webpack_require__(12).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	function EigenvalueDecomposition(matrix) {
	    if (!(this instanceof EigenvalueDecomposition)) {
	        return new EigenvalueDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);
	    if (!matrix.isSquare()) {
	        throw new Error('Matrix is not a square matrix');
	    }

	    var n = matrix.columns,
	        V = Matrix.zeros(n, n),
	        d = new Array(n),
	        e = new Array(n),
	        value = matrix,
	        i, j;

	    if (matrix.isSymmetric()) {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                V[i][j] = value[i][j];
	            }
	        }
	        tred2(n, e, d, V);
	        tql2(n, e, d, V);
	    }
	    else {
	        var H = Matrix.zeros(n, n),
	            ort = new Array(n);
	        for (j = 0; j < n; j++) {
	            for (i = 0; i < n; i++) {
	                H[i][j] = value[i][j];
	            }
	        }
	        orthes(n, H, ort, V);
	        hqr2(n, e, d, V, H);
	    }

	    this.n = n;
	    this.e = e;
	    this.d = d;
	    this.V = V;
	}

	EigenvalueDecomposition.prototype = {
	    get realEigenvalues() {
	        return this.d;
	    },
	    get imaginaryEigenvalues() {
	        return this.e;
	    },
	    get eigenvectorMatrix() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        var n = this.n,
	            e = this.e,
	            d = this.d,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            }
	            else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	};

	function tred2(n, e, d, V) {

	    var f, g, h, i, j, k,
	        hh, scale;

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }

	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }

	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }

	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }

	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }

	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }

	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }

	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }

	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }

	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }

	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}

	function tql2(n, e, d, V) {

	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;

	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }

	    e[n - 1] = 0;

	    var f = 0,
	        tst1 = 0,
	        eps = Math.pow(2, -52);

	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }

	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;

	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }

	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }

	                f = f + h;

	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);

	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }

	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;

	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }

	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }

	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}

	function orthes(n, H, ort, V) {

	    var low = 0,
	        high = n - 1,
	        f, g, h, i, j, m,
	        scale;

	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }

	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }

	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }

	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;

	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }

	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }

	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }

	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }

	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }

	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }

	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }

	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }

	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}

	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1,
	        low = 0,
	        high = nn - 1,
	        eps = Math.pow(2, -52),
	        exshift = 0,
	        norm = 0,
	        p = 0,
	        q = 0,
	        r = 0,
	        s = 0,
	        z = 0,
	        iter = 0,
	        i, j, k, l, m, t, w, x, y,
	        ra, sa, vr, vi,
	        notlast, cdivres;

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }

	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }

	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }

	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];

	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;

	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }

	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }

	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }

	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }

	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }

	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }

	            iter = iter + 1;

	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }

	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }

	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }

	                if (x === 0) {
	                    break;
	                }

	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }

	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }

	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;

	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }

	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }

	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }

	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }

	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }

	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }

	    if (norm === 0) {
	        return;
	    }

	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];

	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }

	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }

	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;

	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }

	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }

	                w = H[i][i] - p;

	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }

	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }

	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}

	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    }
	    else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}

	module.exports = EigenvalueDecomposition;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(9);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	function LuDecomposition(matrix) {
	    if (!(this instanceof LuDecomposition)) {
	        return new LuDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);

	    var lu = matrix.clone(),
	        rows = lu.rows,
	        columns = lu.columns,
	        pivotVector = new Array(rows),
	        pivotSign = 1,
	        i, j, k, p, s, t, v,
	        LUrowi, LUcolj, kmax;

	    for (i = 0; i < rows; i++) {
	        pivotVector[i] = i;
	    }

	    LUcolj = new Array(rows);

	    for (j = 0; j < columns; j++) {

	        for (i = 0; i < rows; i++) {
	            LUcolj[i] = lu[i][j];
	        }

	        for (i = 0; i < rows; i++) {
	            LUrowi = lu[i];
	            kmax = Math.min(i, j);
	            s = 0;
	            for (k = 0; k < kmax; k++) {
	                s += LUrowi[k] * LUcolj[k];
	            }
	            LUrowi[j] = LUcolj[i] -= s;
	        }

	        p = j;
	        for (i = j + 1; i < rows; i++) {
	            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                p = i;
	            }
	        }

	        if (p !== j) {
	            for (k = 0; k < columns; k++) {
	                t = lu[p][k];
	                lu[p][k] = lu[j][k];
	                lu[j][k] = t;
	            }

	            v = pivotVector[p];
	            pivotVector[p] = pivotVector[j];
	            pivotVector[j] = v;

	            pivotSign = -pivotSign;
	        }

	        if (j < rows && lu[j][j] !== 0) {
	            for (i = j + 1; i < rows; i++) {
	                lu[i][j] /= lu[j][j];
	            }
	        }
	    }

	    this.LU = lu;
	    this.pivotVector = pivotVector;
	    this.pivotSign = pivotSign;
	}

	LuDecomposition.prototype = {
	    isSingular: function () {
	        var data = this.LU,
	            col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    },
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare())
	            throw new Error('Matrix must be square');
	        var determinant = this.pivotSign, col = data.columns;
	        for (var j = 0; j < col; j++)
	            determinant *= data[j][j];
	        return determinant;
	    },
	    get lowerTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get upperTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var lu = this.LU,
	            rows = lu.rows;

	        if (rows !== value.rows)
	            throw new Error('Invalid matrix dimensions');
	        if (this.isSingular())
	            throw new Error('LU matrix is singular');

	        var count = value.columns,
	            X = value.subMatrixRow(this.pivotVector, 0, count - 1),
	            columns = lu.columns,
	            i, j, k;

	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = LuDecomposition;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(9);
	var hypotenuse = __webpack_require__(12).hypotenuse;

	//https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	function QrDecomposition(value) {
	    if (!(this instanceof QrDecomposition)) {
	        return new QrDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);

	    var qr = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        rdiag = new Array(n),
	        i, j, k, s;

	    for (k = 0; k < n; k++) {
	        var nrm = 0;
	        for (i = k; i < m; i++) {
	            nrm = hypotenuse(nrm, qr[i][k]);
	        }
	        if (nrm !== 0) {
	            if (qr[k][k] < 0) {
	                nrm = -nrm;
	            }
	            for (i = k; i < m; i++) {
	                qr[i][k] /= nrm;
	            }
	            qr[k][k] += 1;
	            for (j = k + 1; j < n; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * qr[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    qr[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        rdiag[k] = -nrm;
	    }

	    this.QR = qr;
	    this.Rdiag = rdiag;
	}

	QrDecomposition.prototype = {
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var qr = this.QR,
	            m = qr.rows;

	        if (value.rows !== m)
	            throw new Error('Matrix row dimensions must agree');
	        if (!this.isFullRank())
	            throw new Error('Matrix is rank deficient');

	        var count = value.columns,
	            X = value.clone(),
	            n = qr.columns,
	            i, j, k, s;

	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }

	        return X.subMatrix(0, n - 1, 0, count - 1);
	    },
	    isFullRank: function () {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    },
	    get upperTriangularFactor() {
	        var qr = this.QR,
	            n = qr.columns,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get orthogonalFactor() {
	        var qr = this.QR,
	            rows = qr.rows,
	            columns = qr.columns,
	            X = new Matrix(rows, columns),
	            i, j, k, s;

	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }

	                    s = -s / qr[k][k];

	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = QrDecomposition;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(9);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	function CholeskyDecomposition(value) {
	    if (!(this instanceof CholeskyDecomposition)) {
	        return new CholeskyDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);
	    if (!value.isSymmetric())
	        throw new Error('Matrix is not symmetric');

	    var a = value,
	        dimension = a.rows,
	        l = new Matrix(dimension, dimension),
	        positiveDefinite = true,
	        i, j, k;

	    for (j = 0; j < dimension; j++) {
	        var Lrowj = l[j];
	        var d = 0;
	        for (k = 0; k < j; k++) {
	            var Lrowk = l[k];
	            var s = 0;
	            for (i = 0; i < k; i++) {
	                s += Lrowk[i] * Lrowj[i];
	            }
	            Lrowj[k] = s = (a[j][k] - s) / l[k][k];
	            d = d + s * s;
	        }

	        d = a[j][j] - d;

	        positiveDefinite &= (d > 0);
	        l[j][j] = Math.sqrt(Math.max(d, 0));
	        for (k = j + 1; k < dimension; k++) {
	            l[j][k] = 0;
	        }
	    }

	    if (!positiveDefinite) {
	        throw new Error('Matrix is not positive definite');
	    }

	    this.L = l;
	}

	CholeskyDecomposition.prototype = {
	    get leftTriangularFactor() {
	        return this.L;
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var l = this.L,
	            dimension = l.rows;

	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }

	        var count = value.columns,
	            B = value.clone(),
	            i, j, k;

	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        return B;
	    }
	};

	module.exports = CholeskyDecomposition;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eightBits = __webpack_require__(18);

	/**
	 * Count the number of true values in an array
	 * @param {Array} arr
	 * @return {number}
	 */
	function count(arr) {
	    var c = 0;
	    for (var i = 0; i < arr.length; i++) {
	        c += eightBits[arr[i] & 0xff] + eightBits[(arr[i] >> 8) & 0xff] + eightBits[(arr[i] >> 16) & 0xff] + eightBits[(arr[i] >> 24) & 0xff];
	    }
	    return c;
	}

	/**
	 * Logical AND operation
	 * @param {Array} arr1
	 * @param {Array} arr2
	 * @return {Array}
	 */
	function and(arr1, arr2) {
	    var ans = new Array(arr1.length);
	    for (var i = 0; i < arr1.length; i++)
	        ans[i] = arr1[i] & arr2[i];
	    return ans;
	}

	/**
	 * Logical OR operation
	 * @param {Array} arr1
	 * @param {Array} arr2
	 * @return {Array}
	 */
	function or(arr1, arr2) {
	    var ans = new Array(arr1.length);
	    for (var i = 0; i < arr1.length; i++)
	        ans[i] = arr1[i] | arr2[i];
	    return ans;
	}

	/**
	 * Logical XOR operation
	 * @param {Array} arr1
	 * @param {Array} arr2
	 * @return {Array}
	 */
	function xor(arr1, arr2) {
	    var ans = new Array(arr1.length);
	    for (var i = 0; i < arr1.length; i++)
	        ans[i] = arr1[i] ^ arr2[i];
	    return ans;
	}

	/**
	 * Logical NOT operation
	 * @param {Array} arr
	 * @return {Array}
	 */
	function not(arr) {
	    var ans = new Array(arr.length);
	    for (var i = 0; i < ans.length; i++)
	        ans[i] = ~arr[i];
	    return ans;
	}

	/**
	 * Gets the n value of array arr
	 * @param {Array} arr
	 * @param {number} n
	 * @return {boolean}
	 */
	function getBit(arr, n) {
	    var index = n >> 5; // Same as Math.floor(n/32)
	    var mask = 1 << (31 - n % 32);
	    return Boolean(arr[index] & mask);
	}

	/**
	 * Sets the n value of array arr to the value val
	 * @param {Array} arr
	 * @param {number} n
	 * @param {boolean} val
	 * @return {Array}
	 */
	function setBit(arr, n, val) {
	    var index = n >> 5; // Same as Math.floor(n/32)
	    var mask = 1 << (31 - n % 32);
	    if (val)
	        arr[index] = mask | arr[index];
	    else
	        arr[index] = ~mask & arr[index];
	    return arr;
	}

	/**
	 * Translates an array of numbers to a string of bits
	 * @param {Array} arr
	 * @returns {string}
	 */
	function toBinaryString(arr) {
	    var str = '';
	    for (var i = 0; i < arr.length; i++) {
	        var obj = (arr[i] >>> 0).toString(2);
	        str += '00000000000000000000000000000000'.substr(obj.length) + obj;
	    }
	    return str;
	}

	/**
	 * Creates an array of numbers based on a string of bits
	 * @param {string} str
	 * @returns {Array}
	 */
	function parseBinaryString(str) {
	    var len = str.length / 32;
	    var ans = new Array(len);
	    for (var i = 0; i < len; i++) {
	        ans[i] = parseInt(str.substr(i*32, 32), 2) | 0;
	    }
	    return ans;
	}

	/**
	 * Translates an array of numbers to a hex string
	 * @param {Array} arr
	 * @returns {string}
	 */
	function toHexString(arr) {
	    var str = '';
	    for (var i = 0; i < arr.length; i++) {
	        var obj = (arr[i] >>> 0).toString(16);
	        str += '00000000'.substr(obj.length) + obj;
	    }
	    return str;
	}

	/**
	 * Creates an array of numbers based on a hex string
	 * @param {string} str
	 * @returns {Array}
	 */
	function parseHexString(str) {
	    var len = str.length / 8;
	    var ans = new Array(len);
	    for (var i = 0; i < len; i++) {
	        ans[i] = parseInt(str.substr(i*8, 8), 16) | 0;
	    }
	    return ans;
	}

	/**
	 * Creates a human readable string of the array
	 * @param {Array} arr
	 * @returns {string}
	 */
	function toDebug(arr) {
	    var binary = toBinaryString(arr);
	    var str = '';
	    for (var i = 0; i < arr.length; i++) {
	        str += '0000'.substr((i * 32).toString(16).length) + (i * 32).toString(16) + ':';
	        for (var j = 0; j < 32; j += 4) {
	            str += ' ' + binary.substr(i * 32 + j, 4);
	        }
	        if (i < arr.length - 1) str += '\n';
	    }
	    return str
	}

	module.exports = {
	    count: count,
	    and: and,
	    or: or,
	    xor: xor,
	    not: not,
	    getBit: getBit,
	    setBit: setBit,
	    toBinaryString: toBinaryString,
	    parseBinaryString: parseBinaryString,
	    toHexString: toHexString,
	    parseHexString: parseHexString,
	    toDebug: toDebug
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	// auxiliary file to create the 256 look at table elements

	var ans = new Array(256);
	for (var i = 0; i < 256; i++) {
	    var num = i;
	    var c = 0;
	    while (num) {
	        num = num & (num - 1);
	        c++;
	    }
	    ans[i] = c;
	}

	module.exports = ans;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(20);
	module.exports.Decompositions = module.exports.DC = __webpack_require__(21);


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var Asplice = Array.prototype.splice,
	    Aconcat = Array.prototype.concat;

	// For performance : http://jsperf.com/clone-array-slice-vs-while-vs-for
	function slice(arr) {
	    var i = 0,
	        ii = arr.length,
	        result = new Array(ii);
	    for (; i < ii; i++) {
	        result[i] = arr[i];
	    }
	    return result;
	}

	/**
	 * Real matrix.
	 * @constructor
	 * @param {number|Array} nRows - Number of rows of the new matrix or a 2D array containing the data.
	 * @param {number|boolean} [nColumns] - Number of columns of the new matrix or a boolean specifying if the input array should be cloned
	 */
	function Matrix(nRows, nColumns) {
	    var i = 0, rows, columns, matrix, newInstance;
	    if (Array.isArray(nRows)) {
	        newInstance = nColumns;
	        matrix = newInstance ? slice(nRows) : nRows;
	        nRows = matrix.length;
	        nColumns = matrix[0].length;
	        if (typeof nColumns === 'undefined') {
	            throw new TypeError('Data must be a 2D array');
	        }
	        if (nRows > 0 && nColumns > 0) {
	            for (; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                } else if (newInstance) {
	                    matrix[i] = slice(matrix[i]);
	                }
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else if (typeof nRows === 'number') { // Create empty matrix
	        if (nRows > 0 && nColumns > 0) {
	            matrix = new Array(nRows);
	            for (; i < nRows; i++) {
	                matrix[i] = new Array(nColumns);
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else {
	        throw new TypeError('Invalid arguments');
	    }

	    Object.defineProperty(matrix, 'rows', {writable: true, value: nRows});
	    Object.defineProperty(matrix, 'columns', {writable: true, value: nColumns});

	    matrix.__proto__ = Matrix.prototype;

	    return matrix;
	}

	/**
	 * Constructs a Matrix with the chosen dimensions from a 1D array.
	 * @param {number} newRows - Number of rows
	 * @param {number} newColumns - Number of columns
	 * @param {Array} newData - A 1D array containing data for the matrix
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.from1DArray = function from1DArray(newRows, newColumns, newData) {
	    var length, data, i = 0;

	    length = newRows * newColumns;
	    if (length !== newData.length)
	        throw new RangeError('Data length does not match given dimensions');

	    data = new Array(newRows);
	    for (; i < newRows; i++) {
	        data[i] = newData.slice(i * newColumns, (i + 1) * newColumns);
	    }
	    return new Matrix(data);
	};

	/**
	 * Creates a row vector, a matrix with only one row.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.rowVector = function rowVector(newData) {
	    return new Matrix([newData]);
	};

	/**
	 * Creates a column vector, a matrix with only one column.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.columnVector = function columnVector(newData) {
	    var l = newData.length, vector = new Array(l);
	    for (var i = 0; i < l; i++)
	        vector[i] = [newData[i]];
	    return new Matrix(vector);
	};

	/**
	 * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.empty = function empty(rows, columns) {
	    return new Matrix(rows, columns);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to zero.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.zeros = function zeros(rows, columns) {
	    return Matrix.empty(rows, columns).fill(0);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to one.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.ones = function ones(rows, columns) {
	    return Matrix.empty(rows, columns).fill(1);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be randomly set using Math.random().
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} The new matrix
	 */
	Matrix.rand = function rand(rows, columns) {
	    var matrix = Matrix.empty(rows, columns);
	    for (var i = 0, ii = matrix.rows; i < ii; i++) {
	        for (var j = 0, jj = matrix.columns; j < jj; j++) {
	            matrix[i][j] = Math.random();
	        }
	    }
	    return matrix;
	};

	/**
	 * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and other will be 0.
	 * @param {number} n - Number of rows and columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.eye = function eye(n) {
	    var matrix = Matrix.zeros(n, n), l = matrix.rows;
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = 1;
	    }
	    return matrix;
	};

	/**
	 * Creates a diagonal matrix based on the given array.
	 * @param {Array} data - Array containing the data for the diagonal
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.diag = function diag(data) {
	    var l = data.length, matrix = Matrix.zeros(l, l);
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = data[i];
	    }
	    return matrix;
	};

	/**
	 * Creates an array of indices between two values
	 * @param {number} from
	 * @param {number} to
	 * @returns {Array}
	 */
	Matrix.indices = function indices(from, to) {
	    var vector = new Array(to - from);
	    for (var i = 0; i < vector.length; i++)
	        vector[i] = from++;
	    return vector;
	};

	// TODO DOC
	Matrix.stack = function stack(arg1) {
	    var i, j, k;
	    if (Matrix.isMatrix(arg1)) {
	        var rows = 0,
	            cols = 0;
	        for (i = 0; i < arguments.length; i++) {
	            rows += arguments[i].rows;
	            if (arguments[i].columns > cols)
	                cols = arguments[i].columns;
	        }

	        var r = Matrix.zeros(rows, cols);
	        var c = 0;
	        for (i = 0; i < arguments.length; i++) {
	            var current = arguments[i];
	            for (j = 0; j < current.rows; j++) {
	                for (k = 0; k < current.columns; k++)
	                    r[c][k] = current[j][k];
	                c++;
	            }
	        }
	        return r;
	    }
	    else if (Array.isArray(arg1)) {
	        var matrix = Matrix.empty(arguments.length, arg1.length);
	        for (i = 0; i < arguments.length; i++)
	            matrix.setRow(i, arguments[i]);
	        return matrix;
	    }
	};

	// TODO DOC
	Matrix.expand = function expand(base, count) {
	    var expansion = [];
	    for (var i = 0; i < count.length; i++)
	        for (var j = 0; j < count[i]; j++)
	            expansion.push(base[i]);
	    return new Matrix(expansion);
	};

	/**
	 * Check that the provided value is a Matrix and tries to instantiate one if not
	 * @param value - The value to check
	 * @returns {Matrix}
	 * @throws {TypeError}
	 */
	Matrix.checkMatrix = function checkMatrix(value) {
	    if (!value) {
	        throw new TypeError('Argument has to be a matrix');
	    }
	    if (value.klass !== 'Matrix') {
	        value = new Matrix(value);
	    }
	    return value;
	};

	/**
	 * Returns true if the argument is a Matrix, false otherwise
	 * @param value - The value to check
	 * @returns {boolean}
	 */
	Matrix.isMatrix = function isMatrix(value) {
	    return value ? value.klass === 'Matrix' : false;
	};

	/**
	 * @property {string} - The name of this class.
	 */
	Object.defineProperty(Matrix.prototype, 'klass', {
	    get: function klass() {
	        return 'Matrix';
	    }
	});

	/**
	 * @property {number} - The number of elements in the matrix.
	 */
	Object.defineProperty(Matrix.prototype, 'size', {
	    get: function size() {
	        return this.rows * this.columns;
	    }
	});

	/**
	 * @private
	 * Internal check that a row index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkRowIndex = function checkRowIndex(index) {
	    if (index < 0 || index > this.rows - 1)
	        throw new RangeError('Row index out of range.');
	};

	/**
	 * @private
	 * Internal check that a column index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkColumnIndex = function checkColumnIndex(index) {
	    if (index < 0 || index > this.columns - 1)
	        throw new RangeError('Column index out of range.');
	};

	/**
	 * @private
	 * Internal check that two matrices have the same dimensions
	 * @param {Matrix} otherMatrix
	 */
	Matrix.prototype.checkDimensions = function checkDimensions(otherMatrix) {
	    if ((this.rows !== otherMatrix.rows) || (this.columns !== otherMatrix.columns))
	        throw new RangeError('Matrices dimensions must be equal.');
	};

	/**
	 * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	 * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.apply = function apply(callback) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            callback.call(this, i, j);
	        }
	    }
	    return this;
	};

	/**
	 * Creates an exact and independent copy of the matrix
	 * @returns {Matrix}
	 */
	Matrix.prototype.clone = function clone() {
	    return new Matrix(this.to2DArray());
	};

	/**
	 * Returns a new 1D array filled row by row with the matrix values
	 * @returns {Array}
	 */
	Matrix.prototype.to1DArray = function to1DArray() {
	    return Aconcat.apply([], this);
	};

	/**
	 * Returns a 2D array containing a copy of the data
	 * @returns {Array}
	 */
	Matrix.prototype.to2DArray = function to2DArray() {
	    var l = this.rows, copy = new Array(l);
	    for (var i = 0; i < l; i++) {
	        copy[i] = slice(this[i]);
	    }
	    return copy;
	};

	/**
	 * @returns {boolean} true if the matrix has one row
	 */
	Matrix.prototype.isRowVector = function isRowVector() {
	    return this.rows === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one column
	 */
	Matrix.prototype.isColumnVector = function isColumnVector() {
	    return this.columns === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one row or one column
	 */
	Matrix.prototype.isVector = function isVector() {
	    return (this.rows === 1) || (this.columns === 1);
	};

	/**
	 * @returns {boolean} true if the matrix has the same number of rows and columns
	 */
	Matrix.prototype.isSquare = function isSquare() {
	    return this.rows === this.columns;
	};

	/**
	 * @returns {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	 */
	Matrix.prototype.isSymmetric = function isSymmetric() {
	    if (this.isSquare()) {
	        var l = this.rows;
	        for (var i = 0; i < l; i++) {
	            for (var j = 0; j <= i; j++) {
	                if (this[i][j] !== this[j][i]) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    }
	    return false;
	};

	/**
	 * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @param {number} value - The new value for the element
	 * @returns {Matrix} this
	 */
	Matrix.prototype.set = function set(rowIndex, columnIndex, value) {
	    this[rowIndex][columnIndex] = value;
	    return this;
	};

	/**
	 * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @returns {number}
	 */
	Matrix.prototype.get = function get(rowIndex, columnIndex) {
	    return this[rowIndex][columnIndex];
	};

	/**
	 * Fills the matrix with a given value. All elements will be set to this value.
	 * @param {number} value - New value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.fill = function fill(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = value;
	        }
	    }
	    return this;
	};

	/**
	 * Negates the matrix. All elements will be multiplied by (-1)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.neg = function neg() {
	    return this.mulS(-1);
	};

	/**
	 * Adds a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.add = function add(value) {
	    if (typeof value === 'number')
	        return this.addS(value);
	    value = Matrix.checkMatrix(value);
	        return this.addM(value);
	};

	/**
	 * Adds a scalar to each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addS = function addS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += value;
	        }
	    }
	    return this;
	};

	/**
	 * Adds the value of each element of matrix to the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addM = function addM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sub = function sub(value) {
	    if (typeof value === 'number')
	        return this.subS(value);
	    value = Matrix.checkMatrix(value);
	        return this.subM(value);
	};

	/**
	 * Subtracts a scalar from each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subS = function subS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= value;
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the value of each element of matrix from the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subM = function subM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mul = function mul(value) {
	    if (typeof value === 'number')
	        return this.mulS(value);
	    value = Matrix.checkMatrix(value);
	        return this.mulM(value);
	};

	/**
	 * Multiplies a scalar with each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulS = function mulS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= value;
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the value of each element of matrix with the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulM = function mulM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides by a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.div = function div(value) {
	    if (typeof value === 'number')
	        return this.divS(value);
	    value = Matrix.checkMatrix(value);
	        return this.divM(value);
	};

	/**
	 * Divides each element of the matrix by a scalar
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divS = function divS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= value;
	        }
	    }
	    return this;
	};

	/**
	 * Divides each element of this by the corresponding element of matrix
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divM = function divM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Returns a new array from the given row index
	 * @param {number} index - Row index
	 * @returns {Array}
	 */
	Matrix.prototype.getRow = function getRow(index) {
	    this.checkRowIndex(index);
	    return slice(this[index]);
	};

	/**
	 * Returns a new row vector from the given row index
	 * @param {number} index - Row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getRowVector = function getRowVector(index) {
	    return Matrix.rowVector(this.getRow(index));
	};

	/**
	 * Sets a row at the given index
	 * @param {number} index - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setRow = function setRow(index, array) {
	    this.checkRowIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    this[index] = slice(array);
	    return this;
	};

	/**
	 * Removes a row from the given index
	 * @param {number} index - Row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeRow = function removeRow(index) {
	    this.checkRowIndex(index);
	    if (this.rows === 1)
	        throw new RangeError('A matrix cannot have less than one row');
	    Asplice.call(this, index, 1);
	    this.rows -= 1;
	    return this;
	};

	/**
	 * Adds a row at the given index
	 * @param {number} [index = this.rows] - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRow = function addRow(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.rows;
	    }
	    if (index < 0 || index > this.rows)
	        throw new RangeError('Row index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    Asplice.call(this, index, 0, slice(array));
	    this.rows += 1;
	    return this;
	};

	/**
	 * Swaps two rows
	 * @param {number} row1 - First row index
	 * @param {number} row2 - Second row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapRows = function swapRows(row1, row2) {
	    this.checkRowIndex(row1);
	    this.checkRowIndex(row2);
	    var temp = this[row1];
	    this[row1] = this[row2];
	    this[row2] = temp;
	    return this;
	};

	/**
	 * Returns a new array from the given column index
	 * @param {number} index - Column index
	 * @returns {Array}
	 */
	Matrix.prototype.getColumn = function getColumn(index) {
	    this.checkColumnIndex(index);
	    var l = this.rows, column = new Array(l);
	    for (var i = 0; i < l; i++) {
	        column[i] = this[i][index];
	    }
	    return column;
	};

	/**
	 * Returns a new column vector from the given column index
	 * @param {number} index - Column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getColumnVector = function getColumnVector(index) {
	    return Matrix.columnVector(this.getColumn(index));
	};

	/**
	 * Sets a column at the given index
	 * @param {number} index - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setColumn = function setColumn(index, array) {
	    this.checkColumnIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i][index] = array[i];
	    }
	    return this;
	};

	/**
	 * Removes a column from the given index
	 * @param {number} index - Column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeColumn = function removeColumn(index) {
	    this.checkColumnIndex(index);
	    if (this.columns === 1)
	        throw new RangeError('A matrix cannot have less than one column');
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].splice(index, 1);
	    }
	    this.columns -= 1;
	    return this;
	};

	/**
	 * Adds a column at the given index
	 * @param {number} [index = this.columns] - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumn = function addColumn(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.columns;
	    }
	    if (index < 0 || index > this.columns)
	        throw new RangeError('Column index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i].splice(index, 0, array[i]);
	    }
	    this.columns += 1;
	    return this;
	};

	/**
	 * Swaps two columns
	 * @param {number} column1 - First column index
	 * @param {number} column2 - Second column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapColumns = function swapColumns(column1, column2) {
	    this.checkRowIndex(column1);
	    this.checkRowIndex(column2);
	    var l = this.rows, temp, row;
	    for (var i = 0; i < l; i++) {
	        row = this[i];
	        temp = row[column1];
	        row[column1] = row[column2];
	        row[column2] = temp;
	    }
	    return this;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkRowVector = function checkRowVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.columns)
	        throw new RangeError('vector size must be the same as the number of columns');
	    return vector;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkColumnVector = function checkColumnVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.rows)
	        throw new RangeError('vector size must be the same as the number of rows');
	    return vector;
	};

	/**
	 * Adds the values of a vector to each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRowVector = function addRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subRowVector = function subRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRowVector = function mulRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each row by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divRowVector = function divRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Adds the values of a vector to each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumnVector = function addColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subColumnVector = function subColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumnVector = function mulColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each column by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divColumnVector = function divColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a row with a scalar
	 * @param {number} index - Row index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRow = function mulRow(index, value) {
	    this.checkRowIndex(index);
	    var i = 0, l = this.columns;
	    for (; i < l; i++) {
	        this[index][i] *= value;
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a column with a scalar
	 * @param {number} index - Column index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumn = function mulColumn(index, value) {
	    this.checkColumnIndex(index);
	    var i = 0, l = this.rows;
	    for (; i < l; i++) {
	        this[i][index] *= value;
	    }
	};

	/**
	 * A matrix index
	 * @typedef {Object} MatrixIndex
	 * @property {number} row
	 * @property {number} column
	 */

	/**
	 * Returns the maximum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.max = function max() {
	    var v = -Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxIndex = function maxIndex() {
	    var v = -Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.min = function min() {
	    var v = Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minIndex = function minIndex() {
	    var v = Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.maxRow = function maxRow(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxRowIndex = function maxRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    var idx = {
	            row: index
	        };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.minRow = function minRow(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minRowIndex = function minRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: index,
	        column: 0
	    };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.maxColumn = function maxColumn(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxColumnIndex = function maxColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.minColumn = function minColumn(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minColumnIndex = function minColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns an array containing the diagonal values of the matrix
	 * @returns {Array}
	 */
	Matrix.prototype.diag = function diag() {
	    if (!this.isSquare())
	        throw new TypeError('Only square matrices have a diagonal.');
	    var diag = new Array(this.rows);
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        diag[i] = this[i][i];
	    }
	    return diag;
	};

	/**
	 * Returns the sum of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.sum = function sum() {
	    var v = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            v += this[i][j];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the mean of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.mean = function mean() {
	    return this.sum() / this.size;
	};

	/**
	 * Returns the product of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.prod = function prod() {
	    var prod = 1;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            prod *= this[i][j];
	        }
	    }
	    return prod;
	};

	/**
	 * Computes the cumulative sum of the matrix elements (in place, row by row)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.cumulativeSum = function cumulativeSum() {
	    var sum = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            sum += this[i][j];
	            this[i][j] = sum;
	        }
	    }
	    return this;
	};

	/**
	 * Computes the dot (scalar) product between the matrix and another
	 * @param {Matrix} other vector
	 * @returns {number}
	 */
	Matrix.prototype.dot = function dot(other) {
	    if (this.size !== other.size)
	        throw new RangeError('vectors do not have the same size');
	    var vector1 = this.to1DArray();
	    var vector2 = other.to1DArray();
	    var dot = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        dot += vector1[i] * vector2[i];
	    }
	    return dot;
	};

	/**
	 * Returns the matrix product between this and other
	 * @returns {Matrix}
	 */
	Matrix.prototype.mmul = function mmul(other) {
	    if (!Matrix.isMatrix(other))
	        throw new TypeError('parameter "other" must be a matrix');
	    if (this.columns !== other.rows)
	        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

	    var m = this.rows, n = this.columns, p = other.columns;
	    var result = new Matrix(m, p);

	    var Bcolj = new Array(n);
	    var i, j, k;
	    for (j = 0; j < p; j++) {
	        for (k = 0; k < n; k++)
	            Bcolj[k] = other[k][j];

	        for (i = 0; i < m; i++) {
	            var Arowi = this[i];

	            var s = 0;
	            for (k = 0; k < n; k++)
	                s += Arowi[k] * Bcolj[k];

	            result[i][j] = s;
	        }
	    }
	    return result;
	};

	/**
	 * Sorts the rows (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortRows = function sortRows(compareFunction) {
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].sort(compareFunction);
	    }
	    return this;
	};

	/**
	 * Sorts the columns (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortColumns = function sortColumns(compareFunction) {
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        this.setColumn(i, this.getColumn(i).sort(compareFunction));
	    }
	    return this;
	};

	/**
	 * Transposes the matrix and returns a new one containing the result
	 * @returns {Matrix}
	 */
	Matrix.prototype.transpose = function transpose() {
	    var result = new Matrix(this.columns, this.rows);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[j][i] = this[i][j];
	        }
	    }
	    return result;
	};

	/**
	 * Returns a subset of the matrix
	 * @param {number} startRow - First row index
	 * @param {number} endRow - Last row index
	 * @param {number} startColumn - First column index
	 * @param {number} endColumn - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrix = function subMatrix(startRow, endRow, startColumn, endColumn) {
	    if ((startRow > endRow) || (startColumn > endColumn) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range');
	    var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
	    for (var i = startRow; i <= endRow; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            newMatrix[i - startRow][j - startColumn] = this[i][j];
	        }
	    }
	    return newMatrix;
	};

	/**
	 * Returns a subset of the matrix based on an array of row indices
	 * @param {Array} indices - Array containing the row indices
	 * @param {number} [startColumn = 0] - First column index
	 * @param {number} [endColumn = this.columns-1] - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixRow = function subMatrixRow(indices, startColumn, endColumn) {
	    if (typeof startColumn === 'undefined') {
	        startColumn = 0;
	        endColumn = this.columns - 1;
	    } else if (typeof endColumn === 'undefined') {
	        endColumn = this.columns - 1;
	    }
	    if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, rows = this.rows,
	        X = new Matrix(l, endColumn - startColumn + 1);
	    for (var i = 0; i < l; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            if ((indices[i] < 0) || (indices[i] >= rows))
	                throw new RangeError('Argument out of range.');
	            X[i][j - startColumn] = this[indices[i]][j];
	        }
	    }
	    return X;
	};

	/**
	 * Returns a subset of the matrix based on an array of column indices
	 * @param {Array} indices - Array containing the column indices
	 * @param {number} [startRow = 0] - First row index
	 * @param {number} [endRow = this.rows-1] - Last row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixColumn = function subMatrixColumn(indices, startRow, endRow) {
	    if (typeof startRow === 'undefined') {
	        startRow = 0;
	        endRow = this.rows - 1;
	    } else if (typeof endRow === 'undefined') {
	        endRow = this.rows - 1;
	    }
	    if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, columns = this.columns,
	        X = new Matrix(endRow - startRow + 1, l);
	    for (var i = 0; i < l; i++) {
	        for (var j = startRow; j <= endRow; j++) {
	            if ((indices[i] < 0) || (indices[i] >= columns))
	                throw new RangeError('Argument out of range.');
	            X[j - startRow][i] = this[j][indices[i]];
	        }
	    }
	    return X;
	};

	/**
	 * Returns the trace of the matrix (sum of the diagonal elements)
	 * @returns {number}
	 */
	Matrix.prototype.trace = function trace() {
	    if (!this.isSquare())
	        throw new TypeError('The matrix is not square');
	    var trace = 0, i = 0, l = this.rows;
	    for (; i < l; i++) {
	        trace += this[i][i];
	    }
	    return trace;
	};

	/**
	 * Sets each element of the matrix to its absolute value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.abs = function abs() {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = Math.abs(this[i][j]);
	        }
	    }
	};

	module.exports = Matrix;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(20);

	var SingularValueDecomposition = __webpack_require__(22);
	var EigenvalueDecomposition = __webpack_require__(24);
	var LuDecomposition = __webpack_require__(25);
	var QrDecomposition = __webpack_require__(26);
	var CholeskyDecomposition = __webpack_require__(27);

	function inverse(matrix) {
	    return solve(matrix, Matrix.eye(matrix.rows));
	}

	Matrix.prototype.inverse = function () {
	    return inverse(this);
	};

	function solve(leftHandSide, rightHandSide) {
	    return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
	}

	Matrix.prototype.solve = function (other) {
	    return solve(this, other);
	};

	module.exports = {
	    SingularValueDecomposition: SingularValueDecomposition,
	    SVD: SingularValueDecomposition,
	    EigenvalueDecomposition: EigenvalueDecomposition,
	    EVD: EigenvalueDecomposition,
	    LuDecomposition: LuDecomposition,
	    LU: LuDecomposition,
	    QrDecomposition: QrDecomposition,
	    QR: QrDecomposition,
	    CholeskyDecomposition: CholeskyDecomposition,
	    CHO: CholeskyDecomposition,
	    inverse: inverse,
	    solve: solve
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(20);
	var hypotenuse = __webpack_require__(23).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	function SingularValueDecomposition(value, options) {
	    if (!(this instanceof SingularValueDecomposition)) {
	        return new SingularValueDecomposition(value, options);
	    }
	    value = Matrix.checkMatrix(value);

	    options = options || {};

	    var a = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        nu = Math.min(m, n);

	    var wantu = true, wantv = true;
	    if (options.computeLeftSingularVectors === false)
	        wantu = false;
	    if (options.computeRightSingularVectors === false)
	        wantv = false;
	    var autoTranspose = options.autoTranspose === true;

	    var swapped = false;
	    if (m < n) {
	        if (!autoTranspose) {
	            console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	        } else {
	            a = a.transpose();
	            m = a.rows;
	            n = a.columns;
	            swapped = true;
	            var aux = wantu;
	            wantu = wantv;
	            wantv = aux;
	        }
	    }

	    var s = new Array(Math.min(m + 1, n)),
	        U = Matrix.zeros(m, nu),
	        V = Matrix.zeros(n, n),
	        e = new Array(n),
	        work = new Array(m);

	    var nct = Math.min(m - 1, n);
	    var nrt = Math.max(0, Math.min(n - 2, m));

	    var i, j, k, p, t, ks, f, cs, sn, max, kase,
	        scale, sp, spm1, epm1, sk, ek, b, c, shift, g;

	    for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	        if (k < nct) {
	            s[k] = 0;
	            for (i = k; i < m; i++) {
	                s[k] = hypotenuse(s[k], a[i][k]);
	            }
	            if (s[k] !== 0) {
	                if (a[k][k] < 0) {
	                    s[k] = -s[k];
	                }
	                for (i = k; i < m; i++) {
	                    a[i][k] /= s[k];
	                }
	                a[k][k] += 1;
	            }
	            s[k] = -s[k];
	        }

	        for (j = k + 1; j < n; j++) {
	            if ((k < nct) && (s[k] !== 0)) {
	                t = 0;
	                for (i = k; i < m; i++) {
	                    t += a[i][k] * a[i][j];
	                }
	                t = -t / a[k][k];
	                for (i = k; i < m; i++) {
	                    a[i][j] += t * a[i][k];
	                }
	            }
	            e[j] = a[k][j];
	        }

	        if (wantu && (k < nct)) {
	            for (i = k; i < m; i++) {
	                U[i][k] = a[i][k];
	            }
	        }

	        if (k < nrt) {
	            e[k] = 0;
	            for (i = k + 1; i < n; i++) {
	                e[k] = hypotenuse(e[k], e[i]);
	            }
	            if (e[k] !== 0) {
	                if (e[k + 1] < 0)
	                    e[k] = -e[k];
	                for (i = k + 1; i < n; i++) {
	                    e[i] /= e[k];
	                }
	                e[k + 1] += 1;
	            }
	            e[k] = -e[k];
	            if ((k + 1 < m) && (e[k] !== 0)) {
	                for (i = k + 1; i < m; i++) {
	                    work[i] = 0;
	                }
	                for (j = k + 1; j < n; j++) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] += e[j] * a[i][j];
	                    }
	                }
	                for (j = k + 1; j < n; j++) {
	                    t = -e[j] / e[k + 1];
	                    for (i = k + 1; i < m; i++) {
	                        a[i][j] += t * work[i];
	                    }
	                }
	            }
	            if (wantv) {
	                for (i = k + 1; i < n; i++) {
	                    V[i][k] = e[i];
	                }
	            }
	        }
	    }

	    p = Math.min(n, m + 1);
	    if (nct < n) {
	        s[nct] = a[nct][nct];
	    }
	    if (m < p) {
	        s[p - 1] = 0;
	    }
	    if (nrt + 1 < p) {
	        e[nrt] = a[nrt][p - 1];
	    }
	    e[p - 1] = 0;

	    if (wantu) {
	        for (j = nct; j < nu; j++) {
	            for (i = 0; i < m; i++) {
	                U[i][j] = 0;
	            }
	            U[j][j] = 1;
	        }
	        for (k = nct - 1; k >= 0; k--) {
	            if (s[k] !== 0) {
	                for (j = k + 1; j < nu; j++) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += U[i][k] * U[i][j];
	                    }
	                    t = -t / U[k][k];
	                    for (i = k; i < m; i++) {
	                        U[i][j] += t * U[i][k];
	                    }
	                }
	                for (i = k; i < m; i++) {
	                    U[i][k] = -U[i][k];
	                }
	                U[k][k] = 1 + U[k][k];
	                for (i = 0; i < k - 1; i++) {
	                    U[i][k] = 0;
	                }
	            } else {
	                for (i = 0; i < m; i++) {
	                    U[i][k] = 0;
	                }
	                U[k][k] = 1;
	            }
	        }
	    }

	    if (wantv) {
	        for (k = n - 1; k >= 0; k--) {
	            if ((k < nrt) && (e[k] !== 0)) {
	                for (j = k + 1; j < n; j++) {
	                    t = 0;
	                    for (i = k + 1; i < n; i++) {
	                        t += V[i][k] * V[i][j];
	                    }
	                    t = -t / V[k + 1][k];
	                    for (i = k + 1; i < n; i++) {
	                        V[i][j] += t * V[i][k];
	                    }
	                }
	            }
	            for (i = 0; i < n; i++) {
	                V[i][k] = 0;
	            }
	            V[k][k] = 1;
	        }
	    }

	    var pp = p - 1,
	        iter = 0,
	        eps = Math.pow(2, -52);
	    while (p > 0) {
	        for (k = p - 2; k >= -1; k--) {
	            if (k === -1) {
	                break;
	            }
	            if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                e[k] = 0;
	                break;
	            }
	        }
	        if (k === p - 2) {
	            kase = 4;
	        } else {
	            for (ks = p - 1; ks >= k; ks--) {
	                if (ks === k) {
	                    break;
	                }
	                t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                if (Math.abs(s[ks]) <= eps * t) {
	                    s[ks] = 0;
	                    break;
	                }
	            }
	            if (ks === k) {
	                kase = 3;
	            } else if (ks === p - 1) {
	                kase = 1;
	            } else {
	                kase = 2;
	                k = ks;
	            }
	        }

	        k++;

	        switch (kase) {
	            case 1: {
	                f = e[p - 2];
	                e[p - 2] = 0;
	                for (j = p - 2; j >= k; j--) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    if (j !== k) {
	                        f = -sn * e[j - 1];
	                        e[j - 1] = cs * e[j - 1];
	                    }
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][p - 1];
	                            V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                            V[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 2 : {
	                f = e[k - 1];
	                e[k - 1] = 0;
	                for (j = k; j < p; j++) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    f = -sn * e[j];
	                    e[j] = cs * e[j];
	                    if (wantu) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][k - 1];
	                            U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 3 : {
	                scale = Math.max(Math.max(Math.max(Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2])), Math.abs(e[p - 2])), Math.abs(s[k])), Math.abs(e[k]));
	                sp = s[p - 1] / scale;
	                spm1 = s[p - 2] / scale;
	                epm1 = e[p - 2] / scale;
	                sk = s[k] / scale;
	                ek = e[k] / scale;
	                b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                c = (sp * epm1) * (sp * epm1);
	                shift = 0;
	                if ((b !== 0) || (c !== 0)) {
	                    shift = Math.sqrt(b * b + c);
	                    if (b < 0) {
	                        shift = -shift;
	                    }
	                    shift = c / (b + shift);
	                }
	                f = (sk + sp) * (sk - sp) + shift;
	                g = sk * ek;
	                for (j = k; j < p - 1; j++) {
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    if (j !== k) {
	                        e[j - 1] = t;
	                    }
	                    f = cs * s[j] + sn * e[j];
	                    e[j] = cs * e[j] - sn * s[j];
	                    g = sn * s[j + 1];
	                    s[j + 1] = cs * s[j + 1];
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][j + 1];
	                            V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                            V[i][j] = t;
	                        }
	                    }
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    s[j] = t;
	                    f = cs * e[j] + sn * s[j + 1];
	                    s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                    g = sn * e[j + 1];
	                    e[j + 1] = cs * e[j + 1];
	                    if (wantu && (j < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][j + 1];
	                            U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                e[p - 2] = f;
	                iter = iter + 1;
	                break;
	            }
	            case 4: {
	                if (s[k] <= 0) {
	                    s[k] = (s[k] < 0 ? -s[k] : 0);
	                    if (wantv) {
	                        for (i = 0; i <= pp; i++) {
	                            V[i][k] = -V[i][k];
	                        }
	                    }
	                }
	                while (k < pp) {
	                    if (s[k] >= s[k + 1]) {
	                        break;
	                    }
	                    t = s[k];
	                    s[k] = s[k + 1];
	                    s[k + 1] = t;
	                    if (wantv && (k < n - 1)) {
	                        for (i = 0; i < n; i++) {
	                            t = V[i][k + 1];
	                            V[i][k + 1] = V[i][k];
	                            V[i][k] = t;
	                        }
	                    }
	                    if (wantu && (k < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = U[i][k + 1];
	                            U[i][k + 1] = U[i][k];
	                            U[i][k] = t;
	                        }
	                    }
	                    k++;
	                }
	                iter = 0;
	                p--;
	                break;
	            }
	        }
	    }

	    if (swapped) {
	        var tmp = V;
	        V = U;
	        U = tmp;
	    }

	    this.m = m;
	    this.n = n;
	    this.s = s;
	    this.U = U;
	    this.V = V;
	}

	SingularValueDecomposition.prototype = {
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    },
	    get norm2() {
	        return this.s[0];
	    },
	    get rank() {
	        var eps = Math.pow(2, -52),
	            tol = Math.max(this.m, this.n) * this.s[0] * eps,
	            r = 0,
	            s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    },
	    get diagonal() {
	        return this.s;
	    },
	    // https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
	    get threshold() {
	        return (Math.pow(2, -52) / 2) * Math.max(this.m, this.n) * this.s[0];
	    },
	    get leftSingularVectors() {
	        return this.U;
	    },
	    get rightSingularVectors() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    },
	    solve: function (value) {

	        var Y = value,
	            e = this.threshold,
	            scols = this.s.length,
	            Ls = Matrix.zeros(scols, scols),
	            i;

	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }


	        var VL = this.V.mmul(Ls),
	            vrows = this.V.rows,
	            urows = this.U.rows,
	            VLU = Matrix.zeros(vrows, urows),
	            j, k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * this.U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }

	        return VLU.mmul(Y);
	    },
	    solveForDiagonal: function (value) {
	        return this.solve(Matrix.diag(value));
	    },
	    inverse: function () {
	        var e = this.threshold,
	            vrows = this.V.rows,
	            vcols = this.V.columns,
	            X = new Matrix(vrows, this.s.length),
	            i, j;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = this.V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }

	        var urows = this.U.rows,
	            ucols = this.U.columns,
	            Y = new Matrix(vrows, urows),
	            k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * this.U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }

	        return Y;
	    }
	};

	module.exports = SingularValueDecomposition;


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	exports.hypotenuse = function hypotenuse(a, b) {
	    var r;
	    if (Math.abs(a) > Math.abs(b)) {
	        r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(20);
	var hypotenuse = __webpack_require__(23).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	function EigenvalueDecomposition(matrix) {
	    if (!(this instanceof EigenvalueDecomposition)) {
	        return new EigenvalueDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);
	    if (!matrix.isSquare()) {
	        throw new Error('Matrix is not a square matrix');
	    }

	    var n = matrix.columns,
	        V = Matrix.zeros(n, n),
	        d = new Array(n),
	        e = new Array(n),
	        value = matrix,
	        i, j;

	    if (matrix.isSymmetric()) {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                V[i][j] = value[i][j];
	            }
	        }
	        tred2(n, e, d, V);
	        tql2(n, e, d, V);
	    }
	    else {
	        var H = Matrix.zeros(n, n),
	            ort = new Array(n);
	        for (j = 0; j < n; j++) {
	            for (i = 0; i < n; i++) {
	                H[i][j] = value[i][j];
	            }
	        }
	        orthes(n, H, ort, V);
	        hqr2(n, e, d, V, H);
	    }

	    this.n = n;
	    this.e = e;
	    this.d = d;
	    this.V = V;
	}

	EigenvalueDecomposition.prototype = {
	    get realEigenvalues() {
	        return this.d;
	    },
	    get imaginaryEigenvalues() {
	        return this.e;
	    },
	    get eigenvectorMatrix() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        var n = this.n,
	            e = this.e,
	            d = this.d,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            }
	            else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	};

	function tred2(n, e, d, V) {

	    var f, g, h, i, j, k,
	        hh, scale;

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }

	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }

	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }

	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }

	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }

	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }

	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }

	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }

	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }

	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }

	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}

	function tql2(n, e, d, V) {

	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;

	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }

	    e[n - 1] = 0;

	    var f = 0,
	        tst1 = 0,
	        eps = Math.pow(2, -52);

	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }

	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;

	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }

	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }

	                f = f + h;

	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);

	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }

	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;

	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }

	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }

	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}

	function orthes(n, H, ort, V) {

	    var low = 0,
	        high = n - 1,
	        f, g, h, i, j, m,
	        scale;

	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }

	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }

	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }

	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;

	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }

	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }

	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }

	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }

	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }

	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }

	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }

	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }

	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}

	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1,
	        low = 0,
	        high = nn - 1,
	        eps = Math.pow(2, -52),
	        exshift = 0,
	        norm = 0,
	        p = 0,
	        q = 0,
	        r = 0,
	        s = 0,
	        z = 0,
	        iter = 0,
	        i, j, k, l, m, t, w, x, y,
	        ra, sa, vr, vi,
	        notlast, cdivres;

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }

	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }

	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }

	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];

	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;

	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }

	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }

	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }

	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }

	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }

	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }

	            iter = iter + 1;

	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }

	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }

	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }

	                if (x === 0) {
	                    break;
	                }

	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }

	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }

	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;

	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }

	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }

	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }

	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }

	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }

	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }

	    if (norm === 0) {
	        return;
	    }

	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];

	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }

	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }

	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;

	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }

	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }

	                w = H[i][i] - p;

	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }

	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }

	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}

	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    }
	    else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}

	module.exports = EigenvalueDecomposition;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(20);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	function LuDecomposition(matrix) {
	    if (!(this instanceof LuDecomposition)) {
	        return new LuDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);

	    var lu = matrix.clone(),
	        rows = lu.rows,
	        columns = lu.columns,
	        pivotVector = new Array(rows),
	        pivotSign = 1,
	        i, j, k, p, s, t, v,
	        LUrowi, LUcolj, kmax;

	    for (i = 0; i < rows; i++) {
	        pivotVector[i] = i;
	    }

	    LUcolj = new Array(rows);

	    for (j = 0; j < columns; j++) {

	        for (i = 0; i < rows; i++) {
	            LUcolj[i] = lu[i][j];
	        }

	        for (i = 0; i < rows; i++) {
	            LUrowi = lu[i];
	            kmax = Math.min(i, j);
	            s = 0;
	            for (k = 0; k < kmax; k++) {
	                s += LUrowi[k] * LUcolj[k];
	            }
	            LUrowi[j] = LUcolj[i] -= s;
	        }

	        p = j;
	        for (i = j + 1; i < rows; i++) {
	            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                p = i;
	            }
	        }

	        if (p !== j) {
	            for (k = 0; k < columns; k++) {
	                t = lu[p][k];
	                lu[p][k] = lu[j][k];
	                lu[j][k] = t;
	            }

	            v = pivotVector[p];
	            pivotVector[p] = pivotVector[j];
	            pivotVector[j] = v;

	            pivotSign = -pivotSign;
	        }

	        if (j < rows && lu[j][j] !== 0) {
	            for (i = j + 1; i < rows; i++) {
	                lu[i][j] /= lu[j][j];
	            }
	        }
	    }

	    this.LU = lu;
	    this.pivotVector = pivotVector;
	    this.pivotSign = pivotSign;
	}

	LuDecomposition.prototype = {
	    isSingular: function () {
	        var data = this.LU,
	            col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    },
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare())
	            throw new Error('Matrix must be square');
	        var determinant = this.pivotSign, col = data.columns;
	        for (var j = 0; j < col; j++)
	            determinant *= data[j][j];
	        return determinant;
	    },
	    get lowerTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get upperTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var lu = this.LU,
	            rows = lu.rows;

	        if (rows !== value.rows)
	            throw new Error('Invalid matrix dimensions');
	        if (this.isSingular())
	            throw new Error('LU matrix is singular');

	        var count = value.columns,
	            X = value.subMatrixRow(this.pivotVector, 0, count - 1),
	            columns = lu.columns,
	            i, j, k;

	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = LuDecomposition;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(20);
	var hypotenuse = __webpack_require__(23).hypotenuse;

	//https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	function QrDecomposition(value) {
	    if (!(this instanceof QrDecomposition)) {
	        return new QrDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);

	    var qr = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        rdiag = new Array(n),
	        i, j, k, s;

	    for (k = 0; k < n; k++) {
	        var nrm = 0;
	        for (i = k; i < m; i++) {
	            nrm = hypotenuse(nrm, qr[i][k]);
	        }
	        if (nrm !== 0) {
	            if (qr[k][k] < 0) {
	                nrm = -nrm;
	            }
	            for (i = k; i < m; i++) {
	                qr[i][k] /= nrm;
	            }
	            qr[k][k] += 1;
	            for (j = k + 1; j < n; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * qr[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    qr[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        rdiag[k] = -nrm;
	    }

	    this.QR = qr;
	    this.Rdiag = rdiag;
	}

	QrDecomposition.prototype = {
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var qr = this.QR,
	            m = qr.rows;

	        if (value.rows !== m)
	            throw new Error('Matrix row dimensions must agree');
	        if (!this.isFullRank())
	            throw new Error('Matrix is rank deficient');

	        var count = value.columns,
	            X = value.clone(),
	            n = qr.columns,
	            i, j, k, s;

	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }

	        return X.subMatrix(0, n - 1, 0, count - 1);
	    },
	    isFullRank: function () {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    },
	    get upperTriangularFactor() {
	        var qr = this.QR,
	            n = qr.columns,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get orthogonalFactor() {
	        var qr = this.QR,
	            rows = qr.rows,
	            columns = qr.columns,
	            X = new Matrix(rows, columns),
	            i, j, k, s;

	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }

	                    s = -s / qr[k][k];

	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = QrDecomposition;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(20);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	function CholeskyDecomposition(value) {
	    if (!(this instanceof CholeskyDecomposition)) {
	        return new CholeskyDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);
	    if (!value.isSymmetric())
	        throw new Error('Matrix is not symmetric');

	    var a = value,
	        dimension = a.rows,
	        l = new Matrix(dimension, dimension),
	        positiveDefinite = true,
	        i, j, k;

	    for (j = 0; j < dimension; j++) {
	        var Lrowj = l[j];
	        var d = 0;
	        for (k = 0; k < j; k++) {
	            var Lrowk = l[k];
	            var s = 0;
	            for (i = 0; i < k; i++) {
	                s += Lrowk[i] * Lrowj[i];
	            }
	            Lrowj[k] = s = (a[j][k] - s) / l[k][k];
	            d = d + s * s;
	        }

	        d = a[j][j] - d;

	        positiveDefinite &= (d > 0);
	        l[j][j] = Math.sqrt(Math.max(d, 0));
	        for (k = j + 1; k < dimension; k++) {
	            l[j][k] = 0;
	        }
	    }

	    if (!positiveDefinite) {
	        throw new Error('Matrix is not positive definite');
	    }

	    this.L = l;
	}

	CholeskyDecomposition.prototype = {
	    get leftTriangularFactor() {
	        return this.L;
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var l = this.L,
	            dimension = l.rows;

	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }

	        var count = value.columns,
	            B = value.clone(),
	            i, j, k;

	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        return B;
	    }
	};

	module.exports = CholeskyDecomposition;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.distance = __webpack_require__(29);
	exports.similarity = __webpack_require__(74);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.additiveSymmetric = __webpack_require__(30);
	exports.avg = __webpack_require__(31);
	exports.bhattacharyya = __webpack_require__(32);
	exports.canberra = __webpack_require__(33);
	exports.chebyshev = __webpack_require__(34);
	exports.clark = __webpack_require__(35);
	exports.czekanowski = __webpack_require__(36);
	exports.dice = __webpack_require__(37);
	exports.divergence = __webpack_require__(38);
	exports.euclidean = __webpack_require__(39);
	exports.fidelity = __webpack_require__(40);
	exports.gower = __webpack_require__(41);
	exports.harmonicMean = __webpack_require__(42);
	exports.hellinger = __webpack_require__(43);
	exports.innerProduct = __webpack_require__(44);
	exports.intersection = __webpack_require__(45);
	exports.jaccard = __webpack_require__(46);
	exports.jeffreys = __webpack_require__(47);
	exports.jensenDifference = __webpack_require__(48);
	exports.jensenShannon = __webpack_require__(49);
	exports.kdivergence = __webpack_require__(50);
	exports.kulczynski = __webpack_require__(51);
	exports.kullbackLeibler = __webpack_require__(52);
	exports.kumarHassebrook = __webpack_require__(53);
	exports.kumarJohnson = __webpack_require__(54);
	exports.lorentzian = __webpack_require__(55);
	exports.manhattan = __webpack_require__(56);
	exports.matusita = __webpack_require__(57);
	exports.minkowski = __webpack_require__(58);
	exports.motyka = __webpack_require__(59);
	exports.neyman = __webpack_require__(60);
	exports.pearson = __webpack_require__(61);
	exports.probabilisticSymmetric = __webpack_require__(62);
	exports.ruzicka = __webpack_require__(63);
	exports.soergel = __webpack_require__(64);
	exports.sorensen = __webpack_require__(65);
	exports.squared = __webpack_require__(66);
	exports.squaredChord = __webpack_require__(67);
	exports.squaredEuclidean = __webpack_require__(39).squared;
	exports.taneja = __webpack_require__(68);
	exports.tanimoto = __webpack_require__(69);
	exports.topsoe = __webpack_require__(71);
	exports.tree = __webpack_require__(72);
	exports.waveHedges = __webpack_require__(73);


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function additiveSymmetric(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i]) * (a[i] + b[i])) / (a[i] * b[i]);
	    }
	    return 2 * d;
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function avg(a, b) {
	    var ii = a.length,
	        max = 0,
	        ans = 0,
	        aux = 0;
	    for (var i = 0; i < ii ; i++) {
	        aux = Math.abs(a[i] - b[i]);
	        ans += aux;
	        if (max < aux) {
	            max = aux;
	        }
	    }
	    return (max + ans) / 2;
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function bhattacharyya(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.sqrt(a[i] * b[i]);
	    }
	    return - Math.log(ans);
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function canberra(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.abs(a[i] - b[i]) / (a[i] + b[i]);
	    }
	    return ans;
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function chebyshev(a, b) {
	    var ii = a.length,
	        max = 0,
	        aux = 0;
	    for (var i = 0; i < ii ; i++) {
	        aux = Math.abs(a[i] - b[i]);
	        if (max < aux) {
	            max = aux;
	        }
	    }
	    return max;
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function clark(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += Math.sqrt(((a[i] - b[i]) * (a[i] - b[i])) / ((a[i] + b[i]) * (a[i] + b[i])));
	    }
	    return 2 * d;
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function czekanowski(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.min(a[i], b[i]);
	        down += a[i] + b[i];
	    }
	    return 1 - (2 * up / down);
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function dice(a, b) {
	    var ii = a.length,
	        p = 0,
	        q1 = 0,
	        q2 = 0;
	    for (var i = 0; i < ii ; i++) {
	        p += a[i] * a[i];
	        q1 += b[i] * b[i];
	        q2 += (a[i] - b[i]) * (a[i] - b[i]);
	    }
	    return q2 / (p + q1);
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = function divergence(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / ((a[i] + b[i]) * (a[i] + b[i]));
	    }
	    return 2 * d;
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	function squaredEuclidean(p, q) {
	    var d = 0;
	    for (var i = 0; i < p.length; i++) {
	        d += (p[i] - q[i]) * (p[i] - q[i]);
	    }
	    return d;
	}

	function euclidean(p, q) {
	    return Math.sqrt(squaredEuclidean(p, q));
	}

	module.exports = euclidean;
	euclidean.squared = squaredEuclidean;


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function fidelity(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.sqrt(a[i] * b[i]);
	    }
	    return ans;
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function gower(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.abs(a[i] - b[i]);
	    }
	    return ans / ii;
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function harmonicMean(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += (a[i] * b[i]) / (a[i] + b[i]);
	    }
	    return 2 * ans;
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = function hellinger(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.sqrt(a[i] * b[i]);
	    }
	    return 2 * Math.sqrt(1 - ans);
	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function innerProduct(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += a[i] * b[i];
	    }
	    return ans;
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = function intersection(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.min(a[i], b[i]);
	    }
	    return 1 - ans;
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = function jaccard(a, b) {
	    var ii = a.length,
	        p1 = 0,
	        p2 = 0,
	        q1 = 0,
	        q2 = 0;
	    for (var i = 0; i < ii ; i++) {
	        p1 += a[i] * b[i];
	        p2 += a[i] * a[i];
	        q1 += b[i] * b[i];
	        q2 += (a[i] - b[i]) * (a[i] - b[i]);
	    }
	    return q2 / (p2 + q1 - p1);
	};


/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = function jeffreys(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += (a[i] - b[i]) * Math.log(a[i] / b[i]);
	    }
	    return ans;
	};


/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function jensenDifference(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += ((a[i] * Math.log(a[i]) + b[i] * Math.log(b[i])) / 2) - ((a[i] + b[i]) / 2) * Math.log((a[i] + b[i]) / 2);
	    }
	    return ans;
	};


/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = function jensenShannon(a, b) {
	    var ii = a.length,
	        p = 0,
	        q = 0;
	    for (var i = 0; i < ii ; i++) {
	        p += a[i] * Math.log(2 * a[i] / (a[i] + b[i]));
	        q += b[i] * Math.log(2 * b[i] / (a[i] + b[i]));
	    }
	    return (p + q) / 2;
	};


/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = function kdivergence(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += a[i] * Math.log(2 * a[i] / (a[i] + b[i]));
	    }
	    return ans;
	};


/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function kulczynski(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.abs(a[i] - b[i]);
	        down += Math.min(a[i],b[i]);
	    }
	    return up / down;
	};


/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function kullbackLeibler(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += a[i] * Math.log(a[i] / b[i]);
	    }
	    return ans;
	};


/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function kumarHassebrook(a, b) {
	    var ii = a.length,
	        p = 0,
	        p2 = 0,
	        q2 = 0;
	    for (var i = 0; i < ii ; i++) {
	        p += a[i] * b[i];
	        p2 += a[i] * a[i];
	        q2 += b[i] * b[i];
	    }
	    return p / (p2 + q2 - p);
	};


/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function kumarJohnson(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.pow(a[i] * a[i] - b[i] * b[i],2) / (2 * Math.pow(a[i] * b[i],1.5));
	    }
	    return ans;
	};


/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function lorentzian(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.log(Math.abs(a[i] - b[i]) + 1);
	    }
	    return ans;
	};


/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function manhattan(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += Math.abs(a[i] - b[i]);
	    }
	    return d;
	};


/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function matusita(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.sqrt(a[i] * b[i]);
	    }
	    return Math.sqrt(2 - 2 * ans);
	};


/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = function minkowski(a, b, p) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += Math.pow(Math.abs(a[i] - b[i]),p);
	    }
	    return Math.pow(d,(1/p));
	};


/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function motyka(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.min(a[i], b[i]);
	        down += a[i] + b[i];
	    }
	    return 1 - (up / down);
	};


/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function pearson(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / a[i];
	    }
	    return d;
	};


/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function pearson(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / b[i];
	    }
	    return d;
	};


/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function probabilisticSymmetric(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / (a[i] + b[i]);
	    }
	    return 2 * d;
	};


/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function ruzicka(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.min(a[i],b[i]);
	        down += Math.max(a[i],b[i]);
	    }
	    return up / down;
	};


/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function soergel(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.abs(a[i] - b[i]);
	        down += Math.max(a[i],b[i]);
	    }
	    return up / down;
	};


/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function sorensen(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.abs(a[i] - b[i]);
	        down += a[i] + b[i];
	    }
	    return up / down;
	};


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function squared(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / (a[i] + b[i]);
	    }
	    return d;
	};


/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = function squaredChord(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += (Math.sqrt(a[i]) - Math.sqrt(b[i])) * (Math.sqrt(a[i]) - Math.sqrt(b[i]));
	    }
	    return ans;
	};


/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function taneja(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += (a[i] + b[i]) / 2 * Math.log((a[i] + b[i]) / (2 * Math.sqrt(a[i] * b[i])));
	    }
	    return ans;
	};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var tanimotoS = __webpack_require__(70);

	module.exports = function tanimoto(a, b, bitvector) {
	    if (bitvector)
	        return 1 - tanimotoS(a, b, bitvector);
	    else {
	        var ii = a.length,
	            p = 0,
	            q = 0,
	            m = 0;
	        for (var i = 0; i < ii ; i++) {
	            p += a[i];
	            q += b[i];
	            m += Math.min(a[i],b[i]);
	        }
	        return (p + q - 2 * m) / (p + q - m);
	    }
	};


/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function tanimoto(a, b, bitvector) {
	    if (bitvector) {
	        var inter = 0,
	            union = 0;
	        for (var j = 0; j < a.length; j++) {
	            inter += a[j] && b[j];
	            union += a[j] || b[j];
	        }
	        if (union === 0)
	            return 1;
	        return inter / union;
	    }
	    else {
	        var ii = a.length,
	            p = 0,
	            q = 0,
	            m = 0;
	        for (var i = 0; i < ii ; i++) {
	            p += a[i];
	            q += b[i];
	            m += Math.min(a[i],b[i]);
	        }
	        return 1 - (p + q - 2 * m) / (p + q - m);
	    }
	};


/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = function topsoe(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += a[i] * Math.log(2 * a[i] / (a[i] + b[i])) + b[i] * Math.log(2 * b[i] / (a[i] + b[i]));
	    }
	    return ans;
	};


/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Function that creates the tree
	 * @param {Array <number>} X - chemical shifts of the signal
	 * @param {Array <number>} Y - intensity of the signal
	 * @param {number} from - the low limit of x
	 * @param {number} to - the top limit of x
	 * @param {number} minWindow - smallest range to accept in x
	 * @param {number} threshold - smallest range to accept in y
	 * @returns {{sum: number, center: number, left: {json}, right: {json}}}
	 * left and right have the same structure than the parent, or have a
	 * undefined value if are leafs
	 */
	function createTree (X, Y, from, to, minWindow, threshold) {
	    minWindow = minWindow || 0.16;
	    threshold = threshold || 0.01;
	    if ((to - from) < minWindow)
	        return undefined;
	    var sum = 0;
	    for (var i = 0; X[i] < to; i++) {
	        if (X[i] > from)
	            sum += Y[i];
	    }
	    if (sum < threshold) {
	        return undefined;
	    }
	    var center = 0;
	    for (var j = 0; X[j] < to; j++) {
	        if (X[i] > from)
	            center += X[j] * Y[j];
	    }
	    center = center / sum;
	    if (((center - from) < 10e-6) || ((to - center) < 10e-6)) return undefined;
	    if ((center - from) < (minWindow /4)) {
	        return createTree(X, Y, center, to, minWindow, threshold);
	    }
	    else {
	        if ((to - center) < (minWindow / 4)) {
	            return createTree(X, Y, from, center, minWindow, threshold);
	        }
	        else {
	            return {
	                'sum': sum,
	                'center': center,
	                'left': createTree(X, Y, from, center, minWindow, threshold),
	                'right': createTree(X, Y, center, to, minWindow, threshold)
	            };
	        }
	    }
	}

	/**
	 * Similarity between two nodes
	 * @param {{sum: number, center: number, left: {json}, right: {json}}} a - tree A node
	 * @param {{sum: number, center: number, left: {json}, right: {json}}} b - tree B node
	 * @param {number} alpha - weights the relative importance of intensity vs. shift match
	 * @param {number} beta - weights the relative importance of node matching and children matching
	 * @param {number} gamma - controls the attenuation of the effect of chemical shift differences
	 * @returns {number} similarity measure between tree nodes
	 */
	function S(a, b, alpha, beta, gamma) {
	    if (a === undefined || b === undefined) {
	        return 0;
	    }
	    else {
	        var C = (alpha*Math.min(a.sum, b.sum)/Math.max(a.sum, b.sum)+ (1-alpha)*Math.exp(-gamma*Math.abs(a.center - b.center)));
	    }
	    return beta*C + (1-beta)*(S(a.left, b.left, alpha, beta, gamma)+S(a.right, b.right, alpha, beta, gamma));
	}

	/**
	 * @type {number} alpha - weights the relative importance of intensity vs. shift match
	 * @type {number} beta - weights the relative importance of node matching and children matching
	 * @type {number} gamma - controls the attenuation of the effect of chemical shift differences
	 * @type {number} minWindow - smallest range to accept in x
	 * @type {number} threshold - smallest range to accept in y
	 */
	var defaultOptions = {
	    minWindow: 0.16,
	    threshold : 0.01,
	    alpha: 0.1,
	    beta: 0.33,
	    gamma: 0.001
	};

	/**
	 * Builds a tree based in the spectra and compares this trees
	 * @param {{x: Array<number>, y: Array<number>}} A - first spectra to be compared
	 * @param {{x: Array<number>, y: Array<number>}} B - second spectra to be compared
	 * @param {number} from - the low limit of x
	 * @param {number} to - the top limit of x
	 * @param {{minWindow: number, threshold: number, alpha: number, beta: number, gamma: number}} options
	 * @returns {number} similarity measure between the spectra
	 */
	function tree(A, B, from, to, options) {
	    options = options || {};
	    for (var o in defaultOptions)
	        if (!options.hasOwnProperty(o)) {
	            options[o] = defaultOptions[o];
	        }
	    var Atree, Btree;
	    if (A.sum)
	        Atree = A;
	    else
	        Atree = createTree(A.x, A.y, from, to, options.minWindow, options.threshold);
	    if (B.sum)
	        Btree = B;
	    else
	        Btree = createTree(B.x, B.y, from, to, options.minWindow, options.threshold);
	    return S(Atree, Btree, options.alpha, options.beta, options.gamma);
	}

	module.exports = {
	    calc: tree,
	    createTree: createTree
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = function waveHedges(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += 1 - (Math.min(a[i], b[i]) / Math.max(a[i], b[i]));
	    }
	    return ans;
	};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.cosine = __webpack_require__(75);
	exports.czekanowski = __webpack_require__(76);
	exports.dice = __webpack_require__(77);
	exports.intersection = __webpack_require__(78);
	exports.jaccard = __webpack_require__(79);
	exports.kulczynski = __webpack_require__(80);
	exports.motyka = __webpack_require__(81);
	exports.pearson = __webpack_require__(82);
	exports.squaredChord = __webpack_require__(83);
	exports.tanimoto = __webpack_require__(70);


/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function cosine(a, b) {
	    var ii = a.length,
	        p = 0,
	        p2 = 0,
	        q2 = 0;
	    for (var i = 0; i < ii ; i++) {
	        p += a[i] * b[i];
	        p2 += a[i] * a[i];
	        q2 += b[i] * b[i];
	    }
	    return p / (Math.sqrt(p2) * Math.sqrt(q2));
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var czekanowskiD = __webpack_require__(36);

	module.exports = function czekanowski(a, b) {
	    return 1 - czekanowskiD(a,b);
	};


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var diceD = __webpack_require__(37);

	module.exports = function dice(a, b) {
	    return 1 - diceD(a,b);
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var intersectionD = __webpack_require__(45);

	module.exports = function intersection(a, b) {
	    return 1 - intersectionD(a,b);
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var jaccardD = __webpack_require__(46);

	module.exports = function jaccard(a, b) {
	    return 1 - jaccardD(a, b);
	};


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var kulczynskiD = __webpack_require__(51);

	module.exports = function kulczynski(a, b) {
	    return 1 / kulczynskiD(a, b);
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var motykaD = __webpack_require__(59);

	module.exports = function motyka(a, b) {
	    return 1 - motykaD(a,b);
	};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stat=__webpack_require__(5).array;
	var cosine=__webpack_require__(75);

	module.exports = function pearson(a, b) {
	    var avgA=stat.mean(a);
	    var avgB=stat.mean(b);

	    var newA=new Array(a.length);
	    var newB=new Array(b.length);
	    for (var i=0; i<newA.length; i++) {
	        newA[i]=a[i]-avgA;
	        newB[i]=b[i]-avgB;
	    }

	    return cosine(newA, newB);
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var squaredChordD = __webpack_require__(67);

	module.exports = function squaredChord(a, b) {
	    return 1 - squaredChordD(a, b);
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var numeric = __webpack_require__(85);

	/**
	 * Savitzky-Golay filter
	 * @param {Array <number>} y
	 * @param {number} dx
	 * @constructor
	 */
	function SavitzkyGolay (y, dx) {
	    this.data = y;
	    this.h = dx
	}

	var defaultOptions = {
	    windSize: 5,
	    deriv: 1,
	    pol: 2
	};

	/**
	 * Applies the filter
	 * @param options
	 * @returns {Array}
	 */
	SavitzkyGolay.prototype.calc = function (options) {
	    options = options || {};
	    this.options = {};
	    for (var o in defaultOptions) {
	        if (options.hasOwnProperty(o)) {
	            this.options[o] = options[o];
	        } else {
	            this.options[o] = defaultOptions[o];
	        }
	    }
	    if ((this.options.windSize % 2 === 0) || (this.options.windSize < 5))
	        throw new RangeError('Invalid window size');
	    if ((this.options.deriv < 0) || (this.options.pol < 1))
	        throw new RangeError('Number too small');
	    if ((this.options.pol !== Math.floor(this.options.pol)) || (this.options.deriv !== Math.floor(this.options.deriv)) || (this.options.windSize !== Math.floor(this.options.windSize)))
	        throw new TypeError('Only integers allowed');

	    var C, norm;
	    if ((this.options.windSize === 5) && (this.options.pol === 2) && ((this.options.deriv === 1) || (this.options.deriv === 2))) {
	        if (this.options.deriv === 1) {
	            C = [-2,-1,0,1,2];
	            norm = 10;
	        }
	        else {
	            C = [2, -1, -2, -1, 2];
	            norm = 7;
	        }
	    }
	    else {
	        var J = new Array(this.options.windSize);
	        for (var i = 0; i < J.length; i++) {
	            J[i] = new Array(this.options.pol + 1);
	            var inic = -(this.options.windSize - 1) / 2;
	            for (var j = 0; j < J[i].length; j++) {
	                if ((inic + 1 === 0) && (j === 0))
	                    J[i][j] = 1;
	                else
	                    J[i][j] = Math.pow((inic + i), j);
	            }
	        }
	        C = numeric.dot(numeric.inv(numeric.dot(numeric.transpose(J), J)), numeric.transpose(J));
	        C = C[this.options.deriv].concat();
	        norm = 1;
	    }
	    var ans =  new Array(this.data.length);
	    for (var k = Math.ceil(this.options.windSize / 2); k < (ans.length - Math.floor(this.options.windSize / 2)); k++) {
	        var d = 0;
	        for (var l = 0; l < C.length; l++) {
	            d += C[l] * this.data[l + k - Math.floor(this.options.windSize / 2)] / (norm * Math.pow(this.h, this.options.deriv));
	        }
	        ans[k] = d;
	    }
	    for (var a = 0; a < Math.ceil(this.options.windSize / 2); a++)
	        ans[a] = ans[Math.ceil(this.options.windSize / 2)];
	    for (var b = (ans.length - Math.floor(this.options.windSize / 2)); b < ans.length; b++)
	        ans[b] = ans[(ans.length - Math.floor(this.options.windSize / 2)) - 1];
	    return ans;
	};

	module.exports = SavitzkyGolay;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var numeric = ( false)?(function numeric() {}):(exports);
	if(typeof global !== "undefined") { global.numeric = numeric; }

	numeric.version = "1.2.6";

	// 1. Utility functions
	numeric.bench = function bench (f,interval) {
	    var t1,t2,n,i;
	    if(typeof interval === "undefined") { interval = 15; }
	    n = 0.5;
	    t1 = new Date();
	    while(1) {
	        n*=2;
	        for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
	        while(i>0) { f(); i--; }
	        t2 = new Date();
	        if(t2-t1 > interval) break;
	    }
	    for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
	    while(i>0) { f(); i--; }
	    t2 = new Date();
	    return 1000*(3*n-1)/(t2-t1);
	}

	numeric._myIndexOf = (function _myIndexOf(w) {
	    var n = this.length,k;
	    for(k=0;k<n;++k) if(this[k]===w) return k;
	    return -1;
	});
	numeric.myIndexOf = (Array.prototype.indexOf)?Array.prototype.indexOf:numeric._myIndexOf;

	numeric.Function = Function;
	numeric.precision = 4;
	numeric.largeArray = 50;

	numeric.prettyPrint = function prettyPrint(x) {
	    function fmtnum(x) {
	        if(x === 0) { return '0'; }
	        if(isNaN(x)) { return 'NaN'; }
	        if(x<0) { return '-'+fmtnum(-x); }
	        if(isFinite(x)) {
	            var scale = Math.floor(Math.log(x) / Math.log(10));
	            var normalized = x / Math.pow(10,scale);
	            var basic = normalized.toPrecision(numeric.precision);
	            if(parseFloat(basic) === 10) { scale++; normalized = 1; basic = normalized.toPrecision(numeric.precision); }
	            return parseFloat(basic).toString()+'e'+scale.toString();
	        }
	        return 'Infinity';
	    }
	    var ret = [];
	    function foo(x) {
	        var k;
	        if(typeof x === "undefined") { ret.push(Array(numeric.precision+8).join(' ')); return false; }
	        if(typeof x === "string") { ret.push('"'+x+'"'); return false; }
	        if(typeof x === "boolean") { ret.push(x.toString()); return false; }
	        if(typeof x === "number") {
	            var a = fmtnum(x);
	            var b = x.toPrecision(numeric.precision);
	            var c = parseFloat(x.toString()).toString();
	            var d = [a,b,c,parseFloat(b).toString(),parseFloat(c).toString()];
	            for(k=1;k<d.length;k++) { if(d[k].length < a.length) a = d[k]; }
	            ret.push(Array(numeric.precision+8-a.length).join(' ')+a);
	            return false;
	        }
	        if(x === null) { ret.push("null"); return false; }
	        if(typeof x === "function") { 
	            ret.push(x.toString());
	            var flag = false;
	            for(k in x) { if(x.hasOwnProperty(k)) { 
	                if(flag) ret.push(',\n');
	                else ret.push('\n{');
	                flag = true; 
	                ret.push(k); 
	                ret.push(': \n'); 
	                foo(x[k]); 
	            } }
	            if(flag) ret.push('}\n');
	            return true;
	        }
	        if(x instanceof Array) {
	            if(x.length > numeric.largeArray) { ret.push('...Large Array...'); return true; }
	            var flag = false;
	            ret.push('[');
	            for(k=0;k<x.length;k++) { if(k>0) { ret.push(','); if(flag) ret.push('\n '); } flag = foo(x[k]); }
	            ret.push(']');
	            return true;
	        }
	        ret.push('{');
	        var flag = false;
	        for(k in x) { if(x.hasOwnProperty(k)) { if(flag) ret.push(',\n'); flag = true; ret.push(k); ret.push(': \n'); foo(x[k]); } }
	        ret.push('}');
	        return true;
	    }
	    foo(x);
	    return ret.join('');
	}

	numeric.parseDate = function parseDate(d) {
	    function foo(d) {
	        if(typeof d === 'string') { return Date.parse(d.replace(/-/g,'/')); }
	        if(!(d instanceof Array)) { throw new Error("parseDate: parameter must be arrays of strings"); }
	        var ret = [],k;
	        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
	        return ret;
	    }
	    return foo(d);
	}

	numeric.parseFloat = function parseFloat_(d) {
	    function foo(d) {
	        if(typeof d === 'string') { return parseFloat(d); }
	        if(!(d instanceof Array)) { throw new Error("parseFloat: parameter must be arrays of strings"); }
	        var ret = [],k;
	        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
	        return ret;
	    }
	    return foo(d);
	}

	numeric.parseCSV = function parseCSV(t) {
	    var foo = t.split('\n');
	    var j,k;
	    var ret = [];
	    var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
	    var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
	    var stripper = function(n) { return n.substr(0,n.length-1); }
	    var count = 0;
	    for(k=0;k<foo.length;k++) {
	      var bar = (foo[k]+",").match(pat),baz;
	      if(bar.length>0) {
	          ret[count] = [];
	          for(j=0;j<bar.length;j++) {
	              baz = stripper(bar[j]);
	              if(patnum.test(baz)) { ret[count][j] = parseFloat(baz); }
	              else ret[count][j] = baz;
	          }
	          count++;
	      }
	    }
	    return ret;
	}

	numeric.toCSV = function toCSV(A) {
	    var s = numeric.dim(A);
	    var i,j,m,n,row,ret;
	    m = s[0];
	    n = s[1];
	    ret = [];
	    for(i=0;i<m;i++) {
	        row = [];
	        for(j=0;j<m;j++) { row[j] = A[i][j].toString(); }
	        ret[i] = row.join(', ');
	    }
	    return ret.join('\n')+'\n';
	}

	numeric.getURL = function getURL(url) {
	    var client = new XMLHttpRequest();
	    client.open("GET",url,false);
	    client.send();
	    return client;
	}

	numeric.imageURL = function imageURL(img) {
	    function base64(A) {
	        var n = A.length, i,x,y,z,p,q,r,s;
	        var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	        var ret = "";
	        for(i=0;i<n;i+=3) {
	            x = A[i];
	            y = A[i+1];
	            z = A[i+2];
	            p = x >> 2;
	            q = ((x & 3) << 4) + (y >> 4);
	            r = ((y & 15) << 2) + (z >> 6);
	            s = z & 63;
	            if(i+1>=n) { r = s = 64; }
	            else if(i+2>=n) { s = 64; }
	            ret += key.charAt(p) + key.charAt(q) + key.charAt(r) + key.charAt(s);
	            }
	        return ret;
	    }
	    function crc32Array (a,from,to) {
	        if(typeof from === "undefined") { from = 0; }
	        if(typeof to === "undefined") { to = a.length; }
	        var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
	                     0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 
	                     0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
	                     0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 
	                     0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 
	                     0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 
	                     0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
	                     0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
	                     0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
	                     0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 
	                     0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 
	                     0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 
	                     0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 
	                     0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 
	                     0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 
	                     0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 
	                     0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 
	                     0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 
	                     0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 
	                     0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 
	                     0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 
	                     0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 
	                     0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 
	                     0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 
	                     0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 
	                     0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 
	                     0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 
	                     0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 
	                     0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 
	                     0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 
	                     0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 
	                     0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
	     
	        var crc = -1, y = 0, n = a.length,i;

	        for (i = from; i < to; i++) {
	            y = (crc ^ a[i]) & 0xFF;
	            crc = (crc >>> 8) ^ table[y];
	        }
	     
	        return crc ^ (-1);
	    }

	    var h = img[0].length, w = img[0][0].length, s1, s2, next,k,length,a,b,i,j,adler32,crc32;
	    var stream = [
	                  137, 80, 78, 71, 13, 10, 26, 10,                           //  0: PNG signature
	                  0,0,0,13,                                                  //  8: IHDR Chunk length
	                  73, 72, 68, 82,                                            // 12: "IHDR" 
	                  (w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w&255,   // 16: Width
	                  (h >> 24) & 255, (h >> 16) & 255, (h >> 8) & 255, h&255,   // 20: Height
	                  8,                                                         // 24: bit depth
	                  2,                                                         // 25: RGB
	                  0,                                                         // 26: deflate
	                  0,                                                         // 27: no filter
	                  0,                                                         // 28: no interlace
	                  -1,-2,-3,-4,                                               // 29: CRC
	                  -5,-6,-7,-8,                                               // 33: IDAT Chunk length
	                  73, 68, 65, 84,                                            // 37: "IDAT"
	                  // RFC 1950 header starts here
	                  8,                                                         // 41: RFC1950 CMF
	                  29                                                         // 42: RFC1950 FLG
	                  ];
	    crc32 = crc32Array(stream,12,29);
	    stream[29] = (crc32>>24)&255;
	    stream[30] = (crc32>>16)&255;
	    stream[31] = (crc32>>8)&255;
	    stream[32] = (crc32)&255;
	    s1 = 1;
	    s2 = 0;
	    for(i=0;i<h;i++) {
	        if(i<h-1) { stream.push(0); }
	        else { stream.push(1); }
	        a = (3*w+1+(i===0))&255; b = ((3*w+1+(i===0))>>8)&255;
	        stream.push(a); stream.push(b);
	        stream.push((~a)&255); stream.push((~b)&255);
	        if(i===0) stream.push(0);
	        for(j=0;j<w;j++) {
	            for(k=0;k<3;k++) {
	                a = img[k][i][j];
	                if(a>255) a = 255;
	                else if(a<0) a=0;
	                else a = Math.round(a);
	                s1 = (s1 + a )%65521;
	                s2 = (s2 + s1)%65521;
	                stream.push(a);
	            }
	        }
	        stream.push(0);
	    }
	    adler32 = (s2<<16)+s1;
	    stream.push((adler32>>24)&255);
	    stream.push((adler32>>16)&255);
	    stream.push((adler32>>8)&255);
	    stream.push((adler32)&255);
	    length = stream.length - 41;
	    stream[33] = (length>>24)&255;
	    stream[34] = (length>>16)&255;
	    stream[35] = (length>>8)&255;
	    stream[36] = (length)&255;
	    crc32 = crc32Array(stream,37);
	    stream.push((crc32>>24)&255);
	    stream.push((crc32>>16)&255);
	    stream.push((crc32>>8)&255);
	    stream.push((crc32)&255);
	    stream.push(0);
	    stream.push(0);
	    stream.push(0);
	    stream.push(0);
	//    a = stream.length;
	    stream.push(73);  // I
	    stream.push(69);  // E
	    stream.push(78);  // N
	    stream.push(68);  // D
	    stream.push(174); // CRC1
	    stream.push(66);  // CRC2
	    stream.push(96);  // CRC3
	    stream.push(130); // CRC4
	    return 'data:image/png;base64,'+base64(stream);
	}

	// 2. Linear algebra with Arrays.
	numeric._dim = function _dim(x) {
	    var ret = [];
	    while(typeof x === "object") { ret.push(x.length); x = x[0]; }
	    return ret;
	}

	numeric.dim = function dim(x) {
	    var y,z;
	    if(typeof x === "object") {
	        y = x[0];
	        if(typeof y === "object") {
	            z = y[0];
	            if(typeof z === "object") {
	                return numeric._dim(x);
	            }
	            return [x.length,y.length];
	        }
	        return [x.length];
	    }
	    return [];
	}

	numeric.mapreduce = function mapreduce(body,init) {
	    return Function('x','accum','_s','_k',
	            'if(typeof accum === "undefined") accum = '+init+';\n'+
	            'if(typeof x === "number") { var xi = x; '+body+'; return accum; }\n'+
	            'if(typeof _s === "undefined") _s = numeric.dim(x);\n'+
	            'if(typeof _k === "undefined") _k = 0;\n'+
	            'var _n = _s[_k];\n'+
	            'var i,xi;\n'+
	            'if(_k < _s.length-1) {\n'+
	            '    for(i=_n-1;i>=0;i--) {\n'+
	            '        accum = arguments.callee(x[i],accum,_s,_k+1);\n'+
	            '    }'+
	            '    return accum;\n'+
	            '}\n'+
	            'for(i=_n-1;i>=1;i-=2) { \n'+
	            '    xi = x[i];\n'+
	            '    '+body+';\n'+
	            '    xi = x[i-1];\n'+
	            '    '+body+';\n'+
	            '}\n'+
	            'if(i === 0) {\n'+
	            '    xi = x[i];\n'+
	            '    '+body+'\n'+
	            '}\n'+
	            'return accum;'
	            );
	}
	numeric.mapreduce2 = function mapreduce2(body,setup) {
	    return Function('x',
	            'var n = x.length;\n'+
	            'var i,xi;\n'+setup+';\n'+
	            'for(i=n-1;i!==-1;--i) { \n'+
	            '    xi = x[i];\n'+
	            '    '+body+';\n'+
	            '}\n'+
	            'return accum;'
	            );
	}


	numeric.same = function same(x,y) {
	    var i,n;
	    if(!(x instanceof Array) || !(y instanceof Array)) { return false; }
	    n = x.length;
	    if(n !== y.length) { return false; }
	    for(i=0;i<n;i++) {
	        if(x[i] === y[i]) { continue; }
	        if(typeof x[i] === "object") { if(!same(x[i],y[i])) return false; }
	        else { return false; }
	    }
	    return true;
	}

	numeric.rep = function rep(s,v,k) {
	    if(typeof k === "undefined") { k=0; }
	    var n = s[k], ret = Array(n), i;
	    if(k === s.length-1) {
	        for(i=n-2;i>=0;i-=2) { ret[i+1] = v; ret[i] = v; }
	        if(i===-1) { ret[0] = v; }
	        return ret;
	    }
	    for(i=n-1;i>=0;i--) { ret[i] = numeric.rep(s,v,k+1); }
	    return ret;
	}


	numeric.dotMMsmall = function dotMMsmall(x,y) {
	    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
	    p = x.length; q = y.length; r = y[0].length;
	    ret = Array(p);
	    for(i=p-1;i>=0;i--) {
	        foo = Array(r);
	        bar = x[i];
	        for(k=r-1;k>=0;k--) {
	            woo = bar[q-1]*y[q-1][k];
	            for(j=q-2;j>=1;j-=2) {
	                i0 = j-1;
	                woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
	            }
	            if(j===0) { woo += bar[0]*y[0][k]; }
	            foo[k] = woo;
	        }
	        ret[i] = foo;
	    }
	    return ret;
	}
	numeric._getCol = function _getCol(A,j,x) {
	    var n = A.length, i;
	    for(i=n-1;i>0;--i) {
	        x[i] = A[i][j];
	        --i;
	        x[i] = A[i][j];
	    }
	    if(i===0) x[0] = A[0][j];
	}
	numeric.dotMMbig = function dotMMbig(x,y){
	    var gc = numeric._getCol, p = y.length, v = Array(p);
	    var m = x.length, n = y[0].length, A = new Array(m), xj;
	    var VV = numeric.dotVV;
	    var i,j,k,z;
	    --p;
	    --m;
	    for(i=m;i!==-1;--i) A[i] = Array(n);
	    --n;
	    for(i=n;i!==-1;--i) {
	        gc(y,i,v);
	        for(j=m;j!==-1;--j) {
	            z=0;
	            xj = x[j];
	            A[j][i] = VV(xj,v);
	        }
	    }
	    return A;
	}

	numeric.dotMV = function dotMV(x,y) {
	    var p = x.length, q = y.length,i;
	    var ret = Array(p), dotVV = numeric.dotVV;
	    for(i=p-1;i>=0;i--) { ret[i] = dotVV(x[i],y); }
	    return ret;
	}

	numeric.dotVM = function dotVM(x,y) {
	    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
	    p = x.length; q = y[0].length;
	    ret = Array(q);
	    for(k=q-1;k>=0;k--) {
	        woo = x[p-1]*y[p-1][k];
	        for(j=p-2;j>=1;j-=2) {
	            i0 = j-1;
	            woo += x[j]*y[j][k] + x[i0]*y[i0][k];
	        }
	        if(j===0) { woo += x[0]*y[0][k]; }
	        ret[k] = woo;
	    }
	    return ret;
	}

	numeric.dotVV = function dotVV(x,y) {
	    var i,n=x.length,i1,ret = x[n-1]*y[n-1];
	    for(i=n-2;i>=1;i-=2) {
	        i1 = i-1;
	        ret += x[i]*y[i] + x[i1]*y[i1];
	    }
	    if(i===0) { ret += x[0]*y[0]; }
	    return ret;
	}

	numeric.dot = function dot(x,y) {
	    var d = numeric.dim;
	    switch(d(x).length*1000+d(y).length) {
	    case 2002:
	        if(y.length < 10) return numeric.dotMMsmall(x,y);
	        else return numeric.dotMMbig(x,y);
	    case 2001: return numeric.dotMV(x,y);
	    case 1002: return numeric.dotVM(x,y);
	    case 1001: return numeric.dotVV(x,y);
	    case 1000: return numeric.mulVS(x,y);
	    case 1: return numeric.mulSV(x,y);
	    case 0: return x*y;
	    default: throw new Error('numeric.dot only works on vectors and matrices');
	    }
	}

	numeric.diag = function diag(d) {
	    var i,i1,j,n = d.length, A = Array(n), Ai;
	    for(i=n-1;i>=0;i--) {
	        Ai = Array(n);
	        i1 = i+2;
	        for(j=n-1;j>=i1;j-=2) {
	            Ai[j] = 0;
	            Ai[j-1] = 0;
	        }
	        if(j>i) { Ai[j] = 0; }
	        Ai[i] = d[i];
	        for(j=i-1;j>=1;j-=2) {
	            Ai[j] = 0;
	            Ai[j-1] = 0;
	        }
	        if(j===0) { Ai[0] = 0; }
	        A[i] = Ai;
	    }
	    return A;
	}
	numeric.getDiag = function(A) {
	    var n = Math.min(A.length,A[0].length),i,ret = Array(n);
	    for(i=n-1;i>=1;--i) {
	        ret[i] = A[i][i];
	        --i;
	        ret[i] = A[i][i];
	    }
	    if(i===0) {
	        ret[0] = A[0][0];
	    }
	    return ret;
	}

	numeric.identity = function identity(n) { return numeric.diag(numeric.rep([n],1)); }
	numeric.pointwise = function pointwise(params,body,setup) {
	    if(typeof setup === "undefined") { setup = ""; }
	    var fun = [];
	    var k;
	    var avec = /\[i\]$/,p,thevec = '';
	    var haveret = false;
	    for(k=0;k<params.length;k++) {
	        if(avec.test(params[k])) {
	            p = params[k].substring(0,params[k].length-3);
	            thevec = p;
	        } else { p = params[k]; }
	        if(p==='ret') haveret = true;
	        fun.push(p);
	    }
	    fun[params.length] = '_s';
	    fun[params.length+1] = '_k';
	    fun[params.length+2] = (
	            'if(typeof _s === "undefined") _s = numeric.dim('+thevec+');\n'+
	            'if(typeof _k === "undefined") _k = 0;\n'+
	            'var _n = _s[_k];\n'+
	            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
	            'if(_k < _s.length-1) {\n'+
	            '    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee('+params.join(',')+',_s,_k+1);\n'+
	            '    return ret;\n'+
	            '}\n'+
	            setup+'\n'+
	            'for(i=_n-1;i!==-1;--i) {\n'+
	            '    '+body+'\n'+
	            '}\n'+
	            'return ret;'
	            );
	    return Function.apply(null,fun);
	}
	numeric.pointwise2 = function pointwise2(params,body,setup) {
	    if(typeof setup === "undefined") { setup = ""; }
	    var fun = [];
	    var k;
	    var avec = /\[i\]$/,p,thevec = '';
	    var haveret = false;
	    for(k=0;k<params.length;k++) {
	        if(avec.test(params[k])) {
	            p = params[k].substring(0,params[k].length-3);
	            thevec = p;
	        } else { p = params[k]; }
	        if(p==='ret') haveret = true;
	        fun.push(p);
	    }
	    fun[params.length] = (
	            'var _n = '+thevec+'.length;\n'+
	            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
	            setup+'\n'+
	            'for(i=_n-1;i!==-1;--i) {\n'+
	            body+'\n'+
	            '}\n'+
	            'return ret;'
	            );
	    return Function.apply(null,fun);
	}
	numeric._biforeach = (function _biforeach(x,y,s,k,f) {
	    if(k === s.length-1) { f(x,y); return; }
	    var i,n=s[k];
	    for(i=n-1;i>=0;i--) { _biforeach(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
	});
	numeric._biforeach2 = (function _biforeach2(x,y,s,k,f) {
	    if(k === s.length-1) { return f(x,y); }
	    var i,n=s[k],ret = Array(n);
	    for(i=n-1;i>=0;--i) { ret[i] = _biforeach2(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
	    return ret;
	});
	numeric._foreach = (function _foreach(x,s,k,f) {
	    if(k === s.length-1) { f(x); return; }
	    var i,n=s[k];
	    for(i=n-1;i>=0;i--) { _foreach(x[i],s,k+1,f); }
	});
	numeric._foreach2 = (function _foreach2(x,s,k,f) {
	    if(k === s.length-1) { return f(x); }
	    var i,n=s[k], ret = Array(n);
	    for(i=n-1;i>=0;i--) { ret[i] = _foreach2(x[i],s,k+1,f); }
	    return ret;
	});

	/*numeric.anyV = numeric.mapreduce('if(xi) return true;','false');
	numeric.allV = numeric.mapreduce('if(!xi) return false;','true');
	numeric.any = function(x) { if(typeof x.length === "undefined") return x; return numeric.anyV(x); }
	numeric.all = function(x) { if(typeof x.length === "undefined") return x; return numeric.allV(x); }*/

	numeric.ops2 = {
	        add: '+',
	        sub: '-',
	        mul: '*',
	        div: '/',
	        mod: '%',
	        and: '&&',
	        or:  '||',
	        eq:  '===',
	        neq: '!==',
	        lt:  '<',
	        gt:  '>',
	        leq: '<=',
	        geq: '>=',
	        band: '&',
	        bor: '|',
	        bxor: '^',
	        lshift: '<<',
	        rshift: '>>',
	        rrshift: '>>>'
	};
	numeric.opseq = {
	        addeq: '+=',
	        subeq: '-=',
	        muleq: '*=',
	        diveq: '/=',
	        modeq: '%=',
	        lshifteq: '<<=',
	        rshifteq: '>>=',
	        rrshifteq: '>>>=',
	        bandeq: '&=',
	        boreq: '|=',
	        bxoreq: '^='
	};
	numeric.mathfuns = ['abs','acos','asin','atan','ceil','cos',
	                    'exp','floor','log','round','sin','sqrt','tan',
	                    'isNaN','isFinite'];
	numeric.mathfuns2 = ['atan2','pow','max','min'];
	numeric.ops1 = {
	        neg: '-',
	        not: '!',
	        bnot: '~',
	        clone: ''
	};
	numeric.mapreducers = {
	        any: ['if(xi) return true;','var accum = false;'],
	        all: ['if(!xi) return false;','var accum = true;'],
	        sum: ['accum += xi;','var accum = 0;'],
	        prod: ['accum *= xi;','var accum = 1;'],
	        norm2Squared: ['accum += xi*xi;','var accum = 0;'],
	        norminf: ['accum = max(accum,abs(xi));','var accum = 0, max = Math.max, abs = Math.abs;'],
	        norm1: ['accum += abs(xi)','var accum = 0, abs = Math.abs;'],
	        sup: ['accum = max(accum,xi);','var accum = -Infinity, max = Math.max;'],
	        inf: ['accum = min(accum,xi);','var accum = Infinity, min = Math.min;']
	};

	(function () {
	    var i,o;
	    for(i=0;i<numeric.mathfuns2.length;++i) {
	        o = numeric.mathfuns2[i];
	        numeric.ops2[o] = o;
	    }
	    for(i in numeric.ops2) {
	        if(numeric.ops2.hasOwnProperty(i)) {
	            o = numeric.ops2[i];
	            var code, codeeq, setup = '';
	            if(numeric.myIndexOf.call(numeric.mathfuns2,i)!==-1) {
	                setup = 'var '+o+' = Math.'+o+';\n';
	                code = function(r,x,y) { return r+' = '+o+'('+x+','+y+')'; };
	                codeeq = function(x,y) { return x+' = '+o+'('+x+','+y+')'; };
	            } else {
	                code = function(r,x,y) { return r+' = '+x+' '+o+' '+y; };
	                if(numeric.opseq.hasOwnProperty(i+'eq')) {
	                    codeeq = function(x,y) { return x+' '+o+'= '+y; };
	                } else {
	                    codeeq = function(x,y) { return x+' = '+x+' '+o+' '+y; };                    
	                }
	            }
	            numeric[i+'VV'] = numeric.pointwise2(['x[i]','y[i]'],code('ret[i]','x[i]','y[i]'),setup);
	            numeric[i+'SV'] = numeric.pointwise2(['x','y[i]'],code('ret[i]','x','y[i]'),setup);
	            numeric[i+'VS'] = numeric.pointwise2(['x[i]','y'],code('ret[i]','x[i]','y'),setup);
	            numeric[i] = Function(
	                    'var n = arguments.length, i, x = arguments[0], y;\n'+
	                    'var VV = numeric.'+i+'VV, VS = numeric.'+i+'VS, SV = numeric.'+i+'SV;\n'+
	                    'var dim = numeric.dim;\n'+
	                    'for(i=1;i!==n;++i) { \n'+
	                    '  y = arguments[i];\n'+
	                    '  if(typeof x === "object") {\n'+
	                    '      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n'+
	                    '      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n'+
	                    '  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n'+
	                    '  else '+codeeq('x','y')+'\n'+
	                    '}\nreturn x;\n');
	            numeric[o] = numeric[i];
	            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]','x[i]'], codeeq('ret[i]','x[i]'),setup);
	            numeric[i+'eqS'] = numeric.pointwise2(['ret[i]','x'], codeeq('ret[i]','x'),setup);
	            numeric[i+'eq'] = Function(
	                    'var n = arguments.length, i, x = arguments[0], y;\n'+
	                    'var V = numeric.'+i+'eqV, S = numeric.'+i+'eqS\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'for(i=1;i!==n;++i) { \n'+
	                    '  y = arguments[i];\n'+
	                    '  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n'+
	                    '  else numeric._biforeach(x,y,s,0,S);\n'+
	                    '}\nreturn x;\n');
	        }
	    }
	    for(i=0;i<numeric.mathfuns2.length;++i) {
	        o = numeric.mathfuns2[i];
	        delete numeric.ops2[o];
	    }
	    for(i=0;i<numeric.mathfuns.length;++i) {
	        o = numeric.mathfuns[i];
	        numeric.ops1[o] = o;
	    }
	    for(i in numeric.ops1) {
	        if(numeric.ops1.hasOwnProperty(i)) {
	            setup = '';
	            o = numeric.ops1[i];
	            if(numeric.myIndexOf.call(numeric.mathfuns,i)!==-1) {
	                if(Math.hasOwnProperty(o)) setup = 'var '+o+' = Math.'+o+';\n';
	            }
	            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]'],'ret[i] = '+o+'(ret[i]);',setup);
	            numeric[i+'eq'] = Function('x',
	                    'if(typeof x !== "object") return '+o+'x\n'+
	                    'var i;\n'+
	                    'var V = numeric.'+i+'eqV;\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'numeric._foreach(x,s,0,V);\n'+
	                    'return x;\n');
	            numeric[i+'V'] = numeric.pointwise2(['x[i]'],'ret[i] = '+o+'(x[i]);',setup);
	            numeric[i] = Function('x',
	                    'if(typeof x !== "object") return '+o+'(x)\n'+
	                    'var i;\n'+
	                    'var V = numeric.'+i+'V;\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'return numeric._foreach2(x,s,0,V);\n');
	        }
	    }
	    for(i=0;i<numeric.mathfuns.length;++i) {
	        o = numeric.mathfuns[i];
	        delete numeric.ops1[o];
	    }
	    for(i in numeric.mapreducers) {
	        if(numeric.mapreducers.hasOwnProperty(i)) {
	            o = numeric.mapreducers[i];
	            numeric[i+'V'] = numeric.mapreduce2(o[0],o[1]);
	            numeric[i] = Function('x','s','k',
	                    o[1]+
	                    'if(typeof x !== "object") {'+
	                    '    xi = x;\n'+
	                    o[0]+';\n'+
	                    '    return accum;\n'+
	                    '}'+
	                    'if(typeof s === "undefined") s = numeric.dim(x);\n'+
	                    'if(typeof k === "undefined") k = 0;\n'+
	                    'if(k === s.length-1) return numeric.'+i+'V(x);\n'+
	                    'var xi;\n'+
	                    'var n = x.length, i;\n'+
	                    'for(i=n-1;i!==-1;--i) {\n'+
	                    '   xi = arguments.callee(x[i]);\n'+
	                    o[0]+';\n'+
	                    '}\n'+
	                    'return accum;\n');
	        }
	    }
	}());

	numeric.truncVV = numeric.pointwise(['x[i]','y[i]'],'ret[i] = round(x[i]/y[i])*y[i];','var round = Math.round;');
	numeric.truncVS = numeric.pointwise(['x[i]','y'],'ret[i] = round(x[i]/y)*y;','var round = Math.round;');
	numeric.truncSV = numeric.pointwise(['x','y[i]'],'ret[i] = round(x/y[i])*y[i];','var round = Math.round;');
	numeric.trunc = function trunc(x,y) {
	    if(typeof x === "object") {
	        if(typeof y === "object") return numeric.truncVV(x,y);
	        return numeric.truncVS(x,y);
	    }
	    if (typeof y === "object") return numeric.truncSV(x,y);
	    return Math.round(x/y)*y;
	}

	numeric.inv = function inv(x) {
	    var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
	    var A = numeric.clone(x), Ai, Aj;
	    var I = numeric.identity(m), Ii, Ij;
	    var i,j,k,x;
	    for(j=0;j<n;++j) {
	        var i0 = -1;
	        var v0 = -1;
	        for(i=j;i!==m;++i) { k = abs(A[i][j]); if(k>v0) { i0 = i; v0 = k; } }
	        Aj = A[i0]; A[i0] = A[j]; A[j] = Aj;
	        Ij = I[i0]; I[i0] = I[j]; I[j] = Ij;
	        x = Aj[j];
	        for(k=j;k!==n;++k)    Aj[k] /= x; 
	        for(k=n-1;k!==-1;--k) Ij[k] /= x;
	        for(i=m-1;i!==-1;--i) {
	            if(i!==j) {
	                Ai = A[i];
	                Ii = I[i];
	                x = Ai[j];
	                for(k=j+1;k!==n;++k)  Ai[k] -= Aj[k]*x;
	                for(k=n-1;k>0;--k) { Ii[k] -= Ij[k]*x; --k; Ii[k] -= Ij[k]*x; }
	                if(k===0) Ii[0] -= Ij[0]*x;
	            }
	        }
	    }
	    return I;
	}

	numeric.det = function det(x) {
	    var s = numeric.dim(x);
	    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: det() only works on square matrices'); }
	    var n = s[0], ret = 1,i,j,k,A = numeric.clone(x),Aj,Ai,alpha,temp,k1,k2,k3;
	    for(j=0;j<n-1;j++) {
	        k=j;
	        for(i=j+1;i<n;i++) { if(Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
	        if(k !== j) {
	            temp = A[k]; A[k] = A[j]; A[j] = temp;
	            ret *= -1;
	        }
	        Aj = A[j];
	        for(i=j+1;i<n;i++) {
	            Ai = A[i];
	            alpha = Ai[j]/Aj[j];
	            for(k=j+1;k<n-1;k+=2) {
	                k1 = k+1;
	                Ai[k] -= Aj[k]*alpha;
	                Ai[k1] -= Aj[k1]*alpha;
	            }
	            if(k!==n) { Ai[k] -= Aj[k]*alpha; }
	        }
	        if(Aj[j] === 0) { return 0; }
	        ret *= Aj[j];
	    }
	    return ret*A[j][j];
	}

	numeric.transpose = function transpose(x) {
	    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
	    for(j=0;j<n;j++) ret[j] = Array(m);
	    for(i=m-1;i>=1;i-=2) {
	        A1 = x[i];
	        A0 = x[i-1];
	        for(j=n-1;j>=1;--j) {
	            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
	            --j;
	            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
	        }
	        if(j===0) {
	            Bj = ret[0]; Bj[i] = A1[0]; Bj[i-1] = A0[0];
	        }
	    }
	    if(i===0) {
	        A0 = x[0];
	        for(j=n-1;j>=1;--j) {
	            ret[j][0] = A0[j];
	            --j;
	            ret[j][0] = A0[j];
	        }
	        if(j===0) { ret[0][0] = A0[0]; }
	    }
	    return ret;
	}
	numeric.negtranspose = function negtranspose(x) {
	    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
	    for(j=0;j<n;j++) ret[j] = Array(m);
	    for(i=m-1;i>=1;i-=2) {
	        A1 = x[i];
	        A0 = x[i-1];
	        for(j=n-1;j>=1;--j) {
	            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
	            --j;
	            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
	        }
	        if(j===0) {
	            Bj = ret[0]; Bj[i] = -A1[0]; Bj[i-1] = -A0[0];
	        }
	    }
	    if(i===0) {
	        A0 = x[0];
	        for(j=n-1;j>=1;--j) {
	            ret[j][0] = -A0[j];
	            --j;
	            ret[j][0] = -A0[j];
	        }
	        if(j===0) { ret[0][0] = -A0[0]; }
	    }
	    return ret;
	}

	numeric._random = function _random(s,k) {
	    var i,n=s[k],ret=Array(n), rnd;
	    if(k === s.length-1) {
	        rnd = Math.random;
	        for(i=n-1;i>=1;i-=2) {
	            ret[i] = rnd();
	            ret[i-1] = rnd();
	        }
	        if(i===0) { ret[0] = rnd(); }
	        return ret;
	    }
	    for(i=n-1;i>=0;i--) ret[i] = _random(s,k+1);
	    return ret;
	}
	numeric.random = function random(s) { return numeric._random(s,0); }

	numeric.norm2 = function norm2(x) { return Math.sqrt(numeric.norm2Squared(x)); }

	numeric.linspace = function linspace(a,b,n) {
	    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
	    if(n<2) { return n===1?[a]:[]; }
	    var i,ret = Array(n);
	    n--;
	    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
	    return ret;
	}

	numeric.getBlock = function getBlock(x,from,to) {
	    var s = numeric.dim(x);
	    function foo(x,k) {
	        var i,a = from[k], n = to[k]-a, ret = Array(n);
	        if(k === s.length-1) {
	            for(i=n;i>=0;i--) { ret[i] = x[i+a]; }
	            return ret;
	        }
	        for(i=n;i>=0;i--) { ret[i] = foo(x[i+a],k+1); }
	        return ret;
	    }
	    return foo(x,0);
	}

	numeric.setBlock = function setBlock(x,from,to,B) {
	    var s = numeric.dim(x);
	    function foo(x,y,k) {
	        var i,a = from[k], n = to[k]-a;
	        if(k === s.length-1) { for(i=n;i>=0;i--) { x[i+a] = y[i]; } }
	        for(i=n;i>=0;i--) { foo(x[i+a],y[i],k+1); }
	    }
	    foo(x,B,0);
	    return x;
	}

	numeric.getRange = function getRange(A,I,J) {
	    var m = I.length, n = J.length;
	    var i,j;
	    var B = Array(m), Bi, AI;
	    for(i=m-1;i!==-1;--i) {
	        B[i] = Array(n);
	        Bi = B[i];
	        AI = A[I[i]];
	        for(j=n-1;j!==-1;--j) Bi[j] = AI[J[j]];
	    }
	    return B;
	}

	numeric.blockMatrix = function blockMatrix(X) {
	    var s = numeric.dim(X);
	    if(s.length<4) return numeric.blockMatrix([X]);
	    var m=s[0],n=s[1],M,N,i,j,Xij;
	    M = 0; N = 0;
	    for(i=0;i<m;++i) M+=X[i][0].length;
	    for(j=0;j<n;++j) N+=X[0][j][0].length;
	    var Z = Array(M);
	    for(i=0;i<M;++i) Z[i] = Array(N);
	    var I=0,J,ZI,k,l,Xijk;
	    for(i=0;i<m;++i) {
	        J=N;
	        for(j=n-1;j!==-1;--j) {
	            Xij = X[i][j];
	            J -= Xij[0].length;
	            for(k=Xij.length-1;k!==-1;--k) {
	                Xijk = Xij[k];
	                ZI = Z[I+k];
	                for(l = Xijk.length-1;l!==-1;--l) ZI[J+l] = Xijk[l];
	            }
	        }
	        I += X[i][0].length;
	    }
	    return Z;
	}

	numeric.tensor = function tensor(x,y) {
	    if(typeof x === "number" || typeof y === "number") return numeric.mul(x,y);
	    var s1 = numeric.dim(x), s2 = numeric.dim(y);
	    if(s1.length !== 1 || s2.length !== 1) {
	        throw new Error('numeric: tensor product is only defined for vectors');
	    }
	    var m = s1[0], n = s2[0], A = Array(m), Ai, i,j,xi;
	    for(i=m-1;i>=0;i--) {
	        Ai = Array(n);
	        xi = x[i];
	        for(j=n-1;j>=3;--j) {
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	        }
	        while(j>=0) { Ai[j] = xi * y[j]; --j; }
	        A[i] = Ai;
	    }
	    return A;
	}

	// 3. The Tensor type T
	numeric.T = function T(x,y) { this.x = x; this.y = y; }
	numeric.t = function t(x,y) { return new numeric.T(x,y); }

	numeric.Tbinop = function Tbinop(rr,rc,cr,cc,setup) {
	    var io = numeric.indexOf;
	    if(typeof setup !== "string") {
	        var k;
	        setup = '';
	        for(k in numeric) {
	            if(numeric.hasOwnProperty(k) && (rr.indexOf(k)>=0 || rc.indexOf(k)>=0 || cr.indexOf(k)>=0 || cc.indexOf(k)>=0) && k.length>1) {
	                setup += 'var '+k+' = numeric.'+k+';\n';
	            }
	        }
	    }
	    return Function(['y'],
	            'var x = this;\n'+
	            'if(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n'+
	            setup+'\n'+
	            'if(x.y) {'+
	            '  if(y.y) {'+
	            '    return new numeric.T('+cc+');\n'+
	            '  }\n'+
	            '  return new numeric.T('+cr+');\n'+
	            '}\n'+
	            'if(y.y) {\n'+
	            '  return new numeric.T('+rc+');\n'+
	            '}\n'+
	            'return new numeric.T('+rr+');\n'
	    );
	}

	numeric.T.prototype.add = numeric.Tbinop(
	        'add(x.x,y.x)',
	        'add(x.x,y.x),y.y',
	        'add(x.x,y.x),x.y',
	        'add(x.x,y.x),add(x.y,y.y)');
	numeric.T.prototype.sub = numeric.Tbinop(
	        'sub(x.x,y.x)',
	        'sub(x.x,y.x),neg(y.y)',
	        'sub(x.x,y.x),x.y',
	        'sub(x.x,y.x),sub(x.y,y.y)');
	numeric.T.prototype.mul = numeric.Tbinop(
	        'mul(x.x,y.x)',
	        'mul(x.x,y.x),mul(x.x,y.y)',
	        'mul(x.x,y.x),mul(x.y,y.x)',
	        'sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))');

	numeric.T.prototype.reciprocal = function reciprocal() {
	    var mul = numeric.mul, div = numeric.div;
	    if(this.y) {
	        var d = numeric.add(mul(this.x,this.x),mul(this.y,this.y));
	        return new numeric.T(div(this.x,d),div(numeric.neg(this.y),d));
	    }
	    return new T(div(1,this.x));
	}
	numeric.T.prototype.div = function div(y) {
	    if(!(y instanceof numeric.T)) y = new numeric.T(y);
	    if(y.y) { return this.mul(y.reciprocal()); }
	    var div = numeric.div;
	    if(this.y) { return new numeric.T(div(this.x,y.x),div(this.y,y.x)); }
	    return new numeric.T(div(this.x,y.x));
	}
	numeric.T.prototype.dot = numeric.Tbinop(
	        'dot(x.x,y.x)',
	        'dot(x.x,y.x),dot(x.x,y.y)',
	        'dot(x.x,y.x),dot(x.y,y.x)',
	        'sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))'
	        );
	numeric.T.prototype.transpose = function transpose() {
	    var t = numeric.transpose, x = this.x, y = this.y;
	    if(y) { return new numeric.T(t(x),t(y)); }
	    return new numeric.T(t(x));
	}
	numeric.T.prototype.transjugate = function transjugate() {
	    var t = numeric.transpose, x = this.x, y = this.y;
	    if(y) { return new numeric.T(t(x),numeric.negtranspose(y)); }
	    return new numeric.T(t(x));
	}
	numeric.Tunop = function Tunop(r,c,s) {
	    if(typeof s !== "string") { s = ''; }
	    return Function(
	            'var x = this;\n'+
	            s+'\n'+
	            'if(x.y) {'+
	            '  '+c+';\n'+
	            '}\n'+
	            r+';\n'
	    );
	}

	numeric.T.prototype.exp = numeric.Tunop(
	        'return new numeric.T(ex)',
	        'return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))',
	        'var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;');
	numeric.T.prototype.conj = numeric.Tunop(
	        'return new numeric.T(x.x);',
	        'return new numeric.T(x.x,numeric.neg(x.y));');
	numeric.T.prototype.neg = numeric.Tunop(
	        'return new numeric.T(neg(x.x));',
	        'return new numeric.T(neg(x.x),neg(x.y));',
	        'var neg = numeric.neg;');
	numeric.T.prototype.sin = numeric.Tunop(
	        'return new numeric.T(numeric.sin(x.x))',
	        'return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));');
	numeric.T.prototype.cos = numeric.Tunop(
	        'return new numeric.T(numeric.cos(x.x))',
	        'return x.exp().add(x.neg().exp()).div(2);');
	numeric.T.prototype.abs = numeric.Tunop(
	        'return new numeric.T(numeric.abs(x.x));',
	        'return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));',
	        'var mul = numeric.mul;');
	numeric.T.prototype.log = numeric.Tunop(
	        'return new numeric.T(numeric.log(x.x));',
	        'var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\n'+
	        'return new numeric.T(numeric.log(r.x),theta.x);');
	numeric.T.prototype.norm2 = numeric.Tunop(
	        'return numeric.norm2(x.x);',
	        'var f = numeric.norm2Squared;\n'+
	        'return Math.sqrt(f(x.x)+f(x.y));');
	numeric.T.prototype.inv = function inv() {
	    var A = this;
	    if(typeof A.y === "undefined") { return new numeric.T(numeric.inv(A.x)); }
	    var n = A.x.length, i, j, k;
	    var Rx = numeric.identity(n),Ry = numeric.rep([n,n],0);
	    var Ax = numeric.clone(A.x), Ay = numeric.clone(A.y);
	    var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
	    var i,j,k,d,d1,ax,ay,bx,by,temp;
	    for(i=0;i<n;i++) {
	        ax = Ax[i][i]; ay = Ay[i][i];
	        d = ax*ax+ay*ay;
	        k = i;
	        for(j=i+1;j<n;j++) {
	            ax = Ax[j][i]; ay = Ay[j][i];
	            d1 = ax*ax+ay*ay;
	            if(d1 > d) { k=j; d = d1; }
	        }
	        if(k!==i) {
	            temp = Ax[i]; Ax[i] = Ax[k]; Ax[k] = temp;
	            temp = Ay[i]; Ay[i] = Ay[k]; Ay[k] = temp;
	            temp = Rx[i]; Rx[i] = Rx[k]; Rx[k] = temp;
	            temp = Ry[i]; Ry[i] = Ry[k]; Ry[k] = temp;
	        }
	        Aix = Ax[i]; Aiy = Ay[i];
	        Rix = Rx[i]; Riy = Ry[i];
	        ax = Aix[i]; ay = Aiy[i];
	        for(j=i+1;j<n;j++) {
	            bx = Aix[j]; by = Aiy[j];
	            Aix[j] = (bx*ax+by*ay)/d;
	            Aiy[j] = (by*ax-bx*ay)/d;
	        }
	        for(j=0;j<n;j++) {
	            bx = Rix[j]; by = Riy[j];
	            Rix[j] = (bx*ax+by*ay)/d;
	            Riy[j] = (by*ax-bx*ay)/d;
	        }
	        for(j=i+1;j<n;j++) {
	            Ajx = Ax[j]; Ajy = Ay[j];
	            Rjx = Rx[j]; Rjy = Ry[j];
	            ax = Ajx[i]; ay = Ajy[i];
	            for(k=i+1;k<n;k++) {
	                bx = Aix[k]; by = Aiy[k];
	                Ajx[k] -= bx*ax-by*ay;
	                Ajy[k] -= by*ax+bx*ay;
	            }
	            for(k=0;k<n;k++) {
	                bx = Rix[k]; by = Riy[k];
	                Rjx[k] -= bx*ax-by*ay;
	                Rjy[k] -= by*ax+bx*ay;
	            }
	        }
	    }
	    for(i=n-1;i>0;i--) {
	        Rix = Rx[i]; Riy = Ry[i];
	        for(j=i-1;j>=0;j--) {
	            Rjx = Rx[j]; Rjy = Ry[j];
	            ax = Ax[j][i]; ay = Ay[j][i];
	            for(k=n-1;k>=0;k--) {
	                bx = Rix[k]; by = Riy[k];
	                Rjx[k] -= ax*bx - ay*by;
	                Rjy[k] -= ax*by + ay*bx;
	            }
	        }
	    }
	    return new numeric.T(Rx,Ry);
	}
	numeric.T.prototype.get = function get(i) {
	    var x = this.x, y = this.y, k = 0, ik, n = i.length;
	    if(y) {
	        while(k<n) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        return new numeric.T(x,y);
	    }
	    while(k<n) {
	        ik = i[k];
	        x = x[ik];
	        k++;
	    }
	    return new numeric.T(x);
	}
	numeric.T.prototype.set = function set(i,v) {
	    var x = this.x, y = this.y, k = 0, ik, n = i.length, vx = v.x, vy = v.y;
	    if(n===0) {
	        if(vy) { this.y = vy; }
	        else if(y) { this.y = undefined; }
	        this.x = x;
	        return this;
	    }
	    if(vy) {
	        if(y) { /* ok */ }
	        else {
	            y = numeric.rep(numeric.dim(x),0);
	            this.y = y;
	        }
	        while(k<n-1) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        ik = i[k];
	        x[ik] = vx;
	        y[ik] = vy;
	        return this;
	    }
	    if(y) {
	        while(k<n-1) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        ik = i[k];
	        x[ik] = vx;
	        if(vx instanceof Array) y[ik] = numeric.rep(numeric.dim(vx),0);
	        else y[ik] = 0;
	        return this;
	    }
	    while(k<n-1) {
	        ik = i[k];
	        x = x[ik];
	        k++;
	    }
	    ik = i[k];
	    x[ik] = vx;
	    return this;
	}
	numeric.T.prototype.getRows = function getRows(i0,i1) {
	    var n = i1-i0+1, j;
	    var rx = Array(n), ry, x = this.x, y = this.y;
	    for(j=i0;j<=i1;j++) { rx[j-i0] = x[j]; }
	    if(y) {
	        ry = Array(n);
	        for(j=i0;j<=i1;j++) { ry[j-i0] = y[j]; }
	        return new numeric.T(rx,ry);
	    }
	    return new numeric.T(rx);
	}
	numeric.T.prototype.setRows = function setRows(i0,i1,A) {
	    var j;
	    var rx = this.x, ry = this.y, x = A.x, y = A.y;
	    for(j=i0;j<=i1;j++) { rx[j] = x[j-i0]; }
	    if(y) {
	        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
	        for(j=i0;j<=i1;j++) { ry[j] = y[j-i0]; }
	    } else if(ry) {
	        for(j=i0;j<=i1;j++) { ry[j] = numeric.rep([x[j-i0].length],0); }
	    }
	    return this;
	}
	numeric.T.prototype.getRow = function getRow(k) {
	    var x = this.x, y = this.y;
	    if(y) { return new numeric.T(x[k],y[k]); }
	    return new numeric.T(x[k]);
	}
	numeric.T.prototype.setRow = function setRow(i,v) {
	    var rx = this.x, ry = this.y, x = v.x, y = v.y;
	    rx[i] = x;
	    if(y) {
	        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
	        ry[i] = y;
	    } else if(ry) {
	        ry = numeric.rep([x.length],0);
	    }
	    return this;
	}

	numeric.T.prototype.getBlock = function getBlock(from,to) {
	    var x = this.x, y = this.y, b = numeric.getBlock;
	    if(y) { return new numeric.T(b(x,from,to),b(y,from,to)); }
	    return new numeric.T(b(x,from,to));
	}
	numeric.T.prototype.setBlock = function setBlock(from,to,A) {
	    if(!(A instanceof numeric.T)) A = new numeric.T(A);
	    var x = this.x, y = this.y, b = numeric.setBlock, Ax = A.x, Ay = A.y;
	    if(Ay) {
	        if(!y) { this.y = numeric.rep(numeric.dim(this),0); y = this.y; }
	        b(x,from,to,Ax);
	        b(y,from,to,Ay);
	        return this;
	    }
	    b(x,from,to,Ax);
	    if(y) b(y,from,to,numeric.rep(numeric.dim(Ax),0));
	}
	numeric.T.rep = function rep(s,v) {
	    var T = numeric.T;
	    if(!(v instanceof T)) v = new T(v);
	    var x = v.x, y = v.y, r = numeric.rep;
	    if(y) return new T(r(s,x),r(s,y));
	    return new T(r(s,x));
	}
	numeric.T.diag = function diag(d) {
	    if(!(d instanceof numeric.T)) d = new numeric.T(d);
	    var x = d.x, y = d.y, diag = numeric.diag;
	    if(y) return new numeric.T(diag(x),diag(y));
	    return new numeric.T(diag(x));
	}
	numeric.T.eig = function eig() {
	    if(this.y) { throw new Error('eig: not implemented for complex matrices.'); }
	    return numeric.eig(this.x);
	}
	numeric.T.identity = function identity(n) { return new numeric.T(numeric.identity(n)); }
	numeric.T.prototype.getDiag = function getDiag() {
	    var n = numeric;
	    var x = this.x, y = this.y;
	    if(y) { return new n.T(n.getDiag(x),n.getDiag(y)); }
	    return new n.T(n.getDiag(x));
	}

	// 4. Eigenvalues of real matrices

	numeric.house = function house(x) {
	    var v = numeric.clone(x);
	    var s = x[0] >= 0 ? 1 : -1;
	    var alpha = s*numeric.norm2(x);
	    v[0] += alpha;
	    var foo = numeric.norm2(v);
	    if(foo === 0) { /* this should not happen */ throw new Error('eig: internal error'); }
	    return numeric.div(v,foo);
	}

	numeric.toUpperHessenberg = function toUpperHessenberg(me) {
	    var s = numeric.dim(me);
	    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: toUpperHessenberg() only works on square matrices'); }
	    var m = s[0], i,j,k,x,v,A = numeric.clone(me),B,C,Ai,Ci,Q = numeric.identity(m),Qi;
	    for(j=0;j<m-2;j++) {
	        x = Array(m-j-1);
	        for(i=j+1;i<m;i++) { x[i-j-1] = A[i][j]; }
	        if(numeric.norm2(x)>0) {
	            v = numeric.house(x);
	            B = numeric.getBlock(A,[j+1,j],[m-1,m-1]);
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<m;i++) { Ai = A[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Ai[k] -= 2*Ci[k-j]; }
	            B = numeric.getBlock(A,[0,j+1],[m-1,m-1]);
	            C = numeric.tensor(numeric.dot(B,v),v);
	            for(i=0;i<m;i++) { Ai = A[i]; Ci = C[i]; for(k=j+1;k<m;k++) Ai[k] -= 2*Ci[k-j-1]; }
	            B = Array(m-j-1);
	            for(i=j+1;i<m;i++) B[i-j-1] = Q[i];
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<m;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        }
	    }
	    return {H:A, Q:Q};
	}

	numeric.epsilon = 2.220446049250313e-16;

	numeric.QRFrancis = function(H,maxiter) {
	    if(typeof maxiter === "undefined") { maxiter = 10000; }
	    H = numeric.clone(H);
	    var H0 = numeric.clone(H);
	    var s = numeric.dim(H),m=s[0],x,v,a,b,c,d,det,tr, Hloc, Q = numeric.identity(m), Qi, Hi, B, C, Ci,i,j,k,iter;
	    if(m<3) { return {Q:Q, B:[ [0,m-1] ]}; }
	    var epsilon = numeric.epsilon;
	    for(iter=0;iter<maxiter;iter++) {
	        for(j=0;j<m-1;j++) {
	            if(Math.abs(H[j+1][j]) < epsilon*(Math.abs(H[j][j])+Math.abs(H[j+1][j+1]))) {
	                var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[j,j]),maxiter);
	                var QH2 = numeric.QRFrancis(numeric.getBlock(H,[j+1,j+1],[m-1,m-1]),maxiter);
	                B = Array(j+1);
	                for(i=0;i<=j;i++) { B[i] = Q[i]; }
	                C = numeric.dot(QH1.Q,B);
	                for(i=0;i<=j;i++) { Q[i] = C[i]; }
	                B = Array(m-j-1);
	                for(i=j+1;i<m;i++) { B[i-j-1] = Q[i]; }
	                C = numeric.dot(QH2.Q,B);
	                for(i=j+1;i<m;i++) { Q[i] = C[i-j-1]; }
	                return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,j+1))};
	            }
	        }
	        a = H[m-2][m-2]; b = H[m-2][m-1];
	        c = H[m-1][m-2]; d = H[m-1][m-1];
	        tr = a+d;
	        det = (a*d-b*c);
	        Hloc = numeric.getBlock(H, [0,0], [2,2]);
	        if(tr*tr>=4*det) {
	            var s1,s2;
	            s1 = 0.5*(tr+Math.sqrt(tr*tr-4*det));
	            s2 = 0.5*(tr-Math.sqrt(tr*tr-4*det));
	            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
	                                           numeric.mul(Hloc,s1+s2)),
	                               numeric.diag(numeric.rep([3],s1*s2)));
	        } else {
	            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
	                                           numeric.mul(Hloc,tr)),
	                               numeric.diag(numeric.rep([3],det)));
	        }
	        x = [Hloc[0][0],Hloc[1][0],Hloc[2][0]];
	        v = numeric.house(x);
	        B = [H[0],H[1],H[2]];
	        C = numeric.tensor(v,numeric.dot(v,B));
	        for(i=0;i<3;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<m;k++) Hi[k] -= 2*Ci[k]; }
	        B = numeric.getBlock(H, [0,0],[m-1,2]);
	        C = numeric.tensor(numeric.dot(B,v),v);
	        for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<3;k++) Hi[k] -= 2*Ci[k]; }
	        B = [Q[0],Q[1],Q[2]];
	        C = numeric.tensor(v,numeric.dot(v,B));
	        for(i=0;i<3;i++) { Qi = Q[i]; Ci = C[i]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        var J;
	        for(j=0;j<m-2;j++) {
	            for(k=j;k<=j+1;k++) {
	                if(Math.abs(H[k+1][k]) < epsilon*(Math.abs(H[k][k])+Math.abs(H[k+1][k+1]))) {
	                    var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[k,k]),maxiter);
	                    var QH2 = numeric.QRFrancis(numeric.getBlock(H,[k+1,k+1],[m-1,m-1]),maxiter);
	                    B = Array(k+1);
	                    for(i=0;i<=k;i++) { B[i] = Q[i]; }
	                    C = numeric.dot(QH1.Q,B);
	                    for(i=0;i<=k;i++) { Q[i] = C[i]; }
	                    B = Array(m-k-1);
	                    for(i=k+1;i<m;i++) { B[i-k-1] = Q[i]; }
	                    C = numeric.dot(QH2.Q,B);
	                    for(i=k+1;i<m;i++) { Q[i] = C[i-k-1]; }
	                    return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,k+1))};
	                }
	            }
	            J = Math.min(m-1,j+3);
	            x = Array(J-j);
	            for(i=j+1;i<=J;i++) { x[i-j-1] = H[i][j]; }
	            v = numeric.house(x);
	            B = numeric.getBlock(H, [j+1,j],[J,m-1]);
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<=J;i++) { Hi = H[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Hi[k] -= 2*Ci[k-j]; }
	            B = numeric.getBlock(H, [0,j+1],[m-1,J]);
	            C = numeric.tensor(numeric.dot(B,v),v);
	            for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=j+1;k<=J;k++) Hi[k] -= 2*Ci[k-j-1]; }
	            B = Array(J-j);
	            for(i=j+1;i<=J;i++) B[i-j-1] = Q[i];
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<=J;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        }
	    }
	    throw new Error('numeric: eigenvalue iteration does not converge -- increase maxiter?');
	}

	numeric.eig = function eig(A,maxiter) {
	    var QH = numeric.toUpperHessenberg(A);
	    var QB = numeric.QRFrancis(QH.H,maxiter);
	    var T = numeric.T;
	    var n = A.length,i,k,flag = false,B = QB.B,H = numeric.dot(QB.Q,numeric.dot(QH.H,numeric.transpose(QB.Q)));
	    var Q = new T(numeric.dot(QB.Q,QH.Q)),Q0;
	    var m = B.length,j;
	    var a,b,c,d,p1,p2,disc,x,y,p,q,n1,n2;
	    var sqrt = Math.sqrt;
	    for(k=0;k<m;k++) {
	        i = B[k][0];
	        if(i === B[k][1]) {
	            // nothing
	        } else {
	            j = i+1;
	            a = H[i][i];
	            b = H[i][j];
	            c = H[j][i];
	            d = H[j][j];
	            if(b === 0 && c === 0) continue;
	            p1 = -a-d;
	            p2 = a*d-b*c;
	            disc = p1*p1-4*p2;
	            if(disc>=0) {
	                if(p1<0) x = -0.5*(p1-sqrt(disc));
	                else     x = -0.5*(p1+sqrt(disc));
	                n1 = (a-x)*(a-x)+b*b;
	                n2 = c*c+(d-x)*(d-x);
	                if(n1>n2) {
	                    n1 = sqrt(n1);
	                    p = (a-x)/n1;
	                    q = b/n1;
	                } else {
	                    n2 = sqrt(n2);
	                    p = c/n2;
	                    q = (d-x)/n2;
	                }
	                Q0 = new T([[q,-p],[p,q]]);
	                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
	            } else {
	                x = -0.5*p1;
	                y = 0.5*sqrt(-disc);
	                n1 = (a-x)*(a-x)+b*b;
	                n2 = c*c+(d-x)*(d-x);
	                if(n1>n2) {
	                    n1 = sqrt(n1+y*y);
	                    p = (a-x)/n1;
	                    q = b/n1;
	                    x = 0;
	                    y /= n1;
	                } else {
	                    n2 = sqrt(n2+y*y);
	                    p = c/n2;
	                    q = (d-x)/n2;
	                    x = y/n2;
	                    y = 0;
	                }
	                Q0 = new T([[q,-p],[p,q]],[[x,y],[y,-x]]);
	                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
	            }
	        }
	    }
	    var R = Q.dot(A).dot(Q.transjugate()), n = A.length, E = numeric.T.identity(n);
	    for(j=0;j<n;j++) {
	        if(j>0) {
	            for(k=j-1;k>=0;k--) {
	                var Rk = R.get([k,k]), Rj = R.get([j,j]);
	                if(numeric.neq(Rk.x,Rj.x) || numeric.neq(Rk.y,Rj.y)) {
	                    x = R.getRow(k).getBlock([k],[j-1]);
	                    y = E.getRow(j).getBlock([k],[j-1]);
	                    E.set([j,k],(R.get([k,j]).neg().sub(x.dot(y))).div(Rk.sub(Rj)));
	                } else {
	                    E.setRow(j,E.getRow(k));
	                    continue;
	                }
	            }
	        }
	    }
	    for(j=0;j<n;j++) {
	        x = E.getRow(j);
	        E.setRow(j,x.div(x.norm2()));
	    }
	    E = E.transpose();
	    E = Q.transjugate().dot(E);
	    return { lambda:R.getDiag(), E:E };
	};

	// 5. Compressed Column Storage matrices
	numeric.ccsSparse = function ccsSparse(A) {
	    var m = A.length,n,foo, i,j, counts = [];
	    for(i=m-1;i!==-1;--i) {
	        foo = A[i];
	        for(j in foo) {
	            j = parseInt(j);
	            while(j>=counts.length) counts[counts.length] = 0;
	            if(foo[j]!==0) counts[j]++;
	        }
	    }
	    var n = counts.length;
	    var Ai = Array(n+1);
	    Ai[0] = 0;
	    for(i=0;i<n;++i) Ai[i+1] = Ai[i] + counts[i];
	    var Aj = Array(Ai[n]), Av = Array(Ai[n]);
	    for(i=m-1;i!==-1;--i) {
	        foo = A[i];
	        for(j in foo) {
	            if(foo[j]!==0) {
	                counts[j]--;
	                Aj[Ai[j]+counts[j]] = i;
	                Av[Ai[j]+counts[j]] = foo[j];
	            }
	        }
	    }
	    return [Ai,Aj,Av];
	}
	numeric.ccsFull = function ccsFull(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2], s = numeric.ccsDim(A), m = s[0], n = s[1], i,j,j0,j1,k;
	    var B = numeric.rep([m,n],0);
	    for(i=0;i<n;i++) {
	        j0 = Ai[i];
	        j1 = Ai[i+1];
	        for(j=j0;j<j1;++j) { B[Aj[j]][i] = Av[j]; }
	    }
	    return B;
	}
	numeric.ccsTSolve = function ccsTSolve(A,b,x,bj,xj) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, max = Math.max,n=0;
	    if(typeof bj === "undefined") x = numeric.rep([m],0);
	    if(typeof bj === "undefined") bj = numeric.linspace(0,x.length-1);
	    if(typeof xj === "undefined") xj = [];
	    function dfs(j) {
	        var k;
	        if(x[j] !== 0) return;
	        x[j] = 1;
	        for(k=Ai[j];k<Ai[j+1];++k) dfs(Aj[k]);
	        xj[n] = j;
	        ++n;
	    }
	    var i,j,j0,j1,k,l,l0,l1,a;
	    for(i=bj.length-1;i!==-1;--i) { dfs(bj[i]); }
	    xj.length = n;
	    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
	    for(i=bj.length-1;i!==-1;--i) { j = bj[i]; x[j] = b[j]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        j0 = Ai[j];
	        j1 = max(Ai[j+1],j0);
	        for(k=j0;k!==j1;++k) { if(Aj[k] === j) { x[j] /= Av[k]; break; } }
	        a = x[j];
	        for(k=j0;k!==j1;++k) {
	            l = Aj[k];
	            if(l !== j) x[l] -= a*Av[k];
	        }
	    }
	    return x;
	}
	numeric.ccsDFS = function ccsDFS(n) {
	    this.k = Array(n);
	    this.k1 = Array(n);
	    this.j = Array(n);
	}
	numeric.ccsDFS.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv) {
	    var m = 0,foo,n=xj.length;
	    var k = this.k, k1 = this.k1, j = this.j,km,k11;
	    if(x[J]!==0) return;
	    x[J] = 1;
	    j[0] = J;
	    k[0] = km = Ai[J];
	    k1[0] = k11 = Ai[J+1];
	    while(1) {
	        if(km >= k11) {
	            xj[n] = j[m];
	            if(m===0) return;
	            ++n;
	            --m;
	            km = k[m];
	            k11 = k1[m];
	        } else {
	            foo = Pinv[Aj[km]];
	            if(x[foo] === 0) {
	                x[foo] = 1;
	                k[m] = km;
	                ++m;
	                j[m] = foo;
	                km = Ai[foo];
	                k1[m] = k11 = Ai[foo+1];
	            } else ++km;
	        }
	    }
	}
	numeric.ccsLPSolve = function ccsLPSolve(A,B,x,xj,I,Pinv,dfs) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    
	    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
	    i0 = Bi[I];
	    i1 = Bi[I+1];
	    xj.length = 0;
	    for(i=i0;i<i1;++i) { dfs.dfs(Pinv[Bj[i]],Ai,Aj,x,xj,Pinv); }
	    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
	    for(i=i0;i!==i1;++i) { j = Pinv[Bj[i]]; x[j] = Bv[i]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        j0 = Ai[j];
	        j1 = Ai[j+1];
	        for(k=j0;k<j1;++k) { if(Pinv[Aj[k]] === j) { x[j] /= Av[k]; break; } }
	        a = x[j];
	        for(k=j0;k<j1;++k) {
	            l = Pinv[Aj[k]];
	            if(l !== j) x[l] -= a*Av[k];
	        }
	    }
	    return x;
	}
	numeric.ccsLUP1 = function ccsLUP1(A,threshold) {
	    var m = A[0].length-1;
	    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
	    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
	    var x = numeric.rep([m],0), xj = numeric.rep([m],0);
	    var i,j,k,j0,j1,a,e,c,d,K;
	    var sol = numeric.ccsLPSolve, max = Math.max, abs = Math.abs;
	    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
	    var dfs = new numeric.ccsDFS(m);
	    if(typeof threshold === "undefined") { threshold = 1; }
	    for(i=0;i<m;++i) {
	        sol(L,A,x,xj,i,Pinv,dfs);
	        a = -1;
	        e = -1;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            if(k <= i) continue;
	            c = abs(x[k]);
	            if(c > a) { e = k; a = c; }
	        }
	        if(abs(x[i])<threshold*a) {
	            j = P[i];
	            a = P[e];
	            P[i] = a; Pinv[a] = i;
	            P[e] = j; Pinv[j] = e;
	            a = x[i]; x[i] = x[e]; x[e] = a;
	        }
	        a = Li[i];
	        e = Ui[i];
	        d = x[i];
	        Lj[a] = P[i];
	        Lv[a] = 1;
	        ++a;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            c = x[k];
	            xj[j] = 0;
	            x[k] = 0;
	            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
	            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
	        }
	        Li[i+1] = a;
	        Ui[i+1] = e;
	    }
	    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
	    return {L:L, U:U, P:P, Pinv:Pinv};
	}
	numeric.ccsDFS0 = function ccsDFS0(n) {
	    this.k = Array(n);
	    this.k1 = Array(n);
	    this.j = Array(n);
	}
	numeric.ccsDFS0.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv,P) {
	    var m = 0,foo,n=xj.length;
	    var k = this.k, k1 = this.k1, j = this.j,km,k11;
	    if(x[J]!==0) return;
	    x[J] = 1;
	    j[0] = J;
	    k[0] = km = Ai[Pinv[J]];
	    k1[0] = k11 = Ai[Pinv[J]+1];
	    while(1) {
	        if(isNaN(km)) throw new Error("Ow!");
	        if(km >= k11) {
	            xj[n] = Pinv[j[m]];
	            if(m===0) return;
	            ++n;
	            --m;
	            km = k[m];
	            k11 = k1[m];
	        } else {
	            foo = Aj[km];
	            if(x[foo] === 0) {
	                x[foo] = 1;
	                k[m] = km;
	                ++m;
	                j[m] = foo;
	                foo = Pinv[foo];
	                km = Ai[foo];
	                k1[m] = k11 = Ai[foo+1];
	            } else ++km;
	        }
	    }
	}
	numeric.ccsLPSolve0 = function ccsLPSolve0(A,B,y,xj,I,Pinv,P,dfs) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    
	    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
	    i0 = Bi[I];
	    i1 = Bi[I+1];
	    xj.length = 0;
	    for(i=i0;i<i1;++i) { dfs.dfs(Bj[i],Ai,Aj,y,xj,Pinv,P); }
	    for(i=xj.length-1;i!==-1;--i) { j = xj[i]; y[P[j]] = 0; }
	    for(i=i0;i!==i1;++i) { j = Bj[i]; y[j] = Bv[i]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        l = P[j];
	        j0 = Ai[j];
	        j1 = Ai[j+1];
	        for(k=j0;k<j1;++k) { if(Aj[k] === l) { y[l] /= Av[k]; break; } }
	        a = y[l];
	        for(k=j0;k<j1;++k) y[Aj[k]] -= a*Av[k];
	        y[l] = a;
	    }
	}
	numeric.ccsLUP0 = function ccsLUP0(A,threshold) {
	    var m = A[0].length-1;
	    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
	    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
	    var y = numeric.rep([m],0), xj = numeric.rep([m],0);
	    var i,j,k,j0,j1,a,e,c,d,K;
	    var sol = numeric.ccsLPSolve0, max = Math.max, abs = Math.abs;
	    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
	    var dfs = new numeric.ccsDFS0(m);
	    if(typeof threshold === "undefined") { threshold = 1; }
	    for(i=0;i<m;++i) {
	        sol(L,A,y,xj,i,Pinv,P,dfs);
	        a = -1;
	        e = -1;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            if(k <= i) continue;
	            c = abs(y[P[k]]);
	            if(c > a) { e = k; a = c; }
	        }
	        if(abs(y[P[i]])<threshold*a) {
	            j = P[i];
	            a = P[e];
	            P[i] = a; Pinv[a] = i;
	            P[e] = j; Pinv[j] = e;
	        }
	        a = Li[i];
	        e = Ui[i];
	        d = y[P[i]];
	        Lj[a] = P[i];
	        Lv[a] = 1;
	        ++a;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            c = y[P[k]];
	            xj[j] = 0;
	            y[P[k]] = 0;
	            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
	            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
	        }
	        Li[i+1] = a;
	        Ui[i+1] = e;
	    }
	    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
	    return {L:L, U:U, P:P, Pinv:Pinv};
	}
	numeric.ccsLUP = numeric.ccsLUP0;

	numeric.ccsDim = function ccsDim(A) { return [numeric.sup(A[1])+1,A[0].length-1]; }
	numeric.ccsGetBlock = function ccsGetBlock(A,i,j) {
	    var s = numeric.ccsDim(A),m=s[0],n=s[1];
	    if(typeof i === "undefined") { i = numeric.linspace(0,m-1); }
	    else if(typeof i === "number") { i = [i]; }
	    if(typeof j === "undefined") { j = numeric.linspace(0,n-1); }
	    else if(typeof j === "number") { j = [j]; }
	    var p,p0,p1,P = i.length,q,Q = j.length,r,jq,ip;
	    var Bi = numeric.rep([n],0), Bj=[], Bv=[], B = [Bi,Bj,Bv];
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var x = numeric.rep([m],0),count=0,flags = numeric.rep([m],0);
	    for(q=0;q<Q;++q) {
	        jq = j[q];
	        var q0 = Ai[jq];
	        var q1 = Ai[jq+1];
	        for(p=q0;p<q1;++p) {
	            r = Aj[p];
	            flags[r] = 1;
	            x[r] = Av[p];
	        }
	        for(p=0;p<P;++p) {
	            ip = i[p];
	            if(flags[ip]) {
	                Bj[count] = p;
	                Bv[count] = x[i[p]];
	                ++count;
	            }
	        }
	        for(p=q0;p<q1;++p) {
	            r = Aj[p];
	            flags[r] = 0;
	        }
	        Bi[q+1] = count;
	    }
	    return B;
	}

	numeric.ccsDot = function ccsDot(A,B) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    var sA = numeric.ccsDim(A), sB = numeric.ccsDim(B);
	    var m = sA[0], n = sA[1], o = sB[1];
	    var x = numeric.rep([m],0), flags = numeric.rep([m],0), xj = Array(m);
	    var Ci = numeric.rep([o],0), Cj = [], Cv = [], C = [Ci,Cj,Cv];
	    var i,j,k,j0,j1,i0,i1,l,p,a,b;
	    for(k=0;k!==o;++k) {
	        j0 = Bi[k];
	        j1 = Bi[k+1];
	        p = 0;
	        for(j=j0;j<j1;++j) {
	            a = Bj[j];
	            b = Bv[j];
	            i0 = Ai[a];
	            i1 = Ai[a+1];
	            for(i=i0;i<i1;++i) {
	                l = Aj[i];
	                if(flags[l]===0) {
	                    xj[p] = l;
	                    flags[l] = 1;
	                    p = p+1;
	                }
	                x[l] = x[l] + Av[i]*b;
	            }
	        }
	        j0 = Ci[k];
	        j1 = j0+p;
	        Ci[k+1] = j1;
	        for(j=p-1;j!==-1;--j) {
	            b = j0+j;
	            i = xj[j];
	            Cj[b] = i;
	            Cv[b] = x[i];
	            flags[i] = 0;
	            x[i] = 0;
	        }
	        Ci[k+1] = Ci[k]+p;
	    }
	    return C;
	}

	numeric.ccsLUPSolve = function ccsLUPSolve(LUP,B) {
	    var L = LUP.L, U = LUP.U, P = LUP.P;
	    var Bi = B[0];
	    var flag = false;
	    if(typeof Bi !== "object") { B = [[0,B.length],numeric.linspace(0,B.length-1),B]; Bi = B[0]; flag = true; }
	    var Bj = B[1], Bv = B[2];
	    var n = L[0].length-1, m = Bi.length-1;
	    var x = numeric.rep([n],0), xj = Array(n);
	    var b = numeric.rep([n],0), bj = Array(n);
	    var Xi = numeric.rep([m+1],0), Xj = [], Xv = [];
	    var sol = numeric.ccsTSolve;
	    var i,j,j0,j1,k,J,N=0;
	    for(i=0;i<m;++i) {
	        k = 0;
	        j0 = Bi[i];
	        j1 = Bi[i+1];
	        for(j=j0;j<j1;++j) { 
	            J = LUP.Pinv[Bj[j]];
	            bj[k] = J;
	            b[J] = Bv[j];
	            ++k;
	        }
	        bj.length = k;
	        sol(L,b,x,bj,xj);
	        for(j=bj.length-1;j!==-1;--j) b[bj[j]] = 0;
	        sol(U,x,b,xj,bj);
	        if(flag) return b;
	        for(j=xj.length-1;j!==-1;--j) x[xj[j]] = 0;
	        for(j=bj.length-1;j!==-1;--j) {
	            J = bj[j];
	            Xj[N] = J;
	            Xv[N] = b[J];
	            b[J] = 0;
	            ++N;
	        }
	        Xi[i+1] = N;
	    }
	    return [Xi,Xj,Xv];
	}

	numeric.ccsbinop = function ccsbinop(body,setup) {
	    if(typeof setup === "undefined") setup='';
	    return Function('X','Y',
	            'var Xi = X[0], Xj = X[1], Xv = X[2];\n'+
	            'var Yi = Y[0], Yj = Y[1], Yv = Y[2];\n'+
	            'var n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\n'+
	            'var Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\n'+
	            'var x = numeric.rep([m],0),y = numeric.rep([m],0);\n'+
	            'var xk,yk,zk;\n'+
	            'var i,j,j0,j1,k,p=0;\n'+
	            setup+
	            'for(i=0;i<n;++i) {\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Xj[j];\n'+
	            '    x[k] = 1;\n'+
	            '    Zj[p] = k;\n'+
	            '    ++p;\n'+
	            '  }\n'+
	            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Yj[j];\n'+
	            '    y[k] = Yv[j];\n'+
	            '    if(x[k] === 0) {\n'+
	            '      Zj[p] = k;\n'+
	            '      ++p;\n'+
	            '    }\n'+
	            '  }\n'+
	            '  Zi[i+1] = p;\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n'+
	            '  j0 = Zi[i]; j1 = Zi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Zj[j];\n'+
	            '    xk = x[k];\n'+
	            '    yk = y[k];\n'+
	            body+'\n'+
	            '    Zv[j] = zk;\n'+
	            '  }\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n'+
	            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n'+
	            '}\n'+
	            'return [Zi,Zj,Zv];'
	            );
	};

	(function() {
	    var k,A,B,C;
	    for(k in numeric.ops2) {
	        if(isFinite(eval('1'+numeric.ops2[k]+'0'))) A = '[Y[0],Y[1],numeric.'+k+'(X,Y[2])]';
	        else A = 'NaN';
	        if(isFinite(eval('0'+numeric.ops2[k]+'1'))) B = '[X[0],X[1],numeric.'+k+'(X[2],Y)]';
	        else B = 'NaN';
	        if(isFinite(eval('1'+numeric.ops2[k]+'0')) && isFinite(eval('0'+numeric.ops2[k]+'1'))) C = 'numeric.ccs'+k+'MM(X,Y)';
	        else C = 'NaN';
	        numeric['ccs'+k+'MM'] = numeric.ccsbinop('zk = xk '+numeric.ops2[k]+'yk;');
	        numeric['ccs'+k] = Function('X','Y',
	                'if(typeof X === "number") return '+A+';\n'+
	                'if(typeof Y === "number") return '+B+';\n'+
	                'return '+C+';\n'
	                );
	    }
	}());

	numeric.ccsScatter = function ccsScatter(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var n = numeric.sup(Aj)+1,m=Ai.length;
	    var Ri = numeric.rep([n],0),Rj=Array(m), Rv = Array(m);
	    var counts = numeric.rep([n],0),i;
	    for(i=0;i<m;++i) counts[Aj[i]]++;
	    for(i=0;i<n;++i) Ri[i+1] = Ri[i] + counts[i];
	    var ptr = Ri.slice(0),k,Aii;
	    for(i=0;i<m;++i) {
	        Aii = Aj[i];
	        k = ptr[Aii];
	        Rj[k] = Ai[i];
	        Rv[k] = Av[i];
	        ptr[Aii]=ptr[Aii]+1;
	    }
	    return [Ri,Rj,Rv];
	}

	numeric.ccsGather = function ccsGather(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var n = Ai.length-1,m = Aj.length;
	    var Ri = Array(m), Rj = Array(m), Rv = Array(m);
	    var i,j,j0,j1,p;
	    p=0;
	    for(i=0;i<n;++i) {
	        j0 = Ai[i];
	        j1 = Ai[i+1];
	        for(j=j0;j!==j1;++j) {
	            Rj[p] = i;
	            Ri[p] = Aj[j];
	            Rv[p] = Av[j];
	            ++p;
	        }
	    }
	    return [Ri,Rj,Rv];
	}

	// The following sparse linear algebra routines are deprecated.

	numeric.sdim = function dim(A,ret,k) {
	    if(typeof ret === "undefined") { ret = []; }
	    if(typeof A !== "object") return ret;
	    if(typeof k === "undefined") { k=0; }
	    if(!(k in ret)) { ret[k] = 0; }
	    if(A.length > ret[k]) ret[k] = A.length;
	    var i;
	    for(i in A) {
	        if(A.hasOwnProperty(i)) dim(A[i],ret,k+1);
	    }
	    return ret;
	};

	numeric.sclone = function clone(A,k,n) {
	    if(typeof k === "undefined") { k=0; }
	    if(typeof n === "undefined") { n = numeric.sdim(A).length; }
	    var i,ret = Array(A.length);
	    if(k === n-1) {
	        for(i in A) { if(A.hasOwnProperty(i)) ret[i] = A[i]; }
	        return ret;
	    }
	    for(i in A) {
	        if(A.hasOwnProperty(i)) ret[i] = clone(A[i],k+1,n);
	    }
	    return ret;
	}

	numeric.sdiag = function diag(d) {
	    var n = d.length,i,ret = Array(n),i1,i2,i3;
	    for(i=n-1;i>=1;i-=2) {
	        i1 = i-1;
	        ret[i] = []; ret[i][i] = d[i];
	        ret[i1] = []; ret[i1][i1] = d[i1];
	    }
	    if(i===0) { ret[0] = []; ret[0][0] = d[i]; }
	    return ret;
	}

	numeric.sidentity = function identity(n) { return numeric.sdiag(numeric.rep([n],1)); }

	numeric.stranspose = function transpose(A) {
	    var ret = [], n = A.length, i,j,Ai;
	    for(i in A) {
	        if(!(A.hasOwnProperty(i))) continue;
	        Ai = A[i];
	        for(j in Ai) {
	            if(!(Ai.hasOwnProperty(j))) continue;
	            if(typeof ret[j] !== "object") { ret[j] = []; }
	            ret[j][i] = Ai[j];
	        }
	    }
	    return ret;
	}

	numeric.sLUP = function LUP(A,tol) {
	    throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
	};

	numeric.sdotMM = function dotMM(A,B) {
	    var p = A.length, q = B.length, BT = numeric.stranspose(B), r = BT.length, Ai, BTk;
	    var i,j,k,accum;
	    var ret = Array(p),reti;
	    for(i=p-1;i>=0;i--) {
	        reti = [];
	        Ai = A[i];
	        for(k=r-1;k>=0;k--) {
	            accum = 0;
	            BTk = BT[k];
	            for(j in Ai) {
	                if(!(Ai.hasOwnProperty(j))) continue;
	                if(j in BTk) { accum += Ai[j]*BTk[j]; }
	            }
	            if(accum) reti[k] = accum;
	        }
	        ret[i] = reti;
	    }
	    return ret;
	}

	numeric.sdotMV = function dotMV(A,x) {
	    var p = A.length, Ai, i,j;
	    var ret = Array(p), accum;
	    for(i=p-1;i>=0;i--) {
	        Ai = A[i];
	        accum = 0;
	        for(j in Ai) {
	            if(!(Ai.hasOwnProperty(j))) continue;
	            if(x[j]) accum += Ai[j]*x[j];
	        }
	        if(accum) ret[i] = accum;
	    }
	    return ret;
	}

	numeric.sdotVM = function dotMV(x,A) {
	    var i,j,Ai,alpha;
	    var ret = [], accum;
	    for(i in x) {
	        if(!x.hasOwnProperty(i)) continue;
	        Ai = A[i];
	        alpha = x[i];
	        for(j in Ai) {
	            if(!Ai.hasOwnProperty(j)) continue;
	            if(!ret[j]) { ret[j] = 0; }
	            ret[j] += alpha*Ai[j];
	        }
	    }
	    return ret;
	}

	numeric.sdotVV = function dotVV(x,y) {
	    var i,ret=0;
	    for(i in x) { if(x[i] && y[i]) ret+= x[i]*y[i]; }
	    return ret;
	}

	numeric.sdot = function dot(A,B) {
	    var m = numeric.sdim(A).length, n = numeric.sdim(B).length;
	    var k = m*1000+n;
	    switch(k) {
	    case 0: return A*B;
	    case 1001: return numeric.sdotVV(A,B);
	    case 2001: return numeric.sdotMV(A,B);
	    case 1002: return numeric.sdotVM(A,B);
	    case 2002: return numeric.sdotMM(A,B);
	    default: throw new Error('numeric.sdot not implemented for tensors of order '+m+' and '+n);
	    }
	}

	numeric.sscatter = function scatter(V) {
	    var n = V[0].length, Vij, i, j, m = V.length, A = [], Aj;
	    for(i=n-1;i>=0;--i) {
	        if(!V[m-1][i]) continue;
	        Aj = A;
	        for(j=0;j<m-2;j++) {
	            Vij = V[j][i];
	            if(!Aj[Vij]) Aj[Vij] = [];
	            Aj = Aj[Vij];
	        }
	        Aj[V[j][i]] = V[j+1][i];
	    }
	    return A;
	}

	numeric.sgather = function gather(A,ret,k) {
	    if(typeof ret === "undefined") ret = [];
	    if(typeof k === "undefined") k = [];
	    var n,i,Ai;
	    n = k.length;
	    for(i in A) {
	        if(A.hasOwnProperty(i)) {
	            k[n] = parseInt(i);
	            Ai = A[i];
	            if(typeof Ai === "number") {
	                if(Ai) {
	                    if(ret.length === 0) {
	                        for(i=n+1;i>=0;--i) ret[i] = [];
	                    }
	                    for(i=n;i>=0;--i) ret[i].push(k[i]);
	                    ret[n+1].push(Ai);
	                }
	            } else gather(Ai,ret,k);
	        }
	    }
	    if(k.length>n) k.pop();
	    return ret;
	}

	// 6. Coordinate matrices
	numeric.cLU = function LU(A) {
	    var I = A[0], J = A[1], V = A[2];
	    var p = I.length, m=0, i,j,k,a,b,c;
	    for(i=0;i<p;i++) if(I[i]>m) m=I[i];
	    m++;
	    var L = Array(m), U = Array(m), left = numeric.rep([m],Infinity), right = numeric.rep([m],-Infinity);
	    var Ui, Uj,alpha;
	    for(k=0;k<p;k++) {
	        i = I[k];
	        j = J[k];
	        if(j<left[i]) left[i] = j;
	        if(j>right[i]) right[i] = j;
	    }
	    for(i=0;i<m-1;i++) { if(right[i] > right[i+1]) right[i+1] = right[i]; }
	    for(i=m-1;i>=1;i--) { if(left[i]<left[i-1]) left[i-1] = left[i]; }
	    var countL = 0, countU = 0;
	    for(i=0;i<m;i++) {
	        U[i] = numeric.rep([right[i]-left[i]+1],0);
	        L[i] = numeric.rep([i-left[i]],0);
	        countL += i-left[i]+1;
	        countU += right[i]-i+1;
	    }
	    for(k=0;k<p;k++) { i = I[k]; U[i][J[k]-left[i]] = V[k]; }
	    for(i=0;i<m-1;i++) {
	        a = i-left[i];
	        Ui = U[i];
	        for(j=i+1;left[j]<=i && j<m;j++) {
	            b = i-left[j];
	            c = right[i]-i;
	            Uj = U[j];
	            alpha = Uj[b]/Ui[a];
	            if(alpha) {
	                for(k=1;k<=c;k++) { Uj[k+b] -= alpha*Ui[k+a]; }
	                L[j][i-left[j]] = alpha;
	            }
	        }
	    }
	    var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
	    var p,q,foo;
	    p=0; q=0;
	    for(i=0;i<m;i++) {
	        a = left[i];
	        b = right[i];
	        foo = U[i];
	        for(j=i;j<=b;j++) {
	            if(foo[j-a]) {
	                Ui[p] = i;
	                Uj[p] = j;
	                Uv[p] = foo[j-a];
	                p++;
	            }
	        }
	        foo = L[i];
	        for(j=a;j<i;j++) {
	            if(foo[j-a]) {
	                Li[q] = i;
	                Lj[q] = j;
	                Lv[q] = foo[j-a];
	                q++;
	            }
	        }
	        Li[q] = i;
	        Lj[q] = i;
	        Lv[q] = 1;
	        q++;
	    }
	    return {U:[Ui,Uj,Uv], L:[Li,Lj,Lv]};
	};

	numeric.cLUsolve = function LUsolve(lu,b) {
	    var L = lu.L, U = lu.U, ret = numeric.clone(b);
	    var Li = L[0], Lj = L[1], Lv = L[2];
	    var Ui = U[0], Uj = U[1], Uv = U[2];
	    var p = Ui.length, q = Li.length;
	    var m = ret.length,i,j,k;
	    k = 0;
	    for(i=0;i<m;i++) {
	        while(Lj[k] < i) {
	            ret[i] -= Lv[k]*ret[Lj[k]];
	            k++;
	        }
	        k++;
	    }
	    k = p-1;
	    for(i=m-1;i>=0;i--) {
	        while(Uj[k] > i) {
	            ret[i] -= Uv[k]*ret[Uj[k]];
	            k--;
	        }
	        ret[i] /= Uv[k];
	        k--;
	    }
	    return ret;
	};

	numeric.cgrid = function grid(n,shape) {
	    if(typeof n === "number") n = [n,n];
	    var ret = numeric.rep(n,-1);
	    var i,j,count;
	    if(typeof shape !== "function") {
	        switch(shape) {
	        case 'L':
	            shape = function(i,j) { return (i>=n[0]/2 || j<n[1]/2); }
	            break;
	        default:
	            shape = function(i,j) { return true; };
	            break;
	        }
	    }
	    count=0;
	    for(i=1;i<n[0]-1;i++) for(j=1;j<n[1]-1;j++) 
	        if(shape(i,j)) {
	            ret[i][j] = count;
	            count++;
	        }
	    return ret;
	}

	numeric.cdelsq = function delsq(g) {
	    var dir = [[-1,0],[0,-1],[0,1],[1,0]];
	    var s = numeric.dim(g), m = s[0], n = s[1], i,j,k,p,q;
	    var Li = [], Lj = [], Lv = [];
	    for(i=1;i<m-1;i++) for(j=1;j<n-1;j++) {
	        if(g[i][j]<0) continue;
	        for(k=0;k<4;k++) {
	            p = i+dir[k][0];
	            q = j+dir[k][1];
	            if(g[p][q]<0) continue;
	            Li.push(g[i][j]);
	            Lj.push(g[p][q]);
	            Lv.push(-1);
	        }
	        Li.push(g[i][j]);
	        Lj.push(g[i][j]);
	        Lv.push(4);
	    }
	    return [Li,Lj,Lv];
	}

	numeric.cdotMV = function dotMV(A,x) {
	    var ret, Ai = A[0], Aj = A[1], Av = A[2],k,p=Ai.length,N;
	    N=0;
	    for(k=0;k<p;k++) { if(Ai[k]>N) N = Ai[k]; }
	    N++;
	    ret = numeric.rep([N],0);
	    for(k=0;k<p;k++) { ret[Ai[k]]+=Av[k]*x[Aj[k]]; }
	    return ret;
	}

	// 7. Splines

	numeric.Spline = function Spline(x,yl,yr,kl,kr) { this.x = x; this.yl = yl; this.yr = yr; this.kl = kl; this.kr = kr; }
	numeric.Spline.prototype._at = function _at(x1,p) {
	    var x = this.x;
	    var yl = this.yl;
	    var yr = this.yr;
	    var kl = this.kl;
	    var kr = this.kr;
	    var x1,a,b,t;
	    var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
	    a = sub(mul(kl[p],x[p+1]-x[p]),sub(yr[p+1],yl[p]));
	    b = add(mul(kr[p+1],x[p]-x[p+1]),sub(yr[p+1],yl[p]));
	    t = (x1-x[p])/(x[p+1]-x[p]);
	    var s = t*(1-t);
	    return add(add(add(mul(1-t,yl[p]),mul(t,yr[p+1])),mul(a,s*(1-t))),mul(b,s*t));
	}
	numeric.Spline.prototype.at = function at(x0) {
	    if(typeof x0 === "number") {
	        var x = this.x;
	        var n = x.length;
	        var p,q,mid,floor = Math.floor,a,b,t;
	        p = 0;
	        q = n-1;
	        while(q-p>1) {
	            mid = floor((p+q)/2);
	            if(x[mid] <= x0) p = mid;
	            else q = mid;
	        }
	        return this._at(x0,p);
	    }
	    var n = x0.length, i, ret = Array(n);
	    for(i=n-1;i!==-1;--i) ret[i] = this.at(x0[i]);
	    return ret;
	}
	numeric.Spline.prototype.diff = function diff() {
	    var x = this.x;
	    var yl = this.yl;
	    var yr = this.yr;
	    var kl = this.kl;
	    var kr = this.kr;
	    var n = yl.length;
	    var i,dx,dy;
	    var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
	    var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
	    for(i=n-1;i!==-1;--i) {
	        dx = x[i+1]-x[i];
	        dy = sub(yr[i+1],yl[i]);
	        pl[i] = div(add(mul(dy, 6),mul(kl[i],-4*dx),mul(kr[i+1],-2*dx)),dx*dx);
	        pr[i+1] = div(add(mul(dy,-6),mul(kl[i], 2*dx),mul(kr[i+1], 4*dx)),dx*dx);
	    }
	    return new numeric.Spline(x,zl,zr,pl,pr);
	}
	numeric.Spline.prototype.roots = function roots() {
	    function sqr(x) { return x*x; }
	    function heval(y0,y1,k0,k1,x) {
	        var A = k0*2-(y1-y0);
	        var B = -k1*2+(y1-y0);
	        var t = (x+1)*0.5;
	        var s = t*(1-t);
	        return (1-t)*y0+t*y1+A*s*(1-t)+B*s*t;
	    }
	    var ret = [];
	    var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
	    if(typeof yl[0] === "number") {
	        yl = [yl];
	        yr = [yr];
	        kl = [kl];
	        kr = [kr];
	    }
	    var m = yl.length,n=x.length-1,i,j,k,y,s,t;
	    var ai,bi,ci,di, ret = Array(m),ri,k0,k1,y0,y1,A,B,D,dx,cx,stops,z0,z1,zm,t0,t1,tm;
	    var sqrt = Math.sqrt;
	    for(i=0;i!==m;++i) {
	        ai = yl[i];
	        bi = yr[i];
	        ci = kl[i];
	        di = kr[i];
	        ri = [];
	        for(j=0;j!==n;j++) {
	            if(j>0 && bi[j]*ai[j]<0) ri.push(x[j]);
	            dx = (x[j+1]-x[j]);
	            cx = x[j];
	            y0 = ai[j];
	            y1 = bi[j+1];
	            k0 = ci[j]/dx;
	            k1 = di[j+1]/dx;
	            D = sqr(k0-k1+3*(y0-y1)) + 12*k1*y0;
	            A = k1+3*y0+2*k0-3*y1;
	            B = 3*(k1+k0+2*(y0-y1));
	            if(D<=0) {
	                z0 = A/B;
	                if(z0>x[j] && z0<x[j+1]) stops = [x[j],z0,x[j+1]];
	                else stops = [x[j],x[j+1]];
	            } else {
	                z0 = (A-sqrt(D))/B;
	                z1 = (A+sqrt(D))/B;
	                stops = [x[j]];
	                if(z0>x[j] && z0<x[j+1]) stops.push(z0);
	                if(z1>x[j] && z1<x[j+1]) stops.push(z1);
	                stops.push(x[j+1]);
	            }
	            t0 = stops[0];
	            z0 = this._at(t0,j);
	            for(k=0;k<stops.length-1;k++) {
	                t1 = stops[k+1];
	                z1 = this._at(t1,j);
	                if(z0 === 0) {
	                    ri.push(t0); 
	                    t0 = t1;
	                    z0 = z1;
	                    continue;
	                }
	                if(z1 === 0 || z0*z1>0) {
	                    t0 = t1;
	                    z0 = z1;
	                    continue;
	                }
	                var side = 0;
	                while(1) {
	                    tm = (z0*t1-z1*t0)/(z0-z1);
	                    if(tm <= t0 || tm >= t1) { break; }
	                    zm = this._at(tm,j);
	                    if(zm*z1>0) {
	                        t1 = tm;
	                        z1 = zm;
	                        if(side === -1) z0*=0.5;
	                        side = -1;
	                    } else if(zm*z0>0) {
	                        t0 = tm;
	                        z0 = zm;
	                        if(side === 1) z1*=0.5;
	                        side = 1;
	                    } else break;
	                }
	                ri.push(tm);
	                t0 = stops[k+1];
	                z0 = this._at(t0, j);
	            }
	            if(z1 === 0) ri.push(t1);
	        }
	        ret[i] = ri;
	    }
	    if(typeof this.yl[0] === "number") return ret[0];
	    return ret;
	}
	numeric.spline = function spline(x,y,k1,kn) {
	    var n = x.length, b = [], dx = [], dy = [];
	    var i;
	    var sub = numeric.sub,mul = numeric.mul,add = numeric.add;
	    for(i=n-2;i>=0;i--) { dx[i] = x[i+1]-x[i]; dy[i] = sub(y[i+1],y[i]); }
	    if(typeof k1 === "string" || typeof kn === "string") { 
	        k1 = kn = "periodic";
	    }
	    // Build sparse tridiagonal system
	    var T = [[],[],[]];
	    switch(typeof k1) {
	    case "undefined":
	        b[0] = mul(3/(dx[0]*dx[0]),dy[0]);
	        T[0].push(0,0);
	        T[1].push(0,1);
	        T[2].push(2/dx[0],1/dx[0]);
	        break;
	    case "string":
	        b[0] = add(mul(3/(dx[n-2]*dx[n-2]),dy[n-2]),mul(3/(dx[0]*dx[0]),dy[0]));
	        T[0].push(0,0,0);
	        T[1].push(n-2,0,1);
	        T[2].push(1/dx[n-2],2/dx[n-2]+2/dx[0],1/dx[0]);
	        break;
	    default:
	        b[0] = k1;
	        T[0].push(0);
	        T[1].push(0);
	        T[2].push(1);
	        break;
	    }
	    for(i=1;i<n-1;i++) {
	        b[i] = add(mul(3/(dx[i-1]*dx[i-1]),dy[i-1]),mul(3/(dx[i]*dx[i]),dy[i]));
	        T[0].push(i,i,i);
	        T[1].push(i-1,i,i+1);
	        T[2].push(1/dx[i-1],2/dx[i-1]+2/dx[i],1/dx[i]);
	    }
	    switch(typeof kn) {
	    case "undefined":
	        b[n-1] = mul(3/(dx[n-2]*dx[n-2]),dy[n-2]);
	        T[0].push(n-1,n-1);
	        T[1].push(n-2,n-1);
	        T[2].push(1/dx[n-2],2/dx[n-2]);
	        break;
	    case "string":
	        T[1][T[1].length-1] = 0;
	        break;
	    default:
	        b[n-1] = kn;
	        T[0].push(n-1);
	        T[1].push(n-1);
	        T[2].push(1);
	        break;
	    }
	    if(typeof b[0] !== "number") b = numeric.transpose(b);
	    else b = [b];
	    var k = Array(b.length);
	    if(typeof k1 === "string") {
	        for(i=k.length-1;i!==-1;--i) {
	            k[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(T)),b[i]);
	            k[i][n-1] = k[i][0];
	        }
	    } else {
	        for(i=k.length-1;i!==-1;--i) {
	            k[i] = numeric.cLUsolve(numeric.cLU(T),b[i]);
	        }
	    }
	    if(typeof y[0] === "number") k = k[0];
	    else k = numeric.transpose(k);
	    return new numeric.Spline(x,y,y,k,k);
	}

	// 8. FFT
	numeric.fftpow2 = function fftpow2(x,y) {
	    var n = x.length;
	    if(n === 1) return;
	    var cos = Math.cos, sin = Math.sin, i,j;
	    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
	    j = n/2;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        xo[j] = x[i];
	        yo[j] = y[i];
	        --i;
	        xe[j] = x[i];
	        ye[j] = y[i];
	    }
	    fftpow2(xe,ye);
	    fftpow2(xo,yo);
	    j = n/2;
	    var t,k = (-6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        if(j === -1) j = n/2-1;
	        t = k*i;
	        ci = cos(t);
	        si = sin(t);
	        x[i] = xe[j] + ci*xo[j] - si*yo[j];
	        y[i] = ye[j] + ci*yo[j] + si*xo[j];
	    }
	}
	numeric._ifftpow2 = function _ifftpow2(x,y) {
	    var n = x.length;
	    if(n === 1) return;
	    var cos = Math.cos, sin = Math.sin, i,j;
	    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
	    j = n/2;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        xo[j] = x[i];
	        yo[j] = y[i];
	        --i;
	        xe[j] = x[i];
	        ye[j] = y[i];
	    }
	    _ifftpow2(xe,ye);
	    _ifftpow2(xo,yo);
	    j = n/2;
	    var t,k = (6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        if(j === -1) j = n/2-1;
	        t = k*i;
	        ci = cos(t);
	        si = sin(t);
	        x[i] = xe[j] + ci*xo[j] - si*yo[j];
	        y[i] = ye[j] + ci*yo[j] + si*xo[j];
	    }
	}
	numeric.ifftpow2 = function ifftpow2(x,y) {
	    numeric._ifftpow2(x,y);
	    numeric.diveq(x,x.length);
	    numeric.diveq(y,y.length);
	}
	numeric.convpow2 = function convpow2(ax,ay,bx,by) {
	    numeric.fftpow2(ax,ay);
	    numeric.fftpow2(bx,by);
	    var i,n = ax.length,axi,bxi,ayi,byi;
	    for(i=n-1;i!==-1;--i) {
	        axi = ax[i]; ayi = ay[i]; bxi = bx[i]; byi = by[i];
	        ax[i] = axi*bxi-ayi*byi;
	        ay[i] = axi*byi+ayi*bxi;
	    }
	    numeric.ifftpow2(ax,ay);
	}
	numeric.T.prototype.fft = function fft() {
	    var x = this.x, y = this.y;
	    var n = x.length, log = Math.log, log2 = log(2),
	        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
	    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
	    var k, c = (-3.141592653589793238462643383279502884197169399375105820/n),t;
	    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
	    for(k=0;k<n;k++) a[k] = x[k];
	    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
	    cx[0] = 1;
	    for(k=1;k<=m/2;k++) {
	        t = c*k*k;
	        cx[k] = cos(t);
	        cy[k] = sin(t);
	        cx[m-k] = cos(t);
	        cy[m-k] = sin(t)
	    }
	    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
	    X = X.mul(Y);
	    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
	    X = X.mul(Y);
	    X.x.length = n;
	    X.y.length = n;
	    return X;
	}
	numeric.T.prototype.ifft = function ifft() {
	    var x = this.x, y = this.y;
	    var n = x.length, log = Math.log, log2 = log(2),
	        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
	    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
	    var k, c = (3.141592653589793238462643383279502884197169399375105820/n),t;
	    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
	    for(k=0;k<n;k++) a[k] = x[k];
	    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
	    cx[0] = 1;
	    for(k=1;k<=m/2;k++) {
	        t = c*k*k;
	        cx[k] = cos(t);
	        cy[k] = sin(t);
	        cx[m-k] = cos(t);
	        cy[m-k] = sin(t)
	    }
	    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
	    X = X.mul(Y);
	    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
	    X = X.mul(Y);
	    X.x.length = n;
	    X.y.length = n;
	    return X.div(n);
	}

	//9. Unconstrained optimization
	numeric.gradient = function gradient(f,x) {
	    var n = x.length;
	    var f0 = f(x);
	    if(isNaN(f0)) throw new Error('gradient: f(x) is a NaN!');
	    var max = Math.max;
	    var i,x0 = numeric.clone(x),f1,f2, J = Array(n);
	    var div = numeric.div, sub = numeric.sub,errest,roundoff,max = Math.max,eps = 1e-3,abs = Math.abs, min = Math.min;
	    var t0,t1,t2,it=0,d1,d2,N;
	    for(i=0;i<n;i++) {
	        var h = max(1e-6*f0,1e-8);
	        while(1) {
	            ++it;
	            if(it>20) { throw new Error("Numerical gradient fails"); }
	            x0[i] = x[i]+h;
	            f1 = f(x0);
	            x0[i] = x[i]-h;
	            f2 = f(x0);
	            x0[i] = x[i];
	            if(isNaN(f1) || isNaN(f2)) { h/=16; continue; }
	            J[i] = (f1-f2)/(2*h);
	            t0 = x[i]-h;
	            t1 = x[i];
	            t2 = x[i]+h;
	            d1 = (f1-f0)/h;
	            d2 = (f0-f2)/h;
	            N = max(abs(J[i]),abs(f0),abs(f1),abs(f2),abs(t0),abs(t1),abs(t2),1e-8);
	            errest = min(max(abs(d1-J[i]),abs(d2-J[i]),abs(d1-d2))/N,h/N);
	            if(errest>eps) { h/=16; }
	            else break;
	            }
	    }
	    return J;
	}

	numeric.uncmin = function uncmin(f,x0,tol,gradient,maxit,callback,options) {
	    var grad = numeric.gradient;
	    if(typeof options === "undefined") { options = {}; }
	    if(typeof tol === "undefined") { tol = 1e-8; }
	    if(typeof gradient === "undefined") { gradient = function(x) { return grad(f,x); }; }
	    if(typeof maxit === "undefined") maxit = 1000;
	    x0 = numeric.clone(x0);
	    var n = x0.length;
	    var f0 = f(x0),f1,df0;
	    if(isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!');
	    var max = Math.max, norm2 = numeric.norm2;
	    tol = max(tol,numeric.epsilon);
	    var step,g0,g1,H1 = options.Hinv || numeric.identity(n);
	    var dot = numeric.dot, inv = numeric.inv, sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
	    var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
	    var it=0,i,s,x1,y,Hy,Hs,ys,i0,t,nstep,t1,t2;
	    var msg = "";
	    g0 = gradient(x0);
	    while(it<maxit) {
	        if(typeof callback === "function") { if(callback(it,x0,f0,g0,H1)) { msg = "Callback returned true"; break; } }
	        if(!all(isfinite(g0))) { msg = "Gradient has Infinity or NaN"; break; }
	        step = neg(dot(H1,g0));
	        if(!all(isfinite(step))) { msg = "Search direction has Infinity or NaN"; break; }
	        nstep = norm2(step);
	        if(nstep < tol) { msg="Newton step smaller than tol"; break; }
	        t = 1;
	        df0 = dot(g0,step);
	        // line search
	        x1 = x0;
	        while(it < maxit) {
	            if(t*nstep < tol) { break; }
	            s = mul(step,t);
	            x1 = add(x0,s);
	            f1 = f(x1);
	            if(f1-f0 >= 0.1*t*df0 || isNaN(f1)) {
	                t *= 0.5;
	                ++it;
	                continue;
	            }
	            break;
	        }
	        if(t*nstep < tol) { msg = "Line search step size smaller than tol"; break; }
	        if(it === maxit) { msg = "maxit reached during line search"; break; }
	        g1 = gradient(x1);
	        y = sub(g1,g0);
	        ys = dot(y,s);
	        Hy = dot(H1,y);
	        H1 = sub(add(H1,
	                mul(
	                        (ys+dot(y,Hy))/(ys*ys),
	                        ten(s,s)    )),
	                div(add(ten(Hy,s),ten(s,Hy)),ys));
	        x0 = x1;
	        f0 = f1;
	        g0 = g1;
	        ++it;
	    }
	    return {solution: x0, f: f0, gradient: g0, invHessian: H1, iterations:it, message: msg};
	}

	// 10. Ode solver (Dormand-Prince)
	numeric.Dopri = function Dopri(x,y,f,ymid,iterations,msg,events) {
	    this.x = x;
	    this.y = y;
	    this.f = f;
	    this.ymid = ymid;
	    this.iterations = iterations;
	    this.events = events;
	    this.message = msg;
	}
	numeric.Dopri.prototype._at = function _at(xi,j) {
	    function sqr(x) { return x*x; }
	    var sol = this;
	    var xs = sol.x;
	    var ys = sol.y;
	    var k1 = sol.f;
	    var ymid = sol.ymid;
	    var n = xs.length;
	    var x0,x1,xh,y0,y1,yh,xi;
	    var floor = Math.floor,h;
	    var c = 0.5;
	    var add = numeric.add, mul = numeric.mul,sub = numeric.sub, p,q,w;
	    x0 = xs[j];
	    x1 = xs[j+1];
	    y0 = ys[j];
	    y1 = ys[j+1];
	    h  = x1-x0;
	    xh = x0+c*h;
	    yh = ymid[j];
	    p = sub(k1[j  ],mul(y0,1/(x0-xh)+2/(x0-x1)));
	    q = sub(k1[j+1],mul(y1,1/(x1-xh)+2/(x1-x0)));
	    w = [sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
	         sqr(xi - x0) * sqr(xi - x1) / sqr(x0 - xh) / sqr(x1 - xh),
	         sqr(xi - x0) * (xi - xh) / sqr(x1 - x0) / (x1 - xh),
	         (xi - x0) * sqr(xi - x1) * (xi - xh) / sqr(x0-x1) / (x0 - xh),
	         (xi - x1) * sqr(xi - x0) * (xi - xh) / sqr(x0-x1) / (x1 - xh)];
	    return add(add(add(add(mul(y0,w[0]),
	                           mul(yh,w[1])),
	                           mul(y1,w[2])),
	                           mul( p,w[3])),
	                           mul( q,w[4]));
	}
	numeric.Dopri.prototype.at = function at(x) {
	    var i,j,k,floor = Math.floor;
	    if(typeof x !== "number") {
	        var n = x.length, ret = Array(n);
	        for(i=n-1;i!==-1;--i) {
	            ret[i] = this.at(x[i]);
	        }
	        return ret;
	    }
	    var x0 = this.x;
	    i = 0; j = x0.length-1;
	    while(j-i>1) {
	        k = floor(0.5*(i+j));
	        if(x0[k] <= x) i = k;
	        else j = k;
	    }
	    return this._at(x,i);
	}

	numeric.dopri = function dopri(x0,x1,y0,f,tol,maxit,event) {
	    if(typeof tol === "undefined") { tol = 1e-6; }
	    if(typeof maxit === "undefined") { maxit = 1000; }
	    var xs = [x0], ys = [y0], k1 = [f(x0,y0)], k2,k3,k4,k5,k6,k7, ymid = [];
	    var A2 = 1/5;
	    var A3 = [3/40,9/40];
	    var A4 = [44/45,-56/15,32/9];
	    var A5 = [19372/6561,-25360/2187,64448/6561,-212/729];
	    var A6 = [9017/3168,-355/33,46732/5247,49/176,-5103/18656];
	    var b = [35/384,0,500/1113,125/192,-2187/6784,11/84];
	    var bm = [0.5*6025192743/30085553152,
	              0,
	              0.5*51252292925/65400821598,
	              0.5*-2691868925/45128329728,
	              0.5*187940372067/1594534317056,
	              0.5*-1776094331/19743644256,
	              0.5*11237099/235043384];
	    var c = [1/5,3/10,4/5,8/9,1,1];
	    var e = [-71/57600,0,71/16695,-71/1920,17253/339200,-22/525,1/40];
	    var i = 0,er,j;
	    var h = (x1-x0)/10;
	    var it = 0;
	    var add = numeric.add, mul = numeric.mul, y1,erinf;
	    var max = Math.max, min = Math.min, abs = Math.abs, norminf = numeric.norminf,pow = Math.pow;
	    var any = numeric.any, lt = numeric.lt, and = numeric.and, sub = numeric.sub;
	    var e0, e1, ev;
	    var ret = new numeric.Dopri(xs,ys,k1,ymid,-1,"");
	    if(typeof event === "function") e0 = event(x0,y0);
	    while(x0<x1 && it<maxit) {
	        ++it;
	        if(x0+h>x1) h = x1-x0;
	        k2 = f(x0+c[0]*h,                add(y0,mul(   A2*h,k1[i])));
	        k3 = f(x0+c[1]*h,            add(add(y0,mul(A3[0]*h,k1[i])),mul(A3[1]*h,k2)));
	        k4 = f(x0+c[2]*h,        add(add(add(y0,mul(A4[0]*h,k1[i])),mul(A4[1]*h,k2)),mul(A4[2]*h,k3)));
	        k5 = f(x0+c[3]*h,    add(add(add(add(y0,mul(A5[0]*h,k1[i])),mul(A5[1]*h,k2)),mul(A5[2]*h,k3)),mul(A5[3]*h,k4)));
	        k6 = f(x0+c[4]*h,add(add(add(add(add(y0,mul(A6[0]*h,k1[i])),mul(A6[1]*h,k2)),mul(A6[2]*h,k3)),mul(A6[3]*h,k4)),mul(A6[4]*h,k5)));
	        y1 = add(add(add(add(add(y0,mul(k1[i],h*b[0])),mul(k3,h*b[2])),mul(k4,h*b[3])),mul(k5,h*b[4])),mul(k6,h*b[5]));
	        k7 = f(x0+h,y1);
	        er = add(add(add(add(add(mul(k1[i],h*e[0]),mul(k3,h*e[2])),mul(k4,h*e[3])),mul(k5,h*e[4])),mul(k6,h*e[5])),mul(k7,h*e[6]));
	        if(typeof er === "number") erinf = abs(er);
	        else erinf = norminf(er);
	        if(erinf > tol) { // reject
	            h = 0.2*h*pow(tol/erinf,0.25);
	            if(x0+h === x0) {
	                ret.msg = "Step size became too small";
	                break;
	            }
	            continue;
	        }
	        ymid[i] = add(add(add(add(add(add(y0,
	                mul(k1[i],h*bm[0])),
	                mul(k3   ,h*bm[2])),
	                mul(k4   ,h*bm[3])),
	                mul(k5   ,h*bm[4])),
	                mul(k6   ,h*bm[5])),
	                mul(k7   ,h*bm[6]));
	        ++i;
	        xs[i] = x0+h;
	        ys[i] = y1;
	        k1[i] = k7;
	        if(typeof event === "function") {
	            var yi,xl = x0,xr = x0+0.5*h,xi;
	            e1 = event(xr,ymid[i-1]);
	            ev = and(lt(e0,0),lt(0,e1));
	            if(!any(ev)) { xl = xr; xr = x0+h; e0 = e1; e1 = event(xr,y1); ev = and(lt(e0,0),lt(0,e1)); }
	            if(any(ev)) {
	                var xc, yc, en,ei;
	                var side=0, sl = 1.0, sr = 1.0;
	                while(1) {
	                    if(typeof e0 === "number") xi = (sr*e1*xl-sl*e0*xr)/(sr*e1-sl*e0);
	                    else {
	                        xi = xr;
	                        for(j=e0.length-1;j!==-1;--j) {
	                            if(e0[j]<0 && e1[j]>0) xi = min(xi,(sr*e1[j]*xl-sl*e0[j]*xr)/(sr*e1[j]-sl*e0[j]));
	                        }
	                    }
	                    if(xi <= xl || xi >= xr) break;
	                    yi = ret._at(xi, i-1);
	                    ei = event(xi,yi);
	                    en = and(lt(e0,0),lt(0,ei));
	                    if(any(en)) {
	                        xr = xi;
	                        e1 = ei;
	                        ev = en;
	                        sr = 1.0;
	                        if(side === -1) sl *= 0.5;
	                        else sl = 1.0;
	                        side = -1;
	                    } else {
	                        xl = xi;
	                        e0 = ei;
	                        sl = 1.0;
	                        if(side === 1) sr *= 0.5;
	                        else sr = 1.0;
	                        side = 1;
	                    }
	                }
	                y1 = ret._at(0.5*(x0+xi),i-1);
	                ret.f[i] = f(xi,yi);
	                ret.x[i] = xi;
	                ret.y[i] = yi;
	                ret.ymid[i-1] = y1;
	                ret.events = ev;
	                ret.iterations = it;
	                return ret;
	            }
	        }
	        x0 += h;
	        y0 = y1;
	        e0 = e1;
	        h = min(0.8*h*pow(tol/erinf,0.25),4*h);
	    }
	    ret.iterations = it;
	    return ret;
	}

	// 11. Ax = b
	numeric.LU = function(A, fast) {
	  fast = fast || false;

	  var abs = Math.abs;
	  var i, j, k, absAjk, Akk, Ak, Pk, Ai;
	  var max;
	  var n = A.length, n1 = n-1;
	  var P = new Array(n);
	  if(!fast) A = numeric.clone(A);

	  for (k = 0; k < n; ++k) {
	    Pk = k;
	    Ak = A[k];
	    max = abs(Ak[k]);
	    for (j = k + 1; j < n; ++j) {
	      absAjk = abs(A[j][k]);
	      if (max < absAjk) {
	        max = absAjk;
	        Pk = j;
	      }
	    }
	    P[k] = Pk;

	    if (Pk != k) {
	      A[k] = A[Pk];
	      A[Pk] = Ak;
	      Ak = A[k];
	    }

	    Akk = Ak[k];

	    for (i = k + 1; i < n; ++i) {
	      A[i][k] /= Akk;
	    }

	    for (i = k + 1; i < n; ++i) {
	      Ai = A[i];
	      for (j = k + 1; j < n1; ++j) {
	        Ai[j] -= Ai[k] * Ak[j];
	        ++j;
	        Ai[j] -= Ai[k] * Ak[j];
	      }
	      if(j===n1) Ai[j] -= Ai[k] * Ak[j];
	    }
	  }

	  return {
	    LU: A,
	    P:  P
	  };
	}

	numeric.LUsolve = function LUsolve(LUP, b) {
	  var i, j;
	  var LU = LUP.LU;
	  var n   = LU.length;
	  var x = numeric.clone(b);
	  var P   = LUP.P;
	  var Pi, LUi, LUii, tmp;

	  for (i=n-1;i!==-1;--i) x[i] = b[i];
	  for (i = 0; i < n; ++i) {
	    Pi = P[i];
	    if (P[i] !== i) {
	      tmp = x[i];
	      x[i] = x[Pi];
	      x[Pi] = tmp;
	    }

	    LUi = LU[i];
	    for (j = 0; j < i; ++j) {
	      x[i] -= x[j] * LUi[j];
	    }
	  }

	  for (i = n - 1; i >= 0; --i) {
	    LUi = LU[i];
	    for (j = i + 1; j < n; ++j) {
	      x[i] -= x[j] * LUi[j];
	    }

	    x[i] /= LUi[i];
	  }

	  return x;
	}

	numeric.solve = function solve(A,b,fast) { return numeric.LUsolve(numeric.LU(A,fast), b); }

	// 12. Linear programming
	numeric.echelonize = function echelonize(A) {
	    var s = numeric.dim(A), m = s[0], n = s[1];
	    var I = numeric.identity(m);
	    var P = Array(m);
	    var i,j,k,l,Ai,Ii,Z,a;
	    var abs = Math.abs;
	    var diveq = numeric.diveq;
	    A = numeric.clone(A);
	    for(i=0;i<m;++i) {
	        k = 0;
	        Ai = A[i];
	        Ii = I[i];
	        for(j=1;j<n;++j) if(abs(Ai[k])<abs(Ai[j])) k=j;
	        P[i] = k;
	        diveq(Ii,Ai[k]);
	        diveq(Ai,Ai[k]);
	        for(j=0;j<m;++j) if(j!==i) {
	            Z = A[j]; a = Z[k];
	            for(l=n-1;l!==-1;--l) Z[l] -= Ai[l]*a;
	            Z = I[j];
	            for(l=m-1;l!==-1;--l) Z[l] -= Ii[l]*a;
	        }
	    }
	    return {I:I, A:A, P:P};
	}

	numeric.__solveLP = function __solveLP(c,A,b,tol,maxit,x,flag) {
	    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
	    var m = c.length, n = b.length,y;
	    var unbounded = false, cb,i0=0;
	    var alpha = 1.0;
	    var f0,df0,AT = numeric.transpose(A), svd = numeric.svd,transpose = numeric.transpose,leq = numeric.leq, sqrt = Math.sqrt, abs = Math.abs;
	    var muleq = numeric.muleq;
	    var norm = numeric.norminf, any = numeric.any,min = Math.min;
	    var all = numeric.all, gt = numeric.gt;
	    var p = Array(m), A0 = Array(n),e=numeric.rep([n],1), H;
	    var solve = numeric.solve, z = sub(b,dot(A,x)),count;
	    var dotcc = dot(c,c);
	    var g;
	    for(count=i0;count<maxit;++count) {
	        var i,j,d;
	        for(i=n-1;i!==-1;--i) A0[i] = div(A[i],z[i]);
	        var A1 = transpose(A0);
	        for(i=m-1;i!==-1;--i) p[i] = (/*x[i]+*/sum(A1[i]));
	        alpha = 0.25*abs(dotcc/dot(c,p));
	        var a1 = 100*sqrt(dotcc/dot(p,p));
	        if(!isFinite(alpha) || alpha>a1) alpha = a1;
	        g = add(c,mul(alpha,p));
	        H = dot(A1,A0);
	        for(i=m-1;i!==-1;--i) H[i][i] += 1;
	        d = solve(H,div(g,alpha),true);
	        var t0 = div(z,dot(A,d));
	        var t = 1.0;
	        for(i=n-1;i!==-1;--i) if(t0[i]<0) t = min(t,-0.999*t0[i]);
	        y = sub(x,mul(d,t));
	        z = sub(b,dot(A,y));
	        if(!all(gt(z,0))) return { solution: x, message: "", iterations: count };
	        x = y;
	        if(alpha<tol) return { solution: y, message: "", iterations: count };
	        if(flag) {
	            var s = dot(c,g), Ag = dot(A,g);
	            unbounded = true;
	            for(i=n-1;i!==-1;--i) if(s*Ag[i]<0) { unbounded = false; break; }
	        } else {
	            if(x[m-1]>=0) unbounded = false;
	            else unbounded = true;
	        }
	        if(unbounded) return { solution: y, message: "Unbounded", iterations: count };
	    }
	    return { solution: x, message: "maximum iteration count exceeded", iterations:count };
	}

	numeric._solveLP = function _solveLP(c,A,b,tol,maxit) {
	    var m = c.length, n = b.length,y;
	    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
	    var c0 = numeric.rep([m],0).concat([1]);
	    var J = numeric.rep([n,1],-1);
	    var A0 = numeric.blockMatrix([[A                   ,   J  ]]);
	    var b0 = b;
	    var y = numeric.rep([m],0).concat(Math.max(0,numeric.sup(numeric.neg(b)))+1);
	    var x0 = numeric.__solveLP(c0,A0,b0,tol,maxit,y,false);
	    var x = numeric.clone(x0.solution);
	    x.length = m;
	    var foo = numeric.inf(sub(b,dot(A,x)));
	    if(foo<0) { return { solution: NaN, message: "Infeasible", iterations: x0.iterations }; }
	    var ret = numeric.__solveLP(c, A, b, tol, maxit-x0.iterations, x, true);
	    ret.iterations += x0.iterations;
	    return ret;
	};

	numeric.solveLP = function solveLP(c,A,b,Aeq,beq,tol,maxit) {
	    if(typeof maxit === "undefined") maxit = 1000;
	    if(typeof tol === "undefined") tol = numeric.epsilon;
	    if(typeof Aeq === "undefined") return numeric._solveLP(c,A,b,tol,maxit);
	    var m = Aeq.length, n = Aeq[0].length, o = A.length;
	    var B = numeric.echelonize(Aeq);
	    var flags = numeric.rep([n],0);
	    var P = B.P;
	    var Q = [];
	    var i;
	    for(i=P.length-1;i!==-1;--i) flags[P[i]] = 1;
	    for(i=n-1;i!==-1;--i) if(flags[i]===0) Q.push(i);
	    var g = numeric.getRange;
	    var I = numeric.linspace(0,m-1), J = numeric.linspace(0,o-1);
	    var Aeq2 = g(Aeq,I,Q), A1 = g(A,J,P), A2 = g(A,J,Q), dot = numeric.dot, sub = numeric.sub;
	    var A3 = dot(A1,B.I);
	    var A4 = sub(A2,dot(A3,Aeq2)), b4 = sub(b,dot(A3,beq));
	    var c1 = Array(P.length), c2 = Array(Q.length);
	    for(i=P.length-1;i!==-1;--i) c1[i] = c[P[i]];
	    for(i=Q.length-1;i!==-1;--i) c2[i] = c[Q[i]];
	    var c4 = sub(c2,dot(c1,dot(B.I,Aeq2)));
	    var S = numeric._solveLP(c4,A4,b4,tol,maxit);
	    var x2 = S.solution;
	    if(x2!==x2) return S;
	    var x1 = dot(B.I,sub(beq,dot(Aeq2,x2)));
	    var x = Array(c.length);
	    for(i=P.length-1;i!==-1;--i) x[P[i]] = x1[i];
	    for(i=Q.length-1;i!==-1;--i) x[Q[i]] = x2[i];
	    return { solution: x, message:S.message, iterations: S.iterations };
	}

	numeric.MPStoLP = function MPStoLP(MPS) {
	    if(MPS instanceof String) { MPS.split('\n'); }
	    var state = 0;
	    var states = ['Initial state','NAME','ROWS','COLUMNS','RHS','BOUNDS','ENDATA'];
	    var n = MPS.length;
	    var i,j,z,N=0,rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
	    var name;
	    var c = [], A = [], b = [];
	    function err(e) { throw new Error('MPStoLP: '+e+'\nLine '+i+': '+MPS[i]+'\nCurrent state: '+states[state]+'\n'); }
	    for(i=0;i<n;++i) {
	        z = MPS[i];
	        var w0 = z.match(/\S*/g);
	        var w = [];
	        for(j=0;j<w0.length;++j) if(w0[j]!=="") w.push(w0[j]);
	        if(w.length === 0) continue;
	        for(j=0;j<states.length;++j) if(z.substr(0,states[j].length) === states[j]) break;
	        if(j<states.length) {
	            state = j;
	            if(j===1) { name = w[1]; }
	            if(j===6) return { name:name, c:c, A:numeric.transpose(A), b:b, rows:rows, vars:vars };
	            continue;
	        }
	        switch(state) {
	        case 0: case 1: err('Unexpected line');
	        case 2: 
	            switch(w[0]) {
	            case 'N': if(N===0) N = w[1]; else err('Two or more N rows'); break;
	            case 'L': rows[w[1]] = rl; sign[rl] = 1; b[rl] = 0; ++rl; break;
	            case 'G': rows[w[1]] = rl; sign[rl] = -1;b[rl] = 0; ++rl; break;
	            case 'E': rows[w[1]] = rl; sign[rl] = 0;b[rl] = 0; ++rl; break;
	            default: err('Parse error '+numeric.prettyPrint(w));
	            }
	            break;
	        case 3:
	            if(!vars.hasOwnProperty(w[0])) { vars[w[0]] = nv; c[nv] = 0; A[nv] = numeric.rep([rl],0); ++nv; }
	            var p = vars[w[0]];
	            for(j=1;j<w.length;j+=2) {
	                if(w[j] === N) { c[p] = parseFloat(w[j+1]); continue; }
	                var q = rows[w[j]];
	                A[p][q] = (sign[q]<0?-1:1)*parseFloat(w[j+1]);
	            }
	            break;
	        case 4:
	            for(j=1;j<w.length;j+=2) b[rows[w[j]]] = (sign[rows[w[j]]]<0?-1:1)*parseFloat(w[j+1]);
	            break;
	        case 5: /*FIXME*/ break;
	        case 6: err('Internal error');
	        }
	    }
	    err('Reached end of file without ENDATA');
	}
	// seedrandom.js version 2.0.
	// Author: David Bau 4/2/2011
	//
	// Defines a method Math.seedrandom() that, when called, substitutes
	// an explicitly seeded RC4-based algorithm for Math.random().  Also
	// supports automatic seeding from local or network sources of entropy.
	//
	// Usage:
	//
	//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
	//
	//   Math.seedrandom('yipee'); Sets Math.random to a function that is
	//                             initialized using the given explicit seed.
	//
	//   Math.seedrandom();        Sets Math.random to a function that is
	//                             seeded using the current time, dom state,
	//                             and other accumulated local entropy.
	//                             The generated seed string is returned.
	//
	//   Math.seedrandom('yowza', true);
	//                             Seeds using the given explicit seed mixed
	//                             together with accumulated entropy.
	//
	//   <script src="http://bit.ly/srandom-512"></script>
	//                             Seeds using physical random bits downloaded
	//                             from random.org.
	//
	//   <script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom">
	//   </script>                 Seeds using urandom bits from call.jsonlib.com,
	//                             which is faster than random.org.
	//
	// Examples:
	//
	//   Math.seedrandom("hello");            // Use "hello" as the seed.
	//   document.write(Math.random());       // Always 0.5463663768140734
	//   document.write(Math.random());       // Always 0.43973793770592234
	//   var rng1 = Math.random;              // Remember the current prng.
	//
	//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
	//   document.write(Math.random());       // Pretty much unpredictable.
	//
	//   Math.random = rng1;                  // Continue "hello" prng sequence.
	//   document.write(Math.random());       // Always 0.554769432473455
	//
	//   Math.seedrandom(autoseed);           // Restart at the previous seed.
	//   document.write(Math.random());       // Repeat the 'unpredictable' value.
	//
	// Notes:
	//
	// Each time seedrandom('arg') is called, entropy from the passed seed
	// is accumulated in a pool to help generate future seeds for the
	// zero-argument form of Math.seedrandom, so entropy can be injected over
	// time by calling seedrandom with explicit data repeatedly.
	//
	// On speed - This javascript implementation of Math.random() is about
	// 3-10x slower than the built-in Math.random() because it is not native
	// code, but this is typically fast enough anyway.  Seeding is more expensive,
	// especially if you use auto-seeding.  Some details (timings on Chrome 4):
	//
	// Our Math.random()            - avg less than 0.002 milliseconds per call
	// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
	// seedrandom('explicit', true) - avg less than 2 milliseconds per call
	// seedrandom()                 - avg about 38 milliseconds per call
	//
	// LICENSE (BSD):
	//
	// Copyright 2010 David Bau, all rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions are met:
	// 
	//   1. Redistributions of source code must retain the above copyright
	//      notice, this list of conditions and the following disclaimer.
	//
	//   2. Redistributions in binary form must reproduce the above copyright
	//      notice, this list of conditions and the following disclaimer in the
	//      documentation and/or other materials provided with the distribution.
	// 
	//   3. Neither the name of this module nor the names of its contributors may
	//      be used to endorse or promote products derived from this software
	//      without specific prior written permission.
	// 
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	/**
	 * All code is in an anonymous closure to keep the global namespace clean.
	 *
	 * @param {number=} overflow 
	 * @param {number=} startdenom
	 */

	// Patched by Seb so that seedrandom.js does not pollute the Math object.
	// My tests suggest that doing Math.trouble = 1 makes Math lookups about 5%
	// slower.
	numeric.seedrandom = { pow:Math.pow, random:Math.random };

	(function (pool, math, width, chunks, significance, overflow, startdenom) {


	//
	// seedrandom()
	// This is the seedrandom function described above.
	//
	math['seedrandom'] = function seedrandom(seed, use_entropy) {
	  var key = [];
	  var arc4;

	  // Flatten the seed string or build one from local entropy if needed.
	  seed = mixkey(flatten(
	    use_entropy ? [seed, pool] :
	    arguments.length ? seed :
	    [new Date().getTime(), pool, window], 3), key);

	  // Use the seed to initialize an ARC4 generator.
	  arc4 = new ARC4(key);

	  // Mix the randomness into accumulated entropy.
	  mixkey(arc4.S, pool);

	  // Override Math.random

	  // This function returns a random double in [0, 1) that contains
	  // randomness in every bit of the mantissa of the IEEE 754 value.

	  math['random'] = function random() {  // Closure to return a random double:
	    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
	    var d = startdenom;                 //   and denominator d = 2 ^ 48.
	    var x = 0;                          //   and no 'extra last byte'.
	    while (n < significance) {          // Fill up all significant digits by
	      n = (n + x) * width;              //   shifting numerator and
	      d *= width;                       //   denominator and generating a
	      x = arc4.g(1);                    //   new least-significant-byte.
	    }
	    while (n >= overflow) {             // To avoid rounding up, before adding
	      n /= 2;                           //   last byte, shift everything
	      d /= 2;                           //   right using integer math until
	      x >>>= 1;                         //   we have exactly the desired bits.
	    }
	    return (n + x) / d;                 // Form the number within [0, 1).
	  };

	  // Return the seed that was used
	  return seed;
	};

	//
	// ARC4
	//
	// An ARC4 implementation.  The constructor takes a key in the form of
	// an array of at most (width) integers that should be 0 <= x < (width).
	//
	// The g(count) method returns a pseudorandom integer that concatenates
	// the next (count) outputs from ARC4.  Its return value is a number x
	// that is in the range 0 <= x < (width ^ count).
	//
	/** @constructor */
	function ARC4(key) {
	  var t, u, me = this, keylen = key.length;
	  var i = 0, j = me.i = me.j = me.m = 0;
	  me.S = [];
	  me.c = [];

	  // The empty key [] is treated as [0].
	  if (!keylen) { key = [keylen++]; }

	  // Set up S using the standard key scheduling algorithm.
	  while (i < width) { me.S[i] = i++; }
	  for (i = 0; i < width; i++) {
	    t = me.S[i];
	    j = lowbits(j + t + key[i % keylen]);
	    u = me.S[j];
	    me.S[i] = u;
	    me.S[j] = t;
	  }

	  // The "g" method returns the next (count) outputs as one number.
	  me.g = function getnext(count) {
	    var s = me.S;
	    var i = lowbits(me.i + 1); var t = s[i];
	    var j = lowbits(me.j + t); var u = s[j];
	    s[i] = u;
	    s[j] = t;
	    var r = s[lowbits(t + u)];
	    while (--count) {
	      i = lowbits(i + 1); t = s[i];
	      j = lowbits(j + t); u = s[j];
	      s[i] = u;
	      s[j] = t;
	      r = r * width + s[lowbits(t + u)];
	    }
	    me.i = i;
	    me.j = j;
	    return r;
	  };
	  // For robust unpredictability discard an initial batch of values.
	  // See http://www.rsa.com/rsalabs/node.asp?id=2009
	  me.g(width);
	}

	//
	// flatten()
	// Converts an object tree to nested arrays of strings.
	//
	/** @param {Object=} result 
	  * @param {string=} prop
	  * @param {string=} typ */
	function flatten(obj, depth, result, prop, typ) {
	  result = [];
	  typ = typeof(obj);
	  if (depth && typ == 'object') {
	    for (prop in obj) {
	      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
	        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
	      }
	    }
	  }
	  return (result.length ? result : obj + (typ != 'string' ? '\0' : ''));
	}

	//
	// mixkey()
	// Mixes a string seed into a key that is an array of integers, and
	// returns a shortened string seed that is equivalent to the result key.
	//
	/** @param {number=} smear 
	  * @param {number=} j */
	function mixkey(seed, key, smear, j) {
	  seed += '';                         // Ensure the seed is a string
	  smear = 0;
	  for (j = 0; j < seed.length; j++) {
	    key[lowbits(j)] =
	      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
	  }
	  seed = '';
	  for (j in key) { seed += String.fromCharCode(key[j]); }
	  return seed;
	}

	//
	// lowbits()
	// A quick "n mod width" for width a power of 2.
	//
	function lowbits(n) { return n & (width - 1); }

	//
	// The following constants are related to IEEE 754 limits.
	//
	startdenom = math.pow(width, chunks);
	significance = math.pow(2, significance);
	overflow = significance * 2;

	//
	// When seedrandom.js is loaded, we immediately mix a few bits
	// from the built-in RNG into the entropy pool.  Because we do
	// not want to intefere with determinstic PRNG state later,
	// seedrandom will not call math.random on its own again after
	// initialization.
	//
	mixkey(math.random(), pool);

	// End anonymous scope, and pass initial values.
	}(
	  [],   // pool: entropy pool starts empty
	  numeric.seedrandom, // math: package containing random, pow, and seedrandom
	  256,  // width: each RC4 output is 0 <= x < 256
	  6,    // chunks: at least six RC4 outputs for each double
	  52    // significance: there are 52 significant digits in a double
	  ));
	/* This file is a slightly modified version of quadprog.js from Alberto Santini.
	 * It has been slightly modified by Sébastien Loisel to make sure that it handles
	 * 0-based Arrays instead of 1-based Arrays.
	 * License is in resources/LICENSE.quadprog */
	(function(exports) {

	function base0to1(A) {
	    if(typeof A !== "object") { return A; }
	    var ret = [], i,n=A.length;
	    for(i=0;i<n;i++) ret[i+1] = base0to1(A[i]);
	    return ret;
	}
	function base1to0(A) {
	    if(typeof A !== "object") { return A; }
	    var ret = [], i,n=A.length;
	    for(i=1;i<n;i++) ret[i-1] = base1to0(A[i]);
	    return ret;
	}

	function dpori(a, lda, n) {
	    var i, j, k, kp1, t;

	    for (k = 1; k <= n; k = k + 1) {
	        a[k][k] = 1 / a[k][k];
	        t = -a[k][k];
	        //~ dscal(k - 1, t, a[1][k], 1);
	        for (i = 1; i < k; i = i + 1) {
	            a[i][k] = t * a[i][k];
	        }

	        kp1 = k + 1;
	        if (n < kp1) {
	            break;
	        }
	        for (j = kp1; j <= n; j = j + 1) {
	            t = a[k][j];
	            a[k][j] = 0;
	            //~ daxpy(k, t, a[1][k], 1, a[1][j], 1);
	            for (i = 1; i <= k; i = i + 1) {
	                a[i][j] = a[i][j] + (t * a[i][k]);
	            }
	        }
	    }

	}

	function dposl(a, lda, n, b) {
	    var i, k, kb, t;

	    for (k = 1; k <= n; k = k + 1) {
	        //~ t = ddot(k - 1, a[1][k], 1, b[1], 1);
	        t = 0;
	        for (i = 1; i < k; i = i + 1) {
	            t = t + (a[i][k] * b[i]);
	        }

	        b[k] = (b[k] - t) / a[k][k];
	    }

	    for (kb = 1; kb <= n; kb = kb + 1) {
	        k = n + 1 - kb;
	        b[k] = b[k] / a[k][k];
	        t = -b[k];
	        //~ daxpy(k - 1, t, a[1][k], 1, b[1], 1);
	        for (i = 1; i < k; i = i + 1) {
	            b[i] = b[i] + (t * a[i][k]);
	        }
	    }
	}

	function dpofa(a, lda, n, info) {
	    var i, j, jm1, k, t, s;

	    for (j = 1; j <= n; j = j + 1) {
	        info[1] = j;
	        s = 0;
	        jm1 = j - 1;
	        if (jm1 < 1) {
	            s = a[j][j] - s;
	            if (s <= 0) {
	                break;
	            }
	            a[j][j] = Math.sqrt(s);
	        } else {
	            for (k = 1; k <= jm1; k = k + 1) {
	                //~ t = a[k][j] - ddot(k - 1, a[1][k], 1, a[1][j], 1);
	                t = a[k][j];
	                for (i = 1; i < k; i = i + 1) {
	                    t = t - (a[i][j] * a[i][k]);
	                }
	                t = t / a[k][k];
	                a[k][j] = t;
	                s = s + t * t;
	            }
	            s = a[j][j] - s;
	            if (s <= 0) {
	                break;
	            }
	            a[j][j] = Math.sqrt(s);
	        }
	        info[1] = 0;
	    }
	}

	function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat,
	    bvec, fdamat, q, meq, iact, nact, iter, work, ierr) {

	    var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv,
	        temp, sum, t1, tt, gc, gs, nu,
	        t1inf, t2min,
	        vsmall, tmpa, tmpb,
	        go;

	    r = Math.min(n, q);
	    l = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;

	    vsmall = 1.0e-60;
	    do {
	        vsmall = vsmall + vsmall;
	        tmpa = 1 + 0.1 * vsmall;
	        tmpb = 1 + 0.2 * vsmall;
	    } while (tmpa <= 1 || tmpb <= 1);

	    for (i = 1; i <= n; i = i + 1) {
	        work[i] = dvec[i];
	    }
	    for (i = n + 1; i <= l; i = i + 1) {
	        work[i] = 0;
	    }
	    for (i = 1; i <= q; i = i + 1) {
	        iact[i] = 0;
	    }

	    info = [];

	    if (ierr[1] === 0) {
	        dpofa(dmat, fddmat, n, info);
	        if (info[1] !== 0) {
	            ierr[1] = 2;
	            return;
	        }
	        dposl(dmat, fddmat, n, dvec);
	        dpori(dmat, fddmat, n);
	    } else {
	        for (j = 1; j <= n; j = j + 1) {
	            sol[j] = 0;
	            for (i = 1; i <= j; i = i + 1) {
	                sol[j] = sol[j] + dmat[i][j] * dvec[i];
	            }
	        }
	        for (j = 1; j <= n; j = j + 1) {
	            dvec[j] = 0;
	            for (i = j; i <= n; i = i + 1) {
	                dvec[j] = dvec[j] + dmat[j][i] * sol[i];
	            }
	        }
	    }

	    crval[1] = 0;
	    for (j = 1; j <= n; j = j + 1) {
	        sol[j] = dvec[j];
	        crval[1] = crval[1] + work[j] * sol[j];
	        work[j] = 0;
	        for (i = j + 1; i <= n; i = i + 1) {
	            dmat[i][j] = 0;
	        }
	    }
	    crval[1] = -crval[1] / 2;
	    ierr[1] = 0;

	    iwzv = n;
	    iwrv = iwzv + n;
	    iwuv = iwrv + r;
	    iwrm = iwuv + r + 1;
	    iwsv = iwrm + (r * (r + 1)) / 2;
	    iwnbv = iwsv + q;

	    for (i = 1; i <= q; i = i + 1) {
	        sum = 0;
	        for (j = 1; j <= n; j = j + 1) {
	            sum = sum + amat[j][i] * amat[j][i];
	        }
	        work[iwnbv + i] = Math.sqrt(sum);
	    }
	    nact = 0;
	    iter[1] = 0;
	    iter[2] = 0;

	    function fn_goto_50() {
	        iter[1] = iter[1] + 1;

	        l = iwsv;
	        for (i = 1; i <= q; i = i + 1) {
	            l = l + 1;
	            sum = -bvec[i];
	            for (j = 1; j <= n; j = j + 1) {
	                sum = sum + amat[j][i] * sol[j];
	            }
	            if (Math.abs(sum) < vsmall) {
	                sum = 0;
	            }
	            if (i > meq) {
	                work[l] = sum;
	            } else {
	                work[l] = -Math.abs(sum);
	                if (sum > 0) {
	                    for (j = 1; j <= n; j = j + 1) {
	                        amat[j][i] = -amat[j][i];
	                    }
	                    bvec[i] = -bvec[i];
	                }
	            }
	        }

	        for (i = 1; i <= nact; i = i + 1) {
	            work[iwsv + iact[i]] = 0;
	        }

	        nvl = 0;
	        temp = 0;
	        for (i = 1; i <= q; i = i + 1) {
	            if (work[iwsv + i] < temp * work[iwnbv + i]) {
	                nvl = i;
	                temp = work[iwsv + i] / work[iwnbv + i];
	            }
	        }
	        if (nvl === 0) {
	            return 999;
	        }

	        return 0;
	    }

	    function fn_goto_55() {
	        for (i = 1; i <= n; i = i + 1) {
	            sum = 0;
	            for (j = 1; j <= n; j = j + 1) {
	                sum = sum + dmat[j][i] * amat[j][nvl];
	            }
	            work[i] = sum;
	        }

	        l1 = iwzv;
	        for (i = 1; i <= n; i = i + 1) {
	            work[l1 + i] = 0;
	        }
	        for (j = nact + 1; j <= n; j = j + 1) {
	            for (i = 1; i <= n; i = i + 1) {
	                work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
	            }
	        }

	        t1inf = true;
	        for (i = nact; i >= 1; i = i - 1) {
	            sum = work[i];
	            l = iwrm + (i * (i + 3)) / 2;
	            l1 = l - i;
	            for (j = i + 1; j <= nact; j = j + 1) {
	                sum = sum - work[l] * work[iwrv + j];
	                l = l + j;
	            }
	            sum = sum / work[l1];
	            work[iwrv + i] = sum;
	            if (iact[i] < meq) {
	                // continue;
	                break;
	            }
	            if (sum < 0) {
	                // continue;
	                break;
	            }
	            t1inf = false;
	            it1 = i;
	        }

	        if (!t1inf) {
	            t1 = work[iwuv + it1] / work[iwrv + it1];
	            for (i = 1; i <= nact; i = i + 1) {
	                if (iact[i] < meq) {
	                    // continue;
	                    break;
	                }
	                if (work[iwrv + i] < 0) {
	                    // continue;
	                    break;
	                }
	                temp = work[iwuv + i] / work[iwrv + i];
	                if (temp < t1) {
	                    t1 = temp;
	                    it1 = i;
	                }
	            }
	        }

	        sum = 0;
	        for (i = iwzv + 1; i <= iwzv + n; i = i + 1) {
	            sum = sum + work[i] * work[i];
	        }
	        if (Math.abs(sum) <= vsmall) {
	            if (t1inf) {
	                ierr[1] = 1;
	                // GOTO 999
	                return 999;
	            } else {
	                for (i = 1; i <= nact; i = i + 1) {
	                    work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
	                }
	                work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
	                // GOTO 700
	                return 700;
	            }
	        } else {
	            sum = 0;
	            for (i = 1; i <= n; i = i + 1) {
	                sum = sum + work[iwzv + i] * amat[i][nvl];
	            }
	            tt = -work[iwsv + nvl] / sum;
	            t2min = true;
	            if (!t1inf) {
	                if (t1 < tt) {
	                    tt = t1;
	                    t2min = false;
	                }
	            }

	            for (i = 1; i <= n; i = i + 1) {
	                sol[i] = sol[i] + tt * work[iwzv + i];
	                if (Math.abs(sol[i]) < vsmall) {
	                    sol[i] = 0;
	                }
	            }

	            crval[1] = crval[1] + tt * sum * (tt / 2 + work[iwuv + nact + 1]);
	            for (i = 1; i <= nact; i = i + 1) {
	                work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
	            }
	            work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;

	            if (t2min) {
	                nact = nact + 1;
	                iact[nact] = nvl;

	                l = iwrm + ((nact - 1) * nact) / 2 + 1;
	                for (i = 1; i <= nact - 1; i = i + 1) {
	                    work[l] = work[i];
	                    l = l + 1;
	                }

	                if (nact === n) {
	                    work[l] = work[n];
	                } else {
	                    for (i = n; i >= nact + 1; i = i - 1) {
	                        if (work[i] === 0) {
	                            // continue;
	                            break;
	                        }
	                        gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
	                        gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
	                        if (work[i - 1] >= 0) {
	                            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	                        } else {
	                            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	                        }
	                        gc = work[i - 1] / temp;
	                        gs = work[i] / temp;

	                        if (gc === 1) {
	                            // continue;
	                            break;
	                        }
	                        if (gc === 0) {
	                            work[i - 1] = gs * temp;
	                            for (j = 1; j <= n; j = j + 1) {
	                                temp = dmat[j][i - 1];
	                                dmat[j][i - 1] = dmat[j][i];
	                                dmat[j][i] = temp;
	                            }
	                        } else {
	                            work[i - 1] = temp;
	                            nu = gs / (1 + gc);
	                            for (j = 1; j <= n; j = j + 1) {
	                                temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
	                                dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
	                                dmat[j][i - 1] = temp;

	                            }
	                        }
	                    }
	                    work[l] = work[nact];
	                }
	            } else {
	                sum = -bvec[nvl];
	                for (j = 1; j <= n; j = j + 1) {
	                    sum = sum + sol[j] * amat[j][nvl];
	                }
	                if (nvl > meq) {
	                    work[iwsv + nvl] = sum;
	                } else {
	                    work[iwsv + nvl] = -Math.abs(sum);
	                    if (sum > 0) {
	                        for (j = 1; j <= n; j = j + 1) {
	                            amat[j][nvl] = -amat[j][nvl];
	                        }
	                        bvec[nvl] = -bvec[nvl];
	                    }
	                }
	                // GOTO 700
	                return 700;
	            }
	        }

	        return 0;
	    }

	    function fn_goto_797() {
	        l = iwrm + (it1 * (it1 + 1)) / 2 + 1;
	        l1 = l + it1;
	        if (work[l1] === 0) {
	            // GOTO 798
	            return 798;
	        }
	        gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
	        gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
	        if (work[l1 - 1] >= 0) {
	            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	        } else {
	            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	        }
	        gc = work[l1 - 1] / temp;
	        gs = work[l1] / temp;

	        if (gc === 1) {
	            // GOTO 798
	            return 798;
	        }
	        if (gc === 0) {
	            for (i = it1 + 1; i <= nact; i = i + 1) {
	                temp = work[l1 - 1];
	                work[l1 - 1] = work[l1];
	                work[l1] = temp;
	                l1 = l1 + i;
	            }
	            for (i = 1; i <= n; i = i + 1) {
	                temp = dmat[i][it1];
	                dmat[i][it1] = dmat[i][it1 + 1];
	                dmat[i][it1 + 1] = temp;
	            }
	        } else {
	            nu = gs / (1 + gc);
	            for (i = it1 + 1; i <= nact; i = i + 1) {
	                temp = gc * work[l1 - 1] + gs * work[l1];
	                work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
	                work[l1 - 1] = temp;
	                l1 = l1 + i;
	            }
	            for (i = 1; i <= n; i = i + 1) {
	                temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
	                dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
	                dmat[i][it1] = temp;
	            }
	        }

	        return 0;
	    }

	    function fn_goto_798() {
	        l1 = l - it1;
	        for (i = 1; i <= it1; i = i + 1) {
	            work[l1] = work[l];
	            l = l + 1;
	            l1 = l1 + 1;
	        }

	        work[iwuv + it1] = work[iwuv + it1 + 1];
	        iact[it1] = iact[it1 + 1];
	        it1 = it1 + 1;
	        if (it1 < nact) {
	            // GOTO 797
	            return 797;
	        }

	        return 0;
	    }

	    function fn_goto_799() {
	        work[iwuv + nact] = work[iwuv + nact + 1];
	        work[iwuv + nact + 1] = 0;
	        iact[nact] = 0;
	        nact = nact - 1;
	        iter[2] = iter[2] + 1;

	        return 0;
	    }

	    go = 0;
	    while (true) {
	        go = fn_goto_50();
	        if (go === 999) {
	            return;
	        }
	        while (true) {
	            go = fn_goto_55();
	            if (go === 0) {
	                break;
	            }
	            if (go === 999) {
	                return;
	            }
	            if (go === 700) {
	                if (it1 === nact) {
	                    fn_goto_799();
	                } else {
	                    while (true) {
	                        fn_goto_797();
	                        go = fn_goto_798();
	                        if (go !== 797) {
	                            break;
	                        }
	                    }
	                    fn_goto_799();
	                }
	            }
	        }
	    }

	}

	function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
	    Dmat = base0to1(Dmat);
	    dvec = base0to1(dvec);
	    Amat = base0to1(Amat);
	    var i, n, q,
	        nact, r,
	        crval = [], iact = [], sol = [], work = [], iter = [],
	        message;

	    meq = meq || 0;
	    factorized = factorized ? base0to1(factorized) : [undefined, 0];
	    bvec = bvec ? base0to1(bvec) : [];

	    // In Fortran the array index starts from 1
	    n = Dmat.length - 1;
	    q = Amat[1].length - 1;

	    if (!bvec) {
	        for (i = 1; i <= q; i = i + 1) {
	            bvec[i] = 0;
	        }
	    }
	    for (i = 1; i <= q; i = i + 1) {
	        iact[i] = 0;
	    }
	    nact = 0;
	    r = Math.min(n, q);
	    for (i = 1; i <= n; i = i + 1) {
	        sol[i] = 0;
	    }
	    crval[1] = 0;
	    for (i = 1; i <= (2 * n + (r * (r + 5)) / 2 + 2 * q + 1); i = i + 1) {
	        work[i] = 0;
	    }
	    for (i = 1; i <= 2; i = i + 1) {
	        iter[i] = 0;
	    }

	    qpgen2(Dmat, dvec, n, n, sol, crval, Amat,
	        bvec, n, q, meq, iact, nact, iter, work, factorized);

	    message = "";
	    if (factorized[1] === 1) {
	        message = "constraints are inconsistent, no solution!";
	    }
	    if (factorized[1] === 2) {
	        message = "matrix D in quadratic function is not positive definite!";
	    }

	    return {
	        solution: base1to0(sol),
	        value: base1to0(crval),
	        unconstrained_solution: base1to0(dvec),
	        iterations: base1to0(iter),
	        iact: base1to0(iact),
	        message: message
	    };
	}
	exports.solveQP = solveQP;
	}(numeric));
	/*
	Shanti Rao sent me this routine by private email. I had to modify it
	slightly to work on Arrays instead of using a Matrix object.
	It is apparently translated from http://stitchpanorama.sourceforge.net/Python/svd.py
	*/

	numeric.svd= function svd(A) {
	    var temp;
	//Compute the thin SVD from G. H. Golub and C. Reinsch, Numer. Math. 14, 403-420 (1970)
		var prec= numeric.epsilon; //Math.pow(2,-52) // assumes double prec
		var tolerance= 1.e-64/prec;
		var itmax= 50;
		var c=0;
		var i=0;
		var j=0;
		var k=0;
		var l=0;
		
		var u= numeric.clone(A);
		var m= u.length;
		
		var n= u[0].length;
		
		if (m < n) throw "Need more rows than columns"
		
		var e = new Array(n);
		var q = new Array(n);
		for (i=0; i<n; i++) e[i] = q[i] = 0.0;
		var v = numeric.rep([n,n],0);
	//	v.zero();
		
	 	function pythag(a,b)
	 	{
			a = Math.abs(a)
			b = Math.abs(b)
			if (a > b)
				return a*Math.sqrt(1.0+(b*b/a/a))
			else if (b == 0.0) 
				return a
			return b*Math.sqrt(1.0+(a*a/b/b))
		}

		//Householder's reduction to bidiagonal form

		var f= 0.0;
		var g= 0.0;
		var h= 0.0;
		var x= 0.0;
		var y= 0.0;
		var z= 0.0;
		var s= 0.0;
		
		for (i=0; i < n; i++)
		{	
			e[i]= g;
			s= 0.0;
			l= i+1;
			for (j=i; j < m; j++) 
				s += (u[j][i]*u[j][i]);
			if (s <= tolerance)
				g= 0.0;
			else
			{	
				f= u[i][i];
				g= Math.sqrt(s);
				if (f >= 0.0) g= -g;
				h= f*g-s
				u[i][i]=f-g;
				for (j=l; j < n; j++)
				{
					s= 0.0
					for (k=i; k < m; k++) 
						s += u[k][i]*u[k][j]
					f= s/h
					for (k=i; k < m; k++) 
						u[k][j]+=f*u[k][i]
				}
			}
			q[i]= g
			s= 0.0
			for (j=l; j < n; j++) 
				s= s + u[i][j]*u[i][j]
			if (s <= tolerance)
				g= 0.0
			else
			{	
				f= u[i][i+1]
				g= Math.sqrt(s)
				if (f >= 0.0) g= -g
				h= f*g - s
				u[i][i+1] = f-g;
				for (j=l; j < n; j++) e[j]= u[i][j]/h
				for (j=l; j < m; j++)
				{	
					s=0.0
					for (k=l; k < n; k++) 
						s += (u[j][k]*u[i][k])
					for (k=l; k < n; k++) 
						u[j][k]+=s*e[k]
				}	
			}
			y= Math.abs(q[i])+Math.abs(e[i])
			if (y>x) 
				x=y
		}
		
		// accumulation of right hand gtransformations
		for (i=n-1; i != -1; i+= -1)
		{	
			if (g != 0.0)
			{
			 	h= g*u[i][i+1]
				for (j=l; j < n; j++) 
					v[j][i]=u[i][j]/h
				for (j=l; j < n; j++)
				{	
					s=0.0
					for (k=l; k < n; k++) 
						s += u[i][k]*v[k][j]
					for (k=l; k < n; k++) 
						v[k][j]+=(s*v[k][i])
				}	
			}
			for (j=l; j < n; j++)
			{
				v[i][j] = 0;
				v[j][i] = 0;
			}
			v[i][i] = 1;
			g= e[i]
			l= i
		}
		
		// accumulation of left hand transformations
		for (i=n-1; i != -1; i+= -1)
		{	
			l= i+1
			g= q[i]
			for (j=l; j < n; j++) 
				u[i][j] = 0;
			if (g != 0.0)
			{
				h= u[i][i]*g
				for (j=l; j < n; j++)
				{
					s=0.0
					for (k=l; k < m; k++) s += u[k][i]*u[k][j];
					f= s/h
					for (k=i; k < m; k++) u[k][j]+=f*u[k][i];
				}
				for (j=i; j < m; j++) u[j][i] = u[j][i]/g;
			}
			else
				for (j=i; j < m; j++) u[j][i] = 0;
			u[i][i] += 1;
		}
		
		// diagonalization of the bidiagonal form
		prec= prec*x
		for (k=n-1; k != -1; k+= -1)
		{
			for (var iteration=0; iteration < itmax; iteration++)
			{	// test f splitting
				var test_convergence = false
				for (l=k; l != -1; l+= -1)
				{	
					if (Math.abs(e[l]) <= prec)
					{	test_convergence= true
						break 
					}
					if (Math.abs(q[l-1]) <= prec)
						break 
				}
				if (!test_convergence)
				{	// cancellation of e[l] if l>0
					c= 0.0
					s= 1.0
					var l1= l-1
					for (i =l; i<k+1; i++)
					{	
						f= s*e[i]
						e[i]= c*e[i]
						if (Math.abs(f) <= prec)
							break
						g= q[i]
						h= pythag(f,g)
						q[i]= h
						c= g/h
						s= -f/h
						for (j=0; j < m; j++)
						{	
							y= u[j][l1]
							z= u[j][i]
							u[j][l1] =  y*c+(z*s)
							u[j][i] = -y*s+(z*c)
						} 
					}	
				}
				// test f convergence
				z= q[k]
				if (l== k)
				{	//convergence
					if (z<0.0)
					{	//q[k] is made non-negative
						q[k]= -z
						for (j=0; j < n; j++)
							v[j][k] = -v[j][k]
					}
					break  //break out of iteration loop and move on to next k value
				}
				if (iteration >= itmax-1)
					throw 'Error: no convergence.'
				// shift from bottom 2x2 minor
				x= q[l]
				y= q[k-1]
				g= e[k-1]
				h= e[k]
				f= ((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y)
				g= pythag(f,1.0)
				if (f < 0.0)
					f= ((x-z)*(x+z)+h*(y/(f-g)-h))/x
				else
					f= ((x-z)*(x+z)+h*(y/(f+g)-h))/x
				// next QR transformation
				c= 1.0
				s= 1.0
				for (i=l+1; i< k+1; i++)
				{	
					g= e[i]
					y= q[i]
					h= s*g
					g= c*g
					z= pythag(f,h)
					e[i-1]= z
					c= f/z
					s= h/z
					f= x*c+g*s
					g= -x*s+g*c
					h= y*s
					y= y*c
					for (j=0; j < n; j++)
					{	
						x= v[j][i-1]
						z= v[j][i]
						v[j][i-1] = x*c+z*s
						v[j][i] = -x*s+z*c
					}
					z= pythag(f,h)
					q[i-1]= z
					c= f/z
					s= h/z
					f= c*g+s*y
					x= -s*g+c*y
					for (j=0; j < m; j++)
					{
						y= u[j][i-1]
						z= u[j][i]
						u[j][i-1] = y*c+z*s
						u[j][i] = -y*s+z*c
					}
				}
				e[l]= 0.0
				e[k]= f
				q[k]= x
			} 
		}
			
		//vt= transpose(v)
		//return (u,q,vt)
		for (i=0;i<q.length; i++) 
		  if (q[i] < prec) q[i] = 0
		  
		//sort eigenvalues	
		for (i=0; i< n; i++)
		{	 
		//writeln(q)
		 for (j=i-1; j >= 0; j--)
		 {
		  if (q[j] < q[i])
		  {
		//  writeln(i,'-',j)
		   c = q[j]
		   q[j] = q[i]
		   q[i] = c
		   for(k=0;k<u.length;k++) { temp = u[k][i]; u[k][i] = u[k][j]; u[k][j] = temp; }
		   for(k=0;k<v.length;k++) { temp = v[k][i]; v[k][i] = v[k][j]; v[k][j] = temp; }
	//	   u.swapCols(i,j)
	//	   v.swapCols(i,j)
		   i = j	   
		  }
		 }	
		}
		
		return {U:u,S:q,V:v}
	};


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(87);


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Matrix = __webpack_require__(88);
	var Stat = __webpack_require__(5);
	var SVD = Matrix.DC.SVD;

	module.exports = PCA;

	/**
	* Creates new PCA (Principal Component Analysis) from the dataset
	* @param {Matrix} dataset
	* @param {boolean} reload - for load purposes
	* @param {Object} model - for load purposes
	* @constructor
	* */
	function PCA(dataset, reload, model) {

	    if (reload) {
	        this.U = model.U;
	        this.S = model.S;
	        this.means = model.means;
	        this.std = model.std;
	    } else {
	        if (!Matrix.isMatrix(dataset)) {
	            dataset = new Matrix(dataset, true);
	        } else {
	            dataset = dataset.clone();
	        }

	        var normalization = featureNormalize(dataset);
	        var normalizedDataset = normalization.result;

	        var covarianceMatrix = normalizedDataset.transpose().mmul(normalizedDataset).divS(dataset.rows);

	        var target = new SVD(covarianceMatrix, {
	            computeLeftSingularVectors: true,
	            computeRightSingularVectors: true,
	            autoTranspose: false
	        });

	        this.U = target.leftSingularVectors;
	        this.S = target.diagonal;
	        this.means = normalization.means;
	        this.std = normalization.std;
	    }
	}

	/**
	* Load a PCA model from JSON
	* @oaram {Object} model
	* @return {PCA}
	* */
	PCA.load = function (model) {
	    if(model.modelName !== 'PCA')
	        throw new RangeError("The current model is invalid!");

	    return new PCA(null, true, model);
	};

	/**
	* Exports the current model to an Object
	* @return {Object} model
	* */
	PCA.prototype.export = function () {
	    return {
	        modelName: "PCA",
	        U: this.U,
	        S: this.S,
	        means: this.means,
	        std: this.std
	    };
	};

	/**
	* Function that project the dataset into new space of k dimensions,
	* this method doesn't modify your dataset.
	* @param {Matrix} dataset.
	* @param {Number} k - dimensions to project.
	* @return {Matrix} dataset projected in k dimensions.
	* @throws {RangeError} if k is larger than the number of eigenvector
	*                      of the model.
	* */
	PCA.prototype.project = function (dataset, k) {
	    var dimensions = k - 1;
	    if(k > this.U.columns)
	        throw new RangeError("the number of dimensions must not be larger than " + this.U.columns);

	    var X = featureNormalize(Matrix(dataset).clone()).result;
	    return X.mmul(this.U.subMatrix(0, this.U.rows - 1, 0, dimensions));
	};

	/**
	* This method returns the percentage variance of each eigenvector.
	* @return {Number} percentage variance of each eigenvector.
	* */
	PCA.prototype.getExplainedVariance = function () {
	    var sum = this.S.reduce(function (previous, value) {
	        return previous + value;
	    });
	    return this.S.map(function (value) {
	        return value / sum;
	    });
	};

	/**
	 * Function that returns the Eigenvectors of the covariance matrix.
	 * @returns {Matrix}
	 */
	PCA.prototype.getEigenvectors = function () {
	    return this.U;
	};

	/**
	 * Function that returns the Eigenvalues (on the diagonal).
	 * @returns {*}
	 */
	PCA.prototype.getEigenvalues = function () {
	    return this.S;
	};

	/**
	* This method returns a dataset normalized in the following form:
	* X = (X - mean) / std
	* @param dataset.
	* @return A dataset normalized.
	* */
	function featureNormalize(dataset) {
	    var means = Stat.matrix.mean(dataset);
	    var std = Matrix.rowVector(Stat.matrix.standardDeviation(dataset, means, true));
	    means = Matrix.rowVector(means);

	    var result = dataset.subRowVector(means);
	    return {
	        result: result.divRowVector(std),
	        means: means,
	        std: std
	    }
	}


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(89);
	module.exports.Decompositions = module.exports.DC = __webpack_require__(90);


/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';

	var Asplice = Array.prototype.splice,
	    Aconcat = Array.prototype.concat;

	// For performance : http://jsperf.com/clone-array-slice-vs-while-vs-for
	function slice(arr) {
	    var i = 0,
	        ii = arr.length,
	        result = new Array(ii);
	    for (; i < ii; i++) {
	        result[i] = arr[i];
	    }
	    return result;
	}

	/**
	 * Real matrix.
	 * @constructor
	 * @param {number|Array} nRows - Number of rows of the new matrix or a 2D array containing the data.
	 * @param {number|boolean} [nColumns] - Number of columns of the new matrix or a boolean specifying if the input array should be cloned
	 */
	function Matrix(nRows, nColumns) {
	    var i = 0, rows, columns, matrix, newInstance;
	    if (Array.isArray(nRows)) {
	        newInstance = nColumns;
	        matrix = newInstance ? slice(nRows) : nRows;
	        nRows = matrix.length;
	        nColumns = matrix[0].length;
	        if (typeof nColumns === 'undefined') {
	            throw new TypeError('Data must be a 2D array');
	        }
	        if (nRows > 0 && nColumns > 0) {
	            for (; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                } else if (newInstance) {
	                    matrix[i] = slice(matrix[i]);
	                }
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else if (typeof nRows === 'number') { // Create empty matrix
	        if (nRows > 0 && nColumns > 0) {
	            matrix = new Array(nRows);
	            for (; i < nRows; i++) {
	                matrix[i] = new Array(nColumns);
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else {
	        throw new TypeError('Invalid arguments');
	    }

	    Object.defineProperty(matrix, 'rows', {writable: true, value: nRows});
	    Object.defineProperty(matrix, 'columns', {writable: true, value: nColumns});

	    matrix.__proto__ = Matrix.prototype;

	    return matrix;
	}

	/**
	 * Constructs a Matrix with the chosen dimensions from a 1D array.
	 * @param {number} newRows - Number of rows
	 * @param {number} newColumns - Number of columns
	 * @param {Array} newData - A 1D array containing data for the matrix
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.from1DArray = function from1DArray(newRows, newColumns, newData) {
	    var length, data, i = 0;

	    length = newRows * newColumns;
	    if (length !== newData.length)
	        throw new RangeError('Data length does not match given dimensions');

	    data = new Array(newRows);
	    for (; i < newRows; i++) {
	        data[i] = newData.slice(i * newColumns, (i + 1) * newColumns);
	    }
	    return new Matrix(data);
	};

	/**
	 * Creates a row vector, a matrix with only one row.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.rowVector = function rowVector(newData) {
	    return new Matrix([newData]);
	};

	/**
	 * Creates a column vector, a matrix with only one column.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.columnVector = function columnVector(newData) {
	    var l = newData.length, vector = new Array(l);
	    for (var i = 0; i < l; i++)
	        vector[i] = [newData[i]];
	    return new Matrix(vector);
	};

	/**
	 * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.empty = function empty(rows, columns) {
	    return new Matrix(rows, columns);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to zero.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.zeros = function zeros(rows, columns) {
	    return Matrix.empty(rows, columns).fill(0);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to one.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.ones = function ones(rows, columns) {
	    return Matrix.empty(rows, columns).fill(1);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be randomly set using Math.random().
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} The new matrix
	 */
	Matrix.rand = function rand(rows, columns) {
	    var matrix = Matrix.empty(rows, columns);
	    for (var i = 0, ii = matrix.rows; i < ii; i++) {
	        for (var j = 0, jj = matrix.columns; j < jj; j++) {
	            matrix[i][j] = Math.random();
	        }
	    }
	    return matrix;
	};

	/**
	 * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and other will be 0.
	 * @param {number} n - Number of rows and columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.eye = function eye(n) {
	    var matrix = Matrix.zeros(n, n), l = matrix.rows;
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = 1;
	    }
	    return matrix;
	};

	/**
	 * Creates a diagonal matrix based on the given array.
	 * @param {Array} data - Array containing the data for the diagonal
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.diag = function diag(data) {
	    var l = data.length, matrix = Matrix.zeros(l, l);
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = data[i];
	    }
	    return matrix;
	};

	/**
	 * Creates an array of indices between two values
	 * @param {number} from
	 * @param {number} to
	 * @returns {Array}
	 */
	Matrix.indices = function indices(from, to) {
	    var vector = new Array(to - from);
	    for (var i = 0; i < vector.length; i++)
	        vector[i] = from++;
	    return vector;
	};

	// TODO DOC
	Matrix.stack = function stack(arg1) {
	    var i, j, k;
	    if (Matrix.isMatrix(arg1)) {
	        var rows = 0,
	            cols = 0;
	        for (i = 0; i < arguments.length; i++) {
	            rows += arguments[i].rows;
	            if (arguments[i].columns > cols)
	                cols = arguments[i].columns;
	        }

	        var r = Matrix.zeros(rows, cols);
	        var c = 0;
	        for (i = 0; i < arguments.length; i++) {
	            var current = arguments[i];
	            for (j = 0; j < current.rows; j++) {
	                for (k = 0; k < current.columns; k++)
	                    r[c][k] = current[j][k];
	                c++;
	            }
	        }
	        return r;
	    }
	    else if (Array.isArray(arg1)) {
	        var matrix = Matrix.empty(arguments.length, arg1.length);
	        for (i = 0; i < arguments.length; i++)
	            matrix.setRow(i, arguments[i]);
	        return matrix;
	    }
	};

	// TODO DOC
	Matrix.expand = function expand(base, count) {
	    var expansion = [];
	    for (var i = 0; i < count.length; i++)
	        for (var j = 0; j < count[i]; j++)
	            expansion.push(base[i]);
	    return new Matrix(expansion);
	};

	/**
	 * Check that the provided value is a Matrix and tries to instantiate one if not
	 * @param value - The value to check
	 * @returns {Matrix}
	 * @throws {TypeError}
	 */
	Matrix.checkMatrix = function checkMatrix(value) {
	    if (!value) {
	        throw new TypeError('Argument has to be a matrix');
	    }
	    if (value.klass !== 'Matrix') {
	        value = new Matrix(value);
	    }
	    return value;
	};

	/**
	 * Returns true if the argument is a Matrix, false otherwise
	 * @param value - The value to check
	 * @returns {boolean}
	 */
	Matrix.isMatrix = function isMatrix(value) {
	    return value ? value.klass === 'Matrix' : false;
	};

	/**
	 * @property {string} - The name of this class.
	 */
	Object.defineProperty(Matrix.prototype, 'klass', {
	    get: function klass() {
	        return 'Matrix';
	    }
	});

	/**
	 * @property {number} - The number of elements in the matrix.
	 */
	Object.defineProperty(Matrix.prototype, 'size', {
	    get: function size() {
	        return this.rows * this.columns;
	    }
	});

	/**
	 * @private
	 * Internal check that a row index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkRowIndex = function checkRowIndex(index) {
	    if (index < 0 || index > this.rows - 1)
	        throw new RangeError('Row index out of range.');
	};

	/**
	 * @private
	 * Internal check that a column index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkColumnIndex = function checkColumnIndex(index) {
	    if (index < 0 || index > this.columns - 1)
	        throw new RangeError('Column index out of range.');
	};

	/**
	 * @private
	 * Internal check that two matrices have the same dimensions
	 * @param {Matrix} otherMatrix
	 */
	Matrix.prototype.checkDimensions = function checkDimensions(otherMatrix) {
	    if ((this.rows !== otherMatrix.rows) || (this.columns !== otherMatrix.columns))
	        throw new RangeError('Matrices dimensions must be equal.');
	};

	/**
	 * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	 * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.apply = function apply(callback) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            callback.call(this, i, j);
	        }
	    }
	    return this;
	};

	/**
	 * Creates an exact and independent copy of the matrix
	 * @returns {Matrix}
	 */
	Matrix.prototype.clone = function clone() {
	    return new Matrix(this.to2DArray());
	};

	/**
	 * Returns a new 1D array filled row by row with the matrix values
	 * @returns {Array}
	 */
	Matrix.prototype.to1DArray = function to1DArray() {
	    return Aconcat.apply([], this);
	};

	/**
	 * Returns a 2D array containing a copy of the data
	 * @returns {Array}
	 */
	Matrix.prototype.to2DArray = function to2DArray() {
	    var l = this.rows, copy = new Array(l);
	    for (var i = 0; i < l; i++) {
	        copy[i] = slice(this[i]);
	    }
	    return copy;
	};

	/**
	 * @returns {boolean} true if the matrix has one row
	 */
	Matrix.prototype.isRowVector = function isRowVector() {
	    return this.rows === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one column
	 */
	Matrix.prototype.isColumnVector = function isColumnVector() {
	    return this.columns === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one row or one column
	 */
	Matrix.prototype.isVector = function isVector() {
	    return (this.rows === 1) || (this.columns === 1);
	};

	/**
	 * @returns {boolean} true if the matrix has the same number of rows and columns
	 */
	Matrix.prototype.isSquare = function isSquare() {
	    return this.rows === this.columns;
	};

	/**
	 * @returns {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	 */
	Matrix.prototype.isSymmetric = function isSymmetric() {
	    if (this.isSquare()) {
	        var l = this.rows;
	        for (var i = 0; i < l; i++) {
	            for (var j = 0; j <= i; j++) {
	                if (this[i][j] !== this[j][i]) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    }
	    return false;
	};

	/**
	 * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @param {number} value - The new value for the element
	 * @returns {Matrix} this
	 */
	Matrix.prototype.set = function set(rowIndex, columnIndex, value) {
	    this[rowIndex][columnIndex] = value;
	    return this;
	};

	/**
	 * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @returns {number}
	 */
	Matrix.prototype.get = function get(rowIndex, columnIndex) {
	    return this[rowIndex][columnIndex];
	};

	/**
	 * Fills the matrix with a given value. All elements will be set to this value.
	 * @param {number} value - New value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.fill = function fill(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = value;
	        }
	    }
	    return this;
	};

	/**
	 * Negates the matrix. All elements will be multiplied by (-1)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.neg = function neg() {
	    return this.mulS(-1);
	};

	/**
	 * Adds a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.add = function add(value) {
	    if (typeof value === 'number')
	        return this.addS(value);
	    value = Matrix.checkMatrix(value);
	        return this.addM(value);
	};

	/**
	 * Adds a scalar to each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addS = function addS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += value;
	        }
	    }
	    return this;
	};

	/**
	 * Adds the value of each element of matrix to the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addM = function addM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sub = function sub(value) {
	    if (typeof value === 'number')
	        return this.subS(value);
	    value = Matrix.checkMatrix(value);
	        return this.subM(value);
	};

	/**
	 * Subtracts a scalar from each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subS = function subS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= value;
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the value of each element of matrix from the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subM = function subM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mul = function mul(value) {
	    if (typeof value === 'number')
	        return this.mulS(value);
	    value = Matrix.checkMatrix(value);
	        return this.mulM(value);
	};

	/**
	 * Multiplies a scalar with each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulS = function mulS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= value;
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the value of each element of matrix with the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulM = function mulM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides by a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.div = function div(value) {
	    if (typeof value === 'number')
	        return this.divS(value);
	    value = Matrix.checkMatrix(value);
	        return this.divM(value);
	};

	/**
	 * Divides each element of the matrix by a scalar
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divS = function divS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= value;
	        }
	    }
	    return this;
	};

	/**
	 * Divides each element of this by the corresponding element of matrix
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divM = function divM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Returns a new array from the given row index
	 * @param {number} index - Row index
	 * @returns {Array}
	 */
	Matrix.prototype.getRow = function getRow(index) {
	    this.checkRowIndex(index);
	    return slice(this[index]);
	};

	/**
	 * Returns a new row vector from the given row index
	 * @param {number} index - Row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getRowVector = function getRowVector(index) {
	    return Matrix.rowVector(this.getRow(index));
	};

	/**
	 * Sets a row at the given index
	 * @param {number} index - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setRow = function setRow(index, array) {
	    this.checkRowIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    this[index] = slice(array);
	    return this;
	};

	/**
	 * Removes a row from the given index
	 * @param {number} index - Row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeRow = function removeRow(index) {
	    this.checkRowIndex(index);
	    if (this.rows === 1)
	        throw new RangeError('A matrix cannot have less than one row');
	    Asplice.call(this, index, 1);
	    this.rows -= 1;
	    return this;
	};

	/**
	 * Adds a row at the given index
	 * @param {number} [index = this.rows] - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRow = function addRow(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.rows;
	    }
	    if (index < 0 || index > this.rows)
	        throw new RangeError('Row index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    Asplice.call(this, index, 0, slice(array));
	    this.rows += 1;
	    return this;
	};

	/**
	 * Swaps two rows
	 * @param {number} row1 - First row index
	 * @param {number} row2 - Second row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapRows = function swapRows(row1, row2) {
	    this.checkRowIndex(row1);
	    this.checkRowIndex(row2);
	    var temp = this[row1];
	    this[row1] = this[row2];
	    this[row2] = temp;
	    return this;
	};

	/**
	 * Returns a new array from the given column index
	 * @param {number} index - Column index
	 * @returns {Array}
	 */
	Matrix.prototype.getColumn = function getColumn(index) {
	    this.checkColumnIndex(index);
	    var l = this.rows, column = new Array(l);
	    for (var i = 0; i < l; i++) {
	        column[i] = this[i][index];
	    }
	    return column;
	};

	/**
	 * Returns a new column vector from the given column index
	 * @param {number} index - Column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getColumnVector = function getColumnVector(index) {
	    return Matrix.columnVector(this.getColumn(index));
	};

	/**
	 * Sets a column at the given index
	 * @param {number} index - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setColumn = function setColumn(index, array) {
	    this.checkColumnIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i][index] = array[i];
	    }
	    return this;
	};

	/**
	 * Removes a column from the given index
	 * @param {number} index - Column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeColumn = function removeColumn(index) {
	    this.checkColumnIndex(index);
	    if (this.columns === 1)
	        throw new RangeError('A matrix cannot have less than one column');
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].splice(index, 1);
	    }
	    this.columns -= 1;
	    return this;
	};

	/**
	 * Adds a column at the given index
	 * @param {number} [index = this.columns] - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumn = function addColumn(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.columns;
	    }
	    if (index < 0 || index > this.columns)
	        throw new RangeError('Column index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i].splice(index, 0, array[i]);
	    }
	    this.columns += 1;
	    return this;
	};

	/**
	 * Swaps two columns
	 * @param {number} column1 - First column index
	 * @param {number} column2 - Second column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapColumns = function swapColumns(column1, column2) {
	    this.checkRowIndex(column1);
	    this.checkRowIndex(column2);
	    var l = this.rows, temp, row;
	    for (var i = 0; i < l; i++) {
	        row = this[i];
	        temp = row[column1];
	        row[column1] = row[column2];
	        row[column2] = temp;
	    }
	    return this;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkRowVector = function checkRowVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.columns)
	        throw new RangeError('vector size must be the same as the number of columns');
	    return vector;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkColumnVector = function checkColumnVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.rows)
	        throw new RangeError('vector size must be the same as the number of rows');
	    return vector;
	};

	/**
	 * Adds the values of a vector to each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRowVector = function addRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subRowVector = function subRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRowVector = function mulRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each row by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divRowVector = function divRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Adds the values of a vector to each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumnVector = function addColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subColumnVector = function subColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumnVector = function mulColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each column by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divColumnVector = function divColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a row with a scalar
	 * @param {number} index - Row index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRow = function mulRow(index, value) {
	    this.checkRowIndex(index);
	    var i = 0, l = this.columns;
	    for (; i < l; i++) {
	        this[index][i] *= value;
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a column with a scalar
	 * @param {number} index - Column index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumn = function mulColumn(index, value) {
	    this.checkColumnIndex(index);
	    var i = 0, l = this.rows;
	    for (; i < l; i++) {
	        this[i][index] *= value;
	    }
	};

	/**
	 * A matrix index
	 * @typedef {Object} MatrixIndex
	 * @property {number} row
	 * @property {number} column
	 */

	/**
	 * Returns the maximum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.max = function max() {
	    var v = -Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxIndex = function maxIndex() {
	    var v = -Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.min = function min() {
	    var v = Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minIndex = function minIndex() {
	    var v = Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.maxRow = function maxRow(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxRowIndex = function maxRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    var idx = {
	            row: index
	        };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.minRow = function minRow(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minRowIndex = function minRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: index,
	        column: 0
	    };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.maxColumn = function maxColumn(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxColumnIndex = function maxColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.minColumn = function minColumn(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minColumnIndex = function minColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns an array containing the diagonal values of the matrix
	 * @returns {Array}
	 */
	Matrix.prototype.diag = function diag() {
	    if (!this.isSquare())
	        throw new TypeError('Only square matrices have a diagonal.');
	    var diag = new Array(this.rows);
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        diag[i] = this[i][i];
	    }
	    return diag;
	};

	/**
	 * Returns the sum of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.sum = function sum() {
	    var v = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            v += this[i][j];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the mean of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.mean = function mean() {
	    return this.sum() / this.size;
	};

	/**
	 * Returns the product of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.prod = function prod() {
	    var prod = 1;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            prod *= this[i][j];
	        }
	    }
	    return prod;
	};

	/**
	 * Computes the cumulative sum of the matrix elements (in place, row by row)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.cumulativeSum = function cumulativeSum() {
	    var sum = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            sum += this[i][j];
	            this[i][j] = sum;
	        }
	    }
	    return this;
	};

	/**
	 * Computes the dot (scalar) product between the matrix and another
	 * @param {Matrix} other vector
	 * @returns {number}
	 */
	Matrix.prototype.dot = function dot(other) {
	    if (this.size !== other.size)
	        throw new RangeError('vectors do not have the same size');
	    var vector1 = this.to1DArray();
	    var vector2 = other.to1DArray();
	    var dot = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        dot += vector1[i] * vector2[i];
	    }
	    return dot;
	};

	/**
	 * Returns the matrix product between this and other
	 * @returns {Matrix}
	 */
	Matrix.prototype.mmul = function mmul(other) {
	    if (!Matrix.isMatrix(other))
	        throw new TypeError('parameter "other" must be a matrix');
	    if (this.columns !== other.rows)
	        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

	    var m = this.rows, n = this.columns, p = other.columns;
	    var result = new Matrix(m, p);

	    var Bcolj = new Array(n);
	    var i, j, k;
	    for (j = 0; j < p; j++) {
	        for (k = 0; k < n; k++)
	            Bcolj[k] = other[k][j];

	        for (i = 0; i < m; i++) {
	            var Arowi = this[i];

	            var s = 0;
	            for (k = 0; k < n; k++)
	                s += Arowi[k] * Bcolj[k];

	            result[i][j] = s;
	        }
	    }
	    return result;
	};

	/**
	 * Sorts the rows (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortRows = function sortRows(compareFunction) {
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].sort(compareFunction);
	    }
	    return this;
	};

	/**
	 * Sorts the columns (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortColumns = function sortColumns(compareFunction) {
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        this.setColumn(i, this.getColumn(i).sort(compareFunction));
	    }
	    return this;
	};

	/**
	 * Transposes the matrix and returns a new one containing the result
	 * @returns {Matrix}
	 */
	Matrix.prototype.transpose = function transpose() {
	    var result = new Matrix(this.columns, this.rows);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[j][i] = this[i][j];
	        }
	    }
	    return result;
	};

	/**
	 * Returns a subset of the matrix
	 * @param {number} startRow - First row index
	 * @param {number} endRow - Last row index
	 * @param {number} startColumn - First column index
	 * @param {number} endColumn - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrix = function subMatrix(startRow, endRow, startColumn, endColumn) {
	    if ((startRow > endRow) || (startColumn > endColumn) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range');
	    var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
	    for (var i = startRow; i <= endRow; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            newMatrix[i - startRow][j - startColumn] = this[i][j];
	        }
	    }
	    return newMatrix;
	};

	/**
	 * Returns a subset of the matrix based on an array of row indices
	 * @param {Array} indices - Array containing the row indices
	 * @param {number} [startColumn = 0] - First column index
	 * @param {number} [endColumn = this.columns-1] - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixRow = function subMatrixRow(indices, startColumn, endColumn) {
	    if (typeof startColumn === 'undefined') {
	        startColumn = 0;
	        endColumn = this.columns - 1;
	    } else if (typeof endColumn === 'undefined') {
	        endColumn = this.columns - 1;
	    }
	    if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, rows = this.rows,
	        X = new Matrix(l, endColumn - startColumn + 1);
	    for (var i = 0; i < l; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            if ((indices[i] < 0) || (indices[i] >= rows))
	                throw new RangeError('Argument out of range.');
	            X[i][j - startColumn] = this[indices[i]][j];
	        }
	    }
	    return X;
	};

	/**
	 * Returns a subset of the matrix based on an array of column indices
	 * @param {Array} indices - Array containing the column indices
	 * @param {number} [startRow = 0] - First row index
	 * @param {number} [endRow = this.rows-1] - Last row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixColumn = function subMatrixColumn(indices, startRow, endRow) {
	    if (typeof startRow === 'undefined') {
	        startRow = 0;
	        endRow = this.rows - 1;
	    } else if (typeof endRow === 'undefined') {
	        endRow = this.rows - 1;
	    }
	    if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, columns = this.columns,
	        X = new Matrix(endRow - startRow + 1, l);
	    for (var i = 0; i < l; i++) {
	        for (var j = startRow; j <= endRow; j++) {
	            if ((indices[i] < 0) || (indices[i] >= columns))
	                throw new RangeError('Argument out of range.');
	            X[j - startRow][i] = this[j][indices[i]];
	        }
	    }
	    return X;
	};

	/**
	 * Returns the trace of the matrix (sum of the diagonal elements)
	 * @returns {number}
	 */
	Matrix.prototype.trace = function trace() {
	    if (!this.isSquare())
	        throw new TypeError('The matrix is not square');
	    var trace = 0, i = 0, l = this.rows;
	    for (; i < l; i++) {
	        trace += this[i][i];
	    }
	    return trace;
	};

	/**
	 * Sets each element of the matrix to its absolute value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.abs = function abs() {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = Math.abs(this[i][j]);
	        }
	    }
	};

	module.exports = Matrix;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(89);

	var SingularValueDecomposition = __webpack_require__(91);
	var EigenvalueDecomposition = __webpack_require__(93);
	var LuDecomposition = __webpack_require__(94);
	var QrDecomposition = __webpack_require__(95);
	var CholeskyDecomposition = __webpack_require__(96);

	function inverse(matrix) {
	    return solve(matrix, Matrix.eye(matrix.rows));
	}

	Matrix.prototype.inverse = function () {
	    return inverse(this);
	};

	function solve(leftHandSide, rightHandSide) {
	    return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
	}

	Matrix.prototype.solve = function (other) {
	    return solve(this, other);
	};

	module.exports = {
	    SingularValueDecomposition: SingularValueDecomposition,
	    SVD: SingularValueDecomposition,
	    EigenvalueDecomposition: EigenvalueDecomposition,
	    EVD: EigenvalueDecomposition,
	    LuDecomposition: LuDecomposition,
	    LU: LuDecomposition,
	    QrDecomposition: QrDecomposition,
	    QR: QrDecomposition,
	    CholeskyDecomposition: CholeskyDecomposition,
	    CHO: CholeskyDecomposition,
	    inverse: inverse,
	    solve: solve
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(89);
	var hypotenuse = __webpack_require__(92).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	function SingularValueDecomposition(value, options) {
	    if (!(this instanceof SingularValueDecomposition)) {
	        return new SingularValueDecomposition(value, options);
	    }
	    value = Matrix.checkMatrix(value);

	    options = options || {};

	    var a = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        nu = Math.min(m, n);

	    var wantu = true, wantv = true;
	    if (options.computeLeftSingularVectors === false)
	        wantu = false;
	    if (options.computeRightSingularVectors === false)
	        wantv = false;
	    var autoTranspose = options.autoTranspose === true;

	    var swapped = false;
	    if (m < n) {
	        if (!autoTranspose) {
	            console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	        } else {
	            a = a.transpose();
	            m = a.rows;
	            n = a.columns;
	            swapped = true;
	            var aux = wantu;
	            wantu = wantv;
	            wantv = aux;
	        }
	    }

	    var s = new Array(Math.min(m + 1, n)),
	        U = Matrix.zeros(m, nu),
	        V = Matrix.zeros(n, n),
	        e = new Array(n),
	        work = new Array(m);

	    var nct = Math.min(m - 1, n);
	    var nrt = Math.max(0, Math.min(n - 2, m));

	    var i, j, k, p, t, ks, f, cs, sn, max, kase,
	        scale, sp, spm1, epm1, sk, ek, b, c, shift, g;

	    for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	        if (k < nct) {
	            s[k] = 0;
	            for (i = k; i < m; i++) {
	                s[k] = hypotenuse(s[k], a[i][k]);
	            }
	            if (s[k] !== 0) {
	                if (a[k][k] < 0) {
	                    s[k] = -s[k];
	                }
	                for (i = k; i < m; i++) {
	                    a[i][k] /= s[k];
	                }
	                a[k][k] += 1;
	            }
	            s[k] = -s[k];
	        }

	        for (j = k + 1; j < n; j++) {
	            if ((k < nct) && (s[k] !== 0)) {
	                t = 0;
	                for (i = k; i < m; i++) {
	                    t += a[i][k] * a[i][j];
	                }
	                t = -t / a[k][k];
	                for (i = k; i < m; i++) {
	                    a[i][j] += t * a[i][k];
	                }
	            }
	            e[j] = a[k][j];
	        }

	        if (wantu && (k < nct)) {
	            for (i = k; i < m; i++) {
	                U[i][k] = a[i][k];
	            }
	        }

	        if (k < nrt) {
	            e[k] = 0;
	            for (i = k + 1; i < n; i++) {
	                e[k] = hypotenuse(e[k], e[i]);
	            }
	            if (e[k] !== 0) {
	                if (e[k + 1] < 0)
	                    e[k] = -e[k];
	                for (i = k + 1; i < n; i++) {
	                    e[i] /= e[k];
	                }
	                e[k + 1] += 1;
	            }
	            e[k] = -e[k];
	            if ((k + 1 < m) && (e[k] !== 0)) {
	                for (i = k + 1; i < m; i++) {
	                    work[i] = 0;
	                }
	                for (j = k + 1; j < n; j++) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] += e[j] * a[i][j];
	                    }
	                }
	                for (j = k + 1; j < n; j++) {
	                    t = -e[j] / e[k + 1];
	                    for (i = k + 1; i < m; i++) {
	                        a[i][j] += t * work[i];
	                    }
	                }
	            }
	            if (wantv) {
	                for (i = k + 1; i < n; i++) {
	                    V[i][k] = e[i];
	                }
	            }
	        }
	    }

	    p = Math.min(n, m + 1);
	    if (nct < n) {
	        s[nct] = a[nct][nct];
	    }
	    if (m < p) {
	        s[p - 1] = 0;
	    }
	    if (nrt + 1 < p) {
	        e[nrt] = a[nrt][p - 1];
	    }
	    e[p - 1] = 0;

	    if (wantu) {
	        for (j = nct; j < nu; j++) {
	            for (i = 0; i < m; i++) {
	                U[i][j] = 0;
	            }
	            U[j][j] = 1;
	        }
	        for (k = nct - 1; k >= 0; k--) {
	            if (s[k] !== 0) {
	                for (j = k + 1; j < nu; j++) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += U[i][k] * U[i][j];
	                    }
	                    t = -t / U[k][k];
	                    for (i = k; i < m; i++) {
	                        U[i][j] += t * U[i][k];
	                    }
	                }
	                for (i = k; i < m; i++) {
	                    U[i][k] = -U[i][k];
	                }
	                U[k][k] = 1 + U[k][k];
	                for (i = 0; i < k - 1; i++) {
	                    U[i][k] = 0;
	                }
	            } else {
	                for (i = 0; i < m; i++) {
	                    U[i][k] = 0;
	                }
	                U[k][k] = 1;
	            }
	        }
	    }

	    if (wantv) {
	        for (k = n - 1; k >= 0; k--) {
	            if ((k < nrt) && (e[k] !== 0)) {
	                for (j = k + 1; j < n; j++) {
	                    t = 0;
	                    for (i = k + 1; i < n; i++) {
	                        t += V[i][k] * V[i][j];
	                    }
	                    t = -t / V[k + 1][k];
	                    for (i = k + 1; i < n; i++) {
	                        V[i][j] += t * V[i][k];
	                    }
	                }
	            }
	            for (i = 0; i < n; i++) {
	                V[i][k] = 0;
	            }
	            V[k][k] = 1;
	        }
	    }

	    var pp = p - 1,
	        iter = 0,
	        eps = Math.pow(2, -52);
	    while (p > 0) {
	        for (k = p - 2; k >= -1; k--) {
	            if (k === -1) {
	                break;
	            }
	            if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                e[k] = 0;
	                break;
	            }
	        }
	        if (k === p - 2) {
	            kase = 4;
	        } else {
	            for (ks = p - 1; ks >= k; ks--) {
	                if (ks === k) {
	                    break;
	                }
	                t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                if (Math.abs(s[ks]) <= eps * t) {
	                    s[ks] = 0;
	                    break;
	                }
	            }
	            if (ks === k) {
	                kase = 3;
	            } else if (ks === p - 1) {
	                kase = 1;
	            } else {
	                kase = 2;
	                k = ks;
	            }
	        }

	        k++;

	        switch (kase) {
	            case 1: {
	                f = e[p - 2];
	                e[p - 2] = 0;
	                for (j = p - 2; j >= k; j--) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    if (j !== k) {
	                        f = -sn * e[j - 1];
	                        e[j - 1] = cs * e[j - 1];
	                    }
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][p - 1];
	                            V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                            V[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 2 : {
	                f = e[k - 1];
	                e[k - 1] = 0;
	                for (j = k; j < p; j++) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    f = -sn * e[j];
	                    e[j] = cs * e[j];
	                    if (wantu) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][k - 1];
	                            U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 3 : {
	                scale = Math.max(Math.max(Math.max(Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2])), Math.abs(e[p - 2])), Math.abs(s[k])), Math.abs(e[k]));
	                sp = s[p - 1] / scale;
	                spm1 = s[p - 2] / scale;
	                epm1 = e[p - 2] / scale;
	                sk = s[k] / scale;
	                ek = e[k] / scale;
	                b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                c = (sp * epm1) * (sp * epm1);
	                shift = 0;
	                if ((b !== 0) || (c !== 0)) {
	                    shift = Math.sqrt(b * b + c);
	                    if (b < 0) {
	                        shift = -shift;
	                    }
	                    shift = c / (b + shift);
	                }
	                f = (sk + sp) * (sk - sp) + shift;
	                g = sk * ek;
	                for (j = k; j < p - 1; j++) {
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    if (j !== k) {
	                        e[j - 1] = t;
	                    }
	                    f = cs * s[j] + sn * e[j];
	                    e[j] = cs * e[j] - sn * s[j];
	                    g = sn * s[j + 1];
	                    s[j + 1] = cs * s[j + 1];
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][j + 1];
	                            V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                            V[i][j] = t;
	                        }
	                    }
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    s[j] = t;
	                    f = cs * e[j] + sn * s[j + 1];
	                    s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                    g = sn * e[j + 1];
	                    e[j + 1] = cs * e[j + 1];
	                    if (wantu && (j < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][j + 1];
	                            U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                e[p - 2] = f;
	                iter = iter + 1;
	                break;
	            }
	            case 4: {
	                if (s[k] <= 0) {
	                    s[k] = (s[k] < 0 ? -s[k] : 0);
	                    if (wantv) {
	                        for (i = 0; i <= pp; i++) {
	                            V[i][k] = -V[i][k];
	                        }
	                    }
	                }
	                while (k < pp) {
	                    if (s[k] >= s[k + 1]) {
	                        break;
	                    }
	                    t = s[k];
	                    s[k] = s[k + 1];
	                    s[k + 1] = t;
	                    if (wantv && (k < n - 1)) {
	                        for (i = 0; i < n; i++) {
	                            t = V[i][k + 1];
	                            V[i][k + 1] = V[i][k];
	                            V[i][k] = t;
	                        }
	                    }
	                    if (wantu && (k < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = U[i][k + 1];
	                            U[i][k + 1] = U[i][k];
	                            U[i][k] = t;
	                        }
	                    }
	                    k++;
	                }
	                iter = 0;
	                p--;
	                break;
	            }
	        }
	    }

	    if (swapped) {
	        var tmp = V;
	        V = U;
	        U = tmp;
	    }

	    this.m = m;
	    this.n = n;
	    this.s = s;
	    this.U = U;
	    this.V = V;
	}

	SingularValueDecomposition.prototype = {
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    },
	    get norm2() {
	        return this.s[0];
	    },
	    get rank() {
	        var eps = Math.pow(2, -52),
	            tol = Math.max(this.m, this.n) * this.s[0] * eps,
	            r = 0,
	            s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    },
	    get diagonal() {
	        return this.s;
	    },
	    // https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
	    get threshold() {
	        return (Math.pow(2, -52) / 2) * Math.max(this.m, this.n) * this.s[0];
	    },
	    get leftSingularVectors() {
	        return this.U;
	    },
	    get rightSingularVectors() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    },
	    solve: function (value) {

	        var Y = value,
	            e = this.threshold,
	            scols = this.s.length,
	            Ls = Matrix.zeros(scols, scols),
	            i;

	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }


	        var VL = this.V.mmul(Ls),
	            vrows = this.V.rows,
	            urows = this.U.rows,
	            VLU = Matrix.zeros(vrows, urows),
	            j, k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * this.U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }

	        return VLU.mmul(Y);
	    },
	    solveForDiagonal: function (value) {
	        return this.solve(Matrix.diag(value));
	    },
	    inverse: function () {
	        var e = this.threshold,
	            vrows = this.V.rows,
	            vcols = this.V.columns,
	            X = new Matrix(vrows, this.s.length),
	            i, j;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = this.V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }

	        var urows = this.U.rows,
	            ucols = this.U.columns,
	            Y = new Matrix(vrows, urows),
	            k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * this.U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }

	        return Y;
	    }
	};

	module.exports = SingularValueDecomposition;


/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';

	exports.hypotenuse = function hypotenuse(a, b) {
	    var r;
	    if (Math.abs(a) > Math.abs(b)) {
	        r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	};


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(89);
	var hypotenuse = __webpack_require__(92).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	function EigenvalueDecomposition(matrix) {
	    if (!(this instanceof EigenvalueDecomposition)) {
	        return new EigenvalueDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);
	    if (!matrix.isSquare()) {
	        throw new Error('Matrix is not a square matrix');
	    }

	    var n = matrix.columns,
	        V = Matrix.zeros(n, n),
	        d = new Array(n),
	        e = new Array(n),
	        value = matrix,
	        i, j;

	    if (matrix.isSymmetric()) {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                V[i][j] = value[i][j];
	            }
	        }
	        tred2(n, e, d, V);
	        tql2(n, e, d, V);
	    }
	    else {
	        var H = Matrix.zeros(n, n),
	            ort = new Array(n);
	        for (j = 0; j < n; j++) {
	            for (i = 0; i < n; i++) {
	                H[i][j] = value[i][j];
	            }
	        }
	        orthes(n, H, ort, V);
	        hqr2(n, e, d, V, H);
	    }

	    this.n = n;
	    this.e = e;
	    this.d = d;
	    this.V = V;
	}

	EigenvalueDecomposition.prototype = {
	    get realEigenvalues() {
	        return this.d;
	    },
	    get imaginaryEigenvalues() {
	        return this.e;
	    },
	    get eigenvectorMatrix() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        var n = this.n,
	            e = this.e,
	            d = this.d,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            }
	            else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	};

	function tred2(n, e, d, V) {

	    var f, g, h, i, j, k,
	        hh, scale;

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }

	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }

	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }

	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }

	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }

	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }

	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }

	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }

	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }

	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }

	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}

	function tql2(n, e, d, V) {

	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;

	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }

	    e[n - 1] = 0;

	    var f = 0,
	        tst1 = 0,
	        eps = Math.pow(2, -52);

	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }

	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;

	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }

	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }

	                f = f + h;

	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);

	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }

	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;

	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }

	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }

	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}

	function orthes(n, H, ort, V) {

	    var low = 0,
	        high = n - 1,
	        f, g, h, i, j, m,
	        scale;

	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }

	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }

	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }

	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;

	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }

	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }

	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }

	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }

	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }

	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }

	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }

	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }

	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}

	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1,
	        low = 0,
	        high = nn - 1,
	        eps = Math.pow(2, -52),
	        exshift = 0,
	        norm = 0,
	        p = 0,
	        q = 0,
	        r = 0,
	        s = 0,
	        z = 0,
	        iter = 0,
	        i, j, k, l, m, t, w, x, y,
	        ra, sa, vr, vi,
	        notlast, cdivres;

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }

	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }

	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }

	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];

	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;

	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }

	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }

	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }

	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }

	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }

	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }

	            iter = iter + 1;

	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }

	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }

	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }

	                if (x === 0) {
	                    break;
	                }

	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }

	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }

	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;

	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }

	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }

	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }

	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }

	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }

	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }

	    if (norm === 0) {
	        return;
	    }

	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];

	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }

	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }

	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;

	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }

	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }

	                w = H[i][i] - p;

	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }

	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }

	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}

	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    }
	    else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}

	module.exports = EigenvalueDecomposition;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(89);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	function LuDecomposition(matrix) {
	    if (!(this instanceof LuDecomposition)) {
	        return new LuDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);

	    var lu = matrix.clone(),
	        rows = lu.rows,
	        columns = lu.columns,
	        pivotVector = new Array(rows),
	        pivotSign = 1,
	        i, j, k, p, s, t, v,
	        LUrowi, LUcolj, kmax;

	    for (i = 0; i < rows; i++) {
	        pivotVector[i] = i;
	    }

	    LUcolj = new Array(rows);

	    for (j = 0; j < columns; j++) {

	        for (i = 0; i < rows; i++) {
	            LUcolj[i] = lu[i][j];
	        }

	        for (i = 0; i < rows; i++) {
	            LUrowi = lu[i];
	            kmax = Math.min(i, j);
	            s = 0;
	            for (k = 0; k < kmax; k++) {
	                s += LUrowi[k] * LUcolj[k];
	            }
	            LUrowi[j] = LUcolj[i] -= s;
	        }

	        p = j;
	        for (i = j + 1; i < rows; i++) {
	            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                p = i;
	            }
	        }

	        if (p !== j) {
	            for (k = 0; k < columns; k++) {
	                t = lu[p][k];
	                lu[p][k] = lu[j][k];
	                lu[j][k] = t;
	            }

	            v = pivotVector[p];
	            pivotVector[p] = pivotVector[j];
	            pivotVector[j] = v;

	            pivotSign = -pivotSign;
	        }

	        if (j < rows && lu[j][j] !== 0) {
	            for (i = j + 1; i < rows; i++) {
	                lu[i][j] /= lu[j][j];
	            }
	        }
	    }

	    this.LU = lu;
	    this.pivotVector = pivotVector;
	    this.pivotSign = pivotSign;
	}

	LuDecomposition.prototype = {
	    isSingular: function () {
	        var data = this.LU,
	            col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    },
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare())
	            throw new Error('Matrix must be square');
	        var determinant = this.pivotSign, col = data.columns;
	        for (var j = 0; j < col; j++)
	            determinant *= data[j][j];
	        return determinant;
	    },
	    get lowerTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get upperTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var lu = this.LU,
	            rows = lu.rows;

	        if (rows !== value.rows)
	            throw new Error('Invalid matrix dimensions');
	        if (this.isSingular())
	            throw new Error('LU matrix is singular');

	        var count = value.columns,
	            X = value.subMatrixRow(this.pivotVector, 0, count - 1),
	            columns = lu.columns,
	            i, j, k;

	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = LuDecomposition;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(89);
	var hypotenuse = __webpack_require__(92).hypotenuse;

	//https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	function QrDecomposition(value) {
	    if (!(this instanceof QrDecomposition)) {
	        return new QrDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);

	    var qr = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        rdiag = new Array(n),
	        i, j, k, s;

	    for (k = 0; k < n; k++) {
	        var nrm = 0;
	        for (i = k; i < m; i++) {
	            nrm = hypotenuse(nrm, qr[i][k]);
	        }
	        if (nrm !== 0) {
	            if (qr[k][k] < 0) {
	                nrm = -nrm;
	            }
	            for (i = k; i < m; i++) {
	                qr[i][k] /= nrm;
	            }
	            qr[k][k] += 1;
	            for (j = k + 1; j < n; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * qr[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    qr[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        rdiag[k] = -nrm;
	    }

	    this.QR = qr;
	    this.Rdiag = rdiag;
	}

	QrDecomposition.prototype = {
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var qr = this.QR,
	            m = qr.rows;

	        if (value.rows !== m)
	            throw new Error('Matrix row dimensions must agree');
	        if (!this.isFullRank())
	            throw new Error('Matrix is rank deficient');

	        var count = value.columns,
	            X = value.clone(),
	            n = qr.columns,
	            i, j, k, s;

	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }

	        return X.subMatrix(0, n - 1, 0, count - 1);
	    },
	    isFullRank: function () {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    },
	    get upperTriangularFactor() {
	        var qr = this.QR,
	            n = qr.columns,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get orthogonalFactor() {
	        var qr = this.QR,
	            rows = qr.rows,
	            columns = qr.columns,
	            X = new Matrix(rows, columns),
	            i, j, k, s;

	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }

	                    s = -s / qr[k][k];

	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = QrDecomposition;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(89);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	function CholeskyDecomposition(value) {
	    if (!(this instanceof CholeskyDecomposition)) {
	        return new CholeskyDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);
	    if (!value.isSymmetric())
	        throw new Error('Matrix is not symmetric');

	    var a = value,
	        dimension = a.rows,
	        l = new Matrix(dimension, dimension),
	        positiveDefinite = true,
	        i, j, k;

	    for (j = 0; j < dimension; j++) {
	        var Lrowj = l[j];
	        var d = 0;
	        for (k = 0; k < j; k++) {
	            var Lrowk = l[k];
	            var s = 0;
	            for (i = 0; i < k; i++) {
	                s += Lrowk[i] * Lrowj[i];
	            }
	            Lrowj[k] = s = (a[j][k] - s) / l[k][k];
	            d = d + s * s;
	        }

	        d = a[j][j] - d;

	        positiveDefinite &= (d > 0);
	        l[j][j] = Math.sqrt(Math.max(d, 0));
	        for (k = j + 1; k < dimension; k++) {
	            l[j][k] = 0;
	        }
	    }

	    if (!positiveDefinite) {
	        throw new Error('Matrix is not positive definite');
	    }

	    this.L = l;
	}

	CholeskyDecomposition.prototype = {
	    get leftTriangularFactor() {
	        return this.L;
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var l = this.L,
	            dimension = l.rows;

	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }

	        var count = value.columns,
	            B = value.clone(),
	            i, j, k;

	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        return B;
	    }
	};

	module.exports = CholeskyDecomposition;


/***/ },
/* 97 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LOOP = 8;
	var FLOAT_MUL = 1 / 16777216;

	function multiply_uint32(n, m) {
	    n >>>= 0;
	    m >>>= 0;
	    var nlo = n & 0xffff;
	    var nhi = n - nlo;
	    return (nhi * m >>> 0) + nlo * m >>> 0;
	}

	var XSadd = (function () {
	    function XSadd() {
	        var seed = arguments.length <= 0 || arguments[0] === undefined ? Date.now() : arguments[0];

	        _classCallCheck(this, XSadd);

	        this.state = new Uint32Array(4);
	        this.init(seed);
	    }

	    _createClass(XSadd, [{
	        key: "init",
	        value: function init(seed) {
	            this.state[0] = seed;
	            this.state[1] = 0;
	            this.state[2] = 0;
	            this.state[3] = 0;
	            for (var i = 1; i < LOOP; i++) {
	                this.state[i & 3] ^= i + multiply_uint32(1812433253, this.state[i - 1 & 3] ^ this.state[i - 1 & 3] >>> 30 >>> 0) >>> 0;
	            }
	            period_certification(this);
	            for (var i = 0; i < LOOP; i++) {
	                next_state(this);
	            }
	        }

	        /**
	         * Returns a 32-bit integer r (0 <= r < 2^32)
	         */
	    }, {
	        key: "getUint32",
	        value: function getUint32() {
	            next_state(this);
	            return this.state[3] + this.state[2] >>> 0;
	        }

	        /**
	         * Returns a floating point number r (0.0 <= r < 1.0)
	         */
	    }, {
	        key: "getFloat",
	        value: function getFloat() {
	            return (this.getUint32() >>> 8) * FLOAT_MUL;
	        }
	    }, {
	        key: "random",
	        get: function get() {
	            if (!this._random) {
	                this._random = this.getFloat.bind(this);
	            }
	            return this._random;
	        }
	    }]);

	    return XSadd;
	})();

	exports["default"] = XSadd;

	function period_certification(xsadd) {
	    if (xsadd.state[0] === 0 && xsadd.state[1] === 0 && xsadd.state[2] === 0 && xsadd.state[3] === 0) {
	        xsadd.state[0] = 88; // X
	        xsadd.state[1] = 83; // S
	        xsadd.state[2] = 65; // A
	        xsadd.state[3] = 68; // D
	    }
	}

	var sh1 = 15;
	var sh2 = 18;
	var sh3 = 11;
	function next_state(xsadd) {
	    var t = xsadd.state[0];
	    t ^= t << sh1;
	    t ^= t >>> sh2;
	    t ^= xsadd.state[3] << sh3;
	    xsadd.state[0] = xsadd.state[1];
	    xsadd.state[1] = xsadd.state[2];
	    xsadd.state[2] = xsadd.state[3];
	    xsadd.state[3] = t;
	}
	module.exports = exports["default"];


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(99);
	exports.kernel = __webpack_require__(100).kernel;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var kernel = __webpack_require__(100).kernel;
	var getKernel = __webpack_require__(100).getKernel;

	/**
	 * Parameters to implement function
	 * @type {{C: number, tol: number, max_passes: number, par: number, k: string}}
	 * @param {number} C - regularization parameter
	 * @param {number} tol - numerical tolerance
	 * @param {number} max_passes - max number of times to iterate over alphas without
	 * changing
	 * @param {string} k - the kind of kernel
	 * @param {number} par - parameter used in the polynomial and the radial function
	 * of the kernel
	 */
	var defaultOptions = {
	    C: 10,
	    tol: 10e-2,
	    max_passes: 100,
	    par: 2,
	    k: 'lineal'
	};

	/**
	 * Function to calculate the estimated prediction
	 * @param {Array <number>} x - point where calculate the function prediction
	 * @param {Array <Array <number>>} X - training data point in the form (x1, x2)
	 * @param {Array <number>} Y - training data labels in the domain {1,-1}
	 * @param {Array <number>} alpha - Lagrange multipliers
	 * @param {number} b - threshold of the function
	 * @param {string} k - the kind of kernel
	 * @param {number} par - parameter used in the polynomial and the radial function
	 * of the kernel
	 * @returns {number}
	 */
	function f(x, X, Y, alpha, b, kernel, par) {
	    var m = X.length;
	    var aux = b;
	    for (var i = 0; i < m; i++) {
	        b += alpha[i]*Y[i]*kernel(X[i],x, par)
	    }
	    return aux;
	}

	/**
	 * Simplified version of the Sequential Minimal Optimization algorithm for training
	 * support vector machines
	 * @param {{json}} options - parameters to implement function
	 * @constructor
	 */
	function SVM(options) {
	    options = options || {};
	    this.options = {};
	    for (var o in defaultOptions) {
	        if (options.hasOwnProperty(o)) {
	            this.options[o] = options[o];
	        } else {
	            this.options[o] = defaultOptions[o];
	        }
	    }
	    this.kernel = getKernel(this.options.k);
	    this.b = 0;
	}

	/**
	 * Train the SVM model
	 * @param {Array <Array <number>>} X - training data point in the form (x1, x2)
	 * @param {Array <number>} Y - training data labels in the domain {1,-1}
	 */
	SVM.prototype.train = function (X, Y) {
	    var m = Y.length;
	    var alpha = new Array(m);
	    for (var a = 0; a < m; a++)
	        alpha[a] = 0;
	    if (X.length !== m)
	        throw new TypeError('Arrays should have the same length');
	    var b = 0,
	        b1 = 0,
	        b2 = 0,
	        iter = 0,
	        Ei = 0,
	        Ej = 0,
	        ai = 0,
	        aj = 0,
	        L = 0,
	        H = 0,
	        eta = 0;

	    while (iter < this.options.max_passes) {
	        var numChange = 0;
	        for (var i = 0; i < m; i++) {
	            Ei = f(X[i],X,Y,alpha,b,this.kernel,this.options.par) - Y[i];
	            if (((Y[i]*Ei < -this.options.tol) && (alpha[i] < this.options.C)) || ((Y[i]*Ei > this.options.tol) && (alpha[i] > 0))) {
	                var j = 0;
	                do {
	                    j = Math.ceil(Math.random()*(m - 1));
	                }
	                while (j === i);
	                Ej = f(X[j],X,Y,alpha,b,this.kernel,this.options.par) - Y[j];
	                ai = alpha[i];
	                aj = alpha[j];
	                if (Y[i] === Y[j]) {
	                    L = Math.max(0, ai+aj-this.options.C);
	                    H = Math.min(this.options.C, ai+aj);
	                }
	                else  {
	                    L = Math.max(0, ai-aj);
	                    H = Math.min(this.options.C, this.options.C-ai+aj);
	                }
	                if (L !== H) {
	                    eta = 2*this.kernel(X[i],X[j], this.options.par) - this.kernel(X[i],X[i], this.options.par) - this.kernel(X[j],X[j], this.options.par);
	                    if (eta < 0) {
	                        alpha[j] = alpha[j] - (Y[j]*(Ei - Ej)) / eta;
	                        if (alpha[j] > H)
	                            alpha[j] = H;
	                        else if (alpha[j] < L)
	                            alpha[j] = L;
	                        if (Math.abs(aj - alpha[j]) >= 10e-5) {
	                            alpha[i] = alpha[i] + Y[i]*Y[j]*(aj - alpha[j]);
	                            b1 = b - Ei - Y[i]*(alpha[i] - ai)*this.kernel(X[i],X[i], this.options.par) - Y[j]*(alpha[j] - aj)*this.kernel(X[i],X[j], this.options.par);
	                            b2 = b - Ej - Y[i]*(alpha[i] - ai)*this.kernel(X[i],X[j], this.options.par) - Y[j]*(alpha[j] - aj)*this.kernel(X[j],X[j], this.options.par);
	                            if ((alpha[i] < this.options.C) && (alpha[i] > 0))
	                                b = b1;
	                            else if ((alpha[j] < this.options.C) && (alpha[j] > 0))
	                                b = b2;
	                            else
	                                b = (b1 + b2) / 2;
	                            numChange += 1;
	                        }
	                    }
	                }
	            }
	        }
	        if (numChange == 0)
	            iter += 1;
	        else
	            iter = 0;
	    }
	    this.b = b;
	    var s = X[0].length;
	    this.W = new Array(s);
	    for (var r = 0; r < s; r++) {
	        this.W[r] = 0;
	        for (var w = 0; w < m; w++)
	            this.W[r] += Y[w]*alpha[w]*X[w][r];
	    }
	    this.alphas = alpha.splice();
	};

	/**
	 * Recreates a SVM based in the exported model
	 * @param {{name: string, ,options: {json} ,alpha: Array<number>, b: number}} model
	 * @returns {SVM}
	 */
	SVM.load = function (model) {
	    if (model.name === 'SVM') {
	        var svm = new SVM(model.options);
	        svm.W = model.W.slice();
	        svm.b = model.b;
	        return svm;
	    } else {
	        throw new TypeError('expecting a SVM model');
	    }
	};

	/**
	 * Let's have a JSON to recreate the model
	 * @returns {{name: String("SVM"), ,options: {json} ,alpha: Array<number>, b: number}}
	 * name identifier, options to recreate model, the Lagrange multipliers and the
	 * threshold of the objective function
	 */
	SVM.prototype.export = function () {
	    var model = {
	        name: 'SVM'
	    };
	    model.options = this.options;
	    model.W = this.W;
	    model.b = this.b;
	    return model;
	};

	/**
	 * Return the Lagrange multipliers
	 * @returns {Array <number>}
	 */
	SVM.prototype.getAlphas = function () {
	    return this.alphas.slice();
	};

	/**
	 * Returns the threshold of the model function
	 * @returns {number} threshold of the function
	 */
	SVM.prototype.getThreshold = function () {
	    return this.b;
	};

	/**
	 * Use the train model to make predictions
	 * @param {Array} p - An array or a single dot to have the prediction
	 * @returns {*} An array or a single {-1, 1} value of the prediction
	 */
	SVM.prototype.predict = function (p) {
	    var ev;
	    if (Array.isArray(p) && (Array.isArray(p[0]) || (typeof p[0] === 'object'))) {
	        var ans = new Array(p.length);
	        for (var i = 0; i < ans.length; i++) {
	            ev = this.b;
	            for (var j = 0; j < this.W.length; j++)
	                ev += this.W[j]*p[j];
	            if (ev < 0)
	                ans[i] = -1;
	            else
	                ans[i] = 1;
	        }
	        return ans;
	    }
	    else {
	        ev = this.b;
	        for (var e = 0; e < this.W.length; e++)
	            ev += this.W[e]*p[e];
	        if (ev < 0)
	            return -1;
	        else
	            return 1;
	    }
	};

	module.exports = SVM;

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Kernel function to return the dot product for different spaces
	 * @param {Array <number>} x1 - input first vector
	 * @param {Array <number>} x2 - input second vector
	 * @param {string} func - the kind of transformation
	 * @param {number} par - parameter used in the polynomial and the radial function
	 * @return {number} calculus of the dot product using the function
	 * */
	function kernel(x1,x2,func,par) {
	    return getKernel(func)(x1, x2, par);
	}

	/**
	 * The dot product between the p1 and p2 vectors
	 * @param {Array <number>} p1 - first vector to get dot product
	 * @param {Array <number>} p2 - second vector to get dot product
	 * @returns {number} dot product between the p1 and p2 vectors
	 */
	function dot(p1, p2) {
	    var l = p1.length;
	    var prod = 0;

	    for (var i = 0; i < l; i++) {
	        prod += p1[i] * p2[i];
	    }

	    return prod;
	}

	function getKernel(func) {
	    func = (typeof func === 'undefined') ? 'lineal' : func;

	    switch(func) {
	        case 'lineal':
	            return kernelLineal;
	        case 'polynomial':
	            return kernelPolynomial;
	        case 'radial':
	            return kernelRadial;
	        default:
	            throw new TypeError('Function kernel undefined: ' + func);
	    }
	}

	function kernelLineal(x1,x2) {
	    return dot(x1,x2);
	}

	function kernelPolynomial(x1, x2, par) {
	    par = (typeof par === 'undefined') ? 2 : par;
	    return Math.pow((dot(x1, x2) + 1), par);
	}

	function kernelRadial(x1, x2, par) {
	    par = (typeof par === 'undefined') ? 2 : par;
	    var l = x1.length;
	    var rest = new Array(l);
	    for (var i = 0; i < l; i++) {
	        rest[i] = x1[i] - x2[i];
	    }
	    var norm = dot(rest, rest);
	    return Math.exp((norm)/(-2*par*par));
	}

	module.exports = {
	    kernel: kernel,
	    getKernel: getKernel,
	    lineal : kernelLineal,
	    polynomial : kernelPolynomial,
	    radial : kernelRadial
	};


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(102);

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = KNN;

	var KDTree = __webpack_require__(103).kdTree;
	var Distances = __webpack_require__(28);

	/**
	 * K-Nearest neighboor constructor.
	 *
	 * @param reload - loading purposes.
	 * @param model - loading purposes
	 * @constructor
	 */
	function KNN(reload, model) {
	    if(reload) {
	        this.kdtree = model.kdtree;
	        this.k = model.k;
	        this.classes = model.classes;
	    }
	}

	/**
	 * Function that trains the KNN with the given trainingSet and trainingLabels.
	 * The third argument is an object with the following options.
	 *  * distance: that represent the distance function applied (default: euclidean)
	 *  * k: the number of neighboors to take in count for classify (default: number of features + 1)
	 *
	 * @param trainingSet
	 * @param trainingLabels
	 * @param options
	 */
	KNN.prototype.train = function (trainingSet, trainingLabels, options) {
	    if(options === undefined) options = {};
	    if(options.distance === undefined) options.distance = Distances.distance.euclidean;
	    if(options.k === undefined) options.k = trainingSet[0].length + 1;

	    var classes = 0;
	    var exist = new Array(1000);
	    var j = 0;
	    for(var i = 0; i < trainingLabels.length; ++i) {
	        if(exist.indexOf(trainingLabels[i]) === -1) {
	            classes++;
	            exist[j] = trainingLabels[i];
	            j++;
	        }
	    }

	    // copy dataset
	    var points = new Array(trainingSet.length);
	    for(i = 0; i < points.length; ++i) {
	        points[i] = trainingSet[i].slice();
	    }

	    this.features = trainingSet[0].length;
	    for(i = 0; i < trainingLabels.length; ++i) {
	        points[i].push(trainingLabels[i]);
	    }

	    var dimensions = new Array(trainingSet[0].length);
	    for(i = 0; i < dimensions.length; ++i) {
	        dimensions[i] = i;
	    }

	    this.kdtree = new KDTree(points, options.distance, dimensions);
	    this.k = options.k;
	    this.classes = classes;
	};

	/**
	 * Function that returns the predictions given the dataset.
	 * 
	 * @param dataset
	 * @returns {Array}
	 */
	KNN.prototype.predict = function (dataset) {
	    var predictions = new Array(dataset.length);
	    for(var i = 0; i < dataset.length; ++i) {
	        predictions[i] = this.getSinglePrediction(dataset[i]);
	    }

	    return predictions;
	};

	/**
	 * function that returns a prediction for a single case.
	 * @param currentCase
	 * @returns {number}
	 */
	KNN.prototype.getSinglePrediction = function (currentCase) {
	    var nearestPoints = this.kdtree.nearest(currentCase, this.k);
	    var pointsPerClass = new Array(this.classes);
	    var predictedClass = -1;
	    var maxPoints = -1;
	    var lastElement = nearestPoints[0][0].length - 1;

	    for(var i = 0; i < pointsPerClass.length; ++i) {
	        pointsPerClass[i] = 0;
	    }

	    for(i = 0; i < nearestPoints.length; ++i) {
	        var currentClass = nearestPoints[i][0][lastElement];
	        var currentPoints = ++pointsPerClass[currentClass];
	        if(currentPoints > maxPoints) {
	            predictedClass = currentClass;
	            maxPoints = currentPoints;
	        }
	    }

	    return predictedClass;
	};

	/**
	 * function that returns a KNN classifier with the given model.
	 *
	 * @param model
	 */
	KNN.load = function (model) {
	    if(model.modelName !== "KNN")
	        throw new RangeError("The given model is invalid!");

	    return new KNN(true, model);
	};

	/**
	 * function that exports the current KNN classifier.
	 */
	KNN.prototype.export = function () {
	    return {
	        modelName: "KNN",
	        kdtree: this.kdtree,
	        k: this.k,
	        classes: this.classes
	    };
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';

	/**
	* k-d Tree JavaScript - V 1.01
	*
	* https://github.com/ubilabs/kd-tree-javascript
	*
	* @author Mircea Pricop <pricop@ubilabs.net>, 2012
	* @author Martin Kleppe <kleppe@ubilabs.net>, 2012
	* @author Ubilabs http://ubilabs.net, 2012
	* @license MIT License <http://www.opensource.org/licenses/mit-license.php>
	*/


	function Node(obj, dimension, parent) {
	    this.obj = obj;
	    this.left = null;
	    this.right = null;
	    this.parent = parent;
	    this.dimension = dimension;
	}

	function kdTree(points, metric, dimensions) {

	    var self = this;

	    function buildTree(points, depth, parent) {
	        var dim = depth % dimensions.length,
	            median,
	            node;

	        if (points.length === 0) {
	            return null;
	        }
	        if (points.length === 1) {
	            return new Node(points[0], dim, parent);
	        }

	        points.sort(function (a, b) {
	            return a[dimensions[dim]] - b[dimensions[dim]];
	        });

	        median = Math.floor(points.length / 2);
	        node = new Node(points[median], dim, parent);
	        node.left = buildTree(points.slice(0, median), depth + 1, node);
	        node.right = buildTree(points.slice(median + 1), depth + 1, node);

	        return node;
	    }

	    // Reloads a serialied tree
	    function loadTree (data) {
	        // Just need to restore the `parent` parameter
	        self.root = data;

	        function restoreParent (root) {
	            if (root.left) {
	                root.left.parent = root;
	                restoreParent(root.left);
	            }

	            if (root.right) {
	                root.right.parent = root;
	                restoreParent(root.right);
	            }
	        }

	        restoreParent(self.root);
	    }

	    // If points is not an array, assume we're loading a pre-built tree
	    if (!Array.isArray(points)) loadTree(points, metric, dimensions);
	    else this.root = buildTree(points, 0, null);

	    // Convert to a JSON serializable structure; this just requires removing
	    // the `parent` property
	    this.toJSON = function (src) {
	        if (!src) src = this.root;
	        var dest = new Node(src.obj, src.dimension, null);
	        if (src.left) dest.left = self.toJSON(src.left);
	        if (src.right) dest.right = self.toJSON(src.right);
	        return dest;
	    };

	    this.insert = function (point) {
	        function innerSearch(node, parent) {

	            if (node === null) {
	                return parent;
	            }

	            var dimension = dimensions[node.dimension];
	            if (point[dimension] < node.obj[dimension]) {
	                return innerSearch(node.left, node);
	            } else {
	                return innerSearch(node.right, node);
	            }
	        }

	        var insertPosition = innerSearch(this.root, null),
	            newNode,
	            dimension;

	        if (insertPosition === null) {
	            this.root = new Node(point, 0, null);
	            return;
	        }

	        newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
	        dimension = dimensions[insertPosition.dimension];

	        if (point[dimension] < insertPosition.obj[dimension]) {
	            insertPosition.left = newNode;
	        } else {
	            insertPosition.right = newNode;
	        }
	    };

	    this.remove = function (point) {
	        var node;

	        function nodeSearch(node) {
	            if (node === null) {
	                return null;
	            }

	            if (node.obj === point) {
	                return node;
	            }

	            var dimension = dimensions[node.dimension];

	            if (point[dimension] < node.obj[dimension]) {
	                return nodeSearch(node.left, node);
	            } else {
	                return nodeSearch(node.right, node);
	            }
	        }

	        function removeNode(node) {
	            var nextNode,
	                nextObj,
	                pDimension;

	            function findMin(node, dim) {
	                var dimension,
	                    own,
	                    left,
	                    right,
	                    min;

	                if (node === null) {
	                    return null;
	                }

	                dimension = dimensions[dim];

	                if (node.dimension === dim) {
	                    if (node.left !== null) {
	                        return findMin(node.left, dim);
	                    }
	                    return node;
	                }

	                own = node.obj[dimension];
	                left = findMin(node.left, dim);
	                right = findMin(node.right, dim);
	                min = node;

	                if (left !== null && left.obj[dimension] < own) {
	                    min = left;
	                }
	                if (right !== null && right.obj[dimension] < min.obj[dimension]) {
	                    min = right;
	                }
	                return min;
	            }

	            if (node.left === null && node.right === null) {
	                if (node.parent === null) {
	                    self.root = null;
	                    return;
	                }

	                pDimension = dimensions[node.parent.dimension];

	                if (node.obj[pDimension] < node.parent.obj[pDimension]) {
	                    node.parent.left = null;
	                } else {
	                    node.parent.right = null;
	                }
	                return;
	            }

	            // If the right subtree is not empty, swap with the minimum element on the
	            // node's dimension. If it is empty, we swap the left and right subtrees and
	            // do the same.
	            if (node.right !== null) {
	                nextNode = findMin(node.right, node.dimension);
	                nextObj = nextNode.obj;
	                removeNode(nextNode);
	                node.obj = nextObj;
	            } else {
	                nextNode = findMin(node.left, node.dimension);
	                nextObj = nextNode.obj;
	                removeNode(nextNode);
	                node.right = node.left;
	                node.left = null;
	                node.obj = nextObj;
	            }

	        }

	        node = nodeSearch(self.root);

	        if (node === null) { return; }

	        removeNode(node);
	    };

	    this.nearest = function (point, maxNodes, maxDistance) {
	        var i,
	            result,
	            bestNodes;

	        bestNodes = new BinaryHeap(
	            function (e) { return -e[1]; }
	        );

	        function nearestSearch(node) {
	            var bestChild,
	                dimension = dimensions[node.dimension],
	                ownDistance = metric(point, node.obj),
	                linearPoint = {},
	                linearDistance,
	                otherChild,
	                i;

	            function saveNode(node, distance) {
	                bestNodes.push([node, distance]);
	                if (bestNodes.size() > maxNodes) {
	                    bestNodes.pop();
	                }
	            }

	            for (i = 0; i < dimensions.length; i += 1) {
	                if (i === node.dimension) {
	                    linearPoint[dimensions[i]] = point[dimensions[i]];
	                } else {
	                    linearPoint[dimensions[i]] = node.obj[dimensions[i]];
	                }
	            }

	            linearDistance = metric(linearPoint, node.obj);

	            if (node.right === null && node.left === null) {
	                if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
	                    saveNode(node, ownDistance);
	                }
	                return;
	            }

	            if (node.right === null) {
	                bestChild = node.left;
	            } else if (node.left === null) {
	                bestChild = node.right;
	            } else {
	                if (point[dimension] < node.obj[dimension]) {
	                    bestChild = node.left;
	                } else {
	                    bestChild = node.right;
	                }
	            }

	            nearestSearch(bestChild);

	            if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
	                saveNode(node, ownDistance);
	            }

	            if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
	                if (bestChild === node.left) {
	                    otherChild = node.right;
	                } else {
	                    otherChild = node.left;
	                }
	                if (otherChild !== null) {
	                    nearestSearch(otherChild);
	                }
	            }
	        }

	        if (maxDistance) {
	            for (i = 0; i < maxNodes; i += 1) {
	                bestNodes.push([null, maxDistance]);
	            }
	        }

	        if(self.root)
	            nearestSearch(self.root);

	        result = [];

	        for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
	            if (bestNodes.content[i][0]) {
	                result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
	            }
	        }
	        return result;
	    };

	    this.balanceFactor = function () {
	        function height(node) {
	            if (node === null) {
	                return 0;
	            }
	            return Math.max(height(node.left), height(node.right)) + 1;
	        }

	        function count(node) {
	            if (node === null) {
	                return 0;
	            }
	            return count(node.left) + count(node.right) + 1;
	        }

	        return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
	    };
	}

	// Binary heap implementation from:
	// http://eloquentjavascript.net/appendix2.html

	function BinaryHeap(scoreFunction){
	    this.content = [];
	    this.scoreFunction = scoreFunction;
	}

	BinaryHeap.prototype = {
	    push: function(element) {
	        // Add the new element to the end of the array.
	        this.content.push(element);
	        // Allow it to bubble up.
	        this.bubbleUp(this.content.length - 1);
	    },

	    pop: function() {
	        // Store the first element so we can return it later.
	        var result = this.content[0];
	        // Get the element at the end of the array.
	        var end = this.content.pop();
	        // If there are any elements left, put the end element at the
	        // start, and let it sink down.
	        if (this.content.length > 0) {
	            this.content[0] = end;
	            this.sinkDown(0);
	        }
	        return result;
	    },

	    peek: function() {
	        return this.content[0];
	    },

	    remove: function(node) {
	        var len = this.content.length;
	        // To remove a value, we must search through the array to find
	        // it.
	        for (var i = 0; i < len; i++) {
	            if (this.content[i] == node) {
	                // When it is found, the process seen in 'pop' is repeated
	                // to fill up the hole.
	                var end = this.content.pop();
	                if (i != len - 1) {
	                    this.content[i] = end;
	                    if (this.scoreFunction(end) < this.scoreFunction(node))
	                        this.bubbleUp(i);
	                    else
	                        this.sinkDown(i);
	                }
	                return;
	            }
	        }
	        throw new Error("Node not found.");
	    },

	    size: function() {
	        return this.content.length;
	    },

	    bubbleUp: function(n) {
	        // Fetch the element that has to be moved.
	        var element = this.content[n];
	        // When at 0, an element can not go up any further.
	        while (n > 0) {
	            // Compute the parent element's index, and fetch it.
	            var parentN = Math.floor((n + 1) / 2) - 1,
	                parent = this.content[parentN];
	            // Swap the elements if the parent is greater.
	            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
	                this.content[parentN] = element;
	                this.content[n] = parent;
	                // Update 'n' to continue at the new position.
	                n = parentN;
	            }
	            // Found a parent that is less, no need to move it further.
	            else {
	                break;
	            }
	        }
	    },

	    sinkDown: function(n) {
	        // Look up the target element and its score.
	        var length = this.content.length,
	            element = this.content[n],
	            elemScore = this.scoreFunction(element);

	        while(true) {
	            // Compute the indices of the child elements.
	            var child2N = (n + 1) * 2, child1N = child2N - 1;
	            // This is used to store the new position of the element,
	            // if any.
	            var swap = null;
	            // If the first child exists (is inside the array)...
	            if (child1N < length) {
	                // Look it up and compute its score.
	                var child1 = this.content[child1N],
	                    child1Score = this.scoreFunction(child1);
	                // If the score is less than our element's, we need to swap.
	                if (child1Score < elemScore)
	                    swap = child1N;
	            }
	            // Do the same checks for the other child.
	            if (child2N < length) {
	                var child2 = this.content[child2N],
	                    child2Score = this.scoreFunction(child2);
	                if (child2Score < (swap == null ? elemScore : child1Score)){
	                    swap = child2N;
	                }
	            }

	            // If the element needs to be moved, swap it, and continue.
	            if (swap != null) {
	                this.content[n] = this.content[swap];
	                this.content[swap] = element;
	                n = swap;
	            }
	            // Otherwise, we are done.
	            else {
	                break;
	            }
	        }
	    }
	};

	this.kdTree = kdTree;

	exports.kdTree = kdTree;
	exports.BinaryHeap = BinaryHeap;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(105).NaiveBayes;
	exports.separateClasses = __webpack_require__(105).separateClasses;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(106);
	var Stat = __webpack_require__(5);

	module.exports.NaiveBayes = NaiveBayes;
	module.exports.separateClasses = separateClasses;

	/**
	 * Constructor for the Naive Bayes classifier, the parameters here is just for loading purposes.
	 *
	 * @param reload
	 * @param model
	 * @constructor
	 */
	function NaiveBayes(reload, model) {
	    if(reload) {
	        this.means = model.means;
	        this.calculateProbabilities = model.calculateProbabilities;
	    }
	}

	/**
	 * Function that trains the classifier with a matrix that represents the training set and an array that
	 * represents the label of each row in the training set. the labels must be numbers between 0 to n-1 where
	 * n represents the number of classes.
	 *
	 * WARNING: in the case that one class, all the cases in one or more features have the same value, the
	 * Naive Bayes classifier will not work well.
	 * @param trainingSet
	 * @param trainingLabels
	 */
	NaiveBayes.prototype.train = function (trainingSet, trainingLabels) {
	    var C1 = Math.sqrt(2*Math.PI); // constant to precalculate the squared root
	    if(!Matrix.isMatrix(trainingSet)) var X = Matrix(trainingSet);
	    else X = trainingSet.clone();

	    if(X.rows !== trainingLabels.length)
	        throw new RangeError("the size of the training set and the training labels must be the same.");

	    var separatedClasses = separateClasses(trainingSet, trainingLabels);
	    var calculateProbabilities = new Array(separatedClasses.length);
	    this.means = new Array(separatedClasses.length);
	    for(var i = 0; i < separatedClasses.length; ++i) {
	        var means = Stat.matrix.mean(separatedClasses[i]);
	        var std = Stat.matrix.standardDeviation(separatedClasses[i], means);

	        var logPriorProbability = Math.log(separatedClasses[i].rows / X.rows);
	        calculateProbabilities[i] = new Array(means.length + 1);

	        calculateProbabilities[i][0] = logPriorProbability;
	        for(var j = 1; j < means.length + 1; ++j) {
	            var currentStd = std[j - 1];
	            calculateProbabilities[i][j] = [(1 / (C1 * currentStd)), -2*currentStd*currentStd];
	        }

	        this.means[i] = means;
	    }

	    this.calculateProbabilities = calculateProbabilities;
	};

	/**
	 * function that predicts each row of the dataset (must be a matrix).
	 *
	 * @param dataset
	 * @returns {Array}
	 */
	NaiveBayes.prototype.predict = function (dataset) {
	    if(dataset[0].length === this.calculateProbabilities[0].length)
	        throw new RangeError('the dataset must have the same features as the training set');

	    var predictions = new Array(dataset.length);

	    for(var i = 0; i < predictions.length; ++i) {
	        predictions[i] = getCurrentClass(dataset[i], this.means, this.calculateProbabilities);
	    }

	    return predictions;
	};

	/**
	 * Function the retrieves a prediction with one case.
	 *
	 * @param currentCase
	 * @param mean - Precalculated means of each class trained
	 * @param classes - Precalculated value of each class (Prior probability and probability function of each feature)
	 * @returns {number}
	 */
	function getCurrentClass(currentCase, mean, classes) {
	    var maxProbability = 0;
	    var predictedClass = -1;

	    // going through all precalculated values for the classes
	    for(var i = 0; i < classes.length; ++i) {
	        var currentProbability = classes[i][0]; // initialize with the prior probability
	        for(var j = 1; j < classes[0][1].length + 1; ++j) {
	            currentProbability += calculateLogProbability(currentCase[j - 1], mean[i][j - 1], classes[i][j][0], classes[i][j][1]);
	        }

	        currentProbability = Math.exp(currentProbability);
	        if(currentProbability > maxProbability) {
	            maxProbability = currentProbability;
	            predictedClass = i;
	        }
	    }

	    return predictedClass;
	}

	/**
	 * Function that export the NaiveBayes model.
	 * @returns {{modelName: string, means: *, calculateProbabilities: *}}
	 */
	NaiveBayes.prototype.export = function () {
	    return {
	        modelName: "NaiveBayes",
	        means: this.means,
	        calculateProbabilities: this.calculateProbabilities
	    };
	};

	/**
	 * Function that create a Naive Bayes classifier with the given model.
	 * @param model
	 * @returns {NaiveBayes}
	 */
	NaiveBayes.load = function (model) {
	    if(model.modelName !== 'NaiveBayes')
	        throw new RangeError("The given model is invalid!");

	    return new NaiveBayes(true, model);
	};

	/**
	 * function that retrieves the probability of the feature given the class.
	 * @param value - value of the feature.
	 * @param mean - mean of the feature for the given class.
	 * @param C1 - precalculated value of (1 / (sqrt(2*pi) * std)).
	 * @param C2 - precalculated value of (2 * std^2) for the denominator of the exponential.
	 * @returns {number}
	 */
	function calculateLogProbability(value, mean, C1, C2) {
	    var value = value - mean;
	    return Math.log(C1 * Math.exp((value * value) / C2))
	}

	/**
	 * Function that retuns an array of matrices of the cases that belong to each class.
	 * @param X - dataset
	 * @param y - predictions
	 * @returns {Array}
	 */
	function separateClasses(X, y) {
	    var features = X.columns;

	    var classes = 0;
	    var totalPerClasses = new Array(100); // max upperbound of classes
	    for (var i = 0; i < y.length; i++) {
	        if(totalPerClasses[y[i]] === undefined) {
	            totalPerClasses[y[i]] = 0;
	            classes++;
	        }
	        totalPerClasses[y[i]]++;
	    }
	    var separatedClasses = new Array(classes);
	    var currentIndex = new Array(classes);
	    for(i = 0; i < classes; ++i) {
	        separatedClasses[i] = new Matrix(totalPerClasses[i], features);
	        currentIndex[i] = 0;
	    }
	    for(i = 0; i < X.rows; ++i) {
	        separatedClasses[y[i]].setRow(currentIndex[y[i]], X.getRow(i));
	        currentIndex[y[i]]++;
	    }
	    return separatedClasses;
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(107);
	module.exports.Decompositions = module.exports.DC = __webpack_require__(108);


/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';

	var Asplice = Array.prototype.splice,
	    Aconcat = Array.prototype.concat;

	// For performance : http://jsperf.com/clone-array-slice-vs-while-vs-for
	function slice(arr) {
	    var i = 0,
	        ii = arr.length,
	        result = new Array(ii);
	    for (; i < ii; i++) {
	        result[i] = arr[i];
	    }
	    return result;
	}

	/**
	 * Real matrix.
	 * @constructor
	 * @param {number|Array} nRows - Number of rows of the new matrix or a 2D array containing the data.
	 * @param {number|boolean} [nColumns] - Number of columns of the new matrix or a boolean specifying if the input array should be cloned
	 */
	function Matrix(nRows, nColumns) {
	    var i = 0, rows, columns, matrix, newInstance;
	    if (Array.isArray(nRows)) {
	        newInstance = nColumns;
	        matrix = newInstance ? slice(nRows) : nRows;
	        nRows = matrix.length;
	        nColumns = matrix[0].length;
	        if (typeof nColumns === 'undefined') {
	            throw new TypeError('Data must be a 2D array');
	        }
	        if (nRows > 0 && nColumns > 0) {
	            for (; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                } else if (newInstance) {
	                    matrix[i] = slice(matrix[i]);
	                }
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else if (typeof nRows === 'number') { // Create empty matrix
	        if (nRows > 0 && nColumns > 0) {
	            matrix = new Array(nRows);
	            for (; i < nRows; i++) {
	                matrix[i] = new Array(nColumns);
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else {
	        throw new TypeError('Invalid arguments');
	    }

	    Object.defineProperty(matrix, 'rows', {writable: true, value: nRows});
	    Object.defineProperty(matrix, 'columns', {writable: true, value: nColumns});

	    matrix.__proto__ = Matrix.prototype;

	    return matrix;
	}

	/**
	 * Constructs a Matrix with the chosen dimensions from a 1D array.
	 * @param {number} newRows - Number of rows
	 * @param {number} newColumns - Number of columns
	 * @param {Array} newData - A 1D array containing data for the matrix
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.from1DArray = function from1DArray(newRows, newColumns, newData) {
	    var length, data, i = 0;

	    length = newRows * newColumns;
	    if (length !== newData.length)
	        throw new RangeError('Data length does not match given dimensions');

	    data = new Array(newRows);
	    for (; i < newRows; i++) {
	        data[i] = newData.slice(i * newColumns, (i + 1) * newColumns);
	    }
	    return new Matrix(data);
	};

	/**
	 * Creates a row vector, a matrix with only one row.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.rowVector = function rowVector(newData) {
	    return new Matrix([newData]);
	};

	/**
	 * Creates a column vector, a matrix with only one column.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.columnVector = function columnVector(newData) {
	    var l = newData.length, vector = new Array(l);
	    for (var i = 0; i < l; i++)
	        vector[i] = [newData[i]];
	    return new Matrix(vector);
	};

	/**
	 * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.empty = function empty(rows, columns) {
	    return new Matrix(rows, columns);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to zero.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.zeros = function zeros(rows, columns) {
	    return Matrix.empty(rows, columns).fill(0);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to one.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.ones = function ones(rows, columns) {
	    return Matrix.empty(rows, columns).fill(1);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be randomly set using Math.random().
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} The new matrix
	 */
	Matrix.rand = function rand(rows, columns) {
	    var matrix = Matrix.empty(rows, columns);
	    for (var i = 0, ii = matrix.rows; i < ii; i++) {
	        for (var j = 0, jj = matrix.columns; j < jj; j++) {
	            matrix[i][j] = Math.random();
	        }
	    }
	    return matrix;
	};

	/**
	 * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and other will be 0.
	 * @param {number} n - Number of rows and columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.eye = function eye(n) {
	    var matrix = Matrix.zeros(n, n), l = matrix.rows;
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = 1;
	    }
	    return matrix;
	};

	/**
	 * Creates a diagonal matrix based on the given array.
	 * @param {Array} data - Array containing the data for the diagonal
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.diag = function diag(data) {
	    var l = data.length, matrix = Matrix.zeros(l, l);
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = data[i];
	    }
	    return matrix;
	};

	/**
	 * Creates an array of indices between two values
	 * @param {number} from
	 * @param {number} to
	 * @returns {Array}
	 */
	Matrix.indices = function indices(from, to) {
	    var vector = new Array(to - from);
	    for (var i = 0; i < vector.length; i++)
	        vector[i] = from++;
	    return vector;
	};

	// TODO DOC
	Matrix.stack = function stack(arg1) {
	    var i, j, k;
	    if (Matrix.isMatrix(arg1)) {
	        var rows = 0,
	            cols = 0;
	        for (i = 0; i < arguments.length; i++) {
	            rows += arguments[i].rows;
	            if (arguments[i].columns > cols)
	                cols = arguments[i].columns;
	        }

	        var r = Matrix.zeros(rows, cols);
	        var c = 0;
	        for (i = 0; i < arguments.length; i++) {
	            var current = arguments[i];
	            for (j = 0; j < current.rows; j++) {
	                for (k = 0; k < current.columns; k++)
	                    r[c][k] = current[j][k];
	                c++;
	            }
	        }
	        return r;
	    }
	    else if (Array.isArray(arg1)) {
	        var matrix = Matrix.empty(arguments.length, arg1.length);
	        for (i = 0; i < arguments.length; i++)
	            matrix.setRow(i, arguments[i]);
	        return matrix;
	    }
	};

	// TODO DOC
	Matrix.expand = function expand(base, count) {
	    var expansion = [];
	    for (var i = 0; i < count.length; i++)
	        for (var j = 0; j < count[i]; j++)
	            expansion.push(base[i]);
	    return new Matrix(expansion);
	};

	/**
	 * Check that the provided value is a Matrix and tries to instantiate one if not
	 * @param value - The value to check
	 * @returns {Matrix}
	 * @throws {TypeError}
	 */
	Matrix.checkMatrix = function checkMatrix(value) {
	    if (!value) {
	        throw new TypeError('Argument has to be a matrix');
	    }
	    if (value.klass !== 'Matrix') {
	        value = new Matrix(value);
	    }
	    return value;
	};

	/**
	 * Returns true if the argument is a Matrix, false otherwise
	 * @param value - The value to check
	 * @returns {boolean}
	 */
	Matrix.isMatrix = function isMatrix(value) {
	    return value ? value.klass === 'Matrix' : false;
	};

	/**
	 * @property {string} - The name of this class.
	 */
	Object.defineProperty(Matrix.prototype, 'klass', {
	    get: function klass() {
	        return 'Matrix';
	    }
	});

	/**
	 * @property {number} - The number of elements in the matrix.
	 */
	Object.defineProperty(Matrix.prototype, 'size', {
	    get: function size() {
	        return this.rows * this.columns;
	    }
	});

	/**
	 * @private
	 * Internal check that a row index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkRowIndex = function checkRowIndex(index) {
	    if (index < 0 || index > this.rows - 1)
	        throw new RangeError('Row index out of range.');
	};

	/**
	 * @private
	 * Internal check that a column index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkColumnIndex = function checkColumnIndex(index) {
	    if (index < 0 || index > this.columns - 1)
	        throw new RangeError('Column index out of range.');
	};

	/**
	 * @private
	 * Internal check that two matrices have the same dimensions
	 * @param {Matrix} otherMatrix
	 */
	Matrix.prototype.checkDimensions = function checkDimensions(otherMatrix) {
	    if ((this.rows !== otherMatrix.rows) || (this.columns !== otherMatrix.columns))
	        throw new RangeError('Matrices dimensions must be equal.');
	};

	/**
	 * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	 * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.apply = function apply(callback) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            callback.call(this, i, j);
	        }
	    }
	    return this;
	};

	/**
	 * Creates an exact and independent copy of the matrix
	 * @returns {Matrix}
	 */
	Matrix.prototype.clone = function clone() {
	    return new Matrix(this.to2DArray());
	};

	/**
	 * Returns a new 1D array filled row by row with the matrix values
	 * @returns {Array}
	 */
	Matrix.prototype.to1DArray = function to1DArray() {
	    return Aconcat.apply([], this);
	};

	/**
	 * Returns a 2D array containing a copy of the data
	 * @returns {Array}
	 */
	Matrix.prototype.to2DArray = function to2DArray() {
	    var l = this.rows, copy = new Array(l);
	    for (var i = 0; i < l; i++) {
	        copy[i] = slice(this[i]);
	    }
	    return copy;
	};

	/**
	 * @returns {boolean} true if the matrix has one row
	 */
	Matrix.prototype.isRowVector = function isRowVector() {
	    return this.rows === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one column
	 */
	Matrix.prototype.isColumnVector = function isColumnVector() {
	    return this.columns === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one row or one column
	 */
	Matrix.prototype.isVector = function isVector() {
	    return (this.rows === 1) || (this.columns === 1);
	};

	/**
	 * @returns {boolean} true if the matrix has the same number of rows and columns
	 */
	Matrix.prototype.isSquare = function isSquare() {
	    return this.rows === this.columns;
	};

	/**
	 * @returns {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	 */
	Matrix.prototype.isSymmetric = function isSymmetric() {
	    if (this.isSquare()) {
	        var l = this.rows;
	        for (var i = 0; i < l; i++) {
	            for (var j = 0; j <= i; j++) {
	                if (this[i][j] !== this[j][i]) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    }
	    return false;
	};

	/**
	 * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @param {number} value - The new value for the element
	 * @returns {Matrix} this
	 */
	Matrix.prototype.set = function set(rowIndex, columnIndex, value) {
	    this[rowIndex][columnIndex] = value;
	    return this;
	};

	/**
	 * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @returns {number}
	 */
	Matrix.prototype.get = function get(rowIndex, columnIndex) {
	    return this[rowIndex][columnIndex];
	};

	/**
	 * Fills the matrix with a given value. All elements will be set to this value.
	 * @param {number} value - New value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.fill = function fill(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = value;
	        }
	    }
	    return this;
	};

	/**
	 * Negates the matrix. All elements will be multiplied by (-1)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.neg = function neg() {
	    return this.mulS(-1);
	};

	/**
	 * Adds a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.add = function add(value) {
	    if (typeof value === 'number')
	        return this.addS(value);
	    value = Matrix.checkMatrix(value);
	        return this.addM(value);
	};

	/**
	 * Adds a scalar to each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addS = function addS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += value;
	        }
	    }
	    return this;
	};

	/**
	 * Adds the value of each element of matrix to the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addM = function addM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sub = function sub(value) {
	    if (typeof value === 'number')
	        return this.subS(value);
	    value = Matrix.checkMatrix(value);
	        return this.subM(value);
	};

	/**
	 * Subtracts a scalar from each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subS = function subS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= value;
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the value of each element of matrix from the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subM = function subM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mul = function mul(value) {
	    if (typeof value === 'number')
	        return this.mulS(value);
	    value = Matrix.checkMatrix(value);
	        return this.mulM(value);
	};

	/**
	 * Multiplies a scalar with each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulS = function mulS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= value;
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the value of each element of matrix with the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulM = function mulM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides by a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.div = function div(value) {
	    if (typeof value === 'number')
	        return this.divS(value);
	    value = Matrix.checkMatrix(value);
	        return this.divM(value);
	};

	/**
	 * Divides each element of the matrix by a scalar
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divS = function divS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= value;
	        }
	    }
	    return this;
	};

	/**
	 * Divides each element of this by the corresponding element of matrix
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divM = function divM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Returns a new array from the given row index
	 * @param {number} index - Row index
	 * @returns {Array}
	 */
	Matrix.prototype.getRow = function getRow(index) {
	    this.checkRowIndex(index);
	    return slice(this[index]);
	};

	/**
	 * Returns a new row vector from the given row index
	 * @param {number} index - Row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getRowVector = function getRowVector(index) {
	    return Matrix.rowVector(this.getRow(index));
	};

	/**
	 * Sets a row at the given index
	 * @param {number} index - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setRow = function setRow(index, array) {
	    this.checkRowIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    this[index] = slice(array);
	    return this;
	};

	/**
	 * Removes a row from the given index
	 * @param {number} index - Row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeRow = function removeRow(index) {
	    this.checkRowIndex(index);
	    if (this.rows === 1)
	        throw new RangeError('A matrix cannot have less than one row');
	    Asplice.call(this, index, 1);
	    this.rows -= 1;
	    return this;
	};

	/**
	 * Adds a row at the given index
	 * @param {number} [index = this.rows] - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRow = function addRow(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.rows;
	    }
	    if (index < 0 || index > this.rows)
	        throw new RangeError('Row index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    Asplice.call(this, index, 0, slice(array));
	    this.rows += 1;
	    return this;
	};

	/**
	 * Swaps two rows
	 * @param {number} row1 - First row index
	 * @param {number} row2 - Second row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapRows = function swapRows(row1, row2) {
	    this.checkRowIndex(row1);
	    this.checkRowIndex(row2);
	    var temp = this[row1];
	    this[row1] = this[row2];
	    this[row2] = temp;
	    return this;
	};

	/**
	 * Returns a new array from the given column index
	 * @param {number} index - Column index
	 * @returns {Array}
	 */
	Matrix.prototype.getColumn = function getColumn(index) {
	    this.checkColumnIndex(index);
	    var l = this.rows, column = new Array(l);
	    for (var i = 0; i < l; i++) {
	        column[i] = this[i][index];
	    }
	    return column;
	};

	/**
	 * Returns a new column vector from the given column index
	 * @param {number} index - Column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getColumnVector = function getColumnVector(index) {
	    return Matrix.columnVector(this.getColumn(index));
	};

	/**
	 * Sets a column at the given index
	 * @param {number} index - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setColumn = function setColumn(index, array) {
	    this.checkColumnIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i][index] = array[i];
	    }
	    return this;
	};

	/**
	 * Removes a column from the given index
	 * @param {number} index - Column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeColumn = function removeColumn(index) {
	    this.checkColumnIndex(index);
	    if (this.columns === 1)
	        throw new RangeError('A matrix cannot have less than one column');
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].splice(index, 1);
	    }
	    this.columns -= 1;
	    return this;
	};

	/**
	 * Adds a column at the given index
	 * @param {number} [index = this.columns] - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumn = function addColumn(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.columns;
	    }
	    if (index < 0 || index > this.columns)
	        throw new RangeError('Column index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i].splice(index, 0, array[i]);
	    }
	    this.columns += 1;
	    return this;
	};

	/**
	 * Swaps two columns
	 * @param {number} column1 - First column index
	 * @param {number} column2 - Second column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapColumns = function swapColumns(column1, column2) {
	    this.checkRowIndex(column1);
	    this.checkRowIndex(column2);
	    var l = this.rows, temp, row;
	    for (var i = 0; i < l; i++) {
	        row = this[i];
	        temp = row[column1];
	        row[column1] = row[column2];
	        row[column2] = temp;
	    }
	    return this;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkRowVector = function checkRowVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.columns)
	        throw new RangeError('vector size must be the same as the number of columns');
	    return vector;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkColumnVector = function checkColumnVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.rows)
	        throw new RangeError('vector size must be the same as the number of rows');
	    return vector;
	};

	/**
	 * Adds the values of a vector to each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRowVector = function addRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subRowVector = function subRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRowVector = function mulRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each row by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divRowVector = function divRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Adds the values of a vector to each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumnVector = function addColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subColumnVector = function subColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumnVector = function mulColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each column by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divColumnVector = function divColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a row with a scalar
	 * @param {number} index - Row index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRow = function mulRow(index, value) {
	    this.checkRowIndex(index);
	    var i = 0, l = this.columns;
	    for (; i < l; i++) {
	        this[index][i] *= value;
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a column with a scalar
	 * @param {number} index - Column index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumn = function mulColumn(index, value) {
	    this.checkColumnIndex(index);
	    var i = 0, l = this.rows;
	    for (; i < l; i++) {
	        this[i][index] *= value;
	    }
	};

	/**
	 * A matrix index
	 * @typedef {Object} MatrixIndex
	 * @property {number} row
	 * @property {number} column
	 */

	/**
	 * Returns the maximum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.max = function max() {
	    var v = -Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxIndex = function maxIndex() {
	    var v = -Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.min = function min() {
	    var v = Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minIndex = function minIndex() {
	    var v = Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.maxRow = function maxRow(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxRowIndex = function maxRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    var idx = {
	            row: index
	        };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.minRow = function minRow(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minRowIndex = function minRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: index,
	        column: 0
	    };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.maxColumn = function maxColumn(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxColumnIndex = function maxColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.minColumn = function minColumn(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minColumnIndex = function minColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns an array containing the diagonal values of the matrix
	 * @returns {Array}
	 */
	Matrix.prototype.diag = function diag() {
	    if (!this.isSquare())
	        throw new TypeError('Only square matrices have a diagonal.');
	    var diag = new Array(this.rows);
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        diag[i] = this[i][i];
	    }
	    return diag;
	};

	/**
	 * Returns the sum of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.sum = function sum() {
	    var v = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            v += this[i][j];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the mean of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.mean = function mean() {
	    return this.sum() / this.size;
	};

	/**
	 * Returns the product of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.prod = function prod() {
	    var prod = 1;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            prod *= this[i][j];
	        }
	    }
	    return prod;
	};

	/**
	 * Computes the cumulative sum of the matrix elements (in place, row by row)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.cumulativeSum = function cumulativeSum() {
	    var sum = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            sum += this[i][j];
	            this[i][j] = sum;
	        }
	    }
	    return this;
	};

	/**
	 * Computes the dot (scalar) product between the matrix and another
	 * @param {Matrix} other vector
	 * @returns {number}
	 */
	Matrix.prototype.dot = function dot(other) {
	    if (this.size !== other.size)
	        throw new RangeError('vectors do not have the same size');
	    var vector1 = this.to1DArray();
	    var vector2 = other.to1DArray();
	    var dot = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        dot += vector1[i] * vector2[i];
	    }
	    return dot;
	};

	/**
	 * Returns the matrix product between this and other
	 * @returns {Matrix}
	 */
	Matrix.prototype.mmul = function mmul(other) {
	    if (!Matrix.isMatrix(other))
	        throw new TypeError('parameter "other" must be a matrix');
	    if (this.columns !== other.rows)
	        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

	    var m = this.rows, n = this.columns, p = other.columns;
	    var result = new Matrix(m, p);

	    var Bcolj = new Array(n);
	    var i, j, k;
	    for (j = 0; j < p; j++) {
	        for (k = 0; k < n; k++)
	            Bcolj[k] = other[k][j];

	        for (i = 0; i < m; i++) {
	            var Arowi = this[i];

	            var s = 0;
	            for (k = 0; k < n; k++)
	                s += Arowi[k] * Bcolj[k];

	            result[i][j] = s;
	        }
	    }
	    return result;
	};

	/**
	 * Sorts the rows (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortRows = function sortRows(compareFunction) {
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].sort(compareFunction);
	    }
	    return this;
	};

	/**
	 * Sorts the columns (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortColumns = function sortColumns(compareFunction) {
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        this.setColumn(i, this.getColumn(i).sort(compareFunction));
	    }
	    return this;
	};

	/**
	 * Transposes the matrix and returns a new one containing the result
	 * @returns {Matrix}
	 */
	Matrix.prototype.transpose = function transpose() {
	    var result = new Matrix(this.columns, this.rows);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[j][i] = this[i][j];
	        }
	    }
	    return result;
	};

	/**
	 * Returns a subset of the matrix
	 * @param {number} startRow - First row index
	 * @param {number} endRow - Last row index
	 * @param {number} startColumn - First column index
	 * @param {number} endColumn - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrix = function subMatrix(startRow, endRow, startColumn, endColumn) {
	    if ((startRow > endRow) || (startColumn > endColumn) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range');
	    var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
	    for (var i = startRow; i <= endRow; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            newMatrix[i - startRow][j - startColumn] = this[i][j];
	        }
	    }
	    return newMatrix;
	};

	/**
	 * Returns a subset of the matrix based on an array of row indices
	 * @param {Array} indices - Array containing the row indices
	 * @param {number} [startColumn = 0] - First column index
	 * @param {number} [endColumn = this.columns-1] - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixRow = function subMatrixRow(indices, startColumn, endColumn) {
	    if (typeof startColumn === 'undefined') {
	        startColumn = 0;
	        endColumn = this.columns - 1;
	    } else if (typeof endColumn === 'undefined') {
	        endColumn = this.columns - 1;
	    }
	    if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, rows = this.rows,
	        X = new Matrix(l, endColumn - startColumn + 1);
	    for (var i = 0; i < l; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            if ((indices[i] < 0) || (indices[i] >= rows))
	                throw new RangeError('Argument out of range.');
	            X[i][j - startColumn] = this[indices[i]][j];
	        }
	    }
	    return X;
	};

	/**
	 * Returns a subset of the matrix based on an array of column indices
	 * @param {Array} indices - Array containing the column indices
	 * @param {number} [startRow = 0] - First row index
	 * @param {number} [endRow = this.rows-1] - Last row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixColumn = function subMatrixColumn(indices, startRow, endRow) {
	    if (typeof startRow === 'undefined') {
	        startRow = 0;
	        endRow = this.rows - 1;
	    } else if (typeof endRow === 'undefined') {
	        endRow = this.rows - 1;
	    }
	    if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, columns = this.columns,
	        X = new Matrix(endRow - startRow + 1, l);
	    for (var i = 0; i < l; i++) {
	        for (var j = startRow; j <= endRow; j++) {
	            if ((indices[i] < 0) || (indices[i] >= columns))
	                throw new RangeError('Argument out of range.');
	            X[j - startRow][i] = this[j][indices[i]];
	        }
	    }
	    return X;
	};

	/**
	 * Returns the trace of the matrix (sum of the diagonal elements)
	 * @returns {number}
	 */
	Matrix.prototype.trace = function trace() {
	    if (!this.isSquare())
	        throw new TypeError('The matrix is not square');
	    var trace = 0, i = 0, l = this.rows;
	    for (; i < l; i++) {
	        trace += this[i][i];
	    }
	    return trace;
	};

	/**
	 * Sets each element of the matrix to its absolute value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.abs = function abs() {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = Math.abs(this[i][j]);
	        }
	    }
	};

	module.exports = Matrix;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(107);

	var SingularValueDecomposition = __webpack_require__(109);
	var EigenvalueDecomposition = __webpack_require__(111);
	var LuDecomposition = __webpack_require__(112);
	var QrDecomposition = __webpack_require__(113);
	var CholeskyDecomposition = __webpack_require__(114);

	function inverse(matrix) {
	    return solve(matrix, Matrix.eye(matrix.rows));
	}

	Matrix.prototype.inverse = function () {
	    return inverse(this);
	};

	function solve(leftHandSide, rightHandSide) {
	    return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
	}

	Matrix.prototype.solve = function (other) {
	    return solve(this, other);
	};

	module.exports = {
	    SingularValueDecomposition: SingularValueDecomposition,
	    SVD: SingularValueDecomposition,
	    EigenvalueDecomposition: EigenvalueDecomposition,
	    EVD: EigenvalueDecomposition,
	    LuDecomposition: LuDecomposition,
	    LU: LuDecomposition,
	    QrDecomposition: QrDecomposition,
	    QR: QrDecomposition,
	    CholeskyDecomposition: CholeskyDecomposition,
	    CHO: CholeskyDecomposition,
	    inverse: inverse,
	    solve: solve
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(107);
	var hypotenuse = __webpack_require__(110).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	function SingularValueDecomposition(value, options) {
	    if (!(this instanceof SingularValueDecomposition)) {
	        return new SingularValueDecomposition(value, options);
	    }
	    value = Matrix.checkMatrix(value);

	    options = options || {};

	    var a = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        nu = Math.min(m, n);

	    var wantu = true, wantv = true;
	    if (options.computeLeftSingularVectors === false)
	        wantu = false;
	    if (options.computeRightSingularVectors === false)
	        wantv = false;
	    var autoTranspose = options.autoTranspose === true;

	    var swapped = false;
	    if (m < n) {
	        if (!autoTranspose) {
	            console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	        } else {
	            a = a.transpose();
	            m = a.rows;
	            n = a.columns;
	            swapped = true;
	            var aux = wantu;
	            wantu = wantv;
	            wantv = aux;
	        }
	    }

	    var s = new Array(Math.min(m + 1, n)),
	        U = Matrix.zeros(m, nu),
	        V = Matrix.zeros(n, n),
	        e = new Array(n),
	        work = new Array(m);

	    var nct = Math.min(m - 1, n);
	    var nrt = Math.max(0, Math.min(n - 2, m));

	    var i, j, k, p, t, ks, f, cs, sn, max, kase,
	        scale, sp, spm1, epm1, sk, ek, b, c, shift, g;

	    for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	        if (k < nct) {
	            s[k] = 0;
	            for (i = k; i < m; i++) {
	                s[k] = hypotenuse(s[k], a[i][k]);
	            }
	            if (s[k] !== 0) {
	                if (a[k][k] < 0) {
	                    s[k] = -s[k];
	                }
	                for (i = k; i < m; i++) {
	                    a[i][k] /= s[k];
	                }
	                a[k][k] += 1;
	            }
	            s[k] = -s[k];
	        }

	        for (j = k + 1; j < n; j++) {
	            if ((k < nct) && (s[k] !== 0)) {
	                t = 0;
	                for (i = k; i < m; i++) {
	                    t += a[i][k] * a[i][j];
	                }
	                t = -t / a[k][k];
	                for (i = k; i < m; i++) {
	                    a[i][j] += t * a[i][k];
	                }
	            }
	            e[j] = a[k][j];
	        }

	        if (wantu && (k < nct)) {
	            for (i = k; i < m; i++) {
	                U[i][k] = a[i][k];
	            }
	        }

	        if (k < nrt) {
	            e[k] = 0;
	            for (i = k + 1; i < n; i++) {
	                e[k] = hypotenuse(e[k], e[i]);
	            }
	            if (e[k] !== 0) {
	                if (e[k + 1] < 0)
	                    e[k] = -e[k];
	                for (i = k + 1; i < n; i++) {
	                    e[i] /= e[k];
	                }
	                e[k + 1] += 1;
	            }
	            e[k] = -e[k];
	            if ((k + 1 < m) && (e[k] !== 0)) {
	                for (i = k + 1; i < m; i++) {
	                    work[i] = 0;
	                }
	                for (j = k + 1; j < n; j++) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] += e[j] * a[i][j];
	                    }
	                }
	                for (j = k + 1; j < n; j++) {
	                    t = -e[j] / e[k + 1];
	                    for (i = k + 1; i < m; i++) {
	                        a[i][j] += t * work[i];
	                    }
	                }
	            }
	            if (wantv) {
	                for (i = k + 1; i < n; i++) {
	                    V[i][k] = e[i];
	                }
	            }
	        }
	    }

	    p = Math.min(n, m + 1);
	    if (nct < n) {
	        s[nct] = a[nct][nct];
	    }
	    if (m < p) {
	        s[p - 1] = 0;
	    }
	    if (nrt + 1 < p) {
	        e[nrt] = a[nrt][p - 1];
	    }
	    e[p - 1] = 0;

	    if (wantu) {
	        for (j = nct; j < nu; j++) {
	            for (i = 0; i < m; i++) {
	                U[i][j] = 0;
	            }
	            U[j][j] = 1;
	        }
	        for (k = nct - 1; k >= 0; k--) {
	            if (s[k] !== 0) {
	                for (j = k + 1; j < nu; j++) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += U[i][k] * U[i][j];
	                    }
	                    t = -t / U[k][k];
	                    for (i = k; i < m; i++) {
	                        U[i][j] += t * U[i][k];
	                    }
	                }
	                for (i = k; i < m; i++) {
	                    U[i][k] = -U[i][k];
	                }
	                U[k][k] = 1 + U[k][k];
	                for (i = 0; i < k - 1; i++) {
	                    U[i][k] = 0;
	                }
	            } else {
	                for (i = 0; i < m; i++) {
	                    U[i][k] = 0;
	                }
	                U[k][k] = 1;
	            }
	        }
	    }

	    if (wantv) {
	        for (k = n - 1; k >= 0; k--) {
	            if ((k < nrt) && (e[k] !== 0)) {
	                for (j = k + 1; j < n; j++) {
	                    t = 0;
	                    for (i = k + 1; i < n; i++) {
	                        t += V[i][k] * V[i][j];
	                    }
	                    t = -t / V[k + 1][k];
	                    for (i = k + 1; i < n; i++) {
	                        V[i][j] += t * V[i][k];
	                    }
	                }
	            }
	            for (i = 0; i < n; i++) {
	                V[i][k] = 0;
	            }
	            V[k][k] = 1;
	        }
	    }

	    var pp = p - 1,
	        iter = 0,
	        eps = Math.pow(2, -52);
	    while (p > 0) {
	        for (k = p - 2; k >= -1; k--) {
	            if (k === -1) {
	                break;
	            }
	            if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                e[k] = 0;
	                break;
	            }
	        }
	        if (k === p - 2) {
	            kase = 4;
	        } else {
	            for (ks = p - 1; ks >= k; ks--) {
	                if (ks === k) {
	                    break;
	                }
	                t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                if (Math.abs(s[ks]) <= eps * t) {
	                    s[ks] = 0;
	                    break;
	                }
	            }
	            if (ks === k) {
	                kase = 3;
	            } else if (ks === p - 1) {
	                kase = 1;
	            } else {
	                kase = 2;
	                k = ks;
	            }
	        }

	        k++;

	        switch (kase) {
	            case 1: {
	                f = e[p - 2];
	                e[p - 2] = 0;
	                for (j = p - 2; j >= k; j--) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    if (j !== k) {
	                        f = -sn * e[j - 1];
	                        e[j - 1] = cs * e[j - 1];
	                    }
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][p - 1];
	                            V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                            V[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 2 : {
	                f = e[k - 1];
	                e[k - 1] = 0;
	                for (j = k; j < p; j++) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    f = -sn * e[j];
	                    e[j] = cs * e[j];
	                    if (wantu) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][k - 1];
	                            U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 3 : {
	                scale = Math.max(Math.max(Math.max(Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2])), Math.abs(e[p - 2])), Math.abs(s[k])), Math.abs(e[k]));
	                sp = s[p - 1] / scale;
	                spm1 = s[p - 2] / scale;
	                epm1 = e[p - 2] / scale;
	                sk = s[k] / scale;
	                ek = e[k] / scale;
	                b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                c = (sp * epm1) * (sp * epm1);
	                shift = 0;
	                if ((b !== 0) || (c !== 0)) {
	                    shift = Math.sqrt(b * b + c);
	                    if (b < 0) {
	                        shift = -shift;
	                    }
	                    shift = c / (b + shift);
	                }
	                f = (sk + sp) * (sk - sp) + shift;
	                g = sk * ek;
	                for (j = k; j < p - 1; j++) {
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    if (j !== k) {
	                        e[j - 1] = t;
	                    }
	                    f = cs * s[j] + sn * e[j];
	                    e[j] = cs * e[j] - sn * s[j];
	                    g = sn * s[j + 1];
	                    s[j + 1] = cs * s[j + 1];
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][j + 1];
	                            V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                            V[i][j] = t;
	                        }
	                    }
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    s[j] = t;
	                    f = cs * e[j] + sn * s[j + 1];
	                    s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                    g = sn * e[j + 1];
	                    e[j + 1] = cs * e[j + 1];
	                    if (wantu && (j < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][j + 1];
	                            U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                e[p - 2] = f;
	                iter = iter + 1;
	                break;
	            }
	            case 4: {
	                if (s[k] <= 0) {
	                    s[k] = (s[k] < 0 ? -s[k] : 0);
	                    if (wantv) {
	                        for (i = 0; i <= pp; i++) {
	                            V[i][k] = -V[i][k];
	                        }
	                    }
	                }
	                while (k < pp) {
	                    if (s[k] >= s[k + 1]) {
	                        break;
	                    }
	                    t = s[k];
	                    s[k] = s[k + 1];
	                    s[k + 1] = t;
	                    if (wantv && (k < n - 1)) {
	                        for (i = 0; i < n; i++) {
	                            t = V[i][k + 1];
	                            V[i][k + 1] = V[i][k];
	                            V[i][k] = t;
	                        }
	                    }
	                    if (wantu && (k < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = U[i][k + 1];
	                            U[i][k + 1] = U[i][k];
	                            U[i][k] = t;
	                        }
	                    }
	                    k++;
	                }
	                iter = 0;
	                p--;
	                break;
	            }
	        }
	    }

	    if (swapped) {
	        var tmp = V;
	        V = U;
	        U = tmp;
	    }

	    this.m = m;
	    this.n = n;
	    this.s = s;
	    this.U = U;
	    this.V = V;
	}

	SingularValueDecomposition.prototype = {
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    },
	    get norm2() {
	        return this.s[0];
	    },
	    get rank() {
	        var eps = Math.pow(2, -52),
	            tol = Math.max(this.m, this.n) * this.s[0] * eps,
	            r = 0,
	            s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    },
	    get diagonal() {
	        return this.s;
	    },
	    // https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
	    get threshold() {
	        return (Math.pow(2, -52) / 2) * Math.max(this.m, this.n) * this.s[0];
	    },
	    get leftSingularVectors() {
	        return this.U;
	    },
	    get rightSingularVectors() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    },
	    solve: function (value) {

	        var Y = value,
	            e = this.threshold,
	            scols = this.s.length,
	            Ls = Matrix.zeros(scols, scols),
	            i;

	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }


	        var VL = this.V.mmul(Ls),
	            vrows = this.V.rows,
	            urows = this.U.rows,
	            VLU = Matrix.zeros(vrows, urows),
	            j, k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * this.U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }

	        return VLU.mmul(Y);
	    },
	    solveForDiagonal: function (value) {
	        return this.solve(Matrix.diag(value));
	    },
	    inverse: function () {
	        var e = this.threshold,
	            vrows = this.V.rows,
	            vcols = this.V.columns,
	            X = new Matrix(vrows, this.s.length),
	            i, j;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = this.V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }

	        var urows = this.U.rows,
	            ucols = this.U.columns,
	            Y = new Matrix(vrows, urows),
	            k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * this.U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }

	        return Y;
	    }
	};

	module.exports = SingularValueDecomposition;


/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';

	exports.hypotenuse = function hypotenuse(a, b) {
	    var r;
	    if (Math.abs(a) > Math.abs(b)) {
	        r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(107);
	var hypotenuse = __webpack_require__(110).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	function EigenvalueDecomposition(matrix) {
	    if (!(this instanceof EigenvalueDecomposition)) {
	        return new EigenvalueDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);
	    if (!matrix.isSquare()) {
	        throw new Error('Matrix is not a square matrix');
	    }

	    var n = matrix.columns,
	        V = Matrix.zeros(n, n),
	        d = new Array(n),
	        e = new Array(n),
	        value = matrix,
	        i, j;

	    if (matrix.isSymmetric()) {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                V[i][j] = value[i][j];
	            }
	        }
	        tred2(n, e, d, V);
	        tql2(n, e, d, V);
	    }
	    else {
	        var H = Matrix.zeros(n, n),
	            ort = new Array(n);
	        for (j = 0; j < n; j++) {
	            for (i = 0; i < n; i++) {
	                H[i][j] = value[i][j];
	            }
	        }
	        orthes(n, H, ort, V);
	        hqr2(n, e, d, V, H);
	    }

	    this.n = n;
	    this.e = e;
	    this.d = d;
	    this.V = V;
	}

	EigenvalueDecomposition.prototype = {
	    get realEigenvalues() {
	        return this.d;
	    },
	    get imaginaryEigenvalues() {
	        return this.e;
	    },
	    get eigenvectorMatrix() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        var n = this.n,
	            e = this.e,
	            d = this.d,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            }
	            else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	};

	function tred2(n, e, d, V) {

	    var f, g, h, i, j, k,
	        hh, scale;

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }

	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }

	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }

	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }

	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }

	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }

	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }

	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }

	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }

	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }

	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}

	function tql2(n, e, d, V) {

	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;

	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }

	    e[n - 1] = 0;

	    var f = 0,
	        tst1 = 0,
	        eps = Math.pow(2, -52);

	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }

	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;

	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }

	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }

	                f = f + h;

	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);

	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }

	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;

	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }

	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }

	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}

	function orthes(n, H, ort, V) {

	    var low = 0,
	        high = n - 1,
	        f, g, h, i, j, m,
	        scale;

	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }

	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }

	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }

	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;

	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }

	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }

	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }

	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }

	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }

	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }

	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }

	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }

	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}

	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1,
	        low = 0,
	        high = nn - 1,
	        eps = Math.pow(2, -52),
	        exshift = 0,
	        norm = 0,
	        p = 0,
	        q = 0,
	        r = 0,
	        s = 0,
	        z = 0,
	        iter = 0,
	        i, j, k, l, m, t, w, x, y,
	        ra, sa, vr, vi,
	        notlast, cdivres;

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }

	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }

	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }

	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];

	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;

	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }

	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }

	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }

	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }

	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }

	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }

	            iter = iter + 1;

	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }

	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }

	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }

	                if (x === 0) {
	                    break;
	                }

	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }

	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }

	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;

	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }

	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }

	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }

	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }

	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }

	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }

	    if (norm === 0) {
	        return;
	    }

	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];

	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }

	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }

	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;

	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }

	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }

	                w = H[i][i] - p;

	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }

	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }

	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}

	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    }
	    else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}

	module.exports = EigenvalueDecomposition;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(107);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	function LuDecomposition(matrix) {
	    if (!(this instanceof LuDecomposition)) {
	        return new LuDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);

	    var lu = matrix.clone(),
	        rows = lu.rows,
	        columns = lu.columns,
	        pivotVector = new Array(rows),
	        pivotSign = 1,
	        i, j, k, p, s, t, v,
	        LUrowi, LUcolj, kmax;

	    for (i = 0; i < rows; i++) {
	        pivotVector[i] = i;
	    }

	    LUcolj = new Array(rows);

	    for (j = 0; j < columns; j++) {

	        for (i = 0; i < rows; i++) {
	            LUcolj[i] = lu[i][j];
	        }

	        for (i = 0; i < rows; i++) {
	            LUrowi = lu[i];
	            kmax = Math.min(i, j);
	            s = 0;
	            for (k = 0; k < kmax; k++) {
	                s += LUrowi[k] * LUcolj[k];
	            }
	            LUrowi[j] = LUcolj[i] -= s;
	        }

	        p = j;
	        for (i = j + 1; i < rows; i++) {
	            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                p = i;
	            }
	        }

	        if (p !== j) {
	            for (k = 0; k < columns; k++) {
	                t = lu[p][k];
	                lu[p][k] = lu[j][k];
	                lu[j][k] = t;
	            }

	            v = pivotVector[p];
	            pivotVector[p] = pivotVector[j];
	            pivotVector[j] = v;

	            pivotSign = -pivotSign;
	        }

	        if (j < rows && lu[j][j] !== 0) {
	            for (i = j + 1; i < rows; i++) {
	                lu[i][j] /= lu[j][j];
	            }
	        }
	    }

	    this.LU = lu;
	    this.pivotVector = pivotVector;
	    this.pivotSign = pivotSign;
	}

	LuDecomposition.prototype = {
	    isSingular: function () {
	        var data = this.LU,
	            col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    },
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare())
	            throw new Error('Matrix must be square');
	        var determinant = this.pivotSign, col = data.columns;
	        for (var j = 0; j < col; j++)
	            determinant *= data[j][j];
	        return determinant;
	    },
	    get lowerTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get upperTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var lu = this.LU,
	            rows = lu.rows;

	        if (rows !== value.rows)
	            throw new Error('Invalid matrix dimensions');
	        if (this.isSingular())
	            throw new Error('LU matrix is singular');

	        var count = value.columns,
	            X = value.subMatrixRow(this.pivotVector, 0, count - 1),
	            columns = lu.columns,
	            i, j, k;

	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = LuDecomposition;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(107);
	var hypotenuse = __webpack_require__(110).hypotenuse;

	//https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	function QrDecomposition(value) {
	    if (!(this instanceof QrDecomposition)) {
	        return new QrDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);

	    var qr = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        rdiag = new Array(n),
	        i, j, k, s;

	    for (k = 0; k < n; k++) {
	        var nrm = 0;
	        for (i = k; i < m; i++) {
	            nrm = hypotenuse(nrm, qr[i][k]);
	        }
	        if (nrm !== 0) {
	            if (qr[k][k] < 0) {
	                nrm = -nrm;
	            }
	            for (i = k; i < m; i++) {
	                qr[i][k] /= nrm;
	            }
	            qr[k][k] += 1;
	            for (j = k + 1; j < n; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * qr[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    qr[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        rdiag[k] = -nrm;
	    }

	    this.QR = qr;
	    this.Rdiag = rdiag;
	}

	QrDecomposition.prototype = {
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var qr = this.QR,
	            m = qr.rows;

	        if (value.rows !== m)
	            throw new Error('Matrix row dimensions must agree');
	        if (!this.isFullRank())
	            throw new Error('Matrix is rank deficient');

	        var count = value.columns,
	            X = value.clone(),
	            n = qr.columns,
	            i, j, k, s;

	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }

	        return X.subMatrix(0, n - 1, 0, count - 1);
	    },
	    isFullRank: function () {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    },
	    get upperTriangularFactor() {
	        var qr = this.QR,
	            n = qr.columns,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get orthogonalFactor() {
	        var qr = this.QR,
	            rows = qr.rows,
	            columns = qr.columns,
	            X = new Matrix(rows, columns),
	            i, j, k, s;

	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }

	                    s = -s / qr[k][k];

	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = QrDecomposition;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(107);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	function CholeskyDecomposition(value) {
	    if (!(this instanceof CholeskyDecomposition)) {
	        return new CholeskyDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);
	    if (!value.isSymmetric())
	        throw new Error('Matrix is not symmetric');

	    var a = value,
	        dimension = a.rows,
	        l = new Matrix(dimension, dimension),
	        positiveDefinite = true,
	        i, j, k;

	    for (j = 0; j < dimension; j++) {
	        var Lrowj = l[j];
	        var d = 0;
	        for (k = 0; k < j; k++) {
	            var Lrowk = l[k];
	            var s = 0;
	            for (i = 0; i < k; i++) {
	                s += Lrowk[i] * Lrowj[i];
	            }
	            Lrowj[k] = s = (a[j][k] - s) / l[k][k];
	            d = d + s * s;
	        }

	        d = a[j][j] - d;

	        positiveDefinite &= (d > 0);
	        l[j][j] = Math.sqrt(Math.max(d, 0));
	        for (k = j + 1; k < dimension; k++) {
	            l[j][k] = 0;
	        }
	    }

	    if (!positiveDefinite) {
	        throw new Error('Matrix is not positive definite');
	    }

	    this.L = l;
	}

	CholeskyDecomposition.prototype = {
	    get leftTriangularFactor() {
	        return this.L;
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var l = this.L,
	            dimension = l.rows;

	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }

	        var count = value.columns,
	            B = value.clone(),
	            i, j, k;

	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        return B;
	    }
	};

	module.exports = CholeskyDecomposition;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(116);
	exports.Utils = __webpack_require__(126);
	exports.OPLS = __webpack_require__(127);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = PLS;
	var Matrix = __webpack_require__(117);
	var Utils = __webpack_require__(126);

	/**
	 * Retrieves the sum at the column of the given matrix.
	 * @param matrix
	 * @param column
	 * @returns {number}
	 */
	function getColSum(matrix, column) {
	    var sum = 0;
	    for (var i = 0; i < matrix.rows; i++) {
	        sum += matrix[i][column];
	    }
	    return sum;
	}

	/**
	 * Function that returns the index where the sum of each
	 * column vector is maximum.
	 * @param {Matrix} data
	 * @returns {number} index of the maximum
	 */
	function maxSumColIndex(data) {
	    var maxIndex = 0;
	    var maxSum = -Infinity;
	    for(var i = 0; i < data.columns; ++i) {
	        var currentSum = getColSum(data, i);
	        if(currentSum > maxSum) {
	            maxSum = currentSum;
	            maxIndex = i;
	        }
	    }
	    return maxIndex;
	}

	/**
	 * Constructor of the PLS model.
	 * @param reload - used for load purposes.
	 * @param model - used for load purposes.
	 * @constructor
	 */
	function PLS(reload, model) {
	    if(reload) {
	        this.E = model.E;
	        this.F = model.F;
	        this.ssqYcal = model.ssqYcal;
	        this.R2X = model.R2X;
	        this.ymean = model.ymean;
	        this.ystd = model.ystd;
	        this.PBQ = model.PBQ;
	        this.T = model.T;
	        this.P = model.P;
	        this.U = model.U;
	        this.Q = model.Q;
	        this.W = model.W;
	        this.B = model.B;
	    }
	}

	/**
	 * Function that fit the model with the given data and predictions, in this function is calculated the
	 * following outputs:
	 *
	 * T - Score matrix of X
	 * P - Loading matrix of X
	 * U - Score matrix of Y
	 * Q - Loading matrix of Y
	 * B - Matrix of regression coefficient
	 * W - Weight matrix of X
	 *
	 * @param {Matrix} trainingSet - Dataset to be apply the model
	 * @param {Matrix} predictions - Predictions over each case of the dataset
	 * @param {Number} options - recieves the latentVectors and the tolerance of each step of the PLS
	 */
	PLS.prototype.train = function (trainingSet, predictions, options) {

	    if(options === undefined) options = {};

	    var latentVectors = options.latentVectors;
	    if(latentVectors === undefined || isNaN(latentVectors)) {
	        throw new RangeError("Latent vector must be a number.");
	    }

	    var tolerance = options.tolerance;
	    if(tolerance === undefined || isNaN(tolerance)) {
	        throw new RangeError("Tolerance must be a number");
	    }

	    if(trainingSet.length !== predictions.length)
	        throw new RangeError("The number of predictions and elements in the dataset must be the same");

	    //var tolerance = 1e-9;
	    var X = Utils.featureNormalize(Matrix(trainingSet, true)).result;
	    var resultY = Utils.featureNormalize(Matrix(predictions, true));
	    this.ymean = resultY.means.neg();
	    this.ystd = resultY.std;
	    var Y = resultY.result;

	    var rx = X.rows;
	    var cx = X.columns;
	    var ry = Y.rows;
	    var cy = Y.columns;

	    if(rx != ry) {
	        throw new RangeError("dataset cases is not the same as the predictions");
	    }

	    var ssqXcal = X.clone().mul(X).sum(); // for the r²
	    var sumOfSquaresY = Y.clone().mul(Y).sum();

	    var n = latentVectors; //Math.max(cx, cy); // components of the pls
	    var T = Matrix.zeros(rx, n);
	    var P = Matrix.zeros(cx, n);
	    var U = Matrix.zeros(ry, n);
	    var Q = Matrix.zeros(cy, n);
	    var B = Matrix.zeros(n, n);
	    var W = P.clone();
	    var k = 0;
	    var R2X = new Array(n);

	    while(Utils.norm(Y) > tolerance && k < n) {
	        var transposeX = X.transpose();
	        var transposeY = Y.transpose();

	        var tIndex = maxSumColIndex(X.clone().mulM(X));
	        var uIndex = maxSumColIndex(Y.clone().mulM(Y));

	        var t1 = X.getColumnVector(tIndex);
	        var u = Y.getColumnVector(uIndex);
	        var t = Matrix.zeros(rx, 1);

	        while(Utils.norm(t1.clone().sub(t)) > tolerance) {
	            var w = transposeX.mmul(u);
	            w.div(Utils.norm(w));
	            t = t1;
	            t1 = X.mmul(w);
	            var q = transposeY.mmul(t1);
	            q.div(Utils.norm(q));
	            u = Y.mmul(q);
	        }

	        t = t1;
	        var num = transposeX.mmul(t);
	        var den = (t.transpose().mmul(t))[0][0];
	        var p = num.div(den);
	        var pnorm = Utils.norm(p);
	        p.div(pnorm);
	        t.mul(pnorm);
	        w.mul(pnorm);

	        num = u.transpose().mmul(t);
	        den = (t.transpose().mmul(t))[0][0];
	        var b = (num.div(den))[0][0];
	        X.sub(t.mmul(p.transpose()));
	        Y.sub(t.clone().mul(b).mmul(q.transpose()));

	        T.setColumn(k, t);
	        P.setColumn(k, p);
	        U.setColumn(k, u);
	        Q.setColumn(k, q);
	        W.setColumn(k, w);

	        B[k][k] = b;
	        k++;
	    }

	    k--;
	    T = T.subMatrix(0, T.rows - 1, 0, k);
	    P = P.subMatrix(0, P.rows - 1, 0, k);
	    U = U.subMatrix(0, U.rows - 1, 0, k);
	    Q = Q.subMatrix(0, Q.rows - 1, 0, k);
	    W = W.subMatrix(0, W.rows - 1, 0, k);
	    B = B.subMatrix(0, k, 0, k);

	    this.R2X = t.transpose().mmul(t).mmul(p.transpose().mmul(p)).divS(ssqXcal)[0][0];

	    // TODO: review of R2Y
	    //this.R2Y = t.transpose().mmul(t).mul(q[k][0]*q[k][0]).divS(ssqYcal)[0][0];

	    this.ssqYcal = sumOfSquaresY;
	    this.E = X;
	    this.F = Y;
	    this.T = T;
	    this.P = P;
	    this.U = U;
	    this.Q = Q;
	    this.W = W;
	    this.B = B;
	    this.PBQ = P.mmul(B).mmul(Q.transpose());
	};

	/**
	 * Function that predict the behavior of the given dataset.
	 * @param dataset - data to be predicted.
	 * @returns {Matrix} - predictions of each element of the dataset.
	 */
	PLS.prototype.predict = function (dataset) {
	    var X = Matrix(dataset, true);
	    var normalization = Utils.featureNormalize(X);
	    X = normalization.result;
	    var Y = X.mmul(this.PBQ);
	    Y.mulRowVector(this.ystd);
	    Y.addRowVector(this.ymean);
	    return Y;
	};

	/**
	 * Function that returns the explained variance on training of the PLS model.
	 * @returns {number}
	 */
	PLS.prototype.getExplainedVariance = function () {
	    return this.R2X;
	};

	/**
	 * Load a PLS model from an Object
	 * @param model
	 * @returns {PLS} - PLS object from the given model
	 */
	PLS.load = function (model) {
	    if(model.modelName !== 'PLS')
	        throw new RangeError("The current model is invalid!");

	    return new PLS(true, model);
	};

	/**
	 * Function that exports a PLS model to an Object.
	 * @returns {{modelName: string, ymean: *, ystd: *, PBQ: *}} model.
	 */
	PLS.prototype.export = function () {
	    return {
	        modelName: "PLS",
	        E: this.E,
	        F: this.F,
	        R2X: this.R2X,
	        ssqYcal: this.ssqYcal,
	        ymean: this.ymean,
	        ystd: this.ystd,
	        PBQ: this.PBQ,
	        T: this.T,
	        P: this.P,
	        U: this.U,
	        Q: this.Q,
	        W: this.W,
	        B: this.B
	    };
	};


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(118);
	module.exports.Decompositions = module.exports.DC = __webpack_require__(119);


/***/ },
/* 118 */
/***/ function(module, exports) {

	'use strict';

	var Asplice = Array.prototype.splice,
	    Aconcat = Array.prototype.concat;

	// For performance : http://jsperf.com/clone-array-slice-vs-while-vs-for
	function slice(arr) {
	    var i = 0,
	        ii = arr.length,
	        result = new Array(ii);
	    for (; i < ii; i++) {
	        result[i] = arr[i];
	    }
	    return result;
	}

	/**
	 * Real matrix.
	 * @constructor
	 * @param {number|Array} nRows - Number of rows of the new matrix or a 2D array containing the data.
	 * @param {number|boolean} [nColumns] - Number of columns of the new matrix or a boolean specifying if the input array should be cloned
	 */
	function Matrix(nRows, nColumns) {
	    var i = 0, rows, columns, matrix, newInstance;
	    if (Array.isArray(nRows)) {
	        newInstance = nColumns;
	        matrix = newInstance ? slice(nRows) : nRows;
	        nRows = matrix.length;
	        nColumns = matrix[0].length;
	        if (typeof nColumns === 'undefined') {
	            throw new TypeError('Data must be a 2D array');
	        }
	        if (nRows > 0 && nColumns > 0) {
	            for (; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                } else if (newInstance) {
	                    matrix[i] = slice(matrix[i]);
	                }
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else if (typeof nRows === 'number') { // Create empty matrix
	        if (nRows > 0 && nColumns > 0) {
	            matrix = new Array(nRows);
	            for (; i < nRows; i++) {
	                matrix[i] = new Array(nColumns);
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else {
	        throw new TypeError('Invalid arguments');
	    }

	    Object.defineProperty(matrix, 'rows', {writable: true, value: nRows});
	    Object.defineProperty(matrix, 'columns', {writable: true, value: nColumns});

	    matrix.__proto__ = Matrix.prototype;

	    return matrix;
	}

	/**
	 * Constructs a Matrix with the chosen dimensions from a 1D array.
	 * @param {number} newRows - Number of rows
	 * @param {number} newColumns - Number of columns
	 * @param {Array} newData - A 1D array containing data for the matrix
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.from1DArray = function from1DArray(newRows, newColumns, newData) {
	    var length, data, i = 0;

	    length = newRows * newColumns;
	    if (length !== newData.length)
	        throw new RangeError('Data length does not match given dimensions');

	    data = new Array(newRows);
	    for (; i < newRows; i++) {
	        data[i] = newData.slice(i * newColumns, (i + 1) * newColumns);
	    }
	    return new Matrix(data);
	};

	/**
	 * Creates a row vector, a matrix with only one row.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.rowVector = function rowVector(newData) {
	    return new Matrix([newData]);
	};

	/**
	 * Creates a column vector, a matrix with only one column.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.columnVector = function columnVector(newData) {
	    var l = newData.length, vector = new Array(l);
	    for (var i = 0; i < l; i++)
	        vector[i] = [newData[i]];
	    return new Matrix(vector);
	};

	/**
	 * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.empty = function empty(rows, columns) {
	    return new Matrix(rows, columns);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to zero.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.zeros = function zeros(rows, columns) {
	    return Matrix.empty(rows, columns).fill(0);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to one.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.ones = function ones(rows, columns) {
	    return Matrix.empty(rows, columns).fill(1);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be randomly set using Math.random().
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} The new matrix
	 */
	Matrix.rand = function rand(rows, columns) {
	    var matrix = Matrix.empty(rows, columns);
	    for (var i = 0, ii = matrix.rows; i < ii; i++) {
	        for (var j = 0, jj = matrix.columns; j < jj; j++) {
	            matrix[i][j] = Math.random();
	        }
	    }
	    return matrix;
	};

	/**
	 * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and other will be 0.
	 * @param {number} n - Number of rows and columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.eye = function eye(n) {
	    var matrix = Matrix.zeros(n, n), l = matrix.rows;
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = 1;
	    }
	    return matrix;
	};

	/**
	 * Creates a diagonal matrix based on the given array.
	 * @param {Array} data - Array containing the data for the diagonal
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.diag = function diag(data) {
	    var l = data.length, matrix = Matrix.zeros(l, l);
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = data[i];
	    }
	    return matrix;
	};

	/**
	 * Creates an array of indices between two values
	 * @param {number} from
	 * @param {number} to
	 * @returns {Array}
	 */
	Matrix.indices = function indices(from, to) {
	    var vector = new Array(to - from);
	    for (var i = 0; i < vector.length; i++)
	        vector[i] = from++;
	    return vector;
	};

	// TODO DOC
	Matrix.stack = function stack(arg1) {
	    var i, j, k;
	    if (Matrix.isMatrix(arg1)) {
	        var rows = 0,
	            cols = 0;
	        for (i = 0; i < arguments.length; i++) {
	            rows += arguments[i].rows;
	            if (arguments[i].columns > cols)
	                cols = arguments[i].columns;
	        }

	        var r = Matrix.zeros(rows, cols);
	        var c = 0;
	        for (i = 0; i < arguments.length; i++) {
	            var current = arguments[i];
	            for (j = 0; j < current.rows; j++) {
	                for (k = 0; k < current.columns; k++)
	                    r[c][k] = current[j][k];
	                c++;
	            }
	        }
	        return r;
	    }
	    else if (Array.isArray(arg1)) {
	        var matrix = Matrix.empty(arguments.length, arg1.length);
	        for (i = 0; i < arguments.length; i++)
	            matrix.setRow(i, arguments[i]);
	        return matrix;
	    }
	};

	// TODO DOC
	Matrix.expand = function expand(base, count) {
	    var expansion = [];
	    for (var i = 0; i < count.length; i++)
	        for (var j = 0; j < count[i]; j++)
	            expansion.push(base[i]);
	    return new Matrix(expansion);
	};

	/**
	 * Check that the provided value is a Matrix and tries to instantiate one if not
	 * @param value - The value to check
	 * @returns {Matrix}
	 * @throws {TypeError}
	 */
	Matrix.checkMatrix = function checkMatrix(value) {
	    if (!value) {
	        throw new TypeError('Argument has to be a matrix');
	    }
	    if (value.klass !== 'Matrix') {
	        value = new Matrix(value);
	    }
	    return value;
	};

	/**
	 * Returns true if the argument is a Matrix, false otherwise
	 * @param value - The value to check
	 * @returns {boolean}
	 */
	Matrix.isMatrix = function isMatrix(value) {
	    return value ? value.klass === 'Matrix' : false;
	};

	/**
	 * @property {string} - The name of this class.
	 */
	Object.defineProperty(Matrix.prototype, 'klass', {
	    get: function klass() {
	        return 'Matrix';
	    }
	});

	/**
	 * @property {number} - The number of elements in the matrix.
	 */
	Object.defineProperty(Matrix.prototype, 'size', {
	    get: function size() {
	        return this.rows * this.columns;
	    }
	});

	/**
	 * @private
	 * Internal check that a row index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkRowIndex = function checkRowIndex(index) {
	    if (index < 0 || index > this.rows - 1)
	        throw new RangeError('Row index out of range.');
	};

	/**
	 * @private
	 * Internal check that a column index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkColumnIndex = function checkColumnIndex(index) {
	    if (index < 0 || index > this.columns - 1)
	        throw new RangeError('Column index out of range.');
	};

	/**
	 * @private
	 * Internal check that two matrices have the same dimensions
	 * @param {Matrix} otherMatrix
	 */
	Matrix.prototype.checkDimensions = function checkDimensions(otherMatrix) {
	    if ((this.rows !== otherMatrix.rows) || (this.columns !== otherMatrix.columns))
	        throw new RangeError('Matrices dimensions must be equal.');
	};

	/**
	 * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	 * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.apply = function apply(callback) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            callback.call(this, i, j);
	        }
	    }
	    return this;
	};

	/**
	 * Creates an exact and independent copy of the matrix
	 * @returns {Matrix}
	 */
	Matrix.prototype.clone = function clone() {
	    return new Matrix(this.to2DArray());
	};

	/**
	 * Returns a new 1D array filled row by row with the matrix values
	 * @returns {Array}
	 */
	Matrix.prototype.to1DArray = function to1DArray() {
	    return Aconcat.apply([], this);
	};

	/**
	 * Returns a 2D array containing a copy of the data
	 * @returns {Array}
	 */
	Matrix.prototype.to2DArray = function to2DArray() {
	    var l = this.rows, copy = new Array(l);
	    for (var i = 0; i < l; i++) {
	        copy[i] = slice(this[i]);
	    }
	    return copy;
	};

	/**
	 * @returns {boolean} true if the matrix has one row
	 */
	Matrix.prototype.isRowVector = function isRowVector() {
	    return this.rows === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one column
	 */
	Matrix.prototype.isColumnVector = function isColumnVector() {
	    return this.columns === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one row or one column
	 */
	Matrix.prototype.isVector = function isVector() {
	    return (this.rows === 1) || (this.columns === 1);
	};

	/**
	 * @returns {boolean} true if the matrix has the same number of rows and columns
	 */
	Matrix.prototype.isSquare = function isSquare() {
	    return this.rows === this.columns;
	};

	/**
	 * @returns {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	 */
	Matrix.prototype.isSymmetric = function isSymmetric() {
	    if (this.isSquare()) {
	        var l = this.rows;
	        for (var i = 0; i < l; i++) {
	            for (var j = 0; j <= i; j++) {
	                if (this[i][j] !== this[j][i]) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    }
	    return false;
	};

	/**
	 * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @param {number} value - The new value for the element
	 * @returns {Matrix} this
	 */
	Matrix.prototype.set = function set(rowIndex, columnIndex, value) {
	    this[rowIndex][columnIndex] = value;
	    return this;
	};

	/**
	 * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @returns {number}
	 */
	Matrix.prototype.get = function get(rowIndex, columnIndex) {
	    return this[rowIndex][columnIndex];
	};

	/**
	 * Fills the matrix with a given value. All elements will be set to this value.
	 * @param {number} value - New value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.fill = function fill(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = value;
	        }
	    }
	    return this;
	};

	/**
	 * Negates the matrix. All elements will be multiplied by (-1)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.neg = function neg() {
	    return this.mulS(-1);
	};

	/**
	 * Adds a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.add = function add(value) {
	    if (typeof value === 'number')
	        return this.addS(value);
	    value = Matrix.checkMatrix(value);
	        return this.addM(value);
	};

	/**
	 * Adds a scalar to each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addS = function addS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += value;
	        }
	    }
	    return this;
	};

	/**
	 * Adds the value of each element of matrix to the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addM = function addM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sub = function sub(value) {
	    if (typeof value === 'number')
	        return this.subS(value);
	    value = Matrix.checkMatrix(value);
	        return this.subM(value);
	};

	/**
	 * Subtracts a scalar from each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subS = function subS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= value;
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the value of each element of matrix from the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subM = function subM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mul = function mul(value) {
	    if (typeof value === 'number')
	        return this.mulS(value);
	    value = Matrix.checkMatrix(value);
	        return this.mulM(value);
	};

	/**
	 * Multiplies a scalar with each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulS = function mulS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= value;
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the value of each element of matrix with the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulM = function mulM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides by a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.div = function div(value) {
	    if (typeof value === 'number')
	        return this.divS(value);
	    value = Matrix.checkMatrix(value);
	        return this.divM(value);
	};

	/**
	 * Divides each element of the matrix by a scalar
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divS = function divS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= value;
	        }
	    }
	    return this;
	};

	/**
	 * Divides each element of this by the corresponding element of matrix
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divM = function divM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Returns a new array from the given row index
	 * @param {number} index - Row index
	 * @returns {Array}
	 */
	Matrix.prototype.getRow = function getRow(index) {
	    this.checkRowIndex(index);
	    return slice(this[index]);
	};

	/**
	 * Returns a new row vector from the given row index
	 * @param {number} index - Row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getRowVector = function getRowVector(index) {
	    return Matrix.rowVector(this.getRow(index));
	};

	/**
	 * Sets a row at the given index
	 * @param {number} index - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setRow = function setRow(index, array) {
	    this.checkRowIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    this[index] = slice(array);
	    return this;
	};

	/**
	 * Removes a row from the given index
	 * @param {number} index - Row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeRow = function removeRow(index) {
	    this.checkRowIndex(index);
	    if (this.rows === 1)
	        throw new RangeError('A matrix cannot have less than one row');
	    Asplice.call(this, index, 1);
	    this.rows -= 1;
	    return this;
	};

	/**
	 * Adds a row at the given index
	 * @param {number} [index = this.rows] - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRow = function addRow(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.rows;
	    }
	    if (index < 0 || index > this.rows)
	        throw new RangeError('Row index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    Asplice.call(this, index, 0, slice(array));
	    this.rows += 1;
	    return this;
	};

	/**
	 * Swaps two rows
	 * @param {number} row1 - First row index
	 * @param {number} row2 - Second row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapRows = function swapRows(row1, row2) {
	    this.checkRowIndex(row1);
	    this.checkRowIndex(row2);
	    var temp = this[row1];
	    this[row1] = this[row2];
	    this[row2] = temp;
	    return this;
	};

	/**
	 * Returns a new array from the given column index
	 * @param {number} index - Column index
	 * @returns {Array}
	 */
	Matrix.prototype.getColumn = function getColumn(index) {
	    this.checkColumnIndex(index);
	    var l = this.rows, column = new Array(l);
	    for (var i = 0; i < l; i++) {
	        column[i] = this[i][index];
	    }
	    return column;
	};

	/**
	 * Returns a new column vector from the given column index
	 * @param {number} index - Column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getColumnVector = function getColumnVector(index) {
	    return Matrix.columnVector(this.getColumn(index));
	};

	/**
	 * Sets a column at the given index
	 * @param {number} index - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setColumn = function setColumn(index, array) {
	    this.checkColumnIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i][index] = array[i];
	    }
	    return this;
	};

	/**
	 * Removes a column from the given index
	 * @param {number} index - Column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeColumn = function removeColumn(index) {
	    this.checkColumnIndex(index);
	    if (this.columns === 1)
	        throw new RangeError('A matrix cannot have less than one column');
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].splice(index, 1);
	    }
	    this.columns -= 1;
	    return this;
	};

	/**
	 * Adds a column at the given index
	 * @param {number} [index = this.columns] - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumn = function addColumn(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.columns;
	    }
	    if (index < 0 || index > this.columns)
	        throw new RangeError('Column index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i].splice(index, 0, array[i]);
	    }
	    this.columns += 1;
	    return this;
	};

	/**
	 * Swaps two columns
	 * @param {number} column1 - First column index
	 * @param {number} column2 - Second column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapColumns = function swapColumns(column1, column2) {
	    this.checkRowIndex(column1);
	    this.checkRowIndex(column2);
	    var l = this.rows, temp, row;
	    for (var i = 0; i < l; i++) {
	        row = this[i];
	        temp = row[column1];
	        row[column1] = row[column2];
	        row[column2] = temp;
	    }
	    return this;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkRowVector = function checkRowVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.columns)
	        throw new RangeError('vector size must be the same as the number of columns');
	    return vector;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkColumnVector = function checkColumnVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.rows)
	        throw new RangeError('vector size must be the same as the number of rows');
	    return vector;
	};

	/**
	 * Adds the values of a vector to each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRowVector = function addRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subRowVector = function subRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRowVector = function mulRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each row by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divRowVector = function divRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Adds the values of a vector to each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumnVector = function addColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subColumnVector = function subColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumnVector = function mulColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each column by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divColumnVector = function divColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a row with a scalar
	 * @param {number} index - Row index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRow = function mulRow(index, value) {
	    this.checkRowIndex(index);
	    var i = 0, l = this.columns;
	    for (; i < l; i++) {
	        this[index][i] *= value;
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a column with a scalar
	 * @param {number} index - Column index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumn = function mulColumn(index, value) {
	    this.checkColumnIndex(index);
	    var i = 0, l = this.rows;
	    for (; i < l; i++) {
	        this[i][index] *= value;
	    }
	};

	/**
	 * A matrix index
	 * @typedef {Object} MatrixIndex
	 * @property {number} row
	 * @property {number} column
	 */

	/**
	 * Returns the maximum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.max = function max() {
	    var v = -Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxIndex = function maxIndex() {
	    var v = -Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.min = function min() {
	    var v = Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minIndex = function minIndex() {
	    var v = Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.maxRow = function maxRow(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxRowIndex = function maxRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    var idx = {
	            row: index
	        };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.minRow = function minRow(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minRowIndex = function minRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: index,
	        column: 0
	    };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.maxColumn = function maxColumn(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxColumnIndex = function maxColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.minColumn = function minColumn(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minColumnIndex = function minColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns an array containing the diagonal values of the matrix
	 * @returns {Array}
	 */
	Matrix.prototype.diag = function diag() {
	    if (!this.isSquare())
	        throw new TypeError('Only square matrices have a diagonal.');
	    var diag = new Array(this.rows);
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        diag[i] = this[i][i];
	    }
	    return diag;
	};

	/**
	 * Returns the sum of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.sum = function sum() {
	    var v = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            v += this[i][j];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the mean of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.mean = function mean() {
	    return this.sum() / this.size;
	};

	/**
	 * Returns the product of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.prod = function prod() {
	    var prod = 1;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            prod *= this[i][j];
	        }
	    }
	    return prod;
	};

	/**
	 * Computes the cumulative sum of the matrix elements (in place, row by row)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.cumulativeSum = function cumulativeSum() {
	    var sum = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            sum += this[i][j];
	            this[i][j] = sum;
	        }
	    }
	    return this;
	};

	/**
	 * Computes the dot (scalar) product between the matrix and another
	 * @param {Matrix} other vector
	 * @returns {number}
	 */
	Matrix.prototype.dot = function dot(other) {
	    if (this.size !== other.size)
	        throw new RangeError('vectors do not have the same size');
	    var vector1 = this.to1DArray();
	    var vector2 = other.to1DArray();
	    var dot = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        dot += vector1[i] * vector2[i];
	    }
	    return dot;
	};

	/**
	 * Returns the matrix product between this and other
	 * @returns {Matrix}
	 */
	Matrix.prototype.mmul = function mmul(other) {
	    if (!Matrix.isMatrix(other))
	        throw new TypeError('parameter "other" must be a matrix');
	    if (this.columns !== other.rows)
	        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

	    var m = this.rows, n = this.columns, p = other.columns;
	    var result = new Matrix(m, p);

	    var Bcolj = new Array(n);
	    var i, j, k;
	    for (j = 0; j < p; j++) {
	        for (k = 0; k < n; k++)
	            Bcolj[k] = other[k][j];

	        for (i = 0; i < m; i++) {
	            var Arowi = this[i];

	            var s = 0;
	            for (k = 0; k < n; k++)
	                s += Arowi[k] * Bcolj[k];

	            result[i][j] = s;
	        }
	    }
	    return result;
	};

	/**
	 * Sorts the rows (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortRows = function sortRows(compareFunction) {
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].sort(compareFunction);
	    }
	    return this;
	};

	/**
	 * Sorts the columns (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortColumns = function sortColumns(compareFunction) {
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        this.setColumn(i, this.getColumn(i).sort(compareFunction));
	    }
	    return this;
	};

	/**
	 * Transposes the matrix and returns a new one containing the result
	 * @returns {Matrix}
	 */
	Matrix.prototype.transpose = function transpose() {
	    var result = new Matrix(this.columns, this.rows);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[j][i] = this[i][j];
	        }
	    }
	    return result;
	};

	/**
	 * Returns a subset of the matrix
	 * @param {number} startRow - First row index
	 * @param {number} endRow - Last row index
	 * @param {number} startColumn - First column index
	 * @param {number} endColumn - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrix = function subMatrix(startRow, endRow, startColumn, endColumn) {
	    if ((startRow > endRow) || (startColumn > endColumn) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range');
	    var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
	    for (var i = startRow; i <= endRow; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            newMatrix[i - startRow][j - startColumn] = this[i][j];
	        }
	    }
	    return newMatrix;
	};

	/**
	 * Returns a subset of the matrix based on an array of row indices
	 * @param {Array} indices - Array containing the row indices
	 * @param {number} [startColumn = 0] - First column index
	 * @param {number} [endColumn = this.columns-1] - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixRow = function subMatrixRow(indices, startColumn, endColumn) {
	    if (typeof startColumn === 'undefined') {
	        startColumn = 0;
	        endColumn = this.columns - 1;
	    } else if (typeof endColumn === 'undefined') {
	        endColumn = this.columns - 1;
	    }
	    if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, rows = this.rows,
	        X = new Matrix(l, endColumn - startColumn + 1);
	    for (var i = 0; i < l; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            if ((indices[i] < 0) || (indices[i] >= rows))
	                throw new RangeError('Argument out of range.');
	            X[i][j - startColumn] = this[indices[i]][j];
	        }
	    }
	    return X;
	};

	/**
	 * Returns a subset of the matrix based on an array of column indices
	 * @param {Array} indices - Array containing the column indices
	 * @param {number} [startRow = 0] - First row index
	 * @param {number} [endRow = this.rows-1] - Last row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixColumn = function subMatrixColumn(indices, startRow, endRow) {
	    if (typeof startRow === 'undefined') {
	        startRow = 0;
	        endRow = this.rows - 1;
	    } else if (typeof endRow === 'undefined') {
	        endRow = this.rows - 1;
	    }
	    if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, columns = this.columns,
	        X = new Matrix(endRow - startRow + 1, l);
	    for (var i = 0; i < l; i++) {
	        for (var j = startRow; j <= endRow; j++) {
	            if ((indices[i] < 0) || (indices[i] >= columns))
	                throw new RangeError('Argument out of range.');
	            X[j - startRow][i] = this[j][indices[i]];
	        }
	    }
	    return X;
	};

	/**
	 * Returns the trace of the matrix (sum of the diagonal elements)
	 * @returns {number}
	 */
	Matrix.prototype.trace = function trace() {
	    if (!this.isSquare())
	        throw new TypeError('The matrix is not square');
	    var trace = 0, i = 0, l = this.rows;
	    for (; i < l; i++) {
	        trace += this[i][i];
	    }
	    return trace;
	};

	/**
	 * Sets each element of the matrix to its absolute value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.abs = function abs() {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = Math.abs(this[i][j]);
	        }
	    }
	};

	module.exports = Matrix;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(118);

	var SingularValueDecomposition = __webpack_require__(120);
	var EigenvalueDecomposition = __webpack_require__(122);
	var LuDecomposition = __webpack_require__(123);
	var QrDecomposition = __webpack_require__(124);
	var CholeskyDecomposition = __webpack_require__(125);

	function inverse(matrix) {
	    return solve(matrix, Matrix.eye(matrix.rows));
	}

	Matrix.prototype.inverse = function () {
	    return inverse(this);
	};

	function solve(leftHandSide, rightHandSide) {
	    return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
	}

	Matrix.prototype.solve = function (other) {
	    return solve(this, other);
	};

	module.exports = {
	    SingularValueDecomposition: SingularValueDecomposition,
	    SVD: SingularValueDecomposition,
	    EigenvalueDecomposition: EigenvalueDecomposition,
	    EVD: EigenvalueDecomposition,
	    LuDecomposition: LuDecomposition,
	    LU: LuDecomposition,
	    QrDecomposition: QrDecomposition,
	    QR: QrDecomposition,
	    CholeskyDecomposition: CholeskyDecomposition,
	    CHO: CholeskyDecomposition,
	    inverse: inverse,
	    solve: solve
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(118);
	var hypotenuse = __webpack_require__(121).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	function SingularValueDecomposition(value, options) {
	    if (!(this instanceof SingularValueDecomposition)) {
	        return new SingularValueDecomposition(value, options);
	    }
	    value = Matrix.checkMatrix(value);

	    options = options || {};

	    var a = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        nu = Math.min(m, n);

	    var wantu = true, wantv = true;
	    if (options.computeLeftSingularVectors === false)
	        wantu = false;
	    if (options.computeRightSingularVectors === false)
	        wantv = false;
	    var autoTranspose = options.autoTranspose === true;

	    var swapped = false;
	    if (m < n) {
	        if (!autoTranspose) {
	            console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	        } else {
	            a = a.transpose();
	            m = a.rows;
	            n = a.columns;
	            swapped = true;
	            var aux = wantu;
	            wantu = wantv;
	            wantv = aux;
	        }
	    }

	    var s = new Array(Math.min(m + 1, n)),
	        U = Matrix.zeros(m, nu),
	        V = Matrix.zeros(n, n),
	        e = new Array(n),
	        work = new Array(m);

	    var nct = Math.min(m - 1, n);
	    var nrt = Math.max(0, Math.min(n - 2, m));

	    var i, j, k, p, t, ks, f, cs, sn, max, kase,
	        scale, sp, spm1, epm1, sk, ek, b, c, shift, g;

	    for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	        if (k < nct) {
	            s[k] = 0;
	            for (i = k; i < m; i++) {
	                s[k] = hypotenuse(s[k], a[i][k]);
	            }
	            if (s[k] !== 0) {
	                if (a[k][k] < 0) {
	                    s[k] = -s[k];
	                }
	                for (i = k; i < m; i++) {
	                    a[i][k] /= s[k];
	                }
	                a[k][k] += 1;
	            }
	            s[k] = -s[k];
	        }

	        for (j = k + 1; j < n; j++) {
	            if ((k < nct) && (s[k] !== 0)) {
	                t = 0;
	                for (i = k; i < m; i++) {
	                    t += a[i][k] * a[i][j];
	                }
	                t = -t / a[k][k];
	                for (i = k; i < m; i++) {
	                    a[i][j] += t * a[i][k];
	                }
	            }
	            e[j] = a[k][j];
	        }

	        if (wantu && (k < nct)) {
	            for (i = k; i < m; i++) {
	                U[i][k] = a[i][k];
	            }
	        }

	        if (k < nrt) {
	            e[k] = 0;
	            for (i = k + 1; i < n; i++) {
	                e[k] = hypotenuse(e[k], e[i]);
	            }
	            if (e[k] !== 0) {
	                if (e[k + 1] < 0)
	                    e[k] = -e[k];
	                for (i = k + 1; i < n; i++) {
	                    e[i] /= e[k];
	                }
	                e[k + 1] += 1;
	            }
	            e[k] = -e[k];
	            if ((k + 1 < m) && (e[k] !== 0)) {
	                for (i = k + 1; i < m; i++) {
	                    work[i] = 0;
	                }
	                for (j = k + 1; j < n; j++) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] += e[j] * a[i][j];
	                    }
	                }
	                for (j = k + 1; j < n; j++) {
	                    t = -e[j] / e[k + 1];
	                    for (i = k + 1; i < m; i++) {
	                        a[i][j] += t * work[i];
	                    }
	                }
	            }
	            if (wantv) {
	                for (i = k + 1; i < n; i++) {
	                    V[i][k] = e[i];
	                }
	            }
	        }
	    }

	    p = Math.min(n, m + 1);
	    if (nct < n) {
	        s[nct] = a[nct][nct];
	    }
	    if (m < p) {
	        s[p - 1] = 0;
	    }
	    if (nrt + 1 < p) {
	        e[nrt] = a[nrt][p - 1];
	    }
	    e[p - 1] = 0;

	    if (wantu) {
	        for (j = nct; j < nu; j++) {
	            for (i = 0; i < m; i++) {
	                U[i][j] = 0;
	            }
	            U[j][j] = 1;
	        }
	        for (k = nct - 1; k >= 0; k--) {
	            if (s[k] !== 0) {
	                for (j = k + 1; j < nu; j++) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += U[i][k] * U[i][j];
	                    }
	                    t = -t / U[k][k];
	                    for (i = k; i < m; i++) {
	                        U[i][j] += t * U[i][k];
	                    }
	                }
	                for (i = k; i < m; i++) {
	                    U[i][k] = -U[i][k];
	                }
	                U[k][k] = 1 + U[k][k];
	                for (i = 0; i < k - 1; i++) {
	                    U[i][k] = 0;
	                }
	            } else {
	                for (i = 0; i < m; i++) {
	                    U[i][k] = 0;
	                }
	                U[k][k] = 1;
	            }
	        }
	    }

	    if (wantv) {
	        for (k = n - 1; k >= 0; k--) {
	            if ((k < nrt) && (e[k] !== 0)) {
	                for (j = k + 1; j < n; j++) {
	                    t = 0;
	                    for (i = k + 1; i < n; i++) {
	                        t += V[i][k] * V[i][j];
	                    }
	                    t = -t / V[k + 1][k];
	                    for (i = k + 1; i < n; i++) {
	                        V[i][j] += t * V[i][k];
	                    }
	                }
	            }
	            for (i = 0; i < n; i++) {
	                V[i][k] = 0;
	            }
	            V[k][k] = 1;
	        }
	    }

	    var pp = p - 1,
	        iter = 0,
	        eps = Math.pow(2, -52);
	    while (p > 0) {
	        for (k = p - 2; k >= -1; k--) {
	            if (k === -1) {
	                break;
	            }
	            if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                e[k] = 0;
	                break;
	            }
	        }
	        if (k === p - 2) {
	            kase = 4;
	        } else {
	            for (ks = p - 1; ks >= k; ks--) {
	                if (ks === k) {
	                    break;
	                }
	                t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                if (Math.abs(s[ks]) <= eps * t) {
	                    s[ks] = 0;
	                    break;
	                }
	            }
	            if (ks === k) {
	                kase = 3;
	            } else if (ks === p - 1) {
	                kase = 1;
	            } else {
	                kase = 2;
	                k = ks;
	            }
	        }

	        k++;

	        switch (kase) {
	            case 1: {
	                f = e[p - 2];
	                e[p - 2] = 0;
	                for (j = p - 2; j >= k; j--) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    if (j !== k) {
	                        f = -sn * e[j - 1];
	                        e[j - 1] = cs * e[j - 1];
	                    }
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][p - 1];
	                            V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                            V[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 2 : {
	                f = e[k - 1];
	                e[k - 1] = 0;
	                for (j = k; j < p; j++) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    f = -sn * e[j];
	                    e[j] = cs * e[j];
	                    if (wantu) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][k - 1];
	                            U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 3 : {
	                scale = Math.max(Math.max(Math.max(Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2])), Math.abs(e[p - 2])), Math.abs(s[k])), Math.abs(e[k]));
	                sp = s[p - 1] / scale;
	                spm1 = s[p - 2] / scale;
	                epm1 = e[p - 2] / scale;
	                sk = s[k] / scale;
	                ek = e[k] / scale;
	                b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                c = (sp * epm1) * (sp * epm1);
	                shift = 0;
	                if ((b !== 0) || (c !== 0)) {
	                    shift = Math.sqrt(b * b + c);
	                    if (b < 0) {
	                        shift = -shift;
	                    }
	                    shift = c / (b + shift);
	                }
	                f = (sk + sp) * (sk - sp) + shift;
	                g = sk * ek;
	                for (j = k; j < p - 1; j++) {
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    if (j !== k) {
	                        e[j - 1] = t;
	                    }
	                    f = cs * s[j] + sn * e[j];
	                    e[j] = cs * e[j] - sn * s[j];
	                    g = sn * s[j + 1];
	                    s[j + 1] = cs * s[j + 1];
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][j + 1];
	                            V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                            V[i][j] = t;
	                        }
	                    }
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    s[j] = t;
	                    f = cs * e[j] + sn * s[j + 1];
	                    s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                    g = sn * e[j + 1];
	                    e[j + 1] = cs * e[j + 1];
	                    if (wantu && (j < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][j + 1];
	                            U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                e[p - 2] = f;
	                iter = iter + 1;
	                break;
	            }
	            case 4: {
	                if (s[k] <= 0) {
	                    s[k] = (s[k] < 0 ? -s[k] : 0);
	                    if (wantv) {
	                        for (i = 0; i <= pp; i++) {
	                            V[i][k] = -V[i][k];
	                        }
	                    }
	                }
	                while (k < pp) {
	                    if (s[k] >= s[k + 1]) {
	                        break;
	                    }
	                    t = s[k];
	                    s[k] = s[k + 1];
	                    s[k + 1] = t;
	                    if (wantv && (k < n - 1)) {
	                        for (i = 0; i < n; i++) {
	                            t = V[i][k + 1];
	                            V[i][k + 1] = V[i][k];
	                            V[i][k] = t;
	                        }
	                    }
	                    if (wantu && (k < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = U[i][k + 1];
	                            U[i][k + 1] = U[i][k];
	                            U[i][k] = t;
	                        }
	                    }
	                    k++;
	                }
	                iter = 0;
	                p--;
	                break;
	            }
	        }
	    }

	    if (swapped) {
	        var tmp = V;
	        V = U;
	        U = tmp;
	    }

	    this.m = m;
	    this.n = n;
	    this.s = s;
	    this.U = U;
	    this.V = V;
	}

	SingularValueDecomposition.prototype = {
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    },
	    get norm2() {
	        return this.s[0];
	    },
	    get rank() {
	        var eps = Math.pow(2, -52),
	            tol = Math.max(this.m, this.n) * this.s[0] * eps,
	            r = 0,
	            s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    },
	    get diagonal() {
	        return this.s;
	    },
	    // https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
	    get threshold() {
	        return (Math.pow(2, -52) / 2) * Math.max(this.m, this.n) * this.s[0];
	    },
	    get leftSingularVectors() {
	        return this.U;
	    },
	    get rightSingularVectors() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    },
	    solve: function (value) {

	        var Y = value,
	            e = this.threshold,
	            scols = this.s.length,
	            Ls = Matrix.zeros(scols, scols),
	            i;

	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }


	        var VL = this.V.mmul(Ls),
	            vrows = this.V.rows,
	            urows = this.U.rows,
	            VLU = Matrix.zeros(vrows, urows),
	            j, k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * this.U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }

	        return VLU.mmul(Y);
	    },
	    solveForDiagonal: function (value) {
	        return this.solve(Matrix.diag(value));
	    },
	    inverse: function () {
	        var e = this.threshold,
	            vrows = this.V.rows,
	            vcols = this.V.columns,
	            X = new Matrix(vrows, this.s.length),
	            i, j;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = this.V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }

	        var urows = this.U.rows,
	            ucols = this.U.columns,
	            Y = new Matrix(vrows, urows),
	            k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * this.U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }

	        return Y;
	    }
	};

	module.exports = SingularValueDecomposition;


/***/ },
/* 121 */
/***/ function(module, exports) {

	'use strict';

	exports.hypotenuse = function hypotenuse(a, b) {
	    var r;
	    if (Math.abs(a) > Math.abs(b)) {
	        r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	};


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(118);
	var hypotenuse = __webpack_require__(121).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	function EigenvalueDecomposition(matrix) {
	    if (!(this instanceof EigenvalueDecomposition)) {
	        return new EigenvalueDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);
	    if (!matrix.isSquare()) {
	        throw new Error('Matrix is not a square matrix');
	    }

	    var n = matrix.columns,
	        V = Matrix.zeros(n, n),
	        d = new Array(n),
	        e = new Array(n),
	        value = matrix,
	        i, j;

	    if (matrix.isSymmetric()) {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                V[i][j] = value[i][j];
	            }
	        }
	        tred2(n, e, d, V);
	        tql2(n, e, d, V);
	    }
	    else {
	        var H = Matrix.zeros(n, n),
	            ort = new Array(n);
	        for (j = 0; j < n; j++) {
	            for (i = 0; i < n; i++) {
	                H[i][j] = value[i][j];
	            }
	        }
	        orthes(n, H, ort, V);
	        hqr2(n, e, d, V, H);
	    }

	    this.n = n;
	    this.e = e;
	    this.d = d;
	    this.V = V;
	}

	EigenvalueDecomposition.prototype = {
	    get realEigenvalues() {
	        return this.d;
	    },
	    get imaginaryEigenvalues() {
	        return this.e;
	    },
	    get eigenvectorMatrix() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        var n = this.n,
	            e = this.e,
	            d = this.d,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            }
	            else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	};

	function tred2(n, e, d, V) {

	    var f, g, h, i, j, k,
	        hh, scale;

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }

	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }

	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }

	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }

	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }

	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }

	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }

	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }

	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }

	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }

	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}

	function tql2(n, e, d, V) {

	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;

	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }

	    e[n - 1] = 0;

	    var f = 0,
	        tst1 = 0,
	        eps = Math.pow(2, -52);

	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }

	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;

	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }

	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }

	                f = f + h;

	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);

	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }

	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;

	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }

	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }

	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}

	function orthes(n, H, ort, V) {

	    var low = 0,
	        high = n - 1,
	        f, g, h, i, j, m,
	        scale;

	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }

	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }

	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }

	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;

	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }

	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }

	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }

	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }

	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }

	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }

	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }

	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }

	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}

	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1,
	        low = 0,
	        high = nn - 1,
	        eps = Math.pow(2, -52),
	        exshift = 0,
	        norm = 0,
	        p = 0,
	        q = 0,
	        r = 0,
	        s = 0,
	        z = 0,
	        iter = 0,
	        i, j, k, l, m, t, w, x, y,
	        ra, sa, vr, vi,
	        notlast, cdivres;

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }

	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }

	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }

	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];

	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;

	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }

	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }

	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }

	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }

	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }

	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }

	            iter = iter + 1;

	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }

	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }

	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }

	                if (x === 0) {
	                    break;
	                }

	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }

	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }

	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;

	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }

	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }

	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }

	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }

	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }

	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }

	    if (norm === 0) {
	        return;
	    }

	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];

	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }

	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }

	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;

	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }

	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }

	                w = H[i][i] - p;

	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }

	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }

	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}

	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    }
	    else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}

	module.exports = EigenvalueDecomposition;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(118);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	function LuDecomposition(matrix) {
	    if (!(this instanceof LuDecomposition)) {
	        return new LuDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);

	    var lu = matrix.clone(),
	        rows = lu.rows,
	        columns = lu.columns,
	        pivotVector = new Array(rows),
	        pivotSign = 1,
	        i, j, k, p, s, t, v,
	        LUrowi, LUcolj, kmax;

	    for (i = 0; i < rows; i++) {
	        pivotVector[i] = i;
	    }

	    LUcolj = new Array(rows);

	    for (j = 0; j < columns; j++) {

	        for (i = 0; i < rows; i++) {
	            LUcolj[i] = lu[i][j];
	        }

	        for (i = 0; i < rows; i++) {
	            LUrowi = lu[i];
	            kmax = Math.min(i, j);
	            s = 0;
	            for (k = 0; k < kmax; k++) {
	                s += LUrowi[k] * LUcolj[k];
	            }
	            LUrowi[j] = LUcolj[i] -= s;
	        }

	        p = j;
	        for (i = j + 1; i < rows; i++) {
	            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                p = i;
	            }
	        }

	        if (p !== j) {
	            for (k = 0; k < columns; k++) {
	                t = lu[p][k];
	                lu[p][k] = lu[j][k];
	                lu[j][k] = t;
	            }

	            v = pivotVector[p];
	            pivotVector[p] = pivotVector[j];
	            pivotVector[j] = v;

	            pivotSign = -pivotSign;
	        }

	        if (j < rows && lu[j][j] !== 0) {
	            for (i = j + 1; i < rows; i++) {
	                lu[i][j] /= lu[j][j];
	            }
	        }
	    }

	    this.LU = lu;
	    this.pivotVector = pivotVector;
	    this.pivotSign = pivotSign;
	}

	LuDecomposition.prototype = {
	    isSingular: function () {
	        var data = this.LU,
	            col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    },
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare())
	            throw new Error('Matrix must be square');
	        var determinant = this.pivotSign, col = data.columns;
	        for (var j = 0; j < col; j++)
	            determinant *= data[j][j];
	        return determinant;
	    },
	    get lowerTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get upperTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var lu = this.LU,
	            rows = lu.rows;

	        if (rows !== value.rows)
	            throw new Error('Invalid matrix dimensions');
	        if (this.isSingular())
	            throw new Error('LU matrix is singular');

	        var count = value.columns,
	            X = value.subMatrixRow(this.pivotVector, 0, count - 1),
	            columns = lu.columns,
	            i, j, k;

	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = LuDecomposition;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(118);
	var hypotenuse = __webpack_require__(121).hypotenuse;

	//https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	function QrDecomposition(value) {
	    if (!(this instanceof QrDecomposition)) {
	        return new QrDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);

	    var qr = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        rdiag = new Array(n),
	        i, j, k, s;

	    for (k = 0; k < n; k++) {
	        var nrm = 0;
	        for (i = k; i < m; i++) {
	            nrm = hypotenuse(nrm, qr[i][k]);
	        }
	        if (nrm !== 0) {
	            if (qr[k][k] < 0) {
	                nrm = -nrm;
	            }
	            for (i = k; i < m; i++) {
	                qr[i][k] /= nrm;
	            }
	            qr[k][k] += 1;
	            for (j = k + 1; j < n; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * qr[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    qr[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        rdiag[k] = -nrm;
	    }

	    this.QR = qr;
	    this.Rdiag = rdiag;
	}

	QrDecomposition.prototype = {
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var qr = this.QR,
	            m = qr.rows;

	        if (value.rows !== m)
	            throw new Error('Matrix row dimensions must agree');
	        if (!this.isFullRank())
	            throw new Error('Matrix is rank deficient');

	        var count = value.columns,
	            X = value.clone(),
	            n = qr.columns,
	            i, j, k, s;

	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }

	        return X.subMatrix(0, n - 1, 0, count - 1);
	    },
	    isFullRank: function () {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    },
	    get upperTriangularFactor() {
	        var qr = this.QR,
	            n = qr.columns,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get orthogonalFactor() {
	        var qr = this.QR,
	            rows = qr.rows,
	            columns = qr.columns,
	            X = new Matrix(rows, columns),
	            i, j, k, s;

	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }

	                    s = -s / qr[k][k];

	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = QrDecomposition;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(118);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	function CholeskyDecomposition(value) {
	    if (!(this instanceof CholeskyDecomposition)) {
	        return new CholeskyDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);
	    if (!value.isSymmetric())
	        throw new Error('Matrix is not symmetric');

	    var a = value,
	        dimension = a.rows,
	        l = new Matrix(dimension, dimension),
	        positiveDefinite = true,
	        i, j, k;

	    for (j = 0; j < dimension; j++) {
	        var Lrowj = l[j];
	        var d = 0;
	        for (k = 0; k < j; k++) {
	            var Lrowk = l[k];
	            var s = 0;
	            for (i = 0; i < k; i++) {
	                s += Lrowk[i] * Lrowj[i];
	            }
	            Lrowj[k] = s = (a[j][k] - s) / l[k][k];
	            d = d + s * s;
	        }

	        d = a[j][j] - d;

	        positiveDefinite &= (d > 0);
	        l[j][j] = Math.sqrt(Math.max(d, 0));
	        for (k = j + 1; k < dimension; k++) {
	            l[j][k] = 0;
	        }
	    }

	    if (!positiveDefinite) {
	        throw new Error('Matrix is not positive definite');
	    }

	    this.L = l;
	}

	CholeskyDecomposition.prototype = {
	    get leftTriangularFactor() {
	        return this.L;
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var l = this.L,
	            dimension = l.rows;

	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }

	        var count = value.columns,
	            B = value.clone(),
	            i, j, k;

	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        return B;
	    }
	};

	module.exports = CholeskyDecomposition;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(117);
	var Stat = __webpack_require__(5);

	/**
	 * Function that given vector, returns his norm
	 * @param {Vector} X
	 * @returns {number} Norm of the vector
	 */
	function norm(X) {
	    return Math.sqrt(X.clone().apply(pow2array).sum());
	}

	/**
	 * Function that pow 2 each element of a Matrix or a Vector,
	 * used in the apply method of the Matrix object
	 * @param i - index i.
	 * @param j - index j.
	 * @return The Matrix object modified at the index i, j.
	 * */
	function pow2array(i, j) {
	    this[i][j] = this[i][j] * this[i][j];
	    return this;
	}

	/**
	 * Function that normalize the dataset and return the means and
	 * standard deviation of each feature.
	 * @param dataset
	 * @returns {{result: Matrix, means: (*|number), std: Matrix}} dataset normalized, means
	 *                                                             and standard deviations
	 */
	function featureNormalize(dataset) {
	    var means = Stat.matrix.mean(dataset);
	    var std = Matrix.rowVector(Stat.matrix.standardDeviation(dataset, means, true));
	    means = Matrix.rowVector(means);

	    var result = dataset.addRowVector(means.neg());
	    return {result: result.divRowVector(std), means: means, std: std};
	}

	module.exports = {
	    norm: norm,
	    pow2array: pow2array,
	    featureNormalize: featureNormalize
	};



/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(117);
	var Utils = __webpack_require__(126);

	module.exports = OPLS;

	function OPLS(dataset, predictions, numberOSC) {
	    var X = Matrix(dataset).clone();
	    var y = Matrix(predictions).clone();

	    X = Utils.featureNormalize(X).result;
	    y = Utils.featureNormalize(y).result;

	    var rows = X.rows;
	    var columns = X.columns;

	    var sumOfSquaresX = X.clone().mul(X).sum();
	    var w = X.transpose().mmul(y);
	    w.div(Utils.norm(w));

	    var orthoW = new Array(numberOSC);
	    var orthoT = new Array(numberOSC);
	    var orthoP = new Array(numberOSC);
	    for (var i = 0; i < numberOSC; i++) {
	        var t = X.mmul(w);

	        var numerator = X.transpose().mmul(t);
	        var denominator = t.transpose().mmul(t)[0][0];
	        var p =  numerator.div(denominator);

	        numerator = w.transpose().mmul(p)[0][0];
	        denominator = w.transpose().mmul(w)[0][0];
	        var wOsc = p.sub(w.clone().mul(numerator / denominator));
	        wOsc.div(Utils.norm(wOsc));

	        var tOsc = X.mmul(wOsc);

	        numerator = X.transpose().mmul(tOsc);
	        denominator = tOsc.transpose().mmul(tOsc)[0][0];
	        var pOsc = numerator.div(denominator);

	        X.sub(tOsc.mmul(pOsc.transpose()));
	        orthoW[i] = wOsc.getColumn(0);
	        orthoT[i] = tOsc.getColumn(0);
	        orthoP[i] = pOsc.getColumn(0);
	    }

	    this.Xosc = X;

	    var sumOfSquaresXosx = this.Xosc.clone().mul(this.Xosc).sum();
	    this.R2X = 1 - sumOfSquaresXosx/sumOfSquaresX;

	    this.W = orthoW;
	    this.T = orthoT;
	    this.P = orthoP;
	    this.numberOSC = numberOSC;
	}

	OPLS.prototype.correctDataset = function (dataset) {
	    var X = Matrix(dataset).clone();
	    //X = Utils.featureNormalize(dataset).result;

	    var sumOfSquaresX = X.clone().mul(X).sum();
	    for (var i = 0; i < this.numberOSC; i++) {
	        var currentW = this.W.getColumnVector(i);
	        var currentP = this.P.getColumnVector(i);

	        var t = X.mmul(currentW);
	        X.sub(t.mmul(currentP));
	    }
	    var sumOfSquaresXosx = X.clone().mul(X).sum();

	    var R2X = 1 - sumOfSquaresXosx / sumOfSquaresX;

	    return {
	        datasetOsc: X,
	        R2Dataset: R2X
	    };
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(129);

/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Calculates the squared distance between two vectors
	 * @param {Array<number>} vec1 - the x vector
	 * @param {Array<number>} vec2 - the y vector
	 * @returns {number} sum - the calculated distance
	 */
	function squaredDistance(vec1, vec2) {
	    var sum = 0;
	    var dim = vec1.length;
	    for (var i = 0; i < dim; i++)
	        sum += (vec1[i] - vec2[i]) * (vec1[i] - vec2[i]);
	    return sum;
	}

	/**
	 * Calculates the sum of squared errors
	 * @param {Array <Array <number>>} data - the (x,y) points to cluster
	 * @param {Array <Array <number>>} centers - the K centers in format (x,y)
	 * @param {Array <number>} clusterID - the cluster identifier for each data dot
	 * @returns {number} the sum of squared errors
	 */
	function computeSSE(data, centers, clusterID) {
	    var sse = 0;
	    var nData = data.length;
	    var c = 0;
	    for (var i = 0; i < nData;i++) {
	        c = clusterID[i];
	        sse += squaredDistance(data[i], centers[c]);
	    }
	    return sse;
	}

	/**
	 * Updates the cluster identifier based in the new data
	 * @param {Array <Array <number>>} data - the (x,y) points to cluster
	 * @param {Array <Array <number>>} centers - the K centers in format (x,y)
	 * @returns {Array} the cluster identifier for each data dot
	 */
	function updateClusterID (data, centers) {
	    var nData = data.length;
	    var k = centers.length;
	    var aux = 0;
	    var clusterID = new Array(nData);
	    for (var i = 0; i < nData; i++)
	        clusterID[i] = 0;
	    var d = new Array(nData);
	    for (var i = 0; i < nData; i++) {
	        d[i] = new Array(k);
	        for (var j = 0; j < k; j++) {
	            aux = squaredDistance(data[i], centers[j]);
	            d[i][j] = new Array(2);
	            d[i][j][0] = aux;
	            d[i][j][1] = j;
	        }
	        var min = d[i][0][0];
	        var id = 0;
	        for (var j = 0; j < k; j++)
	            if (d[i][j][0] < min) {
	                min  = d[i][j][0];
	                id = d[i][j][1];
	            }
	        clusterID[i] = id;
	    }
	    return clusterID;
	}

	/**
	 * Update the center values based in the new configurations of the clusters
	 * @param {Array <Array <number>>} data - the (x,y) points to cluster
	 * @param {Array <number>} clusterID - the cluster identifier for each data dot
	 * @param K - number of clusters
	 * @returns {Array} he K centers in format (x,y)
	 */
	function updateCenters(data, clusterID, K) {
	    var nDim = data[0].length;
	    var nData = data.length;
	    var centers = new Array(K);
	    for (var i = 0; i < K; i++) {
	        centers[i] = new Array(nDim);
	        for (var j = 0; j < nDim; j++)
	            centers[i][j] = 0;
	    }

	    for (var k = 0; k < K; k++) {
	        var cluster = [];
	        for (var i = 0; i < nData;i++)
	            if (clusterID[i] == k)
	                cluster.push(data[i]);
	        for (var d = 0; d < nDim; d++) {
	            var x = [];
	            for (var i = 0; i < nData; i++)
	                if (clusterID[i] == k)
	                    x.push(data[i][d]);
	            var sum = 0;
	            var l = x.length;
	            for (var i = 0; i < l; i++)
	                sum += x[i];
	            centers[k][d] = sum / l;
	        }
	    }
	    return centers;
	}

	/**
	 * K-means algorithm
	 * @param {Array <Array <number>>} data - the (x,y) points to cluster
	 * @param {Array <Array <number>>} centers - the K centers in format (x,y)
	 * @param {Object} props - properties
	 * @param {number} maxIter - maximum of iterations allowed
	 * @param {number} tol - the error tolerance
	 * @param {boolean} withIter - store clusters and centroids for each iteration
	 * @returns {Object} the cluster identifier for each data dot and centroids
	 */
	function kmeans(data, centers, props) {
	    var maxIter, tol, withIter;
	    if (typeof props === "undefined") {
	        maxIter = 100;
	        tol = 1e-6;
	        withIter = false;
	    } else {
	        maxIter = (typeof props.maxIter === "undefined") ? 100 : props.maxIter;
	        tol = (typeof props.tol === "undefined") ? 1e-6 : props.tol;
	        withIter = (typeof props.withIter === "undefined") ? false : props.withIter;
	    }

	    var nData = data.length;
	    if (nData == 0) {
	        return [];
	    }
	    var K = centers.length;
	    var clusterID = new Array(nData);
	    for (var i = 0; i < nData; i++)
	        clusterID[i] = 0;
	    if (K >= nData) {
	        for (var i = 0; i < nData; i++)
	            clusterID[i] = i;
	        return clusterID;
	    }
	    var lastDistance;
	    lastDistance = 1e100;
	    var curDistance = 0;
	    var iterations = [];
	    for (var iter = 0; iter < maxIter; iter++) {
	        clusterID = updateClusterID(data, centers);
	        centers = updateCenters(data, clusterID, K);
	        curDistance = computeSSE(data, centers, clusterID);
	        if (withIter) {
	            iterations.push({
	                "clusters": clusterID,
	                "centroids": centers
	            });
	        }

	        if ((lastDistance - curDistance < tol) || ((lastDistance - curDistance)/lastDistance < tol)) {
	            if (withIter) {
	                return {
	                    "clusters": clusterID,
	                    "centroids": centers,
	                    "iterations": iterations
	                };
	            } else {
	                return {
	                    "clusters": clusterID,
	                    "centroids": centers
	                };
	            }
	        }
	        lastDistance = curDistance;
	    }
	    if (withIter) {
	        return {
	            "clusters": clusterID,
	            "centroids": centers,
	            "iterations": iterations
	        };
	    } else {
	        return {
	            "clusters": clusterID,
	            "centroids": centers
	        };
	    }
	}

	module.exports = kmeans;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	exports.agnes = __webpack_require__(131);
	exports.diana = __webpack_require__(139);
	//exports.birch = require('./birch');
	//exports.cure = require('./cure');
	//exports.chameleon = require('./chameleon');

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var euclidean = __webpack_require__(132);
	var ClusterLeaf = __webpack_require__(133);
	var Cluster = __webpack_require__(134);

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {number}
	 */
	function simpleLink(cluster1, cluster2, disFun) {
	    var m = 10e100;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = i; j < cluster2.length; j++) {
	            var d = disFun(cluster1[i], cluster2[j]);
	            m = Math.min(d,m);
	        }
	    return m;
	}

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {number}
	 */
	function completeLink(cluster1, cluster2, disFun) {
	    var m = -1;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = i; j < cluster2.length; j++) {
	            var d = disFun(cluster1[i], cluster2[j]);
	            m = Math.max(d,m);
	        }
	    return m;
	}

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {number}
	 */
	function averageLink(cluster1, cluster2, disFun) {
	    var m = 0;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = 0; j < cluster2.length; j++)
	            m += disFun(cluster1[i], cluster2[j]);
	    return m / (cluster1.length * cluster2.length);
	}

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {*}
	 */
	function centroidLink(cluster1, cluster2, disFun) {
	    var x1 = 0,
	        y1 = 0,
	        x2 = 0,
	        y2 = 0;
	    for (var i = 0; i < cluster1.length; i++) {
	        x1 += cluster1[i][0];
	        y1 += cluster1[i][1];
	    }
	    for (var j = 0; j < cluster2.length; j++) {
	        x2 += cluster2[j][0];
	        y2 += cluster2[j][1];
	    }
	    x1 /= cluster1.length;
	    y1 /= cluster1.length;
	    x2 /= cluster2.length;
	    y2 /= cluster2.length;
	    return disFun([x1,y1], [x2,y2]);
	}

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {number}
	 */
	function wardLink(cluster1, cluster2, disFun) {
	    var x1 = 0,
	        y1 = 0,
	        x2 = 0,
	        y2 = 0;
	    for (var i = 0; i < cluster1.length; i++) {
	        x1 += cluster1[i][0];
	        y1 += cluster1[i][1];
	    }
	    for (var j = 0; j < cluster2.length; j++) {
	        x2 += cluster2[j][0];
	        y2 += cluster2[j][1];
	    }
	    x1 /= cluster1.length;
	    y1 /= cluster1.length;
	    x2 /= cluster2.length;
	    y2 /= cluster2.length;
	    return disFun([x1,y1], [x2,y2])*cluster1.length*cluster2.length / (cluster1.length+cluster2.length);
	}

	var defaultOptions = {
	    disFunc: euclidean,
	    kind: 'single'
	};

	/**
	 * Continuously merge nodes that have the least dissimilarity
	 * @param {Array <Array <number>>} data - Array of points to be clustered
	 * @param {json} options
	 * @constructor
	 */
	function agnes(data, options) {
	    options = options || {};
	    for (var o in defaultOptions)
	        if (!(options.hasOwnProperty(o)))
	            options[o] = defaultOptions[o];
	    var len = data.length;

	    // allows to use a string or a given function
	    if (typeof options.kind === "string") {
	        switch (options.kind) {
	            case 'single':
	                options.kind = simpleLink;
	                break;
	            case 'complete':
	                options.kind = completeLink;
	                break;
	            case 'average':
	                options.kind = averageLink;
	                break;
	            case 'centroid':
	                options.kind = centroidLink;
	                break;
	            case 'ward':
	                options.kind = wardLink;
	                break;
	            default:
	                throw new RangeError('Unknown kind of similarity');
	        }
	    }
	    else if (typeof options.kind !== "function")
	        throw new TypeError('Undefined kind of similarity');

	    var list = new Array(len);
	    for (var i = 0; i < data.length; i++)
	        list[i] = new ClusterLeaf(i);
	    var min  = 10e5,
	        d = {},
	        dis = 0;

	    while (list.length > 1) {

	        // calculates the minimum distance
	        d = {};
	        min = 10e5;
	        for (var j = 0; j < list.length; j++)
	            for (var k = j + 1; k < list.length; k++) {
	                var fData, sData;
	                if (list[j] instanceof ClusterLeaf)
	                    fData = [data[list[j].index]];
	                else {
	                    fData = new Array(list[j].index.length);
	                    for (var e = 0; e < fData.length; e++)
	                        fData[e] = data[list[j].index[e].index];
	                }
	                if (list[k] instanceof ClusterLeaf)
	                    sData = [data[list[k].index]];
	                else {
	                    sData = new Array(list[k].index.length);
	                    for (var f = 0; f < sData.length; f++)
	                        sData[f] = data[list[k].index[f].index];
	                }
	                dis = options.kind(fData, sData, options.disFunc).toFixed(4);
	                if (dis in d) {
	                    d[dis].push([list[j], list[k]]);
	                }
	                else {
	                    d[dis] = [[list[j], list[k]]];
	                }
	                min = Math.min(dis, min);
	            }

	        // cluster dots
	        var dmin = d[min.toFixed(4)];
	        var clustered = new Array(dmin.length);
	        var aux,
	            count = 0;
	        while (dmin.length > 0) {
	            aux = dmin.shift();
	            for (var q = 0; q < dmin.length; q++) {
	                var int = dmin[q].filter(function(n) {
	                    //noinspection JSReferencingMutableVariableFromClosure
	                    return aux.indexOf(n) !== -1
	                });
	                if (int.length > 0) {
	                    var diff = dmin[q].filter(function(n) {
	                        //noinspection JSReferencingMutableVariableFromClosure
	                        return aux.indexOf(n) === -1
	                    });
	                    aux = aux.concat(diff);
	                    dmin.splice(q-- ,1);
	                }
	            }
	            clustered[count++] = aux;
	        }
	        clustered.length = count;

	        for (var ii = 0; ii < clustered.length; ii++) {
	            var obj = new Cluster();
	            obj.children = clustered[ii].concat();
	            obj.distance = min;
	            obj.index = new Array(len);
	            var indCount = 0;
	            for (var jj = 0; jj < clustered[ii].length; jj++) {
	                if (clustered[ii][jj] instanceof ClusterLeaf)
	                    obj.index[indCount++] = clustered[ii][jj];
	                else {
	                    indCount += clustered[ii][jj].index.length;
	                    obj.index = clustered[ii][jj].index.concat(obj.index);
	                }
	                list.splice((list.indexOf(clustered[ii][jj])), 1);
	            }
	            obj.index.length = indCount;
	            list.push(obj);
	        }
	    }
	    return list[0];
	}

	module.exports = agnes;

/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';

	function squaredEuclidean(p, q) {
	    var d = 0;
	    for (var i = 0; i < p.length; i++) {
	        d += (p[i] - q[i]) * (p[i] - q[i]);
	    }
	    return d;
	}

	function euclidean(p, q) {
	    return Math.sqrt(squaredEuclidean(p, q));
	}

	module.exports = euclidean;
	euclidean.squared = squaredEuclidean;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cluster = __webpack_require__(134);
	var util = __webpack_require__(135);

	function ClusterLeaf (index) {
	    Cluster.call(this);
	    this.index = index;
	    this.distance = 0;
	    this.children = undefined;
	}

	util.inherits(ClusterLeaf, Cluster);

	module.exports = ClusterLeaf;


/***/ },
/* 134 */
/***/ function(module, exports) {

	'use strict';

	function Cluster () {
	    this.children = [];
	    this.distance = -1;
	    this.index = [];
	}

	/**
	 * Creates an array of values where maximum distance smaller than the threshold
	 * @param {number} threshold
	 * @return {Array <Cluster>}
	 */
	Cluster.prototype.cut = function (threshold) {
	    if (threshold < 0) throw new RangeError('Threshold too small');
	    var root = new Cluster();
	    root.children = this.children;
	    root.distance = this.distance;
	    root.index = this.index;
	    var list = [root];
	    var ans = [];
	    while (list.length > 0) {
	        var aux = list.shift();
	        if (threshold >= aux.distance)
	            ans.push(aux);
	        else
	            list = list.concat(aux.children);
	    }
	    return ans;
	};

	/**
	 * Merge the leaves in the minimum way to have 'minGroups' number of clusters
	 * @param {number} minGroups
	 * @return {Cluster}
	 */
	Cluster.prototype.group = function (minGroups) {
	    if (minGroups < 1) throw new RangeError('Number of groups too small');
	    var root = new Cluster();
	    root.children = this.children;
	    root.distance = this.distance;
	    root.index = this.index;
	    if (minGroups === 1)
	        return root;
	    var list = [root];
	    var aux;
	    while (list.length < minGroups && list.length !== 0) {
	        aux = list.shift();
	        list = list.concat(aux.children);
	    }
	    if (list.length === 0) throw new RangeError('Number of groups too big');
	    for (var i = 0; i < list.length; i++)
	        if (list[i].distance === aux.distance) {
	            list.concat(list[i].children.slice(1));
	            list[i] = list[i].children[0];
	        }
	    for (var j = 0; j < list.length; j++)
	        if (list[j].distance !== 0) {
	            var obj = list[j];
	            obj.children = obj.index;
	        }
	    return root;
	};

	module.exports = Cluster;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(137);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(138);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(136)))

/***/ },
/* 136 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 138 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var euclidean = __webpack_require__(132);
	var ClusterLeaf = __webpack_require__(133);
	var Cluster = __webpack_require__(134);

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function simpleLink(cluster1, cluster2, disFun) {
	    var m = 10e100;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = i; j < cluster2.length; j++) {
	            var d = disFun(cluster1[i], cluster2[j]);
	            m = Math.min(d,m);
	        }
	    return m;
	}

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function completeLink(cluster1, cluster2, disFun) {
	    var m = -1;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = i; j < cluster2.length; j++) {
	            var d = disFun(cluster1[i], cluster2[j]);
	            m = Math.max(d,m);
	        }
	    return m;
	}

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function averageLink(cluster1, cluster2, disFun) {
	    var m = 0;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = 0; j < cluster2.length; j++)
	            m += disFun(cluster1[i], cluster2[j]);
	    return m / (cluster1.length * cluster2.length);
	}

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function centroidLink(cluster1, cluster2, disFun) {
	    var x1 = 0,
	        y1 = 0,
	        x2 = 0,
	        y2 = 0;
	    for (var i = 0; i < cluster1.length; i++) {
	        x1 += cluster1[i][0];
	        y1 += cluster1[i][1];
	    }
	    for (var j = 0; j < cluster2.length; j++) {
	        x2 += cluster2[j][0];
	        y2 += cluster2[j][1];
	    }
	    x1 /= cluster1.length;
	    y1 /= cluster1.length;
	    x2 /= cluster2.length;
	    y2 /= cluster2.length;
	    return disFun([x1,y1], [x2,y2]);
	}

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function wardLink(cluster1, cluster2, disFun) {
	    var x1 = 0,
	        y1 = 0,
	        x2 = 0,
	        y2 = 0;
	    for (var i = 0; i < cluster1.length; i++) {
	        x1 += cluster1[i][0];
	        y1 += cluster1[i][1];
	    }
	    for (var j = 0; j < cluster2.length; j++) {
	        x2 += cluster2[j][0];
	        y2 += cluster2[j][1];
	    }
	    x1 /= cluster1.length;
	    y1 /= cluster1.length;
	    x2 /= cluster2.length;
	    y2 /= cluster2.length;
	    return disFun([x1,y1], [x2,y2])*cluster1.length*cluster2.length / (cluster1.length+cluster2.length);
	}

	/**
	 * Returns the most distant point and his distance
	 * @param {Array <Array <number>>} splitting - Clusters to split
	 * @param {Array <Array <number>>} data - Original data
	 * @param {function} disFun - Distance function
	 * @returns {{d: number, p: number}} - d: maximum difference between points, p: the point more distant
	 */
	function diff(splitting, data, disFun) {
	    var ans = {
	        d:0,
	        p:0
	    };

	    var Ci = new Array(splitting[0].length);
	    for (var e = 0; e < splitting[0].length; e++)
	        Ci[e] = data[splitting[0][e]];
	    var Cj = new Array(splitting[1].length);
	    for (var f = 0; f < splitting[1].length; f++)
	        Cj[f] = data[splitting[1][f]];

	    var dist, ndist;
	    for (var i = 0; i < Ci.length; i++) {
	        dist = 0;
	        for (var j = 0; j < Ci.length; j++)
	            if (i !== j)
	                dist += disFun(Ci[i], Ci[j]);
	        dist /= (Ci.length - 1);
	        ndist = 0;
	        for (var k = 0; k < Cj.length; k++)
	            ndist += disFun(Ci[i], Cj[k]);
	        ndist /= Cj.length;
	        if ((dist - ndist) > ans.d) {
	            ans.d = (dist - ndist);
	            ans.p = i;
	        }
	    }
	    return ans;
	}

	var defaultOptions = {
	    dist: euclidean,
	    kind: 'single'
	};

	/**
	 * Intra-cluster distance
	 * @param {Array} index
	 * @param {Array} data
	 * @param {function} disFun
	 * @returns {number}
	 */
	function intrDist(index, data, disFun) {
	    var dist = 0,
	        count = 0;
	    for (var i = 0; i < index.length; i++)
	        for (var j = i; j < index.length; j++) {
	            dist += disFun(data[index[i].index], data[index[j].index]);
	            count++
	        }
	    return dist / count;
	}

	/**
	 * Splits the higher level clusters
	 * @param {Array <Array <number>>} data - Array of points to be clustered
	 * @param {json} options
	 * @constructor
	 */
	function diana(data, options) {
	    options = options || {};
	    for (var o in defaultOptions)
	        if (!(options.hasOwnProperty(o)))
	            options[o] = defaultOptions[o];
	    if (typeof options.kind === "string") {
	        switch (options.kind) {
	            case 'single':
	                options.kind = simpleLink;
	                break;
	            case 'complete':
	                options.kind = completeLink;
	                break;
	            case 'average':
	                options.kind = averageLink;
	                break;
	            case 'centroid':
	                options.kind = centroidLink;
	                break;
	            case 'ward':
	                options.kind = wardLink;
	                break;
	            default:
	                throw new RangeError('Unknown kind of similarity');
	        }
	    }
	    else if (typeof options.kind !== "function")
	        throw new TypeError('Undefined kind of similarity');
	    var tree = new Cluster();
	    tree.children = new Array(data.length);
	    tree.index = new Array(data.length);
	    for (var ind = 0; ind < data.length; ind++) {
	        tree.children[ind] = new ClusterLeaf(ind);
	        tree.index[ind] = new ClusterLeaf(ind);
	    }

	    tree.distance = intrDist(tree.index, data, options.dist);
	    var m, M, clId,
	        dist, rebel;
	    var list = [tree];
	    while (list.length > 0) {
	        M = 0;
	        clId = 0;
	        for (var i = 0; i < list.length; i++) {
	            m = 0;
	            for (var j = 0; j < list[i].length; j++) {
	                for (var l = (j + 1); l < list[i].length; l++) {
	                    m = Math.max(options.dist(data[list[i].index[j].index], data[list[i].index[l].index]), m);
	                }
	            }
	            if (m > M) {
	                M = m;
	                clId = i;
	            }
	        }
	        M = 0;
	        if (list[clId].index.length === 2) {
	            list[clId].children = [list[clId].index[0], list[clId].index[1]];
	            list[clId].distance = options.dist(data[list[clId].index[0].index], data[list[clId].index[1].index]);
	        }
	        else if (list[clId].index.length === 3) {
	            list[clId].children = [list[clId].index[0], list[clId].index[1], list[clId].index[2]];
	            var d = [
	                options.dist(data[list[clId].index[0].index], data[list[clId].index[1].index]),
	                options.dist(data[list[clId].index[1].index], data[list[clId].index[2].index])
	            ];
	            list[clId].distance = (d[0] + d[1]) / 2;
	        }
	        else {
	            var C = new Cluster();
	            var sG = new Cluster();
	            var splitting = [new Array(list[clId].index.length), []];
	            for (var spl = 0; spl < splitting[0].length; spl++)
	                splitting[0][spl] = spl;
	            for (var ii = 0; ii < splitting[0].length; ii++) {
	                dist = 0;
	                for (var jj = 0; jj < splitting[0].length; jj++)
	                    if (ii !== jj)
	                        dist += options.dist(data[list[clId].index[splitting[0][jj]].index], data[list[clId].index[splitting[0][ii]].index]);
	                dist /= (splitting[0].length - 1);
	                if (dist > M) {
	                    M = dist;
	                    rebel = ii;
	                }
	            }
	            splitting[1] = [rebel];
	            splitting[0].splice(rebel, 1);
	            dist = diff(splitting, data, options.dist);
	            while (dist.d > 0) {
	                splitting[1].push(splitting[0][dist.p]);
	                splitting[0].splice(dist.p, 1);
	                dist = diff(splitting, data, options.dist);
	            }
	            var fData = new Array(splitting[0].length);
	            C.index = new Array(splitting[0].length);
	            for (var e = 0; e < fData.length; e++) {
	                fData[e] = data[list[clId].index[splitting[0][e]].index];
	                C.index[e] = list[clId].index[splitting[0][e]];
	                C.children[e] = list[clId].index[splitting[0][e]];
	            }
	            var sData = new Array(splitting[1].length);
	            sG.index = new Array(splitting[1].length);
	            for (var f = 0; f < sData.length; f++) {
	                sData[f] = data[list[clId].index[splitting[1][f]].index];
	                sG.index[f] = list[clId].index[splitting[1][f]];
	                sG.children[f] = list[clId].index[splitting[1][f]];
	            }
	            C.distance = intrDist(C.index, data, options.dist);
	            sG.distance = intrDist(sG.index, data, options.dist);
	            list.push(C);
	            list.push(sG);
	            list[clId].children = [C, sG];
	        }
	        list.splice(clId, 1);
	    }
	    return tree;
	}

	module.exports = diana;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var NodeSquare = __webpack_require__(141),
	    NodeHexagonal = __webpack_require__(142);

	var defaultOptions = {
	    fields: 3,
	    randomizer: Math.random,
	    distance: squareEuclidean,
	    iterations: 10,
	    learningRate: 0.1,
	    gridType: 'rect',
	    torus: true,
	    method: 'random'
	};

	function SOM(x, y, options, reload) {

	    this.x = x;
	    this.y = y;

	    options = options || {};
	    this.options = {};
	    for (var i in defaultOptions) {
	        if (options.hasOwnProperty(i)) {
	            this.options[i] = options[i];
	        } else {
	            this.options[i] = defaultOptions[i];
	        }
	    }

	    if (typeof this.options.fields === 'number') {
	        this.numWeights = this.options.fields;
	    } else if (Array.isArray(this.options.fields)) {
	        this.numWeights = this.options.fields.length;
	        var converters = getConverters(this.options.fields);
	        this.extractor = converters.extractor;
	        this.creator = converters.creator;
	    } else {
	        throw new Error('Invalid fields definition');
	    }

	    if (this.options.gridType === 'rect') {
	        this.nodeType = NodeSquare;
	        this.gridDim = {
	            x: x,
	            y: y
	        };
	    } else {
	        this.nodeType = NodeHexagonal;
	        var hx = this.x - Math.floor(this.y / 2);
	        this.gridDim = {
	            x: hx,
	            y: this.y,
	            z: -(0 - hx - this.y)
	        };
	    }

	    this.torus = this.options.torus;
	    this.distanceMethod = this.torus ? 'getDistanceTorus' : 'getDistance';

	    this.distance = this.options.distance;

	    this.maxDistance = getMaxDistance(this.distance, this.numWeights);

	    if (reload === true) { // For model loading
	        this.done = true;
	        return;
	    }
	    if (!(x > 0 && y > 0)) {
	        throw new Error('x and y must be positive');
	    }

	    this.times = {
	        findBMU: 0,
	        adjust: 0
	    };

	    this.randomizer = this.options.randomizer;

	    this.iterationCount = 0;
	    this.iterations = this.options.iterations;

	    this.startLearningRate = this.learningRate = this.options.learningRate;

	    this.mapRadius = Math.floor(Math.max(x, y) / 2);

	    this.algorithmMethod = this.options.method;

	    this._initNodes();

	    this.done = false;
	}

	SOM.load = function loadModel(model, distance) {
	    if (model.name === 'SOM') {
	        var x = model.data.length,
	            y = model.data[0].length;
	        if (distance) {
	            model.options.distance = distance;
	        } else if (model.options.distance) {
	            model.options.distance = eval('(' + model.options.distance + ')');
	        }
	        var som = new SOM(x, y, model.options, true);
	        som.nodes = new Array(x);
	        for (var i = 0; i < x; i++) {
	            som.nodes[i] = new Array(y);
	            for (var j = 0; j < y; j++) {
	                som.nodes[i][j] = new som.nodeType(i, j, model.data[i][j], som);
	            }
	        }
	        return som;
	    } else {
	        throw new Error('expecting a SOM model');
	    }
	};

	SOM.prototype.export = function exportModel(includeDistance) {
	    if (!this.done) {
	        throw new Error('model is not ready yet');
	    }
	    var model = {
	        name: 'SOM'
	    };
	    model.options = {
	        fields: this.options.fields,
	        gridType: this.options.gridType,
	        torus: this.options.torus
	    };
	    model.data = new Array(this.x);
	    for (var i = 0; i < this.x; i++) {
	        model.data[i] = new Array(this.y);
	        for (var j = 0; j < this.y; j++) {
	            model.data[i][j] = this.nodes[i][j].weights;
	        }
	    }
	    if (includeDistance) {
	        model.options.distance = this.distance.toString();
	    }
	    return model;
	};

	SOM.prototype._initNodes = function initNodes() {
	    var now = Date.now(),
	        i, j, k;
	    this.nodes = new Array(this.x);
	    for (i = 0; i < this.x; i++) {
	        this.nodes[i] = new Array(this.y);
	        for (j = 0; j < this.y; j++) {
	            var weights = new Array(this.numWeights);
	            for (k = 0; k < this.numWeights; k++) {
	                weights[k] = this.randomizer();
	            }
	            this.nodes[i][j] = new this.nodeType(i, j, weights, this);
	        }
	    }
	    this.times.initNodes = Date.now() - now;
	};

	SOM.prototype.setTraining = function setTraining(trainingSet) {
	    if (this.trainingSet) {
	        throw new Error('training set has already been set');
	    }
	    var now = Date.now();
	    var convertedSet = trainingSet;
	    var i, l = trainingSet.length;
	    if (this.extractor) {
	        convertedSet = new Array(l);
	        for (i = 0; i < l; i++) {
	            convertedSet[i] = this.extractor(trainingSet[i]);
	        }
	    }
	    this.numIterations = this.iterations * l;

	    if (this.algorithmMethod === 'random') {
	        this.timeConstant = this.numIterations / Math.log(this.mapRadius);
	    } else {
	        this.timeConstant = l / Math.log(this.mapRadius);
	    }
	    this.trainingSet = convertedSet;
	    this.times.setTraining = Date.now() - now;
	};

	SOM.prototype.trainOne = function trainOne() {
	    if (this.done) {

	        return false;

	    } else if (this.numIterations-- > 0) {

	        var neighbourhoodRadius,
	            trainingValue,
	            trainingSetFactor;

	        if (this.algorithmMethod === 'random') { // Pick a random value of the training set at each step
	            neighbourhoodRadius = this.mapRadius * Math.exp(-this.iterationCount / this.timeConstant);
	            trainingValue = getRandomValue(this.trainingSet, this.randomizer);
	            this._adjust(trainingValue, neighbourhoodRadius);
	            this.learningRate = this.startLearningRate * Math.exp(-this.iterationCount / this.numIterations);
	        } else { // Get next input vector
	            trainingSetFactor = -Math.floor(this.iterationCount / this.trainingSet.length);
	            neighbourhoodRadius = this.mapRadius * Math.exp(trainingSetFactor / this.timeConstant);
	            trainingValue = this.trainingSet[this.iterationCount % this.trainingSet.length];
	            this._adjust(trainingValue, neighbourhoodRadius);
	            if (((this.iterationCount + 1) % this.trainingSet.length) === 0) {
	                this.learningRate = this.startLearningRate * Math.exp(trainingSetFactor / Math.floor(this.numIterations / this.trainingSet.length));
	            }
	        }

	        this.iterationCount++;

	        return true;

	    } else {

	        this.done = true;
	        return false;

	    }
	};

	SOM.prototype._adjust = function adjust(trainingValue, neighbourhoodRadius) {
	    var now = Date.now(),
	        x, y, dist, influence;

	    var bmu = this._findBestMatchingUnit(trainingValue);

	    var now2 = Date.now();
	    this.times.findBMU += now2 - now;

	    var radiusLimit = Math.floor(neighbourhoodRadius);
	    var xMin = bmu.x - radiusLimit,
	        xMax = bmu.x + radiusLimit,
	        yMin = bmu.y - radiusLimit,
	        yMax = bmu.y + radiusLimit;

	    for (x = xMin; x <= xMax; x++) {
	        var theX = x;
	        if (x < 0) {
	            theX += this.x;
	        } else if (x >= this.x) {
	            theX -= this.x;
	        }
	        for (y = yMin; y <= yMax; y++) {
	            var theY = y;
	            if (y < 0) {
	                theY += this.y;
	            } else if (y >= this.y) {
	                theY -= this.y;
	            }

	            dist = bmu[this.distanceMethod](this.nodes[theX][theY]);

	            if (dist < neighbourhoodRadius) {
	                influence = Math.exp(-dist / (2 * neighbourhoodRadius));
	                this.nodes[theX][theY].adjustWeights(trainingValue, this.learningRate, influence);
	            }

	        }
	    }

	    this.times.adjust += (Date.now() - now2);

	};

	SOM.prototype.train = function train(trainingSet) {
	    if (!this.done) {
	        this.setTraining(trainingSet);
	        while (this.trainOne()) {
	        }
	    }
	};

	SOM.prototype.getConvertedNodes = function getConvertedNodes() {
	    var result = new Array(this.x);
	    for (var i = 0; i < this.x; i++) {
	        result[i] = new Array(this.y);
	        for (var j = 0; j < this.y; j++) {
	            var node = this.nodes[i][j];
	            result[i][j] = this.creator ? this.creator(node.weights) : node.weights;
	        }
	    }
	    return result;
	};

	SOM.prototype._findBestMatchingUnit = function findBestMatchingUnit(candidate) {

	    var bmu,
	        lowest = Infinity,
	        dist;

	    for (var i = 0; i < this.x; i++) {
	        for (var j = 0; j < this.y; j++) {
	            dist = this.distance(this.nodes[i][j].weights, candidate);
	            if (dist < lowest) {
	                lowest = dist;
	                bmu = this.nodes[i][j];
	            }
	        }
	    }

	    return bmu;

	};

	SOM.prototype.predict = function predict(data, computePosition) {
	    if (typeof data === 'boolean') {
	        computePosition = data;
	        data = null;
	    }
	    if (!data) {
	        data = this.trainingSet;
	    }
	    if (Array.isArray(data) && (Array.isArray(data[0]) || (typeof data[0] === 'object'))) { // predict a dataset
	        var self = this;
	        return data.map(function (element) {
	            return self._predict(element, computePosition);
	        });
	    } else { // predict a single element
	        return this._predict(data, computePosition);
	    }
	};

	SOM.prototype._predict = function _predict(element, computePosition) {
	    if (!Array.isArray(element)) {
	        element = this.extractor(element);
	    }
	    var bmu = this._findBestMatchingUnit(element);
	    var result = [bmu.x, bmu.y];
	    if (computePosition) {
	        result[2] = bmu.getPosition(element);
	    }
	    return result;
	};

	// As seen in http://www.scholarpedia.org/article/Kohonen_network
	SOM.prototype.getQuantizationError = function getQuantizationError() {
	    var fit = this.getFit(),
	        l = fit.length,
	        sum = 0;
	    for (var i = 0; i < l; i++) {
	        sum += fit[i];
	    }
	    return sum / l;
	};

	SOM.prototype.getFit = function getFit(dataset) {
	    if (!dataset) {
	        dataset = this.trainingSet;
	    }
	    var l = dataset.length,
	        bmu,
	        result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        bmu = this._findBestMatchingUnit(dataset[i]);
	        result[i] = Math.sqrt(this.distance(dataset[i], bmu.weights));
	    }
	    return result;
	};

	function getConverters(fields) {
	    var l = fields.length,
	        normalizers = new Array(l),
	        denormalizers = new Array(l);
	    for (var i = 0; i < l; i++) {
	        normalizers[i] = getNormalizer(fields[i].range);
	        denormalizers[i] = getDenormalizer(fields[i].range);
	    }
	    return {
	        extractor: function extractor(value) {
	            var result = new Array(l);
	            for (var i = 0; i < l; i++) {
	                result[i] = normalizers[i](value[fields[i].name]);
	            }
	            return result;
	        },
	        creator: function creator(value) {
	            var result = {};
	            for (var i = 0; i < l; i++) {
	                result[fields[i].name] = denormalizers[i](value[i]);
	            }
	            return result;
	        }
	    };
	}

	function getNormalizer(minMax) {
	    return function normalizer(value) {
	        return (value - minMax[0]) / (minMax[1] - minMax[0]);
	    };
	}

	function getDenormalizer(minMax) {
	    return function denormalizer(value) {
	        return (minMax[0] + value * (minMax[1] - minMax[0]));
	    };
	}

	function squareEuclidean(a, b) {
	    var d = 0;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        d += (a[i] - b[i]) * (a[i] - b[i]);
	    }
	    return d;
	}

	function getRandomValue(arr, randomizer) {
	    return arr[Math.floor(randomizer() * arr.length)];
	}

	function getMaxDistance(distance, numWeights) {
	    var zero = new Array(numWeights),
	        one = new Array(numWeights);
	    for (var i = 0; i < numWeights; i++) {
	        zero[i] = 0;
	        one[i] = 1;
	    }
	    return distance(zero, one);
	}

	module.exports = SOM;

/***/ },
/* 141 */
/***/ function(module, exports) {

	function NodeSquare(x, y, weights, som) {
	    this.x = x;
	    this.y = y;
	    this.weights = weights;
	    this.som = som;
	    this.neighbors = {};
	}

	NodeSquare.prototype.adjustWeights = function adjustWeights(target, learningRate, influence) {
	    for (var i = 0, ii = this.weights.length; i < ii; i++) {
	        this.weights[i] += learningRate * influence * (target[i] - this.weights[i]);
	    }
	};

	NodeSquare.prototype.getDistance = function getDistance(otherNode) {
	    return Math.max(Math.abs(this.x - otherNode.x), Math.abs(this.y - otherNode.y));
	};

	NodeSquare.prototype.getDistanceTorus = function getDistanceTorus(otherNode) {
	    var distX = Math.abs(this.x - otherNode.x),
	        distY = Math.abs(this.y - otherNode.y);
	    return Math.max(Math.min(distX, this.som.gridDim.x - distX), Math.min(distY, this.som.gridDim.y - distY));
	};

	NodeSquare.prototype.getNeighbors = function getNeighbors(xy) {
	    if (!this.neighbors[xy]) {
	        this.neighbors[xy] = new Array(2);

	        // left or bottom neighbor
	        var v;
	        if (this[xy] > 0) {
	            v = this[xy] - 1;
	        } else if (this.som.torus) {
	            v = this.som.gridDim[xy] - 1
	        }
	        if (typeof v !== 'undefined') {
	            var x, y;
	            if (xy === 'x') {
	                x = v;
	                y = this.y;
	            } else {
	                x = this.x;
	                y = v;
	            }
	            this.neighbors[xy][0] = this.som.nodes[x][y];
	        }

	        // top or right neighbor
	        var w;
	        if (this[xy] < (this.som.gridDim[xy] - 1)) {
	            w = this[xy] + 1;
	        } else if (this.som.torus) {
	            w = 0;
	        }
	        if (typeof w !== 'undefined') {
	            if (xy === 'x') {
	                x = w;
	                y = this.y;
	            } else {
	                x = this.x;
	                y = w;
	            }
	            this.neighbors[xy][1] = this.som.nodes[x][y];
	        }
	    }
	    return this.neighbors[xy];
	};

	NodeSquare.prototype.getPos = function getPos(xy, element) {
	    var neighbors = this.getNeighbors(xy),
	        distance = this.som.distance,
	        bestNeighbor,
	        direction;
	    if(neighbors[0]) {
	        if (neighbors[1]) {
	            var dist1 = distance(element, neighbors[0].weights),
	                dist2 = distance(element, neighbors[1].weights);
	            if(dist1 < dist2) {
	                bestNeighbor = neighbors[0];
	                direction = -1;
	            } else {
	                bestNeighbor = neighbors[1];
	                direction = 1;
	            }
	        } else {
	            bestNeighbor = neighbors[0];
	            direction = -1;
	        }
	    } else {
	        bestNeighbor = neighbors[1];
	        direction = 1;
	    }
	    var simA = 1 - distance(element, this.weights),
	        simB = 1 - distance(element, bestNeighbor.weights);
	    var factor = ((simA - simB) / (2 - simA - simB));
	    return 0.5 + 0.5 * factor * direction;
	};

	NodeSquare.prototype.getPosition = function getPosition(element) {
	    return [
	        this.getPos('x', element),
	        this.getPos('y', element)
	    ];
	};

	module.exports = NodeSquare;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var NodeSquare = __webpack_require__(141);

	function NodeHexagonal(x, y, weights, som) {

	    NodeSquare.call(this, x, y, weights, som);

	    this.hX = x - Math.floor(y / 2);
	    this.z = 0 - this.hX - y;

	}

	NodeHexagonal.prototype = new NodeSquare;
	NodeHexagonal.prototype.constructor = NodeHexagonal;

	NodeHexagonal.prototype.getDistance = function getDistanceHexagonal(otherNode) {
	    return Math.max(Math.abs(this.hX - otherNode.hX), Math.abs(this.y - otherNode.y), Math.abs(this.z - otherNode.z));
	};

	NodeHexagonal.prototype.getDistanceTorus = function getDistanceTorus(otherNode) {
	    var distX = Math.abs(this.hX - otherNode.hX),
	        distY = Math.abs(this.y - otherNode.y),
	        distZ = Math.abs(this.z - otherNode.z);
	    return Math.max(Math.min(distX, this.som.gridDim.x - distX), Math.min(distY, this.som.gridDim.y - distY), Math.min(distZ, this.som.gridDim.z - distZ));
	};

	NodeHexagonal.prototype.getPosition = function getPosition() {
	    throw new Error('Unimplemented : cannot get position of the points for hexagonal grid');
	};

	module.exports = NodeHexagonal;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(144);

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Layer = __webpack_require__(145);
	var Matrix = __webpack_require__(146);

	module.exports = FeedforwardNeuralNetwork;

	/**
	 * Function that returns a random number between two numbers (inclusive)
	 * @param {number} min - lower bound
	 * @param {number} max - upper bound.
	 * @returns {number} random number
	 */
	function randomIntegerFromInterval(min, max) {
	    return Math.floor(Math.random()*(max - min + 1) + min);
	}

	/**
	 * Constructor for the FNN (Feedforward Neural Networks) that takes an Array of Numbers,
	 * those numbers corresponds to the size of each layer in the FNN, the first and the last number of the array corresponds to the input and the
	 * output layer respectively.
	 *
	 * @param reload - for load purposes.
	 * @param model - for load purposes.
	 * @constructor
	 */
	function FeedforwardNeuralNetwork(reload, model) {
	    if(reload) {
	        this.layers = model.layers;
	        this.inputSize = model.inputSize;
	        this.outputSize = model.outputSize;
	    }
	}

	/**
	 * Build the Neural Network with an array that represent each hidden layer size.
	 *
	 * @param {Array} layersSize - Array of sizes of each layer.
	 */
	FeedforwardNeuralNetwork.prototype.buildNetwork = function (layersSize) {
	    layersSize.push(this.outputSize);

	    this.layers = new Array(layersSize.length);

	    for (var i = 0; i < layersSize.length; ++i) {
	        var inSize = (i == 0) ? this.inputSize : layersSize[i - 1];
	        this.layers[i] = new Layer(inSize, layersSize[i]);
	    }

	    this.layers[this.layers.length - 1].isSigmoid = false;
	};

	/**
	 * Function that applies a forward propagation over the Neural Network
	 * with one case of the dataset.
	 * @param {Array} input - case of the dataset.
	 * @returns {Array} result of the forward propagation.
	 */
	FeedforwardNeuralNetwork.prototype.forwardNN = function (input) {
	    var results = input.slice();

	    for(var i = 0; i < this.layers.length; ++i) {
	        results = this.layers[i].forward(results);
	    }

	    return results;
	};

	/**
	 * Function that makes one iteration (epoch) over the Neural Network with one element
	 * of the dataset with corresponding prediction; the other two arguments are the
	 * learning rate and the momentum that is the regularization term for the parameters
	 * of each perceptron in the Neural Network.
	 * @param {Array} data - Element of the dataset.
	 * @param {Array} prediction - Prediction over the data object.
	 * @param {Number} learningRate
	 * @param momentum - the regularization term.
	 */
	FeedforwardNeuralNetwork.prototype.iteration = function (data, prediction, learningRate, momentum) {
	    var forwardResult = this.forwardNN(data);
	    var error = new Array(forwardResult.length);

	    if(typeof(prediction) === 'number')
	        prediction = [prediction];

	    for (var i = 0; i < error.length; i++) {
	        error[i] = prediction[i] - forwardResult[i];
	    }

	    var lengthLayers = this.layers.length;

	    for(i = 0; i < lengthLayers; ++i) {
	        error = this.layers[lengthLayers - 1 - i].train(error, learningRate, momentum);
	    }
	};

	/**
	 * Method that train the neural network with a given training set with corresponding
	 * predictions. The options argument has an array of the number of perceptrons that we want in each hidden layer, the
	 * number of iterations (default 50) that we want to perform, the learning rate and the momentum that is the
	 * regularization term (default 0.1 for both) for the parameters of each perceptron in the Neural Network.
	 *
	 * options:
	 * * hiddenLayers - Array of number with each hidden layer size.
	 * * iterations - Number
	 * * learningRate - Number
	 * * momentum - Number
	 *
	 * @param {Matrix} trainingSet
	 * @param {Matrix} predictions
	 * @param {Number} options
	 */
	FeedforwardNeuralNetwork.prototype.train = function (trainingSet, predictions, options) {
	    if(options === undefined) options = {};

	    if(trainingSet.length !== predictions.length)
	        throw new RangeError("the training and prediction set must have the same size.");

	    this.inputSize = trainingSet[0].length;
	    this.outputSize = predictions[0].length;

	    var hiddenLayers = options.hiddenLayers === undefined ? [10] : options.hiddenLayers;
	    var iterations = options.iterations === undefined ? 50 : options.iterations;
	    var learningRate = options.learningRate === undefined ? 0.1 : options.learningRate;
	    var momentum = options.momentum === undefined ? 0.1 : options.momentum;

	    this.buildNetwork(options.hiddenLayers);

	    for(var i = 0; i < iterations; ++i) {
	        for(var j = 0; j < predictions.length; ++j) {
	            var index = randomIntegerFromInterval(0, predictions.length - 1);
	            this.iteration(trainingSet[index], predictions[index], learningRate, momentum);
	        }
	    }
	};

	/**
	 * Function that with a dataset, gives all the predictions for this dataset.
	 * @param {Matrix} dataset.
	 * @returns {Array} predictions
	 */
	FeedforwardNeuralNetwork.prototype.predict = function (dataset) {
	    if(dataset[0].length !== this.inputSize)
	        throw new RangeError("The dataset columns must have the same size of the " +
	                             "input layer");
	    var result = new Array(dataset.length);
	    for (var i = 0; i < dataset.length; i++) {
	        result[i] = this.forwardNN(dataset[i]);
	    }

	    result = Matrix(result);
	    return result.columns === 1 ? result.getColumn(0) : result;
	};

	/**
	 * function that loads a object model into the Neural Network.
	 * @param model
	 * @returns {FeedforwardNeuralNetwork} with the provided model.
	 */
	FeedforwardNeuralNetwork.load = function (model) {
	    if(model.modelName !== "FNN")
	        throw new RangeError("The given model is invalid!");

	    return new FeedforwardNeuralNetwork(true, model);
	};

	/**
	 * Function that exports the actual Neural Network to an object.
	 * @returns {{modelName: string, layers: *, inputSize: *, outputSize: *}}
	 */
	FeedforwardNeuralNetwork.prototype.export = function () {
	    return {
	        modelName: "FNN",
	        layers: this.layers,
	        inputSize: this.inputSize,
	        outputSize: this.outputSize
	    };
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Matrix = __webpack_require__(146);

	module.exports = Layer;

	/**
	 * Function that create a random array of numbers between value depending
	 * on the input and output size given the following formula:
	 *
	 *    sqrt(6) / sqrt(l_in + l_out);
	 *
	 * Taken from the coursera course of machine learning from Andrew Ng,
	 * Exercise 4, Page 7 of the exercise PDF.
	 *
	 * @param numberOfWeights - size of the array.
	 * @param inputSize - number of input of the current layer
	 * @param outputSize - number of output of the current layer
	 * @returns {Array} random array of numbers.
	 */
	function randomInitialzeWeights(numberOfWeights, inputSize, outputSize) {
	    var epsilon = 2.449489742783 / Math.sqrt(inputSize + outputSize);
	    return Matrix.rand(1, numberOfWeights).mul(2 * epsilon).sub(epsilon).getRow(0);
	}

	/**
	 * Function that calculates the sigmoid (logistic) function.
	 * @param value
	 * @returns {number}
	 */
	function sigmoid(value) {
	    return 1.0 / (1 + Math.exp(-value));
	}

	/**
	 * Function that calculates the derivate of the sigmoid function.
	 * @param value
	 * @returns {number}
	 */
	function sigmoidGradient(value) {
	    return value * (1 - value);
	}

	/**
	 * Constructor that creates a layer for the neural network given the number of inputs
	 * and outputs.
	 * @param inputSize
	 * @param outputSize
	 * @constructor
	 */
	function Layer(inputSize, outputSize) {
	    this.output = Matrix.zeros(1, outputSize).getRow(0);
	    this.input = Matrix.zeros(1, inputSize + 1).getRow(0); //+1 for bias term
	    this.deltaWeights = Matrix.zeros(1, (1 + inputSize) * outputSize).getRow(0);
	    this.weights = randomInitialzeWeights(this.deltaWeights.length, inputSize, outputSize);
	    this.isSigmoid = true;
	}

	/**
	 * Function that performs the forward propagation for the current layer
	 * @param {Array} input - output from the previous layer.
	 * @returns {Array} output - output for the next layer.
	 */
	Layer.prototype.forward = function (input) {
	    this.input = input.slice();
	    this.input.push(1); // bias
	    var offs = 0; // offset used to get the current weights in the current perceptron
	    this.output = Matrix.zeros(1, this.output.length).getRow(0);

	    for(var i = 0; i < this.output.length; ++i) {
	        for(var j = 0 ; j < this.input.length; ++j) {
	            this.output[i] += this.weights[offs + j] * this.input[j];
	        }
	        if(this.isSigmoid)
	            this.output[i] = sigmoid(this.output[i]);

	        offs += this.input.length;
	    }

	    return this.output.slice();
	};

	/**
	 * Function that performs the backpropagation algorithm for the current layer.
	 * @param {Array} error - errors from the previous layer.
	 * @param {Number} learningRate - Learning rate for the actual layer.
	 * @param {Number} momentum - The regularizarion term.
	 * @returns {Array} the error for the next layer.
	 */
	Layer.prototype.train = function (error, learningRate, momentum) {
	    var offs = 0;
	    var nextError = Matrix.zeros(1, this.input.length).getRow(0);//new Array(this.input.length);

	    for(var i = 0; i < this.output.length; ++i) {
	        var delta = error[i];

	        if(this.isSigmoid)
	            delta *= sigmoidGradient(this.output[i]);

	        for(var j = 0; j < this.input.length; ++j) {
	            var index = offs + j;
	            nextError[j] += this.weights[index] * delta;

	            var deltaWeight = this.input[j] * delta * learningRate;
	            this.weights[index] += this.deltaWeights[index] * momentum + deltaWeight;
	            this.deltaWeights[index] = deltaWeight;
	        }

	        offs += this.input.length;
	    }

	    return nextError;
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(147);
	module.exports.Decompositions = module.exports.DC = __webpack_require__(148);


/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';

	var Asplice = Array.prototype.splice,
	    Aconcat = Array.prototype.concat;

	// For performance : http://jsperf.com/clone-array-slice-vs-while-vs-for
	function slice(arr) {
	    var i = 0,
	        ii = arr.length,
	        result = new Array(ii);
	    for (; i < ii; i++) {
	        result[i] = arr[i];
	    }
	    return result;
	}

	/**
	 * Real matrix.
	 * @constructor
	 * @param {number|Array} nRows - Number of rows of the new matrix or a 2D array containing the data.
	 * @param {number|boolean} [nColumns] - Number of columns of the new matrix or a boolean specifying if the input array should be cloned
	 */
	function Matrix(nRows, nColumns) {
	    var i = 0, rows, columns, matrix, newInstance;
	    if (Array.isArray(nRows)) {
	        newInstance = nColumns;
	        matrix = newInstance ? slice(nRows) : nRows;
	        nRows = matrix.length;
	        nColumns = matrix[0].length;
	        if (typeof nColumns === 'undefined') {
	            throw new TypeError('Data must be a 2D array');
	        }
	        if (nRows > 0 && nColumns > 0) {
	            for (; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                } else if (newInstance) {
	                    matrix[i] = slice(matrix[i]);
	                }
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else if (typeof nRows === 'number') { // Create empty matrix
	        if (nRows > 0 && nColumns > 0) {
	            matrix = new Array(nRows);
	            for (; i < nRows; i++) {
	                matrix[i] = new Array(nColumns);
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else {
	        throw new TypeError('Invalid arguments');
	    }

	    Object.defineProperty(matrix, 'rows', {writable: true, value: nRows});
	    Object.defineProperty(matrix, 'columns', {writable: true, value: nColumns});

	    matrix.__proto__ = Matrix.prototype;

	    return matrix;
	}

	/**
	 * Constructs a Matrix with the chosen dimensions from a 1D array.
	 * @param {number} newRows - Number of rows
	 * @param {number} newColumns - Number of columns
	 * @param {Array} newData - A 1D array containing data for the matrix
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.from1DArray = function from1DArray(newRows, newColumns, newData) {
	    var length, data, i = 0;

	    length = newRows * newColumns;
	    if (length !== newData.length)
	        throw new RangeError('Data length does not match given dimensions');

	    data = new Array(newRows);
	    for (; i < newRows; i++) {
	        data[i] = newData.slice(i * newColumns, (i + 1) * newColumns);
	    }
	    return new Matrix(data);
	};

	/**
	 * Creates a row vector, a matrix with only one row.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.rowVector = function rowVector(newData) {
	    return new Matrix([newData]);
	};

	/**
	 * Creates a column vector, a matrix with only one column.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.columnVector = function columnVector(newData) {
	    var l = newData.length, vector = new Array(l);
	    for (var i = 0; i < l; i++)
	        vector[i] = [newData[i]];
	    return new Matrix(vector);
	};

	/**
	 * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.empty = function empty(rows, columns) {
	    return new Matrix(rows, columns);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to zero.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.zeros = function zeros(rows, columns) {
	    return Matrix.empty(rows, columns).fill(0);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to one.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.ones = function ones(rows, columns) {
	    return Matrix.empty(rows, columns).fill(1);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be randomly set using Math.random().
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} The new matrix
	 */
	Matrix.rand = function rand(rows, columns) {
	    var matrix = Matrix.empty(rows, columns);
	    for (var i = 0, ii = matrix.rows; i < ii; i++) {
	        for (var j = 0, jj = matrix.columns; j < jj; j++) {
	            matrix[i][j] = Math.random();
	        }
	    }
	    return matrix;
	};

	/**
	 * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and other will be 0.
	 * @param {number} n - Number of rows and columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.eye = function eye(n) {
	    var matrix = Matrix.zeros(n, n), l = matrix.rows;
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = 1;
	    }
	    return matrix;
	};

	/**
	 * Creates a diagonal matrix based on the given array.
	 * @param {Array} data - Array containing the data for the diagonal
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.diag = function diag(data) {
	    var l = data.length, matrix = Matrix.zeros(l, l);
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = data[i];
	    }
	    return matrix;
	};

	/**
	 * Creates an array of indices between two values
	 * @param {number} from
	 * @param {number} to
	 * @returns {Array}
	 */
	Matrix.indices = function indices(from, to) {
	    var vector = new Array(to - from);
	    for (var i = 0; i < vector.length; i++)
	        vector[i] = from++;
	    return vector;
	};

	// TODO DOC
	Matrix.stack = function stack(arg1) {
	    var i, j, k;
	    if (Matrix.isMatrix(arg1)) {
	        var rows = 0,
	            cols = 0;
	        for (i = 0; i < arguments.length; i++) {
	            rows += arguments[i].rows;
	            if (arguments[i].columns > cols)
	                cols = arguments[i].columns;
	        }

	        var r = Matrix.zeros(rows, cols);
	        var c = 0;
	        for (i = 0; i < arguments.length; i++) {
	            var current = arguments[i];
	            for (j = 0; j < current.rows; j++) {
	                for (k = 0; k < current.columns; k++)
	                    r[c][k] = current[j][k];
	                c++;
	            }
	        }
	        return r;
	    }
	    else if (Array.isArray(arg1)) {
	        var matrix = Matrix.empty(arguments.length, arg1.length);
	        for (i = 0; i < arguments.length; i++)
	            matrix.setRow(i, arguments[i]);
	        return matrix;
	    }
	};

	// TODO DOC
	Matrix.expand = function expand(base, count) {
	    var expansion = [];
	    for (var i = 0; i < count.length; i++)
	        for (var j = 0; j < count[i]; j++)
	            expansion.push(base[i]);
	    return new Matrix(expansion);
	};

	/**
	 * Check that the provided value is a Matrix and tries to instantiate one if not
	 * @param value - The value to check
	 * @returns {Matrix}
	 * @throws {TypeError}
	 */
	Matrix.checkMatrix = function checkMatrix(value) {
	    if (!value) {
	        throw new TypeError('Argument has to be a matrix');
	    }
	    if (value.klass !== 'Matrix') {
	        value = new Matrix(value);
	    }
	    return value;
	};

	/**
	 * Returns true if the argument is a Matrix, false otherwise
	 * @param value - The value to check
	 * @returns {boolean}
	 */
	Matrix.isMatrix = function isMatrix(value) {
	    return value ? value.klass === 'Matrix' : false;
	};

	/**
	 * @property {string} - The name of this class.
	 */
	Object.defineProperty(Matrix.prototype, 'klass', {
	    get: function klass() {
	        return 'Matrix';
	    }
	});

	/**
	 * @property {number} - The number of elements in the matrix.
	 */
	Object.defineProperty(Matrix.prototype, 'size', {
	    get: function size() {
	        return this.rows * this.columns;
	    }
	});

	/**
	 * @private
	 * Internal check that a row index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkRowIndex = function checkRowIndex(index) {
	    if (index < 0 || index > this.rows - 1)
	        throw new RangeError('Row index out of range.');
	};

	/**
	 * @private
	 * Internal check that a column index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkColumnIndex = function checkColumnIndex(index) {
	    if (index < 0 || index > this.columns - 1)
	        throw new RangeError('Column index out of range.');
	};

	/**
	 * @private
	 * Internal check that two matrices have the same dimensions
	 * @param {Matrix} otherMatrix
	 */
	Matrix.prototype.checkDimensions = function checkDimensions(otherMatrix) {
	    if ((this.rows !== otherMatrix.rows) || (this.columns !== otherMatrix.columns))
	        throw new RangeError('Matrices dimensions must be equal.');
	};

	/**
	 * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	 * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.apply = function apply(callback) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            callback.call(this, i, j);
	        }
	    }
	    return this;
	};

	/**
	 * Creates an exact and independent copy of the matrix
	 * @returns {Matrix}
	 */
	Matrix.prototype.clone = function clone() {
	    return new Matrix(this.to2DArray());
	};

	/**
	 * Returns a new 1D array filled row by row with the matrix values
	 * @returns {Array}
	 */
	Matrix.prototype.to1DArray = function to1DArray() {
	    return Aconcat.apply([], this);
	};

	/**
	 * Returns a 2D array containing a copy of the data
	 * @returns {Array}
	 */
	Matrix.prototype.to2DArray = function to2DArray() {
	    var l = this.rows, copy = new Array(l);
	    for (var i = 0; i < l; i++) {
	        copy[i] = slice(this[i]);
	    }
	    return copy;
	};

	/**
	 * @returns {boolean} true if the matrix has one row
	 */
	Matrix.prototype.isRowVector = function isRowVector() {
	    return this.rows === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one column
	 */
	Matrix.prototype.isColumnVector = function isColumnVector() {
	    return this.columns === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one row or one column
	 */
	Matrix.prototype.isVector = function isVector() {
	    return (this.rows === 1) || (this.columns === 1);
	};

	/**
	 * @returns {boolean} true if the matrix has the same number of rows and columns
	 */
	Matrix.prototype.isSquare = function isSquare() {
	    return this.rows === this.columns;
	};

	/**
	 * @returns {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	 */
	Matrix.prototype.isSymmetric = function isSymmetric() {
	    if (this.isSquare()) {
	        var l = this.rows;
	        for (var i = 0; i < l; i++) {
	            for (var j = 0; j <= i; j++) {
	                if (this[i][j] !== this[j][i]) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    }
	    return false;
	};

	/**
	 * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @param {number} value - The new value for the element
	 * @returns {Matrix} this
	 */
	Matrix.prototype.set = function set(rowIndex, columnIndex, value) {
	    this[rowIndex][columnIndex] = value;
	    return this;
	};

	/**
	 * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @returns {number}
	 */
	Matrix.prototype.get = function get(rowIndex, columnIndex) {
	    return this[rowIndex][columnIndex];
	};

	/**
	 * Fills the matrix with a given value. All elements will be set to this value.
	 * @param {number} value - New value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.fill = function fill(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = value;
	        }
	    }
	    return this;
	};

	/**
	 * Negates the matrix. All elements will be multiplied by (-1)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.neg = function neg() {
	    return this.mulS(-1);
	};

	/**
	 * Adds a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.add = function add(value) {
	    if (typeof value === 'number')
	        return this.addS(value);
	    value = Matrix.checkMatrix(value);
	        return this.addM(value);
	};

	/**
	 * Adds a scalar to each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addS = function addS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += value;
	        }
	    }
	    return this;
	};

	/**
	 * Adds the value of each element of matrix to the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addM = function addM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sub = function sub(value) {
	    if (typeof value === 'number')
	        return this.subS(value);
	    value = Matrix.checkMatrix(value);
	        return this.subM(value);
	};

	/**
	 * Subtracts a scalar from each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subS = function subS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= value;
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the value of each element of matrix from the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subM = function subM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mul = function mul(value) {
	    if (typeof value === 'number')
	        return this.mulS(value);
	    value = Matrix.checkMatrix(value);
	        return this.mulM(value);
	};

	/**
	 * Multiplies a scalar with each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulS = function mulS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= value;
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the value of each element of matrix with the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulM = function mulM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides by a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.div = function div(value) {
	    if (typeof value === 'number')
	        return this.divS(value);
	    value = Matrix.checkMatrix(value);
	        return this.divM(value);
	};

	/**
	 * Divides each element of the matrix by a scalar
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divS = function divS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= value;
	        }
	    }
	    return this;
	};

	/**
	 * Divides each element of this by the corresponding element of matrix
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divM = function divM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Returns a new array from the given row index
	 * @param {number} index - Row index
	 * @returns {Array}
	 */
	Matrix.prototype.getRow = function getRow(index) {
	    this.checkRowIndex(index);
	    return slice(this[index]);
	};

	/**
	 * Returns a new row vector from the given row index
	 * @param {number} index - Row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getRowVector = function getRowVector(index) {
	    return Matrix.rowVector(this.getRow(index));
	};

	/**
	 * Sets a row at the given index
	 * @param {number} index - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setRow = function setRow(index, array) {
	    this.checkRowIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    this[index] = slice(array);
	    return this;
	};

	/**
	 * Removes a row from the given index
	 * @param {number} index - Row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeRow = function removeRow(index) {
	    this.checkRowIndex(index);
	    if (this.rows === 1)
	        throw new RangeError('A matrix cannot have less than one row');
	    Asplice.call(this, index, 1);
	    this.rows -= 1;
	    return this;
	};

	/**
	 * Adds a row at the given index
	 * @param {number} [index = this.rows] - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRow = function addRow(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.rows;
	    }
	    if (index < 0 || index > this.rows)
	        throw new RangeError('Row index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    Asplice.call(this, index, 0, slice(array));
	    this.rows += 1;
	    return this;
	};

	/**
	 * Swaps two rows
	 * @param {number} row1 - First row index
	 * @param {number} row2 - Second row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapRows = function swapRows(row1, row2) {
	    this.checkRowIndex(row1);
	    this.checkRowIndex(row2);
	    var temp = this[row1];
	    this[row1] = this[row2];
	    this[row2] = temp;
	    return this;
	};

	/**
	 * Returns a new array from the given column index
	 * @param {number} index - Column index
	 * @returns {Array}
	 */
	Matrix.prototype.getColumn = function getColumn(index) {
	    this.checkColumnIndex(index);
	    var l = this.rows, column = new Array(l);
	    for (var i = 0; i < l; i++) {
	        column[i] = this[i][index];
	    }
	    return column;
	};

	/**
	 * Returns a new column vector from the given column index
	 * @param {number} index - Column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getColumnVector = function getColumnVector(index) {
	    return Matrix.columnVector(this.getColumn(index));
	};

	/**
	 * Sets a column at the given index
	 * @param {number} index - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setColumn = function setColumn(index, array) {
	    this.checkColumnIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i][index] = array[i];
	    }
	    return this;
	};

	/**
	 * Removes a column from the given index
	 * @param {number} index - Column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeColumn = function removeColumn(index) {
	    this.checkColumnIndex(index);
	    if (this.columns === 1)
	        throw new RangeError('A matrix cannot have less than one column');
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].splice(index, 1);
	    }
	    this.columns -= 1;
	    return this;
	};

	/**
	 * Adds a column at the given index
	 * @param {number} [index = this.columns] - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumn = function addColumn(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.columns;
	    }
	    if (index < 0 || index > this.columns)
	        throw new RangeError('Column index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i].splice(index, 0, array[i]);
	    }
	    this.columns += 1;
	    return this;
	};

	/**
	 * Swaps two columns
	 * @param {number} column1 - First column index
	 * @param {number} column2 - Second column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapColumns = function swapColumns(column1, column2) {
	    this.checkRowIndex(column1);
	    this.checkRowIndex(column2);
	    var l = this.rows, temp, row;
	    for (var i = 0; i < l; i++) {
	        row = this[i];
	        temp = row[column1];
	        row[column1] = row[column2];
	        row[column2] = temp;
	    }
	    return this;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkRowVector = function checkRowVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.columns)
	        throw new RangeError('vector size must be the same as the number of columns');
	    return vector;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkColumnVector = function checkColumnVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.rows)
	        throw new RangeError('vector size must be the same as the number of rows');
	    return vector;
	};

	/**
	 * Adds the values of a vector to each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRowVector = function addRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subRowVector = function subRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRowVector = function mulRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each row by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divRowVector = function divRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Adds the values of a vector to each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumnVector = function addColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subColumnVector = function subColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumnVector = function mulColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each column by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divColumnVector = function divColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a row with a scalar
	 * @param {number} index - Row index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRow = function mulRow(index, value) {
	    this.checkRowIndex(index);
	    var i = 0, l = this.columns;
	    for (; i < l; i++) {
	        this[index][i] *= value;
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a column with a scalar
	 * @param {number} index - Column index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumn = function mulColumn(index, value) {
	    this.checkColumnIndex(index);
	    var i = 0, l = this.rows;
	    for (; i < l; i++) {
	        this[i][index] *= value;
	    }
	};

	/**
	 * A matrix index
	 * @typedef {Object} MatrixIndex
	 * @property {number} row
	 * @property {number} column
	 */

	/**
	 * Returns the maximum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.max = function max() {
	    var v = -Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxIndex = function maxIndex() {
	    var v = -Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.min = function min() {
	    var v = Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minIndex = function minIndex() {
	    var v = Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.maxRow = function maxRow(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxRowIndex = function maxRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    var idx = {
	            row: index
	        };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.minRow = function minRow(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minRowIndex = function minRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: index,
	        column: 0
	    };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.maxColumn = function maxColumn(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxColumnIndex = function maxColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.minColumn = function minColumn(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minColumnIndex = function minColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns an array containing the diagonal values of the matrix
	 * @returns {Array}
	 */
	Matrix.prototype.diag = function diag() {
	    if (!this.isSquare())
	        throw new TypeError('Only square matrices have a diagonal.');
	    var diag = new Array(this.rows);
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        diag[i] = this[i][i];
	    }
	    return diag;
	};

	/**
	 * Returns the sum of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.sum = function sum() {
	    var v = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            v += this[i][j];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the mean of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.mean = function mean() {
	    return this.sum() / this.size;
	};

	/**
	 * Returns the product of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.prod = function prod() {
	    var prod = 1;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            prod *= this[i][j];
	        }
	    }
	    return prod;
	};

	/**
	 * Computes the cumulative sum of the matrix elements (in place, row by row)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.cumulativeSum = function cumulativeSum() {
	    var sum = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            sum += this[i][j];
	            this[i][j] = sum;
	        }
	    }
	    return this;
	};

	/**
	 * Computes the dot (scalar) product between the matrix and another
	 * @param {Matrix} other vector
	 * @returns {number}
	 */
	Matrix.prototype.dot = function dot(other) {
	    if (this.size !== other.size)
	        throw new RangeError('vectors do not have the same size');
	    var vector1 = this.to1DArray();
	    var vector2 = other.to1DArray();
	    var dot = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        dot += vector1[i] * vector2[i];
	    }
	    return dot;
	};

	/**
	 * Returns the matrix product between this and other
	 * @returns {Matrix}
	 */
	Matrix.prototype.mmul = function mmul(other) {
	    if (!Matrix.isMatrix(other))
	        throw new TypeError('parameter "other" must be a matrix');
	    if (this.columns !== other.rows)
	        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

	    var m = this.rows, n = this.columns, p = other.columns;
	    var result = new Matrix(m, p);

	    var Bcolj = new Array(n);
	    var i, j, k;
	    for (j = 0; j < p; j++) {
	        for (k = 0; k < n; k++)
	            Bcolj[k] = other[k][j];

	        for (i = 0; i < m; i++) {
	            var Arowi = this[i];

	            var s = 0;
	            for (k = 0; k < n; k++)
	                s += Arowi[k] * Bcolj[k];

	            result[i][j] = s;
	        }
	    }
	    return result;
	};

	/**
	 * Sorts the rows (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortRows = function sortRows(compareFunction) {
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].sort(compareFunction);
	    }
	    return this;
	};

	/**
	 * Sorts the columns (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortColumns = function sortColumns(compareFunction) {
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        this.setColumn(i, this.getColumn(i).sort(compareFunction));
	    }
	    return this;
	};

	/**
	 * Transposes the matrix and returns a new one containing the result
	 * @returns {Matrix}
	 */
	Matrix.prototype.transpose = function transpose() {
	    var result = new Matrix(this.columns, this.rows);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[j][i] = this[i][j];
	        }
	    }
	    return result;
	};

	/**
	 * Returns a subset of the matrix
	 * @param {number} startRow - First row index
	 * @param {number} endRow - Last row index
	 * @param {number} startColumn - First column index
	 * @param {number} endColumn - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrix = function subMatrix(startRow, endRow, startColumn, endColumn) {
	    if ((startRow > endRow) || (startColumn > endColumn) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range');
	    var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
	    for (var i = startRow; i <= endRow; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            newMatrix[i - startRow][j - startColumn] = this[i][j];
	        }
	    }
	    return newMatrix;
	};

	/**
	 * Returns a subset of the matrix based on an array of row indices
	 * @param {Array} indices - Array containing the row indices
	 * @param {number} [startColumn = 0] - First column index
	 * @param {number} [endColumn = this.columns-1] - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixRow = function subMatrixRow(indices, startColumn, endColumn) {
	    if (typeof startColumn === 'undefined') {
	        startColumn = 0;
	        endColumn = this.columns - 1;
	    } else if (typeof endColumn === 'undefined') {
	        endColumn = this.columns - 1;
	    }
	    if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, rows = this.rows,
	        X = new Matrix(l, endColumn - startColumn + 1);
	    for (var i = 0; i < l; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            if ((indices[i] < 0) || (indices[i] >= rows))
	                throw new RangeError('Argument out of range.');
	            X[i][j - startColumn] = this[indices[i]][j];
	        }
	    }
	    return X;
	};

	/**
	 * Returns a subset of the matrix based on an array of column indices
	 * @param {Array} indices - Array containing the column indices
	 * @param {number} [startRow = 0] - First row index
	 * @param {number} [endRow = this.rows-1] - Last row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixColumn = function subMatrixColumn(indices, startRow, endRow) {
	    if (typeof startRow === 'undefined') {
	        startRow = 0;
	        endRow = this.rows - 1;
	    } else if (typeof endRow === 'undefined') {
	        endRow = this.rows - 1;
	    }
	    if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, columns = this.columns,
	        X = new Matrix(endRow - startRow + 1, l);
	    for (var i = 0; i < l; i++) {
	        for (var j = startRow; j <= endRow; j++) {
	            if ((indices[i] < 0) || (indices[i] >= columns))
	                throw new RangeError('Argument out of range.');
	            X[j - startRow][i] = this[j][indices[i]];
	        }
	    }
	    return X;
	};

	/**
	 * Returns the trace of the matrix (sum of the diagonal elements)
	 * @returns {number}
	 */
	Matrix.prototype.trace = function trace() {
	    if (!this.isSquare())
	        throw new TypeError('The matrix is not square');
	    var trace = 0, i = 0, l = this.rows;
	    for (; i < l; i++) {
	        trace += this[i][i];
	    }
	    return trace;
	};

	/**
	 * Sets each element of the matrix to its absolute value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.abs = function abs() {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = Math.abs(this[i][j]);
	        }
	    }
	};

	module.exports = Matrix;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(147);

	var SingularValueDecomposition = __webpack_require__(149);
	var EigenvalueDecomposition = __webpack_require__(151);
	var LuDecomposition = __webpack_require__(152);
	var QrDecomposition = __webpack_require__(153);
	var CholeskyDecomposition = __webpack_require__(154);

	function inverse(matrix) {
	    return solve(matrix, Matrix.eye(matrix.rows));
	}

	Matrix.prototype.inverse = function () {
	    return inverse(this);
	};

	function solve(leftHandSide, rightHandSide) {
	    return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
	}

	Matrix.prototype.solve = function (other) {
	    return solve(this, other);
	};

	module.exports = {
	    SingularValueDecomposition: SingularValueDecomposition,
	    SVD: SingularValueDecomposition,
	    EigenvalueDecomposition: EigenvalueDecomposition,
	    EVD: EigenvalueDecomposition,
	    LuDecomposition: LuDecomposition,
	    LU: LuDecomposition,
	    QrDecomposition: QrDecomposition,
	    QR: QrDecomposition,
	    CholeskyDecomposition: CholeskyDecomposition,
	    CHO: CholeskyDecomposition,
	    inverse: inverse,
	    solve: solve
	};


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(147);
	var hypotenuse = __webpack_require__(150).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	function SingularValueDecomposition(value, options) {
	    if (!(this instanceof SingularValueDecomposition)) {
	        return new SingularValueDecomposition(value, options);
	    }
	    value = Matrix.checkMatrix(value);

	    options = options || {};

	    var a = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        nu = Math.min(m, n);

	    var wantu = true, wantv = true;
	    if (options.computeLeftSingularVectors === false)
	        wantu = false;
	    if (options.computeRightSingularVectors === false)
	        wantv = false;
	    var autoTranspose = options.autoTranspose === true;

	    var swapped = false;
	    if (m < n) {
	        if (!autoTranspose) {
	            console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	        } else {
	            a = a.transpose();
	            m = a.rows;
	            n = a.columns;
	            swapped = true;
	            var aux = wantu;
	            wantu = wantv;
	            wantv = aux;
	        }
	    }

	    var s = new Array(Math.min(m + 1, n)),
	        U = Matrix.zeros(m, nu),
	        V = Matrix.zeros(n, n),
	        e = new Array(n),
	        work = new Array(m);

	    var nct = Math.min(m - 1, n);
	    var nrt = Math.max(0, Math.min(n - 2, m));

	    var i, j, k, p, t, ks, f, cs, sn, max, kase,
	        scale, sp, spm1, epm1, sk, ek, b, c, shift, g;

	    for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	        if (k < nct) {
	            s[k] = 0;
	            for (i = k; i < m; i++) {
	                s[k] = hypotenuse(s[k], a[i][k]);
	            }
	            if (s[k] !== 0) {
	                if (a[k][k] < 0) {
	                    s[k] = -s[k];
	                }
	                for (i = k; i < m; i++) {
	                    a[i][k] /= s[k];
	                }
	                a[k][k] += 1;
	            }
	            s[k] = -s[k];
	        }

	        for (j = k + 1; j < n; j++) {
	            if ((k < nct) && (s[k] !== 0)) {
	                t = 0;
	                for (i = k; i < m; i++) {
	                    t += a[i][k] * a[i][j];
	                }
	                t = -t / a[k][k];
	                for (i = k; i < m; i++) {
	                    a[i][j] += t * a[i][k];
	                }
	            }
	            e[j] = a[k][j];
	        }

	        if (wantu && (k < nct)) {
	            for (i = k; i < m; i++) {
	                U[i][k] = a[i][k];
	            }
	        }

	        if (k < nrt) {
	            e[k] = 0;
	            for (i = k + 1; i < n; i++) {
	                e[k] = hypotenuse(e[k], e[i]);
	            }
	            if (e[k] !== 0) {
	                if (e[k + 1] < 0)
	                    e[k] = -e[k];
	                for (i = k + 1; i < n; i++) {
	                    e[i] /= e[k];
	                }
	                e[k + 1] += 1;
	            }
	            e[k] = -e[k];
	            if ((k + 1 < m) && (e[k] !== 0)) {
	                for (i = k + 1; i < m; i++) {
	                    work[i] = 0;
	                }
	                for (j = k + 1; j < n; j++) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] += e[j] * a[i][j];
	                    }
	                }
	                for (j = k + 1; j < n; j++) {
	                    t = -e[j] / e[k + 1];
	                    for (i = k + 1; i < m; i++) {
	                        a[i][j] += t * work[i];
	                    }
	                }
	            }
	            if (wantv) {
	                for (i = k + 1; i < n; i++) {
	                    V[i][k] = e[i];
	                }
	            }
	        }
	    }

	    p = Math.min(n, m + 1);
	    if (nct < n) {
	        s[nct] = a[nct][nct];
	    }
	    if (m < p) {
	        s[p - 1] = 0;
	    }
	    if (nrt + 1 < p) {
	        e[nrt] = a[nrt][p - 1];
	    }
	    e[p - 1] = 0;

	    if (wantu) {
	        for (j = nct; j < nu; j++) {
	            for (i = 0; i < m; i++) {
	                U[i][j] = 0;
	            }
	            U[j][j] = 1;
	        }
	        for (k = nct - 1; k >= 0; k--) {
	            if (s[k] !== 0) {
	                for (j = k + 1; j < nu; j++) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += U[i][k] * U[i][j];
	                    }
	                    t = -t / U[k][k];
	                    for (i = k; i < m; i++) {
	                        U[i][j] += t * U[i][k];
	                    }
	                }
	                for (i = k; i < m; i++) {
	                    U[i][k] = -U[i][k];
	                }
	                U[k][k] = 1 + U[k][k];
	                for (i = 0; i < k - 1; i++) {
	                    U[i][k] = 0;
	                }
	            } else {
	                for (i = 0; i < m; i++) {
	                    U[i][k] = 0;
	                }
	                U[k][k] = 1;
	            }
	        }
	    }

	    if (wantv) {
	        for (k = n - 1; k >= 0; k--) {
	            if ((k < nrt) && (e[k] !== 0)) {
	                for (j = k + 1; j < n; j++) {
	                    t = 0;
	                    for (i = k + 1; i < n; i++) {
	                        t += V[i][k] * V[i][j];
	                    }
	                    t = -t / V[k + 1][k];
	                    for (i = k + 1; i < n; i++) {
	                        V[i][j] += t * V[i][k];
	                    }
	                }
	            }
	            for (i = 0; i < n; i++) {
	                V[i][k] = 0;
	            }
	            V[k][k] = 1;
	        }
	    }

	    var pp = p - 1,
	        iter = 0,
	        eps = Math.pow(2, -52);
	    while (p > 0) {
	        for (k = p - 2; k >= -1; k--) {
	            if (k === -1) {
	                break;
	            }
	            if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                e[k] = 0;
	                break;
	            }
	        }
	        if (k === p - 2) {
	            kase = 4;
	        } else {
	            for (ks = p - 1; ks >= k; ks--) {
	                if (ks === k) {
	                    break;
	                }
	                t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                if (Math.abs(s[ks]) <= eps * t) {
	                    s[ks] = 0;
	                    break;
	                }
	            }
	            if (ks === k) {
	                kase = 3;
	            } else if (ks === p - 1) {
	                kase = 1;
	            } else {
	                kase = 2;
	                k = ks;
	            }
	        }

	        k++;

	        switch (kase) {
	            case 1: {
	                f = e[p - 2];
	                e[p - 2] = 0;
	                for (j = p - 2; j >= k; j--) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    if (j !== k) {
	                        f = -sn * e[j - 1];
	                        e[j - 1] = cs * e[j - 1];
	                    }
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][p - 1];
	                            V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                            V[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 2 : {
	                f = e[k - 1];
	                e[k - 1] = 0;
	                for (j = k; j < p; j++) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    f = -sn * e[j];
	                    e[j] = cs * e[j];
	                    if (wantu) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][k - 1];
	                            U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 3 : {
	                scale = Math.max(Math.max(Math.max(Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2])), Math.abs(e[p - 2])), Math.abs(s[k])), Math.abs(e[k]));
	                sp = s[p - 1] / scale;
	                spm1 = s[p - 2] / scale;
	                epm1 = e[p - 2] / scale;
	                sk = s[k] / scale;
	                ek = e[k] / scale;
	                b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                c = (sp * epm1) * (sp * epm1);
	                shift = 0;
	                if ((b !== 0) || (c !== 0)) {
	                    shift = Math.sqrt(b * b + c);
	                    if (b < 0) {
	                        shift = -shift;
	                    }
	                    shift = c / (b + shift);
	                }
	                f = (sk + sp) * (sk - sp) + shift;
	                g = sk * ek;
	                for (j = k; j < p - 1; j++) {
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    if (j !== k) {
	                        e[j - 1] = t;
	                    }
	                    f = cs * s[j] + sn * e[j];
	                    e[j] = cs * e[j] - sn * s[j];
	                    g = sn * s[j + 1];
	                    s[j + 1] = cs * s[j + 1];
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][j + 1];
	                            V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                            V[i][j] = t;
	                        }
	                    }
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    s[j] = t;
	                    f = cs * e[j] + sn * s[j + 1];
	                    s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                    g = sn * e[j + 1];
	                    e[j + 1] = cs * e[j + 1];
	                    if (wantu && (j < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][j + 1];
	                            U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                e[p - 2] = f;
	                iter = iter + 1;
	                break;
	            }
	            case 4: {
	                if (s[k] <= 0) {
	                    s[k] = (s[k] < 0 ? -s[k] : 0);
	                    if (wantv) {
	                        for (i = 0; i <= pp; i++) {
	                            V[i][k] = -V[i][k];
	                        }
	                    }
	                }
	                while (k < pp) {
	                    if (s[k] >= s[k + 1]) {
	                        break;
	                    }
	                    t = s[k];
	                    s[k] = s[k + 1];
	                    s[k + 1] = t;
	                    if (wantv && (k < n - 1)) {
	                        for (i = 0; i < n; i++) {
	                            t = V[i][k + 1];
	                            V[i][k + 1] = V[i][k];
	                            V[i][k] = t;
	                        }
	                    }
	                    if (wantu && (k < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = U[i][k + 1];
	                            U[i][k + 1] = U[i][k];
	                            U[i][k] = t;
	                        }
	                    }
	                    k++;
	                }
	                iter = 0;
	                p--;
	                break;
	            }
	        }
	    }

	    if (swapped) {
	        var tmp = V;
	        V = U;
	        U = tmp;
	    }

	    this.m = m;
	    this.n = n;
	    this.s = s;
	    this.U = U;
	    this.V = V;
	}

	SingularValueDecomposition.prototype = {
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    },
	    get norm2() {
	        return this.s[0];
	    },
	    get rank() {
	        var eps = Math.pow(2, -52),
	            tol = Math.max(this.m, this.n) * this.s[0] * eps,
	            r = 0,
	            s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    },
	    get diagonal() {
	        return this.s;
	    },
	    // https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
	    get threshold() {
	        return (Math.pow(2, -52) / 2) * Math.max(this.m, this.n) * this.s[0];
	    },
	    get leftSingularVectors() {
	        return this.U;
	    },
	    get rightSingularVectors() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    },
	    solve: function (value) {

	        var Y = value,
	            e = this.threshold,
	            scols = this.s.length,
	            Ls = Matrix.zeros(scols, scols),
	            i;

	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }


	        var VL = this.V.mmul(Ls),
	            vrows = this.V.rows,
	            urows = this.U.rows,
	            VLU = Matrix.zeros(vrows, urows),
	            j, k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * this.U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }

	        return VLU.mmul(Y);
	    },
	    solveForDiagonal: function (value) {
	        return this.solve(Matrix.diag(value));
	    },
	    inverse: function () {
	        var e = this.threshold,
	            vrows = this.V.rows,
	            vcols = this.V.columns,
	            X = new Matrix(vrows, this.s.length),
	            i, j;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = this.V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }

	        var urows = this.U.rows,
	            ucols = this.U.columns,
	            Y = new Matrix(vrows, urows),
	            k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * this.U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }

	        return Y;
	    }
	};

	module.exports = SingularValueDecomposition;


/***/ },
/* 150 */
/***/ function(module, exports) {

	'use strict';

	exports.hypotenuse = function hypotenuse(a, b) {
	    var r;
	    if (Math.abs(a) > Math.abs(b)) {
	        r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	};


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(147);
	var hypotenuse = __webpack_require__(150).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	function EigenvalueDecomposition(matrix) {
	    if (!(this instanceof EigenvalueDecomposition)) {
	        return new EigenvalueDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);
	    if (!matrix.isSquare()) {
	        throw new Error('Matrix is not a square matrix');
	    }

	    var n = matrix.columns,
	        V = Matrix.zeros(n, n),
	        d = new Array(n),
	        e = new Array(n),
	        value = matrix,
	        i, j;

	    if (matrix.isSymmetric()) {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                V[i][j] = value[i][j];
	            }
	        }
	        tred2(n, e, d, V);
	        tql2(n, e, d, V);
	    }
	    else {
	        var H = Matrix.zeros(n, n),
	            ort = new Array(n);
	        for (j = 0; j < n; j++) {
	            for (i = 0; i < n; i++) {
	                H[i][j] = value[i][j];
	            }
	        }
	        orthes(n, H, ort, V);
	        hqr2(n, e, d, V, H);
	    }

	    this.n = n;
	    this.e = e;
	    this.d = d;
	    this.V = V;
	}

	EigenvalueDecomposition.prototype = {
	    get realEigenvalues() {
	        return this.d;
	    },
	    get imaginaryEigenvalues() {
	        return this.e;
	    },
	    get eigenvectorMatrix() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        var n = this.n,
	            e = this.e,
	            d = this.d,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            }
	            else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	};

	function tred2(n, e, d, V) {

	    var f, g, h, i, j, k,
	        hh, scale;

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }

	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }

	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }

	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }

	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }

	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }

	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }

	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }

	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }

	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }

	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}

	function tql2(n, e, d, V) {

	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;

	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }

	    e[n - 1] = 0;

	    var f = 0,
	        tst1 = 0,
	        eps = Math.pow(2, -52);

	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }

	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;

	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }

	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }

	                f = f + h;

	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);

	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }

	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;

	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }

	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }

	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}

	function orthes(n, H, ort, V) {

	    var low = 0,
	        high = n - 1,
	        f, g, h, i, j, m,
	        scale;

	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }

	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }

	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }

	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;

	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }

	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }

	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }

	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }

	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }

	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }

	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }

	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }

	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}

	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1,
	        low = 0,
	        high = nn - 1,
	        eps = Math.pow(2, -52),
	        exshift = 0,
	        norm = 0,
	        p = 0,
	        q = 0,
	        r = 0,
	        s = 0,
	        z = 0,
	        iter = 0,
	        i, j, k, l, m, t, w, x, y,
	        ra, sa, vr, vi,
	        notlast, cdivres;

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }

	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }

	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }

	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];

	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;

	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }

	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }

	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }

	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }

	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }

	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }

	            iter = iter + 1;

	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }

	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }

	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }

	                if (x === 0) {
	                    break;
	                }

	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }

	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }

	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;

	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }

	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }

	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }

	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }

	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }

	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }

	    if (norm === 0) {
	        return;
	    }

	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];

	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }

	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }

	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;

	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }

	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }

	                w = H[i][i] - p;

	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }

	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }

	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}

	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    }
	    else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}

	module.exports = EigenvalueDecomposition;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(147);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	function LuDecomposition(matrix) {
	    if (!(this instanceof LuDecomposition)) {
	        return new LuDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);

	    var lu = matrix.clone(),
	        rows = lu.rows,
	        columns = lu.columns,
	        pivotVector = new Array(rows),
	        pivotSign = 1,
	        i, j, k, p, s, t, v,
	        LUrowi, LUcolj, kmax;

	    for (i = 0; i < rows; i++) {
	        pivotVector[i] = i;
	    }

	    LUcolj = new Array(rows);

	    for (j = 0; j < columns; j++) {

	        for (i = 0; i < rows; i++) {
	            LUcolj[i] = lu[i][j];
	        }

	        for (i = 0; i < rows; i++) {
	            LUrowi = lu[i];
	            kmax = Math.min(i, j);
	            s = 0;
	            for (k = 0; k < kmax; k++) {
	                s += LUrowi[k] * LUcolj[k];
	            }
	            LUrowi[j] = LUcolj[i] -= s;
	        }

	        p = j;
	        for (i = j + 1; i < rows; i++) {
	            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                p = i;
	            }
	        }

	        if (p !== j) {
	            for (k = 0; k < columns; k++) {
	                t = lu[p][k];
	                lu[p][k] = lu[j][k];
	                lu[j][k] = t;
	            }

	            v = pivotVector[p];
	            pivotVector[p] = pivotVector[j];
	            pivotVector[j] = v;

	            pivotSign = -pivotSign;
	        }

	        if (j < rows && lu[j][j] !== 0) {
	            for (i = j + 1; i < rows; i++) {
	                lu[i][j] /= lu[j][j];
	            }
	        }
	    }

	    this.LU = lu;
	    this.pivotVector = pivotVector;
	    this.pivotSign = pivotSign;
	}

	LuDecomposition.prototype = {
	    isSingular: function () {
	        var data = this.LU,
	            col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    },
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare())
	            throw new Error('Matrix must be square');
	        var determinant = this.pivotSign, col = data.columns;
	        for (var j = 0; j < col; j++)
	            determinant *= data[j][j];
	        return determinant;
	    },
	    get lowerTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get upperTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var lu = this.LU,
	            rows = lu.rows;

	        if (rows !== value.rows)
	            throw new Error('Invalid matrix dimensions');
	        if (this.isSingular())
	            throw new Error('LU matrix is singular');

	        var count = value.columns,
	            X = value.subMatrixRow(this.pivotVector, 0, count - 1),
	            columns = lu.columns,
	            i, j, k;

	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = LuDecomposition;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(147);
	var hypotenuse = __webpack_require__(150).hypotenuse;

	//https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	function QrDecomposition(value) {
	    if (!(this instanceof QrDecomposition)) {
	        return new QrDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);

	    var qr = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        rdiag = new Array(n),
	        i, j, k, s;

	    for (k = 0; k < n; k++) {
	        var nrm = 0;
	        for (i = k; i < m; i++) {
	            nrm = hypotenuse(nrm, qr[i][k]);
	        }
	        if (nrm !== 0) {
	            if (qr[k][k] < 0) {
	                nrm = -nrm;
	            }
	            for (i = k; i < m; i++) {
	                qr[i][k] /= nrm;
	            }
	            qr[k][k] += 1;
	            for (j = k + 1; j < n; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * qr[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    qr[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        rdiag[k] = -nrm;
	    }

	    this.QR = qr;
	    this.Rdiag = rdiag;
	}

	QrDecomposition.prototype = {
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var qr = this.QR,
	            m = qr.rows;

	        if (value.rows !== m)
	            throw new Error('Matrix row dimensions must agree');
	        if (!this.isFullRank())
	            throw new Error('Matrix is rank deficient');

	        var count = value.columns,
	            X = value.clone(),
	            n = qr.columns,
	            i, j, k, s;

	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }

	        return X.subMatrix(0, n - 1, 0, count - 1);
	    },
	    isFullRank: function () {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    },
	    get upperTriangularFactor() {
	        var qr = this.QR,
	            n = qr.columns,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get orthogonalFactor() {
	        var qr = this.QR,
	            rows = qr.rows,
	            columns = qr.columns,
	            X = new Matrix(rows, columns),
	            i, j, k, s;

	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }

	                    s = -s / qr[k][k];

	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = QrDecomposition;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(147);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	function CholeskyDecomposition(value) {
	    if (!(this instanceof CholeskyDecomposition)) {
	        return new CholeskyDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);
	    if (!value.isSymmetric())
	        throw new Error('Matrix is not symmetric');

	    var a = value,
	        dimension = a.rows,
	        l = new Matrix(dimension, dimension),
	        positiveDefinite = true,
	        i, j, k;

	    for (j = 0; j < dimension; j++) {
	        var Lrowj = l[j];
	        var d = 0;
	        for (k = 0; k < j; k++) {
	            var Lrowk = l[k];
	            var s = 0;
	            for (i = 0; i < k; i++) {
	                s += Lrowk[i] * Lrowj[i];
	            }
	            Lrowj[k] = s = (a[j][k] - s) / l[k][k];
	            d = d + s * s;
	        }

	        d = a[j][j] - d;

	        positiveDefinite &= (d > 0);
	        l[j][j] = Math.sqrt(Math.max(d, 0));
	        for (k = j + 1; k < dimension; k++) {
	            l[j][k] = 0;
	        }
	    }

	    if (!positiveDefinite) {
	        throw new Error('Matrix is not positive definite');
	    }

	    this.L = l;
	}

	CholeskyDecomposition.prototype = {
	    get leftTriangularFactor() {
	        return this.L;
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var l = this.L,
	            dimension = l.rows;

	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }

	        var count = value.columns,
	            B = value.clone(),
	            i, j, k;

	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        return B;
	    }
	};

	module.exports = CholeskyDecomposition;


/***/ }
/******/ ])
});
;