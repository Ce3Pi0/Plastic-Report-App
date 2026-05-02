import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { arrowBackOutline, arrowDownOutline } from "ionicons/icons";
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
            icon={direction === "down" ? arrowDownOutline : arrowBackOutline}
          />
        </IonFabButton>
        <span
          id="first_tooltip_text"
          className={`invisible group-hover:visible w-[120%] bg-[var(--ion-color-light-contrast)] text-[var(--ion-color-light)] text-center rounded-[6px] pt-[5px] pr-0 absolute text-[11px] z-1 ${direction === "left" ? "top-[100%] left-[0%]" : "top-[30%] left-[-110%]"}`}
        >
          Filter
        </span>
      </div>

      <IonFabList
        className="tooltips"
        side={direction === "down" ? "bottom" : "start"}
      >
        <FilterPopoverElement
          direction={direction}
          hidden={hidden}
          setHidden={setHidden}
          setStatus={setStatus}
          text="completed"
        />

        <FilterPopoverElement
          direction={direction}
          hidden={hidden}
          setHidden={setHidden}
          setStatus={setStatus}
          text="pending"
        />

        <FilterPopoverElement
          direction={direction}
          hidden={hidden}
          setHidden={setHidden}
          setStatus={setStatus}
          text="rejected"
        />

        <FilterPopoverElement
          direction={direction}
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
