import { Group, Button, MiniInfoCell, Paragraph } from "@vkontakte/vkui";
import { useState, useEffect } from "react";
import { getComments } from "../../utils/api";
import { IComment } from "../../utils/interface";
import { getDate } from "../../utils/constants";
import { CommentKids } from "../CommentKids/CommentKids";

export const Comment = ({ item }: { item: number }) => {
  const [comment, setComment] = useState<IComment | null>(null);
  const [onClickComment, setOnClickComment] = useState<boolean>(false);

  useEffect(() => {
    getComments(item).then((data: IComment) => {
      setComment(data);
    });
  }, [item]);

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
            {comment.text}
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
              <CommentKids key={kidId} item={kidId} />
            ))}
        </Group>
      )}
    </div>
  );
};
