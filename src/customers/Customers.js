import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "./Customers.scss";

export default class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      action: "lists",
      form: {
        id: 0,
        name: "",
        email: "",
        phone: "",
      },
      errors: {},
      msg: "",
      msgType: "danger",
      isLoading: true,
      paginate: {
        maxPage: 0,
        currentPage: 1,
      },
      filters: {
        status: "all",
        keywords: "",
      },
      deleteRef: []
    };

    this.customersApi = "http://localhost:3004/customers";

    this.perPage = 3;
    
    this.deleteButtonRef = React.createRef();

    this.deleteCountRef = React.createRef();

    this.checkAllRef = React.createRef();
  }

  getFilterQuery = () => {
    const queryArr = [];
    let queryString = "";

    Object.keys(this.state.filters).forEach((fieldName) => {
      if (fieldName === "status") {
        if (
          this.state.filters.status == "active" ||
          this.state.filters.status == "inactive"
        ) {
          let status = 0;

          if (this.state.filters.status == "active") {
            status = 1;
          }

          queryArr.push(`status=${status}`);
        }
      } else if (this.state.filters.keywords) {
        queryArr.push(`q=${this.state.filters.keywords}`);
      }
    });

    if (queryArr.length) {
      queryString = queryArr.join("&");
    }

    return queryString;
  };

  setMaxPage = () => {
    const queryString = this.getFilterQuery();

    let customerApi = this.customersApi;
    if (customerApi.indexOf("?") === -1) {
      customerApi += "?" + queryString;
    } else {
      customerApi += "&" + queryString;
    }

    fetch(customerApi)
      .then((response) => response.json())
      .then((customers) => {
        const maxPage = Math.ceil(customers.length / this.perPage);

        const paginate = { ...this.state.paginate };

        paginate.maxPage = maxPage;

        this.setState({
          paginate: paginate,
        });
      });
  };

  getUsers = () => {
    const queryString = "&" + this.getFilterQuery();

    fetch(
      this.customersApi +
        `?_page=${this.state.paginate.currentPage}&_limit=${this.perPage}${queryString}`
    )
      .then((response) => response.json())
      .then((customers) => {
        customers.forEach(customer => {
            //Create Ref
            const deleteRef = [];
        
            this.state.customers.forEach(customer => {
              
              deleteRef.push(React.createRef());
              this.setState({
                deleteRef: deleteRef
              });
          });

        
          
        });
        this.setState({
          customers: customers,
          isLoading: false,
        });
      });
  };

  getUser = (userId) => {
    fetch(this.customersApi + "/" + userId)
      .then((response) => response.json())
      .then((customer) => {


        this.setState({
          form: customer,
        });
      });
  };

  deleteUser = (userId) => {
    fetch(this.customersApi + "/" + userId, {
      method: "DELETE",
    });
  };

  componentDidMount() {
    this.getUsers();
    this.setMaxPage();

  }

  componentDidUpdate() {
    setTimeout(() => {
      this.getUsers();
      
    }, 500);
  }

  paginateRender = () => {
    let paginateItem = [];
    let active;
    const currentPage = this.state.paginate.currentPage;

    for (let page = 1; page <= this.state.paginate.maxPage; page++) {
      active = parseInt(page) === parseInt(currentPage) ? "active" : "";
      paginateItem.push(
        <li
          key={page}
          className={`page-item ${active}`}
          onClick={(e) => {
            e.preventDefault();
            this.goPaginate(page);
          }}
        >
          <a className="page-link" href="#">
            {page}
          </a>
        </li>
      );
    }

    return (
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-end"
      >
        <ul className="pagination">
          {this.state.paginate.currentPage > 1 ? (
            <li className="page-item">
              <a className="page-link" href="#" onClick={this.prevPaginate}>
                Trước
              </a>
            </li>
          ) : (
            false
          )}

          {paginateItem}
          {this.state.paginate.currentPage < this.state.paginate.maxPage ? (
            <li className="page-item">
              <a className="page-link" href="#" onClick={this.nextPaginate}>
                Sau
              </a>
            </li>
          ) : (
            false
          )}
        </ul>
      </nav>
    );
  };

  goPaginate = (page) => {
    const paginate = { ...this.state.paginate };

    paginate.currentPage = page;
    this.setState({
      paginate: paginate,
      isLoading: true,
    });

    this.checkAllRef.current.checked = false;
  };

  prevPaginate = (e) => {
    e.preventDefault();
    let page = this.state.paginate.currentPage;
    page = page - 1;
    if (page < 0) {
      page = 1;
    }

    this.goPaginate(page);
  };

  nextPaginate = (e) => {
    e.preventDefault();
    let page = this.state.paginate.currentPage;
    page = page + 1;
    if (page > this.state.paginate.maxPage) {
      page = this.state.paginate.maxPage;
    }

    this.goPaginate(page);
  };

  customersRender = () => {
    let count = 0;
    if (this.state.isLoading) {
      return (
        <tr>
          <td colSpan={6}>
            <div className="alert alert-success text-center">
              Đang tải dữ liệu...
            </div>
          </td>
        </tr>
      );
    }
    
    return this.state.customers.map((customer, index) => {
  
      return (
        <tr key={customer.id}>
          <td>
            <input
              type="checkbox"
              className="delete"
              value={customer.id}
              key={this.state.checkAll}
              defaultChecked={this.state.checkAll}
              onChange={this.handleChangeDelete}
              ref={this.state.deleteRef[index]}
            />
          </td>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td>
            {customer.status ? (
              <button className="btn btn-success btn-sm">Kích hoạt</button>
            ) : (
              <button className="btn btn-danger btn-sm">Chưa kích hoạt</button>
            )}
          </td>
          <td>
            <a
              href="#"
              className="btn btn-warning btn-sm"
              onClick={(e) => {
                e.preventDefault();
                this.handleAction("update", e.target.dataset.id);
              }}
              data-id={customer.id}
            >
              Sửa
            </a>
          </td>
          <td>
            <a
              href="#"
              data-id={customer.id}
              onClick={(e) => {
                e.preventDefault();

                this.handleDeleteSubmit(e.target.dataset.id);
              }}
              className="btn btn-danger btn-sm"
            >
              Xoá
            </a>
          </td>
        </tr>
      );
    });
  };

  renderAction = () => {
    let jsx;
    switch (this.state.action) {
      case "add":
        jsx = (
          <>
            <h1>Thêm khách hàng</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.handleAction("lists");
              }}
            >
              Quay lại
            </button>
            <hr />
            {this.state.msg !== "" ? (
              <div className={`alert alert-${this.state.msgType} text-center`}>
                {this.state.msg}
              </div>
            ) : (
              false
            )}
            <form onSubmit={this.handleAddSubmit}>
              <div className="mb-3">
                <label>Tên</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Tên"
                  value={this.state.form.name}
                  onChange={this.changeValue}
                />
                {this.state.errors.name ? (
                  <span style={{ color: "red" }}>{this.state.errors.name}</span>
                ) : (
                  false
                )}
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={this.state.form.email}
                  onChange={this.changeValue}
                />
                {this.state.errors.email ? (
                  <span style={{ color: "red" }}>
                    {this.state.errors.email}
                  </span>
                ) : (
                  false
                )}
              </div>

              <div className="mb-3">
                <label>Điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Điện thoại"
                  value={this.state.form.phone}
                  onChange={this.changeValue}
                />
                {this.state.errors.phone ? (
                  <span style={{ color: "red" }}>
                    {this.state.errors.phone}
                  </span>
                ) : (
                  false
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Thêm mới
              </button>
            </form>
          </>
        );
        break;

      case "update":
        jsx = (
          <>
            <h1>Cập nhật khách hàng</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.handleAction("lists");
              }}
            >
              Quay lại
            </button>
            <hr />
            {this.state.msg !== "" ? (
              <div className={`alert alert-${this.state.msgType} text-center`}>
                {this.state.msg}
              </div>
            ) : (
              false
            )}
            <form onSubmit={this.handleUpdateSubmit}>
              <div className="mb-3">
                <label>Tên</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Tên"
                  value={this.state.form.name}
                  onChange={this.changeValue}
                />
                {this.state.errors.name ? (
                  <span style={{ color: "red" }}>{this.state.errors.name}</span>
                ) : (
                  false
                )}
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={this.state.form.email}
                  onChange={this.changeValue}
                />
                {this.state.errors.email ? (
                  <span style={{ color: "red" }}>
                    {this.state.errors.email}
                  </span>
                ) : (
                  false
                )}
              </div>

              <div className="mb-3">
                <label>Điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Điện thoại"
                  value={this.state.form.phone}
                  onChange={this.changeValue}
                />
                {this.state.errors.phone ? (
                  <span style={{ color: "red" }}>
                    {this.state.errors.phone}
                  </span>
                ) : (
                  false
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Lưu thay đổi
              </button>
            </form>
          </>
        );

        break;

      default:
        jsx = (
          <>
            <h1>Danh sách khách hàng</h1>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.handleAction("add");
              }}
            >
              Thêm mới
            </button>
            <hr />
            <form onSubmit={this.handleFilters}>
              <div className="row">
                <div className="col-3">
                  <select
                    name="status"
                    className="form-control"
                    onChange={this.changeValueFilter}
                  >
                    <option value={"all"}>Tất cả trạng thái</option>
                    <option value={"active"}>Kích hoạt</option>
                    <option value={"inactive"}>Chưa kích hoạt</option>
                  </select>
                </div>
                <div className="col-7">
                  <input
                    type="search"
                    name="keywords"
                    className="form-control"
                    placeholder="Từ khoá tìm kiếm..."
                    onChange={this.changeValueFilter}
                  />
                </div>
                <div className="col-2">
                  <button type="submit" className="btn btn-primary">
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </form>
            <hr />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="5%">
                    <input
                      type="checkbox"
                      className="checkAll"
                      onChange={this.checkAll}
                      ref = {this.checkAllRef}
                    />
                  </th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Điện thoại</th>
                  <th>Trạng thái</th>
                  <th width="5%">Sửa</th>
                  <th width="5%">Xoá</th>
                </tr>
              </thead>
              <tbody>{this.customersRender()}</tbody>
            </table>
            <button type="button" ref={this.deleteButtonRef} className="btn btn-danger disabled">
              Xoá đã chọn (<span ref={this.deleteCountRef}>0</span>)
            </button>
            {this.paginateRender()}
          </>
        );
        break;
    }

    return jsx;
  };

  handleAction = (action, id = 0) => {
    if (id !== 0) {
      this.getUser(id);
    }

    this.setState({
      action: action,
    });
  };

  handleAddSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    let msg = "";

    const { name, email, phone } = this.state.form;

    if (name === "") {
      errors.name = "Vui lòng nhập tên";
    }

    if (email === "") {
      errors.email = "Vui lòng nhập email";
    }

    if (phone === "") {
      errors.phone = "Vui lòng nhập điện thoại";
    }

    if (Object.keys(errors).length) {
      msg = "Vui lòng kiểm tra các lỗi bên dưới";
    } else {
      //post api
      fetch(this.customersApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.form),
      })
        .then((response) => response.json())
        .then((customer) => {
          if (typeof customer === "object") {
            this.setState({
              form: {
                name: "",
                email: "",
                phone: "",
              },
            });
            this.handleAction("lists");
          }
        });
    }

    this.setState({
      errors: errors,
      msg: msg,
    });
  };

  handleUpdateSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    let msg = "";

    const { name, email, phone } = this.state.form;

    if (name === "") {
      errors.name = "Vui lòng nhập tên";
    }

    if (email === "") {
      errors.email = "Vui lòng nhập email";
    }

    if (phone === "") {
      errors.phone = "Vui lòng nhập điện thoại";
    }

    if (Object.keys(errors).length) {
      msg = "Vui lòng kiểm tra các lỗi bên dưới";
    } else {
      //post api
      fetch(this.customersApi + "/" + this.state.form.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.form),
      })
        .then((response) => response.json())
        .then((customer) => {
          if (typeof customer === "object") {
            // this.handleAction('lists');
            this.setState({
              msg: "Cập nhật thành công",
              msgType: "success",
            });
          }
        });
    }

    this.setState({
      errors: errors,
      msg: msg,
    });
  };

  handleDeleteSubmit = (id) => {
    confirmAlert({
      title: "Bạn có chắc chắn muốn xoá?",
      message: "Nếu xoá bạn sẽ không thể khôi phục",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            this.deleteUser(id);
          },
        },
        {
          label: "Không",
          onClick: () => {},
        },
      ],
    });
  };

  handleFilters = (e) => {
    e.preventDefault();
    //console.log(this.state.filters);
  };

  changeValueFilter = (e) => {
    e.preventDefault();
    const data = { ...this.state.filters };

    data[e.target.name] = e.target.value;

    this.setState({
      filters: data,
    });

    setTimeout(() => {
      this.setMaxPage();
      this.resetCheckboxDelete();
    }, 0);
    
  };

  changeValue = (e) => {
    e.preventDefault();
    const data = { ...this.state.form };

    data[e.target.name] = e.target.value;

    this.setState({
      form: data,
    });
  };

  checkAll = (e) => { 
      const checked = this.checkAllRef.current.checked;

      this.state.deleteRef.forEach(checkbox => {
          checkbox.current.checked = checked;
      });

      this.handleChangeDelete();
  };

  handleChangeDelete = (e) => {
    //console.log(e.target.checked);
    
    let countChecked = 0;

    this.state.deleteRef.forEach(checkbox => {
        if (checkbox.current.checked){
          countChecked++;
        }
    });

    this.deleteCountRef.current.innerText = countChecked;

    if (countChecked>0){
        this.deleteButtonRef.current.classList.remove('disabled');
    }else{
        this.deleteButtonRef.current.classList.add('disabled');
    }

    //Xử lý tự động check all
    if (countChecked==this.state.customers.length){
      this.checkAllRef.current.checked = true;
    }else{
      this.checkAllRef.current.checked = false;
    }
  }

  resetCheckboxDelete = () => {
    this.checkAllRef.current.checked = false;
    this.state.deleteRef.forEach(checkbox => {
        checkbox.current.checked = false;
    });
    this.handleChangeDelete();
  }

  render() {
    return (
      <>
        <div className="container">{this.renderAction()}</div>
      </>
    );
  }
}
