"use strict";

const chalk = require("chalk");
const yosay = require("yosay");
const underscoreString = require("underscore.string");
const Generator = require("yeoman-generator");

var toCamelCase = function (string) {
  return string.replace(/(\-\w)/g, function (matches) {
    return matches[1].toUpperCase();
  });
};

var toPascalCase = function (string) {
  var firstLetter = string.charAt(0);
  return firstLetter.toUpperCase() + toCamelCase(string.slice(1));
};

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    // Have Yeoman greet the user.
    this.log(yosay(
      "Welcome to the " + chalk.red("NgxLibGen") + " generator!"
    ));
  }

  prompting() {
    const prompts = [
      {
        type: "input",
        name: "authorName",
        message: "Your full name:",
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return "Please enter your full name";
        },
        default: this.user.git.name
      },
      {
        type: "input",
        name: "authorEmail",
        message: "Your email address:",
        validate: function (input) {
          if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
            return true;
          }
          return "Please enter a valid email address";
        },
        default: this.user.git.email
      },
      {
        type: "input",
        name: "libraryName",
        message: "Your library name (kebab-case)",
        default: underscoreString.slugify(this.appname),
        filter: function (x) {
          return underscoreString.slugify(x);
        }
      },
      {
        type: "input",
        name: "scope",
        message: "Your library scope (eg: @angular) leave blank for none",
        default: "",
        validate: function (x) {
          return !x || x.indexOf("@") === 0;
        },
        filter: function (x) {
          return x ? x + "/" : "";
        }
      },
      {
        type: "input",
        name: "angularVersion",
        message: "Angular version (5 / 6 / 7):",
        validate: function (input) {
          if (/^[5|6|7]$/.test(input)) {
            return true;
          }
          return "Please enter a valid angular version!";
        },
        default: 7
      },
      {
        type: "input",
        name: "gitRepositoryUrl",
        message: "Git repository url",
        default: "https://github.com/johndoe/my-cool-lib",
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {

      this.props = {
        author: {
          name: props.authorName,
          email: props.authorEmail
        },
        libraryName: {
          original: props.libraryName,
          kebabCase: props.libraryName,
          camelCase: toCamelCase(props.libraryName),
          pascalCase: toPascalCase(props.libraryName)
        },
        gitRepositoryUrl: props.gitRepositoryUrl,
        angularVersion: parseInt(props.angularVersion),
        scope: props.scope
      };

    });
  }

  writing() {


    this.fs.copyTpl(
      this.templatePath("_package_" + this.props.angularVersion + ".json"),
      this.destinationPath("package.json"),
      {
        props: this.props
      }
    );

    if (this.props.angularVersion === 5) {
      this.fs.copyTpl(
        this.templatePath("_angular-cli.json"),
        this.destinationPath(".angular-cli.json"),
        {
          props: this.props
        }
      );
    }
    else {
      this.fs.copyTpl(
        this.templatePath("_angular.json"),
        this.destinationPath("angular.json"),
        {
          props: this.props
        }
      );
    }

    // Copy directories

    this.fs.copyTpl(
      this.templatePath("_environments/**/*"),
      this.destinationPath("environments")
    );

    this.fs.copyTpl(
      this.templatePath("_lib/**/*"),
      this.destinationPath("lib")
    );

    this.fs.copyTpl(
      this.templatePath("_styles/empty.scss"),
      this.destinationPath("lib/scss/" + this.props.libraryName.kebabCase + ".scss")
    );

    this.fs.copyTpl(
      this.templatePath("_src/**/*"),
      this.destinationPath("src"),
      {
        props: this.props
      }
    );

    // Clear root scss
    if (this.props.angularVersion === 5) {
      this.fs.copyTpl(
        this.templatePath("_styles/root.scss"),
        this.destinationPath("src/styles.scss"),
        {
          props: this.props
        }
      );
    }
    else {
      this.fs.copyTpl(
        this.templatePath("_styles/root.scss"),
        this.destinationPath("src/main.scss"),
        {
          props: this.props
        }
      );
    }

    // Templates with different destination than source
    var otherFiles = [
      {src: "_gulpfile.js", dest: "gulpfile.js"},
      {src: "_README.md", dest: "README.md"},
      {src: "_changelog.md", dest: "changelog.md"},
      {src: "_gitignore", dest: "ng-package.json"},
      {src: "_travis.yml", dest: ".travis.yml"},
      {src: "_tsconfig.json", dest: "tsconfig.json"},
      {src: "_tslint.json", dest: "tslint.json"},
      {src: "_tsrefs/_public_api.ts", dest: "lib/public_api.ts"},
      {src: "_tsrefs/_sample.module.ts", dest: "lib/" + this.props.libraryName.kebabCase + ".module.ts"},
      {src: "_tsrefs/_app.module.ts", dest: "src/app/app.module.ts"}
    ];

    // Copy otherFiles
    for (var i = 0; i < otherFiles.length; i++) {
      var file = otherFiles[i];
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        {
          props: this.props
        }
      );
    }

  }

  install() {
    this.installDependencies({bower: false});
  }
};
