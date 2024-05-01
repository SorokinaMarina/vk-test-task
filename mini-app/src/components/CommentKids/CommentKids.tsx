import { Group, MiniInfoCell, Paragraph } from "@vkontakte/vkui";
import { useState, useEffect } from "react";
import { getComments } from "../../utils/api";
import { IComment } from "../../utils/interface";
import { getDate } from "../../utils/constants";
import { decodeHtml } from "../../utils/constants";
import { DeletedComments } from "../DeletedComment/DeletedComments";

interface CommentKids {
  item: number;
}

export const CommentKids = ({ item }: CommentKids): JSX.Element => {
  const [commentKids, setCommentKids] = useState<IComment | null>(null);

  useEffect((): void => {
    getComments(item).then((data: IComment) => {
      setCommentKids(data);
    });
  }, [item]);

  return (
    <div>
      {commentKids !== null &&
        !commentKids.text &&
        commentKids.deleted === true && (
          <DeletedComments time={commentKids.time} />
        )}
      {commentKids !== null && commentKids.text && (
        <Group style={{ marginLeft: 15 }}>
          <MiniInfoCell style={{ paddingTop: 15, paddingBottom: 0 }}>
            {commentKids.by}
          </MiniInfoCell>
          <MiniInfoCell style={{ paddingTop: 15 }}>
            {getDate(commentKids.time)}
          </MiniInfoCell>
          <Paragraph
            style={{
              paddingTop: 10,
              paddingBottom: 15,
              paddingLeft: 15,
              paddingRight: 15,
              display: "block",
            }}
          >
            {decodeHtml(commentKids.text)}
          </Paragraph>
        </Group>
      )}
    </div>
  );
};
