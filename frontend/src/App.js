import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import CustomersRoutes from './screens/customer/CustomersRoutes';
import Admin from './screens/admin/admin.main';
import AdminRoute from './components/AdminRoute';
function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <AdminRoute path="/admin" component={Admin} />
          <Route path="/" component={CustomersRoutes} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
