type SwitchProps = {
  isOn: boolean;
  handleToggle: () => void;
  id: string;
  colorOne?: string;
  colorTwo?: string;
};
export const MySwitch = ({
  isOn,
  handleToggle,
  id,
  colorOne = "#69BF35",
  colorTwo = "#ABABAB",
}: SwitchProps) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`${id}`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className="switch-label"
        htmlFor={`${id}`}
      >
        <span className={`switch-button`} />
      </label>
    </>
  );
};
