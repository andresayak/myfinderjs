"use strict";var _reactTimeFormat=_interopRequireDefault(require("react-time-format"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=_interopRequireDefault(require("react")),_reactstrap=require("reactstrap");require("./../../theme/styles.scss");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _possibleConstructorReturn(a,b){return b&&("object"===_typeof(b)||"function"==typeof b)?b:_assertThisInitialized(a)}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var MyFinderModal=/*#__PURE__*/function(a){function b(a){var c;return _classCallCheck(this,b),c=_possibleConstructorReturn(this,_getPrototypeOf(b).call(this,a)),_defineProperty(_assertThisInitialized(c),"handleSelectedFile",function(a){c.setState({fileFile:a.target.files[0]})}),_defineProperty(_assertThisInitialized(c),"catchResponse",function(a){c.setState(function(b){return a.data.directories&&(b.directories=[],a.data.directories.map(function(a){b.directories.push({level:a.split("/").length,dir:a,name:a.split("/").pop(),files:[]})}),b.files=a.data.files),b.files=a.data.files,b.selectFile=b.files[0],b})}),_defineProperty(_assertThisInitialized(c),"handleCreateFolderSubmit",function(a){a.preventDefault();var b={dir:c.state.openDir?c.state.openDir:"",name:c.folderNameRef.value},d=new FormData;for(var e in b)d.append(e,b[e]);return axios({method:"post",url:"/api/myfinder/mkdir",data:d,config:{headers:{"Content-Type":"multipart/form-data"}}}).then(function(a){c.folderNameRef.value="",c.toggleCreateFolder(),c.catchResponse(a)}).catch(function(a){void 0!==a.response.data.errors&&c.setState({errors:a.response.data.errors})})}),_defineProperty(_assertThisInitialized(c),"handleUploadSubmit",function(a){a.preventDefault();var b={dir:c.state.openDir?c.state.openDir:""},d=new FormData;for(var e in b)d.append(e,b[e]);return c.state.fileFile&&d.append("file",c.state.fileFile,c.state.fileFile.name),axios({method:"post",url:"/api/myfinder/upload",data:d,config:{headers:{"Content-Type":"multipart/form-data"}}}).then(function(a){c.fileRef.value="",c.toggleUpload(),c.catchResponse(a)}).catch(function(a){void 0!==a.response.data.errors&&c.setState({errors:a.response.data.errors})})}),_defineProperty(_assertThisInitialized(c),"toggleCancel",function(){c.setState(function(a){return a.showModalRemoveFolder=!1,a.showFormCreateFolder=!1,a.showFormUpload=!1,a})}),c.state={modal:a.isOpen,directories:[],files:[],openDir:null,selectFile:null,showFormCreateForlder:!1,showModalRemoveFolder:!1,showFormUpload:!1,withFolders:!1,fileFile:null,errors:{}},c.folderNameRef=_react.default.createRef(),c.fileRef=_react.default.createRef(),c.toggle=a.toggle.bind(_assertThisInitialized(c)),c.titleRef=_react.default.createRef(),c.captionRef=_react.default.createRef(),c.fileRef=_react.default.createRef(),c.altRef=_react.default.createRef(),c}return _inherits(b,a),_createClass(b,[{key:"componentWillReceiveProps",value:function b(a){this.state.modal!=a.isOpen&&(this.setState({modal:a.isOpen}),a.isOpen&&this.requestGetBrowserData())}},{key:"requestGetBrowserData",value:function b(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;return axios({method:"post",url:"/api/myfinder/browser/",data:{dir:a},config:{headers:{"Content-Type":"multipart/form-data"}}}).then(this.catchResponse)}},{key:"handleRemoveFile",value:function a(){this.requestGetBrowserData(),this.setState(function(a){return a.selectFile=!a.showModalRemoveFolder,a}),this.setState({selectFile:null}),this.requestGetBrowserData()}},{key:"hasError",value:function b(a){return void 0!==this.state.errors[a]}},{key:"renderError",value:function b(a){return this.hasError(a)?_react.default.createElement(_reactstrap.FormFeedback,null,this.state.errors[a]):null}},{key:"render",value:function b(){var a=this;return _react.default.createElement("div",null,_react.default.createElement(_reactstrap.Modal,{isOpen:this.state.modal,toggle:this.toggle,className:"myfinder-modal modal-dialog-centered modal-xl"},_react.default.createElement(_reactstrap.ModalHeader,{toggle:this.toggle},"Add Media"),_react.default.createElement(_reactstrap.Nav,{tabs:!0},_react.default.createElement(_reactstrap.NavItem,null,_react.default.createElement(_reactstrap.NavLink,{className:"active"},"Media library"))),_react.default.createElement(_reactstrap.ModalBody,{className:"myfinder-modal-body"},this.renderContainer()),_react.default.createElement(_reactstrap.ModalFooter,{className:"text-center"},_react.default.createElement(_reactstrap.Button,{color:"primary",onClick:function b(){return a.toggleUpload()}},"Upload"),this.state.openDir&&this.state.withFolders?_react.default.createElement(_reactstrap.Button,{color:"danger",onClick:function b(){return a.toggleRemoveFolder()}},"Remove folder"):null,this.state.selectFile?_react.default.createElement(_reactstrap.Button,{color:"primary",onClick:function b(){return a.handleInsertSelectedFile(a.state.selectFile)}},"Select file"):null,this.state.withFolders?_react.default.createElement(_reactstrap.Button,{color:"primary",onClick:function b(){return a.toggleCreateFolder()}},"Create folder"):null)))}},{key:"toggleCreateFolder",value:function a(){this.setState(function(a){return a.showFormCreateFolder=!a.showFormCreateFolder,a})}},{key:"toggleRemoveFolder",value:function a(){this.setState(function(a){return a.showModalRemoveFolder=!a.showModalRemoveFolder,a})}},{key:"toggleUpload",value:function a(){this.setState(function(a){return a.showFormUpload=!a.showFormUpload,a})}},{key:"handleSelectFile",value:function b(a){this.setState(function(b){return b.selectFile=a,b})}},{key:"handleInsertSelectedFile",value:function b(a){window.myfinderChooseCallback(a.url,this.titleRef.value,this.captionRef.value,this.altRef.value),this.toggle()}},{key:"handleSelectDir",value:function b(a){this.setState(function(b){return b.openDir=a,b}),this.requestGetBrowserData(a)}},{key:"getReadableFileSizeString",value:function d(a){var b=Math.max;a=parseInt(a);var c=-1;do a/=1024,c++;while(1024<a);return b(a,.1).toFixed(1)+[" kB"," MB"," GB"," TB","PB","EB","ZB","YB"][c]}},{key:"renderContainer",value:function b(){var a=this;return _react.default.createElement("div",{className:"row"},this.state.withFolders?_react.default.createElement("div",{className:"col-md-3 d-none d-md-block bg-light myfinder-sidebar h100perc"},_react.default.createElement("div",{className:"myfinder-sidebar-sticky"},_react.default.createElement(_reactstrap.Nav,{vertical:!0},_react.default.createElement(_reactstrap.NavItem,{active:!this.state.openDir},_react.default.createElement(_reactstrap.NavLink,{href:"#",onClick:function b(){return a.handleSelectDir(null)}},"root")),this.state.directories.map(function(b,c){return _react.default.createElement(_reactstrap.NavItem,{key:c,active:a.state.openDir==b.dir},_react.default.createElement(_reactstrap.NavLink,{href:"#",onClick:function c(){return a.handleSelectDir(b.dir)}},"- ".repeat(b.level)+b.name))})))):null,_react.default.createElement("div",{className:this.state.withFolders?"col-md-9 ml-sm-auto col-lg-9 h100perc":"col-md-9 col-lg-9 h100perc"},_react.default.createElement("div",{className:"myfinder-explorer"},_react.default.createElement("div",{className:"myfinder-grid"},this.state.files.map(function(b,c){return _react.default.createElement("div",{key:c,className:"myfinder-grid-item"+(a.state.selectFile&&b.url==a.state.selectFile.url?" active":""),style:{backgroundImage:"url(\""+b.url+"\")"},onClick:function c(){return a.handleSelectFile(b)}})}))),this.state.showFormCreateFolder?_react.default.createElement(_reactstrap.Form,{inline:!0,onSubmit:this.handleCreateFolderSubmit,className:"myfinder-createFolder-form p-3"},_react.default.createElement(_reactstrap.FormGroup,{className:"mb-2 mr-sm-2 mb-sm-0"},_react.default.createElement(_reactstrap.Label,{for:"inputFolderName",className:"mr-sm-2"},"Folder name"),_react.default.createElement(_reactstrap.Input,{id:"inputFolderName",innerRef:function c(b){return a.folderNameRef=b},type:"text",placeholder:"somename",required:!0})),_react.default.createElement(_reactstrap.Button,{color:"primary"},"Ok")," ",_react.default.createElement(_reactstrap.Button,{color:"secondary",onClick:function b(){return a.toggleCancel()}},"Cancel")):null,this.state.showFormUpload?_react.default.createElement(_reactstrap.Form,{inline:!0,onSubmit:this.handleUploadSubmit,className:"myfinder-upload-form p-3"},_react.default.createElement(_reactstrap.FormGroup,{className:"mb-2 mr-sm-2 mb-sm-0"},_react.default.createElement(_reactstrap.Label,{for:"inputFile",className:"mr-sm-2"},"File"),_react.default.createElement(_reactstrap.Input,{id:"inputFile",innerRef:function c(b){return a.fileRef=b},onChange:this.handleSelectedFile,type:"file",required:!0})),_react.default.createElement(_reactstrap.Button,{color:"primary"},"Ok")," ",_react.default.createElement(_reactstrap.Button,{color:"secondary",onClick:function b(){return a.toggleCancel()}},"Cancel")):null,this.state.showModalRemoveFolder?_react.default.createElement(_reactstrap.Form,{inline:!0,onSubmit:this.handleRemoveSubmit,className:"myfinder-upload-form p-3"},_react.default.createElement(_reactstrap.FormGroup,{className:"mb-2 mr-sm-2 mb-sm-0"},_react.default.createElement(_reactstrap.Label,{className:"mr-sm-2"},"Do you want to remove \"",this.state.openDir,"\"?")),_react.default.createElement(_reactstrap.Button,{color:"primary"},"Ok")," ",_react.default.createElement(_reactstrap.Button,{color:"secondary",onClick:function b(){return a.toggleCancel()}},"Cancel")):null),_react.default.createElement("div",{className:"col-md-3 d-none d-md-block bg-light myfinder-sidebar h100perc"},this.state.selectFile?_react.default.createElement("div",null,_react.default.createElement("div",{className:"py-3"},_react.default.createElement("h4",null,"Attachment details"),_react.default.createElement("div",{className:"selectfile-block"},_react.default.createElement("div",{className:""}),_react.default.createElement("div",{className:""},_react.default.createElement("b",null,this.state.selectFile.filename),_react.default.createElement("p",null,_react.default.createElement(_reactTimeFormat.default,{value:new Date(1e3*this.state.selectFile.lastModified),format:"YYYY/MM/DD"}),_react.default.createElement("br",null),this.getReadableFileSizeString(this.state.selectFile.filesize),_react.default.createElement("br",null),this.state.selectFile.getimagesize[0]+"x"+this.state.selectFile.getimagesize[1]),_react.default.createElement(_reactstrap.Button,{color:"danger",size:"sm",onClick:function b(){return a.handleRemoveFile(a.state.selectFile)}},"Remove file"))),_react.default.createElement("hr",null)),_react.default.createElement("div",{className:"selectfile-folder"},_react.default.createElement(_reactstrap.FormGroup,{row:!0},_react.default.createElement(_reactstrap.Label,{for:"inputUrl",sm:3},"URL"),_react.default.createElement(_reactstrap.Col,{sm:9},_react.default.createElement(_reactstrap.Input,{id:"inputUrl",disabled:!0,defaultValue:this.state.selectFile.url,type:"text"}),this.renderError("caption"))),_react.default.createElement(_reactstrap.FormGroup,{row:!0},_react.default.createElement(_reactstrap.Label,{for:"inputCaption",sm:3},"Caption"),_react.default.createElement(_reactstrap.Col,{sm:9},_react.default.createElement(_reactstrap.Input,{id:"inputCaption",innerRef:function c(b){return a.captionRef=b},type:"textarea",required:!0}),this.renderError("caption"))),_react.default.createElement(_reactstrap.FormGroup,{row:!0},_react.default.createElement(_reactstrap.Label,{for:"inputAlt",sm:3},"Alt"),_react.default.createElement(_reactstrap.Col,{sm:9},_react.default.createElement(_reactstrap.Input,{id:"inputAlt",innerRef:function c(b){return a.altRef=b},type:"text",required:!0}),this.renderError("alt"))))):null))}}]),b}(_react.default.Component);exports.default=MyFinderModal;