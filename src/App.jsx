import 'bulma/css/bulma.css';
import './App.scss';
// import { sortUserPlugins } from 'vite';
import classN from 'classnames';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function prepareGoods(
  goods,
  { sortByAlphabet, sortByLength, reverseOrder } = {},
) {
  let preparedGoods = [...goods];

  if (sortByAlphabet) {
    preparedGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (sortByLength) {
    preparedGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  if (reverseOrder) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

// function toggleSorting(sortCase) {
//   if (sortByAlphabet) {
//     setSortByLength(false);
//   } else if (sortByLength) {
//     setSortByAlphabet(false);
//   }
// }

export const App = () => {
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
  const [sortByLength, setSortByLength] = useState(false);
  const [reverseOrder, setReverse] = useState(false);

  const visibleGoods = prepareGoods(goodsFromServer, {
    sortByAlphabet,
    sortByLength,
    reverseOrder,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortByAlphabet(!sortByAlphabet)}
          className={classN('button', 'is-info', {
            'is-light': !sortByAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortByLength(!sortByLength)}
          className={classN('button', 'is-info', {
            'is-light': !sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverse(!reverseOrder)}
          className={classN('button', 'is-warning', {
            'is-light': !reverseOrder,
          })}
        >
          Reverse
        </button>

        {(sortByAlphabet || sortByLength || reverseOrder) && (
          <button
            type="button"
            onClick={() =>
              setReverse(false) ||
              setSortByLength(false) ||
              setSortByAlphabet(false)
            }
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
