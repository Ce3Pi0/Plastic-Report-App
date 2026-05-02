import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { appsOutline, arrowDownOutline } from "ionicons/icons";
import { IoCheckmark, IoWarning } from "react-icons/io5";
import { RiProgress1Line } from "react-icons/ri";
import { hideTooltip } from "../../utils/utils";
import { DirectionType } from "../../types";
import FilterPopoverElement from "./FilterPopoverElement";

interface Props {
  direction: DirectionType;
  hidden: boolean;
  setHidden: any;
  setStatus: any;
}

const FilterPopover = ({ direction, hidden, setHidden, setStatus }: Props) => {
  return (
    <IonFab slot="fixed" horizontal="end" vertical="top">
      <div className="group relative inline-block">
        <IonFabButton
          size="small"
          onClick={(e) => hideTooltip(hidden, setHidden)}
        >
          <IonIcon
            icon={direction === "down" ? arrowDownOutline : arrowDownOutline}
          />
        </IonFabButton>
        <span
          id="first_tooltip_text"
          className="invisible group-hover:visible w-[120%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[11px] z-1 top-[30%] left-[-110%]"
        >
          Filter
        </span>
      </div>

      <IonFabList className="tooltips" side="bottom">
        <FilterPopoverElement
          hidden={hidden}
          setHidden={setHidden}
          setStatus={setStatus}
          text="completed"
        />

        <FilterPopoverElement
          hidden={hidden}
          setHidden={setHidden}
          setStatus={setStatus}
          text="pending"
        />

        <FilterPopoverElement
          hidden={hidden}
          setHidden={setHidden}
          setStatus={setStatus}
          text="rejected"
        />

        <FilterPopoverElement
          hidden={hidden}
          setHidden={setHidden}
          setStatus={setStatus}
          text=""
        />
      </IonFabList>
    </IonFab>
  );
};

export default FilterPopover;
