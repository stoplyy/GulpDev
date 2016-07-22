//CMD gulp watchPro
var gulpConfg = {
    host: "http://gulpdemo/",
    cssPaths: ["Content\\*.css"],
    jsPaths: ["Scripts\\*.js"],
    htmlPaths: ["Views\\**\\*"]
}

/**
 * css审查规则
 * 说明文档：https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md
 */
var stylelintConfig = {
    /* 精简规则
    "rules": {
        "selector-type-no-unknown": true,
        "block-no-empty": true,
        "color-no-invalid-hex": true,
        "declaration-colon-space-after": "always",
        "declaration-colon-space-before": "never",
        "function-comma-space-after": "always",
        //"function-url-quotes": "double",
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-name-no-vendor-prefix": true,
        "max-empty-lines": 5,
        "number-leading-zero": "never",
        "number-no-trailing-zeros": true,
        "property-no-vendor-prefix": true,
        "selector-list-comma-space-before": "never",
        "selector-list-comma-newline-after": "always",
        "selector-no-id": true,
        "string-quotes": "double",
        "value-no-vendor-prefix": true
    }*/

    //建议规则
    "rules": {
        "at-rule-empty-line-before": ["always", {
            except: ["blockless-group", "first-nested"],
            ignore: ["after-comment"]
        }],
        "at-rule-name-case": "lower",
        "at-rule-name-space-after": "always-single-line",
        "at-rule-semicolon-newline-after": "always",
        "block-closing-brace-newline-after": "always",
        "block-closing-brace-newline-before": "always-multi-line",
        "block-closing-brace-space-before": "always-single-line",
        "block-no-empty": true,
        "block-opening-brace-newline-after": "always-multi-line",
        "block-opening-brace-space-after": "always-single-line",
        "block-opening-brace-space-before": "always",
        "color-hex-case": "lower",
        "color-hex-length": "short",
        "color-no-invalid-hex": true,
        "comment-empty-line-before": ["always", {
            except: ["first-nested"],
            ignore: ["stylelint-commands"]
        }],
        "comment-whitespace-inside": "always",
        "declaration-bang-space-after": "never",
        "declaration-bang-space-before": "always",
        "declaration-block-no-ignored-properties": true,
        "declaration-block-no-shorthand-property-overrides": true,
        "declaration-block-semicolon-newline-after": "always-multi-line",
        "declaration-block-semicolon-space-after": "always-single-line",
        "declaration-block-semicolon-space-before": "never",
        "declaration-block-single-line-max-declarations": 1,
        "declaration-block-trailing-semicolon": "always",
        "declaration-colon-newline-after": "always-multi-line",
        "declaration-colon-space-after": "always-single-line",
        "declaration-colon-space-before": "never",
        "function-calc-no-unspaced-operator": true,
        "function-comma-newline-after": "always-multi-line",
        "function-comma-space-after": "always-single-line",
        "function-comma-space-before": "never",
        "function-linear-gradient-no-nonstandard-direction": true,
        "function-max-empty-lines": 0,
        "function-name-case": "lower",
        "function-parentheses-newline-inside": "always-multi-line",
        "function-parentheses-space-inside": "never-single-line",
        "function-whitespace-after": "always",
        //"indentation": 2,
        "keyframe-declaration-no-important": true,
        "length-zero-no-unit": true,
        "max-empty-lines": 1,
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-no-missing-punctuation": true,
        "media-feature-parentheses-space-inside": "never",
        "media-feature-range-operator-space-after": "always",
        "media-feature-range-operator-space-before": "always",
        "media-query-list-comma-newline-after": "always-multi-line",
        "media-query-list-comma-space-after": "always-single-line",
        "media-query-list-comma-space-before": "never",
        "no-empty-source": true,
        "no-eol-whitespace": true,
        "no-extra-semicolons": true,
        "no-invalid-double-slash-comments": true,
        "no-missing-end-of-source-newline": true,
        "number-leading-zero": "always",
        "number-no-trailing-zeros": true,
        "property-case": "lower",
        //"rule-non-nested-empty-line-before": [ "always-multi-line", {
        //    ignore: ["after-comment"],
        //} ],
        "selector-attribute-brackets-space-inside": "never",
        "selector-attribute-operator-space-after": "never",
        "selector-attribute-operator-space-before": "never",
        "selector-combinator-space-after": "always",
        "selector-combinator-space-before": "always",
        "selector-list-comma-newline-after": "always",
        "selector-list-comma-space-before": "never",
        "selector-max-empty-lines": 0,
        "selector-pseudo-class-case": "lower",
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-class-parentheses-space-inside": "never",
        "selector-pseudo-element-case": "lower",
        "selector-pseudo-element-colon-notation": "double",
        "selector-pseudo-element-no-unknown": true,
        "selector-type-case": "lower",
        "selector-type-no-unknown": true,
        "shorthand-property-no-redundant-values": true,
        "string-no-newline": true,
        "unit-case": "lower",
        "unit-no-unknown": true,
        "value-list-comma-newline-after": "always-multi-line",
        "value-list-comma-space-after": "always-single-line",
        "value-list-comma-space-before": "never"
    }
};

var gulp = require("gulp");
var less = require("gulp-less");//编译less文件
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var csslint = require("gulp-csslint");
var plumber = require("gulp-plumber");//异常监控
//文件监视，自动刷新
var watch = require("gulp-watch");
var browserSync = require("browser-sync").create();
/*****************# stylelint #*****************/
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var stylelint = require('stylelint');
/*****************# stylelint #*****************/

//错误处理
function ErrorFunction() {
    //错误处理
    gutil.beep();
}

//浏览器刷新
function browserSyncChange(event) {
    return gulp.src(event.path)
        .pipe(browserSync.reload({ stream: true }));
}

gulp.task("watchPro",
    function () {
        gutil.log("=============proHost=============");
        gutil.log(gulpConfg.host);
        gutil.log("=============cssPaths=============");
        gutil.log(gulpConfg.cssPaths);
        gulpConfg.cssPaths.map(function (one) {
            gutil.log(one);
        });
        gutil.log("=============jsPaths=============");
        gutil.log(gulpConfg.jsPaths);
        gulpConfg.cssPaths.map(function (one) {
            gutil.log(one);
        });
        gutil.log("=============Start=============");
        browserSync.init({
            proxy: gulpConfg.host
        });
        gulp.watch(gulpConfg.cssPaths)//监视css文件改动
            .on("change", function (event) {
                lintCsS(event.path);
                return browserSyncChange(event);
            });

        //TODO:css文件变动时只刷新引用到变动css的页面，但是js/html变动时却将所有的页面都刷新；待解决
        gulp.watch(gulpConfg.jsPaths)//监视js文件改动
            .on("change", function (event) {
                lintJs(event.path);
                return browserSyncChange(event);
            });

        gulp.watch(gulpConfg.htmlPaths)//监视html/cshtml文件改动
            .on("change", function (event) { return browserSyncChange(event) });

    });

//js代码检查
function lintJs(path) {
    return gulp.src(path)
        .pipe(plumber(ErrorFunction))
        .pipe(jshint({
            "undef": false,
            "unused": false
        }))
        .pipe(jshint.reporter(stylish)) //高亮提示
        .pipe(jshint.reporter("fail"));
}

//cs代码检查
function lintCs(path) {
    return gulp.src(path)
        .pipe(plumber(ErrorFunction))
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
}

//cs代码检查stylelint
function lintCsS(path) {
    var processors = [
        stylelint(stylelintConfig),
        reporter({
            clearMessages: true,
            throwError: true
        })
    ];
    return gulp.src(path)
        .pipe(plumber(ErrorFunction))
        .pipe(postcss(processors));
}
