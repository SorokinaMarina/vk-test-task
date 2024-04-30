import {
  Panel,
  PanelHeader,
  Group,
  MiniInfoCell,
  Header,
  Link,
  Button,
} from "@vkontakte/vkui";
import { INews } from "../utils/interface";
import { useSelector } from "react-redux";
import { INewsState } from "../redux/slice/newsSlice";
import { getDate } from "../utils/constants";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Comment } from "../components/Comment/Comment";
import { useState, useEffect } from "react";

interface INewsProps {
  id: string;
  news?: INews | null;
}

export const News = ({ id }: INewsProps): JSX.Element => {
  // Достаём из Redux данные открытой карточки
  const news = useSelector(
    (state: { newsReducer: INewsState }) => state.newsReducer.newsElement
  );
  const routeNavigator = useRouteNavigator();

  const [countComment, setCountComment] = useState<number>(0);

  useEffect(() => {
    if (news && news.kids) {
      setCountComment(news.kids.length);
    }
  }, [news]);

  return (
    <Panel id={id}>
      <PanelHeader>Новости</PanelHeader>
      {news !== null && (
        <Group>
          <Header>{news.title}</Header>
          <MiniInfoCell>{getDate(news.time)}</MiniInfoCell>
          <MiniInfoCell>{`Автор: ${news.by}`}</MiniInfoCell>
          <MiniInfoCell>
            <Link href={news.url} target="_blank">
              Ссылка на новость
            </Link>
          </MiniInfoCell>
          <MiniInfoCell>
            <Button
              onClick={() => {
                setCountComment(0);
                routeNavigator.back();
              }}
            >
              Вернуться к новостям
            </Button>
          </MiniInfoCell>
          <Header>{`Комментарии ${countComment}`}</Header>
          {news.kids &&
            news.kids.map((item: number) => (
              <Comment
                key={item}
                item={item}
                setCountComment={setCountComment}
              />
            ))}
        </Group>
      )}
    </Panel>
  );
};
