import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormText, FormGroup, Label, Input, FormFeedback,  Col} from 'reactstrap';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Table} from 'reactstrap';
import './../../theme/styles.scss';

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
            fileFile: null,
            errors: {}
        };
        this.folderNameRef = React.createRef();
        this.fileRef = React.createRef();
        this.toggle = props.toggle.bind(this);
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
    
    handleSelectedFile = (event) => {
        this.setState({
            fileFile: event.target.files[0],
        });
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
    
    handleRemoveFile() {
        this.requestGetBrowserData();
        this.setState((prev) => {
            prev.selectFile = !prev.showModalRemoveFolder;
            return prev;
        });
        this.setState({
            selectFile: null
        });
        this.requestGetBrowserData();
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
    
    handleUploadSubmit = (e) => {
        e.preventDefault();
        var data = {
            dir: this.state.openDir?this.state.openDir:'',
        };
        var formData = new FormData();
        for (var key in data){
            formData.append(key, data[key]);
        }
        if(this.state.fileFile)
            formData.append('file', this.state.fileFile, this.state.fileFile.name)
        
        console.log(this.state.fileFile, this.fileRef);
        return axios({
                method: 'post',
                url: '/api/myfinder/upload', 
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response)=>{
                this.fileRef.value = '';
                this.toggleUpload();
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
                    <ModalHeader toggle={this.toggle}>File manager</ModalHeader>
                    <ModalBody className="myfinder-modal-body">
                        {this.renderContainer()}
                    </ModalBody>
                    <ModalFooter className="text-center">
                        {this.state.openDir?
                        <Button color="danger" onClick={() => this.toggleRemoveFolder()}>Remove folder</Button>
                        :null}
                        {this.state.selectFile?
                        <Button color="primary" onClick={() => this.handleInsertSelectedFile(this.state.selectFile)}>Select file</Button>
                        :null}
                        {this.state.selectFile?
                        <Button color="danger" onClick={() => this.handleRemoveFile(this.state.selectFile)}>Remove file</Button>
                        :null}
                        <Button color="primary" onClick={() => this.toggleUpload()}>Upload</Button>
                        <Button color="primary" onClick={() => this.toggleCreateFolder()}>Create folder</Button>
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
    
    toggleUpload () {
        this.setState((prev) => {
            prev.showFormUpload = !prev.showFormUpload;
            return prev;
        });
    }
    
    toggleCancel = () => {
        this.setState((prev) => {
            prev.showModalRemoveFolder = false;
            prev.showFormCreateFolder = false;
            prev.showFormUpload = false;
            return prev;
        });
    }
    
    handleSelectFile (url) {
        this.setState((prev) => {
            prev.selectFile = url;
            return prev;
        });
    }
    
    handleInsertSelectedFile (url) {
        window.myfinderChooseCallback(url);
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
                </div>
                <div className="col-md-9 ml-sm-auto col-lg-9 h100perc">
                    <div className="myfinder-explorer">
                        <div className="p-2">
                            <h4>{'/'+(this.state.openDir?this.state.openDir:'')}</h4>
                        </div>
                        <div className="myfinder-grid">
                            {this.state.files.map((item, key)=>{
                                return (
                                    <div key={key} className={'myfinder-grid-item'+((item.url == this.state.selectFile)?' active':'')} style={{backgroundImage: 'url('+item.url+')'}} onClick={()=>this.handleSelectFile(item.url)}></div>);
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
                    {this.state.showFormUpload?
                    <Form inline onSubmit={this.handleUploadSubmit} className="myfinder-upload-form p-3">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="inputFile" className="mr-sm-2">File</Label>
                            <Input
                                id="inputFile"
                                innerRef={input => (this.fileRef = input)}
                                onChange={this.handleSelectedFile}
                                type="file"
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
            </div>
        );
    }
}
