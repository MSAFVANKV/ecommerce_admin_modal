import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { useModal } from "@/providers/context/context";
import { useState } from "react";
import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  TaskModalHeader,
} from "@/components/modals/TaskModal";
import { ProductImageModal } from "@/components/products/Product_Image_Modal";
import { Button } from "@/components/ui/button";
import { makeToastError } from "@/utils/toaster";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { IProducts } from "@/types/productType";

type Props = {
  setFieldValue: any;
  values: IProducts;
  errors: any;
};

export type FileFormValues = {
  galleryImages: File[];
  thumbnails: File[];
  variations: { image: File; colorCode: string; colorName: string }[];
  sizeImages: File[];
};

export default function FilesMediaSectionPage({
  setFieldValue,
  values,
}: Props) {
  console.log(values, "values");
  const { setIsOpen } = useModal();
  const [localProductImages, setProductLocalImages] = useState<
    { image: File; colorCode: string; colorName: string }[]
  >([]);
  const [selectedColor, setSelectedColor] = useState<boolean>(false);

  // const handleFileChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: string
  // ) => {
  //   const files = event.target.files;
  //   if (files) {
  //     const fileArray = Array.from(files); // Convert FileList to an array

  //     if (fieldName === "variations" && files) {
  //       const colorCode = ""; // Replace with actual color code logic
  //       const colorName = ""; // Replace with actual color name logic

  //       const newImages = fileArray.map((file) => ({
  //         image: file,
  //         colorCode,
  //         colorName,
  //       }));
  //       setIsOpen(true);
  //       return setProductLocalImages((prev) => [...prev, ...newImages]);
  //     }
  //     setFieldValue(fieldName, fileArray); // Use array format for Formik state
  //   }
  // };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files); // Convert FileList to an array

    const validateImageDimensions = async (
      file: File,
      width: number,
      height: number
    ) => {
      return new Promise<boolean>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          if (img.width === width && img.height === height) {
            resolve(true);
          } else {
            reject(false);
          }
        };
        img.onerror = () => reject(false);
        img.src = URL.createObjectURL(file); // Load image from file
      });
    };

    try {
      for (const file of fileArray) {
        if (fieldName === "variations" || fieldName === "galleryImages") {
          // Set required dimensions
          const requiredWidth = 600;
          const requiredHeight = 600;

          // Validate dimensions
          await validateImageDimensions(
            file,
            requiredWidth,
            requiredHeight
          ).catch(() => {
            throw new Error(
              `Image must be ${requiredWidth}x${requiredHeight}px`
            );
          });
        } else if (fieldName === "thumbnails") {
          const requiredWidth = 300;
          const requiredHeight = 300;

          // Validate dimensions
          await validateImageDimensions(
            file,
            requiredWidth,
            requiredHeight
          ).catch(() => {
            throw new Error(
              `Thumbnail must be ${requiredWidth}x${requiredHeight}px`
            );
          });
        }
      }

      // If all images are valid, proceed
      if (fieldName === "variations") {
        const colorCode = ""; // Replace with actual color code logic
        const colorName = ""; // Replace with actual color name logic

        const newImages = fileArray.map((file) => ({
          image: file,
          colorCode,
          colorName,
        }));

        if (localProductImages.length === 0 && values.variations.length > 0){
          setProductLocalImages(values.variations);
        }

        setIsOpen(true);
        setProductLocalImages((prev) => [...prev, ...newImages]);
      } else {
        setFieldValue(fieldName, fileArray); // Use array format for Formik state
      }
    } catch (error: any) {
      makeToastError(error.message || "Invalid image dimensions");
    }
  };

  const handleSaveColors = () => {
    // Validate: Ensure all images have a selected color
    if(localProductImages.length === 0 &&  values.variations.length > 0){
      makeToastError("Please add at least one product image");
      return;
    }
    const isAllColorsSelected = localProductImages.every(
      (image) => image.colorCode && image.colorName
    );

    if (isAllColorsSelected) {
      // Save to Formik field
      setFieldValue("variations", localProductImages);
      setIsOpen(false); // Close the modal
    } else {
      alert("Please select colors for all product images.");
    }
  };

  return (
    <div className="">
      {/* Main container starts here ======= */}

      <div className="space-y-5">
        <FormFieldGenal
          setFieldValue={setFieldValue}
          values={values.galleryImages}
          id="galleryImages"
          name="galleryImages"
          title="Gallery Images (600x600)"
          onChange={(e) => handleFileChange(e, "galleryImages")}
        />

        {/* thumbnail */}
        <FormFieldGenal
          values={values.thumbnails}
          setFieldValue={setFieldValue}
          id="thumbnails"
          name="thumbnails"
          title="Add Thumbnail Image (300x300)"
          onChange={(e) => handleFileChange(e, "thumbnails")}
        />

        {/* variations */}
        <FormFieldGenal
          values={values.variations}
          setFieldValue={setFieldValue}
          id="variations"
          setIsOpen={setIsOpen}
          name="variations"
          title="Product images (600x600)"
          onChange={(e) => handleFileChange(e, "variations")}
        />

        {/* sizeImages */}
        <FormFieldGenal
          values={values.sizeImages}
          setFieldValue={setFieldValue}
          id="sizeImages"
          name="sizeImages"
          title="Size chart"
          onChange={(e) => handleFileChange(e, "sizeImages")}
        />
      </div>

      {/* ============= selected images ==== starts currently changes to FormFieldGenal  */}
      {/* <div className="flex flex-wrap mt-10">
        <SelectedImages
          value={values.galleryImages}
          name="galleryImages"
          title="selected Gallery Images"
          alt="gallery images"
          setFieldValue={setFieldValue}
        />

      
        {values.variations.length > 0 && (
          <div className="flex flex-col">
            <span>Selected Product Images</span>
            <div
              onClick={() => setIsOpen(true)}
              className="grid grid-cols-4 gap-2 mt-3"
            >
              {values.variations.map((value) => (
                <Tooltip
                  title={`Color: ${value.colorName}`}
                  placement="top"
                  className="cursor-pointer"
                >
                  <img
                    className="h-12 w-12 rounded-full border border-gray-300"
                    src={URL.createObjectURL(value.image)}
                    alt="gallery images"
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        )}

        <SelectedImages
          value={values.sizeImages}
          name="sizeImages"
          title="selected Size Images"
          alt="gallery images"
          setFieldValue={setFieldValue}
        />

        <SelectedImages
          value={values.thumbnails}
          name="thumbnails"
          title="selected Thumbnail Images"
          alt="gallery images"
          setFieldValue={setFieldValue}
        />
      </div> */}
      {/*========= selected images ==== Ends currently changes to FormFieldGenal  */}

      <TaskModal className="h-[50vh] p-0 shadow-xl border border-black/20 b">
        <TaskModalHeader className="bg-gray-200">
          <div className="p-2 flex justify-between w-full">
            <p className="text-sm">Image</p>
            <p className="text-sm w-[70%]">Color</p>
          </div>
        </TaskModalHeader>
        <TaskModalContent className="p-2">
          <ProductImageModal
            setFieldValue={setFieldValue}
            setIsOpen={setIsOpen}
            setProductLocalImages={setProductLocalImages}
            productLocalImages={localProductImages}
            setSelectedColor={setSelectedColor}
            values={values}
          />
        </TaskModalContent>

        {/* footer */}
        <TaskModalFooter className="   p-3">
          <div className="flex gap-4">
            <Button
              type="button"
              variant={"outline"}
              size={"lg"}
              className=" py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              variant={"b2bStyle"}
              size={"lg"}
              className=" py-2 rounded"
              disabled={localProductImages.some(
                (img) => !img.colorCode || !img.colorName || selectedColor
              )}
              onClick={handleSaveColors}
            >
              Save
            </Button>
          </div>
        </TaskModalFooter>
      </TaskModal>
    </div>
  );
}

type FormFieldGenalProps = {
  // children: React.ReactNode;
  className?: string;
  title: string; // Label for the field
  id: string;
  name: string;
  fieldClassName?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: any;
  values: any[];
  setIsOpen?: (value: boolean) => void;
};

export function FormFieldGenal({
  className,
  title,
  id,
  name,
  fieldClassName,
  setFieldValue,
  onChange,
  values = [],
  setIsOpen,
}: FormFieldGenalProps) {
  return (
    <div className={cn("flex items-center justify-between gap-10", className)}>
      <Label htmlFor={name} className="text-sm text-textGray">
        {title}
      </Label>
      <div className="flex flex-col gap-1 w-[70%] rel">
        <div className="flex items-center gap-3">
          <Label
            htmlFor={id}
            className="border relative overflow-hidden items-center gap-4 rounded-md w-[300px] cursor-pointer flex"
          >
            <span
              className="bg-bgGraySoft h-full flex py-4 px-10
          items-center"
            >
              Brows
            </span>
            <span>Choose File</span>
          </Label>
          {values.length > 0 && (
            <span className={`rounded-full`}>
              <DoneAllIcon
                fontSize="small"
                sx={{
                  color: "#5F08B1",
                }}
              />
            </span>
          )}
        </div>
        <ErrorMessage name={name} component="span" className="text-red-500" />
        {name === "variations" ? (
          <>
            {values.length > 0 && (
              <div className="flex flex-col">
                <span>Selected Product Images</span>
                <div
                  onClick={() => {
                    if (setIsOpen) {
                      setIsOpen(true);
                    }
                  }}
                  className="grid grid-cols-4 gap-2 mt-3 w-[300px]"
                >
                  {values.map((value) => (
                    <Tooltip
                      title={`Color: ${value.colorName}`}
                      placement="top"
                      className="cursor-pointer"
                    >
                      <img
                        className="h-12 w-12 rounded-full border border-gray-300"
                        src={URL.createObjectURL(value.image)}
                        alt="gallery images"
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <SelectedImages
            value={values}
            name="galleryImages"
            title="selected Gallery Images"
            alt="gallery images"
            setFieldValue={setFieldValue}
          />
        )}
      </div>

      <input
        id={id}
        name={name}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className={cn("hidden", fieldClassName)} // Hidden input
        onChange={onChange} // Custom handler
        multiple
      />
    </div>
  );
}

// ==== selected Images =================
type SelectedImageProps = {
  // children: React.ReactNode;
  className?: string;
  value: File[];
  title: string; // Label for the field
  alt?: string;
  setFieldValue: any; // Custom handler
  name: string;
};

export function SelectedImages({
  className,
  value,
  title,
  name,
  alt,
  setFieldValue,
}: SelectedImageProps) {
  return (
    <>
      {value.length > 0 && (
        <div className={cn("", className)}>
          <span>{title}</span>
          <div className="grid grid-cols-3 w-[200px] gap-2">
            {value?.map((image: any, index: number) => (
              <div className="" key={index}>
                <div className="w-[50px] bg-gray-100 rounded-md relative mt-3">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={alt}
                    className="object-cover "
                  />
                  <Tooltip title={`img-${index + 1}`} placement="top-end">
                    <button
                      type="button"
                      className="absolute -top-3 -right-3 bg-red-500 text-white h-5 w-5 flex items-center justify-center rounded-full"
                      onClick={() => {
                        const updatedImages = value.filter(
                          (_, imgIndex) => imgIndex !== index
                        );
                        setFieldValue(name, updatedImages);
                      }}
                    >
                      <CloseIcon className="" fontSize="small" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
