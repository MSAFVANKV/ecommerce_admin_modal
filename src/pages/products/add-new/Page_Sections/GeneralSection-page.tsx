import { Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box } from "@mui/material";
import { cn } from "@/lib/utils";
import TiptapCareGuide from "@/components/text_editors/TiptapCareGuide";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { MySwitch } from "@/components/myUi/mySwitch";
import { useState } from "react";
import { customStyles } from "@/components/products/Custom_styles";
// Define the type for form values
export interface GeneralFormValues {
  productName: string;
  mrp: number;
  sku: string;
  barcode?: string;
  brand?: string;
  keywords?: string;
  minQty: number;
  weight?: number;
  height?: number;
  length?: number;
  width?: number;
  dimensions?: string;
  taxSlab?: SelectOption[];
  status: boolean;
  todaysDeal: boolean;
  description?: string;
  isCess: boolean;
  cess?: SelectOption[];
  featured: boolean;
}

//   ==== formik =========================
type Props = {
  setFieldValue: any;
  values: GeneralFormValues;
  errors: any;
};

const animatedComponents = makeAnimated();
const taxSlabs: SelectOption[] = [
  { _id: "1", name: "5%" },
  { _id: "2", name: "12%" },
  { _id: "3", name: "18%" },
  { _id: "4", name: "28%" },
];
interface SelectOption {
  _id: string;
  name: string;
}

export default function GeneralSectionPage({
  values,
  setFieldValue,
  
}: Props) {
  const [selectedCessOptions, setSelectedCessOptions] = useState<
    MultiValue<SelectOption>
  >(values.cess || []);
  const [selectedTaxSlab, setSelectedTaxSlab] = useState<
    MultiValue<SelectOption>
  >(values.taxSlab || []);

  // console.log(errors, "errors");

  return (
    <Box display="flex" gap="13px">
      <div className="w-3/4 flex flex-col gap-3">
        <FormFieldGenal
          value={values.productName}
          title="Product Name"
          id="productName"
          name="productName"
          placeholder="Enter Product Name"
          fieldAs={Input}
        />

        {/* #sku ==== */}
        <FormFieldGenal
          value={values.sku}
          title="SKU id"
          id="sku"
          name="sku"
          placeholder="SKU ID"
          fieldAs={Input}
        />
        {/* #barcode ==== */}
        <FormFieldGenal
          value={values.barcode}
          title="Barcode"
          id="barcode"
          name="barcode"
          placeholder="Barcode"
          fieldAs={Input}
        />

        {/* #mrp ==== */}
        <FormFieldGenal
          value={values.mrp}
          title="Product MRP"
          id="mrp"
          name="mrp"
          placeholder="Product MRP"
          fieldAs={Input}
        />

        {/* #Brand ==== */}
        <FormFieldGenal
          value={values.brand}
          title="Brand"
          id="brand"
          name="brand"
          placeholder="Brand"
          fieldAs={Input}
        />

        {/* #keywords ==== */}
        <FormFieldGenal
          value={values.keywords}
          title="Search Keywords"
          id="keywords"
          name="keywords"
          placeholder="Keywords"
          fieldAs={Input}
        />

        {/* #minQty ==== */}
        <FormFieldGenal
          value={values.minQty}
          title="Minimum Qty*"
          id="minQty"
          name="minQty"
          placeholder="Quantity"
          fieldAs={Input}
        />

        {/* #weight ==== */}
        <FormFieldGenal
          value={values.weight}
          title="Product weight in gm"
          id="weight"
          name="weight"
          placeholder="weight"
          fieldAs={Input}
        />

        {/* #Dimension ==== */}
        <div className={cn("flex items-center justify-between")}>
          <Label htmlFor="dimension" className="text-textGray">Dimension</Label>
          <div className="flex  md:w-3/4 gap-2">
            <div className="w-full">
              <Field
                id="width"
                name="width"
                placeholder="width"
                type="number"
                className={cn(` p-6`)}
                as={Input}
                value={values.width} // Bind field value to Formik
              />
              <ErrorMessage
                name="width"
                component="span"
                className="text-red-500"
              />
            </div>

            {/* #Height */}
            <div className="w-full">
              <Field
                id="height"
                name="height"
                placeholder="Height"
                type="number"
                className={cn(` p-6`)}
                as={Input}
                value={values.height} // Bind field value to Formik
              />
              <ErrorMessage
                name="height"
                component="span"
                className="text-red-500"
              />
            </div>

            {/* #Height */}
            <div className="w-full">
              <Field
                id="length"
                name="length"
                placeholder="length"
                className={cn(` p-6`)}
                as={Input}
                value={values.length} // Bind field value to Formik
              />
              <ErrorMessage
                name="length"
                component="span"
                className="text-red-500"
              />
            </div>
          </div>
        </div>

        {/* #text editor description ==== */}
        <TiptapCareGuide
          label="Description"
          careGuide={values.description ?? ""}
          onChange={(value) => console.log(value)}
        />

        {/* #Tax details ======= */}

        <b>Tax details</b>
        <div className="flex justify-between w-full mb-10">
          <Label htmlFor="taxSlab" className="text-textGray">Tax Slab</Label>
          <div className="w-3/4">
            <Select
              isMulti
              components={animatedComponents}
              className=""
              styles={customStyles}
              value={selectedTaxSlab}
              placeholder="Select tax slab"
              closeMenuOnSelect={false}
              options={taxSlabs} // assuming categories is an array of SelectOption
              getOptionLabel={(e: SelectOption) => e.name} // Explicitly type 'e' as SelectOption
              getOptionValue={(e: SelectOption) => e._id} // Explicitly type 'e' as SelectOption
              onChange={(selected: MultiValue<SelectOption>) => {
                // console.log(selected);
                const selectedOptions = selected.map((option) => option);
                setSelectedTaxSlab(selectedOptions);

                setFieldValue("taxSlab", selectedOptions);
              }}
            />
          </div>
        </div>

        {/* #Cess ========== */}
        <div className="flex justify-between w-full mb-10">
          <Label htmlFor="cess" className="text-textGray">CESS</Label>
          <div className="w-3/4 flex ">
            <MySwitch
              id="cess"
              isOn={values.isCess}
              handleToggle={() => {
                setFieldValue("isCess", !values.isCess);
                if (!values.isCess) setFieldValue("cess", []);
              }}
            />
            <div className="w-full">
              <Select
                isMulti
                components={animatedComponents}
                className="w-full pl-3"
                styles={customStyles}
                placeholder="Select tax slab"
                isDisabled={!values.isCess}
                value={selectedCessOptions}
                closeMenuOnSelect={false}
                options={taxSlabs}
                getOptionLabel={(e: SelectOption) => e.name}
                getOptionValue={(e: SelectOption) => e._id}
                onChange={(selected: MultiValue<SelectOption>) => {
                  // console.log(selected);
                  // const selectedNames = selected.map((option) => option.name); // Extract names
                  // const selectedIds = selected.map((option) => option._id); // Extract names
                  const selectedOptions = selected.map((option) => option);
                  setSelectedCessOptions(selectedOptions);

                  setFieldValue("cess", selectedOptions); // Save only the names
                }}
              />
              <ErrorMessage
                name="cess"
                component="span"
                className="text-red-500"
              />
            </div>
          </div>
        </div>

        {/* #status toggle ========= */}
        <b>Status</b>
        <div className="flex justify-between">
          <Label htmlFor="featured" className="text-textGray">Featured</Label>
          <div className="flex items-center justify-start w-3/4 gap-2">
            <MySwitch
              id="featured"
              isOn={values.featured}
              handleToggle={() => setFieldValue("featured", !values.featured)}
            />
          </div>
        </div>
        {/* #todays Deal============= */}
        <div className="flex justify-between">
          <Label htmlFor="todaysDeal" className="text-textGray">Todays Deal</Label>
          <div className="flex items-center justify-start w-3/4 gap-2">
            <MySwitch
              id="todaysDeal"
              isOn={values.todaysDeal}
              handleToggle={() => setFieldValue("todaysDeal",!values.todaysDeal)}
            />
            </div>
  
        </div>
      </div>

      {/* ================  Category Selection =====================
      ============================================================== */}
      <div className="flex-grow">Category</div>
    </Box>
  );
}

type FormFieldGenalProps = {
  // children: React.ReactNode;
  className?: string;
  value: string | number | boolean | undefined;
  title: string; // Label for the field
  id: string;
  name: string;
  placeholder?: string;
  fieldAs?: React.ElementType;
  fieldClassName?: string;
  type?: string;
};

export function FormFieldGenal({
  className,
  value,
  title,
  id,
  name,
  placeholder,
  fieldAs,
  fieldClassName,
  type = "text", // default type is text
}: FormFieldGenalProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Label htmlFor={name} className="text-textGray">{title}</Label>
      <div className="flex flex-col md:w-3/4 gap-2">
        <Field
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(` p-6`, fieldClassName)}
          type={type}
          as={fieldAs}
          value={value} // Bind field value to Formik
        />
        <ErrorMessage name={name} component="span" className="text-red-500" />
      </div>
    </div>
  );
}
