import '../../vendor/normalize.css'
import '../../vendor/fonts/Roboto/roboto.css'
import './App.css';
import menu from '../../imajes/Vector.svg'
import getData from '../../utils/request';
import { useEffect, useState } from 'react';
import Scale from '../Scale/Scale';

function App() {
  const [isData, setIsData] = useState({});

  useEffect(() => {
    getData()
      .then((data) => {
        setIsData(data);
      })
      .catch((err) => alert(err))
  },[]);

  const getHeight = (data, scale = 2.5) => {
    // Получаем все значения из объектов и значение Норматив в массив
    const values = Object.keys(data).reduce((acc, key) => {
      if (typeof data[key] === 'object') {
        return acc.concat(Object.values(data[key]));
      } else if (key === 'norm') {
        return acc.concat(data[key]);
      }
      return acc;
    }, []);

    // Вычисляем общую сумму всех значений
    const totalValue = values.reduce((sum, val) => sum + val, 0);

    // Вычисляем процентную высоту для каждого значения
    const heights = {};
    const sums = {};  // Для хранения сумм значений каждой шкалы

    for (let key in data) {
      if (typeof data[key] === 'object') {
        heights[key] = {};
        sums[key] = Object.values(data[key]).reduce((sum, val) => sum + val, 0); // Сумма значений для шкалы
        for (let subKey in data[key]) {
          heights[key][subKey] = ((data[key][subKey] / totalValue) * 100) * scale;
        }
      } else if (key === 'norm') {
        heights[key] = ((data[key] / totalValue) * 100) * scale;
      }
    }
    return {heights, sums};
  };

// Используем функцию getHeight для вычисления высот
  const {heights, sums} = getHeight(isData);

  // Вычисление разницы между шкалами
  const differences = {
    differenceOne: (sums.test || 0) - (sums.dev || 0),
    differenceTwo: (sums.prod || 0) - (sums.test || 0)
  };


  return (
    <div className="page">
      <div className='page-container'>
        <header className="header">
          <h1 className='header__title'>
            Количество пройденных тестов "{isData.title}"
          </h1>
          <img className='header__menu' src={menu} alt='меню' />
        </header>
        <section className='scale'>
          <div className='scale__difference'>
            <div className='line'>
              <div className='dif'>
                <div className='dif-data'>{differences.differenceOne}</div>
              </div>
              <div className='arrow'></div>
            </div>
            <div className='line'>
              <div className='dif'>
                <div className='dif-data'>{differences.differenceTwo}</div>
              </div>
              <div className='arrow'></div>
            </div>
          </div>

          <ul className='scale-container'>
            {
              Object.keys(isData).map(key => {
                if (typeof isData[key] === 'object') {
                  const instance = isData[key];
                  const heightInstance = heights[key]; // высота стеков dev, test, prod на каждой итерации

                  return (
                    <Scale
                      key={key}
                      name={key}
                      instance={instance}
                      heightInstance={heightInstance}
                    />
                  );
                }
                return null; // Добавьте этот return, чтобы избежать ошибки
              })
            }
            {
              isData.norm && (
                <div className='scale-norm'>
                  <div className='item-norm' style={{ height: `${heights.norm}%` }}>
                    <p className='text-norm'>{isData.norm}</p>
                  </div>
                  <h2 className='title-norm'>Норматив</h2>
                </div>
              )
            }
          </ul>
        </section>
        <footer>
          <div className='info'>
            <p className='info__front'>Клиентская часть</p>
            <p className='info__back'>Серверная часть</p>
            <p className='info__db'>База данных</p>
          </div>
        </footer>
      </div>
    </div>
  );
}


export default App;
