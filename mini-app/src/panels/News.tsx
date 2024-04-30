import {
  Panel,
  PanelHeader,
  // PanelHeaderBack,
  // Placeholder,
} from "@vkontakte/vkui";
// import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
// import PersikImage from "../assets/persik.png";
import { INews } from "../utils/interface";

interface INewsProps {
  id: string;
  news?: INews | null;
}

export const News = ({ id }: INewsProps): JSX.Element => {
  // const routeNavigator = useRouteNavigator()

  return (
    <Panel id={id}>
      <PanelHeader>Hello</PanelHeader>
    </Panel>
  );
};
