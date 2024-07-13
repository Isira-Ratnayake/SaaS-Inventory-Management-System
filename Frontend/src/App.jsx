import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";
import Login, {
  loader as LoginLoader,
  action as LoginAction,
} from "./pages/Login";
import Invoices, {
  loader as InvoicesLoader,
  action as InvoicesAction,
} from "./pages/Invoices";
import SalesReturns, {
  loader as SalesReturnsLoader,
  action as SalesReturnsAction,
} from "./pages/SalesReturns";
import GoodsReceivedNotes, {
  loader as GRNLoader,
  action as GRNAction,
} from "./pages/GoodsReceivedNotes";
import GoodsReturnNotes, {
  loader as GRRNLoader,
  action as GRRNAction,
} from "./pages/GoodsReturnNotes";
import Items, {
  loader as ItemsLoader,
  action as ItemsAction,
} from "./pages/Items";
import PurchaseOrders, {
  loader as POLoader,
  action as POAction,
} from "./pages/PurchaseOrders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Layout />}>
        {/* <Route
          index
          element={<Overview />}
          loader={OverviewLoader}
          action={OverviewAction}
        /> */}
        <Route
          index
          element={<Login />}
          loader={LoginLoader}
          action={LoginAction}
        />
        <Route
          path="/invoices"
          element={<Invoices />}
          loader={InvoicesLoader}
          action={InvoicesAction}
        />
        <Route
          path="sales-returns"
          element={<SalesReturns />}
          loader={SalesReturnsLoader}
          action={SalesReturnsAction}
        />
        <Route
          path="goods-received-notes"
          element={<GoodsReceivedNotes />}
          loader={GRNLoader}
          action={GRNAction}
        />
        <Route
          path="goods-return-notes"
          element={<GoodsReturnNotes />}
          loader={GRRNLoader}
          action={GRRNAction}
        />
        <Route
          path="items"
          element={<Items />}
          loader={ItemsLoader}
          action={ItemsAction}
        />
        <Route
          path="purchase-orders"
          element={<PurchaseOrders />}
          loader={POLoader}
          action={POAction}
        />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
