import ModalFilterData from "@/components/features/modal/ModalFilterData";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Checkbox } from "primereact/checkbox";

const ModalFilterDataUser = ({
  onClearFilter,
  roleAkun,
  statusAkun,
  dataListRoles,
  statusInfoAkun,
  setRoleAkun,
  setStatusAkun,
}) => {
  return (
    <ModalFilterData
      onClearFilter={onClearFilter}
      roleAkun={roleAkun}
      statusAkun={statusAkun}
    >
      <Accordion className="my-3">
        <AccordionTab header="Role">
          {dataListRoles?.data.map((optionRoles) => {
            return (
              <div
                key={optionRoles.id}
                className="flex gap-2 items-center my-1 "
              >
                <Checkbox
                  inputId={optionRoles.id}
                  name="optionRoles"
                  value={optionRoles.id}
                  onChange={(e) => {
                    setRoleAkun(e.target.value);
                  }}
                  checked={roleAkun === optionRoles.id}
                />
                <Label htmlFor={optionRoles.value} className="uppercase">
                  {optionRoles.name}
                </Label>
              </div>
            );
          })}
        </AccordionTab>
        <AccordionTab header="Status">
          {statusInfoAkun.map((optionStatus) => (
            <div
              key={optionStatus.value}
              className="flex gap-2 items-center my-1"
            >
              <Checkbox
                inputId={optionStatus.value}
                name="optionStatus"
                value={optionStatus.value}
                onChange={(e) => {
                  setStatusAkun(e.target.value);
                }}
                checked={statusAkun === optionStatus.value}
              />
              <Label htmlFor={optionStatus.value}>{optionStatus.label}</Label>
            </div>
          ))}
        </AccordionTab>
      </Accordion>
    </ModalFilterData>
  );
};

export default ModalFilterDataUser;
