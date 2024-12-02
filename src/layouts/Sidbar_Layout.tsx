
import { Outlet } from "react-router-dom";

export const ProductsLayout = () => (
    <div>
      <Outlet /> {/* Renders child routes */}
    </div>
  );
  
  export const SalesLayout = () => (
    <div>
      <h1>Sales Page</h1>
      <Outlet /> {/* Renders child routes */}
    </div>
  );
  
  export const StoreManagementLayout = () => (
    <div>
      <h1>Store Management Page</h1>
      <Outlet />
    </div>
  );

  export const SettingsLayout = () => (
    <div>
      <h1>Store Management Page</h1>
      <Outlet />
    </div>
  );