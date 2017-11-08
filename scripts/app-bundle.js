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
    }

    AppComponent.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Aurelia';
      config.map([{ route: ['', 'home'], name: 'home', moduleId: 'chat' }, { route: 'test/:id', name: 'justatest', moduleId: 'test' }]);
    };

    return AppComponent;
  }();
});
define('chat',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ChatComponent = exports.ChatComponent = function () {
    function ChatComponent() {
      _classCallCheck(this, ChatComponent);

      this.message = '';
      this.messages = [];
      this.users = [];
      this.name = '';
      this.nameSet = false;
    }

    ChatComponent.prototype.setName = function setName() {
      var self = this;
      this.nameSet = true;
      this.client = new WebSocket('ws://172.31.90.24:8001');
      this.client.onopen = function () {
        self.client.send(self.createNewUser());
      };
      this.client.onmessage = function incoming(message) {
        var parsed = JSON.parse(message.data);
        if (parsed.clientNames) {
          console.log(parsed);
          self.users = parsed.clientNames;
        } else {
          self.messages.push({ otheruser: function () {
              return self.name === parsed.name;
            }(), corresponder: parsed.name, message: parsed.message });
        }
      };
    };

    ChatComponent.prototype.sendMessage = function sendMessage() {
      this.client.send(this.createMessage());
      this.message = '';
    };

    ChatComponent.prototype.createNewUser = function createNewUser() {
      return JSON.stringify({
        "newUser": this.name
      });
    };

    ChatComponent.prototype.createMessage = function createMessage() {
      return JSON.stringify({
        "name": this.name,
        "message": this.message
      });
    };

    return ChatComponent;
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
define('message',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MessageCustomElement = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

  var MessageCustomElement = exports.MessageCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.TaskQueue), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
    function MessageCustomElement(taskQueue) {
      _classCallCheck(this, MessageCustomElement);

      _initDefineProp(this, 'message', _descriptor, this);

      this.taskQueue = taskQueue;
    }

    MessageCustomElement.prototype.attached = function attached() {
      this.taskQueue.queueMicroTask(function () {
        $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
      });
    };

    return MessageCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'message', [_dec2], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('test',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TestComponent = exports.TestComponent = function () {
    function TestComponent() {
      _classCallCheck(this, TestComponent);
    }

    TestComponent.prototype.activate = function activate(params) {
      this.id = params.id;
    };

    return TestComponent;
  }();
});
define('user',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserCustomElement = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

  var UserCustomElement = exports.UserCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
    function UserCustomElement(router) {
      _classCallCheck(this, UserCustomElement);

      _initDefineProp(this, 'user', _descriptor, this);

      this.router = router;
      this.status = "connected";
    }

    UserCustomElement.prototype.startConversation = function startConversation() {
      this.router.navigateToRoute('justatest', { id: 456 });
    };

    return UserCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'user', [_dec2], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n</template>\n"; });
define('text!chat.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./message\"></require>\n  <require from=\"./user\"></require>\n\n  <div show.bind=\"nameSet\" class=\"container\">\n    <h1>${name}</h1>\n    <div class=\"row\">\n      <div show.bind=\"nameSet\" class=\"container col-md-10\">\n        <div id=\"chat-container\" class=\"bg-success d-flex flex-column pre-scrollable\" style=\"height: 300px; padding: 10px;\">\n          <div class=\"mt-auto\">\n            <div class=\"row\" repeat.for=\"message of messages\">\n              <div if.bind=\"message.otheruser\" class=\"col\"></div>\n              <message if.bind=\"message.otheruser\" class=\"col\" message.bind=\"message\"></message>\n              <!--separate-->\n              <message if.bind=\"!message.otheruser\" class=\"col\" message.bind=\"message\"></message>\n              <div if.bind=\"!message.otheruser\" class=\"col\"></div>\n            </div>\n          </div>\n        </div>\n        <form submit.delegate=\"sendMessage()\">\n          <div class=\"w-100 justify-content-md-center\">\n            <div class=\"input-group\" style=\"height: 50px;\">\n              <input name=\"message\" type=\"text\" value.bind=\"message\" class=\"form-control text-left\"\n                     placeholder=\"type here\">\n              <span class=\"input-group-btn\">\n              <button class=\"btn btn-success\" type=\"submit\">Send</button>\n            </span>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"col-md-2\" style=\"height: 300px;\">\n        <div class=\"list-group\">\n          <user repeat.for=\"user of users\" user.bind=\"user\"></user>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div show.bind=\"!nameSet\" class=\"container\">\n    <form submit.delegate=\"setName()\">\n      <div class=\"input-group\" style=\"height: 50px;\">\n        <input name=\"name\" type=\"text\" value.bind=\"name\" class=\"form-control text-left\"\n               placeholder=\"name here\">\n        <span class=\"input-group-btn\">\n              <button class=\"btn btn-success\" type=\"submit\">Go!</button>\n            </span>\n      </div>\n    </form>\n  </div>\n</template>\n"; });
define('text!message.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"ml-md-1 mb-md-2 p-md-2 bg-faded justify-content-between\">\n      <h5 class=\"mb-1\">${message.corresponder}</h5>\n      <p class=\"mb-1\">${message.message}</p>\n      <small>just now</small>\n  </div>\n</template>\n"; });
define('text!test.html', ['module'], function(module) { module.exports = "<template>\n  <h1>just a ${id}</h1>\n</template>\n"; });
define('text!user.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"list-group-item flex-column justify-content-between\" click.delegate=\"startConversation()\">\n    <h3 class=\"text-muted mr-auto\">${user.name}</h3>\n    <small class=\"text-muted ml-auto\">${status}</small>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map