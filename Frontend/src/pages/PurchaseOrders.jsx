import { useEffect, useState } from "react";
import SearchFilterDropDown from "../components/SearchFilterDropdown";
import SideNavigation from "../components/SideNavigation";
import {
  addPon,
  cancelPo,
  confirmPo,
  getItemDetails,
  getPoProposedItems,
  getSupplierItems,
  searchPos,
} from "../api/poApi";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import ServerMessageToast from "../components/ServerMessageToast";

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
export async function action({ request }) {
  const formData = await request.formData();
  const formType = formData.get("formType");
  if (formType === "addpo") {
    const supplierId = formData.get("supplierId");
    const items = JSON.parse(formData.get("items"));
    let itemArr = [];
    items.map((item) => {
      itemArr.push({
        itemId: item.itemId,
        orderQuantity: item.orderQuantity,
      });
    });
    let response = await addPon(supplierId, JSON.stringify(itemArr));

    if (response !== null) {
      response = {
        ...response,
        formType: formType,
      };
      return response;
    }
    return null;
  }
  if (formType === "cancelpo") {
    const poNumber = formData.get("poNumber");
    let response = await cancelPo(poNumber);

    if (response !== null) {
      response = {
        ...response,
        formType: formType,
      };
      return response;
    }
    return null;
  }
  if (formType === "confirmpo") {
    const poNumber = formData.get("poNumber");
    let response = await confirmPo(poNumber);

    if (response !== null) {
      response = {
        ...response,
        formType: formType,
      };
      return response;
    }
    return null;
  }

  if (formType === "cancelpo") {
    const poNumber = formData.get("poNumber");
    let response = await cancelPo(poNumber);

    if (response !== null) {
      response = {
        ...response,
        formType: formType,
      };
      return response;
    }
    return null;
  }

  return null;
}
export default function PurchaseOrders() {
  const { supplier, poDtos } = useLoaderData();
  const [supplierList, setSupplierList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [modal, setModal] = useState({
    posNumber: "",
    posDate: "",
    supplierId: "",
    items: [],
    status: "",
    canceled: false,
    fullfilled: false,
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
  const response = useActionData();
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    if (
      response !== undefined &&
      response !== null &&
      response.message !== undefined
    ) {
      if (response.formType === "addpo" && response.message.success) {
        document.getElementById("addModalClose").click();
        setTimeout(function () {
          clearModalData();
        }, 500);
      }
      if (response.formType === "cancelpo" && response.message.success) {
        document.getElementById("cancelModalClose").click();
        setTimeout(function () {
          clearModalData();
        }, 500);
      }
      if (response.formType === "confirmpo" && response.message.success) {
        document.getElementById("confirmModalClose").click();
        setTimeout(function () {
          clearModalData();
        }, 500);
      }
    }
    setToasts((prevToasts) => {
      const newTosts = prevToasts.map((x) => x);
      newTosts.unshift(
        <ServerMessageToast
          key={prevToasts.length + 1}
          message={response?.message}
          id={prevToasts.length + 1}
        />
      );
      return newTosts;
    });
  }, [response]);

  function clearModalData() {
    setModal(() => {
      return {
        posNumber: "",
        posDate: "",
        supplierId: "",
        items: [],
        status: "",
        canceled: false,
        fullfilled: false,
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
    const itemsArray = itemArr.filter((item) => {
      return (
        modal.items.filter((modalItem) => modalItem.itemId === item.id)
          .length === 0
      );
    });
    setItemList(() => {
      return itemsArray;
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
              type="button"
              className="action-btn"
              title="Edit"
              data-bs-toggle="modal"
              data-bs-target="#edittopo"
              onClick={() => {
                setItemModal((prev) => {
                  return {
                    ...prev,
                    caller: "addUserModal",
                  };
                });
                setItemList(() => {
                  return [];
                });
                loadItemModalData(item.itemId);
                const index = modal.items.indexOf(item);
                setItemModal((prev) => {
                  return {
                    ...prev,
                    index: index,
                    orderQuantity: item.orderQuantity,
                  };
                });
              }}
            >
              <i className="fa-sharp fa-solid fa-pen"></i>
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              title="Delete"
              onClick={() => {
                const items = modal.items.map((x) => x);
                const index = items.indexOf(item);
                if (index > -1) {
                  items.splice(index, 1);
                  setModal((prevModal) => {
                    return {
                      ...prevModal,
                      items: items,
                    };
                  });
                }
              }}
            >
              <i className="fa-sharp fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    );
  });

  const inactiveItemGrid = modal.items.map((item) => {
    return (
      <tr key={`${modal.posNumber}-${item.itemId}`}>
        <td>{item.itemId}</td>
        <td>{item.itemName}</td>
        <td>{item.orderQuantity}</td>
      </tr>
    );
  });

  const itemGrid = poDtos.map((po) => {
    return (
      <tr key={po.poNumber}>
        <td>{po.poNumber}</td>
        <td>{po.poDate}</td>
        <td>
          {supplier.filter((s) => s.id === po.supplierId)[0]?.description}
        </td>
        <td>
          {po.fullFilled ? (
            <span className="badge rounded-pill text-success-emphasis bg-success-subtle fs-custom">
              &nbsp;&nbsp; RECEIVED &nbsp;&nbsp;
            </span>
          ) : !po.canceled && !po.fullFilled ? (
            <span className="badge rounded-pill text-secondary-emphasis bg-secondary-subtle fs-custom">
              &nbsp;&nbsp; PENDING &nbsp;&nbsp;
            </span>
          ) : (
            <span className="badge rounded-pill text-danger-emphasis bg-danger-subtle fs-custom">
              &nbsp;&nbsp; CANCELED &nbsp;&nbsp;
            </span>
          )}
        </td>
        <td>
          <div className="action-icons">
            <button
              type="button"
              className="action-btn"
              title="View"
              data-bs-toggle="modal"
              data-bs-target="#viewUserModal"
              onClick={() => {
                loadModalData(po.poNumber);
              }}
            >
              <i className="fa-sharp fa-solid fa-eye"></i>
            </button>
            <button
              type="button"
              className="action-btn"
              title="Confirm"
              data-bs-toggle="modal"
              data-bs-target="#editUserModal"
              disabled={po.canceled || po.fullFilled}
              onClick={() => {
                loadModalData(po.poNumber);
              }}
            >
              <i className="fa-sharp fa-solid fa-circle-check"></i>
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              title="Delete"
              data-bs-toggle="modal"
              data-bs-target="#deleteUserModal"
              disabled={po.canceled || po.fullFilled}
              onClick={() => {
                loadModalData(po.poNumber);
              }}
            >
              <i className="fa-sharp fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    );
  });
  // function roundToTwoDecimals(number) {
  //   return (Math.floor(number * 100) / 100).toFixed(2);
  // }

  async function loadItemModalData(itemId) {
    const itemDetails = await getItemDetails(itemId);
    setItemModal((prev) => {
      return {
        ...prev,
        itemId: itemDetails.itemId,
        itemName: itemDetails.itemName,
        supplier: itemDetails.supplier,
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

  function loadModalData(poNumber) {
    const po = poDtos.filter((po) => po.poNumber === poNumber)[0];
    setModal((prev) => {
      return {
        ...prev,
        posNumber: po.poNumber,
        posDate: po.poDate,
        supplierId: po.supplierId,
        items: po.items,
        canceled: po.canceled,
        fullfilled: po.fullfilled,
      };
    });
  }

  function dataGridOffset(dataGrid) {
    for (let i = poDtos.length; i < 5; i++) {
      dataGrid.push(
        <tr key={i}>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      );
    }
    return dataGrid;
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
                <tbody>{dataGridOffset(itemGrid)}</tbody>
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
                  <h4>PO Details</h4>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">PO Number</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {modal.posNumber}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">PO Date</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {modal.posDate}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Supplier</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {
                        supplier.filter((s) => s.id === modal.supplierId)[0]
                          ?.description
                      }
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Status</div>
                      </div>
                    </th>
                    <td>
                      {!modal.canceled && modal.fullfilled
                        ? "RECEIVED"
                        : !modal.canceled && !modal.fullfilled
                        ? "PENDING"
                        : "CANCELED"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="table-wrapper mt-0 mb-5">
                <div className="table-container">
                  <table>
                    <thead>
                      <h4>Items</h4>
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
                      </tr>
                    </thead>
                    <tbody>{inactiveItemGrid}</tbody>
                  </table>
                </div>
              </div>
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
                <h4 className="page-header">
                  Purchase Order Management | Cancel
                </h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="cancelModalClose"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover">
                <tbody className="modal-table-body">
                  <h4>PO Details</h4>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">PO Number</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {modal.posNumber}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">PO Date</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {modal.posDate}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Supplier</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {
                        supplier.filter((s) => s.id === modal.supplierId)[0]
                          ?.description
                      }
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Status</div>
                      </div>
                    </th>
                    <td>
                      {modal.fullFilled
                        ? "RECEIVED"
                        : !modal.canceled && !modal.fullFilled
                        ? "PENDING"
                        : "CANCELED"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="table-wrapper mt-0 mb-5">
                <div className="table-container">
                  <table>
                    <thead>
                      <h4>Items</h4>
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
                      </tr>
                    </thead>
                    <tbody>{inactiveItemGrid}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Form id="cancelpo" method="post">
                <input type="hidden" name="formType" value="cancelpo" />
                <input type="hidden" name="poNumber" value={modal.posNumber} />
              </Form>
              <button
                type="submit"
                form="cancelpo"
                className="btn delete-btn-modal btn-sm"
              >
                &nbsp;<i className="fa-sharp fa-solid fa-trash"></i>
                &nbsp;&nbsp;Cancel&nbsp;Purchase&nbsp;Order&nbsp;&nbsp;
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
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="addModalClose"
              ></button>
            </div>
            <div className="modal-body">
              <Form id="addpo" method="POST">
                <input
                  type="hidden"
                  name="supplierId"
                  value={modal.supplierId}
                  readOnly={true}
                />
                <input
                  type="hidden"
                  name="items"
                  value={JSON.stringify(modal.items)}
                  readOnly={true}
                />
                <input
                  type="hidden"
                  name="formType"
                  value="addpo"
                  readOnly={true}
                />
              </Form>
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
                    disabled={
                      modal.supplierId === null || modal.supplierId === ""
                    }
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
                  form="addpo"
                  className="btn edit-btn-theme btn-sm"
                  disabled={
                    modal.supplierId === "" ||
                    modal.supplierId === null ||
                    modal.items.length <= 0
                  }
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
                <h4 className="page-header">
                  Purchase Order Management | Cofirmation
                </h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="confirmModalClose"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover">
                <tbody className="modal-table-body">
                  <h4>PO Details</h4>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">PO Number</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {modal.posNumber}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">PO Date</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {modal.posDate}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Supplier</div>
                      </div>
                    </th>
                    <td className="text-truncate align-middle">
                      {
                        supplier.filter((s) => s.id === modal.supplierId)[0]
                          ?.description
                      }
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="row table-heading align-items-center">
                        <div className="col table-heading-title">Status</div>
                      </div>
                    </th>
                    <td>
                      {!modal.canceled && modal.fullfilled
                        ? "RECEIVED"
                        : !modal.canceled && !modal.fullfilled
                        ? "PENDING"
                        : "CANCELED"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="table-wrapper mt-0 mb-5">
                <div className="table-container">
                  <table>
                    <thead>
                      <h4>Items</h4>
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
                      </tr>
                    </thead>
                    <tbody>{inactiveItemGrid}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="col text-end add-btn pe-2">
                <Form id="confirmpo" method="post">
                  <input type="hidden" name="formType" value="confirmpo" />
                  <input
                    type="hidden"
                    name="poNumber"
                    value={modal.posNumber}
                  />
                </Form>
                <button
                  form="confirmpo"
                  type="submit"
                  className="btn edit-btn-theme btn-sm"
                >
                  &nbsp;<i className="fa-sharp fa-solid fa-circle-check"></i>
                  &nbsp;&nbsp;Confirm&nbsp;Purchase&nbsp;Order&nbsp;&nbsp;&nbsp;
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
                      Number(itemModal.stockOnHand) +
                        Number(itemModal.orderQuantity) >
                      Number(itemModal.maxQuantity)
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
                      Number(itemModal.stockOnHand) +
                        Number(itemModal.orderQuantity) <
                      Number(itemModal.safetyStock)
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
        id="edittopo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header align-items-start">
              <div>
                <h4 className="page-header">Edit PO Item</h4>
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
                  disabled={true}
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
                  &nbsp;<i className="fa-sharp fa-solid fa-pen"></i>
                  &nbsp;&nbsp;Edit&nbsp;PO&nbsp;Item&nbsp;&nbsp;&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="toast-container toast-positioner">{toasts}</div>
    </>
  );
}
