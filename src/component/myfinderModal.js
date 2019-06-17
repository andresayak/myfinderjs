import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormText, FormGroup, Label, Input, FormFeedback,  Col} from 'reactstrap';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Table} from 'reactstrap';
import './../../theme/styles.scss';
import Time from 'react-time-format';

export default class MyFinderModal extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modal: props.isOpen,
            directories: [],
            files: [],
            openDir: null,
            selectFile: null,
            showFormCreateForlder: false,
            showModalRemoveFolder: false,
            showFormUpload: false,
            withFolders: false,
            fileFile: null,
            errors: {}
        };
        this.folderNameRef = React.createRef();
        this.fileRef = React.createRef();
        this.toggle = props.toggle.bind(this);
        this.titleRef = React.createRef();
        this.captionRef = React.createRef();
        this.fileRef = React.createRef();
        this.altRef = React.createRef();
    }

    componentWillReceiveProps(props) {
        if(this.state.modal!=props.isOpen){
            this.setState({
                modal: props.isOpen
            });
            if(props.isOpen)
                this.requestGetBrowserData();
        }
    }
    
    requestGetBrowserData(dirname = null) {
        return axios({
                method: 'post',
                url: '/api/myfinder/browser/', 
                data: {
                    dir: dirname
                },
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(this.catchResponse)
    }
    
    handleRemoveFile(e, item) {
        this.setState({
            selectFile: null
        });
        return axios({
                method: 'post',
                url: '/api/myfinder/remove', 
                data: {
                    file: item.filename
                },
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(this.catchResponse)
    }
    
    catchResponse = (response) => {
        this.setState((prev) => {
            if (response.data.directories) {
                prev.directories = [];
                response.data.directories.map((item) => {
                    prev.directories.push({
                        level: item.split('/').length,
                        dir: item,
                        name: item.split('/').pop(),
                        files: []
                    });
                });
                prev.files = response.data.files;
            }
            prev.files = response.data.files;
            
            prev.selectFile = prev.files[0];
            return prev;
        });
    }
    
    handleCreateFolderSubmit = (e) => {
        e.preventDefault();
        
        var data = {
            dir: this.state.openDir?this.state.openDir:'',
            name: this.folderNameRef.value,
        };
        var formData = new FormData();
        for (var key in data){
            formData.append(key, data[key]);
        }
        return axios({
                method: 'post',
                url: '/api/myfinder/mkdir', 
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response)=>{
                this.folderNameRef.value = '';
                this.toggleCreateFolder();
                this.catchResponse(response);
            })
            .catch(error => {
                if(error.response.data.errors !== undefined){
                    this.setState({
                        errors: error.response.data.errors
                    });
                }
            });
    }
    
    handleUploadSubmit = (event) => {
        //event.preventDefault();
        var data = {
            dir: this.state.openDir?this.state.openDir:'',
        };
        var formData = new FormData();
        for (var key in data){
            formData.append(key, data[key]);
        }
        console.log(' event.target',  event.target.files[0]);
        formData.append('file', event.target.files[0], event.target.files[0].name)
        return axios({
                method: 'post',
                url: '/api/myfinder/upload', 
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response)=>{
                this.fileRef.value = '';
                this.catchResponse(response);
            })
            .catch(error => {
                if(error.response.data.errors !== undefined){
                    this.setState({
                        errors: error.response.data.errors
                    });
                }
            });
    }
    
    hasError(colname)
    {
        return (this.state.errors[colname]!==undefined);
    }
    
    renderError(colname) 
    {
        return this.hasError(colname)?(
            <FormFeedback >{this.state.errors[colname]}</FormFeedback>
        ):null;
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="myfinder-modal modal-dialog-centered modal-xl">
                    <ModalHeader toggle={this.toggle}>Add Media</ModalHeader>
                    <Nav tabs>
                        <NavItem>
                            <NavLink className="active" >
                                Media library
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <ModalBody className="myfinder-modal-body">
                        {this.renderContainer()}
                    </ModalBody>
                    <ModalFooter className="text-center">
                        <Label color="light" for="inputFile" className="btn-file">
                            <Input
                                id="inputFile"
                                innerRef={input => (this.fileRef = input)}
                                onChange={this.handleUploadSubmit}
                                type="file"
                                required={true}/>
                            <span><i className="fa fa-upload" aria-hidden="true"></i> Upload</span>
                        </Label>
                        {this.state.openDir && this.state.withFolders?
                        <Button color="danger" onClick={() => this.toggleRemoveFolder()}>Remove folder</Button>
                        :null}
                        {this.state.selectFile?
                        <Button color="primary" onClick={() => this.handleInsertSelectedFile(this.state.selectFile)}>Select file</Button>
                        :null}
                        {this.state.withFolders?
                        <Button color="primary" onClick={() => this.toggleCreateFolder()}>Create folder</Button>:null}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    
    toggleCreateFolder () {
        this.setState((prev) => {
            prev.showFormCreateFolder = !prev.showFormCreateFolder;
            return prev;
        });
    }
    
    toggleRemoveFolder () {
        this.setState((prev) => {
            prev.showModalRemoveFolder = !prev.showModalRemoveFolder;
            return prev;
        });
    }
    
    toggleCancel = () => {
        this.setState((prev) => {
            prev.showModalRemoveFolder = false;
            prev.showFormCreateFolder = false;
            return prev;
        });
    }
    
    handleSelectFile (item) {
        this.setState((prev) => {
            prev.selectFile = item;
            return prev;
        });
    }
    
    handleInsertSelectedFile (item) {
        window.myfinderChooseCallback(item.url, this.titleRef.value, this.captionRef.value, this.altRef.value);
        this.toggle();
    }
    
    handleSelectDir(dirname) {
        this.setState((prev) => {
            prev.openDir = dirname;
            return prev;
        });
        this.requestGetBrowserData(dirname);
    }
    
    getReadableFileSizeString(fileSizeInBytes) {
        fileSizeInBytes = parseInt(fileSizeInBytes);
        var i = -1;
        var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    };
    
    renderContainer() {
        return (
            <div className="row">
                {this.state.withFolders?
                <div className="col-md-3 d-none d-md-block bg-light myfinder-sidebar h100perc">
                    <div className="myfinder-sidebar-sticky">
                        <Nav vertical>
                            <NavItem active={!this.state.openDir}>
                                <NavLink href="#" onClick={()=>this.handleSelectDir(null)}>root</NavLink>
                            </NavItem>
                            {this.state.directories.map((item, key)=>{
                                return (<NavItem key={key} active={this.state.openDir == item.dir}>
                                    <NavLink href="#" onClick={()=>this.handleSelectDir(item.dir)}>{('- ').repeat(item.level)+item.name}</NavLink>
                                </NavItem>);
                            })}
                        </Nav>
                    </div>
                </div>:null}
                <div className={this.state.withFolders?'col-md-9 ml-sm-auto col-lg-9 h100perc':'col-md-9 col-lg-9 h100perc'}>
                    <div className="myfinder-explorer">
                        <div className="myfinder-grid">
                            {this.state.files.map((item, key)=>{
                                return (
                                    <div key={key}
                                        className={'myfinder-grid-item'+((this.state.selectFile && item.url == this.state.selectFile.url)?' active':'')} 
                                        style={{backgroundImage: 'url("'+item.url+'")'}} 
                                        onDoubleClick={()=>this.handleInsertSelectedFile(item)}
                                        onClick={()=>this.handleSelectFile(item)}></div>
                                );
                            })}
                        </div>
                    </div>
                    {this.state.showFormCreateFolder?
                    <Form inline onSubmit={this.handleCreateFolderSubmit} className="myfinder-createFolder-form p-3">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="inputFolderName" className="mr-sm-2">Folder name</Label>
                            <Input
                                id="inputFolderName"
                                innerRef={input => (this.folderNameRef = input)}
                                type="text"
                                placeholder="somename"
                                required={true}/>
                        </FormGroup>
                        <Button color="primary">Ok</Button>{' '}
                        <Button color="secondary" onClick={()=>this.toggleCancel()}>Cancel</Button>
                    </Form>:null}
                    {this.state.showModalRemoveFolder?
                    <Form inline onSubmit={this.handleRemoveSubmit} className="myfinder-upload-form p-3">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">Do you want to remove "{this.state.openDir}"?</Label>
                        </FormGroup>
                        <Button color="primary">Ok</Button>{' '}
                        <Button color="secondary" onClick={()=>this.toggleCancel()}>Cancel</Button>
                    </Form>:null}
                </div>
                {this.state.selectFile?
                <div className="col-md-3 d-none d-md-block bg-light myfinder-sidebar h100perc">
                    <div>
                        <div className="py-3">
                            <h4>Attachment details</h4>
                            <div className="selectfile-block">
                                <div className=""></div>
                                <div className="">
                                    <b>{this.state.selectFile.filename}</b>
                                    <p>
                                    <Time value={new Date(this.state.selectFile.lastModified*1000)} format={'YYYY/MM/DD'} />
                                    <br/>
                                    {this.getReadableFileSizeString(this.state.selectFile.filesize)}<br/>
                                    {this.state.selectFile.getimagesize[0]+'x'+this.state.selectFile.getimagesize[1]}</p>
                                    <Button color="danger" size="sm" onClick={(e) => this.handleRemoveFile(e, this.state.selectFile)}>Remove file</Button>
                                </div>
                            </div>
                            <hr/>
                        </div>
                        <div className="selectfile-folder">
                            <FormGroup row>
                                <Label for="inputUrl" sm={3}>URL</Label>
                                <Col sm={9}>
                                    <Input
                                        id="inputUrl"
                                        disabled={true}
                                        defaultValue={this.state.selectFile.url}
                                        type="text"/>
                                    {this.renderError('caption')}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="inputCaption" sm={3}>Caption</Label>
                                <Col sm={9}>
                                    <Input id="inputCaption" innerRef={input => (this.captionRef = input)} type="textarea" required={true}/>
                                    {this.renderError('caption')}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="inputAlt" sm={3}>Alt</Label>
                                <Col sm={9}>
                                    <Input id="inputAlt" innerRef={input => (this.altRef = input)} type="text" required={true}/>
                                    {this.renderError('alt')}
                                </Col>
                            </FormGroup>
                        </div>
                    </div>
                </div>:null}
            </div>
        );
    }
}
