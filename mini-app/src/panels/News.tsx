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

interface INewsProps {
  id: string;
  news?: INews | null;
}

export const News = ({ id }: INewsProps): JSX.Element => {
  // Достаём из Redux данные открытой карточки
  const news = useSelector(
    (state: { newsReducer: INewsState }) => state.newsReducer.newsElement
  );
  console.log(news);
  const routeNavigator = useRouteNavigator();

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
            <Button onClick={() => routeNavigator.back()}>
              Вернуться к новостям
            </Button>
          </MiniInfoCell>
          <Header>Комментарии</Header>
          {news.kids &&
            news.kids.map((item: number) => <Comment key={item} item={item} />)}
        </Group>
      )}
    </Panel>
  );
};
