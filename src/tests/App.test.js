import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI)
    })
    
    render(<App/>)
  })
  
  test.skip('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const a = await screen.findByRole('heading', { name: /rick sanchez/i });
    expect(a).toBeInTheDocument();
  })

  test.skip('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputTag = screen.getByPlaceholderText('Rick Sanchez...');
    const button = screen.getByText('Buscar');

    expect(inputTag).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputTag = screen.getByPlaceholderText('Rick Sanchez...');
    const button = screen.getByText('Buscar');

    userEvent.type(inputTag, 'smith');
    userEvent.click(button);

    const cards = screen.getAllByRole('article');

    expect(cards.length).toBe(4);
  })

})
