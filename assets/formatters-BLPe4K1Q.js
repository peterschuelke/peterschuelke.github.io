import { j as jsxRuntimeExports } from "./index-CdKqxcjc.js";
var humanizeString$1 = { exports: {} };
var lib = { exports: {} };
var xregexp = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*!
   * XRegExp 4.0.0
   * <xregexp.com>
   * Steven Levithan (c) 2007-2017 MIT License
   */
  var REGEX_DATA = "xregexp";
  var features = {
    astral: false
  };
  var nativ = {
    exec: RegExp.prototype.exec,
    test: RegExp.prototype.test,
    match: String.prototype.match,
    replace: String.prototype.replace,
    split: String.prototype.split
  };
  var fixed = {};
  var regexCache = {};
  var patternCache = {};
  var tokens = [];
  var defaultScope = "default";
  var classScope = "class";
  var nativeTokens = {
    // Any native multicharacter token in default scope, or any single character
    "default": /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?(?:[:=!]|<[=!])|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
    // Any native multicharacter token in character class scope, or any single character
    "class": /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
  };
  var replacementToken = /\$(?:{([\w$]+)}|<([\w$]+)>|(\d\d?|[\s\S]))/g;
  var correctExecNpcg = nativ.exec.call(/()??/, "")[1] === void 0;
  var hasFlagsProp = /x/.flags !== void 0;
  var toString = {}.toString;
  function hasNativeFlag(flag) {
    var isSupported = true;
    try {
      new RegExp("", flag);
    } catch (exception) {
      isSupported = false;
    }
    return isSupported;
  }
  var hasNativeU = hasNativeFlag("u");
  var hasNativeY = hasNativeFlag("y");
  var registeredFlags = {
    g: true,
    i: true,
    m: true,
    u: hasNativeU,
    y: hasNativeY
  };
  function augment(regex, captureNames, xSource, xFlags, isInternalOnly) {
    var p = void 0;
    regex[REGEX_DATA] = {
      captureNames
    };
    if (isInternalOnly) {
      return regex;
    }
    if (regex.__proto__) {
      regex.__proto__ = XRegExp.prototype;
    } else {
      for (p in XRegExp.prototype) {
        regex[p] = XRegExp.prototype[p];
      }
    }
    regex[REGEX_DATA].source = xSource;
    regex[REGEX_DATA].flags = xFlags ? xFlags.split("").sort().join("") : xFlags;
    return regex;
  }
  function clipDuplicates(str) {
    return nativ.replace.call(str, /([\s\S])(?=[\s\S]*\1)/g, "");
  }
  function copyRegex(regex, options) {
    if (!XRegExp.isRegExp(regex)) {
      throw new TypeError("Type RegExp expected");
    }
    var xData = regex[REGEX_DATA] || {};
    var flags = getNativeFlags(regex);
    var flagsToAdd = "";
    var flagsToRemove = "";
    var xregexpSource = null;
    var xregexpFlags = null;
    options = options || {};
    if (options.removeG) {
      flagsToRemove += "g";
    }
    if (options.removeY) {
      flagsToRemove += "y";
    }
    if (flagsToRemove) {
      flags = nativ.replace.call(flags, new RegExp("[" + flagsToRemove + "]+", "g"), "");
    }
    if (options.addG) {
      flagsToAdd += "g";
    }
    if (options.addY) {
      flagsToAdd += "y";
    }
    if (flagsToAdd) {
      flags = clipDuplicates(flags + flagsToAdd);
    }
    if (!options.isInternalOnly) {
      if (xData.source !== void 0) {
        xregexpSource = xData.source;
      }
      if (xData.flags != null) {
        xregexpFlags = flagsToAdd ? clipDuplicates(xData.flags + flagsToAdd) : xData.flags;
      }
    }
    regex = augment(new RegExp(options.source || regex.source, flags), hasNamedCapture(regex) ? xData.captureNames.slice(0) : null, xregexpSource, xregexpFlags, options.isInternalOnly);
    return regex;
  }
  function dec(hex2) {
    return parseInt(hex2, 16);
  }
  function getContextualTokenSeparator(match, scope, flags) {
    if (
      // No need to separate tokens if at the beginning or end of a group
      match.input[match.index - 1] === "(" || match.input[match.index + match[0].length] === ")" || // Avoid separating tokens when the following token is a quantifier
      isQuantifierNext(match.input, match.index + match[0].length, flags)
    ) {
      return "";
    }
    return "(?:)";
  }
  function getNativeFlags(regex) {
    return hasFlagsProp ? regex.flags : (
      // Explicitly using `RegExp.prototype.toString` (rather than e.g. `String` or concatenation
      // with an empty string) allows this to continue working predictably when
      // `XRegExp.proptotype.toString` is overridden
      nativ.exec.call(/\/([a-z]*)$/i, RegExp.prototype.toString.call(regex))[1]
    );
  }
  function hasNamedCapture(regex) {
    return !!(regex[REGEX_DATA] && regex[REGEX_DATA].captureNames);
  }
  function hex(dec2) {
    return parseInt(dec2, 10).toString(16);
  }
  function isQuantifierNext(pattern, pos, flags) {
    return nativ.test.call(flags.indexOf("x") !== -1 ? (
      // Ignore any leading whitespace, line comments, and inline comments
      /^(?:\s|#[^#\n]*|\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/
    ) : (
      // Ignore any leading inline comments
      /^(?:\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/
    ), pattern.slice(pos));
  }
  function isType(value, type) {
    return toString.call(value) === "[object " + type + "]";
  }
  function pad4(str) {
    while (str.length < 4) {
      str = "0" + str;
    }
    return str;
  }
  function prepareFlags(pattern, flags) {
    var i = void 0;
    if (clipDuplicates(flags) !== flags) {
      throw new SyntaxError("Invalid duplicate regex flag " + flags);
    }
    pattern = nativ.replace.call(pattern, /^\(\?([\w$]+)\)/, function($0, $1) {
      if (nativ.test.call(/[gy]/, $1)) {
        throw new SyntaxError("Cannot use flag g or y in mode modifier " + $0);
      }
      flags = clipDuplicates(flags + $1);
      return "";
    });
    for (i = 0; i < flags.length; ++i) {
      if (!registeredFlags[flags[i]]) {
        throw new SyntaxError("Unknown regex flag " + flags[i]);
      }
    }
    return {
      pattern,
      flags
    };
  }
  function prepareOptions(value) {
    var options = {};
    if (isType(value, "String")) {
      XRegExp.forEach(value, /[^\s,]+/, function(match) {
        options[match] = true;
      });
      return options;
    }
    return value;
  }
  function registerFlag(flag) {
    if (!/^[\w$]$/.test(flag)) {
      throw new Error("Flag must be a single character A-Za-z0-9_$");
    }
    registeredFlags[flag] = true;
  }
  function runTokens(pattern, flags, pos, scope, context) {
    var i = tokens.length;
    var leadChar = pattern[pos];
    var result = null;
    var match = void 0;
    var t = void 0;
    while (i--) {
      t = tokens[i];
      if (t.leadChar && t.leadChar !== leadChar || t.scope !== scope && t.scope !== "all" || t.flag && !(flags.indexOf(t.flag) !== -1)) {
        continue;
      }
      match = XRegExp.exec(pattern, t.regex, pos, "sticky");
      if (match) {
        result = {
          matchLength: match[0].length,
          output: t.handler.call(context, match, scope, flags),
          reparse: t.reparse
        };
        break;
      }
    }
    return result;
  }
  function setAstral(on) {
    features.astral = on;
  }
  function toObject(value) {
    if (value == null) {
      throw new TypeError("Cannot convert null or undefined to object");
    }
    return value;
  }
  function XRegExp(pattern, flags) {
    if (XRegExp.isRegExp(pattern)) {
      if (flags !== void 0) {
        throw new TypeError("Cannot supply flags when copying a RegExp");
      }
      return copyRegex(pattern);
    }
    pattern = pattern === void 0 ? "" : String(pattern);
    flags = flags === void 0 ? "" : String(flags);
    if (XRegExp.isInstalled("astral") && !(flags.indexOf("A") !== -1)) {
      flags += "A";
    }
    if (!patternCache[pattern]) {
      patternCache[pattern] = {};
    }
    if (!patternCache[pattern][flags]) {
      var context = {
        hasNamedCapture: false,
        captureNames: []
      };
      var scope = defaultScope;
      var output = "";
      var pos = 0;
      var result = void 0;
      var applied = prepareFlags(pattern, flags);
      var appliedPattern = applied.pattern;
      var appliedFlags = applied.flags;
      while (pos < appliedPattern.length) {
        do {
          result = runTokens(appliedPattern, appliedFlags, pos, scope, context);
          if (result && result.reparse) {
            appliedPattern = appliedPattern.slice(0, pos) + result.output + appliedPattern.slice(pos + result.matchLength);
          }
        } while (result && result.reparse);
        if (result) {
          output += result.output;
          pos += result.matchLength || 1;
        } else {
          var token = XRegExp.exec(appliedPattern, nativeTokens[scope], pos, "sticky")[0];
          output += token;
          pos += token.length;
          if (token === "[" && scope === defaultScope) {
            scope = classScope;
          } else if (token === "]" && scope === classScope) {
            scope = defaultScope;
          }
        }
      }
      patternCache[pattern][flags] = {
        // Use basic cleanup to collapse repeated empty groups like `(?:)(?:)` to `(?:)`. Empty
        // groups are sometimes inserted during regex transpilation in order to keep tokens
        // separated. However, more than one empty group in a row is never needed.
        pattern: nativ.replace.call(output, /(?:\(\?:\))+/g, "(?:)"),
        // Strip all but native flags
        flags: nativ.replace.call(appliedFlags, /[^gimuy]+/g, ""),
        // `context.captureNames` has an item for each capturing group, even if unnamed
        captures: context.hasNamedCapture ? context.captureNames : null
      };
    }
    var generated = patternCache[pattern][flags];
    return augment(new RegExp(generated.pattern, generated.flags), generated.captures, pattern, flags);
  }
  XRegExp.prototype = /(?:)/;
  XRegExp.version = "4.0.0";
  XRegExp._clipDuplicates = clipDuplicates;
  XRegExp._hasNativeFlag = hasNativeFlag;
  XRegExp._dec = dec;
  XRegExp._hex = hex;
  XRegExp._pad4 = pad4;
  XRegExp.addToken = function(regex, handler, options) {
    options = options || {};
    var optionalFlags = options.optionalFlags;
    var i = void 0;
    if (options.flag) {
      registerFlag(options.flag);
    }
    if (optionalFlags) {
      optionalFlags = nativ.split.call(optionalFlags, "");
      for (i = 0; i < optionalFlags.length; ++i) {
        registerFlag(optionalFlags[i]);
      }
    }
    tokens.push({
      regex: copyRegex(regex, {
        addG: true,
        addY: hasNativeY,
        isInternalOnly: true
      }),
      handler,
      scope: options.scope || defaultScope,
      flag: options.flag,
      reparse: options.reparse,
      leadChar: options.leadChar
    });
    XRegExp.cache.flush("patterns");
  };
  XRegExp.cache = function(pattern, flags) {
    if (!regexCache[pattern]) {
      regexCache[pattern] = {};
    }
    return regexCache[pattern][flags] || (regexCache[pattern][flags] = XRegExp(pattern, flags));
  };
  XRegExp.cache.flush = function(cacheName) {
    if (cacheName === "patterns") {
      patternCache = {};
    } else {
      regexCache = {};
    }
  };
  XRegExp.escape = function(str) {
    return nativ.replace.call(toObject(str), /[-\[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
  XRegExp.exec = function(str, regex, pos, sticky) {
    var cacheKey = "g";
    var addY = false;
    var fakeY = false;
    var match = void 0;
    addY = hasNativeY && !!(sticky || regex.sticky && sticky !== false);
    if (addY) {
      cacheKey += "y";
    } else if (sticky) {
      fakeY = true;
      cacheKey += "FakeY";
    }
    regex[REGEX_DATA] = regex[REGEX_DATA] || {};
    var r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
      addG: true,
      addY,
      source: fakeY ? regex.source + "|()" : void 0,
      removeY: sticky === false,
      isInternalOnly: true
    }));
    pos = pos || 0;
    r2.lastIndex = pos;
    match = fixed.exec.call(r2, str);
    if (fakeY && match && match.pop() === "") {
      match = null;
    }
    if (regex.global) {
      regex.lastIndex = match ? r2.lastIndex : 0;
    }
    return match;
  };
  XRegExp.forEach = function(str, regex, callback) {
    var pos = 0;
    var i = -1;
    var match = void 0;
    while (match = XRegExp.exec(str, regex, pos)) {
      callback(match, ++i, str, regex);
      pos = match.index + (match[0].length || 1);
    }
  };
  XRegExp.globalize = function(regex) {
    return copyRegex(regex, { addG: true });
  };
  XRegExp.install = function(options) {
    options = prepareOptions(options);
    if (!features.astral && options.astral) {
      setAstral(true);
    }
  };
  XRegExp.isInstalled = function(feature) {
    return !!features[feature];
  };
  XRegExp.isRegExp = function(value) {
    return toString.call(value) === "[object RegExp]";
  };
  XRegExp.match = function(str, regex, scope) {
    var global = regex.global && scope !== "one" || scope === "all";
    var cacheKey = (global ? "g" : "") + (regex.sticky ? "y" : "") || "noGY";
    regex[REGEX_DATA] = regex[REGEX_DATA] || {};
    var r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
      addG: !!global,
      removeG: scope === "one",
      isInternalOnly: true
    }));
    var result = nativ.match.call(toObject(str), r2);
    if (regex.global) {
      regex.lastIndex = scope === "one" && result ? (
        // Can't use `r2.lastIndex` since `r2` is nonglobal in this case
        result.index + result[0].length
      ) : 0;
    }
    return global ? result || [] : result && result[0];
  };
  XRegExp.matchChain = function(str, chain) {
    return function recurseChain(values, level) {
      var item = chain[level].regex ? chain[level] : { regex: chain[level] };
      var matches = [];
      function addMatch(match) {
        if (item.backref) {
          if (!(match.hasOwnProperty(item.backref) || +item.backref < match.length)) {
            throw new ReferenceError("Backreference to undefined group: " + item.backref);
          }
          matches.push(match[item.backref] || "");
        } else {
          matches.push(match[0]);
        }
      }
      for (var i = 0; i < values.length; ++i) {
        XRegExp.forEach(values[i], item.regex, addMatch);
      }
      return level === chain.length - 1 || !matches.length ? matches : recurseChain(matches, level + 1);
    }([str], 0);
  };
  XRegExp.replace = function(str, search, replacement, scope) {
    var isRegex = XRegExp.isRegExp(search);
    var global = search.global && scope !== "one" || scope === "all";
    var cacheKey = (global ? "g" : "") + (search.sticky ? "y" : "") || "noGY";
    var s2 = search;
    if (isRegex) {
      search[REGEX_DATA] = search[REGEX_DATA] || {};
      s2 = search[REGEX_DATA][cacheKey] || (search[REGEX_DATA][cacheKey] = copyRegex(search, {
        addG: !!global,
        removeG: scope === "one",
        isInternalOnly: true
      }));
    } else if (global) {
      s2 = new RegExp(XRegExp.escape(String(search)), "g");
    }
    var result = fixed.replace.call(toObject(str), s2, replacement);
    if (isRegex && search.global) {
      search.lastIndex = 0;
    }
    return result;
  };
  XRegExp.replaceEach = function(str, replacements) {
    var i = void 0;
    var r = void 0;
    for (i = 0; i < replacements.length; ++i) {
      r = replacements[i];
      str = XRegExp.replace(str, r[0], r[1], r[2]);
    }
    return str;
  };
  XRegExp.split = function(str, separator, limit) {
    return fixed.split.call(toObject(str), separator, limit);
  };
  XRegExp.test = function(str, regex, pos, sticky) {
    return !!XRegExp.exec(str, regex, pos, sticky);
  };
  XRegExp.uninstall = function(options) {
    options = prepareOptions(options);
    if (features.astral && options.astral) {
      setAstral(false);
    }
  };
  XRegExp.union = function(patterns, flags, options) {
    options = options || {};
    var conjunction = options.conjunction || "or";
    var numCaptures = 0;
    var numPriorCaptures = void 0;
    var captureNames = void 0;
    function rewrite(match, paren, backref) {
      var name = captureNames[numCaptures - numPriorCaptures];
      if (paren) {
        ++numCaptures;
        if (name) {
          return "(?<" + name + ">";
        }
      } else if (backref) {
        return "\\" + (+backref + numPriorCaptures);
      }
      return match;
    }
    if (!(isType(patterns, "Array") && patterns.length)) {
      throw new TypeError("Must provide a nonempty array of patterns to merge");
    }
    var parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g;
    var output = [];
    var pattern = void 0;
    for (var i = 0; i < patterns.length; ++i) {
      pattern = patterns[i];
      if (XRegExp.isRegExp(pattern)) {
        numPriorCaptures = numCaptures;
        captureNames = pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames || [];
        output.push(nativ.replace.call(XRegExp(pattern.source).source, parts, rewrite));
      } else {
        output.push(XRegExp.escape(pattern));
      }
    }
    var separator = conjunction === "none" ? "" : "|";
    return XRegExp(output.join(separator), flags);
  };
  fixed.exec = function(str) {
    var origLastIndex = this.lastIndex;
    var match = nativ.exec.apply(this, arguments);
    if (match) {
      if (!correctExecNpcg && match.length > 1 && match.indexOf("") !== -1) {
        var r2 = copyRegex(this, {
          removeG: true,
          isInternalOnly: true
        });
        nativ.replace.call(String(str).slice(match.index), r2, function() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          var len = args.length;
          for (var i2 = 1; i2 < len - 2; ++i2) {
            if (args[i2] === void 0) {
              match[i2] = void 0;
            }
          }
        });
      }
      if (this[REGEX_DATA] && this[REGEX_DATA].captureNames) {
        for (var i = 1; i < match.length; ++i) {
          var name = this[REGEX_DATA].captureNames[i - 1];
          if (name) {
            match[name] = match[i];
          }
        }
      }
      if (this.global && !match[0].length && this.lastIndex > match.index) {
        this.lastIndex = match.index;
      }
    }
    if (!this.global) {
      this.lastIndex = origLastIndex;
    }
    return match;
  };
  fixed.test = function(str) {
    return !!fixed.exec.call(this, str);
  };
  fixed.match = function(regex) {
    if (!XRegExp.isRegExp(regex)) {
      regex = new RegExp(regex);
    } else if (regex.global) {
      var result = nativ.match.apply(this, arguments);
      regex.lastIndex = 0;
      return result;
    }
    return fixed.exec.call(regex, toObject(this));
  };
  fixed.replace = function(search, replacement) {
    var isRegex = XRegExp.isRegExp(search);
    var origLastIndex = void 0;
    var captureNames = void 0;
    var result = void 0;
    if (isRegex) {
      if (search[REGEX_DATA]) {
        captureNames = search[REGEX_DATA].captureNames;
      }
      origLastIndex = search.lastIndex;
    } else {
      search += "";
    }
    if (isType(replacement, "Function")) {
      result = nativ.replace.call(String(this), search, function() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        if (captureNames) {
          args[0] = new String(args[0]);
          for (var i = 0; i < captureNames.length; ++i) {
            if (captureNames[i]) {
              args[0][captureNames[i]] = args[i + 1];
            }
          }
        }
        if (isRegex && search.global) {
          search.lastIndex = args[args.length - 2] + args[0].length;
        }
        return replacement.apply(void 0, args);
      });
    } else {
      result = nativ.replace.call(this == null ? this : String(this), search, function() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        return nativ.replace.call(String(replacement), replacementToken, replacer);
        function replacer($0, bracketed, angled, dollarToken) {
          bracketed = bracketed || angled;
          if (bracketed) {
            var n = +bracketed;
            if (n <= args.length - 3) {
              return args[n] || "";
            }
            n = captureNames ? captureNames.indexOf(bracketed) : -1;
            if (n < 0) {
              throw new SyntaxError("Backreference to undefined group " + $0);
            }
            return args[n + 1] || "";
          }
          if (dollarToken === "$") {
            return "$";
          }
          if (dollarToken === "&" || +dollarToken === 0) {
            return args[0];
          }
          if (dollarToken === "`") {
            return args[args.length - 1].slice(0, args[args.length - 2]);
          }
          if (dollarToken === "'") {
            return args[args.length - 1].slice(args[args.length - 2] + args[0].length);
          }
          dollarToken = +dollarToken;
          if (!isNaN(dollarToken)) {
            if (dollarToken > args.length - 3) {
              throw new SyntaxError("Backreference to undefined group " + $0);
            }
            return args[dollarToken] || "";
          }
          throw new SyntaxError("Invalid token " + $0);
        }
      });
    }
    if (isRegex) {
      if (search.global) {
        search.lastIndex = 0;
      } else {
        search.lastIndex = origLastIndex;
      }
    }
    return result;
  };
  fixed.split = function(separator, limit) {
    if (!XRegExp.isRegExp(separator)) {
      return nativ.split.apply(this, arguments);
    }
    var str = String(this);
    var output = [];
    var origLastIndex = separator.lastIndex;
    var lastLastIndex = 0;
    var lastLength = void 0;
    limit = (limit === void 0 ? -1 : limit) >>> 0;
    XRegExp.forEach(str, separator, function(match) {
      if (match.index + match[0].length > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = match.index + lastLength;
      }
    });
    if (lastLastIndex === str.length) {
      if (!nativ.test.call(separator, "") || lastLength) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    separator.lastIndex = origLastIndex;
    return output.length > limit ? output.slice(0, limit) : output;
  };
  XRegExp.addToken(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/, function(match, scope) {
    if (match[1] === "B" && scope === defaultScope) {
      return match[0];
    }
    throw new SyntaxError("Invalid escape " + match[0]);
  }, {
    scope: "all",
    leadChar: "\\"
  });
  XRegExp.addToken(/\\u{([\dA-Fa-f]+)}/, function(match, scope, flags) {
    var code = dec(match[1]);
    if (code > 1114111) {
      throw new SyntaxError("Invalid Unicode code point " + match[0]);
    }
    if (code <= 65535) {
      return "\\u" + pad4(hex(code));
    }
    if (hasNativeU && flags.indexOf("u") !== -1) {
      return match[0];
    }
    throw new SyntaxError("Cannot use Unicode code point above \\u{FFFF} without flag u");
  }, {
    scope: "all",
    leadChar: "\\"
  });
  XRegExp.addToken(
    /\[(\^?)\]/,
    // For cross-browser compatibility with ES3, convert [] to \b\B and [^] to [\s\S].
    // (?!) should work like \b\B, but is unreliable in some versions of Firefox
    /* eslint-disable no-confusing-arrow */
    function(match) {
      return match[1] ? "[\\s\\S]" : "\\b\\B";
    },
    /* eslint-enable no-confusing-arrow */
    { leadChar: "[" }
  );
  XRegExp.addToken(/\(\?#[^)]*\)/, getContextualTokenSeparator, { leadChar: "(" });
  XRegExp.addToken(/\s+|#[^\n]*\n?/, getContextualTokenSeparator, { flag: "x" });
  XRegExp.addToken(/\./, function() {
    return "[\\s\\S]";
  }, {
    flag: "s",
    leadChar: "."
  });
  XRegExp.addToken(/\\k<([\w$]+)>/, function(match) {
    var index = isNaN(match[1]) ? this.captureNames.indexOf(match[1]) + 1 : +match[1];
    var endIndex = match.index + match[0].length;
    if (!index || index > this.captureNames.length) {
      throw new SyntaxError("Backreference to undefined group " + match[0]);
    }
    return "\\" + index + (endIndex === match.input.length || isNaN(match.input[endIndex]) ? "" : "(?:)");
  }, { leadChar: "\\" });
  XRegExp.addToken(/\\(\d+)/, function(match, scope) {
    if (!(scope === defaultScope && /^[1-9]/.test(match[1]) && +match[1] <= this.captureNames.length) && match[1] !== "0") {
      throw new SyntaxError("Cannot use octal escape or backreference to undefined group " + match[0]);
    }
    return match[0];
  }, {
    scope: "all",
    leadChar: "\\"
  });
  XRegExp.addToken(/\(\?P?<([\w$]+)>/, function(match) {
    if (!isNaN(match[1])) {
      throw new SyntaxError("Cannot use integer as capture name " + match[0]);
    }
    if (match[1] === "length" || match[1] === "__proto__") {
      throw new SyntaxError("Cannot use reserved word as capture name " + match[0]);
    }
    if (this.captureNames.indexOf(match[1]) !== -1) {
      throw new SyntaxError("Cannot use same name for multiple groups " + match[0]);
    }
    this.captureNames.push(match[1]);
    this.hasNamedCapture = true;
    return "(";
  }, { leadChar: "(" });
  XRegExp.addToken(/\((?!\?)/, function(match, scope, flags) {
    if (flags.indexOf("n") !== -1) {
      return "(?:";
    }
    this.captureNames.push(null);
    return "(";
  }, {
    optionalFlags: "n",
    leadChar: "("
  });
  exports.default = XRegExp;
  module.exports = exports["default"];
})(xregexp, xregexp.exports);
var xregexpExports = xregexp.exports;
var build = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*!
   * XRegExp.build 4.0.0
   * <xregexp.com>
   * Steven Levithan (c) 2012-2017 MIT License
   */
  exports.default = function(XRegExp) {
    var REGEX_DATA = "xregexp";
    var subParts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g;
    var parts = XRegExp.union([/\({{([\w$]+)}}\)|{{([\w$]+)}}/, subParts], "g", {
      conjunction: "or"
    });
    function deanchor(pattern) {
      var leadingAnchor = /^(?:\(\?:\))*\^/;
      var trailingAnchor = /\$(?:\(\?:\))*$/;
      if (leadingAnchor.test(pattern) && trailingAnchor.test(pattern) && // Ensure that the trailing `$` isn't escaped
      trailingAnchor.test(pattern.replace(/\\[\s\S]/g, ""))) {
        return pattern.replace(leadingAnchor, "").replace(trailingAnchor, "");
      }
      return pattern;
    }
    function asXRegExp(value, addFlagX) {
      var flags = addFlagX ? "x" : "";
      return XRegExp.isRegExp(value) ? value[REGEX_DATA] && value[REGEX_DATA].captureNames ? (
        // Don't recompile, to preserve capture names
        value
      ) : (
        // Recompile as XRegExp
        XRegExp(value.source, flags)
      ) : (
        // Compile string as XRegExp
        XRegExp(value, flags)
      );
    }
    function interpolate(substitution) {
      return substitution instanceof RegExp ? substitution : XRegExp.escape(substitution);
    }
    function reduceToSubpatternsObject(subpatterns, interpolated, subpatternIndex) {
      subpatterns["subpattern" + subpatternIndex] = interpolated;
      return subpatterns;
    }
    function embedSubpatternAfter(raw, subpatternIndex, rawLiterals) {
      var hasSubpattern = subpatternIndex < rawLiterals.length - 1;
      return raw + (hasSubpattern ? "{{subpattern" + subpatternIndex + "}}" : "");
    }
    XRegExp.tag = function(flags) {
      return function(literals) {
        for (var _len = arguments.length, substitutions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          substitutions[_key - 1] = arguments[_key];
        }
        var subpatterns = substitutions.map(interpolate).reduce(reduceToSubpatternsObject, {});
        var pattern = literals.raw.map(embedSubpatternAfter).join("");
        return XRegExp.build(pattern, subpatterns, flags);
      };
    };
    XRegExp.build = function(pattern, subs, flags) {
      flags = flags || "";
      var addFlagX = flags.indexOf("x") !== -1;
      var inlineFlags = /^\(\?([\w$]+)\)/.exec(pattern);
      if (inlineFlags) {
        flags = XRegExp._clipDuplicates(flags + inlineFlags[1]);
      }
      var data = {};
      for (var p in subs) {
        if (subs.hasOwnProperty(p)) {
          var sub = asXRegExp(subs[p], addFlagX);
          data[p] = {
            // Deanchoring allows embedding independently useful anchored regexes. If you
            // really need to keep your anchors, double them (i.e., `^^...$$`).
            pattern: deanchor(sub.source),
            names: sub[REGEX_DATA].captureNames || []
          };
        }
      }
      var patternAsRegex = asXRegExp(pattern, addFlagX);
      var numCaps = 0;
      var numPriorCaps = void 0;
      var numOuterCaps = 0;
      var outerCapsMap = [0];
      var outerCapNames = patternAsRegex[REGEX_DATA].captureNames || [];
      var output = patternAsRegex.source.replace(parts, function($0, $1, $2, $3, $4) {
        var subName = $1 || $2;
        var capName = void 0;
        var intro = void 0;
        var localCapIndex = void 0;
        if (subName) {
          if (!data.hasOwnProperty(subName)) {
            throw new ReferenceError("Undefined property " + $0);
          }
          if ($1) {
            capName = outerCapNames[numOuterCaps];
            outerCapsMap[++numOuterCaps] = ++numCaps;
            intro = "(?<" + (capName || subName) + ">";
          } else {
            intro = "(?:";
          }
          numPriorCaps = numCaps;
          var rewrittenSubpattern = data[subName].pattern.replace(subParts, function(match, paren, backref) {
            if (paren) {
              capName = data[subName].names[numCaps - numPriorCaps];
              ++numCaps;
              if (capName) {
                return "(?<" + capName + ">";
              }
            } else if (backref) {
              localCapIndex = +backref - 1;
              return data[subName].names[localCapIndex] ? (
                // Need to preserve the backreference name in case using flag `n`
                "\\k<" + data[subName].names[localCapIndex] + ">"
              ) : "\\" + (+backref + numPriorCaps);
            }
            return match;
          });
          return "" + intro + rewrittenSubpattern + ")";
        }
        if ($3) {
          capName = outerCapNames[numOuterCaps];
          outerCapsMap[++numOuterCaps] = ++numCaps;
          if (capName) {
            return "(?<" + capName + ">";
          }
        } else if ($4) {
          localCapIndex = +$4 - 1;
          return outerCapNames[localCapIndex] ? (
            // Need to preserve the backreference name in case using flag `n`
            "\\k<" + outerCapNames[localCapIndex] + ">"
          ) : "\\" + outerCapsMap[+$4];
        }
        return $0;
      });
      return XRegExp(output, flags);
    };
  };
  module.exports = exports["default"];
})(build, build.exports);
var buildExports = build.exports;
var matchrecursive = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*!
   * XRegExp.matchRecursive 4.0.0
   * <xregexp.com>
   * Steven Levithan (c) 2009-2017 MIT License
   */
  exports.default = function(XRegExp) {
    function row(name, value, start, end) {
      return {
        name,
        value,
        start,
        end
      };
    }
    XRegExp.matchRecursive = function(str, left, right, flags, options) {
      flags = flags || "";
      options = options || {};
      var global = flags.indexOf("g") !== -1;
      var sticky = flags.indexOf("y") !== -1;
      var basicFlags = flags.replace(/y/g, "");
      var escapeChar = options.escapeChar;
      var vN = options.valueNames;
      var output = [];
      var openTokens = 0;
      var delimStart = 0;
      var delimEnd = 0;
      var lastOuterEnd = 0;
      var outerStart = void 0;
      var innerStart = void 0;
      var leftMatch = void 0;
      var rightMatch = void 0;
      var esc = void 0;
      left = XRegExp(left, basicFlags);
      right = XRegExp(right, basicFlags);
      if (escapeChar) {
        if (escapeChar.length > 1) {
          throw new Error("Cannot use more than one escape character");
        }
        escapeChar = XRegExp.escape(escapeChar);
        esc = new RegExp(
          "(?:" + escapeChar + "[\\S\\s]|(?:(?!" + // Using `XRegExp.union` safely rewrites backreferences in `left` and `right`.
          // Intentionally not passing `basicFlags` to `XRegExp.union` since any syntax
          // transformation resulting from those flags was already applied to `left` and
          // `right` when they were passed through the XRegExp constructor above.
          XRegExp.union([left, right], "", { conjunction: "or" }).source + ")[^" + escapeChar + "])+)+",
          // Flags `gy` not needed here
          flags.replace(/[^imu]+/g, "")
        );
      }
      while (true) {
        if (escapeChar) {
          delimEnd += (XRegExp.exec(str, esc, delimEnd, "sticky") || [""])[0].length;
        }
        leftMatch = XRegExp.exec(str, left, delimEnd);
        rightMatch = XRegExp.exec(str, right, delimEnd);
        if (leftMatch && rightMatch) {
          if (leftMatch.index <= rightMatch.index) {
            rightMatch = null;
          } else {
            leftMatch = null;
          }
        }
        if (leftMatch || rightMatch) {
          delimStart = (leftMatch || rightMatch).index;
          delimEnd = delimStart + (leftMatch || rightMatch)[0].length;
        } else if (!openTokens) {
          break;
        }
        if (sticky && !openTokens && delimStart > lastOuterEnd) {
          break;
        }
        if (leftMatch) {
          if (!openTokens) {
            outerStart = delimStart;
            innerStart = delimEnd;
          }
          ++openTokens;
        } else if (rightMatch && openTokens) {
          if (!--openTokens) {
            if (vN) {
              if (vN[0] && outerStart > lastOuterEnd) {
                output.push(row(vN[0], str.slice(lastOuterEnd, outerStart), lastOuterEnd, outerStart));
              }
              if (vN[1]) {
                output.push(row(vN[1], str.slice(outerStart, innerStart), outerStart, innerStart));
              }
              if (vN[2]) {
                output.push(row(vN[2], str.slice(innerStart, delimStart), innerStart, delimStart));
              }
              if (vN[3]) {
                output.push(row(vN[3], str.slice(delimStart, delimEnd), delimStart, delimEnd));
              }
            } else {
              output.push(str.slice(innerStart, delimStart));
            }
            lastOuterEnd = delimEnd;
            if (!global) {
              break;
            }
          }
        } else {
          throw new Error("Unbalanced delimiter found in string");
        }
        if (delimStart === delimEnd) {
          ++delimEnd;
        }
      }
      if (global && !sticky && vN && vN[0] && str.length > lastOuterEnd) {
        output.push(row(vN[0], str.slice(lastOuterEnd), lastOuterEnd, str.length));
      }
      return output;
    };
  };
  module.exports = exports["default"];
})(matchrecursive, matchrecursive.exports);
var matchrecursiveExports = matchrecursive.exports;
var unicodeBase = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*!
   * XRegExp Unicode Base 4.0.0
   * <xregexp.com>
   * Steven Levithan (c) 2008-2017 MIT License
   */
  exports.default = function(XRegExp) {
    var unicode = {};
    var dec = XRegExp._dec;
    var hex = XRegExp._hex;
    var pad4 = XRegExp._pad4;
    function normalize(name) {
      return name.replace(/[- _]+/g, "").toLowerCase();
    }
    function charCode(chr) {
      var esc = /^\\[xu](.+)/.exec(chr);
      return esc ? dec(esc[1]) : chr.charCodeAt(chr[0] === "\\" ? 1 : 0);
    }
    function invertBmp(range) {
      var output = "";
      var lastEnd = -1;
      XRegExp.forEach(range, /(\\x..|\\u....|\\?[\s\S])(?:-(\\x..|\\u....|\\?[\s\S]))?/, function(m) {
        var start = charCode(m[1]);
        if (start > lastEnd + 1) {
          output += "\\u" + pad4(hex(lastEnd + 1));
          if (start > lastEnd + 2) {
            output += "-\\u" + pad4(hex(start - 1));
          }
        }
        lastEnd = charCode(m[2] || m[1]);
      });
      if (lastEnd < 65535) {
        output += "\\u" + pad4(hex(lastEnd + 1));
        if (lastEnd < 65534) {
          output += "-\\uFFFF";
        }
      }
      return output;
    }
    function cacheInvertedBmp(slug) {
      var prop = "b!";
      return unicode[slug][prop] || (unicode[slug][prop] = invertBmp(unicode[slug].bmp));
    }
    function buildAstral(slug, isNegated) {
      var item = unicode[slug];
      var combined = "";
      if (item.bmp && !item.isBmpLast) {
        combined = "[" + item.bmp + "]" + (item.astral ? "|" : "");
      }
      if (item.astral) {
        combined += item.astral;
      }
      if (item.isBmpLast && item.bmp) {
        combined += (item.astral ? "|" : "") + "[" + item.bmp + "]";
      }
      return isNegated ? "(?:(?!" + combined + ")(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[\0-￿]))" : "(?:" + combined + ")";
    }
    function cacheAstral(slug, isNegated) {
      var prop = isNegated ? "a!" : "a=";
      return unicode[slug][prop] || (unicode[slug][prop] = buildAstral(slug, isNegated));
    }
    XRegExp.addToken(
      // Use `*` instead of `+` to avoid capturing `^` as the token name in `\p{^}`
      /\\([pP])(?:{(\^?)([^}]*)}|([A-Za-z]))/,
      function(match, scope, flags) {
        var ERR_DOUBLE_NEG = "Invalid double negation ";
        var ERR_UNKNOWN_NAME = "Unknown Unicode token ";
        var ERR_UNKNOWN_REF = "Unicode token missing data ";
        var ERR_ASTRAL_ONLY = "Astral mode required for Unicode token ";
        var ERR_ASTRAL_IN_CLASS = "Astral mode does not support Unicode tokens within character classes";
        var isNegated = match[1] === "P" || !!match[2];
        var isAstralMode = flags.indexOf("A") !== -1;
        var slug = normalize(match[4] || match[3]);
        var item = unicode[slug];
        if (match[1] === "P" && match[2]) {
          throw new SyntaxError(ERR_DOUBLE_NEG + match[0]);
        }
        if (!unicode.hasOwnProperty(slug)) {
          throw new SyntaxError(ERR_UNKNOWN_NAME + match[0]);
        }
        if (item.inverseOf) {
          slug = normalize(item.inverseOf);
          if (!unicode.hasOwnProperty(slug)) {
            throw new ReferenceError(ERR_UNKNOWN_REF + match[0] + " -> " + item.inverseOf);
          }
          item = unicode[slug];
          isNegated = !isNegated;
        }
        if (!(item.bmp || isAstralMode)) {
          throw new SyntaxError(ERR_ASTRAL_ONLY + match[0]);
        }
        if (isAstralMode) {
          if (scope === "class") {
            throw new SyntaxError(ERR_ASTRAL_IN_CLASS);
          }
          return cacheAstral(slug, isNegated);
        }
        return scope === "class" ? isNegated ? cacheInvertedBmp(slug) : item.bmp : (isNegated ? "[^" : "[") + item.bmp + "]";
      },
      {
        scope: "all",
        optionalFlags: "A",
        leadChar: "\\"
      }
    );
    XRegExp.addUnicodeData = function(data) {
      var ERR_NO_NAME = "Unicode token requires name";
      var ERR_NO_DATA = "Unicode token has no character data ";
      var item = void 0;
      for (var i = 0; i < data.length; ++i) {
        item = data[i];
        if (!item.name) {
          throw new Error(ERR_NO_NAME);
        }
        if (!(item.inverseOf || item.bmp || item.astral)) {
          throw new Error(ERR_NO_DATA + item.name);
        }
        unicode[normalize(item.name)] = item;
        if (item.alias) {
          unicode[normalize(item.alias)] = item;
        }
      }
      XRegExp.cache.flush("patterns");
    };
    XRegExp._getUnicodeProperty = function(name) {
      var slug = normalize(name);
      return unicode[slug];
    };
  };
  module.exports = exports["default"];
})(unicodeBase, unicodeBase.exports);
var unicodeBaseExports = unicodeBase.exports;
var unicodeBlocks = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*!
   * XRegExp Unicode Blocks 4.0.0
   * <xregexp.com>
   * Steven Levithan (c) 2010-2017 MIT License
   * Unicode data by Mathias Bynens <mathiasbynens.be>
   */
  exports.default = function(XRegExp) {
    if (!XRegExp.addUnicodeData) {
      throw new ReferenceError("Unicode Base must be loaded before Unicode Blocks");
    }
    XRegExp.addUnicodeData([{
      name: "InAdlam",
      astral: "\uD83A[\uDD00-\uDD5F]"
    }, {
      name: "InAegean_Numbers",
      astral: "\uD800[\uDD00-\uDD3F]"
    }, {
      name: "InAhom",
      astral: "\uD805[\uDF00-\uDF3F]"
    }, {
      name: "InAlchemical_Symbols",
      astral: "\uD83D[\uDF00-\uDF7F]"
    }, {
      name: "InAlphabetic_Presentation_Forms",
      bmp: "ﬀ-ﭏ"
    }, {
      name: "InAnatolian_Hieroglyphs",
      astral: "\uD811[\uDC00-\uDE7F]"
    }, {
      name: "InAncient_Greek_Musical_Notation",
      astral: "\uD834[\uDE00-\uDE4F]"
    }, {
      name: "InAncient_Greek_Numbers",
      astral: "\uD800[\uDD40-\uDD8F]"
    }, {
      name: "InAncient_Symbols",
      astral: "\uD800[\uDD90-\uDDCF]"
    }, {
      name: "InArabic",
      bmp: "؀-ۿ"
    }, {
      name: "InArabic_Extended_A",
      bmp: "ࢠ-ࣿ"
    }, {
      name: "InArabic_Mathematical_Alphabetic_Symbols",
      astral: "\uD83B[\uDE00-\uDEFF]"
    }, {
      name: "InArabic_Presentation_Forms_A",
      bmp: "ﭐ-﷿"
    }, {
      name: "InArabic_Presentation_Forms_B",
      bmp: "ﹰ-\uFEFF"
    }, {
      name: "InArabic_Supplement",
      bmp: "ݐ-ݿ"
    }, {
      name: "InArmenian",
      bmp: "԰-֏"
    }, {
      name: "InArrows",
      bmp: "←-⇿"
    }, {
      name: "InAvestan",
      astral: "\uD802[\uDF00-\uDF3F]"
    }, {
      name: "InBalinese",
      bmp: "ᬀ-᭿"
    }, {
      name: "InBamum",
      bmp: "ꚠ-꛿"
    }, {
      name: "InBamum_Supplement",
      astral: "\uD81A[\uDC00-\uDE3F]"
    }, {
      name: "InBasic_Latin",
      bmp: "\0-"
    }, {
      name: "InBassa_Vah",
      astral: "\uD81A[\uDED0-\uDEFF]"
    }, {
      name: "InBatak",
      bmp: "ᯀ-᯿"
    }, {
      name: "InBengali",
      bmp: "ঀ-৿"
    }, {
      name: "InBhaiksuki",
      astral: "\uD807[\uDC00-\uDC6F]"
    }, {
      name: "InBlock_Elements",
      bmp: "▀-▟"
    }, {
      name: "InBopomofo",
      bmp: "㄀-ㄯ"
    }, {
      name: "InBopomofo_Extended",
      bmp: "ㆠ-ㆿ"
    }, {
      name: "InBox_Drawing",
      bmp: "─-╿"
    }, {
      name: "InBrahmi",
      astral: "\uD804[\uDC00-\uDC7F]"
    }, {
      name: "InBraille_Patterns",
      bmp: "⠀-⣿"
    }, {
      name: "InBuginese",
      bmp: "ᨀ-᨟"
    }, {
      name: "InBuhid",
      bmp: "ᝀ-᝟"
    }, {
      name: "InByzantine_Musical_Symbols",
      astral: "\uD834[\uDC00-\uDCFF]"
    }, {
      name: "InCJK_Compatibility",
      bmp: "㌀-㏿"
    }, {
      name: "InCJK_Compatibility_Forms",
      bmp: "︰-﹏"
    }, {
      name: "InCJK_Compatibility_Ideographs",
      bmp: "豈-﫿"
    }, {
      name: "InCJK_Compatibility_Ideographs_Supplement",
      astral: "\uD87E[\uDC00-\uDE1F]"
    }, {
      name: "InCJK_Radicals_Supplement",
      bmp: "⺀-⻿"
    }, {
      name: "InCJK_Strokes",
      bmp: "㇀-㇯"
    }, {
      name: "InCJK_Symbols_and_Punctuation",
      bmp: "　-〿"
    }, {
      name: "InCJK_Unified_Ideographs",
      bmp: "一-鿿"
    }, {
      name: "InCJK_Unified_Ideographs_Extension_A",
      bmp: "㐀-䶿"
    }, {
      name: "InCJK_Unified_Ideographs_Extension_B",
      astral: "[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF]"
    }, {
      name: "InCJK_Unified_Ideographs_Extension_C",
      astral: "\uD869[\uDF00-\uDFFF]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDF3F]"
    }, {
      name: "InCJK_Unified_Ideographs_Extension_D",
      astral: "\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F]"
    }, {
      name: "InCJK_Unified_Ideographs_Extension_E",
      astral: "\uD86E[\uDC20-\uDFFF]|[\uD86F-\uD872][\uDC00-\uDFFF]|\uD873[\uDC00-\uDEAF]"
    }, {
      name: "InCarian",
      astral: "\uD800[\uDEA0-\uDEDF]"
    }, {
      name: "InCaucasian_Albanian",
      astral: "\uD801[\uDD30-\uDD6F]"
    }, {
      name: "InChakma",
      astral: "\uD804[\uDD00-\uDD4F]"
    }, {
      name: "InCham",
      bmp: "ꨀ-꩟"
    }, {
      name: "InCherokee",
      bmp: "Ꭰ-᏿"
    }, {
      name: "InCherokee_Supplement",
      bmp: "ꭰ-ꮿ"
    }, {
      name: "InCombining_Diacritical_Marks",
      bmp: "̀-ͯ"
    }, {
      name: "InCombining_Diacritical_Marks_Extended",
      bmp: "᪰-᫿"
    }, {
      name: "InCombining_Diacritical_Marks_Supplement",
      bmp: "᷀-᷿"
    }, {
      name: "InCombining_Diacritical_Marks_for_Symbols",
      bmp: "⃐-⃿"
    }, {
      name: "InCombining_Half_Marks",
      bmp: "︠-︯"
    }, {
      name: "InCommon_Indic_Number_Forms",
      bmp: "꠰-꠿"
    }, {
      name: "InControl_Pictures",
      bmp: "␀-␿"
    }, {
      name: "InCoptic",
      bmp: "Ⲁ-⳿"
    }, {
      name: "InCoptic_Epact_Numbers",
      astral: "\uD800[\uDEE0-\uDEFF]"
    }, {
      name: "InCounting_Rod_Numerals",
      astral: "\uD834[\uDF60-\uDF7F]"
    }, {
      name: "InCuneiform",
      astral: "\uD808[\uDC00-\uDFFF]"
    }, {
      name: "InCuneiform_Numbers_and_Punctuation",
      astral: "\uD809[\uDC00-\uDC7F]"
    }, {
      name: "InCurrency_Symbols",
      bmp: "₠-⃏"
    }, {
      name: "InCypriot_Syllabary",
      astral: "\uD802[\uDC00-\uDC3F]"
    }, {
      name: "InCyrillic",
      bmp: "Ѐ-ӿ"
    }, {
      name: "InCyrillic_Extended_A",
      bmp: "ⷠ-ⷿ"
    }, {
      name: "InCyrillic_Extended_B",
      bmp: "Ꙁ-ꚟ"
    }, {
      name: "InCyrillic_Extended_C",
      bmp: "ᲀ-᲏"
    }, {
      name: "InCyrillic_Supplement",
      bmp: "Ԁ-ԯ"
    }, {
      name: "InDeseret",
      astral: "\uD801[\uDC00-\uDC4F]"
    }, {
      name: "InDevanagari",
      bmp: "ऀ-ॿ"
    }, {
      name: "InDevanagari_Extended",
      bmp: "꣠-ꣿ"
    }, {
      name: "InDingbats",
      bmp: "✀-➿"
    }, {
      name: "InDomino_Tiles",
      astral: "\uD83C[\uDC30-\uDC9F]"
    }, {
      name: "InDuployan",
      astral: "\uD82F[\uDC00-\uDC9F]"
    }, {
      name: "InEarly_Dynastic_Cuneiform",
      astral: "\uD809[\uDC80-\uDD4F]"
    }, {
      name: "InEgyptian_Hieroglyphs",
      astral: "\uD80C[\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F]"
    }, {
      name: "InElbasan",
      astral: "\uD801[\uDD00-\uDD2F]"
    }, {
      name: "InEmoticons",
      astral: "\uD83D[\uDE00-\uDE4F]"
    }, {
      name: "InEnclosed_Alphanumeric_Supplement",
      astral: "\uD83C[\uDD00-\uDDFF]"
    }, {
      name: "InEnclosed_Alphanumerics",
      bmp: "①-⓿"
    }, {
      name: "InEnclosed_CJK_Letters_and_Months",
      bmp: "㈀-㋿"
    }, {
      name: "InEnclosed_Ideographic_Supplement",
      astral: "\uD83C[\uDE00-\uDEFF]"
    }, {
      name: "InEthiopic",
      bmp: "ሀ-፿"
    }, {
      name: "InEthiopic_Extended",
      bmp: "ⶀ-⷟"
    }, {
      name: "InEthiopic_Extended_A",
      bmp: "꬀-꬯"
    }, {
      name: "InEthiopic_Supplement",
      bmp: "ᎀ-᎟"
    }, {
      name: "InGeneral_Punctuation",
      bmp: " -⁯"
    }, {
      name: "InGeometric_Shapes",
      bmp: "■-◿"
    }, {
      name: "InGeometric_Shapes_Extended",
      astral: "\uD83D[\uDF80-\uDFFF]"
    }, {
      name: "InGeorgian",
      bmp: "Ⴀ-ჿ"
    }, {
      name: "InGeorgian_Supplement",
      bmp: "ⴀ-⴯"
    }, {
      name: "InGlagolitic",
      bmp: "Ⰰ-ⱟ"
    }, {
      name: "InGlagolitic_Supplement",
      astral: "\uD838[\uDC00-\uDC2F]"
    }, {
      name: "InGothic",
      astral: "\uD800[\uDF30-\uDF4F]"
    }, {
      name: "InGrantha",
      astral: "\uD804[\uDF00-\uDF7F]"
    }, {
      name: "InGreek_Extended",
      bmp: "ἀ-῿"
    }, {
      name: "InGreek_and_Coptic",
      bmp: "Ͱ-Ͽ"
    }, {
      name: "InGujarati",
      bmp: "઀-૿"
    }, {
      name: "InGurmukhi",
      bmp: "਀-੿"
    }, {
      name: "InHalfwidth_and_Fullwidth_Forms",
      bmp: "＀-￯"
    }, {
      name: "InHangul_Compatibility_Jamo",
      bmp: "㄰-㆏"
    }, {
      name: "InHangul_Jamo",
      bmp: "ᄀ-ᇿ"
    }, {
      name: "InHangul_Jamo_Extended_A",
      bmp: "ꥠ-꥿"
    }, {
      name: "InHangul_Jamo_Extended_B",
      bmp: "ힰ-퟿"
    }, {
      name: "InHangul_Syllables",
      bmp: "가-힯"
    }, {
      name: "InHanunoo",
      bmp: "ᜠ-᜿"
    }, {
      name: "InHatran",
      astral: "\uD802[\uDCE0-\uDCFF]"
    }, {
      name: "InHebrew",
      bmp: "֐-׿"
    }, {
      name: "InHigh_Private_Use_Surrogates",
      bmp: "\uDB80-\uDBFF"
    }, {
      name: "InHigh_Surrogates",
      bmp: "\uD800-\uDB7F"
    }, {
      name: "InHiragana",
      bmp: "぀-ゟ"
    }, {
      name: "InIPA_Extensions",
      bmp: "ɐ-ʯ"
    }, {
      name: "InIdeographic_Description_Characters",
      bmp: "⿰-⿿"
    }, {
      name: "InIdeographic_Symbols_and_Punctuation",
      astral: "\uD81B[\uDFE0-\uDFFF]"
    }, {
      name: "InImperial_Aramaic",
      astral: "\uD802[\uDC40-\uDC5F]"
    }, {
      name: "InInscriptional_Pahlavi",
      astral: "\uD802[\uDF60-\uDF7F]"
    }, {
      name: "InInscriptional_Parthian",
      astral: "\uD802[\uDF40-\uDF5F]"
    }, {
      name: "InJavanese",
      bmp: "ꦀ-꧟"
    }, {
      name: "InKaithi",
      astral: "\uD804[\uDC80-\uDCCF]"
    }, {
      name: "InKana_Supplement",
      astral: "\uD82C[\uDC00-\uDCFF]"
    }, {
      name: "InKanbun",
      bmp: "㆐-㆟"
    }, {
      name: "InKangxi_Radicals",
      bmp: "⼀-⿟"
    }, {
      name: "InKannada",
      bmp: "ಀ-೿"
    }, {
      name: "InKatakana",
      bmp: "゠-ヿ"
    }, {
      name: "InKatakana_Phonetic_Extensions",
      bmp: "ㇰ-ㇿ"
    }, {
      name: "InKayah_Li",
      bmp: "꤀-꤯"
    }, {
      name: "InKharoshthi",
      astral: "\uD802[\uDE00-\uDE5F]"
    }, {
      name: "InKhmer",
      bmp: "ក-៿"
    }, {
      name: "InKhmer_Symbols",
      bmp: "᧠-᧿"
    }, {
      name: "InKhojki",
      astral: "\uD804[\uDE00-\uDE4F]"
    }, {
      name: "InKhudawadi",
      astral: "\uD804[\uDEB0-\uDEFF]"
    }, {
      name: "InLao",
      bmp: "຀-໿"
    }, {
      name: "InLatin_Extended_Additional",
      bmp: "Ḁ-ỿ"
    }, {
      name: "InLatin_Extended_A",
      bmp: "Ā-ſ"
    }, {
      name: "InLatin_Extended_B",
      bmp: "ƀ-ɏ"
    }, {
      name: "InLatin_Extended_C",
      bmp: "Ⱡ-Ɀ"
    }, {
      name: "InLatin_Extended_D",
      bmp: "꜠-ꟿ"
    }, {
      name: "InLatin_Extended_E",
      bmp: "ꬰ-꭯"
    }, {
      name: "InLatin_1_Supplement",
      bmp: "-ÿ"
    }, {
      name: "InLepcha",
      bmp: "ᰀ-ᱏ"
    }, {
      name: "InLetterlike_Symbols",
      bmp: "℀-⅏"
    }, {
      name: "InLimbu",
      bmp: "ᤀ-᥏"
    }, {
      name: "InLinear_A",
      astral: "\uD801[\uDE00-\uDF7F]"
    }, {
      name: "InLinear_B_Ideograms",
      astral: "\uD800[\uDC80-\uDCFF]"
    }, {
      name: "InLinear_B_Syllabary",
      astral: "\uD800[\uDC00-\uDC7F]"
    }, {
      name: "InLisu",
      bmp: "ꓐ-꓿"
    }, {
      name: "InLow_Surrogates",
      bmp: "\uDC00-\uDFFF"
    }, {
      name: "InLycian",
      astral: "\uD800[\uDE80-\uDE9F]"
    }, {
      name: "InLydian",
      astral: "\uD802[\uDD20-\uDD3F]"
    }, {
      name: "InMahajani",
      astral: "\uD804[\uDD50-\uDD7F]"
    }, {
      name: "InMahjong_Tiles",
      astral: "\uD83C[\uDC00-\uDC2F]"
    }, {
      name: "InMalayalam",
      bmp: "ഀ-ൿ"
    }, {
      name: "InMandaic",
      bmp: "ࡀ-࡟"
    }, {
      name: "InManichaean",
      astral: "\uD802[\uDEC0-\uDEFF]"
    }, {
      name: "InMarchen",
      astral: "\uD807[\uDC70-\uDCBF]"
    }, {
      name: "InMathematical_Alphanumeric_Symbols",
      astral: "\uD835[\uDC00-\uDFFF]"
    }, {
      name: "InMathematical_Operators",
      bmp: "∀-⋿"
    }, {
      name: "InMeetei_Mayek",
      bmp: "ꯀ-꯿"
    }, {
      name: "InMeetei_Mayek_Extensions",
      bmp: "ꫠ-꫿"
    }, {
      name: "InMende_Kikakui",
      astral: "\uD83A[\uDC00-\uDCDF]"
    }, {
      name: "InMeroitic_Cursive",
      astral: "\uD802[\uDDA0-\uDDFF]"
    }, {
      name: "InMeroitic_Hieroglyphs",
      astral: "\uD802[\uDD80-\uDD9F]"
    }, {
      name: "InMiao",
      astral: "\uD81B[\uDF00-\uDF9F]"
    }, {
      name: "InMiscellaneous_Mathematical_Symbols_A",
      bmp: "⟀-⟯"
    }, {
      name: "InMiscellaneous_Mathematical_Symbols_B",
      bmp: "⦀-⧿"
    }, {
      name: "InMiscellaneous_Symbols",
      bmp: "☀-⛿"
    }, {
      name: "InMiscellaneous_Symbols_and_Arrows",
      bmp: "⬀-⯿"
    }, {
      name: "InMiscellaneous_Symbols_and_Pictographs",
      astral: "\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]"
    }, {
      name: "InMiscellaneous_Technical",
      bmp: "⌀-⏿"
    }, {
      name: "InModi",
      astral: "\uD805[\uDE00-\uDE5F]"
    }, {
      name: "InModifier_Tone_Letters",
      bmp: "꜀-ꜟ"
    }, {
      name: "InMongolian",
      bmp: "᠀-᢯"
    }, {
      name: "InMongolian_Supplement",
      astral: "\uD805[\uDE60-\uDE7F]"
    }, {
      name: "InMro",
      astral: "\uD81A[\uDE40-\uDE6F]"
    }, {
      name: "InMultani",
      astral: "\uD804[\uDE80-\uDEAF]"
    }, {
      name: "InMusical_Symbols",
      astral: "\uD834[\uDD00-\uDDFF]"
    }, {
      name: "InMyanmar",
      bmp: "က-႟"
    }, {
      name: "InMyanmar_Extended_A",
      bmp: "ꩠ-ꩿ"
    }, {
      name: "InMyanmar_Extended_B",
      bmp: "ꧠ-꧿"
    }, {
      name: "InNKo",
      bmp: "߀-߿"
    }, {
      name: "InNabataean",
      astral: "\uD802[\uDC80-\uDCAF]"
    }, {
      name: "InNew_Tai_Lue",
      bmp: "ᦀ-᧟"
    }, {
      name: "InNewa",
      astral: "\uD805[\uDC00-\uDC7F]"
    }, {
      name: "InNumber_Forms",
      bmp: "⅐-↏"
    }, {
      name: "InOgham",
      bmp: " -᚟"
    }, {
      name: "InOl_Chiki",
      bmp: "᱐-᱿"
    }, {
      name: "InOld_Hungarian",
      astral: "\uD803[\uDC80-\uDCFF]"
    }, {
      name: "InOld_Italic",
      astral: "\uD800[\uDF00-\uDF2F]"
    }, {
      name: "InOld_North_Arabian",
      astral: "\uD802[\uDE80-\uDE9F]"
    }, {
      name: "InOld_Permic",
      astral: "\uD800[\uDF50-\uDF7F]"
    }, {
      name: "InOld_Persian",
      astral: "\uD800[\uDFA0-\uDFDF]"
    }, {
      name: "InOld_South_Arabian",
      astral: "\uD802[\uDE60-\uDE7F]"
    }, {
      name: "InOld_Turkic",
      astral: "\uD803[\uDC00-\uDC4F]"
    }, {
      name: "InOptical_Character_Recognition",
      bmp: "⑀-⑟"
    }, {
      name: "InOriya",
      bmp: "଀-୿"
    }, {
      name: "InOrnamental_Dingbats",
      astral: "\uD83D[\uDE50-\uDE7F]"
    }, {
      name: "InOsage",
      astral: "\uD801[\uDCB0-\uDCFF]"
    }, {
      name: "InOsmanya",
      astral: "\uD801[\uDC80-\uDCAF]"
    }, {
      name: "InPahawh_Hmong",
      astral: "\uD81A[\uDF00-\uDF8F]"
    }, {
      name: "InPalmyrene",
      astral: "\uD802[\uDC60-\uDC7F]"
    }, {
      name: "InPau_Cin_Hau",
      astral: "\uD806[\uDEC0-\uDEFF]"
    }, {
      name: "InPhags_pa",
      bmp: "ꡀ-꡿"
    }, {
      name: "InPhaistos_Disc",
      astral: "\uD800[\uDDD0-\uDDFF]"
    }, {
      name: "InPhoenician",
      astral: "\uD802[\uDD00-\uDD1F]"
    }, {
      name: "InPhonetic_Extensions",
      bmp: "ᴀ-ᵿ"
    }, {
      name: "InPhonetic_Extensions_Supplement",
      bmp: "ᶀ-ᶿ"
    }, {
      name: "InPlaying_Cards",
      astral: "\uD83C[\uDCA0-\uDCFF]"
    }, {
      name: "InPrivate_Use_Area",
      bmp: "-"
    }, {
      name: "InPsalter_Pahlavi",
      astral: "\uD802[\uDF80-\uDFAF]"
    }, {
      name: "InRejang",
      bmp: "ꤰ-꥟"
    }, {
      name: "InRumi_Numeral_Symbols",
      astral: "\uD803[\uDE60-\uDE7F]"
    }, {
      name: "InRunic",
      bmp: "ᚠ-᛿"
    }, {
      name: "InSamaritan",
      bmp: "ࠀ-࠿"
    }, {
      name: "InSaurashtra",
      bmp: "ꢀ-꣟"
    }, {
      name: "InSharada",
      astral: "\uD804[\uDD80-\uDDDF]"
    }, {
      name: "InShavian",
      astral: "\uD801[\uDC50-\uDC7F]"
    }, {
      name: "InShorthand_Format_Controls",
      astral: "\uD82F[\uDCA0-\uDCAF]"
    }, {
      name: "InSiddham",
      astral: "\uD805[\uDD80-\uDDFF]"
    }, {
      name: "InSinhala",
      bmp: "඀-෿"
    }, {
      name: "InSinhala_Archaic_Numbers",
      astral: "\uD804[\uDDE0-\uDDFF]"
    }, {
      name: "InSmall_Form_Variants",
      bmp: "﹐-﹯"
    }, {
      name: "InSora_Sompeng",
      astral: "\uD804[\uDCD0-\uDCFF]"
    }, {
      name: "InSpacing_Modifier_Letters",
      bmp: "ʰ-˿"
    }, {
      name: "InSpecials",
      bmp: "￰-￿"
    }, {
      name: "InSundanese",
      bmp: "ᮀ-ᮿ"
    }, {
      name: "InSundanese_Supplement",
      bmp: "᳀-᳏"
    }, {
      name: "InSuperscripts_and_Subscripts",
      bmp: "⁰-₟"
    }, {
      name: "InSupplemental_Arrows_A",
      bmp: "⟰-⟿"
    }, {
      name: "InSupplemental_Arrows_B",
      bmp: "⤀-⥿"
    }, {
      name: "InSupplemental_Arrows_C",
      astral: "\uD83E[\uDC00-\uDCFF]"
    }, {
      name: "InSupplemental_Mathematical_Operators",
      bmp: "⨀-⫿"
    }, {
      name: "InSupplemental_Punctuation",
      bmp: "⸀-⹿"
    }, {
      name: "InSupplemental_Symbols_and_Pictographs",
      astral: "\uD83E[\uDD00-\uDDFF]"
    }, {
      name: "InSupplementary_Private_Use_Area_A",
      astral: "[\uDB80-\uDBBF][\uDC00-\uDFFF]"
    }, {
      name: "InSupplementary_Private_Use_Area_B",
      astral: "[\uDBC0-\uDBFF][\uDC00-\uDFFF]"
    }, {
      name: "InSutton_SignWriting",
      astral: "\uD836[\uDC00-\uDEAF]"
    }, {
      name: "InSyloti_Nagri",
      bmp: "ꠀ-꠯"
    }, {
      name: "InSyriac",
      bmp: "܀-ݏ"
    }, {
      name: "InTagalog",
      bmp: "ᜀ-ᜟ"
    }, {
      name: "InTagbanwa",
      bmp: "ᝠ-᝿"
    }, {
      name: "InTags",
      astral: "\uDB40[\uDC00-\uDC7F]"
    }, {
      name: "InTai_Le",
      bmp: "ᥐ-᥿"
    }, {
      name: "InTai_Tham",
      bmp: "ᨠ-᪯"
    }, {
      name: "InTai_Viet",
      bmp: "ꪀ-꫟"
    }, {
      name: "InTai_Xuan_Jing_Symbols",
      astral: "\uD834[\uDF00-\uDF5F]"
    }, {
      name: "InTakri",
      astral: "\uD805[\uDE80-\uDECF]"
    }, {
      name: "InTamil",
      bmp: "஀-௿"
    }, {
      name: "InTangut",
      astral: "[\uD81C-\uD821][\uDC00-\uDFFF]"
    }, {
      name: "InTangut_Components",
      astral: "\uD822[\uDC00-\uDEFF]"
    }, {
      name: "InTelugu",
      bmp: "ఀ-౿"
    }, {
      name: "InThaana",
      bmp: "ހ-޿"
    }, {
      name: "InThai",
      bmp: "฀-๿"
    }, {
      name: "InTibetan",
      bmp: "ༀ-࿿"
    }, {
      name: "InTifinagh",
      bmp: "ⴰ-⵿"
    }, {
      name: "InTirhuta",
      astral: "\uD805[\uDC80-\uDCDF]"
    }, {
      name: "InTransport_and_Map_Symbols",
      astral: "\uD83D[\uDE80-\uDEFF]"
    }, {
      name: "InUgaritic",
      astral: "\uD800[\uDF80-\uDF9F]"
    }, {
      name: "InUnified_Canadian_Aboriginal_Syllabics",
      bmp: "᐀-ᙿ"
    }, {
      name: "InUnified_Canadian_Aboriginal_Syllabics_Extended",
      bmp: "ᢰ-᣿"
    }, {
      name: "InVai",
      bmp: "ꔀ-꘿"
    }, {
      name: "InVariation_Selectors",
      bmp: "︀-️"
    }, {
      name: "InVariation_Selectors_Supplement",
      astral: "\uDB40[\uDD00-\uDDEF]"
    }, {
      name: "InVedic_Extensions",
      bmp: "᳐-᳿"
    }, {
      name: "InVertical_Forms",
      bmp: "︐-︟"
    }, {
      name: "InWarang_Citi",
      astral: "\uD806[\uDCA0-\uDCFF]"
    }, {
      name: "InYi_Radicals",
      bmp: "꒐-꓏"
    }, {
      name: "InYi_Syllables",
      bmp: "ꀀ-꒏"
    }, {
      name: "InYijing_Hexagram_Symbols",
      bmp: "䷀-䷿"
    }]);
  };
  module.exports = exports["default"];
})(unicodeBlocks, unicodeBlocks.exports);
var unicodeBlocksExports = unicodeBlocks.exports;
var unicodeCategories = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*!
   * XRegExp Unicode Categories 4.0.0
   * <xregexp.com>
   * Steven Levithan (c) 2010-2017 MIT License
   * Unicode data by Mathias Bynens <mathiasbynens.be>
   */
  exports.default = function(XRegExp) {
    if (!XRegExp.addUnicodeData) {
      throw new ReferenceError("Unicode Base must be loaded before Unicode Categories");
    }
    XRegExp.addUnicodeData([{
      name: "C",
      alias: "Other",
      isBmpLast: true,
      bmp: "\0--­͸͹΀-΃΋΍΢԰՗՘ՠֈ֋֌֐׈-׏׫-ׯ׵-؅؜؝۝܎܏݋݌޲-޿߻-߿࠮࠯࠿࡜࡝࡟-࢟ࢵࢾ-࣓࣢঄঍঎঑঒঩঱঳-঵঺঻৅৆৉৊৏-৖৘-৛৞৤৥ৼ-਀਄਋-਎਑਒਩਱਴਷਺਻਽੃-੆੉੊੎-੐੒-੘੝੟-੥੶-઀઄઎઒઩઱઴઺઻૆૊૎૏૑-૟૤૥૲-૸ૺ-଀଄଍଎଑଒଩଱଴଺଻୅୆୉୊୎-୕୘-୛୞୤୥୸-஁஄஋-஍஑஖-஘஛஝஠-஢஥-஧஫-஭஺-஽௃-௅௉௎௏௑-௖௘-௥௻-௿ఄ఍఑఩఺-఼౅౉౎-౔౗౛-౟౤౥౰-౷಄಍಑಩಴಺಻೅೉೎-೔೗-ೝ೟೤೥೰ೳ-ഀഄ഍഑഻഼൅൉൐-൓൤൥඀ඁ඄඗-඙඲඼඾඿෇-෉෋-෎෕෗෠-෥෰෱෵-฀฻-฾๜-຀຃຅ຆຉ຋ຌຎ-ຓຘຠ຤຦ຨຩຬ຺຾຿໅໇໎໏໚໛໠-໿཈཭-཰྘྽࿍࿛-࿿჆჈-჌჎჏቉቎቏቗቙቞቟኉኎኏኱኶኷኿዁዆዇዗጑጖጗፛፜፽-፿᎚-᎟᏶᏷᏾᏿᚝-᚟᛹-᛿ᜍ᜕-ᜟ᜷-᜿᝔-᝟᝭᝱᝴-᝿៞៟៪-៯៺-៿᠎᠏᠚-᠟ᡸ-᡿᢫-᢯᣶-᣿᤟᤬-᤯᤼-᤿᥁-᥃᥮᥯᥵-᥿᦬-᦯᧊-᧏᧛-᧝᨜᨝᩟᩽᩾᪊-᪏᪚-᪟᪮᪯ᪿ-᫿ᭌ-᭏᭽-᭿᯴-᯻᰸-᰺᱊-᱌Ᲊ-Ჿ᳈-᳏᳷ᳺ-᳿᷶-᷺἖἗἞἟὆὇὎὏὘὚὜὞὾὿᾵῅῔῕῜῰῱῵῿​-‏‪-‮⁠-⁯⁲⁳₏₝-₟₿-⃏⃱-⃿↌-↏⏿␧-␿⑋-⑟⭴⭵⮖⮗⮺-⮼⯉⯒-⯫⯰-⯿Ⱟⱟ⳴-⳸⴦⴨-⴬⴮⴯⵨-⵮⵱-⵾⶗-⶟⶧⶯⶷⶿⷇⷏⷗⷟⹅-⹿⺚⻴-⻿⿖-⿯⿼-⿿぀゗゘㄀-㄄ㄮ-㄰㆏ㆻ-ㆿ㇤-㇯㈟㋿䶶-䶿鿖-鿿꒍-꒏꓇-꓏꘬-꘿꛸-꛿ꞯꞸ-ꟶ꠬-꠯꠺-꠿꡸-꡿꣆-꣍꣚-꣟ꣾꣿ꥔-꥞꥽-꥿꧎꧚-꧝꧿꨷-꨿꩎꩏꩚꩛꫃-꫚꫷-꬀꬇꬈꬏꬐꬗-꬟꬧꬯ꭦ-꭯꯮꯯꯺-꯿힤-힯퟇-퟊퟼-﩮﩯﫚-﫿﬇-﬒﬘-﬜﬷﬽﬿﭂﭅﯂-﯒﵀-﵏﶐﶑﷈-﷯﷾﷿︚-︟﹓﹧﹬-﹯﹵﻽-＀﾿-￁￈￉￐￑￘￙￝-￟￧￯-￻￾￿",
      astral: "\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD00-\uDE5F\uDE7F-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCBD\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDCE\uDDCF\uDDE0\uDDF5-\uDDFF\uDE12\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC5A\uDC5C\uDC5E-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE5F\uDE6D-\uDE7F\uDEB8-\uDEBF\uDECA-\uDEFF\uDF1A-\uDF1C\uDF2C-\uDF2F\uDF40-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC46-\uDC4F\uDC6D-\uDC6F\uDC90\uDC91\uDCA8\uDCB7-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD823-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83F\uD874-\uD87D\uD87F-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFDF\uDFE1-\uDFFF]|\uD821[\uDFED-\uDFFF]|\uD822[\uDEF3-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA0-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD73-\uDD7A\uDDE9-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDCFF\uDD4B-\uDD4F\uDD5A-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDDAD-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF]|\uD83D[\uDED3-\uDEDF\uDEED-\uDEEF\uDEF7-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDD0F\uDD1F\uDD28-\uDD2F\uDD31\uDD32\uDD3F\uDD4C-\uDD4F\uDD5F-\uDD7F\uDD92-\uDDBF\uDDC1-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]"
    }, {
      name: "Cc",
      alias: "Control",
      bmp: "\0--"
    }, {
      name: "Cf",
      alias: "Format",
      bmp: "­؀-؅؜۝܏࣢᠎​-‏‪-‮⁠-⁤⁦-⁯\uFEFF￹-￻",
      astral: "𑂽|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]"
    }, {
      name: "Cn",
      alias: "Unassigned",
      bmp: "͸͹΀-΃΋΍΢԰՗՘ՠֈ֋֌֐׈-׏׫-ׯ׵-׿؝܎݋݌޲-޿߻-߿࠮࠯࠿࡜࡝࡟-࢟ࢵࢾ-࣓঄঍঎঑঒঩঱঳-঵঺঻৅৆৉৊৏-৖৘-৛৞৤৥ৼ-਀਄਋-਎਑਒਩਱਴਷਺਻਽੃-੆੉੊੎-੐੒-੘੝੟-੥੶-઀઄઎઒઩઱઴઺઻૆૊૎૏૑-૟૤૥૲-૸ૺ-଀଄଍଎଑଒଩଱଴଺଻୅୆୉୊୎-୕୘-୛୞୤୥୸-஁஄஋-஍஑஖-஘஛஝஠-஢஥-஧஫-஭஺-஽௃-௅௉௎௏௑-௖௘-௥௻-௿ఄ఍఑఩఺-఼౅౉౎-౔౗౛-౟౤౥౰-౷಄಍಑಩಴಺಻೅೉೎-೔೗-ೝ೟೤೥೰ೳ-ഀഄ഍഑഻഼൅൉൐-൓൤൥඀ඁ඄඗-඙඲඼඾඿෇-෉෋-෎෕෗෠-෥෰෱෵-฀฻-฾๜-຀຃຅ຆຉ຋ຌຎ-ຓຘຠ຤຦ຨຩຬ຺຾຿໅໇໎໏໚໛໠-໿཈཭-཰྘྽࿍࿛-࿿჆჈-჌჎჏቉቎቏቗቙቞቟኉኎኏኱኶኷኿዁዆዇዗጑጖጗፛፜፽-፿᎚-᎟᏶᏷᏾᏿᚝-᚟᛹-᛿ᜍ᜕-ᜟ᜷-᜿᝔-᝟᝭᝱᝴-᝿៞៟៪-៯៺-៿᠏᠚-᠟ᡸ-᡿᢫-᢯᣶-᣿᤟᤬-᤯᤼-᤿᥁-᥃᥮᥯᥵-᥿᦬-᦯᧊-᧏᧛-᧝᨜᨝᩟᩽᩾᪊-᪏᪚-᪟᪮᪯ᪿ-᫿ᭌ-᭏᭽-᭿᯴-᯻᰸-᰺᱊-᱌Ᲊ-Ჿ᳈-᳏᳷ᳺ-᳿᷶-᷺἖἗἞἟὆὇὎὏὘὚὜὞὾὿᾵῅῔῕῜῰῱῵῿⁥⁲⁳₏₝-₟₿-⃏⃱-⃿↌-↏⏿␧-␿⑋-⑟⭴⭵⮖⮗⮺-⮼⯉⯒-⯫⯰-⯿Ⱟⱟ⳴-⳸⴦⴨-⴬⴮⴯⵨-⵮⵱-⵾⶗-⶟⶧⶯⶷⶿⷇⷏⷗⷟⹅-⹿⺚⻴-⻿⿖-⿯⿼-⿿぀゗゘㄀-㄄ㄮ-㄰㆏ㆻ-ㆿ㇤-㇯㈟㋿䶶-䶿鿖-鿿꒍-꒏꓇-꓏꘬-꘿꛸-꛿ꞯꞸ-ꟶ꠬-꠯꠺-꠿꡸-꡿꣆-꣍꣚-꣟ꣾꣿ꥔-꥞꥽-꥿꧎꧚-꧝꧿꨷-꨿꩎꩏꩚꩛꫃-꫚꫷-꬀꬇꬈꬏꬐꬗-꬟꬧꬯ꭦ-꭯꯮꯯꯺-꯿힤-힯퟇-퟊퟼-퟿﩮﩯﫚-﫿﬇-﬒﬘-﬜﬷﬽﬿﭂﭅﯂-﯒﵀-﵏﶐﶑﷈-﷯﷾﷿︚-︟﹓﹧﹬-﹯﹵﻽﻾＀﾿-￁￈￉￐￑￘￙￝-￟￧￯-￸￾￿",
      astral: "\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD00-\uDE5F\uDE7F-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDCE\uDDCF\uDDE0\uDDF5-\uDDFF\uDE12\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC5A\uDC5C\uDC5E-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE5F\uDE6D-\uDE7F\uDEB8-\uDEBF\uDECA-\uDEFF\uDF1A-\uDF1C\uDF2C-\uDF2F\uDF40-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC46-\uDC4F\uDC6D-\uDC6F\uDC90\uDC91\uDCA8\uDCB7-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD823-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83F\uD874-\uD87D\uD87F-\uDB3F\uDB41-\uDB7F][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFDF\uDFE1-\uDFFF]|\uD821[\uDFED-\uDFFF]|\uD822[\uDEF3-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA4-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDDE9-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDCFF\uDD4B-\uDD4F\uDD5A-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDDAD-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF]|\uD83D[\uDED3-\uDEDF\uDEED-\uDEEF\uDEF7-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDD0F\uDD1F\uDD28-\uDD2F\uDD31\uDD32\uDD3F\uDD4C-\uDD4F\uDD5F-\uDD7F\uDD92-\uDDBF\uDDC1-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00\uDC02-\uDC1F\uDC80-\uDCFF\uDDF0-\uDFFF]|[\uDBBF\uDBFF][\uDFFE\uDFFF]"
    }, {
      name: "Co",
      alias: "Private_Use",
      bmp: "-",
      astral: "[\uDB80-\uDBBE\uDBC0-\uDBFE][\uDC00-\uDFFF]|[\uDBBF\uDBFF][\uDC00-\uDFFD]"
    }, {
      name: "Cs",
      alias: "Surrogate",
      bmp: "\uD800-\uDFFF"
    }, {
      name: "L",
      alias: "Letter",
      bmp: "A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
      astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]"
    }, {
      name: "Ll",
      alias: "Lowercase_Letter",
      bmp: "a-zµß-öø-ÿāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĳĵķĸĺļľŀłńņňŉŋōŏőœŕŗřśŝşšţťŧũūŭůűųŵŷźżž-ƀƃƅƈƌƍƒƕƙ-ƛƞơƣƥƨƪƫƭưƴƶƹƺƽ-ƿǆǉǌǎǐǒǔǖǘǚǜǝǟǡǣǥǧǩǫǭǯǰǳǵǹǻǽǿȁȃȅȇȉȋȍȏȑȓȕȗșțȝȟȡȣȥȧȩȫȭȯȱȳ-ȹȼȿɀɂɇɉɋɍɏ-ʓʕ-ʯͱͳͷͻ-ͽΐά-ώϐϑϕ-ϗϙϛϝϟϡϣϥϧϩϫϭϯ-ϳϵϸϻϼа-џѡѣѥѧѩѫѭѯѱѳѵѷѹѻѽѿҁҋҍҏґғҕҗҙқҝҟҡңҥҧҩҫҭүұҳҵҷҹһҽҿӂӄӆӈӊӌӎӏӑӓӕӗәӛӝӟӡӣӥӧөӫӭӯӱӳӵӷӹӻӽӿԁԃԅԇԉԋԍԏԑԓԕԗԙԛԝԟԡԣԥԧԩԫԭԯա-ևᏸ-ᏽᲀ-ᲈᴀ-ᴫᵫ-ᵷᵹ-ᶚḁḃḅḇḉḋḍḏḑḓḕḗḙḛḝḟḡḣḥḧḩḫḭḯḱḳḵḷḹḻḽḿṁṃṅṇṉṋṍṏṑṓṕṗṙṛṝṟṡṣṥṧṩṫṭṯṱṳṵṷṹṻṽṿẁẃẅẇẉẋẍẏẑẓẕ-ẝẟạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹỻỽỿ-ἇἐ-ἕἠ-ἧἰ-ἷὀ-ὅὐ-ὗὠ-ὧὰ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾰ-ᾴᾶᾷιῂ-ῄῆῇῐ-ΐῖῗῠ-ῧῲ-ῴῶῷℊℎℏℓℯℴℹℼℽⅆ-ⅉⅎↄⰰ-ⱞⱡⱥⱦⱨⱪⱬⱱⱳⱴⱶ-ⱻⲁⲃⲅⲇⲉⲋⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⲳⲵⲷⲹⲻⲽⲿⳁⳃⳅⳇⳉⳋⳍⳏⳑⳓⳕⳗⳙⳛⳝⳟⳡⳣⳤⳬⳮⳳⴀ-ⴥⴧⴭꙁꙃꙅꙇꙉꙋꙍꙏꙑꙓꙕꙗꙙꙛꙝꙟꙡꙣꙥꙧꙩꙫꙭꚁꚃꚅꚇꚉꚋꚍꚏꚑꚓꚕꚗꚙꚛꜣꜥꜧꜩꜫꜭꜯ-ꜱꜳꜵꜷꜹꜻꜽꜿꝁꝃꝅꝇꝉꝋꝍꝏꝑꝓꝕꝗꝙꝛꝝꝟꝡꝣꝥꝧꝩꝫꝭꝯꝱ-ꝸꝺꝼꝿꞁꞃꞅꞇꞌꞎꞑꞓ-ꞕꞗꞙꞛꞝꞟꞡꞣꞥꞧꞩꞵꞷꟺꬰ-ꭚꭠ-ꭥꭰ-ꮿﬀ-ﬆﬓ-ﬗａ-ｚ",
      astral: "\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]"
    }, {
      name: "Lm",
      alias: "Modifier_Letter",
      bmp: "ʰ-ˁˆ-ˑˠ-ˤˬˮʹͺՙـۥۦߴߵߺࠚࠤࠨॱๆໆჼៗᡃᪧᱸ-ᱽᴬ-ᵪᵸᶛ-ᶿⁱⁿₐ-ₜⱼⱽⵯⸯ々〱-〵〻ゝゞー-ヾꀕꓸ-ꓽꘌꙿꚜꚝꜗ-ꜟꝰꞈꟸꟹꧏꧦꩰꫝꫳꫴꭜ-ꭟｰﾞﾟ",
      astral: "\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]"
    }, {
      name: "Lo",
      alias: "Other_Letter",
      bmp: "ªºƻǀ-ǃʔא-תװ-ײؠ-ؿف-يٮٯٱ-ۓەۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪࠀ-ࠕࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॲ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๅກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎა-ჺჽ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៜᠠ-ᡂᡄ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱷᳩ-ᳬᳮ-ᳱᳵᳶℵ-ℸⴰ-ⵧⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ〆〼ぁ-ゖゟァ-ヺヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꀔꀖ-ꒌꓐ-ꓷꔀ-ꘋꘐ-ꘟꘪꘫꙮꚠ-ꛥꞏꟷꟻ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧠ-ꧤꧧ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩯꩱ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛꫜꫠ-ꫪꫲꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎יִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼｦ-ｯｱ-ﾝﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
      astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]"
    }, {
      name: "Lt",
      alias: "Titlecase_Letter",
      bmp: "ǅǈǋǲᾈ-ᾏᾘ-ᾟᾨ-ᾯᾼῌῼ"
    }, {
      name: "Lu",
      alias: "Uppercase_Letter",
      bmp: "A-ZÀ-ÖØ-ÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸŹŻŽƁƂƄƆƇƉ-ƋƎ-ƑƓƔƖ-ƘƜƝƟƠƢƤƦƧƩƬƮƯƱ-ƳƵƷƸƼǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺȻȽȾɁɃ-ɆɈɊɌɎͰͲͶͿΆΈ-ΊΌΎΏΑ-ΡΣ-ΫϏϒ-ϔϘϚϜϞϠϢϤϦϨϪϬϮϴϷϹϺϽ-ЯѠѢѤѦѨѪѬѮѰѲѴѶѸѺѼѾҀҊҌҎҐҒҔҖҘҚҜҞҠҢҤҦҨҪҬҮҰҲҴҶҸҺҼҾӀӁӃӅӇӉӋӍӐӒӔӖӘӚӜӞӠӢӤӦӨӪӬӮӰӲӴӶӸӺӼӾԀԂԄԆԈԊԌԎԐԒԔԖԘԚԜԞԠԢԤԦԨԪԬԮԱ-ՖႠ-ჅჇჍᎠ-ᏵḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾἈ-ἏἘ-ἝἨ-ἯἸ-ἿὈ-ὍὙὛὝὟὨ-ὯᾸ-ΆῈ-ΉῘ-ΊῨ-ῬῸ-Ώℂℇℋ-ℍℐ-ℒℕℙ-ℝℤΩℨK-ℭℰ-ℳℾℿⅅↃⰀ-ⰮⱠⱢ-ⱤⱧⱩⱫⱭ-ⱰⱲⱵⱾ-ⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢⳫⳭⳲꙀꙂꙄꙆꙈꙊꙌꙎꙐꙒꙔꙖꙘꙚꙜꙞꙠꙢꙤꙦꙨꙪꙬꚀꚂꚄꚆꚈꚊꚌꚎꚐꚒꚔꚖꚘꚚꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽꝾꞀꞂꞄꞆꞋꞍꞐꞒꞖꞘꞚꞜꞞꞠꞢꞤꞦꞨꞪ-ꞮꞰ-ꞴꞶＡ-Ｚ",
      astral: "\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]"
    }, {
      name: "M",
      alias: "Mark",
      bmp: "̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣔ-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఃా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯",
      astral: "\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDDCA-\uDDCC\uDE2C-\uDE37\uDE3E\uDEDF-\uDEEA\uDF00-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC35-\uDC46\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDDDC\uDDDD\uDE30-\uDE40\uDEAB-\uDEB7\uDF1D-\uDF2B]|\uD807[\uDC2F-\uDC36\uDC38-\uDC3F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]"
    }, {
      name: "Mc",
      alias: "Spacing_Mark",
      bmp: "ःऻा-ीॉ-ौॎॏংঃা-ীেৈোৌৗਃਾ-ੀઃા-ીૉોૌଂଃାୀେୈୋୌୗாிுூெ-ைொ-ௌௗఁ-ఃు-ౄಂಃಾೀ-ೄೇೈೊೋೕೖംഃാ-ീെ-ൈൊ-ൌൗංඃා-ෑෘ-ෟෲෳ༾༿ཿါာေးျြၖၗၢ-ၤၧ-ၭႃႄႇ-ႌႏႚ-ႜាើ-ៅះៈᤣ-ᤦᤩ-ᤫᤰᤱᤳ-ᤸᨙᨚᩕᩗᩡᩣᩤᩭ-ᩲᬄᬵᬻᬽ-ᭁᭃ᭄ᮂᮡᮦᮧ᮪ᯧᯪ-ᯬᯮ᯲᯳ᰤ-ᰫᰴᰵ᳡ᳲᳳ〮〯ꠣꠤꠧꢀꢁꢴ-ꣃꥒ꥓ꦃꦴꦵꦺꦻꦽ-꧀ꨯꨰꨳꨴꩍꩻꩽꫫꫮꫯꫵꯣꯤꯦꯧꯩꯪ꯬",
      astral: "\uD804[\uDC00\uDC02\uDC82\uDCB0-\uDCB2\uDCB7\uDCB8\uDD2C\uDD82\uDDB3-\uDDB5\uDDBF\uDDC0\uDE2C-\uDE2E\uDE32\uDE33\uDE35\uDEE0-\uDEE2\uDF02\uDF03\uDF3E\uDF3F\uDF41-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63]|\uD805[\uDC35-\uDC37\uDC40\uDC41\uDC45\uDCB0-\uDCB2\uDCB9\uDCBB-\uDCBE\uDCC1\uDDAF-\uDDB1\uDDB8-\uDDBB\uDDBE\uDE30-\uDE32\uDE3B\uDE3C\uDE3E\uDEAC\uDEAE\uDEAF\uDEB6\uDF20\uDF21\uDF26]|\uD807[\uDC2F\uDC3E\uDCA9\uDCB1\uDCB4]|\uD81B[\uDF51-\uDF7E]|\uD834[\uDD65\uDD66\uDD6D-\uDD72]"
    }, {
      name: "Me",
      alias: "Enclosing_Mark",
      bmp: "҈҉᪾⃝-⃠⃢-⃤꙰-꙲"
    }, {
      name: "Mn",
      alias: "Nonspacing_Mark",
      bmp: "̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣔ-ࣣ࣡-ंऺ़ु-ै्॑-ॗॢॣঁ়ু-ৄ্ৢৣਁਂ਼ੁੂੇੈੋ-੍ੑੰੱੵઁં઼ુ-ૅેૈ્ૢૣଁ଼ିୁ-ୄ୍ୖୢୣஂீ்ఀా-ీె-ైొ-్ౕౖౢౣಁ಼ಿೆೌ್ೢೣഁു-ൄ്ൢൣ්ි-ුූัิ-ฺ็-๎ັິ-ູົຼ່-ໍཱ༹༘༙༵༷-ཾྀ-྄྆྇ྍ-ྗྙ-ྼ࿆ိ-ူဲ-့္်ွှၘၙၞ-ၠၱ-ၴႂႅႆႍႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴឵ិ-ួំ៉-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤢᤧᤨᤲ᤹-᤻ᨘᨗᨛᩖᩘ-ᩞ᩠ᩢᩥ-ᩬᩳ-᩿᩼᪰-᪽ᬀ-ᬃ᬴ᬶ-ᬺᬼᭂ᭫-᭳ᮀᮁᮢ-ᮥᮨᮩ᮫-ᮭ᯦ᯨᯩᯭᯯ-ᯱᰬ-ᰳᰶ᰷᳐-᳔᳒-᳢᳠-᳨᳭᳴᳸᳹᷀-᷵᷻-᷿⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〭꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠥꠦ꣄ꣅ꣠-꣱ꤦ-꤭ꥇ-ꥑꦀ-ꦂ꦳ꦶ-ꦹꦼꧥꨩ-ꨮꨱꨲꨵꨶꩃꩌꩼꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫬꫭ꫶ꯥꯨ꯭ﬞ︀-️︠-︯",
      astral: "\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]"
    }, {
      name: "N",
      alias: "Number",
      bmp: "0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൘-൞൦-൸෦-෯๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９",
      astral: "\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2]|\uD807[\uDC50-\uDC6C]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF\uDD50-\uDD59]|\uD83C[\uDD00-\uDD0C]"
    }, {
      name: "Nd",
      alias: "Decimal_Number",
      bmp: "0-9٠-٩۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯෦-෯๐-๙໐-໙༠-༩၀-၉႐-႙០-៩᠐-᠙᥆-᥏᧐-᧙᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙꘠-꘩꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９",
      astral: "\uD801[\uDCA0-\uDCA9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD807[\uDC50-\uDC59]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDD50-\uDD59]"
    }, {
      name: "Nl",
      alias: "Letter_Number",
      bmp: "ᛮ-ᛰⅠ-ↂↅ-ↈ〇〡-〩〸-〺ꛦ-ꛯ",
      astral: "\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]"
    }, {
      name: "No",
      alias: "Other_Number",
      bmp: "²³¹¼-¾৴-৹୲-୷௰-௲౸-౾൘-൞൰-൸༪-༳፩-፼៰-៹᧚⁰⁴-⁹₀-₉⅐-⅟↉①-⒛⓪-⓿❶-➓⳽㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꠰-꠵",
      astral: "\uD800[\uDD07-\uDD33\uDD75-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC65\uDDE1-\uDDF4]|\uD805[\uDF3A\uDF3B]|\uD806[\uDCEA-\uDCF2]|\uD807[\uDC5A-\uDC6C]|\uD81A[\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C]"
    }, {
      name: "P",
      alias: "Punctuation",
      bmp: "!-#%-\\x2A,-/:;\\x3F@\\x5B-\\x5D_\\x7B}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰૰෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙭᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎⌈-⌋〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⹄、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꣼꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･",
      astral: "\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|𐕯|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|𛲟|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]"
    }, {
      name: "Pc",
      alias: "Connector_Punctuation",
      bmp: "_‿⁀⁔︳︴﹍-﹏＿"
    }, {
      name: "Pd",
      alias: "Dash_Punctuation",
      bmp: "\\x2D֊־᐀᠆‐-―⸗⸚⸺⸻⹀〜〰゠︱︲﹘﹣－"
    }, {
      name: "Pe",
      alias: "Close_Punctuation",
      bmp: "\\x29\\x5D}༻༽᚜⁆⁾₎⌉⌋〉❩❫❭❯❱❳❵⟆⟧⟩⟫⟭⟯⦄⦆⦈⦊⦌⦎⦐⦒⦔⦖⦘⧙⧛⧽⸣⸥⸧⸩〉》」』】〕〗〙〛〞〟﴾︘︶︸︺︼︾﹀﹂﹄﹈﹚﹜﹞）］｝｠｣"
    }, {
      name: "Pf",
      alias: "Final_Punctuation",
      bmp: "»’”›⸃⸅⸊⸍⸝⸡"
    }, {
      name: "Pi",
      alias: "Initial_Punctuation",
      bmp: "«‘‛“‟‹⸂⸄⸉⸌⸜⸠"
    }, {
      name: "Po",
      alias: "Other_Punctuation",
      bmp: "!-#%-'\\x2A,\\x2E/:;\\x3F@\\x5C¡§¶·¿;·՚-՟։׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰૰෴๏๚๛༄-༒༔྅࿐-࿔࿙࿚၊-၏჻፠-፨᙭᙮᛫-᛭᜵᜶។-៖៘-៚᠀-᠅᠇-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‖‗†-‧‰-‸※-‾⁁-⁃⁇-⁑⁓⁕-⁞⳹-⳼⳾⳿⵰⸀⸁⸆-⸈⸋⸎-⸖⸘⸙⸛⸞⸟⸪-⸮⸰-⸹⸼-⸿⹁⹃⹄、-〃〽・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꣼꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫︐-︖︙︰﹅﹆﹉-﹌﹐-﹒﹔-﹗﹟-﹡﹨﹪﹫！-＃％-＇＊，．／：；？＠＼｡､･",
      astral: "\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|𐕯|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|𛲟|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]"
    }, {
      name: "Ps",
      alias: "Open_Punctuation",
      bmp: "\\x28\\x5B\\x7B༺༼᚛‚„⁅⁽₍⌈⌊〈❨❪❬❮❰❲❴⟅⟦⟨⟪⟬⟮⦃⦅⦇⦉⦋⦍⦏⦑⦓⦕⦗⧘⧚⧼⸢⸤⸦⸨⹂〈《「『【〔〖〘〚〝﴿︗︵︷︹︻︽︿﹁﹃﹇﹙﹛﹝（［｛｟｢"
    }, {
      name: "S",
      alias: "Symbol",
      bmp: "\\x24\\x2B<->\\x5E`\\x7C~¢-¦¨©¬®-±´¸×÷˂-˅˒-˟˥-˫˭˯-˿͵΄΅϶҂֍-֏؆-؈؋؎؏۞۩۽۾߶৲৳৺৻૱୰௳-௺౿൏൹฿༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙៛᥀᧞-᧿᭡-᭪᭴-᭼᾽᾿-῁῍-῏῝-῟῭-`´῾⁄⁒⁺-⁼₊-₌₠-₾℀℁℃-℆℈℉℔№-℘℞-℣℥℧℩℮℺℻⅀-⅄⅊-⅍⅏↊↋←-⌇⌌-⌨⌫-⏾␀-␦⑀-⑊⒜-ⓩ─-❧➔-⟄⟇-⟥⟰-⦂⦙-⧗⧜-⧻⧾-⭳⭶-⮕⮘-⮹⮽-⯈⯊-⯑⯬-⯯⳥-⳪⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿゛゜㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㋾㌀-㏿䷀-䷿꒐-꓆꜀-꜖꜠꜡꞉꞊꠨-꠫꠶-꠹꩷-꩹꭛﬩﮲-﯁﷼﷽﹢﹤-﹦﹩＄＋＜-＞＾｀｜～￠-￦￨-￮￼�",
      astral: "\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|𑜿|\uD81A[\uDF3C-\uDF3F\uDF45]|𛲜|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD83B[\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]"
    }, {
      name: "Sc",
      alias: "Currency_Symbol",
      bmp: "\\x24¢-¥֏؋৲৳৻૱௹฿៛₠-₾꠸﷼﹩＄￠￡￥￦"
    }, {
      name: "Sk",
      alias: "Modifier_Symbol",
      bmp: "\\x5E`¨¯´¸˂-˅˒-˟˥-˫˭˯-˿͵΄΅᾽᾿-῁῍-῏῝-῟῭-`´῾゛゜꜀-꜖꜠꜡꞉꞊꭛﮲-﯁＾｀￣",
      astral: "\uD83C[\uDFFB-\uDFFF]"
    }, {
      name: "Sm",
      alias: "Math_Symbol",
      bmp: "\\x2B<->\\x7C~¬±×÷϶؆-؈⁄⁒⁺-⁼₊-₌℘⅀-⅄⅋←-↔↚↛↠↣↦↮⇎⇏⇒⇔⇴-⋿⌠⌡⍼⎛-⎳⏜-⏡▷◁◸-◿♯⟀-⟄⟇-⟥⟰-⟿⤀-⦂⦙-⧗⧜-⧻⧾-⫿⬰-⭄⭇-⭌﬩﹢﹤-﹦＋＜-＞｜～￢￩-￬",
      astral: "\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD83B[\uDEF0\uDEF1]"
    }, {
      name: "So",
      alias: "Other_Symbol",
      bmp: "¦©®°҂֍֎؎؏۞۩۽۾߶৺୰௳-௸௺౿൏൹༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙᥀᧞-᧿᭡-᭪᭴-᭼℀℁℃-℆℈℉℔№℗℞-℣℥℧℩℮℺℻⅊⅌⅍⅏↊↋↕-↙↜-↟↡↢↤↥↧-↭↯-⇍⇐⇑⇓⇕-⇳⌀-⌇⌌-⌟⌢-⌨⌫-⍻⍽-⎚⎴-⏛⏢-⏾␀-␦⑀-⑊⒜-ⓩ─-▶▸-◀◂-◷☀-♮♰-❧➔-➿⠀-⣿⬀-⬯⭅⭆⭍-⭳⭶-⮕⮘-⮹⮽-⯈⯊-⯑⯬-⯯⳥-⳪⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㋾㌀-㏿䷀-䷿꒐-꓆꠨-꠫꠶꠷꠹꩷-꩹﷽￤￨￭￮￼�",
      astral: "\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|𑜿|\uD81A[\uDF3C-\uDF3F\uDF45]|𛲜|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFA]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]"
    }, {
      name: "Z",
      alias: "Separator",
      bmp: "    - \u2028\u2029  　"
    }, {
      name: "Zl",
      alias: "Line_Separator",
      bmp: "\u2028"
    }, {
      name: "Zp",
      alias: "Paragraph_Separator",
      bmp: "\u2029"
    }, {
      name: "Zs",
      alias: "Space_Separator",
      bmp: "    -   　"
    }]);
  };
  module.exports = exports["default"];
})(unicodeCategories, unicodeCategories.exports);
var unicodeCategoriesExports = unicodeCategories.exports;
var unicodeProperties = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*!
   * XRegExp Unicode Properties 4.0.0
   * <xregexp.com>
   * Steven Levithan (c) 2012-2017 MIT License
   * Unicode data by Mathias Bynens <mathiasbynens.be>
   */
  exports.default = function(XRegExp) {
    if (!XRegExp.addUnicodeData) {
      throw new ReferenceError("Unicode Base must be loaded before Unicode Properties");
    }
    var unicodeData = [{
      name: "ASCII",
      bmp: "\0-"
    }, {
      name: "Alphabetic",
      bmp: "A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͅͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևְ-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-ٗٙ-ٟٮ-ۓە-ۜۡ-ۭۨ-ۯۺ-ۼۿܐ-ܿݍ-ޱߊ-ߪߴߵߺࠀ-ࠗࠚ-ࠬࡀ-ࡘࢠ-ࢴࢶ-ࢽࣔ-ࣣࣟ-ࣰࣩ-ऻऽ-ौॎ-ॐॕ-ॣॱ-ঃঅ-ঌএঐও-নপ-রলশ-হঽ-ৄেৈোৌৎৗড়ঢ়য়-ৣৰৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਾ-ੂੇੈੋੌੑਖ਼-ੜਫ਼ੰ-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽ-ૅે-ૉોૌૐૠ-ૣૹଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽ-ୄେୈୋୌୖୗଡ଼ଢ଼ୟ-ୣୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-ௌௐௗఀ-ఃఅ-ఌఎ-ఐఒ-నప-హఽ-ౄె-ైొ-ౌౕౖౘ-ౚౠ-ౣಀ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ-ೄೆ-ೈೊ-ೌೕೖೞೠ-ೣೱೲഁ-ഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൌൎൔ-ൗൟ-ൣൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆා-ුූෘ-ෟෲෳก-ฺเ-ๆํກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆໍໜ-ໟༀཀ-ཇཉ-ཬཱ-ཱྀྈ-ྗྙ-ྼက-ံးျ-ဿၐ-ၢၥ-ၨၮ-ႆႎႜႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፟ᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜓᜠ-ᜳᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-ឳា-ៈៗៜᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤞᤠ-ᤫᤰ-ᤸᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨛᨠ-ᩞᩡ-ᩴᪧᬀ-ᬳᬵ-ᭃᭅ-ᭋᮀ-ᮩᮬ-ᮯᮺ-ᯥᯧ-ᯱᰀ-ᰵᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳳᳵᳶᴀ-ᶿᷧ-ᷴḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⒶ-ⓩⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙴ-ꙻꙿ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠧꡀ-ꡳꢀ-ꣃꣅꣲ-ꣷꣻꣽꤊ-ꤪꤰ-ꥒꥠ-ꥼꦀ-ꦲꦴ-ꦿꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨶꩀ-ꩍꩠ-ꩶꩺꩾ-ꪾꫀꫂꫛ-ꫝꫠ-ꫯꫲ-ꫵꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯪ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
      astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC45\uDC82-\uDCB8\uDCD0-\uDCE8\uDD00-\uDD32\uDD50-\uDD72\uDD76\uDD80-\uDDBF\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE34\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEE8\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D-\uDF44\uDF47\uDF48\uDF4B\uDF4C\uDF50\uDF57\uDF5D-\uDF63]|\uD805[\uDC00-\uDC41\uDC43-\uDC45\uDC47-\uDC4A\uDC80-\uDCC1\uDCC4\uDCC5\uDCC7\uDD80-\uDDB5\uDDB8-\uDDBE\uDDD8-\uDDDD\uDE00-\uDE3E\uDE40\uDE44\uDE80-\uDEB5\uDF00-\uDF19\uDF1D-\uDF2A]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC3E\uDC40\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF36\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9E]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD47]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]"
    }, {
      name: "Any",
      isBmpLast: true,
      bmp: "\0-￿",
      astral: "[\uD800-\uDBFF][\uDC00-\uDFFF]"
    }, {
      name: "Default_Ignorable_Code_Point",
      bmp: "­͏؜ᅟᅠ឴឵᠋-᠎​-‏‪-‮⁠-⁯ㅤ︀-️\uFEFFﾠ￰-￸",
      astral: "\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|[\uDB40-\uDB43][\uDC00-\uDFFF]"
    }, {
      name: "Lowercase",
      bmp: "a-zªµºß-öø-ÿāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĳĵķĸĺļľŀłńņňŉŋōŏőœŕŗřśŝşšţťŧũūŭůűųŵŷźżž-ƀƃƅƈƌƍƒƕƙ-ƛƞơƣƥƨƪƫƭưƴƶƹƺƽ-ƿǆǉǌǎǐǒǔǖǘǚǜǝǟǡǣǥǧǩǫǭǯǰǳǵǹǻǽǿȁȃȅȇȉȋȍȏȑȓȕȗșțȝȟȡȣȥȧȩȫȭȯȱȳ-ȹȼȿɀɂɇɉɋɍɏ-ʓʕ-ʸˀˁˠ-ˤͅͱͳͷͺ-ͽΐά-ώϐϑϕ-ϗϙϛϝϟϡϣϥϧϩϫϭϯ-ϳϵϸϻϼа-џѡѣѥѧѩѫѭѯѱѳѵѷѹѻѽѿҁҋҍҏґғҕҗҙқҝҟҡңҥҧҩҫҭүұҳҵҷҹһҽҿӂӄӆӈӊӌӎӏӑӓӕӗәӛӝӟӡӣӥӧөӫӭӯӱӳӵӷӹӻӽӿԁԃԅԇԉԋԍԏԑԓԕԗԙԛԝԟԡԣԥԧԩԫԭԯա-ևᏸ-ᏽᲀ-ᲈᴀ-ᶿḁḃḅḇḉḋḍḏḑḓḕḗḙḛḝḟḡḣḥḧḩḫḭḯḱḳḵḷḹḻḽḿṁṃṅṇṉṋṍṏṑṓṕṗṙṛṝṟṡṣṥṧṩṫṭṯṱṳṵṷṹṻṽṿẁẃẅẇẉẋẍẏẑẓẕ-ẝẟạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹỻỽỿ-ἇἐ-ἕἠ-ἧἰ-ἷὀ-ὅὐ-ὗὠ-ὧὰ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾰ-ᾴᾶᾷιῂ-ῄῆῇῐ-ΐῖῗῠ-ῧῲ-ῴῶῷⁱⁿₐ-ₜℊℎℏℓℯℴℹℼℽⅆ-ⅉⅎⅰ-ⅿↄⓐ-ⓩⰰ-ⱞⱡⱥⱦⱨⱪⱬⱱⱳⱴⱶ-ⱽⲁⲃⲅⲇⲉⲋⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⲳⲵⲷⲹⲻⲽⲿⳁⳃⳅⳇⳉⳋⳍⳏⳑⳓⳕⳗⳙⳛⳝⳟⳡⳣⳤⳬⳮⳳⴀ-ⴥⴧⴭꙁꙃꙅꙇꙉꙋꙍꙏꙑꙓꙕꙗꙙꙛꙝꙟꙡꙣꙥꙧꙩꙫꙭꚁꚃꚅꚇꚉꚋꚍꚏꚑꚓꚕꚗꚙꚛ-ꚝꜣꜥꜧꜩꜫꜭꜯ-ꜱꜳꜵꜷꜹꜻꜽꜿꝁꝃꝅꝇꝉꝋꝍꝏꝑꝓꝕꝗꝙꝛꝝꝟꝡꝣꝥꝧꝩꝫꝭꝯ-ꝸꝺꝼꝿꞁꞃꞅꞇꞌꞎꞑꞓ-ꞕꞗꞙꞛꞝꞟꞡꞣꞥꞧꞩꞵꞷꟸ-ꟺꬰ-ꭚꭜ-ꭥꭰ-ꮿﬀ-ﬆﬓ-ﬗａ-ｚ",
      astral: "\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]"
    }, {
      name: "Noncharacter_Code_Point",
      bmp: "﷐-﷯￾￿",
      astral: "[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]"
    }, {
      name: "Uppercase",
      bmp: "A-ZÀ-ÖØ-ÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸŹŻŽƁƂƄƆƇƉ-ƋƎ-ƑƓƔƖ-ƘƜƝƟƠƢƤƦƧƩƬƮƯƱ-ƳƵƷƸƼǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺȻȽȾɁɃ-ɆɈɊɌɎͰͲͶͿΆΈ-ΊΌΎΏΑ-ΡΣ-ΫϏϒ-ϔϘϚϜϞϠϢϤϦϨϪϬϮϴϷϹϺϽ-ЯѠѢѤѦѨѪѬѮѰѲѴѶѸѺѼѾҀҊҌҎҐҒҔҖҘҚҜҞҠҢҤҦҨҪҬҮҰҲҴҶҸҺҼҾӀӁӃӅӇӉӋӍӐӒӔӖӘӚӜӞӠӢӤӦӨӪӬӮӰӲӴӶӸӺӼӾԀԂԄԆԈԊԌԎԐԒԔԖԘԚԜԞԠԢԤԦԨԪԬԮԱ-ՖႠ-ჅჇჍᎠ-ᏵḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾἈ-ἏἘ-ἝἨ-ἯἸ-ἿὈ-ὍὙὛὝὟὨ-ὯᾸ-ΆῈ-ΉῘ-ΊῨ-ῬῸ-Ώℂℇℋ-ℍℐ-ℒℕℙ-ℝℤΩℨK-ℭℰ-ℳℾℿⅅⅠ-ⅯↃⒶ-ⓏⰀ-ⰮⱠⱢ-ⱤⱧⱩⱫⱭ-ⱰⱲⱵⱾ-ⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢⳫⳭⳲꙀꙂꙄꙆꙈꙊꙌꙎꙐꙒꙔꙖꙘꙚꙜꙞꙠꙢꙤꙦꙨꙪꙬꚀꚂꚄꚆꚈꚊꚌꚎꚐꚒꚔꚖꚘꚚꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽꝾꞀꞂꞄꞆꞋꞍꞐꞒꞖꞘꞚꞜꞞꞠꞢꞤꞦꞨꞪ-ꞮꞰ-ꞴꞶＡ-Ｚ",
      astral: "\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]"
    }, {
      name: "White_Space",
      bmp: "	-\r    - \u2028\u2029  　"
    }];
    unicodeData.push({
      name: "Assigned",
      // Since this is defined as the inverse of Unicode category Cn (Unassigned), the Unicode
      // Categories addon is required to use this property
      inverseOf: "Cn"
    });
    XRegExp.addUnicodeData(unicodeData);
  };
  module.exports = exports["default"];
})(unicodeProperties, unicodeProperties.exports);
var unicodePropertiesExports = unicodeProperties.exports;
var unicodeScripts = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /*!
   * XRegExp Unicode Scripts 4.0.0
   * <xregexp.com>
   * Steven Levithan (c) 2010-2017 MIT License
   * Unicode data by Mathias Bynens <mathiasbynens.be>
   */
  exports.default = function(XRegExp) {
    if (!XRegExp.addUnicodeData) {
      throw new ReferenceError("Unicode Base must be loaded before Unicode Scripts");
    }
    XRegExp.addUnicodeData([{
      name: "Adlam",
      astral: "\uD83A[\uDD00-\uDD4A\uDD50-\uDD59\uDD5E\uDD5F]"
    }, {
      name: "Ahom",
      astral: "\uD805[\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF3F]"
    }, {
      name: "Anatolian_Hieroglyphs",
      astral: "\uD811[\uDC00-\uDE46]"
    }, {
      name: "Arabic",
      bmp: "؀-؄؆-؋؍-ؚ؞ؠ-ؿف-يٖ-ٯٱ-ۜ۞-ۿݐ-ݿࢠ-ࢴࢶ-ࢽࣔ-ࣣ࣡-ࣿﭐ-﯁ﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-﷽ﹰ-ﹴﹶ-ﻼ",
      astral: "\uD803[\uDE60-\uDE7E]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]"
    }, {
      name: "Armenian",
      bmp: "Ա-Ֆՙ-՟ա-և֊֍-֏ﬓ-ﬗ"
    }, {
      name: "Avestan",
      astral: "\uD802[\uDF00-\uDF35\uDF39-\uDF3F]"
    }, {
      name: "Balinese",
      bmp: "ᬀ-ᭋ᭐-᭼"
    }, {
      name: "Bamum",
      bmp: "ꚠ-꛷",
      astral: "\uD81A[\uDC00-\uDE38]"
    }, {
      name: "Bassa_Vah",
      astral: "\uD81A[\uDED0-\uDEED\uDEF0-\uDEF5]"
    }, {
      name: "Batak",
      bmp: "ᯀ-᯳᯼-᯿"
    }, {
      name: "Bengali",
      bmp: "ঀ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-৻"
    }, {
      name: "Bhaiksuki",
      astral: "\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC45\uDC50-\uDC6C]"
    }, {
      name: "Bopomofo",
      bmp: "˪˫ㄅ-ㄭㆠ-ㆺ"
    }, {
      name: "Brahmi",
      astral: "\uD804[\uDC00-\uDC4D\uDC52-\uDC6F\uDC7F]"
    }, {
      name: "Braille",
      bmp: "⠀-⣿"
    }, {
      name: "Buginese",
      bmp: "ᨀ-ᨛ᨞᨟"
    }, {
      name: "Buhid",
      bmp: "ᝀ-ᝓ"
    }, {
      name: "Canadian_Aboriginal",
      bmp: "᐀-ᙿᢰ-ᣵ"
    }, {
      name: "Carian",
      astral: "\uD800[\uDEA0-\uDED0]"
    }, {
      name: "Caucasian_Albanian",
      astral: "\uD801[\uDD30-\uDD63\uDD6F]"
    }, {
      name: "Chakma",
      astral: "\uD804[\uDD00-\uDD34\uDD36-\uDD43]"
    }, {
      name: "Cham",
      bmp: "ꨀ-ꨶꩀ-ꩍ꩐-꩙꩜-꩟"
    }, {
      name: "Cherokee",
      bmp: "Ꭰ-Ᏽᏸ-ᏽꭰ-ꮿ"
    }, {
      name: "Common",
      bmp: "\0-@\\x5B-`\\x7B-©«-¹»-¿×÷ʹ-˟˥-˩ˬ-˿ʹ;΅·։؅،؛؜؟ـ۝࣢।॥฿࿕-࿘჻᛫-᛭᜵᜶᠂᠃᠅᳓᳡ᳩ-ᳬᳮ-ᳳᳵᳶ -​‎-⁤⁦-⁰⁴-⁾₀-₎₠-₾℀-℥℧-℩ℬ-ℱℳ-⅍⅏-⅟↉-↋←-⏾␀-␦⑀-⑊①-⟿⤀-⭳⭶-⮕⮘-⮹⮽-⯈⯊-⯑⯬-⯯⸀-⹄⿰-⿻　-〄〆〈-〠〰-〷〼-〿゛゜゠・ー㆐-㆟㇀-㇣㈠-㉟㉿-㋏㍘-㏿䷀-䷿꜀-꜡ꞈ-꞊꠰-꠹꤮ꧏ꭛﴾﴿︐-︙︰-﹒﹔-﹦﹨-﹫\uFEFF！-＠［-｀｛-･ｰﾞﾟ￠-￦￨-￮￹-�",
      astral: "\uD800[\uDD00-\uDD02\uDD07-\uDD33\uDD37-\uDD3F\uDD90-\uDD9B\uDDD0-\uDDFC\uDEE1-\uDEFB]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD66\uDD6A-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDF00-\uDF56\uDF60-\uDF71]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDFCB\uDFCE-\uDFFF]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD00-\uDD0C\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDDAC\uDDE6-\uDDFF\uDE01\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]|\uDB40[\uDC01\uDC20-\uDC7F]"
    }, {
      name: "Coptic",
      bmp: "Ϣ-ϯⲀ-ⳳ⳹-⳿"
    }, {
      name: "Cuneiform",
      astral: "\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC70-\uDC74\uDC80-\uDD43]"
    }, {
      name: "Cypriot",
      astral: "\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F]"
    }, {
      name: "Cyrillic",
      bmp: "Ѐ-҄҇-ԯᲀ-ᲈᴫᵸⷠ-ⷿꙀ-ꚟ︮︯"
    }, {
      name: "Deseret",
      astral: "\uD801[\uDC00-\uDC4F]"
    }, {
      name: "Devanagari",
      bmp: "ऀ-ॐ॓-ॣ०-ॿ꣠-ꣽ"
    }, {
      name: "Duployan",
      astral: "\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9C-\uDC9F]"
    }, {
      name: "Egyptian_Hieroglyphs",
      astral: "\uD80C[\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]"
    }, {
      name: "Elbasan",
      astral: "\uD801[\uDD00-\uDD27]"
    }, {
      name: "Ethiopic",
      bmp: "ሀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፼ᎀ-᎙ⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮ"
    }, {
      name: "Georgian",
      bmp: "Ⴀ-ჅჇჍა-ჺჼ-ჿⴀ-ⴥⴧⴭ"
    }, {
      name: "Glagolitic",
      bmp: "Ⰰ-Ⱞⰰ-ⱞ",
      astral: "\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]"
    }, {
      name: "Gothic",
      astral: "\uD800[\uDF30-\uDF4A]"
    }, {
      name: "Grantha",
      astral: "\uD804[\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]"
    }, {
      name: "Greek",
      bmp: "Ͱ-ͳ͵-ͷͺ-ͽͿ΄ΆΈ-ΊΌΎ-ΡΣ-ϡϰ-Ͽᴦ-ᴪᵝ-ᵡᵦ-ᵪᶿἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ῄῆ-ΐῖ-Ί῝-`ῲ-ῴῶ-῾Ωꭥ",
      astral: "\uD800[\uDD40-\uDD8E\uDDA0]|\uD834[\uDE00-\uDE45]"
    }, {
      name: "Gujarati",
      bmp: "ઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૱ૹ"
    }, {
      name: "Gurmukhi",
      bmp: "ਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵ"
    }, {
      name: "Han",
      bmp: "⺀-⺙⺛-⻳⼀-⿕々〇〡-〩〸-〻㐀-䶵一-鿕豈-舘並-龎",
      astral: "[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]"
    }, {
      name: "Hangul",
      bmp: "ᄀ-ᇿ〮〯ㄱ-ㆎ㈀-㈞㉠-㉾ꥠ-ꥼ가-힣ힰ-ퟆퟋ-ퟻﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ"
    }, {
      name: "Hanunoo",
      bmp: "ᜠ-᜴"
    }, {
      name: "Hatran",
      astral: "\uD802[\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDCFF]"
    }, {
      name: "Hebrew",
      bmp: "֑-ׇא-תװ-״יִ-זּטּ-לּמּנּסּףּפּצּ-ﭏ"
    }, {
      name: "Hiragana",
      bmp: "ぁ-ゖゝ-ゟ",
      astral: "𛀁|🈀"
    }, {
      name: "Imperial_Aramaic",
      astral: "\uD802[\uDC40-\uDC55\uDC57-\uDC5F]"
    }, {
      name: "Inherited",
      bmp: "̀-ًͯ҅҆-ٰٕ॒॑᪰-᪾᳐-᳔᳒-᳢᳠-᳨᳭᳴᳸᳹᷀-᷵᷻-᷿‌‍⃐-〪⃰-゙゚〭︀-️︠-︭",
      astral: "\uD800[\uDDFD\uDEE0]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uDB40[\uDD00-\uDDEF]"
    }, {
      name: "Inscriptional_Pahlavi",
      astral: "\uD802[\uDF60-\uDF72\uDF78-\uDF7F]"
    }, {
      name: "Inscriptional_Parthian",
      astral: "\uD802[\uDF40-\uDF55\uDF58-\uDF5F]"
    }, {
      name: "Javanese",
      bmp: "ꦀ-꧍꧐-꧙꧞꧟"
    }, {
      name: "Kaithi",
      astral: "\uD804[\uDC80-\uDCC1]"
    }, {
      name: "Kannada",
      bmp: "ಀ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲ"
    }, {
      name: "Katakana",
      bmp: "ァ-ヺヽ-ヿㇰ-ㇿ㋐-㋾㌀-㍗ｦ-ｯｱ-ﾝ",
      astral: "𛀀"
    }, {
      name: "Kayah_Li",
      bmp: "꤀-꤭꤯"
    }, {
      name: "Kharoshthi",
      astral: "\uD802[\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F-\uDE47\uDE50-\uDE58]"
    }, {
      name: "Khmer",
      bmp: "ក-៝០-៩៰-៹᧠-᧿"
    }, {
      name: "Khojki",
      astral: "\uD804[\uDE00-\uDE11\uDE13-\uDE3E]"
    }, {
      name: "Khudawadi",
      astral: "\uD804[\uDEB0-\uDEEA\uDEF0-\uDEF9]"
    }, {
      name: "Lao",
      bmp: "ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟ"
    }, {
      name: "Latin",
      bmp: "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞮꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"
    }, {
      name: "Lepcha",
      bmp: "ᰀ-᰷᰻-᱉ᱍ-ᱏ"
    }, {
      name: "Limbu",
      bmp: "ᤀ-ᤞᤠ-ᤫᤰ-᤻᥀᥄-᥏"
    }, {
      name: "Linear_A",
      astral: "\uD801[\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]"
    }, {
      name: "Linear_B",
      astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA]"
    }, {
      name: "Lisu",
      bmp: "ꓐ-꓿"
    }, {
      name: "Lycian",
      astral: "\uD800[\uDE80-\uDE9C]"
    }, {
      name: "Lydian",
      astral: "\uD802[\uDD20-\uDD39\uDD3F]"
    }, {
      name: "Mahajani",
      astral: "\uD804[\uDD50-\uDD76]"
    }, {
      name: "Malayalam",
      bmp: "ഁ-ഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-൏ൔ-ൣ൦-ൿ"
    }, {
      name: "Mandaic",
      bmp: "ࡀ-࡛࡞"
    }, {
      name: "Manichaean",
      astral: "\uD802[\uDEC0-\uDEE6\uDEEB-\uDEF6]"
    }, {
      name: "Marchen",
      astral: "\uD807[\uDC70-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]"
    }, {
      name: "Meetei_Mayek",
      bmp: "ꫠ-꫶ꯀ-꯭꯰-꯹"
    }, {
      name: "Mende_Kikakui",
      astral: "\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]"
    }, {
      name: "Meroitic_Cursive",
      astral: "\uD802[\uDDA0-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDDFF]"
    }, {
      name: "Meroitic_Hieroglyphs",
      astral: "\uD802[\uDD80-\uDD9F]"
    }, {
      name: "Miao",
      astral: "\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]"
    }, {
      name: "Modi",
      astral: "\uD805[\uDE00-\uDE44\uDE50-\uDE59]"
    }, {
      name: "Mongolian",
      bmp: "᠀᠁᠄᠆-᠎᠐-᠙ᠠ-ᡷᢀ-ᢪ",
      astral: "\uD805[\uDE60-\uDE6C]"
    }, {
      name: "Mro",
      astral: "\uD81A[\uDE40-\uDE5E\uDE60-\uDE69\uDE6E\uDE6F]"
    }, {
      name: "Multani",
      astral: "\uD804[\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA9]"
    }, {
      name: "Myanmar",
      bmp: "က-႟ꧠ-ꧾꩠ-ꩿ"
    }, {
      name: "Nabataean",
      astral: "\uD802[\uDC80-\uDC9E\uDCA7-\uDCAF]"
    }, {
      name: "New_Tai_Lue",
      bmp: "ᦀ-ᦫᦰ-ᧉ᧐-᧚᧞᧟"
    }, {
      name: "Newa",
      astral: "\uD805[\uDC00-\uDC59\uDC5B\uDC5D]"
    }, {
      name: "Nko",
      bmp: "߀-ߺ"
    }, {
      name: "Ogham",
      bmp: " -᚜"
    }, {
      name: "Ol_Chiki",
      bmp: "᱐-᱿"
    }, {
      name: "Old_Hungarian",
      astral: "\uD803[\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDCFF]"
    }, {
      name: "Old_Italic",
      astral: "\uD800[\uDF00-\uDF23]"
    }, {
      name: "Old_North_Arabian",
      astral: "\uD802[\uDE80-\uDE9F]"
    }, {
      name: "Old_Permic",
      astral: "\uD800[\uDF50-\uDF7A]"
    }, {
      name: "Old_Persian",
      astral: "\uD800[\uDFA0-\uDFC3\uDFC8-\uDFD5]"
    }, {
      name: "Old_South_Arabian",
      astral: "\uD802[\uDE60-\uDE7F]"
    }, {
      name: "Old_Turkic",
      astral: "\uD803[\uDC00-\uDC48]"
    }, {
      name: "Oriya",
      bmp: "ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୷"
    }, {
      name: "Osage",
      astral: "\uD801[\uDCB0-\uDCD3\uDCD8-\uDCFB]"
    }, {
      name: "Osmanya",
      astral: "\uD801[\uDC80-\uDC9D\uDCA0-\uDCA9]"
    }, {
      name: "Pahawh_Hmong",
      astral: "\uD81A[\uDF00-\uDF45\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]"
    }, {
      name: "Palmyrene",
      astral: "\uD802[\uDC60-\uDC7F]"
    }, {
      name: "Pau_Cin_Hau",
      astral: "\uD806[\uDEC0-\uDEF8]"
    }, {
      name: "Phags_Pa",
      bmp: "ꡀ-꡷"
    }, {
      name: "Phoenician",
      astral: "\uD802[\uDD00-\uDD1B\uDD1F]"
    }, {
      name: "Psalter_Pahlavi",
      astral: "\uD802[\uDF80-\uDF91\uDF99-\uDF9C\uDFA9-\uDFAF]"
    }, {
      name: "Rejang",
      bmp: "ꤰ-꥓꥟"
    }, {
      name: "Runic",
      bmp: "ᚠ-ᛪᛮ-ᛸ"
    }, {
      name: "Samaritan",
      bmp: "ࠀ-࠭࠰-࠾"
    }, {
      name: "Saurashtra",
      bmp: "ꢀ-ꣅ꣎-꣙"
    }, {
      name: "Sharada",
      astral: "\uD804[\uDD80-\uDDCD\uDDD0-\uDDDF]"
    }, {
      name: "Shavian",
      astral: "\uD801[\uDC50-\uDC7F]"
    }, {
      name: "Siddham",
      astral: "\uD805[\uDD80-\uDDB5\uDDB8-\uDDDD]"
    }, {
      name: "SignWriting",
      astral: "\uD836[\uDC00-\uDE8B\uDE9B-\uDE9F\uDEA1-\uDEAF]"
    }, {
      name: "Sinhala",
      bmp: "ංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟ෦-෯ෲ-෴",
      astral: "\uD804[\uDDE1-\uDDF4]"
    }, {
      name: "Sora_Sompeng",
      astral: "\uD804[\uDCD0-\uDCE8\uDCF0-\uDCF9]"
    }, {
      name: "Sundanese",
      bmp: "ᮀ-ᮿ᳀-᳇"
    }, {
      name: "Syloti_Nagri",
      bmp: "ꠀ-꠫"
    }, {
      name: "Syriac",
      bmp: "܀-܍܏-݊ݍ-ݏ"
    }, {
      name: "Tagalog",
      bmp: "ᜀ-ᜌᜎ-᜔"
    }, {
      name: "Tagbanwa",
      bmp: "ᝠ-ᝬᝮ-ᝰᝲᝳ"
    }, {
      name: "Tai_Le",
      bmp: "ᥐ-ᥭᥰ-ᥴ"
    }, {
      name: "Tai_Tham",
      bmp: "ᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪠-᪭"
    }, {
      name: "Tai_Viet",
      bmp: "ꪀ-ꫂꫛ-꫟"
    }, {
      name: "Takri",
      astral: "\uD805[\uDE80-\uDEB7\uDEC0-\uDEC9]"
    }, {
      name: "Tamil",
      bmp: "ஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௺"
    }, {
      name: "Tangut",
      astral: "𖿠|[\uD81C-\uD820][\uDC00-\uDFFF]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]"
    }, {
      name: "Telugu",
      bmp: "ఀ-ఃఅ-ఌఎ-ఐఒ-నప-హఽ-ౄె-ైొ-్ౕౖౘ-ౚౠ-ౣ౦-౯౸-౿"
    }, {
      name: "Thaana",
      bmp: "ހ-ޱ"
    }, {
      name: "Thai",
      bmp: "ก-ฺเ-๛"
    }, {
      name: "Tibetan",
      bmp: "ༀ-ཇཉ-ཬཱ-ྗྙ-ྼ྾-࿌࿎-࿔࿙࿚"
    }, {
      name: "Tifinagh",
      bmp: "ⴰ-ⵧⵯ⵰⵿"
    }, {
      name: "Tirhuta",
      astral: "\uD805[\uDC80-\uDCC7\uDCD0-\uDCD9]"
    }, {
      name: "Ugaritic",
      astral: "\uD800[\uDF80-\uDF9D\uDF9F]"
    }, {
      name: "Vai",
      bmp: "ꔀ-ꘫ"
    }, {
      name: "Warang_Citi",
      astral: "\uD806[\uDCA0-\uDCF2\uDCFF]"
    }, {
      name: "Yi",
      bmp: "ꀀ-ꒌ꒐-꓆"
    }]);
  };
  module.exports = exports["default"];
})(unicodeScripts, unicodeScripts.exports);
var unicodeScriptsExports = unicodeScripts.exports;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _xregexp = xregexpExports;
  var _xregexp2 = _interopRequireDefault(_xregexp);
  var _build = buildExports;
  var _build2 = _interopRequireDefault(_build);
  var _matchrecursive = matchrecursiveExports;
  var _matchrecursive2 = _interopRequireDefault(_matchrecursive);
  var _unicodeBase = unicodeBaseExports;
  var _unicodeBase2 = _interopRequireDefault(_unicodeBase);
  var _unicodeBlocks = unicodeBlocksExports;
  var _unicodeBlocks2 = _interopRequireDefault(_unicodeBlocks);
  var _unicodeCategories = unicodeCategoriesExports;
  var _unicodeCategories2 = _interopRequireDefault(_unicodeCategories);
  var _unicodeProperties = unicodePropertiesExports;
  var _unicodeProperties2 = _interopRequireDefault(_unicodeProperties);
  var _unicodeScripts = unicodeScriptsExports;
  var _unicodeScripts2 = _interopRequireDefault(_unicodeScripts);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  (0, _build2.default)(_xregexp2.default);
  (0, _matchrecursive2.default)(_xregexp2.default);
  (0, _unicodeBase2.default)(_xregexp2.default);
  (0, _unicodeBlocks2.default)(_xregexp2.default);
  (0, _unicodeCategories2.default)(_xregexp2.default);
  (0, _unicodeProperties2.default)(_xregexp2.default);
  (0, _unicodeScripts2.default)(_xregexp2.default);
  exports.default = _xregexp2.default;
  module.exports = exports["default"];
})(lib, lib.exports);
var libExports = lib.exports;
const xRegExp = libExports;
var decamelize$1 = (text, separator) => {
  if (typeof text !== "string") {
    throw new TypeError("Expected a string");
  }
  separator = typeof separator === "undefined" ? "_" : separator;
  const regex1 = xRegExp("([\\p{Ll}\\d])(\\p{Lu})", "g");
  const regex2 = xRegExp("(\\p{Lu}+)(\\p{Lu}[\\p{Ll}\\d]+)", "g");
  return text.replace(regex1, `$1${separator}$2`).replace(regex2, `$1${separator}$2`).toLowerCase();
};
const decamelize = decamelize$1;
const humanizeString = (input) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected a string");
  }
  input = decamelize(input);
  input = input.toLowerCase().replace(/[_-]+/g, " ").replace(/\s{2,}/g, " ").trim();
  input = input.charAt(0).toUpperCase() + input.slice(1);
  return input;
};
humanizeString$1.exports = humanizeString;
humanizeString$1.exports.default = humanizeString;
const MAX_STRING_LENGTH = 150;
const truncate = (value) => {
  let output = (value == null ? void 0 : value.toString()) ?? "";
  if (output.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + "...";
  }
  return output;
};
const timeTag = (dateTime) => {
  let output = "";
  if (dateTime) {
    output = /* @__PURE__ */ jsxRuntimeExports.jsx("time", { dateTime, title: dateTime, children: new Date(dateTime).toUTCString() });
  }
  return output;
};
export {
  truncate as a,
  timeTag as t
};
