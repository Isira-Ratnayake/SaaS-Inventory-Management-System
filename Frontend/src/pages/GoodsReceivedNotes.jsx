import SideNavigation from "../components/SideNavigation";

export function loader() {
  return null;
}
export function action() {
  return null;
}
export default function GoodsReceivedNotes() {
  return (
    <>
      <SideNavigation index="4" />

      {/* Dashboard */}
      <div className="container">
        <div className="main-content">
          <div className="header">
            <h1>Goods Received Notes Management</h1>
          </div>
          <div className="col text-end add-btn">
            <button
              className="btn edit-btn-theme btn-sm"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addUserModal"
            >
              &nbsp;<i className="fa-sharp fa-solid fa-circle-plus"></i>
              &nbsp;&nbsp;Add&nbsp;GRN&nbsp;&nbsp;
            </button>
          </div>
          <div className="row justify-content-end mb-3">
            <div className="col ms-3">
              <div className="row">
                <div className="col col-3">
                  <div className="row align-items-center">
                    <div className="col search-by-col-2">
                      <select
                        form="search-form"
                        name=""
                        className="form-select form-select-sm form-select-mod"
                      >
                        <option value="1">All</option>
                        <option value="3">GRN Date</option>
                        <option value="4">Status</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-3">
              <div className="row align-items-center">
                <div className="col search-by-col-1 text-end">
                  <label className="fw-bold">Search by: </label>
                </div>
                <div className="col search-by-col-2">
                  <select
                    form="search-form"
                    name=""
                    className="form-select form-select-sm form-select-mod"
                  >
                    <option value="1">User ID</option>
                    <option value="3">Full Name</option>
                    <option value="4">User Group</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col col-3">
              <form id="search-form" className="d-flex" method="GET" action="">
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control form-control-sm input-group-control-mod form-input-mod"
                    placeholder="Search..."
                    aria-describedby="basic-addon2"
                    name=""
                    value=""
                  />
                  <span
                    className="input-group-text input-group-text-mod form-input-mod"
                    id="basic-addon2"
                  >
                    <button className="action-btn" type="submit">
                      <i className="fa-sharp fa-solid fa-magnifying-glass fa-sm"></i>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="table-wrapper">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          GRN&nbsp;Number
                        </div>
                        <div className="col sort-caret">
                          <button
                            type="submit"
                            form="search-form"
                            name=""
                            value=""
                            className="sort-btn"
                          >
                            <i className="fa-sharp fa-solid fa-sort"></i>
                          </button>
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          GRN&nbsp;Date
                        </div>
                        <div className="col sort-caret">
                          <button
                            type="submit"
                            form="search-form"
                            name=""
                            value=""
                            className="sort-btn"
                          >
                            <i className="fa-sharp fa-solid fa-sort"></i>
                          </button>
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Status</div>
                        <div className="col sort-caret">
                          <button
                            type="submit"
                            form="search-form"
                            name=""
                            value=""
                            className="sort-btn"
                          >
                            <i className="fa-sharp fa-solid fa-sort"></i>
                          </button>
                        </div>
                      </div>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>JUID-001</td>
                    <td>LOREM IPSUM</td>
                    <td>email@email.com</td>
                    <td>
                      <div className="action-icons">
                        <button
                          type="submit"
                          className="action-btn"
                          title="View"
                          data-bs-toggle="modal"
                          data-bs-target="#viewUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-eye"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn"
                          title="Edit"
                          data-bs-toggle="modal"
                          data-bs-target="#editUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-pen"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn delete-btn"
                          title="Delete"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>JUID-001</td>
                    <td>LOREM IPSUM</td>
                    <td>email@email.com</td>
                    <td>
                      <div className="action-icons">
                        <button
                          type="submit"
                          className="action-btn"
                          title="View"
                          data-bs-toggle="modal"
                          data-bs-target="#viewUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-eye"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn"
                          title="Edit"
                          data-bs-toggle="modal"
                          data-bs-target="#editUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-pen"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn delete-btn"
                          title="Delete"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>JUID-001</td>
                    <td>LOREM IPSUM</td>
                    <td>email@email.com</td>
                    <td>
                      <div className="action-icons">
                        <button
                          type="submit"
                          className="action-btn"
                          title="View"
                          data-bs-toggle="modal"
                          data-bs-target="#viewUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-eye"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn"
                          title="Edit"
                          data-bs-toggle="modal"
                          data-bs-target="#editUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-pen"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn delete-btn"
                          title="Delete"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>JUID-001</td>
                    <td>LOREM IPSUM</td>
                    <td>email@email.com</td>
                    <td>
                      <div className="action-icons">
                        <button
                          type="submit"
                          className="action-btn"
                          title="View"
                          data-bs-toggle="modal"
                          data-bs-target="#viewUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-eye"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn"
                          title="Edit"
                          data-bs-toggle="modal"
                          data-bs-target="#editUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-pen"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn delete-btn"
                          title="Delete"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>JUID-001</td>
                    <td>LOREM IPSUM</td>
                    <td>email@email.com</td>
                    <td>
                      <div className="action-icons">
                        <button
                          type="submit"
                          className="action-btn"
                          title="View"
                          data-bs-toggle="modal"
                          data-bs-target="#viewUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-eye"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn"
                          title="Edit"
                          data-bs-toggle="modal"
                          data-bs-target="#editUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-pen"></i>
                        </button>
                        <button
                          type="submit"
                          className="action-btn delete-btn"
                          title="Delete"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteUserModal"
                        >
                          <i className="fa-sharp fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row pagination-row">
            <div className="col">
              <small className="pagination-text">
                Showing 1 - 5 of 5 Results
              </small>
            </div>
            <div className="col">
              <nav>
                <ul className="pagination pagination-sm justify-content-end align-items-center">
                  <li className="page-item">
                    <button
                      type="submit"
                      form="search-form"
                      className="page-link"
                      disabled
                    >
                      Previous
                    </button>
                  </li>
                  <li className="page-item">
                    <span className="active-page border-top border-bottom">
                      1
                    </span>
                  </li>
                  <li className="page-item">
                    <button
                      type="submit"
                      form="search-form"
                      name=""
                      value=""
                      className="page-link"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- modals --> */}
      {/* <!-- view modal --> */}
      <div
        className="modal modal-adjuster fade"
        id="viewUserModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header align-items-start">
              <div>
                <h4 className="page-header fs-5">
                  Goods Received Notes Management | View
                </h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover">
                <tbody className="modal-table-body">
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          GRN Number
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">UID-001</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">GRN Date</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">Lorem Ipsum</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Status</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      email@email.com
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- delete modal --> */}
      <div
        className="modal modal-adjuster fade"
        id="deleteUserModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header align-items-start">
              <div>
                <h4 className="page-header fs-5">
                  Goods Received Notes Management | Delete
                </h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover">
                <tbody className="modal-table-body">
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          GRN Number
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">UID-001</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">GRN Date</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">Lorem Ipsum</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Status</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      email@email.com
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn delete-btn-modal btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#updatePrivilegesModal"
              >
                &nbsp;<i className="fa-sharp fa-solid fa-trash"></i>
                &nbsp;&nbsp;Delete&nbsp;Record&nbsp;&nbsp;&nbsp;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- add modal --> */}
      <div
        className="modal modal-adjuster fade"
        id="addUserModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header align-items-start">
              <div>
                <h4 className="page-header">Add GRN</h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="col">Items</div>
              <div className="col text-end add-btn pe-2">
                <button
                  className="btn edit-btn-theme btn-sm"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addItemToGRNModal"
                >
                  &nbsp;<i className="fa-sharp fa-solid fa-circle-plus"></i>
                  &nbsp;&nbsp;Add&nbsp;Item&nbsp;to&nbsp;GRN&nbsp;
                </button>
              </div>
              <div className="table-wrapper">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <div className="row table-heading align-items-center">
                            <div className="col table-heading-title">
                              Item&nbsp;Id
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="row table-heading align-items-center">
                            <div className="col table-heading-title">Item</div>
                          </div>
                        </th>
                        <th>
                          <div className="row table-heading align-items-center">
                            <div className="col table-heading-title">
                              Unit Selling
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="row table-heading align-items-center">
                            <div className="col table-heading-title">
                              Unit Cost
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="row table-heading align-items-center">
                            <div className="col table-heading-title">
                              Quantity
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="row table-heading align-items-center">
                            <div className="col table-heading-title">
                              Total Item Cost
                            </div>
                          </div>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>
                          <div className="action-icons">
                            <button
                              type="submit"
                              className="action-btn"
                              title="Edit"
                              data-bs-toggle="modal"
                              data-bs-target="#addItemToGRNModal"
                            >
                              <i className="fa-sharp fa-solid fa-pen"></i>
                            </button>
                            <button
                              type="submit"
                              className="action-btn delete-btn"
                              title="Delete"
                              data-bs-toggle="modal"
                              data-bs-target="#"
                            >
                              <i className="fa-sharp fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td>
                          <div className="action-icons">
                            <button
                              type="submit"
                              className="action-btn"
                              title="Edit"
                              data-bs-toggle="modal"
                              data-bs-target="#addItemToGRNModal"
                            >
                              <i className="fa-sharp fa-solid fa-pen"></i>
                            </button>
                            <button
                              type="submit"
                              className="action-btn delete-btn"
                              title="Delete"
                              data-bs-toggle="modal"
                              data-bs-target="#"
                            >
                              <i className="fa-sharp fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row align-items-center justify-content-between my-5">
                <div className="col">Total Cost</div>
                <div className="col-auto">0.00</div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="col text-end add-btn pe-2">
                <button
                  type="submit"
                  className="btn edit-btn-theme btn-sm"
                  form="addUserGroupForm"
                >
                  &nbsp;<i className="fa-sharp fa-solid fa-circle-plus"></i>
                  &nbsp;&nbsp;Add&nbsp;GRN&nbsp;&nbsp;&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- edit modal --> */}
      <div
        className="modal modal-adjuster fade"
        id="editUserModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header align-items-start">
              <div>
                <h4 className="page-header fs-5">
                  Goods Received Notes Management | Edit
                </h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="addUserGroupForm" action="#" method="POST">
                <div className="mb-3">
                  <label
                    htmlFor="userGroupDescription"
                    className="form-label fw-bold"
                  >
                    GRN Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-input-mod"
                    id="userGroupDescription"
                    value="Lorem Ipsum"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="userGroupDescription"
                    className="form-label fw-bold"
                  >
                    GRN Date
                  </label>
                  <input
                    type="text"
                    className="form-control form-input-mod"
                    id="userGroupDescription"
                    value="email@email.com"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="userGroupDescription"
                    className="form-label fw-bold"
                  >
                    Status
                  </label>
                  <select className="form-select form-select-mod">
                    <option disabled value=""></option>
                    <option value="1" selected>
                      ADMINISTRATOR
                    </option>
                    <option value="2">MANAGER</option>
                    <option value="3">SALES REP</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <div className="col text-end add-btn pe-2">
                <button
                  type="submit"
                  className="btn edit-btn-theme btn-sm"
                  form="addUserGroupForm"
                >
                  &nbsp;<i className="fa-sharp fa-solid fa-pen"></i>
                  &nbsp;&nbsp;Edit&nbsp;Record&nbsp;&nbsp;&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- add Item to GRN modal --> */}
      <div
        className="modal modal-adjuster fade"
        id="addItemToGRNModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header align-items-start">
              <div>
                <h4 className="page-header">Add Item to GRN</h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="addUserGroupForm" action="#" method="POST">
                <div className="mb-3">
                  <label
                    htmlFor="userGroupDescription"
                    className="form-label fw-bold"
                  >
                    Item
                  </label>
                  <select className="form-select form-select-mod">
                    <option disabled value=""></option>
                    <option value="1" selected>
                      Item 1
                    </option>
                    <option value="2">Item 2</option>
                    <option value="3">Item 3</option>
                  </select>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label
                      htmlFor="userGroupDescription"
                      className="form-label fw-bold"
                    >
                      Unit Cost Price
                    </label>
                    <input
                      type="number"
                      className="form-control form-input-mod"
                      id="userGroupDescription"
                    />
                  </div>
                  <div className="col">
                    <label
                      htmlFor="userGroupDescription"
                      className="form-label fw-bold"
                    >
                      Unit Selling Price
                    </label>
                    <input
                      type="number"
                      className="form-control form-input-mod"
                      id="userGroupDescription"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="userGroupDescription"
                    className="form-label fw-bold"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control form-input-mod"
                    id="userGroupDescription"
                  />
                </div>
              </form>
              <div className="row align-items-center justify-content-between my-5">
                <div className="col">Total Item Cost</div>
                <div className="col-auto">0.00</div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="col text-end add-btn pe-2">
                <button
                  type="submit"
                  className="btn edit-btn-theme btn-sm"
                  form="addUserGroupForm"
                >
                  &nbsp;<i className="fa-sharp fa-solid fa-circle-plus"></i>
                  &nbsp;&nbsp;Add&nbsp;Item&nbsp;to&nbsp;GRN&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
