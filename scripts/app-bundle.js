define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AppComponent = exports.AppComponent = function () {
    function AppComponent() {
      _classCallCheck(this, AppComponent);

      this.message = '';
      this.history = '';
      this.users = [];
      this.name = '';
      this.nameSet = false;
      this.client;
    }

    AppComponent.prototype.setName = function setName() {
      var self = this;
      this.nameSet = true;
      this.client = new WebSocket('ws://localhost:8001');
      this.client.onopen = function () {
        self.client.send(self.createNewUser());
      };
      this.client.onmessage = function incoming(message) {
        var parsed = JSON.parse(message.data);
        if (parsed.clientNames) {
          console.log(parsed);
          self.users = parsed.clientNames;
        } else {
          self.history += self.printMessage(parsed) + '\n';
        }
      };
    };

    AppComponent.prototype.sendMessage = function sendMessage() {
      this.client.send(this.createMessage());
      this.message = '';
    };

    AppComponent.prototype.printMessage = function printMessage(message) {
      return message.name + " says: " + message.message;
    };

    AppComponent.prototype.createNewUser = function createNewUser() {
      return JSON.stringify({
        "newUser": this.name
      });
    };

    AppComponent.prototype.createMessage = function createMessage() {
      return JSON.stringify({
        "name": this.name,
        "message": this.message
      });
    };

    return AppComponent;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${name} joow</h1>\n  <div *ngIf=\"nameSet\">\n    <textarea id=\"chatBox\" value.bind=\"history\" style=\"width: 50em; height: 30em;\" disabled=true></textarea>\n    <form submit.delegate=\"sendMessage()\">\n      <input name=\"message\" type=\"text\" value.bind=\"message\"/>\n      <button type=\"submit\">Send</button>\n    </form>\n    <ul>\n      <li repeat.for=\"user of users\">\n        <span>${user.name}</span>\n        <span> is connected.</span>\n      </li>\n    </ul>\n  </div>\n  <div>\n    <form submit.delegate=\"setName()\">\n      <input name=\"name\" type=\"text\" value.bind=\"name\" />\n      <button type=\"submit\">Set name</button>\n    </form>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map