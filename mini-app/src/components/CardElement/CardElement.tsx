import { ContentCard, Div, Card } from "@vkontakte/vkui";
import { INews } from "../../utils/interface";
import { getNews } from "../../utils/api";
import { useState, useEffect } from "react";
import { getDate } from "../../utils/constants";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useDispatch } from "react-redux";
import { getNewsData } from "../../redux/slice/newsSlice";

export const CardElement = ({ item }: { item: number }) => {
  const [news, setNews] = useState<INews | null>(null);
  const routeNavigator = useRouteNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    getNews(item).then((data: INews) => {
      setNews(data);
    });
  }, [item]);

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
