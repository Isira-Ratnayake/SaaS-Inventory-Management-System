import { useState } from "react";
import SearchFilterDropDown from "../components/SearchFilterDropdown";
import SideNavigation from "../components/SideNavigation";
import {
  getItemDetails,
  getPoProposedItems,
  getSupplierItems,
  searchPos,
} from "../api/poApi";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchBy = url.searchParams.get("searchBy") || "grnNumber";
  const searchValue = url.searchParams.get("searchValue") || "";
  const page = url.searchParams.get("page") || "1";
  const sortType = url.searchParams.get("sortType") || "created";
  const sortOrder = url.searchParams.get("sortOrder") || "desc";
  const locationId =
    url.searchParams.get("locationId") || sessionStorage.getItem("locationId");
  const filterValue = url.searchParams.get("filterValue") || "all";
  const poDataAPI = await searchPos(
    searchBy,
    searchValue,
    page,
    sortType,
    sortOrder,
    locationId,
    filterValue
  );
  const poData = { ...poDataAPI };
  return poData;
}
export function action() {
  return null;
}
export default function PurchaseOrders() {
  const { supplier } = useLoaderData();
  const [supplierList, setSupplierList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [modal, setModal] = useState({
    posNumber: "",
    posDate: "",
    supplierId: "",
    items: [],
    status: "",
    batchNo: "",
    createdBy: "",
  });
  const [itemModal, setItemModal] = useState({
    index: -1,
    itemId: "",
    itemName: "",
    supplier: "",
    orderQuantity: 0.0,
    stockOnHand: 0.0,
    maxQuantity: 0.0,
    safetyStock: 0.0,
    quantityOnOrder: 0.0,
    caller: "",
  });

  function roundToTwoDecimals(number) {
    return (Math.floor(number * 100) / 100).toFixed(2);
  }

  function clearModalData() {
    setModal(() => {
      return {
        posNumber: "",
        posDate: "",
        supplierId: "",
        items: [],
        status: "",
        batchNo: "",
        createdBy: "",
      };
    });

    const supArr = supplier.map((x) => x);
    setSupplierList(() => {
      return supArr;
    });
  }

  async function loadPoProposal(supplierId) {
    const opItemList = await getPoProposedItems(supplierId);
    setModal((prev) => {
      return {
        ...prev,
        items: opItemList,
      };
    });
  }

  async function loadSupplierItems(supplierId) {
    const itemArr = await getSupplierItems(supplierId);
    setItemList(() => {
      return itemArr;
    });
  }

  const activeItemGrid = modal.items.map((item) => {
    return (
      <tr key={item.itemId}>
        <td>{item.itemId}</td>
        <td>{item.itemName}</td>
        <td>{item.orderQuantity}</td>
        <td>
          <div className="action-icons">
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
    );
  });

  async function loadItemModalData(itemId) {
    const itemDetails = await getItemDetails(itemId);
    setItemModal((prev) => {
      return {
        ...prev,
        itemId: itemDetails.itemId,
        itemName: itemDetails.itemName,
        supplier: itemDetails.supplier,
        orderQuantity: itemDetails.orderQuantity,
        stockOnHand: itemDetails.stockOnHand,
        maxQuantity: itemDetails.maxQuantity,
        safetyStock: itemDetails.safetyStock,
        quantityOnOrder: itemDetails.quantityOnOrder,
      };
    });
  }

  function clearItemModalData() {
    setItemModal(() => {
      return {
        index: -1,
        itemId: "",
        itemName: "",
        supplier: "",
        orderQuantity: 0.0,
        stockOnHand: 0.0,
        maxQuantity: 0.0,
        safetyStock: 0.0,
        quantityOnOrder: 0.0,
        caller: "",
      };
    });
  }

  return (
    <>
      <SideNavigation index="7" />

      {/* Dashboard */}
      <div className="container">
        <div className="main-content">
          <div className="header">
            <h1>Purchase Order Management</h1>
          </div>
          <div className="col text-end add-btn">
            <button
              className="btn edit-btn-theme btn-sm"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addUserModal"
              onClick={() => {
                clearModalData();
              }}
            >
              &nbsp;<i className="fa-sharp fa-solid fa-circle-plus"></i>
              &nbsp;&nbsp;Add&nbsp;New&nbsp;Purchase&nbsp;Order&nbsp;&nbsp;&nbsp;
            </button>
          </div>
          <div className="row justify-content-end mb-3">
            <div className="col col-3">
              <div className="row align-items-center">
                <div className="col search-by-col-1 text-end">
                  <label className="fw-bold">Search by:&nbsp;&nbsp;</label>
                </div>
                <div className="col search-by-col-2">
                  <select
                    form="search-form"
                    name=""
                    className="form-select form-select-sm form-select-mod"
                  >
                    <option value="poNumber">PO Number</option>
                    <option value="poDate">Date</option>
                    <option value="supplier">Supplier</option>
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
                          PO&nbsp;Number
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
                          PO&nbsp;Date
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
                        <div className="col table-heading-title">Supplier</div>
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
                      </div>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>JUID-001</td>
                    <td>LOREM IPSUM</td>
                    <td>ADMINISTRATOR</td>
                    <td>PENDING</td>
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
                          title="Confirm"
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
                <h4 className="page-header">
                  Purchase Order Management | View
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
                        <div className="col table-heading-title">User ID</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">UID-001</td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Full Name</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">Lorem Ipsum</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Email</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      email@email.com
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          User Group
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      ADMINISTRATOR
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
                <h4 className="page-header">Users Management | Delete</h4>
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
                        <div className="col table-heading-title">User ID</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">UID-001</td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Full Name</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">Lorem Ipsum</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Email</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      email@email.com
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          User Group
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      ADMINISTRATOR
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
                &nbsp;&nbsp;Delete&nbsp;User&nbsp;&nbsp;&nbsp;
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
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header align-items-start">
              <div>
                <h4 className="page-header">
                  Purchase Order Management Management | Add
                </h4>
                <div className="mt-4 callback-text">
                  <span className="fw-bold">Pending PO Number: </span>
                  {/* {modal.static.grnId === ""
                    ? "loading..."
                    : modal.static.grnId} */}
                  123
                </div>
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
                    Supplier
                  </label>
                  <SearchFilterDropDown
                    dataList={supplierList}
                    value={modal.supplierId}
                    handleChange={(sId) => {
                      setModal((prev) => {
                        return {
                          ...prev,
                          supplierId: sId,
                        };
                      });
                      loadPoProposal(sId);
                    }}
                  />
                </div>
              </form>
              <div className="row mt-5">
                <div className="">
                  <label
                    htmlFor="userGroupDescription"
                    className="form-label fw-bold"
                  >
                    Purchase Order Items
                  </label>
                </div>
                <div className="col text-end add-btn pe-2">
                  <button
                    className="btn btn-theme btn-sm add-to-grn-btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#addtopo"
                    disabled={navigation.state === "submitting"}
                    onClick={() => {
                      setItemModal((prevItemModal) => {
                        return {
                          ...prevItemModal,
                          caller: "addUserModal",
                        };
                      });
                      //   setItemsState(() => {
                      //     // const itemsArray = items.filter((item) => {
                      //     //   return (
                      //     //     modal.items.filter(
                      //     //       (modalItem) => modalItem.id === item.id
                      //     //     ).length === 0
                      //     //   );
                      //     // });
                      //     // setItemsState(() => {
                      //     //   return itemsArray;
                      //     // });
                      //   });
                      loadSupplierItems(modal.supplierId);
                    }}
                  >
                    &nbsp;
                    <i className="fa-sharp fa-solid fa-plus"></i>
                    &nbsp;&nbsp;Add&nbsp;Item&nbsp;to&nbsp;PO&nbsp;&nbsp;&nbsp;
                  </button>
                </div>
              </div>
              <div className="table-wrapper mt-0 mb-5">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <div className="row table-heading align-items-center">
                            <div className="col table-heading-title">
                              Item&nbsp;ID
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="row table-heading align-items-center">
                            <div className="col table-heading-title">
                              Item&nbsp;Description
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="row table-heading align-items-center">
                            <div className="col table-heading-title">
                              Order Quantity
                            </div>
                          </div>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{activeItemGrid}</tbody>
                  </table>
                </div>
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
                  &nbsp;&nbsp;Add&nbsp;New&nbsp;Purchase&nbsp;Order&nbsp;&nbsp;&nbsp;
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
                <h4 className="page-header">Users Management | Edit</h4>
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
                    Full Name
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
                    Email
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
                    User Group
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
                  &nbsp;&nbsp;Edit&nbsp;User&nbsp;&nbsp;&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add item to po */}
      <div
        className="modal modal-adjuster fade"
        id="addtopo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header align-items-start">
              <div>
                <h4 className="page-header">Add Item to PO</h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-toggle="modal"
                data-bs-target={`#${itemModal.caller}`}
                onClick={() => {
                  clearItemModalData();
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-5">
                <label
                  htmlFor="userGroupDescription"
                  className="form-label fw-bold"
                >
                  Items
                </label>
                <SearchFilterDropDown
                  dataList={itemList}
                  value={itemModal.itemId}
                  handleChange={(itemId) => {
                    setItemModal((prev) => {
                      return {
                        ...prev,
                        itemId: itemId,
                      };
                    });
                    loadItemModalData(itemId);
                  }}
                />
              </div>

              <table className="table table-hover">
                <tbody className="modal-table-body">
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Item ID</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.itemId}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Item Name</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.itemName}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Supplier</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.supplier}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          Stock on Hand
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.stockOnHand}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          Maximum Quantity
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.maxQuantity}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          Safety Stock
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.safetyStock}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          Quantity on Order
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.quantityOnOrder}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mb-3">
                <label
                  htmlFor="userGroupDescription"
                  className="form-label fw-bold"
                >
                  Order Quantity
                </label>
                <input
                  type="number"
                  className="form-control form-input-mod"
                  id="userGroupDescription"
                  min="0.00"
                  max="999999.99"
                  value={itemModal.orderQuantity || 0.0}
                  onChange={(event) => {
                    setItemModal((prev) => {
                      return {
                        ...prev,
                        orderQuantity: Number(event.target.value),
                      };
                    });
                  }}
                />
                {/* {
                  <div
                    id={`warning-msg ${
                      itemModal.stockOnHand + itemModal.orderQuantity >
                      itemModal.maxQuantity
                        ? ""
                        : "hide-text"
                    }`}
                    className="form-text"
                  >
                    Overstocked situation. Please decrease order quantity.
                  </div>
                }
                {
                  <div
                    id={`warning-msg ${
                      itemModal.stockOnHand + itemModal.orderQuantity <
                      itemModal.safetyStock
                        ? ""
                        : "hide-text"
                    }`}
                    className="form-text"
                  >
                    Understocked situation. Please increase order quantity.
                  </div>
                } */}
              </div>
            </div>
            <div className="modal-footer">
              <div className="col text-end add-btn pe-2">
                <button
                  type="button"
                  className="btn edit-btn-theme btn-sm"
                  form="addUserGroupForm"
                  data-bs-toggle="modal"
                  data-bs-target={`#${itemModal.caller}`}
                  onClick={() => {
                    const items = modal.items.map((x) => x);
                    items.push({
                      itemId: itemModal.itemId,
                      itemName: itemModal.itemName,
                      orderQuantity: itemModal.orderQuantity,
                    });
                    setModal((prevModal) => {
                      return {
                        ...prevModal,
                        items: items,
                      };
                    });
                    clearItemModalData();
                  }}
                >
                  &nbsp;<i className="fa-sharp fa-solid fa-plus"></i>
                  &nbsp;&nbsp;Add&nbsp;Item&nbsp;to&nbsp;PO&nbsp;&nbsp;&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* edit po item */}
      <div
        className="modal modal-adjuster fade"
        id="addtopo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header align-items-start">
              <div>
                <h4 className="page-header">Add Item to PO</h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-toggle="modal"
                data-bs-target={`#${itemModal.caller}`}
                onClick={() => {
                  clearItemModalData();
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-5">
                <label
                  htmlFor="userGroupDescription"
                  className="form-label fw-bold"
                >
                  Items
                </label>
                <SearchFilterDropDown
                  dataList={itemList}
                  value={itemModal.itemId}
                  handleChange={(itemId) => {
                    setItemModal((prev) => {
                      return {
                        ...prev,
                        itemId: itemId,
                      };
                    });
                    loadItemModalData(itemId);
                  }}
                />
              </div>

              <table className="table table-hover">
                <tbody className="modal-table-body">
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Item ID</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.itemId}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Item Name</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.itemName}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Supplier</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.supplier}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          Stock on Hand
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.stockOnHand}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          Maximum Quantity
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.maxQuantity}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          Safety Stock
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.safetyStock}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">
                          Quantity on Order
                        </div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {itemModal.quantityOnOrder}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mb-3">
                <label
                  htmlFor="userGroupDescription"
                  className="form-label fw-bold"
                >
                  Order Quantity
                </label>
                <input
                  type="number"
                  className="form-control form-input-mod"
                  id="userGroupDescription"
                  min="0.00"
                  max="999999.99"
                  value={itemModal.orderQuantity || 0.0}
                  onChange={(event) => {
                    setItemModal((prev) => {
                      return {
                        ...prev,
                        orderQuantity: Number(event.target.value),
                      };
                    });
                  }}
                />
                {/* {
                  <div
                    id={`warning-msg ${
                      itemModal.stockOnHand + itemModal.orderQuantity >
                      itemModal.maxQuantity
                        ? ""
                        : "hide-text"
                    }`}
                    className="form-text"
                  >
                    Overstocked situation. Please decrease order quantity.
                  </div>
                }
                {
                  <div
                    id={`warning-msg ${
                      itemModal.stockOnHand + itemModal.orderQuantity <
                      itemModal.safetyStock
                        ? ""
                        : "hide-text"
                    }`}
                    className="form-text"
                  >
                    Understocked situation. Please increase order quantity.
                  </div>
                } */}
              </div>
            </div>
            <div className="modal-footer">
              <div className="col text-end add-btn pe-2">
                <button
                  type="button"
                  className="btn edit-btn-theme btn-sm"
                  form="addUserGroupForm"
                  data-bs-toggle="modal"
                  data-bs-target={`#${itemModal.caller}`}
                  onClick={() => {
                    const items = modal.items.map((x) => x);
                    items.splice(itemModal.index, 1, {
                      itemId: itemModal.itemId,
                      itemName: itemModal.itemName,
                      orderQuantity: itemModal.orderQuantity,
                    });
                    setModal((prevModal) => {
                      return {
                        ...prevModal,
                        items: items,
                      };
                    });
                    clearItemModalData();
                  }}
                >
                  &nbsp;<i className="fa-sharp fa-solid fa-plus"></i>
                  &nbsp;&nbsp;Add&nbsp;Item&nbsp;to&nbsp;PO&nbsp;&nbsp;&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
