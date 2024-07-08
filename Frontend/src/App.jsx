import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";
import Overview, {
  loader as OverviewLoader,
  action as OverviewAction,
} from "./pages/Overview";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Layout />}>
        <Route
          index
          element={<Overview />}
          loader={OverviewLoader}
          action={OverviewAction}
        />
        <Route
          path="invoices"
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
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}