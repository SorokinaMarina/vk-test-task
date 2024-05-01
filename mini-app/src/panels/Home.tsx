import { Panel, PanelHeader, Button, Group, Spinner } from "@vkontakte/vkui";
import { CardElement } from "../components/CardElement/CardElement";
import { getIds } from "../utils/api";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IIsLoadingState, setIsLoading } from "../redux/slice/isLoadingReducer";

export const Home = ({ id }: { id: string }): JSX.Element => {
  // Переменная получает id новостей
  const [ids, setIds] = useState<number[] | []>([]);

  // Достаём из Redux данные прелоадера
  const isLoading = useSelector(
    (state: { isLoadingReducer: IIsLoadingState }) =>
      state.isLoadingReducer.isLoading
  );

  // Записывает данные в Redux с помощью метода useDispatch()
  const dispatch = useDispatch();

  // Вынесена логика обращения к серверу в отдельную функцию
  async function getIdsArr() {
    dispatch(setIsLoading(true));
    getIds()
      .then((data: number[]) => {
        if (data) {
          const sortArr = data.sort((a: number, b: number) => a - b);
          const reverse = sortArr.reverse();
          if (reverse.length > 100) {
            setIds(reverse.slice(0, 100));
          } else {
            setIds(reverse);
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }

  // useEffect отправляет запрос к серверу на получаение id новостей при первом рендере и каждую последующую минуту
  useEffect(() => {
    getIdsArr();

    const interval = setInterval(() => {
      getIdsArr();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Функция для обновления данных на странице при клике на кнопку "Обновить ленту"
  function handleUpdate() {
    getIdsArr();
  }

  return (
    <Panel id={id}>
      <PanelHeader>Новости</PanelHeader>
      {!isLoading ? (
        <Group>
          <Button
            style={{ marginLeft: 17, marginTop: 15, marginBottom: 15 }}
            onClick={handleUpdate}
          >
            Обновить ленту
          </Button>
          {ids.length !== 0 &&
            ids.map((item: number, i: number) => (
              <CardElement key={i} item={item} ids={ids} />
            ))}
        </Group>
      ) : (
        <Spinner size="large" style={{ margin: "20px 0" }} />
      )}
    </Panel>
  );
};
