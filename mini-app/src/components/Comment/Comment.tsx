import {
  Group,
  Button,
  MiniInfoCell,
  Paragraph,
} from "@vkontakte/vkui";
import { useState, useEffect } from "react";
import { getComments } from "../../utils/api";
import { IComment, INews } from "../../utils/interface";
import { getDate } from "../../utils/constants";
import { CommentKids } from "../CommentKids/CommentKids";
import { decodeHtml } from "../../utils/constants";
import { useDispatch } from "react-redux";

interface ICommentProps {
  item: number;
  setCountComment: React.Dispatch<React.SetStateAction<number>>;
  news: INews;
}

export const Comment = ({ item, setCountComment, news }: ICommentProps) => {
  // Переменная сохраняет в себе объект с новостью
  const [comment, setComment] = useState<IComment | null>(null);
  // Переменная отображает/скрывает дополнительные комментарии
  const [onClickComment, setOnClickComment] = useState<boolean>(false);
  // Записывает данные в Redux с помощью метода useDispatch()
  const dispatch = useDispatch();

  // useEffect обращается к серверу за комментарием по id
  useEffect(() => {
    getComments(item)
      .then((data: IComment) => {
        setComment(data);
      })
      .catch((err) => console.log(err))
  }, [item, setCountComment, news, dispatch]);

  // useEffect изменяет количество комментариев
  useEffect(() => {
    if (comment !== null && comment.kids) {
      setCountComment((prev) => prev + comment.kids.length);
    }
    if (comment !== null && !comment.text) {
      setCountComment((prev) => prev - 1);
    }
  }, [comment, setCountComment]);

  return (
    <div>
      {comment !== null && comment.text && (
        <Group style={{ marginLeft: 15 }}>
          <MiniInfoCell style={{ paddingTop: 15, paddingBottom: 0 }}>
            {comment.by}
          </MiniInfoCell>
          <MiniInfoCell>{getDate(comment.time)}</MiniInfoCell>
          <Paragraph
            style={{
              paddingTop: 10,
              paddingBottom: 15,
              paddingLeft: 15,
              paddingRight: 15,
              display: "block",
            }}
          >
            {decodeHtml(comment.text)}
          </Paragraph>
          {comment.kids && (
            <Button
              mode="link"
              style={{ marginLeft: 15, marginBottom: 10, marginTop: 0 }}
              onClick={() => {
                setOnClickComment(!onClickComment);
              }}
            >
              {!onClickComment
                ? "Показать вложенные комментарии"
                : "Скрыть вложенные комментарии"}
            </Button>
          )}
          {onClickComment &&
            comment.kids &&
            comment.kids.map((kidId: number) => (
              <CommentKids
                key={kidId}
                item={kidId}
                setCountComment={setCountComment}
              />
            ))}
        </Group>
      )}
    </div>
  );
};
