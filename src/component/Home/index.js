import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  logOut,
  addEvent,
  addReco
} from '../../actions'
import './home.scss'
import { Player } from 'video-react'
import { Row, Col } from 'antd'
import { Layout, Menu, Icon, Upload, Button, Input, message } from 'antd'
import { withRouter, Redirect } from 'react-router'
import Loader from '../Loader'
import reqwest from 'reqwest'

const { Header, Content, Sider } = Layout

const menu = [
  {
    text: 'My Videos',
    icon: 'home'
  },
  {
    text: 'Upload Videos',
    icon: 'upload'
  },
  {
    text: 'Profile',
    icon: 'user'
  },
  {
    text: 'Recommendations',
    icon: 'reconciliation'
  }
]

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '0',
      fileList: [],
      uploading: false,
      name: '',
      value: '',
      error: '',
      subject: '',
      title: ''
    };
  }

  handleUpload = () => {

    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });

    reqwest({
      url: 'http://192.168.137.77:5000/uploader',
      method: 'post',
      files: {
        'file': fileList[0]
      },
      processData: false,
      data: formData,
      headers: { "Access-Control-Allow-Origin": "http://localhost:3000/" },
      success: (res) => {
        let list = res.split(" ")
        let event = {
          pdf: list[0],
          url: list[1],
          title: this.state.title,
          subject: this.state.subject
        }
        this.props.addEvent(event, this.props.keys)
        this.props.addReco(list)
        this.setState({
          fileList: [],
          uploading: false,
          title: '',
          subject: '',
          key: '0'
        });
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });

  }

  render() {

    if (this.props.user === '') {
      return <Redirect to="/signin" />
    }

    const { uploading } = this.state;
    const props = {
      action: 'http://192.168.137.77:5000/uploader',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    console.log(this.props.reco)

    return (
      <div>
        {
          this.props.loading ? <Loader /> : <Layout className="layout-container">
            <Header className="header">
              <Button type="danger" ghost className="logout-button" onClick={() => {
                this.props.logOut()
              }}>Logout</Button>
            </Header>
            <Layout>
              <Sider width={200}
                className="background-white">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['0']}
                  className="side-menu"
                  onSelect={(item, key, selectedKeys) => {
                    this.setState({
                      key: item.key
                    })
                  }}
                >
                  {
                    menu.map((val, index) => {
                      return <Menu.Item key={index}><span><Icon type={val.icon} />{val.text}</span></Menu.Item>
                    })
                  }
                </Menu>
              </Sider>
              <Layout
                className="inner-layout-container"
              >
                {
                  this.state.key === '0' &&
                  <Content
                    className="content-container"
                  >
                    <Row gutter={16} className="videoContainer">
                      {this.props.user.events && Object.keys(this.props.user.events).map((key) => {
                        return <Col span={6} key={key}>
                          <Player
                            className="player"
                            playsInline
                            src={this.props.user.events[key].url}
                          />
                          <h3 className="full-text"><span className="video-head">Name :</span> {this.props.user.events[key].title}</h3>
                          <h3 className="full-text"><span className="video-head">Subject :</span> {this.props.user.events[key].subject}</h3>
                          <h3 className="full-text"><span className="video-head">PDF :</span> <a href={this.props.user.events[key].pdf}>Link</a></h3>
                        </Col>
                      })}
                    </Row>
                  </Content>
                }
                {
                  this.state.key === '1' &&
                  <Content
                    className="content-container"
                  >
                    <div className="form-container">
                      <Input value={this.state.title}
                        onChange={(event) => {
                          this.setState({
                            title: event.target.value
                          })
                        }} className="input" placeholder="Title" /><br /><br />
                      <Input value={this.state.subject}
                        onChange={(event) => {
                          this.setState({
                            subject: event.target.value
                          })
                        }} className="input" placeholder="Genre" /><br /><br />
                      <Upload {...props}>
                        <Button>
                          <Icon type="upload" /> Select File
                    </Button>
                      </Upload>
                      <Button
                        className="upload-demo-start"
                        type="primary"
                        onClick={() => { this.handleUpload() }}
                        disabled={this.state.fileList.length === 0 || this.state.title === '' || this.state.subject === ''}
                        loading={uploading}
                      >
                        {uploading ? 'Uploading' : 'Start Upload'}
                      </Button>
                      <p className="error">{this.state.error}</p>
                    </div>
                  </Content>
                }
                {
                  this.state.key === '2' &&
                  <Content
                    className="content-container"
                  >
                    <h3>Name : {this.props.user.username}</h3>
                    <h3>Email : {this.props.user.email}</h3>
                    <h3>Number : {this.props.user.number}</h3>
                  </Content>
                }
                {
                  this.state.key === '3' &&
                  <Content
                    className="content-container"
                  >
                    <Row gutter={16} className="videoContainer2">
                      {this.props.reco && this.props.reco.map((val, key) => {
                        return <Col span={6} key={key}>
                          <Player
                            className="player2"
                            playsInline
                            src={val}
                          />
                        </Col>
                      })}
                    </Row>
                  </Content>
                }
              </Layout>
            </Layout>
          </Layout>
        }
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  user: user.user,
  loading: user.loading,
  keys: user.keys,
  reco: user.reco
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logOut,
  addEvent,
  addReco
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home))
