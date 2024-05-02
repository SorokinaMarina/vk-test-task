import { ContentCard, Div, Card } from "@vkontakte/vkui";
import { INews } from "../../utils/interface";
import { getNews } from "../../utils/api";
import { useState, useEffect } from "react";
import { getDate } from "../../utils/constants";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useDispatch } from "react-redux";
import { getNewsData } from "../../redux/slice/newsSlice";
import { setIsLoading } from "../../redux/slice/isLoadingReducer";

interface ICardElementProps {
  item: number;
  ids: number[];
}

export const CardElement = ({ item, ids }: ICardElementProps) => {
  // Записываем в переменную объект с новостью
  const [news, setNews] = useState<INews | null>(null);
  // Роутер
  const routeNavigator = useRouteNavigator();
  // Записывает данные в Redux с помощью метода useDispatch()
  const dispatch = useDispatch();

  // useEffect получает данные о новости с сервера
  useEffect(() => {
    getNews(item)
      .then((data: INews) => {
        setNews(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, [item, ids, dispatch]);

  return (
    <Div>
      {news !== null && (
        <Card mode="outline-tint">
          <ContentCard
            style={{ cursor: "pointer" }}
            subtitle={getDate(news.time)}
            header={news.title}
            caption={`Рейтинг: ${news.score}`}
            text={`Автор: ${news.by}`}
            onClick={() => {
              dispatch(getNewsData(news));
              routeNavigator.push(`${news.id}`);
            }}
          />
        </Card>
      )}
    </Div>
  );
};
