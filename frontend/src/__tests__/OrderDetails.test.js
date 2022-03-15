import { render, screen } from "@testing-library/react"
import OrderItemList from "../components/OrderItemList";
import { currencyFormatter } from "../helpers/formatter";
import {OrderDetailsMockup} from './OrderDetailsMockupData';


it('displays all order items', () => { 
    render(<OrderItemList products={OrderDetailsMockup.products} currencyFormatter={currencyFormatter} />)
    OrderDetailsMockup.products.forEach(p => {
        expect(screen.getByText(`${currencyFormatter(p.price)}`)).toBeInTheDocument();
    })
 })