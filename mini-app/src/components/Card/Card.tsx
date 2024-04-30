import { ContentCard, Div } from "@vkontakte/vkui";
import { INews } from "../../utils/interface";
import { getNews } from "../../utils/api";
import { useState, useEffect } from "react";
import { getDate } from "../../utils/constants";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const Card = ({ item }: { item: number }) => {
  const [news, setNews] = useState<INews | null>(null);
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    getNews(item).then((data: INews) => {
      setNews(data);
    });
  }, [item]);

  console.log(news);

  return (
    <Div>
      {news !== null && (
        <ContentCard
          style={{ cursor: "pointer" }}
          subtitle={getDate(news.time)}
          header={news.title}
          caption={`Рейтинг: ${news.score}`}
          text={`Автор: ${news.by}`}
          onClick={() => {
            //   setNewsElement(item);
            routeNavigator.push(`${news.id}`);
          }}
        />
      )}
    </Div>
  );
};
