import { ComponentType } from "react";

import { RendererProps } from "@/shared/ui/renderer";

import { Message } from "./get-messages-service.types";

export interface BaseMessageItemProps {
  item: Message;
  Renderer: ComponentType<RendererProps>;
}
