import { API_URI } from "./apiConfig";

export async function searchPos(
  searchBy,
  searchValue,
  page,
  sortType,
  sortOrder,
  locationId,
  filterValue
) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
  const response = await fetch(
    `${API_URI}/pos/search-pos?` +
      new URLSearchParams({
        searchBy: searchBy,
        searchValue: searchValue,
        page: page,
        sortType: sortType,
        sortOrder: sortOrder,
        locationId: locationId,
        filterValue: filterValue,
      }),
    {
      headers: headers,
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
}

export async function getPoProposedItems(supplierId) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
  const response = await fetch(
    `${API_URI}/pos/get-po-proposed-items?` +
      new URLSearchParams({
        supplierId: supplierId,
      }),
    {
      headers: headers,
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
}

export async function getItemDetails(itemId) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
  const response = await fetch(
    `${API_URI}/pos/get-item-details?` +
      new URLSearchParams({
        itemId: itemId,
      }),
    {
      headers: headers,
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
}

export async function getSupplierItems(supplierId) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
  const response = await fetch(
    `${API_URI}/pos/get-supplier-items?` +
      new URLSearchParams({
        supplierId: supplierId,
      }),
    {
      headers: headers,
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
}