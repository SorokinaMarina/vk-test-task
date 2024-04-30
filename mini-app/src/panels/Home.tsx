import { Panel, PanelHeader } from "@vkontakte/vkui";
import { Card } from "../components/Card/Card";
import { getIds } from "../utils/api";
import { useState, useEffect } from "react";

export const Home = ({ id }: { id: string }): JSX.Element => {
  const [ids, setIds] = useState<number[] | []>([]);

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

  return (
    <Panel id={id}>
      <PanelHeader>Новости</PanelHeader>
      {ids.length !== 0 &&
        ids.map((item: number, i: number) => <Card key={i} item={item} />)}
    </Panel>
  );
};
