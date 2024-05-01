import {
  Panel,
  PanelHeader,
  Group,
  MiniInfoCell,
  Header,
  Link,
  Button,
  Spinner,
} from "@vkontakte/vkui";
import { INews } from "../utils/interface";
import { useSelector, useDispatch } from "react-redux";
import { INewsState, getNewsData } from "../redux/slice/newsSlice";
import { getDate } from "../utils/constants";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Comment } from "../components/Comment/Comment";
import { useState, useEffect } from "react";
import { getNews } from "../utils/api";
import {
  IIsLoadingNewsState,
  setIsLoadingNews,
} from "../redux/slice/isLoadingNewsReducer";

interface INewsProps {
  id: string;
  news?: INews | null;
}

export const News = ({ id }: INewsProps): JSX.Element => {
  // Достаём из Redux данные открытой карточки
  const news = useSelector(
    (state: { newsReducer: INewsState }) => state.newsReducer.newsElement
  );
  // Достаём из Redux данные прелоадера
  const isLoading = useSelector(
    (state: { isLoadingNewsReducer: IIsLoadingNewsState }) =>
      state.isLoadingNewsReducer.isLoadingNews
  );
  // Записывает данные в Redux с помощью метода useDispatch()
  const dispatch = useDispatch();
  // Роутер
  const routeNavigator = useRouteNavigator();
  // Переменная собирает количество комментариев
  const [countComment, setCountComment] = useState<number>(0);

  // useEffect считает количество основных комментариев
  useEffect((): void => {
    if (news && news.kids) {
      setCountComment(news.kids.length);
    }
  }, [news]);

  // Функция срабатывает при нажатии на кнопку "Обновить комментарии"
  function handleUpdateNews(): void {
    if (news !== null) {
      dispatch(setIsLoadingNews(true));
      getNews(news.id)
        .then((data: INews) => {
          dispatch(getNewsData(data));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(setIsLoadingNews(false));
        });
    }
  }

  return (
    <Panel id={id}>
      <PanelHeader>
        <Button
          mode="outline"
          style={{ marginRight: 20 }}
          onClick={() => {
            setCountComment(0);
            routeNavigator.back();
          }}
        >
          Вернуться к новостям
        </Button>
      </PanelHeader>
      {news !== null && !isLoading ? (
        <Group style={{ borderRadius: 0 }}>
          <Header>{news.title}</Header>
          <MiniInfoCell>{getDate(news.time)}</MiniInfoCell>
          <MiniInfoCell>{`Автор: ${news.by}`}</MiniInfoCell>
          <MiniInfoCell>
            <Link href={news.url} target="_blank">
              Ссылка на новость
            </Link>
          </MiniInfoCell>

          <Header>{`Комментарии ${countComment}`}</Header>
          <Button
            mode="link"
            style={{ marginLeft: 15, marginBottom: 10, marginTop: 0 }}
            onClick={handleUpdateNews}
          >
            Обновить комментарии
          </Button>
          {news.kids &&
            news.kids.map((item: number) => (
              <Comment
                key={item}
                item={item}
                setCountComment={setCountComment}
                news={news}
              />
            ))}
        </Group>
      ) : (
        <Spinner size="large" style={{ margin: "20px 0" }} />
      )}
    </Panel>
  );
};
