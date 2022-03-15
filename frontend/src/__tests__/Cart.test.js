import { render, screen, fireEvent } from "@testing-library/react"
import CartItemList from "../components/CartItemList";
import Cart from "../screens/customer/Cart"
import { CartMockup } from './CartMockupData'
import 'whatwg-fetch'
import {rest} from 'msw'
import { setupServer } from 'msw/node'
import { currencyFormatter } from '../helpers/formatter'

// mocking "facking" api endpoints
const server = setupServer(
    rest.get('http://localhost:5000/users/2/cart', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([CartMockup]),
        )
    }),
    rest.patch('http://localhost:5000/cart/4', (req, res, ctx) => {
        return res(
            ctx.status(200)
        )
    })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())



describe('rendering data correctly', () => { 
    
    test('renders all cart items', () => { 
        render(<CartItemList products={CartMockup.products} currencyFormatter={currencyFormatter} />);
        
        const deleteButtons = screen.getAllByRole('button', {name: /delete/i});
        expect(deleteButtons.length).toBe(CartMockup.products.length);
    })
    
    it('subtotal is calculated and dispalyed correctly', async() => { 
        render(<Cart userId={2} />);
        
        let subtotal = 0;
        CartMockup.products.forEach(i => {
            subtotal += i.price * i.quantity;
        })
        const subtotal_itemsCount = `Subtotal(${CartMockup.products.length} items) : ${currencyFormatter(subtotal)}`;
        
        const subtotal_itemsCountElement = await screen.findByTestId(`${currencyFormatter(subtotal)}`);
        expect(subtotal_itemsCountElement.textContent).toBe(subtotal_itemsCount);
    })
});

describe('user interaction', () => { 
    it('click delete button', async() => { 
        render(<Cart userId={2} />)

        const deleteButtons = await screen.findAllByRole('button', {name: /delete/i});
        fireEvent.click(deleteButtons[0]);
        const deleteButtonsAfter = await screen.findAllByRole('button', {name: /delete/i});
        expect(deleteButtonsAfter.length).toBe(deleteButtons.length - 1);
     })

     it('click change qunantity', async() => { 
        render(<Cart userId={2} />)

        const selectElement = await screen.findByTestId(`${CartMockup.products[0].author}-${CartMockup.products[0].title}`);
        fireEvent.change(selectElement, {target: {value: "3"}})
        expect(selectElement.value).toBe("3")
     })
 })