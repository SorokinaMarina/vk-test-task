import { Panel, PanelHeader, Button, Group } from "@vkontakte/vkui";
import { CardElement } from "../components/CardElement/CardElement";
import { getIds } from "../utils/api";
import { useState, useEffect } from "react";

export const Home = ({ id }: { id: string }): JSX.Element => {
  const [ids, setIds] = useState<number[] | []>([]);

  // Вынесена логика обращения к серверу в отдельную функцию
  async function getIdsArr() {
    try {
      getIds().then((data: number[]) => {
        if (data) {
          const sortArr = data.sort((a: number, b: number) => a - b);
          const reverse = sortArr.reverse();
          if (reverse.length > 100) {
            setIds(reverse.slice(0, 100));
          } else {
            setIds(reverse);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
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
      <Group>
        <Button
          style={{ marginLeft: 17, marginTop: 15, marginBottom: 15 }}
          onClick={handleUpdate}
        >
          Обновить ленту
        </Button>
        {ids.length !== 0 &&
          ids.map((item: number, i: number) => (
            <CardElement key={i} item={item} />
          ))}
      </Group>
    </Panel>
  );
};
