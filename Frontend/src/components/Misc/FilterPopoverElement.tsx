import { IonFabButton, IonIcon } from "@ionic/react";
import { hideTooltip } from "../../utils/utils";
import { IoCheckmark, IoWarning } from "react-icons/io5";
import { RiProgress1Line } from "react-icons/ri";
import { appsOutline } from "ionicons/icons";

interface Props {
  hidden: boolean;
  setHidden: any;
  setStatus: any;
  text: string;
}

const FilterPopoverElement = ({
  hidden,
  setHidden,
  setStatus,
  text,
}: Props) => {
  if (text.length === 0) text = "all";

  const color =
    text === "completed"
      ? "success"
      : text === "pending"
        ? "warning"
        : text === "rejected"
          ? "danger"
          : "";

  return (
    <div className="group relative inline-block">
      <IonFabButton
        size="small"
        color={color}
        onClick={() => {
          setStatus(text);
          hideTooltip(hidden, setHidden);
        }}
      >
        {text === "completed" && (
          <IoCheckmark size={24} className="text-black" />
        )}
        {text === "pending" && <RiProgress1Line size={24} />}
        {text === "rejected" && <IoWarning size={24} className="text-black" />}
        {text === "all" && <IonIcon icon={appsOutline} />}
      </IonFabButton>
      <span className="invisible group-hover:visible w-[120%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[11px] z-1 top-[30%] left-[-110%]">
        {text.at(0)!.toUpperCase() + text.slice(1)}
      </span>
    </div>
  );
};

export default FilterPopoverElement;
