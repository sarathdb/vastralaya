import React, { CSSProperties } from "react";
import { Controller, useFormContext } from "react-hook-form";

import TransferList, { IColumn } from "../components/TransferList";



interface FormTransferListProps {
  styles?: CSSProperties;
  uniqueIdField: string;
  name: string;
  initialItems: any[];
  availableTitle?: string;
  assignedTitle?: string;
  addSelectedTooltip?: string;
  columns: IColumn[];
}

const FormTransferList: React.FC<FormTransferListProps> = ({
  uniqueIdField,
  styles,
  name,
  initialItems = [],
  availableTitle = "Available",
  assignedTitle = "Selected",
  addSelectedTooltip = "Add selected",
  columns,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={initialItems}
      render={({ field: { value, onChange } }) => (
        <TransferList
          uniqueIdField={uniqueIdField}
          styles={styles}
          initialItems={initialItems}
          assignedItems={value}
          onItemsChange={onChange}
          availableTitle={availableTitle}
          assignedTitle={assignedTitle}
          addSelectedTooltip={addSelectedTooltip}
          columns={columns}
        />
      )}
    />
  );
};

export default FormTransferList;
