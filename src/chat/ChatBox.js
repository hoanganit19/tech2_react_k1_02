import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatBox.scss";
export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.chatUrl = "http://localhost:3004/messages";
    this.state = {
      messageData: [], //kho lưu trữ chung
      info: {
        //Thông tin khi nhập vào form
        username: "",
        message: "",
      },
    };
  }

  changeValue = (e) => {
    const data = { ...this.state.info };

    data[e.target.name] = e.target.value;

    this.setState({ info: data });
  };

  getMessage = () => {
    fetch(this.chatUrl)
    .then((response) => response.json())
    .then((messages) => {
      this.setState({
        messageData: messages,
      });
    });
  }

  componentDidMount = () => {
    //call api
    this.getMessage();
  };

  componentDidUpdate = () => {
    //call api
    this.getMessage();
  };

  sendMessage = (e) => {
    e.preventDefault();

    const messageDataNew = [...this.state.messageData];

    messageDataNew.push(this.state.info);

    fetch(this.chatUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.info),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          messageData: messageDataNew,
          info: {
            username: this.state.info.username,
            message: "",
          },
        });
      });
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className="text-center">ChatBox</h1>
          <div className="row">
            <div className="col-6">
              <div className="message mb-3">
                {this.state.messageData.map((messageItem, index) => {
                  return (
                    <div key={index} className="message__item">
                      <div className="message__item--content">
                        {messageItem.message}
                      </div>
                      <p className="message__item--name">
                        {messageItem.username}
                      </p>
                    </div>
                  );
                })}
              </div>
              <form onSubmit={this.sendMessage}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Tên của bạn..."
                    onChange={this.changeValue}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="message"
                    className="form-control"
                    placeholder="Vui lòng nhập tin nhắn..."
                    onChange={this.changeValue}
                    value={this.state.info.message}
                  />
                  <button type="submit" className="btn btn-primary send">
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
