import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IPricePerPieces } from "@/types/productType";
import { Icon } from "@iconify/react";

type Props = {
  pricePerPieces: IPricePerPieces[];
  setFieldValue: (field: string, value: any) => void;
};

export default function PricePerPieces({
  pricePerPieces,
  setFieldValue,
}: Props) {
  const handleAddField = () => {
    const newField = {
      _id: Date.now().toString(),
      min_Piece: 0,
      max_Piece: 0,
      discount: 0,
    };
    setFieldValue("pricePerPieces", [...pricePerPieces, newField]);
  };

  const handleRemoveField = (id: string) => {
    const updatedFields = pricePerPieces.filter((item) => item._id !== id);
    setFieldValue("pricePerPieces", updatedFields);
  };

  const handleChange = (
    id: string,
    field: keyof IPricePerPieces,
    value: number
  ) => {
    const updatedFields = pricePerPieces.map((item) =>
      item._id === id ? { ...item, [field]: value } : item
    );
    setFieldValue("pricePerPieces", updatedFields);
  };

  return (
    <div className="border rounded-md md:w-3/4 w-full">
      <div className="p-2 border-b flex items-center">
        <span className="w-1/2 text-center">Piece Limit</span>
        <span className="w-1/2 text-center">Discount</span>
      </div>
      <div className="p-2">
        {pricePerPieces.map((field, index) => (
          <div key={field._id} className="flex items-center gap-4 mb-2">
            <div className=" flex flex-col items-center">
            {index === 0 && <span>min</span>}
            
              <Input
                type="number"
                className="w-[60px]"
                placeholder="Min"
                value={field.min_Piece}
                onChange={(e) =>
                  handleChange(field._id!, "min_Piece", +e.target.value)
                }
              />
            </div>
            <span className="pt-3">-</span>
            <div className=" flex flex-col items-center">
            {index === 0 && <span>max</span>}
              <Input
                type="number"
                className="w-[60px]"
                placeholder="Max"
                value={field.max_Piece}
                onChange={(e) =>
                  handleChange(field._id!, "max_Piece", +e.target.value)
                }
              />
            </div>

            <span className="pt-3">=</span>
            <div className=" flex flex-col items-center">
            {index === 0 && <span className="text-white select-none">discount</span>}
            <Input
              type="number"
              className="w-full"
              placeholder="Discount"
              value={field.discount}
              onChange={(e) =>
                handleChange(field._id!, "discount", +e.target.value)
              }
            />
            </div>
           
            <button onClick={() => handleRemoveField(field._id!)}>
              <Icon icon="fluent:delete-24-regular" />
            </button>
          </div>
        ))}
      </div>
      <div className="p-2">
        <Button
          variant="outline"

          type="button"
          className="w-full border-dashed bg-gray-50 border-textMain"
          onClick={handleAddField}
        >
          Add New +
        </Button>
      </div>
    </div>
  );
}
