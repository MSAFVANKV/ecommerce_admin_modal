import { IProducts, SelectOption } from "@/types/productType";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import AyButton from "../myUi/AyButton";
import MultiSelect from "../myUi/MultiSelect";
import { makeToastError } from "@/utils/toaster";
import AddNewSize from "../size/Add_New_Size";

type Props = {
  setFieldValue: (field: string, value: any) => void;
  values: IProducts;
};

export default function SelectWise({ setFieldValue, values }: Props) {
  const [sizeOptions] = useState([
    { _id: "S", name: "S" },
    { _id: "M", name: "M" },
    { _id: "L", name: "L" },
  ]);
  const [newSize, setNewSize] = useState(false);

  const [selectedSizes, setSelectedSizes] = useState<SelectOption[]>(
    values.variations[0]?.details?.map((detail) => ({
      _id: detail.size.toString(),
      name: detail.size.toString(),
    })) || []
  );

  const handleSizeChange = (selected: SelectOption[]) => {
    if (values.variations.length === 0) {
      makeToastError("Please select a color variant");
      return;
    }

    setSelectedSizes(selected);
    setFieldValue(
      "variations",
      values.variations.map((variation) => ({
        ...variation,
        details: selected.map((size) => ({
          size: size.name,
          stock: 0,
          discount: 0,
          sellingPrice: 0,
          skuId: "",
          sample: false, // Add sample property if required in your `IVariants`
        })),
      }))
    );
  };

  return (
    <div>
      {values.selectWise === "size" ? (
        <div className="flex justify-between items-center w-full relative">
          <Label htmlFor="size" className="text-textGray">
            Select size
          </Label>
          <div className="flex w-3/4 gap-3 items-center">
            <MultiSelect
              fieldName="sizes"
              selectedValue={selectedSizes}
              setSelectedValues={(fieldName, value) => {
                handleSizeChange(value);
              }}
              options={sizeOptions}
            />
            <AyButton
                title="Add New Size"
                outLineColor=""
                variant="outlined"
                onClick={() => setNewSize(true)}
              />
          </div>

          {/* add new sizes */}
          <div className="absolute top-14 -right-0 z-50">
            <AddNewSize isOpen={newSize} onClose={() => setNewSize(false)} />
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <Label htmlFor="size" className="text-textGray">
            Select Bundle
          </Label>
          <Select>
            <SelectTrigger className="w-3/4">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
