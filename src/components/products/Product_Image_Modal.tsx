import CloseIcon from "@mui/icons-material/Close";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip } from "@mui/material";
import { makeToastError } from "@/utils/toaster";
import { useEffect, useState } from "react";
import ColorPicker from "../myUi/ColorPicker";
import { IProducts } from "@/types/productType";

interface Color {
  value: string;
  label: string;
  id?: string; // Made `id` optional
}

type MetadataFormProps = {
  productLocalImages: {
    image: File;
    colorCode: string;
    colorName: string;
  }[];
  setProductLocalImages: (
    images: {
      image: File;
      colorCode: string;
      colorName: string;
    }[]
  ) => void;
  setFieldValue: any;
  setIsOpen: (value: boolean) => void;
  setSelectedColor: (value: boolean) => void;
  values: IProducts;
};

export const ProductImageModal = ({
  productLocalImages,
  setProductLocalImages,
  setFieldValue,
  setSelectedColor,
  values,
}: MetadataFormProps) => {
  const [colorOptions, setColorOptions] = useState<
    { code: string; name: string }[]
  >([
    { code: "#FF5733", name: "Red" },
    { code: "#33FF57", name: "Green" },
    { code: "#3357FF", name: "Blue" },
  ]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  console.log(productLocalImages, "productLocalImages");

  const handleColorChange = (
    index: number,
    colorCode: string,
    colorName: string
  ) => {
    const isColorUsed = productLocalImages.some(
      (image, i) => image.colorCode === colorCode && i !== index
    );

    if (isColorUsed) {
      setSelectedColor(true);
      makeToastError(
        `The color ${colorName} is already assigned to another image.`
      );
      return;
    } else {
      setSelectedColor(false);

      const updatedImages = [...productLocalImages];
      updatedImages[index] = {
        ...updatedImages[index],
        colorCode,
        colorName,
      };
      setProductLocalImages(updatedImages);
    }
  };

  // const handleSaveColors = () => {
  //     // Validate: Ensure all images have a selected color
  //     const isAllColorsSelected = productLocalImages.every(
  //       (image) => image.colorCode && image.colorName
  //     );

  //     if (isAllColorsSelected) {
  //       // Save to Formik field
  //       setFieldValue("productImages", productLocalImages);
  //       setIsOpen(false); // Close the modal
  //     } else {
  //       alert("Please select colors for all product images.");
  //     }
  //   };

  // const handleDeleteImage = (index: number) => {
  //     const updatedImages = productLocalImages.filter((_, i) => i !== index);
  //     setProductLocalImages(updatedImages);
  //   };
  const handleDeleteImage = (index: number) => {
    // Get the image being deleted
    const imageToDelete = productLocalImages[index];

    // Update local state
    const updatedLocalImages = productLocalImages.filter((_, i) => i !== index);
    setProductLocalImages(updatedLocalImages);

    // Update Formik values if the image exists in the Formik state
    setFieldValue(
      "variations",
      values.variations.filter(
        (product) => product.image !== imageToDelete.image
      )
    );
  };

  const handleSaveNewColor = (newColor: Color) => {
    setColorOptions((prevOptions) => [
      ...prevOptions,
      { code: newColor.value, name: newColor.label },
    ]);
    setShowColorPicker(false);
  };

  useEffect(() => {
    if (productLocalImages.length === 0 && values.variations.length > 0) {
      setProductLocalImages(values.variations);
    }
  }, [productLocalImages, setProductLocalImages, values.variations]);

  return (
    <div className="flex flex-col gap-3 h-[350px] overflow-y-auto">
      {productLocalImages.map((product, index) => (
        <div key={index} className="flex justify-between">
          <img
            src={URL.createObjectURL(product.image)}
            alt=""
            className="w-10 h-10"
          />
          <div className="w-[70%] relative">
            {showColorPicker && (
              <div className="absolute z-50 left-1/2 top-1/2">
                <ColorPicker
                  setShowColor={setShowColorPicker}
                  onSaveColor={handleSaveNewColor}
                  colorOptions={colorOptions}
                />
              </div>
            )}
            <Select
              onValueChange={(value) => {
                // if (value === "addNew") {
                //   setShowColorPicker(true); // Open color picker if "Add New" is selected
                //   return;
                // }
                const selectedColor = colorOptions.find(
                  (color) => color.code === value
                );
                if (selectedColor) {
                  handleColorChange(
                    index,
                    selectedColor.code,
                    selectedColor.name
                  );
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={product.colorName || "Select a color"}
                />
              </SelectTrigger>
              <SelectContent className="z-[10003]">
                {colorOptions.map((color) => (
                  <SelectItem key={color.code} value={color.code}>
                    <div
                      className="flex items-center gap-2"
                      style={{ color: color.code }}
                    >
                      <span
                        className="block w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.code }}
                      ></span>
                      {color.name}
                    </div>
                  </SelectItem>
                ))}
                <span
                  className="relative flex w-full hover:bg-gray-50 select-none items-center
                 cursor-pointer
                  rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground
                  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  onClick={() => setShowColorPicker(true)}
                >
                  Add New Color
                </span>
              </SelectContent>
            </Select>
          </div>
          <Tooltip title="Delete" placement="top">
            <button
              type="button"
              className="h-5 flex justify-center items-center bg-red-500 text-white rounded-full"
              onClick={() => handleDeleteImage(index)}
            >
              <CloseIcon fontSize="small" />
            </button>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
