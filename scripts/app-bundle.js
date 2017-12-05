define('addContact',['exports', './httpService', 'aurelia-framework', 'aurelia-dialog'], function (exports, _httpService, _aureliaFramework, _aureliaDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AddContact = undefined;

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

  var AddContact = exports.AddContact = (_dec = (0, _aureliaFramework.inject)(_httpService.HttpService, _aureliaDialog.DialogController), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
    function AddContact(httpService, controller) {
      var _this = this;

      _classCallCheck(this, AddContact);

      _initDefineProp(this, 'user', _descriptor, this);

      this.httpService = httpService;
      this.controller = controller;
      this.httpService.getContacts().then(function (response) {
        _this.users = JSON.parse(response.response);
        console.log(_this.users);
      });
    }

    AddContact.prototype.activate = function activate(user) {
      this.user = user;
    };

    AddContact.prototype.add = function add(user) {
      console.log(this.user.user_id, user.user_id);
      this.httpService.addContact(this.user.user_id, user.user_id).then(function (response) {
        console.log(response);
      }).catch(function (response) {
        console.log(response);
      });
    };

    return AddContact;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'user', [_dec2], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('app',['exports', './authorize', 'aurelia-framework'], function (exports, _authorize, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AppComponent = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AppComponent = exports.AppComponent = (_dec = (0, _aureliaFramework.inject)(_authorize.AuthorizeStep), _dec(_class = function () {
    function AppComponent(authStep) {
      _classCallCheck(this, AppComponent);

      this.authStep = authStep;
    }

    AppComponent.prototype.configureRouter = function configureRouter(config, router) {
      config.addAuthorizeStep(this.authStep);
      config.title = 'Aurelia';
      config.map([{ route: ['', 'home'], name: 'home', moduleId: 'chat', settings: { auth: true } }, { route: 'register', name: 'register', moduleId: 'register' }, { route: 'login', name: 'login', moduleId: 'login' }]);
    };

    return AppComponent;
  }()) || _class);
});
define('authorize',['exports', 'aurelia-router', 'aurelia-authentication', 'aurelia-framework'], function (exports, _aureliaRouter, _aureliaAuthentication, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthorizeStep = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AuthorizeStep = exports.AuthorizeStep = (_dec = (0, _aureliaFramework.inject)(_aureliaAuthentication.AuthService), _dec(_class = function () {
    function AuthorizeStep(authService) {
      _classCallCheck(this, AuthorizeStep);

      this.authService = authService;
    }

    AuthorizeStep.prototype.run = function run(navigationInstruction, next) {
      if (navigationInstruction.getAllInstructions().some(function (i) {
        return i.config.settings.auth;
      })) {
        var isLoggedIn = this.authService.authenticated;
        if (!isLoggedIn) {
          return next.cancel(new _aureliaRouter.RedirectToRoute('login'));
        }
      }

      return next();
    };

    return AuthorizeStep;
  }()) || _class);
});
define('chat',['exports', 'aurelia-authentication', 'aurelia-dialog', 'aurelia-framework', 'aurelia-plugins-jwt-decode', './httpService', './addContact', './environment'], function (exports, _aureliaAuthentication, _aureliaDialog, _aureliaFramework, _aureliaPluginsJwtDecode, _httpService, _addContact, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChatComponent = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ChatComponent = exports.ChatComponent = (_dec = (0, _aureliaFramework.inject)(_aureliaAuthentication.AuthService, _aureliaDialog.DialogService, _httpService.HttpService), _dec(_class = function () {
    function ChatComponent(authService, dialogService, httpService) {
      _classCallCheck(this, ChatComponent);

      this.message = '';
      this.messages = [];
      this.users = [];
      this.name = '';
      this.selectedContact = '';

      this.authService = authService;
      this.dialogService = dialogService;
      this.httpService = httpService;
    }

    ChatComponent.prototype.attached = function attached() {
      this.user = _aureliaPluginsJwtDecode.JwtDecode.decode(this.authService.authentication.accessToken);
      var self = this;
      this.client = new WebSocket(_environment2.default.websocketUrl);
      this.client.onopen = function () {
        self.client.send(JSON.stringify({ "connect": self.authService.authentication.accessToken }));
      };
      this.client.onmessage = function incoming(message) {
        var parsed = JSON.parse(message.data);
        if (parsed.clientNames) {
          console.log(parsed);
        } else {
          console.log(parsed);
          self.messages.push({
            otheruser: function () {
              return self.name === parsed.nickname;
            }(),
            corresponder: parsed.nickname,
            message: parsed.message,
            timestamp: parsed.timestamp,
            error: parsed.error
          });
        }
      };

      this.httpService.getContact(this.user.user_id).then(function (response) {
        self.users = JSON.parse(response.response);
        console.log(self.users);
      });
    };

    ChatComponent.prototype.sendMessage = function sendMessage() {
      this.client.send(this.createMessage());
      this.message = '';
    };

    ChatComponent.prototype.createMessage = function createMessage() {
      return JSON.stringify({
        "sender": this.user.nickname,
        "addressee": this.selectedContact.nickname,
        "message": this.message
      });
    };

    ChatComponent.prototype.addContact = function addContact() {
      this.dialogService.open({ viewModel: _addContact.AddContact, model: this.user, lock: false }).whenClosed(function (response) {
        if (!response.wasCancelled) {
          console.log('good');
        } else {
          console.log('bad');
        }
        console.log(response.output);
      });
    };

    ChatComponent.prototype.logout = function logout() {
      this.authService.logout();
    };

    return ChatComponent;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true,
    backendUrl: "http://192.168.0.120:3000",
    websocketUrl: "ws://192.168.0.120:8001"
  };
});
define('httpService',['exports', 'aurelia-http-client', './environment'], function (exports, _aureliaHttpClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HttpService = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var HttpService = exports.HttpService = function () {
    function HttpService() {
      _classCallCheck(this, HttpService);

      this.client = new _aureliaHttpClient.HttpClient().configure(function (x) {
        x.withBaseUrl(_environment2.default.backendUrl);
      });
    }

    HttpService.prototype.register = function register(nickname, password, firstName, lastName, email, success, error) {
      return this.client.post('auth/register', {
        nickname: nickname,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email
      });
    };

    HttpService.prototype.getContacts = function getContacts() {
      return this.client.get('get/contact/');
    };

    HttpService.prototype.getContact = function getContact(userId) {
      return this.client.get('get/contact/' + userId);
    };

    HttpService.prototype.addContact = function addContact(userId, contactId) {
      return this.client.post('add/contact/', {
        userId: userId,
        contactId: contactId
      });
    };

    return HttpService;
  }();
});
define('login',['exports', 'aurelia-authentication', 'aurelia-router', 'aurelia-framework', './httpService'], function (exports, _aureliaAuthentication, _aureliaRouter, _aureliaFramework, _httpService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var _dec, _dec2, _class, _desc, _value, _class2;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_aureliaAuthentication.AuthService, _aureliaRouter.Router, _aureliaFramework.TaskQueue, _httpService.HttpService), _dec2 = (0, _aureliaFramework.computedFrom)('authService.authenticated'), _dec(_class = (_class2 = function () {
    function Login(authService, router, taskQueue, httpService) {
      _classCallCheck(this, Login);

      this.register = false;
      this.authService = authService;
      this.router = router;
      this.taskQueue = taskQueue;
      this.httpService = httpService;
    }

    Login.prototype.login = function login() {
      var _this = this;

      var self = this;
      return this.authService.login({
        nickname: this.loginNickname,
        password: this.loginPassword
      }).then(function (response) {
        console.log(response);
        self.authService.setResponseObject(response);
        console.log(self.authService.authenticated);
      }).catch(function (response) {
        return response.json();
      }).then(function (error) {
        _this.error = error.error;
        _this.taskQueue.queueMicroTask(function () {
          $('#loginfailed').fadeTo("slow", 1);
        });
      });
    };

    Login.prototype.postRegister = function postRegister() {
      var _this2 = this;

      this.loginNickname = this.registerNickname;
      this.loginPassword = this.registerPassword;
      this.httpService.register(this.registerNickname, this.registerPassword, this.firstName, this.lastName, this.email).then(function (response) {
        console.log(response);
        _this2.login();
      }).catch(function (response) {
        _this2.error = JSON.parse(response.response).error;
        _this2.taskQueue.queueMicroTask(function () {
          $('#registerfailed').fadeTo("slow", 1);
        });
      });
    };

    Login.prototype.goToRegister = function goToRegister() {
      this.register = true;
    };

    _createClass(Login, [{
      key: 'authenticated',
      get: function get() {
        return this.authService.authenticated;
      }
    }]);

    return Login;
  }(), (_applyDecoratedDescriptor(_class2.prototype, 'authenticated', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'authenticated'), _class2.prototype)), _class2)) || _class);
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
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-api', function (configure) {
      configure.registerEndpoint('auth', _environment2.default.backendUrl).registerEndpoint('login', '/login').registerEndpoint('register', '/register').registerEndpoint('chat', '/chat');
    }).plugin('aurelia-dialog').plugin('aurelia-authentication', function (baseConfig) {
      baseConfig.configure({
        endpoint: 'auth',
        configureEndpoints: ['auth', 'login', 'register', 'chat'],
        logoutRedirect: '/',
        refreshTokenUrl: null,
        useRefreshToken: false
      });
    });

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
      console.log(this.message.error !== "none");
      this.taskQueue.queueMicroTask(function () {
        $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
      });
    };

    MessageCustomElement.prototype.isError = function isError() {
      return this.message.error !== "none";
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
define('user',['exports', 'aurelia-framework', 'aurelia-authentication', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaAuthentication, _aureliaRouter) {
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

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var UserCustomElement = exports.UserCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuthentication.AuthService), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
    function UserCustomElement(router, authService) {
      _classCallCheck(this, UserCustomElement);

      _initDefineProp(this, 'user', _descriptor, this);

      _initDefineProp(this, 'selectedContact', _descriptor2, this);

      this.router = router;
      this.authService = authService;
    }

    UserCustomElement.prototype.selectContact = function selectContact() {
      this.selectedContact = this.user;
      console.log(this.selectedContact);
    };

    return UserCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'user', [_dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'selectedContact', [_dec3], {
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
define('aurelia-dialog/dialog-configuration',["require", "exports", "./renderer", "./dialog-settings", "./dialog-renderer", "aurelia-pal"], function (require, exports, renderer_1, dialog_settings_1, dialog_renderer_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultRenderer = dialog_renderer_1.DialogRenderer;
    var resources = {
        'ux-dialog': aurelia_pal_1.PLATFORM.moduleName('./ux-dialog'),
        'ux-dialog-header': aurelia_pal_1.PLATFORM.moduleName('./ux-dialog-header'),
        'ux-dialog-body': aurelia_pal_1.PLATFORM.moduleName('./ux-dialog-body'),
        'ux-dialog-footer': aurelia_pal_1.PLATFORM.moduleName('./ux-dialog-footer'),
        'attach-focus': aurelia_pal_1.PLATFORM.moduleName('./attach-focus')
    };
    // tslint:disable-next-line:max-line-length
    var defaultCSSText = "ux-dialog-container,ux-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0}ux-dialog-overlay{opacity:0}ux-dialog-overlay.active{opacity:1}ux-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}ux-dialog-container.active{opacity:1}ux-dialog-container>div{padding:30px}ux-dialog-container>div>div{display:block;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto}ux-dialog-container,ux-dialog-container>div,ux-dialog-container>div>div{outline:0}ux-dialog{display:table;box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3px;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;background:#fff}ux-dialog>ux-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ux-dialog>ux-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:0 0;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ux-dialog>ux-dialog-body{display:block;padding:16px}ux-dialog>ux-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ux-dialog>ux-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ux-dialog>ux-dialog-footer button:disabled{cursor:default;opacity:.45}ux-dialog>ux-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ux-dialog-open{overflow:hidden}";
    /**
     * A configuration builder for the dialog plugin.
     */
    var DialogConfiguration = /** @class */ (function () {
        function DialogConfiguration(frameworkConfiguration, applySetter) {
            var _this = this;
            this.renderer = defaultRenderer;
            this.cssText = defaultCSSText;
            this.resources = [];
            this.fwConfig = frameworkConfiguration;
            this.settings = this.fwConfig.container.get(dialog_settings_1.DefaultDialogSettings);
            applySetter(function () { return _this._apply(); });
        }
        DialogConfiguration.prototype._apply = function () {
            var _this = this;
            this.fwConfig.transient(renderer_1.Renderer, this.renderer);
            this.resources.forEach(function (resourceName) { return _this.fwConfig.globalResources(resources[resourceName]); });
            if (this.cssText) {
                aurelia_pal_1.DOM.injectStyles(this.cssText);
            }
        };
        /**
         * Selects the Aurelia conventional defaults for the dialog plugin.
         * @return This instance.
         */
        DialogConfiguration.prototype.useDefaults = function () {
            return this.useRenderer(defaultRenderer)
                .useCSS(defaultCSSText)
                .useStandardResources();
        };
        /**
         * Exports the standard set of dialog behaviors to Aurelia's global resources.
         * @return This instance.
         */
        DialogConfiguration.prototype.useStandardResources = function () {
            return this.useResource('ux-dialog')
                .useResource('ux-dialog-header')
                .useResource('ux-dialog-body')
                .useResource('ux-dialog-footer')
                .useResource('attach-focus');
        };
        /**
         * Exports the chosen dialog element or view to Aurelia's global resources.
         * @param resourceName The name of the dialog resource to export.
         * @return This instance.
         */
        DialogConfiguration.prototype.useResource = function (resourceName) {
            this.resources.push(resourceName);
            return this;
        };
        /**
         * Configures the plugin to use a specific dialog renderer.
         * @param renderer A type that implements the Renderer interface.
         * @param settings Global settings for the renderer.
         * @return This instance.
         */
        DialogConfiguration.prototype.useRenderer = function (renderer, settings) {
            this.renderer = renderer;
            if (settings) {
                Object.assign(this.settings, settings);
            }
            return this;
        };
        /**
         * Configures the plugin to use specific css. You can pass an empty string to clear any set css.
         * @param cssText The css to use in place of the default styles.
         * @return This instance.
         */
        DialogConfiguration.prototype.useCSS = function (cssText) {
            this.cssText = cssText;
            return this;
        };
        return DialogConfiguration;
    }());
    exports.DialogConfiguration = DialogConfiguration;
});

define('aurelia-dialog/renderer',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An abstract base class for implementors of the basic Renderer API.
     */
    var Renderer = /** @class */ (function () {
        function Renderer() {
        }
        /**
         * Gets an anchor for the ViewSlot to insert a view into.
         * @returns A DOM element.
         */
        Renderer.prototype.getDialogContainer = function () {
            throw new Error('DialogRenderer must implement getDialogContainer().');
        };
        /**
         * Displays the dialog.
         * @returns Promise A promise that resolves when the dialog has been displayed.
         */
        Renderer.prototype.showDialog = function (dialogController) {
            throw new Error('DialogRenderer must implement showDialog().');
        };
        /**
         * Hides the dialog.
         * @returns Promise A promise that resolves when the dialog has been hidden.
         */
        Renderer.prototype.hideDialog = function (dialogController) {
            throw new Error('DialogRenderer must implement hideDialog().');
        };
        return Renderer;
    }());
    exports.Renderer = Renderer;
});

define('aurelia-dialog/dialog-settings',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @internal
     */
    var DefaultDialogSettings = /** @class */ (function () {
        function DefaultDialogSettings() {
            this.lock = true;
            this.startingZIndex = 1000;
            this.centerHorizontalOnly = false;
            this.rejectOnCancel = false;
            this.ignoreTransitions = false;
        }
        return DefaultDialogSettings;
    }());
    exports.DefaultDialogSettings = DefaultDialogSettings;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/dialog-renderer',["require", "exports", "aurelia-pal", "aurelia-dependency-injection"], function (require, exports, aurelia_pal_1, aurelia_dependency_injection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var containerTagName = 'ux-dialog-container';
    var overlayTagName = 'ux-dialog-overlay';
    exports.transitionEvent = (function () {
        var transition;
        return function () {
            if (transition) {
                return transition;
            }
            var el = aurelia_pal_1.DOM.createElement('fakeelement');
            var transitions = {
                transition: 'transitionend',
                OTransition: 'oTransitionEnd',
                MozTransition: 'transitionend',
                WebkitTransition: 'webkitTransitionEnd'
            };
            for (var t in transitions) {
                if (el.style[t] !== undefined) {
                    transition = transitions[t];
                    return transition;
                }
            }
            return '';
        };
    })();
    exports.hasTransition = (function () {
        var unprefixedName = 'transitionDuration';
        var prefixedNames = ['webkitTransitionDuration', 'oTransitionDuration'];
        var el;
        var transitionDurationName;
        return function (element) {
            if (!el) {
                el = aurelia_pal_1.DOM.createElement('fakeelement');
                if (unprefixedName in el.style) {
                    transitionDurationName = unprefixedName;
                }
                else {
                    transitionDurationName = prefixedNames.find(function (prefixed) { return (prefixed in el.style); });
                }
            }
            return !!transitionDurationName && !!(aurelia_pal_1.DOM.getComputedStyle(element)[transitionDurationName]
                .split(',')
                .find(function (duration) { return !!parseFloat(duration); }));
        };
    })();
    var body;
    function getActionKey(e) {
        if ((e.code || e.key) === 'Escape' || e.keyCode === 27) {
            return 'Escape';
        }
        if ((e.code || e.key) === 'Enter' || e.keyCode === 13) {
            return 'Enter';
        }
        return undefined;
    }
    var DialogRenderer = /** @class */ (function () {
        function DialogRenderer() {
        }
        DialogRenderer_1 = DialogRenderer;
        DialogRenderer.keyboardEventHandler = function (e) {
            var key = getActionKey(e);
            if (!key) {
                return;
            }
            var top = DialogRenderer_1.dialogControllers[DialogRenderer_1.dialogControllers.length - 1];
            if (!top || !top.settings.keyboard) {
                return;
            }
            var keyboard = top.settings.keyboard;
            if (key === 'Escape'
                && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
                top.cancel();
            }
            else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
                top.ok();
            }
        };
        DialogRenderer.trackController = function (dialogController) {
            if (!DialogRenderer_1.dialogControllers.length) {
                aurelia_pal_1.DOM.addEventListener('keyup', DialogRenderer_1.keyboardEventHandler, false);
            }
            DialogRenderer_1.dialogControllers.push(dialogController);
        };
        DialogRenderer.untrackController = function (dialogController) {
            var i = DialogRenderer_1.dialogControllers.indexOf(dialogController);
            if (i !== -1) {
                DialogRenderer_1.dialogControllers.splice(i, 1);
            }
            if (!DialogRenderer_1.dialogControllers.length) {
                aurelia_pal_1.DOM.removeEventListener('keyup', DialogRenderer_1.keyboardEventHandler, false);
            }
        };
        DialogRenderer.prototype.getOwnElements = function (parent, selector) {
            var elements = parent.querySelectorAll(selector);
            var own = [];
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].parentElement === parent) {
                    own.push(elements[i]);
                }
            }
            return own;
        };
        DialogRenderer.prototype.attach = function (dialogController) {
            var spacingWrapper = aurelia_pal_1.DOM.createElement('div'); // TODO: check if redundant
            spacingWrapper.appendChild(this.anchor);
            this.dialogContainer = aurelia_pal_1.DOM.createElement(containerTagName);
            this.dialogContainer.appendChild(spacingWrapper);
            this.dialogOverlay = aurelia_pal_1.DOM.createElement(overlayTagName);
            var zIndex = typeof dialogController.settings.startingZIndex === 'number'
                ? dialogController.settings.startingZIndex + ''
                : null;
            this.dialogOverlay.style.zIndex = zIndex;
            this.dialogContainer.style.zIndex = zIndex;
            var lastContainer = this.getOwnElements(this.host, containerTagName).pop();
            if (lastContainer && lastContainer.parentElement) {
                this.host.insertBefore(this.dialogContainer, lastContainer.nextSibling);
                this.host.insertBefore(this.dialogOverlay, lastContainer.nextSibling);
            }
            else {
                this.host.insertBefore(this.dialogContainer, this.host.firstChild);
                this.host.insertBefore(this.dialogOverlay, this.host.firstChild);
            }
            dialogController.controller.attached();
            this.host.classList.add('ux-dialog-open');
        };
        DialogRenderer.prototype.detach = function (dialogController) {
            this.host.removeChild(this.dialogOverlay);
            this.host.removeChild(this.dialogContainer);
            dialogController.controller.detached();
            if (!DialogRenderer_1.dialogControllers.length) {
                this.host.classList.remove('ux-dialog-open');
            }
        };
        DialogRenderer.prototype.setAsActive = function () {
            this.dialogOverlay.classList.add('active');
            this.dialogContainer.classList.add('active');
        };
        DialogRenderer.prototype.setAsInactive = function () {
            this.dialogOverlay.classList.remove('active');
            this.dialogContainer.classList.remove('active');
        };
        DialogRenderer.prototype.setupClickHandling = function (dialogController) {
            this.stopPropagation = function (e) { e._aureliaDialogHostClicked = true; };
            this.closeDialogClick = function (e) {
                if (dialogController.settings.overlayDismiss && !e._aureliaDialogHostClicked) {
                    dialogController.cancel();
                }
            };
            this.dialogContainer.addEventListener('click', this.closeDialogClick);
            this.anchor.addEventListener('click', this.stopPropagation);
        };
        DialogRenderer.prototype.clearClickHandling = function () {
            this.dialogContainer.removeEventListener('click', this.closeDialogClick);
            this.anchor.removeEventListener('click', this.stopPropagation);
        };
        DialogRenderer.prototype.centerDialog = function () {
            var child = this.dialogContainer.children[0];
            var vh = Math.max(aurelia_pal_1.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);
            child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
            child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
        };
        DialogRenderer.prototype.awaitTransition = function (setActiveInactive, ignore) {
            var _this = this;
            return new Promise(function (resolve) {
                // tslint:disable-next-line:no-this-assignment
                var renderer = _this;
                var eventName = exports.transitionEvent();
                function onTransitionEnd(e) {
                    if (e.target !== renderer.dialogContainer) {
                        return;
                    }
                    renderer.dialogContainer.removeEventListener(eventName, onTransitionEnd);
                    resolve();
                }
                if (ignore || !exports.hasTransition(_this.dialogContainer)) {
                    resolve();
                }
                else {
                    _this.dialogContainer.addEventListener(eventName, onTransitionEnd);
                }
                setActiveInactive();
            });
        };
        DialogRenderer.prototype.getDialogContainer = function () {
            return this.anchor || (this.anchor = aurelia_pal_1.DOM.createElement('div'));
        };
        DialogRenderer.prototype.showDialog = function (dialogController) {
            var _this = this;
            if (!body) {
                body = aurelia_pal_1.DOM.querySelectorAll('body')[0];
            }
            if (dialogController.settings.host) {
                this.host = dialogController.settings.host;
            }
            else {
                this.host = body;
            }
            var settings = dialogController.settings;
            this.attach(dialogController);
            if (typeof settings.position === 'function') {
                settings.position(this.dialogContainer, this.dialogOverlay);
            }
            else if (!settings.centerHorizontalOnly) {
                this.centerDialog();
            }
            DialogRenderer_1.trackController(dialogController);
            this.setupClickHandling(dialogController);
            return this.awaitTransition(function () { return _this.setAsActive(); }, dialogController.settings.ignoreTransitions);
        };
        DialogRenderer.prototype.hideDialog = function (dialogController) {
            var _this = this;
            this.clearClickHandling();
            DialogRenderer_1.untrackController(dialogController);
            return this.awaitTransition(function () { return _this.setAsInactive(); }, dialogController.settings.ignoreTransitions)
                .then(function () { _this.detach(dialogController); });
        };
        DialogRenderer.dialogControllers = [];
        DialogRenderer = DialogRenderer_1 = __decorate([
            aurelia_dependency_injection_1.transient()
        ], DialogRenderer);
        return DialogRenderer;
        var DialogRenderer_1;
    }());
    exports.DialogRenderer = DialogRenderer;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/ux-dialog',["require", "exports", "aurelia-templating"], function (require, exports, aurelia_templating_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxDialog = /** @class */ (function () {
        function UxDialog() {
        }
        UxDialog = __decorate([
            aurelia_templating_1.customElement('ux-dialog'),
            aurelia_templating_1.inlineView("\n  <template>\n    <slot></slot>\n  </template>\n")
        ], UxDialog);
        return UxDialog;
    }());
    exports.UxDialog = UxDialog;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/ux-dialog-header',["require", "exports", "aurelia-templating", "./dialog-controller"], function (require, exports, aurelia_templating_1, dialog_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxDialogHeader = /** @class */ (function () {
        function UxDialogHeader(controller) {
            this.controller = controller;
        }
        UxDialogHeader.prototype.bind = function () {
            if (typeof this.showCloseButton !== 'boolean') {
                this.showCloseButton = !this.controller.settings.lock;
            }
        };
        /**
         * @internal
         */
        // tslint:disable-next-line:member-ordering
        UxDialogHeader.inject = [dialog_controller_1.DialogController];
        __decorate([
            aurelia_templating_1.bindable()
        ], UxDialogHeader.prototype, "showCloseButton", void 0);
        UxDialogHeader = __decorate([
            aurelia_templating_1.customElement('ux-dialog-header'),
            aurelia_templating_1.inlineView("\n  <template>\n    <button\n      type=\"button\"\n      class=\"dialog-close\"\n      aria-label=\"Close\"\n      if.bind=\"showCloseButton\"\n      click.trigger=\"controller.cancel()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n\n    <div class=\"dialog-header-content\">\n      <slot></slot>\n    </div>\n  </template>\n")
        ], UxDialogHeader);
        return UxDialogHeader;
    }());
    exports.UxDialogHeader = UxDialogHeader;
});

define('aurelia-dialog/dialog-controller',["require", "exports", "./renderer", "./lifecycle", "./dialog-close-error", "./dialog-cancel-error"], function (require, exports, renderer_1, lifecycle_1, dialog_close_error_1, dialog_cancel_error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A controller object for a Dialog instance.
     */
    var DialogController = /** @class */ (function () {
        /**
         * Creates an instance of DialogController.
         */
        function DialogController(renderer, settings, resolve, reject) {
            this.resolve = resolve;
            this.reject = reject;
            this.settings = settings;
            this.renderer = renderer;
        }
        /**
         * @internal
         */
        DialogController.prototype.releaseResources = function (result) {
            var _this = this;
            return lifecycle_1.invokeLifecycle(this.controller.viewModel || {}, 'deactivate', result)
                .then(function () { return _this.renderer.hideDialog(_this); })
                .then(function () { _this.controller.unbind(); });
        };
        /**
         * @internal
         */
        DialogController.prototype.cancelOperation = function () {
            if (!this.settings.rejectOnCancel) {
                return { wasCancelled: true };
            }
            throw dialog_cancel_error_1.createDialogCancelError();
        };
        /**
         * Closes the dialog with a successful output.
         * @param output The returned success output.
         */
        DialogController.prototype.ok = function (output) {
            return this.close(true, output);
        };
        /**
         * Closes the dialog with a cancel output.
         * @param output The returned cancel output.
         */
        DialogController.prototype.cancel = function (output) {
            return this.close(false, output);
        };
        /**
         * Closes the dialog with an error output.
         * @param output A reason for closing with an error.
         * @returns Promise An empty promise object.
         */
        DialogController.prototype.error = function (output) {
            var _this = this;
            var closeError = dialog_close_error_1.createDialogCloseError(output);
            return this.releaseResources(closeError).then(function () { _this.reject(closeError); });
        };
        /**
         * Closes the dialog.
         * @param ok Whether or not the user input signified success.
         * @param output The specified output.
         * @returns Promise An empty promise object.
         */
        DialogController.prototype.close = function (ok, output) {
            var _this = this;
            if (this.closePromise) {
                return this.closePromise;
            }
            var dialogResult = { wasCancelled: !ok, output: output };
            return this.closePromise = lifecycle_1.invokeLifecycle(this.controller.viewModel || {}, 'canDeactivate', dialogResult)
                .catch(function (reason) {
                _this.closePromise = undefined;
                return Promise.reject(reason);
            }).then(function (canDeactivate) {
                if (!canDeactivate) {
                    _this.closePromise = undefined; // we are done, do not block consecutive calls
                    return _this.cancelOperation();
                }
                return _this.releaseResources(dialogResult).then(function () {
                    if (!_this.settings.rejectOnCancel || ok) {
                        _this.resolve(dialogResult);
                    }
                    else {
                        _this.reject(dialog_cancel_error_1.createDialogCancelError(output));
                    }
                    return { wasCancelled: false };
                }).catch(function (reason) {
                    _this.closePromise = undefined;
                    return Promise.reject(reason);
                });
            });
        };
        /**
         * @internal
         */
        // tslint:disable-next-line:member-ordering
        DialogController.inject = [renderer_1.Renderer];
        return DialogController;
    }());
    exports.DialogController = DialogController;
});

define('aurelia-dialog/lifecycle',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Call a lifecycle method on a viewModel if it exists.
     * @function
     * @param instance The viewModel instance.
     * @param name The lifecycle method name.
     * @param model The model to pass to the lifecycle method.
     * @returns Promise The result of the lifecycle method.
     */
    function invokeLifecycle(instance, name, model) {
        if (typeof instance[name] === 'function') {
            return new Promise(function (resolve) {
                resolve(instance[name](model));
            }).then(function (result) {
                if (result !== null && result !== undefined) {
                    return result;
                }
                return true;
            });
        }
        return Promise.resolve(true);
    }
    exports.invokeLifecycle = invokeLifecycle;
});

define('aurelia-dialog/dialog-close-error',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @internal
     */
    function createDialogCloseError(output) {
        var error = new Error();
        error.wasCancelled = false;
        error.output = output;
        return error;
    }
    exports.createDialogCloseError = createDialogCloseError;
});

define('aurelia-dialog/dialog-cancel-error',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @internal
     */
    function createDialogCancelError(output) {
        var error = new Error('Operation cancelled.');
        error.wasCancelled = true;
        error.output = output;
        return error;
    }
    exports.createDialogCancelError = createDialogCancelError;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/ux-dialog-body',["require", "exports", "aurelia-templating"], function (require, exports, aurelia_templating_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxDialogBody = /** @class */ (function () {
        function UxDialogBody() {
        }
        UxDialogBody = __decorate([
            aurelia_templating_1.customElement('ux-dialog-body'),
            aurelia_templating_1.inlineView("\n  <template>\n    <slot></slot>\n  </template>\n")
        ], UxDialogBody);
        return UxDialogBody;
    }());
    exports.UxDialogBody = UxDialogBody;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/ux-dialog-footer',["require", "exports", "aurelia-templating", "./dialog-controller"], function (require, exports, aurelia_templating_1, dialog_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * View-model for footer of Dialog.
     */
    var UxDialogFooter = /** @class */ (function () {
        function UxDialogFooter(controller) {
            this.controller = controller;
            this.buttons = [];
            this.useDefaultButtons = false;
        }
        UxDialogFooter_1 = UxDialogFooter;
        UxDialogFooter.isCancelButton = function (value) {
            return value === 'Cancel';
        };
        UxDialogFooter.prototype.close = function (buttonValue) {
            if (UxDialogFooter_1.isCancelButton(buttonValue)) {
                this.controller.cancel(buttonValue);
            }
            else {
                this.controller.ok(buttonValue);
            }
        };
        UxDialogFooter.prototype.useDefaultButtonsChanged = function (newValue) {
            if (newValue) {
                this.buttons = ['Cancel', 'Ok'];
            }
        };
        /**
         * @internal
         */
        // tslint:disable-next-line:member-ordering
        UxDialogFooter.inject = [dialog_controller_1.DialogController];
        __decorate([
            aurelia_templating_1.bindable
        ], UxDialogFooter.prototype, "buttons", void 0);
        __decorate([
            aurelia_templating_1.bindable
        ], UxDialogFooter.prototype, "useDefaultButtons", void 0);
        UxDialogFooter = UxDialogFooter_1 = __decorate([
            aurelia_templating_1.customElement('ux-dialog-footer'),
            aurelia_templating_1.inlineView("\n  <template>\n    <slot></slot>\n    <template if.bind=\"buttons.length > 0\">\n      <button type=\"button\"\n        class=\"btn btn-default\"\n        repeat.for=\"button of buttons\"\n        click.trigger=\"close(button)\">\n        ${button}\n      </button>\n    </template>\n  </template>\n")
        ], UxDialogFooter);
        return UxDialogFooter;
        var UxDialogFooter_1;
    }());
    exports.UxDialogFooter = UxDialogFooter;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-dialog/attach-focus',["require", "exports", "aurelia-templating", "aurelia-pal"], function (require, exports, aurelia_templating_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AttachFocus = /** @class */ (function () {
        function AttachFocus(element) {
            this.element = element;
            this.value = true;
        }
        AttachFocus.prototype.attached = function () {
            if (this.value && this.value !== 'false') {
                this.element.focus();
            }
        };
        AttachFocus.prototype.valueChanged = function (newValue) {
            this.value = newValue;
        };
        /**
         * @internal
         */
        // tslint:disable-next-line:member-ordering
        AttachFocus.inject = [aurelia_pal_1.DOM.Element];
        AttachFocus = __decorate([
            aurelia_templating_1.customAttribute('attach-focus')
        ], AttachFocus);
        return AttachFocus;
    }());
    exports.AttachFocus = AttachFocus;
});

define('aurelia-dialog/dialog-service',["require", "exports", "aurelia-dependency-injection", "aurelia-metadata", "aurelia-templating", "./dialog-settings", "./dialog-cancel-error", "./lifecycle", "./dialog-controller"], function (require, exports, aurelia_dependency_injection_1, aurelia_metadata_1, aurelia_templating_1, dialog_settings_1, dialog_cancel_error_1, lifecycle_1, dialog_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* tslint:enable:max-line-length */
    function whenClosed(onfulfilled, onrejected) {
        return this.then(function (r) { return r.wasCancelled ? r : r.closeResult; }).then(onfulfilled, onrejected);
    }
    function asDialogOpenPromise(promise) {
        promise.whenClosed = whenClosed;
        return promise;
    }
    /**
     * A service allowing for the creation of dialogs.
     */
    var DialogService = /** @class */ (function () {
        function DialogService(container, compositionEngine, defaultSettings) {
            /**
             * The current dialog controllers
             */
            this.controllers = [];
            /**
             * Is there an open dialog
             */
            this.hasOpenDialog = false;
            this.hasActiveDialog = false;
            this.container = container;
            this.compositionEngine = compositionEngine;
            this.defaultSettings = defaultSettings;
        }
        DialogService.prototype.validateSettings = function (settings) {
            if (!settings.viewModel && !settings.view) {
                throw new Error('Invalid Dialog Settings. You must provide "viewModel", "view" or both.');
            }
        };
        // tslint:disable-next-line:max-line-length
        DialogService.prototype.createCompositionContext = function (childContainer, host, settings) {
            return {
                container: childContainer.parent,
                childContainer: childContainer,
                bindingContext: null,
                viewResources: null,
                model: settings.model,
                view: settings.view,
                viewModel: settings.viewModel,
                viewSlot: new aurelia_templating_1.ViewSlot(host, true),
                host: host
            };
        };
        DialogService.prototype.ensureViewModel = function (compositionContext) {
            if (typeof compositionContext.viewModel === 'function') {
                var moduleId = aurelia_metadata_1.Origin.get(compositionContext.viewModel).moduleId;
                if (!moduleId) {
                    return Promise.reject(new Error("Can not resolve \"moduleId\" of \"" + compositionContext.viewModel.name + "\"."));
                }
                compositionContext.viewModel = moduleId;
            }
            if (typeof compositionContext.viewModel === 'string') {
                return this.compositionEngine.ensureViewModel(compositionContext);
            }
            return Promise.resolve(compositionContext);
        };
        DialogService.prototype._cancelOperation = function (rejectOnCancel) {
            if (!rejectOnCancel) {
                return { wasCancelled: true };
            }
            throw dialog_cancel_error_1.createDialogCancelError();
        };
        // tslint:disable-next-line:max-line-length
        DialogService.prototype.composeAndShowDialog = function (compositionContext, dialogController) {
            var _this = this;
            if (!compositionContext.viewModel) {
                // provide access to the dialog controller for view only dialogs
                compositionContext.bindingContext = { controller: dialogController };
            }
            return this.compositionEngine.compose(compositionContext).then(function (controller) {
                dialogController.controller = controller;
                return dialogController.renderer.showDialog(dialogController).then(function () {
                    _this.controllers.push(dialogController);
                    _this.hasActiveDialog = _this.hasOpenDialog = !!_this.controllers.length;
                }, function (reason) {
                    if (controller.viewModel) {
                        lifecycle_1.invokeLifecycle(controller.viewModel, 'deactivate');
                    }
                    return Promise.reject(reason);
                });
            });
        };
        /**
         * @internal
         */
        DialogService.prototype.createSettings = function (settings) {
            settings = Object.assign({}, this.defaultSettings, settings);
            if (typeof settings.keyboard !== 'boolean' && !settings.keyboard) {
                settings.keyboard = !settings.lock;
            }
            if (typeof settings.overlayDismiss !== 'boolean') {
                settings.overlayDismiss = !settings.lock;
            }
            Object.defineProperty(settings, 'rejectOnCancel', {
                writable: false,
                configurable: true,
                enumerable: true
            });
            this.validateSettings(settings);
            return settings;
        };
        DialogService.prototype.open = function (settings) {
            var _this = this;
            if (settings === void 0) { settings = {}; }
            // tslint:enable:max-line-length
            settings = this.createSettings(settings);
            var childContainer = settings.childContainer || this.container.createChild();
            var resolveCloseResult;
            var rejectCloseResult;
            var closeResult = new Promise(function (resolve, reject) {
                resolveCloseResult = resolve;
                rejectCloseResult = reject;
            });
            var dialogController = childContainer.invoke(dialog_controller_1.DialogController, [settings, resolveCloseResult, rejectCloseResult]);
            childContainer.registerInstance(dialog_controller_1.DialogController, dialogController);
            closeResult.then(function () {
                removeController(_this, dialogController);
            }, function () {
                removeController(_this, dialogController);
            });
            var compositionContext = this.createCompositionContext(childContainer, dialogController.renderer.getDialogContainer(), dialogController.settings);
            var openResult = this.ensureViewModel(compositionContext).then(function (compositionContext) {
                if (!compositionContext.viewModel) {
                    return true;
                }
                return lifecycle_1.invokeLifecycle(compositionContext.viewModel, 'canActivate', dialogController.settings.model);
            }).then(function (canActivate) {
                if (!canActivate) {
                    return _this._cancelOperation(dialogController.settings.rejectOnCancel);
                }
                // if activation granted, compose and show
                return _this.composeAndShowDialog(compositionContext, dialogController)
                    .then(function () { return ({ controller: dialogController, closeResult: closeResult, wasCancelled: false }); });
            });
            return asDialogOpenPromise(openResult);
        };
        /**
         * Closes all open dialogs at the time of invocation.
         * @return Promise<DialogController[]> All controllers whose close operation was cancelled.
         */
        DialogService.prototype.closeAll = function () {
            return Promise.all(this.controllers.slice(0).map(function (controller) {
                if (!controller.settings.rejectOnCancel) {
                    return controller.cancel().then(function (result) {
                        if (result.wasCancelled) {
                            return controller;
                        }
                        return null;
                    });
                }
                return controller.cancel().then(function () { return null; }).catch(function (reason) {
                    if (reason.wasCancelled) {
                        return controller;
                    }
                    throw reason;
                });
            })).then(function (unclosedControllers) { return unclosedControllers.filter(function (unclosed) { return !!unclosed; }); });
        };
        /**
         * @internal
         */
        // tslint:disable-next-line:member-ordering
        DialogService.inject = [aurelia_dependency_injection_1.Container, aurelia_templating_1.CompositionEngine, dialog_settings_1.DefaultDialogSettings];
        return DialogService;
    }());
    exports.DialogService = DialogService;
    function removeController(service, dialogController) {
        var i = service.controllers.indexOf(dialogController);
        if (i !== -1) {
            service.controllers.splice(i, 1);
            service.hasActiveDialog = service.hasOpenDialog = !!service.controllers.length;
        }
    }
});

define('jwt-decode/base64_url_decode',['require','exports','module','./atob'],function (require, exports, module) {var atob = require('./atob');

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};

});

define('jwt-decode/atob',['require','exports','module'],function (require, exports, module) {/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;

});

define('aurelia-templating-resources/compose',['exports', 'aurelia-dependency-injection', 'aurelia-logging', 'aurelia-task-queue', 'aurelia-templating', 'aurelia-pal'], function (exports, _aureliaDependencyInjection, _aureliaLogging, _aureliaTaskQueue, _aureliaTemplating, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Compose = undefined;

  var LogManager = _interopRequireWildcard(_aureliaLogging);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var logger = LogManager.getLogger('templating-resources');

  var Compose = exports.Compose = (_dec = (0, _aureliaTemplating.customElement)('compose'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaTaskQueue.TaskQueue), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = (_class2 = function () {
    function Compose(element, container, compositionEngine, viewSlot, viewResources, taskQueue) {
      

      _initDefineProp(this, 'model', _descriptor, this);

      _initDefineProp(this, 'view', _descriptor2, this);

      _initDefineProp(this, 'viewModel', _descriptor3, this);

      _initDefineProp(this, 'swapOrder', _descriptor4, this);

      this.element = element;
      this.container = container;
      this.compositionEngine = compositionEngine;
      this.viewSlot = viewSlot;
      this.viewResources = viewResources;
      this.taskQueue = taskQueue;
      this.currentController = null;
      this.currentViewModel = null;
      this.changes = Object.create(null);
    }

    Compose.prototype.created = function created(owningView) {
      this.owningView = owningView;
    };

    Compose.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
      this.changes.view = this.view;
      this.changes.viewModel = this.viewModel;
      this.changes.model = this.model;
      processChanges(this);
    };

    Compose.prototype.unbind = function unbind() {
      this.changes = Object.create(null);
      this.pendingTask = null;
      this.bindingContext = null;
      this.overrideContext = null;
      var returnToCache = true;
      var skipAnimation = true;
      this.viewSlot.removeAll(returnToCache, skipAnimation);
    };

    Compose.prototype.modelChanged = function modelChanged(newValue, oldValue) {
      this.changes.model = newValue;
      requestUpdate(this);
    };

    Compose.prototype.viewChanged = function viewChanged(newValue, oldValue) {
      this.changes.view = newValue;
      requestUpdate(this);
    };

    Compose.prototype.viewModelChanged = function viewModelChanged(newValue, oldValue) {
      this.changes.viewModel = newValue;
      requestUpdate(this);
    };

    return Compose;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'model', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'view', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'viewModel', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'swapOrder', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);


  function isEmpty(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }

  function tryActivateViewModel(vm, model) {
    if (vm && typeof vm.activate === 'function') {
      return Promise.resolve(vm.activate(model));
    }
  }

  function createInstruction(composer, instruction) {
    return Object.assign(instruction, {
      bindingContext: composer.bindingContext,
      overrideContext: composer.overrideContext,
      owningView: composer.owningView,
      container: composer.container,
      viewSlot: composer.viewSlot,
      viewResources: composer.viewResources,
      currentController: composer.currentController,
      host: composer.element,
      swapOrder: composer.swapOrder
    });
  }

  function processChanges(composer) {
    var changes = composer.changes;
    composer.changes = Object.create(null);

    if (!('view' in changes) && !('viewModel' in changes) && 'model' in changes) {
      composer.pendingTask = tryActivateViewModel(composer.currentViewModel, changes.model);
      if (!composer.pendingTask) {
        return;
      }
    } else {
      var instruction = {
        view: composer.view,
        viewModel: composer.currentViewModel || composer.viewModel,
        model: composer.model
      };

      instruction = Object.assign(instruction, changes);

      instruction = createInstruction(composer, instruction);
      composer.pendingTask = composer.compositionEngine.compose(instruction).then(function (controller) {
        composer.currentController = controller;
        composer.currentViewModel = controller ? controller.viewModel : null;
      });
    }

    composer.pendingTask = composer.pendingTask.catch(function (e) {
      logger.error(e);
    }).then(function () {
      if (!composer.pendingTask) {
        return;
      }

      composer.pendingTask = null;
      if (!isEmpty(composer.changes)) {
        processChanges(composer);
      }
    });
  }

  function requestUpdate(composer) {
    if (composer.pendingTask || composer.updateRequested) {
      return;
    }
    composer.updateRequested = true;
    composer.taskQueue.queueMicroTask(function () {
      composer.updateRequested = false;
      processChanges(composer);
    });
  }
});
define('aurelia-templating-resources/if',['exports', 'aurelia-templating', 'aurelia-dependency-injection', './if-core'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _ifCore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.If = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var If = exports.If = (_dec = (0, _aureliaTemplating.customAttribute)('if'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec3 = (0, _aureliaTemplating.bindable)({ primaryProperty: true }), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = (_class2 = function (_IfCore) {
    _inherits(If, _IfCore);

    function If() {
      var _temp, _this, _ret;

      

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _IfCore.call.apply(_IfCore, [this].concat(args))), _this), _initDefineProp(_this, 'condition', _descriptor, _this), _initDefineProp(_this, 'swapOrder', _descriptor2, _this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    If.prototype.bind = function bind(bindingContext, overrideContext) {
      _IfCore.prototype.bind.call(this, bindingContext, overrideContext);
      if (this.condition) {
        this._show();
      }
    };

    If.prototype.conditionChanged = function conditionChanged(newValue) {
      this._update(newValue);
    };

    If.prototype._update = function _update(show) {
      var _this2 = this;

      if (this.animating) {
        return;
      }

      var promise = void 0;
      if (this.elseVm) {
        promise = show ? this._swap(this.elseVm, this) : this._swap(this, this.elseVm);
      } else {
        promise = show ? this._show() : this._hide();
      }

      if (promise) {
        this.animating = true;
        promise.then(function () {
          _this2.animating = false;
          if (_this2.condition !== _this2.showing) {
            _this2._update(_this2.condition);
          }
        });
      }
    };

    If.prototype._swap = function _swap(remove, add) {
      switch (this.swapOrder) {
        case 'before':
          return Promise.resolve(add._show()).then(function () {
            return remove._hide();
          });
        case 'with':
          return Promise.all([remove._hide(), add._show()]);
        default:
          var promise = remove._hide();
          return promise ? promise.then(function () {
            return add._show();
          }) : add._show();
      }
    };

    return If;
  }(_ifCore.IfCore), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'condition', [_dec3], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'swapOrder', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);
});
define('aurelia-templating-resources/if-core',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var IfCore = exports.IfCore = function () {
    function IfCore(viewFactory, viewSlot) {
      

      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.view = null;
      this.bindingContext = null;
      this.overrideContext = null;

      this.showing = false;
    }

    IfCore.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
    };

    IfCore.prototype.unbind = function unbind() {
      if (this.view === null) {
        return;
      }

      this.view.unbind();

      if (!this.viewFactory.isCaching) {
        this.showing = false;
        return;
      }

      if (this.showing) {
        this.showing = false;
        this.viewSlot.remove(this.view, true, true);
      } else {
        this.view.returnToCache();
      }

      this.view = null;
    };

    IfCore.prototype._show = function _show() {
      if (this.showing) {
        return;
      }

      if (this.view === null) {
        this.view = this.viewFactory.create();
      }

      if (!this.view.isBound) {
        this.view.bind(this.bindingContext, this.overrideContext);
      }

      this.showing = true;
      return this.viewSlot.add(this.view);
    };

    IfCore.prototype._hide = function _hide() {
      var _this = this;

      if (!this.showing) {
        return;
      }

      this.showing = false;
      var removed = this.viewSlot.remove(this.view);

      if (removed instanceof Promise) {
        return removed.then(function () {
          return _this.view.unbind();
        });
      }

      this.view.unbind();
    };

    return IfCore;
  }();
});
define('aurelia-templating-resources/else',['exports', 'aurelia-templating', 'aurelia-dependency-injection', './if-core'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _ifCore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Else = undefined;

  

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _dec, _dec2, _class;

  var Else = exports.Else = (_dec = (0, _aureliaTemplating.customAttribute)('else'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = function (_IfCore) {
    _inherits(Else, _IfCore);

    function Else(viewFactory, viewSlot) {
      

      var _this = _possibleConstructorReturn(this, _IfCore.call(this, viewFactory, viewSlot));

      _this._registerInIf();
      return _this;
    }

    Else.prototype.bind = function bind(bindingContext, overrideContext) {
      _IfCore.prototype.bind.call(this, bindingContext, overrideContext);

      if (!this.ifVm.condition) {
        this._show();
      }
    };

    Else.prototype._registerInIf = function _registerInIf() {
      var previous = this.viewSlot.anchor.previousSibling;
      while (previous && !previous.au) {
        previous = previous.previousSibling;
      }
      if (!previous || !previous.au.if) {
        throw new Error("Can't find matching If for Else custom attribute.");
      }
      this.ifVm = previous.au.if.viewModel;
      this.ifVm.elseVm = this;
    };

    return Else;
  }(_ifCore.IfCore)) || _class) || _class) || _class);
});
define('aurelia-templating-resources/with',['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-binding'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.With = undefined;

  

  var _dec, _dec2, _class;

  var With = exports.With = (_dec = (0, _aureliaTemplating.customAttribute)('with'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = function () {
    function With(viewFactory, viewSlot) {
      

      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.parentOverrideContext = null;
      this.view = null;
    }

    With.prototype.bind = function bind(bindingContext, overrideContext) {
      this.parentOverrideContext = overrideContext;
      this.valueChanged(this.value);
    };

    With.prototype.valueChanged = function valueChanged(newValue) {
      var overrideContext = (0, _aureliaBinding.createOverrideContext)(newValue, this.parentOverrideContext);
      if (!this.view) {
        this.view = this.viewFactory.create();
        this.view.bind(newValue, overrideContext);
        this.viewSlot.add(this.view);
      } else {
        this.view.bind(newValue, overrideContext);
      }
    };

    With.prototype.unbind = function unbind() {
      this.parentOverrideContext = null;

      if (this.view) {
        this.view.unbind();
      }
    };

    return With;
  }()) || _class) || _class) || _class);
});
define('aurelia-templating-resources/repeat',['exports', 'aurelia-dependency-injection', 'aurelia-binding', 'aurelia-templating', './repeat-strategy-locator', './repeat-utilities', './analyze-view-factory', './abstract-repeater'], function (exports, _aureliaDependencyInjection, _aureliaBinding, _aureliaTemplating, _repeatStrategyLocator, _repeatUtilities, _analyzeViewFactory, _abstractRepeater) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Repeat = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var Repeat = exports.Repeat = (_dec = (0, _aureliaTemplating.customAttribute)('repeat'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.TargetInstruction, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaBinding.ObserverLocator, _repeatStrategyLocator.RepeatStrategyLocator), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = (_class2 = function (_AbstractRepeater) {
    _inherits(Repeat, _AbstractRepeater);

    function Repeat(viewFactory, instruction, viewSlot, viewResources, observerLocator, strategyLocator) {
      

      var _this = _possibleConstructorReturn(this, _AbstractRepeater.call(this, {
        local: 'item',
        viewsRequireLifecycle: (0, _analyzeViewFactory.viewsRequireLifecycle)(viewFactory)
      }));

      _initDefineProp(_this, 'items', _descriptor, _this);

      _initDefineProp(_this, 'local', _descriptor2, _this);

      _initDefineProp(_this, 'key', _descriptor3, _this);

      _initDefineProp(_this, 'value', _descriptor4, _this);

      _this.viewFactory = viewFactory;
      _this.instruction = instruction;
      _this.viewSlot = viewSlot;
      _this.lookupFunctions = viewResources.lookupFunctions;
      _this.observerLocator = observerLocator;
      _this.key = 'key';
      _this.value = 'value';
      _this.strategyLocator = strategyLocator;
      _this.ignoreMutation = false;
      _this.sourceExpression = (0, _repeatUtilities.getItemsSourceExpression)(_this.instruction, 'repeat.for');
      _this.isOneTime = (0, _repeatUtilities.isOneTime)(_this.sourceExpression);
      _this.viewsRequireLifecycle = (0, _analyzeViewFactory.viewsRequireLifecycle)(viewFactory);
      return _this;
    }

    Repeat.prototype.call = function call(context, changes) {
      this[context](this.items, changes);
    };

    Repeat.prototype.bind = function bind(bindingContext, overrideContext) {
      this.scope = { bindingContext: bindingContext, overrideContext: overrideContext };
      this.matcherBinding = this._captureAndRemoveMatcherBinding();
      this.itemsChanged();
    };

    Repeat.prototype.unbind = function unbind() {
      this.scope = null;
      this.items = null;
      this.matcherBinding = null;
      this.viewSlot.removeAll(true, true);
      this._unsubscribeCollection();
    };

    Repeat.prototype._unsubscribeCollection = function _unsubscribeCollection() {
      if (this.collectionObserver) {
        this.collectionObserver.unsubscribe(this.callContext, this);
        this.collectionObserver = null;
        this.callContext = null;
      }
    };

    Repeat.prototype.itemsChanged = function itemsChanged() {
      this._unsubscribeCollection();

      if (!this.scope) {
        return;
      }

      var items = this.items;
      this.strategy = this.strategyLocator.getStrategy(items);
      if (!this.strategy) {
        throw new Error('Value for \'' + this.sourceExpression + '\' is non-repeatable');
      }

      if (!this.isOneTime && !this._observeInnerCollection()) {
        this._observeCollection();
      }
      this.strategy.instanceChanged(this, items);
    };

    Repeat.prototype._getInnerCollection = function _getInnerCollection() {
      var expression = (0, _repeatUtilities.unwrapExpression)(this.sourceExpression);
      if (!expression) {
        return null;
      }
      return expression.evaluate(this.scope, null);
    };

    Repeat.prototype.handleCollectionMutated = function handleCollectionMutated(collection, changes) {
      if (!this.collectionObserver) {
        return;
      }
      this.strategy.instanceMutated(this, collection, changes);
    };

    Repeat.prototype.handleInnerCollectionMutated = function handleInnerCollectionMutated(collection, changes) {
      var _this2 = this;

      if (!this.collectionObserver) {
        return;
      }

      if (this.ignoreMutation) {
        return;
      }
      this.ignoreMutation = true;
      var newItems = this.sourceExpression.evaluate(this.scope, this.lookupFunctions);
      this.observerLocator.taskQueue.queueMicroTask(function () {
        return _this2.ignoreMutation = false;
      });

      if (newItems === this.items) {
        this.itemsChanged();
      } else {
        this.items = newItems;
      }
    };

    Repeat.prototype._observeInnerCollection = function _observeInnerCollection() {
      var items = this._getInnerCollection();
      var strategy = this.strategyLocator.getStrategy(items);
      if (!strategy) {
        return false;
      }
      this.collectionObserver = strategy.getCollectionObserver(this.observerLocator, items);
      if (!this.collectionObserver) {
        return false;
      }
      this.callContext = 'handleInnerCollectionMutated';
      this.collectionObserver.subscribe(this.callContext, this);
      return true;
    };

    Repeat.prototype._observeCollection = function _observeCollection() {
      var items = this.items;
      this.collectionObserver = this.strategy.getCollectionObserver(this.observerLocator, items);
      if (this.collectionObserver) {
        this.callContext = 'handleCollectionMutated';
        this.collectionObserver.subscribe(this.callContext, this);
      }
    };

    Repeat.prototype._captureAndRemoveMatcherBinding = function _captureAndRemoveMatcherBinding() {
      if (this.viewFactory.viewFactory) {
        var instructions = this.viewFactory.viewFactory.instructions;
        var instructionIds = Object.keys(instructions);
        for (var i = 0; i < instructionIds.length; i++) {
          var expressions = instructions[instructionIds[i]].expressions;
          if (expressions) {
            for (var ii = 0; i < expressions.length; i++) {
              if (expressions[ii].targetProperty === 'matcher') {
                var matcherBinding = expressions[ii];
                expressions.splice(ii, 1);
                return matcherBinding;
              }
            }
          }
        }
      }

      return undefined;
    };

    Repeat.prototype.viewCount = function viewCount() {
      return this.viewSlot.children.length;
    };

    Repeat.prototype.views = function views() {
      return this.viewSlot.children;
    };

    Repeat.prototype.view = function view(index) {
      return this.viewSlot.children[index];
    };

    Repeat.prototype.matcher = function matcher() {
      return this.matcherBinding ? this.matcherBinding.sourceExpression.evaluate(this.scope, this.matcherBinding.lookupFunctions) : null;
    };

    Repeat.prototype.addView = function addView(bindingContext, overrideContext) {
      var view = this.viewFactory.create();
      view.bind(bindingContext, overrideContext);
      this.viewSlot.add(view);
    };

    Repeat.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
      var view = this.viewFactory.create();
      view.bind(bindingContext, overrideContext);
      this.viewSlot.insert(index, view);
    };

    Repeat.prototype.moveView = function moveView(sourceIndex, targetIndex) {
      this.viewSlot.move(sourceIndex, targetIndex);
    };

    Repeat.prototype.removeAllViews = function removeAllViews(returnToCache, skipAnimation) {
      return this.viewSlot.removeAll(returnToCache, skipAnimation);
    };

    Repeat.prototype.removeViews = function removeViews(viewsToRemove, returnToCache, skipAnimation) {
      return this.viewSlot.removeMany(viewsToRemove, returnToCache, skipAnimation);
    };

    Repeat.prototype.removeView = function removeView(index, returnToCache, skipAnimation) {
      return this.viewSlot.removeAt(index, returnToCache, skipAnimation);
    };

    Repeat.prototype.updateBindings = function updateBindings(view) {
      var j = view.bindings.length;
      while (j--) {
        (0, _repeatUtilities.updateOneTimeBinding)(view.bindings[j]);
      }
      j = view.controllers.length;
      while (j--) {
        var k = view.controllers[j].boundProperties.length;
        while (k--) {
          var binding = view.controllers[j].boundProperties[k].binding;
          (0, _repeatUtilities.updateOneTimeBinding)(binding);
        }
      }
    };

    return Repeat;
  }(_abstractRepeater.AbstractRepeater), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'items', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'local', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'key', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);
});
define('aurelia-templating-resources/repeat-strategy-locator',['exports', './null-repeat-strategy', './array-repeat-strategy', './map-repeat-strategy', './set-repeat-strategy', './number-repeat-strategy'], function (exports, _nullRepeatStrategy, _arrayRepeatStrategy, _mapRepeatStrategy, _setRepeatStrategy, _numberRepeatStrategy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RepeatStrategyLocator = undefined;

  

  var RepeatStrategyLocator = exports.RepeatStrategyLocator = function () {
    function RepeatStrategyLocator() {
      

      this.matchers = [];
      this.strategies = [];

      this.addStrategy(function (items) {
        return items === null || items === undefined;
      }, new _nullRepeatStrategy.NullRepeatStrategy());
      this.addStrategy(function (items) {
        return items instanceof Array;
      }, new _arrayRepeatStrategy.ArrayRepeatStrategy());
      this.addStrategy(function (items) {
        return items instanceof Map;
      }, new _mapRepeatStrategy.MapRepeatStrategy());
      this.addStrategy(function (items) {
        return items instanceof Set;
      }, new _setRepeatStrategy.SetRepeatStrategy());
      this.addStrategy(function (items) {
        return typeof items === 'number';
      }, new _numberRepeatStrategy.NumberRepeatStrategy());
    }

    RepeatStrategyLocator.prototype.addStrategy = function addStrategy(matcher, strategy) {
      this.matchers.push(matcher);
      this.strategies.push(strategy);
    };

    RepeatStrategyLocator.prototype.getStrategy = function getStrategy(items) {
      var matchers = this.matchers;

      for (var i = 0, ii = matchers.length; i < ii; ++i) {
        if (matchers[i](items)) {
          return this.strategies[i];
        }
      }

      return null;
    };

    return RepeatStrategyLocator;
  }();
});
define('aurelia-templating-resources/null-repeat-strategy',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var NullRepeatStrategy = exports.NullRepeatStrategy = function () {
    function NullRepeatStrategy() {
      
    }

    NullRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      repeat.removeAllViews(true);
    };

    NullRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {};

    return NullRepeatStrategy;
  }();
});
define('aurelia-templating-resources/array-repeat-strategy',['exports', './repeat-utilities', 'aurelia-binding'], function (exports, _repeatUtilities, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ArrayRepeatStrategy = undefined;

  

  var ArrayRepeatStrategy = exports.ArrayRepeatStrategy = function () {
    function ArrayRepeatStrategy() {
      
    }

    ArrayRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getArrayObserver(items);
    };

    ArrayRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;

      var itemsLength = items.length;

      if (!items || itemsLength === 0) {
        repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
        return;
      }

      var children = repeat.views();
      var viewsLength = children.length;

      if (viewsLength === 0) {
        this._standardProcessInstanceChanged(repeat, items);
        return;
      }

      if (repeat.viewsRequireLifecycle) {
        var childrenSnapshot = children.slice(0);
        var itemNameInBindingContext = repeat.local;
        var matcher = repeat.matcher();

        var itemsPreviouslyInViews = [];
        var viewsToRemove = [];

        for (var index = 0; index < viewsLength; index++) {
          var view = childrenSnapshot[index];
          var oldItem = view.bindingContext[itemNameInBindingContext];

          if ((0, _repeatUtilities.indexOf)(items, oldItem, matcher) === -1) {
            viewsToRemove.push(view);
          } else {
            itemsPreviouslyInViews.push(oldItem);
          }
        }

        var updateViews = void 0;
        var removePromise = void 0;

        if (itemsPreviouslyInViews.length > 0) {
          removePromise = repeat.removeViews(viewsToRemove, true, !repeat.viewsRequireLifecycle);
          updateViews = function updateViews() {
            for (var _index = 0; _index < itemsLength; _index++) {
              var item = items[_index];
              var indexOfView = (0, _repeatUtilities.indexOf)(itemsPreviouslyInViews, item, matcher, _index);
              var _view = void 0;

              if (indexOfView === -1) {
                var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[_index], _index, itemsLength);
                repeat.insertView(_index, overrideContext.bindingContext, overrideContext);

                itemsPreviouslyInViews.splice(_index, 0, undefined);
              } else if (indexOfView === _index) {
                _view = children[indexOfView];
                itemsPreviouslyInViews[indexOfView] = undefined;
              } else {
                _view = children[indexOfView];
                repeat.moveView(indexOfView, _index);
                itemsPreviouslyInViews.splice(indexOfView, 1);
                itemsPreviouslyInViews.splice(_index, 0, undefined);
              }

              if (_view) {
                (0, _repeatUtilities.updateOverrideContext)(_view.overrideContext, _index, itemsLength);
              }
            }

            _this._inPlaceProcessItems(repeat, items);
          };
        } else {
          removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
          updateViews = function updateViews() {
            return _this._standardProcessInstanceChanged(repeat, items);
          };
        }

        if (removePromise instanceof Promise) {
          removePromise.then(updateViews);
        } else {
          updateViews();
        }
      } else {
        this._inPlaceProcessItems(repeat, items);
      }
    };

    ArrayRepeatStrategy.prototype._standardProcessInstanceChanged = function _standardProcessInstanceChanged(repeat, items) {
      for (var i = 0, ii = items.length; i < ii; i++) {
        var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[i], i, ii);
        repeat.addView(overrideContext.bindingContext, overrideContext);
      }
    };

    ArrayRepeatStrategy.prototype._inPlaceProcessItems = function _inPlaceProcessItems(repeat, items) {
      var itemsLength = items.length;
      var viewsLength = repeat.viewCount();

      while (viewsLength > itemsLength) {
        viewsLength--;
        repeat.removeView(viewsLength, true, !repeat.viewsRequireLifecycle);
      }

      var local = repeat.local;

      for (var i = 0; i < viewsLength; i++) {
        var view = repeat.view(i);
        var last = i === itemsLength - 1;
        var middle = i !== 0 && !last;

        if (view.bindingContext[local] === items[i] && view.overrideContext.$middle === middle && view.overrideContext.$last === last) {
          continue;
        }

        view.bindingContext[local] = items[i];
        view.overrideContext.$middle = middle;
        view.overrideContext.$last = last;
        repeat.updateBindings(view);
      }

      for (var _i = viewsLength; _i < itemsLength; _i++) {
        var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[_i], _i, itemsLength);
        repeat.addView(overrideContext.bindingContext, overrideContext);
      }
    };

    ArrayRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, array, splices) {
      var _this2 = this;

      if (repeat.__queuedSplices) {
        for (var i = 0, ii = splices.length; i < ii; ++i) {
          var _splices$i = splices[i],
              index = _splices$i.index,
              removed = _splices$i.removed,
              addedCount = _splices$i.addedCount;

          (0, _aureliaBinding.mergeSplice)(repeat.__queuedSplices, index, removed, addedCount);
        }

        repeat.__array = array.slice(0);
        return;
      }

      var maybePromise = this._runSplices(repeat, array.slice(0), splices);
      if (maybePromise instanceof Promise) {
        var queuedSplices = repeat.__queuedSplices = [];

        var runQueuedSplices = function runQueuedSplices() {
          if (!queuedSplices.length) {
            repeat.__queuedSplices = undefined;
            repeat.__array = undefined;
            return;
          }

          var nextPromise = _this2._runSplices(repeat, repeat.__array, queuedSplices) || Promise.resolve();
          queuedSplices = repeat.__queuedSplices = [];
          nextPromise.then(runQueuedSplices);
        };

        maybePromise.then(runQueuedSplices);
      }
    };

    ArrayRepeatStrategy.prototype._runSplices = function _runSplices(repeat, array, splices) {
      var _this3 = this;

      var removeDelta = 0;
      var rmPromises = [];

      for (var i = 0, ii = splices.length; i < ii; ++i) {
        var splice = splices[i];
        var removed = splice.removed;

        for (var j = 0, jj = removed.length; j < jj; ++j) {
          var viewOrPromise = repeat.removeView(splice.index + removeDelta + rmPromises.length, true);
          if (viewOrPromise instanceof Promise) {
            rmPromises.push(viewOrPromise);
          }
        }
        removeDelta -= splice.addedCount;
      }

      if (rmPromises.length > 0) {
        return Promise.all(rmPromises).then(function () {
          var spliceIndexLow = _this3._handleAddedSplices(repeat, array, splices);
          (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), spliceIndexLow);
        });
      }

      var spliceIndexLow = this._handleAddedSplices(repeat, array, splices);
      (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), spliceIndexLow);

      return undefined;
    };

    ArrayRepeatStrategy.prototype._handleAddedSplices = function _handleAddedSplices(repeat, array, splices) {
      var spliceIndex = void 0;
      var spliceIndexLow = void 0;
      var arrayLength = array.length;
      for (var i = 0, ii = splices.length; i < ii; ++i) {
        var splice = splices[i];
        var addIndex = spliceIndex = splice.index;
        var end = splice.index + splice.addedCount;

        if (typeof spliceIndexLow === 'undefined' || spliceIndexLow === null || spliceIndexLow > splice.index) {
          spliceIndexLow = spliceIndex;
        }

        for (; addIndex < end; ++addIndex) {
          var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, array[addIndex], addIndex, arrayLength);
          repeat.insertView(addIndex, overrideContext.bindingContext, overrideContext);
        }
      }

      return spliceIndexLow;
    };

    return ArrayRepeatStrategy;
  }();
});
define('aurelia-templating-resources/repeat-utilities',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.updateOverrideContexts = updateOverrideContexts;
  exports.createFullOverrideContext = createFullOverrideContext;
  exports.updateOverrideContext = updateOverrideContext;
  exports.getItemsSourceExpression = getItemsSourceExpression;
  exports.unwrapExpression = unwrapExpression;
  exports.isOneTime = isOneTime;
  exports.updateOneTimeBinding = updateOneTimeBinding;
  exports.indexOf = indexOf;


  var oneTime = _aureliaBinding.bindingMode.oneTime;

  function updateOverrideContexts(views, startIndex) {
    var length = views.length;

    if (startIndex > 0) {
      startIndex = startIndex - 1;
    }

    for (; startIndex < length; ++startIndex) {
      updateOverrideContext(views[startIndex].overrideContext, startIndex, length);
    }
  }

  function createFullOverrideContext(repeat, data, index, length, key) {
    var bindingContext = {};
    var overrideContext = (0, _aureliaBinding.createOverrideContext)(bindingContext, repeat.scope.overrideContext);

    if (typeof key !== 'undefined') {
      bindingContext[repeat.key] = key;
      bindingContext[repeat.value] = data;
    } else {
      bindingContext[repeat.local] = data;
    }
    updateOverrideContext(overrideContext, index, length);
    return overrideContext;
  }

  function updateOverrideContext(overrideContext, index, length) {
    var first = index === 0;
    var last = index === length - 1;
    var even = index % 2 === 0;

    overrideContext.$index = index;
    overrideContext.$first = first;
    overrideContext.$last = last;
    overrideContext.$middle = !(first || last);
    overrideContext.$odd = !even;
    overrideContext.$even = even;
  }

  function getItemsSourceExpression(instruction, attrName) {
    return instruction.behaviorInstructions.filter(function (bi) {
      return bi.originalAttrName === attrName;
    })[0].attributes.items.sourceExpression;
  }

  function unwrapExpression(expression) {
    var unwrapped = false;
    while (expression instanceof _aureliaBinding.BindingBehavior) {
      expression = expression.expression;
    }
    while (expression instanceof _aureliaBinding.ValueConverter) {
      expression = expression.expression;
      unwrapped = true;
    }
    return unwrapped ? expression : null;
  }

  function isOneTime(expression) {
    while (expression instanceof _aureliaBinding.BindingBehavior) {
      if (expression.name === 'oneTime') {
        return true;
      }
      expression = expression.expression;
    }
    return false;
  }

  function updateOneTimeBinding(binding) {
    if (binding.call && binding.mode === oneTime) {
      binding.call(_aureliaBinding.sourceContext);
    } else if (binding.updateOneTimeBindings) {
      binding.updateOneTimeBindings();
    }
  }

  function indexOf(array, item, matcher, startIndex) {
    if (!matcher) {
      return array.indexOf(item);
    }
    var length = array.length;
    for (var index = startIndex || 0; index < length; index++) {
      if (matcher(array[index], item)) {
        return index;
      }
    }
    return -1;
  }
});
define('aurelia-templating-resources/map-repeat-strategy',['exports', './repeat-utilities'], function (exports, _repeatUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MapRepeatStrategy = undefined;

  

  var MapRepeatStrategy = exports.MapRepeatStrategy = function () {
    function MapRepeatStrategy() {
      
    }

    MapRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getMapObserver(items);
    };

    MapRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;

      var removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
      if (removePromise instanceof Promise) {
        removePromise.then(function () {
          return _this._standardProcessItems(repeat, items);
        });
        return;
      }
      this._standardProcessItems(repeat, items);
    };

    MapRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, items) {
      var index = 0;
      var overrideContext = void 0;

      items.forEach(function (value, key) {
        overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, value, index, items.size, key);
        repeat.addView(overrideContext.bindingContext, overrideContext);
        ++index;
      });
    };

    MapRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, map, records) {
      var key = void 0;
      var i = void 0;
      var ii = void 0;
      var overrideContext = void 0;
      var removeIndex = void 0;
      var addIndex = void 0;
      var record = void 0;
      var rmPromises = [];
      var viewOrPromise = void 0;

      for (i = 0, ii = records.length; i < ii; ++i) {
        record = records[i];
        key = record.key;
        switch (record.type) {
          case 'update':
            removeIndex = this._getViewIndexByKey(repeat, key);
            viewOrPromise = repeat.removeView(removeIndex, true, !repeat.viewsRequireLifecycle);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, map.get(key), removeIndex, map.size, key);
            repeat.insertView(removeIndex, overrideContext.bindingContext, overrideContext);
            break;
          case 'add':
            addIndex = repeat.viewCount() <= map.size - 1 ? repeat.viewCount() : map.size - 1;
            overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, map.get(key), addIndex, map.size, key);
            repeat.insertView(map.size - 1, overrideContext.bindingContext, overrideContext);
            break;
          case 'delete':
            if (record.oldValue === undefined) {
              return;
            }
            removeIndex = this._getViewIndexByKey(repeat, key);
            viewOrPromise = repeat.removeView(removeIndex, true, !repeat.viewsRequireLifecycle);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            break;
          case 'clear':
            repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
            break;
          default:
            continue;
        }
      }

      if (rmPromises.length > 0) {
        Promise.all(rmPromises).then(function () {
          (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
        });
      } else {
        (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
      }
    };

    MapRepeatStrategy.prototype._getViewIndexByKey = function _getViewIndexByKey(repeat, key) {
      var i = void 0;
      var ii = void 0;
      var child = void 0;

      for (i = 0, ii = repeat.viewCount(); i < ii; ++i) {
        child = repeat.view(i);
        if (child.bindingContext[repeat.key] === key) {
          return i;
        }
      }

      return undefined;
    };

    return MapRepeatStrategy;
  }();
});
define('aurelia-templating-resources/set-repeat-strategy',['exports', './repeat-utilities'], function (exports, _repeatUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SetRepeatStrategy = undefined;

  

  var SetRepeatStrategy = exports.SetRepeatStrategy = function () {
    function SetRepeatStrategy() {
      
    }

    SetRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getSetObserver(items);
    };

    SetRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;

      var removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
      if (removePromise instanceof Promise) {
        removePromise.then(function () {
          return _this._standardProcessItems(repeat, items);
        });
        return;
      }
      this._standardProcessItems(repeat, items);
    };

    SetRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, items) {
      var index = 0;
      var overrideContext = void 0;

      items.forEach(function (value) {
        overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, value, index, items.size);
        repeat.addView(overrideContext.bindingContext, overrideContext);
        ++index;
      });
    };

    SetRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, set, records) {
      var value = void 0;
      var i = void 0;
      var ii = void 0;
      var overrideContext = void 0;
      var removeIndex = void 0;
      var record = void 0;
      var rmPromises = [];
      var viewOrPromise = void 0;

      for (i = 0, ii = records.length; i < ii; ++i) {
        record = records[i];
        value = record.value;
        switch (record.type) {
          case 'add':
            var size = Math.max(set.size - 1, 0);
            overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, value, size, set.size);
            repeat.insertView(size, overrideContext.bindingContext, overrideContext);
            break;
          case 'delete':
            removeIndex = this._getViewIndexByValue(repeat, value);
            viewOrPromise = repeat.removeView(removeIndex, true, !repeat.viewsRequireLifecycle);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            break;
          case 'clear':
            repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
            break;
          default:
            continue;
        }
      }

      if (rmPromises.length > 0) {
        Promise.all(rmPromises).then(function () {
          (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
        });
      } else {
        (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
      }
    };

    SetRepeatStrategy.prototype._getViewIndexByValue = function _getViewIndexByValue(repeat, value) {
      var i = void 0;
      var ii = void 0;
      var child = void 0;

      for (i = 0, ii = repeat.viewCount(); i < ii; ++i) {
        child = repeat.view(i);
        if (child.bindingContext[repeat.local] === value) {
          return i;
        }
      }

      return undefined;
    };

    return SetRepeatStrategy;
  }();
});
define('aurelia-templating-resources/number-repeat-strategy',['exports', './repeat-utilities'], function (exports, _repeatUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NumberRepeatStrategy = undefined;

  

  var NumberRepeatStrategy = exports.NumberRepeatStrategy = function () {
    function NumberRepeatStrategy() {
      
    }

    NumberRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver() {
      return null;
    };

    NumberRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, value) {
      var _this = this;

      var removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
      if (removePromise instanceof Promise) {
        removePromise.then(function () {
          return _this._standardProcessItems(repeat, value);
        });
        return;
      }
      this._standardProcessItems(repeat, value);
    };

    NumberRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, value) {
      var childrenLength = repeat.viewCount();
      var i = void 0;
      var ii = void 0;
      var overrideContext = void 0;
      var viewsToRemove = void 0;

      value = Math.floor(value);
      viewsToRemove = childrenLength - value;

      if (viewsToRemove > 0) {
        if (viewsToRemove > childrenLength) {
          viewsToRemove = childrenLength;
        }

        for (i = 0, ii = viewsToRemove; i < ii; ++i) {
          repeat.removeView(childrenLength - (i + 1), true, !repeat.viewsRequireLifecycle);
        }

        return;
      }

      for (i = childrenLength, ii = value; i < ii; ++i) {
        overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, i, i, ii);
        repeat.addView(overrideContext.bindingContext, overrideContext);
      }

      (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
    };

    return NumberRepeatStrategy;
  }();
});
define('aurelia-templating-resources/analyze-view-factory',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.viewsRequireLifecycle = viewsRequireLifecycle;
  var lifecycleOptionalBehaviors = exports.lifecycleOptionalBehaviors = ['focus', 'if', 'repeat', 'show', 'with'];

  function behaviorRequiresLifecycle(instruction) {
    var t = instruction.type;
    var name = t.elementName !== null ? t.elementName : t.attributeName;
    return lifecycleOptionalBehaviors.indexOf(name) === -1 && (t.handlesAttached || t.handlesBind || t.handlesCreated || t.handlesDetached || t.handlesUnbind) || t.viewFactory && viewsRequireLifecycle(t.viewFactory) || instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
  }

  function targetRequiresLifecycle(instruction) {
    var behaviors = instruction.behaviorInstructions;
    if (behaviors) {
      var i = behaviors.length;
      while (i--) {
        if (behaviorRequiresLifecycle(behaviors[i])) {
          return true;
        }
      }
    }

    return instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
  }

  function viewsRequireLifecycle(viewFactory) {
    if ('_viewsRequireLifecycle' in viewFactory) {
      return viewFactory._viewsRequireLifecycle;
    }

    viewFactory._viewsRequireLifecycle = false;

    if (viewFactory.viewFactory) {
      viewFactory._viewsRequireLifecycle = viewsRequireLifecycle(viewFactory.viewFactory);
      return viewFactory._viewsRequireLifecycle;
    }

    if (viewFactory.template.querySelector('.au-animate')) {
      viewFactory._viewsRequireLifecycle = true;
      return true;
    }

    for (var id in viewFactory.instructions) {
      if (targetRequiresLifecycle(viewFactory.instructions[id])) {
        viewFactory._viewsRequireLifecycle = true;
        return true;
      }
    }

    viewFactory._viewsRequireLifecycle = false;
    return false;
  }
});
define('aurelia-templating-resources/abstract-repeater',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var AbstractRepeater = exports.AbstractRepeater = function () {
    function AbstractRepeater(options) {
      

      Object.assign(this, {
        local: 'items',
        viewsRequireLifecycle: true
      }, options);
    }

    AbstractRepeater.prototype.viewCount = function viewCount() {
      throw new Error('subclass must implement `viewCount`');
    };

    AbstractRepeater.prototype.views = function views() {
      throw new Error('subclass must implement `views`');
    };

    AbstractRepeater.prototype.view = function view(index) {
      throw new Error('subclass must implement `view`');
    };

    AbstractRepeater.prototype.matcher = function matcher() {
      throw new Error('subclass must implement `matcher`');
    };

    AbstractRepeater.prototype.addView = function addView(bindingContext, overrideContext) {
      throw new Error('subclass must implement `addView`');
    };

    AbstractRepeater.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
      throw new Error('subclass must implement `insertView`');
    };

    AbstractRepeater.prototype.moveView = function moveView(sourceIndex, targetIndex) {
      throw new Error('subclass must implement `moveView`');
    };

    AbstractRepeater.prototype.removeAllViews = function removeAllViews(returnToCache, skipAnimation) {
      throw new Error('subclass must implement `removeAllViews`');
    };

    AbstractRepeater.prototype.removeViews = function removeViews(viewsToRemove, returnToCache, skipAnimation) {
      throw new Error('subclass must implement `removeView`');
    };

    AbstractRepeater.prototype.removeView = function removeView(index, returnToCache, skipAnimation) {
      throw new Error('subclass must implement `removeView`');
    };

    AbstractRepeater.prototype.updateBindings = function updateBindings(view) {
      throw new Error('subclass must implement `updateBindings`');
    };

    return AbstractRepeater;
  }();
});
define('aurelia-templating-resources/show',['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-pal', './aurelia-hide-style'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPal, _aureliaHideStyle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Show = undefined;

  

  var _dec, _dec2, _class;

  var Show = exports.Show = (_dec = (0, _aureliaTemplating.customAttribute)('show'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.Animator, _aureliaDependencyInjection.Optional.of(_aureliaPal.DOM.boundary, true)), _dec(_class = _dec2(_class = function () {
    function Show(element, animator, domBoundary) {
      

      this.element = element;
      this.animator = animator;
      this.domBoundary = domBoundary;
    }

    Show.prototype.created = function created() {
      (0, _aureliaHideStyle.injectAureliaHideStyleAtBoundary)(this.domBoundary);
    };

    Show.prototype.valueChanged = function valueChanged(newValue) {
      if (newValue) {
        this.animator.removeClass(this.element, _aureliaHideStyle.aureliaHideClassName);
      } else {
        this.animator.addClass(this.element, _aureliaHideStyle.aureliaHideClassName);
      }
    };

    Show.prototype.bind = function bind(bindingContext) {
      this.valueChanged(this.value);
    };

    return Show;
  }()) || _class) || _class);
});
define('aurelia-templating-resources/aurelia-hide-style',['exports', 'aurelia-pal'], function (exports, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.aureliaHideClassName = undefined;
  exports.injectAureliaHideStyleAtHead = injectAureliaHideStyleAtHead;
  exports.injectAureliaHideStyleAtBoundary = injectAureliaHideStyleAtBoundary;
  var aureliaHideClassName = exports.aureliaHideClassName = 'aurelia-hide';

  var aureliaHideClass = '.' + aureliaHideClassName + ' { display:none !important; }';

  function injectAureliaHideStyleAtHead() {
    _aureliaPal.DOM.injectStyles(aureliaHideClass);
  }

  function injectAureliaHideStyleAtBoundary(domBoundary) {
    if (_aureliaPal.FEATURE.shadowDOM && domBoundary && !domBoundary.hasAureliaHideStyle) {
      domBoundary.hasAureliaHideStyle = true;
      _aureliaPal.DOM.injectStyles(aureliaHideClass, domBoundary);
    }
  }
});
define('aurelia-templating-resources/hide',['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-pal', './aurelia-hide-style'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPal, _aureliaHideStyle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Hide = undefined;

  

  var _dec, _dec2, _class;

  var Hide = exports.Hide = (_dec = (0, _aureliaTemplating.customAttribute)('hide'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.Animator, _aureliaDependencyInjection.Optional.of(_aureliaPal.DOM.boundary, true)), _dec(_class = _dec2(_class = function () {
    function Hide(element, animator, domBoundary) {
      

      this.element = element;
      this.animator = animator;
      this.domBoundary = domBoundary;
    }

    Hide.prototype.created = function created() {
      (0, _aureliaHideStyle.injectAureliaHideStyleAtBoundary)(this.domBoundary);
    };

    Hide.prototype.valueChanged = function valueChanged(newValue) {
      if (newValue) {
        this.animator.addClass(this.element, _aureliaHideStyle.aureliaHideClassName);
      } else {
        this.animator.removeClass(this.element, _aureliaHideStyle.aureliaHideClassName);
      }
    };

    Hide.prototype.bind = function bind(bindingContext) {
      this.valueChanged(this.value);
    };

    return Hide;
  }()) || _class) || _class);
});
define('aurelia-templating-resources/sanitize-html',['exports', 'aurelia-binding', 'aurelia-dependency-injection', './html-sanitizer'], function (exports, _aureliaBinding, _aureliaDependencyInjection, _htmlSanitizer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SanitizeHTMLValueConverter = undefined;

  

  var _dec, _dec2, _class;

  var SanitizeHTMLValueConverter = exports.SanitizeHTMLValueConverter = (_dec = (0, _aureliaBinding.valueConverter)('sanitizeHTML'), _dec2 = (0, _aureliaDependencyInjection.inject)(_htmlSanitizer.HTMLSanitizer), _dec(_class = _dec2(_class = function () {
    function SanitizeHTMLValueConverter(sanitizer) {
      

      this.sanitizer = sanitizer;
    }

    SanitizeHTMLValueConverter.prototype.toView = function toView(untrustedMarkup) {
      if (untrustedMarkup === null || untrustedMarkup === undefined) {
        return null;
      }

      return this.sanitizer.sanitize(untrustedMarkup);
    };

    return SanitizeHTMLValueConverter;
  }()) || _class) || _class);
});
define('aurelia-templating-resources/html-sanitizer',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  var HTMLSanitizer = exports.HTMLSanitizer = function () {
    function HTMLSanitizer() {
      
    }

    HTMLSanitizer.prototype.sanitize = function sanitize(input) {
      return input.replace(SCRIPT_REGEX, '');
    };

    return HTMLSanitizer;
  }();
});
define('aurelia-templating-resources/replaceable',['exports', 'aurelia-dependency-injection', 'aurelia-templating'], function (exports, _aureliaDependencyInjection, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Replaceable = undefined;

  

  var _dec, _dec2, _class;

  var Replaceable = exports.Replaceable = (_dec = (0, _aureliaTemplating.customAttribute)('replaceable'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = function () {
    function Replaceable(viewFactory, viewSlot) {
      

      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.view = null;
    }

    Replaceable.prototype.bind = function bind(bindingContext, overrideContext) {
      if (this.view === null) {
        this.view = this.viewFactory.create();
        this.viewSlot.add(this.view);
      }

      this.view.bind(bindingContext, overrideContext);
    };

    Replaceable.prototype.unbind = function unbind() {
      this.view.unbind();
    };

    return Replaceable;
  }()) || _class) || _class) || _class);
});
define('aurelia-templating-resources/focus',['exports', 'aurelia-templating', 'aurelia-binding', 'aurelia-dependency-injection', 'aurelia-task-queue', 'aurelia-pal'], function (exports, _aureliaTemplating, _aureliaBinding, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Focus = undefined;

  

  var _dec, _dec2, _class;

  var Focus = exports.Focus = (_dec = (0, _aureliaTemplating.customAttribute)('focus', _aureliaBinding.bindingMode.twoWay), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTaskQueue.TaskQueue), _dec(_class = _dec2(_class = function () {
    function Focus(element, taskQueue) {
      

      this.element = element;
      this.taskQueue = taskQueue;
      this.isAttached = false;
      this.needsApply = false;
    }

    Focus.prototype.valueChanged = function valueChanged(newValue) {
      if (this.isAttached) {
        this._apply();
      } else {
        this.needsApply = true;
      }
    };

    Focus.prototype._apply = function _apply() {
      var _this = this;

      if (this.value) {
        this.taskQueue.queueMicroTask(function () {
          if (_this.value) {
            _this.element.focus();
          }
        });
      } else {
        this.element.blur();
      }
    };

    Focus.prototype.attached = function attached() {
      this.isAttached = true;
      if (this.needsApply) {
        this.needsApply = false;
        this._apply();
      }
      this.element.addEventListener('focus', this);
      this.element.addEventListener('blur', this);
    };

    Focus.prototype.detached = function detached() {
      this.isAttached = false;
      this.element.removeEventListener('focus', this);
      this.element.removeEventListener('blur', this);
    };

    Focus.prototype.handleEvent = function handleEvent(e) {
      if (e.type === 'focus') {
        this.value = true;
      } else if (_aureliaPal.DOM.activeElement !== this.element) {
        this.value = false;
      }
    };

    return Focus;
  }()) || _class) || _class);
});
define('aurelia-templating-resources/css-resource',['exports', 'aurelia-templating', 'aurelia-loader', 'aurelia-dependency-injection', 'aurelia-path', 'aurelia-pal'], function (exports, _aureliaTemplating, _aureliaLoader, _aureliaDependencyInjection, _aureliaPath, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._createCSSResource = _createCSSResource;

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  

  var cssUrlMatcher = /url\((?!['"]data)([^)]+)\)/gi;

  function fixupCSSUrls(address, css) {
    if (typeof css !== 'string') {
      throw new Error('Failed loading required CSS file: ' + address);
    }
    return css.replace(cssUrlMatcher, function (match, p1) {
      var quote = p1.charAt(0);
      if (quote === '\'' || quote === '"') {
        p1 = p1.substr(1, p1.length - 2);
      }
      return 'url(\'' + (0, _aureliaPath.relativeToFile)(p1, address) + '\')';
    });
  }

  var CSSResource = function () {
    function CSSResource(address) {
      

      this.address = address;
      this._scoped = null;
      this._global = false;
      this._alreadyGloballyInjected = false;
    }

    CSSResource.prototype.initialize = function initialize(container, target) {
      this._scoped = new target(this);
    };

    CSSResource.prototype.register = function register(registry, name) {
      if (name === 'scoped') {
        registry.registerViewEngineHooks(this._scoped);
      } else {
        this._global = true;
      }
    };

    CSSResource.prototype.load = function load(container) {
      var _this = this;

      return container.get(_aureliaLoader.Loader).loadText(this.address).catch(function (err) {
        return null;
      }).then(function (text) {
        text = fixupCSSUrls(_this.address, text);
        _this._scoped.css = text;
        if (_this._global) {
          _this._alreadyGloballyInjected = true;
          _aureliaPal.DOM.injectStyles(text);
        }
      });
    };

    return CSSResource;
  }();

  var CSSViewEngineHooks = function () {
    function CSSViewEngineHooks(owner) {
      

      this.owner = owner;
      this.css = null;
    }

    CSSViewEngineHooks.prototype.beforeCompile = function beforeCompile(content, resources, instruction) {
      if (instruction.targetShadowDOM) {
        _aureliaPal.DOM.injectStyles(this.css, content, true);
      } else if (_aureliaPal.FEATURE.scopedCSS) {
        var styleNode = _aureliaPal.DOM.injectStyles(this.css, content, true);
        styleNode.setAttribute('scoped', 'scoped');
      } else if (this._global && !this.owner._alreadyGloballyInjected) {
        _aureliaPal.DOM.injectStyles(this.css);
        this.owner._alreadyGloballyInjected = true;
      }
    };

    return CSSViewEngineHooks;
  }();

  function _createCSSResource(address) {
    var _dec, _class;

    var ViewCSS = (_dec = (0, _aureliaTemplating.resource)(new CSSResource(address)), _dec(_class = function (_CSSViewEngineHooks) {
      _inherits(ViewCSS, _CSSViewEngineHooks);

      function ViewCSS() {
        

        return _possibleConstructorReturn(this, _CSSViewEngineHooks.apply(this, arguments));
      }

      return ViewCSS;
    }(CSSViewEngineHooks)) || _class);

    return ViewCSS;
  }
});
define('aurelia-templating-resources/attr-binding-behavior',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AttrBindingBehavior = undefined;

  

  var AttrBindingBehavior = exports.AttrBindingBehavior = function () {
    function AttrBindingBehavior() {
      
    }

    AttrBindingBehavior.prototype.bind = function bind(binding, source) {
      binding.targetObserver = new _aureliaBinding.DataAttributeObserver(binding.target, binding.targetProperty);
    };

    AttrBindingBehavior.prototype.unbind = function unbind(binding, source) {};

    return AttrBindingBehavior;
  }();
});
define('aurelia-templating-resources/binding-mode-behaviors',['exports', 'aurelia-binding', 'aurelia-metadata'], function (exports, _aureliaBinding, _aureliaMetadata) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TwoWayBindingBehavior = exports.OneWayBindingBehavior = exports.OneTimeBindingBehavior = undefined;

  

  var _dec, _class, _dec2, _class2, _dec3, _class3;

  var modeBindingBehavior = {
    bind: function bind(binding, source, lookupFunctions) {
      binding.originalMode = binding.mode;
      binding.mode = this.mode;
    },
    unbind: function unbind(binding, source) {
      binding.mode = binding.originalMode;
      binding.originalMode = null;
    }
  };

  var OneTimeBindingBehavior = exports.OneTimeBindingBehavior = (_dec = (0, _aureliaMetadata.mixin)(modeBindingBehavior), _dec(_class = function OneTimeBindingBehavior() {
    

    this.mode = _aureliaBinding.bindingMode.oneTime;
  }) || _class);
  var OneWayBindingBehavior = exports.OneWayBindingBehavior = (_dec2 = (0, _aureliaMetadata.mixin)(modeBindingBehavior), _dec2(_class2 = function OneWayBindingBehavior() {
    

    this.mode = _aureliaBinding.bindingMode.oneWay;
  }) || _class2);
  var TwoWayBindingBehavior = exports.TwoWayBindingBehavior = (_dec3 = (0, _aureliaMetadata.mixin)(modeBindingBehavior), _dec3(_class3 = function TwoWayBindingBehavior() {
    

    this.mode = _aureliaBinding.bindingMode.twoWay;
  }) || _class3);
});
define('aurelia-templating-resources/throttle-binding-behavior',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ThrottleBindingBehavior = undefined;

  

  function throttle(newValue) {
    var _this = this;

    var state = this.throttleState;
    var elapsed = +new Date() - state.last;
    if (elapsed >= state.delay) {
      clearTimeout(state.timeoutId);
      state.timeoutId = null;
      state.last = +new Date();
      this.throttledMethod(newValue);
      return;
    }
    state.newValue = newValue;
    if (state.timeoutId === null) {
      state.timeoutId = setTimeout(function () {
        state.timeoutId = null;
        state.last = +new Date();
        _this.throttledMethod(state.newValue);
      }, state.delay - elapsed);
    }
  }

  var ThrottleBindingBehavior = exports.ThrottleBindingBehavior = function () {
    function ThrottleBindingBehavior() {
      
    }

    ThrottleBindingBehavior.prototype.bind = function bind(binding, source) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

      var methodToThrottle = 'updateTarget';
      if (binding.callSource) {
        methodToThrottle = 'callSource';
      } else if (binding.updateSource && binding.mode === _aureliaBinding.bindingMode.twoWay) {
        methodToThrottle = 'updateSource';
      }

      binding.throttledMethod = binding[methodToThrottle];
      binding.throttledMethod.originalName = methodToThrottle;

      binding[methodToThrottle] = throttle;

      binding.throttleState = {
        delay: delay,
        last: 0,
        timeoutId: null
      };
    };

    ThrottleBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var methodToRestore = binding.throttledMethod.originalName;
      binding[methodToRestore] = binding.throttledMethod;
      binding.throttledMethod = null;
      clearTimeout(binding.throttleState.timeoutId);
      binding.throttleState = null;
    };

    return ThrottleBindingBehavior;
  }();
});
define('aurelia-templating-resources/debounce-binding-behavior',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DebounceBindingBehavior = undefined;

  

  function debounce(newValue) {
    var _this = this;

    var state = this.debounceState;
    if (state.immediate) {
      state.immediate = false;
      this.debouncedMethod(newValue);
      return;
    }
    clearTimeout(state.timeoutId);
    state.timeoutId = setTimeout(function () {
      return _this.debouncedMethod(newValue);
    }, state.delay);
  }

  var DebounceBindingBehavior = exports.DebounceBindingBehavior = function () {
    function DebounceBindingBehavior() {
      
    }

    DebounceBindingBehavior.prototype.bind = function bind(binding, source) {
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

      var methodToDebounce = 'updateTarget';
      if (binding.callSource) {
        methodToDebounce = 'callSource';
      } else if (binding.updateSource && binding.mode === _aureliaBinding.bindingMode.twoWay) {
        methodToDebounce = 'updateSource';
      }

      binding.debouncedMethod = binding[methodToDebounce];
      binding.debouncedMethod.originalName = methodToDebounce;

      binding[methodToDebounce] = debounce;

      binding.debounceState = {
        delay: delay,
        timeoutId: null,
        immediate: methodToDebounce === 'updateTarget' };
    };

    DebounceBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var methodToRestore = binding.debouncedMethod.originalName;
      binding[methodToRestore] = binding.debouncedMethod;
      binding.debouncedMethod = null;
      clearTimeout(binding.debounceState.timeoutId);
      binding.debounceState = null;
    };

    return DebounceBindingBehavior;
  }();
});
define('aurelia-templating-resources/self-binding-behavior',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  function findOriginalEventTarget(event) {
    return event.path && event.path[0] || event.deepPath && event.deepPath[0] || event.target;
  }

  function handleSelfEvent(event) {
    var target = findOriginalEventTarget(event);
    if (this.target !== target) return;
    this.selfEventCallSource(event);
  }

  var SelfBindingBehavior = exports.SelfBindingBehavior = function () {
    function SelfBindingBehavior() {
      
    }

    SelfBindingBehavior.prototype.bind = function bind(binding, source) {
      if (!binding.callSource || !binding.targetEvent) throw new Error('Self binding behavior only supports event.');
      binding.selfEventCallSource = binding.callSource;
      binding.callSource = handleSelfEvent;
    };

    SelfBindingBehavior.prototype.unbind = function unbind(binding, source) {
      binding.callSource = binding.selfEventCallSource;
      binding.selfEventCallSource = null;
    };

    return SelfBindingBehavior;
  }();
});
define('aurelia-templating-resources/signal-binding-behavior',['exports', './binding-signaler'], function (exports, _bindingSignaler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SignalBindingBehavior = undefined;

  

  var SignalBindingBehavior = exports.SignalBindingBehavior = function () {
    SignalBindingBehavior.inject = function inject() {
      return [_bindingSignaler.BindingSignaler];
    };

    function SignalBindingBehavior(bindingSignaler) {
      

      this.signals = bindingSignaler.signals;
    }

    SignalBindingBehavior.prototype.bind = function bind(binding, source) {
      if (!binding.updateTarget) {
        throw new Error('Only property bindings and string interpolation bindings can be signaled.  Trigger, delegate and call bindings cannot be signaled.');
      }
      if (arguments.length === 3) {
        var name = arguments[2];
        var bindings = this.signals[name] || (this.signals[name] = []);
        bindings.push(binding);
        binding.signalName = name;
      } else if (arguments.length > 3) {
        var names = Array.prototype.slice.call(arguments, 2);
        var i = names.length;
        while (i--) {
          var _name = names[i];
          var _bindings = this.signals[_name] || (this.signals[_name] = []);
          _bindings.push(binding);
        }
        binding.signalName = names;
      } else {
        throw new Error('Signal name is required.');
      }
    };

    SignalBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var name = binding.signalName;
      binding.signalName = null;
      if (Array.isArray(name)) {
        var names = name;
        var i = names.length;
        while (i--) {
          var n = names[i];
          var bindings = this.signals[n];
          bindings.splice(bindings.indexOf(binding), 1);
        }
      } else {
        var _bindings2 = this.signals[name];
        _bindings2.splice(_bindings2.indexOf(binding), 1);
      }
    };

    return SignalBindingBehavior;
  }();
});
define('aurelia-templating-resources/binding-signaler',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BindingSignaler = undefined;

  

  var BindingSignaler = exports.BindingSignaler = function () {
    function BindingSignaler() {
      

      this.signals = {};
    }

    BindingSignaler.prototype.signal = function signal(name) {
      var bindings = this.signals[name];
      if (!bindings) {
        return;
      }
      var i = bindings.length;
      while (i--) {
        bindings[i].call(_aureliaBinding.sourceContext);
      }
    };

    return BindingSignaler;
  }();
});
define('aurelia-templating-resources/update-trigger-binding-behavior',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UpdateTriggerBindingBehavior = undefined;

  

  var _class, _temp;

  var eventNamesRequired = 'The updateTrigger binding behavior requires at least one event name argument: eg <input value.bind="firstName & updateTrigger:\'blur\'">';
  var notApplicableMessage = 'The updateTrigger binding behavior can only be applied to two-way bindings on input/select elements.';

  var UpdateTriggerBindingBehavior = exports.UpdateTriggerBindingBehavior = (_temp = _class = function () {
    function UpdateTriggerBindingBehavior(eventManager) {
      

      this.eventManager = eventManager;
    }

    UpdateTriggerBindingBehavior.prototype.bind = function bind(binding, source) {
      for (var _len = arguments.length, events = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        events[_key - 2] = arguments[_key];
      }

      if (events.length === 0) {
        throw new Error(eventNamesRequired);
      }
      if (binding.mode !== _aureliaBinding.bindingMode.twoWay) {
        throw new Error(notApplicableMessage);
      }

      var targetObserver = binding.observerLocator.getObserver(binding.target, binding.targetProperty);
      if (!targetObserver.handler) {
        throw new Error(notApplicableMessage);
      }
      binding.targetObserver = targetObserver;

      targetObserver.originalHandler = binding.targetObserver.handler;

      var handler = this.eventManager.createElementHandler(events);
      targetObserver.handler = handler;
    };

    UpdateTriggerBindingBehavior.prototype.unbind = function unbind(binding, source) {
      binding.targetObserver.handler = binding.targetObserver.originalHandler;
      binding.targetObserver.originalHandler = null;
    };

    return UpdateTriggerBindingBehavior;
  }(), _class.inject = [_aureliaBinding.EventManager], _temp);
});
define('aurelia-templating-resources/html-resource-plugin',['exports', 'aurelia-templating', './dynamic-element'], function (exports, _aureliaTemplating, _dynamicElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getElementName = getElementName;
  exports.configure = configure;
  function getElementName(address) {
    return (/([^\/^\?]+)\.html/i.exec(address)[1].toLowerCase()
    );
  }

  function configure(config) {
    var viewEngine = config.container.get(_aureliaTemplating.ViewEngine);
    var loader = config.aurelia.loader;

    viewEngine.addResourcePlugin('.html', {
      'fetch': function fetch(address) {
        return loader.loadTemplate(address).then(function (registryEntry) {
          var _ref;

          var bindable = registryEntry.template.getAttribute('bindable');
          var elementName = getElementName(address);

          if (bindable) {
            bindable = bindable.split(',').map(function (x) {
              return x.trim();
            });
            registryEntry.template.removeAttribute('bindable');
          } else {
            bindable = [];
          }

          return _ref = {}, _ref[elementName] = (0, _dynamicElement._createDynamicElement)(elementName, address, bindable), _ref;
        });
      }
    });
  }
});
define('aurelia-templating-resources/dynamic-element',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._createDynamicElement = _createDynamicElement;

  

  function _createDynamicElement(name, viewUrl, bindableNames) {
    var _dec, _dec2, _class;

    var DynamicElement = (_dec = (0, _aureliaTemplating.customElement)(name), _dec2 = (0, _aureliaTemplating.useView)(viewUrl), _dec(_class = _dec2(_class = function () {
      function DynamicElement() {
        
      }

      DynamicElement.prototype.bind = function bind(bindingContext) {
        this.$parent = bindingContext;
      };

      return DynamicElement;
    }()) || _class) || _class);

    for (var i = 0, ii = bindableNames.length; i < ii; ++i) {
      (0, _aureliaTemplating.bindable)(bindableNames[i])(DynamicElement);
    }
    return DynamicElement;
  }
});
define('aurelia-authentication/authFilterValueConverter',['exports', 'aurelia-router'], function (exports, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthFilterValueConverter = undefined;

  

  var AuthFilterValueConverter = exports.AuthFilterValueConverter = function () {
    function AuthFilterValueConverter() {
      
    }

    AuthFilterValueConverter.prototype.toView = function toView(routes, isAuthenticated) {
      return routes.filter(function (route) {
        return typeof route.config.auth !== 'boolean' || route.config.auth === isAuthenticated;
      });
    };

    return AuthFilterValueConverter;
  }();
});
define('aurelia-authentication/authenticatedValueConverter',['exports', 'aurelia-dependency-injection', './aurelia-authentication'], function (exports, _aureliaDependencyInjection, _aureliaAuthentication) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthenticatedValueConverter = undefined;

  

  var _dec, _class;

  var AuthenticatedValueConverter = exports.AuthenticatedValueConverter = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaAuthentication.AuthService), _dec(_class = function () {
    function AuthenticatedValueConverter(authService) {
      

      this.authService = authService;
    }

    AuthenticatedValueConverter.prototype.toView = function toView() {
      return this.authService.authenticated;
    };

    return AuthenticatedValueConverter;
  }()) || _class);
});
define('aurelia-authentication/authenticatedFilterValueConverter',['exports', 'aurelia-dependency-injection', './aurelia-authentication', 'aurelia-router'], function (exports, _aureliaDependencyInjection, _aureliaAuthentication, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthenticatedFilterValueConverter = undefined;

  

  var _dec, _class;

  var AuthenticatedFilterValueConverter = exports.AuthenticatedFilterValueConverter = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaAuthentication.AuthService), _dec(_class = function () {
    function AuthenticatedFilterValueConverter(authService) {
      

      this.authService = authService;
    }

    AuthenticatedFilterValueConverter.prototype.toView = function toView(routes) {
      var isAuthenticated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.authService.authenticated;

      return routes.filter(function (route) {
        return typeof route.config.auth !== 'boolean' || route.config.auth === isAuthenticated;
      });
    };

    return AuthenticatedFilterValueConverter;
  }()) || _class);
});
define('text!addContact.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"list-group mt-4\">\n    <div click.delegate=\"add(user)\" repeat.for=\"user of users\" class=\"list-group-item flex-column justify-content-between\">\n      <h3 class=\"text-muted mr-auto\">${user.nickname}</h3>\n      <small class=\"${user.status == 'online'? 'text-success' : 'text-danger'} ml-auto\">${user.status}</small>\n    </div>\n  </div>\n</template>\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n</template>\n"; });
define('text!chat.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./message\"></require>\n  <require from=\"./user\"></require>\n\n  <div class=\"container-fluid pl-4\">\n    <div class=\"row\">\n      <div class=\"col-2\">\n        <div class=\"container\">\n          <div class=\"row\">\n            <h2 class=\"display-3 col-12\">${user.nickname}</h2>\n          </div>\n          <div class=\"row\">\n            <div class=\"btn-group col-12\" role=\"group\">\n              <button type=\"button\" click.delegate=\"addContact()\" class=\"btn btn-info col-2\">&plus;</button>\n              <button type=\"button\" class=\"btn btn-success col-5\">&plus; group chat</button>\n              <button type=\"button\" class=\"btn btn-danger col-5\" click.delegate=\"logout()\">logout</button>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"list-group mt-4\">\n          <user repeat.for=\"user of users\" user.bind=\"user\" selected-contact.bind=\"selectedContact\"></user>\n        </div>\n      </div>\n      <div class=\"container col-10\">\n        <h1>${selectedContact.name}</h1>\n        <div class=\"row\" style=\"height: 100vh;\">\n          <div class=\"col\">\n            <div id=\"chat-container\" class=\"bg-success d-flex flex-column\" style=\"overflow: scroll; height: calc(100vh - 70px); padding: 10px;\">\n              <div class=\"mt-auto\">\n                <div class=\"row\" repeat.for=\"message of messages\">\n                  <div if.bind=\"message.otheruser\" class=\"col\"></div>\n                  <message if.bind=\"message.otheruser\" class=\"col\" message.bind=\"message\"></message>\n                  <!--separate-->\n                  <message if.bind=\"!message.otheruser\" class=\"col\" message.bind=\"message\"></message>\n                  <div if.bind=\"!message.otheruser\" class=\"col\"></div>\n                </div>\n              </div>\n            </div>\n              <form submit.delegate=\"sendMessage()\">\n                <div class=\"w-100 justify-content-md-center\">\n                  <div class=\"input-group\" style=\"height: 70px;\">\n                    <input name=\"message\" type=\"text\" value.bind=\"message\" class=\"form-control text-left\"\n                           placeholder=\"type here\">\n                    <span class=\"input-group-btn\">\n                    <button class=\"btn btn-success\" type=\"submit\">Send</button>\n                  </span>\n                  </div>\n                </div>\n              </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!login.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n\n  <div class=\"container-fluid\" show.bind=\"!register\">\n    <div class=\"row align-items-center\" style=\"height: 100vh\">\n      <div class=\"col\"></div>\n      <div class=\"col-3\">\n        <h1>Login</h1>\n        <div id=\"loginfailed\" class=\"alert alert-danger\" role=\"alert\" style=\"opacity: 0;\">\n          <strong>Login failed!  </strong> ${error}\n        </div>\n        <form submit.delegate=\"login()\">\n          <div class=\"form-group row\">\n            <label for=\"loginNickname\" class=\"col-3 col-form-label\">Nickname: </label>\n            <div class=\"col-9\">\n              <input name=\"nickname\" id=\"loginNickname\" type=\"text\" class=\"form-control text-left\"\n                     value.bind=\"loginNickname\">\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"loginPassword\" class=\"col-3 col-form-label\">Password: </label>\n            <div class=\"col-9\">\n              <input name=\"password\" id=\"loginPassword\" type=\"password\" class=\"form-control text-left\"\n                       value.bind=\"loginPassword\">\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <div class=\"input-group-btn col-12\">\n              <button class=\"btn btn-success\" type=\"submit\">Send</button>\n            </div>\n          </div>\n        </form>\n        <div class=\"form-group row\">\n          <div class=\"input-group-btn col-12\">\n            <button click.delegate=\"goToRegister()\" class=\"btn btn-info\">Register</button>\n          </div>\n        </div>\n      </div>\n      <div class=\"col\"></div>\n    </div>\n  </div>\n\n  <div class=\"container-fluid\" show.bind=\"register\">\n    <div class=\"row align-items-center\" style=\"height: 100vh\">\n      <div class=\"col\"></div>\n      <div class=\"col-3\">\n        <h1>Register</h1>\n        <div id=\"registerfailed\" class=\"alert alert-danger\" role=\"alert\" style=\"opacity: 0;\">\n          <strong>Registration failed!  </strong> ${error}\n        </div>\n        <form submit.delegate=\"postRegister()\">\n          <div class=\"form-group row\">\n            <label for=\"registerNickname\" class=\"col-3 col-form-label\">Nickname: </label>\n            <div class=\"col-9\">\n              <input name=\"nickname\" id=\"registerNickname\" type=\"text\" class=\"form-control text-left\"\n                     value.bind=\"registerNickname\">\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"registerPassword\" class=\"col-3 col-form-label\">Password: </label>\n            <div class=\"col-9\">\n              <input name=\"password\" id=\"registerPassword\" type=\"password\" class=\"form-control text-left\"\n                     value.bind=\"registerPassword\">\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"firstName\" class=\"col-3 col-form-label\">First name: </label>\n            <div class=\"col-9\">\n              <input name=\"nickname\" id=\"firstName\" type=\"text\" class=\"form-control text-left\"\n                     value.bind=\"firstName\">\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"lastName\" class=\"col-3 col-form-label\">Last name: </label>\n            <div class=\"col-9\">\n              <input name=\"nickname\" id=\"lastName\" type=\"text\" class=\"form-control text-left\"\n                     value.bind=\"lastName\">\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"email\" class=\"col-3 col-form-label\">Email: </label>\n            <div class=\"col-9\">\n              <input name=\"nickname\" id=\"email\" type=\"text\" class=\"form-control text-left\"\n                     value.bind=\"email\">\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <div class=\"input-group-btn col-12\">\n              <button class=\"btn btn-info\" type=\"submit\">Register</button>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"col\"></div>\n    </div>\n  </div>\n</template>\n"; });
define('text!message.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"ml-md-1 mb-md-2 p-md-2 bg-faded justify-content-between rounded\">\n      <h5 class=\"mb-1\">${message.corresponder}</h5>\n      <p class=\"mb-1\">${message.message}</p>\n      <small show.bind=\"isError()\">${message.error}</small>\n      <small show.bind=\"!isError()\">${message.timestamp}</small>\n  </div>\n</template>\n"; });
define('text!test.html', ['module'], function(module) { module.exports = "<template>\n  <h1>just a ${id}</h1>\n</template>\n"; });
define('text!user.html', ['module'], function(module) { module.exports = "<template>\n  <div click.delegate=\"selectContact()\" class=\"${selectedContact.nickname == user.nickname? 'bg-faded' : ''} list-group-item flex-column justify-content-between\">\n    <h3 class=\"text-muted mr-auto\">${user.nickname}</h3>\n    <small class=\"${user.status == 'online'? 'text-success' : 'text-danger'} ml-auto\">${user.status}</small>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map